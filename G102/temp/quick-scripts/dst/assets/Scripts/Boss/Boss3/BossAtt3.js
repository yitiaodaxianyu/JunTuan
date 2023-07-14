
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss3/BossAtt3.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4f19H+3EdClb7jNibHyHIt', 'BossAtt3');
// Scripts/Boss/Boss3/BossAtt3.ts

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
var BuffData_1 = require("../../Hero/Game/BuffData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var WallConfig_1 = require("../../Wall/WallConfig");
var BossBullet_1 = require("../BossBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossAtt3 = /** @class */ (function (_super) {
    __extends(BossAtt3, _super);
    function BossAtt3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bullect_type = 0;
        _this.remain_time = 0;
        _this.buff_value = 0;
        return _this;
    }
    BossAtt3.prototype.onLoad = function () {
        _super.prototype.addCollisionWallListen.call(this, this.onCollisionWall);
    };
    BossAtt3.prototype.setBuffData = function (remainTime, value) {
        this.remain_time = remainTime;
        this.buff_value = value;
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossAtt3.prototype.onCollisionWall = function (wall) {
        var _this = this;
        switch (this.bullect_type) {
            case 0:
                {
                    if (wall) {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_normal_attack_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss3Skill1mingzhong);
                        }
                    }
                }
                break;
            case 1:
                {
                    if (wall) {
                        var data = wall.beInjured(this.monster_att_data);
                        _super.prototype.destroySelf.call(this);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss3_skill_1_hit, this.node.getPosition());
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss3Skill1mingzhong);
                        }
                        if (wall.getWallType() == WallConfig_1.WallType.Main) {
                            MyTool_1.default.randomSceneShakeBig();
                            //减攻速
                            GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Boss3_JIAN_GongSu;
                                buffData.remain_time = _this.remain_time;
                                buffData.buff_value = [_this.buff_value];
                                v.addDeBuff(buffData);
                            });
                        }
                    }
                }
                break;
        }
    };
    __decorate([
        property()
    ], BossAtt3.prototype, "bullect_type", void 0);
    BossAtt3 = __decorate([
        ccclass
    ], BossAtt3);
    return BossAtt3;
}(BossBullet_1.default));
exports.default = BossAtt3;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczNcXEJvc3NBdHQzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUFpRjtBQUNqRixpREFBNEM7QUFDNUMscURBQW9EO0FBQ3BELHlEQUFvRDtBQUNwRCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBRXhDLG9EQUFpRDtBQUNqRCw0Q0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVU7SUFBaEQ7UUFBQSxxRUFxREM7UUFsREcsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFFdEIsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsZ0JBQVUsR0FBUSxDQUFDLENBQUM7O0lBK0N4QixDQUFDO0lBN0NHLHlCQUFNLEdBQU47UUFDSSxpQkFBTSxzQkFBc0IsWUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxVQUFpQixFQUFDLEtBQVk7UUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBQyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELGtHQUFrRztJQUNsRyxrQ0FBZSxHQUFmLFVBQWdCLElBQVM7UUFBekIsaUJBa0NDO1FBakNHLFFBQU8sSUFBSSxDQUFDLFlBQVksRUFBQztZQUNyQixLQUFLLENBQUM7Z0JBQUM7b0JBQ0gsSUFBRyxJQUFJLEVBQUM7d0JBQ0osSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTt3QkFDOUMsaUJBQU0sV0FBVyxXQUFFLENBQUM7d0JBQ3BCLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQzs0QkFDckIsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7NEJBQ3BILHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7eUJBQ3pGO3FCQUNKO2lCQUNKO2dCQUFBLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQUM7b0JBQ0gsSUFBRyxJQUFJLEVBQUM7d0JBQ0osSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTt3QkFDOUMsaUJBQU0sV0FBVyxXQUFFLENBQUM7d0JBQ3BCLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQzs0QkFDckIsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyxpQkFBaUIsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7NEJBQzlHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7eUJBQ3pGO3dCQUNELElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFFLHFCQUFRLENBQUMsSUFBSSxFQUFDOzRCQUNqQyxnQkFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7NEJBQzdCLEtBQUs7NEJBQ0wscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7Z0NBQzNDLElBQUksUUFBUSxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO2dDQUM1QixRQUFRLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsaUJBQWlCLENBQUM7Z0NBQzFDLFFBQVEsQ0FBQyxXQUFXLEdBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQztnQ0FDdEMsUUFBUSxDQUFDLFVBQVUsR0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDdEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDMUIsQ0FBQyxDQUFDLENBQUE7eUJBQ0w7cUJBQ0o7aUJBQ0o7Z0JBQUEsTUFBTTtTQUNWO0lBQ0wsQ0FBQztJQWpERDtRQURDLFFBQVEsRUFBRTtrREFDVztJQUhMLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FxRDVCO0lBQUQsZUFBQztDQXJERCxBQXFEQyxDQXJEcUMsb0JBQVUsR0FxRC9DO2tCQXJEb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgQm9zc0J1bGxldCBmcm9tIFwiLi4vQm9zc0J1bGxldFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3NzQXR0MyBleHRlbmRzIEJvc3NCdWxsZXQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBidWxsZWN0X3R5cGU6bnVtYmVyPTA7XHJcblxyXG4gICAgcmVtYWluX3RpbWU6bnVtYmVyPTA7XHJcbiAgICBidWZmX3ZhbHVlOm51bWJlcj0wO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25XYWxsTGlzdGVuKHRoaXMub25Db2xsaXNpb25XYWxsKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0QnVmZkRhdGEocmVtYWluVGltZTpudW1iZXIsdmFsdWU6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLnJlbWFpbl90aW1lPXJlbWFpblRpbWU7XHJcbiAgICAgICAgdGhpcy5idWZmX3ZhbHVlPXZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeisOaSnuW8gOWniy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uQ29sbGlzaW9uV2FsbCh3YWxsOldhbGwpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5idWxsZWN0X3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgaWYod2FsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9d2FsbC5iZUluanVyZWQodGhpcy5tb25zdGVyX2F0dF9kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MzX25vcm1hbF9hdHRhY2tfaGl0LHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3MzU2tpbGwxbWluZ3pob25nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIGlmKHdhbGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPXdhbGwuYmVJbmp1cmVkKHRoaXMubW9uc3Rlcl9hdHRfZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzM19za2lsbF8xX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzM1NraWxsMW1pbmd6aG9uZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHdhbGwuZ2V0V2FsbFR5cGUoKT09V2FsbFR5cGUuTWFpbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlQmlnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5YeP5pS76YCfXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuQm9zczNfSklBTl9Hb25nU3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT10aGlzLnJlbWFpbl90aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5idWZmX3ZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYuYWRkRGVCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=