local _M = require("src.app.Manager.Net.GameSendManager")
local CMD_Game = require("src.macros.CMD_Game")
local MsgKeyData = require("src.app.Model.MsgKeyData")
local RoomConfig = require("src.config.RoomConfig")

-- 打印
local function PrintCodeMsg(code, mainCMD, subCMD)
    local msg = string.format("GameRecv C:%d M:%d S:%d", code, mainCMD, subCMD)
    LuaPrint(msg)
end

local function PrintMsg(title, mainCMD, subCMD)
    local msg = string.format("GameRecv %s M:%d S:%d", title, mainCMD, subCMD)
    LuaPrint(msg)
end

-- 接收消息主入口
function _M:RecvMsgFromSocket(data)
    local code = data.code
    local mainCMD = data.mainCMD
    local subCMD = data.subCMD
    local buffer = data.buffer
    PrintCodeMsg(code, mainCMD, subCMD)

    if NET_CONN_SUCC == code then
        if self:HandleCacheConnect() then
            return
        end
        self:SetSocketStatus(SOCKET_STATUS_CONNECT)
        if SERVER_FLAG_LOGIN == self.serverFlag then
            LoginManager.Shared():ConnectSuccess()
        else
            GameManager.Shared():ConnectSuccess()
        end
    elseif NET_ERROR_CONN_FAILED == code then
        if self:HandleCacheConnect() then
            return
        end
        self:SetSocketStatus(SOCKET_STATUS_NULL)
        if SERVER_FLAG_LOGIN == self.serverFlag then
            LoginManager.Shared():ConnectFailed(code)
        else
            GameManager.Shared():ConnectFailed()
        end
    elseif code < NET_ERROR_CONN_FAILED then
        self:SetSocketStatus(SOCKET_STATUS_NULL)
        if SERVER_FLAG_LOGIN == self.serverFlag then
            LoginManager.Shared():NetworkError()
        else
            LoginManager.Shared():NetworkError()
        end
    elseif NET_RECV_DATA_SUCCESS == code then
        self:RecvMsg(mainCMD, subCMD, buffer)
    end
end

-- 接收消息
function _M:RecvMsg(mainCMD, subCMD, buffer)
    printf("_M:RecvMsg"..mainCMD);
    if SERVER_FLAG_LOGIN == self.serverFlag then
        self:LoginRecvMsg(mainCMD, subCMD, buffer)
    else
        self:GameRecvMsg(mainCMD, subCMD, buffer)
    end
end

