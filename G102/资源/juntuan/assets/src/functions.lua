-- 打乱table
function table.Shuffle(table_)
    local n, order, res = #table_, {}, {}
    math.randomseed(os.time())
    for i=1,n do order[i] = { rnd = math.random(), idx = i } end
    table.sort(order, function(a,b) return a.rnd < b.rnd end)
    for i=1,n do res[i] = table_[order[i].idx] end
    return res
end

-- 移除table中多个元素
function table.removeItems(tabel_, items)
    for _, rv in pairs(items) do
        local remove = 0
        for k, v in pairs(tabel_) do
            if v == rv then
                remove = k
				break
            end
        end
		
        if remove > 0 then table.remove(tabel_,remove) end
    end
end

-- 添加table中多个元素
function table.insertItems(tabel_, items)
    for _, rv in pairs(items) do
        table.insert(tabel_,rv)
    end
end

--浅拷贝
function shallowcopy(orig)
    local orig_type = type(orig)
    local copy
    if orig_type == 'table' then
        copy = {}
        for orig_key, orig_value in pairs(orig) do
            copy[orig_key] = orig_value
        end
    else -- number, string, boolean, etc
        copy = orig
    end
    return copy
end

--深拷贝
function deepCopy(obj)
    local InTable = {};  
    local function Func(obj)  
        if type(obj) ~= "table" then   --判断表中是否有表  
            return obj;  
        end  
        local NewTable = {};  --定义一个新表  
        InTable[obj] = NewTable;  --若表中有表，则先把表给InTable，再用NewTable去接收内嵌的表  
        for k,v in pairs(obj) do  --把旧表的key和Value赋给新表  
            NewTable[Func(k)] = Func(v);  
        end  
        return setmetatable(NewTable, getmetatable(obj))--赋值元表  
    end  
    return Func(obj) --若表中有表，则把内嵌的表也复制了  
end 

--检查输入是否是数字 
function checkStringIsNum(user)
    local len = string.len(user)
    local i 
    if len == 0 then return false end 
    for i = 1,len do 
        local one = string.sub(user,i,i)
        if string.byte(one) < 48 or string.byte(one) > 57 then 
            return false
        end
    end
    return true
end
-- 指定截取UTF8字符串
function truncateUTF8String(s, n)
  local dropping = string.byte(s, n+1)
  if not dropping then return s end
  if dropping >= 128 and dropping < 192 then
    return truncateUTF8String(s, n-1)
  end
  return string.sub(s, 1, n)
end 
-- 获取utf8字符串长度
function utfstrlen(str)
    local len = #str;
    local left = len;
    local cnt = 0;
    local arr={0,0xc0,0xe0,0xf0,0xf8,0xfc};
    while left ~= 0 do
        local tmp=string.byte(str,-left);
        local i=#arr;
        if not tmp then break end
        while arr[i] do
            if tmp>=arr[i] then left=left-i; break; end
            i=i-1;
        end
        cnt=cnt+1;
    end
    return cnt;
end
--@brief 切割字符串，并用“...”替换尾部
--@param sName:要切割的字符串
--@return nMaxCount，字符串上限,中文字为2的倍数
--@param nShowCount：显示英文字个数，中文字为2的倍数,可为空
--@note         函数实现：截取字符串一部分，剩余用“...”替换
function GetShortName(sName, nMaxCount, nShowCount)
    if sName == nil or nMaxCount == nil then
        return
    end
    local sStr = sName
    local tCode = {}
    local tName = {}
    local nLenInByte = #sStr
    local nWidth = 0
    if nShowCount == nil then
       nShowCount = nMaxCount - 3
    end
    for i=1,nLenInByte do
        local curByte = string.byte(sStr, i)
        local byteCount = 0;
        if curByte>0 and curByte<=127 then
            byteCount = 1
        elseif curByte>=192 and curByte<223 then
            byteCount = 2
        elseif curByte>=224 and curByte<239 then
            byteCount = 3
        elseif curByte>=240 and curByte<=247 then
            byteCount = 4
        end
        local char = nil
        if byteCount > 0 then
            char = string.sub(sStr, i, i+byteCount-1)
            i = i + byteCount -1
        end
        if byteCount == 1 then
            nWidth = nWidth + 1
            table.insert(tName,char)
            table.insert(tCode,1)
            
        elseif byteCount > 1 then
            nWidth = nWidth + 2
            table.insert(tName,char)
            table.insert(tCode,2)
        end
    end
    
    if nWidth > nMaxCount then
        local _sN = ""
        local _len = 0
        for i=1,#tName do
            _sN = _sN .. tName[i]
            _len = _len + tCode[i]
            if _len >= nShowCount then
                break
            end
        end
        sName = _sN .. ".."
    end
    return sName
