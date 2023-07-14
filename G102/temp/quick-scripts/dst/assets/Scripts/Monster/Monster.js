
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Monster.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '43abeF3DnhCGLVjn0lYhFwx', 'Monster');
// Scripts/Monster/Monster.ts

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
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var HpProgressBar_1 = require("./HpProgressBar");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var GameManager_1 = require("../GameManager");
var MonsterData_1 = require("./MonsterData");
var MonsterConfigure_1 = require("./Data/MonsterConfigure");
var MonsterManager_1 = require("./MonsterManager");
var MonsterGrowthAttributes_1 = require("./Data/MonsterGrowthAttributes");
var GroundManager_1 = require("../Game/GroundManager");
var Constants_1 = require("../Constants");
var BossChallenge_1 = require("../Activity/BossChallenge");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var BuffTimer_1 = require("../Hero/Game/BuffTimer");
var BuffData_1 = require("../Hero/Game/BuffData");
var SkillManager_1 = require("../Game/SkillManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MonsterSkill_1 = require("./Data/MonsterSkill");
var WallManager_1 = require("../Wall/WallManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**怪物通用类，只处理数据，不处理表现 */
var Monster = /** @class */ (function (_super) {
    __extends(Monster, _super);
    function Monster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spine = null;
        /**皮肤类型 */
        _this.skin_type = MonsterData_1.MonsterSkinType.Skin1;
        /**怪物id */
        _this.monster_id = 10011;
        /**怪物等级 */
        _this.monster_level = 1;
        /**怪物血量系数 */
        _this.monster_hp_rate = 1;
        /**怪物种类 */
        _this.monster_type = 1;
        /**怪物的最终战斗使用的数值,可更改 */
        _this.monster_data = null;
        /**怪物的基础战斗数值，不可更改 */
        _this.base_attribute_data = null;
        /**怪物的基础数值 */
        _this.base_data = null;
        /**怪物的隐藏属性 */
        _this.hidden_attribute = null;
        _this.cur_move_speed = 0;
        _this.move_target_pos = null;
        _this.move_direction = Math.PI * 3 / 2;
        /**朝向名称 */
        _this.face_type = MonsterData_1.MonsterFaceName.Front;
        /**当前的血量 */
        _this.cur_hp = 0;
        /**最大的血量 */
        _this.max_hp = 0;
        /**血条进度条 */
        _this.hp_progress = null;
        /**阴影 */
        _this.shadow = null;
        _this.shadow_pos = null;
        _this.shadow_size = null;
        /**减伤率 */
        _this.jianshang_rate = 0;
        /**增伤率 */
        _this.zengshang_rate = 0;
        /**攻击间隔（秒，表示多少秒攻击一次） */
        _this.att_jiange = 1;
        /**攻击计时 */
        _this.att_jishu = 0;
        /**技能计时 */
        _this.skill_jishu = 0;
        /**当前的攻击力 */
        _this.cur_att = 0;
        /**当前的韧性 */
        _this.cur_toughness = 0;
        /**攻击目标,攻击目标为null时，目标就是城墙 */
        _this.att_target = null;
        /**怪物当前的状态 */
        _this.monster_state = EnemyConfig_1.Enemy_State.standby;
        /**怪物上一个状态 */
        _this.prev_state = EnemyConfig_1.Enemy_State.standby;
        /**怪物当前拥有的buff */
        _this.monster_buff = null;
        /**怪物当前拥有的debuff */
        _this.monster_debuff = null;
        /**指定的缩放值*/
        _this.setup_scale = 0.4;
        _this.is_boss = false;
        _this.is_can_count = true;
        _this.is_count = true;
        /**城墙的Y轴坐标 */
        _this.wall_yy = 0;
        _this.att_pos = cc.v2(0, 0);
        /**分数 */
        _this.score = 0;
        /**狙击瞄准的位置 */
        _this.juji_pos = cc.v2(0, 0);
        /**血条的位置 */
        _this.hp_pos = cc.v2(0, 0);
        /**中心位置，用于范围检测 */
        _this.center_pos = cc.v2(0, 0);
        //受伤动作
        _this.injured_action = null;
        /**初始化回调 */
        _this.init_callback = null;
        /**怪物血量发生变化时的回调 */
        _this.change_hp_callback = null;
        /**眩晕回调，用于boss施法被中断 */
        _this.xuanyun_callback = null;
        /**死亡回调，怪物死亡时触发，用于播放自身对应的死亡动画 */
        _this.death_callback = null;
        /**被主动技能受伤时的回调 */
        _this.active_injury_callback = null;
        /**移动到目标地点回调 */
        _this.move_end_callback = null;
        /**debuff增伤统计 */
        _this.injury_damage_stats = null;
        /**沟壑伤害计算 */
        _this.is_can_gully = false;
        /**拥有的光环 */
        _this.monster_halo = null;
        /**额外的闪避率 */
        _this.ex_miss_rate = 0;
        /**额外的防御力 */
        _this.ex_defense_value = 0;
        /**额外的移动速度 */
        _this.ex_move_speed_value = 0;
        /**-------------------------------技能的--------------------------------------------- */
        /**技能数据 */
        _this.skill_data = null;
        /**所有技能的当前的冷却时间 */
        _this.skill_cold_down = [];
        /**技能队列 */
        _this.skill_queue = [];
        /**当前使用的技能,0代表没有 */
        _this.cur_skill_index = 0;
        /**碰撞器 */
        _this.collider = null;
        /**要攻击的城墙 */
        _this.att_wall = null;
        /**牵引最小距离 */
        _this.min_qianyin = 0;
        _this.cur_color = MonsterData_1.ColorType.Null;
        return _this;
    }
    Monster.prototype.onLoad = function () {
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_normal_att, 8);
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_move,2);
        // GameEffectsManager.getInstance().addEffectPoolById(GameEffectId.boss1_att_end,2);
        GameEffectsManager_1.GameEffectsManager.getInstance().addEffectPoolById(GameEffectsManager_1.GameEffectId.monster_die, 8);
        this.spine = this.node.getComponent(sp.Skeleton);
        this.loadInitPos();
        this.wall_yy = GameManager_1.default.getInstance().enemy_att_y;
        this.monster_buff = new Map();
        this.monster_debuff = new Map();
        this.monster_halo = new Map();
        this.collider = this.node.getComponent(cc.Collider);
        this.collider.enabled = true;
    };
    Monster.prototype.init = function (monsterId, level, hpRate, isCanCount) {
        if (isCanCount === void 0) { isCanCount = true; }
        this.monster_id = monsterId;
        this.monster_level = level;
        this.monster_hp_rate = hpRate;
        var jsonData = MonsterConfigure_1.MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterId);
        this.monster_type = jsonData.MonsterClass;
        var attributeId = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getId(this.monster_id, level);
        this.base_attribute_data = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attributeId);
        this.is_can_gully = true;
        this.is_can_count = isCanCount;
        this.is_count = this.is_can_count;
        this.ex_miss_rate = 0;
        this.ex_defense_value = 0;
        //this.initOutward(jsonData.Skin);        
        this.initData(jsonData);
        this.addHpProgress();
        this.addShadow();
        this.setEnemyState(EnemyConfig_1.Enemy_State.standby);
        this.setColor(MonsterData_1.ColorType.Null);
        this.collider = this.node.getComponent(cc.Collider);
        this.collider.enabled = true;
        this.min_qianyin = 0;
        if (this.init_callback) {
            this.init_callback();
        }
        //this.spine.paused=false;
        //this.move_direction=Math.PI*3/2+Math.random()*(Math.PI/6)-(Math.PI/12);        
    };
    Monster.prototype.initSummon = function (monsterId, bossAttribute) {
        this.monster_id = monsterId;
        var jsonData = MonsterConfigure_1.MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterId);
        this.monster_type = jsonData.MonsterClass;
        this.is_can_gully = true;
        this.is_can_count = false;
        this.is_count = this.is_can_count;
        this.base_attribute_data = cc.instantiate(bossAttribute);
        switch (jsonData.StrengthType) {
            case MonsterData_1.StrengthType.Elite:
                {
                    this.base_attribute_data.Health = bossAttribute.Health / 50;
                    this.base_attribute_data.Attack = bossAttribute.Attack * 0.9724;
                    this.base_attribute_data.Defense = bossAttribute.Defense * 0.6;
                }
                break;
            case MonsterData_1.StrengthType.Normal:
                {
                    this.base_attribute_data.Health = bossAttribute.Health / 50;
                    this.base_attribute_data.Attack = bossAttribute.Attack * 0.9592;
                    this.base_attribute_data.Defense = 0;
                }
                break;
        }
        this.initData(jsonData);
        this.addHpProgress();
        this.addShadow();
        this.setEnemyState(EnemyConfig_1.Enemy_State.standby);
        this.setColor(MonsterData_1.ColorType.Null);
        this.collider = this.node.getComponent(cc.Collider);
        this.collider.enabled = true;
        this.min_qianyin = 0;
        if (this.init_callback) {
            this.init_callback();
        }
    };
    Monster.prototype.refreshData = function (level) {
        this.monster_level = level;
        var jsonData = MonsterConfigure_1.MonsterConfigureManager.getInstance().getJsonMonsterConfigure(this.monster_id);
        //重置数据
        var attributeId = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getId(this.monster_id, level);
        this.base_attribute_data = MonsterGrowthAttributes_1.MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attributeId);
        this.monster_data = cc.instantiate(this.base_attribute_data);
        this.base_data = jsonData;
        this.cur_hp = this.max_hp = this.monster_data.Health;
        this.cur_move_speed = this.base_data.Speed;
        this.att_jiange = 1 / this.base_data.AttackSpeed;
        this.cur_att = this.monster_data.Attack;
        // if(this.base_data.SkillNum>0){
        //     this.loadMonsterSkillData();
        // }
    };
    /**初始化外观*/
    // private initOutward(skinType:MonsterSkinType){
    //     this.skin_type=skinType;
    //     this.setSkin(this.getSkinName());
    //     this.playSpinAnimaton(this.getAnimaName(MonsterActionName.Idle),true);
    // }
    /**初始化数据 */
    Monster.prototype.initData = function (baseData) {
        this.monster_data = cc.instantiate(this.base_attribute_data);
        this.base_data = baseData;
        this.cur_hp = this.max_hp = this.monster_data.Health * this.monster_hp_rate;
        this.cur_move_speed = this.base_data.Speed;
        this.att_jiange = 1 / this.base_data.AttackSpeed;
        this.cur_att = this.monster_data.Attack;
        this.cur_toughness = 0;
        this.setup_scale = this.base_data.Scale;
        this.node.scale = this.setup_scale;
        this.node.opacity = 255;
        this.skin_type = baseData.Skin;
        this.hidden_attribute = new MonsterData_1.HiddenAttribute();
        this.injury_damage_stats = new Map();
        if (this.base_data.SkillNum > 0) {
            this.loadMonsterSkillData();
        }
    };
    Monster.prototype.loadMonsterSkillData = function () {
        var skillData = new MonsterData_1.MonsterSkillData();
        skillData.ColdDown = new Map();
        skillData.InitColdDown = new Map();
        skillData.SkillValue_1 = new Map();
        skillData.SkillValue_2 = new Map();
        skillData.SkillValue_3 = new Map();
        skillData.SkillValue_4 = new Map();
        skillData.CastingRange = new Map();
        for (var s = 1; s <= this.base_data.SkillNum; s++) {
            var id = MonsterSkill_1.MonsterSkillManager.getInstance().getId(this.monster_id, s, this.base_attribute_data.SkillLevel);
            var jsonData = MonsterSkill_1.MonsterSkillManager.getInstance().getJsonMonsterSkill(id);
            if (jsonData == null)
                continue;
            skillData.SkillValue_1.set(s, jsonData.SkillValue_1);
            skillData.SkillValue_2.set(s, jsonData.SkillValue_2);
            skillData.SkillValue_3.set(s, jsonData.SkillValue_3);
            skillData.SkillValue_4.set(s, jsonData.SkillValue_4);
            skillData.ColdDown.set(s, jsonData.ColdDown);
            skillData.InitColdDown.set(s, jsonData.InitialColdDown);
            this.skill_cold_down[s - 1] = jsonData.InitialColdDown;
            skillData.CastingRange.set(s, jsonData.CastingRange);
        }
        this.skill_data = skillData;
    };
    Monster.prototype.addHpProgress = function () {
        if (!this.hp_progress) {
            if (this.base_data.StrengthType != MonsterData_1.StrengthType.Boss) {
                this.hp_progress = GameManager_1.default.getInstance().enemy_hp_manager.createEnemyHp(cc.v2(this.node.x + this.hp_pos.x * this.setup_scale, this.node.y + this.hp_pos.y * this.setup_scale)).getComponent(HpProgressBar_1.default);
            }
            this.showHp();
        }
    };
    Monster.prototype.addShadow = function () {
        //if(this.base_data.StrengthType!=StrengthType.Boss)
        if (!this.shadow) {
            this.shadow = GroundManager_1.default.getInstance().createShadow(this.node.getPosition().add(this.shadow_pos));
            this.shadow.width = this.node.scaleX * this.shadow_size.width;
            this.shadow.height = this.node.scaleY * this.shadow_size.height;
        }
        else {
            this.shadow.opacity = 255;
            this.shadow.setPosition(this.node.getPosition().add(this.shadow_pos));
        }
    };
    Monster.prototype.showHp = function () {
        if (this.hp_progress) {
            this.hp_progress.changeProgress(this.cur_hp / this.max_hp);
        }
    };
    Monster.prototype.setIsCanCount = function (isCanCount) {
        this.is_can_count = isCanCount;
        // if(this.is_can_count==false){
        //     cc.log('setIsCanCount==false');
        // }
    };
    Monster.prototype.getSetupScale = function () {
        return this.setup_scale;
    };
    Monster.prototype.getSheShouAttackScale = function () {
        var scale = 0.3;
        switch (this.base_data.StrengthType) {
            case MonsterData_1.StrengthType.Normal:
                {
                    scale = 0.55;
                }
                break;
            case MonsterData_1.StrengthType.Elite:
                {
                    scale = 0.75;
                }
                break;
            case MonsterData_1.StrengthType.Boss:
                {
                    scale = 1.2;
                }
                break;
        }
        return scale;
    };
    Monster.prototype.getWallAttackScale = function () {
        var scale = 1;
        switch (this.base_data.StrengthType) {
            case MonsterData_1.StrengthType.Normal:
                {
                    scale = 0.6;
                }
                break;
            case MonsterData_1.StrengthType.Elite:
                {
                    scale = 0.9;
                }
                break;
        }
        return scale;
    };
    Monster.prototype.getXuanyunScale = function () {
        var scale = 0.3;
        switch (this.base_data.StrengthType) {
            case MonsterData_1.StrengthType.Normal:
                {
                    scale = 0.55 / this.setup_scale;
                }
                break;
            case MonsterData_1.StrengthType.Elite:
                {
                    scale = 0.75 / this.setup_scale;
                }
                break;
            case MonsterData_1.StrengthType.Boss:
                {
                    scale = 1.5 / this.setup_scale;
                }
                break;
        }
        return scale;
    };
    Monster.prototype.getStrengthType = function () {
        return this.base_data.StrengthType;
    };
    Monster.prototype.getMonsterData = function () {
        return this.monster_data;
    };
    /**计算伤害数据 */
    Monster.prototype.getInjuredData = function (gjData) {
        var data = new MonsterData_1.InjuredData();
        if (this.getIsDie()) {
            data.feedback_type = MonsterData_1.FeedBackType.Die;
            return data;
        }
        var gm = GameManager_1.default.getInstance();
        var missRate = 0;
        var critRate = 0;
        //如果是普通攻击，计算闪避和暴击，默认为0
        var heroData = gjData.hero_data;
        //怪物的防御力
        var selfDefense = this.monster_data.Defense + this.ex_defense_value;
        var finalDefense = MonsterData_1.InjuredData.calcFinalDefense(selfDefense, heroData.ignore_defense_rate);
        if (gjData.damage_type == HeroConfig_1.DamageType.Normal) {
            if (this.isHaveBuff(HeroConfig_1.BuffId.Boss2_MianYi_Attack)) {
                data.feedback_type = MonsterData_1.FeedBackType.MainYi;
                data.text_type = EnemyConfig_1.Enemy_Injured_Type.WuDi;
                gm.hp_text_manager.createTypeText(cc.v2(this.node.x, this.node.y + 60), EnemyConfig_1.Enemy_Injured_Type.WuDi, null);
                return data;
            }
            missRate = MonsterData_1.InjuredData.calcMissRate(this.monster_data.Miss, gjData.hero_data.Hit) + this.ex_miss_rate - gjData.hero_data.hit_ex;
            critRate = MonsterData_1.InjuredData.calcCritRate(gjData.hero_data.Critical, this.monster_data.AntiCritical);
            critRate += gjData.hero_data.crit_ex;
            //获取一个概率类型
            var type = MonsterData_1.InjuredData.calcOnceType([missRate, critRate, 1]);
            switch (type) {
                case 0:
                    {
                        //闪避
                        data.feedback_type = MonsterData_1.FeedBackType.ShanBi;
                        data.setDamageNum(0);
                        data.text_type = EnemyConfig_1.Enemy_Injured_Type.ShanBi;
                        gm.hp_text_manager.createTypeText(cc.v2(this.node.x, this.node.y + 60), EnemyConfig_1.Enemy_Injured_Type.ShanBi, null);
                    }
                    break;
                case 1:
                    {
                        //暴击
                        data.feedback_type = MonsterData_1.FeedBackType.BaoJi;
                        var damage = MonsterData_1.InjuredData.calcNormalCritDamageNum(heroData.total_attack, finalDefense, heroData.attack_increase_damage + heroData.all_increase_damage, this.jianshang_rate, MonsterData_1.InjuredData.calcFinalExtraCrit(heroData.ExtraCritical, this.monster_data.AntiExtraCritical));
                        data.setDamageNum(damage);
                        data.text_type = EnemyConfig_1.Enemy_Injured_Type.BaoJi;
                        if (gjData.pet_id == 0) {
                            GameManager_1.default.getInstance().all_hero.get(gjData.hero_type).onDamageMonster(HeroConfig_1.DamageType.Normal, true, this.node);
                        }
                        if (!gm.is_show_text) {
                            gm.hp_text_manager.createTypeText(cc.v2(this.node.x, this.node.y + 60), data.text_type, null);
                        }
                    }
                    break;
                case 2:
                    {
                        //普通命中
                        data.feedback_type = MonsterData_1.FeedBackType.Null;
                        var damage = MonsterData_1.InjuredData.calcNormalDamageNum(heroData.total_attack, finalDefense, heroData.attack_increase_damage + heroData.all_increase_damage, this.jianshang_rate);
                        data.setDamageNum(damage);
                        data.text_type = EnemyConfig_1.Enemy_Injured_Type.Normal_Attack;
                        if (gjData.pet_id == 0) {
                            GameManager_1.default.getInstance().all_hero.get(gjData.hero_type).onDamageMonster(HeroConfig_1.DamageType.Normal, false, this.node);
                        }
                    }
                    break;
            }
        }
        else if (gjData.damage_type == HeroConfig_1.DamageType.Skill) {
            //不需要计算闪避，技能必中
            data.feedback_type = MonsterData_1.FeedBackType.Null;
            var damage = 0;
            if (gjData.is_can_crit) {
                critRate = MonsterData_1.InjuredData.calcCritRate(gjData.hero_data.Critical, this.monster_data.AntiCritical);
                critRate += gjData.hero_data.crit_ex;
                //获取一个概率类型
                var type = MonsterData_1.InjuredData.calcOnceType([0, critRate, 1]);
                if (type == 1) {
                    data.feedback_type = MonsterData_1.FeedBackType.BaoJi;
                    data.text_type = EnemyConfig_1.Enemy_Injured_Type.BaoJi;
                    damage = MonsterData_1.InjuredData.calcSkillCritDamageNum(heroData.total_attack, gjData.skill_damage_rate, finalDefense, heroData.skill_increase_damage + heroData.all_increase_damage, this.jianshang_rate, MonsterData_1.InjuredData.calcFinalExtraCrit(heroData.ExtraCritical, this.monster_data.AntiExtraCritical));
                    if (!gm.is_show_text) {
                        gm.hp_text_manager.createTypeText(cc.v2(this.node.x, this.node.y + 60), data.text_type, null);
                    }
                }
                else {
                    damage = MonsterData_1.InjuredData.calcSkillDamageNum(heroData.total_attack, gjData.skill_damage_rate, finalDefense, heroData.skill_increase_damage + heroData.all_increase_damage, this.jianshang_rate);
                }
            }
            else {
                damage = MonsterData_1.InjuredData.calcSkillDamageNum(heroData.total_attack, gjData.skill_damage_rate, finalDefense, heroData.skill_increase_damage + heroData.all_increase_damage, this.jianshang_rate);
            }
            data.setDamageNum(damage);
            if (gjData.pet_id == 0) {
                GameManager_1.default.getInstance().all_hero.get(gjData.hero_type).onDamageMonster(HeroConfig_1.DamageType.Skill, false, this.node);
            }
        }
        return data;
    };
    /**
     * 瞬间伤害
     * @param gjData 攻击类型
     * @returns
     */
    Monster.prototype.beFlashInjured = function (gjData) {
        var data = this.getInjuredData(gjData);
        this.beDamage(data, gjData);
        return data;
    };
    Monster.prototype.beContinuousInjured = function (gjData, floorNum) {
        if (floorNum === void 0) { floorNum = 1; }
        if (gjData.continuous_damage_rate > 0) {
            //怪物的防御力
            var selfDefense = this.monster_data.Defense + this.ex_defense_value;
            var finalDefense = MonsterData_1.InjuredData.calcFinalDefense(selfDefense, gjData.hero_data.ignore_defense_rate);
            var heroData = gjData.hero_data;
            var data = new MonsterData_1.InjuredData();
            var damage = MonsterData_1.InjuredData.calcSkillDamageNum(heroData.total_attack, gjData.continuous_damage_rate, finalDefense, heroData.skill_increase_damage + heroData.all_increase_damage, this.jianshang_rate);
            data.text_type = EnemyConfig_1.Enemy_Injured_Type.ZhongDu;
            if (gjData.hero_type == HeroConfig_1.Hero_Type.NvWu) {
                damage = damage * floorNum;
            }
            data.setDamageNum(damage);
            this.beDamage(data, gjData);
        }
    };
    /**造成真实伤害，直接造成对应的伤害值,无法闪避 */
    Monster.prototype.beRealDamage = function (gjData, damage) {
        var data = new MonsterData_1.InjuredData();
        data.setDamageNum(damage);
        this.beDamage(data, gjData);
        return data;
    };
    /**恢复生命值是否成功 */
    Monster.prototype.beHeal = function (num) {
        if (this.getCurHp() >= this.getMaxHp() || this.getIsDie() == true) {
            return false;
        }
        /**目前没有治疗效果加成，只有重伤，只计算重伤 */
        var newNum = num * (1 - this.getMaxSeriously());
        this.changeHp(newNum);
        GameManager_1.default.getInstance().hp_text_manager.createHpTextHp(this.getCenterPos(), newNum, EnemyConfig_1.Enemy_Injured_Type.ZhiLiao);
        return true;
    };
    Monster.prototype.beDamage = function (data, gjData) {
        if (this.getStrengthType() == MonsterData_1.StrengthType.Boss && this.isHaveBuff(HeroConfig_1.BuffId.Boss9_Skill_3_widu)) {
            data.feedback_type = MonsterData_1.FeedBackType.MainYi;
            data.text_type = EnemyConfig_1.Enemy_Injured_Type.WuDi;
            GameManager_1.default.getInstance().hp_text_manager.createTypeText(cc.v2(this.node.x, this.node.y + 60), EnemyConfig_1.Enemy_Injured_Type.WuDi, null);
            return;
        }
        if (data.getDamageNum() > 0) {
            var gm = GameManager_1.default.getInstance();
            data.is_die = this.changeHp(-data.getDamageNum());
            if (gm.is_show_text && data.getDamageNum() > 0) {
                gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x, this.node.y + Math.random() * 100), data.getDamageNum(), data.text_type);
            }
            if (!data.is_die) {
                this.startHurt();
            }
            //吸血效果
            if (gjData.hero_data.blood_sucking_rate > 0 && data.getDamageNum() > 0) {
                var hp = MonsterData_1.InjuredData.calcBloodSucking(data.getDamageNum(), gjData.hero_data.blood_sucking_rate, gjData.hero_data.serious_injury_rate);
                if (hp > 0) {
                    WallManager_1.default.getInstance().getMainWall().changeHp(hp);
                }
            }
            /**记录最高伤害 */
            gm.setMaxDamage(data.getDamageNum());
            gm.setMinDamage(data.getDamageNum());
            if (gjData.skill_release_id > 0) {
                SkillManager_1.default.getInstance().recordDamage(gjData.skill_release_id, data.getDamageNum());
                if (this.active_injury_callback) {
                    this.active_injury_callback();
                }
            }
            /**记录DPS */
            switch (gjData.damage_type) {
                case HeroConfig_1.DamageType.Normal:
                    {
                        gm.hero_attack_dps[gjData.hero_type] += data.getDamageNum();
                    }
                    break;
                case HeroConfig_1.DamageType.Skill:
                    {
                        gm.hero_skill_dps[gjData.hero_type] += data.getDamageNum();
                    }
                    break;
            }
            // /**冰女额外真实伤害 */
            // if(SkillManager.getInstance().getBingNvSkill2()>0&&this.isHaveDeBuffType(BuffType.Slowdown)){
            //     let damage=data.getDamageNum()*SkillManager.getInstance().getBingNvSkill2();
            //     if(damage<1){
            //         damage=1;
            //     }
            //     this.changeHp(-damage);
            //     gm.hero_skill_dps[Hero_Type.BingNv]+=damage;
            //     if(gm.is_show_text){
            //         gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x,this.node.y+32),damage,Enemy_Injured_Type.BingNvZhenShang);
            //     }
            // }
            // /**阿努比斯额外真实伤害 */
            // if(SkillManager.getInstance().getANuBiSiSkill2()>0){
            //     if(this.isHaveDeBuffType(BuffType.Slowdown)||this.isHaveDeBuffType(BuffType.Vertigo)){
            //         let damage=data.getDamageNum()*SkillManager.getInstance().getANuBiSiSkill2();
            //         if(damage<1){
            //             damage=1;
            //         }
            //         this.changeHp(-damage);
            //         gm.hero_skill_dps[Hero_Type.ANuBiSi]+=damage;
            //         if(gm.is_show_text){
            //             gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x,this.node.y+32),damage,Enemy_Injured_Type.ANuBiSiZhenShang);
            //         }
            //         GroundManager.getInstance().createGameEffectById(GameEffectId.a_nu_bi_si_beidong_skill_2,this.node.getPosition());
            //     }
            // }
            /**德鲁伊额外真实伤害 */
            if (SkillManager_1.default.getInstance().getDeLuYiEx() && this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_DeLuYi_Ex)) {
                var damage = data.getDamageNum() * SkillManager_1.default.getInstance().getDeLuYiEx();
                if (damage < 1) {
                    damage = 1;
                }
                this.changeHp(-damage);
                gm.hero_skill_dps[HeroConfig_1.Hero_Type.DeLuYi] += damage;
                if (gm.is_show_text) {
                    gm.hp_text_manager.createHpTextHp(cc.v2(this.node.x, this.node.y + 32), damage, EnemyConfig_1.Enemy_Injured_Type.Normal_Attack);
                }
            }
        }
    };
    /**更改hp，返回是否死亡 */
    Monster.prototype.changeHp = function (num) {
        if (this.getIsDie() || this.getEnemyState() == EnemyConfig_1.Enemy_State.born || GameManager_1.default.getInstance().cur_game_state != Constants_1.GameState.Game_Playing) {
            return false;
        }
        var isDie = false;
        this.cur_hp += num;
        if (GameManager_1.default.getInstance().cur_game_mode == Constants_1.GameMode.Boss_Challenge) {
            if (this.base_data.StrengthType == MonsterData_1.StrengthType.Boss) {
                if (this.cur_hp <= 0) {
                    this.cur_hp = 1;
                }
                if (this.change_hp_callback) {
                    this.change_hp_callback(num);
                }
                var useLevel = BossChallenge_1.BossChallengeManager.getInstance().addScore(Math.abs(Math.round(num)));
                if (useLevel != this.monster_level) {
                    this.refreshData(useLevel);
                }
                return false;
            }
        }
        if (this.cur_hp <= 0) {
            this.startDeath();
            isDie = true;
        }
        if (this.cur_hp > this.max_hp) {
            this.cur_hp = this.max_hp;
        }
        // if(isDie==false&&GameManager.getInstance().cur_game_mode==GameMode.Maze){
        //     if(this.cur_hp<(this.max_hp*0.1)){
        //         if(MazeManager.getInstance().isHaveABuff([8003])){                
        //             this.changeHp(-this.cur_hp);
        //             GameEffectsManager.getInstance().createGameEffectForParent(GameEffectId.pet_21_active_3_liandao,cc.v2(0,200),this.node,()=>{
        //                 GameEffectsManager.getInstance().createGameEffectById(GameEffectId.pet_21_active_2_liandao_drop_hit,this.node.getPosition());
        //             });
        //         }
        //     }            
        // }
        if (this.change_hp_callback) {
            this.change_hp_callback(num);
        }
        this.showHp();
        return isDie;
    };
    Monster.prototype.addBuff = function (buffData) {
        var _this = this;
        if (this.monster_buff.has(buffData.buff_id) == false) {
            //添加buff节点和特效       
            var node = null;
            if (buffData.game_effect_id == GameEffectsManager_1.GameEffectId.Null) {
                node = new cc.Node(buffData.game_effect_id.toString());
                node.setPosition(this.juji_pos);
                this.node.addChild(node);
            }
            else {
                node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id, this.juji_pos, this.node);
                node.scale = this.getSheShouAttackScale();
            }
            //添加buff
            var buff = node.getComponent(BuffTimer_1.default);
            if (!buff) {
                buff = node.addComponent(BuffTimer_1.default);
            }
            buff.init(buffData);
            //buff治疗触发时处理
            if (buffData.recovery_jiange_time > 0) {
                buff.addRecoveryListen({
                    doRecovery: function (num) {
                        _this.beHeal(num);
                    }
                }, buff.getFirstBuffValue());
            }
            this.monster_buff.set(buffData.buff_id, buff);
            //buff销毁时处理
            buff.addDestroyListen(this.onBuffDestory.bind(this));
            switch (buffData.buff_type) {
                case HeroConfig_1.BuffType.MoveSpeedUp:
                    {
                        this.refreshMoveSpeed(0);
                    }
                    break;
                case HeroConfig_1.BuffType.AttSpeedUp:
                    {
                        this.changeAttackSpeed(buffData.buff_value[0]);
                    }
                    break;
            }
            switch (buffData.buff_id) {
                case HeroConfig_1.BuffId.Boss9_Skill_1_guozai:
                    {
                        this.zengshang_rate += buffData.buff_value[0];
                        this.monster_data.Defense -= this.base_attribute_data.Defense * (buffData.buff_value[1]);
                    }
                    break;
                case HeroConfig_1.BuffId.Boss10_Skill_4_kuangbao_gjl:
                    {
                        this.monster_data.Attack += this.base_attribute_data.Attack * (buffData.buff_value[0]);
                    }
                    break;
            }
            return buff;
        }
        else {
            //如果有buff，则刷新时间,重新计时
            var buff = this.monster_buff.get(buffData.buff_id);
            buff.refreshBuff(buffData);
            return buff;
        }
    };
    Monster.prototype.subBuff = function (buffId) {
        var buff = this.monster_buff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    };
    Monster.prototype.onBuffDestory = function (buffData) {
        this.monster_buff.delete(buffData.buff_id);
        switch (buffData.buff_type) {
            case HeroConfig_1.BuffType.MoveSpeedUp:
                {
                    this.refreshMoveSpeed(0);
                }
                break;
            case HeroConfig_1.BuffType.AttSpeedUp:
                {
                    this.changeAttackSpeed(-buffData.buff_value[0]);
                }
                break;
        }
        switch (buffData.buff_id) {
            case HeroConfig_1.BuffId.Boss9_Skill_1_guozai:
                {
                    this.zengshang_rate -= buffData.buff_value[0];
                    this.monster_data.Defense += this.base_attribute_data.Defense * (buffData.buff_value[1]);
                }
                break;
            case HeroConfig_1.BuffId.Boss10_Skill_4_kuangbao_gjl:
                {
                    this.monster_data.Attack -= this.base_attribute_data.Attack * (buffData.buff_value[0]);
                }
                break;
        }
    };
    Monster.prototype.isHaveBuff = function (buffId) {
        return this.monster_buff.has(buffId);
    };
    Monster.prototype.getBuff = function (buffId) {
        return this.monster_buff.get(buffId);
    };
    Monster.prototype.isHaveBuffType = function (buffType) {
        var isHave = false;
        this.monster_buff.forEach(function (buff) {
            if (isHave == false && buff.getBuffType() == buffType) {
                isHave = true;
            }
        });
        return isHave;
    };
    Monster.prototype.removeAllBuff = function () {
        this.monster_buff.forEach(function (buff) {
            buff.destroySelf();
        });
    };
    Monster.prototype.addDeBuff = function (buffData, gjData) {
        var _this = this;
        if (this.getIsDie()) {
            return;
        }
        if (!this.isHaveDeBuff(buffData.buff_id)) {
            //控制类的debuff需要根据韧性来实现具体的效果
            var buffType = buffData.buff_type;
            switch (buffType) {
                case HeroConfig_1.BuffType.Vertigo:
                    {
                        if (this.cur_toughness >= 1) {
                            GameManager_1.default.getInstance().hp_text_manager.createTypeText(cc.v2(this.node.x, this.node.y + 60), EnemyConfig_1.Enemy_Injured_Type.MianYiKongZhi, null);
                            if (this.isHaveBuff(HeroConfig_1.BuffId.Boss3_MianYi_KongZhi)) {
                                this.getBuff(HeroConfig_1.BuffId.Boss3_MianYi_KongZhi).addFloor();
                            }
                            return null;
                        }
                        if (gjData) {
                            buffData.remain_time = MonsterData_1.InjuredData.calcControlTime(buffData.remain_time, this.cur_toughness, gjData.hero_data.insight);
                        }
                        switch (buffData.buff_id) {
                            case HeroConfig_1.BuffId.Hero_XuanYun:
                                {
                                    this.att_jishu = 0;
                                    if (this.xuanyun_callback) {
                                        this.xuanyun_callback(true);
                                    }
                                    else {
                                        this.spine.paused = true;
                                    }
                                }
                                break;
                            case HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo:
                                {
                                    //魅惑对BOSS无效
                                    if (this.getStrengthType() != MonsterData_1.StrengthType.Boss) {
                                        this.att_jishu = 0;
                                        //走向英雄
                                        var meimo = GameManager_1.default.getInstance().getHero(HeroConfig_1.Hero_Type.MeiMo);
                                        var mmPos = meimo.node.getPosition();
                                        var offsetPos = mmPos.sub(this.node.getPosition());
                                        var radian = Math.atan2(offsetPos.y, offsetPos.x);
                                        this.setMoveDir(radian);
                                        this.setEnemyState(EnemyConfig_1.Enemy_State.move);
                                    }
                                    else {
                                        return;
                                    }
                                }
                                break;
                        }
                    }
                    break;
            }
            //添加buff节点和特效       
            var node = null;
            if (buffData.game_effect_id == GameEffectsManager_1.GameEffectId.Null) {
                node = new cc.Node(buffData.game_effect_id.toString());
                node.setPosition(this.juji_pos);
                this.node.addChild(node);
            }
            else {
                node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(buffData.game_effect_id, this.juji_pos, this.node);
                node.scale = this.getSheShouAttackScale();
            }
            //添加buff
            var buff_1 = node.getComponent(BuffTimer_1.default);
            if (!buff_1) {
                buff_1 = node.addComponent(BuffTimer_1.default);
            }
            buff_1.init(buffData);
            //buff销毁时处理
            buff_1.addDestroyListen(this.onDebuffDestory.bind(this));
            //buff伤害触发时处理
            if (buffData.damage_jiange_time > 0 && gjData) {
                buff_1.addDamageListen({
                    doDamage: function (gjData) {
                        _this.beContinuousInjured(gjData, buff_1.getFloorNum());
                    }
                }, gjData);
            }
            this.monster_debuff.set(buffData.buff_id, buff_1);
            switch (buffType) {
                case HeroConfig_1.BuffType.Vertigo:
                    {
                        node.scale = this.getXuanyunScale();
                    }
                    break;
                case HeroConfig_1.BuffType.Slowdown:
                    {
                        //处理一下减速buff
                        this.refreshMoveSpeed(this.hidden_attribute.slow_resistance);
                    }
                    break;
                case HeroConfig_1.BuffType.Burst:
                    {
                        //处理buff爆发
                        if (buffData.buff_id == HeroConfig_1.BuffId.Hero_LeiShen_ChaoFuHe) {
                            if (gjData)
                                buff_1.addBurstListen(buffData.buff_value[0], this.onBuffBurst.bind(this), gjData);
                        }
                    }
                    break;
            }
            switch (buffData.buff_id) {
                case HeroConfig_1.BuffId.Hero_ChangMaoShow_Skill:
                    {
                        var scale = 1 / this.setup_scale;
                        node.scale = scale;
                        node.stopAllActions();
                        cc.tween(node).to(0.1, { scale: scale * 1.1, opacity: 255 }).to(0.1, { scale: node.scale, opacity: 128 }).start();
                    }
                    break;
                case HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo:
                    {
                        this.refreshMoveSpeed(0);
                    }
                    break;
                case HeroConfig_1.BuffId.Boss_Mode_JianShang:
                    {
                        this.jianshang_rate += buffData.buff_value[0];
                    }
                    break;
                case HeroConfig_1.BuffId.Hero_NvWu_ExSkill_JianGongSu:
                    {
                        this.changeAttackSpeed(-buffData.buff_value[0]);
                    }
                    break;
            }
            return buff_1;
        }
        else {
            var buff = this.monster_debuff.get(buffData.buff_id);
            buff.refreshBuff(buffData);
            switch (buffData.buff_id) {
                case HeroConfig_1.BuffId.Hero_ChangMaoShow_Skill:
                    {
                        var node = this.monster_debuff.get(buffData.buff_id).node;
                        var scale = 1 / this.setup_scale;
                        node.scale = scale;
                        node.stopAllActions();
                        cc.tween(node).to(0.1, { scale: scale * 1.1, opacity: 255 }).to(0.1, { scale: node.scale, opacity: 128 }).start();
                    }
                    break;
            }
            return buff;
        }
        return null;
    };
    /**
     * 去除一个debuff
     * @param buff debuff类型
     * @param isNeedRecycle 是否需要调用回收
     * @returns
     */
    Monster.prototype.subDeBuff = function (buffId) {
        var buff = this.monster_debuff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    };
    Monster.prototype.isHaveDeBuff = function (buffId) {
        return this.monster_debuff.has(buffId);
    };
    Monster.prototype.getDeBuff = function (buffId) {
        return this.monster_debuff.get(buffId);
    };
    Monster.prototype.isHaveDeBuffType = function (buffType) {
        var isHave = false;
        this.monster_debuff.forEach(function (buff) {
            if (isHave == false && buff.getBuffType() == buffType) {
                isHave = true;
            }
        });
        return isHave;
    };
    Monster.prototype.removeAllDeBuff = function () {
        var _this = this;
        this.monster_debuff.forEach(function (v, k) {
            _this.subDeBuff(v.getBuffId());
        });
    };
    Monster.prototype.onDebuffDestory = function (buffData) {
        this.monster_debuff.delete(buffData.buff_id);
        switch (buffData.buff_type) {
            case HeroConfig_1.BuffType.Vertigo:
                {
                    switch (buffData.buff_id) {
                        case HeroConfig_1.BuffId.Hero_XuanYun:
                            {
                                this.spine.paused = false;
                                if (this.xuanyun_callback) {
                                    this.xuanyun_callback(false);
                                }
                            }
                            break;
                        case HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo:
                            {
                                //魅惑对BOSS无效,往下走
                                if (this.getStrengthType() != MonsterData_1.StrengthType.Boss) {
                                    this.setMoveDir(Math.PI * 3 / 2);
                                    this.refreshMoveSpeed(0);
                                }
                                else {
                                    return;
                                }
                            }
                            break;
                    }
                }
                break;
            case HeroConfig_1.BuffType.Slowdown:
                {
                    //处理一下减速buff
                    this.refreshMoveSpeed(this.hidden_attribute.slow_resistance);
                }
                break;
        }
        switch (buffData.buff_id) {
            case HeroConfig_1.BuffId.Boss_Mode_JianShang:
                {
                    this.jianshang_rate -= buffData.buff_value[0];
                }
                break;
            case HeroConfig_1.BuffId.Hero_NvWu_ExSkill_JianGongSu:
                {
                    this.changeAttackSpeed(+buffData.buff_value[0]);
                }
                break;
        }
    };
    Monster.prototype.onBuffBurst = function (buffData, gjData) {
        if (buffData.buff_id == HeroConfig_1.BuffId.Hero_LeiShen_ChaoFuHe) {
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_LeiGodSkill1);
            /**当敌人身上的超负荷达到5层时，会受到落雷攻击造成{参数1}伤害并击晕{参数2}秒 */
            var data = this.beFlashInjured(gjData);
            if (data.is_die == false && data.getDamageNum() > 0) {
                //GroundManager.getInstance().createGameEffectById(GameEffectId.lei_shen_skill_ground,this.shadow.getPosition());
                var node = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.lei_shen_skill_sky, this.shadow.getPosition());
                node.scaleX = 0.8;
                node.scaleY = 1;
                if (this.getStrengthType() != MonsterData_1.StrengthType.Boss && data.is_die == false) {
                    var buffData_1 = new BuffData_1.BuffData();
                    buffData_1.buff_id = HeroConfig_1.BuffId.Hero_XuanYun;
                    buffData_1.game_effect_id = GameEffectsManager_1.GameEffectId.xuanyun;
                    buffData_1.buff_type = HeroConfig_1.BuffType.Vertigo;
                    buffData_1.remain_time = gjData.hero_data.getSkillValue2(HeroConfig_1.SkillType.Passive_2);
                    this.addDeBuff(buffData_1, gjData);
                }
            }
        }
    };
    /**刷新移速,slowResistance:减速抗性 */
    Monster.prototype.refreshMoveSpeed = function (slowResistance) {
        //实际减速
        if (this.isHaveDeBuff(HeroConfig_1.BuffId.Hero_MeiMo_Active_MeiHuo)) {
            this.cur_move_speed = 30;
        }
        else {
            var value = MonsterData_1.InjuredData.calcSlowDownNum(this.base_data.Speed + this.ex_move_speed_value, this.getMaxSlowDownValue(), slowResistance, this.getMaxSpeedUpValue());
            this.cur_move_speed = value;
            this.setColor(this.cur_move_speed < this.base_data.Speed ? MonsterData_1.ColorType.SlowDown : MonsterData_1.ColorType.Null);
        }
        if (this.getStrengthType() != MonsterData_1.StrengthType.Boss)
            this.spine.timeScale = this.cur_move_speed / (this.base_data.Speed);
    };
    // /**刷新减速buff的处理 */
    // private refreshSlowdown(){
    //     //找出所有减速类型的buff
    //     let slowBuff=new Array<BuffTimer>();
    //     this.monster_debuff.forEach((v,k)=>{
    //         if(v.getBuffType()==BuffType.Slowdown){
    //             slowBuff.push(v);
    //         }
    //     });
    //     if(slowBuff.length>0){
    //         slowBuff.sort((a,b)=>{
    //             return b.getFirstBuffValue()-a.getFirstBuffValue();
    //         });
    //         let maxBuff=slowBuff[0];
    //         //实际减速
    //         let value=InjuredData.calcSlowDownNum(this.base_data.Speed,maxBuff.getFirstBuffValue(),this.hidden_attribute.slow_resistance,this.getMaxSpeedUpValue());
    //         this.cur_move_speed=value;
    //         this.setColor(ColorType.SlowDown);
    //     }else{
    //         this.cur_move_speed=this.base_data.Speed;
    //         this.setColor(ColorType.Null);
    //     }
    // }
    // /**刷新加速buff的处理 */
    // private refreshSpeedUp(){
    //     //找出所有加速类型的buff
    //     let speedBuff=new Array<BuffTimer>();
    //     this.monster_buff.forEach((v,k)=>{
    //         if(v.getBuffType()==BuffType.SpeedUp){
    //             speedBuff.push(v);
    //         }
    //     });
    //     if(speedBuff.length>0){
    //         speedBuff.sort((a,b)=>{
    //             return b.getFirstBuffValue()-a.getFirstBuffValue();
    //         });
    //         let maxBuff=speedBuff[0];
    //         //实际加速速
    //         let offsetValue=this.base_data.Speed*maxBuff.getFirstBuffValue();
    //         //let value=InjuredData.calcSlowDownNum(,maxBuff.getFirstBuffValue(),this.hidden_attribute.slow_resistance);
    //         this.cur_move_speed=this.cur_move_speed+offsetValue;
    //     }else{
    //         /**加减速需要处理，判断减速 */
    //         this.cur_move_speed=this.base_data.Speed;
    //     }        
    // }
    /**获得最大值的减速比率 */
    Monster.prototype.getMaxSlowDownValue = function () {
        //找出所有加速类型的buff
        var buff = new Array();
        this.monster_debuff.forEach(function (v, k) {
            if (v.getBuffType() == HeroConfig_1.BuffType.Slowdown) {
                buff.push(v);
            }
        });
        if (buff.length > 0) {
            buff.sort(function (a, b) {
                return b.getFirstBuffValue() - a.getFirstBuffValue();
            });
            var maxBuff = buff[0];
            return maxBuff.getFirstBuffValue();
        }
        return 0;
    };
    /**获得最大值的加速比率 */
    Monster.prototype.getMaxSpeedUpValue = function () {
        //找出所有加速类型的buff
        var speedBuff = new Array();
        this.monster_buff.forEach(function (v, k) {
            if (v.getBuffType() == HeroConfig_1.BuffType.MoveSpeedUp) {
                speedBuff.push(v);
            }
        });
        if (speedBuff.length > 0) {
            speedBuff.sort(function (a, b) {
                return b.getFirstBuffValue() - a.getFirstBuffValue();
            });
            var maxBuff = speedBuff[0];
            return maxBuff.getFirstBuffValue();
        }
        return 0;
    };
    /**设置攻速，每秒攻击次数 */
    Monster.prototype.setAttackSpeed = function (numSec) {
        if (numSec > 10) {
            numSec = 10;
        }
        if (numSec < 0.1) {
            numSec = 0.1;
        }
        this.att_jiange = 1 / numSec;
    };
    /**改变当前攻速,rate:比率 */
    Monster.prototype.changeAttackSpeed = function (rate) {
        var gjsd = this.getAttackSpeed();
        gjsd += (rate) * (this.base_data.AttackSpeed);
        this.setAttackSpeed(gjsd);
    };
    /**获得当前攻速 */
    Monster.prototype.getAttackSpeed = function () {
        return 1 / this.att_jiange;
    };
    /**计算重伤，取最大 */
    Monster.prototype.getMaxSeriously = function () {
        //找出所有重伤类型的buff
        var seriouslyBuff = new Array();
        this.monster_debuff.forEach(function (v, k) {
            if (v.getBuffType() == HeroConfig_1.BuffType.SeriouslyInjured) {
                seriouslyBuff.push(v);
            }
        });
        if (seriouslyBuff.length > 0) {
            seriouslyBuff.sort(function (a, b) {
                return b.getFirstBuffValue() - a.getFirstBuffValue();
            });
            var maxBuff = seriouslyBuff[0];
            return maxBuff.getFirstBuffValue();
        }
        return 0;
    };
    /********************************************************光环-开始********************************************************************* */
    Monster.prototype.addHalo = function (haloData) {
        if (!this.monster_halo.has(haloData.halo_id)) {
            this.monster_halo.set(haloData.halo_id, haloData);
            switch (haloData.halo_id) {
                case HeroConfig_1.HaloId.Monster30_BianFu_Skill_Halo:
                    {
                        this.ex_miss_rate += haloData.halo_value[0];
                    }
                    break;
                case HeroConfig_1.HaloId.Monster69_NiuSaMan_Skill_Halo:
                    {
                        this.ex_defense_value += haloData.halo_value[0];
                    }
                    break;
                case HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo:
                    {
                        this.ex_move_speed_value += this.base_data.Speed * (haloData.halo_value[0]);
                        this.refreshMoveSpeed(0);
                    }
                    break;
            }
        }
    };
    Monster.prototype.getHalo = function (haloId) {
        return this.monster_halo.get(haloId);
    };
    Monster.prototype.isHaveHalo = function (haloId) {
        return this.monster_halo.has(haloId);
    };
    Monster.prototype.subHalo = function (haloId, uuid) {
        var haloData = this.monster_halo.get(haloId);
        if (haloData) {
            //只有同源才可以移除
            if (haloData.halo_source_uuid == uuid) {
                this.monster_halo.delete(haloId);
                switch (haloId) {
                    case HeroConfig_1.HaloId.Monster30_BianFu_Skill_Halo:
                        {
                            this.ex_miss_rate -= haloData.halo_value[0];
                            if (this.ex_miss_rate < 0) {
                                this.ex_miss_rate = 0;
                            }
                        }
                        break;
                    case HeroConfig_1.HaloId.Monster69_NiuSaMan_Skill_Halo:
                        {
                            this.ex_defense_value -= haloData.halo_value[0];
                            if (this.ex_defense_value < 0) {
                                this.ex_defense_value = 0;
                            }
                        }
                        break;
                    case HeroConfig_1.HaloId.Monster76_JianDuZhe_Skill_Halo:
                        {
                            this.ex_move_speed_value -= this.base_data.Speed * (haloData.halo_value[0]);
                            if (this.ex_move_speed_value < 0) {
                                this.ex_move_speed_value = 0;
                            }
                            this.refreshMoveSpeed(0);
                        }
                        break;
                }
            }
        }
    };
    Monster.prototype.removeAllHalo = function () {
        this.monster_halo.clear();
    };
    /********************************************************光环-结束********************************************************************* */
    Monster.prototype.getHiddenAttribute = function () {
        return this.hidden_attribute;
    };
    Monster.prototype.getIsDie = function () {
        return this.monster_state == EnemyConfig_1.Enemy_State.die;
    };
    Monster.prototype.getEnemyState = function () {
        return this.monster_state;
    };
    Monster.prototype.getEnemyPrevState = function () {
        return this.prev_state;
    };
    Monster.prototype.getIsCanCheck = function () {
        var isCan = true;
        if (this.getIsDie() || this.node.y >= GameManager_1.default.getInstance().enemy_create_y || this.getEnemyState() == EnemyConfig_1.Enemy_State.born) {
            isCan = false;
        }
        return isCan;
    };
    Monster.prototype.getToughness = function () {
        return this.cur_toughness;
    };
    Monster.prototype.getMaxHp = function () {
        return this.max_hp;
    };
    Monster.prototype.getCurHp = function () {
        return this.cur_hp;
    };
    Monster.prototype.getCurAtt = function () {
        return this.cur_att;
    };
    Monster.prototype.setColor = function (colorType) {
        var _this = this;
        var color = cc.Color.WHITE;
        if (this.isHaveDeBuffType(HeroConfig_1.BuffType.Slowdown)) {
            color = cc.color(82, 255, 252);
        }
        switch (colorType) {
            case MonsterData_1.ColorType.Injured:
                {
                    color = cc.Color.RED;
                    var curColor_1 = this.cur_color;
                    if (curColor_1 != MonsterData_1.ColorType.Injured) {
                        if (this.injured_action) {
                            this.injured_action.stop();
                        }
                        this.injured_action = cc.tween(this.node).to(0.1, { color: this.node.color }).call(function () {
                            _this.setColor(curColor_1);
                        }).start();
                    }
                }
                break;
            case MonsterData_1.ColorType.SlowDown:
                {
                    color = cc.color(82, 255, 252);
                }
                break;
        }
        this.cur_color = colorType;
        this.node.color = color;
    };
    Monster.prototype.getCurColor = function () {
        return this.cur_color;
    };
    Monster.prototype.getSlowDownColor = function () {
        return cc.color(82, 255, 252);
    };
    Monster.prototype.getAttData = function (damageType, isBullet, skillRate) {
        if (skillRate === void 0) { skillRate = 0; }
        var md = new MonsterData_1.MonsterAttData();
        md.damage_type = damageType;
        md.is_bullet = isBullet;
        md.skill_rate = skillRate;
        md.monster_attribute = this.monster_data;
        md.zengshang_rate = this.zengshang_rate;
        md.monster_ts = this;
        md.strength_type = this.getStrengthType();
        return md;
    };
    Monster.prototype.getIsFullHp = function () {
        return this.cur_hp >= this.max_hp;
    };
    Monster.prototype.setEnemyState = function (type) {
        if (type != this.monster_state) {
            this.prev_state = this.monster_state;
            this.monster_state = type;
        }
        if (type == EnemyConfig_1.Enemy_State.att || type == EnemyConfig_1.Enemy_State.skill) {
            this.spine.timeScale = (1 / this.base_data.AttackSpeed) / this.att_jiange;
        }
        if (type == EnemyConfig_1.Enemy_State.move) {
            if (this.getStrengthType() != MonsterData_1.StrengthType.Boss) {
                this.spine.timeScale = this.cur_move_speed / (this.base_data.Speed);
            }
        }
    };
    Monster.prototype.startDeath = function () {
        this.setEnemyState(EnemyConfig_1.Enemy_State.die);
        this.collider.enabled = false;
        this.removeAllDeBuff();
        this.spine.paused = false;
        this.node.stopAllActions();
        this.is_can_count = this.is_count;
        MonsterManager_1.default.getInstance().willDestroyMonster(this);
        if (this.death_callback) {
            this.death_callback();
        }
    };
    Monster.prototype.startHurt = function () {
        this.setColor(MonsterData_1.ColorType.Injured);
    };
    /**
     *
     * @param damage 伤害值
     * @param damageType 伤害类型
     */
    Monster.prototype.injureWall = function (data) {
        return this.att_wall.beInjured(data);
    };
    /**
     * 播放一个骨骼动画
     * @param name 骨骼动画名称
     * @param isLoop 是否循环
     * @param data 是否监听关键帧，关键帧数据包含关键帧名称，监听到关键帧后的回调
     * @param endCallback 播放结束后的回调
     */
    Monster.prototype.playSpinAnimaton = function (name, isLoop, data, endCallback) {
        if (isLoop === void 0) { isLoop = false; }
        if (this.getEnemyState() == EnemyConfig_1.Enemy_State.die) {
            return;
        }
        var anima = this.spine.setAnimation(0, name, isLoop);
        if (data) {
            this.spine.setTrackEventListener(anima, function (entry, event) {
                if (event.data.name == data.name) {
                    data.callback();
                }
            });
        }
        if (endCallback) {
            this.spine.setTrackCompleteListener(anima, function (entry, event) {
                anima.listener = null;
                endCallback();
            });
        }
    };
    Monster.prototype.playDeadAnimaton = function (name, endCallback) {
        var anima = this.spine.setAnimation(0, name, false);
        this.spine.setTrackCompleteListener(anima, function (entry, event) {
            anima.listener = null;
            endCallback();
        });
    };
    /**设置X坐标，返回偏左还是偏右了,-1:偏左，0：正常，1：偏右 */
    Monster.prototype.setX = function (disX) {
        var leftRight = 0;
        if (disX > 300) {
            disX = 300;
            leftRight = 1;
        }
        if (disX < -300) {
            disX = -300;
            leftRight = -1;
        }
        this.node.x = disX;
        return leftRight;
    };
    Monster.prototype.setY = function (disY) {
        var _this = this;
        this.node.y = disY;
        //不能穿过城墙
        var walls = WallManager_1.default.getInstance().getAllWall();
        walls.forEach(function (wall, wallType) {
            //检查城墙
            var rect = wall.getWallRect();
            if (rect.contains(_this.node.getPosition())) {
                if (_this.node.y > wall.node.y) {
                    _this.node.y = rect.yMax;
                }
                if (_this.node.y < wall.node.y) {
                    _this.node.y = rect.yMin;
                }
            }
        });
    };
    Monster.prototype.setPos = function (pos) {
        this.setX(pos.x);
        this.setY(pos.y);
    };
    Monster.prototype.setMoveDir = function (dir) {
        this.move_direction = dir;
    };
    Monster.prototype.setQianYinMin = function (num) {
        if (this.min_qianyin == 0)
            this.min_qianyin = num;
    };
    Monster.prototype.getQianYinMin = function () {
        return this.min_qianyin;
    };
    /**设置翻转 */
    Monster.prototype.setFlip = function (isRight) {
        this.node.scaleX = isRight ? this.setup_scale : -this.setup_scale;
    };
    Monster.prototype.update = function (dt) {
        if (this.hp_progress) {
            this.hp_progress.setPos(this.node.x + this.hp_pos.x * this.node.scaleX, this.node.y + this.hp_pos.y * this.node.scaleY);
        }
        if (this.shadow) {
            this.shadow.setPosition(cc.v2(this.node.x + this.node.scaleX * this.shadow_pos.x, this.node.y + this.node.scaleY * this.shadow_pos.y));
        }
        this.node.zIndex = (Math.round(8000 - this.node.y * 10));
        if (this.getEnemyState() != EnemyConfig_1.Enemy_State.born && this.getStrengthType() != MonsterData_1.StrengthType.Boss) {
            this.collider.enabled = true;
        }
        if (this.node.y >= GameManager_1.default.getInstance().enemy_create_y) {
            this.setMoveDir(Math.PI * 3 / 2);
        }
        //TEST
        // if(this.getEnemyState()==Enemy_State.move){
        //     let allMonster=MonsterManager.getInstance().node.children;
        //     let len=allMonster.length;
        //     for(let i=0; i<len; i++){
        //         let monster=allMonster[i].getComponent(Monster);
        //         if(monster&&monster.uuid!=this.uuid){
        //             //判断距离
        //             let otherPos=monster.getCenterPos();
        //             let selfPos=this.getCenterPos();
        //             let distance=(otherPos.sub(selfPos).mag());
        //             if(distance<=50){
        //                 //交集了
        //                 //上面的走切线，下面的垂直走下
        //                 if(selfPos.y>otherPos.y){
        //                     let newDir=this.move_direction+Math.PI/2;
        //                     if( newDir <=Math.PI && newDir>=0){
        //                         newDir=this.move_direction-Math.PI/2
        //                     }
        //                     this.move_direction=newDir;
        //                 }else if(selfPos.y<otherPos.y){
        //                     this.move_direction=Math.PI*3/2;
        //                 }else{
        //                     this.move_direction=Math.PI*3/2;
        //                 }
        //             }
        //             // else{
        //             //     this.move_direction=Math.PI*3/2;
        //             // }
        //         }
        //     }
        // }
    };
    /**--------------------------------------添加回调监听------------------------------------------------------ */
    Monster.prototype.addInitListen = function (callback) {
        this.init_callback = callback;
    };
    Monster.prototype.addChangeHpListen = function (callback) {
        this.change_hp_callback = callback;
    };
    Monster.prototype.addXuanYunListen = function (callback) {
        this.xuanyun_callback = callback;
    };
    Monster.prototype.addDeathCallback = function (callback) {
        this.death_callback = callback;
    };
    Monster.prototype.addInjuryCallback = function (callback) {
        this.active_injury_callback = callback;
    };
    /**--------------------------------------获得每种怪物不同的数据 --------------------------------------------*/
    Monster.prototype.loadInitPos = function () {
        //获取完数据就删除了
        var juji = this.node.getChildByName('juji');
        this.juji_pos = juji.getPosition();
        var gongji = this.node.getChildByName('gongji');
        this.att_pos = gongji.getPosition();
        var hp = this.node.getChildByName('hp');
        this.hp_pos = hp.getPosition();
        var shadowNode = this.node.getChildByName('Monster_Shadow');
        this.shadow_pos = shadowNode.getPosition();
        this.shadow_size = shadowNode.getContentSize();
        var center = this.node.getChildByName('center');
        this.center_pos = center.getPosition();
        //cc.log(this.shadow_size);
        juji.removeFromParent();
        gongji.removeFromParent();
        hp.removeFromParent();
        shadowNode.removeFromParent();
        center.removeFromParent();
        if (this.shadow) {
            this.shadow.setPosition(cc.v2(this.node.x + this.node.scaleX * this.shadow_pos.x, this.node.y + this.node.scaleY * this.shadow_pos.y));
        }
    };
    Monster.prototype.getAttPos = function () {
        var pos = cc.v2(0, 128);
        switch (this.monster_type) {
            case 20:
                pos = cc.v2(0, 128);
                break;
            default:
                pos = this.att_pos;
                break;
        }
        var disPos = this.node.getPosition().add(cc.v2(pos.x * this.node.scaleX, pos.y * this.node.scaleY));
        return disPos;
    };
    Monster.prototype.getJuJiPos = function () {
        return cc.v2(this.node.x + this.juji_pos.x * this.node.scaleX, this.node.y + this.juji_pos.y * this.node.scaleY);
    };
    Monster.prototype.getSheShouPos = function () {
        return cc.v2(this.node.x + this.juji_pos.x * this.node.scaleX, this.node.y + this.juji_pos.y * this.node.scaleY);
    };
    Monster.prototype.getCenterPos = function () {
        return cc.v2(this.node.x + this.center_pos.x * this.node.scaleX, this.node.y + this.center_pos.y * this.node.scaleY);
    };
    /**获得攻击城墙的X坐标，动作不一样导致攻击的X坐标不一致 */
    Monster.prototype.getAttackWallX = function () {
        return this.att_pos;
    };
    Monster = __decorate([
        ccclass
    ], Monster);
    return Monster;
}(cc.Component));
exports.default = Monster;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBMkc7QUFDM0csaURBQTRDO0FBQzVDLGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFFekMsNkNBQXdMO0FBQ3hMLDREQUF3RjtBQUN4RixtREFBOEM7QUFDOUMsMEVBQTZHO0FBQzdHLHVEQUFrRDtBQUNsRCwwQ0FBOEQ7QUFFOUQsMkRBQWlFO0FBQ2pFLHNEQUErRztBQUMvRyxvREFBK0M7QUFDL0Msa0RBQWlEO0FBQ2pELHFEQUFnRDtBQUVoRCwwREFBcUQ7QUFDckQsb0RBQTBEO0FBRTFELG1EQUE4QztBQUl4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyx1QkFBdUI7QUFFdkI7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUF3L0NDO1FBdC9DYSxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLFVBQVU7UUFDQSxlQUFTLEdBQWlCLDZCQUFlLENBQUMsS0FBSyxDQUFDO1FBQzFELFVBQVU7UUFDQSxnQkFBVSxHQUFTLEtBQUssQ0FBQztRQUNuQyxVQUFVO1FBQ0EsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDakMsWUFBWTtRQUNGLHFCQUFlLEdBQVEsQ0FBQyxDQUFDO1FBQ25DLFVBQVU7UUFDSCxrQkFBWSxHQUFTLENBQUMsQ0FBQztRQUM5QixzQkFBc0I7UUFDWixrQkFBWSxHQUE4QixJQUFJLENBQUM7UUFDekQsb0JBQW9CO1FBQ1YseUJBQW1CLEdBQThCLElBQUksQ0FBQztRQUNoRSxhQUFhO1FBQ0gsZUFBUyxHQUF1QixJQUFJLENBQUM7UUFDL0MsYUFBYTtRQUNiLHNCQUFnQixHQUFpQixJQUFJLENBQUM7UUFDNUIsb0JBQWMsR0FBUyxDQUFDLENBQUM7UUFDekIscUJBQWUsR0FBVSxJ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QUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQUVELGlDQUFpQztJQUNqQyxnQ0FBYyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUF2L0NnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBdy9DM0I7SUFBRCxjQUFDO0NBeC9DRCxBQXcvQ0MsQ0F4L0NvQyxFQUFFLENBQUMsU0FBUyxHQXcvQ2hEO2tCQXgvQ29CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmVteV9TdGF0ZSwgRW5lbXlfQnVmZl9UeXBlLCBFbmVteV9EZUJ1ZmZfVHlwZSwgRW5lbXlfSW5qdXJlZF9UeXBlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCBIcFByb2dyZXNzQmFyIGZyb20gXCIuL0hwUHJvZ3Jlc3NCYXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgeyAgS2V5RnJhbWVEYXRhLCBNb25zdGVyRmFjZU5hbWUsIE1vbnN0ZXJTa2luVHlwZSwgSW5qdXJlZERhdGEsIEZlZWRCYWNrVHlwZSwgIFN0cmVuZ3RoVHlwZSwgSGlkZGVuQXR0cmlidXRlLCBNb25zdGVyQXR0RGF0YSwgTW9uc3RlclNraWxsRGF0YSwgQ29sb3JUeXBlIH0gZnJvbSBcIi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJDb25maWd1cmUsIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMsIE1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVN0YXRlLCBUZXh0X1R5cGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4uL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBIYWxvRGF0YSwgSGFsb0lkLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQnVmZlRpbWVyIGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZlRpbWVyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckF0dHJpYnV0ZSB9IGZyb20gXCIuL0RhdGEvTW9uc3RlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJTa2lsbE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJTa2lsbFwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi9XYWxsL1dhbGxDb25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoq5oCq54mp6YCa55So57G777yM5Y+q5aSE55CG5pWw5o2u77yM5LiN5aSE55CG6KGo546wICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgc3BpbmU6IHNwLlNrZWxldG9uPW51bGw7XHJcbiAgICAvKirnmq7ogqTnsbvlnosgKi9cclxuICAgIHByb3RlY3RlZCBza2luX3R5cGU6TW9uc3RlclNraW5UeXBlPU1vbnN0ZXJTa2luVHlwZS5Ta2luMTtcclxuICAgIC8qKuaAqueJqWlkICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9pZDogbnVtYmVyPTEwMDExO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9sZXZlbDpudW1iZXI9MTtcclxuICAgIC8qKuaAqueJqeihgOmHj+ezu+aVsCAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfaHBfcmF0ZTpudW1iZXI9MTtcclxuICAgIC8qKuaAqueJqeenjeexuyAqL1xyXG4gICAgcHVibGljIG1vbnN0ZXJfdHlwZTogbnVtYmVyPTE7XHJcbiAgICAvKirmgKrniannmoTmnIDnu4jmiJjmlpfkvb/nlKjnmoTmlbDlgLws5Y+v5pu05pS5ICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9kYXRhOiBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXM9bnVsbDtcclxuICAgIC8qKuaAqueJqeeahOWfuuehgOaImOaWl+aVsOWAvO+8jOS4jeWPr+abtOaUuSAqL1xyXG4gICAgcHJvdGVjdGVkIGJhc2VfYXR0cmlidXRlX2RhdGE6IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcz1udWxsO1xyXG4gICAgLyoq5oCq54mp55qE5Z+656GA5pWw5YC8ICovXHJcbiAgICBwcm90ZWN0ZWQgYmFzZV9kYXRhOiBKc29uTW9uc3RlckNvbmZpZ3VyZT1udWxsO1xyXG4gICAgLyoq5oCq54mp55qE6ZqQ6JeP5bGe5oCnICovXHJcbiAgICBoaWRkZW5fYXR0cmlidXRlOkhpZGRlbkF0dHJpYnV0ZT1udWxsO1xyXG4gICAgcHJvdGVjdGVkIGN1cl9tb3ZlX3NwZWVkOiBudW1iZXI9MDtcclxuICAgIHByb3RlY3RlZCBtb3ZlX3RhcmdldF9wb3M6IGNjLlZlYzI9bnVsbDtcclxuICAgIHByb3RlY3RlZCBtb3ZlX2RpcmVjdGlvbjpudW1iZXI9TWF0aC5QSSozLzI7XHJcbiAgICAvKirmnJ3lkJHlkI3np7AgKi9cclxuICAgIHByb3RlY3RlZCBmYWNlX3R5cGU6TW9uc3RlckZhY2VOYW1lPU1vbnN0ZXJGYWNlTmFtZS5Gcm9udDtcclxuICAgIC8qKuW9k+WJjeeahOihgOmHjyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl9ocDogbnVtYmVyPTA7XHJcbiAgICAvKirmnIDlpKfnmoTooYDph48gKi9cclxuICAgIHByb3RlY3RlZCBtYXhfaHA6IG51bWJlcj0wO1xyXG4gICAgLyoq6KGA5p2h6L+b5bqm5p2hICovXHJcbiAgICBwcm90ZWN0ZWQgaHBfcHJvZ3Jlc3M6IEhwUHJvZ3Jlc3NCYXI9bnVsbDsgICAgXHJcbiAgICAvKirpmLTlvbEgKi9cclxuICAgIHByb3RlY3RlZCBzaGFkb3c6IGNjLk5vZGU9bnVsbDtcclxuICAgIHNoYWRvd19wb3M6IGNjLlZlYzI9bnVsbDtcclxuICAgIHNoYWRvd19zaXplOiBjYy5TaXplPW51bGw7XHJcbiAgICAvKirlh4/kvKTnjocgKi9cclxuICAgIGppYW5zaGFuZ19yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5aKe5Lyk546HICovXHJcbiAgICB6ZW5nc2hhbmdfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKuaUu+WHu+mXtOmalO+8iOenku+8jOihqOekuuWkmuWwkeenkuaUu+WHu+S4gOasoe+8iSAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dF9qaWFuZ2U6IG51bWJlcj0xO1xyXG4gICAgLyoq5pS75Ye76K6h5pe2ICovXHJcbiAgICBwcm90ZWN0ZWQgYXR0X2ppc2h1OiBudW1iZXI9MDtcclxuICAgIC8qKuaKgOiDveiuoeaXtiAqL1xyXG4gICAgcHJvdGVjdGVkIHNraWxsX2ppc2h1OiBudW1iZXI9MDtcclxuICAgIC8qKuW9k+WJjeeahOaUu+WHu+WKmyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl9hdHQ6IG51bWJlcj0wO1xyXG4gICAgLyoq5b2T5YmN55qE6Z+n5oCnICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX3RvdWdobmVzczpudW1iZXI9MDtcclxuICAgIC8qKuaUu+WHu+ebruaghyzmlLvlh7vnm67moIfkuLpudWxs5pe277yM55uu5qCH5bCx5piv5Z+O5aKZICovXHJcbiAgICBwcm90ZWN0ZWQgYXR0X3RhcmdldDpjYy5Ob2RlPW51bGw7ICAgIFxyXG4gICAgLyoq5oCq54mp5b2T5YmN55qE54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9zdGF0ZTogRW5lbXlfU3RhdGU9RW5lbXlfU3RhdGUuc3RhbmRieTtcclxuICAgIC8qKuaAqueJqeS4iuS4gOS4queKtuaAgSAqL1xyXG4gICAgcHJvdGVjdGVkIHByZXZfc3RhdGU6IEVuZW15X1N0YXRlPUVuZW15X1N0YXRlLnN0YW5kYnk7XHJcbiAgICAvKirmgKrnianlvZPliY3mi6XmnInnmoRidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9idWZmOiBNYXA8QnVmZklkLEJ1ZmZUaW1lcj49bnVsbDtcclxuICAgIC8qKuaAqueJqeW9k+WJjeaLpeacieeahGRlYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfZGVidWZmOiBNYXA8QnVmZklkLEJ1ZmZUaW1lcj49bnVsbDtcclxuICAgIC8qKuaMh+WumueahOe8qeaUvuWAvCovXHJcbiAgICBwcm90ZWN0ZWQgc2V0dXBfc2NhbGU6bnVtYmVyPTAuNDtcclxuICAgIHByb3RlY3RlZCBpc19ib3NzOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNfY2FuX2NvdW50OmJvb2xlYW49dHJ1ZTtcclxuICAgIHByb3RlY3RlZCBpc19jb3VudDpib29sZWFuPXRydWU7XHJcbiAgICAvKirln47lopnnmoRZ6L205Z2Q5qCHICovXHJcbiAgICBwcm90ZWN0ZWQgd2FsbF95eTpudW1iZXI9MDtcclxuICAgIHByb3RlY3RlZCBhdHRfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuWIhuaVsCAqL1xyXG4gICAgcHVibGljIHNjb3JlOm51bWJlcj0wO1xyXG4gICAgLyoq54uZ5Ye7556E5YeG55qE5L2N572uICovXHJcbiAgICBwcm90ZWN0ZWQganVqaV9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLyoq6KGA5p2h55qE5L2N572uICovXHJcbiAgICBwcm90ZWN0ZWQgaHBfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuS4reW/g+S9jee9ru+8jOeUqOS6juiMg+WbtOajgOa1iyAqL1xyXG4gICAgcHJvdGVjdGVkIGNlbnRlcl9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLy/lj5fkvKTliqjkvZxcclxuICAgIHByb3RlY3RlZCBpbmp1cmVkX2FjdGlvbjpjYy5Ud2Vlbj1udWxsO1xyXG5cclxuICAgIC8qKuWIneWni+WMluWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBpbml0X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirmgKrnianooYDph4/lj5HnlJ/lj5jljJbml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlX2hwX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirnnKnmmZXlm57osIPvvIznlKjkuo5ib3Nz5pa95rOV6KKr5Lit5patICovXHJcbiAgICBwcml2YXRlIHh1YW55dW5fY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuatu+S6oeWbnuiwg++8jOaAqueJqeatu+S6oeaXtuinpuWPke+8jOeUqOS6juaSreaUvuiHqui6q+WvueW6lOeahOatu+S6oeWKqOeUuyAqL1xyXG4gICAgcHJpdmF0ZSBkZWF0aF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq6KKr5Li75Yqo5oqA6IO95Y+X5Lyk5pe255qE5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGFjdGl2ZV9pbmp1cnlfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuenu+WKqOWIsOebruagh+WcsOeCueWbnuiwgyAqL1xyXG4gICAgcHJvdGVjdGVkIG1vdmVfZW5kX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKipkZWJ1Zmblop7kvKTnu5/orqEgKi8gICAgXHJcbiAgICBwcml2YXRlIGluanVyeV9kYW1hZ2Vfc3RhdHM6TWFwPG51bWJlcixudW1iZXI+PW51bGw7XHJcbiAgICAvKirmsp/lo5HkvKTlrrPorqHnrpcgKi9cclxuICAgIGlzX2Nhbl9ndWxseTpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5oul5pyJ55qE5YWJ546vICovXHJcbiAgICBwcml2YXRlIG1vbnN0ZXJfaGFsbzpNYXA8SGFsb0lkLEhhbG9EYXRhPj1udWxsO1xyXG4gICAgLyoq6aKd5aSW55qE6Zeq6YG/546HICovXHJcbiAgICBwcml2YXRlIGV4X21pc3NfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKumineWklueahOmYsuW+oeWKmyAqL1xyXG4gICAgcHJpdmF0ZSBleF9kZWZlbnNlX3ZhbHVlOm51bWJlcj0wO1xyXG4gICAgLyoq6aKd5aSW55qE56e75Yqo6YCf5bqmICovXHJcbiAgICBwcml2YXRlIGV4X21vdmVfc3BlZWRfdmFsdWU6bnVtYmVyPTA7XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5oqA6IO955qELS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvKirmioDog73mlbDmja4gKi9cclxuICAgIHNraWxsX2RhdGE6TW9uc3RlclNraWxsRGF0YT1udWxsO1xyXG4gICAgLyoq5omA5pyJ5oqA6IO955qE5b2T5YmN55qE5Ya35Y205pe26Ze0ICovXHJcbiAgICBza2lsbF9jb2xkX2Rvd246bnVtYmVyW109W107XHJcbiAgICAvKirmioDog73pmJ/liJcgKi9cclxuICAgIHNraWxsX3F1ZXVlOm51bWJlcltdPVtdO1xyXG4gICAgLyoq5b2T5YmN5L2/55So55qE5oqA6IO9LDDku6PooajmsqHmnIkgKi9cclxuICAgIGN1cl9za2lsbF9pbmRleDpudW1iZXI9MDtcclxuICAgIC8qKueisOaSnuWZqCAqL1xyXG4gICAgY29sbGlkZXI6Y2MuQ29sbGlkZXI9bnVsbDtcclxuICAgIC8qKuimgeaUu+WHu+eahOWfjuWimSAqL1xyXG4gICAgYXR0X3dhbGw6V2FsbD1udWxsO1xyXG4gICAgLyoq54m15byV5pyA5bCP6Led56a7ICovXHJcbiAgICBtaW5fcWlhbnlpbjpudW1iZXI9MDtcclxuXHJcbiAgICBjdXJfY29sb3I6Q29sb3JUeXBlPUNvbG9yVHlwZS5OdWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfbm9ybWFsX2F0dCw4KTtcclxuICAgICAgICAvLyBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczFfYXR0X21vdmUsMik7XHJcbiAgICAgICAgLy8gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLmJvc3MxX2F0dF9lbmQsMik7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRWZmZWN0UG9vbEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfZGllLDgpO1xyXG4gICAgICAgIHRoaXMuc3BpbmU9dGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5sb2FkSW5pdFBvcygpO1xyXG4gICAgICAgIHRoaXMud2FsbF95eT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2F0dF95O1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9idWZmPW5ldyBNYXA8QnVmZklkLEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmPW5ldyBNYXA8QnVmZklkLEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfaGFsbz1uZXcgTWFwPEhhbG9JZCxIYWxvRGF0YT4oKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZD10cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQobW9uc3RlcklkOiBudW1iZXIsbGV2ZWw6bnVtYmVyLGhwUmF0ZTpudW1iZXIsaXNDYW5Db3VudDpib29sZWFuPXRydWUpIHtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfaWQ9bW9uc3RlcklkO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9sZXZlbD1sZXZlbDtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfaHBfcmF0ZT1ocFJhdGU7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUobW9uc3RlcklkKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfdHlwZT1qc29uRGF0YS5Nb25zdGVyQ2xhc3M7XHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUlkPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJZCh0aGlzLm1vbnN0ZXJfaWQsbGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YT1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0cmlidXRlSWQpOyAgICAgIFxyXG4gICAgICAgIHRoaXMuaXNfY2FuX2d1bGx5PXRydWU7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQ9aXNDYW5Db3VudDtcclxuICAgICAgICB0aGlzLmlzX2NvdW50PXRoaXMuaXNfY2FuX2NvdW50O1xyXG4gICAgICAgIHRoaXMuZXhfbWlzc19yYXRlPTA7XHJcbiAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlPTA7XHJcbiAgICAgICAgLy90aGlzLmluaXRPdXR3YXJkKGpzb25EYXRhLlNraW4pOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0RGF0YShqc29uRGF0YSk7XHJcbiAgICAgICAgdGhpcy5hZGRIcFByb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRTaGFkb3coKTtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcihDb2xvclR5cGUuTnVsbCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlcj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLm1pbl9xaWFueWluPTA7XHJcbiAgICAgICAgaWYodGhpcy5pbml0X2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5pbml0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5zcGluZS5wYXVzZWQ9ZmFsc2U7XHJcbiAgICAgICAgLy90aGlzLm1vdmVfZGlyZWN0aW9uPU1hdGguUEkqMy8yK01hdGgucmFuZG9tKCkqKE1hdGguUEkvNiktKE1hdGguUEkvMTIpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFN1bW1vbihtb25zdGVySWQ6IG51bWJlcixib3NzQXR0cmlidXRlOkpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2lkPW1vbnN0ZXJJZDtcclxuICAgICAgICBsZXQganNvbkRhdGE9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZShtb25zdGVySWQpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl90eXBlPWpzb25EYXRhLk1vbnN0ZXJDbGFzcztcclxuICAgICAgICB0aGlzLmlzX2Nhbl9ndWxseT10cnVlO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2NvdW50PWZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfY291bnQ9dGhpcy5pc19jYW5fY291bnQ7XHJcbiAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhPWNjLmluc3RhbnRpYXRlKGJvc3NBdHRyaWJ1dGUpO1xyXG4gICAgICAgIHN3aXRjaChqc29uRGF0YS5TdHJlbmd0aFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5FbGl0ZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuSGVhbHRoPWJvc3NBdHRyaWJ1dGUuSGVhbHRoLzUwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkF0dGFjaz1ib3NzQXR0cmlidXRlLkF0dGFjayowLjk3MjQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuRGVmZW5zZT1ib3NzQXR0cmlidXRlLkRlZmVuc2UqMC42O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLk5vcm1hbDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuSGVhbHRoPWJvc3NBdHRyaWJ1dGUuSGVhbHRoLzUwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkF0dGFjaz1ib3NzQXR0cmlidXRlLkF0dGFjayowLjk1OTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuRGVmZW5zZT0wO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0RGF0YShqc29uRGF0YSk7XHJcbiAgICAgICAgdGhpcy5hZGRIcFByb2dyZXNzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRTaGFkb3coKTtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc3RhbmRieSk7XHJcbiAgICAgICAgdGhpcy5zZXRDb2xvcihDb2xvclR5cGUuTnVsbCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlcj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICB0aGlzLm1pbl9xaWFueWluPTA7XHJcbiAgICAgICAgaWYodGhpcy5pbml0X2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5pbml0X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hEYXRhKGxldmVsOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2xldmVsPWxldmVsO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKHRoaXMubW9uc3Rlcl9pZCk7ICAgICAgICBcclxuICAgICAgICAvL+mHjee9ruaVsOaNrlxyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVJZD1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SWQodGhpcy5tb25zdGVyX2lkLGxldmVsKTtcclxuICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGE9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKGF0dHJpYnV0ZUlkKTsgIFxyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YSk7XHJcbiAgICAgICAgdGhpcy5iYXNlX2RhdGE9anNvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5jdXJfaHA9dGhpcy5tYXhfaHA9dGhpcy5tb25zdGVyX2RhdGEuSGVhbHRoO1xyXG4gICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dGhpcy5iYXNlX2RhdGEuU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5hdHRfamlhbmdlPTEvdGhpcy5iYXNlX2RhdGEuQXR0YWNrU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5jdXJfYXR0PXRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjaztcclxuICAgICAgICAvLyBpZih0aGlzLmJhc2VfZGF0YS5Ta2lsbE51bT4wKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2FkTW9uc3RlclNraWxsRGF0YSgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8qKuWIneWni+WMluWkluingiovXHJcbiAgICAvLyBwcml2YXRlIGluaXRPdXR3YXJkKHNraW5UeXBlOk1vbnN0ZXJTa2luVHlwZSl7XHJcbiAgICAvLyAgICAgdGhpcy5za2luX3R5cGU9c2tpblR5cGU7XHJcbiAgICAvLyAgICAgdGhpcy5zZXRTa2luKHRoaXMuZ2V0U2tpbk5hbWUoKSk7XHJcbiAgICAvLyAgICAgdGhpcy5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUpLHRydWUpO1xyXG4gICAgLy8gfVxyXG4gICAgLyoq5Yid5aeL5YyW5pWw5o2uICovXHJcbiAgICBwcml2YXRlIGluaXREYXRhKGJhc2VEYXRhOkpzb25Nb25zdGVyQ29uZmlndXJlKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEpO1xyXG4gICAgICAgIHRoaXMuYmFzZV9kYXRhPWJhc2VEYXRhO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwPXRoaXMubW9uc3Rlcl9kYXRhLkhlYWx0aCp0aGlzLm1vbnN0ZXJfaHBfcmF0ZTtcclxuICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuYmFzZV9kYXRhLlNwZWVkO1xyXG4gICAgICAgIHRoaXMuYXR0X2ppYW5nZT0xL3RoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkO1xyXG4gICAgICAgIHRoaXMuY3VyX2F0dD10aGlzLm1vbnN0ZXJfZGF0YS5BdHRhY2s7XHJcbiAgICAgICAgdGhpcy5jdXJfdG91Z2huZXNzPTA7XHJcbiAgICAgICAgdGhpcy5zZXR1cF9zY2FsZT10aGlzLmJhc2VfZGF0YS5TY2FsZTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGU9dGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7ICAgICAgICBcclxuICAgICAgICB0aGlzLnNraW5fdHlwZT1iYXNlRGF0YS5Ta2luO1xyXG4gICAgICAgIHRoaXMuaGlkZGVuX2F0dHJpYnV0ZT1uZXcgSGlkZGVuQXR0cmlidXRlKCk7XHJcbiAgICAgICAgdGhpcy5pbmp1cnlfZGFtYWdlX3N0YXRzPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBpZih0aGlzLmJhc2VfZGF0YS5Ta2lsbE51bT4wKXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTW9uc3RlclNraWxsRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRNb25zdGVyU2tpbGxEYXRhKCl7XHJcbiAgICAgICAgbGV0IHNraWxsRGF0YT1uZXcgTW9uc3RlclNraWxsRGF0YSgpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Db2xkRG93bj1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLkluaXRDb2xkRG93bj1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfMT1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfMj1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfMz1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfND1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLkNhc3RpbmdSYW5nZT1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgZm9yKGxldCBzPTE7IHM8PXRoaXMuYmFzZV9kYXRhLlNraWxsTnVtOyBzKyspeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgaWQ9TW9uc3RlclNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElkKHRoaXMubW9uc3Rlcl9pZCxzLHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5Ta2lsbExldmVsKVxyXG4gICAgICAgICAgICBsZXQganNvbkRhdGE9TW9uc3RlclNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyU2tpbGwoaWQpO1xyXG4gICAgICAgICAgICBpZihqc29uRGF0YSA9PSBudWxsICkgY29udGludWU7XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzEuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8xKTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfMi5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzIpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8zLnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMyk7XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzQuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV80KTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLkNvbGREb3duLnNldChzLGpzb25EYXRhLkNvbGREb3duKTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLkluaXRDb2xkRG93bi5zZXQocyxqc29uRGF0YS5Jbml0aWFsQ29sZERvd24pO1xyXG4gICAgICAgICAgICB0aGlzLnNraWxsX2NvbGRfZG93bltzLTFdPWpzb25EYXRhLkluaXRpYWxDb2xkRG93bjtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLkNhc3RpbmdSYW5nZS5zZXQocyxqc29uRGF0YS5DYXN0aW5nUmFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNraWxsX2RhdGE9c2tpbGxEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRIcFByb2dyZXNzKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5ocF9wcm9ncmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSE9U3RyZW5ndGhUeXBlLkJvc3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHBfcHJvZ3Jlc3M9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9ocF9tYW5hZ2VyLmNyZWF0ZUVuZW15SHAoY2MudjIodGhpcy5ub2RlLngrdGhpcy5ocF9wb3MueCp0aGlzLnNldHVwX3NjYWxlLHRoaXMubm9kZS55K3RoaXMuaHBfcG9zLnkqdGhpcy5zZXR1cF9zY2FsZSkpLmdldENvbXBvbmVudChIcFByb2dyZXNzQmFyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkU2hhZG93KCl7XHJcbiAgICAgICAgLy9pZih0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGUhPVN0cmVuZ3RoVHlwZS5Cb3NzKVxyXG4gICAgICAgIGlmKCF0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93PUdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTaGFkb3codGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuYWRkKHRoaXMuc2hhZG93X3BvcykpO1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy53aWR0aD10aGlzLm5vZGUuc2NhbGVYKnRoaXMuc2hhZG93X3NpemUud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LmhlaWdodD10aGlzLm5vZGUuc2NhbGVZKnRoaXMuc2hhZG93X3NpemUuaGVpZ2h0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24odGhpcy5ub2RlLmdldFBvc2l0aW9uKCkuYWRkKHRoaXMuc2hhZG93X3BvcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvd0hwKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmhwX3Byb2dyZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ocF9wcm9ncmVzcy5jaGFuZ2VQcm9ncmVzcyh0aGlzLmN1cl9ocC90aGlzLm1heF9ocCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldElzQ2FuQ291bnQoaXNDYW5Db3VudDpib29sZWFuKXtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9jb3VudD1pc0NhbkNvdW50O1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaXNfY2FuX2NvdW50PT1mYWxzZSl7XHJcbiAgICAgICAgLy8gICAgIGNjLmxvZygnc2V0SXNDYW5Db3VudD09ZmFsc2UnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2V0dXBTY2FsZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaGVTaG91QXR0YWNrU2NhbGUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNjYWxlPTAuMztcclxuICAgICAgICBzd2l0Y2godGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuTm9ybWFsOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuNTU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuRWxpdGU6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC43NTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Cb3NzOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTEuMjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2FsbEF0dGFja1NjYWxlKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBzY2FsZT0xO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC42O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuOTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WHVhbnl1blNjYWxlKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBzY2FsZT0wLjM7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLk5vcm1hbDp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjU1L3RoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuRWxpdGU6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC43NS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkJvc3M6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MS41L3RoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0cmVuZ3RoVHlwZSgpOlN0cmVuZ3RoVHlwZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vbnN0ZXJEYXRhKCk6SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVze1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorqHnrpfkvKTlrrPmlbDmja4gKi9cclxuICAgIGdldEluanVyZWREYXRhKGdqRGF0YTpHb25nSmlEYXRhKTpJbmp1cmVkRGF0YXtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICBpZih0aGlzLmdldElzRGllKCkpe1xyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLkRpZTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBnbT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBtaXNzUmF0ZT0wOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNyaXRSYXRlPTA7XHJcbiAgICAgICAgLy/lpoLmnpzmmK/mma7pgJrmlLvlh7vvvIzorqHnrpfpl6rpgb/lkozmmrTlh7vvvIzpu5jorqTkuLowXHJcbiAgICAgICAgbGV0IGhlcm9EYXRhPWdqRGF0YS5oZXJvX2RhdGE7XHJcbiAgICAgICAgLy/mgKrniannmoTpmLLlvqHliptcclxuICAgICAgICBsZXQgc2VsZkRlZmVuc2U9dGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZSt0aGlzLmV4X2RlZmVuc2VfdmFsdWU7XHJcbiAgICAgICAgbGV0IGZpbmFsRGVmZW5zZT1Jbmp1cmVkRGF0YS5jYWxjRmluYWxEZWZlbnNlKHNlbGZEZWZlbnNlLGhlcm9EYXRhLmlnbm9yZV9kZWZlbnNlX3JhdGUpXHJcbiAgICAgICAgaWYoZ2pEYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNIYXZlQnVmZihCdWZmSWQuQm9zczJfTWlhbllpX0F0dGFjaykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTWFpbllpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLld1RGk7XHJcbiAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLEVuZW15X0luanVyZWRfVHlwZS5XdURpLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWlzc1JhdGU9SW5qdXJlZERhdGEuY2FsY01pc3NSYXRlKHRoaXMubW9uc3Rlcl9kYXRhLk1pc3MsZ2pEYXRhLmhlcm9fZGF0YS5IaXQpK3RoaXMuZXhfbWlzc19yYXRlLWdqRGF0YS5oZXJvX2RhdGEuaGl0X2V4O1xyXG4gICAgICAgICAgICBjcml0UmF0ZT1Jbmp1cmVkRGF0YS5jYWxjQ3JpdFJhdGUoZ2pEYXRhLmhlcm9fZGF0YS5Dcml0aWNhbCx0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpQ3JpdGljYWwpO1xyXG4gICAgICAgICAgICBjcml0UmF0ZSs9Z2pEYXRhLmhlcm9fZGF0YS5jcml0X2V4O1xyXG4gICAgICAgICAgICAvL+iOt+WPluS4gOS4quamgueOh+exu+Wei1xyXG4gICAgICAgICAgICBsZXQgdHlwZT1Jbmp1cmVkRGF0YS5jYWxjT25jZVR5cGUoW21pc3NSYXRlLGNyaXRSYXRlLDFdKTtcclxuICAgICAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOntcclxuICAgICAgICAgICAgICAgICAgICAvL+mXqumBv1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuU2hhbkJpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5TaGFuQmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZVR5cGVUZXh0KGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzYwKSxFbmVteV9Jbmp1cmVkX1R5cGUuU2hhbkJpLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOntcclxuICAgICAgICAgICAgICAgICAgICAvL+aatOWHu1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuQmFvSmk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsQ3JpdERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZmluYWxEZWZlbnNlLGhlcm9EYXRhLmF0dGFja19pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlLEluanVyZWREYXRhLmNhbGNGaW5hbEV4dHJhQ3JpdChoZXJvRGF0YS5FeHRyYUNyaXRpY2FsLHRoaXMubW9uc3Rlcl9kYXRhLkFudGlFeHRyYUNyaXRpY2FsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuQmFvSmk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ2pEYXRhLnBldF9pZD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGdqRGF0YS5oZXJvX3R5cGUpLm9uRGFtYWdlTW9uc3RlcihEYW1hZ2VUeXBlLk5vcm1hbCx0cnVlLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFnbS5pc19zaG93X3RleHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLGRhdGEudGV4dF90eXBlLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mma7pgJrlkb3kuK1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk51bGw7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGFtYWdlPUluanVyZWREYXRhLmNhbGNOb3JtYWxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5hdHRhY2tfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjaztcclxuICAgICAgICAgICAgICAgICAgICBpZihnakRhdGEucGV0X2lkPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoZ2pEYXRhLmhlcm9fdHlwZSkub25EYW1hZ2VNb25zdGVyKERhbWFnZVR5cGUuTm9ybWFsLGZhbHNlLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYoZ2pEYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLlNraWxsKXtcclxuICAgICAgICAgICAgLy/kuI3pnIDopoHorqHnrpfpl6rpgb/vvIzmioDog73lv4XkuK1cclxuICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5OdWxsO1xyXG4gICAgICAgICAgICBsZXQgZGFtYWdlPTA7XHJcbiAgICAgICAgICAgIGlmKGdqRGF0YS5pc19jYW5fY3JpdCl7XHJcbiAgICAgICAgICAgICAgICBjcml0UmF0ZT1Jbmp1cmVkRGF0YS5jYWxjQ3JpdFJhdGUoZ2pEYXRhLmhlcm9fZGF0YS5Dcml0aWNhbCx0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpQ3JpdGljYWwpO1xyXG4gICAgICAgICAgICAgICAgY3JpdFJhdGUrPWdqRGF0YS5oZXJvX2RhdGEuY3JpdF9leDtcclxuICAgICAgICAgICAgICAgIC8v6I635Y+W5LiA5Liq5qaC546H57G75Z6LXHJcbiAgICAgICAgICAgICAgICBsZXQgdHlwZT1Jbmp1cmVkRGF0YS5jYWxjT25jZVR5cGUoWzAsY3JpdFJhdGUsMV0pO1xyXG4gICAgICAgICAgICAgICAgaWYodHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuQmFvSmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbENyaXREYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSxmaW5hbERlZmVuc2UsaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSxJbmp1cmVkRGF0YS5jYWxjRmluYWxFeHRyYUNyaXQoaGVyb0RhdGEuRXh0cmFDcml0aWNhbCx0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpRXh0cmFDcml0aWNhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFnbS5pc19zaG93X3RleHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLGRhdGEudGV4dF90eXBlLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSxmaW5hbERlZmVuc2UsaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSxmaW5hbERlZmVuc2UsaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICAgICAgaWYoZ2pEYXRhLnBldF9pZD09MCl7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChnakRhdGEuaGVyb190eXBlKS5vbkRhbWFnZU1vbnN0ZXIoRGFtYWdlVHlwZS5Ta2lsbCxmYWxzZSx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnnqzpl7TkvKTlrrNcclxuICAgICAqIEBwYXJhbSBnakRhdGEg5pS75Ye757G75Z6LXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgYmVGbGFzaEluanVyZWQoZ2pEYXRhOkdvbmdKaURhdGEpOiBJbmp1cmVkRGF0YXtcclxuICAgICAgICBsZXQgZGF0YT10aGlzLmdldEluanVyZWREYXRhKGdqRGF0YSk7ICAgICAgICBcclxuICAgICAgICB0aGlzLmJlRGFtYWdlKGRhdGEsZ2pEYXRhKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJlQ29udGludW91c0luanVyZWQoZ2pEYXRhOkdvbmdKaURhdGEsZmxvb3JOdW06bnVtYmVyPTEpIHtcclxuICAgICAgICBpZihnakRhdGEuY29udGludW91c19kYW1hZ2VfcmF0ZT4wKXtcclxuICAgICAgICAgICAgLy/mgKrniannmoTpmLLlvqHliptcclxuICAgICAgICAgICAgbGV0IHNlbGZEZWZlbnNlPXRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UrdGhpcy5leF9kZWZlbnNlX3ZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxEZWZlbnNlPUluanVyZWREYXRhLmNhbGNGaW5hbERlZmVuc2Uoc2VsZkRlZmVuc2UsZ2pEYXRhLmhlcm9fZGF0YS5pZ25vcmVfZGVmZW5zZV9yYXRlKVxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGE9Z2pEYXRhLmhlcm9fZGF0YTtcclxuICAgICAgICAgICAgbGV0IGRhdGE9bmV3IEluanVyZWREYXRhKCk7XHJcbiAgICAgICAgICAgIGxldCBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY1NraWxsRGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjayxnakRhdGEuY29udGludW91c19kYW1hZ2VfcmF0ZSxmaW5hbERlZmVuc2UsaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSk7XHJcbiAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5aaG9uZ0R1O1xyXG4gICAgICAgICAgICBpZihnakRhdGEuaGVyb190eXBlPT1IZXJvX1R5cGUuTnZXdSl7XHJcbiAgICAgICAgICAgICAgICBkYW1hZ2U9ZGFtYWdlKmZsb29yTnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmVEYW1hZ2UoZGF0YSxnakRhdGEpOyAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq6YCg5oiQ55yf5a6e5Lyk5a6z77yM55u05o6l6YCg5oiQ5a+55bqU55qE5Lyk5a6z5YC8LOaXoOazlemXqumBvyAqL1xyXG4gICAgYmVSZWFsRGFtYWdlKGdqRGF0YTpHb25nSmlEYXRhLGRhbWFnZTpudW1iZXIpOkluanVyZWREYXRhe1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBJbmp1cmVkRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgdGhpcy5iZURhbWFnZShkYXRhLGdqRGF0YSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIC8qKuaBouWkjeeUn+WRveWAvOaYr+WQpuaIkOWKnyAqL1xyXG4gICAgYmVIZWFsKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5nZXRDdXJIcCgpPj10aGlzLmdldE1heEhwKCl8fHRoaXMuZ2V0SXNEaWUoKT09dHJ1ZSl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoq55uu5YmN5rKh5pyJ5rK755aX5pWI5p6c5Yqg5oiQ77yM5Y+q5pyJ6YeN5Lyk77yM5Y+q6K6h566X6YeN5LykICovXHJcbiAgICAgICAgbGV0IG5ld051bT1udW0qKDEtdGhpcy5nZXRNYXhTZXJpb3VzbHkoKSkgICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2hhbmdlSHAobmV3TnVtKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcCh0aGlzLmdldENlbnRlclBvcygpLG5ld051bSxFbmVteV9Jbmp1cmVkX1R5cGUuWmhpTGlhbyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiZURhbWFnZShkYXRhOkluanVyZWREYXRhLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpPT1TdHJlbmd0aFR5cGUuQm9zcyYmdGhpcy5pc0hhdmVCdWZmKEJ1ZmZJZC5Cb3NzOV9Ta2lsbF8zX3dpZHUpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5NYWluWWk7XHJcbiAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5XdURpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksRW5lbXlfSW5qdXJlZF9UeXBlLld1RGksbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgIGxldCBnbT0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgZGF0YS5pc19kaWU9dGhpcy5jaGFuZ2VIcCgtZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgIGlmKGdtLmlzX3Nob3dfdGV4dCYmZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueStNYXRoLnJhbmRvbSgpKjEwMCksZGF0YS5nZXREYW1hZ2VOdW0oKSxkYXRhLnRleHRfdHlwZSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgICAgICBpZighZGF0YS5pc19kaWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEh1cnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WQuOihgOaViOaenFxyXG4gICAgICAgICAgICBpZihnakRhdGEuaGVyb19kYXRhLmJsb29kX3N1Y2tpbmdfcmF0ZT4wJiZkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGhwPUluanVyZWREYXRhLmNhbGNCbG9vZFN1Y2tpbmcoZGF0YS5nZXREYW1hZ2VOdW0oKSxnakRhdGEuaGVyb19kYXRhLmJsb29kX3N1Y2tpbmdfcmF0ZSxnakRhdGEuaGVyb19kYXRhLnNlcmlvdXNfaW5qdXJ5X3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoaHA+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgV2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpLmNoYW5nZUhwKGhwKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKirorrDlvZXmnIDpq5jkvKTlrrMgKi9cclxuICAgICAgICAgICAgZ20uc2V0TWF4RGFtYWdlKGRhdGEuZ2V0RGFtYWdlTnVtKCkpO1xyXG4gICAgICAgICAgICBnbS5zZXRNaW5EYW1hZ2UoZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgIGlmKGdqRGF0YS5za2lsbF9yZWxlYXNlX2lkPjApe1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVjb3JkRGFtYWdlKGdqRGF0YS5za2lsbF9yZWxlYXNlX2lkLGRhdGEuZ2V0RGFtYWdlTnVtKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hY3RpdmVfaW5qdXJ5X2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZV9pbmp1cnlfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKirorrDlvZVEUFMgKi9cclxuICAgICAgICAgICAgc3dpdGNoKGdqRGF0YS5kYW1hZ2VfdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhbWFnZVR5cGUuTm9ybWFsOnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmhlcm9fYXR0YWNrX2Rwc1tnakRhdGEuaGVyb190eXBlXSs9ZGF0YS5nZXREYW1hZ2VOdW0oKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGFtYWdlVHlwZS5Ta2lsbDp7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBnbS5oZXJvX3NraWxsX2Rwc1tnakRhdGEuaGVyb190eXBlXSs9ZGF0YS5nZXREYW1hZ2VOdW0oKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAvKirlhrDlpbPpop3lpJbnnJ/lrp7kvKTlrrMgKi9cclxuICAgICAgICAgICAgLy8gaWYoU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QmluZ052U2tpbGwyKCk+MCYmdGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlNsb3dkb3duKSl7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgZGFtYWdlPWRhdGEuZ2V0RGFtYWdlTnVtKCkqU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QmluZ052U2tpbGwyKCk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZihkYW1hZ2U8MSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZGFtYWdlPTE7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNoYW5nZUhwKC1kYW1hZ2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgZ20uaGVyb19za2lsbF9kcHNbSGVyb19UeXBlLkJpbmdOdl0rPWRhbWFnZTtcclxuICAgICAgICAgICAgLy8gICAgIGlmKGdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzMyKSxkYW1hZ2UsRW5lbXlfSW5qdXJlZF9UeXBlLkJpbmdOdlpoZW5TaGFuZyk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gLyoq6Zi/5Yqq5q+U5pav6aKd5aSW55yf5a6e5Lyk5a6zICovXHJcbiAgICAgICAgICAgIC8vIGlmKFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFOdUJpU2lTa2lsbDIoKT4wKXtcclxuICAgICAgICAgICAgLy8gICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5TbG93ZG93bil8fHRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGRhbWFnZT1kYXRhLmdldERhbWFnZU51bSgpKlNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFOdUJpU2lTa2lsbDIoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihkYW1hZ2U8MSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRhbWFnZT0xO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmNoYW5nZUhwKC1kYW1hZ2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGdtLmhlcm9fc2tpbGxfZHBzW0hlcm9fVHlwZS5BTnVCaVNpXSs9ZGFtYWdlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSszMiksZGFtYWdlLEVuZW15X0luanVyZWRfVHlwZS5BTnVCaVNpWmhlblNoYW5nKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5hX251X2JpX3NpX2JlaWRvbmdfc2tpbGxfMix0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLyoq5b636bKB5LyK6aKd5aSW55yf5a6e5Lyk5a6zICovXHJcbiAgICAgICAgICAgIGlmKFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlTHVZaUV4KCkmJnRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX0RlTHVZaV9FeCkpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhbWFnZT1kYXRhLmdldERhbWFnZU51bSgpKlNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlTHVZaUV4KCk7XHJcbiAgICAgICAgICAgICAgICBpZihkYW1hZ2U8MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlPTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUhwKC1kYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgZ20uaGVyb19za2lsbF9kcHNbSGVyb19UeXBlLkRlTHVZaV0rPWRhbWFnZTtcclxuICAgICAgICAgICAgICAgIGlmKGdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzMyKSxkYW1hZ2UsRW5lbXlfSW5qdXJlZF9UeXBlLk5vcm1hbF9BdHRhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05pS5aHDvvIzov5Tlm57mmK/lkKbmrbvkuqEgKi9cclxuICAgIHByb3RlY3RlZCBjaGFuZ2VIcChudW06IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SXNEaWUoKXx8dGhpcy5nZXRFbmVteVN0YXRlKCk9PUVuZW15X1N0YXRlLmJvcm58fEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfc3RhdGUhPUdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpc0RpZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmN1cl9ocCs9bnVtO1xyXG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuQm9zc19DaGFsbGVuZ2Upe1xyXG4gICAgICAgICAgICBpZih0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGU9PVN0cmVuZ3RoVHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX2hwPD0wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl9ocD0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jaGFuZ2VfaHBfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlX2hwX2NhbGxiYWNrKG51bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlTGV2ZWw9Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRTY29yZShNYXRoLmFicyhNYXRoLnJvdW5kKG51bSkpKTtcclxuICAgICAgICAgICAgICAgIGlmKHVzZUxldmVsIT10aGlzLm1vbnN0ZXJfbGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaERhdGEodXNlTGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERlYXRoKCk7XHJcbiAgICAgICAgICAgIGlzRGllPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VyX2hwPnRoaXMubWF4X2hwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfaHA9dGhpcy5tYXhfaHBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoaXNEaWU9PWZhbHNlJiZHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1hemUpe1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLmN1cl9ocDwodGhpcy5tYXhfaHAqMC4xKSl7XHJcbiAgICAgICAgLy8gICAgICAgICBpZihNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzSGF2ZUFCdWZmKFs4MDAzXSkpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNoYW5nZUhwKC10aGlzLmN1cl9ocCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQucGV0XzIxX2FjdGl2ZV8zX2xpYW5kYW8sY2MudjIoMCwyMDApLHRoaXMubm9kZSwoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0XzIxX2FjdGl2ZV8yX2xpYW5kYW9fZHJvcF9oaXQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmKHRoaXMuY2hhbmdlX2hwX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VfaHBfY2FsbGJhY2sobnVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcclxuICAgICAgICByZXR1cm4gaXNEaWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQnVmZihidWZmRGF0YTogQnVmZkRhdGEpOiBCdWZmVGltZXIge1xyXG4gICAgICAgIGlmKHRoaXMubW9uc3Rlcl9idWZmLmhhcyhidWZmRGF0YS5idWZmX2lkKT09ZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOmNjLk5vZGU9bnVsbDtcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9PUdhbWVFZmZlY3RJZC5OdWxsKXtcclxuICAgICAgICAgICAgICAgIG5vZGU9bmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMuanVqaV9wb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCx0aGlzLmp1amlfcG9zLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXRoaXMuZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOkJ1ZmZUaW1lcj1ub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZighYnVmZil7XHJcbiAgICAgICAgICAgICAgICBidWZmPW5vZGUuYWRkQ29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi5pbml0KGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgLy9idWZm5rK755aX6Kem5Y+R5pe25aSE55CGXHJcbiAgICAgICAgICAgIGlmKGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lPjApe1xyXG4gICAgICAgICAgICAgICAgYnVmZi5hZGRSZWNvdmVyeUxpc3Rlbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9SZWNvdmVyeToobnVtOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhlYWwobnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LGJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsYnVmZik7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl90eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuTW92ZVNwZWVkVXA6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuQXR0U3BlZWRVcDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOV9Ta2lsbF8xX2d1b3phaTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56ZW5nc2hhbmdfcmF0ZSs9YnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YS5EZWZlbnNlLT10aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuRGVmZW5zZSooYnVmZkRhdGEuYnVmZl92YWx1ZVsxXSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzMTBfU2tpbGxfNF9rdWFuZ2Jhb19namw6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjays9dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkF0dGFjayooYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyJYnVmZu+8jOWImeWIt+aWsOaXtumXtCzph43mlrDorqHml7ZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY9dGhpcy5tb25zdGVyX2J1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN1YkJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZj10aGlzLm1vbnN0ZXJfYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZihidWZmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnVmZkRlc3RvcnkoYnVmZkRhdGE6QnVmZkRhdGEpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9idWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl90eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5Nb3ZlU3BlZWRVcDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5BdHRTcGVlZFVwOntcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczlfU2tpbGxfMV9ndW96YWk6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy56ZW5nc2hhbmdfcmF0ZS09YnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UrPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlKihidWZmRGF0YS5idWZmX3ZhbHVlWzFdKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzMTBfU2tpbGxfNF9rdWFuZ2Jhb19namw6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrLT10aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrKihidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9idWZmLmhhcyhidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBCdWZmVGltZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfYnVmZi5nZXQoYnVmZklkKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVCdWZmVHlwZShidWZmVHlwZTogQnVmZlR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNIYXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9idWZmLmZvckVhY2goKGJ1ZmY6QnVmZlRpbWVyKT0+e1xyXG4gICAgICAgICAgICBpZihpc0hhdmU9PWZhbHNlICYmIGJ1ZmYuZ2V0QnVmZlR5cGUoKT09YnVmZlR5cGUpe1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBpc0hhdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQnVmZigpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9idWZmLmZvckVhY2goKGJ1ZmY6QnVmZlRpbWVyKT0+e1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGREZUJ1ZmYoYnVmZkRhdGE6QnVmZkRhdGEsZ2pEYXRhOkdvbmdKaURhdGEpOiBCdWZmVGltZXIge1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKGJ1ZmZEYXRhLmJ1ZmZfaWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mjqfliLbnsbvnmoRkZWJ1ZmbpnIDopoHmoLnmja7pn6fmgKfmnaXlrp7njrDlhbfkvZPnmoTmlYjmnpxcclxuICAgICAgICAgICAgbGV0IGJ1ZmZUeXBlPWJ1ZmZEYXRhLmJ1ZmZfdHlwZTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZUeXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuVmVydGlnbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfdG91Z2huZXNzPj0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLEVuZW15X0luanVyZWRfVHlwZS5NaWFuWWlLb25nWmhpLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkJvc3MzX01pYW5ZaV9Lb25nWmhpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEJ1ZmYoQnVmZklkLkJvc3MzX01pYW5ZaV9Lb25nWmhpKS5hZGRGbG9vcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihnakRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT1Jbmp1cmVkRGF0YS5jYWxjQ29udHJvbFRpbWUoYnVmZkRhdGEucmVtYWluX3RpbWUsdGhpcy5jdXJfdG91Z2huZXNzLGdqRGF0YS5oZXJvX2RhdGEuaW5zaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1h1YW5ZdW46e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMueHVhbnl1bl9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW86eyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6a2F5oOR5a+5Qk9TU+aXoOaViFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/otbDlkJHoi7Hpm4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWVpbW89R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvKEhlcm9fVHlwZS5NZWlNbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1tUG9zPW1laW1vLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0UG9zPW1tUG9zLnN1Yih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhZGlhbj1NYXRoLmF0YW4yKG9mZnNldFBvcy55LG9mZnNldFBvcy54KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIocmFkaWFuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZm6IqC54K55ZKM54m55pWIICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICAgICAgICAgIGlmKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPT1HYW1lRWZmZWN0SWQuTnVsbCl7XHJcbiAgICAgICAgICAgICAgICBub2RlPW5ldyBjYy5Ob2RlKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLmp1amlfcG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQsdGhpcy5qdWppX3Bvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT10aGlzLmdldFNoZVNob3VBdHRhY2tTY2FsZSgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6QnVmZlRpbWVyPW5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmKCFidWZmKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmY9bm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25EZWJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvL2J1ZmbkvKTlrrPop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEuZGFtYWdlX2ppYW5nZV90aW1lPjAmJmdqRGF0YSl7XHJcbiAgICAgICAgICAgICAgICBidWZmLmFkZERhbWFnZUxpc3Rlbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9EYW1hZ2U6KGdqRGF0YTpHb25nSmlEYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlQ29udGludW91c0luanVyZWQoZ2pEYXRhLGJ1ZmYuZ2V0Rmxvb3JOdW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxnakRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsYnVmZik7XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLlZlcnRpZ286e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9dGhpcy5nZXRYdWFueXVuU2NhbGUoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuU2xvd2Rvd246e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSE55CG5LiA5LiL5YeP6YCfYnVmZlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCh0aGlzLmhpZGRlbl9hdHRyaWJ1dGUuc2xvd19yZXNpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuQnVyc3Q6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSE55CGYnVmZueIhuWPkVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJ1ZmZEYXRhLmJ1ZmZfaWQ9PUJ1ZmZJZC5IZXJvX0xlaVNoZW5fQ2hhb0Z1SGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihnakRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkQnVyc3RMaXN0ZW4oYnVmZkRhdGEuYnVmZl92YWx1ZVswXSx0aGlzLm9uQnVmZkJ1cnN0LmJpbmQodGhpcyksZ2pEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Ta2lsbDp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlPTEvdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlKjEuMSxvcGFjaXR5OjI1NX0pLnRvKDAuMSx7c2NhbGU6bm9kZS5zY2FsZSxvcGFjaXR5OjEyOH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW86e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3NfTW9kZV9KaWFuU2hhbmc6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuamlhbnNoYW5nX3JhdGUrPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX052V3VfRXhTa2lsbF9KaWFuR29uZ1N1OntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGJ1ZmY9dGhpcy5tb25zdGVyX2RlYnVmZi5nZXQoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX0NoYW5nTWFvU2hvd19Ta2lsbDp7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU9dGhpcy5tb25zdGVyX2RlYnVmZi5nZXQoYnVmZkRhdGEuYnVmZl9pZCkubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU9MS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGUqMS4xLG9wYWNpdHk6MjU1fSkudG8oMC4xLHtzY2FsZTpub2RlLnNjYWxlLG9wYWNpdHk6MTI4fSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljrvpmaTkuIDkuKpkZWJ1ZmZcclxuICAgICAqIEBwYXJhbSBidWZmIGRlYnVmZuexu+Wei1xyXG4gICAgICogQHBhcmFtIGlzTmVlZFJlY3ljbGUg5piv5ZCm6ZyA6KaB6LCD55So5Zue5pS2XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgc3ViRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY9dGhpcy5tb25zdGVyX2RlYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZihidWZmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc0hhdmVEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2RlYnVmZi5oYXMoYnVmZklkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBCdWZmVGltZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZURlQnVmZlR5cGUoYnVmZlR5cGU6IEJ1ZmZUeXBlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlzSGF2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmZvckVhY2goKGJ1ZmY6QnVmZlRpbWVyKT0+e1xyXG4gICAgICAgICAgICBpZihpc0hhdmU9PWZhbHNlICYmIGJ1ZmYuZ2V0QnVmZlR5cGUoKT09YnVmZlR5cGUpe1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBpc0hhdmU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZUFsbERlQnVmZigpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRlQnVmZih2LmdldEJ1ZmZJZCgpKTtcclxuICAgICAgICB9KSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25EZWJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOkJ1ZmZEYXRhKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTsgIFxyXG4gICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLlZlcnRpZ286e1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWHVhbll1bjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnh1YW55dW5fY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW86eyAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/prYXmg5Hlr7lCT1NT5peg5pWILOW+gOS4i+i1sFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuU2xvd2Rvd246e1xyXG4gICAgICAgICAgICAgICAgLy/lpITnkIbkuIDkuIvlh4/pgJ9idWZmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQodGhpcy5oaWRkZW5fYXR0cmlidXRlLnNsb3dfcmVzaXN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzX01vZGVfSmlhblNoYW5nOntcclxuICAgICAgICAgICAgICAgIHRoaXMuamlhbnNoYW5nX3JhdGUtPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19Odld1X0V4U2tpbGxfSmlhbkdvbmdTdTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKCtidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZCdXJzdChidWZmRGF0YTpCdWZmRGF0YSxnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgaWYoYnVmZkRhdGEuYnVmZl9pZD09QnVmZklkLkhlcm9fTGVpU2hlbl9DaGFvRnVIZSl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9MZWlHb2RTa2lsbDEpO1xyXG4gICAgICAgICAgICAvKirlvZPmlYzkurrouqvkuIrnmoTotoXotJ/ojbfovr7liLA15bGC5pe277yM5Lya5Y+X5Yiw6JC96Zu35pS75Ye76YCg5oiQe+WPguaVsDF95Lyk5a6z5bm25Ye75pmVe+WPguaVsDJ956eSICovXHJcbiAgICAgICAgICAgIGxldCBkYXRhPXRoaXMuYmVGbGFzaEluanVyZWQoZ2pEYXRhKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5pc19kaWU9PWZhbHNlJiZkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgLy9Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX2dyb3VuZCx0aGlzLnNoYWRvdy5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9za3ksdGhpcy5zaGFkb3cuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlWD0wLjg7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlWT0xO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3MmJmRhdGEuaXNfZGllPT1mYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhPW5ldyBCdWZmRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfaWQ9QnVmZklkLkhlcm9fWHVhbll1bjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD1HYW1lRWZmZWN0SWQueHVhbnl1bjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGU9QnVmZlR5cGUuVmVydGlnbztcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5yZW1haW5fdGltZT1nakRhdGEuaGVyb19kYXRhLmdldFNraWxsVmFsdWUyKFNraWxsVHlwZS5QYXNzaXZlXzIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRGVCdWZmKGJ1ZmZEYXRhLGdqRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKuWIt+aWsOenu+mAnyxzbG93UmVzaXN0YW5jZTrlh4/pgJ/mipfmgKcgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaE1vdmVTcGVlZChzbG93UmVzaXN0YW5jZTpudW1iZXIpe1xyXG4gICAgICAgIC8v5a6e6ZmF5YeP6YCfXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bykpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPTMwO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgdmFsdWU9SW5qdXJlZERhdGEuY2FsY1Nsb3dEb3duTnVtKHRoaXMuYmFzZV9kYXRhLlNwZWVkK3RoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZSx0aGlzLmdldE1heFNsb3dEb3duVmFsdWUoKSxzbG93UmVzaXN0YW5jZSx0aGlzLmdldE1heFNwZWVkVXBWYWx1ZSgpKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD12YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLmN1cl9tb3ZlX3NwZWVkPHRoaXMuYmFzZV9kYXRhLlNwZWVkP0NvbG9yVHlwZS5TbG93RG93bjpDb2xvclR5cGUuTnVsbCk7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcylcclxuICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT10aGlzLmN1cl9tb3ZlX3NwZWVkLyh0aGlzLmJhc2VfZGF0YS5TcGVlZCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgLy8gLyoq5Yi35paw5YeP6YCfYnVmZueahOWkhOeQhiAqL1xyXG4gICAgLy8gcHJpdmF0ZSByZWZyZXNoU2xvd2Rvd24oKXtcclxuICAgIC8vICAgICAvL+aJvuWHuuaJgOacieWHj+mAn+exu+Wei+eahGJ1ZmZcclxuICAgIC8vICAgICBsZXQgc2xvd0J1ZmY9bmV3IEFycmF5PEJ1ZmZUaW1lcj4oKTtcclxuICAgIC8vICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmZvckVhY2goKHYsayk9PntcclxuICAgIC8vICAgICAgICAgaWYodi5nZXRCdWZmVHlwZSgpPT1CdWZmVHlwZS5TbG93ZG93bil7XHJcbiAgICAvLyAgICAgICAgICAgICBzbG93QnVmZi5wdXNoKHYpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgaWYoc2xvd0J1ZmYubGVuZ3RoPjApe1xyXG4gICAgLy8gICAgICAgICBzbG93QnVmZi5zb3J0KChhLGIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gYi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLWEuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIGxldCBtYXhCdWZmPXNsb3dCdWZmWzBdO1xyXG4gICAgLy8gICAgICAgICAvL+WunumZheWHj+mAn1xyXG4gICAgLy8gICAgICAgICBsZXQgdmFsdWU9SW5qdXJlZERhdGEuY2FsY1Nsb3dEb3duTnVtKHRoaXMuYmFzZV9kYXRhLlNwZWVkLG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSx0aGlzLmhpZGRlbl9hdHRyaWJ1dGUuc2xvd19yZXNpc3RhbmNlLHRoaXMuZ2V0TWF4U3BlZWRVcFZhbHVlKCkpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXZhbHVlO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5TbG93RG93bik7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dGhpcy5iYXNlX2RhdGEuU3BlZWQ7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLk51bGwpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyAvKirliLfmlrDliqDpgJ9idWZm55qE5aSE55CGICovXHJcbiAgICAvLyBwcml2YXRlIHJlZnJlc2hTcGVlZFVwKCl7XHJcbiAgICAvLyAgICAgLy/mib7lh7rmiYDmnInliqDpgJ/nsbvlnovnmoRidWZmXHJcbiAgICAvLyAgICAgbGV0IHNwZWVkQnVmZj1uZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgLy8gICAgIHRoaXMubW9uc3Rlcl9idWZmLmZvckVhY2goKHYsayk9PntcclxuICAgIC8vICAgICAgICAgaWYodi5nZXRCdWZmVHlwZSgpPT1CdWZmVHlwZS5TcGVlZFVwKXtcclxuICAgIC8vICAgICAgICAgICAgIHNwZWVkQnVmZi5wdXNoKHYpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyAgICAgaWYoc3BlZWRCdWZmLmxlbmd0aD4wKXtcclxuICAgIC8vICAgICAgICAgc3BlZWRCdWZmLnNvcnQoKGEsYik9PntcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgbGV0IG1heEJ1ZmY9c3BlZWRCdWZmWzBdO1xyXG4gICAgLy8gICAgICAgICAvL+WunumZheWKoOmAn+mAn1xyXG4gICAgLy8gICAgICAgICBsZXQgb2Zmc2V0VmFsdWU9dGhpcy5iYXNlX2RhdGEuU3BlZWQqbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgLy8gICAgICAgICAvL2xldCB2YWx1ZT1Jbmp1cmVkRGF0YS5jYWxjU2xvd0Rvd25OdW0oLG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSx0aGlzLmhpZGRlbl9hdHRyaWJ1dGUuc2xvd19yZXNpc3RhbmNlKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmN1cl9tb3ZlX3NwZWVkK29mZnNldFZhbHVlO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICAvKirliqDlh4/pgJ/pnIDopoHlpITnkIbvvIzliKTmlq3lh4/pgJ8gKi9cclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmJhc2VfZGF0YS5TcGVlZDtcclxuICAgIC8vICAgICB9ICAgICAgICBcclxuICAgIC8vIH1cclxuXHJcbiAgICAvKirojrflvpfmnIDlpKflgLznmoTlh4/pgJ/mr5TnjocgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF4U2xvd0Rvd25WYWx1ZSgpOm51bWJlcntcclxuICAgICAgICAvL+aJvuWHuuaJgOacieWKoOmAn+exu+Wei+eahGJ1ZmZcclxuICAgICAgICBsZXQgYnVmZj1uZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNsb3dkb3duKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmYucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBidWZmLnNvcnQoKGEsYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG1heEJ1ZmY9YnVmZlswXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5pyA5aSn5YC855qE5Yqg6YCf5q+U546HICovXHJcbiAgICBwcml2YXRlIGdldE1heFNwZWVkVXBWYWx1ZSgpOm51bWJlcntcclxuICAgICAgICAvL+aJvuWHuuaJgOacieWKoOmAn+exu+Wei+eahGJ1ZmZcclxuICAgICAgICBsZXQgc3BlZWRCdWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLk1vdmVTcGVlZFVwKXtcclxuICAgICAgICAgICAgICAgIHNwZWVkQnVmZi5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoc3BlZWRCdWZmLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgc3BlZWRCdWZmLnNvcnQoKGEsYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG1heEJ1ZmY9c3BlZWRCdWZmWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKirorr7nva7mlLvpgJ/vvIzmr4/np5LmlLvlh7vmrKHmlbAgKi9cclxuICAgIHByaXZhdGUgc2V0QXR0YWNrU3BlZWQobnVtU2VjOm51bWJlcil7XHJcbiAgICAgICAgaWYobnVtU2VjPjEwKXtcclxuICAgICAgICAgICAgbnVtU2VjPTEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihudW1TZWM8MC4xKXtcclxuICAgICAgICAgICAgbnVtU2VjPTAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdHRfamlhbmdlPTEvbnVtU2VjO1xyXG4gICAgfVxyXG4gICAgLyoq5pS55Y+Y5b2T5YmN5pS76YCfLHJhdGU65q+U546HICovXHJcbiAgICBwcm90ZWN0ZWQgY2hhbmdlQXR0YWNrU3BlZWQocmF0ZTpudW1iZXIpe1xyXG4gICAgICAgIGxldCBnanNkPXRoaXMuZ2V0QXR0YWNrU3BlZWQoKTsgICAgICAgIFxyXG4gICAgICAgIGdqc2QrPShyYXRlKSoodGhpcy5iYXNlX2RhdGEuQXR0YWNrU3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc2V0QXR0YWNrU3BlZWQoZ2pzZCk7XHJcbiAgICB9XHJcbiAgICAvKirojrflvpflvZPliY3mlLvpgJ8gKi9cclxuICAgIHByb3RlY3RlZCBnZXRBdHRhY2tTcGVlZCgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gMS90aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6h566X6YeN5Lyk77yM5Y+W5pyA5aSnICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0TWF4U2VyaW91c2x5KCk6bnVtYmVye1xyXG4gICAgICAgIC8v5om+5Ye65omA5pyJ6YeN5Lyk57G75Z6L55qEYnVmZlxyXG4gICAgICAgIGxldCBzZXJpb3VzbHlCdWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuZ2V0QnVmZlR5cGUoKT09QnVmZlR5cGUuU2VyaW91c2x5SW5qdXJlZCl7XHJcbiAgICAgICAgICAgICAgICBzZXJpb3VzbHlCdWZmLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihzZXJpb3VzbHlCdWZmLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgc2VyaW91c2x5QnVmZi5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLWEuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBtYXhCdWZmPXNlcmlvdXNseUJ1ZmZbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuWFieeOry3lvIDlp4sqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgIGFkZEhhbG8oaGFsb0RhdGE6SGFsb0RhdGEpe1xyXG4gICAgICAgIGlmKCF0aGlzLm1vbnN0ZXJfaGFsby5oYXMoaGFsb0RhdGEuaGFsb19pZCkpe1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfaGFsby5zZXQoaGFsb0RhdGEuaGFsb19pZCxoYWxvRGF0YSk7XHJcbiAgICAgICAgICAgIHN3aXRjaChoYWxvRGF0YS5oYWxvX2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXIzMF9CaWFuRnVfU2tpbGxfSGFsbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9taXNzX3JhdGUrPWhhbG9EYXRhLmhhbG9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyNjlfTml1U2FNYW5fU2tpbGxfSGFsbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlKz1oYWxvRGF0YS5oYWxvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3Rlcjc2X0ppYW5EdVpoZV9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21vdmVfc3BlZWRfdmFsdWUrPXRoaXMuYmFzZV9kYXRhLlNwZWVkKihoYWxvRGF0YS5oYWxvX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXRIYWxvKGhhbG9JZDpIYWxvSWQpOkhhbG9EYXRhe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfaGFsby5nZXQoaGFsb0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVIYWxvKGhhbG9JZDpIYWxvSWQpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9oYWxvLmhhcyhoYWxvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHN1YkhhbG8oaGFsb0lkOkhhbG9JZCx1dWlkOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGhhbG9EYXRhPXRoaXMubW9uc3Rlcl9oYWxvLmdldChoYWxvSWQpO1xyXG4gICAgICAgIGlmKGhhbG9EYXRhKXtcclxuICAgICAgICAgICAgLy/lj6rmnInlkIzmupDmiY3lj6/ku6Xnp7vpmaRcclxuICAgICAgICAgICAgaWYoaGFsb0RhdGEuaGFsb19zb3VyY2VfdXVpZD09dXVpZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfaGFsby5kZWxldGUoaGFsb0lkKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaChoYWxvSWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXIzMF9CaWFuRnVfU2tpbGxfSGFsbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbWlzc19yYXRlLT1oYWxvRGF0YS5oYWxvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmV4X21pc3NfcmF0ZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbWlzc19yYXRlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3RlcjY5X05pdVNhTWFuX1NraWxsX0hhbG86e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X2RlZmVuc2VfdmFsdWUtPWhhbG9EYXRhLmhhbG9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZXhfZGVmZW5zZV92YWx1ZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfZGVmZW5zZV92YWx1ZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXI3Nl9KaWFuRHVaaGVfU2tpbGxfSGFsbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZS09dGhpcy5iYXNlX2RhdGEuU3BlZWQqKGhhbG9EYXRhLmhhbG9fdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmV4X21vdmVfc3BlZWRfdmFsdWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21vdmVfc3BlZWRfdmFsdWU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsSGFsbygpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9oYWxvLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5YWJ546vLee7k+adnyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG5cclxuICAgIGdldEhpZGRlbkF0dHJpYnV0ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZGRlbl9hdHRyaWJ1dGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNEaWUoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9zdGF0ZT09RW5lbXlfU3RhdGUuZGllO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZW15U3RhdGUoKTpFbmVteV9TdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RW5lbXlQcmV2U3RhdGUoKTpFbmVteV9TdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZXZfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNDYW5DaGVjaygpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgaXNDYW49dHJ1ZTtcclxuICAgICAgICBpZih0aGlzLmdldElzRGllKCkgfHwgdGhpcy5ub2RlLnk+PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfY3JlYXRlX3kgIHx8IHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5ib3JuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNDYW49ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0NhbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3VnaG5lc3MoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX3RvdWdobmVzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJBdHQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2F0dDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihjb2xvclR5cGU6Q29sb3JUeXBlKXtcclxuICAgICAgICBsZXQgY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlNsb3dkb3duKSl7XHJcbiAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDgyLDI1NSwyNTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2goY29sb3JUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBDb2xvclR5cGUuSW5qdXJlZDp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyQ29sb3I9dGhpcy5jdXJfY29sb3I7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJDb2xvciE9Q29sb3JUeXBlLkluanVyZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qdXJlZF9hY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uLnN0b3AoKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbj1jYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuMSx7Y29sb3I6dGhpcy5ub2RlLmNvbG9yfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbG9yKGN1ckNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb2xvclR5cGUuU2xvd0Rvd246e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoODIsMjU1LDI1Mik7XHJcbiAgICAgICAgICAgIH1icmVhazsgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9jb2xvcj1jb2xvclR5cGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNvbG9yPWNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1ckNvbG9yKCk6Q29sb3JUeXBle1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG93RG93bkNvbG9yKCk6Y2MuQ29sb3J7XHJcbiAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDgyLDI1NSwyNTIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dERhdGEoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQnVsbGV0OmJvb2xlYW4sc2tpbGxSYXRlOm51bWJlcj0wKTpNb25zdGVyQXR0RGF0YXtcclxuICAgICAgICBsZXQgbWQ9bmV3IE1vbnN0ZXJBdHREYXRhKCk7XHJcbiAgICAgICAgbWQuZGFtYWdlX3R5cGU9ZGFtYWdlVHlwZTtcclxuICAgICAgICBtZC5pc19idWxsZXQ9aXNCdWxsZXQ7XHJcbiAgICAgICAgbWQuc2tpbGxfcmF0ZT1za2lsbFJhdGU7XHJcbiAgICAgICAgbWQubW9uc3Rlcl9hdHRyaWJ1dGU9dGhpcy5tb25zdGVyX2RhdGE7XHJcbiAgICAgICAgbWQuemVuZ3NoYW5nX3JhdGU9dGhpcy56ZW5nc2hhbmdfcmF0ZTtcclxuICAgICAgICBtZC5tb25zdGVyX3RzPXRoaXM7XHJcbiAgICAgICAgbWQuc3RyZW5ndGhfdHlwZT10aGlzLmdldFN0cmVuZ3RoVHlwZSgpO1xyXG4gICAgICAgIHJldHVybiBtZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0Z1bGxIcCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfaHA+PXRoaXMubWF4X2hwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuZW15U3RhdGUodHlwZTpFbmVteV9TdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZih0eXBlIT10aGlzLm1vbnN0ZXJfc3RhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLnByZXZfc3RhdGU9dGhpcy5tb25zdGVyX3N0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfc3RhdGU9dHlwZTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodHlwZT09RW5lbXlfU3RhdGUuYXR0fHx0eXBlPT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPSgxL3RoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkKS90aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGU9PUVuZW15X1N0YXRlLm1vdmUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT10aGlzLmN1cl9tb3ZlX3NwZWVkLyh0aGlzLmJhc2VfZGF0YS5TcGVlZCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGVhdGgoKXtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuZGllKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD1mYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9jb3VudD10aGlzLmlzX2NvdW50O1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkud2lsbERlc3Ryb3lNb25zdGVyKHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMuZGVhdGhfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmRlYXRoX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SHVydCgpe1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLkluanVyZWQpOyAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhbWFnZSDkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBkYW1hZ2VUeXBlIOS8pOWus+exu+Wei1xyXG4gICAgICovXHJcbiAgICBpbmp1cmVXYWxsKGRhdGE6TW9uc3RlckF0dERhdGEpOkluanVyZWREYXRhe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dF93YWxsLmJlSW5qdXJlZChkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuS4gOS4qumqqOmqvOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg6aqo6aq85Yqo55S75ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIGRhdGEg5piv5ZCm55uR5ZCs5YWz6ZSu5bin77yM5YWz6ZSu5bin5pWw5o2u5YyF5ZCr5YWz6ZSu5bin5ZCN56ew77yM55uR5ZCs5Yiw5YWz6ZSu5bin5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZW5kQ2FsbGJhY2sg5pKt5pS+57uT5p2f5ZCO55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHBsYXlTcGluQW5pbWF0b24obmFtZTpzdHJpbmcsaXNMb29wOmJvb2xlYW49ZmFsc2UsZGF0YT86S2V5RnJhbWVEYXRhLGVuZENhbGxiYWNrPzpGdW5jdGlvbil7XHJcbiAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCk9PUVuZW15X1N0YXRlLmRpZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFuaW1hPXRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsbmFtZSxpc0xvb3ApO1xyXG4gICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltYSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmRhdGEubmFtZT09ZGF0YS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVuZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBhbmltYS5saXN0ZW5lcj1udWxsO1xyXG4gICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheURlYWRBbmltYXRvbihuYW1lOnN0cmluZyxlbmRDYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgbGV0IGFuaW1hPXRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsbmFtZSxmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgIGFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKuiuvue9rljlnZDmoIfvvIzov5Tlm57lgY/lt6bov5jmmK/lgY/lj7PkuoYsLTE65YGP5bem77yMMO+8muato+W4uO+8jDHvvJrlgY/lj7MgKi9cclxuICAgIHNldFgoZGlzWDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgbGVmdFJpZ2h0PTA7XHJcbiAgICAgICAgaWYoZGlzWD4zMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNYPTMwMDtcclxuICAgICAgICAgICAgbGVmdFJpZ2h0PTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpc1g8LTMwMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc1g9LTMwMDtcclxuICAgICAgICAgICAgbGVmdFJpZ2h0PS0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUueD1kaXNYO1xyXG4gICAgICAgIHJldHVybiBsZWZ0UmlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WShkaXNZOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9ZGlzWTtcclxuICAgICAgICAvL+S4jeiDveepv+i/h+WfjuWimVxyXG4gICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgICAgIC8v5qOA5p+l5Z+O5aKZXHJcbiAgICAgICAgICAgIGxldCByZWN0PXdhbGwuZ2V0V2FsbFJlY3QoKTtcclxuICAgICAgICAgICAgaWYocmVjdC5jb250YWlucyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+d2FsbC5ub2RlLnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55PXJlY3QueU1heDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55PHdhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueT1yZWN0LnlNaW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHNldFBvcyhwb3M6Y2MuVmVjMil7XHJcbiAgICAgICAgdGhpcy5zZXRYKHBvcy54KTtcclxuICAgICAgICB0aGlzLnNldFkocG9zLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vdmVEaXIoZGlyOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1kaXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UWlhbllpbk1pbihudW06bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLm1pbl9xaWFueWluPT0wKVxyXG4gICAgICAgIHRoaXMubWluX3FpYW55aW49bnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFFpYW5ZaW5NaW4oKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWluX3FpYW55aW47XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7nv7vovawgKi9cclxuICAgIHNldEZsaXAoaXNSaWdodDpib29sZWFuKXtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYPWlzUmlnaHQ/dGhpcy5zZXR1cF9zY2FsZTotdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmhwX3Byb2dyZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ocF9wcm9ncmVzcy5zZXRQb3ModGhpcy5ub2RlLngrdGhpcy5ocF9wb3MueCp0aGlzLm5vZGUuc2NhbGVYLHRoaXMubm9kZS55K3RoaXMuaHBfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24oY2MudjIodGhpcy5ub2RlLngrdGhpcy5ub2RlLnNjYWxlWCp0aGlzLnNoYWRvd19wb3MueCx0aGlzLm5vZGUueSt0aGlzLm5vZGUuc2NhbGVZKnRoaXMuc2hhZG93X3Bvcy55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXg9KE1hdGgucm91bmQoODAwMC10aGlzLm5vZGUueSoxMCkpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpIT1FbmVteV9TdGF0ZS5ib3JuJiZ0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5vZGUueT49R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9jcmVhdGVfeSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vVEVTVFxyXG4gICAgICAgIC8vIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5tb3ZlKXtcclxuICAgICAgICAvLyAgICAgbGV0IGFsbE1vbnN0ZXI9TW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgIC8vICAgICBsZXQgbGVuPWFsbE1vbnN0ZXIubGVuZ3RoO1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTxsZW47IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbW9uc3Rlcj1hbGxNb25zdGVyW2ldLmdldENvbXBvbmVudChNb25zdGVyKTtcclxuICAgICAgICAvLyAgICAgICAgIGlmKG1vbnN0ZXImJm1vbnN0ZXIudXVpZCE9dGhpcy51dWlkKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvL+WIpOaWrei3neemu1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBvdGhlclBvcz1tb25zdGVyLmdldENlbnRlclBvcygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBzZWxmUG9zPXRoaXMuZ2V0Q2VudGVyUG9zKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGRpc3RhbmNlPShvdGhlclBvcy5zdWIoc2VsZlBvcykubWFnKCkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmKGRpc3RhbmNlPD01MCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8v5Lqk6ZuG5LqGXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8v5LiK6Z2i55qE6LWw5YiH57q/77yM5LiL6Z2i55qE5Z6C55u06LWw5LiLXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHNlbGZQb3MueT5vdGhlclBvcy55KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdEaXI9dGhpcy5tb3ZlX2RpcmVjdGlvbitNYXRoLlBJLzI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZiggbmV3RGlyIDw9TWF0aC5QSSAmJiBuZXdEaXI+PTApe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0Rpcj10aGlzLm1vdmVfZGlyZWN0aW9uLU1hdGguUEkvMlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1uZXdEaXI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1lbHNlIGlmKHNlbGZQb3MueTxvdGhlclBvcy55KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyBlbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPU1hdGguUEkqMy8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLea3u+WKoOWbnuiwg+ebkeWQrC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgYWRkSW5pdExpc3RlbihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5pbml0X2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgYWRkQ2hhbmdlSHBMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuY2hhbmdlX2hwX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgYWRkWHVhbll1bkxpc3RlbihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgYWRkRGVhdGhDYWxsYmFjayhjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5kZWF0aF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH0gICAgXHJcbiAgICBhZGRJbmp1cnlDYWxsYmFjayhjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVfaW5qdXJ5X2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6I635b6X5q+P56eN5oCq54mp5LiN5ZCM55qE5pWw5o2uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbiAgICBwcml2YXRlIGxvYWRJbml0UG9zKClcclxuICAgIHtcclxuICAgICAgICAvL+iOt+WPluWujOaVsOaNruWwseWIoOmZpOS6hlxyXG4gICAgICAgIGxldCBqdWppPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnanVqaScpO1xyXG4gICAgICAgIHRoaXMuanVqaV9wb3M9anVqaS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBnb25namk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdnb25namknKTtcclxuICAgICAgICB0aGlzLmF0dF9wb3M9Z29uZ2ppLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IGhwPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaHAnKTtcclxuICAgICAgICB0aGlzLmhwX3Bvcz1ocC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBzaGFkb3dOb2RlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnTW9uc3Rlcl9TaGFkb3cnKTtcclxuICAgICAgICB0aGlzLnNoYWRvd19wb3M9c2hhZG93Tm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2hhZG93X3NpemU9c2hhZG93Tm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIGxldCBjZW50ZXI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjZW50ZXInKTtcclxuICAgICAgICB0aGlzLmNlbnRlcl9wb3M9Y2VudGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgLy9jYy5sb2codGhpcy5zaGFkb3dfc2l6ZSk7XHJcblxyXG4gICAgICAgIGp1amkucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGdvbmdqaS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgaHAucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHNoYWRvd05vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGNlbnRlci5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgaWYodGhpcy5zaGFkb3cpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCt0aGlzLm5vZGUuc2NhbGVYKnRoaXMuc2hhZG93X3Bvcy54LHRoaXMubm9kZS55K3RoaXMubm9kZS5zY2FsZVkqdGhpcy5zaGFkb3dfcG9zLnkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXR0UG9zKCk6Y2MuVmVjMntcclxuICAgICAgICBsZXQgcG9zPWNjLnYyKDAsMTI4KTtcclxuICAgICAgICBzd2l0Y2godGhpcy5tb25zdGVyX3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDIwOiBwb3M9Y2MudjIoMCwxMjgpO2JyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBwb3M9dGhpcy5hdHRfcG9zO2JyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGlzUG9zPXRoaXMubm9kZS5nZXRQb3NpdGlvbigpLmFkZChjYy52Mihwb3MueCp0aGlzLm5vZGUuc2NhbGVYLHBvcy55KnRoaXMubm9kZS5zY2FsZVkpKTtcclxuICAgICAgICByZXR1cm4gZGlzUG9zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEp1SmlQb3MoKTpjYy5WZWMyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54K3RoaXMuanVqaV9wb3MueCp0aGlzLm5vZGUuc2NhbGVYLHRoaXMubm9kZS55K3RoaXMuanVqaV9wb3MueSp0aGlzLm5vZGUuc2NhbGVZKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTaGVTaG91UG9zKCk6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLm5vZGUueCt0aGlzLmp1amlfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmp1amlfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2VudGVyUG9zKCk6Y2MuVmVjMntcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLngrdGhpcy5jZW50ZXJfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmNlbnRlcl9wb3MueSp0aGlzLm5vZGUuc2NhbGVZKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflvpfmlLvlh7vln47lopnnmoRY5Z2Q5qCH77yM5Yqo5L2c5LiN5LiA5qC35a+86Ie05pS75Ye755qEWOWdkOagh+S4jeS4gOiHtCAqL1xyXG4gICAgZ2V0QXR0YWNrV2FsbFgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRfcG9zO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==