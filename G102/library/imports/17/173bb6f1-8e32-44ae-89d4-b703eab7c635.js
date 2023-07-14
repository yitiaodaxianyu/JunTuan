"use strict";
cc._RF.push(module, '173bbbxjjJEronUtwPqt8Y1', 'DingYueManager');
// Scripts/Payment/DingYueManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DingYueManager = void 0;
var Constants_1 = require("../Constants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var PayManager_1 = require("./PayManager");
var DingYueManager = /** @class */ (function () {
    function DingYueManager() {
        this.week_info = null;
        this.month_info = null;
        this.quarter_info = null;
    }
    DingYueManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DingYueManager();
            this._instance.init();
        }
        return this._instance;
    };
    DingYueManager.prototype.init = function () {
        this.initCardInfo();
    };
    DingYueManager.prototype.initCardInfo = function () {
        //ApkManager.getInstance().getDingYueInfo()
    };
    DingYueManager.prototype.setCardInfo = function (payInfos) {
        for (var i = 0; i < payInfos.length; i++) {
            var payInfo = payInfos[i];
            switch (payInfo.pay_id) {
                case 'b101':
                    {
                        this.month_info = payInfo;
                    }
                    break;
                case 'b102':
                    {
                        this.quarter_info = payInfo;
                    }
                    break;
                // 周卡支付ID
                case 'c502':
                    {
                        this.week_info = payInfo;
                    }
                    break;
            }
        }
    };
    DingYueManager.prototype.getWeekInfo = function () {
        if (Constants_1.IsDebug && this.week_info) {
            this.week_info.is_buy = PayManager_1.PayManager.getInstance().getPayNum(this.week_info.pay_id) > 0;
        }
        return this.week_info;
    };
    DingYueManager.prototype.getMonthCardInfo = function () {
        if (Constants_1.IsDebug && this.month_info) {
            this.month_info.is_buy = PayManager_1.PayManager.getInstance().getPayNum(this.month_info.pay_id) > 0;
        }
        return this.month_info;
    };
    DingYueManager.prototype.getQuarterCardInfo = function () {
        if (Constants_1.IsDebug) {
            this.quarter_info.is_buy = PayManager_1.PayManager.getInstance().getPayNum(this.quarter_info.pay_id) > 0;
        }
        return this.quarter_info;
    };
    /**获取今天是否领取了 */
    DingYueManager.prototype.getTodayIsGet = function (id) {
        return StorageManager_1.TheStorageManager.getInstance().getInt(StorageConfig_1.StorageKey.DingYueGetState + id, 0) > 0;
    };
    DingYueManager.prototype.saveTodayGet = function (id, isGet) {
        var num = isGet ? 1 : 0;
        return StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DingYueGetState + id, num);
    };
    DingYueManager.prototype.resetTodayGetState = function () {
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DingYueGetState + 1001, 0);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.DingYueGetState + 2001, 0);
    };
    DingYueManager._instance = null;
    return DingYueManager;
}());
exports.DingYueManager = DingYueManager;

cc._RF.pop();