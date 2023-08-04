import Monster from "../../Monster/Monster";

export class HeroInfo{
    /**英雄id */
    hero_type:Hero_Type=Hero_Type.ChangMaoShou;
    /**英雄的等级 */
    hero_level:number=0;
    /**英雄品质 */
    hero_quality:number=1;
    /**英雄阶段 */
    hero_stage:number = 0;
    /**绑定的宠物,null表示无绑定 */
    pet_id:number=0;
    /**专属武器等级 */
    exclusive_equip_stage:number = 0;
    /**装备位1-武器-装备id */
    wear1:number=0;
    /**装备位2-护甲-装备id */
    wear2:number=0;
    /**装备位3-饰品-装备id */
    wear3:number=0;
    /**装备位4-鞋子-装备id */
    wear4:number=0;

    /**更换绑定的宠物 */
    // changeBindPet(petInfo:PetInfo){
    //     this.pet_info=petInfo;
    // }        
}
    
export enum SkillTipType{
    /**全屏 */
    Full=0,
    /**圆 */
    Circle=1,
    /**矩形 */
    Rect=2,
    /**方向 */
    Dir=3,
}

export enum Hero_Type
{
  
    //没英雄
    NULL=0,
    /**长矛手 */
    ChangMaoShou=1,
    /**兽王 */
    ShouWang,
    /**炮手 */
    PaoShou,
    /**德鲁伊 */
    DeLuYi,
    /**狂战士 */
    KuangZhanShi,
    /**贞德 */
    ZhenDe,
    /**女巫 */
    NvWu,
    /**弓箭手 */
    GongJianShou,
    /**冰女 */
    BingNv,
    /**阿努比斯 */
    ANuBiSi,
    /**魅魔 */
    MeiMo,
    /**雷神 */
    LeiShen,

    Hero_Num
}

export enum Btn_Hero_Type{
    role=1,
    map=2,
}

export enum Hero_State
{
    idle=0,
    attack=1,
    skill=2,
    /**退场，此时只隐藏 */
    exit=3,
}

export enum AttRangeType
{
    LuDi=1,
    TianKong=2,
    DunDi=3,
}

export enum GongJi_FangXiang
{
    zuo=0,
    zhong=1,
    you=2,
}

export enum JianShi_Type
{
    putong=0,
    jineng=1,
    super=2,
}

export enum PaoDan_Type
{
    skill=0,
    super=1,
    exclusive=2,
}

export enum FeiBiao_Type
{
    /**被动技能1 */
    skill1=0,
    /**专武技能 */
    ex_skill=1,
}

export enum SkillType{
    /**空 */
    Null=0,
    /**主动技能 */
    Active=1,
    /**被动技能1 */
    Passive_1=2,
    /**被动技能2 */
    Passive_2=3,
}

export enum Hero_DeBuff{
    /**眩晕 */
    XuanYun=1,
    /**暴击后普通增伤cd3秒 */
    crit_increase_cd_3=2,

}
/**技能指示器类型 */
export enum SkillIndicatorType{
    /**直线方向类型，只管负责显示方向 */
    beeline=0,
    /**目标位置类型，负责显示目标位置和具体的大小 */
    target,
}

export enum Hero_State_Name
{
    /**正面待机 */
    Idle = "Idle",       //-- 正面待机
    /**侧面待机 */
    cmdj = "cemian_daiji",          //-- 侧面待机
    /**攻击 */
    Attack = "Attack",             //-- 正面攻击
    /**技能 */
    Skill = "Skill",                //-- 侧面攻击
}


export class BingNvWallData{
    boss_ts:Monster=null;
    back_monsters:cc.Node[]=[];
}

/**造成的伤害的类型 */
export enum DamageType{
    /**普通攻击的伤害 */
    Normal=1,
    /**主动技能的伤害 */
    Skill,
    /**被动技能的伤害 */

    //船撞的伤害
    Ship
}

export enum ShieldType{
    /**抵消普通攻击的伤害 */
    Normal=1,
    /**抵消技能的伤害 */
    Skill,    
    /**所有的伤害 */
    All,
}

export enum ShieldId{
    /**炮手主动技能 */
    PaoShou_ActiveSkill=1,
    /**忍者被动技能 */
    RenZhe_Skill2=2,

