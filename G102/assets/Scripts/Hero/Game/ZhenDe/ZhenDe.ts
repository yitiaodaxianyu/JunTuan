
import { GameState, IsDebug, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import SkillManager from "../../../Game/SkillManager";
import SkyManager from "../../../Game/SkyManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import { SoundIndex } from "../../../Sound/AudioConstants";
import MyTool from "../../../Tools/MyTool";
import WallManager from "../../../Wall/WallManager";
import { GongJiData } from "../../Data/HeroData";
import { HeroManager } from "../../Data/HeroManager";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State, Hero_Type, ShieldType, SkillType } from "../HeroConfig";
import ZhenDeDan from "./ZhenDeDan";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ZhenDe extends Hero {
    /**治疗计数 */
    zhiliao_jishu:number=0;
    zhiliao_time:number=0;
    cur_release_skill:SkillType=SkillType.Null; 

    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.zhen_de_attack,1);
        super.addLoadByGameEffectId(GameEffectId.zhen_de_attack_hit,1);
        super.addLoadByGameEffectId(GameEffectId.zhen_de_beidong_skill,1);
        super.addLoadByGameEffectId(GameEffectId.zhen_de_beidong_skill_wall,1);
        super.addLoadByGameEffectId(GameEffectId.zhen_de_active_skill_1,1);
        super.addLoadByGameEffectId(GameEffectId.zhen_de_active_skill_2,2);
        super.addLoadByGameEffectId(GameEffectId.zhen_de_active_skill_3,2);
        super.addLoadByGameEffectId(GameEffectId.monster_zhiliao_halo_hit,2);
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
        super.setSkillTipSize(1680,600);
        this.zhiliao_time=this.hero_data.getSkillValue1(SkillType.Passive_1);
    }

    resetSkill(){
        this.zhiliao_jishu=0;
    }
    
    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.unscheduleAllCallbacks();            
        }else{
            if(this.skill_queue.length>0){
                this.startSkill(this.skill_queue.shift());
            }else{
                //根据上个状态判断需要做什么
            this.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
            }            
        }
    }

    //---------------------------------------------攻击----------------------------------------------
    

    createZhenDeDan(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(ZhenDeDan).init(id,speed,dir,gjData);
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
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ZDAttack);
            let jianshiPos=this.getCreateBulletPos();
            let offsetPos=enemyPos.sub(jianshiPos);
            let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            this.createZhenDeDan(GameEffectId.zhen_de_attack,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            if(this.is_double_attack){
                this.resetNormalAttack();
            }else{
                this.gongji_jishu=0;
            }        
        }
        super.setHeroState(Hero_State.attack,fangxiang,[data],()=>{
            this.setHeroState(Hero_State.idle,this.cur_fangxiang);
            /**概率 */
            this.checkSkill2();
        });
    }

    checkSkill2(){
        if(this.hero_data.getIsUnlock(SkillType.Passive_2)){
            let rate=this.hero_data.getSkillValue1(SkillType.Passive_2);
            if(rate&&Math.random()<rate){
                this.startSkill2();
            }
        }
        
    }
    
    startSkill1(){        
        if(super.getHeroState()==Hero_State.idle&&super.isHaveDeBuff(BuffId.Monster_XuanYun)==false){
            this.cur_release_skill=SkillType.Passive_1;
            let data=new KeyFrameData();
            data.name="Passive1";
            data.callback=()=>{
                this.cur_release_skill=SkillType.Null;
                this.gongji_jishu=0;
                let buffData=new BuffData();
                buffData.buff_id=BuffId.Hero_ZhenDe_JiaXueJianShang;
                buffData.buff_type=BuffType.Gain;
                buffData.buff_value=[this.hero_data.getSkillValue2(SkillType.Passive_1)*WallManager.getInstance().getMainWall().getMaxHp(),this.hero_data.getSkillValue3(SkillType.Passive_1)];
                buffData.remain_time=5;
                // buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
                buffData.recovery_jiange_time=1;
                WallManager.getInstance().getMainWall().addBuff(buffData)
            }
            super.setHeroStateAndAnimation(Hero_State.skill,"Passive1",false,[data],()=>{
                this.setHeroState(Hero_State.idle,this.cur_fangxiang);
                if(this.skill_queue.length>0){
                    this.startSkill(this.skill_queue.shift());
                }
            });
        }else{
            this.skill_queue.push(SkillType.Passive_1);
        }
    }

    startSkill2(){
        // if(super.getHeroState()==Hero_State.idle&&super.isHaveDeBuff(BuffId.Monster_XuanYun)==false){
        //     this.cur_release_skill=SkillType.Passive_2;      
        //     let data=new KeyFrameData();
        //     data.name="Passive1";
        //     data.callback=()=>{
        //         this.cur_release_skill=SkillType.Null;
        //         this.gongji_jishu=0;
        //         let heroId=HeroManager.getInstance().getRandHeroId(GameManager.getInstance().cur_game_mode,this.hero_type,GameManager.getInstance().cur_team_list);
        //         if(heroId!=Hero_Type.NULL){
        //             let buffData=new BuffData();
        //             buffData.buff_id=BuffId.Hero_ZhenDe_BaoJiMingZhongLv;
        //             buffData.buff_type=BuffType.Gain;
        //             buffData.buff_value=[this.hero_data.getSkillValue2(SkillType.Passive_2)];
        //             buffData.remain_time=5;
        //             buffData.game_effect_id=GameEffectId.Null;                
        //             GameManager.getInstance().all_hero.get(heroId).addBuff(buffData);
        //             //特效
        //             SkyManager.getInstance().createGameEffectById(GameEffectId.zhen_de_beidong_skill,GameManager.getInstance().all_hero.get(heroId).node.getPosition());
        //         }
        //     }
        //     super.setHeroStateAndAnimation(Hero_State.skill,"Passive1",false,[data],()=>{
        //         this.setHeroState(Hero_State.idle,this.cur_fangxiang);
        //         if(this.skill_queue.length>0){
        //             this.startSkill(this.skill_queue.shift());
        //         }
        //     });
        // }else{
        //     this.skill_queue.push(SkillType.Passive_2);
        // }

        WallManager.getInstance().getMainWall().changeHp(WallManager.getInstance().getMainWall().getMaxHp()*(0.01+this.hero_lvl*0.002));
        WallManager.getInstance().getMainWall().addHpBuff();
        
    }

    startSkill(skillType:SkillType){
        switch(skillType){            
            case SkillType.Passive_1:{
                this.startSkill1();
            }break;
            case SkillType.Passive_2:{
                this.startSkill2();
            }break;
        }
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
            if(this.skill_queue.length>0){
                this.startSkill(this.skill_queue.shift());
            }
        });
        this.spine.timeScale=JiaSu;
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ZDSkill);
    }
    /**在目标区域的左右两边各召唤一阵藤蔓冲击波，藤蔓冲击波会向屏幕另一端滚动，途中速度会逐渐加快，对触碰到的敌人造成{参数1}%伤害，并造成{参数2}秒眩晕效果 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        //专武
        let ex1=this.hero_data.ExclusiveWeaponSkillValue_1;
        let cdT=0;
        if(ex1&&ex1>0){
            cdT=ex1;
        }
        //光速下来
        let light=SkyManager.getInstance().createGameEffectById(GameEffectId.zhen_de_active_skill_1,cc.v2(this.node.x,this.node.y+640));
        cc.tween(light).to(0.1*GameManager.getInstance().getGameRate(),{y:this.node.y+this.xuanyun_pos.y}).call(()=>{
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.zhen_de_active_skill_1,light);
            GameEffectsManager.getInstance().createGameEffectById(GameEffectId.zhen_de_active_skill_2,light.getPosition());
            // //左右两边的英雄加特效
            // //如果是射手相邻的英雄，不包括自己
            // let teamList=GameManager.getInstance().cur_team_list;
            // let sheshouIndex=teamList.indexOf(this.hero_type);
            // let buffValue=this.hero_data.getSkillValue1(SkillType.Active);
            // let remainTime=this.hero_data.getSkillValue2(SkillType.Active);
            // MyTool.randomSceneShakeSmall();
            // WallManager.getInstance().getMainWall().removeAllDeBuff();
            // GameManager.getInstance().all_hero.forEach((v,k)=>{
            //     //特效
            //     v.removeAllDeBuff();
            //     let heroIndex=teamList.indexOf(k);
            //     if(sheshouIndex!=heroIndex && Math.abs(sheshouIndex-heroIndex)<=1){
            //         let buffData=new BuffData();
            //         buffData.buff_id=BuffId.Hero_ZhenDe_Gongsu;
            //         buffData.buff_type=BuffType.Gain;
            //         buffData.game_effect_id=GameEffectId.zhen_de_active_skill_3;
            //         buffData.buff_value=[buffValue];
            //         buffData.remain_time=remainTime;
            //         v.addBuff(buffData);
            //     }
            //     //减少除自己之外的cd
            //     if(cdT>0&&v.hero_type!=this.hero_type){                    
            //         v.changeCD(-cdT);
            //     }
            // })
            //战车加护盾
            WallManager.getInstance().getMainWall().addShield(this.hero_type,ShieldType.All,10,0.1*this.hero_data.total_hp,GameEffectId.zhen_de_beidong_skill_wall);
            

            // WallManager.getInstance().getMainWall().addShield(this.hero_type,ShieldType.All,this.hero_data.getSkillValue3(SkillType.Active),this.hero_data.getSkillValue3(SkillType.Active)*this.hero_data.total_hp);
        }).start();
        SkillManager.getInstance().setIsSkillState(false);
    }

    update(dt: number): void {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing){
            return;
        }
        super.update(dt);
        this.zhiliao_jishu+=dt;
        if(this.zhiliao_jishu>=this.zhiliao_time){
            this.zhiliao_jishu=0;
            //this.startSkill1();
        }
    }
}
