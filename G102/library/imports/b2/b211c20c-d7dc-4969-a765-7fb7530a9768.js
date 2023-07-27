"use strict";
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