    /**测试 */
    Test,
}
/**buff状态类型 */
export enum BuffStateType{
    Null=0,
    /**攻击力 */
    Attack=1,
    /**攻击速度 */
    AttackSpeed,    
    /**防御力 */
    Defense,
    /**生命值 */
    Health,
    /**命中率 */
    HitRate,
    /**暴击率 */
    CritRate,
    /**暴击增幅 */
    ExtraCritical,
    /**闪避 */
    Miss,
    /**防暴值 */
    AntiCritical,
    /**暴击抗性 */
    AntiExtraCritical,
    /**冷却时间*/
    ColdTime,
}
/**Buff类型 */
export enum BuffType{
    /**普通的 */
    Normal=0,
    /**眩晕类 */
    Vertigo=1,
    /**捆绑 */
    Binding=2,
    /**减速 */
    Slowdown=3,
    /**牵引 */
    Traction=4,
    /**击退 */
    Knockback=5,
    /**禁锢 */
    Confine=6,
    /**buff层数达到条件后爆发类 */
    Burst=7,
    /**增益类 */
    Gain=8,
    /**加速（移动速度）类 */
    MoveSpeedUp=9,
    /**加速（攻击速度）类 */
    AttSpeedUp=10,
    /**重伤类 */
    SeriouslyInjured=11,
    // /**治疗 */
    // Recovery=7,
}

/**所有BUFF/DEBUFF的ID */
export enum BuffId{
    Null=0,
    Hero_XuanYun=10001,
    /**德鲁伊专武-真伤debuff */
    Hero_DeLuYi_Ex=10401,
    /**狂战士大招 */
    Hero_KuangZhanShi_DaZhao=10501,
    /**贞德被动技能的加暴击率和命中率 */
    Hero_ZhenDe_BaoJiMingZhongLv=10601,
    /**贞德主动技能的加攻速 */
    Hero_ZhenDe_Gongsu=10602,
    /**贞德被动技能的加血减伤 */
    Hero_ZhenDe_JiaXueJianShang=10603,
    /**女巫被动1，中毒效果 */
    Hero_NvWu_Skill1_Zhongdu=10701,
    /**女巫主动技能，中伤效果 */
    Hero_NvWu_Skill1_ZhongShang=10702,
    /**女巫专武技能，减攻速效果 */
    Hero_NvWu_ExSkill_JianGongSu=10703,
    /**长矛手的被动技能技能增伤 */
    Hero_ChangMaoShow_Skill=10801,
    /**长矛手的主动技能攻速 */
    Hero_ChangMaoShow_GongSu=10803,
    /**冰女被动减速 */
    Hero_BingNv_Skill1_JianSu=10901,
    /**阿努比斯被动减速 */
    Hero_ANuBiSi_Skill1_JianSu=11001,
    /**阿努比斯全屏减速 */
    Hero_ANuBiSi_Active_Skill_JianSu=11002,
    /**魅魔的被动技能攻速 */
    Hero_MeiMo_GongSu=11101,
    /**魅魔的主动技能魅惑 */
    Hero_MeiMo_Active_MeiHuo=11111,
    /**魅魔的主动技能魅惑 */
    Hero_MeiMo_Active_ZhengShang=11112,
    /**英雄-雷神超负荷效果 */
    Hero_LeiShen_ChaoFuHe=11201,
    Monster_XuanYun=20001,
    Elite68_NiuJiangJun_JiaSu=26801,
    /**鱼魔移速 */
    Elite71_FishBully_JiaYiSu=27101,
    /**鱼魔攻击速度 */
    Elite71_FishBully_JiaGongSu=27202,
    /**boss模式下，boss通用的受击增伤的debuff效果 */
    Boss_Mode_JianShang=30001,
    /**boss2（铠甲战士）的免疫普通攻击，免疫控制效果buff */
    Boss2_MianYi_Attack=30201,
    /**boss3（冰川雪人）的减攻速buff */
    Boss3_JIAN_GongSu=30301,
    /**boss3（冰川雪人）的免疫控制的buff */
    Boss3_MianYi_KongZhi=30302,
    /**boss5（牛魔酋长）的鼓舞buff */
    Boss5_Skill_1_guwu=30501,
    /**boss6(泥潭)减攻速 */
    Boss6_Skill_2_jiangongsu=30601,
    /**boss8(沙虫)黏液，持续伤害 */
    Boss8_Skill_2_shanghai=30801,
    /**boss8(沙虫)黏液，减少攻击力 */
    Boss8_Skill_2_attack=30802,
    /**boss8(沙虫)加血 */
    Boss8_Skill_1_jiaxue=30803,
    /**boss9(兰博)过载 */
    Boss9_Skill_1_guozai=30901,
    /**boss9(兰博)无敌 */
    Boss9_Skill_3_widu=30902,
    /**boss10(熔岩)鼓舞 */
    Boss10_Skill_3_guwu=31001,
    /**boss10(熔岩)狂暴-攻速 */
    Boss10_Skill_4_kuangbao_gs=31011,
    /**boss10(熔岩)狂暴-攻击力 */
    Boss10_Skill_4_kuangbao_gjl=31012,
    /**无尽-城墙加血Buff,需要加上自身英雄id，区别id，这样每个英雄都可以加血 */
    Wall_Endless_Add_hp=40100,
    Wall_Tutorial_Add_hp=40200,
    /**冰宠物减速 */
    Pet1_JianSu=50101,
    /**风宠物加攻速 */
    Pet3_JiaSu=50301,
}

