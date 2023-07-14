
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss8/BossSkill8.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1902irTyJAkbJEJCEjGqGV', 'BossSkill8');
// Scripts/Boss/Boss8/BossSkill8.ts

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
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var WallConfig_1 = require("../../Wall/WallConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BossSkill8 = /** @class */ (function (_super) {
    __extends(BossSkill8, _super);
    function BossSkill8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BossSkill8.prototype.onLoad = function () {
        this.addCollisionWallListen(this.onCollisionWall);
    };
    ////--------------------------------------碰撞开始----------------------------------------------------
    BossSkill8.prototype.onCollisionWall = function (wall) {
        this.destroySelf();
        if (wall) {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss8_skill_bullect_hit, this.node.getPosition());
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Boss1Attack);
            //伤害黏液
            var damageBuffData_1 = new BuffData_1.BuffData();
            damageBuffData_1.buff_id = HeroConfig_1.BuffId.Boss8_Skill_2_shanghai;
            damageBuffData_1.remain_time = this.monster_att_data.monster_ts.skill_data.getSkillValue3(2);
            damageBuffData_1.buff_type = HeroConfig_1.BuffType.Normal;
            damageBuffData_1.damage_jiange_time = 1;
            damageBuffData_1.buff_value = [this.monster_att_data.monster_ts.skill_data.getSkillValue1(2)];
            wall.addDeBuff(damageBuffData_1, this.monster_att_data);
            if (wall.getWallType() == WallConfig_1.WallType.Main) {
                var attValue_1 = this.monster_att_data.monster_ts.skill_data.getSkillValue2(2);
                GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                    //击晕所有英雄
                    var yunBuffData = new BuffData_1.BuffData();
                    yunBuffData.buff_id = HeroConfig_1.BuffId.Monster_XuanYun;
                    yunBuffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                    yunBuffData.remain_time = 1;
                    yunBuffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                    v.addDeBuff(yunBuffData);
                    //攻击力减少
                    var attBuffData = new BuffData_1.BuffData();
                    attBuffData.buff_id = HeroConfig_1.BuffId.Boss8_Skill_2_attack;
                    attBuffData.buff_value = [attValue_1];
                    attBuffData.remain_time = damageBuffData_1.remain_time;
                    attBuffData.buff_type = HeroConfig_1.BuffType.Normal;
                    v.addDeBuff(attBuffData);
                });
            }
            return true;
        }
    };
    BossSkill8 = __decorate([
        ccclass
    ], BossSkill8);
    return BossSkill8;
}(MonsterBullet_1.default));
exports.default = BossSkill8;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczhcXEJvc3NTa2lsbDgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUM1QyxxREFBb0Q7QUFDcEQseURBQThEO0FBQzlELDZEQUF3RDtBQUN4RCw2REFBd0Q7QUFFeEQsb0RBQWlEO0FBSTNDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFhO0lBQXJEOztJQThDQSxDQUFDO0lBM0NhLDJCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLG9DQUFlLEdBQWYsVUFBZ0IsSUFBUztRQUNyQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBRyxJQUFJLEVBQUM7WUFDSix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLHVCQUF1QixFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUNwSCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3RSxNQUFNO1lBQ04sSUFBSSxnQkFBYyxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQ2xDLGdCQUFjLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsc0JBQXNCLENBQUM7WUFDckQsZ0JBQWMsQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLGdCQUFjLENBQUMsU0FBUyxHQUFDLHFCQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3pDLGdCQUFjLENBQUMsa0JBQWtCLEdBQUMsQ0FBQyxDQUFDO1lBQ3BDLGdCQUFjLENBQUMsVUFBVSxHQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBYyxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JELElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFFLHFCQUFRLENBQUMsSUFBSSxFQUFDO2dCQUNqQyxJQUFJLFVBQVEsR0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO29CQUMzQyxRQUFRO29CQUNSLElBQUksV0FBVyxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO29CQUMvQixXQUFXLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsZUFBZSxDQUFDO29CQUMzQyxXQUFXLENBQUMsY0FBYyxHQUFDLGlDQUFZLENBQUMsT0FBTyxDQUFDO29CQUNoRCxXQUFXLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztvQkFDMUIsV0FBVyxDQUFDLFNBQVMsR0FBQyxxQkFBUSxDQUFDLE9BQU8sQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekIsT0FBTztvQkFDUCxJQUFJLFdBQVcsR0FBQyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztvQkFDL0IsV0FBVyxDQUFDLE9BQU8sR0FBQyxtQkFBTSxDQUFDLG9CQUFvQixDQUFDO29CQUNoRCxXQUFXLENBQUMsVUFBVSxHQUFDLENBQUMsVUFBUSxDQUFDLENBQUM7b0JBQ2xDLFdBQVcsQ0FBQyxXQUFXLEdBQUMsZ0JBQWMsQ0FBQyxXQUFXLENBQUM7b0JBQ25ELFdBQVcsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxPQUFPLElBQUksQ0FBQTtTQUNkO0lBQ0wsQ0FBQztJQTFDZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQThDOUI7SUFBRCxpQkFBQztDQTlDRCxBQThDQyxDQTlDdUMsdUJBQWEsR0E4Q3BEO2tCQTlDb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE1vbnN0ZXJCdWxsZXQgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckJ1bGxldFwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcblxyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9zc1NraWxsOCBleHRlbmRzIE1vbnN0ZXJCdWxsZXQge1xyXG5cclxuICAgXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkQ29sbGlzaW9uV2FsbExpc3Rlbih0aGlzLm9uQ29sbGlzaW9uV2FsbCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeisOaSnuW8gOWniy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uQ29sbGlzaW9uV2FsbCh3YWxsOldhbGwpOmJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICBpZih3YWxsKXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M4X3NraWxsX2J1bGxlY3RfaGl0LHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Jvc3MxQXR0YWNrKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5Lyk5a6z6buP5rayXHJcbiAgICAgICAgICAgIGxldCBkYW1hZ2VCdWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgZGFtYWdlQnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuQm9zczhfU2tpbGxfMl9zaGFuZ2hhaTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYW1hZ2VCdWZmRGF0YS5yZW1haW5fdGltZT10aGlzLm1vbnN0ZXJfYXR0X2RhdGEubW9uc3Rlcl90cy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUzKDIpO1xyXG4gICAgICAgICAgICBkYW1hZ2VCdWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuTm9ybWFsO1xyXG4gICAgICAgICAgICBkYW1hZ2VCdWZmRGF0YS5kYW1hZ2VfamlhbmdlX3RpbWU9MTtcclxuICAgICAgICAgICAgZGFtYWdlQnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5tb25zdGVyX2F0dF9kYXRhLm1vbnN0ZXJfdHMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgyKV07XHJcbiAgICAgICAgICAgIHdhbGwuYWRkRGVCdWZmKGRhbWFnZUJ1ZmZEYXRhLHRoaXMubW9uc3Rlcl9hdHRfZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKHdhbGwuZ2V0V2FsbFR5cGUoKT09V2FsbFR5cGUuTWFpbil7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBhdHRWYWx1ZT10aGlzLm1vbnN0ZXJfYXR0X2RhdGEubW9uc3Rlcl90cy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDIpO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lh7vmmZXmiYDmnInoi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeXVuQnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgeXVuQnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuTW9uc3Rlcl9YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIHl1bkJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIHl1bkJ1ZmZEYXRhLnJlbWFpbl90aW1lPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgeXVuQnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlZlcnRpZ287XHJcbiAgICAgICAgICAgICAgICAgICAgdi5hZGREZUJ1ZmYoeXVuQnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pS75Ye75Yqb5YeP5bCRXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dEJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dEJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkJvc3M4X1NraWxsXzJfYXR0YWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dEJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9W2F0dFZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICBhdHRCdWZmRGF0YS5yZW1haW5fdGltZT1kYW1hZ2VCdWZmRGF0YS5yZW1haW5fdGltZTtcclxuICAgICAgICAgICAgICAgICAgICBhdHRCdWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHYuYWRkRGVCdWZmKGF0dEJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbn1cclxuIl19