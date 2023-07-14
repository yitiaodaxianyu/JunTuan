import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { DamageType, BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import MonsterBullet from "../../Monster/MonsterBullet";
import { KeyFrameData } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import Boss from "../Boss";
import BossSkill8 from "./BossSkill8";

enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack = "Attack1",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill1_1 = "Skill1_1",          //-- 技能1-1
    skill1_2 = "Skill1_2",          //-- 技能1-2
    skill1_3 = "Skill1_3",          //-- 技能1-3
    skill1_4 = "Skill1_4",          //-- 技能1-4
    skill1_5 = "Skill1_5",          //-- 技能1-5
    skill1_6 = "Skill1_6",          //-- 技能1-6
    skill2 = "Skill2",          //-- 技能2
    skill3 = "Skill3",          //-- 技能2
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Boss8 extends Boss {
    
    att_num:number=0;
    is_active_skill_3:boolean=false;
    kuangbao_value:number[]=[];
    is_kuang_bao:boolean=false;
    /**当前的召唤索引 */
    cur_zhaohuan_index:number=0;
    skill_pos:cc.Vec2=cc.v2();
    /**钻地动作，尾部相对头部的坐标 */
    wei_zuandi_pos:cc.Vec2=cc.v2(0,0);
    /**出地动作，尾部相对头部的坐标 */
    wei_chudi_pos:cc.Vec2=cc.v2(0,0);
    @property(cc.Node)
    wei_node:cc.Node=null;    

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss8_attack_bullect,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss8_attack_bullect_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss8_skill_bullect,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss8_skill_bullect_hit,4);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.xuanyun,2);
        
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
        
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128; 
        this.kuangbao_value[0]=this.skill_data.getSkillValue1(3);
        this.skill_pos=this.node.getChildByName('skill').getPosition();
        this.wei_node=new cc.Node("wei");
        let weiSp=this.wei_node.addComponent(sp.Skeleton);        
        weiSp.skeletonData=(this.spine.skeletonData);
        GroundManager.getInstance().node.addChild(this.wei_node);
        this.wei_node.setPosition(this.node.getPosition());
        this.wei_node.active=false;
        this.shadow.active=false;
    }

    onChangeHp(num:number){
        if(this.cur_hp<=this.max_hp*0.3){
            if(this.is_active_skill_3==false&&this.skill_cold_down[2]<=0){
                this.is_active_skill_3=true;
                this.startSkill(3);
            }
        }else{
            if(this.is_active_skill_3==true){
                this.is_active_skill_3=false;
                this.setKuangBao(false);
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BOSS8Attack);
            let bullect=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss8_attack_bullect,this.getAttPos());
            bullect.getComponent(MonsterBullet).init(this.getAttData(DamageType.Normal,true),GameEffectId.boss8_attack_bullect,GameEffectId.boss8_attack_bullect_hit,1600,Math.PI*3/2);
            this.att_num++;
            if(this.att_num>=5){
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
    
    //钻地
    startSkill1(){
        let skillNo=1;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);                
                super.playSpinAnimaton((Animation_Name.skill1_1),false,null,()=>{
                    super.playSpinAnimaton((Animation_Name.skill1_2),true,null,null);
                    this.unschedule(this.startZuanDi);
                    this.scheduleOnce(this.startZuanDi,2);
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
    
    startZuanDi(){
        if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)&&this.getIsDie()==false){
            //钻地的过程是免控的
            this.cur_toughness+=1;
            //显示尾部，同时播放钻地动作
            this.wei_node.active=true;
            let weiSp=this.wei_node.getComponent(sp.Skeleton);
            let weiAnima=weiSp.setAnimation(0,Animation_Name.skill1_4,false);
            weiSp.setTrackCompleteListener(weiAnima,(entry: sp.spine.TrackEntry, event) =>{
                weiAnima.listener=null;
                this.wei_node.active=false;
            });
            // let data=new KeyFrameData();
            //     data.name='Skill';
            //     data.callback=()=>{
                    
            //     }
            super.playSpinAnimaton((Animation_Name.skill1_3),false,null,()=>{
                //开始回血
                //super.setEnemyState(Enemy_State.born);
                this.node.getComponent(cc.Collider).enabled=false;
                let buffData=new BuffData();
                buffData.remain_time=this.skill_data.getSkillValue2(1);
                buffData.buff_value=[this.skill_data.getSkillValue1(1)*this.getMaxHp()];
                buffData.buff_id=BuffId.Boss8_Skill_1_jiaxue;
                buffData.recovery_jiange_time=1;
                let timer=this.addBuff(buffData);
                timer.addDestroyListen(this.onSkill1End.bind(this));
            })
        }
    }    

    onSkill1End(buffData:BuffData){
        //钻出地面
        //钻地的过程是免控的       
        //显示尾部，同时播放钻地动作
        this.wei_node.active=true;
        let weiSp=this.wei_node.getComponent(sp.Skeleton);
        let weiAnima=weiSp.setAnimation(0,Animation_Name.skill1_6,false);
        weiSp.setTrackCompleteListener(weiAnima,(entry: sp.spine.TrackEntry, event) =>{
            weiAnima.listener=null;
            this.wei_node.active=false;
        });       
        super.playSpinAnimaton((Animation_Name.skill1_5),false,null,()=>{
            this.node.getComponent(cc.Collider).enabled=true;
            this.cur_toughness-=1;
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

    //甩鼻涕
    startSkill2(){this.getAttPos()
        let skillNo=2;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss8Attack2);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill2';
                data.callback=()=>{
                    this.att_jishu=0;
                    let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss8_skill_bullect,this.getSkillPos());
                    node.getComponent(BossSkill8).init(this.getAttData(DamageType.Skill,true,this.skill_data.getSkillValue1(2)),GameEffectId.boss8_skill_bullect,GameEffectId.boss8_skill_bullect_hit,1500,Math.PI*3/2);
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

    
    /**狂暴 */
    startSkill3(){
        if(this.is_active_skill_3==false){
            return
        }
        let skillNo=3;
        let skillIndex=skillNo-1;
        this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss5Beidong);
                this.cur_toughness+=1;
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[skillIndex]=this.skill_data.getSkillColdDown(skillNo);
                let data=new KeyFrameData();
                data.name='Skill3';
                data.callback=()=>{                    
                    this.att_jishu=0;
                    this.cur_toughness-=1;
                    this.att_jishu=0;
                    this.setKuangBao(true);
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
    
    setKuangBao(isKB:boolean){
        //this.setHands(isKB)
        if(this.is_kuang_bao!=isKB){
            this.is_kuang_bao=isKB;
            this.is_active_skill_3=isKB;
            if(isKB){
                this.changeAttackSpeed(this.kuangbao_value[0]);
            }else{
                this.changeAttackSpeed(-this.kuangbao_value[0]);
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
        this.unschedule(this.startZuanDi);
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
            if(this.skill_cold_down[i]>0){
                this.skill_cold_down[i]-=dt;
                if(i==2){
                    //第3个技能,激活类技能不在此释放
                    continue;
                }
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
