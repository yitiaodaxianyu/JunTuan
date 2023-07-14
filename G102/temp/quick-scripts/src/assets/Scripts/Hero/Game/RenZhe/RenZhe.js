"use strict";
cc._RF.push(module, '26489rHNaxMH6HhqtxTTS+e', 'RenZhe');
// Scripts/Hero/Game/RenZhe/RenZhe.ts

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
var SkillManager_1 = require("../../../Game/SkillManager");
var GameManager_1 = require("../../../GameManager");
var Monster_1 = require("../../../Monster/Monster");
var MonsterData_1 = require("../../../Monster/MonsterData");
var MonsterManager_1 = require("../../../Monster/MonsterManager");
var AudioConstants_1 = require("../../../Sound/AudioConstants");
var WallManager_1 = require("../../../Wall/WallManager");
var Hero_1 = require("../Hero");
var HeroConfig_1 = require("../HeroConfig");
var ActiveDart_1 = require("./ActiveDart");
var Dart_1 = require("./Dart");
var EllipseMove_1 = require("./EllipseMove");
var FeiBiao_1 = require("./FeiBiao");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RenZhe = /** @class */ (function (_super) {
    __extends(RenZhe, _super);
    function RenZhe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**当前存在的被动飞镖节点 */
        _this.cur_feibiao = [];
        _this.no_paopao_num = 0;
        return _this;
    }
    //---------------------------------------------加载----------------------------------------------
    RenZhe.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_att,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_hit,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_hudun,1);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_1,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_skill_ex,4);        
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_hit,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_end,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_move,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_end,2);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_light_move,2);        
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_huanrao,4);
        // super.addLoadByGameEffectId(GameEffectId.renzhe_feibiao_active_ground_move,1);
        this.addSkillListen(this.useSkill);
        this.addAttackListen(this.normalAttack);
        this.addXuanYunListen(this.onXuanYunResult);
        this.addHitListen(this.onHitMonster);
        this.addResetListen(this.onResetState);
    };
    RenZhe.prototype.onResetState = function () {
        var num = this.cur_feibiao.length;
        // for(let i=0; i<num; i++){
        //     GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.renzhe_feibiao_huanrao,this.cur_feibiao[i]);
        // }
    };
    RenZhe.prototype.onXuanYunResult = function (isXuanYun) {
        if (isXuanYun) {
            this.unscheduleAllCallbacks();
        }
        else {
            //根据上个状态判断需要做什么
            this.setHeroState(HeroConfig_1.Hero_State.idle, HeroConfig_1.GongJi_FangXiang.zhong);
        }
    };
    //---------------------------------------------攻击-------------------------------------------------
    RenZhe.prototype.onHitMonster = function (damageType, isCrit, monster) {
        if (isCrit && damageType == HeroConfig_1.DamageType.Normal) {
            if (!MonsterManager_1.default.getInstance().checkWallMonster(300)) {
                var rate = this.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_2);
                if (rate && Math.random() < rate) {
                    WallManager_1.default.getInstance().getMainWall().addImmunityShield(HeroConfig_1.ShieldId.RenZhe_Skill2, HeroConfig_1.ShieldType.Skill, 5, 5);
                    // super.addBuff(Hero_Buff.renzhe_skill_2immunity_skill,{
                    //     remain_time: 5+this.hero_data.ExclusiveWeaponSkillValue_4,
                    //     damage_num: 0,
                    //     jiange_time: 1,
                    //     hero_type: this.hero_type,
                    //     other_value_1:1,
                    // })
                }
            }
        }
    };
    RenZhe.prototype.normalAttack = function (monster) {
        if (GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing)
            return;
        //求出方向
        this.is_can_gongji = false;
        this.startAttack(monster);
    };
    RenZhe.prototype.startAttack = function (enemyNode) {
        var _this = this;
        var enemyPos = enemyNode.getComponent(Monster_1.default).getSheShouPos();
        var fangxiang = this.getFangXiangByPos(enemyPos);
        var data = new MonsterData_1.KeyFrameData();
        data.name = "Attack";
        data.callback = function () {
            var jianshiPos = _this.getCreateBulletPos();
            var offsetPos = enemyPos.sub(jianshiPos);
            var jianshiDir = Math.atan2(offsetPos.y, offsetPos.x);
            var gjData = _super.prototype.getGongJiData.call(_this, HeroConfig_1.DamageType.Normal, true, HeroConfig_1.SkillType.Null);
            //判断是否有敌军在300范围内
            if (!MonsterManager_1.default.getInstance().checkWallMonster(300)) {
                //test
                gjData.hero_data.Hit += gjData.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_2);
            }
            //先判断有没有被动飞镖
            if (_this.cur_feibiao.length > 0) {
                //减少一个飞镖
                var node = _this.cur_feibiao.pop();
                // GameEffectsManager.getInstance().destroyGameEffectById(GameEffectId.renzhe_feibiao_huanrao,node);
                // this.createFeiBiao(GameEffectId.renzhe_feibiao_skill_1,jianshiPos,this.bullet_speed,enemyNode,gjData);                
                var num = _this.cur_feibiao.length;
                var angle = num > 0 ? 360 / num : 0;
                for (var i = 0; i < num; i++) {
                    _this.cur_feibiao[i].getComponent(EllipseMove_1.default).refreshAngle(i * angle);
                }
            }
            else {
                var rate = _this.hero_data.getSkillValue1(HeroConfig_1.SkillType.Passive_1);
                var feibiaoId = 0;
                if (_this.hero_data.ExclusiveWeaponSkillValue_1 > 0 && _this.no_paopao_num >= _this.hero_data.ExclusiveWeaponSkillValue_1) {
                    rate = 1;
                    //feibiaoId=GameEffectId.renzhe_feibiao_skill_ex;
                }
                if (rate && Math.random() < rate) {
                    _this.createFeiBiao(feibiaoId, jianshiPos, _this.bullet_speed, enemyNode, gjData);
                    _this.no_paopao_num = 0;
                }
                else {
                    //this.createDart(GameEffectId.renzhe_feibiao_att,jianshiPos,this.bullet_speed,jianshiDir,gjData);
                    _this.no_paopao_num++;
                }
            }
        };
        _super.prototype.setHeroState.call(this, HeroConfig_1.Hero_State.attack, fangxiang, [data], function () {
            _this.setHeroState(HeroConfig_1.Hero_State.idle, _this.cur_fangxiang);
        });
    };
    RenZhe.prototype.createDart = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(Dart_1.default).init(id, speed, dir, gjData);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_RenzheAttack);
    };
    RenZhe.prototype.createActiveDart = function (id, jianshiPos, speed, dir, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, jianshiPos);
        node.getComponent(ActiveDart_1.default).init(id, speed, dir, gjData);
    };
    RenZhe.prototype.createFeiBiao = function (id, pos, speed, target, gjData) {
        var node = FightingManager_1.default.getInstance().createGameEffectById(id, pos);
        node.getComponent(FeiBiao_1.default).init(id, gjData, speed, target, 5);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_RenzheAttack);
    };
    //---------------------------------------------技能-----------------------------------------------------
    RenZhe.prototype.useSkill = function (pos) {
        var _this = this;
        SkillManager_1.default.getInstance().releaseSkill(function () {
            _this.startSelfXuLi();
        }, this.node);
        return 0;
    };
    RenZhe.prototype.startSelfXuLi = function () {
        //蓄力帧监听        
        //怪物
    };
    RenZhe.prototype.startLaunch = function (groundMove, lightMove, monster) {
        // 
    };
    RenZhe = __decorate([
        ccclass
    ], RenZhe);
    return RenZhe;
}(Hero_1.default));
exports.default = RenZhe;

cc._RF.pop();