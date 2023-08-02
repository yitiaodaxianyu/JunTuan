"use strict";
cc._RF.push(module, 'bad72UFVRVGIrpGS0ROz7Gt', 'HeroUpItem');
// Scripts/Game/Ui/HeroUpItem.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var HeroBaseInfo_1 = require("../../Hero/Data/HeroBaseInfo");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var PropManager_1 = require("../../Prop/PropManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroUpItem = /** @class */ (function (_super) {
    __extends(HeroUpItem, _super);
    function HeroUpItem() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this.labelTip = null;
        _this.labelContent = null;
        _this.labelLvl = null;
        _this.icon = null;
        _this.bg = null;
        _this.headBG = null;
        return _this;
        // update (dt) {}
    }
    HeroUpItem.prototype.start = function () {
    };
    HeroUpItem.prototype.initData = function (n) {
        this.dataType = n;
        var hero = GameManager_1.default.getInstance().all_hero.get(this.dataType);
        var lvN = hero.hero_lvl;
        this.labelLvl.string = "lv" + (lvN + 1);
        this.icon.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpheadPortraitType(this.dataType);
        this.headBG.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpFrameByExType(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(hero.hero_type) - 1);
        this.bg.getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(hero.hero_type) + '_0');
        this.labelTip.string = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getNameText_ID(this.dataType));
        this.labelContent.string = "下一等级：" + GameManager_1.default.getInstance().herUpContent[hero.hero_type][lvN + 1];
        // this.labelTip.string = GameManager.getInstance().charioTip[n];
        // this.labelContent.string = GameManager.getInstance().charioContent[n];
    };
    HeroUpItem.prototype.getDataType = function () {
        return this.dataType;
    };
    __decorate([
        property(cc.Label)
    ], HeroUpItem.prototype, "labelTip", void 0);
    __decorate([
        property(cc.Label)
    ], HeroUpItem.prototype, "labelContent", void 0);
    __decorate([
        property(cc.Label)
    ], HeroUpItem.prototype, "labelLvl", void 0);
    __decorate([
        property(cc.Node)
    ], HeroUpItem.prototype, "icon", void 0);
    __decorate([
        property(cc.Node)
    ], HeroUpItem.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], HeroUpItem.prototype, "headBG", void 0);
    HeroUpItem = __decorate([
        ccclass
    ], HeroUpItem);
    return HeroUpItem;
}(cc.Component));
exports.default = HeroUpItem;

cc._RF.pop();