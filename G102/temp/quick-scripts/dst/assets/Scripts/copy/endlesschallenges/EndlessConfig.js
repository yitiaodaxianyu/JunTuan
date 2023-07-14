
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/EndlessConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXEVuZGxlc3NDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZTtBQUNmLElBQVksZUF5Qlg7QUF6QkQsV0FBWSxlQUFlO0lBQ3ZCLHFEQUFNLENBQUE7SUFDTixhQUFhO0lBQ2IseURBQVEsQ0FBQTtJQUNSLFlBQVk7SUFDWixtRUFBYSxDQUFBO0lBQ2IsYUFBYTtJQUNiLDZEQUFVLENBQUE7SUFDVixjQUFjO0lBQ2QsaUVBQVksQ0FBQTtJQUNaLGFBQWE7SUFDYiwyREFBUyxDQUFBO0lBQ1QsYUFBYTtJQUNiLCtEQUFXLENBQUE7SUFDWCxlQUFlO0lBQ2YsK0RBQVcsQ0FBQTtJQUNYLCtCQUErQjtJQUMvQix1RUFBZSxDQUFBO0lBQ2YsY0FBYztJQUNkLHFFQUFjLENBQUE7SUFDZCxvQkFBb0I7SUFDcEIsd0VBQWdCLENBQUE7SUFDaEIsYUFBYTtJQUNiLGdFQUFZLENBQUE7QUFFaEIsQ0FBQyxFQXpCVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQXlCMUI7QUFHRDtJQUFBO1FBQ0ksZUFBZTtRQUNmLFNBQUksR0FBaUIsZUFBZSxDQUFDLElBQUksQ0FBQztRQUMxQyxlQUFlO1FBQ2YsT0FBRSxHQUFRLENBQUMsQ0FBQztRQUNaLGVBQWU7UUFDZixXQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLGdCQUFnQjtRQUNoQixVQUFLLEdBQVEsQ0FBQyxDQUFDO0lBRW5CLENBQUM7SUFBRCxrQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBVlksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKirml6DlsL1idWZm55qE57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIEVuZGxlc3NCdWZmVHlwZXtcclxuICAgIE51bGw9MCxcclxuICAgIC8qKjEu5pS75Ye75Yqb5o+Q5Y2HICovXHJcbiAgICBBdHRhY2s9MSxcclxuICAgIC8qKjIu5pS76YCf5o+Q5Y2HICovXHJcbiAgICBBdHRhY2tTcGVlZD0yLFxyXG4gICAgLyoqMy7mmrTlh7vnjofmj5DljYcgKi9cclxuICAgIENyaXRSYXRlPTMsXHJcbiAgICAvKio0LuaatOWHu+S8pOWus+aPkOWNhyAqL1xyXG4gICAgQ3JpdERhbWFnZT00LFxyXG4gICAgLyoqNS7pmLLlvqHlipvmj5DljYcgKi9cclxuICAgIERlZmVuc2U9NSxcclxuICAgIC8qKjYu55Sf5ZG95YC85o+Q5Y2HICovXHJcbiAgICBIZWFsdGhNYXg9NixcclxuICAgIC8qKjcu5q+P56eS5Zue5aSN55Sf5ZG95YC8ICovXHJcbiAgICBIZWFsdGhTZWM9NyxcclxuICAgIC8qKjgu56uL5Y2z5Zue5aSN55Sf5ZG95YC877yI5rOo77ya6K+lYnVmZueUn+aViOWQjueri+WNs+a2iOWkse+8iSAqL1xyXG4gICAgSGVhbHRoVGVhbUFkZD04LFxyXG4gICAgLyoqOS7ov57nu63mlLvlh7srMSAqL1xyXG4gICAgRG91YmxlQXR0YWNrPTksXHJcbiAgICAvKioxMC7kuLvliqjmioDog73nmb7liIbmr5TlhrfljbTnvKnlh48gKi9cclxuICAgIEFjdGl2ZVNraWxsQ2Q9MTAsXHJcbiAgICAvKioxMS7kvKTlrrPliqDmiJAgKi9cclxuICAgIEFkZERhbWFnZT0xMSxcclxuICAgICAgICAgICAgICAgIFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEVuZGxlc3NCdWZme1xyXG4gICAgLyoq5peg5bC9YnVmZueahOexu+WeiyAqL1xyXG4gICAgdHlwZTpFbmRsZXNzQnVmZlR5cGU9RW5kbGVzc0J1ZmZUeXBlLk51bGw7XHJcbiAgICAvKirml6DlsL1idWZm55qEaWQgKi9cclxuICAgIGlkOm51bWJlcj0wO1xyXG4gICAgLyoq5peg5bC9YnVmZueahOW8uuW6piAqL1xyXG4gICAgcmFyaXR5Om51bWJlcj0wO1xyXG4gICAgLyoq5peg5bC9YnVmZueahOWPguaVsOWAvCAqL1xyXG4gICAgdmFsdWU6bnVtYmVyPTA7XHJcblxyXG59Il19