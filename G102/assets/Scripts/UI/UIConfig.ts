
/**UI预制体的路径 */
export enum UIPath{
    Null='',
    SignIn = 'signIn/sign_ui',
    SignInDaily = 'signIn/sign_daily_ui',
    SignInGet= 'signIn/sign_get_tip',
    SignInBuy= 'signIn/sign_in_buy_ui',
    Bag = 'bag/bag_ui',
    ExclusiveStrengthening = 'exclusive/exclusive_weapons_strengthening_ui',
    Exclusive = 'exclusive/exclusive_weapons_ui',
    Set = 'set/setting_ui',
    AvatarRoot = 'set/avatarRoot',
    EquipSynthetic = 'equipment/equip_synthetic_ui',
    Mall = 'mall/gold_mall_ui',
    TakeEgg = 'takeEgg/take_egg_ui',
    Wishing = 'wishing/wishing_ui',
    WishingTips = 'wishing/wishing_tip_ui',
    Task = 'task/task_ui',
    ToPlay = 'toPlay/to_play_main_ui',
    TowerFightting = 'tower/tower_fighting_ui',
    Tower = 'tower_ui',
    FastGuaJi = 'guaji/fast_guaji_ui',
    Guaji = 'guaji/guaji_ui',
    UserLevel = 'userLevel/user_level_ui',
    Attribute = 'heros/attribute_ui',
    HeroSkill = 'heros/hero_skill_ui',
    HeroGrowth = 'heros/hero_ui',
    StoreHeroUi = 'store/store_hero_ui',
    StoreHeroShowUi = 'store/store_hero_show_ui',
    GameWin = 'ui/game/game_win',
    ProbabilityTipUi = 'store/probability_tip_ui',
    FirstCharge='payment/pay_first_charge_ui',
    GetAssetsTip='get_assets_ui',
    Dialog='dialog',

    CoinPop = 'CoinPop',//金币不足与钻石不足

    Turntable='Turntable/Turntable',//转盘

    RankingList='RankingList/RankingList',//排行榜

    BuyBattlePotion='ui/game/buy_battle_potion',

    VipSystem='vipsystem/VipSystem',//vip

    VndlessChallenges = 'copy/endlesschallenges/endlesschallenges',//副本   无尽挑战与boss挑战的出战界面
    PlayinsTructions = 'copy/endlesschallenges/playinstructions',//副本   无尽挑战与boss挑战的玩法说明界面
    RewardDisplay = 'copy/endlesschallenges/rewarddisplay',//副本   无尽挑战与boss挑战的奖励展示界面
    AccumulatedRecharge = 'accumulatedRecharge/accumulated_recharge_ui',//累充

    RankingRewardDisplay = 'copy/endlesschallenges/rankingrewarddisplay',// boss挑战 排行榜里面的本周奖励展示
    PurchasesNumbe = 'copy/endlesschallenges/purchasesnumbe',// 无尽挑战与boss挑战 购买挑战次数
    
    MoppingUp = 'copy/endlesschallenges/MoppingUp',// 无尽挑战与boss挑战 扫荡弹窗

    MoppingVoid = 'copy/endlesschallenges/MoppingVoid',// 虚空 扫荡弹窗

    PetList = 'pet/ui/pet_exchange_ui',

    BuffDisplay = 'copy/endlesschallenges/BuffDisplay',// 无尽挑战Buff选择弹窗与Buff展示弹窗

    Shop = 'copy/endlesschallenges/Shop',// 虚空裂缝的商店

    VoidScene = 'copy/endlesschallenges/VoidScene',// 虚空裂缝的格子场景界面

    Windfall = 'copy/endlesschallenges/Windfall',// 虚空裂缝的意外之财

    BattlePop = 'copy/endlesschallenges/BattlePop',// 虚空裂缝的战役

    PetInfo = 'pet/ui/pet_info_ui',

    WeekCard = 'weekCard/week_card_ui',
    
    ExclusiveInfoUi = 'exclusive/exclusive_info_ui',
    EquipInfo = 'equipment/equip_info_ui',
    /**教程奖励SS角色的UI */
    RewardSSUI="tutorials/reward_ss_ui",
}
/**UI节点的层级 */
export enum UILayerLevel{
    One=1,
    Two=2,
    Three=3,
    Four=4,
}

export enum UI_ZIndex{
    Normal=0,

    Loading=9997,    
    UiTouch=9998,
    Front=9999,
}

export enum EffectPath{
    HeroUpgrade0 = "effects/home/role_upgrade/role_upgrade_0",
    HeroUpgrade1 = "effects/home/role_upgrade/role_upgrade_1",

}
// home场景预加载预制体
export const HomePreLoad:string[]=[
    UIPath.ToPlay,
    UIPath.HeroGrowth,
    EffectPath.HeroUpgrade0,
    UIPath.VoidScene
];

export const GamePreLoad:string[]=[
    UIPath.CoinPop
];