"use strict";
cc._RF.push(module, '278faZ+Fq5AjLCB2Tc9dtWV', 'TowerGift');
// Scripts/Tower/TowerGift.ts

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
var GameManager_1 = require("../GameManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerGift = /** @class */ (function (_super) {
    __extends(TowerGift, _super);
    function TowerGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_sec = 5;
        return _this;
    }
    TowerGift.prototype.start = function () {
        var text = this.node.getChildByName('jobLabel');
        text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(810006);
        this.schedule(this.countdown, 1);
        this.showCountdown();
    };
    TowerGift.prototype.countdown = function () {
        this.remain_sec--;
        this.showCountdown();
        if (this.remain_sec < 0) {
            this.unschedule(this.countdown);
            this.node.removeFromParent();
        }
    };
    TowerGift.prototype.showCountdown = function () {
        var text = this.node.getChildByName('btnVideo').getChildByName('text');
        text.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100030) + "(" + this.remain_sec + ")";
    };
    TowerGift.prototype.clickBtnVideo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.unschedule(this.countdown);
        // ApkManager.getInstance().showVideo((isTrue:boolean)=>{
        //     if(isTrue){
        //         let level=TowerManager.getTowerLevel()-1;
        //         let list=TowerRewardManager.getInstance().getAdReward(level);
        //         let gm=GameManager.getInstance();
        //         let itemList=new Array();
        //         for(let i=0; i<list.length; i++)
        //         {
        //             let rewardData=list[i];
        //             //可以获得奖品
        //             let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
        //             PropManager.getInstance().changePropNum(rewardData.reward_id,rewardData.reward_num);
        //             itemList.push(item);
        //         }
        //         gm.showMultipleGetTip(itemList,()=>{
        //             this.node.removeFromParent();
        //         });
        //     }else{
        //         this.schedule(this.countdown,1);
        //     }
        // },VIDEO_TYPE.Ziyuan);        
    };
    TowerGift = __decorate([
        ccclass
    ], TowerGift);
    return TowerGift;
}(cc.Component));
exports.default = TowerGift;

cc._RF.pop();