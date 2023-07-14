---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2021/4/25 11:28
---

local HomeView = class("HomeView", ViewBase)
local funcOpenCfg = require("JunTuan.src.configs.FunctionOpenCfg")

function HomeView:ctor(data, parent)
    self:enableNodeEvents()
    self:initData(data, parent)
end

function HomeView:onEnter()
    self:initView()
    self:createCircleMask()
    self:addEventListener()
    MsgSendMgr:sendRankActInfo()
end

function HomeView:initData(data, parent)
    self.parent = parent
    self.curSceneIdx = data.sceneId         -- 我的最新过关场景id
    self.curLevelIdx = data.gameLevel       -- 我的最新过关关卡id
    if data.isPassed == 1 then
        self.curSceneIdx = data.sceneId + 1
        self.curLevelIdx = 0
    else
        if data.sceneId == 0 then
            self.curSceneIdx = 1
            self.curLevelIdx = 1
        end
        local sceneInfo = GameTool:getSceneInfo(self.curSceneIdx)
        if self.curLevelIdx >= sceneInfo.LevelNum then
            if data.sceneId < GameTool:getSceneNum() then
                self.curSceneIdx = data.sceneId + 1
                self.curLevelIdx = 0
            end
        end
    end
    self.selSceneIdx = self.curSceneIdx                    -- 我选择的关卡id
    self.touchBeginPos = nil
    self.levelItemList = {}
    self.levelItemPosList = {}
    self.isSound = AudioManager:isSound()
    self.isMusic = AudioManager:isMusic()
    self.panelList = {};
end

