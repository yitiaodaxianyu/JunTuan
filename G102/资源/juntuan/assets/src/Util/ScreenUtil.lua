--手机屏幕工具类
--2019-12-19
local _M = {}

local platform = DeviceUtil.Platform()
local luaoc = require("src.cocos.cocos2d.luaoc")
local luaj = require("src.cocos.cocos2d.luaj")

--手机是否存在刘海屏、水滴屏宽高信息
function _M.IsHadScreenNotch(callback)
	if "ios" == platform then
	elseif "android" == platform then
		local function realCall(isHadStr)
			print("ScreenUtil-IsHadScreenNotch-isHadStr:",isHadStr)
			if not callback then return end

			if isHadStr and "1" == isHadStr then
				callback(true)
			else
				callback(false)
			end
		end

		local className = "com/lexun/common/ScreenHelper"
		local args = {realCall or 0}
		local sigs = "(I)V"
		local ok = luaj.callStaticMethod(className,"hasNotch",args,sigs)
		if not ok then
			print("luaj error-IsHadScreenNotch()")
		end
	end
end

--获取手机刘海屏、水滴屏宽高信息
function _M.GetScreenNotchInfo(callback)
	if "ios" == platform then
	elseif "android" == platform then
		local function realCall(notchInfo)
			--notchInfo格式:"w1,h1:w2,h2",安卓手机可能有多个刘海屏所以用":"来区分多个
			print("ScreenUtil-GetScreenNotchInfo-notchInfo:",notchInfo)
			if not callback then return end

			local w,h = 0,0
			if notchInfo ~= nil and "" ~= notchInfo then
				local infos = string.split(notchInfo, ":") or {notchInfo}
			    local arr = string.split(infos[1], ",")
			    if arr and #arr >= 2 then
			        local v1,v2 = tonumber(arr[1] or "0"),tonumber(arr[2] or "0")
			        w = math.max(v1,v2)
			        h = math.min(v1,v2)
			    end
			end
			callback(w,h)
		end

		local className = "com/lexun/common/ScreenHelper"
		local args = {realCall}
		local sigs = "(I)V"
		local ok = luaj.callStaticMethod(className,"getScreenNotchInfo",args,sigs)
		if not ok then
			print("luaj error-GetScreenNotchInfo()")
		end
	end
end

--将刘海屏、水滴屏宽高字符串信息转为宽高数值(这里默认只取一个刘海屏/水滴屏宽高信息)
function _M.ChangeNotchWHForAndroid(notchInfo)
	local w,h = 0,0
	if notchInfo == nil or "" == notchInfo then
		return w,h
	end

	local infos = string.split(notchInfo, ":") or {notchInfo}
    local arr = string.split(infos[1], ",")
    if arr and #arr >= 2 then
        local v1,v2 = tonumber(arr[1] or "0"),tonumber(arr[2] or "0")
        w = math.max(v1,v2)
        h = math.min(v1,v2)
    end
	return w,h
end	

ScreenUtil = _M