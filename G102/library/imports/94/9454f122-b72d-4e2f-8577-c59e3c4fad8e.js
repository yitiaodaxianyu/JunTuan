"use strict";
cc._RF.push(module, '9454fEity1OL4V3xZ48T62O', 'EquipExchangeUi');
// Scripts/Equipment/Ui/EquipExchangeUi.ts

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
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var EquipConfig_1 = require("../EquipConfig");
var EquipmentManager_1 = require("../EquipmentManager");
var EquipDataItem_1 = require("./EquipDataItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EquipExchangeUi = /** @class */ (function (_super) {
    __extends(EquipExchangeUi, _super);
    function EquipExchangeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.equip_data = null;
        _this.equip_id = null;
        _this.cur_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.equip_type = EquipConfig_1.EquipType.ShiPin;
        _this.ExchangeLevel = null;
        return _this;
    }
    EquipExchangeUi.prototype.initData = function (equipId, heroType, equipPos) {
        this.equip_id = equipId;
        this.cur_hero_type = heroType;
        this.equip_type = equipPos;
        this.initUi();
    };
    EquipExchangeUi.prototype.initUi = function () {
        for (var index = 0; index < this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children.length; index++) {
            this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children[index].destroy();
        }
        this.ExchangeLevel.active = false;
        var curRoot = this.node.getChildByName('curRoot');
        var noWear = this.node.getChildByName('noWear');
        if (this.equip_id) {
            curRoot.active = true;
            noWear.active = false;
            this.node.getChildByName("bg").color.a = 200;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(180005);
            //信息展示        
            //装备Item
            var item = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.equip_id, PropConfig_1.PropAction.Null, this.cur_hero_type);
            if (curRoot.getChildByName('propRoot').children.length > 0) {
                curRoot.getChildByName('propRoot').children[0].destroy();
            }
            curRoot.getChildByName('propRoot').addChild(item);
            //名称
            var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.equip_id);
            var propName = curRoot.getChildByName('propName');
            propName.getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(jsonItem.Quality) + "]" + LanguageManager_1.default.getInstance().getStrByTextId(jsonItem.NameTextId);
            propName.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(jsonItem.Quality);
            var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
            // console.log("______",jsonItem.Quality)
            propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
            //战力数
            curRoot.getChildByName('zhanliNum').getComponent(cc.Label).string = EquipmentManager_1.EquipmentManager.getInstance().getEquipZhanLi(this.equip_id) + ""; //EquipmentManager.getInstance().getEquipZhanLi(this.equip_info)+'';
        }
        else {
            curRoot.active = false;
            noWear.active = true;
            this.node.getChildByName("bg").color.a = 128;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(180006);
        }
        this.loadEquipList();
    };
    EquipExchangeUi.prototype.loadEquipList = function () {
        var _this = this;
        var type = this.equip_type;
        var equipList = PropManager_1.PropManager.getInstance().getEquipmentList(type);
        // console.log("+++++++",equipList)
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        //重组列表
        var uiEquipInfo = new EquipConfig_1.EquipInfo();
        uiEquipInfo.equip_id = this.equip_id;
        uiEquipInfo.equip_num = 1;
        var newList = new Array();
        for (var i = 0; i < equipList.length; i++) {
            var info = equipList[i];
            var heroList = HeroManager_1.HeroManager.getInstance().getWearEquipmentHeroList(info);
            var remainNum = info.equip_num - heroList.length;
            if (remainNum > 0) {
                var prop = new EquipConfig_1.EquipInfo();
                prop.equip_id = info.equip_id;
                prop.equip_num = remainNum;
                newList.push({
                    equipInfo: prop,
                    heroType: HeroConfig_1.Hero_Type.NULL
                });
            }
            for (var n = 0; n < heroList.length; n++) {
                var heroType = heroList[n];
                if (heroType != this.cur_hero_type) {
                    var prop = new EquipConfig_1.EquipInfo();
                    prop.equip_id = info.equip_id;
                    prop.equip_num = 1;
                    newList.push({
                        equipInfo: prop,
                        heroType: heroType
                    });
                }
            }
        }
        var _loop_1 = function (i) {
            var info = newList[i];
            // if(this.equip_info&&info.sequence_id==this.equip_info.sequence_id){
            //     continue;
            // }
            this_1.scheduleOnce(function () {
                var item = cc.instantiate(_this.equip_data);
                content.addChild(item);
                item.getComponent(EquipDataItem_1.default).init(info.equipInfo, uiEquipInfo, _this.cur_hero_type, function (id) {
                    _super.prototype.onRefresh.call(_this, id);
                    _this.clickBtnClose();
                }, info.heroType);
            }, 0.02 * i);
        };
        var this_1 = this;
        for (var i = 0; i < newList.length; i++) {
            _loop_1(i);
        }
    };
    EquipExchangeUi.prototype.clickBtnClose = function () {
        for (var index = 0; index < this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children.length; index++) {
            this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content.children[index].destroy();
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Prefab)
    ], EquipExchangeUi.prototype, "equip_data", void 0);
    __decorate([
        property(cc.Node)
    ], EquipExchangeUi.prototype, "ExchangeLevel", void 0);
    EquipExchangeUi = __decorate([
        ccclass
    ], EquipExchangeUi);
    return EquipExchangeUi;
}(UIComponent_1.default));
exports.default = EquipExchangeUi;

cc._RF.pop();