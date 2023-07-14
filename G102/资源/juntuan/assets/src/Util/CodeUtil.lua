local _M = {}

local desKey = ""-- 默认DES密钥
-- MD5加密 data加密数据 返回加密后数据
function _M.MD5(data)
	return CodeManager.MD5(data)
end
-- DES加密 data加密数据 key密钥 返回加密后数据
function _M.DESEncrypt(data, key)
	return CodeManager.DESEncrypt(data, key or desKey)
end
-- DES解密  data解密数据 key密钥 返回解密后数据
function _M.DESDecrypt(data, key)
	return CodeManager.DESDecrypt(data, key or desKey)
end

CodeUtil = _M