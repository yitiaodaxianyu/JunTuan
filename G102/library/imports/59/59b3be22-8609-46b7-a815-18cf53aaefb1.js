"use strict";
cc._RF.push(module, '59b3b4ihglGt6gVGM9Tqu+x', 'PetItem');
// Scripts/Pet/Ui/PetItem.ts

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
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIManager_1 = require("../../UI/UIManager");
var PetConfig_1 = require("../PetConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetItem = /** @class */ (function (_super) {
    __extends(PetItem, _super);
    function PetItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.pet_info = null;
        _this.prop_action = PropConfig_1.PropAction.Look;
        _this.prop_price = 0;
        _this.prop_cost = PropConfig_1.PropId.Coin;
        _this.buy_callback = null;
        _this.use_callback = null;
        return _this;
    }
    PetItem.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    PetItem.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    PetItem.prototype.init = function (heroType, info, pAc) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (typeof info == "number") {
            var petInfo = new PetConfig_1.PetMessage();
            petInfo.pet_id = info;
            petInfo.pet_num = 1;
            this.pet_info = petInfo;
        }
        else {
            this.pet_info = info;
        }
        this.hero_type = heroType;
        this.prop_action = pAc;
        this.refreshData();
    };
    PetItem.prototype.refreshData = function () {
        var PM = PropManager_1.PropManager.getInstance();
        var bg = this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame = PM.getSpFrameByPropType(this.pet_info.pet_id);
        var iconSp = this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = PM.getSpByPropId(this.pet_info.pet_id);
        this.node.getComponent(cc.Button).enabled = this.prop_action != PropConfig_1.PropAction.Null;
        var star = this.node.getChildByName("star").getChildByName('star').getComponent(cc.Sprite);
        var starNum = Item_1.ItemManager.getInstance().getStar(this.pet_info.pet_id);
        if (starNum > 0) {
            star.node.active = true;
            star.spriteFrame = PropManager_1.PropManager.getInstance().getSpByName('Common_Star_' + starNum);
        }
        else {
            star.node.active = false;
        }
        var num = this.node.getChildByName("num");
        if (this.pet_info.pet_num <= 1) {
            num.active = false;
        }
        else {
            num.active = true;
        }
        num.getComponent(cc.Label).string = "" + this.pet_info.pet_num;
    };
    PetItem.prototype.onClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showEquipInfoUi(this.hero_type, this.pet_info.pet_id, this.prop_action, {
            prop_id: this.pet_info.pet_id,
            prop_num: this.pet_info.pet_num,
            prop_price: this.prop_price,
            prop_cost_id: this.prop_cost,
        }, this.buy_callback, this.use_callback);
    };
    PetItem = __decorate([
        ccclass
    ], PetItem);
    return PetItem;
}(cc.Component));
exports.default = PetItem;

cc._RF.pop();