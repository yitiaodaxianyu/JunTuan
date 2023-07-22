
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
import WallManager from "../../../Wall/WallManager";
import { GongJiData } from "../../Data/HeroData";
import { HeroManager } from "../../Data/HeroManager";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State, Hero_Type, ShieldType, SkillType } from "../HeroConfig";
import NvWuDan from "./NvWuDan";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NvWu extends Hero {
    /**治疗计数 */
    zhiliao_jishu:number=0;
    zhiliao_time:number=0;
    cur_release_skill:SkillType=SkillType.Null; 

    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.nvwu_attack_bullect,2);
        super.addLoadByGameEffectId(GameEffectId.nvwu_attack_bullect_hit,2);
        super.addLoadByGameEffectId(GameEffectId.nvwu_active_skill,1);    
        this.is_LoadLoad=true;    
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addGameWinListen(this.resetSkill);
    }

    start()
    {
        super.start();
        this.is_need_check_distance=false;
        super.setSkillTipSize(520,520);
        this.zhiliao_time=this.hero_data.getSkillValue1(SkillType.Passive_1);
    }

    resetSkill(){
        this.zhiliao_jishu=0;
    }
    
    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.unscheduleAllCallbacks();            
        }else{
            this.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        }
    }

    //---------------------------------------------攻击----------------------------------------------
    

    createNvWuDan(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(NvWuDan).init(id,speed,dir,gjData);
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_NWAttack);
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            this.createNvWuDan(GameEffectId.nvwu_attack_bullect,jianshiPos,this.bullet_speed,jianshiDir,gjData);
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
        /**如果有控制技能 */
        this.removeAllDeBuff();
        SkillManager.getInstance().releaseSkill(()=>{
            this.startSelfXuLi(pos);
        },this.node);
        if(this.cur_release_skill!=SkillType.Null){
            this.skill_queue.push(this.cur_release_skill);
        }
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
    /**对260半径范围内的敌人造成{参数1}%伤害并施加{参数2}层中毒和{参数3}%的重伤效果，持续5秒 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,pos,260);
        if(monsters){
            //伤害系数
            let damageData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue1(SkillType.Active));
            //重伤值
            let zsValue=this.hero_data.getSkillValue3(SkillType.Active);
            //减攻速
            let exGs=0;
            let ex1=this.hero_data.ExclusiveWeaponSkillValue_1;
            if(ex1&&ex1>0){
                exGs=ex1;
            }
            //毒数据
            let duData=super.getGongJiData(DamageType.Skill,false,SkillType.Passive_2,0,this.hero_data.getSkillValue3(SkillType.Passive_1)); 
            duData.continuous_damage_rate=this.hero_data.getSkillValue3(SkillType.Passive_1);;           
            for(let i=0; i<monsters.length; i++){
                let monsterTTs=monsters[i].getComponent(Monster);
                //立即造成参数2伤害
                let data=monsterTTs.beFlashInjured(damageData);
                if(data.getDamageNum()>0){
                    GameEffectsManager.getInstance().createGameEffectById(GameEffectId.nvwu_attack_bullect_hit,monsterTTs.getCenterPos());
                    if(!data.is_die){
                        let buffData=new BuffData();
                        buffData.buff_id=BuffId.Hero_NvWu_Skill1_Zhongdu;
                        buffData.buff_type=BuffType.Normal;
                        buffData.remain_time=5;
                        buffData.add_floor=this.hero_data.getSkillValue2(SkillType.Active);
                        buffData.max_floor=6;
                        buffData.damage_jiange_time=1;
                        monsterTTs.addDeBuff(buffData,duData);
                        //重伤buff
                        let zsData=new BuffData();
                        zsData.buff_id=BuffId.Hero_NvWu_Skill1_ZhongShang;
                        zsData.buff_type=BuffType.SeriouslyInjured;
                        zsData.remain_time=5;
                        zsData.buff_value=[zsValue];
                        monsterTTs.addDeBuff(zsData,null);
                        if(exGs>0){
                            //专武的减攻速
                            let gsData=new BuffData();
                            gsData.buff_id=BuffId.Hero_NvWu_ExSkill_JianGongSu;
                            gsData.buff_type=BuffType.Normal;
                            gsData.remain_time=5;
                            gsData.buff_value=[exGs];
                            monsterTTs.addDeBuff(gsData,null);
                        }                        
                    }
                }
            }
        }
        let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.nvwu_active_skill,pos);
        node.scale=3;
        SkillManager.getInstance().setIsSkillState(false);
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_NWSkill);
    }

}
