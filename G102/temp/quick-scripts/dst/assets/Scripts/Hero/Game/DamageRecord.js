
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/DamageRecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c4e65LkgFtKq6cITgjYDSDA', 'DamageRecord');
// Scripts/Hero/Game/DamageRecord.ts

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
var Constants_1 = require("../../Constants");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../Data/HeroManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DamageRecord = /** @class */ (function (_super) {
    __extends(DamageRecord, _super);
    function DamageRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**游戏特效id */
        _this.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
        _this.value_label = null;
        _this.total_value = 0;
        _this.remain_time = 5;
        /**销毁回调 */
        _this.destroy_callback = null;
        _this.skill_release_id = 0;
        return _this;
    }
    DamageRecord.prototype.init = function (gameEffectId, skillReleaseId, value, callback) {
        this.game_effect_id = gameEffectId;
        this.skill_release_id = skillReleaseId;
        this.destroy_callback = callback;
        var heroId = Math.floor(skillReleaseId / 10000);
        var icon = this.node.getChildByName('icon').getComponent(cc.Sprite);
        icon.spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames('Hero_' + heroId + '_Skill_0');
        if (!this.value_label) {
            this.value_label = this.node.getChildByName('num').getComponent(cc.Label);
        }
        this.total_value = 0;
        this.refreshValue(value);
    };
    /**刷新伤害值 */
    DamageRecord.prototype.refreshValue = function (value) {
        this.remain_time = 5;
        this.node.opacity = 255;
        this.total_value += Math.round(value);
        this.value_label.string = this.total_value.toString();
    };
    DamageRecord.prototype.destroySelf = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(this.game_effect_id, this.node);
        if (this.destroy_callback) {
            this.destroy_callback(this.skill_release_id);
        }
    };
    DamageRecord.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                if (this.remain_time <= 2) {
                    this.node.opacity -= 2;
                    if (this.remain_time <= 0) {
                        this.remain_time = 0;
                        this.destroySelf();
                    }
                }
            }
        }
    };
    DamageRecord = __decorate([
        ccclass
    ], DamageRecord);
    return DamageRecord;
}(cc.Component));
exports.default = DamageRecord;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcRGFtYWdlUmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1QyxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUc1QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQW9EQztRQW5ERyxZQUFZO1FBQ1osb0JBQWMsR0FBYyxpQ0FBWSxDQUFDLElBQUksQ0FBQztRQUN0QyxpQkFBVyxHQUFVLElBQUksQ0FBQztRQUMxQixpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUNyQixpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUM3QixVQUFVO1FBQ0Ysc0JBQWdCLEdBQVUsSUFBSSxDQUFDO1FBQy9CLHNCQUFnQixHQUFRLENBQUMsQ0FBQzs7SUE0Q3RDLENBQUM7SUExQ0csMkJBQUksR0FBSixVQUFLLFlBQXlCLEVBQUMsY0FBcUIsRUFBQyxLQUFZLEVBQUMsUUFBaUI7UUFDL0UsSUFBSSxDQUFDLGNBQWMsR0FBQyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFDLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdBQVcsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sR0FBQyxNQUFNLEdBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUYsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsV0FBVztJQUNYLG1DQUFZLEdBQVosVUFBYSxLQUFZO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RGLElBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFUyw2QkFBTSxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLElBQUUscUJBQVMsQ0FBQyxZQUFZLEVBQUM7WUFDaEUsSUFBRyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsRUFBQztnQkFDbEIsSUFBSSxDQUFDLFdBQVcsSUFBRSxFQUFFLENBQUM7Z0JBQ3JCLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBRSxDQUFDLEVBQUM7b0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFFLENBQUMsQ0FBQztvQkFDckIsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFFLENBQUMsRUFBQzt3QkFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7d0JBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFDdEI7aUJBQ0o7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQW5EZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQW9EaEM7SUFBRCxtQkFBQztDQXBERCxBQW9EQyxDQXBEeUMsRUFBRSxDQUFDLFNBQVMsR0FvRHJEO2tCQXBEb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYW1hZ2VSZWNvcmQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgLyoq5ri45oiP54m55pWIaWQgKi9cclxuICAgIGdhbWVfZWZmZWN0X2lkOkdhbWVFZmZlY3RJZD1HYW1lRWZmZWN0SWQuTnVsbDtcclxuICAgIHByaXZhdGUgdmFsdWVfbGFiZWw6Y2MuTGFiZWw9bnVsbDtcclxuICAgIHByaXZhdGUgdG90YWxfdmFsdWU6bnVtYmVyPTA7XHJcbiAgICBwcml2YXRlIHJlbWFpbl90aW1lOm51bWJlcj01O1xyXG4gICAgLyoq6ZSA5q+B5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIHByaXZhdGUgc2tpbGxfcmVsZWFzZV9pZDpudW1iZXI9MDtcclxuXHJcbiAgICBpbml0KGdhbWVFZmZlY3RJZDpHYW1lRWZmZWN0SWQsc2tpbGxSZWxlYXNlSWQ6bnVtYmVyLHZhbHVlOm51bWJlcixjYWxsYmFjazpGdW5jdGlvbil7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuZ2FtZV9lZmZlY3RfaWQ9Z2FtZUVmZmVjdElkO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmVsZWFzZV9pZD1za2lsbFJlbGVhc2VJZDtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICAgICAgbGV0IGhlcm9JZD1NYXRoLmZsb29yKHNraWxsUmVsZWFzZUlkLzEwMDAwKTtcclxuICAgICAgICBsZXQgaWNvbj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpY29uLnNwcml0ZUZyYW1lPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWVzKCdIZXJvXycraGVyb0lkKydfU2tpbGxfMCcpO1xyXG4gICAgICAgIGlmKCF0aGlzLnZhbHVlX2xhYmVsKXtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZV9sYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ251bScpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudG90YWxfdmFsdWU9MDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvKirliLfmlrDkvKTlrrPlgLwgKi9cclxuICAgIHJlZnJlc2hWYWx1ZSh2YWx1ZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWU9NTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgdGhpcy50b3RhbF92YWx1ZSs9TWF0aC5yb3VuZCh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZV9sYWJlbC5zdHJpbmc9dGhpcy50b3RhbF92YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKCl7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKHRoaXMuZ2FtZV9lZmZlY3RfaWQsdGhpcy5ub2RlKTtcclxuICAgICAgICBpZih0aGlzLmRlc3Ryb3lfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2sodGhpcy5za2lsbF9yZWxlYXNlX2lkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbl90aW1lLT1kdDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU8PTIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5LT0yO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbl90aW1lPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19