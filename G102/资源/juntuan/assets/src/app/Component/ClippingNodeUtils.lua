--[[
-- 基于ClippingNode封装实现遮罩层
-- Author: Jacky
-- Date: 2014-11-26 9:30
]]
ClippingNodeUtils = class("ClippingNodeUtils")
--[[
添加editBox输入框
【参数说明】
parent:原输入框的父节点
old_com 原输入文本框
para：其他参数(设置了para则启用EditBox来显示，否则使用原输入文本框显示) 
（全为可选项）para = {isPassword,flag,mode,btnType,bgURL,isPlist,default,fontSize,order,len,foColor,bgColor,callBack}
	isPassword:是否密码框（自动设置flag和mode）
	flag:文本框显示模式(参数参见下面<INPUT_FLAG>)
	mode:文本框输入模式(参数参见下面<INPUT_MODE>)
	btnType: 弹出的输入键盘右下角按钮的显示文字（类型）(参数参见下面<RETURN_TYPE>)
	bgURL：文本框控件背景图（默认为登录框背景）
	isPlist: bgURL是否plist，默认不是
	fontSize: 文本大小
	foColor: 文本颜色
	default: 默认显示提示文本
	bgColor: 提示文本颜色
	order: 层叠次序（控件摆放顺序,默认与原输入控件同层）
	len: 最多允许输入长度（默认可以换行）
	callBack: 输入完成后的回调 (sender)
return：创建好的控件（已被添加到parent中）,场景结束时要在onExit中移除：ClippingNodeUtils:removeEditBox(..) (也会自动删除？)
flag 参数：<INPUT_FLAG>
cc.EDITBOX_INPUT_FLAG_PASSWORD 			设置密码框，表明输入的文本是保密的数据，任何时候都应该隐藏起来 它隐含了EDIT_BOX_INPUT_FLAG_SENSITIVE
cc.EDITBOX_INPUT_FLAG_SENSITIVE 		表明输入的文本是敏感数据， 它禁止存储到字典或表里面，也不能用来自动补全和提示用户输入。 一个信用卡号码就是一个敏感数据的例子。
cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_WORD 这个标志的作用是设置一个提示,在文本编辑的时候，是否把每一个单词的首字母大写。
cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE 		这个标志的作用是设置一个提示,在文本编辑，是否每个句子的首字母大写。
cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS 	自动把输入的所有字符大写。
mode 参数：<INPUT_MODE>
cc.EDITBOX_INPUT_MODE_ANY 				用户可以输入任何文本,包括换行符。
cc.EDITBOX_INPUT_MODE_SINGLELINE 		除了换行符以外，用户可以输入任何文本,
cc.EDITBOX_INPUT_MODE_EMAIL_ADDRESS 	允许用户输入一个电子邮件地址。
cc.EDITBOX_INPUT_MODE_NUMERIC 			允许用户输入一个整数值。
cc.EDITBOX_INPUT_MODE_PHONE_NUMBER 		允许用户输入一个电话号码。
cc.EDITBOX_INPUT_MODE_URL 				允许用户输入一个URL。
cc.EDITBOX_INPUT_MODE_DECIMAL 			允许用户输入一个实数 通过允许一个小数点扩展了kEditBoxInputModeNumeric模式
btnType 参数：<RETURN_TYPE>
cc.KEYBOARD_RETURNTYPE_DEFAULT 			弹出的键盘右下角按钮显示“确定”
cc.KEYBOARD_RETURNTYPE_DONE				弹出的键盘右下角按钮显示“完成”
cc.KEYBOARD_RETURNTYPE_SEND				弹出的键盘右下角按钮显示“发送”
cc.KEYBOARD_RETURNTYPE_SEARCH			弹出的键盘右下角按钮显示“搜索”
cc.KEYBOARD_RETURNTYPE_GO				弹出的键盘右下角按钮显示“确定”
]]
--[[example
self.a_user = ClippingNodeUtils:getEditBox(self.A_user_name_bg,self.A_username_input,{default="请输入账号",len=20,fontSize=25,foColor=cc.c3b(240,240,240)})
self.a_password = ClippingNodeUtils:getEditBox(self.A_user_password_bg,self.A_userpw_input,{default="请输入密码",isPassword=true,len=10,fontSize=25,foColor=cc.c3b(240,240,240)})
self.b_user = ClippingNodeUtils:getEditBox(self.B_user_name_bg,self.B_username_input,{default="请输入手机号",mode=cc.EDITBOX_INPUT_MODE_NUMERIC,len=11,fontSize=25,foColor=cc.c3b(238,198,121)})
self.b_ycode = ClippingNodeUtils:getEditBox(self.B_user_password_bg,self.B_userpw_input,{default="请输入验证码",mode=cc.EDITBOX_INPUT_MODE_NUMERIC,len=6,fontSize=25,foColor=cc.c3b(238,198,121)})
self.c_password1 = ClippingNodeUtils:getEditBox(self.C_user_name_bg,self.C_username_input,{default="请输入新密码",len=10,fontSize=25,foColor=cc.c3b(238,198,121)})
self.c_password2 = ClippingNodeUtils:getEditBox(self.C_user_password_bg,self.C_userpw_input,{default="请再输入一遍",len=10,fontSize=25,foColor=cc.c3b(238,198,121)})
]]
function ClippingNodeUtils:getEditBox(parent,old_com,para)
	local useNewStyle = false
	if para then useNewStyle = true end
	para = para or {}
	para.bgURL = para.bgURL or ""
	local new_com = nil

	old_com:setTouchEnabled(false)
	local size,po = old_com:getContentSize(),cc.p(old_com:getPosition())
	local imgType = ccui.TextureResType.localType
	if para.isPlist then imgType = ccui.TextureResType.plistType end
	new_com = ccui.EditBox:create(size, para.bgURL, imgType)
    new_com:setPosition(po)
    if para.fontSize then
    	new_com:setFontSize(para.fontSize)
    	new_com:setPlaceholderFontSize(para.fontSize)
    else
    	if old_com.getFontSize then
    		new_com:setFontSize(old_com:getFontSize())
    		new_com:setPlaceholderFontSize(old_com:getFontSize())
    	end
    end
    if para.foColor then
    	new_com:setFontColor(para.foColor)
    	if not para.bgColor then new_com:setPlaceholderFontColor(para.foColor) end
    elseif old_com.getTextColor then
    	new_com:setFontColor(old_com:getTextColor())
    end
    if para.bgColor then
    	if not para.foColor then new_com:setFontColor(para.bgColor) end
    	new_com:setPlaceholderFontColor(para.bgColor)
    elseif old_com.getPlaceHolderColor then
    	new_com:setPlaceholderFontColor(old_com:getPlaceHolderColor())
    end
    if para.order then new_com:setLocalZOrder(para.order)
    else
    	new_com:setLocalZOrder(old_com:getLocalZOrder())
    end
    if para.default then
	    new_com:setPlaceHolder(para.default or "")
	else
		new_com:setPlaceHolder(old_com:getPlaceHolder())
	end
    if para.flag then new_com:setInputFlag(para.flag)
    else new_com:setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE) end
    if para.mode then new_com:setInputMode(para.mode)
    else new_com:setInputMode(cc.EDITBOX_INPUT_MODE_URL) end
    if para.isPassword or (old_com.isPasswordEnabled and old_com:isPasswordEnabled()) then
	    new_com:setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD)
	    new_com:setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
    end
    if para.btnType then new_com:setReturnType(para.btnType)
    else new_com:setReturnType(cc.KEYBOARD_RETURNTYPE_DONE) end
    if para.len then
    	new_com:setMaxLength(para.len)
	elseif old_com:isMaxLengthEnabled() then
		new_com:setMaxLength(old_com:getMaxLength())
    end
    if para.callBack and type(para.callBack) == "function" then new_com.callBack = para.callBack end
    new_com.useNewStyle = useNewStyle
	--new_com:registerScriptEditBoxHandler(editBoxTextEventHandle)
	new_com:setTouchEnabled(true)
	parent:addChild(new_com)
    if useNewStyle then old_com:setVisible(false) end
    return new_com
