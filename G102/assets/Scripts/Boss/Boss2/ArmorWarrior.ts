
import { GameState } from "../../Constants";
import { Enemy_State } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import GroundManager from "../../Game/GroundManager";
import GameManager from "../../GameManager";
import { BuffData } from "../../Hero/Game/BuffData";
import { BuffId, BuffType, DamageType, ShieldType } from "../../Hero/Game/HeroConfig";
import { KeyFrameData, StrengthType } from "../../Monster/MonsterData";
import MonsterManager from "../../Monster/MonsterManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import Boss from "../Boss";
import BossAtt2 from "./BossAtt2";
import BossShield2 from "./BossShield2";
import ShieldAttack2 from "./ShieldAttack2";

enum Animation_Name
{
    Idle = "Idle",       //-- 正面待机
    attack1 = "Attack",          //-- 攻击1
    run = "Run",                //-- 跑路
    hurt1 = "Hurt",          //-- 受击1
    skill1_1 = "Skill1_1",          //-- 技能1动作1
    skill1_2 = "Skill1_2",          //-- 技能1动作2
    skill1_3 = "Skill1_3",          //-- 技能1动作2
    skill2_1 = "Skill2_1",          //-- 技能2动作1
    skill2_2 = "Skill2_2",          //-- 技能2动作2
    skill2_3 = "Skill2_3",          //-- 技能2动作2
    dead= "Dead",   //死亡
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class ArmorWarrior extends Boss {

    @property(cc.Prefab)
    prefab_shield:cc.Prefab=null;

    @property(cc.Prefab)
    prefab_ground:cc.Prefab=null;

    boss_shield:BossShield2=null;    
    
    skill_use_num:number=0;

    skill_waiting:boolean=false;
    skill_cd:number=0;

    onLoad(): void {
        super.onLoad();
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.xuanyun,2);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss2_normal_att,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss2_normal_att_hit1,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss2_normal_skill,1);
        GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss2_normal_skill_hit,1);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
        this.addChangeBossHpListen(this.onChangeHp);
    }

    onBossInited(): void {
        this.startIdle();
        this.node.y=222;
        this.skill_cd=this.skill_data.getSkillColdDown(1);
        this.skill_jishu=this.skill_cd-this.skill_data.getSkillInitColdDown(1)
    }

    onChangeHp(num:number){
        if(num<0){
            if(this.boss_shield){
                this.boss_shield.changeShieldValue(num);
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Boss2Attack);
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss2_normal_att,super.getAttPos());
            node.getComponent(BossAtt2).init(super.getAttData(DamageType.Normal,true),GameEffectId.boss2_normal_att,1200,Math.PI*3/2,this.node.y,270);
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
                this.skill_jishu=0;
                /**释放技能，无法被打断 */
                this.cur_toughness+=1;
                super.playSpinAnimaton((Animation_Name.skill1_1),false,null,()=>{
                    super.playSpinAnimaton((Animation_Name.skill1_2),true);
                    /**添加地表 */
                    let ground=cc.instantiate(this.prefab_ground);
                    GroundManager.getInstance().node.addChild(ground);
                    ground.x=this.node.x;
                    ground.y=this.getCenterPos().y;
                    this.skill_use_num++;
                    /**添加专用的护盾 */
                    let node=cc.instantiate(this.prefab_shield);
                    this.boss_shield=node.getComponent(BossShield2);
                    this.boss_shield.init(this.skill_use_num,ShieldType.Skill,8,super.getMaxHp()*this.skill_data.getSkillValue1(1),ground,this.onShieldDestory.bind(this));
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Boss2_MianYi_Attack;
                    buffData.remain_time=8;
                    GameEffectsManager.getInstance().node.addChild(node);
                    node.setPosition(cc.v2(-8,this.node.y+64*this.setup_scale));                    
                    super.addBuff(buffData);
                    
                })
            }else{
                this.skill_waiting=true;
            }
        }else{
            this.skill_waiting=true;
        }
        
    }
    /**护盾销毁时回调，isAuto：是否自爆(时间结束) */
    onShieldDestory(isAuto:boolean){
        this.boss_shield=null;
        this.skill_jishu=0;
        if(isAuto){
            //如果不是自爆，反击
            this.startShieldAttack();            
        }else{
            this.cur_toughness-=1;
            let buffData=new BuffData();
            buffData.buff_id=BuffId.Hero_XuanYun;
            buffData.game_effect_id=GameEffectId.xuanyun;
            buffData.remain_time=3;
            buffData.buff_type=BuffType.Vertigo;
            super.addDeBuff(buffData,null);
            super.subBuff(BuffId.Boss2_MianYi_Attack);
            super.changeHp(-this.getMaxHp()*0.25);
            MyTool.randomSceneShake(-16,16,0.02,10);
            //this.startIdle();
        }
    }

    startShieldAttack(){
        let data=new KeyFrameData();
        data.callback=()=>{
            this.cur_toughness-=1;
            super.subBuff(BuffId.Boss2_MianYi_Attack);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.boss2_normal_skill,this.node.getPosition());
            node.getComponent(ShieldAttack2).setBossPos(this.node.getPosition());
        }
        data.name='Skill';
        super.playSpinAnimaton((Animation_Name.skill1_3),false,data,()=>{
           this.startIdle();
        })
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
        if(this.boss_shield){
            this.boss_shield.destoryShield();
        }        
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.startXuanYun();
        }else{
            if(!super.isHaveDeBuffType(BuffType.Vertigo)){
                if(!super.getIsDie()){
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
        this.skill_jishu+=dt;
        if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){
            if(this.skill_jishu>=this.skill_cd){
                this.skill_jishu=this.skill_cd;
                this.startSkill();
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
