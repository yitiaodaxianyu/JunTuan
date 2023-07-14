"use strict";
cc._RF.push(module, 'fa60eUkre1J8pfet2E/BGNz', 'rankingrewarddisplay');
// Scripts/copy/endlesschallenges/rankingrewarddisplay.ts

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
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var BossWeeklyReward_1 = require("./BossWeeklyReward");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rankingrewarddisplay = /** @class */ (function (_super) {
    __extends(rankingrewarddisplay, _super);
    function rankingrewarddisplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.RewardGrade = -1; //排名  默认-1     
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    // Administrator:
    // 1：第1名
    // 2：第2名
    // 3：第3名
    // 4：4-10名
    // 5：11-50名
    // 6：51-100名
    // 7：100名+
    // boss:number[]=[20003,40006,20003,10002]
    rankingrewarddisplay.prototype.initUi = function (type) {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == -1) {
            this.RewardGrade = 7;
        }
        else if (type == 1) {
            this.RewardGrade = 1;
        }
        else if (type == 2) {
            this.RewardGrade = 2;
        }
        else if (type == 3) {
            this.RewardGrade = 3;
        }
        else if (type <= 10 && type >= 4) {
            this.RewardGrade = 4;
        }
        else if (type <= 50 && type >= 11) {
            this.RewardGrade = 5;
        }
        else if (type <= 100 && type >= 51) {
            this.RewardGrade = 6;
        }
        var rewardData = BossWeeklyReward_1.BossWeeklyRewardManager.getInstance().getFirstRewardArr(this.RewardGrade);
        for (var index = 0; index < this.item.length; index++) {
            if (index < rewardData.length) {
                var items = PropManager_1.PropManager.getInstance().createPropItem(rewardData[index].reward_id, rewardData[index].reward_num);
                this.item[index].active = true;
                items.parent = this.item[index];
            }
            else {
                this.item[index].active = false;
            }
        }
    };
    rankingrewarddisplay.prototype.shanchu = function () {
        for (var index = 0; index < this.item.length; index++) {
            if (this.item[index].childrenCount > 0) {
                this.item[index].children[0].destroy();
            }
        }
    };
    rankingrewarddisplay.prototype.clickBtnClose = function () {
        this.shanchu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], rankingrewarddisplay.prototype, "item", void 0);
    rankingrewarddisplay = __decorate([
        ccclass
    ], rankingrewarddisplay);
    return rankingrewarddisplay;
}(UIComponent_1.default));
exports.default = rankingrewarddisplay;

cc._RF.pop();