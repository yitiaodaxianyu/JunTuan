
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcWmhlbkRlXFxaaGVuRGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQStEO0FBQy9ELGlFQUE0RDtBQUM1RCx1RUFBb0Y7QUFDcEYsMkRBQXNEO0FBQ3RELHVEQUFrRDtBQUNsRCxvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLDREQUE0RDtBQUM1RCxnRUFBMkQ7QUFDM0QsZ0RBQTJDO0FBQzNDLHlEQUFvRDtBQUVwRCxzREFBcUQ7QUFDckQsd0NBQXVDO0FBQ3ZDLGdDQUEyQjtBQUMzQiw0Q0FBNkg7QUFDN0gseUNBQW9DO0FBRTlCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW9DLDBCQUFJO0lBQXhDO1FBQUEscUVBa1JDO1FBalJHLFVBQVU7UUFDVixtQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0Qix1QkFBaUIsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQzs7SUE4US9DLENBQUM7SUE1UUcsdUJBQU0sR0FBTjtRQUVJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsU0FBUztRQUNULGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDBCQUEwQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsc0JBQXNC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LGNBQUksR0FrUnZDO2tCQWxSb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgSGVyb19UeXBlLCBTaGllbGRUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgWmhlbkRlRGFuIGZyb20gXCIuL1poZW5EZURhblwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaaGVuRGUgZXh0ZW5kcyBIZXJvIHtcclxuICAgIC8qKuayu+eWl+iuoeaVsCAqL1xyXG4gICAgemhpbGlhb19qaXNodTpudW1iZXI9MDtcclxuICAgIHpoaWxpYW9fdGltZTpudW1iZXI9MDtcclxuICAgIGN1cl9yZWxlYXNlX3NraWxsOlNraWxsVHlwZT1Ta2lsbFR5cGUuTnVsbDsgXHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hdHRhY2ssMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2F0dGFja19oaXQsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2JlaWRvbmdfc2tpbGwsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2JlaWRvbmdfc2tpbGxfd2FsbCwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzEsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2FjdGl2ZV9za2lsbF8yLDIpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMywyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdCwyKTtcclxuICAgICAgICB0aGlzLmlzX0xvYWRMb2FkPXRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEdhbWVXaW5MaXN0ZW4odGhpcy5yZXNldFNraWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuaXNfbmVlZF9jaGVja19kaXN0YW5jZT1mYWxzZTtcclxuICAgICAgICBzdXBlci5zZXRTa2lsbFRpcFNpemUoMTY4MCw2MDApO1xyXG4gICAgICAgIHRoaXMuemhpbGlhb190aW1lPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc2V0U2tpbGwoKXtcclxuICAgICAgICB0aGlzLnpoaWxpYW9famlzaHU9MDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuXHJcbiAgICBjcmVhdGVaaGVuRGVEYW4oaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoWmhlbkRlRGFuKS5pbml0KGlkLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgfSAgIFxyXG5cclxuXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKG1vbnN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0YWNrKGVuZW15Tm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICBsZXQgZmFuZ3hpYW5nPXRoaXMuZ2V0RmFuZ1hpYW5nQnlQb3MoZW5lbXlQb3MpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX1pEQXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSxTa2lsbFR5cGUuTnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlWmhlbkRlRGFuKEdhbWVFZmZlY3RJZC56aGVuX2RlX2F0dGFjayxqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXROb3JtYWxBdHRhY2soKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7XHJcbiAgICAgICAgICAgIC8qKuamgueOhyAqL1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrU2tpbGwyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tTa2lsbDIoKXtcclxuICAgICAgICBpZih0aGlzLmhlcm9fZGF0YS5nZXRJc1VubG9jayhTa2lsbFR5cGUuUGFzc2l2ZV8yKSl7XHJcbiAgICAgICAgICAgIGxldCByYXRlPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzIpO1xyXG4gICAgICAgICAgICBpZihyYXRlJiZNYXRoLnJhbmRvbSgpPHJhdGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydFNraWxsMSgpeyAgICAgICAgXHJcbiAgICAgICAgaWYoc3VwZXIuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuaWRsZSYmc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGw9U2tpbGxUeXBlLlBhc3NpdmVfMTtcclxuICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICBkYXRhLm5hbWU9XCJQYXNzaXZlMVwiO1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9yZWxlYXNlX3NraWxsPVNraWxsVHlwZS5OdWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fWmhlbkRlX0ppYVh1ZUppYW5TaGFuZztcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5HYWluO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMSkqV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmdldE1heEhwKCksdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMSldO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NTtcclxuICAgICAgICAgICAgICAgIC8vIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMTtcclxuICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lPTE7XHJcbiAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYWRkQnVmZihidWZmRGF0YSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGVBbmRBbmltYXRpb24oSGVyb19TdGF0ZS5za2lsbCxcIlBhc3NpdmUxXCIsZmFsc2UsW2RhdGFdLCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKFNraWxsVHlwZS5QYXNzaXZlXzEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNraWxsMigpe1xyXG4gICAgICAgIGlmKHN1cGVyLmdldEhlcm9TdGF0ZSgpPT1IZXJvX1N0YXRlLmlkbGUmJnN1cGVyLmlzSGF2ZURlQnVmZihCdWZmSWQuTW9uc3Rlcl9YdWFuWXVuKT09ZmFsc2Upe1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9yZWxlYXNlX3NraWxsPVNraWxsVHlwZS5QYXNzaXZlXzI7ICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICAgICAgZGF0YS5uYW1lPVwiUGFzc2l2ZTFcIjtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfcmVsZWFzZV9za2lsbD1Ta2lsbFR5cGUuTnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0lkPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmFuZEhlcm9JZChHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGUsdGhpcy5oZXJvX3R5cGUsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfdGVhbV9saXN0KTtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9JZCE9SGVyb19UeXBlLk5VTEwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX1poZW5EZV9CYW9KaU1pbmdaaG9uZ0x2O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5HYWluO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9W3RoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzIpXTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5OdWxsOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChoZXJvSWQpLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v54m55pWIXHJcbiAgICAgICAgICAgICAgICAgICAgU2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2JlaWRvbmdfc2tpbGwsR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoaGVyb0lkKS5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihIZXJvX1N0YXRlLnNraWxsLFwiUGFzc2l2ZTFcIixmYWxzZSxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goU2tpbGxUeXBlLlBhc3NpdmVfMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwoc2tpbGxUeXBlOlNraWxsVHlwZSl7XHJcbiAgICAgICAgc3dpdGNoKHNraWxsVHlwZSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLlBhc3NpdmVfMTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwxKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUuUGFzc2l2ZV8yOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDIoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDvS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgXHJcbiAgICB1c2VTa2lsbChwb3M6Y2MuVmVjMik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgLyoq5aaC5p6c5pyJ5o6n5Yi25oqA6IO9ICovXHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGwhPVNraWxsVHlwZS5OdWxsKXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKHBvczpjYy5WZWMyKXtcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfWkRTa2lsbCk7XHJcbiAgICB9XHJcbiAgICAvKirlnKjnm67moIfljLrln5/nmoTlt6blj7PkuKTovrnlkITlj6zllKTkuIDpmLXol6TolJPlhrLlh7vms6LvvIzol6TolJPlhrLlh7vms6LkvJrlkJHlsY/luZXlj6bkuIDnq6/mu5rliqjvvIzpgJTkuK3pgJ/luqbkvJrpgJDmuJDliqDlv6vvvIzlr7nop6bnorDliLDnmoTmlYzkurrpgKDmiJB75Y+C5pWwMX0l5Lyk5a6z77yM5bm26YCg5oiQe+WPguaVsDJ956eS55yp5pmV5pWI5p6cICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIC8v5LiT5q2mXHJcbiAgICAgICAgbGV0IGV4MT10aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgbGV0IGNkVD0wO1xyXG4gICAgICAgIGlmKGV4MSYmZXgxPjApe1xyXG4gICAgICAgICAgICBjZFQ9ZXgxO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WFiemAn+S4i+adpVxyXG4gICAgICAgIGxldCBsaWdodD1Ta3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzEsY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjQwKSk7XHJcbiAgICAgICAgY2MudHdlZW4obGlnaHQpLnRvKDAuMSpHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkse3k6dGhpcy5ub2RlLnkrdGhpcy54dWFueXVuX3Bvcy55fSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzEsbGlnaHQpO1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMixsaWdodC5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy/lt6blj7PkuKTovrnnmoToi7Hpm4TliqDnibnmlYhcclxuICAgICAgICAgICAgLy/lpoLmnpzmmK/lsITmiYvnm7jpgrvnmoToi7Hpm4TvvIzkuI3ljIXmi6zoh6rlt7FcclxuICAgICAgICAgICAgbGV0IHRlYW1MaXN0PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3RlYW1fbGlzdDtcclxuICAgICAgICAgICAgbGV0IHNoZXNob3VJbmRleD10ZWFtTGlzdC5pbmRleE9mKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZWYWx1ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgbGV0IHJlbWFpblRpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgIC8v54m55pWIXHJcbiAgICAgICAgICAgICAgICB2LnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlcm9JbmRleD10ZWFtTGlzdC5pbmRleE9mKGspO1xyXG4gICAgICAgICAgICAgICAgaWYoc2hlc2hvdUluZGV4IT1oZXJvSW5kZXggJiYgTWF0aC5hYnMoc2hlc2hvdUluZGV4LWhlcm9JbmRleCk8PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX1poZW5EZV9Hb25nc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzM7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bYnVmZlZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT1yZW1haW5UaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHYuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+WHj+WwkemZpOiHquW3seS5i+WklueahGNkXHJcbiAgICAgICAgICAgICAgICBpZihjZFQ+MCYmdi5oZXJvX3R5cGUhPXRoaXMuaGVyb190eXBlKXsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHYuY2hhbmdlQ0QoLWNkVCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5oiY6L2m5Yqg5oqk55u+XHJcbiAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRTaGllbGQodGhpcy5oZXJvX3R5cGUsU2hpZWxkVHlwZS5BbGwsMTAsMC4xKnRoaXMuaGVyb19kYXRhLnRvdGFsX2hwLEdhbWVFZmZlY3RJZC56aGVuX2RlX2JlaWRvbmdfc2tpbGxfd2FsbCk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZFNoaWVsZCh0aGlzLmhlcm9fdHlwZSxTaGllbGRUeXBlLkFsbCx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuQWN0aXZlKSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuQWN0aXZlKSp0aGlzLmhlcm9fZGF0YS50b3RhbF9ocCk7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZShkdDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKGR0KTtcclxuICAgICAgICB0aGlzLnpoaWxpYW9famlzaHUrPWR0O1xyXG4gICAgICAgIGlmKHRoaXMuemhpbGlhb19qaXNodT49dGhpcy56aGlsaWFvX3RpbWUpe1xyXG4gICAgICAgICAgICB0aGlzLnpoaWxpYW9famlzaHU9MDtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsMSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=