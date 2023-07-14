
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Elite/Elite78.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76505mnVClF6qDQw4vGib5b', 'Elite78');
// Scripts/Monster/Elite/Elite78.ts

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
var MonsterNewNormal_1 = require("../MonsterNewNormal");
var EliteAtt78_1 = require("./EliteAtt78");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Side_Walk";
    Animation_Name["attack1"] = "Side_Attack";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Side_Skill1_1";
    Animation_Name["skill1_2"] = "Side_Skill1_2";
    Animation_Name["skill1_3"] = "Side_Skill1_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Elite78 = /** @class */ (function (_super) {
    __extends(Elite78, _super);
    function Elite78() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //skill_time:number=10;
        _this.skill_waiting = false;
        /**引导相关 */
        /**引导计数 */
        _this.yindao_jishu = 0;
        /**引导剩余时长 */
        _this.yindao_time = 10;
        /**是否处于引导中 */
        _this.is_yindao = false;
        _this.launch_num = 0;
        return _this;
    }
    Elite78.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster78_attack_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect_hit, 4);
        this.addMonsterNormalDeath(this.onMonsterNormalDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addMonsterNormalInited(this.onMonsterIsInited);
    };
    Elite78.prototype.onMonsterIsInited = function () {
        this.skill_cd = this.skill_data.getSkillColdDown(1);
    };
    // startIdle(){
    //     this.att_jishu=0;
    //     super.setEnemyState(Enemy_State.move);
    //     super.playSpinAnimaton(Animation_Name.Idle,true);        
    // }    
    Elite78.prototype.startSkill = function () {
        var _this = this;
        this.skill_jishu = 0;
        if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
            this.skill_waiting = false;
            _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
            _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_1), false, null, function () {
                _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill1_2), true);
                _this.is_yindao = true;
                _this.skill_jishu = 0;
                _this.yindao_time = 10;
            });
        }
    };
    Elite78.prototype.startLaunch = function () {
        var _this = this;
        //cc.log('发射发射');
        var num = 0;
        for (var i = 0; i < this.skill_data.getSkillValue1(1); i++) {
            this.scheduleOnce(function () {
                if (!_this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                    num++;
                    var startRandPosX = Math.random() * 64 - 32;
                    var startPos = cc.v2(_this.node.x + startRandPosX, _this.node.y + 128);
                    var offsetX = startRandPosX < 0 ? -(80 + Math.random() * 80) : (80 + Math.random() * 80);
                    var endPos = cc.v2(offsetX + startPos.x, startPos.y + Math.random() * 40 + 80);
                    var startEndPos = cc.v2(startPos.x + offsetX / 3, GameManager_1.default.getInstance().enemy_att_y);
                    var offsetPos = startEndPos.sub(endPos);
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster78_skill_bullect, startPos);
                    var bsAtt_1 = node.getComponent(EliteAtt78_1.default);
                    bsAtt_1.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue2(1)), GameEffectsManager_1.GameEffectId.monster78_skill_bullect, 2000, dir, _this.node.y);
                    bsAtt_1.is_can_move = false;
                    cc.tween(node).to((0.75 - num * 0.05) * GameManager_1.default.getInstance().getGameRate(), { x: endPos.x, y: endPos.y }, { easing: 'quadOut' }).call(function () {
                        bsAtt_1.startFly();
                    }).start();
                }
            }, i * 0.2);
        }
        this.launch_num++;
    };
    Elite78.prototype.onMonsterNormalDeath = function () {
        this.unscheduleAllCallbacks();
        this.is_yindao = false;
    };
    Elite78.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            this.att_jishu = 0;
            this.startIdle();
            _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.move);
            if (this.att_wall) {
                this.setMoveDir(Math.random() > 0.5 ? Math.PI : 0);
            }
        }
    };
    Elite78.prototype.startXuanYun = function () {
        this.skill_waiting = false;
        this.is_yindao = false;
        this.yindao_jishu = 0;
        this.att_jishu = 0;
    };
    Elite78.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        // if(!this.isHaveDeBuff(BuffId.Hero_XuanYun)){            
        //     if(this.getEnemyState()!=Enemy_State.skill){            
        //         this.checkAtt(dt);            
        //     }
        // }                
    };
    /**技能检测 */
    Elite78.prototype.checkSkill = function (dt) {
        var _this = this;
        this.skill_jishu += dt;
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
            if (this.is_yindao == false && this.skill_jishu >= this.skill_cd) {
                var walls = WallManager_1.default.getInstance().getAllWall();
                var attWall_1 = null;
                walls.forEach(function (wall, wallType) {
                    //攻击城墙的条件1，必须在城墙之上,2达到攻击距离
                    if (_this.node.y >= wall.getWallMaxYY() && Math.abs(_this.node.y - wall.getWallMaxYY()) <= _this.base_data.AttackDistance) {
                        attWall_1 = wall;
                    }
                });
                if (attWall_1) {
                    this.skill_jishu = this.att_jiange;
                    this.startSkill();
                }
            }
            if (this.is_yindao == true && this.yindao_time > 0) {
                if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                    this.onXuanYunResult(true);
                    return;
                }
                this.yindao_time -= dt;
                if (this.yindao_time <= 0) {
                    //结束引导
                    this.is_yindao = false;
                    this.yindao_time = 10;
                    this.startIdle();
                    _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.move);
                    if (this.att_wall) {
                        this.setMoveDir(Math.random() > 0.5 ? Math.PI : 0);
                    }
                    return;
                }
                this.yindao_jishu += dt;
                if (this.yindao_jishu >= 1) {
                    this.yindao_jishu = 0;
                    this.startLaunch();
                }
            }
        }
    };
    Elite78 = __decorate([
        ccclass
    ], Elite78);
    return Elite78;
}(MonsterNewNormal_1.default));
exports.default = Elite78;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRWxpdGVcXEVsaXRlNzgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkNBQW1EO0FBQ25ELHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHlEQUEwRTtBQU0xRSxzREFBaUQ7QUFFakQsd0RBQW1EO0FBQ25ELDJDQUFzQztBQUV0QyxJQUFLLGNBVUo7QUFWRCxXQUFLLGNBQWM7SUFFZixvQ0FBa0IsQ0FBQTtJQUNsQix5Q0FBdUIsQ0FBQTtJQUN2Qiw2QkFBVyxDQUFBO0lBQ1gsZ0NBQWMsQ0FBQTtJQUNkLDRDQUEwQixDQUFBO0lBQzFCLDRDQUEwQixDQUFBO0lBQzFCLDRDQUEwQixDQUFBO0lBQzFCLCtCQUFZLENBQUE7QUFDaEIsQ0FBQyxFQVZJLGNBQWMsS0FBZCxjQUFjLFFBVWxCO0FBRUssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUMsMkJBQWdCO0lBQXJEO1FBQUEscUVBZ0tDO1FBOUpHLHVCQUF1QjtRQUN2QixtQkFBYSxHQUFTLEtBQUssQ0FBQztRQUM1QixVQUFVO1FBQ1YsVUFBVTtRQUNWLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLFlBQVk7UUFDWixpQkFBVyxHQUFRLEVBQUUsQ0FBQztRQUN0QixhQUFhO1FBQ2IsZUFBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixnQkFBVSxHQUFRLENBQUMsQ0FBQzs7SUFxSnhCLENBQUM7SUFsSkcsd0JBQU0sR0FBTjtRQUNJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsaUJBQWlCLENBQUMsaUNBQVksQ0FBQyx3QkFBd0IsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1Rix1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FB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dXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uLy4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi8uLi9XYWxsL1dhbGxDb25maWdcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyQnVsbGV0IGZyb20gXCIuLi9Nb25zdGVyQnVsbGV0XCI7XHJcbmltcG9ydCBNb25zdGVyTmV3Tm9ybWFsIGZyb20gXCIuLi9Nb25zdGVyTmV3Tm9ybWFsXCI7XHJcbmltcG9ydCBFbGl0ZUF0dDc4IGZyb20gXCIuL0VsaXRlQXR0NzhcIjtcclxuXHJcbmVudW0gQW5pbWF0aW9uX05hbWVcclxue1xyXG4gICAgSWRsZSA9IFwiU2lkZV9XYWxrXCIsICAgICAgIC8vLS0g5q2j6Z2i5b6F5py6XHJcbiAgICBhdHRhY2sxID0gXCJTaWRlX0F0dGFja1wiLCAgICAgICAgICAvLy0tIOaUu+WHuzFcclxuICAgIHJ1biA9IFwiUnVuXCIsICAgICAgICAgICAgICAgIC8vLS0g6LeR6LevXHJcbiAgICBodXJ0MSA9IFwiSHVydFwiLCAgICAgICAgICAvLy0tIOWPl+WHuzFcclxuICAgIHNraWxsMV8xID0gXCJTaWRlX1NraWxsMV8xXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMVxyXG4gICAgc2tpbGwxXzIgPSBcIlNpZGVfU2tpbGwxXzJcIiwgICAgICAgICAgLy8tLSDmioDog73liqjkvZwyXHJcbiAgICBza2lsbDFfMyA9IFwiU2lkZV9Ta2lsbDFfM1wiLCAgICAgICAgICAvLy0tIOaKgOiDveWKqOS9nDNcclxuICAgIGRlYWQ9IFwiRGVhZFwiLCAgIC8v5q275LqhXHJcbn1cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxpdGU3OCBleHRlbmRzIE1vbnN0ZXJOZXdOb3JtYWwge1xyXG5cclxuICAgIC8vc2tpbGxfdGltZTpudW1iZXI9MTA7XHJcbiAgICBza2lsbF93YWl0aW5nOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirlvJXlr7znm7jlhbMgKi9cclxuICAgIC8qKuW8leWvvOiuoeaVsCAqL1xyXG4gICAgeWluZGFvX2ppc2h1Om51bWJlcj0wOyAgICBcclxuICAgIC8qKuW8leWvvOWJqeS9meaXtumVvyAqL1xyXG4gICAgeWluZGFvX3RpbWU6bnVtYmVyPTEwO1xyXG4gICAgLyoq5piv5ZCm5aSE5LqO5byV5a+85LitICovXHJcbiAgICBpc195aW5kYW86Ym9vbGVhbj1mYWxzZTtcclxuICAgIGxhdW5jaF9udW06bnVtYmVyPTA7XHJcbiAgICBza2lsbF9jZDpudW1iZXI7XHJcblxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzhfYXR0YWNrX2J1bGxlY3QsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXI3OF9za2lsbF9idWxsZWN0LDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzhfc2tpbGxfYnVsbGVjdF9oaXQsNCk7XHJcbiAgICAgICAgdGhpcy5hZGRNb25zdGVyTm9ybWFsRGVhdGgodGhpcy5vbk1vbnN0ZXJOb3JtYWxEZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZE1vbnN0ZXJOb3JtYWxJbml0ZWQodGhpcy5vbk1vbnN0ZXJJc0luaXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Nb25zdGVySXNJbml0ZWQoKTogdm9pZCB7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNraWxsX2NkPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXJ0SWRsZSgpe1xyXG4gICAgLy8gICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAvLyAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgIC8vICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsdHJ1ZSk7ICAgICAgICBcclxuICAgIC8vIH0gICAgXHJcblxyXG4gICAgc3RhcnRTa2lsbCgpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPWZhbHNlO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuc2tpbGwxXzEpLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8yKSx0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc195aW5kYW89dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWU9MTA7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRMYXVuY2goKXtcclxuICAgICAgICAvL2NjLmxvZygn5Y+R5bCE5Y+R5bCEJyk7XHJcbiAgICAgICAgbGV0IG51bT0wO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgxKTsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0UmFuZFBvc1g9TWF0aC5yYW5kb20oKSo2NC0zMjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3M9Y2MudjIodGhpcy5ub2RlLngrc3RhcnRSYW5kUG9zWCx0aGlzLm5vZGUueSsxMjgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYPXN0YXJ0UmFuZFBvc1g8MD8tKDgwK01hdGgucmFuZG9tKCkqODApOig4MCtNYXRoLnJhbmRvbSgpKjgwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRQb3M9Y2MudjIob2Zmc2V0WCtzdGFydFBvcy54LHN0YXJ0UG9zLnkrTWF0aC5yYW5kb20oKSo0MCs4MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0RW5kUG9zPWNjLnYyKHN0YXJ0UG9zLngrb2Zmc2V0WC8zLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9c3RhcnRFbmRQb3Muc3ViKGVuZFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzQXR0YWNrR3VvZHUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyNzhfc2tpbGxfYnVsbGVjdCxzdGFydFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJzQXR0PW5vZGUuZ2V0Q29tcG9uZW50KEVsaXRlQXR0NzgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJzQXR0LmluaXQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLlNraWxsLHRydWUsdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpKSxHYW1lRWZmZWN0SWQubW9uc3Rlcjc4X3NraWxsX2J1bGxlY3QsMjAwMCxkaXIsdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJzQXR0LmlzX2Nhbl9tb3ZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKCgwLjc1LW51bSowLjA1KSpHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkse3g6ZW5kUG9zLngseTplbmRQb3MueX0se2Vhc2luZzogJ3F1YWRPdXQnfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBic0F0dC5zdGFydEZseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0saSowLjIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF1bmNoX251bSsrO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTW9uc3Rlck5vcm1hbERlYXRoKCkge1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuaXNfeWluZGFvPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICAgICAgaWYodGhpcy5hdHRfd2FsbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5yYW5kb20oKT4wLjU/TWF0aC5QSTowKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFh1YW5ZdW4oKXtcclxuICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc195aW5kYW89ZmFsc2U7XHJcbiAgICAgICAgdGhpcy55aW5kYW9famlzaHU9MDtcclxuICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpfHx0aGlzLmdldElzRGllKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1NraWxsKGR0KTtcclxuICAgICAgICAvLyBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpeyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpeyAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jaGVja0F0dChkdCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaKgOiDveajgOa1iyAqL1xyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfeWluZGFvPT1mYWxzZSYmdGhpcy5za2lsbF9qaXNodT49dGhpcy5za2lsbF9jZCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0V2FsbD1udWxsO1xyXG4gICAgICAgICAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pS75Ye75Z+O5aKZ55qE5p2h5Lu2Me+8jOW/hemhu+WcqOWfjuWimeS5i+S4iiwy6L6+5Yiw5pS75Ye76Led56a7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+PXdhbGwuZ2V0V2FsbE1heFlZKCkmJk1hdGguYWJzKHRoaXMubm9kZS55LXdhbGwuZ2V0V2FsbE1heFlZKCkpPD10aGlzLmJhc2VfZGF0YS5BdHRhY2tEaXN0YW5jZSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRXYWxsPXdhbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGlmKGF0dFdhbGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmlzX3lpbmRhbz09dHJ1ZSYmdGhpcy55aW5kYW9fdGltZT4wKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW8pKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uWHVhbll1blJlc3VsdCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lLT1kdDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMueWluZGFvX3RpbWU8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v57uT5p2f5byV5a+8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc195aW5kYW89ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55aW5kYW9fdGltZT0xMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5hdHRfd2FsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLnJhbmRvbSgpPjAuNT9NYXRoLlBJOjApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb19qaXNodSs9ZHQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnlpbmRhb19qaXNodT49MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55aW5kYW9famlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19