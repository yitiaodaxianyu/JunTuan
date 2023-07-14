
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyb0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO1FBQ0ksVUFBVTtRQUNWLGNBQVMsR0FBVyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQzNDLFdBQVc7UUFDWCxlQUFVLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLFVBQVU7UUFDVixpQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixVQUFVO1FBQ1YsZUFBVSxHQUFVLENBQUMsQ0FBQztRQUN0QixxQkFBcUI7UUFDckIsV0FBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixZQUFZO1FBQ1osMEJBQXFCLEdBQVUsQ0FBQyxDQUFDO1FBQ2pDLGtCQUFrQjtRQUNsQixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ2Ysa0JBQWtCO1FBQ2xCLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDZixrQkFBa0I7UUFDbEIsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUNmLGtCQUFrQjtRQUNsQixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBRWYsYUFBYTtRQUNiLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsWUFBWTtJQUNoQixDQUFDO0lBQUQsZUFBQztBQUFELENBMUJBLEFBMEJDLElBQUE7QUExQlksNEJBQVE7QUE0QnJCLElBQVksWUFTWDtBQVRELFdBQVksWUFBWTtJQUNwQixRQUFRO0lBQ1IsK0NBQU0sQ0FBQTtJQUNOLE9BQU87SUFDUCxtREFBUSxDQUFBO0lBQ1IsUUFBUTtJQUNSLCtDQUFNLENBQUE7SUFDTixRQUFRO0lBQ1IsNkNBQUssQ0FBQTtBQUNULENBQUMsRUFUVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQVN2QjtBQUVELElBQVksU0E4Qlg7QUE5QkQsV0FBWSxTQUFTO0lBRWpCLEtBQUs7SUFDTCx5Q0FBTSxDQUFBO0lBQ04sU0FBUztJQUNULHlEQUFjLENBQUE7SUFDZCxRQUFRO0lBQ1IsaURBQVEsQ0FB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UUFDcEMsU0FBUztRQUNGLHdCQUFtQixHQUFRLENBQUMsQ0FBQztRQUNwQyxVQUFVO1FBQ0gsdUJBQWtCLEdBQVEsQ0FBQyxDQUFDO1FBQ2xDLHVFQUF1RTtRQUN4RSxZQUFZO1FBQ0wsYUFBUSxHQUFzQixJQUFJLENBQUU7UUFDM0MsbURBQW1EO1FBQzVDLGlCQUFZLEdBQXNCLElBQUksQ0FBRTtRQUMvQyxnQkFBZ0I7UUFDVCxpQkFBWSxHQUFzQixJQUFJLENBQUU7UUFDL0MsZ0JBQWdCO1FBQ1QsaUJBQVksR0FBc0IsSUFBSSxDQUFFO1FBQy9DLGdCQUFnQjtRQUNULGlCQUFZLEdBQXNCLElBQUksQ0FBRTtRQUMvQyxZQUFZO1FBQ0wsaUJBQVksR0FBdUIsSUFBSSxDQUFFO1FBQ2hELDJFQUEyRTtRQUMzRSxVQUFVO1FBQ1Ysa0JBQWEsR0FBUSxDQUFDLENBQUM7UUFDdkIsU0FBUztRQUNULHNCQUFpQixHQUFRLENBQUMsQ0FBQztRQUMzQixTQUFTO1FBQ1QscUJBQWdCLEdBQVEsQ0FBQyxDQUFDO1FBQzFCLFNBQVM7UUFDVCx1QkFBa0IsR0FBUSxDQUFDLENBQUM7UUFDNUIsU0FBUztRQUNULHdCQUFtQixHQUFRLENBQUMsQ0FBQztRQUM3QixVQUFVO1FBQ1Ysb0JBQWUsR0FBUSxDQUFDLENBQUM7UUFDekIsUUFBUTtRQUNSLGNBQVMsR0FBUSxDQUFDLENBQUM7UUFDbkIsUUFBUTtRQUNSLFlBQU8sR0FBUSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0EzREEsQUEyREMsSUFBQTtBQTNEWSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb25zdGVyIGZyb20gXCIuLi8uLi9Nb25zdGVyL01vbnN0ZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBIZXJvSW5mb3tcclxuICAgIC8qKuiLsembhGlkICovXHJcbiAgICBoZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5DaGFuZ01hb1Nob3U7XHJcbiAgICAvKiroi7Hpm4TnmoTnrYnnuqcgKi9cclxuICAgIGhlcm9fbGV2ZWw6bnVtYmVyPTA7XHJcbiAgICAvKiroi7Hpm4Tlk4HotKggKi9cclxuICAgIGhlcm9fcXVhbGl0eTpudW1iZXI9MTtcclxuICAgIC8qKuiLsembhOmYtuautSAqL1xyXG4gICAgaGVyb19zdGFnZTpudW1iZXIgPSAwO1xyXG4gICAgLyoq57uR5a6a55qE5a6g54mpLG51bGzooajnpLrml6Dnu5HlrpogKi9cclxuICAgIHBldF9pZDpudW1iZXI9MDtcclxuICAgIC8qKuS4k+WxnuatpuWZqOetiee6pyAqL1xyXG4gICAgZXhjbHVzaXZlX2VxdWlwX3N0YWdlOm51bWJlciA9IDA7XHJcbiAgICAvKiroo4XlpIfkvY0xLeatpuWZqC3oo4XlpIdpZCAqL1xyXG4gICAgd2VhcjE6bnVtYmVyPTA7XHJcbiAgICAvKiroo4XlpIfkvY0yLeaKpOeUsi3oo4XlpIdpZCAqL1xyXG4gICAgd2VhcjI6bnVtYmVyPTA7XHJcbiAgICAvKiroo4XlpIfkvY0zLemlsOWTgS3oo4XlpIdpZCAqL1xyXG4gICAgd2VhcjM6bnVtYmVyPTA7XHJcbiAgICAvKiroo4XlpIfkvY00Lemei+WtkC3oo4XlpIdpZCAqL1xyXG4gICAgd2VhcjQ6bnVtYmVyPTA7XHJcblxyXG4gICAgLyoq5pu05o2i57uR5a6a55qE5a6g54mpICovXHJcbiAgICAvLyBjaGFuZ2VCaW5kUGV0KHBldEluZm86UGV0SW5mbyl7XHJcbiAgICAvLyAgICAgdGhpcy5wZXRfaW5mbz1wZXRJbmZvO1xyXG4gICAgLy8gfSAgICAgICAgXHJcbn1cclxuICAgIFxyXG5leHBvcnQgZW51bSBTa2lsbFRpcFR5cGV7XHJcbiAgICAvKirlhajlsY8gKi9cclxuICAgIEZ1bGw9MCxcclxuICAgIC8qKuWchiAqL1xyXG4gICAgQ2lyY2xlPTEsXHJcbiAgICAvKirnn6nlvaIgKi9cclxuICAgIFJlY3Q9MixcclxuICAgIC8qKuaWueWQkSAqL1xyXG4gICAgRGlyPTMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEhlcm9fVHlwZVxyXG57XHJcbiAgICAvL+ayoeiLsembhFxyXG4gICAgTlVMTD0wLFxyXG4gICAgLyoq6ZW/55+b5omLICovXHJcbiAgICBDaGFuZ01hb1Nob3U9MSxcclxuICAgIC8qKuWFveeOiyAqL1xyXG4gICAgU2hvdVdhbmcsXHJcbiAgICAvKirngq7miYsgKi9cclxuICAgIFBhb1Nob3UsXHJcbiAgICAvKirlvrfpsoHkvIogKi9cclxuICAgIERlTHVZaSxcclxuICAgIC8qKueLguaImOWjqyAqL1xyXG4gICAgS3VhbmdaaGFuU2hpLFxyXG4gICAgLyoq6LSe5b63ICovXHJcbiAgICBaaGVuRGUsXHJcbiAgICAvKirlpbPlt6sgKi9cclxuICAgIE52V3UsXHJcbiAgICAvKirlvJPnrq3miYsgKi9cclxuICAgIEdvbmdKaWFuU2hvdSxcclxuICAgIC8qKuWGsOWlsyAqL1xyXG4gICAgQmluZ052LFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pavICovXHJcbiAgICBBTnVCaVNpLFxyXG4gICAgLyoq6a2F6a2UICovXHJcbiAgICBNZWlNbyxcclxuICAgIC8qKumbt+elniAqL1xyXG4gICAgTGVpU2hlbixcclxuXHJcbiAgICBIZXJvX051bVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBCdG5fSGVyb19UeXBle1xyXG4gICAgcm9sZT0xLFxyXG4gICAgbWFwPTIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEhlcm9fU3RhdGVcclxue1xyXG4gICAgaWRsZT0wLFxyXG4gICAgYXR0YWNrPTEsXHJcbiAgICBza2lsbD0yLFxyXG4gICAgLyoq6YCA5Zy677yM5q2k5pe25Y+q6ZqQ6JePICovXHJcbiAgICBleGl0PTMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEF0dFJhbmdlVHlwZVxyXG57XHJcbiAgICBMdURpPTEsXHJcbiAgICBUaWFuS29uZz0yLFxyXG4gICAgRHVuRGk9MyxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gR29uZ0ppX0ZhbmdYaWFuZ1xyXG57XHJcbiAgICB6dW89MCxcclxuICAgIHpob25nPTEsXHJcbiAgICB5b3U9MixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSmlhblNoaV9UeXBlXHJcbntcclxuICAgIHB1dG9uZz0wLFxyXG4gICAgamluZW5nPTEsXHJcbiAgICBzdXBlcj0yLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBQYW9EYW5fVHlwZVxyXG57XHJcbiAgICBza2lsbD0wLFxyXG4gICAgc3VwZXI9MSxcclxuICAgIGV4Y2x1c2l2ZT0yLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBGZWlCaWFvX1R5cGVcclxue1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9MSAqL1xyXG4gICAgc2tpbGwxPTAsXHJcbiAgICAvKirkuJPmrabmioDog70gKi9cclxuICAgIGV4X3NraWxsPTEsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNraWxsVHlwZXtcclxuICAgIC8qKuepuiAqL1xyXG4gICAgTnVsbD0wLFxyXG4gICAgLyoq5Li75Yqo5oqA6IO9ICovXHJcbiAgICBBY3RpdmU9MSxcclxuICAgIC8qKuiiq+WKqOaKgOiDvTEgKi9cclxuICAgIFBhc3NpdmVfMT0yLFxyXG4gICAgLyoq6KKr5Yqo5oqA6IO9MiAqL1xyXG4gICAgUGFzc2l2ZV8yPTMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEhlcm9fRGVCdWZme1xyXG4gICAgLyoq55yp5pmVICovXHJcbiAgICBYdWFuWXVuPTEsXHJcbiAgICAvKirmmrTlh7vlkI7mma7pgJrlop7kvKRjZDPnp5IgKi9cclxuICAgIGNyaXRfaW5jcmVhc2VfY2RfMz0yLFxyXG5cclxufVxyXG4vKirmioDog73mjIfnpLrlmajnsbvlnosgKi9cclxuZXhwb3J0IGVudW0gU2tpbGxJbmRpY2F0b3JUeXBle1xyXG4gICAgLyoq55u057q/5pa55ZCR57G75Z6L77yM5Y+q566h6LSf6LSj5pi+56S65pa55ZCRICovXHJcbiAgICBiZWVsaW5lPTAsXHJcbiAgICAvKirnm67moIfkvY3nva7nsbvlnovvvIzotJ/otKPmmL7npLrnm67moIfkvY3nva7lkozlhbfkvZPnmoTlpKflsI8gKi9cclxuICAgIHRhcmdldCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gSGVyb19TdGF0ZV9OYW1lXHJcbntcclxuICAgIC8qKuato+mdouW+heacuiAqL1xyXG4gICAgSWRsZSA9IFwiSWRsZVwiLCAgICAgICAvLy0tIOato+mdouW+heaculxyXG4gICAgLyoq5L6n6Z2i5b6F5py6ICovXHJcbiAgICBjbWRqID0gXCJjZW1pYW5fZGFpamlcIiwgICAgICAgICAgLy8tLSDkvqfpnaLlvoXmnLpcclxuICAgIC8qKuaUu+WHuyAqL1xyXG4gICAgQXR0YWNrID0gXCJBdHRhY2tcIiwgICAgICAgICAgICAgLy8tLSDmraPpnaLmlLvlh7tcclxuICAgIC8qKuaKgOiDvSAqL1xyXG4gICAgU2tpbGwgPSBcIlNraWxsXCIsICAgICAgICAgICAgICAgIC8vLS0g5L6n6Z2i5pS75Ye7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQmluZ052V2FsbERhdGF7XHJcbiAgICBib3NzX3RzOk1vbnN0ZXI9bnVsbDtcclxuICAgIGJhY2tfbW9uc3RlcnM6Y2MuTm9kZVtdPVtdO1xyXG59XHJcblxyXG4vKirpgKDmiJDnmoTkvKTlrrPnmoTnsbvlnosgKi9cclxuZXhwb3J0IGVudW0gRGFtYWdlVHlwZXtcclxuICAgIC8qKuaZrumAmuaUu+WHu+eahOS8pOWusyAqL1xyXG4gICAgTm9ybWFsPTEsXHJcbiAgICAvKirkuLvliqjmioDog73nmoTkvKTlrrMgKi9cclxuICAgIFNraWxsLFxyXG4gICAgLyoq6KKr5Yqo5oqA6IO955qE5Lyk5a6zICovXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNoaWVsZFR5cGV7XHJcbiAgICAvKirmirXmtojmma7pgJrmlLvlh7vnmoTkvKTlrrMgKi9cclxuICAgIE5vcm1hbD0xLFxyXG4gICAgLyoq5oq15raI5oqA6IO955qE5Lyk5a6zICovXHJcbiAgICBTa2lsbCwgICAgXHJcbiAgICAvKirmiYDmnInnmoTkvKTlrrMgKi9cclxuICAgIEFsbCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2hpZWxkSWR7XHJcbiAgICAvKirngq7miYvkuLvliqjmioDog70gKi9cclxuICAgIFBhb1Nob3VfQWN0aXZlU2tpbGw9MSxcclxuICAgIC8qKuW/jeiAheiiq+WKqOaKgOiDvSAqL1xyXG4gICAgUmVuWmhlX1NraWxsMj0yLFxyXG5cclxuICAgIC8qKua1i+ivlSAqL1xyXG4gICAgVGVzdCxcclxufVxyXG4vKipidWZm54q25oCB57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIEJ1ZmZTdGF0ZVR5cGV7XHJcbiAgICBOdWxsPTAsXHJcbiAgICAvKirmlLvlh7vlipsgKi9cclxuICAgIEF0dGFjaz0xLFxyXG4gICAgLyoq5pS75Ye76YCf5bqmICovXHJcbiAgICBBdHRhY2tTcGVlZCwgICAgXHJcbiAgICAvKirpmLLlvqHlipsgKi9cclxuICAgIERlZmVuc2UsXHJcbiAgICAvKirnlJ/lkb3lgLwgKi9cclxuICAgIEhlYWx0aCxcclxuICAgIC8qKuWRveS4reeOhyAqL1xyXG4gICAgSGl0UmF0ZSxcclxuICAgIC8qKuaatOWHu+eOhyAqL1xyXG4gICAgQ3JpdFJhdGUsXHJcbiAgICAvKirmmrTlh7vlop7luYUgKi9cclxuICAgIEV4dHJhQ3JpdGljYWwsXHJcbiAgICAvKirpl6rpgb8gKi9cclxuICAgIE1pc3MsXHJcbiAgICAvKirpmLLmmrTlgLwgKi9cclxuICAgIEFudGlDcml0aWNhbCxcclxuICAgIC8qKuaatOWHu+aKl+aApyAqL1xyXG4gICAgQW50aUV4dHJhQ3JpdGljYWwsXHJcbiAgICAvKirlhrfljbTml7bpl7QqL1xyXG4gICAgQ29sZFRpbWUsXHJcbn1cclxuLyoqQnVmZuexu+WeiyAqL1xyXG5leHBvcnQgZW51bSBCdWZmVHlwZXtcclxuICAgIC8qKuaZrumAmueahCAqL1xyXG4gICAgTm9ybWFsPTAsXHJcbiAgICAvKirnnKnmmZXnsbsgKi9cclxuICAgIFZlcnRpZ289MSxcclxuICAgIC8qKuaNhue7kSAqL1xyXG4gICAgQmluZGluZz0yLFxyXG4gICAgLyoq5YeP6YCfICovXHJcbiAgICBTbG93ZG93bj0zLFxyXG4gICAgLyoq54m15byVICovXHJcbiAgICBUcmFjdGlvbj00LFxyXG4gICAgLyoq5Ye76YCAICovXHJcbiAgICBLbm9ja2JhY2s9NSxcclxuICAgIC8qKuemgemUoiAqL1xyXG4gICAgQ29uZmluZT02LFxyXG4gICAgLyoqYnVmZuWxguaVsOi+vuWIsOadoeS7tuWQjueIhuWPkeexuyAqL1xyXG4gICAgQnVyc3Q9NyxcclxuICAgIC8qKuWinuebiuexuyAqL1xyXG4gICAgR2Fpbj04LFxyXG4gICAgLyoq5Yqg6YCf77yI56e75Yqo6YCf5bqm77yJ57G7ICovXHJcbiAgICBNb3ZlU3BlZWRVcD05LFxyXG4gICAgLyoq5Yqg6YCf77yI5pS75Ye76YCf5bqm77yJ57G7ICovXHJcbiAgICBBdHRTcGVlZFVwPTEwLFxyXG4gICAgLyoq6YeN5Lyk57G7ICovXHJcbiAgICBTZXJpb3VzbHlJbmp1cmVkPTExLFxyXG4gICAgLy8gLyoq5rK755aXICovXHJcbiAgICAvLyBSZWNvdmVyeT03LFxyXG59XHJcblxyXG4vKirmiYDmnIlCVUZGL0RFQlVGRueahElEICovXHJcbmV4cG9ydCBlbnVtIEJ1ZmZJZHtcclxuICAgIE51bGw9MCxcclxuICAgIEhlcm9fWHVhbll1bj0xMDAwMSxcclxuICAgIC8qKuW+t+mygeS8iuS4k+atpi3nnJ/kvKRkZWJ1ZmYgKi9cclxuICAgIEhlcm9fRGVMdVlpX0V4PTEwNDAxLFxyXG4gICAgLyoq54uC5oiY5aOr5aSn5oubICovXHJcbiAgICBIZXJvX0t1YW5nWmhhblNoaV9EYVpoYW89MTA1MDEsXHJcbiAgICAvKirotJ7lvrfooqvliqjmioDog73nmoTliqDmmrTlh7vnjoflkozlkb3kuK3njocgKi9cclxuICAgIEhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY9MTA2MDEsXHJcbiAgICAvKirotJ7lvrfkuLvliqjmioDog73nmoTliqDmlLvpgJ8gKi9cclxuICAgIEhlcm9fWmhlbkRlX0dvbmdzdT0xMDYwMixcclxuICAgIC8qKui0nuW+t+iiq+WKqOaKgOiDveeahOWKoOihgOWHj+S8pCAqL1xyXG4gICAgSGVyb19aaGVuRGVfSmlhWHVlSmlhblNoYW5nPTEwNjAzLFxyXG4gICAgLyoq5aWz5ber6KKr5YqoMe+8jOS4reavkuaViOaenCAqL1xyXG4gICAgSGVyb19Odld1X1NraWxsMV9aaG9uZ2R1PTEwNzAxLFxyXG4gICAgLyoq5aWz5ber5Li75Yqo5oqA6IO977yM5Lit5Lyk5pWI5p6cICovXHJcbiAgICBIZXJvX052V3VfU2tpbGwxX1pob25nU2hhbmc9MTA3MDIsXHJcbiAgICAvKirlpbPlt6vkuJPmrabmioDog73vvIzlh4/mlLvpgJ/mlYjmnpwgKi9cclxuICAgIEhlcm9fTnZXdV9FeFNraWxsX0ppYW5Hb25nU3U9MTA3MDMsXHJcbiAgICAvKirplb/nn5vmiYvnmoTooqvliqjmioDog73mioDog73lop7kvKQgKi9cclxuICAgIEhlcm9fQ2hhbmdNYW9TaG93X1NraWxsPTEwODAxLFxyXG4gICAgLyoq6ZW/55+b5omL55qE5Li75Yqo5oqA6IO95pS76YCfICovXHJcbiAgICBIZXJvX0NoYW5nTWFvU2hvd19Hb25nU3U9MTA4MDMsXHJcbiAgICAvKirlhrDlpbPooqvliqjlh4/pgJ8gKi9cclxuICAgIEhlcm9fQmluZ052X1NraWxsMV9KaWFuU3U9MTA5MDEsXHJcbiAgICAvKirpmL/liqrmr5Tmlq/ooqvliqjlh4/pgJ8gKi9cclxuICAgIEhlcm9fQU51QmlTaV9Ta2lsbDFfSmlhblN1PTExMDAxLFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pav5YWo5bGP5YeP6YCfICovXHJcbiAgICBIZXJvX0FOdUJpU2lfQWN0aXZlX1NraWxsX0ppYW5TdT0xMTAwMixcclxuICAgIC8qKumthemtlOeahOiiq+WKqOaKgOiDveaUu+mAnyAqL1xyXG4gICAgSGVyb19NZWlNb19Hb25nU3U9MTExMDEsXHJcbiAgICAvKirprYXprZTnmoTkuLvliqjmioDog73prYXmg5EgKi9cclxuICAgIEhlcm9fTWVpTW9fQWN0aXZlX01laUh1bz0xMTExMSxcclxuICAgIC8qKumthemtlOeahOS4u+WKqOaKgOiDvemtheaDkSAqL1xyXG4gICAgSGVyb19NZWlNb19BY3RpdmVfWmhlbmdTaGFuZz0xMTExMixcclxuICAgIC8qKuiLsembhC3pm7fnpZ7otoXotJ/ojbfmlYjmnpwgKi9cclxuICAgIEhlcm9fTGVpU2hlbl9DaGFvRnVIZT0xMTIwMSxcclxuICAgIE1vbnN0ZXJfWHVhbll1bj0yMDAwMSxcclxuICAgIEVsaXRlNjhfTml1SmlhbmdKdW5fSmlhU3U9MjY4MDEsXHJcbiAgICAvKirpsbzprZTnp7vpgJ8gKi9cclxuICAgIEVsaXRlNzFfRmlzaEJ1bGx5X0ppYVlpU3U9MjcxMDEsXHJcbiAgICAvKirpsbzprZTmlLvlh7vpgJ/luqYgKi9cclxuICAgIEVsaXRlNzFfRmlzaEJ1bGx5X0ppYUdvbmdTdT0yNzIwMixcclxuICAgIC8qKmJvc3PmqKHlvI/kuIvvvIxib3Nz6YCa55So55qE5Y+X5Ye75aKe5Lyk55qEZGVidWZm5pWI5p6cICovXHJcbiAgICBCb3NzX01vZGVfSmlhblNoYW5nPTMwMDAxLFxyXG4gICAgLyoqYm9zczLvvIjpk6DnlLLmiJjlo6vvvInnmoTlhY3nlqvmma7pgJrmlLvlh7vvvIzlhY3nlqvmjqfliLbmlYjmnpxidWZmICovXHJcbiAgICBCb3NzMl9NaWFuWWlfQXR0YWNrPTMwMjAxLFxyXG4gICAgLyoqYm9zczPvvIjlhrDlt53pm6rkurrvvInnmoTlh4/mlLvpgJ9idWZmICovXHJcbiAgICBCb3NzM19KSUFOX0dvbmdTdT0zMDMwMSxcclxuICAgIC8qKmJvc3Mz77yI5Yaw5bed6Zuq5Lq677yJ55qE5YWN55ar5o6n5Yi255qEYnVmZiAqL1xyXG4gICAgQm9zczNfTWlhbllpX0tvbmdaaGk9MzAzMDIsXHJcbiAgICAvKipib3NzNe+8iOeJm+mtlOmFi+mVv++8ieeahOm8k+iInmJ1ZmYgKi9cclxuICAgIEJvc3M1X1NraWxsXzFfZ3V3dT0zMDUwMSxcclxuICAgIC8qKmJvc3M2KOazpea9rSnlh4/mlLvpgJ8gKi9cclxuICAgIEJvc3M2X1NraWxsXzJfamlhbmdvbmdzdT0zMDYwMSxcclxuICAgIC8qKmJvc3M4KOaymeiZqynpu4/mtrLvvIzmjIHnu63kvKTlrrMgKi9cclxuICAgIEJvc3M4X1NraWxsXzJfc2hhbmdoYWk9MzA4MDEsXHJcbiAgICAvKipib3NzOCjmspnomasp6buP5ray77yM5YeP5bCR5pS75Ye75YqbICovXHJcbiAgICBCb3NzOF9Ta2lsbF8yX2F0dGFjaz0zMDgwMixcclxuICAgIC8qKmJvc3M4KOaymeiZqynliqDooYAgKi9cclxuICAgIEJvc3M4X1NraWxsXzFfamlheHVlPTMwODAzLFxyXG4gICAgLyoqYm9zczko5YWw5Y2aKei/h+i9vSAqL1xyXG4gICAgQm9zczlfU2tpbGxfMV9ndW96YWk9MzA5MDEsXHJcbiAgICAvKipib3NzOSjlhbDljZop5peg5pWMICovXHJcbiAgICBCb3NzOV9Ta2lsbF8zX3dpZHU9MzA5MDIsXHJcbiAgICAvKipib3NzMTAo54aU5bKpKem8k+iIniAqL1xyXG4gICAgQm9zczEwX1NraWxsXzNfZ3V3dT0zMTAwMSxcclxuICAgIC8qKmJvc3MxMCjnhpTlsqkp54uC5pq0LeaUu+mAnyAqL1xyXG4gICAgQm9zczEwX1NraWxsXzRfa3VhbmdiYW9fZ3M9MzEwMTEsXHJcbiAgICAvKipib3NzMTAo54aU5bKpKeeLguaatC3mlLvlh7vlipsgKi9cclxuICAgIEJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbD0zMTAxMixcclxuICAgIC8qKuaXoOWwvS3ln47lopnliqDooYBCdWZmLOmcgOimgeWKoOS4iuiHqui6q+iLsembhGlk77yM5Yy65YiraWTvvIzov5nmoLfmr4/kuKroi7Hpm4Tpg73lj6/ku6XliqDooYAgKi9cclxuICAgIFdhbGxfRW5kbGVzc19BZGRfaHA9NDAxMDAsXHJcbiAgICBXYWxsX1R1dG9yaWFsX0FkZF9ocD00MDIwMCxcclxuICAgIC8qKuWGsOWuoOeJqeWHj+mAnyAqL1xyXG4gICAgUGV0MV9KaWFuU3U9NTAxMDEsXHJcbiAgICAvKirpo47lrqDnianliqDmlLvpgJ8gKi9cclxuICAgIFBldDNfSmlhU3U9NTAzMDEsXHJcbn1cclxuXHJcbi8qKuaJgOacieeahOWFieeOr2lkICovXHJcbmV4cG9ydCBlbnVtIEhhbG9JZHtcclxuICAgIE51bGw9MCxcclxuICAgIC8qKueyvuiLseaAqi0zMC3onZnonaDvvIjloJXokL3lpKnkvb/vvIkt55qE6KKr5Yqo5YWJ546vICovXHJcbiAgICBNb25zdGVyMzBfQmlhbkZ1X1NraWxsX0hhbG89MjMwMDEsXHJcbiAgICAvKirnsr7oi7HmgKotNjkt54mb5aS06JCo5ruhLeiiq+WKqOWFieeOryAqL1xyXG4gICAgTW9uc3RlcjY5X05pdVNhTWFuX1NraWxsX0hhbG89MjY5MDEsXHJcbiAgICAvKirnsr7oi7HmgKotNzYt55uR552j6ICFLeiiq+WKqOWFieeOryAqL1xyXG4gICAgTW9uc3Rlcjc2X0ppYW5EdVpoZV9Ta2lsbF9IYWxvPTI3NjAxLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFsb0RhdGF7XHJcbiAgICAvKirlhYnnjq/nmoRpZCAqL1xyXG4gICAgaGFsb19pZDpIYWxvSWQ9SGFsb0lkLk51bGw7XHJcbiAgICAvKirlhYnnjq/nmoTmlbDlgLwgKi9cclxuICAgIGhhbG9fdmFsdWU6bnVtYmVyW109W107XHJcbiAgICAvKirlhYnnjq/mnaXmupAs6YG/5YWN5ZCMaWTlj4zlhYnnjq/liKTmlq3nmoTpl67popggKi9cclxuICAgIGhhbG9fc291cmNlX3V1aWQ6c3RyaW5nPScnO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlRGF0YXtcclxuICAgIFxyXG4gICAgcHVibGljIEF0dGFjazpudW1iZXI9MDtcclxuICAgIC8qKumYsuW+oeWKmyAqL1xyXG4gICAgcHVibGljIERlZmVuc2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnlJ/lkb3lgLwgKi9cclxuICAgIHB1YmxpYyBIZWFsdGg6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlkb3kuK3lgLwgKi9cclxuICAgIHB1YmxpYyBIaXQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpl6rpgb/lgLwgKi9cclxuICAgIHB1YmxpYyBNaXNzOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pq05Ye75YC8ICovXHJcbiAgICBwdWJsaWMgQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vlop7luYUgKi9cclxuICAgIHB1YmxpYyBFeHRyYUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Ziy5pq05YC8ICovXHJcbiAgICBwdWJsaWMgQW50aUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pq05Ye75oqX5oCnICovXHJcbiAgICBwdWJsaWMgQW50aUV4dHJhQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmma7mlLvlop7kvKQlICovICAgIFxyXG4gICAgcHVibGljIGF0dGFja19pbmNyZWFzZV9kYW1hZ2U6bnVtYmVyPTA7XHJcbiAgICAvKirmioDog73kvKTlrrPlop7kvKQgKi9cclxuICAgIHB1YmxpYyBza2lsbF9pbmNyZWFzZV9kYW1hZ2U6bnVtYmVyPTA7XHJcbiAgICAvKirlhajog73kvKTlrrPlop7kvKQgKi9cclxuICAgIHB1YmxpYyBhbGxfaW5jcmVhc2VfZGFtYWdlOm51bWJlcj0wO1xyXG4gICAgLyoq5YeP5Lyk5YC8ICovXHJcbiAgICBwdWJsaWMgcmVkdWNlX2luanVyeV92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKuWHj+S8pOavlOeOhyAqL1xyXG4gICAgcHVibGljIHJlZHVjZV9pbmp1cnlfcmF0ZTpudW1iZXI9MDtcclxuICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDveaVsOWAvC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirmioDog73lhrfljbTml7bpl7QgKi9cclxuICAgIHB1YmxpYyBDb2xkRG93bjpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuaKgOiDvS3mioDog73lj4LmlbAxLOiOt+W+l+WFt+S9k+aKgOiDveanveeahOaKgOiDvTHlj4LmlbDvvIzkvb/nlKjvvJpTa2lsbFZhbHVlXzEuZ2V0KDEpICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV94Ok1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9LeaKgOiDveWPguaVsDIgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlX3k6TWFwPG51bWJlcixudW1iZXI+ID0gbnVsbCA7XHJcbiAgICAvKirooqvliqjmioDog70t5oqA6IO95Y+C5pWwMyAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfejpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDvS3mioDog73lj4LmlbA0ICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV80Ok1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq5oqA6IO95piv5ZCm6Kej6ZSBICovXHJcbiAgICBwdWJsaWMgdW5sb2NrX3N0YXRlOk1hcDxudW1iZXIsYm9vbGVhbj4gPSBudWxsIDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6ZqQ6JeP5bGe5oCnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirnlJ/lkb3lm57lpI0gKi9cclxuICAgIGxpZmVfcmVjb3Zlcnk6bnVtYmVyPTA7XHJcbiAgICAvKirnqb/pgI/lgLwgKi9cclxuICAgIHBlbmV0cmF0aW9uX3ZhbHVlOm51bWJlcj0wO1xyXG4gICAgLyoq56m/6YCP546HICovXHJcbiAgICBwZW5ldHJhdGlvbl9yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5ZC46KGA546HICovXHJcbiAgICBibG9vZF9zdWNraW5nX3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirph43kvKTnjocgKi9cclxuICAgIHNlcmlvdXNfaW5qdXJ5X3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirlh4/pgJ/mipfmgKcgKi9cclxuICAgIHNsb3dfcmVzaXN0YW5jZTpudW1iZXI9MDtcclxuICAgIC8qKumfp+aApyAqL1xyXG4gICAgdG91Z2huZXNzOm51bWJlcj0wO1xyXG4gICAgLyoq5rSe5a+fICovXHJcbiAgICBpbnNpZ2h0Om51bWJlcj0wOyAgICBcclxufSJdfQ==