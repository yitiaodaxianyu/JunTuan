local _M = {}
local DBCenter = require("src.app.DB.DBCenter")
local tableName = "FriendList"

local function CreateTable()
    local friInfo = {
        rid = "INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
        userID = "Long",                                   --自己的id
        friUserID = "Long",                                --好友id
        friNick = " VARCHAR",                               --好友昵称
        friIconID = "INTEGER",                             --好友头像id
        Alphabet = "INTEGER",                               --首字母
        vipRank = "INTEGER",                                --vip等级
    }
    DBCenter.GetDB():createTable(tableName, friInfo)
end

--获取好友信息通过好友id
function _M.GetFriendInfoByID(friID)
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("select * from %s where userID = %s and friUserID = %s ", tableName,userID,friID)
    return DBCenter.GetDB():nrows(sqlStr)
end

--获取好友列表
function _M.GetFriendList()
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("select * from %s where userID = %s order by Alphabet asc", tableName,userID)
    return DBCenter.GetDB():nrows(sqlStr)
end

--添加好友
function _M.AddFriend(friInfo)
    local sqlStr = string.format("insert into %s(userID,friUserID,friNick,friIconID,Alphabet,vipRank)values('%s','%s','%s','%s','%s','%s')", tableName,
            friInfo.userID, friInfo.friUserID, friInfo.friNick, friInfo.friIconID, friInfo.Alphabet, friInfo.vipRank)
    DBCenter.GetDB():execute(sqlStr)
end

--删除好友
function _M.DeleleFriend(friUserID)
    local sqlStr = string.format("delete from %s where friUserID = %s",tableName, friUserID)
    DBCenter.GetDB():execute(sqlStr)
end

--删除好友列表
function _M.DeleleFriendList()
    local userID = UserData.Shared().dwUserID
    local sqlStr = string.format("delete from %s where userID = %s",tableName, userID)
    DBCenter.GetDB():execute(sqlStr)
end


--更新好友信息
function _M.UpdateFriendInfo(friInfo)
    local userID = UserData.Shared().dwUserID
    --local userID = 12321
    local sqlStr = string.format("update %s set friNick = '%s', friIconID = '%s', Alphabet = '%s', vipRank = '%s' where friUserID = %s and userID = %s",tableName,
            friInfo.friNick,friInfo.friIconID,friInfo.Alphabet,friInfo.vipRank,friInfo.friUserID,userID)
    DBCenter.GetDB():execute(sqlStr)
end

--是否是好友
function _M.IsFriend(_id)
    local friList = _M.GetFriendList()
    local isFriend = false
    for _,v in pairs(friList) do
        if v.friUserID == _id then
            isFriend = true
            break
        end
    end
    return isFriend
end

CreateTable()
return _M