/**所有的光环id */
export enum HaloId{
    Null=0,
    /**精英怪-30-蝙蝠（堕落天使）-的被动光环 */
    Monster30_BianFu_Skill_Halo=23001,
    /**精英怪-69-牛头萨满-被动光环 */
    Monster69_NiuSaMan_Skill_Halo=26901,
    /**精英怪-76-监督者-被动光环 */
    Monster76_JianDuZhe_Skill_Halo=27601,
}

export class HaloData{
    /**光环的id */
    halo_id:HaloId=HaloId.Null;
    /**光环的数值 */
    halo_value:number[]=[];
    /**光环来源,避免同id双光环判断的问题 */
    halo_source_uuid:string='';
}

export class AttributeData{
    
    public Attack:number=0;
    /**防御力 */
    public Defense:number = 0 ;
    /**生命值 */
    public Health:number = 0 ;
    /**命中值 */
    public Hit:number = 0 ;
    /**闪避值 */
    public Miss:number = 0 ;
    /**暴击值 */
    public Critical:number = 0 ;
    /**暴击增幅 */
    public ExtraCritical:number = 0 ;
    /**防暴值 */
    public AntiCritical:number = 0 ;
    /**暴击抗性 */
    public AntiExtraCritical:number = 0 ;
    /**普攻增伤% */    
    public attack_increase_damage:number=0;
    /**技能伤害增伤 */
    public skill_increase_damage:number=0;
    /**全能伤害增伤 */
    public all_increase_damage:number=0;
    /**减伤值 */
    public reduce_injury_value:number=0;
    /**减伤比率 */
    public reduce_injury_rate:number=0;
     //---------------------------技能数值--------------------------------------
    /**技能冷却时间 */
    public ColdDown:Map<number,number> = null ;
    /**技能-技能参数1,获得具体技能槽的技能1参数，使用：SkillValue_1.get(1) */
    public SkillValue_x:Map<number,number> = null ;
    /**被动技能-技能参数2 */
    public SkillValue_y:Map<number,number> = null ;
    /**被动技能-技能参数3 */
    public SkillValue_z:Map<number,number> = null ;
    /**被动技能-技能参数4 */
    public SkillValue_4:Map<number,number> = null ;
    /**技能是否解锁 */
    public unlock_state:Map<number,boolean> = null ;
    //---------------------------隐藏属性------------------------------------------
    /**生命回复 */
    life_recovery:number=0;
    /**穿透值 */
    penetration_value:number=0;
    /**穿透率 */
    penetration_rate:number=0;
    /**吸血率 */
    blood_sucking_rate:number=0;
    /**重伤率 */
    serious_injury_rate:number=0;
    /**减速抗性 */
    slow_resistance:number=0;
    /**韧性 */
    toughness:number=0;
    /**洞察 */
    insight:number=0;    
}