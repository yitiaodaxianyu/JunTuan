local _M = {}

local platform = "pc"
local osVersion = ""
local serialNum = ""
local deviceModel = ""
local imei = "PCIMEI"

local targetPlatform = cc.Application:getInstance():getTargetPlatform()

local luaoc = require("src.cocos.cocos2d.luaoc")
local luaj = require("src.cocos.cocos2d.luaj")

-- 设备平台
function _M.Platform()
	local platform_idx = 0
	if "ios" == device.platform then
		platform = "ios"
		platform_idx = 2
	elseif "android" == device.platform then
		platform = "android"
		platform_idx = 1
	end
	return platform, platform_idx
end
-- 系统版本
function _M.OsVersion()
	if "ios" == platform then
		local ok,ret = luaoc.callStaticMethod("DeviceUtil", "OsVersion", {})
		if ok then osVersion = ret end
	elseif "android" == platform then
		local className = "com/lexun/common/DeviceHelper"
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local ok,ret = luaj.callStaticMethod(className,"getOsVersion",args,sigs)
		if ok then
			osVersion = ret
		else
			print("luaj error-OsVersion():")
		end
	end
	return osVersion
end
-- 设备序列号
function _M.SerialNum()
	if "android" == platform then
		local className = "com/lexun/common/DeviceHelper"
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local ok,ret = luaj.callStaticMethod(className,"getSerialNum",args,sigs)
		if ok then
			serialNum = ret
		else
			print("luaj error-SerialNum():")
		end
	end
	return serialNum
end
-- 设备型号
function _M.DeviceModel()
	if "ios" == platform then
		local ok,ret = luaoc.callStaticMethod("DeviceUtil", "DeviceModel")
		if ok then deviceModel = ret end
	elseif "android" == platform then
		local className = "com/lexun/common/DeviceHelper"
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local ok,ret = luaj.callStaticMethod(className,"getModel",args,sigs)
		if ok then
			deviceModel = ret
		else
			print("luaj error-DeviceModel():")
		end
	end
	return deviceModel
end
-- 设备IMEI
function _M.IMEI()
	local isOk = false
	if "ios" == device.platform then
		local ok,ret = luaoc.callStaticMethod("DeviceUtil", "IMEI")
		if ok then
			if DeviceUtil.checkDeviceIsInvaidImei(ret) then
				isOk = true
			end
			imei = ret
		end
	elseif "android" == device.platform then
		local className = "com/lexun/common/DeviceHelper"
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local ok,ret = luaj.callStaticMethod(className,"getDeviceId",args,sigs)
		if ok then
			if DeviceUtil.checkDeviceIsInvaidImei(ret) then
				isOk = true
			end
			imei = ret
		end
	else
		isOk = true
		imei = SpecialFunc.GetDeviceHostName() .. "4"
	end
	print("IMEI",imei)
	return imei, isOk
end

function _M.checkDeviceIsInvaidImei(imei)
	local imeiStr = imei or DeviceUtil.IMEI()
	if nil == imeiStr or "" == string.gsub(imeiStr, " ", "")
			or imeiStr == "0123456789ABCDEF"
			or imeiStr == "unknown"
			or imeiStr == "00000000000000000000000000000000"
			or imeiStr == "null"
			or imeiStr == "NULL"
			or imeiStr == "0000000000000000" then
		return false
	end

	return true
end

function _M.initOAIDSDK()
	if cc.PLATFORM_OS_ANDROID == targetPlatform then
		local args = {}
		local sigs = "()Z"
		local className = "com/lexun/common/DeviceHelper"
		local ok,ret  = luaj.callStaticMethod(className,"initOAIDSDK",args,sigs)
		if not ok then
			print("luaj error:",ret)
			ret = false
		else
			print("initOAIDSDK is ok:", ret)
		end
		return ret or ""
	end
end

-- 获取mac
function _M.getMacAddress()
	if cc.PLATFORM_OS_ANDROID == targetPlatform then
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local className = "com/lexun/common/DeviceHelper"
		local ok,ret  = luaj.callStaticMethod(className,"getMacAddress",args,sigs)
		if not ok then
			print("luaj error:",ret)
			ret = ""
		else
			print("getMacAddress, mac:", ret)
		end
		return ret or ""
	end
	return ""
end

-- 获取UUID
function _M.getUUID()
	if cc.PLATFORM_OS_ANDROID == targetPlatform then
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local className = "com/lexun/common/DeviceHelper"
		local ok,ret  = luaj.callStaticMethod(className,"getUUID",args,sigs)
		if not ok then
			print("luaj error:",ret)
			ret = ""
		else
			print("UUID:", ret)
		end
		return ret or ""
	end
	return ""
