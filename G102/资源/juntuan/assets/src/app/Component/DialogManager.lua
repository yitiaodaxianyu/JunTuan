-- 对话框
DialogManager = {}

DialogManager.localZOrder = 20000					--所在层级
DialogManager.scaleTipTag = 10000					--scaleTip标签
DialogManager.scaleTipShowTime = 1					--scaleTip存在时间
DialogManager.alertTag = 20000						--alertTag标签
DialogManager.confirmTag = 30000					--confirmTag标签
DialogManager.waittingTag = 40000					--waittingTag标签
DialogManager.oneBtn = 1							--alert类型
DialogManager.twoBtn = 2							--alert类型

--是否是一个表情
function isFace(s)
	for i,v in ipairs(faceData) do
		if "["..s.."]" == v.name then
			return true
		end
	end
	return false
end

--字符是否是中文
function isChineseCode(ch)
	local value = string.byte(ch)
	if nil == value then return true,ch end
	if (value >= 0) and (value <= 127) then
		return false,ch
	end
	return true,ch
end

--处理换行符Label自动换行处理 返回后的字符串 实际所需多少行显示 小于一行时所需最小宽度
function DialogManager:splitStr(str,MaxWidth,fontSize,charWidth,minWidth)
	if(str == nil or string.len(str)<0) then return str end
	local len = string.len(str)
	local tStr = ""
	local ch = nil
	local index = 1
	local lWidth = 0
	local lw = 0
	local lineNum = 1 --所需行数
	while(index<=len) do
		ch = string.sub(str,index,index)
		if ch == "\n" then lWidth = 0 end
		local ok,char = isChineseCode(ch)
		if(true == ok) then
			--print("111ch=",string.sub(str,index,index+2))
			if(lWidth+fontSize)>=MaxWidth then
				tStr=tStr.."\n"
				--print("插入换行符",string.sub(str,index,index+2))
				lWidth = fontSize
				lineNum = lineNum+1
			else
				lWidth = lWidth+fontSize
			end
			tStr = tStr..string.sub(str,index,index+2)
			index = index+3
		else
			index = index+1
			lw = charWidth
			if(lWidth+lw)>=MaxWidth then
				tStr=tStr.."\n"
				lWidth = charWidth
				lineNum = lineNum+1
			else
				lWidth = lWidth+lw
			end
			tStr = tStr..ch
		end
	end
	if(lWidth<minWidth) then
		lWidth = minWidth
	end
	--返回值
	if(lineNum == 1) then
		return tStr,lineNum,lWidth
	else
		return tStr,lineNum,MaxWidth
	end

end

function DialogManager:create(type, contents, okCallBack, cancelCallBack)
	local para = {
		csb = "res/JunTuan/Game_tip.csb",
		setSize = true
	}
	local dialog = ViewBase:createCSB(para)
	local panel_main = dialog:getChildByName("Panel_black"):getChildByName("Panel_main")
	local panel_tip = panel_main:getChildByName("Panel_tip")
	dialog.text_tip = panel_tip:getChildByName("Text_tip")
	local function actionCall(call)
		dialog:runAction(cc.Sequence:create(
				cc.CallFunc:create(call),
				cc.RemoveSelf:create())
		)
	end
	local function sureItemCall(_, eventType)
		if not okCallBack then
			okCallBack = function() end
		end
		actionCall(okCallBack)
	end

	local function cancelItemCall(_, eventType)
		if not cancelCallBack then
			cancelCallBack = function () end
		end
		actionCall(cancelCallBack)
	end
	local sureItem = panel_main:getChildByName("btn_yes")
	local cancelItem = panel_main:getChildByName("btn_no")
	--sureItem:addTouchEventListener(sureItemCall)
	--cancelItem:addTouchEventListener(cancelItemCall)
	ExternalTools:addBtnTouchEventListener(sureItem, sureItemCall)
	ExternalTools:addBtnTouchEventListener(cancelItem, cancelItemCall)
	if contents then
		if contents.okBtnWords then
			sureItem:getChildByName("Text_btn"):setString(contents.okBtnWords)
		end
		if contents.cancelBtnWords then
			cancelItem:getChildByName("Text_btn"):setString(contents.cancelBtnWords)
		end
	end
	if type == DialogManager.oneBtn then
		cancelItem:hide()
		local size = panel_main:getContentSize()
		sureItem:setPositionX(size.width/2)
	end
	return dialog
end

--[[
alert为单按钮提示框，在原有接口上新加参数，用来设置内容显示
msg							提示内容文字
callBack					确认按钮回调
contents.title				title为提示框标题
contents.okBtnWords			确认按钮文字
]]
function alert(msg, okCallBack, contents, isBig, pos)
	if not contents then contents = {okBtnWords = "确定"} end
	--local runningScene = cc.Director:getInstance():getRunningScene()
	local runningScene = SceneManager.Shared():GetRunningScene()
	if runningScene:getChildByTag(DialogManager.alertTag) then return end

	local dialog = DialogManager:create(DialogManager.oneBtn, contents, okCallBack, nil, isBig, pos)
	local size = dialog.text_tip:getContentSize()
	--local targetStr = DialogManager:splitStr(msg, size.width, 26, 15, size.width)
	local targetStr = msg
	if targetStr then dialog.text_tip:setString(targetStr) end

	runningScene:addChild(dialog, DialogManager.localZOrder, DialogManager.alertTag)
	return dialog
end

