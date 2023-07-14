
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/NvWu/NvWuDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e1ef2wmDrZLXoRR2guepS7r', 'NvWuDan');
// Scripts/Hero/Game/NvWu/NvWuDan.ts

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
var Monster_1 = require("../../../Monster/Monster");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var BuffData_1 = require("../BuffData");
var Bullect_1 = require("../Bullect");
var HeroConfig_1 = require("../HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NvWuDan = /** @class */ (function (_super) {
    __extends(NvWuDan, _super);
    function NvWuDan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NvWuDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    NvWuDan.prototype.start = function () {
        this.tuowei_space = 1;
    };
    NvWuDan.prototype.onCollisionMonster = function (monsterTs) {
        //被动技能弹
        if (monsterTs) {
            var data = monsterTs.beFlashInjured(this.gongji_data);
            if (data.getDamageNum() > 0) {
                GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, this.getHeadPos());
                GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BNAttack);
                /**范围伤害，不包括这个怪 */
                var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), this.gongji_data.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1));
                //let monsters=MonsterManager.getInstance().getMonstersForCenterPos(-1,monsterTs.getCenterPos(),260);
                if (monsters) {
                    //伤害系数
                    var damageData = cc.instantiate(this.gongji_data);
                    damageData.damage_type = HeroConfig_1.DamageType.Skill;
                    damageData.skill_damage_rate = this.gongji_data.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1);
                    //毒数据
                    var duData = cc.instantiate(this.gongji_data);
                    duData.damage_type = HeroConfig_1.DamageType.Skill;
                    duData.continuous_damage_rate = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1);
                    for (var i = 0; i < monsters.length; i++) {
                        var monsterTTs = monsters[i].getComponent(Monster_1.default);
                        //立即造成参数2伤害
                        var data_1 = monsterTTs.beFlashInjured(damageData);
                        if (data_1.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, monsterTTs.getCenterPos());
                            if (!data_1.is_die) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_Skill1_Zhongdu;
                                buffData.buff_type = HeroConfig_1.BuffType.Normal;
                                buffData.remain_time = 5;
                                buffData.add_floor = 1;
                                buffData.max_floor = 6;
                                buffData.damage_jiange_time = 1;
                                monsterTTs.addDeBuff(buffData, duData);
                            }
                        }
                    }
                }
            }
            this.destroySelf();
        }
    };
    NvWuDan = __decorate([
        ccclass
    ], NvWuDan);
    return NvWuDan;
}(Bullect_1.default));
exports.default = NvWuDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTnZXdVxcTnZXdURhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RUFBb0Y7QUFDcEYsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyxrRUFBNkQ7QUFDN0QsZ0VBQTJEO0FBQzNELHdDQUF1QztBQUN2QyxzQ0FBaUM7QUFDakMsNENBQXdFO0FBR2xFLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFPO0lBQTVDOztJQXNEQSxDQUFDO0lBcERHLHdCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFUyx1QkFBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELG9DQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxPQUFPO1FBQ1AsSUFBRyxTQUFTLEVBQUM7WUFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7Z0JBQ3JCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzlHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxRSxpQkFBaUI7Z0JBQ2pCLElBQUksUUFBUSxHQUFDLHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlKLHFHQUFxRztnQkFDckcsSUFBRyxRQUFRLEVBQUM7b0JBQ1IsTUFBTTtvQkFDTixJQUFJLFVBQVUsR0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDaEQsVUFBVSxDQUFDLFdBQVcsR0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQztvQkFDeEMsVUFBVSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM1RixLQUFLO29CQUNMLElBQUksTUFBTSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsV0FBVyxHQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDO29CQUNwQyxNQUFNLENBQUMsc0JBQXNCLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzdGLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO3dCQUNoQyxJQUFJLFVBQVUsR0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQzt3QkFDakQsV0FBVzt3QkFDWCxJQUFJLE1BQUksR0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUMvQyxJQUFHLE1BQUksQ0FBQyxZQUFZLEVBQUUsR0FBQyxDQUFDLEVBQUM7NEJBQ3JCLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7NEJBQ3RILElBQUcsQ0FBQyxNQUFJLENBQUMsTUFBTSxFQUFDO2dDQUNaLElBQUksUUFBUSxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO2dDQUM1QixRQUFRLENBQUMsT0FBTyxHQUFDLG1CQUFNLENBQUMsd0JBQXdCLENBQUM7Z0NBQ2pELFFBQVEsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxNQUFNLENBQUM7Z0NBQ25DLFFBQVEsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO2dDQUN2QixRQUFRLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQztnQ0FDckIsUUFBUSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUM7Z0NBQ3JCLFFBQVEsQ0FBQyxrQkFBa0IsR0FBQyxDQUFDLENBQUM7Z0NBQzlCLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUN6Qzt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQXBEZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQXNEM0I7SUFBRCxjQUFDO0NBdERELEFBc0RDLENBdERvQyxpQkFBTyxHQXNEM0M7a0JBdERvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgQnVsbGVjdCBmcm9tIFwiLi4vQnVsbGVjdFwiO1xyXG5pbXBvcnQgeyBTa2lsbFR5cGUsIERhbWFnZVR5cGUsIEJ1ZmZJZCwgQnVmZlR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnZXdURhbiBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRDb2xsaXNpb25Nb25zdGVyTGlzdGVuKHRoaXMub25Db2xsaXNpb25Nb25zdGVyKTtcclxuICAgIH0gICAgICAgIFxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnR1b3dlaV9zcGFjZT0xO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sbGlzaW9uTW9uc3Rlcihtb25zdGVyVHM6TW9uc3Rlcikge1xyXG4gICAgICAgIC8v6KKr5Yqo5oqA6IO95by5XHJcbiAgICAgICAgaWYobW9uc3RlclRzKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm52d3VfYXR0YWNrX2J1bGxlY3RfaGl0LHRoaXMuZ2V0SGVhZFBvcygpKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQk5BdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgLyoq6IyD5Zu05Lyk5a6z77yM5LiN5YyF5ous6L+Z5Liq5oCqICovXHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSxtb25zdGVyVHMuZ2V0Q2VudGVyUG9zKCksdGhpcy5nb25namlfZGF0YS5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSkpO1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSxtb25zdGVyVHMuZ2V0Q2VudGVyUG9zKCksMjYwKTtcclxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+S8pOWus+ezu+aVsFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYW1hZ2VEYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhbWFnZURhdGEuZGFtYWdlX3R5cGU9RGFtYWdlVHlwZS5Ta2lsbDtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2VEYXRhLnNraWxsX2RhbWFnZV9yYXRlPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5q+S5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR1RGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBkdURhdGEuZGFtYWdlX3R5cGU9RGFtYWdlVHlwZS5Ta2lsbDtcclxuICAgICAgICAgICAgICAgICAgICBkdURhdGEuY29udGludW91c19kYW1hZ2VfcmF0ZT10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/nq4vljbPpgKDmiJDlj4LmlbAy5Lyk5a6zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUVHMuYmVGbGFzaEluanVyZWQoZGFtYWdlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubnZ3dV9hdHRhY2tfYnVsbGVjdF9oaXQsbW9uc3RlclRUcy5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighZGF0YS5pc19kaWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX052V3VfU2tpbGwxX1pob25nZHU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLk5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmFkZF9mbG9vcj0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLm1heF9mbG9vcj02O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmRhbWFnZV9qaWFuZ2VfdGltZT0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLGR1RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==