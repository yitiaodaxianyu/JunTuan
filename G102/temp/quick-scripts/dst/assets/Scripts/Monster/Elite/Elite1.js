
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
        this.checkSkill(dt);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSw2Q0FBNEM7QUFDNUMsdURBQXNEO0FBQ3RELG9FQUFpRjtBQUNqRixpREFBNEM7QUFDNUMseURBQXdEO0FBQ3hELDZDQUF3QztBQUd4QyxzREFBaUQ7QUFFakQsd0RBQW1EO0FBRTdDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFnQjtJQUFwRDtRQUFBLHFFQThIQztRQTVIRyxrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixnQkFBVSxHQUFTLEtBQUssQ0FBQztRQUN6QixhQUFPLEdBQVMsS0FBSyxDQUFDO1FBQ3RCLG9CQUFjLEdBQVEsSUFBSSxDQUFDO1FBQzNCLFdBQUssR0FBUSxHQUFHLENBQUM7UUFDakIsZUFBUyxHQUFRLENBQUMsQ0FBQztRQUNuQixzQkFBZ0IsR0FBUyxLQUFLLENBQUM7O0lBc0huQyxDQUFDO0lBcEhhLHVCQUFNLEdBQWhCO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBWSxDQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHNDQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsR0FBQyxLQUFLLENB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QTlIRCxBQThIQyxDQTlIbUMsMEJBQWdCLEdBOEhuRDtrQkE5SG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRW5lbXlfU3RhdGUgfSBmcm9tIFwiLi4vLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBEYW1hZ2VUeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTmV3Tm9ybWFsIGZyb20gXCIuLi9Nb25zdGVyTmV3Tm9ybWFsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsaXRlMSBleHRlbmRzIE1vbnN0ZXJOZXdOb3JtYWwge1xyXG5cclxuICAgIGNob25nY2lfanVsaTpudW1iZXI9MDtcclxuICAgIGlzX2Nob25nY2k6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGlzX3h1bGk6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGNob25nX2NpX3NwZWVkOm51bWJlcj0xMDAwO1xyXG4gICAgamlhc3U6bnVtYmVyPTIwMDtcclxuICAgIGN1cl9qaWFzdTpudW1iZXI9MDtcclxuICAgIGlzX3JlbGVhc2Vfc2tpbGw6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpOyAgXHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIzN19zaGl0b3VyZW4sMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTW9uc3Rlck5vcm1hbEluaXRlZCh0aGlzLm9uTW9uc3Rlck5vcm1hbEluaXRlZCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxJbml0ZWQgKCkge1xyXG4gICAgICAgIHRoaXMuY2hvbmdjaV9qdWxpPXRoaXMuc2tpbGxfZGF0YS5nZXRDYXN0aW5nUmFuZ2UoMSk7XHJcbiAgICAgICAgdGhpcy5pc19jaG9uZ2NpPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VyX2ppYXN1PTA7XHJcbiAgICAgICAgdGhpcy5pc19yZWxlYXNlX3NraWxsPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighc3VwZXIuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zdGFydENob25nQ2kpO1xyXG4gICAgICAgIHRoaXMuaXNfeHVsaT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsKCl7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAvL+iThOWKm1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oXCJTaWRlX1NraWxsMV8xXCIsdHJ1ZSxudWxsLG51bGwpO1xyXG4gICAgICAgIHRoaXMuaXNfeHVsaT10cnVlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuc3RhcnRDaG9uZ0NpLDMpO1xyXG4gICAgICAgIHRoaXMuaXNfcmVsZWFzZV9za2lsbD10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0Q2hvbmdDaSgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfeHVsaT09dHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfeHVsaT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc19jaG9uZ2NpPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcys9MTtcclxuICAgICAgICAgICAgLy/lhrLliLpcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGwxXzJcIix0cnVlLG51bGwsbnVsbCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZW5kQ2hvbmdDaSh3YWxsOldhbGwpe1xyXG4gICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcy09MTtcclxuICAgICAgICB0aGlzLmlzX2Nob25nY2k9ZmFsc2U7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGwxXzNcIixmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgZGF0YT13YWxsLmJlSW5qdXJlZCh0aGlzLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSkpKTtcclxuICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjM3X3NoaXRvdXJlbixjYy52Mih0aGlzLm5vZGUueCx3YWxsLmdldFdhbGxNYXhZWSgpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkuYnkoMC4yLHt5OnRoaXMuYmFzZV9kYXRhLkF0dGFja0Rpc3RhbmNlfSkuc3RhcnQoKTtcclxuICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZVNtYWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfcmVsZWFzZV9za2lsbD09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHdhbGxzPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsV2FsbCgpO1xyXG4gICAgICAgICAgICBsZXQgYXR0V2FsbD1udWxsO1xyXG4gICAgICAgICAgICB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICAvL+aUu+WHu+WfjuWimeeahOadoeS7tjHvvIzlv4XpobvlnKjln47lopnkuYvkuIosMui+vuWIsOaUu+WHu+i3neemu1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPU1hdGguYWJzKHRoaXMubm9kZS55LXdhbGwuZ2V0V2FsbE1heFlZKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+PXdhbGwuZ2V0V2FsbE1heFlZKCkmJmRpc3RhbmNlPD10aGlzLmNob25nY2lfanVsaSYmZGlzdGFuY2U+dGhpcy5iYXNlX2RhdGEuQXR0YWNrRGlzdGFuY2UpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhdHRXYWxsPXdhbGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihhdHRXYWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfY2hvbmdjaSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9qaWFzdSs9ZHQqdGhpcy5qaWFzdTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55LT1kdCoodGhpcy5jaG9uZ19jaV9zcGVlZCt0aGlzLmN1cl9qaWFzdSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0V2FsbD1udWxsO1xyXG4gICAgICAgICAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+PXdhbGwuZ2V0V2FsbE1heFlZKCkmJk1hdGguYWJzKHRoaXMubm9kZS55LXdhbGwuZ2V0V2FsbE1heFlZKCkpPD10aGlzLmJhc2VfZGF0YS5BdHRhY2tEaXN0YW5jZS8yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0V2FsbD13YWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYoYXR0V2FsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRDaG9uZ0NpKGF0dFdhbGwpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1haW5XYWxsPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueTw9bWFpbldhbGwuZ2V0V2FsbE1heFlZKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZENob25nQ2kobWFpbldhbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==