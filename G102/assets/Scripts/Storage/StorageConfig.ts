export enum StorageKey{
    PropNum='prop_num_',
    MazePassId='maze_pass_id',
    MazeFightingId='maze_fighting_id',
    MazePassingId='maze_passing_id',
    MazeUnSelectSpoils='maze_un_select_spoils',
    MazeShopList='maze_shop_list',
    MazeBuffList='maze_buff_list',
    MazeBuffStage='maze_buff_stage_',
    MazeBoxIdList='maze_box_id_list',
    MazeSubHp='maze_sub_hp',
    MazeFloor='maze_floor',
    MazeLeasePetList='maze_lease_pet_list',
    MazeRandPetList='maze_rand_pet_list_',
    MazeStartDate='maze_start_date',
    PetList='pet_list',
    HeroList='hero_list',
    PetNum='pet_num',
    EquipNum='equip_num',

    BossChallengeStage='boss_challenge_stage_',

    DingYueGetState='ding_yue_get_state_',

    /**今日爬塔通关次数 */
    TowerPassNum='tower_pass_num',
    /**支付次数 */
    PayNum='pay_num_',
    /**支付索引页当天的显示次数 */
    PayUiShowNum='pay_ui_show_num_',
    /**支付索引页当天的显示次数 */
    FuncUiShowNum='func_ui_show_num_',
    /**可以选择的支付id所对应的可以自选的礼包 */
    PaySelectIds='pay_select_ids_',
    /**累计充值龙晶数量 */
    TotalLongJingNum='total_long_jing_num',
    /**累计充值龙晶领取状态 */
    TotalLongJingGetState="total_long_jing_get_state_",
    /**首充领取状态 */
    FirstPayGetState="first_pay_get_state",
    /**自动战斗 */
    AutoFighting="auto_fighting",
    /**英雄专武等级 */
    HeroExclusiveEquip="Hero_Exclusive_Equip_",
        /**是否分享过 */
    SharDimo="SharDimo",

    /**关卡星级 */
    LevelStar="level_star_",

    /**下一天零点本地的时间戳值 */
    TomorowZeroTimeStamp = "tomorow_zero_time_stamp",
    /**下一周零点本地的时间戳值 */
    NextWeekZeroTimeStamp = "next_week_zero_time_stamp",
    /**下一月零点本地的时间戳值 */
    NextMonthZeroTimeStamp = "next_month_zero_time_stamp",
    
    /**商店章节礼包购买 */
    StoreChapterItem = "store_chapter_item_",
    /**商店钻石礼包购买 */
    StoreGemItem = "store_gem_item_",
    /**商店金币礼包购买 */
    StoreCoinItem = "store_coin_item_",
    /**商店每日商店模块 商店ID */
    StoreDailyShopId = "store_daily_shop_id",
    /**商店每日商店模块 对应商品的折扣 */
    StoreDailyShopDiscount = "store_daily_shop_discount_",
    /**商店每日商店模块，对应商品购买次数 */
    StoreDailyShopNum = "store_daily_shop_num",
    /**商店神秘商店模块 宠物免费限制 */
    StoreMysteryPetFreeTime = "store_mystery_pet_free_time",
    /**商店神秘商店模块 装备免费限制 */
    StoreMysteryEquipFreeTime = "store_mystery_weapon_free_time",
    /**商店英雄招募是否首次抽到英雄 */
    StoreHeroID = "store_hero_id_",

    /**新手七日签到天数 */
    NewPlayerSavenDaySignInNum = "new_player_saven_day_sign_in_num",
      /**新手七日签到天数时间*/
     NewPlayerSavenDaySignInTime = "new_player_saven_day_sign_in_numTime",
    /**新手七日签到完毕 */
    NewPlayerSavenDaySignInOver = "new_player_saven_day_sign_in_over",
    /**能否进行签到 */
    CanSignIn = "can_sign_in",
    /**日常签到累计天数 */
    DailySignInNum = "daily_sign_in_num",
    /**日常签到具体天数 */
    DailySignInDay = "daily_sign_in_day_",
    /**日常签到累计奖励具体领取状态 */
    DailySignInCumulativeDay = "daily_sign_in_cumulative_day_",

    /**是否可以购买快速挂机 */
    CanFastOffline = "game_can_fast_offline",
    /**是否可以通过广告购买快速挂机 */
    CanAdFastOffline = "game_can_ad_fast_offline",
    /**是否可以通过广告购买快速挂机 */
    CoinPopAd = "coin_pop_ad",

    /**任务id */
    TaskId = "task_id_",
    /**任务状态 */
    TaskState = "task_state_",
    /**任务目标触发次数 */
    TaskNum = "task_num_",
    /**总活跃度 */
    AllActivityNum = "all_activity_num",
    /**任务日活跃 */
    TaskDailyActivityNum = "task_daily_activity_num",
    /**任务周活跃 */
    TaskWeekActivityNum = "task_week_activity_num",
    /**任务日活跃奖励状态 */
    TaskDailyActivityState = "task_daily_activity_state_",//0未领取,1已领取
    /**任务周活跃奖励状态 */
    TaskWeeklyActivityState = "task_weekly_activity_state_",//0未领取,1已领取
   /**观看视频次数计数 */
    VIPADNum="VIPADNum",

    /**主线任务展示进度 */
    TaskMainShowIndex = "task_main_show_index",
    /**主线任务进度 */
    TaskMainIndex = "task_main_index_",
    /**主线任务当前值 */
    TaskMainNum = "task_main_num_", 
    /**成就任务当前值 */
    TaskAchievementNum = "task_achievement_num_",
    /**成就任务进度 */
    TaskAchievementIndex = "task_achievement_index_",

    /**是否可以通过广告购买转盘次数 */
    TurmtableAd = "turmtable_ad",

    /**是否可以通过免费购买转盘次数 */
    TurmtableFree = "turmtable_free",

    /**是否到达免费购买转盘时间 15分钟=900秒*/
    TurmtableFreeTime = "turmtable_free_time",
    /**到达免费购买转盘   1:可以免费    0：不可免费*/
    TurmtableFreeYes= "turmtable_free_yes",

    /**vip免费奖励状态 */
    VipFreeRewardStatus = "vip_free_reward_status_",//0未领取,1已领取     0-14

    /**vip高级奖励状态 */ 
    VipAdvancedRewardStatus = "vip_advanced_reward_status_",//0未领取,1已领取     0-14

    /**是否是vip身份 */
    VipIdentity = "vip_identity",//0:不是vip   1：是vip

    /**vip每日领取状态 */
    VipDailyCollectionStatus = "vip_daily_collection_status",//0:未领取   1：已领取   每日刷新

    /**Boss挑战次数 */
    BossChallengeTimes = "boss_challenge_times",//每天更新   3次
    /**无限挑战挑战次数 */
    UnlimitedChallengeTimes = "unlimited_challenge_times",//每天更新    3次
    /**虚空裂缝挑战次数 */
    VoidCrackChallengeTimes = "void_crack_challenge_times",//每天更新    3次

    /**是否可以购买Boss挑战次数 */
    BuyBossChallengeTimes = "buy_boss_challenge_times",//每天更新   3次
    /**是否可以购买无限挑战挑战次数 */
    BuyUnlimitedChallengeTimes = "buy_unlimited_challenge_times",//每天更新     3次
    /**是否可以购买虚空裂缝挑战次数 */
    BuyVoidCrackChallengeTimes = "buy_void_crack_challenge_times",//每天更新     3次

    /**Boss挑战总挑战次数 */
    TotalBossChallengeTimes = "total_boss_challenge_times",//累加次数
    /**无限挑战总挑战次数 */
    TotalUnlimitedChallengeTimes = "total_unlimited_challenge_times",//累加次数
    /**虚空裂缝总挑战次数 */
    TotalVoidCrackChallengeTimes = "total_void_crack_challenge_times",//累加次数

    /**Boss挑战伤害 */
    BossChallengeDamage = "boss_challenge_damage",//记录上一次的伤害
    /**无限挑战波数 */
    UnlimitedChallengeDamage = "unlimited_challenge_damage",//记录上一次的波数
    /**虚空裂缝层数 */
    VoidCrackChallengeDamage = "void_crack_challenge_damage",//记录已经打完多少层了    1-8层   默认0层   打完第一层  就是1
    

    // /**总无限最大挑战波数 */
    // UnlimitedChallengeDamageMax = "unlimited_challenge_damage_max",//记录无尽挑战最大的波数

    /**周卡当天是否领取 */
    WeekCardIsReceiveToday = "week_card_is_receive_today",
    /**周卡到期时间 */
    WeekCardOverTime = "week_card_over_time",
    /**是否首次购买周卡 */
    WeekCardIsFirstBuy = "week_card_is_first_buy",
    /**周卡免广告次数 */
    WeekCardFreeAdNum = "week_card_free_ad_num",

    /**当天是否首次登录 */
    TodayIsFirstLogIn = "today_is_first_log_in",

    /**自动战斗剩余试用时间 */
    try_auto_fight_remain="try_auto_fight",
    /**加速剩余试用时间 */
    try_rate_fight_remain="try_rate_fight",
}

