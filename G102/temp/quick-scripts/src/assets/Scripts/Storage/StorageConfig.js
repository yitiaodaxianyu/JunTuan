"use strict";
cc._RF.push(module, 'e8923OWA7NOroLGGHOHE6O5', 'StorageConfig');
// Scripts/Storage/StorageConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageKey = void 0;
var StorageKey;
(function (StorageKey) {
    StorageKey["PropNum"] = "prop_num_";
    StorageKey["MazePassId"] = "maze_pass_id";
    StorageKey["MazeFightingId"] = "maze_fighting_id";
    StorageKey["MazePassingId"] = "maze_passing_id";
    StorageKey["MazeUnSelectSpoils"] = "maze_un_select_spoils";
    StorageKey["MazeShopList"] = "maze_shop_list";
    StorageKey["MazeBuffList"] = "maze_buff_list";
    StorageKey["MazeBuffStage"] = "maze_buff_stage_";
    StorageKey["MazeBoxIdList"] = "maze_box_id_list";
    StorageKey["MazeSubHp"] = "maze_sub_hp";
    StorageKey["MazeFloor"] = "maze_floor";
    StorageKey["MazeLeasePetList"] = "maze_lease_pet_list";
    StorageKey["MazeRandPetList"] = "maze_rand_pet_list_";
    StorageKey["MazeStartDate"] = "maze_start_date";
    StorageKey["PetList"] = "pet_list";
    StorageKey["HeroList"] = "hero_list";
    StorageKey["PetNum"] = "pet_num";
    StorageKey["EquipNum"] = "equip_num";
    StorageKey["BossChallengeStage"] = "boss_challenge_stage_";
    StorageKey["DingYueGetState"] = "ding_yue_get_state_";
    /**今日爬塔通关次数 */
    StorageKey["TowerPassNum"] = "tower_pass_num";
    /**支付次数 */
    StorageKey["PayNum"] = "pay_num_";
    /**支付索引页当天的显示次数 */
    StorageKey["PayUiShowNum"] = "pay_ui_show_num_";
    /**支付索引页当天的显示次数 */
    StorageKey["FuncUiShowNum"] = "func_ui_show_num_";
    /**可以选择的支付id所对应的可以自选的礼包 */
    StorageKey["PaySelectIds"] = "pay_select_ids_";
    /**累计充值龙晶数量 */
    StorageKey["TotalLongJingNum"] = "total_long_jing_num";
    /**累计充值龙晶领取状态 */
    StorageKey["TotalLongJingGetState"] = "total_long_jing_get_state_";
    /**首充领取状态 */
    StorageKey["FirstPayGetState"] = "first_pay_get_state";
    /**自动战斗 */
    StorageKey["AutoFighting"] = "auto_fighting";
    /**英雄专武等级 */
    StorageKey["HeroExclusiveEquip"] = "Hero_Exclusive_Equip_";
    /**关卡星级 */
    StorageKey["LevelStar"] = "level_star_";
    /**下一天零点本地的时间戳值 */
    StorageKey["TomorowZeroTimeStamp"] = "tomorow_zero_time_stamp";
    /**下一周零点本地的时间戳值 */
    StorageKey["NextWeekZeroTimeStamp"] = "next_week_zero_time_stamp";
    /**下一月零点本地的时间戳值 */
    StorageKey["NextMonthZeroTimeStamp"] = "next_month_zero_time_stamp";
    /**商店章节礼包购买 */
    StorageKey["StoreChapterItem"] = "store_chapter_item_";
    /**商店钻石礼包购买 */
    StorageKey["StoreGemItem"] = "store_gem_item_";
    /**商店金币礼包购买 */
    StorageKey["StoreCoinItem"] = "store_coin_item_";
    /**商店每日商店模块 商店ID */
    StorageKey["StoreDailyShopId"] = "store_daily_shop_id";
    /**商店每日商店模块 对应商品的折扣 */
    StorageKey["StoreDailyShopDiscount"] = "store_daily_shop_discount_";
    /**商店每日商店模块，对应商品购买次数 */
    StorageKey["StoreDailyShopNum"] = "store_daily_shop_num";
    /**商店神秘商店模块 宠物免费限制 */
    StorageKey["StoreMysteryPetFreeTime"] = "store_mystery_pet_free_time";
    /**商店神秘商店模块 装备免费限制 */
    StorageKey["StoreMysteryEquipFreeTime"] = "store_mystery_weapon_free_time";
    /**商店英雄招募是否首次抽到英雄 */
    StorageKey["StoreHeroID"] = "store_hero_id_";
    /**新手七日签到天数 */
    StorageKey["NewPlayerSavenDaySignInNum"] = "new_player_saven_day_sign_in_num";
    /**新手七日签到天数时间*/
    StorageKey["NewPlayerSavenDaySignInTime"] = "new_player_saven_day_sign_in_numTime";
    /**新手七日签到完毕 */
    StorageKey["NewPlayerSavenDaySignInOver"] = "new_player_saven_day_sign_in_over";
    /**能否进行签到 */
    StorageKey["CanSignIn"] = "can_sign_in";
    /**日常签到累计天数 */
    StorageKey["DailySignInNum"] = "daily_sign_in_num";
    /**日常签到具体天数 */
    StorageKey["DailySignInDay"] = "daily_sign_in_day_";
    /**日常签到累计奖励具体领取状态 */
    StorageKey["DailySignInCumulativeDay"] = "daily_sign_in_cumulative_day_";
    /**是否可以购买快速挂机 */
    StorageKey["CanFastOffline"] = "game_can_fast_offline";
    /**是否可以通过广告购买快速挂机 */
    StorageKey["CanAdFastOffline"] = "game_can_ad_fast_offline";
    /**是否可以通过广告购买快速挂机 */
    StorageKey["CoinPopAd"] = "coin_pop_ad";
    /**任务id */
    StorageKey["TaskId"] = "task_id_";
    /**任务状态 */
    StorageKey["TaskState"] = "task_state_";
    /**任务目标触发次数 */
    StorageKey["TaskNum"] = "task_num_";
    /**总活跃度 */
    StorageKey["AllActivityNum"] = "all_activity_num";
    /**任务日活跃 */
    StorageKey["TaskDailyActivityNum"] = "task_daily_activity_num";
    /**任务周活跃 */
    StorageKey["TaskWeekActivityNum"] = "task_week_activity_num";
    /**任务日活跃奖励状态 */
    StorageKey["TaskDailyActivityState"] = "task_daily_activity_state_";
    /**任务周活跃奖励状态 */
    StorageKey["TaskWeeklyActivityState"] = "task_weekly_activity_state_";
    /**主线任务展示进度 */
    StorageKey["TaskMainShowIndex"] = "task_main_show_index";
    /**主线任务进度 */
    StorageKey["TaskMainIndex"] = "task_main_index_";
    /**主线任务当前值 */
    StorageKey["TaskMainNum"] = "task_main_num_";
    /**成就任务当前值 */
    StorageKey["TaskAchievementNum"] = "task_achievement_num_";
    /**成就任务进度 */
    StorageKey["TaskAchievementIndex"] = "task_achievement_index_";
    /**是否可以通过广告购买转盘次数 */
    StorageKey["TurmtableAd"] = "turmtable_ad";
    /**是否可以通过免费购买转盘次数 */
    StorageKey["TurmtableFree"] = "turmtable_free";
    /**是否到达免费购买转盘时间 15分钟=900秒*/
    StorageKey["TurmtableFreeTime"] = "turmtable_free_time";
    /**到达免费购买转盘   1:可以免费    0：不可免费*/
    StorageKey["TurmtableFreeYes"] = "turmtable_free_yes";
    /**vip免费奖励状态 */
    StorageKey["VipFreeRewardStatus"] = "vip_free_reward_status_";
    /**vip高级奖励状态 */
    StorageKey["VipAdvancedRewardStatus"] = "vip_advanced_reward_status_";
    /**是否是vip身份 */
    StorageKey["VipIdentity"] = "vip_identity";
    /**vip每日领取状态 */
    StorageKey["VipDailyCollectionStatus"] = "vip_daily_collection_status";
    /**Boss挑战次数 */
    StorageKey["BossChallengeTimes"] = "boss_challenge_times";
    /**无限挑战挑战次数 */
    StorageKey["UnlimitedChallengeTimes"] = "unlimited_challenge_times";
    /**虚空裂缝挑战次数 */
    StorageKey["VoidCrackChallengeTimes"] = "void_crack_challenge_times";
    /**是否可以购买Boss挑战次数 */
    StorageKey["BuyBossChallengeTimes"] = "buy_boss_challenge_times";
    /**是否可以购买无限挑战挑战次数 */
    StorageKey["BuyUnlimitedChallengeTimes"] = "buy_unlimited_challenge_times";
    /**是否可以购买虚空裂缝挑战次数 */
    StorageKey["BuyVoidCrackChallengeTimes"] = "buy_void_crack_challenge_times";
    /**Boss挑战总挑战次数 */
    StorageKey["TotalBossChallengeTimes"] = "total_boss_challenge_times";
    /**无限挑战总挑战次数 */
    StorageKey["TotalUnlimitedChallengeTimes"] = "total_unlimited_challenge_times";
    /**虚空裂缝总挑战次数 */
    StorageKey["TotalVoidCrackChallengeTimes"] = "total_void_crack_challenge_times";
    /**Boss挑战伤害 */
    StorageKey["BossChallengeDamage"] = "boss_challenge_damage";
    /**无限挑战波数 */
    StorageKey["UnlimitedChallengeDamage"] = "unlimited_challenge_damage";
    /**虚空裂缝层数 */
    StorageKey["VoidCrackChallengeDamage"] = "void_crack_challenge_damage";
    // /**总无限最大挑战波数 */
    // UnlimitedChallengeDamageMax = "unlimited_challenge_damage_max",//记录无尽挑战最大的波数
    /**周卡当天是否领取 */
    StorageKey["WeekCardIsReceiveToday"] = "week_card_is_receive_today";
    /**周卡到期时间 */
    StorageKey["WeekCardOverTime"] = "week_card_over_time";
    /**是否首次购买周卡 */
    StorageKey["WeekCardIsFirstBuy"] = "week_card_is_first_buy";
    /**周卡免广告次数 */
    StorageKey["WeekCardFreeAdNum"] = "week_card_free_ad_num";
    /**当天是否首次登录 */
    StorageKey["TodayIsFirstLogIn"] = "today_is_first_log_in";
    /**自动战斗剩余试用时间 */
    StorageKey["try_auto_fight_remain"] = "try_auto_fight";
    /**加速剩余试用时间 */
    StorageKey["try_rate_fight_remain"] = "try_rate_fight";
})(StorageKey = exports.StorageKey || (exports.StorageKey = {}));

cc._RF.pop();