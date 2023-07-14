import { Enemy_DeBuff_Type, Enemy_State } from "../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";
import { GameState } from "../Constants";
import MonsterManager from "../Monster/MonsterManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { KeyFrameData } from "../Monster/MonsterData";
import FixedPos from "../UI/home/FixedPos";
import FightingManager from "../Game/FightingManager";
import GroundManager from "../Game/GroundManager";
import Boss from "./Boss";
import Hero from "../Hero/Game/Hero";
import { DamageType, Hero_Type, Hero_DeBuff, BuffType, BuffId } from "../Hero/Game/HeroConfig";
import BuffTimer from "../Hero/Game/BuffTimer";
import { BuffData } from "../Hero/Game/BuffData";

enum Animation_Name
{
    Idle = "idle",       //-- 正面待机
    attack1 = "attack1",          //-- 攻击1
    run = "run",                //-- 跑路
    hurt1 = "hurt1",          //-- 受击1
    skill1 = "skill1",          //-- 技能动作1
    skill2 = "skill2",          //-- 技能动作2
    skill3 = "skill3",          //-- 技能动作3
    dead= "dead",   //死亡
}

enum SprintState{
    /**冲刺开始*/
    start=0,
    /**冲刺中*/
    sprinting,
    /**冲刺结束*/
    end,
}

