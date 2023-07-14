"use strict";
cc._RF.push(module, 'ff24f7TRM1K4YdWC+EfWDi2', 'MoppingVoid');
// Scripts/copy/voidcrack/MoppingVoid.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var GameManager_1 = require("../../GameManager");
var Jackpot_1 = require("../../JsonData/Jackpot");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var UIComponent_1 = require("../../UI/UIComponent");
var RoguefastPass_1 = require("./RoguefastPass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoppingVoid = /** @class */ (function (_super) {
    __extends(MoppingVoid, _super);
    function MoppingVoid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.type = 0; //打的那个的id
        return _this;
        // update (dt) {}
    }
    MoppingVoid.prototype.initUi = function (type) {
        this.type = type; //id
        var Prop1_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_1(this.type);
        var Prop1_Sum = RoguefastPass_1.RoguefastPassManager.getInstance().getPropNum_1(this.type);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        ietm1.parent = this.item[0];
        var Prop2_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_2(this.type);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(Prop2_ID, 1);
        ietm2.parent = this.item[1];
    };
    MoppingVoid.prototype.clickBtnShow = function () {
        var Prop1_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_1(this.type);
        var Prop1_Sum = RoguefastPass_1.RoguefastPassManager.getInstance().getPropNum_1(this.type);
        var Prop2_ID = RoguefastPass_1.RoguefastPassManager.getInstance().getPropID_2(this.type);
        var Prop2_Sum = RoguefastPass_1.RoguefastPassManager.getInstance().getPropNum_2(this.type);
        var rd = Jackpot_1.JackpotManager.getInstance().getRewardDataById(Prop2_ID);
        var ietm1 = PropManager_1.PropManager.getInstance().createPropItem(Prop1_ID, Prop1_Sum);
        var ietm2 = PropManager_1.PropManager.getInstance().createPropItem(rd.reward_id, Prop2_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(Prop1_ID, Prop1_Sum);
        PropManager_1.PropManager.getInstance().changePropNum(rd.reward_id, Prop2_Sum);
        var myietm = [ietm1, ietm2];
        GameManager_1.default.getInstance().showMultipleGetTip(myietm);
        var totalnum = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TotalVoidCrackChallengeTimes, 0);
        var num = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, 3);
        num--;
        totalnum++;
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.TotalVoidCrackChallengeTimes, totalnum);
        StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.VoidCrackChallengeTimes, num);
        this.clickBtnClose();
    };
    MoppingVoid.prototype.clickBtnClose = function () {
        this.item[0].children[0].destroy();
        this.item[1].children[0].destroy();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], MoppingVoid.prototype, "item", void 0);
    MoppingVoid = __decorate([
        ccclass
    ], MoppingVoid);
    return MoppingVoid;
}(UIComponent_1.default));
exports.default = MoppingVoid;

cc._RF.pop();