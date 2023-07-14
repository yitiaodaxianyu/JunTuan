
export enum PropId{
    /**金币 */
    Coin=10001,
    /**钻石 */
    Gem=10002,
    /**龙晶 */
    LongJing=10003,
    /**英雄经验 */
    HeroExp=20001,
    /**英雄魂石/进阶石 */
    HeroStone=20002,
    /**兽粮 */
    AnimalFood=20003,
    /**普通力量精华 */
    Essence1=20004,
    /**中级力量精华 */
    Essence2=20005,
    /**高级力量精华 */
    Essence3=20006,    
    /**玩家经验 */
    UserExp=20007,
    /**专属武器精炼石1 */
    ExclusiveWeaponMasterKeyC=20008,
    /**专属武器精炼石2 */
    ExclusiveWeaponMasterKeyB=20009,
    /**专属武器精炼石3 */
    ExclusiveWeaponMasterKeyA=20010,
    /**专属武器精炼石3 */
    ExclusiveWeaponMasterKeyS=20011,
    /**专属武器精炼石3 */
    ExclusiveWeaponMasterKeySS=20012,
    /**专属武器精炼石3 */
    ExclusiveWeaponMasterKeySSS=20013,
    /**迷宫工具包 */
    MazeToolkit=40003,
    /**普通许愿币 */
    OrdinaryWishingCoin = 40004,
    /**高级许愿币 */
    PremiumWishingCoin = 40005,
    /**普通宠物蛋 */
    OrdinaryTakeEgg = 40006,
    /**高级宠物蛋 */
    PremiumTakeEgg = 40007,
    /**迷宫探索币 */
    MazeCoin = 60001,
    /**地牢探索币 */
    DungeonCoin = 60002,
    /**角色宝箱钥匙 */
    RoleChestKey=10002,
    /**装备宝箱钥匙 */
    EquipChestKey=10003,
    /**免费宝箱 */
    FreeBox=80001,
    /**装备宝箱 */
    EquipBox=80002,
    /**碎片宝箱 */
    FragmentBox=80003,
    /**超级宝箱 */
    SuperBox=80004,
    /**战令免费宝箱 */
    BattleFreePassBox=80005,
    /**Boss狩猎门票 */
    BossTicket = 40001,
    /**无尽挑战门票 */
    EndlessChallenge = 40002,
    /**红色药水*/
    RedPotion=40007,
    /**蓝色药水*/
    BluePotion=40008,
    /**绿色药水*/
    GreenPotion=40009,
    // 英雄万能碎片 C
    HeroMasterKeyC = 101001,
    // 英雄万能碎片 B
    HeroMasterKeyB = 101002,
    // 英雄万能碎片 A
    HeroMasterKeyA = 101003,
    // 英雄万能碎片 s
    HeroMasterKeyS = 101004,
    // 英雄万能碎片 SS
    HeroMasterKeySS = 101005,
    // 英雄万能碎片 SSS
    HeroMasterKeySSS = 101006,
    
}

export interface PropData{
    /**道具的id */
    prop_id:number;
    /**道具的数量 */
    prop_num:number;
    /**获得prop_id需要的价格（购买） */
    prop_price?:number;
    /**获得prop_id需要的id （购买）*/
    prop_cost_id?:number;
}

export enum PropAction{
    /**无,无法点击*/
    Null=0,
    /**查看 */
    Look=1,
    /**使用，点击需要使用消耗*/
    Use=2,
    /**购买 */
    Buy=3,

    Num,
}

