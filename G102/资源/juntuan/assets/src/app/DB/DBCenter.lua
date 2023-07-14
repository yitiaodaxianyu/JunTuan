local _M = {}

local SqliteUtil = require("src.Util.SqliteUtil")
local dbName = "landlordgame.db"
local db = nil

function _M.GetDB()
	if not db then
		db = SqliteUtil.new()
		db:openDB(dbName)
	end
	return db
end

function _M.CloseDB()
	if db then
		db:closeDB()
		db = nil
	end
end


return _M