end

--字符串换行
--@str 字符串
--@nMaxCount 每行字符串长度  中文为2的倍数
function lineFeedStr(str, nMaxCount)
    if str == nil or nMaxCount == nil then
        return
    end
    local sStr = str
    local newStr = ""
    local nLenInByte = #sStr
    local nWidth = 0
    for i=1,nLenInByte do
        local curByte = string.byte(sStr, i)
        local byteCount = 0;
        if curByte>0 and curByte<=127 then
            byteCount = 1
        elseif curByte>=192 and curByte<=223 then
            byteCount = 2
        elseif curByte>=224 and curByte<=239 then
            byteCount = 3
        elseif curByte>=240 and curByte<=247 then
            byteCount = 4
        end
        local char = nil
        if byteCount > 0 then
            char = string.sub(sStr, i, i+byteCount-1)
            i = i + byteCount -1
        end
        if byteCount == 1 then
            nWidth = nWidth + 1
            newStr = newStr.. char
        elseif byteCount > 1 then
            nWidth = nWidth + 2
            newStr = newStr.. char
        end
        if nWidth > nMaxCount and i < nLenInByte then
            nWidth = 0
            newStr = newStr .. "\n"
        end
    end
    
    return newStr
end

-- 根据传入元素删除相应元素
function tableDel(srcTable, element)
	if type(srcTable) ~= "table" then return false end
	for i,sub in pairs(srcTable) do
		if element == sub then
			table.remove(srcTable, i)
		end
	end
end

--判断一个字符串是否合法，type=1判断是否是数字ASCII码48-57，type=2判断符号字母数字ASCII码33-126
function FormatJudge(Str,type)
    for i=1,string.len(Str) do
        local onNum = string.byte(string.sub(Str,i,i))
      --  local onNum = tonumber(string.sub(Str,i,i))
        if not onNum then
            return false
        end
        local maximum,minimum
        if type == 1 then
            maximum,minimum = 57,48
        elseif type ==2 then
            maximum,minimum = 126,33
        end
        if minimum <= onNum and onNum <= maximum then
        else
            return false
        end
    end
    return true
end

-- 深入随机数
function deepRandom(...)
    math.random()
    math.random()
    math.random()
    math.random()

    return math.random(...)
end

-- time为秒，转化为需要显示的时间字符串
function timeStr(time, str)
    local t1,t2,t3 = 86400, 3600, 60
    local str = str or ""
    if time >= t1 then -- 天
        str = string.format("%s%d天", str, math.floor(time / t1))
        time = time % t1
    elseif time >= t2 then -- 时
        str = string.format("%s%d小时", str, math.floor(time / t2))
        time = time % t2
        if string.find(str, "天") then return str end
    elseif time >= t3 then -- 分
        str = string.format("%s%d分", str, math.floor(time / t3))
        time = time % t3
        if string.find(str, "小时") then return str end
    else -- 秒
        if time > 0 or str == "" then
            str = string.format("%s%d秒", str, time)
        end
        return str
    end
    return timeStr(time, str)
end

