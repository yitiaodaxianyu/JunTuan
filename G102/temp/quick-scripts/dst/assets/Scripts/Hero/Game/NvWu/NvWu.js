
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/NvWu/NvWu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9f32549YOBAsqzBBvPMPPxo', 'NvWu');
// Scripts/Hero/Game/NvWu/NvWu.ts

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
var BuffData_1 = require("../BuffData");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var NvWuDan_1 = require("./NvWuDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NvWu = /** @class */ (function (_super) {
    __extends(NvWu, _super);
    function NvWu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**治疗计数 */
        _this.zhiliao_jishu = 0;
        _this.zhiliao_time = 0;
        _this.cur_release_skill = HeroConfig_1.SkillType.Null;
        return _this;
    }
    NvWu.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.nvwu_attack_bullect, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.nvwu_active_skill, 1);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addGameWinListen(this.resetSkill);
    };
    NvWu.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = false;
        _super.prototype.setSkillTipSize.call(this, 520, 520);
        this.zhiliao_time = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
    };
    NvWu.prototype.resetSkill = function () {
        this.zhiliao_jishu = 0;
    };
    NvWu.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击----------------------------------------------
    NvWu.prototype.createNvWuDan = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(NvWuDan_1.default).init(id, speed, dir, gjData);
    };
    NvWu.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    NvWu.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_NWAttack);
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            _this.createNvWuDan(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
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
    NvWu.prototype.useSkill = function (pos) {
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
    NvWu.prototype.startSelfXuLi = function (pos) {
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
    /**对260半径范围内的敌人造成{参数1}%伤害并施加{参数2}层中毒和{参数3}%的重伤效果，持续5秒 */
    NvWu.prototype.startLaunch = function (pos) {
        _super.prototype.setAttSpineScale.call(this);
        var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, pos, 260);
        if (monsters) {
            //伤害系数
            var damageData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active));
            //重伤值
            var zsValue = this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Active);
            //减攻速
            var exGs = 0;
            var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
            if (ex1 && ex1 > 0) {
                exGs = ex1;
            }
            //毒数据
            var duData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, 0, this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1));
            duData.continuous_damage_rate = this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1);
            ;
            for (var i = 0; i < monsters.length; i++) {
                var monsterTTs = monsters[i].getComponent(Monster_1.default);
                //立即造成参数2伤害
                var data = monsterTTs.beFlashInjured(damageData);
                if (data.getDamageNum() > 0) {
                    GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_attack_bullect_hit, monsterTTs.getCenterPos());
                    if (!data.is_die) {
                        var buffData = new BuffData_1.BuffData();
                        buffData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_Skill1_Zhongdu;
                        buffData.buff_type = HeroConfig_1.BuffType.Normal;
                        buffData.remain_time = 5;
                        buffData.add_floor = this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active);
                        buffData.max_floor = 6;
                        buffData.damage_jiange_time = 1;
                        monsterTTs.addDeBuff(buffData, duData);
                        //重伤buff
                        var zsData = new BuffData_1.BuffData();
                        zsData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_Skill1_ZhongShang;
                        zsData.buff_type = HeroConfig_1.BuffType.SeriouslyInjured;
                        zsData.remain_time = 5;
                        zsData.buff_value = [zsValue];
                        monsterTTs.addDeBuff(zsData, null);
                        if (exGs > 0) {
                            //专武的减攻速
                            var gsData = new BuffData_1.BuffData();
                            gsData.buff_id = HeroConfig_1.BuffId.Hero_NvWu_ExSkill_JianGongSu;
                            gsData.buff_type = HeroConfig_1.BuffType.Normal;
                            gsData.remain_time = 5;
                            gsData.buff_value = [exGs];
                            monsterTTs.addDeBuff(gsData, null);
                        }
                    }
                }
            }
        }
        var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.nvwu_active_skill, pos);
        node.scale = 3;
        SkillManager_1.default.getInstance().setIsSkillState(false);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_NWSkill);
    };
    NvWu = __decorate([
        ccclass
    ], NvWu);
    return NvWu;
}(Hero_1.default));
exports.default = NvWu;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTnZXdVxcTnZXdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBK0Q7QUFDL0QsaUVBQTREO0FBQzVELHVFQUFvRjtBQUNwRiwyREFBc0Q7QUFFdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUszRCx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUE2SDtBQUM3SCxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQUk7SUFBdEM7UUFBQSxxRUE4S0M7UUE3S0csVUFBVTtRQUNWLG1CQUFhLEdBQVEsQ0FBQyxDQUFDO1FBQ3ZCLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLHVCQUFpQixHQUFXLHNCQUFTLENBQUMsSUFBSSxDQUFDOztJQTBLL0MsQ0FBQztJQXhLRyxxQkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHVCQUF1QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFl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Q0FBQyxDQUFDO3lCQUNyQztxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxJQUFJLElBQUksR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25HLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ2Isc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQTVLZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQThLeEI7SUFBRCxXQUFDO0NBOUtELEFBOEtDLENBOUtpQyxjQUFJLEdBOEtyQztrQkE5S29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlLCBJc0RlYnVnLCBKaWFTdSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi4vSGVyb1wiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBHb25nSmlfRmFuZ1hpYW5nLCBIZXJvX1N0YXRlLCBIZXJvX1R5cGUsIFNoaWVsZFR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBOdld1RGFuIGZyb20gXCIuL052V3VEYW5cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnZXdSBleHRlbmRzIEhlcm8ge1xyXG4gICAgLyoq5rK755aX6K6h5pWwICovXHJcbiAgICB6aGlsaWFvX2ppc2h1Om51bWJlcj0wO1xyXG4gICAgemhpbGlhb190aW1lOm51bWJlcj0wO1xyXG4gICAgY3VyX3JlbGVhc2Vfc2tpbGw6U2tpbGxUeXBlPVNraWxsVHlwZS5OdWxsOyBcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIC8v5Yqg6L295oqA6IO95oyH56S65ZmoXHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5udnd1X2F0dGFja19idWxsZWN0LDIpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubnZ3dV9hdHRhY2tfYnVsbGVjdF9oaXQsMik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5udnd1X2FjdGl2ZV9za2lsbCwxKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkU2tpbGxMaXN0ZW4odGhpcy51c2VTa2lsbCk7XHJcbiAgICAgICAgdGhpcy5hZGRBdHRhY2tMaXN0ZW4odGhpcy5ub3JtYWxBdHRhY2spO1xyXG4gICAgICAgIHRoaXMuYWRkWHVhbll1bkxpc3Rlbih0aGlzLm9uWHVhbll1blJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5hZGRHYW1lV2luTGlzdGVuKHRoaXMucmVzZXRTa2lsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPWZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnNldFNraWxsVGlwU2l6ZSg1MjAsNTIwKTtcclxuICAgICAgICB0aGlzLnpoaWxpYW9fdGltZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuUGFzc2l2ZV8xKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFNraWxsKCl7XHJcbiAgICAgICAgdGhpcy56aGlsaWFvX2ppc2h1PTA7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uWHVhbll1blJlc3VsdChpc1h1YW5ZdW46Ym9vbGVhbil7XHJcbiAgICAgICAgaWYoaXNYdWFuWXVuKXtcclxuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBcclxuXHJcbiAgICBjcmVhdGVOdld1RGFuKGlkOkdhbWVFZmZlY3RJZCxqaWFuc2hpUG9zOmNjLlZlYzIsc3BlZWQ6bnVtYmVyLGRpcjpudW1iZXIsZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIGxldCBub2RlPUZpZ2h0aW5nTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGlkLGppYW5zaGlQb3MpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KE52V3VEYW4pLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICB9ICAgXHJcblxyXG5cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRGYW5nWGlhbmdCeVBvcyhlbmVteVBvcyk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTldBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaVBvcz10aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWVuZW15UG9zLnN1YihqaWFuc2hpUG9zKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlEaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLFNraWxsVHlwZS5OdWxsKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVOdld1RGFuKEdhbWVFZmZlY3RJZC5udnd1X2F0dGFja19idWxsZWN0LGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssZmFuZ3hpYW5nLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTsgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5oqA6IO9LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgICBcclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICAvKirlpoLmnpzmnInmjqfliLbmioDog70gKi9cclxuICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkocG9zKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfcmVsZWFzZV9za2lsbCE9U2tpbGxUeXBlLk51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2godGhpcy5jdXJfcmVsZWFzZV9za2lsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2VsZlh1TGkocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIC8v6JOE5Yqb5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGhlcm9Sb290PWNjLmZpbmQoJ0NhbnZhcy9IZXJvX1Jvb3QnKTtcclxuICAgICAgICAvL+WPkeWwhOW4p+ebkeWQrFxyXG4gICAgICAgIGxldCBmYXNoZURhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGZhc2hlRGF0YS5uYW1lPVwiRmFTaGVcIjtcclxuICAgICAgICBmYXNoZURhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0VGltZVN0b3AoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50PWhlcm9Sb290O1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PTI7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRMYXVuY2gocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/oi7Hpm4TliqjkvZzmkq3mlL5cclxuICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLnNraWxsLEdvbmdKaV9GYW5nWGlhbmcuemhvbmcsW2Zhc2hlRGF0YV0sKCk9PntcclxuICAgICAgICAgICAgLy/liqjkvZzlrozmr5XlkI7nirbmgIHov5jmmK/mioDog73nirbmgIHvvIzliqjnlLvopoHmkq3mlL7lvoXmnLrnmoRcclxuICAgICAgICAgICAgdGhpcy5yZXNldEdvbmdKaUppU2h1KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTsgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKirlr7kyNjDljYrlvoTojIPlm7TlhoXnmoTmlYzkurrpgKDmiJB75Y+C5pWwMX0l5Lyk5a6z5bm25pa95Yqge+WPguaVsDJ95bGC5Lit5q+S5ZKMe+WPguaVsDN9JeeahOmHjeS8pOaViOaenO+8jOaMgee7rTXnp5IgKi9cclxuICAgIHN0YXJ0TGF1bmNoKHBvczpjYy5WZWMyKXtcclxuICAgICAgICBzdXBlci5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJzPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TW9uc3RlcnNGb3JDZW50ZXJQb3MoLTEscG9zLDI2MCk7XHJcbiAgICAgICAgaWYobW9uc3RlcnMpe1xyXG4gICAgICAgICAgICAvL+S8pOWus+ezu+aVsFxyXG4gICAgICAgICAgICBsZXQgZGFtYWdlRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgICAgIC8v6YeN5Lyk5YC8XHJcbiAgICAgICAgICAgIGxldCB6c1ZhbHVlPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgICAgICAvL+WHj+aUu+mAn1xyXG4gICAgICAgICAgICBsZXQgZXhHcz0wO1xyXG4gICAgICAgICAgICBsZXQgZXgxPXRoaXMuaGVyb19kYXRhLkV4Y2x1c2l2ZVdlYXBvblNraWxsVmFsdWVfMTtcclxuICAgICAgICAgICAgaWYoZXgxJiZleDE+MCl7XHJcbiAgICAgICAgICAgICAgICBleEdzPWV4MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+avkuaVsOaNrlxyXG4gICAgICAgICAgICBsZXQgZHVEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSxTa2lsbFR5cGUuUGFzc2l2ZV8yLDAsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMSkpOyBcclxuICAgICAgICAgICAgZHVEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTMoU2tpbGxUeXBlLlBhc3NpdmVfMSk7OyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPG1vbnN0ZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVyVFRzPW1vbnN0ZXJzW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgIC8v56uL5Y2z6YCg5oiQ5Y+C5pWwMuS8pOWus1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3RlclRUcy5iZUZsYXNoSW5qdXJlZChkYW1hZ2VEYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm52d3VfYXR0YWNrX2J1bGxlY3RfaGl0LG1vbnN0ZXJUVHMuZ2V0Q2VudGVyUG9zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFkYXRhLmlzX2RpZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19Odld1X1NraWxsMV9aaG9uZ2R1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5hZGRfZmxvb3I9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLm1heF9mbG9vcj02O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5kYW1hZ2VfamlhbmdlX3RpbWU9MTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRUcy5hZGREZUJ1ZmYoYnVmZkRhdGEsZHVEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ph43kvKRidWZmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB6c0RhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpzRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX052V3VfU2tpbGwxX1pob25nU2hhbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpzRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuU2VyaW91c2x5SW5qdXJlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgenNEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpzRGF0YS5idWZmX3ZhbHVlPVt6c1ZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRUcy5hZGREZUJ1ZmYoenNEYXRhLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihleEdzPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuJPmrabnmoTlh4/mlLvpgJ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBnc0RhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnc0RhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19Odld1X0V4U2tpbGxfSmlhbkdvbmdTdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdzRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuTm9ybWFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3NEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnc0RhdGEuYnVmZl92YWx1ZT1bZXhHc107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyVFRzLmFkZERlQnVmZihnc0RhdGEsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm52d3VfYWN0aXZlX3NraWxsLHBvcyk7XHJcbiAgICAgICAgbm9kZS5zY2FsZT0zO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX05XU2tpbGwpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=