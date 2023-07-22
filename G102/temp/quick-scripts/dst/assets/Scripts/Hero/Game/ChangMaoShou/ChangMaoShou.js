
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ChangMaoShou/ChangMaoShou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c9a07pZUTFFOpBgICfpYFms', 'ChangMaoShou');
// Scripts/Hero/Game/ChangMaoShou/ChangMaoShou.ts

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
var ChangMao_1 = require("./ChangMao");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChangMaoShou = /** @class */ (function (_super) {
    __extends(ChangMaoShou, _super);
    function ChangMaoShou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_att_object = null;
        _this.cur_att_floor = 0;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    ChangMaoShou.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.chang_mao_shou_attack, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.chang_mao_shou_skill_zhuazi, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.chang_mao_shou_skill_active_1, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.chang_mao_shou_skill_active_2, 1);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    };
    ChangMaoShou.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = false;
        // let zhijing=this.hero_data.getSkillValue1(SkillType.Active)*2;
        // super.setSkillTipSize(zhijing,zhijing);
    };
    ChangMaoShou.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    ChangMaoShou.prototype.starteIdle = function () {
        this.setHeroState(HeroConfig_1.Hero_State.idle, this.cur_fangxiang);
    };
    //---------------------------------------------攻击-------------------------------------------------
    /**暴击时产生100*200锥形范围的溅射效果，受攻击的敌人和被溅射的人额外受到{参数1}%伤害 */
    ChangMaoShou.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    ChangMaoShou.prototype.createMao = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(ChangMao_1.default).init(id, speed, dir, gjData);
        return node;
    };
    /**每次普通攻击有{参数1}%几率改为射出一波箭雨，箭雨含{参数2}支箭，每支箭造成{参数3}%伤害 */
    ChangMaoShou.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.startAttack(monster);
    };
    ChangMaoShou.prototype.startAttack = function (enemyNode) {
        var _this = this;
        this.is_can_gongji = false;
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            //正中心
            var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            if (_this.isHaveBuff(HeroConfig_1.BuffId.Hero_ChangMaoShow_GongSu)) {
                if (_this.hero_data.ExclusiveWeaponSkillValue_1 && _this.hero_data.ExclusiveWeaponSkillValue_1 > 0) {
                    //专武增伤
                    gjData.hero_data.all_increase_damage += _this.hero_data.ExclusiveWeaponSkillValue_1;
                }
            }
            _this.createMao(GameEffectsManager_1.GameEffectId.chang_mao_shou_attack, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ChangmaoshouAttack);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, HeroConfig_1.GongJi_FangXiang.zhong, [data], function () {
            _super.prototype.setHeroState.call(_this, HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        });
    };
    ChangMaoShou.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 2;
    };
    ChangMaoShou.prototype.startSelfXuLi = function (pos) {
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
    /**加攻速 */
    ChangMaoShou.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        this.resetGongJiJiShu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ChangmaoshouAttack);
        var buffData = new BuffData_1.BuffData();
        buffData.buff_id = HeroConfig_1.BuffId.Hero_ChangMaoShow_GongSu;
        buffData.buff_type = HeroConfig_1.BuffType.Gain;
        buffData.buff_value = [this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active)];
        buffData.remain_time = 6;
        buffData.game_effect_id = GameEffectsManager_1.GameEffectId.chang_mao_shou_skill_active_1;
        buffData.fade_time = 1;
        _super.prototype.addBuff.call(this, buffData);
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    ChangMaoShou = __decorate([
        ccclass
    ], ChangMaoShou);
    return ChangMaoShou;
}(Hero_1.default));
exports.default = ChangMaoShou;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQ2hhbmdNYW9TaG91XFxDaGFuZ01hb1Nob3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQXNEO0FBQ3RELGlFQUE0RDtBQUM1RCx1RUFBaUU7QUFDakUsMkRBQXNEO0FBQ3RELG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0MsNERBQTREO0FBQzVELGdFQUEyRDtBQUUzRCx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUEySDtBQUMzSCx1Q0FBa0M7QUFFNUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQUk7SUFBOUM7UUFBQSxxRUF5SUM7UUF2SUcsb0JBQWMsR0FBUyxJQUFJLENBQUM7UUFDNUIsbUJBQWEsR0FBUSxDQUFDLENBQUM7O0lBc0kzQixDQUFDO0lBcElELCtGQUErRjtJQUMzRiw2QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLDJCQUEyQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsNkJBQTZCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyw2QkFBNkIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLElB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QUNqQyxRQUFRLENBQUMsVUFBVSxHQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxjQUFjLEdBQUMsaUNBQVksQ0FBQyw2QkFBNkIsQ0FBQztRQUNuRSxRQUFRLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQztRQUNyQixpQkFBTSxPQUFPLFlBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEIsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQXhJZ0IsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXlJaEM7SUFBRCxtQkFBQztDQXpJRCxBQXlJQyxDQXpJeUMsY0FBSSxHQXlJN0M7a0JBeklvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi8uLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuLi9IZXJvXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEdvbmdKaV9GYW5nWGlhbmcsIEhlcm9fU3RhdGUsICBTa2lsbEluZGljYXRvclR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBDaGFuZ01hbyBmcm9tIFwiLi9DaGFuZ01hb1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFuZ01hb1Nob3UgZXh0ZW5kcyBIZXJvIHtcclxuXHJcbiAgICBjdXJfYXR0X29iamVjdDpjYy5Ob2RlPW51bGw7XHJcbiAgICBjdXJfYXR0X2Zsb29yOm51bWJlcj0wO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3liqDovb0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIC8v5Yqg6L295oqA6IO95oyH56S65ZmoXHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9hdHRhY2ssMik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF96aHVhemksMik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9za2lsbF9hY3RpdmVfMSwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8yLDEpO1xyXG4gICAgICAgIHRoaXMuaXNfTG9hZExvYWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkSGl0TGlzdGVuKHRoaXMub25IaXRNb25zdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmlzX25lZWRfY2hlY2tfZGlzdGFuY2U9ZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IHpoaWppbmc9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkqMjtcclxuICAgICAgICAvLyBzdXBlci5zZXRTa2lsbFRpcFNpemUoemhpamluZyx6aGlqaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+agueaNruS4iuS4queKtuaAgeWIpOaWremcgOimgeWBmuS7gOS5iFxyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0ZUlkbGUoKXtcclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKuaatOWHu+aXtuS6p+eUnzEwMCoyMDDplKXlvaLojIPlm7TnmoTmuoXlsITmlYjmnpzvvIzlj5fmlLvlh7vnmoTmlYzkurrlkozooqvmuoXlsITnmoTkurrpop3lpJblj5fliLB75Y+C5pWwMX0l5Lyk5a6zICovXHJcbiAgICBvbkhpdE1vbnN0ZXIoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQ3JpdDpib29sZWFuLG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWFvKGlkOkdhbWVFZmZlY3RJZCxqaWFuc2hpUG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIsZ2pEYXRhOkdvbmdKaURhdGEpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQ2hhbmdNYW8pLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKuavj+asoeaZrumAmuaUu+WHu+aciXvlj4LmlbAxfSXlh6DnjofmlLnkuLrlsITlh7rkuIDms6Lnrq3pm6jvvIznrq3pm6jlkKt75Y+C5pWwMn3mlK/nrq3vvIzmr4/mlK/nrq3pgKDmiJB75Y+C5pWwM30l5Lyk5a6zICovXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0YWNrKGVuZW15Tm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTsgICAgICAgIFxyXG4gICAgICAgIGxldCBkYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBkYXRhLm5hbWU9XCJBdHRhY2tcIjtcclxuICAgICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5q2j5Lit5b+DXHJcbiAgICAgICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSxTa2lsbFR5cGUuTnVsbCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNIYXZlQnVmZihCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfR29uZ1N1KSl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzEmJnRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+S4k+atpuWinuS8pFxyXG4gICAgICAgICAgICAgICAgICAgIGdqRGF0YS5oZXJvX2RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSs9dGhpcy5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWFvKEdhbWVFZmZlY3RJZC5jaGFuZ19tYW9fc2hvdV9hdHRhY2ssamlhbnNoaVBvcyx0aGlzLmJ1bGxldF9zcGVlZCxqaWFuc2hpRGlyLGdqRGF0YSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9DaGFuZ21hb3Nob3VBdHRhY2spO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2RhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIHJldHVybiAyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2VsZlh1TGkocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIC8v6JOE5Yqb5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTsgICAgICAgIFxyXG4gICAgICAgIC8v5Y+R5bCE5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGZhc2hlRGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZmFzaGVEYXRhLm5hbWU9XCJGYVNoZVwiO1xyXG4gICAgICAgIGZhc2hlRGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAvL+WPr+S7peWPkeWwhFxyXG4gICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRUaW1lU3RvcChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQ9aGVyb1Jvb3Q7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXg9MjtcclxuICAgICAgICAgICAgdGhpcy5zdGFydExhdW5jaChwb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iLsembhOWKqOS9nOaSreaUvlxyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuc2tpbGwsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyxbZmFzaGVEYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICAvL+WKqOS9nOWujOavleWQjueKtuaAgei/mOaYr+aKgOiDveeKtuaAge+8jOWKqOeUu+imgeaSreaUvuW+heacuueahFxyXG4gICAgICAgICAgICB0aGlzLnJlc2V0R29uZ0ppSmlTaHUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPUppYVN1O1xyXG4gICAgfVxyXG4gICAgLyoq5Yqg5pS76YCfICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9DaGFuZ21hb3Nob3VBdHRhY2spOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X0dvbmdTdTtcclxuICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuR2FpbjtcclxuICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKV07XHJcbiAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NjtcclxuICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQuY2hhbmdfbWFvX3Nob3Vfc2tpbGxfYWN0aXZlXzE7XHJcbiAgICAgICAgYnVmZkRhdGEuZmFkZV90aW1lPTE7XHJcbiAgICAgICAgc3VwZXIuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXNTa2lsbFN0YXRlKGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iXX0=