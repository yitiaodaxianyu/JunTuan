local _M = {}
local CMD_Game = require("src.macros.CMD_Game")

-- 打印
local function PrintMsg(title, mainCMD, subCMD)
    local msg = string.format("GameSend %s M:%d S:%d", title, mainCMD, subCMD)
    LuaPrint(msg)
end

-- 发送pb消息
function _M:SendPb(mainCMD, subCMD, pbObj)
    PrintMsg("", mainCMD, subCMD)
    local data = pbObj:SerializeToString()
    self:SendData(mainCMD, subCMD, data)
end

-- 登录登录服务器  MDM_MB_LOGON、SUB_MB_LOGON_COMMON
function _M:LoginServer()
    local phoneType = 0
    if DeviceUtil.IsRealDevice() then
        phoneType = 1
    end

    local password = UserData.Shared().password
    if password and password ~= "" then
        password = CodeUtil.MD5(password)
    else
        password = ""
    end

    local account = UserData.Shared().account
    if UserData.Shared().loginType == LOGIN_TYPE_VISITOR then
        if UserData.Shared().imei then
            account = CodeUtil.MD5(UserData.Shared().imei)
            password = ""
        else
            account = CodeUtil.MD5(UserData.Shared().phoneInfo)
        end

        -- 游客登录也记录信息
        local userId = UserData.Shared().dwUserID
        local loginType = UserData.Shared().loginType
        AccountDB.SetAccountInfo(userId, account, password, loginType)
    end

    local struct_PB = ServerStruct_Logon_pb.PB_MB_LogonOtherPlat()
    struct_PB.wChannel = QDChannel
    struct_PB.szAccount = account
    struct_PB.szPassword = password
    struct_PB.szMachineID = DeviceUtil.IMEI()
    struct_PB.dwLoginType = UserData.Shared().loginType
    struct_PB.dwPhoneType = phoneType
    struct_PB.strPhoneMode = DeviceUtil.DeviceModel()
    struct_PB.strPhoneSn = DeviceUtil.SerialNum()
    struct_PB.strMac = DeviceUtil.getMacAddress()
    struct_PB.strAndroidId = DeviceUtil.getAndroidId()
    self:SendPb(CMD_Game.MDM_MB_LOGON, CMD_Game.SUB_MB_LOGON_COMMON, struct_PB)
    print("---------- 发送登录登录服务器 ----------")
    print("PB_MB_LogonCommon.wChannel", struct_PB.wChannel)
    print("PB_MB_LogonCommon.szAccount", struct_PB.szAccount)
    print("PB_MB_LogonCommon.szPassword", struct_PB.szPassword)
    print("PB_MB_LogonCommon.dwLoginType", struct_PB.dwLoginType)
    print("PB_MB_LogonCommon.dwPhoneType", struct_PB.dwPhoneType)
    print("PB_MB_LogonCommon.strPhoneMode", struct_PB.strPhoneMode)
    print("PB_MB_LogonCommon.strPhoneSn", struct_PB.strPhoneSn)
    print("---------- 发送登录登录服务器 ----------")
end

-- 登录游戏服务器 MDM_GR_LOGON SUB_GR_LOGON_MOBILE
function _M:LoginGameServer()
    local struct_PB = ServerStruct_Game_pb.PB_GR_Logon()
    struct_PB.wMBClientVersion = 1
    struct_PB.wChannel = QDChannel
    struct_PB.wModelID = 1000
    struct_PB.dwUserID = UserData.Shared().dwUserID
    struct_PB.szPassword = UserData.Shared().szValidCode or ""
    struct_PB.szMachineName = ""
    self:SendPb(CMD_Game.MDM_GR_LOGON, CMD_Game.SUB_GR_LOGON_MOBILE, struct_PB)
    print("---------- 发送登录游戏服务器 ----------")
    print("PB_GR_Logon.wMBClientVersion", struct_PB.wMBClientVersion)
    print("PB_GR_Logon.wChannel", struct_PB.wChannel)
    print("PB_GR_Logon.wModelID", struct_PB.wModelID)
    print("PB_GR_Logon.dwUserID", struct_PB.dwUserID)
    print("PB_GR_Logon.szPassword", struct_PB.szPassword)
    print("PB_GR_Logon.szMachineName", struct_PB.szMachineName)
    print("---------- 发送登录游戏服务器 ----------")
end

return _M