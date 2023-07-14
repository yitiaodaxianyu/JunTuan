
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/EliteAtt67.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7152fK29rZA7bUnOZTANWk/', 'EliteAtt67');
// Scripts/Monster/Elite/EliteAtt67.ts

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
var BossBullet_1 = require("../../Boss/BossBullet");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EliteAtt67 = /** @class */ (function (_super) {
    __extends(EliteAtt67, _super);
    function EliteAtt67() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_hero = HeroConfig_1.Hero_Type.NULL;
        return _this;
    }
    EliteAtt67.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    EliteAtt67.prototype.onCollisionWall = function (wall) {
        if (wall) {
            var data = wall.beInjured(this.monster_att_data);
            _super.prototype.destroySelf.call(this);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster67_shuijingyoulong_att_hit, this.node.getPosition());
            }
        }
    };
    EliteAtt67 = __decorate([
        ccclass
    ], EliteAtt67);
    return EliteAtt67;
}(BossBullet_1.default));
exports.default = EliteAtt67;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlQXR0NjcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQStDO0FBQy9DLG9FQUFpRjtBQUdqRix5REFBeUU7QUFNbkUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVU7SUFBbEQ7UUFBQSxxRUFrQkM7UUFoQkcsY0FBUSxHQUFXLHNCQUFTLENBQUMsSUFBSSxDQUFDOztJQWdCdEMsQ0FBQztJQWRHLDJCQUFNLEdBQU47UUFDSSxpQkFBTSxzQkFBc0IsWUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGtHQUFrRztJQUNsRyxvQ0FBZSxHQUFmLFVBQWdCLElBQVM7UUFDckIsSUFBRyxJQUFJLEVBQUM7WUFDSixJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1lBQzlDLGlCQUFNLFdBQVcsV0FBRSxDQUFDO1lBQ3BCLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQztnQkFDckIsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyxpQ0FBaUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDakk7U0FDSjtJQUNMLENBQUM7SUFqQmdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FrQjlCO0lBQUQsaUJBQUM7Q0FsQkQsQUFrQkMsQ0FsQnVDLG9CQUFVLEdBa0JqRDtrQkFsQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9zc0J1bGxldCBmcm9tIFwiLi4vLi4vQm9zcy9Cb3NzQnVsbGV0XCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBGZWVkQmFja1R5cGUgfSBmcm9tIFwiLi4vTW9uc3RlckRhdGFcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsaXRlQXR0NjcgZXh0ZW5kcyBCb3NzQnVsbGV0IHtcclxuXHJcbiAgICBhdHRfaGVybzpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEw7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmFkZENvbGxpc2lvbldhbGxMaXN0ZW4odGhpcy5vbkNvbGxpc2lvbldhbGwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3norDmkp7lvIDlp4stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkNvbGxpc2lvbldhbGwod2FsbDpXYWxsKSB7XHJcbiAgICAgICAgaWYod2FsbCl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhPXdhbGwuYmVJbmp1cmVkKHRoaXMubW9uc3Rlcl9hdHRfZGF0YSlcclxuICAgICAgICAgICAgc3VwZXIuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNjdfc2h1aWppbmd5b3Vsb25nX2F0dF9oaXQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==