local _M = {}
local obj = nil
local RoomConfig = require("src.config.RoomConfig")
local MsgKeyData = require("src.app.Model.MsgKeyData")
local ChatDB = require("src.app.DB.ChatDB")
local SessionDB = require("src.app.DB.SessionDB")

-- 单例
function _M.Shared()
    if not obj then
        obj = setmetatable({}, { __index = _M })
        obj:Init()
    end
    return obj
end

-- 初始化
function _M:Init()
    self.netManager = ChatNetManager.Shared()
    self.loginSuccess = false
    self.recvDataList = {}
    self.serverList = {}
    --是否登录聊天服务器成功
    self.loginSuccess = false
end

--成功登录聊天
function _M:IsSuccessLoginChat()
    return self.loginSuccess
end

-- 聊天连接服务器
function _M:ChatConnectServer()
    if not self.loginSuccess then
        local serverID = self:RandomServerByRoomType(RoomConfig.ROOMTYPE_CHAT)
        if not serverID then
            alert("聊天服务器异常，稍后再试")
        else
            local ip, port = self:GetServerIpAndPort(serverID)
            if ip and port then
                self.netManager:Connect(ip, port, SERVER_FLAG_SERVICE)
            end
        end
    else
        MessageManager.Shared():postMsg(MsgKeyData.Key_ChatServerLoginSuccess)
    end
end

