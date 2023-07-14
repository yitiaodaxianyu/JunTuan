local _M = {}
local obj = nil

local UilCfg = {}
if NET_FLAG_IS_LOCAL then
    -- 本地
    UilCfg = {
        bindPhone = "http://172.16.0.150:8080/home/binding.aspx",            -- 绑定模块
        login = "http://172.16.0.150:8080/home/logon.aspx",                  -- 登录模块
        zfbUrl = "http://dzz.junqihuyu.com/clientpay/h5pay/alipay_create.aspx", -- 支付宝支付
        wxUrl = "http://dzz.junqihuyu.com/clientpay/h5pay/wxpay_create.aspx",   -- 微信支付
        payJson = "http://dzz.junqihuyu.com/home/gameconfig.aspx",              -- 支付配置请求
        versionUrl = "http://dzz.junqihuyu.com/home/appversioncheck.aspx",      -- 版本检测
        uploadErrUrl = "http://172.16.0.150:8080/home/sys/upload_error.aspx",      -- 上传报错信息
        userActUpload = "http://dzz.junqihuyu.com/home/sys/upload_event.aspx",      -- 用户行为上报
    }
else
    UilCfg = {
        bindPhone = "http://dzz.junqihuyu.com/home/binding.aspx",
        login = "http://dzz.junqihuyu.com/home/logon.aspx",
        zfbUrl = "http://dzz.junqihuyu.com/clientpay/h5pay/alipay_create.aspx",
        wxUrl = "http://dzz.junqihuyu.com/clientpay/h5pay/wxpay_create.aspx",
        payJson = "http://dzz.junqihuyu.com/home/gameconfig.aspx",
        versionUrl = "http://dzz.junqihuyu.com/home/appversioncheck.aspx",
        uploadErrUrl = "http://dzz.junqihuyu.com/home/sys/upload_error.aspx",      -- 上传报错信息
        userActUpload = "http://dzz.junqihuyu.com/home/sys/upload_event.aspx",      -- 用户行为上报
    }
end

-- 单例
function _M.Shared()
    if not obj then
        obj = setmetatable({}, {__index = _M})
        --obj:Init()
    end
    return obj
end

function _M:Init()

end

--注册账号
function _M:RegisterAccountReq(pb,successCallBack, failCallBack)
    local struct_PB = PBLandlord_pb.PBAccountAddReq()
    struct_PB.account = pb.act
    struct_PB.password = pb.pwd
    struct_PB.machineid = pb.machineid --DeviceUtil.IMEI()
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBAccountAdd.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------注册账号")
    print("PBAccountAddReq.account",struct_PB.account)
    print("PBAccountAddReq.password",struct_PB.password)
    print("PBAccountAddReq.machineid",struct_PB.machineid)
end

--请求获取修改密码验证码
function _M:PwdVcodeReq(pb,successCallBack, failCallBack)
    local struct_PB = PBLandlord_pb.PBPwdVcodeReq()
    struct_PB.account = pb.act
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBPwdVcode.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求获取修改密码验证码")
    print("PBPwdVcodeReq.account",struct_PB.account)
end

--请求获取绑定手机验证码
function _M:BindVcodeReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBBindVcodeReq()
    struct_PB.userid = pb.userid
    struct_PB.phone = pb.phone
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBBindVcode.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求获取绑定手机验证码")
    print("PBBindVcodeReq.userid",struct_PB.userid)
    print("PBBindVcodeReq.phone",struct_PB.phone)
end

--请求获取解绑手机验证码
function _M:UnbindVcodeReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBUnbindVcodeReq()
    struct_PB.userid = pb.userid
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBUnbindVcode.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求获取解绑手机验证码")
    print("PBUnbindVcodeReq.userid",struct_PB.userid)
end

--请求获取修改安全密码验证码
function _M:InsureVcodeReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBInsureVcodeReq()
    struct_PB.userid = pb.userid
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBInsureVcode.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求获取修改安全密码验证码")
    print("PBInsureVcodeReq.userid",struct_PB.userid)
end

--请求绑定手机
function _M:AccountBindPhoneReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBAccountBindPhoneReq()
    struct_PB.userid = pb.userid
    struct_PB.validatecode = pb.validatecode
    struct_PB.mobile = pb.mobile
    struct_PB.vcode = pb.vcode
    struct_PB.machineid = pb.machineid
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBAccountBindPhone.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求绑定手机")
    print("PBAccountBindPhoneReq.userid",struct_PB.userid)
    print("PBAccountBindPhoneReq.validatecode",struct_PB.validatecode)
    print("PBAccountBindPhoneReq.mobile",struct_PB.mobile)
    print("PBAccountBindPhoneReq.vcode",struct_PB.vcode)
    print("PBAccountBindPhoneReq.machineid",struct_PB.machineid)
