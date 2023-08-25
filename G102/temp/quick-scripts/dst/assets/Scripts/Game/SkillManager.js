
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/SkillManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcU2tpbGxNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUF3RTtBQUN4RSw2Q0FBd0M7QUFDeEMsOENBQXlDO0FBQ3pDLDZDQUE0QztBQUM1QywwQ0FBcUQ7QUFDckQsMERBQXFEO0FBQ3JELDBEQUFxRDtBQUcvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBVztJQUFyRDtRQUFBLHFFQXdJQztRQXJJRywwQkFBMEI7UUFDbEIsb0JBQWMsR0FBUyxLQUFLLENBQUM7UUFDN0IsbUJBQWEsR0FBMEIsSUFBSSxDQUFDO1FBQzVDLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLGlCQUFXLEdBQVEsQ0FBQyxDQUFDOztJQWdJakMsQ0FBQztxQkF4SW9CLFlBQVk7SUFTZix3QkFBVyxHQUF6QjtRQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNJLGNBQVksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSxHQUFHLEVBQXVCLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFUyxnQ0FBUyxHQUFuQjtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsY0FBWSxD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QUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDN0QsQ0FBQztJQUVELHFDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztRQUMzQixpR0FBaUc7SUFDckcsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixrQ0FBVyxHQUFYLFVBQVksR0FBVTtRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFDLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLGtDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7SUFySWMsc0JBQVMsR0FBaUIsSUFBSSxDQUFDO0lBRjdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F3SWhDO0lBQUQsbUJBQUM7Q0F4SUQsQUF3SUMsQ0F4SXlDLHFCQUFXLEdBd0lwRDtrQkF4SW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgTWFwTm9kZVBvb2wgZnJvbSBcIi4vTWFwTm9kZVBvb2xcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEppYVN1LCBTa2lsbFNwZWVkUmF0ZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRGFtYWdlUmVjb3JkIGZyb20gXCIuLi9IZXJvL0dhbWUvRGFtYWdlUmVjb3JkXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2lsbE1hbmFnZXIgZXh0ZW5kcyBNYXBOb2RlUG9vbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTa2lsbE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLyoq5piv5ZCm5aSE5LqO6YeK5pS+5oqA6IO955qE54q25oCB77yM55So5LqO6Ieq5Yqo5oiY5paX5Yik5patICovXHJcbiAgICBwcml2YXRlIGlzX3NraWxsX3N0YXRlOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIGRhbWFnZV9yZWNvcmQ6TWFwPG51bWJlcixEYW1hZ2VSZWNvcmQ+PW51bGw7XHJcbiAgICBwcml2YXRlIHJlY29yZF9yb290OmNjLk5vZGU9bnVsbDtcclxuICAgIHByaXZhdGUgc2tpbGxfcmFuZ2U6Y2MuTm9kZT1udWxsO1xyXG4gICAgcHJpdmF0ZSBkZV9sdV95aV9leDpudW1iZXI9MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTa2lsbE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuX2luc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfcmVjb3JkPW5ldyBNYXA8bnVtYmVyLERhbWFnZVJlY29yZD4oKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVjb3JkX3Jvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdyZWNvcmRfcm9vdCcpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2U9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdza2lsbF9yYW5nZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfcmVjb3JkLmNsZWFyKCk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLl9pbnN0YW5jZT1udWxsOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTliJvlu7rkuIDkuKrnibnmlYgqL1xyXG4gICAgcHVibGljIGNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkOkdhbWVFZmZlY3RJZCxwb3M6Y2MuVmVjMik6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoaWQscG9zLHRoaXMubm9kZSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICByZWxlYXNlU2tpbGwoY29tcGxldGVDYWxsYmFjazpGdW5jdGlvbixoZXJvTm9kZTpjYy5Ob2RlKXsgICBcclxuICAgICAgICBjb21wbGV0ZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgcmV0dXJuOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1h1bGkpO1xyXG4gICAgICAgIHRoaXMuc2V0VGltZVN0b3AodHJ1ZSk7XHJcbiAgICAgICAgbGV0IGNvbW1vbkFuaW1hPXRoaXMuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmhlcm9fc2tpbGxfY29tbW9uLGhlcm9Ob2RlLmdldFBvc2l0aW9uKCkuYWRkKGNjLnYyKDAsMTAwKSkpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgIGNvbW1vbkFuaW1hLm5vZGUuekluZGV4PTM7XHJcbiAgICAgICAgbGV0IGNvbW1vblN0YXRlPWNvbW1vbkFuaW1hLnBsYXkoKTtcclxuICAgICAgICBjb21tb25TdGF0ZS5zcGVlZD1KaWFTdTtcclxuICAgICAgICBjb21tb25BbmltYS5vbihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCgpPT57XHJcbiAgICAgICAgICAgIGNvbW1vbkFuaW1hLm9mZihjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVEKTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5oZXJvX3NraWxsX2NvbW1vbixjb21tb25BbmltYS5ub2RlKTtcclxuICAgICAgICAgICAgY29tcGxldGVDYWxsYmFjaygpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHVpVG91Y2g9VUlNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5nZXRDaGlsZEJ5TmFtZSgndWlfdG91Y2gnKTtcclxuICAgICAgICBpZih1aVRvdWNoKXtcclxuICAgICAgICAgICAgbGV0IHVpQW5pbWE9dWlUb3VjaC5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5nZXRBbmltYXRpb25TdGF0ZSgndWlfdG91Y2gnKTtcclxuICAgICAgICAgICAgaWYodWlBbmltYSl7XHJcbiAgICAgICAgICAgICAgICB1aUFuaW1hLnNwZWVkPUppYVN1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhlcm9Ob2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIGhlcm9Ob2RlLnpJbmRleD0yO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QmFpUGluZygpe1xyXG4gICAgICAgIGxldCBiYWk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiYWknKTtcclxuICAgICAgICBiYWkuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgYmFpLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIGNjLnR3ZWVuKGJhaSkudG8oMC4yKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSx7b3BhY2l0eTowfSkuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIC8qKuiuvue9ruaXtuWBnOaViOaenCAqL1xyXG4gICAgc2V0VGltZVN0b3AoaXNTaG93OmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmU9aXNTaG93O1xyXG4gICAgICAgIGlmKGlzU2hvdyl7XHJcbiAgICAgICAgICAgIC8vMS7mt7vliqDokpnniYgs5pKt5pS+5YmN5aWP5Yqo55S7LOWFqOmDqOaXtuWBnCzmlL7mhaIxMDAwMOWAjSAgICAgICAgXHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0RmlnaHRpbmdSYXRlKDEvSmlhU3UpO1xyXG4gICAgICAgICAgICBsZXQgYmFpPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmFpJyk7XHJcbiAgICAgICAgICAgIGJhaS5vcGFjaXR5PTA7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SXNTa2lsbFN0YXRlKHRydWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEZpZ2h0aW5nUmF0ZSgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNTa2lsbFN0YXRlKGlzU2tpbGw6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pc19za2lsbF9zdGF0ZT1pc1NraWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzU2tpbGxTdGF0ZSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfc2tpbGxfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqMy4w54mI5pysLOiuvue9ruaKgOiDveeKtuaAgSAqL1xyXG4gICAgcmVsZWFzZVNraWxsUmVzdWx0KGlzQ29tcGVsZXRlOmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKS5hY3RpdmU9IWlzQ29tcGVsZXRlO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0RmlnaHRpbmdSYXRlKGlzQ29tcGVsZXRlPzE6MS9Ta2lsbFNwZWVkUmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6w5b2V5oqA6IO95Lyk5a6zICovXHJcbiAgICByZWNvcmREYW1hZ2UoaWQ6bnVtYmVyLHZhbHVlOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5kYW1hZ2VfcmVjb3JkLmhhcyhpZCkpe1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZV9yZWNvcmQuZ2V0KGlkKS5yZWZyZXNoVmFsdWUodmFsdWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgcmVjb3JkZXI9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQuc2tpbGxfZGFtYWdlX3JlY29yZCxjYy52MigwLC0zMjApLHRoaXMucmVjb3JkX3Jvb3QpO1xyXG4gICAgICAgICAgICBsZXQgZGFtYWdlUmVjb3JkPXJlY29yZGVyLmdldENvbXBvbmVudChEYW1hZ2VSZWNvcmQpO1xyXG4gICAgICAgICAgICBkYW1hZ2VSZWNvcmQuaW5pdChHYW1lRWZmZWN0SWQuc2tpbGxfZGFtYWdlX3JlY29yZCxpZCx2YWx1ZSwoaWQ6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VfcmVjb3JkLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRhbWFnZV9yZWNvcmQuc2V0KGlkLGRhbWFnZVJlY29yZCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHJlY29yZGVyKS50bygwLjIse3g6MH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dTa2lsbFJhbmdlKHBvc1k6bnVtYmVyLGRpc3RhbmNlOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5za2lsbF9yYW5nZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2UueT1wb3NZO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2UuaGVpZ2h0PWRpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2Uub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgdGhpcy5zZXRTa2lsbFJhbmdlKHRydWUpO1xyXG4gICAgICAgIC8vY2MudHdlZW4odGhpcy5za2lsbF9yYW5nZSkudG8oMC4yKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSx7b3BhY2l0eToyNTV9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNraWxsUmFuZ2UoaXNDYW46Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5za2lsbF9yYW5nZS5jb2xvcj1pc0Nhbj9jYy5Db2xvci5XSElURTpjYy5Db2xvci5SRUQ7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZVNraWxsUmFuZ2UoKXtcclxuICAgICAgICB0aGlzLnNraWxsX3JhbmdlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5za2lsbF9yYW5nZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgLy9jYy50d2Vlbih0aGlzLnNraWxsX3JhbmdlKS50bygwLjEqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpLHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuW+t+mygeS8iuS4k+atpu+8jOS8pOWus+avlOeOhyAqL1xyXG4gICAgc2V0RGVMdVlpRXgobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5kZV9sdV95aV9leD1udW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5b636bKB5LyK5LiT5q2m77yM5Lyk5a6z5q+U546HICovXHJcbiAgICBnZXREZUx1WWlFeCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5kZV9sdV95aV9leDtcclxuICAgIH1cclxufVxyXG4iXX0=