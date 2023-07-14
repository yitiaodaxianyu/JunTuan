---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2021/6/23 18:57
---

-- 排行榜界面
local RankView = class("RankView", ViewBase)

local rankType = {
    monsterKill = 1,        -- 怪物击杀榜
    gemCost = 2             -- 钻石消耗榜
}

local timeFlag = {
    yesterday = 0,          -- 昨日排行
    today = 1,              -- 今日排行
}

function RankView:ctor(para)
    self:enableNodeEvents()
    self:initData(para)
end

function RankView:onEnter()
    self:initView()
    self:addNotify()

    -- 默认请求钻石消耗榜的信息
    local type = rankType.gemCost
    local isNew = timeFlag.today
    self:sendRankList(type, isNew)
end

function RankView:initData(para)
    self.rankListData = {}
    self.curRankType = rankType.gemCost
    self.curTimeType = timeFlag.today
end

function RankView:initView()
    local para = {
        csb = JunTuanCfg.csbCfg.homeView.rank_list,
        setSize = true
    }
    local ui = ViewBase:createCSB(para)
    self:addChild(ui)

    local panel_black = ui:getChildByName("Panel_black")
    local panel_main = panel_black:getChildByName("Panel_main")
    self:createAni(panel_main)

    local panel_check = panel_main:getChildByName("Panel_check")
    local panel_list = panel_main:getChildByName("Panel_list")
    self:initPanelCheck(panel_check)
    self:initPanelList(panel_list)

    local btn_close = panel_main:getChildByName("btn_close")
    local btn_receive = panel_main:getChildByName("btn_receive"):hide()
    self.btn_receive = btn_receive
    local function btnCall(btn)
        if btn == btn_close then
            self:destroyAni(panel_main, function()
                self:removeFromParent(true)
            end)
        elseif btn == btn_receive then
            self:sendGetReward()
        end
    end
    ExternalTools:addBtnTouchEventListener(btn_close, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_receive, btnCall)
end

-- 设置排行榜按钮样式
function RankView:setBtnStyle(idx)
    local normal = "btn_check_sel_ranking_list_jtdzz.png"
    local select = "btn_check_nor_ranking_list_jtdzz.png"
    for i, v in pairs(self.btnList) do
        if i == idx then
            v:loadTextures(select, select, select, 1)
        else
            v:loadTextures(normal, normal, normal, 1)
        end
    end
end

-- 设置昨日今日按钮样式
-- idx 1 今日，0昨日
function RankView:setBtnTimeStyle(idx)
    local normal = "btn_check_sel_ranking_list_jtdzz.png"
    local select = "btn_check_nor_ranking_list_jtdzz.png"
    for i, v in pairs(self.btnTimeList) do
        if i == idx then
            v:loadTextures(select, select, select, 1)
        else
            v:loadTextures(normal, normal, normal, 1)
        end
    end
end

function RankView:initPanelCheck(panel)
    local btn_rank_1 = panel:getChildByName("btn_rank_1")       -- 钻石消耗榜
    local btn_rank_2 = panel:getChildByName("btn_rank_2")       -- 怪物击杀榜
    self.btnList = {
        [rankType.monsterKill] = btn_rank_2,
        [rankType.gemCost] = btn_rank_1
    }
    local function btnCall(btn)
        if btn == btn_rank_1 then
            if self.curRankType ~= rankType.gemCost then
                local type = rankType.gemCost
                local isNew = timeFlag.today
                self:sendRankList(type, isNew)
            end
        elseif btn == btn_rank_2 then
            if self.curRankType ~= rankType.monsterKill then
                local type = rankType.monsterKill
                local isNew = timeFlag.today
                self:sendRankList(type, isNew)
            end
        end
    end
    ExternalTools:addBtnTouchEventListener(btn_rank_1, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_rank_2, btnCall)

    local rankActList = UserData.Shared().rankActList
    btn_rank_1:setVisible(rankActList[rankType.gemCost].status == 1)
    btn_rank_2:setVisible(rankActList[rankType.monsterKill].status == 1)
end

