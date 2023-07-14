import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { DamageType, BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import Monster from "../../Monster/Monster";
import MonsterBullet from "../../Monster/MonsterBullet";
import { KeyFrameData, StrengthType } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import WallManager from "../../Wall/WallManager";
import Boss from "../Boss";
import BossSkill7 from "./BossSkill7";
enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack = "Attack1",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill1 = "Skill1",          //-- 技能1
    skill2 = "Skill2",          //-- 召唤
    skill3 = "Skill3",          //-- 鼓舞
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss7 extends Boss {
    
    @property(cc.Prefab)
    boss7_buff:cc.Prefab=null;

    injury_node:cc.Node=null;

    is_active_skill_3:boolean=false;
    active_injury_num:number=0;   
    /**幽灵巨炮手20721，2个幽灵舵手20731，8个幽灵水手10521，3个幽灵炮手10531 */
    zhaohuan_id:number[]=[20721,20731,10521,10531];
    /**（3个幽灵巨炮手，2个幽灵舵手，8个幽灵水手，3个幽灵炮手）" */
    zhaohuan_num:number[]=[3,2,8,3];

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss7_attack_bullect,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss7_attack_bullect_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss7_skill_bullect,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss7_skill_bullect_hit,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster_zhaohuan,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.xuanyun,4);
        for(let i=0; i<this.zhaohuan_id.length; i++){
            MonsterManager.getInstance().addMonsterPool(this.zhaohuan_id[i],2);
        }
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
        this.addInjuryCallback(this.onActiveInjury);
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
        this.active_injury_num=0;       
    }

    onChangeHp(num:number){
        if(this.cur_hp<=this.max_hp/3){
            if(this.is_active_skill_3==false){
                this.is_active_skill_3=true;
                this.startSkill(3);
            }           
        }
    }

    onActiveInjury(){
        this.active_injury_num++;
        this.showInjuryNum();
        if(this.active_injury_num>=this.skill_data.getSkillValue1(1)){
            this.active_injury_num=0;
            this.startSkill1();
        }        
    }

    showInjuryNum(){        
        if(this.injury_node){
            this.injury_node.getChildByName('num').getComponent(cc.Label).string=this.active_injury_num.toString();
        }else{
            this.injury_node=cc.instantiate(this.boss7_buff);
            let hpRoot=cc.find('Canvas/Ui_Root/top_ui/BossHpRoot');            
            hpRoot.addChild(this.injury_node);
            this.injury_node.x=-220;            
            this.injury_node.getChildByName('num').getComponent(cc.Label).string=this.active_injury_num.toString();
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_boss7Attack);
            let bullect=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss7_attack_bullect,this.getAttPos());
            bullect.getComponent(MonsterBullet).init(this.getAttData(DamageType.Normal,true),GameEffectId.boss7_attack_bullect,GameEffectId.boss7_attack_bullect_hit,1600,Math.PI*3/2);
        }
        super.playSpinAnimaton((Animation_Name.attack),false,data,()=>{
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
        }
    }
    
    //投弹
    startSkill1(){        
        let skillNo=1;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);        
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill';
                data.callback=()=>{
                    GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_boss7Skill1);
                    this.att_jishu=0;
                    let danNum=this.skill_data.getSkillValue2(1);
                    let wallPos=WallManager.getInstance().getMainWall().getWallRect().center;
                    for(let i=0; i<danNum; i++){
                        this.scheduleOnce(()=>{
                            let createPos=cc.v2(Math.random()*600-300,cc.winSize.height);
                            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss7_skill_bullect,createPos);
                            node.getComponent(BossSkill7).init(this.getAttData(DamageType.Skill,false,this.skill_data.getSkillValue3(1)),Math.random()*200-100+wallPos.y,1500,Math.random()*10+30,i==0);
                        },i*0.1);                        
                    }
                }
                super.playSpinAnimaton((Animation_Name.skill1),false,data,()=>{
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
                data.name='Skill2';
                data.callback=()=>{                    
                    this.att_jishu=0;
                    this.startZhaoHuan();
                    //回血20%
                    this.beHeal(this.getMaxHp()*0.1);
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
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill3';
                data.callback=()=>{                    
                    this.att_jishu=0;
                    //鼓舞buff
                    let monsters=MonsterManager.getInstance().getMonstersForMonsterPos(-1,this.node.getPosition(),this.skill_data.getSkillValue1(skillNo));
                    if(monsters){
                        for(let i=0; i<monsters.length; i++){
                            let monsterTs=monsters[i].getComponent(Monster);
                            if(monsterTs){
                                let buffData=new BuffData();
                                buffData.buff_value=[this.skill_data.getSkillValue2(skillNo)];
                                buffData.buff_id=BuffId.Boss5_Skill_1_guwu;
                                buffData.buff_type=BuffType.MoveSpeedUp;
                                buffData.remain_time=5;
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
        //删除
        // if(this.boss_shield){
        //     this.boss_shield.destoryShield();
        // }        
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
        if(this.getEnemyState()!=Enemy_State.skill){
            if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
                this.checkAtt(dt);
            }
        }
    }

    /**技能检测 */
    checkSkill(dt:number){
        for(let i=0; i<3; i++){
            if(i==2){
                //第3个技能
                if(this.is_active_skill_3==false){
                    continue;
                }
            }
            if(this.skill_cold_down[i]>0){
                this.skill_cold_down[i]-=dt;
                if(this.skill_cold_down[i]<0){
                    this.skill_cold_down[i]=0;
                    this.startSkill(i+1);
                }
            }
        }
    }

    /**攻击计算 */
    checkAtt(dt:number){        
        this.att_jishu+=dt;
        if(this.att_jishu>=this.att_jiange){
            this.att_jishu=this.att_jiange;
            this.startAttack();
        }
    }
    
}