function HomeView:initView()
    local para = {
        csb = JunTuanCfg.csbCfg.homeView.home_main,
        setSize = true
    }
    local ui = ViewBase:createCSB(para)
    self.csbNode = ui
    self:addChild(ui)

    local panel_main = ui:getChildByName("Panel_main")
    self.panel_main = panel_main

    local panel_handbook = panel_main:getChildByName("Panel_handbook")
    local panel_milepost = panel_main:getChildByName("Panel_milepost")
    local panel_sign = panel_main:getChildByName("Panel_sign")
    --1图鉴 2里程碑 3签到
    self.redTisList = {
        panel_handbook,
        panel_milepost,
        panel_sign,
    }
    local panel_task = panel_main:getChildByName("Panel_task")
    local panel_set = panel_main:getChildByName("Panel_set")
    local panel_reward = panel_main:getChildByName("Panel_reward")
    local panel_egg = panel_main:getChildByName("Panel_egg")
    local btn_start = panel_main:getChildByName("btn_start")
    local btn_rank = panel_main:getChildByName("img_ranking"):hide()
    local btn_newBag = panel_main:getChildByName("img_newUserGift")
    btn_newBag:setVisible(not UserData.Shared().isBuyNewUserBag)
    self.txt_offline = panel_reward:getChildByName("Text_num")
    self.signRedTis = panel_sign:getChildByName("icon_red");
    self.panel_task = panel_task
    self.panel_offline = panel_reward
    self.btn_rank = btn_rank
    self.btn_newBag = btn_newBag
    self.taskRedTis = panel_task:getChildByName("icon_red"):hide()
    panel_task:setVisible(funcOpenCfg.TASKDAILY_OPEN);
    panel_sign:setVisible(funcOpenCfg.SIGN_SEVENS_OPEN);
    panel_set:setVisible(funcOpenCfg.SETTINGS_OPEN);
    panel_reward:setVisible(funcOpenCfg.OFFLINECOIN_OPEN);
    panel_egg:setVisible(funcOpenCfg.PETPANEL_OPEN);

    local function btnCall(btn)
        if btn == panel_handbook then
            self:showHandBook()
            MsgSendMgr:sendMonsterBooksReq()
        elseif btn == panel_milepost then
            self:showMilepost();
        elseif btn == panel_task then
            if UserData.Shared().sceneInfo.sceneId <= Define.TaskUnlock then
                GameTool:showTxtTip(string.format("通关世界%d解锁", Define.TaskUnlock))
                return
            end
            self:showTaskView()
        elseif btn == panel_sign then
            self:showSignView();
            MsgSendMgr:sendSignTaskListReq();
        elseif btn == panel_set then
            self:showSetView()
        elseif btn == panel_reward then
            self:showOffRewardView()
        elseif btn == panel_egg then
        elseif btn == btn_start then
            if self.selSceneIdx <= self.curSceneIdx then
                if UserData.Shared():get_lCurEnergy() >= Define.EnergyCost then
                    --local showFlag = GameDB.GetNumForKey("userGiftBagFlag_1", 0)
                    --if self.selSceneIdx == 7 and showFlag == 0 then
                    --    -- 弹出首充礼包
                    --    local para = {
                    --        call = function()
                    --            MsgSendMgr:sendStartGame(self.selSceneIdx)
                    --        end
                    --    }
                    --    GameTool:showNewUserGiftBag(self, para)
                    --    GameDB.SetValueForKey("userGiftBagFlag_1", 1)
                    --else
                        MsgSendMgr:sendStartGame(self.selSceneIdx)
                    --end
                else
                    GameTool:showTxtTip("体力不足")
                    GameTool:showBuyEnergyView(self)
                end
            else
                GameTool:showTxtTip("通关上一关解锁！")
            end
        elseif btn == btn_rank then
            self:showRankView()
        elseif btn == btn_newBag then
            GameTool:showNewUserGiftBag(self)
        end
    end
    ExternalTools:addBtnTouchEventListener(panel_handbook, btnCall)
    ExternalTools:addBtnTouchEventListener(panel_milepost, btnCall)
    ExternalTools:addBtnTouchEventListener(panel_task, btnCall)
    ExternalTools:addBtnTouchEventListener(panel_sign, btnCall)
    ExternalTools:addBtnTouchEventListener(panel_set, btnCall)
    ExternalTools:addBtnTouchEventListener(panel_reward, btnCall)
    ExternalTools:addBtnTouchEventListener(panel_egg, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_start, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_rank, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_newBag, btnCall)

    self:createBtnAni(btn_start)
    self.panel_level = panel_main:getChildByName("Panel_level")
    self.panel_level.box = self.panel_level:getBoundingBox()
    self.listView_level = panel_main:getChildByName("List_item"):hide()
    self.listView_level:setScrollBarEnabled(false)
    local function onPage(sender)
        local index = sender:getCurrentPageIndex() + 1
        self.selSceneIdx = index
        AudioManager:playSoundEffect("huadong")
        printf("当前选择的场景是:%d", self.selSceneIdx)
    end
    self.panel_level:addEventListener(onPage)

    self.item_level = panel_main:getChildByName("Panel_item"):hide()
    self:refreshLevelList()

    -- 每日任务界面
    self:showTaskView()
    self.taskView:hide()

    self:initNoticeController(panel_main)
end

function HomeView:initNoticeController(panel_main)
    -- 滚动广播
    local panel_notice = panel_main:getChildByName("Panel_notice")
    local panel_mask = panel_notice:getChildByName("Panel_mask")
    local txt_notice = panel_mask:getChildByName("Text_notice")
    NoticeController.Shared():setNoticeBg(panel_notice)
    NoticeController.Shared():setNoticeTxt(txt_notice)
    NoticeController.Shared():startScrollTimeCountdown()
end

-- 圆形遮罩
function HomeView:createCircleMask()
    local parent = self.panel_offline
    local pos = cc.p(29.5, 75)
    local mask = ExternalTools:createCircleLoadingBar(_, parent, pos, 0)
    mask:setLocalZOrder(999)
    self.offline_mask = mask
end

function HomeView:showView(view)
    view:setAnchorPoint(0.5, 0.5)
    view:setPosition(display.center)
    self:addChild(view, 9999)
end

function HomeView:showHandBook()
    local view = require("JunTuan.src.views.IllustratedView").new()
    self:showView(view)
end

function HomeView:showMilepost()
    if not self.milepostView then
        local view = require("JunTuan.src.views.MilepostView").new()
        self:showView(view)
        self.milepostView = view
    else
        self.milepostView:showAni()
    end
end

function HomeView:showTaskView()
    if not self.taskView then
        local view = require("JunTuan.src.views.TaskView").new(self)
        self:showView(view)
        self.taskView = view
    else
        self.taskView:show()
        self.taskView:showAni()
    end
