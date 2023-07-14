

import { GameState, JiaSu } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffId, BuffType, DamageType } from "../../Hero/Game/HeroConfig";
import { KeyFrameData } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import TutorailsManager from "../../Tutorials/TutorailsManager";
import Boss from "../Boss";
import BossAtt1 from "./BossAtt1";

enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack1 = "Attack1",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill1_1 = "Skill1_1",          //-- 技能动作1
    skill1_2 = "Skill1_2",          //-- 技能动作1
    skill1_3 = "Skill1_3",          //-- 技能动作1
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class BigTree extends Boss {

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

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_normal_att,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_normal_att_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_normal_skill,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_normal_skill_hit,4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);        
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
        // if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //     this.skill_jishu=10;
        // }
        this.skill_cd=this.skill_data.getSkillColdDown(1);
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
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss1_normal_att,super.getAttPos());
            node.getComponent(BossAtt1).init(super.getAttData(DamageType.Normal,true),GameEffectId.boss1_normal_att,1200,Math.PI*3/2,this.node.y);
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
        // if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //     this.cur_toughness=1;
        // }
        this.skill_jishu=0;
        if(super.getEnemyState()!=Enemy_State.att){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                this.skill_waiting=false;
                super.setEnemyState(Enemy_State.skill);
                super.playSpinAnimaton((Animation_Name.skill1_1),false,null,()=>{
                    super.playSpinAnimaton((Animation_Name.skill1_2),true)
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
        let num=0;
        for(let i=0; i<this.skill_data.getSkillValue1(1); i++){
            this.scheduleOnce(()=>{
                if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
                    num++;
                    let startPos=cc.v2(Math.random()*128-64,this.node.y+256);
                    let offsetX=startPos.x<0?-(80+Math.random()*80):(80+Math.random()*80)
                    let endPos=cc.v2(offsetX+startPos.x,startPos.y+Math.random()*40+80);
                    let startEndPos=cc.v2(startPos.x+offsetX/3,GameManager.getInstance().enemy_att_y);
                    let offsetPos=startEndPos.sub(endPos);
                    let dir=Math.atan2(offsetPos.y,offsetPos.x);
                    //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
                    let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss1_normal_skill,startPos);
                    let bsAtt=node.getComponent(BossAtt1);
                    let data=super.getAttData(DamageType.Skill,true,this.skill_data.getSkillValue2(1))
                    data.is_big=false;
                    bsAtt.init(data,GameEffectId.boss1_normal_skill,2000,dir,this.node.y);
                    bsAtt.is_can_move=false;
                    cc.tween(node).to((0.75-num*0.05)*GameManager.getInstance().getGameRate(),{x:endPos.x,y:endPos.y},{easing: 'quadOut'}).call(()=>{
                        bsAtt.startFly();
                    }).start();
                }
            },i*0.2)
        }
        this.launch_num++;
        // if(this.launch_num==3){
        //     //德鲁伊教程
        //     if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //         TutorailsManager.getInstance().showTutorials(241,()=>{
        //             GameManager.getInstance().setGameRate(1/JiaSu);                            
        //         },()=>{
        //             TutorailsManager.getInstance().saveTutorials(241);
        //             this.cur_toughness=0;
        //             GameManager.getInstance().setGameRate(1);
        //         },false,null,this.node.getPosition());
        //     }
        // }
        
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
                if(!super.getIsDie())
                {
                    if(this.skill_waiting==true){                
                        super.setEnemyState(Enemy_State.skill);
                        this.startSkill();
                    }else{
                        this.startIdle();
                    }
                }
            }
        }
    }

    startXuanYun(){
        this.skill_waiting=false;
        this.is_yindao=false;
        this.yindao_jishu=0;
        super.playSpinAnimaton(Animation_Name.hurt1,false,null,()=>{
            if(super.isHaveDeBuffType(BuffType.Vertigo)&&!super.getIsDie())
                this.spine.paused=true;                
        });
    }

    endYinDao(){
        //结束引导
        this.is_yindao=false;
        this.yindao_time=10;        
        super.playSpinAnimaton(Animation_Name.skill1_3,false,null,()=>{
            this.startIdle();
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
        if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){            
            if(this.getEnemyState()!=Enemy_State.skill){            
                this.checkAtt(dt);            
            }
        }                
    }

    /**技能检测 */
    checkSkill(dt:number){        
        this.skill_jishu+=dt;
        if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
            if(this.is_yindao==false&&this.skill_jishu>=this.skill_cd){
                this.skill_jishu=this.att_jiange;
                this.startSkill();
            }
            if(this.is_yindao==true&&this.yindao_time>0){
                this.yindao_time-=dt;
                if(this.yindao_time<=0){                    
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
