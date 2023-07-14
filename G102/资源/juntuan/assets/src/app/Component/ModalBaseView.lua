--[[--
    模态窗口框
        基于模态窗口继承该类
    date 2015.1.8
]]
local ModalBaseView = class("ModalBaseView", function()
    local ui = ccui.Layout:create()
    ui:setContentSize(display.size)
    return ui
end)
local socket = require("socket")

ModalBaseView.closeType = {--模态窗口关闭类型
    Modal = 1, -- 点击未填充背景区域关闭
    NotModal = 2  -- 点击关闭按钮关闭
}

ModalBaseView.btnClose = nil --设置关闭按钮
ModalBaseView.winType = nil --窗口类型
ModalBaseView.ui = nil --本身的self
ModalBaseView.eventDispatch = nil --事件发送器
ModalBaseView.isKeyBord = nil --键盘是否弹起

ModalBaseView.NoticeType = {
    room = 1, --房间
    lobby = 2, --大厅
    game = 3, --全游戏
}

--[[
    @param winType 窗口类型
    @param bgT  背景相关 isadd  是否添加
]]
function ModalBaseView:ctor(wType, bgT)
    local bgarray = bgT or { isAdd = true, type = 1, opacity = 0 } --设置默认背景值
    if bgarray.isAdd then
        --LayerManager:getInstace():addBG(self,bgarray.bgType or 1,bgarray.bgOpacity or 0)
    end
    self.winType = wType or ModalBaseView.closeType.Modal
    self.eventDispatch = self:getEventDispatcher()
    if self.winType == ModalBaseView.closeType.Modal then
        self:setTouchEnabled(true)
        self:addTouchEventListener(handler(self, self.onTouch))
    end
    self:setKeyBord(false)
end

--android按下返回键操作 1 --移除 2 返回主界面
function ModalBaseView:enterButton(type)
    self.returnType = type or 1
    self.keypadFun = function()
        -- addAounds(allmusicsounds["buttonPress"])
        if self.returnType == 2 then
            confirm("确定退出游戏", function()
                if ChannelCfgs.UCApi then
                    SceneManager:enterLoginScene({ logout = true })
                else
                    SceneManager:enterLoginScene()
                end
            end)
        else
            if self.destoy then
                self:destoy()
            end
        end
    end
    DeviceManager.initKeypadHandler(self, self.keypadFun)
end

--[[
    设置node不可见
]]
function ModalBaseView:setNodeVisible(node, bool)
    node:setVisible(bool)
    node:setTouchEnabled(bool)
    node:setEnabled(bool)
end

--[[--
    设置node为灰色 且不可点击
]]
function ModalBaseView:setNodeBright(node, bool)
    node:setBright(bool)
    node:setTouchEnabled(bool)
end

--[[
    @param closeBtn 关闭按钮
]]
function ModalBaseView:setClose(closeBtn)
    self.btnClose = closeBtn
    if self and self.btnClose then
        self.btnClose:addTouchEventListener(handler(self, self.onTouch))
        self.btnClostBtn = self.btnClose:getChildByName("img_back")
        if self and self.btnClostBtn then
            self.btnClostBtn:addTouchEventListener(handler(self, self.onTouch))
        end
    end
end

function ModalBaseView:setCloseD(closeBtn)
    self.btnClose = closeBtn
    if self and self.btnClose then
        self.btnClose:addTouchEventListener(handler(self, self.onTouch))
        self.btnClostBtn = self.btnClose:getParent()
        if self and self.btnClostBtn then
            self.btnClostBtn:addTouchEventListener(handler(self, self.onTouch))
        end
    end
end

-- 设置键盘状态
function ModalBaseView:setKeyBord(status)
    self.isKeyBord = status
end

--[[设置背景]]
function ModalBaseView:setBGColorOpacity(opacity)
    self:setBackGroundColorOpacity(opacity)
end

--设置触摸事件
function ModalBaseView:onTouch(sender, eventType)
    if eventType == ccui.TouchEventType.ended then
        if self.isKeyBord == true then
            return
        end
        if sender == self.btnClose or sender == self.btnClostBtn then
            -- addAounds(allmusicsounds["buttonPress"])
        end
        self:destoy()
    end
end

--销毁
function ModalBaseView:destoy()
    DeviceManager.removeKeyBackPress(self, self.keypadFun)
    self:removeFromParent()
    self.btnClose = nil
    self.btnClostBtn = nil
end

-- 设置按钮点击事件，withAnim是否需要按钮点击动画，默认没有动画（withAnim==true时用animType区分类型）
function ModalBaseView:initBtnHandler(btn, call, withAnim, animType, moveDistance)
    if btn then
        btn:addTouchEventListener(self:createBtnHandler(call, withAnim, animType, moveDistance))
    end
end

--构造按钮点击事件（多个按钮共用）
function ModalBaseView:createBtnHandler(call, withAnim, animType, moveDistance)
    return function(sender, eventType)
        if withAnim then
            if animType == 2 then
                self:btnClickAnim_2(sender, eventType)
            elseif animType == 3 then
                self:btnClickAnim_3(sender, eventType, moveDistance)
            else
                --默认
                self:btnClickAnim_1(sender, eventType)
            end

        end
        if eventType == ccui.TouchEventType.began then
            if sender.touchBugFun then
                sender.touchBugFun()
            end
        elseif eventType == ccui.TouchEventType.ended and sender:isEnabled() then
            local t1 = socket.gettime()
            if not sender.clickTime then
                sender.clickTime = t1 - 1
            end
            if t1 - sender.clickTime >= 0.1 then
                sender.clickTime = t1
                if call then
                    call(sender)
                end
            end
            if sender.cancelTouchBugFun then
                sender.cancelTouchBugFun()
            end
        elseif eventType == ccui.TouchEventType.canceled then
            if sender.cancelTouchBugFun then
                sender.cancelTouchBugFun()
            end
        end
    end
end



