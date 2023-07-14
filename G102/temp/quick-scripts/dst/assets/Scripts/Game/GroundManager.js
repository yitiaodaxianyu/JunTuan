
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/GroundManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcR3JvdW5kTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBd0U7QUFDeEUsNkNBQXdDO0FBR3hDLElBQUssWUFJSjtBQUpELFdBQUssWUFBWTtJQUNiLFFBQVE7SUFDUixtREFBUSxDQUFBO0lBQ1IsK0NBQU0sQ0FBQTtBQUNWLENBQUMsRUFKSSxZQUFZLEtBQVosWUFBWSxRQUloQjtBQUVLLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFXO0lBQXREOztJQXdDQSxDQUFDO3NCQXhDb0IsYUFBYTtJQUloQix5QkFBVyxHQUF6QjtRQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsOEJBQU0sR0FBTjtRQUNJLGVBQWEsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFUyxpQ0FBUyxHQUFuQjtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLGVBQWEsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxlQUFlO0lBQ2YsNENBQW9CLEdBQXBCLFVBQXFCLEVBQWUsRUFBQyxHQUFXLEVBQUMsTUFBZTtRQUFmLHVCQUFBLEVBQUEsVUFBZTtRQUU1RCxJQUFJLElBQUksR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RixJQUFHLE1BQU0sRUFBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxHQUFXO1FBQ3BCLElBQUksTUFBTSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLGlDQUFZLENBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsTUFBTSxHQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDbEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELDRDQUFvQixHQUFwQixVQUFxQixNQUFjO1FBQy9CLElBQUksTUFBTSxHQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHlCQUF5QixDQUFDLGlDQUFZLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOztJQXJDYyx1QkFBUyxHQUFrQixJQUFJLENBQUM7SUFGOUIsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXdDakM7SUFBRCxvQkFBQztDQXhDRCxBQXdDQyxDQXhDMEMscUJBQVcsR0F3Q3JEO2tCQXhDb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXBOb2RlUG9vbCBmcm9tIFwiLi9NYXBOb2RlUG9vbFwiO1xyXG5cclxuXHJcbmVudW0gR3JvdW5kWkluZGV4e1xyXG4gICAgLyoq6Zi05b2xICovXHJcbiAgICBzaGFkb3c9MSxcclxuICAgIGRyb3A9MixcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmRNYW5hZ2VyIGV4dGVuZHMgTWFwTm9kZVBvb2wge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogR3JvdW5kTWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkdyb3VuZE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBHcm91bmRNYW5hZ2VyLl9pbnN0YW5jZT10aGlzOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcclxuICAgICAgICBHcm91bmRNYW5hZ2VyLl9pbnN0YW5jZT1udWxsOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTliJvlu7rkuIDkuKrnibnmlYgqL1xyXG4gICAgY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQ6R2FtZUVmZmVjdElkLHBvczpjYy5WZWMyLHpJbmRleDpudW1iZXI9MCk6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoaWQscG9zLHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYoekluZGV4KXtcclxuICAgICAgICAgICAgbm9kZS56SW5kZXg9ekluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTaGFkb3cocG9zOmNjLlZlYzIpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IHNoYWRvdz1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5zaGFkb3cscG9zLHRoaXMubm9kZSk7XHJcbiAgICAgICAgc2hhZG93LnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgc2hhZG93LnpJbmRleD1Hcm91bmRaSW5kZXguc2hhZG93O1xyXG4gICAgICAgIHJldHVybiBzaGFkb3c7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2hhZG93QnlQYXJlbnQocGFyZW50OmNjLk5vZGUpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IHNoYWRvdz1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5zaGFkb3csY2MudjIoMCwwKSxwYXJlbnQpO1xyXG4gICAgICAgIHNoYWRvdy56SW5kZXg9R3JvdW5kWkluZGV4LnNoYWRvdztcclxuICAgICAgICByZXR1cm4gc2hhZG93O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==