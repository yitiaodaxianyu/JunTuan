
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
        this.is_LoadLoad = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTnZXdVxcTnZXdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBK0Q7QUFDL0QsaUVBQTREO0FBQzVELHVFQUFvRjtBQUNwRiwyREFBc0Q7QUFFdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUszRCx3Q0FBdUM7QUFDdkMsZ0NBQTJCO0FBQzNCLDRDQUE2SDtBQUM3SCxxQ0FBZ0M7QUFFMUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQUk7SUFBdEM7UUFBQSxxRUErS0M7UUE5S0csVUFBVTtRQUNWLG1CQUFhLEdBQVEsQ0FBQyxDQUFDO1FBQ3ZCLGtCQUFZLEdBQVEsQ0FBQyxDQUFDO1FBQ3RCLHVCQUFpQixHQUFXLHNCQUFTLENBQUMsSUFBSSxDQUFDOztJQTJLL0MsQ0FBQztJQXpLRyxxQkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixTQUFTO1FBQ1QsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxtQkFBbUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHVCQUF1QixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMsaUJBQWlCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMs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LFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNyQztxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxJQUFJLElBQUksR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25HLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ2Isc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQTdLZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQStLeEI7SUFBRCxXQUFDO0NBL0tELEFBK0tDLENBL0tpQyxjQUFJLEdBK0tyQztrQkEvS29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgR2FtZVN0YXRlLCBJc0RlYnVnLCBKaWFTdSB9IGZyb20gXCIuLi8uLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEZpZ2h0aW5nTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9GaWdodGluZ01hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgS2V5RnJhbWVEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi4vSGVyb1wiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBHb25nSmlfRmFuZ1hpYW5nLCBIZXJvX1N0YXRlLCBIZXJvX1R5cGUsIFNoaWVsZFR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBOdld1RGFuIGZyb20gXCIuL052V3VEYW5cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnZXdSBleHRlbmRzIEhlcm8ge1xyXG4gICAgLyoq5rK755aX6K6h5pWwICovXHJcbiAgICB6aGlsaWFvX2ppc2h1Om51bWJlcj0wO1xyXG4gICAgemhpbGlhb190aW1lOm51bWJlcj0wO1xyXG4gICAgY3VyX3JlbGVhc2Vfc2tpbGw6U2tpbGxUeXBlPVNraWxsVHlwZS5OdWxsOyBcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIC8v5Yqg6L295oqA6IO95oyH56S65ZmoXHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5udnd1X2F0dGFja19idWxsZWN0LDIpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubnZ3dV9hdHRhY2tfYnVsbGVjdF9oaXQsMik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5udnd1X2FjdGl2ZV9za2lsbCwxKTsgICAgXHJcbiAgICAgICAgdGhpcy5pc19Mb2FkTG9hZD10cnVlOyAgICBcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkR2FtZVdpbkxpc3Rlbih0aGlzLnJlc2V0U2tpbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuaXNfbmVlZF9jaGVja19kaXN0YW5jZT1mYWxzZTtcclxuICAgICAgICBzdXBlci5zZXRTa2lsbFRpcFNpemUoNTIwLDUyMCk7XHJcbiAgICAgICAgdGhpcy56aGlsaWFvX3RpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRTa2lsbCgpe1xyXG4gICAgICAgIHRoaXMuemhpbGlhb19qaXNodT0wO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5pS75Ye7LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgXHJcblxyXG4gICAgY3JlYXRlTnZXdURhbihpZDpHYW1lRWZmZWN0SWQsamlhbnNoaVBvczpjYy5WZWMyLHNwZWVkOm51bWJlcixkaXI6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxqaWFuc2hpUG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChOdld1RGFuKS5pbml0KGlkLHNwZWVkLGRpcixnakRhdGEpO1xyXG4gICAgfSAgIFxyXG5cclxuXHJcbiAgICBub3JtYWxBdHRhY2sobW9uc3RlcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKG1vbnN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0QXR0YWNrKGVuZW15Tm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBlbmVteVBvcz1lbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpLmdldFNoZVNob3VQb3MoKTtcclxuICAgICAgICBsZXQgZmFuZ3hpYW5nPXRoaXMuZ2V0RmFuZ1hpYW5nQnlQb3MoZW5lbXlQb3MpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIGRhdGEubmFtZT1cIkF0dGFja1wiO1xyXG4gICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX05XQXR0YWNrKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlQb3M9dGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1lbmVteVBvcy5zdWIoamlhbnNoaVBvcyk7XHJcbiAgICAgICAgICAgIGxldCBqaWFuc2hpRGlyPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICBsZXQgZ2pEYXRhPXN1cGVyLmdldEdvbmdKaURhdGEoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSxTa2lsbFR5cGUuTnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTnZXdURhbihHYW1lRWZmZWN0SWQubnZ3dV9hdHRhY2tfYnVsbGVjdCxqaWFuc2hpUG9zLHRoaXMuYnVsbGV0X3NwZWVkLGppYW5zaGlEaXIsZ2pEYXRhKTtcclxuICAgICAgICAgICAgaWYodGhpcy5pc19kb3VibGVfYXR0YWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXROb3JtYWxBdHRhY2soKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuYXR0YWNrLGZhbmd4aWFuZyxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7ICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDvS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgXHJcbiAgICB1c2VTa2lsbChwb3M6Y2MuVmVjMik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgLyoq5aaC5p6c5pyJ5o6n5Yi25oqA6IO9ICovXHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGwhPVNraWxsVHlwZS5OdWxsKXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKHBvczpjYy5WZWMyKXtcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9SmlhU3U7ICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoq5a+5MjYw5Y2K5b6E6IyD5Zu05YaF55qE5pWM5Lq66YCg5oiQe+WPguaVsDF9JeS8pOWus+W5tuaWveWKoHvlj4LmlbAyfeWxguS4reavkuWSjHvlj4LmlbAzfSXnmoTph43kvKTmlYjmnpzvvIzmjIHnu60156eSICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLHBvcywyNjApO1xyXG4gICAgICAgIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgLy/kvKTlrrPns7vmlbBcclxuICAgICAgICAgICAgbGV0IGRhbWFnZURhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5BY3RpdmUsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLkFjdGl2ZSkpO1xyXG4gICAgICAgICAgICAvL+mHjeS8pOWAvFxyXG4gICAgICAgICAgICBsZXQgenNWYWx1ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgLy/lh4/mlLvpgJ9cclxuICAgICAgICAgICAgbGV0IGV4R3M9MDtcclxuICAgICAgICAgICAgbGV0IGV4MT10aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgICAgIGlmKGV4MSYmZXgxPjApe1xyXG4gICAgICAgICAgICAgICAgZXhHcz1leDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mr5LmlbDmja5cclxuICAgICAgICAgICAgbGV0IGR1RGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMiwwLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5QYXNzaXZlXzEpKTsgXHJcbiAgICAgICAgICAgIGR1RGF0YS5jb250aW51b3VzX2RhbWFnZV9yYXRlPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5QYXNzaXZlXzEpOzsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxtb25zdGVycy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9uc3RlclRUcz1tb25zdGVyc1tpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgICAgICAgICAvL+eri+WNs+mAoOaIkOWPguaVsDLkvKTlrrNcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhPW1vbnN0ZXJUVHMuYmVGbGFzaEluanVyZWQoZGFtYWdlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5udnd1X2F0dGFja19idWxsZWN0X2hpdCxtb25zdGVyVFRzLmdldENlbnRlclBvcygpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighZGF0YS5pc19kaWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fTnZXdV9Ta2lsbDFfWmhvbmdkdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLk5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYWRkX2Zsb29yPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5BY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5tYXhfZmxvb3I9NjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZGFtYWdlX2ppYW5nZV90aW1lPTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUVHMuYWRkRGVCdWZmKGJ1ZmZEYXRhLGR1RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6YeN5LykYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgenNEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6c0RhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19Odld1X1NraWxsMV9aaG9uZ1NoYW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6c0RhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlNlcmlvdXNseUluanVyZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpzRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6c0RhdGEuYnVmZl92YWx1ZT1benNWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJUVHMuYWRkRGVCdWZmKHpzRGF0YSxudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZXhHcz4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5LiT5q2m55qE5YeP5pS76YCfXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3NEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3NEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fTnZXdV9FeFNraWxsX0ppYW5Hb25nU3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnc0RhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLk5vcm1hbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdzRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3NEYXRhLmJ1ZmZfdmFsdWU9W2V4R3NdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlclRUcy5hZGREZUJ1ZmYoZ3NEYXRhLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5udnd1X2FjdGl2ZV9za2lsbCxwb3MpO1xyXG4gICAgICAgIG5vZGUuc2NhbGU9MztcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9OV1NraWxsKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19