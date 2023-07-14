
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/DeLuYi/SuperManTeng.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4528csXbi9Cvptzn0HwvYBM', 'SuperManTeng');
// Scripts/Hero/Game/DeLuYi/SuperManTeng.ts

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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GameManager_1 = require("../../../GameManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var BuffData_1 = require("../BuffData");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SuperManTeng = /** @class */ (function (_super) {
    __extends(SuperManTeng, _super);
    function SuperManTeng() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuperManTeng.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
        this.addInitFinishedListen(this.onInitFinished);
    };
    SuperManTeng.prototype.onInitFinished = function () {
        this.move_speed = 100;
        this.acceleration = 10;
    };
    SuperManTeng.prototype.onCollisionMonster = function (monsterTs) {
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_FashiSkiill2);
                var node_1 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_active_skill_hit, monsterTs.node.getPosition());
                node_1.getComponent(cc.Animation).play();
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                buffData.remain_time = this.gongji_data.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active);
                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                monsterTs.addDeBuff(buffData, this.gongji_data);
                cc.tween(node_1).delay(buffData.remain_time).call(function () {
                    GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_active_skill_hit, node_1);
                }).start();
                //大招命中,专武debuff
                var ex1 = this.gongji_data.hero_data.ExclusiveWeaponSkillValue_1;
                if (ex1 && ex1 > 0) {
                    var debuffData = new BuffData_1.BuffData();
                    debuffData.buff_id = HeroConfig_1.BuffId.Hero_DeLuYi_Ex;
                    debuffData.buff_type = HeroConfig_1.BuffType.Normal;
                    debuffData.remain_time = 5;
                    monsterTs.addDeBuff(debuffData, this.gongji_data);
                }
            }
            this.is_att = false;
        }
    };
    SuperManTeng = __decorate([
        ccclass
    ], SuperManTeng);
    return SuperManTeng;
}(Bullect_1.default));
exports.default = SuperManTeng;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcRGVMdVlpXFxTdXBlck1hblRlbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsdUVBQW9GO0FBQ3BGLG9EQUErQztBQUUvQyxnRUFBMkQ7QUFDM0Qsd0NBQXVDO0FBQ3ZDLHNDQUFpQztBQUNqQyw0Q0FBNEQ7QUFHdEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQU87SUFBakQ7O0lBMENBLENBQUM7SUF4Q0csNkJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0seUJBQXlCLFlBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQscUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsU0FBaUI7UUFDaEMsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLE1BQUksR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLHVCQUF1QixFQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDbEksTUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksUUFBUSxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO2dCQUM1QixRQUFRLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsWUFBWSxDQUFDO2dCQUNyQyxRQUFRLENBQUMsU0FBUyxHQUFDLHFCQUFRLENBQUMsT0FBTyxDQUFDO2dCQUNwQyxRQUFRLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRixRQUFRLENBQUMsY0FBYyxHQUFDLGlDQUFZLENBQUMsT0FBTyxDQUFDO2dCQUM3QyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9DLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzVDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsTUFBSSxDQUFDLENBQUM7Z0JBQ3RHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNYLGVBQWU7Z0JBQ2YsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUM7Z0JBQy9ELElBQUcsR0FBRyxJQUFFLEdBQUcsR0FBQyxDQUFDLEVBQUM7b0JBQ1YsSUFBSSxVQUFVLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7b0JBQzlCLFVBQVUsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyxjQUFjLENBQUM7b0JBQ3pDLFVBQVUsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQ3JDLFVBQVUsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO29CQUN6QixTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3BEO2FBQ0o7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNyQjtJQUNMLENBQUM7SUF6Q2dCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0EwQ2hDO0lBQUQsbUJBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ3lDLGlCQUFPLEdBMENoRDtrQkExQ29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgRW5lbXlfRGVCdWZmX1R5cGUgfSBmcm9tIFwiLi4vLi4vLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdHNNYW5hZ2VyLCBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uL0J1bGxlY3RcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1cGVyTWFuVGVuZyBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgICAgICB0aGlzLmFkZEluaXRGaW5pc2hlZExpc3Rlbih0aGlzLm9uSW5pdEZpbmlzaGVkKTtcclxuICAgIH0gICAgICAgIFxyXG5cclxuICAgIG9uSW5pdEZpbmlzaGVkKCl7XHJcbiAgICAgICAgdGhpcy5tb3ZlX3NwZWVkPTEwMDtcclxuICAgICAgICB0aGlzLmFjY2VsZXJhdGlvbj0xMDsgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQ29sbGlzaW9uTW9uc3Rlcihtb25zdGVyVHM6TW9uc3Rlcikge1xyXG4gICAgICAgIGlmKG1vbnN0ZXJUcyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9GYXNoaVNraWlsbDIpO1xyXG4gICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuZGVsdXlpX2FjdGl2ZV9za2lsbF9oaXQsbW9uc3RlclRzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlZlcnRpZ287XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgbW9uc3RlclRzLmFkZERlQnVmZihidWZmRGF0YSx0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLmRlbGF5KGJ1ZmZEYXRhLnJlbWFpbl90aW1lKS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5kZWx1eWlfYWN0aXZlX3NraWxsX2hpdCxub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAvL+Wkp+aLm+WRveS4rSzkuJPmraZkZWJ1ZmZcclxuICAgICAgICAgICAgICAgIGxldCBleDE9dGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xO1xyXG4gICAgICAgICAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX0RlTHVZaV9FeDtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5Ob3JtYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWZmRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5hZGREZUJ1ZmYoZGVidWZmRGF0YSx0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19hdHQ9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==