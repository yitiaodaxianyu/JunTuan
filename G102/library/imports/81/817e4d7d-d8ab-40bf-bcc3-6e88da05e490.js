"use strict";
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