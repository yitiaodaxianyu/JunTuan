---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2020/1/6 17:49
---

local ExternalTools = {}

function ExternalTools:addBtnTouchEventListener(btn, endCall, notScale, notSound)
    if not btn.scale then
        btn.scale = btn:getScale()
    end
    btn:addTouchEventListener(function(sender, eventType)
        local s = btn.scale
        if not notScale then
            if eventType == ccui.TouchEventType.began then
                sender:setScale(s * 0.9)
            elseif eventType == ccui.TouchEventType.canceled then
                sender:setScale(s)
            elseif eventType == ccui.TouchEventType.ended then
                sender:setScale(s)
            end
        end
        if eventType == ccui.TouchEventType.ended then
            if not notSound then
                AudioManager:playBtnEffect()
            end
            if endCall then
                endCall(sender)
            end
            -- 防止短时间内重复点击
            sender:setEnabled(false)
            performWithDelay(sender, function ()
                sender:setEnabled(true)
            end, 0.1)
        end
    end)
end

function ExternalTools:addSliderEventListener(pSlider, callBack)
    pSlider:addEventListener(function(sender, eventType)
        if eventType == ccui.SliderEventType.slideBallUp then
            if callBack then
                callBack(sender)
            end
        end
    end)
end

function ExternalTools:addTouchLayer(parent, zOrder, beganCall, moveCall, endCall)
    local layer = cc.Layer:create()
    layer:setAnchorPoint(0, 0)
    layer:setContentSize(display.size)
    layer:setPosition(cc.p(0, 0))
    layer:setLocalZOrder(zOrder)
    layer:addTo(parent)

    local listener = cc.EventListenerTouchOneByOne:create()
    listener:registerScriptHandler(function(touch, event)
        if beganCall then
            beganCall(touch, event)
        end
        local flag = parent.isCanTouch == nil and true or parent.isCanTouch
        return flag
    end, cc.Handler.EVENT_TOUCH_BEGAN)

    listener:registerScriptHandler(function(touch, event)
        if moveCall then
            moveCall(touch, event)
        end
    end, cc.Handler.EVENT_TOUCH_MOVED)

    listener:registerScriptHandler(function(touch, event)
        if endCall then
            endCall(touch, event)
        end
    end, cc.Handler.EVENT_TOUCH_ENDED)

    local eventDispatcher = parent:getEventDispatcher()
    eventDispatcher:addEventListenerWithSceneGraphPriority(listener, layer)

    return layer
end

function ExternalTools:addTouchEvent(node, beganCall, moveCall, endCall)
    local listener = cc.EventListenerTouchOneByOne:create()
    listener:registerScriptHandler(function(touch, event)
        if beganCall then
            beganCall(touch, event)
        end
        local flag = node.isCanTouch == nil and true or node.isCanTouch
        return flag
    end, cc.Handler.EVENT_TOUCH_BEGAN)

    listener:registerScriptHandler(function(touch, event)
        if moveCall then
            moveCall(touch, event)
        end
    end, cc.Handler.EVENT_TOUCH_MOVED)

    listener:registerScriptHandler(function(touch, event)
        if endCall then
            endCall(touch, event)
        end
    end, cc.Handler.EVENT_TOUCH_ENDED)

    local eventDispatcher = node:getEventDispatcher()
    eventDispatcher:addEventListenerWithSceneGraphPriority(listener, node)
end

function ExternalTools:changeView(addViewPath, parent, oldView, removeCall)
    local addView = cc.CallFunc:create(function()
        local newView = require(addViewPath).new(parent)
        parent:addChild(newView)
    end)

    local removeView = cc.CallFunc:create(function()
        if removeCall then
            removeCall()
        end
        oldView:removeFromParent(true)
    end)

    local seq = cc.Sequence:create(addView, removeView)
    oldView:runAction(seq)
end

