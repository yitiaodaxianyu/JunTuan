"use strict";
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