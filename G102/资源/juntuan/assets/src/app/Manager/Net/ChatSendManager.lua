local _M = {}
local CMD_Game = require("src.macros.CMD_Game")
-- 打印
local function PrintMsg(title, mainCMD, subCMD)
	local msg = string.format("ChatSend %s M:%d S:%d",title, mainCMD, subCMD)
	LuaPrint(msg)
end
-- 发送pb消息
function _M:SendPb(mainCMD, subCMD, pbObj)
	local data = pbObj:SerializeToString()
	self:SendData(mainCMD, subCMD, data)
end
--------------------------------------------------------------------------------
-- 登录聊天服务器
--主：MDM_GR_LOGON 				1
--副：SUB_GR_LOGON_MOBILE 		2
function _M:LoginChatServer()
	local struct_PB = ServerStruct_Chat_pb.PBChatAccountLogin()
	struct_PB.userID = UserData.Shared().dwUserID
	struct_PB.password = UserData.Shared().szValidCode
	struct_PB.machineID = DeviceUtil.IMEI()
	print("用户idPBChatAccountLogin.userID",struct_PB.userID)
	print("用户密码PBChatAccountLogin.password",struct_PB.password)
	print("设备号PBChatAccountLogin.machineID",struct_PB.machineID)
	self:SendPb(CMD_Game.MDM_GR_LOGON,CMD_Game.SUB_GR_LOGON_MOBILE,struct_PB)
	PrintMsg("发送登录聊天服务器消息",CMD_Game.MDM_GR_LOGON,CMD_Game.SUB_GR_LOGON_MOBILE)
	print("----------------------------------------------------------------------------")
end
----------------------------------辅助服务-------------------------------
-- 请求公告消息
--主：MDM_ASSIST_SERVICE 		600
--副：SUB_AS_C_NOTICE 			1
function _M:SendChatGetNoticeMsg()
	local struct_PB = ServerStruct_Chat_pb.PBChatGetNoticeMsg()
	self:SendPb(CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_NOTICE,struct_PB)
	PrintMsg("发送请求公告消息",CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_NOTICE)
	print("----------------------------------------------------------------------------")
end
-- 请求历史消息
--主：MDM_ASSIST_SERVICE 		600
--副：SUB_AS_C_HISTORYMSG 		3
function _M:SendChatGetHistoryMsg(sendData)
	local struct_PB = ServerStruct_Chat_pb.PBChatGetHistoryMsg()
	struct_PB.channel = sendData.channel
	struct_PB.msgID = sendData.msgID
	struct_PB.requestNum = sendData.requestNum
	self:SendPb(CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_HISTORYMSG,struct_PB)
	PrintMsg("发送请求历史消息",CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_HISTORYMSG)
	print("频道",struct_PB.channel)
	print("消息id",struct_PB.msgID)
	print("请求数量",struct_PB.requestNum)
	print("----------------------------------------------------------------------------")
end
-- 请求游戏服务器在线人数
--主：MDM_ASSIST_SERVICE 		600
--副：SUB_AS_C_GAMEONLINE 		4
function _M:SendChatGetGameOnline(sendData)
	local struct_PB = ServerStruct_Chat_pb.PBChatGetGameOnline()
	struct_PB.roomType = sendData.roomType
	self:SendPb(CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_GAMEONLINE,struct_PB)
	PrintMsg("发送请求游戏服务器在线人数",CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_GAMEONLINE)
	print("----------------------------------------------------------------------------")
end
-- 请求聊天室系统提示
--主：MDM_ASSIST_SERVICE 		600
--副：SUB_AS_C_GAMEONLINE 		4
function _M:SendChatSystemHint(sendData)
	local struct_PB = ServerStruct_Chat_pb.PBChatSystemHint()
	struct_PB.roomType = sendData.roomType
	self:SendPb(CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_SYSTEMHIT,struct_PB)
	PrintMsg("发送请求聊天室系统提示",CMD_Game.MDM_ASSIST_SERVICE,CMD_Game.SUB_AS_C_SYSTEMHIT)
	print("----------------------------------------------------------------------------")
