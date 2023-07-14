
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/MeiMo/MeiMo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTWVpTW9cXE1laU1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUErRDtBQUMvRCxpRUFBNEQ7QUFDNUQsdUVBQW1GO0FBQ25GLDZEQUF3RDtBQUN4RCwyREFBc0Q7QUFFdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUczRCx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUFzRztBQUN0RyxtQ0FBOEI7QUFFeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQUk7SUFBdkM7UUFBQSxxRUF1UEM7UUFyUEcsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsd0JBQWtCLEdBQWtCLElBQUksQ0FBQztRQUN6QyxpQkFBVyxHQUFTLElBQUksQ0FBQzs7SUFtUDdCLENBQUM7SUFsUEQsK0ZBQStGO0lBQzNGLHNCQUFNLEdBQU47UUFFSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLFNBQVM7UUFDVCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsNEJBQTRCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHlCQUF5QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLGlCQUFNLHFC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WUFBQztDQXZQRCxBQXVQQyxDQXZQa0MsY0FBSSxHQXVQdEM7a0JBdlBvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSXNEZWJ1ZywgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IEZ1bGxTY3JlZW5EYW1hZ2UgZnJvbSBcIi4uLy4uL1NraWxsL0Z1bGxTY3JlZW5EYW1hZ2VcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE1laURhbiBmcm9tIFwiLi9NZWlEYW5cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVpTW8gZXh0ZW5kcyBIZXJvIHtcclxuICAgIFxyXG4gICAgYXR0YWNrX251bTpudW1iZXI9MDtcclxuICAgIGZ1bGxfc2NyZWVuX2RhbWFnZTpGdWxsU2NyZWVuRGFtYWdlPW51bGw7XHJcbiAgICBtZWlodW9fbm9kZTpjYy5Ob2RlPW51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg6L29LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX2F0dGFjaywxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLm1laV9tb19hdHRhY2tfaGl0LDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX2JlaWRvbmdfc2tpbGwxX2Jhb3poYSwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLm1laV9tb19iZWlkb25nX3NraWxsMV9nb25nc3UsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5tZWlfbW9fYmVpZG9uZ19za2lsbDJfaGl0LDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfYmFvemhhLDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfZ291bmQsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9oZXJvLDQpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfbW9uc3Rlciw0KTtcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkSGl0TGlzdGVuKHRoaXMub25IaXRNb25zdGVyKTtcclxuICAgICAgICB0aGlzLmFkZExvYWRlZExpc3Rlbih0aGlzLm9uTG9hZEZpbmlzaGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmlzX25lZWRfY2hlY2tfZGlzdGFuY2U9dHJ1ZTtcclxuICAgICAgICBsZXQgemhpamluZz10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKSoyO1xyXG4gICAgICAgIHN1cGVyLnNldFNraWxsVGlwU2l6ZSh6aGlqaW5nLHpoaWppbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZEZpbmlzaGVkKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubWVpaHVvX25vZGUpe1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9oZXJvLHRoaXMubWVpaHVvX25vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWlodW9fbm9kZT1udWxsO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRlSWRsZSgpe1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pS75Ye7LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoq5pq05Ye75pe25Lqn55SfMTAwKjIwMOmUpeW9ouiMg+WbtOeahOa6heWwhOaViOaenO+8jOWPl+aUu+WHu+eahOaVjOS6uuWSjOiiq+a6heWwhOeahOS6uumineWkluWPl+WIsHvlj4LmlbAxfSXkvKTlrrMgKi9cclxuICAgIG9uSGl0TW9uc3RlcihkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsaXNDcml0OmJvb2xlYW4sbW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVNZWlEYW4oaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSk6Y2MuTm9kZXtcclxuICAgICAgICB0aGlzLmF0dGFja19udW0rKztcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxqaWFuc2hpUG9zKTtcclxuICAgICAgICBsZXQgbWQ9bm9kZS5nZXRDb21wb25lbnQoTWVpRGFuKTtcclxuICAgICAgICBtZC5pbml0KGlkLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgICAgIG1kLnNldElzRXhEYW1hZ2UodGhpcyx0aGlzLmF0dGFja19udW0lNT09MCk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluWwhOWHu+aWueWQkVxyXG4gICAgZ2V0U0pGWEJ5UG9zKHBvczpjYy5WZWMyLHNlbGZQb3M6Y2MuVmVjMik6R29uZ0ppX0ZhbmdYaWFuZ1xyXG4gICAge1xyXG4gICAgICAgIC8v5a+55pWM5Lq65Y2V5L2N6L+b6KGM5pa55ZCR5Yik5pat77yM56Gu5a6a5omT5Ye75pa55ZCRXHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1YihzZWxmUG9zKTtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICBsZXQgcmFkaWFuPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICBsZXQgYW5nbGU9MTgwKnJhZGlhbi9NYXRoLlBJO1xyXG4gICAgICAgIGlmKGFuZ2xlPD03NSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT43NSAmJiBhbmdsZTwxMDUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT49MTA1ICYmIGFuZ2xlPD0xODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYW5neGlhbmc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKuavj+asoeaZrumAmuaUu+WHu+aciXvlj4LmlbAxfSXlh6DnjofmlLnkuLrlsITlh7rkuIDms6Lnrq3pm6jvvIznrq3pm6jlkKt75Y+C5pWwMn3mlK/nrq3vvIzmr4/mlK/nrq3pgKDmiJB75Y+C5pWwM30l5Lyk5a6zICovXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICBsZXQgbW9uc3RlclRzPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgIGlmKCFtb25zdGVyVHMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW8pKXtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JOZWFyZXN0KC0xLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLHRoaXMuaGVyb19kYXRhLmdvbmdqaV9mYW53ZWkpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVFRzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXI9bW9uc3RlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7ICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjayhlbmVteU5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz10aGlzLmdldFNKRlhCeVBvcyhlbmVteU5vZGUuZ2V0UG9zaXRpb24oKSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/mraPkuK3lv4MgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaVBvcz10aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWVuZW15UG9zLnN1YihqaWFuc2hpUG9zKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlEaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLHRydWUsU2tpbGxUeXBlLlBhc3NpdmVfMSwxKTtcclxuICAgICAgICAgICAgZ2pEYXRhLmlzX2Nhbl9jcml0PXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVpRGFuKEdhbWVFZmZlY3RJZC5tZWlfbW9fYXR0YWNrLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTU1BdHRhY2spOyAgICBcclxuICAgICAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXROb3JtYWxBdHRhY2soKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxmYW5neGlhbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuW8leeIhuaVjOS6uumZhOWKoCAqL1xyXG4gICAgc3RhcnRCb21iKG1vbnN0ZXJUczpNb25zdGVyKXtcclxuICAgICAgICAvL+mineWklueahOaKgOiDveS8pOWusyAgICAgICAgXHJcbiAgICAgICAgbGV0IG5uPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tZWlfbW9fYmVpZG9uZ19za2lsbDFfYmFvemhhLG1vbnN0ZXJUcy5nZXRDZW50ZXJQb3MoKSk7ICAgICAgICBcclxuICAgICAgICBubi5zY2FsZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKS8xODA7XHJcbiAgICAgICAgbGV0IHplbmdzaGFuZz10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlNChTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAvKirojIPlm7TkvKTlrrPvvIzkuI3ljIXmi6zov5nkuKrmgKogKi9cclxuICAgICAgICBsZXQgbW9uc3RlcnM9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNb25zdGVyc0ZvckNlbnRlclBvcygtMSxtb25zdGVyVHMuZ2V0Q2VudGVyUG9zKCksdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSkpO1xyXG4gICAgICAgIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bW9uc3RlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYobW9uc3RlclRUcy51dWlkIT1tb25zdGVyVHMudXVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ6R2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuUGFzc2l2ZV8xLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyVFRzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfWmhlbmdTaGFuZykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiekdqRGF0YS5oZXJvX2RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSs9emVuZ3NoYW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YT1tb25zdGVyVFRzLmJlRmxhc2hJbmp1cmVkKGJ6R2pEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubWVpX21vX2F0dGFja19oaXQsbW9uc3RlclRUcy5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pS76YCfYnVmZlxyXG4gICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX01laU1vX0dvbmdTdTtcclxuICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuR2FpbjtcclxuICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuUGFzc2l2ZV8xKV07XHJcbiAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NTtcclxuICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQubWVpX21vX2JlaWRvbmdfc2tpbGwxX2dvbmdzdTtcclxuICAgICAgICBidWZmRGF0YS5mYWRlX3RpbWU9MTtcclxuICAgICAgICBzdXBlci5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXNlU2tpbGwocG9zOmNjLlZlYzIpOm51bWJlclxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTZWxmWHVMaShwb3MpO1xyXG4gICAgICAgIH0sdGhpcy5ub2RlKTtcclxuICAgICAgICByZXR1cm4gMjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKHBvczpjYy5WZWMyKXtcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgdGhpcy5tZWlodW9fbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9oZXJvLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLGNjLmZpbmQoXCJDYW52YXMvSGVyb19TaGFkb3dfUm9vdFwiKSk7XHJcbiAgICAgICAgLy9zdGF0ZS5zcGVlZD1KaWFTdTtcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICAgICAgaWYodGhpcy5tZWlodW9fbm9kZSl7XHJcbiAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1laV9tb196aHVkb25nX3NraWxsX2hlcm8sdGhpcy5tZWlodW9fbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1laWh1b19ub2RlPW51bGw7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgIH1cclxuICAgIC8qKuWcqOWNiuW+hHvlj4LmlbAxfeeahOebruagh+WMuuWfn+WGhemAoOaIkHvlj4LmlbAyfSXkvKTlrrPlubbmlr3liqDigJzprYXmg5HigJ3mlYjmnpzvvIzlj5fliLDprYXmg5HnmoTmlYzkurrnp7vpgJ/kvJrpmY3kvY7oh7MzMOS4lOaXoOazleaUu+WHu+WSjOS9v+eUqOaKgOiDve+8iOaOp+WItuWvuUJPU1Pml6DmlYjvvIlcclxuXHJcbiAgICDmraTlpJbprYXprZTkvJrlj5fliLDprYXmg5HnmoTmlYzkurrmlr3liqDmjIHnu6175Y+C5pWwM33np5LnmoTlop7kvKRidWZm77yM6a2F6a2U5a+55YW35pyJ6K+lYnVmZueahOaVjOS6uumineWklumAoOaIkHvlj4LmlbA0feS8pOWusyAqL1xyXG4gICAgc3RhcnRMYXVuY2gocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIHN1cGVyLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICB0aGlzLnJlc2V0R29uZ0ppSmlTaHUoKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIGxldCByYWRpdXM9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEscG9zLHJhZGl1cyk7XHJcbiAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgbGV0IHpzVGltZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICBsZXQgZ291bmQ9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9nb3VuZCxwb3MpO1xyXG4gICAgICAgIGdvdW5kLnNjYWxlPXJhZGl1cy85MDtcclxuICAgICAgICBsZXQgYmFvemhhPUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfYmFvemhhLHBvcyk7XHJcbiAgICAgICAgYmFvemhhLnNjYWxlPXJhZGl1cy85MDtcclxuICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKGdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjAmJmRhdGEuaXNfZGllPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoq6a2F5oORICovXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bztcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT00O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9tb25zdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5WZXJ0aWdvO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5hZGREZUJ1ZmYoYnVmZkRhdGEsZ2pEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAvKirlop7kvKQgKi9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZXhEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4RGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9aaGVuZ1NoYW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4RGF0YS5yZW1haW5fdGltZT16c1RpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRzLmFkZERlQnVmZihleERhdGEsZ2pEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTU1Ta2lsbCk7ICBcclxuICAgIH1cclxufVxyXG4iXX0=