end

--请求解绑手机
function _M:AccountUnBindPhoneReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBAccountUnBindPhoneReq()
    struct_PB.userid = pb.userid
    struct_PB.vcode = pb.vcode
    struct_PB.machineid = pb.machineid
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBAccountUnBindPhone.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求解绑手机")
    print("PBAccountUnBindPhoneReq.userid",struct_PB.userid)
    print("PBAccountUnBindPhoneReq.vcode",struct_PB.vcode)
    print("PBAccountUnBindPhoneReq.machineid",struct_PB.machineid)
end

--请求用户通过手机修改密码
function _M:AccountFindPasswordReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBAccountFindPasswordReq()
    struct_PB.account = pb.act
    struct_PB.password = pb.pwd
    struct_PB.vcode = pb.vcode
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBAccountFindPassword.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求用户通过手机修改密码")
    print("PBAccountFindPasswordReq.account",struct_PB.account)
    print("PBAccountFindPasswordReq.password",struct_PB.password)
    print("PBAccountFindPasswordReq.vcode",struct_PB.vcode)
end

--请求修改安全密码
function _M:InsurePassReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBInsurePassReq()
    struct_PB.userid = pb.userid
    struct_PB.vcode = pb.vcode
    struct_PB.insurepass = pb.insurepass
    struct_PB.machineid = pb.machineid
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBInsurePass.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------请求修改安全密码")
    print("PBInsurePassReq.userid",struct_PB.userid)
    print("PBInsurePassReq.vcode",struct_PB.vcode)
    print("PBInsurePassReq.insurepass",struct_PB.insurepass)
    print("PBInsurePassReq.machineid",struct_PB.machineid)
end

--游客绑定账号密码
function _M:AccountChangeReq(pb,successCallBack,failCallBack)
    local struct_PB = PBLandlord_pb.PBAccountChangeReq()
    struct_PB.userid = pb.userid
    struct_PB.validatecode = pb.validatecode
    struct_PB.account = pb.act
    struct_PB.password = pb.pwd
    struct_PB.machineid = pb.machineid
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uil = string.format("http://www.hzunits.com/landlord/PBAccountChange.aspx?pbdata=%s",data)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
    print("--------游客绑定账号密码")
    print("PBAccountChangeReq.userid",struct_PB.userid)
    print("PBAccountChangeReq.validatecode",struct_PB.validatecode)
    print("PBAccountChangeReq.password",struct_PB.password)
    print("PBAccountChangeReq.machineid",struct_PB.machineid)
end

--游戏版本号请求
function _M:GameVersionReq(uil,successCallBack,failCallBack)
    HttpUtil.GetRequest(uil,successCallBack,failCallBack)
end


---------- 军团大作战 ----------

-- 获取pbbase
function _M:getPbBase(pb)
    local struct_PB = HttpInterfacePB_pb.PBBaseInfo()
    if pb.userId ~= nil then
        struct_PB.userId = pb.userId
    end
    if pb.userToken ~= nil then
        struct_PB.userToken = pb.userToken
    end
    if pb.account ~= nil then
        struct_PB.account = pb.account
    end
    if pb.machineId ~= nil then
        struct_PB.machineId = pb.machineId
    end
    if pb.userGuid ~= nil then
        struct_PB.userGuid = pb.userGuid
    end
    if pb.channelId ~= nil then
        struct_PB.channelId = pb.channelId
    end
    if pb.phoneMode ~= nil then
        struct_PB.phoneMode = pb.phoneMode
    end
    if pb.phoneSN ~= nil then
        struct_PB.phoneSN = pb.phoneSN
    end
    if pb.isPhone ~= nil then
        struct_PB.isPhone = pb.isPhone
    end
    if pb.oaId ~= nil then
        struct_PB.oaId = pb.oaId
    end
    if pb.androidId ~= nil then
        struct_PB.androidId = pb.androidId
    end
    if pb.version ~= nil then
        struct_PB.version = pb.version
    end
    if pb.platform ~= nil then
        struct_PB.platform = pb.platform
    end
    if pb.bigVersion ~= nil then
        struct_PB.bigVersion = pb.bigVersion
    end
    self.pbbaseData = struct_PB
    self.pbbase = Base64Util.encode(struct_PB:SerializeToString())
end

function _M:resetPbBase()
    self.pbbase = Base64Util.encode(self.pbbaseData:SerializeToString())