end
-------------------------------聊天服务---------------------------------------
-- 发送聊天消息
--主：MDM_CS_CHAT_SERVICE 		500
--副：SUB_CS_CHAT_MSG 			100
function _M:SendChatMsg(sendData)
	local struct_PB = ServerStruct_Chat_pb.PBChatSendChatMsg()
	struct_PB.channel = sendData.channel
	struct_PB.targetUserID = sendData.targetUserID
	struct_PB.msgRowID = sendData.msgRowID
	struct_PB.content = sendData.content
	struct_PB.msgtype = sendData.msgtype
	self:SendPb(CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_MSG,struct_PB)
	PrintMsg("发送聊天消息",CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_MSG)
	print("频道:PBChatSendChatMsg.channel",struct_PB.channel)
	print("目标用户:PBChatSendChatMsg.targetUserID",struct_PB.targetUserID)
	print("本地rowID:PBChatSendChatMsg.msgRowID",struct_PB.msgRowID)
	print("发送信息:PBChatSendChatMsg.content",struct_PB.content)
	print("消息类型 0:普通文件消息20:图片文件消息21语音文件消息7:鱼王竞赛邀请信息:PBChatSendChatMsg.msgtype",struct_PB.msgtype)
	print("----------------------------------------------------------------------------")
end

-- 设置聊天频道
--主：MDM_CS_CHAT_SERVICE 		500
--副：SUB_CS_CHAT_CHANNELSET 	102
function _M:SendChatSetChannel(sendData)
	local struct_PB = ServerStruct_Chat_pb.PBChatSetChannel()
	struct_PB.channel = sendData.channel
	self:SendPb(CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_CHANNELSET,struct_PB)
	PrintMsg("设置聊天频道",CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_CHANNELSET)
	print("频道:PBChatSetChannel.channel",struct_PB.channel)
	print("----------------------------------------------------------------------------")
end
-- 标记会话已读
--主：MDM_CS_CHAT_SERVICE 			500
--副：SUB_CS_CHAT_MSGREADREMARK 	102
function _M:SendChatMarkRead(sendData)
	local struct_PB = ServerStruct_Chat_pb.PBChatMarkRead()
	struct_PB.targetUserID = sendData.targetUserID
	self:SendPb(CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_MSGREADREMARK,struct_PB)
	PrintMsg("发送标记会话已读",CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_MSGREADREMARK)
	print("频道:PBChatMarkRead.targetUserID",struct_PB.targetUserID)
	print("----------------------------------------------------------------------------")
end
--消息应答
--主 MDM_CS_CHAT_SERVICE
--副 SUB_CS_CHAT_MSGRESPONSE
function _M:SendChatResponse(sendData)
	local struct_PB = ServerStruct_Chat_pb.PBChatChatResponse()
	struct_PB.msgID = sendData.msgID
	self:SendPb(CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_MSGRESPONSE,struct_PB)
	PrintMsg("发送消息应答",CMD_Game.MDM_CS_CHAT_SERVICE,CMD_Game.SUB_CS_CHAT_MSGRESPONSE)
	print("频道:PBChatMarkRead.msgID",struct_PB.msgID)
	print("----------------------------------------------------------------------------")
end