function RankView:showRankList()
    self:setBtnStyle(self.curRankType)
    self:setBtnTimeStyle(self.curTimeType)
    self:refreshListView()
    local titles = { "怪物击杀数", "钻石消耗数" }
    self.txt_title:setString(titles[self.curRankType])
end

function RankView:initPanelList(panel)
    local panel_title = panel:getChildByName("Panel_title")
    local panel_mask = panel:getChildByName("Panel_mask")
    self.panel_item_my = panel:getChildByName("Panel_item_my")
    self.txt_title = panel_title:getChildByName("Text_title_3")
    self:initPanelMask(panel_mask)
end

function RankView:initPanelMask(panel)
    self.listView_1 = panel:getChildByName("ListView_1")--:hide()
    self.listView_2 = panel:getChildByName("ListView_2"):hide()
    self.listView_1:setScrollBarEnabled(false)
    self.listView_2:setScrollBarEnabled(false)
    self.item_list = panel:getChildByName("Panel_item"):hide()
    panel:getChildByName("Panel_item_1"):hide()

    local btn_today = panel:getChildByName("btn_today")
    local btn_yesterday = panel:getChildByName("btn_yesterday")
    local function btnCall(btn)
        if btn == btn_today then
            if self.curTimeType ~= timeFlag.today then
                self:sendRankList(self.curRankType, timeFlag.today)
            end
        else
            if self.curTimeType ~= timeFlag.yesterday then
                self:sendRankList(self.curRankType, timeFlag.yesterday)
            end
        end
    end
    self.btnTimeList = { [timeFlag.today] = btn_today, [timeFlag.yesterday] = btn_yesterday }
    ExternalTools:addBtnTouchEventListener(btn_today, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_yesterday, btnCall)
end

function RankView:setReceiveBtn(data)
    local icon_soul = self.btn_receive:getChildByName("icon_soul")
    local txt_num = self.btn_receive:getChildByName("Text_num")
    local rewardType = data.RewardType
    local rewardId = data.RewardId
    local rewardNums = data.RewardNums
    GameTool:setRewardImg(rewardType, rewardId, icon_soul, true)
    txt_num:setString(rewardNums)
end

function RankView:initMyRankItem()
    local reward = self.myRankData.reward
    if self.myRankData.reward then
        -- 自己有奖励可以领取
        self.btn_receive:show()
        self:setReceiveBtn(reward)
    else
        self.btn_receive:hide()
    end
    local item = self.panel_item_my:show()
    self.myRankData.reward = GameTool:getRankReward(self.myRankData.rank or 0, self.curRankType)
    self:initOtherRankItem(item, self.myRankData)
end

function RankView:initOtherRankItem(item, data)
    item:show()
    local icon_rank = item:getChildByName("icon_rank"):hide()
    local txt_rank = item:getChildByName("Text_rank"):hide()
    if data.rank > 3 or data.rank == 0 then
        local str = data.rank == 0 and "未上榜" or data.rank
        txt_rank:show()
        txt_rank:setString(str)
    else
        icon_rank:show()
        local name = string.format("icon_rank_%d_rank_jtdzz.png", data.rank)
        icon_rank:loadTexture(name, 1)
    end
    local panel_player = item:getChildByName("Panel_player")
    local panel_reward = item:getChildByName("Panel_reward")
    if data.reward then
        panel_reward:show()
        local icon_soul = panel_reward:getChildByName("icon_soul")
        local rewardType = data.reward.RewardType
        local rewardId = data.reward.RewardId
        local rewardNums = data.reward.RewardNums
        local txt_reward = panel_reward:getChildByName("Text_num")
        GameTool:setRewardImg(rewardType, rewardId, icon_soul, true)
        txt_reward:setString(rewardNums)
    else
        panel_reward:hide()
    end
    local img_gunner = panel_player:getChildByName("img_gunner")
    GameTool:setUserIconImg(data.icon, img_gunner)
    local txt_nickname = item:getChildByName("Text_nickname")
    local txt_num = item:getChildByName("Text_num")
    txt_nickname:setString(data.nick)
    txt_num:setString(data.num)
    item.txt_nickname = txt_nickname
    item.img_icon = img_gunner
