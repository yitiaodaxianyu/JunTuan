"use strict";
cc._RF.push(module, '2c805VbwANFr7ZWBcHfQncr', 'SkillManager');
// Scripts/Game/SkillManager.ts

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
var GameEffectsManager_1 = require("./GameEffectsManager");
var MapNodePool_1 = require("./MapNodePool");
var GameManager_1 = require("../GameManager");
var UIManager_1 = require("../UI/UIManager");
var Constants_1 = require("../Constants");
var AudioConstants_1 = require("../Sound/AudioConstants");
var DamageRecord_1 = require("../Hero/Game/DamageRecord");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillManager = /** @class */ (function (_super) {
    __extends(SkillManager, _super);
    function SkillManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否处于释放技能的状态，用于自动战斗判断 */
        _this.is_skill_state = false;
        _this.damage_record = null;
        _this.record_root = null;
        _this.skill_range = null;
        _this.de_lu_yi_ex = 0;
        return _this;
    }
    SkillManager_1 = SkillManager;
    SkillManager.getInstance = function () {
        return this._instance;
    };
    SkillManager.prototype.onLoad = function () {
        SkillManager_1._instance = this;
        this.damage_record = new Map();
        this.record_root = this.node.getChildByName('record_root');
        this.skill_range = this.node.getChildByName('skill_range');
    };
    SkillManager.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.damage_record.clear();
        SkillManager_1._instance = null;
    };
    /**根据id创建一个特效*/
    SkillManager.prototype.createGameEffectById = function (id, pos) {
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(id, pos, this.node);
        return node;
    };
    SkillManager.prototype.releaseSkill = function (completeCallback, heroNode) {
        completeCallback();
        return;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Xuli);
        this.setTimeStop(true);
        var commonAnima = this.createGameEffectById(GameEffectsManager_1.GameEffectId.hero_skill_common, heroNode.getPosition().add(cc.v2(0, 100))).getComponent(cc.Animation);
        commonAnima.node.zIndex = 3;
        var commonState = commonAnima.play();
        commonState.speed = Constants_1.JiaSu;
        commonAnima.on(cc.Animation.EventType.FINISHED, function () {
            commonAnima.off(cc.Animation.EventType.FINISHED);
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.hero_skill_common, commonAnima.node);
            completeCallback();
        });
        var uiTouch = UIManager_1.UIManager.getInstance().node.getChildByName('ui_touch');
        if (uiTouch) {
            var uiAnima = uiTouch.getComponent(cc.Animation).getAnimationState('ui_touch');
            if (uiAnima) {
                uiAnima.speed = Constants_1.JiaSu;
            }
        }
        heroNode.setParent(this.node);
        heroNode.zIndex = 2;
    };
    SkillManager.prototype.startBaiPing = function () {
        var bai = this.node.getChildByName('bai');
        bai.active = true;
        bai.opacity = 255;
        cc.tween(bai).to(0.2 * GameManager_1.default.getInstance().getGameRate(), { opacity: 0 }).start();
    };
    /**设置时停效果 */
    SkillManager.prototype.setTimeStop = function (isShow) {
        this.node.getChildByName('bg').active = isShow;
        if (isShow) {
            //1.添加蒙版,播放前奏动画,全部时停,放慢10000倍        
            GameManager_1.default.getInstance().setFightingRate(1 / Constants_1.JiaSu);
            var bai = this.node.getChildByName('bai');
            bai.opacity = 0;
            this.setIsSkillState(true);
        }
        else {
            GameManager_1.default.getInstance().setFightingRate(1);
        }
    };
    SkillManager.prototype.setIsSkillState = function (isSkill) {
        this.is_skill_state = isSkill;
    };
    SkillManager.prototype.getIsSkillState = function () {
        return this.is_skill_state;
    };
    /**3.0版本,设置技能状态 */
    SkillManager.prototype.releaseSkillResult = function (isCompelete) {
        this.node.getChildByName('bg').active = !isCompelete;
        GameManager_1.default.getInstance().setFightingRate(isCompelete ? 1 : 1 / Constants_1.SkillSpeedRate);
    };
    /**记录技能伤害 */
    SkillManager.prototype.recordDamage = function (id, value) {
        var _this = this;
        if (this.damage_record.has(id)) {
            this.damage_record.get(id).refreshValue(value);
        }
        else {
            var recorder = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.skill_damage_record, cc.v2(0, -320), this.record_root);
            var damageRecord = recorder.getComponent(DamageRecord_1.default);
            damageRecord.init(GameEffectsManager_1.GameEffectId.skill_damage_record, id, value, function (id) {
                _this.damage_record.delete(id);
            });
            this.damage_record.set(id, damageRecord);
            cc.tween(recorder).to(0.2, { x: 0 }).start();
        }
    };
    SkillManager.prototype.showSkillRange = function (posY, distance) {
        this.skill_range.stopAllActions();
        this.skill_range.y = posY;
        this.skill_range.height = distance;
        this.skill_range.opacity = 255;
        this.setSkillRange(true);
        //cc.tween(this.skill_range).to(0.2*GameManager.getInstance().getGameRate(),{opacity:255}).start();
    };
    SkillManager.prototype.setSkillRange = function (isCan) {
        this.skill_range.color = isCan ? cc.Color.WHITE : cc.Color.RED;
    };
    SkillManager.prototype.hideSkillRange = function () {
        this.skill_range.stopAllActions();
        this.skill_range.opacity = 0;
        //cc.tween(this.skill_range).to(0.1*GameManager.getInstance().getGameRate(),{opacity:0}).start();
    };
    /**德鲁伊专武，伤害比率 */
    SkillManager.prototype.setDeLuYiEx = function (num) {
        this.de_lu_yi_ex = num;
    };
    /**德鲁伊专武，伤害比率 */
    SkillManager.prototype.getDeLuYiEx = function () {
        return this.de_lu_yi_ex;
    };
    var SkillManager_1;
    SkillManager._instance = null;
    SkillManager = SkillManager_1 = __decorate([
        ccclass
    ], SkillManager);
    return SkillManager;
}(MapNodePool_1.default));
exports.default = SkillManager;

cc._RF.pop();