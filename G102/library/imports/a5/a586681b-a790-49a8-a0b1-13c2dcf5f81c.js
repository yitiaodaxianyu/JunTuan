"use strict";
cc._RF.push(module, 'a5866gbp5BJqKCxE8Lc9fgc', 'PetReductionUi');
// Scripts/Pet/Ui/PetReductionUi.ts

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
var ApkManager_1 = require("../../Ads/ApkManager");
var GameManager_1 = require("../../GameManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetReductionUi = /** @class */ (function (_super) {
    __extends(PetReductionUi, _super);
    function PetReductionUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_info = null;
        return _this;
    }
    PetReductionUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    PetReductionUi.prototype.initData = function (petInfo) {
        this.pet_info = petInfo;
        this.refreshUi();
    };
    PetReductionUi.prototype.refreshUi = function () {
        // this.node.getChildByName("cinItem").getComponentInChildren(cc.Label).string = MyTool.getCoinDanwei(SpiritLevelUpManager.getInstance().getNowLevelAllCostCoin(this.pet_info.pet_level));
        // this.node.getChildByName("foodItem").getComponentInChildren(cc.Label).string = MyTool.getCoinDanwei(SpiritLevelUpManager.getInstance().getNowLevelAllCostFood(this.pet_info.pet_level));
    };
    PetReductionUi.prototype.onClickSureBtn = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -50)) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.宠物还原总次数);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同宠物的还原次数 + this.pet_info.pet_id);
            // let coinNum = SpiritLevelUpManager.getInstance().getNowLevelAllCostCoin(this.pet_info.pet_level);
            // let foodNum = SpiritLevelUpManager.getInstance().getNowLevelAllCostFood(this.pet_info.pet_level)
            // let coinItem = PropManager.getInstance().createPropItem(PropId.Coin,coinNum);
            // let foodItem = PropManager.getInstance().createPropItem(PropId.AnimalFood,foodNum);
            // let rewardList:cc.Node[] = [];
            // this.pet_info.resetLevel();
            // rewardList.push(coinItem);
            // rewardList.push(foodItem);
            // GameManager.getInstance().showMultipleGetTip(rewardList,(() =>{
            //     PropManager.getInstance().changePropNum(PropId.Coin,coinNum);
            //     PropManager.getInstance().changePropNum(PropId.AnimalFood,foodNum);
            //     this.destroySelf();
            // }).bind(this));
        }
    };
    PetReductionUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    PetReductionUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    PetReductionUi = __decorate([
        ccclass
    ], PetReductionUi);
    return PetReductionUi;
}(UIComponent_1.default));
exports.default = PetReductionUi;

cc._RF.pop();