-- 登录接收消息
function _M:LoginRecvMsg(mainCMD, subCMD, data)
    if mainCMD == CMD_Game.MDM_MB_LOGON then
        if subCMD == CMD_Game.SUB_MB_LOGON_SUCCESS then
            local struct_PB = ServerStruct_Logon_pb.PB_MB_LogonSuccess()--登录成功
            struct_PB:ParseFromString(data)
            GameDB.SetValueForKey("isLoginOut", 0)
            print("---------- 登录登录服务器成功 ----------")
            print("用户ID:PB_MB_LogonSuccess.dwUserID", struct_PB.dwUserID)
            print("游戏服务器登录验证串:PB_MB_LogonSuccess.szValidCode", struct_PB.szValidCode)
            print("昵称:PB_MB_LogonSuccess.szNickName", SpecialFunc.ConverGBKToUTF8(struct_PB.szNickName))
            print("头像ID:PB_MB_LogonSuccess.dwIconid", struct_PB.dwIconid)
            print("绑定的手机号:PB_MB_LogonSuccess.szRegiterMobile", struct_PB.szRegiterMobile)
            print("金豆:PB_MB_LogonSuccess.lGoldBean", struct_PB.lGoldBean)
            print("钻石:PB_MB_LogonSuccess.lDiamond", struct_PB.lDiamond)
            print("能量:PB_MB_LogonSuccess.lEnergy", struct_PB.lEnergy)
            print("vip等级:PB_MB_LogonSuccess.nVipLevel", struct_PB.nVipLevel)
            print("玩家等级:PB_MB_LogonSuccess.nUserLevel", struct_PB.nUserLevel)
            print("福卡:PB_MB_LogonSuccess.lBlessedCard", struct_PB.lBlessedCard)
            print("控制标志:PB_MB_LogonSuccess.lBlessedCard", struct_PB.ControlFlag)
            print("用户标志:PB_MB_LogonSuccess.nUserFlag", struct_PB.nUserFlag)
            print("启航礼包:PB_MB_LogonSuccess.nSaliedGift", struct_PB.nSaliedGift)
            print("限购礼包 1新手礼包 2 4 8 限制购礼包:PB_MB_LogonSuccess.nLimitGift", struct_PB.nLimitGift)
            print("七天礼包0 不显示 1 不可领取 2 可领取:PB_MB_LogonSuccess.nSevendayGift", struct_PB.nSevendayGift)
            print("是否显示签到:PB_MB_LogonSuccess.nShowSign", struct_PB.nShowSign)
            print("vip福利领取的金币数量:PB_MB_LogonSuccess.VipMaterial", struct_PB.VipMaterial)
            print("vip福利领取材料的数量:PB_MB_LogonSuccess.VipGold", struct_PB.VipGold)
            print("---------- 登录登录服务器成功 ----------")
            LoginManager.Shared():LoginSuccess(struct_PB)
            UserData.Shared().szValidCode = struct_PB.szValidCode
        elseif subCMD == CMD_Game.SUB_MB_LOGON_FAILURE then
            local struct_PB = ServerStruct_Logon_pb.PB_MB_LogonFailure()
            struct_PB:ParseFromString(data)
            local tipData = {
                tip = SpecialFunc.ConverGBKToUTF8(struct_PB.szDescribeString),
                code = struct_PB.lResultCode
            }
            print("---------- 登录登录服务器失败 ----------")
            print("错误代码:PB_MB_LogonFailure.lResultCode", tipData.code)
            print("错误描述:PB_MB_LogonFailure.szDescribeString", tipData.tip)
            print("---------- 登录登录服务器失败 ----------")
            LoginManager.Shared():LoginFalied(tipData)
        elseif subCMD == CMD_Game.SUB_MB_LOGON_DNLIST then
            local struct_PB = ServerStruct_Logon_pb.PB_MB_LogonDnList()
            struct_PB:ParseFromString(data)
            UserData.Shared().listDN = struct_PB.listDN
            print("---------- 域名列表下发 ----------")
            print("域名列表:PB_MB_LogonDnList.listDN列表长度", #struct_PB.listDN)
            for i = 1, #struct_PB.listDN do
                local PB_DN2Server = struct_PB.listDN[i]
                print("服务器ip:PB_DN2Server.szDn", PB_DN2Server.szDn)
                print("对应服务器信息:PB_DN2Server.sServerArr长度", #PB_DN2Server.sServerArr)
                for j = 1, #PB_DN2Server.sServerArr do
                    local PB_ServerInfo = PB_DN2Server.sServerArr[j]
                    print("服务器id:PB_ServerInfo.nServerID", PB_ServerInfo.nServerID)
                    print("对应端口:PB_ServerInfo.nPort", PB_ServerInfo.nPort)
                end
            end
            print("---------- 域名列表下发 ----------")
        end
    elseif mainCMD == CMD_Game.MDM_MB_SERVER_LIST then
        if subCMD == CMD_Game.SUB_MB_LIST_FINISH then
            local struct_PB = ServerStruct_Logon_pb.PB_MB_RoomListFinish()
            struct_PB:ParseFromString(data)
            print("---------- 房间列表完成 ----------")
            print("需要重连进去的服务器ID:PB_MB_RoomListFinish.wReconnectServerId", struct_PB.wReconnectServerId)
            print("游戏类型:PB_MB_RoomListFinish.dwGameType", struct_PB.dwGameType)
            print("房间类型:PB_MB_RoomListFinish.dwRoomType", struct_PB.dwRoomType)
            print("目标服务器Port:PB_MB_RoomListFinish.dwReconnectServerPort", struct_PB.dwReconnectServerPort)
            print("目标服务器IP:PB_MB_RoomListFinish.wReconnectServerIP", SpecialFunc.ConverIntToIP(struct_PB.wReconnectServerIP))
            print("---------- 房间列表完成 ----------")
            LoginManager.Shared():ServerListOver(struct_PB)
            UserData.Shared().wReconnectServerIP = struct_PB.wReconnectServerIP
        elseif subCMD == CMD_Game.SUB_MB_LIST_SERVER then
            local struct_PB = ServerStruct_Logon_pb.PB_MB_GameServerList()
            struct_PB:ParseFromString(data)
            print("---------- 房间列表下发 ----------")
            print("游戏ID:PB_MB_GameServerList.wKindID", struct_PB.wKindID)
            print("房间类型 (1 聊天服务 ):PB_MB_GameServerList.dwRoomType", struct_PB.dwRoomType)
            print("游戏类型（5淘汰赛 6自由赛）:PB_MB_GameServerList.dwGametype", struct_PB.dwGametype)
            print("所有服务器信息:PB_MB_GameServerList.serverInfo长度", #struct_PB.serverInfo)
            for i = 1, #struct_PB.serverInfo do
                local struct_sInfo = struct_PB.serverInfo[i]
                print("服务器ID:PB_MB_ServerInfo.wServerID", struct_sInfo.wServerID)
            end
            print("---------- 房间列表下发 ----------")
            GameManager.Shared():SetCurrRoomType(struct_PB.dwRoomType)
            GameManager.Shared():SetCurrGameType(struct_PB.dwGametype)
            LoginManager.Shared():ServerList(struct_PB)
        end
    elseif mainCMD == CMD_Game.MDM_MB_LOGON_PRE then
        if subCMD == CMD_Game.SUB_S_LIST_CHATSERVER then
            local struct_PB = ServerStruct_Logon_pb.PB_S_List_ChatServer()
            struct_PB:ParseFromString(data)
            local chatManager = ChatManager.Shared()
            print("---------- 聊天服务器列表下发 ----------")
            for i = 1, #struct_PB.serverInfo do
                local struct_sInfo = struct_PB.serverInfo[i]
                local data = {
                    wServerID = struct_sInfo.wServerID,
                    wServerPort = struct_sInfo.wServerPort,
                    dwRoomType = 0,
                }
                table.insert(chatManager.serverList, data)
                print("服务器ID:PB_MB_ServerInfo.wServerID", struct_sInfo.wServerID)
                print("服务器ID:PB_MB_ServerInfo.wServerPort", struct_sInfo.wServerPort)
            end
            chatManager:ChatConnectServer()
            print("---------- 聊天服务器列表下发 ----------")
        end
    end
end

-- 游戏接收消息
function _M:GameRecvMsg(mainCMD, subCMD, data)
    if mainCMD == CMD_Game.MDM_GR_LOGON then
        --主命令 游戏登录
        if subCMD == CMD_Game.SUB_GR_LOGON_FAILURE then
            local struct_PB = ServerStruct_Game_pb.PB_GR_LogonFailed()
            struct_PB:ParseFromString(data)
            GameManager.Shared():LoginFalied(struct_PB)
            local tempData = {
                lErrorCode = struct_PB.lErrorCode,
                szDescribeString = SpecialFunc.ConverGBKToUTF8(struct_PB.szDescribeString),
            }
            MessageManager.Shared():postMsg(MsgKeyData.Key_GameServerLogonFailed, tempData)
            print("---------- 登录游戏服务器失败 ----------")
            print("错误代码:PB_GR_LogonFailed.lErrorCode", struct_PB.lErrorCode)
            local tip = SpecialFunc.ConverGBKToUTF8(struct_PB.szDescribeString)
            print("szDescribeString:PB_GR_LogonFailed.szDescribeString", tip)
            print("---------- 登录游戏服务器失败 ----------")
        elseif subCMD == CMD_Game.SUB_GR_LOGON_FINISH then
            local struct_PB = ServerStruct_Game_pb.PB_GR_LogonSuccess()
            struct_PB:ParseFromString(data)
            GameManager.Shared():LoginSuccess(struct_PB)
            print("---------- 登录游戏服务器成功 ----------")
            print("是否需要复活 0 积分自购不提示 1 提示用户 2积分不足但不提示 直接请求复活即可:PB_GR_LogonSuccess.wType", struct_PB.wType)
            print("描述消息:PB_GR_LogonSuccess.szDescribeString", struct_PB.szDescribeString)
            print("连胜局数:PB_GR_LogonSuccess.cbWinningStreak", struct_PB.cbWinningStreak)
            print("是否已经在线:PB_GR_LogonSuccess.bAlreadyOnline", struct_PB.bAlreadyOnline)
            print("用户积分:PB_GR_LogonSuccess.lScore", struct_PB.lScore)
            print("---------- 登录游戏服务器成功 ----------")
        end
    elseif mainCMD == CMD_Game.MDM_GR_USER then
        --主命令 用户
        if subCMD == CMD_Game.SUB_GR_REQUEST_FAILURE then
            local struct_PB = ServerStruct_Game_pb.PB_GR_RequestFailed()
            struct_PB:ParseFromString(data)
            print("---------- 用户状态请求失败 ----------")
            print("PB_GR_RequestFailed.lErrorCode", struct_PB.lErrorCode)
            print("PB_GR_RequestFailed.szDescribeString", SpecialFunc.ConverGBKToUTF8(struct_PB.szDescribeString))
            print("---------- 用户状态请求失败 ----------")
        elseif subCMD == CMD_Game.SUB_GR_USER_SCORE then
            local struct_PB = ServerStruct_Game_pb.PB_GR_UserScore()
            struct_PB:ParseFromString(data)
            print("---------- 用户分数 ----------")
            print("dwUserID：", struct_PB.dwUserID)
            print("lScore：", struct_PB.lScore)
            print("---------- 用户分数 ----------")
        end
    elseif mainCMD == CMD_Game.MDM_CS_MATCH_SERVER then
        --主命令 比赛服务
    end

    local recvClass = require("src.JunTuan.src.network.MsgRecvMgr").Shared()
    if recvClass then
        print("---------- recvClass ----------")
        recvClass:receiveCallFunc(mainCMD, subCMD, data)
    end
end

return _M