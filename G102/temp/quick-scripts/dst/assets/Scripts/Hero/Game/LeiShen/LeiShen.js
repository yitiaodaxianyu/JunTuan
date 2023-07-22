
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/LeiShen/LeiShen.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a18c1atTKNK+rtdeKAMopyu', 'LeiShen');
// Scripts/Hero/Game/LeiShen/LeiShen.ts

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
var GameEffectsManager_1 = require("../../../Game/GameEffectsManager");
var GroundManager_1 = require("../../../Game/GroundManager");
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
var ChainLightning_1 = require("./ChainLightning");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LeiShen = /** @class */ (function (_super) {
    __extends(LeiShen, _super);
    function LeiShen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**被闪电过的怪的uuid */
        _this.shandian_monster = [];
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    LeiShen.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.xuanyun, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_shandian, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_shandian_hit, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_skill_ground, 4);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.lei_shen_skill_sky, 1);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addResetListen(this.onResetState);
    };
    LeiShen.prototype.onResetState = function () {
    };
    LeiShen.prototype.onXuanYunResult = function (isXuanYun) {
        /**雷神技能状态无法被控制 */
        if (isXuanYun && this.getHeroState() != HeroConfig_1.Hero_State.skill) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击-------------------------------------------------
    LeiShen.prototype.onHitMonster = function (damageType, isCrit, monster) {
    };
    LeiShen.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        //求出方向
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    /**普攻对敌人释放一道闪电，可以连续弹射{参数1}名敌人（每个敌人人只能被弹射一次），造成{参数2}%伤害并施加一层“超负荷” */
    LeiShen.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            _this.shandian_monster = new Array();
            _this.createShanDian(null, enemyNode.getComponent(Monster_1.default));
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_LeiGodAttack);
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
    /**当敌人身上的超负荷达到5层时，会受到落雷攻击造成{参数1}伤害并击晕{参数2}秒 */
    LeiShen.prototype.createShanDian = function (firstMonster, endMonster) {
        this.shandian_monster.push(endMonster.uuid);
        var shandian = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_shandian, this.getCreateBulletPos());
        shandian.getComponent(ChainLightning_1.default).init(GameEffectsManager_1.GameEffectId.lei_shen_shandian, firstMonster, endMonster, this.onEndMonster.bind(this));
        var gjData = this.getGongJiData(HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_1, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1));
        var data = endMonster.beFlashInjured(gjData);
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_shandian_hit, endMonster.getCenterPos());
        if (this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2) && data.getDamageNum() > 0 && data.is_die == false) {
            var buffData = new BuffData_1.BuffData();
            buffData.buff_id = HeroConfig_1.BuffId.Hero_LeiShen_ChaoFuHe;
            buffData.remain_time = 60;
            buffData.buff_type = HeroConfig_1.BuffType.Burst;
            buffData.buff_value = [4];
            buffData.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
            buffData.add_floor = 1;
            var damageRate = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
            endMonster.addDeBuff(buffData, this.getGongJiData(HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, damageRate));
        }
    };
    LeiShen.prototype.onEndMonster = function (endMonster) {
        var tansheNum = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
        if (this.shandian_monster.length < tansheNum) {
            var nextMonster = this.getMonster(endMonster.getCenterPos());
            if (nextMonster) {
                this.createShanDian(endMonster, nextMonster);
            }
        }
    };
    LeiShen.prototype.getIsTanShe = function (uuid) {
        return this.shandian_monster.indexOf(uuid) >= 0;
    };
    LeiShen.prototype.getMonster = function (pos) {
        var em = MonsterManager_1.default.getInstance();
        if (em.node.childrenCount <= 0) {
            return null;
        }
        //1.先检测在攻击范围内符合攻击单位的敌人
        var attMonsters = new Array();
        for (var _i = 0, _a = em.node.children; _i < _a.length; _i++) {
            var enemy = _a[_i];
            var enemyTS = enemy.getComponent(Monster_1.default);
            if (enemyTS && enemyTS.getIsCanCheck() == true) {
                var distance = pos.sub(enemyTS.getCenterPos()).mag();
                if (this.getIsTanShe(enemyTS.uuid) == false && distance <= 500) {
                    attMonsters.push(enemyTS);
                }
            }
        }
        if (attMonsters.length <= 0) {
            return null;
        }
        if (1 == attMonsters.length) {
            return attMonsters[0];
        }
        //2.1优先攻击跟目标位置最近的单位
        attMonsters.sort(function (a, b) {
            return a.getCenterPos().sub(pos).mag() - b.getCenterPos().sub(pos).mag();
        });
        return attMonsters[0];
    };
    //---------------------------------------------技能-----------------------------------------------------
    LeiShen.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi();
        }, this.node);
        return 0;
    };
    LeiShen.prototype.startSelfXuLi = function () {
        var _this = this;
        //发射帧监听
        var fasheData = new MonsterData_1.KeyFrameData();
        fasheData.name = "FaShe";
        fasheData.callback = function () {
        };
        //英雄动作播放
        this.setHeroState(HeroConfig_1.Hero_State.skill, HeroConfig_1.GongJi_FangXiang.zhong, [fasheData], function () {
            //隐身
            SkillManager_1.default.getInstance().setTimeStop(false);
            _this.node.parent = cc.find('Canvas/Hero_Root');
            _this.node.zIndex = 2;
            //可以发射
            _this.startLaunch();
        });
        this.spine.timeScale = Constants_1.JiaSu;
    };
    /**3秒内在战场上的随机位置召唤{参数1}道闪电，闪电会对半径80圆形范围内的敌人造成{参数2}%伤害，并施加一层“超负荷” */
    LeiShen.prototype.startLaunch = function () {
        var _this = this;
        this.node.opacity = 0;
        this.node_shadow.opacity = 0;
        _super.prototype.setAttSpineScale.call(this);
        var gjData = _super.prototype.getGongJiData.call(this, HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Active, this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Active));
        var num = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Active);
        var jiange = 3 / num;
        var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        var exFanwei = 0;
        if (ex1 && ex1 > 0) {
            //增加范围
            exFanwei = ex1;
        }
        // if(IsDebug){
        //     exFanwei=200;
        // }
        for (var i = 0; i < num; i++) {
            this.scheduleOnce(function () {
                var pos = cc.v2(Math.random() * 550 - 275, Math.random() * 800 - 400);
                GroundManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_skill_ground, pos);
                var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_skill_sky, pos);
                node.scale = 1;
                MyTool_1.default.randomSceneShake(-6, 6, 0.015, 6);
                var monsters = MonsterManager_1.default.getInstance().getMonstersForCenterPos(-1, pos, 180 * (1 + exFanwei));
                if (monsters) {
                    GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_LeiGodSkill2);
                    for (var n = 0; n < monsters.length; n++) {
                        var monster = monsters[n].getComponent(Monster_1.default);
                        var data = monster.beFlashInjured(gjData);
                        if (_this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2) && data.getDamageNum() > 0) {
                            if (data.is_die == false) {
                                var buffData = new BuffData_1.BuffData();
                                buffData.buff_id = HeroConfig_1.BuffId.Hero_LeiShen_ChaoFuHe;
                                buffData.remain_time = 60;
                                buffData.buff_type = HeroConfig_1.BuffType.Burst;
                                buffData.buff_value = [4];
                                buffData.game_effect_id = GameEffectsManager_1.GameEffectId.Null;
                                buffData.add_floor = 2;
                                var damageRate = _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
                                monster.addDeBuff(buffData, _this.getGongJiData(HeroConfig_1.DamageType.Skill, false, HeroConfig_1.SkillType.Passive_2, damageRate));
                            }
                        }
                    }
                }
            }, i * jiange);
        }
        this.scheduleOnce(function () {
            _this.node.opacity = 255;
            _this.node_shadow.opacity = 255;
            _super.prototype.playSpineAnimation.call(_this, 'SkillEnd', false, null, function () {
                _this.node.opacity = 255;
                _super.prototype.setHeroState.call(_this, HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong, null, null);
            });
        }, 3);
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    LeiShen = __decorate([
        ccclass
    ], LeiShen);
    return LeiShen;
}(Hero_1.default));
exports.default = LeiShen;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcTGVpU2hlblxcTGVpU2hlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBK0Q7QUFDL0QsdUVBQW9GO0FBQ3BGLDZEQUF3RDtBQUN4RCwyREFBc0Q7QUFDdEQsb0RBQStDO0FBQy9DLG9EQUErQztBQUMvQyw0REFBNEQ7QUFDNUQsa0VBQTZEO0FBQzdELGdFQUEyRDtBQUMzRCxnREFBMkM7QUFDM0Msd0NBQXVDO0FBQ3ZDLGdDQUEyQjtBQUMzQiw0Q0FBcUc7QUFDckcsbURBQThDO0FBR3hDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFJO0lBQXpDO1FBQUEscUVBcU9DO1FBcE9HLGlCQUFpQjtRQUNqQixzQkFBZ0IsR0FBVSxFQUFFLENBQUM7O0lBbU9qQyxDQUFDO0lBak9ELCtGQUErRjtJQUMzRix3QkFBTSxHQUFOO1FBRUksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQyxxQkFBcUIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELDhCQUFZLEdBQVo7SUFHQSxDQUFDO0lBRUQsaUNBQWUsR0FBZixVQUFnQixTQUFpQjtRQUM3QixpQkFBaUI7UUFDakIsSUFBRyxTQUFTLElBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFFLHVCQUFVLENBQUMsS0FBSyxFQUFDO1lBQ2hELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBRWpDO2FBQUk7WUFDRCxlQUFlO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBVSxDQUFDLElBQUksRUFBQyw2QkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3RDtJQUNMLENBQUM7SUFFRCxrR0FBa0c7SUFDbEcsOEJBQVksR0FBWixVQUFhLFVBQXFCLEVBQUMsTUFBYyxFQUFDLE9BQWU7SUFFakUsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxPQUFlO1FBRXhCLElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLElBQUUscUJBQVMsQ0FBQyxZQUFZO1lBQ25FLE9BQU87UUFDUCxNQUFNO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsbUVBQW1FO0lBQ25FLDZCQUFXLEdBQVgsVUFBWSxTQUFpQjtRQUE3QixpQkFtQkM7UUFqQkcsSUFBSSxRQUFRLEdBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0QsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFDLElBQUksMEJBQVksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUMsUUFBUSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUM7WUFDVixLQUFJLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNsQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzFELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlFLElBQUcsS0FBSSxDQUFDLGdCQUFnQixFQUFDO2dCQUNyQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUM1QjtpQkFBSTtnQkFDRCxLQUFJLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUMsQ0FBQTtRQUNELGlCQUFNLFlBQVksWUFBQyx1QkFBVSxDQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUNsRCxLQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCw4Q0FBOEM7SUFDOUMsZ0NBQWMsR0FBZCxVQUFlLFlBQW9CLEVBQUMsVUFBa0I7UUFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQUMsdUNBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsaUNBQVksQ0FBQyxpQkFBaUIsRUFBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQzdILFFBQVEsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQ0FBWSxDQUFDLGlCQUFpQixFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoSSxJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUFVLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxzQkFBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFDNUgsSUFBSSxJQUFJLEdBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLHFCQUFxQixFQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ3BILElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsSUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxNQUFNLElBQUUsS0FBSyxFQUFDO1lBQzFGLElBQUksUUFBUSxHQUFDLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUM5QyxRQUFRLENBQUMsV0FBVyxHQUFDLEVBQUUsQ0FBQztZQUN4QixRQUFRLENBQUMsU0FBUyxHQUFDLHFCQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixRQUFRLENBQUMsY0FBYyxHQUFDLGlDQUFZLENBQUMsSUFBSSxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksVUFBVSxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDakUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBVSxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsc0JBQVMsQ0FBQyxTQUFTLEVBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUM1RztJQUNMLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWEsVUFBa0I7UUFDM0IsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRSxJQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUMsU0FBUyxFQUFDO1lBQ3RDLElBQUksV0FBVyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBRyxXQUFXLEVBQUM7Z0JBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUMsV0FBVyxDQUFDLENBQUM7YUFDL0M7U0FDSjtJQUNMLENBQUM7SUFFRCw2QkFBVyxHQUFYLFVBQVksSUFBVztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCw0QkFBVSxHQUFWLFVBQVcsR0FBVztRQUVsQixJQUFJLEVBQUUsR0FBQyx3QkFBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUUsQ0FBQyxFQUMzQjtZQUNJLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxzQkFBc0I7UUFDdEIsSUFBSSxXQUFXLEdBQVcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN0QyxLQUFpQixVQUFnQixFQUFoQixLQUFBLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFoQixjQUFnQixFQUFoQixJQUFnQixFQUNqQztZQURJLElBQUksS0FBSyxTQUFBO1lBRVQsSUFBSSxPQUFPLEdBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUM7WUFDeEMsSUFBRyxPQUFPLElBQUksT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFFLElBQUksRUFDM0M7Z0JBQ0ksSUFBSSxRQUFRLEdBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDbkQsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBRSxLQUFLLElBQUksUUFBUSxJQUFFLEdBQUcsRUFDekQ7b0JBQ0ksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDN0I7YUFDSjtTQUNKO1FBQ0QsSUFBRyxXQUFXLENBQUMsTUFBTSxJQUFFLENBQUMsRUFDeEI7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBRyxDQUFDLElBQUUsV0FBVyxDQUFDLE1BQU0sRUFDeEI7WUFDSSxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QjtRQUNELG1CQUFtQjtRQUNuQixXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUyxFQUFDLENBQVM7WUFDakMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsc0dBQXNHO0lBRXRHLDBCQUFRLEdBQVIsVUFBUyxHQUFXO1FBQXBCLGlCQU1DO1FBSkcsc0JBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDcEMsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCwrQkFBYSxHQUFiO1FBQUEsaUJBa0JDO1FBakJHLE9BQU87UUFDUCxJQUFJLFNBQVMsR0FBQyxJQUFJLDBCQUFZLEVBQUUsQ0FBQztRQUNqQyxTQUFTLENBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQztRQUN2QixTQUFTLENBQUMsUUFBUSxHQUFDO1FBRW5CLENBQUMsQ0FBQTtRQUNELFFBQVE7UUFDUixJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFVLENBQUMsS0FBSyxFQUFDLDZCQUFnQixDQUFDLEtBQUssRUFBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDO1lBQ2xFLElBQUk7WUFDSixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU07WUFDTixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxpQkFBSyxDQUFDO0lBQy9CLENBQUM7SUFDRCxrRUFBa0U7SUFDbEUsNkJBQVcsR0FBWDtRQUFBLGlCQXVEQztRQXRERyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDO1FBQzNCLGlCQUFNLGdCQUFnQixXQUFFLENBQUM7UUFDekIsSUFBSSxNQUFNLEdBQUMsaUJBQU0sYUFBYSxZQUFDLHVCQUFVLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxzQkFBUyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEgsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsc0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxJQUFJLE1BQU0sR0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQ2pCLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUM7UUFDbkQsSUFBSSxRQUFRLEdBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBRyxHQUFHLElBQUUsR0FBRyxHQUFDLENBQUMsRUFBQztZQUNWLE1BQU07WUFDTixRQUFRLEdBQUMsR0FBRyxDQUFDO1NBQ2hCO1FBQ0QsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixJQUFJO1FBQ0osS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEdBQUcsR0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0QsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLHFCQUFxQixFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RixJQUFJLElBQUksR0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxpQ0FBWSxDQUFDLGtCQUFrQixFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwRyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztnQkFDYixnQkFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksUUFBUSxHQUFDLHdCQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsR0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixJQUFHLFFBQVEsRUFBQztvQkFDUixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFDOUUsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7d0JBQ2hDLElBQUksT0FBTyxHQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQU8sQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLElBQUksR0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN4QyxJQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLElBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFDLENBQUMsRUFBQzs0QkFDdEUsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLEtBQUssRUFBQztnQ0FDbEIsSUFBSSxRQUFRLEdBQUMsSUFBSSxtQkFBUSxFQUFFLENBQUM7Z0NBQzVCLFFBQVEsQ0FBQyxPQUFPLEdBQUMsbUJBQU0sQ0FBQyxxQkFBcUIsQ0FBQztnQ0FDOUMsUUFBUSxDQUFDLFdBQVcsR0FBQyxFQUFFLENBQUM7Z0NBQ3hCLFFBQVEsQ0FBQyxTQUFTLEdBQUMscUJBQVEsQ0FBQyxLQUFLLENBQUM7Z0NBQ2xDLFFBQVEsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDeEIsUUFBUSxDQUFDLGNBQWMsR0FBQyxpQ0FBWSxDQUFDLElBQUksQ0FBQztnQ0FDMUMsUUFBUSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUM7Z0NBQ3JCLElBQUksVUFBVSxHQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLHNCQUFTLENBQUMsU0FBUyxDQUFDLENBQUE7Z0NBQ2pFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsdUJBQVUsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLHNCQUFTLENBQUMsU0FBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NkJBQ3pHO3lCQUNKO3FCQUNKO2lCQUNKO1lBQ0wsQ0FBQyxFQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztZQUN0QixLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUM7WUFDN0IsaUJBQU0sa0JBQWtCLGFBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7Z0JBQzNDLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztnQkFDdEIsaUJBQU0sWUFBWSxhQUFDLHVCQUFVLENBQUMsSUFBSSxFQUFDLDZCQUFnQixDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDekUsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDSixzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBcE9nQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBcU8zQjtJQUFELGNBQUM7Q0FyT0QsQUFxT0MsQ0FyT29DLGNBQUksR0FxT3hDO2tCQXJPb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIElzRGVidWcsIEppYVN1IH0gZnJvbSBcIi4uLy4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5pbXBvcnQgeyBLZXlGcmFtZURhdGEgfSBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL01vbnN0ZXIvTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vQnVmZkRhdGFcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4uL0hlcm9cIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgR29uZ0ppX0ZhbmdYaWFuZyxIZXJvX1N0YXRlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQ2hhaW5MaWdodG5pbmcgZnJvbSBcIi4vQ2hhaW5MaWdodG5pbmdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExlaVNoZW4gZXh0ZW5kcyBIZXJvIHtcclxuICAgIC8qKuiiq+mXqueUtei/h+eahOaAqueahHV1aWQgKi9cclxuICAgIHNoYW5kaWFuX21vbnN0ZXI6c3RyaW5nW109W107XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeWKoOi9vS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC54dWFueXVuLDQpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2hhbmRpYW4sNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbl9oaXQsNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9ncm91bmQsNCk7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9za3ksMSk7XHJcbiAgICAgICAgdGhpcy5pc19Mb2FkTG9hZD10cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkSGl0TGlzdGVuKHRoaXMub25IaXRNb25zdGVyKTtcclxuICAgICAgICB0aGlzLmFkZFJlc2V0TGlzdGVuKHRoaXMub25SZXNldFN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2V0U3RhdGUoKXtcclxuXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25YdWFuWXVuUmVzdWx0KGlzWHVhbll1bjpib29sZWFuKXtcclxuICAgICAgICAvKirpm7fnpZ7mioDog73nirbmgIHml6Dms5XooqvmjqfliLYgKi9cclxuICAgICAgICBpZihpc1h1YW5ZdW4mJnRoaXMuZ2V0SGVyb1N0YXRlKCkhPUhlcm9fU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mlLvlh7stLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBvbkhpdE1vbnN0ZXIoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQ3JpdDpib29sZWFuLG1vbnN0ZXI6Y2MuTm9kZSl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgbm9ybWFsQXR0YWNrKG1vbnN0ZXI6Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICAvL+axguWHuuaWueWQkVxyXG4gICAgICAgIHRoaXMuaXNfY2FuX2dvbmdqaT1mYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0QXR0YWNrKG1vbnN0ZXIpO1xyXG4gICAgfVxyXG4gICAgLyoq5pmu5pS75a+55pWM5Lq66YeK5pS+5LiA6YGT6Zeq55S177yM5Y+v5Lul6L+e57ut5by55bCEe+WPguaVsDF95ZCN5pWM5Lq677yI5q+P5Liq5pWM5Lq65Lq65Y+q6IO96KKr5by55bCE5LiA5qyh77yJ77yM6YCg5oiQe+WPguaVsDJ9JeS8pOWus+W5tuaWveWKoOS4gOWxguKAnOi2hei0n+iNt+KAnSAqL1xyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRGYW5nWGlhbmdCeVBvcyhlbmVteVBvcyk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNoYW5kaWFuX21vbnN0ZXI9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hhbkRpYW4obnVsbCxlbmVteU5vZGUuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xlaUdvZEF0dGFjayk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNfZG91YmxlX2F0dGFjayl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Tm9ybWFsQXR0YWNrKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssZmFuZ3hpYW5nLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKuW9k+aVjOS6uui6q+S4iueahOi2hei0n+iNt+i+vuWIsDXlsYLml7bvvIzkvJrlj5fliLDokL3pm7fmlLvlh7vpgKDmiJB75Y+C5pWwMX3kvKTlrrPlubblh7vmmZV75Y+C5pWwMn3np5IgKi9cclxuICAgIGNyZWF0ZVNoYW5EaWFuKGZpcnN0TW9uc3RlcjpNb25zdGVyLGVuZE1vbnN0ZXI6TW9uc3Rlcil7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNoYW5kaWFuX21vbnN0ZXIucHVzaChlbmRNb25zdGVyLnV1aWQpO1xyXG4gICAgICAgIGxldCBzaGFuZGlhbj1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2hhbmRpYW4sdGhpcy5nZXRDcmVhdGVCdWxsZXRQb3MoKSk7XHJcbiAgICAgICAgc2hhbmRpYW4uZ2V0Q29tcG9uZW50KENoYWluTGlnaHRuaW5nKS5pbml0KEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbixmaXJzdE1vbnN0ZXIsZW5kTW9uc3Rlcix0aGlzLm9uRW5kTW9uc3Rlci5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgZ2pEYXRhPXRoaXMuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5QYXNzaXZlXzEsdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMSkpXHJcbiAgICAgICAgbGV0IGRhdGE9ZW5kTW9uc3Rlci5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9zaGFuZGlhbl9oaXQsZW5kTW9uc3Rlci5nZXRDZW50ZXJQb3MoKSk7XHJcbiAgICAgICAgaWYodGhpcy5oZXJvX2RhdGEuZ2V0SXNVbmxvY2soU2tpbGxUeXBlLlBhc3NpdmVfMikmJmRhdGEuZ2V0RGFtYWdlTnVtKCk+MCYmZGF0YS5pc19kaWU9PWZhbHNlKXtcclxuICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX0xlaVNoZW5fQ2hhb0Z1SGU7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTYwO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuQnVyc3Q7XHJcbiAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9WzRdO1xyXG4gICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQuTnVsbDtcclxuICAgICAgICAgICAgYnVmZkRhdGEuYWRkX2Zsb29yPTE7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYW1hZ2VSYXRlPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzIpXHJcbiAgICAgICAgICAgIGVuZE1vbnN0ZXIuYWRkRGVCdWZmKGJ1ZmZEYXRhLHRoaXMuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLFNraWxsVHlwZS5QYXNzaXZlXzIsZGFtYWdlUmF0ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkVuZE1vbnN0ZXIoZW5kTW9uc3RlcjpNb25zdGVyKXsgICAgICAgIFxyXG4gICAgICAgIGxldCB0YW5zaGVOdW09dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgaWYodGhpcy5zaGFuZGlhbl9tb25zdGVyLmxlbmd0aDx0YW5zaGVOdW0pe1xyXG4gICAgICAgICAgICBsZXQgbmV4dE1vbnN0ZXI9dGhpcy5nZXRNb25zdGVyKGVuZE1vbnN0ZXIuZ2V0Q2VudGVyUG9zKCkpO1xyXG4gICAgICAgICAgICBpZihuZXh0TW9uc3Rlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVNoYW5EaWFuKGVuZE1vbnN0ZXIsbmV4dE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldElzVGFuU2hlKHV1aWQ6c3RyaW5nKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYW5kaWFuX21vbnN0ZXIuaW5kZXhPZih1dWlkKT49MDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNb25zdGVyKHBvczpjYy5WZWMyKTpNb25zdGVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVtPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBpZihlbS5ub2RlLmNoaWxkcmVuQ291bnQ8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8xLuWFiOajgOa1i+WcqOaUu+WHu+iMg+WbtOWGheespuWQiOaUu+WHu+WNleS9jeeahOaVjOS6ulxyXG4gICAgICAgIGxldCBhdHRNb25zdGVyczpNb25zdGVyW109bmV3IEFycmF5KCk7XHJcbiAgICAgICAgZm9yKGxldCBlbmVteSBvZiBlbS5ub2RlLmNoaWxkcmVuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGVuZW15VFM9ZW5lbXkuZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgICAgICBpZihlbmVteVRTICYmIGVuZW15VFMuZ2V0SXNDYW5DaGVjaygpPT10cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9cG9zLnN1YihlbmVteVRTLmdldENlbnRlclBvcygpKS5tYWcoKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0SXNUYW5TaGUoZW5lbXlUUy51dWlkKT09ZmFsc2UgJiYgZGlzdGFuY2U8PTUwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRNb25zdGVycy5wdXNoKGVuZW15VFMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGF0dE1vbnN0ZXJzLmxlbmd0aDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigxPT1hdHRNb25zdGVycy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMi4x5LyY5YWI5pS75Ye76Lef55uu5qCH5L2N572u5pyA6L+R55qE5Y2V5L2NXHJcbiAgICAgICAgYXR0TW9uc3RlcnMuc29ydCgoYTpNb25zdGVyLGI6TW9uc3Rlcik9PntcclxuICAgICAgICAgICAgcmV0dXJuIGEuZ2V0Q2VudGVyUG9zKCkuc3ViKHBvcykubWFnKCktYi5nZXRDZW50ZXJQb3MoKS5zdWIocG9zKS5tYWcoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXR0TW9uc3RlcnNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mioDog70tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIHVzZVNraWxsKHBvczpjYy5WZWMyKTpudW1iZXJcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbGVhc2VTa2lsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2VsZlh1TGkoKTtcclxuICAgICAgICB9LHRoaXMubm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRTZWxmWHVMaSgpe1xyXG4gICAgICAgIC8v5Y+R5bCE5bin55uR5ZCsXHJcbiAgICAgICAgbGV0IGZhc2hlRGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZmFzaGVEYXRhLm5hbWU9XCJGYVNoZVwiO1xyXG4gICAgICAgIGZhc2hlRGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICAvL+iLsembhOWKqOS9nOaSreaUvlxyXG4gICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuc2tpbGwsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyxbZmFzaGVEYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICAvL+makOi6q1xyXG4gICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRUaW1lU3RvcChmYWxzZSk7ICBcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXg9MjtcclxuICAgICAgICAgICAgLy/lj6/ku6Xlj5HlsIRcclxuICAgICAgICAgICAgdGhpcy5zdGFydExhdW5jaCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgIH1cclxuICAgIC8qKjPnp5LlhoXlnKjmiJjlnLrkuIrnmoTpmo/mnLrkvY3nva7lj6zllKR75Y+C5pWwMX3pgZPpl6rnlLXvvIzpl6rnlLXkvJrlr7nljYrlvoQ4MOWchuW9ouiMg+WbtOWGheeahOaVjOS6uumAoOaIkHvlj4LmlbAyfSXkvKTlrrPvvIzlubbmlr3liqDkuIDlsYLigJzotoXotJ/ojbfigJ0gKi9cclxuICAgIHN0YXJ0TGF1bmNoKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MDtcclxuICAgICAgICB0aGlzLm5vZGVfc2hhZG93Lm9wYWNpdHk9MDtcclxuICAgICAgICBzdXBlci5zZXRBdHRTcGluZVNjYWxlKCk7XHJcbiAgICAgICAgbGV0IGdqRGF0YT1zdXBlci5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLkFjdGl2ZSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuQWN0aXZlKSk7XHJcbiAgICAgICAgbGV0IG51bT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICBsZXQgamlhbmdlPTMvbnVtO1xyXG4gICAgICAgIGxldCBleDE9dGhpcy5oZXJvX2RhdGEuRXhjbHVzaXZlV2VhcG9uU2tpbGxWYWx1ZV8xO1xyXG4gICAgICAgIGxldCBleEZhbndlaT0wO1xyXG4gICAgICAgIGlmKGV4MSYmZXgxPjApe1xyXG4gICAgICAgICAgICAvL+WinuWKoOiMg+WbtFxyXG4gICAgICAgICAgICBleEZhbndlaT1leDE7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKElzRGVidWcpe1xyXG4gICAgICAgIC8vICAgICBleEZhbndlaT0yMDA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPG51bTsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCBwb3M9Y2MudjIoTWF0aC5yYW5kb20oKSo1NTAtMjc1LE1hdGgucmFuZG9tKCkqODAwLTQwMCk7XHJcbiAgICAgICAgICAgICAgICBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX2dyb3VuZCxwb3MpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX3NreSxwb3MpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT0xO1xyXG4gICAgICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2UoLTYsNiwwLjAxNSw2KTtcclxuICAgICAgICAgICAgICAgIGxldCBtb25zdGVycz1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1vbnN0ZXJzRm9yQ2VudGVyUG9zKC0xLHBvcywxODAqKDErZXhGYW53ZWkpKTtcclxuICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJzKXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGVpR29kU2tpbGwyKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IG49MDsgbjxtb25zdGVycy5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb25zdGVyPW1vbnN0ZXJzW25dLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE9bW9uc3Rlci5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmhlcm9fZGF0YS5nZXRJc1VubG9jayhTa2lsbFR5cGUuUGFzc2l2ZV8yKSYmZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhLmlzX2RpZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX0xlaVNoZW5fQ2hhb0Z1SGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9NjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkJ1cnN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdmFsdWU9WzRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC5OdWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmFkZF9mbG9vcj0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYW1hZ2VSYXRlPXRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUxKFNraWxsVHlwZS5QYXNzaXZlXzIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3Rlci5hZGREZUJ1ZmYoYnVmZkRhdGEsdGhpcy5nZXRHb25nSmlEYXRhKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsU2tpbGxUeXBlLlBhc3NpdmVfMixkYW1hZ2VSYXRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0saSpqaWFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9zaGFkb3cub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgIHN1cGVyLnBsYXlTcGluZUFuaW1hdGlvbignU2tpbGxFbmQnLGZhbHNlLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyxudWxsLG51bGwpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sMylcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJc1NraWxsU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==