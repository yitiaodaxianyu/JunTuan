import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { DamageType, BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import MonsterBullet from "../../Monster/MonsterBullet";
import { KeyFrameData, StrengthType } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import Wall from "../../Wall/Wall";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";
import Boss from "../Boss";
enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack = "Attack1",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill2 = "Skill2",          //-- 技能2
    skill2_1 = "Skill2_1",          //-- 技能2-1开始蓄力
    skill2_2 = "Skill2_2",          //-- 技能2-2蓄力
    skill2_3 = "Skill2_3",          //-- 技能2-3蓄力结束
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss9 extends Boss {
    
    @property([cc.Node])
    mao_yan:cc.Node[]=[];
    is_active_skill_3:boolean=false;
    skill_num:number=0;
    att_num:number=0;
    /**是否处于引导中 */
    is_yindao:boolean=true;
    /**喷火节点 */
    fire_node:cc.Node=null;
    /**喷火次数 */
    pen_huo_num:number=0;
    /**引导的计数 */
    yindao_jishu:number=0;
    /**缩放速度 */
    scale_speed:number=16;
    /**一倍的缩放值的距离间隔 */
    once_distance:number=0;
    /**总的引导时间 */
    yindao_time:number=1;
    kuangbao_value:number[]=[];
    skill_pos:cc.Vec2=cc.v2();
    /**是否过载 */
    is_guozai:boolean=false;
    bao_lie_jishu:number=0;
    /**无敌护盾 */
    wudi_hudu:cc.Node=null;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss9_attack_bullect,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss9_attack_bullect_hit,1);        
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss9_skill2_penhuo,1);          
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss9_skill3_hudun,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss9_skill3_baolie,4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
        this.setMaoYan(false);
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
        this.skill_num=0;
        this.skill_pos=this.node.getChildByName('skill').getPosition();
        let distance=this.getSkillPos().y-WallManager.getInstance().getMainWall().getWallMaxYY();
        this.once_distance=distance/4;
        this.is_active_skill_3=false;
    }

    onChangeHp(num:number){
        if(this.cur_hp<=this.max_hp*0.1){
            if(this.is_active_skill_3==false){
                this.is_active_skill_3=true;
                this.startSkill(3);
            }
        }
    }

    setMaoYan(isShow:boolean){
        for(let i=0; i<this.mao_yan.length; i++){
            this.mao_yan[i].active=isShow;
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BOSS9Attack);
            let bullect=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss9_attack_bullect,this.getAttPos());
            bullect.getComponent(MonsterBullet).init(this.getAttData(DamageType.Normal,true),GameEffectId.boss9_attack_bullect,GameEffectId.boss9_attack_bullect_hit,1500,Math.PI*3/2);
            this.att_num++;
            if(this.att_num>=3){
                this.att_num=0;
                this.skill_queue.push(2);
            }
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

    getSkillPos():cc.Vec2{
        let disPos=this.node.getPosition().add(cc.v2(this.skill_pos.x*this.node.scaleX,this.skill_pos.y*this.node.scaleY));
        return disPos;
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
    //过载
    startSkill1(){
        if(this.isHaveBuff(BuffId.Boss9_Skill_1_guozai)==false){
            let buffData=new BuffData();
            buffData.buff_id=BuffId.Boss9_Skill_1_guozai;
            buffData.remain_time=this.skill_data.getSkillValue4(1);
            buffData.buff_value=[this.skill_data.getSkillValue2(1),this.skill_data.getSkillValue3(1)];
            let buff=super.addBuff(buffData);
            buff.addDestroyListen(this.onSkill1End.bind(this));
            //过载表现效果
            //全身通红
            this.is_guozai=true;
            //冒烟+随机爆裂效果
            this.setMaoYan(true);
            //抖动的效果
        }        
    }

    onSkill1End(){
        this.is_guozai=false;
        this.node.color=cc.Color.WHITE;
        this.setMaoYan(false);
    }

    //喷火
    startSkill2(){
        let skillNo=2;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss4Skill);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                super.playSpinAnimaton((Animation_Name.skill2_1),false,null,()=>{
                    super.playSpinAnimaton((Animation_Name.skill2_2),true,null,null);
                    this.is_yindao=true;
                    this.yindao_time=3;
                    let pos=this.getSkillPos()
                    this.fire_node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss9_skill2_penhuo,pos);
                    this.fire_node.scale=0;
                    this.fire_node.angle=180;
                    this.pen_huo_num=0;
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

    startSkill3(){
        //护盾+加血+无敌
        let skillNo=3;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        //打断        
        this.startIdle();
        this.setEnemyState(Enemy_State.skill);
        let buffData=new BuffData();
        buffData.buff_id=BuffId.Boss9_Skill_3_widu;
        buffData.remain_time=this.skill_data.getSkillValue2(3);
        buffData.recovery_jiange_time=0.2;
        let hp=this.skill_data.getSkillValue1(3)*this.getMaxHp()/(buffData.remain_time/buffData.recovery_jiange_time);
        buffData.buff_value=[hp];
        let buff=super.addBuff(buffData);
        buff.addDestroyListen(this.onSkill3End.bind(this));
        this.wudi_hudu=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss9_skill3_hudun,this.node.getPosition());

    }

    onSkill3End(){
        GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss9_skill3_hudun,this.wudi_hudu);
        if(this.skill_queue.length>0){
            super.setEnemyState(Enemy_State.standby);
            this.startSkill(this.skill_queue.shift());
        }else{
            this.startIdle();
        }
    }

    addSkillNum(){
        this.skill_num++;
        if(this.skill_num>=this.skill_data.getSkillValue1(1)){
            //过载
            this.startSkill1();
        }
    }

    fireDamage(wall:Wall){
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            this.addSkillNum();
            //播放动画
            //let pos=cc.v2(super.getAttPos().x,wall.getWallMaxYY()-32);         
            let attData=super.getAttData(DamageType.Skill,false,this.skill_data.getSkillValue1(2))
            attData.is_big=false;
            attData.zengshang_rate+=this.pen_huo_num*this.skill_data.getSkillValue2(2);
            let data=wall.beInjured(attData);//
            if(data.getDamageNum()>0){
                this.pen_huo_num++;
            }
        }
    }
    /**销毁喷火特效 */
    destroyFire(isIdle:boolean) {
        this.is_yindao=false;
        if(this.fire_node){
            cc.tween(this.fire_node).to(0.2,{scale:0}).call(()=>{
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss9_skill2_penhuo,this.fire_node);
            }).start();
        }        
        if(isIdle){
            super.playSpinAnimaton((Animation_Name.skill2_3),false,null,()=>{
                this.startIdle();
            });
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
        this.destroyFire(false);
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
        this.destroyFire(false);
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
        //this.checkSkill(dt);
        this.checkYinDao(dt);
        if(this.getEnemyState()!=Enemy_State.skill){
            if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
                this.checkAtt(dt);
            }
        }
        if(this.is_guozai){
            this.node.color=cc.Color.RED;
            this.bao_lie_jishu+=dt;
            if(this.bao_lie_jishu>=0.2){
                this.bao_lie_jishu=0;
                let center=this.getJuJiPos();
                let banjing=Math.random()*200;
                let hudu=Math.random()*(Math.PI*2);
                let xx=center.x+Math.cos(hudu)*banjing;
                let yy=center.y+Math.sin(hudu)*banjing;
                GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss9_skill3_baolie,cc.v2(xx,yy))
            }
        }
    }

    checkYinDao(dt:number){
        if(this.is_yindao){                        
            if(this.fire_node){
                let walls=WallManager.getInstance().getAllWall();
                let attWall=null;
                walls.forEach((wall:Wall,wallType:WallType)=>{
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if(this.node.y>=wall.getWallMaxYY()){                
                        attWall=wall;
                    }
                })
                if(attWall){
                    let distance=super.getAttPos().y-attWall.getWallMaxYY();
                    let maxScale=distance/this.once_distance+1;
                    //根据距离算出缩放值，最小1倍，最大6倍
                    if(this.fire_node.scale>=maxScale){
                        this.fire_node.scale=maxScale;
                        this.yindao_jishu+=dt;
                        if(this.yindao_jishu>=0.2){
                            this.yindao_jishu=0;
                            this.fireDamage(attWall);
                        }
                    }else{
                        this.fire_node.scale+=this.scale_speed*dt;
                    }                    
                }
                
            }
            this.yindao_time-=dt;
            if(this.yindao_time<=0){
                this.yindao_time=0;
                this.destroyFire(true);
            }
        }
    }

    /**技能检测 */
    checkSkill(dt:number){
        for(let i=0; i<2; i++){            
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
        }else{
            //this.moving(dt);
        }
    }
    
}
