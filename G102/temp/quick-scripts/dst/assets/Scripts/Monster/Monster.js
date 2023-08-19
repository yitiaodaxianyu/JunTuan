
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
    Monster.prototype.dieByfuhuo = function () {
        this.setEnemyState(EnemyConfig_1.Enemy_State.move);
        this.changeHp(-9999999999);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBMkc7QUFDM0csaURBQTRDO0FBQzVDLGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFFekMsNkNBQXdMO0FBQ3hMLDREQUF3RjtBQUN4RixtREFBOEM7QUFDOUMsMEVBQTZHO0FBQzdHLHVEQUFrRDtBQUNsRCwwQ0FBOEQ7QUFFOUQsMkRBQWlFO0FBQ2pFLHNEQUErRztBQUMvRyxvREFBK0M7QUFDL0Msa0RBQWlEO0FBQ2pELHFEQUFnRDtBQUVoRCwwREFBcUQ7QUFDckQsb0RBQTBEO0FBRTFELG1EQUE4QztBQUl4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyx1QkFBdUI7QUFFdkI7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUFpaURDO1FBL2hEYSxXQUFLLEdBQWMsSUFBSSxDQUFDO1FBQ2xDLFVBQVU7UUFDQSxlQUFTLEdBQWlCLDZCQUFlLENBQUMsS0FBSyxDQUFDO1FBQzFELFVBQVU7UUFDSCxnQkFBVSxHQUFTLEtBQUssQ0FBQztRQUNoQyxVQUFVO1FBQ0EsbUJBQWEsR0FBUSxDQUFDLENBQUM7UUFDakMsWUFBWTtRQUNGLHFCQUFlLEdBQVEsQ0FBQyxDQUFDO1FBQ25DLFVBQVU7UUFDSCxrQkFBWSxHQUFTLENBQUMsQ0FBQztRQUM5QixzQkFBc0I7UUFDWixrQkFBWSxHQUE4QixJQUFJLENBQUM7UUFDekQsb0JBQW9CO1FBQ1YseUJBQW1CLEdBQThCLElBQUksQ0FBQztRQUNoRSxhQUFhO1FBQ0gsZUFBUyxHQUF1QixJQUFJLENBQUM7UUFDL0MsYUFBYTtRQUNiLHNCQUFnQixHQUFpQixJQUFJLENBQUM7UUFDNUIsb0JBQWMsR0FBUyxDQUFDLENBQUM7UUFDekIscUJBQWUsR0FBVSxJ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aWlEM0I7SUFBRCxjQUFDO0NBamlERCxBQWlpREMsQ0FqaURvQyxFQUFFLENBQUMsU0FBUyxHQWlpRGhEO2tCQWppRG9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmVteV9TdGF0ZSwgRW5lbXlfQnVmZl9UeXBlLCBFbmVteV9EZUJ1ZmZfVHlwZSwgRW5lbXlfSW5qdXJlZF9UeXBlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCBIcFByb2dyZXNzQmFyIGZyb20gXCIuL0hwUHJvZ3Jlc3NCYXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHb25nSmlEYXRhIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgeyAgS2V5RnJhbWVEYXRhLCBNb25zdGVyRmFjZU5hbWUsIE1vbnN0ZXJTa2luVHlwZSwgSW5qdXJlZERhdGEsIEZlZWRCYWNrVHlwZSwgIFN0cmVuZ3RoVHlwZSwgSGlkZGVuQXR0cmlidXRlLCBNb25zdGVyQXR0RGF0YSwgTW9uc3RlclNraWxsRGF0YSwgQ29sb3JUeXBlIH0gZnJvbSBcIi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJDb25maWd1cmUsIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMsIE1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVN0YXRlLCBUZXh0X1R5cGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4uL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBIYWxvRGF0YSwgSGFsb0lkLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQnVmZlRpbWVyIGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZlRpbWVyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckF0dHJpYnV0ZSB9IGZyb20gXCIuL0RhdGEvTW9uc3RlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJTa2lsbE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJTa2lsbFwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi9XYWxsL1dhbGxDb25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoq5oCq54mp6YCa55So57G777yM5Y+q5aSE55CG5pWw5o2u77yM5LiN5aSE55CG6KGo546wICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbnN0ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgc3BpbmU6IHNwLlNrZWxldG9uPW51bGw7XHJcbiAgICAvKirnmq7ogqTnsbvlnosgKi9cclxuICAgIHByb3RlY3RlZCBza2luX3R5cGU6TW9uc3RlclNraW5UeXBlPU1vbnN0ZXJTa2luVHlwZS5Ta2luMTtcclxuICAgIC8qKuaAqueJqWlkICovXHJcbiAgICBwdWJsaWMgbW9uc3Rlcl9pZDogbnVtYmVyPTEwMDExO1xyXG4gICAgLyoq5oCq54mp562J57qnICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9sZXZlbDpudW1iZXI9MTtcclxuICAgIC8qKuaAqueJqeihgOmHj+ezu+aVsCAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfaHBfcmF0ZTpudW1iZXI9MTtcclxuICAgIC8qKuaAqueJqeenjeexuyAqL1xyXG4gICAgcHVibGljIG1vbnN0ZXJfdHlwZTogbnVtYmVyPTE7XHJcbiAgICAvKirmgKrniannmoTmnIDnu4jmiJjmlpfkvb/nlKjnmoTmlbDlgLws5Y+v5pu05pS5ICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9kYXRhOiBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXM9bnVsbDtcclxuICAgIC8qKuaAqueJqeeahOWfuuehgOaImOaWl+aVsOWAvO+8jOS4jeWPr+abtOaUuSAqL1xyXG4gICAgcHJvdGVjdGVkIGJhc2VfYXR0cmlidXRlX2RhdGE6IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcz1udWxsO1xyXG4gICAgLyoq5oCq54mp55qE5Z+656GA5pWw5YC8ICovXHJcbiAgICBwcm90ZWN0ZWQgYmFzZV9kYXRhOiBKc29uTW9uc3RlckNvbmZpZ3VyZT1udWxsO1xyXG4gICAgLyoq5oCq54mp55qE6ZqQ6JeP5bGe5oCnICovXHJcbiAgICBoaWRkZW5fYXR0cmlidXRlOkhpZGRlbkF0dHJpYnV0ZT1udWxsO1xyXG4gICAgcHJvdGVjdGVkIGN1cl9tb3ZlX3NwZWVkOiBudW1iZXI9MDtcclxuICAgIHByb3RlY3RlZCBtb3ZlX3RhcmdldF9wb3M6IGNjLlZlYzI9bnVsbDtcclxuICAgIHByb3RlY3RlZCBtb3ZlX2RpcmVjdGlvbjpudW1iZXI9TWF0aC5QSSozLzI7XHJcbiAgICAvKirmnJ3lkJHlkI3np7AgKi9cclxuICAgIHByb3RlY3RlZCBmYWNlX3R5cGU6TW9uc3RlckZhY2VOYW1lPU1vbnN0ZXJGYWNlTmFtZS5Gcm9udDtcclxuICAgIC8qKuW9k+WJjeeahOihgOmHjyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl9ocDogbnVtYmVyPTA7XHJcbiAgICAvKirmnIDlpKfnmoTooYDph48gKi9cclxuICAgIHByb3RlY3RlZCBtYXhfaHA6IG51bWJlcj0wO1xyXG4gICAgLyoq6KGA5p2h6L+b5bqm5p2hICovXHJcbiAgICBwcm90ZWN0ZWQgaHBfcHJvZ3Jlc3M6IEhwUHJvZ3Jlc3NCYXI9bnVsbDsgICAgXHJcbiAgICAvKirpmLTlvbEgKi9cclxuICAgIHByb3RlY3RlZCBzaGFkb3c6IGNjLk5vZGU9bnVsbDtcclxuICAgIHNoYWRvd19wb3M6IGNjLlZlYzI9bnVsbDtcclxuICAgIHNoYWRvd19zaXplOiBjYy5TaXplPW51bGw7XHJcbiAgICAvKirlh4/kvKTnjocgKi9cclxuICAgIGppYW5zaGFuZ19yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5aKe5Lyk546HICovXHJcbiAgICB6ZW5nc2hhbmdfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKuaUu+WHu+mXtOmalO+8iOenku+8jOihqOekuuWkmuWwkeenkuaUu+WHu+S4gOasoe+8iSAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dF9qaWFuZ2U6IG51bWJlcj0xO1xyXG4gICAgLyoq5pS75Ye76K6h5pe2ICovXHJcbiAgICBwcm90ZWN0ZWQgYXR0X2ppc2h1OiBudW1iZXI9MDtcclxuICAgIC8qKuaKgOiDveiuoeaXtiAqL1xyXG4gICAgcHJvdGVjdGVkIHNraWxsX2ppc2h1OiBudW1iZXI9MDtcclxuICAgIC8qKuW9k+WJjeeahOaUu+WHu+WKmyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl9hdHQ6IG51bWJlcj0wO1xyXG4gICAgLyoq5b2T5YmN55qE6Z+n5oCnICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX3RvdWdobmVzczpudW1iZXI9MDtcclxuICAgIC8qKuaUu+WHu+ebruaghyzmlLvlh7vnm67moIfkuLpudWxs5pe277yM55uu5qCH5bCx5piv5Z+O5aKZICovXHJcbiAgICBwcm90ZWN0ZWQgYXR0X3RhcmdldDpjYy5Ob2RlPW51bGw7ICAgIFxyXG4gICAgLyoq5oCq54mp5b2T5YmN55qE54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9zdGF0ZTogRW5lbXlfU3RhdGU9RW5lbXlfU3RhdGUuc3RhbmRieTtcclxuICAgIC8qKuaAqueJqeS4iuS4gOS4queKtuaAgSAqL1xyXG4gICAgcHJvdGVjdGVkIHByZXZfc3RhdGU6IEVuZW15X1N0YXRlPUVuZW15X1N0YXRlLnN0YW5kYnk7XHJcbiAgICAvKirmgKrnianlvZPliY3mi6XmnInnmoRidWZmICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9idWZmOiBNYXA8QnVmZklkLEJ1ZmZUaW1lcj49bnVsbDtcclxuICAgIC8qKuaAqueJqeW9k+WJjeaLpeacieeahGRlYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfZGVidWZmOiBNYXA8QnVmZklkLEJ1ZmZUaW1lcj49bnVsbDtcclxuICAgIC8qKuaMh+WumueahOe8qeaUvuWAvCovXHJcbiAgICBwcm90ZWN0ZWQgc2V0dXBfc2NhbGU6bnVtYmVyPTAuNDtcclxuICAgIHByb3RlY3RlZCBpc19ib3NzOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBwdWJsaWMgaXNfY2FuX2NvdW50OmJvb2xlYW49dHJ1ZTtcclxuICAgIHByb3RlY3RlZCBpc19jb3VudDpib29sZWFuPXRydWU7XHJcbiAgICAvKirln47lopnnmoRZ6L205Z2Q5qCHICovXHJcbiAgICBwcm90ZWN0ZWQgd2FsbF95eTpudW1iZXI9MDtcclxuICAgIHByb3RlY3RlZCBhdHRfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuWIhuaVsCAqL1xyXG4gICAgcHVibGljIHNjb3JlOm51bWJlcj0wO1xyXG4gICAgLyoq54uZ5Ye7556E5YeG55qE5L2N572uICovXHJcbiAgICBwcm90ZWN0ZWQganVqaV9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLyoq6KGA5p2h55qE5L2N572uICovXHJcbiAgICBwcm90ZWN0ZWQgaHBfcG9zOmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuICAgIC8qKuS4reW/g+S9jee9ru+8jOeUqOS6juiMg+WbtOajgOa1iyAqL1xyXG4gICAgcHJvdGVjdGVkIGNlbnRlcl9wb3M6Y2MuVmVjMj1jYy52MigwLDApO1xyXG4gICAgLy/lj5fkvKTliqjkvZxcclxuICAgIHByb3RlY3RlZCBpbmp1cmVkX2FjdGlvbjpjYy5Ud2Vlbj1udWxsO1xyXG5cclxuICAgIC8qKuWIneWni+WMluWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBpbml0X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirmgKrnianooYDph4/lj5HnlJ/lj5jljJbml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlX2hwX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirnnKnmmZXlm57osIPvvIznlKjkuo5ib3Nz5pa95rOV6KKr5Lit5patICovXHJcbiAgICBwcml2YXRlIHh1YW55dW5fY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuatu+S6oeWbnuiwg++8jOaAqueJqeatu+S6oeaXtuinpuWPke+8jOeUqOS6juaSreaUvuiHqui6q+WvueW6lOeahOatu+S6oeWKqOeUuyAqL1xyXG4gICAgcHJpdmF0ZSBkZWF0aF9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq6KKr5Li75Yqo5oqA6IO95Y+X5Lyk5pe255qE5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGFjdGl2ZV9pbmp1cnlfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuenu+WKqOWIsOebruagh+WcsOeCueWbnuiwgyAqL1xyXG4gICAgcHJvdGVjdGVkIG1vdmVfZW5kX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKipkZWJ1Zmblop7kvKTnu5/orqEgKi8gICAgXHJcbiAgICBwcml2YXRlIGluanVyeV9kYW1hZ2Vfc3RhdHM6TWFwPG51bWJlcixudW1iZXI+PW51bGw7XHJcbiAgICAvKirmsp/lo5HkvKTlrrPorqHnrpcgKi9cclxuICAgIGlzX2Nhbl9ndWxseTpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5oul5pyJ55qE5YWJ546vICovXHJcbiAgICBwcml2YXRlIG1vbnN0ZXJfaGFsbzpNYXA8SGFsb0lkLEhhbG9EYXRhPj1udWxsO1xyXG4gICAgLyoq6aKd5aSW55qE6Zeq6YG/546HICovXHJcbiAgICBwcml2YXRlIGV4X21pc3NfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKumineWklueahOmYsuW+oeWKmyAqL1xyXG4gICAgcHJpdmF0ZSBleF9kZWZlbnNlX3ZhbHVlOm51bWJlcj0wO1xyXG4gICAgLyoq6aKd5aSW55qE56e75Yqo6YCf5bqmICovXHJcbiAgICBwcml2YXRlIGV4X21vdmVfc3BlZWRfdmFsdWU6bnVtYmVyPTA7XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5oqA6IO955qELS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvKirmioDog73mlbDmja4gKi9cclxuICAgIHNraWxsX2RhdGE6TW9uc3RlclNraWxsRGF0YT1udWxsO1xyXG4gICAgLyoq5omA5pyJ5oqA6IO955qE5b2T5YmN55qE5Ya35Y205pe26Ze0ICovXHJcbiAgICBza2lsbF9jb2xkX2Rvd246bnVtYmVyW109W107XHJcbiAgICAvKirmioDog73pmJ/liJcgKi9cclxuICAgIHNraWxsX3F1ZXVlOm51bWJlcltdPVtdO1xyXG4gICAgLyoq5b2T5YmN5L2/55So55qE5oqA6IO9LDDku6PooajmsqHmnIkgKi9cclxuICAgIGN1cl9za2lsbF9pbmRleDpudW1iZXI9MDtcclxuICAgIC8qKueisOaSnuWZqCAqL1xyXG4gICAgY29sbGlkZXI6Y2MuQ29sbGlkZXI9bnVsbDtcclxuICAgIC8qKuimgeaUu+WHu+eahOWfjuWimSAqL1xyXG4gICAgYXR0X3dhbGw6V2FsbD1udWxsO1xyXG4gICAgLyoq54m15byV5pyA5bCP6Led56a7ICovXHJcbiAgICBtaW5fcWlhbnlpbjpudW1iZXI9MDtcclxuXHJcbiAgICBjdXJfY29sb3I6Q29sb3JUeXBlPUNvbG9yVHlwZS5OdWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLnNwaW5lPXRoaXMubm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMubG9hZEluaXRQb3MoKTtcclxuICAgICAgICB0aGlzLndhbGxfeXk9R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZj1uZXcgTWFwPEJ1ZmZJZCxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZj1uZXcgTWFwPEJ1ZmZJZCxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2hhbG89bmV3IE1hcDxIYWxvSWQsSGFsb0RhdGE+KCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlcj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KG1vbnN0ZXJJZDogbnVtYmVyLGxldmVsOm51bWJlcixocFJhdGU6bnVtYmVyLGlzQ2FuQ291bnQ6Ym9vbGVhbj10cnVlKSB7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2lkPW1vbnN0ZXJJZDtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfbGV2ZWw9bGV2ZWw7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2hwX3JhdGU9aHBSYXRlO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT1Nb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1vbnN0ZXJJZCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX3R5cGU9anNvbkRhdGEuTW9uc3RlckNsYXNzO1xyXG4gICAgICAgIGxldCBhdHRyaWJ1dGVJZD1Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SWQodGhpcy5tb25zdGVyX2lkLGxldmVsKTtcclxuICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGE9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKGF0dHJpYnV0ZUlkKTsgICAgICBcclxuICAgICAgICB0aGlzLmlzX2Nhbl9ndWxseT10cnVlO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2NvdW50PWlzQ2FuQ291bnQ7XHJcbiAgICAgICAgdGhpcy5pc19jb3VudD10aGlzLmlzX2Nhbl9jb3VudDtcclxuICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZT0wO1xyXG4gICAgICAgIHRoaXMuZXhfZGVmZW5zZV92YWx1ZT0wO1xyXG4gICAgICAgIC8vdGhpcy5pbml0T3V0d2FyZChqc29uRGF0YS5Ta2luKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoanNvbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuYWRkSHBQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMuYWRkU2hhZG93KCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLk51bGwpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXI9dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgdGhpcy5taW5fcWlhbnlpbj0wO1xyXG4gICAgICAgIGlmKHRoaXMuaW5pdF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuc3BpbmUucGF1c2VkPWZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMitNYXRoLnJhbmRvbSgpKihNYXRoLlBJLzYpLShNYXRoLlBJLzEyKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRTdW1tb24obW9uc3RlcklkOiBudW1iZXIsYm9zc0F0dHJpYnV0ZTpKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9pZD1tb25zdGVySWQ7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhPU1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUobW9uc3RlcklkKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfdHlwZT1qc29uRGF0YS5Nb25zdGVyQ2xhc3M7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ3VsbHk9dHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9jb3VudD1mYWxzZTtcclxuICAgICAgICB0aGlzLmlzX2NvdW50PXRoaXMuaXNfY2FuX2NvdW50O1xyXG4gICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YT1jYy5pbnN0YW50aWF0ZShib3NzQXR0cmlidXRlKTtcclxuICAgICAgICBzd2l0Y2goanNvbkRhdGEuU3RyZW5ndGhUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuRWxpdGU6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkhlYWx0aD1ib3NzQXR0cmlidXRlLkhlYWx0aC81MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2s9Ym9zc0F0dHJpYnV0ZS5BdHRhY2sqMC45NzI0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2U9Ym9zc0F0dHJpYnV0ZS5EZWZlbnNlKjAuNjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkhlYWx0aD1ib3NzQXR0cmlidXRlLkhlYWx0aC81MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2s9Ym9zc0F0dHJpYnV0ZS5BdHRhY2sqMC45NTkyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2U9MDtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoanNvbkRhdGEpO1xyXG4gICAgICAgIHRoaXMuYWRkSHBQcm9ncmVzcygpO1xyXG4gICAgICAgIHRoaXMuYWRkU2hhZG93KCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnN0YW5kYnkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLk51bGwpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXI9dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkPXRydWU7XHJcbiAgICAgICAgdGhpcy5taW5fcWlhbnlpbj0wO1xyXG4gICAgICAgIGlmKHRoaXMuaW5pdF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoRGF0YShsZXZlbDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9sZXZlbD1sZXZlbDtcclxuICAgICAgICBsZXQganNvbkRhdGE9TW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZSh0aGlzLm1vbnN0ZXJfaWQpOyAgICAgICAgXHJcbiAgICAgICAgLy/ph43nva7mlbDmja5cclxuICAgICAgICBsZXQgYXR0cmlidXRlSWQ9TW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldElkKHRoaXMubW9uc3Rlcl9pZCxsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhPU1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyhhdHRyaWJ1dGVJZCk7ICBcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YT1jYy5pbnN0YW50aWF0ZSh0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEpO1xyXG4gICAgICAgIHRoaXMuYmFzZV9kYXRhPWpzb25EYXRhO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwPXRoaXMubW9uc3Rlcl9kYXRhLkhlYWx0aDtcclxuICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuYmFzZV9kYXRhLlNwZWVkO1xyXG4gICAgICAgIHRoaXMuYXR0X2ppYW5nZT0xL3RoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkO1xyXG4gICAgICAgIHRoaXMuY3VyX2F0dD10aGlzLm1vbnN0ZXJfZGF0YS5BdHRhY2s7XHJcbiAgICAgICAgLy8gaWYodGhpcy5iYXNlX2RhdGEuU2tpbGxOdW0+MCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubG9hZE1vbnN0ZXJTa2lsbERhdGEoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICAvKirliJ3lp4vljJblpJbop4IqL1xyXG4gICAgLy8gcHJpdmF0ZSBpbml0T3V0d2FyZChza2luVHlwZTpNb25zdGVyU2tpblR5cGUpe1xyXG4gICAgLy8gICAgIHRoaXMuc2tpbl90eXBlPXNraW5UeXBlO1xyXG4gICAgLy8gICAgIHRoaXMuc2V0U2tpbih0aGlzLmdldFNraW5OYW1lKCkpO1xyXG4gICAgLy8gICAgIHRoaXMucGxheVNwaW5BbmltYXRvbih0aGlzLmdldEFuaW1hTmFtZShNb25zdGVyQWN0aW9uTmFtZS5JZGxlKSx0cnVlKTtcclxuICAgIC8vIH1cclxuICAgIC8qKuWIneWni+WMluaVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBpbml0RGF0YShiYXNlRGF0YTpKc29uTW9uc3RlckNvbmZpZ3VyZSl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RhdGE9Y2MuaW5zdGFudGlhdGUodGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhKTtcclxuICAgICAgICB0aGlzLmJhc2VfZGF0YT1iYXNlRGF0YTtcclxuICAgICAgICB0aGlzLmN1cl9ocD10aGlzLm1heF9ocD10aGlzLm1vbnN0ZXJfZGF0YS5IZWFsdGgqdGhpcy5tb25zdGVyX2hwX3JhdGU7XHJcbiAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmJhc2VfZGF0YS5TcGVlZDtcclxuICAgICAgICB0aGlzLmF0dF9qaWFuZ2U9MS90aGlzLmJhc2VfZGF0YS5BdHRhY2tTcGVlZDtcclxuICAgICAgICB0aGlzLmN1cl9hdHQ9dGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrO1xyXG4gICAgICAgIHRoaXMuY3VyX3RvdWdobmVzcz0wO1xyXG4gICAgICAgIHRoaXMuc2V0dXBfc2NhbGU9dGhpcy5iYXNlX2RhdGEuU2NhbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlPXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1OyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5za2luX3R5cGU9YmFzZURhdGEuU2tpbjtcclxuICAgICAgICB0aGlzLmhpZGRlbl9hdHRyaWJ1dGU9bmV3IEhpZGRlbkF0dHJpYnV0ZSgpO1xyXG4gICAgICAgIHRoaXMuaW5qdXJ5X2RhbWFnZV9zdGF0cz1uZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgaWYodGhpcy5iYXNlX2RhdGEuU2tpbGxOdW0+MCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1vbnN0ZXJTa2lsbERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkTW9uc3RlclNraWxsRGF0YSgpe1xyXG4gICAgICAgIGxldCBza2lsbERhdGE9bmV3IE1vbnN0ZXJTa2lsbERhdGEoKTtcclxuICAgICAgICBza2lsbERhdGEuQ29sZERvd249bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Jbml0Q29sZERvd249bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzE9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzI9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzM9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzQ9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5DYXN0aW5nUmFuZ2U9bmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgIGZvcihsZXQgcz0xOyBzPD10aGlzLmJhc2VfZGF0YS5Ta2lsbE51bTsgcysrKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGlkPU1vbnN0ZXJTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJZCh0aGlzLm1vbnN0ZXJfaWQscyx0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuU2tpbGxMZXZlbClcclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhPU1vbnN0ZXJTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlclNraWxsKGlkKTtcclxuICAgICAgICAgICAgaWYoanNvbkRhdGEgPT0gbnVsbCApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8xLnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfMSk7XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzIuc2V0KHMsanNvbkRhdGEuU2tpbGxWYWx1ZV8yKTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLlNraWxsVmFsdWVfMy5zZXQocyxqc29uRGF0YS5Ta2lsbFZhbHVlXzMpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV80LnNldChzLGpzb25EYXRhLlNraWxsVmFsdWVfNCk7XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5Db2xkRG93bi5zZXQocyxqc29uRGF0YS5Db2xkRG93bik7XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5Jbml0Q29sZERvd24uc2V0KHMsanNvbkRhdGEuSW5pdGlhbENvbGREb3duKTtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bcy0xXT1qc29uRGF0YS5Jbml0aWFsQ29sZERvd247XHJcbiAgICAgICAgICAgIHNraWxsRGF0YS5DYXN0aW5nUmFuZ2Uuc2V0KHMsanNvbkRhdGEuQ2FzdGluZ1JhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5za2lsbF9kYXRhPXNraWxsRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkSHBQcm9ncmVzcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuaHBfcHJvZ3Jlc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGUhPVN0cmVuZ3RoVHlwZS5Cb3NzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwX3Byb2dyZXNzPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfaHBfbWFuYWdlci5jcmVhdGVFbmVteUhwKGNjLnYyKHRoaXMubm9kZS54K3RoaXMuaHBfcG9zLngqdGhpcy5zZXR1cF9zY2FsZSx0aGlzLm5vZGUueSt0aGlzLmhwX3Bvcy55KnRoaXMuc2V0dXBfc2NhbGUpKS5nZXRDb21wb25lbnQoSHBQcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zaG93SHAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZFNoYWRvdygpe1xyXG4gICAgICAgIC8vaWYodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlIT1TdHJlbmd0aFR5cGUuQm9zcylcclxuICAgICAgICBpZighdGhpcy5zaGFkb3cpe1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdz1Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlU2hhZG93KHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLmFkZCh0aGlzLnNoYWRvd19wb3MpKTtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cud2lkdGg9dGhpcy5ub2RlLnNjYWxlWCp0aGlzLnNoYWRvd19zaXplLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5oZWlnaHQ9dGhpcy5ub2RlLnNjYWxlWSp0aGlzLnNoYWRvd19zaXplLmhlaWdodDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLmFkZCh0aGlzLnNoYWRvd19wb3MpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNob3dIcCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5ocF9wcm9ncmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfcHJvZ3Jlc3MuY2hhbmdlUHJvZ3Jlc3ModGhpcy5jdXJfaHAvdGhpcy5tYXhfaHApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRJc0NhbkNvdW50KGlzQ2FuQ291bnQ6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQ9aXNDYW5Db3VudDtcclxuICAgICAgICAvLyBpZih0aGlzLmlzX2Nhbl9jb3VudD09ZmFsc2Upe1xyXG4gICAgICAgIC8vICAgICBjYy5sb2coJ3NldElzQ2FuQ291bnQ9PWZhbHNlJyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNldHVwU2NhbGUoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCBzY2FsZT0wLjM7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLk5vcm1hbDp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjU1O1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuNzU7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuQm9zczp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0xLjI7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFdhbGxBdHRhY2tTY2FsZSgpOm51bWJlcntcclxuICAgICAgICBsZXQgc2NhbGU9MTtcclxuICAgICAgICBzd2l0Y2godGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuTm9ybWFsOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuNjtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5FbGl0ZTp7XHJcbiAgICAgICAgICAgICAgICBzY2FsZT0wLjk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFh1YW55dW5TY2FsZSgpOm51bWJlcntcclxuICAgICAgICBsZXQgc2NhbGU9MC4zO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmJhc2VfZGF0YS5TdHJlbmd0aFR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6e1xyXG4gICAgICAgICAgICAgICAgc2NhbGU9MC41NS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTAuNzUvdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Cb3NzOntcclxuICAgICAgICAgICAgICAgIHNjYWxlPTEuNS90aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHJlbmd0aFR5cGUoKTpTdHJlbmd0aFR5cGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNb25zdGVyRGF0YSgpOkpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlc3tcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6h566X5Lyk5a6z5pWw5o2uICovXHJcbiAgICBnZXRJbmp1cmVkRGF0YShnakRhdGE6R29uZ0ppRGF0YSk6SW5qdXJlZERhdGF7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEluanVyZWREYXRhKCk7XHJcbiAgICAgICAgaWYodGhpcy5nZXRJc0RpZSgpKXtcclxuICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5EaWU7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgbWlzc1JhdGU9MDsgICAgICAgIFxyXG4gICAgICAgIGxldCBjcml0UmF0ZT0wO1xyXG4gICAgICAgIC8v5aaC5p6c5piv5pmu6YCa5pS75Ye777yM6K6h566X6Zeq6YG/5ZKM5pq05Ye777yM6buY6K6k5Li6MFxyXG4gICAgICAgIGxldCBoZXJvRGF0YT1nakRhdGEuaGVyb19kYXRhO1xyXG4gICAgICAgIC8v5oCq54mp55qE6Ziy5b6h5YqbXHJcbiAgICAgICAgbGV0IHNlbGZEZWZlbnNlPXRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UrdGhpcy5leF9kZWZlbnNlX3ZhbHVlO1xyXG4gICAgICAgIGxldCBmaW5hbERlZmVuc2U9SW5qdXJlZERhdGEuY2FsY0ZpbmFsRGVmZW5zZShzZWxmRGVmZW5zZSxoZXJvRGF0YS5pZ25vcmVfZGVmZW5zZV9yYXRlKVxyXG4gICAgICAgIGlmKGdqRGF0YS5kYW1hZ2VfdHlwZT09RGFtYWdlVHlwZS5Ob3JtYWwpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkJvc3MyX01pYW5ZaV9BdHRhY2spKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk1haW5ZaTtcclxuICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlPUVuZW15X0luanVyZWRfVHlwZS5XdURpO1xyXG4gICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZVR5cGVUZXh0KGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzYwKSxFbmVteV9Jbmp1cmVkX1R5cGUuV3VEaSxudWxsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1pc3NSYXRlPUluanVyZWREYXRhLmNhbGNNaXNzUmF0ZSh0aGlzLm1vbnN0ZXJfZGF0YS5NaXNzLGdqRGF0YS5oZXJvX2RhdGEuSGl0KSt0aGlzLmV4X21pc3NfcmF0ZS1nakRhdGEuaGVyb19kYXRhLmhpdF9leDtcclxuICAgICAgICAgICAgY3JpdFJhdGU9SW5qdXJlZERhdGEuY2FsY0NyaXRSYXRlKGdqRGF0YS5oZXJvX2RhdGEuQ3JpdGljYWwsdGhpcy5tb25zdGVyX2RhdGEuQW50aUNyaXRpY2FsKTtcclxuICAgICAgICAgICAgY3JpdFJhdGUrPWdqRGF0YS5oZXJvX2RhdGEuY3JpdF9leDtcclxuICAgICAgICAgICAgLy/ojrflj5bkuIDkuKrmpoLnjofnsbvlnotcclxuICAgICAgICAgICAgbGV0IHR5cGU9SW5qdXJlZERhdGEuY2FsY09uY2VUeXBlKFttaXNzUmF0ZSxjcml0UmF0ZSwxXSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pl6rpgb9cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLlNoYW5CaTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bSgwKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuU2hhbkJpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSs2MCksRW5lbXlfSW5qdXJlZF9UeXBlLlNoYW5CaSxudWxsKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mmrTlh7tcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLkJhb0ppO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbENyaXREYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5hdHRhY2tfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSxJbmp1cmVkRGF0YS5jYWxjRmluYWxFeHRyYUNyaXQoaGVyb0RhdGEuRXh0cmFDcml0aWNhbCx0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpRXh0cmFDcml0aWNhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLkJhb0ppO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGdqRGF0YS5wZXRfaWQ9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChnakRhdGEuaGVyb190eXBlKS5vbkRhbWFnZU1vbnN0ZXIoRGFtYWdlVHlwZS5Ob3JtYWwsdHJ1ZSx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZighZ20uaXNfc2hvd190ZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZVR5cGVUZXh0KGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzYwKSxkYXRhLnRleHRfdHlwZSxudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pmu6YCa5ZG95LitXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5OdWxsOyAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsRGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjayxmaW5hbERlZmVuc2UsaGVyb0RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlLHRoaXMuamlhbnNoYW5nX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLk5vcm1hbF9BdHRhY2s7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ2pEYXRhLnBldF9pZD09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGdqRGF0YS5oZXJvX3R5cGUpLm9uRGFtYWdlTW9uc3RlcihEYW1hZ2VUeXBlLk5vcm1hbCxmYWxzZSx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKGdqRGF0YS5kYW1hZ2VfdHlwZT09RGFtYWdlVHlwZS5Ta2lsbCl7XHJcbiAgICAgICAgICAgIC8v5LiN6ZyA6KaB6K6h566X6Zeq6YG/77yM5oqA6IO95b+F5LitXHJcbiAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTnVsbDtcclxuICAgICAgICAgICAgbGV0IGRhbWFnZT0wO1xyXG4gICAgICAgICAgICBpZihnakRhdGEuaXNfY2FuX2NyaXQpe1xyXG4gICAgICAgICAgICAgICAgY3JpdFJhdGU9SW5qdXJlZERhdGEuY2FsY0NyaXRSYXRlKGdqRGF0YS5oZXJvX2RhdGEuQ3JpdGljYWwsdGhpcy5tb25zdGVyX2RhdGEuQW50aUNyaXRpY2FsKTtcclxuICAgICAgICAgICAgICAgIGNyaXRSYXRlKz1nakRhdGEuaGVyb19kYXRhLmNyaXRfZXg7XHJcbiAgICAgICAgICAgICAgICAvL+iOt+WPluS4gOS4quamgueOh+exu+Wei1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGU9SW5qdXJlZERhdGEuY2FsY09uY2VUeXBlKFswLGNyaXRSYXRlLDFdKTtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuQmFvSmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGU9RW5lbXlfSW5qdXJlZF9UeXBlLkJhb0ppO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxDcml0RGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjayxnakRhdGEuc2tpbGxfZGFtYWdlX3JhdGUsZmluYWxEZWZlbnNlLGhlcm9EYXRhLnNraWxsX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmF0dGFja19pbmNyZWFzZV9kYW1hZ2UsdGhpcy5qaWFuc2hhbmdfcmF0ZSxJbmp1cmVkRGF0YS5jYWxjRmluYWxFeHRyYUNyaXQoaGVyb0RhdGEuRXh0cmFDcml0aWNhbCx0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpRXh0cmFDcml0aWNhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFnbS5pc19zaG93X3RleHQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLGRhdGEudGV4dF90eXBlLG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLGdqRGF0YS5za2lsbF9kYW1hZ2VfcmF0ZSxmaW5hbERlZmVuc2UsaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlK2hlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZSx0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlLGZpbmFsRGVmZW5zZSxoZXJvRGF0YS5za2lsbF9pbmNyZWFzZV9kYW1hZ2UraGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hdHRhY2tfaW5jcmVhc2VfZGFtYWdlLHRoaXMuamlhbnNoYW5nX3JhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgICAgIGlmKGdqRGF0YS5wZXRfaWQ9PTApe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hbGxfaGVyby5nZXQoZ2pEYXRhLmhlcm9fdHlwZSkub25EYW1hZ2VNb25zdGVyKERhbWFnZVR5cGUuU2tpbGwsZmFsc2UsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog556s6Ze05Lyk5a6zXHJcbiAgICAgKiBAcGFyYW0gZ2pEYXRhIOaUu+WHu+exu+Wei1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIGJlRmxhc2hJbmp1cmVkKGdqRGF0YTpHb25nSmlEYXRhKTogSW5qdXJlZERhdGF7XHJcbiAgICAgICAgbGV0IGRhdGE9dGhpcy5nZXRJbmp1cmVkRGF0YShnakRhdGEpOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5iZURhbWFnZShkYXRhLGdqRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiZUNvbnRpbnVvdXNJbmp1cmVkKGdqRGF0YTpHb25nSmlEYXRhLGZsb29yTnVtOm51bWJlcj0xKSB7XHJcbiAgICAgICAgaWYoZ2pEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGU+MCl7XHJcbiAgICAgICAgICAgIC8v5oCq54mp55qE6Ziy5b6h5YqbXHJcbiAgICAgICAgICAgIGxldCBzZWxmRGVmZW5zZT10aGlzLm1vbnN0ZXJfZGF0YS5EZWZlbnNlK3RoaXMuZXhfZGVmZW5zZV92YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGZpbmFsRGVmZW5zZT1Jbmp1cmVkRGF0YS5jYWxjRmluYWxEZWZlbnNlKHNlbGZEZWZlbnNlLGdqRGF0YS5oZXJvX2RhdGEuaWdub3JlX2RlZmVuc2VfcmF0ZSlcclxuICAgICAgICAgICAgbGV0IGhlcm9EYXRhPWdqRGF0YS5oZXJvX2RhdGE7XHJcbiAgICAgICAgICAgIGxldCBkYXRhPW5ldyBJbmp1cmVkRGF0YSgpO1xyXG4gICAgICAgICAgICBsZXQgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssZ2pEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGUsZmluYWxEZWZlbnNlLGhlcm9EYXRhLnNraWxsX2luY3JlYXNlX2RhbWFnZStoZXJvRGF0YS5hbGxfaW5jcmVhc2VfZGFtYWdlLHRoaXMuamlhbnNoYW5nX3JhdGUpO1xyXG4gICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuWmhvbmdEdTtcclxuICAgICAgICAgICAgaWYoZ2pEYXRhLmhlcm9fdHlwZT09SGVyb19UeXBlLk52V3Upe1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlPWRhbWFnZSpmbG9vck51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmJlRGFtYWdlKGRhdGEsZ2pEYXRhKTsgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKumAoOaIkOecn+WunuS8pOWus++8jOebtOaOpemAoOaIkOWvueW6lOeahOS8pOWus+WAvCzml6Dms5Xpl6rpgb8gKi9cclxuICAgIGJlUmVhbERhbWFnZShnakRhdGE6R29uZ0ppRGF0YSxkYW1hZ2U6bnVtYmVyKTpJbmp1cmVkRGF0YXtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgIHRoaXMuYmVEYW1hZ2UoZGF0YSxnakRhdGEpOyAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICAvKirmgaLlpI3nlJ/lkb3lgLzmmK/lkKbmiJDlip8gKi9cclxuICAgIGJlSGVhbChudW06IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmKHRoaXMuZ2V0Q3VySHAoKT49dGhpcy5nZXRNYXhIcCgpfHx0aGlzLmdldElzRGllKCk9PXRydWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuebruWJjeayoeacieayu+eWl+aViOaenOWKoOaIkO+8jOWPquaciemHjeS8pO+8jOWPquiuoeeul+mHjeS8pCAqL1xyXG4gICAgICAgIGxldCBuZXdOdW09bnVtKigxLXRoaXMuZ2V0TWF4U2VyaW91c2x5KCkpICAgICAgICBcclxuICAgICAgICB0aGlzLmNoYW5nZUhwKG5ld051bSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAodGhpcy5nZXRDZW50ZXJQb3MoKSxuZXdOdW0sRW5lbXlfSW5qdXJlZF9UeXBlLlpoaUxpYW8pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmVEYW1hZ2UoZGF0YTpJbmp1cmVkRGF0YSxnakRhdGE6R29uZ0ppRGF0YSl7XHJcbiAgICAgICAgaWYodGhpcy5nZXRTdHJlbmd0aFR5cGUoKT09U3RyZW5ndGhUeXBlLkJvc3MmJnRoaXMuaXNIYXZlQnVmZihCdWZmSWQuQm9zczlfU2tpbGxfM193aWR1KSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTWFpbllpO1xyXG4gICAgICAgICAgICBkYXRhLnRleHRfdHlwZT1FbmVteV9Jbmp1cmVkX1R5cGUuV3VEaTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrNjApLEVuZW15X0luanVyZWRfVHlwZS5XdURpLG51bGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICBsZXQgZ209IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIGRhdGEuaXNfZGllPXRoaXMuY2hhbmdlSHAoLWRhdGEuZ2V0RGFtYWdlTnVtKCkpO1xyXG4gICAgICAgICAgICBpZihnbS5pc19zaG93X3RleHQmJmRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrTWF0aC5yYW5kb20oKSoxMDApLGRhdGEuZ2V0RGFtYWdlTnVtKCksZGF0YS50ZXh0X3R5cGUpO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICAgICAgaWYoIWRhdGEuaXNfZGllKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRIdXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lkLjooYDmlYjmnpxcclxuICAgICAgICAgICAgaWYoZ2pEYXRhLmhlcm9fZGF0YS5ibG9vZF9zdWNraW5nX3JhdGU+MCYmZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCBocD1Jbmp1cmVkRGF0YS5jYWxjQmxvb2RTdWNraW5nKGRhdGEuZ2V0RGFtYWdlTnVtKCksZ2pEYXRhLmhlcm9fZGF0YS5ibG9vZF9zdWNraW5nX3JhdGUsZ2pEYXRhLmhlcm9fZGF0YS5zZXJpb3VzX2luanVyeV9yYXRlKTtcclxuICAgICAgICAgICAgICAgIGlmKGhwPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5jaGFuZ2VIcChocCk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoq6K6w5b2V5pyA6auY5Lyk5a6zICovXHJcbiAgICAgICAgICAgIGdtLnNldE1heERhbWFnZShkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgZ20uc2V0TWluRGFtYWdlKGRhdGEuZ2V0RGFtYWdlTnVtKCkpO1xyXG4gICAgICAgICAgICBpZihnakRhdGEuc2tpbGxfcmVsZWFzZV9pZD4wKXtcclxuICAgICAgICAgICAgICAgIFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlY29yZERhbWFnZShnakRhdGEuc2tpbGxfcmVsZWFzZV9pZCxkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYWN0aXZlX2luanVyeV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVfaW5qdXJ5X2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoq6K6w5b2VRFBTICovXHJcbiAgICAgICAgICAgIHN3aXRjaChnakRhdGEuZGFtYWdlX3R5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBEYW1hZ2VUeXBlLk5vcm1hbDp7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBnbS5oZXJvX2F0dGFja19kcHNbZ2pEYXRhLmhlcm9fdHlwZV0rPWRhdGEuZ2V0RGFtYWdlTnVtKCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhbWFnZVR5cGUuU2tpbGw6eyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZ20uaGVyb19za2lsbF9kcHNbZ2pEYXRhLmhlcm9fdHlwZV0rPWRhdGEuZ2V0RGFtYWdlTnVtKCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gLyoq5Yaw5aWz6aKd5aSW55yf5a6e5Lyk5a6zICovXHJcbiAgICAgICAgICAgIC8vIGlmKFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJpbmdOdlNraWxsMigpPjAmJnRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5TbG93ZG93bikpe1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGRhbWFnZT1kYXRhLmdldERhbWFnZU51bSgpKlNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJpbmdOdlNraWxsMigpO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoZGFtYWdlPDEpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGRhbWFnZT0xO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jaGFuZ2VIcCgtZGFtYWdlKTtcclxuICAgICAgICAgICAgLy8gICAgIGdtLmhlcm9fc2tpbGxfZHBzW0hlcm9fVHlwZS5CaW5nTnZdKz1kYW1hZ2U7XHJcbiAgICAgICAgICAgIC8vICAgICBpZihnbS5pc19zaG93X3RleHQpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSszMiksZGFtYWdlLEVuZW15X0luanVyZWRfVHlwZS5CaW5nTnZaaGVuU2hhbmcpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIC8qKumYv+WKquavlOaWr+mineWkluecn+WunuS8pOWusyAqL1xyXG4gICAgICAgICAgICAvLyBpZihTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBTnVCaVNpU2tpbGwyKCk+MCl7XHJcbiAgICAgICAgICAgIC8vICAgICBpZih0aGlzLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuU2xvd2Rvd24pfHx0aGlzLmlzSGF2ZURlQnVmZlR5cGUoQnVmZlR5cGUuVmVydGlnbykpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGxldCBkYW1hZ2U9ZGF0YS5nZXREYW1hZ2VOdW0oKSpTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBTnVCaVNpU2tpbGwyKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYoZGFtYWdlPDEpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBkYW1hZ2U9MTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jaGFuZ2VIcCgtZGFtYWdlKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBnbS5oZXJvX3NraWxsX2Rwc1tIZXJvX1R5cGUuQU51QmlTaV0rPWRhbWFnZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihnbS5pc19zaG93X3RleHQpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAoY2MudjIodGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrMzIpLGRhbWFnZSxFbmVteV9Jbmp1cmVkX1R5cGUuQU51QmlTaVpoZW5TaGFuZyk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgIEdyb3VuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQuYV9udV9iaV9zaV9iZWlkb25nX3NraWxsXzIsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8qKuW+t+mygeS8iumineWkluecn+WunuS8pOWusyAqL1xyXG4gICAgICAgICAgICBpZihTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZUx1WWlFeCgpJiZ0aGlzLmlzSGF2ZURlQnVmZihCdWZmSWQuSGVyb19EZUx1WWlfRXgpKXtcclxuICAgICAgICAgICAgICAgIGxldCBkYW1hZ2U9ZGF0YS5nZXREYW1hZ2VOdW0oKSpTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZUx1WWlFeCgpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGFtYWdlPDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhbWFnZT0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIcCgtZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgIGdtLmhlcm9fc2tpbGxfZHBzW0hlcm9fVHlwZS5EZUx1WWldKz1kYW1hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZihnbS5pc19zaG93X3RleHQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSszMiksZGFtYWdlLEVuZW15X0luanVyZWRfVHlwZS5Ob3JtYWxfQXR0YWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaUuWhw77yM6L+U5Zue5piv5ZCm5q275LqhICovXHJcbiAgICBwcm90ZWN0ZWQgY2hhbmdlSHAobnVtOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZih0aGlzLmdldElzRGllKCl8fHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5ib3JufHxHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlIT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNEaWU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXJfaHArPW51bTtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLkJvc3NfQ2hhbGxlbmdlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlPT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl9ocDw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfaHA9MTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hhbmdlX2hwX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZV9ocF9jYWxsYmFjayhudW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHVzZUxldmVsPUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkU2NvcmUoTWF0aC5hYnMoTWF0aC5yb3VuZChudW0pKSk7XHJcbiAgICAgICAgICAgICAgICBpZih1c2VMZXZlbCE9dGhpcy5tb25zdGVyX2xldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKHVzZUxldmVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmN1cl9ocDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREZWF0aCgpO1xyXG4gICAgICAgICAgICBpc0RpZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmN1cl9ocD50aGlzLm1heF9ocClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKGlzRGllPT1mYWxzZSYmR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9tb2RlPT1HYW1lTW9kZS5NYXplKXtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5jdXJfaHA8KHRoaXMubWF4X2hwKjAuMSkpe1xyXG4gICAgICAgIC8vICAgICAgICAgaWYoTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc0hhdmVBQnVmZihbODAwM10pKXsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5jaGFuZ2VIcCgtdGhpcy5jdXJfaHApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLnBldF8yMV9hY3RpdmVfM19saWFuZGFvLGNjLnYyKDAsMjAwKSx0aGlzLm5vZGUsKCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLnBldF8yMV9hY3RpdmVfMl9saWFuZGFvX2Ryb3BfaGl0LHRoaXMubm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZih0aGlzLmNoYW5nZV9ocF9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlX2hwX2NhbGxiYWNrKG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgcmV0dXJuIGlzRGllO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEJ1ZmYoYnVmZkRhdGE6IEJ1ZmZEYXRhKTogQnVmZlRpbWVyIHtcclxuICAgICAgICBpZih0aGlzLm1vbnN0ZXJfYnVmZi5oYXMoYnVmZkRhdGEuYnVmZl9pZCk9PWZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqBidWZm6IqC54K55ZKM54m55pWIICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZTpjYy5Ob2RlPW51bGw7XHJcbiAgICAgICAgICAgIGlmKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkPT1HYW1lRWZmZWN0SWQuTnVsbCl7XHJcbiAgICAgICAgICAgICAgICBub2RlPW5ldyBjYy5Ob2RlKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLmp1amlfcG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBub2RlPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQsdGhpcy5qdWppX3Bvcyx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZT10aGlzLmdldFNoZVNob3VBdHRhY2tTY2FsZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjpCdWZmVGltZXI9bm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYoIWJ1ZmYpe1xyXG4gICAgICAgICAgICAgICAgYnVmZj1ub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZuayu+eWl+inpuWPkeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZT4wKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkUmVjb3ZlcnlMaXN0ZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvUmVjb3Zlcnk6KG51bTpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVIZWFsKG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxidWZmLmdldEZpcnN0QnVmZlZhbHVlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9idWZmLnNldChidWZmRGF0YS5idWZmX2lkLGJ1ZmYpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25CdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLk1vdmVTcGVlZFVwOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLkF0dFNwZWVkVXA6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczlfU2tpbGxfMV9ndW96YWk6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemVuZ3NoYW5nX3JhdGUrPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuRGVmZW5zZS09dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UqKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczEwX1NraWxsXzRfa3VhbmdiYW9fZ2psOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YS5BdHRhY2srPXRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2sqKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+WmguaenOaciWJ1ZmbvvIzliJnliLfmlrDml7bpl7Qs6YeN5paw6K6h5pe2XHJcbiAgICAgICAgICAgIGxldCBidWZmPXRoaXMubW9uc3Rlcl9idWZmLmdldChidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICAgICAgYnVmZi5yZWZyZXNoQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdWJCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY9dGhpcy5tb25zdGVyX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYoYnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOkJ1ZmZEYXRhKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfdHlwZSl7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuTW92ZVNwZWVkVXA6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuQXR0U3BlZWRVcDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUF0dGFja1NwZWVkKC1idWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3M5X1NraWxsXzFfZ3VvemFpOntcclxuICAgICAgICAgICAgICAgIHRoaXMuemVuZ3NoYW5nX3JhdGUtPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YS5EZWZlbnNlKz10aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuRGVmZW5zZSooYnVmZkRhdGEuYnVmZl92YWx1ZVsxXSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczEwX1NraWxsXzRfa3VhbmdiYW9fZ2psOntcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjay09dGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkF0dGFjayooYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfYnVmZi5oYXMoYnVmZklkKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdWZmKGJ1ZmZJZDogQnVmZklkKTogQnVmZlRpbWVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlQnVmZlR5cGUoYnVmZlR5cGU6IEJ1ZmZUeXBlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlzSGF2ZT1mYWxzZTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5mb3JFYWNoKChidWZmOkJ1ZmZUaW1lcik9PntcclxuICAgICAgICAgICAgaWYoaXNIYXZlPT1mYWxzZSAmJiBidWZmLmdldEJ1ZmZUeXBlKCk9PWJ1ZmZUeXBlKXtcclxuICAgICAgICAgICAgICAgIGlzSGF2ZT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gaXNIYXZlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEJ1ZmYoKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5mb3JFYWNoKChidWZmOkJ1ZmZUaW1lcik9PntcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkRGVCdWZmKGJ1ZmZEYXRhOkJ1ZmZEYXRhLGdqRGF0YTpHb25nSmlEYXRhKTogQnVmZlRpbWVyIHtcclxuICAgICAgICBpZih0aGlzLmdldElzRGllKCkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihidWZmRGF0YS5idWZmX2lkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5o6n5Yi257G755qEZGVidWZm6ZyA6KaB5qC55o2u6Z+n5oCn5p2l5a6e546w5YW35L2T55qE5pWI5p6cXHJcbiAgICAgICAgICAgIGxldCBidWZmVHlwZT1idWZmRGF0YS5idWZmX3R5cGU7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmVHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLlZlcnRpZ286e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VyX3RvdWdobmVzcz49MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZVR5cGVUZXh0KGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzYwKSxFbmVteV9Jbmp1cmVkX1R5cGUuTWlhbllpS29uZ1poaSxudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVCdWZmKEJ1ZmZJZC5Cb3NzM19NaWFuWWlfS29uZ1poaSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRCdWZmKEJ1ZmZJZC5Cb3NzM19NaWFuWWlfS29uZ1poaSkuYWRkRmxvb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZ2pEYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9SW5qdXJlZERhdGEuY2FsY0NvbnRyb2xUaW1lKGJ1ZmZEYXRhLnJlbWFpbl90aW1lLHRoaXMuY3VyX3RvdWdobmVzcyxnakRhdGEuaGVyb19kYXRhLmluc2lnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19YdWFuWXVuOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1PTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnh1YW55dW5fY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvOnsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mtheaDkeWvuUJPU1Pml6DmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCkhPVN0cmVuZ3RoVHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dF9qaXNodT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6LWw5ZCR6Iux6ZuEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1laW1vPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVybyhIZXJvX1R5cGUuTWVpTW8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtbVBvcz1tZWltby5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldFBvcz1tbVBvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpYW49TWF0aC5hdGFuMihvZmZzZXRQb3MueSxvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb3ZlRGlyKHJhZGlhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9YnJlYWs7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZT1udWxsO1xyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5nYW1lX2VmZmVjdF9pZD09R2FtZUVmZmVjdElkLk51bGwpe1xyXG4gICAgICAgICAgICAgICAgbm9kZT1uZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24odGhpcy5qdWppX3Bvcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLHRoaXMuanVqaV9wb3MsdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGU9dGhpcy5nZXRTaGVTaG91QXR0YWNrU2NhbGUoKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOkJ1ZmZUaW1lcj1ub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZighYnVmZil7XHJcbiAgICAgICAgICAgICAgICBidWZmPW5vZGUuYWRkQ29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi5pbml0KGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgLy9idWZm6ZSA5q+B5pe25aSE55CGXHJcbiAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uRGVidWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy9idWZm5Lyk5a6z6Kem5Y+R5pe25aSE55CGXHJcbiAgICAgICAgICAgIGlmKGJ1ZmZEYXRhLmRhbWFnZV9qaWFuZ2VfdGltZT4wJiZnakRhdGEpe1xyXG4gICAgICAgICAgICAgICAgYnVmZi5hZGREYW1hZ2VMaXN0ZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvRGFtYWdlOihnakRhdGE6R29uZ0ppRGF0YSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUNvbnRpbnVvdXNJbmp1cmVkKGdqRGF0YSxidWZmLmdldEZsb29yTnVtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sZ2pEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLnNldChidWZmRGF0YS5idWZmX2lkLGJ1ZmYpO1xyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZlR5cGUpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5WZXJ0aWdvOntcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXRoaXMuZ2V0WHVhbnl1blNjYWxlKCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLlNsb3dkb3duOntcclxuICAgICAgICAgICAgICAgICAgICAvL+WkhOeQhuS4gOS4i+WHj+mAn2J1ZmZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQodGhpcy5oaWRkZW5fYXR0cmlidXRlLnNsb3dfcmVzaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLkJ1cnN0OntcclxuICAgICAgICAgICAgICAgICAgICAvL+WkhOeQhmJ1ZmbniIblj5FcclxuICAgICAgICAgICAgICAgICAgICBpZihidWZmRGF0YS5idWZmX2lkPT1CdWZmSWQuSGVyb19MZWlTaGVuX0NoYW9GdUhlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZ2pEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmLmFkZEJ1cnN0TGlzdGVuKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0sdGhpcy5vbkJ1ZmZCdXJzdC5iaW5kKHRoaXMpLGdqRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfU2tpbGw6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZT0xL3RoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZT1zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLHtzY2FsZTpzY2FsZSoxLjEsb3BhY2l0eToyNTV9KS50bygwLjEse3NjYWxlOm5vZGUuc2NhbGUsb3BhY2l0eToxMjh9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzX01vZGVfSmlhblNoYW5nOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmppYW5zaGFuZ19yYXRlKz1idWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19Odld1X0V4U2tpbGxfSmlhbkdvbmdTdTp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBidWZmPXRoaXMubW9uc3Rlcl9kZWJ1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19DaGFuZ01hb1Nob3dfU2tpbGw6e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlPXRoaXMubW9uc3Rlcl9kZWJ1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpLm5vZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlPTEvdGhpcy5zZXR1cF9zY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNjYWxlPXNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEse3NjYWxlOnNjYWxlKjEuMSxvcGFjaXR5OjI1NX0pLnRvKDAuMSx7c2NhbGU6bm9kZS5zY2FsZSxvcGFjaXR5OjEyOH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y676Zmk5LiA5LiqZGVidWZmXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBkZWJ1ZmbnsbvlnotcclxuICAgICAqIEBwYXJhbSBpc05lZWRSZWN5Y2xlIOaYr+WQpumcgOimgeiwg+eUqOWbnuaUtlxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHN1YkRlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmPXRoaXMubW9uc3Rlcl9kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYoYnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaXNIYXZlRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuaGFzKGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogQnVmZlRpbWVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2RlYnVmZi5nZXQoYnVmZklkKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVEZUJ1ZmZUeXBlKGJ1ZmZUeXBlOiBCdWZmVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpc0hhdmU9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKChidWZmOkJ1ZmZUaW1lcik9PntcclxuICAgICAgICAgICAgaWYoaXNIYXZlPT1mYWxzZSAmJiBidWZmLmdldEJ1ZmZUeXBlKCk9PWJ1ZmZUeXBlKXtcclxuICAgICAgICAgICAgICAgIGlzSGF2ZT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gaXNIYXZlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZW1vdmVBbGxEZUJ1ZmYoKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgdGhpcy5zdWJEZUJ1ZmYodi5nZXRCdWZmSWQoKSk7XHJcbiAgICAgICAgfSkgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVidWZmRGVzdG9yeShidWZmRGF0YTpCdWZmRGF0YSl7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7ICBcclxuICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl90eXBlKXtcclxuICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5WZXJ0aWdvOntcclxuICAgICAgICAgICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1h1YW5ZdW46e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy54dWFueXVuX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvOnsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6a2F5oOR5a+5Qk9TU+aXoOaViCzlvoDkuIvotbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb3ZlRGlyKE1hdGguUEkqMy8yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLlNsb3dkb3duOntcclxuICAgICAgICAgICAgICAgIC8v5aSE55CG5LiA5LiL5YeP6YCfYnVmZlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zc19Nb2RlX0ppYW5TaGFuZzp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmppYW5zaGFuZ19yYXRlLT1idWZmRGF0YS5idWZmX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTnZXdV9FeFNraWxsX0ppYW5Hb25nU3U6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgrYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmQnVyc3QoYnVmZkRhdGE6QnVmZkRhdGEsZ2pEYXRhOkdvbmdKaURhdGEpe1xyXG4gICAgICAgIGlmKGJ1ZmZEYXRhLmJ1ZmZfaWQ9PUJ1ZmZJZC5IZXJvX0xlaVNoZW5fQ2hhb0Z1SGUpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGVpR29kU2tpbGwxKTtcclxuICAgICAgICAgICAgLyoq5b2T5pWM5Lq66Lqr5LiK55qE6LaF6LSf6I236L6+5YiwNeWxguaXtu+8jOS8muWPl+WIsOiQvembt+aUu+WHu+mAoOaIkHvlj4LmlbAxfeS8pOWus+W5tuWHu+aZlXvlj4LmlbAyfeenkiAqL1xyXG4gICAgICAgICAgICBsZXQgZGF0YT10aGlzLmJlRmxhc2hJbmp1cmVkKGdqRGF0YSk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuaXNfZGllPT1mYWxzZSYmZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgICAgIC8vR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5sZWlfc2hlbl9za2lsbF9ncm91bmQsdGhpcy5zaGFkb3cuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9kZT1HYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubGVpX3NoZW5fc2tpbGxfc2t5LHRoaXMuc2hhZG93LmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZVg9MC44O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZVk9MTtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0U3RyZW5ndGhUeXBlKCkhPVN0cmVuZ3RoVHlwZS5Cb3NzJiZkYXRhLmlzX2RpZT09ZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmRGF0YT1uZXcgQnVmZkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX2lkPUJ1ZmZJZC5IZXJvX1h1YW5ZdW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQ9R2FtZUVmZmVjdElkLnh1YW55dW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl90eXBlPUJ1ZmZUeXBlLlZlcnRpZ287XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEucmVtYWluX3RpbWU9Z2pEYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8yKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERlQnVmZihidWZmRGF0YSxnakRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKirliLfmlrDnp7vpgJ8sc2xvd1Jlc2lzdGFuY2U65YeP6YCf5oqX5oCnICovXHJcbiAgICBwcml2YXRlIHJlZnJlc2hNb3ZlU3BlZWQoc2xvd1Jlc2lzdGFuY2U6bnVtYmVyKXtcclxuICAgICAgICAvL+WunumZheWHj+mAn1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW8pKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD0zMDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlPUluanVyZWREYXRhLmNhbGNTbG93RG93bk51bSh0aGlzLmJhc2VfZGF0YS5TcGVlZCt0aGlzLmV4X21vdmVfc3BlZWRfdmFsdWUsdGhpcy5nZXRNYXhTbG93RG93blZhbHVlKCksc2xvd1Jlc2lzdGFuY2UsdGhpcy5nZXRNYXhTcGVlZFVwVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29sb3IodGhpcy5jdXJfbW92ZV9zcGVlZDx0aGlzLmJhc2VfZGF0YS5TcGVlZD9Db2xvclR5cGUuU2xvd0Rvd246Q29sb3JUeXBlLk51bGwpOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3MpXHJcbiAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGU9dGhpcy5jdXJfbW92ZV9zcGVlZC8odGhpcy5iYXNlX2RhdGEuU3BlZWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIC8vIC8qKuWIt+aWsOWHj+mAn2J1ZmbnmoTlpITnkIYgKi9cclxuICAgIC8vIHByaXZhdGUgcmVmcmVzaFNsb3dkb3duKCl7XHJcbiAgICAvLyAgICAgLy/mib7lh7rmiYDmnInlh4/pgJ/nsbvlnovnmoRidWZmXHJcbiAgICAvLyAgICAgbGV0IHNsb3dCdWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAvLyAgICAgICAgIGlmKHYuZ2V0QnVmZlR5cGUoKT09QnVmZlR5cGUuU2xvd2Rvd24pe1xyXG4gICAgLy8gICAgICAgICAgICAgc2xvd0J1ZmYucHVzaCh2KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICAgIGlmKHNsb3dCdWZmLmxlbmd0aD4wKXtcclxuICAgIC8vICAgICAgICAgc2xvd0J1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICBsZXQgbWF4QnVmZj1zbG93QnVmZlswXTtcclxuICAgIC8vICAgICAgICAgLy/lrp7pmYXlh4/pgJ9cclxuICAgIC8vICAgICAgICAgbGV0IHZhbHVlPUluanVyZWREYXRhLmNhbGNTbG93RG93bk51bSh0aGlzLmJhc2VfZGF0YS5TcGVlZCxtYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCksdGhpcy5oaWRkZW5fYXR0cmlidXRlLnNsb3dfcmVzaXN0YW5jZSx0aGlzLmdldE1heFNwZWVkVXBWYWx1ZSgpKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD12YWx1ZTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zZXRDb2xvcihDb2xvclR5cGUuU2xvd0Rvd24pO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuYmFzZV9kYXRhLlNwZWVkO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5OdWxsKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gLyoq5Yi35paw5Yqg6YCfYnVmZueahOWkhOeQhiAqL1xyXG4gICAgLy8gcHJpdmF0ZSByZWZyZXNoU3BlZWRVcCgpe1xyXG4gICAgLy8gICAgIC8v5om+5Ye65omA5pyJ5Yqg6YCf57G75Z6L55qEYnVmZlxyXG4gICAgLy8gICAgIGxldCBzcGVlZEJ1ZmY9bmV3IEFycmF5PEJ1ZmZUaW1lcj4oKTtcclxuICAgIC8vICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAvLyAgICAgICAgIGlmKHYuZ2V0QnVmZlR5cGUoKT09QnVmZlR5cGUuU3BlZWRVcCl7XHJcbiAgICAvLyAgICAgICAgICAgICBzcGVlZEJ1ZmYucHVzaCh2KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gICAgIGlmKHNwZWVkQnVmZi5sZW5ndGg+MCl7XHJcbiAgICAvLyAgICAgICAgIHNwZWVkQnVmZi5zb3J0KChhLGIpPT57XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gYi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLWEuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAvLyAgICAgICAgIGxldCBtYXhCdWZmPXNwZWVkQnVmZlswXTtcclxuICAgIC8vICAgICAgICAgLy/lrp7pmYXliqDpgJ/pgJ9cclxuICAgIC8vICAgICAgICAgbGV0IG9mZnNldFZhbHVlPXRoaXMuYmFzZV9kYXRhLlNwZWVkKm1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgIC8vICAgICAgICAgLy9sZXQgdmFsdWU9SW5qdXJlZERhdGEuY2FsY1Nsb3dEb3duTnVtKCxtYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCksdGhpcy5oaWRkZW5fYXR0cmlidXRlLnNsb3dfcmVzaXN0YW5jZSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dGhpcy5jdXJfbW92ZV9zcGVlZCtvZmZzZXRWYWx1ZTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgLyoq5Yqg5YeP6YCf6ZyA6KaB5aSE55CG77yM5Yik5pat5YeP6YCfICovXHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dGhpcy5iYXNlX2RhdGEuU3BlZWQ7XHJcbiAgICAvLyAgICAgfSAgICAgICAgXHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoq6I635b6X5pyA5aSn5YC855qE5YeP6YCf5q+U546HICovXHJcbiAgICBwcml2YXRlIGdldE1heFNsb3dEb3duVmFsdWUoKTpudW1iZXJ7XHJcbiAgICAgICAgLy/mib7lh7rmiYDmnInliqDpgJ/nsbvlnovnmoRidWZmXHJcbiAgICAgICAgbGV0IGJ1ZmY9bmV3IEFycmF5PEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5nZXRCdWZmVHlwZSgpPT1CdWZmVHlwZS5TbG93ZG93bil7XHJcbiAgICAgICAgICAgICAgICBidWZmLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihidWZmLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgYnVmZi5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLWEuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBtYXhCdWZmPWJ1ZmZbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+W+l+acgOWkp+WAvOeahOWKoOmAn+avlOeOhyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXhTcGVlZFVwVmFsdWUoKTpudW1iZXJ7XHJcbiAgICAgICAgLy/mib7lh7rmiYDmnInliqDpgJ/nsbvlnovnmoRidWZmXHJcbiAgICAgICAgbGV0IHNwZWVkQnVmZj1uZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9idWZmLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5nZXRCdWZmVHlwZSgpPT1CdWZmVHlwZS5Nb3ZlU3BlZWRVcCl7XHJcbiAgICAgICAgICAgICAgICBzcGVlZEJ1ZmYucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHNwZWVkQnVmZi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHNwZWVkQnVmZi5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLWEuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBtYXhCdWZmPXNwZWVkQnVmZlswXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u5pS76YCf77yM5q+P56eS5pS75Ye75qyh5pWwICovXHJcbiAgICBwcml2YXRlIHNldEF0dGFja1NwZWVkKG51bVNlYzpudW1iZXIpe1xyXG4gICAgICAgIGlmKG51bVNlYz4xMCl7XHJcbiAgICAgICAgICAgIG51bVNlYz0xMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobnVtU2VjPDAuMSl7XHJcbiAgICAgICAgICAgIG51bVNlYz0wLjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYXR0X2ppYW5nZT0xL251bVNlYztcclxuICAgIH1cclxuICAgIC8qKuaUueWPmOW9k+WJjeaUu+mAnyxyYXRlOuavlOeOhyAqL1xyXG4gICAgcHJvdGVjdGVkIGNoYW5nZUF0dGFja1NwZWVkKHJhdGU6bnVtYmVyKXtcclxuICAgICAgICBsZXQgZ2pzZD10aGlzLmdldEF0dGFja1NwZWVkKCk7ICAgICAgICBcclxuICAgICAgICBnanNkKz0ocmF0ZSkqKHRoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkKTtcclxuICAgICAgICB0aGlzLnNldEF0dGFja1NwZWVkKGdqc2QpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5b2T5YmN5pS76YCfICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0QXR0YWNrU3BlZWQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDEvdGhpcy5hdHRfamlhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuoeeul+mHjeS8pO+8jOWPluacgOWkpyAqL1xyXG4gICAgcHJvdGVjdGVkIGdldE1heFNlcmlvdXNseSgpOm51bWJlcntcclxuICAgICAgICAvL+aJvuWHuuaJgOaciemHjeS8pOexu+Wei+eahGJ1ZmZcclxuICAgICAgICBsZXQgc2VyaW91c2x5QnVmZj1uZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNlcmlvdXNseUluanVyZWQpe1xyXG4gICAgICAgICAgICAgICAgc2VyaW91c2x5QnVmZi5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoc2VyaW91c2x5QnVmZi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHNlcmlvdXNseUJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWF4QnVmZj1zZXJpb3VzbHlCdWZmWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKirlhYnnjq8t5byA5aeLKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICBhZGRIYWxvKGhhbG9EYXRhOkhhbG9EYXRhKXtcclxuICAgICAgICBpZighdGhpcy5tb25zdGVyX2hhbG8uaGFzKGhhbG9EYXRhLmhhbG9faWQpKXtcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2hhbG8uc2V0KGhhbG9EYXRhLmhhbG9faWQsaGFsb0RhdGEpO1xyXG4gICAgICAgICAgICBzd2l0Y2goaGFsb0RhdGEuaGFsb19pZCl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyMzBfQmlhbkZ1X1NraWxsX0hhbG86e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbWlzc19yYXRlKz1oYWxvRGF0YS5oYWxvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3RlcjY5X05pdVNhTWFuX1NraWxsX0hhbG86e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfZGVmZW5zZV92YWx1ZSs9aGFsb0RhdGEuaGFsb192YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXI3Nl9KaWFuRHVaaGVfU2tpbGxfSGFsbzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlKz10aGlzLmJhc2VfZGF0YS5TcGVlZCooaGFsb0RhdGEuaGFsb192YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGFsbyhoYWxvSWQ6SGFsb0lkKTpIYWxvRGF0YXtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2hhbG8uZ2V0KGhhbG9JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlSGFsbyhoYWxvSWQ6SGFsb0lkKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfaGFsby5oYXMoaGFsb0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJIYWxvKGhhbG9JZDpIYWxvSWQsdXVpZDpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBoYWxvRGF0YT10aGlzLm1vbnN0ZXJfaGFsby5nZXQoaGFsb0lkKTtcclxuICAgICAgICBpZihoYWxvRGF0YSl7XHJcbiAgICAgICAgICAgIC8v5Y+q5pyJ5ZCM5rqQ5omN5Y+v5Lul56e76ZmkXHJcbiAgICAgICAgICAgIGlmKGhhbG9EYXRhLmhhbG9fc291cmNlX3V1aWQ9PXV1aWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2hhbG8uZGVsZXRlKGhhbG9JZCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goaGFsb0lkKXtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyMzBfQmlhbkZ1X1NraWxsX0hhbG86e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZS09aGFsb0RhdGEuaGFsb192YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5leF9taXNzX3JhdGU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZT0wO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXI2OV9OaXVTYU1hbl9Ta2lsbF9IYWxvOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlLT1oYWxvRGF0YS5oYWxvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmV4X2RlZmVuc2VfdmFsdWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X2RlZmVuc2VfdmFsdWU9MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyNzZfSmlhbkR1WmhlX1NraWxsX0hhbG86e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21vdmVfc3BlZWRfdmFsdWUtPXRoaXMuYmFzZV9kYXRhLlNwZWVkKihoYWxvRGF0YS5oYWxvX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEhhbG8oKXtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfaGFsby5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuWFieeOry3nu5PmnZ8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICBnZXRIaWRkZW5BdHRyaWJ1dGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5oaWRkZW5fYXR0cmlidXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzRGllKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfc3RhdGU9PUVuZW15X1N0YXRlLmRpZXx8dGhpcy5tb25zdGVyX3N0YXRlPT1FbmVteV9TdGF0ZS5zaGlwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZW15U3RhdGUoKTpFbmVteV9TdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RW5lbXlQcmV2U3RhdGUoKTpFbmVteV9TdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZXZfc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNDYW5DaGVjaygpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgaXNDYW49dHJ1ZTtcclxuICAgICAgICBpZih0aGlzLmdldElzRGllKCkgfHwgdGhpcy5ub2RlLnk+PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfY3JlYXRlX3kgIHx8IHRoaXMuZ2V0RW5lbXlTdGF0ZSgpPT1FbmVteV9TdGF0ZS5ib3JuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXNDYW49ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0NhbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3VnaG5lc3MoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX3RvdWdobmVzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJBdHQoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2F0dDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDb2xvcihjb2xvclR5cGU6Q29sb3JUeXBlKXtcclxuICAgICAgICBsZXQgY29sb3I9Y2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgaWYodGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlNsb3dkb3duKSl7XHJcbiAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDgyLDI1NSwyNTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2goY29sb3JUeXBlKXtcclxuICAgICAgICAgICAgY2FzZSBDb2xvclR5cGUuSW5qdXJlZDp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5Db2xvci5SRUQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VyQ29sb3I9dGhpcy5jdXJfY29sb3I7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJDb2xvciE9Q29sb3JUeXBlLkluanVyZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5qdXJlZF9hY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluanVyZWRfYWN0aW9uLnN0b3AoKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbj1jYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuMSx7Y29sb3I6dGhpcy5ub2RlLmNvbG9yfSkuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbG9yKGN1ckNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb2xvclR5cGUuU2xvd0Rvd246e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoODIsMjU1LDI1Mik7XHJcbiAgICAgICAgICAgIH1icmVhazsgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9jb2xvcj1jb2xvclR5cGU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNvbG9yPWNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1ckNvbG9yKCk6Q29sb3JUeXBle1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9jb2xvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTbG93RG93bkNvbG9yKCk6Y2MuQ29sb3J7XHJcbiAgICAgICAgcmV0dXJuIGNjLmNvbG9yKDgyLDI1NSwyNTIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dERhdGEoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLGlzQnVsbGV0OmJvb2xlYW4sc2tpbGxSYXRlOm51bWJlcj0wKTpNb25zdGVyQXR0RGF0YXtcclxuICAgICAgICBsZXQgbWQ9bmV3IE1vbnN0ZXJBdHREYXRhKCk7XHJcbiAgICAgICAgbWQuZGFtYWdlX3R5cGU9ZGFtYWdlVHlwZTtcclxuICAgICAgICBtZC5pc19idWxsZXQ9aXNCdWxsZXQ7XHJcbiAgICAgICAgbWQuc2tpbGxfcmF0ZT1za2lsbFJhdGU7XHJcbiAgICAgICAgbWQubW9uc3Rlcl9hdHRyaWJ1dGU9dGhpcy5tb25zdGVyX2RhdGE7XHJcbiAgICAgICAgbWQuemVuZ3NoYW5nX3JhdGU9dGhpcy56ZW5nc2hhbmdfcmF0ZTtcclxuICAgICAgICBtZC5tb25zdGVyX3RzPXRoaXM7XHJcbiAgICAgICAgbWQuc3RyZW5ndGhfdHlwZT10aGlzLmdldFN0cmVuZ3RoVHlwZSgpO1xyXG4gICAgICAgIHJldHVybiBtZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0Z1bGxIcCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfaHA+PXRoaXMubWF4X2hwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuZW15U3RhdGUodHlwZTpFbmVteV9TdGF0ZSlcclxuICAgIHtcclxuICAgICAgICBpZih0eXBlIT10aGlzLm1vbnN0ZXJfc3RhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLnByZXZfc3RhdGU9dGhpcy5tb25zdGVyX3N0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfc3RhdGU9dHlwZTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodHlwZT09RW5lbXlfU3RhdGUuYXR0fHx0eXBlPT1FbmVteV9TdGF0ZS5za2lsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUudGltZVNjYWxlPSgxL3RoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkKS90aGlzLmF0dF9qaWFuZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHR5cGU9PUVuZW15X1N0YXRlLm1vdmUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmdldFN0cmVuZ3RoVHlwZSgpIT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZT10aGlzLmN1cl9tb3ZlX3NwZWVkLyh0aGlzLmJhc2VfZGF0YS5TcGVlZCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGVhdGgoKXtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuZGllKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZD1mYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9jb3VudD10aGlzLmlzX2NvdW50O1xyXG4gICAgICAgIE1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkud2lsbERlc3Ryb3lNb25zdGVyKHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMuZGVhdGhfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmRlYXRoX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SHVydCgpe1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLkluanVyZWQpOyAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhbWFnZSDkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBkYW1hZ2VUeXBlIOS8pOWus+exu+Wei1xyXG4gICAgICovXHJcbiAgICBpbmp1cmVXYWxsKGRhdGE6TW9uc3RlckF0dERhdGEpOkluanVyZWREYXRhe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dF93YWxsLmJlSW5qdXJlZChkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuS4gOS4qumqqOmqvOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg6aqo6aq85Yqo55S75ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIGRhdGEg5piv5ZCm55uR5ZCs5YWz6ZSu5bin77yM5YWz6ZSu5bin5pWw5o2u5YyF5ZCr5YWz6ZSu5bin5ZCN56ew77yM55uR5ZCs5Yiw5YWz6ZSu5bin5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZW5kQ2FsbGJhY2sg5pKt5pS+57uT5p2f5ZCO55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHBsYXlTcGluQW5pbWF0b24obmFtZTpzdHJpbmcsaXNMb29wOmJvb2xlYW49ZmFsc2UsZGF0YT86S2V5RnJhbWVEYXRhLGVuZENhbGxiYWNrPzpGdW5jdGlvbil7XHJcbiAgICAgICAgaWYodGhpcy5nZXRFbmVteVN0YXRlKCk9PUVuZW15X1N0YXRlLmRpZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFuaW1hPXRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsbmFtZSxpc0xvb3ApO1xyXG4gICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldFRyYWNrRXZlbnRMaXN0ZW5lcihhbmltYSwoZW50cnk6IHNwLnNwaW5lLlRyYWNrRW50cnksIGV2ZW50KSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50LmRhdGEubmFtZT09ZGF0YS5uYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVuZENhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgICAgICBhbmltYS5saXN0ZW5lcj1udWxsO1xyXG4gICAgICAgICAgICAgICAgZW5kQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheURlYWRBbmltYXRvbihuYW1lOnN0cmluZyxlbmRDYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgbGV0IGFuaW1hPXRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsbmFtZSxmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zcGluZS5zZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgICAgIGFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8qKuiuvue9rljlnZDmoIfvvIzov5Tlm57lgY/lt6bov5jmmK/lgY/lj7PkuoYsLTE65YGP5bem77yMMO+8muato+W4uO+8jDHvvJrlgY/lj7MgKi9cclxuICAgIHNldFgoZGlzWDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgbGVmdFJpZ2h0PTA7XHJcbiAgICAgICAgaWYoZGlzWD4zMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkaXNYPTMwMDtcclxuICAgICAgICAgICAgbGVmdFJpZ2h0PTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRpc1g8LTMwMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRpc1g9LTMwMDtcclxuICAgICAgICAgICAgbGVmdFJpZ2h0PS0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUueD1kaXNYO1xyXG4gICAgICAgIHJldHVybiBsZWZ0UmlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WShkaXNZOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9ZGlzWTtcclxuICAgICAgICAvL+S4jeiDveepv+i/h+WfjuWimVxyXG4gICAgICAgIGxldCB3YWxscz1XYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFsbFdhbGwoKTtcclxuICAgICAgICB3YWxscy5mb3JFYWNoKCh3YWxsOldhbGwsd2FsbFR5cGU6V2FsbFR5cGUpPT57XHJcbiAgICAgICAgICAgIC8v5qOA5p+l5Z+O5aKZXHJcbiAgICAgICAgICAgIGxldCByZWN0PXdhbGwuZ2V0V2FsbFJlY3QoKTtcclxuICAgICAgICAgICAgaWYocmVjdC5jb250YWlucyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5ub2RlLnk+d2FsbC5ub2RlLnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55PXJlY3QueU1heDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubm9kZS55PHdhbGwubm9kZS55KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueT1yZWN0LnlNaW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBsZXQgbWFpbldhbGw9V2FsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYWluV2FsbCgpO1xyXG4gICAgICAgIGxldCBtYWluUmVjdD1tYWluV2FsbC5nZXRXYWxsUmVjdCgpO1xyXG5cclxuICAgICAgICBpZihtYWluUmVjdC5jb250YWlucyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSkpe1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueT5tYWluV2FsbC5ub2RlLnkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnk9bWFpblJlY3QueU1heDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueTxtYWluV2FsbC5ub2RlLnkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnk9bWFpblJlY3QueU1pbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uQ29sbGlzaW9uU2hpcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5vZGUueTxtYWluUmVjdC55TWluKXtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk8PW1haW5SZWN0LnlNaW4tMjAwKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnk9bWFpblJlY3QueU1pbi0yMDA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW9uc3Rlcl9zdGF0ZSE9RW5lbXlfU3RhdGUuc2hpcCl7XHJcbiAgICAgICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNoaXBfbW9uc3Rlcl9udW0rKztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUuc2hpcCk7XHJcbiAgICAgICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnVwU2hpcE1vbnN0ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkaWVCeWZ1aHVvKCk6dm9pZHtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcCgtOTk5OTk5OTk5OSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ29sbGlzaW9uU2hpcCgpe1xyXG4gICAgICAgIGxldCBtZD1uZXcgTW9uc3RlckF0dERhdGEoKTtcclxuICAgICAgICBtZC5kYW1hZ2VfdHlwZT1EYW1hZ2VUeXBlLlNoaXA7XHJcbiAgICAgICAgbWQuaXNfYnVsbGV0PWZhbHNlO1xyXG4gICAgICAgIG1kLnNraWxsX3JhdGU9MDtcclxuICAgICAgICBtZC5tb25zdGVyX2F0dHJpYnV0ZT10aGlzLm1vbnN0ZXJfZGF0YTtcclxuICAgICAgICBtZC56ZW5nc2hhbmdfcmF0ZT10aGlzLnplbmdzaGFuZ19yYXRlO1xyXG4gICAgICAgIG1kLm1vbnN0ZXJfdHM9dGhpcztcclxuICAgICAgICBtZC5zdHJlbmd0aF90eXBlPXRoaXMuZ2V0U3RyZW5ndGhUeXBlKClcclxuICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuYmVJbmp1cmVkKG1kLGZhbHNlLHRoaXMuZ2V0Q3VySHAoKSowLjIpXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcCgtOTk5OTk5OTk5OSk7XHJcbiAgICB9XHJcbiAgICBzZXRQb3MocG9zOmNjLlZlYzIpe1xyXG4gICAgICAgIHRoaXMuc2V0WChwb3MueCk7XHJcbiAgICAgICAgdGhpcy5zZXRZKHBvcy55KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb3ZlRGlyKGRpcjpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249ZGlyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFFpYW5ZaW5NaW4obnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5taW5fcWlhbnlpbj09MClcclxuICAgICAgICB0aGlzLm1pbl9xaWFueWluPW51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRRaWFuWWluTWluKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbl9xaWFueWluO1xyXG4gICAgfVxyXG4gICAgLyoq6K6+572u57+76L2sICovXHJcbiAgICBzZXRGbGlwKGlzUmlnaHQ6Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD1pc1JpZ2h0P3RoaXMuc2V0dXBfc2NhbGU6LXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICB9XHJcbiAgICAvL+makOiXj+mYtOW9sVxyXG4gICAgaGlkU2hhZG93KCl7XHJcbiAgICAgICAgdGhpcy5zaGFkb3cub3BhY2l0eT0wO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5ocF9wcm9ncmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfcHJvZ3Jlc3Muc2V0UG9zKHRoaXMubm9kZS54K3RoaXMuaHBfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmhwX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNoYWRvdyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54K3RoaXMubm9kZS5zY2FsZVgqdGhpcy5zaGFkb3dfcG9zLngsdGhpcy5ub2RlLnkrdGhpcy5ub2RlLnNjYWxlWSp0aGlzLnNoYWRvd19wb3MueSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUuekluZGV4PShNYXRoLnJvdW5kKDgwMDAtdGhpcy5ub2RlLnkqMTApKTtcclxuICAgICAgICBpZih0aGlzLmdldEVuZW15U3RhdGUoKSE9RW5lbXlfU3RhdGUuYm9ybiYmdGhpcy5nZXRTdHJlbmd0aFR5cGUoKSE9U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ub2RlLnk+PUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfY3JlYXRlX3kpe1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSozLzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1RFU1RcclxuICAgICAgICAvLyBpZih0aGlzLmdldEVuZW15U3RhdGUoKT09RW5lbXlfU3RhdGUubW92ZSl7XHJcbiAgICAgICAgLy8gICAgIGxldCBhbGxNb25zdGVyPU1vbnN0ZXJNYW5hZ2VyLmdldEluc3RhbmNlKCkubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAvLyAgICAgbGV0IGxlbj1hbGxNb25zdGVyLmxlbmd0aDtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IG1vbnN0ZXI9YWxsTW9uc3RlcltpXS5nZXRDb21wb25lbnQoTW9uc3Rlcik7XHJcbiAgICAgICAgLy8gICAgICAgICBpZihtb25zdGVyJiZtb25zdGVyLnV1aWQhPXRoaXMudXVpZCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy/liKTmlq3ot53nprtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgb3RoZXJQb3M9bW9uc3Rlci5nZXRDZW50ZXJQb3MoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgc2VsZlBvcz10aGlzLmdldENlbnRlclBvcygpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBkaXN0YW5jZT0ob3RoZXJQb3Muc3ViKHNlbGZQb3MpLm1hZygpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihkaXN0YW5jZTw9NTApe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvL+S6pOmbhuS6hlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvL+S4iumdoueahOi1sOWIh+e6v++8jOS4i+mdoueahOWeguebtOi1sOS4i1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZihzZWxmUG9zLnk+b3RoZXJQb3MueSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RGlyPXRoaXMubW92ZV9kaXJlY3Rpb24rTWF0aC5QSS8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYoIG5ld0RpciA8PU1hdGguUEkgJiYgbmV3RGlyPj0wKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEaXI9dGhpcy5tb3ZlX2RpcmVjdGlvbi1NYXRoLlBJLzJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249bmV3RGlyO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZSBpZihzZWxmUG9zLnk8b3RoZXJQb3MueSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPU1hdGguUEkqMy8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mt7vliqDlm57osIPnm5HlkKwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIGFkZEluaXRMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZENoYW5nZUhwTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmNoYW5nZV9ocF9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZFh1YW5ZdW5MaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMueHVhbnl1bl9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZERlYXRoQ2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuZGVhdGhfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9ICAgIFxyXG4gICAgYWRkSW5qdXJ5Q2FsbGJhY2soY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlX2luanVyeV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeiOt+W+l+avj+enjeaAqueJqeS4jeWQjOeahOaVsOaNriAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkSW5pdFBvcygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blrozmlbDmja7lsLHliKDpmaTkuoZcclxuICAgICAgICBsZXQganVqaT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2p1amknKTtcclxuICAgICAgICB0aGlzLmp1amlfcG9zPWp1amkuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgZ29uZ2ppPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnZ29uZ2ppJyk7XHJcbiAgICAgICAgdGhpcy5hdHRfcG9zPWdvbmdqaS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBocD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hwJyk7XHJcbiAgICAgICAgdGhpcy5ocF9wb3M9aHAuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgc2hhZG93Tm9kZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfU2hhZG93Jyk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dfcG9zPXNoYWRvd05vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLnNoYWRvd19zaXplPXNoYWRvd05vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICBsZXQgY2VudGVyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2VudGVyJyk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfcG9zPWNlbnRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIC8vY2MubG9nKHRoaXMuc2hhZG93X3NpemUpO1xyXG5cclxuICAgICAgICBqdWppLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBnb25namkucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGhwLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBzaGFkb3dOb2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICBjZW50ZXIucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGlmKHRoaXMuc2hhZG93KXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5zaGFkb3cuc2V0UG9zaXRpb24oY2MudjIodGhpcy5ub2RlLngrdGhpcy5ub2RlLnNjYWxlWCp0aGlzLnNoYWRvd19wb3MueCx0aGlzLm5vZGUueSt0aGlzLm5vZGUuc2NhbGVZKnRoaXMuc2hhZG93X3Bvcy55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dFBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgbGV0IHBvcz1jYy52MigwLDEyOCk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMubW9uc3Rlcl90eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAyMDogcG9zPWNjLnYyKDAsMTI4KTticmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogcG9zPXRoaXMuYXR0X3BvczticmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc1Bvcz10aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQoY2MudjIocG9zLngqdGhpcy5ub2RlLnNjYWxlWCxwb3MueSp0aGlzLm5vZGUuc2NhbGVZKSk7XHJcbiAgICAgICAgcmV0dXJuIGRpc1BvcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRKdUppUG9zKCk6Y2MuVmVjMlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLm5vZGUueCt0aGlzLmp1amlfcG9zLngqdGhpcy5ub2RlLnNjYWxlWCx0aGlzLm5vZGUueSt0aGlzLmp1amlfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2hlU2hvdVBvcygpOmNjLlZlYzJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLngrdGhpcy5qdWppX3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrdGhpcy5qdWppX3Bvcy55KnRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENlbnRlclBvcygpOmNjLlZlYzJ7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54K3RoaXMuY2VudGVyX3Bvcy54KnRoaXMubm9kZS5zY2FsZVgsdGhpcy5ub2RlLnkrdGhpcy5jZW50ZXJfcG9zLnkqdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5pS75Ye75Z+O5aKZ55qEWOWdkOagh++8jOWKqOS9nOS4jeS4gOagt+WvvOiHtOaUu+WHu+eahFjlnZDmoIfkuI3kuIDoh7QgKi9cclxuICAgIGdldEF0dGFja1dhbGxYKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0X3BvcztcclxuICAgIH1cclxufVxyXG4iXX0=