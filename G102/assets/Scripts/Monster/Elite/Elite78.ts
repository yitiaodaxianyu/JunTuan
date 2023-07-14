

import { GameState, JiaSu } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffId, BuffType, DamageType } from "../../Hero/Game/HeroConfig";
import { KeyFrameData } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";
import MonsterBullet from "../MonsterBullet";
import MonsterNewNormal from "../MonsterNewNormal";
import EliteAtt78 from "./EliteAtt78";

enum Animation_Name
{
    Idle = "Side_Walk",       //-- 正面待机
    attack1 = "Side_Attack",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill1_1 = "Side_Skill1_1",          //-- 技能动作1
    skill1_2 = "Side_Skill1_2",          //-- 技能动作2
    skill1_3 = "Side_Skill1_3",          //-- 技能动作3
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Elite78 extends MonsterNewNormal {

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
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster78_attack_bullect,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster78_skill_bullect,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.monster78_skill_bullect_hit,4);
        this.addMonsterNormalDeath(this.onMonsterNormalDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addMonsterNormalInited(this.onMonsterIsInited);
    }

    onMonsterIsInited(): void {        
        this.skill_cd=this.skill_data.getSkillColdDown(1);
    }

    // startIdle(){
    //     this.att_jishu=0;
    //     super.setEnemyState(Enemy_State.move);
    //     super.playSpinAnimaton(Animation_Name.Idle,true);        
    // }    

    startSkill(){
        this.skill_jishu=0;
        if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
            this.skill_waiting=false;
            super.setEnemyState(Enemy_State.skill);
            super.playSpinAnimaton((Animation_Name.skill1_1),false,null,()=>{
                super.playSpinAnimaton((Animation_Name.skill1_2),true)
                this.is_yindao=true;
                this.skill_jishu=0;
                this.yindao_time=10;                    
            })
        }
    }

    startLaunch(){
        //cc.log('发射发射');
        let num=0;
        for(let i=0; i<this.skill_data.getSkillValue1(1); i++){
            this.scheduleOnce(()=>{
                if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
                    num++;
                    let startRandPosX=Math.random()*64-32;
                    let startPos=cc.v2(this.node.x+startRandPosX,this.node.y+128);
                    let offsetX=startRandPosX<0?-(80+Math.random()*80):(80+Math.random()*80)
                    let endPos=cc.v2(offsetX+startPos.x,startPos.y+Math.random()*40+80);
                    let startEndPos=cc.v2(startPos.x+offsetX/3,GameManager.getInstance().enemy_att_y);
                    let offsetPos=startEndPos.sub(endPos);
                    let dir=Math.atan2(offsetPos.y,offsetPos.x);
                    //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
                    let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.monster78_skill_bullect,startPos);
                    let bsAtt=node.getComponent(EliteAtt78);
                    bsAtt.init(super.getAttData(DamageType.Skill,true,this.skill_data.getSkillValue2(1)),GameEffectId.monster78_skill_bullect,2000,dir,this.node.y);
                    bsAtt.is_can_move=false;
                    cc.tween(node).to((0.75-num*0.05)*GameManager.getInstance().getGameRate(),{x:endPos.x,y:endPos.y},{easing: 'quadOut'}).call(()=>{
                        bsAtt.startFly();
                    }).start();
                }
            },i*0.2)
        }
        this.launch_num++;
    }

    onMonsterNormalDeath() {
        this.unscheduleAllCallbacks();
        this.is_yindao=false;
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.startXuanYun();
        }else{
            this.att_jishu=0;
            this.startIdle();
            super.setEnemyState(Enemy_State.move);
            if(this.att_wall){
                this.setMoveDir(Math.random()>0.5?Math.PI:0);
            }
        }
    }

    startXuanYun(){
        this.skill_waiting=false;
        this.is_yindao=false;
        this.yindao_jishu=0;
        this.att_jishu=0;
    }
    
    update(dt)
    {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        this.checkSkill(dt);
        // if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){            
        //     if(this.getEnemyState()!=Enemy_State.skill){            
        //         this.checkAtt(dt);            
        //     }
        // }                
    }

    /**技能检测 */
    checkSkill(dt:number){
        this.skill_jishu+=dt;
        if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
            if(this.is_yindao==false&&this.skill_jishu>=this.skill_cd){
                let walls=WallManager.getInstance().getAllWall();
                let attWall=null;
                walls.forEach((wall:Wall,wallType:WallType)=>{
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if(this.node.y>=wall.getWallMaxYY()&&Math.abs(this.node.y-wall.getWallMaxYY())<=this.base_data.AttackDistance){                
                        attWall=wall;
                    }
                })
                if(attWall){
                    this.skill_jishu=this.att_jiange;
                    this.startSkill();
                }                
            }
            if(this.is_yindao==true&&this.yindao_time>0){
                if(this.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
                    this.onXuanYunResult(true);
                    return;
                }
                this.yindao_time-=dt;
                if(this.yindao_time<=0){
                    //结束引导
                    this.is_yindao=false;
                    this.yindao_time=10;
                    this.startIdle();
                    super.setEnemyState(Enemy_State.move);
                    if(this.att_wall){
                        this.setMoveDir(Math.random()>0.5?Math.PI:0);
                    }
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

}
