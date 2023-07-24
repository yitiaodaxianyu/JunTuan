"use strict";
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