end

-- 手机AndroidId
function _M.getAndroidId()
	if cc.PLATFORM_OS_ANDROID == targetPlatform then
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local className = "com/lexun/common/DeviceHelper"
		local ok,ret  = luaj.callStaticMethod(className,"getAndroidId",args,sigs)
		if not ok then
			print("luaj error:",ret)
			ret = ""
		else
			print("AndroidId:", ret)
		end
		return ret or ""
	end
	return ""
end

-- 手机OAID
function _M.getOAID()
	if cc.PLATFORM_OS_ANDROID == targetPlatform then
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local className = "com/lexun/common/DeviceHelper"
		local ok,ret  = luaj.callStaticMethod(className,"getOAID",args,sigs)
		if not ok then
			print("luaj error:",ret)
			ret = ""
		else
			print("OAID:", ret)
		end
		return ret or ""
	end
	return ""
end

-- 获取手机信息
function _M.getPhoneInfo()
	if cc.PLATFORM_OS_ANDROID == targetPlatform then
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local className = "com/lexun/common/DeviceHelper"
		local ok,ret  = luaj.callStaticMethod(className,"printAllDeviceInfos",args,sigs)
		if not ok then
			print("luaj error:",ret)
			ret = ""
		else
			print("OAID:", ret)
		end
		return ret or ""
	end
	return ""
end

-- 设备存储卡地址
function _M.ExternalDir()
	local path = device.writablePath
	if "android" == platform then
		local className = "com/lexun/common/FileHelper"
		local args = {}
		local sigs = "()Ljava/lang/String;"
		local ok,ret = luaj.callStaticMethod(className,"getExternalFilesDir",args,sigs)
		if ok then
			path = ret
			print("ExternalDir:", path)
		else
			print("luaj error-ExternalDir():")
		end
	end
	return path
end

-- 设置屏幕方向 flag（0横屏 1竖屏）
function _M.SetScreenOrientation(flag)
	if "ios" == platform then
		luaoc.callStaticMethod("DeviceUtil", "SetScreenOrientation", {flag = flag})
	elseif "android" == platform then
		local args = {flag}
		local sigs = "(I)V"
		local className = "com/lexun/common/DeviceHelper"
		local ok = luaj.callStaticMethod(className,"setOrientation",args,sigs)
		if not ok then
			print("luaj error-SetScreenOrientation():")
		end
	end

	local view = cc.Director:getInstance():getOpenGLView()
    local czFrame = view:getFrameSize()
    local ww,hh = (czFrame.width or 0),(czFrame.height or 0)
    local max = math.max(ww,hh);
    local min = math.min(ww,hh);
    if 1 == flag then
		view:setFrameSize(min, max)
		display.setAutoScale(CC_DESIGN_RESOLUTION_PORTRAIT)
    else
		view:setFrameSize(max, min)
		display.setAutoScale(CC_DESIGN_RESOLUTION)
    end

	-- if 1 == flag then
	-- 	display.setAutoScale(CC_DESIGN_RESOLUTION_PORTRAIT)
	-- else
	-- 	display.setAutoScale(CC_DESIGN_RESOLUTION)
	-- end
end
-- 是否是真实设备
function _M.IsRealDevice()
	if "ios" == platform then
		local ok,ret = luaoc.callStaticMethod("DeviceUtil", "IsRealDevice")
		if not ok then
			return false
		else
			return ret
		end
	elseif "android" == platform then
		local args = {}
		local sigs = "()Z"
		local className = "com/lexun/common/DeviceHelper"
		local ok,ret = luaj.callStaticMethod(className,"isSimulator",args,sigs)
		if ok then
			if ret then
				--是模拟器
				return false
			end
		else
			print("luaj error-IsRealDevice():")
		end
	end
	return true--1
end
-- 屏幕常亮 flag（0关闭 1常亮）
function _M.KeepScreenOn(flag)
	if "ios" == platform then
		luaoc.callStaticMethod("DeviceUtil", "KeepScreenOn", {flag = flag})
	elseif "android" == platform then
		local args = {flag}
		local sigs = "(I)V"
		local className = "com/lexun/common/DeviceHelper"
		local ok = luaj.callStaticMethod(className,"setKeepScreenOn",args,sigs)
		if not ok then
			print("luaj error-KeepScreenOn():")
		end
	end
end

platform = _M.Platform()
DeviceUtil = _M