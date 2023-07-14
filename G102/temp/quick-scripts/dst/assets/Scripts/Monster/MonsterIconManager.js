
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/MonsterIconManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlckljb25NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBa0U7QUFFNUQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0Msc0NBQVk7SUFBcEQ7UUFBQSxxRUFnREM7UUE5Q0csT0FBTztRQUVQLGdCQUFVLEdBQWdCLElBQUksQ0FBQztRQUcvQixlQUFTLEdBQVcsSUFBSSxDQUFDOztJQXlDN0IsQ0FBQzsyQkFoRFksa0JBQWtCO0lBU2IsOEJBQVcsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVTLG1DQUFNLEdBQWhCO1FBQ0ksb0JBQWtCLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVTLHNDQUFTLEdBQW5CO1FBQ0ksb0JBQWtCLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQsU0FBUztJQUNELGlDQUFJLEdBQVo7SUFFQSxDQUFDO0lBRU0sd0NBQVcsR0FBbEIsVUFBbUIsSUFBVztRQUMxQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSw2Q0FBZ0IsR0FBdkIsVUFBd0IsU0FBZ0I7UUFDcEMsSUFBSSxVQUFVLEdBQUMsaUJBQWlCLEdBQUMsU0FBUyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sOENBQWlCLEdBQXhCLFVBQXlCLFNBQWdCLEVBQUMsS0FBWTtRQUNsRCxJQUFJLElBQUksR0FBQywwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUUsSUFBSSxLQUFLLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsSUFBSSxNQUFNLEdBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksVUFBVSxHQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxVQUFVLENBQUMsTUFBTSxHQUFDLEtBQUssR0FBQyxFQUFFLENBQUM7UUFDM0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEYsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQzs7SUE1Q2MsNEJBQVMsR0FBdUIsSUFBSSxDQUFDO0lBR3BEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MERBQ007SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFDSztJQVBoQixrQkFBa0I7UUFEOUIsT0FBTztPQUNLLGtCQUFrQixDQWdEOUI7SUFBRCx5QkFBQztDQWhERCxBQWdEQyxDQWhEdUMsRUFBRSxDQUFDLFNBQVMsR0FnRG5EO0FBaERZLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBNb25zdGVySWNvbk1hbmFnZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBNb25zdGVySWNvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/otYTmupAt5Zu+6ZuGXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICBpY29uX2F0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGljb25faXRlbTpjYy5QcmVmYWI9bnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TW9uc3Rlckljb25NYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBNb25zdGVySWNvbk1hbmFnZXIuX2luc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBNb25zdGVySWNvbk1hbmFnZXIuX2luc3RhbmNlPW51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTcEJ5TmFtZShuYW1lOnN0cmluZyk6Y2MuU3ByaXRlRnJhbWV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaWNvbl9hdGxhcy5nZXRTcHJpdGVGcmFtZShuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3BCeU1vbnN0ZXJJZChtb25zdGVySWQ6bnVtYmVyKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWNvblNwTmFtZT1cIkF2YXRhcl9Nb25zdGVyX1wiK21vbnN0ZXJJZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRTcEJ5TmFtZShpY29uU3BOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3JlYXRlTW9uc3Rlckljb24obW9uc3RlcklkOm51bWJlcixsZXZlbDpudW1iZXIpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IHR5cGU9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJlbmd0aFR5cGUobW9uc3RlcklkKTtcclxuICAgICAgICBsZXQgbUljb249Y2MuaW5zdGFudGlhdGUodGhpcy5pY29uX2l0ZW0pO1xyXG4gICAgICAgIGxldCBpY29uU3A9bUljb24uZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpY29uU3Auc3ByaXRlRnJhbWU9dGhpcy5nZXRTcEJ5TW9uc3RlcklkKG1vbnN0ZXJJZCk7XHJcbiAgICAgICAgbGV0IGxldmVsTGFiZWw9bUljb24uZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXZlbExhYmVsLnN0cmluZz1sZXZlbCsnJztcclxuICAgICAgICBtSWNvbi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmdldFNwQnlOYW1lKCdNb25zdGVyX2ZyYW1lXycrdHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIG1JY29uXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==