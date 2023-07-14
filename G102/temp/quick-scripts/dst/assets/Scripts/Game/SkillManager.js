
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcU2tpbGxNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUF3RTtBQUN4RSw2Q0FBd0M7QUFDeEMsOENBQXlDO0FBQ3pDLDZDQUE0QztBQUM1QywwQ0FBcUQ7QUFDckQsMERBQXFEO0FBQ3JELDBEQUFxRDtBQUcvQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBVztJQUFyRDtRQUFBLHFFQXNJQztRQW5JRywwQkFBMEI7UUFDbEIsb0JBQWMsR0FBUyxLQUFLLENBQUM7UUFDN0IsbUJBQWEsR0FBMEIsSUFBSSxDQUFDO1FBQzVDLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBQ3pCLGlCQUFXLEdBQVEsQ0FBQyxDQUFDOztJQThIakMsQ0FBQztxQkF0SW9CLFlBQVk7SUFTZix3QkFBVyxHQUF6QjtRQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsNkJBQU0sR0FBTjtRQUNJLGNBQVksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUMsSUFBSSxHQUFHLEVBQXVCLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFUyxnQ0FBUyxHQUFuQjtRQUNJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsY0FBWSxD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LENBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDN0QsQ0FBQztJQUVELHFDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztRQUMzQixpR0FBaUc7SUFDckcsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixrQ0FBVyxHQUFYLFVBQVksR0FBVTtRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFDLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLGtDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7SUFuSWMsc0JBQVMsR0FBaUIsSUFBSSxDQUFDO0lBRjdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FzSWhDO0lBQUQsbUJBQUM7Q0F0SUQsQUFzSUMsQ0F0SXlDLHFCQUFXLEdBc0lwRDtrQkF0SW9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgTWFwTm9kZVBvb2wgZnJvbSBcIi4vTWFwTm9kZVBvb2xcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEppYVN1LCBTa2lsbFNwZWVkUmF0ZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRGFtYWdlUmVjb3JkIGZyb20gXCIuLi9IZXJvL0dhbWUvRGFtYWdlUmVjb3JkXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2lsbE1hbmFnZXIgZXh0ZW5kcyBNYXBOb2RlUG9vbCB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTa2lsbE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLyoq5piv5ZCm5aSE5LqO6YeK5pS+5oqA6IO955qE54q25oCB77yM55So5LqO6Ieq5Yqo5oiY5paX5Yik5patICovXHJcbiAgICBwcml2YXRlIGlzX3NraWxsX3N0YXRlOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIGRhbWFnZV9yZWNvcmQ6TWFwPG51bWJlcixEYW1hZ2VSZWNvcmQ+PW51bGw7XHJcbiAgICBwcml2YXRlIHJlY29yZF9yb290OmNjLk5vZGU9bnVsbDtcclxuICAgIHByaXZhdGUgc2tpbGxfcmFuZ2U6Y2MuTm9kZT1udWxsO1xyXG4gICAgcHJpdmF0ZSBkZV9sdV95aV9leDpudW1iZXI9MDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTa2lsbE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuX2luc3RhbmNlPXRoaXM7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfcmVjb3JkPW5ldyBNYXA8bnVtYmVyLERhbWFnZVJlY29yZD4oKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVjb3JkX3Jvb3Q9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdyZWNvcmRfcm9vdCcpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2U9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdza2lsbF9yYW5nZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfcmVjb3JkLmNsZWFyKCk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLl9pbnN0YW5jZT1udWxsOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2uaWTliJvlu7rkuIDkuKrnibnmlYgqL1xyXG4gICAgcHVibGljIGNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkOkdhbWVFZmZlY3RJZCxwb3M6Y2MuVmVjMik6Y2MuTm9kZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoaWQscG9zLHRoaXMubm9kZSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICByZWxlYXNlU2tpbGwoY29tcGxldGVDYWxsYmFjazpGdW5jdGlvbixoZXJvTm9kZTpjYy5Ob2RlKXsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9YdWxpKTtcclxuICAgICAgICB0aGlzLnNldFRpbWVTdG9wKHRydWUpO1xyXG4gICAgICAgIGxldCBjb21tb25BbmltYT10aGlzLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5oZXJvX3NraWxsX2NvbW1vbixoZXJvTm9kZS5nZXRQb3NpdGlvbigpLmFkZChjYy52MigwLDEwMCkpKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBjb21tb25BbmltYS5ub2RlLnpJbmRleD0zO1xyXG4gICAgICAgIGxldCBjb21tb25TdGF0ZT1jb21tb25BbmltYS5wbGF5KCk7XHJcbiAgICAgICAgY29tbW9uU3RhdGUuc3BlZWQ9SmlhU3U7XHJcbiAgICAgICAgY29tbW9uQW5pbWEub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+e1xyXG4gICAgICAgICAgICBjb21tb25BbmltYS5vZmYoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCk7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuaGVyb19za2lsbF9jb21tb24sY29tbW9uQW5pbWEubm9kZSk7XHJcbiAgICAgICAgICAgIGNvbXBsZXRlQ2FsbGJhY2soKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCB1aVRvdWNoPVVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VpX3RvdWNoJyk7XHJcbiAgICAgICAgaWYodWlUb3VjaCl7XHJcbiAgICAgICAgICAgIGxldCB1aUFuaW1hPXVpVG91Y2guZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikuZ2V0QW5pbWF0aW9uU3RhdGUoJ3VpX3RvdWNoJyk7XHJcbiAgICAgICAgICAgIGlmKHVpQW5pbWEpe1xyXG4gICAgICAgICAgICAgICAgdWlBbmltYS5zcGVlZD1KaWFTdTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBoZXJvTm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICBoZXJvTm9kZS56SW5kZXg9MjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEJhaVBpbmcoKXtcclxuICAgICAgICBsZXQgYmFpPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmFpJyk7XHJcbiAgICAgICAgYmFpLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIGJhaS5vcGFjaXR5PTI1NTtcclxuICAgICAgICBjYy50d2VlbihiYWkpLnRvKDAuMipHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkse29wYWNpdHk6MH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7ml7blgZzmlYjmnpwgKi9cclxuICAgIHNldFRpbWVTdG9wKGlzU2hvdzpib29sZWFuKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlPWlzU2hvdztcclxuICAgICAgICBpZihpc1Nob3cpe1xyXG4gICAgICAgICAgICAvLzEu5re75Yqg6JKZ54mILOaSreaUvuWJjeWlj+WKqOeUuyzlhajpg6jml7blgZws5pS+5oWiMTAwMDDlgI0gICAgICAgIFxyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEZpZ2h0aW5nUmF0ZSgxL0ppYVN1KTtcclxuICAgICAgICAgICAgbGV0IGJhaT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JhaScpO1xyXG4gICAgICAgICAgICBiYWkub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICB0aGlzLnNldElzU2tpbGxTdGF0ZSh0cnVlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRGaWdodGluZ1JhdGUoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldElzU2tpbGxTdGF0ZShpc1NraWxsOmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuaXNfc2tpbGxfc3RhdGU9aXNTa2lsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc1NraWxsU3RhdGUoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX3NraWxsX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKjMuMOeJiOacrCzorr7nva7mioDog73nirbmgIEgKi9cclxuICAgIHJlbGVhc2VTa2lsbFJlc3VsdChpc0NvbXBlbGV0ZTpib29sZWFuKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJykuYWN0aXZlPSFpc0NvbXBlbGV0ZTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEZpZ2h0aW5nUmF0ZShpc0NvbXBlbGV0ZT8xOjEvU2tpbGxTcGVlZFJhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiusOW9leaKgOiDveS8pOWusyAqL1xyXG4gICAgcmVjb3JkRGFtYWdlKGlkOm51bWJlcix2YWx1ZTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuZGFtYWdlX3JlY29yZC5oYXMoaWQpKXtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VfcmVjb3JkLmdldChpZCkucmVmcmVzaFZhbHVlKHZhbHVlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHJlY29yZGVyPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLnNraWxsX2RhbWFnZV9yZWNvcmQsY2MudjIoMCwtMzIwKSx0aGlzLnJlY29yZF9yb290KTtcclxuICAgICAgICAgICAgbGV0IGRhbWFnZVJlY29yZD1yZWNvcmRlci5nZXRDb21wb25lbnQoRGFtYWdlUmVjb3JkKTtcclxuICAgICAgICAgICAgZGFtYWdlUmVjb3JkLmluaXQoR2FtZUVmZmVjdElkLnNraWxsX2RhbWFnZV9yZWNvcmQsaWQsdmFsdWUsKGlkOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlX3JlY29yZC5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kYW1hZ2VfcmVjb3JkLnNldChpZCxkYW1hZ2VSZWNvcmQpO1xyXG4gICAgICAgICAgICBjYy50d2VlbihyZWNvcmRlcikudG8oMC4yLHt4OjB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93U2tpbGxSYW5nZShwb3NZOm51bWJlcixkaXN0YW5jZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2Uuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnNraWxsX3JhbmdlLnk9cG9zWTtcclxuICAgICAgICB0aGlzLnNraWxsX3JhbmdlLmhlaWdodD1kaXN0YW5jZTtcclxuICAgICAgICB0aGlzLnNraWxsX3JhbmdlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgIHRoaXMuc2V0U2tpbGxSYW5nZSh0cnVlKTtcclxuICAgICAgICAvL2NjLnR3ZWVuKHRoaXMuc2tpbGxfcmFuZ2UpLnRvKDAuMipHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkse29wYWNpdHk6MjU1fSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTa2lsbFJhbmdlKGlzQ2FuOmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2UuY29sb3I9aXNDYW4/Y2MuQ29sb3IuV0hJVEU6Y2MuQ29sb3IuUkVEO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVTa2lsbFJhbmdlKCl7XHJcbiAgICAgICAgdGhpcy5za2lsbF9yYW5nZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc2tpbGxfcmFuZ2Uub3BhY2l0eT0wO1xyXG4gICAgICAgIC8vY2MudHdlZW4odGhpcy5za2lsbF9yYW5nZSkudG8oMC4xKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSx7b3BhY2l0eTowfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlvrfpsoHkvIrkuJPmrabvvIzkvKTlrrPmr5TnjocgKi9cclxuICAgIHNldERlTHVZaUV4KG51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZGVfbHVfeWlfZXg9bnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuW+t+mygeS8iuS4k+atpu+8jOS8pOWus+avlOeOhyAqL1xyXG4gICAgZ2V0RGVMdVlpRXgoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVfbHVfeWlfZXg7XHJcbiAgICB9XHJcbn1cclxuIl19