
/*****************广告**************** */
export interface RewardAd{
    result(isSuc:boolean);
}
/*****************订阅**************** */
export interface DingYue{
    result?(isDy:boolean);
    info?(payInfo:PayInfo[]);
}

export enum DingYue_Type
{
    Week=0,
    Month,
    Year,
}
/*****************支付**************** */
export interface Pay{
    result?(isDy:boolean);
    info?(payInfo:PayInfo[]);
}

export enum PayId
{
    /**通关返利 */
    Campaign=101,//通关返利
    /**用户等级升级返利 */
    Growth=102,
    /**战令 */
    BattlePass=103,
    /**100钻石 */
    Gem100=201,
    /**500钻石 */
    Gem500=202,
    /**1200钻石 */
    Gem1200=203,
    /**6500钻石 */
    Gem6500=205,
    /**14000钻石 */
    Gem14000=206,
    /**超级角色宝箱单抽 */
    SuperRole1=301,
    /**超级角色宝箱10连抽 */
    SuperRole10=302,
    /**高级装备宝箱单抽 */
    MasterEquip1=311,
    /**高级装备宝箱单抽 */
    MasterEquip10=312,
    /**限购礼包——自选1-英雄自选 */
    LimitedGift1=1001,
    /**限购礼包——自选2-装备自选 */
    LimitedGift2=1002,
    /**限购礼包——热卖1 英雄捆绑包1*/
    HotGift1=2001,
    /**限购礼包——热卖2 英雄捆绑包2*/
    HotGift2=2002,
    /**限购礼包——热卖3 英雄捆绑包3*/
    HotGift3=2003,
    /**限购礼包——热卖4 英雄捆绑包4*/
    HotGift4=2004,
    /**限购礼包——热卖5 英雄捆绑包5*/
    HotGift5=2005,
    /**限购礼包——热卖6 英雄捆绑包6*/
    HotGift6=2006,
    /**限购礼包——热卖7 装备捆绑包*/
    HotGift7=2007,
    /**限购礼包——日常1 基础货币-金币钻石*/
    DailyGift1=3002,
    /**限购礼包——日常2 基础资源-经验天赋钻石*/
    DailyGift2=3003,
    /**限购礼包——日常3 金币包*/
    DailyGift3=3004,
    /**限购礼包——日常4 经验包*/
    DailyGift4=3005,
    /**限购礼包——日常5 天赋点包*/
    DailyGift5=3006,
    /**限时礼包1*/
    TimeGift1=4001,
    /**限时礼包2*/
    TimeGift2=4002,
    /**限时礼包3*/
    TimeGift3=4003,

}

export class PayInfo{
    /**支付id */
    pay_id:string='b201';
    /**商品说明 */
    des:string='60 Crystal';
    /**支付价格 */
    price:string='1';
    /**支付币种 */
    currency:string='USD';
    /**是否购买过，但是没有消耗 */
    is_buy:boolean=false;
}

export enum PayUiIndex{
    ZuXiang=1,
    LongJing,
    Gift,
    FanLi,
    Total,
    ZhanLing,
    WeekCard=7,
    ShouChong=26,
    
}

