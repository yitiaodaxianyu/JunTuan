
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/DeLuYi/DeLuYi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58578ecLi9Mz6G5DIp/2PBn', 'DeLuYi');
// Scripts/Hero/Game/DeLuYi/DeLuYi.ts

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
var SuperManTeng_1 = require("./SuperManTeng");
var WuNvDan_1 = require("./WuNvDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WuNv = /** @class */ (function (_super) {
    __extends(WuNv, _super);
    function WuNv() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WuNv.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        //super.loadZhiShiQi("manteng_zhishi_qi",SkillIndicatorType.target);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.deluyi_att, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.deluyi_att_hit, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.deluyi_att_baoji, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.deluyi_skill_manteng, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.deluyi_active_skill_hit, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.deluyi_active_skill, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.deluyi_skill_beidong_create, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.xuanyun, 4);
        this.is_LoadLoad = true;
        //super.addLoadByGameEffectId(GameEffectId.monster_zhongdu,4);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
    };
    WuNv.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = true;
        _super.prototype.setSkillTipSize.call(this, 1680, 384);
        if (this.hero_data.ExclusiveWeaponSkillValue_1 && this.hero_data.ExclusiveWeaponSkillValue_1 > 0) {
            SkillManager_1.default.getInstance().setDeLuYiEx(this.hero_data.ExclusiveWeaponSkillValue_1);
        }
        // if(IsDebug){
        //     SkillManager.getInstance().setDeLuYiEx(10)
        // }
    };
    WuNv.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击----------------------------------------------
    /**暴击时对{参数1}范围内的敌人额外造成{参数2}%伤害并造成1秒眩晕效果 */
    WuNv.prototype.onHitMonster = function (damageType, isCrit, monster) {
        if (damageType == HeroConfig_1.DamageType.Normal) {
            var monsterTsT = monster.getComponent(Monster_1.default);
            //圆形眩晕
            var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, monsterTsT.getCenterPos(), this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1));
            if (monsters) {
                var fanweiData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_1, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1));
                var _loop_1 = function (i) {
                    var monsterTs = monsters[i].getComponent(Monster_1.default);
                    var data = monsterTs.beFlashInjured(fanweiData);
                    if (!data.is_die && data.getDamageNum() > 0) {
                        if (isCrit) {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_att_baoji, monsterTs.getCenterPos());
                        }
                        else {
                            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_att_hit, monsterTs.getCenterPos());
                        }
                        /**概率眩晕 */
                        var rate = this_1.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1);
                        if (monsterTs.getStrengthType() != MonsterData_1.StrengthType.Boss && Math.random() < rate) {
                            var buffData = new BuffData_1.BuffData();
                            buffData.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                            buffData.buff_type = HeroConfig_1.BuffType.Vertigo;
                            buffData.buff_value = [0];
                            buffData.remain_time = 0.5;
                            buffData.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                            monsterTs.addDeBuff(buffData, fanweiData);
                            //蔓藤特效
                            var node_1 = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_skill_manteng, this_1.node.getPosition());
                            node_1.getComponent(cc.Animation).play();
                            cc.tween(node_1).delay(buffData.remain_time).call(function () {
                                GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.deluyi_skill_manteng, node_1);
                            }).start();
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0; i < monsters.length; i++) {
                    _loop_1(i);
                }
            }
        }
    };
    WuNv.prototype.createWuNvDan = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(WuNvDan_1.default).init(id, speed, dir, gjData);
    };
    WuNv.prototype.createSuperManTeng = function (id, jianshiPos, speed, dir, gjData) {
        var node = GroundManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(SuperManTeng_1.default).init(id, speed, dir, gjData);
        return node;
    };
    WuNv.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    WuNv.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_FashiAttack);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            // let rate=this.hero_data.getSkillValue1(SkillType.Passive_1);
            // if(rate&&Math.random()<rate){
            //     let gjData=super.getGongJiData(DamageType.Skill,true,this.hero_data.getSkillValue2(SkillType.Passive_1),0.5);//0.5是专武的
            //     let offsetPos=enemyPos.sub(this.node.getPosition());
            //     let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            //     this.createManTeng(GameEffectId.nvwu_att_manteng_bg,this.node.getPosition(),this.bullet_speed,jianshiDir,gjData);
            // }else{
            //     let jianshiPos=this.getCreateBulletPos();
            //     let offsetPos=enemyPos.sub(jianshiPos);
            //     let jianshiDir=Math.atan2(offsetPos.y,offsetPos.x);
            //     let gjData=super.getGongJiData(DamageType.Normal,true);
            //     this.createWuNvDan(GameEffectId.nvwu_att,jianshiPos,this.bullet_speed,jianshiDir,gjData);
            // }
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            _this.createWuNvDan(GameEffectsManager_1.GameEffectId.deluyi_att, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
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
    WuNv.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi(pos);
        }, this.node);
        return 0;
    };
    WuNv.prototype.startSelfXuLi = function (pos) {
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
    /**在目标区域的左右两边各召唤一阵藤蔓冲击波，藤蔓冲击波会向屏幕另一端滚动，途中速度会逐渐加快，对触碰到的敌人造成{参数1}%伤害，并造成{参数2}秒眩晕效果 */
    WuNv.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_FashiSkill1);
        var initYY = pos.y - 192 + 192 / 2;
        var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active));
        //右边
        for (var i = 0; i < 2; i++) {
            var xx = 350;
            var yy = initYY + i * 192;
            var mt = this.createSuperManTeng(GameEffectsManager_1.GameEffectId.deluyi_active_skill, cc.v2(xx, yy), this.bullet_speed / 2, Math.PI, gjData);
            var bc = mt.getComponent(cc.BoxCollider);
            bc.enabled = i == 1;
            bc.offset = cc.v2(-96, 0);
        }
        //左边
        for (var i = 0; i < 2; i++) {
            var xx = -350;
            var yy = initYY + i * 192;
            var mt = this.createSuperManTeng(GameEffectsManager_1.GameEffectId.deluyi_active_skill, cc.v2(xx, yy), this.bullet_speed / 2, 0, gjData);
            var bc = mt.getComponent(cc.BoxCollider);
            bc.enabled = i == 1;
            bc.offset = cc.v2(96, 0);
        }
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    WuNv = __decorate([
        ccclass
    ], WuNv);
    return WuNv;
}(Hero_1.default));
exports.default = WuNv;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcRGVMdVlpXFxEZUx1WWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQStEO0FBQy9ELGlFQUE0RDtBQUM1RCx1RUFBb0Y7QUFDcEYsNkRBQXdEO0FBQ3hELDJEQUFzRDtBQUN0RCxvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLDREQUEwRTtBQUMxRSxrRUFBNkQ7QUFDN0QsZ0VBQTJEO0FBRTNELHdDQUF1QztBQUN2QyxnQ0FBMkI7QUFDM0IsNENBQW9HO0FBQ3BHLCtDQUEwQztBQUMxQyxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQUk7SUFBdEM7O0lBeU1BLENBQUM7SUF0TUcscUJBQU0sR0FBTjtRQUVJLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1FBQ2YsU0FBUztRQUNULG9FQUFvRTtRQUNwRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsb0JBQW9CLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyx1QkFBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLG1CQUFtQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMs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QUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQXhNZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXlNeEI7SUFBRCxXQUFDO0NBek1ELEFBeU1DLENBek1pQyxjQUFJLEdBeU1yQztrQkF6TW9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlLCBJc0RlYnVnLCBKaWFTdSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZyxIZXJvX1N0YXRlLFNraWxsVHlwZSx9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBTdXBlck1hblRlbmcgZnJvbSBcIi4vU3VwZXJNYW5UZW5nXCI7XHJcbmltcG9ydCBXdU52RGFuIGZyb20gXCIuL1d1TnZEYW5cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3VOdiBleHRlbmRzIEhlcm8ge1xyXG4gICAgXHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICAvL+WKoOi9veaKgOiDveaMh+ekuuWZqFxyXG4gICAgICAgIC8vc3VwZXIubG9hZFpoaVNoaVFpKFwibWFudGVuZ196aGlzaGlfcWlcIixTa2lsbEluZGljYXRvclR5cGUudGFyZ2V0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmRlbHV5aV9hdHQsMSk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5kZWx1eWlfYXR0X2hpdCwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmRlbHV5aV9hdHRfYmFvamksNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5kZWx1eWlfc2tpbGxfbWFudGVuZyw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmRlbHV5aV9hY3RpdmVfc2tpbGxfaGl0LDQpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuZGVsdXlpX2FjdGl2ZV9za2lsbCw0KTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLmRlbHV5aV9za2lsbF9iZWlkb25nX2NyZWF0ZSwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnh1YW55dW4sNCk7XHJcbiAgICAgICAgdGhpcy5pc19Mb2FkTG9hZD10cnVlO1xyXG4gICAgICAgIC8vc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3pob25nZHUsNCk7XHJcbiAgICAgICAgdGhpcy5hZGRTa2lsbExpc3Rlbih0aGlzLnVzZVNraWxsKTtcclxuICAgICAgICB0aGlzLmFkZEF0dGFja0xpc3Rlbih0aGlzLm5vcm1hbEF0dGFjayk7XHJcbiAgICAgICAgdGhpcy5hZGRYdWFuWXVuTGlzdGVuKHRoaXMub25YdWFuWXVuUmVzdWx0KTtcclxuICAgICAgICB0aGlzLmFkZEhpdExpc3Rlbih0aGlzLm9uSGl0TW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmlzX25lZWRfY2hlY2tfZGlzdGFuY2U9dHJ1ZTtcclxuICAgICAgICBzdXBlci5zZXRTa2lsbFRpcFNpemUoMTY4MCwzODQpO1xyXG4gICAgICAgIGlmKHRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMSYmdGhpcy5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXREZUx1WWlFeCh0aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXREZUx1WWlFeCgxMClcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirmmrTlh7vml7blr7l75Y+C5pWwMX3ojIPlm7TlhoXnmoTmlYzkurrpop3lpJbpgKDmiJB75Y+C5pWwMn0l5Lyk5a6z5bm26YCg5oiQMeenkuecqeaZleaViOaenCAqL1xyXG4gICAgb25IaXRNb25zdGVyKGRhbWFnZVR5cGU6RGFtYWdlVHlwZSxpc0NyaXQ6Ym9vbGVhbixtb25zdGVyOmNjLk5vZGUpe1xyXG4gICAgICAgIGlmKGRhbWFnZVR5cGU9PURhbWFnZVR5cGUuTm9ybWFsKXtcclxuICAgICAgICAgICAgbGV0IG1vbnN0ZXJUc1Q9bW9uc3Rlci5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgIC8v5ZyG5b2i55yp5pmVXHJcbiAgICAgICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLG1vbnN0ZXJUc1QuZ2V0Q2VudGVyUG9zKCksdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSkpO1xyXG4gICAgICAgICAgICBpZihtb25zdGVycyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmFud2VpRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnN0ZXJUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRzLmJlRmxhc2hJbmp1cmVkKGZhbndlaURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmlzX2RpZSAmJiBkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpc0NyaXQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmRlbHV5aV9hdHRfYmFvamksbW9uc3RlclRzLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuZGVsdXlpX2F0dF9oaXQsbW9uc3RlclRzLmdldENlbnRlclBvcygpKTsgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKirmpoLnjofnnKnmmZUgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJUcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3MmJk1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX1h1YW5ZdW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9WzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9MC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLnh1YW55dW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLGZhbndlaURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/olJPol6TnibnmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5kZWx1eWlfc2tpbGxfbWFudGVuZyx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLmRlbGF5KGJ1ZmZEYXRhLnJlbWFpbl90aW1lKS5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZGVzdHJveUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5kZWx1eWlfc2tpbGxfbWFudGVuZyxub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVd1TnZEYW4oaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgbGV0IG5vZGU9RmlnaHRpbmdNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoV3VOdkRhbikuaW5pdChpZCxzcGVlZCxkaXIsZ2pEYXRhKTtcclxuICAgIH0gICBcclxuXHJcbiAgICBjcmVhdGVTdXBlck1hblRlbmcoaWQ6R2FtZUVmZmVjdElkLGppYW5zaGlQb3M6Y2MuVmVjMixzcGVlZDpudW1iZXIsZGlyOm51bWJlcixnakRhdGE6R29uZ0ppRGF0YSk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgbm9kZT1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoaWQsamlhbnNoaVBvcyk7XHJcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoU3VwZXJNYW5UZW5nKS5pbml0KGlkLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRGYW5nWGlhbmdCeVBvcyhlbmVteVBvcyk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Zhc2hpQXR0YWNrKTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAvLyBsZXQgcmF0ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgICAgICAgICAgLy8gaWYocmF0ZSYmTWF0aC5yYW5kb20oKTxyYXRlKXtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLHRydWUsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMSksMC41KTsvLzAuNeaYr+S4k+atpueahFxyXG4gICAgICAgICAgICAvLyAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGppYW5zaGlEaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNyZWF0ZU1hblRlbmcoR2FtZUVmZmVjdElkLm52d3VfYXR0X21hbnRlbmdfYmcsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCksdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBqaWFuc2hpUG9zPXRoaXMuZ2V0Q3JlYXRlQnVsbGV0UG9zKCk7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgb2Zmc2V0UG9zPWVuZW15UG9zLnN1YihqaWFuc2hpUG9zKTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuTm9ybWFsLHRydWUpO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jcmVhdGVXdU52RGFuKEdhbWVFZmZlY3RJZC5udnd1X2F0dCxqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBsZXQgamlhbnNoaVBvcz10aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWVuZW15UG9zLnN1YihqaWFuc2hpUG9zKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlEaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLFNraWxsVHlwZS5OdWxsKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVXdU52RGFuKEdhbWVFZmZlY3RJZC5kZWx1eWlfYXR0LGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpOyAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfZG91YmxlX2F0dGFjayl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Tm9ybWFsQXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssZmFuZ3hpYW5nLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDvS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgXHJcbiAgICB1c2VTa2lsbChwb3M6Y2MuVmVjMik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVsZWFzZVNraWxsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTZWxmWHVMaShwb3MpO1xyXG4gICAgICAgIH0sdGhpcy5ub2RlKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKHBvczpjYy5WZWMyKXtcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7ICAgICAgICBcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgIH1cclxuICAgIC8qKuWcqOebruagh+WMuuWfn+eahOW3puWPs+S4pOi+ueWQhOWPrOWUpOS4gOmYteiXpOiUk+WGsuWHu+azou+8jOiXpOiUk+WGsuWHu+azouS8muWQkeWxj+W5leWPpuS4gOerr+a7muWKqO+8jOmAlOS4remAn+W6puS8mumAkOa4kOWKoOW/q++8jOWvueinpueisOWIsOeahOaVjOS6uumAoOaIkHvlj4LmlbAxfSXkvKTlrrPvvIzlubbpgKDmiJB75Y+C5pWwMn3np5LnnKnmmZXmlYjmnpwgKi9cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBzdXBlci5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Zhc2hpU2tpbGwxKTsgICAgICAgIFxyXG4gICAgICAgIGxldCBpbml0WVk9cG9zLnktMTkyKzE5Mi8yO1xyXG4gICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5BY3RpdmUsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgICAgIC8v5Y+z6L65XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8MjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHh4PTM1MDtcclxuICAgICAgICAgICAgbGV0IHl5PWluaXRZWStpKjE5MjtcclxuICAgICAgICAgICAgbGV0IG10PXRoaXMuY3JlYXRlU3VwZXJNYW5UZW5nKEdhbWVFZmZlY3RJZC5kZWx1eWlfYWN0aXZlX3NraWxsLGNjLnYyKHh4LHl5KSx0aGlzLmJ1bGxldF9zcGVlZC8yLE1hdGguUEksZ2pEYXRhKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGJjPW10LmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcik7XHJcbiAgICAgICAgICAgIGJjLmVuYWJsZWQ9aT09MTtcclxuICAgICAgICAgICAgYmMub2Zmc2V0PWNjLnYyKC05NiwwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lt6bovrlcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwyOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgeHg9LTM1MDtcclxuICAgICAgICAgICAgbGV0IHl5PWluaXRZWStpKjE5MjtcclxuICAgICAgICAgICAgbGV0IG10PXRoaXMuY3JlYXRlU3VwZXJNYW5UZW5nKEdhbWVFZmZlY3RJZC5kZWx1eWlfYWN0aXZlX3NraWxsLGNjLnYyKHh4LHl5KSx0aGlzLmJ1bGxldF9zcGVlZC8yLDAsZ2pEYXRhKTtcclxuICAgICAgICAgICAgbGV0IGJjPW10LmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcik7XHJcbiAgICAgICAgICAgIGJjLmVuYWJsZWQ9aT09MTtcclxuICAgICAgICAgICAgYmMub2Zmc2V0PWNjLnYyKDk2LDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==