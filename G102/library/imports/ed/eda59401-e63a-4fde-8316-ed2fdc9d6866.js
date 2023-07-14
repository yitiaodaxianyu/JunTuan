"use strict";
cc._RF.push(module, 'eda59QB5jpP3oMW7S/cnWhm', 'BtnPet');
// Scripts/Pet/Ui/BtnPet.ts

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
var BtnPet = /** @class */ (function (_super) {
    __extends(BtnPet, _super);
    function BtnPet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_info = null;
        _this.icon = null;
        _this.team_index = 0;
        return _this;
    }
    BtnPet.prototype.init = function (petInfo) {
        var content = this.node.getChildByName("content");
        content.active = true;
        this.pet_info = petInfo;
        this.icon = content.getChildByName("iconMask");
        this.icon.active = true;
        // this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + this.pet_info.pet_id);
        // console.log( PetManager.getInstance().getSpriteFrameByName('Sprite_Avatar_' + this.pet_info.pet_id))
        // let type = content.getChildByName("type");
        // type.active = true;
        // type.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Hero_Type_" + SpiritMessageManager.getInstance().getSpiritType(this.pet_info.pet_id));
        // content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + SpiritQualityMessageManager.getInstance().getSpiritQualityframe(this.pet_info.pet_quality));
        var star = content.getChildByName("star");
        // star.getComponent(cc.Sprite).spriteFrame = PetManager.getInstance().getSpriteFrameByName
        // ("Prepare_Star_" + SpiritQualityMessageManager.getInstance().
        // getSpiritQualityStar(this.pet_info.pet_quality));
        var levelLabel = content.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "" + this.pet_info.pet_level;
    };
    // initQuality(quality:number){
    //     let content = this.node.getChildByName("content");
    //     content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = 
    //     PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + 
    //     SpiritQualityMessageManager.getInstance().getSpiritQualityframe(quality));
    // }
    BtnPet.prototype.showLock = function (quality) {
        var content = this.node.getChildByName("content");
        this.icon = content.getChildByName("iconMask");
        this.icon.active = true;
        this.icon.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = null;
        // content.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = 
        // PetManager.getInstance().getSpriteFrameByName("Prepare_Quality_" + 
        // SpiritQualityMessageManager.getInstance().getSpiritQualityframe(quality));
        var star = content.getChildByName("star");
        star.getComponent(cc.Sprite).spriteFrame = null;
        var levelLabel = content.getChildByName("levelLabel");
        levelLabel.active = true;
        levelLabel.getComponent(cc.Label).string = "";
    };
    BtnPet.prototype.showBan = function () {
        this.node.getChildByName("ban").active = true;
        this.node.getChildByName("content").active = false;
    };
    BtnPet.prototype.hideBan = function () {
        this.node.getChildByName("ban").active = false;
        this.node.getChildByName("content").active = true;
    };
    BtnPet.prototype.showNull = function () {
        this.node.getChildByName("content").active = false;
        this.node.getChildByName("ban").active = false;
    };
    __decorate([
        property()
    ], BtnPet.prototype, "team_index", void 0);
    BtnPet = __decorate([
        ccclass
    ], BtnPet);
    return BtnPet;
}(cc.Component));
exports.default = BtnPet;

cc._RF.pop();