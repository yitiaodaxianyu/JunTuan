local _M = {}

local stack = require("src.Util.StackUtil").new()
local listerner = nil
-- 统一回调
local function onKeyReleased(keyCode)
	if keyCode == cc.KeyCode.KEY_BACKSPACE or keyCode == cc.KeyCode.KEY_BACK then
		if stack:Size() > 0 then
			local call = stack:Peek()
			call()
		end
	end
end
-- 添加返回监听
function _M.AddKeyBackHandle(callFun)
	if not node or not callFun then
		return
	end
	stack:Push(callFun)
	-- 添加统一监听
	if not listerner then
		listerner = cc.EventListenerKeyboard:create()
		listerner:registerScriptHandler(onKeyReleased, cc.Handler.EVENT_KEYBOARD_RELEASED)
		cc.Director:getInstance():addEventListenerWithFixedPriority(listerner,1)
	end
end
-- 移除返回监听
function _M.RemoveKeyBackHandle(callFun)
	if stack:Size() > 0 then
		local call = stack:Peek()
		if call == callFun then
			stack:Pop()
		else
			LuaPrint("RemoveKeyBackHandle error!")
		end
	end
end

KeyBackUtil = _M