
import { GameState, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GroundManager from "../../../Game/GroundManager";
import SkillManager from "../../../Game/SkillManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import WallManager from "../../../Wall/WallManager";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State, ShieldId, ShieldType,  SkillType } from "../HeroConfig";
import ActiveDart from "./ActiveDart";
import Dart from "./Dart";
import EllipseMove from "./EllipseMove";
import FeiBiao from "./FeiBiao";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RenZhe extends Hero {

    /**当前存在的被动飞镖节点 */
    cur_feibiao:cc.Node[]=[];    
    no_paopao_num:number=0;
//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();        
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_att,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_hit,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_hudun,1);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_1,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_ex,4);        
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_hit,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_end,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_move,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_end,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_move,2);        
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_huanrao,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_move,1);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addResetListen(this.onResetState);
    }

    onResetState(){
        let num=this.cur_feibiao.length;
        // for(let i=0; i<num; i++){
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.renzhe_feibiao_huanrao,this.cur_feibiao[i]);
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

    //---------------------------------------------攻击-------------------------------------------------
    onHitMonster(damageType:DamageType,isCrit:boolean,monster:cc.Node){
        if(isCrit&&damageType==DamageType.Normal){
            if(!MonsterManager.getInstance().checkWallMonster(300)){
                let rate=this.hero_data.getSkillValue2(SkillType.Passive_2);
                if(rate&&Math.random()<rate){
                    WallManager.getInstance().getMainWall().addImmunityShield(ShieldId.RenZhe_Skill2,ShieldType.Skill,5,5);
                    // super.addBuff(Hero_Buff.renzhe_skill_2immunity_skill,{
                    //     remain_time: 5+this.hero_data.ExclusiveWeaponSkillValue_4,
                    //     damage_num: 0,
                    //     jiange_time: 1,
                    //     hero_type: this.hero_type,
                    //     other_value_1:1,
                    // })
                    
                }                
            }
            
        }
    }

    normalAttack(monster:cc.Node)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        //求出方向
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
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            //判断是否有敌军在300范围内
            if(!MonsterManager.getInstance().checkWallMonster(300)){
                //test
                gjData.hero_data.Hit+=gjData.hero_data.getSkillValue1(SkillType.Passive_2);
            }
            //先判断有没有被动飞镖
            if(this.cur_feibiao.length>0){
                //减少一个飞镖
                let node=this.cur_feibiao.pop();
                // GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.renzhe_feibiao_huanrao,node);
                // this.createFeiBiao(GameEffectId.renzhe_feibiao_skill_1,jianshiPos,this.bullet_speed,enemyNode,gjData);                
                let num=this.cur_feibiao.length;
                let angle=num>0?360/num:0;
                for(let i=0; i<num; i++){
                    this.cur_feibiao[i].getComponent(EllipseMove).refreshAngle(i*angle);
                }
            }else{
                let rate=this.hero_data.getSkillValue1(SkillType.Passive_1);
                let feibiaoId=0;
                if(this.hero_data.ExclusiveWeaponSkillValue_1>0 && this.no_paopao_num>=this.hero_data.ExclusiveWeaponSkillValue_1)
                {
                    rate=1;
                    //feibiaoId=GameEffectId.renzhe_feibiao_skill_ex;
                }
                if(rate&&Math.random()<rate){
                    this.createFeiBiao(feibiaoId,jianshiPos,this.bullet_speed,enemyNode,gjData);
                    this.no_paopao_num=0;
                    
                }else{
                    //this.createDart(GameEffectId.renzhe_feibiao_att,jianshiPos,this.bullet_speed,jianshiDir,gjData);
                    this.no_paopao_num++;
                    
                }
            }
            
        }
        super.setHeroState(Hero_State.attack,fangxiang,[data],()=>{
            this.setHeroState(Hero_State.idle,this.cur_fangxiang);
        });
    }

    createDart(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(Dart).init(id,speed,dir,gjData);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_RenzheAttack);
    }

    createActiveDart(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(ActiveDart).init(id,speed,dir,gjData);
    }

    createFeiBiao(id:GameEffectId,pos:cc.Vec2,speed:number,target:cc.Node,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,pos);
        node.getComponent(FeiBiao).init(id,gjData,speed,target,5);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_RenzheAttack);       
    }

    //---------------------------------------------技能-----------------------------------------------------

    useSkill(pos:cc.Vec2):number
    {        
        SkillManager.getInstance().releaseSkill(()=>{
            this.startSelfXuLi();
        },this.node);
        return 0;
    }

    startSelfXuLi(){
        //蓄力帧监听        
        //怪物
        
    }

    startLaunch(groundMove:cc.Node,lightMove:cc.Node,monster:cc.Node){
        // 
    }
}
