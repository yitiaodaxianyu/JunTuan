import { MonsterAttData } from "../../Monster/MonsterData";
import { GongJiData } from "../Data/HeroData";
import { Hero_Type } from "../Game/HeroConfig";


/**持续伤害的技能接口 */
export interface ContinuousSkill{
    /**持续剩余时间 */
    remain_time:number;
    /**每次触发的伤害值 */
    damage_num:number;
    /**触发伤害的时间间隔 */
    jiange_time:number;
    /**伤害来源 */
    hero_type:Hero_Type;
    /**伤害来源 */
    pet_id?:number;
    /**其他数值 */
    other_value_1?:number;
    /**其他数值 */
    other_value_2?:number;
    /**buffid */
    buff_id?:number;
}

export interface DamageListen{
    /**
     * 
     * @param gjData 伤害来源数据
     */
    doDamage(gjData:GongJiData|MonsterAttData);

}

export interface RecoveryListen{
    /**
     * 
     * @param recoveryNum 治疗数值
     */
    doRecovery(recoveryNum:number);

}