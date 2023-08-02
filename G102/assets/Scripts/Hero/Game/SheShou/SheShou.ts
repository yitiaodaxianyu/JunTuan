
import { GameState, JiaSu } from "../../../Constants";
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
import { BuffId, BuffType, DamageType, GongJi_FangXiang, Hero_State,  SkillIndicatorType, SkillType } from "../HeroConfig";
import JianShi from "./JianShi";
import JianShiCrit from "./JianShiCrit";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SheShou extends Hero {
    
    jianyu_num:number=0;
    test_fenzhi:number=1;
//---------------------------------------------加载----------------------------------------------
    onLoad()
    {
        super.onLoad();
        //加载技能指示器
        super.addLoadByGameEffectId(GameEffectId.sheshou_jianshi_att,8);
        super.addLoadByGameEffectId(GameEffectId.sheshou_jianshi_skill,8);
        super.addLoadByGameEffectId(GameEffectId.sheshou_jianshi_att_hit,8);
        super.addLoadByGameEffectId(GameEffectId.sheshou_attack_ctrl_hit,2);
        super.addLoadByGameEffectId(GameEffectId.sheshou_jianshi_super_skill_1,16);
        super.addLoadByGameEffectId(GameEffectId.sheshou_jianshi_super_skill_2,16);
        super.addLoadByGameEffectId(GameEffectId.sheshou_jianshi_super_skill_3,16); 
        this.is_LoadLoad=true; 
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    }

    start()
    {
        super.start();
        this.is_need_check_distance=true;
        let zhijing=this.hero_data.getSkillValue1(SkillType.Active)*2;
        super.setSkillTipSize(zhijing,zhijing);
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

    createJianShi(id:GameEffectId,jianshiPos:cc.Vec2,speed:number,dir:number,gjData:GongJiData):cc.Node{
        let node=FightingManager.getInstance().createGameEffectById(id,jianshiPos);
        node.getComponent(JianShi).init(id,speed,dir,gjData);
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
        // let enemyPos=monster.getComponent(Monster).getSheShouPos();
        // if(this.checkSkill1(enemyPos)==false){
        //     this.startAttack(monster);
        // } 
        this.checkSkill1();       
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
            let gjData=super.getGongJiData(DamageType.Normal,true,SkillType.Null);
            this.createJianShi(GameEffectId.sheshou_jianshi_att,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_GongjianshouAttack);
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
    /**被动技能1触发判断-每次普通攻击有{参数1}%几率改为射出一波箭雨，箭雨含{参数2}支箭，每支箭造成{参数3}%伤害 */
    checkSkill1(pos:cc.Vec2=null):boolean{
        //概率
        let rate=this.hero_data.getSkillValue1(SkillType.Passive_1);
        if(this.jianyu_num>0){
            rate=1;
            this.jianyu_num--;
        }
        if(rate&&Math.random()<rate){
            this.is_can_gongji=false;                    
            let data=new KeyFrameData();
            data.name="Attack";
            data.callback=()=>{
                this.gongji_jishu=0; 
                let jianshiPos=super.getCreateBulletPos();
                let offsetPos=cc.v2(0, 10);;
                let pi2=Math.PI*2;
                //中心方向
                let radian=(Math.atan2(offsetPos.y,offsetPos.x)+pi2)%pi2;
                //let angle=MyTool.radianToAngle(radian);
                //弧形范围,最大30°，间隔3°
                let huduFanWei=Math.PI/60;
                let allNum=this.hero_data.getSkillValue2(SkillType.Passive_1)+this.hero_lvl;
                let waveNum=Math.floor(allNum/10)+1;
                if(allNum%10==0){
                    waveNum--;
                }
                //求平均数，第一波最多
                let average=Math.floor(allNum/waveNum);
                //第一波数量
                let firstNum=average+allNum%waveNum;
                let gjData=super.getGongJiData(DamageType.Skill,true,SkillType.Passive_1,this.hero_data.getSkillValue3(SkillType.Passive_1));
                let jiange=0.2;
                for(let i=0; i<waveNum; i++)
                {
                    let num=i==0?firstNum:average;
                    this.scheduleOnce(()=>{                    
                        for(let n=0; n<num; n++)
                        {
                            let jianshiDir=radian+(n-num/2)*huduFanWei;
                            this.createJianShi(GameEffectId.sheshou_jianshi_skill,jianshiPos,this.bullet_speed,jianshiDir,gjData); 
                        }          
                    },jiange*(i));
                }
                GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_GongjianshouAttack);
            }
            super.setHeroState(Hero_State.attack,GongJi_FangXiang.zhong,[data],()=>{
                super.setHeroState(Hero_State.idle,GongJi_FangXiang.zhong);
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
        // let xuliData=new KeyFrameData();
        // xuliData.name='XuLi';
        // xuliData.callback=()=>{
        //     //创建英雄的蓄力动画特效。
        //     let assemble=SkillManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_super_skill_1,super.getCreateBulletPos().add(cc.v2(0,50)));
        //     assemble.scale=1;
        //     assemble.opacity=255;
        //     let xueliSpine=assemble.getComponent(sp.Skeleton);
        //     xueliSpine.timeScale=JiaSu;
        //     xueliSpine.setAnimation(0,'Skill_XuLi',false);
        //     //监听蓄力动作完成
        //     xueliSpine.setCompleteListener(()=>{
        //         xueliSpine.setCompleteListener(null);
        //         //蓄力完成，发射白光
        //         SkillManager.getInstance().setTimeStop(false);
        //         this.node.parent=heroRoot;
        //         let anima=xueliSpine.setAnimation(0,'Skill_FaShe',false);
        //         xueliSpine.timeScale=1;
        //         //蓄力完成，监听白光帧
        //         xueliSpine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event)=>{
        //             if(event.data.name=='Bai'){
        //                 SkillManager.getInstance().startBaiPing();
        //             }
        //         })
        //     })
        // }
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
    /**蓄力后发射一波箭雨，对半径{参数1}范围内的敌人在3秒内造成15次{参数2}%伤害 */
    startLaunch(pos:cc.Vec2){
        super.setAttSpineScale();
        this.resetGongJiJiShu();
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_GongjianshouSkill);
        let gjData=super.getGongJiData(DamageType.Skill,false,SkillType.Active,this.hero_data.getSkillValue2(SkillType.Active));                
        let pi2=Math.PI*2;
        let radius=this.hero_data.getSkillValue1(SkillType.Active);
        let createJianShi=()=>{
            //半径随机
            let r=Math.random()*radius;
            //弧度随机
            let hudu=Math.random()*pi2;
            //求点
            let posX=pos.x+Math.cos(hudu)*r;
            let posY=pos.y+Math.sin(hudu)*r;                
            let startPos=cc.v2(posX+Math.random()*radius*2-radius,1280+posY);
            let endPos=cc.v2(posX,posY);
            let offsetPos=endPos.sub(startPos);
            let angle=MyTool.radianToAngle(Math.atan2(offsetPos.y,offsetPos.x))+90;
            let jianshi=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_super_skill_2,startPos);
            jianshi.scale=2;
            jianshi.angle=angle;
            cc.tween(jianshi).to(Math.random()*0.3+0.2,{x:endPos.x,y:endPos.y,scale:0.3}).call((node:cc.Node)=>{
                GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.sheshou_jianshi_super_skill_2,jianshi);
                let jiantou=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_super_skill_3,node.getPosition());
                jiantou.opacity=255;
                jiantou.angle=angle;
                let hit=GameEffectsManager.getInstance().createGameEffectById(GameEffectId.sheshou_jianshi_super_skill_1,node.getPosition());
                hit.opacity=255;
                hit.scale=0.4;
                let hitSpine=hit.getComponent(sp.Skeleton);
                hitSpine.setAnimation(0,'Skill_Hit',false);
                cc.tween(hit).delay(0.9).to(0.5,{opacity:0}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.sheshou_jianshi_super_skill_1,hit);                        
                }).start();
                cc.tween(jiantou).by(0.1,{angle:Math.random()*10}).by(0.1,{angle:-(Math.random()*10)}).by(0.1,{angle:Math.random()*10}).by(0.1,{angle:-(Math.random()*10)}).delay(0.5).to(0.5,{opacity:0}).call(()=>{
                    GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.sheshou_jianshi_super_skill_3,jiantou);
            }).start();
            }).start();
        }
        let exNum=0;
        let ex1=this.hero_data.ExclusiveWeaponSkillValue_1;
        if(ex1&&ex1>0){
            exNum=ex1;
        }
        let totalNum=60+exNum*4;
        //创建发射的箭矢
        for(let i=0; i<(totalNum); i++){
            this.scheduleOnce(()=>{
                createJianShi();
            },Math.random()*3);
            this.scheduleOnce(()=>{
                createJianShi();
            },i*3/(totalNum));
        }        
        let num=0;
        let damageNum=15+exNum;
        this.schedule(()=>{
            if(num==0){
                MyTool.randomSceneShake(-5,5,0.02,6);
            }
            num++;//cc.log(num);
            let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,pos,radius);
            if(monsters){
                for(let i=0; i<monsters.length; i++){
                    let monsterTs=monsters[i].getComponent(Monster);
                    monsterTs.beFlashInjured(gjData);
                }
            }
        },3/damageNum,damageNum-1);
        SkillManager.getInstance().setIsSkillState(false);
    }
}
