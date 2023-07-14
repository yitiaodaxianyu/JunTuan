
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/PayManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUGF5TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUU7QUFDbkUsZ0RBQTJDO0FBQzNDLDBDQUF1QztBQUN2QywwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELHVEQUFzRTtBQUN0RSx3Q0FBbUM7QUFDbkMsMERBQWdFO0FBQ2hFLGdFQUFzRTtBQUN0RSw4Q0FBb0Q7QUFDcEQsNENBQWtEO0FBQ2xELDhFQUFvRjtBQUNwRixtREFBa0Q7QUFFbEQ7SUFBQTtRQUdZLGFBQVEsR0FBcUIsSUFBSSxDQUFDO0lBbVQ5QyxDQUFDO0lBalRpQixzQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVPLHlCQUFJLEdBQVo7UUFBQSxpQkFlQztRQWRHLCtCQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0Isd0NBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsOENBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsNERBQWdDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLElBQUksRUFBQyxVQUFDLFFBQWtCO2dCQUMxRCxJQUFJLEdBQUcsR0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUN4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QUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRU0sc0NBQWlCLEdBQXhCO1FBQ0ksS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNuQixrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO0lBRUwsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBZ0IsS0FBWTtRQUN4Qix5QkFBVyxDQUFDLElBQUksQ0FBQyx3QkFBVSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFDbEYsQ0FBQztJQUVPLHFDQUFnQixHQUF4QixVQUF5QixLQUFZO1FBQ2pDLElBQUksR0FBRyxHQUFDLGtCQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2xCLElBQUksRUFBQyxDQUFDO1lBQ04sR0FBRyxFQUFDLEdBQUc7WUFDUCxLQUFLLEVBQUMsS0FBSztTQUNkLENBQUMsQ0FBQztJQUNQLENBQUM7SUFuVGMsb0JBQVMsR0FBWSxJQUFJLENBQUM7SUFvVDdDLGlCQUFDO0NBdFRELEFBc1RDLElBQUE7QUF0VFksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2Nlc3NOYW1lLCBIdHRwTWFuYWdlciB9IGZyb20gXCIuLi8uL05ldFdvcmsvSHR0cE1hbmFnZXJcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IElzRGVidWcgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGF5SW5mbywgUGF5SWQsIFBheVVpSW5kZXggfSBmcm9tIFwiLi4vdGhpcmRQYXJ0eS9UaGlyZFBhcnR5XCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgQ3J5c3RhbFJlY2hhcmdlTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvQ3J5c3RhbFJlY2hhcmdlXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL0N1bXVsYXRpdmVSZWNoYXJnZVwiO1xyXG5pbXBvcnQgeyBDeWNsZVBhY2tNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9DeWNsZVBhY2tcIjtcclxuaW1wb3J0IHsgUGFpZEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9QYWlkSXRlbVwiO1xyXG5pbXBvcnQgeyBQcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvUHJpdmlsZWdlZENhcmRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgeyBEaW5nWXVlTWFuYWdlciB9IGZyb20gXCIuL0RpbmdZdWVNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUGF5TWFuYWdlcntcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6UGF5TWFuYWdlcj1udWxsO1xyXG4gICAgcHJpdmF0ZSBwYXlfaW5mbzpNYXA8c3RyaW5nLFBheUluZm8+PW51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlBheU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBQYXlNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdCgpe1xyXG4gICAgICAgIERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQ3J5c3RhbFJlY2hhcmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBQcml2aWxlZ2VkQ2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFBhaWRJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMucGF5X2luZm89bmV3IE1hcDxzdHJpbmcsUGF5SW5mbz4oKTtcclxuICAgICAgICB0aGlzLnNldExvY2FsSW5mbygpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlJbmZvcyh7aW5mbzoocGF5SW5mb3M6UGF5SW5mb1tdKT0+e1xyXG4gICAgICAgICAgICBsZXQgbGVuPXBheUluZm9zLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBheUluZm89cGF5SW5mb3NbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBheUluZm8ocGF5SW5mby5wYXlfaWQscGF5SW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgLyoq5ri45oiP5ZCv5Yqo5YWI6K6+572u5pys5Zyw6KGo55qE5Lu35qC85pWw5o2uICovXHJcbiAgICBzZXRMb2NhbEluZm8oKXtcclxuICAgICAgICBQYWlkSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkSnNvbigoKT0+e1xyXG4gICAgICAgICAgICAvL+WmguaenGFuZHJvaWTov5Tlm57kuoblsLHkuI3opoHnrqHkuoZcclxuICAgICAgICAgICAgaWYodGhpcy5wYXlfaW5mby5zaXplPD0wKXtcclxuICAgICAgICAgICAgICAgIGxldCBkeUluZm9zPW5ldyBBcnJheTxQYXlJbmZvPigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9UGFpZEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXlJbmZvPW5ldyBQYXlJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5SW5mby5wcmljZT12LlByaWNlKycnO1xyXG4gICAgICAgICAgICAgICAgICAgIHBheUluZm8uZGVzPSdQcm9wJztcclxuICAgICAgICAgICAgICAgICAgICBwYXlJbmZvLmN1cnJlbmN5PVwiJFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHBheUluZm8uaXNfYnV5PUlzRGVidWc7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5SW5mby5wYXlfaWQ9di5QYWlkSXRlbUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHYuUHVyY2hhc2VUeXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/orqLpmIXnsbvlnotcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5SW5mby5pc19idXk9dGhpcy5nZXRQYXlOdW0odi5QYWlkSXRlbUlkKT4wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkeUluZm9zLnB1c2gocGF5SW5mbyk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGF5SW5mbyh2LlBhaWRJdGVtSWQscGF5SW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0Q2FyZEluZm8oZHlJbmZvcyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGR5SW5mb3M9bmV3IEFycmF5PFBheUluZm8+KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YT1QYWlkSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKCh2LGspPT57ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZih2LlB1cmNoYXNlVHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6K6i6ZiF57G75Z6LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXlJbmZvPW5ldyBQYXlJbmZvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheUluZm8ucHJpY2U9di5QcmljZSsnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5SW5mby5kZXM9J1Byb3AnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlJbmZvLmN1cnJlbmN5PVwiJFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlJbmZvLmlzX2J1eT1Jc0RlYnVnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlJbmZvLnBheV9pZD12LlBhaWRJdGVtSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheUluZm8uaXNfYnV5PXRoaXMuZ2V0UGF5TnVtKHYuUGFpZEl0ZW1JZCk+MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHlJbmZvcy5wdXNoKHBheUluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYoIURpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9udGhDYXJkSW5mbygpKXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldENhcmRJbmZvKGR5SW5mb3MpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICAgIGlmKElzRGVidWcpe1xyXG4gICAgICAgICAgICBsZXQgZHlJbmZvcz1uZXcgQXJyYXk8UGF5SW5mbz4oKTtcclxuICAgICAgICAgICAgbGV0IHBheUluZm89bmV3IFBheUluZm8oKTtcclxuICAgICAgICAgICAgcGF5SW5mby5wcmljZT0nMTIzNDU2JztcclxuICAgICAgICAgICAgcGF5SW5mby5kZXM9J1Byb3AnO1xyXG4gICAgICAgICAgICBwYXlJbmZvLmN1cnJlbmN5PVwiJFwiO1xyXG4gICAgICAgICAgICBwYXlJbmZvLnBheV9pZD1cImM1MDJcIjtcclxuICAgICAgICAgICAgcGF5SW5mby5pc19idXk9dGhpcy5nZXRQYXlOdW0ocGF5SW5mby5wYXlfaWQpPjA7XHJcbiAgICAgICAgICAgIGR5SW5mb3MucHVzaChwYXlJbmZvKTtcclxuICAgICAgICAgICAgcGF5SW5mbz1uZXcgUGF5SW5mbygpO1xyXG4gICAgICAgICAgICBwYXlJbmZvLnByaWNlPSc2NTQzMjEnO1xyXG4gICAgICAgICAgICBwYXlJbmZvLmRlcz0nUHJvcCc7XHJcbiAgICAgICAgICAgIHBheUluZm8uY3VycmVuY3k9XCIkXCI7XHJcbiAgICAgICAgICAgIHBheUluZm8ucGF5X2lkPVwiYzUwNFwiO1xyXG4gICAgICAgICAgICBwYXlJbmZvLmlzX2J1eT10aGlzLmdldFBheU51bShwYXlJbmZvLnBheV9pZCk+MDtcclxuICAgICAgICAgICAgZHlJbmZvcy5wdXNoKHBheUluZm8pO1xyXG4gICAgICAgICAgICBpZighRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWVrSW5mbygpKXtcclxuICAgICAgICAgICAgICAgIERpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0Q2FyZEluZm8oZHlJbmZvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGF5SW5mb3MocGF5SW5mb3M6UGF5SW5mb1tdKXtcclxuICAgICAgICBsZXQgbGVuPXBheUluZm9zLmxlbmd0aDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBwYXlJbmZvPXBheUluZm9zW2ldO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBheUluZm8ocGF5SW5mby5wYXlfaWQscGF5SW5mbyk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGF5SW5mbyh0eXBlOnN0cmluZyxwYXlJbmZvOlBheUluZm8pe1xyXG4gICAgICAgIHRoaXMucGF5X2luZm8uc2V0KHR5cGUscGF5SW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBheUluZm8odHlwZTpzdHJpbmcpOlBheUluZm97XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF5X2luZm8uZ2V0KHR5cGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIOiuoei0ueeCueexu+Wei1xyXG4gICAgICogQHJldHVybnMg6K+l6K6h6LS555qE55qE6LSt5Lmw5qyh5pWwXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgZ2V0UGF5TnVtKHR5cGU6c3RyaW5nKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LlBheU51bSt0eXBlLDApOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKuaYr+WQpummluasoeWFheWAvCAqL1xyXG4gICAgcHVibGljIGdldElzRmlyc3RQYXkoKTpib29sZWFueyAgICAgICAgXHJcbiAgICAgICAgbGV0IGlzUGF5PWZhbHNlO1xyXG4gICAgICAgIGxldCBjRGF0ZT1DcnlzdGFsUmVjaGFyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGNEYXRlLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYoIWlzUGF5JiZ0aGlzLmdldFBheU51bSh2LlByb2R1Y3RJZCk+MCl7XHJcbiAgICAgICAgICAgICAgICBpc1BheT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHBEYXRlPVByaXZpbGVnZWRDYXJkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YSgpO1xyXG4gICAgICAgIHBEYXRlLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYoIWlzUGF5JiZ0aGlzLmdldFBheU51bSh2LlByb2R1Y3RJZCk+MCl7XHJcbiAgICAgICAgICAgICAgICBpc1BheT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGxEYXRhPUN5Y2xlUGFja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbERhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZighaXNQYXkmJnYuQWRSZXdhcmQ9PTAmJnRoaXMuZ2V0UGF5TnVtKHYuUHJvZHVjdElkKT4wKXtcclxuICAgICAgICAgICAgICAgIGlzUGF5PXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaXNQYXkmJiF0aGlzLmdldElzR2V0Rmlyc3RSZXdhcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXNHZXRGaXJzdFJld2FyZCgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuRmlyc3RQYXlHZXRTdGF0ZSwwKT4wOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SXNHZXRGaXJzdFJld2FyZChpc0dldDpib29sZWFuKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5GaXJzdFBheUdldFN0YXRlLGlzR2V0PzE6MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIOa3u+WKoOS4gOasoei0reS5sOasoeaVsFxyXG4gICAgICovXHJcbiAgICAgcHVibGljIGFkZFBheU51bSh0eXBlOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5zYXZlUGF5TnVtKHR5cGUsdGhpcy5nZXRQYXlOdW0odHlwZSkrMSk7XHJcbiAgICAgICAgbGV0IHByaWNlPTEuOTk7XHJcbiAgICAgICAgdGhpcy5IdHRwQWRkUGF5UHJpY2UocHJpY2UpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIOiuoei0ueeCueexu+Wei1xyXG4gICAgICogQHBhcmFtIG51bSDmrKHmlbBcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBzYXZlUGF5TnVtKHR5cGU6c3RyaW5nLG51bTpudW1iZXIpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlBheU51bSt0eXBlLG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNlbGVjdElkcyh0eXBlOnN0cmluZyk6bnVtYmVyW117XHJcbiAgICAgICAgbGV0IGlkc0xpc3Q9VGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uKFN0b3JhZ2VLZXkuUGF5U2VsZWN0SWRzK3R5cGUpOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGlkc0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhdmVTZWxlY3RJZHModHlwZTpzdHJpbmcsaWRzOm51bWJlcltdKVxyXG4gICAge1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SnNvbihTdG9yYWdlS2V5LlBheVNlbGVjdElkcyt0eXBlLGlkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJld2FyZEJ5SWQocGF5SWQ6bnVtYmVyKXtcclxuICAgICAgICAvL3RoaXMuYWRkUGF5TnVtKHBheUlkKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+e0r+iuoeWFheWAvOeahOm+meaZtuaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldFRvdGFsTG9uZ0ppbmdOdW0oKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IG51bT1UaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LlRvdGFsTG9uZ0ppbmdOdW0sMCk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5re75Yqg57Sv6K6h5YWF5YC855qE6b6Z5pm25pWw6YePICovXHJcbiAgICBwdWJsaWMgYWRkVG90YWxMb25nSmluZ051bShudW06bnVtYmVyKXtcclxuICAgICAgICBsZXQgdG90YWw9bnVtK3RoaXMuZ2V0VG90YWxMb25nSmluZ051bSgpXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuVG90YWxMb25nSmluZ051bSx0b3RhbCk7XHJcbiAgICAgICAgLy/moLnmja7ntK/orqHlhYXlgLzmgLvpop3orr7nva7pooblj5bnirbmgIFcclxuICAgICAgICBsZXQgZGF0YT1DdW11bGF0aXZlUmVjaGFyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGF0YSgpO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBsZXQgc3RhdGU9UGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSh2LkN1bXVsYXRpdmVSZWNoYXJnZUlEKTtcclxuICAgICAgICAgICAgaWYoc3RhdGUhPTIgJiYgdG90YWw+PXYuQ3VtdWxhdGl2ZVJlY2hhcmdlUHJpY2Upe1xyXG4gICAgICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSh2LkN1bXVsYXRpdmVSZWNoYXJnZUlELDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDntK/orqHlhYXlgLzpvpnmmbbnmoTpooblj5bnirbmgIHvvIww77ya5pyq5a6M5oiQ77yMMe+8muWPr+S7pemihuWPlu+8jDLvvJrlt7Lnu4/pooblj5ZcclxuICAgICAqIEBwYXJhbSB0b3RhbElkIOe0r+iuoeWFheWAvGlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUb3RhbExvbmdKaW5nR2V0U3RhdGUodG90YWxJZDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPVRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuVG90YWxMb25nSmluZ0dldFN0YXRlK3RvdGFsSWQsMCk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7ntK/orqHlhYXlgLzpvpnmmbZpZOeahOmihuWPlueKtuaAgSAw77ya5pyq5a6M5oiQ77yMMe+8muWPr+S7pemihuWPlu+8jDLvvJrlt7Lnu4/pooblj5YqL1xyXG4gICAgcHVibGljIHNldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSh0b3RhbElkOm51bWJlcixzdGF0ZTpudW1iZXIpe1xyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSt0b3RhbElkLHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuacieWPr+S7pemihuWPlueahO+8jOe6oueCueS4k+eUqFxyXG4gICAgICogQHBhcmFtIGluZGV4IOWVhuWfjumhteeahOagh+etvue0ouW8lVxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5piv5ZCm5Y+v5Lul6aKG5Y+WXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0NhbkdldChpbmRleDpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGlzSGF2ZUdldD1mYWxzZTtcclxuICAgICAgICBzd2l0Y2goaW5kZXgpe1xyXG4gICAgICAgICAgICBjYXNlIFBheVVpSW5kZXguWnVYaWFuZzp7XHJcbiAgICAgICAgICAgICAgICAvL+aciOWNoVxyXG4gICAgICAgICAgICAgICAgLy8gaWYoRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb250aENhcmRJbmZvKCkuaXNfYnV5KXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpc0hhdmVHZXQ9IURpbmdZdWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VG9kYXlJc0dldCgxMDAxKVxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYoIWlzSGF2ZUdldCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgLy/lraPljaFcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZihEaW5nWXVlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YXJ0ZXJDYXJkSW5mbygpLmlzX2J1eSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGlzSGF2ZUdldD0hRGluZ1l1ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUb2RheUlzR2V0KDIwMDEpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBQYXlVaUluZGV4LkxvbmdKaW5nOlxyXG4gICAgICAgICAgICBjYXNlIFBheVVpSW5kZXguVG90YWw6e1xyXG4gICAgICAgICAgICAgICAgLy/ntK/orqHlhYXlgLznmoRcclxuICAgICAgICAgICAgICAgIGxldCBDUk09Q3VtdWxhdGl2ZVJlY2hhcmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9Q1JNLmdldERhdGEoKTtcclxuICAgICAgICAgICAgICAgIGxldCBpc0hhdmVOb0dldD1mYWxzZTtcclxuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ZT10aGlzLmdldFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZSh2LkN1bXVsYXRpdmVSZWNoYXJnZUlEKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighaXNIYXZlTm9HZXQmJnN0YXRlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlTm9HZXQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNIYXZlR2V0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUGF5VWlJbmRleC5HaWZ0OntcclxuICAgICAgICAgICAgICAgIC8v56S85YyF55qEICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTE7IGk8PTM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGFMaXN0ID0gQ3ljbGVQYWNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFCeVR5cGUoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUxpc3QuZm9yRWFjaCgodixrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHYuQWRSZXdhcmQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNTb2xkT3V0ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicGF5X2dpdF9iYWdfaXRlbV9cIiArIHYuR2lmdElEKSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTb2xkT3V0ID0gTnVtYmVyKGlzU29sZE91dCkgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1NvbGRPdXQgPCB2LkFkUGxheWFibGVUaW1lcyAmJiBpc0hhdmVHZXQ9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhdmVHZXQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gaXNIYXZlR2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUb2RheVNob3coaW5kZXg6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW50KFN0b3JhZ2VLZXkuUGF5VWlTaG93TnVtK2luZGV4LDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRUb2RheVNob3coaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5QYXlVaVNob3dOdW0raW5kZXgsMSt0aGlzLmdldFRvZGF5U2hvdyhpbmRleCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRGdW5jVG9kYXlTaG93KGZ1bmNUeXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEludChTdG9yYWdlS2V5LkZ1bmNVaVNob3dOdW0rZnVuY1R5cGUsMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEZ1bmNUb2RheVNob3coZnVuY1R5cGU6bnVtYmVyKXtcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5GdW5jVWlTaG93TnVtK2Z1bmNUeXBlLDErdGhpcy5nZXRGdW5jVG9kYXlTaG93KGZ1bmNUeXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0QWxsVG9kYXlTaG93KCl7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PTY7IGkrKyl7XHJcbiAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LlBheVVpU2hvd051bStpLDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBIdHRwQWRkUGF5UHJpY2UocHJpY2U6bnVtYmVyKXtcclxuICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudXBkYXRlVXNlckluZm8sdGhpcy5nZXRQYXlKc29uU3RyaW5nKHByaWNlKSxmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFBheUpzb25TdHJpbmcocHJpY2U6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHR5cGU6NixcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgdmFsdWU6cHJpY2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19