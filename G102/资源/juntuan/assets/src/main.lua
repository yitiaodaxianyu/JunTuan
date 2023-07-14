local fileUtils = cc.FileUtils:getInstance()
FileManager:removeFile(fileUtils:getWritablePath() .. "src/ChannelVersion.lua")
fileUtils:setPopupNotify(false)
cc.FileUtils:getInstance():addSearchPath("res/")
cc.FileUtils:getInstance():addSearchPath("src/")
fileUtils:addSearchPath(fileUtils:getWritablePath() .. "game/", true)
fileUtils:addSearchPath(fileUtils:getWritablePath() .. "game/src/", true)
fileUtils:addSearchPath(fileUtils:getWritablePath() .. "game/res/", true)
require("src.header")

MsgSendMgr = require("JunTuan.src.network.MsgSendMgr").Shared()

local time_front = 0
local time_back = 0

-- 退到后台
function AppEnterBackground()
	print("AppEnterBackground")
    time_back = os.time()
end

-- 回到前台
function AppEnterForeground()
	print("AppEnterForeground")
    time_front = os.time()
    if time_front - time_back > 5 then
        time_front = 0
        time_back = 0
        MsgSendMgr:sendEnergyRecover()
    end
end

-- 主函数
local function main()
    if CC_SHOW_FPS then
        cc.Director:getInstance():setDisplayStats(true)
    end

    if UPLOAD_LOG then
        -- 上传报错信息
        startUploadErrLog()
    end

    math.randomseed(tostring(os.time()):reverse():sub(1, 7))

    -- avoid memory leak
    collectgarbage("collect")
    collectgarbage("setpause", 100)
    collectgarbage("setstepmul", 5000)

    -- running scene
    require("src.app.Game").new():run()
end

function __G__TRACKBACK__(msg)
    print("main:".."msg")
    print("----------------------------------------")
    print("LUA ERROR: " .. tostring(msg) .. "\n")
    print(debug.traceback())
    print("----------------------------------------")
    if type(msg) == "string" then
        writeError(msg .. "\n")
    end
    writeError(debug.traceback() .. "\n")
    if DEBUG > 0 then
        if type(msg) == "string" then
            alert(msg)
        else
            alert(debug.traceback() .. "\n")
        end
    end
end

local status, msg = xpcall(main, __G__TRACKBACK__)
if not status then
    print(msg)
end
