import { Enemy_DeBuff_Type } from "../../Enemy/EnemyConfig";
import { GameEffectId, GameEffectsManager } from "../../Game/GameEffectsManager";
import { GongJiData } from "../Data/HeroData";
import { Hero_Type } from "../Game/HeroConfig";
import { ContinuousSkill, DamageListen } from "./SkillConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Continuous extends cc.Component implements ContinuousSkill {

    @property({type:cc.Enum(GameEffectId)})
    game_effect_id:GameEffectId=GameEffectId.Null;

    remain_time: number;
    damage_num: number;
    jiange_time: number;
    hero_type:Hero_Type;
    damage_listen: DamageListen;
    jishu:number=0;
    other_value_1:number=0;
    other_value_2:number=0;
    buff_id:number=0;
    is_recycled:boolean=false;
    buff_floor_num:number=0;
    gong_ji_data:GongJiData=null;
    /**
     * 
     * @param totalTime 持续的总时长
     * @param damage 每次触发的真实伤害
     * @param dt 
     */
    init(data:ContinuousSkill,listen: DamageListen,gjData:GongJiData){
        this.remain_time=data.remain_time;
        this.damage_num=data.damage_num;
        this.jiange_time=data.jiange_time;
        this.hero_type=data.hero_type;
        this.other_value_1=data.other_value_1;
        this.other_value_2=data.other_value_2;
        this.buff_id=data.buff_id;
        this.gong_ji_data=gjData;
        this.is_recycled=false;
        this.addDamageListen(listen);
        this.buff_floor_num=1;
        
    }

    refreshData(data:ContinuousSkill){
        this.remain_time=data.remain_time;
        this.damage_num=data.damage_num;
        this.jiange_time=data.jiange_time;
        this.buff_floor_num++;
    }

    addDamageListen(listen: DamageListen) {
        this.damage_listen=listen;
    }

    doDamage(){
        if(this.damage_listen){
            let num=this.damage_num;
            if(this.buff_id==Enemy_DeBuff_Type.LiuXue_RenZhe_Active_Skill){
                num*=this.buff_floor_num;
            }
            this.damage_listen.doDamage(this.gong_ji_data);
        }
    }
    /**
     * 删除自身，回收至特效管理器
     * @param isSelf 是否自身调用，如果是，则需要触发回调。
     */
    destroySelf(isSelf:boolean){
        if(this.is_recycled==false){
            GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id,this.node);
            this.is_recycled=true;
        }
        // if(isSelf && this.damage_listen){
        //     this.damage_listen.end(this.is_recycled);
        // }
        this.damage_listen=null;
    }

    protected update(dt: number): void {
        this.remain_time-=dt;
        if(this.remain_time>0){
            this.jishu+=dt;
            if(this.jishu>=this.jiange_time){
                this.jishu=0;
                this.doDamage();
            }
        }else{
            this.destroySelf(true);
        }
    }
}
