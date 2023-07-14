import { GameState } from "../../Constants";
import GameManager from "../../GameManager";
import { GongJiData } from "../Data/HeroData";
import { BuffId, BuffType, DamageType } from "./HeroConfig";
import { DamageListen, RecoveryListen } from "../Skill/SkillConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import { BuffData } from "./BuffData";
import { MonsterAttData } from "../../Monster/MonsterData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BuffTimer extends cc.Component {
    /**buff数据 */    
    private buff_data:BuffData=null;
    /**时间结束的回调 */
    protected destroy_callback:Function[]=[];
    //----------------------------伤害buff的属性-------------------------------------
    /**时间到达触发时间时，触发伤害的回调 */
    private damage_listen:DamageListen=null;
    /**时间计数 */
    private damage_jishu_time: number=0;
    /**伤害来源的数据 */
    private gongji_data:GongJiData|MonsterAttData=null;
    //----------------------------治疗buff的属性-------------------------------------
    /**时间到达触发时间时，治疗的回调 */
    private recovery_listen:RecoveryListen=null;
    /**时间计数 */
    private recovery_jishu_time: number=0;
    /**治疗量 */
    private recovery_num:number=0;
    //-----------------------------Buff层数----------------------------
    /**buff爆发层数 */
    private burst_num:number=0;
    /**buff爆发回调 */
    private burst_callback:Function=null;
    /**buff添加层数回调 */
    private add_floor_callback:Function=null;
    /**额外的特效 */
    private texiao:cc.Node=null;
    private texiao_id:GameEffectId=GameEffectId.Null;
    /**
     * 初始化一个buff
     * @param game_effect_id 该buff的特效id
     * @param buffId buff的id
     * @param type buff的类型
     * @param remainTime buff的持续时间
     * @param value buff的强度值（如减速buff会根据这个值作为减速强度）
     */
    init(buffData:BuffData){
        this.buff_data=buffData;
        this.buff_data.cur_floor=buffData.add_floor;
        if(buffData.fade_time>0){
            this.node.opacity=0;
            cc.tween(this.node).to(buffData.fade_time,{opacity:255}).start();
        }
        this.initListen();
    }

    private initListen(){
        this.destroy_callback=new Array();
    }

    /**添加销毁监听 */
    addDestroyListen(callback:Function){
        this.destroy_callback.push(callback);
    }
    /**添加buff层数添加监听 */
    addFloorListen(callback:Function){
        this.add_floor_callback=callback;
    }
    /**添加buff爆发监听 */
    addBurstListen(num:number,callback:Function,gjData:GongJiData){
        this.burst_num=num;
        this.burst_callback=callback;
        this.gongji_data=gjData;
    }
   /**
    * 覆盖添加伤害触发的监听
    * @param damageListen 伤害监听器
    * @param gjData 攻击数据
    */
    addDamageListen(damageListen:DamageListen,gjData:GongJiData|MonsterAttData){
        this.damage_listen=damageListen;
        this.gongji_data=gjData;
        this.damage_jishu_time=this.buff_data.damage_jiange_time;
    }

    /**
    * 覆盖添加一个治疗监听事件
    * @param recoveryListen 治疗监听器
    * @param gjData 
    */
    addRecoveryListen(recoveryListen:RecoveryListen,num:number){
        this.recovery_listen=recoveryListen;
        this.recovery_num=num;
        this.recovery_jishu_time=this.buff_data.recovery_jiange_time;
    }

    /**获得剩余的时间 */
    getRemainTime():number{
        return this.buff_data.remain_time;
    }
    /**返回Buff类型 */
    getBuffType():BuffType{
        return this.buff_data.buff_type;
    }
    /**返回BuffId */
    getBuffId():BuffId{
        return this.buff_data.buff_id;
    }
    /**返回Buff数值 */
    getBuffValue():number[]{        
        return this.buff_data.buff_value;
    }
    /**返回Buff数值 */
    getFirstBuffValue():number{        
        return this.buff_data.buff_value[0];
    }
    /**返回buff的特效id */
    getGameEffectId():GameEffectId{
        return this.buff_data.game_effect_id;
    }
    /**返回buff叠加的层数 */
    getFloorNum():number{
        return this.buff_data.cur_floor;
    }

    /**添加额外的特效 */
    addTeXiao(gameEffectId:GameEffectId,pos:cc.Vec2,parent:cc.Node){
        this.texiao=GameEffectsManager.getInstance().createGameEffectForParent(gameEffectId,pos,parent);
        this.texiao_id=gameEffectId;
    }
    // /**设置渐隐渐显时间 */
    // setFadeTime(dt:number){
    //     this.buff_data.fade_time=dt;
    // }

    /**刷新buff时间 */
    refreshBuff(newBuff:BuffData){
        if(newBuff.remain_time>this.buff_data.remain_time)
        {
            this.buff_data.remain_time=newBuff.remain_time;
        }
        this.addFloor(newBuff.add_floor);
    }

    addFloor(num:number=1){
        let newFloor=this.buff_data.cur_floor+num;
        if(this.buff_data.max_floor>0 &&newFloor>this.buff_data.max_floor){
            newFloor=this.buff_data.max_floor;
        }
        this.buff_data.cur_floor=newFloor;
        if(this.burst_num>0){            
            if(this.buff_data.cur_floor>=this.burst_num){
                this.buff_data.cur_floor=0;
                if(this.burst_callback){
                    this.burst_callback(this.buff_data,this.gongji_data);
                }
            }
        }
        if(this.add_floor_callback){
            this.add_floor_callback(this.buff_data.cur_floor);
        }
    }

    destroySelf(){
        GameEffectsManager.getInstance().destroyGameEffectById(this.buff_data.game_effect_id,this.node);
        if(this.destroy_callback.length>0){
            for(let i=0; i<this.destroy_callback.length; i++){
                this.destroy_callback[i](this.buff_data);
            }
            
        }
        if(this.texiao){
            GameEffectsManager.getInstance().destroyGameEffectById(this.texiao_id,this.texiao);
        }
    }

    doDamage(){
        if(this.damage_listen){
            //let num=this.damage_listen;
            // if(this.buff_id==Enemy_DeBuff_Type.LiuXue_RenZhe_Active_Skill){
            //     num*=this.buff_floor_num;
            // }
            this.damage_listen.doDamage(this.gongji_data);
        }
    }

    doRecovery(){
        if(this.recovery_listen){
            this.recovery_listen.doRecovery(this.recovery_num);
        }
    }

    protected update(dt: number): void {
        if(GameManager.getInstance().cur_game_state==GameState.Game_Playing){
            if(this.buff_data.remain_time>0){
                this.buff_data.remain_time-=dt;
                if(this.buff_data.remain_time<0){
                    this.buff_data.remain_time=0;
                    this.destroySelf();
                }
                if(this.buff_data.fade_time>0){
                    if(this.buff_data.remain_time<this.buff_data.fade_time){
                        this.node.opacity-=dt*2*this.buff_data.fade_time;
                    }
                }
                if(this.damage_listen){
                    this.damage_jishu_time+=dt;
                    if(this.damage_jishu_time>=this.buff_data.damage_jiange_time){
                        this.damage_jishu_time=0;
                        this.doDamage();
                    }
                }
                if(this.recovery_listen){
                    this.recovery_jishu_time+=dt;
                    if(this.recovery_jishu_time>=this.buff_data.recovery_jiange_time){
                        this.recovery_jishu_time=0;
                        this.doRecovery();
                    }
                }
            }
        }
    }
}