end

function RankView:refreshListView()
    local listView = self.listView_1
    local data = {}
    for _, v in pairs(self.rankListData) do
        table.insert(data, v)
    end
    table.sort(data, function (a, b)
        return a.rank < b.rank
    end)
    listView:removeAllItems()
    self.rankItemList = {}
    for i, v in pairs(data) do
        local item = self.item_list:clone()
        self:initOtherRankItem(item, v)
        listView:pushBackCustomItem(item)
        self.rankItemList[i] = item
    end
end

-- 发送排行榜排名请求
function RankView:sendRankList(rankType, isNew)
    self.curRankType = rankType
    self.curTimeType = isNew
    printf("发送排行榜排名请求, rankType:%d, isNew:%d", rankType, isNew)
    MsgSendMgr:sendRankListInfo(rankType, isNew)
end

-- 发送领取奖励请求
function RankView:sendGetReward()
    MsgSendMgr:sendRankRewardInfo(self.curRankType)
end

function RankView:initRankListData(rankData)
    self.rankListData = {}
    local useridList = {}
    for i, v in ipairs(rankData) do
        local userid = v.userid
        local reward = GameTool:getRankReward(i, self.curRankType)
        local data = {
            rank = i, icon = 1, nick = "", num = v.score, reward = reward
        }
        useridList[i] = userid
        self.rankListData[userid] = data
    end
    MsgSendMgr:sendUserInfo(useridList)
end

-- 处理初始化界面
function RankView:handleRankListInfo(data)
    local result = data.result
    if result.noError then
        local rankInfos = data.rankInfos
        self:initRankListData(rankInfos)
        local rewards = data.rewards
        local icon = UserData.Shared().dwIconid or 1
        local nick = UserData.Shared().szNickName or "我"
        local reward = rewards[1]
        local rewardData
        if reward then
            rewardData = {
                RewardType = reward.rewardType,
                RewardId = reward.rewardId,
                RewardNums = reward.rewardNums,
            }
        end
        self.myRankData = {
            rank = data.myRank, icon = icon, nick = nick, num = data.myScore, reward = rewardData
        }
        self:initMyRankItem()
    else
        printf("初始化排行榜界面失败，%s", result.outMsg)
        GameTool:showTxtTip(result.outMsg)
    end
    printf("--------- 处理排行榜排行信息 ----------")
    printf("noError is %s", result.noError and "true" or "false")
    printf("outMsg is %s", result.outMsg)
end

-- 处理领取奖励请求
function RankView:handleGetReward(data)
    local result = data.result
    if result.noError then
        local rewards = data.rewards[1]
        GameTool:showGetRewardWin(self, rewards)
        self.btn_receive:hide()
    else
        GameTool:showTxtTip(result.outMsg)
    end
end

function RankView:handleUserInfo(data)
    local userViews = data.userViews
    for _, v in ipairs(userViews) do
        local userid = v.userid
        local nick = v.nick
        local faceid = v.faceid
        local info = self.rankListData[userid]
        if info then
            self.rankListData[userid].nick = nick
            self.rankListData[userid].icon = faceid
        end
    end
    self:showRankList(self.curRankType)
end

function RankView:addNotify()
    self.rankListMsg = MessageManager.Shared():addMsg(MsgKeyData.onRankListInfo, function (data)
        self:handleRankListInfo(data)
    end)
    self.getRewardMsg = MessageManager.Shared():addMsg(MsgKeyData.onRankRewardInfo, function (data)
        self:handleGetReward(data)
    end)
    self.onUserInfoMsg = MessageManager.Shared():addMsg(MsgKeyData.onUserInfo, function (data)
        self:handleUserInfo(data)
    end)
end

function RankView:removeNotify()
    MessageManager.Shared():removeMsg(MsgKeyData.onRankListInfo, self.rankListMsg)
    MessageManager.Shared():removeMsg(MsgKeyData.onRankRewardInfo, self.getRewardMsg)
    MessageManager.Shared():removeMsg(MsgKeyData.onUserInfo, self.onUserInfoMsg)
end

function RankView:onExit()
    self:removeNotify()
end

return RankView