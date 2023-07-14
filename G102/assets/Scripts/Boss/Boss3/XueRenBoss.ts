import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectsManager, GameEffectId } from "../../Game/GameEffectsManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { DamageType, BuffId, BuffType } from "../../Hero/Game/HeroConfig";
import { KeyFrameData, StrengthType } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import { WallType } from "../../Wall/WallConfig";
import WallManager from "../../Wall/WallManager";
import Boss from "../Boss";
import BossAtt3 from "./BossAtt3";
import XueYin from "./XueYin";

enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack1 = "Attack1",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill1 = "Skill1",          //-- 技能1
    skill2_1 = "Skill2_1",          //-- 技能2-1开始蓄力
    skill2_2 = "Skill2_2",          //-- 技能2-2蓄力
    skill2_3 = "Skill2_3",          //-- 技能2-3蓄力结束
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class XueRenBoss extends Boss {
    
    xue_yin:XueYin=null;
    is_active_skill_2:boolean=false;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.xuanyun,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_normal_attack,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_normal_attack_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_skill_1,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_skill_1_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_skill_2,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_skill_2_hit,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss3_skill_2_xueyin,1);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=128;
    }

    onChangeHp(num:number){
        if(this.cur_hp<=this.max_hp/2){
            if(this.is_active_skill_2==false){
                this.is_active_skill_2=true;
                this.startSkill(2);
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss3Attack);
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_normal_attack,super.getAttPos());
            node.getComponent(BossAtt3).init(super.getAttData(DamageType.Normal,true,0),GameEffectId.boss3_normal_attack,1200,Math.PI*3/2,this.node.y,270);
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
                if(this.is_active_skill_2){
                    this.startSkill2();
                }                
            }break;
        }
    }
    
    //蓄力砸雪球
    startSkill1(){
        this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[0]=this.skill_data.getSkillColdDown(1);
                let data=new KeyFrameData();
                data.name='Skill';
                data.callback=()=>{  
                    this.att_jishu=0;                    
                    let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_skill_1,super.getAttPos());
                    let tss=node.getComponent(BossAtt3);
                    tss.init(super.getAttData(DamageType.Skill,true,this.skill_data.getSkillValue1(1)),GameEffectId.boss3_skill_1,1200,Math.PI*3/2,this.node.y,270);
                    tss.setBuffData(this.skill_data.getSkillValue3(1),this.skill_data.getSkillValue2(1));
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
                if(this.skill_queue.indexOf(1)<0){
                    this.skill_queue.push(1);
                }
            }
        }else{
            if(this.skill_queue.indexOf(1)<0){
                this.skill_queue.push(1);
            }
        }
    }
    //防御
    startSkill2(){
        this.skill_cold_down[1]=this.skill_data.getSkillColdDown(2);
        if(super.getEnemyState()!=Enemy_State.att&&super.getEnemyState()!=Enemy_State.skill){
            if(!super.isHaveDeBuff(BuffId.Hero_XuanYun)){
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss3Skill1xuli);
                super.setEnemyState(Enemy_State.skill);
                this.skill_cold_down[1]=this.skill_data.getSkillColdDown(2);
                this.cur_toughness+=1;
                super.playSpinAnimaton((Animation_Name.skill2_1),false,null,()=>{
                    super.playSpinAnimaton((Animation_Name.skill2_2),true,null,null);
                    //循环5秒                    
                    //添加buff
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Boss3_MianYi_KongZhi;
                    buffData.remain_time=5;
                    let buff=super.addBuff(buffData);
                    buff.addDestroyListen(this.onSkillBuffDestory.bind(this));
                    //添加雪印
                    buff.addFloorListen(this.onAddFloor.bind(this));
                    let hpRoot=cc.find('Canvas/Ui_Root/top_ui/BossHpRoot');
                    this.xue_yin=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.boss3_skill_2_xueyin,cc.v2(0,0),hpRoot).getComponent(XueYin);
                    this.xue_yin.setFloor(0);
                })
            }else{
                if(this.skill_queue.indexOf(2)<0){
                    this.skill_queue.push(2);
                }
            }
        }else{
            if(this.skill_queue.indexOf(2)<0){
                this.skill_queue.push(2);
            }
        }
    }
    /**
     * 
     * @param floor 当前的层数
     */
    onAddFloor(floor:number){
        let num=floor-1;
        if(this.xue_yin){
            this.xue_yin.setFloor(num);
        }
        
    }

    /**Buff销毁时回调，num：buff叠加的层数 */
    onSkillBuffDestory(buffData:BuffData){        
        this.skill_cold_down[1]=this.skill_data.getSkillColdDown(2);
        let num=buffData.cur_floor-1;
        if(num>0){
            //反击
            super.setEnemyState(Enemy_State.skill);
            let data=new KeyFrameData();
            data.name='Skill2';
            data.callback=()=>{  
                this.att_jishu=0;
                this.startSkill2Lanuch(num);
            }
            super.playSpinAnimaton((Animation_Name.skill2_3),false,data,()=>{
                this.cur_toughness-=1;
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss3_skill_2_xueyin,this.xue_yin.node);
                this.xue_yin=null;
                if(this.skill_queue.length>0){
                    super.setEnemyState(Enemy_State.standby);
                    this.startSkill(this.skill_queue.shift());
                }else{
                    this.startIdle();
                }
            })
        }else{
            this.cur_toughness-=1;
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss3_skill_2_xueyin,this.xue_yin.node);
            this.xue_yin=null;
            if(this.skill_queue.length>0){
                super.setEnemyState(Enemy_State.standby);
                this.startSkill(this.skill_queue.shift());
            }else{
                this.startIdle();
            }
        }
    }

    startSkill2Lanuch(num:number){        
        MyTool.randomSceneShakeBig();        
        //创建发射的冰柱
        let hitNum=0;
        for(let i=0; i<5; i++){
            let createBingZhu=()=>{                
                //求点
                let posX=i*144-288;
                let posY=GameManager.getInstance().enemy_att_y-Math.random()*200-100;
                let startPos=cc.v2(posX,1680+posY);
                let endPos=cc.v2(posX,posY);
                //let offsetPos=endPos.sub(startPos);
                //let angle=MyTool.radianToAngle(Math.atan2(offsetPos.y,offsetPos.x))+90;
                let bingzhu=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_skill_2,startPos);  
                cc.tween(bingzhu).to(Math.random()*0.2+0.2,{x:endPos.x,y:endPos.y}).call((node:cc.Node)=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss3_skill_2,node);
                    GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss3_skill_2_hit,node.getPosition()); 
                    hitNum++;
                    if(hitNum==3){
                        //眩晕+伤害
                        GameManager.getInstance().all_hero.forEach((v,k)=>{
                            let buffData=new BuffData();
                            buffData.buff_id=BuffId.Monster_XuanYun;
                            buffData.game_effect_id=GameEffectId.xuanyun;
                            buffData.remain_time=2+num*this.skill_data.getSkillValue3(1);
                            buffData.buff_type=BuffType.Vertigo;
                            v.addDeBuff(buffData);
                        })
                        let attData=this.getAttData(DamageType.Skill,false,this.skill_data.getSkillValue1(1))
                        attData.zengshang_rate=this.skill_data.getSkillValue2(1)*num;
                        WallManager.getInstance().getMainWall().beInjured(attData);
                    }
                }).start();
            }
            this.scheduleOnce(createBingZhu,Math.random()*0.2+0.1);
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
        if(this.xue_yin){
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.boss3_skill_2_xueyin,this.xue_yin.node);
        }
        
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
        for(let i=0; i<this.skill_cold_down.length; i++){
            if(i==1){
                //第二个技能
                if(this.is_active_skill_2==false){
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
            // else{
            //     this.startSkill(i+1);
            // }
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
