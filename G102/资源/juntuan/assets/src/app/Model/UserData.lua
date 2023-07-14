
local _M = {}
local shopCfg = require("JunTuan.src.configs.ShopCfg")

local obj = nil

-- 单例
function _M.Shared()
    if not obj then
        obj = setmetatable({}, { __index = _M })
        obj:initData()
    end
    return obj
end

function _M:initData()
    self.account = nil                      --用户账户
    self.password = nil                     --密码
    self.loginType = nil                    --登录服务器类型
    self.dwUserID = nil                     --用户ID
    self.szValidCode = nil                  --游戏服务器登录验证串
    self.szNickName = nil                   --昵称
    self.dwIconid = nil                     --头像ID
    self.szBindingMobile = nil              --绑定的手机号
    self.nVipLevel = nil                    --vip等级
    self.ControlFlag = nil                  --控制标志
    self.nUserFlag = nil                    --用户标志
    self.nWxbindflag = nil                  --是否绑定微信 0未绑定 1绑定
    self.Registerdate = nil                 --注册时间 毫秒
    self.issign = nil                       --是否显示签到(0 否 1 是)
    self.listDN = nil

    self.dwCombat = 0                       -- 总战力
    self.roleInfoList = {}                  -- 角色信息表
    self.roleValueList = {}                 -- 角色属性表
    self.sceneInfo = {}                     -- 用户场景信息
    self.curLevelInfo = {}                  -- 用户重连关卡信息
    self.equipInfoList = {}                 -- 用户装备信息表
    self.monsterBook = {};                  -- 图鉴
    self.signTaskInfo = {};                 -- 七日签到
    self.signDays = 0;                      -- 签到天数
    self.userBoxList = {};                  -- 宝箱相关
    self.energyInfo = nil                   -- 体力恢复数据
    self.mileStonePassed = nil              -- 里程碑已领奖的id
    self.mileStoneLock = {}

    self.energyExchangeleft = 0;
    self.heroDpsList = {}                   -- 角色伤害统计
    self.totalDps = {
        heroDps = 0,
        heroDpsTmp = 0,
        sceneDps = 0,
        sceneDpsTmp = 0,
    }
    self.gemCostCfg = {}                    -- 消耗钻石配置

    self.days_week = 0                      -- 周卡剩余天数
    self.days_month = 0                     -- 月卡剩余天数
    self.gameCfg = {}                       -- 游戏配置表
    self.rankActList = {}                   -- 排行榜活动信息
end

--登录大厅数据设置
function _M:saveLoginData(data)
    self.dwUserID = data.dwUserID
    self.szValidCode = data.szValidCode
    self.szNickName = SpecialFunc.ConverGBKToUTF8(data.szNickName)
    self.dwIconid = data.dwIconid
    self.szBindingMobile = data.szRegiterMobile
    self:set_lGoldBean(data.lGoldBean)
    self:set_lDiamond(data.lDiamond)
    self.nVipLevel = data.nVipLevel
    self.nUserLevel = data.nUserLevel
    self.ControlFlag = data.ControlFlag
    --self.nUserFlag = bit.band(data.nUserFlag,0x01)
    self.issign = data.nShowSign
end

--登录聊天服务器数据保存
function _M:saveChatLoginData(data)
    --self:set_lGoldBean(data.goldNum)
    --self:set_lDiamond(data.diamondNum)
    --self.nWxbindflag = data.wxbindflag
    --self.Registerdate = data.registerdate
end

--保存账号和密码
function _M:setUserAccountPassword(account, password)
    self.password = password
    self.account = account
end

function _M:setLoginType(type)
    self.loginType = type
end

function _M:setBindingMobile(phone)
    self.szBindingMobile = phone
end

function _M:setUserFlag(flag)
    self.nUserFlag = flag
end

