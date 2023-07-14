local _M = {}

local platform = DeviceUtil.Platform()
local luaoc = require("src.cocos.cocos2d.luaoc")
local luaj = require("src.cocos.cocos2d.luaj")

-- 添加WebView 参数：url网络地址、左下角点x、y、width宽、height高
function _M.ShowView(url, x, y, width, height)
	if "ios" == platform then
		luaoc.callStaticMethod("WebViewUtil", "ShowView", {url=url,x=x,y=y,width=width,height=height})
	elseif "android" == platform then
		-- width/height(cc.Director:getInstance():getOpenGLView():getFrameSize())
		local fs = cc.Director:getInstance():getOpenGLView():getFrameSize()
		local top = fs.height-y-height
		local className = "com/lexun/common/WebViewHelper"
		local args = {url,x,top,width,height}
		local sigs = "(Ljava/lang/String;IIII)V"
		local ok = luaj.callStaticMethod(className,"addComonWebView",args,sigs)
		if not ok then
			print("luaj error-ShowView()-url:",url)
		end
	end
end
-- 添加WebView 参数：html地址、左下角点x、y、width宽、height高
function _M.ShowViewByHtml(htmlPath, x, y, width, height)
	if "ios" == platform then
		luaoc.callStaticMethod("WebViewUtil", "ShowViewByHtml", {htmlPath=htmlPath,x=x,y=y,width=width,height=height})
	elseif "android" == platform then
	end
end
-- 移除WebView
function _M.RemoveView()
	if "ios" == platform then
		luaoc.callStaticMethod("WebViewUtil", "RemoveView")
	elseif "android" == platform then
		local className = "com/lexun/common/WebViewHelper"
		local args = {}
		local sigs = "()V"
		local ok = luaj.callStaticMethod(className,"removeWebView",args,sigs)
		if not ok then
			print("luaj error-RemoveView()")
		end
	end
end
-- 设置监听回调 参数：callBack回调函数
function _M.SetListenBack(callBack)
	if "ios" == platform then
		luaoc.callStaticMethod("WebViewUtil", "SetListenBack", {callBack=callBack})
	elseif "android" == platform then
		local className = "com/lexun/common/WebViewHelper"
		local args = {callBack,callBack,0,callBack}--(startCall,overCall,finishCall,failCall)
		local sigs = "(IIII)V"
		local ok = luaj.callStaticMethod(className,"setWebViewListener",args,sigs)
		if not ok then
			print("luaj error-SetListenBack()")
		end
	end
end
-- 清除监听回调
function _M.ClearListen()
	if "ios" == platform then
		luaoc.callStaticMethod("WebViewUtil", "ClearListen")
	elseif "android" == platform then
		local className = "com/lexun/common/WebViewHelper"
		local args = {callBack}
		local sigs = "()V"
		local ok = luaj.callStaticMethod(className,"clearWebViewListener",args,sigs)
		if not ok then
			print("luaj error-ClearListen()")
		end
	end
end
-- 拉起H5支付
function _M.DoHfivePay(url, headerKey, headerVal)
	if "ios" == platform then

	elseif "android" == platform then
		-- 先设置webview回调
		local function callBackFun(url)
			print("DoHfivePay-url:",url)
			print("拉起H5支付1")
			local http1 = string.find(url,"http") or 0
			local http2 = string.find(url,"https") or 0
			if http1 ~= 1 and http2 ~= 1 then
				-- 请求调用App
				local bix_1 = string.find(url,"alipays://platformapi/startApp")--调用支付宝
				local bix_2 = string.find(url,"weixin://wap/pay")--调用微信
				if (bix_1 and bix_1 == 1) or (bix_2 and bix_2 == 1) then
					ThirdUtil.OpenAppByUrl(url)
				end
				WebViewUtil.ClearListen()
				WebViewUtil.RemoveView()
				print("拉起H5支付2")
			else
				-- 普通http请求
				print("拉起H5支付3")
			end
		end
		WebViewUtil.SetListenBack(callBackFun)

		-- 通过webview请求支付
		local className = "com/lexun/common/WebViewHelper"
		local args = {url,headerKey or "",headerVal or ""}
		local sigs = "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"
		local ok = luaj.callStaticMethod(className,"addPayWebView",args,sigs)
		if not ok then
			print("luaj error-ShowView()-url:",url)
		end
	end
end

WebViewUtil = _M