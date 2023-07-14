
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/thirdParty/ThirdParty.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6cc4fWY2PpK24bW0FWF5mCg', 'ThirdParty');
// Scripts/thirdParty/ThirdParty.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayUiIndex = exports.PayInfo = exports.PayId = exports.DingYue_Type = void 0;
var DingYue_Type;
(function (DingYue_Type) {
    DingYue_Type[DingYue_Type["Week"] = 0] = "Week";
    DingYue_Type[DingYue_Type["Month"] = 1] = "Month";
    DingYue_Type[DingYue_Type["Year"] = 2] = "Year";
})(DingYue_Type = exports.DingYue_Type || (exports.DingYue_Type = {}));
var PayId;
(function (PayId) {
    /**通关返利 */
    PayId[PayId["Campaign"] = 101] = "Campaign";
    /**用户等级升级返利 */
    PayId[PayId["Growth"] = 102] = "Growth";
    /**战令 */
    PayId[PayId["BattlePass"] = 103] = "BattlePass";
    /**100钻石 */
    PayId[PayId["Gem100"] = 201] = "Gem100";
    /**500钻石 */
    PayId[PayId["Gem500"] = 202] = "Gem500";
    /**1200钻石 */
    PayId[PayId["Gem1200"] = 203] = "Gem1200";
    /**6500钻石 */
    PayId[PayId["Gem6500"] = 205] = "Gem6500";
    /**14000钻石 */
    PayId[PayId["Gem14000"] = 206] = "Gem14000";
    /**超级角色宝箱单抽 */
    PayId[PayId["SuperRole1"] = 301] = "SuperRole1";
    /**超级角色宝箱10连抽 */
    PayId[PayId["SuperRole10"] = 302] = "SuperRole10";
    /**高级装备宝箱单抽 */
    PayId[PayId["MasterEquip1"] = 311] = "MasterEquip1";
    /**高级装备宝箱单抽 */
    PayId[PayId["MasterEquip10"] = 312] = "MasterEquip10";
    /**限购礼包——自选1-英雄自选 */
    PayId[PayId["LimitedGift1"] = 1001] = "LimitedGift1";
    /**限购礼包——自选2-装备自选 */
    PayId[PayId["LimitedGift2"] = 1002] = "LimitedGift2";
    /**限购礼包——热卖1 英雄捆绑包1*/
    PayId[PayId["HotGift1"] = 2001] = "HotGift1";
    /**限购礼包——热卖2 英雄捆绑包2*/
    PayId[PayId["HotGift2"] = 2002] = "HotGift2";
    /**限购礼包——热卖3 英雄捆绑包3*/
    PayId[PayId["HotGift3"] = 2003] = "HotGift3";
    /**限购礼包——热卖4 英雄捆绑包4*/
    PayId[PayId["HotGift4"] = 2004] = "HotGift4";
    /**限购礼包——热卖5 英雄捆绑包5*/
    PayId[PayId["HotGift5"] = 2005] = "HotGift5";
    /**限购礼包——热卖6 英雄捆绑包6*/
    PayId[PayId["HotGift6"] = 2006] = "HotGift6";
    /**限购礼包——热卖7 装备捆绑包*/
    PayId[PayId["HotGift7"] = 2007] = "HotGift7";
    /**限购礼包——日常1 基础货币-金币钻石*/
    PayId[PayId["DailyGift1"] = 3002] = "DailyGift1";
    /**限购礼包——日常2 基础资源-经验天赋钻石*/
    PayId[PayId["DailyGift2"] = 3003] = "DailyGift2";
    /**限购礼包——日常3 金币包*/
    PayId[PayId["DailyGift3"] = 3004] = "DailyGift3";
    /**限购礼包——日常4 经验包*/
    PayId[PayId["DailyGift4"] = 3005] = "DailyGift4";
    /**限购礼包——日常5 天赋点包*/
    PayId[PayId["DailyGift5"] = 3006] = "DailyGift5";
    /**限时礼包1*/
    PayId[PayId["TimeGift1"] = 4001] = "TimeGift1";
    /**限时礼包2*/
    PayId[PayId["TimeGift2"] = 4002] = "TimeGift2";
    /**限时礼包3*/
    PayId[PayId["TimeGift3"] = 4003] = "TimeGift3";
})(PayId = exports.PayId || (exports.PayId = {}));
var PayInfo = /** @class */ (function () {
    function PayInfo() {
        /**支付id */
        this.pay_id = 'b201';
        /**商品说明 */
        this.des = '60 Crystal';
        /**支付价格 */
        this.price = '1';
        /**支付币种 */
        this.currency = 'USD';
        /**是否购买过，但是没有消耗 */
        this.is_buy = false;
    }
    return PayInfo;
}());
exports.PayInfo = PayInfo;
var PayUiIndex;
(function (PayUiIndex) {
    PayUiIndex[PayUiIndex["ZuXiang"] = 1] = "ZuXiang";
    PayUiIndex[PayUiIndex["LongJing"] = 2] = "LongJing";
    PayUiIndex[PayUiIndex["Gift"] = 3] = "Gift";
    PayUiIndex[PayUiIndex["FanLi"] = 4] = "FanLi";
    PayUiIndex[PayUiIndex["Total"] = 5] = "Total";
    PayUiIndex[PayUiIndex["ZhanLing"] = 6] = "ZhanLing";
    PayUiIndex[PayUiIndex["WeekCard"] = 7] = "WeekCard";
    PayUiIndex[PayUiIndex["ShouChong"] = 26] = "ShouChong";
})(PayUiIndex = exports.PayUiIndex || (exports.PayUiIndex = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcdGhpcmRQYXJ0eVxcVGhpcmRQYXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXQSxJQUFZLFlBS1g7QUFMRCxXQUFZLFlBQVk7SUFFcEIsK0NBQU0sQ0FBQTtJQUNOLGlEQUFLLENBQUE7SUFDTCwrQ0FBSSxDQUFBO0FBQ1IsQ0FBQyxFQUxXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBS3ZCO0FBT0QsSUFBWSxLQTZEWDtBQTdERCxXQUFZLEtBQUs7SUFFYixVQUFVO0lBQ1YsMkNBQVksQ0FBQTtJQUNaLGNBQWM7SUFDZCx1Q0FBVSxDQUFBO0lBQ1YsUUFBUTtJQUNSLCtDQUFjLENBQUE7SUFDZCxXQUFXO0lBQ1gsdUNBQVUsQ0FBQTtJQUNWLFdBQVc7SUFDWCx1Q0FBVSxDQUFBO0lBQ1YsWUFBWTtJQUNaLHlDQUFXLENBQUE7SUFDWCxZQUFZO0lBQ1oseUNBQVcsQ0FBQTtJQUNYLGFBQWE7SUFDYiwyQ0FBWSxDQUFBO0lBQ1osY0FBYztJQUNkLCtDQUFjLENBQUE7SUFDZCxnQkFBZ0I7SUFDaEIsaURBQWUsQ0FBQTtJQUNmLGNBQWM7SUFDZCxtREFBZ0IsQ0FBQTtJQUNoQixjQUFjO0lBQ2QscURBQWlCLENBQUE7SUFDakIsb0JBQW9CO0lBQ3BCLG9EQUFpQixDQUFBO0lBQ2pCLG9CQUFvQjtJQUNwQixvREFBaUIsQ0FBQTtJQUNqQixxQkFBcUI7SUFDckIsNENBQWEsQ0FBQTtJQUNiLHFCQUFxQjtJQUNyQiw0Q0FBYSxDQUFBO0lBQ2IscUJBQXFCO0lBQ3JCLDRDQUFhLENBQUE7SUFDYixxQkFBcUI7SUFDckIsNENBQWEsQ0FBQTtJQUNiLHFCQUFxQjtJQUNyQiw0Q0FBYSxDQUFBO0lBQ2IscUJBQXFCO0lBQ3JCLDRDQUFhLENBQUE7SUFDYixvQkFBb0I7SUFDcEIsNENBQWEsQ0FBQTtJQUNiLHdCQUF3QjtJQUN4QixnREFBZSxDQUFBO0lBQ2YsMEJBQTBCO0lBQzFCLGdEQUFlLENBQUE7SUFDZixrQkFBa0I7SUFDbEIsZ0RBQWUsQ0FBQTtJQUNmLGtCQUFrQjtJQUNsQixnREFBZSxDQUFBO0lBQ2YsbUJBQW1CO0lBQ25CLGdEQUFlLENBQUE7SUFDZixVQUFVO0lBQ1YsOENBQWMsQ0FBQTtJQUNkLFVBQVU7SUFDViw4Q0FBYyxDQUFBO0lBQ2QsVUFBVTtJQUNWLDhDQUFjLENBQUE7QUFFbEIsQ0FBQyxFQTdEVyxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUE2RGhCO0FBRUQ7SUFBQTtRQUNJLFVBQVU7UUFDVixXQUFNLEdBQVEsTUFBTSxDQUFDO1FBQ3JCLFVBQVU7UUFDVixRQUFHLEdBQVEsWUFBWSxDQUFDO1FBQ3hCLFVBQVU7UUFDVixVQUFLLEdBQVEsR0FBRyxDQUFDO1FBQ2pCLFVBQVU7UUFDVixhQUFRLEdBQVEsS0FBSyxDQUFDO1FBQ3RCLGtCQUFrQjtRQUNsQixXQUFNLEdBQVMsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSwwQkFBTztBQWFwQixJQUFZLFVBVVg7QUFWRCxXQUFZLFVBQVU7SUFDbEIsaURBQVMsQ0FBQTtJQUNULG1EQUFRLENBQUE7SUFDUiwyQ0FBSSxDQUFBO0lBQ0osNkNBQUssQ0FBQTtJQUNMLDZDQUFLLENBQUE7SUFDTCxtREFBUSxDQUFBO0lBQ1IsbURBQVUsQ0FBQTtJQUNWLHNEQUFZLENBQUE7QUFFaEIsQ0FBQyxFQVZXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBVXJCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKioqKioqKioqKioqKioqKuW5v+WRiioqKioqKioqKioqKioqKiogKi9cclxuZXhwb3J0IGludGVyZmFjZSBSZXdhcmRBZHtcclxuICAgIHJlc3VsdChpc1N1Yzpib29sZWFuKTtcclxufVxyXG4vKioqKioqKioqKioqKioqKirorqLpmIUqKioqKioqKioqKioqKioqICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGluZ1l1ZXtcclxuICAgIHJlc3VsdD8oaXNEeTpib29sZWFuKTtcclxuICAgIGluZm8/KHBheUluZm86UGF5SW5mb1tdKTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGluZ1l1ZV9UeXBlXHJcbntcclxuICAgIFdlZWs9MCxcclxuICAgIE1vbnRoLFxyXG4gICAgWWVhcixcclxufVxyXG4vKioqKioqKioqKioqKioqKirmlK/ku5gqKioqKioqKioqKioqKioqICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGF5e1xyXG4gICAgcmVzdWx0Pyhpc0R5OmJvb2xlYW4pO1xyXG4gICAgaW5mbz8ocGF5SW5mbzpQYXlJbmZvW10pO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBQYXlJZFxyXG57XHJcbiAgICAvKirpgJrlhbPov5TliKkgKi9cclxuICAgIENhbXBhaWduPTEwMSwvL+mAmuWFs+i/lOWIqVxyXG4gICAgLyoq55So5oi3562J57qn5Y2H57qn6L+U5YipICovXHJcbiAgICBHcm93dGg9MTAyLFxyXG4gICAgLyoq5oiY5LukICovXHJcbiAgICBCYXR0bGVQYXNzPTEwMyxcclxuICAgIC8qKjEwMOmSu+efsyAqL1xyXG4gICAgR2VtMTAwPTIwMSxcclxuICAgIC8qKjUwMOmSu+efsyAqL1xyXG4gICAgR2VtNTAwPTIwMixcclxuICAgIC8qKjEyMDDpkrvnn7MgKi9cclxuICAgIEdlbTEyMDA9MjAzLFxyXG4gICAgLyoqNjUwMOmSu+efsyAqL1xyXG4gICAgR2VtNjUwMD0yMDUsXHJcbiAgICAvKioxNDAwMOmSu+efsyAqL1xyXG4gICAgR2VtMTQwMDA9MjA2LFxyXG4gICAgLyoq6LaF57qn6KeS6Imy5a6d566x5Y2V5oq9ICovXHJcbiAgICBTdXBlclJvbGUxPTMwMSxcclxuICAgIC8qKui2hee6p+inkuiJsuWuneeusTEw6L+e5oq9ICovXHJcbiAgICBTdXBlclJvbGUxMD0zMDIsXHJcbiAgICAvKirpq5jnuqfoo4XlpIflrp3nrrHljZXmir0gKi9cclxuICAgIE1hc3RlckVxdWlwMT0zMTEsXHJcbiAgICAvKirpq5jnuqfoo4XlpIflrp3nrrHljZXmir0gKi9cclxuICAgIE1hc3RlckVxdWlwMTA9MzEyLFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU6Ieq6YCJMS3oi7Hpm4Toh6rpgIkgKi9cclxuICAgIExpbWl0ZWRHaWZ0MT0xMDAxLFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU6Ieq6YCJMi3oo4XlpIfoh6rpgIkgKi9cclxuICAgIExpbWl0ZWRHaWZ0Mj0xMDAyLFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU54Ot5Y2WMSDoi7Hpm4TmjYbnu5HljIUxKi9cclxuICAgIEhvdEdpZnQxPTIwMDEsXHJcbiAgICAvKirpmZDotK3npLzljIXigJTigJTng63ljZYyIOiLsembhOaNhue7keWMhTIqL1xyXG4gICAgSG90R2lmdDI9MjAwMixcclxuICAgIC8qKumZkOi0reekvOWMheKAlOKAlOeDreWNljMg6Iux6ZuE5o2G57uR5YyFMyovXHJcbiAgICBIb3RHaWZ0Mz0yMDAzLFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU54Ot5Y2WNCDoi7Hpm4TmjYbnu5HljIU0Ki9cclxuICAgIEhvdEdpZnQ0PTIwMDQsXHJcbiAgICAvKirpmZDotK3npLzljIXigJTigJTng63ljZY1IOiLsembhOaNhue7keWMhTUqL1xyXG4gICAgSG90R2lmdDU9MjAwNSxcclxuICAgIC8qKumZkOi0reekvOWMheKAlOKAlOeDreWNljYg6Iux6ZuE5o2G57uR5YyFNiovXHJcbiAgICBIb3RHaWZ0Nj0yMDA2LFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU54Ot5Y2WNyDoo4XlpIfmjYbnu5HljIUqL1xyXG4gICAgSG90R2lmdDc9MjAwNyxcclxuICAgIC8qKumZkOi0reekvOWMheKAlOKAlOaXpeW4uDEg5Z+656GA6LSn5biBLemHkeW4gemSu+efsyovXHJcbiAgICBEYWlseUdpZnQxPTMwMDIsXHJcbiAgICAvKirpmZDotK3npLzljIXigJTigJTml6XluLgyIOWfuuehgOi1hOa6kC3nu4/pqozlpKnotYvpkrvnn7MqL1xyXG4gICAgRGFpbHlHaWZ0Mj0zMDAzLFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU5pel5bi4MyDph5HluIHljIUqL1xyXG4gICAgRGFpbHlHaWZ0Mz0zMDA0LFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU5pel5bi4NCDnu4/pqozljIUqL1xyXG4gICAgRGFpbHlHaWZ0ND0zMDA1LFxyXG4gICAgLyoq6ZmQ6LSt56S85YyF4oCU4oCU5pel5bi4NSDlpKnotYvngrnljIUqL1xyXG4gICAgRGFpbHlHaWZ0NT0zMDA2LFxyXG4gICAgLyoq6ZmQ5pe256S85YyFMSovXHJcbiAgICBUaW1lR2lmdDE9NDAwMSxcclxuICAgIC8qKumZkOaXtuekvOWMhTIqL1xyXG4gICAgVGltZUdpZnQyPTQwMDIsXHJcbiAgICAvKirpmZDml7bnpLzljIUzKi9cclxuICAgIFRpbWVHaWZ0Mz00MDAzLFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBheUluZm97XHJcbiAgICAvKirmlK/ku5hpZCAqL1xyXG4gICAgcGF5X2lkOnN0cmluZz0nYjIwMSc7XHJcbiAgICAvKirllYblk4Hor7TmmI4gKi9cclxuICAgIGRlczpzdHJpbmc9JzYwIENyeXN0YWwnO1xyXG4gICAgLyoq5pSv5LuY5Lu35qC8ICovXHJcbiAgICBwcmljZTpzdHJpbmc9JzEnO1xyXG4gICAgLyoq5pSv5LuY5biB56eNICovXHJcbiAgICBjdXJyZW5jeTpzdHJpbmc9J1VTRCc7XHJcbiAgICAvKirmmK/lkKbotK3kubDov4fvvIzkvYbmmK/msqHmnInmtojogJcgKi9cclxuICAgIGlzX2J1eTpib29sZWFuPWZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBQYXlVaUluZGV4e1xyXG4gICAgWnVYaWFuZz0xLFxyXG4gICAgTG9uZ0ppbmcsXHJcbiAgICBHaWZ0LFxyXG4gICAgRmFuTGksXHJcbiAgICBUb3RhbCxcclxuICAgIFpoYW5MaW5nLFxyXG4gICAgV2Vla0NhcmQ9NyxcclxuICAgIFNob3VDaG9uZz0yNixcclxuICAgIFxyXG59XHJcblxyXG4iXX0=