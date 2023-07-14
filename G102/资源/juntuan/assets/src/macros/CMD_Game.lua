local _M = {}

-----------------------------------登录服务器-----------------------------------------------
-- 主命令 登录
_M.MDM_MB_LOGON 						= 100

_M.SUB_MB_LOGON_COMMON 			        = 3				-- 登录 PB_MB_LogonCommon
_M.SUB_MB_LOGON_FAILURE 				= 501			-- 登录失败 PB_MB_LogonFailure
_M.SUB_MB_LOGON_SUCCESS 				= 500			-- 登录成功 PB_MB_LogonSuccess
------------------------------------------------
-- 主命令 房间列表 
_M.MDM_MB_SERVER_LIST 					= 101

_M.SUB_MB_LIST_ROOMTYPE_INFO 			= 202 			-- 列表信息 PB_MB_RoomTypeInfo
_M.SUB_MB_LOGON_DNLIST 			        = 300 			-- 列表信息 PB_MB_LogonDnList
_M.SUB_MB_LIST_SERVER 					= 101 			-- 房间列表 PB_MB_GameServerList
_M.SUB_MB_LIST_FINISH 					= 200 			-- 列表完成 PB_MB_RoomListFinish
------------------------------------登录服务器-----------------------------------------------

------------------------------------游戏服务器-----------------------------------------------
-- 主命令 游戏登录
_M.MDM_GR_LOGON 						= 1

_M.SUB_GR_LOGON_MOBILE 					= 2				-- 登录游戏 PB_GR_Logon
_M.SUB_GR_LOGON_FAILURE 				= 101			-- 登录失败 PB_GR_LogonFailed
_M.SUB_GR_LOGON_FINISH 					= 102			-- 登录成功 PB_GR_LogonSuccess
------------------------------------------------
-- 主命令 用户
_M.MDM_GR_USER 							= 3

_M.SUB_GR_USER_ENTER 					= 100			-- 用户进入 PB_GR_UserEnter
_M.SUB_GR_USER_SCORE 					= 101			-- 用户分数 PB_GR_UserScore
_M.SUB_GR_USER_STATUS 					= 102			-- 用户状态 PB_GR_UserStatus
_M.SUB_GR_REQUEST_FAILURE 				= 103			-- 请求失败 PB_GR_RequestFailed
_M.SUB_GR_USER_SITDOWN 					= 3				-- 用户坐下 PB_GR_UserSitDown
_M.SUB_GR_USER_CHAIR_REQ 				= 10			-- 请求更换位置 PB_GR_UserReqChair
_M.SUB_GR_USER_CHAIR_INFO_REQ 			= 11			-- 请求椅子信息 PB_GR_UserReqChairInfo
------------------------------------------------
-- 主命令 房间规则
_M.MDM_GF_ROOM_RULE 					= 400

_M.SUB_GF_REC_ROOM_FEE 					= 1				-- 复活 PB_GR_SaveLife
_M.SUB_GF_REC_DEDUCT_FEE_RESULT 		= 2				-- 复活结果 PB_GR_SaveLifeResult
------------------------------------------------
-- 主命令 框架
_M.MDM_GF_FRAME 						= 100

_M.SUB_GF_GAME_OPTION 					= 1				-- 游戏配置 PB_GR_GameOption
_M.SUB_GF_USER_READY 					= 2				-- 用户准备 PB_GR_GameUserReady
_M.SUB_GF_SYSTEM_MESSAGE 				= 200			-- 系统消息 PB_GR_GameSystemMessage
------------------------------------------------
-- 主命令 比赛服务
_M.MDM_CS_MATCH_SERVER 					= 7

