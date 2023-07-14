"use strict";
cc._RF.push(module, '5ecfbGCjrxKoZWwMPuEbbHs', 'BuffData');
// Scripts/Hero/Game/BuffData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuffData = void 0;
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var HeroConfig_1 = require("./HeroConfig");
var BuffData = /** @class */ (function () {
    function BuffData() {
        /**特效id */
        this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        /**Buff的唯一id */
        this.buff_id = HeroConfig_1.BuffId.Null;
        /**剩余的时间 */
        this.remain_time = 0;
        /**Buff值数组，单数值取0，攻速溢出问题，所以有2个以上的数值情况时，0位必须是攻速 */
        this.buff_value = [];
        /**Buff类型，可以抵消的伤害类型 */
        this.buff_type = HeroConfig_1.BuffType.Normal;
        /**伤害触发间隔,大于0时表示此buff有伤害,为0时，buff没有伤害 */
        this.damage_jiange_time = 0;
        /**伤害治疗的间隔,大于0时表示此buff有治疗效果,为0时，没有 */
        this.recovery_jiange_time = 0;
        /**每次刷新buff时，添加的层数 */
        this.add_floor = 1;
        /**buff当前的层数 */
        this.cur_floor = 1;
        /**buff最大的层数, 为0时，没有上限*/
        this.max_floor = 0;
        /**特效的出场和退场是否渐隐,大于0开启 */
        this.fade_time = 0;
    }
    return BuffData;
}());
exports.BuffData = BuffData;

cc._RF.pop();