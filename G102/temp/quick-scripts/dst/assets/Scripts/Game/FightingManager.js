
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/FightingManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed9ebjDJ7FN1px5YACYBAGv', 'FightingManager');
// Scripts/Game/FightingManager.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FightingManager = /** @class */ (function (_super) {
    __extends(FightingManager, _super);
    function FightingManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FightingManager_1 = FightingManager;
    FightingManager.getInstance = function () {
        return this._instance;
    };
    FightingManager.prototype.onLoad = function () {
        FightingManager_1._instance = this;
    };
    FightingManager.prototype.onDestroy = function () {
        FightingManager_1._instance = null;
    };
    /**根据id创建一个特效*/
    FightingManager.prototype.createGameEffectById = function (id, pos) {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(id, pos, this.node);
        return node;
    };
    FightingManager.prototype.addChild = function (node, pos) {
        this.node.addChild(node);
        node.setPosition(pos);
    };
    var FightingManager_1;
    FightingManager._instance = null;
    FightingManager = FightingManager_1 = __decorate([
        ccclass
    ], FightingManager);
    return FightingManager;
}(cc.Component));
exports.default = FightingManager;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcRmlnaHRpbmdNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUF3RTtBQUdsRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBWTtJQUF6RDs7SUE0QkEsQ0FBQzt3QkE1Qm9CLGVBQWU7SUFJbEIsMkJBQVcsR0FBekI7UUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDSSxpQkFBZSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVTLG1DQUFTLEdBQW5CO1FBQ0ksaUJBQWUsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxlQUFlO0lBQ2YsOENBQW9CLEdBQXBCLFVBQXFCLEVBQWUsRUFBQyxHQUFXO1FBRTVDLElBQUksSUFBSSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RGLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxrQ0FBUSxHQUFSLFVBQVMsSUFBWSxFQUFDLEdBQVc7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDOztJQXpCYyx5QkFBUyxHQUFvQixJQUFJLENBQUM7SUFGaEMsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQTRCbkM7SUFBRCxzQkFBQztDQTVCRCxBQTRCQyxDQTVCNEMsRUFBRSxDQUFDLFNBQVMsR0E0QnhEO2tCQTVCb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWdodGluZ01hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRmlnaHRpbmdNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6RmlnaHRpbmdNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgRmlnaHRpbmdNYW5hZ2VyLl9pbnN0YW5jZT10aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgRmlnaHRpbmdNYW5hZ2VyLl9pbnN0YW5jZT1udWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNrmlk5Yib5bu65LiA5Liq54m55pWIKi9cclxuICAgIGNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkOkdhbWVFZmZlY3RJZCxwb3M6Y2MuVmVjMik6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoaWQscG9zLHRoaXMubm9kZSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDaGlsZChub2RlOmNjLk5vZGUscG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICB9XHJcbn1cclxuIl19