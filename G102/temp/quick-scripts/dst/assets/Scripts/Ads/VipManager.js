
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Ads/VipManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWRzXFxWaXBNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQVksWUFLWDtBQUxELFdBQVksWUFBWTtJQUVwQiwrQ0FBTSxDQUFBO0lBQ04saURBQUssQ0FBQTtJQUNMLCtDQUFJLENBQUE7QUFDUixDQUFDLEVBTFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFLdkI7QUFFRCxJQUFZLFFBSVg7QUFKRCxXQUFZLFFBQVE7SUFFaEIsaUNBQUcsQ0FBQTtJQUNILGlDQUFDLENBQUE7QUFDTCxDQUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkI7QUFFRDtJQUFBO1FBQ0ksUUFBRyxHQUFRLEtBQUssQ0FBQztRQUNqQixVQUFLLEdBQVEsTUFBTSxDQUFDO1FBQ3BCLGFBQVEsR0FBUSxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUFELGFBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHdCQUFNO0FBTW5CO0lBQUE7SUEwR0EsQ0FBQztJQXJHVSxtQkFBUSxHQUFmO1FBRUksSUFBSSxHQUFHLEdBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELElBQUcsR0FBRyxLQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUcsSUFBSSxFQUN6QjtZQUNJLEdBQUcsR0FBQyxDQUFDLENBQUM7U0FDVDthQUNEO1lBQ0ksR0FBRyxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELElBQUcsR0FBRyxHQUFDLENBQUMsRUFDUjtZQUNJLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFDRDtZQUNJLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUVNLDBCQUFlLEdBQXRCO1FBRUksSUFBSSxHQUFHLEdBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFD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R3hDLGlCQUFDO0NBMUdELEFBMEdDLElBQUE7QUExR1ksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc0RlYnVnIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBNYWluVWkgZnJvbSBcIi4uL1VJL2hvbWUvTWFpblVpXCI7XHJcblxyXG5cclxuZXhwb3J0IGVudW0gRGluZ1l1ZV9UeXBlXHJcbntcclxuICAgIFdlZWs9MCxcclxuICAgIE1vbnRoLFxyXG4gICAgWWVhcixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVmlwX1R5cGVcclxue1xyXG4gICAgQT0wLFxyXG4gICAgQixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERZSW5mb3tcclxuICAgIGRlczpzdHJpbmc9J3ZpcCc7XHJcbiAgICBwcmljZTpzdHJpbmc9JyQxLjAnO1xyXG4gICAgY3VycmVuY3k6c3RyaW5nPSdVU0QnO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVmlwTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgZHlfaW5mbzpEWUluZm9bXT1bXTtcclxuXHJcbiAgICBzdGF0aWMgdmlwX3R5cGU6VmlwX1R5cGU9VmlwX1R5cGUuQTtcclxuXHJcbiAgICBzdGF0aWMgZ2V0SXNWaXAoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ZpcF9sZXZlbCcpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0wO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobnVtPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0VmlwU3RhcnRUaW1lKClcclxuICAgIHtcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndmlwX3N0YXJ0X3RpbWUnKTtcclxuICAgICAgICBpZihudW09PT1cIlwiIHx8IG51bT09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MDtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNhdmVWaXBTdGFydFRpbWUoZGluZ3l1ZVR5cGU6RGluZ1l1ZV9UeXBlLHZpcFR5cGU6VmlwX1R5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXBfdHlwZT12aXBUeXBlO1xyXG4gICAgICAgIGxldCB0aW1lPW5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndmlwX3N0YXJ0X3RpbWUnLHRpbWUpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVRvdGFsRGF5KGRpbmd5dWVUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0VmlwVG90YWxEYXkoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2aXBfdG90YWxfZGF5Jyk7XHJcbiAgICAgICAgaWYobnVtPT09XCJcIiB8fCBudW09PT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPTA7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzYXZlVG90YWxEYXkoZGluZ3l1ZVR5cGU6RGluZ1l1ZV9UeXBlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBudW09NztcclxuICAgICAgICBzd2l0Y2goZGluZ3l1ZVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIERpbmdZdWVfVHlwZS5XZWVrOiBudW09NzsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgRGluZ1l1ZV9UeXBlLk1vbnRoOiBudW09MzA7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIERpbmdZdWVfVHlwZS5ZZWFyOiBudW09MzY1OyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd2aXBfdG90YWxfZGF5JyxudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRWaXBGcmVlTnVtKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ZpcF9mcmVlX251bScpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0wO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc3ViVmlwRnJlZU51bSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmdldElzVmlwKCk9PXRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldFZpcEZyZWVOdW0oKT4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0VmlwRnJlZU51bSgpO1xyXG4gICAgICAgICAgICAgICAgbnVtLS07XHJcbiAgICAgICAgICAgICAgICBpZihudW0+PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlVmlwRnJlZU51bShudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2F2ZVZpcEZyZWVOdW0obnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZpcF9mcmVlX251bScsbnVtKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==