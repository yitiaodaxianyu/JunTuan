local _M = require("src.app.Manager.Net.ChatSendManager")
local CMD_Game = require("src.macros.CMD_Game")
local MsgKeyData = require("src.app.Model.MsgKeyData")
-- 打印
local function PrintCodeMsg(code, mainCMD, subCMD)
	local msg = string.format("ChatRecv C:%d M:%d S:%d",code, mainCMD, subCMD)
	LuaPrint(msg)
end
local function PrintMsg(title, mainCMD, subCMD)
	local msg = string.format("ChatRecv %s M:%d S:%d",title, mainCMD, subCMD)
	LuaPrint(msg)
end
-- 接收消息主入口
function _M:RecvMsgFromSocket(data)
	local code = data.code
	local mainCMD = data.mainCMD
	local subCMD = data.subCMD
	local buffer = data.buffer
	PrintCodeMsg(code, mainCMD, subCMD)

	if NET_CONN_SUCC == code then
		if self:HandleCacheConnect() then return end
		self:SetSocketStatus(SOCKET_STATUS_CONNECT)
		if SERVER_FLAG_LOGIN == self.serverFlag then
			ChatManager.Shared():ConnectSuccess()
		else
			ChatManager.Shared():ChatConnectSuccess()
		end
	elseif NET_ERROR_CONN_FAILED == code then
		if self:HandleCacheConnect() then return end
		self:SetSocketStatus(SOCKET_STATUS_NULL)
		if SERVER_FLAG_LOGIN == self.serverFlag then
			ChatManager.Shared():ConnectFailed()
		else
			ChatManager.Shared():ChatConnectFailed()
		end
	elseif code < NET_ERROR_CONN_FAILED then
		self:SetSocketStatus(SOCKET_STATUS_NULL)
		if SERVER_FLAG_LOGIN == self.serverFlag then
			ChatManager.Shared():NetworkError()
		else
			ChatManager.Shared():ChatNetworkError()
		end
	elseif NET_RECV_DATA_SUCCESS == code then
		self:RecvMsg(mainCMD, subCMD, buffer)
	end
end
-- 接收消息
function _M:RecvMsg(mainCMD, subCMD, buffer)
	if mainCMD == CMD_Game.MDM_GR_LOGON then--登录服务
		self:LoginRecvMsg(subCMD,buffer)
	elseif mainCMD == CMD_Game.MDM_ASSIST_SERVICE then--辅助服务
		self:AssistServiceRecvMsg(subCMD,buffer)
	elseif mainCMD == CMD_Game.MDM_CS_CHAT_SERVICE then--聊天服务
		self:ChatServiceRecvMsg(subCMD,buffer)
	elseif mainCMD == CMD_Game.MDM_OTHER_SERVICE then -- 其它服务
		self:OtherServiceRecvMsg(subCMD,buffer)
	end
end
-- 登录接收消息
function _M:LoginRecvMsg(subCMD, buffer)
	if subCMD == CMD_Game.SUB_GR_LOGON_FINISH then
		local struct_PB = ServerStruct_Chat_pb.PBChatLoginSuccess()--登录成功
		struct_PB:ParseFromString(buffer)
		ChatManager.Shared():ChatLoginSuccess(struct_PB)
		--local tempData = {
		--	goldNum = struct_PB.goldNum,
		--	diamondNum = struct_PB.diamondNum,
		--	insureScore = struct_PB.insureScore,
		--	actgradeflag = struct_PB.actgradeflag,
		--	redpackNum = struct_PB.redpackNum,
		--	wxbindflag = struct_PB.wxbindflag,
		--	registerdate = struct_PB.registerdate,
		--}
		--MessageManager.Shared():postMsg(MsgKeyData.Key_ChatServerLoginSuccess)
		print("登录聊天服务器成功")
		print("用户金币数量:PB_MB_LogonSuccess.goldNum",struct_PB.goldNum)
		print("用户钻石数量:PB_MB_LogonSuccess.diamondNum",struct_PB.diamondNum)
		print("用户保险柜金币数量:PB_MB_LogonSuccess.insureScore",struct_PB.insureScore)
		print("是否需要显示账号等级活动 0不显示 1每天只弹一次 2每次登录都弹:PB_MB_LogonSuccess.actgradeflag",struct_PB.actgradeflag)
		print("用户红包金额数量(分):PB_MB_LogonSuccess.redpackNum",struct_PB.redpackNum)
		print("是否绑定微信 0未绑定 1绑定:PB_MB_LogonSuccess.wxbindflag",struct_PB.wxbindflag)
		print("注册时间 毫秒:PB_MB_LogonSuccess.registerdate",struct_PB.registerdate)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_GR_LOGON_FAILURE then
		local struct_PB = ServerStruct_Chat_pb.PBChatLoginFailure()--登录失败
		struct_PB:ParseFromString(buffer)
		print("登录聊天服务器失败")
		print("错误代码:PB_MB_LogonSuccess.errorCode",struct_PB.errorCode)
		print("错误描述:PB_MB_LogonSuccess.describeStr",struct_PB.describeStr)
		print("--------------------------------------------------------------------------------------------------------")
	end
