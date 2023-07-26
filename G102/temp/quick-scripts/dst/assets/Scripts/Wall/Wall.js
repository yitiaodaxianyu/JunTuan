
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wall/Wall.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b211cIM19xJaadlf7dTCpdo', 'Wall');
// Scripts/Wall/Wall.ts

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
var Constants_1 = require("../Constants");
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var BuffStateManager_1 = require("../Game/BuffStateManager");
var GameEffectsManager_1 = require("../Game/GameEffectsManager");
var SkyManager_1 = require("../Game/SkyManager");
var GameManager_1 = require("../GameManager");
var BuffTimer_1 = require("../Hero/Game/BuffTimer");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var MonsterData_1 = require("../Monster/MonsterData");
var MyTool_1 = require("../Tools/MyTool");
var ImmunityShield_1 = require("./ImmunityShield");
var Shield_1 = require("./Shield");
var WallConfig_1 = require("./WallConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**属性数据 */
        _this.attribute_data = null;
        /**城墙类型 */
        _this.wall_type = WallConfig_1.WallType.Main;
        //当前血量
        _this.cur_hp = 1000;
        /**最大血量 */
        _this.max_hp = 1000;
        _this.hp_progress = null;
        _this.shield_progress = null;
        _this.hp_text = null;
        _this.shield_text = null;
        /*BUFF* */
        _this.wall_buff = null;
        /*BUFF* */
        _this.wall_de_buff = null;
        /**buff状态 */
        _this.map_buff_state = null;
        /**护盾 */
        _this.map_shield_value = null;
        /**免疫护盾 */
        _this.map_immunity_shield_value = null;
        /**城墙死亡监听 */
        _this.die_callback = null;
        /**血条发生改变的回调 */
        _this.hp_change_callback = null;
        /**血条显示时的回调 */
        _this.hp_show_callback = null;
        /**血条显示时的回调 */
        _this.damage_callback = null;
        /**城墙的矩形 */
        _this.wall_rect = null;
        /**城墙的最高Y轴坐标 */
        _this.wall_max_yy = 0;
        /**是否死亡了 */
        _this.is_die = false;
        _this.is_tutorail = false;
        return _this;
    }
    /**
     * 初始化城墙数据
     * @param attributeData 属性数据
     * @param wallType 城墙的类型
     */
    Wall.prototype.initWall = function (attributeData, wallType) {
        this.attribute_data = attributeData;
        this.wall_type = wallType;
        this.is_die = false;
        this.cur_hp = this.max_hp = attributeData.Health = Math.round(attributeData.Health);
        if (!this.map_shield_value) {
            this.map_shield_value = new Map();
        }
        if (!this.map_immunity_shield_value) {
            this.map_immunity_shield_value = new Map();
        }
        if (!this.wall_buff) {
            this.wall_buff = new Map();
        }
        if (!this.wall_de_buff) {
            this.wall_de_buff = new Map();
        }
        this.removeAllBuff();
        this.removeAllDeBuff();
        this.removeAllShield();
        this.showHp();
        this.showShildProgress();
    };
    Wall.prototype.refreshWallData = function (attributeData) {
        this.attribute_data = attributeData;
        this.max_hp = attributeData.Health = Math.round(attributeData.Health);
        this.showHp();
    };
    Wall.prototype.refreshWallDataByaddHero = function (attributeData) {
        this.attribute_data = attributeData;
        var der_hp = this.max_hp - this.cur_hp;
        console.log("差值血量");
        this.max_hp = attributeData.Health = Math.round(attributeData.Health);
        this.cur_hp = this.max_hp - der_hp;
        this.showHp();
    };
    Wall.prototype.getAttributeData = function () {
        return this.attribute_data;
    };
    /**设置城墙死亡的监听 */
    Wall.prototype.setWallDieListen = function (callback) {
        this.die_callback = callback;
    };
    /**设置城墙血量发生改变时的监听 */
    Wall.prototype.setHpChangeListen = function (callback) {
        this.hp_change_callback = callback;
    };
    /**设置城墙血量显示时的监听 */
    Wall.prototype.setHpShowListen = function (callback) {
        this.hp_show_callback = callback;
    };
    /**设置城墙受伤时的监听 */
    Wall.prototype.setDamageListen = function (callback) {
        this.damage_callback = callback;
    };
    /**设置城墙的矩形 */
    Wall.prototype.setWallRect = function (rect) {
        this.wall_rect = rect;
        this.wall_max_yy = rect.yMax;
    };
    /**获取城墙的矩形 */
    Wall.prototype.getWallRect = function () {
        return this.wall_rect;
    };
    /**获取城墙的最高点 */
    Wall.prototype.getWallMaxYY = function () {
        return this.wall_max_yy;
    };
    /**获取城墙的类型 */
    Wall.prototype.getWallType = function () {
        return this.wall_type;
    };
    /**
     * 城墙受伤计算
     * @param damage 伤害值
     * @param damageType 伤害类型
     * @param strengthType 怪物类型
     * @param monsterData 怪物数据
     * @param isReal 是否真实伤害
     * @param ship 船撞的时候的伤害
     */
    Wall.prototype.beInjured = function (monsterAttData, isReal, ship) {
        if (isReal === void 0) { isReal = false; }
        if (ship === void 0) { ship = 0; }
        var monsterData = monsterAttData.monster_attribute;
        var data = new MonsterData_1.InjuredData();
        var missRate = 0;
        var critRate = 0;
        var damage = 0;
        //如果是普通攻击，计算闪避和暴击，默认为0
        if (monsterAttData.damage_type == HeroConfig_1.DamageType.Normal) {
            missRate = MonsterData_1.InjuredData.calcMissRate(this.attribute_data.Miss, monsterData.Hit);
            critRate = MonsterData_1.InjuredData.calcCritRate(monsterData.Critical, this.attribute_data.AntiCritical);
            //获取一个概率类型
            var type = MonsterData_1.InjuredData.calcOnceType([missRate, critRate, 1]);
            switch (type) {
                case 0:
                    {
                        //闪避
                        data.feedback_type = MonsterData_1.FeedBackType.ShanBi;
                        data.setDamageNum(0);
                    }
                    break;
                case 1:
                    {
                        //暴击
                        data.feedback_type = MonsterData_1.FeedBackType.BaoJi;
                        if (isReal) {
                            damage = MonsterData_1.InjuredData.calcNormalCritRealDamageNum(monsterData.Attack, MonsterData_1.InjuredData.calcFinalExtraCrit(monsterData.ExtraCritical, this.attribute_data.AntiExtraCritical));
                        }
                        else {
                            damage = MonsterData_1.InjuredData.calcNormalCritDamageNum(monsterData.Attack, this.attribute_data.Defense, monsterAttData.zengshang_rate, this.attribute_data.reduce_injury_rate, MonsterData_1.InjuredData.calcFinalExtraCrit(monsterData.ExtraCritical, this.attribute_data.AntiExtraCritical));
                        }
                        data.setDamageNum(damage);
                        if (this.damage_callback) {
                            this.damage_callback(monsterAttData.monster_ts);
                        }
                    }
                    break;
                case 2:
                    {
                        //普通命中
                        data.feedback_type = MonsterData_1.FeedBackType.Null;
                        if (isReal) {
                            damage = MonsterData_1.InjuredData.calcNormalRealDamageNum(monsterData.Attack);
                        }
                        else {
                            damage = MonsterData_1.InjuredData.calcNormalDamageNum(monsterData.Attack, this.attribute_data.Defense, monsterAttData.zengshang_rate, this.attribute_data.reduce_injury_rate);
                        }
                        data.setDamageNum(damage);
                        if (this.damage_callback) {
                            this.damage_callback(monsterAttData.monster_ts);
                        }
                    }
                    break;
            }
        }
        else if (monsterAttData.damage_type == HeroConfig_1.DamageType.Skill) {
            //不需要计算闪避，技能必中
            data.feedback_type = MonsterData_1.FeedBackType.Null;
            if (isReal) {
                damage = MonsterData_1.InjuredData.calcSkillRealDamageNum(monsterData.Attack, monsterAttData.skill_rate);
            }
            else {
                damage = MonsterData_1.InjuredData.calcSkillDamageNum(monsterData.Attack, monsterAttData.skill_rate, this.attribute_data.Defense, monsterAttData.zengshang_rate, this.attribute_data.reduce_injury_rate);
            }
            data.setDamageNum(damage);
        }
        else if (monsterAttData.damage_type == HeroConfig_1.DamageType.Ship) {
            data.feedback_type = MonsterData_1.FeedBackType.Null;
            data.setDamageNum(ship);
        }
        if (data.getDamageNum() > 0) {
            //cc.log(data.getDamageNum());
            if (!this.checkMmmunityShield(1, monsterAttData.damage_type)) {
                //先减护盾的值
                var value = this.changeShieldValue(-data.getDamageNum(), monsterAttData.damage_type);
                if (value < 0) {
                    this.changeHp(value);
                    if (this.wall_type == WallConfig_1.WallType.Main) {
                        if (monsterAttData.strength_type == MonsterData_1.StrengthType.Boss) {
                            if (monsterAttData.damage_type == HeroConfig_1.DamageType.Skill) {
                                if (monsterAttData.is_big) {
                                    MyTool_1.default.randomSceneShakeBig();
                                }
                                else {
                                    MyTool_1.default.randomSceneShakeSmall();
                                }
                            }
                            else if (monsterAttData.damage_type == HeroConfig_1.DamageType.Normal) {
                                MyTool_1.default.randomSceneShakeSmall();
                            }
                        }
                    }
                }
            }
            else {
                //提示免疫
            }
        }
        return data;
    };
    /**造成真实伤害，直接造成对应的伤害值,无法闪避 */
    Wall.prototype.beRealDamage = function (damageType, strengthType, damage) {
        var data = new MonsterData_1.InjuredData();
        data.setDamageNum(damage);
        if (data.getDamageNum() > 0) {
            if (!this.checkMmmunityShield(1, damageType)) {
                //先减护盾的值
                var value = this.changeShieldValue(-data.getDamageNum(), damageType);
                if (value < 0) {
                    this.changeHp(value);
                    if (strengthType == MonsterData_1.StrengthType.Boss) {
                        if (damageType == HeroConfig_1.DamageType.Skill) {
                            MyTool_1.default.randomSceneShakeBig();
                        }
                        else if (damageType == HeroConfig_1.DamageType.Normal) {
                            MyTool_1.default.randomSceneShakeSmall();
                        }
                    }
                }
            }
            else {
                //提示免疫
            }
        }
        return data;
    };
    /**改变血量值，返回是否死亡 */
    Wall.prototype.changeHp = function (hp) {
        var gm = GameManager_1.default.getInstance();
        if (gm.cur_game_state == Constants_1.GameState.Game_Lose || gm.cur_game_state == Constants_1.GameState.Game_Pause || gm.cur_game_state == Constants_1.GameState.Game_Win || this.is_die) {
            return true;
        }
        if (hp < 0) {
            cc.tween(this.node).to(0.1, { color: cc.Color.RED }).to(0.1, { color: cc.Color.WHITE }).start();
        }
        var newHp = this.cur_hp + hp;
        if (this.hp_change_callback) {
            this.hp_change_callback(hp);
        }
        return this.setHp(newHp);
    };
    /**无尽模式的立即恢复血量 */
    Wall.prototype.changeHpByEndless = function (hp) {
        var newHp = this.cur_hp + hp;
        if (this.hp_change_callback) {
            this.hp_change_callback(hp);
        }
        this.setHp(newHp);
    };
    /**返回是否死亡 */
    Wall.prototype.setHp = function (newHp) {
        if (newHp > this.max_hp) {
            newHp = this.max_hp;
        }
        else if (newHp <= 0) {
            newHp = 0;
            this.is_die = true;
            if (this.die_callback) {
                this.die_callback();
            }
        }
        this.cur_hp = newHp;
        // if(this.is_tutorail){
        //     //教程锁血
        //     this.cur_hp=this.getMaxHp()/2;
        // }
        this.showHp();
        return this.cur_hp <= 0;
    };
    Wall.prototype.showHp = function () {
        if (this.hp_progress) {
            this.hp_progress.changeProgress(this.cur_hp / this.max_hp);
        }
        if (this.hp_text) {
            this.hp_text.string = Math.floor(this.cur_hp) + '/' + this.max_hp;
        }
        if (this.hp_show_callback) {
            this.hp_show_callback();
        }
    };
    Wall.prototype.getMaxHp = function () {
        return this.max_hp;
    };
    Wall.prototype.getCurHp = function () {
        return this.cur_hp;
    };
    Wall.prototype.getCurHpPer = function () {
        return this.cur_hp / this.max_hp;
    };
    /**添加一个盾 */
    Wall.prototype.addShield = function (id, type, remainTime, value, gameEffectId) {
        if (this.map_shield_value.has(id)) {
            this.map_shield_value.get(id).refreshShield(remainTime, value);
        }
        else {
            var shield = new cc.Node().addComponent(Shield_1.default);
            shield.init(id, type, remainTime, value, this.onShieldDestroy.bind(this));
            this.map_shield_value.set(id, shield);
            this.node.addChild(shield.node);
            /**添加护盾特效 */
            if (gameEffectId != GameEffectsManager_1.GameEffectId.Null) {
                var texiao = GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(gameEffectId, cc.v2(0, 0), this.node);
                shield.setGameEffectData(gameEffectId, texiao);
            }
        }
        this.showShildProgress();
    };
    Wall.prototype.onShieldDestroy = function (id) {
        this.map_shield_value.delete(id);
        this.showShildProgress();
    };
    /**更改护盾值，返回伤害溢出的值*/
    Wall.prototype.changeShieldValue = function (num, type) {
        //根据伤害类型遍历出对应的护盾
        var shieldArr = new Array();
        this.map_shield_value.forEach(function (v, k) {
            if (v.getIsCanWithstand(type)) {
                shieldArr.push(v);
            }
        });
        //排序
        if (shieldArr.length >= 2) {
            shieldArr.sort(function (left, right) {
                return left.getRemainTime() - right.getRemainTime();
            });
        }
        var newValue = num;
        for (var i = 0; i < shieldArr.length; i++) {
            newValue = shieldArr[i].changeShieldValue(num);
            if (newValue > 0) {
                break;
            }
        }
        this.showShildProgress();
        return newValue;
    };
    Wall.prototype.showShildProgress = function () {
        var value = this.getShieldValue();
        var progress = value / this.getMaxHp();
        if (progress > 1) {
            progress = 1;
        }
        if (this.shield_progress) {
            this.shield_progress.node.active = value > 0;
            this.shield_progress.progress = progress;
        }
        if (this.shield_text) {
            this.shield_text.node.active = value > 0;
            this.shield_text.string = value.toFixed(0);
        }
    };
    /**匹配护盾 */
    Wall.prototype.getShieldValue = function () {
        var value = 0;
        this.map_shield_value.forEach(function (v, k) {
            value += v.getShieldValue();
        });
        return value;
    };
    Wall.prototype.removeAllShield = function () {
        this.map_shield_value.forEach(function (v, k) {
            v.destroySelf();
        });
    };
    /**添加一个具有免疫效果的盾 */
    Wall.prototype.addImmunityShield = function (id, type, remainTime, value) {
        var _this = this;
        if (this.map_immunity_shield_value.has(id)) {
            this.map_immunity_shield_value.get(id).refreshShield(remainTime, value);
        }
        else {
            var shield = new cc.Node().addComponent(ImmunityShield_1.default);
            shield.init(id, type, remainTime, value, function (id) {
                _this.map_immunity_shield_value.delete(id);
            });
            this.map_immunity_shield_value.set(id, shield);
            this.node.addChild(shield.node);
        }
    };
    /**检查免疫护盾值，返回是否能免疫*/
    Wall.prototype.checkMmmunityShield = function (num, type) {
        //根据伤害类型遍历出对应的护盾
        var shieldArr = new Array();
        this.map_immunity_shield_value.forEach(function (v, k) {
            if (v.getIsCanWithstand(type)) {
                shieldArr.push(v);
            }
        });
        //排序
        if (shieldArr.length >= 2) {
            shieldArr.sort(function (left, right) {
                return left.getRemainTime() - right.getRemainTime();
            });
        }
        var newValue = num;
        for (var i = 0; i < shieldArr.length; i++) {
            newValue = shieldArr[i].changeShieldValue(num);
            if (newValue > 0) {
                return true;
            }
        }
        return false;
    };
    Wall.prototype.addHpBuff = function () {
        var pos = cc.v2(Math.random() * 100 - 50, Math.random() * 50 - 25);
        GameEffectsManager_1.GameEffectsManager.getInstance().createGameEffectForParent(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, pos, this.node);
    };
    /**---------------------------------------------BUFF--------------------------------------------------- */
    Wall.prototype.addBuff = function (buffData) {
        var _this = this;
        var buffId = buffData.buff_id;
        if (!this.isHaveBuff(buffId)) {
            //添加buff节点和特效                   
            var node = new cc.Node(buffData.game_effect_id.toString());
            this.node.addChild(node);
            //添加buff
            var buff = node.getComponent(BuffTimer_1.default);
            if (!buff) {
                buff = node.addComponent(BuffTimer_1.default);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onBuffDestory.bind(this));
            //buff治疗触发时处理
            if (buffData.recovery_jiange_time > 0) {
                buff.addRecoveryListen({
                    doRecovery: function (num) {
                        _this.changeHp(num);
                        var pos = cc.v2(Math.random() * 600 - 300, _this.node.y + Math.random() * 200 - 100);
                        GameManager_1.default.getInstance().hp_text_manager.createHpTextHp(pos, num, EnemyConfig_1.Enemy_Injured_Type.ZhiLiao);
                        SkyManager_1.default.getInstance().createGameEffectById(GameEffectsManager_1.GameEffectId.monster_zhiliao_halo_hit, pos);
                    }
                }, buff.getFirstBuffValue());
            }
            this.wall_buff.set(buffData.buff_id, buff);
            switch (buffId) {
                case HeroConfig_1.BuffId.Hero_ZhenDe_JiaXueJianShang:
                    {
                        this.attribute_data.reduce_injury_rate += buffData.buff_value[1];
                    }
                    break;
            }
            this.addBuffState(buffId, buffData.remain_time);
            return buff;
        }
        else {
            var buff = this.wall_buff.get(buffId);
            buff.refreshBuff(buffData);
            this.addBuffState(buffId, buffData.remain_time);
            return buff;
        }
    };
    Wall.prototype.subBuff = function (buffId) {
        var buff = this.wall_buff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    };
    Wall.prototype.onBuffDestory = function (buffData) {
        this.wall_buff.delete(buffData.buff_id);
        switch (buffData.buff_id) {
            case HeroConfig_1.BuffId.Hero_ZhenDe_JiaXueJianShang:
                {
                    this.attribute_data.reduce_injury_rate -= buffData.buff_value[1];
                }
                break;
        }
    };
    Wall.prototype.isHaveBuff = function (buff) {
        return this.wall_buff.has(buff);
    };
    Wall.prototype.removeAllBuff = function () {
        var _this = this;
        this.wall_buff.forEach(function (buff) {
            _this.subBuff(buff.getBuffId());
        });
    };
    /**添加一个buff状态图标 */
    Wall.prototype.addBuffState = function (buffId, remainTime) {
        var _this = this;
        var types = BuffStateManager_1.default.getInstance().getBuffType(buffId);
        var _loop_1 = function (i) {
            var type = types[i];
            if (this_1.map_buff_state.has(type)) {
                this_1.map_buff_state.get(type).refreshTime(remainTime);
            }
            else {
                var bfState = BuffStateManager_1.default.getInstance().createBuffState(type, HeroConfig_1.Hero_Type.Hero_Num);
                bfState.init(type, remainTime, function () {
                    _this.map_buff_state.delete(type);
                });
                this_1.map_buff_state.set(type, bfState);
                //this.node.addChild(shield.node);
            }
        };
        var this_1 = this;
        for (var i = 0; i < types.length; i++) {
            _loop_1(i);
        }
    };
    Wall.prototype.getBuffType = function (buffId) {
        var type = [];
        switch (buffId) {
        }
        return type;
    };
    Wall.prototype.addDeBuff = function (buffData, monsterAttData) {
        var _this = this;
        var buffId = buffData.buff_id;
        if (!this.isHaveDeBuff(buffId)) {
            //添加buff节点和特效                   
            var node = new cc.Node(buffData.game_effect_id.toString());
            this.node.addChild(node);
            //添加buff
            var buff = node.getComponent(BuffTimer_1.default);
            if (!buff) {
                buff = node.addComponent(BuffTimer_1.default);
            }
            buff.init(buffData);
            //buff销毁时处理
            buff.addDestroyListen(this.onDeBuffDestory.bind(this));
            this.wall_de_buff.set(buffData.buff_id, buff);
            //buff伤害触发时处理
            if (buffData.damage_jiange_time > 0 && monsterAttData) {
                buff.addDamageListen({
                    doDamage: function (monsterAttData) {
                        monsterAttData.is_big = false;
                        _this.beInjured(monsterAttData);
                    }
                }, monsterAttData);
            }
            switch (buffId) {
            }
            return true;
        }
        else {
            this.wall_de_buff.get(buffId).refreshBuff(buffData);
        }
        return false;
    };
    Wall.prototype.subDeBuff = function (buffId) {
        var buff = this.wall_de_buff.get(buffId);
        if (buff) {
            buff.destroySelf();
            return true;
        }
        return false;
    };
    Wall.prototype.onDeBuffDestory = function (buffData) {
        this.wall_de_buff.delete(buffData.buff_id);
        switch (buffData.buff_id) {
        }
    };
    Wall.prototype.isHaveDeBuff = function (buff) {
        return this.wall_de_buff.has(buff);
    };
    Wall.prototype.removeAllDeBuff = function () {
        var _this = this;
        this.wall_de_buff.forEach(function (buff) {
            _this.subDeBuff(buff.getBuffId());
        });
    };
    Wall.prototype.destroyWall = function () {
        if (this.die_callback) {
            this.die_callback();
        }
    };
    Wall = __decorate([
        ccclass
    ], Wall);
    return Wall;
}(cc.Component));
exports.default = Wall;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcV2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBZ0Q7QUFDaEQsb0RBQTBEO0FBQzFELDZEQUF3RDtBQUN4RCxpRUFBOEU7QUFDOUUsaURBQTRDO0FBQzVDLDhDQUF5QztBQUd6QyxvREFBK0M7QUFDL0Msc0RBQWtIO0FBR2xILHNEQUFpRztBQUNqRywwQ0FBcUM7QUFDckMsbURBQThDO0FBQzlDLG1DQUE4QjtBQUM5QiwyQ0FBd0M7QUFHbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUE2bEJDO1FBNWxCRyxVQUFVO1FBQ0Esb0JBQWMsR0FBZSxJQUFJLENBQUM7UUFDNUMsVUFBVTtRQUNBLGVBQVMsR0FBVSxxQkFBUSxDQUFDLElBQUksQ0FBQztRQUMzQyxNQUFNO1FBQ0ksWUFBTSxHQUFRLElBQUksQ0FBQztRQUM3QixVQUFVO1FBQ0EsWUFBTSxHQUFRLElBQUksQ0FBQztRQUNuQixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUMvQixxQkFBZSxHQUFnQixJQUFJLENBQUM7UUFDcEMsYUFBTyxHQUFVLElBQUksQ0FBQztRQUN0QixpQkFBVyxHQUFVLElBQUksQ0FBQztRQUNwQyxVQUFVO1FBQ0EsZUFBUyxHQUF3QixJQUFJLENBQUM7UUFDaEQsVUFBVTtRQUNBLGtCQUFZLEdBQXdCLElBQUksQ0FBQztRQUNuRCxZQUFZO1FBQ0Ysb0JBQWMsR0FBdUIsSUFBSSxDQUFDO1FBQ3BELFFBQVE7UUFDRSxzQkFBZ0IsR0FBb0IsSUFBSSxDQUFDO1FBQ25ELFVBQVU7UUFDQSwrQkFBeUIsR0FBNEIsSUFBSSxDQUFDO1FBRXBFLFlBQVk7UUFDSixrQkFBWSxHQUFVLElBQUksQ0FBQztRQUNuQyxlQUFlO1FBQ1As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QUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsOEJBQWUsR0FBZjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFjO1lBQ3JDLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsMEJBQVcsR0FBWDtRQUNJLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBQztZQUNqQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBM2xCZ0IsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQTZsQnhCO0lBQUQsV0FBQztDQTdsQkQsQUE2bEJDLENBN2xCaUMsRUFBRSxDQUFDLFNBQVMsR0E2bEI3QztrQkE3bEJvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVN0YXRlLCBKaWFTdSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgRW5lbXlfSW5qdXJlZF9UeXBlIH0gZnJvbSBcIi4uL0VuZW15L0VuZW15Q29uZmlnXCI7XHJcbmltcG9ydCBCdWZmU3RhdGVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lL0J1ZmZTdGF0ZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZUVmZmVjdElkLCBHYW1lRWZmZWN0c01hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZS9HYW1lRWZmZWN0c01hbmFnZXJcIjtcclxuaW1wb3J0IFNreU1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvU2t5TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEJ1ZmZEYXRhIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmRGF0YVwiO1xyXG5pbXBvcnQgQnVmZlN0YXRlIGZyb20gXCIuLi9IZXJvL0dhbWUvQnVmZlN0YXRlXCI7XHJcbmltcG9ydCBCdWZmVGltZXIgZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmVGltZXJcIjtcclxuaW1wb3J0IHsgQXR0cmlidXRlRGF0YSwgQnVmZklkLCBCdWZmU3RhdGVUeXBlLCBEYW1hZ2VUeXBlLCBIZXJvX1R5cGUsIFNoaWVsZFR5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhwUHJvZ3Jlc3NCYXIgZnJvbSBcIi4uL01vbnN0ZXIvSHBQcm9ncmVzc0JhclwiO1xyXG5pbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcbmltcG9ydCB7IE1vbnN0ZXJBdHREYXRhLCBJbmp1cmVkRGF0YSwgRmVlZEJhY2tUeXBlLCBTdHJlbmd0aFR5cGUgfSBmcm9tIFwiLi4vTW9uc3Rlci9Nb25zdGVyRGF0YVwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IEltbXVuaXR5U2hpZWxkIGZyb20gXCIuL0ltbXVuaXR5U2hpZWxkXCI7XHJcbmltcG9ydCBTaGllbGQgZnJvbSBcIi4vU2hpZWxkXCI7XHJcbmltcG9ydCB7IFdhbGxUeXBlIH0gZnJvbSBcIi4vV2FsbENvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKirlsZ7mgKfmlbDmja4gKi9cclxuICAgIHByb3RlY3RlZCBhdHRyaWJ1dGVfZGF0YTpBdHRyaWJ1dGVEYXRhPW51bGw7XHJcbiAgICAvKirln47lopnnsbvlnosgKi9cclxuICAgIHByb3RlY3RlZCB3YWxsX3R5cGU6V2FsbFR5cGU9V2FsbFR5cGUuTWFpbjsgICAgXHJcbiAgICAvL+W9k+WJjeihgOmHj1xyXG4gICAgcHJvdGVjdGVkIGN1cl9ocDpudW1iZXI9MTAwMDtcclxuICAgIC8qKuacgOWkp+ihgOmHjyAqL1xyXG4gICAgcHJvdGVjdGVkIG1heF9ocDpudW1iZXI9MTAwMDtcclxuICAgIHByb3RlY3RlZCBocF9wcm9ncmVzczpIcFByb2dyZXNzQmFyPW51bGw7XHJcbiAgICBwcm90ZWN0ZWQgc2hpZWxkX3Byb2dyZXNzOmNjLlByb2dyZXNzQmFyPW51bGw7XHJcbiAgICBwcm90ZWN0ZWQgaHBfdGV4dDpjYy5MYWJlbD1udWxsO1xyXG4gICAgcHJvdGVjdGVkIHNoaWVsZF90ZXh0OmNjLkxhYmVsPW51bGw7XHJcbiAgICAvKkJVRkYqICovXHJcbiAgICBwcm90ZWN0ZWQgd2FsbF9idWZmOiBNYXA8QnVmZklkLEJ1ZmZUaW1lcj49bnVsbDtcclxuICAgIC8qQlVGRiogKi9cclxuICAgIHByb3RlY3RlZCB3YWxsX2RlX2J1ZmY6IE1hcDxCdWZmSWQsQnVmZlRpbWVyPj1udWxsO1xyXG4gICAgLyoqYnVmZueKtuaAgSAqL1xyXG4gICAgcHJvdGVjdGVkIG1hcF9idWZmX3N0YXRlOk1hcDxudW1iZXIsQnVmZlN0YXRlPj1udWxsO1xyXG4gICAgLyoq5oqk55u+ICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwX3NoaWVsZF92YWx1ZTpNYXA8bnVtYmVyLFNoaWVsZD49bnVsbDtcclxuICAgIC8qKuWFjeeWq+aKpOebviAqL1xyXG4gICAgcHJvdGVjdGVkIG1hcF9pbW11bml0eV9zaGllbGRfdmFsdWU6TWFwPG51bWJlcixJbW11bml0eVNoaWVsZD49bnVsbDtcclxuXHJcbiAgICAvKirln47lopnmrbvkuqHnm5HlkKwgKi9cclxuICAgIHByaXZhdGUgZGllX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirooYDmnaHlj5HnlJ/mlLnlj5jnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgaHBfY2hhbmdlX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirooYDmnaHmmL7npLrml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgaHBfc2hvd19jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq6KGA5p2h5pi+56S65pe255qE5Zue6LCDICovXHJcbiAgICBwcml2YXRlIGRhbWFnZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgLyoq5Z+O5aKZ55qE55+p5b2iICovXHJcbiAgICBwcml2YXRlIHdhbGxfcmVjdDpjYy5SZWN0PW51bGw7XHJcbiAgICAvKirln47lopnnmoTmnIDpq5hZ6L205Z2Q5qCHICovXHJcbiAgICBwcml2YXRlIHdhbGxfbWF4X3l5Om51bWJlcj0wO1xyXG4gICAgLyoq5piv5ZCm5q275Lqh5LqGICovXHJcbiAgICBpc19kaWU6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBpc190dXRvcmFpbDpib29sZWFuPWZhbHNlO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluWfjuWimeaVsOaNrlxyXG4gICAgICogQHBhcmFtIGF0dHJpYnV0ZURhdGEg5bGe5oCn5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gd2FsbFR5cGUg5Z+O5aKZ55qE57G75Z6LXHJcbiAgICAgKi9cclxuICAgIGluaXRXYWxsKGF0dHJpYnV0ZURhdGE6QXR0cmlidXRlRGF0YSx3YWxsVHlwZTpXYWxsVHlwZSkge1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlX2RhdGE9YXR0cmlidXRlRGF0YTtcclxuICAgICAgICB0aGlzLndhbGxfdHlwZT13YWxsVHlwZTtcclxuICAgICAgICB0aGlzLmlzX2RpZT1mYWxzZTtcclxuICAgICAgICB0aGlzLmN1cl9ocD10aGlzLm1heF9ocD1hdHRyaWJ1dGVEYXRhLkhlYWx0aD1NYXRoLnJvdW5kKGF0dHJpYnV0ZURhdGEuSGVhbHRoKTtcclxuICAgICAgICBpZighdGhpcy5tYXBfc2hpZWxkX3ZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlPW5ldyBNYXA8bnVtYmVyLFNoaWVsZD4oKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlPW5ldyBNYXA8bnVtYmVyLEltbXVuaXR5U2hpZWxkPigpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLndhbGxfYnVmZil7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbF9idWZmPW5ldyBNYXA8QnVmZklkLEJ1ZmZUaW1lcj4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMud2FsbF9kZV9idWZmKXtcclxuICAgICAgICAgICAgdGhpcy53YWxsX2RlX2J1ZmY9bmV3IE1hcDxCdWZmSWQsQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZUFsbEJ1ZmYoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbERlQnVmZigpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsU2hpZWxkKCk7XHJcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcclxuICAgICAgICB0aGlzLnNob3dTaGlsZFByb2dyZXNzKCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoV2FsbERhdGEoYXR0cmlidXRlRGF0YTpBdHRyaWJ1dGVEYXRhKXtcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZV9kYXRhPWF0dHJpYnV0ZURhdGE7XHJcbiAgICAgICAgdGhpcy5tYXhfaHA9YXR0cmlidXRlRGF0YS5IZWFsdGg9TWF0aC5yb3VuZChhdHRyaWJ1dGVEYXRhLkhlYWx0aCk7XHJcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hXYWxsRGF0YUJ5YWRkSGVybyhhdHRyaWJ1dGVEYXRhOkF0dHJpYnV0ZURhdGEpe1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlX2RhdGE9YXR0cmlidXRlRGF0YTtcclxuICAgICAgICBsZXQgZGVyX2hwOm51bWJlcj10aGlzLm1heF9ocC10aGlzLmN1cl9ocDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW3ruWAvOihgOmHj1wiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1heF9ocD1hdHRyaWJ1dGVEYXRhLkhlYWx0aD1NYXRoLnJvdW5kKGF0dHJpYnV0ZURhdGEuSGVhbHRoKTtcclxuICAgICAgICB0aGlzLmN1cl9ocD10aGlzLm1heF9ocC1kZXJfaHA7XHJcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcclxuICAgIH1cclxuICAgIGdldEF0dHJpYnV0ZURhdGEoKTpBdHRyaWJ1dGVEYXRhe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZV9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruWfjuWimeatu+S6oeeahOebkeWQrCAqL1xyXG4gICAgc2V0V2FsbERpZUxpc3RlbihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5kaWVfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7ln47lopnooYDph4/lj5HnlJ/mlLnlj5jml7bnmoTnm5HlkKwgKi9cclxuICAgIHNldEhwQ2hhbmdlTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmhwX2NoYW5nZV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIC8qKuiuvue9ruWfjuWimeihgOmHj+aYvuekuuaXtueahOebkeWQrCAqL1xyXG4gICAgc2V0SHBTaG93TGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmhwX3Nob3dfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7ln47lopnlj5fkvKTml7bnmoTnm5HlkKwgKi9cclxuICAgIHNldERhbWFnZUxpc3RlbihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7ln47lopnnmoTnn6nlvaIgKi9cclxuICAgIHByb3RlY3RlZCBzZXRXYWxsUmVjdChyZWN0OmNjLlJlY3Qpe1xyXG4gICAgICAgIHRoaXMud2FsbF9yZWN0PXJlY3Q7XHJcbiAgICAgICAgdGhpcy53YWxsX21heF95eT1yZWN0LnlNYXg7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bln47lopnnmoTnn6nlvaIgKi9cclxuICAgIHB1YmxpYyBnZXRXYWxsUmVjdCgpOmNjLlJlY3R7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbF9yZWN0O1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5Z+O5aKZ55qE5pyA6auY54K5ICovXHJcbiAgICBwdWJsaWMgZ2V0V2FsbE1heFlZKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxfbWF4X3l5O1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5Z+O5aKZ55qE57G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0V2FsbFR5cGUoKTpXYWxsVHlwZXtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxsX3R5cGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWfjuWimeWPl+S8pOiuoeeul1xyXG4gICAgICogQHBhcmFtIGRhbWFnZSDkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBkYW1hZ2VUeXBlIOS8pOWus+exu+Wei1xyXG4gICAgICogQHBhcmFtIHN0cmVuZ3RoVHlwZSDmgKrniannsbvlnotcclxuICAgICAqIEBwYXJhbSBtb25zdGVyRGF0YSDmgKrnianmlbDmja5cclxuICAgICAqIEBwYXJhbSBpc1JlYWwg5piv5ZCm55yf5a6e5Lyk5a6zXHJcbiAgICAgKiBAcGFyYW0gc2hpcCDoiLnmkp7nmoTml7blgJnnmoTkvKTlrrNcclxuICAgICAqL1xyXG4gICAgYmVJbmp1cmVkKG1vbnN0ZXJBdHREYXRhOk1vbnN0ZXJBdHREYXRhLGlzUmVhbDpib29sZWFuPWZhbHNlLHNoaXA6bnVtYmVyPTApOkluanVyZWREYXRhe1xyXG4gICAgICAgIGxldCBtb25zdGVyRGF0YT1tb25zdGVyQXR0RGF0YS5tb25zdGVyX2F0dHJpYnV0ZTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICBsZXQgbWlzc1JhdGU9MDsgICAgICAgIFxyXG4gICAgICAgIGxldCBjcml0UmF0ZT0wO1xyXG4gICAgICAgIGxldCBkYW1hZ2U9MDtcclxuICAgICAgICAvL+WmguaenOaYr+aZrumAmuaUu+WHu++8jOiuoeeul+mXqumBv+WSjOaatOWHu++8jOm7mOiupOS4ujBcclxuICAgICAgICBpZihtb25zdGVyQXR0RGF0YS5kYW1hZ2VfdHlwZT09RGFtYWdlVHlwZS5Ob3JtYWwpe1xyXG4gICAgICAgICAgICBtaXNzUmF0ZT1Jbmp1cmVkRGF0YS5jYWxjTWlzc1JhdGUodGhpcy5hdHRyaWJ1dGVfZGF0YS5NaXNzLG1vbnN0ZXJEYXRhLkhpdCk7XHJcbiAgICAgICAgICAgIGNyaXRSYXRlPUluanVyZWREYXRhLmNhbGNDcml0UmF0ZShtb25zdGVyRGF0YS5Dcml0aWNhbCx0aGlzLmF0dHJpYnV0ZV9kYXRhLkFudGlDcml0aWNhbCk7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5LiA5Liq5qaC546H57G75Z6LXHJcbiAgICAgICAgICAgIGxldCB0eXBlPUluanVyZWREYXRhLmNhbGNPbmNlVHlwZShbbWlzc1JhdGUsY3JpdFJhdGUsMV0pO1xyXG4gICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6Zeq6YG/XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5TaGFuQmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oMCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pq05Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1JlYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbENyaXRSZWFsRGFtYWdlTnVtKG1vbnN0ZXJEYXRhLkF0dGFjayxJbmp1cmVkRGF0YS5jYWxjRmluYWxFeHRyYUNyaXQobW9uc3RlckRhdGEuRXh0cmFDcml0aWNhbCx0aGlzLmF0dHJpYnV0ZV9kYXRhLkFudGlFeHRyYUNyaXRpY2FsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsQ3JpdERhbWFnZU51bShtb25zdGVyRGF0YS5BdHRhY2ssdGhpcy5hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlLG1vbnN0ZXJBdHREYXRhLnplbmdzaGFuZ19yYXRlLHRoaXMuYXR0cmlidXRlX2RhdGEucmVkdWNlX2luanVyeV9yYXRlLEluanVyZWREYXRhLmNhbGNGaW5hbEV4dHJhQ3JpdChtb25zdGVyRGF0YS5FeHRyYUNyaXRpY2FsLHRoaXMuYXR0cmlidXRlX2RhdGEuQW50aUV4dHJhQ3JpdGljYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5kYW1hZ2VfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZV9jYWxsYmFjayhtb25zdGVyQXR0RGF0YS5tb25zdGVyX3RzKTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgICAgICAvL+aZrumAmuWRveS4rVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1JlYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbFJlYWxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrKTsgICBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNOb3JtYWxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrLHRoaXMuYXR0cmlidXRlX2RhdGEuRGVmZW5zZSxtb25zdGVyQXR0RGF0YS56ZW5nc2hhbmdfcmF0ZSx0aGlzLmF0dHJpYnV0ZV9kYXRhLnJlZHVjZV9pbmp1cnlfcmF0ZSk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRhbWFnZV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlX2NhbGxiYWNrKG1vbnN0ZXJBdHREYXRhLm1vbnN0ZXJfdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLlNraWxsKXtcclxuICAgICAgICAgICAgLy/kuI3pnIDopoHorqHnrpfpl6rpgb/vvIzmioDog73lv4XkuK1cclxuICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5OdWxsO1xyXG4gICAgICAgICAgICBpZihpc1JlYWwpe1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbFJlYWxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrLG1vbnN0ZXJBdHREYXRhLnNraWxsX3JhdGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrLG1vbnN0ZXJBdHREYXRhLnNraWxsX3JhdGUsdGhpcy5hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlLG1vbnN0ZXJBdHREYXRhLnplbmdzaGFuZ19yYXRlLHRoaXMuYXR0cmlidXRlX2RhdGEucmVkdWNlX2luanVyeV9yYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgIH1lbHNlIGlmKG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLlNoaXApe1xyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk51bGw7XHJcbiAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKHNoaXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAvL2NjLmxvZyhkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuY2hlY2tNbW11bml0eVNoaWVsZCgxLG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAvL+WFiOWHj+aKpOebvueahOWAvFxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMuY2hhbmdlU2hpZWxkVmFsdWUoLWRhdGEuZ2V0RGFtYWdlTnVtKCksbW9uc3RlckF0dERhdGEuZGFtYWdlX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYodmFsdWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIcCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53YWxsX3R5cGU9PVdhbGxUeXBlLk1haW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyQXR0RGF0YS5zdHJlbmd0aF90eXBlPT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyQXR0RGF0YS5kYW1hZ2VfdHlwZT09RGFtYWdlVHlwZS5Ta2lsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlckF0dERhdGEuaXNfYmlnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VCaWcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VTbWFsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobW9uc3RlckF0dERhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuTm9ybWFsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZVNtYWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+aPkOekuuWFjeeWq1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIC8qKumAoOaIkOecn+WunuS8pOWus++8jOebtOaOpemAoOaIkOWvueW6lOeahOS8pOWus+WAvCzml6Dms5Xpl6rpgb8gKi9cclxuICAgIGJlUmVhbERhbWFnZShkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsc3RyZW5ndGhUeXBlOlN0cmVuZ3RoVHlwZSxkYW1hZ2U6bnVtYmVyKXtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpOyAgICAgICAgXHJcbiAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuY2hlY2tNbW11bml0eVNoaWVsZCgxLGRhbWFnZVR5cGUpKXtcclxuICAgICAgICAgICAgICAgIC8v5YWI5YeP5oqk55u+55qE5YC8XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5jaGFuZ2VTaGllbGRWYWx1ZSgtZGF0YS5nZXREYW1hZ2VOdW0oKSxkYW1hZ2VUeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0cmVuZ3RoVHlwZT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYW1hZ2VUeXBlPT1EYW1hZ2VUeXBlLlNraWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlQmlnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRhbWFnZVR5cGU9PURhbWFnZVR5cGUuTm9ybWFsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+aPkOekuuWFjeeWq1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmlLnlj5jooYDph4/lgLzvvIzov5Tlm57mmK/lkKbmrbvkuqEgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VIcChocDpudW1iZXIpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSB8fCBnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGF1c2UgfHwgZ20uY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1dpbiB8fCB0aGlzLmlzX2RpZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihocDwwKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjEse2NvbG9yOmNjLkNvbG9yLlJFRH0pLnRvKDAuMSx7Y29sb3I6Y2MuQ29sb3IuV0hJVEV9KS5zdGFydCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3SHA9dGhpcy5jdXJfaHAraHA7XHJcbiAgICAgICAgaWYodGhpcy5ocF9jaGFuZ2VfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmhwX2NoYW5nZV9jYWxsYmFjayhocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNldEhwKG5ld0hwKTtcclxuICAgIH1cclxuICAgIC8qKuaXoOWwveaooeW8j+eahOeri+WNs+aBouWkjeihgOmHjyAqL1xyXG4gICAgcHVibGljIGNoYW5nZUhwQnlFbmRsZXNzKGhwOm51bWJlcil7XHJcbiAgICAgICAgbGV0IG5ld0hwPXRoaXMuY3VyX2hwK2hwO1xyXG4gICAgICAgIGlmKHRoaXMuaHBfY2hhbmdlX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5ocF9jaGFuZ2VfY2FsbGJhY2soaHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEhwKG5ld0hwKVxyXG4gICAgfVxyXG4gICAgLyoq6L+U5Zue5piv5ZCm5q275LqhICovXHJcbiAgICBwcml2YXRlIHNldEhwKG5ld0hwOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBpZihuZXdIcD50aGlzLm1heF9ocClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5ld0hwPXRoaXMubWF4X2hwO1xyXG4gICAgICAgIH1lbHNlIGlmKG5ld0hwPD0wKXtcclxuICAgICAgICAgICAgbmV3SHA9MDtcclxuICAgICAgICAgICAgdGhpcy5pc19kaWU9dHJ1ZTtcclxuICAgICAgICAgICAgaWYodGhpcy5kaWVfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWVfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9ocD1uZXdIcDtcclxuICAgICAgICAvLyBpZih0aGlzLmlzX3R1dG9yYWlsKXtcclxuICAgICAgICAvLyAgICAgLy/mlZnnqIvplIHooYBcclxuICAgICAgICAvLyAgICAgdGhpcy5jdXJfaHA9dGhpcy5nZXRNYXhIcCgpLzI7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2hwPD0wO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93SHAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaHBfcHJvZ3Jlc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmhwX3Byb2dyZXNzLmNoYW5nZVByb2dyZXNzKHRoaXMuY3VyX2hwL3RoaXMubWF4X2hwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ocF90ZXh0KXtcclxuICAgICAgICAgICAgdGhpcy5ocF90ZXh0LnN0cmluZz1NYXRoLmZsb29yKHRoaXMuY3VyX2hwKSsnLycrdGhpcy5tYXhfaHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaHBfc2hvd19jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfc2hvd19jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJIcFBlcigpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocC90aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKrnm74gKi9cclxuICAgIGFkZFNoaWVsZChpZDpudW1iZXIsdHlwZTpTaGllbGRUeXBlLHJlbWFpblRpbWU6bnVtYmVyLHZhbHVlOm51bWJlcixnYW1lRWZmZWN0SWQ6R2FtZUVmZmVjdElkKXtcclxuICAgICAgICBpZih0aGlzLm1hcF9zaGllbGRfdmFsdWUuaGFzKGlkKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZS5nZXQoaWQpLnJlZnJlc2hTaGllbGQocmVtYWluVGltZSx2YWx1ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBzaGllbGQ9bmV3IGNjLk5vZGUoKS5hZGRDb21wb25lbnQoU2hpZWxkKTtcclxuICAgICAgICAgICAgc2hpZWxkLmluaXQoaWQsdHlwZSxyZW1haW5UaW1lLHZhbHVlLHRoaXMub25TaGllbGREZXN0cm95LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUuc2V0KGlkLHNoaWVsZCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIC8qKua3u+WKoOaKpOebvueJueaViCAqL1xyXG4gICAgICAgICAgICBpZihnYW1lRWZmZWN0SWQhPUdhbWVFZmZlY3RJZC5OdWxsKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXhpYW89R2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChnYW1lRWZmZWN0SWQsY2MudjIoMCwwKSx0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgc2hpZWxkLnNldEdhbWVFZmZlY3REYXRhKGdhbWVFZmZlY3RJZCx0ZXhpYW8pO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIG9uU2hpZWxkRGVzdHJveShpZDpudW1iZXIpOiB2b2lkIHsgICAgICAgIFxyXG4gICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZS5kZWxldGUoaWQpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmm7TmlLnmiqTnm77lgLzvvIzov5Tlm57kvKTlrrPmuqLlh7rnmoTlgLwqL1xyXG4gICAgY2hhbmdlU2hpZWxkVmFsdWUobnVtOm51bWJlcix0eXBlOkRhbWFnZVR5cGUpOm51bWJlcntcclxuICAgICAgICAvL+agueaNruS8pOWus+exu+Wei+mBjeWOhuWHuuWvueW6lOeahOaKpOebvlxyXG4gICAgICAgIGxldCBzaGllbGRBcnI9bmV3IEFycmF5PFNoaWVsZD4oKTtcclxuICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LmdldElzQ2FuV2l0aHN0YW5kKHR5cGUpKXtcclxuICAgICAgICAgICAgICAgIHNoaWVsZEFyci5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/mjpLluo9cclxuICAgICAgICBpZihzaGllbGRBcnIubGVuZ3RoPj0yKXtcclxuICAgICAgICAgICAgc2hpZWxkQXJyLnNvcnQoKGxlZnQ6U2hpZWxkLHJpZ2h0OlNoaWVsZCk9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0LmdldFJlbWFpblRpbWUoKS1yaWdodC5nZXRSZW1haW5UaW1lKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdWYWx1ZT1udW07XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpZWxkQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbmV3VmFsdWU9c2hpZWxkQXJyW2ldLmNoYW5nZVNoaWVsZFZhbHVlKG51bSk7XHJcbiAgICAgICAgICAgIGlmKG5ld1ZhbHVlPjApe1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93U2hpbGRQcm9ncmVzcygpO1xyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvd1NoaWxkUHJvZ3Jlc3MoKXtcclxuICAgICAgICBsZXQgdmFsdWU9dGhpcy5nZXRTaGllbGRWYWx1ZSgpO1xyXG4gICAgICAgIGxldCBwcm9ncmVzcz12YWx1ZS90aGlzLmdldE1heEhwKCk7XHJcbiAgICAgICAgaWYocHJvZ3Jlc3M+MSl7XHJcbiAgICAgICAgICAgIHByb2dyZXNzPTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2hpZWxkX3Byb2dyZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRfcHJvZ3Jlc3Mubm9kZS5hY3RpdmU9dmFsdWU+MDtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRfcHJvZ3Jlc3MucHJvZ3Jlc3M9cHJvZ3Jlc3NcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zaGllbGRfdGV4dCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkX3RleHQubm9kZS5hY3RpdmU9dmFsdWU+MDtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRfdGV4dC5zdHJpbmc9dmFsdWUudG9GaXhlZCgwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yy56YWN5oqk55u+ICovXHJcbiAgICBnZXRTaGllbGRWYWx1ZSgpOm51bWJlcntcclxuICAgICAgICBsZXQgdmFsdWU9MDtcclxuICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICB2YWx1ZSs9di5nZXRTaGllbGRWYWx1ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxTaGllbGQoKXtcclxuICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICB2LmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5Liq5YW35pyJ5YWN55ar5pWI5p6c55qE55u+ICovXHJcbiAgICBhZGRJbW11bml0eVNoaWVsZChpZDpudW1iZXIsdHlwZTpTaGllbGRUeXBlLHJlbWFpblRpbWU6bnVtYmVyLHZhbHVlOm51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlLmhhcyhpZCkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUuZ2V0KGlkKS5yZWZyZXNoU2hpZWxkKHJlbWFpblRpbWUsdmFsdWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgc2hpZWxkPW5ldyBjYy5Ob2RlKCkuYWRkQ29tcG9uZW50KEltbXVuaXR5U2hpZWxkKTtcclxuICAgICAgICAgICAgc2hpZWxkLmluaXQoaWQsdHlwZSxyZW1haW5UaW1lLHZhbHVlLChpZCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZS5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUuc2V0KGlkLHNoaWVsZCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuajgOafpeWFjeeWq+aKpOebvuWAvO+8jOi/lOWbnuaYr+WQpuiDveWFjeeWqyovXHJcbiAgICBjaGVja01tbXVuaXR5U2hpZWxkKG51bTpudW1iZXIsdHlwZTpEYW1hZ2VUeXBlKTpib29sZWFue1xyXG4gICAgICAgIC8v5qC55o2u5Lyk5a6z57G75Z6L6YGN5Y6G5Ye65a+55bqU55qE5oqk55u+XHJcbiAgICAgICAgbGV0IHNoaWVsZEFycj1uZXcgQXJyYXk8SW1tdW5pdHlTaGllbGQ+KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlLmZvckVhY2goKHYsayk9PnsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYodi5nZXRJc0NhbldpdGhzdGFuZCh0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICBzaGllbGRBcnIucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5o6S5bqPXHJcbiAgICAgICAgaWYoc2hpZWxkQXJyLmxlbmd0aD49Mil7XHJcbiAgICAgICAgICAgIHNoaWVsZEFyci5zb3J0KChsZWZ0OkltbXVuaXR5U2hpZWxkLHJpZ2h0OkltbXVuaXR5U2hpZWxkKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQuZ2V0UmVtYWluVGltZSgpLXJpZ2h0LmdldFJlbWFpblRpbWUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlPW51bTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGllbGRBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBuZXdWYWx1ZT1zaGllbGRBcnJbaV0uY2hhbmdlU2hpZWxkVmFsdWUobnVtKTtcclxuICAgICAgICAgICAgaWYobmV3VmFsdWU+MCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBhZGRIcEJ1ZmYoKTp2b2lke1xyXG4gICAgICAgIGxldCBwb3M9Y2MudjIoTWF0aC5yYW5kb20oKSoxMDAtNTAsTWF0aC5yYW5kb20oKSo1MC0yNSk7XHJcbiAgICAgICAgR2FtZUVmZmVjdHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEZvclBhcmVudChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGlsaWFvX2hhbG9faGl0LHBvcyx0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG4gICAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tQlVGRi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgYWRkQnVmZihidWZmRGF0YTpCdWZmRGF0YSk6IEJ1ZmZUaW1lciB7XHJcbiAgICAgICAgbGV0IGJ1ZmZJZD1idWZmRGF0YS5idWZmX2lkO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZUJ1ZmYoYnVmZklkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU9bmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOkJ1ZmZUaW1lcj1ub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZighYnVmZil7XHJcbiAgICAgICAgICAgICAgICBidWZmPW5vZGUuYWRkQ29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi5pbml0KGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgLy9idWZm6ZSA5q+B5pe25aSE55CGXHJcbiAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIC8vYnVmZuayu+eWl+inpuWPkeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5yZWNvdmVyeV9qaWFuZ2VfdGltZT4wKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkUmVjb3ZlcnlMaXN0ZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvUmVjb3Zlcnk6KG51bTpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAobnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcz1jYy52MihNYXRoLnJhbmRvbSgpKjYwMC0zMDAsdGhpcy5ub2RlLnkrTWF0aC5yYW5kb20oKSoyMDAtMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ocF90ZXh0X21hbmFnZXIuY3JlYXRlSHBUZXh0SHAocG9zLG51bSxFbmVteV9Jbmp1cmVkX1R5cGUuWmhpTGlhbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNreU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVHYW1lRWZmZWN0QnlJZChHYW1lRWZmZWN0SWQubW9uc3Rlcl96aGlsaWFvX2hhbG9faGl0LHBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxidWZmLmdldEZpcnN0QnVmZlZhbHVlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMud2FsbF9idWZmLnNldChidWZmRGF0YS5idWZmX2lkLGJ1ZmYpO1xyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZklkKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0ppYVh1ZUppYW5TaGFuZzp7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVfZGF0YS5yZWR1Y2VfaW5qdXJ5X3JhdGUrPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMV07XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hZGRCdWZmU3RhdGUoYnVmZklkLGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBidWZmPXRoaXMud2FsbF9idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgICAgICBidWZmLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRCdWZmU3RhdGUoYnVmZklkLGJ1ZmZEYXRhLnJlbWFpbl90aW1lKTsgIFxyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjsgICAgICAgICBcclxuICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN1YkJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZj10aGlzLndhbGxfYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZihidWZmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnVmZkRlc3RvcnkoYnVmZkRhdGE6QnVmZkRhdGEpe1xyXG4gICAgICAgIHRoaXMud2FsbF9idWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7ICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfSmlhWHVlSmlhblNoYW5nOntcclxuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlX2RhdGEucmVkdWNlX2luanVyeV9yYXRlLT1idWZmRGF0YS5idWZmX3ZhbHVlWzFdO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZUJ1ZmYoYnVmZjogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbF9idWZmLmhhcyhidWZmKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxCdWZmKCl7XHJcbiAgICAgICAgdGhpcy53YWxsX2J1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3ViQnVmZihidWZmLmdldEJ1ZmZJZCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKua3u+WKoOS4gOS4qmJ1ZmbnirbmgIHlm77moIcgKi9cclxuICAgIGFkZEJ1ZmZTdGF0ZShidWZmSWQ6QnVmZklkLHJlbWFpblRpbWU6bnVtYmVyKXtcclxuICAgICAgICBsZXQgdHlwZXM9QnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEJ1ZmZUeXBlKGJ1ZmZJZCk7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dHlwZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdHlwZT10eXBlc1tpXTtcclxuICAgICAgICAgICAgaWYodGhpcy5tYXBfYnVmZl9zdGF0ZS5oYXModHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5nZXQodHlwZSkucmVmcmVzaFRpbWUocmVtYWluVGltZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGJmU3RhdGU9QnVmZlN0YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUJ1ZmZTdGF0ZSh0eXBlLEhlcm9fVHlwZS5IZXJvX051bSk7XHJcbiAgICAgICAgICAgICAgICBiZlN0YXRlLmluaXQodHlwZSxyZW1haW5UaW1lLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5kZWxldGUodHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuc2V0KHR5cGUsYmZTdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QnVmZlR5cGUoYnVmZklkOkJ1ZmZJZCk6QnVmZlN0YXRlVHlwZVtde1xyXG4gICAgICAgIGxldCB0eXBlPVtdO1xyXG4gICAgICAgIHN3aXRjaChidWZmSWQpe1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7ICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgYWRkRGVCdWZmKGJ1ZmZEYXRhOkJ1ZmZEYXRhLG1vbnN0ZXJBdHREYXRhOk1vbnN0ZXJBdHREYXRhKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmZJZD1idWZmRGF0YS5idWZmX2lkO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzSGF2ZURlQnVmZihidWZmSWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqBidWZm6IqC54K55ZKM54m55pWIICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6QnVmZlRpbWVyPW5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmKCFidWZmKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmY9bm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25EZUJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLndhbGxfZGVfYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCxidWZmKTtcclxuICAgICAgICAgICAgLy9idWZm5Lyk5a6z6Kem5Y+R5pe25aSE55CGXHJcbiAgICAgICAgICAgIGlmKGJ1ZmZEYXRhLmRhbWFnZV9qaWFuZ2VfdGltZT4wJiZtb25zdGVyQXR0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICBidWZmLmFkZERhbWFnZUxpc3Rlbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9EYW1hZ2U6KG1vbnN0ZXJBdHREYXRhOk1vbnN0ZXJBdHREYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb25zdGVyQXR0RGF0YS5pc19iaWc9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVJbmp1cmVkKG1vbnN0ZXJBdHREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LG1vbnN0ZXJBdHREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2goYnVmZklkKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLndhbGxfZGVfYnVmZi5nZXQoYnVmZklkKS5yZWZyZXNoQnVmZihidWZmRGF0YSk7ICAgICAgICAgXHJcbiAgICAgICAgfSAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN1YkRlQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmPXRoaXMud2FsbF9kZV9idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmKGJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZUJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOkJ1ZmZEYXRhKXtcclxuICAgICAgICB0aGlzLndhbGxfZGVfYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVEZUJ1ZmYoYnVmZjogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbF9kZV9idWZmLmhhcyhidWZmKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVBbGxEZUJ1ZmYoKXtcclxuICAgICAgICB0aGlzLndhbGxfZGVfYnVmZi5mb3JFYWNoKChidWZmOkJ1ZmZUaW1lcik9PntcclxuICAgICAgICAgICAgdGhpcy5zdWJEZUJ1ZmYoYnVmZi5nZXRCdWZmSWQoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95V2FsbCgpe1xyXG4gICAgICAgIGlmKHRoaXMuZGllX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5kaWVfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==