"use strict";
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