enum RangeType{
    /**蓝色区域*/
    blue=0,
    /**红色区域*/
    red,
    /**所有区域*/
    all,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Rock extends Boss {

    prev_pos:cc.Vec2=null;
    red_range:cc.Rect=null;
    blue_range:cc.Rect=null;
    move_range:cc.Rect=null;
    acceleration:number=20;
    cur_sprint_speed:number=10;
    sprint_state:SprintState=SprintState.start;
    att_jishu:number=0;
    skill_jishu:number=0;
    skill_move_effect:cc.Node=null;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss2_att_end,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss2_skill_end,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss2_skill_move,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.xuanyun,2);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.initMovingRange();
        this.cur_sprint_speed=this.cur_move_speed;
    }

    initMovingRange(){
        let width=512;
        let cPos=GameManager.getInstance().getFightCenter();
        //中心点的上半区是红色区域
        let redHeight=320;
        this.red_range=cc.rect(cPos.x-width/2,cPos.y,width,redHeight);   
        //中心点的下半区是蓝色区域
        let bluedHeight=160;
        this.blue_range=cc.rect(cPos.x-width/2,cPos.y-bluedHeight,width,bluedHeight);
        this.move_range=cc.rect(this.blue_range.x,this.blue_range.y,width,bluedHeight+redHeight);        
    }

    onBossInited(): void {
        this.startIdle();
    }

    setTargetPos(pos:cc.Vec2,endCallback:Function){
        this.move_target_pos=pos;
        this.move_end_callback=endCallback;
    }

    startIdle(){        
        super.setEnemyState(Enemy_State.standby);
        super.playSpinAnimaton(Animation_Name.Idle,true);
        this.scheduleOnce(this.startMove,1)
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.startXuanYun();
        }else{
            //根据上个状态判断需要做什么
            if(!super.getIsDie())
                this.startIdle();
        }
    }

    startXuanYun(){
        super.playSpinAnimaton(Animation_Name.hurt1,false,null,()=>{
            if(super.isHaveDeBuffType(BuffType.Vertigo)&&!super.getIsDie())
                this.spine.paused=true;
        });
    }

    startMove(dt:number,pos?:cc.Vec2){
        super.setEnemyState(Enemy_State.move);
        super.playSpinAnimaton(Animation_Name.run,true);
        pos=pos?pos:this.getRandomPos(RangeType.all);
        this.prev_pos=this.node.getPosition();
        this.setTargetPos(pos,()=>{                 
            if(this.node.x<-128){
                this.node.scaleX=this.setup_scale;
            }
            if(this.node.x>128){
                this.node.scaleX=-this.setup_scale;
            }
            let curPos=this.node.getPosition();
            let distance=curPos.sub(this.prev_pos).mag();
            if(distance>=200){
                this.startIdle();
            }else{
                this.startMove(0,this.getRandomPos(RangeType.all));
            }            
        })
        if(this.skill_move_effect){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss2_skill_move,this.skill_move_effect);
            this.skill_move_effect=null;
        }
    }

    startAttack(){
        if(this.getEnemyState()==Enemy_State.skill){
            return;
        }
        if(this.move_range.contains(this.node.getPosition())){
            //有前摇动作
            this.att_jishu=0;
            this.unschedule(this.startMove);
            super.setEnemyState(Enemy_State.att);
            let data=new KeyFrameData();
            data.name="attack1_Start";
            data.callback=()=>{
                this.startLaunch();
            }
            super.playSpinAnimaton(Animation_Name.attack1,false,data,()=>{
                this.startIdle();
            });
        }else
        {
            this.startMove(0,this.getRandomPos(RangeType.all));
        }
    }

    startSkill(){
        if(this.red_range.contains(this.node.getPosition())){
            this.skill_jishu=0;
            this.cur_toughness=1;
            this.unschedule(this.startMove);
            this.skill_jishu=0;
            super.setEnemyState(Enemy_State.skill);
            this.cur_sprint_speed=this.cur_move_speed;
            this.sprint_state=SprintState.start;
            //蓄力先放技能1
            super.playSpinAnimaton(Animation_Name.skill1,false,null,()=>{
                //再放技能2
                super.playSpinAnimaton(Animation_Name.skill2,true,null,null);
                this.releaseSkill();
            });
        }else{
            this.startMove(0,this.getRandomPos(RangeType.red));
        }        
    }

    releaseSkill(){
        //开始移动
        this.sprint_state=SprintState.sprinting;
        //添加特效
        this.skill_move_effect=GroundManager.getInstance().createGameEffectById(GameEffectId.boss2_skill_move,this.node.getPosition().add(cc.v2(10,150)));
        this.skill_move_effect.getComponent(FixedPos).init(this.node,cc.v2(10,150));
        
    }

    getRandomPos(type:RangeType):cc.Vec2{
        let pos=cc.v2(0,0);
        let rect=this.move_range;
        switch(type){
            case RangeType.blue:{
                rect=this.blue_range;
            }break;
            case RangeType.red:{
                rect=this.red_range;
            }break;
            case RangeType.all:{
                rect=this.move_range;
            }break;
        }
        pos.x=rect.x+Math.random()*rect.width;
        pos.y=rect.y+Math.random()*rect.height;
        return pos;
    }    
    
    startLaunch(){
        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss2_att_end,cc.v2(Math.random()*512-256,GameManager.getInstance().enemy_att_y));
        //造成伤害
        super.injureWall(this.cur_att,DamageType.Normal);
    }

    onDeath() {
        if(this.skill_move_effect){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss2_skill_move,this.skill_move_effect);
            this.skill_move_effect=null;
        }
        super.playDeadAnimaton(Animation_Name.dead,()=>{
            MonsterManager.getInstance().destroyMonster(this.node,this.monster_type);
        })
        this.unscheduleAllCallbacks();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.rewardBox2);
    }

    onSprintEnd(){
        if(this.skill_move_effect){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss2_skill_move,this.skill_move_effect);
            this.skill_move_effect=null;
        }
        super.playSpinAnimaton(Animation_Name.skill3,true,null,()=>{
            this.startMove(0,this.getRandomPos(RangeType.blue));
            this.cur_toughness=0;
        });
        cc.tween(this.node).then(cc.jumpBy(20/60,0,80,64,1)).start();
        //造成伤害和眩晕
        super.injureWall(this.cur_att,DamageType.Skill);
        //特效 
        FightingManager.getInstance().createGameEffectById(GameEffectId.boss2_skill_end,this.node.getPosition().add(cc.v2(10,32)));
        let heroRoot=cc.find('Canvas/Hero_Root');
        let data=new BuffData();
        data.buff_type=BuffType.Vertigo;
        data.buff_id=BuffId.Monster_XuanYun;
        data.remain_time=2;
        for(let i=0; i<heroRoot.childrenCount; i++){
            let hero=heroRoot.children[i].getComponent(Hero);
            if(hero)
            hero.addDeBuff(data);
        }
    }

    update(dt)
    {
        if((GameManager.getInstance().cur_game_state!=GameState.Game_Playing)||this.getIsDie())
        {
            return;
        }
        super.update(dt);

        this.att_jishu+=dt;
        this.skill_jishu+=dt;
        if(this.att_jishu>=this.att_jiange&&this.move_range.contains(this.node.getPosition())){
            this.startAttack();
        }
        if(this.skill_jishu>=10&&this.red_range.contains(this.node.getPosition())){
            this.startSkill();
        }
        if(this.getEnemyState()==Enemy_State.move){
            this.checkMove(dt);
        }else if(this.getEnemyState()==Enemy_State.skill ){
            switch(this.sprint_state)
            {
                case SprintState.sprinting:{
                    this.sprinting(dt);
                }break;
                case SprintState.end:{

                }
            }
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

    sprinting(dt:number){
        let disX=this.node.x;
        let disY=this.node.y;
        this.cur_sprint_speed+=this.acceleration;
        let speed=this.cur_sprint_speed*dt;
        this.move_direction=Math.PI*3/2;
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
        if(this.node.y<(this.wall_yy-100)){
            this.node.y=this.wall_yy-100;
            this.sprint_state=SprintState.end;
            this.onSprintEnd();
        }
    }    
}
