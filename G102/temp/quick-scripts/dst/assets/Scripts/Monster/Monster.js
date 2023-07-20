
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
        return this.monster_state == EnemyConfig_1.Enemy_State.die || this.monster_state == EnemyConfig_1.Enemy_State.ship;
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
        var mainWall = WallManager_1.default.getInstance().getMainWall();
        var mainRect = mainWall.getWallRect();
        if (mainRect.contains(this.node.getPosition())) {
            if (this.node.y > mainWall.node.y) {
                this.node.y = mainRect.yMax;
            }
            if (this.node.y < mainWall.node.y) {
                this.node.y = mainRect.yMin;
            }
            this.onCollisionShip();
        }
        if (this.node.y < mainRect.yMin) {
        }
        if (this.node.y <= mainRect.yMin - 200) {
            this.node.y = mainRect.yMin - 200;
            if (this.monster_state != EnemyConfig_1.Enemy_State.ship) {
                MonsterManager_1.default.getInstance().ship_monster_num++;
                this.setEnemyState(EnemyConfig_1.Enemy_State.ship);
                MonsterManager_1.default.getInstance().upShipMonster();
            }
        }
    };
    Monster.prototype.onCollisionShip = function () {
        var md = new MonsterData_1.MonsterAttData();
        md.damage_type = HeroConfig_1.DamageType.Ship;
        md.is_bullet = false;
        md.skill_rate = 0;
        md.monster_attribute = this.monster_data;
        md.zengshang_rate = this.zengshang_rate;
        md.monster_ts = this;
        md.strength_type = this.getStrengthType();
        WallManager_1.default.getInstance().getMainWall().beInjured(md, false, this.getCurHp() * 0.5);
        this.changeHp(-9999999999);
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
    //隐藏阴影
    Monster.prototype.hidShadow = function () {
        this.shadow.opacity = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBMkc7QUFDM0csaURBQTRDO0FBQzVDLGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFFekMsNkNBQXdMO0FBQ3hMLDREQUF3RjtBQUN4RixtREFBOEM7QUFDOUMsMEVBQTZHO0FBQzdHLHVEQUFrRDtBQUNsRCwwQ0FBOEQ7QUFFOUQsMkRBQWlFO0FBQ2pFLHNEQUErRztBQUMvRyxvREFBK0M7QUFDL0Msa0RBQWlEO0FBQ2pELHFEQUFnRDtBQUVoRCwwREFBcUQ7QUFDckQsb0RBQTBEO0FBRTFELG1EQUE4QztBQUl4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyx1QkFBdUI7QUFFdkI7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUFnaURDO1FBOWhEYSxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLFVBQVU7UUFDQSxlQUFTLEdBQWlCLDZCQUFlLENBQUMsS0FBSyxDQUFDO1FBQzFELFVBQVU7UUFDQSxnQkFBVSxHQUFTLEtBQUssQ0FBQztRQUNuQyxVQUFVO1FBQ0EsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDakMsWUFBWTtRQUNGLHFCQUFlLEdBQVEsQ0FBQyxDQUFDO1FBQ25DLFVBQVU7UUFDSCxrQkFBWSxHQUFTLENBQUMsQ0FBQztRQUM5QixzQkFBc0I7UUFDWixrQkFBWSxHQUE4QixJQUFJLENBQUM7UUFDekQsb0JBQW9CO1FBQ1YseUJBQW1CLEdBQThCLElBQUksQ0FBQztRQUNoRSxhQUFhO1FBQ0gsZUFBUyxHQUF1QixJQUFJLENBQUM7UUFDL0MsYUFBYTtRQUNiLHNCQUFnQixHQUFpQixJQUFJLENBQUM7UUFDNUIsb0JBQWMsR0FBUyxDQUFDLENBQUM7UUFDekIscUJBQWUsR0FBVSxJ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aUQzQjtJQUFELGNBQUM7Q0FoaURELEFBZ2lEQyxDQWhpRG9DLEVBQUUsQ0FBQyxTQUFTLEdBZ2lEaEQ7a0JBaGlEb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuZW15X1N0YXRlLCBFbmVteV9CdWZmX1R5cGUsIEVuZW15X0RlQnVmZl9UeXBlLCBFbmVteV9Jbmp1cmVkX1R5cGUgfSBmcm9tIFwiLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IEhwUHJvZ3Jlc3NCYXIgZnJvbSBcIi4vSHBQcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7ICBLZXlGcmFtZURhdGEsIE1vbnN0ZXJGYWNlTmFtZSwgTW9uc3RlclNraW5UeXBlLCBJbmp1cmVkRGF0YSwgRmVlZEJhY2tUeXBlLCAgU3RyZW5ndGhUeXBlLCBIaWRkZW5BdHRyaWJ1dGUsIE1vbnN0ZXJBdHREYXRhLCBNb25zdGVyU2tpbGxEYXRhLCBDb2xvclR5cGUgfSBmcm9tIFwiLi9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckNvbmZpZ3VyZSwgTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJDb25maWd1cmVcIjtcclxuaW1wb3J0IE1vbnN0ZXJNYW5hZ2VyIGZyb20gXCIuL01vbnN0ZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcywgTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc1wiO1xyXG5pbXBvcnQgR3JvdW5kTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9Hcm91bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2RlLCBHYW1lU3RhdGUsIFRleHRfVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi4vTWF6ZS9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCb3NzQ2hhbGxlbmdlTWFuYWdlciB9IGZyb20gXCIuLi9BY3Rpdml0eS9Cb3NzQ2hhbGxlbmdlXCI7XHJcbmltcG9ydCB7IEJ1ZmZJZCwgQnVmZlR5cGUsIERhbWFnZVR5cGUsIEhhbG9EYXRhLCBIYWxvSWQsIEhlcm9fVHlwZSwgU2tpbGxUeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBCdWZmVGltZXIgZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmVGltZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBTa2lsbE1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvU2tpbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEpzb25Nb25zdGVyQXR0cmlidXRlIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyQXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgTW9uc3RlclNraWxsTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvTW9uc3RlclNraWxsXCI7XHJcbmltcG9ydCBXYWxsIGZyb20gXCIuLi9XYWxsL1dhbGxcIjtcclxuaW1wb3J0IFdhbGxNYW5hZ2VyIGZyb20gXCIuLi9XYWxsL1dhbGxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4uL1dhbGwvV2FsbENvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vKirmgKrnianpgJrnlKjnsbvvvIzlj6rlpITnkIbmlbDmja7vvIzkuI3lpITnkIbooajnjrAgKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBzcGluZTogc3AuU2tlbGV0b249bnVsbDtcclxuICAgIC8qKuearuiCpOexu+WeiyAqL1xyXG4gICAgcHJvdGVjdGVkIHNraW5fdHlwZTpNb25zdGVyU2tpblR5cGU9TW9uc3RlclNraW5UeXBlLlNraW4xO1xyXG4gICAgLyoq5oCq54mpaWQgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2lkOiBudW1iZXI9MTAwMTE7XHJcbiAgICAvKirmgKrniannrYnnuqcgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2xldmVsOm51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mp6KGA6YeP57O75pWwICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9ocF9yYXRlOm51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mp56eN57G7ICovXHJcbiAgICBwdWJsaWMgbW9uc3Rlcl90eXBlOiBudW1iZXI9MTtcclxuICAgIC8qKuaAqueJqeeahOacgOe7iOaImOaWl+S9v+eUqOeahOaVsOWAvCzlj6/mm7TmlLkgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2RhdGE6IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcz1udWxsO1xyXG4gICAgLyoq5oCq54mp55qE5Z+656GA5oiY5paX5pWw5YC877yM5LiN5Y+v5pu05pS5ICovXHJcbiAgICBwcm90ZWN0ZWQgYmFzZV9hdHRyaWJ1dGVfZGF0YTogSnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzPW51bGw7XHJcbiAgICAvKirmgKrniannmoTln7rnoYDmlbDlgLwgKi9cclxuICAgIHByb3RlY3RlZCBiYXNlX2RhdGE6IEpzb25Nb25zdGVyQ29uZmlndXJlPW51bGw7XHJcbiAgICAvKirmgKrniannmoTpmpDol4/lsZ7mgKcgKi9cclxuICAgIGhpZGRlbl9hdHRyaWJ1dGU6SGlkZGVuQXR0cmlidXRlPW51bGw7XHJcbiAgICBwcm90ZWN0ZWQgY3VyX21vdmVfc3BlZWQ6IG51bWJlcj0wO1xyXG4gICAgcHJvdGVjdGVkIG1vdmVfdGFyZ2V0X3BvczogY2MuVmVjMj1udWxsO1xyXG4gICAgcHJvdGVjdGVkIG1vdmVfZGlyZWN0aW9uOm51bWJlcj1NYXRoLlBJKjMvMjtcclxuICAgIC8qKuacneWQkeWQjeensCAqL1xyXG4gICAgcHJvdGVjdGVkIGZhY2VfdHlwZTpNb25zdGVyRmFjZU5hbWU9TW9uc3RlckZhY2VOYW1lLkZyb250O1xyXG4gICAgLyoq5b2T5YmN55qE6KGA6YePICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX2hwOiBudW1iZXI9MDtcclxuICAgIC8qKuacgOWkp+eahOihgOmHjyAqL1xyXG4gICAgcHJvdGVjdGVkIG1heF9ocDogbnVtYmVyPTA7XHJcbiAgICAvKirooYDmnaHov5vluqbmnaEgKi9cclxuICAgIHByb3RlY3RlZCBocF9wcm9ncmVzczogSHBQcm9ncmVzc0Jhcj1udWxsOyAgICBcclxuICAgIC8qKumYtOW9sSAqL1xyXG4gICAgcHJvdGVjdGVkIHNoYWRvdzogY2MuTm9kZT1udWxsO1xyXG4gICAgc2hhZG93X3BvczogY2MuVmVjMj1udWxsO1xyXG4gICAgc2hhZG93X3NpemU6IGNjLlNpemU9bnVsbDtcclxuICAgIC8qKuWHj+S8pOeOhyAqL1xyXG4gICAgamlhbnNoYW5nX3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirlop7kvKTnjocgKi9cclxuICAgIHplbmdzaGFuZ19yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5pS75Ye76Ze06ZqU77yI56eS77yM6KGo56S65aSa5bCR56eS5pS75Ye75LiA5qyh77yJICovXHJcbiAgICBwcm90ZWN0ZWQgYXR0X2ppYW5nZTogbnVtYmVyPTE7XHJcbiAgICAvKirmlLvlh7vorqHml7YgKi9cclxuICAgIHByb3RlY3RlZCBhdHRfamlzaHU6IG51bWJlcj0wO1xyXG4gICAgLyoq5oqA6IO96K6h5pe2ICovXHJcbiAgICBwcm90ZWN0ZWQgc2tpbGxfamlzaHU6IG51bWJlcj0wO1xyXG4gICAgLyoq5b2T5YmN55qE5pS75Ye75YqbICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX2F0dDogbnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3nmoTpn6fmgKcgKi9cclxuICAgIHByb3RlY3RlZCBjdXJfdG91Z2huZXNzOm51bWJlcj0wO1xyXG4gICAgLyoq5pS75Ye755uu5qCHLOaUu+WHu+ebruagh+S4um51bGzml7bvvIznm67moIflsLHmmK/ln47lopkgKi9cclxuICAgIHByb3RlY3RlZCBhdHRfdGFyZ2V0OmNjLk5vZGU9bnVsbDsgICAgXHJcbiAgICAvKirmgKrnianlvZPliY3nmoTnirbmgIEgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX3N0YXRlOiBFbmVteV9TdGF0ZT1FbmVteV9TdGF0ZS5zdGFuZGJ5O1xyXG4gICAgLyoq5oCq54mp5LiK5LiA5Liq54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgcHJldl9zdGF0ZTogRW5lbXlfU3RhdGU9RW5lbXlfU3RhdGUuc3RhbmRieTtcclxuICAgIC8qKuaAqueJqeW9k+WJjeaLpeacieeahGJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2J1ZmY6IE1hcDxCdWZmSWQsQnVmZlRpbWVyPj1udWxsO1xyXG4gICAgLyoq5oCq54mp5b2T5YmN5oul5pyJ55qEZGVidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9kZWJ1ZmY6IE1hcDxCdWZmSWQsQnVmZlRpbWVyPj1udWxsO1xyXG4gICAgLyoq5oyH5a6a55qE57yp5pS+5YC8Ki9cclxuICAgIHByb3RlY3RlZCBzZXR1cF9zY2FsZTpudW1iZXI9MC40O1xyXG4gICAgcHJvdGVjdGVkIGlzX2Jvc3M6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHB1YmxpYyBpc19jYW5fY291bnQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgcHJvdGVjdGVkIGlzX2NvdW50OmJvb2xlYW49dHJ1ZTtcclxuICAgIC8qKuWfjuWimeeahFnovbTlnZDmoIcgKi9cclxuICAgIHByb3RlY3RlZCB3YWxsX3l5Om51bWJlcj0wO1xyXG4gICAgcHJvdGVjdGVkIGF0dF9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLyoq5YiG5pWwICovXHJcbiAgICBwdWJsaWMgc2NvcmU6bnVtYmVyPTA7XHJcbiAgICAvKirni5nlh7vnnoTlh4bnmoTkvY3nva4gKi9cclxuICAgIHByb3RlY3RlZCBqdWppX3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcbiAgICAvKirooYDmnaHnmoTkvY3nva4gKi9cclxuICAgIHByb3RlY3RlZCBocF9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLyoq5Lit5b+D5L2N572u77yM55So5LqO6IyD5Zu05qOA5rWLICovXHJcbiAgICBwcm90ZWN0ZWQgY2VudGVyX3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcbiAgICAvL+WPl+S8pOWKqOS9nFxyXG4gICAgcHJvdGVjdGVkIGluanVyZWRfYWN0aW9uOmNjLlR3ZWVuPW51bGw7XHJcblxyXG4gICAgLyoq5Yid5aeL5YyW5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGluaXRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuaAqueJqeihgOmHj+WPkeeUn+WPmOWMluaXtueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VfaHBfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuecqeaZleWbnuiwg++8jOeUqOS6jmJvc3Pmlr3ms5XooqvkuK3mlq0gKi9cclxuICAgIHByaXZhdGUgeHVhbnl1bl9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5q275Lqh5Zue6LCD77yM5oCq54mp5q275Lqh5pe26Kem5Y+R77yM55So5LqO5pKt5pS+6Ieq6Lqr5a+55bqU55qE5q275Lqh5Yqo55S7ICovXHJcbiAgICBwcml2YXRlIGRlYXRoX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirooqvkuLvliqjmioDog73lj5fkvKTml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgYWN0aXZlX2luanVyeV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq56e75Yqo5Yiw55uu5qCH5Zyw54K55Zue6LCDICovXHJcbiAgICBwcm90ZWN0ZWQgbW92ZV9lbmRfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKmRlYnVmZuWinuS8pOe7n+iuoSAqLyAgICBcclxuICAgIHByaXZhdGUgaW5qdXJ5X2RhbWFnZV9zdGF0czpNYXA8bnVtYmVyLG51bWJlcj49bnVsbDtcclxuICAgIC8qKuayn+WjkeS8pOWus+iuoeeulyAqL1xyXG4gICAgaXNfY2FuX2d1bGx5OmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirmi6XmnInnmoTlhYnnjq8gKi9cclxuICAgIHByaXZhdGUgbW9uc3Rlcl9oYWxvOk1hcDxIYWxvSWQsSGFsb0RhdGE+PW51bGw7XHJcbiAgICAvKirpop3lpJbnmoTpl6rpgb/njocgKi9cclxuICAgIHByaXZhdGUgZXhfbWlzc19yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq6aKd5aSW55qE6Ziy5b6h5YqbICovXHJcbiAgICBwcml2YXRlIGV4X2RlZmVuc2VfdmFsdWU6bnVtYmVyPTA7XHJcbiAgICAvKirpop3lpJbnmoTnp7vliqjpgJ/luqYgKi9cclxuICAgIHByaXZhdGUgZXhfbW92ZV9zcGVlZF92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mioDog73nmoQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIC8qKuaKgOiDveaVsOaNriAqL1xyXG4gICAgc2tpbGxfZGF0YTpNb25zdGVyU2tpbGxEYXRhPW51bGw7XHJcbiAgICAvKirmiYDmnInmioDog73nmoTlvZPliY3nmoTlhrfljbTml7bpl7QgKi9cclxuICAgIHNraWxsX2NvbGRfZG93bjpudW1iZXJbXT1bXTtcclxuICAgIC8qKuaKgOiDvemYn+WIlyAqL1xyXG4gICAgc2tpbGxfcXVldWU6bnVtYmVyW109W107XHJcbiAgICAvKirlvZPliY3kvb/nlKjnmoTmioDog70sMOS7o+ihqOayoeaciSAqL1xyXG4gICAgY3VyX3NraWxsX2luZGV4Om51bWJlcj0wO1xyXG4gICAgLyoq56Kw5pKe5ZmoICovXHJcbiAgICBjb2xsaWRlcjpjYy5Db2xsaWRlcj1udWxsO1xyXG4gICAgLyoq6KaB5pS75Ye755qE5Z+O5aKZICovXHJcbiAgICBhdHRfd2FsbDpXYWxsPW51bGw7XHJcbiAgICAvKirnibXlvJXmnIDlsI/ot53nprsgKi9cclxuICAgIG1pbl9xaWFueWluOm51bWJlcj0wO1xyXG5cclxuICAgIGN1cl9jb2xvcjpDb2xvclR5cGU9Q29sb3JUeXBlLk51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl9ub3JtYWxfYXR0LDgpO1xyXG4gICAgICAgIC8vIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEVmZmVjdFBvb2xCeUlkKEdhbWVFZmZlY3RJZC5ib3NzMV9hdHRfbW92ZSwyKTtcclxuICAgICAgICAvLyBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQuYm9zczFfYXR0X2VuZCwyKTtcclxuICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFZmZlY3RQb29sQnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl9kaWUsOCk7XHJcbiAgICAgICAgdGhpcy5zcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLmxvYWRJbml0UG9zKCk7XHJcbiAgICAgICAgdGhpcy53YWxsX3l5PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3k7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmY9bmV3IE1hcDxCdWZmSWQsQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmY9bmV3IE1hcDxCdWZmSWQsQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9oYWxvPW5ldyBNYXA8SGFsb0lkLEhhbG9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXI9dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkPXRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChtb25zdGVySWQ6IG51bWJlcixsZXZlbDpudW1iZXIsaHBSYXRlOm51bWJlcixpc0NhbkNvdW50OmJvb2xlYW49dHJ1ZSkge1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9pZD1tb25zdGVySWQ7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2xldmVsPWxldmVsO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9ocF9yYXRlPWhwUmF0ZTtcclxuICAgICAgICBsZXQganNvbkRhdGE9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZShtb25zdGVySWQpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl90eXBlPWpzb25EYXRhLk1vbnN0ZXJDbGFzcztcclxuICAgICAgICBsZXQgYXR0cmlidXRlSWQ9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldElkKHRoaXMubW9uc3Rlcl9pZCxsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyhhdHRyaWJ1dGVJZCk7ICAgICAgXHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ3VsbHk9dHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9jb3VudD1pc0NhbkNvdW50O1xyXG4gICAgICAgIHRoaXMuaXNfY291bnQ9dGhpcy5pc19jYW5fY291bnQ7XHJcbiAgICAgICAgdGhpcy5leF9taXNzX3JhdGU9MDtcclxuICAgICAgICB0aGlzLmV4X2RlZmVuc2VfdmFsdWU9MDtcclxuICAgICAgICAvL3RoaXMuaW5pdE91dHdhcmQoanNvbkRhdGEuU2tpbik7ICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXREYXRhKGpzb25EYXRhKTtcclxuICAgICAgICB0aGlzLmFkZEhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5OdWxsKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIHRoaXMubWluX3FpYW55aW49MDtcclxuICAgICAgICBpZih0aGlzLmluaXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmluaXRfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnNwaW5lLnBhdXNlZD1mYWxzZTtcclxuICAgICAgICAvL3RoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzIrTWF0aC5yYW5kb20oKSooTWF0aC5QSS82KS0oTWF0aC5QSS8xMik7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0U3VtbW9uKG1vbnN0ZXJJZDogbnVtYmVyLGJvc3NBdHRyaWJ1dGU6SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfaWQ9bW9uc3RlcklkO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1vbnN0ZXJJZCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX3R5cGU9anNvbkRhdGEuTW9uc3RlckNsYXNzO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2d1bGx5PXRydWU7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19jb3VudD10aGlzLmlzX2Nhbl9jb3VudDtcclxuICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGE9Y2MuaW5zdGFudGlhdGUoYm9zc0F0dHJpYnV0ZSk7XHJcbiAgICAgICAgc3dpdGNoKGpzb25EYXRhLlN0cmVuZ3RoVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5IZWFsdGg9Ym9zc0F0dHJpYnV0ZS5IZWFsdGgvNTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrPWJvc3NBdHRyaWJ1dGUuQXR0YWNrKjAuOTcyNDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlPWJvc3NBdHRyaWJ1dGUuRGVmZW5zZSowLjY7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuTm9ybWFsOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5IZWFsdGg9Ym9zc0F0dHJpYnV0ZS5IZWFsdGgvNTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrPWJvc3NBdHRyaWJ1dGUuQXR0YWNrKjAuOTU5MjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlPTA7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXREYXRhKGpzb25EYXRhKTtcclxuICAgICAgICB0aGlzLmFkZEhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5OdWxsKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIHRoaXMubWluX3FpYW55aW49MDtcclxuICAgICAgICBpZih0aGlzLmluaXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmluaXRfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaERhdGEobGV2ZWw6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfbGV2ZWw9bGV2ZWw7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUodGhpcy5tb25zdGVyX2lkKTsgICAgICAgIFxyXG4gICAgICAgIC8v6YeN572u5pWw5o2uXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUlkPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJZCh0aGlzLm1vbnN0ZXJfaWQsbGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YT1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0cmlidXRlSWQpOyAgXHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RhdGE9Y2MuaW5zdGFudGlhdGUodGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhKTtcclxuICAgICAgICB0aGlzLmJhc2VfZGF0YT1qc29uRGF0YTtcclxuICAgICAgICB0aGlzLmN1cl9ocD10aGlzLm1heF9ocD10aGlzLm1vbnN0ZXJfZGF0YS5IZWFsdGg7XHJcbiAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmJhc2VfZGF0YS5TcGVlZDtcclxuICAgICAgICB0aGlzLmF0dF9qaWFuZ2U9MS90aGlzLmJhc2VfZGF0YS5BdHRhY2tTcGVlZDtcclxuICAgICAgICB0aGlzLmN1cl9hdHQ9dGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuYmFzZV9kYXRhLlNraWxsTnVtPjApe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvYWRNb25zdGVyU2tpbGxEYXRhKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgLyoq5Yid5aeL5YyW5aSW6KeCKi9cclxuICAgIC8vIHByaXZhdGUgaW5pdE91dHdhcmQoc2tpblR5cGU6TW9uc3RlclNraW5UeXBlKXtcclxuICAgIC8vICAgICB0aGlzLnNraW5fdHlwZT1za2luVHlwZTtcclxuICAgIC8vICAgICB0aGlzLnNldFNraW4odGhpcy5nZXRTa2luTmFtZSgpKTtcclxuICAgIC8vICAgICB0aGlzLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuSWRsZSksdHJ1ZSk7XHJcbiAgICAvLyB9XHJcbiAgICAvKirliJ3lp4vljJbmlbDmja4gKi9cclxuICAgIHByaXZhdGUgaW5pdERhdGEoYmFzZURhdGE6SnNvbk1vbnN0ZXJDb25maWd1cmUpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YSk7XHJcbiAgICAgICAgdGhpcy5iYXNlX2RhdGE9YmFzZURhdGE7XHJcbiAgICAgICAgdGhpcy5jdXJfaHA9dGhpcy5tYXhfaHA9dGhpcy5tb25zdGVyX2RhdGEuSGVhbHRoKnRoaXMubW9uc3Rlcl9ocF9yYXRlO1xyXG4gICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dGhpcy5iYXNlX2RhdGEuU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5hdHRfamlhbmdlPTEvdGhpcy5iYXNlX2RhdGEuQXR0YWNrU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5jdXJfYXR0PXRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjaztcclxuICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3M9MDtcclxuICAgICAgICB0aGlzLnNldHVwX3NjYWxlPXRoaXMuYmFzZV9kYXRhLlNjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZT10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2tpbl90eXBlPWJhc2VEYXRhLlNraW47XHJcbiAgICAgICAgdGhpcy5oaWRkZW5fYXR0cmlidXRlPW5ldyBIaWRkZW5BdHRyaWJ1dGUoKTtcclxuICAgICAgICB0aGlzLmluanVyeV9kYW1hZ2Vfc3RhdHM9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGlmKHRoaXMuYmFzZV9kYXRhLlNraWxsTnVtPjApe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb25zdGVyU2tpbGxEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZE1vbnN0ZXJTa2lsbERhdGEoKXtcclxuICAgICAgICBsZXQgc2tpbGxEYXRhPW5ldyBNb25zdGVyU2tpbGxEYXRhKCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLkNvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuSW5pdENvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8xPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8yPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8zPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV80PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuQ2FzdGluZ1JhbmdlPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IHM9MTsgczw9dGhpcy5iYXNlX2RhdGEuU2tpbGxOdW07IHMrKyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpZD1Nb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SWQodGhpcy5tb25zdGVyX2lkLHMsdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLlNraWxsTGV2ZWwpXHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Nb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJTa2lsbChpZCk7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhID09IG51bGwgKSBjb250aW51ZTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfMS5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8yLnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMik7XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzMuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8zKTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuQ29sZERvd24uc2V0KHMsanNvbkRhdGEuQ29sZERvd24pO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuSW5pdENvbGREb3duLnNldChzLGpzb25EYXRhLkluaXRpYWxDb2xkRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3MtMV09anNvbkRhdGEuSW5pdGlhbENvbGREb3duO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuQ2FzdGluZ1JhbmdlLnNldChzLGpzb25EYXRhLkNhc3RpbmdSYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2tpbGxfZGF0YT1za2lsbERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEhwUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmhwX3Byb2dyZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlIT1TdHJlbmd0aFR5cGUuQm9zcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ocF9wcm9ncmVzcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2hwX21hbmFnZXIuY3JlYXRlRW5lbXlIcChjYy52Mih0aGlzLm5vZGUueCt0aGlzLmhwX3Bvcy54KnRoaXMuc2V0dXBfc2NhbGUsdGhpcy5ub2RlLnkrdGhpcy5ocF9wb3MueSp0aGlzLnNldHVwX3NjYWxlKSkuZ2V0Q29tcG9uZW50KEhwUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRTaGFkb3coKXtcclxuICAgICAgICAvL2lmKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSE9U3RyZW5ndGhUeXBlLkJvc3MpXHJcbiAgICAgICAgaWYoIXRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3c9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVNoYWRvdyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5zaGFkb3dfcG9zKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LndpZHRoPXRoaXMubm9kZS5zY2FsZVgqdGhpcy5zaGFkb3dfc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuaGVpZ2h0PXRoaXMubm9kZS5zY2FsZVkqdGhpcy5zaGFkb3dfc2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Lm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5zaGFkb3dfcG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93SHAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaHBfcHJvZ3Jlc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhwX3Byb2dyZXNzLmNoYW5nZVByb2dyZXNzKHRoaXMuY3VyX2hwL3RoaXMubWF4X2hwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNDYW5Db3VudChpc0NhbkNvdW50OmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2NvdW50PWlzQ2FuQ291bnQ7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pc19jYW5fY291bnQ9PWZhbHNlKXtcclxuICAgICAgICAvLyAgICAgY2MubG9nKCdzZXRJc0NhbkNvdW50PT1mYWxzZScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR1cFNjYWxlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNoZVNob3VBdHRhY2tTY2FsZSgpOm51bWJlcntcclxuICAgICAgICBsZXQgc2NhbGU9MC4zO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC41NTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5FbGl0ZTp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjc1O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkJvc3M6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MS4yO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXYWxsQXR0YWNrU2NhbGUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNjYWxlPTE7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLk5vcm1hbDp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjY7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuRWxpdGU6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC45O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYdWFueXVuU2NhbGUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNjYWxlPTAuMztcclxuICAgICAgICBzd2l0Y2godGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuTm9ybWFsOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuNTUvdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5FbGl0ZTp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjc1L3RoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuQm9zczp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0xLjUvdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RyZW5ndGhUeXBlKCk6U3RyZW5ndGhUeXBle1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TW9uc3RlckRhdGEoKTpKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXN7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuoeeul+S8pOWus+aVsOaNriAqL1xyXG4gICAgZ2V0SW5qdXJlZERhdGEoZ2pEYXRhOkdvbmdKaURhdGEpOkluanVyZWREYXRhe1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBJbmp1cmVkRGF0YSgpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuRGllO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IG1pc3NSYXRlPTA7ICAgICAgICBcclxuICAgICAgICBsZXQgY3JpdFJhdGU9MDtcclxuICAgICAgICAvL+WmguaenOaYr+aZrumAmuaUu+WHu++8jOiuoeeul+mXqumBv+WSjOaatOWHu++8jOm7mOiupOS4ujBcclxuICAgICAgICBsZXQgaGVyb0RhdGE9Z2pEYXRhLmhlcm9fZGF0YTtcclxuICAgICAgICAvL+aAqueJqeeahOmYsuW+oeWKm1xyXG4gICAgICAgIGxldCBzZWxmRGVmZW5zZT10aGlzLm1vbnN0ZXJfZGF0YS5EZWZlbnNlK3RoaXMuZXhfZGVmZW5zZV92YWx1ZTtcclxuICAgICAgICBsZXQgZmluYWxEZWZlbnNlPUluanVyZWREYXRhLmNhbGNGaW5hbERlZmVuc2Uoc2VsZkRlZmVuc2UsaGVyb0RhdGEuaWdub3JlX2RlZmVuc2VfcmF0ZSlcclxuICAgICAgICBpZihnakRhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuTm9ybWFsKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVCdWZmKEJ1ZmZJZC5Cb3NzMl9NaWFuWWlfQXR0YWNrKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5NYWluWWk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuV3VEaTtcclxuICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksRW5lbXlfSW5qdXJlZF9UeXBlLld1RGksbnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtaXNzUmF0ZT1Jbmp1cmVkRGF0YS5jYWxjTWlzc1JhdGUodGhpcy5tb25zdGVyX2RhdGEuTWlzcyxnakRhdGEuaGVyb19kYXRhLkhpdCkrdGhpcy5leF9taXNzX3JhdGUtZ2pEYXRhLmhlcm9fZGF0YS5oaXRfZXg7XHJcbiAgICAgICAgICAgIGNyaXRSYXRlPUluanVyZWREYXRhLmNhbGNDcml0UmF0ZShnakRhdGEuaGVyb19kYXRhLkNyaXRpY2FsLHRoaXMubW9uc3Rlcl9kYXRhLkFudGlDcml0aWNhbCk7XHJcbiAgICAgICAgICAgIGNyaXRSYXRlKz1nakRhdGEuaGVyb19kYXRhLmNyaXRfZXg7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5LiA5Liq5qaC546H57G75Z6LXHJcbiAgICAgICAgICAgIGxldCB0eXBlPUluanVyZWREYXRhLmNhbGNPbmNlVHlwZShbbWlzc1JhdGUsY3JpdFJhdGUsMV0pO1xyXG4gICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6Zeq6YG/XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5TaGFuQmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLlNoYW5CaTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLEVuZW15X0luanVyZWRfVHlwZS5TaGFuQmksbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pq05Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGFtYWdlPUluanVyZWREYXRhLmNhbGNOb3JtYWxDcml0RGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjayxmaW5hbERlZmVuc2UsaGVyb0RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlLHRoaXMuamlhbnNoYW5nX3JhdGUsSW5qdXJlZERhdGEuY2FsY0ZpbmFsRXh0cmFDcml0KGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwsdGhpcy5tb25zdGVyX2RhdGEuQW50aUV4dHJhQ3JpdGljYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBpZihnakRhdGEucGV0X2lkPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoZ2pEYXRhLmhlcm9fdHlwZSkub25EYW1hZ2VNb25zdGVyKERhbWFnZVR5cGUuTm9ybWFsLHRydWUsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksZGF0YS50ZXh0X3R5cGUsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgICAgICAvL+aZrumAmuWRveS4rVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTnVsbDsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZmluYWxEZWZlbnNlLGhlcm9EYXRhLmF0dGFja19pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5Ob3JtYWxfQXR0YWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdqRGF0YS5wZXRfaWQ9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChnakRhdGEuaGVyb190eXBlKS5vbkRhbWFnZU1vbnN0ZXIoRGFtYWdlVHlwZS5Ob3JtYWwsZmFsc2UsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZihnakRhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuU2tpbGwpe1xyXG4gICAgICAgICAgICAvL+S4jemcgOimgeiuoeeul+mXqumBv++8jOaKgOiDveW/heS4rVxyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk51bGw7XHJcbiAgICAgICAgICAgIGxldCBkYW1hZ2U9MDtcclxuICAgICAgICAgICAgaWYoZ2pEYXRhLmlzX2Nhbl9jcml0KXtcclxuICAgICAgICAgICAgICAgIGNyaXRSYXRlPUluanVyZWREYXRhLmNhbGNDcml0UmF0ZShnakRhdGEuaGVyb19kYXRhLkNyaXRpY2FsLHRoaXMubW9uc3Rlcl9kYXRhLkFudGlDcml0aWNhbCk7XHJcbiAgICAgICAgICAgICAgICBjcml0UmF0ZSs9Z2pEYXRhLmhlcm9fZGF0YS5jcml0X2V4O1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5bkuIDkuKrmpoLnjofnsbvlnotcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlPUluanVyZWREYXRhLmNhbGNPbmNlVHlwZShbMCxjcml0UmF0ZSwxXSk7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLkJhb0ppO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY1NraWxsQ3JpdERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5za2lsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlLEluanVyZWREYXRhLmNhbGNGaW5hbEV4dHJhQ3JpdChoZXJvRGF0YS5FeHRyYUNyaXRpY2FsLHRoaXMubW9uc3Rlcl9kYXRhLkFudGlFeHRyYUNyaXRpY2FsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksZGF0YS50ZXh0X3R5cGUsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5za2lsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5za2lsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICBpZihnakRhdGEucGV0X2lkPT0wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGdqRGF0YS5oZXJvX3R5cGUpLm9uRGFtYWdlTW9uc3RlcihEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeerOmXtOS8pOWus1xyXG4gICAgICogQHBhcmFtIGdqRGF0YSDmlLvlh7vnsbvlnotcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBiZUZsYXNoSW5qdXJlZChnakRhdGE6R29uZ0ppRGF0YSk6IEluanVyZWREYXRhe1xyXG4gICAgICAgIGxldCBkYXRhPXRoaXMuZ2V0SW5qdXJlZERhdGEoZ2pEYXRhKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYmVEYW1hZ2UoZGF0YSxnakRhdGEpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmVDb250aW51b3VzSW5qdXJlZChnakRhdGE6R29uZ0ppRGF0YSxmbG9vck51bTpudW1iZXI9MSkge1xyXG4gICAgICAgIGlmKGdqRGF0YS5jb250aW51b3VzX2RhbWFnZV9yYXRlPjApe1xyXG4gICAgICAgICAgICAvL+aAqueJqeeahOmYsuW+oeWKm1xyXG4gICAgICAgICAgICBsZXQgc2VsZkRlZmVuc2U9dGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZSt0aGlzLmV4X2RlZmVuc2VfdmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBmaW5hbERlZmVuc2U9SW5qdXJlZERhdGEuY2FsY0ZpbmFsRGVmZW5zZShzZWxmRGVmZW5zZSxnakRhdGEuaGVyb19kYXRhLmlnbm9yZV9kZWZlbnNlX3JhdGUpXHJcbiAgICAgICAgICAgIGxldCBoZXJvRGF0YT1nakRhdGEuaGVyb19kYXRhO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICAgICAgbGV0IGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGdqRGF0YS5jb250aW51b3VzX2RhbWFnZV9yYXRlLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5za2lsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLlpob25nRHU7XHJcbiAgICAgICAgICAgIGlmKGdqRGF0YS5oZXJvX3R5cGU9PUhlcm9fVHlwZS5Odld1KXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1kYW1hZ2UqZmxvb3JOdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5iZURhbWFnZShkYXRhLGdqRGF0YSk7ICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirpgKDmiJDnnJ/lrp7kvKTlrrPvvIznm7TmjqXpgKDmiJDlr7nlupTnmoTkvKTlrrPlgLws5peg5rOV6Zeq6YG/ICovXHJcbiAgICBiZVJlYWxEYW1hZ2UoZ2pEYXRhOkdvbmdKaURhdGEsZGFtYWdlOm51bWJlcik6SW5qdXJlZERhdGF7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEluanVyZWREYXRhKCk7XHJcbiAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICB0aGlzLmJlRGFtYWdlKGRhdGEsZ2pEYXRhKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgLyoq5oGi5aSN55Sf5ZG95YC85piv5ZCm5oiQ5YqfICovXHJcbiAgICBiZUhlYWwobnVtOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZih0aGlzLmdldEN1ckhwKCk+PXRoaXMuZ2V0TWF4SHAoKXx8dGhpcy5nZXRJc0RpZSgpPT10cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKirnm67liY3msqHmnInmsrvnlpfmlYjmnpzliqDmiJDvvIzlj6rmnInph43kvKTvvIzlj6rorqHnrpfph43kvKQgKi9cclxuICAgICAgICBsZXQgbmV3TnVtPW51bSooMS10aGlzLmdldE1heFNlcmlvdXNseSgpKSAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcChuZXdOdW0pO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKHRoaXMuZ2V0Q2VudGVyUG9zKCksbmV3TnVtLEVuZW15X0luanVyZWRfVHlwZS5aaGlMaWFvKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJlRGFtYWdlKGRhdGE6SW5qdXJlZERhdGEsZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCk9PVN0cmVuZ3RoVHlwZS5Cb3NzJiZ0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkJvc3M5X1NraWxsXzNfd2lkdSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk1haW5ZaTtcclxuICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLld1RGk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZVR5cGVUZXh0KGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzYwKSxFbmVteV9Jbmp1cmVkX1R5cGUuV3VEaSxudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgbGV0IGdtPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICBkYXRhLmlzX2RpZT10aGlzLmNoYW5nZUhwKC1kYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgaWYoZ20uaXNfc2hvd190ZXh0JiZkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55K01hdGgucmFuZG9tKCkqMTAwKSxkYXRhLmdldERhbWFnZU51bSgpLGRhdGEudGV4dF90eXBlKTtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFkYXRhLmlzX2RpZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SHVydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5ZC46KGA5pWI5p6cXHJcbiAgICAgICAgICAgIGlmKGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlPjAmJmRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHA9SW5qdXJlZERhdGEuY2FsY0Jsb29kU3Vja2luZyhkYXRhLmdldERhbWFnZU51bSgpLGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlLGdqRGF0YS5oZXJvX2RhdGEuc2VyaW91c19pbmp1cnlfcmF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZihocD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAoaHApO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKuiusOW9leacgOmrmOS8pOWusyAqL1xyXG4gICAgICAgICAgICBnbS5zZXRNYXhEYW1hZ2UoZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgIGdtLnNldE1pbkRhbWFnZShkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgaWYoZ2pEYXRhLnNraWxsX3JlbGVhc2VfaWQ+MCl7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWNvcmREYW1hZ2UoZ2pEYXRhLnNraWxsX3JlbGVhc2VfaWQsZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFjdGl2ZV9pbmp1cnlfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlX2luanVyeV9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKuiusOW9lURQUyAqL1xyXG4gICAgICAgICAgICBzd2l0Y2goZ2pEYXRhLmRhbWFnZV90eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGFtYWdlVHlwZS5Ob3JtYWw6eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uaGVyb19hdHRhY2tfZHBzW2dqRGF0YS5oZXJvX3R5cGVdKz1kYXRhLmdldERhbWFnZU51bSgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYW1hZ2VUeXBlLlNraWxsOnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmhlcm9fc2tpbGxfZHBzW2dqRGF0YS5oZXJvX3R5cGVdKz1kYXRhLmdldERhbWFnZU51bSgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIC8qKuWGsOWls+mineWkluecn+WunuS8pOWusyAqL1xyXG4gICAgICAgICAgICAvLyBpZihTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCaW5nTnZTa2lsbDIoKT4wJiZ0aGlzLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuU2xvd2Rvd24pKXtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBkYW1hZ2U9ZGF0YS5nZXREYW1hZ2VOdW0oKSpTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCaW5nTnZTa2lsbDIoKTtcclxuICAgICAgICAgICAgLy8gICAgIGlmKGRhbWFnZTwxKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYW1hZ2U9MTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2hhbmdlSHAoLWRhbWFnZSk7XHJcbiAgICAgICAgICAgIC8vICAgICBnbS5oZXJvX3NraWxsX2Rwc1tIZXJvX1R5cGUuQmluZ052XSs9ZGFtYWdlO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrMzIpLGRhbWFnZSxFbmVteV9Jbmp1cmVkX1R5cGUuQmluZ052WmhlblNoYW5nKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyAvKirpmL/liqrmr5Tmlq/pop3lpJbnnJ/lrp7kvKTlrrMgKi9cclxuICAgICAgICAgICAgLy8gaWYoU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QU51QmlTaVNraWxsMigpPjApe1xyXG4gICAgICAgICAgICAvLyAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlNsb3dkb3duKXx8dGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGFtYWdlPWRhdGEuZ2V0RGFtYWdlTnVtKCkqU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QU51QmlTaVNraWxsMigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGRhbWFnZTwxKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGFtYWdlPTE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuY2hhbmdlSHAoLWRhbWFnZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZ20uaGVyb19za2lsbF9kcHNbSGVyb19UeXBlLkFOdUJpU2ldKz1kYW1hZ2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzMyKSxkYW1hZ2UsRW5lbXlfSW5qdXJlZF9UeXBlLkFOdUJpU2laaGVuU2hhbmcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYmVpZG9uZ19za2lsbF8yLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvKirlvrfpsoHkvIrpop3lpJbnnJ/lrp7kvKTlrrMgKi9cclxuICAgICAgICAgICAgaWYoU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVMdVlpRXgoKSYmdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fRGVMdVlpX0V4KSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGFtYWdlPWRhdGEuZ2V0RGFtYWdlTnVtKCkqU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVMdVlpRXgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhbWFnZTwxKXtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9MTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAoLWRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICBnbS5oZXJvX3NraWxsX2Rwc1tIZXJvX1R5cGUuRGVMdVlpXSs9ZGFtYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYoZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrMzIpLGRhbWFnZSxFbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKirmm7TmlLlocO+8jOi/lOWbnuaYr+WQpuatu+S6oSAqL1xyXG4gICAgcHJvdGVjdGVkIGNoYW5nZUhwKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpfHx0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUuYm9ybnx8R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzRGllPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwKz1udW07XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfaHA8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2hwPTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNoYW5nZV9ocF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VfaHBfY2FsbGJhY2sobnVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB1c2VMZXZlbD1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFNjb3JlKE1hdGguYWJzKE1hdGgucm91bmQobnVtKSkpO1xyXG4gICAgICAgICAgICAgICAgaWYodXNlTGV2ZWwhPXRoaXMubW9uc3Rlcl9sZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSh1c2VMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGVhdGgoKTtcclxuICAgICAgICAgICAgaXNEaWU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA+dGhpcy5tYXhfaHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9ocD10aGlzLm1heF9ocFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihpc0RpZT09ZmFsc2UmJkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWF6ZSl7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuY3VyX2hwPCh0aGlzLm1heF9ocCowLjEpKXtcclxuICAgICAgICAvLyAgICAgICAgIGlmKE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNIYXZlQUJ1ZmYoWzgwMDNdKSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAoLXRoaXMuY3VyX2hwKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5wZXRfMjFfYWN0aXZlXzNfbGlhbmRhbyxjYy52MigwLDIwMCksdGhpcy5ub2RlLCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wZXRfMjFfYWN0aXZlXzJfbGlhbmRhb19kcm9wX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYodGhpcy5jaGFuZ2VfaHBfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZV9ocF9jYWxsYmFjayhudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHJldHVybiBpc0RpZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRCdWZmKGJ1ZmZEYXRhOiBCdWZmRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyX2J1ZmYuaGFzKGJ1ZmZEYXRhLmJ1ZmZfaWQpPT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZT1udWxsO1xyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD09R2FtZUVmZmVjdElkLk51bGwpe1xyXG4gICAgICAgICAgICAgICAgbm9kZT1uZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24odGhpcy5qdWppX3Bvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLHRoaXMuanVqaV9wb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9dGhpcy5nZXRTaGVTaG91QXR0YWNrU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6QnVmZlRpbWVyPW5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmKCFidWZmKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmY9bm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1Zmbmsrvnlpfop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICBidWZmLmFkZFJlY292ZXJ5TGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb1JlY292ZXJ5OihudW06bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlSGVhbChudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sYnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCxidWZmKTtcclxuICAgICAgICAgICAgLy9idWZm6ZSA5q+B5pe25aSE55CGXHJcbiAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX3R5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5Nb3ZlU3BlZWRVcDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5BdHRTcGVlZFVwOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M5X1NraWxsXzFfZ3VvemFpOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnplbmdzaGFuZ19yYXRlKz1idWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UtPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlKihidWZmRGF0YS5idWZmX3ZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrKz10aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrKihidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/lpoLmnpzmnIlidWZm77yM5YiZ5Yi35paw5pe26Ze0LOmHjeaWsOiuoeaXtlxyXG4gICAgICAgICAgICBsZXQgYnVmZj10aGlzLm1vbnN0ZXJfYnVmZi5nZXQoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3ViQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmPXRoaXMubW9uc3Rlcl9idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmKGJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmRGVzdG9yeShidWZmRGF0YTpCdWZmRGF0YSl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLk1vdmVTcGVlZFVwOntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLkF0dFNwZWVkVXA6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOV9Ta2lsbF8xX2d1b3phaTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnplbmdzaGFuZ19yYXRlLT1idWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZSs9dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UqKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMV0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YS5BdHRhY2stPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2sqKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2J1ZmYuaGFzKGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVmZihidWZmSWQ6IEJ1ZmZJZCk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9idWZmLmdldChidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmZUeXBlKGJ1ZmZUeXBlOiBCdWZmVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpc0hhdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIGlmKGlzSGF2ZT09ZmFsc2UgJiYgYnVmZi5nZXRCdWZmVHlwZSgpPT1idWZmVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGlzSGF2ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxCdWZmKCl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZERlQnVmZihidWZmRGF0YTpCdWZmRGF0YSxnakRhdGE6R29uZ0ppRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoYnVmZkRhdGEuYnVmZl9pZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+aOp+WItuexu+eahGRlYnVmZumcgOimgeagueaNrumfp+aAp+adpeWunueOsOWFt+S9k+eahOaViOaenFxyXG4gICAgICAgICAgICBsZXQgYnVmZlR5cGU9YnVmZkRhdGEuYnVmZl90eXBlOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZlR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5WZXJ0aWdvOntcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl90b3VnaG5lc3M+PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksRW5lbXlfSW5qdXJlZF9UeXBlLk1pYW5ZaUtvbmdaaGksbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNIYXZlQnVmZihCdWZmSWQuQm9zczNfTWlhbllpX0tvbmdaaGkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QnVmZihCdWZmSWQuQm9zczNfTWlhbllpX0tvbmdaaGkpLmFkZEZsb29yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdqRGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPUluanVyZWREYXRhLmNhbGNDb250cm9sVGltZShidWZmRGF0YS5yZW1haW5fdGltZSx0aGlzLmN1cl90b3VnaG5lc3MsZ2pEYXRhLmhlcm9fZGF0YS5pbnNpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWHVhbll1bjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy54dWFueXVuX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bzp7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/prYXmg5Hlr7lCT1NT5peg5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+i1sOWQkeiLsembhFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZWltbz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm8oSGVyb19UeXBlLk1laU1vKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW1Qb3M9bWVpbW8ubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9bW1Qb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaWFuPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihyYWRpYW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOmNjLk5vZGU9bnVsbDtcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9PUdhbWVFZmZlY3RJZC5OdWxsKXtcclxuICAgICAgICAgICAgICAgIG5vZGU9bmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMuanVqaV9wb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCx0aGlzLmp1amlfcG9zLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXRoaXMuZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjpCdWZmVGltZXI9bm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYoIWJ1ZmYpe1xyXG4gICAgICAgICAgICAgICAgYnVmZj1ub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlYnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vYnVmZuS8pOWus+inpuWPkeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5kYW1hZ2VfamlhbmdlX3RpbWU+MCYmZ2pEYXRhKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRGFtYWdlTGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb0RhbWFnZTooZ2pEYXRhOkdvbmdKaURhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVDb250aW51b3VzSW5qdXJlZChnakRhdGEsYnVmZi5nZXRGbG9vck51bSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LGdqRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCxidWZmKTtcclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZUeXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuVmVydGlnbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT10aGlzLmdldFh1YW55dW5TY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5TbG93ZG93bjp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpITnkIbkuIDkuIvlh4/pgJ9idWZmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5CdXJzdDp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpITnkIZidWZm54iG5Y+RXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYnVmZkRhdGEuYnVmZl9pZD09QnVmZklkLkhlcm9fTGVpU2hlbl9DaGFvRnVIZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGdqRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGRCdXJzdExpc3RlbihidWZmRGF0YS5idWZmX3ZhbHVlWzBdLHRoaXMub25CdWZmQnVyc3QuYmluZCh0aGlzKSxnakRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X1NraWxsOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU9MS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGUqMS4xLG9wYWNpdHk6MjU1fSkudG8oMC4xLHtzY2FsZTpub2RlLnNjYWxlLG9wYWNpdHk6MTI4fSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zc19Nb2RlX0ppYW5TaGFuZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaWFuc2hhbmdfcmF0ZSs9YnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTnZXdV9FeFNraWxsX0ppYW5Hb25nU3U6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgYnVmZj10aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICAgICAgYnVmZi5yZWZyZXNoQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X1NraWxsOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT10aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmRGF0YS5idWZmX2lkKS5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZT0xL3RoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZSoxLjEsb3BhY2l0eToyNTV9KS50bygwLjEse3NjYWxlOm5vZGUuc2NhbGUsb3BhY2l0eToxMjh9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOS4gOS4qmRlYnVmZlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgZGVidWZm57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaXNOZWVkUmVjeWNsZSDmmK/lkKbpnIDopoHosIPnlKjlm57mlLZcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBzdWJEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZj10aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmKGJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzSGF2ZURlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfZGVidWZmLmhhcyhidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlRGVCdWZmVHlwZShidWZmVHlwZTogQnVmZlR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNIYXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIGlmKGlzSGF2ZT09ZmFsc2UgJiYgYnVmZi5nZXRCdWZmVHlwZSgpPT1idWZmVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGlzSGF2ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVtb3ZlQWxsRGVCdWZmKCl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3ViRGVCdWZmKHYuZ2V0QnVmZklkKCkpO1xyXG4gICAgICAgIH0pICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkRlYnVmZkRlc3RvcnkoYnVmZkRhdGE6QnVmZkRhdGEpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpOyAgXHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfdHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuVmVydGlnbzp7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19YdWFuWXVuOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMueHVhbnl1bl9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bzp7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mtheaDkeWvuUJPU1Pml6DmlYgs5b6A5LiL6LWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCkhPVN0cmVuZ3RoVHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5TbG93ZG93bjp7XHJcbiAgICAgICAgICAgICAgICAvL+WkhOeQhuS4gOS4i+WHj+mAn2J1ZmZcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCh0aGlzLmhpZGRlbl9hdHRyaWJ1dGUuc2xvd19yZXNpc3RhbmNlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3NfTW9kZV9KaWFuU2hhbmc6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qaWFuc2hhbmdfcmF0ZS09YnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX052V3VfRXhTa2lsbF9KaWFuR29uZ1N1OntcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoK2J1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnVmZkJ1cnN0KGJ1ZmZEYXRhOkJ1ZmZEYXRhLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBpZihidWZmRGF0YS5idWZmX2lkPT1CdWZmSWQuSGVyb19MZWlTaGVuX0NoYW9GdUhlKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xlaUdvZFNraWxsMSk7XHJcbiAgICAgICAgICAgIC8qKuW9k+aVjOS6uui6q+S4iueahOi2hei0n+iNt+i+vuWIsDXlsYLml7bvvIzkvJrlj5fliLDokL3pm7fmlLvlh7vpgKDmiJB75Y+C5pWwMX3kvKTlrrPlubblh7vmmZV75Y+C5pWwMn3np5IgKi9cclxuICAgICAgICAgICAgbGV0IGRhdGE9dGhpcy5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmlzX2RpZT09ZmFsc2UmJmRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAvL0dyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2tpbGxfZ3JvdW5kLHRoaXMuc2hhZG93LmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX3NreSx0aGlzLnNoYWRvdy5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGVYPTAuODtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGVZPTE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyYmZGF0YS5pc19kaWU9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5WZXJ0aWdvO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPWdqRGF0YS5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREZUJ1ZmYoYnVmZkRhdGEsZ2pEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoq5Yi35paw56e76YCfLHNsb3dSZXNpc3RhbmNlOuWHj+mAn+aKl+aApyAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoTW92ZVNwZWVkKHNsb3dSZXNpc3RhbmNlOm51bWJlcil7XHJcbiAgICAgICAgLy/lrp7pmYXlh4/pgJ9cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9MzA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT1Jbmp1cmVkRGF0YS5jYWxjU2xvd0Rvd25OdW0odGhpcy5iYXNlX2RhdGEuU3BlZWQrdGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlLHRoaXMuZ2V0TWF4U2xvd0Rvd25WYWx1ZSgpLHNsb3dSZXNpc3RhbmNlLHRoaXMuZ2V0TWF4U3BlZWRVcFZhbHVlKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuY3VyX21vdmVfc3BlZWQ8dGhpcy5iYXNlX2RhdGEuU3BlZWQ/Q29sb3JUeXBlLlNsb3dEb3duOkNvbG9yVHlwZS5OdWxsKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCkhPVN0cmVuZ3RoVHlwZS5Cb3NzKVxyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPXRoaXMuY3VyX21vdmVfc3BlZWQvKHRoaXMuYmFzZV9kYXRhLlNwZWVkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvLyAvKirliLfmlrDlh4/pgJ9idWZm55qE5aSE55CGICovXHJcbiAgICAvLyBwcml2YXRlIHJlZnJlc2hTbG93ZG93bigpe1xyXG4gICAgLy8gICAgIC8v5om+5Ye65omA5pyJ5YeP6YCf57G75Z6L55qEYnVmZlxyXG4gICAgLy8gICAgIGxldCBzbG93QnVmZj1uZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgLy8gICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgLy8gICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNsb3dkb3duKXtcclxuICAgIC8vICAgICAgICAgICAgIHNsb3dCdWZmLnB1c2godik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICBpZihzbG93QnVmZi5sZW5ndGg+MCl7XHJcbiAgICAvLyAgICAgICAgIHNsb3dCdWZmLnNvcnQoKGEsYik9PntcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgbGV0IG1heEJ1ZmY9c2xvd0J1ZmZbMF07XHJcbiAgICAvLyAgICAgICAgIC8v5a6e6ZmF5YeP6YCfXHJcbiAgICAvLyAgICAgICAgIGxldCB2YWx1ZT1Jbmp1cmVkRGF0YS5jYWxjU2xvd0Rvd25OdW0odGhpcy5iYXNlX2RhdGEuU3BlZWQsbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UsdGhpcy5nZXRNYXhTcGVlZFVwVmFsdWUoKSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dmFsdWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLlNsb3dEb3duKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmJhc2VfZGF0YS5TcGVlZDtcclxuICAgIC8vICAgICAgICAgdGhpcy5zZXRDb2xvcihDb2xvclR5cGUuTnVsbCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIC8qKuWIt+aWsOWKoOmAn2J1ZmbnmoTlpITnkIYgKi9cclxuICAgIC8vIHByaXZhdGUgcmVmcmVzaFNwZWVkVXAoKXtcclxuICAgIC8vICAgICAvL+aJvuWHuuaJgOacieWKoOmAn+exu+Wei+eahGJ1ZmZcclxuICAgIC8vICAgICBsZXQgc3BlZWRCdWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgLy8gICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNwZWVkVXApe1xyXG4gICAgLy8gICAgICAgICAgICAgc3BlZWRCdWZmLnB1c2godik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICBpZihzcGVlZEJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgLy8gICAgICAgICBzcGVlZEJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICBsZXQgbWF4QnVmZj1zcGVlZEJ1ZmZbMF07XHJcbiAgICAvLyAgICAgICAgIC8v5a6e6ZmF5Yqg6YCf6YCfXHJcbiAgICAvLyAgICAgICAgIGxldCBvZmZzZXRWYWx1ZT10aGlzLmJhc2VfZGF0YS5TcGVlZCptYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAvLyAgICAgICAgIC8vbGV0IHZhbHVlPUluanVyZWREYXRhLmNhbGNTbG93RG93bk51bSgsbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQrb2Zmc2V0VmFsdWU7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIC8qKuWKoOWHj+mAn+mcgOimgeWkhOeQhu+8jOWIpOaWreWHj+mAnyAqL1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuYmFzZV9kYXRhLlNwZWVkO1xyXG4gICAgLy8gICAgIH0gICAgICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKuiOt+W+l+acgOWkp+WAvOeahOWHj+mAn+avlOeOhyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXhTbG93RG93blZhbHVlKCk6bnVtYmVye1xyXG4gICAgICAgIC8v5om+5Ye65omA5pyJ5Yqg6YCf57G75Z6L55qEYnVmZlxyXG4gICAgICAgIGxldCBidWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuZ2V0QnVmZlR5cGUoKT09QnVmZlR5cGUuU2xvd2Rvd24pe1xyXG4gICAgICAgICAgICAgICAgYnVmZi5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoYnVmZi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWF4QnVmZj1idWZmWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflvpfmnIDlpKflgLznmoTliqDpgJ/mr5TnjocgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF4U3BlZWRVcFZhbHVlKCk6bnVtYmVye1xyXG4gICAgICAgIC8v5om+5Ye65omA5pyJ5Yqg6YCf57G75Z6L55qEYnVmZlxyXG4gICAgICAgIGxldCBzcGVlZEJ1ZmY9bmV3IEFycmF5PEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuZ2V0QnVmZlR5cGUoKT09QnVmZlR5cGUuTW92ZVNwZWVkVXApe1xyXG4gICAgICAgICAgICAgICAgc3BlZWRCdWZmLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihzcGVlZEJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBzcGVlZEJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWF4QnVmZj1zcGVlZEJ1ZmZbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaUu+mAn++8jOavj+enkuaUu+WHu+asoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBdHRhY2tTcGVlZChudW1TZWM6bnVtYmVyKXtcclxuICAgICAgICBpZihudW1TZWM+MTApe1xyXG4gICAgICAgICAgICBudW1TZWM9MTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG51bVNlYzwwLjEpe1xyXG4gICAgICAgICAgICBudW1TZWM9MC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmF0dF9qaWFuZ2U9MS9udW1TZWM7XHJcbiAgICB9XHJcbiAgICAvKirmlLnlj5jlvZPliY3mlLvpgJ8scmF0ZTrmr5TnjocgKi9cclxuICAgIHByb3RlY3RlZCBjaGFuZ2VBdHRhY2tTcGVlZChyYXRlOm51bWJlcil7XHJcbiAgICAgICAgbGV0IGdqc2Q9dGhpcy5nZXRBdHRhY2tTcGVlZCgpOyAgICAgICAgXHJcbiAgICAgICAgZ2pzZCs9KHJhdGUpKih0aGlzLmJhc2VfZGF0YS5BdHRhY2tTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRhY2tTcGVlZChnanNkKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+W9k+WJjeaUu+mAnyAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEF0dGFja1NwZWVkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiAxL3RoaXMuYXR0X2ppYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorqHnrpfph43kvKTvvIzlj5bmnIDlpKcgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhTZXJpb3VzbHkoKTpudW1iZXJ7XHJcbiAgICAgICAgLy/mib7lh7rmiYDmnInph43kvKTnsbvlnovnmoRidWZmXHJcbiAgICAgICAgbGV0IHNlcmlvdXNseUJ1ZmY9bmV3IEFycmF5PEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5nZXRCdWZmVHlwZSgpPT1CdWZmVHlwZS5TZXJpb3VzbHlJbmp1cmVkKXtcclxuICAgICAgICAgICAgICAgIHNlcmlvdXNseUJ1ZmYucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHNlcmlvdXNseUJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBzZXJpb3VzbHlCdWZmLnNvcnQoKGEsYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG1heEJ1ZmY9c2VyaW91c2x5QnVmZlswXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5YWJ546vLeW8gOWniyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgYWRkSGFsbyhoYWxvRGF0YTpIYWxvRGF0YSl7XHJcbiAgICAgICAgaWYoIXRoaXMubW9uc3Rlcl9oYWxvLmhhcyhoYWxvRGF0YS5oYWxvX2lkKSl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9oYWxvLnNldChoYWxvRGF0YS5oYWxvX2lkLGhhbG9EYXRhKTtcclxuICAgICAgICAgICAgc3dpdGNoKGhhbG9EYXRhLmhhbG9faWQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3RlcjMwX0JpYW5GdV9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZSs9aGFsb0RhdGEuaGFsb192YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXI2OV9OaXVTYU1hbl9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X2RlZmVuc2VfdmFsdWUrPWhhbG9EYXRhLmhhbG9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyNzZfSmlhbkR1WmhlX1NraWxsX0hhbG86e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZSs9dGhpcy5iYXNlX2RhdGEuU3BlZWQqKGhhbG9EYXRhLmhhbG9fdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEhhbG8oaGFsb0lkOkhhbG9JZCk6SGFsb0RhdGF7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9oYWxvLmdldChoYWxvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUhhbG8oaGFsb0lkOkhhbG9JZCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2hhbG8uaGFzKGhhbG9JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViSGFsbyhoYWxvSWQ6SGFsb0lkLHV1aWQ6c3RyaW5nKXtcclxuICAgICAgICBsZXQgaGFsb0RhdGE9dGhpcy5tb25zdGVyX2hhbG8uZ2V0KGhhbG9JZCk7XHJcbiAgICAgICAgaWYoaGFsb0RhdGEpe1xyXG4gICAgICAgICAgICAvL+WPquacieWQjOa6kOaJjeWPr+S7peenu+mZpFxyXG4gICAgICAgICAgICBpZihoYWxvRGF0YS5oYWxvX3NvdXJjZV91dWlkPT11dWlkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9oYWxvLmRlbGV0ZShoYWxvSWQpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGhhbG9JZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3RlcjMwX0JpYW5GdV9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9taXNzX3JhdGUtPWhhbG9EYXRhLmhhbG9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZXhfbWlzc19yYXRlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9taXNzX3JhdGU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyNjlfTml1U2FNYW5fU2tpbGxfSGFsbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfZGVmZW5zZV92YWx1ZS09aGFsb0RhdGEuaGFsb192YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5leF9kZWZlbnNlX3ZhbHVlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3Rlcjc2X0ppYW5EdVpoZV9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlLT10aGlzLmJhc2VfZGF0YS5TcGVlZCooaGFsb0RhdGEuaGFsb192YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxIYWxvKCl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2hhbG8uY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlhYnnjq8t57uT5p2fKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgZ2V0SGlkZGVuQXR0cmlidXRlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuX2F0dHJpYnV0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0RpZSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX3N0YXRlPT1FbmVteV9TdGF0ZS5kaWV8fHRoaXMubW9uc3Rlcl9zdGF0ZT09RW5lbXlfU3RhdGUuc2hpcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFbmVteVN0YXRlKCk6RW5lbXlfU3RhdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZW15UHJldlN0YXRlKCk6RW5lbXlfU3RhdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2X3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzQ2FuQ2hlY2soKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGlzQ2FuPXRydWU7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpIHx8IHRoaXMubm9kZS55Pj1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2NyZWF0ZV95ICB8fCB0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUuYm9ybilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzQ2FuPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNDYW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG91Z2huZXNzKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl90b3VnaG5lc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF4SHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VySHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VyQXR0KCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9hdHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29sb3IoY29sb3JUeXBlOkNvbG9yVHlwZSl7XHJcbiAgICAgICAgbGV0IGNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5TbG93ZG93bikpe1xyXG4gICAgICAgICAgICBjb2xvcj1jYy5jb2xvcig4MiwyNTUsMjUyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoKGNvbG9yVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgQ29sb3JUeXBlLkluanVyZWQ6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1ckNvbG9yPXRoaXMuY3VyX2NvbG9yO1xyXG4gICAgICAgICAgICAgICAgaWYoY3VyQ29sb3IhPUNvbG9yVHlwZS5Jbmp1cmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmluanVyZWRfYWN0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb249Y2MudHdlZW4odGhpcy5ub2RlKS50bygwLjEse2NvbG9yOnRoaXMubm9kZS5jb2xvcn0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb2xvcihjdXJDb2xvcilcclxuICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29sb3JUeXBlLlNsb3dEb3duOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDgyLDI1NSwyNTIpO1xyXG4gICAgICAgICAgICB9YnJlYWs7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJfY29sb3I9Y29sb3JUeXBlO1xyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvcj1jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJDb2xvcigpOkNvbG9yVHlwZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvd0Rvd25Db2xvcigpOmNjLkNvbG9ye1xyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcig4MiwyNTUsMjUyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBdHREYXRhKGRhbWFnZVR5cGU6RGFtYWdlVHlwZSxpc0J1bGxldDpib29sZWFuLHNraWxsUmF0ZTpudW1iZXI9MCk6TW9uc3RlckF0dERhdGF7XHJcbiAgICAgICAgbGV0IG1kPW5ldyBNb25zdGVyQXR0RGF0YSgpO1xyXG4gICAgICAgIG1kLmRhbWFnZV90eXBlPWRhbWFnZVR5cGU7XHJcbiAgICAgICAgbWQuaXNfYnVsbGV0PWlzQnVsbGV0O1xyXG4gICAgICAgIG1kLnNraWxsX3JhdGU9c2tpbGxSYXRlO1xyXG4gICAgICAgIG1kLm1vbnN0ZXJfYXR0cmlidXRlPXRoaXMubW9uc3Rlcl9kYXRhO1xyXG4gICAgICAgIG1kLnplbmdzaGFuZ19yYXRlPXRoaXMuemVuZ3NoYW5nX3JhdGU7XHJcbiAgICAgICAgbWQubW9uc3Rlcl90cz10aGlzO1xyXG4gICAgICAgIG1kLnN0cmVuZ3RoX3R5cGU9dGhpcy5nZXRTdHJlbmd0aFR5cGUoKTtcclxuICAgICAgICByZXR1cm4gbWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNGdWxsSHAoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2hwPj10aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRFbmVteVN0YXRlKHR5cGU6RW5lbXlfU3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodHlwZSE9dGhpcy5tb25zdGVyX3N0YXRlKXtcclxuICAgICAgICAgICAgdGhpcy5wcmV2X3N0YXRlPXRoaXMubW9uc3Rlcl9zdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX3N0YXRlPXR5cGU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGU9PUVuZW15X1N0YXRlLmF0dHx8dHlwZT09RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT0oMS90aGlzLmJhc2VfZGF0YS5BdHRhY2tTcGVlZCkvdGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlPT1FbmVteV9TdGF0ZS5tb3ZlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9dGhpcy5jdXJfbW92ZV9zcGVlZC8odGhpcy5iYXNlX2RhdGEuU3BlZWQpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydERlYXRoKCl7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmRpZSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkPWZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQ9dGhpcy5pc19jb3VudDtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLndpbGxEZXN0cm95TW9uc3Rlcih0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmRlYXRoX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5kZWF0aF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEh1cnQoKXtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5Jbmp1cmVkKTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYW1hZ2Ug5Lyk5a6z5YC8XHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlVHlwZSDkvKTlrrPnsbvlnotcclxuICAgICAqL1xyXG4gICAgaW5qdXJlV2FsbChkYXRhOk1vbnN0ZXJBdHREYXRhKTpJbmp1cmVkRGF0YXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRfd2FsbC5iZUluanVyZWQoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7kuIDkuKrpqqjpqrzliqjnlLtcclxuICAgICAqIEBwYXJhbSBuYW1lIOmqqOmqvOWKqOeUu+WQjeensFxyXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cclxuICAgICAqIEBwYXJhbSBkYXRhIOaYr+WQpuebkeWQrOWFs+mUruW4p++8jOWFs+mUruW4p+aVsOaNruWMheWQq+WFs+mUruW4p+WQjeensO+8jOebkeWQrOWIsOWFs+mUruW4p+WQjueahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGVuZENhbGxiYWNrIOaSreaUvue7k+adn+WQjueahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwbGF5U3BpbkFuaW1hdG9uKG5hbWU6c3RyaW5nLGlzTG9vcDpib29sZWFuPWZhbHNlLGRhdGE/OktleUZyYW1lRGF0YSxlbmRDYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5kaWUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsaXNMb29wKTtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGEubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlEZWFkQW5pbWF0b24obmFtZTpzdHJpbmcsZW5kQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBhbmltYS5saXN0ZW5lcj1udWxsO1xyXG4gICAgICAgICAgICBlbmRDYWxsYmFjaygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKirorr7nva5Y5Z2Q5qCH77yM6L+U5Zue5YGP5bem6L+Y5piv5YGP5Y+z5LqGLC0xOuWBj+W3pu+8jDDvvJrmraPluLjvvIwx77ya5YGP5Y+zICovXHJcbiAgICBzZXRYKGRpc1g6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGxlZnRSaWdodD0wO1xyXG4gICAgICAgIGlmKGRpc1g+MzAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzWD0zMDA7XHJcbiAgICAgICAgICAgIGxlZnRSaWdodD0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXNYPC0zMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNYPS0zMDA7XHJcbiAgICAgICAgICAgIGxlZnRSaWdodD0tMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLng9ZGlzWDtcclxuICAgICAgICByZXR1cm4gbGVmdFJpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFkoZGlzWTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubm9kZS55PWRpc1k7XHJcbiAgICAgICAgLy/kuI3og73nqb/ov4fln47loplcclxuICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAvL+ajgOafpeWfjuWimVxyXG4gICAgICAgICAgICBsZXQgcmVjdD13YWxsLmdldFdhbGxSZWN0KCk7XHJcbiAgICAgICAgICAgIGlmKHJlY3QuY29udGFpbnModGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55PndhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueT1yZWN0LnlNYXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueTx3YWxsLm5vZGUueSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnk9cmVjdC55TWluO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IG1haW5XYWxsPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKTtcclxuICAgICAgICBsZXQgbWFpblJlY3Q9bWFpbldhbGwuZ2V0V2FsbFJlY3QoKTtcclxuXHJcbiAgICAgICAgaWYobWFpblJlY3QuY29udGFpbnModGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpKXtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+bWFpbldhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55PW1haW5SZWN0LnlNYXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk8bWFpbldhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55PW1haW5SZWN0LnlNaW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vbkNvbGxpc2lvblNoaXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk8bWFpblJlY3QueU1pbil7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS55PD1tYWluUmVjdC55TWluLTIwMCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55PW1haW5SZWN0LnlNaW4tMjAwO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vbnN0ZXJfc3RhdGUhPUVuZW15X1N0YXRlLnNoaXApe1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaGlwX21vbnN0ZXJfbnVtKys7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNoaXApO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS51cFNoaXBNb25zdGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ29sbGlzaW9uU2hpcCgpe1xyXG4gICAgICAgIGxldCBtZD1uZXcgTW9uc3RlckF0dERhdGEoKTtcclxuICAgICAgICBtZC5kYW1hZ2VfdHlwZT1EYW1hZ2VUeXBlLlNoaXA7XHJcbiAgICAgICAgbWQuaXNfYnVsbGV0PWZhbHNlO1xyXG4gICAgICAgIG1kLnNraWxsX3JhdGU9MDtcclxuICAgICAgICBtZC5tb25zdGVyX2F0dHJpYnV0ZT10aGlzLm1vbnN0ZXJfZGF0YTtcclxuICAgICAgICBtZC56ZW5nc2hhbmdfcmF0ZT10aGlzLnplbmdzaGFuZ19yYXRlO1xyXG4gICAgICAgIG1kLm1vbnN0ZXJfdHM9dGhpcztcclxuICAgICAgICBtZC5zdHJlbmd0aF90eXBlPXRoaXMuZ2V0U3RyZW5ndGhUeXBlKClcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYmVJbmp1cmVkKG1kLGZhbHNlLHRoaXMuZ2V0Q3VySHAoKSowLjUpXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcCgtOTk5OTk5OTk5OSk7XHJcbiAgICB9XHJcbiAgICBzZXRQb3MocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIHRoaXMuc2V0WChwb3MueCk7XHJcbiAgICAgICAgdGhpcy5zZXRZKHBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb3ZlRGlyKGRpcjpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249ZGlyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFFpYW5ZaW5NaW4obnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5taW5fcWlhbnlpbj09MClcclxuICAgICAgICB0aGlzLm1pbl9xaWFueWluPW51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRRaWFuWWluTWluKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9xaWFueWluO1xyXG4gICAgfVxyXG4gICAgLyoq6K6+572u57+76L2sICovXHJcbiAgICBzZXRGbGlwKGlzUmlnaHQ6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD1pc1JpZ2h0P3RoaXMuc2V0dXBfc2NhbGU6LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICB9XHJcbiAgICAvL+makOiXj+mYtOW9sVxyXG4gICAgaGlkU2hhZG93KCl7XHJcbiAgICAgICAgdGhpcy5zaGFkb3cub3BhY2l0eT0wO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5ocF9wcm9ncmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfcHJvZ3Jlc3Muc2V0UG9zKHRoaXMubm9kZS54K3RoaXMuaHBfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmhwX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54K3RoaXMubm9kZS5zY2FsZVgqdGhpcy5zaGFkb3dfcG9zLngsdGhpcy5ub2RlLnkrdGhpcy5ub2RlLnNjYWxlWSp0aGlzLnNoYWRvd19wb3MueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PShNYXRoLnJvdW5kKDgwMDAtdGhpcy5ub2RlLnkqMTApKTtcclxuICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYm9ybiYmdGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk+PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfY3JlYXRlX3kpe1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1RFU1RcclxuICAgICAgICAvLyBpZih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUubW92ZSl7XHJcbiAgICAgICAgLy8gICAgIGxldCBhbGxNb25zdGVyPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAvLyAgICAgbGV0IGxlbj1hbGxNb25zdGVyLmxlbmd0aDtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IG1vbnN0ZXI9YWxsTW9uc3RlcltpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgLy8gICAgICAgICBpZihtb25zdGVyJiZtb25zdGVyLnV1aWQhPXRoaXMudXVpZCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy/liKTmlq3ot53nprtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgb3RoZXJQb3M9bW9uc3Rlci5nZXRDZW50ZXJQb3MoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgc2VsZlBvcz10aGlzLmdldENlbnRlclBvcygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBkaXN0YW5jZT0ob3RoZXJQb3Muc3ViKHNlbGZQb3MpLm1hZygpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihkaXN0YW5jZTw9NTApe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvL+S6pOmbhuS6hlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvL+S4iumdoueahOi1sOWIh+e6v++8jOS4i+mdoueahOWeguebtOi1sOS4i1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihzZWxmUG9zLnk+b3RoZXJQb3MueSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RGlyPXRoaXMubW92ZV9kaXJlY3Rpb24rTWF0aC5QSS8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYoIG5ld0RpciA8PU1hdGguUEkgJiYgbmV3RGlyPj0wKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEaXI9dGhpcy5tb3ZlX2RpcmVjdGlvbi1NYXRoLlBJLzJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249bmV3RGlyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZSBpZihzZWxmUG9zLnk8b3RoZXJQb3MueSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPU1hdGguUEkqMy8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mt7vliqDlm57osIPnm5HlkKwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIGFkZEluaXRMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZENoYW5nZUhwTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmNoYW5nZV9ocF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZFh1YW5ZdW5MaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZERlYXRoQ2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuZGVhdGhfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9ICAgIFxyXG4gICAgYWRkSW5qdXJ5Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlX2luanVyeV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeiOt+W+l+avj+enjeaAqueJqeS4jeWQjOeahOaVsOaNriAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkSW5pdFBvcygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blrozmlbDmja7lsLHliKDpmaTkuoZcclxuICAgICAgICBsZXQganVqaT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2p1amknKTtcclxuICAgICAgICB0aGlzLmp1amlfcG9zPWp1amkuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgZ29uZ2ppPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ29uZ2ppJyk7XHJcbiAgICAgICAgdGhpcy5hdHRfcG9zPWdvbmdqaS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBocD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hwJyk7XHJcbiAgICAgICAgdGhpcy5ocF9wb3M9aHAuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgc2hhZG93Tm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfU2hhZG93Jyk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dfcG9zPXNoYWRvd05vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLnNoYWRvd19zaXplPXNoYWRvd05vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICBsZXQgY2VudGVyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2VudGVyJyk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfcG9zPWNlbnRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIC8vY2MubG9nKHRoaXMuc2hhZG93X3NpemUpO1xyXG5cclxuICAgICAgICBqdWppLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBnb25namkucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGhwLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBzaGFkb3dOb2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBjZW50ZXIucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGlmKHRoaXMuc2hhZG93KXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24oY2MudjIodGhpcy5ub2RlLngrdGhpcy5ub2RlLnNjYWxlWCp0aGlzLnNoYWRvd19wb3MueCx0aGlzLm5vZGUueSt0aGlzLm5vZGUuc2NhbGVZKnRoaXMuc2hhZG93X3Bvcy55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dFBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgbGV0IHBvcz1jYy52MigwLDEyOCk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMubW9uc3Rlcl90eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAyMDogcG9zPWNjLnYyKDAsMTI4KTticmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogcG9zPXRoaXMuYXR0X3BvczticmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc1Bvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQoY2MudjIocG9zLngqdGhpcy5ub2RlLnNjYWxlWCxwb3MueSp0aGlzLm5vZGUuc2NhbGVZKSk7XHJcbiAgICAgICAgcmV0dXJuIGRpc1BvcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRKdUppUG9zKCk6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLm5vZGUueCt0aGlzLmp1amlfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmp1amlfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hlU2hvdVBvcygpOmNjLlZlYzJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLngrdGhpcy5qdWppX3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrdGhpcy5qdWppX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENlbnRlclBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54K3RoaXMuY2VudGVyX3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrdGhpcy5jZW50ZXJfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5pS75Ye75Z+O5aKZ55qEWOWdkOagh++8jOWKqOS9nOS4jeS4gOagt+WvvOiHtOaUu+WHu+eahFjlnZDmoIfkuI3kuIDoh7QgKi9cclxuICAgIGdldEF0dGFja1dhbGxYKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0X3BvcztcclxuICAgIH1cclxufVxyXG4iXX0=