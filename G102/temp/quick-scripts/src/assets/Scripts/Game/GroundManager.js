"use strict";
cc._RF.push(module, 'f098ckyQIZCW6q93ica7GMM', 'GroundManager');
// Scripts/Game/GroundManager.ts

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
var GameEffectsManager_1 = require("./GameEffectsManager");
var MapNodePool_1 = require("./MapNodePool");
var GroundZIndex;
(function (GroundZIndex) {
    /**阴影 */
    GroundZIndex[GroundZIndex["shadow"] = 1] = "shadow";
    GroundZIndex[GroundZIndex["drop"] = 2] = "drop";
})(GroundZIndex || (GroundZIndex = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GroundManager = /** @class */ (function (_super) {
    __extends(GroundManager, _super);
    function GroundManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroundManager_1 = GroundManager;
    GroundManager.getInstance = function () {
        return this._instance;
    };
    GroundManager.prototype.onLoad = function () {
        GroundManager_1._instance = this;
    };
    GroundManager.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        GroundManager_1._instance = null;
    };
    /**根据id创建一个特效*/
    GroundManager.prototype.createGameEffectById = function (id, pos, zIndex) {
        if (zIndex === void 0) { zIndex = 0; }
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(id, pos, this.node);
        if (zIndex) {
            node.zIndex = zIndex;
        }
        return node;
    };
    GroundManager.prototype.createShadow = function (pos) {
        var shadow = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.shadow, pos, this.node);
        shadow.setPosition(pos);
        shadow.zIndex = GroundZIndex.shadow;
        return shadow;
    };
    GroundManager.prototype.createShadowByParent = function (parent) {
        var shadow = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.shadow, cc.v2(0, 0), parent);
        shadow.zIndex = GroundZIndex.shadow;
        return shadow;
    };
    var GroundManager_1;
    GroundManager._instance = null;
    GroundManager = GroundManager_1 = __decorate([
        ccclass
    ], GroundManager);
    return GroundManager;
}(MapNodePool_1.default));
exports.default = GroundManager;

cc._RF.pop();