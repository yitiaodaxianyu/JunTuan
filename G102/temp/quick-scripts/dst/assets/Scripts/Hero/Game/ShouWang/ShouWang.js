
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
        if (this.att_num >= 3) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2hvdVdhbmdcXFNob3VXYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUErRDtBQUMvRCxpRUFBNEQ7QUFDNUQsdUVBQWdFO0FBQ2hFLDJEQUFzRDtBQUN0RCxvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLDREQUE0RDtBQUM1RCxrRUFBNkQ7QUFDN0QsZ0VBQTJEO0FBQzNELGdEQUEyQztBQUUzQyx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUFvSDtBQUNwSCwrQkFBMEI7QUFDMUIscURBQWdEO0FBRTFDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFJO0lBQTFDO1FBQUEscUVBaU9DO1FBL05HLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFFakIsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0IsY0FBUSxHQUFrQixJQUFJLENBQUM7O0lBNE5uQyxDQUFDO0lBMU5ELCtGQUErRjtJQUMzRix5QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx3QkFBd0IsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHdCQUF3QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyw0QkFBNEIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FB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QUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7b0JBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyxZQUFZLENBQUM7b0JBQ3JDLFFBQVEsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxPQUFPLENBQUM7b0JBQ3BDLFFBQVEsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEIsUUFBUSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7b0JBQ3ZCLFFBQVEsQ0FBQyxjQUFjLEdBQUMsaUNBQVksQ0FBQyxPQUFPLENBQUM7b0JBQzdDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM1QzthQUNKO1NBQ0o7UUFDRCxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBM05EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ087SUFKVixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBaU81QjtJQUFELGVBQUM7Q0FqT0QsQUFpT0MsQ0FqT3FDLGNBQUksR0FpT3pDO2tCQWpPb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRmlnaHRpbmdNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL0ZpZ2h0aW5nTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgU2tpbGxUaXBUeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQmVhciBmcm9tIFwiLi9CZWFyXCI7XHJcbmltcG9ydCBTaG91V2FuZ0ppYW5TaGkgZnJvbSBcIi4vU2hvdVdhbmdKaWFuU2hpXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3VXYW5nIGV4dGVuZHMgSGVybyB7XHJcbiAgICBcclxuICAgIGF0dF9udW06bnVtYmVyPTA7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2JlYXI6Y2MuUHJlZmFiPW51bGw7XHJcbiAgICBhbGxfYmVhcjpNYXA8bnVtYmVyLEJlYXI+PW51bGw7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWKoOi9vS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgLy/liqDovb3mioDog73mjIfnpLrlmahcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNob3Vfd2FuZ19qaWFuc2hpX2F0dGFjayw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNob3Vfd2FuZ19qaWFuc2hpX3NraWxsMSw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnNoZXNob3VfamlhbnNoaV9hdHRfaGl0LDgpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuc2hvdV93YW5nX2ppYW5zaGlfc2tpbGwxX2hpdCw4KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sOCk7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEhpdExpc3Rlbih0aGlzLm9uSGl0TW9uc3Rlcik7XHJcbiAgICAgICAgdGhpcy5hZGRHYW1lV2luTGlzdGVuKHRoaXMucmVtb3ZlQWxsQmVhcik7XHJcbiAgICAgICAgdGhpcy5hbGxfYmVhcj1uZXcgTWFwPG51bWJlcixCZWFyPigpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEJlYXIoKXtcclxuICAgICAgICAvL+WIoOaOieeGilxyXG4gICAgICAgIHRoaXMuYWxsX2JlYXIuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICB2LnN0YXJ0RGVzdG9yeSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25CZWFyRGVzdG9yeShpZDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuYWxsX2JlYXIuZGVsZXRlKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmlzX25lZWRfY2hlY2tfZGlzdGFuY2U9dHJ1ZTtcclxuICAgICAgICBzdXBlci5zZXRTa2lsbFRpcFNpemUoMzAwLDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydGVJZGxlKCl7XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgb25IaXRNb25zdGVyKGRhbWFnZVR5cGU6RGFtYWdlVHlwZSxpc0NyaXQ6Ym9vbGVhbixtb25zdGVyOmNjLk5vZGUpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUppYW5TaGkoaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxqaWFuc2hpUG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChTaG91V2FuZ0ppYW5TaGkpLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPluWwhOWHu+aWueWQkVxyXG4gICAgZ2V0U0pGWEJ5UG9zKHBvczpjYy5WZWMyLHNlbGZQb3M6Y2MuVmVjMik6R29uZ0ppX0ZhbmdYaWFuZ1xyXG4gICAge1xyXG4gICAgICAgIC8v5a+55pWM5Lq65Y2V5L2N6L+b6KGM5pa55ZCR5Yik5pat77yM56Gu5a6a5omT5Ye75pa55ZCRXHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1YihzZWxmUG9zKTtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICBsZXQgcmFkaWFuPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICBsZXQgYW5nbGU9MTgwKnJhZGlhbi9NYXRoLlBJO1xyXG4gICAgICAgIGlmKGFuZ2xlPD03NSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT43NSAmJiBhbmdsZTwxMDUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT49MTA1ICYmIGFuZ2xlPD0xODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYW5neGlhbmc7XHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsQXR0YWNrKG1vbnN0ZXI6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgZW5lbXlQb3M9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tTa2lsbDEoZW5lbXlQb3MpPT1mYWxzZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRTSkZYQnlQb3MoZW5lbXlOb2RlLmdldFBvc2l0aW9uKCksdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5q2j5Lit5b+DICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSxTa2lsbFR5cGUuTnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSmlhblNoaShHYW1lRWZmZWN0SWQuc2hvdV93YW5nX2ppYW5zaGlfYXR0YWNrLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfR29uZ2ppYW5zaG91QXR0YWNrKTsgXHJcbiAgICAgICAgICAgIHRoaXMuYXR0X251bSsrO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxmYW5neGlhbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoq6KKr5Yqo5oqA6IO9MeinpuWPkeWIpOaWrSAqL1xyXG4gICAgY2hlY2tTa2lsbDEocG9zOmNjLlZlYzIpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz10aGlzLmdldFNKRlhCeVBvcyhwb3MsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIGlmKHRoaXMuYXR0X251bT49Myl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wOyBcclxuICAgICAgICAgICAgICAgIGxldCBqaWFuc2hpUG9zPXN1cGVyLmdldENyZWF0ZUJ1bGxldFBvcygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1wb3Muc3ViKGppYW5zaGlQb3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgICAgICAgICAvL+S4reW/g+aWueWQkVxyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGlhbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCx0cnVlLFNraWxsVHlwZS5QYXNzaXZlXzEsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVKaWFuU2hpKEdhbWVFZmZlY3RJZC5zaG91X3dhbmdfamlhbnNoaV9za2lsbDEsamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCoxLjI1LHJhZGlhbixnakRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRfbnVtPTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsZmFuZ3hpYW5nKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIHJldHVybiAyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2VsZlh1TGkocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIC8v6JOE5Yqb5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y+s5ZSk5LiA5Y+q5oyB57ute+WPguaVsDF956eS55qE5beo54aK77yM5a+5MTUw5Y2K5b6E6IyD5Zu05YaF6YCg5oiQe+WPguaVsDJ9JeS8pOWus+WSjDHnp5LnnKnmmZXmlYjmnpzvvIzlt6jnhornmoTnp7vliqjpgJ/luqbkuLo4MOOAgeaUu+mAn+S4ujIuMO+8jOS8muaMgee7reWvueemu+iHqui6q+acgOi/keeahOaVjOS6uui/m+ihjOaUu+WHu++8jOavj+asoeaUu+WHu+mAoOaIkHvlj4LmlbAzfSXkvKTlrrNcclxuICAgICAqL1xyXG4gICAgc3RhcnRMYXVuY2gocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIGxldCBzaGVzaG91RXgxPXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICBsZXQgYW9lPTA7XHJcbiAgICAgICAgaWYoc2hlc2hvdUV4MSYmc2hlc2hvdUV4MT4wKXtcclxuICAgICAgICAgICAgLy/nhornmoTojIPlm7TmlLvlh7tcclxuICAgICAgICAgICAgYW9lPXNoZXNob3VFeDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBhb2U9MTAwO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfU2hvdVdhbmdTa2lsbDEpO1xyXG4gICAgICAgIHN1cGVyLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuQWN0aXZlLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBiZWFyPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2JlYXIpO1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5hZGRDaGlsZChiZWFyKTsgICAgICAgIFxyXG4gICAgICAgIGJlYXIuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgICBsZXQgYmVhclRzPWJlYXIuZ2V0Q29tcG9uZW50KEJlYXIpO1xyXG4gICAgICAgIGJlYXJUcy5pbml0KGdqRGF0YSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKSx0aGlzLnVzZV9za2lsbF9udW0sYW9lKTtcclxuICAgICAgICBiZWFyVHMuYWRkRGVzdG9yeUxpc3Rlbih0aGlzLm9uQmVhckRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5hbGxfYmVhci5zZXQodGhpcy51c2Vfc2tpbGxfbnVtLGJlYXJUcyk7XHJcbiAgICAgICAgLy/lnIblvaLnnKnmmZVcclxuICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZSgtNSw1LDAuMDIsNik7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEscG9zLDE1MCk7XHJcbiAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICBsZXQgZmFud2VpRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVHM9bW9uc3RlcnNbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKGZhbndlaURhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGEuaXNfZGllICYmIGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fWHVhbll1bjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVswXTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUcy5hZGREZUJ1ZmYoYnVmZkRhdGEsZmFud2VpRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==