end

-- 请求验证码
function _M:sendReqVCode(pb, successCallBack, failCallBack)
    local struct_PB = HttpInterfacePB_pb.PBLogonReq()
    struct_PB.mobile = pb.mobile
    struct_PB.opType = 0

    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uilHead = UilCfg.login
    if pb.flag == 2 then
        struct_PB = HttpInterfacePB_pb.PBBindPhoneReq()
        struct_PB.opType = 0
        struct_PB.userId = UserData.Shared().dwUserID
        struct_PB.userToken = UserData.Shared().szValidCode
        struct_PB.mobile = pb.mobile
        uilHead = UilCfg.bindPhone
        data = Base64Util.encode(struct_PB:SerializeToString())
    end
    local httpUil =  uilHead .. "?pbdata=%s&pbbase=%s"
    local uil = string.format(httpUil, data, self.pbbase)
    HttpUtil.GetRequest(uil, successCallBack, failCallBack)
    print("-------- 请求验证码 --------")
    print("PBLogonReq.mobile is", struct_PB.mobile)
    print("-------- 请求验证码 --------")
end

-- 请求手机登录
function _M:sendPhoneLogin(pb, successCallBack, failCallBack)
    local struct_PB = HttpInterfacePB_pb.PBLogonReq()
    struct_PB.mobile = pb.mobile
    struct_PB.opType = 1
    struct_PB.vcode = pb.vcode

    self.pbbaseData.account = CodeUtil.MD5(pb.mobile)
    self:resetPbBase()
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uilHead = UilCfg.login
    local httpUil =  uilHead .. "?pbdata=%s&pbbase=%s"
    local uil = string.format(httpUil, data, self.pbbase)
    HttpUtil.GetRequest(uil, successCallBack, failCallBack)
    print("-------- 请求手机登录 --------")
    print("PBLogonReq.mobile", struct_PB.mobile)
    print("PBLogonReq.vcode", struct_PB.vcode)
    print("-------- 请求手机登录 --------")
end

-- 请求绑定解绑手机
function _M:sendPhoneBind(pb, successCallBack, failCallBack)
    local struct_PB = HttpInterfacePB_pb.PBBindPhoneReq()
    struct_PB.userId = pb.userId
    struct_PB.userToken = pb.userToken
    struct_PB.mobile = pb.mobile
    struct_PB.opType = pb.opType
    struct_PB.vcode = pb.vcode

    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uilHead = UilCfg.bindPhone
    local httpUil =  uilHead .. "?pbdata=%s&pbbase=%s"
    local uil = string.format(httpUil, data, self.pbbase)
    HttpUtil.GetRequest(uil, successCallBack, failCallBack)
    print("-------- 请求绑定解绑手机 --------")
    print("PBLogonReq.userId", struct_PB.userId)
    print("PBLogonReq.userToken", struct_PB.userToken)
    print("PBLogonReq.mobile", struct_PB.mobile)
    print("PBLogonReq.opType", struct_PB.opType)
    print("PBLogonReq.vcode", struct_PB.vcode)
    print("-------- 请求绑定解绑手机 --------")
end

-- 请求支付json配置
function _M:sendGameJsonCfg(pb, successCallBack, failCallBack)
    local struct_PB = HttpInterfacePB_pb.PBNullable()
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uilHead = UilCfg.payJson
    local httpUil =  uilHead .. "?pbdata=%s&pbbase=%s"
    local uil = string.format(httpUil, data, self.pbbase)
    HttpUtil.GetRequest(uil, successCallBack, failCallBack)
    print("-------- 请求支付json配置 --------")
end

-- h5支付
function _M:H5Pay(index, name, payflag, newUrl)
    local function onSuccess(data)
        local pbObj = PBPayInterface_pb.PBClientPayOrderInfo()
        pbObj:ParseFromString(data)
        local scene = SceneManager.Shared():GetRunningScene()
        performWithDelay(scene, function ()
            removeWaiting()
        end, 3)
        if 1 == pbObj.result then
            print("H5Pay onSuccess",pbObj.urlprefix,pbObj.payurl,pbObj.usebrowser)
            WebViewUtil.DoHfivePay(pbObj.payurl)
        else
            if pbObj.outmsg and pbObj.outmsg ~= "" then
                GameTool:showTxtTip(pbObj.outmsg)
            else
                GameTool:showTxtTip("获取订单失败，请重新尝试。" .. "(" .. pbObj.result .. ")")
            end
        end
    end
    local function onFailed()
        GameTool:showTxtTip("获取订单失败，请稍后再尝试")
        removeWaiting()
    end
    local pbStr = self:getOrder(index, name, payflag)
    local baseUrl = UilCfg.wxUrl
    if payflag == 2 then
        baseUrl = UilCfg.zfbUrl
    end
    local baseUrl = newUrl or baseUrl
    local url = string.format("%s?pbdata=%s&pbbase=%s", baseUrl, pbStr, self.pbbase)
    print("H5Pay url:", url)
    HttpUtil.GetRequest(url, onSuccess, onFailed)
    showWaiting()
