"use strict";
cc._RF.push(module, '8ede9OobuNKTpY4e4TFsF44', 'Times');
// Scripts/Turntable/Times.ts

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
// import { _decorator, Component, macro, Game, game } from 'cc';
// import { FramePublic } from './FramePublic';
// import LocalItemName from './LocalItemName';
// import { OfflineReward } from './OfflineReward';
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var PublicMethods_1 = require("./PublicMethods");
var Turmtable_1 = require("./Turmtable");
// import { PublicMethods } from './PublicMethods';
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * Predefined variables
 * Name = Time
 * DateTime = Tue Nov 08 2022 17:51:49 GMT+0800 (中国标准时间)
 * Author = dxq0328
 * FileBasename = Time.ts
 * FileBasenameNoExtension = Time
 * URL = db://assets/Scripts/Frame/Time.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
var Times = /** @class */ (function (_super) {
    __extends(Times, _super);
    function Times() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Times_1 = Times;
    Times.prototype.onLoad = function () {
        var interval = 1; // 以秒为单位的时间间隔
        var repeat = cc.macro.REPEAT_FOREVER; // 重复次数     // cc.macro.REPEAT_FOREVER
        var delay = 0;
        cc.game.addPersistRootNode(this.node); // 开始延时1秒后开始
        this.schedule(this.Management, interval, repeat, delay);
        //从后台到前台的事件
        // cc.game.on(cc.game.EVENT_HIDE, ()=>{
        //     this.GameShow();
        // }, this);
    };
    Times.prototype.Management = function () {
        // this.SaveLocalTime();//每隔1秒保存一下时间到本地
        var TurmtableFreeYes = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeYes, 0);
        if (TurmtableFreeYes == 0) {
            var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TurmtableFreeTime, 900);
            num -= 1;
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeTime, "" + num);
            if (Times_1.timetxt != null) {
                // @ts-ignore
                if (Times_1.timetxt._name != "") {
                    Times_1.timetxt.getComponent(cc.Label).string = "" + PublicMethods_1.default.timeconversions(num);
                }
            }
            if (num == 0) {
                StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TurmtableFreeYes, 1);
                if (Times_1.Turmtablenode != null) {
                    // @ts-ignore
                    if (Times_1.Turmtablenode._name != "") {
                        Times_1.Turmtablenode.getComponent(Turmtable_1.default).Refresh();
                    }
                }
            }
        }
    };
    var Times_1;
    Times.timetxt = null;
    Times.Turmtablenode = null;
    Times.voidsensid = 0; //虚空裂缝打到那一层的id
    Times = Times_1 = __decorate([
        ccclass
    ], Times);
    return Times;
}(cc.Component));
exports.default = Times;
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