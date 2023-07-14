
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/BingNv/BingNvDan.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '12fe2PdcShKpJmdEhK12xIc', 'BingNvDan');
// Scripts/Hero/Game/BingNv/BingNvDan.ts

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
var BingNvDan = /** @class */ (function (_super) {
    __extends(BingNvDan, _super);
    function BingNvDan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bullect_type = 0;
        return _this;
    }
    BingNvDan.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addCollisionMonsterListen.call(this, this.onCollisionMonster);
    };
    BingNvDan.prototype.start = function () {
        this.tuowei_space = 1;
    };
    BingNvDan.prototype.onCollisionMonster = function (monsterTs) {
        switch (this.bullect_type) {
            case 0:
                {
                    //普通弹
                    if (monsterTs) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_attack_hit, this.getHeadPos());
                        }
                        this.destroySelf();
                    }
                }
                break;
            case 1:
                {
                    //被动技能弹
                    if (monsterTs) {
                        var data = monsterTs.beFlashInjured(this.gongji_data);
                        if (data.getDamageNum() > 0) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill_create, this.getHeadPos());
                            var buffData = new BuffData_1.BuffData();
                            buffData.buff_id = HeroConfig_1.BuffId.Hero_BingNv_Skill1_JianSu;
                            buffData.buff_type = HeroConfig_1.BuffType.Slowdown;
                            buffData.buff_value = [0.5];
                            buffData.remain_time = 3;
                            monsterTs.addDeBuff(buffData, this.gongji_data);
                            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BNAttack);
                            /**范围伤害，不包括这个怪 */
                            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), 200);
                            if (monsters) {
                                var jiansuValue = this.gongji_data.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1);
                                for (var i = 0; i < monsters.length; i++) {
                                    var monsterTTs = monsters[i].getComponent(Monster_1.default);
                                    if (monsterTTs.uuid != monsterTs.uuid) {
                                        var data_1 = monsterTTs.beFlashInjured(this.gongji_data);
                                        if (data_1.getDamageNum() > 0) {
                                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill_hit, monsterTTs.getCenterPos());
                                            if (!data_1.is_die) {
                                                var buffData_1 = new BuffData_1.BuffData();
                                                buffData_1.buff_id = HeroConfig_1.BuffId.Hero_BingNv_Skill1_JianSu;
                                                buffData_1.buff_type = HeroConfig_1.BuffType.Slowdown;
                                                buffData_1.buff_value = [jiansuValue];
                                                buffData_1.remain_time = 3;
                                                monsterTTs.addDeBuff(buffData_1, this.gongji_data);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.destroySelf();
                    }
                }
                break;
        }
    };
    __decorate([
        property()
    ], BingNvDan.prototype, "bullect_type", void 0);
    BingNvDan = __decorate([
        ccclass
    ], BingNvDan);
    return BingNvDan;
}(Bullect_1.default));
exports.default = BingNvDan;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQmluZ052XFxCaW5nTnZEYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUVBQW9GO0FBQ3BGLG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0Msa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCx3Q0FBdUM7QUFDdkMsc0NBQWlDO0FBQ2pDLDRDQUF3RTtBQUdsRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBTztJQUE5QztRQUFBLHFFQXNFQztRQW5FRyxrQkFBWSxHQUFRLENBQUMsQ0FBQzs7SUFtRTFCLENBQUM7SUFqRUcsMEJBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsaUJBQU0seUJBQXlCLFlBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVTLHlCQUFLLEdBQWY7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsc0NBQWtCLEdBQWxCLFVBQW1CLFNBQWlCO1FBQ2hDLFFBQU8sSUFBSSxDQUFDLFlBQVksRUFBQztZQUNyQixLQUFLLENBQUM7Z0JBQUM7b0JBQ0gsS0FBSztvQkFDTCxJQUFHLFNBQVMsRUFBQzt3QkFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDcEQsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUMsQ0FBQyxFQUFDOzRCQUNyQix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLGtCQUFrQixFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO3lCQUM1Rzt3QkFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ3RCO2lCQUNKO2dCQUFBLE1BQU07WUFDUCxLQUFLLENBQUM7Z0JBQUM7b0JBQ0gsT0FBTztvQkFDUCxJQUFHLFNBQVMsRUFBQzt3QkFDVCxJQUFJLElBQUksR0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDcEQsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUMsQ0FBQyxFQUFDOzRCQUNyQix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLDRCQUE0QixFQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDOzRCQUNuSCxJQUFJLFFBQVEsR0FBQyxJQUFJLG1CQUFRLEVBQUUsQ0FBQzs0QkFDNUIsUUFBUSxDQUFDLE9BQU8sR0FBQyxtQkFBTSxDQUFDLHlCQUF5QixDQUFDOzRCQUNsRCxRQUFRLENBQUMsU0FBUyxHQUFDLHFCQUFRLENBQUMsUUFBUSxDQUFDOzRCQUNyQyxRQUFRLENBQUMsVUFBVSxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFCLFFBQVEsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDOzRCQUN2QixTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQy9DLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMxRSxpQkFBaUI7NEJBQ2pCLElBQUksUUFBUSxHQUFDLHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNuRyxJQUFHLFFBQVEsRUFBQztnQ0FDUixJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQ0FDOUUsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0NBQ2hDLElBQUksVUFBVSxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO29DQUNqRCxJQUFHLFVBQVUsQ0FBQyxJQUFJLElBQUUsU0FBUyxDQUFDLElBQUksRUFBQzt3Q0FDL0IsSUFBSSxNQUFJLEdBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0NBQ3JELElBQUcsTUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQzs0Q0FDckIsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyx5QkFBeUIsRUFBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs0Q0FDeEgsSUFBRyxDQUFDLE1BQUksQ0FBQyxNQUFNLEVBQUM7Z0RBQ1osSUFBSSxVQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7Z0RBQzVCLFVBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyx5QkFBeUIsQ0FBQztnREFDbEQsVUFBUSxDQUFDLFNBQVMsR0FBQyxxQkFBUSxDQUFDLFFBQVEsQ0FBQztnREFFckMsVUFBUSxDQUFDLFVBQVUsR0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dEQUNsQyxVQUFRLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztnREFDdkIsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFRLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzZDQUNuRDt5Q0FDSjtxQ0FDSjtpQ0FDSjs2QkFDSjt5QkFDSjt3QkFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ3RCO2lCQUNKO2dCQUFBLE1BQU07U0FDVjtJQUVMLENBQUM7SUFqRUQ7UUFEQyxRQUFRLEVBQUU7bURBQ1c7SUFITCxTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBc0U3QjtJQUFELGdCQUFDO0NBdEVELEFBc0VDLENBdEVzQyxpQkFBTyxHQXNFN0M7a0JBdEVvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgQnVsbGVjdCBmcm9tIFwiLi4vQnVsbGVjdFwiO1xyXG5pbXBvcnQgeyBTa2lsbFR5cGUsIERhbWFnZVR5cGUsIEJ1ZmZJZCwgQnVmZlR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmluZ052RGFuIGV4dGVuZHMgQnVsbGVjdCB7XHJcblxyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGJ1bGxlY3RfdHlwZTpudW1iZXI9MDtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkQ29sbGlzaW9uTW9uc3Rlckxpc3Rlbih0aGlzLm9uQ29sbGlzaW9uTW9uc3Rlcik7XHJcbiAgICB9ICAgICAgICBcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50dW93ZWlfc3BhY2U9MTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvbk1vbnN0ZXIobW9uc3RlclRzOk1vbnN0ZXIpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5idWxsZWN0X3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgLy/mma7pgJrlvLlcclxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUcyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5iaW5nX252X2F0dGFja19oaXQsdGhpcy5nZXRIZWFkUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIC8v6KKr5Yqo5oqA6IO95by5XHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyVHMpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYmluZ19udl9iZWlkb25nX3NraWxsX2NyZWF0ZSx0aGlzLmdldEhlYWRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19CaW5nTnZfU2tpbGwxX0ppYW5TdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlNsb3dkb3duO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVswLjVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQk5BdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKirojIPlm7TkvKTlrrPvvIzkuI3ljIXmi6zov5nkuKrmgKogKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsbW9uc3RlclRzLmdldENlbnRlclBvcygpLDIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBqaWFuc3VWYWx1ZT10aGlzLmdvbmdqaV9kYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuUGFzc2l2ZV8xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVFRzLnV1aWQhPW1vbnN0ZXJUcy51dWlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5iaW5nX252X2JlaWRvbmdfc2tpbGxfaGl0LG1vbnN0ZXJUVHMuZ2V0Q2VudGVyUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWRhdGEuaXNfZGllKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19CaW5nTnZfU2tpbGwxX0ppYW5TdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuU2xvd2Rvd247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bamlhbnN1VmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRUcy5hZGREZUJ1ZmYoYnVmZkRhdGEsdGhpcy5nb25namlfZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=