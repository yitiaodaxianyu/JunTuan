"use strict";
cc._RF.push(module, '5f1ddYz+2pIgrch/Ixf4ypi', 'HeroItem');
// Scripts/Hero/Ui/HeroItem.ts

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
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PropManager_1 = require("../../Prop/PropManager");
var HeroAttribute_1 = require("../Data/HeroAttribute");
var HeroBaseInfo_1 = require("../Data/HeroBaseInfo");
var HeroManager_1 = require("../Data/HeroManager");
var HeroQuality_1 = require("../Data/HeroQuality");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroItem = /** @class */ (function (_super) {
    __extends(HeroItem, _super);
    function HeroItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = -1;
        return _this;
    }
    HeroItem.prototype.init = function (heroType, heroDebris) {
        this.hero_type = heroType;
        if (HeroManager_1.HeroManager.getInstance().getHeroInfo(heroType) != null) {
            this.initHeroItem(heroType, heroDebris);
        }
        else {
            this.initLockHeroItem(heroType, heroDebris);
        }
    };
    /**已拥有英雄初始化 */
    HeroItem.prototype.initHeroItem = function (heroType, heroDebris) {
        this.hero_type = heroType;
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        this.node.getChildByName("name").active = false;
        this.node.getChildByName("shangzheng").active = false;
        var info = HeroManager_1.HeroManager.getInstance().getHeroInfo(heroType);
        this.node.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality + '_0');
        this.node.getChildByName('box').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality + '_1');
        this.node.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getHeroBody(heroType);
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType, HeroManager_1.HeroManager.getInstance().getHeroStage(heroType));
        if (star == 5) {
            this.node.getChildByName("max").active = true;
            this.node.getChildByName("num").active = false;
            this.node.getChildByName("bar").active = false;
            this.node.getChildByName("progressBar").active = false;
            this.node.getChildByName('star').active = true;
            this.node.getChildByName('star').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Star_' + star);
        }
        else if (star > 0) {
            this.node.getChildByName("max").active = false;
            this.node.getChildByName("num").active = true;
            this.node.getChildByName("bar").active = true;
            this.node.getChildByName("progressBar").active = true;
            this.node.getChildByName('star').active = true;
            this.node.getChildByName('star').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Star_' + star);
        }
        else {
            this.node.getChildByName("max").active = false;
            this.node.getChildByName("num").active = true;
            this.node.getChildByName("bar").active = true;
            this.node.getChildByName("progressBar").active = true;
            this.node.getChildByName('star').active = false;
        }
        var num = PropManager_1.PropManager.getInstance().getPropNum(heroDebris);
        var sum = HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(info.hero_quality, info.hero_stage);
        if (num >= sum) {
            this.node.getChildByName('bar').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Bar_1_1');
        }
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = num / sum;
        this.node.getChildByName('num').getComponent(cc.Label).string = num + '/' + sum;
        this.node.getChildByName('level').getComponentInChildren(cc.Label).string = 'Lv' + info.hero_level;
        this.node.getChildByName('level').active = true;
        this.node.getChildByName('lock').active = false;
    };
    /**为拥有英雄初始化 */
    HeroItem.prototype.initLockHeroItem = function (heroType, heroDebris) {
        this.hero_type = heroType;
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        this.node.getChildByName("name").active = false;
        this.node.getChildByName("shangzheng").active = false;
        // let quality = HeroBaseInfoManager.getInstance().getQuality(heroType);
        this.node.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality + '_0');
        this.node.getChildByName('box').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality + '_1');
        this.node.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getHeroBody(heroType);
        var num = PropManager_1.PropManager.getInstance().getPropNum(heroDebris);
        var sum = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getUnlockFragmentNum(heroType);
        if (num >= sum) {
            this.node.getChildByName('bar').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Bar_1_1');
        }
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = num / sum;
        this.node.getChildByName('num').getComponent(cc.Label).string = num + '/' + sum;
        this.node.getChildByName('level').active = false;
        this.node.getChildByName('star').active = false;
        this.node.getChildByName('lock').active = true;
    };
    /**出战界面刷新英雄icon*/
    HeroItem.prototype.RefreshHeroesItem = function (heroType) {
        this.hero_type = heroType;
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        this.node.getChildByName("name").active = true;
        this.node.getChildByName("shangzheng").active = false;
        this.node.getChildByName("progressBar").active = false;
        this.node.getChildByName("bar").active = false;
        this.node.getChildByName("num").active = false;
        var info = HeroManager_1.HeroManager.getInstance().getHeroInfo(heroType);
        this.node.getChildByName("name").getComponent(TextLanguage_1.default).setTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getNameText_ID(heroType));
        var Quality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(heroType);
        var color = [new cc.Color(67, 43, 21), new cc.Color(19, 66, 19), new cc.Color(19, 51, 80), new cc.Color(36, 19, 80), new cc.Color(46, 29, 19)];
        this.node.getChildByName("name").getComponent(cc.LabelOutline).color = color[Quality - 1];
        this.node.getChildByName('bg').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality + '_0');
        this.node.getChildByName('box').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Frame_' + heroBaseInfo.Quality + '_1');
        this.node.getChildByName('mask').getChildByName('icon').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getHeroBody(heroType);
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType, HeroManager_1.HeroManager.getInstance().getHeroStage(heroType));
        this.node.getChildByName('star').getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByName('HeroList_Star_' + star);
        this.node.getChildByName('level').getComponentInChildren(cc.Label).string = 'Lv' + info.hero_level;
        this.node.getChildByName('RedTip').active = false;
    };
    HeroItem = __decorate([
        ccclass
    ], HeroItem);
    return HeroItem;
}(cc.Component));
exports.default = HeroItem;

cc._RF.pop();