function _M:setUserInfo(userInfo)
    printf("-----------初始化玩家数据-----------")
    self.dwUserID = userInfo.userId             -- 用户id
    --self.szNickName = userInfo.nick             -- 用户昵称

    self:set_lGoldBean(userInfo.coin)               -- 金币数
    self:set_lDiamond(userInfo.gemCoin)             -- 钻石数
    self:set_lCurEnergy(userInfo.energy)            -- 当前体力值
    self:set_lMaxEnergy(userInfo.maxEnergy)         -- 最大体力值
    self.lEnergyTime = userInfo.countDown           -- 体力恢复时间

    local cardsInfo = userInfo.cards                -- 月卡、周卡信息
    for _, v in ipairs(cardsInfo) do
        if v.cardId == 1 then
            -- 周卡信息
            self.days_week = v.days
            -- 过期时间
            self.timeStr_week = v.lastDayTime
        elseif v.cardId == 2 then
            -- 月卡信息
            self.days_month = v.days
            -- 过期时间
            self.timeStr_month = v.lastDayTime
        elseif v.cardId == 3 then
            -- 新手礼包信息
            if v.days and v.days > 0 then
                self.isBuyNewUserBag = true
            end
        end
    end
end

function _M:setRoleInfo(roleInfoList)
    printf("----------- 初始化角色面板数据 -----------")
    self.dwCombat = 0;
    for _, v in ipairs(roleInfoList) do
        local dataInfo = {}
        dataInfo.userId = v.userId
        dataInfo.roleId = v.roleId
        dataInfo.roleRank = v.roleRank
        dataInfo.roleLevel = v.roleLevel
        dataInfo.roleChip = v.roleChip
        dataInfo.skillParam1 = v.skillParam1 / 10000
        dataInfo.skillParam2 = v.skillParam2 / 10000
        dataInfo.isDispatch = v.isDispatch
        dataInfo.position = v.position
        dataInfo.combat = v.combat

        local canUpInfo = {};
        canUpInfo.upType = v.canUpInfo.upType;
        canUpInfo.coin = v.canUpInfo.coin;
        canUpInfo.gem = v.canUpInfo.gem;
        canUpInfo.chipNums = v.canUpInfo.chipNums;
        canUpInfo.upAtk = v.canUpInfo.upAtk;
        dataInfo.canUpInfo = canUpInfo;

        --if v.isDispatch == 1 then
            self.dwCombat = self.dwCombat + v.combat
            printf("出战角色：%d, 位置：%d, 军衔等级：%d, 战力：%d", v.roleId, v.position, v.roleRank, v.combat)
        --end
        self.roleInfoList[v.roleId] = dataInfo
    end
    printf("玩家总战力：%d", self.dwCombat)
    self:set_dwCombat(self.dwCombat)
end

function _M:setRoleAttr(roleAttrInfo)
    printf("----------- 初始化角色属性数据 -----------")
    if roleAttrInfo == nil then return end
    local localInfo = {}
    localInfo.roleId = roleAttrInfo.roleId
    localInfo.attOff = roleAttrInfo.atk     -- 基础攻击力(排除装备加成)
    localInfo.attack = roleAttrInfo.attack
    localInfo.interval = roleAttrInfo.interval / 10000
    localInfo.critRate = roleAttrInfo.critRate / 10000
    localInfo.critMultiples = roleAttrInfo.critMultiples / 10000
    localInfo.attackPer = roleAttrInfo.attackPer / 10000
    localInfo.attackSpeedPer = roleAttrInfo.attackSpeedPer / 10000
    localInfo.personal1 = roleAttrInfo.personal1 / 10000
    localInfo.personal2 = roleAttrInfo.personal2 / 10000
    localInfo.skillParam1 = roleAttrInfo.skillParam1 / 10000
    localInfo.skillParam2 = roleAttrInfo.skillParam2 / 10000
    localInfo.powerBulletNum = roleAttrInfo.powerBulletNum
    localInfo.combat = roleAttrInfo.combat
    local canUpInfo = {}
    canUpInfo.upType = roleAttrInfo.canUpInfo.upType
    canUpInfo.coin = roleAttrInfo.canUpInfo.coin
    canUpInfo.gem = roleAttrInfo.canUpInfo.gem
    canUpInfo.chipNums = roleAttrInfo.canUpInfo.chipNums
    canUpInfo.upAtk = roleAttrInfo.canUpInfo.upAtk
    localInfo.canUpInfo = canUpInfo
    self.roleValueList[localInfo.roleId] = localInfo
