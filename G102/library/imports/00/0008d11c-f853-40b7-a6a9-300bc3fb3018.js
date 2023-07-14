"use strict";
cc._RF.push(module, '0008dEc+FNAt6apMAvD+zAY', 'SkyManager');
// Scripts/Game/SkyManager.ts

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
})(GroundZIndex || (GroundZIndex = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkyManager = /** @class */ (function (_super) {
    __extends(SkyManager, _super);
    function SkyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkyManager_1 = SkyManager;
    SkyManager.getInstance = function () {
        return this._instance;
    };
    SkyManager.prototype.onLoad = function () {
        SkyManager_1._instance = this;
    };
    SkyManager.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        SkyManager_1._instance = null;
    };
    /**根据id创建一个特效*/
    SkyManager.prototype.createGameEffectById = function (id, pos) {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(id, pos, this.node);
        return node;
    };
    var SkyManager_1;
    SkyManager._instance = null;
    SkyManager = SkyManager_1 = __decorate([
        ccclass
    ], SkyManager);
    return SkyManager;
}(MapNodePool_1.default));
exports.default = SkyManager;

cc._RF.pop();