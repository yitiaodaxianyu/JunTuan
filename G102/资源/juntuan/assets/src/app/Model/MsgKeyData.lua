local MsgKeyData = {}
----------------------聊天服务器
---PersonInfo---
MsgKeyData.Key_PersonModifyNickResult = "PBPersonModifyNickResult"                  --修改昵称返回
MsgKeyData.Key_PersonModifyIconResult = "PBPersonModifyIconResult"                  --修改头像返回
MsgKeyData.Key_UserInfoReturn = "PBUserInfoReturn"                                  --用户信息请求返回
MsgKeyData.Key_VipConfigListReturn = "PBVipConfigListReturn"                        --vip配置信息请求返回
MsgKeyData.Key_FishPlayerUpdateReturn = "PBFishPlayerUpdateReturn"                  --玩家信息更新返回
MsgKeyData.Key_UserPaytimesListReturn = "PBUserPaytimesListReturn"                  --用户支付次数信息请求返回
MsgKeyData.Key_BarbetteForgeReturn = "PBBarbetteForgeReturn"                        --炮座锻造返回
MsgKeyData.Key_RankInfoListResult = "PBRankInfoListResult"                          --排行列表结果
MsgKeyData.Key_SignRewardListResult = "PBSignRewardListResult"                      --签到奖励请求返回
MsgKeyData.Key_UserSignResult = "PBUserSignResult"                                  --用户签到返回
---UserBag---
MsgKeyData.Key_UserBagReturn = "PBUserBagReturn"                                    --捕鱼背包请求返回
MsgKeyData.Key_PropBuyReturn = "PBPropBuyReturn"                                    --道具购买返回
MsgKeyData.Key_PropGiveReturn = "PBPropGiveReturn"                                  --道具赠送返回
MsgKeyData.Key_PropSplitReturn = "PBPropSplitReturn"                                --道具分解返回
---Friend---
MsgKeyData.Key_FriendListResult = "FriendListResult"                                --获取好友列表结果
MsgKeyData.Key_FriendAddResult = "FriendAddResult"                                  --请求添加好友结果
MsgKeyData.Key_FriendDelResult = "FriendDelResult"                                  --请求删除好友结果
MsgKeyData.Key_FriendNotifyListResult = "FriendNotifyListResult"                    --好友请求列表结果
MsgKeyData.Key_FriendAcceptResult = "FriendAcceptResult"                            --处理添加好友请求结果
MsgKeyData.Key_FriendVersioinResult = "FriendVersioinResult"                        --获取好友列表版本结果
MsgKeyData.Key_SearchFriendResult = "SearchFriendResult"                            --搜索好友结果
MsgKeyData.Key_RecommendFriendResult = "RecommendFriendResult"                      --推荐好友结果
MsgKeyData.Key_FriendBatchAddResult = "FriendBatchAddResult"                        --批量请求添加好友结果
MsgKeyData.Key_ChatToAllFriendsReturn = "ChatToAllFriendsReturn"                    --群发信息给好友返回
MsgKeyData.Key_FriendBlackAddResult = "FriendBlackAddResult"                        --请求添加黑名单返回
MsgKeyData.Key_FriendBlackDelResult = "FriendBlackDelResult"                        --请求删除黑名单返回
MsgKeyData.Key_FriendBlackListResult = "FriendBlackListResult"                      --获取黑名单列表返回
MsgKeyData.Key_FriendNoticeCancelResult = "FriendNoticeCancelResult"                --撤销好友申请请求返回
MsgKeyData.Key_ChatGuestsApplyReturn = "PBChatGuestsApplyReturn"                    --申请聊天室嘉宾返回
MsgKeyData.Key_ChatGuestsListReturn = "PBChatGuestsListReturn"                      --聊天室嘉宾列表返回
MsgKeyData.Key_ChatGuestsCheckReturn = "PBChatGuestsCheckReturn"                    --检查是否是聊天室嘉宾返回
MsgKeyData.Key_ChatDelMsgReturn = "PBChatDelMsgReturn"                              --删除聊天消息返回
MsgKeyData.Key_ChatAddBlackReturn = "PBChatAddBlackReturn"                          --添加禁言名单返回
MsgKeyData.Key_ChatDelBlackReturn = "PBChatDelBlackReturn"                          --删除禁言名单返回
MsgKeyData.Key_ChatBlackListReturn = "PBChatBlackListReturn"                        --禁言名单列表返回
MsgKeyData.Key_FriendVersioinResult = "FriendVersioinResult"                        --好友版本返回
---chat
MsgKeyData.Key_ChatGameOnlineResult = "PBChatGameOnlineResult"                      --游戏服务器在线人数
MsgKeyData.Key_ChatGameMoneyUpdate = "PBChatGameMoneyUpdate"                        --聊天服务器 金币、钻石更新 (一次只会更新一种)
MsgKeyData.Key_ChatMatchNotify = "PBChatMatchNotify"                                --开赛提醒消息
MsgKeyData.Key_ChatRecvChatMsg = "PBChatRecvChatMsg"                                --收到世界聊天消息
MsgKeyData.Key_ChatSendChatMsgResult = "PBChatSendChatMsgResult"                    --聊天消息发送结果
MsgKeyData.Key_ChatSetChannelSuccess = "PBChatSetChannelSuccess"                    --频道设置成功

MsgKeyData.Key_ChatServerLoginSuccess = "PBChatLoginSuccess"                        --聊天登录成功

MsgKeyData.Key_ChatHasNewFriend = "PBChatHasNewFriend"                              --聊天服务器 通知用户被添加好友 需要去验证 通知到连接的客户端用红点显示

--MsgKeyData.Key_ChatSendChatMsgResult = "PBChatSendChatMsgResult"                    --聊天消息发送结果
--MsgKeyData.Key_ChatRecvChatMsg = "PBChatRecvChatMsg"                                --收到世界聊天消息


----------------------游戏服务器
MsgKeyData.Key_MatchStart = "PB_GR_MatchStart"                                      --游戏开始
MsgKeyData.Key_FrontJoinCount = "PB_GR_FrontJoinCount"                              --报名前显示信息
MsgKeyData.Key_AfterJoinCount = "PB_GR_JoinCount"                                   --报后前显示信息
MsgKeyData.Key_JoinResult = "PB_GR_JoinResult"                                      --报名结果

MsgKeyData.Key_AccessInsureResult = "PBAccessInsureResult"                          --保险箱操作结果
MsgKeyData.Key_UserExchangeRecordResult = "PBUserExchangeRecordResult"              --获取用户兑换记录结果
MsgKeyData.Key_UserExchangeGoodsResult = "PBUserExchangeGoodsResult"                --兑换物品结果
MsgKeyData.Key_UserInsureResult = "PBUserInsureResult"                              --

MsgKeyData.Key_UserExchangeGoodsResult = "PBUserExchangeGoodsResult"                --兑换物品结果

MsgKeyData.Key_GameServerLogonFailed = "PB_GR_LogonFailed"                                    --游戏服务器登录失败


----------------------UI
MsgKeyData.Key_ChangeBindPhone = "ChangeBindPhone"                                  --修改绑定的手机

return MsgKeyData