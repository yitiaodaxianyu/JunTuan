
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Enemy/EnemyIcon/EnemyIconManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1efc4FkC9dDerf4pTb85GkQ', 'EnemyIconManager');
// Scripts/Enemy/EnemyIcon/EnemyIconManager.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EnemyIconManager = /** @class */ (function (_super) {
    __extends(EnemyIconManager, _super);
    function EnemyIconManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //资源
        _this.icon_atlas = null;
        return _this;
    }
    EnemyIconManager_1 = EnemyIconManager;
    EnemyIconManager.getInstance = function () {
        return this._instance;
    };
    EnemyIconManager.prototype.onLoad = function () {
        EnemyIconManager_1._instance = this;
    };
    EnemyIconManager.prototype.onDestroy = function () {
        EnemyIconManager_1._instance = null;
    };
    EnemyIconManager.prototype.getSpByName = function (name) {
        return this.icon_atlas.getSpriteFrame(name);
    };
    var EnemyIconManager_1;
    EnemyIconManager._instance = null;
    __decorate([
        property(cc.SpriteAtlas)
    ], EnemyIconManager.prototype, "icon_atlas", void 0);
    EnemyIconManager = EnemyIconManager_1 = __decorate([
        ccclass
    ], EnemyIconManager);
    return EnemyIconManager;
}(cc.Component));
exports.default = EnemyIconManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRW5lbXlcXEVuZW15SWNvblxcRW5lbXlJY29uTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQXFCQztRQW5CRyxJQUFJO1FBRUosZ0JBQVUsR0FBZ0IsSUFBSSxDQUFDOztJQWlCbkMsQ0FBQzt5QkFyQm9CLGdCQUFnQjtJQU1uQiw0QkFBVyxHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRVMsaUNBQU0sR0FBaEI7UUFDSSxrQkFBZ0IsQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFUyxvQ0FBUyxHQUFuQjtRQUNJLGtCQUFnQixDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVNLHNDQUFXLEdBQWxCLFVBQW1CLElBQVc7UUFDMUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOztJQW5CYywwQkFBUyxHQUFxQixJQUFJLENBQUM7SUFHbEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt3REFDTTtJQUpkLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBcUJwQztJQUFELHVCQUFDO0NBckJELEFBcUJDLENBckI2QyxFQUFFLENBQUMsU0FBUyxHQXFCekQ7a0JBckJvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlJY29uTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEVuZW15SWNvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/otYTmupBcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIGljb25fYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6RW5lbXlJY29uTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIEVuZW15SWNvbk1hbmFnZXIuX2luc3RhbmNlPXRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBFbmVteUljb25NYW5hZ2VyLl9pbnN0YW5jZT1udWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTcEJ5TmFtZShuYW1lOnN0cmluZyk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbl9hdGxhcy5nZXRTcHJpdGVGcmFtZShuYW1lKTtcclxuICAgIH1cclxufSJdfQ==