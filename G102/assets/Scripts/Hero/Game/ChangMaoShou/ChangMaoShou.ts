
import { GameState, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, } from "../../../Game/GameEffectsManager";
import SkillManager from "../../../Game/SkillManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State,  SkillIndicatorType, SkillType } from "../HeroConfig";
import ChangMao from "./ChangMao";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChangMaoShou extends Hero {

    cur_att_object:cc.Node=null;
    cur_att_floor:number=0;

//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.chang_mao_shou_attack,2);
        super.addLoadByGameEffectId(GameEffectId.chang_mao_shou_skill_zhuazi,2);
        super.addLoadByGameEffectId(GameEffectId.chang_mao_shou_skill_active_1,1);
        super.addLoadByGameEffectId(GameEffectId.chang_mao_shou_skill_active_2,1);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    }

    start()
    {
        super.start();
        this.is_need_check_distance=false;
        // let zhijing=this.hero_data.getSkillValue1(SkillType.Active)*2;
        // super.setSkillTipSize(zhijing,zhijing);
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.unscheduleAllCallbacks();
        }else{
            //根据上个状态判断需要做什么
            this.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        }
    }

    starteIdle(){
        this.setHeroState(Hero_State.idle,this.cur_fangxiang);
    }

    //---------------------------------------------攻击-------------------------------------------------
    /**暴击时产生100*200锥形范围的溅射效果，受攻击的敌人和被溅射的人额外受到{参数1}%伤害 */
    onHitMonster(damageType:DamageType,isCrit:boolean,monster:cc.Node){
        
    }

    createMao(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData):cc.Node{
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(ChangMao).init(id,speed,dir,gjData);
        return node;
    }
    
    /**每次普通攻击有{参数1}%几率改为射出一波箭雨，箭雨含{参数2}支箭，每支箭造成{参数3}%伤害 */
    normalAttack(monster:cc.Node)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        this.startAttack(monster);       
    }

    startAttack(enemyNode:cc.Node)
    {
        this.is_can_gongji=false;        
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            //正中心
            let enemyPos=enemyNode.getComponent(Monster).getSheShouPos();
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            if(this.isHaveBuff(BuffId.Hero_ChangMaoShow_GongSu)){
                if(this.hero_data.ExclusiveWeaponSkillValue_1&&this.hero_data.ExclusiveWeaponSkillValue_1>0){
                    //专武增伤
                    gjData.hero_data.all_increase_damage+=this.hero_data.ExclusiveWeaponSkillValue_1;
                }
            }            
            this.createMao(GameEffectId.chang_mao_shou_attack,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ChangmaoshouAttack);
            if(this.is_double_attack){
                this.resetNormalAttack();
            }else{
                this.gongji_jishu=0;
            }
        }
        super.setHeroState(Hero_State.attack,GongJi_FangXiang.zhong,[data],()=>{
            super.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        });
    }
    
    useSkill(pos:cc.Vec2):number
    {
        SkillManager.getInstance().releaseSkill(()=>{
            this.startSelfXuLi(pos);
        },this.node);
        return 2;
    }

    startSelfXuLi(pos:cc.Vec2){
        //蓄力帧监听
        let heroRoot=cc.find('Canvas/Hero_Root');        
        //发射帧监听
        let fasheData=new KeyFrameData();
        fasheData.name="FaShe";
        fasheData.callback=()=>{
            //可以发射
            SkillManager.getInstance().setTimeStop(false);
            this.node.parent=heroRoot;
            this.node.zIndex=2;
            this.startLaunch(pos);
        }
        //英雄动作播放
        this.setHeroState(Hero_State.skill,GongJi_FangXiang.zhong,[fasheData],()=>{
            //动作完毕后状态还是技能状态，动画要播放待机的
            this.resetGongJiJiShu();
            this.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        });
        this.spine.timeScale=JiaSu;
    }
    /**加攻速 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        this.resetGongJiJiShu();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ChangmaoshouAttack);        
        let buffData=new BuffData();
        buffData.buff_id=BuffId.Hero_ChangMaoShow_GongSu;
        buffData.buff_type=BuffType.Gain;
        buffData.buff_value=[this.hero_data.getSkillValue1(SkillType.Active)];
        buffData.remain_time=6;
        buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
        buffData.fade_time=1;
        super.addBuff(buffData);
        SkillManager.getInstance().setIsSkillState(false);
    }
}
