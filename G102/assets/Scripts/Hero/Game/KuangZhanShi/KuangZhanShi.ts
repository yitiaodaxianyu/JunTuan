
import { GameState, IsDebug, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import SkillManager from "../../../Game/SkillManager";
import SkyManager from "../../../Game/SkyManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import MyTool from "../../../Tools/MyTool";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State, Hero_State_Name, SkillType } from "../HeroConfig";
import FuTou from "./FuTou";

const {ccclass, property} = cc._decorator;

@ccclass
export default class KuangZhanShi extends Hero {
    
    kuangre_num:number=0;
    is_skilling:boolean=false;

//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.kuangzhanshi_attack,2);
        super.addLoadByGameEffectId(GameEffectId.kuangzhanshi_attack_chuantou,4);
        super.addLoadByGameEffectId(GameEffectId.kuangzhanshi_attack_hit,2);
        super.addLoadByGameEffectId(GameEffectId.kuangzhanshi_attack_max,2);
        this.is_LoadLoad=true;        
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    }

    start()
    {
        super.start();
        this.is_need_check_distance=false;
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

    createFuTou(jianshiPos:cc.Vec2,speed:number,dir:number){    
        let isP=false
        let rate=0;
        let ex1=this.hero_data.ExclusiveWeaponSkillValue_1;
        if(ex1&&ex1>0){
            //吸血率
            if(this.isHaveBuff(BuffId.Hero_KuangZhanShi_DaZhao)){
                rate=ex1;
            }
        }
        if(this.kuangre_num>=this.hero_data.getSkillValue2(SkillType.Passive_1)){
            isP=true;            
            let node=FightingManager.getInstance().createGameEffectById(GameEffectId.kuangzhanshi_attack_max,jianshiPos);        
            let futou=node.getComponent(FuTou);
            let gjData=super.getGongJiData(DamageType.Skill,true,SkillType.Passive_1,this.hero_data.getSkillValue3(SkillType.Passive_1))
            gjData.hero_data.blood_sucking_rate+=rate;
            futou.init(GameEffectId.kuangzhanshi_attack_max,speed,dir,gjData);
            futou.initFuTou(this.kuangre_num,isP,1);
            this.kuangre_num=0;
        }else{
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            gjData.hero_data.blood_sucking_rate+=rate;
            let node=FightingManager.getInstance().createGameEffectById(GameEffectId.kuangzhanshi_attack,jianshiPos);        
            let futou=node.getComponent(FuTou);
            futou.init(GameEffectId.kuangzhanshi_attack,speed,dir,gjData);
            futou.initFuTou(this.kuangre_num,isP,0);
            this.kuangre_num++;
        }
        
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
        let attName:string=Hero_State_Name.Attack;
        if(super.isHaveBuff(BuffId.Hero_KuangZhanShi_DaZhao)){
            attName="Attack2";
            this.kuangre_num=this.hero_data.getSkillValue2(SkillType.Passive_1);
        }
        this.is_can_gongji=false;
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            //正中心            
            let enemyPos=enemyNode.getComponent(Monster).getSheShouPos();
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);            
            // if(IsDebug){
            //     if(this.isHaveBuff(BuffId.Hero_KuangZhanShi_DaZhao)){
            //         gjData.hero_data.blood_sucking_rate+=0.5;
            //     }                
            // }
            this.createFuTou(jianshiPos,this.bullet_speed,jianshiDir);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_KZSAttack); 
            if(this.is_double_attack){
                this.resetNormalAttack();
            }else{
                this.gongji_jishu=0;
            }           
        }
        super.setHeroStateAndAnimation(Hero_State.attack,attName,false,[data],()=>{
            attName=Hero_State_Name.Idle;
            if(super.isHaveBuff(BuffId.Hero_KuangZhanShi_DaZhao)){
                attName="Idle2";
            }
            super.setHeroStateAndAnimation(Hero_State.idle,attName,true);
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
            super.setHeroStateAndAnimation(Hero_State.idle,"Idle2",true);
        });
        this.spine.timeScale=JiaSu;
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_KZSSkill);
    }
    /**蓄力后发射一波箭雨，对半径{参数1}范围内的敌人在3秒内造成15次{参数2}%伤害 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        this.resetGongJiJiShu();
        let buffData=new BuffData();
        buffData.buff_id=BuffId.Hero_KuangZhanShi_DaZhao;
        buffData.buff_type=BuffType.Gain;
        buffData.buff_value=[this.hero_data.getSkillValue2(SkillType.Active)];
        buffData.remain_time=this.hero_data.getSkillValue1(SkillType.Active);
        let buff=super.addBuff(buffData);
        buff.addDestroyListen(this.onSkillBuffDestory.bind(this));
        SkillManager.getInstance().setIsSkillState(false);
    }

    onSkillBuffDestory(buffData: BuffData): void {
        //不能中断攻击
        if(this.getHeroState()==Hero_State.idle){
            super.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        }
    }
}