end

-- 重设ccui.TextField为cc.EditBox
function ClippingNodeUtils:resetEditBox(plInput, oldUI, para)
	para = para or {}
	local renderData = plInput:getRenderFile()
	local newUI = ccui.EditBox:create(para.size or plInput:getContentSize(), renderData.file, renderData.type)
	newUI:setAnchorPoint(oldUI:getAnchorPoint())
	newUI:setPosition(oldUI:getPosition())
	newUI:setFontSize(oldUI:getFontSize())
	newUI:setPlaceholderFontSize(oldUI:getFontSize())
	newUI:setFontColor(oldUI:getTextColor())
	newUI:setPlaceholderFontColor(oldUI:getPlaceHolderColor())
	newUI:setLocalZOrder(oldUI:getLocalZOrder())
	newUI:setPlaceHolder(oldUI:getPlaceHolder())
	if oldUI:isMaxLengthEnabled() then
		newUI:setMaxLength(oldUI:getMaxLength())
	end
	newUI:setFontName(oldUI:getFontName())

	if para.flag then
		newUI:setInputFlag(para.flag)
	else
		newUI:setInputFlag(cc.EDITBOX_INPUT_FLAG_SENSITIVE)
	end
	if para.mode then
		newUI:setInputMode(para.mode)
	else
		newUI:setInputMode(cc.EDITBOX_INPUT_MODE_URL)
	end
	if para.isPassword or oldUI:isPasswordEnabled() then
		newUI:setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD)
		newUI:setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
	end
	if para.btnType then
		newUI:setReturnType(para.btnType)
	else
		newUI:setReturnType(cc.KEYBOARD_RETURNTYPE_DONE)
	end
	-- new_com:setTouchEnabled(true)
	plInput:addChild(newUI)

	oldUI:removeFromParent()
	return newUI
