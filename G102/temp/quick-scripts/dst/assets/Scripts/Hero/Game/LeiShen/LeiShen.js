
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/LeiShen/LeiShen.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a18c1atTKNK+rtdeKAMopyu', 'LeiShen');
// Scripts/Hero/Game/LeiShen/LeiShen.ts

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
var Constants_1 = require("../../../Constants");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GroundManager_1 = require("../../../Game/GroundManager");
var SkillManager_1 = require("../../../Game/SkillManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MyTool_1 = require("../../../Tools/MyTool");
var BuffData_1 = require("../BuffData");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var ChainLightning_1 = require("./ChainLightning");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LeiShen = /** @class */ (function (_super) {
    __extends(LeiShen, _super);
    function LeiShen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**被闪电过的怪的uuid */
        _this.shandian_monster = [];
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    LeiShen.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.xuanyun, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_shandian, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_shandian_hit, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_skill_ground, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_skill_sky, 1);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addResetListen(this.onResetState);
    };
    LeiShen.prototype.onResetState = function () {
    };
    LeiShen.prototype.onXuanYunResult = function (isXuanYun) {
        /**雷神技能状态无法被控制 */
        if (isXuanYun && this.getHeroState() != HeroConfig_1.Hero_State.skill) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击-------------------------------------------------
    LeiShen.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    LeiShen.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        //求出方向
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    /**普攻对敌人释放一道闪电，可以连续弹射{参数1}名敌人（每个敌人人只能被弹射一次），造成{参数2}%伤害并施加一层“超负荷” */
    LeiShen.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            _this.shandian_monster = new Array();
            _this.createShanDian(null, enemyNode.getComponent(Monster_1.default));
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_LeiGodAttack);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
        });
    };
    /**当敌人身上的超负荷达到5层时，会受到落雷攻击造成{参数1}伤害并击晕{参数2}秒 */
    LeiShen.prototype.createShanDian = function (firstMonster, endMonster) {
        this.shandian_monster.push(endMonster.uuid);
        var shandian = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_shandian, this.getCreateBulletPos());
        shandian.getComponent(ChainLightning_1.default).init(GameEffectsManager_1.GameEffectId.lei_shen_shandian, firstMonster, endMonster, this.onEndMonster.bind(this));
        var gjData = this.getGongJiData(HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_1, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1));
        var data = endMonster.beFlashInjured(gjData);
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_shandian_hit, endMonster.getCenterPos());
        if (this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2) && data.getDamageNum() > 0 && data.is_die == false) {
            var buffData = new BuffData_1.BuffData();
            buffData.buff_id = HeroConfig_1.BuffId.Hero_LeiShen_ChaoFuHe;
            buffData.remain_time = 60;
            buffData.buff_type = HeroConfig_1.BuffType.Burst;
            buffData.buff_value = [4];
            buffData.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
            buffData.add_floor = 1;
            var damageRate = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
            endMonster.addDeBuff(buffData, this.getGongJiData(HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, damageRate));
        }
    };
    LeiShen.prototype.onEndMonster = function (endMonster) {
        var tansheNum = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
        if (this.shandian_monster.length < tansheNum) {
            var nextMonster = this.getMonster(endMonster.getCenterPos());
            if (nextMonster) {
                this.createShanDian(endMonster, nextMonster);
            }
        }
    };
    LeiShen.prototype.getIsTanShe = function (uuid) {
        return this.shandian_monster.indexOf(uuid) >= 0;
    };
    LeiShen.prototype.getMonster = function (pos) {
        var em = MonsterManager_1.default.getInstance();
        if (em.node.childrenCount <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = new Array();
        for (var _i = 0, _a = em.node.children; _i < _a.length; _i++) {
            var enemy = _a[_i];
            var enemyTS = enemy.getComponent(Monster_1.default);
            if (enemyTS && enemyTS.getIsCanCheck() == true) {
                var distance = pos.sub(enemyTS.getCenterPos()).mag();
                if (this.getIsTanShe(enemyTS.uuid) == false && distance <= 500) {
                    attMonsters.push(enemyTS);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        if (1 == attMonsters.length) {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort(function (a, b) {
            return a.getCenterPos().sub(pos).mag() - b.getCenterPos().sub(pos).mag();
        });
        return attMonsters[0];
    };
    //---------------------------------------------技能-----------------------------------------------------
    LeiShen.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi();
        }, this.node);
        return 0;
    };
    LeiShen.prototype.startSelfXuLi = function () {
        var _this = this;
        //发射帧监听
        var fasheData = new MonsterData_1.KeyFrameData();
        fasheData.name = "FaShe";
        fasheData.callback = function () {
        };
        //英雄动作播放
        this.setHeroState(HeroConfig_1.Hero_State.skill, HeroConfig_1.GongJi_FangXiang.zhong, [fasheData], function () {
            //隐身
            SkillManager_1.default.getInstance().setTimeStop(false);
            _this.node.parent = cc.find('Canvas/Hero_Root');
            _this.node.zIndex = 2;
            //可以发射
            _this.startLaunch();
        });
        this.spine.timeScale = Constants_1.JiaSu;
    };
    /**3秒内在战场上的随机位置召唤{参数1}道闪电，闪电会对半径80圆形范围内的敌人造成{参数2}%伤害，并施加一层“超负荷” */
    LeiShen.prototype.startLaunch = function () {
        var _this = this;
        this.node.opacity = 0;
        this.node_shadow.opacity = 0;
        _super.prototype.setAttSpineScale.call(this);
        var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
        var num = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active);
        var jiange = 3 / num;
        var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        var exFanwei = 0;
        if (ex1 && ex1 > 0) {
            //增加范围
            exFanwei = ex1;
        }
        // if(IsDebug){
        //     exFanwei=200;
        // }
        for (var i = 0; i < num; i++) {
            this.scheduleOnce(function () {
                var pos = cc.v2(Math.random() * 550 - 275, Math.random() * 800 - 400);
                GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_skill_ground, pos);
                var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_skill_sky, pos);
                node.scale = 1;
                MyTool_1.default.randomSceneShake(-6, 6, 0.015, 6);
                var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, pos, 180 * (1 + exFanwei));
                if (monsters) {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_LeiGodSkill2);
                    for (var n = 0; n < monsters.length; n++) {
                        var monster = monsters[n].getComponent(Monster_1.default);
                        var data = monster.beFlashInjured(gjData);
                        if (_this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2) && data.getDamageNum() > 0) {
                            if (data.is_die == false) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Hero_LeiShen_ChaoFuHe;
                                buffData.remain_time = 60;
                                buffData.buff_type = HeroConfig_1.BuffType.Burst;
                                buffData.buff_value = [4];
                                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
                                buffData.add_floor = 2;
                                var damageRate = _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
                                monster.addDeBuff(buffData, _this.getGongJiData(HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, damageRate));
                            }
                        }
                    }
                }
            }, i * jiange);
        }
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
            _this.node_shadow.opacity = 255;
            _super.prototype.playSpineAnimation.call(_this, 'SkillEnd', false, null, function () {
                _this.node.opacity = 255;
                _super.prototype.setHeroState.call(_this, HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong, null, null);
            });
        }, 3);
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    LeiShen = __decorate([
        ccclass
    ], LeiShen);
    return LeiShen;
}(Hero_1.default));
exports.default = LeiShen;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTGVpU2hlblxcTGVpU2hlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBK0Q7QUFDL0QsdUVBQW9GO0FBQ3BGLDZEQUF3RDtBQUN4RCwyREFBc0Q7QUFDdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msd0NBQXVDO0FBQ3ZDLGdDQUEyQjtBQUMzQiw0Q0FBcUc7QUFDckcsbURBQThDO0FBR3hDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFJO0lBQXpDO1FBQUEscUVBb09DO1FBbk9HLGlCQUFpQjtRQUNqQixzQkFBZ0IsR0FBVSxFQUFFLENBQUM7O0lBa09qQyxDQUFDO0lBaE9ELCtGQUErRjtJQUMzRix3QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUks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QUksVUFBVSxHQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7Z0NBQ2pFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsdUJBQVUsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLHNCQUFTLENBQUMsU0FBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NkJBQ3pHO3lCQUNKO3FCQUNKO2lCQUNKO1lBQ0wsQ0FBQyxFQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztZQUN0QixLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUM7WUFDN0IsaUJBQU0sa0JBQWtCLGFBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7Z0JBQzNDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztnQkFDdEIsaUJBQU0sWUFBWSxhQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLDZCQUFnQixDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDekUsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDSixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBbk9nQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBb08zQjtJQUFELGNBQUM7Q0FwT0QsQUFvT0MsQ0FwT29DLGNBQUksR0FvT3hDO2tCQXBPb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZyxIZXJvX1N0YXRlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQ2hhaW5MaWdodG5pbmcgZnJvbSBcIi4vQ2hhaW5MaWdodG5pbmdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExlaVNoZW4gZXh0ZW5kcyBIZXJvIHtcclxuICAgIC8qKuiiq+mXqueUtei/h+eahOaAqueahHV1aWQgKi9cclxuICAgIHNoYW5kaWFuX21vbnN0ZXI6c3RyaW5nW109W107XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWKoOi9vS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC54dWFueXVuLDQpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2hhbmRpYW4sNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbl9oaXQsNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9ncm91bmQsNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9za3ksMSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2tpbGxMaXN0ZW4odGhpcy51c2VTa2lsbCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5ub3JtYWxBdHRhY2spO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRIaXRMaXN0ZW4odGhpcy5vbkhpdE1vbnN0ZXIpO1xyXG4gICAgICAgIHRoaXMuYWRkUmVzZXRMaXN0ZW4odGhpcy5vblJlc2V0U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzZXRTdGF0ZSgpe1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIC8qKumbt+elnuaKgOiDveeKtuaAgeaXoOazleiiq+aOp+WItiAqL1xyXG4gICAgICAgIGlmKGlzWHVhbll1biYmdGhpcy5nZXRIZXJvU3RhdGUoKSE9SGVyb19TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uSGl0TW9uc3RlcihkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsaXNDcml0OmJvb2xlYW4sbW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v5rGC5Ye65pa55ZCRXHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICB9XHJcbiAgICAvKirmma7mlLvlr7nmlYzkurrph4rmlL7kuIDpgZPpl6rnlLXvvIzlj6/ku6Xov57nu63lvLnlsIR75Y+C5pWwMX3lkI3mlYzkurrvvIjmr4/kuKrmlYzkurrkurrlj6rog73ooqvlvLnlsITkuIDmrKHvvInvvIzpgKDmiJB75Y+C5pWwMn0l5Lyk5a6z5bm25pa95Yqg5LiA5bGC4oCc6LaF6LSf6I234oCdICovXHJcbiAgICBzdGFydEF0dGFjayhlbmVteU5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlOb2RlLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRTaGVTaG91UG9zKCk7XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz10aGlzLmdldEZhbmdYaWFuZ0J5UG9zKGVuZW15UG9zKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2hhbmRpYW5fbW9uc3Rlcj1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTaGFuRGlhbihudWxsLGVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGVpR29kQXR0YWNrKTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXROb3JtYWxBdHRhY2soKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmF0dGFjayxmYW5neGlhbmcsW2RhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoq5b2T5pWM5Lq66Lqr5LiK55qE6LaF6LSf6I236L6+5YiwNeWxguaXtu+8jOS8muWPl+WIsOiQvembt+aUu+WHu+mAoOaIkHvlj4LmlbAxfeS8pOWus+W5tuWHu+aZlXvlj4LmlbAyfeenkiAqL1xyXG4gICAgY3JlYXRlU2hhbkRpYW4oZmlyc3RNb25zdGVyOk1vbnN0ZXIsZW5kTW9uc3RlcjpNb25zdGVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hhbmRpYW5fbW9uc3Rlci5wdXNoKGVuZE1vbnN0ZXIudXVpZCk7XHJcbiAgICAgICAgbGV0IHNoYW5kaWFuPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbix0aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpKTtcclxuICAgICAgICBzaGFuZGlhbi5nZXRDb21wb25lbnQoQ2hhaW5MaWdodG5pbmcpLmluaXQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NoYW5kaWFuLGZpcnN0TW9uc3RlcixlbmRNb25zdGVyLHRoaXMub25FbmRNb25zdGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBnakRhdGE9dGhpcy5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSlcclxuICAgICAgICBsZXQgZGF0YT1lbmRNb25zdGVyLmJlRmxhc2hJbmp1cmVkKGdqRGF0YSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NoYW5kaWFuX2hpdCxlbmRNb25zdGVyLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICBpZih0aGlzLmhlcm9fZGF0YS5nZXRJc1VubG9jayhTa2lsbFR5cGUuUGFzc2l2ZV8yKSYmZGF0YS5nZXREYW1hZ2VOdW0oKT4wJiZkYXRhLmlzX2RpZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fTGVpU2hlbl9DaGFvRnVIZTtcclxuICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NjA7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5CdXJzdDtcclxuICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bNF07XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5hZGRfZmxvb3I9MTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhbWFnZVJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMilcclxuICAgICAgICAgICAgZW5kTW9uc3Rlci5hZGREZUJ1ZmYoYnVmZkRhdGEsdGhpcy5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMixkYW1hZ2VSYXRlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5kTW9uc3RlcihlbmRNb25zdGVyOk1vbnN0ZXIpeyAgICAgICAgXHJcbiAgICAgICAgbGV0IHRhbnNoZU51bT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICBpZih0aGlzLnNoYW5kaWFuX21vbnN0ZXIubGVuZ3RoPHRhbnNoZU51bSl7XHJcbiAgICAgICAgICAgIGxldCBuZXh0TW9uc3Rlcj10aGlzLmdldE1vbnN0ZXIoZW5kTW9uc3Rlci5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgICAgIGlmKG5leHRNb25zdGVyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hhbkRpYW4oZW5kTW9uc3RlcixuZXh0TW9uc3Rlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNUYW5TaGUodXVpZDpzdHJpbmcpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhbmRpYW5fbW9uc3Rlci5pbmRleE9mKHV1aWQpPj0wO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vbnN0ZXIocG9zOmNjLlZlYzIpOk1vbnN0ZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgZW09TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKTsgICAgICAgIFxyXG4gICAgICAgIGlmKGVtLm5vZGUuY2hpbGRyZW5Db3VudDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEu5YWI5qOA5rWL5Zyo5pS75Ye76IyD5Zu05YaF56ym5ZCI5pS75Ye75Y2V5L2N55qE5pWM5Lq6XHJcbiAgICAgICAgbGV0IGF0dE1vbnN0ZXJzOk1vbnN0ZXJbXT1uZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IobGV0IGVuZW15IG9mIGVtLm5vZGUuY2hpbGRyZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZW5lbXlUUz1lbmVteS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIGlmKGVuZW15VFMgJiYgZW5lbXlUUy5nZXRJc0NhbkNoZWNrKCk9PXRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT1wb3Muc3ViKGVuZW15VFMuZ2V0Q2VudGVyUG9zKCkpLm1hZygpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nZXRJc1RhblNoZShlbmVteVRTLnV1aWQpPT1mYWxzZSAmJiBkaXN0YW5jZTw9NTAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dE1vbnN0ZXJzLnB1c2goZW5lbXlUUyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXR0TW9uc3RlcnMubGVuZ3RoPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKDE9PWF0dE1vbnN0ZXJzLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhdHRNb25zdGVyc1swXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLjHkvJjlhYjmlLvlh7vot5/nm67moIfkvY3nva7mnIDov5HnmoTljZXkvY1cclxuICAgICAgICBhdHRNb25zdGVycy5zb3J0KChhOk1vbnN0ZXIsYjpNb25zdGVyKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gYS5nZXRDZW50ZXJQb3MoKS5zdWIocG9zKS5tYWcoKS1iLmdldENlbnRlclBvcygpLnN1Yihwb3MpLm1hZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhdHRNb25zdGVyc1swXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDvS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgdXNlU2tpbGwocG9zOmNjLlZlYzIpOm51bWJlclxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTZWxmWHVMaSgpO1xyXG4gICAgICAgIH0sdGhpcy5ub2RlKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKCl7XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v6ZqQ6LqrXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTsgIFxyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICAvL+WPr+S7peWPkeWwhFxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgfVxyXG4gICAgLyoqM+enkuWGheWcqOaImOWcuuS4iueahOmaj+acuuS9jee9ruWPrOWUpHvlj4LmlbAxfemBk+mXqueUte+8jOmXqueUteS8muWvueWNiuW+hDgw5ZyG5b2i6IyD5Zu05YaF55qE5pWM5Lq66YCg5oiQe+WPguaVsDJ9JeS8pOWus++8jOW5tuaWveWKoOS4gOWxguKAnOi2hei0n+iNt+KAnSAqL1xyXG4gICAgc3RhcnRMYXVuY2goKXtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eT0wO1xyXG4gICAgICAgIHN1cGVyLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuQWN0aXZlLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5BY3RpdmUpKTtcclxuICAgICAgICBsZXQgbnVtPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgIGxldCBqaWFuZ2U9My9udW07XHJcbiAgICAgICAgbGV0IGV4MT10aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgbGV0IGV4RmFud2VpPTA7XHJcbiAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgIC8v5aKe5Yqg6IyD5Zu0XHJcbiAgICAgICAgICAgIGV4RmFud2VpPWV4MTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgLy8gICAgIGV4RmFud2VpPTIwMDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bnVtOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcz1jYy52MihNYXRoLnJhbmRvbSgpKjU1MC0yNzUsTWF0aC5yYW5kb20oKSo4MDAtNDAwKTtcclxuICAgICAgICAgICAgICAgIEdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2tpbGxfZ3JvdW5kLHBvcyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2tpbGxfc2t5LHBvcyk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPTE7XHJcbiAgICAgICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZSgtNiw2LDAuMDE1LDYpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEscG9zLDE4MCooMStleEZhbndlaSkpO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9MZWlHb2RTa2lsbDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgbj0wOyBuPG1vbnN0ZXJzLmxlbmd0aDsgbisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXI9bW9uc3RlcnNbbl0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyLmJlRmxhc2hJbmp1cmVkKGdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGVyb19kYXRhLmdldElzVW5sb2NrKFNraWxsVHlwZS5QYXNzaXZlXzIpJiZkYXRhLmdldERhbWFnZU51bSgpPjApeyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuaXNfZGllPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fTGVpU2hlbl9DaGFvRnVIZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT02MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuQnVyc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLk51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYWRkX2Zsb29yPTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhbWFnZVJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyLmFkZERlQnVmZihidWZmRGF0YSx0aGlzLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuUGFzc2l2ZV8yLGRhbWFnZVJhdGUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxpKmppYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgc3VwZXIucGxheVNwaW5lQW5pbWF0aW9uKCdTa2lsbEVuZCcsZmFsc2UsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nLG51bGwsbnVsbCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwzKVxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuIl19