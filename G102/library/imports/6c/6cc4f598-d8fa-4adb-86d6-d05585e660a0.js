"use strict";
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