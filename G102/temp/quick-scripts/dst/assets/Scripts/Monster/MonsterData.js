
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/MonsterData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '81526AaR3VJLKppWrJkDvD7', 'MonsterData');
// Scripts/Monster/MonsterData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterSkillData = exports.MonsterAttData = exports.StrengthType = exports.GongJiMode = exports.HiddenAttribute = exports.InjuredData = exports.FeedBackType = exports.KeyFrameData = exports.ColorType = exports.MonsterSkinType = exports.MonsterFaceName = exports.MonsterActionName = void 0;
var EnemyConfig_1 = require("../Enemy/EnemyConfig");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
/**怪物动作名称 */
var MonsterActionName;
(function (MonsterActionName) {
    /**待机 */
    MonsterActionName["Idle"] = "Idle";
    /**走路 */
    MonsterActionName["Walk"] = "Walk";
    /**攻击 */
    MonsterActionName["Attack"] = "Attack";
    /**死亡 */
    MonsterActionName["Death"] = "Death";
    /**受击 */
    MonsterActionName["Hurt"] = "Hurt";
    /**超级技能 */
    MonsterActionName["SupportSkill"] = "SupportSkill";
})(MonsterActionName = exports.MonsterActionName || (exports.MonsterActionName = {}));
/**怪物朝向名称 */
var MonsterFaceName;
(function (MonsterFaceName) {
    /**背面 */
    MonsterFaceName["Back"] = "Back";
    /**正面 */
    MonsterFaceName["Front"] = "Front";
    /**向右侧面 */
    MonsterFaceName["SideR"] = "Side";
    /**向左侧面 */
    MonsterFaceName["SideL"] = "Side";
})(MonsterFaceName = exports.MonsterFaceName || (exports.MonsterFaceName = {}));
/**怪物皮肤类型 */
var MonsterSkinType;
(function (MonsterSkinType) {
    /**皮肤1 */
    MonsterSkinType[MonsterSkinType["Skin1"] = 1] = "Skin1";
    /**皮肤2 */
    MonsterSkinType[MonsterSkinType["Skin2"] = 2] = "Skin2";
    /**皮肤3 */
    MonsterSkinType[MonsterSkinType["Skin3"] = 3] = "Skin3";
    /**皮肤4 */
    MonsterSkinType[MonsterSkinType["Skin4"] = 4] = "Skin4";
})(MonsterSkinType = exports.MonsterSkinType || (exports.MonsterSkinType = {}));
var ColorType;
(function (ColorType) {
    /**无，表示白色 */
    ColorType[ColorType["Null"] = 0] = "Null";
    /**受伤，表示红色 */
    ColorType[ColorType["Injured"] = 1] = "Injured";
    /**减速，表示蓝色 */
    ColorType[ColorType["SlowDown"] = 2] = "SlowDown";
})(ColorType = exports.ColorType || (exports.ColorType = {}));
/**关键事件帧数据 */
var KeyFrameData = /** @class */ (function () {
    function KeyFrameData() {
        /**名称 */
        this.name = 'Attack';
        /**触发事件帧时的回调函数 */
        this.callback = null;
    }
    return KeyFrameData;
}());
exports.KeyFrameData = KeyFrameData;
/**反馈类型 */
var FeedBackType;
(function (FeedBackType) {
    /**无 */
    FeedBackType[FeedBackType["Null"] = 0] = "Null";
    /**闪避 */
    FeedBackType[FeedBackType["ShanBi"] = 1] = "ShanBi";
    /**格挡 */
    FeedBackType[FeedBackType["GeDang"] = 2] = "GeDang";
    /**免疫 */
    FeedBackType[FeedBackType["MainYi"] = 3] = "MainYi";
    /**已经死亡 */
    FeedBackType[FeedBackType["Die"] = 4] = "Die";
    /**暴击 */
    FeedBackType[FeedBackType["BaoJi"] = 5] = "BaoJi";
    /**免疫 */
})(FeedBackType = exports.FeedBackType || (exports.FeedBackType = {}));
/**受伤数据 */
var InjuredData = /** @class */ (function () {
    function InjuredData() {
        /**是否死亡 */
        this.is_die = false;
        /**造成的最终伤害数值 */
        this.damage_num = 0;
        /**伤害反馈的类型 */
        this.feedback_type = FeedBackType.Null;
        /**伤害文本类型 */
        this.text_type = EnemyConfig_1.Enemy_Injured_Type.Normal_Attack;
    }
    /**设置伤害值 */
    InjuredData.prototype.setDamageNum = function (num) {
        if (num < 0) {
            num = 0;
        }
        this.damage_num = num;
    };
    /**获得本次的伤害值 */
    InjuredData.prototype.getDamageNum = function () {
        return this.damage_num;
    };
    /**
     *
     * @param missValue 受击方-闪避值
     * @param hitValue 打击方-命中值
     * @returns 闪避率
     */
    InjuredData.calcMissRate = function (missValue, hitValue) {
        //闪避率计算,先计算 差值=受击方闪避值-攻击方命中值,30点及以下的差值每一点转换成1.5%闪避率,300点以上的差值每一点转换为1%闪避率,闪避率最小为0，必定无法闪避；闪避最大为100%，必定闪避
        var value = missValue - hitValue;
        var rate = value < 300 ? value * 0.001 : value * 0.0005;
        if (rate < 0) {
            rate = 0;
        }
        else if (rate > 1) {
            rate = 1;
        }
        return rate;
    };
    /**
     *
     * @param critValue 打击方-暴击值
     * @param antiCritValue 被击方-防暴值
     * @returns 暴击率
     */
    InjuredData.calcCritRate = function (critValue, antiCritValue) {
        //暴击率 先计算 差值=攻击方暴击值-受击方防暴值,30点及以下的差值每一点转换成1.5%暴击率,300点以上的差值每一点转换为1%暴击率,暴击率最小为0，必定无法暴击；暴击率最大为100%，必定暴击
        var value = critValue - antiCritValue;
        var rate = value < 300 ? value * 0.001 : value * 0.0005;
        if (rate < 0) {
            rate = 0;
        }
        else if (rate > 1) {
            rate = 1;
        }
        return rate;
    };
    /**
     *
     * @param rateArr 概率数组，数据根据优先级排列
     * @returns 返回产生对应概率的下标，表示其类型
     * @example
     * let type1=0.2;//--闪避率
     * let type2=0.3;//--暴击率
     * let type3=1;//命中
        let type=InjuredData.getOnceType([type1,type2,type3]);//计算后数组的值会变为[0.2,0.3,0.5],然后从这3个中随机一个类型下标并且返回
        type=1;
     */
    InjuredData.calcOnceType = function (rateArr) {
        //cc.log("之前:"+rateArr);
        //先处理数组
        var remainRate = 1;
        for (var i = 0; i < rateArr.length; i++) {
            if (remainRate > 0) {
                var rate = rateArr[i];
                var newRemainRate = remainRate - rate;
                if (newRemainRate > 0) {
                    //末尾的还剩余概率
                    if (i == rateArr.length - 1) {
                        rateArr[i] = remainRate;
                    }
                    else {
                        remainRate = newRemainRate;
                    }
                }
                else {
                    rateArr[i] = remainRate;
                    remainRate = 0;
                }
            }
            else {
                rateArr[i] = 0;
            }
        }
        //cc.log("后来:"+rateArr);
        //根据权重随机一个
        var curValue = 0;
        var randValue = Math.random();
        ;
        var type = 0;
        for (var i = 0; i < rateArr.length; i++) {
            curValue += rateArr[i];
            if (randValue < curValue) {
                type = i;
                break;
            }
        }
        //cc.log("使用:"+type);
        return type;
    };
    /**
     * 计算普通攻击不暴击（攻方攻击力*（1±3%）-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
     * @param attack 打击方-攻击力
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @returns 最终普攻伤害
     */
    InjuredData.calcNormalDamageNum = function (attack, defense, zengShang, jianShang) {
        //（攻方攻击力*（1±3%）-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害      
        console.log("普通攻击增伤" + zengShang);
        var randNum = Math.random() * 0.03;
        attack = Math.random() > 0.5 ? (attack * (1 - randNum)) : (attack * (1 + randNum));
        //（攻方攻击力*（1±3%）-防方防御力）
        var num = attack - defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num = num * (1 + zengShang) * (1 - jianShang);
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num = num < 5 ? (Math.random() * 5 + 5) : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 计算普通攻击暴击伤害数值,（攻方攻击力*（1±3%）*最终暴击增幅-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
     * @param attack 打击方-攻击力
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终暴击后的伤害
     */
    InjuredData.calcNormalCritDamageNum = function (attack, defense, zengShang, jianShang, finalExtraCrit) {
        //（攻方攻击力*（1±3%）
        var randNum = Math.random() * 0.03;
        attack = Math.random() > 0.5 ? (attack * (1 - randNum)) : (attack * (1 + randNum));
        //（攻方攻击力*（1±3%）*最终暴击增幅-防方防御力）
        var num = attack * finalExtraCrit - defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num = num * (1 + zengShang) * (1 - jianShang);
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num = num < 5 ? (Math.random() * 5 + 5) : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 计算技能不暴击（攻方攻击力*技能伤害系数-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
     * @param attack 打击方-攻击力
     * @param damageRate 伤害比率
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @returns 最终技能伤害
     */
    InjuredData.calcSkillDamageNum = function (attack, damageRate, defense, zengShang, jianShang) {
        //（攻方攻击力*技能伤害系数-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
        //（攻方攻击力*技能伤害系数）
        attack *= damageRate;
        //（攻方攻击力*（1±3%）
        var randNum = Math.random() * 0.03;
        attack = Math.random() > 0.5 ? (attack * (1 - randNum)) : (attack * (1 + randNum));
        //（攻方攻击力*技能伤害系数-防方防御力）
        var num = attack - defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num = num * (1 + zengShang) * (1 - jianShang);
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num = num < 1 ? 1 : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 计算技能暴击伤害数值,（攻方攻击力*技能伤害系数*最终暴击增幅-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
     * @param attack 打击方-攻击力
     * @param defense 受击方-防御力
     * @param zengShang 攻击方-增伤比率
     * @param jianShang 受击方-减伤比率
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终暴击后的伤害
     */
    InjuredData.calcSkillCritDamageNum = function (attack, damageRate, defense, zengShang, jianShang, finalExtraCrit) {
        //（攻方攻击力*技能伤害系数*最终暴击增幅-防方防御力）*（1+攻方增伤率）*（1-防方减伤率）
        //（攻方攻击力*技能伤害系数）
        attack *= damageRate;
        //（攻方攻击力*（1±3%）
        var randNum = Math.random() * 0.03;
        attack = Math.random() > 0.5 ? (attack * (1 - randNum)) : (attack * (1 + randNum));
        //（攻方攻击力*技能伤害系数-防方防御力）
        var num = attack * finalExtraCrit - defense;
        //（1+攻方增伤率）*（1-防方减伤率）
        num = num * (1 + zengShang) * (1 - jianShang);
        //实际普攻伤害低于5时，触发保底机制，随机造成5~10点伤害
        num = num < 5 ? (Math.random() * 5 + 5) : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 计算技能真伤(攻方攻击力*技能伤害系数)
     * @param attack 打击方-攻击力
     * @param damageRate 伤害比率
     * @returns 最终技能伤害
     */
    InjuredData.calcSkillRealDamageNum = function (attack, damageRate) {
        //（攻方攻击力*技能伤害系数）
        var num = attack * damageRate;
        num = num < 5 ? (Math.random() * 5 + 5) : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 计算技能暴击真伤(攻方攻击力*技能伤害系数)
     * @param attack 打击方-攻击力
     * @param damageRate 伤害比率
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终技能伤害
     */
    InjuredData.calcSkillCritRealDamageNum = function (attack, damageRate, finalExtraCrit) {
        //（攻方攻击力*技能伤害系数）
        var num = attack * damageRate * finalExtraCrit;
        num = num < 5 ? (Math.random() * 5 + 5) : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 计算普通攻击真伤(攻方攻击力)
     * @param attack 打击方-攻击力
     * @returns 最终伤害
     */
    InjuredData.calcNormalRealDamageNum = function (attack) {
        //（攻方攻击力
        var num = attack;
        num = num < 5 ? (Math.random() * 5 + 5) : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 计算普通攻击暴击真伤(攻方攻击力*最终暴击增幅)
     * @param attack 打击方-攻击力
     * @param finalExtraCrit 最终暴击增幅
     * @returns 最终伤害
     */
    InjuredData.calcNormalCritRealDamageNum = function (attack, finalExtraCrit) {
        //（攻方攻击力*最终暴击增幅
        var num = attack * finalExtraCrit;
        num = num < 5 ? (Math.random() * 5 + 5) : num;
        num = Math.round(num);
        return num;
    };
    /**
     * 最终暴击增幅:攻方暴击增幅-防方暴击抗性
     * @param extraCrit 攻方暴击增幅
     * @param antiExtraCrit 防方暴击抗性
     * @returns 最终暴击增幅
     */
    InjuredData.calcFinalExtraCrit = function (extraCrit, antiExtraCrit) {
        //*最终暴击增幅:攻方暴击增幅-防方暴击抗性
        var finalExtraCrit = extraCrit - antiExtraCrit;
        if (finalExtraCrit < 1.2) {
            finalExtraCrit = 1.2;
        }
        return finalExtraCrit;
    };
    /**
     * 最终防御:防御方防御力*（1-攻方无视防御比率）
     * @param defense 防御方防御力
     * @param ignoreRate 攻方无视防御比率
     * @returns 最终防御
     */
    InjuredData.calcFinalDefense = function (defense, ignoreRate) {
        //最终防御:防御方防御力*（1-攻方无视防御）
        var finalDefense = defense * (1 - ignoreRate);
        if (finalDefense < 0) {
            finalDefense = 0;
        }
        return finalDefense;
    };
    /**
     *
     * @param damage 最终伤害值
     * @param bloodRate 吸血率
     * @param zhongshangRate 重伤率
     * @returns 吸血值
     */
    InjuredData.calcBloodSucking = function (damage, bloodRate, zhongshangRate) {
        //造成普攻伤害时，可以按比例获得普攻伤害的生命值；吸血值=普攻实际伤害*吸血率*（1-重伤率）
        var num = damage * bloodRate * (1 - zhongshangRate);
        num = Math.round(num);
        return num;
    };
    /**
     * 计算具体的减速数值
     * @param baseSpeed 基础移动速度
     * @param subNum 减速效果%
     * @param resistNum 减速抗性
     * @param addNum 加速效果
     * @returns 最终的速度
     */
    InjuredData.calcSlowDownNum = function (baseSpeed, subNum, resistNum, addNum) {
        //减速后的移动速度=初始移动速度*（1+加速效果-攻击方减速效果*（1-受击方减速抗性））
        var num = baseSpeed * ((1 + addNum - subNum) * (1 - resistNum));
        if (num < 0) {
            num = 0;
        }
        return num;
    };
    /**
     * 计算减速的持续时间
     * @param subNum 减速效果
     * @param resistNum 减速抗性
     * @param toughness 受击方韧性
     * @param insight 攻击方洞察
     * @returns 最终的持续时间
     */
    InjuredData.calcSlowDownTime = function (subNum, resistNum, toughness, insight) {
        //减速后的移动速度=初始移动速度*（1-攻击方减速效果*（1-受击方减速抗性-受击方韧性+攻击方洞察））
        return subNum;
    };
    /**
     * 计算控制时间（眩晕、减速）
     * @param xuanyunTime 眩晕时间
     * @param toughness 受击方韧性
     * @param insight 攻击方洞察力
     * @returns 最终的眩晕时间
     */
    InjuredData.calcControlTime = function (xuanyunTime, toughness, insight) {
        //控制时长=眩晕时间*（1-受击方韧性+攻击方洞察），控制时长最低为0.1秒
        var num = xuanyunTime * (1 - toughness + insight);
        if (num < 0.1) {
            num = 0.1;
        }
        return num;
    };
    return InjuredData;
}());
exports.InjuredData = InjuredData;
/**隐藏属性 */
var HiddenAttribute = /** @class */ (function () {
    function HiddenAttribute() {
        /**生命回复 */
        this.life_recovery = 0;
        /**穿透值 */
        this.penetration_value = 0;
        /**穿透率 */
        this.penetration_rate = 0;
        /**吸血率 */
        this.blood_sucking_rate = 0;
        /**重伤率 */
        this.serious_injury_rate = 0;
        /**减速抗性 */
        this.slow_resistance = 0;
        /**韧性 */
        this.toughness = 0;
        /**洞察 */
        this.insight = 0;
    }
    return HiddenAttribute;
}());
exports.HiddenAttribute = HiddenAttribute;
var GongJiMode;
(function (GongJiMode) {
    /**近战 */
    GongJiMode[GongJiMode["Melee"] = 1] = "Melee";
    /**远程 */
    GongJiMode[GongJiMode["Far"] = 2] = "Far";
})(GongJiMode = exports.GongJiMode || (exports.GongJiMode = {}));
/**怪物类型 */
var StrengthType;
(function (StrengthType) {
    /**普通怪 */
    StrengthType[StrengthType["Normal"] = 1] = "Normal";
    /**精英怪 */
    StrengthType[StrengthType["Elite"] = 2] = "Elite";
    /**首领怪 */
    StrengthType[StrengthType["Boss"] = 3] = "Boss";
})(StrengthType = exports.StrengthType || (exports.StrengthType = {}));
/**怪物攻击数据 */
var MonsterAttData = /** @class */ (function () {
    function MonsterAttData() {
        /**是否为子弹类型的攻击 */
        this.is_bullet = true;
        /**怪物属性 */
        this.monster_attribute = null;
        /**伤害类型 */
        this.damage_type = HeroConfig_1.DamageType.Normal;
        /**技能伤害比率*/
        this.skill_rate = 0;
        /**增伤率 */
        this.zengshang_rate = 0;
        /**怪物强度类型 */
        this.strength_type = StrengthType.Normal;
        this.monster_ts = null;
        /**技能震屏效果 */
        this.is_big = true;
    }
    return MonsterAttData;
}());
exports.MonsterAttData = MonsterAttData;
var MonsterSkillData = /** @class */ (function () {
    function MonsterSkillData() {
        /**初始冷却时间 */
        this.InitColdDown = null;
        /**技能冷却时间 */
        this.ColdDown = null;
        /**技能-技能参数1,获得具体技能槽的技能1参数，使用：SkillValue_1.get(1) */
        this.SkillValue_1 = null;
        /**被动技能-技能参数2 */
        this.SkillValue_2 = null;
        /**被动技能-技能参数3 */
        this.SkillValue_3 = null;
        /**被动技能-技能参数4 */
        this.SkillValue_4 = null;
        this.CastingRange = null;
    }
    /**怪物释放距离 */
    MonsterSkillData.prototype.getCastingRange = function (type) {
        return this.CastingRange.get(type);
    };
    /**怪物技能技能冷却时间 */
    MonsterSkillData.prototype.getSkillColdDown = function (type) {
        return this.ColdDown.get(type);
    };
    /**怪物技能初始的技能冷却时间 */
    MonsterSkillData.prototype.getSkillInitColdDown = function (type) {
        return this.ColdDown.get(type);
    };
    MonsterSkillData.prototype.getSkillValue1 = function (type) {
        return this.SkillValue_1.get(type);
    };
    MonsterSkillData.prototype.getSkillValue2 = function (type) {
        return this.SkillValue_2.get(type);
    };
    MonsterSkillData.prototype.getSkillValue3 = function (type) {
        return this.SkillValue_3.get(type);
    };
    MonsterSkillData.prototype.getSkillValue4 = function (type) {
        return this.SkillValue_4.get(type);
    };
    return MonsterSkillData;
}());
exports.MonsterSkillData = MonsterSkillData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcTW9uc3RlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTBEO0FBQzFELHNEQUFxRDtBQU1yRCxZQUFZO0FBQ1osSUFBWSxpQkFhWDtBQWJELFdBQVksaUJBQWlCO0lBQ3pCLFFBQVE7SUFDUixrQ0FBVyxDQUFBO0lBQ1gsUUFBUTtJQUNSLGtDQUFXLENBQUE7SUFDWCxRQUFRO0lBQ1Isc0NBQWUsQ0FBQTtJQUNmLFFBQVE7SUFDUixvQ0FBYSxDQUFBO0lBQ2IsUUFBUTtJQUNSLGtDQUFXLENBQUE7SUFDWCxVQUFVO0lBQ1Ysa0RBQTJCLENBQUE7QUFDL0IsQ0FBQyxFQWJXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBYTVCO0FBRUQsWUFBWTtBQUNaLElBQVksZUFTWDtBQVRELFdBQVksZUFBZTtJQUN2QixRQUFRO0lBQ1IsZ0NBQVcsQ0FBQTtJQUNYLFFBQVE7SUFDUixrQ0FBYSxDQUFBO0lBQ2IsVUFBVTtJQUNWLGlDQUFZLENBQUE7SUFDWixVQUFVO0lBQ1YsaUNBQVksQ0FBQTtBQUNoQixDQUFDLEVBVFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFTMUI7QUFFRCxZQUFZO0FBQ1osSUFBWSxlQVNYO0FBVEQsV0FBWSxlQUFlO0lBQ3ZCLFNBQVM7SUFDVCx1REFBTyxDQUFBO0lBQ1AsU0FBUztJQUNULHVEQUFLLENBQUE7SUFDTCxTQUFTO0lBQ1QsdURBQUssQ0FBQTtJQUNMLFNBQVM7SUFDVCx1REFBSyxDQUFBO0FBQ1QsQ0FBQyxFQVRXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBUzFCO0FBRUQsSUFBWSxTQVFYO0FBUkQsV0FBWSxTQUFTO0lBQ2pCLFlBQVk7SUFDWix5Q0FBTSxDQUFBO0lBQ04sYUFBYTtJQUNiLCtDQUFPLENBQUE7SUFDUCxhQUFhO0lBQ2IsaURBQVEsQ0FBQTtBQUVaLENBQUMsRUFS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WSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQseUNBQWMsR0FBZCxVQUFlLElBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQseUNBQWMsR0FBZCxVQUFlLElBQVc7UUFDdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQTlDQSxBQThDQyxJQUFBO0FBOUNZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuZW15X0luanVyZWRfVHlwZSB9IGZyb20gXCIuLi9FbmVteS9FbmVteUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBEYW1hZ2VUeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEpzb25Nb25zdGVyR3Jvd3RoQXR0cmlidXRlcyB9IGZyb20gXCIuL0RhdGEvTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXNcIjtcclxuaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4vTW9uc3RlclwiO1xyXG5cclxuXHJcblxyXG4vKirmgKrnianliqjkvZzlkI3np7AgKi9cclxuZXhwb3J0IGVudW0gTW9uc3RlckFjdGlvbk5hbWV7XHJcbiAgICAvKirlvoXmnLogKi9cclxuICAgIElkbGU9XCJJZGxlXCIsXHJcbiAgICAvKirotbDot68gKi9cclxuICAgIFdhbGs9XCJXYWxrXCIsXHJcbiAgICAvKirmlLvlh7sgKi9cclxuICAgIEF0dGFjaz1cIkF0dGFja1wiLFxyXG4gICAgLyoq5q275LqhICovXHJcbiAgICBEZWF0aD1cIkRlYXRoXCIsXHJcbiAgICAvKirlj5flh7sgKi9cclxuICAgIEh1cnQ9XCJIdXJ0XCIsXHJcbiAgICAvKirotoXnuqfmioDog70gKi9cclxuICAgIFN1cHBvcnRTa2lsbD1cIlN1cHBvcnRTa2lsbFwiLFxyXG59XHJcblxyXG4vKirmgKrnianmnJ3lkJHlkI3np7AgKi9cclxuZXhwb3J0IGVudW0gTW9uc3RlckZhY2VOYW1le1xyXG4gICAgLyoq6IOM6Z2iICovXHJcbiAgICBCYWNrPVwiQmFja1wiLFxyXG4gICAgLyoq5q2j6Z2iICovXHJcbiAgICBGcm9udD1cIkZyb250XCIsXHJcbiAgICAvKirlkJHlj7PkvqfpnaIgKi9cclxuICAgIFNpZGVSPVwiU2lkZVwiLFxyXG4gICAgLyoq5ZCR5bem5L6n6Z2iICovXHJcbiAgICBTaWRlTD1cIlNpZGVcIiwgIFxyXG59XHJcblxyXG4vKirmgKrniannmq7ogqTnsbvlnosgKi9cclxuZXhwb3J0IGVudW0gTW9uc3RlclNraW5UeXBle1xyXG4gICAgLyoq55qu6IKkMSAqL1xyXG4gICAgU2tpbjE9MSxcclxuICAgIC8qKuearuiCpDIgKi9cclxuICAgIFNraW4yLFxyXG4gICAgLyoq55qu6IKkMyAqL1xyXG4gICAgU2tpbjMsXHJcbiAgICAvKirnmq7ogqQ0ICovXHJcbiAgICBTa2luNCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQ29sb3JUeXBle1xyXG4gICAgLyoq5peg77yM6KGo56S655m96ImyICovXHJcbiAgICBOdWxsPTAsXHJcbiAgICAvKirlj5fkvKTvvIzooajnpLrnuqLoibIgKi9cclxuICAgIEluanVyZWQsXHJcbiAgICAvKirlh4/pgJ/vvIzooajnpLrok53oibIgKi9cclxuICAgIFNsb3dEb3duLFxyXG4gICAgXHJcbn1cclxuXHJcbi8qKuWFs+mUruS6i+S7tuW4p+aVsOaNriAqL1xyXG5leHBvcnQgY2xhc3MgS2V5RnJhbWVEYXRhe1xyXG4gICAgLyoq5ZCN56ewICovXHJcbiAgICBuYW1lOnN0cmluZz0nQXR0YWNrJztcclxuICAgIC8qKuinpuWPkeS6i+S7tuW4p+aXtueahOWbnuiwg+WHveaVsCAqL1xyXG4gICAgY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxufVxyXG5cclxuLyoq5Y+N6aaI57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIEZlZWRCYWNrVHlwZXtcclxuICAgIC8qKuaXoCAqL1xyXG4gICAgTnVsbD0wLFxyXG4gICAgLyoq6Zeq6YG/ICovXHJcbiAgICBTaGFuQmksXHJcbiAgICAvKirmoLzmjKEgKi9cclxuICAgIEdlRGFuZyxcclxuICAgIC8qKuWFjeeWqyAqL1xyXG4gICAgTWFpbllpLFxyXG4gICAgLyoq5bey57uP5q275LqhICovXHJcbiAgICBEaWUsXHJcbiAgICAvKirmmrTlh7sgKi9cclxuICAgIEJhb0ppLFxyXG4gICAgLyoq5YWN55arICovXHJcbn1cclxuLyoq5Y+X5Lyk5pWw5o2uICovXHJcbmV4cG9ydCBjbGFzcyBJbmp1cmVkRGF0YXtcclxuICAgIC8qKuaYr+WQpuatu+S6oSAqL1xyXG4gICAgaXNfZGllOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirpgKDmiJDnmoTmnIDnu4jkvKTlrrPmlbDlgLwgKi9cclxuICAgIHByaXZhdGUgZGFtYWdlX251bTpudW1iZXI9MDsgICAgXHJcbiAgICAvKirkvKTlrrPlj43ppojnmoTnsbvlnosgKi9cclxuICAgIGZlZWRiYWNrX3R5cGU6RmVlZEJhY2tUeXBlPUZlZWRCYWNrVHlwZS5OdWxsO1xyXG4gICAgLyoq5Lyk5a6z5paH5pys57G75Z6LICovXHJcbiAgICB0ZXh0X3R5cGU6RW5lbXlfSW5qdXJlZF9UeXBlPUVuZW15X0luanVyZWRfVHlwZS5Ob3JtYWxfQXR0YWNrO1xyXG4gICAgLyoq6K6+572u5Lyk5a6z5YC8ICovXHJcbiAgICBzZXREYW1hZ2VOdW0obnVtOm51bWJlcil7XHJcbiAgICAgICAgaWYobnVtPDApe1xyXG4gICAgICAgICAgICBudW09MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYW1hZ2VfbnVtPW51bTtcclxuICAgIH1cclxuICAgIC8qKuiOt+W+l+acrOasoeeahOS8pOWus+WAvCAqL1xyXG4gICAgZ2V0RGFtYWdlTnVtKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhbWFnZV9udW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBtaXNzVmFsdWUg5Y+X5Ye75pa5LemXqumBv+WAvFxyXG4gICAgICogQHBhcmFtIGhpdFZhbHVlIOaJk+WHu+aWuS3lkb3kuK3lgLxcclxuICAgICAqIEByZXR1cm5zIOmXqumBv+eOh1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2FsY01pc3NSYXRlKG1pc3NWYWx1ZTpudW1iZXIsaGl0VmFsdWU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgLy/pl6rpgb/njoforqHnrpcs5YWI6K6h566XIOW3ruWAvD3lj5flh7vmlrnpl6rpgb/lgLwt5pS75Ye75pa55ZG95Lit5YC8LDMw54K55Y+K5Lul5LiL55qE5beu5YC85q+P5LiA54K56L2s5o2i5oiQMS41JemXqumBv+eOhywzMDDngrnku6XkuIrnmoTlt67lgLzmr4/kuIDngrnovazmjaLkuLoxJemXqumBv+eOhyzpl6rpgb/njofmnIDlsI/kuLow77yM5b+F5a6a5peg5rOV6Zeq6YG/77yb6Zeq6YG/5pyA5aSn5Li6MTAwJe+8jOW/heWumumXqumBv1xyXG4gICAgICAgIGxldCB2YWx1ZT1taXNzVmFsdWUtaGl0VmFsdWU7XHJcbiAgICAgICAgbGV0IHJhdGU9dmFsdWU8MzAwP3ZhbHVlKjAuMDAxOnZhbHVlKjAuMDAwNTtcclxuICAgICAgICBpZihyYXRlPDApe1xyXG4gICAgICAgICAgICByYXRlPTA7XHJcbiAgICAgICAgfWVsc2UgaWYocmF0ZT4xKXtcclxuICAgICAgICAgICAgcmF0ZT0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmF0ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gY3JpdFZhbHVlIOaJk+WHu+aWuS3mmrTlh7vlgLxcclxuICAgICAqIEBwYXJhbSBhbnRpQ3JpdFZhbHVlIOiiq+WHu+aWuS3pmLLmmrTlgLxcclxuICAgICAqIEByZXR1cm5zIOaatOWHu+eOh1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2FsY0NyaXRSYXRlKGNyaXRWYWx1ZTpudW1iZXIsYW50aUNyaXRWYWx1ZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvL+aatOWHu+eOhyDlhYjorqHnrpcg5beu5YC8PeaUu+WHu+aWueaatOWHu+WAvC3lj5flh7vmlrnpmLLmmrTlgLwsMzDngrnlj4rku6XkuIvnmoTlt67lgLzmr4/kuIDngrnovazmjaLmiJAxLjUl5pq05Ye7546HLDMwMOeCueS7peS4iueahOW3ruWAvOavj+S4gOeCuei9rOaNouS4ujEl5pq05Ye7546HLOaatOWHu+eOh+acgOWwj+S4ujDvvIzlv4Xlrprml6Dms5XmmrTlh7vvvJvmmrTlh7vnjofmnIDlpKfkuLoxMDAl77yM5b+F5a6a5pq05Ye7XHJcbiAgICAgICAgbGV0IHZhbHVlPWNyaXRWYWx1ZS1hbnRpQ3JpdFZhbHVlO1xyXG4gICAgICAgIGxldCByYXRlPXZhbHVlPDMwMD92YWx1ZSowLjAwMTp2YWx1ZSowLjAwMDU7XHJcbiAgICAgICAgaWYocmF0ZTwwKXtcclxuICAgICAgICAgICAgcmF0ZT0wO1xyXG4gICAgICAgIH1lbHNlIGlmKHJhdGU+MSl7XHJcbiAgICAgICAgICAgIHJhdGU9MTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhdGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHJhdGVBcnIg5qaC546H5pWw57uE77yM5pWw5o2u5qC55o2u5LyY5YWI57qn5o6S5YiXXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57kuqfnlJ/lr7nlupTmpoLnjofnmoTkuIvmoIfvvIzooajnpLrlhbbnsbvlnotcclxuICAgICAqIEBleGFtcGxlIFxyXG4gICAgICogbGV0IHR5cGUxPTAuMjsvLy0t6Zeq6YG/546HXHJcbiAgICAgKiBsZXQgdHlwZTI9MC4zOy8vLS3mmrTlh7vnjodcclxuICAgICAqIGxldCB0eXBlMz0xOy8v5ZG95LitXHJcblx0XHRsZXQgdHlwZT1Jbmp1cmVkRGF0YS5nZXRPbmNlVHlwZShbdHlwZTEsdHlwZTIsdHlwZTNdKTsvL+iuoeeul+WQjuaVsOe7hOeahOWAvOS8muWPmOS4ulswLjIsMC4zLDAuNV0s54S25ZCO5LuO6L+ZM+S4quS4remaj+acuuS4gOS4quexu+Wei+S4i+agh+W5tuS4lOi/lOWbnlxyXG4gICAgICAgIHR5cGU9MTtcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNhbGNPbmNlVHlwZShyYXRlQXJyOm51bWJlcltdKTpudW1iZXJ7XHJcbiAgICAgICAgLy9jYy5sb2coXCLkuYvliY06XCIrcmF0ZUFycik7XHJcbiAgICAgICAgLy/lhYjlpITnkIbmlbDnu4RcclxuICAgICAgICBsZXQgcmVtYWluUmF0ZT0xO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHJhdGVBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihyZW1haW5SYXRlPjApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhdGU9cmF0ZUFycltpXTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdSZW1haW5SYXRlPXJlbWFpblJhdGUtcmF0ZTtcclxuICAgICAgICAgICAgICAgIGlmKG5ld1JlbWFpblJhdGU+MCl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL+acq+WwvueahOi/mOWJqeS9meamgueOh1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGk9PXJhdGVBcnIubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByYXRlQXJyW2ldPXJlbWFpblJhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbWFpblJhdGU9bmV3UmVtYWluUmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByYXRlQXJyW2ldPXJlbWFpblJhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluUmF0ZT0wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJhdGVBcnJbaV09MDtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmxvZyhcIuWQjuadpTpcIityYXRlQXJyKTtcclxuICAgICAgICAvL+agueaNruadg+mHjemaj+acuuS4gOS4qlxyXG4gICAgICAgIGxldCBjdXJWYWx1ZT0wO1xyXG4gICAgICAgIGxldCByYW5kVmFsdWU9TWF0aC5yYW5kb20oKTs7XHJcbiAgICAgICAgbGV0IHR5cGU9MDtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTxyYXRlQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgY3VyVmFsdWUrPXJhdGVBcnJbaV07XHJcbiAgICAgICAgICAgIGlmKHJhbmRWYWx1ZTxjdXJWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICB0eXBlPWk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL2NjLmxvZyhcIuS9v+eUqDpcIit0eXBlKTtcclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6h566X5pmu6YCa5pS75Ye75LiN5pq05Ye777yI5pS75pa55pS75Ye75YqbKu+8iDHCsTMl77yJLemYsuaWuemYsuW+oeWKm++8iSrvvIgxK+aUu+aWueWinuS8pOeOh++8iSrvvIgxLemYsuaWueWHj+S8pOeOh++8ieWunumZheaZruaUu+S8pOWus+S9juS6jjXml7bvvIzop6blj5Hkv53lupXmnLrliLbvvIzpmo/mnLrpgKDmiJA1fjEw54K55Lyk5a6zXHJcbiAgICAgKiBAcGFyYW0gYXR0YWNrIOaJk+WHu+aWuS3mlLvlh7vliptcclxuICAgICAqIEBwYXJhbSBkZWZlbnNlIOWPl+WHu+aWuS3pmLLlvqHliptcclxuICAgICAqIEBwYXJhbSB6ZW5nU2hhbmcg5pS75Ye75pa5LeWinuS8pOavlOeOh1xyXG4gICAgICogQHBhcmFtIGppYW5TaGFuZyDlj5flh7vmlrkt5YeP5Lyk5q+U546HXHJcbiAgICAgKiBAcmV0dXJucyDmnIDnu4jmma7mlLvkvKTlrrNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNhbGNOb3JtYWxEYW1hZ2VOdW0oYXR0YWNrOm51bWJlcixkZWZlbnNlOm51bWJlcix6ZW5nU2hhbmc6bnVtYmVyLGppYW5TaGFuZzpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvL++8iOaUu+aWueaUu+WHu+WKmyrvvIgxwrEzJe+8iS3pmLLmlrnpmLLlvqHlipvvvIkq77yIMSvmlLvmlrnlop7kvKTnjofvvIkq77yIMS3pmLLmlrnlh4/kvKTnjofvvInlrp7pmYXmma7mlLvkvKTlrrPkvY7kuo415pe277yM6Kem5Y+R5L+d5bqV5py65Yi277yM6ZqP5py66YCg5oiQNX4xMOeCueS8pOWusyAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5pmu6YCa5pS75Ye75aKe5LykXCIremVuZ1NoYW5nKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIGxldCByYW5kTnVtPU1hdGgucmFuZG9tKCkqMC4wMztcclxuICAgICAgICBhdHRhY2s9TWF0aC5yYW5kb20oKT4wLjU/KGF0dGFjayooMS1yYW5kTnVtKSk6KGF0dGFjayooMStyYW5kTnVtKSk7XHJcbiAgICAgICAgLy/vvIjmlLvmlrnmlLvlh7vlipsq77yIMcKxMyXvvIkt6Ziy5pa56Ziy5b6h5Yqb77yJXHJcbiAgICAgICAgbGV0IG51bT1hdHRhY2stZGVmZW5zZTtcclxuICAgICAgICAvL++8iDEr5pS75pa55aKe5Lyk546H77yJKu+8iDEt6Ziy5pa55YeP5Lyk546H77yJXHJcbiAgICAgICAgbnVtPW51bSooMSt6ZW5nU2hhbmcpKigxLWppYW5TaGFuZyk7ICAgICAgICBcclxuICAgICAgICAvL+WunumZheaZruaUu+S8pOWus+S9juS6jjXml7bvvIzop6blj5Hkv53lupXmnLrliLbvvIzpmo/mnLrpgKDmiJA1fjEw54K55Lyk5a6zXHJcbiAgICAgICAgbnVtPW51bTw1PyhNYXRoLnJhbmRvbSgpKjUrNSk6bnVtO1xyXG4gICAgICAgIG51bT1NYXRoLnJvdW5kKG51bSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6h566X5pmu6YCa5pS75Ye75pq05Ye75Lyk5a6z5pWw5YC8LO+8iOaUu+aWueaUu+WHu+WKmyrvvIgxwrEzJe+8iSrmnIDnu4jmmrTlh7vlop7luYUt6Ziy5pa56Ziy5b6h5Yqb77yJKu+8iDEr5pS75pa55aKe5Lyk546H77yJKu+8iDEt6Ziy5pa55YeP5Lyk546H77yJXHJcbiAgICAgKiBAcGFyYW0gYXR0YWNrIOaJk+WHu+aWuS3mlLvlh7vliptcclxuICAgICAqIEBwYXJhbSBkZWZlbnNlIOWPl+WHu+aWuS3pmLLlvqHliptcclxuICAgICAqIEBwYXJhbSB6ZW5nU2hhbmcg5pS75Ye75pa5LeWinuS8pOavlOeOh1xyXG4gICAgICogQHBhcmFtIGppYW5TaGFuZyDlj5flh7vmlrkt5YeP5Lyk5q+U546HXHJcbiAgICAgKiBAcGFyYW0gZmluYWxFeHRyYUNyaXQg5pyA57uI5pq05Ye75aKe5bmFXHJcbiAgICAgKiBAcmV0dXJucyDmnIDnu4jmmrTlh7vlkI7nmoTkvKTlrrNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNhbGNOb3JtYWxDcml0RGFtYWdlTnVtKGF0dGFjazpudW1iZXIsZGVmZW5zZTpudW1iZXIsemVuZ1NoYW5nOm51bWJlcixqaWFuU2hhbmc6bnVtYmVyLGZpbmFsRXh0cmFDcml0Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIC8v77yI5pS75pa55pS75Ye75YqbKu+8iDHCsTMl77yJXHJcbiAgICAgICAgbGV0IHJhbmROdW09TWF0aC5yYW5kb20oKSowLjAzO1xyXG4gICAgICAgIGF0dGFjaz1NYXRoLnJhbmRvbSgpPjAuNT8oYXR0YWNrKigxLXJhbmROdW0pKTooYXR0YWNrKigxK3JhbmROdW0pKTtcclxuICAgICAgICAvL++8iOaUu+aWueaUu+WHu+WKmyrvvIgxwrEzJe+8iSrmnIDnu4jmmrTlh7vlop7luYUt6Ziy5pa56Ziy5b6h5Yqb77yJXHJcbiAgICAgICAgbGV0IG51bT1hdHRhY2sqZmluYWxFeHRyYUNyaXQtZGVmZW5zZTtcclxuICAgICAgICAvL++8iDEr5pS75pa55aKe5Lyk546H77yJKu+8iDEt6Ziy5pa55YeP5Lyk546H77yJXHJcbiAgICAgICAgbnVtPW51bSooMSt6ZW5nU2hhbmcpKigxLWppYW5TaGFuZyk7ICAgICAgICBcclxuICAgICAgICAvL+WunumZheaZruaUu+S8pOWus+S9juS6jjXml7bvvIzop6blj5Hkv53lupXmnLrliLbvvIzpmo/mnLrpgKDmiJA1fjEw54K55Lyk5a6zXHJcbiAgICAgICAgbnVtPW51bTw1PyhNYXRoLnJhbmRvbSgpKjUrNSk6bnVtO1xyXG4gICAgICAgIG51bT1NYXRoLnJvdW5kKG51bSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+aKgOiDveS4jeaatOWHu++8iOaUu+aWueaUu+WHu+WKmyrmioDog73kvKTlrrPns7vmlbAt6Ziy5pa56Ziy5b6h5Yqb77yJKu+8iDEr5pS75pa55aKe5Lyk546H77yJKu+8iDEt6Ziy5pa55YeP5Lyk546H77yJXHJcbiAgICAgKiBAcGFyYW0gYXR0YWNrIOaJk+WHu+aWuS3mlLvlh7vliptcclxuICAgICAqIEBwYXJhbSBkYW1hZ2VSYXRlIOS8pOWus+avlOeOh1xyXG4gICAgICogQHBhcmFtIGRlZmVuc2Ug5Y+X5Ye75pa5LemYsuW+oeWKm1xyXG4gICAgICogQHBhcmFtIHplbmdTaGFuZyDmlLvlh7vmlrkt5aKe5Lyk5q+U546HXHJcbiAgICAgKiBAcGFyYW0gamlhblNoYW5nIOWPl+WHu+aWuS3lh4/kvKTmr5TnjodcclxuICAgICAqIEByZXR1cm5zIOacgOe7iOaKgOiDveS8pOWus1xyXG4gICAgICovXHJcbiAgICAgc3RhdGljIGNhbGNTa2lsbERhbWFnZU51bShhdHRhY2s6bnVtYmVyLGRhbWFnZVJhdGU6bnVtYmVyLGRlZmVuc2U6bnVtYmVyLHplbmdTaGFuZzpudW1iZXIsamlhblNoYW5nOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIC8v77yI5pS75pa55pS75Ye75YqbKuaKgOiDveS8pOWus+ezu+aVsC3pmLLmlrnpmLLlvqHlipvvvIkq77yIMSvmlLvmlrnlop7kvKTnjofvvIkq77yIMS3pmLLmlrnlh4/kvKTnjofvvIlcclxuICAgICAgICAvL++8iOaUu+aWueaUu+WHu+WKmyrmioDog73kvKTlrrPns7vmlbDvvIlcclxuICAgICAgICBhdHRhY2sqPWRhbWFnZVJhdGU7XHJcbiAgICAgICAgLy/vvIjmlLvmlrnmlLvlh7vlipsq77yIMcKxMyXvvIlcclxuICAgICAgICBsZXQgcmFuZE51bT1NYXRoLnJhbmRvbSgpKjAuMDM7XHJcbiAgICAgICAgYXR0YWNrPU1hdGgucmFuZG9tKCk+MC41PyhhdHRhY2sqKDEtcmFuZE51bSkpOihhdHRhY2sqKDErcmFuZE51bSkpO1xyXG4gICAgICAgIC8v77yI5pS75pa55pS75Ye75YqbKuaKgOiDveS8pOWus+ezu+aVsC3pmLLmlrnpmLLlvqHlipvvvIlcclxuICAgICAgICBsZXQgbnVtPWF0dGFjay1kZWZlbnNlO1xyXG4gICAgICAgIC8v77yIMSvmlLvmlrnlop7kvKTnjofvvIkq77yIMS3pmLLmlrnlh4/kvKTnjofvvIlcclxuICAgICAgICBudW09bnVtKigxK3plbmdTaGFuZykqKDEtamlhblNoYW5nKTsgICAgICAgIFxyXG4gICAgICAgIC8v5a6e6ZmF5pmu5pS75Lyk5a6z5L2O5LqONeaXtu+8jOinpuWPkeS/neW6leacuuWItu+8jOmaj+acuumAoOaIkDV+MTDngrnkvKTlrrNcclxuICAgICAgICBudW09bnVtPDE/MTpudW07XHJcbiAgICAgICAgbnVtPU1hdGgucm91bmQobnVtKTtcclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfSAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+aKgOiDveaatOWHu+S8pOWus+aVsOWAvCzvvIjmlLvmlrnmlLvlh7vlipsq5oqA6IO95Lyk5a6z57O75pWwKuacgOe7iOaatOWHu+WinuW5hS3pmLLmlrnpmLLlvqHlipvvvIkq77yIMSvmlLvmlrnlop7kvKTnjofvvIkq77yIMS3pmLLmlrnlh4/kvKTnjofvvIlcclxuICAgICAqIEBwYXJhbSBhdHRhY2sg5omT5Ye75pa5LeaUu+WHu+WKm1xyXG4gICAgICogQHBhcmFtIGRlZmVuc2Ug5Y+X5Ye75pa5LemYsuW+oeWKm1xyXG4gICAgICogQHBhcmFtIHplbmdTaGFuZyDmlLvlh7vmlrkt5aKe5Lyk5q+U546HXHJcbiAgICAgKiBAcGFyYW0gamlhblNoYW5nIOWPl+WHu+aWuS3lh4/kvKTmr5TnjodcclxuICAgICAqIEBwYXJhbSBmaW5hbEV4dHJhQ3JpdCDmnIDnu4jmmrTlh7vlop7luYVcclxuICAgICAqIEByZXR1cm5zIOacgOe7iOaatOWHu+WQjueahOS8pOWus1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2FsY1NraWxsQ3JpdERhbWFnZU51bShhdHRhY2s6bnVtYmVyLGRhbWFnZVJhdGU6bnVtYmVyLGRlZmVuc2U6bnVtYmVyLHplbmdTaGFuZzpudW1iZXIsamlhblNoYW5nOm51bWJlcixmaW5hbEV4dHJhQ3JpdDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvL++8iOaUu+aWueaUu+WHu+WKmyrmioDog73kvKTlrrPns7vmlbAq5pyA57uI5pq05Ye75aKe5bmFLemYsuaWuemYsuW+oeWKm++8iSrvvIgxK+aUu+aWueWinuS8pOeOh++8iSrvvIgxLemYsuaWueWHj+S8pOeOh++8iVxyXG4gICAgICAgIC8v77yI5pS75pa55pS75Ye75YqbKuaKgOiDveS8pOWus+ezu+aVsO+8iVxyXG4gICAgICAgIGF0dGFjayo9ZGFtYWdlUmF0ZTtcclxuICAgICAgICAvL++8iOaUu+aWueaUu+WHu+WKmyrvvIgxwrEzJe+8iVxyXG4gICAgICAgIGxldCByYW5kTnVtPU1hdGgucmFuZG9tKCkqMC4wMztcclxuICAgICAgICBhdHRhY2s9TWF0aC5yYW5kb20oKT4wLjU/KGF0dGFjayooMS1yYW5kTnVtKSk6KGF0dGFjayooMStyYW5kTnVtKSk7XHJcbiAgICAgICAgLy/vvIjmlLvmlrnmlLvlh7vlipsq5oqA6IO95Lyk5a6z57O75pWwLemYsuaWuemYsuW+oeWKm++8iVxyXG4gICAgICAgIGxldCBudW09YXR0YWNrKmZpbmFsRXh0cmFDcml0LWRlZmVuc2U7XHJcbiAgICAgICAgLy/vvIgxK+aUu+aWueWinuS8pOeOh++8iSrvvIgxLemYsuaWueWHj+S8pOeOh++8iVxyXG4gICAgICAgIG51bT1udW0qKDEremVuZ1NoYW5nKSooMS1qaWFuU2hhbmcpOyAgICAgICAgXHJcbiAgICAgICAgLy/lrp7pmYXmma7mlLvkvKTlrrPkvY7kuo415pe277yM6Kem5Y+R5L+d5bqV5py65Yi277yM6ZqP5py66YCg5oiQNX4xMOeCueS8pOWus1xyXG4gICAgICAgIG51bT1udW08NT8oTWF0aC5yYW5kb20oKSo1KzUpOm51bTtcclxuICAgICAgICBudW09TWF0aC5yb3VuZChudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfmioDog73nnJ/kvKQo5pS75pa55pS75Ye75YqbKuaKgOiDveS8pOWus+ezu+aVsClcclxuICAgICAqIEBwYXJhbSBhdHRhY2sg5omT5Ye75pa5LeaUu+WHu+WKm1xyXG4gICAgICogQHBhcmFtIGRhbWFnZVJhdGUg5Lyk5a6z5q+U546HXHJcbiAgICAgKiBAcmV0dXJucyDmnIDnu4jmioDog73kvKTlrrNcclxuICAgICAqL1xyXG4gICAgIHN0YXRpYyBjYWxjU2tpbGxSZWFsRGFtYWdlTnVtKGF0dGFjazpudW1iZXIsZGFtYWdlUmF0ZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvL++8iOaUu+aWueaUu+WHu+WKmyrmioDog73kvKTlrrPns7vmlbDvvIlcclxuICAgICAgICBsZXQgbnVtPWF0dGFjaypkYW1hZ2VSYXRlO1xyXG4gICAgICAgIG51bT1udW08NT8oTWF0aC5yYW5kb20oKSo1KzUpOm51bTtcclxuICAgICAgICBudW09TWF0aC5yb3VuZChudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfmioDog73mmrTlh7vnnJ/kvKQo5pS75pa55pS75Ye75YqbKuaKgOiDveS8pOWus+ezu+aVsClcclxuICAgICAqIEBwYXJhbSBhdHRhY2sg5omT5Ye75pa5LeaUu+WHu+WKm1xyXG4gICAgICogQHBhcmFtIGRhbWFnZVJhdGUg5Lyk5a6z5q+U546HXHJcbiAgICAgKiBAcGFyYW0gZmluYWxFeHRyYUNyaXQg5pyA57uI5pq05Ye75aKe5bmFXHJcbiAgICAgKiBAcmV0dXJucyDmnIDnu4jmioDog73kvKTlrrNcclxuICAgICAqL1xyXG4gICAgIHN0YXRpYyBjYWxjU2tpbGxDcml0UmVhbERhbWFnZU51bShhdHRhY2s6bnVtYmVyLGRhbWFnZVJhdGU6bnVtYmVyLGZpbmFsRXh0cmFDcml0Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIC8v77yI5pS75pa55pS75Ye75YqbKuaKgOiDveS8pOWus+ezu+aVsO+8iVxyXG4gICAgICAgIGxldCBudW09YXR0YWNrKmRhbWFnZVJhdGUqZmluYWxFeHRyYUNyaXQ7XHJcbiAgICAgICAgbnVtPW51bTw1PyhNYXRoLnJhbmRvbSgpKjUrNSk6bnVtO1xyXG4gICAgICAgIG51bT1NYXRoLnJvdW5kKG51bSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+aZrumAmuaUu+WHu+ecn+S8pCjmlLvmlrnmlLvlh7vlipspXHJcbiAgICAgKiBAcGFyYW0gYXR0YWNrIOaJk+WHu+aWuS3mlLvlh7vliptcclxuICAgICAqIEByZXR1cm5zIOacgOe7iOS8pOWus1xyXG4gICAgICovXHJcbiAgICAgc3RhdGljIGNhbGNOb3JtYWxSZWFsRGFtYWdlTnVtKGF0dGFjazpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvL++8iOaUu+aWueaUu+WHu+WKm1xyXG4gICAgICAgIGxldCBudW09YXR0YWNrO1xyXG4gICAgICAgIG51bT1udW08NT8oTWF0aC5yYW5kb20oKSo1KzUpOm51bTtcclxuICAgICAgICBudW09TWF0aC5yb3VuZChudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfmma7pgJrmlLvlh7vmmrTlh7vnnJ/kvKQo5pS75pa55pS75Ye75YqbKuacgOe7iOaatOWHu+WinuW5hSlcclxuICAgICAqIEBwYXJhbSBhdHRhY2sg5omT5Ye75pa5LeaUu+WHu+WKm1xyXG4gICAgICogQHBhcmFtIGZpbmFsRXh0cmFDcml0IOacgOe7iOaatOWHu+WinuW5hVxyXG4gICAgICogQHJldHVybnMg5pyA57uI5Lyk5a6zXHJcbiAgICAgKi9cclxuICAgICBzdGF0aWMgY2FsY05vcm1hbENyaXRSZWFsRGFtYWdlTnVtKGF0dGFjazpudW1iZXIsZmluYWxFeHRyYUNyaXQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgLy/vvIjmlLvmlrnmlLvlh7vlipsq5pyA57uI5pq05Ye75aKe5bmFXHJcbiAgICAgICAgbGV0IG51bT1hdHRhY2sqZmluYWxFeHRyYUNyaXQ7XHJcbiAgICAgICAgbnVtPW51bTw1PyhNYXRoLnJhbmRvbSgpKjUrNSk6bnVtO1xyXG4gICAgICAgIG51bT1NYXRoLnJvdW5kKG51bSk7XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDnu4jmmrTlh7vlop7luYU65pS75pa55pq05Ye75aKe5bmFLemYsuaWueaatOWHu+aKl+aAp1xyXG4gICAgICogQHBhcmFtIGV4dHJhQ3JpdCDmlLvmlrnmmrTlh7vlop7luYVcclxuICAgICAqIEBwYXJhbSBhbnRpRXh0cmFDcml0IOmYsuaWueaatOWHu+aKl+aAp1xyXG4gICAgICogQHJldHVybnMg5pyA57uI5pq05Ye75aKe5bmFXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjYWxjRmluYWxFeHRyYUNyaXQoZXh0cmFDcml0Om51bWJlcixhbnRpRXh0cmFDcml0Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIC8vKuacgOe7iOaatOWHu+WinuW5hTrmlLvmlrnmmrTlh7vlop7luYUt6Ziy5pa55pq05Ye75oqX5oCnXHJcbiAgICAgICAgbGV0IGZpbmFsRXh0cmFDcml0PWV4dHJhQ3JpdC1hbnRpRXh0cmFDcml0O1xyXG4gICAgICAgIGlmKGZpbmFsRXh0cmFDcml0PDEuMil7XHJcbiAgICAgICAgICAgIGZpbmFsRXh0cmFDcml0PTEuMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpbmFsRXh0cmFDcml0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDnu4jpmLLlvqE66Ziy5b6h5pa56Ziy5b6h5YqbKu+8iDEt5pS75pa55peg6KeG6Ziy5b6h5q+U546H77yJXHJcbiAgICAgKiBAcGFyYW0gZGVmZW5zZSDpmLLlvqHmlrnpmLLlvqHliptcclxuICAgICAqIEBwYXJhbSBpZ25vcmVSYXRlIOaUu+aWueaXoOinhumYsuW+oeavlOeOh1xyXG4gICAgICogQHJldHVybnMg5pyA57uI6Ziy5b6hXHJcbiAgICAgKi9cclxuICAgICBzdGF0aWMgY2FsY0ZpbmFsRGVmZW5zZShkZWZlbnNlOm51bWJlcixpZ25vcmVSYXRlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIC8v5pyA57uI6Ziy5b6hOumYsuW+oeaWuemYsuW+oeWKmyrvvIgxLeaUu+aWueaXoOinhumYsuW+oe+8iVxyXG4gICAgICAgIGxldCBmaW5hbERlZmVuc2U9ZGVmZW5zZSooMS1pZ25vcmVSYXRlKTtcclxuICAgICAgICBpZihmaW5hbERlZmVuc2U8MCl7XHJcbiAgICAgICAgICAgIGZpbmFsRGVmZW5zZT0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmluYWxEZWZlbnNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYW1hZ2Ug5pyA57uI5Lyk5a6z5YC8XHJcbiAgICAgKiBAcGFyYW0gYmxvb2RSYXRlIOWQuOihgOeOh1xyXG4gICAgICogQHBhcmFtIHpob25nc2hhbmdSYXRlIOmHjeS8pOeOh1xyXG4gICAgICogQHJldHVybnMg5ZC46KGA5YC8XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjYWxjQmxvb2RTdWNraW5nKGRhbWFnZTpudW1iZXIsYmxvb2RSYXRlOm51bWJlcix6aG9uZ3NoYW5nUmF0ZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvL+mAoOaIkOaZruaUu+S8pOWus+aXtu+8jOWPr+S7peaMieavlOS+i+iOt+W+l+aZruaUu+S8pOWus+eahOeUn+WRveWAvO+8m+WQuOihgOWAvD3mma7mlLvlrp7pmYXkvKTlrrMq5ZC46KGA546HKu+8iDEt6YeN5Lyk546H77yJXHJcbiAgICAgICAgbGV0IG51bT1kYW1hZ2UqYmxvb2RSYXRlKigxLXpob25nc2hhbmdSYXRlKTtcclxuICAgICAgICBudW09TWF0aC5yb3VuZChudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpflhbfkvZPnmoTlh4/pgJ/mlbDlgLxcclxuICAgICAqIEBwYXJhbSBiYXNlU3BlZWQg5Z+656GA56e75Yqo6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gc3ViTnVtIOWHj+mAn+aViOaenCVcclxuICAgICAqIEBwYXJhbSByZXNpc3ROdW0g5YeP6YCf5oqX5oCnXHJcbiAgICAgKiBAcGFyYW0gYWRkTnVtIOWKoOmAn+aViOaenFxyXG4gICAgICogQHJldHVybnMg5pyA57uI55qE6YCf5bqmXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjYWxjU2xvd0Rvd25OdW0oYmFzZVNwZWVkOm51bWJlcixzdWJOdW06bnVtYmVyLHJlc2lzdE51bTpudW1iZXIsYWRkTnVtOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIC8v5YeP6YCf5ZCO55qE56e75Yqo6YCf5bqmPeWIneWni+enu+WKqOmAn+W6pirvvIgxK+WKoOmAn+aViOaenC3mlLvlh7vmlrnlh4/pgJ/mlYjmnpwq77yIMS3lj5flh7vmlrnlh4/pgJ/mipfmgKfvvInvvIlcclxuICAgICAgICBsZXQgbnVtPWJhc2VTcGVlZCooKDErYWRkTnVtLXN1Yk51bSkqKDEtcmVzaXN0TnVtKSk7XHJcbiAgICAgICAgaWYobnVtPDApe1xyXG4gICAgICAgICAgICBudW09MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6h566X5YeP6YCf55qE5oyB57ut5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gc3ViTnVtIOWHj+mAn+aViOaenFxyXG4gICAgICogQHBhcmFtIHJlc2lzdE51bSDlh4/pgJ/mipfmgKdcclxuICAgICAqIEBwYXJhbSB0b3VnaG5lc3Mg5Y+X5Ye75pa56Z+n5oCnXHJcbiAgICAgKiBAcGFyYW0gaW5zaWdodCDmlLvlh7vmlrnmtJ7lr59cclxuICAgICAqIEByZXR1cm5zIOacgOe7iOeahOaMgee7reaXtumXtFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2FsY1Nsb3dEb3duVGltZShzdWJOdW06bnVtYmVyLHJlc2lzdE51bTpudW1iZXIsdG91Z2huZXNzOm51bWJlcixpbnNpZ2h0Om51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIC8v5YeP6YCf5ZCO55qE56e75Yqo6YCf5bqmPeWIneWni+enu+WKqOmAn+W6pirvvIgxLeaUu+WHu+aWueWHj+mAn+aViOaenCrvvIgxLeWPl+WHu+aWueWHj+mAn+aKl+aApy3lj5flh7vmlrnpn6fmgKcr5pS75Ye75pa55rSe5a+f77yJ77yJXHJcblxyXG4gICAgICAgIHJldHVybiBzdWJOdW07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+aOp+WItuaXtumXtO+8iOecqeaZleOAgeWHj+mAn++8iVxyXG4gICAgICogQHBhcmFtIHh1YW55dW5UaW1lIOecqeaZleaXtumXtFxyXG4gICAgICogQHBhcmFtIHRvdWdobmVzcyDlj5flh7vmlrnpn6fmgKdcclxuICAgICAqIEBwYXJhbSBpbnNpZ2h0IOaUu+WHu+aWuea0nuWvn+WKm1xyXG4gICAgICogQHJldHVybnMg5pyA57uI55qE55yp5pmV5pe26Ze0XHJcbiAgICAgKi9cclxuICAgICBzdGF0aWMgY2FsY0NvbnRyb2xUaW1lKHh1YW55dW5UaW1lOm51bWJlcix0b3VnaG5lc3M6bnVtYmVyLGluc2lnaHQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgLy/mjqfliLbml7bplb8955yp5pmV5pe26Ze0Ku+8iDEt5Y+X5Ye75pa56Z+n5oCnK+aUu+WHu+aWuea0nuWvn++8ie+8jOaOp+WItuaXtumVv+acgOS9juS4ujAuMeenklxyXG4gICAgICAgIGxldCBudW09eHVhbnl1blRpbWUqKDEtdG91Z2huZXNzK2luc2lnaHQpO1xyXG4gICAgICAgIGlmKG51bTwwLjEpe1xyXG4gICAgICAgICAgICBudW09MC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgfVxyXG59XHJcbi8qKumakOiXj+WxnuaApyAqL1xyXG5leHBvcnQgY2xhc3MgSGlkZGVuQXR0cmlidXRle1xyXG4gICAgLyoq55Sf5ZG95Zue5aSNICovXHJcbiAgICBsaWZlX3JlY292ZXJ5Om51bWJlcj0wO1xyXG4gICAgLyoq56m/6YCP5YC8ICovXHJcbiAgICBwZW5ldHJhdGlvbl92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKuepv+mAj+eOhyAqL1xyXG4gICAgcGVuZXRyYXRpb25fcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKuWQuOihgOeOhyAqL1xyXG4gICAgYmxvb2Rfc3Vja2luZ19yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq6YeN5Lyk546HICovXHJcbiAgICBzZXJpb3VzX2luanVyeV9yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5YeP6YCf5oqX5oCnICovXHJcbiAgICBzbG93X3Jlc2lzdGFuY2U6bnVtYmVyPTA7XHJcbiAgICAvKirpn6fmgKcgKi9cclxuICAgIHRvdWdobmVzczpudW1iZXI9MDtcclxuICAgIC8qKua0nuWvnyAqL1xyXG4gICAgaW5zaWdodDpudW1iZXI9MDtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR29uZ0ppTW9kZXtcclxuICAgIC8qKui/keaImCAqL1xyXG4gICAgTWVsZWU9MSxcclxuICAgIC8qKui/nOeoiyAqL1xyXG4gICAgRmFyPTIsXHJcbn1cclxuLyoq5oCq54mp57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIFN0cmVuZ3RoVHlwZXtcclxuICAgIC8qKuaZrumAmuaAqiAqL1xyXG4gICAgTm9ybWFsPTEsXHJcbiAgICAvKirnsr7oi7HmgKogKi9cclxuICAgIEVsaXRlPTIsXHJcbiAgICAvKirpppbpoobmgKogKi9cclxuICAgIEJvc3M9MyxcclxufVxyXG4vKirmgKrnianmlLvlh7vmlbDmja4gKi9cclxuZXhwb3J0IGNsYXNzIE1vbnN0ZXJBdHREYXRhe1xyXG4gICAgLyoq5piv5ZCm5Li65a2Q5by557G75Z6L55qE5pS75Ye7ICovXHJcbiAgICBpc19idWxsZXQ6Ym9vbGVhbj10cnVlO1xyXG4gICAgLyoq5oCq54mp5bGe5oCnICovXHJcbiAgICBtb25zdGVyX2F0dHJpYnV0ZTpKc29uTW9uc3Rlckdyb3d0aEF0dHJpYnV0ZXM9bnVsbDtcclxuICAgIC8qKuS8pOWus+exu+WeiyAqL1xyXG4gICAgZGFtYWdlX3R5cGU6RGFtYWdlVHlwZT1EYW1hZ2VUeXBlLk5vcm1hbDtcclxuICAgIC8qKuaKgOiDveS8pOWus+avlOeOhyovXHJcbiAgICBza2lsbF9yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5aKe5Lyk546HICovICBcclxuICAgIHplbmdzaGFuZ19yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5oCq54mp5by65bqm57G75Z6LICovXHJcbiAgICBzdHJlbmd0aF90eXBlOlN0cmVuZ3RoVHlwZT1TdHJlbmd0aFR5cGUuTm9ybWFsO1xyXG4gICAgbW9uc3Rlcl90czpNb25zdGVyPW51bGw7XHJcbiAgICAvKirmioDog73pnIflsY/mlYjmnpwgKi9cclxuICAgIGlzX2JpZzpib29sZWFuPXRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb25zdGVyU2tpbGxEYXRhe1xyXG5cclxuICAgIC8qKuWIneWni+WGt+WNtOaXtumXtCAqL1xyXG4gICAgcHVibGljIEluaXRDb2xkRG93bjpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuaKgOiDveWGt+WNtOaXtumXtCAqL1xyXG4gICAgcHVibGljIENvbGREb3duOk1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq5oqA6IO9LeaKgOiDveWPguaVsDEs6I635b6X5YW35L2T5oqA6IO95qe955qE5oqA6IO9MeWPguaVsO+8jOS9v+eUqO+8mlNraWxsVmFsdWVfMS5nZXQoMSkgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzE6TWFwPG51bWJlcixudW1iZXI+ID0gbnVsbCA7XHJcbiAgICAvKirooqvliqjmioDog70t5oqA6IO95Y+C5pWwMiAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfMjpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDvS3mioDog73lj4LmlbAzICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV8zOk1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9LeaKgOiDveWPguaVsDQgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzQ6TWFwPG51bWJlcixudW1iZXI+ID0gbnVsbCA7XHJcblxyXG4gICAgcHVibGljIENhc3RpbmdSYW5nZTpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuaAqueJqemHiuaUvui3neemuyAqL1xyXG4gICAgZ2V0Q2FzdGluZ1JhbmdlKHR5cGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ2FzdGluZ1JhbmdlLmdldCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirmgKrnianmioDog73mioDog73lhrfljbTml7bpl7QgKi9cclxuICAgIGdldFNraWxsQ29sZERvd24odHlwZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5Db2xkRG93bi5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5oCq54mp5oqA6IO95Yid5aeL55qE5oqA6IO95Ya35Y205pe26Ze0ICovXHJcbiAgICBnZXRTa2lsbEluaXRDb2xkRG93bih0eXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLkNvbGREb3duLmdldCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbFZhbHVlMSh0eXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNraWxsVmFsdWVfMS5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2tpbGxWYWx1ZTIodHlwZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5Ta2lsbFZhbHVlXzIuZ2V0KHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNraWxsVmFsdWUzKHR5cGU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU2tpbGxWYWx1ZV8zLmdldCh0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbFZhbHVlNCh0eXBlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNraWxsVmFsdWVfNC5nZXQodHlwZSk7XHJcbiAgICB9XHJcbn0iXX0=