_M.SUB_CS_S_CUR_MATCH_JOINCOUNT 		= 107			-- 报名信息（报名前） PB_GR_FrontJoinCount
_M.SUB_CS_S_JOIN_MATCH_COUNT 			= 31			-- 报名信息（报名后） PB_GR_JoinCount
_M.SUB_CS_C_OPERATE_RESULT 				= 100			-- 报名结果 PB_GR_JoinResult
_M.SUB_CS_S_USER_RECONN_EL 				= 108			-- 比赛重连信息 PB_GR_MatchReconnet
_M.SUB_CS_S_RANKING_LIST 				= 102 			-- 比赛排名结果 PB_GR_GetMatchRankResult
_M.SUB_CS_S_RANKING_LIST_TABLE 			= 103			-- 本桌排名结果 PB_GR_GetTableRankResult
_M.SUB_CS_S_START 						= 4				-- 比赛开始 PB_GR_MatchStart
_M.SUB_CS_S_KNOCK_OUT_USER 				= 7				-- 用户淘汰 PB_GR_OutUserInfo
_M.SUB_CS_S_CONTINUE_USER 				= 8				-- 用户晋级 PB_GR_ContinueUser
_M.SUB_CS_S_WAITING_USER 				= 9				-- 用户等待 PB_GR_WaitingUser
_M.SUB_CS_S_WAITING_TABLE_USER 			= 10			-- 用户等待配桌 PB_GR_WaitingTableUser
_M.SUB_CS_S_CLEAR_USER 					= 110			-- 清理用户 PB_GR_ClearUser
_M.SUB_CS_C_MATCH_OVER 					= 101			-- 比赛结束 PB_GR_MatchOver
_M.SUB_CS_S_REVIVE_JOIN 				= 120			-- 复活参赛 PB_GR_ReviveJoin
_M.SUB_CS_S_ADD_BLOOD 					= 119			-- 购买血量结果 PB_MATCH_AddBloodResult
_M.SUB_CS_S_ADD_SCORE 					= 122			-- 增加分数结果 PB_MATCH_AddScoreResult
------------------------------------------------
-- 主命令 淘汰赛
_M.MDM_MB_ELIMINATE_MATCH 				= 600

_M.SUB_MB_ELIMINATE_JOIN_MATCH 			= 1				-- 报名 PB_GR_JoinMatch
_M.SUB_MB_LEIMINATE_CANCEL_MATCH 		= 2				-- 取消报名 PB_GR_CancelJoinMatch
_M.SUB_MB_ELIMINATE_LEAVE_MATCH 		= 3				-- 逃跑 PB_GR_LeaveMatch 逃跑结果 PB_GR_LeaveMatchResult
_M.SUB_MB_ELIMINATE_MATCH_RANK 			= 4				-- 比赛排名 PB_GR_GetMatchRank
_M.SUB_MB_ELIMINATE_TABLE_MATCH_RANK 	= 5				-- 本桌排名 PB_GR_GetTableRank
_M.SUB_MB_ELIMINATE_ADDBLOOD 			= 7				-- 购买血量 PB_MATCH_AddBlood
_M.SUB_MB_ELIMINATE_ADDSCORE 			= 9				-- 增加分数 PB_MATCH_AddScore
------------------------------------------------
-- 主命令 自由赛
_M.MDM_MB_FREE_MATCH 					= 700
_M.SUB_GR_USER_ADDBLOOD_LIST 			= 1				-- 补血列表 PB_GR_AddBloodList 结果 PB_GR_AddBloodListResult
_M.SUB_GR_USER_ADDBLOOD 				= 2				-- 补血 PB_GR_AddBlood 结果 PB_GR_AddBloodResult
_M.SUB_GR_USER_FORCEQUIT 				= 3				-- 强退 PB_GR_ForceQuit 结果 PB_GR_ForceQuitResult
------------------------------------游戏服务器-----------------------------------------------

