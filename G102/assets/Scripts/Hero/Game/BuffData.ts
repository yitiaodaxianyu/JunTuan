import { GameEffectId } from "../../Game/GameEffectsManager";
import { BuffId, BuffType } from "./HeroConfig";

export class BuffData {
    /**特效id */
    game_effect_id:GameEffectId=GameEffectId.Null;
    /**Buff的唯一id */
    buff_id:BuffId=BuffId.Null;
    /**剩余的时间 */
    remain_time:number=0;
    /**Buff值数组，单数值取0，攻速溢出问题，所以有2个以上的数值情况时，0位必须是攻速 */
    buff_value:number[]=[];
    /**Buff类型，可以抵消的伤害类型 */
    buff_type:BuffType=BuffType.Normal;
    /**伤害触发间隔,大于0时表示此buff有伤害,为0时，buff没有伤害 */
    damage_jiange_time: number=0;
    /**伤害治疗的间隔,大于0时表示此buff有治疗效果,为0时，没有 */
    recovery_jiange_time: number=0;
    /**每次刷新buff时，添加的层数 */
    add_floor:number=1;
    /**buff当前的层数 */
    cur_floor:number=1;
    /**buff最大的层数, 为0时，没有上限*/
    max_floor:number=0;
    /**特效的出场和退场是否渐隐,大于0开启 */
    fade_time:number=0;
}
