"use strict";
cc._RF.push(module, 'c5ba12D3d1KF5iZsApG2mE8', 'PublicMethods');
// Scripts/Turntable/PublicMethods.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Thu Dec 23 2021 14:07:24 GMT+0800 (中国标准时间)
 * Author = ZQYZ
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/script/WZ/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
var PublicMethods = /** @class */ (function (_super) {
    __extends(PublicMethods, _super);
    function PublicMethods() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PublicMethods_1 = PublicMethods;
    PublicMethods.timeconversions = function (currenttime) {
        var currenttimeint = currenttime;
        var day = currenttimeint / 24 / 3600;
        day = Math.floor(day);
        var hour = currenttimeint / 3600 % 24;
        hour = Math.floor(hour);
        var minutes = (currenttimeint % 3600) / 60;
        var seconds = currenttimeint % 60;
        minutes = Math.floor(minutes);
        var daystr;
        if (day < 10) {
            daystr = '0' + day;
        }
        else {
            daystr = day;
        }
        var hourstr;
        if (hour < 10) {
            hourstr = '0' + hour;
        }
        else {
            hourstr = hour;
        }
        var minutesstr;
        if (minutes < 10) {
            minutesstr = '0' + minutes;
        }
        else {
            minutesstr = minutes;
        }
        var secondsstr;
        if (seconds < 10) {
            secondsstr = '0' + seconds;
        }
        else {
            secondsstr = seconds;
        }
        return hourstr + ':' + minutesstr + ':' + secondsstr;
    };
    PublicMethods.timeconversion = function (currenttime) {
        var currenttimeint = currenttime;
        var day = currenttimeint / 24 / 3600;
        day = Math.floor(day);
        var hour = currenttimeint / 3600 % 24;
        hour = Math.floor(hour);
        var minutes = (currenttimeint % 3600) / 60;
        var seconds = currenttimeint % 60;
        minutes = Math.floor(minutes);
        var daystr;
        if (day < 10) {
            daystr = '0' + day;
        }
        else {
            daystr = day;
        }
        var hourstr;
        if (hour < 10) {
            hourstr = '0' + hour;
        }
        else {
            hourstr = hour;
        }
        var minutesstr;
        if (minutes < 10) {
            minutesstr = '0' + minutes;
        }
        else {
            minutesstr = minutes;
        }
        var secondsstr;
        if (seconds < 10) {
            secondsstr = '0' + seconds;
        }
        else {
            secondsstr = seconds;
        }
        return daystr + ':' + hourstr + ':' + minutesstr + ':' + secondsstr;
    };
    //保存当前时间
    PublicMethods.setCurrentTime = function () {
        PublicMethods_1.setValueInLocal('LastTime', PublicMethods_1.getCurrentLocalTime());
    };
    PublicMethods.getLastTime = function () {
        var time = PublicMethods_1.getValueWithLocal('LastTime', PublicMethods_1.getCurrentLocalTime());
        return Number(time);
    };
    PublicMethods.getCurrentLocalTime = function () {
        var a = Date.now();
        var b = a / 1000;
        return b;
    };
    /////////////////
    ///////存储本地数据
    PublicMethods.setValueInLocal = function (key, value) {
        try {
            cc.sys.localStorage.setItem(key, String(value));
        }
        catch (err) {
            console.log('---------------------- 卧槽，存文件的时候炸裂了！');
        }
    };
    //读取本地数据
    PublicMethods.getValueWithLocal = function (key, defaultValue) {
        var value = cc.sys.localStorage.getItem(key);
        if (!value) {
            return defaultValue;
        }
        return value;
    };
    var PublicMethods_1;
    PublicMethods = PublicMethods_1 = __decorate([
        ccclass
    ], PublicMethods);
    return PublicMethods;
}(cc.Component));
exports.default = PublicMethods;
/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */

cc._RF.pop();