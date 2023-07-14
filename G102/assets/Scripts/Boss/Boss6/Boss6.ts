

import { GameMode, GameState, JiaSu } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { HeroManager } from "../../Hero/Data/HeroManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType, DamageType, Hero_Type } from "../../Hero/Game/HeroConfig";
import MonsterBullet from "../../Monster/MonsterBullet";
import { KeyFrameData } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import Boss from "../Boss";
import BossSkill6 from "./BossSkill6";

enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack1 = "Attack1",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill1_1 = "Skill1_1",          //-- 技能动作1,眩晕变身
    skill1_2 = "Skill1_2",          //-- 技能动作2循环
    skill1_3 = "Skill1_3",          //-- 技能动作3，变回高防御
    skill2_1 = "Skill2_1",          //-- 技能动作1,准备开始引导
    skill2_2 = "Skill2_2",          //-- 技能动作2循环，引导发弹
    skill2_3 = "Skill2_3",          //-- 技能动作3，结束引导
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss6 extends Boss {

    //skill_time:number=10;
    skill_waiting:boolean=false;
    /**引导相关 */
    /**引导计数 */
    yindao_jishu:number=0;    
    /**引导剩余时长 */
    yindao_time:number=10;
    /**是否处于引导中 */
    is_yindao:boolean=false;
    launch_num:number=0;
    skill_cd:number;
    cur_state:number=1;//1：高防御  2：低防御
    skill_jishu_2:number=0;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss6_attack,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss6_attack_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss6_skill2,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss6_skill2_hit,4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);        
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
        this.skill_cd=this.skill_data.getSkillColdDown(2);
        this.cur_state=1;
        this.monster_data.Defense+=this.base_attribute_data.Defense*this.skill_data.getSkillValue1(1);
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_boss6Attack);
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss6_attack,super.getAttPos());
            node.getComponent(MonsterBullet).init(super.getAttData(DamageType.Normal,true),GameEffectId.boss6_attack,GameEffectId.boss6_attack_hit,1500,Math.PI*3/2);
        }
        super.playSpinAnimaton((Animation_Name.attack1),false,data,()=>{
            if(this.skill_waiting==true){                
                super.setEnemyState(Enemy_State.skill);
                this.startSkill();
            }else{
                this.startIdle();
            }            
        })
    }

    startSkill(){
        this.skill_jishu=0;
        if(super.getEnemyState()!=Enemy_State.att){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                this.skill_waiting=false;
                super.setEnemyState(Enemy_State.skill);
                super.playSpinAnimaton((Animation_Name.skill2_1),false,null,()=>{
                    let data=new KeyFrameData();
                    data.name='Skill2';
                    data.callback=this.startLaunch.bind(this);
                    super.playSpinAnimaton((Animation_Name.skill2_2),true,data);
                    this.is_yindao=true;
                    this.skill_jishu=0;
                    this.yindao_time=10;
                })
            }else{
                this.skill_waiting=true;
            }         
        }else{
            this.skill_waiting=true;
        }
        
    }

    startLaunch(){
        //cc.log('发射发射');
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing){
            return;
        }
        this.skill_jishu=0;
        let num=0;
        for(let i=0; i<2; i++){
            this.scheduleOnce(()=>{
                if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
                    GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_boss6Attack);
                    num++;                
                    let startPos=cc.v2(Math.random()*128-64,this.node.y+256);
                    let offsetX=startPos.x<0?-(80+Math.random()*80):(80+Math.random()*80)
                    let endPos=cc.v2(offsetX+startPos.x,startPos.y+Math.random()*40+80);
                    //随机英雄
                    let attDir=Math.PI*3/2;
                    let heroId=HeroManager.getInstance().getRandHeroId(GameManager.getInstance().cur_game_mode);
                    if(heroId!=Hero_Type.NULL){
                        let heroPos=GameManager.getInstance().all_hero.get(heroId).node.getPosition();
                        let offsetPos=heroPos.sub(endPos)
                        let pi2=Math.PI*2;
                        attDir=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;                    
                    }
                    let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss6_skill2,startPos);
                    let bsAtt=node.getComponent(BossSkill6);
                    bsAtt.init(super.getAttData(DamageType.Skill,true,this.skill_data.getSkillValue1(2)),GameEffectId.boss6_skill2,1500,attDir,this.node.y);
                    bsAtt.is_can_move=false;
                    bsAtt.setHeroType(heroId,this.skill_data.getSkillValue2(2));
                    //bsAtt.setHeroType(heroId,0.1);
                    cc.tween(node).to((0.25-num*0.05)*GameManager.getInstance().getGameRate(),{x:endPos.x,y:endPos.y},{easing: 'quadOut'}).call(()=>{
                        bsAtt.startFly();
                    }).start();
                }
            },0.25*i);
            
        }
        this.launch_num++;        
    }

    endYinDao(){
        this.skill_jishu=0;
        this.is_yindao=false;
        this.yindao_time=10;
        super.playSpinAnimaton((Animation_Name.skill2_3),false,null,()=>{
            this.att_jishu=0;
            this.startIdle();
        });
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
            //this.unXuanYun();
        }
    }

    startXuanYun(){
        if(this.is_yindao&&this.cur_state==1){
            this.skill_waiting=false;
            this.is_yindao=false;
            this.yindao_jishu=0;
            this.cur_toughness+=1;
            this.cur_state=2;
            this.skill_jishu_2=0;
            super.playSpinAnimaton(Animation_Name.skill1_1,false,null,()=>{            
                super.playSpinAnimaton(Animation_Name.skill1_2,true,null,null);
                //减防御
                this.monster_data.Defense-=this.base_attribute_data.Defense*this.skill_data.getSkillValue3(2);
                cc.log(this.monster_data.Defense);
            });
        }else{
            
        }        
    }

    unXuanYun(){
        this.skill_jishu_2=0;
        if(!super.getIsDie()){
            super.playSpinAnimaton(Animation_Name.skill1_3,false,null,()=>{
                this.cur_toughness-=1;
                this.cur_state=1;
                //加防御
                this.monster_data.Defense+=this.base_attribute_data.Defense*this.skill_data.getSkillValue3(2);
                cc.log(this.monster_data.Defense);
                if(!super.getIsDie())
                {
                    this.startIdle();
                }
            });
        }        
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
            if(this.getEnemyState()!=Enemy_State.skill){            
                this.checkAtt(dt);            
            }
        }                
    }

    // /**技能检测 */
    checkSkill(dt:number){
        this.skill_jishu+=dt;
        if(!this.isHaveDeBuffType(BuffType.Vertigo)){
            if(this.is_yindao==false&&this.skill_jishu>=this.skill_cd){
                this.skill_jishu=0;
                this.startSkill();
            }
            if(this.is_yindao==true&&this.yindao_time>0){
                this.yindao_time-=dt;
                if(this.yindao_time<=0){
                    //结束引导
                    this.endYinDao();
                    return;
                }
                // this.yindao_jishu+=dt;
                // if(this.yindao_jishu>=1){
                //     this.yindao_jishu=0;
                //     this.startLaunch();
                // }
            }
        }
        if(this.cur_state==2){
            this.skill_jishu_2+=dt;
            if(this.skill_jishu_2>=5){
                this.unXuanYun();
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
