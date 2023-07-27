
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
            // data.feedback_type=FeedBackType.Null;
            // data.setDamageNum(ship);
            data.feedback_type = MonsterData_1.FeedBackType.Null;
            if (isReal) {
                damage = MonsterData_1.InjuredData.calcNormalRealDamageNum(monsterData.Attack);
            }
            else {
                damage = MonsterData_1.InjuredData.calcNormalDamageNum(monsterData.Attack, this.attribute_data.Defense, monsterAttData.zengshang_rate, this.attribute_data.reduce_injury_rate);
            }
            data.setDamageNum(damage);
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
            WXManagerEX_1.default.getInstance().vibrateShort();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcV2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBdUQ7QUFDdkQsMENBQWdEO0FBQ2hELG9EQUEwRDtBQUMxRCw2REFBd0Q7QUFDeEQsaUVBQThFO0FBQzlFLGlEQUE0QztBQUM1Qyw4Q0FBeUM7QUFHekMsb0RBQStDO0FBQy9DLHNEQUFrSDtBQUdsSCxzREFBaUc7QUFDakcsMENBQXFDO0FBQ3JDLG1EQUE4QztBQUM5QyxtQ0FBOEI7QUFDOUIsMkNBQXdDO0FBR2xDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBcW1CQztRQXBtQkcsVUFBVTtRQUNBLG9CQUFjLEdBQWUsSUFBSSxDQUFDO1FBQzVDLFVBQVU7UUFDQSxlQUFTLEdBQVUscUJBQVEsQ0FBQyxJQUFJLENBQUM7UUFDM0MsTUFBTTtRQUNJLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDN0IsVUFBVTtRQUNBLFlBQU0sR0FBUSxJQUFJLENBQUM7UUFDbkIsaUJBQVcsR0FBZSxJQUFJLENBQUM7UUFDL0IscUJBQWUsR0FBZ0IsSUFBSSxDQUFDO1FBQ3BDLGFBQU8sR0FBVSxJQUFJLENBQUM7UUFDdEIsaUJBQVcsR0FBVSxJQUFJLENBQUM7UUFDcEMsVUFBVTtRQUNBLGVBQVMsR0FBd0IsSUFBSSxDQUFDO1FBQ2hELFVBQVU7UUFDQSxrQkFBWSxHQUF3QixJQUFJLENBQUM7UUFDbkQsWUFBWTtRQUNGLG9CQUFjLEdBQXVCLElBQUksQ0FBQztRQUNwRCxRQUFRO1FBQ0Usc0JBQWdCLEdBQW9CLElBQUksQ0FBQztRQUNuRCxVQUFVO1FBQ0EsK0JBQXlCLEdBQTRCLElBQUksQ0FBQztRQUVwRSxZQUFZO1FBQ0osa0JBQVksR0FBVSxJQUFJLENBQUM7UUFD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SSxHQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUcsSUFBSSxFQUNQO1lBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsOEJBQWUsR0FBZixVQUFnQixRQUFpQjtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsUUFBTyxRQUFRLENBQUMsT0FBTyxFQUFDO1NBRXZCO0lBQ0wsQ0FBQztJQUVELDJCQUFZLEdBQVosVUFBYSxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFlLEdBQWY7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBYztZQUNyQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDBCQUFXLEdBQVg7UUFDSSxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQW5tQmdCLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FxbUJ4QjtJQUFELFdBQUM7Q0FybUJELEFBcW1CQyxDQXJtQmlDLEVBQUUsQ0FBQyxTQUFTLEdBcW1CN0M7a0JBcm1Cb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBHYW1lU3RhdGUsIEppYVN1IH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFbmVteV9Jbmp1cmVkX1R5cGUgfSBmcm9tIFwiLi4vRW5lbXkvRW5lbXlDb25maWdcIjtcclxuaW1wb3J0IEJ1ZmZTdGF0ZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWUvQnVmZlN0YXRlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lRWZmZWN0SWQsIEdhbWVFZmZlY3RzTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBCdWZmU3RhdGUgZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmU3RhdGVcIjtcclxuaW1wb3J0IEJ1ZmZUaW1lciBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZUaW1lclwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEYXRhLCBCdWZmSWQsIEJ1ZmZTdGF0ZVR5cGUsIERhbWFnZVR5cGUsIEhlcm9fVHlwZSwgU2hpZWxkVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSHBQcm9ncmVzc0JhciBmcm9tIFwiLi4vTW9uc3Rlci9IcFByb2dyZXNzQmFyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckF0dERhdGEsIEluanVyZWREYXRhLCBGZWVkQmFja1R5cGUsIFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgSW1tdW5pdHlTaGllbGQgZnJvbSBcIi4vSW1tdW5pdHlTaGllbGRcIjtcclxuaW1wb3J0IFNoaWVsZCBmcm9tIFwiLi9TaGllbGRcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi9XYWxsQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8qKuWxnuaAp+aVsOaNriAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dHJpYnV0ZV9kYXRhOkF0dHJpYnV0ZURhdGE9bnVsbDtcclxuICAgIC8qKuWfjuWimeexu+WeiyAqL1xyXG4gICAgcHJvdGVjdGVkIHdhbGxfdHlwZTpXYWxsVHlwZT1XYWxsVHlwZS5NYWluOyAgICBcclxuICAgIC8v5b2T5YmN6KGA6YePXHJcbiAgICBwcm90ZWN0ZWQgY3VyX2hwOm51bWJlcj0xMDAwO1xyXG4gICAgLyoq5pyA5aSn6KGA6YePICovXHJcbiAgICBwcm90ZWN0ZWQgbWF4X2hwOm51bWJlcj0xMDAwO1xyXG4gICAgcHJvdGVjdGVkIGhwX3Byb2dyZXNzOkhwUHJvZ3Jlc3NCYXI9bnVsbDtcclxuICAgIHByb3RlY3RlZCBzaGllbGRfcHJvZ3Jlc3M6Y2MuUHJvZ3Jlc3NCYXI9bnVsbDtcclxuICAgIHByb3RlY3RlZCBocF90ZXh0OmNjLkxhYmVsPW51bGw7XHJcbiAgICBwcm90ZWN0ZWQgc2hpZWxkX3RleHQ6Y2MuTGFiZWw9bnVsbDtcclxuICAgIC8qQlVGRiogKi9cclxuICAgIHByb3RlY3RlZCB3YWxsX2J1ZmY6IE1hcDxCdWZmSWQsQnVmZlRpbWVyPj1udWxsO1xyXG4gICAgLypCVUZGKiAqL1xyXG4gICAgcHJvdGVjdGVkIHdhbGxfZGVfYnVmZjogTWFwPEJ1ZmZJZCxCdWZmVGltZXI+PW51bGw7XHJcbiAgICAvKipidWZm54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwX2J1ZmZfc3RhdGU6TWFwPG51bWJlcixCdWZmU3RhdGU+PW51bGw7XHJcbiAgICAvKirmiqTnm74gKi9cclxuICAgIHByb3RlY3RlZCBtYXBfc2hpZWxkX3ZhbHVlOk1hcDxudW1iZXIsU2hpZWxkPj1udWxsO1xyXG4gICAgLyoq5YWN55ar5oqk55u+ICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZTpNYXA8bnVtYmVyLEltbXVuaXR5U2hpZWxkPj1udWxsO1xyXG5cclxuICAgIC8qKuWfjuWimeatu+S6oeebkeWQrCAqL1xyXG4gICAgcHJpdmF0ZSBkaWVfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuihgOadoeWPkeeUn+aUueWPmOeahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBocF9jaGFuZ2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuihgOadoeaYvuekuuaXtueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBocF9zaG93X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirooYDmnaHmmL7npLrml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgZGFtYWdlX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirln47lopnnmoTnn6nlvaIgKi9cclxuICAgIHByaXZhdGUgd2FsbF9yZWN0OmNjLlJlY3Q9bnVsbDtcclxuICAgIC8qKuWfjuWimeeahOacgOmrmFnovbTlnZDmoIcgKi9cclxuICAgIHByaXZhdGUgd2FsbF9tYXhfeXk6bnVtYmVyPTA7XHJcbiAgICAvKirmmK/lkKbmrbvkuqHkuoYgKi9cclxuICAgIGlzX2RpZTpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIGlzX3R1dG9yYWlsOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Z+O5aKZ5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlRGF0YSDlsZ7mgKfmlbDmja5cclxuICAgICAqIEBwYXJhbSB3YWxsVHlwZSDln47lopnnmoTnsbvlnotcclxuICAgICAqL1xyXG4gICAgaW5pdFdhbGwoYXR0cmlidXRlRGF0YTpBdHRyaWJ1dGVEYXRhLHdhbGxUeXBlOldhbGxUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVfZGF0YT1hdHRyaWJ1dGVEYXRhO1xyXG4gICAgICAgIHRoaXMud2FsbF90eXBlPXdhbGxUeXBlO1xyXG4gICAgICAgIHRoaXMuaXNfZGllPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwPWF0dHJpYnV0ZURhdGEuSGVhbHRoPU1hdGgucm91bmQoYXR0cmlidXRlRGF0YS5IZWFsdGgpO1xyXG4gICAgICAgIGlmKCF0aGlzLm1hcF9zaGllbGRfdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWU9bmV3IE1hcDxudW1iZXIsU2hpZWxkPigpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWU9bmV3IE1hcDxudW1iZXIsSW1tdW5pdHlTaGllbGQ+KCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMud2FsbF9idWZmKXtcclxuICAgICAgICAgICAgdGhpcy53YWxsX2J1ZmY9bmV3IE1hcDxCdWZmSWQsQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy53YWxsX2RlX2J1ZmYpe1xyXG4gICAgICAgICAgICB0aGlzLndhbGxfZGVfYnVmZj1uZXcgTWFwPEJ1ZmZJZCxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxTaGllbGQoKTtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hXYWxsRGF0YShhdHRyaWJ1dGVEYXRhOkF0dHJpYnV0ZURhdGEpe1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlX2RhdGE9YXR0cmlidXRlRGF0YTtcclxuICAgICAgICB0aGlzLm1heF9ocD1hdHRyaWJ1dGVEYXRhLkhlYWx0aD1NYXRoLnJvdW5kKGF0dHJpYnV0ZURhdGEuSGVhbHRoKTtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgfVxyXG4gICAgcmVmcmVzaFdhbGxEYXRhQnlhZGRIZXJvKGF0dHJpYnV0ZURhdGE6QXR0cmlidXRlRGF0YSl7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVfZGF0YT1hdHRyaWJ1dGVEYXRhO1xyXG4gICAgICAgIGxldCBkZXJfaHA6bnVtYmVyPXRoaXMubWF4X2hwLXRoaXMuY3VyX2hwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5beu5YC86KGA6YePXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubWF4X2hwPWF0dHJpYnV0ZURhdGEuSGVhbHRoPU1hdGgucm91bmQoYXR0cmlidXRlRGF0YS5IZWFsdGgpO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwLWRlcl9ocDtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgfVxyXG4gICAgZ2V0QXR0cmlidXRlRGF0YSgpOkF0dHJpYnV0ZURhdGF7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6K6+572u5Z+O5aKZ5q275Lqh55qE55uR5ZCsICovXHJcbiAgICBzZXRXYWxsRGllTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmRpZV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIC8qKuiuvue9ruWfjuWimeihgOmHj+WPkeeUn+aUueWPmOaXtueahOebkeWQrCAqL1xyXG4gICAgc2V0SHBDaGFuZ2VMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaHBfY2hhbmdlX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgLyoq6K6+572u5Z+O5aKZ6KGA6YeP5pi+56S65pe255qE55uR5ZCsICovXHJcbiAgICBzZXRIcFNob3dMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaHBfc2hvd19jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIC8qKuiuvue9ruWfjuWimeWPl+S8pOaXtueahOebkeWQrCAqL1xyXG4gICAgc2V0RGFtYWdlTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmRhbWFnZV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIC8qKuiuvue9ruWfjuWimeeahOefqeW9oiAqL1xyXG4gICAgcHJvdGVjdGVkIHNldFdhbGxSZWN0KHJlY3Q6Y2MuUmVjdCl7XHJcbiAgICAgICAgdGhpcy53YWxsX3JlY3Q9cmVjdDtcclxuICAgICAgICB0aGlzLndhbGxfbWF4X3l5PXJlY3QueU1heDtcclxuICAgIH1cclxuICAgIC8qKuiOt+WPluWfjuWimeeahOefqeW9oiAqL1xyXG4gICAgcHVibGljIGdldFdhbGxSZWN0KCk6Y2MuUmVjdHtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxsX3JlY3Q7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bln47lopnnmoTmnIDpq5jngrkgKi9cclxuICAgIHB1YmxpYyBnZXRXYWxsTWF4WVkoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbF9tYXhfeXk7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bln47lopnnmoTnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRXYWxsVHlwZSgpOldhbGxUeXBle1xyXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxfdHlwZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Z+O5aKZ5Y+X5Lyk6K6h566XXHJcbiAgICAgKiBAcGFyYW0gZGFtYWdlIOS8pOWus+WAvFxyXG4gICAgICogQHBhcmFtIGRhbWFnZVR5cGUg5Lyk5a6z57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc3RyZW5ndGhUeXBlIOaAqueJqeexu+Wei1xyXG4gICAgICogQHBhcmFtIG1vbnN0ZXJEYXRhIOaAqueJqeaVsOaNrlxyXG4gICAgICogQHBhcmFtIGlzUmVhbCDmmK/lkKbnnJ/lrp7kvKTlrrNcclxuICAgICAqIEBwYXJhbSBzaGlwIOiIueaSnueahOaXtuWAmeeahOS8pOWus1xyXG4gICAgICovXHJcbiAgICBiZUluanVyZWQobW9uc3RlckF0dERhdGE6TW9uc3RlckF0dERhdGEsaXNSZWFsOmJvb2xlYW49ZmFsc2Usc2hpcDpudW1iZXI9MCk6SW5qdXJlZERhdGF7XHJcbiAgICAgICAgbGV0IG1vbnN0ZXJEYXRhPW1vbnN0ZXJBdHREYXRhLm1vbnN0ZXJfYXR0cmlidXRlO1xyXG4gICAgICAgIGxldCBkYXRhPW5ldyBJbmp1cmVkRGF0YSgpO1xyXG4gICAgICAgIGxldCBtaXNzUmF0ZT0wOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNyaXRSYXRlPTA7XHJcbiAgICAgICAgbGV0IGRhbWFnZT0wO1xyXG4gICAgICAgIC8v5aaC5p6c5piv5pmu6YCa5pS75Ye777yM6K6h566X6Zeq6YG/5ZKM5pq05Ye777yM6buY6K6k5Li6MFxyXG4gICAgICAgIGlmKG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgIG1pc3NSYXRlPUluanVyZWREYXRhLmNhbGNNaXNzUmF0ZSh0aGlzLmF0dHJpYnV0ZV9kYXRhLk1pc3MsbW9uc3RlckRhdGEuSGl0KTtcclxuICAgICAgICAgICAgY3JpdFJhdGU9SW5qdXJlZERhdGEuY2FsY0NyaXRSYXRlKG1vbnN0ZXJEYXRhLkNyaXRpY2FsLHRoaXMuYXR0cmlidXRlX2RhdGEuQW50aUNyaXRpY2FsKTtcclxuICAgICAgICAgICAgLy/ojrflj5bkuIDkuKrmpoLnjofnsbvlnotcclxuICAgICAgICAgICAgbGV0IHR5cGU9SW5qdXJlZERhdGEuY2FsY09uY2VUeXBlKFttaXNzUmF0ZSxjcml0UmF0ZSwxXSk7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pl6rpgb9cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLlNoYW5CaTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bSgwKTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mmrTlh7tcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLkJhb0ppO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzUmVhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsQ3JpdFJlYWxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrLEluanVyZWREYXRhLmNhbGNGaW5hbEV4dHJhQ3JpdChtb25zdGVyRGF0YS5FeHRyYUNyaXRpY2FsLHRoaXMuYXR0cmlidXRlX2RhdGEuQW50aUV4dHJhQ3JpdGljYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNOb3JtYWxDcml0RGFtYWdlTnVtKG1vbnN0ZXJEYXRhLkF0dGFjayx0aGlzLmF0dHJpYnV0ZV9kYXRhLkRlZmVuc2UsbW9uc3RlckF0dERhdGEuemVuZ3NoYW5nX3JhdGUsdGhpcy5hdHRyaWJ1dGVfZGF0YS5yZWR1Y2VfaW5qdXJ5X3JhdGUsSW5qdXJlZERhdGEuY2FsY0ZpbmFsRXh0cmFDcml0KG1vbnN0ZXJEYXRhLkV4dHJhQ3JpdGljYWwsdGhpcy5hdHRyaWJ1dGVfZGF0YS5BbnRpRXh0cmFDcml0aWNhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpOyBcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRhbWFnZV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlX2NhbGxiYWNrKG1vbnN0ZXJBdHREYXRhLm1vbnN0ZXJfdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pmu6YCa5ZG95LitXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5OdWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGlzUmVhbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsUmVhbERhbWFnZU51bShtb25zdGVyRGF0YS5BdHRhY2spOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbERhbWFnZU51bShtb25zdGVyRGF0YS5BdHRhY2ssdGhpcy5hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlLG1vbnN0ZXJBdHREYXRhLnplbmdzaGFuZ19yYXRlLHRoaXMuYXR0cmlidXRlX2RhdGEucmVkdWNlX2luanVyeV9yYXRlKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZGFtYWdlX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYW1hZ2VfY2FsbGJhY2sobW9uc3RlckF0dERhdGEubW9uc3Rlcl90cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWJyZWFrOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYobW9uc3RlckF0dERhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuU2tpbGwpe1xyXG4gICAgICAgICAgICAvL+S4jemcgOimgeiuoeeul+mXqumBv++8jOaKgOiDveW/heS4rVxyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk51bGw7XHJcbiAgICAgICAgICAgIGlmKGlzUmVhbCl7XHJcbiAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY1NraWxsUmVhbERhbWFnZU51bShtb25zdGVyRGF0YS5BdHRhY2ssbW9uc3RlckF0dERhdGEuc2tpbGxfcmF0ZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbERhbWFnZU51bShtb25zdGVyRGF0YS5BdHRhY2ssbW9uc3RlckF0dERhdGEuc2tpbGxfcmF0ZSx0aGlzLmF0dHJpYnV0ZV9kYXRhLkRlZmVuc2UsbW9uc3RlckF0dERhdGEuemVuZ3NoYW5nX3JhdGUsdGhpcy5hdHRyaWJ1dGVfZGF0YS5yZWR1Y2VfaW5qdXJ5X3JhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKGRhbWFnZSk7XHJcbiAgICAgICAgfWVsc2UgaWYobW9uc3RlckF0dERhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuU2hpcCl7XHJcbiAgICAgICAgICAgIC8vIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTnVsbDtcclxuICAgICAgICAgICAgLy8gZGF0YS5zZXREYW1hZ2VOdW0oc2hpcCk7XHJcbiAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTnVsbDtcclxuICAgICAgICAgICAgaWYoaXNSZWFsKXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsUmVhbERhbWFnZU51bShtb25zdGVyRGF0YS5BdHRhY2spOyAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsRGFtYWdlTnVtKG1vbnN0ZXJEYXRhLkF0dGFjayx0aGlzLmF0dHJpYnV0ZV9kYXRhLkRlZmVuc2UsbW9uc3RlckF0dERhdGEuemVuZ3NoYW5nX3JhdGUsdGhpcy5hdHRyaWJ1dGVfZGF0YS5yZWR1Y2VfaW5qdXJ5X3JhdGUpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgLy9jYy5sb2coZGF0YS5nZXREYW1hZ2VOdW0oKSk7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrTW1tdW5pdHlTaGllbGQoMSxtb25zdGVyQXR0RGF0YS5kYW1hZ2VfdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgLy/lhYjlh4/miqTnm77nmoTlgLxcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZT10aGlzLmNoYW5nZVNoaWVsZFZhbHVlKC1kYXRhLmdldERhbWFnZU51bSgpLG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlKTtcclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMud2FsbF90eXBlPT1XYWxsVHlwZS5NYWluKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlckF0dERhdGEuc3RyZW5ndGhfdHlwZT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlckF0dERhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuU2tpbGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1vbnN0ZXJBdHREYXRhLmlzX2JpZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlQmlnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VTbWFsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/mj5DnpLrlhY3nlqtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICAvKirpgKDmiJDnnJ/lrp7kvKTlrrPvvIznm7TmjqXpgKDmiJDlr7nlupTnmoTkvKTlrrPlgLws5peg5rOV6Zeq6YG/ICovXHJcbiAgICBiZVJlYWxEYW1hZ2UoZGFtYWdlVHlwZTpEYW1hZ2VUeXBlLHN0cmVuZ3RoVHlwZTpTdHJlbmd0aFR5cGUsZGFtYWdlOm51bWJlcil7XHJcbiAgICAgICAgbGV0IGRhdGE9bmV3IEluanVyZWREYXRhKCk7XHJcbiAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTsgICAgICAgIFxyXG4gICAgICAgIGlmKGRhdGEuZ2V0RGFtYWdlTnVtKCk+MCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrTW1tdW5pdHlTaGllbGQoMSxkYW1hZ2VUeXBlKSl7XHJcbiAgICAgICAgICAgICAgICAvL+WFiOWHj+aKpOebvueahOWAvFxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMuY2hhbmdlU2hpZWxkVmFsdWUoLWRhdGEuZ2V0RGFtYWdlTnVtKCksZGFtYWdlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZih2YWx1ZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUhwKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzdHJlbmd0aFR5cGU9PVN0cmVuZ3RoVHlwZS5Cb3NzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGFtYWdlVHlwZT09RGFtYWdlVHlwZS5Ta2lsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZUJpZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihkYW1hZ2VUeXBlPT1EYW1hZ2VUeXBlLk5vcm1hbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZVNtYWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/mj5DnpLrlhY3nlqtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pS55Y+Y6KGA6YeP5YC877yM6L+U5Zue5piv5ZCm5q275LqhICovXHJcbiAgICBwdWJsaWMgY2hhbmdlSHAoaHA6bnVtYmVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGdtPUdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgaWYoZ20uY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX0xvc2UgfHwgZ20uY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1BhdXNlIHx8IGdtLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9XaW4gfHwgdGhpcy5pc19kaWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaHA8MClcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkudmlicmF0ZVNob3J0KCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC4xLHtjb2xvcjpjYy5Db2xvci5SRUR9KS50bygwLjEse2NvbG9yOmNjLkNvbG9yLldISVRFfSkuc3RhcnQoKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld0hwPXRoaXMuY3VyX2hwK2hwO1xyXG4gICAgICAgIGlmKHRoaXMuaHBfY2hhbmdlX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5ocF9jaGFuZ2VfY2FsbGJhY2soaHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zZXRIcChuZXdIcCk7XHJcbiAgICB9XHJcbiAgICAvKirml6DlsL3mqKHlvI/nmoTnq4vljbPmgaLlpI3ooYDph48gKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VIcEJ5RW5kbGVzcyhocDpudW1iZXIpe1xyXG4gICAgICAgIGxldCBuZXdIcD10aGlzLmN1cl9ocCtocDtcclxuICAgICAgICBpZih0aGlzLmhwX2NoYW5nZV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfY2hhbmdlX2NhbGxiYWNrKGhwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRIcChuZXdIcClcclxuICAgIH1cclxuICAgIC8qKui/lOWbnuaYr+WQpuatu+S6oSAqL1xyXG4gICAgcHJpdmF0ZSBzZXRIcChuZXdIcDpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAgICAgaWYobmV3SHA+dGhpcy5tYXhfaHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuZXdIcD10aGlzLm1heF9ocDtcclxuICAgICAgICB9ZWxzZSBpZihuZXdIcDw9MCl7XHJcbiAgICAgICAgICAgIG5ld0hwPTA7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfZGllPXRydWU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGllX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGllX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJfaHA9bmV3SHA7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pc190dXRvcmFpbCl7XHJcbiAgICAgICAgLy8gICAgIC8v5pWZ56iL6ZSB6KGAXHJcbiAgICAgICAgLy8gICAgIHRoaXMuY3VyX2hwPXRoaXMuZ2V0TWF4SHAoKS8yO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocDw9MDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2hvd0hwKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmhwX3Byb2dyZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5ocF9wcm9ncmVzcy5jaGFuZ2VQcm9ncmVzcyh0aGlzLmN1cl9ocC90aGlzLm1heF9ocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaHBfdGV4dCl7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfdGV4dC5zdHJpbmc9TWF0aC5mbG9vcih0aGlzLmN1cl9ocCkrJy8nK3RoaXMubWF4X2hwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmhwX3Nob3dfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmhwX3Nob3dfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF4SHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXhfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VySHAoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VySHBQZXIoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfaHAvdGhpcy5tYXhfaHA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5Liq55u+ICovXHJcbiAgICBhZGRTaGllbGQoaWQ6bnVtYmVyLHR5cGU6U2hpZWxkVHlwZSxyZW1haW5UaW1lOm51bWJlcix2YWx1ZTpudW1iZXIsZ2FtZUVmZmVjdElkOkdhbWVFZmZlY3RJZCl7XHJcbiAgICAgICAgaWYodGhpcy5tYXBfc2hpZWxkX3ZhbHVlLmhhcyhpZCkpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUuZ2V0KGlkKS5yZWZyZXNoU2hpZWxkKHJlbWFpblRpbWUsdmFsdWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgc2hpZWxkPW5ldyBjYy5Ob2RlKCkuYWRkQ29tcG9uZW50KFNoaWVsZCk7XHJcbiAgICAgICAgICAgIHNoaWVsZC5pbml0KGlkLHR5cGUscmVtYWluVGltZSx2YWx1ZSx0aGlzLm9uU2hpZWxkRGVzdHJveS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlLnNldChpZCxzaGllbGQpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoc2hpZWxkLm5vZGUpO1xyXG4gICAgICAgICAgICAvKirmt7vliqDmiqTnm77nibnmlYggKi9cclxuICAgICAgICAgICAgaWYoZ2FtZUVmZmVjdElkIT1HYW1lRWZmZWN0SWQuTnVsbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4aWFvPUdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoZ2FtZUVmZmVjdElkLGNjLnYyKDAsMCksdGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIHNoaWVsZC5zZXRHYW1lRWZmZWN0RGF0YShnYW1lRWZmZWN0SWQsdGV4aWFvKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dTaGlsZFByb2dyZXNzKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBvblNoaWVsZERlc3Ryb3koaWQ6bnVtYmVyKTogdm9pZCB7ICAgICAgICBcclxuICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUuZGVsZXRlKGlkKTtcclxuICAgICAgICB0aGlzLnNob3dTaGlsZFByb2dyZXNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pu05pS55oqk55u+5YC877yM6L+U5Zue5Lyk5a6z5rqi5Ye655qE5YC8Ki9cclxuICAgIGNoYW5nZVNoaWVsZFZhbHVlKG51bTpudW1iZXIsdHlwZTpEYW1hZ2VUeXBlKTpudW1iZXJ7XHJcbiAgICAgICAgLy/moLnmja7kvKTlrrPnsbvlnovpgY3ljoblh7rlr7nlupTnmoTmiqTnm75cclxuICAgICAgICBsZXQgc2hpZWxkQXJyPW5ldyBBcnJheTxTaGllbGQ+KCk7XHJcbiAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5nZXRJc0NhbldpdGhzdGFuZCh0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICBzaGllbGRBcnIucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5o6S5bqPXHJcbiAgICAgICAgaWYoc2hpZWxkQXJyLmxlbmd0aD49Mil7XHJcbiAgICAgICAgICAgIHNoaWVsZEFyci5zb3J0KChsZWZ0OlNoaWVsZCxyaWdodDpTaGllbGQpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdC5nZXRSZW1haW5UaW1lKCktcmlnaHQuZ2V0UmVtYWluVGltZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3VmFsdWU9bnVtO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaWVsZEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlPXNoaWVsZEFycltpXS5jaGFuZ2VTaGllbGRWYWx1ZShudW0pO1xyXG4gICAgICAgICAgICBpZihuZXdWYWx1ZT4wKXtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTtcclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNob3dTaGlsZFByb2dyZXNzKCl7XHJcbiAgICAgICAgbGV0IHZhbHVlPXRoaXMuZ2V0U2hpZWxkVmFsdWUoKTtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3M9dmFsdWUvdGhpcy5nZXRNYXhIcCgpO1xyXG4gICAgICAgIGlmKHByb2dyZXNzPjEpe1xyXG4gICAgICAgICAgICBwcm9ncmVzcz0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNoaWVsZF9wcm9ncmVzcyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkX3Byb2dyZXNzLm5vZGUuYWN0aXZlPXZhbHVlPjA7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkX3Byb2dyZXNzLnByb2dyZXNzPXByb2dyZXNzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuc2hpZWxkX3RleHQpe1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZF90ZXh0Lm5vZGUuYWN0aXZlPXZhbHVlPjA7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpZWxkX3RleHQuc3RyaW5nPXZhbHVlLnRvRml4ZWQoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuWMuemFjeaKpOebviAqL1xyXG4gICAgZ2V0U2hpZWxkVmFsdWUoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IHZhbHVlPTA7XHJcbiAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgdmFsdWUrPXYuZ2V0U2hpZWxkVmFsdWUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsU2hpZWxkKCl7XHJcbiAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgdi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKua3u+WKoOS4gOS4quWFt+acieWFjeeWq+aViOaenOeahOebviAqL1xyXG4gICAgYWRkSW1tdW5pdHlTaGllbGQoaWQ6bnVtYmVyLHR5cGU6U2hpZWxkVHlwZSxyZW1haW5UaW1lOm51bWJlcix2YWx1ZTpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMubWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZS5oYXMoaWQpKXtcclxuICAgICAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlLmdldChpZCkucmVmcmVzaFNoaWVsZChyZW1haW5UaW1lLHZhbHVlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHNoaWVsZD1uZXcgY2MuTm9kZSgpLmFkZENvbXBvbmVudChJbW11bml0eVNoaWVsZCk7XHJcbiAgICAgICAgICAgIHNoaWVsZC5pbml0KGlkLHR5cGUscmVtYWluVGltZSx2YWx1ZSwoaWQpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlLnNldChpZCxzaGllbGQpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoc2hpZWxkLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirmo4Dmn6XlhY3nlqvmiqTnm77lgLzvvIzov5Tlm57mmK/lkKbog73lhY3nlqsqL1xyXG4gICAgY2hlY2tNbW11bml0eVNoaWVsZChudW06bnVtYmVyLHR5cGU6RGFtYWdlVHlwZSk6Ym9vbGVhbntcclxuICAgICAgICAvL+agueaNruS8pOWus+exu+Wei+mBjeWOhuWHuuWvueW6lOeahOaKpOebvlxyXG4gICAgICAgIGxldCBzaGllbGRBcnI9bmV3IEFycmF5PEltbXVuaXR5U2hpZWxkPigpO1xyXG4gICAgICAgIHRoaXMubWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZS5mb3JFYWNoKCh2LGspPT57ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHYuZ2V0SXNDYW5XaXRoc3RhbmQodHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgc2hpZWxkQXJyLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+aOkuW6j1xyXG4gICAgICAgIGlmKHNoaWVsZEFyci5sZW5ndGg+PTIpe1xyXG4gICAgICAgICAgICBzaGllbGRBcnIuc29ydCgobGVmdDpJbW11bml0eVNoaWVsZCxyaWdodDpJbW11bml0eVNoaWVsZCk9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0LmdldFJlbWFpblRpbWUoKS1yaWdodC5nZXRSZW1haW5UaW1lKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXdWYWx1ZT1udW07XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8c2hpZWxkQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbmV3VmFsdWU9c2hpZWxkQXJyW2ldLmNoYW5nZVNoaWVsZFZhbHVlKG51bSk7XHJcbiAgICAgICAgICAgIGlmKG5ld1ZhbHVlPjApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgYWRkSHBCdWZmKCk6dm9pZHtcclxuICAgICAgICBsZXQgcG9zPWNjLnYyKE1hdGgucmFuZG9tKCkqMTAwLTUwLE1hdGgucmFuZG9tKCkqNTAtMjUpO1xyXG4gICAgICAgIEdhbWVFZmZlY3RzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RGb3JQYXJlbnQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdCxwb3MsdGhpcy5ub2RlKTtcclxuICAgIH1cclxuICAgIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLUJVRkYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuICAgIGFkZEJ1ZmYoYnVmZkRhdGE6QnVmZkRhdGEpOiBCdWZmVGltZXIge1xyXG4gICAgICAgIGxldCBidWZmSWQ9YnVmZkRhdGEuYnVmZl9pZDtcclxuICAgICAgICBpZighdGhpcy5pc0hhdmVCdWZmKGJ1ZmZJZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlPW5ldyBjYy5Ob2RlKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjpCdWZmVGltZXI9bm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYoIWJ1ZmYpe1xyXG4gICAgICAgICAgICAgICAgYnVmZj1ub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkJ1ZmZEZXN0b3J5LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAvL2J1Zmbmsrvnlpfop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEucmVjb3ZlcnlfamlhbmdlX3RpbWU+MCl7XHJcbiAgICAgICAgICAgICAgICBidWZmLmFkZFJlY292ZXJ5TGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb1JlY292ZXJ5OihudW06bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUhwKG51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb3M9Y2MudjIoTWF0aC5yYW5kb20oKSo2MDAtMzAwLHRoaXMubm9kZS55K01hdGgucmFuZG9tKCkqMjAwLTEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuaHBfdGV4dF9tYW5hZ2VyLmNyZWF0ZUhwVGV4dEhwKHBvcyxudW0sRW5lbXlfSW5qdXJlZF9UeXBlLlpoaUxpYW8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTa3lNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlR2FtZUVmZmVjdEJ5SWQoR2FtZUVmZmVjdElkLm1vbnN0ZXJfemhpbGlhb19oYWxvX2hpdCxwb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sYnVmZi5nZXRGaXJzdEJ1ZmZWYWx1ZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLndhbGxfYnVmZi5zZXQoYnVmZkRhdGEuYnVmZl9pZCxidWZmKTtcclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZJZCl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9KaWFYdWVKaWFuU2hhbmc6e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlX2RhdGEucmVkdWNlX2luanVyeV9yYXRlKz1idWZmRGF0YS5idWZmX3ZhbHVlWzFdO1xyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQnVmZlN0YXRlKGJ1ZmZJZCxidWZmRGF0YS5yZW1haW5fdGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgYnVmZj10aGlzLndhbGxfYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICAgICAgYnVmZi5yZWZyZXNoQnVmZihidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQnVmZlN0YXRlKGJ1ZmZJZCxidWZmRGF0YS5yZW1haW5fdGltZSk7ICBcclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmY7ICAgICAgICAgXHJcbiAgICAgICAgfSAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzdWJCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY9dGhpcy53YWxsX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYoYnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ1ZmZEZXN0b3J5KGJ1ZmZEYXRhOkJ1ZmZEYXRhKXtcclxuICAgICAgICB0aGlzLndhbGxfYnVmZi5kZWxldGUoYnVmZkRhdGEuYnVmZl9pZCk7XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZEYXRhLmJ1ZmZfaWQpeyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgQnVmZklkLkhlcm9fWmhlbkRlX0ppYVh1ZUppYW5TaGFuZzp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZV9kYXRhLnJlZHVjZV9pbmp1cnlfcmF0ZS09YnVmZkRhdGEuYnVmZl92YWx1ZVsxXTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0hhdmVCdWZmKGJ1ZmY6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxfYnVmZi5oYXMoYnVmZik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsQnVmZigpe1xyXG4gICAgICAgIHRoaXMud2FsbF9idWZmLmZvckVhY2goKGJ1ZmY6QnVmZlRpbWVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN1YkJ1ZmYoYnVmZi5nZXRCdWZmSWQoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKpidWZm54q25oCB5Zu+5qCHICovXHJcbiAgICBhZGRCdWZmU3RhdGUoYnVmZklkOkJ1ZmZJZCxyZW1haW5UaW1lOm51bWJlcil7XHJcbiAgICAgICAgbGV0IHR5cGVzPUJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRCdWZmVHlwZShidWZmSWQpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHR5cGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHR5cGU9dHlwZXNbaV07XHJcbiAgICAgICAgICAgIGlmKHRoaXMubWFwX2J1ZmZfc3RhdGUuaGFzKHR5cGUpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuZ2V0KHR5cGUpLnJlZnJlc2hUaW1lKHJlbWFpblRpbWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBiZlN0YXRlPUJ1ZmZTdGF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVCdWZmU3RhdGUodHlwZSxIZXJvX1R5cGUuSGVyb19OdW0pO1xyXG4gICAgICAgICAgICAgICAgYmZTdGF0ZS5pbml0KHR5cGUscmVtYWluVGltZSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwX2J1ZmZfc3RhdGUuZGVsZXRlKHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLnNldCh0eXBlLGJmU3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm5vZGUuYWRkQ2hpbGQoc2hpZWxkLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEJ1ZmZUeXBlKGJ1ZmZJZDpCdWZmSWQpOkJ1ZmZTdGF0ZVR5cGVbXXtcclxuICAgICAgICBsZXQgdHlwZT1bXTtcclxuICAgICAgICBzd2l0Y2goYnVmZklkKXtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0eXBlOyAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGFkZERlQnVmZihidWZmRGF0YTpCdWZmRGF0YSxtb25zdGVyQXR0RGF0YTpNb25zdGVyQXR0RGF0YSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmSWQ9YnVmZkRhdGEuYnVmZl9pZDtcclxuICAgICAgICBpZighdGhpcy5pc0hhdmVEZUJ1ZmYoYnVmZklkKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZuiKgueCueWSjOeJueaViCAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5vZGU9bmV3IGNjLk5vZGUoYnVmZkRhdGEuZ2FtZV9lZmZlY3RfaWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgLy/mt7vliqBidWZmXHJcbiAgICAgICAgICAgIGxldCBidWZmOkJ1ZmZUaW1lcj1ub2RlLmdldENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICBpZighYnVmZil7XHJcbiAgICAgICAgICAgICAgICBidWZmPW5vZGUuYWRkQ29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnVmZi5pbml0KGJ1ZmZEYXRhKTtcclxuICAgICAgICAgICAgLy9idWZm6ZSA5q+B5pe25aSE55CGXHJcbiAgICAgICAgICAgIGJ1ZmYuYWRkRGVzdHJveUxpc3Rlbih0aGlzLm9uRGVCdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy53YWxsX2RlX2J1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsYnVmZik7XHJcbiAgICAgICAgICAgIC8vYnVmZuS8pOWus+inpuWPkeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBpZihidWZmRGF0YS5kYW1hZ2VfamlhbmdlX3RpbWU+MCYmbW9uc3RlckF0dERhdGEpe1xyXG4gICAgICAgICAgICAgICAgYnVmZi5hZGREYW1hZ2VMaXN0ZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvRGFtYWdlOihtb25zdGVyQXR0RGF0YTpNb25zdGVyQXR0RGF0YSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9uc3RlckF0dERhdGEuaXNfYmlnPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlSW5qdXJlZChtb25zdGVyQXR0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxtb25zdGVyQXR0RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGJ1ZmZJZCl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy53YWxsX2RlX2J1ZmYuZ2V0KGJ1ZmZJZCkucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpOyAgICAgICAgIFxyXG4gICAgICAgIH0gIFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzdWJEZUJ1ZmYoYnVmZklkOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZj10aGlzLndhbGxfZGVfYnVmZi5nZXQoYnVmZklkKTtcclxuICAgICAgICBpZihidWZmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZi5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVCdWZmRGVzdG9yeShidWZmRGF0YTpCdWZmRGF0YSl7XHJcbiAgICAgICAgdGhpcy53YWxsX2RlX2J1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlRGVCdWZmKGJ1ZmY6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxfZGVfYnVmZi5oYXMoYnVmZik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlQWxsRGVCdWZmKCl7XHJcbiAgICAgICAgdGhpcy53YWxsX2RlX2J1ZmYuZm9yRWFjaCgoYnVmZjpCdWZmVGltZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc3ViRGVCdWZmKGJ1ZmYuZ2V0QnVmZklkKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVdhbGwoKXtcclxuICAgICAgICBpZih0aGlzLmRpZV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZGllX2NhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=