"use strict";
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