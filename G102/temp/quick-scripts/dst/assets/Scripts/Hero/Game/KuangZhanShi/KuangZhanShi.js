
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcS3VhbmdaaGFuU2hpXFxLdWFuZ1poYW5TaGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQStEO0FBQy9ELGlFQUE0RDtBQUM1RCx1RUFBb0Y7QUFDcEYsMkRBQXNEO0FBRXRELG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0MsNERBQTREO0FBRTVELGdFQUEyRDtBQUczRCx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUF1SDtBQUN2SCxpQ0FBNEI7QUFFdEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQUk7SUFBOUM7UUFBQSxxRUFtTUM7UUFqTUcsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsaUJBQVcsR0FBUyxLQUFLLENBQUM7O0lBZ005QixDQUFDO0lBOUxELCtGQUErRjtJQUMzRiw2QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDRCQUE0QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsdUJBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBRUksaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsc0JBQXNCLEdBQUMsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxzQ0FBZSxHQUFmLFVBQWdCLFNBQWlCO1FBQzdCLElBQUcsU0FBUyxFQUFDO1lBQ1QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7YUFBSTtZQUNELGVBQWU7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLDZCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQztJQUVELGlDQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsa0dBQWtHO0lBQ2xHLG9EQUFvRDtJQUNwRCxtQ0FBWSxHQUFaLFVBQWEsVUFBcUIsRUFBQyxNQUFjLEVBQUMsT0FBZTtJQUVqRSxDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLFVBQWtCLEVBQUMsS0FBWSxFQUFDLEdBQVU7UUFDbEQsSUFBSSxHQUFHLEdBQUMsS0FBSyxDQUFBO1FBQ2IsSUFBSSxJQUFJLEdBQUMsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQztRQUNuRCxJQUFHLEdBQUcsSUFBRSxHQUFHLEdBQUMsQ0FBQyxFQUFDO1lBQ1YsS0FBSztZQUNMLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBTSxDQUFDLHdCQUF3QixDQUFDLEVBQUM7Z0JBQ2hELElBQUksR0FBQyxHQUFHLENBQUM7YUFDWjtTQUNKO1FBQ0QsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLEVBQUM7WUFDcEUsR0FBRyxHQUFDLElBQUksQ0FBQztZQUNULElBQUksSUFBSSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxVQUFVLENBQUMsQ0FBQztZQUM3RyxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksTUFBTSxHQUFDLGlCQUFNLGFBQWEsWUFBQyx1QkFBVSxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsc0JBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO1lBQzVILE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLElBQUUsSUFBSSxDQUFDO1lBQzFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7U0FDdEI7YUFBSTtZQUNELElBQUksTUFBTSxHQUFDLGlCQUFNLGFBQWEsWUFBQyx1QkFBVSxDQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsc0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixJQUFFLElBQUksQ0FBQztZQUMxQyxJQUFJLElBQUksR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLGlDQUFZLENBQUMsbUJBQW1CLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDekcsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFLLENBQUMsQ0FBQztZQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlDQUFZLENBQUMsbUJBQW1CLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUM5RCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUVMLENBQUM7SUFFRCxRQUFRO0lBQ1IsbUNBQVksR0FBWixVQUFhLEdBQVcsRUFBQyxPQUFlO1FBRXBDLG9CQUFvQjtRQUNwQixJQUFJLFNBQVMsR0FBQyw2QkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLE1BQU0sR0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQ3pELElBQUksS0FBSyxHQUFDLEdBQUcsR0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3QixJQUFHLEtBQUssSUFBRSxFQUFFLEVBQ1o7WUFDSSxTQUFTLEdBQUMsNkJBQWdCLENBQUMsR0FBRyxDQUFDO1NBQ2xDO2FBQUssSUFBRyxLQUFLLEdBQUMsRUFBRSxJQUFJLEtBQUssR0FBQyxHQUFHLEVBQzlCO1lBQ0ksU0FBUyxHQUFDLDZCQUFnQixDQUFDLEtBQUssQ0FBQztTQUNwQzthQUFLLElBQUcsS0FBSyxJQUFFLEdBQUcsSUFBSSxLQUFLLElBQUUsR0FBRyxFQUNqQztZQUNJLFNBQVMsR0FBQyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUM7U0FDbEM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ0Qsc0RBQXNEO0lBQ3RELG1DQUFZLEdBQVosVUFBYSxPQUFlO1FBRXhCLElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLElBQUUscUJBQVMsQ0FBQyxZQUFZO1lBQ25FLE9BQU87UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxrQ0FBVyxHQUFYLFVBQVksU0FBaUI7UUFBN0IsaUJBb0NDO1FBbENHLElBQUksT0FBTyxHQUFRLDRCQUFlLENBQUMsTUFBTSxDQUFDO1FBQzFDLElBQUcsaUJBQU0sVUFBVSxZQUFDLG1CQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBQztZQUNqRCxPQUFPLEdBQUMsU0FBUyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFDLElBQUksMEJBQVksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUMsUUFBUSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUM7WUFDVixpQkFBaUI7WUFDakIsSUFBSSxRQUFRLEdBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0QsSUFBSSxVQUFVLEdBQUMsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDekMsSUFBSSxTQUFTLEdBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELGVBQWU7WUFDZiw0REFBNEQ7WUFDNUQsb0RBQW9EO1lBQ3BELHdCQUF3QjtZQUN4QixJQUFJO1lBQ0osS0FBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUMsS0FBSSxDQUFDLFlBQVksRUFBQyxVQUFVLENBQUMsQ0FBQztZQUMxRCxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRSxJQUFHLEtBQUksQ0FBQyxnQkFBZ0IsRUFBQztnQkFDckIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDNUI7aUJBQUk7Z0JBQ0QsS0FBSSxDQUFDLFlBQVksR0FBQyxDQUFDLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUE7UUFDRCxpQkFBTSx3QkFBd0IsWUFBQyx1QkFBVSxDQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDbEUsT0FBTyxHQUFDLDRCQUFlLENBQUMsSUFBSSxDQUFDO1lBQzdCLElBQUcsaUJBQU0sVUFBVSxhQUFDLG1CQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBQztnQkFDakQsT0FBTyxHQUFDLE9BQU8sQ0FBQzthQUNuQjtZQUNELGlCQUFNLHdCQUF3QixhQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFHRCwrQkFBUSxHQUFSLFVBQVMsR0FBVztRQUFwQixpQkFNQztRQUpHLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3BDLEtBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELG9DQUFhLEdBQWIsVUFBYyxHQUFXO1FBQXpCLGlCQXFCQztRQXBCRyxPQUFPO1FBQ1AsSUFBSSxRQUFRLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pDLE9BQU87UUFDUCxJQUFJLFNBQVMsR0FBQyxJQUFJLDBCQUFZLEVBQUUsQ0FBQztRQUNqQyxTQUFTLENBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQztRQUN2QixTQUFTLENBQUMsUUFBUSxHQUFDO1lBQ2YsTUFBTTtZQUNOLHNCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLFFBQVEsQ0FBQztZQUMxQixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUE7UUFDRCxRQUFRO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBVSxDQUFDLEtBQUssRUFBQyw2QkFBZ0IsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQztZQUNsRSx3QkFBd0I7WUFDeEIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsaUJBQU0sd0JBQXdCLGFBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUMsaUJBQUssQ0FBQztRQUMzQixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBQ0QsK0NBQStDO0lBQy9DLGtDQUFXLEdBQVgsVUFBWSxHQUFXO1FBQ25CLGlCQUFNLGdCQUFnQixXQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDNUIsUUFBUSxDQUFDLE9BQU8sR0FBQyxtQkFBTSxDQUFDLHdCQUF3QixDQUFDO1FBQ2pELFFBQVEsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsUUFBUSxDQUFDLFVBQVUsR0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN0RSxRQUFRLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBSSxJQUFJLEdBQUMsaUJBQU0sT0FBTyxZQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUQsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHlDQUFrQixHQUFsQixVQUFtQixRQUFrQjtRQUNqQyxRQUFRO1FBQ1IsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUUsdUJBQVUsQ0FBQyxJQUFJLEVBQUM7WUFDcEMsaUJBQU0sWUFBWSxZQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLDZCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQWxNZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQW1NaEM7SUFBRCxtQkFBQztDQW5NRCxBQW1NQyxDQW5NeUMsY0FBSSxHQW1NN0M7a0JBbk1vQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSXNEZWJ1ZywgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa3lNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NreU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZywgSGVyb19TdGF0ZSwgSGVyb19TdGF0ZV9OYW1lLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgRnVUb3UgZnJvbSBcIi4vRnVUb3VcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS3VhbmdaaGFuU2hpIGV4dGVuZHMgSGVybyB7XHJcbiAgICBcclxuICAgIGt1YW5ncmVfbnVtOm51bWJlcj0wO1xyXG4gICAgaXNfc2tpbGxpbmc6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Yqg6L29LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQua3Vhbmd6aGFuc2hpX2F0dGFjaywyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmt1YW5nemhhbnNoaV9hdHRhY2tfY2h1YW50b3UsNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5rdWFuZ3poYW5zaGlfYXR0YWNrX2hpdCwyKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmt1YW5nemhhbnNoaV9hdHRhY2tfbWF4LDIpO1xyXG4gICAgICAgIHRoaXMuaXNfTG9hZExvYWQ9dHJ1ZTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkU2tpbGxMaXN0ZW4odGhpcy51c2VTa2lsbCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5ub3JtYWxBdHRhY2spO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRIaXRMaXN0ZW4odGhpcy5vbkhpdE1vbnN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuaXNfbmVlZF9jaGVja19kaXN0YW5jZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ZUlkbGUoKXtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKuaatOWHu+aXtuS6p+eUnzEwMCoyMDDplKXlvaLojIPlm7TnmoTmuoXlsITmlYjmnpzvvIzlj5fmlLvlh7vnmoTmlYzkurrlkozooqvmuoXlsITnmoTkurrpop3lpJblj5fliLB75Y+C5pWwMX0l5Lyk5a6zICovXHJcbiAgICBvbkhpdE1vbnN0ZXIoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQ3JpdDpib29sZWFuLG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRnVUb3UoamlhbnNoaVBvczpjYy5WZWMyLHNwZWVkOm51bWJlcixkaXI6bnVtYmVyKXsgICAgXHJcbiAgICAgICAgbGV0IGlzUD1mYWxzZVxyXG4gICAgICAgIGxldCByYXRlPTA7XHJcbiAgICAgICAgbGV0IGV4MT10aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgIC8v5ZC46KGA546HXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNIYXZlQnVmZihCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvKSl7XHJcbiAgICAgICAgICAgICAgICByYXRlPWV4MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmt1YW5ncmVfbnVtPj10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSl7XHJcbiAgICAgICAgICAgIGlzUD10cnVlOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQua3Vhbmd6aGFuc2hpX2F0dGFja19tYXgsamlhbnNoaVBvcyk7ICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGZ1dG91PW5vZGUuZ2V0Q29tcG9uZW50KEZ1VG91KTtcclxuICAgICAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsdHJ1ZSxTa2lsbFR5cGUuUGFzc2l2ZV8xLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5QYXNzaXZlXzEpKVxyXG4gICAgICAgICAgICBnakRhdGEuaGVyb19kYXRhLmJsb29kX3N1Y2tpbmdfcmF0ZSs9cmF0ZTtcclxuICAgICAgICAgICAgZnV0b3UuaW5pdChHYW1lRWZmZWN0SWQua3Vhbmd6aGFuc2hpX2F0dGFja19tYXgsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICAgICAgICAgIGZ1dG91LmluaXRGdVRvdSh0aGlzLmt1YW5ncmVfbnVtLGlzUCwxKTtcclxuICAgICAgICAgICAgdGhpcy5rdWFuZ3JlX251bT0wO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSxTa2lsbFR5cGUuTnVsbCk7XHJcbiAgICAgICAgICAgIGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlKz1yYXRlO1xyXG4gICAgICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQua3Vhbmd6aGFuc2hpX2F0dGFjayxqaWFuc2hpUG9zKTsgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZnV0b3U9bm9kZS5nZXRDb21wb25lbnQoRnVUb3UpO1xyXG4gICAgICAgICAgICBmdXRvdS5pbml0KEdhbWVFZmZlY3RJZC5rdWFuZ3poYW5zaGlfYXR0YWNrLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgICAgICAgICBmdXRvdS5pbml0RnVUb3UodGhpcy5rdWFuZ3JlX251bSxpc1AsMCk7XHJcbiAgICAgICAgICAgIHRoaXMua3VhbmdyZV9udW0rKztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blsITlh7vmlrnlkJFcclxuICAgIGdldFNKRlhCeVBvcyhwb3M6Y2MuVmVjMixzZWxmUG9zOmNjLlZlYzIpOkdvbmdKaV9GYW5nWGlhbmdcclxuICAgIHtcclxuICAgICAgICAvL+WvueaVjOS6uuWNleS9jei/m+ihjOaWueWQkeWIpOaWre+8jOehruWumuaJk+WHu+aWueWQkVxyXG4gICAgICAgIGxldCBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy56aG9uZztcclxuICAgICAgICBsZXQgb2Zmc2V0UG9zPXBvcy5zdWIoc2VsZlBvcyk7XHJcbiAgICAgICAgbGV0IHBpMj1NYXRoLlBJKjI7XHJcbiAgICAgICAgbGV0IHJhZGlhbj0oTWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCkrcGkyKSVwaTI7XHJcbiAgICAgICAgbGV0IGFuZ2xlPTE4MCpyYWRpYW4vTWF0aC5QSTtcclxuICAgICAgICBpZihhbmdsZTw9NzUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmYW5neGlhbmc9R29uZ0ppX0ZhbmdYaWFuZy55b3U7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+NzUgJiYgYW5nbGU8MTA1KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuemhvbmc7XHJcbiAgICAgICAgfWVsc2UgaWYoYW5nbGU+PTEwNSAmJiBhbmdsZTw9MTgwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmFuZ3hpYW5nPUdvbmdKaV9GYW5nWGlhbmcuenVvO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFuZ3hpYW5nO1xyXG4gICAgfVxyXG4gICAgLyoq5q+P5qyh5pmu6YCa5pS75Ye75pyJe+WPguaVsDF9JeWHoOeOh+aUueS4uuWwhOWHuuS4gOazoueurembqO+8jOeurembqOWQq3vlj4LmlbAyfeaUr+eure+8jOavj+aUr+euremAoOaIkHvlj4LmlbAzfSXkvKTlrrMgKi9cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zdGFydEF0dGFjayhtb25zdGVyKTsgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGF0dE5hbWU6c3RyaW5nPUhlcm9fU3RhdGVfTmFtZS5BdHRhY2s7XHJcbiAgICAgICAgaWYoc3VwZXIuaXNIYXZlQnVmZihCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvKSl7XHJcbiAgICAgICAgICAgIGF0dE5hbWU9XCJBdHRhY2syXCI7XHJcbiAgICAgICAgICAgIHRoaXMua3VhbmdyZV9udW09dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAvL+ato+S4reW/gyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5lbXlQb3M9ZW5lbXlOb2RlLmdldENvbXBvbmVudChNb25zdGVyKS5nZXRTaGVTaG91UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpUG9zPXRoaXMuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9ZW5lbXlQb3Muc3ViKGppYW5zaGlQb3MpO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaURpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gaWYoSXNEZWJ1Zyl7XHJcbiAgICAgICAgICAgIC8vICAgICBpZih0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkhlcm9fS3VhbmdaaGFuU2hpX0RhWmhhbykpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlKz0wLjU7XHJcbiAgICAgICAgICAgIC8vICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRnVUb3UoamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCxqaWFuc2hpRGlyKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0taU0F0dGFjayk7IFxyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGVBbmRBbmltYXRpb24oSGVyb19TdGF0ZS5hdHRhY2ssYXR0TmFtZSxmYWxzZSxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgYXR0TmFtZT1IZXJvX1N0YXRlX05hbWUuSWRsZTtcclxuICAgICAgICAgICAgaWYoc3VwZXIuaXNIYXZlQnVmZihCdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvKSl7XHJcbiAgICAgICAgICAgICAgICBhdHROYW1lPVwiSWRsZTJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGVBbmRBbmltYXRpb24oSGVyb19TdGF0ZS5pZGxlLGF0dE5hbWUsdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICB1c2VTa2lsbChwb3M6Y2MuVmVjMik6bnVtYmVyXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIDI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaShwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgLy/ok4TlipvluKfnm5HlkKxcclxuICAgICAgICBsZXQgaGVyb1Jvb3Q9Y2MuZmluZCgnQ2FudmFzL0hlcm9fUm9vdCcpOyAgICAgICAgXHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGVBbmRBbmltYXRpb24oSGVyb19TdGF0ZS5pZGxlLFwiSWRsZTJcIix0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfS1pTU2tpbGwpO1xyXG4gICAgfVxyXG4gICAgLyoq6JOE5Yqb5ZCO5Y+R5bCE5LiA5rOi566t6Zuo77yM5a+55Y2K5b6Ee+WPguaVsDF96IyD5Zu05YaF55qE5pWM5Lq65ZyoM+enkuWGhemAoOaIkDE15qyhe+WPguaVsDJ9JeS8pOWusyAqL1xyXG4gICAgc3RhcnRMYXVuY2gocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIHN1cGVyLnNldEF0dFNwaW5lU2NhbGUoKTtcclxuICAgICAgICB0aGlzLnJlc2V0R29uZ0ppSmlTaHUoKTtcclxuICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19LdWFuZ1poYW5TaGlfRGFaaGFvO1xyXG4gICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5HYWluO1xyXG4gICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9W3RoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5BY3RpdmUpXTtcclxuICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICBsZXQgYnVmZj1zdXBlci5hZGRCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vblNraWxsQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNraWxsQnVmZkRlc3RvcnkoYnVmZkRhdGE6IEJ1ZmZEYXRhKTogdm9pZCB7XHJcbiAgICAgICAgLy/kuI3og73kuK3mlq3mlLvlh7tcclxuICAgICAgICBpZih0aGlzLmdldEhlcm9TdGF0ZSgpPT1IZXJvX1N0YXRlLmlkbGUpe1xyXG4gICAgICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=