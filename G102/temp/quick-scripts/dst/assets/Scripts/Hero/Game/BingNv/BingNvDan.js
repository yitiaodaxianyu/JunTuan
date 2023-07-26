
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
        _this.hero_lvl = 0;
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
                            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), 200 + this.hero_lvl * 20);
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
                                                buffData_1.remain_time = 3 + this.hero_lvl * 0.5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQmluZ052XFxCaW5nTnZEYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUVBQW9GO0FBQ3BGLG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0Msa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCx3Q0FBdUM7QUFDdkMsc0NBQWlDO0FBQ2pDLDRDQUF3RTtBQUdsRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBTztJQUE5QztRQUFBLHFFQXNFQztRQW5FRyxrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUNmLGNBQVEsR0FBUSxDQUFDLENBQUM7O0lBa0U3QixDQUFDO0lBakVHLDBCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHlCQUF5QixZQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFUyx5QkFBSyxHQUFmO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELHNDQUFrQixHQUFsQixVQUFtQixTQUFpQjtRQUNoQyxRQUFPLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDckIsS0FBSyxDQUFDO2dCQUFDO29CQUNILEtBQUs7b0JBQ0wsSUFBRyxTQUFTLEVBQUM7d0JBQ1QsSUFBSSxJQUFJLEdBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3BELElBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQzs0QkFDckIsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyxrQkFBa0IsRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FB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QUFDO3FCQUN0QjtpQkFDSjtnQkFBQSxNQUFNO1NBQ1Y7SUFFTCxDQUFDO0lBakVEO1FBREMsUUFBUSxFQUFFO21EQUNXO0lBSEwsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQXNFN0I7SUFBRCxnQkFBQztDQXRFRCxBQXNFQyxDQXRFc0MsaUJBQU8sR0FzRTdDO2tCQXRFb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lRWZmZWN0c01hbmFnZXIsIEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEJ1bGxlY3QgZnJvbSBcIi4uL0J1bGxlY3RcIjtcclxuaW1wb3J0IHsgU2tpbGxUeXBlLCBEYW1hZ2VUeXBlLCBCdWZmSWQsIEJ1ZmZUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmdOdkRhbiBleHRlbmRzIEJ1bGxlY3Qge1xyXG5cclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBidWxsZWN0X3R5cGU6bnVtYmVyPTA7XHJcbiAgICBwdWJsaWMgaGVyb19sdmw6bnVtYmVyPTA7XHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkQ29sbGlzaW9uTW9uc3Rlckxpc3Rlbih0aGlzLm9uQ29sbGlzaW9uTW9uc3Rlcik7XHJcbiAgICB9ICAgICAgICBcclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50dW93ZWlfc3BhY2U9MTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbGxpc2lvbk1vbnN0ZXIobW9uc3RlclRzOk1vbnN0ZXIpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5idWxsZWN0X3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgLy/mma7pgJrlvLlcclxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUcyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5iaW5nX252X2F0dGFja19oaXQsdGhpcy5nZXRIZWFkUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgIC8v6KKr5Yqo5oqA6IO95by5XHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVyVHMpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZCh0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYmluZ19udl9iZWlkb25nX3NraWxsX2NyZWF0ZSx0aGlzLmdldEhlYWRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19CaW5nTnZfU2tpbGwxX0ppYW5TdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlNsb3dkb3duO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVswLjVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQk5BdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKirojIPlm7TkvKTlrrPvvIzkuI3ljIXmi6zov5nkuKrmgKogKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsbW9uc3RlclRzLmdldENlbnRlclBvcygpLDIwMCt0aGlzLmhlcm9fbHZsKjIwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGppYW5zdVZhbHVlPXRoaXMuZ29uZ2ppX2RhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5QYXNzaXZlXzEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUVHMudXVpZCE9bW9uc3RlclRzLnV1aWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVFRzLmJlRmxhc2hJbmp1cmVkKHRoaXMuZ29uZ2ppX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJpbmdfbnZfYmVpZG9uZ19za2lsbF9oaXQsbW9uc3RlclRUcy5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighZGF0YS5pc19kaWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX0JpbmdOdl9Ta2lsbDFfSmlhblN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5TbG93ZG93bjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVtqaWFuc3VWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9Myt0aGlzLmhlcm9fbHZsKjAuNTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFRzLmFkZERlQnVmZihidWZmRGF0YSx0aGlzLmdvbmdqaV9kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==