------------------------------------聊天服务器-----------------------------------------------
-- 主命令 辅助服务
_M.MDM_ASSIST_SERVICE                   = 600
_M.SUB_AS_C_NOTICE                      = 1             --请求公告消息 PBChatGetNoticeMsg
_M.SUB_AS_C_HISTORYMSG                  = 3             --请求历史消息 PBChatGetHistoryMsg
_M.SUB_AS_C_GAMEONLINE                  = 4             --请求游戏服务器在线人数 PBChatGetGameOnline
_M.SUB_AS_S_GAMEONLINE                  = 104           --游戏服务器在线人数 PBChatGameOnlineResult
_M.SUB_AS_S_USERMONEYUPDATE             = 105           --聊天服务器 金币、钻石更新 (一次只会更新一种) PBChatGameMoneyUpdate
_M.SUB_AS_S_OPENMATCHNOTIFY             = 106           --开赛提醒消息 PBChatMatchNotify
_M.SUB_AS_C_SYSTEMHIT                   = 7             --请求聊天室系统提示 PBChatSystemHint
--_M.SUB_AS_S_SYSTEMHIT                   = 107           --聊天室系统提示 提示下一次发放红包的时间 PBChatSystemHintResult
--_M.SUB_OT_C_LUCKY_REDBAG_HIT            = 8             --拼人品红包提示消息 PBLuckyRedBagHintReq
--_M.SUB_OT_S_LUCKY_REDBAG_HIT            = 108           --拼人品红包提示消息返回 PBLuckyRedBagHintReturn
------------------------------------------------
-- 主命令 聊天服务
_M.MDM_CS_CHAT_SERVICE                  = 500
_M.SUB_CS_CHAT_MSG                      = 100           --发送聊天消息 PBChatSendChatMsg
_M.SUB_CS_CHAT_MSG                      = 100           --接收聊天消息 PBChatRecvChatMsg
_M.SUB_CS_CHAT_MSGRESULT                = 101           --聊天消息发送结果 PBChatSendChatMsgResult
_M.SUB_CS_CHAT_CHANNELSET               = 102           --设置聊天频道 SUB_CS_CHAT_CHANNELSET
_M.SUB_CS_CHAT_CHANNELSETOK             = 103           --频道设置成功 PBChatSetChannelSuccess
_M.SUB_CS_CHAT_MSGRESPONSE              = 105           --消息应答 PBChatChatResponse
_M.SUB_CS_CHAT_MSGREADREMARK            = 106           --标记会话已读 PBChatMarkRead
_M.SUB_CS_CHAT_HASNEWFRIEND             = 107           --聊天服务器 通知用户被添加好友 需要去验证 通知到连接的客户端用红点显示 PBChatHasNewFriend
------------------------------------------------
--主命令 其它服务
_M.MDM_OTHER_SERVICE                    = 700
---PersonInfo
_M.SUB_OT_C_MODIFY_NICK                 = 1             --修改昵称请求 PBPersonModifyNickReq
_M.SUB_OT_S_MODIFY_NICK                 = 2             --修改昵称返回 PBPersonModifyNickResult
_M.SUB_OT_C_MODIFY_ICON                 = 3             --修改系统头像 PBPersonModifyIconReq
_M.SUB_OT_S_MODIFY_ICON                 = 4             --修改系统头像结果 PBPersonModifyIconResult
_M.SUB_OT_C_USER_INFO                   = 5             --用户信息请求 PBUserInfoReq
_M.SUB_OT_S_USER_INFO                   = 6             --用户信息请求返回 PBUserInfoReturn PBUserBasicInfo
_M.SUB_OT_C_VIP_CONFIG_LIST             = 9             --vip配置信息请求 PBVipConfigListReq
_M.SUB_OT_S_VIP_CONFIG_LIST             = 10            --vip配置信息请求返回 PBVipConfigListReturn
--_M.SUB_OT_C_PLAYER_UPDATE               = 11            --玩家信息更新请求 PBFishPlayerUpdateReq
--_M.SUB_OT_S_PLAYER_UPDATE               = 12            --玩家信息更新返回 PBFishPlayerUpdateReturn
_M.SUB_OT_C_USER_PAYTIMES_LIST          = 13            --用户支付次数信息请求 PBUserPaytimesListReq
_M.SUB_OT_S_USER_PAYTIMES_LIST          = 14            --用户支付次数信息请求返回 PBUserPaytimesListReturn
_M.SUB_OT_C_BARBETTE_FORGE              = 15            --炮座锻造请求 PBBarbetteForgeReq
_M.SUB_OT_S_BARBETTE_FORGE              = 16            --炮座锻造返回 PBBarbetteForgeReturn
_M.SUB_OT_C_RANK_INFO_LIST              = 17            --排行列表 PBRankInfoList
_M.SUB_OT_S_RANK_INFO_LIST              = 18            --排行列表结果 PBRankInfoListResult
_M.SUB_OT_C_SIGN_REWARD_LIST            = 19            --签到奖励请求 PBSignRewardListReq
_M.SUB_OT_S_SIGN_REWARD_LIST            = 20            --签到奖励请求返回 PBSignRewardListResult
_M.SUB_OT_C_USER_SIGN                   = 21            --用户签到请求 PBUserSignReq
_M.SUB_OT_S_USER_SIGN                   = 22            --用户签到返回 PBUserSignResult
---UserBag
_M.SUB_OT_C_USER_BAG                    = 101            --捕鱼背包请求 PBUserBagReq
_M.SUB_OT_S_USER_BAG                    = 102            --捕鱼背包请求返回 PBUserBagReturn
_M.SUB_OT_C_PROP_BUY                    = 103            --道具购买请求 PBPropBuyReq
_M.SUB_OT_S_PROP_BUY                    = 104            --道具购买返回 PBPropBuyReturn
_M.SUB_OT_C_PROP_GIVE                   = 105            --道具赠送请求 PBPropGiveReq
_M.SUB_OT_S_PROP_GIVE                   = 106            --道具赠送返回 PBPropGiveReturn
_M.SUB_OT_C_PROP_SPLIT                  = 107            --道具分解请求 PBPropSplitReq
_M.SUB_OT_S_PROP_SPLIT                  = 108            --道具分解返回 PBPropSplitReturn
---Friend
_M.SUB_OT_C_FRIEND_LIST                 = 301            --获取好友列表 FriendList
_M.SUB_OT_S_FRIEND_LIST                 = 302            --获取好友列表结果 FriendListResult
_M.SUB_OT_C_FRIEND_ADD                  = 303            --请求添加好友 FriendAdd
_M.SUB_OT_S_FRIEND_ADD                  = 304            --请求添加好友结果 FriendAddResult
_M.SUB_OT_C_FRIEND_DEL                  = 305            --请求删除好友 FriendDel
_M.SUB_OT_S_FRIEND_DEL                  = 306            --请求删除好友结果 FriendDelResult
_M.SUB_OT_C_FRIEND_NOTIFY_LIST          = 307            --好友请求列表 FriendNotifyList
_M.SUB_OT_S_FRIEND_NOTIFY_LIST          = 308            --好友请求列表结果 FriendNotifyListResult
_M.SUB_OT_C_FRIEND_ACCEPT               = 309            --处理添加好友请求 FriendAccept
_M.SUB_OT_S_FRIEND_ACCEPT               = 310            --处理添加好友请求结果 FriendAcceptResult
_M.SUB_OT_C_FRIEND_VERSION              = 311            --获取好友列表版本 FriendVersioin
_M.SUB_OT_S_FRIEND_VERSION              = 312            --获取好友列表版本结果 FriendVersioinResult
_M.SUB_OT_C_FRIEND_SEARCH               = 313            --搜索好友 SearchFriend
_M.SUB_OT_S_FRIEND_SEARCH               = 314            --搜索好友结果 SearchFriendResult
_M.SUB_OT_C_FRIEND_Recommend            = 315            --推荐好友 RecommendFriend
_M.SUB_OT_S_FRIEND_Recommend            = 316            --推荐好友结果 RecommendFriendResult
_M.SUB_OT_C_FRIEND_BATCH_ADD            = 317            --批量请求添加好友 FriendBatchAdd
_M.SUB_OT_S_FRIEND_BATCH_ADD            = 318            --批量请求添加好友结果 FriendBatchAddResult
_M.SUB_OT_C_CHAT_TOALLFRIENDS           = 319            --群发信息给好友 PBChatToAllFriends
_M.SUB_OT_S_CHAT_TOALLFRIENDS           = 320            --群发信息给好友返回 PBChatToAllFriendsReturn
_M.SUB_OT_C_FRIENDBLACK_ADD             = 325            --请求添加黑名单 FriendBlackAdd
_M.SUB_OT_S_FRIENDBLACK_ADD             = 326            --请求添加黑名单返回 FriendBlackAddResult
_M.SUB_OT_C_FRIENDBLACK_DEL             = 327            --请求删除黑名单 FriendBlackDel
_M.SUB_OT_S_FRIENDBLACK_DEL             = 328            --请求删除黑名单返回 FriendBlackDelResult
_M.SUB_OT_C_FRIENDBLACK_LIST            = 329            --获取黑名单列表 FriendBlackList
_M.SUB_OT_S_FRIENDBLACK_LIST            = 330            --获取黑名单列表返回 FriendBlackListResult
_M.SUB_OT_C_NOTICE_CANCEL               = 331            --撤销好友申请请求 FriendNoticeCancelReq
_M.SUB_OT_S_NOTICE_CANCEL               = 332            --撤销好友申请请求返回 FriendNoticeCancelResult