end

--更新角色升级进阶的数据
function _M:updateRoleCanUpInfo(canUpInfo)
    local newCanUpInfo = {
        upType = canUpInfo.upType,
        coin = canUpInfo.coin,
        gem = canUpInfo.gem,
        chipNums = canUpInfo.chipNums,
        upAtk = canUpInfo.upAtk,
    }
    self.roleInfoList[canUpInfo.roleId].canUpInfo = newCanUpInfo
end

-- 更新角色面板数据
function _M:updateRoleData(roleData)
    local dataInfo = {}
    dataInfo.userId = roleData.userId
    dataInfo.roleId = roleData.roleId
    dataInfo.roleRank = roleData.roleRank
    dataInfo.roleLevel = roleData.roleLevel
    dataInfo.roleChip = roleData.roleChip
    dataInfo.isDispatch = roleData.isDispatch
    dataInfo.position = roleData.position
    dataInfo.skillParam1 = roleData.skillParam1 / 10000
    dataInfo.skillParam2 = roleData.skillParam2 / 10000
    dataInfo.combat = roleData.combat

    local canUpInfo = {}
    canUpInfo.upType = roleData.canUpInfo.upType
    canUpInfo.coin = roleData.canUpInfo.coin
    canUpInfo.gem = roleData.canUpInfo.gem
    canUpInfo.upAtk = roleData.canUpInfo.upAtk
    canUpInfo.chipNums = roleData.canUpInfo.chipNums
    dataInfo.canUpInfo = canUpInfo
    self.roleInfoList[roleData.roleId] = dataInfo
end

-- 更新角色碎片数量
function _M:updateRoleChip(roleId, chipNums)
    self.roleInfoList[roleId].roleChip = self.roleInfoList[roleId].roleChip + chipNums
    printf("---------- 更新角色碎片数量 ----------")
    printf("roleId is %d, chipNums is %d, all is %d", roleId, chipNums, self.roleInfoList[roleId].roleChip)
    printf("---------- 更新角色碎片数量 ----------")
end

function _M:setSceneInfo(sceneInfo)
    printf("----------- 初始化关卡进度数据 -----------")
    self.sceneInfo.userId = sceneInfo.userId
    self.sceneInfo.sceneId = sceneInfo.sceneId          -- 当前章节
    self.sceneInfo.gameLevel = sceneInfo.gameLevel      -- 最高过到了第几关
    self.sceneInfo.isPassed = sceneInfo.isPassed        -- 是否过关  1:已过关
    if sceneInfo.isPassed == 1 then
        if self.sceneInfo.sceneId < GameTool:getSceneNum() then
            self.sceneInfo.sceneId = sceneInfo.sceneId + 1
        end
    end
end