end
--聊天服务消息
function _M:ChatServiceRecvMsg(subCMD,buffer)
    if subCMD == CMD_Game.SUB_CS_CHAT_MSG then
        local struct_PB = ServerStruct_Chat_pb.PBChatRecvChatMsg()--接收聊天消息
        struct_PB:ParseFromString(buffer)
        local tempData = {
            sendInfo = {
                userid = struct_PB.sendInfo.dwUserID,
                iconid = struct_PB.sendInfo.nIconID,
                nick = struct_PB.sendInfo.szNickName,
                viprank = struct_PB.sendInfo.VipRank,
            },
            msgID = struct_PB.msgID,
            msgSendTime = math.ceil(struct_PB.msgSendTime/1000),
            channel = struct_PB.channel,
            content = struct_PB.content,
            msgtype = struct_PB.msgtype,
            targetUserID = struct_PB.targetUserID,
            targetName = struct_PB.targetName,
        }
        if tempData.sendInfo.nick == "" or tempData.sendInfo.nick == nil then
            tempData.sendInfo.nick = "用户"..tempData.sendInfo.userid
        end
        ChatManager.Shared():RecvChatMsg(tempData)
		NoticeController.Shared():insertData(struct_PB.content, 1)
        print("接收聊天消息")
        print("发送者信息:PBChatRecvChatMsg.sendInfo")
        print("发送者ID:sendInfo.dwUserID",struct_PB.sendInfo.dwUserID)
        print("发送者昵称:sendInfo.szNickName",struct_PB.sendInfo.szNickName)
        print("消息编号:PBChatRecvChatMsg.msgID",struct_PB.msgID)
        print("发送时间:PBChatRecvChatMsg.msgSendTime",struct_PB.msgSendTime)
        print("频道:PBChatRecvChatMsg.channel",struct_PB.channel)
        print("消息内容:PBChatRecvChatMsg.content",struct_PB.content)
        print("目标用户:PBChatRecvChatMsg.targetUserID",struct_PB.targetUserID)
        print("目标用户昵称:PBChatRecvChatMsg.targetName",struct_PB.targetName)
        --print("具体红包内容(红包总金额):PBChatRecvChatMsg.redBagInfo.total",struct_PB.redBagInfo.total)
        --print("抢红包提示内容(红包编号) :PBChatRecvChatMsg.grabInfo.grid",struct_PB.grabInfo.grid)
        --print("拼人品红包消息(红包编号):PBChatRecvChatMsg.luckyRedBag.grid",struct_PB.luckyRedBag.grid)
        print("--------------------------------------------------------------------------------------------------------")
    elseif subCMD == CMD_Game.SUB_CS_CHAT_MSGRESULT then --聊天消息发送结果
        local struct_PB = ServerStruct_Chat_pb.PBChatSendChatMsgResult()
        struct_PB:ParseFromString(buffer)
        local tempData = {
            result = struct_PB.result,
            channel = struct_PB.channel,
            targetUserID = struct_PB.targetUserID,
            msgID = struct_PB.msgID,
            msgRowID = struct_PB.msgRowID,
            errorStr = struct_PB.errorStr,
            content = struct_PB.content,
            msgSendTime = os.time(),
        }
        ChatManager.Shared():SendChatMsgReturn(tempData)
        print("聊天消息发送结果")
        print("结果:PBChatSendChatMsgResult.result",struct_PB.result)
        print("聊天频道:PBChatSendChatMsgResult.channel",struct_PB.channel)
        print("目标用户ID:PBChatSendChatMsgResult.targetUserID",struct_PB.targetUserID)
        print("服务器消息ID:PBChatSendChatMsgResult.msgID",struct_PB.msgID)
        print("客户端传上消息ID:PBChatSendChatMsgResult.msgRowID",struct_PB.msgRowID)
        print("错误信息:PBChatSendChatMsgResult.errorStr",struct_PB.errorStr)
        print("消息内容:PBChatSendChatMsgResult.content",struct_PB.content)
        print("--------------------------------------------------------------------------------------------------------")
    elseif subCMD == CMD_Game.SUB_CS_CHAT_CHANNELSETOK then --频道设置成功
        local struct_PB = ServerStruct_Chat_pb.PBChatSetChannelSuccess()
        struct_PB:ParseFromString(buffer)
        print("频道设置成功")
        print("--------------------------------------------------------------------------------------------------------")
    elseif subCMD == CMD_Game.SUB_CS_CHAT_HASNEWFRIEND then --
        local struct_PB = ServerStruct_Chat_pb.PBChatHasNewFriend()
        struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_ChatHasNewFriend)
        print("通知用户被添加好友 需要去验证 通知到连接的客户端用红点显示")
        print("--------------------------------------------------------------------------------------------------------")
    end
