"use strict";
cc._RF.push(module, 'ccf78XkELVD7obtIaY1ewGc', 'PayManager');
// Scripts/Payment/PayManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayManager = void 0;
var HttpManager_1 = require(".././NetWork/HttpManager");
var ApkManager_1 = require("../Ads/ApkManager");
var Constants_1 = require("../Constants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var UserData_1 = require("../UserData");
var CrystalRecharge_1 = require("./Data/CrystalRecharge");
var CumulativeRecharge_1 = require("./Data/CumulativeRecharge");
var CyclePack_1 = require("./Data/CyclePack");
var PaidItem_1 = require("./Data/PaidItem");
var PrivilegedCardInformation_1 = require("./Data/PrivilegedCardInformation");
var DingYueManager_1 = require("./DingYueManager");
var PayManager = /** @class */ (function () {
    function PayManager() {
        this.pay_info = null;
    }
    PayManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PayManager();
            this._instance.init();
        }
        return this._instance;
    };
    PayManager.prototype.init = function () {
        var _this = this;
        DingYueManager_1.DingYueManager.getInstance();
        CrystalRecharge_1.CrystalRechargeManager.getInstance();
        CumulativeRecharge_1.CumulativeRechargeManager.getInstance();
        PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance();
        PaidItem_1.PaidItemManager.getInstance();
        this.pay_info = new Map();
        this.setLocalInfo();
        ApkManager_1.default.getInstance().getPayInfos({ info: function (payInfos) {
                var len = payInfos.length;
                for (var i = 0; i < len; i++) {
                    var payInfo = payInfos[i];
                    _this.setPayInfo(payInfo.pay_id, payInfo);
                }
            }, });
    };
    /**游戏启动先设置本地表的价格数据 */
    PayManager.prototype.setLocalInfo = function () {
        var _this = this;
        PaidItem_1.PaidItemManager.getInstance().loadJson(function () {
            //如果android返回了就不要管了
            if (_this.pay_info.size <= 0) {
                var dyInfos_1 = new Array();
                var data = PaidItem_1.PaidItemManager.getInstance().getData();
                data.forEach(function (v, k) {
                    var payInfo = new ThirdParty_1.PayInfo();
                    payInfo.price = v.Price + '';
                    payInfo.des = 'Prop';
                    payInfo.currency = "$";
                    payInfo.is_buy = Constants_1.IsDebug;
                    payInfo.pay_id = v.PaidItemId;
                    if (v.PurchaseType == 1) {
                        //订阅类型
                        payInfo.is_buy = _this.getPayNum(v.PaidItemId) > 0;
                        dyInfos_1.push(payInfo);
                    }
                    _this.setPayInfo(v.PaidItemId, payInfo);
                });
                DingYueManager_1.DingYueManager.getInstance().setCardInfo(dyInfos_1);
            }
            else {
                var dyInfos_2 = new Array();
                var data = PaidItem_1.PaidItemManager.getInstance().getData();
                data.forEach(function (v, k) {
                    if (v.PurchaseType == 1) {
                        //订阅类型
                        var payInfo = new ThirdParty_1.PayInfo();
                        payInfo.price = v.Price + '';
                        payInfo.des = 'Prop';
                        payInfo.currency = "$";
                        payInfo.is_buy = Constants_1.IsDebug;
                        payInfo.pay_id = v.PaidItemId;
                        payInfo.is_buy = _this.getPayNum(v.PaidItemId) > 0;
                        dyInfos_2.push(payInfo);
                    }
                });
                // if(!DingYueManager.getInstance().getMonthCardInfo()){
                //     DingYueManager.getInstance().setCardInfo(dyInfos);
                // }
            }
        });
        if (Constants_1.IsDebug) {
            var dyInfos = new Array();
            var payInfo = new ThirdParty_1.PayInfo();
            payInfo.price = '123456';
            payInfo.des = 'Prop';
            payInfo.currency = "$";
            payInfo.pay_id = "c502";
            payInfo.is_buy = this.getPayNum(payInfo.pay_id) > 0;
            dyInfos.push(payInfo);
            payInfo = new ThirdParty_1.PayInfo();
            payInfo.price = '654321';
            payInfo.des = 'Prop';
            payInfo.currency = "$";
            payInfo.pay_id = "c504";
            payInfo.is_buy = this.getPayNum(payInfo.pay_id) > 0;
            dyInfos.push(payInfo);
            if (!DingYueManager_1.DingYueManager.getInstance().getWeekInfo()) {
                DingYueManager_1.DingYueManager.getInstance().setCardInfo(dyInfos);
            }
        }
    };
    PayManager.prototype.setPayInfos = function (payInfos) {
        var len = payInfos.length;
        for (var i = 0; i < len; i++) {
            var payInfo = payInfos[i];
            this.setPayInfo(payInfo.pay_id, payInfo);
        }
    };
    PayManager.prototype.setPayInfo = function (type, payInfo) {
        this.pay_info.set(type, payInfo);
    };
    PayManager.prototype.getPayInfo = function (type) {
        return this.pay_info.get(type);
    };
    /**
     *
     * @param type 计费点类型
     * @returns 该计费的的购买次数
     */
    PayManager.prototype.getPayNum = function (type) {
        var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.PayNum + type, 0);
        return num;
    };
    /**是否首次充值 */
    PayManager.prototype.getIsFirstPay = function () {
        var _this = this;
        var isPay = false;
        var cDate = CrystalRecharge_1.CrystalRechargeManager.getInstance().getData();
        cDate.forEach(function (v, k) {
            if (!isPay && _this.getPayNum(v.ProductId) > 0) {
                isPay = true;
            }
        });
        var pDate = PrivilegedCardInformation_1.PrivilegedCardInformationManager.getInstance().getData();
        pDate.forEach(function (v, k) {
            if (!isPay && _this.getPayNum(v.ProductId) > 0) {
                isPay = true;
            }
        });
        var lData = CyclePack_1.CyclePackManager.getInstance().getData();
        lData.forEach(function (v, k) {
            if (!isPay && v.AdReward == 0 && _this.getPayNum(v.ProductId) > 0) {
                isPay = true;
            }
        });
        return isPay && !this.getIsGetFirstReward();
    };
    PayManager.prototype.getIsGetFirstReward = function () {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.FirstPayGetState, 0) > 0;
    };
    PayManager.prototype.setIsGetFirstReward = function (isGet) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.FirstPayGetState, isGet ? 1 : 0);
    };
    /**
     *
     * @param type 添加一次购买次数
     */
    PayManager.prototype.addPayNum = function (type) {
        this.savePayNum(type, this.getPayNum(type) + 1);
        var price = 1.99;
        this.HttpAddPayPrice(price);
    };
    /**
     *
     * @param type 计费点类型
     * @param num 次数
     */
    PayManager.prototype.savePayNum = function (type, num) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.PayNum + type, num);
    };
    PayManager.prototype.getSelectIds = function (type) {
        var idsList = StorageManager_1.TheStorageManager.getInstance().getJson(StorageConfig_1.StorageKey.PaySelectIds + type);
        return idsList;
    };
    PayManager.prototype.saveSelectIds = function (type, ids) {
        StorageManager_1.TheStorageManager.getInstance().setJson(StorageConfig_1.StorageKey.PaySelectIds + type, ids);
    };
    PayManager.prototype.getRewardById = function (payId) {
        //this.addPayNum(payId);
    };
    /**获得累计充值的龙晶数量 */
    PayManager.prototype.getTotalLongJingNum = function () {
        var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.TotalLongJingNum, 0);
        return num;
    };
    /**添加累计充值的龙晶数量 */
    PayManager.prototype.addTotalLongJingNum = function (num) {
        var total = num + this.getTotalLongJingNum();
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalLongJingNum, total);
        //根据累计充值总额设置领取状态
        var data = CumulativeRecharge_1.CumulativeRechargeManager.getInstance().getData();
        data.forEach(function (v, k) {
            var state = PayManager.getInstance().getTotalLongJingGetState(v.CumulativeRechargeID);
            if (state != 2 && total >= v.CumulativeRechargePrice) {
                PayManager.getInstance().setTotalLongJingGetState(v.CumulativeRechargeID, 1);
            }
        });
    };
    /**
     * 累计充值龙晶的领取状态，0：未完成，1：可以领取，2：已经领取
     * @param totalId 累计充值id
     */
    PayManager.prototype.getTotalLongJingGetState = function (totalId) {
        var num = StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.TotalLongJingGetState + totalId, 0);
        return num;
    };
    /**设置累计充值龙晶id的领取状态 0：未完成，1：可以领取，2：已经领取*/
    PayManager.prototype.setTotalLongJingGetState = function (totalId, state) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalLongJingGetState + totalId, state);
    };
    /**
     * 是否有可以领取的，红点专用
     * @param index 商城页的标签索引
     * @returns 返回是否可以领取
     */
    PayManager.prototype.getIsCanGet = function (index) {
        var _this = this;
        var isHaveGet = false;
        switch (index) {
            case ThirdParty_1.PayUiIndex.ZuXiang:
                {
                    //月卡
                    // if(DingYueManager.getInstance().getMonthCardInfo().is_buy){
                    //     isHaveGet=!DingYueManager.getInstance().getTodayIsGet(1001)
                    // }
                    // if(!isHaveGet){
                    //     //季卡
                    //     if(DingYueManager.getInstance().getQuarterCardInfo().is_buy){
                    //         isHaveGet=!DingYueManager.getInstance().getTodayIsGet(2001)
                    //     }                    
                    // }
                }
                break;
            case ThirdParty_1.PayUiIndex.LongJing:
            case ThirdParty_1.PayUiIndex.Total:
                {
                    //累计充值的
                    var CRM = CumulativeRecharge_1.CumulativeRechargeManager.getInstance();
                    var data = CRM.getData();
                    var isHaveNoGet_1 = false;
                    data.forEach(function (v, k) {
                        var state = _this.getTotalLongJingGetState(v.CumulativeRechargeID);
                        if (!isHaveNoGet_1 && state == 1) {
                            isHaveNoGet_1 = true;
                            isHaveGet = true;
                        }
                    });
                }
                break;
            case ThirdParty_1.PayUiIndex.Gift:
                {
                    //礼包的                
                    for (var i = 1; i <= 3; i++) {
                        var dataList = CyclePack_1.CyclePackManager.getInstance().getDataByType(i);
                        dataList.forEach(function (v, k) {
                            if (v.AdReward == 1) {
                                var isSoldOut = cc.sys.localStorage.getItem("pay_git_bag_item_" + v.GiftID) || 0;
                                isSoldOut = Number(isSoldOut);
                                if (isSoldOut < v.AdPlayableTimes && isHaveGet == false) {
                                    isHaveGet = true;
                                }
                            }
                        });
                    }
                }
                break;
        }
        return isHaveGet;
    };
    PayManager.prototype.getTodayShow = function (index) {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.PayUiShowNum + index, 0);
    };
    PayManager.prototype.addTodayShow = function (index) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.PayUiShowNum + index, 1 + this.getTodayShow(index));
    };
    PayManager.prototype.getFuncTodayShow = function (funcType) {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.FuncUiShowNum + funcType, 0);
    };
    PayManager.prototype.addFuncTodayShow = function (funcType) {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.FuncUiShowNum + funcType, 1 + this.getFuncTodayShow(funcType));
    };
    PayManager.prototype.resetAllTodayShow = function () {
        for (var i = 1; i <= 6; i++) {
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.PayUiShowNum + i, 0);
        }
    };
    PayManager.prototype.HttpAddPayPrice = function (price) {
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.updateUserInfo, this.getPayJsonString(price), false);
    };
    PayManager.prototype.getPayJsonString = function (price) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            type: 6,
            uid: uid,
            value: price,
        });
    };
    PayManager._instance = null;
    return PayManager;
}());
exports.PayManager = PayManager;

cc._RF.pop();