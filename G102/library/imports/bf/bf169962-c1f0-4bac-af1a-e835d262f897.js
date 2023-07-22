"use strict";
cc._RF.push(module, 'bf169liwfBLrK8a6DXSYviX', 'ZhenDe');
// Scripts/Hero/Game/ZhenDe/ZhenDe.ts

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
var SkyManager_1 = require("../../../Game/SkyManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var MyTool_1 = require("../../../Tools/MyTool");
var WallManager_1 = require("../../../Wall/WallManager");
var HeroManager_1 = require("../../Data/HeroManager");
var BuffData_1 = require("../BuffData");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var ZhenDeDan_1 = require("./ZhenDeDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ZhenDe = /** @class */ (function (_super) {
    __extends(ZhenDe, _super);
    function ZhenDe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**治疗计数 */
        _this.zhiliao_jishu = 0;
        _this.zhiliao_time = 0;
        _this.cur_release_skill = HeroConfig_1.SkillType.Null;
        return _this;
    }
    ZhenDe.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_attack, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_attack_hit, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_beidong_skill, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_beidong_skill_wall, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_active_skill_1, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_active_skill_2, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_active_skill_3, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, 2);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addGameWinListen(this.resetSkill);
    };
    ZhenDe.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = false;
        _super.prototype.setSkillTipSize.call(this, 1680, 600);
        this.zhiliao_time = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
    };
    ZhenDe.prototype.resetSkill = function () {
        this.zhiliao_jishu = 0;
    };
    ZhenDe.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            if (this.skill_queue.length > 0) {
                this.startSkill(this.skill_queue.shift());
            }
            else {
                //根据上个状态判断需要做什么
                this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
            }
        }
    };
    //---------------------------------------------攻击----------------------------------------------
    ZhenDe.prototype.createZhenDeDan = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(ZhenDeDan_1.default).init(id, speed, dir, gjData);
    };
    ZhenDe.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    ZhenDe.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ZDAttack);
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            _this.createZhenDeDan(GameEffectsManager_1.GameEffectId.zhen_de_attack, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
            /**概率 */
            _this.checkSkill2();
        });
    };
    ZhenDe.prototype.checkSkill2 = function () {
        if (this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2)) {
            var rate = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
            if (rate && Math.random() < rate) {
                this.startSkill2();
            }
        }
    };
    ZhenDe.prototype.startSkill1 = function () {
        var _this = this;
        if (_super.prototype.getHeroState.call(this) == HeroConfig_1.Hero_State.idle && _super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Monster_XuanYun) == false) {
            this.cur_release_skill = HeroConfig_1.SkillType.Passive_1;
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Passive1";
            data.callback = function () {
                _this.cur_release_skill = HeroConfig_1.SkillType.Null;
                _this.gongji_jishu = 0;
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_ZhenDe_JiaXueJianShang;
                buffData.buff_type = HeroConfig_1.BuffType.Gain;
                buffData.buff_value = [_this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1) * WallManager_1.default.getInstance().getMainWall().getMaxHp(), _this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1)];
                buffData.remain_time = 5;
                // buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
                buffData.recovery_jiange_time = 1;
                WallManager_1.default.getInstance().getMainWall().addBuff(buffData);
            };
            _super.prototype.setHeroStateAndAnimation.call(this, HeroConfig_1.Hero_State.skill, "Passive1", false, [data], function () {
                _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
                if (_this.skill_queue.length > 0) {
                    _this.startSkill(_this.skill_queue.shift());
                }
            });
        }
        else {
            this.skill_queue.push(HeroConfig_1.SkillType.Passive_1);
        }
    };
    ZhenDe.prototype.startSkill2 = function () {
        var _this = this;
        if (_super.prototype.getHeroState.call(this) == HeroConfig_1.Hero_State.idle && _super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Monster_XuanYun) == false) {
            this.cur_release_skill = HeroConfig_1.SkillType.Passive_2;
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Passive1";
            data.callback = function () {
                _this.cur_release_skill = HeroConfig_1.SkillType.Null;
                _this.gongji_jishu = 0;
                var heroId = HeroManager_1.HeroManager.getInstance().getRandHeroId(GameManager_1.default.getInstance().cur_game_mode, _this.hero_type, GameManager_1.default.getInstance().cur_team_list);
                if (heroId != HeroConfig_1.Hero_Type.NULL) {
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Hero_ZhenDe_BaoJiMingZhongLv;
                    buffData.buff_type = HeroConfig_1.BuffType.Gain;
                    buffData.buff_value = [_this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_2)];
                    buffData.remain_time = 5;
                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
                    GameManager_1.default.getInstance().all_hero.get(heroId).addBuff(buffData);
                    //特效
                    SkyManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.zhen_de_beidong_skill, GameManager_1.default.getInstance().all_hero.get(heroId).node.getPosition());
                }
            };
            _super.prototype.setHeroStateAndAnimation.call(this, HeroConfig_1.Hero_State.skill, "Passive1", false, [data], function () {
                _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
                if (_this.skill_queue.length > 0) {
                    _this.startSkill(_this.skill_queue.shift());
                }
            });
        }
        else {
            this.skill_queue.push(HeroConfig_1.SkillType.Passive_2);
        }
    };
    ZhenDe.prototype.startSkill = function (skillType) {
        switch (skillType) {
            case HeroConfig_1.SkillType.Passive_1:
                {
                    this.startSkill1();
                }
                break;
            case HeroConfig_1.SkillType.Passive_2:
                {
                    this.startSkill2();
                }
                break;
        }
    };
    //---------------------------------------------技能----------------------------------------------    
    ZhenDe.prototype.useSkill = function (pos) {
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
    ZhenDe.prototype.startSelfXuLi = function (pos) {
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
            if (_this.skill_queue.length > 0) {
                _this.startSkill(_this.skill_queue.shift());
            }
        });
        this.spine.timeScale = Constants_1.JiaSu;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ZDSkill);
    };
    /**在目标区域的左右两边各召唤一阵藤蔓冲击波，藤蔓冲击波会向屏幕另一端滚动，途中速度会逐渐加快，对触碰到的敌人造成{参数1}%伤害，并造成{参数2}秒眩晕效果 */
    ZhenDe.prototype.startLaunch = function (pos) {
        var _this = this;
        _super.prototype.setAttSpineScale.call(this);
        //专武
        var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        var cdT = 0;
        if (ex1 && ex1 > 0) {
            cdT = ex1;
        }
        //光速下来
        var light = SkyManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.zhen_de_active_skill_1, cc.v2(this.node.x, this.node.y + 640));
        cc.tween(light).to(0.1 * GameManager_1.default.getInstance().getGameRate(), { y: this.node.y + this.xuanyun_pos.y }).call(function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.zhen_de_active_skill_1, light);
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.zhen_de_active_skill_2, light.getPosition());
            //左右两边的英雄加特效
            //如果是射手相邻的英雄，不包括自己
            var teamList = GameManager_1.default.getInstance().cur_team_list;
            var sheshouIndex = teamList.indexOf(_this.hero_type);
            var buffValue = _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active);
            var remainTime = _this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active);
            MyTool_1.default.randomSceneShakeSmall();
            WallManager_1.default.getInstance().getMainWall().removeAllDeBuff();
            GameManager_1.default.getInstance().all_hero.forEach(function (v, k) {
                //特效
                v.removeAllDeBuff();
                var heroIndex = teamList.indexOf(k);
                if (sheshouIndex != heroIndex && Math.abs(sheshouIndex - heroIndex) <= 1) {
                    var buffData = new BuffData_1.BuffData();
                    buffData.buff_id = HeroConfig_1.BuffId.Hero_ZhenDe_Gongsu;
                    buffData.buff_type = HeroConfig_1.BuffType.Gain;
                    buffData.game_effect_id = GameEffectsManager_1.GameEffectId.zhen_de_active_skill_3;
                    buffData.buff_value = [buffValue];
                    buffData.remain_time = remainTime;
                    v.addBuff(buffData);
                }
                //减少除自己之外的cd
                if (cdT > 0 && v.hero_type != _this.hero_type) {
                    v.changeCD(-cdT);
                }
            });
            //战车加护盾
            WallManager_1.default.getInstance().getMainWall().addShield(_this.hero_type, HeroConfig_1.ShieldType.All, 10, 0.1 * _this.hero_data.total_hp, GameEffectsManager_1.GameEffectId.zhen_de_beidong_skill_wall);
            // WallManager.getInstance().getMainWall().addShield(this.hero_type,ShieldType.All,this.hero_data.getSkillValue3(SkillType.Active),this.hero_data.getSkillValue3(SkillType.Active)*this.hero_data.total_hp);
        }).start();
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    ZhenDe.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.zhiliao_jishu += dt;
        if (this.zhiliao_jishu >= this.zhiliao_time) {
            this.zhiliao_jishu = 0;
            this.startSkill1();
        }
    };
    ZhenDe = __decorate([
        ccclass
    ], ZhenDe);
    return ZhenDe;
}(Hero_1.default));
exports.default = ZhenDe;

cc._RF.pop();