end

function HomeView:showSignView()
    local view = require("JunTuan.src.views.SignView").new()
    self:showView(view)
end

function HomeView:showSetView()
    local view = require("JunTuan.src.views.SetView").new()
    self:showView(view)
end

function HomeView:showOffRewardView()
    local view = require("JunTuan.src.views.OfflineView").new()
    self:showView(view)
end

-- 显示排行榜
function HomeView:showRankView()
    local view = require("JunTuan.src.views.RankView").new()
    self:showView(view)
end

function HomeView:showLoadingView(data)
    local result = data.result             -- 请求结果
    local noError = result.noError
    local outMsg = result.outMsg
    local errType = result.errType

    if not noError then
        local str = string.format("errCode:%d, errStr:%s", errType, outMsg)
        printf(str)
        GameTool:showTxtTip(outMsg)
        self.snapshotInfo = nil
        return
    end

    local function startGame()
        self:showGameView(data)
    end
    local para = {
        overCall = startGame,
        time = 1,
        from = "home"
    }
    local curScene = cc.Director:getInstance():getRunningScene()
    local layer = require("JunTuan.src.views.GameLoadingView").new(para)
    layer:setAnchorPoint(0, 0)
    layer:setContentSize(display.size)
    layer:setPosition(cc.p(0, 0))
    curScene:addChild(layer, 999)

    local userInfo = {
        energy = -Define.EnergyCost
    }
    UserData.Shared():updateUserCurrency(userInfo);
    MessageManager.Shared():postMsg(MsgKeyData.onCurrencyUpdate, {})
end

function HomeView:showGameView(data)
    if not self.gameView then
        local curScene = cc.Director:getInstance():getRunningScene()
        local para = {
            homeView = self,
            sceneId = self.selSceneIdx,
            data = data,
            snapshotInfo = self.snapshotInfo,
        }
        local layer = require("JunTuan.src.views.GameView").new(para)
        layer:setAnchorPoint(0, 0)
        layer:setContentSize(display.size)
        layer:setPosition(cc.p(0, 0))
        curScene:addChild(layer, 998)
        self.gameView = layer
        self.snapshotInfo = nil
    end
end

-- 刷新关卡列表
function HomeView:refreshLevelList()
    local function initItem(item, idx)
        item:show()
        local img_field = item:getChildByName("img_field")
        local icon_lock = item:getChildByName("icon_lock")
        local txt_title = item:getChildByName("Text_title")
        local txt_title_num = item:getChildByName("Text_title_num")
        local txt_tip = item:getChildByName("Text_tip")
        local sceneInfo = GameTool:getSceneInfo(idx)
        txt_title:setString(string.format("%d.%s", idx, sceneInfo.Name))
        local name = ""
        local levelNum = sceneInfo.LevelNum
        local idxTmp = idx > 30 and idx - 30 or idx
        if idxTmp <= 5 then
            name = string.format("img_field%d_home_jbao.png", idxTmp)
        else
            name = string.format("img_field%d_home_jbao.png", idxTmp + 1)
        end
        if idx > self.curSceneIdx then
            img_field:setColor(cc.c3b(77, 77, 77))
        else
            img_field:setColor(cc.c3b(255, 255, 255))
            if idx == self.curSceneIdx then
                txt_tip:setString(string.format("最高记录:%d/%d", self.curLevelIdx, levelNum))
            else
                txt_tip:setString("已通关")
                local txt_over = txt_tip:clone()
                item:addChild(txt_over)
                txt_over:setString("点击可快速扫荡")
                txt_over:setPositionY(icon_lock:getPositionY())

                img_field:setEnabled(true)
                img_field:setTouchEnabled(true)
                ExternalTools:addBtnTouchEventListener(img_field, function ()
                    local curEnergy = UserData.Shared():get_lCurEnergy()
                    if curEnergy >= Define.EnergyCost then
                        if not item.isSendMsg then
                            item.isSendMsg = true
                            MsgSendMgr:sendMopping(idx, 0)
                            performWithDelay(item, function ()
                                item.isSendMsg = false
                            end, 1)
                        end
                    else
                        GameTool:showTxtTip("体力不够")
                        GameTool:showBuyEnergyView(self)
                    end
                end)
            end
        end
        img_field:loadTexture(name, 1)
        icon_lock:setVisible(idx > self.curSceneIdx)
        txt_title_num:setString(string.format("章节长度:%d", levelNum))
    end
    for i = 1, 60 do
        if i <= self.curSceneIdx + 5 then
            local item = self.panel_level:getItem(i - 1)
            if not item then
                item = self.item_level:clone()
                initItem(item, i)
                self.panel_level:addPage(item)
            end
            initItem(item, i)
        end
    end
    self.panel_level:scrollToPage(self.curSceneIdx - 1)
