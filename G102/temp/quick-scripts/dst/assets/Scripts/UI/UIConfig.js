
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/UIConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXFVJQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGNBQWM7QUFDZCxJQUFZLE1BNEVYO0FBNUVELFdBQVksTUFBTTtJQUNkLG1CQUFPLENBQUE7SUFDUCxtQ0FBeUIsQ0FBQTtJQUN6Qiw4Q0FBb0MsQ0FBQTtJQUNwQywyQ0FBZ0MsQ0FBQTtJQUNoQyw2Q0FBa0MsQ0FBQTtJQUNsQyw0QkFBa0IsQ0FBQTtJQUNsQixpRkFBdUUsQ0FBQTtJQUN2RSxzREFBNEMsQ0FBQTtJQUM1QyxnQ0FBc0IsQ0FBQTtJQUN0Qix1Q0FBNkIsQ0FBQTtJQUM3Qix5REFBK0MsQ0FBQTtJQUMvQyxvQ0FBMEIsQ0FBQTtJQUMxQix5Q0FBK0IsQ0FBQTtJQUMvQix3Q0FBOEIsQ0FBQTtJQUM5QixnREFBc0MsQ0FBQTtJQUN0QywrQkFBcUIsQ0FBQTtJQUNyQiwyQ0FBaUMsQ0FBQTtJQUNqQyxvREFBMEMsQ0FBQTtJQUMxQyw0QkFBa0IsQ0FBQTtJQUNsQiwyQ0FBaUMsQ0FBQTtJQUNqQyxrQ0FBd0IsQ0FBQTtJQUN4QiwrQ0FBcUMsQ0FBQTtJQUNyQywwQ0FBZ0MsQ0FBQTtJQUNoQywyQ0FBaUMsQ0FBQTtJQUNqQyxzQ0FBNEIsQ0FBQTtJQUM1Qiw2Q0FBbUMsQ0FBQTtJQUNuQyxzREFBNEMsQ0FBQTtJQUM1QyxzQ0FBNEIsQ0FBQTtJQUM1Qix1REFBNkMsQ0FBQTtJQUM3QyxxREFBeUMsQ0FBQTtJQUN6Qyx3Q0FBNEIsQ0FBQTtJQUM1QiwyQkFBZSxDQUFBO0lBRWYsNkJBQW1CLENBQUE7SUFFbkIsMkNBQStCLENBQUE7SUFFL0IsaURBQXFDLENBQUE7SUFFckMsdURBQTJDLENBQUE7SUFFM0MsMkNBQStCLENBQUE7SUFFL0Isd0VBQThELENBQUE7SUFDOUQsc0VBQTRELENBQUE7SUFDNUQsZ0VBQXNELENBQUE7SUFDdEQsNkVBQW1FLENBQUE7SUFFbkUsOEVBQW9FLENBQUE7SUFDcEUsa0VBQXdELENBQUE7SUFFeEQsd0RBQThDLENBQUE7SUFFOUMsNERBQWtELENBQUE7SUFFbEQsNENBQWtDLENBQUE7SUFFbEMsNERBQWtELENBQUE7SUFFbEQsOENBQW9DLENBQUE7SUFFcEMsd0RBQThDLENBQUE7SUFFOUMsc0RBQTRDLENBQUE7SUFFNUMsd0RBQThDLENBQUE7SUFFOUMsd0NBQThCLENBQUE7SUFFOUIsNENBQWtDLENBQUE7SUFFbEMseURBQStDLENBQUE7SUFDL0MsK0NBQXFDLENBQUE7SUFDckMsaUJBQWlCO0lBQ2pCLCtDQUFtQyxDQUFBO0FBQ3ZDLENBQUMsRUE1RVcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBNEVqQjtBQUNELGFBQWE7QUFDYixJQUFZLFlBS1g7QUFMRCxXQUFZLFlBQVk7SUFDcEIsNkNBQUssQ0FBQTtJQUNMLDZDQUFLLENBQUE7SUFDTCxpREFBTyxDQUFBO0lBQ1AsK0NBQU0sQ0FBQTtBQUNWLENBQUMsRUFMVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUt2QjtBQUVELElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNqQiw2Q0FBUSxDQUFBO0lBRVIsa0RBQVksQ0FBQTtJQUNaLGtEQUFZLENBQUE7SUFDWiw4Q0FBVSxDQUFBO0FBQ2QsQ0FBQyxFQU5XLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBTXBCO0FBRUQsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLHVFQUF5RCxDQUFBO0lBQ3pELHVFQUF5RCxDQUFBO0FBRTdELENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUNELGVBQWU7QUFDRixRQUFBLFdBQVcsR0FBVTtJQUM5QixNQUFNLENBQUMsTUFBTTtJQUNiLE1BQU0sQ0FBQyxVQUFVO0lBQ2pCLFVBQVUsQ0FBQyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxTQUFTO0NBQ25CLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBVTtJQUM5QixNQUFNLENBQUMsT0FBTztDQUNqQixDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qKlVJ6aKE5Yi25L2T55qE6Lev5b6EICovXHJcbmV4cG9ydCBlbnVtIFVJUGF0aHtcclxuICAgIE51bGw9JycsXHJcbiAgICBTaWduSW4gPSAnc2lnbkluL3NpZ25fdWknLFxyXG4gICAgU2lnbkluRGFpbHkgPSAnc2lnbkluL3NpZ25fZGFpbHlfdWknLFxyXG4gICAgU2lnbkluR2V0PSAnc2lnbkluL3NpZ25fZ2V0X3RpcCcsXHJcbiAgICBTaWduSW5CdXk9ICdzaWduSW4vc2lnbl9pbl9idXlfdWknLFxyXG4gICAgQmFnID0gJ2JhZy9iYWdfdWknLFxyXG4gICAgRXhjbHVzaXZlU3RyZW5ndGhlbmluZyA9ICdleGNsdXNpdmUvZXhjbHVzaXZlX3dlYXBvbnNfc3RyZW5ndGhlbmluZ191aScsXHJcbiAgICBFeGNsdXNpdmUgPSAnZXhjbHVzaXZlL2V4Y2x1c2l2ZV93ZWFwb25zX3VpJyxcclxuICAgIFNldCA9ICdzZXQvc2V0dGluZ191aScsXHJcbiAgICBBdmF0YXJSb290ID0gJ3NldC9hdmF0YXJSb290JyxcclxuICAgIEVxdWlwU3ludGhldGljID0gJ2VxdWlwbWVudC9lcXVpcF9zeW50aGV0aWNfdWknLFxyXG4gICAgTWFsbCA9ICdtYWxsL2dvbGRfbWFsbF91aScsXHJcbiAgICBUYWtlRWdnID0gJ3Rha2VFZ2cvdGFrZV9lZ2dfdWknLFxyXG4gICAgV2lzaGluZyA9ICd3aXNoaW5nL3dpc2hpbmdfdWknLFxyXG4gICAgV2lzaGluZ1RpcHMgPSAnd2lzaGluZy93aXNoaW5nX3RpcF91aScsXHJcbiAgICBUYXNrID0gJ3Rhc2svdGFza191aScsXHJcbiAgICBUb1BsYXkgPSAndG9QbGF5L3RvX3BsYXlfbWFpbl91aScsXHJcbiAgICBUb3dlckZpZ2h0dGluZyA9ICd0b3dlci90b3dlcl9maWdodGluZ191aScsXHJcbiAgICBUb3dlciA9ICd0b3dlcl91aScsXHJcbiAgICBGYXN0R3VhSmkgPSAnZ3VhamkvZmFzdF9ndWFqaV91aScsXHJcbiAgICBHdWFqaSA9ICdndWFqaS9ndWFqaV91aScsXHJcbiAgICBVc2VyTGV2ZWwgPSAndXNlckxldmVsL3VzZXJfbGV2ZWxfdWknLFxyXG4gICAgQXR0cmlidXRlID0gJ2hlcm9zL2F0dHJpYnV0ZV91aScsXHJcbiAgICBIZXJvU2tpbGwgPSAnaGVyb3MvaGVyb19za2lsbF91aScsXHJcbiAgICBIZXJvR3Jvd3RoID0gJ2hlcm9zL2hlcm9fdWknLFxyXG4gICAgU3RvcmVIZXJvVWkgPSAnc3RvcmUvc3RvcmVfaGVyb191aScsXHJcbiAgICBTdG9yZUhlcm9TaG93VWkgPSAnc3RvcmUvc3RvcmVfaGVyb19zaG93X3VpJyxcclxuICAgIEdhbWVXaW4gPSAndWkvZ2FtZS9nYW1lX3dpbicsXHJcbiAgICBQcm9iYWJpbGl0eVRpcFVpID0gJ3N0b3JlL3Byb2JhYmlsaXR5X3RpcF91aScsXHJcbiAgICBGaXJzdENoYXJnZT0ncGF5bWVudC9wYXlfZmlyc3RfY2hhcmdlX3VpJyxcclxuICAgIEdldEFzc2V0c1RpcD0nZ2V0X2Fzc2V0c191aScsXHJcbiAgICBEaWFsb2c9J2RpYWxvZycsXHJcblxyXG4gICAgQ29pblBvcCA9ICdDb2luUG9wJywvL+mHkeW4geS4jei2s+S4jumSu+efs+S4jei2s1xyXG5cclxuICAgIFR1cm50YWJsZT0nVHVybnRhYmxlL1R1cm50YWJsZScsLy/ovaznm5hcclxuXHJcbiAgICBSYW5raW5nTGlzdD0nUmFua2luZ0xpc3QvUmFua2luZ0xpc3QnLC8v5o6S6KGM5qacXHJcblxyXG4gICAgQnV5QmF0dGxlUG90aW9uPSd1aS9nYW1lL2J1eV9iYXR0bGVfcG90aW9uJyxcclxuXHJcbiAgICBWaXBTeXN0ZW09J3ZpcHN5c3RlbS9WaXBTeXN0ZW0nLC8vdmlwXHJcblxyXG4gICAgVm5kbGVzc0NoYWxsZW5nZXMgPSAnY29weS9lbmRsZXNzY2hhbGxlbmdlcy9lbmRsZXNzY2hhbGxlbmdlcycsLy/lia/mnKwgICDml6DlsL3mjJHmiJjkuI5ib3Nz5oyR5oiY55qE5Ye65oiY55WM6Z2iXHJcbiAgICBQbGF5aW5zVHJ1Y3Rpb25zID0gJ2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvcGxheWluc3RydWN0aW9ucycsLy/lia/mnKwgICDml6DlsL3mjJHmiJjkuI5ib3Nz5oyR5oiY55qE546p5rOV6K+05piO55WM6Z2iXHJcbiAgICBSZXdhcmREaXNwbGF5ID0gJ2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvcmV3YXJkZGlzcGxheScsLy/lia/mnKwgICDml6DlsL3mjJHmiJjkuI5ib3Nz5oyR5oiY55qE5aWW5Yqx5bGV56S655WM6Z2iXHJcbiAgICBBY2N1bXVsYXRlZFJlY2hhcmdlID0gJ2FjY3VtdWxhdGVkUmVjaGFyZ2UvYWNjdW11bGF0ZWRfcmVjaGFyZ2VfdWknLC8v57Sv5YWFXHJcblxyXG4gICAgUmFua2luZ1Jld2FyZERpc3BsYXkgPSAnY29weS9lbmRsZXNzY2hhbGxlbmdlcy9yYW5raW5ncmV3YXJkZGlzcGxheScsLy8gYm9zc+aMkeaImCDmjpLooYzmppzph4zpnaLnmoTmnKzlkajlpZblirHlsZXnpLpcclxuICAgIFB1cmNoYXNlc051bWJlID0gJ2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvcHVyY2hhc2VzbnVtYmUnLC8vIOaXoOWwveaMkeaImOS4jmJvc3PmjJHmiJgg6LSt5Lmw5oyR5oiY5qyh5pWwXHJcbiAgICBcclxuICAgIE1vcHBpbmdVcCA9ICdjb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL01vcHBpbmdVcCcsLy8g5peg5bC95oyR5oiY5LiOYm9zc+aMkeaImCDmiavojaHlvLnnqpdcclxuXHJcbiAgICBNb3BwaW5nVm9pZCA9ICdjb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL01vcHBpbmdWb2lkJywvLyDomZrnqbog5omr6I2h5by556qXXHJcblxyXG4gICAgUGV0TGlzdCA9ICdwZXQvdWkvcGV0X2V4Y2hhbmdlX3VpJyxcclxuXHJcbiAgICBCdWZmRGlzcGxheSA9ICdjb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0J1ZmZEaXNwbGF5JywvLyDml6DlsL3mjJHmiJhCdWZm6YCJ5oup5by556qX5LiOQnVmZuWxleekuuW8ueeql1xyXG5cclxuICAgIFNob3AgPSAnY29weS9lbmRsZXNzY2hhbGxlbmdlcy9TaG9wJywvLyDomZrnqbroo4LnvJ3nmoTllYblupdcclxuXHJcbiAgICBWb2lkU2NlbmUgPSAnY29weS9lbmRsZXNzY2hhbGxlbmdlcy9Wb2lkU2NlbmUnLC8vIOiZmuepuuijgue8neeahOagvOWtkOWcuuaZr+eVjOmdolxyXG5cclxuICAgIFdpbmRmYWxsID0gJ2NvcHkvZW5kbGVzc2NoYWxsZW5nZXMvV2luZGZhbGwnLC8vIOiZmuepuuijgue8neeahOaEj+WkluS5i+i0olxyXG5cclxuICAgIEJhdHRsZVBvcCA9ICdjb3B5L2VuZGxlc3NjaGFsbGVuZ2VzL0JhdHRsZVBvcCcsLy8g6Jma56m66KOC57yd55qE5oiY5b25XHJcblxyXG4gICAgUGV0SW5mbyA9ICdwZXQvdWkvcGV0X2luZm9fdWknLFxyXG5cclxuICAgIFdlZWtDYXJkID0gJ3dlZWtDYXJkL3dlZWtfY2FyZF91aScsXHJcbiAgICBcclxuICAgIEV4Y2x1c2l2ZUluZm9VaSA9ICdleGNsdXNpdmUvZXhjbHVzaXZlX2luZm9fdWknLFxyXG4gICAgRXF1aXBJbmZvID0gJ2VxdWlwbWVudC9lcXVpcF9pbmZvX3VpJyxcclxuICAgIC8qKuaVmeeoi+WlluWKsVNT6KeS6Imy55qEVUkgKi9cclxuICAgIFJld2FyZFNTVUk9XCJ0dXRvcmlhbHMvcmV3YXJkX3NzX3VpXCIsXHJcbn1cclxuLyoqVUnoioLngrnnmoTlsYLnuqcgKi9cclxuZXhwb3J0IGVudW0gVUlMYXllckxldmVse1xyXG4gICAgT25lPTEsXHJcbiAgICBUd289MixcclxuICAgIFRocmVlPTMsXHJcbiAgICBGb3VyPTQsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFVJX1pJbmRleHtcclxuICAgIE5vcm1hbD0wLFxyXG5cclxuICAgIExvYWRpbmc9OTk5NywgICAgXHJcbiAgICBVaVRvdWNoPTk5OTgsXHJcbiAgICBGcm9udD05OTk5LFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBFZmZlY3RQYXRoe1xyXG4gICAgSGVyb1VwZ3JhZGUwID0gXCJlZmZlY3RzL2hvbWUvcm9sZV91cGdyYWRlL3JvbGVfdXBncmFkZV8wXCIsXHJcbiAgICBIZXJvVXBncmFkZTEgPSBcImVmZmVjdHMvaG9tZS9yb2xlX3VwZ3JhZGUvcm9sZV91cGdyYWRlXzFcIixcclxuXHJcbn1cclxuLy8gaG9tZeWcuuaZr+mihOWKoOi9vemihOWItuS9k1xyXG5leHBvcnQgY29uc3QgSG9tZVByZUxvYWQ6c3RyaW5nW109W1xyXG4gICAgVUlQYXRoLlRvUGxheSxcclxuICAgIFVJUGF0aC5IZXJvR3Jvd3RoLFxyXG4gICAgRWZmZWN0UGF0aC5IZXJvVXBncmFkZTAsXHJcbiAgICBVSVBhdGguVm9pZFNjZW5lXHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgR2FtZVByZUxvYWQ6c3RyaW5nW109W1xyXG4gICAgVUlQYXRoLkNvaW5Qb3BcclxuXTsiXX0=