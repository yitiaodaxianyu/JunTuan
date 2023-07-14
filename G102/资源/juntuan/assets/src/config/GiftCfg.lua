local GiftCfg = {}

GiftCfg.exchangeData = {
    {exchangeID = 1,name = "50元话费卡",cardNum = 5000,imgPath = "img_calls_card50_ddzyh.png",description = ""},
    {exchangeID = 2,name = "100元话费卡",cardNum = 10000,imgPath = "img_calls_card100_ddzyh.png",description = ""},
    {exchangeID = 3,name = "50元京东卡",cardNum = 5000,imgPath = "img_jd_card50_ddzyh.png",description = ""},
    {exchangeID = 4,name = "100元京东卡",cardNum = 10000,imgPath = "img_jd_card100_ddzyh.png",description = ""},
    {exchangeID = 5,name = "记牌器",cardNum = 10,imgPath = "img_card_ddzyh.png",description = "可查看其他玩家已打出的牌，单局有效"},
    {exchangeID = 6,name = "超级加倍",cardNum = 10,imgPath = "img_double_ddzyh.png",description = "对局加倍环节可使用，倍数x4"},
    {exchangeID = 7,name = "一万金豆",cardNum = 100,imgPath = "icon_beans_warehouse_ddzyh.png",description = ""},
    {exchangeID = 8,name = "十万金豆",cardNum = 1000,imgPath = "img_beans_ddzyh.png",description = ""},
    {exchangeID = 9,name = "一百万金豆",cardNum = 10000,imgPath = "img_beans2_ddzyh.png",description = ""},
}

GiftCfg.propData = {
    {propname = "金豆", propid = 1,imgPath = "img_beans_ddzyh.png",description = ""},
    {propname = "钻石", propid = 2,imgPath = "shop_diamond2_ddzyh.png",description = ""},
    {propname = "绿宝石", propid = 10,imgPath = "img_diamond_forge_ddzyh.png",description = "具有神奇魔力的材料！分解可获得彩宝石！"},
    {propname = "蓝宝石", propid = 11,imgPath = "img_diamond3_forge_ddzyh.png",description = "具有神奇魔力的材料！分解可获得彩宝石！"},
    {propname = "黄宝石", propid = 12,imgPath = "img_diamond4_forge_ddzyh.png",description = "具有神奇魔力的材料！分解可获得彩宝石！"},
    {propname = "紫宝石", propid = 13,imgPath = "img_diamond2_forge_ddzyh.png",description = "具有神奇魔力的材料！分解可获得彩宝石！"},
    {propname = "彩宝石", propid = 14,imgPath = "icon_gem_sign_ddzyh.png",description = ""},
    {propname = "记牌器", propid = 32,imgPath = "img_card_ddzyh.png",description = "可查看其他玩家已打出的牌"},
    {propname = "超级加倍", propid = 33,imgPath = "img_double_ddzyh.png",description = "对局加倍环节可使用，倍数x4"}
}

function GiftCfg:GetExchangeCardNum(_id)
    for i = 1, #GiftCfg.exchangeData do
        if GiftCfg.exchangeData[i].exchangeID == _id then
            return GiftCfg.exchangeData[i].cardNum
        end
    end
end

--根据id获取奖励物品纹理路径
function GiftCfg:GetExchangeImgPath(_id)
    for i = 1, #GiftCfg.exchangeData do
        if GiftCfg.exchangeData[i].exchangeID == _id then
            return GiftCfg.exchangeData[i].imgPath
        end
    end
end
--通过id获取道具纹理路径
function GiftCfg:GetPropImgPath(_id)
    for _,v in pairs(GiftCfg.propData) do
        if v.propid == _id then
            return v.imgPath,v.description
        end
    end
end

function GiftCfg:GetPropName(_id)
    for _,v in pairs(GiftCfg.propData) do
        if v.propid == _id then
            return v.propname
        end
    end
end

return GiftCfg