function ExternalTools:addView(addViewPath, parent, viewAni, addViewInfo, addCall)
    local addView = require(addViewPath).new(parent)
    local panel = addView.panel_root or addView
    if addViewInfo then
        local pos = addViewInfo.pos or cc.p(0, 0)
        local scale = addViewInfo.scale or 1
        local rotation = addViewInfo.rotation or 0
        local anchorPoint = addViewInfo.anchorPoint or cc.p(0, 0)
        panel:setPosition(pos)
        panel:setScale(scale)
        panel:setRotation(rotation)
        panel:setAnchorPoint(anchorPoint)
    else
        panel:setPosition(display.center)
        if viewAni == nil then
            panel:setScale(0)
        end
    end

    local action = viewAni or cc.ScaleTo:create(0.2, 1)
    local callFunc = cc.CallFunc:create(function()
        if addCall then
            addCall(addView)
        end
    end)

    local seq = cc.Sequence:create(action, callFunc)
    panel:runAction(seq)
    parent:addChild(addView)
end

function ExternalTools:removeView(view, viewAni, viewInfo, removeCall)
    local panel = view.panel_root or view
    local action = viewAni or cc.ScaleTo:create(0.2, 0)
    local call = cc.CallFunc:create(function()
        if removeCall then
            removeCall()
        end
        view:removeFromParent(true)
    end)

    if viewInfo then
        local pos, scale, rotation = viewInfo.pos, viewInfo.scale, viewInfo.rotation
        panel:setPosition(pos)
        panel:setScale(scale)
        panel:setRotation(rotation)
    end

    local seq = cc.Sequence:create(action, call)
    panel:runAction(seq)
end

function ExternalTools:panelBlackAni(panel_black)
    panel_black:setOpacity(0)
    panel_black:runAction(cc.Sequence:create(
            cc.DelayTime:create(0.2),
            cc.CallFunc:create(function(node)
                node:setOpacity(255)
            end))
    )
end

function ExternalTools:createLayer(parent, zOrder)
    local layer = display.newLayer()
    layer:setAnchorPoint(0, 0)
    layer:setPosition(cc.p(0, 0))
    layer:setContentSize(display.size)

    parent:addChild(layer, zOrder)
    return layer
end

function ExternalTools:enableBtn(btn, enable, isChangeColor)
    if enable then
        btn:setEnabled(true)
        if isChangeColor then
            btn:setColor(cc.c3b(255, 255, 255))
        end
    else
        btn:setEnabled(false)
        if isChangeColor then
            btn:setColor(cc.c3b(125, 125, 125))
        end
    end
end

-- 将数字三位三位分开，如1000->1,000;1000000->1,000,000
function ExternalTools:toString_thousand(num, sign)
    local str = tostring(num)
    local strLen = string.len(str)

    if strLen <= 3 then
        return str
    end

    local len = strLen % 3 == 0 and strLen / 3 - 1 or math.floor(strLen / 3)
    local arr = {}
    for i = 1, len do
        local start = strLen - (i * 3) + 1
        local newStr = string.sub(str, start, start + 3)
        table.insert(arr, newStr)

        str = string.gsub(str, newStr, "", 1)
    end

    local sign = sign or ","
    local newStr = ""
    for i = #arr, 1, -1 do
        newStr = newStr .. sign .. arr[i]
    end

    return str .. newStr
end

-- 改变数字显示方式，以万、亿为单位：12345678 -> 1234.5678万, 100000000 -> 1亿
function ExternalTools:changeNum(num)
    local len = #tostring(num)
    local str = "" .. num
    if len >= 7 then
        str = ""
        if len >= 9 then
            -- 亿
            local newNum = num / (10 ^ 8)
            if newNum ~= math.floor(newNum) then
                newNum = string.format("%.4f", newNum)
            end
            str = str .. newNum .. "亿"
        elseif len >= 7 then
            -- 百万起步
            local newNum = num / (10 ^ 4)
            if newNum ~= math.floor(newNum) then
                newNum = string.format("%.1f", newNum)
            end
            str = str .. newNum .. "万"
        end
    end
    return str
end

-- 保留几位小数
function ExternalTools:numFormat(num, format)
    local str = num
    if format == 1 then
        str = string.format("%.1f", num)
    elseif format == 2 then
        str = string.format("%.2f", num)
    elseif format == 3 then
        str = string.format("%.3f", num)
    elseif format == 4 then
        str = string.format("%.4f", num)
    elseif format == 5 then
        str = string.format("%.5f", num)
    elseif format == 6 then
        str = string.format("%.6f", num)
    elseif format == 7 then
        str = string.format("%.7f", num)
    elseif format == 8 then
        str = string.format("%.8f", num)
    elseif format == 9 then
        str = string.format("%.9f", num)
    end
    return str
