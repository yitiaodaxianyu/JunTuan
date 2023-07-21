
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Elite1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9a7b7ZL8YxC9rz/F2J5yb2r', 'Elite1');
// Scripts/Monster/Elite/Elite1.ts

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
var EnemyConfig_1 = require("../../Enemy/EnemyConfig");
var GameEffectsManager_1 = require("../../Game/GameEffectsManager");
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MyTool_1 = require("../../Tools/MyTool");
var WallManager_1 = require("../../Wall/WallManager");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite1 = /** @class */ (function (_super) {
    __extends(Elite1, _super);
    function Elite1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chongci_juli = 0;
        _this.is_chongci = false;
        _this.is_xuli = false;
        _this.chong_ci_speed = 1000;
        _this.jiasu = 200;
        _this.cur_jiasu = 0;
        _this.is_release_skill = false;
        return _this;
    }
    Elite1.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster37_shitouren, 1);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        this.addXuanYunListen(this.onXuanYunResult);
    };
    Elite1.prototype.onMonsterNormalInited = function () {
        this.chongci_juli = this.skill_data.getCastingRange(1);
        this.is_chongci = false;
        this.cur_jiasu = 0;
        this.is_release_skill = false;
    };
    Elite1.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            if (!_super.prototype.getIsDie.call(this)) {
                this.startIdle();
                this.setEnemyState(EnemyConfig_1.Enemy_State.move);
            }
        }
    };
    Elite1.prototype.startXuanYun = function () {
        this.unschedule(this.startChongCi);
        this.is_xuli = false;
    };
    Elite1.prototype.startSkill = function () {
        this.setEnemyState(EnemyConfig_1.Enemy_State.skill);
        //蓄力
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill1_1", true, null, null);
        this.is_xuli = true;
        this.scheduleOnce(this.startChongCi, 3);
        this.is_release_skill = true;
    };
    Elite1.prototype.startChongCi = function () {
        if (this.is_xuli == true) {
            this.is_xuli = false;
            this.is_chongci = true;
            this.cur_toughness += 1;
            //冲刺
            _super.prototype.playSpinAnimaton.call(this, "Side_Skill1_2", true, null, null);
        }
    };
    Elite1.prototype.endChongCi = function (wall) {
        var _this = this;
        this.cur_toughness -= 1;
        this.is_chongci = false;
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill1_3", false, null, function () {
            _this.startIdle();
            _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        });
        var data = wall.beInjured(this.getAttData(HeroConfig_1.DamageType.Skill, false, this.skill_data.getSkillValue1(1)));
        if (data.getDamageNum() > 0) {
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster37_shitouren, cc.v2(this.node.x, wall.getWallMaxYY()));
        }
        cc.tween(this.node).by(0.2, { y: this.base_data.AttackDistance }).start();
        MyTool_1.default.randomSceneShakeSmall();
    };
    Elite1.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        //this.checkSkill(dt);
    };
    Elite1.prototype.checkSkill = function (dt) {
        var _this = this;
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
            if (this.is_release_skill == true) {
                return;
            }
            var walls = WallManager_1.default.getInstance().getAllWall();
            var attWall_1 = null;
            walls.forEach(function (wall, wallType) {
                //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                var distance = Math.abs(_this.node.y - wall.getWallMaxYY());
                if (_this.node.y >= wall.getWallMaxYY() && distance <= _this.chongci_juli && distance > _this.base_data.AttackDistance) {
                    attWall_1 = wall;
                }
            });
            if (attWall_1) {
                this.startSkill();
            }
        }
        else {
            if (this.is_chongci) {
                this.cur_jiasu += dt * this.jiasu;
                this.node.y -= dt * (this.chong_ci_speed + this.cur_jiasu);
                var walls = WallManager_1.default.getInstance().getAllWall();
                var attWall_2 = null;
                walls.forEach(function (wall, wallType) {
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance / 2) {
                        attWall_2 = wall;
                    }
                });
                if (attWall_2) {
                    this.endChongCi(attWall_2);
                }
                else {
                    var mainWall = WallManager_1.default.getInstance().getMainWall();
                    if (this.node.y <= mainWall.getWallMaxYY()) {
                        this.endChongCi(mainWall);
                    }
                }
            }
        }
    };
    Elite1 = __decorate([
        ccclass
    ], Elite1);
    return Elite1;
}(MonsterNewNormal_1.default));
exports.default = Elite1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw2Q0FBNEM7QUFDNUMsdURBQXNEO0FBQ3RELG9FQUFpRjtBQUNqRixpREFBNEM7QUFDNUMseURBQXdEO0FBQ3hELDZDQUF3QztBQUd4QyxzREFBaUQ7QUFFakQsd0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFnQjtJQUFwRDtRQUFBLHFFQThIQztRQTVIRyxrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixnQkFBVSxHQUFTLEtBQUssQ0FBQztRQUN6QixhQUFPLEdBQVMsS0FBSyxDQUFDO1FBQ3RCLG9CQUFjLEdBQVEsSUFBSSxDQUFDO1FBQzNCLFdBQUssR0FBUSxHQUFHLENBQUM7UUFDakIsZUFBUyxHQUFRLENBQUMsQ0FBQztRQUNuQixzQkFBZ0IsR0FBUyxLQUFLLENBQUM7O0lBc0huQyxDQUFDO0lBcEhhLHVCQUFNLEdBQWhCO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHNDQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBQyxLQUFLLENB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SG5EO2tCQTlIb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHsgR2FtZVN0YXRlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxpdGUxIGV4dGVuZHMgTW9uc3Rlck5ld05vcm1hbCB7XHJcblxyXG4gICAgY2hvbmdjaV9qdWxpOm51bWJlcj0wO1xyXG4gICAgaXNfY2hvbmdjaTpib29sZWFuPWZhbHNlO1xyXG4gICAgaXNfeHVsaTpib29sZWFuPWZhbHNlO1xyXG4gICAgY2hvbmdfY2lfc3BlZWQ6bnVtYmVyPTEwMDA7XHJcbiAgICBqaWFzdTpudW1iZXI9MjAwO1xyXG4gICAgY3VyX2ppYXN1Om51bWJlcj0wO1xyXG4gICAgaXNfcmVsZWFzZV9za2lsbDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7ICBcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjM3X3NoaXRvdXJlbiwxKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsSW5pdGVkKHRoaXMub25Nb25zdGVyTm9ybWFsSW5pdGVkKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9uc3Rlck5vcm1hbEluaXRlZCAoKSB7XHJcbiAgICAgICAgdGhpcy5jaG9uZ2NpX2p1bGk9dGhpcy5za2lsbF9kYXRhLmdldENhc3RpbmdSYW5nZSgxKTtcclxuICAgICAgICB0aGlzLmlzX2Nob25nY2k9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXJfamlhc3U9MDtcclxuICAgICAgICB0aGlzLmlzX3JlbGVhc2Vfc2tpbGw9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYdWFuWXVuKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLnN0YXJ0Q2hvbmdDaSk7XHJcbiAgICAgICAgdGhpcy5pc194dWxpPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwoKXtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgIC8v6JOE5YqbXHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGwxXzFcIix0cnVlLG51bGwsbnVsbCk7XHJcbiAgICAgICAgdGhpcy5pc194dWxpPXRydWU7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5zdGFydENob25nQ2ksMyk7XHJcbiAgICAgICAgdGhpcy5pc19yZWxlYXNlX3NraWxsPXRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRDaG9uZ0NpKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc194dWxpPT10cnVlKXtcclxuICAgICAgICAgICAgdGhpcy5pc194dWxpPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzX2Nob25nY2k9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzKz0xO1xyXG4gICAgICAgICAgICAvL+WGsuWIulxyXG4gICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKFwiU2lkZV9Ta2lsbDFfMlwiLHRydWUsbnVsbCxudWxsKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBlbmRDaG9uZ0NpKHdhbGw6V2FsbCl7XHJcbiAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzLT0xO1xyXG4gICAgICAgIHRoaXMuaXNfY2hvbmdjaT1mYWxzZTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKFwiU2lkZV9Ta2lsbDFfM1wiLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBkYXRhPXdhbGwuYmVJbmp1cmVkKHRoaXMuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgxKSkpO1xyXG4gICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyMzdfc2hpdG91cmVuLGNjLnYyKHRoaXMubm9kZS54LHdhbGwuZ2V0V2FsbE1heFlZKCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS5ieSgwLjIse3k6dGhpcy5iYXNlX2RhdGEuQXR0YWNrRGlzdGFuY2V9KS5zdGFydCgpO1xyXG4gICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgLy90aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrU2tpbGwoZHQ6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX3JlbGVhc2Vfc2tpbGw9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICAgICAgbGV0IGF0dFdhbGw9bnVsbDtcclxuICAgICAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/mlLvlh7vln47lopnnmoTmnaHku7Yx77yM5b+F6aG75Zyo5Z+O5aKZ5LmL5LiKLDLovr7liLDmlLvlh7vot53nprtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT1NYXRoLmFicyh0aGlzLm5vZGUueS13YWxsLmdldFdhbGxNYXhZWSgpKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55Pj13YWxsLmdldFdhbGxNYXhZWSgpJiZkaXN0YW5jZTw9dGhpcy5jaG9uZ2NpX2p1bGkmJmRpc3RhbmNlPnRoaXMuYmFzZV9kYXRhLkF0dGFja0Rpc3RhbmNlKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYXR0V2FsbD13YWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoYXR0V2FsbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2Nob25nY2kpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfamlhc3UrPWR0KnRoaXMuamlhc3U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueS09ZHQqKHRoaXMuY2hvbmdfY2lfc3BlZWQrdGhpcy5jdXJfamlhc3UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdhbGxzPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsV2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGF0dFdhbGw9bnVsbDtcclxuICAgICAgICAgICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6V2FsbCx3YWxsVHlwZTpXYWxsVHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAvL+aUu+WHu+WfjuWimeeahOadoeS7tjHvvIzlv4XpobvlnKjln47lopnkuYvkuIosMui+vuWIsOaUu+WHu+i3neemu1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55Pj13YWxsLmdldFdhbGxNYXhZWSgpJiZNYXRoLmFicyh0aGlzLm5vZGUueS13YWxsLmdldFdhbGxNYXhZWSgpKTw9dGhpcy5iYXNlX2RhdGEuQXR0YWNrRGlzdGFuY2UvMil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmKGF0dFdhbGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kQ2hvbmdDaShhdHRXYWxsKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYWluV2FsbD1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk8PW1haW5XYWxsLmdldFdhbGxNYXhZWSgpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRDaG9uZ0NpKG1haW5XYWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=