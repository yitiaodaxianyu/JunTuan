
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Game/Pet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd60d9q73ftFp6hf88WEhgEV', 'Pet');
// Scripts/Pet/Game/Pet.ts

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
var HeroData_1 = require("../../Hero/Data/HeroData");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var PetData_1 = require("../Data/PetData");
var SpiritAttribute_1 = require("../Data/SpiritAttribute");
var SpiritSkill_1 = require("../Data/SpiritSkill");
var PetConfig_1 = require("../PetConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Pet = /** @class */ (function (_super) {
    __extends(Pet, _super);
    function Pet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**所需的动画加载是否ok */
        _this.is_load_ok = false;
        _this.cur_load_num = 0;
        _this.need_load_num = 0;
        _this.spine = null;
        /**绑定的英雄 */
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        /**英雄数据 */
        _this.hero_data = null;
        /**自身的宠物类型 */
        _this.pet_type = 0;
        /**自身的宠物id */
        _this.pet_id = 0;
        /**宠物的品质 */
        _this.pet_quality = 0;
        /**技能数据 */
        _this.pet_data = null;
        /**技能冷却时间 */
        _this.cd_time = 0;
        _this.attack_callback = null;
        _this.inited_callback = null;
        return _this;
    }
    Pet_1 = Pet;
    Pet.prototype.onLoad = function () {
        this.spine = this.node.getComponent(sp.Skeleton);
        this.spine.setAnimation(0, "Idle", true);
    };
    Pet.prototype.preLoadRes = function () {
        switch (this.pet_type) {
            case 1:
                {
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet1_attack);
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet1_attack_hit);
                }
                break;
            case 2:
                {
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet2_attack);
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet2_attack_hit);
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet2_skill);
                }
                break;
            case 3:
                {
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet3_skill_back);
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet3_skill_front);
                }
                break;
            case 4:
                {
                    this.addLoadByGameEffectId(GameEffectsManager_1.GameEffectId.pet4_skill);
                }
                break;
        }
    };
    Pet.prototype.addAttackListen = function (callBack) {
        this.attack_callback = callBack;
    };
    Pet.prototype.addInitedListen = function (callBack) {
        this.inited_callback = callBack;
    };
    Pet.prototype.addLoadByGameEffectId = function (id, initCount) {
        var _this = this;
        if (initCount === void 0) { initCount = 1; }
        if (GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(id, initCount, function () {
            _this.cur_load_num++;
            if (_this.cur_load_num >= _this.need_load_num) {
                _this.is_load_ok = true;
                Pet_1.cur_loaded_num++;
            }
        }) == true) {
            this.need_load_num++;
        }
    };
    Pet.prototype.init = function (petId, heroType, pos) {
        this.pet_id = petId;
        this.pet_type = SpiritAttribute_1.SpiritAttributeManager.getInstance().getSpiritType(this.pet_id);
        this.pet_quality = SpiritAttribute_1.SpiritAttributeManager.getInstance().getQuality(this.pet_id);
        this.hero_type = heroType;
        this.node.setPosition(pos);
        this.preLoadRes();
        this.initData();
        if (this.inited_callback) {
            this.inited_callback();
        }
    };
    Pet.prototype.setHeroData = function (heroData) {
        this.hero_data = heroData;
    };
    /**初始化数据 */
    Pet.prototype.initData = function () {
        this.pet_data = new PetData_1.PetData();
        this.pet_data.SkillValue_x = new Map();
        this.pet_data.SkillValue_y = new Map();
        this.pet_data.SkillValue_z = new Map();
        this.pet_data.ColdDown = new Map();
        for (var s = 1; s <= 1; s++) {
            var skillId = SpiritSkill_1.SpiritSkillManager.getInstance().getSkillId(this.pet_type, this.pet_quality - 2);
            var jsonData = SpiritSkill_1.SpiritSkillManager.getInstance().getJsonSpiritSkill(skillId);
            if (jsonData == null)
                continue;
            this.pet_data.SkillValue_x.set(s, jsonData.SkillParameter_1);
            this.pet_data.SkillValue_y.set(s, jsonData.SkillParameter_2);
            this.pet_data.SkillValue_z.set(s, jsonData.SkillParameter_3);
            this.pet_data.ColdDown.set(s, jsonData.CoolDown);
        }
        this.cd_time = this.pet_data.getSkillColdDown(PetConfig_1.PetSkillType.Active);
    };
    Pet.prototype.getGongJiData = function (isBullet, skillRate) {
        var gjData = new HeroData_1.GongJiData();
        gjData.hero_type = this.hero_type;
        gjData.hero_data = cc.instantiate(this.hero_data);
        gjData.skill_damage_rate = skillRate;
        gjData.damage_type = HeroConfig_1.DamageType.Skill;
        gjData.is_bullet = isBullet;
        return gjData;
    };
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    Pet.prototype.playSpinAnimaton = function (name, isLoop, data, endCallback) {
        if (isLoop === void 0) { isLoop = false; }
        var anima = this.spine.setAnimation(0, name, isLoop);
        if (data) {
            this.spine.setTrackEventListener(anima, function (entry, event) {
                if (event.data.name == data.name) {
                    data.callback();
                }
            });
        }
        if (endCallback) {
            this.spine.setTrackCompleteListener(anima, function (entry, event) {
                anima.listener = null;
                endCallback();
            });
        }
    };
    /**设置打击目标 */
    Pet.prototype.setAttTarget = function (target) {
    };
    Pet.prototype.onHeroHitMonster = function (monster) {
    };
    Pet.prototype.startReleaseSkill = function (monster) {
        if (this.cd_time <= 0) {
            this.cd_time = this.pet_data.getSkillColdDown(PetConfig_1.PetSkillType.Active);
            this.attack_callback(monster);
        }
    };
    var Pet_1;
    /**所有的英雄及其所需资源是否加载完毕 */
    Pet.max_load_num = 0;
    Pet.cur_loaded_num = 0;
    Pet = Pet_1 = __decorate([
        ccclass
    ], Pet);
    return Pet;
}(cc.Component));
exports.default = Pet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxHYW1lXFxQZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0VBQWlGO0FBR2pGLHFEQUFnRTtBQUNoRSx5REFBbUU7QUFJbkUsMkNBQTBDO0FBQzFDLDJEQUFpRTtBQUNqRSxtREFBeUQ7QUFDekQsMENBQXFEO0FBRS9DLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWlDLHVCQUFZO0lBQTdDO1FBQUEscUVBZ0tDO1FBNUpHLGlCQUFpQjtRQUNqQixnQkFBVSxHQUFTLEtBQUssQ0FBQztRQUN6QixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixtQkFBYSxHQUFRLENBQUMsQ0FBQztRQUNiLFdBQUssR0FBYyxJQUFJLENBQUM7UUFDbEMsV0FBVztRQUNYLGVBQVMsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQztRQUNuQyxVQUFVO1FBQ1YsZUFBUyxHQUFVLElBQUksQ0FBQztRQUN4QixhQUFhO1FBQ2IsY0FBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixhQUFhO1FBQ2IsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixXQUFXO1FBQ1gsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsVUFBVTtRQUNBLGNBQVEsR0FBUyxJQUFJLENBQUM7UUFDaEMsWUFBWTtRQUNaLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFFakIscUJBQWUsR0FBVSxJQUFJLENBQUM7UUFDOUIscUJBQWUsR0FBVSxJQUFJLENBQUM7O0lBdUlsQyxDQUFDO1lBaEtvQixHQUFHO0lBMkJwQixvQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FB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QztZQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFDLFVBQUMsS0FBMEIsRUFBRSxLQUFLO2dCQUN4RSxLQUFLLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQztnQkFDcEIsV0FBVyxFQUFFLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFFRCxZQUFZO0lBQ1osMEJBQVksR0FBWixVQUFhLE1BQWM7SUFFM0IsQ0FBQztJQUVELDhCQUFnQixHQUFoQixVQUFpQixPQUFlO0lBRWhDLENBQUM7SUFFRCwrQkFBaUIsR0FBakIsVUFBa0IsT0FBZTtRQUM3QixJQUFHLElBQUksQ0FBQyxPQUFPLElBQUUsQ0FBQyxFQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHdCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7O0lBNUpELHVCQUF1QjtJQUNULGdCQUFZLEdBQVEsQ0FBQyxDQUFDO0lBQ3RCLGtCQUFjLEdBQVEsQ0FBQyxDQUFDO0lBSHJCLEdBQUc7UUFEdkIsT0FBTztPQUNhLEdBQUcsQ0FnS3ZCO0lBQUQsVUFBQztDQWhLRCxBQWdLQyxDQWhLZ0MsRUFBRSxDQUFDLFNBQVMsR0FnSzVDO2tCQWhLb0IsR0FBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEsIEhlcm9EYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBNb25zdGVyQWN0aW9uTmFtZSwgTW9uc3RlckZhY2VOYW1lLCBNb25zdGVyU2tpblR5cGUgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBQZXREYXRhIH0gZnJvbSBcIi4uL0RhdGEvUGV0RGF0YVwiO1xyXG5pbXBvcnQgeyBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvU3Bpcml0QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IFNwaXJpdFNraWxsTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL1NwaXJpdFNraWxsXCI7XHJcbmltcG9ydCB7IFBldEluZm8sIFBldFNraWxsVHlwZSB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGV0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8qKuaJgOacieeahOiLsembhOWPiuWFtuaJgOmcgOi1hOa6kOaYr+WQpuWKoOi9veWujOavlSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtYXhfbG9hZF9udW06bnVtYmVyPTA7XHJcbiAgICBwdWJsaWMgc3RhdGljIGN1cl9sb2FkZWRfbnVtOm51bWJlcj0wO1xyXG4gICAgLyoq5omA6ZyA55qE5Yqo55S75Yqg6L295piv5ZCmb2sgKi9cclxuICAgIGlzX2xvYWRfb2s6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGN1cl9sb2FkX251bTpudW1iZXI9MDtcclxuICAgIG5lZWRfbG9hZF9udW06bnVtYmVyPTA7XHJcbiAgICBwcm90ZWN0ZWQgc3BpbmU6IHNwLlNrZWxldG9uPW51bGw7XHJcbiAgICAvKirnu5HlrprnmoToi7Hpm4QgKi9cclxuICAgIGhlcm9fdHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEw7XHJcbiAgICAvKiroi7Hpm4TmlbDmja4gKi9cclxuICAgIGhlcm9fZGF0YTpIZXJvRGF0YT1udWxsO1xyXG4gICAgLyoq6Ieq6Lqr55qE5a6g54mp57G75Z6LICovXHJcbiAgICBwZXRfdHlwZTpudW1iZXI9MDtcclxuICAgIC8qKuiHqui6q+eahOWuoOeJqWlkICovXHJcbiAgICBwZXRfaWQ6bnVtYmVyPTA7XHJcbiAgICAvKirlrqDniannmoTlk4HotKggKi9cclxuICAgIHBldF9xdWFsaXR5Om51bWJlcj0wO1xyXG4gICAgLyoq5oqA6IO95pWw5o2uICovXHJcbiAgICBwcm90ZWN0ZWQgcGV0X2RhdGE6UGV0RGF0YT1udWxsO1xyXG4gICAgLyoq5oqA6IO95Ya35Y205pe26Ze0ICovXHJcbiAgICBjZF90aW1lOm51bWJlcj0wO1xyXG5cclxuICAgIGF0dGFja19jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgaW5pdGVkX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5zcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLFwiSWRsZVwiLHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByZUxvYWRSZXMoKXtcclxuICAgICAgICBzd2l0Y2godGhpcy5wZXRfdHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGV0MV9hdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBldDFfYXR0YWNrX2hpdCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5wZXQyX2F0dGFjayk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGV0Ml9hdHRhY2tfaGl0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5wZXQyX3NraWxsKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnBldDNfc2tpbGxfYmFjayk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQucGV0M19za2lsbF9mcm9udCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OntcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5wZXQ0X3NraWxsKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkQXR0YWNrTGlzdGVuKGNhbGxCYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmF0dGFja19jYWxsYmFjaz1jYWxsQmFjaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGFkZEluaXRlZExpc3RlbihjYWxsQmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5pbml0ZWRfY2FsbGJhY2s9Y2FsbEJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTG9hZEJ5R2FtZUVmZmVjdElkKGlkOkdhbWVFZmZlY3RJZCxpbml0Q291bnQ6bnVtYmVyPTEpeyAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYoR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoaWQsaW5pdENvdW50LCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xvYWRfbnVtKys7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VyX2xvYWRfbnVtPj10aGlzLm5lZWRfbG9hZF9udW0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19sb2FkX29rPXRydWU7XHJcbiAgICAgICAgICAgICAgICBQZXQuY3VyX2xvYWRlZF9udW0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5uZWVkX2xvYWRfbnVtKys7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQocGV0SWQ6bnVtYmVyLGhlcm9UeXBlOkhlcm9fVHlwZSxwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgdGhpcy5wZXRfaWQ9cGV0SWQ7XHJcbiAgICAgICAgdGhpcy5wZXRfdHlwZT1TcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0VHlwZSh0aGlzLnBldF9pZCk7XHJcbiAgICAgICAgdGhpcy5wZXRfcXVhbGl0eT1TcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLnBldF9pZCk7XHJcbiAgICAgICAgdGhpcy5oZXJvX3R5cGU9aGVyb1R5cGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgdGhpcy5wcmVMb2FkUmVzKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgIGlmKHRoaXMuaW5pdGVkX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5pbml0ZWRfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SGVyb0RhdGEoaGVyb0RhdGE6SGVyb0RhdGEpe1xyXG4gICAgICAgIHRoaXMuaGVyb19kYXRhPWhlcm9EYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKirliJ3lp4vljJbmlbDmja4gKi9cclxuICAgIHByaXZhdGUgaW5pdERhdGEoKXtcclxuICAgICAgICB0aGlzLnBldF9kYXRhPW5ldyBQZXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5wZXRfZGF0YS5Ta2lsbFZhbHVlX3g9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIHRoaXMucGV0X2RhdGEuU2tpbGxWYWx1ZV95PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICB0aGlzLnBldF9kYXRhLlNraWxsVmFsdWVfej1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wZXRfZGF0YS5Db2xkRG93bj1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PTE7IHMrKyl7XHJcbiAgICAgICAgICAgIGxldCBza2lsbElkPVNwaXJpdFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraWxsSWQodGhpcy5wZXRfdHlwZSx0aGlzLnBldF9xdWFsaXR5LTIpO1xyXG4gICAgICAgICAgICBsZXQganNvbkRhdGE9U3Bpcml0U2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdFNraWxsKHNraWxsSWQpO1xyXG4gICAgICAgICAgICBpZihqc29uRGF0YSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5wZXRfZGF0YS5Ta2lsbFZhbHVlX3guc2V0KHMsanNvbkRhdGEuU2tpbGxQYXJhbWV0ZXJfMSk7XHJcbiAgICAgICAgICAgIHRoaXMucGV0X2RhdGEuU2tpbGxWYWx1ZV95LnNldChzLGpzb25EYXRhLlNraWxsUGFyYW1ldGVyXzIpO1xyXG4gICAgICAgICAgICB0aGlzLnBldF9kYXRhLlNraWxsVmFsdWVfei5zZXQocyxqc29uRGF0YS5Ta2lsbFBhcmFtZXRlcl8zKTtcclxuICAgICAgICAgICAgdGhpcy5wZXRfZGF0YS5Db2xkRG93bi5zZXQocyxqc29uRGF0YS5Db29sRG93bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2RfdGltZT10aGlzLnBldF9kYXRhLmdldFNraWxsQ29sZERvd24oUGV0U2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R29uZ0ppRGF0YShpc0J1bGxldDpib29sZWFuLHNraWxsUmF0ZTpudW1iZXIpOkdvbmdKaURhdGF7XHJcbiAgICAgICAgbGV0IGdqRGF0YT1uZXcgR29uZ0ppRGF0YSgpO1xyXG4gICAgICAgIGdqRGF0YS5oZXJvX3R5cGU9dGhpcy5oZXJvX3R5cGU7XHJcbiAgICAgICAgZ2pEYXRhLmhlcm9fZGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9fZGF0YSk7XHJcbiAgICAgICAgZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlPXNraWxsUmF0ZTtcclxuICAgICAgICBnakRhdGEuZGFtYWdlX3R5cGU9RGFtYWdlVHlwZS5Ta2lsbDtcclxuICAgICAgICBnakRhdGEuaXNfYnVsbGV0PWlzQnVsbGV0O1xyXG4gICAgICAgIHJldHVybiBnakRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7kuIDkuKrpqqjpqrzliqjnlLtcclxuICAgICAqIEBwYXJhbSBuYW1lIOmqqOmqvOWKqOeUu+WQjeensFxyXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cclxuICAgICAqIEBwYXJhbSBkYXRhIOaYr+WQpuebkeWQrOWFs+mUruW4p++8jOWFs+mUruW4p+aVsOaNruWMheWQq+WFs+mUruW4p+WQjeensO+8jOebkeWQrOWIsOWFs+mUruW4p+WQjueahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGVuZENhbGxiYWNrIOaSreaUvue7k+adn+WQjueahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICAgcGxheVNwaW5BbmltYXRvbihuYW1lOnN0cmluZyxpc0xvb3A6Ym9vbGVhbj1mYWxzZSxkYXRhPzpLZXlGcmFtZURhdGEsZW5kQ2FsbGJhY2s/OkZ1bmN0aW9uKXsgICAgICAgIFxyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsaXNMb29wKTtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGEubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaJk+WHu+ebruaghyAqL1xyXG4gICAgc2V0QXR0VGFyZ2V0KHRhcmdldDpjYy5Ob2RlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25IZXJvSGl0TW9uc3Rlcihtb25zdGVyOmNjLk5vZGUpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0UmVsZWFzZVNraWxsKG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgaWYodGhpcy5jZF90aW1lPD0wKXtcclxuICAgICAgICAgICAgdGhpcy5jZF90aW1lPXRoaXMucGV0X2RhdGEuZ2V0U2tpbGxDb2xkRG93bihQZXRTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRhY2tfY2FsbGJhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcbiJdfQ==