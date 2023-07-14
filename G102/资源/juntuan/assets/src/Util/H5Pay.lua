H5Pay = class("H5Pay")
local targetPlatform = cc.Application:getInstance():getTargetPlatform()
local wxUrl = "http://lypay.happysai.cn/clientpay/h5pay/lieyanwxpay.aspx"
local zfbUrl = "http://lypay.qipaicity.com/clientpay/h5pay/alipay.aspx"
function H5Pay.pay(index, name, payflag, newUrl)
    local function onSuccess(data)
        local pbObj = PBPayInterface_pb.PBClientPayOrderInfo()
        pbObj:ParseFromString(data)
        if 1 == pbObj.result then
            local rect = {x = 0,y = 0,width = 0,height = 0}
            print("H5Pay onSuccess",pbObj.urlprefix,pbObj.payurl,pbObj.usebrowser)
            if 1 == pbObj.usebrowser then
                ThirdManager.openUrl(pbObj.payurl)
            else
                WebViewManager.setWebRefererUrl(pbObj.urlprefix)
        		WebViewManager.showWebViewByFrame(pbObj.payurl, rect,"#c4ced8")
            end
        else
            if pbObj.outmsg and pbObj.outmsg ~= "" then
                showScaleTip(pbObj.outmsg)
            else
                showScaleTip("获取订单失败，请重新尝试。" .. "(" .. pbObj.result .. ")")
            end
        end
        removeWaiting()
	end
    local function onFailed()
        showScaleTip("获取订单失败，请稍后再尝试")
        removeWaiting()
    end
    local pbStr = PlatformManager.getOrder(index, name, payflag)
    local baseUrl = wxUrl
    if payflag == 2 then
        baseUrl = zfbUrl
    end
    local baseUrl = newUrl or baseUrl
    local url = string.format("%s?pbdata=%s", baseUrl, pbStr)
    print("H5Pay url:", url)
    HttpManager:PostRequest(url, onSuccess, onFailed)
    showWaiting()
end