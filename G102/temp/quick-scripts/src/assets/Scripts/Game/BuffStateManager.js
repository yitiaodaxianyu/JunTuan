"use strict";
cc._RF.push(module, 'b2406dy0pRJr75zJm2cmoXk', 'BuffStateManager');
// Scripts/Game/BuffStateManager.ts

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
var MapNodePool_1 = require("./MapNodePool");
var BuffState_1 = require("../Hero/Game/BuffState");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuffStateManager = /** @class */ (function (_super) {
    __extends(BuffStateManager, _super);
    function BuffStateManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui_atlas = null;
        return _this;
    }
    BuffStateManager_1 = BuffStateManager;
    BuffStateManager.getInstance = function () {
        return this._instance;
    };
    BuffStateManager.prototype.getSpByName = function (name) {
        return this.ui_atlas.getSpriteFrame(name);
    };
    BuffStateManager.prototype.onLoad = function () {
        BuffStateManager_1._instance = this;
    };
    BuffStateManager.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        BuffStateManager_1._instance = null;
    };
    BuffStateManager.prototype.createBuffRoot = function (pos, heroType) {
        var node = new cc.Node('' + heroType);
        var layout = node.addComponent(cc.Layout);
        layout.type = cc.Layout.Type.HORIZONTAL;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        node.setPosition(pos);
        this.node.addChild(node);
    };
    /**根据id创建一个特效*/
    BuffStateManager.prototype.createBuffState = function (type, heroType) {
        var node = new cc.Node('' + type);
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = this.getSpByName("Buff_Icon_" + type);
        //根据英雄找到对应的root位置
        var root = this.node.getChildByName('' + heroType);
        root.addChild(node);
        var buffTS = node.addComponent(BuffState_1.default);
        return buffTS;
    };
    /**根据id创建一个特效*/
    BuffStateManager.prototype.createDeBuffState = function (type, heroType) {
        var node = new cc.Node('' + type);
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = this.getSpByName("Debuff_Icon_" + type);
        //根据英雄找到对应的root位置
        var root = this.node.getChildByName('' + heroType);
        root.addChild(node);
        var buffTS = node.addComponent(BuffState_1.default);
        return buffTS;
    };
    BuffStateManager.prototype.getBuffType = function (buffId) {
        var type = [];
        switch (buffId) {
            case HeroConfig_1.BuffId.Hero_MeiMo_GongSu:
            case HeroConfig_1.BuffId.Pet3_JiaSu:
            case HeroConfig_1.BuffId.Hero_ZhenDe_Gongsu:
            case HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao:
            case HeroConfig_1.BuffId.Hero_ChangMaoShow_GongSu:
                {
                    type.push(HeroConfig_1.BuffStateType.AttackSpeed);
                }
                break;
            case HeroConfig_1.BuffId.Hero_ZhenDe_BaoJiMingZhongLv:
                {
                    type.push(HeroConfig_1.BuffStateType.CritRate);
                    type.push(HeroConfig_1.BuffStateType.HitRate);
                }
                break;
        }
        return type;
    };
    BuffStateManager.prototype.getDeBuffType = function (buffId) {
        var type = [];
        switch (buffId) {
            case HeroConfig_1.BuffId.Boss6_Skill_2_jiangongsu:
            case HeroConfig_1.BuffId.Boss3_JIAN_GongSu:
                {
                    type.push(HeroConfig_1.BuffStateType.AttackSpeed);
                }
                break;
            case HeroConfig_1.BuffId.Boss8_Skill_2_attack:
                {
                    type.push(HeroConfig_1.BuffStateType.Attack);
                }
                break;
        }
        return type;
    };
    var BuffStateManager_1;
    BuffStateManager._instance = null;
    __decorate([
        property(cc.SpriteAtlas)
    ], BuffStateManager.prototype, "ui_atlas", void 0);
    BuffStateManager = BuffStateManager_1 = __decorate([
        ccclass
    ], BuffStateManager);
    return BuffStateManager;
}(MapNodePool_1.default));
exports.default = BuffStateManager;

cc._RF.pop();