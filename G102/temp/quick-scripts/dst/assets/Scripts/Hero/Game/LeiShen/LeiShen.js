
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
        this.is_LoadLoad = true;
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
        var tansheNum = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1) + this.hero_lvl;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTGVpU2hlblxcTGVpU2hlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBK0Q7QUFDL0QsdUVBQW9GO0FBQ3BGLDZEQUF3RDtBQUN4RCwyREFBc0Q7QUFDdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msd0NBQXVDO0FBQ3ZDLGdDQUEyQjtBQUMzQiw0Q0FBcUc7QUFDckcsbURBQThDO0FBR3hDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFJO0lBQXpDO1FBQUEscUVBcU9DO1FBcE9HLGlCQUFpQjtRQUNqQixzQkFBZ0IsR0FBVSxFQUFFLENBQUM7O0lBbU9qQyxDQUFDO0lBak9ELCtGQUErRjtJQUMzRix3QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxjQUFjLENBQUMs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dCB7IEdhbWVTdGF0ZSwgSXNEZWJ1ZywgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi4vSGVyb1wiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBHb25nSmlfRmFuZ1hpYW5nLEhlcm9fU3RhdGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBDaGFpbkxpZ2h0bmluZyBmcm9tIFwiLi9DaGFpbkxpZ2h0bmluZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGVpU2hlbiBleHRlbmRzIEhlcm8ge1xyXG4gICAgLyoq6KKr6Zeq55S16L+H55qE5oCq55qEdXVpZCAqL1xyXG4gICAgc2hhbmRpYW5fbW9uc3RlcjpzdHJpbmdbXT1bXTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg6L29LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbiw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NoYW5kaWFuX2hpdCw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX2dyb3VuZCw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX3NreSwxKTtcclxuICAgICAgICB0aGlzLmlzX0xvYWRMb2FkPXRydWU7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2tpbGxMaXN0ZW4odGhpcy51c2VTa2lsbCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5ub3JtYWxBdHRhY2spO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRIaXRMaXN0ZW4odGhpcy5vbkhpdE1vbnN0ZXIpO1xyXG4gICAgICAgIHRoaXMuYWRkUmVzZXRMaXN0ZW4odGhpcy5vblJlc2V0U3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzZXRTdGF0ZSgpe1xyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIC8qKumbt+elnuaKgOiDveeKtuaAgeaXoOazleiiq+aOp+WItiAqL1xyXG4gICAgICAgIGlmKGlzWHVhbll1biYmdGhpcy5nZXRIZXJvU3RhdGUoKSE9SGVyb19TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uSGl0TW9uc3RlcihkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsaXNDcml0OmJvb2xlYW4sbW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v5rGC5Ye65pa55ZCRXHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICB9XHJcbiAgICAvKirmma7mlLvlr7nmlYzkurrph4rmlL7kuIDpgZPpl6rnlLXvvIzlj6/ku6Xov57nu63lvLnlsIR75Y+C5pWwMX3lkI3mlYzkurrvvIjmr4/kuKrmlYzkurrkurrlj6rog73ooqvlvLnlsITkuIDmrKHvvInvvIzpgKDmiJB75Y+C5pWwMn0l5Lyk5a6z5bm25pa95Yqg5LiA5bGC4oCc6LaF6LSf6I234oCdICovXHJcbiAgICBzdGFydEF0dGFjayhlbmVteU5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlOb2RlLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRTaGVTaG91UG9zKCk7XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz10aGlzLmdldEZhbmdYaWFuZ0J5UG9zKGVuZW15UG9zKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2hhbmRpYW5fbW9uc3Rlcj1uZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTaGFuRGlhbihudWxsLGVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGVpR29kQXR0YWNrKTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXROb3JtYWxBdHRhY2soKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmF0dGFjayxmYW5neGlhbmcsW2RhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoq5b2T5pWM5Lq66Lqr5LiK55qE6LaF6LSf6I236L6+5YiwNeWxguaXtu+8jOS8muWPl+WIsOiQvembt+aUu+WHu+mAoOaIkHvlj4LmlbAxfeS8pOWus+W5tuWHu+aZlXvlj4LmlbAyfeenkiAqL1xyXG4gICAgY3JlYXRlU2hhbkRpYW4oZmlyc3RNb25zdGVyOk1vbnN0ZXIsZW5kTW9uc3RlcjpNb25zdGVyKXsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2hhbmRpYW5fbW9uc3Rlci5wdXNoKGVuZE1vbnN0ZXIudXVpZCk7XHJcbiAgICAgICAgbGV0IHNoYW5kaWFuPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbix0aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpKTtcclxuICAgICAgICBzaGFuZGlhbi5nZXRDb21wb25lbnQoQ2hhaW5MaWdodG5pbmcpLmluaXQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NoYW5kaWFuLGZpcnN0TW9uc3RlcixlbmRNb25zdGVyLHRoaXMub25FbmRNb25zdGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAgIGxldCBnakRhdGE9dGhpcy5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSlcclxuICAgICAgICBsZXQgZGF0YT1lbmRNb25zdGVyLmJlRmxhc2hJbmp1cmVkKGdqRGF0YSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NoYW5kaWFuX2hpdCxlbmRNb25zdGVyLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICBpZih0aGlzLmhlcm9fZGF0YS5nZXRJc1VubG9jayhTa2lsbFR5cGUuUGFzc2l2ZV8yKSYmZGF0YS5nZXREYW1hZ2VOdW0oKT4wJiZkYXRhLmlzX2RpZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fTGVpU2hlbl9DaGFvRnVIZTtcclxuICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NjA7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5CdXJzdDtcclxuICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bNF07XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5hZGRfZmxvb3I9MTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhbWFnZVJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMilcclxuICAgICAgICAgICAgZW5kTW9uc3Rlci5hZGREZUJ1ZmYoYnVmZkRhdGEsdGhpcy5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMixkYW1hZ2VSYXRlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5kTW9uc3RlcihlbmRNb25zdGVyOk1vbnN0ZXIpeyAgICAgICAgXHJcbiAgICAgICAgbGV0IHRhbnNoZU51bT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKSt0aGlzLmhlcm9fbHZsO1xyXG4gICAgICAgIGlmKHRoaXMuc2hhbmRpYW5fbW9uc3Rlci5sZW5ndGg8dGFuc2hlTnVtKXtcclxuICAgICAgICAgICAgbGV0IG5leHRNb25zdGVyPXRoaXMuZ2V0TW9uc3RlcihlbmRNb25zdGVyLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICAgICAgaWYobmV4dE1vbnN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTaGFuRGlhbihlbmRNb25zdGVyLG5leHRNb25zdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRJc1RhblNoZSh1dWlkOnN0cmluZyk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFuZGlhbl9tb25zdGVyLmluZGV4T2YodXVpZCk+PTA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TW9uc3Rlcihwb3M6Y2MuVmVjMik6TW9uc3RlclxyXG4gICAge1xyXG4gICAgICAgIGxldCBlbT1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgaWYoZW0ubm9kZS5jaGlsZHJlbkNvdW50PD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMS7lhYjmo4DmtYvlnKjmlLvlh7vojIPlm7TlhoXnrKblkIjmlLvlh7vljZXkvY3nmoTmlYzkurpcclxuICAgICAgICBsZXQgYXR0TW9uc3RlcnM6TW9uc3RlcltdPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgZW5lbXkgb2YgZW0ubm9kZS5jaGlsZHJlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBlbmVteVRTPWVuZW15LmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgaWYoZW5lbXlUUyAmJiBlbmVteVRTLmdldElzQ2FuQ2hlY2soKT09dHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlPXBvcy5zdWIoZW5lbXlUUy5nZXRDZW50ZXJQb3MoKSkubWFnKCk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldElzVGFuU2hlKGVuZW15VFMudXVpZCk9PWZhbHNlICYmIGRpc3RhbmNlPD01MDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0TW9uc3RlcnMucHVzaChlbmVteVRTKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhdHRNb25zdGVycy5sZW5ndGg8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoMT09YXR0TW9uc3RlcnMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzIuMeS8mOWFiOaUu+WHu+i3n+ebruagh+S9jee9ruacgOi/keeahOWNleS9jVxyXG4gICAgICAgIGF0dE1vbnN0ZXJzLnNvcnQoKGE6TW9uc3RlcixiOk1vbnN0ZXIpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBhLmdldENlbnRlclBvcygpLnN1Yihwb3MpLm1hZygpLWIuZ2V0Q2VudGVyUG9zKCkuc3ViKHBvcykubWFnKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGF0dE1vbnN0ZXJzWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5oqA6IO9LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICB1c2VTa2lsbChwb3M6Y2MuVmVjMik6bnVtYmVyXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKCk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2VsZlh1TGkoKXtcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/pmpDouqtcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpOyAgXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQ9Y2MuZmluZCgnQ2FudmFzL0hlcm9fUm9vdCcpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2goKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcbiAgICB9XHJcbiAgICAvKioz56eS5YaF5Zyo5oiY5Zy65LiK55qE6ZqP5py65L2N572u5Y+s5ZSke+WPguaVsDF96YGT6Zeq55S177yM6Zeq55S15Lya5a+55Y2K5b6EODDlnIblvaLojIPlm7TlhoXnmoTmlYzkurrpgKDmiJB75Y+C5pWwMn0l5Lyk5a6z77yM5bm25pa95Yqg5LiA5bGC4oCc6LaF6LSf6I234oCdICovXHJcbiAgICBzdGFydExhdW5jaCgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XHJcbiAgICAgICAgdGhpcy5ub2RlX3NoYWRvdy5vcGFjaXR5PTA7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5BY3RpdmUsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgICAgIGxldCBudW09dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgbGV0IGppYW5nZT0zL251bTtcclxuICAgICAgICBsZXQgZXgxPXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICBsZXQgZXhGYW53ZWk9MDtcclxuICAgICAgICBpZihleDEmJmV4MT4wKXtcclxuICAgICAgICAgICAgLy/lop7liqDojIPlm7RcclxuICAgICAgICAgICAgZXhGYW53ZWk9ZXgxOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAvLyAgICAgZXhGYW53ZWk9MjAwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxudW07IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zPWNjLnYyKE1hdGgucmFuZG9tKCkqNTUwLTI3NSxNYXRoLnJhbmRvbSgpKjgwMC00MDApO1xyXG4gICAgICAgICAgICAgICAgR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9ncm91bmQscG9zKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9za3kscG9zKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9MTtcclxuICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlKC02LDYsMC4wMTUsNik7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSxwb3MsMTgwKigxK2V4RmFud2VpKSk7XHJcbiAgICAgICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xlaUdvZFNraWxsMik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBuPTA7IG48bW9uc3RlcnMubGVuZ3RoOyBuKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3Rlcj1tb25zdGVyc1tuXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXIuYmVGbGFzaEluanVyZWQoZ2pEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5oZXJvX2RhdGEuZ2V0SXNVbmxvY2soU2tpbGxUeXBlLlBhc3NpdmVfMikmJmRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5pc19kaWU9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19MZWlTaGVuX0NoYW9GdUhlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTYwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5CdXJzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVs0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQuTnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5hZGRfZmxvb3I9MjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGFtYWdlUmF0ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXIuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5QYXNzaXZlXzIsZGFtYWdlUmF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LGkqamlhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVfc2hhZG93Lm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICBzdXBlci5wbGF5U3BpbmVBbmltYXRpb24oJ1NraWxsRW5kJyxmYWxzZSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsbnVsbCxudWxsKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LDMpXHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=