"use strict";
cc._RF.push(module, '040d7VrFbhFLoEAAH9lkMKD', 'TowerFightingUi');
// Scripts/Tower/TowerFightingUi.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var MonsterIconManager_1 = require("../Monster/MonsterIconManager");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var TowerLevel_1 = require("./TowerLevel");
var TowerReward_1 = require("./TowerReward");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TowerFightingUi = /** @class */ (function (_super) {
    __extends(TowerFightingUi, _super);
    function TowerFightingUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TowerFightingUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    TowerFightingUi.prototype.initData = function (level) {
        var data = TowerLevel_1.TowerLevelManager.getInstance().getFightingInfo(level);
        var content = this.node.getChildByName("monsterScrollView").getComponent(cc.ScrollView).content;
        data.getOnlyMonsterDataList().forEach(function (v, k) {
            // 怪物id列表
            var icon = MonsterIconManager_1.MonsterIconManager.getInstance().createMonsterIcon(v.id, v.level);
            content.addChild(icon);
        });
        var rewardData = TowerReward_1.TowerRewardManager.getInstance().getRewardDatas(level);
        content = this.node.getChildByName("rewardsScrollView").getComponent(cc.ScrollView).content;
        rewardData.forEach(function (v, k) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
            content.addChild(item);
        });
    };
    TowerFightingUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    TowerFightingUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    TowerFightingUi = __decorate([
        ccclass
    ], TowerFightingUi);
    return TowerFightingUi;
}(UIComponent_1.default));
exports.default = TowerFightingUi;

cc._RF.pop();