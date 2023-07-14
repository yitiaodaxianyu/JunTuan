
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/XueGuai.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a722aBuhxNHsqV79/q1S9ri', 'XueGuai');
// Scripts/Monster/Elite/XueGuai.ts

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
var Constants_1 = require("../../Constants");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GroundManager_1 = require("../../Game/GroundManager");
var GameManager_1 = require("../../GameManager");
var Monster_1 = require("../Monster");
var MonsterManager_1 = require("../MonsterManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var XueGuai = /** @class */ (function (_super) {
    __extends(XueGuai, _super);
    function XueGuai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.light = null;
        _this.is_loaded = false;
        _this.load_num = 0;
        return _this;
    }
    XueGuai.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, 1, function () {
            //添加光环特效
            if (!_this.light) {
                _this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, _this.node.getPosition());
            }
            _this.load_num++;
            if (_this.load_num >= 2) {
                _this.is_loaded = true;
            }
        });
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, 8, function () {
            _this.load_num++;
            if (_this.load_num >= 2) {
                _this.is_loaded = true;
            }
        });
    };
    XueGuai.prototype.onMonsterNormalInited = function () {
        if (this.is_loaded) {
            if (!this.light) {
                this.light = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, this.node.getPosition());
            }
        }
        this.skill_cold_down[0] = this.skill_data.getSkillValue1(1);
    };
    XueGuai.prototype.onMonsterNormalDeath = function () {
        //以及删除所有光环数据
        if (this.light) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo, this.light);
            this.light = null;
        }
    };
    XueGuai.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (this.light) {
            this.light.setPosition(this.getCenterPos());
        }
    };
    XueGuai.prototype.checkSkill = function (dt) {
        if (this.is_loaded == true) {
            for (var i = 0; i < this.skill_cold_down.length; i++) {
                var isCanSkill = false;
                if (this.skill_cold_down[i] > 0) {
                    this.skill_cold_down[i] -= dt;
                    if (this.skill_cold_down[i] <= 0) {
                        isCanSkill = true;
                    }
                }
                else {
                    isCanSkill = true;
                }
                if (isCanSkill) {
                    this.skill_cold_down[i] = this.skill_data.getSkillValue1(1);
                    var allMonster = MonsterManager_1.default.getInstance().node.children;
                    var len = allMonster.length;
                    if (len <= 0) {
                        return null;
                    }
                    for (var i_1 = 0; i_1 < len; i_1++) {
                        var monster = allMonster[i_1];
                        var monsterTS = monster.getComponent(Monster_1.default);
                        if (monsterTS && monsterTS.getIsCanCheck()) {
                            var pos = monsterTS.getCenterPos();
                            var distance = this.getCenterPos().sub(pos).mag();
                            if (distance <= 200) {
                                //恢复生命值
                                var isOk = monsterTS.beHeal(this.getMaxHp() * this.skill_data.getSkillValue2(1));
                                if (isOk) {
                                    //特效
                                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, pos);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    XueGuai = __decorate([
        ccclass
    ], XueGuai);
    return XueGuai;
}(MonsterNewNormal_1.default));
exports.default = XueGuai;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXFh1ZUd1YWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLG9FQUFpRjtBQUNqRiwwREFBcUQ7QUFDckQsaURBQTRDO0FBRTVDLHNDQUFpQztBQUNqQyxvREFBK0M7QUFDL0Msd0RBQW1EO0FBRzdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFnQjtJQUFyRDtRQUFBLHFFQXVHQztRQXJHRyxXQUFLLEdBQVMsSUFBSSxDQUFDO1FBQ25CLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsY0FBUSxHQUFRLENBQUMsQ0FBQzs7SUFtR3RCLENBQUM7SUFqR2Esd0JBQU0sR0FBaEI7UUFBQSxpQkFzQkM7UUFyQkcsaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixpQkFBTSxzQkFBc0IsWUFBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxpQkFBTSxxQkFBcUIsWUFBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUN2RCx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLG9CQUFvQixFQUFDLENBQUMsRUFBQztZQUNuRixRQUFRO1lBQ1IsSUFBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUM7Z0JBQ1gsS0FBSSxDQUFDLEtBQUssR0FBQyx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsb0JBQW9CLEVBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQzFIO1lBQ0QsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUcsS0FBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLEVB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cm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIYWxvRGF0YSwgSGFsb0lkIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi9Nb25zdGVyXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFh1ZUd1YWkgZXh0ZW5kcyBNb25zdGVyTmV3Tm9ybWFsIHtcclxuXHJcbiAgICBsaWdodDpjYy5Ob2RlPW51bGw7XHJcbiAgICBpc19sb2FkZWQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGxvYWRfbnVtOm51bWJlcj0wO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbEluaXRlZCh0aGlzLm9uTW9uc3Rlck5vcm1hbEluaXRlZCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbERlYXRoKHRoaXMub25Nb25zdGVyTm9ybWFsRGVhdGgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsbywxLCgpPT57XHJcbiAgICAgICAgICAgIC8v5re75Yqg5YWJ546v54m55pWIXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmxpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlnaHQ9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsbyx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkX251bSsrO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvYWRfbnVtPj0yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZGVkPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGlsaWFvX2hhbG9faGl0LDgsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5sb2FkX251bSsrO1xyXG4gICAgICAgICAgICBpZih0aGlzLmxvYWRfbnVtPj0yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfbG9hZGVkPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsSW5pdGVkICgpIHtcclxuICAgICAgICBpZih0aGlzLmlzX2xvYWRlZCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmxpZ2h0KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlnaHQ9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsbyx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bMF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9uc3Rlck5vcm1hbERlYXRoKCl7XHJcbiAgICAgICAgLy/ku6Xlj4rliKDpmaTmiYDmnInlhYnnjq/mlbDmja5cclxuICAgICAgICBpZih0aGlzLmxpZ2h0KXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsbyx0aGlzLmxpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5saWdodD1udWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1NraWxsKGR0KTtcclxuICAgICAgICBpZih0aGlzLmxpZ2h0KXtcclxuICAgICAgICAgICAgdGhpcy5saWdodC5zZXRQb3NpdGlvbih0aGlzLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfbG9hZGVkPT10cnVlKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5za2lsbF9jb2xkX2Rvd24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzQ2FuU2tpbGw9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX2NvbGRfZG93bltpXT4wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltpXS09ZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NhblNraWxsPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDYW5Ta2lsbD10cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXNDYW5Ta2lsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhbGxNb25zdGVyPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuPWFsbE1vbnN0ZXIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxlbjw9MClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPGxlbjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXI9YWxsTW9uc3RlcltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUUz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlclRTICYmIG1vbnN0ZXJUUy5nZXRJc0NhbkNoZWNrKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9bW9uc3RlclRTLmdldENlbnRlclBvcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXRoaXMuZ2V0Q2VudGVyUG9zKCkuc3ViKHBvcykubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaXN0YW5jZTw9MjAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5oGi5aSN55Sf5ZG95YC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzT2s9bW9uc3RlclRTLmJlSGVhbCh0aGlzLmdldE1heEhwKCkqdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc09rKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nibnmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdCxwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==