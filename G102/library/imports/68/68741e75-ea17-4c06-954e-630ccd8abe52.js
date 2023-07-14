"use strict";
cc._RF.push(module, '68741516hdMBpVOYwzNir5S', 'PetExchangeUi');
// Scripts/Pet/Ui/PetExchangeUi.ts

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
var SpiritAttribute_1 = require("../Data/SpiritAttribute");
var PetConfig_1 = require("../PetConfig");
var PetManager_1 = require("../PetManager");
var PetDataItem_1 = require("./PetDataItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetExchangeUi = /** @class */ (function (_super) {
    __extends(PetExchangeUi, _super);
    function PetExchangeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_data = null;
        _this.pet_id = null;
        _this.current_hero_type = HeroConfig_1.Hero_Type.NULL;
        return _this;
    }
    PetExchangeUi.prototype.initData = function (petId, heroType) {
        this.pet_id = petId;
        this.current_hero_type = heroType;
        this.refreshUi();
    };
    PetExchangeUi.prototype.refreshUi = function () {
        var _this = this;
        // let petList = PropManager.getInstance().getPetList();
        var content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        var curRoot = this.node.getChildByName('curRoot');
        var noWear = this.node.getChildByName('noWear');
        if (this.pet_id) {
            curRoot.active = true;
            noWear.active = false;
            this.node.getChildByName("bg").color.a = 200;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(640024);
            //信息展示        
            //装备Item
            var item = PetManager_1.PetManager.getInstance().getPetNodeById(this.pet_id, PropConfig_1.PropAction.Null, this.current_hero_type);
            if (curRoot.getChildByName('propRoot').children.length > 0) {
                curRoot.getChildByName('propRoot').children[0].destroy();
            }
            curRoot.getChildByName('propRoot').addChild(item);
            //名称
            var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.pet_id);
            var propName = curRoot.getChildByName('propName');
            propName.getComponent(cc.Label).string = "[" + PropManager_1.PropManager.getInstance().getPropQualityName(jsonItem.Quality) + "]" + LanguageManager_1.default.getInstance().getStrByTextId(jsonItem.NameTextId);
            propName.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(jsonItem.Quality);
            var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
            // console.log("______",jsonItem.Quality)
            propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
            //战力数
            curRoot.getChildByName('zhanliNum').getComponent(cc.Label).string = PetManager_1.PetManager.getInstance().getPetZhanLi(this.pet_id) + "";
        }
        else {
            curRoot.active = false;
            noWear.active = true;
            this.node.getChildByName("bg").color.a = 128;
            this.node.getChildByName("titleLabel").getComponent(TextLanguage_1.default).setTextId(640023);
        }
        // 重新初始化所有
        content.removeAllChildren();
        var petList = PropManager_1.PropManager.getInstance().getPetList();
        var petMessage = new PetConfig_1.PetMessage();
        petMessage.pet_id = this.pet_id;
        petMessage.pet_num = 1;
        var temp1 = new Array();
        var temp2 = new Array();
        for (var i = 0; i < petList.length; i++) {
            var info = petList[i];
            var heroList = HeroManager_1.HeroManager.getInstance().getWearPetHeroList(info);
            var remainNum = info.pet_num - heroList.length;
            if (remainNum > 0) {
                var prop = new PetConfig_1.PetMessage();
                prop.pet_id = info.pet_id;
                prop.pet_num = remainNum;
                temp1.push({
                    equipInfo: prop,
                    heroType: HeroConfig_1.Hero_Type.NULL
                });
            }
            for (var n = 0; n < heroList.length; n++) {
                var heroType = heroList[n];
                if (heroType != this.current_hero_type) {
                    var prop = new PetConfig_1.PetMessage();
                    prop.pet_id = info.pet_id;
                    prop.pet_num = 1;
                    temp2.push({
                        equipInfo: prop,
                        heroType: heroType
                    });
                }
            }
        }
        temp1.sort(this.sort1);
        temp2.sort(this.sort1);
        var temp = new Array();
        temp = temp.concat(temp1, temp2);
        var _loop_1 = function (i) {
            var info = temp[i];
            // if(this.equip_info&&info.sequence_id==this.equip_info.sequence_id){
            //     continue;
            // }
            this_1.scheduleOnce(function () {
                var item = cc.instantiate(_this.pet_data);
                content.addChild(item);
                item.getComponent(PetDataItem_1.default).initData(info.equipInfo, petMessage, _this.current_hero_type, function (id) {
                    _super.prototype.onRefresh.call(_this, id);
                    _this.clickBtnClose();
                }, info.heroType);
            }, 0.02 * i);
        };
        var this_1 = this;
        for (var i = 0; i < temp.length; i++) {
            _loop_1(i);
        }
    };
    PetExchangeUi.prototype.clickBtnClose = function () {
        var content = this.node.getChildByName("scrollView").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    PetExchangeUi.prototype.sort1 = function (a, b) {
        var infoA = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(a.equipInfo.pet_id);
        var infoB = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(b.equipInfo.pet_id);
        if (infoA.Stage != infoB.Stage) {
            return infoB.Stage - infoA.Stage;
        }
        else {
            // return this.sort2(a.equipInfo.pet_id,b.equipInfo.pet_id);
            return PetManager_1.PetManager.getInstance().getPetZhanLi(b.equipInfo.pet_id) - PetManager_1.PetManager.getInstance().getPetZhanLi(a.equipInfo.pet_id);
        }
    };
    PetExchangeUi.prototype.sort2 = function (a, b) {
        return PetManager_1.PetManager.getInstance().getPetZhanLi(a) - PetManager_1.PetManager.getInstance().getPetZhanLi(b);
    };
    __decorate([
        property(cc.Prefab)
    ], PetExchangeUi.prototype, "pet_data", void 0);
    PetExchangeUi = __decorate([
        ccclass
    ], PetExchangeUi);
    return PetExchangeUi;
}(UIComponent_1.default));
exports.default = PetExchangeUi;

cc._RF.pop();