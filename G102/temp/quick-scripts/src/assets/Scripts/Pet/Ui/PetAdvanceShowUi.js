"use strict";
cc._RF.push(module, '5580dOyB8VP2quXrWMRTnKj', 'PetAdvanceShowUi');
// Scripts/Pet/Ui/PetAdvanceShowUi.ts

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
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var BtnPet_1 = require("./BtnPet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetAdvanceShowUi = /** @class */ (function (_super) {
    __extends(PetAdvanceShowUi, _super);
    function PetAdvanceShowUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetAdvanceShowUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    PetAdvanceShowUi.prototype.initData = function (nowPetInfo, oldPetInfo) {
        this.now_pet_info = nowPetInfo;
        this.old_pet_info = oldPetInfo;
        this.refreshUi();
    };
    PetAdvanceShowUi.prototype.refreshUi = function () {
        this.node.getChildByName("old_btn_pet").getComponent(BtnPet_1.default).init(this.old_pet_info);
        this.node.getChildByName("now_btn_pet").getComponent(BtnPet_1.default).init(this.now_pet_info);
        // this.node.getChildByName("oldQualityLabel").getComponent(cc.Label).string = PetManager.getInstance().getPetQualityName(this.old_pet_info.pet_quality);
        // this.node.getChildByName("nowQualityLabel").getComponent(cc.Label).string = PetManager.getInstance().getPetQualityName(this.now_pet_info.pet_quality);
        // let oldData = SpiritAptitudeManager.getInstance().getJsonSpiritAptitude(this.getPetAptitudeId(this.old_pet_info.pet_id,this.old_pet_info.pet_quality));
        // let nowData = SpiritAptitudeManager.getInstance().getJsonSpiritAptitude(this.getPetAptitudeId(this.now_pet_info.pet_id,this.now_pet_info.pet_quality));
        // this.node.getChildByName("oldNumLabel1").getComponent(cc.Label).string = PetManager.getInstance().getPetZhanli(this.old_pet_info).toString();
        // this.node.getChildByName("oldNumLabel2").getComponent(cc.Label).string = oldData.Cooperation.toString();
        // this.node.getChildByName("oldNumLabel3").getComponent(cc.Label).string = oldData.defend.toString();
        // this.node.getChildByName("oldNumLabel4").getComponent(cc.Label).string = oldData.OneHeart.toString();
        // this.node.getChildByName("oldNumLabel5").getComponent(cc.Label).string = oldData.Hit.toString();
        // this.node.getChildByName("oldNumLabel6").getComponent(cc.Label).string = oldData.Miss.toString();
        // this.node.getChildByName("oldNumLabel7").getComponent(cc.Label).string = oldData.Critical.toString();
        // this.node.getChildByName("oldNumLabel8").getComponent(cc.Label).string = oldData.ExtraCritical.toString();
        // this.node.getChildByName("oldNumLabel9").getComponent(cc.Label).string = oldData.AntiCritical.toString();
        // this.node.getChildByName("oldNumLabel10").getComponent(cc.Label).string = oldData.AntiExtraCritical.toString();
        // this.node.getChildByName("nowNumLabel1").getComponent(cc.Label).string = PetManager.getInstance().getPetZhanli(this.now_pet_info).toString();
        // this.node.getChildByName("nowNumLabel2").getComponent(cc.Label).string = nowData.Cooperation.toString();
        // this.node.getChildByName("nowNumLabel3").getComponent(cc.Label).string = nowData.defend.toString();
        // this.node.getChildByName("nowNumLabel4").getComponent(cc.Label).string = nowData.OneHeart.toString();
        // this.node.getChildByName("nowNumLabel5").getComponent(cc.Label).string = nowData.Hit.toString();
        // this.node.getChildByName("nowNumLabel6").getComponent(cc.Label).string = nowData.Miss.toString();
        // this.node.getChildByName("nowNumLabel7").getComponent(cc.Label).string = nowData.Critical.toString();
        // this.node.getChildByName("nowNumLabel8").getComponent(cc.Label).string = nowData.ExtraCritical.toString();
        // this.node.getChildByName("nowNumLabel9").getComponent(cc.Label).string = nowData.AntiCritical.toString();
        // this.node.getChildByName("nowNumLabel10").getComponent(cc.Label).string = nowData.AntiExtraCritical.toString();
    };
    PetAdvanceShowUi.prototype.getPetAptitudeId = function (id, quality) {
        return id * 100 + quality;
    };
    PetAdvanceShowUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    PetAdvanceShowUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    PetAdvanceShowUi = __decorate([
        ccclass
    ], PetAdvanceShowUi);
    return PetAdvanceShowUi;
}(UIComponent_1.default));
exports.default = PetAdvanceShowUi;

cc._RF.pop();