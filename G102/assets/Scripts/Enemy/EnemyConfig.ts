export enum Enemy_Type
{
    baoxiang=0,
    mengshe=1,
    jushiguai=2,
    shuyao=3,
    fushubing=4,
    juxiejing=5,
    zhizhu=6,
    feiwen=7,
    munaiyi=8,
    juxiejiang=9,
    xunjieshu=10,
    tiaotiao=11,
    nangua=12,
    shuiyuansu=13,
    zenge=14,
    feiting=15,
    wuweizhe=16,
    luxingsha=17,
    niumo,
    
    enemy_num,
    
}

export enum Enemy_Injured_Type{
    //平A
    Normal_Attack=0,
    //中毒
    ZhongDu=1,
    //会心
    HuiXin=2,
    //爆头
    BaoTou=3,
    //灼烧
    ZhuoShao=4,
    //流血
    LiuXue=5,
    //大树加血
    ZhiLiao=6,
    //憎恶自己回血
    ZengE_HuiXue=7,
    //木乃伊的加血
    MuNaiYi_JiaXue=8,
    //暴击
    BaoJi=9,
    //斩杀
    WuDi=10,
    //格挡
    GeDang=11,
    //闪避
    ShanBi=12,    
    //眩晕
    XuanYun=13,
    //技能
    Skill=14,
    //城墙反伤
    Wall,
    ChaoJiBaoTou,
    /**免疫控制 */
    MianYiKongZhi,
    /**冰女真伤 */
    BingNvZhenShang,
    /**阿努比斯真伤 */
    ANuBiSiZhenShang,
}

export enum Enemy_State
{
    //待机
    standby = 0,
    //移动
    move = 1,
    //攻击
    att = 2,
    //技能
    skill = 3,
    //死亡
    die = 4,
    /**出生，此时是无敌的 */
    born,
    //上船
    ship,
}

export enum Enemy_Buff_Type
{
    //闪避
    shanbi=1,
    //无敌
    wudi=2,
    //挡子弹护盾
    hudun=3,
    //加速
    jiasu=4,
}

export enum Enemy_DeBuff_Type
{
    //中毒
    ZhongDu=0,
    //灼烧
    ZhuoShao=1,
    //流血重伤
    ZhongShang=2,
    //眩晕
    XuanYun=3,
    /**宠物8-减速 */
    JianSu_Pet_8,
    /**宠物12-减速 */
    JianSu_Pet_12,
    /**宠物16-减速 */
    JianSu_Pet_16,
    /**宠物16-减速 */
    JianSu_Pet_13,
    /**宠物15-流血 */
    LiuXue_Pet_15,
    /**宠物16-中毒 */
    ZhongDu_Pet_16,
    /**宠物20-减速 */
    JianSu_Pet_20,
    /**宠物21-增伤 */
    ZengShang_Pet_21,
    /**射手被动技能1暴击减速 */
    JianSu_SheShou_Skill1,
    /**忍者主动技能的流血效果 */
    LiuXue_RenZhe_Active_Skill,
    /**忍者专武减速的效果 */
    JianSu_RenZhe_EX_Skill,
    /**巫女的被动流血效果 */
    LiuXue_WuNv_Ex_Skill,
}

export enum BaoXiang_Anima
{
    beiji='beiji',
    bianxing='bianxing',
    close='close',
    daiji='daiji',
    gongji='gongji',
    pao='pao',
    siwang='siwang',
}


export enum DiMian_Type
{
    paodan_tip=0,
}

export let Enemy_Back_Distance=400;
export let WALL_Y=-268;

