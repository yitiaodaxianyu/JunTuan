"use strict";
cc._RF.push(module, '88641TjMRtOLaJRc+eaOLzI', 'EndlessConfig');
// Scripts/copy/endlesschallenges/EndlessConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndlessBuff = exports.EndlessBuffType = void 0;
/**无尽buff的类型 */
var EndlessBuffType;
(function (EndlessBuffType) {
    EndlessBuffType[EndlessBuffType["Null"] = 0] = "Null";
    /**1.攻击力提升 */
    EndlessBuffType[EndlessBuffType["Attack"] = 1] = "Attack";
    /**2.攻速提升 */
    EndlessBuffType[EndlessBuffType["AttackSpeed"] = 2] = "AttackSpeed";
    /**3.暴击率提升 */
    EndlessBuffType[EndlessBuffType["CritRate"] = 3] = "CritRate";
    /**4.暴击伤害提升 */
    EndlessBuffType[EndlessBuffType["CritDamage"] = 4] = "CritDamage";
    /**5.防御力提升 */
    EndlessBuffType[EndlessBuffType["Defense"] = 5] = "Defense";
    /**6.生命值提升 */
    EndlessBuffType[EndlessBuffType["HealthMax"] = 6] = "HealthMax";
    /**7.每秒回复生命值 */
    EndlessBuffType[EndlessBuffType["HealthSec"] = 7] = "HealthSec";
    /**8.立即回复生命值（注：该buff生效后立即消失） */
    EndlessBuffType[EndlessBuffType["HealthTeamAdd"] = 8] = "HealthTeamAdd";
    /**9.连续攻击+1 */
    EndlessBuffType[EndlessBuffType["DoubleAttack"] = 9] = "DoubleAttack";
    /**10.主动技能百分比冷却缩减 */
    EndlessBuffType[EndlessBuffType["ActiveSkillCd"] = 10] = "ActiveSkillCd";
    /**11.伤害加成 */
    EndlessBuffType[EndlessBuffType["AddDamage"] = 11] = "AddDamage";
})(EndlessBuffType = exports.EndlessBuffType || (exports.EndlessBuffType = {}));
var EndlessBuff = /** @class */ (function () {
    function EndlessBuff() {
        /**无尽buff的类型 */
        this.type = EndlessBuffType.Null;
        /**无尽buff的id */
        this.id = 0;
        /**无尽buff的强度 */
        this.rarity = 0;
        /**无尽buff的参数值 */
        this.value = 0;
    }
    return EndlessBuff;
}());
exports.EndlessBuff = EndlessBuff;

cc._RF.pop();