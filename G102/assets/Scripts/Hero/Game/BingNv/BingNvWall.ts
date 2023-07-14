import { GameState, IsDebug } from "../../../Constants";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import SkillManager from "../../../Game/SkillManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import MonsterManager from "../../../Monster/MonsterManager";
import Wall from "../../../Wall/Wall";
import { WallType } from "../../../Wall/WallConfig";
import WallManager from "../../../Wall/WallManager";
import { GongJiData } from "../../Data/HeroData";
import { BuffData } from "../BuffData";
import GongJi from "../GongJi";
import { BuffId, BuffType, SkillType } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BingNvWall extends Wall {

    gongji_data:GongJiData=null;

    is_destroy:boolean=false;
    private self_rect:cc.Rect=null;
    wall_id:WallType=WallType.BingNvWall;

    /**城墙持续时间，针对除了主城墙之外的城墙 */
    remain_time:number=0;

    init(gjData:GongJiData,pos:cc.Vec2,remainTime:number,wallId:WallType=WallType.BingNvWall)
    {
        gjData.hero_data.Health=gjData.hero_data.total_hp*(gjData.hero_data.getSkillValue2(SkillType.Active));
        this.gongji_data=gjData;
        this.node.setPosition(cc.v2(0,pos.y));
        this.node.zIndex=(Math.round(8000-this.node.y*10));
        this.is_destroy=false;
        this.remain_time=remainTime;
        this.wall_id=wallId;
        this.node.getComponent(cc.Collider).enabled=false;
        if(this.checkJiTui(pos)){
            this.node.getComponent(cc.Collider).enabled=true;
            super.initWall(this.gongji_data.hero_data,WallType.BingNvWall);
            super.setWallDieListen(this.onWallDie.bind(this));
            super.setDamageListen(this.onDamage.bind(this));
            this.scheduleOnce(this.destroySelf,this.gongji_data.hero_data.getSkillValue1(SkillType.Active));
        }
    }

    /*检测能被击退的敌人*/
    checkJiTui(pos:cc.Vec2):boolean{        
        this.self_rect=cc.rect(-cc.winSize.width/2,pos.y-120/2,cc.winSize.width,120);
        super.setWallRect(this.self_rect);
        //击退专用范围
        let jituiRect=cc.rect(-cc.winSize.width/2,pos.y-200/2,cc.winSize.width,200);
        let bnWall=MonsterManager.getInstance().getMonstersForBingNvWallRect(jituiRect);
        //专武造成伤害
        let exDamage=0;
        let ex1=this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
        if(ex1&&ex1>0){
            exDamage=ex1;
        }
        // if(IsDebug){
        //     exDamage=100;
        // }
        if(bnWall.boss_ts){
            //销毁
            this.destroySelf();
            if(exDamage>0){
                let exData=cc.instantiate(this.gongji_data);
                exData.skill_damage_rate=exDamage;
                bnWall.boss_ts.beFlashInjured(exData);
            }
            return false            
        }else{
            //击退
            let allMonsters=bnWall.back_monsters;
            let jituiAct=0.15;
            for(let i=0; i<allMonsters.length; i++){
                let monsterTs=allMonsters[i].getComponent(Monster);
                cc.tween(monsterTs.node).to(jituiAct,{y:pos.y+120/2+Math.random()*70}).start();
                let buffData=new BuffData();
                buffData.buff_id=BuffId.Hero_XuanYun;
                buffData.buff_type=BuffType.Vertigo;
                buffData.buff_value=[0];
                buffData.remain_time=jituiAct+0.2;
                buffData.game_effect_id=GameEffectId.xuanyun;
                monsterTs.addDeBuff(buffData,this.gongji_data);
                if(exDamage>0){
                    let exData=cc.instantiate(this.gongji_data);
                    exData.skill_damage_rate=exDamage;
                    monsterTs.beFlashInjured(exData);
                }
            }
            this.node.getComponent(sp.Skeleton).setAnimation(0,'BingNv_Skill_Start',false);
            WallManager.getInstance().addWall(this.wall_id,this);
            return true;
        }        
    }
    /**城墙受到普通攻击时，反弹伤害 */
    onDamage(monsterTs:Monster){
        let fantanData=cc.instantiate(this.gongji_data);
        fantanData.skill_damage_rate=this.gongji_data.hero_data.getSkillValue3(SkillType.Active);
        monsterTs.beFlashInjured(this.gongji_data);
    }

    destroySelf(){
        //播放动画
        if(this.is_destroy){
            return;
        }
        this.node.getComponent(cc.Collider).enabled=false;
        this.is_destroy=true;
        let spine=this.node.getComponent(sp.Skeleton);
        spine.setAnimation(0,'BingNv_Skill_End',false);
        spine.setCompleteListener(()=>{
            spine.setCompleteListener(null);
            GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.bing_nv_active_skill_wall,this.node);
        });
        WallManager.getInstance().removeWall(this.wall_id);
        this.unschedule(this.destroySelf);
    }

    getRect():cc.Rect{
        return this.self_rect;
    }

    onWallDie(){
        this.destroySelf();
    }

    ////--------------------------------------碰撞开始----------------------------------------------------
    onCollisionEnter(other:cc.Collider,self:cc.Collider) {
        let gm=GameManager.getInstance();
        let group=other.node.group;
        switch(group){
            case 'boss_body':{
                //一碰就会碎
                this.destroySelf();
            }break;
        }
    }
}
