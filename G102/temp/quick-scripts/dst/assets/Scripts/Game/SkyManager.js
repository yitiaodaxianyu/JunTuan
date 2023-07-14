
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/SkyManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcU2t5TWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBd0U7QUFDeEUsNkNBQXdDO0FBR3hDLElBQUssWUFHSjtBQUhELFdBQUssWUFBWTtJQUNiLFFBQVE7SUFDUixtREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUhJLFlBQVksS0FBWixZQUFZLFFBR2hCO0FBRUssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVc7SUFBbkQ7O0lBeUJBLENBQUM7bUJBekJvQixVQUFVO0lBSWIsc0JBQVcsR0FBekI7UUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELDJCQUFNLEdBQU47UUFDSSxZQUFVLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRVMsOEJBQVMsR0FBbkI7UUFDSSxpQkFBTSxTQUFTLFdBQUUsQ0FBQztRQUNsQixZQUFVLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtJQUNmLHlDQUFvQixHQUFwQixVQUFxQixFQUFlLEVBQUMsR0FBVztRQUU1QyxJQUFJLElBQUksR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztJQXJCYyxvQkFBUyxHQUFlLElBQUksQ0FBQztJQUYzQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBeUI5QjtJQUFELGlCQUFDO0NBekJELEFBeUJDLENBekJ1QyxxQkFBVyxHQXlCbEQ7a0JBekJvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IE1hcE5vZGVQb29sIGZyb20gXCIuL01hcE5vZGVQb29sXCI7XHJcblxyXG5cclxuZW51bSBHcm91bmRaSW5kZXh7XHJcbiAgICAvKirpmLTlvbEgKi9cclxuICAgIHNoYWRvdz0xLFxyXG59XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNreU1hbmFnZXIgZXh0ZW5kcyBNYXBOb2RlUG9vbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTa3lNYW5hZ2VyID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6U2t5TWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIFNreU1hbmFnZXIuX2luc3RhbmNlPXRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcclxuICAgICAgICBTa3lNYW5hZ2VyLl9pbnN0YW5jZT1udWxsOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTliJvlu7rkuIDkuKrnibnmlYgqL1xyXG4gICAgY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQ6R2FtZUVmZmVjdElkLHBvczpjYy5WZWMyKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChpZCxwb3MsdGhpcy5ub2RlKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=