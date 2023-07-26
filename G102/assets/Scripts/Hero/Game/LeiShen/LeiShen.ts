
import { GameState, IsDebug, JiaSu } from "../../../Constants";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GroundManager from "../../../Game/GroundManager";
import SkillManager from "../../../Game/SkillManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { KeyFrameData } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import MyTool from "../../../Tools/MyTool";
import { BuffData } from "../BuffData";
import Hero from "../Hero";
import { BuffId, BuffType, DamageType, GongJi_FangXiang,Hero_State, SkillType } from "../HeroConfig";
import ChainLightning from "./ChainLightning";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LeiShen extends Hero {
    /**被闪电过的怪的uuid */
    shandian_monster:string[]=[];

//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();
        super.addLoadByGameEffectId(GameEffectId.xuanyun,4);
        super.addLoadByGameEffectId(GameEffectId.lei_shen_shandian,4);
        super.addLoadByGameEffectId(GameEffectId.lei_shen_shandian_hit,4);
        super.addLoadByGameEffectId(GameEffectId.lei_shen_skill_ground,4);
        super.addLoadByGameEffectId(GameEffectId.lei_shen_skill_sky,1);
        this.is_LoadLoad=true;

        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addResetListen(this.onResetState);
    }

    onResetState(){

        
    }

    onXuanYunResult(isXuanYun:boolean){
        /**雷神技能状态无法被控制 */
        if(isXuanYun&&this.getHeroState()!=Hero_State.skill){
            this.unscheduleAllCallbacks();
            
        }else{
            //根据上个状态判断需要做什么
            this.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        }
    }

    //---------------------------------------------攻击-------------------------------------------------
    onHitMonster(damageType:DamageType,isCrit:boolean,monster:cc.Node){
        
    }

    normalAttack(monster:cc.Node)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
        return;
        //求出方向
        this.is_can_gongji=false;
        this.startAttack(monster);
    }
    /**普攻对敌人释放一道闪电，可以连续弹射{参数1}名敌人（每个敌人人只能被弹射一次），造成{参数2}%伤害并施加一层“超负荷” */
    startAttack(enemyNode:cc.Node)
    {
        let enemyPos=enemyNode.getComponent(Monster).getSheShouPos();
        let fangxiang=this.getFangXiangByPos(enemyPos);        
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            this.shandian_monster=new Array();
            this.createShanDian(null,enemyNode.getComponent(Monster));
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_LeiGodAttack);
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
    /**当敌人身上的超负荷达到5层时，会受到落雷攻击造成{参数1}伤害并击晕{参数2}秒 */
    createShanDian(firstMonster:Monster,endMonster:Monster){        
        this.shandian_monster.push(endMonster.uuid);
        let shandian=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.lei_shen_shandian,this.getCreateBulletPos());
        shandian.getComponent(ChainLightning).init(GameEffectId.lei_shen_shandian,firstMonster,endMonster,this.onEndMonster.bind(this));
        let gjData=this.getGongJiData(DamageType.Skill,false,SkillType.Passive_1,this.hero_data.getSkillValue2(SkillType.Passive_1))
        let data=endMonster.beFlashInjured(gjData);
        GameEffectsManager.getInstance().createGameEffectById(GameEffectId.lei_shen_shandian_hit,endMonster.getCenterPos());
        if(this.hero_data.getIsUnlock(SkillType.Passive_2)&&data.getDamageNum()>0&&data.is_die==false){
            let buffData=new BuffData();
            buffData.buff_id=BuffId.Hero_LeiShen_ChaoFuHe;
            buffData.remain_time=60;
            buffData.buff_type=BuffType.Burst;
            buffData.buff_value=[4];
            buffData.game_effect_id=GameEffectId.Null;
            buffData.add_floor=1;            
            let damageRate=this.hero_data.getSkillValue1(SkillType.Passive_2)
            endMonster.addDeBuff(buffData,this.getGongJiData(DamageType.Skill,false,SkillType.Passive_2,damageRate));
        }
    }

    onEndMonster(endMonster:Monster){        
        let tansheNum=this.hero_data.getSkillValue1(SkillType.Passive_1)+this.hero_lvl;
        if(this.shandian_monster.length<tansheNum){
            let nextMonster=this.getMonster(endMonster.getCenterPos());
            if(nextMonster){
                this.createShanDian(endMonster,nextMonster);
            }
        }
    }

    getIsTanShe(uuid:string):boolean{
        return this.shandian_monster.indexOf(uuid)>=0;
    }

    getMonster(pos:cc.Vec2):Monster
    {
        let em=MonsterManager.getInstance();        
        if(em.node.childrenCount<=0)
        {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        let attMonsters:Monster[]=new Array();
        for(let enemy of em.node.children)
        {
            let enemyTS=enemy.getComponent(Monster);
            if(enemyTS && enemyTS.getIsCanCheck()==true)
            {
                let distance=pos.sub(enemyTS.getCenterPos()).mag();
                if(this.getIsTanShe(enemyTS.uuid)==false && distance<=500)
                {
                    attMonsters.push(enemyTS);
                }
            }
        }
        if(attMonsters.length<=0)
        {
            return null;
        }
        if(1==attMonsters.length)
        {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort((a:Monster,b:Monster)=>{
            return a.getCenterPos().sub(pos).mag()-b.getCenterPos().sub(pos).mag();
        });
        return attMonsters[0];
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
        //发射帧监听
        let fasheData=new KeyFrameData();
        fasheData.name="FaShe";
        fasheData.callback=()=>{
                        
        }        
        //英雄动作播放
        this.setHeroState(Hero_State.skill,GongJi_FangXiang.zhong,[fasheData],()=>{
            //隐身
            SkillManager.getInstance().setTimeStop(false);  
            this.node.parent=cc.find('Canvas/Hero_Root');
            this.node.zIndex=2;
            //可以发射
            this.startLaunch();
            
        });
        this.spine.timeScale=JiaSu;
    }
    /**3秒内在战场上的随机位置召唤{参数1}道闪电，闪电会对半径80圆形范围内的敌人造成{参数2}%伤害，并施加一层“超负荷” */
    startLaunch(){
        this.node.opacity=0;
        this.node_shadow.opacity=0;
        super.setAttSpineScale();
        let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue2(SkillType.Active));
        let num=this.hero_data.getSkillValue1(SkillType.Active);
        let jiange=3/num;
        let ex1=this.hero_data.ExclusiveWeaponSkillValue_1;
        let exFanwei=0;
        if(ex1&&ex1>0){
            //增加范围
            exFanwei=ex1;            
        }
        // if(IsDebug){
        //     exFanwei=200;
        // }
        for(let i=0; i<num; i++){
            this.scheduleOnce(()=>{
                let pos=cc.v2(Math.random()*550-275,Math.random()*800-400);
                GroundManager.getInstance().createGameEffectById(GameEffectId.lei_shen_skill_ground,pos);
                let node=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.lei_shen_skill_sky,pos);
                node.scale=1;
                MyTool.randomSceneShake(-6,6,0.015,6);
                let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,pos,180*(1+exFanwei));
                if(monsters){
                    GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_LeiGodSkill2);
                    for(let n=0; n<monsters.length; n++){
                        let monster=monsters[n].getComponent(Monster);
                        let data=monster.beFlashInjured(gjData);
                        if(this.hero_data.getIsUnlock(SkillType.Passive_2)&&data.getDamageNum()>0){                            
                            if(data.is_die==false){
                                let buffData=new BuffData();
                                buffData.buff_id=BuffId.Hero_LeiShen_ChaoFuHe;
                                buffData.remain_time=60;
                                buffData.buff_type=BuffType.Burst;
                                buffData.buff_value=[4];
                                buffData.game_effect_id=GameEffectId.Null;
                                buffData.add_floor=2;
                                let damageRate=this.hero_data.getSkillValue1(SkillType.Passive_2)
                                monster.addDeBuff(buffData,this.getGongJiData(DamageType.Skill,false,SkillType.Passive_2,damageRate));
                            }
                        }
                    }
                }
            },i*jiange);
        }
        this.scheduleOnce(()=>{
            this.node.opacity=255;
            this.node_shadow.opacity=255;
            super.playSpineAnimation('SkillEnd',false,null,()=>{
                this.node.opacity=255;
                super.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong,null,null);
            })
        },3)
        SkillManager.getInstance().setIsSkillState(false);
    }
}
