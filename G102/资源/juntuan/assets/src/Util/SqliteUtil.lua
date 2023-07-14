-- sqlite数据库操作
local _M = {}
_M.__index = _M
_M.m_db = nil --数据库对象

local sqlFormat = function(...)
    return string.format(...)
end

local sqlite3 = require("sqlite3")

-- 构造
function _M.new()
	return setmetatable({}, {__index = _M})
end

-- 打开数据库 参数：db路径，如没有则会自动创建
function _M:openDB(dbFile)
	local dbPath = cc.FileUtils:getInstance():getWritablePath() .. dbFile
	self.m_db = sqlite3.open(dbPath)
	if nil == self.m_db then
		print("openDB error",dbPath)
	end
end

-- 关闭数据库
function _M:closeDB()
	if nil ~= self.m_db then
		self.m_db:close()
		self.m_db = nil
	end
end

-- 执行sql语句 返回数组
function _M:nrows(sqlStr)
	local rows = {}
	local index = 1
	for row in self.m_db:nrows(sqlStr) do
		rows[index] = row
		index = index + 1
	end
	return rows
end

-- 执行sql语句 返回bool
function _M:execute(sqlStr, call)
	if sqlite3.OK == self.m_db:exec(sqlStr, call) then
		return true
	end
	print("do -- " .. sqlStr .. " -- error")
	return false
end

-- This function returns the rowid of the most recent INSERT into the database. If no inserts have ever occurred, 0 is returned.
function _M:last_insert_rowid()
	return self.m_db:last_insert_rowid()
end

-- 执行transaction
function _M:transaction(table)
	local sqlStr = ""
	for i=1,#table do
		sqlStr = sqlFormat("%s%s",sqlStr,table[i])
	end
	sqlStr = sqlFormat("BEGIN TRANSACTION;%sEND TRANSACTION",sqlStr)
	return self:execute(sqlStr)
end

-- transaction开始
function _M:beginTransaction()
	return self:execute("BEGIN TRANSACTION")
end

-- transaction结束
function _M:endTransaction()
	return self:execute("END TRANSACTION")
end

-- transaction提交
function _M:commitTransaction()
	return self:execute("COMMIT")
end

-- transaction回滚
function _M:rollbackTransaction()
	return self:execute("ROLLBACK")
end

-- 创建table
function _M:createTable(tableName, kvTable)
	local sqlStr = sqlFormat("CREATE TABLE if not exists %s (", tableName)
	local isFirst = true
	for key,value in pairs(kvTable) do
		if true == isFirst then
			sqlStr = sqlFormat("%s%s %s", sqlStr, key, value)
			isFirst = false
		else
			sqlStr = sqlFormat("%s, %s %s", sqlStr, key, value)
		end
	end
	sqlStr = sqlFormat("%s)",sqlStr)
	return self:execute(sqlStr)
end

-- 删除table数据
function _M:deleteContents(tableName)
	local sqlStr = sqlFormat("DELETE FROM %s", tableName)
	return self:execute(sqlStr)
end

-- 读取table所有数据
function _M:readFullTable(tableName)
	local sqlStr = sqlFormat("SELECT * FROM %s", tableName)
	return self:nrows(sqlStr)
end

function _M:addTable(tableName, key, type)
	local sqlStr = sqlFormat("ALTER TABLE %s ADD COLUMN %s %s", tableName, key, type)
	return self:execute(sqlStr)
end

-- 插入数据
function _M:insertInto(tableName, values)
	local sqlStr = sqlFormat("INSERT INTO %s VALUES ('%s'", tableName, values[1])
	for i = 2, #(values) do
		sqlStr = sqlFormat("%s, '%s'", sqlStr, values[i])
	end
	sqlStr = sqlFormat("%s)", sqlStr)
	return self:execute(sqlStr)
end

