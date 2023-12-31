---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2021/6/15 14:28
---

-- 购买金币界面
local BuyGoldView = class("BuyGoldView", ViewBase)

local buyDataCfg = {}
function BuyGoldView:ctor(para)
    self:enableNodeEvents()
    self:initData(para)
end

function BuyGoldView:onEnter()
    local pb = {
        userAct = Define.USER_ACTION.money_view,
    }
    HttpManager.Shared():sendUserAction(pb)
    self:initView()
    self:addNotify()
end

function BuyGoldView:initData(para)
    local data = UserData.Shared().gameCfg[Define.ENUM_CFG_KEY.EXCHANGE_BOX]
    for i, v in pairs(data) do
        if v.RewardType == Define.ENUM_REWARD_TYPE.COINS then
            buyDataCfg[v.ExBoxId] = {}
            buyDataCfg[v.ExBoxId].gold_get = v.RewardNums
            buyDataCfg[v.ExBoxId].gem_cost = v.CostGem
            buyDataCfg[v.ExBoxId].boxId = v.ExBoxId
        end
    end
end

function BuyGoldView:initView()
    local para = {
        csb = JunTuanCfg.csbCfg.shopView.shop_buy_gold,
        setSize = true
    }
    local ui = ViewBase:createCSB(para)
    self:addChild(ui)

    local panel_black = ui:getChildByName("Panel_black")
    local panel_main = panel_black:getChildByName("Panel_main")
    self:createAni(panel_main)
    self:initPanelGold(panel_main)

    local btn_close = panel_main:getChildByName("btn_close")
    ExternalTools:addBtnTouchEventListener(btn_close, function ()
        self:destroyAni(panel_main, function()
            self:removeFromParent(true)
        end)
    end)
end

function BuyGoldView:initBuyItem(item, data)
    local txt_gold = item:getChildByName("Text_Gold")
    local txt_cost = item:getChildByName("Text_Cost")
    local gold_get = data.gold_get
    local gem_cost = data.gem_cost
    local boxId = data.boxId
    txt_gold:setString(gold_get .. "金币")
    txt_cost:setString("x" .. gem_cost)
    ExternalTools:txtAutoWidth(txt_gold, 135)
    ExternalTools:txtAutoWidth(txt_cost, 70)
    local function btnCall(btn)
        if UserData.Shared():get_lDiamond() < gem_cost then
            GameTool:showTxtTip("钻石不足")
            GameTool:showBuyGemView(self)
            return
        end

        local body = {
            exBoxId = boxId
        }
        MsgSendMgr:sendExchangeBox(body)
    end
    ExternalTools:addBtnTouchEventListener(item, btnCall)
end

function BuyGoldView:initPanelGold(panel)
    local curBoxId = 1
    for _, v in pairs(buyDataCfg) do
        local data = v
        local item = panel:getChildByName("Panel_gold_" .. curBoxId)
        self:initBuyItem(item, data)
        curBoxId = curBoxId + 1
    end
end

function BuyGoldView:showPayView(data)
    local view = require("JunTuan.src.views.PayView").new(data)
    ExternalTools:showView(view, self)
end

-- 处理宝箱兑换请求
function BuyGoldView:handleExchangeBox(data)
    local boxId = data.exBoxId
    if buyDataCfg[boxId] then
        local costGem = buyDataCfg[boxId].gem_cost
        GameTool:updateGem(-costGem)
        MessageManager.Shared():postMsg(MsgKeyData.onHeroRedDotCheck)
    end
end

function BuyGoldView:addNotify()
    self.exChangeBoxMsg = MessageManager.Shared():addMsg(MsgKeyData.onExchangeBox, function (data)
        self:handleExchangeBox(data)
    end)
end

function BuyGoldView:removeNotify()
    MessageManager.Shared():removeMsg(MsgKeyData.onExchangeBox, self.exChangeBoxMsg)
end

function BuyGoldView:onExit()
    self:removeNotify()
end

return BuyGoldView