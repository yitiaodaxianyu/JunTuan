"use strict";
cc._RF.push(module, '94b10WPD4NGrbPgHOKYvknW', 'EquipDataItem');
// Scripts/Equipment/Ui/EquipDataItem.ts

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
var EquipmentAttribute_1 = require("../Data/EquipmentAttribute");
var EquipmentManager_1 = require("../EquipmentManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EquipDataItem = /** @class */ (function (_super) {
    __extends(EquipDataItem, _super);
    function EquipDataItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui_equip_info = null;
        _this.self_equip_info = null;
        _this.ui_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.self_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.click_callback = null;
        _this.Common_Btn = [];
        return _this;
    }
    EquipDataItem.prototype.init = function (equipInfo, uiEquipId, heroType, clickCallback, selfHero) {
        if (selfHero === void 0) { selfHero = HeroConfig_1.Hero_Type.NULL; }
        this.self_equip_info = equipInfo;
        this.ui_equip_info = uiEquipId;
        this.ui_hero_type = heroType;
        this.self_hero_type = selfHero;
        this.click_callback = clickCallback;
        this.initData();
        this.refreshData();
    };
    EquipDataItem.prototype.initData = function () {
        //管理器
        var LM = LanguageManager_1.default.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        //图标
        var item = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeByInfo(this.self_equip_info, PropConfig_1.PropAction.Null, this.self_hero_type);
        item.scale = 0.8;
        this.node.getChildByName('equipRoot').addChild(item);
        //名称
        var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.self_equip_info.equip_id);
        var propName = this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string = "[" + PM.getPropQualityName(jsonItem.Quality) + "]" + LM.getStrByTextId(jsonItem.NameTextId);
        propName.color = PM.getPropQualityTextColor(jsonItem.Quality);
        var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
        // console.log("______",jsonItem.Quality)
        propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
        //战力数
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string = EquipmentManager_1.EquipmentManager.getInstance().getEquipZhanLi(this.self_equip_info.equip_id) + ""; //EquipmentManager.getInstance().getEquipZhanLi(this.self_equip_info)+'';
    };
    EquipDataItem.prototype.refreshData = function () {
        //装备的英雄
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
        // if(this.ui_equip_info.equip_id!=0){
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(12,56,86)//.toHEX("#0C3856")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[0]
        // }else{
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(105,56,20)//.toHEX("#693814")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[1]
        // }
    };
    EquipDataItem.prototype.onClickBtnExchange = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearEquipment(this.ui_hero_type, this.self_equip_info.equip_id);
        HeroManager_1.HeroManager.getInstance().addWearEquipment(this.self_hero_type, this.ui_equip_info.equip_id, EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(this.self_equip_info.equip_id));
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
        if (this.click_callback) {
            this.click_callback(this.self_equip_info.equip_id);
        }
    };
    EquipDataItem.prototype.onClickBtnEquip = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearEquipment(this.ui_hero_type, this.self_equip_info.equip_id);
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
        if (this.click_callback) {
            this.click_callback(this.self_equip_info.equip_id);
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], EquipDataItem.prototype, "Common_Btn", void 0);
    EquipDataItem = __decorate([
        ccclass
    ], EquipDataItem);
    return EquipDataItem;
}(cc.Component));
exports.default = EquipDataItem;

cc._RF.pop();