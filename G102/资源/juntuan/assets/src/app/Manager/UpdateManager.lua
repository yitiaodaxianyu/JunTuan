local _M = {}
local obj = nil
local GameDB = require("src.app.DB.GameDB")
local FileUtils = require("src.Util.FileUtil")
local DownloaderUtil = require("src.Util.DownLoadUtil")
local httpUrl = "http://dzz.junqihuyu.com/home/appversioncheck.aspx"
local checkVersionUrl = "http://192.168.0.35:8081/appversioncheck.aspx"
local checkVersionUrl2 = "http://192.168.0.35:8081/appversioncheck.aspx"
local isMustBig = true      -- 是否必须更新大版本

-- 单例
function _M.Shared()
    if not obj then
        obj = setmetatable({}, { __index = _M })
        obj:Init()
    end
    return obj
end

function _M:Init()
    self.tasks = {} -- 更新队列
    self.updateUrl = {}  -- 下载地址
    self.updatingCall = nil -- 更新进度回调
    self.downloadOverCall = nil -- 下载更新包成功回调
    self.loginTask = nil
    self.gamelist = nil
    self.status = NONE_MODE
    self.notShowWaittingFrame = false
    self.reCount = 0 -- 重新更新的次数
    self.checkOnce = false

    self.currentGame = 0 --当前正在下载的游戏
    self.modulelist = nil
    self.updateProgress = nil
    self.urlCount = 1
end

function _M:reset()
    self.updateUrl = {}  -- 下载地址
    self.updatingCall = nil -- 更新进度回调
    self.downloadOverCall = nil -- 下载更新包成功回调
    self.loginTask = nil
    self.gamelist = nil
    self.status = NONE_MODE
    self.notShowWaittingFrame = false
    self.reCount = 0 -- 重新更新的次数
    self.updateProgress = nil
end

-- 用户可选择是否升级大包，若不升级则记录该大包版本
-- 下次推送不再提示，除非版本不一致
function _M:setOptionalVersion(ver)
    GameDB.SetValueForKey("optionalVer",ver)
end

function _M:getOptionalVersion()
    return GameDB.GetStringForKey("optionalVer", "")
end

-- 大版本更新
function _M:bigVersionUpdate(data)
    local lastOptionalVer = self:getOptionalVersion()
    if tonumber(lastOptionalVer) == data.version then
        -- 用户选择不更新大版本
        return false
    end
    local newVersion = data.version
    if newVersion then
        -- 当前版本小于大版本
        local urlStr = data.apkurl
        local targetPlatform = cc.Application:getInstance():getTargetPlatform()
        if (cc.PLATFORM_OS_IPHONE == targetPlatform) or (cc.PLATFORM_OS_IPAD == targetPlatform) then
            urlStr = data.iosurl
        elseif (cc.PLATFORM_OS_ANDROID == targetPlatform) then
            urlStr = data.apkurl
        end
        if isMustBig then
            -- 打开下载网址链接
            alert("有新版本需要更新, 是否下载?",function()
                -- 打开下载网址链接进行下载
                ThirdUtil.OpenUrl(urlStr)
            end, "", true)
            return true
        else
            local isOk = false
            local function sureCall()
                -- 打开下载网址链接进行下载
                ThirdUtil.OpenUrl(urlStr)
                isOk = true
            end
            local function cancelCall()
                isOk = false
                self:setOptionalVersion(data.version)
            end
            confirm("有新版本需要更新, 是否下载?", sureCall, cancelCall)
            return isOk
        end
    end
    return false
end

-- 小版本更新
function _M:smallVersionUpdate(data)
    local vData = data[1]
    if vData then
        local newVersion = vData.version
        if newVersion then
            self.updateUrl.filepath = vData.filepath
            self.updateUrl.filepath2 = vData.filepath2
            self.updateUrl.index = 1
            self:upDateResource()
            return true
        end
    end
    return false
end

