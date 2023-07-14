local _M = require("src.app.Manager.Net.GameRecvManager")
local obj = nil

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
    self.socketStatus = SOCKET_STATUS_NULL
    self.serverFlag = nil
    self.postName = "GameNet"

    self.notify = NotifyCenter:sharedCenter():addNotify(self.postName, function(data)
        self:RecvMsgFromSocket(data)
    end)
    self.socket = SocketManager:Create(self.postName)
end
-- 销毁
function _M:Destory()
    if self.notify then
        NotifyCenter:sharedCenter():removeNotify(self.postName, self.notify)
        self.notify = nil
    end
    if self.socket then
        self.socket:Relase()
        self.socket = nil
    end
end
-- 连接
function _M:Connect(ip, port, flag)
    local function cacheCall()
        self.socketStatus = SOCKET_STATUS_DOING
        self.serverFlag = flag
        self.socket:Connect(ip, port)
    end
    if SOCKET_STATUS_DOING == self.socketStatus then
        self.cacheCall = cacheCall
    else
        cacheCall()
    end
end
-- 发送消息
function _M:SendData(mainCMD, subCMD, pbData)
    if SOCKET_STATUS_CONNECT == self.socketStatus then
        self.socket:Send(mainCMD, subCMD, pbData)
    else
        LuaPrint("Game Socket is not Connect")
    end
end
-- 关闭socket
function _M:CloseSocket()
    local status = self.socketStatus
    if SOCKET_STATUS_CONNECT == status then
        self.socketStatus = SOCKET_STATUS_NULL
        self.cacheCall = nil
    end
    if SOCKET_STATUS_NULL ~= status then
        self.socket:Close()
    end
end
-- 设置socket状态 status（Null 0未连接，Doing 1连接中，Connect 2连接上）
function _M:SetSocketStatus(status)
    self.socketStatus = status
end
-- 处理缓存连接（连接成功或失败调用）
function _M:HandleCacheConnect()
    local callFun = self.cacheCall
    if callFun then
        self.socketStatus = SOCKET_STATUS_NULL
        self.cacheCall = nil
        callFun()
        return true
    end
    return false
end

GameNetManager = _M