-- time为秒，转化为需要显示的时间字符串
function timeStr2(time,isShowMin)
    local t1,t2,t3 = 86400, 3600, 60

    if isShowMin then
        if time >= t2 then -- 时
            local hour =  time / t2 
            local min = (time % t2) / 60
            local sin =  (time % t2) % 60
            return string.format("%02d:%02d",min,sin)
        elseif time >= t3 then -- 分
            local min = time / 60
            local sin =  time  % 60
            return string.format("%02d:%02d",min,sin)
        else -- 秒
            return string.format("00:%02d",time)
        end
    end
    
    if time >= t2 then -- 时
        local hour =  time / t2 
        local min = (time % t2) / 60
        local sin =  (time % t2) % 60
        return string.format("%02d:%02d:%02d",hour,min,sin)
    elseif time >= t3 then -- 分
        local min = time / 60
        local sin =  time  % 60
        return string.format("00:%02d:%02d",min,sin)
    else -- 秒
        return string.format("00:00:%02d",time)
    end
   
end



-- 由于服务端类型限制time最大只能显示65535，用万位来表示显示的最小单位
function specificTimeStr(time, index, str)
    local max = 10000
    local ts = {60, 24, 365}
    local str = str or ""

    if not index then
        index = math.floor(time / max)
        time = time - index * max
    end
    
    if index > 0 and ts[index] then
        if index == 1 then -- 分为最小单位
            local hour = ts[index]
            local day = hour * ts[index + 1]
            if time > day then
                str = string.format("%s%d天", str, math.floor(time / day))
                time = time % day
            elseif time > hour then
                str = string.format("%s%d小时", str, math.floor(time / hour))
                time = time % hour
            else
                if time > 0 or str == "" then
                    str = string.format("%s%d分", str, time)
                end
                return str
            end
        elseif index == 2 then -- 小时为最小单位
            local day = ts[index]
            if time > day then
                str = string.format("%s%d天", str, math.floor(time / day))
                time = time % day
            else
                if time > 0 or str == "" then
                    str = string.format("%s%d小时", str, time)
                end
                return str
            end
        else
            return timeStr(time, str)
        end
    else
        return timeStr(time, str)
    end

    return specificTimeStr(time, index, str)
end

-- 将服务器传进来的字符串的前num个字符转化为数字存入表中
function transformChars(serverData,num)
    if not serverData then return {} end
    if serverData == "" then return {0} end
    if not num or num == "" then return {} end
    local i,tb = 1,{}
    while i <= num do
        c = serverData:sub(i,i)
        ord = c:byte()
        if ord and ord <= 255 then
            table.insert(tb,ord)
        end
        i=i+1
    end
    return tb
end

function getClientCardData(serverData)
    local serverCardData = {
        0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0A,0x0B,0x0C,0x0D, -- 方块1~9,a-d：10,J,Q,K
        0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1A,0x1B,0x1C,0x1D, -- 梅花
        0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2A,0x2B,0x2C,0x2D, -- 红桃
        0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39,0x3A,0x3B,0x3C,0x3D, -- 黑桃
        0x4E,0x4F -- 小王，大王
    }
    local clientCardID = {}
    for _,data in pairs(serverData) do
        for n,mData in pairs(serverCardData) do
            if data == mData then
                table.insert(clientCardID, n)
                break
            end
        end
    end
    return clientCardID
end
function transformSymbolToLineBreak(str)
    local newStr = ""
    if cc.Application:getInstance():getTargetPlatform() == cc.PLATFORM_OS_ANDROID then
        newStr = string.gsub(str, "|", "\n")
    else
        newStr = string.gsub(str, "|", "\r")
    end
    return newStr or str
end

-- 转换数字为带单位万、亿的字符串
function transformUnitNum(num)
    if not num then return end
    if type(num) ~= "number" then num = tonumber(num) end
    if math.abs(num) >= 10000 then
        if math.abs(num) >= 100000000 then
            num = math.floor(num / 1000000) / 100 .. "亿"
        else
            num = math.floor(num / 100) / 100 .. "万"
        end
    end
    return num
end

-- 大于等于flag_num才格式化
function transformUnitNum2(num, flag_num)
    if not num then return end
    if not flag_num then return end
    if type(num) ~= "number" then num = tonumber(num) end
    if type(flag_num) ~= "number" then flag_num = tonumber(flag_num) end
    if math.abs(num) >= flag_num then
        if math.abs(num) >= 100000000 then
            num = math.floor(num / 1000000) / 100 .. "亿"
        else
            num = math.floor(num / 100) / 100 .. "万"
        end
    end
    return num
