
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ShouWang/ShouWang.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        // let enemyPos=monster.getComponent(Monster).getSheShouPos();
        // if(this.checkSkill1(enemyPos)==false){
        //     this.startAttack(monster);
        // }
        this.checkSkill1();
    };
    ShouWang.prototype.startAttack = function (enemyNode) {
        var _this = this;
        this.is_can_gongji = false;
        var fangxiang = HeroConfig_1.GongJi_FangXiang.you;
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
        if (pos === void 0) { pos = null; }
        var fangxiang = HeroConfig_1.GongJi_FangXiang.you;
        //if(this.att_num>=3)
        if (this.att_num >= 0) {
            this.is_can_gongji = false;
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Attack";
            data.callback = function () {
                _this.gongji_jishu = 0;
                var jianshiPos = _super.prototype.getCreateBulletPos.call(_this);
                var offsetPos = cc.v2(0, 10);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hvdVdhbmdcXFNob3VXYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUErRDtBQUMvRCxpRUFBNEQ7QUFDNUQsdUVBQWdFO0FBQ2hFLDJEQUFzRDtBQUN0RCxvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLDREQUE0RDtBQUM1RCxrRUFBNkQ7QUFDN0QsZ0VBQTJEO0FBQzNELGdEQUEyQztBQUUzQyx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUFvSDtBQUNwSCwrQkFBMEI7QUFDMUIscURBQWdEO0FBRTFDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFJO0lBQTFDO1FBQUEscUVBcU9DO1FBbk9HLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFFakIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsY0FBUSxHQUFrQixJQUFJLENBQUM7O0lBZ09uQyxDQUFDO0lBOU5ELCtGQUErRjtJQUMzRix5QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx3QkFBd0IsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHdCQUF3QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FB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LG1CQUFNLENBQUMsWUFBWSxDQUFDO29CQUNyQyxRQUFRLENBQUMsU0FBUyxHQUFDLHFCQUFRLENBQUMsT0FBTyxDQUFDO29CQUNwQyxRQUFRLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLFFBQVEsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO29CQUN2QixRQUFRLENBQUMsY0FBYyxHQUFDLGlDQUFZLENBQUMsT0FBTyxDQUFDO29CQUM3QyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQztpQkFDNUM7YUFDSjtTQUNKO1FBQ0Qsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQS9ORDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNPO0lBSlYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXFPNUI7SUFBRCxlQUFDO0NBck9ELEFBcU9DLENBck9xQyxjQUFJLEdBcU96QztrQkFyT29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlLCBJc0RlYnVnLCBKaWFTdSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi9IZXJvXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fU3RhdGUsIFNraWxsVGlwVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEJlYXIgZnJvbSBcIi4vQmVhclwiO1xyXG5pbXBvcnQgU2hvdVdhbmdKaWFuU2hpIGZyb20gXCIuL1Nob3VXYW5nSmlhblNoaVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG91V2FuZyBleHRlbmRzIEhlcm8ge1xyXG4gICAgXHJcbiAgICBhdHRfbnVtOm51bWJlcj0wO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9iZWFyOmNjLlByZWZhYj1udWxsO1xyXG4gICAgYWxsX2JlYXI6TWFwPG51bWJlcixCZWFyPj1udWxsO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3liqDovb0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIC8v5Yqg6L295oqA6IO95oyH56S65ZmoXHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaG91X3dhbmdfamlhbnNoaV9hdHRhY2ssOCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaG91X3dhbmdfamlhbnNoaV9za2lsbDEsOCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5zaGVzaG91X2ppYW5zaGlfYXR0X2hpdCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNob3Vfd2FuZ19qaWFuc2hpX3NraWxsMV9oaXQsOCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC54dWFueXVuLDgpO1xyXG4gICAgICAgIHRoaXMuaXNfTG9hZExvYWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkSGl0TGlzdGVuKHRoaXMub25IaXRNb25zdGVyKTtcclxuICAgICAgICB0aGlzLmFkZEdhbWVXaW5MaXN0ZW4odGhpcy5yZW1vdmVBbGxCZWFyKTtcclxuICAgICAgICB0aGlzLmFsbF9iZWFyPW5ldyBNYXA8bnVtYmVyLEJlYXI+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQmVhcigpe1xyXG4gICAgICAgIC8v5Yig5o6J54aKXHJcbiAgICAgICAgdGhpcy5hbGxfYmVhci5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIHYuc3RhcnREZXN0b3J5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkJlYXJEZXN0b3J5KGlkOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5hbGxfYmVhci5kZWxldGUoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuaXNfbmVlZF9jaGVja19kaXN0YW5jZT10cnVlO1xyXG4gICAgICAgIHN1cGVyLnNldFNraWxsVGlwU2l6ZSgzMDAsMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ZUlkbGUoKXtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICBvbkhpdE1vbnN0ZXIoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQ3JpdDpib29sZWFuLG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlSmlhblNoaShpZDpHYW1lRWZmZWN0SWQsamlhbnNoaVBvczpjYy5WZWMyLHNwZWVkOm51bWJlcixkaXI6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBub2RlPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkLGppYW5zaGlQb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFNob3VXYW5nSmlhblNoaSkuaGVyb19sdmw9dGhpcy5oZXJvX2x2bDtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChTaG91V2FuZ0ppYW5TaGkpLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluWwhOWHu+aWueWQkVxyXG4gICAgZ2V0U0pGWEJ5UG9zKHBvczpjYy5WZWMyLHNlbGZQb3M6Y2MuVmVjMik6R29uZ0ppX0ZhbmdYaWFuZ1xyXG4gICAge1xyXG4gICAgICAgIC8v5a+55pWM5Lq65Y2V5L2N6L+b6KGM5pa55ZCR5Yik5pat77yM56Gu5a6a5omT5Ye75pa55ZCRXHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1YihzZWxmUG9zKTtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICBsZXQgcmFkaWFuPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICBsZXQgYW5nbGU9MTgwKnJhZGlhbi9NYXRoLlBJO1xyXG4gICAgICAgIGlmKGFuZ2xlPD03NSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT43NSAmJiBhbmdsZTwxMDUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT49MTA1ICYmIGFuZ2xlPD0xODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYW5neGlhbmc7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsQXR0YWNrKG1vbnN0ZXI6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBsZXQgZW5lbXlQb3M9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuY2hlY2tTa2lsbDEoZW5lbXlQb3MpPT1mYWxzZSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuY2hlY2tTa2lsbDEoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjayhlbmVteU5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAvL+ato+S4reW/gyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlOb2RlLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRTaGVTaG91UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpUG9zPXRoaXMuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9ZW5lbXlQb3Muc3ViKGppYW5zaGlQb3MpO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaURpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuTm9ybWFsLHRydWUsU2tpbGxUeXBlLk51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUppYW5TaGkoR2FtZUVmZmVjdElkLnNob3Vfd2FuZ19qaWFuc2hpX2F0dGFjayxqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0dvbmdqaWFuc2hvdUF0dGFjayk7IFxyXG4gICAgICAgICAgICB0aGlzLmF0dF9udW0rKztcclxuICAgICAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXROb3JtYWxBdHRhY2soKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmF0dGFjayxmYW5neGlhbmcsW2RhdGFdLCgpPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsZmFuZ3hpYW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKuiiq+WKqOaKgOiDvTHop6blj5HliKTmlq0gKi9cclxuICAgIGNoZWNrU2tpbGwxKHBvczpjYy5WZWMyPW51bGwpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICAvL2lmKHRoaXMuYXR0X251bT49MylcclxuICAgICAgICBpZih0aGlzLmF0dF9udW0+PTApeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmlzX2Nhbl9nb25namk9ZmFsc2U7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDsgXHJcbiAgICAgICAgICAgICAgICBsZXQgamlhbnNoaVBvcz1zdXBlci5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9Y2MudjIoMCwgMTApO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgICAgICAvL+S4reW/g+aWueWQkVxyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGlhbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCx0cnVlLFNraWxsVHlwZS5QYXNzaXZlXzEsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVKaWFuU2hpKEdhbWVFZmZlY3RJZC5zaG91X3dhbmdfamlhbnNoaV9za2lsbDEsamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCoxLjI1LHJhZGlhbixnakRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRfbnVtPTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsZmFuZ3hpYW5nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIHJldHVybiAyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2VsZlh1TGkocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIC8v6JOE5Yqb5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+s5ZSk5LiA5Y+q5oyB57ute+WPguaVsDF956eS55qE5beo54aK77yM5a+5MTUw5Y2K5b6E6IyD5Zu05YaF6YCg5oiQe+WPguaVsDJ9JeS8pOWus+WSjDHnp5LnnKnmmZXmlYjmnpzvvIzlt6jnhornmoTnp7vliqjpgJ/luqbkuLo4MOOAgeaUu+mAn+S4ujIuMO+8jOS8muaMgee7reWvueemu+iHqui6q+acgOi/keeahOaVjOS6uui/m+ihjOaUu+WHu++8jOavj+asoeaUu+WHu+mAoOaIkHvlj4LmlbAzfSXkvKTlrrNcclxuICAgICAqL1xyXG4gICAgc3RhcnRMYXVuY2gocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIGxldCBzaGVzaG91RXgxPXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICBsZXQgYW9lPTA7XHJcbiAgICAgICAgaWYoc2hlc2hvdUV4MSYmc2hlc2hvdUV4MT4wKXtcclxuICAgICAgICAgICAgLy/nhornmoTojIPlm7TmlLvlh7tcclxuICAgICAgICAgICAgYW9lPXNoZXNob3VFeDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBhb2U9MTAwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfU2hvdVdhbmdTa2lsbDEpO1xyXG4gICAgICAgIHN1cGVyLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuQWN0aXZlLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBiZWFyPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2JlYXIpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChiZWFyKTsgICAgICAgIFxyXG4gICAgICAgIGJlYXIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBsZXQgYmVhclRzPWJlYXIuZ2V0Q29tcG9uZW50KEJlYXIpO1xyXG4gICAgICAgIGJlYXJUcy5pbml0KGdqRGF0YSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKSx0aGlzLnVzZV9za2lsbF9udW0sYW9lKTtcclxuICAgICAgICBiZWFyVHMuYWRkRGVzdG9yeUxpc3Rlbih0aGlzLm9uQmVhckRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hbGxfYmVhci5zZXQodGhpcy51c2Vfc2tpbGxfbnVtLGJlYXJUcyk7XHJcbiAgICAgICAgLy/lnIblvaLnnKnmmZVcclxuICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZSgtNSw1LDAuMDIsNik7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEscG9zLDE1MCk7XHJcbiAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICBsZXQgZmFud2VpRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKGZhbndlaURhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGEuaXNfZGllICYmIGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fWHVhbll1bjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVswXTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5hZGREZUJ1ZmYoYnVmZkRhdGEsZmFud2VpRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==