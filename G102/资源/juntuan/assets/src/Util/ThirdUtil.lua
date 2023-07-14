local _M = {}

local platform = DeviceUtil.Platform()
local luaoc = require("src.cocos.cocos2d.luaoc")
local luaj = require("src.cocos.cocos2d.luaj")

-- 通过浏览器打开链接 参数：url链接
function _M.OpenUrl(url)
	if "ios" == platform then
		luaoc.callStaticMethod("ThirdUtil", "OpenUrl", {url = url})
	elseif "android" == platform then
		local className = "com/lexun/common/ThirdHelper"
		local args = {url}
		local sigs = "(Ljava/lang/String;)V"
		local ok = luaj.callStaticMethod(className,"openBrowser",args,sigs)
		if not ok then
			print("luaj error-OpenUrl()-url:",url)
		end
	end
end
-- 通过url scheme打开APP 参数：url
function _M.OpenAppByUrl(url)
	if "ios" == platform then
		
	elseif "android" == platform then
		local className = "com/lexun/common/ThirdHelper"
		local args = {url}
		local sigs = "(Ljava/lang/String;)V"
		local ok = luaj.callStaticMethod(className,"openThirdByUrl",args,sigs)
		if not ok then
			print("luaj error-OpenAppByUrl()-url:",url)
		end
	end
end
-- 通过包名打开APP 参数：packageName包名
function _M.OpenApp(packageName)
	if "ios" == platform then
		luaoc.callStaticMethod("ThirdUtil", "OpenApp", {packageName = packageName})
	elseif "android" == platform then
		local className = "com/lexun/common/ThirdHelper"
		local args = {packageName}
		local sigs = "(Ljava/lang/String;)V"
		local ok = luaj.callStaticMethod(className,"openThirdByPkName",args,sigs)
		if not ok then
			print("luaj error-OpenApp()-url:",url)
		end
	end
end
-- 拨打电话
function _M.CallPhone(phoneNum)
	if "ios" == platform then
		luaoc.callStaticMethod("ThirdUtil", "CallPhone", {phoneNum = phoneNum})
	elseif "android" == platform then
		local className = "com/lexun/common/ThirdHelper"
		local args = {phoneNum}
		local sigs = "(Ljava/lang/String;)V"
		local ok = luaj.callStaticMethod(className,"openPhoneDialView",args,sigs)
		if not ok then
			print("luaj error-CallPhone()-url:",url)
		end
	end
end
-- 获取剪切板内容
function _M.GetClipBoard(callBack)
	if "ios" == platform then
		local ok,ret = luaoc.callStaticMethod("ThirdUtil", "GetClipBoard")
		if callBack ~= nil then
			callBack(ret)
		end
		if ok then return ret end
	elseif "android" == platform then
		local className = "com/lexun/common/ThirdHelper"
		local args = {callBack}
		local sigs = "(I)V"
		local ok = luaj.callStaticMethod(className,"getLatestClidBoardText",args,sigs)
		if not ok then
			print("luaj error-GetClipBoard()")
		end
	end
	return ""
end
-- 设置剪切板内容
function _M.SetClipBoard(str)
	if "ios" == platform then
		luaoc.callStaticMethod("ThirdUtil", "SetClipBoard", {str = str})
	elseif "android" == platform then
		local className = "com/lexun/common/ThirdHelper"
		local args = {str}
		local sigs = "(Ljava/lang/String;)V"
		local ok = luaj.callStaticMethod(className,"addTextToClidBoard",args,sigs)
		if not ok then
			print("luaj error-SetClipBoard()")
		end
	end
end

ThirdUtil = _M