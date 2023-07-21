
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/HeroConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa1e4Eiz2FIAozenwuZV/P0', 'HeroConfig');
// Scripts/Hero/Game/HeroConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeData = exports.HaloData = exports.HaloId = exports.BuffId = exports.BuffType = exports.BuffStateType = exports.ShieldId = exports.ShieldType = exports.DamageType = exports.BingNvWallData = exports.Hero_State_Name = exports.SkillIndicatorType = exports.Hero_DeBuff = exports.SkillType = exports.FeiBiao_Type = exports.PaoDan_Type = exports.JianShi_Type = exports.GongJi_FangXiang = exports.AttRangeType = exports.Hero_State = exports.Btn_Hero_Type = exports.Hero_Type = exports.SkillTipType = exports.HeroInfo = void 0;
var HeroInfo = /** @class */ (function () {
    function HeroInfo() {
        /**英雄id */
        this.hero_type = Hero_Type.ChangMaoShou;
        /**英雄的等级 */
        this.hero_level = 0;
        /**英雄品质 */
        this.hero_quality = 1;
        /**英雄阶段 */
        this.hero_stage = 0;
        /**绑定的宠物,null表示无绑定 */
        this.pet_id = 0;
        /**专属武器等级 */
        this.exclusive_equip_stage = 0;
        /**装备位1-武器-装备id */
        this.wear1 = 0;
        /**装备位2-护甲-装备id */
        this.wear2 = 0;
        /**装备位3-饰品-装备id */
        this.wear3 = 0;
        /**装备位4-鞋子-装备id */
        this.wear4 = 0;
        /**更换绑定的宠物 */
        // changeBindPet(petInfo:PetInfo){
        //     this.pet_info=petInfo;
        // }        
    }
    return HeroInfo;
}());
exports.HeroInfo = HeroInfo;
var SkillTipType;
(function (SkillTipType) {
    /**全屏 */
    SkillTipType[SkillTipType["Full"] = 0] = "Full";
    /**圆 */
    SkillTipType[SkillTipType["Circle"] = 1] = "Circle";
    /**矩形 */
    SkillTipType[SkillTipType["Rect"] = 2] = "Rect";
    /**方向 */
    SkillTipType[SkillTipType["Dir"] = 3] = "Dir";
})(SkillTipType = exports.SkillTipType || (exports.SkillTipType = {}));
var Hero_Type;
(function (Hero_Type) {
    Hero_Type[Hero_Type["FUYI"] = -1] = "FUYI";
    //没英雄
    Hero_Type[Hero_Type["NULL"] = 0] = "NULL";
    /**长矛手 */
    Hero_Type[Hero_Type["ChangMaoShou"] = 1] = "ChangMaoShou";
    /**兽王 */
    Hero_Type[Hero_Type["ShouWang"] = 2] = "ShouWang";
    /**炮手 */
    Hero_Type[Hero_Type["PaoShou"] = 3] = "PaoShou";
    /**德鲁伊 */
    Hero_Type[Hero_Type["DeLuYi"] = 4] = "DeLuYi";
    /**狂战士 */
    Hero_Type[Hero_Type["KuangZhanShi"] = 5] = "KuangZhanShi";
    /**贞德 */
    Hero_Type[Hero_Type["ZhenDe"] = 6] = "ZhenDe";
    /**女巫 */
    Hero_Type[Hero_Type["NvWu"] = 7] = "NvWu";
    /**弓箭手 */
    Hero_Type[Hero_Type["GongJianShou"] = 8] = "GongJianShou";
    /**冰女 */
    Hero_Type[Hero_Type["BingNv"] = 9] = "BingNv";
    /**阿努比斯 */
    Hero_Type[Hero_Type["ANuBiSi"] = 10] = "ANuBiSi";
    /**魅魔 */
    Hero_Type[Hero_Type["MeiMo"] = 11] = "MeiMo";
    /**雷神 */
    Hero_Type[Hero_Type["LeiShen"] = 12] = "LeiShen";
    Hero_Type[Hero_Type["Hero_Num"] = 13] = "Hero_Num";
})(Hero_Type = exports.Hero_Type || (exports.Hero_Type = {}));
var Btn_Hero_Type;
(function (Btn_Hero_Type) {
    Btn_Hero_Type[Btn_Hero_Type["role"] = 1] = "role";
    Btn_Hero_Type[Btn_Hero_Type["map"] = 2] = "map";
})(Btn_Hero_Type = exports.Btn_Hero_Type || (exports.Btn_Hero_Type = {}));
var Hero_State;
(function (Hero_State) {
    Hero_State[Hero_State["idle"] = 0] = "idle";
    Hero_State[Hero_State["attack"] = 1] = "attack";
    Hero_State[Hero_State["skill"] = 2] = "skill";
    /**退场，此时只隐藏 */
    Hero_State[Hero_State["exit"] = 3] = "exit";
})(Hero_State = exports.Hero_State || (exports.Hero_State = {}));
var AttRangeType;
(function (AttRangeType) {
    AttRangeType[AttRangeType["LuDi"] = 1] = "LuDi";
    AttRangeType[AttRangeType["TianKong"] = 2] = "TianKong";
    AttRangeType[AttRangeType["DunDi"] = 3] = "DunDi";
})(AttRangeType = exports.AttRangeType || (exports.AttRangeType = {}));
var GongJi_FangXiang;
(function (GongJi_FangXiang) {
    GongJi_FangXiang[GongJi_FangXiang["zuo"] = 0] = "zuo";
    GongJi_FangXiang[GongJi_FangXiang["zhong"] = 1] = "zhong";
    GongJi_FangXiang[GongJi_FangXiang["you"] = 2] = "you";
})(GongJi_FangXiang = exports.GongJi_FangXiang || (exports.GongJi_FangXiang = {}));
var JianShi_Type;
(function (JianShi_Type) {
    JianShi_Type[JianShi_Type["putong"] = 0] = "putong";
    JianShi_Type[JianShi_Type["jineng"] = 1] = "jineng";
    JianShi_Type[JianShi_Type["super"] = 2] = "super";
})(JianShi_Type = exports.JianShi_Type || (exports.JianShi_Type = {}));
var PaoDan_Type;
(function (PaoDan_Type) {
    PaoDan_Type[PaoDan_Type["skill"] = 0] = "skill";
    PaoDan_Type[PaoDan_Type["super"] = 1] = "super";
    PaoDan_Type[PaoDan_Type["exclusive"] = 2] = "exclusive";
})(PaoDan_Type = exports.PaoDan_Type || (exports.PaoDan_Type = {}));
var FeiBiao_Type;
(function (FeiBiao_Type) {
    /**被动技能1 */
    FeiBiao_Type[FeiBiao_Type["skill1"] = 0] = "skill1";
    /**专武技能 */
    FeiBiao_Type[FeiBiao_Type["ex_skill"] = 1] = "ex_skill";
})(FeiBiao_Type = exports.FeiBiao_Type || (exports.FeiBiao_Type = {}));
var SkillType;
(function (SkillType) {
    /**空 */
    SkillType[SkillType["Null"] = 0] = "Null";
    /**主动技能 */
    SkillType[SkillType["Active"] = 1] = "Active";
    /**被动技能1 */
    SkillType[SkillType["Passive_1"] = 2] = "Passive_1";
    /**被动技能2 */
    SkillType[SkillType["Passive_2"] = 3] = "Passive_2";
})(SkillType = exports.SkillType || (exports.SkillType = {}));
var Hero_DeBuff;
(function (Hero_DeBuff) {
    /**眩晕 */
    Hero_DeBuff[Hero_DeBuff["XuanYun"] = 1] = "XuanYun";
    /**暴击后普通增伤cd3秒 */
    Hero_DeBuff[Hero_DeBuff["crit_increase_cd_3"] = 2] = "crit_increase_cd_3";
})(Hero_DeBuff = exports.Hero_DeBuff || (exports.Hero_DeBuff = {}));
/**技能指示器类型 */
var SkillIndicatorType;
(function (SkillIndicatorType) {
    /**直线方向类型，只管负责显示方向 */
    SkillIndicatorType[SkillIndicatorType["beeline"] = 0] = "beeline";
    /**目标位置类型，负责显示目标位置和具体的大小 */
    SkillIndicatorType[SkillIndicatorType["target"] = 1] = "target";
})(SkillIndicatorType = exports.SkillIndicatorType || (exports.SkillIndicatorType = {}));
var Hero_State_Name;
(function (Hero_State_Name) {
    /**正面待机 */
    Hero_State_Name["Idle"] = "Idle";
    /**侧面待机 */
    Hero_State_Name["cmdj"] = "cemian_daiji";
    /**攻击 */
    Hero_State_Name["Attack"] = "Attack";
    /**技能 */
    Hero_State_Name["Skill"] = "Skill";
})(Hero_State_Name = exports.Hero_State_Name || (exports.Hero_State_Name = {}));
var BingNvWallData = /** @class */ (function () {
    function BingNvWallData() {
        this.boss_ts = null;
        this.back_monsters = [];
    }
    return BingNvWallData;
}());
exports.BingNvWallData = BingNvWallData;
/**造成的伤害的类型 */
var DamageType;
(function (DamageType) {
    /**普通攻击的伤害 */
    DamageType[DamageType["Normal"] = 1] = "Normal";
    /**主动技能的伤害 */
    DamageType[DamageType["Skill"] = 2] = "Skill";
    /**被动技能的伤害 */
    //船撞的伤害
    DamageType[DamageType["Ship"] = 3] = "Ship";
})(DamageType = exports.DamageType || (exports.DamageType = {}));
var ShieldType;
(function (ShieldType) {
    /**抵消普通攻击的伤害 */
    ShieldType[ShieldType["Normal"] = 1] = "Normal";
    /**抵消技能的伤害 */
    ShieldType[ShieldType["Skill"] = 2] = "Skill";
    /**所有的伤害 */
    ShieldType[ShieldType["All"] = 3] = "All";
})(ShieldType = exports.ShieldType || (exports.ShieldType = {}));
var ShieldId;
(function (ShieldId) {
    /**炮手主动技能 */
    ShieldId[ShieldId["PaoShou_ActiveSkill"] = 1] = "PaoShou_ActiveSkill";
    /**忍者被动技能 */
    ShieldId[ShieldId["RenZhe_Skill2"] = 2] = "RenZhe_Skill2";
    /**测试 */
    ShieldId[ShieldId["Test"] = 3] = "Test";
})(ShieldId = exports.ShieldId || (exports.ShieldId = {}));
/**buff状态类型 */
var BuffStateType;
(function (BuffStateType) {
    BuffStateType[BuffStateType["Null"] = 0] = "Null";
    /**攻击力 */
    BuffStateType[BuffStateType["Attack"] = 1] = "Attack";
    /**攻击速度 */
    BuffStateType[BuffStateType["AttackSpeed"] = 2] = "AttackSpeed";
    /**防御力 */
    BuffStateType[BuffStateType["Defense"] = 3] = "Defense";
    /**生命值 */
    BuffStateType[BuffStateType["Health"] = 4] = "Health";
    /**命中率 */
    BuffStateType[BuffStateType["HitRate"] = 5] = "HitRate";
    /**暴击率 */
    BuffStateType[BuffStateType["CritRate"] = 6] = "CritRate";
    /**暴击增幅 */
    BuffStateType[BuffStateType["ExtraCritical"] = 7] = "ExtraCritical";
    /**闪避 */
    BuffStateType[BuffStateType["Miss"] = 8] = "Miss";
    /**防暴值 */
    BuffStateType[BuffStateType["AntiCritical"] = 9] = "AntiCritical";
    /**暴击抗性 */
    BuffStateType[BuffStateType["AntiExtraCritical"] = 10] = "AntiExtraCritical";
    /**冷却时间*/
    BuffStateType[BuffStateType["ColdTime"] = 11] = "ColdTime";
})(BuffStateType = exports.BuffStateType || (exports.BuffStateType = {}));
/**Buff类型 */
var BuffType;
(function (BuffType) {
    /**普通的 */
    BuffType[BuffType["Normal"] = 0] = "Normal";
    /**眩晕类 */
    BuffType[BuffType["Vertigo"] = 1] = "Vertigo";
    /**捆绑 */
    BuffType[BuffType["Binding"] = 2] = "Binding";
    /**减速 */
    BuffType[BuffType["Slowdown"] = 3] = "Slowdown";
    /**牵引 */
    BuffType[BuffType["Traction"] = 4] = "Traction";
    /**击退 */
    BuffType[BuffType["Knockback"] = 5] = "Knockback";
    /**禁锢 */
    BuffType[BuffType["Confine"] = 6] = "Confine";
    /**buff层数达到条件后爆发类 */
    BuffType[BuffType["Burst"] = 7] = "Burst";
    /**增益类 */
    BuffType[BuffType["Gain"] = 8] = "Gain";
    /**加速（移动速度）类 */
    BuffType[BuffType["MoveSpeedUp"] = 9] = "MoveSpeedUp";
    /**加速（攻击速度）类 */
    BuffType[BuffType["AttSpeedUp"] = 10] = "AttSpeedUp";
    /**重伤类 */
    BuffType[BuffType["SeriouslyInjured"] = 11] = "SeriouslyInjured";
    // /**治疗 */
    // Recovery=7,
})(BuffType = exports.BuffType || (exports.BuffType = {}));
/**所有BUFF/DEBUFF的ID */
var BuffId;
(function (BuffId) {
    BuffId[BuffId["Null"] = 0] = "Null";
    BuffId[BuffId["Hero_XuanYun"] = 10001] = "Hero_XuanYun";
    /**德鲁伊专武-真伤debuff */
    BuffId[BuffId["Hero_DeLuYi_Ex"] = 10401] = "Hero_DeLuYi_Ex";
    /**狂战士大招 */
    BuffId[BuffId["Hero_KuangZhanShi_DaZhao"] = 10501] = "Hero_KuangZhanShi_DaZhao";
    /**贞德被动技能的加暴击率和命中率 */
    BuffId[BuffId["Hero_ZhenDe_BaoJiMingZhongLv"] = 10601] = "Hero_ZhenDe_BaoJiMingZhongLv";
    /**贞德主动技能的加攻速 */
    BuffId[BuffId["Hero_ZhenDe_Gongsu"] = 10602] = "Hero_ZhenDe_Gongsu";
    /**贞德被动技能的加血减伤 */
    BuffId[BuffId["Hero_ZhenDe_JiaXueJianShang"] = 10603] = "Hero_ZhenDe_JiaXueJianShang";
    /**女巫被动1，中毒效果 */
    BuffId[BuffId["Hero_NvWu_Skill1_Zhongdu"] = 10701] = "Hero_NvWu_Skill1_Zhongdu";
    /**女巫主动技能，中伤效果 */
    BuffId[BuffId["Hero_NvWu_Skill1_ZhongShang"] = 10702] = "Hero_NvWu_Skill1_ZhongShang";
    /**女巫专武技能，减攻速效果 */
    BuffId[BuffId["Hero_NvWu_ExSkill_JianGongSu"] = 10703] = "Hero_NvWu_ExSkill_JianGongSu";
    /**长矛手的被动技能技能增伤 */
    BuffId[BuffId["Hero_ChangMaoShow_Skill"] = 10801] = "Hero_ChangMaoShow_Skill";
    /**长矛手的主动技能攻速 */
    BuffId[BuffId["Hero_ChangMaoShow_GongSu"] = 10803] = "Hero_ChangMaoShow_GongSu";
    /**冰女被动减速 */
    BuffId[BuffId["Hero_BingNv_Skill1_JianSu"] = 10901] = "Hero_BingNv_Skill1_JianSu";
    /**阿努比斯被动减速 */
    BuffId[BuffId["Hero_ANuBiSi_Skill1_JianSu"] = 11001] = "Hero_ANuBiSi_Skill1_JianSu";
    /**阿努比斯全屏减速 */
    BuffId[BuffId["Hero_ANuBiSi_Active_Skill_JianSu"] = 11002] = "Hero_ANuBiSi_Active_Skill_JianSu";
    /**魅魔的被动技能攻速 */
    BuffId[BuffId["Hero_MeiMo_GongSu"] = 11101] = "Hero_MeiMo_GongSu";
    /**魅魔的主动技能魅惑 */
    BuffId[BuffId["Hero_MeiMo_Active_MeiHuo"] = 11111] = "Hero_MeiMo_Active_MeiHuo";
    /**魅魔的主动技能魅惑 */
    BuffId[BuffId["Hero_MeiMo_Active_ZhengShang"] = 11112] = "Hero_MeiMo_Active_ZhengShang";
    /**英雄-雷神超负荷效果 */
    BuffId[BuffId["Hero_LeiShen_ChaoFuHe"] = 11201] = "Hero_LeiShen_ChaoFuHe";
    BuffId[BuffId["Monster_XuanYun"] = 20001] = "Monster_XuanYun";
    BuffId[BuffId["Elite68_NiuJiangJun_JiaSu"] = 26801] = "Elite68_NiuJiangJun_JiaSu";
    /**鱼魔移速 */
    BuffId[BuffId["Elite71_FishBully_JiaYiSu"] = 27101] = "Elite71_FishBully_JiaYiSu";
    /**鱼魔攻击速度 */
    BuffId[BuffId["Elite71_FishBully_JiaGongSu"] = 27202] = "Elite71_FishBully_JiaGongSu";
    /**boss模式下，boss通用的受击增伤的debuff效果 */
    BuffId[BuffId["Boss_Mode_JianShang"] = 30001] = "Boss_Mode_JianShang";
    /**boss2（铠甲战士）的免疫普通攻击，免疫控制效果buff */
    BuffId[BuffId["Boss2_MianYi_Attack"] = 30201] = "Boss2_MianYi_Attack";
    /**boss3（冰川雪人）的减攻速buff */
    BuffId[BuffId["Boss3_JIAN_GongSu"] = 30301] = "Boss3_JIAN_GongSu";
    /**boss3（冰川雪人）的免疫控制的buff */
    BuffId[BuffId["Boss3_MianYi_KongZhi"] = 30302] = "Boss3_MianYi_KongZhi";
    /**boss5（牛魔酋长）的鼓舞buff */
    BuffId[BuffId["Boss5_Skill_1_guwu"] = 30501] = "Boss5_Skill_1_guwu";
    /**boss6(泥潭)减攻速 */
    BuffId[BuffId["Boss6_Skill_2_jiangongsu"] = 30601] = "Boss6_Skill_2_jiangongsu";
    /**boss8(沙虫)黏液，持续伤害 */
    BuffId[BuffId["Boss8_Skill_2_shanghai"] = 30801] = "Boss8_Skill_2_shanghai";
    /**boss8(沙虫)黏液，减少攻击力 */
    BuffId[BuffId["Boss8_Skill_2_attack"] = 30802] = "Boss8_Skill_2_attack";
    /**boss8(沙虫)加血 */
    BuffId[BuffId["Boss8_Skill_1_jiaxue"] = 30803] = "Boss8_Skill_1_jiaxue";
    /**boss9(兰博)过载 */
    BuffId[BuffId["Boss9_Skill_1_guozai"] = 30901] = "Boss9_Skill_1_guozai";
    /**boss9(兰博)无敌 */
    BuffId[BuffId["Boss9_Skill_3_widu"] = 30902] = "Boss9_Skill_3_widu";
    /**boss10(熔岩)鼓舞 */
    BuffId[BuffId["Boss10_Skill_3_guwu"] = 31001] = "Boss10_Skill_3_guwu";
    /**boss10(熔岩)狂暴-攻速 */
    BuffId[BuffId["Boss10_Skill_4_kuangbao_gs"] = 31011] = "Boss10_Skill_4_kuangbao_gs";
    /**boss10(熔岩)狂暴-攻击力 */
    BuffId[BuffId["Boss10_Skill_4_kuangbao_gjl"] = 31012] = "Boss10_Skill_4_kuangbao_gjl";
    /**无尽-城墙加血Buff,需要加上自身英雄id，区别id，这样每个英雄都可以加血 */
    BuffId[BuffId["Wall_Endless_Add_hp"] = 40100] = "Wall_Endless_Add_hp";
    BuffId[BuffId["Wall_Tutorial_Add_hp"] = 40200] = "Wall_Tutorial_Add_hp";
    /**冰宠物减速 */
    BuffId[BuffId["Pet1_JianSu"] = 50101] = "Pet1_JianSu";
    /**风宠物加攻速 */
    BuffId[BuffId["Pet3_JiaSu"] = 50301] = "Pet3_JiaSu";
})(BuffId = exports.BuffId || (exports.BuffId = {}));
/**所有的光环id */
var HaloId;
(function (HaloId) {
    HaloId[HaloId["Null"] = 0] = "Null";
    /**精英怪-30-蝙蝠（堕落天使）-的被动光环 */
    HaloId[HaloId["Monster30_BianFu_Skill_Halo"] = 23001] = "Monster30_BianFu_Skill_Halo";
    /**精英怪-69-牛头萨满-被动光环 */
    HaloId[HaloId["Monster69_NiuSaMan_Skill_Halo"] = 26901] = "Monster69_NiuSaMan_Skill_Halo";
    /**精英怪-76-监督者-被动光环 */
    HaloId[HaloId["Monster76_JianDuZhe_Skill_Halo"] = 27601] = "Monster76_JianDuZhe_Skill_Halo";
})(HaloId = exports.HaloId || (exports.HaloId = {}));
var HaloData = /** @class */ (function () {
    function HaloData() {
        /**光环的id */
        this.halo_id = HaloId.Null;
        /**光环的数值 */
        this.halo_value = [];
        /**光环来源,避免同id双光环判断的问题 */
        this.halo_source_uuid = '';
    }
    return HaloData;
}());
exports.HaloData = HaloData;
var AttributeData = /** @class */ (function () {
    function AttributeData() {
        this.Attack = 0;
        /**防御力 */
        this.Defense = 0;
        /**生命值 */
        this.Health = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
        /**普攻增伤% */
        this.attack_increase_damage = 0;
        /**技能伤害增伤 */
        this.skill_increase_damage = 0;
        /**全能伤害增伤 */
        this.all_increase_damage = 0;
        /**减伤值 */
        this.reduce_injury_value = 0;
        /**减伤比率 */
        this.reduce_injury_rate = 0;
        //---------------------------技能数值--------------------------------------
        /**技能冷却时间 */
        this.ColdDown = null;
        /**技能-技能参数1,获得具体技能槽的技能1参数，使用：SkillValue_1.get(1) */
        this.SkillValue_x = null;
        /**被动技能-技能参数2 */
        this.SkillValue_y = null;
        /**被动技能-技能参数3 */
        this.SkillValue_z = null;
        /**被动技能-技能参数4 */
        this.SkillValue_4 = null;
        /**技能是否解锁 */
        this.unlock_state = null;
        //---------------------------隐藏属性------------------------------------------
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
    return AttributeData;
}());
exports.AttributeData = AttributeData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyb0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO1FBQ0ksVUFBVTtRQUNWLGNBQVMsR0FBVyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQzNDLFdBQVc7UUFDWCxlQUFVLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLFVBQVU7UUFDVixpQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixVQUFVO1FBQ1YsZUFBVSxHQUFVLENBQUMsQ0FBQztRQUN0QixxQkFBcUI7UUFDckIsV0FBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixZQUFZO1FBQ1osMEJBQXFCLEdBQVUsQ0FBQyxDQUFDO1FBQ2pDLGtCQUFrQjtRQUNsQixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ2Ysa0JBQWtCO1FBQ2xCLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDZixrQkFBa0I7UUFDbEIsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUNmLGtCQUFrQjtRQUNsQixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBRWYsYUFBYTtRQUNiLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsWUFBWTtJQUNoQixDQUFDO0lBQUQsZUFBQztBQUFELENBMUJBLEFBMEJDLElBQUE7QUExQlksNEJBQVE7QUE0QnJCLElBQVksWUFTWDtBQVRELFdBQVksWUFBWTtJQUNwQixRQUFRO0lBQ1IsK0NBQU0sQ0FBQTtJQUNOLE9BQU87SUFDUCxtREFBUSxDQUFBO0lBQ1IsUUFBUTtJQUNSLCtDQUFNLENBQUE7SUFDTixRQUFRO0lBQ1IsNkNBQUssQ0FBQTtBQUNULENBQUMsRUFUVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQVN2QjtBQUVELElBQVksU0ErQlg7QUEvQkQsV0FBWSxTQUFTO0lBRWpCLDBDQUFPLENBQUE7SUFDUCxLQUFLO0lBQ0wseUNBQU0sQ0FBQTtJQUNOLFNBQVM7SUFDVCx5REFBYyxDQUFBO0lBQ2QsUUFB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QUM7UUFDdEMsWUFBWTtRQUNMLHdCQUFtQixHQUFRLENBQUMsQ0FBQztRQUNwQyxTQUFTO1FBQ0Ysd0JBQW1CLEdBQVEsQ0FBQyxDQUFDO1FBQ3BDLFVBQVU7UUFDSCx1QkFBa0IsR0FBUSxDQUFDLENBQUM7UUFDbEMsdUVBQXVFO1FBQ3hFLFlBQVk7UUFDTCxhQUFRLEdBQXNCLElBQUksQ0FBRTtRQUMzQyxtREFBbUQ7UUFDNUMsaUJBQVksR0FBc0IsSUFBSSxDQUFFO1FBQy9DLGdCQUFnQjtRQUNULGlCQUFZLEdBQXNCLElBQUksQ0FBRTtRQUMvQyxnQkFBZ0I7UUFDVCxpQkFBWSxHQUFzQixJQUFJLENBQUU7UUFDL0MsZ0JBQWdCO1FBQ1QsaUJBQVksR0FBc0IsSUFBSSxDQUFFO1FBQy9DLFlBQVk7UUFDTCxpQkFBWSxHQUF1QixJQUFJLENBQUU7UUFDaEQsMkVBQTJFO1FBQzNFLFVBQVU7UUFDVixrQkFBYSxHQUFRLENBQUMsQ0FBQztRQUN2QixTQUFTO1FBQ1Qsc0JBQWlCLEdBQVEsQ0FBQyxDQUFDO1FBQzNCLFNBQVM7UUFDVCxxQkFBZ0IsR0FBUSxDQUFDLENBQUM7UUFDMUIsU0FBUztRQUNULHVCQUFrQixHQUFRLENBQUMsQ0FBQztRQUM1QixTQUFTO1FBQ1Qsd0JBQW1CLEdBQVEsQ0FBQyxDQUFDO1FBQzdCLFVBQVU7UUFDVixvQkFBZSxHQUFRLENBQUMsQ0FBQztRQUN6QixRQUFRO1FBQ1IsY0FBUyxHQUFRLENBQUMsQ0FBQztRQUNuQixRQUFRO1FBQ1IsWUFBTyxHQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQTNEQSxBQTJEQyxJQUFBO0FBM0RZLHNDQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vbnN0ZXIgZnJvbSBcIi4uLy4uL01vbnN0ZXIvTW9uc3RlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhlcm9JbmZve1xyXG4gICAgLyoq6Iux6ZuEaWQgKi9cclxuICAgIGhlcm9fdHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLkNoYW5nTWFvU2hvdTtcclxuICAgIC8qKuiLsembhOeahOetiee6pyAqL1xyXG4gICAgaGVyb19sZXZlbDpudW1iZXI9MDtcclxuICAgIC8qKuiLsembhOWTgei0qCAqL1xyXG4gICAgaGVyb19xdWFsaXR5Om51bWJlcj0xO1xyXG4gICAgLyoq6Iux6ZuE6Zi25q61ICovXHJcbiAgICBoZXJvX3N0YWdlOm51bWJlciA9IDA7XHJcbiAgICAvKirnu5HlrprnmoTlrqDniaksbnVsbOihqOekuuaXoOe7keWumiAqL1xyXG4gICAgcGV0X2lkOm51bWJlcj0wO1xyXG4gICAgLyoq5LiT5bGe5q2m5Zmo562J57qnICovXHJcbiAgICBleGNsdXNpdmVfZXF1aXBfc3RhZ2U6bnVtYmVyID0gMDtcclxuICAgIC8qKuijheWkh+S9jTEt5q2m5ZmoLeijheWkh2lkICovXHJcbiAgICB3ZWFyMTpudW1iZXI9MDtcclxuICAgIC8qKuijheWkh+S9jTIt5oqk55SyLeijheWkh2lkICovXHJcbiAgICB3ZWFyMjpudW1iZXI9MDtcclxuICAgIC8qKuijheWkh+S9jTMt6aWw5ZOBLeijheWkh2lkICovXHJcbiAgICB3ZWFyMzpudW1iZXI9MDtcclxuICAgIC8qKuijheWkh+S9jTQt6Z6L5a2QLeijheWkh2lkICovXHJcbiAgICB3ZWFyNDpudW1iZXI9MDtcclxuXHJcbiAgICAvKirmm7TmjaLnu5HlrprnmoTlrqDniakgKi9cclxuICAgIC8vIGNoYW5nZUJpbmRQZXQocGV0SW5mbzpQZXRJbmZvKXtcclxuICAgIC8vICAgICB0aGlzLnBldF9pbmZvPXBldEluZm87XHJcbiAgICAvLyB9ICAgICAgICBcclxufVxyXG4gICAgXHJcbmV4cG9ydCBlbnVtIFNraWxsVGlwVHlwZXtcclxuICAgIC8qKuWFqOWxjyAqL1xyXG4gICAgRnVsbD0wLFxyXG4gICAgLyoq5ZyGICovXHJcbiAgICBDaXJjbGU9MSxcclxuICAgIC8qKuefqeW9oiAqL1xyXG4gICAgUmVjdD0yLFxyXG4gICAgLyoq5pa55ZCRICovXHJcbiAgICBEaXI9MyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSGVyb19UeXBlXHJcbntcclxuICAgIEZVWUk9LTEsXHJcbiAgICAvL+ayoeiLsembhFxyXG4gICAgTlVMTD0wLFxyXG4gICAgLyoq6ZW/55+b5omLICovXHJcbiAgICBDaGFuZ01hb1Nob3U9MSxcclxuICAgIC8qKuWFveeOiyAqL1xyXG4gICAgU2hvdVdhbmcsXHJcbiAgICAvKirngq7miYsgKi9cclxuICAgIFBhb1Nob3UsXHJcbiAgICAvKirlvrfpsoHkvIogKi9cclxuICAgIERlTHVZaSxcclxuICAgIC8qKueLguaImOWjqyAqL1xyXG4gICAgS3VhbmdaaGFuU2hpLFxyXG4gICAgLyoq6LSe5b63ICovXHJcbiAgICBaaGVuRGUsXHJcbiAgICAvKirlpbPlt6sgKi9cclxuICAgIE52V3UsXHJcbiAgICAvKirlvJPnrq3miYsgKi9cclxuICAgIEdvbmdKaWFuU2hvdSxcclxuICAgIC8qKuWGsOWlsyAqL1xyXG4gICAgQmluZ052LFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pavICovXHJcbiAgICBBTnVCaVNpLFxyXG4gICAgLyoq6a2F6a2UICovXHJcbiAgICBNZWlNbyxcclxuICAgIC8qKumbt+elniAqL1xyXG4gICAgTGVpU2hlbixcclxuXHJcbiAgICBIZXJvX051bVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCdG5fSGVyb19UeXBle1xyXG4gICAgcm9sZT0xLFxyXG4gICAgbWFwPTIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEhlcm9fU3RhdGVcclxue1xyXG4gICAgaWRsZT0wLFxyXG4gICAgYXR0YWNrPTEsXHJcbiAgICBza2lsbD0yLFxyXG4gICAgLyoq6YCA5Zy677yM5q2k5pe25Y+q6ZqQ6JePICovXHJcbiAgICBleGl0PTMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEF0dFJhbmdlVHlwZVxyXG57XHJcbiAgICBMdURpPTEsXHJcbiAgICBUaWFuS29uZz0yLFxyXG4gICAgRHVuRGk9MyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR29uZ0ppX0ZhbmdYaWFuZ1xyXG57XHJcbiAgICB6dW89MCxcclxuICAgIHpob25nPTEsXHJcbiAgICB5b3U9MixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSmlhblNoaV9UeXBlXHJcbntcclxuICAgIHB1dG9uZz0wLFxyXG4gICAgamluZW5nPTEsXHJcbiAgICBzdXBlcj0yLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBQYW9EYW5fVHlwZVxyXG57XHJcbiAgICBza2lsbD0wLFxyXG4gICAgc3VwZXI9MSxcclxuICAgIGV4Y2x1c2l2ZT0yLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBGZWlCaWFvX1R5cGVcclxue1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9MSAqL1xyXG4gICAgc2tpbGwxPTAsXHJcbiAgICAvKirkuJPmrabmioDog70gKi9cclxuICAgIGV4X3NraWxsPTEsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNraWxsVHlwZXtcclxuICAgIC8qKuepuiAqL1xyXG4gICAgTnVsbD0wLFxyXG4gICAgLyoq5Li75Yqo5oqA6IO9ICovXHJcbiAgICBBY3RpdmU9MSxcclxuICAgIC8qKuiiq+WKqOaKgOiDvTEgKi9cclxuICAgIFBhc3NpdmVfMT0yLFxyXG4gICAgLyoq6KKr5Yqo5oqA6IO9MiAqL1xyXG4gICAgUGFzc2l2ZV8yPTMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEhlcm9fRGVCdWZme1xyXG4gICAgLyoq55yp5pmVICovXHJcbiAgICBYdWFuWXVuPTEsXHJcbiAgICAvKirmmrTlh7vlkI7mma7pgJrlop7kvKRjZDPnp5IgKi9cclxuICAgIGNyaXRfaW5jcmVhc2VfY2RfMz0yLFxyXG5cclxufVxyXG4vKirmioDog73mjIfnpLrlmajnsbvlnosgKi9cclxuZXhwb3J0IGVudW0gU2tpbGxJbmRpY2F0b3JUeXBle1xyXG4gICAgLyoq55u057q/5pa55ZCR57G75Z6L77yM5Y+q566h6LSf6LSj5pi+56S65pa55ZCRICovXHJcbiAgICBiZWVsaW5lPTAsXHJcbiAgICAvKirnm67moIfkvY3nva7nsbvlnovvvIzotJ/otKPmmL7npLrnm67moIfkvY3nva7lkozlhbfkvZPnmoTlpKflsI8gKi9cclxuICAgIHRhcmdldCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSGVyb19TdGF0ZV9OYW1lXHJcbntcclxuICAgIC8qKuato+mdouW+heacuiAqL1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgLyoq5L6n6Z2i5b6F5py6ICovXHJcbiAgICBjbWRqID0gXCJjZW1pYW5fZGFpamlcIiwgICAgICAgICAgLy8tLSDkvqfpnaLlvoXmnLpcclxuICAgIC8qKuaUu+WHuyAqL1xyXG4gICAgQXR0YWNrID0gXCJBdHRhY2tcIiwgICAgICAgICAgICAgLy8tLSDmraPpnaLmlLvlh7tcclxuICAgIC8qKuaKgOiDvSAqL1xyXG4gICAgU2tpbGwgPSBcIlNraWxsXCIsICAgICAgICAgICAgICAgIC8vLS0g5L6n6Z2i5pS75Ye7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmluZ052V2FsbERhdGF7XHJcbiAgICBib3NzX3RzOk1vbnN0ZXI9bnVsbDtcclxuICAgIGJhY2tfbW9uc3RlcnM6Y2MuTm9kZVtdPVtdO1xyXG59XHJcblxyXG4vKirpgKDmiJDnmoTkvKTlrrPnmoTnsbvlnosgKi9cclxuZXhwb3J0IGVudW0gRGFtYWdlVHlwZXtcclxuICAgIC8qKuaZrumAmuaUu+WHu+eahOS8pOWusyAqL1xyXG4gICAgTm9ybWFsPTEsXHJcbiAgICAvKirkuLvliqjmioDog73nmoTkvKTlrrMgKi9cclxuICAgIFNraWxsLFxyXG4gICAgLyoq6KKr5Yqo5oqA6IO955qE5Lyk5a6zICovXHJcblxyXG4gICAgLy/oiLnmkp7nmoTkvKTlrrNcclxuICAgIFNoaXBcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2hpZWxkVHlwZXtcclxuICAgIC8qKuaKtea2iOaZrumAmuaUu+WHu+eahOS8pOWusyAqL1xyXG4gICAgTm9ybWFsPTEsXHJcbiAgICAvKirmirXmtojmioDog73nmoTkvKTlrrMgKi9cclxuICAgIFNraWxsLCAgICBcclxuICAgIC8qKuaJgOacieeahOS8pOWusyAqL1xyXG4gICAgQWxsLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBTaGllbGRJZHtcclxuICAgIC8qKueCruaJi+S4u+WKqOaKgOiDvSAqL1xyXG4gICAgUGFvU2hvdV9BY3RpdmVTa2lsbD0xLFxyXG4gICAgLyoq5b+N6ICF6KKr5Yqo5oqA6IO9ICovXHJcbiAgICBSZW5aaGVfU2tpbGwyPTIsXHJcblxyXG4gICAgLyoq5rWL6K+VICovXHJcbiAgICBUZXN0LFxyXG59XHJcbi8qKmJ1ZmbnirbmgIHnsbvlnosgKi9cclxuZXhwb3J0IGVudW0gQnVmZlN0YXRlVHlwZXtcclxuICAgIE51bGw9MCxcclxuICAgIC8qKuaUu+WHu+WKmyAqL1xyXG4gICAgQXR0YWNrPTEsXHJcbiAgICAvKirmlLvlh7vpgJ/luqYgKi9cclxuICAgIEF0dGFja1NwZWVkLCAgICBcclxuICAgIC8qKumYsuW+oeWKmyAqL1xyXG4gICAgRGVmZW5zZSxcclxuICAgIC8qKueUn+WRveWAvCAqL1xyXG4gICAgSGVhbHRoLFxyXG4gICAgLyoq5ZG95Lit546HICovXHJcbiAgICBIaXRSYXRlLFxyXG4gICAgLyoq5pq05Ye7546HICovXHJcbiAgICBDcml0UmF0ZSxcclxuICAgIC8qKuaatOWHu+WinuW5hSAqL1xyXG4gICAgRXh0cmFDcml0aWNhbCxcclxuICAgIC8qKumXqumBvyAqL1xyXG4gICAgTWlzcyxcclxuICAgIC8qKumYsuaatOWAvCAqL1xyXG4gICAgQW50aUNyaXRpY2FsLFxyXG4gICAgLyoq5pq05Ye75oqX5oCnICovXHJcbiAgICBBbnRpRXh0cmFDcml0aWNhbCxcclxuICAgIC8qKuWGt+WNtOaXtumXtCovXHJcbiAgICBDb2xkVGltZSxcclxufVxyXG4vKipCdWZm57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIEJ1ZmZUeXBle1xyXG4gICAgLyoq5pmu6YCa55qEICovXHJcbiAgICBOb3JtYWw9MCxcclxuICAgIC8qKuecqeaZleexuyAqL1xyXG4gICAgVmVydGlnbz0xLFxyXG4gICAgLyoq5o2G57uRICovXHJcbiAgICBCaW5kaW5nPTIsXHJcbiAgICAvKirlh4/pgJ8gKi9cclxuICAgIFNsb3dkb3duPTMsXHJcbiAgICAvKirnibXlvJUgKi9cclxuICAgIFRyYWN0aW9uPTQsXHJcbiAgICAvKirlh7vpgIAgKi9cclxuICAgIEtub2NrYmFjaz01LFxyXG4gICAgLyoq56aB6ZSiICovXHJcbiAgICBDb25maW5lPTYsXHJcbiAgICAvKipidWZm5bGC5pWw6L6+5Yiw5p2h5Lu25ZCO54iG5Y+R57G7ICovXHJcbiAgICBCdXJzdD03LFxyXG4gICAgLyoq5aKe55uK57G7ICovXHJcbiAgICBHYWluPTgsXHJcbiAgICAvKirliqDpgJ/vvIjnp7vliqjpgJ/luqbvvInnsbsgKi9cclxuICAgIE1vdmVTcGVlZFVwPTksXHJcbiAgICAvKirliqDpgJ/vvIjmlLvlh7vpgJ/luqbvvInnsbsgKi9cclxuICAgIEF0dFNwZWVkVXA9MTAsXHJcbiAgICAvKirph43kvKTnsbsgKi9cclxuICAgIFNlcmlvdXNseUluanVyZWQ9MTEsXHJcbiAgICAvLyAvKirmsrvnlpcgKi9cclxuICAgIC8vIFJlY292ZXJ5PTcsXHJcbn1cclxuXHJcbi8qKuaJgOaciUJVRkYvREVCVUZG55qESUQgKi9cclxuZXhwb3J0IGVudW0gQnVmZklke1xyXG4gICAgTnVsbD0wLFxyXG4gICAgSGVyb19YdWFuWXVuPTEwMDAxLFxyXG4gICAgLyoq5b636bKB5LyK5LiT5q2mLeecn+S8pGRlYnVmZiAqL1xyXG4gICAgSGVyb19EZUx1WWlfRXg9MTA0MDEsXHJcbiAgICAvKirni4LmiJjlo6vlpKfmi5sgKi9cclxuICAgIEhlcm9fS3VhbmdaaGFuU2hpX0RhWmhhbz0xMDUwMSxcclxuICAgIC8qKui0nuW+t+iiq+WKqOaKgOiDveeahOWKoOaatOWHu+eOh+WSjOWRveS4reeOhyAqL1xyXG4gICAgSGVyb19aaGVuRGVfQmFvSmlNaW5nWmhvbmdMdj0xMDYwMSxcclxuICAgIC8qKui0nuW+t+S4u+WKqOaKgOiDveeahOWKoOaUu+mAnyAqL1xyXG4gICAgSGVyb19aaGVuRGVfR29uZ3N1PTEwNjAyLFxyXG4gICAgLyoq6LSe5b636KKr5Yqo5oqA6IO955qE5Yqg6KGA5YeP5LykICovXHJcbiAgICBIZXJvX1poZW5EZV9KaWFYdWVKaWFuU2hhbmc9MTA2MDMsXHJcbiAgICAvKirlpbPlt6vooqvliqgx77yM5Lit5q+S5pWI5p6cICovXHJcbiAgICBIZXJvX052V3VfU2tpbGwxX1pob25nZHU9MTA3MDEsXHJcbiAgICAvKirlpbPlt6vkuLvliqjmioDog73vvIzkuK3kvKTmlYjmnpwgKi9cclxuICAgIEhlcm9fTnZXdV9Ta2lsbDFfWmhvbmdTaGFuZz0xMDcwMixcclxuICAgIC8qKuWls+W3q+S4k+atpuaKgOiDve+8jOWHj+aUu+mAn+aViOaenCAqL1xyXG4gICAgSGVyb19Odld1X0V4U2tpbGxfSmlhbkdvbmdTdT0xMDcwMyxcclxuICAgIC8qKumVv+efm+aJi+eahOiiq+WKqOaKgOiDveaKgOiDveWinuS8pCAqL1xyXG4gICAgSGVyb19DaGFuZ01hb1Nob3dfU2tpbGw9MTA4MDEsXHJcbiAgICAvKirplb/nn5vmiYvnmoTkuLvliqjmioDog73mlLvpgJ8gKi9cclxuICAgIEhlcm9fQ2hhbmdNYW9TaG93X0dvbmdTdT0xMDgwMyxcclxuICAgIC8qKuWGsOWls+iiq+WKqOWHj+mAnyAqL1xyXG4gICAgSGVyb19CaW5nTnZfU2tpbGwxX0ppYW5TdT0xMDkwMSxcclxuICAgIC8qKumYv+WKquavlOaWr+iiq+WKqOWHj+mAnyAqL1xyXG4gICAgSGVyb19BTnVCaVNpX1NraWxsMV9KaWFuU3U9MTEwMDEsXHJcbiAgICAvKirpmL/liqrmr5Tmlq/lhajlsY/lh4/pgJ8gKi9cclxuICAgIEhlcm9fQU51QmlTaV9BY3RpdmVfU2tpbGxfSmlhblN1PTExMDAyLFxyXG4gICAgLyoq6a2F6a2U55qE6KKr5Yqo5oqA6IO95pS76YCfICovXHJcbiAgICBIZXJvX01laU1vX0dvbmdTdT0xMTEwMSxcclxuICAgIC8qKumthemtlOeahOS4u+WKqOaKgOiDvemtheaDkSAqL1xyXG4gICAgSGVyb19NZWlNb19BY3RpdmVfTWVpSHVvPTExMTExLFxyXG4gICAgLyoq6a2F6a2U55qE5Li75Yqo5oqA6IO96a2F5oORICovXHJcbiAgICBIZXJvX01laU1vX0FjdGl2ZV9aaGVuZ1NoYW5nPTExMTEyLFxyXG4gICAgLyoq6Iux6ZuELembt+elnui2hei0n+iNt+aViOaenCAqL1xyXG4gICAgSGVyb19MZWlTaGVuX0NoYW9GdUhlPTExMjAxLFxyXG4gICAgTW9uc3Rlcl9YdWFuWXVuPTIwMDAxLFxyXG4gICAgRWxpdGU2OF9OaXVKaWFuZ0p1bl9KaWFTdT0yNjgwMSxcclxuICAgIC8qKumxvOmtlOenu+mAnyAqL1xyXG4gICAgRWxpdGU3MV9GaXNoQnVsbHlfSmlhWWlTdT0yNzEwMSxcclxuICAgIC8qKumxvOmtlOaUu+WHu+mAn+W6piAqL1xyXG4gICAgRWxpdGU3MV9GaXNoQnVsbHlfSmlhR29uZ1N1PTI3MjAyLFxyXG4gICAgLyoqYm9zc+aooeW8j+S4i++8jGJvc3PpgJrnlKjnmoTlj5flh7vlop7kvKTnmoRkZWJ1ZmbmlYjmnpwgKi9cclxuICAgIEJvc3NfTW9kZV9KaWFuU2hhbmc9MzAwMDEsXHJcbiAgICAvKipib3NzMu+8iOmToOeUsuaImOWjq++8ieeahOWFjeeWq+aZrumAmuaUu+WHu++8jOWFjeeWq+aOp+WItuaViOaenGJ1ZmYgKi9cclxuICAgIEJvc3MyX01pYW5ZaV9BdHRhY2s9MzAyMDEsXHJcbiAgICAvKipib3NzM++8iOWGsOW3nembquS6uu+8ieeahOWHj+aUu+mAn2J1ZmYgKi9cclxuICAgIEJvc3MzX0pJQU5fR29uZ1N1PTMwMzAxLFxyXG4gICAgLyoqYm9zczPvvIjlhrDlt53pm6rkurrvvInnmoTlhY3nlqvmjqfliLbnmoRidWZmICovXHJcbiAgICBCb3NzM19NaWFuWWlfS29uZ1poaT0zMDMwMixcclxuICAgIC8qKmJvc3M177yI54mb6a2U6YWL6ZW/77yJ55qE6byT6IieYnVmZiAqL1xyXG4gICAgQm9zczVfU2tpbGxfMV9ndXd1PTMwNTAxLFxyXG4gICAgLyoqYm9zczYo5rOl5r2tKeWHj+aUu+mAnyAqL1xyXG4gICAgQm9zczZfU2tpbGxfMl9qaWFuZ29uZ3N1PTMwNjAxLFxyXG4gICAgLyoqYm9zczgo5rKZ6JmrKem7j+a2su+8jOaMgee7reS8pOWusyAqL1xyXG4gICAgQm9zczhfU2tpbGxfMl9zaGFuZ2hhaT0zMDgwMSxcclxuICAgIC8qKmJvc3M4KOaymeiZqynpu4/mtrLvvIzlh4/lsJHmlLvlh7vlipsgKi9cclxuICAgIEJvc3M4X1NraWxsXzJfYXR0YWNrPTMwODAyLFxyXG4gICAgLyoqYm9zczgo5rKZ6JmrKeWKoOihgCAqL1xyXG4gICAgQm9zczhfU2tpbGxfMV9qaWF4dWU9MzA4MDMsXHJcbiAgICAvKipib3NzOSjlhbDljZop6L+H6L29ICovXHJcbiAgICBCb3NzOV9Ta2lsbF8xX2d1b3phaT0zMDkwMSxcclxuICAgIC8qKmJvc3M5KOWFsOWNminml6DmlYwgKi9cclxuICAgIEJvc3M5X1NraWxsXzNfd2lkdT0zMDkwMixcclxuICAgIC8qKmJvc3MxMCjnhpTlsqkp6byT6IieICovXHJcbiAgICBCb3NzMTBfU2tpbGxfM19ndXd1PTMxMDAxLFxyXG4gICAgLyoqYm9zczEwKOeGlOWyqSnni4LmmrQt5pS76YCfICovXHJcbiAgICBCb3NzMTBfU2tpbGxfNF9rdWFuZ2Jhb19ncz0zMTAxMSxcclxuICAgIC8qKmJvc3MxMCjnhpTlsqkp54uC5pq0LeaUu+WHu+WKmyAqL1xyXG4gICAgQm9zczEwX1NraWxsXzRfa3VhbmdiYW9fZ2psPTMxMDEyLFxyXG4gICAgLyoq5peg5bC9LeWfjuWimeWKoOihgEJ1ZmYs6ZyA6KaB5Yqg5LiK6Ieq6Lqr6Iux6ZuEaWTvvIzljLrliKtpZO+8jOi/meagt+avj+S4quiLsembhOmDveWPr+S7peWKoOihgCAqL1xyXG4gICAgV2FsbF9FbmRsZXNzX0FkZF9ocD00MDEwMCxcclxuICAgIFdhbGxfVHV0b3JpYWxfQWRkX2hwPTQwMjAwLFxyXG4gICAgLyoq5Yaw5a6g54mp5YeP6YCfICovXHJcbiAgICBQZXQxX0ppYW5TdT01MDEwMSxcclxuICAgIC8qKumjjuWuoOeJqeWKoOaUu+mAnyAqL1xyXG4gICAgUGV0M19KaWFTdT01MDMwMSxcclxufVxyXG5cclxuLyoq5omA5pyJ55qE5YWJ546vaWQgKi9cclxuZXhwb3J0IGVudW0gSGFsb0lke1xyXG4gICAgTnVsbD0wLFxyXG4gICAgLyoq57K+6Iux5oCqLTMwLeidmeidoO+8iOWgleiQveWkqeS9v++8iS3nmoTooqvliqjlhYnnjq8gKi9cclxuICAgIE1vbnN0ZXIzMF9CaWFuRnVfU2tpbGxfSGFsbz0yMzAwMSxcclxuICAgIC8qKueyvuiLseaAqi02OS3niZvlpLTokKjmu6Et6KKr5Yqo5YWJ546vICovXHJcbiAgICBNb25zdGVyNjlfTml1U2FNYW5fU2tpbGxfSGFsbz0yNjkwMSxcclxuICAgIC8qKueyvuiLseaAqi03Ni3nm5HnnaPogIUt6KKr5Yqo5YWJ546vICovXHJcbiAgICBNb25zdGVyNzZfSmlhbkR1WmhlX1NraWxsX0hhbG89Mjc2MDEsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYWxvRGF0YXtcclxuICAgIC8qKuWFieeOr+eahGlkICovXHJcbiAgICBoYWxvX2lkOkhhbG9JZD1IYWxvSWQuTnVsbDtcclxuICAgIC8qKuWFieeOr+eahOaVsOWAvCAqL1xyXG4gICAgaGFsb192YWx1ZTpudW1iZXJbXT1bXTtcclxuICAgIC8qKuWFieeOr+adpea6kCzpgb/lhY3lkIxpZOWPjOWFieeOr+WIpOaWreeahOmXrumimCAqL1xyXG4gICAgaGFsb19zb3VyY2VfdXVpZDpzdHJpbmc9Jyc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGVEYXRhe1xyXG4gICAgXHJcbiAgICBwdWJsaWMgQXR0YWNrOm51bWJlcj0wO1xyXG4gICAgLyoq6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgRGVmZW5zZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKueUn+WRveWAvCAqL1xyXG4gICAgcHVibGljIEhlYWx0aDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWRveS4reWAvCAqL1xyXG4gICAgcHVibGljIEhpdDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumXqumBv+WAvCAqL1xyXG4gICAgcHVibGljIE1pc3M6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vlgLwgKi9cclxuICAgIHB1YmxpYyBDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+WinuW5hSAqL1xyXG4gICAgcHVibGljIEV4dHJhQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpmLLmmrTlgLwgKi9cclxuICAgIHB1YmxpYyBBbnRpQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vmipfmgKcgKi9cclxuICAgIHB1YmxpYyBBbnRpRXh0cmFDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaZruaUu+WinuS8pCUgKi8gICAgXHJcbiAgICBwdWJsaWMgYXR0YWNrX2luY3JlYXNlX2RhbWFnZTpudW1iZXI9MDtcclxuICAgIC8qKuaKgOiDveS8pOWus+WinuS8pCAqL1xyXG4gICAgcHVibGljIHNraWxsX2luY3JlYXNlX2RhbWFnZTpudW1iZXI9MDtcclxuICAgIC8qKuWFqOiDveS8pOWus+WinuS8pCAqL1xyXG4gICAgcHVibGljIGFsbF9pbmNyZWFzZV9kYW1hZ2U6bnVtYmVyPTA7XHJcbiAgICAvKirlh4/kvKTlgLwgKi9cclxuICAgIHB1YmxpYyByZWR1Y2VfaW5qdXJ5X3ZhbHVlOm51bWJlcj0wO1xyXG4gICAgLyoq5YeP5Lyk5q+U546HICovXHJcbiAgICBwdWJsaWMgcmVkdWNlX2luanVyeV9yYXRlOm51bWJlcj0wO1xyXG4gICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5oqA6IO95pWw5YC8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKuaKgOiDveWGt+WNtOaXtumXtCAqL1xyXG4gICAgcHVibGljIENvbGREb3duOk1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq5oqA6IO9LeaKgOiDveWPguaVsDEs6I635b6X5YW35L2T5oqA6IO95qe955qE5oqA6IO9MeWPguaVsO+8jOS9v+eUqO+8mlNraWxsVmFsdWVfMS5nZXQoMSkgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlX3g6TWFwPG51bWJlcixudW1iZXI+ID0gbnVsbCA7XHJcbiAgICAvKirooqvliqjmioDog70t5oqA6IO95Y+C5pWwMiAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfeTpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDvS3mioDog73lj4LmlbAzICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV96Ok1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9LeaKgOiDveWPguaVsDQgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlXzQ6TWFwPG51bWJlcixudW1iZXI+ID0gbnVsbCA7XHJcbiAgICAvKirmioDog73mmK/lkKbop6PplIEgKi9cclxuICAgIHB1YmxpYyB1bmxvY2tfc3RhdGU6TWFwPG51bWJlcixib29sZWFuPiA9IG51bGwgO1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3pmpDol4/lsZ7mgKctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKueUn+WRveWbnuWkjSAqL1xyXG4gICAgbGlmZV9yZWNvdmVyeTpudW1iZXI9MDtcclxuICAgIC8qKuepv+mAj+WAvCAqL1xyXG4gICAgcGVuZXRyYXRpb25fdmFsdWU6bnVtYmVyPTA7XHJcbiAgICAvKirnqb/pgI/njocgKi9cclxuICAgIHBlbmV0cmF0aW9uX3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirlkLjooYDnjocgKi9cclxuICAgIGJsb29kX3N1Y2tpbmdfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKumHjeS8pOeOhyAqL1xyXG4gICAgc2VyaW91c19pbmp1cnlfcmF0ZTpudW1iZXI9MDtcclxuICAgIC8qKuWHj+mAn+aKl+aApyAqL1xyXG4gICAgc2xvd19yZXNpc3RhbmNlOm51bWJlcj0wO1xyXG4gICAgLyoq6Z+n5oCnICovXHJcbiAgICB0b3VnaG5lc3M6bnVtYmVyPTA7XHJcbiAgICAvKirmtJ7lr58gKi9cclxuICAgIGluc2lnaHQ6bnVtYmVyPTA7ICAgIFxyXG59Il19