local _M = {}
local FileUtil = require("src.Util.FileUtil")

function WriteLogData(msg, fileName)
    local fileName = fileName or "print.log"
    local file = FileUtil.new()
    local filePath = DeviceUtil.ExternalDir() .. fileName
    --local filePath = cc.FileUtils:getInstance():getWritablePath() .. fileName
    file:SetFilePath(filePath)
    local date = os.date("*t")
    local str = string.format("[%d/%02d/%02d %02d:%02d:%02d]%s,", date.year, date.month, date.day, date.hour, date.min, date.sec, APP_VERSION)
    file:WriteData(str .. msg .. "\n")
end

-- 写入文件
function WriteLog(msg, fileName)
    if not WRITE_LOG then
        return
    end
    WriteLogData(msg, fileName)
end

function writeError(msg)
    if not ERROR_LOG then return end
    if UserData.Shared().dwUserID then
        cc.UserDefault:getInstance():setIntegerForKey("errloguserid", UserData.Shared().dwUserID)
    end
    WriteLogData(msg, "luaerr.log")
end

-- 打印
function LuaPrint(...)
    if DEBUG >= 1 then
        print(...)
    end
    if DEBUG >= 2 then
        local msg = ""
        for i = 1, select("#", ...) do
            local value = select(i, ...)
            local tp = type(value)
            if "string" ~= tp and "number" ~= tp then
                if "boolean" == tp then
                    if value then
                        value = "true"
                    else
                        value = "false"
                    end
                else
                    value = tp
                end
            end

            if 1 == i then
                msg = value or " "
            else
                msg = msg .. "--" .. (value or "nil")
            end
        end
        WriteLog(msg)
    end
end
-- 字符串分割
function SpliteStr(str, delimiter)
    if nil == str then
        return {}
    end
    if nil == str then
        return { str }
    end
    local result = {}
    for match in (str .. delimiter):gmatch("(.-)%" .. delimiter) do
        table.insert(result, match)
    end
    return result
end
-- 文件是否存在
function FileIsExist(path)
    if not path then
        return false
    end
    return cc.FileUtils:getInstance():isFileExist(path)
end
-- 子游戏是否存在
function GameIsExist(path)
    if not path then
        return false
    end
    local filePath = ""
    path = string.split(path, ".")
    for k, v in pairs(path) do
        if k == 1 then
            filePath = filePath .. v
        else
            filePath = filePath .. "/" .. v
        end
    end
    filePath = filePath .. ".lua"
    return FileIsExist(filePath)
end

---
-- @function: 打印table的内容，递归
-- @param: tbl 要打印的table
-- @param: level 递归的层数，默认不用传值进来
-- @param: filteDefault 是否过滤打印构造函数，默认为是
-- @return: return
function PrintTable(tbl, level, filteDefault)
    local msg = ""
    filteDefault = filteDefault or true --默认过滤关键字（DeleteMe, _class_type）
    level = level or 1
    local indent_str = ""
    for i = 1, level do
        indent_str = indent_str .. "  "
    end

    print(indent_str .. "{")

    for k, v in pairs(tbl) do
        if filteDefault then
            if k ~= "_class_type" and k ~= "DeleteMe" then
                local item_str = string.format("%s%s = %s", indent_str .. " ", tostring(k), tostring(v))
                print(item_str)
                if type(v) == "table" then
                    PrintTable(v, level + 1)
                end
            end
        else
            local item_str = string.format("%s%s = %s", indent_str .. " ", tostring(k), tostring(v))
            print(item_str)
            if type(v) == "table" then
                PrintTable(v, level + 1)
            end
        end
    end
    print(indent_str .. "}")
end

function startUploadErrLog()
    local filePath = DeviceUtil.ExternalDir() .. "luaerr.log"
    --local filePath = cc.FileUtils:getInstance():getWritablePath() .. "luaerr.log"
    if FileIsExist(filePath) then
        local userid = cc.UserDefault:getInstance():getIntegerForKey("errloguserid", 0)
        local function success()
            print("上传错误信息成功")
            FileManager.removeFile(filePath)
        end
        local function faild()
            print("上传错误信息失败")
        end
        local isPhone = 0
        if DeviceUtil.IsRealDevice() then isPhone = 1 end
        local pb = {
            userid = userid,
            QDChannel = QDChannel,
            APP_VERSION = APP_VERSION,
            imei = DeviceUtil.IMEI(),
            mobileModel = DeviceUtil.DeviceModel(),
            serialNum = DeviceUtil.SerialNum(),
            isPhone = isPhone,
        }
        HttpManager.Shared():sendUploadErrInfo(pb, filePath, success, faild)
    end
end

function encodeURI(s)
    s = string.gsub(s, "([^%w%.%- ])", function(c) return string.format("%%%02X", string.byte(c)) end)
    return string.gsub(s, " ", "+")
end

CommonUtil = _M