-------------------------------其他服务---------------------------------------
---PersonInfo
--M MDM_OTHER_SERVICE 700
--S SUB_OT_C_MODIFY_NICK --修改昵称请求
function _M:PersonModifyNickReq()
	local struct_PB = ServerStruct_Other_pb.PBPersonModifyNickReq()
	struct_PB.nick = UserData.Shared().szNickName
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_MODIFY_NICK,struct_PB)
	PrintMsg("发送修改昵称请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_MODIFY_NICK)
	print("昵称PBPersonModifyNickReq.nick",struct_PB.nick)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_MODIFY_ICON --修改系统头像
function _M:PersonModifyIconReq()
	local struct_PB = ServerStruct_Other_pb.PBPersonModifyIconReq()
	struct_PB.iconid = UserData.Shared().dwIconid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_MODIFY_ICON,struct_PB)
	PrintMsg("发送修改系统头像",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_MODIFY_ICON)
	print("头像IDPBPersonModifyNickReq.iconid",struct_PB.iconid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_USER_INFO --用户信息请求
function _M:UserInfoReq(sendData)
	local struct_PB = ServerStruct_Other_pb.PBUserInfoReq()
	struct_PB.userid = sendData.userid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_INFO,struct_PB)
	PrintMsg("发送用户信息请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_INFO)
	print("PBUserInfoReq.userid",struct_PB.userid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_VIP_CONFIG_LIST vip配置信息请求
function _M:VipConfigListReq()
	local struct_PB = ServerStruct_Other_pb.PBVipConfigListReq()
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_VIP_CONFIG_LIST,struct_PB)
	PrintMsg("发送vip配置信息请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_VIP_CONFIG_LIST)
	print("----------------------------------------------------------------------------")
end

--S SUB_OT_C_USER_PAYTIMES_LIST 用户支付次数信息请求
function _M:UserPaytimesListReq()
	local struct_PB = ServerStruct_Other_pb.PBUserPaytimesListReq()
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_PAYTIMES_LIST,struct_PB)
	print("发送用户支付次数信息请求")
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_BARBETTE_FORGE 炮座锻造请求
function _M:SendUserPaytimesListReq(userdata)
	local struct_PB = ServerStruct_Other_pb.PBBarbetteForgeReq()
	struct_PB.useflag = userdata.useflag
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_BARBETTE_FORGE,struct_PB)
	PrintMsg("发送炮座锻造请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_BARBETTE_FORGE)
	print("PBBarbetteForgeReq.useflag",struct_PB.useflag)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_RANK_INFO_LIST 排行列表请求
function _M:GetRankInfoList(sendData)
	local struct_PB = ServerStruct_Other_pb.PBRankInfoList()
	struct_PB.PageIndex = sendData.PageIndex
	struct_PB.PageSize = sendData.PageSize
	struct_PB.Total = sendData.Total
	struct_PB.RType = sendData.RType
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_RANK_INFO_LIST,struct_PB)
	PrintMsg("发送排行列表请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_RANK_INFO_LIST)
	print("PBRankInfoList.PageIndex",struct_PB.PageIndex)
	print("PBRankInfoList.PageSize",struct_PB.PageSize)
	print("PBRankInfoList.Total",struct_PB.Total)
	print("PBRankInfoList.RType",struct_PB.RType)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_SIGN_REWARD_LIST 签到奖励请求
function _M:SignRewardListReq()
	local struct_PB = ServerStruct_Other_pb.PBSignRewardListReq()
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_SIGN_REWARD_LIST,struct_PB)
	PrintMsg("发送签到奖励请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_SIGN_REWARD_LIST)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_USER_SIGN 用户签到请求
function _M:SendUserSignReq()
	local struct_PB = ServerStruct_Other_pb.PBUserSignReq()
	struct_PB.imei = DeviceUtil.IMEI()
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_SIGN,struct_PB)
	PrintMsg("发送用户签到请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_SIGN)
	print("PBUserSignReq.imei",struct_PB.imei)
	print("----------------------------------------------------------------------------")
end
---UserBag
--S SUB_OT_C_USER_BAG -- 捕鱼背包请求
function _M:UserBagReq()
	local struct_PB = ServerStruct_Other_pb.PBUserBagReq()
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_BAG,struct_PB)
	PrintMsg("发送捕鱼背包请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_BAG)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_PROP_BUY -- 道具购买请求
function _M:PropBuyReq(propid)
	local struct_PB = ServerStruct_Other_pb.PBPropBuyReq()
	struct_PB.propid = propid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_PROP_BUY,struct_PB)
	PrintMsg("发送道具购买请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_PROP_BUY)
	print("PBPropBuyReq.propid",struct_PB.propid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_PROP_GIVE -- 道具赠送请求
function _M:PropGiveReq(sendData)
	local struct_PB = ServerStruct_Other_pb.PBPropGiveReq()
	struct_PB.receiveuserid = sendData.receiveuserid
	struct_PB.propid = sendData.propid
	struct_PB.givepwd = CodeUtil.MD5(sendData.givepwd)
	struct_PB.propnum = sendData.propnum
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_PROP_GIVE,struct_PB)
	PrintMsg("发送道具赠送请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_PROP_GIVE)
	print("PBPropGiveReq.receiveuserid",struct_PB.receiveuserid)
	print("PBPropGiveReq.propid",struct_PB.propid)
	print("PBPropGiveReq.givepwd",struct_PB.givepwd)
	print("PBPropGiveReq.propnum",struct_PB.propnum)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_PROP_SPLIT -- 道具分解请求
function _M:PropSplitReq(propid)
	local struct_PB = ServerStruct_Other_pb.PBPropSplitReq()
	struct_PB.propid = propid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_PROP_SPLIT,struct_PB)
	PrintMsg("发送道具分解请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_PROP_SPLIT)
	print("PBPropSplitReq.propid",struct_PB.propid)
	print("----------------------------------------------------------------------------")
end
---Friend---
--S SUB_OT_C_FRIEND_LIST -- 获取好友列表
function _M:GetFriendList(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendList()
	struct_PB.PageIndex = sendData.PageIndex
	struct_PB.PageSize = sendData.PageSize
	struct_PB.Total = sendData.Total
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_LIST,struct_PB)
	PrintMsg("发送获取好友列表",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_LIST)
	print("FriendList.PageIndex",struct_PB.PageIndex)
	print("FriendList.PageSize",struct_PB.PageSize)
	print("FriendList.Total",struct_PB.Total)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_ADD -- 请求添加好友
function _M:SendFriendAdd(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendAdd()
	struct_PB.FriUserid = sendData.FriUserid
	struct_PB.Remark = sendData.Remark
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_ADD,struct_PB)
	PrintMsg("发送请求添加好友",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_ADD)
	print("FriendAdd.FriUserid",struct_PB.FriUserid)
	print("FriendAdd.Remark",struct_PB.Remark)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_DEL -- 请求删除好友
function _M:SendFriendDel(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendDel()
	struct_PB.FriUserid = sendData.FriUserid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_DEL,struct_PB)
	PrintMsg("发送请求删除好友",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_DEL)
	print("FriendDel.FriUserid",struct_PB.FriUserid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_NOTIFY_LIST --获取好友请求列表
function _M:GetFriendNotifyList(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendNotifyList()
	struct_PB.PageIndex = sendData.PageIndex
	struct_PB.PageSize = sendData.PageSize
	struct_PB.Total = sendData.Total
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_NOTIFY_LIST,struct_PB)
	PrintMsg("发送获取好友请求列表",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_NOTIFY_LIST)
	print("FriendNotifyList.PageIndex",struct_PB.PageIndex)
	print("FriendNotifyList.PageSize",struct_PB.PageSize)
	print("FriendNotifyList.Total",struct_PB.Total)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_ACCEPT -- 处理添加好友请求
function _M:SendFriendAccept(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendAccept()
	struct_PB.Rid = sendData.Rid
	struct_PB.AcceptFlag = sendData.AcceptFlag
	struct_PB.localid = sendData.localid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_ACCEPT,struct_PB)
	PrintMsg("发送处理添加好友请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_ACCEPT)
	print("FriendAccept.Rid",struct_PB.Rid)
	print("FriendAccept.AcceptFlag",struct_PB.AcceptFlag)
	print("FriendAccept.localid",struct_PB.localid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_VERSION -- 获取好友列表版本
function _M:GetFriendVersioin()
	local struct_PB = ServerStruct_Other_pb.FriendVersioin()
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_VERSION,struct_PB)
	PrintMsg("发送获取好友列表版本",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_VERSION)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_SEARCH --搜索好友
function _M:SendSearchFriend(sendData)
	local struct_PB = ServerStruct_Other_pb.SearchFriend()
	struct_PB.userid = sendData.userid
	struct_PB.searchtype = sendData.searchtype
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_SEARCH,struct_PB)
	PrintMsg("发送搜索好友",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_SEARCH)
	print("SearchFriend.userid",struct_PB.userid)
	print("SearchFriend.searchtype",struct_PB.searchtype)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_Recommend -- 获取推荐好友
function _M:GetRecommendFriend()
	local struct_PB = ServerStruct_Other_pb.RecommendFriend()
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_Recommend,struct_PB)
	PrintMsg("发送获推荐好友",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_Recommend)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIEND_BATCH_ADD -- 批量请求添加好友
function _M:SendFriendBatchAdd(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendBatchAdd()
	struct_PB.StrFriUserid = sendData.StrFriUserid
	struct_PB.Remark = sendData.Remark
	struct_PB.sendredpack = sendData.sendredpack
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_BATCH_ADD,struct_PB)
	PrintMsg("发送批量请求添加好友",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIEND_BATCH_ADD)
	print("FriendBatchAdd.StrFriUserid",struct_PB.StrFriUserid)
	print("FriendBatchAdd.Remark",struct_PB.Remark)
	print("FriendBatchAdd.sendredpack",struct_PB.sendredpack)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_CHAT_TOALLFRIENDS -- 群发信息给好友
function _M:SendPBChatToAllFriends(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatToAllFriends()
	struct_PB.content = sendData.content
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_TOALLFRIENDS,struct_PB)
	PrintMsg("发送群发信息给好友",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_TOALLFRIENDS)
	print("PBChatToAllFriends.content",struct_PB.content)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIENDBLACK_ADD -- 添加黑名单
function _M:SendFriendBlackAdd(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendBlackAdd()
	struct_PB.BlackUserid = sendData.BlackUserid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIENDBLACK_ADD,struct_PB)
	PrintMsg("发送添加黑名单",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIENDBLACK_ADD)
	print("FriendBlackAdd.BlackUserid",struct_PB.BlackUserid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIENDBLACK_DEL -- 删除黑名单
function _M:SendFriendBlackDel(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendBlackDel()
	struct_PB.BlackUserid = sendData.BlackUserid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIENDBLACK_DEL,struct_PB)
	PrintMsg("发送删除黑名单",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIENDBLACK_DEL)
	print("FriendBlackDel.BlackUserid",struct_PB.BlackUserid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_FRIENDBLACK_LIST --获取黑名单列表
function _M:GetFriendBlackList(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendBlackList()
	struct_PB.PageIndex = sendData.PageIndex
	struct_PB.PageSize = sendData.PageSize
	struct_PB.Total = sendData.Total
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIENDBLACK_LIST,struct_PB)
	PrintMsg("发送获取黑名单列表",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_FRIENDBLACK_LIST)
	print("FriendBlackList.PageIndex",struct_PB.PageIndex)
	print("FriendBlackList.PageSize",struct_PB.PageSize)
	print("FriendBlackList.Total",struct_PB.Total)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_NOTICE_CANCEL -- 撤销好友申请请求
function _M:SendFriendNoticeCancelReq(sendData)
	local struct_PB = ServerStruct_Other_pb.FriendNoticeCancelReq()
	struct_PB.rid = sendData.rid
	struct_PB.localid = sendData.localid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_NOTICE_CANCEL,struct_PB)
	PrintMsg("发送撤销好友申请请求",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_NOTICE_CANCEL)
	print("FriendNoticeCancelReq.rid",struct_PB.rid)
	print("FriendNoticeCancelReq.localid",struct_PB.localid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_GUESTS_APPLY -- 申请聊天室嘉宾
function _M:SendChatGuestsApply(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatGuestsApply()
	struct_PB.Remark = sendData.Remark
	struct_PB.channel = sendData.channel
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_GUESTS_APPLY,struct_PB)
	PrintMsg("发送申请聊天室嘉宾",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_GUESTS_APPLY)
	print("PBChatGuestsApply.Remark",struct_PB.Remark)
	print("PBChatGuestsApply.channel",struct_PB.channel)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_GUESTS_LIST --获取聊天室嘉宾列表
function _M:GetChatGuestsList(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatGuestsList()
	struct_PB.channel = sendData.channel
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_GUESTS_LIST,struct_PB)
	PrintMsg("发送获取聊天室嘉宾列表",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_GUESTS_LIST)
	print("PBChatGuestsList.channel",struct_PB.channel)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_GUESTS_CHECK -- 检查是否是聊天室嘉宾
function _M:SendChatGuestsCheck(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatGuestsCheck()
	struct_PB.channel = sendData.channel
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_GUESTS_CHECK,struct_PB)
	PrintMsg("发送检查是否是聊天室嘉宾",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_GUESTS_CHECK)
	print("PBChatGuestsCheck.channel",struct_PB.channel)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_CHAT_DELMSG -- 删除聊天消息
function _M:SendChatDelMsg(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatDelMsg()
	struct_PB.userid = sendData.userid
	struct_PB.msgid = sendData.msgid
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_DELMSG,struct_PB)
	PrintMsg("发送删除聊天消息",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_DELMSG)
	print("PBChatGuestsCheck.userid",struct_PB.userid)
	print("PBChatGuestsCheck.msgid",struct_PB.msgid)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_CHAT_ADDBLACK -- 添加禁言名单
function _M:SendChatAddBlack(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatAddBlack()
	struct_PB.userid = sendData.userid
	struct_PB.blacktimes = sendData.blacktimes
	struct_PB.remak = sendData.remak
	struct_PB.channel = sendData.channel
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_ADDBLACK,struct_PB)
	PrintMsg("发送添加禁言名单",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_ADDBLACK)
	print("PBChatAddBlack.userid",struct_PB.userid)
	print("PBChatAddBlack.blacktimes",struct_PB.blacktimes)
	print("PBChatAddBlack.remak",struct_PB.remak)
	print("PBChatAddBlack.channel",struct_PB.channel)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_CHAT_DELBLACK -- 删除禁言名单
function _M:SendChatDelBlack(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatDelBlack()
	struct_PB.userid = sendData.userid
	struct_PB.remak = sendData.remak
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_DELBLACK,struct_PB)
	PrintMsg("发送删除禁言名单",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_DELBLACK)
	print("PBChatDelBlack.userid",struct_PB.userid)
	print("PBChatDelBlack.remak",struct_PB.remak)
	print("----------------------------------------------------------------------------")
end
--S SUB_OT_C_CHAT_BLACKLIST --获取聊天室嘉宾列表
function _M:GetChatBlackList(sendData)
	local struct_PB = ServerStruct_Other_pb.PBChatBlackList()
	struct_PB.PageIndex = sendData.PageIndex
	struct_PB.PageSize = sendData.PageSize
	struct_PB.Total = sendData.Total
	struct_PB.channel = sendData.channel
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_BLACKLIST,struct_PB)
	PrintMsg("发送获取聊天室嘉宾列表",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_CHAT_BLACKLIST)
	print("PBChatBlackList.PageIndex",struct_PB.PageIndex)
	print("PBChatBlackList.PageSize",struct_PB.PageSize)
	print("PBChatBlackList.Total",struct_PB.Total)
	print("PBChatBlackList.channel",struct_PB.channel)
	print("----------------------------------------------------------------------------")
end
--SUB_OT_C_USER_INSURE
function _M:GetUserInsure()
	local struct_PB = ServerStruct_Other_pb.PBUserInsure() -- 获取保险箱信息
	PrintMsg("获取保险箱信息",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_INSURE)
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_USER_INSURE,struct_PB)
	print("----------------------------------------------------------------------------")
end

-- SUB_OT_C_ACCESS_INSURE --保险柜存取
function _M:SendAccessInsure(sendData)
	local struct_PB = ServerStruct_Other_pb.PBAccessInsure()
	struct_PB.typeid = sendData.typeid
	struct_PB.treasureid = sendData.treasureid
	struct_PB.insurepwd = CodeUtil.MD5(sendData.insurepwd)
	struct_PB.lScore = sendData.lScore
	PrintMsg("保险柜存取",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_ACCESS_INSURE)
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_ACCESS_INSURE,struct_PB)
	print("操作类型 0金币存入保险柜 1从保险柜取出:PBAccessInsure.typeid",struct_PB.typeid)
	print("财富id  0 金豆 1能量 2钻石... 10+ 道具id:PBAccessInsure.treasureid",struct_PB.treasureid)
	print("保险箱密码 取 需要 存可以不填:PBAccessInsure.insurepwd",struct_PB.insurepwd)
	print("操作数量:PBAccessInsure.lScore",struct_PB.lScore)
	print("----------------------------------------------------------------------------")
end

-- SUB_OT_C_EXCHANGE_RECORD
function _M:SendUserExchangeRecord() --获取用户兑换记录
	local struct_PB = ServerStruct_Other_pb.PBUserExchangeRecord()
	PrintMsg("获取用户兑换记录",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_EXCHANGE_RECORD)
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_EXCHANGE_RECORD,struct_PB)
	print("----------------------------------------------------------------------------")
end

-- SUB_OT_C_EXCHANGE_GOODS
function _M:SendUserExchangeGoods(sendData) --兑换物品
	local struct_PB = ServerStruct_Other_pb.PBUserExchangeGoods()
	struct_PB.exchangeOrderID = sendData.exchangeOrderID
	struct_PB.phone = sendData.phone
	self:SendPb(CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_EXCHANGE_GOODS,struct_PB)
	PrintMsg("兑换物品",CMD_Game.MDM_OTHER_SERVICE,CMD_Game.SUB_OT_C_EXCHANGE_GOODS)
	print("兑换ID  唯一标识了用指定数量的A换指定数量的B:PBUserExchangeGoods.exchangeOrderID",struct_PB.exchangeOrderID)
	print("兑换手机号码:PBUserExchangeGoods.phone",struct_PB.phone)
	print("----------------------------------------------------------------------------")
end

return _M