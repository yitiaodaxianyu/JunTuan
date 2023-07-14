local _M = {}

-- 请求
local function SendRequest(obj)
	local xhr = cc.XMLHttpRequest:new()
	xhr.responseType = cc.XMLHTTPREQUEST_RESPONSE_STRING
	xhr:open(obj.type, obj.url)
	LuaPrint("Http SendRequest",obj.url)
	if obj.headerAry then
		for f,v in pairs(obj.headerAry) do
			if (cc.sys.isNative) then
				xhr:setRequestHeader(f, v)
			end
		end
	end
	local function onReadyStateChanged()
		if xhr.readyState == 4 and (xhr.status >= 200 and xhr.status < 207) then
			if obj and obj.successCall then
				obj.successCall(xhr.response)
			end
		else
			LuaPrint("http error",xhr.response)
			if obj and obj.failedCall then
				obj.failedCall()
			end
		end
		xhr:unregisterScriptHandler()
	end
	xhr:registerScriptHandler(onReadyStateChanged)
	xhr:send(obj.data)
end
-- Get请求 参数：url链接 successCall成功回调 failedCall失败回调
function _M.GetRequest(url, successCall, failedCall)
	local obj = {}
	obj.type = "GET"
	obj.url = url
	obj.successCall = successCall
	obj.failedCall = failedCall
	SendRequest(obj)
end
-- Post请求 参数：url链接 data数据 successCall成功回调 failedCall失败回调
function _M.PostRequest(url, data, successCall, failedCall)
	print("-----------tt:",url,"-yy:",data)
	local obj = {}
	obj.type = "POST"
	obj.url = url
	obj.data = data
	obj.successCall = successCall
	obj.failedCall = failedCall
	SendRequest(obj)
end

function _M.uploadRequest(urlStr, objFile, successCallBack, failCallBack)
	local data = {}
	data.type = "UPLOAD"
	data.url = urlStr
	data.successCall = successCallBack
	data.failedCall = failCallBack
	data.data = objFile
	SendRequest(data)
end

HttpUtil = _M