end

function ExternalTools:showTipText(parent, str, pos, color, isMove)
    local pos = pos or cc.p(display.width / 2, display.height / 2 + 50)
    local color = color or cc.c3b(255, 216, 33)
    local text = ccui.Text:create(str, "res/YOUYUAN.TTF", 36)
    text:setTextColor(color)
    text:setPosition(pos)
    parent:addChild(text)

    if isMove then
        local moveUp = cc.MoveBy:create(1, cc.p(0, 150))
        local fadeOut = cc.FadeOut:create(1)
        local spawn = cc.Sequence:create(moveUp, fadeOut)
        local seq = cc.Sequence:create(spawn, cc.RemoveSelf:create())
        text:runAction(seq)
    end
    return text
end

-- 数字滚动动画
function ExternalTools:numScrollAni(txt_num, curNum, addNum, endCall, format, sign)
    if addNum <= 0 then
        return
    end
    sign = sign or ""
    format = format or 2
    local curNum = curNum
    local mul = addNum <= 60 and addNum or 60
    local unit = math.ceil(addNum / mul)
    local total = curNum + addNum

    local function update()
        curNum = curNum + unit
        if curNum > total then
            curNum = total
            if txt_num.updateNumScheduler ~= nil then
                local scheduler = cc.Director:getInstance():getScheduler()
                scheduler:unscheduleScriptEntry(txt_num.updateNumScheduler)
                txt_num.updateNumScheduler = nil
                if endCall then
                    endCall()
                end
            end
        end
        local num = curNum
        if format == 1 then
            num = self:toString_thousand(num)
        elseif format == 2 then
            num = sign .. num
        end
        txt_num:setString(num)
    end

    if txt_num.updateNumScheduler == nil then
        local scheduler = cc.Director:getInstance():getScheduler()
        txt_num.updateNumScheduler = scheduler:scheduleScriptFunc(update, 1 / 60, false)
    end
end

-- 停止数字滚动动画
function ExternalTools:stopNumScroll(txt_num)
    if txt_num.updateNumScheduler then
        local scheduler = cc.Director:getInstance():getScheduler()
        scheduler:unscheduleScriptEntry(txt_num.updateNumScheduler)
        txt_num.updateNumScheduler = nil
    end
end

-- 文本宽度自适应
function ExternalTools:txtAutoWidth(txt, max)
    local width = txt:getContentSize().width
    if width > max then
        local scale = max / width
        txt:setScale(scale)
    end
end

function ExternalTools:cloneTable(dataT)
    local cloneT = {}
    for _, v in pairs(dataT) do
        table.insert(cloneT, v)
    end
    return cloneT
end

