local _M = {}

local DBCenter = require("src.app.DB.DBCenter")
local tableName = "Account"

-- 创建表
local function CreateTable()
	local table = {
		UserID = "VARCHAR",
		Account = "VARCHAR unique",
		Password = "VARCHAR",
		Title = "VARCHAR",
		LoginType = "INTERGER",
		Time = "datetime not null default (datetime('now','localtime'))",
	}
	DBCenter.GetDB():createTable(tableName, table)
end

-- 获取所有账号
function _M.GetAllAccount()
	local sqlStr = string.format("select * from %s order by Time desc", tableName)
	return DBCenter.GetDB():nrows(sqlStr)
end

-- 设置账号信息
function _M.SetAccountInfo(userID, account, password, loginType)
	local title = account
	if LOGIN_TYPE_VISITOR == loginType then
		title = "游客" .. tostring(userID)
	end
	local sqlStr1 = string.format("delete from %s where UserID = '%s'", tableName, userID)
	DBCenter.GetDB():execute(sqlStr1)
	local sqlStr2 = string.format("insert into %s(UserID,Account,Password,Title,LoginType) values('%s','%s','%s','%s','%s')", tableName, userID, account, password, title, loginType)
	DBCenter.GetDB():execute(sqlStr2)
end

-- 获取最新账号
function _M.GetLastAccount()
	local sqlStr = string.format("select * from %s order by Time desc limit 1", tableName)
	local ary = DBCenter.GetDB():nrows(sqlStr)
	if ary and #ary > 0 then
		return ary[1]
	end
	return nil
end

-- 删除账号
function _M.DeleteAccount(account)
	local sqlStr = string.format("delete from %s where Account = '%s'",tableName, account)
	DBCenter.GetDB():execute(sqlStr)
end

-- 重设账号登录密码
function _M.ResetPassword(account, password)
	local sqlStr = string.format("update %s set Password = '%s' where Account = '%s'", tableName, password, account)
	DBCenter.GetDB():execute(sqlStr)
end

-- 重设登录标识
function _M.ResetLoginType(account, loginType)
	local sqlStr = string.format("update %s set LoginType = '%s' where Account = '%s'", tableName, loginType, account)
	DBCenter.GetDB():execute(sqlStr)
end

CreateTable()
return _M