end

function HomeView:createBtnAni(btn)
    local s = btn:getContentSize()
    local txt_start = btn:getChildByName("txt_start")
    txt_start:setLocalZOrder(2)
    local info = JunTuanCfg.spineAni.btnStartAni
    local ani = AnimationMgr:createSpine(info.file, 1.3)
    ani:setAnimation(0, info.names[1], true)
    ani:setPosition(cc.p(s.width / 2, s.height / 2 - 12))
    btn:addChild(ani, 1)
    btn:hide()
    performWithDelay(btn, function()
        btn:show()
    end, 0.1)
end

function HomeView:onExit()
    self:removeEventListener();
end

function HomeView:handleSceneInfo(data)
    UserData.Shared():setSceneInfo(data)
    self.curSceneIdx = data.sceneId
    self.curLevelIdx = data.gameLevel
    if data.isPassed == 1 then
        self.curSceneIdx = data.sceneId + 1
        self.curLevelIdx = 0
    end
    self.selSceneIdx = self.curSceneIdx
    UserData.Shared().sceneInfo.sceneId = self.curSceneIdx
    self:refreshLevelList()
    printf("---------- 最新场景消息 ----------")
    printf("data.sceneId is %d", data.sceneId)
    printf("data.gameLevel is %d", data.gameLevel)
    printf("data.isPassed is %d", data.isPassed)
    printf("self.curSceneIdx is %d", self.curSceneIdx)
    printf("self.curLevelIdx is %d", self.curLevelIdx)
    printf("---------- 最新场景消息 ----------")
end

-- 处理用户快照信息
function HomeView:handleSnapshot(data)
    self.snapshotInfo = data
    self.selSceneIdx = data.gameWorld
    MsgSendMgr:sendStartGame(data.gameWorld)
    printf("gameWorld is %d", data.gameWorld)
    printf("---------- 处理快照信息（响应） ----------")
end

-- 红点处理
function HomeView:handleRedTisRefresh(data)
    for _,v in pairs(data) do
        local ifShow = false;
        if v == Define.ENUM_REDTIS_TYPE.MONSTERBOOK then
            ifShow = GameTool:checkMonsterBookRedTis();
            local txt = ifShow and "true" or "false";
            print("checkMonsterBookRedTis"..txt);
        elseif v == Define.ENUM_REDTIS_TYPE.MILESTONE then
            ifShow = GameTool:checkMileStoneRedTis();
            local txt = ifShow and "true" or "false";
            print("checkMileStoneRedTis"..txt);
        elseif v == Define.ENUM_REDTIS_TYPE.SIGN then
            ifShow = GameTool:checkSignRedTis();
            local txt = ifShow and "true" or "false";
            print("checkSignRedTis"..txt);
        end
        print("handleRedTisRefresh"..v);
        local node = self.redTisList[v]
        node:getChildByName("icon_red"):setVisible(ifShow);
        if ifShow then
            GameTool:curRewardAni(node)
        else
            node:stopActionByTag(666)
            node:setScale(1)
            node:setRotation(0)
        end
    end
end

-- 每日任务变化
function HomeView:handleTaskChange(data)
    if not UserData.Shared().isInGame then
        if self.taskView then
            self.taskView:handleTaskChange(data.dailyTasks)
        end
    end
end

