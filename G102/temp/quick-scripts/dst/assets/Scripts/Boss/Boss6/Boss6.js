
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Boss/Boss6/Boss6.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '97c48NXFCdCoIV8qQO2rjxZ', 'Boss6');
// Scripts/Boss/Boss6/Boss6.ts

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
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var MonsterBullet_1 = require("../../Monster/MonsterBullet");
var MonsterData_1 = require("../../Monster/MonsterData");
var MonsterManager_1 = require("../../Monster/MonsterManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var Boss_1 = require("../Boss");
var BossSkill6_1 = require("./BossSkill6");
var Animation_Name;
(function (Animation_Name) {
    Animation_Name["Idle"] = "Idle";
    Animation_Name["attack1"] = "Attack1";
    Animation_Name["run"] = "Run";
    Animation_Name["hurt1"] = "Hurt";
    Animation_Name["skill1_1"] = "Skill1_1";
    Animation_Name["skill1_2"] = "Skill1_2";
    Animation_Name["skill1_3"] = "Skill1_3";
    Animation_Name["skill2_1"] = "Skill2_1";
    Animation_Name["skill2_2"] = "Skill2_2";
    Animation_Name["skill2_3"] = "Skill2_3";
    Animation_Name["dead"] = "Dead";
})(Animation_Name || (Animation_Name = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Boss6 = /** @class */ (function (_super) {
    __extends(Boss6, _super);
    function Boss6() {
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
        _this.cur_state = 1; //1：高防御  2：低防御
        _this.skill_jishu_2 = 0;
        return _this;
    }
    Boss6.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_attack, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_attack_hit, 1);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_skill2, 4);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.boss6_skill2_hit, 4);
        this.addDeathCallback(this.onDeath);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addBossInitedListen(this.onBossInited);
    };
    Boss6.prototype.onBossInited = function () {
        this.startIdle();
        this.node.y = 128;
        this.skill_cd = this.skill_data.getSkillColdDown(2);
        this.cur_state = 1;
        this.monster_data.Defense += this.base_attribute_data.Defense * this.skill_data.getSkillValue1(1);
    };
    Boss6.prototype.startIdle = function () {
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.standby);
        _super.prototype.playSpinAnimaton.call(this, Animation_Name.Idle, true);
    };
    Boss6.prototype.startAttack = function () {
        var _this = this;
        this.att_jishu = 0;
        _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.att);
        var data = new MonsterData_1.KeyFrameData();
        data.name = 'Attack';
        data.callback = function () {
            _this.att_jishu = 0;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boss6Attack);
            var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_attack, _super.prototype.getAttPos.call(_this));
            node.getComponent(MonsterBullet_1.default).init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Normal, true), GameEffectsManager_1.GameEffectId.boss6_attack, GameEffectsManager_1.GameEffectId.boss6_attack_hit, 1500, Math.PI * 3 / 2);
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
    Boss6.prototype.startSkill = function () {
        var _this = this;
        this.skill_jishu = 0;
        if (_super.prototype.getEnemyState.call(this) != EnemyConfig_1.Enemy_State.att) {
            if (!_super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Hero_XuanYun)) {
                this.skill_waiting = false;
                _super.prototype.setEnemyState.call(this, EnemyConfig_1.Enemy_State.skill);
                _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_1), false, null, function () {
                    var data = new MonsterData_1.KeyFrameData();
                    data.name = 'Skill2';
                    data.callback = _this.startLaunch.bind(_this);
                    _super.prototype.playSpinAnimaton.call(_this, (Animation_Name.skill2_2), true, data);
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
    Boss6.prototype.startLaunch = function () {
        var _this = this;
        //cc.log('发射发射');
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        this.skill_jishu = 0;
        var num = 0;
        for (var i = 0; i < 2; i++) {
            this.scheduleOnce(function () {
                if (!_this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_XuanYun)) {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_boss6Attack);
                    num++;
                    var startPos = cc.v2(Math.random() * 128 - 64, _this.node.y + 256);
                    var offsetX = startPos.x < 0 ? -(80 + Math.random() * 80) : (80 + Math.random() * 80);
                    var endPos = cc.v2(offsetX + startPos.x, startPos.y + Math.random() * 40 + 80);
                    //随机英雄
                    var attDir = Math.PI * 3 / 2;
                    var heroId = HeroManager_1.HeroManager.getInstance().getRandHeroId(GameManager_1.default.getInstance().cur_game_mode);
                    if (heroId != HeroConfig_1.Hero_Type.NULL) {
                        var heroPos = GameManager_1.default.getInstance().all_hero.get(heroId).node.getPosition();
                        var offsetPos = heroPos.sub(endPos);
                        var pi2 = Math.PI * 2;
                        attDir = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                    }
                    var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.boss6_skill2, startPos);
                    var bsAtt_1 = node.getComponent(BossSkill6_1.default);
                    bsAtt_1.init(_super.prototype.getAttData.call(_this, HeroConfig_1.DamageType.Skill, true, _this.skill_data.getSkillValue1(2)), GameEffectsManager_1.GameEffectId.boss6_skill2, 1500, attDir, _this.node.y);
                    bsAtt_1.is_can_move = false;
                    bsAtt_1.setHeroType(heroId, _this.skill_data.getSkillValue2(2));
                    //bsAtt.setHeroType(heroId,0.1);
                    cc.tween(node).to((0.25 - num * 0.05) * GameManager_1.default.getInstance().getGameRate(), { x: endPos.x, y: endPos.y }, { easing: 'quadOut' }).call(function () {
                        bsAtt_1.startFly();
                    }).start();
                }
            }, 0.25 * i);
        }
        this.launch_num++;
    };
    Boss6.prototype.endYinDao = function () {
        var _this = this;
        this.skill_jishu = 0;
        this.is_yindao = false;
        this.yindao_time = 10;
        _super.prototype.playSpinAnimaton.call(this, (Animation_Name.skill2_3), false, null, function () {
            _this.att_jishu = 0;
            _this.startIdle();
        });
    };
    Boss6.prototype.onDeath = function () {
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
    Boss6.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.startXuanYun();
        }
        else {
            //this.unXuanYun();
        }
    };
    Boss6.prototype.startXuanYun = function () {
        var _this = this;
        if (this.is_yindao && this.cur_state == 1) {
            this.skill_waiting = false;
            this.is_yindao = false;
            this.yindao_jishu = 0;
            this.cur_toughness += 1;
            this.cur_state = 2;
            this.skill_jishu_2 = 0;
            _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1_1, false, null, function () {
                _super.prototype.playSpinAnimaton.call(_this, Animation_Name.skill1_2, true, null, null);
                //减防御
                _this.monster_data.Defense -= _this.base_attribute_data.Defense * _this.skill_data.getSkillValue3(2);
                cc.log(_this.monster_data.Defense);
            });
        }
        else {
        }
    };
    Boss6.prototype.unXuanYun = function () {
        var _this = this;
        this.skill_jishu_2 = 0;
        if (!_super.prototype.getIsDie.call(this)) {
            _super.prototype.playSpinAnimaton.call(this, Animation_Name.skill1_3, false, null, function () {
                _this.cur_toughness -= 1;
                _this.cur_state = 1;
                //加防御
                _this.monster_data.Defense += _this.base_attribute_data.Defense * _this.skill_data.getSkillValue3(2);
                cc.log(_this.monster_data.Defense);
                if (!_super.prototype.getIsDie.call(_this)) {
                    _this.startIdle();
                }
            });
        }
    };
    Boss6.prototype.update = function (dt) {
        if ((GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) || this.getIsDie()) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.checkSkill(dt);
        if (!this.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
            if (this.getEnemyState() != EnemyConfig_1.Enemy_State.skill) {
                this.checkAtt(dt);
            }
        }
    };
    // /**技能检测 */
    Boss6.prototype.checkSkill = function (dt) {
        this.skill_jishu += dt;
        if (!this.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
            if (this.is_yindao == false && this.skill_jishu >= this.skill_cd) {
                this.skill_jishu = 0;
                this.startSkill();
            }
            if (this.is_yindao == true && this.yindao_time > 0) {
                this.yindao_time -= dt;
                if (this.yindao_time <= 0) {
                    //结束引导
                    this.endYinDao();
                    return;
                }
                // this.yindao_jishu+=dt;
                // if(this.yindao_jishu>=1){
                //     this.yindao_jishu=0;
                //     this.startLaunch();
                // }
            }
        }
        if (this.cur_state == 2) {
            this.skill_jishu_2 += dt;
            if (this.skill_jishu_2 >= 5) {
                this.unXuanYun();
            }
        }
    };
    /**攻击计算 */
    Boss6.prototype.checkAtt = function (dt) {
        this.att_jishu += dt;
        if (this.att_jishu >= this.att_jiange) {
            this.att_jishu = this.att_jiange;
            this.startAttack();
        }
        else {
            //this.moving(dt);
        }
    };
    Boss6 = __decorate([
        ccclass
    ], Boss6);
    return Boss6;
}(Boss_1.default));
exports.default = Boss6;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQm9zc1xcQm9zczZcXEJvc3M2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDZDQUE2RDtBQUM3RCx1REFBc0Q7QUFDdEQsb0VBQWlGO0FBQ2pGLGlEQUE0QztBQUM1QywyREFBMEQ7QUFFMUQseURBQXFGO0FBQ3JGLDZEQUF3RDtBQUN4RCx5REFBeUQ7QUFDekQsK0RBQTBEO0FBQzFELDZEQUF3RDtBQUN4RCxnQ0FBMkI7QUFDM0IsMkNBQXNDO0FBRXRDLElBQUssY0FhSjtBQWJELFdBQUssY0FBYztJQUVmLCtCQUFhLENBQUE7SUFDYixxQ0FBbUIsQ0FBQTtJQUNuQiw2QkFBVyxDQUFBO0lBQ1gsZ0NBQWMsQ0FBQTtJQUNkLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLHVDQUFxQixDQUFBO0lBQ3JCLCtCQUFZLENBQUE7QUFDaEIsQ0FBQyxFQWJJLGNBQWMsS0FBZCxjQUFjLFFBYWxCO0FBRUssSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQUk7SUFBdkM7UUFBQSxxRUE0UEM7UUExUEcsdUJBQXVCO1FBQ3ZCLG1CQUFhLEdBQVMsS0FBSyxDQUFDO1FBQzVCLFVBQVU7UUFDVixVQUFVO1FBQ1Ysa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsWUFBWTtRQUNaLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGFBQWE7UUFDYixlQUFTLEdBQVMsS0FBSyxDQUFDO1FBQ3hCLGdCQUFVLEdBQVEsQ0FBQyxDQUFDO1FBRXBCLGVBQVMsR0FBUSxDQUFDLENBQUMsQ0FBQSxjQUFjO1FBQ2pDLG1CQUFhLEdBQVEsQ0FBQyxDQUFDOztJQThPM0Is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LEVBQUUsQ0FBQzthQUNyQjtZQUNELElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLElBQUUsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQUM7Z0JBQ3hDLElBQUksQ0FBQyxXQUFXLElBQUUsRUFBRSxDQUFDO2dCQUNyQixJQUFHLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxFQUFDO29CQUNuQixNQUFNO29CQUNOLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsT0FBTztpQkFDVjtnQkFDRCx5QkFBeUI7Z0JBQ3pCLDRCQUE0QjtnQkFDNUIsMkJBQTJCO2dCQUMzQiwwQkFBMEI7Z0JBQzFCLElBQUk7YUFDUDtTQUNKO1FBQ0QsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLENBQUMsRUFBQztZQUNqQixJQUFJLENBQUMsYUFBYSxJQUFFLEVBQUUsQ0FBQztZQUN2QixJQUFHLElBQUksQ0FBQyxhQUFhLElBQUUsQ0FBQyxFQUFDO2dCQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVO0lBQ1Ysd0JBQVEsR0FBUixVQUFTLEVBQVM7UUFDZCxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsQ0FBQztRQUNuQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO2FBQUk7WUFDRCxrQkFBa0I7U0FDckI7SUFDTCxDQUFDO0lBM1BnQixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBNFB6QjtJQUFELFlBQUM7Q0E1UEQsQUE0UEMsQ0E1UGtDLGNBQUksR0E0UHRDO2tCQTVQb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHsgR2FtZU1vZGUsIEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X1N0YXRlIH0gZnJvbSBcIi4uLy4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE1vbnN0ZXJCdWxsZXQgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlckJ1bGxldFwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgQm9zcyBmcm9tIFwiLi4vQm9zc1wiO1xyXG5pbXBvcnQgQm9zc1NraWxsNiBmcm9tIFwiLi9Cb3NzU2tpbGw2XCI7XHJcblxyXG5lbnVtIEFuaW1hdGlvbl9OYW1lXHJcbntcclxuICAgIElkbGUgPSBcIklkbGVcIiwgICAgICAgLy8tLSDmraPpnaLlvoXmnLpcclxuICAgIGF0dGFjazEgPSBcIkF0dGFjazFcIiwgICAgICAgICAgLy8tLSDmlLvlh7sxXHJcbiAgICBydW4gPSBcIlJ1blwiLCAgICAgICAgICAgICAgICAvLy0tIOi3kei3r1xyXG4gICAgaHVydDEgPSBcIkh1cnRcIiwgICAgICAgICAgLy8tLSDlj5flh7sxXHJcbiAgICBza2lsbDFfMSA9IFwiU2tpbGwxXzFcIiwgICAgICAgICAgLy8tLSDmioDog73liqjkvZwxLOecqeaZleWPmOi6q1xyXG4gICAgc2tpbGwxXzIgPSBcIlNraWxsMV8yXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMuW+queOr1xyXG4gICAgc2tpbGwxXzMgPSBcIlNraWxsMV8zXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cM++8jOWPmOWbnumrmOmYsuW+oVxyXG4gICAgc2tpbGwyXzEgPSBcIlNraWxsMl8xXCIsICAgICAgICAgIC8vLS0g5oqA6IO95Yqo5L2cMSzlh4blpIflvIDlp4vlvJXlr7xcclxuICAgIHNraWxsMl8yID0gXCJTa2lsbDJfMlwiLCAgICAgICAgICAvLy0tIOaKgOiDveWKqOS9nDLlvqrnjq/vvIzlvJXlr7zlj5HlvLlcclxuICAgIHNraWxsMl8zID0gXCJTa2lsbDJfM1wiLCAgICAgICAgICAvLy0tIOaKgOiDveWKqOS9nDPvvIznu5PmnZ/lvJXlr7xcclxuICAgIGRlYWQ9IFwiRGVhZFwiLCAgIC8v5q275LqhXHJcbn1cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9zczYgZXh0ZW5kcyBCb3NzIHtcclxuXHJcbiAgICAvL3NraWxsX3RpbWU6bnVtYmVyPTEwO1xyXG4gICAgc2tpbGxfd2FpdGluZzpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5byV5a+855u45YWzICovXHJcbiAgICAvKirlvJXlr7zorqHmlbAgKi9cclxuICAgIHlpbmRhb19qaXNodTpudW1iZXI9MDsgICAgXHJcbiAgICAvKirlvJXlr7zliankvZnml7bplb8gKi9cclxuICAgIHlpbmRhb190aW1lOm51bWJlcj0xMDtcclxuICAgIC8qKuaYr+WQpuWkhOS6juW8leWvvOS4rSAqL1xyXG4gICAgaXNfeWluZGFvOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBsYXVuY2hfbnVtOm51bWJlcj0wO1xyXG4gICAgc2tpbGxfY2Q6bnVtYmVyO1xyXG4gICAgY3VyX3N0YXRlOm51bWJlcj0xOy8vMe+8mumrmOmYsuW+oSAgMu+8muS9jumYsuW+oVxyXG4gICAgc2tpbGxfamlzaHVfMjpudW1iZXI9MDtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M2X2F0dGFjaywxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczZfYXR0YWNrX2hpdCwxKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczZfc2tpbGwyLDQpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzNl9za2lsbDJfaGl0LDQpO1xyXG4gICAgICAgIHRoaXMuYWRkRGVhdGhDYWxsYmFjayh0aGlzLm9uRGVhdGgpO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRCb3NzSW5pdGVkTGlzdGVuKHRoaXMub25Cb3NzSW5pdGVkKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQm9zc0luaXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS55PTEyODtcclxuICAgICAgICB0aGlzLnNraWxsX2NkPXRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbENvbGREb3duKDIpO1xyXG4gICAgICAgIHRoaXMuY3VyX3N0YXRlPTE7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZSs9dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UqdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUxKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SWRsZSgpeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLklkbGUsdHJ1ZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmF0dCk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT0nQXR0YWNrJztcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57ICBcclxuICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX2Jvc3M2QXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmJvc3M2X2F0dGFjayxzdXBlci5nZXRBdHRQb3MoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXJCdWxsZXQpLmluaXQoc3VwZXIuZ2V0QXR0RGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlKSxHYW1lRWZmZWN0SWQuYm9zczZfYXR0YWNrLEdhbWVFZmZlY3RJZC5ib3NzNl9hdHRhY2tfaGl0LDE1MDAsTWF0aC5QSSozLzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5hdHRhY2sxKSxmYWxzZSxkYXRhLCgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfd2FpdGluZz09dHJ1ZSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5za2lsbCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWRsZSgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsKCl7XHJcbiAgICAgICAgdGhpcy5za2lsbF9qaXNodT0wO1xyXG4gICAgICAgIGlmKHN1cGVyLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYXR0KXtcclxuICAgICAgICAgICAgaWYoIXN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19YdWFuWXVuKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNraWxsKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMl8xKSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubmFtZT0nU2tpbGwyJztcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrPXRoaXMuc3RhcnRMYXVuY2guYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKChBbmltYXRpb25fTmFtZS5za2lsbDJfMiksdHJ1ZSxkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzX3lpbmRhbz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lPTEwO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmc9dHJ1ZTtcclxuICAgICAgICAgICAgfSAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3dhaXRpbmc9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRMYXVuY2goKXtcclxuICAgICAgICAvL2NjLmxvZygn5Y+R5bCE5Y+R5bCEJyk7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5za2lsbF9qaXNodT0wO1xyXG4gICAgICAgIGxldCBudW09MDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwyOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX1h1YW5ZdW4pKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfYm9zczZBdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bSsrOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3M9Y2MudjIoTWF0aC5yYW5kb20oKSoxMjgtNjQsdGhpcy5ub2RlLnkrMjU2KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WD1zdGFydFBvcy54PDA/LSg4MCtNYXRoLnJhbmRvbSgpKjgwKTooODArTWF0aC5yYW5kb20oKSo4MClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kUG9zPWNjLnYyKG9mZnNldFgrc3RhcnRQb3MueCxzdGFydFBvcy55K01hdGgucmFuZG9tKCkqNDArODApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6ZqP5py66Iux6ZuEXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dERpcj1NYXRoLlBJKjMvMjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb0lkPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmFuZEhlcm9JZChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGhlcm9JZCE9SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVyb1Bvcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChoZXJvSWQpLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1oZXJvUG9zLnN1YihlbmRQb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwaTI9TWF0aC5QSSoyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHREaXI9KE1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpK3BpMiklcGkyOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5ib3NzNl9za2lsbDIsc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBic0F0dD1ub2RlLmdldENvbXBvbmVudChCb3NzU2tpbGw2KTtcclxuICAgICAgICAgICAgICAgICAgICBic0F0dC5pbml0KHN1cGVyLmdldEF0dERhdGEoRGFtYWdlVHlwZS5Ta2lsbCx0cnVlLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMSgyKSksR2FtZUVmZmVjdElkLmJvc3M2X3NraWxsMiwxNTAwLGF0dERpcix0aGlzLm5vZGUueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnNBdHQuaXNfY2FuX21vdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnNBdHQuc2V0SGVyb1R5cGUoaGVyb0lkLHRoaXMuc2tpbGxfZGF0YS5nZXRTa2lsbFZhbHVlMigyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9ic0F0dC5zZXRIZXJvVHlwZShoZXJvSWQsMC4xKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygoMC4yNS1udW0qMC4wNSkqR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHYW1lUmF0ZSgpLHt4OmVuZFBvcy54LHk6ZW5kUG9zLnl9LHtlYXNpbmc6ICdxdWFkT3V0J30pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnNBdHQuc3RhcnRGbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LDAuMjUqaSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhdW5jaF9udW0rKzsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGVuZFlpbkRhbygpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHU9MDtcclxuICAgICAgICB0aGlzLmlzX3lpbmRhbz1mYWxzZTtcclxuICAgICAgICB0aGlzLnlpbmRhb190aW1lPTEwO1xyXG4gICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oKEFuaW1hdGlvbl9OYW1lLnNraWxsMl8zKSxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJZGxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZWF0aCgpIHtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICBzdXBlci5wbGF5RGVhZEFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLmRlYWQsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxCdWZmKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuc2hhZG93KS50bygwLjc1LHtvcGFjaXR5OjB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC43NSx7b3BhY2l0eTowfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95TW9uc3Rlcih0aGlzLm5vZGUsdGhpcy5tb25zdGVyX3R5cGUpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy9HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXgucmV3YXJkQm94Mik7ICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0WHVhbll1bigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL3RoaXMudW5YdWFuWXVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0WHVhbll1bigpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNfeWluZGFvJiZ0aGlzLmN1cl9zdGF0ZT09MSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfd2FpdGluZz1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc195aW5kYW89ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMueWluZGFvX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcys9MTtcclxuICAgICAgICAgICAgdGhpcy5jdXJfc3RhdGU9MjtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9qaXNodV8yPTA7XHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluQW5pbWF0b24oQW5pbWF0aW9uX05hbWUuc2tpbGwxXzEsZmFsc2UsbnVsbCwoKT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheVNwaW5BbmltYXRvbihBbmltYXRpb25fTmFtZS5za2lsbDFfMix0cnVlLG51bGwsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAvL+WHj+mYsuW+oVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZS09dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UqdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUzKDIpO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgdW5YdWFuWXVuKCl7XHJcbiAgICAgICAgdGhpcy5za2lsbF9qaXNodV8yPTA7XHJcbiAgICAgICAgaWYoIXN1cGVyLmdldElzRGllKCkpe1xyXG4gICAgICAgICAgICBzdXBlci5wbGF5U3BpbkFuaW1hdG9uKEFuaW1hdGlvbl9OYW1lLnNraWxsMV8zLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcy09MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3N0YXRlPTE7XHJcbiAgICAgICAgICAgICAgICAvL+WKoOmYsuW+oVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZSs9dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UqdGhpcy5za2lsbF9kYXRhLmdldFNraWxsVmFsdWUzKDIpO1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYoIXN1cGVyLmdldElzRGllKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydElkbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZigoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl8fHRoaXMuZ2V0SXNEaWUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLmNoZWNrU2tpbGwoZHQpO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuc2tpbGwpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0F0dChkdCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIC8qKuaKgOiDveajgOa1iyAqL1xyXG4gICAgY2hlY2tTa2lsbChkdDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2tpbGxfamlzaHUrPWR0O1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX3lpbmRhbz09ZmFsc2UmJnRoaXMuc2tpbGxfamlzaHU+PXRoaXMuc2tpbGxfY2Qpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5pc195aW5kYW89PXRydWUmJnRoaXMueWluZGFvX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnlpbmRhb190aW1lLT1kdDtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMueWluZGFvX3RpbWU8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8v57uT5p2f5byV5a+8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRZaW5EYW8oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnlpbmRhb19qaXNodSs9ZHQ7XHJcbiAgICAgICAgICAgICAgICAvLyBpZih0aGlzLnlpbmRhb19qaXNodT49MSl7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy55aW5kYW9famlzaHU9MDtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnN0YXJ0TGF1bmNoKCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJfc3RhdGU9PTIpe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX2ppc2h1XzIrPWR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX2ppc2h1XzI+PTUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51blh1YW5ZdW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmlLvlh7vorqHnrpcgKi9cclxuICAgIGNoZWNrQXR0KGR0Om51bWJlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLmF0dF9qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy5hdHRfamlzaHU+PXRoaXMuYXR0X2ppYW5nZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PXRoaXMuYXR0X2ppYW5nZTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydEF0dGFjaygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL3RoaXMubW92aW5nKGR0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19