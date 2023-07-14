local _M = {}
local DBCenter = require("src.app.DB.DBCenter")
local tableName = "Session"

local function CreateTable()
    local msgInfo = {
        rid = "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
        userID = "INTEGER",                                 --自己ID
        objID = "INTEGER",                                  --聊天对象ID
        objNick = "VARCHAR",                                --聊天对象昵称
        objIconID = "IcNTERGER",                            --聊天对象头像
        vipRank = "INTEGER",                                --聊天对象vip等级
        content = "VARCHAR",                                --最后消息内容
        lastTime = "LONG",                                  --消息接收时间
        isRead = "INTEGER",                                  --是否已读0未读 , 1已读
    }
    DBCenter.GetDB():createTable(tableName, msgInfo)
end
--标记会话已读
function _M.MarkRead(objID)
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("update %s set isRead = '%s' where objID = %s and userID = %s",tableName, 1 ,objID,userID)
    DBCenter.GetDB():execute(sqlStr)
end

--插入一条会话
function _M.InsertSession(msgInfo)
    local sqlStr = string.format("insert into %s(userID,objID,objNick,objIconID,vipRank,content,lastTime,isRead)values('%s','%s','%s','%s','%s','%s','%s','%s')", tableName,
            msgInfo.userID, msgInfo.objID, msgInfo.objNick, msgInfo.objIconID, msgInfo.vipRank, msgInfo.content, msgInfo.lastTime, msgInfo.isRead)
    DBCenter.GetDB():execute(sqlStr)
end

function _M.UpdateSession(data)
    _M.DeleteSession(data.objID)
    _M.InsertSession(data)
end

--批量插入
function _M.InsertSessionList(msgList)
    DBCenter.GetDB():beginTransaction()
    for k,v in pairs(msgList) do
        --_M.DeleteSession(v.objID)
        --_M.InsertSession(v)
        _M.UpdateSession(v)
    end
    DBCenter.GetDB():commitTransaction()
end

--删除一条会话
function _M.DeleteSession(objID)
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("delete from %s where userID = %s and objID = %s", tableName,userID,objID)
    return DBCenter.GetDB():execute(sqlStr)
end
--更新会话信息
--[[function _M.UpdateSession(msgInfo)
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("update %s set objNick = '%s', objIconID = '%s', vipRank = '%s', content = '%s', lastTime = '%s', isRead = '%s' where objID = %s and userID = %s",tableName,
            msgInfo.objNick,msgInfo.objIconID,msgInfo.vipRank,msgInfo.content,msgInfo.lastTime,msgInfo.isRead or 0,msgInfo.objID,userID)
    DBCenter.GetDB():execute(sqlStr)
end]]
--获取会话列表
function _M.GetSessionList()
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("select * from %s where userID = %s order by lastTime desc", tableName, userID)
    return DBCenter.GetDB():nrows(sqlStr)
end
--删除会话列表
function _M.DeleteSessionList()
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("delete from %s where userID = %s", tableName,userID)
    return DBCenter.GetDB():execute(sqlStr)
end

--获取会话信息
function _M.GetSessionInfo(objID)
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("select * from %s where userID = %s and objID = %s", tableName, userID,objID)
    return DBCenter.GetDB():nrows(sqlStr)
end

CreateTable()
return _M