--[[
confirm为俩按钮提示框，在原有接口上新加参数，用来设置内容显示
msg							提示内容文字
okCallBack					确认按钮回调
cancelCallBack				取消按钮回调
contents.title				title为提示框标题
contents.okBtnWords			确认按钮文字
contents.cancelBtnWords		取消按钮文字
]]
function confirm(msg, okCallBack, cancelCallBack, contents, isBig, pos)
	if not contents then contents = {okBtnWords = "是的",cancelBtnWords = "不要"} end
	--local runningScene = cc.Director:getInstance():getRunningScene()
	local runningScene = SceneManager.Shared():GetRunningScene()
	if runningScene:getChildByTag(DialogManager.confirmTag) then return end

	local dialog = DialogManager:create(DialogManager.twoBtn, contents, okCallBack, cancelCallBack, isBig, pos)
	local size = dialog.text_tip:getContentSize()
	--local targetStr = DialogManager:splitStr(msg, size.width, 26, 15, size.width)
	local targetStr = msg
	if targetStr then dialog.text_tip:setString(targetStr) end

	runningScene:addChild(dialog, DialogManager.localZOrder, DialogManager.confirmTag)
	return dialog
end

-- 九宫格tip框
function showScaleTip(msg, callback, showTime)
	if not msg then return end
	local director = cc.Director:getInstance()
	--local runningScene = director:getRunningScene()
	local runningScene = SceneManager.Shared():GetRunningScene()
	if runningScene:getChildByTag(DialogManager.scaleTipTag) then
		runningScene:removeChildByTag(DialogManager.scaleTipTag)
	end
	local frame = DialogManager:initByScale(msg)
	local winSize = director:getWinSize()
	frame:setPosition(winSize.width/2, winSize.height/2)
	runningScene:addChild(frame, DialogManager.localZOrder, DialogManager.scaleTipTag)

	local delayAct = cc.DelayTime:create(showTime or DialogManager.scaleTipShowTime)
	local fadeAct = cc.FadeOut:create(DialogManager.scaleTipShowTime)
	local removeAct = cc.RemoveSelf:create()

	local array = frame:getChildren()
	for _,v in pairs(array) do
		local act = cc.Sequence:create(delayAct:clone(), fadeAct:clone(), removeAct:clone())
		v:runAction(act)
	end

	local seqAct = nil
	if(callback) then
		seqAct = cc.Sequence:create(delayAct, fadeAct, cc.CallFunc:create(callback), removeAct)
	else
		seqAct = cc.Sequence:create(delayAct, fadeAct, removeAct)
	end
	frame:runAction(seqAct)
	return frame
end

function DialogManager:initByScale(msg)
	--local frame = ccui.ImageView:create("res/image/bg_middle_tip_black.png", ccui.TextureResType.localType)
	local frame = ccui.ImageView:create("bg_loading_ddzyh.png", ccui.TextureResType.plistType)
	local size = frame:getContentSize()
	size.width = size.width * 3
	size.height = size.height
	local fontSize = size.height*0.4
	local targetStr,targetLineNum,targertWidth = DialogManager:splitStr(msg,size.width * 1.5,fontSize,15,size.width)

	local tHeight =  size.height
	frame:setScale9Enabled(true)
	if(targetLineNum>1) then
		--多行显示
		tHeight = size.height+fontSize*(targetLineNum-1)
	end
	if targertWidth >= size.width then
		size.width = targertWidth + 30
	end
	frame:setContentSize(cc.size(size.width,tHeight))
	local label = ccui.Text:create(targetStr, "YOUYUAN.TTF", fontSize)
	label:setPosition(cc.p(size.width/2, tHeight/2))
	label:setColor(cc.c3b(255, 255, 255))
	frame:addChild(label)

	return frame
end

--加载动画框
function showWaiting(msg)
	local runningScene = cc.Director:getInstance():getRunningScene()
	if runningScene:getChildByTag(DialogManager.waittingTag) then
		return
	end
	local layout = ccui.Layout:create()
	layout:setBackGroundColorType(ccui.LayoutBackGroundColorType.solid)
	layout:setBackGroundColor(cc.c3b(0,0,0))
	layout:setBackGroundColorOpacity(120)
	layout:setAnchorPoint(cc.p(0.5,0.5))
	layout:setPosition(display.center)
	local winSize = cc.Director:getInstance():getWinSize()
	layout:setContentSize(winSize)
	layout:setTouchEnabled(true)
	layout:setTag(DialogManager.waittingTag)

	--local image = ccui.ImageView:create()
	--local image_loding = ccui.ImageView:create()
	--image:loadTexture("img_loading_ddzyh.png",ccui.TextureResType.plistType)
	--image_loding:loadTexture("img_loading2_ddzyh.png",ccui.TextureResType.plistType)
	--image:setPosition(cc.p(display.width/2,display.height/2+35))
	--image_loding:setPosition(cc.p(display.width/2,display.height/2+35))
	--layout:addChild(image)
	--layout:addChild(image_loding)

	--local actRep = cc.RepeatForever:create(cc.RotateBy:create(1,270))
	--image_loding:runAction(actRep)

	local labelStr = msg or "正在连接，请稍后..."
	local label = ccui.Text:create(labelStr, "YOUYUAN.TTF", 30)
	label:setPosition(cc.p(display.width/2,display.height/2 -35))
	layout:addChild(label)

	ExternalTools:loadingTxtDotAni(label)
	runningScene:addChild(layout,DialogManager.localZOrder,DialogManager.waittingTag)
end

-- 移除加载框
function removeWaiting(callBack)
	local runningScene = cc.Director:getInstance():getRunningScene()
	local watting = runningScene:getChildByTag(DialogManager.waittingTag)
	if watting then
		if callBack then
			watting:runAction(cc.Sequence:create(cc.CallFunc:create(callBack),cc.RemoveSelf:create()))
		else
			watting:runAction(cc.RemoveSelf:create())
		end
	end
end