"use strict";
cc._RF.push(module, '2f22bJPCmtDVLFJv5XyUHzT', 'PetSetFreeUi');
// Scripts/Pet/Ui/PetSetFreeUi.ts

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
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var BtnPet_1 = require("./BtnPet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetSetFreeUi = /** @class */ (function (_super) {
    __extends(PetSetFreeUi, _super);
    function PetSetFreeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_info_list = [];
        _this.reward_list = [];
        _this.pet_item = null;
        return _this;
    }
    PetSetFreeUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    PetSetFreeUi.prototype.initData = function (petInfoList) {
        this.pet_info_list = petInfoList;
        this.refreshUi();
    };
    PetSetFreeUi.prototype.refreshUi = function () {
        var _this = this;
        var content1 = this.node.getChildByName("petScroll").getComponent(cc.ScrollView).content;
        var content2 = this.node.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
        this.pet_info_list.forEach(function (v, k) {
            // let data:JsonSpiritRelease = SpiritReleaseManager.getInstance().getDataByQualityAndRarity(v.pet_quality,SpiritMessageManager.getInstance().getSpiritRarity(v.pet_id));
            // let rewardData:RewardData = new RewardData();
            // rewardData.reward_id = data.GetItem;
            // rewardData.reward_num = data.GetNum;
            // let isAdd = false;
            // this.reward_list.find((v,i,a) => {
            //     if(v.reward_id == data.GetItem){
            //         v.reward_num += data.GetNum;
            //         isAdd = true
            //     }
            // });
            // if(isAdd == false){
            //     this.reward_list.push(rewardData);
            // }
        });
        this.pet_info_list.forEach(function (v, k) {
            var petItem = cc.instantiate(_this.pet_item);
            petItem.getComponent(BtnPet_1.default).init(v);
            content1.addChild(petItem);
        });
        this.reward_list.forEach(function (v, k) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
            content2.addChild(item);
        });
    };
    PetSetFreeUi.prototype.onClickSureBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.pet_info_list.forEach(function (v, k) {
            //    PetManager.getInstance().removePet(v);
        });
        this.reward_list.forEach(function (v, k) {
            PropManager_1.PropManager.getInstance().changePropNum(v.reward_id, v.reward_num);
        });
        var rewardList = [];
        this.reward_list.forEach(function (v, k) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
            rewardList.push(item);
        });
        GameManager_1.default.getInstance().showMultipleGetTip(rewardList, (function () {
            _this.destroySelf();
        }).bind(this));
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Fangsheng);
    };
    PetSetFreeUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    PetSetFreeUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.Prefab)
    ], PetSetFreeUi.prototype, "pet_item", void 0);
    PetSetFreeUi = __decorate([
        ccclass
    ], PetSetFreeUi);
    return PetSetFreeUi;
}(UIComponent_1.default));
exports.default = PetSetFreeUi;

cc._RF.pop();