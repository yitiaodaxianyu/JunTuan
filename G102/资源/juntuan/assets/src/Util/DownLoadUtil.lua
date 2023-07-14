local _M = {}
-- 构造
function _M.new()
	local data = setmetatable({}, {__index = _M})
	data.downloader = cc.Downloader.new()
	return data
end
-- 设置回调
function _M:SetCall(successCall, failedCall, progressCall)
	self.downloader:setOnFileTaskSuccess(successCall)
    self.downloader:setOnTaskProgress(progressCall)
    self.downloader:setOnTaskError(failedCall)
end
-- 下载文件
function _M:LoadFile(url, savePath, identifier)
	self.downloader:createDownloadFileTask(url, savePath, identifier)
end

return _M