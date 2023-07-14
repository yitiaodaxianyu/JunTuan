
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ZhenDe/ZhenDe.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcWmhlbkRlXFxaaGVuRGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQStEO0FBQy9ELGlFQUE0RDtBQUM1RCx1RUFBb0Y7QUFDcEYsMkRBQXNEO0FBQ3RELHVEQUFrRDtBQUNsRCxvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLDREQUE0RDtBQUM1RCxnRUFBMkQ7QUFDM0QsZ0RBQTJDO0FBQzNDLHlEQUFvRDtBQUVwRCxzREFBcUQ7QUFDckQsd0NBQXVDO0FBQ3ZDLGdDQUEyQjtBQUMzQiw0Q0FBNkg7QUFDN0gseUNBQW9DO0FBRTlCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFJO0lBQXhDO1FBQUEscUVBaVJDO1FBaFJHLFVBQVU7UUFDVixtQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0Qix1QkFBaUIsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQzs7SUE2US9DLENBQUM7SUEzUUcsdUJBQU0sR0FBTjtRQUVJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsU0FBUztRQUNULGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDBCQUEwQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsc0JBQXNC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LCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgSGVyb19UeXBlLCBTaGllbGRUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgWmhlbkRlRGFuIGZyb20gXCIuL1poZW5EZURhblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaaGVuRGUgZXh0ZW5kcyBIZXJvIHtcclxuICAgIC8qKuayu+eWl+iuoeaVsCAqL1xyXG4gICAgemhpbGlhb19qaXNodTpudW1iZXI9MDtcclxuICAgIHpoaWxpYW9fdGltZTpudW1iZXI9MDtcclxuICAgIGN1cl9yZWxlYXNlX3NraWxsOlNraWxsVHlwZT1Ta2lsbFR5cGUuTnVsbDsgXHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hdHRhY2ssMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2F0dGFja19oaXQsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2JlaWRvbmdfc2tpbGwsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2JlaWRvbmdfc2tpbGxfd2FsbCwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzEsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2FjdGl2ZV9za2lsbF8yLDIpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMywyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdCwyKTtcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkR2FtZVdpbkxpc3Rlbih0aGlzLnJlc2V0U2tpbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPWZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnNldFNraWxsVGlwU2l6ZSgxNjgwLDYwMCk7XHJcbiAgICAgICAgdGhpcy56aGlsaWFvX3RpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRTa2lsbCgpe1xyXG4gICAgICAgIHRoaXMuemhpbGlhb19qaXNodT0wO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG5cclxuICAgIGNyZWF0ZVpoZW5EZURhbihpZDpHYW1lRWZmZWN0SWQsamlhbnNoaVBvczpjYy5WZWMyLHNwZWVkOm51bWJlcixkaXI6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxqaWFuc2hpUG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChaaGVuRGVEYW4pLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICB9ICAgXHJcblxyXG5cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRGYW5nWGlhbmdCeVBvcyhlbmVteVBvcyk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfWkRBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaVBvcz10aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWVuZW15UG9zLnN1YihqaWFuc2hpUG9zKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlEaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLFNraWxsVHlwZS5OdWxsKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVaaGVuRGVEYW4oR2FtZUVmZmVjdElkLnpoZW5fZGVfYXR0YWNrLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssZmFuZ3hpYW5nLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgICAgICAgICAgLyoq5qaC546HICovXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTa2lsbDIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1NraWxsMigpe1xyXG4gICAgICAgIGlmKHRoaXMuaGVyb19kYXRhLmdldElzVW5sb2NrKFNraWxsVHlwZS5QYXNzaXZlXzIpKXtcclxuICAgICAgICAgICAgbGV0IHJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMik7XHJcbiAgICAgICAgICAgIGlmKHJhdGUmJk1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0U2tpbGwxKCl7ICAgICAgICBcclxuICAgICAgICBpZihzdXBlci5nZXRIZXJvU3RhdGUoKT09SGVyb19TdGF0ZS5pZGxlJiZzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bik9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJfcmVsZWFzZV9za2lsbD1Ta2lsbFR5cGUuUGFzc2l2ZV8xO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgIGRhdGEubmFtZT1cIlBhc3NpdmUxXCI7XHJcbiAgICAgICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGw9U2tpbGxUeXBlLk51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19aaGVuRGVfSmlhWHVlSmlhblNoYW5nO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSpXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuUGFzc2l2ZV8xKV07XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgLy8gYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU9MTtcclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRCdWZmKGJ1ZmZEYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihIZXJvX1N0YXRlLnNraWxsLFwiUGFzc2l2ZTFcIixmYWxzZSxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwyKCl7XHJcbiAgICAgICAgaWYoc3VwZXIuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuaWRsZSYmc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGw9U2tpbGxUeXBlLlBhc3NpdmVfMjsgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICBkYXRhLm5hbWU9XCJQYXNzaXZlMVwiO1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9yZWxlYXNlX3NraWxsPVNraWxsVHlwZS5OdWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvSWQ9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYW5kSGVyb0lkKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0aGlzLmhlcm9fdHlwZSxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl90ZWFtX2xpc3QpO1xyXG4gICAgICAgICAgICAgICAgaWYoaGVyb0lkIT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMildO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLk51bGw7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGhlcm9JZCkuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nibnmlYhcclxuICAgICAgICAgICAgICAgICAgICBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYmVpZG9uZ19za2lsbCxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChoZXJvSWQpLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlQW5kQW5pbWF0aW9uKEhlcm9fU3RhdGUuc2tpbGwsXCJQYXNzaXZlMVwiLGZhbHNlLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChTa2lsbFR5cGUuUGFzc2l2ZV8yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTa2lsbChza2lsbFR5cGU6U2tpbGxUeXBlKXtcclxuICAgICAgICBzd2l0Y2goc2tpbGxUeXBlKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUuUGFzc2l2ZV8xOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDEoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraWxsVHlwZS5QYXNzaXZlXzI6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMigpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5oqA6IO9LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICBcclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICAvKirlpoLmnpzmnInmjqfliLbmioDog70gKi9cclxuICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfcmVsZWFzZV9za2lsbCE9U2tpbGxUeXBlLk51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2godGhpcy5jdXJfcmVsZWFzZV9za2lsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2VsZlh1TGkocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIC8v6JOE5Yqb5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9aRFNraWxsKTtcclxuICAgIH1cclxuICAgIC8qKuWcqOebruagh+WMuuWfn+eahOW3puWPs+S4pOi+ueWQhOWPrOWUpOS4gOmYteiXpOiUk+WGsuWHu+azou+8jOiXpOiUk+WGsuWHu+azouS8muWQkeWxj+W5leWPpuS4gOerr+a7muWKqO+8jOmAlOS4remAn+W6puS8mumAkOa4kOWKoOW/q++8jOWvueinpueisOWIsOeahOaVjOS6uumAoOaIkHvlj4LmlbAxfSXkvKTlrrPvvIzlubbpgKDmiJB75Y+C5pWwMn3np5LnnKnmmZXmlYjmnpwgKi9cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBzdXBlci5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgLy/kuJPmraZcclxuICAgICAgICBsZXQgZXgxPXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICBsZXQgY2RUPTA7XHJcbiAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgIGNkVD1leDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5YWJ6YCf5LiL5p2lXHJcbiAgICAgICAgbGV0IGxpZ2h0PVNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMSxjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2NDApKTtcclxuICAgICAgICBjYy50d2VlbihsaWdodCkudG8oMC4xKkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0R2FtZVJhdGUoKSx7eTp0aGlzLm5vZGUueSt0aGlzLnh1YW55dW5fcG9zLnl9KS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMSxsaWdodCk7XHJcbiAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2FjdGl2ZV9za2lsbF8yLGxpZ2h0LmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAvL+W3puWPs+S4pOi+ueeahOiLsembhOWKoOeJueaViFxyXG4gICAgICAgICAgICAvL+WmguaenOaYr+WwhOaJi+ebuOmCu+eahOiLsembhO+8jOS4jeWMheaLrOiHquW3sVxyXG4gICAgICAgICAgICBsZXQgdGVhbUxpc3Q9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfdGVhbV9saXN0O1xyXG4gICAgICAgICAgICBsZXQgc2hlc2hvdUluZGV4PXRlYW1MaXN0LmluZGV4T2YodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgYnVmZlZhbHVlPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgICAgICBsZXQgcmVtYWluVGltZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VTbWFsbCgpO1xyXG4gICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/nibnmlYhcclxuICAgICAgICAgICAgICAgIHYucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0luZGV4PXRlYW1MaXN0LmluZGV4T2Yoayk7XHJcbiAgICAgICAgICAgICAgICBpZihzaGVzaG91SW5kZXghPWhlcm9JbmRleCAmJiBNYXRoLmFicyhzaGVzaG91SW5kZXgtaGVyb0luZGV4KTw9MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fWmhlbkRlX0dvbmdzdTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuR2FpbjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMztcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVtidWZmVmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPXJlbWFpblRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5YeP5bCR6Zmk6Ieq5bex5LmL5aSW55qEY2RcclxuICAgICAgICAgICAgICAgIGlmKGNkVD4wJiZ2Lmhlcm9fdHlwZSE9dGhpcy5oZXJvX3R5cGUpeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdi5jaGFuZ2VDRCgtY2RUKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy/miJjovabliqDmiqTnm75cclxuICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZFNoaWVsZCh0aGlzLmhlcm9fdHlwZSxTaGllbGRUeXBlLkFsbCwxMCwwLjEqdGhpcy5oZXJvX2RhdGEudG90YWxfaHAsR2FtZUVmZmVjdElkLnpoZW5fZGVfYmVpZG9uZ19za2lsbF93YWxsKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYWRkU2hpZWxkKHRoaXMuaGVyb190eXBlLFNoaWVsZFR5cGUuQWxsLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpKnRoaXMuaGVyb19kYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuemhpbGlhb19qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy56aGlsaWFvX2ppc2h1Pj10aGlzLnpoaWxpYW9fdGltZSl7XHJcbiAgICAgICAgICAgIHRoaXMuemhpbGlhb19qaXNodT0wO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwxKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==