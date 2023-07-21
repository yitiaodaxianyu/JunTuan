"use strict";
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