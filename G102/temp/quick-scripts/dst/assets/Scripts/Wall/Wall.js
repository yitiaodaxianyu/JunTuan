
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
                var texiao = SkyManager_1.default.getInstance().createGameEffectById(gameEffectId, this.node.getPosition());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2FsbFxcV2FsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBZ0Q7QUFDaEQsb0RBQTBEO0FBQzFELDZEQUF3RDtBQUN4RCxpRUFBMEQ7QUFDMUQsaURBQTRDO0FBQzVDLDhDQUF5QztBQUd6QyxvREFBK0M7QUFDL0Msc0RBQWtIO0FBR2xILHNEQUFpRztBQUNqRywwQ0FBcUM7QUFDckMsbURBQThDO0FBQzlDLG1DQUE4QjtBQUM5QiwyQ0FBd0M7QUFHbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFrbEJDO1FBamxCRyxVQUFVO1FBQ0Esb0JBQWMsR0FBZSxJQUFJLENBQUM7UUFDNUMsVUFBVTtRQUNBLGVBQVMsR0FBVSxxQkFBUSxDQUFDLElBQUksQ0FBQztRQUMzQyxNQUFNO1FBQ0ksWUFBTSxHQUFRLElBQUksQ0FBQztRQUM3QixVQUFVO1FBQ0EsWUFBTSxHQUFRLElBQUksQ0FBQztRQUNuQixpQkFBVyxHQUFlLElBQUksQ0FBQztRQUMvQixxQkFBZSxHQUFnQixJQUFJLENBQUM7UUFDcEMsYUFBTyxHQUFVLElBQUksQ0FBQztRQUN0QixpQkFBVyxHQUFVLElBQUksQ0FBQztRQUNwQyxVQUFVO1FBQ0EsZUFBUyxHQUF3QixJQUFJLENBQUM7UUFDaEQsVUFBVTtRQUNBLGtCQUFZLEdBQXdCLElBQUksQ0FBQztRQUNuRCxZQUFZO1FBQ0Ysb0JBQWMsR0FBdUIsSUFBSSxDQUFDO1FBQ3BELFFBQVE7UUFDRSxzQkFBZ0IsR0FBb0IsSUFBSSxDQUFDO1FBQ25ELFVBQVU7UUFDQSwrQkFBeUIsR0FBNEIsSUFBSSxDQUFDO1FBRXBFLFlBQVk7UUFDSixrQkFBWSxHQUFVLElBQUksQ0FBQztRQUNuQyxlQUFlO1FBQ1As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LFdBQVcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsOEJBQWUsR0FBZixVQUFnQixRQUFpQjtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsUUFBTyxRQUFRLENBQUMsT0FBTyxFQUFDO1NBRXZCO0lBQ0wsQ0FBQztJQUVELDJCQUFZLEdBQVosVUFBYSxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELDhCQUFlLEdBQWY7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBYztZQUNyQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDBCQUFXLEdBQVg7UUFDSSxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQWhsQmdCLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FrbEJ4QjtJQUFELFdBQUM7Q0FsbEJELEFBa2xCQyxDQWxsQmlDLEVBQUUsQ0FBQyxTQUFTLEdBa2xCN0M7a0JBbGxCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSwgSmlhU3UgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEVuZW15X0luanVyZWRfVHlwZSB9IGZyb20gXCIuLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgQnVmZlN0YXRlTWFuYWdlciBmcm9tIFwiLi4vR2FtZS9CdWZmU3RhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVFZmZlY3RJZCB9IGZyb20gXCIuLi9HYW1lL0dhbWVFZmZlY3RzTWFuYWdlclwiO1xyXG5pbXBvcnQgU2t5TWFuYWdlciBmcm9tIFwiLi4vR2FtZS9Ta3lNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgQnVmZkRhdGEgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZEYXRhXCI7XHJcbmltcG9ydCBCdWZmU3RhdGUgZnJvbSBcIi4uL0hlcm8vR2FtZS9CdWZmU3RhdGVcIjtcclxuaW1wb3J0IEJ1ZmZUaW1lciBmcm9tIFwiLi4vSGVyby9HYW1lL0J1ZmZUaW1lclwiO1xyXG5pbXBvcnQgeyBBdHRyaWJ1dGVEYXRhLCBCdWZmSWQsIEJ1ZmZTdGF0ZVR5cGUsIERhbWFnZVR5cGUsIEhlcm9fVHlwZSwgU2hpZWxkVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSHBQcm9ncmVzc0JhciBmcm9tIFwiLi4vTW9uc3Rlci9IcFByb2dyZXNzQmFyXCI7XHJcbmltcG9ydCBNb25zdGVyIGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuaW1wb3J0IHsgTW9uc3RlckF0dERhdGEsIEluanVyZWREYXRhLCBGZWVkQmFja1R5cGUsIFN0cmVuZ3RoVHlwZSB9IGZyb20gXCIuLi9Nb25zdGVyL01vbnN0ZXJEYXRhXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgSW1tdW5pdHlTaGllbGQgZnJvbSBcIi4vSW1tdW5pdHlTaGllbGRcIjtcclxuaW1wb3J0IFNoaWVsZCBmcm9tIFwiLi9TaGllbGRcIjtcclxuaW1wb3J0IHsgV2FsbFR5cGUgfSBmcm9tIFwiLi9XYWxsQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYWxsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8qKuWxnuaAp+aVsOaNriAqL1xyXG4gICAgcHJvdGVjdGVkIGF0dHJpYnV0ZV9kYXRhOkF0dHJpYnV0ZURhdGE9bnVsbDtcclxuICAgIC8qKuWfjuWimeexu+WeiyAqL1xyXG4gICAgcHJvdGVjdGVkIHdhbGxfdHlwZTpXYWxsVHlwZT1XYWxsVHlwZS5NYWluOyAgICBcclxuICAgIC8v5b2T5YmN6KGA6YePXHJcbiAgICBwcm90ZWN0ZWQgY3VyX2hwOm51bWJlcj0xMDAwO1xyXG4gICAgLyoq5pyA5aSn6KGA6YePICovXHJcbiAgICBwcm90ZWN0ZWQgbWF4X2hwOm51bWJlcj0xMDAwO1xyXG4gICAgcHJvdGVjdGVkIGhwX3Byb2dyZXNzOkhwUHJvZ3Jlc3NCYXI9bnVsbDtcclxuICAgIHByb3RlY3RlZCBzaGllbGRfcHJvZ3Jlc3M6Y2MuUHJvZ3Jlc3NCYXI9bnVsbDtcclxuICAgIHByb3RlY3RlZCBocF90ZXh0OmNjLkxhYmVsPW51bGw7XHJcbiAgICBwcm90ZWN0ZWQgc2hpZWxkX3RleHQ6Y2MuTGFiZWw9bnVsbDtcclxuICAgIC8qQlVGRiogKi9cclxuICAgIHByb3RlY3RlZCB3YWxsX2J1ZmY6IE1hcDxCdWZmSWQsQnVmZlRpbWVyPj1udWxsO1xyXG4gICAgLypCVUZGKiAqL1xyXG4gICAgcHJvdGVjdGVkIHdhbGxfZGVfYnVmZjogTWFwPEJ1ZmZJZCxCdWZmVGltZXI+PW51bGw7XHJcbiAgICAvKipidWZm54q25oCBICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwX2J1ZmZfc3RhdGU6TWFwPG51bWJlcixCdWZmU3RhdGU+PW51bGw7XHJcbiAgICAvKirmiqTnm74gKi9cclxuICAgIHByb3RlY3RlZCBtYXBfc2hpZWxkX3ZhbHVlOk1hcDxudW1iZXIsU2hpZWxkPj1udWxsO1xyXG4gICAgLyoq5YWN55ar5oqk55u+ICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZTpNYXA8bnVtYmVyLEltbXVuaXR5U2hpZWxkPj1udWxsO1xyXG5cclxuICAgIC8qKuWfjuWimeatu+S6oeebkeWQrCAqL1xyXG4gICAgcHJpdmF0ZSBkaWVfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuihgOadoeWPkeeUn+aUueWPmOeahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBocF9jaGFuZ2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIC8qKuihgOadoeaYvuekuuaXtueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBocF9zaG93X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirooYDmnaHmmL7npLrml7bnmoTlm57osIMgKi9cclxuICAgIHByaXZhdGUgZGFtYWdlX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICAvKirln47lopnnmoTnn6nlvaIgKi9cclxuICAgIHByaXZhdGUgd2FsbF9yZWN0OmNjLlJlY3Q9bnVsbDtcclxuICAgIC8qKuWfjuWimeeahOacgOmrmFnovbTlnZDmoIcgKi9cclxuICAgIHByaXZhdGUgd2FsbF9tYXhfeXk6bnVtYmVyPTA7XHJcbiAgICAvKirmmK/lkKbmrbvkuqHkuoYgKi9cclxuICAgIGlzX2RpZTpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIGlzX3R1dG9yYWlsOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Z+O5aKZ5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gYXR0cmlidXRlRGF0YSDlsZ7mgKfmlbDmja5cclxuICAgICAqIEBwYXJhbSB3YWxsVHlwZSDln47lopnnmoTnsbvlnotcclxuICAgICAqL1xyXG4gICAgaW5pdFdhbGwoYXR0cmlidXRlRGF0YTpBdHRyaWJ1dGVEYXRhLHdhbGxUeXBlOldhbGxUeXBlKSB7XHJcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVfZGF0YT1hdHRyaWJ1dGVEYXRhO1xyXG4gICAgICAgIHRoaXMud2FsbF90eXBlPXdhbGxUeXBlO1xyXG4gICAgICAgIHRoaXMuaXNfZGllPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3VyX2hwPXRoaXMubWF4X2hwPWF0dHJpYnV0ZURhdGEuSGVhbHRoPU1hdGgucm91bmQoYXR0cmlidXRlRGF0YS5IZWFsdGgpO1xyXG4gICAgICAgIGlmKCF0aGlzLm1hcF9zaGllbGRfdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWU9bmV3IE1hcDxudW1iZXIsU2hpZWxkPigpO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUpe1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWU9bmV3IE1hcDxudW1iZXIsSW1tdW5pdHlTaGllbGQ+KCk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMud2FsbF9idWZmKXtcclxuICAgICAgICAgICAgdGhpcy53YWxsX2J1ZmY9bmV3IE1hcDxCdWZmSWQsQnVmZlRpbWVyPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy53YWxsX2RlX2J1ZmYpe1xyXG4gICAgICAgICAgICB0aGlzLndhbGxfZGVfYnVmZj1uZXcgTWFwPEJ1ZmZJZCxCdWZmVGltZXI+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsQnVmZigpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsRGVCdWZmKCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxTaGllbGQoKTtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgICAgIHRoaXMuc2hvd1NoaWxkUHJvZ3Jlc3MoKTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hXYWxsRGF0YShhdHRyaWJ1dGVEYXRhOkF0dHJpYnV0ZURhdGEpe1xyXG4gICAgICAgIHRoaXMuYXR0cmlidXRlX2RhdGE9YXR0cmlidXRlRGF0YTtcclxuICAgICAgICB0aGlzLm1heF9ocD1hdHRyaWJ1dGVEYXRhLkhlYWx0aD1NYXRoLnJvdW5kKGF0dHJpYnV0ZURhdGEuSGVhbHRoKTtcclxuICAgICAgICB0aGlzLnNob3dIcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEF0dHJpYnV0ZURhdGEoKTpBdHRyaWJ1dGVEYXRhe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZV9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruWfjuWimeatu+S6oeeahOebkeWQrCAqL1xyXG4gICAgc2V0V2FsbERpZUxpc3RlbihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5kaWVfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7ln47lopnooYDph4/lj5HnlJ/mlLnlj5jml7bnmoTnm5HlkKwgKi9cclxuICAgIHNldEhwQ2hhbmdlTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmhwX2NoYW5nZV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIC8qKuiuvue9ruWfjuWimeihgOmHj+aYvuekuuaXtueahOebkeWQrCAqL1xyXG4gICAgc2V0SHBTaG93TGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmhwX3Nob3dfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7ln47lopnlj5fkvKTml7bnmoTnm5HlkKwgKi9cclxuICAgIHNldERhbWFnZUxpc3RlbihjYWxsYmFjazpGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICAvKirorr7nva7ln47lopnnmoTnn6nlvaIgKi9cclxuICAgIHByb3RlY3RlZCBzZXRXYWxsUmVjdChyZWN0OmNjLlJlY3Qpe1xyXG4gICAgICAgIHRoaXMud2FsbF9yZWN0PXJlY3Q7XHJcbiAgICAgICAgdGhpcy53YWxsX21heF95eT1yZWN0LnlNYXg7XHJcbiAgICB9XHJcbiAgICAvKirojrflj5bln47lopnnmoTnn6nlvaIgKi9cclxuICAgIHB1YmxpYyBnZXRXYWxsUmVjdCgpOmNjLlJlY3R7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2FsbF9yZWN0O1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5Z+O5aKZ55qE5pyA6auY54K5ICovXHJcbiAgICBwdWJsaWMgZ2V0V2FsbE1heFlZKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLndhbGxfbWF4X3l5O1xyXG4gICAgfVxyXG4gICAgLyoq6I635Y+W5Z+O5aKZ55qE57G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0V2FsbFR5cGUoKTpXYWxsVHlwZXtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxsX3R5cGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWfjuWimeWPl+S8pOiuoeeul1xyXG4gICAgICogQHBhcmFtIGRhbWFnZSDkvKTlrrPlgLxcclxuICAgICAqIEBwYXJhbSBkYW1hZ2VUeXBlIOS8pOWus+exu+Wei1xyXG4gICAgICogQHBhcmFtIHN0cmVuZ3RoVHlwZSDmgKrniannsbvlnotcclxuICAgICAqIEBwYXJhbSBtb25zdGVyRGF0YSDmgKrnianmlbDmja5cclxuICAgICAqIEBwYXJhbSBpc1JlYWwg5piv5ZCm55yf5a6e5Lyk5a6zXHJcbiAgICAgKiBAcGFyYW0gc2hpcCDoiLnmkp7nmoTml7blgJnnmoTkvKTlrrNcclxuICAgICAqL1xyXG4gICAgYmVJbmp1cmVkKG1vbnN0ZXJBdHREYXRhOk1vbnN0ZXJBdHREYXRhLGlzUmVhbDpib29sZWFuPWZhbHNlLHNoaXA6bnVtYmVyPTApOkluanVyZWREYXRhe1xyXG4gICAgICAgIGxldCBtb25zdGVyRGF0YT1tb25zdGVyQXR0RGF0YS5tb25zdGVyX2F0dHJpYnV0ZTtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICBsZXQgbWlzc1JhdGU9MDsgICAgICAgIFxyXG4gICAgICAgIGxldCBjcml0UmF0ZT0wO1xyXG4gICAgICAgIGxldCBkYW1hZ2U9MDtcclxuICAgICAgICAvL+WmguaenOaYr+aZrumAmuaUu+WHu++8jOiuoeeul+mXqumBv+WSjOaatOWHu++8jOm7mOiupOS4ujBcclxuICAgICAgICBpZihtb25zdGVyQXR0RGF0YS5kYW1hZ2VfdHlwZT09RGFtYWdlVHlwZS5Ob3JtYWwpe1xyXG4gICAgICAgICAgICBtaXNzUmF0ZT1Jbmp1cmVkRGF0YS5jYWxjTWlzc1JhdGUodGhpcy5hdHRyaWJ1dGVfZGF0YS5NaXNzLG1vbnN0ZXJEYXRhLkhpdCk7XHJcbiAgICAgICAgICAgIGNyaXRSYXRlPUluanVyZWREYXRhLmNhbGNDcml0UmF0ZShtb25zdGVyRGF0YS5Dcml0aWNhbCx0aGlzLmF0dHJpYnV0ZV9kYXRhLkFudGlDcml0aWNhbCk7XHJcbiAgICAgICAgICAgIC8v6I635Y+W5LiA5Liq5qaC546H57G75Z6LXHJcbiAgICAgICAgICAgIGxldCB0eXBlPUluanVyZWREYXRhLmNhbGNPbmNlVHlwZShbbWlzc1JhdGUsY3JpdFJhdGUsMV0pO1xyXG4gICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6Zeq6YG/XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5TaGFuQmk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oMCk7XHJcbiAgICAgICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pq05Ye7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5CYW9KaTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1JlYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbENyaXRSZWFsRGFtYWdlTnVtKG1vbnN0ZXJEYXRhLkF0dGFjayxJbmp1cmVkRGF0YS5jYWxjRmluYWxFeHRyYUNyaXQobW9uc3RlckRhdGEuRXh0cmFDcml0aWNhbCx0aGlzLmF0dHJpYnV0ZV9kYXRhLkFudGlFeHRyYUNyaXRpY2FsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjTm9ybWFsQ3JpdERhbWFnZU51bShtb25zdGVyRGF0YS5BdHRhY2ssdGhpcy5hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlLG1vbnN0ZXJBdHREYXRhLnplbmdzaGFuZ19yYXRlLHRoaXMuYXR0cmlidXRlX2RhdGEucmVkdWNlX2luanVyeV9yYXRlLEluanVyZWREYXRhLmNhbGNGaW5hbEV4dHJhQ3JpdChtb25zdGVyRGF0YS5FeHRyYUNyaXRpY2FsLHRoaXMuYXR0cmlidXRlX2RhdGEuQW50aUV4dHJhQ3JpdGljYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5kYW1hZ2VfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhbWFnZV9jYWxsYmFjayhtb25zdGVyQXR0RGF0YS5tb25zdGVyX3RzKTtcclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOntcclxuICAgICAgICAgICAgICAgICAgICAvL+aZrumAmuWRveS4rVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmVlZGJhY2tfdHlwZT1GZWVkQmFja1R5cGUuTnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZihpc1JlYWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYW1hZ2U9SW5qdXJlZERhdGEuY2FsY05vcm1hbFJlYWxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrKTsgICBcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNOb3JtYWxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrLHRoaXMuYXR0cmlidXRlX2RhdGEuRGVmZW5zZSxtb25zdGVyQXR0RGF0YS56ZW5nc2hhbmdfcmF0ZSx0aGlzLmF0dHJpYnV0ZV9kYXRhLnJlZHVjZV9pbmp1cnlfcmF0ZSk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXREYW1hZ2VOdW0oZGFtYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRhbWFnZV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGFtYWdlX2NhbGxiYWNrKG1vbnN0ZXJBdHREYXRhLm1vbnN0ZXJfdHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1icmVhazsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmKG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLlNraWxsKXtcclxuICAgICAgICAgICAgLy/kuI3pnIDopoHorqHnrpfpl6rpgb/vvIzmioDog73lv4XkuK1cclxuICAgICAgICAgICAgZGF0YS5mZWVkYmFja190eXBlPUZlZWRCYWNrVHlwZS5OdWxsO1xyXG4gICAgICAgICAgICBpZihpc1JlYWwpe1xyXG4gICAgICAgICAgICAgICAgZGFtYWdlPUluanVyZWREYXRhLmNhbGNTa2lsbFJlYWxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrLG1vbnN0ZXJBdHREYXRhLnNraWxsX3JhdGUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGRhbWFnZT1Jbmp1cmVkRGF0YS5jYWxjU2tpbGxEYW1hZ2VOdW0obW9uc3RlckRhdGEuQXR0YWNrLG1vbnN0ZXJBdHREYXRhLnNraWxsX3JhdGUsdGhpcy5hdHRyaWJ1dGVfZGF0YS5EZWZlbnNlLG1vbnN0ZXJBdHREYXRhLnplbmdzaGFuZ19yYXRlLHRoaXMuYXR0cmlidXRlX2RhdGEucmVkdWNlX2luanVyeV9yYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpO1xyXG4gICAgICAgIH1lbHNlIGlmKG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlPT1EYW1hZ2VUeXBlLlNoaXApe1xyXG4gICAgICAgICAgICBkYXRhLmZlZWRiYWNrX3R5cGU9RmVlZEJhY2tUeXBlLk51bGw7XHJcbiAgICAgICAgICAgIGRhdGEuc2V0RGFtYWdlTnVtKHNoaXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhLmdldERhbWFnZU51bSgpPjApe1xyXG4gICAgICAgICAgICAvL2NjLmxvZyhkYXRhLmdldERhbWFnZU51bSgpKTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuY2hlY2tNbW11bml0eVNoaWVsZCgxLG1vbnN0ZXJBdHREYXRhLmRhbWFnZV90eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAvL+WFiOWHj+aKpOebvueahOWAvFxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlPXRoaXMuY2hhbmdlU2hpZWxkVmFsdWUoLWRhdGEuZ2V0RGFtYWdlTnVtKCksbW9uc3RlckF0dERhdGEuZGFtYWdlX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYodmFsdWU8MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIcCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy53YWxsX3R5cGU9PVdhbGxUeXBlLk1haW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyQXR0RGF0YS5zdHJlbmd0aF90eXBlPT1TdHJlbmd0aFR5cGUuQm9zcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtb25zdGVyQXR0RGF0YS5kYW1hZ2VfdHlwZT09RGFtYWdlVHlwZS5Ta2lsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobW9uc3RlckF0dERhdGEuaXNfYmlnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VCaWcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTXlUb29sLnJhbmRvbVNjZW5lU2hha2VTbWFsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYobW9uc3RlckF0dERhdGEuZGFtYWdlX3R5cGU9PURhbWFnZVR5cGUuTm9ybWFsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNeVRvb2wucmFuZG9tU2NlbmVTaGFrZVNtYWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+aPkOekuuWFjeeWq1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuICAgIC8qKumAoOaIkOecn+WunuS8pOWus++8jOebtOaOpemAoOaIkOWvueW6lOeahOS8pOWus+WAvCzml6Dms5Xpl6rpgb8gKi9cclxuICAgIGJlUmVhbERhbWFnZShkYW1hZ2VUeXBlOkRhbWFnZVR5cGUsc3RyZW5ndGhUeXBlOlN0cmVuZ3RoVHlwZSxkYW1hZ2U6bnVtYmVyKXtcclxuICAgICAgICBsZXQgZGF0YT1uZXcgSW5qdXJlZERhdGEoKTtcclxuICAgICAgICBkYXRhLnNldERhbWFnZU51bShkYW1hZ2UpOyAgICAgICAgXHJcbiAgICAgICAgaWYoZGF0YS5nZXREYW1hZ2VOdW0oKT4wKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuY2hlY2tNbW11bml0eVNoaWVsZCgxLGRhbWFnZVR5cGUpKXtcclxuICAgICAgICAgICAgICAgIC8v5YWI5YeP5oqk55u+55qE5YC8XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWU9dGhpcy5jaGFuZ2VTaGllbGRWYWx1ZSgtZGF0YS5nZXREYW1hZ2VOdW0oKSxkYW1hZ2VUeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlPDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlSHAodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHN0cmVuZ3RoVHlwZT09U3RyZW5ndGhUeXBlLkJvc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYW1hZ2VUeXBlPT1EYW1hZ2VUeXBlLlNraWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlQmlnKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGRhbWFnZVR5cGU9PURhbWFnZVR5cGUuTm9ybWFsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE15VG9vbC5yYW5kb21TY2VuZVNoYWtlU21hbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL+aPkOekuuWFjeeWq1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmlLnlj5jooYDph4/lgLzvvIzov5Tlm57mmK/lkKbmrbvkuqEgKi9cclxuICAgIHB1YmxpYyBjaGFuZ2VIcChocDpudW1iZXIpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgZ209R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBpZihnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfTG9zZSB8fCBnbS5jdXJfZ2FtZV9zdGF0ZT09R2FtZVN0YXRlLkdhbWVfUGF1c2UgfHwgZ20uY3VyX2dhbWVfc3RhdGU9PUdhbWVTdGF0ZS5HYW1lX1dpbiB8fCB0aGlzLmlzX2RpZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihocDwwKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjEse2NvbG9yOmNjLkNvbG9yLlJFRH0pLnRvKDAuMSx7Y29sb3I6Y2MuQ29sb3IuV0hJVEV9KS5zdGFydCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3SHA9dGhpcy5jdXJfaHAraHA7XHJcbiAgICAgICAgaWYodGhpcy5ocF9jaGFuZ2VfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmhwX2NoYW5nZV9jYWxsYmFjayhocCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNldEhwKG5ld0hwKTtcclxuICAgIH1cclxuICAgIC8qKuaXoOWwveaooeW8j+eahOeri+WNs+aBouWkjeihgOmHjyAqL1xyXG4gICAgcHVibGljIGNoYW5nZUhwQnlFbmRsZXNzKGhwOm51bWJlcil7XHJcbiAgICAgICAgbGV0IG5ld0hwPXRoaXMuY3VyX2hwK2hwO1xyXG4gICAgICAgIGlmKHRoaXMuaHBfY2hhbmdlX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5ocF9jaGFuZ2VfY2FsbGJhY2soaHApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEhwKG5ld0hwKVxyXG4gICAgfVxyXG4gICAgLyoq6L+U5Zue5piv5ZCm5q275LqhICovXHJcbiAgICBwcml2YXRlIHNldEhwKG5ld0hwOm51bWJlcik6Ym9vbGVhbntcclxuICAgICAgICBpZihuZXdIcD50aGlzLm1heF9ocClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5ld0hwPXRoaXMubWF4X2hwO1xyXG4gICAgICAgIH1lbHNlIGlmKG5ld0hwPD0wKXtcclxuICAgICAgICAgICAgbmV3SHA9MDtcclxuICAgICAgICAgICAgdGhpcy5pc19kaWU9dHJ1ZTtcclxuICAgICAgICAgICAgaWYodGhpcy5kaWVfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWVfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cl9ocD1uZXdIcDtcclxuICAgICAgICAvLyBpZih0aGlzLmlzX3R1dG9yYWlsKXtcclxuICAgICAgICAvLyAgICAgLy/mlZnnqIvplIHooYBcclxuICAgICAgICAvLyAgICAgdGhpcy5jdXJfaHA9dGhpcy5nZXRNYXhIcCgpLzI7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX2hwPD0wO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93SHAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaHBfcHJvZ3Jlc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmhwX3Byb2dyZXNzLmNoYW5nZVByb2dyZXNzKHRoaXMuY3VyX2hwL3RoaXMubWF4X2hwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5ocF90ZXh0KXtcclxuICAgICAgICAgICAgdGhpcy5ocF90ZXh0LnN0cmluZz1NYXRoLmZsb29yKHRoaXMuY3VyX2hwKSsnLycrdGhpcy5tYXhfaHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaHBfc2hvd19jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuaHBfc2hvd19jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNYXhIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJIcCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJIcFBlcigpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9ocC90aGlzLm1heF9ocDtcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKrnm74gKi9cclxuICAgIGFkZFNoaWVsZChpZDpudW1iZXIsdHlwZTpTaGllbGRUeXBlLHJlbWFpblRpbWU6bnVtYmVyLHZhbHVlOm51bWJlcixnYW1lRWZmZWN0SWQ6R2FtZUVmZmVjdElkKXtcclxuICAgICAgICBpZih0aGlzLm1hcF9zaGllbGRfdmFsdWUuaGFzKGlkKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZS5nZXQoaWQpLnJlZnJlc2hTaGllbGQocmVtYWluVGltZSx2YWx1ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBzaGllbGQ9bmV3IGNjLk5vZGUoKS5hZGRDb21wb25lbnQoU2hpZWxkKTtcclxuICAgICAgICAgICAgc2hpZWxkLmluaXQoaWQsdHlwZSxyZW1haW5UaW1lLHZhbHVlLHRoaXMub25TaGllbGREZXN0cm95LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcF9zaGllbGRfdmFsdWUuc2V0KGlkLHNoaWVsZCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzaGllbGQubm9kZSk7XHJcbiAgICAgICAgICAgIC8qKua3u+WKoOaKpOebvueJueaViCAqL1xyXG4gICAgICAgICAgICBpZihnYW1lRWZmZWN0SWQhPUdhbWVFZmZlY3RJZC5OdWxsKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXhpYW89U2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKGdhbWVFZmZlY3RJZCx0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBzaGllbGQuc2V0R2FtZUVmZmVjdERhdGEoZ2FtZUVmZmVjdElkLHRleGlhbyk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93U2hpbGRQcm9ncmVzcygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgb25TaGllbGREZXN0cm95KGlkOm51bWJlcik6IHZvaWQgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tYXBfc2hpZWxkX3ZhbHVlLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgdGhpcy5zaG93U2hpbGRQcm9ncmVzcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuabtOaUueaKpOebvuWAvO+8jOi/lOWbnuS8pOWus+a6ouWHuueahOWAvCovXHJcbiAgICBjaGFuZ2VTaGllbGRWYWx1ZShudW06bnVtYmVyLHR5cGU6RGFtYWdlVHlwZSk6bnVtYmVye1xyXG4gICAgICAgIC8v5qC55o2u5Lyk5a6z57G75Z6L6YGN5Y6G5Ye65a+55bqU55qE5oqk55u+XHJcbiAgICAgICAgbGV0IHNoaWVsZEFycj1uZXcgQXJyYXk8U2hpZWxkPigpO1xyXG4gICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuZ2V0SXNDYW5XaXRoc3RhbmQodHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgc2hpZWxkQXJyLnB1c2godik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+aOkuW6j1xyXG4gICAgICAgIGlmKHNoaWVsZEFyci5sZW5ndGg+PTIpe1xyXG4gICAgICAgICAgICBzaGllbGRBcnIuc29ydCgobGVmdDpTaGllbGQscmlnaHQ6U2hpZWxkKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnQuZ2V0UmVtYWluVGltZSgpLXJpZ2h0LmdldFJlbWFpblRpbWUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlPW51bTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxzaGllbGRBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBuZXdWYWx1ZT1zaGllbGRBcnJbaV0uY2hhbmdlU2hpZWxkVmFsdWUobnVtKTtcclxuICAgICAgICAgICAgaWYobmV3VmFsdWU+MCl7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dTaGlsZFByb2dyZXNzKCk7XHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzaG93U2hpbGRQcm9ncmVzcygpe1xyXG4gICAgICAgIGxldCB2YWx1ZT10aGlzLmdldFNoaWVsZFZhbHVlKCk7XHJcbiAgICAgICAgbGV0IHByb2dyZXNzPXZhbHVlL3RoaXMuZ2V0TWF4SHAoKTtcclxuICAgICAgICBpZihwcm9ncmVzcz4xKXtcclxuICAgICAgICAgICAgcHJvZ3Jlc3M9MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5zaGllbGRfcHJvZ3Jlc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZF9wcm9ncmVzcy5ub2RlLmFjdGl2ZT12YWx1ZT4wO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZF9wcm9ncmVzcy5wcm9ncmVzcz1wcm9ncmVzc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnNoaWVsZF90ZXh0KXtcclxuICAgICAgICAgICAgdGhpcy5zaGllbGRfdGV4dC5ub2RlLmFjdGl2ZT12YWx1ZT4wO1xyXG4gICAgICAgICAgICB0aGlzLnNoaWVsZF90ZXh0LnN0cmluZz12YWx1ZS50b0ZpeGVkKDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirljLnphY3miqTnm74gKi9cclxuICAgIGdldFNoaWVsZFZhbHVlKCk6bnVtYmVye1xyXG4gICAgICAgIGxldCB2YWx1ZT0wO1xyXG4gICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIHZhbHVlKz12LmdldFNoaWVsZFZhbHVlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbFNoaWVsZCgpe1xyXG4gICAgICAgIHRoaXMubWFwX3NoaWVsZF92YWx1ZS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIHYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDkuIDkuKrlhbfmnInlhY3nlqvmlYjmnpznmoTnm74gKi9cclxuICAgIGFkZEltbXVuaXR5U2hpZWxkKGlkOm51bWJlcix0eXBlOlNoaWVsZFR5cGUscmVtYWluVGltZTpudW1iZXIsdmFsdWU6bnVtYmVyKXtcclxuICAgICAgICBpZih0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUuaGFzKGlkKSl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZS5nZXQoaWQpLnJlZnJlc2hTaGllbGQocmVtYWluVGltZSx2YWx1ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBzaGllbGQ9bmV3IGNjLk5vZGUoKS5hZGRDb21wb25lbnQoSW1tdW5pdHlTaGllbGQpO1xyXG4gICAgICAgICAgICBzaGllbGQuaW5pdChpZCx0eXBlLHJlbWFpblRpbWUsdmFsdWUsKGlkKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfaW1tdW5pdHlfc2hpZWxkX3ZhbHVlLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMubWFwX2ltbXVuaXR5X3NoaWVsZF92YWx1ZS5zZXQoaWQsc2hpZWxkKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHNoaWVsZC5ub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qOA5p+l5YWN55ar5oqk55u+5YC877yM6L+U5Zue5piv5ZCm6IO95YWN55arKi9cclxuICAgIGNoZWNrTW1tdW5pdHlTaGllbGQobnVtOm51bWJlcix0eXBlOkRhbWFnZVR5cGUpOmJvb2xlYW57XHJcbiAgICAgICAgLy/moLnmja7kvKTlrrPnsbvlnovpgY3ljoblh7rlr7nlupTnmoTmiqTnm75cclxuICAgICAgICBsZXQgc2hpZWxkQXJyPW5ldyBBcnJheTxJbW11bml0eVNoaWVsZD4oKTtcclxuICAgICAgICB0aGlzLm1hcF9pbW11bml0eV9zaGllbGRfdmFsdWUuZm9yRWFjaCgodixrKT0+eyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih2LmdldElzQ2FuV2l0aHN0YW5kKHR5cGUpKXtcclxuICAgICAgICAgICAgICAgIHNoaWVsZEFyci5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/mjpLluo9cclxuICAgICAgICBpZihzaGllbGRBcnIubGVuZ3RoPj0yKXtcclxuICAgICAgICAgICAgc2hpZWxkQXJyLnNvcnQoKGxlZnQ6SW1tdW5pdHlTaGllbGQscmlnaHQ6SW1tdW5pdHlTaGllbGQpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdC5nZXRSZW1haW5UaW1lKCktcmlnaHQuZ2V0UmVtYWluVGltZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3VmFsdWU9bnVtO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHNoaWVsZEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlPXNoaWVsZEFycltpXS5jaGFuZ2VTaGllbGRWYWx1ZShudW0pO1xyXG4gICAgICAgICAgICBpZihuZXdWYWx1ZT4wKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1CVUZGLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgICBhZGRCdWZmKGJ1ZmZEYXRhOkJ1ZmZEYXRhKTogQnVmZlRpbWVyIHtcclxuICAgICAgICBsZXQgYnVmZklkPWJ1ZmZEYXRhLmJ1ZmZfaWQ7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlQnVmZihidWZmSWQpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqBidWZm6IqC54K55ZKM54m55pWIICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbm9kZT1uZXcgY2MuTm9kZShidWZmRGF0YS5nYW1lX2VmZmVjdF9pZC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmZcclxuICAgICAgICAgICAgbGV0IGJ1ZmY6QnVmZlRpbWVyPW5vZGUuZ2V0Q29tcG9uZW50KEJ1ZmZUaW1lcik7XHJcbiAgICAgICAgICAgIGlmKCFidWZmKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmY9bm9kZS5hZGRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWZmLmluaXQoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICAvL2J1ZmbplIDmr4Hml7blpITnkIZcclxuICAgICAgICAgICAgYnVmZi5hZGREZXN0cm95TGlzdGVuKHRoaXMub25CdWZmRGVzdG9yeS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgLy9idWZm5rK755aX6Kem5Y+R5pe25aSE55CGXHJcbiAgICAgICAgICAgIGlmKGJ1ZmZEYXRhLnJlY292ZXJ5X2ppYW5nZV90aW1lPjApe1xyXG4gICAgICAgICAgICAgICAgYnVmZi5hZGRSZWNvdmVyeUxpc3Rlbih7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9SZWNvdmVyeToobnVtOm51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VIcChudW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG9zPWNjLnYyKE1hdGgucmFuZG9tKCkqNjAwLTMwMCx0aGlzLm5vZGUueStNYXRoLnJhbmRvbSgpKjIwMC0xMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmhwX3RleHRfbWFuYWdlci5jcmVhdGVIcFRleHRIcChwb3MsbnVtLEVuZW15X0luanVyZWRfVHlwZS5aaGlMaWFvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2t5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZUdhbWVFZmZlY3RCeUlkKEdhbWVFZmZlY3RJZC5tb25zdGVyX3poaWxpYW9faGFsb19oaXQscG9zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LGJ1ZmYuZ2V0Rmlyc3RCdWZmVmFsdWUoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy53YWxsX2J1ZmYuc2V0KGJ1ZmZEYXRhLmJ1ZmZfaWQsYnVmZik7XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmSWQpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmSWQuSGVyb19aaGVuRGVfSmlhWHVlSmlhblNoYW5nOntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZV9kYXRhLnJlZHVjZV9pbmp1cnlfcmF0ZSs9YnVmZkRhdGEuYnVmZl92YWx1ZVsxXTtcclxuICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkZEJ1ZmZTdGF0ZShidWZmSWQsYnVmZkRhdGEucmVtYWluX3RpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGJ1ZmY9dGhpcy53YWxsX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgICAgIGJ1ZmYucmVmcmVzaEJ1ZmYoYnVmZkRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEJ1ZmZTdGF0ZShidWZmSWQsYnVmZkRhdGEucmVtYWluX3RpbWUpOyAgXHJcbiAgICAgICAgICAgIHJldHVybiBidWZmOyAgICAgICAgIFxyXG4gICAgICAgIH0gICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc3ViQnVmZihidWZmSWQ6IEJ1ZmZJZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBidWZmPXRoaXMud2FsbF9idWZmLmdldChidWZmSWQpO1xyXG4gICAgICAgIGlmKGJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBidWZmLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25CdWZmRGVzdG9yeShidWZmRGF0YTpCdWZmRGF0YSl7XHJcbiAgICAgICAgdGhpcy53YWxsX2J1ZmYuZGVsZXRlKGJ1ZmZEYXRhLmJ1ZmZfaWQpO1xyXG4gICAgICAgIHN3aXRjaChidWZmRGF0YS5idWZmX2lkKXsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIEJ1ZmZJZC5IZXJvX1poZW5EZV9KaWFYdWVKaWFuU2hhbmc6e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVfZGF0YS5yZWR1Y2VfaW5qdXJ5X3JhdGUtPWJ1ZmZEYXRhLmJ1ZmZfdmFsdWVbMV07XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNIYXZlQnVmZihidWZmOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxsX2J1ZmYuaGFzKGJ1ZmYpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbEJ1ZmYoKXtcclxuICAgICAgICB0aGlzLndhbGxfYnVmZi5mb3JFYWNoKChidWZmOkJ1ZmZUaW1lcik9PntcclxuICAgICAgICAgICAgdGhpcy5zdWJCdWZmKGJ1ZmYuZ2V0QnVmZklkKCkpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5LiA5LiqYnVmZueKtuaAgeWbvuaghyAqL1xyXG4gICAgYWRkQnVmZlN0YXRlKGJ1ZmZJZDpCdWZmSWQscmVtYWluVGltZTpudW1iZXIpe1xyXG4gICAgICAgIGxldCB0eXBlcz1CdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QnVmZlR5cGUoYnVmZklkKTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTx0eXBlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPXR5cGVzW2ldO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1hcF9idWZmX3N0YXRlLmhhcyh0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmdldCh0eXBlKS5yZWZyZXNoVGltZShyZW1haW5UaW1lKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmZTdGF0ZT1CdWZmU3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlQnVmZlN0YXRlKHR5cGUsSGVyb19UeXBlLkhlcm9fTnVtKTtcclxuICAgICAgICAgICAgICAgIGJmU3RhdGUuaW5pdCh0eXBlLHJlbWFpblRpbWUsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcF9idWZmX3N0YXRlLmRlbGV0ZSh0eXBlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBfYnVmZl9zdGF0ZS5zZXQodHlwZSxiZlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5ub2RlLmFkZENoaWxkKHNoaWVsZC5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRCdWZmVHlwZShidWZmSWQ6QnVmZklkKTpCdWZmU3RhdGVUeXBlW117XHJcbiAgICAgICAgbGV0IHR5cGU9W107XHJcbiAgICAgICAgc3dpdGNoKGJ1ZmZJZCl7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHlwZTsgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBhZGREZUJ1ZmYoYnVmZkRhdGE6QnVmZkRhdGEsbW9uc3RlckF0dERhdGE6TW9uc3RlckF0dERhdGEpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYnVmZklkPWJ1ZmZEYXRhLmJ1ZmZfaWQ7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNIYXZlRGVCdWZmKGJ1ZmZJZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+a3u+WKoGJ1ZmboioLngrnlkoznibnmlYggICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBub2RlPW5ldyBjYy5Ob2RlKGJ1ZmZEYXRhLmdhbWVfZWZmZWN0X2lkLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIC8v5re75YqgYnVmZlxyXG4gICAgICAgICAgICBsZXQgYnVmZjpCdWZmVGltZXI9bm9kZS5nZXRDb21wb25lbnQoQnVmZlRpbWVyKTtcclxuICAgICAgICAgICAgaWYoIWJ1ZmYpe1xyXG4gICAgICAgICAgICAgICAgYnVmZj1ub2RlLmFkZENvbXBvbmVudChCdWZmVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJ1ZmYuaW5pdChidWZmRGF0YSk7XHJcbiAgICAgICAgICAgIC8vYnVmZumUgOavgeaXtuWkhOeQhlxyXG4gICAgICAgICAgICBidWZmLmFkZERlc3Ryb3lMaXN0ZW4odGhpcy5vbkRlQnVmZkRlc3RvcnkuYmluZCh0aGlzKSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMud2FsbF9kZV9idWZmLnNldChidWZmRGF0YS5idWZmX2lkLGJ1ZmYpO1xyXG4gICAgICAgICAgICAvL2J1ZmbkvKTlrrPop6blj5Hml7blpITnkIZcclxuICAgICAgICAgICAgaWYoYnVmZkRhdGEuZGFtYWdlX2ppYW5nZV90aW1lPjAmJm1vbnN0ZXJBdHREYXRhKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmYuYWRkRGFtYWdlTGlzdGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBkb0RhbWFnZToobW9uc3RlckF0dERhdGE6TW9uc3RlckF0dERhdGEpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vbnN0ZXJBdHREYXRhLmlzX2JpZz1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUluanVyZWQobW9uc3RlckF0dERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sbW9uc3RlckF0dERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaChidWZmSWQpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMud2FsbF9kZV9idWZmLmdldChidWZmSWQpLnJlZnJlc2hCdWZmKGJ1ZmZEYXRhKTsgICAgICAgICBcclxuICAgICAgICB9ICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3ViRGVCdWZmKGJ1ZmZJZDogQnVmZklkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGJ1ZmY9dGhpcy53YWxsX2RlX2J1ZmYuZ2V0KGJ1ZmZJZCk7XHJcbiAgICAgICAgaWYoYnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJ1ZmYuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlQnVmZkRlc3RvcnkoYnVmZkRhdGE6QnVmZkRhdGEpe1xyXG4gICAgICAgIHRoaXMud2FsbF9kZV9idWZmLmRlbGV0ZShidWZmRGF0YS5idWZmX2lkKTtcclxuICAgICAgICBzd2l0Y2goYnVmZkRhdGEuYnVmZl9pZCl7ICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSGF2ZURlQnVmZihidWZmOiBCdWZmSWQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxsX2RlX2J1ZmYuaGFzKGJ1ZmYpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUFsbERlQnVmZigpe1xyXG4gICAgICAgIHRoaXMud2FsbF9kZV9idWZmLmZvckVhY2goKGJ1ZmY6QnVmZlRpbWVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnN1YkRlQnVmZihidWZmLmdldEJ1ZmZJZCgpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lXYWxsKCl7XHJcbiAgICAgICAgaWYodGhpcy5kaWVfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmRpZV9jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19