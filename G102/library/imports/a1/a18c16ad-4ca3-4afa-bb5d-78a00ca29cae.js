"use strict";
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