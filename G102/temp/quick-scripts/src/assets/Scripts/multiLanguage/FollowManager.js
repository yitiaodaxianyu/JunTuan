"use strict";
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