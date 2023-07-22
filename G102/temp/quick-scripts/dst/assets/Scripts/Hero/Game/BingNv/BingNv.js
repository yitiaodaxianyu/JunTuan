
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/BingNv/BingNv.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '817e4192KtAv7zDbojaBeSQ', 'BingNv');
// Scripts/Hero/Game/BingNv/BingNv.ts

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
var FullScreenDamage_1 = require("../../Skill/FullScreenDamage");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var BingNvDan_1 = require("./BingNvDan");
var BingNvWall_1 = require("./BingNvWall");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BingNv = /** @class */ (function (_super) {
    __extends(BingNv, _super);
    function BingNv() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_beidong_2 = null;
        _this.full_screen_damage = null;
        return _this;
    }
    BingNv.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        //super.loadZhiShiQi("manteng_zhishi_qi",SkillIndicatorType.target);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.bing_nv_attack, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.bing_nv_attack_hit, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill_create, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill_hit, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.xuanyun, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.bing_nv_active_skill_wall, 1);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
    };
    BingNv.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = true;
        _super.prototype.setSkillTipSize.call(this, 1680, 200);
        if (this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2)) {
            this.createFullScreenDamage();
        }
    };
    BingNv.prototype.createFullScreenDamage = function () {
        var node = cc.instantiate(this.prefab_beidong_2);
        cc.find("Canvas/Hero_Shadow_Root").addChild(node);
        node.setPosition(this.node.getPosition());
        this.full_screen_damage = node.getComponent(FullScreenDamage_1.default);
        this.full_screen_damage.init(GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill_2, 1, this.onSkillDamage2.bind(this));
    };
    BingNv.prototype.onSkillDamage2 = function () {
        var allMonsterS = MonsterManager_1.default.getInstance().node.children;
        var len = allMonsterS.length;
        for (var i = 0; i < len; i++) {
            var monster = allMonsterS[i];
            var monsterTS = monster.getComponent(Monster_1.default);
            if (monsterTS && monsterTS.isHaveDeBuffType(HeroConfig_1.BuffType.Slowdown)) {
                monsterTS.beFlashInjured(_super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2)));
            }
        }
    };
    BingNv.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    BingNv.prototype.createBingNvDan = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(BingNvDan_1.default).init(id, speed, dir, gjData);
    };
    BingNv.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    BingNv.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BNAttack);
            var rate = _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
            //特效id
            var gameEffectId = GameEffectsManager_1.GameEffectId.bing_nv_attack;
            var gjData = null;
            if (rate && Math.random() < rate) {
                gameEffectId = GameEffectsManager_1.GameEffectId.bing_nv_beidong_skill;
                gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Skill, true, HeroConfig_1.SkillType.Passive_1, _this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1));
            }
            else {
                gameEffectId = GameEffectsManager_1.GameEffectId.bing_nv_attack;
                gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            }
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            _this.createBingNvDan(gameEffectId, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
        });
    };
    //---------------------------------------------技能----------------------------------------------    
    BingNv.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 0;
    };
    BingNv.prototype.startSelfXuLi = function (pos) {
        var _this = this;
        //施法特效
        // let node=GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.bing_nv_active_skill,this.node.getPosition().add(cc.v2(42,96)),SkillManager.getInstance().node);
        // node.zIndex=4;
        // let animation=node.getComponent(cc.Animation);
        // let state=animation.play();
        // state.speed=JiaSu;
        // animation.on(cc.Animation.EventType.FINISHED,()=>{                    
        //     animation.off(cc.Animation.EventType.FINISHED);
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.bing_nv_active_skill,node);                        
        // })
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
    /**在目标区域的左右两边各召唤一阵藤蔓冲击波，藤蔓冲击波会向屏幕另一端滚动，途中速度会逐渐加快，对触碰到的敌人造成{参数1}%伤害，并造成{参数2}秒眩晕效果 */
    BingNv.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.bing_nv_active_skill_wall, pos, MonsterManager_1.default.getInstance().node);
        node.getComponent(BingNvWall_1.default).init(_super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active)), pos, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active));
        SkillManager_1.default.getInstance().setIsSkillState(false);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_BNSkill);
    };
    __decorate([
        property(cc.Prefab)
    ], BingNv.prototype, "prefab_beidong_2", void 0);
    BingNv = __decorate([
        ccclass
    ], BingNv);
    return BingNv;
}(Hero_1.default));
exports.default = BingNv;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQmluZ052XFxCaW5nTnYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQXNEO0FBQ3RELGlFQUE0RDtBQUM1RCx1RUFBb0Y7QUFDcEYsMkRBQXNEO0FBQ3RELG9EQUErQztBQUMvQyxvREFBK0M7QUFDL0MsNERBQTREO0FBQzVELGtFQUE2RDtBQUM3RCxnRUFBMkQ7QUFFM0QsaUVBQTREO0FBQzVELGdDQUEyQjtBQUMzQiw0Q0FBZ0c7QUFDaEcseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUVoQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBSTtJQUF4QztRQUFBLHFFQW1LQztRQWhLRyxzQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFFaEMsd0JBQWtCLEdBQWtCLElBQUksQ0FBQzs7SUE4SjdDLENBQUM7SUE1SkcsdUJBQU0sR0FBTjtRQUVJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsU0FBUztRQUNULG9FQUFvRTtRQUNwRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsNEJBQTRCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHlCQUF5QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsT0FB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QW1LdkM7a0JBbktvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IEZ1bGxTY3JlZW5EYW1hZ2UgZnJvbSBcIi4uLy4uL1NraWxsL0Z1bGxTY3JlZW5EYW1hZ2VcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBHb25nSmlfRmFuZ1hpYW5nLCAgSGVyb19TdGF0ZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEJpbmdOdkRhbiBmcm9tIFwiLi9CaW5nTnZEYW5cIjtcclxuaW1wb3J0IEJpbmdOdldhbGwgZnJvbSBcIi4vQmluZ052V2FsbFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaW5nTnYgZXh0ZW5kcyBIZXJvIHtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9iZWlkb25nXzI6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgZnVsbF9zY3JlZW5fZGFtYWdlOkZ1bGxTY3JlZW5EYW1hZ2U9bnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIC8v5Yqg6L295oqA6IO95oyH56S65ZmoXHJcbiAgICAgICAgLy9zdXBlci5sb2FkWmhpU2hpUWkoXCJtYW50ZW5nX3poaXNoaV9xaVwiLFNraWxsSW5kaWNhdG9yVHlwZS50YXJnZXQpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuYmluZ19udl9hdHRhY2ssMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5iaW5nX252X2F0dGFja19oaXQsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5iaW5nX252X2JlaWRvbmdfc2tpbGxfY3JlYXRlLDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuYmluZ19udl9iZWlkb25nX3NraWxsLDQpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuYmluZ19udl9iZWlkb25nX3NraWxsX2hpdCw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5iaW5nX252X2FjdGl2ZV9za2lsbF93YWxsLDEpO1xyXG4gICAgICAgIHRoaXMuaXNfTG9hZExvYWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPXRydWU7XHJcbiAgICAgICAgc3VwZXIuc2V0U2tpbGxUaXBTaXplKDE2ODAsMjAwKTtcclxuICAgICAgICBpZih0aGlzLmhlcm9fZGF0YS5nZXRJc1VubG9jayhTa2lsbFR5cGUuUGFzc2l2ZV8yKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRnVsbFNjcmVlbkRhbWFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGdWxsU2NyZWVuRGFtYWdlKCl7XHJcbiAgICAgICAgbGV0IG5vZGU9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfYmVpZG9uZ18yKTtcclxuICAgICAgICBjYy5maW5kKFwiQ2FudmFzL0hlcm9fU2hhZG93X1Jvb3RcIikuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgdGhpcy5mdWxsX3NjcmVlbl9kYW1hZ2U9bm9kZS5nZXRDb21wb25lbnQoRnVsbFNjcmVlbkRhbWFnZSk7XHJcbiAgICAgICAgdGhpcy5mdWxsX3NjcmVlbl9kYW1hZ2UuaW5pdChHYW1lRWZmZWN0SWQuYmluZ19udl9iZWlkb25nX3NraWxsXzIsMSx0aGlzLm9uU2tpbGxEYW1hZ2UyLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2tpbGxEYW1hZ2UyKCl7XHJcbiAgICAgICAgbGV0IGFsbE1vbnN0ZXJTPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICBsZXQgbGVuPWFsbE1vbnN0ZXJTLmxlbmd0aDsgICAgXHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTxsZW47IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBtb25zdGVyPWFsbE1vbnN0ZXJTW2ldO1xyXG4gICAgICAgICAgICBsZXQgbW9uc3RlclRTPW1vbnN0ZXIuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVyVFMgJiYgbW9uc3RlclRTLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuU2xvd2Rvd24pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtb25zdGVyVFMuYmVGbGFzaEluanVyZWQoc3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5QYXNzaXZlXzIsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMikpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICBpZihpc1h1YW5ZdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/moLnmja7kuIrkuKrnirbmgIHliKTmlq3pnIDopoHlgZrku4DkuYhcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCaW5nTnZEYW4oaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoQmluZ052RGFuKS5pbml0KGlkLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRGYW5nWGlhbmdCeVBvcyhlbmVteVBvcyk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQk5BdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgcmF0ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICAgICAgLy/nibnmlYhpZFxyXG4gICAgICAgICAgICBsZXQgZ2FtZUVmZmVjdElkPUdhbWVFZmZlY3RJZC5iaW5nX252X2F0dGFjaztcclxuICAgICAgICAgICAgbGV0IGdqRGF0YTpHb25nSmlEYXRhPW51bGw7XHJcbiAgICAgICAgICAgIGlmKHJhdGUmJk1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAgICAgICAgICAgICBnYW1lRWZmZWN0SWQ9R2FtZUVmZmVjdElkLmJpbmdfbnZfYmVpZG9uZ19za2lsbDtcclxuICAgICAgICAgICAgICAgIGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsdHJ1ZSxTa2lsbFR5cGUuUGFzc2l2ZV8xLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzEpKVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGdhbWVFZmZlY3RJZD1HYW1lRWZmZWN0SWQuYmluZ19udl9hdHRhY2s7XHJcbiAgICAgICAgICAgICAgICBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLFNraWxsVHlwZS5OdWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpUG9zPXRoaXMuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9ZW5lbXlQb3Muc3ViKGppYW5zaGlQb3MpO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaURpcj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVCaW5nTnZEYW4oZ2FtZUVmZmVjdElkLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mioDog70tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAgIFxyXG4gICAgdXNlU2tpbGwocG9zOmNjLlZlYzIpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaShwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgLy/mlr3ms5XnibnmlYhcclxuICAgICAgICAvLyBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5iaW5nX252X2FjdGl2ZV9za2lsbCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQoY2MudjIoNDIsOTYpKSxTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlKTtcclxuICAgICAgICAvLyBub2RlLnpJbmRleD00O1xyXG4gICAgICAgIC8vIGxldCBhbmltYXRpb249bm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICAvLyBsZXQgc3RhdGU9YW5pbWF0aW9uLnBsYXkoKTtcclxuICAgICAgICAvLyBzdGF0ZS5zcGVlZD1KaWFTdTtcclxuICAgICAgICAvLyBhbmltYXRpb24ub24oY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCwoKT0+eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGFuaW1hdGlvbi5vZmYoY2MuQW5pbWF0aW9uLkV2ZW50VHlwZS5GSU5JU0hFRCk7XHJcbiAgICAgICAgLy8gICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmRlc3Ryb3lHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYmluZ19udl9hY3RpdmVfc2tpbGwsbm9kZSk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7XHJcblxyXG5cclxuICAgIH1cclxuICAgIC8qKuWcqOebruagh+WMuuWfn+eahOW3puWPs+S4pOi+ueWQhOWPrOWUpOS4gOmYteiXpOiUk+WGsuWHu+azou+8jOiXpOiUk+WGsuWHu+azouS8muWQkeWxj+W5leWPpuS4gOerr+a7muWKqO+8jOmAlOS4remAn+W6puS8mumAkOa4kOWKoOW/q++8jOWvueinpueisOWIsOeahOaVjOS6uumAoOaIkHvlj4LmlbAxfSXkvKTlrrPvvIzlubbpgKDmiJB75Y+C5pWwMn3np5LnnKnmmZXmlYjmnpwgKi9cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBzdXBlci5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQuYmluZ19udl9hY3RpdmVfc2tpbGxfd2FsbCxwb3MsTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChCaW5nTnZXYWxsKS5pbml0KHN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuQWN0aXZlLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpKSxwb3MsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0JOU2tpbGwpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19