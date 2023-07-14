
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Elite73.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71c83bAsytP2I+g15u5Xnr4', 'Elite73');
// Scripts/Monster/Elite/Elite73.ts

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
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite73 = /** @class */ (function (_super) {
    __extends(Elite73, _super);
    function Elite73() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_skill_state = false;
        _this.gou = null;
        _this.is_gou_ok = false;
        /**铁链之间的间隔距离 */
        _this.lian_jiange = 65;
        _this.lian_height = 74;
        _this.lian_jiaoji = -9;
        _this.lian_root = null;
        /**勾的终点,勾的锚点 */
        _this.dis_yy = -1000;
        _this.gou_speed = 4000;
        return _this;
    }
    Elite73.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalXuanYun.call(this, this.onMonsterNormalXuanYun);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster73_skill_lian, 8);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster73_skill_lian_root);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster73_skill_mao);
    };
    Elite73.prototype.onMonsterNormalInited = function () {
        this.dis_yy = -1000;
    };
    Elite73.prototype.onMonsterNormalXuanYun = function (isXuanYun) {
    };
    Elite73.prototype.onMonsterNormalDeath = function () {
        this.is_skill_state = false;
        this.destroyLian();
    };
    Elite73.prototype.startSkill = function () {
        var _this = this;
        //冷却完毕，可以判断是否可以出钩
        var walls = WallManager_1.default.getInstance().getAllWall();
        var attWall = null;
        var offsetYY = 0;
        walls.forEach(function (wall, wallType) {
            //出钩满足大于80小于500.
            offsetYY = Math.abs(_this.node.y - wall.getWallMaxYY());
            if (_this.node.y >= wall.getWallMaxYY() && offsetYY > 80 && offsetYY < 500) {
                var newYY = wall.getWallMaxYY() + 80;
                if (newYY > _this.dis_yy) {
                    attWall = wall;
                    _this.dis_yy = newYY;
                }
            }
        });
        if (attWall) {
            this.setEnemyState(EnemyConfig_1.Enemy_State.skill);
            this.skill_cold_down[0] = this.skill_data.getSkillColdDown(1);
            var pos_1 = this.getAttPos();
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Skill";
            data.callback = function () {
                _this.is_skill_state = true;
                _this.skill_cold_down[0] = _this.skill_data.getSkillColdDown(1);
                //链锁Root
                _this.lian_root = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_lian_root, pos_1);
                //出钩
                _this.gou = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_mao, pos_1);
                if (_this.node.scaleX > 0) {
                    _this.gou.angle = 200;
                }
                else {
                    _this.gou.angle = 130;
                }
                //计算铁链数量
                var lianNum = Math.ceil(offsetYY / _this.lian_jiange) + 4;
                for (var i = 0; i < lianNum; i++) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.monster73_skill_lian, cc.v2(0, i * 65), _this.lian_root);
                }
                _this.lian_root.height = 0;
                _this.lian_root.angle = 180;
            };
            _super.prototype.playSpinAnimaton.call(this, "Side_Skill_1", false, data, function () {
                _super.prototype.playSpinAnimaton.call(_this, "Side_Skill_2", true);
            });
        }
    };
    Elite73.prototype.endSkill = function () {
        var _this = this;
        this.is_skill_state = false;
        this.destroyLian();
        _super.prototype.playSpinAnimaton.call(this, "Side_Skill_3", false, null, function () {
            if (_this.getIsDie() == false) {
                _this.startIdle();
                _this.setEnemyState(EnemyConfig_1.Enemy_State.move);
            }
        });
    };
    Elite73.prototype.destroyLian = function () {
        if (this.gou) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_mao, this.gou);
            this.gou = null;
        }
        if (this.lian_root) {
            for (var i = this.lian_root.childrenCount - 1; i >= 0; i--) {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_lian, this.lian_root.children[i]);
            }
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster73_skill_lian_root, this.lian_root);
            this.lian_root = null;
        }
    };
    Elite73.prototype.onGouColliderWall = function () {
        this.is_gou_ok = true;
    };
    Elite73.prototype.update = function (dt) {
        var _this = this;
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (this.is_skill_state && GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.gou) {
                if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                    this.onMonsterNormalXuanYun(true);
                    return;
                }
                var pos = _super.prototype.getAttPos.call(this);
                if (this.gou.y <= this.dis_yy) {
                    this.gou.y = this.dis_yy;
                    //跟随勾走
                    var offsetPos = this.gou.getPosition().sub(this.getAttPos());
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    this.node.y = this.node.y + Math.sin(dir) * dt * this.gou_speed / 3;
                    this.node.x = this.node.x + Math.cos(dir) * dt * this.gou_speed / 3;
                    pos = _super.prototype.getAttPos.call(this);
                    var walls = WallManager_1.default.getInstance().getAllWall();
                    var attWall_1 = null;
                    walls.forEach(function (wall, wallType) {
                        //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                        if (_this.node.y >= wall.getWallMaxYY()) {
                            attWall_1 = wall;
                        }
                    });
                    //this.gou.setPosition(pos);                    
                    offsetPos = this.gou.getPosition().sub(pos);
                    this.lian_root.height = offsetPos.mag();
                    dir = Math.atan2(offsetPos.y, offsetPos.x);
                    this.lian_root.angle = MyTool_1.default.radianToAngle(dir) - 90;
                    this.lian_root.setPosition(pos);
                    if (pos.y <= (attWall_1.getWallMaxYY() + 80)) {
                        this.endSkill();
                        return;
                    }
                }
                else {
                    //钩要先走
                    this.gou.y -= dt * this.gou_speed;
                    //铁链
                    var offsetPos = this.gou.getPosition().sub(pos);
                    this.lian_root.height = offsetPos.mag();
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    this.lian_root.angle = MyTool_1.default.radianToAngle(dir) - 90;
                    this.lian_root.setPosition(pos);
                    var walls = WallManager_1.default.getInstance().getAllWall();
                    walls.forEach(function (wall, wallType) {
                        //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                        if (_this.gou.y >= wall.getWallMaxYY()) {
                            var newYY = wall.getWallMaxYY() + 80;
                            if (newYY > _this.dis_yy) {
                                _this.dis_yy = newYY;
                            }
                        }
                    });
                }
                if ((pos.y <= this.dis_yy)) {
                    this.endSkill();
                    return;
                }
            }
        }
    };
    Elite73.prototype.checkSkill = function (dt) {
        for (var i = 0; i < 1; i++) {
            if (this.skill_cold_down[i] > 0) {
                this.skill_cold_down[i] -= dt;
                if (this.skill_cold_down[i] < 0) {
                    this.skill_cold_down[i] = 0;
                    this.startSkill();
                }
            }
            else {
                this.startSkill();
            }
        }
    };
    Elite73 = __decorate([
        ccclass
    ], Elite73);
    return Elite73;
}(MonsterNewNormal_1.default));
exports.default = Elite73;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlNzMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHlEQUFvRDtBQUNwRCw2Q0FBd0M7QUFHeEMsc0RBQWlEO0FBQ2pELDhDQUE4QztBQUM5Qyx3REFBbUQ7QUFFN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQWdCO0lBQXJEO1FBQUEscUVBa01DO1FBaE1HLG9CQUFjLEdBQVMsS0FBSyxDQUFDO1FBQzdCLFNBQUcsR0FBUyxJQUFJLENBQUM7UUFDakIsZUFBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixlQUFlO1FBQ2YsaUJBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsaUJBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsaUJBQVcsR0FBUSxDQUFDLENBQUMsQ0FBQztRQUN0QixlQUFTLEdBQVMsSUFBSSxDQUFDO1FBQ3ZCLGVBQWU7UUFDZixZQUFNLEdBQVEsQ0FBQyxJQUFJLENBQUM7UUFDcEIsZUFBUyxHQUFRLElBQUksQ0FBQzs7SUFzTDFCLENBQUM7SUFwTGEsd0JBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHVCQUF1QixZQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzNELGlCQUFNLHFCQUFxQixZQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZELHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsb0JBQW9CLEVBQUMsQ0FB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ZSxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQztnQkFDNUIsSUFBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQztvQkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDckI7YUFDSjtpQkFBSTtnQkFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7U0FDSjtJQUNMLENBQUM7SUFqTWdCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FrTTNCO0lBQUQsY0FBQztDQWxNRCxBQWtNQyxDQWxNb0MsMEJBQWdCLEdBa01wRDtrQkFsTW9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZklkIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uLy4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTmV3Tm9ybWFsIGZyb20gXCIuLi9Nb25zdGVyTmV3Tm9ybWFsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsaXRlNzMgZXh0ZW5kcyBNb25zdGVyTmV3Tm9ybWFsIHsgICAgXHJcblxyXG4gICAgaXNfc2tpbGxfc3RhdGU6Ym9vbGVhbj1mYWxzZTtcclxuICAgIGdvdTpjYy5Ob2RlPW51bGw7XHJcbiAgICBpc19nb3Vfb2s6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8qKumTgemTvuS5i+mXtOeahOmXtOmalOi3neemuyAqL1xyXG4gICAgbGlhbl9qaWFuZ2U6bnVtYmVyPTY1O1xyXG4gICAgbGlhbl9oZWlnaHQ6bnVtYmVyPTc0O1xyXG4gICAgbGlhbl9qaWFvamk6bnVtYmVyPS05O1xyXG4gICAgbGlhbl9yb290OmNjLk5vZGU9bnVsbDtcclxuICAgIC8qKuWLvueahOe7iOeCuSzli77nmoTplJrngrkgKi9cclxuICAgIGRpc195eTpudW1iZXI9LTEwMDA7XHJcbiAgICBnb3Vfc3BlZWQ6bnVtYmVyPTQwMDA7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsSW5pdGVkKHRoaXMub25Nb25zdGVyTm9ybWFsSW5pdGVkKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsWHVhbll1bih0aGlzLm9uTW9uc3Rlck5vcm1hbFh1YW5ZdW4pO1xyXG4gICAgICAgIHN1cGVyLmFkZE1vbnN0ZXJOb3JtYWxEZWF0aCh0aGlzLm9uTW9uc3Rlck5vcm1hbERlYXRoKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjczX3NraWxsX2xpYW4sOCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI3M19za2lsbF9saWFuX3Jvb3QpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzNfc2tpbGxfbWFvKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxJbml0ZWQgKCkgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kaXNfeXk9LTEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsWHVhbll1bihpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbk1vbnN0ZXJOb3JtYWxEZWF0aCgpe1xyXG4gICAgICAgIHRoaXMuaXNfc2tpbGxfc3RhdGU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95TGlhbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwoKXtcclxuICAgICAgICAvL+WGt+WNtOWujOavle+8jOWPr+S7peWIpOaWreaYr+WQpuWPr+S7peWHuumSqVxyXG4gICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICBsZXQgYXR0V2FsbDpXYWxsPW51bGw7XHJcbiAgICAgICAgbGV0IG9mZnNldFlZPTA7XHJcbiAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAvL+WHuumSqea7oei2s+Wkp+S6jjgw5bCP5LqONTAwLlxyXG4gICAgICAgICAgICBvZmZzZXRZWT1NYXRoLmFicyh0aGlzLm5vZGUueS13YWxsLmdldFdhbGxNYXhZWSgpKTtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+PXdhbGwuZ2V0V2FsbE1heFlZKCkmJm9mZnNldFlZPjgwICYmIG9mZnNldFlZPDUwMCl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1lZPXdhbGwuZ2V0V2FsbE1heFlZKCkrODA7XHJcbiAgICAgICAgICAgICAgICBpZihuZXdZWT50aGlzLmRpc195eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0V2FsbD13YWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzX3l5PW5ld1lZO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICBpZihhdHRXYWxsKXtcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bMF09dGhpcy5za2lsbF9kYXRhLmdldFNraWxsQ29sZERvd24oMSk7XHJcbiAgICAgICAgICAgIGxldCBwb3M9dGhpcy5nZXRBdHRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICBkYXRhLm5hbWU9XCJTa2lsbFwiXHJcbiAgICAgICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfc2tpbGxfc3RhdGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duWzBdPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDEpO1xyXG4gICAgICAgICAgICAgICAgLy/pk77plIFSb290XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpYW5fcm9vdD1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjczX3NraWxsX2xpYW5fcm9vdCxwb3MpO1xyXG4gICAgICAgICAgICAgICAgLy/lh7rpkqlcclxuICAgICAgICAgICAgICAgIHRoaXMuZ291PUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzNfc2tpbGxfbWFvLHBvcyk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUuc2NhbGVYPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ291LmFuZ2xlPTIwMDtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ291LmFuZ2xlPTEzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6K6h566X6ZOB6ZO+5pWw6YePXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlhbk51bT1NYXRoLmNlaWwob2Zmc2V0WVkvdGhpcy5saWFuX2ppYW5nZSkrNDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxpYW5OdW07IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQubW9uc3RlcjczX3NraWxsX2xpYW4sY2MudjIoMCxpKjY1KSx0aGlzLmxpYW5fcm9vdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpYW5fcm9vdC5oZWlnaHQ9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlhbl9yb290LmFuZ2xlPTE4MDtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGxfMVwiLGZhbHNlLGRhdGEsKCk9PntcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oXCJTaWRlX1NraWxsXzJcIix0cnVlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGVuZFNraWxsKCl7XHJcbiAgICAgICAgdGhpcy5pc19za2lsbF9zdGF0ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lMaWFuKCk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihcIlNpZGVfU2tpbGxfM1wiLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95TGlhbigpIHtcclxuICAgICAgICBpZih0aGlzLmdvdSl7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjczX3NraWxsX21hbyx0aGlzLmdvdSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ291PW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubGlhbl9yb290KXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPXRoaXMubGlhbl9yb290LmNoaWxkcmVuQ291bnQtMTsgaT49MDsgaS0tKXtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjczX3NraWxsX2xpYW4sdGhpcy5saWFuX3Jvb3QuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjczX3NraWxsX2xpYW5fcm9vdCx0aGlzLmxpYW5fcm9vdCk7XHJcbiAgICAgICAgICAgIHRoaXMubGlhbl9yb290PW51bGw7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Hb3VDb2xsaWRlcldhbGwoKXtcclxuICAgICAgICB0aGlzLmlzX2dvdV9vaz10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmKHRoaXMuaXNfc2tpbGxfc3RhdGUmJkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdvdSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk1vbnN0ZXJOb3JtYWxYdWFuWXVuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBwb3M9c3VwZXIuZ2V0QXR0UG9zKCk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdvdS55PD10aGlzLmRpc195eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nb3UueT10aGlzLmRpc195eTtcclxuICAgICAgICAgICAgICAgICAgICAvL+i3n+maj+WLvui1sFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9dGhpcy5nb3UuZ2V0UG9zaXRpb24oKS5zdWIodGhpcy5nZXRBdHRQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueT10aGlzLm5vZGUueStNYXRoLnNpbihkaXIpKmR0KnRoaXMuZ291X3NwZWVkLzM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLng9dGhpcy5ub2RlLngrTWF0aC5jb3MoZGlyKSpkdCp0aGlzLmdvdV9zcGVlZC8zO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcz1zdXBlci5nZXRBdHRQb3MoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dFdhbGw6V2FsbD1udWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6V2FsbCx3YWxsVHlwZTpXYWxsVHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mlLvlh7vln47lopnnmoTmnaHku7Yx77yM5b+F6aG75Zyo5Z+O5aKZ5LmL5LiKLDLovr7liLDmlLvlh7vot53nprtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+PXdhbGwuZ2V0V2FsbE1heFlZKCkpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmdvdS5zZXRQb3NpdGlvbihwb3MpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UG9zPXRoaXMuZ291LmdldFBvc2l0aW9uKCkuc3ViKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saWFuX3Jvb3QuaGVpZ2h0PW9mZnNldFBvcy5tYWcoKTtcclxuICAgICAgICAgICAgICAgICAgICBkaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saWFuX3Jvb3QuYW5nbGU9TXlUb29sLnJhZGlhblRvQW5nbGUoZGlyKS05MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpYW5fcm9vdC5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBvcy55PD0oYXR0V2FsbC5nZXRXYWxsTWF4WVkoKSs4MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFNraWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL+mSqeimgeWFiOi1sFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ291LnktPWR0KnRoaXMuZ291X3NwZWVkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZOB6ZO+XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz10aGlzLmdvdS5nZXRQb3NpdGlvbigpLnN1Yihwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlhbl9yb290LmhlaWdodD1vZmZzZXRQb3MubWFnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpYW5fcm9vdC5hbmdsZT1NeVRvb2wucmFkaWFuVG9BbmdsZShkaXIpLTkwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlhbl9yb290LnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdhbGxzPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsV2FsbCgpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aUu+WHu+WfjuWimeeahOadoeS7tjHvvIzlv4XpobvlnKjln47lopnkuYvkuIosMui+vuWIsOaUu+WHu+i3neemu1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdvdS55Pj13YWxsLmdldFdhbGxNYXhZWSgpKXsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1lZPXdhbGwuZ2V0V2FsbE1heFlZKCkrODA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXdZWT50aGlzLmRpc195eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNfeXk9bmV3WVk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoKHBvcy55PD10aGlzLmRpc195eSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kU2tpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPDE7IGkrKyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfY29sZF9kb3duW2ldPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV0tPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9jb2xkX2Rvd25baV08MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25baV09MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19