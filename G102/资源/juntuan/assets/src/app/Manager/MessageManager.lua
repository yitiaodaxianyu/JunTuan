local _M = {}
local obj = nil

_M.LogonSuccess = "LogonSuccess"


-- 单例
function _M.Shared()
	if not obj then
		obj = setmetatable({}, {__index = _M})
		obj:Init()
	end
	return obj
end

function _M:Init()
	_M.m_handlers = {}
	_M.m_handlerIndex = 0
end

function _M:addMsg(key, func)
	return self:addEventHandler(key, func)
end

function _M:postMsg(key, data)
	self:postEventHandler(key, data)
end

function _M:removeMsg(key, handler)
	self:removeEventHandler(key, handler)
end

function _M:addEventHandler(eventName, handle)
	if nil == self.m_handlers[eventName] then
		self.m_handlers[eventName] = {}
	end
	self.m_handlerIndex = self.m_handlerIndex + 1
	self.m_handlers[eventName][self.m_handlerIndex] = handle
	return self.m_handlerIndex
end

function _M:removeEventHandler(eventName, handleNum)
	if nil ~= self.m_handlers[eventName] then
		if nil == handleNum then
			self.m_handlers[eventName] = nil
		else
			for k,_ in pairs(self.m_handlers[eventName]) do
				if k == handleNum then
					self.m_handlers[eventName][k] = nil
					print(string.format("MsgKey........%s:remove()",eventName))
					break
				end
			end
		end
	end
end

function _M:postEventHandler(eventName, data)
	if nil ~= self.m_handlers[eventName] then
		local tempArr = {}
		for _,v in pairs(self.m_handlers[eventName]) do
			table.insert(tempArr,v)
		end
		for _,v in pairs(tempArr) do
			v(data)
		end
	end
end

MessageManager = _M