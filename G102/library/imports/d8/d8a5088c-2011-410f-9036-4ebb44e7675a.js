"use strict";
cc._RF.push(module, 'd8a50iMIBFBD5A2TrtE52da', 'MeiMo');
// Scripts/Hero/Game/MeiMo/MeiMo.ts

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
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var BuffData_1 = require("../BuffData");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var MeiDan_1 = require("./MeiDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MeiMo = /** @class */ (function (_super) {
    __extends(MeiMo, _super);
    function MeiMo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attack_num = 0;
        _this.full_screen_damage = null;
        _this.meihuo_node = null;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    MeiMo.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_attack, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_attack_hit, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_beidong_skill1_baozha, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_beidong_skill1_gongsu, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_beidong_skill2_hit, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_baozha, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_gound, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_hero, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_monster, 4);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addLoadedListen(this.onLoadFinished);
    };
    MeiMo.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = true;
        var zhijing = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active) * 2;
        _super.prototype.setSkillTipSize.call(this, zhijing, zhijing);
    };
    MeiMo.prototype.onLoadFinished = function () {
    };
    MeiMo.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
            if (this.meihuo_node) {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_hero, this.meihuo_node);
                this.meihuo_node = null;
            }
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    MeiMo.prototype.starteIdle = function () {
        this.setHeroState(HeroConfig_1.Hero_State.idle, this.cur_fangxiang);
    };
    //---------------------------------------------攻击-------------------------------------------------
    /**暴击时产生100*200锥形范围的溅射效果，受攻击的敌人和被溅射的人额外受到{参数1}%伤害 */
    MeiMo.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    MeiMo.prototype.createMeiDan = function (id, jianshiPos, speed, dir, gjData) {
        this.attack_num++;
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        var md = node.getComponent(MeiDan_1.default);
        md.init(id, speed, dir, gjData);
        md.setIsExDamage(this, this.attack_num % 5 == 0);
        return node;
    };
    //获取射击方向
    MeiMo.prototype.getSJFXByPos = function (pos, selfPos) {
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
    MeiMo.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var monsterTs = monster.getComponent(Monster_1.default);
        if (!monsterTs.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
            var monsters = MonsterManager_1.default.getInstance().getMonstersForNearest(-1, this.node.getPosition(), this.hero_data.gongji_fanwei);
            if (monsters) {
                for (var i = 0; i < monsters.length; i++) {
                    var monsterTTs = monsters[i].getComponent(Monster_1.default);
                    if (monsterTTs.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
                        monster = monsters[i];
                        break;
                    }
                }
            }
        }
        this.startAttack(monster);
    };
    MeiMo.prototype.startAttack = function (enemyNode) {
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
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Skill, true, HeroConfig_1.SkillType.Passive_1, 1);
            gjData.is_can_crit = true;
            _this.createMeiDan(GameEffectsManager_1.GameEffectId.mei_mo_attack, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_MMAttack);
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
    /**引爆敌人附加 */
    MeiMo.prototype.startBomb = function (monsterTs) {
        //额外的技能伤害        
        var nn = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_beidong_skill1_baozha, monsterTs.getCenterPos());
        nn.scale = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active) / 180;
        var zengshang = this.hero_data.getSkillValue4(HeroConfig_1.SkillType.Active);
        /**范围伤害，不包括这个怪 */
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTs.getCenterPos(), this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1));
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTTs = monsters[i].getComponent(Monster_1.default);
                if (monsterTTs.uuid != monsterTs.uuid) {
                    var bzGjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_1, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1));
                    if (monsterTTs.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_ZhengShang)) {
                        bzGjData.hero_data.all_increase_damage += zengshang;
                    }
                    var data = monsterTTs.beFlashInjured(bzGjData);
                    if (data.getDamageNum() > 0) {
                        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_attack_hit, monsterTTs.getCenterPos());
                    }
                }
            }
        }
        //攻速buff
        var buffData = new BuffData_1.BuffData();
        buffData.buff_id = HeroConfig_1.BuffId.Hero_MeiMo_GongSu;
        buffData.buff_type = HeroConfig_1.BuffType.Gain;
        buffData.buff_value = [this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1)];
        buffData.remain_time = 5;
        buffData.game_effect_id = GameEffectsManager_1.GameEffectId.mei_mo_beidong_skill1_gongsu;
        buffData.fade_time = 1;
        _super.prototype.addBuff.call(this, buffData);
    };
    MeiMo.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 2;
    };
    MeiMo.prototype.startSelfXuLi = function (pos) {
        var _this = this;
        //蓄力帧监听
        var heroRoot = cc.find('Canvas/Hero_Root');
        this.meihuo_node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_hero, this.node.getPosition(), cc.find("Canvas/Hero_Shadow_Root"));
        //state.speed=JiaSu;
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
            if (_this.meihuo_node) {
                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_hero, _this.meihuo_node);
                _this.meihuo_node = null;
            }
        });
        this.spine.timeScale = Constants_1.JiaSu;
    };
    /**在半径{参数1}的目标区域内造成{参数2}%伤害并施加“魅惑”效果，受到魅惑的敌人移速会降低至30且无法攻击和使用技能（控制对BOSS无效）

    此外魅魔会受到魅惑的敌人施加持续{参数3}秒的增伤buff，魅魔对具有该buff的敌人额外造成{参数4}伤害 */
    MeiMo.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        this.resetGongJiJiShu();
        SkillManager_1.default.getInstance().setIsSkillState(false);
        var radius = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, pos, radius);
        var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
        var zsTime = this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active);
        var gound = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_gound, pos);
        gound.scale = radius / 90;
        var baozha = GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_baozha, pos);
        baozha.scale = radius / 90;
        if (monsters) {
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                var data = monsterTs.beFlashInjured(gjData);
                if (data.getDamageNum() > 0 && data.is_die == false) {
                    /**魅惑 */
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo;
                    buffData.remain_time = 4;
                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.mei_mo_zhudong_skill_monster;
                    buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                    monsterTs.addDeBuff(buffData, gjData);
                    /**增伤 */
                    var exData = new BuffData_1.BuffData();
                    exData.buff_id = HeroConfig_1.BuffId.Hero_MeiMo_Active_ZhengShang;
                    exData.remain_time = zsTime;
                    monsterTs.addDeBuff(exData, gjData);
                }
            }
        }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_MMSkill);
    };
    MeiMo = __decorate([
        ccclass
    ], MeiMo);
    return MeiMo;
}(Hero_1.default));
exports.default = MeiMo;

cc._RF.pop();