end

-- 解决数字过大被转换为科学计数法的问题
function transformUnitNum3(num)
    if not num then return end
    if type(num) ~= "number" then num = tonumber(num) end
    if math.abs(num) >= 100000000 then
        local str1 = math.floor(num / 100000000)
        local str2 = string.format("%08d", num % 100000000)
        num = str1 .. str2
    end
    return num
end

funcs = funcs or {}
function funcs.childrenCall(parent, call)
    if not parent.getChildren then return end

    for _,child in pairs(parent:getChildren()) do
        if call then call(child) end
        funcs.childrenCall(child, call)
    end
end

function sMul(size, factor)
    return {width = size.width * factor, height = size.height * factor}
end

-- 往前填充指定bit个0
function fillNum(tmpId, bit)
    local tmpNum = string.len(tmpId)
    if tmpNum < bit then
        for i = 1, bit - tmpNum do
            tmpId = "0"..tostring(tmpId)
        end
    elseif tmpNum > bit then
        tmpId = string.sub(tmpId, -bit, tmpNum)
    end
    return tmpId
end

local function rad(v)
    return v * math.pi / 180
end

-- 获取两个经纬度之间的地表距离
-- lat:纬度 lng:经度
function getEarthDistance(lat1, lng1, lat2, lng2)
    local earthRadius = 6378.137
    local radLat1 = rad(lat1)
    local radLat2 = rad(lat2)
    local a = radLat1 - radLat2
    local b = rad(lng1) - rad(lng2)
    s = 2 * math.asin(math.sqrt(math.pow(math.sin(a*0.5), 2) + 
        math.cos(radLat1)*math.cos(radLat2)*math.pow(math.sin(b*0.5),2)))

    return math.round(s * earthRadius * 10000) * 0.0001
end
-- 获取两个经纬度之间的角度
function getEarthDirection(lat1, lng1, lat2, lng2)
    return math.atan((lng2 - lng1) * math.cos(lat2) / (lat2 - lat1)) / math.pi * 180
end
-- 获取点2相对点1的方向描述
function getEarthDirectionStr(lat1, lng1, lat2, lng2)
    local direction = {"东", "南", "西", "北"}
    local angle = getEarthDirection(lat1, lng1, lat2, lng2)
    local str = ""

    if angle < 10 and angle > -10 then -- 正南正北
        if lat1 < lat2 then
            str = direction[4]
        else
            str = direction[2]
        end
    elseif angle < -80 or angle > 80 then
        if lng1 < lng2  then
            str = direction[1]
        else
            str = direction[3]
        end
    else
        if lng1 < lng2 then
            str = direction[1]
        else
            str = direction[3]
        end

        if lat1 > lat2 then
            str = str .. direction[4]
        else
            str = str .. direction[2]
        end
    end
    return str
