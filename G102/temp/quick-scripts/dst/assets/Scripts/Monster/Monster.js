
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
                    damage = MonsterData_1.InjuredData.calcSkillCritDamageNum(heroData.total_attack, gjData.skill_damage_rate, finalDefense, heroData.skill_increase_damage + heroData.all_increase_damage + heroData.attack_increase_damage, this.jianshang_rate, MonsterData_1.InjuredData.calcFinalExtraCrit(heroData.ExtraCritical, this.monster_data.AntiExtraCritical));
                    if (!gm.is_show_text) {
                        gm.hp_text_manager.createTypeText(cc.v2(this.node.x, this.node.y + 60), data.text_type, null);
                    }
                }
                else {
                    damage = MonsterData_1.InjuredData.calcSkillDamageNum(heroData.total_attack, gjData.skill_damage_rate, finalDefense, heroData.skill_increase_damage + heroData.all_increase_damage + heroData.attack_increase_damage, this.jianshang_rate);
                }
            }
            else {
                damage = MonsterData_1.InjuredData.calcSkillDamageNum(heroData.total_attack, gjData.skill_damage_rate, finalDefense, heroData.skill_increase_damage + heroData.all_increase_damage + heroData.attack_increase_damage, this.jianshang_rate);
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
        WallManager_1.default.getInstance().getMainWall().beInjured(md, false, this.getCurHp() * 0.2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBMkc7QUFDM0csaURBQTRDO0FBQzVDLGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFFekMsNkNBQXdMO0FBQ3hMLDREQUF3RjtBQUN4RixtREFBOEM7QUFDOUMsMEVBQTZHO0FBQzdHLHVEQUFrRDtBQUNsRCwwQ0FBOEQ7QUFFOUQsMkRBQWlFO0FBQ2pFLHNEQUErRztBQUMvRyxvREFBK0M7QUFDL0Msa0RBQWlEO0FBQ2pELHFEQUFnRDtBQUVoRCwwREFBcUQ7QUFDckQsb0RBQTBEO0FBRTFELG1EQUE4QztBQUl4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyx1QkFBdUI7QUFFdkI7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUE2aERDO1FBM2hEYSxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLFVBQVU7UUFDQSxlQUFTLEdBQWlCLDZCQUFlLENBQUMsS0FBSyxDQUFDO1FBQzFELFVBQVU7UUFDQSxnQkFBVSxHQUFTLEtBQUssQ0FBQztRQUNuQyxVQUFVO1FBQ0EsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDakMsWUFBWTtRQUNGLHFCQUFlLEdBQVEsQ0FBQyxDQUFDO1FBQ25DLFVBQVU7UUFDSCxrQkFBWSxHQUFTLENBQUMsQ0FBQztRQUM5QixzQkFBc0I7UUFDWixrQkFBWSxHQUE4QixJQUFJLENBQUM7UUFDekQsb0JBQW9CO1FBQ1YseUJBQW1CLEdBQThCLElBQUksQ0FBQztRQUNoRSxhQUFhO1FBQ0gsZUFBUyxHQUF1QixJQUFJLENBQUM7UUFDL0MsYUFBYTtRQUNiLHNCQUFnQixHQUFpQixJQUFJLENBQUM7UUFDNUIsb0JBQWMsR0FBUyxDQUFDLENBQUM7UUFDekIscUJBQWUsR0FBVSxJ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b3J0IHsgRW5lbXlfU3RhdGUsIEVuZW15X0J1ZmZfVHlwZSwgRW5lbXlfRGVCdWZmX1R5cGUsIEVuZW15X0luanVyZWRfVHlwZSB9IGZyb20gXCIuLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgSHBQcm9ncmVzc0JhciBmcm9tIFwiLi9IcFByb2dyZXNzQmFyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCwgR2FtZUVmZmVjdHNNYW5hZ2VyIH0gZnJvbSBcIi4uL0dhbWUvR2FtZUVmZmVjdHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR29uZ0ppRGF0YSB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgIEtleUZyYW1lRGF0YSwgTW9uc3RlckZhY2VOYW1lLCBNb25zdGVyU2tpblR5cGUsIEluanVyZWREYXRhLCBGZWVkQmFja1R5cGUsICBTdHJlbmd0aFR5cGUsIEhpZGRlbkF0dHJpYnV0ZSwgTW9uc3RlckF0dERhdGEsIE1vbnN0ZXJTa2lsbERhdGEsIENvbG9yVHlwZSB9IGZyb20gXCIuL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCB7IEpzb25Nb25zdGVyQ29uZmlndXJlLCBNb25zdGVyQ29uZmlndXJlTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvTW9uc3RlckNvbmZpZ3VyZVwiO1xyXG5pbXBvcnQgTW9uc3Rlck1hbmFnZXIgZnJvbSBcIi4vTW9uc3Rlck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzLCBNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzXCI7XHJcbmltcG9ydCBHcm91bmRNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0dyb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZU1vZGUsIEdhbWVTdGF0ZSwgVGV4dF9UeXBlIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuLi9NYXplL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJvc3NDaGFsbGVuZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0Jvc3NDaGFsbGVuZ2VcIjtcclxuaW1wb3J0IHsgQnVmZklkLCBCdWZmVHlwZSwgRGFtYWdlVHlwZSwgSGFsb0RhdGEsIEhhbG9JZCwgSGVyb19UeXBlLCBTa2lsbFR5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEJ1ZmZUaW1lciBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZUaW1lclwiO1xyXG5pbXBvcnQgeyBCdWZmRGF0YSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZkRhdGFcIjtcclxuaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJBdHRyaWJ1dGUgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBNb25zdGVyU2tpbGxNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyU2tpbGxcIjtcclxuaW1wb3J0IFdhbGwgZnJvbSBcIi4uL1dhbGwvV2FsbFwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi4vV2FsbC9XYWxsQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbi8qKuaAqueJqemAmueUqOexu++8jOWPquWkhOeQhuaVsOaNru+8jOS4jeWkhOeQhuihqOeOsCAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb25zdGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHNwaW5lOiBzcC5Ta2VsZXRvbj1udWxsO1xyXG4gICAgLyoq55qu6IKk57G75Z6LICovXHJcbiAgICBwcm90ZWN0ZWQgc2tpbl90eXBlOk1vbnN0ZXJTa2luVHlwZT1Nb25zdGVyU2tpblR5cGUuU2tpbjE7XHJcbiAgICAvKirmgKrnialpZCAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfaWQ6IG51bWJlcj0xMDAxMTtcclxuICAgIC8qKuaAqueJqeetiee6pyAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfbGV2ZWw6bnVtYmVyPTE7XHJcbiAgICAvKirmgKrnianooYDph4/ns7vmlbAgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2hwX3JhdGU6bnVtYmVyPTE7XHJcbiAgICAvKirmgKrniannp43nsbsgKi9cclxuICAgIHB1YmxpYyBtb25zdGVyX3R5cGU6IG51bWJlcj0xO1xyXG4gICAgLyoq5oCq54mp55qE5pyA57uI5oiY5paX5L2/55So55qE5pWw5YC8LOWPr+abtOaUuSAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfZGF0YTogSnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzPW51bGw7XHJcbiAgICAvKirmgKrniannmoTln7rnoYDmiJjmlpfmlbDlgLzvvIzkuI3lj6/mm7TmlLkgKi9cclxuICAgIHByb3RlY3RlZCBiYXNlX2F0dHJpYnV0ZV9kYXRhOiBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXM9bnVsbDtcclxuICAgIC8qKuaAqueJqeeahOWfuuehgOaVsOWAvCAqL1xyXG4gICAgcHJvdGVjdGVkIGJhc2VfZGF0YTogSnNvbk1vbnN0ZXJDb25maWd1cmU9bnVsbDtcclxuICAgIC8qKuaAqueJqeeahOmakOiXj+WxnuaApyAqL1xyXG4gICAgaGlkZGVuX2F0dHJpYnV0ZTpIaWRkZW5BdHRyaWJ1dGU9bnVsbDtcclxuICAgIHByb3RlY3RlZCBjdXJfbW92ZV9zcGVlZDogbnVtYmVyPTA7XHJcbiAgICBwcm90ZWN0ZWQgbW92ZV90YXJnZXRfcG9zOiBjYy5WZWMyPW51bGw7XHJcbiAgICBwcm90ZWN0ZWQgbW92ZV9kaXJlY3Rpb246bnVtYmVyPU1hdGguUEkqMy8yO1xyXG4gICAgLyoq5pyd5ZCR5ZCN56ewICovXHJcbiAgICBwcm90ZWN0ZWQgZmFjZV90eXBlOk1vbnN0ZXJGYWNlTmFtZT1Nb25zdGVyRmFjZU5hbWUuRnJvbnQ7XHJcbiAgICAvKirlvZPliY3nmoTooYDph48gKi9cclxuICAgIHByb3RlY3RlZCBjdXJfaHA6IG51bWJlcj0wO1xyXG4gICAgLyoq5pyA5aSn55qE6KGA6YePICovXHJcbiAgICBwcm90ZWN0ZWQgbWF4X2hwOiBudW1iZXI9MDtcclxuICAgIC8qKuihgOadoei/m+W6puadoSAqL1xyXG4gICAgcHJvdGVjdGVkIGhwX3Byb2dyZXNzOiBIcFByb2dyZXNzQmFyPW51bGw7ICAgIFxyXG4gICAgLyoq6Zi05b2xICovXHJcbiAgICBwcm90ZWN0ZWQgc2hhZG93OiBjYy5Ob2RlPW51bGw7XHJcbiAgICBzaGFkb3dfcG9zOiBjYy5WZWMyPW51bGw7XHJcbiAgICBzaGFkb3dfc2l6ZTogY2MuU2l6ZT1udWxsO1xyXG4gICAgLyoq5YeP5Lyk546HICovXHJcbiAgICBqaWFuc2hhbmdfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKuWinuS8pOeOhyAqL1xyXG4gICAgemVuZ3NoYW5nX3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirmlLvlh7vpl7TpmpTvvIjnp5LvvIzooajnpLrlpJrlsJHnp5LmlLvlh7vkuIDmrKHvvIkgKi9cclxuICAgIHByb3RlY3RlZCBhdHRfamlhbmdlOiBudW1iZXI9MTtcclxuICAgIC8qKuaUu+WHu+iuoeaXtiAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dF9qaXNodTogbnVtYmVyPTA7XHJcbiAgICAvKirmioDog73orqHml7YgKi9cclxuICAgIHByb3RlY3RlZCBza2lsbF9qaXNodTogbnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3nmoTmlLvlh7vlipsgKi9cclxuICAgIHByb3RlY3RlZCBjdXJfYXR0OiBudW1iZXI9MDtcclxuICAgIC8qKuW9k+WJjeeahOmfp+aApyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl90b3VnaG5lc3M6bnVtYmVyPTA7XHJcbiAgICAvKirmlLvlh7vnm67moIcs5pS75Ye755uu5qCH5Li6bnVsbOaXtu+8jOebruagh+WwseaYr+WfjuWimSAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dF90YXJnZXQ6Y2MuTm9kZT1udWxsOyAgICBcclxuICAgIC8qKuaAqueJqeW9k+WJjeeahOeKtuaAgSAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfc3RhdGU6IEVuZW15X1N0YXRlPUVuZW15X1N0YXRlLnN0YW5kYnk7XHJcbiAgICAvKirmgKrniankuIrkuIDkuKrnirbmgIEgKi9cclxuICAgIHByb3RlY3RlZCBwcmV2X3N0YXRlOiBFbmVteV9TdGF0ZT1FbmVteV9TdGF0ZS5zdGFuZGJ5O1xyXG4gICAgLyoq5oCq54mp5b2T5YmN5oul5pyJ55qEYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfYnVmZjogTWFwPEJ1ZmZJZCxCdWZmVGltZXI+PW51bGw7XHJcbiAgICAvKirmgKrnianlvZPliY3mi6XmnInnmoRkZWJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2RlYnVmZjogTWFwPEJ1ZmZJZCxCdWZmVGltZXI+PW51bGw7XHJcbiAgICAvKirmjIflrprnmoTnvKnmlL7lgLwqL1xyXG4gICAgcHJvdGVjdGVkIHNldHVwX3NjYWxlOm51bWJlcj0wLjQ7XHJcbiAgICBwcm90ZWN0ZWQgaXNfYm9zczpib29sZWFuPWZhbHNlO1xyXG4gICAgcHVibGljIGlzX2Nhbl9jb3VudDpib29sZWFuPXRydWU7XHJcbiAgICBwcm90ZWN0ZWQgaXNfY291bnQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgLyoq5Z+O5aKZ55qEWei9tOWdkOaghyAqL1xyXG4gICAgcHJvdGVjdGVkIHdhbGxfeXk6bnVtYmVyPTA7XHJcbiAgICBwcm90ZWN0ZWQgYXR0X3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcbiAgICAvKirliIbmlbAgKi9cclxuICAgIHB1YmxpYyBzY29yZTpudW1iZXI9MDtcclxuICAgIC8qKueLmeWHu+eehOWHhueahOS9jee9riAqL1xyXG4gICAgcHJvdGVjdGVkIGp1amlfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuihgOadoeeahOS9jee9riAqL1xyXG4gICAgcHJvdGVjdGVkIGhwX3BvczpjYy5WZWMyPWNjLnYyKDAsMCk7XHJcbiAgICAvKirkuK3lv4PkvY3nva7vvIznlKjkuo7ojIPlm7Tmo4DmtYsgKi9cclxuICAgIHByb3RlY3RlZCBjZW50ZXJfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8v5Y+X5Lyk5Yqo5L2cXHJcbiAgICBwcm90ZWN0ZWQgaW5qdXJlZF9hY3Rpb246Y2MuVHdlZW49bnVsbDtcclxuXHJcbiAgICAvKirliJ3lp4vljJblm57osIMgKi9cclxuICAgIHByaXZhdGUgaW5pdF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5oCq54mp6KGA6YeP5Y+R55Sf5Y+Y5YyW5pe255qE5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGNoYW5nZV9ocF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq55yp5pmV5Zue6LCD77yM55So5LqOYm9zc+aWveazleiiq+S4reaWrSAqL1xyXG4gICAgcHJpdmF0ZSB4dWFueXVuX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirmrbvkuqHlm57osIPvvIzmgKrnianmrbvkuqHml7bop6blj5HvvIznlKjkuo7mkq3mlL7oh6rouqvlr7nlupTnmoTmrbvkuqHliqjnlLsgKi9cclxuICAgIHByaXZhdGUgZGVhdGhfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuiiq+S4u+WKqOaKgOiDveWPl+S8pOaXtueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBhY3RpdmVfaW5qdXJ5X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirnp7vliqjliLDnm67moIflnLDngrnlm57osIMgKi9cclxuICAgIHByb3RlY3RlZCBtb3ZlX2VuZF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoqZGVidWZm5aKe5Lyk57uf6K6hICovICAgIFxyXG4gICAgcHJpdmF0ZSBpbmp1cnlfZGFtYWdlX3N0YXRzOk1hcDxudW1iZXIsbnVtYmVyPj1udWxsO1xyXG4gICAgLyoq5rKf5aOR5Lyk5a6z6K6h566XICovXHJcbiAgICBpc19jYW5fZ3VsbHk6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8qKuaLpeacieeahOWFieeOryAqL1xyXG4gICAgcHJpdmF0ZSBtb25zdGVyX2hhbG86TWFwPEhhbG9JZCxIYWxvRGF0YT49bnVsbDtcclxuICAgIC8qKumineWklueahOmXqumBv+eOhyAqL1xyXG4gICAgcHJpdmF0ZSBleF9taXNzX3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirpop3lpJbnmoTpmLLlvqHlipsgKi9cclxuICAgIHByaXZhdGUgZXhfZGVmZW5zZV92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKumineWklueahOenu+WKqOmAn+W6piAqL1xyXG4gICAgcHJpdmF0ZSBleF9tb3ZlX3NwZWVkX3ZhbHVlOm51bWJlcj0wO1xyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDveeahC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLyoq5oqA6IO95pWw5o2uICovXHJcbiAgICBza2lsbF9kYXRhOk1vbnN0ZXJTa2lsbERhdGE9bnVsbDtcclxuICAgIC8qKuaJgOacieaKgOiDveeahOW9k+WJjeeahOWGt+WNtOaXtumXtCAqL1xyXG4gICAgc2tpbGxfY29sZF9kb3duOm51bWJlcltdPVtdO1xyXG4gICAgLyoq5oqA6IO96Zif5YiXICovXHJcbiAgICBza2lsbF9xdWV1ZTpudW1iZXJbXT1bXTtcclxuICAgIC8qKuW9k+WJjeS9v+eUqOeahOaKgOiDvSww5Luj6KGo5rKh5pyJICovXHJcbiAgICBjdXJfc2tpbGxfaW5kZXg6bnVtYmVyPTA7XHJcbiAgICAvKirnorDmkp7lmaggKi9cclxuICAgIGNvbGxpZGVyOmNjLkNvbGxpZGVyPW51bGw7XHJcbiAgICAvKiropoHmlLvlh7vnmoTln47lopkgKi9cclxuICAgIGF0dF93YWxsOldhbGw9bnVsbDtcclxuICAgIC8qKueJteW8leacgOWwj+i3neemuyAqL1xyXG4gICAgbWluX3FpYW55aW46bnVtYmVyPTA7XHJcblxyXG4gICAgY3VyX2NvbG9yOkNvbG9yVHlwZT1Db2xvclR5cGUuTnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5zcGluZT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLmxvYWRJbml0UG9zKCk7XHJcbiAgICAgICAgdGhpcy53YWxsX3l5PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfYXR0X3k7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmY9bmV3IE1hcDxCdWZmSWQsQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmY9bmV3IE1hcDxCdWZmSWQsQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9oYWxvPW5ldyBNYXA8SGFsb0lkLEhhbG9EYXRhPigpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXI9dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkPXRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChtb25zdGVySWQ6IG51bWJlcixsZXZlbDpudW1iZXIsaHBSYXRlOm51bWJlcixpc0NhbkNvdW50OmJvb2xlYW49dHJ1ZSkge1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9pZD1tb25zdGVySWQ7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2xldmVsPWxldmVsO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9ocF9yYXRlPWhwUmF0ZTtcclxuICAgICAgICBsZXQganNvbkRhdGE9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZShtb25zdGVySWQpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl90eXBlPWpzb25EYXRhLk1vbnN0ZXJDbGFzcztcclxuICAgICAgICBsZXQgYXR0cmlidXRlSWQ9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldElkKHRoaXMubW9uc3Rlcl9pZCxsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyhhdHRyaWJ1dGVJZCk7ICAgICAgXHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ3VsbHk9dHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9jb3VudD1pc0NhbkNvdW50O1xyXG4gICAgICAgIHRoaXMuaXNfY291bnQ9dGhpcy5pc19jYW5fY291bnQ7XHJcbiAgICAgICAgdGhpcy5leF9taXNzX3JhdGU9MDtcclxuICAgICAgICB0aGlzLmV4X2RlZmVuc2VfdmFsdWU9MDtcclxuICAgICAgICAvL3RoaXMuaW5pdE91dHdhcmQoanNvbkRhdGEuU2tpbik7ICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXREYXRhKGpzb25EYXRhKTtcclxuICAgICAgICB0aGlzLmFkZEhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5OdWxsKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIHRoaXMubWluX3FpYW55aW49MDtcclxuICAgICAgICBpZih0aGlzLmluaXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmluaXRfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLnNwaW5lLnBhdXNlZD1mYWxzZTtcclxuICAgICAgICAvL3RoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzIrTWF0aC5yYW5kb20oKSooTWF0aC5QSS82KS0oTWF0aC5QSS8xMik7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0U3VtbW9uKG1vbnN0ZXJJZDogbnVtYmVyLGJvc3NBdHRyaWJ1dGU6SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfaWQ9bW9uc3RlcklkO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1vbnN0ZXJJZCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX3R5cGU9anNvbkRhdGEuTW9uc3RlckNsYXNzO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2d1bGx5PXRydWU7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19jb3VudD10aGlzLmlzX2Nhbl9jb3VudDtcclxuICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGE9Y2MuaW5zdGFudGlhdGUoYm9zc0F0dHJpYnV0ZSk7XHJcbiAgICAgICAgc3dpdGNoKGpzb25EYXRhLlN0cmVuZ3RoVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5IZWFsdGg9Ym9zc0F0dHJpYnV0ZS5IZWFsdGgvNTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrPWJvc3NBdHRyaWJ1dGUuQXR0YWNrKjAuOTcyNDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlPWJvc3NBdHRyaWJ1dGUuRGVmZW5zZSowLjY7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuTm9ybWFsOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5IZWFsdGg9Ym9zc0F0dHJpYnV0ZS5IZWFsdGgvNTA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrPWJvc3NBdHRyaWJ1dGUuQXR0YWNrKjAuOTU5MjtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlPTA7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXREYXRhKGpzb25EYXRhKTtcclxuICAgICAgICB0aGlzLmFkZEhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5OdWxsKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZD10cnVlO1xyXG4gICAgICAgIHRoaXMubWluX3FpYW55aW49MDtcclxuICAgICAgICBpZih0aGlzLmluaXRfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmluaXRfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaERhdGEobGV2ZWw6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfbGV2ZWw9bGV2ZWw7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUodGhpcy5tb25zdGVyX2lkKTsgICAgICAgIFxyXG4gICAgICAgIC8v6YeN572u5pWw5o2uXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUlkPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJZCh0aGlzLm1vbnN0ZXJfaWQsbGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YT1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMoYXR0cmlidXRlSWQpOyAgXHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RhdGE9Y2MuaW5zdGFudGlhdGUodGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhKTtcclxuICAgICAgICB0aGlzLmJhc2VfZGF0YT1qc29uRGF0YTtcclxuICAgICAgICB0aGlzLmN1cl9ocD10aGlzLm1heF9ocD10aGlzLm1vbnN0ZXJfZGF0YS5IZWFsdGg7XHJcbiAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmJhc2VfZGF0YS5TcGVlZDtcclxuICAgICAgICB0aGlzLmF0dF9qaWFuZ2U9MS90aGlzLmJhc2VfZGF0YS5BdHRhY2tTcGVlZDtcclxuICAgICAgICB0aGlzLmN1cl9hdHQ9dGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuYmFzZV9kYXRhLlNraWxsTnVtPjApe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxvYWRNb25zdGVyU2tpbGxEYXRhKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgLyoq5Yid5aeL5YyW5aSW6KeCKi9cclxuICAgIC8vIHByaXZhdGUgaW5pdE91dHdhcmQoc2tpblR5cGU6TW9uc3RlclNraW5UeXBlKXtcclxuICAgIC8vICAgICB0aGlzLnNraW5fdHlwZT1za2luVHlwZTtcclxuICAgIC8vICAgICB0aGlzLnNldFNraW4odGhpcy5nZXRTa2luTmFtZSgpKTtcclxuICAgIC8vICAgICB0aGlzLnBsYXlTcGluQW5pbWF0b24odGhpcy5nZXRBbmltYU5hbWUoTW9uc3RlckFjdGlvbk5hbWUuSWRsZSksdHJ1ZSk7XHJcbiAgICAvLyB9XHJcbiAgICAvKirliJ3lp4vljJbmlbDmja4gKi9cclxuICAgIHByaXZhdGUgaW5pdERhdGEoYmFzZURhdGE6SnNvbk1vbnN0ZXJDb25maWd1cmUpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhPWNjLmluc3RhbnRpYXRlKHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YSk7XHJcbiAgICAgICAgdGhpcy5iYXNlX2RhdGE9YmFzZURhdGE7XHJcbiAgICAgICAgdGhpcy5jdXJfaHA9dGhpcy5tYXhfaHA9dGhpcy5tb25zdGVyX2RhdGEuSGVhbHRoKnRoaXMubW9uc3Rlcl9ocF9yYXRlO1xyXG4gICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dGhpcy5iYXNlX2RhdGEuU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5hdHRfamlhbmdlPTEvdGhpcy5iYXNlX2RhdGEuQXR0YWNrU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5jdXJfYXR0PXRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjaztcclxuICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3M9MDtcclxuICAgICAgICB0aGlzLnNldHVwX3NjYWxlPXRoaXMuYmFzZV9kYXRhLlNjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZT10aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2tpbl90eXBlPWJhc2VEYXRhLlNraW47XHJcbiAgICAgICAgdGhpcy5oaWRkZW5fYXR0cmlidXRlPW5ldyBIaWRkZW5BdHRyaWJ1dGUoKTtcclxuICAgICAgICB0aGlzLmluanVyeV9kYW1hZ2Vfc3RhdHM9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGlmKHRoaXMuYmFzZV9kYXRhLlNraWxsTnVtPjApe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRNb25zdGVyU2tpbGxEYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZE1vbnN0ZXJTa2lsbERhdGEoKXtcclxuICAgICAgICBsZXQgc2tpbGxEYXRhPW5ldyBNb25zdGVyU2tpbGxEYXRhKCk7XHJcbiAgICAgICAgc2tpbGxEYXRhLkNvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuSW5pdENvbGREb3duPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8xPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8yPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8zPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV80PW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBza2lsbERhdGEuQ2FzdGluZ1JhbmdlPW5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICBmb3IobGV0IHM9MTsgczw9dGhpcy5iYXNlX2RhdGEuU2tpbGxOdW07IHMrKyl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBpZD1Nb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SWQodGhpcy5tb25zdGVyX2lkLHMsdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLlNraWxsTGV2ZWwpXHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YT1Nb25zdGVyU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJTa2lsbChpZCk7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhID09IG51bGwgKSBjb250aW51ZTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfMS5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8yLnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMik7XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzMuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8zKTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfNC5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuQ29sZERvd24uc2V0KHMsanNvbkRhdGEuQ29sZERvd24pO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuSW5pdENvbGREb3duLnNldChzLGpzb25EYXRhLkluaXRpYWxDb2xkRG93bik7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpbGxfY29sZF9kb3duW3MtMV09anNvbkRhdGEuSW5pdGlhbENvbGREb3duO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuQ2FzdGluZ1JhbmdlLnNldChzLGpzb25EYXRhLkNhc3RpbmdSYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2tpbGxfZGF0YT1za2lsbERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEhwUHJvZ3Jlc3MoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmhwX3Byb2dyZXNzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlIT1TdHJlbmd0aFR5cGUuQm9zcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ocF9wcm9ncmVzcz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2hwX21hbmFnZXIuY3JlYXRlRW5lbXlIcChjYy52Mih0aGlzLm5vZGUueCt0aGlzLmhwX3Bvcy54KnRoaXMuc2V0dXBfc2NhbGUsdGhpcy5ub2RlLnkrdGhpcy5ocF9wb3MueSp0aGlzLnNldHVwX3NjYWxlKSkuZ2V0Q29tcG9uZW50KEhwUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRTaGFkb3coKXtcclxuICAgICAgICAvL2lmKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSE9U3RyZW5ndGhUeXBlLkJvc3MpXHJcbiAgICAgICAgaWYoIXRoaXMuc2hhZG93KXtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3c9R3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVNoYWRvdyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5zaGFkb3dfcG9zKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LndpZHRoPXRoaXMubm9kZS5zY2FsZVgqdGhpcy5zaGFkb3dfc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuaGVpZ2h0PXRoaXMubm9kZS5zY2FsZVkqdGhpcy5zaGFkb3dfc2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93Lm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5zaGFkb3dfcG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93SHAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaHBfcHJvZ3Jlc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhwX3Byb2dyZXNzLmNoYW5nZVByb2dyZXNzKHRoaXMuY3VyX2hwL3RoaXMubWF4X2hwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNDYW5Db3VudChpc0NhbkNvdW50OmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2NvdW50PWlzQ2FuQ291bnQ7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pc19jYW5fY291bnQ9PWZhbHNlKXtcclxuICAgICAgICAvLyAgICAgY2MubG9nKCdzZXRJc0NhbkNvdW50PT1mYWxzZScpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXR1cFNjYWxlKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNoZVNob3VBdHRhY2tTY2FsZSgpOm51bWJlcntcclxuICAgICAgICBsZXQgc2NhbGU9MC4zO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC41NTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5FbGl0ZTp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjc1O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkJvc3M6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MS4yO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXYWxsQXR0YWNrU2NhbGUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNjYWxlPTE7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLk5vcm1hbDp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjY7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuRWxpdGU6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC45O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYdWFueXVuU2NhbGUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHNjYWxlPTAuMztcclxuICAgICAgICBzd2l0Y2godGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuTm9ybWFsOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuNTUvdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5FbGl0ZTp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjc1L3RoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuQm9zczp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0xLjUvdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RyZW5ndGhUeXBlKCk6U3RyZW5ndGhUeXBle1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TW9uc3RlckRhdGEoKTpKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXN7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuoeeul+S8pOWus+aVsOaNriAqL1xyXG4gICAgZ2V0SW5qdXJlZERhdGEoZ2pEYXRhOkdvbmdKaURhdGEpOkluanVyZWREYXRhe1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBJbmp1cmVkRGF0YSgpO1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0SXNEaWUoKSl7XHJcbiAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuRGllO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IG1pc3NSYXRlPTA7ICAgICAgICBcclxuICAgICAgICBsZXQgY3JpdFJhdGU9MDtcclxuICAgICAgICAvL+WmguaenOaYr+aZrumAmuaUu+WHu++8jOiuoeeul+mXqumBv+WSjOaatOWHu++8jOm7mOiupOS4ujBcclxuICAgICAgICBsZXQgaGVyb0RhdGE9Z2pEYXRhLmhlcm9fZGF0YTtcclxuICAgICAgICAvL+aAqueJqeeahOmYsuW+oeWKm1xyXG4gICAgICAgIGxldCBzZWxmRGVmZW5zZT10aGlzLm1vbnN0ZXJfZGF0YS5EZWZlbnNlK3RoaXMuZXhfZGVmZW5zZV92YWx1ZTtcclxuICAgICAgICBsZXQgZmluYWxEZWZlbnNlPUluanVyZWREYXRhLmNhbGNGaW5hbERlZmVuc2Uoc2VsZkRlZmVuc2UsaGVyb0RhdGEuaWdub3JlX2RlZmVuc2VfcmF0ZSlcclxuICAgICAgICBpZihnakRhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuTm9ybWFsKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVCdWZmKEJ1ZmZJZC5Cb3NzMl9NaWFuWWlfQXR0YWNrKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5NYWluWWk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuV3VEaTtcclxuICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksRW5lbXlfSW5qdXJlZF9UeXBlLld1RGksbnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtaXNzUmF0ZT1Jbmp1cmVkRGF0YS5jYWxjTWlzc1JhdGUodGhpcy5tb25zdGVyX2RhdGEuTWlzcyxnakRhdGEuaGVyb19kYXRhLkhpdCkrdGhpcy5leF9taXNzX3JhdGUtZ2pEYXRhLmhlcm9fZGF0YS5oaXRfZXg7XHJcbiAgICAgICAgICAgIGNyaXRSYXRlPUluanVyZWREYXRhLmNhbGNDcml0UmF0ZShnakRhdGEuaGVyb19kYXRhLkNyaXRpY2FsLHRoaXMubW9uc3Rlcl9kYXRhLkFudGlDcml0aWNhbCk7XHJcbiAgICAgICAgICAgIGNyaXRSYXRlKz1nakRhdGEuaGVyb19kYXRhLmNyaXRfZXg7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5LiA5Liq5qaC546H57G75Z6LXHJcbiAgICAgICAgICAgIGxldCB0eXBlPUluanVyZWREYXRhLmNhbGNPbmNlVHlwZShbbWlzc1JhdGUsY3JpdFJhdGUsMV0pO1xyXG4gICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6Zeq6YG/XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5TaGFuQmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLlNoYW5CaTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLEVuZW15X0luanVyZWRfVHlwZS5TaGFuQmksbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pq05Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGFtYWdlPUluanVyZWREYXRhLmNhbGNOb3JtYWxDcml0RGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjayxmaW5hbERlZmVuc2UsaGVyb0RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlLHRoaXMuamlhbnNoYW5nX3JhdGUsSW5qdXJlZERhdGEuY2FsY0ZpbmFsRXh0cmFDcml0KGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwsdGhpcy5tb25zdGVyX2RhdGEuQW50aUV4dHJhQ3JpdGljYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBpZihnakRhdGEucGV0X2lkPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoZ2pEYXRhLmhlcm9fdHlwZSkub25EYW1hZ2VNb25zdGVyKERhbWFnZVR5cGUuTm9ybWFsLHRydWUsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksZGF0YS50ZXh0X3R5cGUsbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgICAgICAvL+aZrumAmuWRveS4rVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTnVsbDsgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZmluYWxEZWZlbnNlLGhlcm9EYXRhLmF0dGFja19pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5Ob3JtYWxfQXR0YWNrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdqRGF0YS5wZXRfaWQ9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChnakRhdGEuaGVyb190eXBlKS5vbkRhbWFnZU1vbnN0ZXIoRGFtYWdlVHlwZS5Ob3JtYWwsZmFsc2UsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZihnakRhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuU2tpbGwpe1xyXG4gICAgICAgICAgICAvL+S4jemcgOimgeiuoeeul+mXqumBv++8jOaKgOiDveW/heS4rVxyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk51bGw7XHJcbiAgICAgICAgICAgIGxldCBkYW1hZ2U9MDtcclxuICAgICAgICAgICAgaWYoZ2pEYXRhLmlzX2Nhbl9jcml0KXtcclxuICAgICAgICAgICAgICAgIGNyaXRSYXRlPUluanVyZWREYXRhLmNhbGNDcml0UmF0ZShnakRhdGEuaGVyb19kYXRhLkNyaXRpY2FsLHRoaXMubW9uc3Rlcl9kYXRhLkFudGlDcml0aWNhbCk7XHJcbiAgICAgICAgICAgICAgICBjcml0UmF0ZSs9Z2pEYXRhLmhlcm9fZGF0YS5jcml0X2V4O1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5bkuIDkuKrmpoLnjofnsbvlnotcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlPUluanVyZWREYXRhLmNhbGNPbmNlVHlwZShbMCxjcml0UmF0ZSwxXSk7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLkJhb0ppO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY1NraWxsQ3JpdERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5za2lsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hdHRhY2tfaW5jcmVhc2VfZGFtYWdlLHRoaXMuamlhbnNoYW5nX3JhdGUsSW5qdXJlZERhdGEuY2FsY0ZpbmFsRXh0cmFDcml0KGhlcm9EYXRhLkV4dHJhQ3JpdGljYWwsdGhpcy5tb25zdGVyX2RhdGEuQW50aUV4dHJhQ3JpdGljYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZighZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZVR5cGVUZXh0KGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzYwKSxkYXRhLnRleHRfdHlwZSxudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY1NraWxsRGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjayxnakRhdGEuc2tpbGxfZGFtYWdlX3JhdGUsZmluYWxEZWZlbnNlLGhlcm9EYXRhLnNraWxsX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmF0dGFja19pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSxmaW5hbERlZmVuc2UsaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICBpZihnakRhdGEucGV0X2lkPT0wKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGdqRGF0YS5oZXJvX3R5cGUpLm9uRGFtYWdlTW9uc3RlcihEYW1hZ2VUeXBlLlNraWxsLGZhbHNlLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeerOmXtOS8pOWus1xyXG4gICAgICogQHBhcmFtIGdqRGF0YSDmlLvlh7vnsbvlnotcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBiZUZsYXNoSW5qdXJlZChnakRhdGE6R29uZ0ppRGF0YSk6IEluanVyZWREYXRhe1xyXG4gICAgICAgIGxldCBkYXRhPXRoaXMuZ2V0SW5qdXJlZERhdGEoZ2pEYXRhKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYmVEYW1hZ2UoZGF0YSxnakRhdGEpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmVDb250aW51b3VzSW5qdXJlZChnakRhdGE6R29uZ0ppRGF0YSxmbG9vck51bTpudW1iZXI9MSkge1xyXG4gICAgICAgIGlmKGdqRGF0YS5jb250aW51b3VzX2RhbWFnZV9yYXRlPjApe1xyXG4gICAgICAgICAgICAvL+aAqueJqeeahOmYsuW+oeWKm1xyXG4gICAgICAgICAgICBsZXQgc2VsZkRlZmVuc2U9dGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZSt0aGlzLmV4X2RlZmVuc2VfdmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBmaW5hbERlZmVuc2U9SW5qdXJlZERhdGEuY2FsY0ZpbmFsRGVmZW5zZShzZWxmRGVmZW5zZSxnakRhdGEuaGVyb19kYXRhLmlnbm9yZV9kZWZlbnNlX3JhdGUpXHJcbiAgICAgICAgICAgIGxldCBoZXJvRGF0YT1nakRhdGEuaGVyb19kYXRhO1xyXG4gICAgICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICAgICAgbGV0IGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGdqRGF0YS5jb250aW51b3VzX2RhbWFnZV9yYXRlLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5za2lsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLlpob25nRHU7XHJcbiAgICAgICAgICAgIGlmKGdqRGF0YS5oZXJvX3R5cGU9PUhlcm9fVHlwZS5Odld1KXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1kYW1hZ2UqZmxvb3JOdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5iZURhbWFnZShkYXRhLGdqRGF0YSk7ICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirpgKDmiJDnnJ/lrp7kvKTlrrPvvIznm7TmjqXpgKDmiJDlr7nlupTnmoTkvKTlrrPlgLws5peg5rOV6Zeq6YG/ICovXHJcbiAgICBiZVJlYWxEYW1hZ2UoZ2pEYXRhOkdvbmdKaURhdGEsZGFtYWdlOm51bWJlcik6SW5qdXJlZERhdGF7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEluanVyZWREYXRhKCk7XHJcbiAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICB0aGlzLmJlRGFtYWdlKGRhdGEsZ2pEYXRhKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgLyoq5oGi5aSN55Sf5ZG95YC85piv5ZCm5oiQ5YqfICovXHJcbiAgICBiZUhlYWwobnVtOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZih0aGlzLmdldEN1ckhwKCk+PXRoaXMuZ2V0TWF4SHAoKXx8dGhpcy5nZXRJc0RpZSgpPT10cnVlKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKirnm67liY3msqHmnInmsrvnlpfmlYjmnpzliqDmiJDvvIzlj6rmnInph43kvKTvvIzlj6rorqHnrpfph43kvKQgKi9cclxuICAgICAgICBsZXQgbmV3TnVtPW51bSooMS10aGlzLmdldE1heFNlcmlvdXNseSgpKSAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcChuZXdOdW0pO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKHRoaXMuZ2V0Q2VudGVyUG9zKCksbmV3TnVtLEVuZW15X0luanVyZWRfVHlwZS5aaGlMaWFvKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJlRGFtYWdlKGRhdGE6SW5qdXJlZERhdGEsZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCk9PVN0cmVuZ3RoVHlwZS5Cb3NzJiZ0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkJvc3M5X1NraWxsXzNfd2lkdSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk1haW5ZaTtcclxuICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLld1RGk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZVR5cGVUZXh0KGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzYwKSxFbmVteV9Jbmp1cmVkX1R5cGUuV3VEaSxudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgbGV0IGdtPSBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICBkYXRhLmlzX2RpZT10aGlzLmNoYW5nZUhwKC1kYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgaWYoZ20uaXNfc2hvd190ZXh0JiZkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55K01hdGgucmFuZG9tKCkqMTAwKSxkYXRhLmdldERhbWFnZU51bSgpLGRhdGEudGV4dF90eXBlKTtcclxuICAgICAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCFkYXRhLmlzX2RpZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SHVydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5ZC46KGA5pWI5p6cXHJcbiAgICAgICAgICAgIGlmKGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlPjAmJmRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHA9SW5qdXJlZERhdGEuY2FsY0Jsb29kU3Vja2luZyhkYXRhLmdldERhbWFnZU51bSgpLGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlLGdqRGF0YS5oZXJvX2RhdGEuc2VyaW91c19pbmp1cnlfcmF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZihocD4wKXtcclxuICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAoaHApO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKuiusOW9leacgOmrmOS8pOWusyAqL1xyXG4gICAgICAgICAgICBnbS5zZXRNYXhEYW1hZ2UoZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgIGdtLnNldE1pbkRhbWFnZShkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgaWYoZ2pEYXRhLnNraWxsX3JlbGVhc2VfaWQ+MCl7XHJcbiAgICAgICAgICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWNvcmREYW1hZ2UoZ2pEYXRhLnNraWxsX3JlbGVhc2VfaWQsZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFjdGl2ZV9pbmp1cnlfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlX2luanVyeV9jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKuiusOW9lURQUyAqL1xyXG4gICAgICAgICAgICBzd2l0Y2goZ2pEYXRhLmRhbWFnZV90eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGFtYWdlVHlwZS5Ob3JtYWw6eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uaGVyb19hdHRhY2tfZHBzW2dqRGF0YS5oZXJvX3R5cGVdKz1kYXRhLmdldERhbWFnZU51bSgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYW1hZ2VUeXBlLlNraWxsOnsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmhlcm9fc2tpbGxfZHBzW2dqRGF0YS5oZXJvX3R5cGVdKz1kYXRhLmdldERhbWFnZU51bSgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIC8qKuWGsOWls+mineWkluecn+WunuS8pOWusyAqL1xyXG4gICAgICAgICAgICAvLyBpZihTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCaW5nTnZTa2lsbDIoKT4wJiZ0aGlzLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuU2xvd2Rvd24pKXtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBkYW1hZ2U9ZGF0YS5nZXREYW1hZ2VOdW0oKSpTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCaW5nTnZTa2lsbDIoKTtcclxuICAgICAgICAgICAgLy8gICAgIGlmKGRhbWFnZTwxKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBkYW1hZ2U9MTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY2hhbmdlSHAoLWRhbWFnZSk7XHJcbiAgICAgICAgICAgIC8vICAgICBnbS5oZXJvX3NraWxsX2Rwc1tIZXJvX1R5cGUuQmluZ052XSs9ZGFtYWdlO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrMzIpLGRhbWFnZSxFbmVteV9Jbmp1cmVkX1R5cGUuQmluZ052WmhlblNoYW5nKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyAvKirpmL/liqrmr5Tmlq/pop3lpJbnnJ/lrp7kvKTlrrMgKi9cclxuICAgICAgICAgICAgLy8gaWYoU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QU51QmlTaVNraWxsMigpPjApe1xyXG4gICAgICAgICAgICAvLyAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlNsb3dkb3duKXx8dGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlZlcnRpZ28pKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBsZXQgZGFtYWdlPWRhdGEuZ2V0RGFtYWdlTnVtKCkqU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QU51QmlTaVNraWxsMigpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGRhbWFnZTwxKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZGFtYWdlPTE7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuY2hhbmdlSHAoLWRhbWFnZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZ20uaGVyb19za2lsbF9kcHNbSGVyb19UeXBlLkFOdUJpU2ldKz1kYW1hZ2U7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzMyKSxkYW1hZ2UsRW5lbXlfSW5qdXJlZF9UeXBlLkFOdUJpU2laaGVuU2hhbmcpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICBHcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmFfbnVfYmlfc2lfYmVpZG9uZ19za2lsbF8yLHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvKirlvrfpsoHkvIrpop3lpJbnnJ/lrp7kvKTlrrMgKi9cclxuICAgICAgICAgICAgaWYoU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVMdVlpRXgoKSYmdGhpcy5pc0hhdmVEZUJ1ZmYoQnVmZklkLkhlcm9fRGVMdVlpX0V4KSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGFtYWdlPWRhdGEuZ2V0RGFtYWdlTnVtKCkqU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVMdVlpRXgoKTtcclxuICAgICAgICAgICAgICAgIGlmKGRhbWFnZTwxKXtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9MTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAoLWRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICBnbS5oZXJvX3NraWxsX2Rwc1tIZXJvX1R5cGUuRGVMdVlpXSs9ZGFtYWdlO1xyXG4gICAgICAgICAgICAgICAgaWYoZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrMzIpLGRhbWFnZSxFbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKirmm7TmlLlocO+8jOi/lOWbnuaYr+WQpuatu+S6oSAqL1xyXG4gICAgcHJvdGVjdGVkIGNoYW5nZUhwKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpfHx0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUuYm9ybnx8R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zdGF0ZSE9R2FtZVN0YXRlLkdhbWVfUGxheWluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzRGllPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwKz1udW07XHJcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJfaHA8PTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2hwPTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmNoYW5nZV9ocF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VfaHBfY2FsbGJhY2sobnVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB1c2VMZXZlbD1Cb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFNjb3JlKE1hdGguYWJzKE1hdGgucm91bmQobnVtKSkpO1xyXG4gICAgICAgICAgICAgICAgaWYodXNlTGV2ZWwhPXRoaXMubW9uc3Rlcl9sZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSh1c2VMZXZlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGVhdGgoKTtcclxuICAgICAgICAgICAgaXNEaWU9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJfaHA+dGhpcy5tYXhfaHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9ocD10aGlzLm1heF9ocFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihpc0RpZT09ZmFsc2UmJkdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZT09R2FtZU1vZGUuTWF6ZSl7XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuY3VyX2hwPCh0aGlzLm1heF9ocCowLjEpKXtcclxuICAgICAgICAvLyAgICAgICAgIGlmKE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNIYXZlQUJ1ZmYoWzgwMDNdKSl7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAoLXRoaXMuY3VyX2hwKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KEdhbWVFZmZlY3RJZC5wZXRfMjFfYWN0aXZlXzNfbGlhbmRhbyxjYy52MigwLDIwMCksdGhpcy5ub2RlLCgpPT57XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5wZXRfMjFfYWN0aXZlXzJfbGlhbmRhb19kcm9wX2hpdCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYodGhpcy5jaGFuZ2VfaHBfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZV9ocF9jYWxsYmFjayhudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHJldHVybiBpc0RpZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRCdWZmKGJ1ZmZEYXRhOiBCdWZmRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgaWYodGhpcy5tb25zdGVyX2J1ZmYuaGFzKGJ1ZmZEYXRhLmJ1ZmZfaWQpPT1mYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZT1udWxsO1xyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD09R2FtZUVmZmVjdElkLk51bGwpe1xyXG4gICAgICAgICAgICAgICAgbm9kZT1uZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24odGhpcy5qdWppX3Bvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLHRoaXMuanVqaV9wb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9dGhpcy5nZXRTaGVTaG91QXR0YWNrU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6QnVmZlRpbWVyPW5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmKCFidWZmKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmY9bm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1Zmbmsrvnlpfop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICBidWZmLmFkZFJlY292ZXJ5TGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb1JlY292ZXJ5OihudW06bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlSGVhbChudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sYnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCxidWZmKTtcclxuICAgICAgICAgICAgLy9idWZm6ZSA5q+B5pe25aSE55CGXHJcbiAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX3R5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5Nb3ZlU3BlZWRVcDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5BdHRTcGVlZFVwOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M5X1NraWxsXzFfZ3VvemFpOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnplbmdzaGFuZ19yYXRlKz1idWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UtPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlKihidWZmRGF0YS5idWZmX3ZhbHVlWzFdKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrKz10aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrKihidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy/lpoLmnpzmnIlidWZm77yM5YiZ5Yi35paw5pe26Ze0LOmHjeaWsOiuoeaXtlxyXG4gICAgICAgICAgICBsZXQgYnVmZj10aGlzLm1vbnN0ZXJfYnVmZi5nZXQoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3ViQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmPXRoaXMubW9uc3Rlcl9idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmKGJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmRGVzdG9yeShidWZmRGF0YTpCdWZmRGF0YSl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX3R5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLk1vdmVTcGVlZFVwOntcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLkF0dFNwZWVkVXA6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOV9Ta2lsbF8xX2d1b3phaTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnplbmdzaGFuZ19yYXRlLT1idWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZSs9dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UqKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMV0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YS5BdHRhY2stPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2sqKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2J1ZmYuaGFzKGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVmZihidWZmSWQ6IEJ1ZmZJZCk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9idWZmLmdldChidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmZUeXBlKGJ1ZmZUeXBlOiBCdWZmVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpc0hhdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIGlmKGlzSGF2ZT09ZmFsc2UgJiYgYnVmZi5nZXRCdWZmVHlwZSgpPT1idWZmVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGlzSGF2ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxCdWZmKCl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZERlQnVmZihidWZmRGF0YTpCdWZmRGF0YSxnakRhdGE6R29uZ0ppRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoYnVmZkRhdGEuYnVmZl9pZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+aOp+WItuexu+eahGRlYnVmZumcgOimgeagueaNrumfp+aAp+adpeWunueOsOWFt+S9k+eahOaViOaenFxyXG4gICAgICAgICAgICBsZXQgYnVmZlR5cGU9YnVmZkRhdGEuYnVmZl90eXBlOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZlR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5WZXJ0aWdvOntcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl90b3VnaG5lc3M+PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksRW5lbXlfSW5qdXJlZF9UeXBlLk1pYW5ZaUtvbmdaaGksbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNIYXZlQnVmZihCdWZmSWQuQm9zczNfTWlhbllpX0tvbmdaaGkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QnVmZihCdWZmSWQuQm9zczNfTWlhbllpX0tvbmdaaGkpLmFkZEZsb29yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdqRGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPUluanVyZWREYXRhLmNhbGNDb250cm9sVGltZShidWZmRGF0YS5yZW1haW5fdGltZSx0aGlzLmN1cl90b3VnaG5lc3MsZ2pEYXRhLmhlcm9fZGF0YS5pbnNpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWHVhbll1bjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy54dWFueXVuX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bzp7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/prYXmg5Hlr7lCT1NT5peg5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+i1sOWQkeiLsembhFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtZWltbz1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm8oSGVyb19UeXBlLk1laU1vKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW1Qb3M9bWVpbW8ubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3M9bW1Qb3Muc3ViKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFkaWFuPU1hdGguYXRhbjIob2Zmc2V0UG9zLnksb2Zmc2V0UG9zLngpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihyYWRpYW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5tb3ZlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOmNjLk5vZGU9bnVsbDtcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9PUdhbWVFZmZlY3RJZC5OdWxsKXtcclxuICAgICAgICAgICAgICAgIG5vZGU9bmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMuanVqaV9wb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCx0aGlzLmp1amlfcG9zLHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXRoaXMuZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjpCdWZmVGltZXI9bm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYoIWJ1ZmYpe1xyXG4gICAgICAgICAgICAgICAgYnVmZj1ub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlYnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vYnVmZuS8pOWus+inpuWPkeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5kYW1hZ2VfamlhbmdlX3RpbWU+MCYmZ2pEYXRhKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRGFtYWdlTGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb0RhbWFnZTooZ2pEYXRhOkdvbmdKaURhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVDb250aW51b3VzSW5qdXJlZChnakRhdGEsYnVmZi5nZXRGbG9vck51bSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LGdqRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCxidWZmKTtcclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZUeXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuVmVydGlnbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT10aGlzLmdldFh1YW55dW5TY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5TbG93ZG93bjp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpITnkIbkuIDkuIvlh4/pgJ9idWZmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5CdXJzdDp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpITnkIZidWZm54iG5Y+RXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYnVmZkRhdGEuYnVmZl9pZD09QnVmZklkLkhlcm9fTGVpU2hlbl9DaGFvRnVIZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGdqRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZi5hZGRCdXJzdExpc3RlbihidWZmRGF0YS5idWZmX3ZhbHVlWzBdLHRoaXMub25CdWZmQnVyc3QuYmluZCh0aGlzKSxnakRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X1NraWxsOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NhbGU9MS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9c2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKG5vZGUpLnRvKDAuMSx7c2NhbGU6c2NhbGUqMS4xLG9wYWNpdHk6MjU1fSkudG8oMC4xLHtzY2FsZTpub2RlLnNjYWxlLG9wYWNpdHk6MTI4fSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zc19Nb2RlX0ppYW5TaGFuZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qaWFuc2hhbmdfcmF0ZSs9YnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTnZXdV9FeFNraWxsX0ppYW5Hb25nU3U6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgYnVmZj10aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICAgICAgYnVmZi5yZWZyZXNoQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X1NraWxsOntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZT10aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmRGF0YS5idWZmX2lkKS5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZT0xL3RoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZSoxLjEsb3BhY2l0eToyNTV9KS50bygwLjEse3NjYWxlOm5vZGUuc2NhbGUsb3BhY2l0eToxMjh9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOS4gOS4qmRlYnVmZlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgZGVidWZm57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaXNOZWVkUmVjeWNsZSDmmK/lkKbpnIDopoHosIPnlKjlm57mlLZcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBzdWJEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZj10aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmKGJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlzSGF2ZURlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfZGVidWZmLmhhcyhidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlRGVCdWZmVHlwZShidWZmVHlwZTogQnVmZlR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNIYXZlPWZhbHNlO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIGlmKGlzSGF2ZT09ZmFsc2UgJiYgYnVmZi5nZXRCdWZmVHlwZSgpPT1idWZmVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmU9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGlzSGF2ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVtb3ZlQWxsRGVCdWZmKCl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3ViRGVCdWZmKHYuZ2V0QnVmZklkKCkpO1xyXG4gICAgICAgIH0pICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkRlYnVmZkRlc3RvcnkoYnVmZkRhdGE6QnVmZkRhdGEpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpOyAgXHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfdHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuVmVydGlnbzp7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19YdWFuWXVuOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMueHVhbnl1bl9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTWVpTW9fQWN0aXZlX01laUh1bzp7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mtheaDkeWvuUJPU1Pml6DmlYgs5b6A5LiL6LWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCkhPVN0cmVuZ3RoVHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW92ZURpcihNYXRoLlBJKjMvMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5TbG93ZG93bjp7XHJcbiAgICAgICAgICAgICAgICAvL+WkhOeQhuS4gOS4i+WHj+mAn2J1ZmZcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCh0aGlzLmhpZGRlbl9hdHRyaWJ1dGUuc2xvd19yZXNpc3RhbmNlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3NfTW9kZV9KaWFuU2hhbmc6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5qaWFuc2hhbmdfcmF0ZS09YnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX052V3VfRXhTa2lsbF9KaWFuR29uZ1N1OntcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoK2J1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnVmZkJ1cnN0KGJ1ZmZEYXRhOkJ1ZmZEYXRhLGdqRGF0YTpHb25nSmlEYXRhKXtcclxuICAgICAgICBpZihidWZmRGF0YS5idWZmX2lkPT1CdWZmSWQuSGVyb19MZWlTaGVuX0NoYW9GdUhlKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xlaUdvZFNraWxsMSk7XHJcbiAgICAgICAgICAgIC8qKuW9k+aVjOS6uui6q+S4iueahOi2hei0n+iNt+i+vuWIsDXlsYLml7bvvIzkvJrlj5fliLDokL3pm7fmlLvlh7vpgKDmiJB75Y+C5pWwMX3kvKTlrrPlubblh7vmmZV75Y+C5pWwMn3np5IgKi9cclxuICAgICAgICAgICAgbGV0IGRhdGE9dGhpcy5iZUZsYXNoSW5qdXJlZChnakRhdGEpO1xyXG4gICAgICAgICAgICBpZihkYXRhLmlzX2RpZT09ZmFsc2UmJmRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICAvL0dyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2tpbGxfZ3JvdW5kLHRoaXMuc2hhZG93LmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU9R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX3NreSx0aGlzLnNoYWRvdy5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGVYPTAuODtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGVZPTE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyYmZGF0YS5pc19kaWU9PWZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZkRhdGE9bmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZD1CdWZmSWQuSGVyb19YdWFuWXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPUdhbWVFZmZlY3RJZC54dWFueXVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLmJ1ZmZfdHlwZT1CdWZmVHlwZS5WZXJ0aWdvO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lPWdqRGF0YS5oZXJvX2RhdGEuZ2V0U2tpbGxWYWx1ZTIoU2tpbGxUeXBlLlBhc3NpdmVfMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREZUJ1ZmYoYnVmZkRhdGEsZ2pEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoq5Yi35paw56e76YCfLHNsb3dSZXNpc3RhbmNlOuWHj+mAn+aKl+aApyAqL1xyXG4gICAgcHJpdmF0ZSByZWZyZXNoTW92ZVNwZWVkKHNsb3dSZXNpc3RhbmNlOm51bWJlcil7XHJcbiAgICAgICAgLy/lrp7pmYXlh4/pgJ9cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9MzA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZT1Jbmp1cmVkRGF0YS5jYWxjU2xvd0Rvd25OdW0odGhpcy5iYXNlX2RhdGEuU3BlZWQrdGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlLHRoaXMuZ2V0TWF4U2xvd0Rvd25WYWx1ZSgpLHNsb3dSZXNpc3RhbmNlLHRoaXMuZ2V0TWF4U3BlZWRVcFZhbHVlKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldENvbG9yKHRoaXMuY3VyX21vdmVfc3BlZWQ8dGhpcy5iYXNlX2RhdGEuU3BlZWQ/Q29sb3JUeXBlLlNsb3dEb3duOkNvbG9yVHlwZS5OdWxsKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCkhPVN0cmVuZ3RoVHlwZS5Cb3NzKVxyXG4gICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPXRoaXMuY3VyX21vdmVfc3BlZWQvKHRoaXMuYmFzZV9kYXRhLlNwZWVkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvLyAvKirliLfmlrDlh4/pgJ9idWZm55qE5aSE55CGICovXHJcbiAgICAvLyBwcml2YXRlIHJlZnJlc2hTbG93ZG93bigpe1xyXG4gICAgLy8gICAgIC8v5om+5Ye65omA5pyJ5YeP6YCf57G75Z6L55qEYnVmZlxyXG4gICAgLy8gICAgIGxldCBzbG93QnVmZj1uZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgLy8gICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgLy8gICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNsb3dkb3duKXtcclxuICAgIC8vICAgICAgICAgICAgIHNsb3dCdWZmLnB1c2godik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICBpZihzbG93QnVmZi5sZW5ndGg+MCl7XHJcbiAgICAvLyAgICAgICAgIHNsb3dCdWZmLnNvcnQoKGEsYik9PntcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgbGV0IG1heEJ1ZmY9c2xvd0J1ZmZbMF07XHJcbiAgICAvLyAgICAgICAgIC8v5a6e6ZmF5YeP6YCfXHJcbiAgICAvLyAgICAgICAgIGxldCB2YWx1ZT1Jbmp1cmVkRGF0YS5jYWxjU2xvd0Rvd25OdW0odGhpcy5iYXNlX2RhdGEuU3BlZWQsbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UsdGhpcy5nZXRNYXhTcGVlZFVwVmFsdWUoKSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dmFsdWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLlNsb3dEb3duKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmJhc2VfZGF0YS5TcGVlZDtcclxuICAgIC8vICAgICAgICAgdGhpcy5zZXRDb2xvcihDb2xvclR5cGUuTnVsbCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIC8qKuWIt+aWsOWKoOmAn2J1ZmbnmoTlpITnkIYgKi9cclxuICAgIC8vIHByaXZhdGUgcmVmcmVzaFNwZWVkVXAoKXtcclxuICAgIC8vICAgICAvL+aJvuWHuuaJgOacieWKoOmAn+exu+Wei+eahGJ1ZmZcclxuICAgIC8vICAgICBsZXQgc3BlZWRCdWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgLy8gICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNwZWVkVXApe1xyXG4gICAgLy8gICAgICAgICAgICAgc3BlZWRCdWZmLnB1c2godik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICBpZihzcGVlZEJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgLy8gICAgICAgICBzcGVlZEJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICBsZXQgbWF4QnVmZj1zcGVlZEJ1ZmZbMF07XHJcbiAgICAvLyAgICAgICAgIC8v5a6e6ZmF5Yqg6YCf6YCfXHJcbiAgICAvLyAgICAgICAgIGxldCBvZmZzZXRWYWx1ZT10aGlzLmJhc2VfZGF0YS5TcGVlZCptYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAvLyAgICAgICAgIC8vbGV0IHZhbHVlPUluanVyZWREYXRhLmNhbGNTbG93RG93bk51bSgsbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQrb2Zmc2V0VmFsdWU7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIC8qKuWKoOWHj+mAn+mcgOimgeWkhOeQhu+8jOWIpOaWreWHj+mAnyAqL1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuYmFzZV9kYXRhLlNwZWVkO1xyXG4gICAgLy8gICAgIH0gICAgICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKuiOt+W+l+acgOWkp+WAvOeahOWHj+mAn+avlOeOhyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXhTbG93RG93blZhbHVlKCk6bnVtYmVye1xyXG4gICAgICAgIC8v5om+5Ye65omA5pyJ5Yqg6YCf57G75Z6L55qEYnVmZlxyXG4gICAgICAgIGxldCBidWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuZ2V0QnVmZlR5cGUoKT09QnVmZlR5cGUuU2xvd2Rvd24pe1xyXG4gICAgICAgICAgICAgICAgYnVmZi5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoYnVmZi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIGJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWF4QnVmZj1idWZmWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKirojrflvpfmnIDlpKflgLznmoTliqDpgJ/mr5TnjocgKi9cclxuICAgIHByaXZhdGUgZ2V0TWF4U3BlZWRVcFZhbHVlKCk6bnVtYmVye1xyXG4gICAgICAgIC8v5om+5Ye65omA5pyJ5Yqg6YCf57G75Z6L55qEYnVmZlxyXG4gICAgICAgIGxldCBzcGVlZEJ1ZmY9bmV3IEFycmF5PEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuZ2V0QnVmZlR5cGUoKT09QnVmZlR5cGUuTW92ZVNwZWVkVXApe1xyXG4gICAgICAgICAgICAgICAgc3BlZWRCdWZmLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihzcGVlZEJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBzcGVlZEJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWF4QnVmZj1zcGVlZEJ1ZmZbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruaUu+mAn++8jOavj+enkuaUu+WHu+asoeaVsCAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBdHRhY2tTcGVlZChudW1TZWM6bnVtYmVyKXtcclxuICAgICAgICBpZihudW1TZWM+MTApe1xyXG4gICAgICAgICAgICBudW1TZWM9MTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG51bVNlYzwwLjEpe1xyXG4gICAgICAgICAgICBudW1TZWM9MC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmF0dF9qaWFuZ2U9MS9udW1TZWM7XHJcbiAgICB9XHJcbiAgICAvKirmlLnlj5jlvZPliY3mlLvpgJ8scmF0ZTrmr5TnjocgKi9cclxuICAgIHByb3RlY3RlZCBjaGFuZ2VBdHRhY2tTcGVlZChyYXRlOm51bWJlcil7XHJcbiAgICAgICAgbGV0IGdqc2Q9dGhpcy5nZXRBdHRhY2tTcGVlZCgpOyAgICAgICAgXHJcbiAgICAgICAgZ2pzZCs9KHJhdGUpKih0aGlzLmJhc2VfZGF0YS5BdHRhY2tTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRhY2tTcGVlZChnanNkKTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+W9k+WJjeaUu+mAnyAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEF0dGFja1NwZWVkKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiAxL3RoaXMuYXR0X2ppYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorqHnrpfph43kvKTvvIzlj5bmnIDlpKcgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhTZXJpb3VzbHkoKTpudW1iZXJ7XHJcbiAgICAgICAgLy/mib7lh7rmiYDmnInph43kvKTnsbvlnovnmoRidWZmXHJcbiAgICAgICAgbGV0IHNlcmlvdXNseUJ1ZmY9bmV3IEFycmF5PEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5nZXRCdWZmVHlwZSgpPT1CdWZmVHlwZS5TZXJpb3VzbHlJbmp1cmVkKXtcclxuICAgICAgICAgICAgICAgIHNlcmlvdXNseUJ1ZmYucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHNlcmlvdXNseUJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBzZXJpb3VzbHlCdWZmLnNvcnQoKGEsYik9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IG1heEJ1ZmY9c2VyaW91c2x5QnVmZlswXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq5YWJ546vLeW8gOWniyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4gICAgYWRkSGFsbyhoYWxvRGF0YTpIYWxvRGF0YSl7XHJcbiAgICAgICAgaWYoIXRoaXMubW9uc3Rlcl9oYWxvLmhhcyhoYWxvRGF0YS5oYWxvX2lkKSl7XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9oYWxvLnNldChoYWxvRGF0YS5oYWxvX2lkLGhhbG9EYXRhKTtcclxuICAgICAgICAgICAgc3dpdGNoKGhhbG9EYXRhLmhhbG9faWQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3RlcjMwX0JpYW5GdV9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZSs9aGFsb0RhdGEuaGFsb192YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXI2OV9OaXVTYU1hbl9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X2RlZmVuc2VfdmFsdWUrPWhhbG9EYXRhLmhhbG9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyNzZfSmlhbkR1WmhlX1NraWxsX0hhbG86e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZSs9dGhpcy5iYXNlX2RhdGEuU3BlZWQqKGhhbG9EYXRhLmhhbG9fdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEhhbG8oaGFsb0lkOkhhbG9JZCk6SGFsb0RhdGF7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9oYWxvLmdldChoYWxvSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUhhbG8oaGFsb0lkOkhhbG9JZCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2hhbG8uaGFzKGhhbG9JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViSGFsbyhoYWxvSWQ6SGFsb0lkLHV1aWQ6c3RyaW5nKXtcclxuICAgICAgICBsZXQgaGFsb0RhdGE9dGhpcy5tb25zdGVyX2hhbG8uZ2V0KGhhbG9JZCk7XHJcbiAgICAgICAgaWYoaGFsb0RhdGEpe1xyXG4gICAgICAgICAgICAvL+WPquacieWQjOa6kOaJjeWPr+S7peenu+mZpFxyXG4gICAgICAgICAgICBpZihoYWxvRGF0YS5oYWxvX3NvdXJjZV91dWlkPT11dWlkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9oYWxvLmRlbGV0ZShoYWxvSWQpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGhhbG9JZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3RlcjMwX0JpYW5GdV9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9taXNzX3JhdGUtPWhhbG9EYXRhLmhhbG9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZXhfbWlzc19yYXRlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9taXNzX3JhdGU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyNjlfTml1U2FNYW5fU2tpbGxfSGFsbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfZGVmZW5zZV92YWx1ZS09aGFsb0RhdGEuaGFsb192YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5leF9kZWZlbnNlX3ZhbHVlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3Rlcjc2X0ppYW5EdVpoZV9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlLT10aGlzLmJhc2VfZGF0YS5TcGVlZCooaGFsb0RhdGEuaGFsb192YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxIYWxvKCl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2hhbG8uY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlhYnnjq8t57uT5p2fKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG4gICAgZ2V0SGlkZGVuQXR0cmlidXRlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuX2F0dHJpYnV0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0RpZSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX3N0YXRlPT1FbmVteV9TdGF0ZS5kaWV8fHRoaXMubW9uc3Rlcl9zdGF0ZT09RW5lbXlfU3RhdGUuc2hpcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFbmVteVN0YXRlKCk6RW5lbXlfU3RhdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZW15UHJldlN0YXRlKCk6RW5lbXlfU3RhdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2X3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzQ2FuQ2hlY2soKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGlzQ2FuPXRydWU7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpIHx8IHRoaXMubm9kZS55Pj1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZW15X2NyZWF0ZV95ICB8fCB0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUuYm9ybilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlzQ2FuPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNDYW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG91Z2huZXNzKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl90b3VnaG5lc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF4SHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VySHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VyQXR0KCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9hdHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29sb3IoY29sb3JUeXBlOkNvbG9yVHlwZSl7XHJcbiAgICAgICAgbGV0IGNvbG9yPWNjLkNvbG9yLldISVRFO1xyXG4gICAgICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5TbG93ZG93bikpe1xyXG4gICAgICAgICAgICBjb2xvcj1jYy5jb2xvcig4MiwyNTUsMjUyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoKGNvbG9yVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgQ29sb3JUeXBlLkluanVyZWQ6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1ckNvbG9yPXRoaXMuY3VyX2NvbG9yO1xyXG4gICAgICAgICAgICAgICAgaWYoY3VyQ29sb3IhPUNvbG9yVHlwZS5Jbmp1cmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmluanVyZWRfYWN0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb249Y2MudHdlZW4odGhpcy5ub2RlKS50bygwLjEse2NvbG9yOnRoaXMubm9kZS5jb2xvcn0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDb2xvcihjdXJDb2xvcilcclxuICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29sb3JUeXBlLlNsb3dEb3duOntcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDgyLDI1NSwyNTIpO1xyXG4gICAgICAgICAgICB9YnJlYWs7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJfY29sb3I9Y29sb3JUeXBlO1xyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvcj1jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJDb2xvcigpOkNvbG9yVHlwZXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2xvd0Rvd25Db2xvcigpOmNjLkNvbG9ye1xyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcig4MiwyNTUsMjUyKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBdHREYXRhKGRhbWFnZVR5cGU6RGFtYWdlVHlwZSxpc0J1bGxldDpib29sZWFuLHNraWxsUmF0ZTpudW1iZXI9MCk6TW9uc3RlckF0dERhdGF7XHJcbiAgICAgICAgbGV0IG1kPW5ldyBNb25zdGVyQXR0RGF0YSgpO1xyXG4gICAgICAgIG1kLmRhbWFnZV90eXBlPWRhbWFnZVR5cGU7XHJcbiAgICAgICAgbWQuaXNfYnVsbGV0PWlzQnVsbGV0O1xyXG4gICAgICAgIG1kLnNraWxsX3JhdGU9c2tpbGxSYXRlO1xyXG4gICAgICAgIG1kLm1vbnN0ZXJfYXR0cmlidXRlPXRoaXMubW9uc3Rlcl9kYXRhO1xyXG4gICAgICAgIG1kLnplbmdzaGFuZ19yYXRlPXRoaXMuemVuZ3NoYW5nX3JhdGU7XHJcbiAgICAgICAgbWQubW9uc3Rlcl90cz10aGlzO1xyXG4gICAgICAgIG1kLnN0cmVuZ3RoX3R5cGU9dGhpcy5nZXRTdHJlbmd0aFR5cGUoKTtcclxuICAgICAgICByZXR1cm4gbWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNGdWxsSHAoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2hwPj10aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRFbmVteVN0YXRlKHR5cGU6RW5lbXlfU3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodHlwZSE9dGhpcy5tb25zdGVyX3N0YXRlKXtcclxuICAgICAgICAgICAgdGhpcy5wcmV2X3N0YXRlPXRoaXMubW9uc3Rlcl9zdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX3N0YXRlPXR5cGU7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGU9PUVuZW15X1N0YXRlLmF0dHx8dHlwZT09RW5lbXlfU3RhdGUuc2tpbGwpe1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT0oMS90aGlzLmJhc2VfZGF0YS5BdHRhY2tTcGVlZCkvdGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlPT1FbmVteV9TdGF0ZS5tb3ZlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9dGhpcy5jdXJfbW92ZV9zcGVlZC8odGhpcy5iYXNlX2RhdGEuU3BlZWQpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydERlYXRoKCl7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmRpZSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkPWZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5zcGluZS5wYXVzZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQ9dGhpcy5pc19jb3VudDtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLndpbGxEZXN0cm95TW9uc3Rlcih0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmRlYXRoX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5kZWF0aF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEh1cnQoKXtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5Jbmp1cmVkKTsgICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYW1hZ2Ug5Lyk5a6z5YC8XHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlVHlwZSDkvKTlrrPnsbvlnotcclxuICAgICAqL1xyXG4gICAgaW5qdXJlV2FsbChkYXRhOk1vbnN0ZXJBdHREYXRhKTpJbmp1cmVkRGF0YXtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdHRfd2FsbC5iZUluanVyZWQoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7kuIDkuKrpqqjpqrzliqjnlLtcclxuICAgICAqIEBwYXJhbSBuYW1lIOmqqOmqvOWKqOeUu+WQjeensFxyXG4gICAgICogQHBhcmFtIGlzTG9vcCDmmK/lkKblvqrnjq9cclxuICAgICAqIEBwYXJhbSBkYXRhIOaYr+WQpuebkeWQrOWFs+mUruW4p++8jOWFs+mUruW4p+aVsOaNruWMheWQq+WFs+mUruW4p+WQjeensO+8jOebkeWQrOWIsOWFs+mUruW4p+WQjueahOWbnuiwg1xyXG4gICAgICogQHBhcmFtIGVuZENhbGxiYWNrIOaSreaUvue7k+adn+WQjueahOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwbGF5U3BpbkFuaW1hdG9uKG5hbWU6c3RyaW5nLGlzTG9vcDpib29sZWFuPWZhbHNlLGRhdGE/OktleUZyYW1lRGF0YSxlbmRDYWxsYmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5kaWUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsaXNMb29wKTtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGEubmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICAgICAgYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlEZWFkQW5pbWF0b24obmFtZTpzdHJpbmcsZW5kQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBhbmltYT10aGlzLnNwaW5lLnNldEFuaW1hdGlvbigwLG5hbWUsZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgICAgICBhbmltYS5saXN0ZW5lcj1udWxsO1xyXG4gICAgICAgICAgICBlbmRDYWxsYmFjaygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvKirorr7nva5Y5Z2Q5qCH77yM6L+U5Zue5YGP5bem6L+Y5piv5YGP5Y+z5LqGLC0xOuWBj+W3pu+8jDDvvJrmraPluLjvvIwx77ya5YGP5Y+zICovXHJcbiAgICBzZXRYKGRpc1g6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGxlZnRSaWdodD0wO1xyXG4gICAgICAgIGlmKGRpc1g+MzAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGlzWD0zMDA7XHJcbiAgICAgICAgICAgIGxlZnRSaWdodD0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkaXNYPC0zMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNYPS0zMDA7XHJcbiAgICAgICAgICAgIGxlZnRSaWdodD0tMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLng9ZGlzWDtcclxuICAgICAgICByZXR1cm4gbGVmdFJpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFkoZGlzWTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubm9kZS55PWRpc1k7XHJcbiAgICAgICAgLy/kuI3og73nqb/ov4fln47loplcclxuICAgICAgICBsZXQgd2FsbHM9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbGxXYWxsKCk7XHJcbiAgICAgICAgd2FsbHMuZm9yRWFjaCgod2FsbDpXYWxsLHdhbGxUeXBlOldhbGxUeXBlKT0+e1xyXG4gICAgICAgICAgICAvL+ajgOafpeWfjuWimVxyXG4gICAgICAgICAgICBsZXQgcmVjdD13YWxsLmdldFdhbGxSZWN0KCk7XHJcbiAgICAgICAgICAgIGlmKHJlY3QuY29udGFpbnModGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpKXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55PndhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueT1yZWN0LnlNYXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUueTx3YWxsLm5vZGUueSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnk9cmVjdC55TWluO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IG1haW5XYWxsPVdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKTtcclxuICAgICAgICBsZXQgbWFpblJlY3Q9bWFpbldhbGwuZ2V0V2FsbFJlY3QoKTtcclxuXHJcbiAgICAgICAgaWYobWFpblJlY3QuY29udGFpbnModGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpKXtcclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+bWFpbldhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55PW1haW5SZWN0LnlNYXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk8bWFpbldhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55PW1haW5SZWN0LnlNaW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vbkNvbGxpc2lvblNoaXAoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk8bWFpblJlY3QueU1pbil7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS55PD1tYWluUmVjdC55TWluLTIwMCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55PW1haW5SZWN0LnlNaW4tMjAwO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vbnN0ZXJfc3RhdGUhPUVuZW15X1N0YXRlLnNoaXApe1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaGlwX21vbnN0ZXJfbnVtKys7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNoaXApO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS51cFNoaXBNb25zdGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ29sbGlzaW9uU2hpcCgpe1xyXG4gICAgICAgIGxldCBtZD1uZXcgTW9uc3RlckF0dERhdGEoKTtcclxuICAgICAgICBtZC5kYW1hZ2VfdHlwZT1EYW1hZ2VUeXBlLlNoaXA7XHJcbiAgICAgICAgbWQuaXNfYnVsbGV0PWZhbHNlO1xyXG4gICAgICAgIG1kLnNraWxsX3JhdGU9MDtcclxuICAgICAgICBtZC5tb25zdGVyX2F0dHJpYnV0ZT10aGlzLm1vbnN0ZXJfZGF0YTtcclxuICAgICAgICBtZC56ZW5nc2hhbmdfcmF0ZT10aGlzLnplbmdzaGFuZ19yYXRlO1xyXG4gICAgICAgIG1kLm1vbnN0ZXJfdHM9dGhpcztcclxuICAgICAgICBtZC5zdHJlbmd0aF90eXBlPXRoaXMuZ2V0U3RyZW5ndGhUeXBlKClcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYmVJbmp1cmVkKG1kLGZhbHNlLHRoaXMuZ2V0Q3VySHAoKSowLjIpXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcCgtOTk5OTk5OTk5OSk7XHJcbiAgICB9XHJcbiAgICBzZXRQb3MocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIHRoaXMuc2V0WChwb3MueCk7XHJcbiAgICAgICAgdGhpcy5zZXRZKHBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb3ZlRGlyKGRpcjpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249ZGlyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFFpYW5ZaW5NaW4obnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5taW5fcWlhbnlpbj09MClcclxuICAgICAgICB0aGlzLm1pbl9xaWFueWluPW51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRRaWFuWWluTWluKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9xaWFueWluO1xyXG4gICAgfVxyXG4gICAgLyoq6K6+572u57+76L2sICovXHJcbiAgICBzZXRGbGlwKGlzUmlnaHQ6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD1pc1JpZ2h0P3RoaXMuc2V0dXBfc2NhbGU6LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICB9XHJcbiAgICAvL+makOiXj+mYtOW9sVxyXG4gICAgaGlkU2hhZG93KCl7XHJcbiAgICAgICAgdGhpcy5zaGFkb3cub3BhY2l0eT0wO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5ocF9wcm9ncmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfcHJvZ3Jlc3Muc2V0UG9zKHRoaXMubm9kZS54K3RoaXMuaHBfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmhwX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54K3RoaXMubm9kZS5zY2FsZVgqdGhpcy5zaGFkb3dfcG9zLngsdGhpcy5ub2RlLnkrdGhpcy5ub2RlLnNjYWxlWSp0aGlzLnNoYWRvd19wb3MueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PShNYXRoLnJvdW5kKDgwMDAtdGhpcy5ub2RlLnkqMTApKTtcclxuICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYm9ybiYmdGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk+PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfY3JlYXRlX3kpe1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1RFU1RcclxuICAgICAgICAvLyBpZih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUubW92ZSl7XHJcbiAgICAgICAgLy8gICAgIGxldCBhbGxNb25zdGVyPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAvLyAgICAgbGV0IGxlbj1hbGxNb25zdGVyLmxlbmd0aDtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IG1vbnN0ZXI9YWxsTW9uc3RlcltpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgLy8gICAgICAgICBpZihtb25zdGVyJiZtb25zdGVyLnV1aWQhPXRoaXMudXVpZCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy/liKTmlq3ot53nprtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgb3RoZXJQb3M9bW9uc3Rlci5nZXRDZW50ZXJQb3MoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgc2VsZlBvcz10aGlzLmdldENlbnRlclBvcygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBkaXN0YW5jZT0ob3RoZXJQb3Muc3ViKHNlbGZQb3MpLm1hZygpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihkaXN0YW5jZTw9NTApe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvL+S6pOmbhuS6hlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvL+S4iumdoueahOi1sOWIh+e6v++8jOS4i+mdoueahOWeguebtOi1sOS4i1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihzZWxmUG9zLnk+b3RoZXJQb3MueSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RGlyPXRoaXMubW92ZV9kaXJlY3Rpb24rTWF0aC5QSS8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYoIG5ld0RpciA8PU1hdGguUEkgJiYgbmV3RGlyPj0wKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEaXI9dGhpcy5tb3ZlX2RpcmVjdGlvbi1NYXRoLlBJLzJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249bmV3RGlyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZSBpZihzZWxmUG9zLnk8b3RoZXJQb3MueSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPU1hdGguUEkqMy8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mt7vliqDlm57osIPnm5HlkKwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIGFkZEluaXRMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZENoYW5nZUhwTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmNoYW5nZV9ocF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZFh1YW5ZdW5MaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZERlYXRoQ2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuZGVhdGhfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9ICAgIFxyXG4gICAgYWRkSW5qdXJ5Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlX2luanVyeV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeiOt+W+l+avj+enjeaAqueJqeS4jeWQjOeahOaVsOaNriAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkSW5pdFBvcygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blrozmlbDmja7lsLHliKDpmaTkuoZcclxuICAgICAgICBsZXQganVqaT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2p1amknKTtcclxuICAgICAgICB0aGlzLmp1amlfcG9zPWp1amkuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgZ29uZ2ppPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ29uZ2ppJyk7XHJcbiAgICAgICAgdGhpcy5hdHRfcG9zPWdvbmdqaS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBocD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hwJyk7XHJcbiAgICAgICAgdGhpcy5ocF9wb3M9aHAuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgc2hhZG93Tm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfU2hhZG93Jyk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dfcG9zPXNoYWRvd05vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLnNoYWRvd19zaXplPXNoYWRvd05vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICBsZXQgY2VudGVyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2VudGVyJyk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfcG9zPWNlbnRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIC8vY2MubG9nKHRoaXMuc2hhZG93X3NpemUpO1xyXG5cclxuICAgICAgICBqdWppLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBnb25namkucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGhwLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBzaGFkb3dOb2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBjZW50ZXIucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGlmKHRoaXMuc2hhZG93KXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24oY2MudjIodGhpcy5ub2RlLngrdGhpcy5ub2RlLnNjYWxlWCp0aGlzLnNoYWRvd19wb3MueCx0aGlzLm5vZGUueSt0aGlzLm5vZGUuc2NhbGVZKnRoaXMuc2hhZG93X3Bvcy55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dFBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgbGV0IHBvcz1jYy52MigwLDEyOCk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMubW9uc3Rlcl90eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAyMDogcG9zPWNjLnYyKDAsMTI4KTticmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogcG9zPXRoaXMuYXR0X3BvczticmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc1Bvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQoY2MudjIocG9zLngqdGhpcy5ub2RlLnNjYWxlWCxwb3MueSp0aGlzLm5vZGUuc2NhbGVZKSk7XHJcbiAgICAgICAgcmV0dXJuIGRpc1BvcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRKdUppUG9zKCk6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLm5vZGUueCt0aGlzLmp1amlfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmp1amlfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hlU2hvdVBvcygpOmNjLlZlYzJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLngrdGhpcy5qdWppX3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrdGhpcy5qdWppX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENlbnRlclBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54K3RoaXMuY2VudGVyX3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrdGhpcy5jZW50ZXJfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5pS75Ye75Z+O5aKZ55qEWOWdkOagh++8jOWKqOS9nOS4jeS4gOagt+WvvOiHtOaUu+WHu+eahFjlnZDmoIfkuI3kuIDoh7QgKi9cclxuICAgIGdldEF0dGFja1dhbGxYKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0X3BvcztcclxuICAgIH1cclxufVxyXG4iXX0=