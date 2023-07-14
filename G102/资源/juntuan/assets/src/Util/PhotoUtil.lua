local _M = {}

local platform = DeviceUtil.Platform()
local luaoc = require("src.cocos.cocos2d.luaoc")
local luaj = require("src.cocos.cocos2d.luaj")

-- 打开相册，选择一张相片返回 参数：是否裁剪flag(1裁剪)、裁剪大小(正方形)、返回图片地址、
function _M.OpenPhoto(flag, size, callback)
	if "ios" == platform then
		luaoc.callStaticMethod("PhotoUtil", "OpenPhoto", {flag = flag, size = size, callback = callback})
	elseif "android" == platform then
		local className = "com/lexun/common/PhotoHelper"
		local needCrop = flag or 0--0不裁切 1裁切
		local compressQuality = 0--压缩精度(0-100),0代表使用默认值70,越小越模糊
		local outputX,outputY = 0,0--裁切后的宽度，高度
		local callBackId = callback or 0--回调
		if size then
			outputX = size.width or 0
			outputY = size.height or 0
		end
		local args = {needCrop,compressQuality,outputX,outputY,callBackId}
		local sigs = "(IIIII)V"
		local ok = luaj.callStaticMethod(className,"openGalleryCheckPerm",args,sigs)
		if not ok then
            print("luaj error-OpenPhoto():")
        end
	end
end
-- 打开摄像头，拍照，并返回 参数：是否裁剪、裁剪大小(正方形)、返回图片地址、
function _M.OpenCamera(flag, size, callback)
	if "ios" == platform then
		luaoc.callStaticMethod("PhotoUtil", "OpenCamera", {flag = flag, size = size, callback = callback})
	elseif "android" == platform then
		local className = "com/lexun/common/PhotoHelper"
		local needCrop = flag or 0--0不裁切 1裁切
		local compressQuality = 0--压缩精度(0-100),0代表使用默认值70,越小越模糊
		local outputX,outputY = 0,0--裁切后的宽度，高度
		local callBackId = callback or 0--回调
		if size then
			outputX = size.width or 0
			outputY = size.height or 0
		end
		local args = {needCrop,compressQuality,outputX,outputY,callBackId}
		local sigs = "(IIIII)V"
		local ok = luaj.callStaticMethod(className,"openCameraCheckPerm",args,sigs)
		if not ok then
            print("luaj error-OpenCamera():")
        end
	end
end

return _M