end

function ClippingNodeUtils:removeEditBox(box)
	if 1 then return end
	if box then
		box:unregisterScriptEditBoxHandler()
	end
end

-- 生成全屏蒙版用于阴影效果
function ClippingNodeUtils:initScreenShadow(color)
	local para = {
		startW = 0,
		startH = 0,
		width = display.width,
		height = display.height,
		colour = color or cc.c4f(0, 0, 0, 0.8)
	}
	local shadow = ClippingNodeUtils:createRectangleStencil(para)
	return shadow
end
-- 创建可裁剪的节点用于指定区域显示
function ClippingNodeUtils:createClippingNode(size, pos)
	local clipper = cc.ClippingNode:create()
	clipper.size = size
	clipper:setContentSize(size)
	clipper:setAnchorPoint(cc.p(0,0))
	if pos then clipper:setPosition(pos) end
	return clipper
end
-- 创建矩形区域
function ClippingNodeUtils:createRectangleStencil(para)
	local stencil = cc.DrawNode:create()
	local rectanglePoints = {
		cc.p(para.startW, para.startH),
		cc.p(para.width, para.startH),
		cc.p(para.width, para.height),
		cc.p(para.startW, para.height)
	}
	stencil:drawPolygon(rectanglePoints, 4, para.colour, 0, para.colour)
	return stencil
end	

-- 创建圆形区域
function ClippingNodeUtils:createCircleStencil(para)
	local stencil = cc.DrawNode:create()
	stencil:drawSolidCircle(cc.p(0,0),para.radius,360,para.pointsNum,1,1,para.colour)

	return stencil
end

--[[创建圆形图片
	parent 父节点
	nodeOra 图片精灵重构
	poNum 圆形精细度（数值越大越圆，同时处理效率越低）
	margin 环边距(半径缩小的像素)（需要缩小的大小，默认0  如果设为2 则半径缩小2像素）
	return:
	node：可以操纵的处于遮罩中的源对象

	例程：
    local head_img = self.userPanel:getChildByName("head_icon"):getChildByName("avater_bg")     -- 传入的对象可以是sprite或imageview
    local cpNode,node = ClippingNodeUtils:createCircle(head_img,100,2)  -- imageview,精细度,缩小图片多大
    self.userPanel:getChildByName("head_icon"):addProtectedChild(cpNode) -- 将处理好的遮罩对象添加到父节点
    self.roleImage = node  -- 返回的对象可以被操纵，该对象位于遮罩中 self.roleImage:loadTexture
]]
function ClippingNodeUtils:createCircle(parent,nodeOra,poNum,margin,maskImage,maskScale,maskPy)
	local node = nodeOra:clone()
	nodeOra:setVisible(false)
	local size = node:getContentSize()
	local pox,poy = node:getPosition()
	local ax,ay = node:getAnchorPoint()
	-- 取较小边为半径
	local cRadius = (size.width < size.height and size.width or size.height) / 2
	margin = margin or 0
	cRadius = cRadius - margin
	poNum = poNum or 50
	local cAngle = math.rad(360/poNum)
	local stencil = self:createCircleStencil({
			pointsNum = poNum,
			radius = cRadius,
			angle = cAngle,
			colour = cc.c4f(0,0,0,0),
			})
	local cpNode = self:createClippingNode(size,cc.p(pox,poy))
	cpNode:setStencil(stencil)
	cpNode:setInverted(false)
	node:setAnchorPoint(0.5,0.5)
	node:setPosition(0,0)
	cpNode:addChild(node)
	cpNode:setPosition(cc.p(pox,poy))
	parent:setClippingType(1)
	parent:setContentSize(size.width+margin,size.height+margin)
	parent:addChild(cpNode)
	-- parent:getTexture():setAntiAliasTexParameters()
	if maskImage then
		maskScale = maskScale or 0.96
		if type(maskPy) == "number" then
			maskPy = cc.p(maskPy,maskPy)
		end
		maskPy = maskPy or cc.p(-0.1,-0.1)
		local po = cc.p(size.width / 2 + maskPy.x,size.height / 2 + maskPy.y)
		maskImage:removeFromParent(false)
		parent:addChild(maskImage)
		maskImage:setPosition(po)
		maskImage:setScale(maskScale)
	end
	return node
end