-- 从dataT表中取出count个值, isHave 是否可以取重复的值
function ExternalTools:getRandomFromTable(dataT, count, isClone, isHave)
    local dataT = isClone and clone(dataT) or dataT
    local count = count

    local result = {}
    while count > 0 do
        local idx = math.random(1, #dataT)
        local value = dataT[idx]
        table.insert(result, value)
        if not isHave then
            table.remove(dataT, idx)
        end
        count = count - 1
    end
    return result
end

-- 从数组中随机获取一个不等于except的值
function ExternalTools:getValueFromTable(dataT, except)
    local dataT = ExternalTools:cloneTable(dataT)
    local idx = math.random(1, #dataT - 1)
    for k, v in pairs(dataT) do
        if v == except then
            table.remove(dataT, k)
            break
        end
    end
    return dataT[idx]
end

function ExternalTools:createButton(normal, press, disable)
    local btn = ccui.Button:create()
    if press == nil and disable == nil then
        btn:loadTextures(normal, normal, normal, ccui.TextureResType.plistType)
    else
        btn:loadTextures(normal, press, disable, ccui.TextureResType.plistType)
    end
    return btn
end

function ExternalTools:createText(txtStr, fontSize, fontColor, shadowInfo, outLineInfo, fontFile)
    local fontFile = fontFile or "res/YOUYUAN.TTF"
    local text = ccui.Text:create(txtStr, fontFile, fontSize)

    if shadowInfo then
        text:enableShadow(shadowInfo.color, shadowInfo.size)
    end

    if outLineInfo then
        text:enableOutline(outLineInfo.color, outLineInfo.size)
    end

    if fontColor then
        text:setTextColor(fontColor)
    end

    return text
end

function ExternalTools:createLayout(bgName, bgType, size, anchorPoint)
    local s = size or display.size
    local p = anchorPoint or cc.p(0.5, 0.5)
    local layout = ccui.Layout:create()
    layout:setContentSize(s)
    layout:setAnchorPoint(p)
    layout:setEnabled(true)
    layout:setTouchEnabled(true)
    if bgName then
        bgType = bgType or ccui.TextureResType.plistType
        layout:setBackGroundImage(bgName, bgType)
    end
    return layout
end

-- 获得关于中心点centerPos对称的一组点，个数为num个, 间距为w, flag 1横向  2竖向
function ExternalTools:getCenterSortPos(centerPos, num, w, flag)
    if num <= 0 then
        return {}
    end
    flag = flag or 1
    local x, y = centerPos.x, centerPos.y
    local mid = math.floor(num / 2)
    local startPos = num % 2 == 0 and cc.p(x - (mid - 0.5) * w, y) or cc.p(x - mid * w, y)
    if flag == 2 then
        startPos = num % 2 == 0 and cc.p(x, y - (mid - 0.5) * w) or cc.p(x, y - mid * w)
    end
    local posT = { startPos }
    for i = 2, num do
        local lastPos = posT[i - 1]
        local newPos = { x = lastPos.x + w, y = lastPos.y }
        if flag == 2 then
            newPos = { x = lastPos.x, y = lastPos.y + w }
        end
        posT[i] = newPos
    end
    return posT
end

-- 抖动动画
function ExternalTools:playSharkAni(node)
    local seq = cc.Sequence:create(
            cc.MoveTo:create(0.03, cc.p(5, 7)),
            cc.MoveTo:create(0.03, cc.p(-6, 7)),
            cc.MoveTo:create(0.03, cc.p(-13, 3)),
            cc.MoveTo:create(0.03, cc.p(3, -6)),
            cc.MoveTo:create(0.03, cc.p(-5, 5)),
            cc.MoveTo:create(0.03, cc.p(2, -8)),
            cc.MoveTo:create(0.03, cc.p(-8, -10)),
            cc.MoveTo:create(0.03, cc.p(3, 10)),
            cc.MoveTo:create(0.03, cc.p(-10, -1)),
            cc.MoveTo:create(0.03, cc.p(0, 0))
    )
    seq:setTag(666)
    node:stopActionByTag(666)
    node:runAction(seq)
end

-- 节点先放大再缩小的动画
function ExternalTools:nodeScaleAni(node, maxScale, minScale, maxTime, minTime, endDelay, endCall)
    local scaleTo_1 = cc.ScaleTo:create(maxTime, maxScale)
    local scaleTo_2 = cc.ScaleTo:create(minTime, minScale)
    local endDelay = endDelay or 0
    local seq = cc.Sequence:create(
            scaleTo_1,
            scaleTo_2,
            cc.DelayTime:create(endDelay),
            cc.CallFunc:create(function()
                if endCall then
                    endCall()
                end
            end)
    )
    node:runAction(seq)
end

function ExternalTools:nodeScaleShowAni(node, scaleX, scaleY, endCall)
    local scaleX = scaleX or 1
    local scaleY = scaleY or 1
    node:setScale(0)
    node:runAction(cc.Sequence:create(
            cc.ScaleTo:create(0.15, scaleX * 1.15, scaleY * 1.15),
            cc.ScaleTo:create(0.1, scaleX, scaleY),
            cc.CallFunc:create(function()
                if endCall then
                    endCall()
                end
            end)
    ))
end

function ExternalTools:nodeScaleRemoveAni(node, scaleX, scaleY, isRemove, endCall)
    local scaleX = scaleX or 0
    local scaleY = scaleY or 0
    node:runAction(cc.Sequence:create(
            cc.ScaleTo:create(0.15, scaleX, scaleY),
            cc.CallFunc:create(function()
                if isRemove then
                    node:removeFromParent(true)
                end

                if endCall then
                    endCall()
                end
            end)
    ))
end

function ExternalTools:btnTouchAni(sender, event)
    if event == ccui.TouchEventType.began then
        sender:setScale(0.9)
    elseif event == ccui.TouchEventType.ended then
        sender:setScale(1)
    elseif event == ccui.TouchEventType.canceled then
        sender:setScale(1)
    end
end

function ExternalTools:showTipDialogBox(csb)
    local curScene = cc.Director:getInstance():getRunningScene()
    local para = {
        csb = csb,
        setSize = true
    }

    local dialog = ViewBase:createCSB(para)
    curScene:addChild(dialog)

    return dialog
end

-- 获取数组中每个数字出现的次数
function ExternalTools:getTheValueNum(dataT)
    local numT = {}
    for k, v in pairs(dataT) do
        if numT[v] == nil then
            numT[v] = 1
        else
            numT[v] = numT[v] + 1
        end
    end
    return numT
end

-- 组合问题，返回n选m的所有可能
function ExternalTools:getCombinations(n, m, dataT)
    local idxT = {}
    local tmp = {}
    local function getResult(n, m, tmp)
        if m == 0 then
            table.insert(idxT, clone(tmp))
            return
        end
        for i = n, m, -1 do
            tmp[m] = i
            getResult(i - 1, m - 1, tmp)
        end
    end
    getResult(n, m, tmp)
    local data = {}
    for _, v in pairs(idxT) do
        local newData = {}
        for _, value in pairs(v) do
            table.insert(newData, dataT[value])
        end
        table.insert(data, newData)
    end
    return data
end

-- 全排列
function ExternalTools:permute(arr, k, result)
    local arr = clone(arr)
    local len = #arr
    if (len == k) then
        table.insert(result, arr)
    else
        for i = k, len do
            arr[i], arr[k] = arr[k], arr[i]
            self:permute(arr, k + 1, result)
            arr[i], arr[k] = arr[k], arr[i]
        end
    end
end

-- 数组打乱
function ExternalTools:random_array(arr)
    local tmp, index
    for i = 1, #arr - 1 do
        index = math.random(i + 1, #arr)
        if index ~= #arr then
            tmp = arr[index]
            arr[index] = arr[i]
            arr[i] = tmp
        end
    end
    return arr
end

-- 二维数组去重
function ExternalTools:removeHaveElem(dataT)
    local data = clone(dataT)
    local idx = 1
    local len = #data
    while idx <= len do
        local arr = clone(data[idx])
        local i = idx + 1
        local max = len
        while i <= max do
            local newL = #arr
            local arr2 = clone(data[i])
            self:sortTable(arr, 1)
            self:sortTable(arr2, 1)
            if newL == #arr2 then
                local isSame = true
                for j = 1, newL do
                    if arr[j] ~= arr2[j] then
                        isSame = false
                        break
                    end
                end
                if isSame then
                    table.remove(data, i)
                    max = max - 1
                else
                    i = i + 1
                end
            else
                i = i + 1
            end
        end
        idx = idx + 1
        len = #data
    end
    return data
end

-- 从dataT 中移除 removeT的所有元素(dataT, removeT 均为一维数组)
function ExternalTools:tableRemove(dataT, removeT)
    while #removeT > 0 do
        for _, remove in pairs(removeT) do
            for _, data in pairs(dataT) do
                if data == remove then
                    table.removebyvalue(dataT, data, true)
                    break
                end
            end
            table.removebyvalue(removeT, remove, true)
            break
        end
    end
end

-- 检测t1中是否含有t2中的元素
function ExternalTools:isTableContain(t1, t2)
    for i, v1 in pairs(t1) do
        for j, v2 in pairs(t2) do
            if v1 == v2 then
                return true, i, j
            end
        end
    end
    return false
end

-- flag 1:升序 2:降序
function ExternalTools:sortTable(dataT, flag, func)
    if flag == 1 then
        table.sort(dataT, function(a, b)
            return a < b
        end)
    elseif flag == 2 then
        table.sort(dataT, function(a, b)
            return a > b
        end)
    else
        if func then
            table.sort(dataT, func)
        end
    end
end

-- 一维数组求和
function ExternalTools:getTableSum(dataT)
    local sum = 0
    for k, v in pairs(dataT) do
        sum = sum + v
    end
    return sum
end

function ExternalTools:twoTableSub(t1, t2)
    local tmp = {}
    local result = clone(t1)
    for _, v in pairs(t1) do
        tmp[v] = v
    end
    for _, v in pairs(t2) do
        if tmp[v] ~= nil then
            table.removebyvalue(result, v)
        end
    end
    return result
end

-- 多维数组减少一个维度
function ExternalTools:tableSubOne(dataT)
    local data = {}
    for _, table1 in pairs(dataT) do
        if type(table1) == "table" then
            for _, table2 in pairs(table1) do
                table.insert(data, table2)
            end
        end
    end
    return data
end

function ExternalTools:tableConnect(t1, t2)
    local data = clone(t1)
    for _, v in pairs(t2) do
        table.insert(data, v)
    end
    return data
end

function ExternalTools:nodeClickShow(node)
    local visible = not node:isVisible()
    if visible then
        node:setVisible(true)
        ExternalTools:nodeScaleShowAni(node)
    else
        ExternalTools:nodeScaleRemoveAni(node, 0, 0, false, function()
            node:setVisible(false)
        end)
    end
    node:setLocalZOrder(998)
end

function ExternalTools:TableInheritTable(object, inheritObj)
    assert(type(object) == "table" and type(inheritObj) == "table", "TableInheritTable() - invalid")
    local function _copy(obj)
        if "table" ~= type(obj) then
            return obj
        elseif object[obj] then
            return object[obj]
        end
        local new_table = {}
        object[obj] = new_table
        for k, v in pairs(obj) do
            new_table[_copy(k)] = _copy(v)
        end
        return setmetatable(new_table, getmetatable(obj))
    end
    for k, v in pairs(inheritObj) do
        if k == "class" then
            for j, w in pairs(v) do
                object[j] = _copy(w)
            end
        end
        object[k] = _copy(v)
    end
end

function ExternalTools:nodeAutoScaleX(node, originX, isBig)
    local x = display.width / originX
    if not isBig then
        if display.width < originX then
            node:setScaleX(x)
        end
    else
        node:setScaleX(x)
    end
end

-- 文本倒计时
function ExternalTools:txtCountDown(txt, time, strFront, strBack, endCall)
    txt:setString(strFront .. time .. strBack)
    local curTime = time
    local function countDown(dt)
        curTime = curTime - dt
        if curTime == 0 then
            self:stopTxtCountDown(txt)
            if endCall then
                endCall()
            end
        end
        txt:setString(strFront .. curTime .. strBack)
    end

    self:stopTxtCountDown(txt)
    local scheduler = cc.Director:getInstance():getScheduler()
    txt.timeScheduler = scheduler:scheduleScriptFunc(countDown, 1, false)
end

-- 停止文本倒计时
function ExternalTools:stopTxtCountDown(txt)
    if txt.timeScheduler ~= nil then
        local scheduler = cc.Director:getInstance():getScheduler()
        scheduler:unscheduleScriptEntry(txt.timeScheduler)
        txt.timeScheduler = nil
    end
end

-- 字符串转字符数组
function ExternalTools:getStrTable(str)
    local strTable = {}
    local lenInByte = #str
    local charCount = 0
    local i = 1
    while i <= lenInByte do
        local curByte = string.byte(str, i)
        local byteCount = 1
        if curByte > 0 and curByte <= 127 then
            --1字节字符
            byteCount = 1
        elseif curByte >= 192 and curByte < 223 then
            --双字节字符
            byteCount = 2
        elseif curByte >= 224 and curByte < 239 then
            --中文
            byteCount = 3
        elseif curByte >= 240 and curByte <= 247 then
            --4字节字符
            byteCount = 4
        end

        local char = string.sub(str, i, i + byteCount - 1)

        -- 重置下一字节的索引
        i = i + byteCount

        -- 字符的个数（长度）
        charCount = charCount + 1
        strTable[charCount] = char
    end
    return strTable
end

-- 获得两点之间的夹角(弧度制)
-- p1 目标位置， p2 开始位置
function ExternalTools:getAngleByTowPoint(p1, p2)
    local pt1 = p1
    local pt2 = p2
    local p = cc.pSub(pt1, pt2)
    local PI_2 = 3.1415926535 / 2
    local radian = p.x == 0 and PI_2 or math.atan(p.y / p.x)
    -- 象限特殊处理(因为atan的取值范围是 -2/PI 到 2/PI, 不包含二三象限)
    if (p.x < 0 and p.y > 0) or (p.x < 0 and p.y < 0) then
        radian = 3.1415926535 + radian
    end
    return radian
end

-- 返回point相对中心点center旋转rotation弧度后的新点
function ExternalTools:getRotatePos(pos, center, rotation)
    local x, y
    x = (pos.x - center.x) * math.cos(rotation) - (pos.y - center.y) * math.sin(rotation) + center.x
    y = (pos.x - center.x) * math.sin(rotation) + (pos.y - center.y) * math.cos(rotation) + center.y
    return cc.p(x, y)
end

-- 是否满足概率
-- value : 基础概率（如0.2表示20%的概率）
function ExternalTools:isSuccessful(value)
    local flag = math.random(1, 100)
    if value * 100 > flag then
        return true
    end
    return false
end

function ExternalTools:showView(view, parent, zOrder)
    local z = zOrder or 9999
    view:setAnchorPoint(0.5, 0.5)
    view:setPosition(display.center)
    parent:addChild(view, z)
end

function ExternalTools:loadingTxtDotAni(txt, tip)
    local function setDot(txtNode, tipStr)
        if txtNode and txtNode.curDot then
            local str_dot = tipStr
            for i = 1, txtNode.curDot do
                str_dot = str_dot .. "."
            end
            txtNode:setString(str_dot)
            txtNode.curDot = txtNode.curDot + 1
            txtNode.curDot = txtNode.curDot > 3 and 0 or txtNode.curDot
            txtNode:runAction(cc.Sequence:create(
                    cc.DelayTime:create(0.35),
                    cc.CallFunc:create(function ()
                        setDot(txtNode, tipStr)
                    end)
            ))
        end
    end
    local str = tip or "正在连接，请稍后"
    txt.curDot = 0
    setDot(txt, str)
end

function ExternalTools:tableLen(t)
    local n = 0
    for _, _ in pairs(t) do
        n = n + 1
    end
    return n
end

--创建圆形进度条
function ExternalTools:createCircleLoadingBar(png, parent, pos, percentage)
    local png = png or "res/JunTuan/img/circle_mask.png"
    --创建一个图片精灵作为背景 需要一个空心圆形的图片
    local spriteBg = cc.Sprite:create(png)
    --创建进度条
    local circleProgressBar = cc.ProgressTimer:create(spriteBg)
    --设置类型
    circleProgressBar:setType(cc.PROGRESS_TIMER_TYPE_RADIAL)
    --指定父节点
    parent:addChild(circleProgressBar)
    --指定位置
    --spriteBg:setPosition(pos)
    circleProgressBar:setPosition(pos)
    --还可以指定层级 名字
    circleProgressBar:setLocalZOrder(100)
    --设置进度
    circleProgressBar:setPercentage(percentage)
    return circleProgressBar
end

function ExternalTools:getDataFromTable(tableList, num)
    local ret = {}
    local len = #tableList
    local curIdx = 1
    while num > 0 do
        local data = tableList[curIdx]
        table.insert(ret, data)
        curIdx = curIdx + 1
        if curIdx > len then
            curIdx = 1
        end
        num = num - 1
    end
    return ret
end

function ExternalTools:getTableFromStr(str)
    local newStr = string.gsub(str, "%[", "")
    newStr = string.gsub(newStr, "%]", "")
    local tableData = string.split(newStr, ",")
    for i, v in pairs(tableData) do
        tableData[i] = tonumber(v)
    end
    return tableData
end

function ExternalTools:splitGetList(listData, num)
    local newList = {}
    for i, v in ipairs(listData) do
        local row = math.ceil(i / num)
        local col = i % num
        col = col == 0 and num or col
        if not newList[row] then
            newList[row] = {}
        end
        newList[row][col] = v
    end
    return newList
end

function ExternalTools:isTableHaveData(tableList, data)
    for _, v in pairs(tableList) do
        if v == data then
            return true
        end
    end
    return false
end

return ExternalTools