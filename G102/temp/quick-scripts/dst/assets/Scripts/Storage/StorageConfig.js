
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Storage/StorageConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
    /**是否分享过 */
    StorageKey["SharDimo"] = "SharDimo";
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
    /**观看视频次数计数 */
    StorageKey["VIPADNum"] = "VIPADNum";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmFnZVxcU3RvcmFnZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFVBdU1YO0FBdk1ELFdBQVksVUFBVTtJQUNsQixtQ0FBbUIsQ0FBQTtJQUNuQix5Q0FBeUIsQ0FBQTtJQUN6QixpREFBaUMsQ0FBQTtJQUNqQywrQ0FBK0IsQ0FBQTtJQUMvQiwwREFBMEMsQ0FBQTtJQUMxQyw2Q0FBNkIsQ0FBQTtJQUM3Qiw2Q0FBNkIsQ0FBQTtJQUM3QixnREFBZ0MsQ0FBQTtJQUNoQyxnREFBZ0MsQ0FBQTtJQUNoQyx1Q0FBdUIsQ0FBQTtJQUN2QixzQ0FBc0IsQ0FBQTtJQUN0QixzREFBc0MsQ0FBQTtJQUN0QyxxREFBcUMsQ0FBQTtJQUNyQywrQ0FBK0IsQ0FBQTtJQUMvQixrQ0FBa0IsQ0FBQTtJQUNsQixvQ0FBb0IsQ0FBQTtJQUNwQixnQ0FBZ0IsQ0FBQTtJQUNoQixvQ0FBb0IsQ0FBQTtJQUVwQiwwREFBMEMsQ0FBQTtJQUUxQyxxREFBcUMsQ0FBQTtJQUVyQyxjQUFjO0lBQ2QsNkNBQTZCLENBQUE7SUFDN0IsVUFBVTtJQUNWLGlDQUFpQixDQUFBO0lBQ2pCLGtCQUFrQjtJQUNsQiwrQ0FBK0IsQ0FBQTtJQUMvQixrQkFBa0I7SUFDbEIsaURBQWlDLENBQUE7SUFDakMsMEJBQTBCO0lBQzFCLDhDQUE4QixDQUFBO0lBQzlCLGNBQWM7SUFDZCxzREFBc0MsQ0FBQTtJQUN0QyxnQkFBZ0I7SUFDaEIsa0VBQWtELENBQUE7SUFDbEQsWUFBWTtJQUNaLHNEQUFzQyxDQUFBO0lBQ3RDLFVBQVU7SUFDViw0Q0FBNEIsQ0FBQTtJQUM1QixZQUFZO0lBQ1osMERBQTBDLENBQUE7SUFDdEMsV0FBVztJQUNmLG1DQUFtQixDQUFBO0lBRW5CLFVBQVU7SUFDVix1Q0FBdUIsQ0FBQTtJQUV2QixrQkFBa0I7SUFDbEIsOERBQWdELENBQUE7SUFDaEQsa0JBQWtCO0lBQ2xC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c0MsQ0FBQTtBQUMxQyxDQUFDLEVBdk1XLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBdU1yQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIFN0b3JhZ2VLZXl7XHJcbiAgICBQcm9wTnVtPSdwcm9wX251bV8nLFxyXG4gICAgTWF6ZVBhc3NJZD0nbWF6ZV9wYXNzX2lkJyxcclxuICAgIE1hemVGaWdodGluZ0lkPSdtYXplX2ZpZ2h0aW5nX2lkJyxcclxuICAgIE1hemVQYXNzaW5nSWQ9J21hemVfcGFzc2luZ19pZCcsXHJcbiAgICBNYXplVW5TZWxlY3RTcG9pbHM9J21hemVfdW5fc2VsZWN0X3Nwb2lscycsXHJcbiAgICBNYXplU2hvcExpc3Q9J21hemVfc2hvcF9saXN0JyxcclxuICAgIE1hemVCdWZmTGlzdD0nbWF6ZV9idWZmX2xpc3QnLFxyXG4gICAgTWF6ZUJ1ZmZTdGFnZT0nbWF6ZV9idWZmX3N0YWdlXycsXHJcbiAgICBNYXplQm94SWRMaXN0PSdtYXplX2JveF9pZF9saXN0JyxcclxuICAgIE1hemVTdWJIcD0nbWF6ZV9zdWJfaHAnLFxyXG4gICAgTWF6ZUZsb29yPSdtYXplX2Zsb29yJyxcclxuICAgIE1hemVMZWFzZVBldExpc3Q9J21hemVfbGVhc2VfcGV0X2xpc3QnLFxyXG4gICAgTWF6ZVJhbmRQZXRMaXN0PSdtYXplX3JhbmRfcGV0X2xpc3RfJyxcclxuICAgIE1hemVTdGFydERhdGU9J21hemVfc3RhcnRfZGF0ZScsXHJcbiAgICBQZXRMaXN0PSdwZXRfbGlzdCcsXHJcbiAgICBIZXJvTGlzdD0naGVyb19saXN0JyxcclxuICAgIFBldE51bT0ncGV0X251bScsXHJcbiAgICBFcXVpcE51bT0nZXF1aXBfbnVtJyxcclxuXHJcbiAgICBCb3NzQ2hhbGxlbmdlU3RhZ2U9J2Jvc3NfY2hhbGxlbmdlX3N0YWdlXycsXHJcblxyXG4gICAgRGluZ1l1ZUdldFN0YXRlPSdkaW5nX3l1ZV9nZXRfc3RhdGVfJyxcclxuXHJcbiAgICAvKirku4rml6XniKzloZTpgJrlhbPmrKHmlbAgKi9cclxuICAgIFRvd2VyUGFzc051bT0ndG93ZXJfcGFzc19udW0nLFxyXG4gICAgLyoq5pSv5LuY5qyh5pWwICovXHJcbiAgICBQYXlOdW09J3BheV9udW1fJyxcclxuICAgIC8qKuaUr+S7mOe0ouW8lemhteW9k+WkqeeahOaYvuekuuasoeaVsCAqL1xyXG4gICAgUGF5VWlTaG93TnVtPSdwYXlfdWlfc2hvd19udW1fJyxcclxuICAgIC8qKuaUr+S7mOe0ouW8lemhteW9k+WkqeeahOaYvuekuuasoeaVsCAqL1xyXG4gICAgRnVuY1VpU2hvd051bT0nZnVuY191aV9zaG93X251bV8nLFxyXG4gICAgLyoq5Y+v5Lul6YCJ5oup55qE5pSv5LuYaWTmiYDlr7nlupTnmoTlj6/ku6Xoh6rpgInnmoTnpLzljIUgKi9cclxuICAgIFBheVNlbGVjdElkcz0ncGF5X3NlbGVjdF9pZHNfJyxcclxuICAgIC8qKue0r+iuoeWFheWAvOm+meaZtuaVsOmHjyAqL1xyXG4gICAgVG90YWxMb25nSmluZ051bT0ndG90YWxfbG9uZ19qaW5nX251bScsXHJcbiAgICAvKirntK/orqHlhYXlgLzpvpnmmbbpooblj5bnirbmgIEgKi9cclxuICAgIFRvdGFsTG9uZ0ppbmdHZXRTdGF0ZT1cInRvdGFsX2xvbmdfamluZ19nZXRfc3RhdGVfXCIsXHJcbiAgICAvKirpppblhYXpooblj5bnirbmgIEgKi9cclxuICAgIEZpcnN0UGF5R2V0U3RhdGU9XCJmaXJzdF9wYXlfZ2V0X3N0YXRlXCIsXHJcbiAgICAvKiroh6rliqjmiJjmlpcgKi9cclxuICAgIEF1dG9GaWdodGluZz1cImF1dG9fZmlnaHRpbmdcIixcclxuICAgIC8qKuiLsembhOS4k+atpuetiee6pyAqL1xyXG4gICAgSGVyb0V4Y2x1c2l2ZUVxdWlwPVwiSGVyb19FeGNsdXNpdmVfRXF1aXBfXCIsXHJcbiAgICAgICAgLyoq5piv5ZCm5YiG5Lqr6L+HICovXHJcbiAgICBTaGFyRGltbz1cIlNoYXJEaW1vXCIsXHJcblxyXG4gICAgLyoq5YWz5Y2h5pif57qnICovXHJcbiAgICBMZXZlbFN0YXI9XCJsZXZlbF9zdGFyX1wiLFxyXG5cclxuICAgIC8qKuS4i+S4gOWkqembtueCueacrOWcsOeahOaXtumXtOaIs+WAvCAqL1xyXG4gICAgVG9tb3Jvd1plcm9UaW1lU3RhbXAgPSBcInRvbW9yb3dfemVyb190aW1lX3N0YW1wXCIsXHJcbiAgICAvKirkuIvkuIDlkajpm7bngrnmnKzlnLDnmoTml7bpl7TmiLPlgLwgKi9cclxuICAgIE5leHRXZWVrWmVyb1RpbWVTdGFtcCA9IFwibmV4dF93ZWVrX3plcm9fdGltZV9zdGFtcFwiLFxyXG4gICAgLyoq5LiL5LiA5pyI6Zu254K55pys5Zyw55qE5pe26Ze05oiz5YC8ICovXHJcbiAgICBOZXh0TW9udGhaZXJvVGltZVN0YW1wID0gXCJuZXh0X21vbnRoX3plcm9fdGltZV9zdGFtcFwiLFxyXG4gICAgXHJcbiAgICAvKirllYblupfnq6DoioLnpLzljIXotK3kubAgKi9cclxuICAgIFN0b3JlQ2hhcHRlckl0ZW0gPSBcInN0b3JlX2NoYXB0ZXJfaXRlbV9cIixcclxuICAgIC8qKuWVhuW6l+mSu+efs+ekvOWMhei0reS5sCAqL1xyXG4gICAgU3RvcmVHZW1JdGVtID0gXCJzdG9yZV9nZW1faXRlbV9cIixcclxuICAgIC8qKuWVhuW6l+mHkeW4geekvOWMhei0reS5sCAqL1xyXG4gICAgU3RvcmVDb2luSXRlbSA9IFwic3RvcmVfY29pbl9pdGVtX1wiLFxyXG4gICAgLyoq5ZWG5bqX5q+P5pel5ZWG5bqX5qih5Z2XIOWVhuW6l0lEICovXHJcbiAgICBTdG9yZURhaWx5U2hvcElkID0gXCJzdG9yZV9kYWlseV9zaG9wX2lkXCIsXHJcbiAgICAvKirllYblupfmr4/ml6XllYblupfmqKHlnZcg5a+55bqU5ZWG5ZOB55qE5oqY5omjICovXHJcbiAgICBTdG9yZURhaWx5U2hvcERpc2NvdW50ID0gXCJzdG9yZV9kYWlseV9zaG9wX2Rpc2NvdW50X1wiLFxyXG4gICAgLyoq5ZWG5bqX5q+P5pel5ZWG5bqX5qih5Z2X77yM5a+55bqU5ZWG5ZOB6LSt5Lmw5qyh5pWwICovXHJcbiAgICBTdG9yZURhaWx5U2hvcE51bSA9IFwic3RvcmVfZGFpbHlfc2hvcF9udW1cIixcclxuICAgIC8qKuWVhuW6l+elnuenmOWVhuW6l+aooeWdlyDlrqDnianlhY3otLnpmZDliLYgKi9cclxuICAgIFN0b3JlTXlzdGVyeVBldEZyZWVUaW1lID0gXCJzdG9yZV9teXN0ZXJ5X3BldF9mcmVlX3RpbWVcIixcclxuICAgIC8qKuWVhuW6l+elnuenmOWVhuW6l+aooeWdlyDoo4XlpIflhY3otLnpmZDliLYgKi9cclxuICAgIFN0b3JlTXlzdGVyeUVxdWlwRnJlZVRpbWUgPSBcInN0b3JlX215c3Rlcnlfd2VhcG9uX2ZyZWVfdGltZVwiLFxyXG4gICAgLyoq5ZWG5bqX6Iux6ZuE5oub5Yuf5piv5ZCm6aaW5qyh5oq95Yiw6Iux6ZuEICovXHJcbiAgICBTdG9yZUhlcm9JRCA9IFwic3RvcmVfaGVyb19pZF9cIixcclxuXHJcbiAgICAvKirmlrDmiYvkuIPml6Xnrb7liLDlpKnmlbAgKi9cclxuICAgIE5ld1BsYXllclNhdmVuRGF5U2lnbkluTnVtID0gXCJuZXdfcGxheWVyX3NhdmVuX2RheV9zaWduX2luX251bVwiLFxyXG4gICAgICAvKirmlrDmiYvkuIPml6Xnrb7liLDlpKnmlbDml7bpl7QqL1xyXG4gICAgIE5ld1BsYXllclNhdmVuRGF5U2lnbkluVGltZSA9IFwibmV3X3BsYXllcl9zYXZlbl9kYXlfc2lnbl9pbl9udW1UaW1lXCIsXHJcbiAgICAvKirmlrDmiYvkuIPml6Xnrb7liLDlrozmr5UgKi9cclxuICAgIE5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciA9IFwibmV3X3BsYXllcl9zYXZlbl9kYXlfc2lnbl9pbl9vdmVyXCIsXHJcbiAgICAvKirog73lkKbov5vooYznrb7liLAgKi9cclxuICAgIENhblNpZ25JbiA9IFwiY2FuX3NpZ25faW5cIixcclxuICAgIC8qKuaXpeW4uOetvuWIsOe0r+iuoeWkqeaVsCAqL1xyXG4gICAgRGFpbHlTaWduSW5OdW0gPSBcImRhaWx5X3NpZ25faW5fbnVtXCIsXHJcbiAgICAvKirml6XluLjnrb7liLDlhbfkvZPlpKnmlbAgKi9cclxuICAgIERhaWx5U2lnbkluRGF5ID0gXCJkYWlseV9zaWduX2luX2RheV9cIixcclxuICAgIC8qKuaXpeW4uOetvuWIsOe0r+iuoeWlluWKseWFt+S9k+mihuWPlueKtuaAgSAqL1xyXG4gICAgRGFpbHlTaWduSW5DdW11bGF0aXZlRGF5ID0gXCJkYWlseV9zaWduX2luX2N1bXVsYXRpdmVfZGF5X1wiLFxyXG5cclxuICAgIC8qKuaYr+WQpuWPr+S7pei0reS5sOW/q+mAn+aMguacuiAqL1xyXG4gICAgQ2FuRmFzdE9mZmxpbmUgPSBcImdhbWVfY2FuX2Zhc3Rfb2ZmbGluZVwiLFxyXG4gICAgLyoq5piv5ZCm5Y+v5Lul6YCa6L+H5bm/5ZGK6LSt5Lmw5b+r6YCf5oyC5py6ICovXHJcbiAgICBDYW5BZEZhc3RPZmZsaW5lID0gXCJnYW1lX2Nhbl9hZF9mYXN0X29mZmxpbmVcIixcclxuICAgIC8qKuaYr+WQpuWPr+S7pemAmui/h+W5v+WRiui0reS5sOW/q+mAn+aMguacuiAqL1xyXG4gICAgQ29pblBvcEFkID0gXCJjb2luX3BvcF9hZFwiLFxyXG5cclxuICAgIC8qKuS7u+WKoWlkICovXHJcbiAgICBUYXNrSWQgPSBcInRhc2tfaWRfXCIsXHJcbiAgICAvKirku7vliqHnirbmgIEgKi9cclxuICAgIFRhc2tTdGF0ZSA9IFwidGFza19zdGF0ZV9cIixcclxuICAgIC8qKuS7u+WKoeebruagh+inpuWPkeasoeaVsCAqL1xyXG4gICAgVGFza051bSA9IFwidGFza19udW1fXCIsXHJcbiAgICAvKirmgLvmtLvot4PluqYgKi9cclxuICAgIEFsbEFjdGl2aXR5TnVtID0gXCJhbGxfYWN0aXZpdHlfbnVtXCIsXHJcbiAgICAvKirku7vliqHml6XmtLvot4MgKi9cclxuICAgIFRhc2tEYWlseUFjdGl2aXR5TnVtID0gXCJ0YXNrX2RhaWx5X2FjdGl2aXR5X251bVwiLFxyXG4gICAgLyoq5Lu75Yqh5ZGo5rS76LeDICovXHJcbiAgICBUYXNrV2Vla0FjdGl2aXR5TnVtID0gXCJ0YXNrX3dlZWtfYWN0aXZpdHlfbnVtXCIsXHJcbiAgICAvKirku7vliqHml6XmtLvot4PlpZblirHnirbmgIEgKi9cclxuICAgIFRhc2tEYWlseUFjdGl2aXR5U3RhdGUgPSBcInRhc2tfZGFpbHlfYWN0aXZpdHlfc3RhdGVfXCIsLy8w5pyq6aKG5Y+WLDHlt7Lpooblj5ZcclxuICAgIC8qKuS7u+WKoeWRqOa0u+i3g+WlluWKseeKtuaAgSAqL1xyXG4gICAgVGFza1dlZWtseUFjdGl2aXR5U3RhdGUgPSBcInRhc2tfd2Vla2x5X2FjdGl2aXR5X3N0YXRlX1wiLC8vMOacqumihuWPliwx5bey6aKG5Y+WXHJcbiAgIC8qKuingueci+inhumikeasoeaVsOiuoeaVsCAqL1xyXG4gICAgVklQQUROdW09XCJWSVBBRE51bVwiLFxyXG5cclxuICAgIC8qKuS4u+e6v+S7u+WKoeWxleekuui/m+W6piAqL1xyXG4gICAgVGFza01haW5TaG93SW5kZXggPSBcInRhc2tfbWFpbl9zaG93X2luZGV4XCIsXHJcbiAgICAvKirkuLvnur/ku7vliqHov5vluqYgKi9cclxuICAgIFRhc2tNYWluSW5kZXggPSBcInRhc2tfbWFpbl9pbmRleF9cIixcclxuICAgIC8qKuS4u+e6v+S7u+WKoeW9k+WJjeWAvCAqL1xyXG4gICAgVGFza01haW5OdW0gPSBcInRhc2tfbWFpbl9udW1fXCIsIFxyXG4gICAgLyoq5oiQ5bCx5Lu75Yqh5b2T5YmN5YC8ICovXHJcbiAgICBUYXNrQWNoaWV2ZW1lbnROdW0gPSBcInRhc2tfYWNoaWV2ZW1lbnRfbnVtX1wiLFxyXG4gICAgLyoq5oiQ5bCx5Lu75Yqh6L+b5bqmICovXHJcbiAgICBUYXNrQWNoaWV2ZW1lbnRJbmRleCA9IFwidGFza19hY2hpZXZlbWVudF9pbmRleF9cIixcclxuXHJcbiAgICAvKirmmK/lkKblj6/ku6XpgJrov4flub/lkYrotK3kubDovaznm5jmrKHmlbAgKi9cclxuICAgIFR1cm10YWJsZUFkID0gXCJ0dXJtdGFibGVfYWRcIixcclxuXHJcbiAgICAvKirmmK/lkKblj6/ku6XpgJrov4flhY3otLnotK3kubDovaznm5jmrKHmlbAgKi9cclxuICAgIFR1cm10YWJsZUZyZWUgPSBcInR1cm10YWJsZV9mcmVlXCIsXHJcblxyXG4gICAgLyoq5piv5ZCm5Yiw6L6+5YWN6LS56LSt5Lmw6L2s55uY5pe26Ze0IDE15YiG6ZKfPTkwMOenkiovXHJcbiAgICBUdXJtdGFibGVGcmVlVGltZSA9IFwidHVybXRhYmxlX2ZyZWVfdGltZVwiLFxyXG4gICAgLyoq5Yiw6L6+5YWN6LS56LSt5Lmw6L2s55uYICAgMTrlj6/ku6XlhY3otLkgICAgMO+8muS4jeWPr+WFjei0uSovXHJcbiAgICBUdXJtdGFibGVGcmVlWWVzPSBcInR1cm10YWJsZV9mcmVlX3llc1wiLFxyXG5cclxuICAgIC8qKnZpcOWFjei0ueWlluWKseeKtuaAgSAqL1xyXG4gICAgVmlwRnJlZVJld2FyZFN0YXR1cyA9IFwidmlwX2ZyZWVfcmV3YXJkX3N0YXR1c19cIiwvLzDmnKrpooblj5YsMeW3sumihuWPliAgICAgMC0xNFxyXG5cclxuICAgIC8qKnZpcOmrmOe6p+WlluWKseeKtuaAgSAqLyBcclxuICAgIFZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzID0gXCJ2aXBfYWR2YW5jZWRfcmV3YXJkX3N0YXR1c19cIiwvLzDmnKrpooblj5YsMeW3sumihuWPliAgICAgMC0xNFxyXG5cclxuICAgIC8qKuaYr+WQpuaYr3ZpcOi6q+S7vSAqL1xyXG4gICAgVmlwSWRlbnRpdHkgPSBcInZpcF9pZGVudGl0eVwiLC8vMDrkuI3mmK92aXAgICAx77ya5pivdmlwXHJcblxyXG4gICAgLyoqdmlw5q+P5pel6aKG5Y+W54q25oCBICovXHJcbiAgICBWaXBEYWlseUNvbGxlY3Rpb25TdGF0dXMgPSBcInZpcF9kYWlseV9jb2xsZWN0aW9uX3N0YXR1c1wiLC8vMDrmnKrpooblj5YgICAx77ya5bey6aKG5Y+WICAg5q+P5pel5Yi35pawXHJcblxyXG4gICAgLyoqQm9zc+aMkeaImOasoeaVsCAqL1xyXG4gICAgQm9zc0NoYWxsZW5nZVRpbWVzID0gXCJib3NzX2NoYWxsZW5nZV90aW1lc1wiLC8v5q+P5aSp5pu05pawICAgM+asoVxyXG4gICAgLyoq5peg6ZmQ5oyR5oiY5oyR5oiY5qyh5pWwICovXHJcbiAgICBVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcyA9IFwidW5saW1pdGVkX2NoYWxsZW5nZV90aW1lc1wiLC8v5q+P5aSp5pu05pawICAgIDPmrKFcclxuICAgIC8qKuiZmuepuuijgue8neaMkeaImOasoeaVsCAqL1xyXG4gICAgVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMgPSBcInZvaWRfY3JhY2tfY2hhbGxlbmdlX3RpbWVzXCIsLy/mr4/lpKnmm7TmlrAgICAgM+asoVxyXG5cclxuICAgIC8qKuaYr+WQpuWPr+S7pei0reS5sEJvc3PmjJHmiJjmrKHmlbAgKi9cclxuICAgIEJ1eUJvc3NDaGFsbGVuZ2VUaW1lcyA9IFwiYnV5X2Jvc3NfY2hhbGxlbmdlX3RpbWVzXCIsLy/mr4/lpKnmm7TmlrAgICAz5qyhXHJcbiAgICAvKirmmK/lkKblj6/ku6XotK3kubDml6DpmZDmjJHmiJjmjJHmiJjmrKHmlbAgKi9cclxuICAgIEJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzID0gXCJidXlfdW5saW1pdGVkX2NoYWxsZW5nZV90aW1lc1wiLC8v5q+P5aSp5pu05pawICAgICAz5qyhXHJcbiAgICAvKirmmK/lkKblj6/ku6XotK3kubDomZrnqbroo4LnvJ3mjJHmiJjmrKHmlbAgKi9cclxuICAgIEJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzID0gXCJidXlfdm9pZF9jcmFja19jaGFsbGVuZ2VfdGltZXNcIiwvL+avj+WkqeabtOaWsCAgICAgM+asoVxyXG5cclxuICAgIC8qKkJvc3PmjJHmiJjmgLvmjJHmiJjmrKHmlbAgKi9cclxuICAgIFRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzID0gXCJ0b3RhbF9ib3NzX2NoYWxsZW5nZV90aW1lc1wiLC8v57Sv5Yqg5qyh5pWwXHJcbiAgICAvKirml6DpmZDmjJHmiJjmgLvmjJHmiJjmrKHmlbAgKi9cclxuICAgIFRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMgPSBcInRvdGFsX3VubGltaXRlZF9jaGFsbGVuZ2VfdGltZXNcIiwvL+e0r+WKoOasoeaVsFxyXG4gICAgLyoq6Jma56m66KOC57yd5oC75oyR5oiY5qyh5pWwICovXHJcbiAgICBUb3RhbFZvaWRDcmFja0NoYWxsZW5nZVRpbWVzID0gXCJ0b3RhbF92b2lkX2NyYWNrX2NoYWxsZW5nZV90aW1lc1wiLC8v57Sv5Yqg5qyh5pWwXHJcblxyXG4gICAgLyoqQm9zc+aMkeaImOS8pOWusyAqL1xyXG4gICAgQm9zc0NoYWxsZW5nZURhbWFnZSA9IFwiYm9zc19jaGFsbGVuZ2VfZGFtYWdlXCIsLy/orrDlvZXkuIrkuIDmrKHnmoTkvKTlrrNcclxuICAgIC8qKuaXoOmZkOaMkeaImOazouaVsCAqL1xyXG4gICAgVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlID0gXCJ1bmxpbWl0ZWRfY2hhbGxlbmdlX2RhbWFnZVwiLC8v6K6w5b2V5LiK5LiA5qyh55qE5rOi5pWwXHJcbiAgICAvKiromZrnqbroo4LnvJ3lsYLmlbAgKi9cclxuICAgIFZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSA9IFwidm9pZF9jcmFja19jaGFsbGVuZ2VfZGFtYWdlXCIsLy/orrDlvZXlt7Lnu4/miZPlrozlpJrlsJHlsYLkuoYgICAgMS045bGCICAg6buY6K6kMOWxgiAgIOaJk+WujOesrOS4gOWxgiAg5bCx5pivMVxyXG4gICAgXHJcblxyXG4gICAgLy8gLyoq5oC75peg6ZmQ5pyA5aSn5oyR5oiY5rOi5pWwICovXHJcbiAgICAvLyBVbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2VNYXggPSBcInVubGltaXRlZF9jaGFsbGVuZ2VfZGFtYWdlX21heFwiLC8v6K6w5b2V5peg5bC95oyR5oiY5pyA5aSn55qE5rOi5pWwXHJcblxyXG4gICAgLyoq5ZGo5Y2h5b2T5aSp5piv5ZCm6aKG5Y+WICovXHJcbiAgICBXZWVrQ2FyZElzUmVjZWl2ZVRvZGF5ID0gXCJ3ZWVrX2NhcmRfaXNfcmVjZWl2ZV90b2RheVwiLFxyXG4gICAgLyoq5ZGo5Y2h5Yiw5pyf5pe26Ze0ICovXHJcbiAgICBXZWVrQ2FyZE92ZXJUaW1lID0gXCJ3ZWVrX2NhcmRfb3Zlcl90aW1lXCIsXHJcbiAgICAvKirmmK/lkKbpppbmrKHotK3kubDlkajljaEgKi9cclxuICAgIFdlZWtDYXJkSXNGaXJzdEJ1eSA9IFwid2Vla19jYXJkX2lzX2ZpcnN0X2J1eVwiLFxyXG4gICAgLyoq5ZGo5Y2h5YWN5bm/5ZGK5qyh5pWwICovXHJcbiAgICBXZWVrQ2FyZEZyZWVBZE51bSA9IFwid2Vla19jYXJkX2ZyZWVfYWRfbnVtXCIsXHJcblxyXG4gICAgLyoq5b2T5aSp5piv5ZCm6aaW5qyh55m75b2VICovXHJcbiAgICBUb2RheUlzRmlyc3RMb2dJbiA9IFwidG9kYXlfaXNfZmlyc3RfbG9nX2luXCIsXHJcblxyXG4gICAgLyoq6Ieq5Yqo5oiY5paX5Ymp5L2Z6K+V55So5pe26Ze0ICovXHJcbiAgICB0cnlfYXV0b19maWdodF9yZW1haW49XCJ0cnlfYXV0b19maWdodFwiLFxyXG4gICAgLyoq5Yqg6YCf5Ymp5L2Z6K+V55So5pe26Ze0ICovXHJcbiAgICB0cnlfcmF0ZV9maWdodF9yZW1haW49XCJ0cnlfcmF0ZV9maWdodFwiLFxyXG59XHJcblxyXG4iXX0=