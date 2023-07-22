
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTWVpTW9cXE1laU1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUErRDtBQUMvRCxpRUFBNEQ7QUFDNUQsdUVBQW1GO0FBQ25GLDZEQUF3RDtBQUN4RCwyREFBc0Q7QUFFdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUczRCx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUFzRztBQUN0RyxtQ0FBOEI7QUFFeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQUk7SUFBdkM7UUFBQSxxRUF3UEM7UUF0UEcsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsd0JBQWtCLEdBQWtCLElBQUksQ0FBQztRQUN6QyxpQkFBVyxHQUFTLElBQUksQ0FBQzs7SUFvUDdCLENBQUM7SUFuUEQsK0ZBQStGO0lBQzNGLHNCQUFNLEdBQU47UUFFSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLFNBQVM7UUFDVCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsNEJBQTRCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHlCQUF5QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLGlCQUFNLHFC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QUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0F3UHpCO0lBQUQsWUFBQztDQXhQRCxBQXdQQyxDQXhQa0MsY0FBSSxHQXdQdEM7a0JBeFBvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSXNEZWJ1ZywgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IEZ1bGxTY3JlZW5EYW1hZ2UgZnJvbSBcIi4uLy4uL1NraWxsL0Z1bGxTY3JlZW5EYW1hZ2VcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IE1laURhbiBmcm9tIFwiLi9NZWlEYW5cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVpTW8gZXh0ZW5kcyBIZXJvIHtcclxuICAgIFxyXG4gICAgYXR0YWNrX251bTpudW1iZXI9MDtcclxuICAgIGZ1bGxfc2NyZWVuX2RhbWFnZTpGdWxsU2NyZWVuRGFtYWdlPW51bGw7XHJcbiAgICBtZWlodW9fbm9kZTpjYy5Ob2RlPW51bGw7XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg6L29LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX2F0dGFjaywxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLm1laV9tb19hdHRhY2tfaGl0LDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX2JlaWRvbmdfc2tpbGwxX2Jhb3poYSwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLm1laV9tb19iZWlkb25nX3NraWxsMV9nb25nc3UsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5tZWlfbW9fYmVpZG9uZ19za2lsbDJfaGl0LDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfYmFvemhhLDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfZ291bmQsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9oZXJvLDQpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfbW9uc3Rlciw0KTtcclxuICAgICAgICB0aGlzLmlzX0xvYWRMb2FkPXRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEhpdExpc3Rlbih0aGlzLm9uSGl0TW9uc3Rlcik7XHJcbiAgICAgICAgdGhpcy5hZGRMb2FkZWRMaXN0ZW4odGhpcy5vbkxvYWRGaW5pc2hlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPXRydWU7XHJcbiAgICAgICAgbGV0IHpoaWppbmc9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkqMjtcclxuICAgICAgICBzdXBlci5zZXRTa2lsbFRpcFNpemUoemhpamluZyx6aGlqaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRGaW5pc2hlZCgpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1laWh1b19ub2RlKXtcclxuICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfaGVybyx0aGlzLm1laWh1b19ub2RlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVpaHVvX25vZGU9bnVsbDtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ZUlkbGUoKXtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKuaatOWHu+aXtuS6p+eUnzEwMCoyMDDplKXlvaLojIPlm7TnmoTmuoXlsITmlYjmnpzvvIzlj5fmlLvlh7vnmoTmlYzkurrlkozooqvmuoXlsITnmoTkurrpop3lpJblj5fliLB75Y+C5pWwMX0l5Lyk5a6zICovXHJcbiAgICBvbkhpdE1vbnN0ZXIoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQ3JpdDpib29sZWFuLG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWVpRGFuKGlkOkdhbWVFZmZlY3RJZCxqaWFuc2hpUG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIsZ2pEYXRhOkdvbmdKaURhdGEpOmNjLk5vZGV7XHJcbiAgICAgICAgdGhpcy5hdHRhY2tfbnVtKys7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbGV0IG1kPW5vZGUuZ2V0Q29tcG9uZW50KE1laURhbik7XHJcbiAgICAgICAgbWQuaW5pdChpZCxzcGVlZCxkaXIsZ2pEYXRhKTtcclxuICAgICAgICBtZC5zZXRJc0V4RGFtYWdlKHRoaXMsdGhpcy5hdHRhY2tfbnVtJTU9PTApO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5blsITlh7vmlrnlkJFcclxuICAgIGdldFNKRlhCeVBvcyhwb3M6Y2MuVmVjMixzZWxmUG9zOmNjLlZlYzIpOkdvbmdKaV9GYW5nWGlhbmdcclxuICAgIHtcclxuICAgICAgICAvL+WvueaVjOS6uuWNleS9jei/m+ihjOaWueWQkeWIpOaWre+8jOehruWumuaJk+WHu+aWueWQkVxyXG4gICAgICAgIGxldCBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICBsZXQgb2Zmc2V0UG9zPXBvcy5zdWIoc2VsZlBvcyk7XHJcbiAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgbGV0IHJhZGlhbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgbGV0IGFuZ2xlPTE4MCpyYWRpYW4vTWF0aC5QSTtcclxuICAgICAgICBpZihhbmdsZTw9NzUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy55b3U7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+NzUgJiYgYW5nbGU8MTA1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuemhvbmc7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+PTEwNSAmJiBhbmdsZTw9MTgwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuenVvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFuZ3hpYW5nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKirmr4/mrKHmma7pgJrmlLvlh7vmnIl75Y+C5pWwMX0l5Yeg546H5pS55Li65bCE5Ye65LiA5rOi566t6Zuo77yM566t6Zuo5ZCre+WPguaVsDJ95pSv566t77yM5q+P5pSv566t6YCg5oiQe+WPguaVsDN9JeS8pOWusyAqL1xyXG4gICAgbm9ybWFsQXR0YWNrKG1vbnN0ZXI6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgbGV0IG1vbnN0ZXJUcz1tb25zdGVyLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICBpZighbW9uc3RlclRzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvKSl7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yTmVhcmVzdCgtMSx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSx0aGlzLmhlcm9fZGF0YS5nb25namlfZmFud2VpKTtcclxuICAgICAgICAgICAgaWYobW9uc3RlcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlclRUcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyPW1vbnN0ZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKG1vbnN0ZXIpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRTSkZYQnlQb3MoZW5lbXlOb2RlLmdldFBvc2l0aW9uKCksdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5q2j5Lit5b+DICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCx0cnVlLFNraWxsVHlwZS5QYXNzaXZlXzEsMSk7XHJcbiAgICAgICAgICAgIGdqRGF0YS5pc19jYW5fY3JpdD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1laURhbihHYW1lRWZmZWN0SWQubWVpX21vX2F0dGFjayxqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX01NQXR0YWNrKTsgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfZG91YmxlX2F0dGFjayl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Tm9ybWFsQXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmF0dGFjayxmYW5neGlhbmcsW2RhdGFdLCgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsZmFuZ3hpYW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlvJXniIbmlYzkurrpmYTliqAgKi9cclxuICAgIHN0YXJ0Qm9tYihtb25zdGVyVHM6TW9uc3Rlcil7XHJcbiAgICAgICAgLy/pop3lpJbnmoTmioDog73kvKTlrrMgICAgICAgIFxyXG4gICAgICAgIGxldCBubj1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubWVpX21vX2JlaWRvbmdfc2tpbGwxX2Jhb3poYSxtb25zdGVyVHMuZ2V0Q2VudGVyUG9zKCkpOyAgICAgICAgXHJcbiAgICAgICAgbm4uc2NhbGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkvMTgwO1xyXG4gICAgICAgIGxldCB6ZW5nc2hhbmc9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTQoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgLyoq6IyD5Zu05Lyk5a6z77yM5LiN5YyF5ous6L+Z5Liq5oCqICovXHJcbiAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEsbW9uc3RlclRzLmdldENlbnRlclBvcygpLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzEpKTtcclxuICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUVHMudXVpZCE9bW9uc3RlclRzLnV1aWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiekdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlclRUcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX1poZW5nU2hhbmcpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnpHakRhdGEuaGVyb19kYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UrPXplbmdzaGFuZztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRUcy5iZUZsYXNoSW5qdXJlZChiekdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1laV9tb19hdHRhY2tfaGl0LG1vbnN0ZXJUVHMuZ2V0Q2VudGVyUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUu+mAn2J1ZmZcclxuICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19NZWlNb19Hb25nU3U7XHJcbiAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMSldO1xyXG4gICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLm1laV9tb19iZWlkb25nX3NraWxsMV9nb25nc3U7XHJcbiAgICAgICAgYnVmZkRhdGEuZmFkZV90aW1lPTE7XHJcbiAgICAgICAgc3VwZXIuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIDI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaShwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgLy/ok4TlipvluKfnm5HlkKxcclxuICAgICAgICBsZXQgaGVyb1Jvb3Q9Y2MuZmluZCgnQ2FudmFzL0hlcm9fUm9vdCcpO1xyXG4gICAgICAgIHRoaXMubWVpaHVvX25vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfaGVybyx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSxjYy5maW5kKFwiQ2FudmFzL0hlcm9fU2hhZG93X1Jvb3RcIikpO1xyXG4gICAgICAgIC8vc3RhdGUuc3BlZWQ9SmlhU3U7XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubWVpaHVvX25vZGUpe1xyXG4gICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tZWlfbW9femh1ZG9uZ19za2lsbF9oZXJvLHRoaXMubWVpaHVvX25vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWlodW9fbm9kZT1udWxsO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcbiAgICB9XHJcbiAgICAvKirlnKjljYrlvoR75Y+C5pWwMX3nmoTnm67moIfljLrln5/lhoXpgKDmiJB75Y+C5pWwMn0l5Lyk5a6z5bm25pa95Yqg4oCc6a2F5oOR4oCd5pWI5p6c77yM5Y+X5Yiw6a2F5oOR55qE5pWM5Lq656e76YCf5Lya6ZmN5L2O6IezMzDkuJTml6Dms5XmlLvlh7vlkozkvb/nlKjmioDog73vvIjmjqfliLblr7lCT1NT5peg5pWI77yJXHJcblxyXG4gICAg5q2k5aSW6a2F6a2U5Lya5Y+X5Yiw6a2F5oOR55qE5pWM5Lq65pa95Yqg5oyB57ute+WPguaVsDN956eS55qE5aKe5LykYnVmZu+8jOmthemtlOWvueWFt+acieivpWJ1ZmbnmoTmlYzkurrpop3lpJbpgKDmiJB75Y+C5pWwNH3kvKTlrrMgKi9cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBzdXBlci5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBsZXQgcmFkaXVzPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLHBvcyxyYWRpdXMpO1xyXG4gICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5BY3RpdmUsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgICAgIGxldCB6c1RpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgbGV0IGdvdW5kPUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfZ291bmQscG9zKTtcclxuICAgICAgICBnb3VuZC5zY2FsZT1yYWRpdXMvOTA7XHJcbiAgICAgICAgbGV0IGJhb3poYT1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1laV9tb196aHVkb25nX3NraWxsX2Jhb3poYSxwb3MpO1xyXG4gICAgICAgIGJhb3poYS5zY2FsZT1yYWRpdXMvOTA7XHJcbiAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUcy5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wJiZkYXRhLmlzX2RpZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIC8qKumtheaDkSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW87XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NDtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQubWVpX21vX3podWRvbmdfc2tpbGxfbW9uc3RlcjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLGdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoq5aKe5LykICovXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4RGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBleERhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfWmhlbmdTaGFuZztcclxuICAgICAgICAgICAgICAgICAgICBleERhdGEucmVtYWluX3RpbWU9enNUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5hZGREZUJ1ZmYoZXhEYXRhLGdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX01NU2tpbGwpOyAgXHJcbiAgICB9XHJcbn1cclxuIl19