local _M = {}

local DBCenter = require("src.app.DB.DBCenter")
local tableName = "GameSet"

-- 创建表
local function CreateTable()
	local sqlStr = string.format("CREATE TABLE if not exists %s (key VARCHAR, value VARCHAR)",tableName)
	DBCenter.GetDB():execute(sqlStr)
end
-- 通过key获得value
local function GetValueForKey(key, default)
	key = tostring(key)
	local sqlStr = string.format("SELECT * from %s where key = '%s'", tableName, key)
	local retAry = DBCenter.GetDB():nrows(sqlStr)
	if retAry and #retAry > 0 then
		return retAry[1].value
	end
	return default
end
-- 通过key设置value
function _M.SetValueForKey(key, value)
	key = tostring(key)
	local sqlStr1 = string.format("delete from %s where key = '%s'", tableName, key)
	DBCenter.GetDB():execute(sqlStr1)
	local sqlStr2 = string.format("insert into %s(key,value) values('%s','%s')", tableName, key, value)
	DBCenter.GetDB():execute(sqlStr2)
end
-- 通过key获得num类型数据
function _M.GetNumForKey(key, default)
	assert("number" == type(default), "default is not number")
	return tonumber(GetValueForKey(key, default))
end
-- 通过key获得string类型数据
function _M.GetStringForKey(key, default)
	assert("string" == type(default), "default is not string")
	return tostring(GetValueForKey(key, default))
end
-- 通过key获得bool类型数据
function _M.GetBoolForKey(key, default)
	assert("boolean" == type(default), "default is not boolean")
	local value = GetValueForKey(key, default)
	if "true" == value then
		return true
	end
	return false
end

CreateTable()
return _M