"use strict";
cc._RF.push(module, '28dabfmgFVK+K7MEWtJEH+a', 'ShouWang');
// Scripts/Hero/Game/ShouWang/ShouWang.ts

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
var Bear_1 = require("./Bear");
var ShouWangJianShi_1 = require("./ShouWangJianShi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShouWang = /** @class */ (function (_super) {
    __extends(ShouWang, _super);
    function ShouWang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.att_num = 0;
        _this.prefab_bear = null;
        _this.all_bear = null;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    ShouWang.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.shou_wang_jianshi_attack, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.shou_wang_jianshi_skill1, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.sheshou_jianshi_att_hit, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.shou_wang_jianshi_skill1_hit, 8);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.xuanyun, 8);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addGameWinListen(this.removeAllBear);
        this.all_bear = new Map();
    };
    ShouWang.prototype.removeAllBear = function () {
        //删掉熊
        this.all_bear.forEach(function (v, k) {
            v.startDestory();
        });
    };
    ShouWang.prototype.onBearDestory = function (id) {
        this.all_bear.delete(id);
    };
    ShouWang.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = true;
        _super.prototype.setSkillTipSize.call(this, 300, 300);
    };
    ShouWang.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    ShouWang.prototype.starteIdle = function () {
        this.setHeroState(HeroConfig_1.Hero_State.idle, this.cur_fangxiang);
    };
    //---------------------------------------------攻击-------------------------------------------------
    ShouWang.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    ShouWang.prototype.createJianShi = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(ShouWangJianShi_1.default).hero_lvl = this.hero_lvl;
        node.getComponent(ShouWangJianShi_1.default).init(id, speed, dir, gjData);
        return node;
    };
    //获取射击方向
    ShouWang.prototype.getSJFXByPos = function (pos, selfPos) {
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
    ShouWang.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        var enemyPos = monster.getComponent(Monster_1.default).getSheShouPos();
        if (this.checkSkill1(enemyPos) == false) {
            this.startAttack(monster);
        }
    };
    ShouWang.prototype.startAttack = function (enemyNode) {
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
            _this.createJianShi(GameEffectsManager_1.GameEffectId.shou_wang_jianshi_attack, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_GongjianshouAttack);
            _this.att_num++;
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
    /**被动技能1触发判断 */
    ShouWang.prototype.checkSkill1 = function (pos) {
        var _this = this;
        var fangxiang = this.getSJFXByPos(pos, this.node.getPosition());
        //if(this.att_num>=3)
        if (this.att_num >= 0) {
            this.is_can_gongji = false;
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Attack";
            data.callback = function () {
                _this.gongji_jishu = 0;
                var jianshiPos = _super.prototype.getCreateBulletPos.call(_this);
                var offsetPos = pos.sub(jianshiPos);
                var pi2 = Math.PI * 2;
                //中心方向
                var radian = (Math.atan2(offsetPos.y, offsetPos.x) + pi2) % pi2;
                var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Skill, true, HeroConfig_1.SkillType.Passive_1, _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1));
                _this.createJianShi(GameEffectsManager_1.GameEffectId.shou_wang_jianshi_skill1, jianshiPos, _this.bullet_speed * 1.25, radian, gjData);
                _this.att_num = 0;
            };
            _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
                _super.prototype.setHeroState.call(_this, HeroConfig_1.Hero_State.idle, fangxiang);
            });
            return true;
        }
        return false;
    };
    ShouWang.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 2;
    };
    ShouWang.prototype.startSelfXuLi = function (pos) {
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
    /**
     * 召唤一只持续{参数1}秒的巨熊，对150半径范围内造成{参数2}%伤害和1秒眩晕效果，巨熊的移动速度为80、攻速为2.0，会持续对离自身最近的敌人进行攻击，每次攻击造成{参数3}%伤害
     */
    ShouWang.prototype.startLaunch = function (pos) {
        var sheshouEx1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        var aoe = 0;
        if (sheshouEx1 && sheshouEx1 > 0) {
            //熊的范围攻击
            aoe = sheshouEx1;
        }
        // if(IsDebug){
        //     aoe=100;
        // }
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ShouWangSkill1);
        _super.prototype.setAttSpineScale.call(this);
        var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active));
        var bear = cc.instantiate(this.prefab_bear);
        MonsterManager_1.default.getInstance().node.addChild(bear);
        bear.setPosition(pos);
        var bearTs = bear.getComponent(Bear_1.default);
        bearTs.init(gjData, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active), this.use_skill_num, aoe);
        bearTs.addDestoryListen(this.onBearDestory.bind(this));
        this.all_bear.set(this.use_skill_num, bearTs);
        //圆形眩晕
        MyTool_1.default.randomSceneShake(-5, 5, 0.02, 6);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, pos, 150);
        if (monsters) {
            var fanweiData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
            for (var i = 0; i < monsters.length; i++) {
                var monsterTs = monsters[i].getComponent(Monster_1.default);
                var data = monsterTs.beFlashInjured(fanweiData);
                if (!data.is_die && data.getDamageNum() > 0) {
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                    buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                    buffData.buff_value = [0];
                    buffData.remain_time = 1;
                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                    monsterTs.addDeBuff(buffData, fanweiData);
                }
            }
        }
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    __decorate([
        property(cc.Prefab)
    ], ShouWang.prototype, "prefab_bear", void 0);
    ShouWang = __decorate([
        ccclass
    ], ShouWang);
    return ShouWang;
}(Hero_1.default));
exports.default = ShouWang;

cc._RF.pop();