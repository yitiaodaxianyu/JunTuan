"use strict";
cc._RF.push(module, '2cfccPyu3lKe7+KvJTtpZjP', 'KuangZhanShi');
// Scripts/Hero/Game/KuangZhanShi/KuangZhanShi.ts

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
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var BuffData_1 = require("../BuffData");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var FuTou_1 = require("./FuTou");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KuangZhanShi = /** @class */ (function (_super) {
    __extends(KuangZhanShi, _super);
    function KuangZhanShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.kuangre_num = 0;
        _this.is_skilling = false;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    KuangZhanShi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.kuangzhanshi_attack, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_chuantou, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_hit, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_max, 2);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    };
    KuangZhanShi.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = false;
    };
    KuangZhanShi.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    KuangZhanShi.prototype.starteIdle = function () {
        this.setHeroState(HeroConfig_1.Hero_State.idle, this.cur_fangxiang);
    };
    //---------------------------------------------攻击-------------------------------------------------
    /**暴击时产生100*200锥形范围的溅射效果，受攻击的敌人和被溅射的人额外受到{参数1}%伤害 */
    KuangZhanShi.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    KuangZhanShi.prototype.createFuTou = function (jianshiPos, speed, dir) {
        var isP = false;
        var rate = 0;
        var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        if (ex1 && ex1 > 0) {
            //吸血率
            if (this.isHaveBuff(HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao)) {
                rate = ex1;
            }
        }
        if (this.kuangre_num >= this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1)) {
            isP = true;
            var node = FightingManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_max, jianshiPos);
            var futou = node.getComponent(FuTou_1.default);
            var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, true, HeroConfig_1.SkillType.Passive_1, this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1));
            gjData.hero_data.blood_sucking_rate += rate;
            futou.init(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack_max, speed, dir, gjData);
            futou.initFuTou(this.kuangre_num, isP, 1);
            this.kuangre_num = 0;
        }
        else {
            var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            gjData.hero_data.blood_sucking_rate += rate;
            var node = FightingManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack, jianshiPos);
            var futou = node.getComponent(FuTou_1.default);
            futou.init(GameEffectsManager_1.GameEffectId.kuangzhanshi_attack, speed, dir, gjData);
            futou.initFuTou(this.kuangre_num, isP, 0);
            this.kuangre_num++;
        }
    };
    //获取射击方向
    KuangZhanShi.prototype.getSJFXByPos = function (pos, selfPos) {
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
    KuangZhanShi.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.startAttack(monster);
    };
    KuangZhanShi.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var attName = HeroConfig_1.Hero_State_Name.Attack;
        if (_super.prototype.isHaveBuff.call(this, HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao)) {
            attName = "Attack2";
            this.kuangre_num = this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1);
        }
        this.is_can_gongji = false;
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            //正中心            
            var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            // if(IsDebug){
            //     if(this.isHaveBuff(BuffId.Hero_KuangZhanShi_DaZhao)){
            //         gjData.hero_data.blood_sucking_rate+=0.5;
            //     }                
            // }
            _this.createFuTou(jianshiPos, _this.bullet_speed, jianshiDir);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_KZSAttack);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroStateAndAnimation.call(this, HeroConfig_1.Hero_State.attack, attName, false, [data], function () {
            attName = HeroConfig_1.Hero_State_Name.Idle;
            if (_super.prototype.isHaveBuff.call(_this, HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao)) {
                attName = "Idle2";
            }
            _super.prototype.setHeroStateAndAnimation.call(_this, HeroConfig_1.Hero_State.idle, attName, true);
        });
    };
    KuangZhanShi.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 2;
    };
    KuangZhanShi.prototype.startSelfXuLi = function (pos) {
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
            _super.prototype.setHeroStateAndAnimation.call(_this, HeroConfig_1.Hero_State.idle, "Idle2", true);
        });
        this.spine.timeScale = Constants_1.JiaSu;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_KZSSkill);
    };
    /**蓄力后发射一波箭雨，对半径{参数1}范围内的敌人在3秒内造成15次{参数2}%伤害 */
    KuangZhanShi.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        this.resetGongJiJiShu();
        var buffData = new BuffData_1.BuffData();
        buffData.buff_id = HeroConfig_1.BuffId.Hero_KuangZhanShi_DaZhao;
        buffData.buff_type = HeroConfig_1.BuffType.Gain;
        buffData.buff_value = [this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active)];
        buffData.remain_time = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active);
        var buff = _super.prototype.addBuff.call(this, buffData);
        buff.addDestroyListen(this.onSkillBuffDestory.bind(this));
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    KuangZhanShi.prototype.onSkillBuffDestory = function (buffData) {
        //不能中断攻击
        if (this.getHeroState() == HeroConfig_1.Hero_State.idle) {
            _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    KuangZhanShi = __decorate([
        ccclass
    ], KuangZhanShi);
    return KuangZhanShi;
}(Hero_1.default));
exports.default = KuangZhanShi;

cc._RF.pop();