local RoomConfig = {}

--游戏类型（6为自由赛、5为淘汰赛、7为娱乐场）
RoomConfig.GAMEYTPE_NO = -1
RoomConfig.GAMEYTPE_CLASSIC = 6
RoomConfig.GAMEYTPE_MATCH = 5
RoomConfig.GAMEYTPE_ENTERTAINMENT = 7

RoomConfig.ROOMTYPE_CHAT = 0     --聊天
--RoomConfig.ROOMTYPE_CLASSIC = 25 --经典场
--RoomConfig.ROOMTYPE_MATCH = 22 --比赛场

RoomConfig.ROOMTYPE_CLASSIC_PRIMARY = 25 --初级场
RoomConfig.ROOMTYPE_CLASSIC_INTERMEDIATE = 26 --中级场
RoomConfig.ROOMTYPE_CLASSIC_ADVANCED = 27 --高级场
RoomConfig.ROOMTYPE_CLASSIC_GRANDMASTER = 28 --大师场

RoomConfig.ROOMTYPE_MATCH_FENGQIANG = 22 --疯抢赛
RoomConfig.ROOMTYPE_MATCH_ZHENDUO = 21 --争夺赛
RoomConfig.ROOMTYPE_MATCH_KUANGHUAN = 20 --狂欢赛
RoomConfig.ROOMTYPE_MATCH_NEWBIE = 19 --新手赛
RoomConfig.ROOMTYPE_MATCH_ELITE = 18 --精英赛
RoomConfig.ROOMTYPE_MATCH_GRANDMASTER = 17 --大师赛



RoomConfig.ROOMTYPE_FISH_RED = 2011 --捕鱼红包场
RoomConfig.ROOMTYPE_FISH_BOSS = 2017 --捕鱼Boss场
RoomConfig.ROOMTYPE_ENERGY = 2018 --能量场

--经典场 (报名费、基础分、初始倍数、税、入场条件、房间名、房间类型)
RoomConfig.classicCfg = {
    {
        registeryFee = 0,baseScore = 150,multiple = 1,taxRate = 250,condition = 1000,conditionStr = "1000以上", roomName = "初级场" ,
        roomType = RoomConfig.ROOMTYPE_CLASSIC_PRIMARY , gameType = RoomConfig.GAMEYTPE_CLASSIC,
    },

    {
        registeryFee = 0,baseScore = 2500,multiple = 1,taxRate = 4500,condition = 20000, conditionStr = "2万以上",roomName = "中级场" ,
        roomType = RoomConfig.ROOMTYPE_CLASSIC_INTERMEDIATE, gameType = RoomConfig.GAMEYTPE_CLASSIC
    },

    {
        registeryFee = 0,baseScore = 6000,multiple = 1,taxRate = 11000,condition = 50000,conditionStr = "5万以上", roomName = "高级场" ,
        roomType = RoomConfig.ROOMTYPE_CLASSIC_ADVANCED, gameType = RoomConfig.GAMEYTPE_CLASSIC
    },

    {
        registeryFee = 0,baseScore = 15000,multiple = 1,taxRate = 30000,condition = 100000,conditionStr = "10万以上", roomName = "大师场" ,
        roomType = RoomConfig.ROOMTYPE_CLASSIC_GRANDMASTER, gameType = RoomConfig.GAMEYTPE_CLASSIC
    },
}
--比赛场（房间名、比赛人数、报名费、房间类型）
RoomConfig.matchCfg = {
    {roomName = "10万豆疯抢赛",gameNum = 99, registeryFee = 5000, roomType = RoomConfig.ROOMTYPE_MATCH_FENGQIANG, gameType = RoomConfig.GAMEYTPE_MATCH},
    {roomName = "新手挑战赛", gameNum = 99,registeryFee = 15000,roomType = RoomConfig.ROOMTYPE_MATCH_ZHENDUO, gameType = RoomConfig.GAMEYTPE_MATCH},
    {roomName = "50万豆疯抢赛", gameNum = 99,registeryFee = 25000,roomType = RoomConfig.ROOMTYPE_MATCH_KUANGHUAN, gameType = RoomConfig.GAMEYTPE_MATCH},
    {roomName = "精英挑战赛", gameNum = 99,registeryFee = 10000,roomType = RoomConfig.ROOMTYPE_MATCH_NEWBIE, gameType = RoomConfig.GAMEYTPE_MATCH},
    {roomName = "100万豆疯抢赛", gameNum = 36,registeryFee = 50000,roomType = RoomConfig.ROOMTYPE_MATCH_ELITE, gameType = RoomConfig.GAMEYTPE_MATCH},
    {roomName = "大师挑战赛", gameNum = 36,registeryFee = 100000,roomType = RoomConfig.ROOMTYPE_MATCH_GRANDMASTER, gameType = RoomConfig.GAMEYTPE_MATCH},
}

