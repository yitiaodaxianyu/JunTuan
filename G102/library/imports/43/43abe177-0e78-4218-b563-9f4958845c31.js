"use strict";
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