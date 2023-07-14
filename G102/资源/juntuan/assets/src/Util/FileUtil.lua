local _M = {}
-- 构造
function _M.new()
	return setmetatable({}, {__index = _M})
end
-- 设置文件名
function _M:SetFile(fileName)
	self.filePath = cc.FileUtils:getInstance():getWritablePath() .. fileName
end
-- 设置文件路径
function _M:SetFilePath(filePath)
	self.filePath = filePath
end
-- 打开方式 参数：mode打开方式
function _M:Open(mode)
	if self.file then
		self.file:close()
	end
	self.file = io.open(self.filePath, mode)
	if self.file then
		self.file:setvbuf("no")
	else
		LuaPrint("open file error!",self.filePath)
		return false
	end
	return true
end
-- 读取数据
function _M:Read()
	if self.file then
		return self.file:read("%a")
	end
	return ""
end
-- 写入数据
function _M:Write(data)
	if self.file then
		self.file:write(data)
	end
end
-- 关闭
function _M:Close()
	if self.file then
		self.file:close()
		self.file = nil
	end
end
-- 读取所有数据
function _M:ReadData()
	self:Open("rb")
	local data = self:Read()
	self:Close()
	return data
end
-- 写入数据
function _M:WriteData(data)
	self:Open("a+")
	if "table" == type(data) then
		self:Write(JsonUtil.encode(data))
	else
		self:Write(data)
	end
	self:Close()
end

-- 判断子游戏的文件是否存在
function _M:checkGameFileExist(path)
	if not path then return end
	local filePath = ""
	path = string.split(path, ".")
	for k,v in pairs(path) do
		if k == 1 then
			filePath = filePath .. v
		else
			filePath = filePath .. "/" .. v
		end
	end
	filePath = filePath .. ".lua"
	print("filePath: ", filePath)
	return cc.FileUtils:getInstance():isFileExist(filePath)
end

return _M