function _M:setEquipInfo(equipInfoList)
    printf("----------- 初始化装备数据 -----------"..#equipInfoList);
    for _, v in ipairs(equipInfoList) do
        if v.roleId ~= 0 then
            local dataInfo = {}
            dataInfo.roleId = v.roleId
            dataInfo.userEquipId = v.userEquipId
            dataInfo.equipId = v.equipId
            dataInfo.equipType = v.equipType
            dataInfo.equipRank = v.equipRank
            dataInfo.mainType = v.mainType
            dataInfo.mainValue = v.mainValue
            dataInfo.subType = v.subType
            dataInfo.subValue = v.subValue / 10000
            dataInfo.exType1 = v.exType1
            dataInfo.exValue1 = v.exValue1 / 10000
            dataInfo.exType2 = v.exType2
            dataInfo.exValue2 = v.exValue2 / 10000
            dataInfo.exType3 = v.exType3
            dataInfo.exValue3 = v.exValue3 / 10000
            dataInfo.isUsed = v.isUsed
            if not self.equipInfoList[v.roleId] then
                self.equipInfoList[v.roleId] = {}
            end
            self.equipInfoList[v.roleId][v.userEquipId] = dataInfo
        end
    end
end

function _M:setCurLevelData(data)
    self.curLevelInfo = data
end

-- 设置消耗钻石配置
function _M:setGemCostCfg(data)
    for i, v in ipairs(data) do
        self.gemCostCfg[i] = {
            type = v.type,
            costGem = v.costGem,
        }
    end
end

-- 获取消耗钻石
function _M:getGemCost(type)
    local gameCost = self.gameCfg[Define.ENUM_CFG_KEY.GEM_COST]
    for _, v in pairs(gameCost) do
        if v.Type == type then
            return v.Gem
        end
    end
    return 50
end

--更新玩家装备数据
function _M:updateEquipInfo(equipInfo)
    if equipInfo == nil then return end
    if equipInfo.roleId == 0 then return end

    local dataInfo = {}
    dataInfo.roleId = equipInfo.roleId;
    dataInfo.userEquipId = equipInfo.userEquipId;
    dataInfo.equipId = equipInfo.equipId;
    dataInfo.equipType = equipInfo.equipType;
    dataInfo.equipRank = equipInfo.equipRank;
    dataInfo.mainType = equipInfo.mainType;
    dataInfo.mainValue = equipInfo.mainValue;
    dataInfo.subType = equipInfo.subType;
    dataInfo.subValue = equipInfo.subValue / 10000;
    dataInfo.exType1 = equipInfo.exType1;
    dataInfo.exValue1 = equipInfo.exValue1 / 10000;
    dataInfo.exType2 = equipInfo.exType2;
    dataInfo.exValue2 = equipInfo.exValue2 / 10000;
    dataInfo.exType3 = equipInfo.exType3;
    dataInfo.exValue3 = equipInfo.exValue3 / 10000;
    dataInfo.isUsed = equipInfo.isUsed;
    if not self.equipInfoList[equipInfo.roleId] then
        self.equipInfoList[equipInfo.roleId] = {}
    end
    self.equipInfoList[equipInfo.roleId][equipInfo.userEquipId] = dataInfo
    printf("---------- 更新玩家装备信息 ----------")
    printf("roleId is %d, userEquipId is %d", dataInfo.roleId, dataInfo.userEquipId)
    printf("---------- 更新玩家装备信息 ----------")
    return dataInfo
end

--更新玩家货币
function _M:updateUserCurrency(currencyData)
    if currencyData.coin ~= nil then
        local cur = self:get_lGoldBean()
        cur = cur + currencyData.coin              -- 金币
        self:set_lGoldBean(cur)
    end
    if currencyData.gemCoin ~= nil then
        local cur = self:get_lDiamond()
        cur = cur + currencyData.gemCoin            -- 钻石数
        self:set_lDiamond(cur)
    end
    if currencyData.energy ~= nil then
        local cur = self:get_lCurEnergy()
        cur = cur + currencyData.energy           -- 当前体力值
        self:set_lCurEnergy(cur)
    end
end

--设置图鉴数据
function _M:initMonsterBook(monsterBook)
    if monsterBook == nil then return end

    if self.monsterBook == nil then
        self.monsterBook = {};
    end

    for _,v in ipairs(monsterBook) do
        local monsterInfo = {};
        monsterInfo.monsterId = v.monsterId;
        monsterInfo.taskNums = v.taskNums;
        monsterInfo.killedNums = v.killedNums;
        monsterInfo.killedReward = v.killedReward;
        monsterInfo.rewardId = v.seqNo;
        monsterInfo.isReward = v.isReward;
        monsterInfo.isFinished = v.isOver;
        self.monsterBook[monsterInfo.monsterId] = monsterInfo;
    end
end

--更新图鉴数据
function _M:updateMonsterBook(monsterInfo)
    if monsterInfo == nil then return end

    if self.monsterBook == nil then
        self.monsterBook = {};
    end

    for _,v in pairs(self.monsterBook) do
        if monsterInfo.monsterId and monsterInfo.monsterId == v.monsterId then
            v.monsterId = monsterInfo.monsterId;
            v.taskNums = monsterInfo.taskNums;
            v.killedNums = monsterInfo.killedNums;
            v.killedReward = monsterInfo.killedReward;
            v.rewardId = monsterInfo.seqNo;
            v.isReward = monsterInfo.isReward;
            v.isFinished = monsterInfo.isOver;
            return;
        end
    end
end

--获取图鉴数据
function _M:getMonsterBooks()
    if self.monsterBook == nil or #self.monsterBook <= 0 then
        return nil;
    end
    return self.monsterBook;
end

-- 设置里程碑未领奖数量
function _M:setMileUnGetNum(num)
    self.mileUnGetNum = num
end

function _M:getMileUnGetNum()
    return self.mileUnGetNum or 0
end

--更新里程碑进度
function _M:updateMileStone(mileList)
    if mileList == nil then return end
    if self.mileStonePassed == nil then
        self.mileStonePassed = {};
    end
    for i, v in ipairs(mileList) do
        self.mileStonePassed[v.mileId] = {
            mileId = v.mileId,
            hasGet = v.hasGet,
        }
        if not self.minMileId then
            self.minMileId = v.mileId
        else
            if v.mileId < self.minMileId then
                self.minMileId = v.mileId
            end
        end
    end
    printf("里程碑分页最小id:%d", self.minMileId or -1)
end

--获取里程碑数据
function _M:getMileStone()
    if self.mileStonePassed == nil then
        return nil;
    end
    return self.mileStonePassed
end

function _M:pushMileStone(mileId)
    if mileId == nil then return end
    if self.mileStonePassed[mileId] then
        self.mileStonePassed[mileId].hasGet = 1
    end
    --if self.mileUnGetNum > 0 then
    --    self.mileUnGetNum = self.mileUnGetNum - 1
    --end
end

--更新签到数据
function _M:initSignTask(signTask,days)
    if signTask == nil then return end

    if self.signTaskInfo == nil then
        self.signTaskInfo = {};
    end

    self.signDays = days;
    for _,v in ipairs(signTask) do
        local localInfo = {};
        localInfo.id = v.id;
        localInfo.days = v.days;
        localInfo.rewardType = v.rewardType;
        localInfo.rewardId = v.rewardId;
        localInfo.rewardNums = v.rewardNums;
        localInfo.isSign = v.isSign;
        localInfo.dateFlag = v.dateFlag;
        self.signTaskInfo[localInfo.days] = localInfo;
    end
    PrintTable(self.signTaskInfo);
end

--获取7日签到相关数据
function _M:getSignTask()
    if self.signTaskInfo == nil or #self.signTaskInfo <= 0 then
        print("getSignTask"..#self.signTaskInfo);
        return nil;
    end
    return self.signTaskInfo,self.signDays;
end

--设置宝箱列表
function _M:initBoxList(boxList)
    if boxList == nil then return end

    if self.userBoxList == nil then
        self.userBoxList = {};
    end

    for _,v in ipairs(boxList) do
        local localInfo = {}
        localInfo.boxId = v.boxId;
        localInfo.freeCD = v.freeCD;
        localInfo.costGem = v.costGem;
        localInfo.countDown = v.countDown;
        self.userBoxList[localInfo.boxId] = localInfo;
    end
end

function _M:updateBoxList(boxInfo)
    if boxInfo == nil then return end

    for _,v in ipairs(self.userBoxList) do
        if v.boxId == boxInfo.boxId then
            v.freeCD = boxInfo.freeCD;
            v.countDown = boxInfo.countDown;
            v.costGem = boxInfo.costGem;
            return;
        end
    end
end

--获取宝箱列表
function _M:getBoxList()
    if self.userBoxList ~= nil and #self.userBoxList <= 0 then
        return nil;
    end
    return self.userBoxList;
end

--每次登录刷新体力购买次数
function _M:refreshUserDefaultDaily()
    local nowTimeStamp = os.time();
    local dateStr = GameTool:getDateStringFormat(nowTimeStamp);
    local exLeftTime = cc.UserDefault:getInstance():getIntegerForKey("energyLeft");
    local lastExTime = cc.UserDefault:getInstance():getStringForKey("lastLogTime");
    if dateStr ~= lastExTime or exLeftTime == nil or lastExTime == nil then
        exLeftTime = shopCfg.EnergyExTimesMax;
        cc.UserDefault:getInstance():setIntegerForKey("energyLeft",exLeftTime);
        cc.UserDefault:getInstance():setStringForKey("lastLogTime",dateStr);
    end
    self.energyExchangeleft = exLeftTime;
end

function _M:getEnergyExLeft()
    return self.energyExchangeleft;
end

function _M:setEnergyExLeft(times)
    if times == nil or times <= -1 then return end

    self.energyExchangeleft = times;
    cc.UserDefault:getInstance():setIntegerForKey("energyLeft",self.energyExchangeleft);
end

-- 设置装备穿戴
function _M:setEquipWearInfo(roleId, userEquipId, flag)
    if self.equipInfoList[roleId] and self.equipInfoList[roleId][userEquipId] then
        self.equipInfoList[roleId][userEquipId].isUsed = flag
    end
end

function _M:set_lGoldBean(lGoldBean)
    self.lGoldBean = GameTool:dataEncrypt(lGoldBean)
end

function _M:get_lGoldBean()
    return GameTool:dataDecrypt(self.lGoldBean)
end

function _M:set_lDiamond(lDiamond)
    self.lDiamond = GameTool:dataEncrypt(lDiamond)
end

function _M:get_lDiamond()
    return GameTool:dataDecrypt(self.lDiamond)
end

function _M:set_lCurEnergy(lCurEnergy)
    self.lCurEnergy = GameTool:dataEncrypt(lCurEnergy)
end

function _M:get_lCurEnergy()
    return GameTool:dataDecrypt(self.lCurEnergy)
end

function _M:set_lMaxEnergy(lMaxEnergy)
    self.lMaxEnergy = GameTool:dataEncrypt(lMaxEnergy)
end

function _M:get_lMaxEnergy()
    return GameTool:dataDecrypt(self.lMaxEnergy)
end

function _M:set_dwCombat(dwCombat)
    self.dwCombat = GameTool:dataEncrypt(dwCombat)
end

function _M:get_dwCombat()
    return GameTool:dataDecrypt(self.dwCombat)
end

-- 是否解锁了任务
function _M:isUnlockTask()
    local sceneId = self.sceneInfo.sceneId
    return sceneId > Define.TaskUnlock
end

-- 是否解锁了宝箱
function _M:isUnlockBox(boxId)
    local sceneId = self.sceneInfo.sceneId
    local flag = Define.BoxUnlock[boxId]
    return sceneId > flag
end

-- 是否是周卡用户
function _M:isWeekCardUser()
    if self.days_week > 0 then
        return true
    end
    if self.timeStr_week and self.timeStr_week > 0 then
        return true
    end
    return false
end

-- 是否是月卡用户
function _M:isMonthCardUser()
    if self.days_month > 0 then
        return true
    end
    if self.timeStr_month and self.timeStr_month > 0 then
        return true
    end
    return false
end

-- 是否是周卡、月卡用户
function _M:isCardUser()
    if self:isWeekCardUser() or self:isMonthCardUser() then
        return true
    end
    return false
end

function _M:onExit()
    obj = nil
end

UserData = _M