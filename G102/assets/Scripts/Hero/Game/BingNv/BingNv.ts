
import { GameState, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import SkillManager from "../../../Game/SkillManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { GongJiData } from "../../Data/HeroData";
import FullScreenDamage from "../../Skill/FullScreenDamage";
import Hero from "../Hero";
import {  BuffType, DamageType, GongJi_FangXiang,  Hero_State, SkillType } from "../HeroConfig";
import BingNvDan from "./BingNvDan";
import BingNvWall from "./BingNvWall";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BingNv extends Hero {
    
    @property(cc.Prefab)
    prefab_beidong_2:cc.Prefab=null;

    @property(cc.Node)
    buff_node:cc.Node=null;

    full_screen_damage:FullScreenDamage=null;

    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        //super.loadZhiShiQi("manteng_zhishi_qi",SkillIndicatorType.target);
        super.addLoadByGameEffectId(GameEffectId.bing_nv_attack,1);
        super.addLoadByGameEffectId(GameEffectId.bing_nv_attack_hit,1);
        super.addLoadByGameEffectId(GameEffectId.bing_nv_beidong_skill_create,1);
        super.addLoadByGameEffectId(GameEffectId.bing_nv_beidong_skill,4);
        super.addLoadByGameEffectId(GameEffectId.bing_nv_beidong_skill_hit,4);
        super.addLoadByGameEffectId(GameEffectId.xuanyun,4);
        super.addLoadByGameEffectId(GameEffectId.bing_nv_active_skill_wall,1);
        this.is_LoadLoad=true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
    }

    start()
    {        
        super.start();
        this.is_need_check_distance=true;
        super.setSkillTipSize(1680,200);
        if(this.hero_data.getIsUnlock(SkillType.Passive_2)){
            this.createFullScreenDamage();
        }
    }
    update(dt: number): void {
        super.update(dt);
        if(this.beidong&&this.node_shadow){
            this.beidong.setPosition(this.node_shadow.getPosition());
        }
        
    }
    private beidong:cc.Node;
    createFullScreenDamage(){
        this.beidong=cc.instantiate(this.prefab_beidong_2);
        this.beidong.parent = cc.find('Canvas/Hero_Shadow_Root');
        // node.setPosition(this.node.getPosition());
        this.full_screen_damage=this.beidong.getComponent(FullScreenDamage);
        this.full_screen_damage.init(GameEffectId.bing_nv_beidong_skill_2,1,this.onSkillDamage2.bind(this));
    }

    onSkillDamage2(){
        let allMonsterS=MonsterManager.getInstance().node.children;
        let len=allMonsterS.length;    
        for(let i=0;i<len; i++)
        {
            let monster=allMonsterS[i];
            let monsterTS=monster.getComponent(Monster);
            if(monsterTS && monsterTS.isHaveDeBuffType(BuffType.Slowdown))
            {
                monsterTS.beFlashInjured(super.getGongJiData(DamageType.Skill,false,SkillType.Passive_2,this.hero_data.getSkillValue1(SkillType.Passive_2)));
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

    createBingNvDan(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(BingNvDan).hero_lvl=this.hero_lvl;
        node.getComponent(BingNvDan).init(id,speed,dir,gjData);
    }

    normalAttack(monster:cc.Node)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        this.is_can_gongji=false;
        this.startAttack(monster);
    }

    startAttack(enemyNode:cc.Node)
    {
        let enemyPos=enemyNode.getComponent(Monster).getSheShouPos();
        let fangxiang=this.getFangXiangByPos(enemyPos);        
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BNAttack);
            let rate=this.hero_data.getSkillValue1(SkillType.Passive_1);
            //特效id
            let gameEffectId=GameEffectId.bing_nv_attack;
            let gjData:GongJiData=null;
            if(rate&&Math.random()<rate){
                gameEffectId=GameEffectId.bing_nv_beidong_skill;
                gjData=super.getGongJiData(DamageType.Skill,true,SkillType.Passive_1,this.hero_data.getSkillValue2(SkillType.Passive_1))
            }else{
                gameEffectId=GameEffectId.bing_nv_attack;
                gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null)
            }
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            this.createBingNvDan(gameEffectId,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            if(this.is_double_attack){
                this.resetNormalAttack();
            }else{
                this.gongji_jishu=0;
            }
        }
        super.setHeroState(Hero_State.attack,fangxiang,[data],()=>{
            this.setHeroState(Hero_State.idle,this.cur_fangxiang);
        });
    }

    //---------------------------------------------技能----------------------------------------------    
    useSkill(pos:cc.Vec2):number
    {
        SkillManager.getInstance().releaseSkill(()=>{
            this.startSelfXuLi(pos);
        },this.node);
        return 0;
    }

    startSelfXuLi(pos:cc.Vec2){
        //施法特效
        // let node=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.bing_nv_active_skill,this.node.getPosition().add(cc.v2(42,96)),SkillManager.getInstance().node);
        // node.zIndex=4;
        // let animation=node.getComponent(cc.Animation);
        // let state=animation.play();
        // state.speed=JiaSu;
        // animation.on(cc.Animation.EventType.FINISHED,()=>{                    
        //     animation.off(cc.Animation.EventType.FINISHED);
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.bing_nv_active_skill,node);                        
        // })
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
    /**在目标区域的左右两边各召唤一阵藤蔓冲击波，藤蔓冲击波会向屏幕另一端滚动，途中速度会逐渐加快，对触碰到的敌人造成{参数1}%伤害，并造成{参数2}秒眩晕效果 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        let node=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.bing_nv_active_skill_wall,pos,MonsterManager.getInstance().node);
        node.getComponent(BingNvWall).init(super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue3(SkillType.Active)),pos,this.hero_data.getSkillValue1(SkillType.Active));
        SkillManager.getInstance().setIsSkillState(false);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BNSkill);
    }
}


