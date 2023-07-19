
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/YouLing.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da3c7Oi8y1EdIwWleRkY6nc', 'YouLing');
// Scripts/Monster/Elite/YouLing.ts

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
var WallManager_1 = require("../../Wall/WallManager");
var MonsterData_1 = require("../MonsterData");
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var YouLing = /** @class */ (function (_super) {
    __extends(YouLing, _super);
    function YouLing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_release_skill = false;
        _this.is_yindao = false;
        _this.att_node = null;
        _this.yindao_num = 0;
        _this.add_damage_rate = 0;
        _this.cur_att_wall = null;
        _this.light_speed = 2000;
        _this.light_jishu = 0.2;
        return _this;
    }
    YouLing.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addMonsterNormalInited.call(this, this.onMonsterNormalInited);
        _super.prototype.addMonsterNormalAttack.call(this, this.onMonsterNormalAttack);
        _super.prototype.addMonsterNormalXuanYun.call(this, this.onMonsterNormalXuanYun);
        _super.prototype.addMonsterNormalDeath.call(this, this.onMonsterNormalDeath);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster19_youling_skill);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster19_youling_skill_hit);
    };
    YouLing.prototype.onMonsterNormalInited = function () {
        //设置为没放技能
        this.is_release_skill = false;
        this.is_yindao = false;
    };
    YouLing.prototype.onMonsterNormalXuanYun = function (isXuanYun) {
        if (isXuanYun) {
            this.is_yindao = false;
            //this.unschedule(this.yindao)
            if (this.att_node) {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, this.att_node);
                this.att_node = null;
            }
        }
    };
    YouLing.prototype.onMonsterNormalDeath = function () {
        this.is_yindao = false;
        //this.unschedule(this.yindao)
        if (this.att_node) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, this.att_node);
            this.att_node = null;
        }
    };
    /**怪物开始攻击，返回是否截获本次攻击 */
    YouLing.prototype.onMonsterNormalAttack = function () {
        if (this.is_release_skill == false) {
            this.is_release_skill = true;
            //改放技能
            this.is_yindao = true;
            this.startSkill();
            return true;
        }
        else {
            if (this.is_yindao) {
                return true;
            }
            return false;
        }
    };
    YouLing.prototype.startSkill = function () {
        var _this = this;
        var walls = WallManager_1.default.getInstance().getAllWall();
        var attWall = null;
        walls.forEach(function (wall, wallType) {
            //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
            if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance) {
                attWall = wall;
            }
        });
        this.cur_att_wall = attWall;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
        _super.prototype.playSpinAnimaton.call(this, ('Side_Skill_Start'), false, null, function () {
            _super.prototype.playSpinAnimaton.call(_this, ("Side_Skill_Loop"), true);
            if (_super.prototype.getIsDie.call(_this) == false) {
                //this.schedule(this.yindao,0.2);
                //播放动画
                var pos = _super.prototype.getAttPos.call(_this);
                _this.att_node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, pos);
                _this.att_node.height = 0;
                // let disYY=0;
                // if(this.cur_att_wall){
                //     disYY=this.cur_att_wall.getWallMaxYY()+16;
                // }else{
                //     disYY=GameManager.getInstance().enemy_att_y+16;
                // }
                //let distance=pos.y-disYY;
                //cc.tween(this.att_node).to(0.2,{height:distance}).start();
                _this.att_node.angle = 180;
            }
        });
    };
    YouLing.prototype.destroyYinDao = function () {
        this.is_yindao = false;
        //还原释放技能
        this.is_release_skill = false;
        this.yindao_num = 0;
        this.startIdle();
        this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        if (this.att_node) {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill, this.att_node);
            this.att_node = null;
        }
    };
    YouLing.prototype.lightDamage = function (wall) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            //播放动画
            var pos = cc.v2(_super.prototype.getAttPos.call(this).x, wall.getWallMaxYY() - 32);
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster19_youling_skill_hit, pos);
            wall.beRealDamage(HeroConfig_1.DamageType.Skill, MonsterData_1.StrengthType.Elite, wall.getMaxHp() * (0.001 + this.add_damage_rate));
            this.yindao_num++;
            if (this.yindao_num % 2 == 0) {
                this.add_damage_rate += 0.001;
                if (this.add_damage_rate > 0.004) {
                    this.add_damage_rate = 0.004;
                }
            }
        }
    };
    YouLing.prototype.update = function (dt) {
        var _this = this;
        _super.prototype.update.call(this, dt);
        if (this.is_yindao && GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.att_node) {
                if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                    this.onMonsterNormalXuanYun(true);
                    return;
                }
                this.att_node.setPosition(_super.prototype.getAttPos.call(this));
                var walls = WallManager_1.default.getInstance().getAllWall();
                var attWall_1 = null;
                walls.forEach(function (wall, wallType) {
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if (_this.node.y >= wall.getWallMaxYY()) {
                        attWall_1 = wall;
                    }
                });
                if (Math.abs(this.node.y - attWall_1.getWallMaxYY()) >= (this.base_data.AttackDistance + 200)) {
                    this.destroyYinDao();
                    return;
                }
                if (attWall_1) {
                    var distance = _super.prototype.getAttPos.call(this).y - attWall_1.getWallMaxYY() + 16;
                    if (this.att_node.height >= distance) {
                        this.att_node.height = distance;
                        this.light_jishu += dt;
                        if (this.light_jishu >= 0.2) {
                            this.light_jishu = 0;
                            this.lightDamage(attWall_1);
                        }
                    }
                    else {
                        this.att_node.height += this.light_speed * dt;
                    }
                }
            }
        }
    };
    YouLing = __decorate([
        ccclass
    ], YouLing);
    return YouLing;
}(MonsterNewNormal_1.default));
exports.default = YouLing;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXFlvdUxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHlEQUFnRTtBQUdoRSxzREFBaUQ7QUFDakQsOENBQThDO0FBQzlDLHdEQUFtRDtBQUc3QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBZ0I7SUFBckQ7UUFBQSxxRUFvS0M7UUFsS0csc0JBQWdCLEdBQVMsS0FBSyxDQUFDO1FBQy9CLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsY0FBUSxHQUFTLElBQUksQ0FBQztRQUN0QixnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQixxQkFBZSxHQUFRLENBQUMsQ0FBQztRQUN6QixrQkFBWSxHQUFNLElBQUksQ0FBQztRQUN2QixpQkFBVyxHQUFRLElBQUksQ0FBQztRQUN4QixpQkFBVyxHQUFRLEdBQUcsQ0FBQzs7SUEySjNCLENBQUM7SUF6SmEsd0JBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELGlCQUFNLHVCQUF1QixZQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzNELGlCQUFNLHFCQUFxQixZQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZELHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN6Rix1Q0FBa0Is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Q0FvSzNCO0lBQUQsY0FBQztDQXBLRCxBQW9LQyxDQXBLb0MsMEJBQWdCLEdBb0twRDtrQkFwS29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lU3RhdGUgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RzTWFuYWdlciwgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBEYW1hZ2VUeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJOZXdOb3JtYWwgZnJvbSBcIi4uL01vbnN0ZXJOZXdOb3JtYWxcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFlvdUxpbmcgZXh0ZW5kcyBNb25zdGVyTmV3Tm9ybWFsIHtcclxuXHJcbiAgICBpc19yZWxlYXNlX3NraWxsOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBpc195aW5kYW86Ym9vbGVhbj1mYWxzZTtcclxuICAgIGF0dF9ub2RlOmNjLk5vZGU9bnVsbDsgIFxyXG4gICAgeWluZGFvX251bTpudW1iZXI9MDtcclxuICAgIGFkZF9kYW1hZ2VfcmF0ZTpudW1iZXI9MDtcclxuICAgIGN1cl9hdHRfd2FsbDpXYWxsPW51bGw7XHJcbiAgICBsaWdodF9zcGVlZDpudW1iZXI9MjAwMDtcclxuICAgIGxpZ2h0X2ppc2h1Om51bWJlcj0wLjI7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsSW5pdGVkKHRoaXMub25Nb25zdGVyTm9ybWFsSW5pdGVkKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsQXR0YWNrKHRoaXMub25Nb25zdGVyTm9ybWFsQXR0YWNrKTtcclxuICAgICAgICBzdXBlci5hZGRNb25zdGVyTm9ybWFsWHVhbll1bih0aGlzLm9uTW9uc3Rlck5vcm1hbFh1YW5ZdW4pO1xyXG4gICAgICAgIHN1cGVyLmFkZE1vbnN0ZXJOb3JtYWxEZWF0aCh0aGlzLm9uTW9uc3Rlck5vcm1hbERlYXRoKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjE5X3lvdWxpbmdfc2tpbGwpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyMTlfeW91bGluZ19za2lsbF9oaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9uc3Rlck5vcm1hbEluaXRlZCAoKSB7XHJcbiAgICAgICAgLy/orr7nva7kuLrmsqHmlL7mioDog71cclxuICAgICAgICB0aGlzLmlzX3JlbGVhc2Vfc2tpbGw9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc195aW5kYW89ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsWHVhbll1bihpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5pc195aW5kYW89ZmFsc2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy51bnNjaGVkdWxlKHRoaXMueWluZGFvKVxyXG4gICAgICAgICAgICBpZih0aGlzLmF0dF9ub2RlKXtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3RlcjE5X3lvdWxpbmdfc2tpbGwsdGhpcy5hdHRfbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dF9ub2RlPW51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVyTm9ybWFsRGVhdGgoKXtcclxuICAgICAgICB0aGlzLmlzX3lpbmRhbz1mYWxzZTtcclxuICAgICAgICAvL3RoaXMudW5zY2hlZHVsZSh0aGlzLnlpbmRhbylcclxuICAgICAgICBpZih0aGlzLmF0dF9ub2RlKXtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyMTlfeW91bGluZ19za2lsbCx0aGlzLmF0dF9ub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5hdHRfbm9kZT1udWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0gIFxyXG5cclxuICAgIC8qKuaAqueJqeW8gOWni+aUu+WHu++8jOi/lOWbnuaYr+WQpuaIquiOt+acrOasoeaUu+WHuyAqL1xyXG4gICAgb25Nb25zdGVyTm9ybWFsQXR0YWNrICgpOmJvb2xlYW4ge1xyXG4gICAgICAgIGlmKHRoaXMuaXNfcmVsZWFzZV9za2lsbD09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmlzX3JlbGVhc2Vfc2tpbGw9dHJ1ZTtcclxuICAgICAgICAgICAgLy/mlLnmlL7mioDog71cclxuICAgICAgICAgICAgdGhpcy5pc195aW5kYW89dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfeWluZGFvKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwoKXtcclxuICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgbGV0IGF0dFdhbGw9bnVsbDtcclxuICAgICAgICB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9kZS55Pj13YWxsLmdldFdhbGxNYXhZWSgpJiZNYXRoLmFicyh0aGlzLm5vZGUueS13YWxsLmdldFdhbGxNYXhZWSgpKTw9dGhpcy5iYXNlX2RhdGEuQXR0YWNrRGlzdGFuY2UpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jdXJfYXR0X3dhbGw9YXR0V2FsbDtcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKCgnU2lkZV9Ta2lsbF9TdGFydCcpLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoXCJTaWRlX1NraWxsX0xvb3BcIiksdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmKHN1cGVyLmdldElzRGllKCk9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5zY2hlZHVsZSh0aGlzLnlpbmRhbywwLjIpO1xyXG4gICAgICAgICAgICAgICAgLy/mkq3mlL7liqjnlLtcclxuICAgICAgICAgICAgICAgIGxldCBwb3M9c3VwZXIuZ2V0QXR0UG9zKClcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0X25vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIxOV95b3VsaW5nX3NraWxsLHBvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dF9ub2RlLmhlaWdodD0wO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IGRpc1lZPTA7XHJcbiAgICAgICAgICAgICAgICAvLyBpZih0aGlzLmN1cl9hdHRfd2FsbCl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZGlzWVk9dGhpcy5jdXJfYXR0X3dhbGwuZ2V0V2FsbE1heFlZKCkrMTY7XHJcbiAgICAgICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8vICAgICBkaXNZWT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95KzE2O1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy9sZXQgZGlzdGFuY2U9cG9zLnktZGlzWVk7XHJcbiAgICAgICAgICAgICAgICAvL2NjLnR3ZWVuKHRoaXMuYXR0X25vZGUpLnRvKDAuMix7aGVpZ2h0OmRpc3RhbmNlfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0X25vZGUuYW5nbGU9MTgwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVlpbkRhbygpe1xyXG4gICAgICAgIHRoaXMuaXNfeWluZGFvPWZhbHNlO1xyXG4gICAgICAgIC8v6L+Y5Y6f6YeK5pS+5oqA6IO9XHJcbiAgICAgICAgdGhpcy5pc19yZWxlYXNlX3NraWxsPWZhbHNlO1xyXG4gICAgICAgIHRoaXMueWluZGFvX251bT0wO1xyXG4gICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgIGlmKHRoaXMuYXR0X25vZGUpe1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIxOV95b3VsaW5nX3NraWxsLHRoaXMuYXR0X25vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9ub2RlPW51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxpZ2h0RGFtYWdlKHdhbGw6V2FsbCl7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5Yqo55S7XHJcbiAgICAgICAgICAgIGxldCBwb3M9Y2MudjIoc3VwZXIuZ2V0QXR0UG9zKCkueCx3YWxsLmdldFdhbGxNYXhZWSgpLTMyKTtcclxuICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXIxOV95b3VsaW5nX3NraWxsX2hpdCxwb3MpO1xyXG4gICAgICAgICAgICB3YWxsLmJlUmVhbERhbWFnZShEYW1hZ2VUeXBlLlNraWxsLFN0cmVuZ3RoVHlwZS5FbGl0ZSx3YWxsLmdldE1heEhwKCkqKDAuMDAxK3RoaXMuYWRkX2RhbWFnZV9yYXRlKSk7XHJcbiAgICAgICAgICAgIHRoaXMueWluZGFvX251bSsrO1xyXG4gICAgICAgICAgICBpZih0aGlzLnlpbmRhb19udW0lMj09MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9kYW1hZ2VfcmF0ZSs9MC4wMDE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFkZF9kYW1hZ2VfcmF0ZT4wLjAwNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRfZGFtYWdlX3JhdGU9MC4wMDQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICBpZih0aGlzLmlzX3lpbmRhbyYmR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYXR0X25vZGUpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb25zdGVyTm9ybWFsWHVhbll1bih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dF9ub2RlLnNldFBvc2l0aW9uKHN1cGVyLmdldEF0dFBvcygpKTtcclxuICAgICAgICAgICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICAgICAgICAgIGxldCBhdHRXYWxsOldhbGw9bnVsbDtcclxuICAgICAgICAgICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6V2FsbCx3YWxsVHlwZTpXYWxsVHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAvL+aUu+WHu+WfjuWimeeahOadoeS7tjHvvIzlv4XpobvlnKjln47lopnkuYvkuIosMui+vuWIsOaUu+WHu+i3neemu1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55Pj13YWxsLmdldFdhbGxNYXhZWSgpKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dFdhbGw9d2FsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgaWYoTWF0aC5hYnModGhpcy5ub2RlLnktYXR0V2FsbC5nZXRXYWxsTWF4WVkoKSk+PSh0aGlzLmJhc2VfZGF0YS5BdHRhY2tEaXN0YW5jZSsyMDApKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lZaW5EYW8oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihhdHRXYWxsKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9c3VwZXIuZ2V0QXR0UG9zKCkueS1hdHRXYWxsLmdldFdhbGxNYXhZWSgpKzE2O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuYXR0X25vZGUuaGVpZ2h0Pj1kaXN0YW5jZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0X25vZGUuaGVpZ2h0PWRpc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpZ2h0X2ppc2h1Kz1kdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5saWdodF9qaXNodT49MC4yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlnaHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlnaHREYW1hZ2UoYXR0V2FsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfbm9kZS5oZWlnaHQrPXRoaXMubGlnaHRfc3BlZWQqZHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19