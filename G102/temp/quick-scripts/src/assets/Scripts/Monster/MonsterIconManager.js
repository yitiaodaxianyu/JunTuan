"use strict";
cc._RF.push(module, '3d5a1LLoQZI5qhWzYUX4a5I', 'MonsterIconManager');
// Scripts/Monster/MonsterIconManager.ts

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
exports.MonsterIconManager = void 0;
var MonsterConfigure_1 = require("./Data/MonsterConfigure");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MonsterIconManager = /** @class */ (function (_super) {
    __extends(MonsterIconManager, _super);
    function MonsterIconManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //资源-图集
        _this.icon_atlas = null;
        _this.icon_item = null;
        return _this;
    }
    MonsterIconManager_1 = MonsterIconManager;
    MonsterIconManager.getInstance = function () {
        return this._instance;
    };
    MonsterIconManager.prototype.onLoad = function () {
        MonsterIconManager_1._instance = this;
        this.init();
    };
    MonsterIconManager.prototype.onDestroy = function () {
        MonsterIconManager_1._instance = null;
    };
    //初始化游戏数据
    MonsterIconManager.prototype.init = function () {
    };
    MonsterIconManager.prototype.getSpByName = function (name) {
        return this.icon_atlas.getSpriteFrame(name);
    };
    MonsterIconManager.prototype.getSpByMonsterId = function (monsterId) {
        var iconSpName = "Avatar_Monster_" + monsterId;
        return this.getSpByName(iconSpName);
    };
    MonsterIconManager.prototype.createMonsterIcon = function (monsterId, level) {
        var type = MonsterConfigure_1.MonsterConfigureManager.getInstance().getStrengthType(monsterId);
        var mIcon = cc.instantiate(this.icon_item);
        var iconSp = mIcon.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = this.getSpByMonsterId(monsterId);
        var levelLabel = mIcon.getChildByName('level').getComponent(cc.Label);
        levelLabel.string = level + '';
        mIcon.getComponent(cc.Sprite).spriteFrame = this.getSpByName('Monster_frame_' + type);
        return mIcon;
    };
    var MonsterIconManager_1;
    MonsterIconManager._instance = null;
    __decorate([
        property(cc.SpriteAtlas)
    ], MonsterIconManager.prototype, "icon_atlas", void 0);
    __decorate([
        property(cc.Prefab)
    ], MonsterIconManager.prototype, "icon_item", void 0);
    MonsterIconManager = MonsterIconManager_1 = __decorate([
        ccclass
    ], MonsterIconManager);
    return MonsterIconManager;
}(cc.Component));
exports.MonsterIconManager = MonsterIconManager;

cc._RF.pop();