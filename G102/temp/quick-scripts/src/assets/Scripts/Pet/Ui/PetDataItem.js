"use strict";
cc._RF.push(module, 'e53f6J0TVJFq68ZhLgh/8Ki', 'PetDataItem');
// Scripts/Pet/Ui/PetDataItem.ts

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
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIManager_1 = require("../../UI/UIManager");
var PetManager_1 = require("../PetManager");
var PetItem_1 = require("./PetItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetDataItem = /** @class */ (function (_super) {
    __extends(PetDataItem, _super);
    function PetDataItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui_pet_info = null;
        _this.self_pet_info = null;
        _this.ui_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.self_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.click_callback = null;
        _this.Common_Btn = [];
        return _this;
    }
    PetDataItem.prototype.initData = function (petMessage, uiPetId, heroType, clickCallback, selfHero) {
        if (selfHero === void 0) { selfHero = HeroConfig_1.Hero_Type.NULL; }
        this.self_pet_info = petMessage;
        this.ui_pet_info = uiPetId;
        this.ui_hero_type = heroType;
        this.self_hero_type = selfHero;
        this.click_callback = clickCallback;
        this.refreshUi();
    };
    PetDataItem.prototype.refreshUi = function () {
        var LM = LanguageManager_1.default.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        var equipRoot = this.node.getChildByName("equipRoot");
        if (equipRoot.childrenCount == 0) {
            var item = PetManager_1.PetManager.getInstance().getPetNodeByInfo(this.self_pet_info, PropConfig_1.PropAction.Null, this.self_hero_type);
            item.scale = 0.8;
            item.name = "item_equip";
            equipRoot.addChild(item);
        }
        else {
            var item = equipRoot.getChildByName("item_equip");
            item.getComponent(PetItem_1.default).init(this.self_hero_type, this.self_pet_info, PropConfig_1.PropAction.Null);
        }
        var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.self_pet_info.pet_id);
        var propName = this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string = "[" + PM.getPropQualityName(jsonItem.Quality) + "]" + LM.getStrByTextId(jsonItem.NameTextId);
        propName.color = PM.getPropQualityTextColor(jsonItem.Quality);
        var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
        propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string = PetManager_1.PetManager.getInstance().getPetZhanLi(this.self_pet_info.pet_id) + "";
        var heroType = this.self_hero_type;
        var isWear = heroType != HeroConfig_1.Hero_Type.NULL;
        if (heroType != HeroConfig_1.Hero_Type.NULL) {
            var heroIcon = this.node.getChildByName('heroIcon').getComponent(cc.Sprite);
            heroIcon.spriteFrame = PropManager_1.PropManager.getInstance().getHeroIconb(heroType);
        }
        this.node.getChildByName('exBg').active = isWear;
        this.node.getChildByName('heroIcon').active = isWear;
        this.node.getChildByName('Equipped_Icon').active = isWear;
        this.node.getChildByName('btnExchange').active = isWear;
        var btnEquip = this.node.getChildByName('btnEquip');
        btnEquip.active = !isWear;
        // if(this.ui_pet_info.pet_id!=0){
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(105,56,20)//.toHEX("#693814")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[1]
        // }else{
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(12,56,86)//.toHEX("#0C3856")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[0]
        // }
    };
    PetDataItem.prototype.onClickBtnExchange = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearPet(this.ui_hero_type, this.self_pet_info.pet_id);
        HeroManager_1.HeroManager.getInstance().addWearPet(this.self_hero_type, this.ui_pet_info.pet_id);
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
        if (this.click_callback) {
            this.click_callback(this.self_pet_info.pet_id);
        }
    };
    PetDataItem.prototype.onClickBtnEquip = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearPet(this.ui_hero_type, this.self_pet_info.pet_id);
        if (this.click_callback) {
            this.click_callback(this.self_pet_info.pet_id);
        }
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], PetDataItem.prototype, "Common_Btn", void 0);
    PetDataItem = __decorate([
        ccclass
    ], PetDataItem);
    return PetDataItem;
}(cc.Component));
exports.default = PetDataItem;

cc._RF.pop();