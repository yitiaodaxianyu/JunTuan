
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmFnZVxcU3RvcmFnZUNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFVBbU1YO0FBbk1ELFdBQVksVUFBVTtJQUNsQixtQ0FBbUIsQ0FBQTtJQUNuQix5Q0FBeUIsQ0FBQTtJQUN6QixpREFBaUMsQ0FBQTtJQUNqQywrQ0FBK0IsQ0FBQTtJQUMvQiwwREFBMEMsQ0FBQTtJQUMxQyw2Q0FBNkIsQ0FBQTtJQUM3Qiw2Q0FBNkIsQ0FBQTtJQUM3QixnREFBZ0MsQ0FBQTtJQUNoQyxnREFBZ0MsQ0FBQTtJQUNoQyx1Q0FBdUIsQ0FBQTtJQUN2QixzQ0FBc0IsQ0FBQTtJQUN0QixzREFBc0MsQ0FBQTtJQUN0QyxxREFBcUMsQ0FBQTtJQUNyQywrQ0FBK0IsQ0FBQTtJQUMvQixrQ0FBa0IsQ0FBQTtJQUNsQixvQ0FBb0IsQ0FBQTtJQUNwQixnQ0FBZ0IsQ0FBQTtJQUNoQixvQ0FBb0IsQ0FBQTtJQUVwQiwwREFBMEMsQ0FBQTtJQUUxQyxxREFBcUMsQ0FBQTtJQUVyQyxjQUFjO0lBQ2QsNkNBQTZCLENBQUE7SUFDN0IsVUFBVTtJQUNWLGlDQUFpQixDQUFBO0lBQ2pCLGtCQUFrQjtJQUNsQiwrQ0FBK0IsQ0FBQTtJQUMvQixrQkFBa0I7SUFDbEIsaURBQWlDLENBQUE7SUFDakMsMEJBQTBCO0lBQzFCLDhDQUE4QixDQUFBO0lBQzlCLGNBQWM7SUFDZCxzREFBc0MsQ0FBQTtJQUN0QyxnQkFBZ0I7SUFDaEIsa0VBQWtELENBQUE7SUFDbEQsWUFBWTtJQUNaLHNEQUFzQyxDQUFBO0lBQ3RDLFVBQVU7SUFDViw0Q0FBNEIsQ0FBQTtJQUM1QixZQUFZO0lBQ1osMERBQTBDLENBQUE7SUFFMUMsVUFBVTtJQUNWLHVDQUF1QixDQUFBO0lBRXZCLGtCQUFrQjtJQUNsQiw4REFBZ0QsQ0FBQTtJQUNoRCxrQkFBa0I7SUFDbEIsaUVBQW1ELENBQUE7SUFDbkQsa0JBQWtCO0lB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ckIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBTdG9yYWdlS2V5e1xyXG4gICAgUHJvcE51bT0ncHJvcF9udW1fJyxcclxuICAgIE1hemVQYXNzSWQ9J21hemVfcGFzc19pZCcsXHJcbiAgICBNYXplRmlnaHRpbmdJZD0nbWF6ZV9maWdodGluZ19pZCcsXHJcbiAgICBNYXplUGFzc2luZ0lkPSdtYXplX3Bhc3NpbmdfaWQnLFxyXG4gICAgTWF6ZVVuU2VsZWN0U3BvaWxzPSdtYXplX3VuX3NlbGVjdF9zcG9pbHMnLFxyXG4gICAgTWF6ZVNob3BMaXN0PSdtYXplX3Nob3BfbGlzdCcsXHJcbiAgICBNYXplQnVmZkxpc3Q9J21hemVfYnVmZl9saXN0JyxcclxuICAgIE1hemVCdWZmU3RhZ2U9J21hemVfYnVmZl9zdGFnZV8nLFxyXG4gICAgTWF6ZUJveElkTGlzdD0nbWF6ZV9ib3hfaWRfbGlzdCcsXHJcbiAgICBNYXplU3ViSHA9J21hemVfc3ViX2hwJyxcclxuICAgIE1hemVGbG9vcj0nbWF6ZV9mbG9vcicsXHJcbiAgICBNYXplTGVhc2VQZXRMaXN0PSdtYXplX2xlYXNlX3BldF9saXN0JyxcclxuICAgIE1hemVSYW5kUGV0TGlzdD0nbWF6ZV9yYW5kX3BldF9saXN0XycsXHJcbiAgICBNYXplU3RhcnREYXRlPSdtYXplX3N0YXJ0X2RhdGUnLFxyXG4gICAgUGV0TGlzdD0ncGV0X2xpc3QnLFxyXG4gICAgSGVyb0xpc3Q9J2hlcm9fbGlzdCcsXHJcbiAgICBQZXROdW09J3BldF9udW0nLFxyXG4gICAgRXF1aXBOdW09J2VxdWlwX251bScsXHJcblxyXG4gICAgQm9zc0NoYWxsZW5nZVN0YWdlPSdib3NzX2NoYWxsZW5nZV9zdGFnZV8nLFxyXG5cclxuICAgIERpbmdZdWVHZXRTdGF0ZT0nZGluZ195dWVfZ2V0X3N0YXRlXycsXHJcblxyXG4gICAgLyoq5LuK5pel54is5aGU6YCa5YWz5qyh5pWwICovXHJcbiAgICBUb3dlclBhc3NOdW09J3Rvd2VyX3Bhc3NfbnVtJyxcclxuICAgIC8qKuaUr+S7mOasoeaVsCAqL1xyXG4gICAgUGF5TnVtPSdwYXlfbnVtXycsXHJcbiAgICAvKirmlK/ku5jntKLlvJXpobXlvZPlpKnnmoTmmL7npLrmrKHmlbAgKi9cclxuICAgIFBheVVpU2hvd051bT0ncGF5X3VpX3Nob3dfbnVtXycsXHJcbiAgICAvKirmlK/ku5jntKLlvJXpobXlvZPlpKnnmoTmmL7npLrmrKHmlbAgKi9cclxuICAgIEZ1bmNVaVNob3dOdW09J2Z1bmNfdWlfc2hvd19udW1fJyxcclxuICAgIC8qKuWPr+S7pemAieaLqeeahOaUr+S7mGlk5omA5a+55bqU55qE5Y+v5Lul6Ieq6YCJ55qE56S85YyFICovXHJcbiAgICBQYXlTZWxlY3RJZHM9J3BheV9zZWxlY3RfaWRzXycsXHJcbiAgICAvKirntK/orqHlhYXlgLzpvpnmmbbmlbDph48gKi9cclxuICAgIFRvdGFsTG9uZ0ppbmdOdW09J3RvdGFsX2xvbmdfamluZ19udW0nLFxyXG4gICAgLyoq57Sv6K6h5YWF5YC86b6Z5pm26aKG5Y+W54q25oCBICovXHJcbiAgICBUb3RhbExvbmdKaW5nR2V0U3RhdGU9XCJ0b3RhbF9sb25nX2ppbmdfZ2V0X3N0YXRlX1wiLFxyXG4gICAgLyoq6aaW5YWF6aKG5Y+W54q25oCBICovXHJcbiAgICBGaXJzdFBheUdldFN0YXRlPVwiZmlyc3RfcGF5X2dldF9zdGF0ZVwiLFxyXG4gICAgLyoq6Ieq5Yqo5oiY5paXICovXHJcbiAgICBBdXRvRmlnaHRpbmc9XCJhdXRvX2ZpZ2h0aW5nXCIsXHJcbiAgICAvKiroi7Hpm4TkuJPmrabnrYnnuqcgKi9cclxuICAgIEhlcm9FeGNsdXNpdmVFcXVpcD1cIkhlcm9fRXhjbHVzaXZlX0VxdWlwX1wiLFxyXG5cclxuICAgIC8qKuWFs+WNoeaYn+e6pyAqL1xyXG4gICAgTGV2ZWxTdGFyPVwibGV2ZWxfc3Rhcl9cIixcclxuXHJcbiAgICAvKirkuIvkuIDlpKnpm7bngrnmnKzlnLDnmoTml7bpl7TmiLPlgLwgKi9cclxuICAgIFRvbW9yb3daZXJvVGltZVN0YW1wID0gXCJ0b21vcm93X3plcm9fdGltZV9zdGFtcFwiLFxyXG4gICAgLyoq5LiL5LiA5ZGo6Zu254K55pys5Zyw55qE5pe26Ze05oiz5YC8ICovXHJcbiAgICBOZXh0V2Vla1plcm9UaW1lU3RhbXAgPSBcIm5leHRfd2Vla196ZXJvX3RpbWVfc3RhbXBcIixcclxuICAgIC8qKuS4i+S4gOaciOmbtueCueacrOWcsOeahOaXtumXtOaIs+WAvCAqL1xyXG4gICAgTmV4dE1vbnRoWmVyb1RpbWVTdGFtcCA9IFwibmV4dF9tb250aF96ZXJvX3RpbWVfc3RhbXBcIixcclxuICAgIFxyXG4gICAgLyoq5ZWG5bqX56ug6IqC56S85YyF6LSt5LmwICovXHJcbiAgICBTdG9yZUNoYXB0ZXJJdGVtID0gXCJzdG9yZV9jaGFwdGVyX2l0ZW1fXCIsXHJcbiAgICAvKirllYblupfpkrvnn7PnpLzljIXotK3kubAgKi9cclxuICAgIFN0b3JlR2VtSXRlbSA9IFwic3RvcmVfZ2VtX2l0ZW1fXCIsXHJcbiAgICAvKirllYblupfph5HluIHnpLzljIXotK3kubAgKi9cclxuICAgIFN0b3JlQ29pbkl0ZW0gPSBcInN0b3JlX2NvaW5faXRlbV9cIixcclxuICAgIC8qKuWVhuW6l+avj+aXpeWVhuW6l+aooeWdlyDllYblupdJRCAqL1xyXG4gICAgU3RvcmVEYWlseVNob3BJZCA9IFwic3RvcmVfZGFpbHlfc2hvcF9pZFwiLFxyXG4gICAgLyoq5ZWG5bqX5q+P5pel5ZWG5bqX5qih5Z2XIOWvueW6lOWVhuWTgeeahOaKmOaJoyAqL1xyXG4gICAgU3RvcmVEYWlseVNob3BEaXNjb3VudCA9IFwic3RvcmVfZGFpbHlfc2hvcF9kaXNjb3VudF9cIixcclxuICAgIC8qKuWVhuW6l+avj+aXpeWVhuW6l+aooeWdl++8jOWvueW6lOWVhuWTgei0reS5sOasoeaVsCAqL1xyXG4gICAgU3RvcmVEYWlseVNob3BOdW0gPSBcInN0b3JlX2RhaWx5X3Nob3BfbnVtXCIsXHJcbiAgICAvKirllYblupfnpZ7np5jllYblupfmqKHlnZcg5a6g54mp5YWN6LS56ZmQ5Yi2ICovXHJcbiAgICBTdG9yZU15c3RlcnlQZXRGcmVlVGltZSA9IFwic3RvcmVfbXlzdGVyeV9wZXRfZnJlZV90aW1lXCIsXHJcbiAgICAvKirllYblupfnpZ7np5jllYblupfmqKHlnZcg6KOF5aSH5YWN6LS56ZmQ5Yi2ICovXHJcbiAgICBTdG9yZU15c3RlcnlFcXVpcEZyZWVUaW1lID0gXCJzdG9yZV9teXN0ZXJ5X3dlYXBvbl9mcmVlX3RpbWVcIixcclxuICAgIC8qKuWVhuW6l+iLsembhOaLm+WLn+aYr+WQpummluasoeaKveWIsOiLsembhCAqL1xyXG4gICAgU3RvcmVIZXJvSUQgPSBcInN0b3JlX2hlcm9faWRfXCIsXHJcblxyXG4gICAgLyoq5paw5omL5LiD5pel562+5Yiw5aSp5pWwICovXHJcbiAgICBOZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk51bSA9IFwibmV3X3BsYXllcl9zYXZlbl9kYXlfc2lnbl9pbl9udW1cIixcclxuICAgICAgLyoq5paw5omL5LiD5pel562+5Yiw5aSp5pWw5pe26Ze0Ki9cclxuICAgICBOZXdQbGF5ZXJTYXZlbkRheVNpZ25JblRpbWUgPSBcIm5ld19wbGF5ZXJfc2F2ZW5fZGF5X3NpZ25faW5fbnVtVGltZVwiLFxyXG4gICAgLyoq5paw5omL5LiD5pel562+5Yiw5a6M5q+VICovXHJcbiAgICBOZXdQbGF5ZXJTYXZlbkRheVNpZ25Jbk92ZXIgPSBcIm5ld19wbGF5ZXJfc2F2ZW5fZGF5X3NpZ25faW5fb3ZlclwiLFxyXG4gICAgLyoq6IO95ZCm6L+b6KGM562+5YiwICovXHJcbiAgICBDYW5TaWduSW4gPSBcImNhbl9zaWduX2luXCIsXHJcbiAgICAvKirml6XluLjnrb7liLDntK/orqHlpKnmlbAgKi9cclxuICAgIERhaWx5U2lnbkluTnVtID0gXCJkYWlseV9zaWduX2luX251bVwiLFxyXG4gICAgLyoq5pel5bi4562+5Yiw5YW35L2T5aSp5pWwICovXHJcbiAgICBEYWlseVNpZ25JbkRheSA9IFwiZGFpbHlfc2lnbl9pbl9kYXlfXCIsXHJcbiAgICAvKirml6XluLjnrb7liLDntK/orqHlpZblirHlhbfkvZPpooblj5bnirbmgIEgKi9cclxuICAgIERhaWx5U2lnbkluQ3VtdWxhdGl2ZURheSA9IFwiZGFpbHlfc2lnbl9pbl9jdW11bGF0aXZlX2RheV9cIixcclxuXHJcbiAgICAvKirmmK/lkKblj6/ku6XotK3kubDlv6vpgJ/mjILmnLogKi9cclxuICAgIENhbkZhc3RPZmZsaW5lID0gXCJnYW1lX2Nhbl9mYXN0X29mZmxpbmVcIixcclxuICAgIC8qKuaYr+WQpuWPr+S7pemAmui/h+W5v+WRiui0reS5sOW/q+mAn+aMguacuiAqL1xyXG4gICAgQ2FuQWRGYXN0T2ZmbGluZSA9IFwiZ2FtZV9jYW5fYWRfZmFzdF9vZmZsaW5lXCIsXHJcbiAgICAvKirmmK/lkKblj6/ku6XpgJrov4flub/lkYrotK3kubDlv6vpgJ/mjILmnLogKi9cclxuICAgIENvaW5Qb3BBZCA9IFwiY29pbl9wb3BfYWRcIixcclxuXHJcbiAgICAvKirku7vliqFpZCAqL1xyXG4gICAgVGFza0lkID0gXCJ0YXNrX2lkX1wiLFxyXG4gICAgLyoq5Lu75Yqh54q25oCBICovXHJcbiAgICBUYXNrU3RhdGUgPSBcInRhc2tfc3RhdGVfXCIsXHJcbiAgICAvKirku7vliqHnm67moIfop6blj5HmrKHmlbAgKi9cclxuICAgIFRhc2tOdW0gPSBcInRhc2tfbnVtX1wiLFxyXG4gICAgLyoq5oC75rS76LeD5bqmICovXHJcbiAgICBBbGxBY3Rpdml0eU51bSA9IFwiYWxsX2FjdGl2aXR5X251bVwiLFxyXG4gICAgLyoq5Lu75Yqh5pel5rS76LeDICovXHJcbiAgICBUYXNrRGFpbHlBY3Rpdml0eU51bSA9IFwidGFza19kYWlseV9hY3Rpdml0eV9udW1cIixcclxuICAgIC8qKuS7u+WKoeWRqOa0u+i3gyAqL1xyXG4gICAgVGFza1dlZWtBY3Rpdml0eU51bSA9IFwidGFza193ZWVrX2FjdGl2aXR5X251bVwiLFxyXG4gICAgLyoq5Lu75Yqh5pel5rS76LeD5aWW5Yqx54q25oCBICovXHJcbiAgICBUYXNrRGFpbHlBY3Rpdml0eVN0YXRlID0gXCJ0YXNrX2RhaWx5X2FjdGl2aXR5X3N0YXRlX1wiLC8vMOacqumihuWPliwx5bey6aKG5Y+WXHJcbiAgICAvKirku7vliqHlkajmtLvot4PlpZblirHnirbmgIEgKi9cclxuICAgIFRhc2tXZWVrbHlBY3Rpdml0eVN0YXRlID0gXCJ0YXNrX3dlZWtseV9hY3Rpdml0eV9zdGF0ZV9cIiwvLzDmnKrpooblj5YsMeW3sumihuWPllxyXG5cclxuICAgIC8qKuS4u+e6v+S7u+WKoeWxleekuui/m+W6piAqL1xyXG4gICAgVGFza01haW5TaG93SW5kZXggPSBcInRhc2tfbWFpbl9zaG93X2luZGV4XCIsXHJcbiAgICAvKirkuLvnur/ku7vliqHov5vluqYgKi9cclxuICAgIFRhc2tNYWluSW5kZXggPSBcInRhc2tfbWFpbl9pbmRleF9cIixcclxuICAgIC8qKuS4u+e6v+S7u+WKoeW9k+WJjeWAvCAqL1xyXG4gICAgVGFza01haW5OdW0gPSBcInRhc2tfbWFpbl9udW1fXCIsIFxyXG4gICAgLyoq5oiQ5bCx5Lu75Yqh5b2T5YmN5YC8ICovXHJcbiAgICBUYXNrQWNoaWV2ZW1lbnROdW0gPSBcInRhc2tfYWNoaWV2ZW1lbnRfbnVtX1wiLFxyXG4gICAgLyoq5oiQ5bCx5Lu75Yqh6L+b5bqmICovXHJcbiAgICBUYXNrQWNoaWV2ZW1lbnRJbmRleCA9IFwidGFza19hY2hpZXZlbWVudF9pbmRleF9cIixcclxuXHJcbiAgICAvKirmmK/lkKblj6/ku6XpgJrov4flub/lkYrotK3kubDovaznm5jmrKHmlbAgKi9cclxuICAgIFR1cm10YWJsZUFkID0gXCJ0dXJtdGFibGVfYWRcIixcclxuXHJcbiAgICAvKirmmK/lkKblj6/ku6XpgJrov4flhY3otLnotK3kubDovaznm5jmrKHmlbAgKi9cclxuICAgIFR1cm10YWJsZUZyZWUgPSBcInR1cm10YWJsZV9mcmVlXCIsXHJcblxyXG4gICAgLyoq5piv5ZCm5Yiw6L6+5YWN6LS56LSt5Lmw6L2s55uY5pe26Ze0IDE15YiG6ZKfPTkwMOenkiovXHJcbiAgICBUdXJtdGFibGVGcmVlVGltZSA9IFwidHVybXRhYmxlX2ZyZWVfdGltZVwiLFxyXG4gICAgLyoq5Yiw6L6+5YWN6LS56LSt5Lmw6L2s55uYICAgMTrlj6/ku6XlhY3otLkgICAgMO+8muS4jeWPr+WFjei0uSovXHJcbiAgICBUdXJtdGFibGVGcmVlWWVzPSBcInR1cm10YWJsZV9mcmVlX3llc1wiLFxyXG5cclxuICAgIC8qKnZpcOWFjei0ueWlluWKseeKtuaAgSAqL1xyXG4gICAgVmlwRnJlZVJld2FyZFN0YXR1cyA9IFwidmlwX2ZyZWVfcmV3YXJkX3N0YXR1c19cIiwvLzDmnKrpooblj5YsMeW3sumihuWPliAgICAgMC0xNFxyXG5cclxuICAgIC8qKnZpcOmrmOe6p+WlluWKseeKtuaAgSAqLyBcclxuICAgIFZpcEFkdmFuY2VkUmV3YXJkU3RhdHVzID0gXCJ2aXBfYWR2YW5jZWRfcmV3YXJkX3N0YXR1c19cIiwvLzDmnKrpooblj5YsMeW3sumihuWPliAgICAgMC0xNFxyXG5cclxuICAgIC8qKuaYr+WQpuaYr3ZpcOi6q+S7vSAqL1xyXG4gICAgVmlwSWRlbnRpdHkgPSBcInZpcF9pZGVudGl0eVwiLC8vMDrkuI3mmK92aXAgICAx77ya5pivdmlwXHJcblxyXG4gICAgLyoqdmlw5q+P5pel6aKG5Y+W54q25oCBICovXHJcbiAgICBWaXBEYWlseUNvbGxlY3Rpb25TdGF0dXMgPSBcInZpcF9kYWlseV9jb2xsZWN0aW9uX3N0YXR1c1wiLC8vMDrmnKrpooblj5YgICAx77ya5bey6aKG5Y+WICAg5q+P5pel5Yi35pawXHJcblxyXG4gICAgLyoqQm9zc+aMkeaImOasoeaVsCAqL1xyXG4gICAgQm9zc0NoYWxsZW5nZVRpbWVzID0gXCJib3NzX2NoYWxsZW5nZV90aW1lc1wiLC8v5q+P5aSp5pu05pawICAgM+asoVxyXG4gICAgLyoq5peg6ZmQ5oyR5oiY5oyR5oiY5qyh5pWwICovXHJcbiAgICBVbmxpbWl0ZWRDaGFsbGVuZ2VUaW1lcyA9IFwidW5saW1pdGVkX2NoYWxsZW5nZV90aW1lc1wiLC8v5q+P5aSp5pu05pawICAgIDPmrKFcclxuICAgIC8qKuiZmuepuuijgue8neaMkeaImOasoeaVsCAqL1xyXG4gICAgVm9pZENyYWNrQ2hhbGxlbmdlVGltZXMgPSBcInZvaWRfY3JhY2tfY2hhbGxlbmdlX3RpbWVzXCIsLy/mr4/lpKnmm7TmlrAgICAgM+asoVxyXG5cclxuICAgIC8qKuaYr+WQpuWPr+S7pei0reS5sEJvc3PmjJHmiJjmrKHmlbAgKi9cclxuICAgIEJ1eUJvc3NDaGFsbGVuZ2VUaW1lcyA9IFwiYnV5X2Jvc3NfY2hhbGxlbmdlX3RpbWVzXCIsLy/mr4/lpKnmm7TmlrAgICAz5qyhXHJcbiAgICAvKirmmK/lkKblj6/ku6XotK3kubDml6DpmZDmjJHmiJjmjJHmiJjmrKHmlbAgKi9cclxuICAgIEJ1eVVubGltaXRlZENoYWxsZW5nZVRpbWVzID0gXCJidXlfdW5saW1pdGVkX2NoYWxsZW5nZV90aW1lc1wiLC8v5q+P5aSp5pu05pawICAgICAz5qyhXHJcbiAgICAvKirmmK/lkKblj6/ku6XotK3kubDomZrnqbroo4LnvJ3mjJHmiJjmrKHmlbAgKi9cclxuICAgIEJ1eVZvaWRDcmFja0NoYWxsZW5nZVRpbWVzID0gXCJidXlfdm9pZF9jcmFja19jaGFsbGVuZ2VfdGltZXNcIiwvL+avj+WkqeabtOaWsCAgICAgM+asoVxyXG5cclxuICAgIC8qKkJvc3PmjJHmiJjmgLvmjJHmiJjmrKHmlbAgKi9cclxuICAgIFRvdGFsQm9zc0NoYWxsZW5nZVRpbWVzID0gXCJ0b3RhbF9ib3NzX2NoYWxsZW5nZV90aW1lc1wiLC8v57Sv5Yqg5qyh5pWwXHJcbiAgICAvKirml6DpmZDmjJHmiJjmgLvmjJHmiJjmrKHmlbAgKi9cclxuICAgIFRvdGFsVW5saW1pdGVkQ2hhbGxlbmdlVGltZXMgPSBcInRvdGFsX3VubGltaXRlZF9jaGFsbGVuZ2VfdGltZXNcIiwvL+e0r+WKoOasoeaVsFxyXG4gICAgLyoq6Jma56m66KOC57yd5oC75oyR5oiY5qyh5pWwICovXHJcbiAgICBUb3RhbFZvaWRDcmFja0NoYWxsZW5nZVRpbWVzID0gXCJ0b3RhbF92b2lkX2NyYWNrX2NoYWxsZW5nZV90aW1lc1wiLC8v57Sv5Yqg5qyh5pWwXHJcblxyXG4gICAgLyoqQm9zc+aMkeaImOS8pOWusyAqL1xyXG4gICAgQm9zc0NoYWxsZW5nZURhbWFnZSA9IFwiYm9zc19jaGFsbGVuZ2VfZGFtYWdlXCIsLy/orrDlvZXkuIrkuIDmrKHnmoTkvKTlrrNcclxuICAgIC8qKuaXoOmZkOaMkeaImOazouaVsCAqL1xyXG4gICAgVW5saW1pdGVkQ2hhbGxlbmdlRGFtYWdlID0gXCJ1bmxpbWl0ZWRfY2hhbGxlbmdlX2RhbWFnZVwiLC8v6K6w5b2V5LiK5LiA5qyh55qE5rOi5pWwXHJcbiAgICAvKiromZrnqbroo4LnvJ3lsYLmlbAgKi9cclxuICAgIFZvaWRDcmFja0NoYWxsZW5nZURhbWFnZSA9IFwidm9pZF9jcmFja19jaGFsbGVuZ2VfZGFtYWdlXCIsLy/orrDlvZXlt7Lnu4/miZPlrozlpJrlsJHlsYLkuoYgICAgMS045bGCICAg6buY6K6kMOWxgiAgIOaJk+WujOesrOS4gOWxgiAg5bCx5pivMVxyXG4gICAgXHJcblxyXG4gICAgLy8gLyoq5oC75peg6ZmQ5pyA5aSn5oyR5oiY5rOi5pWwICovXHJcbiAgICAvLyBVbmxpbWl0ZWRDaGFsbGVuZ2VEYW1hZ2VNYXggPSBcInVubGltaXRlZF9jaGFsbGVuZ2VfZGFtYWdlX21heFwiLC8v6K6w5b2V5peg5bC95oyR5oiY5pyA5aSn55qE5rOi5pWwXHJcblxyXG4gICAgLyoq5ZGo5Y2h5b2T5aSp5piv5ZCm6aKG5Y+WICovXHJcbiAgICBXZWVrQ2FyZElzUmVjZWl2ZVRvZGF5ID0gXCJ3ZWVrX2NhcmRfaXNfcmVjZWl2ZV90b2RheVwiLFxyXG4gICAgLyoq5ZGo5Y2h5Yiw5pyf5pe26Ze0ICovXHJcbiAgICBXZWVrQ2FyZE92ZXJUaW1lID0gXCJ3ZWVrX2NhcmRfb3Zlcl90aW1lXCIsXHJcbiAgICAvKirmmK/lkKbpppbmrKHotK3kubDlkajljaEgKi9cclxuICAgIFdlZWtDYXJkSXNGaXJzdEJ1eSA9IFwid2Vla19jYXJkX2lzX2ZpcnN0X2J1eVwiLFxyXG4gICAgLyoq5ZGo5Y2h5YWN5bm/5ZGK5qyh5pWwICovXHJcbiAgICBXZWVrQ2FyZEZyZWVBZE51bSA9IFwid2Vla19jYXJkX2ZyZWVfYWRfbnVtXCIsXHJcblxyXG4gICAgLyoq5b2T5aSp5piv5ZCm6aaW5qyh55m75b2VICovXHJcbiAgICBUb2RheUlzRmlyc3RMb2dJbiA9IFwidG9kYXlfaXNfZmlyc3RfbG9nX2luXCIsXHJcblxyXG4gICAgLyoq6Ieq5Yqo5oiY5paX5Ymp5L2Z6K+V55So5pe26Ze0ICovXHJcbiAgICB0cnlfYXV0b19maWdodF9yZW1haW49XCJ0cnlfYXV0b19maWdodFwiLFxyXG4gICAgLyoq5Yqg6YCf5Ymp5L2Z6K+V55So5pe26Ze0ICovXHJcbiAgICB0cnlfcmF0ZV9maWdodF9yZW1haW49XCJ0cnlfcmF0ZV9maWdodFwiLFxyXG59XHJcblxyXG4iXX0=