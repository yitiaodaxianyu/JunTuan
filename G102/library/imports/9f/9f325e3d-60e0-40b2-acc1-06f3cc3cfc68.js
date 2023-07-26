"use strict";
cc._RF.push(module, '9f32549YOBAsqzBBvPMPPxo', 'NvWu');
// Scripts/Hero/Game/NvWu/NvWu.ts

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
var BuffData_1 = require("../BuffData");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var NvWuDan_1 = require("./NvWuDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NvWu = /** @class */ (function (_super) {
    __extends(NvWu, _super);
    function NvWu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**治疗计数 */
        _this.zhiliao_jishu = 0;
        _this.zhiliao_time = 0;
        _this.cur_release_skill = HeroConfig_1.SkillType.Null;
        return _this;
    }
    NvWu.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.nvwu_attack_bullect, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.nvwu_active_skill, 1);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addGameWinListen(this.resetSkill);
    };
    NvWu.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = false;
        _super.prototype.setSkillTipSize.call(this, 520, 520);
        this.zhiliao_time = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
    };
    NvWu.prototype.resetSkill = function () {
        this.zhiliao_jishu = 0;
    };
    NvWu.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击----------------------------------------------
    NvWu.prototype.createNvWuDan = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(NvWuDan_1.default).hero_lvl = this.hero_lvl;
        node.getComponent(NvWuDan_1.default).init(id, speed, dir, gjData);
    };
    NvWu.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    NvWu.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_NWAttack);
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            _this.createNvWuDan(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
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
    //---------------------------------------------技能----------------------------------------------    
    NvWu.prototype.useSkill = function (pos) {
        var _this = this;
        /**如果有控制技能 */
        this.removeAllDeBuff();
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        if (this.cur_release_skill != HeroConfig_1.SkillType.Null) {
            this.skill_queue.push(this.cur_release_skill);
        }
        return 0;
    };
    NvWu.prototype.startSelfXuLi = function (pos) {
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
    /**对260半径范围内的敌人造成{参数1}%伤害并施加{参数2}层中毒和{参数3}%的重伤效果，持续5秒 */
    NvWu.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, pos, 260);
        if (monsters) {
            //伤害系数
            var damageData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active));
            //重伤值
            var zsValue = this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active);
            //减攻速
            var exGs = 0;
            var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
            if (ex1 && ex1 > 0) {
                exGs = ex1;
            }
            //毒数据
            var duData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, 0, this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1));
            duData.continuous_damage_rate = this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1);
            ;
            for (var i = 0; i < monsters.length; i++) {
                var monsterTTs = monsters[i].getComponent(Monster_1.default);
                //立即造成参数2伤害
                var data = monsterTTs.beFlashInjured(damageData);
                if (data.getDamageNum() > 0) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, monsterTTs.getCenterPos());
                    if (!data.is_die) {
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_Skill1_Zhongdu;
                        buffData.buff_type = HeroConfig_1.BuffType.Normal;
                        buffData.remain_time = 5;
                        buffData.add_floor = this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active);
                        buffData.max_floor = 6;
                        buffData.damage_jiange_time = 1;
                        monsterTTs.addDeBuff(buffData, duData);
                        //重伤buff
                        var zsData = new BuffData_1.BuffData();
                        zsData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_Skill1_ZhongShang;
                        zsData.buff_type = HeroConfig_1.BuffType.SeriouslyInjured;
                        zsData.remain_time = 5;
                        zsData.buff_value = [zsValue];
                        monsterTTs.addDeBuff(zsData, null);
                        if (exGs > 0) {
                            //专武的减攻速
                            var gsData = new BuffData_1.BuffData();
                            gsData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_ExSkill_JianGongSu;
                            gsData.buff_type = HeroConfig_1.BuffType.Normal;
                            gsData.remain_time = 5;
                            gsData.buff_value = [exGs];
                            monsterTTs.addDeBuff(gsData, null);
                        }
                    }
                }
            }
        }
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_active_skill, pos);
        node.scale = 3;
        SkillManager_1.default.getInstance().setIsSkillState(false);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_NWSkill);
    };
    NvWu = __decorate([
        ccclass
    ], NvWu);
    return NvWu;
}(Hero_1.default));
exports.default = NvWu;

cc._RF.pop();