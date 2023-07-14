
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmFnZVxcU3RvcmFnZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFVBaU1YO0FBak1ELFdBQVksVUFBVTtJQUNsQixtQ0FBbUIsQ0FBQTtJQUNuQix5Q0FBeUIsQ0FBQTtJQUN6QixpREFBaUMsQ0FBQTtJQUNqQywrQ0FBK0IsQ0FBQTtJQUMvQiwwREFBMEMsQ0FBQTtJQUMxQyw2Q0FBNkIsQ0FBQTtJQUM3Qiw2Q0FBNkIsQ0FBQTtJQUM3QixnREFBZ0MsQ0FBQTtJQUNoQyxnREFBZ0MsQ0FBQTtJQUNoQyx1Q0FBdUIsQ0FBQTtJQUN2QixzQ0FBc0IsQ0FBQTtJQUN0QixzREFBc0MsQ0FBQTtJQUN0QyxxREFBcUMsQ0FBQTtJQUNyQywrQ0FBK0IsQ0FBQTtJQUMvQixrQ0FBa0IsQ0FBQTtJQUNsQixvQ0FBb0IsQ0FBQTtJQUNwQixnQ0FBZ0IsQ0FBQTtJQUNoQixvQ0FBb0IsQ0FBQTtJQUVwQiwwREFBMEMsQ0FBQTtJQUUxQyxxREFBcUMsQ0FBQTtJQUVyQyxjQUFjO0lBQ2QsNkNBQTZCLENBQUE7SUFDN0IsVUFBVTtJQUNWLGlDQUFpQixDQUFBO0lBQ2pCLGtCQUFrQjtJQUNsQiwrQ0FBK0IsQ0FBQTtJQUMvQixrQkFBa0I7SUFDbEIsaURBQWlDLENBQUE7SUFDakMsMEJBQTBCO0lBQzFCLDhDQUE4QixDQUFBO0lBQzlCLGNBQWM7SUFDZCxzREFBc0MsQ0FBQTtJQUN0QyxnQkFBZ0I7SUFDaEIsa0VBQWtELENBQUE7SUFDbEQsWUFBWTtJQUNaLHNEQUFzQyxDQUFBO0lBQ3RDLFVBQVU7SUFDViw0Q0FBNEIsQ0FBQTtJQUM1QixZQUFZO0lBQ1osMERBQTBDLENBQUE7SUFFMUMsVUFBVTtJQUNWLHVDQUF1QixDQUFBO0lBRXZCLGtCQUFrQjtJQUNsQiw4REFBZ0QsQ0FBQTtJQUNoRCxrQkFBa0I7SUFDbEIsaUVBQW1ELENBQUE7SUFDbkQsa0JBQWtCO0lB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Iiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gU3RvcmFnZUtleXtcclxuICAgIFByb3BOdW09J3Byb3BfbnVtXycsXHJcbiAgICBNYXplUGFzc0lkPSdtYXplX3Bhc3NfaWQnLFxyXG4gICAgTWF6ZUZpZ2h0aW5nSWQ9J21hemVfZmlnaHRpbmdfaWQnLFxyXG4gICAgTWF6ZVBhc3NpbmdJZD0nbWF6ZV9wYXNzaW5nX2lkJyxcclxuICAgIE1hemVVblNlbGVjdFNwb2lscz0nbWF6ZV91bl9zZWxlY3Rfc3BvaWxzJyxcclxuICAgIE1hemVTaG9wTGlzdD0nbWF6ZV9zaG9wX2xpc3QnLFxyXG4gICAgTWF6ZUJ1ZmZMaXN0PSdtYXplX2J1ZmZfbGlzdCcsXHJcbiAgICBNYXplQnVmZlN0YWdlPSdtYXplX2J1ZmZfc3RhZ2VfJyxcclxuICAgIE1hemVCb3hJZExpc3Q9J21hemVfYm94X2lkX2xpc3QnLFxyXG4gICAgTWF6ZVN1YkhwPSdtYXplX3N1Yl9ocCcsXHJcbiAgICBNYXplRmxvb3I9J21hemVfZmxvb3InLFxyXG4gICAgTWF6ZUxlYXNlUGV0TGlzdD0nbWF6ZV9sZWFzZV9wZXRfbGlzdCcsXHJcbiAgICBNYXplUmFuZFBldExpc3Q9J21hemVfcmFuZF9wZXRfbGlzdF8nLFxyXG4gICAgTWF6ZVN0YXJ0RGF0ZT0nbWF6ZV9zdGFydF9kYXRlJyxcclxuICAgIFBldExpc3Q9J3BldF9saXN0JyxcclxuICAgIEhlcm9MaXN0PSdoZXJvX2xpc3QnLFxyXG4gICAgUGV0TnVtPSdwZXRfbnVtJyxcclxuICAgIEVxdWlwTnVtPSdlcXVpcF9udW0nLFxyXG5cclxuICAgIEJvc3NDaGFsbGVuZ2VTdGFnZT0nYm9zc19jaGFsbGVuZ2Vfc3RhZ2VfJyxcclxuXHJcbiAgICBEaW5nWXVlR2V0U3RhdGU9J2RpbmdfeXVlX2dldF9zdGF0ZV8nLFxyXG5cclxuICAgIC8qKuS7iuaXpeeIrOWhlOmAmuWFs+asoeaVsCAqL1xyXG4gICAgVG93ZXJQYXNzTnVtPSd0b3dlcl9wYXNzX251bScsXHJcbiAgICAvKirmlK/ku5jmrKHmlbAgKi9cclxuICAgIFBheU51bT0ncGF5X251bV8nLFxyXG4gICAgLyoq5pSv5LuY57Si5byV6aG15b2T5aSp55qE5pi+56S65qyh5pWwICovXHJcbiAgICBQYXlVaVNob3dOdW09J3BheV91aV9zaG93X251bV8nLFxyXG4gICAgLyoq5pSv5LuY57Si5byV6aG15b2T5aSp55qE5pi+56S65qyh5pWwICovXHJcbiAgICBGdW5jVWlTaG93TnVtPSdmdW5jX3VpX3Nob3dfbnVtXycsXHJcbiAgICAvKirlj6/ku6XpgInmi6nnmoTmlK/ku5hpZOaJgOWvueW6lOeahOWPr+S7peiHqumAieeahOekvOWMhSAqL1xyXG4gICAgUGF5U2VsZWN0SWRzPSdwYXlfc2VsZWN0X2lkc18nLFxyXG4gICAgLyoq57Sv6K6h5YWF5YC86b6Z5pm25pWw6YePICovXHJcbiAgICBUb3RhbExvbmdKaW5nTnVtPSd0b3RhbF9sb25nX2ppbmdfbnVtJyxcclxuICAgIC8qKue0r+iuoeWFheWAvOm+meaZtumihuWPlueKtuaAgSAqL1xyXG4gICAgVG90YWxMb25nSmluZ0dldFN0YXRlPVwidG90YWxfbG9uZ19qaW5nX2dldF9zdGF0ZV9cIixcclxuICAgIC8qKummluWFhemihuWPlueKtuaAgSAqL1xyXG4gICAgRmlyc3RQYXlHZXRTdGF0ZT1cImZpcnN0X3BheV9nZXRfc3RhdGVcIixcclxuICAgIC8qKuiHquWKqOaImOaWlyAqL1xyXG4gICAgQXV0b0ZpZ2h0aW5nPVwiYXV0b19maWdodGluZ1wiLFxyXG4gICAgLyoq6Iux6ZuE5LiT5q2m562J57qnICovXHJcbiAgICBIZXJvRXhjbHVzaXZlRXF1aXA9XCJIZXJvX0V4Y2x1c2l2ZV9FcXVpcF9cIixcclxuXHJcbiAgICAvKirlhbPljaHmmJ/nuqcgKi9cclxuICAgIExldmVsU3Rhcj1cImxldmVsX3N0YXJfXCIsXHJcblxyXG4gICAgLyoq5LiL5LiA5aSp6Zu254K55pys5Zyw55qE5pe26Ze05oiz5YC8ICovXHJcbiAgICBUb21vcm93WmVyb1RpbWVTdGFtcCA9IFwidG9tb3Jvd196ZXJvX3RpbWVfc3RhbXBcIixcclxuICAgIC8qKuS4i+S4gOWRqOmbtueCueacrOWcsOeahOaXtumXtOaIs+WAvCAqL1xyXG4gICAgTmV4dFdlZWtaZXJvVGltZVN0YW1wID0gXCJuZXh0X3dlZWtfemVyb190aW1lX3N0YW1wXCIsXHJcbiAgICAvKirkuIvkuIDmnIjpm7bngrnmnKzlnLDnmoTml7bpl7TmiLPlgLwgKi9cclxuICAgIE5leHRNb250aFplcm9UaW1lU3RhbXAgPSBcIm5leHRfbW9udGhfemVyb190aW1lX3N0YW1wXCIsXHJcbiAgICBcclxuICAgIC8qKuWVhuW6l+eroOiKguekvOWMhei0reS5sCAqL1xyXG4gICAgU3RvcmVDaGFwdGVySXRlbSA9IFwic3RvcmVfY2hhcHRlcl9pdGVtX1wiLFxyXG4gICAgLyoq5ZWG5bqX6ZK755+z56S85YyF6LSt5LmwICovXHJcbiAgICBTdG9yZUdlbUl0ZW0gPSBcInN0b3JlX2dlbV9pdGVtX1wiLFxyXG4gICAgLyoq5ZWG5bqX6YeR5biB56S85YyF6LSt5LmwICovXHJcbiAgICBTdG9yZUNvaW5JdGVtID0gXCJzdG9yZV9jb2luX2l0ZW1fXCIsXHJcbiAgICAvKirllYblupfmr4/ml6XllYblupfmqKHlnZcg5ZWG5bqXSUQgKi9cclxuICAgIFN0b3JlRGFpbHlTaG9wSWQgPSBcInN0b3JlX2RhaWx5X3Nob3BfaWRcIixcclxuICAgIC8qKuWVhuW6l+avj+aXpeWVhuW6l+aooeWdlyDlr7nlupTllYblk4HnmoTmipjmiaMgKi9cclxuICAgIFN0b3JlRGFpbHlTaG9wRGlzY291bnQgPSBcInN0b3JlX2RhaWx5X3Nob3BfZGlzY291bnRfXCIsXHJcbiAgICAvKirllYblupfmr4/ml6XllYblupfmqKHlnZfvvIzlr7nlupTllYblk4HotK3kubDmrKHmlbAgKi9cclxuICAgIFN0b3JlRGFpbHlTaG9wTnVtID0gXCJzdG9yZV9kYWlseV9zaG9wX251bVwiLFxyXG4gICAgLyoq5ZWG5bqX56We56eY5ZWG5bqX5qih5Z2XIOWuoOeJqeWFjei0uemZkOWItiAqL1xyXG4gICAgU3RvcmVNeXN0ZXJ5UGV0RnJlZVRpbWUgPSBcInN0b3JlX215c3RlcnlfcGV0X2ZyZWVfdGltZVwiLFxyXG4gICAgLyoq5ZWG5bqX56We56eY5ZWG5bqX5qih5Z2XIOijheWkh+WFjei0uemZkOWItiAqL1xyXG4gICAgU3RvcmVNeXN0ZXJ5RXF1aXBGcmVlVGltZSA9IFwic3RvcmVfbXlzdGVyeV93ZWFwb25fZnJlZV90aW1lXCIsXHJcbiAgICAvKirllYblupfoi7Hpm4Tmi5vli5/mmK/lkKbpppbmrKHmir3liLDoi7Hpm4QgKi9cclxuICAgIFN0b3JlSGVyb0lEID0gXCJzdG9yZV9oZXJvX2lkX1wiLFxyXG5cclxuICAgIC8qKuaWsOaJi+S4g+aXpeetvuWIsOWkqeaVsCAqL1xyXG4gICAgTmV3UGxheWVyU2F2ZW5EYXlTaWduSW5OdW0gPSBcIm5ld19wbGF5ZXJfc2F2ZW5fZGF5X3NpZ25faW5fbnVtXCIsXHJcbiAgICAvKirmlrDmiYvkuIPml6Xnrb7liLDlrozmr5UgKi9cclxuICAgIE5ld1BsYXllclNhdmVuRGF5U2lnbkluT3ZlciA9IFwibmV3X3BsYXllcl9zYXZlbl9kYXlfc2lnbl9pbl9vdmVyXCIsXHJcbiAgICAvKirog73lkKbov5vooYznrb7liLAgKi9cclxuICAgIENhblNpZ25JbiA9IFwiY2FuX3NpZ25faW5cIixcclxuICAgIC8qKuaXpeW4uOetvuWIsOe0r+iuoeWkqeaVsCAqL1xyXG4gICAgRGFpbHlTaWduSW5OdW0gPSBcImRhaWx5X3NpZ25faW5fbnVtXCIsXHJcbiAgICAvKirml6XluLjnrb7liLDlhbfkvZPlpKnmlbAgKi9cclxuICAgIERhaWx5U2lnbkluRGF5ID0gXCJkYWlseV9zaWduX2luX2RheV9cIixcclxuICAgIC8qKuaXpeW4uOetvuWIsOe0r+iuoeWlluWKseWFt+S9k+mihuWPlueKtuaAgSAqL1xyXG4gICAgRGFpbHlTaWduSW5DdW11bGF0aXZlRGF5ID0gXCJkYWlseV9zaWduX2luX2N1bXVsYXRpdmVfZGF5X1wiLFxyXG5cclxuICAgIC8qKuaYr+WQpuWPr+S7pei0reS5sOW/q+mAn+aMguacuiAqL1xyXG4gICAgQ2FuRmFzdE9mZmxpbmUgPSBcImdhbWVfY2FuX2Zhc3Rfb2ZmbGluZVwiLFxyXG4gICAgLyoq5piv5ZCm5Y+v5Lul6YCa6L+H5bm/5ZGK6LSt5Lmw5b+r6YCf5oyC5py6ICovXHJcbiAgICBDYW5BZEZhc3RPZmZsaW5lID0gXCJnYW1lX2Nhbl9hZF9mYXN0X29mZmxpbmVcIixcclxuICAgIC8qKuaYr+WQpuWPr+S7pemAmui/h+W5v+WRiui0reS5sOW/q+mAn+aMguacuiAqL1xyXG4gICAgQ29pblBvcEFkID0gXCJjb2luX3BvcF9hZFwiLFxyXG5cclxuICAgIC8qKuS7u+WKoWlkICovXHJcbiAgICBUYXNrSWQgPSBcInRhc2tfaWRfXCIsXHJcbiAgICAvKirku7vliqHnirbmgIEgKi9cclxuICAgIFRhc2tTdGF0ZSA9IFwidGFza19zdGF0ZV9cIixcclxuICAgIC8qKuS7u+WKoeebruagh+inpuWPkeasoeaVsCAqL1xyXG4gICAgVGFza051bSA9IFwidGFza19udW1fXCIsXHJcbiAgICAvKirmgLvmtLvot4PluqYgKi9cclxuICAgIEFsbEFjdGl2aXR5TnVtID0gXCJhbGxfYWN0aXZpdHlfbnVtXCIsXHJcbiAgICAvKirku7vliqHml6XmtLvot4MgKi9cclxuICAgIFRhc2tEYWlseUFjdGl2aXR5TnVtID0gXCJ0YXNrX2RhaWx5X2FjdGl2aXR5X251bVwiLFxyXG4gICAgLyoq5Lu75Yqh5ZGo5rS76LeDICovXHJcbiAgICBUYXNrV2Vla0FjdGl2aXR5TnVtID0gXCJ0YXNrX3dlZWtfYWN0aXZpdHlfbnVtXCIsXHJcbiAgICAvKirku7vliqHml6XmtLvot4PlpZblirHnirbmgIEgKi9cclxuICAgIFRhc2tEYWlseUFjdGl2aXR5U3RhdGUgPSBcInRhc2tfZGFpbHlfYWN0aXZpdHlfc3RhdGVfXCIsLy8w5pyq6aKG5Y+WLDHlt7Lpooblj5ZcclxuICAgIC8qKuS7u+WKoeWRqOa0u+i3g+WlluWKseeKtuaAgSAqL1xyXG4gICAgVGFza1dlZWtseUFjdGl2aXR5U3RhdGUgPSBcInRhc2tfd2Vla2x5X2FjdGl2aXR5X3N0YXRlX1wiLC8vMOacqumihuWPliwx5bey6aKG5Y+WXHJcblxyXG4gICAgLyoq5Li757q/5Lu75Yqh5bGV56S66L+b5bqmICovXHJcbiAgICBUYXNrTWFpblNob3dJbmRleCA9IFwidGFza19tYWluX3Nob3dfaW5kZXhcIixcclxuICAgIC8qKuS4u+e6v+S7u+WKoei/m+W6piAqL1xyXG4gICAgVGFza01haW5JbmRleCA9IFwidGFza19tYWluX2luZGV4X1wiLFxyXG4gICAgLyoq5Li757q/5Lu75Yqh5b2T5YmN5YC8ICovXHJcbiAgICBUYXNrTWFpbk51bSA9IFwidGFza19tYWluX251bV9cIiwgXHJcbiAgICAvKirmiJDlsLHku7vliqHlvZPliY3lgLwgKi9cclxuICAgIFRhc2tBY2hpZXZlbWVudE51bSA9IFwidGFza19hY2hpZXZlbWVudF9udW1fXCIsXHJcbiAgICAvKirmiJDlsLHku7vliqHov5vluqYgKi9cclxuICAgIFRhc2tBY2hpZXZlbWVudEluZGV4ID0gXCJ0YXNrX2FjaGlldmVtZW50X2luZGV4X1wiLFxyXG5cclxuICAgIC8qKuaYr+WQpuWPr+S7pemAmui/h+W5v+WRiui0reS5sOi9rOebmOasoeaVsCAqL1xyXG4gICAgVHVybXRhYmxlQWQgPSBcInR1cm10YWJsZV9hZFwiLFxyXG5cclxuICAgIC8qKuaYr+WQpuWPr+S7pemAmui/h+WFjei0uei0reS5sOi9rOebmOasoeaVsCAqL1xyXG4gICAgVHVybXRhYmxlRnJlZSA9IFwidHVybXRhYmxlX2ZyZWVcIixcclxuXHJcbiAgICAvKirmmK/lkKbliLDovr7lhY3otLnotK3kubDovaznm5jml7bpl7QgMTXliIbpkp89OTAw56eSKi9cclxuICAgIFR1cm10YWJsZUZyZWVUaW1lID0gXCJ0dXJtdGFibGVfZnJlZV90aW1lXCIsXHJcbiAgICAvKirliLDovr7lhY3otLnotK3kubDovaznm5ggICAxOuWPr+S7peWFjei0uSAgICAw77ya5LiN5Y+v5YWN6LS5Ki9cclxuICAgIFR1cm10YWJsZUZyZWVZZXM9IFwidHVybXRhYmxlX2ZyZWVfeWVzXCIsXHJcblxyXG4gICAgLyoqdmlw5YWN6LS55aWW5Yqx54q25oCBICovXHJcbiAgICBWaXBGcmVlUmV3YXJkU3RhdHVzID0gXCJ2aXBfZnJlZV9yZXdhcmRfc3RhdHVzX1wiLC8vMOacqumihuWPliwx5bey6aKG5Y+WICAgICAwLTE0XHJcblxyXG4gICAgLyoqdmlw6auY57qn5aWW5Yqx54q25oCBICovIFxyXG4gICAgVmlwQWR2YW5jZWRSZXdhcmRTdGF0dXMgPSBcInZpcF9hZHZhbmNlZF9yZXdhcmRfc3RhdHVzX1wiLC8vMOacqumihuWPliwx5bey6aKG5Y+WICAgICAwLTE0XHJcblxyXG4gICAgLyoq5piv5ZCm5pivdmlw6Lqr5Lu9ICovXHJcbiAgICBWaXBJZGVudGl0eSA9IFwidmlwX2lkZW50aXR5XCIsLy8wOuS4jeaYr3ZpcCAgIDHvvJrmmK92aXBcclxuXHJcbiAgICAvKip2aXDmr4/ml6Xpooblj5bnirbmgIEgKi9cclxuICAgIFZpcERhaWx5Q29sbGVjdGlvblN0YXR1cyA9IFwidmlwX2RhaWx5X2NvbGxlY3Rpb25fc3RhdHVzXCIsLy8wOuacqumihuWPliAgIDHvvJrlt7Lpooblj5YgICDmr4/ml6XliLfmlrBcclxuXHJcbiAgICAvKipCb3Nz5oyR5oiY5qyh5pWwICovXHJcbiAgICBCb3NzQ2hhbGxlbmdlVGltZXMgPSBcImJvc3NfY2hhbGxlbmdlX3RpbWVzXCIsLy/mr4/lpKnmm7TmlrAgICAz5qyhXHJcbiAgICAvKirml6DpmZDmjJHmiJjmjJHmiJjmrKHmlbAgKi9cclxuICAgIFVubGltaXRlZENoYWxsZW5nZVRpbWVzID0gXCJ1bmxpbWl0ZWRfY2hhbGxlbmdlX3RpbWVzXCIsLy/mr4/lpKnmm7TmlrAgICAgM+asoVxyXG4gICAgLyoq6Jma56m66KOC57yd5oyR5oiY5qyh5pWwICovXHJcbiAgICBWb2lkQ3JhY2tDaGFsbGVuZ2VUaW1lcyA9IFwidm9pZF9jcmFja19jaGFsbGVuZ2VfdGltZXNcIiwvL+avj+WkqeabtOaWsCAgICAz5qyhXHJcblxyXG4gICAgLyoq5piv5ZCm5Y+v5Lul6LSt5LmwQm9zc+aMkeaImOasoeaVsCAqL1xyXG4gICAgQnV5Qm9zc0NoYWxsZW5nZVRpbWVzID0gXCJidXlfYm9zc19jaGFsbGVuZ2VfdGltZXNcIiwvL+avj+WkqeabtOaWsCAgIDPmrKFcclxuICAgIC8qKuaYr+WQpuWPr+S7pei0reS5sOaXoOmZkOaMkeaImOaMkeaImOasoeaVsCAqL1xyXG4gICAgQnV5VW5saW1pdGVkQ2hhbGxlbmdlVGltZXMgPSBcImJ1eV91bmxpbWl0ZWRfY2hhbGxlbmdlX3RpbWVzXCIsLy/mr4/lpKnmm7TmlrAgICAgIDPmrKFcclxuICAgIC8qKuaYr+WQpuWPr+S7pei0reS5sOiZmuepuuijgue8neaMkeaImOasoeaVsCAqL1xyXG4gICAgQnV5Vm9pZENyYWNrQ2hhbGxlbmdlVGltZXMgPSBcImJ1eV92b2lkX2NyYWNrX2NoYWxsZW5nZV90aW1lc1wiLC8v5q+P5aSp5pu05pawICAgICAz5qyhXHJcblxyXG4gICAgLyoqQm9zc+aMkeaImOaAu+aMkeaImOasoeaVsCAqL1xyXG4gICAgVG90YWxCb3NzQ2hhbGxlbmdlVGltZXMgPSBcInRvdGFsX2Jvc3NfY2hhbGxlbmdlX3RpbWVzXCIsLy/ntK/liqDmrKHmlbBcclxuICAgIC8qKuaXoOmZkOaMkeaImOaAu+aMkeaImOasoeaVsCAqL1xyXG4gICAgVG90YWxVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcyA9IFwidG90YWxfdW5saW1pdGVkX2NoYWxsZW5nZV90aW1lc1wiLC8v57Sv5Yqg5qyh5pWwXHJcbiAgICAvKiromZrnqbroo4LnvJ3mgLvmjJHmiJjmrKHmlbAgKi9cclxuICAgIFRvdGFsVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMgPSBcInRvdGFsX3ZvaWRfY3JhY2tfY2hhbGxlbmdlX3RpbWVzXCIsLy/ntK/liqDmrKHmlbBcclxuXHJcbiAgICAvKipCb3Nz5oyR5oiY5Lyk5a6zICovXHJcbiAgICBCb3NzQ2hhbGxlbmdlRGFtYWdlID0gXCJib3NzX2NoYWxsZW5nZV9kYW1hZ2VcIiwvL+iusOW9leS4iuS4gOasoeeahOS8pOWus1xyXG4gICAgLyoq5peg6ZmQ5oyR5oiY5rOi5pWwICovXHJcbiAgICBVbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2UgPSBcInVubGltaXRlZF9jaGFsbGVuZ2VfZGFtYWdlXCIsLy/orrDlvZXkuIrkuIDmrKHnmoTms6LmlbBcclxuICAgIC8qKuiZmuepuuijgue8neWxguaVsCAqL1xyXG4gICAgVm9pZENyYWNrQ2hhbGxlbmdlRGFtYWdlID0gXCJ2b2lkX2NyYWNrX2NoYWxsZW5nZV9kYW1hZ2VcIiwvL+iusOW9leW3sue7j+aJk+WujOWkmuWwkeWxguS6hiAgICAxLTjlsYIgICDpu5jorqQw5bGCICAg5omT5a6M56ys5LiA5bGCICDlsLHmmK8xXHJcbiAgICBcclxuXHJcbiAgICAvLyAvKirmgLvml6DpmZDmnIDlpKfmjJHmiJjms6LmlbAgKi9cclxuICAgIC8vIFVubGltaXRlZENoYWxsZW5nZURhbWFnZU1heCA9IFwidW5saW1pdGVkX2NoYWxsZW5nZV9kYW1hZ2VfbWF4XCIsLy/orrDlvZXml6DlsL3mjJHmiJjmnIDlpKfnmoTms6LmlbBcclxuXHJcbiAgICAvKirlkajljaHlvZPlpKnmmK/lkKbpooblj5YgKi9cclxuICAgIFdlZWtDYXJkSXNSZWNlaXZlVG9kYXkgPSBcIndlZWtfY2FyZF9pc19yZWNlaXZlX3RvZGF5XCIsXHJcbiAgICAvKirlkajljaHliLDmnJ/ml7bpl7QgKi9cclxuICAgIFdlZWtDYXJkT3ZlclRpbWUgPSBcIndlZWtfY2FyZF9vdmVyX3RpbWVcIixcclxuICAgIC8qKuaYr+WQpummluasoei0reS5sOWRqOWNoSAqL1xyXG4gICAgV2Vla0NhcmRJc0ZpcnN0QnV5ID0gXCJ3ZWVrX2NhcmRfaXNfZmlyc3RfYnV5XCIsXHJcbiAgICAvKirlkajljaHlhY3lub/lkYrmrKHmlbAgKi9cclxuICAgIFdlZWtDYXJkRnJlZUFkTnVtID0gXCJ3ZWVrX2NhcmRfZnJlZV9hZF9udW1cIixcclxuXHJcbiAgICAvKirlvZPlpKnmmK/lkKbpppbmrKHnmbvlvZUgKi9cclxuICAgIFRvZGF5SXNGaXJzdExvZ0luID0gXCJ0b2RheV9pc19maXJzdF9sb2dfaW5cIixcclxuXHJcbiAgICAvKiroh6rliqjmiJjmlpfliankvZnor5XnlKjml7bpl7QgKi9cclxuICAgIHRyeV9hdXRvX2ZpZ2h0X3JlbWFpbj1cInRyeV9hdXRvX2ZpZ2h0XCIsXHJcbiAgICAvKirliqDpgJ/liankvZnor5XnlKjml7bpl7QgKi9cclxuICAgIHRyeV9yYXRlX2ZpZ2h0X3JlbWFpbj1cInRyeV9yYXRlX2ZpZ2h0XCIsXHJcbn1cclxuXHJcbiJdfQ==