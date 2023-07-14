
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Prop/PropConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e86ccmVf7ZEXqbDsA1Yeoor', 'PropConfig');
// Scripts/Prop/PropConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropAction = exports.PropId = void 0;
var PropId;
(function (PropId) {
    /**金币 */
    PropId[PropId["Coin"] = 10001] = "Coin";
    /**钻石 */
    PropId[PropId["Gem"] = 10002] = "Gem";
    /**龙晶 */
    PropId[PropId["LongJing"] = 10003] = "LongJing";
    /**英雄经验 */
    PropId[PropId["HeroExp"] = 20001] = "HeroExp";
    /**英雄魂石/进阶石 */
    PropId[PropId["HeroStone"] = 20002] = "HeroStone";
    /**兽粮 */
    PropId[PropId["AnimalFood"] = 20003] = "AnimalFood";
    /**普通力量精华 */
    PropId[PropId["Essence1"] = 20004] = "Essence1";
    /**中级力量精华 */
    PropId[PropId["Essence2"] = 20005] = "Essence2";
    /**高级力量精华 */
    PropId[PropId["Essence3"] = 20006] = "Essence3";
    /**玩家经验 */
    PropId[PropId["UserExp"] = 20007] = "UserExp";
    /**专属武器精炼石1 */
    PropId[PropId["ExclusiveWeaponMasterKeyC"] = 20008] = "ExclusiveWeaponMasterKeyC";
    /**专属武器精炼石2 */
    PropId[PropId["ExclusiveWeaponMasterKeyB"] = 20009] = "ExclusiveWeaponMasterKeyB";
    /**专属武器精炼石3 */
    PropId[PropId["ExclusiveWeaponMasterKeyA"] = 20010] = "ExclusiveWeaponMasterKeyA";
    /**专属武器精炼石3 */
    PropId[PropId["ExclusiveWeaponMasterKeyS"] = 20011] = "ExclusiveWeaponMasterKeyS";
    /**专属武器精炼石3 */
    PropId[PropId["ExclusiveWeaponMasterKeySS"] = 20012] = "ExclusiveWeaponMasterKeySS";
    /**专属武器精炼石3 */
    PropId[PropId["ExclusiveWeaponMasterKeySSS"] = 20013] = "ExclusiveWeaponMasterKeySSS";
    /**迷宫工具包 */
    PropId[PropId["MazeToolkit"] = 40003] = "MazeToolkit";
    /**普通许愿币 */
    PropId[PropId["OrdinaryWishingCoin"] = 40004] = "OrdinaryWishingCoin";
    /**高级许愿币 */
    PropId[PropId["PremiumWishingCoin"] = 40005] = "PremiumWishingCoin";
    /**普通宠物蛋 */
    PropId[PropId["OrdinaryTakeEgg"] = 40006] = "OrdinaryTakeEgg";
    /**高级宠物蛋 */
    PropId[PropId["PremiumTakeEgg"] = 40007] = "PremiumTakeEgg";
    /**迷宫探索币 */
    PropId[PropId["MazeCoin"] = 60001] = "MazeCoin";
    /**地牢探索币 */
    PropId[PropId["DungeonCoin"] = 60002] = "DungeonCoin";
    /**角色宝箱钥匙 */
    PropId[PropId["RoleChestKey"] = 10002] = "RoleChestKey";
    /**装备宝箱钥匙 */
    PropId[PropId["EquipChestKey"] = 10003] = "EquipChestKey";
    /**免费宝箱 */
    PropId[PropId["FreeBox"] = 80001] = "FreeBox";
    /**装备宝箱 */
    PropId[PropId["EquipBox"] = 80002] = "EquipBox";
    /**碎片宝箱 */
    PropId[PropId["FragmentBox"] = 80003] = "FragmentBox";
    /**超级宝箱 */
    PropId[PropId["SuperBox"] = 80004] = "SuperBox";
    /**战令免费宝箱 */
    PropId[PropId["BattleFreePassBox"] = 80005] = "BattleFreePassBox";
    /**Boss狩猎门票 */
    PropId[PropId["BossTicket"] = 40001] = "BossTicket";
    /**无尽挑战门票 */
    PropId[PropId["EndlessChallenge"] = 40002] = "EndlessChallenge";
    /**红色药水*/
    PropId[PropId["RedPotion"] = 40007] = "RedPotion";
    /**蓝色药水*/
    PropId[PropId["BluePotion"] = 40008] = "BluePotion";
    /**绿色药水*/
    PropId[PropId["GreenPotion"] = 40009] = "GreenPotion";
    // 英雄万能碎片 C
    PropId[PropId["HeroMasterKeyC"] = 101001] = "HeroMasterKeyC";
    // 英雄万能碎片 B
    PropId[PropId["HeroMasterKeyB"] = 101002] = "HeroMasterKeyB";
    // 英雄万能碎片 A
    PropId[PropId["HeroMasterKeyA"] = 101003] = "HeroMasterKeyA";
    // 英雄万能碎片 s
    PropId[PropId["HeroMasterKeyS"] = 101004] = "HeroMasterKeyS";
    // 英雄万能碎片 SS
    PropId[PropId["HeroMasterKeySS"] = 101005] = "HeroMasterKeySS";
    // 英雄万能碎片 SSS
    PropId[PropId["HeroMasterKeySSS"] = 101006] = "HeroMasterKeySSS";
})(PropId = exports.PropId || (exports.PropId = {}));
var PropAction;
(function (PropAction) {
    /**无,无法点击*/
    PropAction[PropAction["Null"] = 0] = "Null";
    /**查看 */
    PropAction[PropAction["Look"] = 1] = "Look";
    /**使用，点击需要使用消耗*/
    PropAction[PropAction["Use"] = 2] = "Use";
    /**购买 */
    PropAction[PropAction["Buy"] = 3] = "Buy";
    PropAction[PropAction["Num"] = 4] = "Num";
})(PropAction = exports.PropAction || (exports.PropAction = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcUHJvcENvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFZLE1Bb0ZYO0FBcEZELFdBQVksTUFBTTtJQUNkLFFBQVE7SUFDUix1Q0FBVSxDQUFBO0lBQ1YsUUFBUTtJQUNSLHFDQUFTLENBQUE7SUFDVCxRQUFRO0lBQ1IsK0NBQWMsQ0FBQTtJQUNkLFVBQVU7SUFDViw2Q0FBYSxDQUFBO0lBQ2IsY0FBYztJQUNkLGlEQUFlLENBQUE7SUFDZixRQUFRO0lBQ1IsbURBQWdCLENBQUE7SUFDaEIsWUFBWTtJQUNaLCtDQUFjLENBQUE7SUFDZCxZQUFZO0lBQ1osK0NBQWMsQ0FBQTtJQUNkLFlBQVk7SUFDWiwrQ0FBYyxDQUFBO0lBQ2QsVUFBVTtJQUNWLDZDQUFhLENBQUE7SUFDYixjQUFjO0lBQ2QsaUZBQStCLENBQUE7SUFDL0IsY0FBYztJQUNkLGlGQUErQixDQUFBO0lBQy9CLGNBQWM7SUFDZCxpRkFBK0IsQ0FBQTtJQUMvQixjQUFjO0lBQ2QsaUZBQStCLENBQUE7SUFDL0IsY0FBYztJQUNkLG1GQUFnQyxDQUFBO0lBQ2hDLGNBQWM7SUFDZCxxRkFBaUMsQ0FBQTtJQUNqQyxXQUFXO0lBQ1gscURBQWlCLENBQUE7SUFDakIsV0FBVztJQUNYLHFFQUEyQixDQUFBO0lBQzNCLFdBQVc7SUFDWCxtRUFBMEIsQ0FBQTtJQUMxQixXQUFXO0lBQ1gsNkRBQXVCLENBQUE7SUFDdkIsV0FBVztJQUNYLDJEQUFzQixDQUFBO0lBQ3RCLFdBQVc7SUFDWCwrQ0FBZ0IsQ0FBQTtJQUNoQixXQUFXO0lBQ1gscURBQW1CLENBQUE7SUFDbkIsWUFBWTtJQUNaLHVEQUFrQixDQUFBO0lBQ2xCLFlBQVk7SUFDWix5REFBbUIsQ0FBQTtJQUNuQixVQUFVO0lBQ1YsNkNBQWEsQ0FBQTtJQUNiLFVBQVU7SUFDViwrQ0FBYyxDQUFBO0lBQ2QsVUFBVTtJQUNWLHFEQUFpQixDQUFBO0lBQ2pCLFVBQVU7SUFDViwrQ0FBYyxDQUFBO0lBQ2QsWUFBWTtJQUNaLGlFQUF1QixDQUFBO0lBQ3ZCLGNBQWM7SUFDZCxtREFBa0IsQ0FBQTtJQUNsQixZQUFZO0lBQ1osK0RBQXdCLENBQUE7SUFDeEIsU0FBUztJQUNULGlEQUFlLENBQUE7SUFDZixTQUFTO0lBQ1QsbURBQWdCLENBQUE7SUFDaEIsU0FBUztJQUNULHFEQUFpQixDQUFBO0lBQ2pCLFdBQVc7SUFDWCw0REFBdUIsQ0FBQTtJQUN2QixXQUFXO0lBQ1gsNERBQXVCLENBQUE7SUFDdkIsV0FBVztJQUNYLDREQUF1QixDQUFBO0lBQ3ZCLFdBQVc7SUFDWCw0REFBdUIsQ0FBQTtJQUN2QixZQUFZO0lBQ1osOERBQXdCLENBQUE7SUFDeEIsYUFBYTtJQUNiLGdFQUF5QixDQUFBO0FBRTdCLENBQUMsRUFwRlcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBb0ZqQjtBQWFELElBQVksVUFXWDtBQVhELFdBQVksVUFBVTtJQUNsQixXQUFXO0lBQ1gsMkNBQU0sQ0FBQTtJQUNOLFFBQVE7SUFDUiwyQ0FBTSxDQUFBO0lBQ04sZ0JBQWdCO0lBQ2hCLHlDQUFLLENBQUE7SUFDTCxRQUFRO0lBQ1IseUNBQUssQ0FBQTtJQUVMLHlDQUFHLENBQUE7QUFDUCxDQUFDLEVBWFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFXckIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGVudW0gUHJvcElke1xyXG4gICAgLyoq6YeR5biBICovXHJcbiAgICBDb2luPTEwMDAxLFxyXG4gICAgLyoq6ZK755+zICovXHJcbiAgICBHZW09MTAwMDIsXHJcbiAgICAvKirpvpnmmbYgKi9cclxuICAgIExvbmdKaW5nPTEwMDAzLFxyXG4gICAgLyoq6Iux6ZuE57uP6aqMICovXHJcbiAgICBIZXJvRXhwPTIwMDAxLFxyXG4gICAgLyoq6Iux6ZuE6a2C55+zL+i/m+mYtuefsyAqL1xyXG4gICAgSGVyb1N0b25lPTIwMDAyLFxyXG4gICAgLyoq5YW957KuICovXHJcbiAgICBBbmltYWxGb29kPTIwMDAzLFxyXG4gICAgLyoq5pmu6YCa5Yqb6YeP57K+5Y2OICovXHJcbiAgICBFc3NlbmNlMT0yMDAwNCxcclxuICAgIC8qKuS4ree6p+WKm+mHj+eyvuWNjiAqL1xyXG4gICAgRXNzZW5jZTI9MjAwMDUsXHJcbiAgICAvKirpq5jnuqflipvph4/nsr7ljY4gKi9cclxuICAgIEVzc2VuY2UzPTIwMDA2LCAgICBcclxuICAgIC8qKueOqeWutue7j+mqjCAqL1xyXG4gICAgVXNlckV4cD0yMDAwNyxcclxuICAgIC8qKuS4k+WxnuatpuWZqOeyvueCvOefszEgKi9cclxuICAgIEV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleUM9MjAwMDgsXHJcbiAgICAvKirkuJPlsZ7mrablmajnsr7ngrznn7MyICovXHJcbiAgICBFeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlCPTIwMDA5LFxyXG4gICAgLyoq5LiT5bGe5q2m5Zmo57K+54K855+zMyAqL1xyXG4gICAgRXhjbHVzaXZlV2VhcG9uTWFzdGVyS2V5QT0yMDAxMCxcclxuICAgIC8qKuS4k+WxnuatpuWZqOeyvueCvOefszMgKi9cclxuICAgIEV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVM9MjAwMTEsXHJcbiAgICAvKirkuJPlsZ7mrablmajnsr7ngrznn7MzICovXHJcbiAgICBFeGNsdXNpdmVXZWFwb25NYXN0ZXJLZXlTUz0yMDAxMixcclxuICAgIC8qKuS4k+WxnuatpuWZqOeyvueCvOefszMgKi9cclxuICAgIEV4Y2x1c2l2ZVdlYXBvbk1hc3RlcktleVNTUz0yMDAxMyxcclxuICAgIC8qKui/t+Wuq+W3peWFt+WMhSAqL1xyXG4gICAgTWF6ZVRvb2xraXQ9NDAwMDMsXHJcbiAgICAvKirmma7pgJrorrjmhL/luIEgKi9cclxuICAgIE9yZGluYXJ5V2lzaGluZ0NvaW4gPSA0MDAwNCxcclxuICAgIC8qKumrmOe6p+iuuOaEv+W4gSAqL1xyXG4gICAgUHJlbWl1bVdpc2hpbmdDb2luID0gNDAwMDUsXHJcbiAgICAvKirmma7pgJrlrqDnianom4sgKi9cclxuICAgIE9yZGluYXJ5VGFrZUVnZyA9IDQwMDA2LFxyXG4gICAgLyoq6auY57qn5a6g54mp6JuLICovXHJcbiAgICBQcmVtaXVtVGFrZUVnZyA9IDQwMDA3LFxyXG4gICAgLyoq6L+35a6r5o6i57Si5biBICovXHJcbiAgICBNYXplQ29pbiA9IDYwMDAxLFxyXG4gICAgLyoq5Zyw54mi5o6i57Si5biBICovXHJcbiAgICBEdW5nZW9uQ29pbiA9IDYwMDAyLFxyXG4gICAgLyoq6KeS6Imy5a6d566x6ZKl5YyZICovXHJcbiAgICBSb2xlQ2hlc3RLZXk9MTAwMDIsXHJcbiAgICAvKiroo4XlpIflrp3nrrHpkqXljJkgKi9cclxuICAgIEVxdWlwQ2hlc3RLZXk9MTAwMDMsXHJcbiAgICAvKirlhY3otLnlrp3nrrEgKi9cclxuICAgIEZyZWVCb3g9ODAwMDEsXHJcbiAgICAvKiroo4XlpIflrp3nrrEgKi9cclxuICAgIEVxdWlwQm94PTgwMDAyLFxyXG4gICAgLyoq56KO54mH5a6d566xICovXHJcbiAgICBGcmFnbWVudEJveD04MDAwMyxcclxuICAgIC8qKui2hee6p+WuneeusSAqL1xyXG4gICAgU3VwZXJCb3g9ODAwMDQsXHJcbiAgICAvKirmiJjku6TlhY3otLnlrp3nrrEgKi9cclxuICAgIEJhdHRsZUZyZWVQYXNzQm94PTgwMDA1LFxyXG4gICAgLyoqQm9zc+eLqeeMjumXqOelqCAqL1xyXG4gICAgQm9zc1RpY2tldCA9IDQwMDAxLFxyXG4gICAgLyoq5peg5bC95oyR5oiY6Zeo56WoICovXHJcbiAgICBFbmRsZXNzQ2hhbGxlbmdlID0gNDAwMDIsXHJcbiAgICAvKirnuqLoibLoja/msLQqL1xyXG4gICAgUmVkUG90aW9uPTQwMDA3LFxyXG4gICAgLyoq6JOd6Imy6I2v5rC0Ki9cclxuICAgIEJsdWVQb3Rpb249NDAwMDgsXHJcbiAgICAvKirnu7/oibLoja/msLQqL1xyXG4gICAgR3JlZW5Qb3Rpb249NDAwMDksXHJcbiAgICAvLyDoi7Hpm4TkuIfog73noo7niYcgQ1xyXG4gICAgSGVyb01hc3RlcktleUMgPSAxMDEwMDEsXHJcbiAgICAvLyDoi7Hpm4TkuIfog73noo7niYcgQlxyXG4gICAgSGVyb01hc3RlcktleUIgPSAxMDEwMDIsXHJcbiAgICAvLyDoi7Hpm4TkuIfog73noo7niYcgQVxyXG4gICAgSGVyb01hc3RlcktleUEgPSAxMDEwMDMsXHJcbiAgICAvLyDoi7Hpm4TkuIfog73noo7niYcgc1xyXG4gICAgSGVyb01hc3RlcktleVMgPSAxMDEwMDQsXHJcbiAgICAvLyDoi7Hpm4TkuIfog73noo7niYcgU1NcclxuICAgIEhlcm9NYXN0ZXJLZXlTUyA9IDEwMTAwNSxcclxuICAgIC8vIOiLsembhOS4h+iDveeijueJhyBTU1NcclxuICAgIEhlcm9NYXN0ZXJLZXlTU1MgPSAxMDEwMDYsXHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9wRGF0YXtcclxuICAgIC8qKumBk+WFt+eahGlkICovXHJcbiAgICBwcm9wX2lkOm51bWJlcjtcclxuICAgIC8qKumBk+WFt+eahOaVsOmHjyAqL1xyXG4gICAgcHJvcF9udW06bnVtYmVyO1xyXG4gICAgLyoq6I635b6XcHJvcF9pZOmcgOimgeeahOS7t+agvO+8iOi0reS5sO+8iSAqL1xyXG4gICAgcHJvcF9wcmljZT86bnVtYmVyO1xyXG4gICAgLyoq6I635b6XcHJvcF9pZOmcgOimgeeahGlkIO+8iOi0reS5sO+8iSovXHJcbiAgICBwcm9wX2Nvc3RfaWQ/Om51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUHJvcEFjdGlvbntcclxuICAgIC8qKuaXoCzml6Dms5Xngrnlh7sqL1xyXG4gICAgTnVsbD0wLFxyXG4gICAgLyoq5p+l55yLICovXHJcbiAgICBMb29rPTEsXHJcbiAgICAvKirkvb/nlKjvvIzngrnlh7vpnIDopoHkvb/nlKjmtojogJcqL1xyXG4gICAgVXNlPTIsXHJcbiAgICAvKirotK3kubAgKi9cclxuICAgIEJ1eT0zLFxyXG5cclxuICAgIE51bSxcclxufVxyXG5cclxuIl19