end
-- 排列组合 objNum: 目标表长度  combNum: 组合数
-- 组合数不能超过目标表长度
function Permutation(objNum, combNum, indexComb, tmp)
    if combNum > objNum then return end
    indexComb = indexComb or {}
    local continue = false
    if tmp then
        local i = 1
        while i <= #tmp - 1 do
            if tmp[i] == 1 and tmp[i + 1] == 0 then
                tmp[i] = 0
                tmp[i + 1] = 1
                indexComb[#indexComb + 1] = clone(tmp)
                continue = true
                break
            end
            i = i + 1
        end
    else
        tmp = {}
        for i = 1, objNum do
            tmp[#tmp + 1] = 0
        end
        for i = 1, combNum do
            tmp[i] = 1
        end
        indexComb[#indexComb + 1] = clone(tmp)
        continue = true
    end
    if continue then
        Permutation(objNum, combNum, indexComb, tmp)
    end
end

--获取文本要修改颜色是位置信息
--@content  文本内容
--@fontData 修改颜色信息
--fontData = {
--  {startChar(标识起点字符),endChar(标识终点字符),color(颜色)}
-- }
--有多个颜色不支持多个位置
function getContentColor(content,fontData)
    function byteIdxToStrIdx(str,byteIdx)
        local sStr = str
        local nLenInByte = #sStr
        local nWidth = 0
        for i=1,byteIdx do
            local curByte = string.byte(sStr, i)
            local byteCount = 0;
            if curByte == nil then return nWidth end
            if curByte>0 and curByte<=127 then
                byteCount = 1
            elseif curByte>=192 and curByte<=223 then
                byteCount = 2
            elseif curByte>=224 and curByte<=239 then
                byteCount = 3
            elseif curByte>=240 and curByte<=247 then
                byteCount = 4
            end
            local char = nil
            if byteCount > 0 then
                char = string.sub(sStr, i, i+byteCount-1)
                nWidth = nWidth + 1
            end
        end
        return nWidth - 1
    end

    --获取需要变色文字的起始结束位置
    local function getColorInfo(content,startChar,endChar,color)
        local newContent = content
        local startIdxs = {}
        local endIdxs = {}
        local cnt = 1

        while true do
            local startIdx = string.find(newContent,startChar,cnt)
            newContent = string.gsub(newContent,startChar,"",cnt)
            local endIdx = string.find(newContent,endChar,cnt)
            newContent = string.gsub(newContent,endChar,"",cnt)
            -- cnt = cnt + 1
            if startIdx == nil or endIdx == nil then break end
            if startIdx == startIdxs[#startIdxs] or endIdx == endIdxs[#endIdxs] then break end
            table.insert(startIdxs,startIdx)
            table.insert(endIdxs,endIdx)
        end
        -- print(newContent)
        if #startIdxs == 0 or #endIdxs == 0 then
            return newContent,nil
        end
        local colorInfos = {}
        for i=1,#startIdxs do
            local colorInfo = {}
            colorInfo.startIdx = byteIdxToStrIdx(newContent,startIdxs[i])
            colorInfo.endIdx = byteIdxToStrIdx(newContent,endIdxs[i])
            colorInfo.color = color
            table.insert(colorInfos,colorInfo)
        end
        return newContent,colorInfos
    end
    local strColor = {}
    -- local newContent,colorInfo = getColorInfo(newContent,"#R","R#",cc.c3b(255,255,0))
    -- if colorInfo then table.insert(strColor,colorInfo) end
    local newContent,colorInfos = content,nil
    table.sort(fontData,function(a,b)
        local idx1 = string.find(content,a.startChar)
        local idx2 = string.find(content,b.startChar)
        if idx1 and idx2 then
            return idx1 > idx2
        end
        return false
    end)
    for i = #fontData, 1, -1 do
        local v = fontData[i]
        newContent,colorInfos = getColorInfo(newContent,v.startChar,v.endChar,v.color)
        if colorInfos then
            for i,v in ipairs(colorInfos) do
                table.insert(strColor,v)
            end
        end
    end
    return  newContent,strColor
end

-- 设置富文本特殊标识
function setSpecialLabel(content, pattern, startStr, endStr)
    local repl = string.format("%s%s%s", startStr, pattern, endStr)
    local newStr = string.gsub(content, pattern, repl)
    return newStr
end

--求数组数字的和
function tablePlusNum(mytable)
    local sum = 0
    for i,v in ipairs(mytable) do
       sum = sum + v;
    end
    return sum
end

function getGuid()
    math.randomseed(tostring(os.time()):reverse():sub(1, 7))
    local seed = {"e","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"}
    local tab = {}
    for i=1,32 do
        table.insert(tab,seed[math.random(1,16)])
    end
    local sid = table.concat(tab)
    return string.format("%s-%s-%s-%s-%s",
        string.sub(sid,1,8),
        string.sub(sid,9,12),
        string.sub(sid,13,16),
        string.sub(sid,17,20),
        string.sub(sid,21,32))
end

function transStr(str)
    return string.gsub(str, "[%[%]&=+%%%c%(%)]", function(c)
        return "%"..c
    end)
end