
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss1/BigTree.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed9f7RQ6rBLnYSzRyb0j7PG', 'BigTree');
// Scripts/Boss/Boss1/BigTree.ts

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
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var Boss_1 = require("../Boss");
var BossAtt1_1 = require("./BossAtt1");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack1"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigTree = /** @class */ (function (_super) {
    __extends(BigTree, _super);
    function BigTree() {
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
    BigTree.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_att, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_att_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_skill, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss1_normal_skill_hit, 4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
    };
    BigTree.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        // if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //     this.skill_jishu=10;
        // }
        this.skill_cd = this.skill_data.getSkillColdDown(1);
    };
    BigTree.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    BigTree.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_att, _super.prototype.getAttPos.call(_this));
            var startEndPos = cc.v2(GameManager_1.default.getInstance().charPosX, GameManager_1.default.getInstance().enemy_att_y);
            var offsetPos = startEndPos.sub(node.getPosition());
            var dir = Math.atan2(offsetPos.y, offsetPos.x);
            node.getComponent(BossAtt1_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss1_normal_att, 10, dir, _this.node.y);
        };
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.attack1), false, data, function () {
            if (_this.skill_waiting == true) {
                _super.prototype.setEnemyState.call(_this, EnemyConfig_1.Enemy_State.skill);
                _this.startSkill();
            }
            else {
                _this.startIdle();
            }
        });
    };
    BigTree.prototype.startSkill = function () {
        // if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //     this.cur_toughness=1;
        // }
        this.skill_jishu = 0;
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.skill_waiting = false;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill1_2), true);
                this.is_yindao = true;
                this.skill_jishu = 0;
                this.yindao_time = 10;
                // super.playSpinAnimaton((Animation_Name.skill1_1),false,null,()=>{
                // })
            }
            else {
                this.skill_waiting = true;
            }
        }
        else {
            this.skill_waiting = true;
        }
    };
    BigTree.prototype.startLaunch = function () {
        var _this = this;
        //cc.log('发射发射');
        var num = 0;
        for (var i = 0; i < this.skill_data.getSkillValue1(1); i++) {
            this.scheduleOnce(function () {
                if (!_this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                    num++;
                    var startPos = cc.v2(Math.random() * 128 - 64, _this.node.y + 256);
                    var offsetX = startPos.x < 0 ? -(80 + Math.random() * 80) : (80 + Math.random() * 80);
                    var endPos = cc.v2(offsetX + startPos.x, startPos.y + Math.random() * 40 + 80);
                    var startEndPos = cc.v2(GameManager_1.default.getInstance().charPosX, GameManager_1.default.getInstance().enemy_att_y);
                    var offsetPos = startEndPos.sub(endPos);
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_skill, startPos);
                    var bsAtt_1 = node.getComponent(BossAtt1_1.default);
                    var data = _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue2(1));
                    data.is_big = false;
                    bsAtt_1.init(data, GameEffectsManager_1.GameEffectId.boss1_normal_skill, 1000, dir, _this.node.y);
                    bsAtt_1.is_can_move = false;
                    cc.tween(node).to((0.75 - num * 0.05) * GameManager_1.default.getInstance().getGameRate(), { x: endPos.x, y: endPos.y }, { easing: 'quadOut' }).call(function () {
                        bsAtt_1.startFly();
                    }).start();
                }
            }, i * 0.2);
        }
        this.launch_num++;
        // if(this.launch_num==3){
        //     //德鲁伊教程
        //     if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //         TutorailsManager.getInstance().showTutorials(241,()=>{
        //             GameManager.getInstance().setGameRate(1/JiaSu);                            
        //         },()=>{
        //             TutorailsManager.getInstance().saveTutorials(241);
        //             this.cur_toughness=0;
        //             GameManager.getInstance().setGameRate(1);
        //         },false,null,this.node.getPosition());
        //     }
        // }
    };
    BigTree.prototype.onDeath = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        _super.prototype.playDeadAnimaton.call(this, Animation_Name.dead, function () {
            _this.removeAllDeBuff();
            _this.removeAllBuff();
            if (_this.shadow) {
                cc.tween(_this.shadow).to(0.75, { opacity: 0 }).start();
            }
            cc.tween(_this.node).to(0.75, { opacity: 0 }).call(function () {
                _this.removeAllDeBuff();
                _this.removeAllBuff();
                MonsterManager_1.default.getInstance().destroyMonster(_this.node, _this.monster_type);
            }).start();
        });
        //GameManager.getInstance().sound_manager.playSound(SoundIndex.rewardBox2);         
    };
    BigTree.prototype.onXuanYunResult = function (isXuanYun) {
        if (this.getEnemyState() == EnemyConfig_1.Enemy_State.skill) {
            return;
        }
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            if (!_super.prototype.isHaveDeBuffType.call(this, HeroConfig_1.BuffType.Vertigo)) {
                if (!_super.prototype.getIsDie.call(this)) {
                    if (this.skill_waiting == true) {
                        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                        this.startSkill();
                    }
                    else {
                        this.startIdle();
                    }
                }
            }
        }
    };
    BigTree.prototype.startXuanYun = function () {
        var _this = this;
        this.skill_waiting = false;
        this.is_yindao = false;
        this.yindao_jishu = 0;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.hurt1, false, null, function () {
            if (_super.prototype.isHaveDeBuffType.call(_this, HeroConfig_1.BuffType.Vertigo) && !_super.prototype.getIsDie.call(_this))
                _this.spine.paused = true;
        });
    };
    BigTree.prototype.endYinDao = function () {
        var _this = this;
        //结束引导
        this.is_yindao = false;
        this.yindao_time = 10;
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1_3, false, null, function () {
            _this.startIdle();
        });
    };
    BigTree.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
            if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill && this.getEnemyState() != EnemyConfig_1.Enemy_State.att) {
                this.checkAtt(dt);
            }
        }
    };
    /**技能检测 */
    BigTree.prototype.checkSkill = function (dt) {
        this.skill_jishu += dt;
        if (!this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
            if (this.is_yindao == false && this.skill_jishu >= this.skill_cd) {
                this.skill_jishu = this.att_jiange;
                this.startSkill();
            }
            if (this.is_yindao == true && this.yindao_time > 0) {
                this.yindao_time -= dt;
                if (this.yindao_time <= 0) {
                    this.endYinDao();
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
    /**攻击计算 */
    BigTree.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    BigTree = __decorate([
        ccclass
    ], BigTree);
    return BigTree;
}(Boss_1.default));
exports.default = BigTree;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczFcXEJpZ1RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkNBQW1EO0FBQ25ELHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHlEQUEwRTtBQUMxRSx5REFBeUQ7QUFDekQsK0RBQTBEO0FBRzFELGdDQUEyQjtBQUMzQix1Q0FBa0M7QUFFbEMsSUFBSyxjQVVKO0FBVkQsV0FBSyxjQUFjO0lBRWYsK0JBQWEsQ0FBQTtJQUNiLHFDQUFtQixDQUFBO0lBQ25CLDZCQUFXLENBQUE7SUFDWCxnQ0FBYyxDQUFBO0lBQ2QsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsK0JBQVksQ0FBQTtBQUNoQixDQUFDLEVBVkksY0FBYyxLQUFkLGNBQWMsUUFVbEI7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBSTtJQUF6QztRQUFBLHFFQTZPQztRQTNPRyx1QkFBdUI7UUFDdkIsbUJBQWEsR0FBUyxLQUFLLENBQUM7UUFDNUIsVUFBVTtRQUNWLFVBQVU7UUFDVixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixZQUFZO1FBQ1osaUJBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsYUFBYTtRQUNiLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsZ0JBQVUsR0FBUSxDQUFDLENBQUM7O0lBa094QixDQUFDO0lBL05HLHdCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsdUNBQWtCLENBQUMsV0FBVyxF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QixJQUFHLElBQUksQ0FBQyxZQUFZLElBQUUsQ0FBQyxFQUFDO29CQUNwQixJQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsVUFBVTtJQUNWLDBCQUFRLEdBQVIsVUFBUyxFQUFTO1FBQ2QsSUFBSSxDQUFDLFNBQVMsSUFBRSxFQUFFLENBQUM7UUFDbkIsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksQ0FBQyxVQUFVLEVBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFJO1lBQ0Qsa0JBQWtCO1NBQ3JCO0lBQ0wsQ0FBQztJQTVPZ0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTZPM0I7SUFBRCxjQUFDO0NBN09ELEFBNk9DLENBN09vQyxjQUFJLEdBNk94QztrQkE3T29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IEJvc3MgZnJvbSBcIi4uL0Jvc3NcIjtcclxuaW1wb3J0IEJvc3NBdHQxIGZyb20gXCIuL0Jvc3NBdHQxXCI7XHJcblxyXG5lbnVtIEFuaW1hdGlvbl9OYW1lXHJcbntcclxuICAgIElkbGUgPSBcIklkbGVcIiwgICAgICAgLy8tLSDmraPpnaLlvoXmnLpcclxuICAgIGF0dGFjazEgPSBcIkF0dGFjazFcIiwgICAgICAgICAgLy8tLSDmlLvlh7sxXHJcbiAgICBydW4gPSBcIlJ1blwiLCAgICAgICAgICAgICAgICAvLy0tIOi3kei3r1xyXG4gICAgaHVydDEgPSBcIkh1cnRcIiwgICAgICAgICAgLy8tLSDlj5flh7sxXHJcbiAgICBza2lsbDFfMSA9IFwiU2tpbGwxXzFcIiwgICAgICAgICAgLy8tLSDmioDog73liqjkvZwxXHJcbiAgICBza2lsbDFfMiA9IFwiU2tpbGwxXzJcIiwgICAgICAgICAgLy8tLSDmioDog73liqjkvZwxXHJcbiAgICBza2lsbDFfMyA9IFwiU2tpbGwxXzNcIiwgICAgICAgICAgLy8tLSDmioDog73liqjkvZwxXHJcbiAgICBkZWFkPSBcIkRlYWRcIiwgICAvL+atu+S6oVxyXG59XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpZ1RyZWUgZXh0ZW5kcyBCb3NzIHtcclxuXHJcbiAgICAvL3NraWxsX3RpbWU6bnVtYmVyPTEwO1xyXG4gICAgc2tpbGxfd2FpdGluZzpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5byV5a+855u45YWzICovXHJcbiAgICAvKirlvJXlr7zorqHmlbAgKi9cclxuICAgIHlpbmRhb19qaXNodTpudW1iZXI9MDsgICAgXHJcbiAgICAvKirlvJXlr7zliankvZnml7bplb8gKi9cclxuICAgIHlpbmRhb190aW1lOm51bWJlcj0xMDtcclxuICAgIC8qKuaYr+WQpuWkhOS6juW8leWvvOS4rSAqL1xyXG4gICAgaXNfeWluZGFvOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBsYXVuY2hfbnVtOm51bWJlcj0wO1xyXG4gICAgc2tpbGxfY2Q6bnVtYmVyO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczFfbm9ybWFsX2F0dCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczFfbm9ybWFsX2F0dF9oaXQsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxX25vcm1hbF9za2lsbCw0KTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczFfbm9ybWFsX3NraWxsX2hpdCw0KTtcclxuICAgICAgICB0aGlzLmFkZERlYXRoQ2FsbGJhY2sodGhpcy5vbkRlYXRoKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkQm9zc0luaXRlZExpc3Rlbih0aGlzLm9uQm9zc0luaXRlZCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkJvc3NJbml0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB0aGlzLm5vZGUueT0xMjg7XHJcbiAgICAgICAgLy8gaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX2ZpbmlzaF9nYW1lPT1mYWxzZSAmJiBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDI0MSkpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNraWxsX2ppc2h1PTEwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnNraWxsX2NkPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SWRsZSgpeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT0nQXR0YWNrJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57ICBcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxX25vcm1hbF9hdHQsc3VwZXIuZ2V0QXR0UG9zKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXJ0RW5kUG9zPWNjLnYyKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhclBvc1gsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeSk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9c3RhcnRFbmRQb3Muc3ViKG5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIGxldCBkaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEJvc3NBdHQxKS5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSksR2FtZUVmZmVjdElkLmJvc3MxX25vcm1hbF9hdHQsMTAsZGlyLHRoaXMubm9kZS55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuYXR0YWNrMSksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3dhaXRpbmc9PXRydWUpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbCgpe1xyXG4gICAgICAgIC8vIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZT09ZmFsc2UgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyNDEpKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jdXJfdG91Z2huZXNzPTE7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMiksdHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfeWluZGFvPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lPTEwOyAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMSksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPXRydWU7XHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TGF1bmNoKCl7XHJcbiAgICAgICAgLy9jYy5sb2coJ+WPkeWwhOWPkeWwhCcpO1xyXG4gICAgICAgIGxldCBudW09MDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSk7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcz1jYy52MihNYXRoLnJhbmRvbSgpKjEyOC02NCx0aGlzLm5vZGUueSsyNTYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYPXN0YXJ0UG9zLng8MD8tKDgwK01hdGgucmFuZG9tKCkqODApOig4MCtNYXRoLnJhbmRvbSgpKjgwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRQb3M9Y2MudjIob2Zmc2V0WCtzdGFydFBvcy54LHN0YXJ0UG9zLnkrTWF0aC5yYW5kb20oKSo0MCs4MCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydEVuZFBvcz1jYy52MihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYXJQb3NYLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9c3RhcnRFbmRQb3Muc3ViKGVuZFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzQXR0YWNrR3VvZHUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9ub3JtYWxfc2tpbGwsc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBic0F0dD1ub2RlLmdldENvbXBvbmVudChCb3NzQXR0MSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9c3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLlNraWxsLHRydWUsdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaXNfYmlnPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJzQXR0LmluaXQoZGF0YSxHYW1lRWZmZWN0SWQuYm9zczFfbm9ybWFsX3NraWxsLDEwMDAsZGlyLHRoaXMubm9kZS55KTtcclxuICAgICAgICAgICAgICAgICAgICBic0F0dC5pc19jYW5fbW92ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygoMC43NS1udW0qMC4wNSkqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpLHt4OmVuZFBvcy54LHk6ZW5kUG9zLnl9LHtlYXNpbmc6ICdxdWFkT3V0J30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnNBdHQuc3RhcnRGbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LGkqMC4yKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhdW5jaF9udW0rKztcclxuICAgICAgICAvLyBpZih0aGlzLmxhdW5jaF9udW09PTMpe1xyXG4gICAgICAgIC8vICAgICAvL+W+t+mygeS8iuaVmeeoi1xyXG4gICAgICAgIC8vICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWU9PWZhbHNlICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjQxKSl7XHJcbiAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyNDEsKCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEdhbWVSYXRlKDEvSmlhU3UpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIH0sKCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyNDEpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcz0wO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9LGZhbHNlLG51bGwsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVhdGgoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgc3VwZXIucGxheURlYWRBbmltYXRvbihBbmltYXRpb25fTmFtZS5kZWFkLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoYWRvdykudG8oMC43NSx7b3BhY2l0eTowfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuNzUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveU1vbnN0ZXIodGhpcy5ub2RlLHRoaXMubW9uc3Rlcl90eXBlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LnJld2FyZEJveDIpOyAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCk9PUVuZW15X1N0YXRlLnNraWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZighc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgICAgICBpZighc3VwZXIuZ2V0SXNEaWUoKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3dhaXRpbmc9PXRydWUpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFh1YW5ZdW4oKXtcclxuICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmc9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc195aW5kYW89ZmFsc2U7XHJcbiAgICAgICAgdGhpcy55aW5kYW9famlzaHU9MDtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmh1cnQxLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgaWYoc3VwZXIuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSYmIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlOyAgICAgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBlbmRZaW5EYW8oKXtcclxuICAgICAgICAvL+e7k+adn+W8leWvvFxyXG4gICAgICAgIHRoaXMuaXNfeWluZGFvPWZhbHNlO1xyXG4gICAgICAgIHRoaXMueWluZGFvX3RpbWU9MTA7ICAgICAgICBcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8zLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXx8dGhpcy5nZXRJc0RpZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbChkdCk7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLnNraWxsJiZ0aGlzLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0KXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBdHQoZHQpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKirmioDog73mo4DmtYsgKi9cclxuICAgIGNoZWNrU2tpbGwoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfeWluZGFvPT1mYWxzZSYmdGhpcy5za2lsbF9qaXNodT49dGhpcy5za2lsbF9jZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX2ppc2h1PXRoaXMuYXR0X2ppYW5nZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfeWluZGFvPT10cnVlJiZ0aGlzLnlpbmRhb190aW1lPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy55aW5kYW9fdGltZS09ZHQ7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnlpbmRhb190aW1lPD0wKXsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kWWluRGFvKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy55aW5kYW9famlzaHUrPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy55aW5kYW9famlzaHU+PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydExhdW5jaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pS75Ye76K6h566XICovXHJcbiAgICBjaGVja0F0dChkdDpudW1iZXIpeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKHRoaXMuYXR0X2ppc2h1Pj10aGlzLmF0dF9qaWFuZ2Upe1xyXG4gICAgICAgICAgICB0aGlzLmF0dF9qaXNodT10aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2soKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy90aGlzLm1vdmluZyhkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==