-- 游戏大厅更新逻辑入口
function _M:updateGame(updateOverCall, updateFailCall, updateProgress)
    if self.status == SUBGAMEDOWNLOADING and updateOverCall then updateOverCall() return end
    if self.checkOnce and updateOverCall then updateOverCall() return end
    local _, platform =DeviceUtil.Platform()
    local pb = {
        apptype = 0,
        gameid = "1",
        platform = platform,
    }
    local function httpSuccess(data)
        local struct_PB = HttpInterfacePB_pb.PBAppVersionResp()
        struct_PB:ParseFromString(data)
        local jsData = JsonUtil.decode(struct_PB.result)
        PrintTable(jsData)
        local bigVersion = jsData.bigVerion or {}
        local versionList = jsData.versionList or {}
        local versionInfos = ExternalTools:tableConnect(bigVersion, versionList)
        local ip = jsData.ip
        local loginserver = jsData.loginserver
        local loginport = jsData.loginport
        --if not NET_FLAG_IS_LOCAL then
        --    LoginManager.Shared():ServerList({ { ip = loginserver, port = loginport } })
        --end

        self.modulelist = jsData.modulelist
        self.checkOnce = true

        if ip then
            GameDB.SetValueForKey("Game_save_ip",ip)
        end
        self.gamelist = jsData.gamelist

        local function call()
            if jsData.gamelist and #jsData.gamelist > 0 then
                self:checkSubGameList(jsData.gamelist)
            else
                if updateOverCall then updateOverCall() end
            end
        end
        if not enableHotUpdate then
            if updateOverCall then
                updateOverCall()
            end
            return
        end

        if type(versionInfos) ~= "table" or not enableHotUpdate then call() return end
        table.sort(versionInfos, function(a) return a.isbigversion == 1 end)

        local isBigUpdateOk = false         -- 是否大版本更新成功
        local isSmallUpdateOk = false       -- 是否小版本更新成功
        if bigVersion then
            isBigUpdateOk = self:bigVersionUpdate(bigVersion)
        end
        if not isBigUpdateOk then
            -- 大版本没有更新成功（用户选择不更新大版本或者没有大版本更新）
            if versionList and #versionList > 0 then
                -- 如果有小版本更新则更新小版本
                isSmallUpdateOk = self:smallVersionUpdate(versionList)
            end
        end
        if not isBigUpdateOk and not isSmallUpdateOk then
            -- 都没有更新成功
            call()
        end

        --if self.updateInfoDeal then
        --    self:updateInfoDeal(versionInfos, call)
        --end
    end

    --版本请求失败
    local function httpFailed(errorCode)
        if updateFailCall then updateFailCall() end
    end

    self:reset()
    self.upDateProgressPercent = updateProgress
    HttpManager.Shared():sendVersionCheck(pb, httpSuccess, httpFailed) -- 请求版本号进行对比
end

