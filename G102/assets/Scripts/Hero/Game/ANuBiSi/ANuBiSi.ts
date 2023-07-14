
import { GameState, IsDebug, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, GameEffectsManager} from "../../../Game/GameEffectsManager";
import GroundManager from "../../../Game/GroundManager";
import SkillManager from "../../../Game/SkillManager";
import SkyManager from "../../../Game/SkyManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { GongJiData } from "../../Data/HeroData";
import FullScreenDamage from "../../Skill/FullScreenDamage";
import Hero from "../Hero";
import { BuffType, DamageType, GongJi_FangXiang, Hero_State, SkillType } from "../HeroConfig";
import KuangSha from "./KuangSha";
import ShaChenBao from "./ShaChenBao";
import ShaDan from "./ShaDan";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ANuBiSi extends Hero {

    @property(cc.Prefab)
    prefab_beidong_2:cc.Prefab=null;

    full_screen_damage:FullScreenDamage=null;
//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_attack,1);
        super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_attack_hit,1);
        super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_beidong_skill_1,1);
        //super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_beidong_skill_2,1);
        super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_active_skill_1,1);
        super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_active_skill_wind,1);
        super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_active_skill_line,4);
        super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_active_skill_ring,2);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);        
    }

    start()
    {
        super.start();
        this.is_need_check_distance=true;
        let zhijing=this.hero_data.getSkillValue1(SkillType.Active)*2;
        super.setSkillTipSize(zhijing,zhijing);
        if(this.hero_data.getIsUnlock(SkillType.Passive_2)){
            this.createFullScreenDamage();
        }
    }

    createFullScreenDamage(){
        let node=cc.instantiate(this.prefab_beidong_2);
        cc.find("Canvas/Hero_Shadow_Root").addChild(node);
        node.setPosition(this.node.getPosition());
        this.full_screen_damage=node.getComponent(FullScreenDamage);
        this.full_screen_damage.init(GameEffectId.a_nu_bi_si_beidong_skill_2,1,this.onSkillDamage2.bind(this));
    }

    onSkillDamage2(){
        let allMonsterS=MonsterManager.getInstance().node.children;
        let len=allMonsterS.length;    
        for(let i=0;i<len; i++)
        {
            let monster=allMonsterS[i];
            let monsterTS=monster.getComponent(Monster);
            if(monsterTS)
            {
                if(monsterTS.isHaveDeBuffType(BuffType.Slowdown)||monsterTS.isHaveDeBuffType(BuffType.Vertigo)){
                    monsterTS.beFlashInjured(super.getGongJiData(DamageType.Skill,false,SkillType.Passive_2,this.hero_data.getSkillValue1(SkillType.Passive_2)));
                }                
            }
        }
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

    createShaDan(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData):cc.Node{
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(ShaDan).init(id,speed,dir,gjData);
        return node;
    }
    //获取射击方向
    getSJFXByPos(pos:cc.Vec2,selfPos:cc.Vec2):GongJi_FangXiang
    {
        //对敌人单位进行方向判断，确定打击方向
        let fangxiang=GongJi_FangXiang.zhong;
        let offsetPos=pos.sub(selfPos);
        let pi2=Math.PI*2;
        let radian=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
        let angle=180*radian/Math.PI;
        if(angle<=75)
        {
            fangxiang=GongJi_FangXiang.you;
        }else if(angle>75 && angle<105)
        {
            fangxiang=GongJi_FangXiang.zhong;
        }else if(angle>=105 && angle<=180)
        {
            fangxiang=GongJi_FangXiang.zuo;
        }
        return fangxiang;
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
        let fangxiang=this.getSJFXByPos(enemyNode.getPosition(),this.node.getPosition());
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            //正中心            
            let enemyPos=enemyNode.getComponent(Monster).getSheShouPos();
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            this.createShaDan(GameEffectId.a_nu_bi_si_attack,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ANBSAttack);
            if(this.is_double_attack){
                this.resetNormalAttack();
            }else{
                this.gongji_jishu=0;
            }
        }
        super.setHeroState(Hero_State.attack,fangxiang,[data],()=>{            
            super.setHeroState(Hero_State.idle,fangxiang);
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
    /**蓄力后发射一波箭雨，对半径{参数1}范围内的敌人在3秒内造成15次{参数2}%伤害 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        this.resetGongJiJiShu();
        //创建沙尘暴
        let ex1=this.hero_data.ExclusiveWeaponSkillValue_1;
        let exTime=0;
        if(ex1&&ex1>0){
            //增加范围
            exTime=ex1;            
        }
        // if(IsDebug){
        //     exTime=10;
        // }
        let node=GroundManager.getInstance().createGameEffectById(GameEffectId.a_nu_bi_si_active_skill_1,pos);
        node.getComponent(ShaChenBao).init(super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue2(SkillType.Active)),5+exTime,1,this.hero_data.getSkillValue1(SkillType.Active));
        SkillManager.getInstance().setIsSkillState(false);
        //狂沙
        let wind=SkyManager.getInstance().createGameEffectById(GameEffectId.a_nu_bi_si_active_skill_wind,cc.v2(0,-cc.winSize.height/2));
        wind.getComponent(KuangSha).init(5+exTime,this.hero_data.getSkillValue3(SkillType.Active));
    }
}