--经典场规则
RoomConfig.Rule_classic = {
    {
        "游戏基数：150\n",
        "初始倍数：1\n",
        "对局费：250\n",
        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部金豆。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n（单局输赢不超过自己身上金豆数量）\n",
    },
    {
        "游戏基数：2500\n",
        "初始倍数：1\n",
        "对局费：4500\n",
        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部金豆。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n（单局输赢不超过自己身上金豆数量）\n",
    },
    {
        "游戏基数：6000\n",
        "初始倍数：1\n",
        "对局费：11000\n",
        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部金豆。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n（单局输赢不超过自己身上金豆数量）\n",
    },
    {
        "游戏基数：15000\n",
        "初始倍数：1\n",
        "对局费：30000\n",
        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部金豆。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n（单局输赢不超过自己身上金豆数量）\n",
    },
}

--比赛场规则
RoomConfig.Rule_match = {
    {
        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部积分。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n",
    },
    {

        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部积分。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n",
    },
    {
        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部积分。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n",
    },
    {
        "逃跑惩罚：在游戏中断线，托管，退赛，即按逃跑处理,胜利将不会获得\n奖励，失败则由逃跑者独自支付全部积分。\n",
        "入场将报名金豆1:1转化为积分，立场时进行等比例回兑，单局输赢\n",
    },
}


--奖励方案(经典场)
RoomConfig.Reward_classic = {
    --"1万金币*（1+10%*vip等级），红心+2",
    --"3万金币*（1+10%*vip等级），红心+4",
    --"5万金币*（1+10%*vip等级），红心+6",
    --"15万金币*（1+10%*vip等级），红心+10",
    --"20万金币*（1+10%*vip等级），红心+20",
    --"30万金币*（1+10%*vip等级），红心+30",
    --"70万金币*（1+10%*vip等级），红心+40",
    --"100万金币*（1+10%*vip等级），福卡+10，红心+50",
    --"150万金币*（1+10%*vip等级），福卡+20，红心+80",
    --"200万金币*（1+10%*vip等级），福卡+50，红心+100",
    "每玩一局可以 随机获得金豆、宝石、记牌器、超级加倍、钻石、福卡"
}

RoomConfig.Reward_match = {
    {
        {NO = "【第一名】", reward = "10万金豆"},
        {NO = "【第二名】", reward = "5万金豆"},
        {NO = "【第四~十名】", reward = "8000金豆"},
    },
    {
        {NO = "【第一名】", reward = "1000福卡"},
        {NO = "【第二名】", reward = "500福卡"},
        {NO = "【第三名】", reward = "200福卡"},
    },
    {
        {NO = "【第一名】", reward = "50万金豆"},
        {NO = "【第二名】", reward = "20万金豆"},
        {NO = "【第三名】", reward = "10万金豆"},
        {NO = "【第四~六名】", reward = "5万金豆"},
        {NO = "【第七~十名】", reward = "2万金豆"},
    },
    {
        {NO = "【第一名】", reward = "10000福卡"},
        {NO = "【第二名】", reward = "5000福卡"},
        {NO = "【第三名】", reward = "2000福卡"},
    },
    {
        {NO = "【第一名】", reward = "100万金豆"},
        {NO = "【第二名】", reward = "50万金豆"},
        {NO = "【第三名】", reward = "20万金豆"},
        {NO = "【第四~六名】", reward = "8万金豆"},
        {NO = "【第七~十名】", reward = "6万金豆"},
    },
    {
        {NO = "【第一名】", reward = "20000福卡"},
        {NO = "【第二名】", reward = "10000福卡"},
        {NO = "【第三名】", reward = "5000福卡"},
    },
}

function RoomConfig:GetRoomCfgByRoomType()
    local cfgArr = self.matchCfg
    local gameType = GameManager.Shared().currGameType
    local _roomType = GameManager.Shared().currRoomType
    if gameType == self.GAMEYTPE_CLASSIC then
        cfgArr = self.classicCfg
    end

    for i = 1, #cfgArr do
        if cfgArr[i].roomType == _roomType then
            return cfgArr[i],i
        end
    end
    return {}
end

return RoomConfig