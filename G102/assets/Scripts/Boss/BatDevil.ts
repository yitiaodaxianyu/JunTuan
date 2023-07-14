import { Enemy_DeBuff_Type, Enemy_State } from "../Enemy/EnemyConfig";
import Move from "../Game/Move";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import { GameState } from "../Constants";
import MonsterManager from "../Monster/MonsterManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { KeyFrameData } from "../Monster/MonsterData";
import Boss from "./Boss";
import { BuffType, DamageType } from "../Hero/Game/HeroConfig";

enum Animation_Name
{
    Idle = "idle",       //-- 正面待机
    attack1 = "attack1",          //-- 攻击1
    run = "run",                //-- 跑路
    hurt1 = "hurt1",          //-- 受击1
    skill1 = "skill1",          //-- 技能动作1
    dead= "dead",   //死亡
}


const {ccclass, property} = cc._decorator;

@ccclass
export default class BatDevil extends Boss {

    

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_att_move,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_att_end,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_skill_move,1);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addAttackListen(this.onAttack);
        this.addMoveListen(this.onMove);
    }

    // initMovingTrack(){
    //     let width=222;
    //     let cPos=GameManager.getInstance().getFightCenter();
    //     let aRadian=Math.PI/3;
    //     this.moving_track=new Array();
    //     this.moving_track.push(cPos);
    //     let gg=cc.find('Canvas/Fighting_Root').getComponent(cc.Graphics);
    //     gg.moveTo(cPos.x,cPos.y);
    //     for(let i=PosType.Radian0; i<PosType.Num; i++){
    //         let radian=(i-1)*aRadian;
    //         let posX=cPos.x+width*Math.cos(radian);
    //         let posY=cPos.y+width*Math.sin(radian);
    //         this.moving_track.push(cc.v2(posX,posY));
    //         gg.lineTo(posX,posY);
    //     }
    //     gg.stroke();
    // }

    onBossInited(): void {
        this.startIdle();
        this.schedule(this.startSkill,10);
    }


    startIdle(){        
        super.setEnemyState(Enemy_State.standby);
        super.playSpinAnimaton(Animation_Name.Idle,true);
        this.scheduleOnce(this.startMove,2)
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.startXuanYun();
        }else{
            //根据上个状态判断需要做什么
            if(!super.isHaveDeBuffType(BuffType.Vertigo)){
                if(!super.getIsDie())
                this.startIdle();
            }
            
        }
    }

    startXuanYun(){
        super.playSpinAnimaton(Animation_Name.hurt1,false,null,()=>{
            if(super.isHaveDeBuffType(BuffType.Vertigo)&&!super.getIsDie())
                this.spine.paused=true;
        });
    }

    onAttack(){
        //有前摇动作
        let data=new KeyFrameData();
        data.name="attack1_Start";
        data.callback=()=>{
            this.startLaunch(cc.v2(this.node.x+this.att_pos.x*this.node.scaleX,this.node.y+this.att_pos.y*this.node.scaleY));
        }
        super.playSpinAnimaton(Animation_Name.attack1,false,data,()=>{
            this.startIdle();
        });
    }

    onMove(){
        super.playSpinAnimaton(Animation_Name.run,true);
    }

    startSkill(){
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing || super.isHaveDeBuffType(BuffType.Vertigo))
            return;        
        this.unschedule(this.startMove);
        super.setEnemyState(Enemy_State.skill);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossXuli);
        //蓄力
        let data=new KeyFrameData();
        data.name="skill_Start";
        data.callback=()=>{
            this.releaseSkill();
        }
        super.playSpinAnimaton(Animation_Name.skill1,false,data,()=>{
            //如果有技能等待释放，那么就直接释放
            //根据上个状态判断需要做什么
            if(this.getEnemyPrevState()==Enemy_State.move){
                this.startMove(0,this.getNextPos());
            }else{
                this.startMove(0);
            }
        });
    }

    releaseSkill(){
        let pos=cc.v2(cc.v2(this.node.x+this.att_pos.x*this.node.scaleX,this.node.y+this.att_pos.y*this.node.scaleY));
        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_skill_move,pos);
        let moveTS=node.getComponent(Move);
        moveTS.init(640,0,GameEffectId.boss3_skill_move);
        moveTS.setTargetPos(cc.v2(Math.random()*512-256,-1000),()=>{            
            //GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss3_skill_move,node);            
        },()=>{            
            //造成伤害
            super.injureWall(this.cur_att,DamageType.Skill);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackMinzhong);
        });
    }

    startLaunch(pos:cc.Vec2){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_att_move,pos);
        let moveTS=node.getComponent(Move);
        moveTS.init(540,0,GameEffectId.boss3_att_move);
        moveTS.setTargetPos(cc.v2(Math.random()*512-256,GameManager.getInstance().enemy_att_y-20),()=>{
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_att_end,node.getPosition());
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss3_att_move,node);
            //造成伤害
            super.injureWall(this.cur_att,DamageType.Normal);            
        });
    }

    onDeath() {
        this.unscheduleAllCallbacks();
        super.playDeadAnimaton(Animation_Name.dead,()=>{
            MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
        })
        GameManager.getInstance().sound_manager.playSound(SoundIndex.rewardBox2);         
    }

    update(dt)
    {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);
        if(this.getEnemyState()==Enemy_State.move){
            this.checkMove(dt);
        }        
    }

    private checkMove(dt)
    {        
        if(!super.isHaveDeBuffType(BuffType.Vertigo)){
            let speed=this.cur_move_speed*dt;
            if(this.move_target_pos){
                let offsetPos=this.move_target_pos.sub(this.node.getPosition());
                this.node.scaleX=offsetPos.x>0?this.setup_scale:-this.setup_scale;
                if(offsetPos.mag()<speed)
                {
                    if(this.move_end_callback){
                        this.move_end_callback();
                        this.move_end_callback=null;
                    }
                }else
                {
                    let pi2=Math.PI*2;
                    this.move_direction=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                    this.moving(dt);
                }
            }
        }
    }

    moving(dt){
        let disX=this.node.x;
        let disY=this.node.y;
        let speed=this.cur_move_speed*dt;
        disX+=speed*Math.cos(this.move_direction);
        disY+=speed*Math.sin(this.move_direction);
        this.node.x=disX;
        this.node.y=disY;
        if(this.node.x>320)
        {
            this.node.x=320;
        }
        if(this.node.x<-320)
        {
            this.node.x=-320;
        }
        //不能穿过城墙
        if(this.node.y<this.wall_yy){
            this.node.y=this.wall_yy;
        }
    }

}
