-- socket定义码
NET_CONN_SUCC 			= 1 			--连接成功
NET_SEND_DATA_SUCCESS 	= 2 			--发送数据成功
NET_RECV_DATA_SUCCESS   = 3 			--接收数据
NET_ERROR_CONN_FAILED   = -1 			--连接失败
NET_ERROR_DIS_CONN 		= -2 			--连接断开
NET_SERVER_CLOSE_SOCKET = -3 			--服务关闭套接字
NET_SDK_RECV_HEART_TIMEOUT = -4 		--心跳超时

-- socket状态
SOCKET_STATUS_NULL		= 0				--未连接
SOCKET_STATUS_DOING		= 1				--连接中
SOCKET_STATUS_CONNECT	= 2				--连接

-- 服务器标记
SERVER_FLAG_LOGIN		= 0				--登录
SERVER_FLAG_SERVICE		= 1				--服务

-- 用户状态
USER_STATUS_NULL		= 0				--空
USER_STATUS_STAND		= 1				--站立
USER_STATUS_SIT			= 2				--坐下
USER_STATUS_READY		= 3				--准备
USER_STATUS_LOOKON		= 4				--旁观
USER_STATUS_PLAYING		= 5				--游戏
USER_STATUS_OFFLINE		= 6				--断线

-- 登录类型
LOGIN_TYPE_ACCOUNT 		= 2 			--账号密码
--LOGIN_TYPE_QQ 			= 2 			--QQ
--LOGIN_TYPE_WX 			= 3 			--微信
LOGIN_TYPE_VISITOR 		= 4				--游客

CHANNEL_NULL = 0		--无频道
CHANNEL_WORLD = 1		--世界频道
CHANNEL_SOCIETY = 2	    --公会频道
CHANNEL_DIALOGUE = 4	--私聊频道
CHANNEL_NOTIFY = 8		--系统频道
CHANNEL_ROOM = 16		--房间频道
CHANNEL_NOTICE = 32	    --跑马灯提示消息频道

SystemMsgID = 9500 -- 系统消息ID
CustomServiceID = 10080 -- 客服ID

NONE_MODE               = 0
HTTPREQUESTING			= 52 -- 正在请求http
UNCOMPRESSING			= 53 -- 正在解压还原
SUBGAMEDOWNLOADING		= 54 -- 正在子游戏更新