--手机传感器工具类
--2019-12-19
local _M = {}

local platform = DeviceUtil.Platform()
local luaoc = require("src.cocos.cocos2d.luaoc")
local luaj = require("src.cocos.cocos2d.luaj")

-- 添加手机屏幕方向变化监听(callback返回0,90,180,270;顺时针方向旋转，0代表手机正竖屏方向)
function _M.AddOrientationLis(callBack)
	if "ios" == platform then
	elseif "android" == platform then
		local className = "com/lexun/common/SensorHelper"
		local args = {callBack}
		local sigs = "(I)V"
		local ok = luaj.callStaticMethod(className,"addOrientationEventListener",args,sigs)
		if not ok then
			print("luaj error-AddOrientationLis()")
		end
	end
end

SensorUtil = _M