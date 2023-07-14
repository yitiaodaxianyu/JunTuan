
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
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State, SkillType } from "../HeroConfig";
import MeiDan from "./MeiDan";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MeiMo extends Hero {
    
    attack_num:number=0;
    full_screen_damage:FullScreenDamage=null;
    meihuo_node:cc.Node=null;
//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.mei_mo_attack,1);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_attack_hit,1);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_beidong_skill1_baozha,1);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_beidong_skill1_gongsu,1);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_beidong_skill2_hit,1);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_zhudong_skill_baozha,1);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_zhudong_skill_gound,1);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_zhudong_skill_hero,4);
        super.addLoadByGameEffectId(GameEffectId.mei_mo_zhudong_skill_monster,4);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addLoadedListen(this.onLoadFinished);
    }

    start()
    {
        super.start();
        this.is_need_check_distance=true;
        let zhijing=this.hero_data.getSkillValue1(SkillType.Active)*2;
        super.setSkillTipSize(zhijing,zhijing);
    }

    onLoadFinished(){
        
    }
    
    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.unscheduleAllCallbacks();
            if(this.meihuo_node){
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.mei_mo_zhudong_skill_hero,this.meihuo_node);
                this.meihuo_node=null;
            }            
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

    createMeiDan(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData):cc.Node{
        this.attack_num++;
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        let md=node.getComponent(MeiDan);
        md.init(id,speed,dir,gjData);
        md.setIsExDamage(this,this.attack_num%5==0);
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
        let monsterTs=monster.getComponent(Monster);
        if(!monsterTs.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
            let monsters=MonsterManager.getInstance().getMonstersForNearest(-1,this.node.getPosition(),this.hero_data.gongji_fanwei);
            if(monsters)
            {
                for(let i=0; i<monsters.length; i++){
                    let monsterTTs=monsters[i].getComponent(Monster);
                    if(monsterTTs.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)){
                        monster=monsters[i];
                        break;
                    }
                }                
            } 
        }
        
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
            let gjData=super.getGongJiData(DamageType.Skill,true,SkillType.Passive_1,1);
            gjData.is_can_crit=true;
            this.createMeiDan(GameEffectId.mei_mo_attack,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_MMAttack);    
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

    /**引爆敌人附加 */
    startBomb(monsterTs:Monster){
        //额外的技能伤害        
        let nn=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.mei_mo_beidong_skill1_baozha,monsterTs.getCenterPos());        
        nn.scale=this.hero_data.getSkillValue1(SkillType.Active)/180;
        let zengshang=this.hero_data.getSkillValue4(SkillType.Active);
        /**范围伤害，不包括这个怪 */
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),this.hero_data.getSkillValue1(SkillType.Passive_1));
        if(monsters){
            for(let i=0; i<monsters.length; i++){
                let monsterTTs=monsters[i].getComponent(Monster);
                if(monsterTTs.uuid!=monsterTs.uuid){
                    let bzGjData=super.getGongJiData(DamageType.Skill,false,SkillType.Passive_1,this.hero_data.getSkillValue2(SkillType.Passive_1));
                    if(monsterTTs.isHaveDeBuff(BuffId.Hero_MeiMo_Active_ZhengShang)){
                        bzGjData.hero_data.all_increase_damage+=zengshang;
                    }
                    let data=monsterTTs.beFlashInjured(bzGjData);
                    if(data.getDamageNum()>0){
                        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.mei_mo_attack_hit,monsterTTs.getCenterPos());
                    }
                }
            }
        }
        //攻速buff
        let buffData=new BuffData();
        buffData.buff_id=BuffId.Hero_MeiMo_GongSu;
        buffData.buff_type=BuffType.Gain;
        buffData.buff_value=[this.hero_data.getSkillValue3(SkillType.Passive_1)];
        buffData.remain_time=5;
        buffData.game_effect_id=GameEffectId.mei_mo_beidong_skill1_gongsu;
        buffData.fade_time=1;
        super.addBuff(buffData);
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
        this.meihuo_node=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.mei_mo_zhudong_skill_hero,this.node.getPosition(),cc.find("Canvas/Hero_Shadow_Root"));
        //state.speed=JiaSu;
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
            if(this.meihuo_node){
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.mei_mo_zhudong_skill_hero,this.meihuo_node);
                this.meihuo_node=null;
            }            
        });
        this.spine.timeScale=JiaSu;
    }
    /**在半径{参数1}的目标区域内造成{参数2}%伤害并施加“魅惑”效果，受到魅惑的敌人移速会降低至30且无法攻击和使用技能（控制对BOSS无效）

    此外魅魔会受到魅惑的敌人施加持续{参数3}秒的增伤buff，魅魔对具有该buff的敌人额外造成{参数4}伤害 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        this.resetGongJiJiShu();
        SkillManager.getInstance().setIsSkillState(false);
        let radius=this.hero_data.getSkillValue1(SkillType.Active);
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,pos,radius);
        let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue2(SkillType.Active));
        let zsTime=this.hero_data.getSkillValue3(SkillType.Active);
        let gound=GroundManager.getInstance().createGameEffectById(GameEffectId.mei_mo_zhudong_skill_gound,pos);
        gound.scale=radius/90;
        let baozha=GroundManager.getInstance().createGameEffectById(GameEffectId.mei_mo_zhudong_skill_baozha,pos);
        baozha.scale=radius/90;
        if(monsters){
            for(let i=0; i<monsters.length; i++){
                let monsterTs=monsters[i].getComponent(Monster);
                let data=monsterTs.beFlashInjured(gjData);
                if(data.getDamageNum()>0&&data.is_die==false){
                    /**魅惑 */
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Hero_MeiMo_Active_MeiHuo;
                    buffData.remain_time=4;
                    buffData.game_effect_id=GameEffectId.mei_mo_zhudong_skill_monster;
                    buffData.buff_type=BuffType.Vertigo;
                    monsterTs.addDeBuff(buffData,gjData);
                    /**增伤 */
                    let exData=new BuffData();
                    exData.buff_id=BuffId.Hero_MeiMo_Active_ZhengShang;
                    exData.remain_time=zsTime;
                    monsterTs.addDeBuff(exData,gjData);
                }
            }
        }
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_MMSkill);  
    }
}