end
--辅助服务消息
function _M:AssistServiceRecvMsg(subCMD,buffer)
	if subCMD == CMD_Game.SUB_AS_S_GAMEONLINE then
		local struct_PB = ServerStruct_Chat_pb.PBChatGameOnlineResult()--游戏服务器在线人数
		struct_PB:ParseFromString(buffer)
		print("游戏服务器在线人数")
		print("房间类型:PBChatGameOnlineResult.roomType",struct_PB.roomType)
		print("在线人数:PBChatGameOnlineResult.onlineNum",struct_PB.onlineNum)
		print("是否已报名 0未报名 1已报名:PBChatGameOnlineResult.isSignUp",struct_PB.isSignUp)
		local tempData = {
			roomType = struct_PB.roomType,
			onlineNum = struct_PB.onlineNum,
			isSignUp = struct_PB.isSignUp,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_ChatGameOnlineResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_AS_S_USERMONEYUPDATE then --聊天服务器 金币、钻石更新 (一次只会更新一种)
		local struct_PB = ServerStruct_Chat_pb.PBChatGameMoneyUpdate()--聊天服务器 金币、钻石更新 (一次只会更新一种)
		struct_PB:ParseFromString(buffer)
		local tempData = {
			updateNum = struct_PB.updateNum,
			updateType = struct_PB.updateType,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_ChatGameMoneyUpdate,tempData)
		print("聊天服务器 金币、钻石更新 (一次只会更新一种)")
		print("更新数量:PBChatGameMoneyUpdate.updateNum",struct_PB.updateNum)
		print("更新类型10更新金币11更新钻石12更新礼券13更新保险柜:PBChatGameMoneyUpdate.updateType",struct_PB.updateType)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_AS_S_OPENMATCHNOTIFY then
		local struct_PB = ServerStruct_Chat_pb.PBChatMatchNotify()--开赛提醒消息
		struct_PB:ParseFromString(buffer)
		print("开赛提醒消息")
		print("赛事类型:PBChatMatchNotify.roomType",struct_PB.roomType)
		print("开赛时间:PBChatMatchNotify.openTime",struct_PB.openTime)
		print("--------------------------------------------------------------------------------------------------------")
	end
end
--其它聊天服务消息
function _M:OtherServiceRecvMsg(subCMD,buffer)
	if subCMD == CMD_Game.SUB_OT_S_MODIFY_NICK then --修改昵称返回
		local struct_PB = ServerStruct_Other_pb.PBPersonModifyNickResult()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			result = struct_PB.result,
			outmsg = struct_PB.outmsg,
			nick = struct_PB.nick,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_PersonModifyNickResult,tempData)
		print("修改昵称返回")
		print("返回结果0失败1成功:PBPersonModifyNickResult.result",struct_PB.result)
		print("返回消息:PBPersonModifyNickResult.outmsg",struct_PB.outmsg)
		print("修改后的昵称:PBPersonModifyNickResult.nick",struct_PB.nick)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_MODIFY_ICON then--修改系统头像结果
		local struct_PB = ServerStruct_Other_pb.PBPersonModifyIconResult()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			result = struct_PB.result,
			outmsg = struct_PB.outmsg,
			iconid = struct_PB.iconid,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_PersonModifyIconResult,tempData)
		print("修改系统头像结果")
		print("返回结果0失败1成功:PBPersonModifyIconResult.result",struct_PB.result)
		print("返回消息:PBPersonModifyIconResult.outmsg",struct_PB.outmsg)
		print("修改后的头像ID:PBPersonModifyIconResult.iconid",struct_PB.iconid)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_USER_INFO then -- 用户信息请求返回 then
		local struct_PB = ServerStruct_Other_pb.PBUserInfoReturn()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			userid = struct_PB.info.userid,
			nick = struct_PB.info.nick,
			iconid = struct_PB.info.iconid,
			gree = struct_PB.info.gree,
			signature = struct_PB.info.signature,
			viprank = struct_PB.info.viprank,
			Remark = struct_PB.info.Remark,
			IsOnline = struct_PB.info.IsOnline,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_UserInfoReturn,tempData)
		print("用户信息请求返回")
		print("用户编号PBUserBasicInfo.userid",struct_PB.info.userid)
		print("用户昵称PBUserBasicInfo.nick",struct_PB.info.nick)
		print("头像IDPBUserBasicInfo.iconid",struct_PB.info.iconid)
		print("用户等级PBUserBasicInfo.gree",struct_PB.info.gree)
		print("个性签名PBUserBasicInfo.signature",struct_PB.info.signature)
		print("用户vip等级PBUserBasicInfo.viprank",struct_PB.info.viprank)
		print("用户信息描述PBUserBasicInfo.Remark",struct_PB.info.Remark)
		print("是否在线 0表示不在线 1表示在线PBUserBasicInfo",struct_PB.info.IsOnline)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_VIP_CONFIG_LIST then--vip配置信息请求返回
		local struct_PB = ServerStruct_Other_pb.PBVipConfigListReturn()
		struct_PB:ParseFromString(buffer)
		print("vip配置信息请求返回")
		print("当前充值金额:PBVipConfigListReturn.curamount",struct_PB.curamount)
		print("配置信息列表长度:PBVipConfigListReturn.configlist",#struct_PB.configlist)
		print("--------------------------------------------------------------------------------------------------------")
		MessageManager.Shared():postMsg(MsgKeyData.Key_VipConfigListReturn,struct_PB.configlist)
		for i = 1, #struct_PB.configlist do
			local cfg = struct_PB.configlist[i]
			print("vip等级:PBVipConfigInfo.viprank",cfg.viprank)
			print("需要充值金额:PBVipConfigInfo.amount",cfg.amount)
			print("描述:PBVipConfigInfo.describe",cfg.describe)
			print("-----------------------------")
		end
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_PLAYER_UPDATE then -- 玩家信息更新返回
		local struct_PB = ServerStruct_Other_pb.PBFishPlayerUpdateReturn()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_VipConfigListReturn,struct_PB)
		print("玩家信息更新返回")
		print("当前充值金额:PBFishPlayerUpdateReturn.result",struct_PB.result)
		print("配置信息列表长度:PBFishPlayerUpdateReturn.outmsg",#struct_PB.outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_USER_PAYTIMES_LIST then --用户支付次数信息请求返回
		local struct_PB = ServerStruct_Other_pb.PBUserPaytimesListReturn()
		struct_PB:ParseFromString(buffer)
		print("用户支付次数信息请求返回")
		print("当前充值金额:PBUserPaytimesListReturn.curamount",struct_PB.curamount)
		print("列表长度:PBUserPaytimesListReturn.list",#struct_PB.list)
		local tempData = {
			curamount = struct_PB.curamount,
			list = struct_PB.list,
		}
		for i = 1, #struct_PB.list do
			local data = struct_PB.list[i]
			print("物品编号:PBUserPaytimesInfo.productid",data.productid)
			print("金额:PBUserPaytimesInfo.amount",data.amount)
			print("支付次数:PBUserPaytimesInfo.paytimes",data.paytimes)
			print("-----------------------------")
			local item = {
				productid = data.productid,
				amount = data.amount,
				paytimes = data.paytimes,
			}
			table.insert(tempData.list,item)
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_UserPaytimesListReturn,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_BARBETTE_FORGE then -- 炮座锻造返回
		local struct_PB = ServerStruct_Other_pb.PBBarbetteForgeReturn()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_BarbetteForgeReturn,struct_PB)
		print("炮座锻造返回")
		print("结果 0 失败 1 成功:PBBarbetteForgeReturn.result",struct_PB.result)
		print("返回消息:PBBarbetteForgeReturn.outmsg",struct_PB.outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_RANK_INFO_LIST then -- 排行列表结果
		local struct_PB = ServerStruct_Other_pb.PBRankInfoListResult()
		struct_PB:ParseFromString(buffer)
		print("排行列表结果")
		print("总记录数:PBBarbetteForgeReturn.Total",struct_PB.Total)
		print("列表长度:PBBarbetteForgeReturn.List",#struct_PB.List)
		print("规则列表长度:PBBarbetteForgeReturn.RuleList",#struct_PB.RuleList)
		print("类型1胜场2连胜3倍数4满局5大师6赚金7等级8充值排行榜9总财富排行:PBBarbetteForgeReturn.RType",struct_PB.RType)
		local tempData = {
			Total = struct_PB.Total,
			list = {},
			RuleList = struct_PB.RuleList,
			RType = struct_PB.RType,
		}
		for i = 1, #struct_PB.List do
			local data = struct_PB.List[i]
			--print("名次:PBRankInfo.No",data.No)
			--print("数量:PBRankInfo.Counts",data.Counts)
			--print("奖励:PBRankInfo.Award",data.Award)
			local user = data.userInfo
			local userdata = {
				No = data.No,
				Counts = data.Counts,
				Award = data.Award,
				userid = user.userid,
				nick = user.nick,
				iconid = user.iconid,
				gree = user.gree,
				signature = user.signature,
				viprank = user.viprank,
				Remark = user.Remark,
				Goldbean = user.Goldbean,
				Energy = user.Energy,
			}
			if userdata.nick == "" or userdata.nick == nil then
				userdata.nick = "用户"..user.userid
			end
			if i <= 20 then
				table.insert(tempData.list,userdata)
			end
			--print("用户编号PBUserInfoReturn.userid",user.userid)
			--print("用户昵称PBUserInfoReturn.nick",user.nick)
			--print("头像IDPBUserInfoReturn.iconid",user.iconid)
			--print("用户等级PBUserInfoReturn.gree",user.gree)
			--print("个性签名PBUserInfoReturn.signature",user.signature)
			--print("用户vip等级PBUserInfoReturn.viprank",user.viprank)
			--print("用户信息描述PBUserInfoReturn.Remark",user.Remark)
			--print("用户金豆PBUserInfoReturn.Goldbean",user.Goldbean)
			--print("用户能量PBUserInfoReturn.Energy",user.Energy)
			--print("是否在线 0表示不在线 1表示在线PBUserInfoReturn.IsOnline",user.IsOnline)
			--print("-----------------------------")
		end
		for i = 1, #struct_PB.RuleList do
			local rule = struct_PB.RuleList[i]
			print("内容:PBRankRule.Content",rule.Content)
			print("-----------------------------")
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_RankInfoListResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_SIGN_REWARD_LIST then -- 请求签到奖励返回
		local struct_PB = ServerStruct_Other_pb.PBSignRewardListResult()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			configlist = {},
			days = struct_PB.days,
			issign = struct_PB.issign,
		}
		print("配置列表长度:PBSignRewardListResult.configlist",#struct_PB.configlist)
		print("签到天数:PBSignRewardListResult.days",struct_PB.days)
		print("签到类型(0新手签到1普通用户签到):PBSignRewardListResult.signtype",struct_PB.signtype)
		print("当天是否已经签到(0否1是):PBSignRewardListResult.issign",struct_PB.issign)
		for i = 1, #struct_PB.configlist do
			local cfg = struct_PB.configlist[i]
			local config = {
				propid = cfg.rewardid,
				rewardtype = cfg.rewardtype,
				rewardsubtype = cfg.rewardsubtype,
				propnum = cfg.rewardvalue,
				days = cfg.days,
				vipdouble = cfg.vipdouble,
				signtype = cfg.signtype,
			}
			table.insert(tempData.configlist,config)
			--print("用户奖励ID:PBSignRewardListResult.rewardid",cfg.rewardid)
			--print("奖励类型1-金币2-话费3-钻石4-道具:PBSignRewardListResult.rewardtype",cfg.rewardtype)
			--print("奖励子类型(配置类型为4时对应道具ID):PBSignRewardListResult.rewardsubtype",cfg.rewardsubtype)
			--print("奖励内容数量:PBSignRewardListResult.rewardvalue",cfg.rewardvalue)
			--print("签到天数:PBSignRewardListResult.days",cfg.days)
			--print("vip用户奖励是否翻倍(0否1是):PBSignRewardListResult.vipdouble",cfg.vipdouble)
			--print("签到类型(0新手签到1普通用户签到):PBSignRewardListResult.signtype",cfg.signtype)
			--print("-----------------------------")
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_SignRewardListResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_USER_SIGN then
		local struct_PB = ServerStruct_Other_pb.PBUserSignResult()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_UserSignResult,struct_PB)
		print("结果0失败1成功:PBUserSignResult.result",struct_PB.result)
		print("奖励子类型(配置类型为4时对应道具ID):PBUserSignResult.outmsg",struct_PB.outmsg)
		print("奖励信息列表长度:PBUserSignResult.reward",#struct_PB.reward)
		for i = 1, #struct_PB.reward do
			print("奖励类型1-金币2-话费3-钻石4-道具:PBGameRewardInfo.rewardtype",struct_PB.reward[i].rewardtype)
			print("结果0失败1成功:PBGameRewardInfo.rewardsubtype",struct_PB.reward[i].rewardsubtype)
			print("奖励内容数量:PBGameRewardInfo.rewardvalue",struct_PB.reward[i].rewardvalue)
			print("-----------------------------")
		end
	elseif subCMD == CMD_Game.SUB_OT_S_USER_BAG then --捕鱼背包请求返回
		local struct_PB = ServerStruct_Other_pb.PBUserBagReturn()
		struct_PB:ParseFromString(buffer)

		print("捕鱼背包请求返回")
		print("捕鱼等级PBUserBagReturn.gree",struct_PB.gree)
		print("当前经验PBUserBagReturn.currexp",struct_PB.currexp)
		print("升级到下级所需经验值PBUserBagReturn.nextexp",struct_PB.nextexp)
		local tempData = {
			gree = struct_PB.gree,
			currexp = struct_PB.currexp,
			nextexp = struct_PB.nextexp,
			list = {},
		}
		print("背包列表长度",#struct_PB.list)
		for i = 1,#struct_PB.list  do
			local data = struct_PB.list[i]
			local item = {
				propid = data.propid,
				propname = data.propname,
				resources = data.resources,
				proptype = data.proptype,
				can_sale = data.can_sale,
				sale_price = data.sale_price,
				buy_vip_lv = data.buy_vip_lv,
				buy_num = data.buy_num,
				buy_amount = data.buy_amount,
				buy_price = data.buy_price,
				can_send = data.can_send,
				send_vip_lv = data.send_vip_lv,
				send_num = data.send_num,
				propnum = data.propnum,
				can_buy = data.can_buy,
				prop_remark = data.prop_remark,
			}
			if item.propid ~= 4 then
				table.insert(tempData.list,item)
			end
			print("道具id:PBUserBagInfo.propid",data.propid)
			print("道具名称:PBUserBagInfo.propname",data.propname)
			print("道具资源:PBUserBagInfo.resources",data.resources)
			print("道具类型:PBUserBagInfo.proptype",data.proptype)
			print("是否可卖出  0 否 1 是:PBUserBagInfo.can_sale",data.can_sale)
			print("卖出价格:PBUserBagInfo.sale_price",data.sale_price)
			print("购买vip等级:PBUserBagInfo.buy_vip_lv",data.buy_vip_lv)
			print("单次购买数量:PBUserBagInfo.buy_num",data.buy_num)
			print("购买总额:PBUserBagInfo.buy_amount",data.buy_amount)
			print("单个价格:PBUserBagInfo.buy_price",data.buy_price)
			print("是否可赠送  0 否 1 是:PBUserBagInfo.can_send",data.can_send)
			print("赠送VIP条件:PBUserBagInfo.send_vip_lv",data.send_vip_lv)
			print("每次赠送数量:PBUserBagInfo.send_num",data.send_num)
			print("道具数量:PBUserBagInfo.propnum",data.propnum)
			print("是否可以购买 0 否 1 是:PBUserBagInfo.can_buy",data.can_buy)
			print("道具备注:PBUserBagInfo.prop_remark",data.prop_remark)
			print("-----------------------------")
		end

		MessageManager.Shared():postMsg(MsgKeyData.Key_UserBagReturn,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_LIST then -- 获取好友列表
		local struct_PB = ServerStruct_Other_pb.FriendListResult()
		struct_PB:ParseFromString(buffer)
		print("获取好友列表结果")
		print("总记录数:FriendListResult.Total",struct_PB.Total)
		print("好友列表长度:FriendListResult.List",#struct_PB.List)
		local tempArr = {}
		for i = 1, #struct_PB.List do
			local userdata = struct_PB.List[i]
			print("用户编号:FriendInfo.Userid",userdata.Userid)
			print("好友编号:FriendInfo.FriUserid",userdata.FriUserid)
			print("好友昵称:FriendInfo.FriNick",userdata.FriNick)
			print("好友备注昵称:FriendInfo.MemoNick",userdata.MemoNick)
			print("头像ID:FriendInfo.IconId",userdata.IconId)
			print("头像地址:FriendInfo.IconUrl",userdata.IconUrl)
			print("好友分组:FriendInfo.Typeid",userdata.Typeid)
			print("乐讯用户id:FriendInfo.LxUserID",userdata.LxUserID)
			print("用户vip等级:FriendInfo.VipRank",userdata.VipRank)
			print("首字母:FriendInfo.Alphabet",userdata.Alphabet)

			--userdata.userid = data.userid
			--userdata.nick = data.nick
			--userdata.iconid = data.iconid
			--userdata.gree = data.gree
			--userdata.signature = data.signature
			--userdata.viprank = data.viprank

			local data = {
				Userid = userdata.Userid,
				FriUserid = userdata.FriUserid,
				FriNick = userdata.FriNick,
				MemoNick = userdata.MemoNick,
				IconId = userdata.IconId,
				IconUrl = userdata.IconUrl,
				Typeid = userdata.Typeid,
				LxUserID = userdata.LxUserID,
				VipRank = userdata.VipRank,
				Alphabet = userdata.Alphabet,
			}
			if data.FriNick == "" or data.FriNick == nil then
				data.FriNick = "用户"..data.FriUserid
			end
			table.insert(tempArr,data)
			print("-----------------------------")
		end
		local function comp(a,b)
			return a.Alphabet < b.Alphabet
		end
		table.sort(tempArr,comp)
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendListResult,tempArr)
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_ADD then  -- 请求添加好友结果
		local struct_PB = ServerStruct_Other_pb.FriendAddResult()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendAddResult,struct_PB)
		print("请求添加好友结果")
		print("添加好友结果 1表示成功 其余表示失败:FriendAddResult.AddFlag",struct_PB.AddFlag)
		print("添加好友结果消息:FriendAddResult.Outmsg",struct_PB.Outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_ACCEPT then--处理添加好友请求结果
		local struct_PB = ServerStruct_Other_pb.FriendAcceptResult()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendAcceptResult,struct_PB)
		print("处理添加好友请求结果")
		print("添加好友结果 1表示成功 其余表示失败:FriendAcceptResult.AddFlag",struct_PB.AddFlag)
		print("添加好友结果消息:FriendAcceptResult.Outmsg",struct_PB.Outmsg)
		print("客户端序号:FriendAcceptResult.localid",struct_PB.localid)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_NOTIFY_LIST then--好友请求列表结果
		local struct_PB = ServerStruct_Other_pb.FriendNotifyListResult()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendNotifyListResult,struct_PB.List)
		print("好友请求列表结果")
		print("总记录数:FriendNotifyListResult.Total",struct_PB.Total)
		print("好友请求列表长度:FriendNotifyListResult.List",#struct_PB.List)
		for i = 1, #struct_PB.List do
			local userdata = struct_PB.List[i]
			print("请求加好友的记录编号:FriendNotifyInfo.Rid",userdata.Rid)
			print("请求加好友的用户编号:FriendNotifyInfo.Userid",userdata.Userid)
			print("请求加好友的用户昵称:FriendNotifyInfo.Nick",userdata.Nick)
			print("被请求的用户编号:FriendNotifyInfo.FriUserid",userdata.FriUserid)
			print("处理好友请求标识 0未处理 1接受 2拒绝 3接受并加对方为好友:FriendNotifyInfo.AcceptFlag",userdata.AcceptFlag)
			print("请求添加时间:FriendNotifyInfo.AddTime",userdata.AddTime)
			print("备注信息:FriendNotifyInfo.Remark",userdata.Remark)
			print("乐讯用户id:FriendNotifyInfo.LxUserID",userdata.LxUserID)
			print("用户头像:FriendNotifyInfo.iconid",userdata.iconid)
			print("-----------------------------")
		end
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_Recommend then--推荐好友结果
		local struct_PB = ServerStruct_Other_pb.RecommendFriendResult()
		struct_PB:ParseFromString(buffer)
		print("推荐好友结果")
		print("推荐好友结果列表长度:RecommendFriendResult.List",#struct_PB.List)
		local tempData = {}
		for i = 1, #struct_PB.List do
			local data = struct_PB.List[i]
			local item = {
				userid = data.userid,
				nick = data.nick,
				iconid = data.iconid,
				gree = data.gree,
				signature = data.signature,
				viprank = data.viprank,
				Remark = data.Remark,
				IsOnline = data.IsOnline,
			}
			table.insert(tempData,item)
			print("用户编号PBUserBasicInfo.userid",data.userid)
			print("用户昵称PBUserBasicInfo.nick",data.nick)
			print("头像IDPBUserBasicInfo.iconid",data.iconid)
			print("用户等级PBUserBasicInfo.gree",data.gree)
			print("个性签名PBUserBasicInfo.signature",data.signature)
			print("用户vip等级PBUserBasicInfo.viprank",data.viprank)
			print("用户信息描述PBUserBasicInfo.Remark",data.Remark)
			print("是否在线 0表示不在线 1表示在线PBUserBasicInfo",data.IsOnline)
			print("-----------------------------")
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_RecommendFriendResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_SEARCH then --搜索好友结果
		local struct_PB = ServerStruct_Other_pb.SearchFriendResult()
		struct_PB:ParseFromString(buffer)
		print("搜索好友结果")

		local tempData = {}

		for i = 1, #struct_PB.List do
			local data = struct_PB.List[i]

			tempData = {
				userid = data.userid,
				nick = data.nick,
				iconid = data.iconid,
				gree = data.gree,
				signature = data.signature,
				viprank = data.viprank,
				Remark = data.Remark,
				IsOnline = data.IsOnline,
			}
			print("用户编号PBUserBasicInfo.userid",data.userid)
			print("用户昵称PBUserBasicInfo.nick",data.nick)
			print("头像IDPBUserBasicInfo.iconid",data.iconid)
			print("用户等级PBUserBasicInfo.gree",data.gree)
			print("个性签名PBUserBasicInfo.signature",data.signature)
			print("用户vip等级PBUserBasicInfo.viprank",data.viprank)
			print("用户信息描述PBUserBasicInfo.Remark",data.Remark)
			print("是否在线 0表示不在线 1表示在线PBUserBasicInfo",data.IsOnline)
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_SearchFriendResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIENDBLACK_ADD then--请求添加黑名单返回
		local struct_PB = ServerStruct_Other_pb.FriendBlackAddResult()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendBlackAddResult,struct_PB)
		print("请求添加黑名单返回")
		print("1表示成功 其余表示失败:FriendBlackAddResult.AddFlag",struct_PB.AddFlag)
		print("结果消息:FriendBlackAddResult.Outmsg",struct_PB.Outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIENDBLACK_LIST then -- 获取黑名单列表返回
		local struct_PB = ServerStruct_Other_pb.FriendBlackListResult()
		struct_PB:ParseFromString(buffer)
		print("获取黑名单列表返回")
		print("总数记录:FriendBlackListResult.Total",struct_PB.Total)
		print("黑名单列表长度:FriendBlackListResult.List",#struct_PB.List)
		local userList = {}
		for i = 1, #struct_PB.List do
			local data = struct_PB.List[i]
			print("用户编号PBUserBasicInfo.userid",data.userid)
			print("用户昵称PBUserBasicInfo.nick",data.nick)
			print("头像IDPBUserBasicInfo.iconid",data.iconid)
			print("用户等级PBUserBasicInfo.gree",data.gree)
			print("个性签名PBUserBasicInfo.signature",data.signature)
			print("用户vip等级PBUserBasicInfo.viprank",data.viprank)
			print("用户信息描述PBUserBasicInfo.Remark",data.Remark)
			print("是否在线 0表示不在线 1表示在线PBUserBasicInfo",data.IsOnline)
			local userdata = {}
			userdata.userid = data.userid
			userdata.nick = data.nick
			userdata.iconid = data.iconid
			userdata.gree = data.gree
			userdata.signature = data.signature
			userdata.viprank = data.viprank
			userdata.Remark = data.Remark
			userdata.IsOnline = data.IsOnline
			table.insert(userList,userdata)
			print("-----------------------------")
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendBlackListResult,userList)
	elseif subCMD == CMD_Game.SUB_OT_S_FRIENDBLACK_DEL then
		local struct_PB = ServerStruct_Other_pb.FriendBlackDelResult()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendBlackDelResult,struct_PB)
		print("请求添加黑名单返回")
		print("1表示成功 其余表示失败:FriendBlackAddResult.DelFlag",struct_PB.AddFlag)
		print("结果消息:FriendBlackAddResult.Outmsg",struct_PB.Outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_CHAT_TOALLFRIENDS then --群发信息给好友返回
		local struct_PB = ServerStruct_Other_pb.PBChatToAllFriendsReturn()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_ChatToAllFriendsReturn,struct_PB)
		print("群发信息给好友返回")
		print("0表示失败 1表示成功:PBChatToAllFriendsReturn.retval",struct_PB.retval)
		print("提示消息:PBChatToAllFriendsReturn.outmsg",struct_PB.outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_GUESTS_LIST then  --聊天室嘉宾列表返回
		local struct_PB = ServerStruct_Other_pb.PBChatGuestsListReturn()
		struct_PB:ParseFromString(buffer)
		print("聊天室嘉宾列表返回")
		print("嘉宾列表长度:PBChatGuestsListReturn.List",#struct_PB.List)
		local userList = {}
		for i = 1, #struct_PB.List do
			local data = struct_PB.List[i]
			print("用户编号PBUserBasicInfo.userid",data.userid)
			print("用户昵称PBUserBasicInfo.nick",data.nick)
			print("头像IDPBUserBasicInfo.iconid",data.iconid)
			print("用户等级PBUserBasicInfo.gree",data.gree)
			print("个性签名PBUserBasicInfo.signature",data.signature)
			print("用户vip等级PBUserBasicInfo.viprank",data.viprank)
			print("用户信息描述PBUserBasicInfo.Remark",data.Remark)
			print("是否在线 0表示不在线 1表示在线PBUserBasicInfo",data.IsOnline)
			local userdata = {}
			userdata.userid = data.userid
			userdata.nick = data.nick
			userdata.iconid = data.iconid
			userdata.gree = data.gree
			userdata.signature = data.signature
			userdata.viprank = data.viprank
			userdata.Remark = data.Remark
			userdata.IsOnline = data.IsOnline
			table.insert(userList,userdata)
			print("-----------------------------")
		end
		print("--------------------------------------------------------------------------------------------------------")
		MessageManager.Shared():postMsg(MsgKeyData.Key_ChatGuestsListReturn,userList)
	elseif subCMD == CMD_Game.SUB_OT_S_GUESTS_APPLY then -- 申请聊天室嘉宾返回
		local struct_PB = ServerStruct_Other_pb.PBChatGuestsApplyReturn()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_ChatGuestsApplyReturn,struct_PB)
		print("申请聊天室嘉宾返回")
		print("1表示成功 0表示失败 -1你已是嘉宾，不需要再申请 -2你已提交申请,请等待管理员审核 -3您在聊天室活跃度不够,暂没有嘉宾申请资格:",struct_PB.Retval)
		print("申请聊天室嘉宾消息:PBChatGuestsApplyReturn.Outmsg:",struct_PB.Outmsg)
		print("没有申请资格的时候显示最近发言数:PBChatGuestsApplyReturn.ChatStat",struct_PB.ChatStat)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_DEL then -- 请求删除好友结果
		local struct_PB = ServerStruct_Other_pb.FriendDelResult()
		struct_PB:ParseFromString(buffer)
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendDelResult,struct_PB)
		print("删除好友结果 1表示成功 其余表示失败:FriendDelResult.DelFlag:",struct_PB.DelFlag)
		print("删除好友结果消息:FriendDelResult.Outmsg",struct_PB.Outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_FRIEND_VERSION then
		local struct_PB = ServerStruct_Other_pb.FriendVersioinResult()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			Version = struct_PB.Version,
			Noticount = struct_PB.Noticount,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_FriendVersioinResult,tempData)
		print("服务端版好友本号:FriendVersioinResult.Version",struct_PB.Version)
		print("最新需要验证的好友数量:FriendVersioinResult.Noticount",struct_PB.Noticount)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_ACCESS_INSURE then -- 保险柜存取结果
		local struct_PB = ServerStruct_Other_pb.PBAccessInsureResult()--保险柜存取结果
		struct_PB:ParseFromString(buffer)
		local tempData = {
			retval = struct_PB.retval,
			outmsg = struct_PB.outmsg,
			treasureid = struct_PB.treasureid,
			score = struct_PB.score,
			insureScore = struct_PB.insureScore,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_AccessInsureResult,tempData)
		print("保险柜存取结果")
		print("结果代码 0失败 1成功:PBAccessInsureResult.retval",struct_PB.retval)
		print("结果描述:PBAccessInsureResult.outmsg",struct_PB.outmsg)
		print("财富id  0 金豆 1能量 2钻石... 10+ 道具id:PBAccessInsureResult.treasureid",struct_PB.treasureid)
		print("用户财富数量(成功的时候才更新):PBAccessInsureResult.score",struct_PB.score)
		print("用户财富保险箱数量(成功的时候才更新):PBAccessInsureResult.insureScore",struct_PB.insureScore)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_EXCHANGE_RECORD then--用户兑换记录结果
		local struct_PB = ServerStruct_Other_pb.PBUserExchangeRecordResult()--用户兑换记录结果
		struct_PB:ParseFromString(buffer)
		print("兑换记录结果列表长度:PBUserExchangeRecordResult.orderlist",#struct_PB.orderlist)
		local tempData = {}
		for i = 1, #struct_PB.orderlist do
			local order = struct_PB.orderlist[i]
			local tempOrder = {
				orderid = order.orderid,
				exchangeOrderID = order.exchangeOrderID,
				destGoodsName = order.destGoodsName,
				orderStatus = order.orderStatus,
				orderCreateTime = order.orderCreateTime,
				destGoodsCardSN = order.destGoodsCardSN,
				destGoodsCardPWD = order.destGoodsCardPWD,
			}
			table.insert(tempData,tempOrder)
			print("订单号:PBExchangeOrderInfo.orderid",order.orderid)
			print("兑换ID:PBExchangeOrderInfo.exchangeOrderID",order.exchangeOrderID)
			print("目标商品名称:PBExchangeOrderInfo.destGoodsName",order.destGoodsName)
			print("订单状态:PBExchangeOrderInfo.orderStatus",order.orderStatus)
			print("兑换时间:PBExchangeOrderInfo.orderCreateTime",order.orderCreateTime)
			print("目标商品卡号:PBExchangeOrderInfo.destGoodsCardSN",order.destGoodsCardSN)
			print("目标商品卡密码:PBExchangeOrderInfo.destGoodsCardPWD",order.destGoodsCardPWD)
			print("-----------------------------")
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_UserExchangeRecordResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_EXCHANGE_GOODS then--用户兑换物品结果
		local struct_PB = ServerStruct_Other_pb.PBUserExchangeGoodsResult()
		struct_PB:ParseFromString(buffer)
		print("操作结果 1 兑换成功 2 操作成功但订单未完成（实物）  -1 不存在的兑换方式 -2 兑换内容异常 -3 数量不够，无法兑换 :PBUserExchangeGoodsResult.retval",struct_PB.retval)
		print("提示说明:PBUserExchangeGoodsResult.outmsg",struct_PB.outmsg)
		print("兑换ID:PBUserExchangeGoodsResult.exchangeOrderID",struct_PB.exchangeOrderID)
		print("操作完成后 兑换物品的数量:PBUserExchangeGoodsResult.sourcePropNum",struct_PB.sourcePropNum)
		print("操作完成后 被兑换物品的数量:PBUserExchangeGoodsResult.DestPropNum",struct_PB.DestPropNum)
		local tempData = {
			retval = struct_PB.retval,
			outmsg = struct_PB.outmsg,
			exchangeOrderID = struct_PB.exchangeOrderID,
			sourcePropNum = struct_PB.sourcePropNum,
			destPropNum = struct_PB.DestPropNum,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_UserExchangeGoodsResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_USER_INSURE then -- 保险箱信息返回
		local struct_PB = ServerStruct_Other_pb.PBUserInsureResult()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			result = struct_PB.result,
			list = {},
		}
		print("结果:PBUserInsureResult.result",struct_PB.result)
		print("结果列表长度:PBUserInsureResult.List",#struct_PB.List)
		for i = 1, #struct_PB.List do
			local item = {
				propid = struct_PB.List[i].propid,
				insureNum = struct_PB.List[i].insureNum,
			}
			table.insert(tempData.list,item)
			print("物品id:PBUserInsureResult.List.propid",struct_PB.List[i].propid)
			print("库存数量:PBUserInsureResult.List.insureNum",struct_PB.List[i].insureNum)
		end
		MessageManager.Shared():postMsg(MsgKeyData.Key_UserInsureResult,tempData)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_PROP_GIVE then--赠送道具请求返回
		local struct_PB = ServerStruct_Other_pb.PBPropGiveReturn()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			propid = struct_PB.propid,
			nums = struct_PB.nums,
			result = struct_PB.result,
			outmsg = struct_PB.outmsg,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_PropGiveReturn,tempData)
		print("道具id:PBPropGiveReturn.propid",struct_PB.propid)
		print("赠送数量:PBPropGiveReturn.nums",struct_PB.nums)
		print("结果 0 失败 1 成功:PBPropGiveReturn.result",struct_PB.result)
		print("返回消息:PBPropGiveReturn.outmsg",struct_PB.outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_PROP_BUY then--购买道具请求返回
		local struct_PB = ServerStruct_Other_pb.PBPropBuyReturn()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			propid = struct_PB.propid,
			nums = struct_PB.nums,
			result = struct_PB.result,
			outmsg = struct_PB.outmsg,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_PropBuyReturn,tempData)
		print("道具id:PBPropGiveReturn.propid",struct_PB.propid)
		print("购买数量:PBPropGiveReturn.nums",struct_PB.nums)
		print("结果 0 失败 1 成功:PBPropGiveReturn.result",struct_PB.result)
		print("返回消息:PBPropGiveReturn.outmsg",struct_PB.outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	elseif subCMD == CMD_Game.SUB_OT_S_PROP_SPLIT then -- 分解道具请求返回
		local struct_PB = ServerStruct_Other_pb.PBPropSplitReturn()
		struct_PB:ParseFromString(buffer)
		local tempData = {
			result = struct_PB.result,
			outmsg = struct_PB.outmsg,
		}
		MessageManager.Shared():postMsg(MsgKeyData.Key_PropSplitReturn,tempData)
		print("结果 0 失败 1 成功:PBPropSplitReturn.result",struct_PB.result)
		print("返回消息:PBPropSplitReturn.outmsg",struct_PB.outmsg)
		print("--------------------------------------------------------------------------------------------------------")
	end
end

return _M