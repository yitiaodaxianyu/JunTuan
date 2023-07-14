local _M = {}
local DBCenter = require("src.app.DB.DBCenter")
local SessionDB = require("src.app.DB.SessionDB")
local FriendDB = require("src.app.DB.FriendDB")
local tableName = "Content"

local function CreateTable()
    local msgInfo = {
        rid = "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
        msgID = "LONG",                                     --消息ID
        userID = "INTEGER",                                 --自己ID
        objID = "INTEGER",                                  --聊天对象ID
        senderID = "INTEGER",                               --发送者ID
        receiverID = "INTEGER",                             --接受者ID
        content = "VARCHAR",                                --消息内容
        sendTime = "LONG",                                  --消息发送时间
    }
    DBCenter.GetDB():createTable(tableName, msgInfo)
end

--插入一条消息
function _M.InsertMsgContent(msgInfo)
    local sqlStr = string.format("insert into %s(msgID,userID,objID,senderID,receiverID,content,sendTime)values('%s','%s','%s','%s','%s','%s','%s')", tableName,
            msgInfo.msgID, msgInfo.userID,msgInfo.objID, msgInfo.senderID, msgInfo.receiverID, msgInfo.content, msgInfo.sendTime)
    DBCenter.GetDB():execute(sqlStr)
end

--批量插入
function _M.InsertMsgList(msgList)
    DBCenter.GetDB():beginTransaction()
    for k,v in pairs(msgList) do
        _M.InsertMsgContent(v)
    end
    DBCenter.GetDB():commitTransaction()
end

--获取自己和某人的聊天记录
function _M.GetAllMsgContent(objID,msgNum)
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("select * from %s where userID = %s and objID = %s order by sendTime desc limit %s", tableName,userID,objID,msgNum)
    local nrows =  DBCenter.GetDB():nrows(sqlStr)

    local friData = SessionDB.GetSessionInfo(objID)
    if not friData[1] then
        friData = FriendDB.GetFriendInfoByID(objID)
    end
    if friData[1] then
        for k, v in pairs(nrows) do
            v.objID = friData[1].objID or friData[1].friUserID
            v.objNick = friData[1].objNick or friData[1].friNick
            v.objIconID = friData[1].objIconID or friData[1].friIconID
        end
    end
    return nrows
end

function _M.GetContentByMsgID(msgID)
    local sqlStr = string.format("select * from %s where msgID = %s ", tableName,msgID)
    local nrows =  DBCenter.GetDB():nrows(sqlStr)
    if nrows[1] then
        return true
    else
        return false
    end
end

--删除和某人聊天记录
function _M.DeleateMsgContent(objID)
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("delete from %s where userID = %s and objID = %s ",tableName, userID,objID)
    DBCenter.GetDB():execute(sqlStr)
end

CreateTable()
return _M