function _M:checkSubGameList(data)
    self.loginTask = self.loginTask or {}
    for _,v in ipairs(data) do
        table.insert(self.loginTask, v)
    end
    if self.loginTask then
        self.updateUrl.filepath = self.loginTask[#self.loginTask].url
        self.updateUrl.filepath2 = self.loginTask[#self.loginTask].url2
        self.updateUrl.index = 1
        self:upDateResource()
        table.remove(self.loginTask, #self.loginTask)
        if #self.loginTask == 0 then self.gamelist = nil end
    end
end

function _M:getSubGameVer()
    local subgame,subver
    for i,cfg in pairs(GameConfig) do
        -- 已下载过的游戏才添加到检测队列
        if cfg.isShow and not cfg.versionKey and self:checkGameExist(i) then
            if subgame then
                subgame = subgame..","..i
            else
                subgame = i
            end
            if subver then
                subver = subver..","..require(cfg.versionConfig)
            else
                subver = require(cfg.versionConfig)
            end
        end
    end
    return subgame,subver
end

--更新信息处理
function _M:updateInfoDeal(infoList, updateOver, index)
    index = index or 1
    local info = infoList or infoList[index]
    if info and APP_VERSION ~= info.version then
        local lastOptionalVer = self:getOptionalVersion()
        local function startUpdating()
            if 1 == info.isbigversion then
                local urlStr = info.filepath
                local targetPlatform = cc.Application:getInstance():getTargetPlatform()
                if (cc.PLATFORM_OS_IPHONE == targetPlatform) or (cc.PLATFORM_OS_IPAD == targetPlatform) then
                    urlStr = info.iosurl
                elseif (cc.PLATFORM_OS_ANDROID == targetPlatform) then
                    urlStr = info.apkurl
                end
                -- 打开下载网址链接
                alert("有新版本需要更新是否下载",function()
                    -- 打开下载网址链接进行下载
                    ThirdManager.openUrl(urlStr)
                end, "", true)
            else
                self:upDateResource()
            end
        end
        self.updateUrl.filepath = info.filepath
        self.updateUrl.filepath2 = info.filepath2
        self.updateUrl.index = 1

        if 1 == info.isbigversion then
            if SpreaderID == "AppStore" then
                if updateOver then updateOver() return end
            end
            if lastOptionalVer == info.ver then
                self:updateInfoDeal(infoList, updateOver, (index + 1))
                return
            end
            local confirmFunc = function()
                self:setOptionalVersion("") -- 重置可选版本
                if startUpdating then startUpdating() end
            end
            local cancelFunc = nil
            if info.optional == 1 then
                cancelFunc = function()
                    self:setOptionalVersion(info.ver)
                    self:updateInfoDeal(infoList, updateOver, (index + 1))
                end
            end
            if not info.remark or info.remark == "" then
                info.remark = "整包更新至版本V"..info.ver
            end
            local para = {
                Title = "版本更新公告",
                Content = info.remark,
                btnName = "确#定",
                cannotClose = true,
                notDestroy = true,
                callFunc = confirmFunc,
                cancelFunc = cancelFunc,
            }
            --LayerManager.layers[LayerManager.layersDef.NoticeListLayer].zorder = 20000
            --LayerManager:getInstace():openLayer(LayerManager.layersDef.NoticeListLayer, para)
        else
            startUpdating()
        end
        return
    end
    if updateOver then updateOver() end
end

function _M:upDateResource()
    if not self.updateUrl or (not self.updateUrl.filepath and not self.updateUrl.filepath2) then
        return
    end
    if self.notShowWaittingFrame then
        self.status = SUBGAMEDOWNLOADING
    else
        self.status = HTTPREQUESTING
    end

    local url = self.updateUrl.filepath
    if self.updateUrl.index == 1 then
        self.updateUrl.index = 2
    elseif self.updateUrl.filepath2 and self.updateUrl.filepath2 ~= "" then
        self.updateUrl.index = 1
        url = self.updateUrl.filepath2
    end

    local function downLoadSuccess(data)
        if self.upDateResourceOver then self:upDateResourceOver(data) end
    end
    local function downLoadProgress(...)
        if self.upDateProgressPercent then self.upDateProgressPercent(...) end
    end
    --更新下载失败
    local function downLoadError(errorCode)
        if self.upDateResourceError then self:upDateResourceError() end
    end

    self.manager = self.manager or DownloaderUtil.new()
    self.manager:SetCall(downLoadSuccess, downLoadError, downLoadProgress)
    local zipDir = cc.FileUtils:getInstance():getWritablePath() .. "game/"
    cc.FileUtils:getInstance():createDirectory(zipDir)
    local pathToSave = cc.FileUtils:getInstance():getWritablePath() .. "game/resource.zip"
    self.manager:LoadFile(url,pathToSave,"")
end

-- zip下载完成
function _M:upDateResourceOver(data)
    printf("zip下载完成, 开始解压")
    local zipDir = cc.FileUtils:getInstance():getWritablePath() .. "game/"
    local filePath = zipDir .. "resource.zip"
    ZipManager:uncompress(filePath, zipDir, function(code)
        print("uncompress", code)
        if 1 == code then
            cc.FileUtils:getInstance():removeFile(filePath)
            local director = cc.Director:getInstance()
            local scene = director:getRunningScene()
            if scene then scene:stopAllActions() end
            director:getTextureCache():removeAllTextures()
            cc.SpriteFrameCache:getInstance():removeSpriteFrames()
            director:purgeCachedData()
            ReloadLua()
        end
    end)
end

function _M:upDateResourceError(noTip)
    print("-----------------upDateResourceError")
    self.reCount = self.reCount + 1
    if self.reCount >= 5 or noTip then
        self.reCount = 0
        if self.loginTask and #self.loginTask > 0 then
            self.updateUrl.filepath = self.loginTask[#self.loginTask].url
            self.updateUrl.filepath2 = self.loginTask[#self.loginTask].url2
            self.updateUrl.index = 1
            self:upDateResource()
            table.remove(self.loginTask, #self.loginTask)
            if #self.loginTask == 0 then self.gamelist = nil end
        elseif self.downloadOverCall then
            self.downloadOverCall()
            if #self.tasks > 0 then
                self:updateInnerGame(self.tasks[1])
                table.remove(self.tasks, 1)
            else
                self.status = NONE_MODE
                showScaleTip("游戏下载完毕")
            end
        else
            self.status = NONE_MODE
            self.checkOnce = false

            local tipStr = ""
            if GameDataUser.shared().vipLevel >= 5 then
                tipStr = "更新失败，请稍候尝试或联系花花帮你解决哟，联系翠花（QQ:2210662071）"
            else
                tipStr = "更新失败，请稍候尝试或联系花花帮你解决哟"
            end
            alert(tipStr, handler(self, self.upDateResourceOver))
        end
    else
        self:upDateResource()
    end
end

function _M:addInnerGameTask(data)
    if self.status == NONE_MODE then
        self:updateInnerGame(data)
    elseif self.status == SUBGAMEDOWNLOADING then
        if self.currentGame == data.id or self.currentGame == data.versionKey or data.ver ~= "0" then
            return false
        end
        for _,v in pairs(self.tasks) do
            if v.id == data.id then
                return false
            end
            if v.versionKey or data.versionKey then
                if v.versionKey == data.id or v.id == data.versionKey then
                    return false
                end
                if v.versionKey == data.versionKey then
                    return false
                end
            end
        end
        table.insert(self.tasks, data)
        return "waiting"
    end
    return true
end

-- 只下载小游戏 不更新
function _M:updateInnerGame(para)
    local tipStr = ""
    if UserData.Shared().nVipLevel >= 5 then
        tipStr = "游戏更新参数错误，请联系花花解决（QQ:2210662071）"
    else
        tipStr = "游戏更新参数错误，请联系花花解决"
    end
    if not para.ver or not para.id then showScaleTip(tipStr) return end
    local appVersion = para.ver
    local curGame = para.id
    if para.versionKey then curGame = para.versionKey end

    if appVersion ~= "0" then -- 下载过的游戏不再次检测更新
        if #self.tasks > 0 then
            self:upDateResourceOver()
        else
            if para.updateOverCall then para.updateOverCall() end
        end
        return
    end

    if cc.Application:getInstance():getTargetPlatform() == cc.PLATFORM_OS_WINDOWS then
        para.updateOverCall()
        if 1 then return nil end
    end
    local checkUrl = checkVersionUrl
    if self.urlCount == 1 then
        checkUrl = checkVersionUrl
    else
        checkUrl = checkVersionUrl2
    end

    local httpUrl --= string.format("%s?ver=%s&qd=%s&imei=%s&gameid=%d",
    --        checkUrl, appVersion, HotfixChannel, DeviceManager.IMEI(), curGame)
    --print("http url:",httpUrl)
    local function httpSuccess(data)
        local versionInfos = data.list -- 测试
        if appVersion == "0" and not versionInfos then -- 未开放下载
            if self.upDateResourceError then self:upDateResourceError(true) end
            if para.updateFailCall then para.updateFailCall("unopen") end
            return
        end

        if versionInfos and appVersion ~= versionInfos[1].lastestver then
            self.updateUrl.filepath = versionInfos[1].filepath
            self.updateUrl.filepath2 = versionInfos[1].filepath2
            self.updateUrl.index = 1
            --ResLoaderManager:getInstace():deinitLoadingAnims()
            if self.updatingCall then
                self.notShowWaittingFrame = true
            end
            self:upDateResource()
        else
            if #self.tasks > 0 then
                self:upDateResourceOver()
            else
                if para.updateOverCall then para.updateOverCall() end
            end
        end
    end

    local function httpFailed(errorCode)
        if self.urlCount == 1 then
            self.urlCount = 2
        else
            self.urlCount = 1
        end
        local para = {}
        para.typeid = 9
        para.content = string.format("子游戏首次下载请求失败 errorCode = %s, url = %s", errorCode, httpUrl)
        HttpManager.reportLog(para)
        if self.upDateResourceError then self:upDateResourceError() end
        if para.updateFailCall then para.updateFailCall() end
    end

    self:reset()
    self.updatingCall = para.updatingCall
    self.downloadOverCall = para.downloadOverCall
    self.currentGame = curGame
    HttpManager:GameVersionReq(httpUrl, httpSuccess, httpFailed) -- 请求版本号进行对比
end

-- 通过沙盒路径下配置文件是否存在来判断游戏存在
function _M:checkGameExist(gameIndex)
    local path = GameConfig[gameIndex].versionConfig
    return FileUtils:checkGameFileExist(path)
end


UpdateManager = _M