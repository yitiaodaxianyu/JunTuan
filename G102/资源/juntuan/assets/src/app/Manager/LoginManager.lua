local _M = {}
local obj = nil

-- 单例
function _M.Shared()
	if not obj then
		obj = setmetatable({}, {__index = _M})
		obj:Init()
	end
	return obj
end

-- 初始化
function _M:Init()
	self.netManager = GameNetManager.Shared()
	self.serverList = {}                      	--房间列表
	self.AccountDB = require("src.app.DB.AccountDB")
end

-----------------------网络相关------------------------
-- 连接服务器
function _M:ConnectServer()
	LuaPrint("连接登录服务器")
	local ip = NET_SERVER_IP
	local port = NET_SERVER_PORT
	self.netManager:Connect(ip, port,SERVER_FLAG_LOGIN)
end

-- 关闭服务器
function _M:CloseServer()
	self.netManager:CloseSocket()
end

-- 登录服务器
function _M:LoginServer()
	self.netManager:LoginServer()
end

----------------回调相关---------------
-- 连接失败
function _M:ConnectFailed(code)
	LuaPrint("登录服务器网络异常!")
	--alert("网络异常,是否重新连接?", function()
		showWaiting()
		GameManager.Shared():setLoginSuc(false)
		if _G["JunTuanMsgHandler.obj"] then
			-- 初始化数据以便重新请求场景消息
			_G["JunTuanMsgHandler.obj"]:initData()
		end
		self:CloseServer()
		self:ConnectServer()
	--end, nil, true)
end

-- 网络异常
function _M:NetworkError()
	LuaPrint("登录服务器网络异常!")
	--alert("网络异常,是否重新连接?", function()
		showWaiting()
		GameManager.Shared():setLoginSuc(false)
		self:CloseServer()
		if _G["JunTuanMsgHandler.obj"] then
			-- 初始化数据以便重新请求场景消息
			_G["JunTuanMsgHandler.obj"]:initData()
		end
		self:ConnectServer()
	--end, nil, true)
	MessageManager.Shared():postMsg(MsgKeyData.onNetErr)
end

-- 连接成功
function _M:ConnectSuccess()
	LuaPrint("连接登录服务器成功！！")
	local loginType = UserData.Shared().loginType
	if loginType == LOGIN_TYPE_VISITOR then
		print("开始游客登录")
		self:QuickLogin()
	elseif loginType == LOGIN_TYPE_ACCOUNT then
		print("开始手机登录")
		self:AccountLogin()
	end
end

-- 登录失败
function _M:LoginFalied(data)
	removeWaiting()
	self:CloseServer()
	local msg = data.tip
	alert(msg, function ()
		MessageManager.Shared():postMsg(MsgKeyData.onLoginFailed)
	end)
end

-- 登录成功
function _M:LoginSuccess(data)
	local user = UserData.Shared()
	user:saveLoginData(data)
	self:SaveAccountLoginInfo()

	MessageManager.Shared():postMsg(MsgKeyData.onLoginSuc)
end

-- 房间列表
function _M:ServerList(roomList)
	self:SetServer(roomList)
end

-- 列表完成
function _M:ServerListOver(data)
	self:CloseServer()

	if data.wReconnectServerId ~= 0 then
		-- 需要重连，重连服务器
		GameManager.Shared():ReconnectionServer(data.wReconnectServerId)
	end
end

--账号登录
function _M:AccountLogin()
	UserData.Shared():setLoginType(LOGIN_TYPE_ACCOUNT)
	self:StartLoginGame()
end

--快速登录
function _M:QuickLogin()
    --[[local lastAcc = self.AccountDB:GetLastAccount()
    local account, password, loginType
    if lastAcc then
        loginType = lastAcc.LoginType
        account = lastAcc.Account
        password = lastAcc.Password
        UserData.Shared():setUserAccountPassword(account, password)
    end]]
    UserData.Shared():setLoginType(LOGIN_TYPE_VISITOR)
    self:StartLoginGame()
end

-- sdk登录
--function _M:SdkLogin()
--	local function channelCallBack()
--		self:StartLoginGame()
--	end
--	UserData.Shared():setLoginType(SDK_LOGIN_MODE)
--	require(ChannelCfgs.channelApi).startSdkLogin(channelCallBack)
--end

-- 开始登录游戏大厅
function _M:StartLoginGame()
	self:LoginServer()
end

--保存玩家登录信息
function _M:SaveAccountLoginInfo()
	local user = UserData.Shared()
	local loginType = user.loginType
	if loginType == LOGIN_TYPE_ACCOUNT then
		local userId = user.dwUserID
		local account = user.account
		local password = user.password
		self.AccountDB.SetAccountInfo(userId, account, password, loginType)
	end
end

--记录登录服务器信息
function _M:SetServer(server)
	table.insert(self.serverList,server)
end

LoginManager = _M