end

-- 获取订单
function _M:getOrder(productID, identity, payflag)
    local  pbData = PBPayInterface_pb.PBBuyProductParams()
    pbData.userid = UserData.Shared().dwUserID
    pbData.productid = productID --和服务器约定的商品id
    if identity then pbData.identity = identity end

    local targetPlatform = cc.Application:getInstance():getTargetPlatform()
    pbData.platform = 1
    if cc.PLATFORM_OS_IPHONE == targetPlatform or cc.PLATFORM_OS_IPAD == targetPlatform then
        pbData.platform = 2
    end
    pbData.channelid = QDChannel
    pbData.phonemode = DeviceUtil.DeviceModel() or ""
    pbData.imei = DeviceUtil.IMEI()
    pbData.phonesn = DeviceUtil.SerialNum() or ""
    if DeviceUtil.IsRealDevice() then
        pbData.isphone = 1
    else
        pbData.isphone = 0
    end
    if payflag then pbData.payflag = payflag end
    return Base64Util.encode(pbData:SerializeToString())
end

-- 版本检测
function _M:sendVersionCheck(pb, successCallBack, failCallBack)
    local struct_PB = HttpInterfacePB_pb.PBAppVersionReq()
    struct_PB.apptype = pb.apptype
    struct_PB.gameid = pb.gameid
    struct_PB.platform = pb.platform
    local data = Base64Util.encode(struct_PB:SerializeToString())
    local uilHead = UilCfg.versionUrl
    local httpUil =  uilHead .. "?pbdata=%s&pbbase=%s"
    local uil = string.format(httpUil, data, self.pbbase)
    HttpUtil.GetRequest(uil, successCallBack, failCallBack)
    print("-------- 版本检测 --------")
end

-- 上传报错信息
function _M:sendUploadErrInfo(pb, filePath, successCallBack, failCallBack)
    local userId = pb.userid
    local QDChannel = pb.QDChannel
    local APP_VERSION = pb.APP_VERSION
    local imei = pb.imei
    local mobileModel = pb.mobileModel
    local serialNum = pb.serialNum
    local isPhone = pb.isPhone
    local str = io.readfile(filePath)
    if str ~= "" then
        str = encodeURI(str)
        local url = UilCfg.uploadErrUrl
        local body = string.format("userid=%d&channelid=%d&version=%s&imei=%s&phonemode=%s&phonesn=%s&isphone=%d&content=%s",
                userId, QDChannel, APP_VERSION, imei, mobileModel, serialNum, isPhone, str)
        HttpUtil.PostRequest(url, body, successCallBack, failCallBack)
        print("-------- 上传报错信息 --------")
    end
end

-- 用户行为上报
function _M:sendUserAction(pb)
    local userId = UserData.Shared().dwUserID
    local eventid = pb.userAct.eventID
    local eventname = pb.userAct.eventName
    local remark = pb.remark or ""
    local eventpara1 = pb.eventpara1 or ""
    local eventpara2 = pb.eventpara2 or ""
    local eventpara3 = pb.eventpara3 or ""
    local eventpara4 = pb.eventpara4 or ""
    local eventpara5 = pb.eventpara5 or ""
    local eventpara6 = pb.eventpara6 or ""
    local extra = pb.extra or ""

    local function successCallBack()
        print("用户行为上报成功")
    end

    local function failCallBack()
        print("用户行为上报失败")
    end

    local url = UilCfg.userActUpload
    local para1 = "userid=%d&eventid=%d&eventname=%s&remark=%s&eventpara1=%s&eventpara2=%s"
    local para2 = "&eventpara3=%s&eventpara4=%s&eventpara5=%s&eventpara6=%s&extra=%s"
    local para = para1 .. para2
    local body = string.format(para,
            userId, eventid, eventname, remark, eventpara1, eventpara2,
            eventpara3, eventpara4, eventpara5, eventpara6, extra
    )
    HttpUtil.PostRequest(url, body, successCallBack, failCallBack)
    print("-------- 用户行为上报 --------")
end

HttpManager = _M