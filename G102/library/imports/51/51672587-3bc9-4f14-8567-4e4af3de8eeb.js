"use strict";
cc._RF.push(module, '51672WHO8lPFIVnTkrz3o7r', 'CityUi');
// Scripts/City/CityUi.ts

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
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CityUi = /** @class */ (function (_super) {
    __extends(CityUi, _super);
    function CityUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CityUi.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    CityUi.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.POSITION_CHANGED, this.onPositionChange, this);
    };
    CityUi.prototype.onPositionChange = function () {
        if (this.node.x == 0) {
            this.onEnable();
        }
    };
    CityUi.prototype.start = function () {
        //UIManager.getInstance().preloadPrefab('ui/home/wishing_ui');
    };
    CityUi.prototype.onEnable = function () {
        this.initUi();
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.主城打开次数);
    };
    CityUi.prototype.initUi = function () {
        // this.node.getChildByName("petHomeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.LongChao));
        // this.node.getChildByName("storeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.ShangDian));
        // this.node.getChildByName("blacksmithLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.TieJiangPu));
        // this.node.getChildByName("wishingLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.XuYuanChi));
        // this.node.getChildByName("templeLabel").getComponent(cc.Label).string = LanguageManager.getInstance().getStrByTextId(FunctionDefinitionManager.getInstance().getTextID(FuncType.Shengtang));
        // 铁匠铺
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.TieJiangPu)) {
        //     this.node.getChildByName("blacksmith").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("blacksmithLock").active = true;
        //     this.node.getChildByName("blacksmisthBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("blacksmith").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // } else {
        //     this.node.getChildByName("blacksmith").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("blacksmithLock").active = false;
        //     this.node.getChildByName("blacksmisthBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("blacksmith").on(cc.Node.EventType.TOUCH_END, () => {
        //         this.node.getChildByName("equip").active = true;
        //     });
        // }
        // // 龙巢
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.LongChao)) {
        //     this.node.getChildByName("petHome").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHomeLock").active = true;
        //     this.node.getChildByName("petHomeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.LongChao));
        //     });
        // } else {
        //     this.node.getChildByName("petHome").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("petHomeLock").active = false;
        //     this.node.getChildByName("petHomeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // }
        // // 圣堂
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.Shengtang)) {
        //     this.node.getChildByName("temple").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("templeLock").active = true;
        //     this.node.getChildByName("templeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.Shengtang));
        //     });
        // } else {
        //     this.node.getChildByName("temple").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("templeLock").active = false;
        //     this.node.getChildByName("templeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("temple").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // }
        // // 商店
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.ShangDian)) {
        //     this.node.getChildByName("store").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("storeLock").active = true;
        //     this.node.getChildByName("storeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.ShangDian));
        //     });
        // } else {
        //     this.node.getChildByName("store").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("storeLock").active = false;
        //     this.node.getChildByName("storeBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("store").on(cc.Node.EventType.TOUCH_END, () => {
        //         UIManager.getInstance().showGoldMallUi(null);
        //     });
        // }
        // // 许愿池
        // if (!FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.XuYuanChi)) {
        //     this.node.getChildByName("wishing").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("wishingLock").active = true;
        //     this.node.getChildByName("wishingBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.node.getChildByName("petHome").on(cc.Node.EventType.TOUCH_END, () => {
        //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getString(LanguageIndex.UnlockAfter)+LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+FunctionDefinitionManager.getInstance().getUnlockCondictionParameter(FuncType.XuYuanChi));
        //     });
        // } else {
        //     this.node.getChildByName("wishing").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("wishingLock").active = false;
        //     this.node.getChildByName("wishingBg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     this.node.getChildByName("wishing").on(cc.Node.EventType.TOUCH_END, () => {
        //     });
        // }
    };
    CityUi = __decorate([
        ccclass
    ], CityUi);
    return CityUi;
}(cc.Component));
exports.default = CityUi;

cc._RF.pop();