"use strict";
cc._RF.push(module, '0e869LNR/tLj6NDHpFmfw2K', 'VipManager');
// Scripts/Ads/VipManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VipManager = exports.DYInfo = exports.Vip_Type = exports.DingYue_Type = void 0;
var DingYue_Type;
(function (DingYue_Type) {
    DingYue_Type[DingYue_Type["Week"] = 0] = "Week";
    DingYue_Type[DingYue_Type["Month"] = 1] = "Month";
    DingYue_Type[DingYue_Type["Year"] = 2] = "Year";
})(DingYue_Type = exports.DingYue_Type || (exports.DingYue_Type = {}));
var Vip_Type;
(function (Vip_Type) {
    Vip_Type[Vip_Type["A"] = 0] = "A";
    Vip_Type[Vip_Type["B"] = 1] = "B";
})(Vip_Type = exports.Vip_Type || (exports.Vip_Type = {}));
var DYInfo = /** @class */ (function () {
    function DYInfo() {
        this.des = 'vip';
        this.price = '$1.0';
        this.currency = 'USD';
    }
    return DYInfo;
}());
exports.DYInfo = DYInfo;
var VipManager = /** @class */ (function () {
    function VipManager() {
    }
    VipManager.getIsVip = function () {
        var num = cc.sys.localStorage.getItem('vip_level');
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        if (num > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    VipManager.getVipStartTime = function () {
        var num = cc.sys.localStorage.getItem('vip_start_time');
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    VipManager.saveVipStartTime = function (dingyueType, vipType) {
        this.vip_type = vipType;
        var time = new Date().getTime();
        cc.sys.localStorage.setItem('vip_start_time', time);
        this.saveTotalDay(dingyueType);
    };
    VipManager.getVipTotalDay = function () {
        var num = cc.sys.localStorage.getItem('vip_total_day');
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    VipManager.saveTotalDay = function (dingyueType) {
        var num = 7;
        switch (dingyueType) {
            case DingYue_Type.Week:
                num = 7;
                break;
            case DingYue_Type.Month:
                num = 30;
                break;
            case DingYue_Type.Year:
                num = 365;
                break;
        }
        cc.sys.localStorage.setItem('vip_total_day', num);
    };
    VipManager.getVipFreeNum = function () {
        var num = cc.sys.localStorage.getItem('vip_free_num');
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    VipManager.subVipFreeNum = function () {
        if (this.getIsVip() == true) {
            if (this.getVipFreeNum() > 0) {
                var num = this.getVipFreeNum();
                num--;
                if (num >= 0) {
                    this.saveVipFreeNum(num);
                    return true;
                }
            }
        }
        return false;
    };
    VipManager.saveVipFreeNum = function (num) {
        cc.sys.localStorage.setItem('vip_free_num', num);
    };
    VipManager.dy_info = [];
    VipManager.vip_type = Vip_Type.A;
    return VipManager;
}());
exports.VipManager = VipManager;

cc._RF.pop();