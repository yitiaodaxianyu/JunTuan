
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
        // if(data){
        //     this.spine.setTrackEventListener(anima,(entry: sp.spine.TrackEntry, event) =>{
        //         if(event.data.name==data.name){
        //             data.callback();
        //         }
        //     })
        // }
        // if(endCallback){
        //     this.spine.setTrackCompleteListener(anima,(entry: sp.spine.TrackEntry, event) =>{
        //         anima.listener=null;
        //         endCallback();
        //     })
        // }
        if (endCallback) {
            this.spine.setCompleteListener(function (trackEntry, loopCount) {
                var nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
                if (nameTemp === name && endCallback) {
                    if (data && data.callback) {
                        data.callback();
                    }
                    endCallback();
                }
                // this.spine.setCompleteListener(null);
            });
        }
    };
    Monster.prototype.playDeadAnimaton = function (name, endCallback) {
        var _this = this;
        var anima = this.spine.setAnimation(0, name, false);
        this.spine.setCompleteListener(function (trackEntry, loopCount) {
            var nameTemp = trackEntry.animation ? trackEntry.animation.name : '';
            if (nameTemp === name && endCallback) {
                endCallback();
            }
            _this.spine.setCompleteListener(null);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBMkc7QUFDM0csaURBQTRDO0FBQzVDLGlFQUE4RTtBQUM5RSw4Q0FBeUM7QUFFekMsNkNBQXNMO0FBQ3RMLDREQUF3RjtBQUN4RixtREFBOEM7QUFDOUMsMEVBQTZHO0FBQzdHLHVEQUFrRDtBQUNsRCwwQ0FBOEQ7QUFFOUQsMkRBQWlFO0FBQ2pFLHNEQUErRztBQUMvRyxvREFBK0M7QUFDL0Msa0RBQWlEO0FBQ2pELHFEQUFnRDtBQUVoRCwwREFBcUQ7QUFDckQsb0RBQTBEO0FBRTFELG1EQUE4QztBQUl4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1Qyx1QkFBdUI7QUFFdkI7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUF1aERDO1FBcmhEYSxXQUFLLEdBQWdCLElBQUksQ0FBQztRQUNwQyxVQUFVO1FBQ0EsZUFBUyxHQUFvQiw2QkFBZSxDQUFDLEtBQUssQ0FBQztRQUM3RCxVQUFVO1FBQ0gsZ0JBQVUsR0FBVyxLQUFLLENBQUM7UUFDbEMsVUFBVTtRQUNBLG1CQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLFlBQVk7UUFDRixxQkFBZSxHQUFXLENBQUMsQ0FBQztRQUN0QyxVQUFVO1FBQ0gsa0JBQVksR0FBVyxDQUFDLENBQUM7UUFDaEMsc0JBQXNCO1FBQ1osa0JBQVksR0FBZ0MsSUFBSSxDQUFDO1FBQzNELG9CQUFvQjtRQUNWLHlCQUFtQixHQUFnQyxJQUFJLENBQUM7UUFDbEUsYUFBYTtRQUNILGVBQVMsR0FBeUIsSUFBSSxDQUFDO1FBQ2pELGFBQWE7UUFDYixzQkFBZ0IsR0FBb0IsSUFBSSxDQUFDO1FBQy9CLG9CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBQzNCLHFCQUFlLEdBQVks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LEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6SCxDQUFDO0lBRUQsaUNBQWlDO0lBQ2pDLGdDQUFjLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQXRoRGdCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0F1aEQzQjtJQUFELGNBQUM7Q0F2aERELEFBdWhEQyxDQXZoRG9DLEVBQUUsQ0FBQyxTQUFTLEdBdWhEaEQ7a0JBdmhEb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuZW15X1N0YXRlLCBFbmVteV9CdWZmX1R5cGUsIEVuZW15X0RlQnVmZl9UeXBlLCBFbmVteV9Jbmp1cmVkX1R5cGUgfSBmcm9tIFwiLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IEhwUHJvZ3Jlc3NCYXIgZnJvbSBcIi4vSHBQcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdvbmdKaURhdGEgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEtleUZyYW1lRGF0YSwgTW9uc3RlckZhY2VOYW1lLCBNb25zdGVyU2tpblR5cGUsIEluanVyZWREYXRhLCBGZWVkQmFja1R5cGUsIFN0cmVuZ3RoVHlwZSwgSGlkZGVuQXR0cmlidXRlLCBNb25zdGVyQXR0RGF0YSwgTW9uc3RlclNraWxsRGF0YSwgQ29sb3JUeXBlIH0gZnJvbSBcIi4vTW9uc3RlckRhdGFcIjtcclxuaW1wb3J0IHsgSnNvbk1vbnN0ZXJDb25maWd1cmUsIE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Nb25zdGVyQ29uZmlndXJlXCI7XHJcbmltcG9ydCBNb25zdGVyTWFuYWdlciBmcm9tIFwiLi9Nb25zdGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXMsIE1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IEdyb3VuZE1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvR3JvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kZSwgR2FtZVN0YXRlLCBUZXh0X1R5cGUgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4uL01hemUvTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQm9zc0NoYWxsZW5nZU1hbmFnZXIgfSBmcm9tIFwiLi4vQWN0aXZpdHkvQm9zc0NoYWxsZW5nZVwiO1xyXG5pbXBvcnQgeyBCdWZmSWQsIEJ1ZmZUeXBlLCBEYW1hZ2VUeXBlLCBIYWxvRGF0YSwgSGFsb0lkLCBIZXJvX1R5cGUsIFNraWxsVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgQnVmZlRpbWVyIGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZlRpbWVyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgU2tpbGxNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL1NraWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBKc29uTW9uc3RlckF0dHJpYnV0ZSB9IGZyb20gXCIuL0RhdGEvTW9uc3RlckF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJTa2lsbE1hbmFnZXIgfSBmcm9tIFwiLi9EYXRhL01vbnN0ZXJTa2lsbFwiO1xyXG5pbXBvcnQgV2FsbCBmcm9tIFwiLi4vV2FsbC9XYWxsXCI7XHJcbmltcG9ydCBXYWxsTWFuYWdlciBmcm9tIFwiLi4vV2FsbC9XYWxsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBXYWxsVHlwZSB9IGZyb20gXCIuLi9XYWxsL1dhbGxDb25maWdcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vKirmgKrnianpgJrnlKjnsbvvvIzlj6rlpITnkIbmlbDmja7vvIzkuI3lpITnkIbooajnjrAgKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9uc3RlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIHNwaW5lOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICAvKirnmq7ogqTnsbvlnosgKi9cclxuICAgIHByb3RlY3RlZCBza2luX3R5cGU6IE1vbnN0ZXJTa2luVHlwZSA9IE1vbnN0ZXJTa2luVHlwZS5Ta2luMTtcclxuICAgIC8qKuaAqueJqWlkICovXHJcbiAgICBwdWJsaWMgbW9uc3Rlcl9pZDogbnVtYmVyID0gMTAwMTE7XHJcbiAgICAvKirmgKrniannrYnnuqcgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2xldmVsOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5oCq54mp6KGA6YeP57O75pWwICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9ocF9yYXRlOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5oCq54mp56eN57G7ICovXHJcbiAgICBwdWJsaWMgbW9uc3Rlcl90eXBlOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5oCq54mp55qE5pyA57uI5oiY5paX5L2/55So55qE5pWw5YC8LOWPr+abtOaUuSAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfZGF0YTogSnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzID0gbnVsbDtcclxuICAgIC8qKuaAqueJqeeahOWfuuehgOaImOaWl+aVsOWAvO+8jOS4jeWPr+abtOaUuSAqL1xyXG4gICAgcHJvdGVjdGVkIGJhc2VfYXR0cmlidXRlX2RhdGE6IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyA9IG51bGw7XHJcbiAgICAvKirmgKrniannmoTln7rnoYDmlbDlgLwgKi9cclxuICAgIHByb3RlY3RlZCBiYXNlX2RhdGE6IEpzb25Nb25zdGVyQ29uZmlndXJlID0gbnVsbDtcclxuICAgIC8qKuaAqueJqeeahOmakOiXj+WxnuaApyAqL1xyXG4gICAgaGlkZGVuX2F0dHJpYnV0ZTogSGlkZGVuQXR0cmlidXRlID0gbnVsbDtcclxuICAgIHByb3RlY3RlZCBjdXJfbW92ZV9zcGVlZDogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBtb3ZlX3RhcmdldF9wb3M6IGNjLlZlYzIgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIG1vdmVfZGlyZWN0aW9uOiBudW1iZXIgPSBNYXRoLlBJICogMyAvIDI7XHJcbiAgICAvKirmnJ3lkJHlkI3np7AgKi9cclxuICAgIHByb3RlY3RlZCBmYWNlX3R5cGU6IE1vbnN0ZXJGYWNlTmFtZSA9IE1vbnN0ZXJGYWNlTmFtZS5Gcm9udDtcclxuICAgIC8qKuW9k+WJjeeahOihgOmHjyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl9ocDogbnVtYmVyID0gMDtcclxuICAgIC8qKuacgOWkp+eahOihgOmHjyAqL1xyXG4gICAgcHJvdGVjdGVkIG1heF9ocDogbnVtYmVyID0gMDtcclxuICAgIC8qKuihgOadoei/m+W6puadoSAqL1xyXG4gICAgcHJvdGVjdGVkIGhwX3Byb2dyZXNzOiBIcFByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIC8qKumYtOW9sSAqL1xyXG4gICAgcHJvdGVjdGVkIHNoYWRvdzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBzaGFkb3dfcG9zOiBjYy5WZWMyID0gbnVsbDtcclxuICAgIHNoYWRvd19zaXplOiBjYy5TaXplID0gbnVsbDtcclxuICAgIC8qKuWHj+S8pOeOhyAqL1xyXG4gICAgamlhbnNoYW5nX3JhdGU6IG51bWJlciA9IDA7XHJcbiAgICAvKirlop7kvKTnjocgKi9cclxuICAgIHplbmdzaGFuZ19yYXRlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5pS75Ye76Ze06ZqU77yI56eS77yM6KGo56S65aSa5bCR56eS5pS75Ye75LiA5qyh77yJICovXHJcbiAgICBwcm90ZWN0ZWQgYXR0X2ppYW5nZTogbnVtYmVyID0gMTtcclxuICAgIC8qKuaUu+WHu+iuoeaXtiAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dF9qaXNodTogbnVtYmVyID0gMDtcclxuICAgIC8qKuaKgOiDveiuoeaXtiAqL1xyXG4gICAgcHJvdGVjdGVkIHNraWxsX2ppc2h1OiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5b2T5YmN55qE5pS75Ye75YqbICovXHJcbiAgICBwcm90ZWN0ZWQgY3VyX2F0dDogbnVtYmVyID0gMDtcclxuICAgIC8qKuW9k+WJjeeahOmfp+aApyAqL1xyXG4gICAgcHJvdGVjdGVkIGN1cl90b3VnaG5lc3M6IG51bWJlciA9IDA7XHJcbiAgICAvKirmlLvlh7vnm67moIcs5pS75Ye755uu5qCH5Li6bnVsbOaXtu+8jOebruagh+WwseaYr+WfjuWimSAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dF90YXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoq5oCq54mp5b2T5YmN55qE54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgbW9uc3Rlcl9zdGF0ZTogRW5lbXlfU3RhdGUgPSBFbmVteV9TdGF0ZS5zdGFuZGJ5O1xyXG4gICAgLyoq5oCq54mp5LiK5LiA5Liq54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgcHJldl9zdGF0ZTogRW5lbXlfU3RhdGUgPSBFbmVteV9TdGF0ZS5zdGFuZGJ5O1xyXG4gICAgLyoq5oCq54mp5b2T5YmN5oul5pyJ55qEYnVmZiAqL1xyXG4gICAgcHJvdGVjdGVkIG1vbnN0ZXJfYnVmZjogTWFwPEJ1ZmZJZCwgQnVmZlRpbWVyPiA9IG51bGw7XHJcbiAgICAvKirmgKrnianlvZPliY3mi6XmnInnmoRkZWJ1ZmYgKi9cclxuICAgIHByb3RlY3RlZCBtb25zdGVyX2RlYnVmZjogTWFwPEJ1ZmZJZCwgQnVmZlRpbWVyPiA9IG51bGw7XHJcbiAgICAvKirmjIflrprnmoTnvKnmlL7lgLwqL1xyXG4gICAgcHJvdGVjdGVkIHNldHVwX3NjYWxlOiBudW1iZXIgPSAwLjQ7XHJcbiAgICBwcm90ZWN0ZWQgaXNfYm9zczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzX2Nhbl9jb3VudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcm90ZWN0ZWQgaXNfY291bnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoq5Z+O5aKZ55qEWei9tOWdkOaghyAqL1xyXG4gICAgcHJvdGVjdGVkIHdhbGxfeXk6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgYXR0X3BvczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xyXG4gICAgLyoq5YiG5pWwICovXHJcbiAgICBwdWJsaWMgc2NvcmU6IG51bWJlciA9IDA7XHJcbiAgICAvKirni5nlh7vnnoTlh4bnmoTkvY3nva4gKi9cclxuICAgIHByb3RlY3RlZCBqdWppX3BvczogY2MuVmVjMiA9IGNjLnYyKDAsIDApO1xyXG4gICAgLyoq6KGA5p2h55qE5L2N572uICovXHJcbiAgICBwcm90ZWN0ZWQgaHBfcG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XHJcbiAgICAvKirkuK3lv4PkvY3nva7vvIznlKjkuo7ojIPlm7Tmo4DmtYsgKi9cclxuICAgIHByb3RlY3RlZCBjZW50ZXJfcG9zOiBjYy5WZWMyID0gY2MudjIoMCwgMCk7XHJcbiAgICAvL+WPl+S8pOWKqOS9nFxyXG4gICAgcHJvdGVjdGVkIGluanVyZWRfYWN0aW9uOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gICAgLyoq5Yid5aeL5YyW5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGluaXRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuaAqueJqeihgOmHj+WPkeeUn+WPmOWMluaXtueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VfaHBfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKuecqeaZleWbnuiwg++8jOeUqOS6jmJvc3Pmlr3ms5XooqvkuK3mlq0gKi9cclxuICAgIHByaXZhdGUgeHVhbnl1bl9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq5q275Lqh5Zue6LCD77yM5oCq54mp5q275Lqh5pe26Kem5Y+R77yM55So5LqO5pKt5pS+6Ieq6Lqr5a+55bqU55qE5q275Lqh5Yqo55S7ICovXHJcbiAgICBwcml2YXRlIGRlYXRoX2NhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGw7XHJcbiAgICAvKirooqvkuLvliqjmioDog73lj5fkvKTml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgYWN0aXZlX2luanVyeV9jYWxsYmFjazogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgLyoq56e75Yqo5Yiw55uu5qCH5Zyw54K55Zue6LCDICovXHJcbiAgICBwcm90ZWN0ZWQgbW92ZV9lbmRfY2FsbGJhY2s6IEZ1bmN0aW9uID0gbnVsbDtcclxuICAgIC8qKmRlYnVmZuWinuS8pOe7n+iuoSAqL1xyXG4gICAgcHJpdmF0ZSBpbmp1cnlfZGFtYWdlX3N0YXRzOiBNYXA8bnVtYmVyLCBudW1iZXI+ID0gbnVsbDtcclxuICAgIC8qKuayn+WjkeS8pOWus+iuoeeulyAqL1xyXG4gICAgaXNfY2FuX2d1bGx5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmi6XmnInnmoTlhYnnjq8gKi9cclxuICAgIHByaXZhdGUgbW9uc3Rlcl9oYWxvOiBNYXA8SGFsb0lkLCBIYWxvRGF0YT4gPSBudWxsO1xyXG4gICAgLyoq6aKd5aSW55qE6Zeq6YG/546HICovXHJcbiAgICBwcml2YXRlIGV4X21pc3NfcmF0ZTogbnVtYmVyID0gMDtcclxuICAgIC8qKumineWklueahOmYsuW+oeWKmyAqL1xyXG4gICAgcHJpdmF0ZSBleF9kZWZlbnNlX3ZhbHVlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq6aKd5aSW55qE56e75Yqo6YCf5bqmICovXHJcbiAgICBwcml2YXRlIGV4X21vdmVfc3BlZWRfdmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5oqA6IO955qELS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICAvKirmioDog73mlbDmja4gKi9cclxuICAgIHNraWxsX2RhdGE6IE1vbnN0ZXJTa2lsbERhdGEgPSBudWxsO1xyXG4gICAgLyoq5omA5pyJ5oqA6IO955qE5b2T5YmN55qE5Ya35Y205pe26Ze0ICovXHJcbiAgICBza2lsbF9jb2xkX2Rvd246IG51bWJlcltdID0gW107XHJcbiAgICAvKirmioDog73pmJ/liJcgKi9cclxuICAgIHNraWxsX3F1ZXVlOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgLyoq5b2T5YmN5L2/55So55qE5oqA6IO9LDDku6PooajmsqHmnIkgKi9cclxuICAgIGN1cl9za2lsbF9pbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8qKueisOaSnuWZqCAqL1xyXG4gICAgY29sbGlkZXI6IGNjLkNvbGxpZGVyID0gbnVsbDtcclxuICAgIC8qKuimgeaUu+WHu+eahOWfjuWimSAqL1xyXG4gICAgYXR0X3dhbGw6IFdhbGwgPSBudWxsO1xyXG4gICAgLyoq54m15byV5pyA5bCP6Led56a7ICovXHJcbiAgICBtaW5fcWlhbnlpbjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjdXJfY29sb3I6IENvbG9yVHlwZSA9IENvbG9yVHlwZS5OdWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuc3BpbmUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLmxvYWRJbml0UG9zKCk7XHJcbiAgICAgICAgdGhpcy53YWxsX3l5ID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9hdHRfeTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZiA9IG5ldyBNYXA8QnVmZklkLCBCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZiA9IG5ldyBNYXA8QnVmZklkLCBCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2hhbG8gPSBuZXcgTWFwPEhhbG9JZCwgSGFsb0RhdGE+KCk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlciA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ29sbGlkZXIpO1xyXG4gICAgICAgIHRoaXMuY29sbGlkZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChtb25zdGVySWQ6IG51bWJlciwgbGV2ZWw6IG51bWJlciwgaHBSYXRlOiBudW1iZXIsIGlzQ2FuQ291bnQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2lkID0gbW9uc3RlcklkO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9sZXZlbCA9IGxldmVsO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9ocF9yYXRlID0gaHBSYXRlO1xyXG4gICAgICAgIGxldCBqc29uRGF0YSA9IE1vbnN0ZXJDb25maWd1cmVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJDb25maWd1cmUobW9uc3RlcklkKTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfdHlwZSA9IGpzb25EYXRhLk1vbnN0ZXJDbGFzcztcclxuICAgICAgICBsZXQgYXR0cmlidXRlSWQgPSBNb25zdGVyR3Jvd3RoQXR0cmlidXRlc01hbmFnZXIuZ2V0SWQodGhpcy5tb25zdGVyX2lkLCBsZXZlbCk7XHJcbiAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhID0gTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbk1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzKGF0dHJpYnV0ZUlkKTtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9ndWxseSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQgPSBpc0NhbkNvdW50O1xyXG4gICAgICAgIHRoaXMuaXNfY291bnQgPSB0aGlzLmlzX2Nhbl9jb3VudDtcclxuICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlID0gMDtcclxuICAgICAgICAvL3RoaXMuaW5pdE91dHdhcmQoanNvbkRhdGEuU2tpbik7ICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXREYXRhKGpzb25EYXRhKTtcclxuICAgICAgICB0aGlzLmFkZEhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5OdWxsKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1pbl9xaWFueWluID0gMDtcclxuICAgICAgICBpZiAodGhpcy5pbml0X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuc3BpbmUucGF1c2VkPWZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMitNYXRoLnJhbmRvbSgpKihNYXRoLlBJLzYpLShNYXRoLlBJLzEyKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGluaXRTdW1tb24obW9uc3RlcklkOiBudW1iZXIsIGJvc3NBdHRyaWJ1dGU6IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcykge1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9pZCA9IG1vbnN0ZXJJZDtcclxuICAgICAgICBsZXQganNvbkRhdGEgPSBNb25zdGVyQ29uZmlndXJlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyQ29uZmlndXJlKG1vbnN0ZXJJZCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX3R5cGUgPSBqc29uRGF0YS5Nb25zdGVyQ2xhc3M7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ3VsbHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2NvdW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19jb3VudCA9IHRoaXMuaXNfY2FuX2NvdW50O1xyXG4gICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YSA9IGNjLmluc3RhbnRpYXRlKGJvc3NBdHRyaWJ1dGUpO1xyXG4gICAgICAgIHN3aXRjaCAoanNvbkRhdGEuU3RyZW5ndGhUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuSGVhbHRoID0gYm9zc0F0dHJpYnV0ZS5IZWFsdGggLyA1MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2sgPSBib3NzQXR0cmlidXRlLkF0dGFjayAqIDAuOTcyNDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlID0gYm9zc0F0dHJpYnV0ZS5EZWZlbnNlICogMC42O1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5IZWFsdGggPSBib3NzQXR0cmlidXRlLkhlYWx0aCAvIDUwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkF0dGFjayA9IGJvc3NBdHRyaWJ1dGUuQXR0YWNrICogMC45NTkyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UgPSAwO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXREYXRhKGpzb25EYXRhKTtcclxuICAgICAgICB0aGlzLmFkZEhwUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMuc2V0RW5lbXlTdGF0ZShFbmVteV9TdGF0ZS5zdGFuZGJ5KTtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5OdWxsKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Db2xsaWRlcik7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1pbl9xaWFueWluID0gMDtcclxuICAgICAgICBpZiAodGhpcy5pbml0X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoRGF0YShsZXZlbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2xldmVsID0gbGV2ZWw7XHJcbiAgICAgICAgbGV0IGpzb25EYXRhID0gTW9uc3RlckNvbmZpZ3VyZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlckNvbmZpZ3VyZSh0aGlzLm1vbnN0ZXJfaWQpO1xyXG4gICAgICAgIC8v6YeN572u5pWw5o2uXHJcbiAgICAgICAgbGV0IGF0dHJpYnV0ZUlkID0gTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNNYW5hZ2VyLmdldElkKHRoaXMubW9uc3Rlcl9pZCwgbGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YSA9IE1vbnN0ZXJHcm93dGhBdHRyaWJ1dGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyhhdHRyaWJ1dGVJZCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEpO1xyXG4gICAgICAgIHRoaXMuYmFzZV9kYXRhID0ganNvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5jdXJfaHAgPSB0aGlzLm1heF9ocCA9IHRoaXMubW9uc3Rlcl9kYXRhLkhlYWx0aDtcclxuICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkID0gdGhpcy5iYXNlX2RhdGEuU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5hdHRfamlhbmdlID0gMSAvIHRoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkO1xyXG4gICAgICAgIHRoaXMuY3VyX2F0dCA9IHRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjaztcclxuICAgICAgICAvLyBpZih0aGlzLmJhc2VfZGF0YS5Ta2lsbE51bT4wKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb2FkTW9uc3RlclNraWxsRGF0YSgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8qKuWIneWni+WMluWkluingiovXHJcbiAgICAvLyBwcml2YXRlIGluaXRPdXR3YXJkKHNraW5UeXBlOk1vbnN0ZXJTa2luVHlwZSl7XHJcbiAgICAvLyAgICAgdGhpcy5za2luX3R5cGU9c2tpblR5cGU7XHJcbiAgICAvLyAgICAgdGhpcy5zZXRTa2luKHRoaXMuZ2V0U2tpbk5hbWUoKSk7XHJcbiAgICAvLyAgICAgdGhpcy5wbGF5U3BpbkFuaW1hdG9uKHRoaXMuZ2V0QW5pbWFOYW1lKE1vbnN0ZXJBY3Rpb25OYW1lLklkbGUpLHRydWUpO1xyXG4gICAgLy8gfVxyXG4gICAgLyoq5Yid5aeL5YyW5pWw5o2uICovXHJcbiAgICBwcml2YXRlIGluaXREYXRhKGJhc2VEYXRhOiBKc29uTW9uc3RlckNvbmZpZ3VyZSkge1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhID0gY2MuaW5zdGFudGlhdGUodGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhKTtcclxuICAgICAgICB0aGlzLmJhc2VfZGF0YSA9IGJhc2VEYXRhO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwID0gdGhpcy5tYXhfaHAgPSB0aGlzLm1vbnN0ZXJfZGF0YS5IZWFsdGggKiB0aGlzLm1vbnN0ZXJfaHBfcmF0ZTtcclxuICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkID0gdGhpcy5iYXNlX2RhdGEuU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5hdHRfamlhbmdlID0gMSAvIHRoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkO1xyXG4gICAgICAgIHRoaXMuY3VyX2F0dCA9IHRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjaztcclxuICAgICAgICB0aGlzLmN1cl90b3VnaG5lc3MgPSAwO1xyXG4gICAgICAgIHRoaXMuc2V0dXBfc2NhbGUgPSB0aGlzLmJhc2VfZGF0YS5TY2FsZTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuc2tpbl90eXBlID0gYmFzZURhdGEuU2tpbjtcclxuICAgICAgICB0aGlzLmhpZGRlbl9hdHRyaWJ1dGUgPSBuZXcgSGlkZGVuQXR0cmlidXRlKCk7XHJcbiAgICAgICAgdGhpcy5pbmp1cnlfZGFtYWdlX3N0YXRzID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcclxuICAgICAgICBpZiAodGhpcy5iYXNlX2RhdGEuU2tpbGxOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZE1vbnN0ZXJTa2lsbERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkTW9uc3RlclNraWxsRGF0YSgpIHtcclxuICAgICAgICBsZXQgc2tpbGxEYXRhID0gbmV3IE1vbnN0ZXJTa2lsbERhdGEoKTtcclxuICAgICAgICBza2lsbERhdGEuQ29sZERvd24gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Jbml0Q29sZERvd24gPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzEgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzIgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzMgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5Ta2lsbFZhbHVlXzQgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xyXG4gICAgICAgIHNraWxsRGF0YS5DYXN0aW5nUmFuZ2UgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xyXG4gICAgICAgIGZvciAobGV0IHMgPSAxOyBzIDw9IHRoaXMuYmFzZV9kYXRhLlNraWxsTnVtOyBzKyspIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gTW9uc3RlclNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElkKHRoaXMubW9uc3Rlcl9pZCwgcywgdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLlNraWxsTGV2ZWwpXHJcbiAgICAgICAgICAgIGxldCBqc29uRGF0YSA9IE1vbnN0ZXJTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uTW9uc3RlclNraWxsKGlkKTtcclxuICAgICAgICAgICAgaWYgKGpzb25EYXRhID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8xLnNldChzLCBqc29uRGF0YS5Ta2lsbFZhbHVlXzEpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8yLnNldChzLCBqc29uRGF0YS5Ta2lsbFZhbHVlXzIpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV8zLnNldChzLCBqc29uRGF0YS5Ta2lsbFZhbHVlXzMpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuU2tpbGxWYWx1ZV80LnNldChzLCBqc29uRGF0YS5Ta2lsbFZhbHVlXzQpO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuQ29sZERvd24uc2V0KHMsIGpzb25EYXRhLkNvbGREb3duKTtcclxuICAgICAgICAgICAgc2tpbGxEYXRhLkluaXRDb2xkRG93bi5zZXQocywganNvbkRhdGEuSW5pdGlhbENvbGREb3duKTtcclxuICAgICAgICAgICAgdGhpcy5za2lsbF9jb2xkX2Rvd25bcyAtIDFdID0ganNvbkRhdGEuSW5pdGlhbENvbGREb3duO1xyXG4gICAgICAgICAgICBza2lsbERhdGEuQ2FzdGluZ1JhbmdlLnNldChzLCBqc29uRGF0YS5DYXN0aW5nUmFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5za2lsbF9kYXRhID0gc2tpbGxEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRIcFByb2dyZXNzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5ocF9wcm9ncmVzcykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhwX3Byb2dyZXNzID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9ocF9tYW5hZ2VyLmNyZWF0ZUVuZW15SHAoY2MudjIodGhpcy5ub2RlLnggKyB0aGlzLmhwX3Bvcy54ICogdGhpcy5zZXR1cF9zY2FsZSwgdGhpcy5ub2RlLnkgKyB0aGlzLmhwX3Bvcy55ICogdGhpcy5zZXR1cF9zY2FsZSkpLmdldENvbXBvbmVudChIcFByb2dyZXNzQmFyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkU2hhZG93KCkge1xyXG4gICAgICAgIC8vaWYodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlIT1TdHJlbmd0aFR5cGUuQm9zcylcclxuICAgICAgICBpZiAoIXRoaXMuc2hhZG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93ID0gR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVNoYWRvdyh0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5zaGFkb3dfcG9zKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LndpZHRoID0gdGhpcy5ub2RlLnNjYWxlWCAqIHRoaXMuc2hhZG93X3NpemUud2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LmhlaWdodCA9IHRoaXMubm9kZS5zY2FsZVkgKiB0aGlzLnNoYWRvd19zaXplLmhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5zZXRQb3NpdGlvbih0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKS5hZGQodGhpcy5zaGFkb3dfcG9zKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93SHAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5ocF9wcm9ncmVzcy5jaGFuZ2VQcm9ncmVzcyh0aGlzLmN1cl9ocCAvIHRoaXMubWF4X2hwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXNDYW5Db3VudChpc0NhbkNvdW50OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fY291bnQgPSBpc0NhbkNvdW50O1xyXG4gICAgICAgIC8vIGlmKHRoaXMuaXNfY2FuX2NvdW50PT1mYWxzZSl7XHJcbiAgICAgICAgLy8gICAgIGNjLmxvZygnc2V0SXNDYW5Db3VudD09ZmFsc2UnKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2V0dXBTY2FsZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNoZVNob3VBdHRhY2tTY2FsZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzY2FsZSA9IDAuMztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6IHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gMC41NTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuRWxpdGU6IHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gMC43NTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTdHJlbmd0aFR5cGUuQm9zczoge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAxLjI7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRXYWxsQXR0YWNrU2NhbGUoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgc2NhbGUgPSAxO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLk5vcm1hbDoge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAwLjY7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOiB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IDAuOTtcclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFh1YW55dW5TY2FsZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBzY2FsZSA9IDAuMztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYmFzZV9kYXRhLlN0cmVuZ3RoVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Ob3JtYWw6IHtcclxuICAgICAgICAgICAgICAgIHNjYWxlID0gMC41NSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU3RyZW5ndGhUeXBlLkVsaXRlOiB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IDAuNzUgLyB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFN0cmVuZ3RoVHlwZS5Cb3NzOiB7XHJcbiAgICAgICAgICAgICAgICBzY2FsZSA9IDEuNSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHJlbmd0aFR5cGUoKTogU3RyZW5ndGhUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vbnN0ZXJEYXRhKCk6IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuoeeul+S8pOWus+aVsOaNriAqL1xyXG4gICAgZ2V0SW5qdXJlZERhdGEoZ2pEYXRhOiBHb25nSmlEYXRhKTogSW5qdXJlZERhdGEge1xyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IEluanVyZWREYXRhKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0SXNEaWUoKSkge1xyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGUgPSBGZWVkQmFja1R5cGUuRGllO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGdtID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgbWlzc1JhdGUgPSAwO1xyXG4gICAgICAgIGxldCBjcml0UmF0ZSA9IDA7XHJcbiAgICAgICAgLy/lpoLmnpzmmK/mma7pgJrmlLvlh7vvvIzorqHnrpfpl6rpgb/lkozmmrTlh7vvvIzpu5jorqTkuLowXHJcbiAgICAgICAgbGV0IGhlcm9EYXRhID0gZ2pEYXRhLmhlcm9fZGF0YTtcclxuICAgICAgICAvL+aAqueJqeeahOmYsuW+oeWKm1xyXG4gICAgICAgIGxldCBzZWxmRGVmZW5zZSA9IHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UgKyB0aGlzLmV4X2RlZmVuc2VfdmFsdWU7XHJcbiAgICAgICAgbGV0IGZpbmFsRGVmZW5zZSA9IEluanVyZWREYXRhLmNhbGNGaW5hbERlZmVuc2Uoc2VsZkRlZmVuc2UsIGhlcm9EYXRhLmlnbm9yZV9kZWZlbnNlX3JhdGUpXHJcbiAgICAgICAgaWYgKGdqRGF0YS5kYW1hZ2VfdHlwZSA9PSBEYW1hZ2VUeXBlLk5vcm1hbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0hhdmVCdWZmKEJ1ZmZJZC5Cb3NzMl9NaWFuWWlfQXR0YWNrKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlID0gRmVlZEJhY2tUeXBlLk1haW5ZaTtcclxuICAgICAgICAgICAgICAgIGRhdGEudGV4dF90eXBlID0gRW5lbXlfSW5qdXJlZF9UeXBlLld1RGk7XHJcbiAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgNjApLCBFbmVteV9Jbmp1cmVkX1R5cGUuV3VEaSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtaXNzUmF0ZSA9IEluanVyZWREYXRhLmNhbGNNaXNzUmF0ZSh0aGlzLm1vbnN0ZXJfZGF0YS5NaXNzLCBnakRhdGEuaGVyb19kYXRhLkhpdCkgKyB0aGlzLmV4X21pc3NfcmF0ZSAtIGdqRGF0YS5oZXJvX2RhdGEuaGl0X2V4O1xyXG4gICAgICAgICAgICBjcml0UmF0ZSA9IEluanVyZWREYXRhLmNhbGNDcml0UmF0ZShnakRhdGEuaGVyb19kYXRhLkNyaXRpY2FsLCB0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpQ3JpdGljYWwpO1xyXG4gICAgICAgICAgICBjcml0UmF0ZSArPSBnakRhdGEuaGVyb19kYXRhLmNyaXRfZXg7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5LiA5Liq5qaC546H57G75Z6LXHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gSW5qdXJlZERhdGEuY2FsY09uY2VUeXBlKFttaXNzUmF0ZSwgY3JpdFJhdGUsIDFdKTtcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mXqumBv1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZSA9IEZlZWRCYWNrVHlwZS5TaGFuQmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGUgPSBFbmVteV9Jbmp1cmVkX1R5cGUuU2hhbkJpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyA2MCksIEVuZW15X0luanVyZWRfVHlwZS5TaGFuQmksIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pq05Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlID0gRmVlZEJhY2tUeXBlLkJhb0ppO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYW1hZ2UgPSBJbmp1cmVkRGF0YS5jYWxjTm9ybWFsQ3JpdERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssIGZpbmFsRGVmZW5zZSwgaGVyb0RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZSArIGhlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsIHRoaXMuamlhbnNoYW5nX3JhdGUsIEluanVyZWREYXRhLmNhbGNGaW5hbEV4dHJhQ3JpdChoZXJvRGF0YS5FeHRyYUNyaXRpY2FsLCB0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpRXh0cmFDcml0aWNhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGUgPSBFbmVteV9Jbmp1cmVkX1R5cGUuQmFvSmk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdqRGF0YS5wZXRfaWQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChnakRhdGEuaGVyb190eXBlKS5vbkRhbWFnZU1vbnN0ZXIoRGFtYWdlVHlwZS5Ob3JtYWwsIHRydWUsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ20uaXNfc2hvd190ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyA2MCksIGRhdGEudGV4dF90eXBlLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mma7pgJrlkb3kuK1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGUgPSBGZWVkQmFja1R5cGUuTnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGFtYWdlID0gSW5qdXJlZERhdGEuY2FsY05vcm1hbERhbWFnZU51bShoZXJvRGF0YS50b3RhbF9hdHRhY2ssIGZpbmFsRGVmZW5zZSwgaGVyb0RhdGEuYXR0YWNrX2luY3JlYXNlX2RhbWFnZSArIGhlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UsIHRoaXMuamlhbnNoYW5nX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGUgPSBFbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjaztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2pEYXRhLnBldF9pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWxsX2hlcm8uZ2V0KGdqRGF0YS5oZXJvX3R5cGUpLm9uRGFtYWdlTW9uc3RlcihEYW1hZ2VUeXBlLk5vcm1hbCwgZmFsc2UsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZ2pEYXRhLmRhbWFnZV90eXBlID09IERhbWFnZVR5cGUuU2tpbGwpIHtcclxuICAgICAgICAgICAgLy/kuI3pnIDopoHorqHnrpfpl6rpgb/vvIzmioDog73lv4XkuK1cclxuICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlID0gRmVlZEJhY2tUeXBlLk51bGw7XHJcbiAgICAgICAgICAgIGxldCBkYW1hZ2UgPSAwO1xyXG4gICAgICAgICAgICBpZiAoZ2pEYXRhLmlzX2Nhbl9jcml0KSB7XHJcbiAgICAgICAgICAgICAgICBjcml0UmF0ZSA9IEluanVyZWREYXRhLmNhbGNDcml0UmF0ZShnakRhdGEuaGVyb19kYXRhLkNyaXRpY2FsLCB0aGlzLm1vbnN0ZXJfZGF0YS5BbnRpQ3JpdGljYWwpO1xyXG4gICAgICAgICAgICAgICAgY3JpdFJhdGUgKz0gZ2pEYXRhLmhlcm9fZGF0YS5jcml0X2V4O1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5bkuIDkuKrmpoLnjofnsbvlnotcclxuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gSW5qdXJlZERhdGEuY2FsY09uY2VUeXBlKFswLCBjcml0UmF0ZSwgMV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZSA9IEZlZWRCYWNrVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRleHRfdHlwZSA9IEVuZW15X0luanVyZWRfVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2UgPSBJbmp1cmVkRGF0YS5jYWxjU2tpbGxDcml0RGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjaywgZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlLCBmaW5hbERlZmVuc2UsIGhlcm9EYXRhLnNraWxsX2luY3JlYXNlX2RhbWFnZSArIGhlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UgKyBoZXJvRGF0YS5hdHRhY2tfaW5jcmVhc2VfZGFtYWdlLCB0aGlzLmppYW5zaGFuZ19yYXRlLCBJbmp1cmVkRGF0YS5jYWxjRmluYWxFeHRyYUNyaXQoaGVyb0RhdGEuRXh0cmFDcml0aWNhbCwgdGhpcy5tb25zdGVyX2RhdGEuQW50aUV4dHJhQ3JpdGljYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdtLmlzX3Nob3dfdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgNjApLCBkYXRhLnRleHRfdHlwZSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkYW1hZ2UgPSBJbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0oaGVyb0RhdGEudG90YWxfYXR0YWNrLCBnakRhdGEuc2tpbGxfZGFtYWdlX3JhdGUsIGZpbmFsRGVmZW5zZSwgaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlICsgaGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSArIGhlcm9EYXRhLmF0dGFja19pbmNyZWFzZV9kYW1hZ2UsIHRoaXMuamlhbnNoYW5nX3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlID0gSW5qdXJlZERhdGEuY2FsY1NraWxsRGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjaywgZ2pEYXRhLnNraWxsX2RhbWFnZV9yYXRlLCBmaW5hbERlZmVuc2UsIGhlcm9EYXRhLnNraWxsX2luY3JlYXNlX2RhbWFnZSArIGhlcm9EYXRhLmFsbF9pbmNyZWFzZV9kYW1hZ2UgKyBoZXJvRGF0YS5hdHRhY2tfaW5jcmVhc2VfZGFtYWdlLCB0aGlzLmppYW5zaGFuZ19yYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICBpZiAoZ2pEYXRhLnBldF9pZCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFsbF9oZXJvLmdldChnakRhdGEuaGVyb190eXBlKS5vbkRhbWFnZU1vbnN0ZXIoRGFtYWdlVHlwZS5Ta2lsbCwgZmFsc2UsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeerOmXtOS8pOWus1xyXG4gICAgICogQHBhcmFtIGdqRGF0YSDmlLvlh7vnsbvlnotcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBiZUZsYXNoSW5qdXJlZChnakRhdGE6IEdvbmdKaURhdGEpOiBJbmp1cmVkRGF0YSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldEluanVyZWREYXRhKGdqRGF0YSk7XHJcbiAgICAgICAgdGhpcy5iZURhbWFnZShkYXRhLCBnakRhdGEpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmVDb250aW51b3VzSW5qdXJlZChnakRhdGE6IEdvbmdKaURhdGEsIGZsb29yTnVtOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgaWYgKGdqRGF0YS5jb250aW51b3VzX2RhbWFnZV9yYXRlID4gMCkge1xyXG4gICAgICAgICAgICAvL+aAqueJqeeahOmYsuW+oeWKm1xyXG4gICAgICAgICAgICBsZXQgc2VsZkRlZmVuc2UgPSB0aGlzLm1vbnN0ZXJfZGF0YS5EZWZlbnNlICsgdGhpcy5leF9kZWZlbnNlX3ZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxEZWZlbnNlID0gSW5qdXJlZERhdGEuY2FsY0ZpbmFsRGVmZW5zZShzZWxmRGVmZW5zZSwgZ2pEYXRhLmhlcm9fZGF0YS5pZ25vcmVfZGVmZW5zZV9yYXRlKVxyXG4gICAgICAgICAgICBsZXQgaGVyb0RhdGEgPSBnakRhdGEuaGVyb19kYXRhO1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBJbmp1cmVkRGF0YSgpO1xyXG4gICAgICAgICAgICBsZXQgZGFtYWdlID0gSW5qdXJlZERhdGEuY2FsY1NraWxsRGFtYWdlTnVtKGhlcm9EYXRhLnRvdGFsX2F0dGFjaywgZ2pEYXRhLmNvbnRpbnVvdXNfZGFtYWdlX3JhdGUsIGZpbmFsRGVmZW5zZSwgaGVyb0RhdGEuc2tpbGxfaW5jcmVhc2VfZGFtYWdlICsgaGVyb0RhdGEuYWxsX2luY3JlYXNlX2RhbWFnZSwgdGhpcy5qaWFuc2hhbmdfcmF0ZSk7XHJcbiAgICAgICAgICAgIGRhdGEudGV4dF90eXBlID0gRW5lbXlfSW5qdXJlZF9UeXBlLlpob25nRHU7XHJcbiAgICAgICAgICAgIGlmIChnakRhdGEuaGVyb190eXBlID09IEhlcm9fVHlwZS5Odld1KSB7XHJcbiAgICAgICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKiBmbG9vck51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmJlRGFtYWdlKGRhdGEsIGdqRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoq6YCg5oiQ55yf5a6e5Lyk5a6z77yM55u05o6l6YCg5oiQ5a+55bqU55qE5Lyk5a6z5YC8LOaXoOazlemXqumBvyAqL1xyXG4gICAgYmVSZWFsRGFtYWdlKGdqRGF0YTogR29uZ0ppRGF0YSwgZGFtYWdlOiBudW1iZXIpOiBJbmp1cmVkRGF0YSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBuZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgIHRoaXMuYmVEYW1hZ2UoZGF0YSwgZ2pEYXRhKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIC8qKuaBouWkjeeUn+WRveWAvOaYr+WQpuaIkOWKnyAqL1xyXG4gICAgYmVIZWFsKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q3VySHAoKSA+PSB0aGlzLmdldE1heEhwKCkgfHwgdGhpcy5nZXRJc0RpZSgpID09IHRydWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKirnm67liY3msqHmnInmsrvnlpfmlYjmnpzliqDmiJDvvIzlj6rmnInph43kvKTvvIzlj6rorqHnrpfph43kvKQgKi9cclxuICAgICAgICBsZXQgbmV3TnVtID0gbnVtICogKDEgLSB0aGlzLmdldE1heFNlcmlvdXNseSgpKVxyXG4gICAgICAgIHRoaXMuY2hhbmdlSHAobmV3TnVtKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcCh0aGlzLmdldENlbnRlclBvcygpLCBuZXdOdW0sIEVuZW15X0luanVyZWRfVHlwZS5aaGlMaWFvKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJlRGFtYWdlKGRhdGE6IEluanVyZWREYXRhLCBnakRhdGE6IEdvbmdKaURhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSA9PSBTdHJlbmd0aFR5cGUuQm9zcyAmJiB0aGlzLmlzSGF2ZUJ1ZmYoQnVmZklkLkJvc3M5X1NraWxsXzNfd2lkdSkpIHtcclxuICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlID0gRmVlZEJhY2tUeXBlLk1haW5ZaTtcclxuICAgICAgICAgICAgZGF0YS50ZXh0X3R5cGUgPSBFbmVteV9Jbmp1cmVkX1R5cGUuV3VEaTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlVHlwZVRleHQoY2MudjIodGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgNjApLCBFbmVteV9Jbmp1cmVkX1R5cGUuV3VEaSwgbnVsbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuZ2V0RGFtYWdlTnVtKCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBnbSA9IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIGRhdGEuaXNfZGllID0gdGhpcy5jaGFuZ2VIcCgtZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgIGlmIChnbS5pc19zaG93X3RleHQgJiYgZGF0YS5nZXREYW1hZ2VOdW0oKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcChjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyBNYXRoLnJhbmRvbSgpICogMTAwKSwgZGF0YS5nZXREYW1hZ2VOdW0oKSwgZGF0YS50ZXh0X3R5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZGF0YS5pc19kaWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRIdXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/lkLjooYDmlYjmnpxcclxuICAgICAgICAgICAgaWYgKGdqRGF0YS5oZXJvX2RhdGEuYmxvb2Rfc3Vja2luZ19yYXRlID4gMCAmJiBkYXRhLmdldERhbWFnZU51bSgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhwID0gSW5qdXJlZERhdGEuY2FsY0Jsb29kU3Vja2luZyhkYXRhLmdldERhbWFnZU51bSgpLCBnakRhdGEuaGVyb19kYXRhLmJsb29kX3N1Y2tpbmdfcmF0ZSwgZ2pEYXRhLmhlcm9fZGF0YS5zZXJpb3VzX2luanVyeV9yYXRlKTtcclxuICAgICAgICAgICAgICAgIGlmIChocCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBXYWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1haW5XYWxsKCkuY2hhbmdlSHAoaHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKuiusOW9leacgOmrmOS8pOWusyAqL1xyXG4gICAgICAgICAgICBnbS5zZXRNYXhEYW1hZ2UoZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgIGdtLnNldE1pbkRhbWFnZShkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgaWYgKGdqRGF0YS5za2lsbF9yZWxlYXNlX2lkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVjb3JkRGFtYWdlKGdqRGF0YS5za2lsbF9yZWxlYXNlX2lkLCBkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZV9pbmp1cnlfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZV9pbmp1cnlfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKirorrDlvZVEUFMgKi9cclxuICAgICAgICAgICAgc3dpdGNoIChnakRhdGEuZGFtYWdlX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRGFtYWdlVHlwZS5Ob3JtYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5oZXJvX2F0dGFja19kcHNbZ2pEYXRhLmhlcm9fdHlwZV0gKz0gZGF0YS5nZXREYW1hZ2VOdW0oKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERhbWFnZVR5cGUuU2tpbGw6IHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5oZXJvX3NraWxsX2Rwc1tnakRhdGEuaGVyb190eXBlXSArPSBkYXRhLmdldERhbWFnZU51bSgpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAvKirlhrDlpbPpop3lpJbnnJ/lrp7kvKTlrrMgKi9cclxuICAgICAgICAgICAgLy8gaWYoU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QmluZ052U2tpbGwyKCk+MCYmdGhpcy5pc0hhdmVEZUJ1ZmZUeXBlKEJ1ZmZUeXBlLlNsb3dkb3duKSl7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgZGFtYWdlPWRhdGEuZ2V0RGFtYWdlTnVtKCkqU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QmluZ052U2tpbGwyKCk7XHJcbiAgICAgICAgICAgIC8vICAgICBpZihkYW1hZ2U8MSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZGFtYWdlPTE7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLmNoYW5nZUhwKC1kYW1hZ2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgZ20uaGVyb19za2lsbF9kcHNbSGVyb19UeXBlLkJpbmdOdl0rPWRhbWFnZTtcclxuICAgICAgICAgICAgLy8gICAgIGlmKGdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LHRoaXMubm9kZS55KzMyKSxkYW1hZ2UsRW5lbXlfSW5qdXJlZF9UeXBlLkJpbmdOdlpoZW5TaGFuZyk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gLyoq6Zi/5Yqq5q+U5pav6aKd5aSW55yf5a6e5Lyk5a6zICovXHJcbiAgICAgICAgICAgIC8vIGlmKFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFOdUJpU2lTa2lsbDIoKT4wKXtcclxuICAgICAgICAgICAgLy8gICAgIGlmKHRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5TbG93ZG93bil8fHRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5WZXJ0aWdvKSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGRhbWFnZT1kYXRhLmdldERhbWFnZU51bSgpKlNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFOdUJpU2lTa2lsbDIoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihkYW1hZ2U8MSl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGRhbWFnZT0xO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmNoYW5nZUhwKC1kYW1hZ2UpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGdtLmhlcm9fc2tpbGxfZHBzW0hlcm9fVHlwZS5BTnVCaVNpXSs9ZGFtYWdlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGdtLmlzX3Nob3dfdGV4dCl7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGdtLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcChjYy52Mih0aGlzLm5vZGUueCx0aGlzLm5vZGUueSszMiksZGFtYWdlLEVuZW15X0luanVyZWRfVHlwZS5BTnVCaVNpWmhlblNoYW5nKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgR3JvdW5kTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5hX251X2JpX3NpX2JlaWRvbmdfc2tpbGxfMix0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLyoq5b636bKB5LyK6aKd5aSW55yf5a6e5Lyk5a6zICovXHJcbiAgICAgICAgICAgIGlmIChTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZUx1WWlFeCgpICYmIHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX0RlTHVZaV9FeCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYW1hZ2UgPSBkYXRhLmdldERhbWFnZU51bSgpICogU2tpbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVMdVlpRXgoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYW1hZ2UgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFtYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAoLWRhbWFnZSk7XHJcbiAgICAgICAgICAgICAgICBnbS5oZXJvX3NraWxsX2Rwc1tIZXJvX1R5cGUuRGVMdVlpXSArPSBkYW1hZ2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uaXNfc2hvd190ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKGNjLnYyKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSArIDMyKSwgZGFtYWdlLCBFbmVteV9Jbmp1cmVkX1R5cGUuTm9ybWFsX0F0dGFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05pS5aHDvvIzov5Tlm57mmK/lkKbmrbvkuqEgKi9cclxuICAgIHByb3RlY3RlZCBjaGFuZ2VIcChudW06IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmdldElzRGllKCkgfHwgdGhpcy5nZXRFbmVteVN0YXRlKCkgPT0gRW5lbXlfU3RhdGUuYm9ybiB8fCBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlICE9IEdhbWVTdGF0ZS5HYW1lX1BsYXlpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNEaWUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmN1cl9ocCArPSBudW07XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3VyX2dhbWVfbW9kZSA9PSBHYW1lTW9kZS5Cb3NzX0NoYWxsZW5nZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYXNlX2RhdGEuU3RyZW5ndGhUeXBlID09IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJfaHAgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX2hwID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYW5nZV9ocF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlX2hwX2NhbGxiYWNrKG51bSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlTGV2ZWwgPSBCb3NzQ2hhbGxlbmdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFNjb3JlKE1hdGguYWJzKE1hdGgucm91bmQobnVtKSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZUxldmVsICE9IHRoaXMubW9uc3Rlcl9sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaERhdGEodXNlTGV2ZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl9ocCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREZWF0aCgpO1xyXG4gICAgICAgICAgICBpc0RpZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1cl9ocCA+IHRoaXMubWF4X2hwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2hwID0gdGhpcy5tYXhfaHBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYoaXNEaWU9PWZhbHNlJiZHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX21vZGU9PUdhbWVNb2RlLk1hemUpe1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLmN1cl9ocDwodGhpcy5tYXhfaHAqMC4xKSl7XHJcbiAgICAgICAgLy8gICAgICAgICBpZihNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzSGF2ZUFCdWZmKFs4MDAzXSkpeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNoYW5nZUhwKC10aGlzLmN1cl9ocCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQucGV0XzIxX2FjdGl2ZV8zX2xpYW5kYW8sY2MudjIoMCwyMDApLHRoaXMubm9kZSwoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQucGV0XzIxX2FjdGl2ZV8yX2xpYW5kYW9fZHJvcF9oaXQsdGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmICh0aGlzLmNoYW5nZV9ocF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZV9ocF9jYWxsYmFjayhudW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHJldHVybiBpc0RpZTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRCdWZmKGJ1ZmZEYXRhOiBCdWZmRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9uc3Rlcl9idWZmLmhhcyhidWZmRGF0YS5idWZmX2lkKSA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkID09IEdhbWVFZmZlY3RJZC5OdWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHRoaXMuanVqaV9wb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQsIHRoaXMuanVqaV9wb3MsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlID0gdGhpcy5nZXRTaGVTaG91QXR0YWNrU2NhbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6IEJ1ZmZUaW1lciA9IG5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmICghYnVmZikge1xyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5vZGUuYWRkQ29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi5pbml0KGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgLy9idWZm5rK755aX6Kem5Y+R5pe25aSE55CGXHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkUmVjb3ZlcnlMaXN0ZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvUmVjb3Zlcnk6IChudW06IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlSGVhbChudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2J1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsIGJ1ZmYpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25CdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgc3dpdGNoIChidWZmRGF0YS5idWZmX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuTW92ZVNwZWVkVXA6IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5BdHRTcGVlZFVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZChidWZmRGF0YS5idWZmX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChidWZmRGF0YS5idWZmX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzOV9Ta2lsbF8xX2d1b3phaToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemVuZ3NoYW5nX3JhdGUgKz0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vbnN0ZXJfZGF0YS5EZWZlbnNlIC09IHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlICogKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMV0pO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkF0dGFjayArPSB0aGlzLmJhc2VfYXR0cmlidXRlX2RhdGEuQXR0YWNrICogKGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+WmguaenOaciWJ1ZmbvvIzliJnliLfmlrDml7bpl7Qs6YeN5paw6K6h5pe2XHJcbiAgICAgICAgICAgIGxldCBidWZmID0gdGhpcy5tb25zdGVyX2J1ZmYuZ2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdWJCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmYgPSB0aGlzLm1vbnN0ZXJfYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZiAoYnVmZikge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmRGVzdG9yeShidWZmRGF0YTogQnVmZkRhdGEpIHtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoIChidWZmRGF0YS5idWZmX3R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5Nb3ZlU3BlZWRVcDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLkF0dFNwZWVkVXA6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoLWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zczlfU2tpbGxfMV9ndW96YWk6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuemVuZ3NoYW5nX3JhdGUgLT0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uc3Rlcl9kYXRhLkRlZmVuc2UgKz0gdGhpcy5iYXNlX2F0dHJpYnV0ZV9kYXRhLkRlZmVuc2UgKiAoYnVmZkRhdGEuYnVmZl92YWx1ZVsxXSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RhdGEuQXR0YWNrIC09IHRoaXMuYmFzZV9hdHRyaWJ1dGVfZGF0YS5BdHRhY2sgKiAoYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2J1ZmYuaGFzKGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVmZihidWZmSWQ6IEJ1ZmZJZCk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9idWZmLmdldChidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmZUeXBlKGJ1ZmZUeXBlOiBCdWZmVHlwZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpc0hhdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5mb3JFYWNoKChidWZmOiBCdWZmVGltZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzSGF2ZSA9PSBmYWxzZSAmJiBidWZmLmdldEJ1ZmZUeXBlKCkgPT0gYnVmZlR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlzSGF2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBpc0hhdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQnVmZigpIHtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfYnVmZi5mb3JFYWNoKChidWZmOiBCdWZmVGltZXIpID0+IHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYWRkRGVCdWZmKGJ1ZmZEYXRhOiBCdWZmRGF0YSwgZ2pEYXRhOiBHb25nSmlEYXRhKTogQnVmZlRpbWVyIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRJc0RpZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSGF2ZURlQnVmZihidWZmRGF0YS5idWZmX2lkKSkge1xyXG4gICAgICAgICAgICAvL+aOp+WItuexu+eahGRlYnVmZumcgOimgeagueaNrumfp+aAp+adpeWunueOsOWFt+S9k+eahOaViOaenFxyXG4gICAgICAgICAgICBsZXQgYnVmZlR5cGUgPSBidWZmRGF0YS5idWZmX3R5cGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZlR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuVmVydGlnbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl90b3VnaG5lc3MgPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlci5jcmVhdGVUeXBlVGV4dChjYy52Mih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyA2MCksIEVuZW15X0luanVyZWRfVHlwZS5NaWFuWWlLb25nWmhpLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNIYXZlQnVmZihCdWZmSWQuQm9zczNfTWlhbllpX0tvbmdaaGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEJ1ZmYoQnVmZklkLkJvc3MzX01pYW5ZaV9Lb25nWmhpKS5hZGRGbG9vcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2pEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gSW5qdXJlZERhdGEuY2FsY0NvbnRyb2xUaW1lKGJ1ZmZEYXRhLnJlbWFpbl90aW1lLCB0aGlzLmN1cl90b3VnaG5lc3MsIGdqRGF0YS5oZXJvX2RhdGEuaW5zaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1h1YW5ZdW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0X2ppc2h1ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnh1YW55dW5fY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUucGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mtheaDkeWvuUJPU1Pml6DmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFN0cmVuZ3RoVHlwZSgpICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRfamlzaHUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6LWw5ZCR6Iux6ZuEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1laW1vID0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvKEhlcm9fVHlwZS5NZWlNbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1tUG9zID0gbWVpbW8ubm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRQb3MgPSBtbVBvcy5zdWIodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4yKG9mZnNldFBvcy55LCBvZmZzZXRQb3MueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb3ZlRGlyKHJhZGlhbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLm1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZm6IqC54K55ZKM54m55pWIICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChidWZmRGF0YS5nYW1lX2VmZmVjdF9pZCA9PSBHYW1lRWZmZWN0SWQuTnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLmp1amlfcG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBHYW1lRWZmZWN0c01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0Rm9yUGFyZW50KGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLCB0aGlzLmp1amlfcG9zLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IHRoaXMuZ2V0U2hlU2hvdUF0dGFja1NjYWxlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOiBCdWZmVGltZXIgPSBub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlYnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vYnVmZuS8pOWus+inpuWPkeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBpZiAoYnVmZkRhdGEuZGFtYWdlX2ppYW5nZV90aW1lID4gMCAmJiBnakRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRGFtYWdlTGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb0RhbWFnZTogKGdqRGF0YTogR29uZ0ppRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlQ29udGludW91c0luanVyZWQoZ2pEYXRhLCBidWZmLmdldEZsb29yTnVtKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGdqRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCwgYnVmZik7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYnVmZlR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuVmVydGlnbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSB0aGlzLmdldFh1YW55dW5TY2FsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZlR5cGUuU2xvd2Rvd246IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WkhOeQhuS4gOS4i+WHj+mAn2J1ZmZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQodGhpcy5oaWRkZW5fYXR0cmlidXRlLnNsb3dfcmVzaXN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5CdXJzdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSE55CGYnVmZueIhuWPkVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmRGF0YS5idWZmX2lkID09IEJ1ZmZJZC5IZXJvX0xlaVNoZW5fQ2hhb0Z1SGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdqRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmYuYWRkQnVyc3RMaXN0ZW4oYnVmZkRhdGEuYnVmZl92YWx1ZVswXSwgdGhpcy5vbkJ1ZmZCdXJzdC5iaW5kKHRoaXMpLCBnakRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X1NraWxsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gMSAvIHRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbihub2RlKS50bygwLjEsIHsgc2NhbGU6IHNjYWxlICogMS4xLCBvcGFjaXR5OiAyNTUgfSkudG8oMC4xLCB7IHNjYWxlOiBub2RlLnNjYWxlLCBvcGFjaXR5OiAxMjggfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW86IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuQm9zc19Nb2RlX0ppYW5TaGFuZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuamlhbnNoYW5nX3JhdGUgKz0gYnVmZkRhdGEuYnVmZl92YWx1ZVswXTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX052V3VfRXhTa2lsbF9KaWFuR29uZ1N1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VBdHRhY2tTcGVlZCgtYnVmZkRhdGEuYnVmZl92YWx1ZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBidWZmID0gdGhpcy5tb25zdGVyX2RlYnVmZi5nZXQoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfaWQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fQ2hhbmdNYW9TaG93X1NraWxsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm1vbnN0ZXJfZGVidWZmLmdldChidWZmRGF0YS5idWZmX2lkKS5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IDEgLyB0aGlzLnNldHVwX3NjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4obm9kZSkudG8oMC4xLCB7IHNjYWxlOiBzY2FsZSAqIDEuMSwgb3BhY2l0eTogMjU1IH0pLnRvKDAuMSwgeyBzY2FsZTogbm9kZS5zY2FsZSwgb3BhY2l0eTogMTI4IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+mZpOS4gOS4qmRlYnVmZlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgZGVidWZm57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaXNOZWVkUmVjeWNsZSDmmK/lkKbpnIDopoHosIPnlKjlm57mlLZcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBzdWJEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZiA9IHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYgKGJ1ZmYpIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZURlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfZGVidWZmLmhhcyhidWZmSWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlRGVCdWZmVHlwZShidWZmVHlwZTogQnVmZlR5cGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaXNIYXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKChidWZmOiBCdWZmVGltZXIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGlzSGF2ZSA9PSBmYWxzZSAmJiBidWZmLmdldEJ1ZmZUeXBlKCkgPT0gYnVmZlR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlzSGF2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBpc0hhdmU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsRGVCdWZmKCkge1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRlQnVmZih2LmdldEJ1ZmZJZCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVidWZmRGVzdG9yeShidWZmRGF0YTogQnVmZkRhdGEpIHtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfZGVidWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2ggKGJ1ZmZEYXRhLmJ1ZmZfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZUeXBlLlZlcnRpZ286IHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWHVhbll1bjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54dWFueXVuX2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnh1YW55dW5fY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/prYXmg5Hlr7lCT1NT5peg5pWILOW+gOS4i+i1sFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRTdHJlbmd0aFR5cGUoKSAhPSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb3ZlRGlyKE1hdGguUEkgKiAzIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCdWZmVHlwZS5TbG93ZG93bjoge1xyXG4gICAgICAgICAgICAgICAgLy/lpITnkIbkuIDkuIvlh4/pgJ9idWZmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNb3ZlU3BlZWQodGhpcy5oaWRkZW5fYXR0cmlidXRlLnNsb3dfcmVzaXN0YW5jZSk7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoYnVmZkRhdGEuYnVmZl9pZCkge1xyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5Cb3NzX01vZGVfSmlhblNoYW5nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmppYW5zaGFuZ19yYXRlIC09IGJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF07XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fTnZXdV9FeFNraWxsX0ppYW5Hb25nU3U6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlQXR0YWNrU3BlZWQoK2J1ZmZEYXRhLmJ1ZmZfdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZCdXJzdChidWZmRGF0YTogQnVmZkRhdGEsIGdqRGF0YTogR29uZ0ppRGF0YSkge1xyXG4gICAgICAgIGlmIChidWZmRGF0YS5idWZmX2lkID09IEJ1ZmZJZC5IZXJvX0xlaVNoZW5fQ2hhb0Z1SGUpIHtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xlaUdvZFNraWxsMSk7XHJcbiAgICAgICAgICAgIC8qKuW9k+aVjOS6uui6q+S4iueahOi2hei0n+iNt+i+vuWIsDXlsYLml7bvvIzkvJrlj5fliLDokL3pm7fmlLvlh7vpgKDmiJB75Y+C5pWwMX3kvKTlrrPlubblh7vmmZV75Y+C5pWwMn3np5IgKi9cclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmJlRmxhc2hJbmp1cmVkKGdqRGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmlzX2RpZSA9PSBmYWxzZSAmJiBkYXRhLmdldERhbWFnZU51bSgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9Hcm91bmRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX2dyb3VuZCx0aGlzLnNoYWRvdy5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLmxlaV9zaGVuX3NraWxsX3NreSwgdGhpcy5zaGFkb3cuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNjYWxlWCA9IDAuODtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2NhbGVZID0gMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFN0cmVuZ3RoVHlwZSgpICE9IFN0cmVuZ3RoVHlwZS5Cb3NzICYmIGRhdGEuaXNfZGllID09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZmZEYXRhID0gbmV3IEJ1ZmZEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuYnVmZl9pZCA9IEJ1ZmZJZC5IZXJvX1h1YW5ZdW47XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQgPSBHYW1lRWZmZWN0SWQueHVhbnl1bjtcclxuICAgICAgICAgICAgICAgICAgICBidWZmRGF0YS5idWZmX3R5cGUgPSBCdWZmVHlwZS5WZXJ0aWdvO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZEYXRhLnJlbWFpbl90aW1lID0gZ2pEYXRhLmhlcm9fZGF0YS5nZXRTa2lsbFZhbHVlMihTa2lsbFR5cGUuUGFzc2l2ZV8yKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERlQnVmZihidWZmRGF0YSwgZ2pEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuWIt+aWsOenu+mAnyxzbG93UmVzaXN0YW5jZTrlh4/pgJ/mipfmgKcgKi9cclxuICAgIHByaXZhdGUgcmVmcmVzaE1vdmVTcGVlZChzbG93UmVzaXN0YW5jZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy/lrp7pmYXlh4/pgJ9cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNIYXZlRGVCdWZmKEJ1ZmZJZC5IZXJvX01laU1vX0FjdGl2ZV9NZWlIdW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQgPSAzMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBJbmp1cmVkRGF0YS5jYWxjU2xvd0Rvd25OdW0odGhpcy5iYXNlX2RhdGEuU3BlZWQgKyB0aGlzLmV4X21vdmVfc3BlZWRfdmFsdWUsIHRoaXMuZ2V0TWF4U2xvd0Rvd25WYWx1ZSgpLCBzbG93UmVzaXN0YW5jZSwgdGhpcy5nZXRNYXhTcGVlZFVwVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRDb2xvcih0aGlzLmN1cl9tb3ZlX3NwZWVkIDwgdGhpcy5iYXNlX2RhdGEuU3BlZWQgPyBDb2xvclR5cGUuU2xvd0Rvd24gOiBDb2xvclR5cGUuTnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdldFN0cmVuZ3RoVHlwZSgpICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKVxyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZSA9IHRoaXMuY3VyX21vdmVfc3BlZWQgLyAodGhpcy5iYXNlX2RhdGEuU3BlZWQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyAvKirliLfmlrDlh4/pgJ9idWZm55qE5aSE55CGICovXHJcbiAgICAvLyBwcml2YXRlIHJlZnJlc2hTbG93ZG93bigpe1xyXG4gICAgLy8gICAgIC8v5om+5Ye65omA5pyJ5YeP6YCf57G75Z6L55qEYnVmZlxyXG4gICAgLy8gICAgIGxldCBzbG93QnVmZj1uZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgLy8gICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgLy8gICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNsb3dkb3duKXtcclxuICAgIC8vICAgICAgICAgICAgIHNsb3dCdWZmLnB1c2godik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICBpZihzbG93QnVmZi5sZW5ndGg+MCl7XHJcbiAgICAvLyAgICAgICAgIHNsb3dCdWZmLnNvcnQoKGEsYik9PntcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCktYS5nZXRGaXJzdEJ1ZmZWYWx1ZSgpO1xyXG4gICAgLy8gICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgbGV0IG1heEJ1ZmY9c2xvd0J1ZmZbMF07XHJcbiAgICAvLyAgICAgICAgIC8v5a6e6ZmF5YeP6YCfXHJcbiAgICAvLyAgICAgICAgIGxldCB2YWx1ZT1Jbmp1cmVkRGF0YS5jYWxjU2xvd0Rvd25OdW0odGhpcy5iYXNlX2RhdGEuU3BlZWQsbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UsdGhpcy5nZXRNYXhTcGVlZFVwVmFsdWUoKSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VyX21vdmVfc3BlZWQ9dmFsdWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2V0Q29sb3IoQ29sb3JUeXBlLlNsb3dEb3duKTtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJfbW92ZV9zcGVlZD10aGlzLmJhc2VfZGF0YS5TcGVlZDtcclxuICAgIC8vICAgICAgICAgdGhpcy5zZXRDb2xvcihDb2xvclR5cGUuTnVsbCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIC8qKuWIt+aWsOWKoOmAn2J1ZmbnmoTlpITnkIYgKi9cclxuICAgIC8vIHByaXZhdGUgcmVmcmVzaFNwZWVkVXAoKXtcclxuICAgIC8vICAgICAvL+aJvuWHuuaJgOacieWKoOmAn+exu+Wei+eahGJ1ZmZcclxuICAgIC8vICAgICBsZXQgc3BlZWRCdWZmPW5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAvLyAgICAgdGhpcy5tb25zdGVyX2J1ZmYuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgLy8gICAgICAgICBpZih2LmdldEJ1ZmZUeXBlKCk9PUJ1ZmZUeXBlLlNwZWVkVXApe1xyXG4gICAgLy8gICAgICAgICAgICAgc3BlZWRCdWZmLnB1c2godik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICBpZihzcGVlZEJ1ZmYubGVuZ3RoPjApe1xyXG4gICAgLy8gICAgICAgICBzcGVlZEJ1ZmYuc29ydCgoYSxiKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKS1hLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICBsZXQgbWF4QnVmZj1zcGVlZEJ1ZmZbMF07XHJcbiAgICAvLyAgICAgICAgIC8v5a6e6ZmF5Yqg6YCf6YCfXHJcbiAgICAvLyAgICAgICAgIGxldCBvZmZzZXRWYWx1ZT10aGlzLmJhc2VfZGF0YS5TcGVlZCptYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAvLyAgICAgICAgIC8vbGV0IHZhbHVlPUluanVyZWREYXRhLmNhbGNTbG93RG93bk51bSgsbWF4QnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpLHRoaXMuaGlkZGVuX2F0dHJpYnV0ZS5zbG93X3Jlc2lzdGFuY2UpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuY3VyX21vdmVfc3BlZWQrb2Zmc2V0VmFsdWU7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIC8qKuWKoOWHj+mAn+mcgOimgeWkhOeQhu+8jOWIpOaWreWHj+mAnyAqL1xyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cl9tb3ZlX3NwZWVkPXRoaXMuYmFzZV9kYXRhLlNwZWVkO1xyXG4gICAgLy8gICAgIH0gICAgICAgIFxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKuiOt+W+l+acgOWkp+WAvOeahOWHj+mAn+avlOeOhyAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNYXhTbG93RG93blZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgLy/mib7lh7rmiYDmnInliqDpgJ/nsbvlnovnmoRidWZmXHJcbiAgICAgICAgbGV0IGJ1ZmYgPSBuZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9kZWJ1ZmYuZm9yRWFjaCgodiwgaykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodi5nZXRCdWZmVHlwZSgpID09IEJ1ZmZUeXBlLlNsb3dkb3duKSB7XHJcbiAgICAgICAgICAgICAgICBidWZmLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoYnVmZi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGJ1ZmYuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIuZ2V0Rmlyc3RCdWZmVmFsdWUoKSAtIGEuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBtYXhCdWZmID0gYnVmZlswXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5pyA5aSn5YC855qE5Yqg6YCf5q+U546HICovXHJcbiAgICBwcml2YXRlIGdldE1heFNwZWVkVXBWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIC8v5om+5Ye65omA5pyJ5Yqg6YCf57G75Z6L55qEYnVmZlxyXG4gICAgICAgIGxldCBzcGVlZEJ1ZmYgPSBuZXcgQXJyYXk8QnVmZlRpbWVyPigpO1xyXG4gICAgICAgIHRoaXMubW9uc3Rlcl9idWZmLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgaWYgKHYuZ2V0QnVmZlR5cGUoKSA9PSBCdWZmVHlwZS5Nb3ZlU3BlZWRVcCkge1xyXG4gICAgICAgICAgICAgICAgc3BlZWRCdWZmLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc3BlZWRCdWZmLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgc3BlZWRCdWZmLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCkgLSBhLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWF4QnVmZiA9IHNwZWVkQnVmZlswXTtcclxuICAgICAgICAgICAgcmV0dXJuIG1heEJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u5pS76YCf77yM5q+P56eS5pS75Ye75qyh5pWwICovXHJcbiAgICBwcml2YXRlIHNldEF0dGFja1NwZWVkKG51bVNlYzogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bVNlYyA+IDEwKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtU2VjIDwgMC4xKSB7XHJcbiAgICAgICAgICAgIG51bVNlYyA9IDAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdHRfamlhbmdlID0gMSAvIG51bVNlYztcclxuICAgIH1cclxuICAgIC8qKuaUueWPmOW9k+WJjeaUu+mAnyxyYXRlOuavlOeOhyAqL1xyXG4gICAgcHJvdGVjdGVkIGNoYW5nZUF0dGFja1NwZWVkKHJhdGU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBnanNkID0gdGhpcy5nZXRBdHRhY2tTcGVlZCgpO1xyXG4gICAgICAgIGdqc2QgKz0gKHJhdGUpICogKHRoaXMuYmFzZV9kYXRhLkF0dGFja1NwZWVkKTtcclxuICAgICAgICB0aGlzLnNldEF0dGFja1NwZWVkKGdqc2QpO1xyXG4gICAgfVxyXG4gICAgLyoq6I635b6X5b2T5YmN5pS76YCfICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0QXR0YWNrU3BlZWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMSAvIHRoaXMuYXR0X2ppYW5nZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorqHnrpfph43kvKTvvIzlj5bmnIDlpKcgKi9cclxuICAgIHByb3RlY3RlZCBnZXRNYXhTZXJpb3VzbHkoKTogbnVtYmVyIHtcclxuICAgICAgICAvL+aJvuWHuuaJgOaciemHjeS8pOexu+Wei+eahGJ1ZmZcclxuICAgICAgICBsZXQgc2VyaW91c2x5QnVmZiA9IG5ldyBBcnJheTxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgdGhpcy5tb25zdGVyX2RlYnVmZi5mb3JFYWNoKCh2LCBrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh2LmdldEJ1ZmZUeXBlKCkgPT0gQnVmZlR5cGUuU2VyaW91c2x5SW5qdXJlZCkge1xyXG4gICAgICAgICAgICAgICAgc2VyaW91c2x5QnVmZi5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHNlcmlvdXNseUJ1ZmYubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBzZXJpb3VzbHlCdWZmLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiLmdldEZpcnN0QnVmZlZhbHVlKCkgLSBhLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgbWF4QnVmZiA9IHNlcmlvdXNseUJ1ZmZbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhCdWZmLmdldEZpcnN0QnVmZlZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuWFieeOry3lvIDlp4sqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuICAgIGFkZEhhbG8oaGFsb0RhdGE6IEhhbG9EYXRhKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1vbnN0ZXJfaGFsby5oYXMoaGFsb0RhdGEuaGFsb19pZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5tb25zdGVyX2hhbG8uc2V0KGhhbG9EYXRhLmhhbG9faWQsIGhhbG9EYXRhKTtcclxuICAgICAgICAgICAgc3dpdGNoIChoYWxvRGF0YS5oYWxvX2lkKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEhhbG9JZC5Nb25zdGVyMzBfQmlhbkZ1X1NraWxsX0hhbG86IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZSArPSBoYWxvRGF0YS5oYWxvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgfSBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXI2OV9OaXVTYU1hbl9Ta2lsbF9IYWxvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlICs9IGhhbG9EYXRhLmhhbG9fdmFsdWVbMF07XHJcbiAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3Rlcjc2X0ppYW5EdVpoZV9Ta2lsbF9IYWxvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9tb3ZlX3NwZWVkX3ZhbHVlICs9IHRoaXMuYmFzZV9kYXRhLlNwZWVkICogKGhhbG9EYXRhLmhhbG9fdmFsdWVbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaE1vdmVTcGVlZCgwKTtcclxuICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGFsbyhoYWxvSWQ6IEhhbG9JZCk6IEhhbG9EYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX2hhbG8uZ2V0KGhhbG9JZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlSGFsbyhoYWxvSWQ6IEhhbG9JZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnN0ZXJfaGFsby5oYXMoaGFsb0lkKTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJIYWxvKGhhbG9JZDogSGFsb0lkLCB1dWlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaGFsb0RhdGEgPSB0aGlzLm1vbnN0ZXJfaGFsby5nZXQoaGFsb0lkKTtcclxuICAgICAgICBpZiAoaGFsb0RhdGEpIHtcclxuICAgICAgICAgICAgLy/lj6rmnInlkIzmupDmiY3lj6/ku6Xnp7vpmaRcclxuICAgICAgICAgICAgaWYgKGhhbG9EYXRhLmhhbG9fc291cmNlX3V1aWQgPT0gdXVpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25zdGVyX2hhbG8uZGVsZXRlKGhhbG9JZCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGhhbG9JZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXIzMF9CaWFuRnVfU2tpbGxfSGFsbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZSAtPSBoYWxvRGF0YS5oYWxvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leF9taXNzX3JhdGUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4X21pc3NfcmF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSGFsb0lkLk1vbnN0ZXI2OV9OaXVTYU1hbl9Ta2lsbF9IYWxvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfZGVmZW5zZV92YWx1ZSAtPSBoYWxvRGF0YS5oYWxvX3ZhbHVlWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leF9kZWZlbnNlX3ZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leF9kZWZlbnNlX3ZhbHVlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBIYWxvSWQuTW9uc3Rlcjc2X0ppYW5EdVpoZV9Ta2lsbF9IYWxvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZSAtPSB0aGlzLmJhc2VfZGF0YS5TcGVlZCAqIChoYWxvRGF0YS5oYWxvX3ZhbHVlWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhfbW92ZV9zcGVlZF92YWx1ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW92ZVNwZWVkKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsSGFsbygpIHtcclxuICAgICAgICB0aGlzLm1vbnN0ZXJfaGFsby5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuWFieeOry3nu5PmnZ8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbiAgICBnZXRIaWRkZW5BdHRyaWJ1dGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZGVuX2F0dHJpYnV0ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJc0RpZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX3N0YXRlID09IEVuZW15X1N0YXRlLmRpZSB8fCB0aGlzLm1vbnN0ZXJfc3RhdGUgPT0gRW5lbXlfU3RhdGUuc2hpcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFbmVteVN0YXRlKCk6IEVuZW15X1N0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tb25zdGVyX3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEVuZW15UHJldlN0YXRlKCk6IEVuZW15X1N0YXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2X3N0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElzQ2FuQ2hlY2soKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlzQ2FuID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5nZXRJc0RpZSgpIHx8IHRoaXMubm9kZS55ID49IEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5lbXlfY3JlYXRlX3kgfHwgdGhpcy5nZXRFbmVteVN0YXRlKCkgPT0gRW5lbXlfU3RhdGUuYm9ybikge1xyXG4gICAgICAgICAgICBpc0NhbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNDYW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG91Z2huZXNzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX3RvdWdobmVzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhIcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJIcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJBdHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfYXR0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldENvbG9yKGNvbG9yVHlwZTogQ29sb3JUeXBlKSB7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNIYXZlRGVCdWZmVHlwZShCdWZmVHlwZS5TbG93ZG93bikpIHtcclxuICAgICAgICAgICAgY29sb3IgPSBjYy5jb2xvcig4MiwgMjU1LCAyNTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKGNvbG9yVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIENvbG9yVHlwZS5Jbmp1cmVkOiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IGNjLkNvbG9yLlJFRDtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJDb2xvciA9IHRoaXMuY3VyX2NvbG9yO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1ckNvbG9yICE9IENvbG9yVHlwZS5Jbmp1cmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5qdXJlZF9hY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmp1cmVkX2FjdGlvbi5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5qdXJlZF9hY3Rpb24gPSBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuMSwgeyBjb2xvcjogdGhpcy5ub2RlLmNvbG9yIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldENvbG9yKGN1ckNvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29sb3JUeXBlLlNsb3dEb3duOiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IGNjLmNvbG9yKDgyLCAyNTUsIDI1Mik7XHJcbiAgICAgICAgICAgIH0gYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX2NvbG9yID0gY29sb3JUeXBlO1xyXG4gICAgICAgIHRoaXMubm9kZS5jb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1ckNvbG9yKCk6IENvbG9yVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNsb3dEb3duQ29sb3IoKTogY2MuQ29sb3Ige1xyXG4gICAgICAgIHJldHVybiBjYy5jb2xvcig4MiwgMjU1LCAyNTIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dERhdGEoZGFtYWdlVHlwZTogRGFtYWdlVHlwZSwgaXNCdWxsZXQ6IGJvb2xlYW4sIHNraWxsUmF0ZTogbnVtYmVyID0gMCk6IE1vbnN0ZXJBdHREYXRhIHtcclxuICAgICAgICBsZXQgbWQgPSBuZXcgTW9uc3RlckF0dERhdGEoKTtcclxuICAgICAgICBtZC5kYW1hZ2VfdHlwZSA9IGRhbWFnZVR5cGU7XHJcbiAgICAgICAgbWQuaXNfYnVsbGV0ID0gaXNCdWxsZXQ7XHJcbiAgICAgICAgbWQuc2tpbGxfcmF0ZSA9IHNraWxsUmF0ZTtcclxuICAgICAgICBtZC5tb25zdGVyX2F0dHJpYnV0ZSA9IHRoaXMubW9uc3Rlcl9kYXRhO1xyXG4gICAgICAgIG1kLnplbmdzaGFuZ19yYXRlID0gdGhpcy56ZW5nc2hhbmdfcmF0ZTtcclxuICAgICAgICBtZC5tb25zdGVyX3RzID0gdGhpcztcclxuICAgICAgICBtZC5zdHJlbmd0aF90eXBlID0gdGhpcy5nZXRTdHJlbmd0aFR5cGUoKTtcclxuICAgICAgICByZXR1cm4gbWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXNGdWxsSHAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2hwID49IHRoaXMubWF4X2hwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEVuZW15U3RhdGUodHlwZTogRW5lbXlfU3RhdGUpIHtcclxuICAgICAgICBpZiAodHlwZSAhPSB0aGlzLm1vbnN0ZXJfc3RhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2X3N0YXRlID0gdGhpcy5tb25zdGVyX3N0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJfc3RhdGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PSBFbmVteV9TdGF0ZS5hdHQgfHwgdHlwZSA9PSBFbmVteV9TdGF0ZS5za2lsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZSA9ICgxIC8gdGhpcy5iYXNlX2RhdGEuQXR0YWNrU3BlZWQpIC8gdGhpcy5hdHRfamlhbmdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PSBFbmVteV9TdGF0ZS5tb3ZlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFN0cmVuZ3RoVHlwZSgpICE9IFN0cmVuZ3RoVHlwZS5Cb3NzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5lLnRpbWVTY2FsZSA9IHRoaXMuY3VyX21vdmVfc3BlZWQgLyAodGhpcy5iYXNlX2RhdGEuU3BlZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGVhdGgoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLmRpZSk7XHJcbiAgICAgICAgdGhpcy5jb2xsaWRlci5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxEZUJ1ZmYoKTtcclxuICAgICAgICB0aGlzLnNwaW5lLnBhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuaXNfY2FuX2NvdW50ID0gdGhpcy5pc19jb3VudDtcclxuICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLndpbGxEZXN0cm95TW9uc3Rlcih0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5kZWF0aF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmRlYXRoX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0SHVydCgpIHtcclxuICAgICAgICB0aGlzLnNldENvbG9yKENvbG9yVHlwZS5Jbmp1cmVkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhbWFnZSDkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBkYW1hZ2VUeXBlIOS8pOWus+exu+Wei1xyXG4gICAgICovXHJcbiAgICBpbmp1cmVXYWxsKGRhdGE6IE1vbnN0ZXJBdHREYXRhKTogSW5qdXJlZERhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dF93YWxsLmJlSW5qdXJlZChkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuS4gOS4qumqqOmqvOWKqOeUu1xyXG4gICAgICogQHBhcmFtIG5hbWUg6aqo6aq85Yqo55S75ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaXNMb29wIOaYr+WQpuW+queOr1xyXG4gICAgICogQHBhcmFtIGRhdGEg5piv5ZCm55uR5ZCs5YWz6ZSu5bin77yM5YWz6ZSu5bin5pWw5o2u5YyF5ZCr5YWz6ZSu5bin5ZCN56ew77yM55uR5ZCs5Yiw5YWz6ZSu5bin5ZCO55qE5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gZW5kQ2FsbGJhY2sg5pKt5pS+57uT5p2f5ZCO55qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHBsYXlTcGluQW5pbWF0b24obmFtZTogc3RyaW5nLCBpc0xvb3A6IGJvb2xlYW4gPSBmYWxzZSwgZGF0YT86IEtleUZyYW1lRGF0YSwgZW5kQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLmdldEVuZW15U3RhdGUoKSA9PSBFbmVteV9TdGF0ZS5kaWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFuaW1hID0gdGhpcy5zcGluZS5zZXRBbmltYXRpb24oMCwgbmFtZSwgaXNMb29wKTtcclxuICAgICAgICAvLyBpZihkYXRhKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5zcGluZS5zZXRUcmFja0V2ZW50TGlzdGVuZXIoYW5pbWEsKGVudHJ5OiBzcC5zcGluZS5UcmFja0VudHJ5LCBldmVudCkgPT57XHJcbiAgICAgICAgLy8gICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PWRhdGEubmFtZSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZihlbmRDYWxsYmFjayl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3BpbmUuc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyKGFuaW1hLChlbnRyeTogc3Auc3BpbmUuVHJhY2tFbnRyeSwgZXZlbnQpID0+e1xyXG4gICAgICAgIC8vICAgICAgICAgYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICAvLyAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoZW5kQ2FsbGJhY2spIHtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKHRyYWNrRW50cnksIGxvb3BDb3VudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVUZW1wID0gdHJhY2tFbnRyeS5hbmltYXRpb24gPyB0cmFja0VudHJ5LmFuaW1hdGlvbi5uYW1lIDogJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZVRlbXAgPT09IG5hbWUgJiYgZW5kQ2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVuZENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIobnVsbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5RGVhZEFuaW1hdG9uKG5hbWU6IHN0cmluZywgZW5kQ2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIGxldCBhbmltYSA9IHRoaXMuc3BpbmUuc2V0QW5pbWF0aW9uKDAsIG5hbWUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNwaW5lLnNldENvbXBsZXRlTGlzdGVuZXIoKHRyYWNrRW50cnksIGxvb3BDb3VudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmFtZVRlbXAgPSB0cmFja0VudHJ5LmFuaW1hdGlvbiA/IHRyYWNrRW50cnkuYW5pbWF0aW9uLm5hbWUgOiAnJztcclxuICAgICAgICAgICAgaWYgKG5hbWVUZW1wID09PSBuYW1lICYmIGVuZENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBlbmRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbmUuc2V0Q29tcGxldGVMaXN0ZW5lcihudWxsKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKuiuvue9rljlnZDmoIfvvIzov5Tlm57lgY/lt6bov5jmmK/lgY/lj7PkuoYsLTE65YGP5bem77yMMO+8muato+W4uO+8jDHvvJrlgY/lj7MgKi9cclxuICAgIHNldFgoZGlzWDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbGVmdFJpZ2h0ID0gMDtcclxuICAgICAgICBpZiAoZGlzWCA+IDMwMCkge1xyXG4gICAgICAgICAgICBkaXNYID0gMzAwO1xyXG4gICAgICAgICAgICBsZWZ0UmlnaHQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzWCA8IC0zMDApIHtcclxuICAgICAgICAgICAgZGlzWCA9IC0zMDA7XHJcbiAgICAgICAgICAgIGxlZnRSaWdodCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUueCA9IGRpc1g7XHJcbiAgICAgICAgcmV0dXJuIGxlZnRSaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRZKGRpc1k6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubm9kZS55ID0gZGlzWTtcclxuICAgICAgICAvL+S4jeiDveepv+i/h+WfjuWimVxyXG4gICAgICAgIGxldCB3YWxscyA9IFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QWxsV2FsbCgpO1xyXG4gICAgICAgIHdhbGxzLmZvckVhY2goKHdhbGw6IFdhbGwsIHdhbGxUeXBlOiBXYWxsVHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAvL+ajgOafpeWfjuWimVxyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IHdhbGwuZ2V0V2FsbFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKHJlY3QuY29udGFpbnModGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLnkgPiB3YWxsLm5vZGUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ID0gcmVjdC55TWF4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS55IDwgd2FsbC5ub2RlLnkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSA9IHJlY3QueU1pbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBtYWluV2FsbCA9IFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKTtcclxuICAgICAgICBsZXQgbWFpblJlY3QgPSBtYWluV2FsbC5nZXRXYWxsUmVjdCgpO1xyXG5cclxuICAgICAgICBpZiAobWFpblJlY3QuY29udGFpbnModGhpcy5ub2RlLmdldFBvc2l0aW9uKCkpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueSA+IG1haW5XYWxsLm5vZGUueSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSBtYWluUmVjdC55TWF4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueSA8IG1haW5XYWxsLm5vZGUueSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSBtYWluUmVjdC55TWluO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub25Db2xsaXNpb25TaGlwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueSA8IG1haW5SZWN0LnlNaW4pIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGUueSA8PSBtYWluUmVjdC55TWluIC0gMjAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55ID0gbWFpblJlY3QueU1pbiAtIDIwMDtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW9uc3Rlcl9zdGF0ZSAhPSBFbmVteV9TdGF0ZS5zaGlwKSB7XHJcbiAgICAgICAgICAgICAgICBNb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNoaXBfbW9uc3Rlcl9udW0rKztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFbmVteVN0YXRlKEVuZW15X1N0YXRlLnNoaXApO1xyXG4gICAgICAgICAgICAgICAgTW9uc3Rlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKS51cFNoaXBNb25zdGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGllQnlmdWh1bygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldEVuZW15U3RhdGUoRW5lbXlfU3RhdGUubW92ZSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcCgtOTk5OTk5OTk5OSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ29sbGlzaW9uU2hpcCgpIHtcclxuICAgICAgICBsZXQgbWQgPSBuZXcgTW9uc3RlckF0dERhdGEoKTtcclxuICAgICAgICBtZC5kYW1hZ2VfdHlwZSA9IERhbWFnZVR5cGUuU2hpcDtcclxuICAgICAgICBtZC5pc19idWxsZXQgPSBmYWxzZTtcclxuICAgICAgICBtZC5za2lsbF9yYXRlID0gMDtcclxuICAgICAgICBtZC5tb25zdGVyX2F0dHJpYnV0ZSA9IHRoaXMubW9uc3Rlcl9kYXRhO1xyXG4gICAgICAgIG1kLnplbmdzaGFuZ19yYXRlID0gdGhpcy56ZW5nc2hhbmdfcmF0ZTtcclxuICAgICAgICBtZC5tb25zdGVyX3RzID0gdGhpcztcclxuICAgICAgICBtZC5zdHJlbmd0aF90eXBlID0gdGhpcy5nZXRTdHJlbmd0aFR5cGUoKVxyXG4gICAgICAgIFdhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5iZUluanVyZWQobWQsIGZhbHNlLCB0aGlzLmdldEN1ckhwKCkgKiAwLjIpXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VIcCgtOTk5OTk5OTk5OSk7XHJcbiAgICB9XHJcbiAgICBzZXRQb3MocG9zOiBjYy5WZWMyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRYKHBvcy54KTtcclxuICAgICAgICB0aGlzLnNldFkocG9zLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vdmVEaXIoZGlyOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uID0gZGlyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFFpYW5ZaW5NaW4obnVtOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5taW5fcWlhbnlpbiA9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLm1pbl9xaWFueWluID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFFpYW5ZaW5NaW4oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taW5fcWlhbnlpbjtcclxuICAgIH1cclxuICAgIC8qKuiuvue9rue/u+i9rCAqL1xyXG4gICAgc2V0RmxpcChpc1JpZ2h0OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IGlzUmlnaHQgPyB0aGlzLnNldHVwX3NjYWxlIDogLXRoaXMuc2V0dXBfc2NhbGU7XHJcbiAgICB9XHJcbiAgICAvL+makOiXj+mYtOW9sVxyXG4gICAgaGlkU2hhZG93KCkge1xyXG4gICAgICAgIHRoaXMuc2hhZG93Lm9wYWNpdHkgPSAwO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaHBfcHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5ocF9wcm9ncmVzcy5zZXRQb3ModGhpcy5ub2RlLnggKyB0aGlzLmhwX3Bvcy54ICogdGhpcy5ub2RlLnNjYWxlWCwgdGhpcy5ub2RlLnkgKyB0aGlzLmhwX3Bvcy55ICogdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNoYWRvdykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYWRvdy5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm5vZGUueCArIHRoaXMubm9kZS5zY2FsZVggKiB0aGlzLnNoYWRvd19wb3MueCwgdGhpcy5ub2RlLnkgKyB0aGlzLm5vZGUuc2NhbGVZICogdGhpcy5zaGFkb3dfcG9zLnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnpJbmRleCA9IChNYXRoLnJvdW5kKDgwMDAgLSB0aGlzLm5vZGUueSAqIDEwKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0RW5lbXlTdGF0ZSgpICE9IEVuZW15X1N0YXRlLmJvcm4gJiYgdGhpcy5nZXRTdHJlbmd0aFR5cGUoKSAhPSBTdHJlbmd0aFR5cGUuQm9zcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPj0gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbmVteV9jcmVhdGVfeSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmVEaXIoTWF0aC5QSSAqIDMgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9URVNUXHJcbiAgICAgICAgLy8gaWYodGhpcy5nZXRFbmVteVN0YXRlKCk9PUVuZW15X1N0YXRlLm1vdmUpe1xyXG4gICAgICAgIC8vICAgICBsZXQgYWxsTW9uc3Rlcj1Nb25zdGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLm5vZGUuY2hpbGRyZW47XHJcbiAgICAgICAgLy8gICAgIGxldCBsZW49YWxsTW9uc3Rlci5sZW5ndGg7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCBtb25zdGVyPWFsbE1vbnN0ZXJbaV0uZ2V0Q29tcG9uZW50KE1vbnN0ZXIpO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYobW9uc3RlciYmbW9uc3Rlci51dWlkIT10aGlzLnV1aWQpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8v5Yik5pat6Led56a7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG90aGVyUG9zPW1vbnN0ZXIuZ2V0Q2VudGVyUG9zKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IHNlbGZQb3M9dGhpcy5nZXRDZW50ZXJQb3MoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgZGlzdGFuY2U9KG90aGVyUG9zLnN1YihzZWxmUG9zKS5tYWcoKSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoZGlzdGFuY2U8PTUwKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy/kuqTpm4bkuoZcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy/kuIrpnaLnmoTotbDliIfnur/vvIzkuIvpnaLnmoTlnoLnm7TotbDkuItcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoc2VsZlBvcy55Pm90aGVyUG9zLnkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0Rpcj10aGlzLm1vdmVfZGlyZWN0aW9uK01hdGguUEkvMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmKCBuZXdEaXIgPD1NYXRoLlBJICYmIG5ld0Rpcj49MCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGlyPXRoaXMubW92ZV9kaXJlY3Rpb24tTWF0aC5QSS8yXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPW5ld0RpcjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2UgaWYoc2VsZlBvcy55PG90aGVyUG9zLnkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlX2RpcmVjdGlvbj1NYXRoLlBJKjMvMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVfZGlyZWN0aW9uPU1hdGguUEkqMy8yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgIHRoaXMubW92ZV9kaXJlY3Rpb249TWF0aC5QSSozLzI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5re75Yqg5Zue6LCD55uR5ZCsLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICBhZGRJbml0TGlzdGVuKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuaW5pdF9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgYWRkQ2hhbmdlSHBMaXN0ZW4oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VfaHBfY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZFh1YW5ZdW5MaXN0ZW4oY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy54dWFueXVuX2NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBhZGREZWF0aENhbGxiYWNrKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuZGVhdGhfY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIGFkZEluanVyeUNhbGxiYWNrKGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlX2luanVyeV9jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6I635b6X5q+P56eN5oCq54mp5LiN5ZCM55qE5pWw5o2uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbiAgICBwcml2YXRlIGxvYWRJbml0UG9zKCkge1xyXG4gICAgICAgIC8v6I635Y+W5a6M5pWw5o2u5bCx5Yig6Zmk5LqGXHJcbiAgICAgICAgbGV0IGp1amkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2p1amknKTtcclxuICAgICAgICB0aGlzLmp1amlfcG9zID0ganVqaS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBnb25namkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dvbmdqaScpO1xyXG4gICAgICAgIHRoaXMuYXR0X3BvcyA9IGdvbmdqaS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBocCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaHAnKTtcclxuICAgICAgICB0aGlzLmhwX3BvcyA9IGhwLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHNoYWRvd05vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ01vbnN0ZXJfU2hhZG93Jyk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3dfcG9zID0gc2hhZG93Tm9kZS5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2hhZG93X3NpemUgPSBzaGFkb3dOb2RlLmdldENvbnRlbnRTaXplKCk7XHJcbiAgICAgICAgbGV0IGNlbnRlciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY2VudGVyJyk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJfcG9zID0gY2VudGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgLy9jYy5sb2codGhpcy5zaGFkb3dfc2l6ZSk7XHJcblxyXG4gICAgICAgIGp1amkucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGdvbmdqaS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgaHAucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIHNoYWRvd05vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGNlbnRlci5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hhZG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5ub2RlLnNjYWxlWCAqIHRoaXMuc2hhZG93X3Bvcy54LCB0aGlzLm5vZGUueSArIHRoaXMubm9kZS5zY2FsZVkgKiB0aGlzLnNoYWRvd19wb3MueSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBdHRQb3MoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKDAsIDEyOCk7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm1vbnN0ZXJfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDIwOiBwb3MgPSBjYy52MigwLCAxMjgpOyBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogcG9zID0gdGhpcy5hdHRfcG9zOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpc1BvcyA9IHRoaXMubm9kZS5nZXRQb3NpdGlvbigpLmFkZChjYy52Mihwb3MueCAqIHRoaXMubm9kZS5zY2FsZVgsIHBvcy55ICogdGhpcy5ub2RlLnNjYWxlWSkpO1xyXG4gICAgICAgIHJldHVybiBkaXNQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SnVKaVBvcygpOiBjYy5WZWMyIHtcclxuICAgICAgICByZXR1cm4gY2MudjIodGhpcy5ub2RlLnggKyB0aGlzLmp1amlfcG9zLnggKiB0aGlzLm5vZGUuc2NhbGVYLCB0aGlzLm5vZGUueSArIHRoaXMuanVqaV9wb3MueSAqIHRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNoZVNob3VQb3MoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5qdWppX3Bvcy54ICogdGhpcy5ub2RlLnNjYWxlWCwgdGhpcy5ub2RlLnkgKyB0aGlzLmp1amlfcG9zLnkgKiB0aGlzLm5vZGUuc2NhbGVZKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDZW50ZXJQb3MoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5jZW50ZXJfcG9zLnggKiB0aGlzLm5vZGUuc2NhbGVYLCB0aGlzLm5vZGUueSArIHRoaXMuY2VudGVyX3Bvcy55ICogdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635b6X5pS75Ye75Z+O5aKZ55qEWOWdkOagh++8jOWKqOS9nOS4jeS4gOagt+WvvOiHtOaUu+WHu+eahFjlnZDmoIfkuI3kuIDoh7QgKi9cclxuICAgIGdldEF0dGFja1dhbGxYKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dF9wb3M7XHJcbiAgICB9XHJcbn1cclxuIl19