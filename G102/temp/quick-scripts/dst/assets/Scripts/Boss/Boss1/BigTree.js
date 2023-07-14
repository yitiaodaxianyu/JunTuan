
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
            node.getComponent(BossAtt1_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss1_normal_att, 1200, Math.PI * 3 / 2, _this.node.y);
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
        var _this = this;
        // if(TutorailsManager.getInstance().is_finish_game==false && TutorailsManager.getInstance().isShowTutorials(241)){
        //     this.cur_toughness=1;
        // }
        this.skill_jishu = 0;
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
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
                    var startEndPos = cc.v2(startPos.x + offsetX / 3, GameManager_1.default.getInstance().enemy_att_y);
                    var offsetPos = startEndPos.sub(endPos);
                    var dir = Math.atan2(offsetPos.y, offsetPos.x);
                    //GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_BossAttackGuodu);
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss1_normal_skill, startPos);
                    var bsAtt_1 = node.getComponent(BossAtt1_1.default);
                    var data = _super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue2(1));
                    data.is_big = false;
                    bsAtt_1.init(data, GameEffectsManager_1.GameEffectId.boss1_normal_skill, 2000, dir, _this.node.y);
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
            if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczFcXEJpZ1RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkNBQW1EO0FBQ25ELHVEQUFzRDtBQUN0RCxvRUFBaUY7QUFDakYsaURBQTRDO0FBQzVDLHlEQUEwRTtBQUMxRSx5REFBeUQ7QUFDekQsK0RBQTBEO0FBRzFELGdDQUEyQjtBQUMzQix1Q0FBa0M7QUFFbEMsSUFBSyxjQVVKO0FBVkQsV0FBSyxjQUFjO0lBRWYsK0JBQWEsQ0FBQTtJQUNiLHFDQUFtQixDQUFBO0lBQ25CLDZCQUFXLENBQUE7SUFDWCxnQ0FBYyxDQUFBO0lBQ2QsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsdUNBQXFCLENBQUE7SUFDckIsK0JBQVksQ0FBQTtBQUNoQixDQUFDLEVBVkksY0FBYyxLQUFkLGNBQWMsUUFVbEI7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFxQywyQkFBSTtJQUF6QztRQUFBLHFFQW9PQztRQWxPRyx1QkFBdUI7UUFDdkIsbUJBQWEsR0FBUyxLQUFLLENBQUM7UUFDNUIsVUFBVTtRQUNWLFVBQVU7UUFDVixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixZQUFZO1FBQ1osaUJBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsYUFBYTtRQUNiLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsZ0JBQVUsR0FBUSxDQUFDLENBQUM7O0lBeU54QixDQUFDO0lBdE5HLHdCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLHVDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGlDQUFZLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsdUNBQWtCLENBQUMsV0FBVyxF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LEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7YUFBSTtZQUNELGtCQUFrQjtTQUNyQjtJQUNMLENBQUM7SUFuT2dCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FvTzNCO0lBQUQsY0FBQztDQXBPRCxBQW9PQyxDQXBPb0MsY0FBSSxHQW9PeEM7a0JBcE9vQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9TdGF0ZSB9IGZyb20gXCIuLi8uLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBCb3NzIGZyb20gXCIuLi9Cb3NzXCI7XHJcbmltcG9ydCBCb3NzQXR0MSBmcm9tIFwiLi9Cb3NzQXR0MVwiO1xyXG5cclxuZW51bSBBbmltYXRpb25fTmFtZVxyXG57XHJcbiAgICBJZGxlID0gXCJJZGxlXCIsICAgICAgIC8vLS0g5q2j6Z2i5b6F5py6XHJcbiAgICBhdHRhY2sxID0gXCJBdHRhY2sxXCIsICAgICAgICAgIC8vLS0g5pS75Ye7MVxyXG4gICAgcnVuID0gXCJSdW5cIiwgICAgICAgICAgICAgICAgLy8tLSDot5Hot69cclxuICAgIGh1cnQxID0gXCJIdXJ0XCIsICAgICAgICAgIC8vLS0g5Y+X5Ye7MVxyXG4gICAgc2tpbGwxXzEgPSBcIlNraWxsMV8xXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMVxyXG4gICAgc2tpbGwxXzIgPSBcIlNraWxsMV8yXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMVxyXG4gICAgc2tpbGwxXzMgPSBcIlNraWxsMV8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMVxyXG4gICAgZGVhZD0gXCJEZWFkXCIsICAgLy/mrbvkuqFcclxufVxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdUcmVlIGV4dGVuZHMgQm9zcyB7XHJcblxyXG4gICAgLy9za2lsbF90aW1lOm51bWJlcj0xMDtcclxuICAgIHNraWxsX3dhaXRpbmc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8qKuW8leWvvOebuOWFsyAqL1xyXG4gICAgLyoq5byV5a+86K6h5pWwICovXHJcbiAgICB5aW5kYW9famlzaHU6bnVtYmVyPTA7ICAgIFxyXG4gICAgLyoq5byV5a+85Ymp5L2Z5pe26ZW/ICovXHJcbiAgICB5aW5kYW9fdGltZTpudW1iZXI9MTA7XHJcbiAgICAvKirmmK/lkKblpITkuo7lvJXlr7zkuK0gKi9cclxuICAgIGlzX3lpbmRhbzpib29sZWFuPWZhbHNlO1xyXG4gICAgbGF1bmNoX251bTpudW1iZXI9MDtcclxuICAgIHNraWxsX2NkOm51bWJlcjtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxX25vcm1hbF9hdHQsMSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxX25vcm1hbF9hdHRfaGl0LDEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9ub3JtYWxfc2tpbGwsNCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxX25vcm1hbF9za2lsbF9oaXQsNCk7XHJcbiAgICAgICAgdGhpcy5hZGREZWF0aENhbGxiYWNrKHRoaXMub25EZWF0aCk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEJvc3NJbml0ZWRMaXN0ZW4odGhpcy5vbkJvc3NJbml0ZWQpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25Cb3NzSW5pdGVkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9MTI4O1xyXG4gICAgICAgIC8vIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZT09ZmFsc2UgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyNDEpKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5za2lsbF9qaXNodT0xMDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5za2lsbF9jZD10aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxDb2xkRG93bigxKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydElkbGUoKXsgICAgICAgIFxyXG4gICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5JZGxlLHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0YWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5hdHQpO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9J0F0dGFjayc7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+eyAgXHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9ub3JtYWxfYXR0LHN1cGVyLmdldEF0dFBvcygpKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQm9zc0F0dDEpLmluaXQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlKSxHYW1lRWZmZWN0SWQuYm9zczFfbm9ybWFsX2F0dCwxMjAwLE1hdGguUEkqMy8yLHRoaXMubm9kZS55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbigoQW5pbWF0aW9uX05hbWUuYXR0YWNrMSksZmFsc2UsZGF0YSwoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3dhaXRpbmc9PXRydWUpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbCgpe1xyXG4gICAgICAgIC8vIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc19maW5pc2hfZ2FtZT09ZmFsc2UgJiYgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyNDEpKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5jdXJfdG91Z2huZXNzPTE7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICBpZihzdXBlci5nZXRFbmVteVN0YXRlKCkhPUVuZW15X1N0YXRlLmF0dCl7XHJcbiAgICAgICAgICAgIGlmKCFzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDFfMSksZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8yKSx0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfeWluZGFvPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5za2lsbF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWU9MTA7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPXRydWU7XHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TGF1bmNoKCl7XHJcbiAgICAgICAgLy9jYy5sb2coJ+WPkeWwhOWPkeWwhCcpO1xyXG4gICAgICAgIGxldCBudW09MDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNraWxsX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoMSk7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcz1jYy52MihNYXRoLnJhbmRvbSgpKjEyOC02NCx0aGlzLm5vZGUueSsyNTYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYPXN0YXJ0UG9zLng8MD8tKDgwK01hdGgucmFuZG9tKCkqODApOig4MCtNYXRoLnJhbmRvbSgpKjgwKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRQb3M9Y2MudjIob2Zmc2V0WCtzdGFydFBvcy54LHN0YXJ0UG9zLnkrTWF0aC5yYW5kb20oKSo0MCs4MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0RW5kUG9zPWNjLnYyKHN0YXJ0UG9zLngrb2Zmc2V0WC8zLEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9c3RhcnRFbmRQb3Muc3ViKGVuZFBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgICAgICAvL0dhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9Cb3NzQXR0YWNrR3VvZHUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9ub3JtYWxfc2tpbGwsc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBic0F0dD1ub2RlLmdldENvbXBvbmVudChCb3NzQXR0MSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9c3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLlNraWxsLHRydWUsdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUyKDEpKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaXNfYmlnPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJzQXR0LmluaXQoZGF0YSxHYW1lRWZmZWN0SWQuYm9zczFfbm9ybWFsX3NraWxsLDIwMDAsZGlyLHRoaXMubm9kZS55KTtcclxuICAgICAgICAgICAgICAgICAgICBic0F0dC5pc19jYW5fbW92ZT1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygoMC43NS1udW0qMC4wNSkqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpLHt4OmVuZFBvcy54LHk6ZW5kUG9zLnl9LHtlYXNpbmc6ICdxdWFkT3V0J30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnNBdHQuc3RhcnRGbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LGkqMC4yKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhdW5jaF9udW0rKztcclxuICAgICAgICAvLyBpZih0aGlzLmxhdW5jaF9udW09PTMpe1xyXG4gICAgICAgIC8vICAgICAvL+W+t+mygeS8iuaVmeeoi1xyXG4gICAgICAgIC8vICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfZmluaXNoX2dhbWU9PWZhbHNlICYmIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjQxKSl7XHJcbiAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyNDEsKCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEdhbWVSYXRlKDEvSmlhU3UpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgIH0sKCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyNDEpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcz0wO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0R2FtZVJhdGUoMSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9LGZhbHNlLG51bGwsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVhdGgoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgc3VwZXIucGxheURlYWRBbmltYXRvbihBbmltYXRpb25fTmFtZS5kZWFkLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNoYWRvdykudG8oMC43NSx7b3BhY2l0eTowfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuNzUse29wYWNpdHk6MH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveU1vbnN0ZXIodGhpcy5ub2RlLHRoaXMubW9uc3Rlcl90eXBlKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LnJld2FyZEJveDIpOyAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFh1YW5ZdW4oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICAgICAgaWYoIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF93YWl0aW5nPT10cnVlKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2tpbGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRYdWFuWXVuKCl7XHJcbiAgICAgICAgdGhpcy5za2lsbF93YWl0aW5nPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfeWluZGFvPWZhbHNlO1xyXG4gICAgICAgIHRoaXMueWluZGFvX2ppc2h1PTA7XHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5odXJ0MSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHN1cGVyLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykmJiFzdXBlci5nZXRJc0RpZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9dHJ1ZTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5kWWluRGFvKCl7XHJcbiAgICAgICAgLy/nu5PmnZ/lvJXlr7xcclxuICAgICAgICB0aGlzLmlzX3lpbmRhbz1mYWxzZTtcclxuICAgICAgICB0aGlzLnlpbmRhb190aW1lPTEwOyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5za2lsbDFfMyxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5za2lsbCl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrQXR0KGR0KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oqA6IO95qOA5rWLICovXHJcbiAgICBjaGVja1NraWxsKGR0Om51bWJlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNraWxsX2ppc2h1Kz1kdDtcclxuICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fWHVhbll1bikpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX3lpbmRhbz09ZmFsc2UmJnRoaXMuc2tpbGxfamlzaHU+PXRoaXMuc2tpbGxfY2Qpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9qaXNodT10aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmlzX3lpbmRhbz09dHJ1ZSYmdGhpcy55aW5kYW9fdGltZT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX3RpbWUtPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy55aW5kYW9fdGltZTw9MCl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFlpbkRhbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMueWluZGFvX2ppc2h1Kz1kdDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMueWluZGFvX2ppc2h1Pj0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb19qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaUu+WHu+iuoeeulyAqL1xyXG4gICAgY2hlY2tBdHQoZHQ6bnVtYmVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYXR0X2ppc2h1Kz1kdDtcclxuICAgICAgICBpZih0aGlzLmF0dF9qaXNodT49dGhpcy5hdHRfamlhbmdlKXtcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9dGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vdGhpcy5tb3ZpbmcoZHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=