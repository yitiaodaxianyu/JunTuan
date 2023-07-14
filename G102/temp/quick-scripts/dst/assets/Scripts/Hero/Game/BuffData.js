
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/BuffData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQnVmZkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZEO0FBQzdELDJDQUFnRDtBQUVoRDtJQUFBO1FBQ0ksVUFBVTtRQUNWLG1CQUFjLEdBQWMsaUNBQVksQ0FBQyxJQUFJLENBQUM7UUFDOUMsZUFBZTtRQUNmLFlBQU8sR0FBUSxtQkFBTSxDQUFDLElBQUksQ0FBQztRQUMzQixXQUFXO1FBQ1gsZ0JBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsZ0RBQWdEO1FBQ2hELGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIsc0JBQXNCO1FBQ3RCLGNBQVMsR0FBVSxxQkFBUSxDQUFDLE1BQU0sQ0FBQztRQUNuQyx3Q0FBd0M7UUFDeEMsdUJBQWtCLEdBQVMsQ0FBQyxDQUFDO1FBQzdCLHFDQUFxQztRQUNyQyx5QkFBb0IsR0FBUyxDQUFDLENBQUM7UUFDL0IscUJBQXFCO1FBQ3JCLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsZUFBZTtRQUNmLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsd0JBQXdCO1FBQ3hCLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsd0JBQXdCO1FBQ3hCLGNBQVMsR0FBUSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUFELGVBQUM7QUFBRCxDQXZCQSxBQXVCQyxJQUFBO0FBdkJZLDRCQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUgfSBmcm9tIFwiLi9IZXJvQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQnVmZkRhdGEge1xyXG4gICAgLyoq54m55pWIaWQgKi9cclxuICAgIGdhbWVfZWZmZWN0X2lkOkdhbWVFZmZlY3RJZD1HYW1lRWZmZWN0SWQuTnVsbDtcclxuICAgIC8qKkJ1ZmbnmoTllK/kuIBpZCAqL1xyXG4gICAgYnVmZl9pZDpCdWZmSWQ9QnVmZklkLk51bGw7XHJcbiAgICAvKirliankvZnnmoTml7bpl7QgKi9cclxuICAgIHJlbWFpbl90aW1lOm51bWJlcj0wO1xyXG4gICAgLyoqQnVmZuWAvOaVsOe7hO+8jOWNleaVsOWAvOWPljDvvIzmlLvpgJ/muqLlh7rpl67popjvvIzmiYDku6XmnIky5Liq5Lul5LiK55qE5pWw5YC85oOF5Ya15pe277yMMOS9jeW/hemhu+aYr+aUu+mAnyAqL1xyXG4gICAgYnVmZl92YWx1ZTpudW1iZXJbXT1bXTtcclxuICAgIC8qKkJ1ZmbnsbvlnovvvIzlj6/ku6XmirXmtojnmoTkvKTlrrPnsbvlnosgKi9cclxuICAgIGJ1ZmZfdHlwZTpCdWZmVHlwZT1CdWZmVHlwZS5Ob3JtYWw7XHJcbiAgICAvKirkvKTlrrPop6blj5Hpl7TpmpQs5aSn5LqOMOaXtuihqOekuuatpGJ1ZmbmnInkvKTlrrMs5Li6MOaXtu+8jGJ1ZmbmsqHmnInkvKTlrrMgKi9cclxuICAgIGRhbWFnZV9qaWFuZ2VfdGltZTogbnVtYmVyPTA7XHJcbiAgICAvKirkvKTlrrPmsrvnlpfnmoTpl7TpmpQs5aSn5LqOMOaXtuihqOekuuatpGJ1ZmbmnInmsrvnlpfmlYjmnpws5Li6MOaXtu+8jOayoeaciSAqL1xyXG4gICAgcmVjb3ZlcnlfamlhbmdlX3RpbWU6IG51bWJlcj0wO1xyXG4gICAgLyoq5q+P5qyh5Yi35pawYnVmZuaXtu+8jOa3u+WKoOeahOWxguaVsCAqL1xyXG4gICAgYWRkX2Zsb29yOm51bWJlcj0xO1xyXG4gICAgLyoqYnVmZuW9k+WJjeeahOWxguaVsCAqL1xyXG4gICAgY3VyX2Zsb29yOm51bWJlcj0xO1xyXG4gICAgLyoqYnVmZuacgOWkp+eahOWxguaVsCwg5Li6MOaXtu+8jOayoeacieS4iumZkCovXHJcbiAgICBtYXhfZmxvb3I6bnVtYmVyPTA7XHJcbiAgICAvKirnibnmlYjnmoTlh7rlnLrlkozpgIDlnLrmmK/lkKbmuJDpmpAs5aSn5LqOMOW8gOWQryAqL1xyXG4gICAgZmFkZV90aW1lOm51bWJlcj0wO1xyXG59XHJcbiJdfQ==