

import { GameMode, GameState, JiaSu } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType, DamageType, Hero_Type } from "../../Hero/Game/HeroConfig";
import Monster from "../../Monster/Monster";
import MonsterBullet from "../../Monster/MonsterBullet";
import { KeyFrameData } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import Boss from "../Boss";
import BossSkill10 from "./BossSkill10";

enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack1 = "Attack",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1    
    skill1_1 = "Skill2_1",          //-- 技能动作1,准备开始引导
    skill1_2 = "Skill2_2",          //-- 技能动作2循环，引导发弹
    skill1_3 = "Skill2_3",          //-- 技能动作3，结束引导
    skill2 = "Skill3",
    skill3 = "Skill4",
    skill4 = "Skill5",
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss10 extends Boss {


    /**引导相关 */
    /**引导计数 */
    yindao_jishu:number=0;    
    /**引导剩余时长 */
    yindao_time:number=10;
    /**是否处于引导中 */
    is_yindao:boolean=false;
    launch_num:number=0;
    kuangbao_value:number[]=[];
    is_kuang_bao:boolean=false;

    is_active_skill_3:boolean=false;
    is_active_skill_4:boolean=false;

    zhaohuan_id:number[]=[20781,20772,10611,10621,10512];
    /**（召唤3个烈焰精灵20781、2个熔岩巨人20772，8个火焰巨人10611，3个火精灵10621，3个岩浆怪10512）" */
    zhaohuan_num:number[]=[3,2,8,3,3];
    att_num:number=0;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss10_attack,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss10_attack_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss10_skill2_0,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss10_skill2_hit,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhaohuan,4);
        for(let i=0; i<this.zhaohuan_id.length; i++){
            MonsterManager.getInstance().addMonsterPool(this.zhaohuan_id[i],2);
        }
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
        this.kuangbao_value=[this.skill_data.getSkillValue1(4),this.skill_data.getSkillValue2(4)]
    }

    onChangeHp(num:number){
        if(this.cur_hp<=this.max_hp*0.7){
            if(this.is_active_skill_3==false){
                this.is_active_skill_3=true;
                this.startSkill(3);
            }
        }
        if(this.cur_hp<=this.max_hp*0.3){
            if(this.is_active_skill_4==false&&this.skill_cold_down[3]<=0){
                this.is_active_skill_4=true;
                this.startSkill(4);
            }
        }else{
            if(this.is_active_skill_4==true){
                this.is_active_skill_4=false;
                this.setKuangBao(false);
            }
        }
    }

    setKuangBao(isKB:boolean){        
        if(this.is_kuang_bao!=isKB){
            this.is_kuang_bao=isKB;
            this.is_active_skill_4=isKB;
            if(isKB){            
                this.monster_data.Attack+=this.base_attribute_data.Attack*this.kuangbao_value[0];
                this.changeAttackSpeed(this.kuangbao_value[1]);            
            }else{
                this.monster_data.Attack-=this.base_attribute_data.Attack*this.kuangbao_value[0];
                this.changeAttackSpeed(-this.kuangbao_value[1]);
            }
        }        
    }

    startIdle(){        
        super.setEnemyState(Enemy_State.standby);
        super.playSpinAnimaton(Animation_Name.Idle,true);
        
    }

    startAttack(): void {
        this.att_jishu=0;
        super.setEnemyState(Enemy_State.att);
        let data=new KeyFrameData();
        data.name='Attack';
        data.callback=()=>{  
            this.att_jishu=0;
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BOSS10Attack);
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss10_attack,super.getAttPos());
            node.getComponent(MonsterBullet).init(super.getAttData(DamageType.Normal,true),GameEffectId.boss10_attack,GameEffectId.boss10_attack_hit,1800,Math.PI*3/2);
            this.att_num++;
            if(this.att_num>=8){
                this.att_num=0;
                //召唤
                this.skill_queue.push(2);
            }
        }
        super.playSpinAnimaton((Animation_Name.attack1),false,data,()=>{
            if(this.skill_queue.length>0){
                super.setEnemyState(Enemy_State.standby);
                this.startSkill(this.skill_queue.shift());
            }else{
                this.startIdle();
            }
        })
    }

    startSkill(skillIndex:number){
        switch(skillIndex){
            case 1:{
                this.startSkill1();
            }break;
            case 2:{
                this.startSkill2();
            }break;
            case 3:{
                if(this.is_active_skill_3){
                    this.startSkill3();
                }
            }break;
            case 4:{
                if(this.is_active_skill_4){
                    this.startSkill4();
                }
            }break;
        }
    }

    startSkill1(){
        let skillNo=1;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(203)){
                    this.cur_toughness=1;
                }
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);                
                super.setEnemyState(Enemy_State.skill);
                super.playSpinAnimaton((Animation_Name.skill1_1),false,null,()=>{                    
                    super.playSpinAnimaton((Animation_Name.skill1_2),true,null);
                    this.is_yindao=true;
                    this.yindao_time=10;
                })
            }else{
                if(this.skill_queue.indexOf(skillNo)<0){
                    this.skill_queue.push(skillNo);
                }
            }         
        }else{
            if(this.skill_queue.indexOf(skillNo)<0){
                this.skill_queue.push(skillNo);
            }
        }        
    }

    startLaunch(){
        //cc.log('发射发射');
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing){
            return;
        }
        this.skill_jishu=0;
        let num=0;
        let len=this.skill_data.getSkillValue1(1);
        for(let i=0; i<len; i++){
            this.scheduleOnce(()=>{
                if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
                    GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BOSS10Skill);
                    num++;                
                    let startPos=cc.v2(Math.random()*128-64,this.node.y+256);
                    let offsetX=startPos.x<0?-(80+Math.random()*80):(80+Math.random()*80)
                    let endPos=cc.v2(offsetX+startPos.x,startPos.y+Math.random()*40+80);
                    //随机英雄
                    let attDir=Math.PI*3/2;
                    let heroId=HeroManager.getInstance().getRandHeroId(GameManager.getInstance().cur_game_mode,Hero_Type.NULL,GameManager.getInstance().cur_team_list);
                    if(heroId!=Hero_Type.NULL){
                        let heroPos=GameManager.getInstance().all_hero.get(heroId).node.getPosition();
                        let offsetPos=heroPos.sub(endPos)
                        let pi2=Math.PI*2;
                        attDir=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;                    
                    }
                    let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss10_skill2_0,startPos);
                    let bsAtt=node.getComponent(BossSkill10);
                    bsAtt.init(super.getAttData(DamageType.Skill,true,this.skill_data.getSkillValue2(1)),GameEffectId.boss10_skill2_0,1500,attDir,this.node.y);
                    bsAtt.is_can_move=false;                    
                    //bsAtt.setHeroType(heroId,0.1);
                    cc.tween(node).to((0.25-num*0.05)*GameManager.getInstance().getGameRate(),{x:endPos.x,y:endPos.y},{easing: 'quadOut'}).call(()=>{
                        bsAtt.startFly();
                    }).start();
                }
            },0.25*i);            
        }
        this.launch_num++;
        if(this.launch_num==3){
            //德鲁伊教程
            if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(203)){
                TutorailsManager.getInstance().showTutorials(203,()=>{
                    GameManager.getInstance().setGameRate(1/JiaSu);                            
                },()=>{
                    TutorailsManager.getInstance().saveTutorials(203);
                    this.cur_toughness=0;
                    GameManager.getInstance().setGameRate(1);
                },false,null,this.node.getPosition());
            }
        }
    }

    endYinDao(){
        this.is_yindao=false;
        this.yindao_time=10;
        super.playSpinAnimaton((Animation_Name.skill1_3),false,null,()=>{
            this.att_jishu=0;
            if(this.skill_queue.length>0){
                super.setEnemyState(Enemy_State.standby);
                this.startSkill(this.skill_queue.shift());
            }else{
                this.startIdle();
            }
        });
    }


    //召唤
    startSkill2(){
        let skillNo=2;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill3';
                data.callback=()=>{
                    this.att_jishu=0;
                    this.startZhaoHuan();
                    //回血20%
                    //this.beHeal(this.getMaxHp()*0.1);
                }
                super.playSpinAnimaton((Animation_Name.skill2),false,data,()=>{
                    if(this.skill_queue.length>0){
                        super.setEnemyState(Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }else{
                        this.startIdle();
                    }
                })
            }else{
                if(this.skill_queue.indexOf(skillNo)<0){
                    this.skill_queue.push(skillNo);
                }
            }
        }else{
            if(this.skill_queue.indexOf(skillNo)<0){
                this.skill_queue.push(skillNo);
            }
        }
    }

    /**开始召唤 */
    startZhaoHuan(){        
        let num=0;              
        //半径
        let rr=256;        
        for(let i=0; i<this.zhaohuan_num.length; i++){
            num+=this.zhaohuan_num[i];
        }
        let indexArr=[];
        for(let n=0; n<num; n++){
            indexArr.push(n);
        }
        let onceRadian=Math.PI/(num-1);//num个怪
        for(let i=0; i<this.zhaohuan_num.length; i++){
            let numA=this.zhaohuan_num[i];
            for(let n=0; n<numA; n++){
                let index=Math.floor(Math.random()*indexArr.length);
                let num=indexArr[index];
                indexArr.splice(index,1);
                let xx=Math.cos(onceRadian*num)*rr+this.node.x;
                let yy=Math.sin(onceRadian*num)*rr+this.node.y;
                let id=this.zhaohuan_id[i];                
                MonsterManager.getInstance().createSummonMonster(id,this.monster_level,cc.v2(xx,yy));
            }            
        }        
    }

    startSkill3(){
        let skillNo=3;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill4';
                data.callback=()=>{                    
                    this.att_jishu=0;
                    //鼓舞buff
                    let monsters=MonsterManager.getInstance().getMonstersForMonsterPos(-1,this.node.getPosition(),300);            
                    if(monsters){
                        for(let i=0; i<monsters.length; i++){                            
                            let monsterTs=monsters[i].getComponent(Monster);
                            if(monsterTs){
                                let buffData=new BuffData();
                                buffData.buff_value=[this.skill_data.getSkillValue1(1)];
                                buffData.buff_id=BuffId.Boss10_Skill_3_guwu;
                                buffData.buff_type=BuffType.MoveSpeedUp;
                                buffData.remain_time=3;
                                monsterTs.addBuff(buffData);
                            }
                        }
                    }
                }
                super.playSpinAnimaton((Animation_Name.skill3),false,data,()=>{
                    if(this.skill_queue.length>0){
                        super.setEnemyState(Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }else{
                        this.startIdle();
                    }
                })
            }else{
                if(this.skill_queue.indexOf(skillNo)<0){
                    this.skill_queue.push(skillNo);
                }
            }
        }else{
            if(this.skill_queue.indexOf(skillNo)<0){
                this.skill_queue.push(skillNo);
            }
        }
    }

    startSkill4(){
        if(this.is_active_skill_4==false){
            return;
        }
        let skillNo=4;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                this.cur_toughness+=1;
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill5';
                data.callback=()=>{                    
                    this.att_jishu=0;
                    this.cur_toughness-=1;
                    this.att_jishu=0;
                    this.setKuangBao(true);
                }
                super.playSpinAnimaton((Animation_Name.skill4),false,data,()=>{
                    if(this.skill_queue.length>0){
                        super.setEnemyState(Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }else{
                        this.startIdle();
                    }
                })
            }else{
                if(this.skill_queue.indexOf(skillNo)<0){
                    this.skill_queue.push(skillNo);
                }
            }
        }else{
            if(this.skill_queue.indexOf(skillNo)<0){
                this.skill_queue.push(skillNo);
            }
        }
    }

    onDeath() {
        this.unscheduleAllCallbacks();
        super.playDeadAnimaton(Animation_Name.dead,()=>{
            this.removeAllDeBuff();
            this.removeAllBuff();
            if(this.shadow){
                cc.tween(this.shadow).to(0.75,{opacity:0}).start();
            }            
            cc.tween(this.node).to(0.75,{opacity:0}).call(()=>{
                this.removeAllDeBuff();
                this.removeAllBuff();
                MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
            }).start();
        })
        //GameManager.getInstance().sound_manager.playSound(SoundIndex.rewardBox2);         
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.startXuanYun();
        }else{
            if(!super.isHaveDeBuffType(BuffType.Vertigo)){
                if(!super.getIsDie()){
                    if(this.skill_queue.length>0){
                        super.setEnemyState(Enemy_State.standby);
                        this.startSkill(this.skill_queue.shift());
                    }else{
                        this.startIdle();
                    }
                }
            }
        }
    }

    startXuanYun(){
        if(this.is_yindao){
            this.is_yindao=false;
            this.yindao_time=10;
        }
        super.playSpinAnimaton(Animation_Name.hurt1,false,null,()=>{
            if(super.isHaveDeBuffType(BuffType.Vertigo)&&!super.getIsDie())
                this.spine.paused=true;                
        });
    }

    update(dt)
    {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        this.checkSkill(dt);
        
        if(!this.isHaveDeBuffType(BuffType.Vertigo)){
            this.checkYinDao(dt);
            if(this.getEnemyState()!=Enemy_State.skill){            
                this.checkAtt(dt);            
            }
        }                
    }

    /**技能检测 */
    checkSkill(dt:number){
        for(let i=0; i<4; i++){
            if(i==1){
                continue
            }
            if(i==2&&this.is_active_skill_3==false){
                continue
            }
            if(this.skill_cold_down[i]>0){
                this.skill_cold_down[i]-=dt;
                if(i==3){
                    //激活类技能不触发，只在此计时
                    continue
                } 
                if(this.skill_cold_down[i]<0){
                    this.skill_cold_down[i]=0;
                    this.startSkill(i+1);
                }
            }
        }
    }

    // /**引导检测 */
    checkYinDao(dt:number){
        if(this.is_yindao==true&&this.yindao_time>0){
            this.yindao_time-=dt;
            if(this.yindao_time<=0){
                //结束引导
                this.endYinDao();
                return;
            }
            this.yindao_jishu+=dt;
            if(this.yindao_jishu>=1){
                this.yindao_jishu=0;
                this.startLaunch();
            }
        }
    }

    /**攻击计算 */
    checkAtt(dt:number){        
        this.att_jishu+=dt;
        if(this.att_jishu>=this.att_jiange){
            this.att_jishu=this.att_jiange;
            this.startAttack();
        }else{
            //this.moving(dt);
        }
    }
}
