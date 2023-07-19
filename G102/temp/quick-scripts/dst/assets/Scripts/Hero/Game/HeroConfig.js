
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcSGVyb0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO1FBQ0ksVUFBVTtRQUNWLGNBQVMsR0FBVyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQzNDLFdBQVc7UUFDWCxlQUFVLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLFVBQVU7UUFDVixpQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixVQUFVO1FBQ1YsZUFBVSxHQUFVLENBQUMsQ0FBQztRQUN0QixxQkFBcUI7UUFDckIsV0FBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixZQUFZO1FBQ1osMEJBQXFCLEdBQVUsQ0FBQyxDQUFDO1FBQ2pDLGtCQUFrQjtRQUNsQixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ2Ysa0JBQWtCO1FBQ2xCLFVBQUssR0FBUSxDQUFDLENBQUM7UUFDZixrQkFBa0I7UUFDbEIsVUFBSyxHQUFRLENBQUMsQ0FBQztRQUNmLGtCQUFrQjtRQUNsQixVQUFLLEdBQVEsQ0FBQyxDQUFDO1FBRWYsYUFBYTtRQUNiLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsWUFBWTtJQUNoQixDQUFDO0lBQUQsZUFBQztBQUFELENBMUJBLEFBMEJDLElBQUE7QUExQlksNEJBQVE7QUE0QnJCLElBQVksWUFTWDtBQVRELFdBQVksWUFBWTtJQUNwQixRQUFRO0lBQ1IsK0NBQU0sQ0FBQTtJQUNOLE9BQU87SUFDUCxtREFBUSxDQUFBO0lBQ1IsUUFBUTtJQUNSLCtDQUFNLENBQUE7SUFDTixRQUFRO0lBQ1IsNkNBQUssQ0FBQTtBQUNULENBQUMsRUFUVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQVN2QjtBQUVELElBQVksU0E4Qlg7QUE5QkQsV0FBWSxTQUFTO0lBRWpCLEtBQUs7SUFDTCx5Q0FBTSxDQUFBO0lBQ04sU0FBUztJQUNULHlEQUFjLENBQUE7SUFDZCxRQUFRO0lBQ1IsaURBQVEsQ0FB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Q0wsd0JBQW1CLEdBQVEsQ0FBQyxDQUFDO1FBQ3BDLFNBQVM7UUFDRix3QkFBbUIsR0FBUSxDQUFDLENBQUM7UUFDcEMsVUFBVTtRQUNILHVCQUFrQixHQUFRLENBQUMsQ0FBQztRQUNsQyx1RUFBdUU7UUFDeEUsWUFBWTtRQUNMLGFBQVEsR0FBc0IsSUFBSSxDQUFFO1FBQzNDLG1EQUFtRDtRQUM1QyxpQkFBWSxHQUFzQixJQUFJLENBQUU7UUFDL0MsZ0JBQWdCO1FBQ1QsaUJBQVksR0FBc0IsSUFBSSxDQUFFO1FBQy9DLGdCQUFnQjtRQUNULGlCQUFZLEdBQXNCLElBQUksQ0FBRTtRQUMvQyxnQkFBZ0I7UUFDVCxpQkFBWSxHQUFzQixJQUFJLENBQUU7UUFDL0MsWUFBWTtRQUNMLGlCQUFZLEdBQXVCLElBQUksQ0FBRTtRQUNoRCwyRUFBMkU7UUFDM0UsVUFBVTtRQUNWLGtCQUFhLEdBQVEsQ0FBQyxDQUFDO1FBQ3ZCLFNBQVM7UUFDVCxzQkFBaUIsR0FBUSxDQUFDLENBQUM7UUFDM0IsU0FBUztRQUNULHFCQUFnQixHQUFRLENBQUMsQ0FBQztRQUMxQixTQUFTO1FBQ1QsdUJBQWtCLEdBQVEsQ0FBQyxDQUFDO1FBQzVCLFNBQVM7UUFDVCx3QkFBbUIsR0FBUSxDQUFDLENBQUM7UUFDN0IsVUFBVTtRQUNWLG9CQUFlLEdBQVEsQ0FBQyxDQUFDO1FBQ3pCLFFBQVE7UUFDUixjQUFTLEdBQVEsQ0FBQyxDQUFDO1FBQ25CLFFBQVE7UUFDUixZQUFPLEdBQVEsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFBRCxvQkFBQztBQUFELENBM0RBLEFBMkRDLElBQUE7QUEzRFksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9uc3RlciBmcm9tIFwiLi4vLi4vTW9uc3Rlci9Nb25zdGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSGVyb0luZm97XHJcbiAgICAvKiroi7Hpm4RpZCAqL1xyXG4gICAgaGVyb190eXBlOkhlcm9fVHlwZT1IZXJvX1R5cGUuQ2hhbmdNYW9TaG91O1xyXG4gICAgLyoq6Iux6ZuE55qE562J57qnICovXHJcbiAgICBoZXJvX2xldmVsOm51bWJlcj0wO1xyXG4gICAgLyoq6Iux6ZuE5ZOB6LSoICovXHJcbiAgICBoZXJvX3F1YWxpdHk6bnVtYmVyPTE7XHJcbiAgICAvKiroi7Hpm4TpmLbmrrUgKi9cclxuICAgIGhlcm9fc3RhZ2U6bnVtYmVyID0gMDtcclxuICAgIC8qKue7keWumueahOWuoOeJqSxudWxs6KGo56S65peg57uR5a6aICovXHJcbiAgICBwZXRfaWQ6bnVtYmVyPTA7XHJcbiAgICAvKirkuJPlsZ7mrablmajnrYnnuqcgKi9cclxuICAgIGV4Y2x1c2l2ZV9lcXVpcF9zdGFnZTpudW1iZXIgPSAwO1xyXG4gICAgLyoq6KOF5aSH5L2NMS3mrablmagt6KOF5aSHaWQgKi9cclxuICAgIHdlYXIxOm51bWJlcj0wO1xyXG4gICAgLyoq6KOF5aSH5L2NMi3miqTnlLIt6KOF5aSHaWQgKi9cclxuICAgIHdlYXIyOm51bWJlcj0wO1xyXG4gICAgLyoq6KOF5aSH5L2NMy3ppbDlk4Et6KOF5aSHaWQgKi9cclxuICAgIHdlYXIzOm51bWJlcj0wO1xyXG4gICAgLyoq6KOF5aSH5L2NNC3pnovlrZAt6KOF5aSHaWQgKi9cclxuICAgIHdlYXI0Om51bWJlcj0wO1xyXG5cclxuICAgIC8qKuabtOaNoue7keWumueahOWuoOeJqSAqL1xyXG4gICAgLy8gY2hhbmdlQmluZFBldChwZXRJbmZvOlBldEluZm8pe1xyXG4gICAgLy8gICAgIHRoaXMucGV0X2luZm89cGV0SW5mbztcclxuICAgIC8vIH0gICAgICAgIFxyXG59XHJcbiAgICBcclxuZXhwb3J0IGVudW0gU2tpbGxUaXBUeXBle1xyXG4gICAgLyoq5YWo5bGPICovXHJcbiAgICBGdWxsPTAsXHJcbiAgICAvKirlnIYgKi9cclxuICAgIENpcmNsZT0xLFxyXG4gICAgLyoq55+p5b2iICovXHJcbiAgICBSZWN0PTIsXHJcbiAgICAvKirmlrnlkJEgKi9cclxuICAgIERpcj0zLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBIZXJvX1R5cGVcclxue1xyXG4gICAgLy/msqHoi7Hpm4RcclxuICAgIE5VTEw9MCxcclxuICAgIC8qKumVv+efm+aJiyAqL1xyXG4gICAgQ2hhbmdNYW9TaG91PTEsXHJcbiAgICAvKirlhb3njosgKi9cclxuICAgIFNob3VXYW5nLFxyXG4gICAgLyoq54Ku5omLICovXHJcbiAgICBQYW9TaG91LFxyXG4gICAgLyoq5b636bKB5LyKICovXHJcbiAgICBEZUx1WWksXHJcbiAgICAvKirni4LmiJjlo6sgKi9cclxuICAgIEt1YW5nWmhhblNoaSxcclxuICAgIC8qKui0nuW+tyAqL1xyXG4gICAgWmhlbkRlLFxyXG4gICAgLyoq5aWz5berICovXHJcbiAgICBOdld1LFxyXG4gICAgLyoq5byT566t5omLICovXHJcbiAgICBHb25nSmlhblNob3UsXHJcbiAgICAvKirlhrDlpbMgKi9cclxuICAgIEJpbmdOdixcclxuICAgIC8qKumYv+WKquavlOaWryAqL1xyXG4gICAgQU51QmlTaSxcclxuICAgIC8qKumthemtlCAqL1xyXG4gICAgTWVpTW8sXHJcbiAgICAvKirpm7fnpZ4gKi9cclxuICAgIExlaVNoZW4sXHJcblxyXG4gICAgSGVyb19OdW1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gQnRuX0hlcm9fVHlwZXtcclxuICAgIHJvbGU9MSxcclxuICAgIG1hcD0yLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBIZXJvX1N0YXRlXHJcbntcclxuICAgIGlkbGU9MCxcclxuICAgIGF0dGFjaz0xLFxyXG4gICAgc2tpbGw9MixcclxuICAgIC8qKumAgOWcuu+8jOatpOaXtuWPqumakOiXjyAqL1xyXG4gICAgZXhpdD0zLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBdHRSYW5nZVR5cGVcclxue1xyXG4gICAgTHVEaT0xLFxyXG4gICAgVGlhbktvbmc9MixcclxuICAgIER1bkRpPTMsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdvbmdKaV9GYW5nWGlhbmdcclxue1xyXG4gICAgenVvPTAsXHJcbiAgICB6aG9uZz0xLFxyXG4gICAgeW91PTIsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEppYW5TaGlfVHlwZVxyXG57XHJcbiAgICBwdXRvbmc9MCxcclxuICAgIGppbmVuZz0xLFxyXG4gICAgc3VwZXI9MixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUGFvRGFuX1R5cGVcclxue1xyXG4gICAgc2tpbGw9MCxcclxuICAgIHN1cGVyPTEsXHJcbiAgICBleGNsdXNpdmU9MixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRmVpQmlhb19UeXBlXHJcbntcclxuICAgIC8qKuiiq+WKqOaKgOiDvTEgKi9cclxuICAgIHNraWxsMT0wLFxyXG4gICAgLyoq5LiT5q2m5oqA6IO9ICovXHJcbiAgICBleF9za2lsbD0xLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBTa2lsbFR5cGV7XHJcbiAgICAvKirnqbogKi9cclxuICAgIE51bGw9MCxcclxuICAgIC8qKuS4u+WKqOaKgOiDvSAqL1xyXG4gICAgQWN0aXZlPTEsXHJcbiAgICAvKirooqvliqjmioDog70xICovXHJcbiAgICBQYXNzaXZlXzE9MixcclxuICAgIC8qKuiiq+WKqOaKgOiDvTIgKi9cclxuICAgIFBhc3NpdmVfMj0zLFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBIZXJvX0RlQnVmZntcclxuICAgIC8qKuecqeaZlSAqL1xyXG4gICAgWHVhbll1bj0xLFxyXG4gICAgLyoq5pq05Ye75ZCO5pmu6YCa5aKe5LykY2Qz56eSICovXHJcbiAgICBjcml0X2luY3JlYXNlX2NkXzM9MixcclxuXHJcbn1cclxuLyoq5oqA6IO95oyH56S65Zmo57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIFNraWxsSW5kaWNhdG9yVHlwZXtcclxuICAgIC8qKuebtOe6v+aWueWQkeexu+Wei++8jOWPqueuoei0n+i0o+aYvuekuuaWueWQkSAqL1xyXG4gICAgYmVlbGluZT0wLFxyXG4gICAgLyoq55uu5qCH5L2N572u57G75Z6L77yM6LSf6LSj5pi+56S655uu5qCH5L2N572u5ZKM5YW35L2T55qE5aSn5bCPICovXHJcbiAgICB0YXJnZXQsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEhlcm9fU3RhdGVfTmFtZVxyXG57XHJcbiAgICAvKirmraPpnaLlvoXmnLogKi9cclxuICAgIElkbGUgPSBcIklkbGVcIiwgICAgICAgLy8tLSDmraPpnaLlvoXmnLpcclxuICAgIC8qKuS+p+mdouW+heacuiAqL1xyXG4gICAgY21kaiA9IFwiY2VtaWFuX2RhaWppXCIsICAgICAgICAgIC8vLS0g5L6n6Z2i5b6F5py6XHJcbiAgICAvKirmlLvlh7sgKi9cclxuICAgIEF0dGFjayA9IFwiQXR0YWNrXCIsICAgICAgICAgICAgIC8vLS0g5q2j6Z2i5pS75Ye7XHJcbiAgICAvKirmioDog70gKi9cclxuICAgIFNraWxsID0gXCJTa2lsbFwiLCAgICAgICAgICAgICAgICAvLy0tIOS+p+mdouaUu+WHu1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJpbmdOdldhbGxEYXRhe1xyXG4gICAgYm9zc190czpNb25zdGVyPW51bGw7XHJcbiAgICBiYWNrX21vbnN0ZXJzOmNjLk5vZGVbXT1bXTtcclxufVxyXG5cclxuLyoq6YCg5oiQ55qE5Lyk5a6z55qE57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIERhbWFnZVR5cGV7XHJcbiAgICAvKirmma7pgJrmlLvlh7vnmoTkvKTlrrMgKi9cclxuICAgIE5vcm1hbD0xLFxyXG4gICAgLyoq5Li75Yqo5oqA6IO955qE5Lyk5a6zICovXHJcbiAgICBTa2lsbCxcclxuICAgIC8qKuiiq+WKqOaKgOiDveeahOS8pOWusyAqL1xyXG5cclxuICAgIC8v6Ii55pKe55qE5Lyk5a6zXHJcbiAgICBTaGlwXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNoaWVsZFR5cGV7XHJcbiAgICAvKirmirXmtojmma7pgJrmlLvlh7vnmoTkvKTlrrMgKi9cclxuICAgIE5vcm1hbD0xLFxyXG4gICAgLyoq5oq15raI5oqA6IO955qE5Lyk5a6zICovXHJcbiAgICBTa2lsbCwgICAgXHJcbiAgICAvKirmiYDmnInnmoTkvKTlrrMgKi9cclxuICAgIEFsbCxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2hpZWxkSWR7XHJcbiAgICAvKirngq7miYvkuLvliqjmioDog70gKi9cclxuICAgIFBhb1Nob3VfQWN0aXZlU2tpbGw9MSxcclxuICAgIC8qKuW/jeiAheiiq+WKqOaKgOiDvSAqL1xyXG4gICAgUmVuWmhlX1NraWxsMj0yLFxyXG5cclxuICAgIC8qKua1i+ivlSAqL1xyXG4gICAgVGVzdCxcclxufVxyXG4vKipidWZm54q25oCB57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIEJ1ZmZTdGF0ZVR5cGV7XHJcbiAgICBOdWxsPTAsXHJcbiAgICAvKirmlLvlh7vlipsgKi9cclxuICAgIEF0dGFjaz0xLFxyXG4gICAgLyoq5pS75Ye76YCf5bqmICovXHJcbiAgICBBdHRhY2tTcGVlZCwgICAgXHJcbiAgICAvKirpmLLlvqHlipsgKi9cclxuICAgIERlZmVuc2UsXHJcbiAgICAvKirnlJ/lkb3lgLwgKi9cclxuICAgIEhlYWx0aCxcclxuICAgIC8qKuWRveS4reeOhyAqL1xyXG4gICAgSGl0UmF0ZSxcclxuICAgIC8qKuaatOWHu+eOhyAqL1xyXG4gICAgQ3JpdFJhdGUsXHJcbiAgICAvKirmmrTlh7vlop7luYUgKi9cclxuICAgIEV4dHJhQ3JpdGljYWwsXHJcbiAgICAvKirpl6rpgb8gKi9cclxuICAgIE1pc3MsXHJcbiAgICAvKirpmLLmmrTlgLwgKi9cclxuICAgIEFudGlDcml0aWNhbCxcclxuICAgIC8qKuaatOWHu+aKl+aApyAqL1xyXG4gICAgQW50aUV4dHJhQ3JpdGljYWwsXHJcbiAgICAvKirlhrfljbTml7bpl7QqL1xyXG4gICAgQ29sZFRpbWUsXHJcbn1cclxuLyoqQnVmZuexu+WeiyAqL1xyXG5leHBvcnQgZW51bSBCdWZmVHlwZXtcclxuICAgIC8qKuaZrumAmueahCAqL1xyXG4gICAgTm9ybWFsPTAsXHJcbiAgICAvKirnnKnmmZXnsbsgKi9cclxuICAgIFZlcnRpZ289MSxcclxuICAgIC8qKuaNhue7kSAqL1xyXG4gICAgQmluZGluZz0yLFxyXG4gICAgLyoq5YeP6YCfICovXHJcbiAgICBTbG93ZG93bj0zLFxyXG4gICAgLyoq54m15byVICovXHJcbiAgICBUcmFjdGlvbj00LFxyXG4gICAgLyoq5Ye76YCAICovXHJcbiAgICBLbm9ja2JhY2s9NSxcclxuICAgIC8qKuemgemUoiAqL1xyXG4gICAgQ29uZmluZT02LFxyXG4gICAgLyoqYnVmZuWxguaVsOi+vuWIsOadoeS7tuWQjueIhuWPkeexuyAqL1xyXG4gICAgQnVyc3Q9NyxcclxuICAgIC8qKuWinuebiuexuyAqL1xyXG4gICAgR2Fpbj04LFxyXG4gICAgLyoq5Yqg6YCf77yI56e75Yqo6YCf5bqm77yJ57G7ICovXHJcbiAgICBNb3ZlU3BlZWRVcD05LFxyXG4gICAgLyoq5Yqg6YCf77yI5pS75Ye76YCf5bqm77yJ57G7ICovXHJcbiAgICBBdHRTcGVlZFVwPTEwLFxyXG4gICAgLyoq6YeN5Lyk57G7ICovXHJcbiAgICBTZXJpb3VzbHlJbmp1cmVkPTExLFxyXG4gICAgLy8gLyoq5rK755aXICovXHJcbiAgICAvLyBSZWNvdmVyeT03LFxyXG59XHJcblxyXG4vKirmiYDmnIlCVUZGL0RFQlVGRueahElEICovXHJcbmV4cG9ydCBlbnVtIEJ1ZmZJZHtcclxuICAgIE51bGw9MCxcclxuICAgIEhlcm9fWHVhbll1bj0xMDAwMSxcclxuICAgIC8qKuW+t+mygeS8iuS4k+atpi3nnJ/kvKRkZWJ1ZmYgKi9cclxuICAgIEhlcm9fRGVMdVlpX0V4PTEwNDAxLFxyXG4gICAgLyoq54uC5oiY5aOr5aSn5oubICovXHJcbiAgICBIZXJvX0t1YW5nWmhhblNoaV9EYVpoYW89MTA1MDEsXHJcbiAgICAvKirotJ7lvrfooqvliqjmioDog73nmoTliqDmmrTlh7vnjoflkozlkb3kuK3njocgKi9cclxuICAgIEhlcm9fWmhlbkRlX0Jhb0ppTWluZ1pob25nTHY9MTA2MDEsXHJcbiAgICAvKirotJ7lvrfkuLvliqjmioDog73nmoTliqDmlLvpgJ8gKi9cclxuICAgIEhlcm9fWmhlbkRlX0dvbmdzdT0xMDYwMixcclxuICAgIC8qKui0nuW+t+iiq+WKqOaKgOiDveeahOWKoOihgOWHj+S8pCAqL1xyXG4gICAgSGVyb19aaGVuRGVfSmlhWHVlSmlhblNoYW5nPTEwNjAzLFxyXG4gICAgLyoq5aWz5ber6KKr5YqoMe+8jOS4reavkuaViOaenCAqL1xyXG4gICAgSGVyb19Odld1X1NraWxsMV9aaG9uZ2R1PTEwNzAxLFxyXG4gICAgLyoq5aWz5ber5Li75Yqo5oqA6IO977yM5Lit5Lyk5pWI5p6cICovXHJcbiAgICBIZXJvX052V3VfU2tpbGwxX1pob25nU2hhbmc9MTA3MDIsXHJcbiAgICAvKirlpbPlt6vkuJPmrabmioDog73vvIzlh4/mlLvpgJ/mlYjmnpwgKi9cclxuICAgIEhlcm9fTnZXdV9FeFNraWxsX0ppYW5Hb25nU3U9MTA3MDMsXHJcbiAgICAvKirplb/nn5vmiYvnmoTooqvliqjmioDog73mioDog73lop7kvKQgKi9cclxuICAgIEhlcm9fQ2hhbmdNYW9TaG93X1NraWxsPTEwODAxLFxyXG4gICAgLyoq6ZW/55+b5omL55qE5Li75Yqo5oqA6IO95pS76YCfICovXHJcbiAgICBIZXJvX0NoYW5nTWFvU2hvd19Hb25nU3U9MTA4MDMsXHJcbiAgICAvKirlhrDlpbPooqvliqjlh4/pgJ8gKi9cclxuICAgIEhlcm9fQmluZ052X1NraWxsMV9KaWFuU3U9MTA5MDEsXHJcbiAgICAvKirpmL/liqrmr5Tmlq/ooqvliqjlh4/pgJ8gKi9cclxuICAgIEhlcm9fQU51QmlTaV9Ta2lsbDFfSmlhblN1PTExMDAxLFxyXG4gICAgLyoq6Zi/5Yqq5q+U5pav5YWo5bGP5YeP6YCfICovXHJcbiAgICBIZXJvX0FOdUJpU2lfQWN0aXZlX1NraWxsX0ppYW5TdT0xMTAwMixcclxuICAgIC8qKumthemtlOeahOiiq+WKqOaKgOiDveaUu+mAnyAqL1xyXG4gICAgSGVyb19NZWlNb19Hb25nU3U9MTExMDEsXHJcbiAgICAvKirprYXprZTnmoTkuLvliqjmioDog73prYXmg5EgKi9cclxuICAgIEhlcm9fTWVpTW9fQWN0aXZlX01laUh1bz0xMTExMSxcclxuICAgIC8qKumthemtlOeahOS4u+WKqOaKgOiDvemtheaDkSAqL1xyXG4gICAgSGVyb19NZWlNb19BY3RpdmVfWmhlbmdTaGFuZz0xMTExMixcclxuICAgIC8qKuiLsembhC3pm7fnpZ7otoXotJ/ojbfmlYjmnpwgKi9cclxuICAgIEhlcm9fTGVpU2hlbl9DaGFvRnVIZT0xMTIwMSxcclxuICAgIE1vbnN0ZXJfWHVhbll1bj0yMDAwMSxcclxuICAgIEVsaXRlNjhfTml1SmlhbmdKdW5fSmlhU3U9MjY4MDEsXHJcbiAgICAvKirpsbzprZTnp7vpgJ8gKi9cclxuICAgIEVsaXRlNzFfRmlzaEJ1bGx5X0ppYVlpU3U9MjcxMDEsXHJcbiAgICAvKirpsbzprZTmlLvlh7vpgJ/luqYgKi9cclxuICAgIEVsaXRlNzFfRmlzaEJ1bGx5X0ppYUdvbmdTdT0yNzIwMixcclxuICAgIC8qKmJvc3PmqKHlvI/kuIvvvIxib3Nz6YCa55So55qE5Y+X5Ye75aKe5Lyk55qEZGVidWZm5pWI5p6cICovXHJcbiAgICBCb3NzX01vZGVfSmlhblNoYW5nPTMwMDAxLFxyXG4gICAgLyoqYm9zczLvvIjpk6DnlLLmiJjlo6vvvInnmoTlhY3nlqvmma7pgJrmlLvlh7vvvIzlhY3nlqvmjqfliLbmlYjmnpxidWZmICovXHJcbiAgICBCb3NzMl9NaWFuWWlfQXR0YWNrPTMwMjAxLFxyXG4gICAgLyoqYm9zczPvvIjlhrDlt53pm6rkurrvvInnmoTlh4/mlLvpgJ9idWZmICovXHJcbiAgICBCb3NzM19KSUFOX0dvbmdTdT0zMDMwMSxcclxuICAgIC8qKmJvc3Mz77yI5Yaw5bed6Zuq5Lq677yJ55qE5YWN55ar5o6n5Yi255qEYnVmZiAqL1xyXG4gICAgQm9zczNfTWlhbllpX0tvbmdaaGk9MzAzMDIsXHJcbiAgICAvKipib3NzNe+8iOeJm+mtlOmFi+mVv++8ieeahOm8k+iInmJ1ZmYgKi9cclxuICAgIEJvc3M1X1NraWxsXzFfZ3V3dT0zMDUwMSxcclxuICAgIC8qKmJvc3M2KOazpea9rSnlh4/mlLvpgJ8gKi9cclxuICAgIEJvc3M2X1NraWxsXzJfamlhbmdvbmdzdT0zMDYwMSxcclxuICAgIC8qKmJvc3M4KOaymeiZqynpu4/mtrLvvIzmjIHnu63kvKTlrrMgKi9cclxuICAgIEJvc3M4X1NraWxsXzJfc2hhbmdoYWk9MzA4MDEsXHJcbiAgICAvKipib3NzOCjmspnomasp6buP5ray77yM5YeP5bCR5pS75Ye75YqbICovXHJcbiAgICBCb3NzOF9Ta2lsbF8yX2F0dGFjaz0zMDgwMixcclxuICAgIC8qKmJvc3M4KOaymeiZqynliqDooYAgKi9cclxuICAgIEJvc3M4X1NraWxsXzFfamlheHVlPTMwODAzLFxyXG4gICAgLyoqYm9zczko5YWw5Y2aKei/h+i9vSAqL1xyXG4gICAgQm9zczlfU2tpbGxfMV9ndW96YWk9MzA5MDEsXHJcbiAgICAvKipib3NzOSjlhbDljZop5peg5pWMICovXHJcbiAgICBCb3NzOV9Ta2lsbF8zX3dpZHU9MzA5MDIsXHJcbiAgICAvKipib3NzMTAo54aU5bKpKem8k+iIniAqL1xyXG4gICAgQm9zczEwX1NraWxsXzNfZ3V3dT0zMTAwMSxcclxuICAgIC8qKmJvc3MxMCjnhpTlsqkp54uC5pq0LeaUu+mAnyAqL1xyXG4gICAgQm9zczEwX1NraWxsXzRfa3VhbmdiYW9fZ3M9MzEwMTEsXHJcbiAgICAvKipib3NzMTAo54aU5bKpKeeLguaatC3mlLvlh7vlipsgKi9cclxuICAgIEJvc3MxMF9Ta2lsbF80X2t1YW5nYmFvX2dqbD0zMTAxMixcclxuICAgIC8qKuaXoOWwvS3ln47lopnliqDooYBCdWZmLOmcgOimgeWKoOS4iuiHqui6q+iLsembhGlk77yM5Yy65YiraWTvvIzov5nmoLfmr4/kuKroi7Hpm4Tpg73lj6/ku6XliqDooYAgKi9cclxuICAgIFdhbGxfRW5kbGVzc19BZGRfaHA9NDAxMDAsXHJcbiAgICBXYWxsX1R1dG9yaWFsX0FkZF9ocD00MDIwMCxcclxuICAgIC8qKuWGsOWuoOeJqeWHj+mAnyAqL1xyXG4gICAgUGV0MV9KaWFuU3U9NTAxMDEsXHJcbiAgICAvKirpo47lrqDnianliqDmlLvpgJ8gKi9cclxuICAgIFBldDNfSmlhU3U9NTAzMDEsXHJcbn1cclxuXHJcbi8qKuaJgOacieeahOWFieeOr2lkICovXHJcbmV4cG9ydCBlbnVtIEhhbG9JZHtcclxuICAgIE51bGw9MCxcclxuICAgIC8qKueyvuiLseaAqi0zMC3onZnonaDvvIjloJXokL3lpKnkvb/vvIkt55qE6KKr5Yqo5YWJ546vICovXHJcbiAgICBNb25zdGVyMzBfQmlhbkZ1X1NraWxsX0hhbG89MjMwMDEsXHJcbiAgICAvKirnsr7oi7HmgKotNjkt54mb5aS06JCo5ruhLeiiq+WKqOWFieeOryAqL1xyXG4gICAgTW9uc3RlcjY5X05pdVNhTWFuX1NraWxsX0hhbG89MjY5MDEsXHJcbiAgICAvKirnsr7oi7HmgKotNzYt55uR552j6ICFLeiiq+WKqOWFieeOryAqL1xyXG4gICAgTW9uc3Rlcjc2X0ppYW5EdVpoZV9Ta2lsbF9IYWxvPTI3NjAxLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFsb0RhdGF7XHJcbiAgICAvKirlhYnnjq/nmoRpZCAqL1xyXG4gICAgaGFsb19pZDpIYWxvSWQ9SGFsb0lkLk51bGw7XHJcbiAgICAvKirlhYnnjq/nmoTmlbDlgLwgKi9cclxuICAgIGhhbG9fdmFsdWU6bnVtYmVyW109W107XHJcbiAgICAvKirlhYnnjq/mnaXmupAs6YG/5YWN5ZCMaWTlj4zlhYnnjq/liKTmlq3nmoTpl67popggKi9cclxuICAgIGhhbG9fc291cmNlX3V1aWQ6c3RyaW5nPScnO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXR0cmlidXRlRGF0YXtcclxuICAgIFxyXG4gICAgcHVibGljIEF0dGFjazpudW1iZXI9MDtcclxuICAgIC8qKumYsuW+oeWKmyAqL1xyXG4gICAgcHVibGljIERlZmVuc2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnlJ/lkb3lgLwgKi9cclxuICAgIHB1YmxpYyBIZWFsdGg6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlkb3kuK3lgLwgKi9cclxuICAgIHB1YmxpYyBIaXQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpl6rpgb/lgLwgKi9cclxuICAgIHB1YmxpYyBNaXNzOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pq05Ye75YC8ICovXHJcbiAgICBwdWJsaWMgQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmrTlh7vlop7luYUgKi9cclxuICAgIHB1YmxpYyBFeHRyYUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Ziy5pq05YC8ICovXHJcbiAgICBwdWJsaWMgQW50aUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pq05Ye75oqX5oCnICovXHJcbiAgICBwdWJsaWMgQW50aUV4dHJhQ3JpdGljYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmma7mlLvlop7kvKQlICovICAgIFxyXG4gICAgcHVibGljIGF0dGFja19pbmNyZWFzZV9kYW1hZ2U6bnVtYmVyPTA7XHJcbiAgICAvKirmioDog73kvKTlrrPlop7kvKQgKi9cclxuICAgIHB1YmxpYyBza2lsbF9pbmNyZWFzZV9kYW1hZ2U6bnVtYmVyPTA7XHJcbiAgICAvKirlhajog73kvKTlrrPlop7kvKQgKi9cclxuICAgIHB1YmxpYyBhbGxfaW5jcmVhc2VfZGFtYWdlOm51bWJlcj0wO1xyXG4gICAgLyoq5YeP5Lyk5YC8ICovXHJcbiAgICBwdWJsaWMgcmVkdWNlX2luanVyeV92YWx1ZTpudW1iZXI9MDtcclxuICAgIC8qKuWHj+S8pOavlOeOhyAqL1xyXG4gICAgcHVibGljIHJlZHVjZV9pbmp1cnlfcmF0ZTpudW1iZXI9MDtcclxuICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaKgOiDveaVsOWAvC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirmioDog73lhrfljbTml7bpl7QgKi9cclxuICAgIHB1YmxpYyBDb2xkRG93bjpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuaKgOiDvS3mioDog73lj4LmlbAxLOiOt+W+l+WFt+S9k+aKgOiDveanveeahOaKgOiDvTHlj4LmlbDvvIzkvb/nlKjvvJpTa2lsbFZhbHVlXzEuZ2V0KDEpICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV94Ok1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq6KKr5Yqo5oqA6IO9LeaKgOiDveWPguaVsDIgKi9cclxuICAgIHB1YmxpYyBTa2lsbFZhbHVlX3k6TWFwPG51bWJlcixudW1iZXI+ID0gbnVsbCA7XHJcbiAgICAvKirooqvliqjmioDog70t5oqA6IO95Y+C5pWwMyAqL1xyXG4gICAgcHVibGljIFNraWxsVmFsdWVfejpNYXA8bnVtYmVyLG51bWJlcj4gPSBudWxsIDtcclxuICAgIC8qKuiiq+WKqOaKgOiDvS3mioDog73lj4LmlbA0ICovXHJcbiAgICBwdWJsaWMgU2tpbGxWYWx1ZV80Ok1hcDxudW1iZXIsbnVtYmVyPiA9IG51bGwgO1xyXG4gICAgLyoq5oqA6IO95piv5ZCm6Kej6ZSBICovXHJcbiAgICBwdWJsaWMgdW5sb2NrX3N0YXRlOk1hcDxudW1iZXIsYm9vbGVhbj4gPSBudWxsIDtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t6ZqQ6JeP5bGe5oCnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvKirnlJ/lkb3lm57lpI0gKi9cclxuICAgIGxpZmVfcmVjb3Zlcnk6bnVtYmVyPTA7XHJcbiAgICAvKirnqb/pgI/lgLwgKi9cclxuICAgIHBlbmV0cmF0aW9uX3ZhbHVlOm51bWJlcj0wO1xyXG4gICAgLyoq56m/6YCP546HICovXHJcbiAgICBwZW5ldHJhdGlvbl9yYXRlOm51bWJlcj0wO1xyXG4gICAgLyoq5ZC46KGA546HICovXHJcbiAgICBibG9vZF9zdWNraW5nX3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirph43kvKTnjocgKi9cclxuICAgIHNlcmlvdXNfaW5qdXJ5X3JhdGU6bnVtYmVyPTA7XHJcbiAgICAvKirlh4/pgJ/mipfmgKcgKi9cclxuICAgIHNsb3dfcmVzaXN0YW5jZTpudW1iZXI9MDtcclxuICAgIC8qKumfp+aApyAqL1xyXG4gICAgdG91Z2huZXNzOm51bWJlcj0wO1xyXG4gICAgLyoq5rSe5a+fICovXHJcbiAgICBpbnNpZ2h0Om51bWJlcj0wOyAgICBcclxufSJdfQ==