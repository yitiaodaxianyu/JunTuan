local _M = {}

-- 创建一个新对象
function _M.new()
	return setmetatable({}, {__index = _M})
end
-- 在最后插入一条数据
function _M:Push(input)
  self[#self+1] = input
end
-- 推出最后一条数据
function _M:Pop()
  assert(#self > 0, "_M underflow")
  local output = self[#self]
  self[#self] = nil
  return output
end
-- 最后一条数据
function _M:Peek()
  return self[#self]
end
-- 整体大小
function _M:Size()
	return #self
end

return _M