--通过房间类型随机服务器id
function _M:RandomServerByRoomType(_roomType)
    local serverList = self.serverList
    local list = {}
    for j = 1, #serverList do
        local server = serverList[j]
        local roomType = server.dwRoomType
        if roomType == _roomType then
            table.insert(list, server)
        end
    end
    if #list > 0 then
        math.randomseed(os.time())
        local rIndex = math.random(1, #list)
        return list[rIndex].wServerID
    end
    return nil
end

--获取服务器ip和端口通过服务器id
function _M:GetServerIpAndPort(_serverID)
    local listDN = UserData.Shared().listDN
    for i = 1, #listDN do
        local dn = listDN[i].szDn--域名ip
        local serverArr = listDN[i].sServerArr
        for l = 1, #serverArr do
            local serverID = serverArr[l].nServerID
            local serverPort = serverArr[l].nPort
            if serverID == _serverID then
                return dn, serverPort
            end
        end
    end
end

-- 聊天关闭服务器
function _M:ChatCloseServer()
    self.loginSuccess = false
    self.netManager:CloseSocket()
end

-- 聊天登录服务器
function _M:ChatLoginServer()
    self.netManager:LoginChatServer()
end

-- 连接聊天失败
function _M:ChatConnectFailed()
    print("连接聊天服务器失败")
    performWithDelay(SceneManager.Shared():GetRunningScene(), function()
        self:ChatCloseServer()
        self:ChatConnectServer()
    end, 1)
end

-- 聊天网络异常
function _M:ChatNetworkError()
    print("聊天网络异常")
    self.loginSuccess = false
    performWithDelay(SceneManager.Shared():GetRunningScene(), function()
        self:ChatCloseServer()
        self:ChatConnectServer()
    end, 1)
end

-- 聊天连接成功
function _M:ChatConnectSuccess()
    print("连接聊天服务器成功")
    self:ChatLoginServer()
end

-- 聊天登录失败
function _M:ChatLoginFalied()
    print("登录聊天登录失败")
    self.loginSuccess = false
    alert("聊天服务器登录失败")
end

-- 聊天登录成功
function _M:ChatLoginSuccess(data)
    self.loginSuccess = true
    UserData.Shared():saveChatLoginData(data)
    MessageManager.Shared():postMsg(MsgKeyData.Key_ChatServerLoginSuccess)

    --if not UserData.Shared().issign == 0 then
    --获取签到奖励列表
    --ChatNetManager.Shared():SignRewardListReq()
    --end
    --获取财富排行榜
    --ChatNetManager.Shared():GetRankInfoList({ PageIndex = 1,PageSize = 20,Total = 0,RType = 9 })
    ----请求游戏服务器在线人数
    --ChatNetManager.Shared():SendChatGetGameOnline({roomType = RoomConfig.ROOMTYPE_CLASSIC_PRIMARY})
    --ChatNetManager.Shared():SendChatGetGameOnline({roomType = RoomConfig.ROOMTYPE_MATCH_FENGQIANG})
end

--收到聊天消息
function _M:RecvChatMsg(data)
    --if data.channel == CHANNEL_DIALOGUE and not ChatDB.GetContentByMsgID(data.msgID) then
    if data.channel == CHANNEL_DIALOGUE then
        self.recvDataList[#self.recvDataList + 1] = data
        if true == self.isScheduler then
            return
        end
        self.isScheduler = true
        local function callBack()
            self:InsertChatRecordList(false)
            self:InsertSessionRecord(self.recvDataList, false, false)

            for k, v in pairs(self.recvDataList) do
                ChatNetManager.Shared():SendChatResponse({ msgID = v.msgID })
            end
            MessageManager.Shared():postMsg(MsgKeyData.Key_ChatRecvChatMsg, self.recvDataList[#self.recvDataList])
            self.recvDataList = {}
            self.isScheduler = nil
        end
        performWithDelay(SceneManager.Shared():GetRunningScene(), callBack, 2)
    elseif data.channel == CHANNEL_NOTICE then

    else
        MessageManager.Shared():postMsg(MsgKeyData.Key_ChatRecvChatMsg, data)
    end
end

--发送聊天消息返回
function _M:SendChatMsgReturn(data)
    if not ChatDB.GetContentByMsgID(data.msgID) then
        if data.channel == CHANNEL_DIALOGUE then
            local recvData = self:ConversionChatTable(data, true)
            ChatDB.InsertMsgContent(recvData)
            self:InsertSessionRecord(data, true, true)
        end
        MessageManager.Shared():postMsg(MsgKeyData.Key_ChatSendChatMsgResult, data)
    end
end

--插入聊天记录
function _M:InsertChatRecordList(isSelf)
    local recvDataList = {}
    for k, v in pairs(self.recvDataList) do
        local recvData = self:ConversionChatTable(v, isSelf)
        table.insert(recvDataList, recvData)
    end
    ChatDB.InsertMsgList(recvDataList)
end

function _M:ConversionChatTable(data, isSelf)
    local msgInfo = {
        msgID = data.msgID,
        userID = UserData.Shared().dwUserID,
        objID = data.targetUserID,
        senderID = UserData.Shared().dwUserID,
        receiverID = data.targetUserID,
        content = data.content,
        sendTime = os.time(),
    }
    if not isSelf then
        msgInfo.objID = data.sendInfo.userid
        msgInfo.senderID = data.sendInfo.userid
        msgInfo.receiverID = UserData.Shared().dwUserID
        msgInfo.sendTime = data.msgSendTime
    end
    return msgInfo
end

function _M:ConversionSessionTable(chatInfo, isSelf, isReturn)
    local sessionInfo = {}
    if isSelf then
        if chatInfo.FriUserid then
            sessionInfo = {
                objID = chatInfo.FriUserid,
                objNick = chatInfo.FriNick,
                objIconID = chatInfo.IconId,
                vipRank = chatInfo.VipRank,
            }
        elseif chatInfo.objID then
            sessionInfo = {
                objID = chatInfo.objID,
                objNick = chatInfo.objNick,
                objIconID = chatInfo.objIconID,
                vipRank = chatInfo.vipRank,
            }
        else
            sessionInfo = {
                objID = chatInfo.userid,
                objNick = chatInfo.nick,
                objIconID = chatInfo.iconid,
                vipRank = chatInfo.viprank,
            }
        end
        sessionInfo.userID = UserData.Shared().dwUserID
        sessionInfo.isRead = 1
        sessionInfo.content = ""
        sessionInfo.lastTime = os.time()
        if isReturn then
            sessionInfo = SessionDB.GetSessionInfo(chatInfo.targetUserID)[1]
            sessionInfo.content = chatInfo.content
            sessionInfo.lastTime = chatInfo.msgSendTime
        end
    else
        sessionInfo = {
            userID = UserData.Shared().dwUserID,
            objID = chatInfo.sendInfo.userid,
            objNick = chatInfo.sendInfo.nick,
            objIconID = chatInfo.sendInfo.iconid,
            vipRank = chatInfo.sendInfo.viprank,
            content = chatInfo.content,
            lastTime = chatInfo.msgSendTime,
            isRead = 0,
        }
    end
    return sessionInfo
end

--插入会话记录
function _M:InsertSessionRecord(data, isSelf, isRetur)
    if isSelf then
        local msgInfo = self:ConversionSessionTable(data, isSelf, isRetur)
        SessionDB.UpdateSession(msgInfo)
    else
        local sessionDataList = {}
        for k, v in pairs(data) do
            local recvData = self:ConversionSessionTable(v, isSelf, isRetur)
            table.insert(sessionDataList, recvData)
        end
        SessionDB.InsertSessionList(sessionDataList)
    end
end

ChatManager = _M