-- 按钮点击动画1
function ModalBaseView:btnClickAnim_1(sender, eventType)
    if eventType == ccui.TouchEventType.began then
        sender:stopAllActions()
        -- if sender.btn_scale_action_1 then
        --     sender:stopAction(sender.btn_scale_action_1)
        -- end
        -- if sender.btn_scale_action_2 then
        --     sender:stopAction(sender.btn_scale_action_2)
        -- end
        if sender.scale then
            sender:setScale(sender.scale)
        end

        if not sender.scale then
            sender.scale = sender:getScale()
        end
        sender.btn_scale_action_1 = cc.ScaleTo:create(0.2, 0.9 * sender.scale)
        sender:runAction(sender.btn_scale_action_1)
        self:btnChangeBright(sender, true)
    elseif eventType == ccui.TouchEventType.moved then
        local pos = sender:getTouchMovePosition()
        local anc = sender:getAnchorPoint()
        local init_s = sender:getContentSize()
        local n_pos = sender:convertToWorldSpace(cc.p(init_s.width / 2, init_s.height / 2))
        local size = sender:getContentSize()
        local rec = cc.rect(n_pos.x - init_s.width / 2, n_pos.y - init_s.height / 2, size.width, size.height)
        local isInside = cc.rectContainsPoint(rec, pos)
        if not sender.is_touch_inside or sender.is_touch_inside ~= isInside then
            sender.is_touch_inside = isInside
            self:btnChangeBright(sender, isInside)
        end
    elseif eventType == ccui.TouchEventType.ended or eventType == ccui.TouchEventType.canceled then
        sender.btn_scale_action_2 = cc.Sequence:create(cc.ScaleTo:create(0.2, 1.2 * sender.scale), cc.ScaleTo:create(0.1, 1.0 * sender.scale))
        sender:runAction(sender.btn_scale_action_2)
        self:btnChangeBright(sender, false)
    end
end

-- 按钮点击动画2
function ModalBaseView:btnClickAnim_2(sender, eventType)
    if eventType == ccui.TouchEventType.began then
        self:btnChangeBright(sender, true)
    elseif eventType == ccui.TouchEventType.moved then
        local pos = sender:getTouchMovePosition()
        local anc = sender:getAnchorPoint()
        local init_s = sender:getContentSize()
        local n_pos = sender:convertToWorldSpace(cc.p(init_s.width / 2, init_s.height / 2))
        local size = sender:getContentSize()
        local rec = cc.rect(n_pos.x - init_s.width / 2, n_pos.y - init_s.height / 2, size.width, size.height)
        local isInside = cc.rectContainsPoint(rec, pos)
        if not sender.is_touch_inside or sender.is_touch_inside ~= isInside then
            sender.is_touch_inside = isInside
            self:btnChangeBright(sender, isInside)
        end
    elseif eventType == ccui.TouchEventType.ended or eventType == ccui.TouchEventType.canceled then
        self:btnChangeBright(sender, false)
    end
end

-- 按钮点击动画3
function ModalBaseView:btnClickAnim_3(sender, eventType, moveDistance)
    if eventType == ccui.TouchEventType.began then
        for i, v in ipairs(sender:getChildren()) do
            v:setPositionY(v:getPositionY() - moveDistance);
        end
    elseif eventType == ccui.TouchEventType.moved then

    elseif eventType == ccui.TouchEventType.ended or eventType == ccui.TouchEventType.canceled then
        for i, v in ipairs(sender:getChildren()) do
            v:setPositionY(v:getPositionY() + moveDistance);
        end
    end
end

-- 按钮变色
function ModalBaseView:btnChangeBright(btn, isGray)
    if isGray then
        btn:runAction(cc.TintTo:create(0.1, 127, 127, 127))
    else
        btn:runAction(cc.TintTo:create(0.1, 255, 255, 255))
    end
    btn.is_touch_gray = isGray
end

--弹窗动画
function ModalBaseView:popWinAction(callback)
    -- local layout = self:getChildren()[1]:getChildren()[1]:getChildren()[1]
    local layout = self:getFirstLayout()
    if layout then
        -- layout:setVisible(false)
        layout:setScale(0.3)
        -- layout:runAction(cc.EaseBackOut:create(cc.Sequence:create(cc.ScaleTo:create(0.3,1.0))))
        layout:runAction(cc.Sequence:create(cc.ScaleTo:create(0.1, 1.0), cc.CallFunc:create(function()
            -- body
            if callback ~= nil then
                -- body
                callback()
            end
        end)))
    else
        performWithDelay(self, function()
            if callback ~= nil then
                -- body
                callback()
            end
        end, 0.1)
    end
end
--关闭弹窗动画
function ModalBaseView:closeWinAction(callback, node, para)
    local layout = self:getFirstLayout() or node
    if layout == nil then
        performWithDelay(self, function()
            self:removeFromParent()
            if callback then
                callback(para)
            end
        end, 0.1)
        return
    end
    layout:stopAllActions()
    layout:runAction(cc.Sequence:create(cc.ScaleTo:create(0.2, 0.001), cc.CallFunc:create(function()
        self:removeFromParent()
        if callback then
            callback(para)
        end
    end)))
    -- TimerDelayPerformEx(layout,function()
    --     if callback then callback(para) end 
    --     self:removeFromParent()
    -- end,0.2)
end

function ModalBaseView:getFirstLayout(node)
    -- if node == nil then node = self end
    -- local children = node:getChildren()
    -- if #children > 1 then
    --     return node
    -- else
    --     return self:getFirstLayout(children[1])
    -- end
    if not tolua.isnull(node) then
        return node
    end
    local ui = self:getChildren()[1]
    local panel_black = ui and ui:getChildren()[1] or nil
    local panel_main = panel_black and panel_black:getChildren()[1] or nil
    if panel_main then
        return panel_main
    elseif panel_black then
        return panel_black
    elseif ui then
        return ui
    else
        return self
    end
    return self:getChildren()[1]:getChildren()[1]:getChildren()[1]
end
function ModalBaseView:getStoreTag()
    return 168
