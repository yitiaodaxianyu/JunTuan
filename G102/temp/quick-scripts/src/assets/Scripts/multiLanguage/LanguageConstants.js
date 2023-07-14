"use strict";
cc._RF.push(module, '45e6fcQrU5CC4iOW9GeBixM', 'LanguageConstants');
// Scripts/multiLanguage/LanguageConstants.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllLanSpriteFrame = exports.SpriteIndex = exports.AllLanguageString = exports.LanguageIndex = exports.LanguageType = exports.OnLanguageChange = void 0;
exports.OnLanguageChange = 'LanguageChange';
var LanguageType;
(function (LanguageType) {
    /**英语 */
    LanguageType[LanguageType["en"] = 0] = "en";
    /**中文 */
    LanguageType[LanguageType["zh"] = 1] = "zh";
    /**印尼语 */
    LanguageType[LanguageType["id"] = 2] = "id";
    /**俄语 */
    LanguageType[LanguageType["be"] = 3] = "be";
    /**泰语 */
    LanguageType[LanguageType["th"] = 4] = "th";
    /**韩语 */
    LanguageType[LanguageType["kr"] = 5] = "kr";
    LanguageType[LanguageType["num"] = 6] = "num";
})(LanguageType = exports.LanguageType || (exports.LanguageType = {}));
var LanguageIndex;
(function (LanguageIndex) {
    LanguageIndex[LanguageIndex["NULL"] = 0] = "NULL";
    LanguageIndex[LanguageIndex["CRIT"] = 1] = "CRIT";
    LanguageIndex[LanguageIndex["BEHEAD"] = 2] = "BEHEAD";
    LanguageIndex[LanguageIndex["DODGE"] = 3] = "DODGE";
    LanguageIndex[LanguageIndex["PARRY"] = 4] = "PARRY";
    LanguageIndex[LanguageIndex["KNOWING_BLOW"] = 5] = "KNOWING_BLOW";
    LanguageIndex[LanguageIndex["HEADSHOT"] = 6] = "HEADSHOT";
    LanguageIndex[LanguageIndex["VERTIGO"] = 7] = "VERTIGO";
    LanguageIndex[LanguageIndex["PAUSED"] = 8] = "PAUSED";
    LanguageIndex[LanguageIndex["CONTINUE"] = 9] = "CONTINUE";
    LanguageIndex[LanguageIndex["HOME"] = 10] = "HOME";
    LanguageIndex[LanguageIndex["Skills_acquired"] = 11] = "Skills_acquired";
    LanguageIndex[LanguageIndex["DANGER"] = 12] = "DANGER";
    LanguageIndex[LanguageIndex["MonsterManual"] = 13] = "MonsterManual";
    LanguageIndex[LanguageIndex["Number_of_kills"] = 14] = "Number_of_kills";
    LanguageIndex[LanguageIndex["Feature"] = 15] = "Feature";
    LanguageIndex[LanguageIndex["Click_to_claim"] = 16] = "Click_to_claim";
    LanguageIndex[LanguageIndex["Milestone"] = 17] = "Milestone";
    LanguageIndex[LanguageIndex["Progress"] = 18] = "Progress";
    LanguageIndex[LanguageIndex["Characteristics"] = 19] = "Characteristics";
    LanguageIndex[LanguageIndex["Drag_your_hero_into_battle"] = 20] = "Drag_your_hero_into_battle";
    LanguageIndex[LanguageIndex["The_hero_is_already_in_the_team"] = 21] = "The_hero_is_already_in_the_team";
    LanguageIndex[LanguageIndex["The_location_is_not_unlocked"] = 22] = "The_location_is_not_unlocked";
    LanguageIndex[LanguageIndex["At_least_one_hero"] = 23] = "At_least_one_hero";
    LanguageIndex[LanguageIndex["Attack_method"] = 24] = "Attack_method";
    LanguageIndex[LanguageIndex["Name"] = 25] = "Name";
    LanguageIndex[LanguageIndex["Age"] = 26] = "Age";
    LanguageIndex[LanguageIndex["Sex"] = 27] = "Sex";
    LanguageIndex[LanguageIndex["Information"] = 28] = "Information";
    LanguageIndex[LanguageIndex["Introduce"] = 29] = "Introduce";
    LanguageIndex[LanguageIndex["Upgrade"] = 30] = "Upgrade";
    LanguageIndex[LanguageIndex["Backpack"] = 31] = "Backpack";
    LanguageIndex[LanguageIndex["Fast_Synthesis"] = 32] = "Fast_Synthesis";
    LanguageIndex[LanguageIndex["Promotion"] = 33] = "Promotion";
    LanguageIndex[LanguageIndex["Insufficient_energy"] = 34] = "Insufficient_energy";
    LanguageIndex[LanguageIndex["Energy_is_full"] = 35] = "Energy_is_full";
    LanguageIndex[LanguageIndex["Claim_Free"] = 36] = "Claim_Free";
    LanguageIndex[LanguageIndex["CLAIM_ALL"] = 37] = "CLAIM_ALL";
    LanguageIndex[LanguageIndex["FREE_SPIN"] = 38] = "FREE_SPIN";
    LanguageIndex[LanguageIndex["Lucky_Spin"] = 39] = "Lucky_Spin";
    LanguageIndex[LanguageIndex["Setting"] = 40] = "Setting";
    LanguageIndex[LanguageIndex["Language"] = 41] = "Language";
    LanguageIndex[LanguageIndex["Contact_us"] = 42] = "Contact_us";
    LanguageIndex[LanguageIndex["Quit_the_game"] = 43] = "Quit_the_game";
    LanguageIndex[LanguageIndex["Version"] = 44] = "Version";
    LanguageIndex[LanguageIndex["Change_avatar"] = 45] = "Change_avatar";
    LanguageIndex[LanguageIndex["OK"] = 46] = "OK";
    LanguageIndex[LanguageIndex["YES"] = 47] = "YES";
    LanguageIndex[LanguageIndex["NO"] = 48] = "NO";
    LanguageIndex[LanguageIndex["Do_you_really_want_to_quit_game"] = 49] = "Do_you_really_want_to_quit_game";
    LanguageIndex[LanguageIndex["Start_game"] = 50] = "Start_game";
    LanguageIndex[LanguageIndex["Come_back_for_more_rewards_in"] = 51] = "Come_back_for_more_rewards_in";
    LanguageIndex[LanguageIndex["DAY1"] = 52] = "DAY1";
    LanguageIndex[LanguageIndex["DAY2"] = 53] = "DAY2";
    LanguageIndex[LanguageIndex["DAY3"] = 54] = "DAY3";
    LanguageIndex[LanguageIndex["DAY4"] = 55] = "DAY4";
    LanguageIndex[LanguageIndex["DAY5"] = 56] = "DAY5";
    LanguageIndex[LanguageIndex["DAY6"] = 57] = "DAY6";
    LanguageIndex[LanguageIndex["DAY7"] = 58] = "DAY7";
    LanguageIndex[LanguageIndex["CLAIM"] = 59] = "CLAIM";
    LanguageIndex[LanguageIndex["CLAIMED"] = 60] = "CLAIMED";
    LanguageIndex[LanguageIndex["Seven_days_sign_in"] = 61] = "Seven_days_sign_in";
    LanguageIndex[LanguageIndex["Ranking"] = 62] = "Ranking";
    LanguageIndex[LanguageIndex["Daily_task"] = 63] = "Daily_task";
    LanguageIndex[LanguageIndex["Hang_up_bonus"] = 64] = "Hang_up_bonus";
    LanguageIndex[LanguageIndex["CLAIN_X5"] = 65] = "CLAIN_X5";
    LanguageIndex[LanguageIndex["FREE_CHEST"] = 66] = "FREE_CHEST";
    LanguageIndex[LanguageIndex["EQUIPMENT_CHEST"] = 67] = "EQUIPMENT_CHEST";
    LanguageIndex[LanguageIndex["FRAGMENTED_CHEST"] = 68] = "FRAGMENTED_CHEST";
    LanguageIndex[LanguageIndex["SUPER_CHEST"] = 69] = "SUPER_CHEST";
    LanguageIndex[LanguageIndex["FREE"] = 70] = "FREE";
    LanguageIndex[LanguageIndex["REDAY"] = 71] = "REDAY";
    LanguageIndex[LanguageIndex["COINS2500"] = 72] = "COINS2500";
    LanguageIndex[LanguageIndex["Insufficient_gems"] = 73] = "Insufficient_gems";
    LanguageIndex[LanguageIndex["Insufficient_coins"] = 74] = "Insufficient_coins";
    LanguageIndex[LanguageIndex["WEAPON"] = 75] = "WEAPON";
    LanguageIndex[LanguageIndex["Equipped"] = 76] = "Equipped";
    LanguageIndex[LanguageIndex["Change_Hero"] = 77] = "Change_Hero";
    LanguageIndex[LanguageIndex["Additional_Attributes"] = 78] = "Additional_Attributes";
    LanguageIndex[LanguageIndex["Replace"] = 79] = "Replace";
    LanguageIndex[LanguageIndex["Not_Ativated"] = 80] = "Not_Ativated";
    LanguageIndex[LanguageIndex["Reset"] = 81] = "Reset";
    LanguageIndex[LanguageIndex["Melt"] = 82] = "Melt";
    LanguageIndex[LanguageIndex["Drag_two_equipment_of_the_same_level_to_synthesize_a_higher_level_equipment"] = 83] = "Drag_two_equipment_of_the_same_level_to_synthesize_a_higher_level_equipment";
    LanguageIndex[LanguageIndex["Reset_Attributes"] = 84] = "Reset_Attributes";
    LanguageIndex[LanguageIndex["GiveUp"] = 85] = "GiveUp";
    LanguageIndex[LanguageIndex["Save"] = 86] = "Save";
    LanguageIndex[LanguageIndex["New_Equipment"] = 87] = "New_Equipment";
    LanguageIndex[LanguageIndex["Damage_Increased"] = 88] = "Damage_Increased";
    LanguageIndex[LanguageIndex["ExclusiveAttributes"] = 89] = "ExclusiveAttributes";
    LanguageIndex[LanguageIndex["Promotion_Details"] = 90] = "Promotion_Details";
    LanguageIndex[LanguageIndex["SuperSkill"] = 91] = "SuperSkill";
    LanguageIndex[LanguageIndex["HeroFragment"] = 92] = "HeroFragment";
    LanguageIndex[LanguageIndex["After_collecting_the_corresponding_equipment_consume_the_fragments_to_promote_the_rank"] = 93] = "After_collecting_the_corresponding_equipment_consume_the_fragments_to_promote_the_rank";
    LanguageIndex[LanguageIndex["FragmentTransformation"] = 94] = "FragmentTransformation";
    LanguageIndex[LanguageIndex["Randomly_transform_into_fragments_of_other_heroes"] = 95] = "Randomly_transform_into_fragments_of_other_heroes";
    LanguageIndex[LanguageIndex["Transform"] = 96] = "Transform";
    LanguageIndex[LanguageIndex["MAX"] = 97] = "MAX";
    LanguageIndex[LanguageIndex["Yard"] = 98] = "Yard";
    LanguageIndex[LanguageIndex["Level"] = 99] = "Level";
    LanguageIndex[LanguageIndex["Go_to_the_following_page_to"] = 100] = "Go_to_the_following_page_to";
    LanguageIndex[LanguageIndex["Victory"] = 101] = "Victory";
    LanguageIndex[LanguageIndex["Lost"] = 102] = "Lost";
    LanguageIndex[LanguageIndex["Coin"] = 103] = "Coin";
    LanguageIndex[LanguageIndex["shop"] = 104] = "shop";
    LanguageIndex[LanguageIndex["hero"] = 105] = "hero";
    LanguageIndex[LanguageIndex["fighting"] = 106] = "fighting";
    LanguageIndex[LanguageIndex["pet"] = 107] = "pet";
    LanguageIndex[LanguageIndex["Map"] = 108] = "Map";
    LanguageIndex[LanguageIndex["Sign_in"] = 109] = "Sign_in";
    LanguageIndex[LanguageIndex["Reach"] = 110] = "Reach";
    LanguageIndex[LanguageIndex["Go"] = 111] = "Go";
    LanguageIndex[LanguageIndex["Speed_Up"] = 112] = "Speed_Up";
    LanguageIndex[LanguageIndex["Unlock_Now"] = 113] = "Unlock_Now";
    LanguageIndex[LanguageIndex["Watch_ads_to_unlock_speed"] = 114] = "Watch_ads_to_unlock_speed";
    LanguageIndex[LanguageIndex["Discover_new_species_please_be_prepared_for_battle"] = 115] = "Discover_new_species_please_be_prepared_for_battle";
    LanguageIndex[LanguageIndex["Warning"] = 116] = "Warning";
    LanguageIndex[LanguageIndex["Jump_to_hero_page"] = 117] = "Jump_to_hero_page";
    LanguageIndex[LanguageIndex["A_New_Hero_Has_Joined_Your_Team"] = 118] = "A_New_Hero_Has_Joined_Your_Team";
    LanguageIndex[LanguageIndex["Attack"] = 119] = "Attack";
    LanguageIndex[LanguageIndex["May_Get"] = 120] = "May_Get";
    LanguageIndex[LanguageIndex["AttackSpeed"] = 121] = "AttackSpeed";
    LanguageIndex[LanguageIndex["ExplosiveAbility"] = 122] = "ExplosiveAbility";
    LanguageIndex[LanguageIndex["Range"] = 123] = "Range";
    LanguageIndex[LanguageIndex["Skill"] = 124] = "Skill";
    LanguageIndex[LanguageIndex["Rewards"] = 125] = "Rewards";
    LanguageIndex[LanguageIndex["CancelSkill"] = 126] = "CancelSkill";
    LanguageIndex[LanguageIndex["SaoDang"] = 127] = "SaoDang";
    LanguageIndex[LanguageIndex["SaoDangTiShi"] = 128] = "SaoDangTiShi";
    LanguageIndex[LanguageIndex["Resurrection"] = 129] = "Resurrection";
    LanguageIndex[LanguageIndex["Clear_Raid_Immediately"] = 130] = "Clear_Raid_Immediately";
    LanguageIndex[LanguageIndex["PremiumAccount"] = 131] = "PremiumAccount";
    LanguageIndex[LanguageIndex["OfflineEarnings20"] = 132] = "OfflineEarnings20";
    LanguageIndex[LanguageIndex["Remove5ADS_Day"] = 133] = "Remove5ADS_Day";
    LanguageIndex[LanguageIndex["StartForFree"] = 134] = "StartForFree";
    LanguageIndex[LanguageIndex["DingYueTip"] = 135] = "DingYueTip";
    LanguageIndex[LanguageIndex["Privacy_Policy"] = 136] = "Privacy_Policy";
    LanguageIndex[LanguageIndex["Day3free_trial"] = 137] = "Day3free_trial";
    LanguageIndex[LanguageIndex["Week"] = 138] = "Week";
    LanguageIndex[LanguageIndex["Month"] = 139] = "Month";
    LanguageIndex[LanguageIndex["Year"] = 140] = "Year";
    LanguageIndex[LanguageIndex["Loading"] = 141] = "Loading";
    LanguageIndex[LanguageIndex["DearVIPYou_got"] = 142] = "DearVIPYou_got";
    LanguageIndex[LanguageIndex["ThisChallengeCanBeResurrected"] = 143] = "ThisChallengeCanBeResurrected";
    LanguageIndex[LanguageIndex["RepairTheWalls"] = 144] = "RepairTheWalls";
    LanguageIndex[LanguageIndex["Defeat"] = 145] = "Defeat";
    LanguageIndex[LanguageIndex["Completed"] = 146] = "Completed";
    LanguageIndex[LanguageIndex["Replay"] = 147] = "Replay";
    LanguageIndex[LanguageIndex["Hero_damage_stats"] = 148] = "Hero_damage_stats";
    LanguageIndex[LanguageIndex["Show_Damage"] = 149] = "Show_Damage";
    LanguageIndex[LanguageIndex["Welcome_Back"] = 150] = "Welcome_Back";
    LanguageIndex[LanguageIndex["You_were_idle_for"] = 151] = "You_were_idle_for";
    LanguageIndex[LanguageIndex["Max_Reward"] = 152] = "Max_Reward";
    LanguageIndex[LanguageIndex["You_have_collected"] = 153] = "You_have_collected";
    LanguageIndex[LanguageIndex["IDLE_REWARD"] = 154] = "IDLE_REWARD";
    LanguageIndex[LanguageIndex["Choose_to_acquire_2_skills"] = 155] = "Choose_to_acquire_2_skills";
    LanguageIndex[LanguageIndex["Refresh_skills"] = 156] = "Refresh_skills";
    LanguageIndex[LanguageIndex["Unlock_All_Skill_Slots"] = 157] = "Unlock_All_Skill_Slots";
    LanguageIndex[LanguageIndex["The_skills_are_full"] = 158] = "The_skills_are_full";
    LanguageIndex[LanguageIndex["Skill_is_full"] = 159] = "Skill_is_full";
    LanguageIndex[LanguageIndex["Acquired_skills"] = 160] = "Acquired_skills";
    LanguageIndex[LanguageIndex["Guest"] = 161] = "Guest";
    LanguageIndex[LanguageIndex["The_team_is_full"] = 162] = "The_team_is_full";
    LanguageIndex[LanguageIndex["This_hero_is_unlocked_at"] = 163] = "This_hero_is_unlocked_at";
    LanguageIndex[LanguageIndex["Team"] = 164] = "Team";
    LanguageIndex[LanguageIndex["Drag_the_avatar_to_change_the_position"] = 165] = "Drag_the_avatar_to_change_the_position";
    LanguageIndex[LanguageIndex["Click_on_the_hero_to_join_the_team"] = 166] = "Click_on_the_hero_to_join_the_team";
    LanguageIndex[LanguageIndex["previous_level"] = 167] = "previous_level";
    LanguageIndex[LanguageIndex["next_level"] = 168] = "next_level";
    LanguageIndex[LanguageIndex["Enemy_lineup"] = 169] = "Enemy_lineup";
    LanguageIndex[LanguageIndex["Chapter"] = 170] = "Chapter";
    LanguageIndex[LanguageIndex["Active_Skill"] = 171] = "Active_Skill";
    LanguageIndex[LanguageIndex["Attack_Features"] = 172] = "Attack_Features";
    LanguageIndex[LanguageIndex["Can_attack_land_units"] = 173] = "Can_attack_land_units";
    LanguageIndex[LanguageIndex["Can_attack_air_units"] = 174] = "Can_attack_air_units";
    LanguageIndex[LanguageIndex["Can_attack_burrowing_units"] = 175] = "Can_attack_burrowing_units";
    LanguageIndex[LanguageIndex["Remaining"] = 176] = "Remaining";
    LanguageIndex[LanguageIndex["Waiting"] = 177] = "Waiting";
    LanguageIndex[LanguageIndex["Sold_out"] = 178] = "Sold_out";
    LanguageIndex[LanguageIndex["Level_Up"] = 179] = "Level_Up";
    LanguageIndex[LanguageIndex["Maximum_MP"] = 180] = "Maximum_MP";
    LanguageIndex[LanguageIndex["MP_Recovery"] = 181] = "MP_Recovery";
    LanguageIndex[LanguageIndex["Unlock_new_levels_after_complete"] = 182] = "Unlock_new_levels_after_complete";
    LanguageIndex[LanguageIndex["Unlock"] = 183] = "Unlock";
    LanguageIndex[LanguageIndex["Equipment"] = 184] = "Equipment";
    LanguageIndex[LanguageIndex["Castle"] = 185] = "Castle";
    LanguageIndex[LanguageIndex["Talent"] = 186] = "Talent";
    LanguageIndex[LanguageIndex["NotOpen"] = 187] = "NotOpen";
    LanguageIndex[LanguageIndex["unload"] = 188] = "unload";
    LanguageIndex[LanguageIndex["merge"] = 189] = "merge";
    LanguageIndex[LanguageIndex["Unequip_All"] = 190] = "Unequip_All";
    LanguageIndex[LanguageIndex["Auto_Equip"] = 191] = "Auto_Equip";
    LanguageIndex[LanguageIndex["Info"] = 192] = "Info";
    LanguageIndex[LanguageIndex["Gears"] = 193] = "Gears";
    LanguageIndex[LanguageIndex["Promote"] = 194] = "Promote";
    LanguageIndex[LanguageIndex["Evolve"] = 195] = "Evolve";
    LanguageIndex[LanguageIndex["The_hero_has_not_yet_obtained"] = 196] = "The_hero_has_not_yet_obtained";
    LanguageIndex[LanguageIndex["first_reward"] = 197] = "first_reward";
    LanguageIndex[LanguageIndex["Idle_Times"] = 198] = "Idle_Times";
    LanguageIndex[LanguageIndex["You_can_claim_after"] = 199] = "You_can_claim_after";
    LanguageIndex[LanguageIndex["City"] = 200] = "City";
    LanguageIndex[LanguageIndex["Insufficient_MP"] = 201] = "Insufficient_MP";
    LanguageIndex[LanguageIndex["Improve_combat_power"] = 202] = "Improve_combat_power";
    LanguageIndex[LanguageIndex["Function_Unlock"] = 203] = "Function_Unlock";
    LanguageIndex[LanguageIndex["Free_3_times_claim"] = 204] = "Free_3_times_claim";
    LanguageIndex[LanguageIndex["The_ad_failed_to_play_and_the_reward_cannot_be_obtained"] = 205] = "The_ad_failed_to_play_and_the_reward_cannot_be_obtained";
    LanguageIndex[LanguageIndex["ldle_Talent_Points"] = 206] = "ldle_Talent_Points";
    LanguageIndex[LanguageIndex["Next_Talent_Point_in"] = 207] = "Next_Talent_Point_in";
    LanguageIndex[LanguageIndex["Faster"] = 208] = "Faster";
    LanguageIndex[LanguageIndex["PlayerLevel"] = 209] = "PlayerLevel";
    LanguageIndex[LanguageIndex["FunctionForecast"] = 210] = "FunctionForecast";
    LanguageIndex[LanguageIndex["Close"] = 211] = "Close";
    LanguageIndex[LanguageIndex["Use"] = 212] = "Use";
    LanguageIndex[LanguageIndex["UsesRemainingToday"] = 213] = "UsesRemainingToday";
    LanguageIndex[LanguageIndex["ResetsIn"] = 214] = "ResetsIn";
    LanguageIndex[LanguageIndex["Extra_50_Gems"] = 215] = "Extra_50_Gems";
    LanguageIndex[LanguageIndex["FasterRewards"] = 216] = "FasterRewards";
    LanguageIndex[LanguageIndex["GetVip"] = 217] = "GetVip";
    LanguageIndex[LanguageIndex["EndlessChallenges"] = 218] = "EndlessChallenges";
    LanguageIndex[LanguageIndex["Play"] = 219] = "Play";
    LanguageIndex[LanguageIndex["Normal"] = 220] = "Normal";
    LanguageIndex[LanguageIndex["Hard"] = 221] = "Hard";
    LanguageIndex[LanguageIndex["BossHunting"] = 222] = "BossHunting";
    LanguageIndex[LanguageIndex["TowerOfTrial"] = 223] = "TowerOfTrial";
    LanguageIndex[LanguageIndex["UnlockAfter"] = 224] = "UnlockAfter";
    LanguageIndex[LanguageIndex["BuyChallengeTickets"] = 225] = "BuyChallengeTickets";
    LanguageIndex[LanguageIndex["Numberoftimestoday"] = 226] = "Numberoftimestoday";
    LanguageIndex[LanguageIndex["RemainingToday"] = 227] = "RemainingToday";
    LanguageIndex[LanguageIndex["Cancel"] = 228] = "Cancel";
    LanguageIndex[LanguageIndex["GiveUpGame"] = 229] = "GiveUpGame";
    LanguageIndex[LanguageIndex["SeasonEndIn"] = 230] = "SeasonEndIn";
    LanguageIndex[LanguageIndex["HighestStage"] = 231] = "HighestStage";
    LanguageIndex[LanguageIndex["MyRank"] = 232] = "MyRank";
    LanguageIndex[LanguageIndex["RewardsLastWeek"] = 233] = "RewardsLastWeek";
    LanguageIndex[LanguageIndex["BossComing"] = 234] = "BossComing";
    LanguageIndex[LanguageIndex["NoReward"] = 235] = "NoReward";
    LanguageIndex[LanguageIndex["RulesDescription"] = 236] = "RulesDescription";
    LanguageIndex[LanguageIndex["ClickAnywhereToCloseThePopup"] = 237] = "ClickAnywhereToCloseThePopup";
    LanguageIndex[LanguageIndex["Formation"] = 238] = "Formation";
    LanguageIndex[LanguageIndex["LimitedTimeReward"] = 239] = "LimitedTimeReward";
    LanguageIndex[LanguageIndex["PlayerLv"] = 240] = "PlayerLv";
    LanguageIndex[LanguageIndex["TheNumberOfPurchases"] = 241] = "TheNumberOfPurchases";
    LanguageIndex[LanguageIndex["Collect"] = 242] = "Collect";
    LanguageIndex[LanguageIndex["FreeGems"] = 243] = "FreeGems";
    LanguageIndex[LanguageIndex["RefreshTime"] = 244] = "RefreshTime";
    LanguageIndex[LanguageIndex["DeluxeChest"] = 245] = "DeluxeChest";
    LanguageIndex[LanguageIndex["SuperDeluxeChest"] = 246] = "SuperDeluxeChest";
    LanguageIndex[LanguageIndex["TapHereToViewChance"] = 247] = "TapHereToViewChance";
    LanguageIndex[LanguageIndex["ChestDetails"] = 248] = "ChestDetails";
    LanguageIndex[LanguageIndex["GearChest"] = 249] = "GearChest";
    LanguageIndex[LanguageIndex["SuperGearChest"] = 250] = "SuperGearChest";
    LanguageIndex[LanguageIndex["Blue"] = 251] = "Blue";
    LanguageIndex[LanguageIndex["Elite"] = 252] = "Elite";
    LanguageIndex[LanguageIndex["Legendary"] = 253] = "Legendary";
    LanguageIndex[LanguageIndex["Mythic"] = 254] = "Mythic";
    LanguageIndex[LanguageIndex["Bonus"] = 255] = "Bonus";
    LanguageIndex[LanguageIndex["CampaignInvestment"] = 256] = "CampaignInvestment";
    LanguageIndex[LanguageIndex["GrowthInvestment"] = 257] = "GrowthInvestment";
    LanguageIndex[LanguageIndex["Tips"] = 258] = "Tips";
    LanguageIndex[LanguageIndex["AccumulateToClaimRewards"] = 259] = "AccumulateToClaimRewards";
    LanguageIndex[LanguageIndex["Value"] = 260] = "Value";
    LanguageIndex[LanguageIndex["BestValue"] = 261] = "BestValue";
    LanguageIndex[LanguageIndex["Sale"] = 262] = "Sale";
    LanguageIndex[LanguageIndex["limit"] = 263] = "limit";
    LanguageIndex[LanguageIndex["Special"] = 264] = "Special";
    LanguageIndex[LanguageIndex["HotDeals"] = 265] = "HotDeals";
    LanguageIndex[LanguageIndex["Daily"] = 266] = "Daily";
    LanguageIndex[LanguageIndex["SelectYourWantedGifts"] = 267] = "SelectYourWantedGifts";
    LanguageIndex[LanguageIndex["BattlePass"] = 268] = "BattlePass";
    LanguageIndex[LanguageIndex["ContinueClaim"] = 269] = "ContinueClaim";
    LanguageIndex[LanguageIndex["Day"] = 270] = "Day";
    LanguageIndex[LanguageIndex["Buygiftpackstoget"] = 271] = "Buygiftpackstoget";
    LanguageIndex[LanguageIndex["EndIn"] = 272] = "EndIn";
    LanguageIndex[LanguageIndex["Statistics"] = 273] = "Statistics";
    LanguageIndex[LanguageIndex["HeroDamage"] = 274] = "HeroDamage";
    LanguageIndex[LanguageIndex["PetDamage"] = 275] = "PetDamage";
    LanguageIndex[LanguageIndex["BasicattackDamage"] = 276] = "BasicattackDamage";
    LanguageIndex[LanguageIndex["SkillDamage"] = 277] = "SkillDamage";
    LanguageIndex[LanguageIndex["Youcanincreaseyourstrengthby"] = 278] = "Youcanincreaseyourstrengthby";
    LanguageIndex[LanguageIndex["Upgradehero"] = 279] = "Upgradehero";
    LanguageIndex[LanguageIndex["Raisepets"] = 280] = "Raisepets";
    LanguageIndex[LanguageIndex["CumulativeCheckInDays"] = 281] = "CumulativeCheckInDays";
    LanguageIndex[LanguageIndex["CumulativeCheckIn"] = 282] = "CumulativeCheckIn";
    LanguageIndex[LanguageIndex["AdditionalRewardsAvailable"] = 283] = "AdditionalRewardsAvailable";
    LanguageIndex[LanguageIndex["Choose"] = 284] = "Choose";
    LanguageIndex[LanguageIndex["Buy"] = 285] = "Buy";
    LanguageIndex[LanguageIndex["Capacity"] = 286] = "Capacity";
    LanguageIndex[LanguageIndex["All"] = 287] = "All";
    LanguageIndex[LanguageIndex["Prop"] = 288] = "Prop";
    LanguageIndex[LanguageIndex["TheCurrentHPOfTheCityWall"] = 289] = "TheCurrentHPOfTheCityWall";
    LanguageIndex[LanguageIndex["GoldMallTip"] = 290] = "GoldMallTip";
})(LanguageIndex = exports.LanguageIndex || (exports.LanguageIndex = {}));
exports.AllLanguageString = [
    ['', '', "", "", ""],
    //0英语  1中文  2印尼语   3俄语    4泰语
    ['CRIT', '暴 击', "CRIT", "Критический удар", "คริต"],
    ['BEHEAD', '斩 杀', "Tebas", "Обезглавливание", "ฆ่า"],
    ['DODGE', '闪 避', "DODGE", "Уклонение", "หลบหลีก"],
    ['PARRY', '格 挡', "PARRY", "Блок", "สกัดกั้น"],
    ['KNOWING BLOW', '会心一击', "CRIT BLOW", "Удар в сердце", "โจมตีรู้ใจ"],
    ['HEADSHOT', '爆 头', "HEADSHOT", "Выстрел в голову", "ระเบิดหัว"],
    ['VERTIGO', '眩 晕', "STUN", "Нокаут", "วิงเวียน"],
    ['PAUSED', '暂 停', "Pause", "Пауза", "หยุดชั่วคราว"],
    ['CONTINUE', '继 续', "Lanjutkan", "Продолжить", "ต่อเนื่อง"],
    ['HOME', '返回主页', "Kembali ke halaman utama", "Вернуться на главную страницу", "กลับไปหน้าหลัก"],
    ['Skills Acquired:', '已获得的技能:', "Mendapatkan skill:", "Полученные умения:", "สกิลที่รับแล้ว:"],
    ['DANGER', '危 险', "BAHAYA", "Опасность", "อันตราย"],
    ['Monster Manual', '怪物图鉴', "Manual monster", "Галерея монстров", "รูปภาพมอนสเตอร์"],
    ['Number of kills:', '击杀数', "Jumlah membunuh:", "Количество убийств", "จำนวนสังหาร"],
    ['Feature:', '特 性:', "Karakteristik:", "Особенности:", "ลักษณะพิเศษ:"],
    ['Click to claim', '点 击 领 取', "Tekan untuk klaim:", "Нажми, чтобы получить", "กดรับ"],
    ['Milestone', '里程碑', "Pencapaian", "Важный этап", "บอกบอกระยะทาง"],
    ['Progress', '进度', "Kemajuan", "Прогресс", "คืบหน้า"],
    ['Characteristics:', '特性:', "Karakteristik:", "Атрибут:", "ลักษณะพิเศษ:"],
    ['Drag your hero into battle', '拖动上阵你的英雄', "Tarik pahlawan ke pertarungan", "Перетащи своего героя для начала сражения", "ลากฮีโร่ของคุณออกรบ"],
    ['The hero has gone into battle', '该英雄已经在队伍里', "Pahlawan ini sudah pergi ke pertarungan", "Этот герой уже в команде", "ฮีโร่นี้อยู่ในทีมแล้ว"],
    ['The location is not unlocked', '该位置未解锁', "Lokasi ini tidak terkunci", "Эта локация не разблокирована", "ตำแหน่งนี้ยังไม่ปลดล็อค"],
    ['At least one hero', '至少上阵一名英雄', "Minimal 1 pahlawan ke pertarungan", "Для сражения необходим хотя бы один герой", "อย่างน้อยมีฮีโร่ 1 คนออกรบ"],
    ['Attack method', '攻击方式', "Metode serangan", "Способ атаки", "วิธีโจมตี"],
    ['Name', '姓名', "Nama", "Имя", "ชื่อ"],
    ['Age', '年龄', "Umur", "Возраст", "อายุ"],
    ['Sex', '性别', "Jenis kelamin", "Пол", "เพศ"],
    ['Information', '信息', "Informasi", "Информация", "ข้อมูล"],
    ['Introduce', '介绍', "Pengenalan", "Введение", "แนะนำ"],
    ['Upgrade', '升级', "Upgrade", "Обновление", "อัปเกรด"],
    ['Backpack', '背包', "Ransel", "Рюкзак", "เป้"],
    ['Fast Synthesis', '快速合成', "Sintesis cepat", "Быстрый синтез", "ผสานด่วน"],
    ['Promotion', '晋升', "Naikkan ", "Повышение", "เลื่อนขั้น"],
    ['Insufficient energy', '能量不足', "Energi tidak cukup", "Недостаточно энергии", "พลังไม่พอ"],
    ['Energy is full', '能量已经满了', "Energi sudah penuh", "Энергия уже полностью восстановлена", "พลังเต็มแล้ว"],
    ['CLAIM FREE', '免费领取', "Klaim gratis", "Получить бесплатно", "รับฟรี"],
    ['CLAIM ALL', '领取所有', "Klaim semua", "Получить все", "รับทั้งหมด"],
    ['FREE SPIN', '免费抽奖', "Spin gratis", "Бесплатный розыгрыш призов", "จับรางวัลฟรี"],
    ['Lucky Draw', '幸运转盘', "Lucky Draw", "Колесо фортуны", "วงล้อโชคดี"],
    ['SETTING', '设 置', "Pengaturan", "Настройки", "ตั้งค่า"],
    ['English', '中 文', "Mandarin", "Китайский язык", "ภาษาจีน"],
    ['Contact Us', '联 系 我 们', "Kontak kami", "Свяжись с нами", "ติดต่อพวกเรา"],
    ['Quit Game', '退 出 游 戏', "Keluar game", "Выйти из игры", "ออกเกม"],
    ['Version', '版 本', "Versi", "Версия", "เวอร์ชั่น"],
    ['Change Avatar', '更改头像', "Ganti avatar", "Изменить аватар", "เปลี่ยนรูปโปรไฟล์"],
    ['OK', '好的', "OK", "OK", "เรียบร้อยแล้ว"],
    ['YES', '确 定', "YA", "Подтвердить", "ยืนยัน"],
    ['NO', '取 消', "BATAL", "Отмена", "ยกเลิก"],
    ['Do you really want to quit game?', '你真的要退出游戏吗？', "Apakah kamu ingin keluar dari game?", "Ты действительно хочешь выйти из игры?", "คุณต้องการออกจากเกมใช่ไหม?"],
    ['Start Challenge', '开 始 挑 战', "Mulai tantangan", "Начать", "เริ่มท้าสู้"],
    ['Come Back For More Rewards In', '回来领取更多的奖励', "Kembali untuk mengklaim lebih banyak hadiah", "Возвращайся за новыми наградами", "กลับมารับรางวัลที่มากขึ้น"],
    ['DAY1', '第一天', "Hari pertama", "День 1", "วันที่ 1 "],
    ['DAY2', '第二天', "Hari ke-2", "День 2", "วันที่ 2"],
    ['DAY3', '第三天', "Hari ke-3", "День 3", "วันที่ 3"],
    ['DAY4', '第四天', "Hari ke-4", "День 4", "วันที่ 4"],
    ['DAY5', '第五天', "Hari ke-5", "День 5", "วันที่ 5"],
    ['DAY6', '第六天', "Hari ke-6", "День 6", "วันที่ 6"],
    ['DAY7', '第七天', "Hari ke-7", "День 7", "วันที่ 7"],
    ['CLAIM', '领 取', "KLAIM", "Получить", "รับ"],
    ['CLAIMED', '已 领 取', "SUDAH DIKLAIM", "Уже получено", "รับแล้ว"],
    ['Seven Days Sign In', '七天签到', "Sign in 7 hari", "Вход в игру в течение 7 дней", "ลงชื่อ 7 วัน"],
    ['Ranking', '排行榜', "Daftar peringkat", "Рейтинг", "อันดับ"],
    ['Daily Mission', '每日任务', "Misi harian", "Ежедневные задачи", "ภารกิจรายวัน"],
    ['Hang Up Bonus', '挂 机 奖 励', "Hadiah AFK", "Награда авторежима", "รางวัล AI"],
    ['Claim X5', '领 取 X5', "Klaim 5x", "Получить X5", "รับ X5"],
    ['FREE CHEST', '免 费 宝 箱', "Peti harta gratis", "Бесплатный сундук с сокровищами", "หีบสมบัติฟรี"],
    ['EQUIPMENT CHEST', '装 备 宝 箱', "Peti harta perlengkapan", "Сундук с сокровищами и оснасткой", "หีบสมบัติไอเทม"],
    ['FRAGMENTED CHEST', '碎 片 宝 箱', "Peti hara fragmen", "Сундук с сокровищами и фрагментами", "หีบสมบัติชิ้นส่วน"],
    ['SUPER CHEST', '超 级 宝 箱', "Peti harta super", "Супер-сундук с сокровищами", "หีบสมบัติซุปเปอร์"],
    ['FREE', '免 费', "Gratis", "Бесплатно", "ฟรี"],
    ['READY', '可 开 启', "Dapat dibuka", "Можно открыть", "สามารถเปิด"],
    ['2500 COINS', '2500 金币', "2.500 Koin", "2500 золотых монет", "2500 โกลด์"],
    ['Insufficient Gems', '钻石不足', "Berlian tidak cukup", "Недостаточно алмазов", "เพชรไม่พอ"],
    ['Insufficient Coins', '金币不足', "Koin tidak cukup", "Недостаточно золотых монет", "โกลด์ไม่พอ"],
    ['WEAPON', '武 器', "Senjata", "Оружие", "อาวุธ"],
    ['Equipped', '已装备', "Sudah dipasang", "Снаряжено", "สวมแล้ว"],
    ['Change Hero', '更换英雄', "Ganti pahlawan", "Сменить героя", "เปลี่ยนฮีโร่"],
    ['Additional Attributes', '附加属性', "Atribut tambahan", "Дополнительный атрибут", "แนบคุณสมบัติ"],
    ['Replace', '替 换', "Ganti", "Замена", "แทนที่"],
    ['None', '未激活', "Belum aktif", "Не активировано", "ยังไม่เปิดใช้"],
    ['Reset', '重置', "Atur ulang", "Сброс", "รีเซ็ต"],
    ['Melt', '分 解', "Urai", "Разобрать", "สลาย"],
    ['Drag two equipment of the same level to synthesize a higher level equipment', '拖动两个同级装备可合成高1级的装备', "Tarik 2 perlengkapan dengan level yang sama untuk dapat mensintesis perlengkapan yang lebih tinggi 1 level", "Перетащи два предмета оснастки с одинаковым уровнем, чтобы синтезировать предмет оснастки на 1 уровень выше", "ลากไอเทม 2 ชิ้นที่ระดับเดียวกัน สามารถผสานเป็นไอเทมที่สูงขึ้นอีก 1 ระดับ"],
    ['Reset Attributes', '重 置 属 性', "Atur ulang atribut", "Сбросить атрибут", "รีเซ็ตคุณสมบัติ"],
    ['Give Up', '放弃', "Buang", "Сдаться", "ละทิ้ง"],
    ['Save', '保存', "Simpan", "Сохранить", "บันทึก"],
    ['New Equipment', '新装备', "Perlengkapan baru", "Новая оснастка", "ไอเทมใหม่"],
    ['Damage Increased', '伤害提升', "DMG meningkat", "Увеличение урона", "เสียหายเพิ่มขึ้น"],
    ['Exclusive Attributes', '专属属性', "Atribut eksklusif", "Особый атрибут", "คุณสมบัติเฉพาะ"],
    ['Promotion Details', '晋升详情', "Detail naik tingkat", "Подробности повышения", "รายละเอียดเลื่อนขั้น"],
    ['Super Skill', '超级技能', "Skill super", "Супер-умение", "สกิลซุปเปอร์"],
    ['Hero Fragment', '英雄碎片', "Fragmen Pahlawan", "Фрагмент героя", "ชิ้นส่วนฮีโร่"],
    ['After Collecting The Corresponding Equipment,Consume The Fragments To Promote The Rank', '集齐对应的装备后，消耗碎片来晋升军衔', "Setelah mengumpulkan atribut yang sesuai, konsumsi fragmen untuk menaikkan pangkat", "После того как ты соберешь соответствующую оснастку, воспользуйся фрагментами, чтобы повысить свой ранг", "สะสมไอเทมที่เกี่ยวข้องครบ ใช้ชิ้นส่วนเลื่อนขั้นยศทหาร"],
    ['Fragment Transformation', '碎片转化', "Transformasi Fragmen", "Преобразовать фрагменты", "แปลงชิ้นส่วน"],
    ['Randomly Transform Into Fragments Of Other Heroes', '随机转化为其他英雄的碎片', "Mentransformasi menjadi fragmen pahlawan lain secara acak", "Преобразование фрагментов в рандомные фрагменты других героев", "สุ่มแปลงเป็นชิ้นส่วนฮีโร่อื่น"],
    ['Transform', '转换', "Transformasi", "Изменение", "เปลี่ยน"],
    ['Max', '满级', "Level Maks.", "Полный уровень", "เลเวลเต็มแล้ว"],
    ['Yard', '码', "Kode", "Код", "หมายเลข"],
    ['Level', '关卡', "Stage", "Уровень ", "ด่าน"],
    ['Go To The Following Page To Get Rewards To Improve Your Combat Power, And It Will Be Easier To Pass The Level', '前往以下页面获取奖励提升战力，通关会更容易', "Pergi ke halaman berikut ini untuk mendapatkan hadiah yang meningkatkan kekuatan tempur, mempermudah menyelesaikan stage", "Перейди на следующую страницу, чтобы получить награды, которые повысят твою боевую мощь и позволят облегчить прохождение уровня", "ไปตามหน้าข้างล่าง รับรางวัลเพื่อเพิ่มพลังรบ ผ่านด่านยิ่งง่ายขึ้น"],
    ['Victory', '胜利', "Menang", "Победа", "ชนะ"],
    ['Lost', '输了', "Kalah", "Проигрыш", "แพ้แล้ว"],
    ['Coin', '金币', "Koin tidak cukup", "Золотые монеты", "โกลด์"],
    ['Mall', '商城', "Mal", "Магазин", "ร้านค้า"],
    ['Hero', '英雄', "Pahlawan", "Герой", "ฮีโร่"],
    ['Battle', '战 斗', "Pertarungan", "Бой", "ต่อสู้"],
    ['Pet', '宠物', "Peliharaan", "Питомец", "สัตว์เลี้ยง"],
    ['Map', '副本', "Dungeon", "Квест", "ดันเจี้ยน"],
    ['Sign In', '签到', "Absen", "Войти", "เช็คชื่อ"],
    ['Reach', '通关至', "Selesaikan stage hingga", "Пройти", "ผ่านด่านถึง"],
    ['Go', '前往', "Pergi", "Отправиться", "มุ่งไป"],
    ['Speed Up', '加速', "Percepat", "Ускориться", "เร่งความเร็ว"],
    ['Unlock Now', '现在解锁', "Buka sekarang", "Разблокировать сейчас", "ปลดล็อคตอนนี้"],
    ['Watch Ads To Unlock 2x Speed', '观看广告解锁2倍速度', "Tonton iklan untuk membuka 2x SPD", "Посмотри рекламу, чтобы разблокировать 2-кратную скорость", "ดูโฆษณาปลดล็อคระดับความเร็ว 2 เท่า"],
    ['Discover New Species,Please Be Prepared For Battle!', '发现新物种,请做好战斗准备!', "Temukan spesies baru, bersiap-siaplah bertarung!", "Найден новый вид, приготовься к бою!", "พบสิ่งมีชีวิตชนิดใหม่ โปรดเตรียมตัวต่อสู้!"],
    ['Warning', '警告', "Peringatan", "Предупреждение", "แจ้งเตือน"],
    ['Open To Hero Page', '跳转到英雄页面', "Lompat ke halaman pahlawan", "Перейди на страницу с героями", "ข้ามไปยังหน้าฮีโร่"],
    ['A New Hero Has Joined Your Team And Can Be Brought Into Battle On The Hero Page', '一名新的英雄加入了你的队伍，可以在英雄页面让其上阵', "Seorang pahlawan baru bergabung dengan timmu, dapat dimasukkan ke perang di halaman pahlawan", "Новый герой присоединяется к твоей команде и может вступить в бой на странице с героями", "มีฮีโร่ใหม่ 1 คนเข้าร่วมทีมของคุณ เลือกให้เขาออกรบได้จากในหน้าฮีโร่"],
    ['Attack', '攻击', "ATK", "Атака", "โจมตี"],
    ['May Get', '可能获得', "mungkin mendapatkan", "может получить", "มีแนวโน้มจะได้รับ"],
    ['Attack Speed', '攻击速度', "ATK SPD", "Скорость атаки", "ระดับความเร็วโจมตี"],
    ['Explosive Ability', '爆发力', "Kekuatan Burst", "Взрывная сила", "แรงระเบิด"],
    ['Range', '范围', "Jangkauan", "Дальность", "ขอบเขต"],
    ['Skill', '大招', "Skill super", "Сильнейшая атака", "ท่าไม้ตาย"],
    ['Rewards', '获得奖励', "Mendapatkan hadiah", "Полученные награды", "ได้รับรางวัล"],
    ['Cancel Skill', '取消技能', "Batalkan skill", "Отменить умение", "ยกเลิกสกิล"],
    ['Clear Raid Level', '扫荡关卡', "Selesaikan stage", "Уровень зачистки", "กวาดล้างด่าน"],
    ['You Must Clear This Raid Once To Enable This Function', '您必须先通关一次才能使用此功能', "Anda harus menyelesaikan stage ini 1x untuk dapat menggunakan fitur ini", "Для того чтобы воспользоваться этой функцией, нужно пройти уровень один раз", "คุณต้องผ่านด่าน 1 ครั้งถึงจะใช้ฟังก์ชั่นนี้ได้"],
    ['Resurrection', '复活次数', "Jumlah bangkit", "Количество воскрешений", "จำนวนครั้งฟื้นชีพ"],
    ['Clear Raid Immediately', '开启扫荡', "Selesaikan stage secepatnya", "Начало штурма", "เริ่มกวาดล้าง"],
    ['Premium Account', '至尊账号', "Akun premium", "Почетный аккаунт", "บัญชีระดับสูง"],
    ['+20% Offline Earnings', '离线奖励增加20%', "Hadiah Offline meningkat 20%", "Увеличение наград на 20% в режиме офлайн", "รางวัลออฟไลน์เพิ่ม 20%"],
    ['Remove 5 Video ADS/Day And All Interstitial ADS', '去除每日前5次视频广告和所有插屏广告', "Hapus 5 video iklan pertama dan iklan pengantara setiap harinya ", "Убери первые 5 ежедневных видеореклам и все промежуточные рекламы", "ลบ 5 วิดีโอโฆษณาแรกและโฆษณาแทรกของแต่ละวัน"],
    ['Start For Free', '免费试用', "Percobaan gratis", "Бесплатная пробная версия", "ลองใช้ฟรี"],
    ["<color=#794825>This is an </c><color=#f4c221>Auto-renewable</color><color=#794825> subscription. Subscription is renewed unless turned off at least 24-hours before the period ends; account will be charged for renewal as well.You can turn it off in your Account Settings.Any unused portion of a free trial period, if offered, will be forfeited.when the user purchases a subscription to that publication, where applicable.</c>", "<color=#794825>这是一个</c><color=#f4c221>自动更新</color><color=#794825>的订阅。如您未在订阅即将过期的 24 个小时前将其关闭，订阅将续订，帐户也将被收取续订费用。您可以随时在您的帐户设置中将其关闭。但与此同时，免费试用期的任何未使用部分（如果有的话）将被没收。当您使用本出版物的订阅时，则视为您同意接受。</c>", "<color=#794825>Ini adalah</c> langganan <color=#f4c221>perbaruan otomatis</color><color=#794825>. Langganan akan tetap diperbarui jika tidak dimatikan 24 jam sebelum periode berakhir dan akun Anda akan dikenakan biaya perbaruan. Anda dapat mematikannya di pengaturan akun Anda kapan saja, tetapi di saat yang sama, bagian yang tidak dipakai selama masa percobaan gratis (Jika ada) akan diambil. Ketika Anda menggunakan langganan publikasi ini, akan dianggap Anda setuju untuk menerimanya.</c>", "<color=#794825>Это подписка</c><color=#f4c221>с автоматическим</color><color=#794825>продлением. Если ты не отменишь подписку за 24 часа до истечения срока ее действия, подписка будет возобновлена, а с твоего счета будет снята плата за продление. Ты можешь отключить эту функцию в любое время в настройках своей учетной записи. Но при этом вся неиспользованная часть бесплатного пробного периода, если таковая имеется, будет аннулирована. Используя подписку на эту версию, ты соглашаешься с условиями подписки. </c>", "<color=#794825>นี้คือการ</c><color=#f4c221>สมัครต่ออายุใช้งานอัตโนมัติ</color><color=#794825>หากท่านไม่ปิดการสมัครต่ออายุใช้งานภายใน 24 ชั่วโมงก่อนที่จะหมอายุการใช้งาน การสมัครจะทำการรต่ออายุ และบัญชีจะถูกเรียกเก็บค่าใช้งาน ท่านสามารถปิดได้ตลอดจากหน้าตั้งค่าในบัญชีของท่าน แต่ในขณะเดียวกัน ส่วนที่ยังไม่ได้ใช้ไปในของช่วงทดลองใช้ฟรี（ถ้ามี）จะถูกยึดคืน เมื่อท่านใช้งานของการสมัครนี้ ถือว่าท่านยินยอมที่จะยอมรับ</c>"],
    ['Privacy Policy and Terms of Use', '隐私政策和使用条款', "Kebijakan privasi dan ketentuan penggunaan", "Политика конфиденциальности и пользовательское соглашение", "นโยบายความเป็นส่วนตัวและเงื่อนไขการใช้งาน"],
    ['3 Day Free Trial,Then ', '3天免费试用,然后 ', "3 hari percobaan gratis, kemudian", "3 дня бесплатной пробной версии, а затем ", "ทดลองใช้ฟรี 3 วัน แล้วก็"],
    ['Week', '周', "Minggu", "Неделя", "สัปดาห์"],
    ['Month', '月', "Bulan", "Месяц", "เดือน"],
    ['Year', '年', "Tahun", "Год", "ปี"],
    ['Loading...', '加载中...', "Sedang memuat…", "Идет загрузка...", "กำลังโหลด..."],
    ['Dear VIP,You got rewards without watching ads.', '尊敬的VIP，您不看广告也有奖励。', "VIP yang terhormat, Anda juga mendapatkan hadiah tanpa menonton iklan.", "в качестве уважаемого VIP, ты также получаешь вознаграждение даже за то, что не смотришь рекламу.", "VIP ที่เคารพ ถึงคุณไม่ดูโฆษณา ก็ยังได้รับรางวัล"],
    ['This Challenge Can Be Resurrected', '本次挑战可以复活', "Dapat bangkit di tantangan kali ini", "Этот бой можно начать заново", "ท้าสู้ครั้งนี้สามารถคืนชีพได้"],
    ['Repair The Walls', '修复城墙', "Perbaiki dinding", "Восстановить городские стены", "ซ่อมกำแพงเมือง"],
    ['Defeat', '失败', "Gagal", "Поражение", "ล้มเหลว"],
    ['Completed', '已完成', "Sudah selesai", "Завершено", "สำเร็จแล้ว"],
    ['Replay', '重新挑战', "Ulang Pertempuran", "Повторный бой", "ท้าทายใหม่"],
    ['Hero Damage Stats', '英雄伤害统计', "Statistik DMG Hero", "Статистика урона героев", "สถิติความเสียหายของฮีโร่"],
    ['Show Damage', '显示伤害', "Tampilkan DMG", "Показать урон", "แสดงความเสียหาย"],
    ['Welcome Back!', '欢迎回来!', "Selamat datang kembali!", "С возвращением", "ยินดีต้อนรับ"],
    ['You were idle for', '你挂机了', "Kamu sudah AFK!", "У вас в авторежиме", "คุณAIเเล้ว"],
    ['Max Reward:', '最大奖励:', "Hadiah Tertinggi", "Максимальное награда", "รางวัลใหญ่สุด"],
    ['You have collected:', '你已经收集了:', "Kamu sudah mengumpulkan:", "Вы собрали", "คุณเก็บสะสมเเล้ว"],
    ['IDLE REWARD', '挂机奖励', "挂机奖励", "Hadiah AFK", "Награда авторежима", "รางวัลAI"],
    ['Choose to acquire 2 skills', '选择获得2个技能', "Silakan pilih 2 skill yang didapatkan", "Выберите приобретение 2 умения", "เลือกรับ 2 สกิล"],
    ['Refresh Skills', '刷新技能', "Refresh Skill", "Обновить умения", "รีเฟรชสกิล"],
    ['Unlock All Skill Slots', '解锁所有技能槽', "Buka semua slot skill", "Разблокировать все слоты умений", "ปลดล็อคช่องสกิลทั้งหมด"],
    ['Not enough slots. Unlock new skill slots?', '技能已满，是否解锁新的技能槽？', "Skill sudah penuh, apakah ingin membuka slot skill yang baru?", "Умение уже заполнено, разблокировать новый слот умения?", "สกิลเต็มแล้ว ปลดล็อกช่องสกิลใหม่หรือไม่?"],
    ['Not enough slots', '技能已经满了', "Skill sudah penuh", "Умение уже заполнено", "สกิลเต็มแล้ว"],
    ['Skill Obtained', '获得的技能', "Skill yang didapatkan", "Получить умение", "สกิลที่ได้รับ"],
    ['Traveler', '游客', "Tamu", "Гость", "ผู้เข้าชม"],
    ['Team full', '队伍已经满员了', "Tim sudah penuh", "Команда уже заполнена", "สมาชิกของทีมเต็มแล้ว"],
    ['This Hero unlocks at', '该英雄解锁于', "Hero ini sudah terbuka", "Этот герой разблокируется на", "ฮีโร่นี้ปลดล็อก"],
    ['Deployed Team', '出战队伍', "Tim yang bertempur", "Команда для сражения", "ทีมออกรบ"],
    ['Drag the Avatar Frame to change position', '拖动头像更改站位', "Seret Avatar untuk mengganti posisi", "Перетащи аватар, чтобы изменить положение", "ลากรูปโปรไฟล์เพื่อเปลี่ยนตำแหน่ง"],
    ['Tap the Hero to join the team', '点击英雄加入队伍', "Klik Hero untuk memasukkannya ke dalam tim", "Нажми на героя, чтобы добавить его в состав команды", "กดฮีโร่เข้าร่วมทีม"],
    ['Last Level', '上一关', "Babak Sebelumnya", "Предыдущий уровень", "ด่านก่อนหน้า"],
    ['Next Level', '下一关', "Babak Selanjutnya", "Следующий уровень", "ด่านถัดไป"],
    ['Enemy Lineup', '敌方阵容', "Formasi Musuh", "Команда противника", "ทัพฝ่ายศัตรู"],
    ['Chapter', '章节', "Bab", "Главы", "บท"],
    ['Active Skill', '主动技能', "Skill Otomatis", "Активное умение", "สกิลรุก"],
    ['Attack Effect', '攻击特性', "Karateristik Serangan", "Характеристики атаки", "ลักษณะเฉพาะโจมตี"],
    ['Can attack land units', '可以攻击陆地单位', "Bisa Menyerang Unit Darat", "Можно атаковать сухопутные подразделения", "สามารถโจมตีหน่วยพื้นดิน"],
    ['Can attack airborne units', '可以攻击天空单位', "Bisa Menyerang Unit Udara", "Можно атаковать воздушные подразделения", "สามารถโจมตีหน่วยท้องฟ้า"],
    ['Can attack underground units', '可以攻击遁地单位', "Bisa Menyerang Unit Bawah Tanah", "Можно атаковать подземные подразделения", "สามารถโจมตีหน่วยมุดดิน"],
    ['Remaining', '剩余', "Sisa", "Остаток", "คงเหลือ"],
    ['Waiting', '等待中', "Sedang Menunggu", "Ожидание", "รอสักครู่"],
    ['Sold out', '售罄', "Habis Terjual", "Нет в наличии", "ขายหมดแล้ว"],
    ['Level Up', '升级', "Naik tingkat", "Уровень повышен", "ยกระดับ"],
    ["Maximum MP:", '最大MP:', "MP maksimum:", "Максимум МП:", "MP สูงสุด:"],
    ["MP Recovery:", 'MP回复:', "Pemulihan MP:", "Восстановление MP:", "การกู้คืน MP:"],
    ["Unlock new levels after complete campaign stage ", '可以解锁新的等级当通关 ', "Buka kunci level baru setelah menyelesaikan tahap kampanye", "Разблокируйте новые уровни после завершения этапа кампании", "ปลดล็อกด่านใหม่หลังจากผ่านด่านแคมเปญ"],
    ["Unlock:", '解锁:', "Membuka kunci:", "Разблокировать:", "ปลดล็อค:"],
    ["Equipment", '装备', "Peralatan", "Оборудование", "อุปกรณ์"],
    ["Castle", '城堡', "Kastil", "замок", "ปราสาท"],
    ["Talent", '天赋', "Bakat", "Талант", "ความสามารถพิเศษ"],
    ["Not Open", '未开放', "Tidak buka", "Не открыто", "ไม่เปิด"],
    ["Unload", '脱下', "Membongkar", "Разгрузить", "ยกเลิกการโหลด"],
    ["Merge", '合成', "Menggabungkan", "Объединить", "ผสาน"],
    ["Unequip All", '一键卸下', "Tidak Melengkapi Semua", "Снять все", "ถอดทั้งหมด"],
    ["Auto Equip", '一键穿戴', "Perlengkapan Otomatis", "Автоматическое оснащение", "อุปกรณ์ตกแต่งรถยนต์"],
    ["Info", '信息', "ข้อมูล", "Информация", "ข้อมูล"],
    ["Gears", '装备', "roda gigi", "Шестерни", "เกียร์"],
    ["Promote", '升星', "Memajukan", "Продвигать", "ส่งเสริม"],
    ["Evolve", '升阶', "Berkembang", "Эволюционировать", "วิวัฒนาการ"],
    ["The hero has not yet obtained", '该英雄尚未获得', "Pahlawan belum diperoleh", "Герой еще не получил", "ฮีโร่ยังไม่ได้รับ"],
    ["First Reward", '首次奖励', "Hadiah Pertama", "Первая награда", "รางวัลแรก"],
    ["Idle Times", '闲置时间', "Waktu Menganggur", "Время простоя", "เวลาว่าง"],
    ["You can claim rewards after idle for at least 1 hour", "空闲至少1小时即可领取奖励 ", "Anda dapat mengklaim hadiah setelah menganggur setidaknya selama 1 jam", "Вы можете претендовать на награды после бездействия в течение как минимум 1 часа", "คุณสามารถรับรางวัลหลังจากไม่ได้ใช้งานเป็นเวลาอย่างน้อย 1 ชั่วโมง"],
    ["City", "主城", "Kota", "Город", "เมือง"],
    ["Insufficient MP", "MP不足", "MP tidak mencukupi", "Недостаточно МП", "MP .ไม่เพียงพอ"],
    ["Improve combat power", "提升战力", "Tingkatkan kekuatan tempur", "Улучшить боевую мощь", "ปรับปรุงพลังการต่อสู้"],
    ["Function Unlock", '功能解锁', "Fungsi Buka Kunci", "Разблокировка функций", "ปลดล็อกฟังก์ชัน"],
    ["Free 3 times claim", "免费3倍领取", "Gratis 3 kali klaim", "Бесплатная 3-кратная претензия", "รับสิทธิ์ฟรี 3 ครั้ง"],
    ["The ad failed to play and the reward cannot be obtained", "广告播放失败，无法获得奖励", "Iklan gagal diputar dan hadiah tidak dapat diperoleh", "Не удалось воспроизвести рекламу, и награда не может быть получена", "โฆษณาล้มเหลวในการเล่นและไม่สามารถรับรางวัลได้"],
    ["ldle Talent Points:", "闲置天赋点：", "Poin Bakat menganggur:", "свободные очки талантов:", "คะแนนความสามารถที่ไม่ได้ใช้งาน:"],
    ["Next Talent Point in:", "下一个天赋点：", "Poin Bakat Berikutnya di:", "Следующее очко таланта через:", "จุดความสามารถต่อไปใน:"],
    ["Faster", '快速', "Lebih cepat", "Быстрее", "เร็วขึ้น"],
    ["Player Level", "玩家等级", "Tingkat Pemain", "Уровень игрока", "ระดับผู้เล่น"],
    ["Function Forecast", "功能预告", "Prakiraan Fungsi", "Прогноз функции", "ฟังก์ชั่นพยากรณ์"],
    ["Close", "关闭", "Menutup", "Закрывать", "ปิด I"],
    ["Use", "使用", "Menggunakan", "Использовать", "ใช้"],
    ["Uses Remaining Today: ", "今日剩余使用次数: ", "Penggunaan yang Tersisa Hari Ini:", "Использование, оставшееся сегодня: ", "ใช้ที่เหลืออยู่วันนี้: "],
    ["Resets In: ", "重置倒计时：", "Setel Ulang Dalam: ", "Сброс через: ", "รีเซ็ตใน: "],
    ["Extra +50 gems", "额外+50钻石", "Ekstra +50 permata", "Дополнительные +50 драгоценных камней", "พิเศษ +50 อัญมณี"],
    ["Faster Rewards", "快速奖励", "Hadiah Lebih Cepat", "Более быстрые награды", "รางวัลที่เร็วขึ้น"],
    ["Get VIP", "获取VIP", "Dapatkan VIP", "Получить VIP", "รับวีไอพี"],
    ["Endless Challenges", "无尽挑战", "Tantangan tak berujung", "Бесконечные испытания", "ความท้าทายที่ไม่มีที่สิ้นสุด"],
    ['Play', '开始', "Bermain", "Играть", "เล่น"],
    ['Normal', '普通', "Normal", "Нормальный", "ปกติ"],
    ['Hard', '困难', "Keras", "Жесткий", "แข็ง"],
    ['Boss Hunting', 'Boss狩猎', "berburu bos", "Охота на боссов", "ล่าบอส"],
    ['Tower of Trial', '试炼之塔', "Menara Percobaan", "Башня Испытаний", "หอคอยแห่งการพิจารณาคดี"],
    ['Unlock After：', '解锁于：', "Buka Kunci Setelah", "Разблокировать после", "ปลดล็อคหลัง"],
    ['Buy Challenge Tickets', '购买挑战券', "Beli Tiket Tantangan", "Купить билеты на вызов", "ซื้อบัตรท้าทาย"],
    ['Number of times today:', "今天可用:", "Berapa kali hari ini:", "Сколько раз сегодня:", "จำนวนครั้งในวันนี้:"],
    ["RemainingToday:", "今天剩余:", "Sisa Hari Ini:", "Осталось сегодня:", "เหลือวันนี้:"],
    ['Cancel', '取消', "Membatalkan", "Отмена", "ยกเลิก"],
    ["You won't get any rewards for quitting halfway through. Are you sure you want to give up the challenge?", '中途退出不会获得任何奖励，确定要放弃挑战吗？', "Anda tidak akan mendapatkan imbalan apa pun karena berhenti di tengah jalan. Apakah Anda yakin ingin melepaskan tantangan?", "Вы не получите никаких наград за выход из игры на полпути. Вы уверены, что хотите сдаться?", "คุณจะไม่ได้รับรางวัลใด ๆ สำหรับการลาออกครึ่งทาง คุณแน่ใจหรือไม่ว่าต้องการยกเลิกคำท้านี้"],
    ["Season End In:", "赛季结束时间:", "Musim Berakhir Dalam:", "Окончание сезона через:", "สิ้นสุดฤดูกาลใน:"],
    ["Highest Stage: ", "最高关卡:", "Tahap Tertinggi:", "Высшая стадия:", "เวทีสูงสุด:"],
    ["My Rank", "我的排名", "Peringkat saya", "Мой ранг", "อันดับของฉัน"],
    ["Rewards last week", "上周的奖励", "Hadiah minggu lalu", "Награды прошлой недели", "ของรางวัลอาทิตย์ที่แล้ว"],
    ["Boss Coming!!", "Boss来袭!!", "bos datang!!", "Босс идет!!", "บอสมา!!"],
    ["No reward", "无奖励", "Tidak ada imbalan", "Без вознаграждения", "ไม่มีรางวัล"],
    ["Rules Description", "规则说明", "Deskripsi Aturan", "Описание правил", "กฎ คำอธิบาย"],
    ["Click anywhere to close the popup", "点击任意位置关闭弹窗", "Klik di mana saja untuk menutup popup", "Щелкните в любом месте, чтобы закрыть всплывающее окно", "คลิกที่ใดก็ได้เพื่อปิดป๊อปอัป"],
    ["Formation", "编队", "Pembentukan", "Формирование", "รูปแบบ"],
    ["Time-limited rewards", "限时奖励", "Hadiah terbatas waktu", "Ограниченные по времени награды", "รางวัลจำกัดเวลา"],
    ["Player Lv.", "Player Lv.", "Player Lv.", "Player Lv.", "Player Lv."],
    ["The number of purchases in the store is refreshed every day~", "商店购买次数每日刷新哦~", "Jumlah pembelian di toko diperbarui setiap hari~", "Количество покупок в магазине обновляется каждый день~", "จำนวนการซื้อสินค้าในร้านจะรีเฟรชทุกวัน~"],
    ["Collect", "收集", "Mengumpulkan", "Собирать", "เก็บรวบรวม"],
    ["Free Gems", "免费钻石", "Permata Gratis", "Бесплатные драгоценные камни", "อัญมณีฟรี"],
    ["Refresh Time:", "刷新时间:", "Waktu Penyegaran:", "Время обновления:", "เวลารีเฟรช:"],
    ["Deluxe Chest", "豪华宝箱", "Dada Deluxe", "Делюкс сундук", "หีบดีลักซ์"],
    ["Super Deluxe Chest", "超级豪华宝箱", "Dada Super Deluxe", "Сундук Супер Делюкс", "หีบซุปเปอร์ดีลักซ์"],
    ["Tap here to view chance", "点击此处查看爆率", "Нажмите здесь, чтобы просмотреть шанс", "Нажмите здесь, чтобы просмотреть шанс", "แตะที่นี่เพื่อดูโอกาส"],
    ["Chest Details", "宝箱详情", "Detail Dada", "Детали сундука", "รายละเอียดหน้าอก"],
    ["Gear Chest", "装备箱", "peti gigi", "Сундук с снаряжением", "กล่องเกียร์"],
    ["Super Gear Chest", "超级装备箱", "Peti Super Gear", "Сундук с супер снаряжением", "หีบซุปเปอร์เกียร์"],
    ["Blue:", "蓝色：", "Biru:", "Синий:", "สีน้ำเงิน:"],
    ["Elite:", "精英：", "Elite:", "Элита:", "ผู้ลากมากดี:"],
    ["Legendary:", "传奇：", "Legendaris:", "Легендарный:", "ตำนาน:"],
    ["Mythic:", "神话：", "mitos:", "Эпохальный:", "เทพนิยาย:"],
    ["Bonus", "返利", "Bonus", "Бонус", "โบนัส"],
    ['Campaign Investment', '通关返利', "Investasi Kampanye", "Инвестиции в кампанию", "แคมเปญการลงทุน"],
    ['Growth Investment', '升级返利', "Investasi Pertumbuhan", "Инвестиции в рост", "การลงทุนเพื่อการเติบโต"],
    ['Tips', '小贴士', "Tips", "Чаевые", "เคล็ดลับ"],
    ['Accumulate to Claim Rewards', '累积领取奖励', "Akumulasi untuk Klaim Hadiah", "Накопить, чтобы получить вознаграждение", "สะสมเพื่อรับรางวัล"],
    ['Value', '超值', "Nilai", "Стоимость", "คุ้ม"],
    ['Best Value', '最划算', "Nilai terbaik", "Лучшее соотношение", "คุ้มค่าที่สุด"],
    ['Sale', "折扣", "Diskon", "Скидка", "การลดราคา"],
    ["limit", "限购", "membatasi", "ограничение", "ขีดจำกัด"],
    ["Special", "自选", "Spesial", "Специальный", "พิเศษ"],
    ["Hot Deals", "热卖", "Penawaran Panas", "Горячие предложения", "ดีลสุดฮอต"],
    ["Daily", "日常", "Harian", "Повседневная", "รายวัน"],
    ["Select Your Wanted Gifts", "选择您想要的礼物", "Pilih Hadiah yang Anda Inginkan", "Выберите желаемые подарки", "เลือกของขวัญที่คุณต้องการ"],
    ["Battle Pass", "战令", "pas pertempuran", "боевой пропуск", "แบทเทิลพาส"],
    ["Continue Claim", "继续领取", "lanjutkan klaim", "продолжить претензию", "เรียกร้องต่อไป"],
    ['Day', "天", "hari", "день", "วัน"],
    ["Buy gift packs to get", "购买礼包可以获得", "Beli paket hadiah untuk mendapatkan", "Покупайте подарочные пакеты, чтобы получить", "ซื้อชุดของขวัญเพื่อรับ"],
    ["End In", "结束于", "Akhiri", "Конец в", "สิ้นสุดใน"],
    ["Statistics", "数据统计", "Statistik", "Статистика", "สถิติ"],
    ["Hero Damage", "英雄伤害", "Kerusakan Pahlawan", "Урон героя", "ฮีโร่ดาเมจ"],
    ["Pet Damage", "宠物伤害", "Kerusakan Hewan Peliharaan", "Повреждение питомца", "ความเสียหายของสัตว์เลี้ยง"],
    ["Basic Attack Damage", "普攻伤害", "Kerusakan Serangan Dasar", "Урон от базовой атаки", "พลังโจมตีพื้นฐาน"],
    ["Skill Damage", "技能伤害", "Kerusakan Keterampilan", "Урон навыка", "สกิลดาเมจ"],
    ["You can increase your strength by", "您可以通过以下方式提升实力", "Anda dapat meningkatkan kekuatan Anda dengan", "Вы можете увеличить свою силу", "คุณสามารถเพิ่มความแข็งแกร่งของคุณโดย"],
    ["Upgrade hero", "升级英雄", "Tingkatkan pahlawan", "Улучшить героя", "อัพเกรดฮีโร่"],
    ["Raise pets", "培养宠物", "Angkat hewan peliharaan", "Поднимите домашних животных", "เลี้ยงสัตว์เลี้ยง"],
    ["Cumulative check-in days", "累计签到天数", "Kumulatif hari check-in", "Совокупное количество дней регистрации", "จำนวนวันเช็คอินสะสม"],
    ["Cumulative check-in", "累计签到", "Kumulatif check-in", "Совокупная регистрация", "เช็คอินสะสม"],
    ["Additional rewards available", "可领取额外奖励", "Hadiah tambahan tersedia", "Доступны дополнительные награды", "มีรางวัลเพิ่มเติมให้"],
    ["Choose", "选择", "Memilih", "Выбирать", "เลือก"],
    ["Buy", "购买", "Membeli", "Купить", "ซื้อ",],
    ["Capacity: ", "容量：", "kapasitas: ", "вместимость: ", "ความจุ: "],
    ["All", "全部", "semua", "все", "ทั้งหมด"],
    ["Prop", "道具", "Menopang", "Проп", "ข้อต่อ"],
    ["The current HP of the city wall", "城墙当前HP", "HP tembok kota saat ini", "Текущий HP городской стены", "HP ปัจจุบันของกำแพงเมือง"],
];
var SpriteIndex;
(function (SpriteIndex) {
    SpriteIndex[SpriteIndex["NULL"] = 0] = "NULL";
    SpriteIndex[SpriteIndex["TY_logo_"] = 1] = "TY_logo_";
})(SpriteIndex = exports.SpriteIndex || (exports.SpriteIndex = {}));
exports.AllLanSpriteFrame = [
    ['', '', "", "", ""],
    ['TY_logo_en', 'TY_logo_cn', "", "", ""],
];

cc._RF.pop();