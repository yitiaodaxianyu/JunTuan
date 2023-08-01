
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/ZhenDe/ZhenDe.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bf169liwfBLrK8a6DXSYviX', 'ZhenDe');
// Scripts/Hero/Game/ZhenDe/ZhenDe.ts

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
var SkyManager_1 = require("../../../Game/SkyManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var WallManager_1 = require("../../../Wall/WallManager");
var BuffData_1 = require("../BuffData");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var ZhenDeDan_1 = require("./ZhenDeDan");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ZhenDe = /** @class */ (function (_super) {
    __extends(ZhenDe, _super);
    function ZhenDe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**治疗计数 */
        _this.zhiliao_jishu = 0;
        _this.zhiliao_time = 0;
        _this.cur_release_skill = HeroConfig_1.SkillType.Null;
        return _this;
    }
    ZhenDe.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        //加载技能指示器
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_attack, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_attack_hit, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_beidong_skill, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_beidong_skill_wall, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_active_skill_1, 1);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_active_skill_2, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.zhen_de_active_skill_3, 2);
        _super.prototype.addLoadByGameEffectId.call(this, GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, 2);
        this.is_LoadLoad = true;
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addGameWinListen(this.resetSkill);
    };
    ZhenDe.prototype.start = function () {
        _super.prototype.start.call(this);
        this.is_need_check_distance = false;
        _super.prototype.setSkillTipSize.call(this, 1680, 600);
        this.zhiliao_time = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
    };
    ZhenDe.prototype.resetSkill = function () {
        this.zhiliao_jishu = 0;
    };
    ZhenDe.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            if (this.skill_queue.length > 0) {
                this.startSkill(this.skill_queue.shift());
            }
            else {
                //根据上个状态判断需要做什么
                this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
            }
        }
    };
    //---------------------------------------------攻击----------------------------------------------
    ZhenDe.prototype.createZhenDeDan = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(ZhenDeDan_1.default).init(id, speed, dir, gjData);
    };
    ZhenDe.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    ZhenDe.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ZDAttack);
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            _this.createZhenDeDan(GameEffectsManager_1.GameEffectId.zhen_de_attack, jianshiPos, _this.bullet_speed, jianshiDir, gjData);
            if (_this.is_double_attack) {
                _this.resetNormalAttack();
            }
            else {
                _this.gongji_jishu = 0;
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
            /**概率 */
            _this.checkSkill2();
        });
    };
    ZhenDe.prototype.checkSkill2 = function () {
        if (this.hero_data.getIsUnlock(HeroConfig_1.SkillType.Passive_2)) {
            var rate = this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
            if (rate && Math.random() < rate) {
                this.startSkill2();
            }
        }
    };
    ZhenDe.prototype.startSkill1 = function () {
        var _this = this;
        if (_super.prototype.getHeroState.call(this) == HeroConfig_1.Hero_State.idle && _super.prototype.isHaveDeBuff.call(this, HeroConfig_1.BuffId.Monster_XuanYun) == false) {
            this.cur_release_skill = HeroConfig_1.SkillType.Passive_1;
            var data = new MonsterData_1.KeyFrameData();
            data.name = "Passive1";
            data.callback = function () {
                _this.cur_release_skill = HeroConfig_1.SkillType.Null;
                _this.gongji_jishu = 0;
                var buffData = new BuffData_1.BuffData();
                buffData.buff_id = HeroConfig_1.BuffId.Hero_ZhenDe_JiaXueJianShang;
                buffData.buff_type = HeroConfig_1.BuffType.Gain;
                buffData.buff_value = [_this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_1) * WallManager_1.default.getInstance().getMainWall().getMaxHp(), _this.hero_data.getSkillValue3(HeroConfig_1.SkillType.Passive_1)];
                buffData.remain_time = 5;
                // buffData.game_effect_id=GameEffectId.chang_mao_shou_skill_active_1;
                buffData.recovery_jiange_time = 1;
                WallManager_1.default.getInstance().getMainWall().addBuff(buffData);
            };
            _super.prototype.setHeroStateAndAnimation.call(this, HeroConfig_1.Hero_State.skill, "Passive1", false, [data], function () {
                _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
                if (_this.skill_queue.length > 0) {
                    _this.startSkill(_this.skill_queue.shift());
                }
            });
        }
        else {
            this.skill_queue.push(HeroConfig_1.SkillType.Passive_1);
        }
    };
    ZhenDe.prototype.startSkill2 = function () {
        // if(super.getHeroState()==Hero_State.idle&&super.isHaveDeBuff(BuffId.Monster_XuanYun)==false){
        //     this.cur_release_skill=SkillType.Passive_2;      
        //     let data=new KeyFrameData();
        //     data.name="Passive1";
        //     data.callback=()=>{
        //         this.cur_release_skill=SkillType.Null;
        //         this.gongji_jishu=0;
        //         let heroId=HeroManager.getInstance().getRandHeroId(GameManager.getInstance().cur_game_mode,this.hero_type,GameManager.getInstance().cur_team_list);
        //         if(heroId!=Hero_Type.NULL){
        //             let buffData=new BuffData();
        //             buffData.buff_id=BuffId.Hero_ZhenDe_BaoJiMingZhongLv;
        //             buffData.buff_type=BuffType.Gain;
        //             buffData.buff_value=[this.hero_data.getSkillValue2(SkillType.Passive_2)];
        //             buffData.remain_time=5;
        //             buffData.game_effect_id=GameEffectId.Null;                
        //             GameManager.getInstance().all_hero.get(heroId).addBuff(buffData);
        //             //特效
        //             SkyManager.getInstance().createGameEffectById(GameEffectId.zhen_de_beidong_skill,GameManager.getInstance().all_hero.get(heroId).node.getPosition());
        //         }
        //     }
        //     super.setHeroStateAndAnimation(Hero_State.skill,"Passive1",false,[data],()=>{
        //         this.setHeroState(Hero_State.idle,this.cur_fangxiang);
        //         if(this.skill_queue.length>0){
        //             this.startSkill(this.skill_queue.shift());
        //         }
        //     });
        // }else{
        //     this.skill_queue.push(SkillType.Passive_2);
        // }
        WallManager_1.default.getInstance().getMainWall().changeHp(WallManager_1.default.getInstance().getMainWall().getMaxHp() * (0.01 + this.hero_lvl * 0.002));
        WallManager_1.default.getInstance().getMainWall().addHpBuff();
    };
    ZhenDe.prototype.startSkill = function (skillType) {
        switch (skillType) {
            case HeroConfig_1.SkillType.Passive_1:
                {
                    this.startSkill1();
                }
                break;
            case HeroConfig_1.SkillType.Passive_2:
                {
                    this.startSkill2();
                }
                break;
        }
    };
    //---------------------------------------------技能----------------------------------------------    
    ZhenDe.prototype.useSkill = function (pos) {
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
    ZhenDe.prototype.startSelfXuLi = function (pos) {
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
            if (_this.skill_queue.length > 0) {
                _this.startSkill(_this.skill_queue.shift());
            }
        });
        this.spine.timeScale = Constants_1.JiaSu;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ZDSkill);
    };
    /**在目标区域的左右两边各召唤一阵藤蔓冲击波，藤蔓冲击波会向屏幕另一端滚动，途中速度会逐渐加快，对触碰到的敌人造成{参数1}%伤害，并造成{参数2}秒眩晕效果 */
    ZhenDe.prototype.startLaunch = function (pos) {
        var _this = this;
        _super.prototype.setAttSpineScale.call(this);
        //专武
        var ex1 = this.hero_data.ExclusiveWeaponSkillValue_1;
        var cdT = 0;
        if (ex1 && ex1 > 0) {
            cdT = ex1;
        }
        //光速下来
        var light = SkyManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.zhen_de_active_skill_1, cc.v2(this.node.x, this.node.y + 640));
        cc.tween(light).to(0.1 * GameManager_1.default.getInstance().getGameRate(), { y: this.node.y + this.xuanyun_pos.y }).call(function () {
            GameEffectsManager_1.GameEffectsManager.getInstance().destroyGameEffectById(GameEffectsManager_1.GameEffectId.zhen_de_active_skill_1, light);
            GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.zhen_de_active_skill_2, light.getPosition());
            // //左右两边的英雄加特效
            // //如果是射手相邻的英雄，不包括自己
            // let teamList=GameManager.getInstance().cur_team_list;
            // let sheshouIndex=teamList.indexOf(this.hero_type);
            // let buffValue=this.hero_data.getSkillValue1(SkillType.Active);
            // let remainTime=this.hero_data.getSkillValue2(SkillType.Active);
            // MyTool.randomSceneShakeSmall();
            // WallManager.getInstance().getMainWall().removeAllDeBuff();
            // GameManager.getInstance().all_hero.forEach((v,k)=>{
            //     //特效
            //     v.removeAllDeBuff();
            //     let heroIndex=teamList.indexOf(k);
            //     if(sheshouIndex!=heroIndex && Math.abs(sheshouIndex-heroIndex)<=1){
            //         let buffData=new BuffData();
            //         buffData.buff_id=BuffId.Hero_ZhenDe_Gongsu;
            //         buffData.buff_type=BuffType.Gain;
            //         buffData.game_effect_id=GameEffectId.zhen_de_active_skill_3;
            //         buffData.buff_value=[buffValue];
            //         buffData.remain_time=remainTime;
            //         v.addBuff(buffData);
            //     }
            //     //减少除自己之外的cd
            //     if(cdT>0&&v.hero_type!=this.hero_type){                    
            //         v.changeCD(-cdT);
            //     }
            // })
            //战车加护盾
            WallManager_1.default.getInstance().getMainWall().addShield(_this.hero_type, HeroConfig_1.ShieldType.All, 5, 0.1 * _this.hero_data.total_hp, GameEffectsManager_1.GameEffectId.zhen_de_beidong_skill_wall);
            // WallManager.getInstance().getMainWall().addShield(this.hero_type,ShieldType.All,this.hero_data.getSkillValue3(SkillType.Active),this.hero_data.getSkillValue3(SkillType.Active)*this.hero_data.total_hp);
        }).start();
        SkillManager_1.default.getInstance().setIsSkillState(false);
    };
    ZhenDe.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return;
        }
        _super.prototype.update.call(this, dt);
        this.zhiliao_jishu += dt;
        if (this.zhiliao_jishu >= this.zhiliao_time) {
            this.zhiliao_jishu = 0;
            //this.startSkill1();
        }
    };
    ZhenDe = __decorate([
        ccclass
    ], ZhenDe);
    return ZhenDe;
}(Hero_1.default));
exports.default = ZhenDe;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcWmhlbkRlXFxaaGVuRGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQStEO0FBQy9ELGlFQUE0RDtBQUM1RCx1RUFBb0Y7QUFDcEYsMkRBQXNEO0FBQ3RELHVEQUFrRDtBQUNsRCxvREFBK0M7QUFDL0Msb0RBQStDO0FBQy9DLDREQUE0RDtBQUM1RCxnRUFBMkQ7QUFFM0QseURBQW9EO0FBR3BELHdDQUF1QztBQUN2QyxnQ0FBMkI7QUFDM0IsNENBQTZIO0FBQzdILHlDQUFvQztBQUU5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFvQywwQkFBSTtJQUF4QztRQUFBLHFFQXFSQztRQXBSRyxVQUFVO1FBQ1YsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsdUJBQWlCLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7O0lBaVIvQyxDQUFDO0lBL1FHLHVCQUFNLEdBQU47UUFFSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLFNBQVM7UUFDVCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELGlCQUFNLHFCQUFxQixZQUFDLGlDQUFZLENBQUMscUJBQXFCLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsaUJBQU0scUJBQXFCLFlBQUMsaUNBQVksQ0FBQywwQkFBMEIsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxpQkFBTSxxQkFBcUIsWUFBQyxpQ0FBWSxDQUFDLHNCQUFzQixFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25F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SSxHQXFSdkM7a0JBclJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEdhbWVTdGF0ZSwgSXNEZWJ1ZywgSmlhU3UgfSBmcm9tIFwiLi4vLi4vLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGaWdodGluZ01hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvRmlnaHRpbmdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCBTa3lNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lL1NreU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSB9IGZyb20gXCIuLi8uLi8uLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi4vSGVyb1wiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBHb25nSmlfRmFuZ1hpYW5nLCBIZXJvX1N0YXRlLCBIZXJvX1R5cGUsIFNoaWVsZFR5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBaaGVuRGVEYW4gZnJvbSBcIi4vWmhlbkRlRGFuXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpoZW5EZSBleHRlbmRzIEhlcm8ge1xyXG4gICAgLyoq5rK755aX6K6h5pWwICovXHJcbiAgICB6aGlsaWFvX2ppc2h1Om51bWJlcj0wO1xyXG4gICAgemhpbGlhb190aW1lOm51bWJlcj0wO1xyXG4gICAgY3VyX3JlbGVhc2Vfc2tpbGw6U2tpbGxUeXBlPVNraWxsVHlwZS5OdWxsOyBcclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIC8v5Yqg6L295oqA6IO95oyH56S65ZmoXHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2F0dGFjaywxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYXR0YWNrX2hpdCwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYmVpZG9uZ19za2lsbCwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYmVpZG9uZ19za2lsbF93YWxsLDEpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMSwxKTtcclxuICAgICAgICBzdXBlci5hZGRMb2FkQnlHYW1lRWZmZWN0SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzIsMik7XHJcbiAgICAgICAgc3VwZXIuYWRkTG9hZEJ5R2FtZUVmZmVjdElkKEdhbWVFZmZlY3RJZC56aGVuX2RlX2FjdGl2ZV9za2lsbF8zLDIpO1xyXG4gICAgICAgIHN1cGVyLmFkZExvYWRCeUdhbWVFZmZlY3RJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGlsaWFvX2hhbG9faGl0LDIpO1xyXG4gICAgICAgIHRoaXMuaXNfTG9hZExvYWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLmFkZFNraWxsTGlzdGVuKHRoaXMudXNlU2tpbGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQXR0YWNrTGlzdGVuKHRoaXMubm9ybWFsQXR0YWNrKTtcclxuICAgICAgICB0aGlzLmFkZFh1YW5ZdW5MaXN0ZW4odGhpcy5vblh1YW5ZdW5SZXN1bHQpO1xyXG4gICAgICAgIHRoaXMuYWRkR2FtZVdpbkxpc3Rlbih0aGlzLnJlc2V0U2tpbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pc19uZWVkX2NoZWNrX2Rpc3RhbmNlPWZhbHNlO1xyXG4gICAgICAgIHN1cGVyLnNldFNraWxsVGlwU2l6ZSgxNjgwLDYwMCk7XHJcbiAgICAgICAgdGhpcy56aGlsaWFvX3RpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRTa2lsbCgpe1xyXG4gICAgICAgIHRoaXMuemhpbGlhb19qaXNodT0wO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblh1YW5ZdW5SZXN1bHQoaXNYdWFuWXVuOmJvb2xlYW4pe1xyXG4gICAgICAgIGlmKGlzWHVhbll1bil7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbCh0aGlzLnNraWxsX3F1ZXVlLnNoaWZ0KCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5qC55o2u5LiK5Liq54q25oCB5Yik5pat6ZyA6KaB5YGa5LuA5LmIXHJcbiAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSxHb25nSmlfRmFuZ1hpYW5nLnpob25nKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaUu+WHuy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIFxyXG5cclxuICAgIGNyZWF0ZVpoZW5EZURhbihpZDpHYW1lRWZmZWN0SWQsamlhbnNoaVBvczpjYy5WZWMyLHNwZWVkOm51bWJlcixkaXI6bnVtYmVyLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBsZXQgbm9kZT1GaWdodGluZ01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChpZCxqaWFuc2hpUG9zKTtcclxuICAgICAgICBub2RlLmdldENvbXBvbmVudChaaGVuRGVEYW4pLmluaXQoaWQsc3BlZWQsZGlyLGdqRGF0YSk7XHJcbiAgICB9ICAgXHJcblxyXG5cclxuICAgIG5vcm1hbEF0dGFjayhtb25zdGVyOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ29uZ2ppPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3RhcnRBdHRhY2sobW9uc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRBdHRhY2soZW5lbXlOb2RlOmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGVuZW15UG9zPWVuZW15Tm9kZS5nZXRDb21wb25lbnQoTW9uc3RlcikuZ2V0U2hlU2hvdVBvcygpO1xyXG4gICAgICAgIGxldCBmYW5neGlhbmc9dGhpcy5nZXRGYW5nWGlhbmdCeVBvcyhlbmVteVBvcyk7ICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgZGF0YS5uYW1lPVwiQXR0YWNrXCI7XHJcbiAgICAgICAgZGF0YS5jYWxsYmFjaz0oKT0+e1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfWkRBdHRhY2spO1xyXG4gICAgICAgICAgICBsZXQgamlhbnNoaVBvcz10aGlzLmdldENyZWF0ZUJ1bGxldFBvcygpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPWVuZW15UG9zLnN1YihqaWFuc2hpUG9zKTtcclxuICAgICAgICAgICAgbGV0IGppYW5zaGlEaXI9TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgIGxldCBnakRhdGE9c3VwZXIuZ2V0R29uZ0ppRGF0YShEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLFNraWxsVHlwZS5OdWxsKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVaaGVuRGVEYW4oR2FtZUVmZmVjdElkLnpoZW5fZGVfYXR0YWNrLGppYW5zaGlQb3MsdGhpcy5idWxsZXRfc3BlZWQsamlhbnNoaURpcixnakRhdGEpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzX2RvdWJsZV9hdHRhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldE5vcm1hbEF0dGFjaygpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29uZ2ppX2ppc2h1PTA7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5hdHRhY2ssZmFuZ3hpYW5nLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsdGhpcy5jdXJfZmFuZ3hpYW5nKTtcclxuICAgICAgICAgICAgLyoq5qaC546HICovXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTa2lsbDIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1NraWxsMigpe1xyXG4gICAgICAgIGlmKHRoaXMuaGVyb19kYXRhLmdldElzVW5sb2NrKFNraWxsVHlwZS5QYXNzaXZlXzIpKXtcclxuICAgICAgICAgICAgbGV0IHJhdGU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTEoU2tpbGxUeXBlLlBhc3NpdmVfMik7XHJcbiAgICAgICAgICAgIGlmKHJhdGUmJk1hdGgucmFuZG9tKCk8cmF0ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXJ0U2tpbGwxKCl7ICAgICAgICBcclxuICAgICAgICBpZihzdXBlci5nZXRIZXJvU3RhdGUoKT09SGVyb19TdGF0ZS5pZGxlJiZzdXBlci5pc0hhdmVEZUJ1ZmYoQnVmZklkLk1vbnN0ZXJfWHVhbll1bik9PWZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJfcmVsZWFzZV9za2lsbD1Ta2lsbFR5cGUuUGFzc2l2ZV8xO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT1uZXcgS2V5RnJhbWVEYXRhKCk7XHJcbiAgICAgICAgICAgIGRhdGEubmFtZT1cIlBhc3NpdmUxXCI7XHJcbiAgICAgICAgICAgIGRhdGEuY2FsbGJhY2s9KCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGw9U2tpbGxUeXBlLk51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvbmdqaV9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19aaGVuRGVfSmlhWHVlSmlhblNoYW5nO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3ZhbHVlPVt0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8xKSpXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKSx0aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMyhTa2lsbFR5cGUuUGFzc2l2ZV8xKV07XHJcbiAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT01O1xyXG4gICAgICAgICAgICAgICAgLy8gYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLmNoYW5nX21hb19zaG91X3NraWxsX2FjdGl2ZV8xO1xyXG4gICAgICAgICAgICAgICAgYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU9MTtcclxuICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRCdWZmKGJ1ZmZEYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1cGVyLnNldEhlcm9TdGF0ZUFuZEFuaW1hdGlvbihIZXJvX1N0YXRlLnNraWxsLFwiUGFzc2l2ZTFcIixmYWxzZSxbZGF0YV0sKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SGVyb1N0YXRlKEhlcm9fU3RhdGUuaWRsZSx0aGlzLmN1cl9mYW5neGlhbmcpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5za2lsbF9xdWV1ZS5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX3F1ZXVlLnB1c2goU2tpbGxUeXBlLlBhc3NpdmVfMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwyKCl7XHJcbiAgICAgICAgLy8gaWYoc3VwZXIuZ2V0SGVyb1N0YXRlKCk9PUhlcm9fU3RhdGUuaWRsZSYmc3VwZXIuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5Nb25zdGVyX1h1YW5ZdW4pPT1mYWxzZSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGw9U2tpbGxUeXBlLlBhc3NpdmVfMjsgICAgICBcclxuICAgICAgICAvLyAgICAgbGV0IGRhdGE9bmV3IEtleUZyYW1lRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICBkYXRhLm5hbWU9XCJQYXNzaXZlMVwiO1xyXG4gICAgICAgIC8vICAgICBkYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cl9yZWxlYXNlX3NraWxsPVNraWxsVHlwZS5OdWxsO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5nb25namlfamlzaHU9MDtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBoZXJvSWQ9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYW5kSGVyb0lkKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSx0aGlzLmhlcm9fdHlwZSxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl90ZWFtX2xpc3QpO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYoaGVyb0lkIT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bdGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMildO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPTU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLk51bGw7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGhlcm9JZCkuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy/nibnmlYhcclxuICAgICAgICAvLyAgICAgICAgICAgICBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYmVpZG9uZ19za2lsbCxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChoZXJvSWQpLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgc3VwZXIuc2V0SGVyb1N0YXRlQW5kQW5pbWF0aW9uKEhlcm9fU3RhdGUuc2tpbGwsXCJQYXNzaXZlMVwiLGZhbHNlLFtkYXRhXSwoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5pZGxlLHRoaXMuY3VyX2Zhbmd4aWFuZyk7XHJcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnNraWxsX3F1ZXVlLmxlbmd0aD4wKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwodGhpcy5za2lsbF9xdWV1ZS5zaGlmdCgpKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2tpbGxfcXVldWUucHVzaChTa2lsbFR5cGUuUGFzc2l2ZV8yKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuZ2V0TWF4SHAoKSooMC4wMSt0aGlzLmhlcm9fbHZsKjAuMDAyKSk7XHJcbiAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmFkZEhwQnVmZigpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0U2tpbGwoc2tpbGxUeXBlOlNraWxsVHlwZSl7XHJcbiAgICAgICAgc3dpdGNoKHNraWxsVHlwZSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgU2tpbGxUeXBlLlBhc3NpdmVfMTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0U2tpbGwxKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2lsbFR5cGUuUGFzc2l2ZV8yOntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRTa2lsbDIoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDvS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gICAgXHJcbiAgICB1c2VTa2lsbChwb3M6Y2MuVmVjMik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgLyoq5aaC5p6c5pyJ5o6n5Yi25oqA6IO9ICovXHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWxlYXNlU2tpbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydFNlbGZYdUxpKHBvcyk7XHJcbiAgICAgICAgfSx0aGlzLm5vZGUpO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGwhPVNraWxsVHlwZS5OdWxsKXtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9xdWV1ZS5wdXNoKHRoaXMuY3VyX3JlbGVhc2Vfc2tpbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNlbGZYdUxpKHBvczpjYy5WZWMyKXtcclxuICAgICAgICAvL+iThOWKm+W4p+ebkeWQrFxyXG4gICAgICAgIGxldCBoZXJvUm9vdD1jYy5maW5kKCdDYW52YXMvSGVyb19Sb290Jyk7XHJcbiAgICAgICAgLy/lj5HlsITluKfnm5HlkKxcclxuICAgICAgICBsZXQgZmFzaGVEYXRhPW5ldyBLZXlGcmFtZURhdGEoKTtcclxuICAgICAgICBmYXNoZURhdGEubmFtZT1cIkZhU2hlXCI7XHJcbiAgICAgICAgZmFzaGVEYXRhLmNhbGxiYWNrPSgpPT57XHJcbiAgICAgICAgICAgIC8v5Y+v5Lul5Y+R5bCEXHJcbiAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFRpbWVTdG9wKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudD1oZXJvUm9vdDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnpJbmRleD0yO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0TGF1bmNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Iux6ZuE5Yqo5L2c5pKt5pS+XHJcbiAgICAgICAgdGhpcy5zZXRIZXJvU3RhdGUoSGVyb19TdGF0ZS5za2lsbCxHb25nSmlfRmFuZ1hpYW5nLnpob25nLFtmYXNoZURhdGFdLCgpPT57XHJcbiAgICAgICAgICAgIC8v5Yqo5L2c5a6M5q+V5ZCO54q25oCB6L+Y5piv5oqA6IO954q25oCB77yM5Yqo55S76KaB5pKt5pS+5b6F5py655qEXHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRHb25nSmlKaVNodSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldEhlcm9TdGF0ZShIZXJvX1N0YXRlLmlkbGUsR29uZ0ppX0ZhbmdYaWFuZy56aG9uZyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2tpbGxfcXVldWUubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNraWxsKHRoaXMuc2tpbGxfcXVldWUuc2hpZnQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT1KaWFTdTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfWkRTa2lsbCk7XHJcbiAgICB9XHJcbiAgICAvKirlnKjnm67moIfljLrln5/nmoTlt6blj7PkuKTovrnlkITlj6zllKTkuIDpmLXol6TolJPlhrLlh7vms6LvvIzol6TolJPlhrLlh7vms6LkvJrlkJHlsY/luZXlj6bkuIDnq6/mu5rliqjvvIzpgJTkuK3pgJ/luqbkvJrpgJDmuJDliqDlv6vvvIzlr7nop6bnorDliLDnmoTmlYzkurrpgKDmiJB75Y+C5pWwMX0l5Lyk5a6z77yM5bm26YCg5oiQe+WPguaVsDJ956eS55yp5pmV5pWI5p6cICovXHJcbiAgICBzdGFydExhdW5jaChwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgc3VwZXIuc2V0QXR0U3BpbmVTY2FsZSgpO1xyXG4gICAgICAgIC8v5LiT5q2mXHJcbiAgICAgICAgbGV0IGV4MT10aGlzLmhlcm9fZGF0YS5FeGNsdXNpdmVXZWFwb25Ta2lsbFZhbHVlXzE7XHJcbiAgICAgICAgbGV0IGNkVD0wO1xyXG4gICAgICAgIGlmKGV4MSYmZXgxPjApe1xyXG4gICAgICAgICAgICBjZFQ9ZXgxO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WFiemAn+S4i+adpVxyXG4gICAgICAgIGxldCBsaWdodD1Ta3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzEsY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjQwKSk7XHJcbiAgICAgICAgY2MudHdlZW4obGlnaHQpLnRvKDAuMSpHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdhbWVSYXRlKCkse3k6dGhpcy5ub2RlLnkrdGhpcy54dWFueXVuX3Bvcy55fSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5kZXN0cm95R2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzEsbGlnaHQpO1xyXG4gICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuemhlbl9kZV9hY3RpdmVfc2tpbGxfMixsaWdodC5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gLy/lt6blj7PkuKTovrnnmoToi7Hpm4TliqDnibnmlYhcclxuICAgICAgICAgICAgLy8gLy/lpoLmnpzmmK/lsITmiYvnm7jpgrvnmoToi7Hpm4TvvIzkuI3ljIXmi6zoh6rlt7FcclxuICAgICAgICAgICAgLy8gbGV0IHRlYW1MaXN0PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX3RlYW1fbGlzdDtcclxuICAgICAgICAgICAgLy8gbGV0IHNoZXNob3VJbmRleD10ZWFtTGlzdC5pbmRleE9mKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgLy8gbGV0IGJ1ZmZWYWx1ZT10aGlzLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMShTa2lsbFR5cGUuQWN0aXZlKTtcclxuICAgICAgICAgICAgLy8gbGV0IHJlbWFpblRpbWU9dGhpcy5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLkFjdGl2ZSk7XHJcbiAgICAgICAgICAgIC8vIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgICAgICAgICAgLy8gV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgLy8gICAgIC8v54m55pWIXHJcbiAgICAgICAgICAgIC8vICAgICB2LnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGhlcm9JbmRleD10ZWFtTGlzdC5pbmRleE9mKGspO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoc2hlc2hvdUluZGV4IT1oZXJvSW5kZXggJiYgTWF0aC5hYnMoc2hlc2hvdUluZGV4LWhlcm9JbmRleCk8PTEpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX1poZW5EZV9Hb25nc3U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLkdhaW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLnpoZW5fZGVfYWN0aXZlX3NraWxsXzM7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnVmZkRhdGEuYnVmZl92YWx1ZT1bYnVmZlZhbHVlXTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT1yZW1haW5UaW1lO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHYuYWRkQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAvL+WHj+WwkemZpOiHquW3seS5i+WklueahGNkXHJcbiAgICAgICAgICAgIC8vICAgICBpZihjZFQ+MCYmdi5oZXJvX3R5cGUhPXRoaXMuaGVyb190eXBlKXsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHYuY2hhbmdlQ0QoLWNkVCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIC8v5oiY6L2m5Yqg5oqk55u+XHJcbiAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5hZGRTaGllbGQodGhpcy5oZXJvX3R5cGUsU2hpZWxkVHlwZS5BbGwsNSwwLjEqdGhpcy5oZXJvX2RhdGEudG90YWxfaHAsR2FtZUVmZmVjdElkLnpoZW5fZGVfYmVpZG9uZ19za2lsbF93YWxsKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvLyBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYWRkU2hpZWxkKHRoaXMuaGVyb190eXBlLFNoaWVsZFR5cGUuQWxsLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpLHRoaXMuaGVyb19kYXRhLmdldFNraWxsVmFsdWUzKFNraWxsVHlwZS5BY3RpdmUpKnRoaXMuaGVyb19kYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldElzU2tpbGxTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuemhpbGlhb19qaXNodSs9ZHQ7XHJcbiAgICAgICAgaWYodGhpcy56aGlsaWFvX2ppc2h1Pj10aGlzLnpoaWxpYW9fdGltZSl7XHJcbiAgICAgICAgICAgIHRoaXMuemhpbGlhb19qaXNodT0wO1xyXG4gICAgICAgICAgICAvL3RoaXMuc3RhcnRTa2lsbDEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19