end
--type  1  金币  2  钻石
function ModalBaseView:showStoreView(type, node, callback)
    -- if 0 == GameDataUser.shared().limitgift[1] then
    -- -- if GameDataUser.shared().isbuyfirstgift then
    --     -- local layer = require("src.app.Lobby.GiftBag.FristRechangeView").new(function()
    --     local layer = require("src.app.Lobby.GiftBag.GiftBagController").new(function()
    --         local layer = require("src.app.Lobby.Shop.ShopController").new({id = type})
    --         self:addChild(layer,10)
    --     end)
    --     self:addChild(layer,10)
    -- else
    --     local layer = require("src.app.Lobby.Shop.ShopController").new({id = type})
    --     self:addChild(layer,10)
    -- end
    self:showStoreViewEx(type, node, callback)
end
function ModalBaseView:showStoreViewEx(type, node, callback)
    local tag = self:getStoreTag()
    node = node or self
    if node:getChildByTag(tag) then
        return
    end

    local function showView()
        -- 直接显示商店
        if true then
            local layer = require("src.app.Lobby.Shop.ShopController").new({ id = type, callback = callback })
            node:addChild(layer, 10, tag)
            return
        end

        local num = 0
        for i, v in ipairs(GameDataUser.shared().limitgift) do
            num = v + num
        end
        if SwitchStatus.hideGiftBag then
            num = 3
        end
        if GameDataUser.shared().isbuyfirstgift then
            local layer = require("src.app.Lobby.GiftBag.FristRechangeView").new(function()
                local layer = require("src.app.Lobby.Shop.ShopController").new({ id = type, callback = callback })
                node:addChild(layer, 10, tag)
            end)
            node:addChild(layer, 10, tag)
        elseif num < 3 then
            -- if GameDataUser.shared().isbuyfirstgift then
            -- local layer = require("src.app.Lobby.GiftBag.FristRechangeView").new(function()
            local layer = require("src.app.Lobby.GiftBag.GiftBagController").new(function()
                local layer = require("src.app.Lobby.Shop.ShopController").new({ id = type, callback = function()
                    local layer = require("src.app.Lobby.GiftBag.FreePlayGiftView").new(callback)
                    node:addChild(layer, 10, tag)
                end })
                node:addChild(layer, 10, tag)
            end)
            node:addChild(layer, 10, tag)
        else
            local layer = require("src.app.Lobby.GiftBag.FreePlayGiftView").new(function()
                local layer = require("src.app.Lobby.Shop.ShopController").new({ id = type, callback = callback })
                node:addChild(layer, 10, tag)
            end)
            node:addChild(layer, 10, tag)
        end
    end

    if ChannelCfgs.sdk and ChannelCfgs.sdk.getRealName then
        -- 渠道包
        local realReadName = ChannelCfgs.sdk.getRealName()
        if realReadName == 0 and GameDataUser.shared().verification == 0 then
            local layer = require("src.app.Lobby.ReadName.channelReadNameLayer").new(showView)
            node:addChild(layer, 10, tag)
            return
        end
    end
    showView()
end
function ModalBaseView:showStoreViewInGame(type, node, callback)
    local roomtype = nil
    if self.serverManager then
        roomtype = self.serverManager.serverName
    end
    local tag = self:getStoreTag()
    node = node or self
    if node:getChildByTag(tag) then
        return
    end

    local function showView()
        if 1 == type then
            local num = 0
            for i, v in ipairs(GameDataUser.shared().limitgift) do
                num = v + num
            end
            if GameDataUser.shared().isbuyfirstgift then
                local layer = require("src.app.Lobby.GiftBag.FristRechangeView").new(function()
                    local layer = require("src.app.Lobby.GiftBag.FreePlayGiftView").new(nil, roomtype)
                    node:addChild(layer, 10, tag)
                end)
                node:addChild(layer, 10, tag)
                --elseif num < 3 then
                --    local layer = require("src.app.Lobby.GiftBag.GiftBagController").new(function()
                --        local layer = require("src.app.Lobby.GiftBag.FreePlayGiftView").new(nil, roomtype)
                --        node:addChild(layer, 10, tag)
                --    end)
                --    node:addChild(layer, 10, tag)
            else
                local layer = require("src.app.Lobby.GiftBag.FreePlayGiftView").new(nil, roomtype)
                node:addChild(layer, 10, tag)
            end
        elseif 2 == type then
            local layer = require("src.app.Lobby.Shop.ShopController").new({ id = type, callback = callback })
            node:addChild(layer, 10, tag)
        else
            if callback then
                callback()
            end
        end
    end

    if ChannelCfgs.sdk and ChannelCfgs.sdk.getRealName then
        -- 渠道包
        local realReadName = ChannelCfgs.sdk.getRealName()
        if realReadName == 0 and GameDataUser.shared().verification == 0 then
            local layer = require("src.app.Lobby.ReadName.channelReadNameLayer").new(showView)
            node:addChild(layer, 10, tag)
            return
        end
    end
    showView()
end

function ModalBaseView:showGiftBagView(type)
    if SwitchStatus.hideGiftBag then
        return
    end
    local function callback()
        local num = 0
        for i, v in ipairs(GameDataUser.shared().limitgift) do
            num = v + num
        end
        if num < 3 then
            --local layer = require("src.app.Lobby.GiftBag.GiftBagController").new()
            --self:addChild(layer,10)
        end
    end
    if not GameDataUser.shared().isbuyfirstgift then
        callback()
    else
        local layer = require("src.app.Lobby.GiftBag.FristRechangeView").new(callback)
        self:addChild(layer, 10)
    end
    -- callback()
end

--显示奖励弹窗 awards = {{
--             propNum = "1111",
--             propImgName = Prop.gem,
--         },
--         {
--             propNum = "2222",
--             propImgName = Prop.props[21],
--         },}
--isShowAll是否所有奖励一个个显示
function ModalBaseView:showMultiRewardView(awards, callback, node, isShowAll)
    local singlerewordView
    if isShowAll then
        local tmpAwards = deepCopy(awards)
        local function callFunc()
            local tmpAward = { tmpAwards[1] }
            table.remove(tmpAwards, 1)
            local tmpCallFunc = callFunc
            if #tmpAwards == 0 then
                tmpCallFunc = callback
            end
            singlerewordView = require("src.app.Lobby.EveryReward.MultiRewardView").new()
            if node then
                node:addChild(singlerewordView, 10)
            else
                self:addChild(singlerewordView, 10)
            end
            singlerewordView:rewardAni(tmpAward, tmpCallFunc)
        end
        callFunc()
    else
        singlerewordView = require("src.app.Lobby.EveryReward.MultiRewardView").new()
        if node then
            node:addChild(singlerewordView, 10)
        else
            self:addChild(singlerewordView, 10)
        end
        singlerewordView:rewardAni(awards, callback)
    end
    return singlerewordView
end



--传入的数据为 repeated PBGameRewardInfo reward
function ModalBaseView:showMultiRewardView2(propList, callback, node)
    -- body
    local props = {};

    -- body
    for i, v in ipairs(propList) do
        local propSub = {};
        propSub.propNum = v.rewardvalue;
        local testImg
        if v.rewardtype == 1 then

            testImg = Prop.gold
        elseif v.rewardtype == 2 then

            testImg = Prop.money
        elseif v.rewardtype == 3 then

            testImg = Prop.gem
        else

            testImg = Prop.props[v.rewardsubtype]
        end
        propSub.propImgName = testImg;

        table.insert(props, propSub);
    end
    self:showMultiRewardView(props, callback, node)
end

function ModalBaseView:isOkOrLimit(orLimit)
    -- 是否满足联合条件中的一个
    local userData = GameDataUser.shared()
    local multMax = orLimit.multMax
    local multMin = orLimit.multMin
    local goldMin = orLimit.goldMin
    local energyMin = orLimit.energyMin
    local vipLimit = orLimit.vipLimit
    local flag = (multMax and userData.battery_multiple < multMax)
    flag = flag or (multMin and userData.battery_multiple >= multMin)
    flag = flag or (goldMin and userData.goldNum >= goldMin)
    flag = flag or (energyMin and userData.energyNum >= energyMin)
    flag = flag or (vipLimit and userData.vipLevel >= vipLimit)
    return flag
end

function ModalBaseView:enterGameScene(fisheryId, call, roomType)
    local RoomTypeConfig = require("src.config.RoomTypeConfig")
    local userData = GameDataUser.shared()
    local gameConfig = gameConfigs[1]
    local roomConfig = RoomTypeConfig[gameConfig.roomType[fisheryId]]
    if roomType then
        roomConfig = RoomTypeConfig[roomType]
    end
    if roomConfig then
        local function showGift(giftIndex)
            -- 机械迷城入场礼包
            local para = {
                giftIndex = giftIndex,
            }
            local layer = require("src.app.Lobby.GiftBag.BrokenEnergyGift").new(para)
            self:addChild(layer, 10)
        end
        local function enterGame()
            if call then
                call()
            end
            SceneManager:enterGameScene(fisheryId)
        end
        local orLimit = roomConfig.orLimit
        if orLimit then
            -- 满足一个条件即可入场
            local multMax = orLimit.multMax
            local multMin = orLimit.multMin
            local goldMin = orLimit.goldMin
            local energyMin = orLimit.energyMin
            local vipLimit = orLimit.vipLimit
            local flag = (multMax and userData.battery_multiple < multMax)
            flag = flag or (multMin and userData.battery_multiple >= multMin)
            flag = flag or (goldMin and userData.goldNum >= goldMin)
            flag = flag or (energyMin and userData.energyNum >= energyMin)
            flag = flag or (vipLimit and userData.vipLevel >= vipLimit)
            if flag then
                enterGame()
                return
            else
                if multMin and energyMin then
                    local giftIndex = 176
                    if roomType == 5100 then
                        giftIndex = 178
                    end
                    local tips = string.format("需要%s能量才能解锁！", transformUnitNum(roomConfig.energyMin))
                    DialogManager.alert(tips, function()
                        showGift(giftIndex)
                    end)
                    return
                end
            end
        else
            if roomConfig.multMax and userData.battery_multiple >= roomConfig.multMax then
                DialogManager.alert(TXTCfg.multMaxTip)
                return
            end
            if roomConfig.multMin and userData.battery_multiple < roomConfig.multMin then
                if roomType == 5100 then
                    DialogManager.alert(string.format("需要%s倍炮才能解锁！", roomConfig.multMin), function()
                        showGift(178)
                    end)
                    return
                end
                DialogManager.alert(string.format(TXTCfg.multMinTip, roomConfig.multMin))
                return
            end
            if roomConfig.goldMin and userData.goldNum < roomConfig.goldMin then
                DialogManager.alert(string.format("需要%s金币才能解锁！", transformUnitNum(roomConfig.goldMin)), function()
                    local tag = self:getStoreTag()
                    local layer = require("src.app.Lobby.GiftBag.FreePlayGiftView").new(nil, roomType, false, 6)
                    self:addChild(layer, 10, tag)
                end)
                return
            end
            if roomConfig.energyMin and userData.energyNum < roomConfig.energyMin then
                local giftIndex = 176
                if roomType == 5100 then
                    giftIndex = 178
                end
                DialogManager.alert(string.format("需要%s能量才能解锁！", transformUnitNum(roomConfig.energyMin)), function()
                    showGift(giftIndex)
                end)
                return
            end
            if roomConfig.vipLimit and userData.vipLevel < roomConfig.vipLimit then
                alert(string.format(TXTCfg.vipMinTip, roomConfig.vipLimit))
                return
            end
            enterGame()
        end
    end
end

function ModalBaseView:FastJoinGame()
    local roomType = GameDataUser.shared():getFastJoinGameType()
    GameDataUser.shared().roomIndex = roomType / 100
    self:enterGameScene(roomType / 100)
end

--初始化跑马灯
function ModalBaseView:initWorldNotification(noticeType, positionY, noticeSize)

    local function cutRepeat(data)
        for i, v in ipairs(self.worldNoticeData) do
            if v.llMsgSendTime == data.llMsgSendTime or (data.msgtype == 102 and v.dwUserID == data.dwUserID) then
                table.remove(self.worldNoticeData, i)
            end
        end
        table.insert(self.worldNoticeData, data)
        local num = 0
        for i = #self.worldNoticeData, 1, -1 do
            if self.worldNoticeData[i].msgtype == 102 then
                num = num + 1
                if num > 1 then
                    table.remove(self.worldNoticeData, i)
                end
            end
        end
        num = 0
        for i = #self.worldNoticeData, 1, -1 do
            if self.worldNoticeData[i].msgtype == 104 then
                num = num + 1
                if num > 1 then
                    table.remove(self.worldNoticeData, i)
                end
            end
        end
        if #self.worldNoticeData > 10 then
            for i, v in ipairs(self.worldNoticeData) do
                if v.msgtype ~= 102 then
                    table.remove(self.worldNoticeData, i)
                    break
                end
            end
        end

        print("#self.worldNoticeData2:", #self.worldNoticeData)

        table.sort(self.worldNoticeData, function(a, b)
            return a.dwUserID > b.dwUserID
        end)

    end

    local function getNoticeList(noticeType)
        if noticeType == self.NoticeType.room then
            return GameDataUser.shared().roomNoticeList
        elseif noticeType == self.NoticeType.lobby then
            return GameDataUser.shared().roomNoticeList
        else
            return GameDataUser.shared().gameNoticeList
        end
    end

    local function getNoticeIndex(noticeType)
        if noticeType == self.NoticeType.room then
            return GameDataUser.shared().roomNoticeIndex
        elseif noticeType == self.NoticeType.lobby then
            return GameDataUser.shared().noticeIndex
        else
            return GameDataUser.shared().gameNoticeIndex
        end
    end

    local function setNoticeIndex(noticeType, value)
        if noticeType == self.NoticeType.room then
            GameDataUser.shared().roomNoticeIndex = value
        elseif noticeType == self.NoticeType.lobby then
            GameDataUser.shared().noticeIndex = value
        else
            GameDataUser.shared().gameNoticeIndex = value
        end
    end

    local function updateWorldInfoCall(data)
        -- if SceneManager:getCurrentGame() == 1 then return end
        if getNoticeList(noticeType) == nil or #getNoticeList(noticeType) < 1 then
            return
        end
        --if data.msgtype ~= noticeType and data.msgtype ~= self.NoticeType.game then return end
        cutRepeat(data)
        if not self.noticeNode then
            local function callFunc()
                self.noticeNode = nil
            end
            local noticeIndex = getNoticeIndex(noticeType)
            setNoticeIndex(noticeType, getNoticeIndex(noticeType) + 1)
            if getNoticeIndex(noticeType) > #getNoticeList(noticeType) then
                setNoticeIndex(noticeType, 1)
            end
            print("getNoticeIndex(noticeType)", getNoticeIndex(noticeType))
            if not SwitchStatus.hideStaticMsg then
                self.noticeNode, self.noticeBack, self.noticeTop, self.noticeBtn = ClippingNodeUtils:createNotableLabel({
                    contents = { { content = data.content or getNoticeList(noticeType)[getNoticeIndex(noticeType)].content,
                                   dwUserID = data.userID or getNoticeList(noticeType)[getNoticeIndex(noticeType)].dwUserID } },
                    delay = 15,
                    posY = positionY or display.height * 0.73,
                    parent = self,
                    size = noticeSize or cc.size(display.width * 0.55, 40),
                    callBack = callFunc,
                    zOrder = 0,
                    fontsize = 25,
                    --  diffx = 150 * (1-E.scale.x) + display.width * 0.14/2,
                    --  scale = 0.9,
                    fontName = Lres.Common.Font,
                    -- onClick =  handler(self, self.onClickNotice),
                    speed = 60,
                    remove = false,
                    onClick = function()
                        addEffect(MusicCfg.ClickEffect)
                        self:showWorldMsgList()
                        self:updateWorldMsgList(getNoticeList(noticeType))
                    end
                })
            end
        else
            if self.noticeNode and getNoticeList(noticeType) then
                self.noticeNode.contents = getNoticeList(noticeType)
            end
            if SwitchStatus.hideStaticMsg then
                self.noticeNode:hide()
            end
            -- print("self.noticeNode.contents")
            -- dump(self.noticeNode.contents)
        end
    end
    self.noticeNode = nil
    self.worldNoticeData = {}
    self.worldTipScheduler = GameDataUser.shared():addNotify(NoticeCgf.NOTICE_INFORM, updateWorldInfoCall)
end

--清除公告消息监听
function ModalBaseView:clearNoticeMsg()
    if self.worldTipScheduler then
        GameDataUser.shared():removeNotify(NoticeCgf.NOTICE_INFORM, self.worldTipScheduler)
    end
end
--初始化聊天消息提示
--para  = {
--     iconConfig = {
--          pos = cc.p(0,0)
--          parent = self
--     },
--     tipsConfig = {

--     }
-- }
function ModalBaseView:initChatTips(para)
    para.tipsConfig = para.tipsConfig or {}
    local icon
    local mark
    local userData = GameDataUser.shared()
    if para.iconConfig then
        icon = ccui.Button:create("home_main_friend_fish2.png", "home_main_friend_fish2.png", "home_main_friend_fish2.png", 1)
        icon:setPosition(para.iconConfig.pos)
        mark = cc.Sprite:createWithSpriteFrameName("icon_red_mark_fish2.png")
        mark:setVisible(false)
        mark:setPosition(cc.p(icon:getContentSize().width * 0.95, icon:getContentSize().height * 0.8))
        icon:addChild(mark)
        if para.iconConfig.parent then
            para.iconConfig.parent:addChild(icon, para.iconConfig.zOrder or 0)
        else
            self:addChild(icon, para.iconConfig.zOrder or 0)
        end
        self.hasNewMsg = userData:addNotify(NoticeCgf.RecvDialogueMsg, function()
            mark:setVisible(userData.isChatHasNewFriend or userData.isHasNewMsg)
        end)

        self:initBtnHandler(icon, function(sender)
            local layer = require("src.app.Lobby.FriendChat.FriendsListController").new()
            self:addChild(layer)
        end, true)
    end

    local showNewFriendMsgFun = function()
        if mark then
            mark:setVisible(userData.isChatHasNewFriend or userData.isHasNewMsg)
        end
        if userData.isChatHasNewFriend then
            local callFunc = function()
                userData:setChatHasNewFriend(false)
                ClippingNodeUtils:clearChatTips(para.tipsConfig.parent or self)
                if icon then
                    icon.chatTips = nil
                end
                if not self:getChildByName("FriendsListController") then
                    local layer = require("src.app.Lobby.FriendChat.FriendsListController").new()
                    self:addChild(layer)
                    layer:setName("FriendsListController")
                end
            end
            -- if GameDataUser.shared().isInFriendController then
            --     return
            -- end
            local data = {
                posY = para.tipsConfig.posY,
                callBack = callFunc,
                parent = para.tipsConfig.parent or self,
                fontName = Lres.Common.Font,
                contents = "有新好友添加申请",
                zOrder = para.tipsConfig.zOrder
            }
            local chatTips = ClippingNodeUtils:createChatTips(data)
            if icon then
                icon.chatTips = chatTips
            end
        end
    end

    self.hasNewFriendMsg = userData:addNotify(NoticeCgf.ChatHasNewFriend, showNewFriendMsgFun)
    showNewFriendMsgFun()

    local showMsgFun = function(pbData)
        local callFunc = function()
            userData:setChatHasNewMsg(false)
            ClippingNodeUtils:clearChatTips(para.tipsConfig.parent or self)
            if icon then
                icon.chatTips = nil
            end
            if not self:getChildByName("FriendChatController") then
                local layer = require("src.app.Lobby.FriendChat.FriendChatController").new({ friendId = pbData.sendInfo.dwUserID, nickName = pbData.sendInfo.szNickName })
                self:addChild(layer)
                layer:setName("FriendChatController")
            end
        end
        -- if GameDataUser.shared().isInFriendController then
        --     return
        -- end
        local data = {
            posY = para.tipsConfig.posY,
            callBack = callFunc,
            parent = para.tipsConfig.parent or self,
            fontName = Lres.Common.Font,
            contents = pbData.content,
            isNewMsg = true,
            head = Lres.Common.iconAry[pbData.sendInfo.iconid] or Lres.Common.iconAry[1],
            nickName = pbData.sendInfo.szNickName,
            zOrder = para.tipsConfig.zOrder,
            isHideHead = para.tipsConfig.isHideHead
        }
        local chatTips = ClippingNodeUtils:createChatTips(data)
        if icon then
            icon.chatTips = chatTips
        end
    end

    self.dialogueMsg = MsgManager.shared():addNotify(NoticeCgf.RecvDialogueMsg, showMsgFun)

    if userData.newMsgData then
        showMsgFun(userData.newMsgData)
    end

    return icon
end

function ModalBaseView:clearChatTipsMsg()
    if self.hasNewFriendMsg then
        GameDataUser.shared():removeNotify(NoticeCgf.ChatHasNewFriend, self.hasNewFriendMsg)
    end
    if self.dialogueMsg then
        MsgManager.shared():removeNotify(NoticeCgf.RecvDialogueMsg, self.dialogueMsg)
    end
    if self.hasNewMsg then
        GameDataUser.shared():removeNotify(NoticeCgf.RecvDialogueMsg, self.hasNewMsg)
    end
end

-- 显示世界聊天列表
function ModalBaseView:showWorldMsgList()
    local ui = ViewBase.new({ csb = Lres.Lobby.world_news, setSize = true })
    self.worldMsgCsbNode = ui
    self:getParent():addChild(ui, 9999)

    local panel_black = ui:getChildByName("panel_black")
    local panel_main = panel_black:getChildByName("panel_main")
    local panel_content = panel_main:getChildByName("panel_content")
    self.worldMsgList = panel_content:getChildByName("List_item")

    local btn_close = panel_main:getChildByName("btn_close")
    self:initBtnHandler(btn_close, function()
        addEffect(MusicCfg.ClickEffect)
        ui:removeFromParent()
        self.worldMsgCsbNode = nil
    end)
end

function ModalBaseView:updateWorldMsgList(noticeList)
    if self.worldMsgList then
        self.worldMsgList:removeAllItems()
        local item = self.worldMsgList:getParent():getChildByName("Panel_item")
        local item0 = self.worldMsgList:getParent():getChildByName("Panel_item_0")
        item0:setVisible(false)
        item:setVisible(false)
        local function initItem(item, info)
            item:setVisible(true)
            local txt_content = item:getChildByName("Text_content")
            local content, strColor = getContentColor(info.content, {
                { startChar = "#Y", endChar = "Y#", color = cc.c3b(245, 218, 84) },
                { startChar = "#R", endChar = "R#", color = cc.c3b(255, 0, 0) },
                { startChar = "#G", endChar = "G#", color = cc.c3b(25, 218, 25) },
                { startChar = "#O", endChar = "O#", color = cc.c3b(255, 165, 0) },
            })
            local label = ccui.Text:create(content, "Arial", 25)
            label:setFontName(Lres.Common.Font)
            self:txtAutoWidth(label, 920 * (display.width / 1280))
            for i, v in ipairs(strColor) do
                if v.startIdx > 0 and v.endIdx > 1 then
                    for i = v.startIdx, v.endIdx - 1 do
                        label:getLetter(i):setColor(v.color)
                    end
                end
            end
            label:setAnchorPoint(0, 0.5)
            label:setPosition(cc.p(txt_content:getPosition()))
            item:addChild(label)
            txt_content:setVisible(false)
        end
        for i, v in ipairs(noticeList) do
            local newItem = item:clone()
            initItem(newItem, v)
            --self.worldMsgList:insertCustomItem(newItem, 0)
            self.worldMsgList:pushBackCustomItem(newItem)
        end
    end
end

-- 文本宽度自适应
function ModalBaseView:txtAutoWidth(txt, max)
    local scale = 1
    local width = txt:getContentSize().width
    if width > max then
        scale = max / width
        txt:setScale(scale)
    end
    return scale
end

-- 获得关于中心点centerPos对称的一组点，个数为num个, 间距为w
function ModalBaseView:getCenterSortPos(centerPos, num, w)
    if num <= 0 then
        return {}
    end

    local x, y = centerPos.x, centerPos.y
    local mid = math.floor(num / 2)
    local startPos = num % 2 == 0 and cc.p(x - (mid - 0.5) * w, y) or cc.p(x - mid * w, y)
    local posT = { startPos }
    for i = 2, num do
        local lastPos = posT[i - 1]
        local newPos = { x = lastPos.x + w, y = lastPos.y }
        posT[i] = newPos
    end
    return posT
end

function ModalBaseView:addTouchLayer(parent, zOrder, beganCall, moveCall, endCall)
    local layer = cc.Layer:create()
    layer:setAnchorPoint(0, 0)
    layer:setContentSize(display.size)
    layer:setPosition(cc.p(0, 0))
    layer:setLocalZOrder(zOrder)
    layer:addTo(parent)

    local listener = cc.EventListenerTouchOneByOne:create()
    listener:registerScriptHandler(function(touch, event)
        if beganCall then
            beganCall(touch, event)
        end
        local flag = parent.isCanTouch == nil and true or parent.isCanTouch
        return flag
    end, cc.Handler.EVENT_TOUCH_BEGAN)

    listener:registerScriptHandler(function(touch, event)
        if moveCall then
            moveCall(touch, event)
        end
    end, cc.Handler.EVENT_TOUCH_MOVED)

    listener:registerScriptHandler(function(touch, event)
        if endCall then
            endCall(touch, event)
        end
    end, cc.Handler.EVENT_TOUCH_ENDED)

    local eventDispatcher = parent:getEventDispatcher()
    eventDispatcher:addEventListenerWithSceneGraphPriority(listener, layer)

    return layer
end

function ModalBaseView:getNameAndNum(giftInfo, gemIdx, bulletFlag, goldIdx, redIdx)
    local propName = ""
    local imgName = ""
    gemIdx = gemIdx or 3
    goldIdx = goldIdx or 1
    redIdx = redIdx or 1
    local num = giftInfo.rewardvalue
    if giftInfo.rewardtype == 1 then
        local imgNames = { Prop.gold, Prop.gold2 }
        imgName = imgNames[goldIdx]
        propName = PropName[giftInfo.rewardtype]
    elseif giftInfo.rewardtype == 2 then
        imgName = Prop.money
        num = tostring(giftInfo.rewardvalue / 100)
        propName = PropName[giftInfo.rewardtype]
    elseif giftInfo.rewardtype == 3 then
        local names = { Prop.gem, Prop.gem2, Prop.gem3 }
        imgName = names[gemIdx]
        propName = PropName[giftInfo.rewardtype]
    else
        imgName = Prop.props[giftInfo.rewardsubtype]
        if PropName[giftInfo.rewardtype] then
            propName = PropName[giftInfo.rewardtype][giftInfo.rewardsubtype]
        end
        if giftInfo.rewardtype == 4 then
            if giftInfo.rewardsubtype == PropId.redpackage then
                propName = "红包"
                local imgNames = {
                    "btn_card_hlbydz.png",
                    "icon_red_bag_warhead_exchange_energy_hlbydz.png",
                }
                imgName = imgNames[redIdx]
            elseif giftInfo.rewardsubtype >= PropId.bullet1 and giftInfo.rewardsubtype <= PropId.bullet6 then
                if bulletFlag then
                    imgName = Prop.props[giftInfo.rewardsubtype]
                else
                    imgName = Bullet[giftInfo.rewardsubtype]
                end
            elseif giftInfo.rewardsubtype == PropId.engery then
                propName = "能量"
                imgName = "img_energy_gift_recharge_energy_hlbydz.png"
            elseif giftInfo.rewardsubtype == PropId.coin then
                propName = "金币"
                local imgNames = { Prop.gold, Prop.gold2 }
                imgName = imgNames[goldIdx]
            elseif giftInfo.rewardsubtype == PropId.diamond then
                propName = "钻石"
                local names = { Prop.gem, Prop.gem2, Prop.gem3 }
                imgName = names[gemIdx]
            end
        end
    end
    return imgName, propName, num
end

function ModalBaseView:refreshUserInfo(panel, data)
    local panel_vip = panel:getChildByName("panel_vip")
    local txt_vip = panel_vip:getChildByName("vip_num")
    txt_vip:setProperty("", "res/ImgsFolder1/AtlasNum/atlas_num_chat_hlbydz.png", 15, 24, ".")
    txt_vip:setString(data.viprank or data.viplv or 0)
    local img_avatar = panel:getChildByName("img_avatar")
    img_avatar:ignoreContentAdaptWithSize(true)
    img_avatar:loadTexture(Lres.Common.iconAry[data.iconid], 1)
end

-- 显示用户信息
function ModalBaseView:showUserInfoView(userInfo, isFriend, isPriChat, parent, isMyself)
    local ui = ViewBase.new({ csb = Lres.Redpack.widget8, setSize = true })
    parent:addChild(ui)
    self.userInfoView = ui

    local panel_black = ui:getChildByName("panel_black")
    local panel_main = panel_black:getChildByName("Panel_main")
    local panel_player_info = panel_main:getChildByName("Panel_player_info")
    local panel_avatar = panel_player_info:getChildByName("panel_avatar")
    local txt_nick = panel_player_info:getChildByName("Text_nickname")
    local nick = GetShortName(userInfo.szNickName, 14, 12)
    txt_nick:setString(nick)
    local panel_sign = panel_player_info:getChildByName("Panel_sign"):hide()
    --local txt_user_id = panel_player_info:getChildByName("Text_user_id")
    --txt_user_id:hide()
    --txt_user_id:setString(string.format("游戏id: %d", userInfo.dwUserID))
    self:refreshUserInfo(panel_avatar, userInfo)
    local btn_chat = panel_main:getChildByName("btn_chat")
    local btn_friend = panel_main:getChildByName("btn_friend")
    local btn_close = panel_main:getChildByName("btn_close")
    local function btnCall(btn)
        if btn == btn_close then
            addEffect(MusicCfg.BackEffect)
        else
            addEffect(MusicCfg.ClickEffect)
        end
        if btn == btn_chat then
            local priChatLayer = require("src.app.Lobby.RedPackage.FriendPriChatView").new(userInfo)
            parent:addChild(priChatLayer)
        elseif btn == btn_friend then
            if not isFriend then
                local str = "请求添加你为好友"
                local userID = userInfo.dwUserID
                ChatSendManager.shared():repFriendAdd(userID, str, userID)
            else
                local tipStr = string.format("您确定要删除好友%s吗?", userInfo.szNickName or "")
                alert(tipStr, function(sender, flag)
                    if flag then
                        local userID = userInfo.dwUserID
                        ChatSendManager.shared():repFriendDel(userID, userID)
                    end
                end)
            end
        elseif btn == btn_close then
            ui:removeFromParent()
            MsgManager.shared():removeNotify(NoticeCgf.UserInfoReturn, self.userInfoMsg)
            self.userInfoView = nil
        end
    end
    self:initBtnHandler(btn_close, btnCall)
    self:initBtnHandler(btn_friend, btnCall)
    self:initBtnHandler(btn_chat, btnCall)
    if isFriend then
        btn_friend:getChildByName("text_btn"):setString("删除好友")
    end
    if isPriChat then
        btn_chat:hide()
        btn_friend:setPositionX(panel_main:getContentSize().width / 2)
    end
    ChatSendManager.shared():reqUserInfo(userInfo.dwUserID)
    self.userInfoMsg = MsgManager.shared():addNotify(NoticeCgf.UserInfoReturn, function(pbData)
        panel_sign:show()
        local info = pbData.info
        local sign = info.signature or ""
        local txt_sign = panel_sign:getChildByName("Text_sign")
        if sign == "" or #sign < 1 then
            panel_sign:hide()
        else
            local space = "                "
            txt_sign:setString(string.format("%s%s", space, sign))
        end
    end)
    if isMyself then
        btn_chat:hide()
        btn_friend:hide()
    end
end

-- 显示规则界面
function ModalBaseView:showRuleView()
    local ui = ViewBase.new({ csb = Lres.ActivityInfo.ruleView, setSize = true })
    self.parent:addChild(ui, 999)
    ui:setAnchorPoint(0, 0)
    ui:setPosition(0, 0)

    local panel_black = ui:getChildByName("Panel_black")
    local panel_main = panel_black:getChildByName("Panel_main")
    panel_main:setBackGroundImage("res/ImgsFolder1/bgIMGjpgs/bg_pop_action_take_card_hlbydz.png", 0)
    local txt_rule = panel_main:getChildByName("Text_rule")
    txt_rule:setString(self.data.remark)
    local btn_close = panel_main:getChildByName("btn_close")
    self:initBtnHandler(btn_close, function()
        addEffect(MusicCfg.BackEffect)
        ui:removeFromParent()
    end)
end

function ModalBaseView:getOldPrice(data)
    local money = 0
    for i, v in pairs(data) do
        if v.rewardtype == 1 then
            -- 金币 1元 = 5000
            money = money + v.rewardvalue / 5000
        elseif v.rewardtype == 4 then
            -- 道具
            if v.rewardsubtype == PropId.aim then
                -- 锁定 0.2元一个
                money = money + v.rewardvalue * 0.2
            elseif v.rewardsubtype == PropId.rage then
                -- 狂暴 2元一个
                money = money + v.rewardvalue * 2
            elseif v.rewardsubtype == PropId.summon then
                -- 召唤 0.2元一个
                money = money + v.rewardvalue * 0.2
            elseif v.rewardsubtype == PropId.horn then
                -- 食人鱼号角 5元一个
                money = money + v.rewardvalue * 5
            elseif v.rewardsubtype == PropId.redpackage then
                -- 红包 (红包 分 为单位， 1元 = 100红包)
                money = money + v.rewardvalue / 100
            elseif v.rewardsubtype == PropId.engery then
                -- 能量 1元 = 5000
                money = money + v.rewardvalue / 5000 / EnergyMult
            end
        end
    end
    return money
end

function ModalBaseView:showNodeAni(node, call)
    node:setScale(0)
    local scaleTo = cc.ScaleTo:create(0.1, 1)
    node:runAction(cc.Sequence:create(
            scaleTo,
            cc.CallFunc:create(function()
                if call then
                    call()
                end
            end)
    ))
end

function ModalBaseView:hideNodeAni(node, call)
    local scaleTo = cc.ScaleTo:create(0.1, 0)
    node:runAction(cc.Sequence:create(
            scaleTo,
            cc.CallFunc:create(function()
                if call then
                    call()
                end
            end)
    ))
end

-- 长按加减按钮定时器
function ModalBaseView:startLongKeep(call)
    local function update()
        if call then
            call()
        end
    end
    if not self.longKeepScheduler then
        local scheduler = cc.Director:getInstance():getScheduler()
        self.longKeepScheduler = scheduler:scheduleScriptFunc(update, 0.1, false)
    end
end

-- 关闭定时器
function ModalBaseView:stopLongKeep()
    if self.longKeepScheduler then
        local scheduler = cc.Director:getInstance():getScheduler()
        scheduler:unscheduleScriptEntry(self.longKeepScheduler)
        self.longKeepScheduler = nil
    end
end

return ModalBaseView