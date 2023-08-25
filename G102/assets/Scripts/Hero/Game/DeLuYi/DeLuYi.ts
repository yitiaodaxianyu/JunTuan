
import { GameState, IsDebug, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GroundManager from "../../../Game/GroundManager";
import SkillManager from "../../../Game/SkillManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData, StrengthType } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang,Hero_State,SkillType,} from "../HeroConfig";
import SuperManTeng from "./SuperManTeng";
import WuNvDan from "./WuNvDan";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WuNv extends Hero {
    

    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        //super.loadZhiShiQi("manteng_zhishi_qi",SkillIndicatorType.target);
        super.addLoadByGameEffectId(GameEffectId.deluyi_att,1);
        super.addLoadByGameEffectId(GameEffectId.deluyi_att_hit,1);
        super.addLoadByGameEffectId(GameEffectId.deluyi_att_baoji,4);
        super.addLoadByGameEffectId(GameEffectId.deluyi_skill_manteng,4);
        super.addLoadByGameEffectId(GameEffectId.deluyi_active_skill_hit,4);
        super.addLoadByGameEffectId(GameEffectId.deluyi_active_skill,4);
        super.addLoadByGameEffectId(GameEffectId.deluyi_skill_beidong_create,1);
        super.addLoadByGameEffectId(GameEffectId.xuanyun,4);
        this.is_LoadLoad=true;
        //super.addLoadByGameEffectId(GameEffectId.monster_zhongdu,4);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    }

    start()
    {        
        super.start();
        this.is_need_check_distance=true;
        super.setSkillTipSize(1680,384);
        if(this.hero_data.ExclusiveWeaponSkillValue_1&&this.hero_data.ExclusiveWeaponSkillValue_1>0)
        {
            SkillManager.getInstance().setDeLuYiEx(this.hero_data.ExclusiveWeaponSkillValue_1)
        }
        // if(IsDebug){
        //     SkillManager.getInstance().setDeLuYiEx(10)
        // }
    }
    
    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.unscheduleAllCallbacks();
        }else{
            //根据上个状态判断需要做什么
            this.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        }
    }

    //---------------------------------------------攻击----------------------------------------------
    /**暴击时对{参数1}范围内的敌人额外造成{参数2}%伤害并造成1秒眩晕效果 */
    onHitMonster(damageType:DamageType,isCrit:boolean,monster:cc.Node){
        if(damageType==DamageType.Normal){
            let monsterTsT=monster.getComponent(Monster);
            //圆形眩晕
            let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTsT.getCenterPos(),this.hero_data.getSkillValue1(SkillType.Passive_1));
            if(monsters){
                let fanweiData=super.getGongJiData(DamageType.Skill,false,SkillType.Passive_1,this.hero_data.getSkillValue2(SkillType.Passive_1));
                for(let i=0; i<monsters.length; i++){
                    let monsterTs=monsters[i].getComponent(Monster);
                    let data=monsterTs.beFlashInjured(fanweiData);
                    if(!data.is_die && data.getDamageNum()>0){
                        if(isCrit){
                            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_baoji,monsterTs.getCenterPos());
                        }else{
                            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_att_hit,monsterTs.getCenterPos());   
                        }
                        /**概率眩晕 */
                        let rate=this.hero_data.getSkillValue3(SkillType.Passive_1);
                        //if(monsterTs.getStrengthType()!=StrengthType.Boss&&Math.random()<rate){
                        if(monsterTs.getStrengthType()!=StrengthType.Boss){
                            let buffData=new BuffData();
                            buffData.buff_id=BuffId.Hero_XuanYun;
                            buffData.buff_type=BuffType.Vertigo;
                            buffData.buff_value=[0];
                            buffData.remain_time=0.5+this.hero_lvl*0.1;
                            buffData.game_effect_id=GameEffectId.xuanyun;
                            monsterTs.addDeBuff(buffData,fanweiData);
                            //蔓藤特效
                            let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.deluyi_skill_manteng,this.node.getPosition());
                            node.getComponent(cc.Animation).play();
                            cc.tween(node).delay(buffData.remain_time).call(()=>{
                                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.deluyi_skill_manteng,node);
                            }).start();
                        }
                        
                    }
                }
            }         
        }
    }

    createWuNvDan(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(WuNvDan).init(id,speed,dir,gjData);
    }   

    createSuperManTeng(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData):cc.Node{
        let node=GroundManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(SuperManTeng).hero_lvl=this.hero_lvl;
        node.getComponent(SuperManTeng).init(id,speed,dir,gjData);
        return node;
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
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_FashiAttack);
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            // let rate=this.hero_data.getSkillValue1(SkillType.Passive_1);
            // if(rate&&Math.random()<rate){
            //     let gjData=super.getGongJiData(DamageType.Skill,true,this.hero_data.getSkillValue2(SkillType.Passive_1),0.5);//0.5是专武的
            //     let offsetPos=enemyPos.sub(this.node.getPosition());
            //     let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            //     this.createManTeng(GameEffectId.nvwu_att_manteng_bg,this.node.getPosition(),this.bullet_speed,jianshiDir,gjData);
            // }else{
            //     let jianshiPos=this.getCreateBulletPos();
            //     let offsetPos=enemyPos.sub(jianshiPos);
            //     let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            //     let gjData=super.getGongJiData(DamageType.Normal,true);
            //     this.createWuNvDan(GameEffectId.nvwu_att,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            // }
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            this.createWuNvDan(GameEffectId.deluyi_att,jianshiPos,this.bullet_speed,jianshiDir,gjData);     
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
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_FashiSkill1);        
        let initYY=pos.y-192+192/2;
        let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue1(SkillType.Active));
        //右边
        for(let i=0; i<2; i++){
            let xx=350;
            let yy=initYY+i*192;
            let mt=this.createSuperManTeng(GameEffectId.deluyi_active_skill,cc.v2(xx,yy),this.bullet_speed/2,Math.PI,gjData);            
            let bc=mt.getComponent(cc.BoxCollider);
            bc.enabled=i==1;
            bc.offset=cc.v2(-96,0);
        }
        //左边
        for(let i=0; i<2; i++){
            let xx=-350;
            let yy=initYY+i*192;
            let mt=this.createSuperManTeng(GameEffectId.deluyi_active_skill,cc.v2(xx,yy),this.bullet_speed/2,0,gjData);
            let bc=mt.getComponent(cc.BoxCollider);
            bc.enabled=i==1;
            bc.offset=cc.v2(96,0);
        }
        SkillManager.getInstance().setIsSkillState(false);
    }
}
