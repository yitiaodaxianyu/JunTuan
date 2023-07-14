local _M = {}
local obj = nil
local RoomConfig = require("src.config.RoomConfig")

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
	--房间类型
	self.currRoomType = nil
	--游戏类型
	self.currGameType = RoomConfig.GAMEYTPE_NO
end

--返回房间类型
function _M:GetCurrRoomType()
	return self.currRoomType
end

function _M:SetCurrRoomType(roomType)
	self.currRoomType = roomType
end

--返回游戏类型
function _M:GetCurrGameType()
	return self.currGameType
end

function _M:SetCurrGameType(gameType)
	self.currGameType = gameType
end

--三种游戏类型,每种类型游戏有多个游戏房间
--每个房间有多个服务器
--通过房间类型随机服务器id
function _M:RandomServerByRoomType(_roomType)
	local serverList = LoginManager.Shared().serverList
	for j = 1, #serverList do
		local server = serverList[j]
		local roomType = server.dwRoomType
		if roomType == _roomType then
			math.randomseed(os.time())
			local rIndex = math.random(1,#server.serverInfo)
			print("........游戏服务器ID:",server.serverInfo[rIndex].wServerID)
			return server.serverInfo[rIndex].wServerID
		end
	end
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

--获取房间类型通过服务器id
function _M:GetRoomTypeByServerID(_serverID)
	local serverList = LoginManager.Shared().serverList
	for j = 1, #serverList do
		local server = serverList[j]
		local roomType = server.dwRoomType
		for i = 1, #server.serverInfo do
			local serverID = server.serverInfo[i].wServerID
			if serverID == _serverID then
				return roomType
			end
		end
	end
end

-----------------------网络相关------------------------

-- 设置是否已经登录服务器
function _M:setLoginSuc(bool)
	self.isLoginSuc = bool
end

-- 连接服务器
function _M:ConnectServer(_roomType)
	if self.isLoginSuc then
		printf("已经登录游戏服务器")
		return
	end
	self:SetCurrRoomType(_roomType)
	local serverID = self:RandomServerByRoomType(_roomType)
	--local serverID = 5
	if not serverID then
		printf("暂未开放!")
	else
		local ip, port = self:GetServerIpAndPort(serverID)
		if ip and port then
			self.netManager:Connect(ip, port, SERVER_FLAG_SERVICE)
			printf("连接游戏服务器, ip:%s, port:%d", ip, port)
		else
			self.netManager:Connect(NET_SERVER_IP, NET_GAME_SERVER_PORT, SERVER_FLAG_SERVICE)
			printf("连接游戏服务器, ip:%s, port:%d", NET_SERVER_IP, NET_GAME_SERVER_PORT)
		end
	end
end

-- 断线重新连接服务器
function _M:ReconnectionServer(serverID)
	self.reconnection = true --是否是重连
	local roomType = self:GetRoomTypeByServerID(serverID)
	if roomType then
		self:SetCurrRoomType(roomType)
		if roomType >= RoomConfig.ROOMTYPE_CLASSIC_PRIMARY and roomType <= RoomConfig.ROOMTYPE_CLASSIC_GRANDMASTER then
			self:SetCurrGameType(RoomConfig.GAMEYTPE_CLASSIC)
		elseif roomType <= RoomConfig.ROOMTYPE_MATCH_FENGQIANG and roomType >= RoomConfig.ROOMTYPE_MATCH_GRANDMASTER then
			self:SetCurrGameType(RoomConfig.GAMEYTPE_MATCH)
		elseif roomType == RoomConfig.ROOMTYPE_FISH_BOSS or roomType == RoomConfig.ROOMTYPE_FISH_RED then
			self:SetCurrGameType(RoomConfig.GAMEYTPE_ENTERTAINMENT)
		end

		local ip ,port = self:GetServerIpAndPort(serverID)
		if ip and port then
			self.netManager:Connect(ip, port, SERVER_FLAG_SERVICE)
			printf("断线重新连接服务器, serverID is %d", serverID)
		else
			self.netManager:Connect(NET_SERVER_IP, NET_GAME_SERVER_PORT, SERVER_FLAG_SERVICE)
			printf("连接游戏服务器, ip:%s, port:%d", NET_SERVER_IP, NET_GAME_SERVER_PORT)
		end
	end
end

-- 关闭服务器
function _M:CloseServer()
	self.netManager:CloseSocket()
end

-- 登录服务器
function _M:LoginServer()
	self.netManager:LoginGameServer()
end

-- 连接失败
function _M:ConnectFailed()
	printf("连接游戏服务器失败")
	alert("连接游戏服务器失败，是否重新连接?", function ()
		self:ConnectServer(self:GetCurrRoomType())
	end)
end

-- 网络异常
function _M:NetworkError()
	printf("游戏服务器网络异常")
	--alert("网络异常, 是否重新连接?", function ()
		showWaiting()
		self:setLoginSuc(false)
		self:CloseServer()
		self:ConnectServer(self:GetCurrRoomType())
	--end)
	MessageManager.Shared():postMsg(MsgKeyData.onNetErr)
end

-- 连接成功
function _M:ConnectSuccess()
	print("连接游戏服务器成功, 开始登录游戏服务器！")
	self:LoginServer()
end

-- 登录失败
function _M:LoginFalied(data)
	self:CloseServer()
	alert("登录失败, 是否重新连接?", function ()
		showWaiting()
		self:setLoginSuc(false)
		self:ConnectServer(self:GetCurrRoomType())
	end)
end

-- 登录成功
function _M:LoginSuccess(data)
	self:setLoginSuc(true)
	--进入游戏房间
	if self.reconnection then
		-- 重连
		self.reconnection = false
		SceneManager.Shared():EnterJunGameScene()
		return
	end
	if self.currGameType == RoomConfig.GAMEYTPE_CLASSIC then
		-- 不需要重连，直接进入游戏
		SceneManager.Shared():EnterJunGameScene()
	end
end

GameManager = _M