-- 插入数据
function _M:insert(tableName, table)
	local sqlStr = sqlFormat("INSERT INTO %s(", tableName)
	local isFirst = true
	local keyStr = ""
	local valueStr = ""
	for key,value in pairs(table) do
		if true == isFirst then
			keyStr = sqlFormat("%s%s", keyStr, key)
			valueStr = sqlFormat("%s'%s'", valueStr, value)
			isFirst = false
		else
			keyStr = sqlFormat("%s, %s", keyStr, key)
			valueStr = sqlFormat("%s, '%s'", valueStr, value)
		end
	end
	sqlStr = sqlFormat("%s%s) VALUES (%s)", sqlStr, keyStr, valueStr)
	return self:execute(sqlStr)
end

-- 插入数据 select last_insert_rowid()
function _M:insertReturnLastRowID(tableName, table)
	local sqlStr = sqlFormat("INSERT INTO %s(", tableName)
	local isFirst = true
	local keyStr = ""
	local valueStr = ""
	for key,value in pairs(table) do
		if true == isFirst then
			keyStr = sqlFormat("%s%s", keyStr, key)
			valueStr = sqlFormat("%s'%s'", valueStr, value)
			isFirst = false
		else
			keyStr = sqlFormat("%s, %s", keyStr, key)
			valueStr = sqlFormat("%s, '%s'", valueStr, value)
		end
	end
	sqlStr = sqlFormat("%s%s) VALUES (%s);select last_insert_rowid()", sqlStr, keyStr, valueStr)
	return self:nrows(sqlStr)
end

-- 插入数据
function _M:insertIntoSpecific(tableName, cols, values)
	if #(cols) ~= #(values) then
		print("cols length != values length")
		return false
	end
	local sqlStr = sqlFormat("INSERT INTO %s(%s", tableName, cols[1])
	local colStr = ""
	local valueStr = sqlFormat("'%s'", values[1])
	for i = 2, #(cols) do
		colStr = sqlFormat("%s, %s", colStr, cols[i])
		colStr = sqlFormat("%s, '%s'", valueStr, values[i])
	end
	sqlStr = sqlFormat("%s%s) VALUES (%s)", sqlStr, colStr, valueStr)
	return self:execute(sqlStr)
end

-- 删除数据
function _M:delete(tableName, cols, colsvalues)
	local sqlStr = sqlFormat("DELETE FROM %s WHERE %s = '%s'", tableName, cols[1], colsvalues[1])
	for i = 2, #(cols) do
		sqlStr = sqlFormat("%s or %s = '%s'", sqlStr, cols[i], colsvalues[i])
	end
	return self:execute(sqlStr)
end

-- 更新数据
function _M:updateInto(tableName, cols, colsvalues, selectkey, selectvalue)
	local sqlStr = sqlFormat("UPDATE %s SET %s = '%s'", tableName, cols[1], colsvalues[1])
	for i = 2, #(colsvalues) do
		sqlStr = sqlFormat("%s, %s = '%s'", sqlStr, cols[i], colsvalues[i])
	end
	sqlStr = sqlFormat("%s WHERE %s = '%s'", sqlStr, selectkey, selectvalue)
	return self:execute(sqlStr)
end

-- 更新数据
function _M:updateInfoInto(tableName, setData, selectkey, selectvalue)
	local sqlStr = sqlFormat("UPDATE %s SET ", tableName)
	local isFirst = true
	for k,v in pairs(setData) do
		if isFirst then
			isFirst = false
			sqlStr = sqlFormat("%s%s = '%s'", sqlStr, k, v)
		else
			sqlStr = sqlFormat("%s, %s = '%s'", sqlStr, k, v)
		end
	end
	sqlStr = sqlFormat("%s WHERE %s = '%s'", sqlStr, selectkey, selectvalue)
	return self:execute(sqlStr)
end

-- 查找数据
function _M:selectWhere(tableName, items, col, operation, values)
	local sqlStr = sqlFormat("SELECT %s", items[1])
	for i = 2, #(items) do
		sqlStr = sqlFormat("%s, %s",sqlStr, items[i])
	end
	sqlStr = sqlFormat("%s FROM %s WHERE %s%s'%s'", sqlStr, tableName, col[1], operation[1], values[1])
	for i = 2, #(items) do
		sqlStr = sqlFormat("%s AND %s%s'%s'", sqlStr, col[i], operation[i], values[i])
	end
	return self:nrows(sqlStr)
end
-- SqliteUtil = _M
return _M