_M.SUB_OT_C_GUESTS_APPLY                = 407            --申请聊天室嘉宾 PBChatGuestsApply
_M.SUB_OT_S_GUESTS_APPLY                = 408            --申请聊天室嘉宾返回 PBChatGuestsApplyReturn
_M.SUB_OT_C_GUESTS_LIST                 = 409            --聊天室嘉宾列表 PBChatGuestsList
_M.SUB_OT_S_GUESTS_LIST                 = 410            --聊天室嘉宾列表返回 PBChatGuestsListReturn
_M.SUB_OT_C_GUESTS_CHECK                = 411            --检查是否是聊天室嘉宾 PBChatGuestsCheck
_M.SUB_OT_S_GUESTS_CHECK                = 412            --检查是否是聊天室嘉宾返回 PBChatGuestsCheckReturn
_M.SUB_OT_C_CHAT_DELMSG                 = 413            --删除聊天消息 PBChatDelMsg
_M.SUB_OT_S_CHAT_DELMSG                 = 414            --删除聊天消息返回 PBChatDelMsgReturn
_M.SUB_OT_C_CHAT_ADDBLACK               = 415            --添加禁言名单 PBChatAddBlack
_M.SUB_OT_S_CHAT_ADDBLACK               = 416            --添加禁言名单返回 PBChatAddBlackReturn
_M.SUB_OT_C_CHAT_DELBLACK               = 417            --删除禁言名单 PBChatDelBlack
_M.SUB_OT_S_CHAT_DELBLACK               = 418            --删除禁言名单返回 PBChatDelBlackReturn
_M.SUB_OT_C_CHAT_BLACKLIST              = 419            --禁言名单列表 PBChatBlackList
_M.SUB_OT_S_CHAT_BLACKLIST              = 420            --禁言名单列表返回 PBChatBlackListReturn
_M.SUB_OT_C_ACCESS_INSURE               = 23             --保险柜存取
_M.SUB_OT_S_ACCESS_INSURE               = 24             --保险柜存取结果
_M.SUB_OT_C_EXCHANGE_RECORD             = 117            --获取用户兑换记录
_M.SUB_OT_S_EXCHANGE_RECORD             = 118            --获取用户兑换记录结果
_M.SUB_OT_C_EXCHANGE_GOODS              = 119            --用户兑换物品
_M.SUB_OT_S_EXCHANGE_GOODS              = 120            --用户兑换物品结果
_M.SUB_OT_C_USER_INSURE                 = 25            --获取保险箱信息
_M.SUB_OT_S_USER_INSURE                 = 26            --获取保险箱信息返回
------------------------------------聊天服务器-----------------------------------------------

------------------------------------预登录-----------------------------------------------
_M.MDM_MB_LOGON_PRE                     = 90            -- 预登录
_M.SUB_S_LIST_CHATSERVER                = 101           -- 聊天服务器列表

return _M