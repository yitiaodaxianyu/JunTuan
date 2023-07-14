---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2021/6/2 17:25
---

local PayView = class("PayView", ViewBase)
function PayView:ctor(para)
    self:enableNodeEvents()
    self:initData(para)
end

function PayView:onEnter()
    local pb = {
        userAct = Define.USER_ACTION.openPay_view,
    }
    HttpManager.Shared():sendUserAction(pb)
    self:initView()
    self:addNotify()
end

function PayView:initData(para)
    self.money = para.money
    self.productid = para.productid
    self.productname = para.productname
end

function PayView:initView()
    local para = {
        csb = JunTuanCfg.csbCfg.shopView.shop_pay,
        setSize = true
    }
    local ui = ViewBase:createCSB(para)
    self:addChild(ui)

    local panel_black = ui:getChildByName("Panel_black")
    local panel_main = panel_black:getChildByName("Panel_main")
    self:createAni(panel_main)
    local txt_money = panel_main:getChildByName("Text_money")
    txt_money:setString(self.money .. "元")
    local btn_close = panel_main:getChildByName("btn_close")
    local btn_pay_alipay = panel_main:getChildByName("btn_pay_alipay")
    local btn_pay_wechat = panel_main:getChildByName("btn_pay_wechat")
    local function btnCall(btn)
        if btn == btn_close then
            self:destroyAni(panel_main, function()
                self:removeFromParent(true)
            end)
        elseif btn == btn_pay_alipay then
            local pb = {
                userAct = Define.USER_ACTION.aliPay_view,
            }
            HttpManager.Shared():sendUserAction(pb)
            HttpManager.Shared():H5Pay(self.productid, self.productname, 2)
        elseif btn == btn_pay_wechat then
            local pb = {
                userAct = Define.USER_ACTION.wechatPay_view,
            }
            HttpManager.Shared():sendUserAction(pb)
            HttpManager.Shared():H5Pay(self.productid, self.productname, 1)
        end
    end
    ExternalTools:addBtnTouchEventListener(btn_close, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_pay_alipay, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_pay_wechat, btnCall)
end

function PayView:gotoPay()

end

function PayView:addNotify()

end

function PayView:removeNotify()

end

function PayView:onExit()
    self:removeNotify()
end

return PayView