function HomeView:handleHungInfo(data)
    local result = data.result
    local coin = data.coin
    local cardId = data.cardId
    local maxCoin = data.maxCoin
    local countDown = data.countDown
    if not result.noError then
        coin = 0
    end
    UserData.Shared().offlineGold = coin
    UserData.Shared().cardId = cardId
    UserData.Shared().maxCoin = maxCoin
    UserData.Shared().countDown = countDown
    printf("离线收益，coin is %d", coin)
    printf("离线收益，cardId is %d", cardId)
    printf("离线收益，maxCoin is %d", maxCoin)
    printf("离线收益，countDown is %d", countDown)
    if UserData.Shared():isCardUser() then
        coin = coin / 2
    end
    local str = GameTool:thousandFormat(coin)
    self.txt_offline:setString(str)
end

function HomeView:handleMopping(data)
    local result = data.result
    local reward = data.reward
    if result.noError then
        local userInfo = {
            energy = -Define.EnergyCost
        }
        UserData.Shared():updateUserCurrency(userInfo);
        MessageManager.Shared():postMsg(MsgKeyData.onCurrencyUpdate, {})
        if #reward == 1 then
            reward = reward[1]
        end
        GameTool:showGetRewardWin(self, reward)
        printf("扫荡奖励个数：%d", #reward)
    else
        GameTool:showTxtTip(result.outMsg)
    end
end

function HomeView:handleRankAct(data)
    local actInfos = data.actInfos
    local isShow = false
    if actInfos then
        for i, v in ipairs(actInfos) do
            local actInfo = {
                starttime = v.starttime,        -- 开始时间
                endtime = v.endtime,            -- 结束时间
                status = v.status,              -- 0关闭，1开启，2结束
                type = v.type,                  -- 1钻石消耗榜，2怪物击杀榜
            }
            if v.status == 1 then
                isShow = true
            end
            UserData.Shared().rankActList[v.type] = actInfo
            --PrintTable(actInfo)
        end
    end
    self.btn_rank:setVisible(isShow)
    if not isShow then
        self.btn_newBag:stePosition(cc.p(self.btn_rank:getPosition()))
    end
end

function HomeView:addEventListener()
    self.startGameMsg = MessageManager.Shared():addMsg(MsgKeyData.onStartGame, function(data)
        self:showLoadingView(data)
    end)
    self.sceneInfoMsg = MessageManager.Shared():addMsg(MsgKeyData.onNewSceneInfo, function(data)
        self:handleSceneInfo(data)
    end)
    self.userSnapshotMsg = MessageManager.Shared():addMsg(MsgKeyData.onUserSnapshot, function(data)
        self:handleSnapshot(data)
    end)
    self.redtisRefreshMsg = MessageManager.Shared():addMsg(MsgKeyData.onRedTisRefresh, function(data)
        self:handleRedTisRefresh(data)
    end)
    self.taskChangeMsg = MessageManager.Shared():addMsg(MsgKeyData.onDailyTaskChange, function(data)
        self:handleTaskChange(data)
    end)
    self.onHungRewardInfo = MessageManager.Shared():addMsg(MsgKeyData.onHungRewardInfo, function(data)
        self:handleHungInfo(data)
    end)
    self.onMoppingUpMsg = MessageManager.Shared():addMsg(MsgKeyData.onMoppingUp, function(data)
        self:handleMopping(data)
    end)
    self.onRankActInfoMsg = MessageManager.Shared():addMsg(MsgKeyData.onRankActInfo, function(data)
        self:handleRankAct(data)
    end)
end

function HomeView:removeEventListener()
    MessageManager.Shared():removeMsg(MsgKeyData.onStartGame, self.startGameMsg);
    MessageManager.Shared():removeMsg(MsgKeyData.onNewSceneInfo, self.sceneInfoMsg);
    MessageManager.Shared():removeMsg(MsgKeyData.onUserSnapshot, self.userSnapshotMsg);
    MessageManager.Shared():removeMsg(MsgKeyData.onRedTisRefresh, self.redtisRefreshMsg);
    MessageManager.Shared():removeMsg(MsgKeyData.onDailyTaskChange, self.taskChangeMsg);
    MessageManager.Shared():removeMsg(MsgKeyData.onHungRewardInfo, self.onHungRewardInfo);
    MessageManager.Shared():removeMsg(MsgKeyData.onMoppingUp, self.onMoppingUpMsg);
    MessageManager.Shared():removeMsg(MsgKeyData.onRankActInfo, self.onRankActInfoMsg);
end

return HomeView