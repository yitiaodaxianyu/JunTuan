
import { GameState, JiaSu } from "../../../Constants";
import FightingManager from "../../../Game/FightingManager";
import { GameEffectId } from "../../../Game/GameEffectsManager";
import SkillManager from "../../../Game/SkillManager";
import SkyManager from "../../../Game/SkyManager";
import GameManager from "../../../GameManager";
import { LevelManager } from "../../../Level/LevelManager";
import { KeyFrameData } from "../../../Monster/MonsterData";
import { SoundIndex } from "../../../Sound/AudioConstants";
import TutorailsManager from "../../../Tutorials/TutorailsManager";
import { GongJiData } from "../../Data/HeroData";
import Hero from "../Hero";
import { DamageType, GongJi_FangXiang, Hero_State, ShieldId, ShieldType, SkillType } from "../HeroConfig";
import PaoDan from "./PaoDan";
import PaoDanNormal from "./PaoDanNormal";
import TouDan from "./TouDan";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaoShou extends Hero {
    
    /**没有触发被动炮弹的次数 */
    no_paopao_num:number=0;

    onLoad()
    {
        super.onLoad();
        super.addLoadByGameEffectId(GameEffectId.paoshou_paodan_att,8);
        super.addLoadByGameEffectId(GameEffectId.paoshou_paodan_skill,8);
        super.addLoadByGameEffectId(GameEffectId.paoshou_paodan_skill_ex,2);
        super.addLoadByGameEffectId(GameEffectId.paoshou_paodan_hit,8);
        super.addLoadByGameEffectId(GameEffectId.paoshou_skill_hit,8);
        super.addLoadByGameEffectId(GameEffectId.xuanyun,4);
        super.addLoadByGameEffectId(GameEffectId.paoshou_skill_2,1);
        super.addLoadByGameEffectId(GameEffectId.paoshou_active_skill_1,1);
        super.addLoadByGameEffectId(GameEffectId.paoshou_active_skill_2,6);
        super.addLoadByGameEffectId(GameEffectId.paoshou_active_skill_toudan,6);
        super.addLoadByGameEffectId(GameEffectId.paoshou_dazhao_xinhaodan,6);
        super.addLoadByGameEffectId(GameEffectId.paoshou_dazhao_weiyan,6);
        super.addLoadByGameEffectId(GameEffectId.paoshou_dazhao_weiyan_end,1);
        super.addLoadByGameEffectId(GameEffectId.paoshou_dazhao_xinhaodan_miaozhun,1);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);        
    }
    
    start()
    {
        super.start();
        // if(this.hero_data.getSkillValue1(SkillType.Passive_2)){
        //     this.schedule(this.checkSkill2,this.hero_data.getSkillColdDown(SkillType.Passive_2));
        // }
        this.is_need_check_distance=true;
        super.setSkillTipSize(400,400);
        if(LevelManager.getInstance().start_level==2&&TutorailsManager.getInstance().isShowTutorials(206)){
            this.hideHero();
        }
    }

    onXuanYunResult(isXuanYun:boolean){
        if(isXuanYun){
            this.unscheduleAllCallbacks();
            // if(this.hero_data.getSkillValue1(SkillType.Passive_2)){
            //     this.schedule(this.checkSkill2,this.hero_data.getSkillColdDown(SkillType.Passive_2));
            // }
        }else{
            //根据上个状态判断需要做什么
            this.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
        }
    }
    //---------------------------------------------攻击----------------------------------------------
    createPaoDan(id:GameEffectId,pos:cc.Vec2,targetPos:cc.Vec2,speed:number,size:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,pos);
        node.getComponent(PaoDan).init(id,speed,targetPos,gjData,size);
    }

    createNormalPaoDan(id:GameEffectId,pos:cc.Vec2,dir:number,speed:number,gjData:GongJiData){
        let node=FightingManager.getInstance().createGameEffectById(id,pos);
        node.getComponent(PaoDanNormal).init(id,speed,dir,gjData);
    }

    normalAttack(monster:cc.Node)
    {
        if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing)
            return;
        this.is_can_gongji=false;
        this.startAttack(monster.getPosition());      
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_PaoshouAttack);
    }
    /**每次攻击会对半径{参数1}范围内造成{参数2}%伤害 */
    startAttack(enemyPos:cc.Vec2)
    {
        let fangxiang=super.getFangXiangByPos(enemyPos);
        let data=new KeyFrameData();
        data.name="Attack";
        data.callback=()=>{
            //正中心
            let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Passive_1,this.hero_data.getSkillValue2(SkillType.Passive_1));
            let bullectPos=super.getCreateBulletPos();  
            let paoDanId=GameEffectId.paoshou_paodan_skill;
            let size=this.hero_data.getSkillValue1(SkillType.Passive_1);
            this.createPaoDan(paoDanId,bullectPos,enemyPos,this.bullet_speed,size,gjData);
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

    // checkSkill1(enemyPos:cc.Vec2):boolean{
    //     //概率
    //     let rate=this.hero_data.getSkillValue1(SkillType.Passive_1);
    //     let paoDanId=GameEffectId.paoshou_paodan_skill;
    //     if(this.hero_data.ExclusiveWeaponSkillValue_1>0 && this.no_paopao_num>=this.hero_data.ExclusiveWeaponSkillValue_1)
    //     {
    //         rate=1;
    //         paoDanId=GameEffectId.paoshou_paodan_skill_ex;
    //     }
        
    //     if(rate&&Math.random()<rate){
    //         this.is_can_jishu=false;
    //         let data=new KeyFrameData();
    //         data.name="Attack";
    //         data.callback=()=>{
    //             let bullectPos=super.getCreateBulletPos();    
    //             let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Passive_1,this.hero_data.getSkillValue3(SkillType.Passive_1));
    //             //码数*2
    //             let size=this.hero_data.getSkillValue2(SkillType.Passive_1);
    //             this.createPaoDan(paoDanId,bullectPos,enemyPos,this.bullet_speed,size,gjData);
    //             GameManager.getInstance().sound_manager.playSound(SoundIndex.cannon);
    //         }
    //         super.setHeroStateAndAnimation(Hero_State.skill,'KaiShi_Attack',false,[data],()=>{
    //             this.is_can_jishu=true;
    //             super.setHeroState(Hero_State.idle,this.cur_fangxiang);
    //         })
    //         this.no_paopao_num=0;
    //         return true;
    //     }else{
    //         this.no_paopao_num++;
    //         return false;;
    //     }
    // }
    // /**BUG：可能被眩晕后无法再次释放了,使用update计数 */
    // checkSkill2(){
    //     if(GameManager.getInstance().cur_game_state!=GameState.Game_Playing){
    //         return;
    //     }
    //     let node=this.node.getChildByName('progressBar');
    //     node.active=true;
    //     let progressBar=node.getComponent(cc.ProgressBar);
    //     progressBar.progress=0;
    //     this.is_can_jishu=false;
    //     super.setHeroStateAndAnimation(Hero_State.skill,'Buff',false,null,()=>{
    //         this.is_can_jishu=true;
    //         super.setHeroState(Hero_State.idle,this.cur_fangxiang);
    //     })
    //     cc.tween(progressBar).to(0.5,{progress:1}).call(()=>{
            
    //         //加血10秒
    //         // let buffData=new BuffData();
    //         // buffData.buff_id=BuffId.Hero_PaoShou_Skill_2_Add_Hp;
    //         // buffData.buff_type=BuffType.Normal;
    //         // buffData.buff_value=[this.hero_data.getSkillValue2(SkillType.Passive_2)+this.hero_data.getSkillValue3(SkillType.Passive_2)*GameManager.getInstance().wall_data.getMaxHp()];
    //         // buffData.recovery_jiange_time=1;
    //         // buffData.remain_time=10;
    //         // super.addBuff(buffData)
    //         // node.active=false;
    //         // //加伤害5秒
    //         // let buffData1=new BuffData();
    //         // buffData1.buff_id=BuffId.Hero_PaoShou_Skill_2_Add_Damage;
    //         // buffData1.buff_type=BuffType.Normal;
    //         // buffData1.game_effect_id=GameEffectId.paoshou_skill_2;
    //         // buffData1.buff_value=[this.hero_data.getSkillValue1(SkillType.Passive_2)];
    //         // buffData1.remain_time=5;
    //         // super.addBuff(buffData1)
    //     }).start();
    // }

    useSkill(pos:cc.Vec2):number
    {
        SkillManager.getInstance().releaseSkill(()=>{
            this.startSelfXuLi(pos);
        },this.node);
        return 1;
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
    /**发射数枚炮弹，对半径200的目标区域进行{参数1}次轰炸，每次造成{参数2}%伤害 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_PaoShouSkill1);
        let num=this.hero_data.getSkillValue1(SkillType.Active)
        let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue2(SkillType.Active));
        let pi2=Math.PI*2;
        for(let i=0; i<num; i++){
            this.scheduleOnce(()=>{
                //半径随机
                let r=Math.random()*200;
                //弧度随机
                let hudu=Math.random()*pi2;
                //求点
                let posX=pos.x+Math.cos(hudu)*r;
                let posY=pos.y+Math.sin(hudu)*r;
                let toudan=SkyManager.getInstance().createGameEffectById(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,posY+1600));
                toudan.getComponent(TouDan).init(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,posY),gjData);
            },0.15*i);
        }
        SkillManager.getInstance().setIsSkillState(false);
        // let xinhaodan=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.paoshou_dazhao_xinhaodan,this.getCreateBulletPos(),SkillManager.getInstance().node);
        // let cenPos=GameManager.getInstance().getFightCenter();
        // let oldParent=this.node.parent;
        // this.node.parent=SkillManager.getInstance().node;
        // SkillManager.getInstance().setTimeStop(true);
        // SkillManager.getInstance().startBaiPing();
        // MyTool.randomSceneShake(-5,5,0.02,6);
        // let monsters=MonsterManager.getInstance().getMonstersForMaxAttak(1,this.node.getPosition(),this.hero_data.gongji_fanwei);        
        // if(monsters){
        //     cenPos=monsters[0].getPosition().add(cc.v2(0,-25));
        //     if(cenPos.y<GameManager.getInstance().enemy_att_y){
        //         cenPos=monsters[0].getPosition();
        //     }
        // }
        // this.spine.timeScale=JiaSu;
        // xinhaodan.getComponent(SignalFlare).init(GameEffectId.paoshou_dazhao_xinhaodan,600,cenPos,()=>{            
        //     this.node.parent=oldParent;
        //     this.node.zIndex=2;
        //     this.spine.timeScale=1;
        //     SkillManager.getInstance().setTimeStop(false);
        //     this.resetGongJiJiShu();
        //     super.setHeroState(Hero_State.idle,this.cur_fangxiang);
        //     let startY=-(cc.winSize.height/2+200)
        //     let endY=cc.winSize.height+400;
        //     let speed=(endY-startY)/3;
        //     let node=SkyManager.getInstance().createGameEffectById(GameEffectId.paoshou_active_skill_1,cc.v2(0,startY));
        //     let gjData=super.getGongJiData(DamageType.Skill,false,this.hero_data.getSkillValue2(SkillType.Active));
        //     cc.tween(node).by(3,{y:endY}).call(()=>{
        //         GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.paoshou_active_skill_1,node);
        //     }).start();
        //     let paoNum=0;
        //     let radius=50;
        //     let toudanCall=()=>{
                
        //         let radian=(paoNum*Math.PI/3)
        //         let posX=cenPos.x+Math.cos(radian)*radius;
        //         let posY=cenPos.y+Math.sin(radian)*radius;
        //         let toudan=SkyManager.getInstance().createGameEffectById(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,posY+1600));
        //         // let toudan=SkyManager.getInstance().createGameEffectById(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,(cc.winSize.height/2+200+speed*paoNum)));
        //         // let xx=108*(paoNum%2==0?-1:1);
        //         // let yy=node.y+100;
        //         toudan.getComponent(TouDan).init(GameEffectId.paoshou_active_skill_toudan,cc.v2(posX,posY),gjData);
        //         paoNum++;
        //     };
        //     this.schedule(toudanCall,0.25,5,1);
        //     SkillManager.getInstance().setIsSkillState(false);
        // });                    
        // GameManager.getInstance().wall_data.addShieldValue(ShieldId.PaoShou_ActiveSkill,ShieldType.All,5,this.hero_data.total_attack*this.hero_data.getSkillValue1(SkillType.Active));
    }
    
}
