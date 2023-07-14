
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss1/BossAtt1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '25579MIF0RGF7tRjN39W9Dh', 'BossAtt1');
// Scripts/Boss/Boss1/BossAtt1.ts

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
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var BossBullet_1 = require("../BossBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossAtt1 = /** @class */ (function (_super) {
    __extends(BossAtt1, _super);
    function BossAtt1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**0：普通攻击的，1是技能的 */
        _this.bullet_type = 0;
        return _this;
    }
    BossAtt1.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossAtt1.prototype.onCollisionWall = function (wall) {
        if (wall) {
            switch (this.bullet_type) {
                case 0:
                    {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_att_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss1Attack);
                        }
                    }
                    break;
                case 1:
                    {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_skill_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss1Attack);
                        }
                    }
                    break;
            }
        }
    };
    __decorate([
        property()
    ], BossAtt1.prototype, "bullet_type", void 0);
    BossAtt1 = __decorate([
        ccclass
    ], BossAtt1);
    return BossAtt1;
}(BossBullet_1.default));
exports.default = BossAtt1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczFcXEJvc3NBdHQxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUFpRjtBQUNqRixpREFBNEM7QUFFNUMsNkRBQXdEO0FBRXhELDRDQUF1QztBQUVqQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBVTtJQUFoRDtRQUFBLHFFQW1DQztRQWpDRyxtQkFBbUI7UUFFbkIsaUJBQVcsR0FBUSxDQUFDLENBQUM7O0lBK0J6QixDQUFDO0lBN0JHLHlCQUFNLEdBQU47UUFDSSxpQkFBTSxzQkFBc0IsWUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGtHQUFrRztJQUNsRyxrQ0FBZSxHQUFmLFVBQWdCLElBQVM7UUFDckIsSUFBRyxJQUFJLEVBQUM7WUFDSixRQUFPLElBQUksQ0FBQyxXQUFXLEVBQUM7Z0JBQ3BCLEtBQUssQ0FBQztvQkFBQzt3QkFDSCxJQUFJLElBQUksR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO3dCQUM5QyxpQkFBTSxXQUFXLFdBQUUsQ0FBQzt3QkFDcEIsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUMsQ0FBQyxFQUFDOzRCQUNyQix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLG9CQUFvQixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs0QkFDakgscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7eUJBQ2hGO3FCQUNKO29CQUFBLE1BQU07Z0JBQ1AsS0FBSyxDQUFDO29CQUFDO3dCQUNILElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7d0JBQzlDLGlCQUFNLFdBQVcsV0FBRSxDQUFDO3dCQUNwQixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7NEJBQ3JCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOzRCQUNuSCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDaEY7cUJBQ0o7b0JBQUEsTUFBTTthQUVWO1NBRUo7SUFDTCxDQUFDO0lBOUJEO1FBREMsUUFBUSxFQUFFO2lEQUNVO0lBSkosUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW1DNUI7SUFBRCxlQUFDO0NBbkNELEFBbUNDLENBbkNxQyxvQkFBVSxHQW1DL0M7a0JBbkNvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxcIjtcclxuaW1wb3J0IEJvc3NCdWxsZXQgZnJvbSBcIi4uL0Jvc3NCdWxsZXRcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9zc0F0dDEgZXh0ZW5kcyBCb3NzQnVsbGV0IHtcclxuXHJcbiAgICAvKiow77ya5pmu6YCa5pS75Ye755qE77yMMeaYr+aKgOiDveeahCAqL1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGJ1bGxldF90eXBlOm51bWJlcj0wO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25XYWxsTGlzdGVuKHRoaXMub25Db2xsaXNpb25XYWxsKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t56Kw5pKe5byA5aeLLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Db2xsaXNpb25XYWxsKHdhbGw6V2FsbCkge1xyXG4gICAgICAgIGlmKHdhbGwpe1xyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5idWxsZXRfdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPXdhbGwuYmVJbmp1cmVkKHRoaXMubW9uc3Rlcl9hdHRfZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9ub3JtYWxfYXR0X2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzMUF0dGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT13YWxsLmJlSW5qdXJlZCh0aGlzLm1vbnN0ZXJfYXR0X2RhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYm9zczFfbm9ybWFsX3NraWxsX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzMUF0dGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==