
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss2/ShieldAttack2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8ffdet1NHZIX5Co/I71jvYH', 'ShieldAttack2');
// Scripts/Boss/Boss2/ShieldAttack2.ts

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
var MonsterData_1 = require("../../Monster/MonsterData");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MyTool_1 = require("../../Tools/MyTool");
var WallManager_1 = require("../../Wall/WallManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShieldAttack2 = /** @class */ (function (_super) {
    __extends(ShieldAttack2, _super);
    function ShieldAttack2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boss_pos = cc.v2(0, 0);
        return _this;
    }
    ShieldAttack2.prototype.setBossPos = function (pos) {
        this.boss_pos = pos;
    };
    /**帧动画回调 */
    ShieldAttack2.prototype.onShieldAttack = function () {
        var _this = this;
        var walls = WallManager_1.default.getInstance().getAllWall();
        walls.forEach(function (wall, wallType) {
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if (wall.getWallMaxYY() < _this.boss_pos.y) {
                wall.beRealDamage(HeroConfig_1.DamageType.Skill, MonsterData_1.StrengthType.Boss, wall.getMaxHp() * 0.25);
            }
        });
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss2_normal_skill_hit, cc.v2(this.node.x, GameManager_1.default.getInstance().enemy_att_y));
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss2Skill);
        //击晕所有英雄
        GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
            var buffData = new BuffData_1.BuffData();
            buffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
            buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
            buffData.remain_time = 1;
            buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
            v.addDeBuff(buffData);
        });
        MyTool_1.default.randomSceneShakeBig();
    };
    ShieldAttack2 = __decorate([
        ccclass
    ], ShieldAttack2);
    return ShieldAttack2;
}(cc.Component));
exports.default = ShieldAttack2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczJcXFNoaWVsZEF0dGFjazIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUM1QyxxREFBb0Q7QUFDcEQseURBQTBFO0FBQzFFLHlEQUF5RDtBQUN6RCw2REFBd0Q7QUFDeEQsNkNBQXdDO0FBR3hDLHNEQUFpRDtBQUczQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQStCQztRQTdCRyxjQUFRLEdBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7O0lBNkJoQyxDQUFDO0lBM0JHLGtDQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUMsR0FBRyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxXQUFXO0lBQ1gsc0NBQWMsR0FBZDtRQUFBLGlCQW9CQztRQW5CRyxJQUFJLEtBQUssR0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTLEVBQUMsUUFBaUI7WUFDdEMsMEJBQTBCO1lBQzFCLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsS0FBSyxFQUFDLDBCQUFZLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBQyxJQUFJLENBQUMsQ0FBQTthQUM3RTtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyxzQkFBc0IsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwSixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RSxRQUFRO1FBQ1IscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDM0MsSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7WUFDNUIsUUFBUSxDQUFDLE9BQU8sR0FBQyxtQkFBTSxDQUFDLGVBQWUsQ0FBQztZQUN4QyxRQUFRLENBQUMsY0FBYyxHQUFDLGlDQUFZLENBQUMsT0FBTyxDQUFDO1lBQzdDLFFBQVEsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxPQUFPLENBQUM7WUFDcEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNGLGdCQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBN0JnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBK0JqQztJQUFELG9CQUFDO0NBL0JELEFBK0JDLENBL0IwQyxFQUFFLENBQUMsU0FBUyxHQStCdEQ7a0JBL0JvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaWVsZEF0dGFjazIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIGJvc3NfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuXHJcbiAgICBzZXRCb3NzUG9zKHBvczpjYy5WZWMyKXtcclxuICAgICAgICB0aGlzLmJvc3NfcG9zPXBvcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoq5bin5Yqo55S75Zue6LCDICovXHJcbiAgICBvblNoaWVsZEF0dGFjaygpe1xyXG4gICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgICAgIGlmKHdhbGwuZ2V0V2FsbE1heFlZKCk8dGhpcy5ib3NzX3Bvcy55KXtcclxuICAgICAgICAgICAgICAgIHdhbGwuYmVSZWFsRGFtYWdlKERhbWFnZVR5cGUuU2tpbGwsU3RyZW5ndGhUeXBlLkJvc3Msd2FsbC5nZXRNYXhIcCgpKjAuMjUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMl9ub3JtYWxfc2tpbGxfaGl0LGNjLnYyKHRoaXMubm9kZS54LEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQm9zczJTa2lsbCk7XHJcbiAgICAgICAgLy/lh7vmmZXmiYDmnInoi7Hpm4RcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW47XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0xO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgdi5hZGREZUJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VCaWcoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19