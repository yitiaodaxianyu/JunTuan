"use strict";
cc._RF.push(module, '3d485dXvIlOqpCwC1ASUTa0', 'ANuBiSi');
// Scripts/Hero/Game/ANuBiSi/ANuBiSi.ts

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
var FightingManager_1 = require("../../../Game/FightingManager");
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GroundManager_1 = require("../../../Game/GroundManager");
var SkillManager_1 = require("../../../Game/SkillManager");
var SkyManager_1 = require("../../../Game/SkyManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var FullScreenDamage_1 = require("../../Skill/FullScreenDamage");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var KuangSha_1 = require("./KuangSha");
var ShaChenBao_1 = require("./ShaChenBao");
var ShaDan_1 = require("./ShaDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ANuBiSi = /** @class */ (function (_super) {
    __extends(ANuBiSi, _super);
    function ANuBiSi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_beidong_2 = null;
        _this.full_screen_damage = null;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    ANuBiSi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.a_nu_bi_si_attack, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.a_nu_bi_si_attack_hit, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.a_nu_bi_si_beidong_skill_1, 1);
        //super.addLoadByGameEffectId(GameEffectId.a_nu_bi_si_beidong_skill_2,1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_1, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_wind, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_line, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_ring, 2);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    };
    ANuBiSi.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = true;
        var zhijing = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active) * 2;
        _super.prototype.setSkillTipSize.call(this, zhijing, zhijing);
        if (this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2)) {
            this.createFullScreenDamage();
        }
    };
    ANuBiSi.prototype.createFullScreenDamage = function () {
        var node = cc.instantiate(this.prefab_beidong_2);
        cc.find("Canvas/Hero_Shadow_Root").addChild(node);
        node.setPosition(this.node.getPosition());
        this.full_screen_damage = node.getComponent(FullScreenDamage_1.default);
        this.full_screen_damage.init(GameEffectsManager_1.GameEffectId.a_nu_bi_si_beidong_skill_2, 1, this.onSkillDamage2.bind(this));
    };
    ANuBiSi.prototype.onSkillDamage2 = function () {
        var allMonsterS = MonsterManager_1.default.getInstance().node.children;
        var len = allMonsterS.length;
        for (var i = 0; i < len; i++) {
            var monster = allMonsterS[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS) {
                if (monsterTS.isHaveDeBuffType(HeroConfig_1.BuffType.Slowdown) || monsterTS.isHaveDeBuffType(HeroConfig_1.BuffType.Vertigo)) {
                    monsterTS.beFlashInjured(_super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2)));
                }
            }
        }
    };
    ANuBiSi.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    ANuBiSi.prototype.starteIdle = function () {
        this.setHeroState(HeroConfig_1.Hero_State.idle, this.cur_fangxiang);
    };
    //---------------------------------------------攻击-------------------------------------------------
    /**暴击时产生100*200锥形范围的溅射效果，受攻击的敌人和被溅射的人额外受到{参数1}%伤害 */
    ANuBiSi.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    ANuBiSi.prototype.createShaDan = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(ShaDan_1.default).init(id, speed, dir, gjData);
        return node;
    };
    //获取射击方向
    ANuBiSi.prototype.getSJFXByPos = function (pos, selfPos) {
        //对敌人单位进行方向判断，确定打击方向
        var fangxiang = HeroConfig_1.GongJi_FangXiang.zhong;
        var offsetPos = pos.sub(selfPos);
        var pi2 = Math.PI * 2;
        var radian = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
        var angle = 180 * radian / Math.PI;
        if (angle <= 75) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.you;
        }
        else if (angle > 75 && angle < 105) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.zhong;
        }
        else if (angle >= 105 && angle <= 180) {
            fangxiang = HeroConfig_1.GongJi_FangXiang.zuo;
        }
        return fangxiang;
    };
    /**每次普通攻击有{参数1}%几率改为射出一波箭雨，箭雨含{参数2}支箭，每支箭造成{参数3}%伤害 */
    ANuBiSi.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.startAttack(monster);
    };
    ANuBiSi.prototype.startAttack = function (enemyNode) {
        var _this = this;
        this.is_can_gongji = false;
        var fangxiang = this.getSJFXByPos(enemyNode.getPosition(), this.node.getPosition());
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            //正中心            
            var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            _this.createShaDan(GameEffectsManager_1.GameEffectId.a_nu_bi_si_attack, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ANBSAttack);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _super.prototype.setHeroState.call(_this, HeroConfig_1.Hero_State.idle, fangxiang);
        });
    };
    ANuBiSi.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 2;
    };
    ANuBiSi.prototype.startSelfXuLi = function (pos) {
        var _this = this;
        //蓄力帧监听
        var heroRoot = cc.find('Canvas/Hero_Root');
        //发射帧监听
        var fasheData = new MonsterData_1.KeyFrameData();
        fasheData.name = "FaShe";
        fasheData.callback = function () {
            //可以发射
            SkillManager_1.default.getInstance().setTimeStop(false);
            _this.node.parent = heroRoot;
            _this.node.zIndex = 2;
            _this.startLaunch(pos);
        };
        //英雄动作播放
        this.setHeroState(HeroConfig_1.Hero_State.skill, HeroConfig_1.GongJi_FangXiang.zhong, [fasheData], function () {
            //动作完毕后状态还是技能状态，动画要播放待机的
            _this.resetGongJiJiShu();
            _this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        });
        this.spine.timeScale = Constants_1.JiaSu;
    };
    /**蓄力后发射一波箭雨，对半径{参数1}范围内的敌人在3秒内造成15次{参数2}%伤害 */
    ANuBiSi.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        this.resetGongJiJiShu();
        //创建沙尘暴
        var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        var exTime = 0;
        if (ex1 && ex1 > 0) {
            //增加范围
            exTime = ex1;
        }
        // if(IsDebug){
        //     exTime=10;
        // }
        var node = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_1, pos);
        node.getComponent(ShaChenBao_1.default).init(_super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active)), 5 + exTime, 1, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active));
        SkillManager_1.default.getInstance().setIsSkillState(false);
        //狂沙
        var wind = SkyManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.a_nu_bi_si_active_skill_wind, cc.v2(0, -cc.winSize.height / 2));
        wind.getComponent(KuangSha_1.default).init(5 + exTime, this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active));
    };
    __decorate([
        property(cc.Prefab)
    ], ANuBiSi.prototype, "prefab_beidong_2", void 0);
    ANuBiSi = __decorate([
        ccclass
    ], ANuBiSi);
    return ANuBiSi;
}(Hero_1.default));
exports.default = ANuBiSi;

cc._RF.pop();