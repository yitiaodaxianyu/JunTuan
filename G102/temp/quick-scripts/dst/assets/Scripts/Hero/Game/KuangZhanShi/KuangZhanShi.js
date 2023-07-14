
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/KuangZhanShi/KuangZhanShi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcS3VhbmdaaGFuU2hpXFxLdWFuZ1poYW5TaGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQStEO0FBQy9ELGlFQUE0RDtBQUM1RCx1RUFBb0Y7QUFDcEYsMkRBQXNEO0FBRXRELG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0MsNERBQTREO0FBRTVELGdFQUEyRDtBQUczRCx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUF1SDtBQUN2SCxpQ0FBNEI7QUFFdEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQUk7SUFBOUM7UUFBQSxxRUFrTUM7UUFoTUcsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsaUJBQVcsR0FBUyxLQUFLLENBQUM7O0lBK0w5QixDQUFDO0lBN0xELCtGQUErRjtJQUMzRiw2QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDRCQUE0QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxJQUFJLENB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LEdBQUMscUJBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsUUFBUSxDQUFDLFVBQVUsR0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RSxRQUFRLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxJQUFJLEdBQUMsaUJBQU0sT0FBTyxZQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUQsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHlDQUFrQixHQUFsQixVQUFtQixRQUFrQjtRQUNqQyxRQUFRO1FBQ1IsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUUsdUJBQVUsQ0FBQyxJQUFJLEVBQUM7WUFDcEMsaUJBQU0sWUFBWSxZQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLDZCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQWpNZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWtNaEM7SUFBRCxtQkFBQztDQWxNRCxBQWtNQyxDQWxNeUMsY0FBSSxHQWtNN0M7a0JBbE1vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSXNEZWJ1ZywgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa3lNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NreU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgSGVyb19TdGF0ZV9OYW1lLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgRnVUb3UgZnJvbSBcIi4vRnVUb3VcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS3VhbmdaaGFuU2hpIGV4dGVuZHMgSGVybyB7XHJcbiAgICBcclxuICAgIGt1YW5ncmVfbnVtOm51bWJlcj0wO1xyXG4gICAgaXNfc2tpbGxpbmc6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg6L29LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQua3Vhbmd6aGFuc2hpX2F0dGFjaywyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmt1YW5nemhhbnNoaV9hdHRhY2tfY2h1YW50b3UsNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5rdWFuZ3poYW5zaGlfYXR0YWNrX2hpdCwyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmt1YW5nemhhbnNoaV9hdHRhY2tfbWF4LDIpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEhpdExpc3Rlbih0aGlzLm9uSGl0TW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRlSWRsZSgpe1xyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pS75Ye7LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoq5pq05Ye75pe25Lqn55SfMTAwKjIwMOmUpeW9ouiMg+WbtOeahOa6heWwhOaViOaenO+8jOWPl+aUu+WHu+eahOaVjOS6uuWSjOiiq+a6heWwhOeahOS6uumineWkluWPl+WIsHvlj4LmlbAxfSXkvKTlrrMgKi9cclxuICAgIG9uSGl0TW9uc3RlcihkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsaXNDcml0OmJvb2xlYW4sbW9uc3RlcjpjYy5Ob2RlKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGdVRvdShqaWFuc2hpUG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIpeyAgICBcclxuICAgICAgICBsZXQgaXNQPWZhbHNlXHJcbiAgICAgICAgbGV0IHJhdGU9MDtcclxuICAgICAgICBsZXQgZXgxPXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICBpZihleDEmJmV4MT4wKXtcclxuICAgICAgICAgICAgLy/lkLjooYDnjodcclxuICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVCdWZmKEJ1ZmZJZC5IZXJvX0t1YW5nWmhhblNoaV9EYVpoYW8pKXtcclxuICAgICAgICAgICAgICAgIHJhdGU9ZXgxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMua3VhbmdyZV9udW0+PXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpKXtcclxuICAgICAgICAgICAgaXNQPXRydWU7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5rdWFuZ3poYW5zaGlfYXR0YWNrX21heCxqaWFuc2hpUG9zKTsgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZnV0b3U9bm9kZS5nZXRDb21wb25lbnQoRnVUb3UpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCx0cnVlLFNraWxsVHlwZS5QYXNzaXZlXzEsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMSkpXHJcbiAgICAgICAgICAgIGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlKz1yYXRlO1xyXG4gICAgICAgICAgICBmdXRvdS5pbml0KEdhbWVFZmZlY3RJZC5rdWFuZ3poYW5zaGlfYXR0YWNrX21heCxzcGVlZCxkaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgZnV0b3UuaW5pdEZ1VG91KHRoaXMua3VhbmdyZV9udW0saXNQLDEpO1xyXG4gICAgICAgICAgICB0aGlzLmt1YW5ncmVfbnVtPTA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLFNraWxsVHlwZS5OdWxsKTtcclxuICAgICAgICAgICAgZ2pEYXRhLmhlcm9fZGF0YS5ibG9vZF9zdWNraW5nX3JhdGUrPXJhdGU7XHJcbiAgICAgICAgICAgIGxldCBub2RlPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5rdWFuZ3poYW5zaGlfYXR0YWNrLGppYW5zaGlQb3MpOyAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBmdXRvdT1ub2RlLmdldENvbXBvbmVudChGdVRvdSk7XHJcbiAgICAgICAgICAgIGZ1dG91LmluaXQoR2FtZUVmZmVjdElkLmt1YW5nemhhbnNoaV9hdHRhY2ssc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICAgICAgICAgIGZ1dG91LmluaXRGdVRvdSh0aGlzLmt1YW5ncmVfbnVtLGlzUCwwKTtcclxuICAgICAgICAgICAgdGhpcy5rdWFuZ3JlX251bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluWwhOWHu+aWueWQkVxyXG4gICAgZ2V0U0pGWEJ5UG9zKHBvczpjYy5WZWMyLHNlbGZQb3M6Y2MuVmVjMik6R29uZ0ppX0ZhbmdYaWFuZ1xyXG4gICAge1xyXG4gICAgICAgIC8v5a+55pWM5Lq65Y2V5L2N6L+b6KGM5pa55ZCR5Yik5pat77yM56Gu5a6a5omT5Ye75pa55ZCRXHJcbiAgICAgICAgbGV0IGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnpob25nO1xyXG4gICAgICAgIGxldCBvZmZzZXRQb3M9cG9zLnN1YihzZWxmUG9zKTtcclxuICAgICAgICBsZXQgcGkyPU1hdGguUEkqMjtcclxuICAgICAgICBsZXQgcmFkaWFuPShNYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KStwaTIpJXBpMjtcclxuICAgICAgICBsZXQgYW5nbGU9MTgwKnJhZGlhbi9NYXRoLlBJO1xyXG4gICAgICAgIGlmKGFuZ2xlPD03NSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZhbmd4aWFuZz1Hb25nSmlfRmFuZ1hpYW5nLnlvdTtcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT43NSAmJiBhbmdsZTwxMDUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICB9ZWxzZSBpZihhbmdsZT49MTA1ICYmIGFuZ2xlPD0xODApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56dW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYW5neGlhbmc7XHJcbiAgICB9XHJcbiAgICAvKirmr4/mrKHmma7pgJrmlLvlh7vmnIl75Y+C5pWwMX0l5Yeg546H5pS55Li65bCE5Ye65LiA5rOi566t6Zuo77yM566t6Zuo5ZCre+WPguaVsDJ95pSv566t77yM5q+P5pSv566t6YCg5oiQe+WPguaVsDN9JeS8pOWusyAqL1xyXG4gICAgbm9ybWFsQXR0YWNrKG1vbnN0ZXI6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKG1vbnN0ZXIpOyAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEF0dGFjayhlbmVteU5vZGU6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgYXR0TmFtZTpzdHJpbmc9SGVyb19TdGF0ZV9OYW1lLkF0dGFjaztcclxuICAgICAgICBpZihzdXBlci5pc0hhdmVCdWZmKEJ1ZmZJZC5IZXJvX0t1YW5nWmhhblNoaV9EYVpoYW8pKXtcclxuICAgICAgICAgICAgYXR0TmFtZT1cIkF0dGFjazJcIjtcclxuICAgICAgICAgICAgdGhpcy5rdWFuZ3JlX251bT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5q2j5Lit5b+DICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBpZihJc0RlYnVnKXtcclxuICAgICAgICAgICAgLy8gICAgIGlmKHRoaXMuaXNIYXZlQnVmZihCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvKSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZ2pEYXRhLmhlcm9fZGF0YS5ibG9vZF9zdWNraW5nX3JhdGUrPTAuNTtcclxuICAgICAgICAgICAgLy8gICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGdVRvdShqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfS1pTQXR0YWNrKTsgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfZG91YmxlX2F0dGFjayl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Tm9ybWFsQXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihIZXJvX1N0YXRlLmF0dGFjayxhdHROYW1lLGZhbHNlLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICBhdHROYW1lPUhlcm9fU3RhdGVfTmFtZS5JZGxlO1xyXG4gICAgICAgICAgICBpZihzdXBlci5pc0hhdmVCdWZmKEJ1ZmZJZC5IZXJvX0t1YW5nWmhhblNoaV9EYVpoYW8pKXtcclxuICAgICAgICAgICAgICAgIGF0dE5hbWU9XCJJZGxlMlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihIZXJvX1N0YXRlLmlkbGUsYXR0TmFtZSx0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gMjtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKHBvczpjYy5WZWMyKXtcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7ICAgICAgICBcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihIZXJvX1N0YXRlLmlkbGUsXCJJZGxlMlwiLHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9LWlNTa2lsbCk7XHJcbiAgICB9XHJcbiAgICAvKirok4TlipvlkI7lj5HlsITkuIDms6Lnrq3pm6jvvIzlr7nljYrlvoR75Y+C5pWwMX3ojIPlm7TlhoXnmoTmlYzkurrlnKgz56eS5YaF6YCg5oiQMTXmrKF75Y+C5pWwMn0l5Lyk5a6zICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX0t1YW5nWmhhblNoaV9EYVpoYW87XHJcbiAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSldO1xyXG4gICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgIGxldCBidWZmPXN1cGVyLmFkZEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uU2tpbGxCdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2tpbGxCdWZmRGVzdG9yeShidWZmRGF0YTogQnVmZkRhdGEpOiB2b2lkIHtcclxuICAgICAgICAvL+S4jeiDveS4reaWreaUu+WHu1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuaWRsZSl7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==