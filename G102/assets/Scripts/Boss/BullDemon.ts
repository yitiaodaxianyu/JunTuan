import { Enemy_Buff_Type, Enemy_DeBuff_Type, Enemy_State } from "../Enemy/EnemyConfig";
import Move from "../Game/Move";
import { GameEffectId, GameEffectsManager } from "../Game/GameEffectsManager";
import GameManager from "../GameManager";

import { TableMonsterData } from "../Level/MissionLevel";
import MyTool from "../Tools/MyTool";

import Monster from "../Monster/Monster";
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
    attack2 = "attack2",          //-- 攻击1
    run = "run",                //-- 跑路
    hurt1 = "hurt1",          //-- 受击1
    hurt2 = "hurt2",          //-- 受击2
    skill5 = "skill5",          //-- 技能动作5
    dead= "dead",   //死亡
}

enum PosType{
    ZuoShang=0,
    YouShang=1,
    ZhongXin=2,
    ZuoXia=3,
    YouXia=4,

}


const {ccclass, property} = cc._decorator;

@ccclass
export default class BullDemon extends Boss {

    //技能队列，在释放完技能后判断，先进先出原则
    skill_list:number[]=[];
    is_skill_finish:boolean=true;
    finish_list:number[]=[];
    moving_track:cc.Vec2[]=[];

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_move,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_end,2);        
        MonsterManager.getInstance().addMonsterPool(10011,4);
        MonsterManager.getInstance().addMonsterPool(20021,4);
        MonsterManager.getInstance().addMonsterPool(10031,4);
        MonsterManager.getInstance().addMonsterPool(20041,4);
        MonsterManager.getInstance().addMonsterPool(10051,4);
        this.addChangeBossHpListen(this.onChangeHp);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.initMovingTrack();
    }

    initMovingTrack(){
        let width=222;
        let height=Math.tan(Math.PI/6)*width;
        let cPos=GameManager.getInstance().getFightCenter();
        //let L=Math.sin(Math.PI/6)
        this.moving_track=[cc.v2(-width+cPos.x,height+cPos.y),cc.v2(width+cPos.x,height+cPos.y),cPos,cc.v2(-width+cPos.x,-height+cPos.y),cc.v2(width+cPos.x,-height+cPos.y)];
    }

    onChangeHp(){
        let remainPer=this.cur_hp/this.max_hp;
        if(remainPer<0.95){
            this.startSkill(0);
        }     
        if(remainPer<0.65){
            this.startSkill(0);
            this.startSkill(1);
        }
        if(remainPer<0.35){
            this.startSkill(0);
            this.startSkill(1);
            this.startSkill(2);
        }
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
        this.scheduleOnce(this.startMove,2)
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
        pos=pos?pos:this.getRandomPos();
        this.setTargetPos(pos,()=>{
            this.cur_pos_type=this.next_pos_type;
            if(this.node.x<-128){
                this.node.scaleX=this.setup_scale;
            }
            if(this.node.x>128){
                this.node.scaleX=-this.setup_scale;
            }
            this.startAttack();
        })
    }

    startAttack(){
        //有前摇动作
        this.unschedule(this.startMove);
        super.setEnemyState(Enemy_State.att);
        let data=new KeyFrameData();
        data.name="attack1_Start";
        data.callback=()=>{
            this.startLaunch(cc.v2(this.node.x+this.att_pos.x*this.node.scaleX,this.node.y+this.att_pos.y*this.node.scaleY));
        }
        super.playSpinAnimaton(Animation_Name.attack1,false,data,()=>{
            this.startIdle();
        });
    }

    startSkill(jieduan:number){
        if(super.isHaveDeBuffType(BuffType.Vertigo)||this.finish_list.includes(jieduan))
            return;
        if(this.is_skill_finish==false){
            if(!this.skill_list.includes(jieduan))
                {
                    this.skill_list.push(jieduan);
                }
            return;
        }
        this.unschedule(this.startMove);
        this.is_skill_finish=false;
        super.setEnemyState(Enemy_State.skill);
        //蓄力
        this.finish_list.push(jieduan);
        let data=new KeyFrameData();
        data.name="skill_Start";
        data.callback=()=>{
            this.releaseSkill(jieduan);
        }
        super.playSpinAnimaton(Animation_Name.skill5,false,data,()=>{
            //如果有技能等待释放，那么就直接释放
            this.is_skill_finish=true;
            if(this.skill_list.length>0){
                let jieduan=this.skill_list.shift();
                this.startSkill(jieduan);
            }else
            //根据上个状态判断需要做什么
            if(this.getEnemyPrevState()==Enemy_State.move){
                this.startMove(0,this.getNextPos());
            }else{
                this.startMove(0);
            }
            this.jiasu();
        });
    }

    releaseSkill(skillJieDuan:number){
        let idAndNum=this.getZhaoHuanGuai(skillJieDuan);
        let monsterNum=0;
        for(let n=0; n<idAndNum.length; n++){
            let mm=idAndNum[n];
            for(let m=0; m<mm.num; m++){
                monsterNum++;
            }
        }
        let posArr=this.getZhaoHuanPos(monsterNum);
        let posIndex=0;
        // for(let n=0; n<idAndNum.length; n++){
        //     let mm=idAndNum[n];
        //     for(let m=0; m<mm.num; m++,posIndex++){
        //         console.log("___________1")
        //         let node=MonsterManager.getInstance().createMonsterById(mm.id,posArr[posIndex],mm.level,1);                
        //         let ets=node.getComponent(Monster);
        //         //ets.is_can_count=false;
        //     }
        // }
    }

    getZhaoHuanPos(num:number):cc.Vec2[]{
        //根据boss的位置决定起始位置，范围都是半圆π（180°）
        //圆心
        let bossPos=this.node.getPosition();
        let r=128;        
        let radian=Math.PI/(num-1);
        let startRadian=Math.PI;
        if(bossPos.x<-128){
            startRadian=Math.PI*3/2;
        }else if(bossPos.x>=-128&&bossPos.x<=128){
            startRadian=Math.PI;
        }else if(bossPos.x>128){
            startRadian=Math.PI/2;
        }
        let posArr=new Array();
        for(let i=0;i<num;i++){
            let rr=i*radian+startRadian;
            let y=bossPos.y+Math.sin(rr)*r;
            let x=bossPos.x+Math.cos(rr)*r;
            posArr.push(cc.v2(x,y));
        }
        return MyTool.randomArray(posArr);
    }

    getZhaoHuanGuai(skillJieDuan:number):TableMonsterData[]{
        //召唤小怪
        let idAndNum=new Array<TableMonsterData>();
        switch(skillJieDuan){
            case 0:{
                let tmd=new TableMonsterData();
                tmd.id=10011;
                tmd.num=8;
                tmd.level=1;
                idAndNum.push(tmd);
            }break;
            case 1:{
                let tmd=new TableMonsterData();
                tmd.id=20021;
                tmd.num=6;
                tmd.level=2;
                let tmd2=new TableMonsterData();
                tmd2.id=20041;
                tmd2.num=4;
                tmd2.level=tmd.level;
                idAndNum.push(tmd);
                idAndNum.push(tmd2);
            }break;
            case 2:{
                let tmd=new TableMonsterData();
                tmd.id=10031;
                tmd.num=6;
                tmd.level=3;
                let tmd2=new TableMonsterData();
                tmd2.id=20041;
                tmd2.num=2;
                tmd2.level=tmd.level;
                let tmd3=new TableMonsterData();
                tmd3.id=10051;
                tmd3.num=4;
                tmd3.level=tmd.level;
                idAndNum.push(tmd);
                idAndNum.push(tmd2);
                idAndNum.push(tmd3);
            }break;
        }
        return idAndNum;
    }

    getNextPos():cc.Vec2{
        return this.moving_track[this.next_pos_type];
    }

    // getRandomPos():cc.Vec2{
    //     let pos=cc.v2(0,0);
    //     let randType=[];
    //     switch(this.cur_pos_type){
    //         case PosType.ZuoShang:{
    //             randType=[PosType.ZhongXin,PosType.ZuoXia];                
    //         }break;
    //         case PosType.YouShang:{
    //             randType=[PosType.ZhongXin,PosType.YouXia];                
    //         }break;
    //         case PosType.ZhongXin:{
    //             randType=[PosType.ZuoShang,PosType.YouShang,PosType.ZuoXia,PosType.YouXia];                
    //         }break;
    //         case PosType.ZuoXia:{
    //             randType=[PosType.ZuoShang,PosType.ZhongXin];                
    //         }break;
    //         case PosType.YouXia:{
    //             randType=[PosType.YouShang,PosType.ZhongXin];                
    //         }break;
    //     }
    //     let randIndex=Math.floor(Math.random()*randType.length);
    //     this.next_pos_type=randType[randIndex]
    //     pos=this.moving_track[this.next_pos_type];
    //     return pos;
    // }

    getAllPos():cc.Vec2[]{
        let width=222;
        let height=Math.tan(Math.PI/6)*width;
        let cPos=GameManager.getInstance().getFightCenter();
        //let L=Math.sin(Math.PI/6)
        let allPos=[cc.v2(-width+cPos.x,height+cPos.y),cc.v2(width+cPos.x,height+cPos.y),cPos,cc.v2(-width+cPos.x,-height+cPos.y),cc.v2(width+cPos.x,-height+cPos.y)];
        return allPos;
    }

    startLaunch(pos:cc.Vec2){
        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss1_att_move,pos);
        let moveTS=node.getComponent(Move);
        moveTS.init(540,0,GameEffectId.boss1_att_move);
        moveTS.setTargetPos(cc.v2(Math.random()*512-256,GameManager.getInstance().enemy_att_y-20),()=>{
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss1_att_end,node.getPosition());
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss1_att_move,node);
            //造成伤害
            //super.injureWall(DamageType.Normal);
        });
    }

    jiasu():boolean
    {
        //给范围N个敌人加血
        let selfPos=this.node.getPosition();
        let enemys=MonsterManager.getInstance().getMonstersForCenterPos(-1,selfPos,160);
        if(enemys)
        {
            for(let i=0; i<enemys.length; i++)
            {
                let enemy=enemys[i];
                if(this.node.uuid!=enemy.uuid)
                {
                    this.createJiaSu(enemys[i]);
                }                
            }
            return false;
        }
        return true;
    }

    createJiaSu(enemy:cc.Node)
    {
        // let node=cc.instantiate(this.prefab_jiasu);
        // node.parent=GameManager.getInstance().fighting_effect_manager.node;
        // node.setPosition(this.getJuJiPos());
        // let follow=node.getComponent(TrackBullect);
        // follow.init(enemy,600,()=>{
        //     enemy.getComponent(Monster).addBuff(Enemy_Buff_Type.jiasu);
        // },null);
        
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
