"use strict";
cc._RF.push(module, '6e135WtNTtBWpmX9H47RE/X', 'UIConfig');
// Scripts/UI/UIConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePreLoad = exports.HomePreLoad = exports.EffectPath = exports.UI_ZIndex = exports.UILayerLevel = exports.UIPath = void 0;
/**UI预制体的路径 */
var UIPath;
(function (UIPath) {
    UIPath["Null"] = "";
    UIPath["SignIn"] = "signIn/sign_ui";
    UIPath["SignInDaily"] = "signIn/sign_daily_ui";
    UIPath["SignInGet"] = "signIn/sign_get_tip";
    UIPath["SignInBuy"] = "signIn/sign_in_buy_ui";
    UIPath["Bag"] = "bag/bag_ui";
    UIPath["ExclusiveStrengthening"] = "exclusive/exclusive_weapons_strengthening_ui";
    UIPath["Exclusive"] = "exclusive/exclusive_weapons_ui";
    UIPath["Set"] = "set/setting_ui";
    UIPath["AvatarRoot"] = "set/avatarRoot";
    UIPath["EquipSynthetic"] = "equipment/equip_synthetic_ui";
    UIPath["Mall"] = "mall/gold_mall_ui";
    UIPath["TakeEgg"] = "takeEgg/take_egg_ui";
    UIPath["Wishing"] = "wishing/wishing_ui";
    UIPath["WishingTips"] = "wishing/wishing_tip_ui";
    UIPath["Task"] = "task/task_ui";
    UIPath["ToPlay"] = "toPlay/to_play_main_ui";
    UIPath["TowerFightting"] = "tower/tower_fighting_ui";
    UIPath["Tower"] = "tower_ui";
    UIPath["FastGuaJi"] = "guaji/fast_guaji_ui";
    UIPath["Guaji"] = "guaji/guaji_ui";
    UIPath["UserLevel"] = "userLevel/user_level_ui";
    UIPath["Attribute"] = "heros/attribute_ui";
    UIPath["HeroSkill"] = "heros/hero_skill_ui";
    UIPath["HeroGrowth"] = "heros/hero_ui";
    UIPath["StoreHeroUi"] = "store/store_hero_ui";
    UIPath["StoreHeroShowUi"] = "store/store_hero_show_ui";
    UIPath["GameWin"] = "ui/game/game_win";
    UIPath["ProbabilityTipUi"] = "store/probability_tip_ui";
    UIPath["FirstCharge"] = "payment/pay_first_charge_ui";
    UIPath["GetAssetsTip"] = "get_assets_ui";
    UIPath["Dialog"] = "dialog";
    UIPath["CoinPop"] = "CoinPop";
    UIPath["Turntable"] = "Turntable/Turntable";
    UIPath["RankingList"] = "RankingList/RankingList";
    UIPath["BuyBattlePotion"] = "ui/game/buy_battle_potion";
    UIPath["VipSystem"] = "vipsystem/VipSystem";
    UIPath["VndlessChallenges"] = "copy/endlesschallenges/endlesschallenges";
    UIPath["PlayinsTructions"] = "copy/endlesschallenges/playinstructions";
    UIPath["RewardDisplay"] = "copy/endlesschallenges/rewarddisplay";
    UIPath["AccumulatedRecharge"] = "accumulatedRecharge/accumulated_recharge_ui";
    UIPath["RankingRewardDisplay"] = "copy/endlesschallenges/rankingrewarddisplay";
    UIPath["PurchasesNumbe"] = "copy/endlesschallenges/purchasesnumbe";
    UIPath["MoppingUp"] = "copy/endlesschallenges/MoppingUp";
    UIPath["MoppingVoid"] = "copy/endlesschallenges/MoppingVoid";
    UIPath["PetList"] = "pet/ui/pet_exchange_ui";
    UIPath["BuffDisplay"] = "copy/endlesschallenges/BuffDisplay";
    UIPath["Shop"] = "copy/endlesschallenges/Shop";
    UIPath["VoidScene"] = "copy/endlesschallenges/VoidScene";
    UIPath["Windfall"] = "copy/endlesschallenges/Windfall";
    UIPath["BattlePop"] = "copy/endlesschallenges/BattlePop";
    UIPath["PetInfo"] = "pet/ui/pet_info_ui";
    UIPath["WeekCard"] = "weekCard/week_card_ui";
    UIPath["ExclusiveInfoUi"] = "exclusive/exclusive_info_ui";
    UIPath["EquipInfo"] = "equipment/equip_info_ui";
    /**教程奖励SS角色的UI */
    UIPath["RewardSSUI"] = "tutorials/reward_ss_ui";
})(UIPath = exports.UIPath || (exports.UIPath = {}));
/**UI节点的层级 */
var UILayerLevel;
(function (UILayerLevel) {
    UILayerLevel[UILayerLevel["One"] = 1] = "One";
    UILayerLevel[UILayerLevel["Two"] = 2] = "Two";
    UILayerLevel[UILayerLevel["Three"] = 3] = "Three";
    UILayerLevel[UILayerLevel["Four"] = 4] = "Four";
})(UILayerLevel = exports.UILayerLevel || (exports.UILayerLevel = {}));
var UI_ZIndex;
(function (UI_ZIndex) {
    UI_ZIndex[UI_ZIndex["Normal"] = 0] = "Normal";
    UI_ZIndex[UI_ZIndex["Loading"] = 9997] = "Loading";
    UI_ZIndex[UI_ZIndex["UiTouch"] = 9998] = "UiTouch";
    UI_ZIndex[UI_ZIndex["Front"] = 9999] = "Front";
})(UI_ZIndex = exports.UI_ZIndex || (exports.UI_ZIndex = {}));
var EffectPath;
(function (EffectPath) {
    EffectPath["HeroUpgrade0"] = "effects/home/role_upgrade/role_upgrade_0";
    EffectPath["HeroUpgrade1"] = "effects/home/role_upgrade/role_upgrade_1";
})(EffectPath = exports.EffectPath || (exports.EffectPath = {}));
// home场景预加载预制体
exports.HomePreLoad = [
    UIPath.ToPlay,
    UIPath.HeroGrowth,
    EffectPath.HeroUpgrade0,
    UIPath.VoidScene
];
exports.GamePreLoad = [
    UIPath.CoinPop
];

cc._RF.pop();