
import { GameState, IsDebug, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId } from "../../../Game/GameEffectsManager";
import SkillManager from "../../../Game/SkillManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import MyTool from "../../../Tools/MyTool";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State, SkillTipType, SkillType } from "../HeroConfig";
import Bear from "./Bear";
import ShouWangJianShi from "./ShouWangJianShi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShouWang extends Hero {
    
    att_num:number=0;
    @property(cc.Prefab)
    prefab_bear:cc.Prefab=null;
    all_bear:Map<number,Bear>=null;

//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.shou_wang_jianshi_attack,8);
        super.addLoadByGameEffectId(GameEffectId.shou_wang_jianshi_skill1,8);
        super.addLoadByGameEffectId(GameEffectId.sheshou_jianshi_att_hit,8);
        super.addLoadByGameEffectId(GameEffectId.shou_wang_jianshi_skill1_hit,8);
        super.addLoadByGameEffectId(GameEffectId.xuanyun,8);
        this.is_LoadLoad=true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addGameWinListen(this.removeAllBear);
        this.all_bear=new Map<number,Bear>();
    }

    removeAllBear(){
        //删掉熊
        this.all_bear.forEach((v,k)=>{
            v.startDestory();
        })
    }

    onBearDestory(id:number){
        this.all_bear.delete(id);
    }

    start()
    {
        super.start();
        this.is_need_check_distance=true;
        super.setSkillTipSize(300,300);
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

    onHitMonster(damageType:DamageType,isCrit:boolean,monster:cc.Node){
        
    }

    createJianShi(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData):cc.Node{
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(ShouWangJianShi).hero_lvl=this.hero_lvl;
        node.getComponent(ShouWangJianShi).init(id,speed,dir,gjData);
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

    normalAttack(monster:cc.Node)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        // let enemyPos=monster.getComponent(Monster).getSheShouPos();
        // if(this.checkSkill1(enemyPos)==false){
        //     this.startAttack(monster);
        // }
        this.checkSkill1();
    }

    startAttack(enemyNode:cc.Node)
    {
        this.is_can_gongji=false;
        let fangxiang=GongJi_FangXiang.you;
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            //正中心            
            let enemyPos=enemyNode.getComponent(Monster).getSheShouPos();
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            this.createJianShi(GameEffectId.shou_wang_jianshi_attack,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_GongjianshouAttack); 
            this.att_num++;
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
    /**被动技能1触发判断 */
    checkSkill1(pos:cc.Vec2=null):boolean{
        let fangxiang=GongJi_FangXiang.you;
        //if(this.att_num>=3)
        if(this.att_num>=0){            
            this.is_can_gongji=false;                    
            let data=new KeyFrameData();
            data.name="Attack";
            data.callback=()=>{
                this.gongji_jishu=0; 
                let jianshiPos=super.getCreateBulletPos();
                let offsetPos=cc.v2(0, 10);
                let pi2=Math.PI*2;
                //中心方向
                let radian=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                let gjData=super.getGongJiData(DamageType.Skill,true,SkillType.Passive_1,this.hero_data.getSkillValue1(SkillType.Passive_1));
                this.createJianShi(GameEffectId.shou_wang_jianshi_skill1,jianshiPos,this.bullet_speed*1.25,radian,gjData);
                this.att_num=0;
            }
            super.setHeroState(Hero_State.attack,fangxiang,[data],()=>{            
                super.setHeroState(Hero_State.idle,fangxiang);
            });
            return true;
        }
        return false;    
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
    /**
     * 召唤一只持续{参数1}秒的巨熊，对150半径范围内造成{参数2}%伤害和1秒眩晕效果，巨熊的移动速度为80、攻速为2.0，会持续对离自身最近的敌人进行攻击，每次攻击造成{参数3}%伤害
     */
    startLaunch(pos:cc.Vec2){
        let sheshouEx1=this.hero_data.ExclusiveWeaponSkillValue_1;
        let aoe=0;
        if(sheshouEx1&&sheshouEx1>0){
            //熊的范围攻击
            aoe=sheshouEx1;
        }
        // if(IsDebug){
        //     aoe=100;
        // }
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ShouWangSkill1);
        super.setAttSpineScale();
        let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue3(SkillType.Active));        
        let bear=cc.instantiate(this.prefab_bear);
        MonsterManager.getInstance().node.addChild(bear);        
        bear.setPosition(pos);
        let bearTs=bear.getComponent(Bear);
        bearTs.init(gjData,this.hero_data.getSkillValue1(SkillType.Active),this.use_skill_num,aoe);
        bearTs.addDestoryListen(this.onBearDestory.bind(this));
        this.all_bear.set(this.use_skill_num,bearTs);
        //圆形眩晕
        MyTool.randomSceneShake(-5,5,0.02,6);
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,pos,150);
        if(monsters){
            let fanweiData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue2(SkillType.Active));
            for(let i=0; i<monsters.length; i++){
                let monsterTs=monsters[i].getComponent(Monster);
                let data=monsterTs.beFlashInjured(fanweiData);
                if(!data.is_die && data.getDamageNum()>0){
                    let buffData=new BuffData();
                    buffData.buff_id=BuffId.Hero_XuanYun;
                    buffData.buff_type=BuffType.Vertigo;
                    buffData.buff_value=[0];
                    buffData.remain_time=1;
                    buffData.game_effect_id=GameEffectId.xuanyun;
                    monsterTs.addDeBuff(buffData,fanweiData);
                }
            }
        }
        SkillManager.getInstance().setIsSkillState(false);
    }
    
}
