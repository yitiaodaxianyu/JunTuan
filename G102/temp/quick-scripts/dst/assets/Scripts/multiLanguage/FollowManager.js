
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/multiLanguage/FollowManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dd6d1OCx/NHf6pAmMBaXJ55', 'FollowManager');
// Scripts/multiLanguage/FollowManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApkManager_1 = require("../Ads/ApkManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FollowManager = /** @class */ (function () {
    function FollowManager() {
    }
    FollowManager_1 = FollowManager;
    FollowManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new FollowManager_1();
        }
        return this._instance;
    };
    FollowManager.prototype.followEvent = function (eventName) {
        console.log(eventName);
        ApkManager_1.default.getInstance().followEvent(eventName);
    };
    // followNeiBu(level:number,total:number,name:string)
    // {
    //     console.log('level:'+level+',total:'+total);
    //     if (cc.sys.os === cc.sys.OS_ANDROID) {
    //         let className = "org/cocos2dx/javascript/FollowManager";
    //         let methodName = "followNeiBu";
    //         let methodSignature = "(IILjava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
    //         jsb.reflection.callStaticMethod(className, methodName, methodSignature,level,total,name);
    //     }
    // }
    // cheakTime()
    // {
    //     if (cc.sys.os === cc.sys.OS_ANDROID) {
    //         let className = "org/cocos2dx/javascript/FollowManager";
    //         let methodName = "cheakTime";
    //         let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
    //         jsb.reflection.callStaticMethod(className, methodName, methodSignature);
    //     }
    // }
    FollowManager.prototype.addTotal = function (type, addNum) {
        var num = this.getTotal(type) + addNum;
        cc.sys.localStorage.setItem('total_' + type, num);
        this.followEvent(type + num);
    };
    FollowManager.prototype.getTotal = function (type) {
        var num = cc.sys.localStorage.getItem('total_' + type);
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    FollowManager.prototype.addFirstDo = function (type) {
        var num = this.getFirstDo(type) + 1;
        cc.sys.localStorage.setItem('do_' + type, num);
    };
    FollowManager.prototype.getFirstDo = function (type) {
        var num = cc.sys.localStorage.getItem('do_' + type);
        if (num === "" || num === null) {
            num = 0;
        }
        else {
            num = parseInt(num);
        }
        return num;
    };
    var FollowManager_1;
    FollowManager._instance = null;
    FollowManager = FollowManager_1 = __decorate([
        ccclass
    ], FollowManager);
    return FollowManager;
}());
exports.default = FollowManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbXVsdGlMYW5ndWFnZVxcRm9sbG93TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUdyQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFBO0lBMEVBLENBQUM7c0JBMUVvQixhQUFhO0lBSWhCLHlCQUFXLEdBQXpCO1FBRUksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFDdkI7WUFDSSxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksZUFBYSxFQUFFLENBQUM7U0FDdEM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxTQUFnQjtRQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxxREFBcUQ7SUFDckQsSUFBSTtJQUNKLG1EQUFtRDtJQUNuRCw2Q0FBNkM7SUFDN0MsbUVBQW1FO0lBQ25FLDBDQUEwQztJQUMxQyx1R0FBdUc7SUFDdkcsb0dBQW9HO0lBQ3BHLFFBQVE7SUFDUixJQUFJO0lBRUosY0FBYztJQUNkLElBQUk7SUFDSiw2Q0FBNkM7SUFDN0MsbUVBQW1FO0lBQ25FLHdDQUF3QztJQUN4QyxtRkFBbUY7SUFDbkYsbUZBQW1GO0lBQ25GLFFBQVE7SUFDUixJQUFJO0lBRUosZ0NBQVEsR0FBUixVQUFTLElBQVcsRUFBQyxNQUFhO1FBQzlCLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUMsTUFBTSxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsSUFBVztRQUNoQixJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUcsR0FBRyxLQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUcsSUFBSSxFQUN6QjtZQUNJLEdBQUcsR0FBQyxDQUFDLENBQUM7U0FDVDthQUNEO1lBQ0ksR0FBRyxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxJQUFXO1FBQ2xCLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxrQ0FBVSxHQUFWLFVBQVcsSUFBVztRQUNsQixJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUcsR0FBRyxLQUFHLEVBQUUsSUFBSSxHQUFHLEtBQUcsSUFBSSxFQUN6QjtZQUNJLEdBQUcsR0FBQyxDQUFDLENBQUM7U0FDVDthQUNEO1lBQ0ksR0FBRyxHQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7SUF2RWMsdUJBQVMsR0FBa0IsSUFBSSxDQUFDO0lBRjlCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0EwRWpDO0lBQUQsb0JBQUM7Q0ExRUQsQUEwRUMsSUFBQTtrQkExRW9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi9Gb2xsb3dDb25zdGFudHNcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9sbG93TWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBGb2xsb3dNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Rm9sbG93TWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEZvbGxvd01hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvbGxvd0V2ZW50KGV2ZW50TmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnROYW1lKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoZXZlbnROYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmb2xsb3dOZWlCdShsZXZlbDpudW1iZXIsdG90YWw6bnVtYmVyLG5hbWU6c3RyaW5nKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdsZXZlbDonK2xldmVsKycsdG90YWw6Jyt0b3RhbCk7XHJcbiAgICAvLyAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0FORFJPSUQpIHtcclxuICAgIC8vICAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwib3JnL2NvY29zMmR4L2phdmFzY3JpcHQvRm9sbG93TWFuYWdlclwiO1xyXG4gICAgLy8gICAgICAgICBsZXQgbWV0aG9kTmFtZSA9IFwiZm9sbG93TmVpQnVcIjtcclxuICAgIC8vICAgICAgICAgbGV0IG1ldGhvZFNpZ25hdHVyZSA9IFwiKElJTGphdmEvbGFuZy9TdHJpbmc7KVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAvLyAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUsbGV2ZWwsdG90YWwsbmFtZSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgXHJcbiAgICAvLyBjaGVha1RpbWUoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19BTkRST0lEKSB7XHJcbiAgICAvLyAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcIm9yZy9jb2NvczJkeC9qYXZhc2NyaXB0L0ZvbGxvd01hbmFnZXJcIjtcclxuICAgIC8vICAgICAgICAgbGV0IG1ldGhvZE5hbWUgPSBcImNoZWFrVGltZVwiO1xyXG4gICAgLy8gICAgICAgICBsZXQgbWV0aG9kU2lnbmF0dXJlID0gXCIoKVZcIjsvL+WmguaenOaYr3N0cmluZ++8mkxqYXZhL2xhbmcvU3RyaW5nOywgYm9vbDpaLGludDpJXHJcbiAgICAvLyAgICAgICAgIGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoY2xhc3NOYW1lLCBtZXRob2ROYW1lLCBtZXRob2RTaWduYXR1cmUpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBhZGRUb3RhbCh0eXBlOnN0cmluZyxhZGROdW06bnVtYmVyKXtcclxuICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0VG90YWwodHlwZSkrYWRkTnVtO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG90YWxfJyt0eXBlLG51bSk7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dFdmVudCh0eXBlK251bSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3RhbCh0eXBlOnN0cmluZyk6bnVtYmVye1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b3RhbF8nK3R5cGUpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0wO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRGaXJzdERvKHR5cGU6c3RyaW5nKXtcclxuICAgICAgICBsZXQgbnVtPXRoaXMuZ2V0Rmlyc3REbyh0eXBlKSsxO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZG9fJyt0eXBlLG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Rmlyc3REbyh0eXBlOnN0cmluZyk6bnVtYmVye1xyXG4gICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkb18nK3R5cGUpO1xyXG4gICAgICAgIGlmKG51bT09PVwiXCIgfHwgbnVtPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT0wO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxufVxyXG5cclxuIl19