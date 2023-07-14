import { GameState } from "../../../Constants";
import { GameEffectId, GameEffectsManager } from "../../../Game/GameEffectsManager";
import GameManager from "../../../GameManager";
import Monster from "../../../Monster/Monster";
import { StrengthType } from "../../../Monster/MonsterData";
import MonsterManager from "../../../Monster/MonsterManager";
import { SoundIndex } from "../../../Sound/AudioConstants";
import MyTool from "../../../Tools/MyTool";
import { GongJiData } from "../../Data/HeroData";
import GongJi from "../GongJi";
import { BuffId } from "../HeroConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ShaChenBao extends GongJi {

    remain_time:number=0;
    damage_time:number=0;
    damage_jiange:number=1;
    fanwei:number=100;
    /**牵引速度 */
    qianyin_sudu:number=200;
    /**当前的旋转弧度度 */
    cur_rotation:number=0;
    /**旋转速度 */
    ratating_speed:number=Math.PI;
    /**漩涡最小距离 */
    min_distance:number=100;

    init(gjData:GongJiData,remainTime:number,damageJianGe:number,fanwei:number){
        super.initData(gjData);
        this.remain_time=remainTime;
        this.damage_jiange=damageJianGe;
        this.damage_time=0;
        this.fanwei=fanwei;
        this.node.scale=fanwei/110;
        GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_ANBSSkill);
    }

    destroySelf(){
        GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.a_nu_bi_si_active_skill_1,this.node);
    }

    update (dt:number) {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.remain_time>0){
                this.cur_rotation+=dt*this.ratating_speed;
                this.remain_time-=dt;
                let isDie=false;
                if(this.remain_time<0){
                    this.remain_time=0;
                    this.destroySelf();
                    isDie=true;
                }
                //牵引
                let allMonster=MonsterManager.getInstance().node.children;
                let len=allMonster.length;
                this.damage_time-=dt;
                let isCanDamage=false;
                if(this.damage_time<0){
                    this.damage_time=this.damage_jiange;
                    //造成伤害
                    isCanDamage=true;
                }
                if(len<=0)
                {
                    return null;
                }            
                for(let i=0;i<len; i++)
                {
                    let monster=allMonster[i];
                    let monsterTS=monster.getComponent(Monster);
                    if(monsterTS && monsterTS.getIsCanCheck())
                    {
                        let offsetPos=this.node.getPosition().sub(monsterTS.getCenterPos());
                        let distance=offsetPos.mag();
                        if(distance<=this.fanwei)
                        {
                            if(isCanDamage){
                                monsterTS.beFlashInjured(this.gongji_data);
                            }
                            if(monsterTS.getStrengthType()!=StrengthType.Boss){                                
                                let radian=Math.atan2(offsetPos.y,offsetPos.x);                                
                                //牵引，强制位移
                                let xx=Math.cos(radian)*this.qianyin_sudu*dt;
                                let yy=Math.sin(radian)*this.qianyin_sudu*dt;
                                let disX=monster.x+xx;
                                let disY=monster.y+yy;
                                //旋转
                                let offsetCenter=cc.v2(disX,disY).sub(this.node.getPosition());
                                let centerDistance=offsetCenter.mag();
                                let min=MyTool.randomRangeInt(50,120);
                                monsterTS.setQianYinMin(min);
                                if(centerDistance<monsterTS.getQianYinMin()){
                                    centerDistance=monsterTS.getQianYinMin();
                                }
                                //旋转,下一帧的相对弧度
                                let curR=Math.atan2(offsetCenter.y,offsetCenter.x);
                                curR=(curR+(Math.PI*2))%(Math.PI*2);
                                let nextDadian=curR+this.ratating_speed*dt;
                                nextDadian=(nextDadian+(Math.PI*2))%(Math.PI*2);
                                //根据半径和弧度求下一点坐标
                                disY=this.node.y+Math.sin(nextDadian)*centerDistance;
                                disX=this.node.x+Math.cos(nextDadian)*centerDistance;
                                monsterTS.setX(disX);
                                monsterTS.setY(disY);
                                if(monsterTS.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)==false){
                                    monsterTS.setMoveDir(radian+Math.PI);
                                    monsterTS.setFlip(disX>this.node.x);
                                }                                
                                if(isDie){
                                    monsterTS.setMoveDir(Math.PI*3/2);
                                }
                                // if(centerDistance>this.min_distance){
                                //     monsterTS.setX(disX);
                                //     monsterTS.setY(disY);
                                // }
                                

                            }
                        }else{
                            if(monsterTS.isHaveDeBuff(BuffId.Hero_MeiMo_Active_MeiHuo)==false){
                                monsterTS.setMoveDir(Math.PI*3/2);
                            }
                           
                        }
                    }
                }
                
            }
        }
    }
}
