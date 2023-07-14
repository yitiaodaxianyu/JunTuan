local _M = {}

-- return table 把json字符串转化为表
function _M.decode(str)
    if not str then return "" end
	return json.decode(str)
end
-- return jsonStr 把表转化为json字符串
function _M.encode(table)
    if not table then return "" end
	return json.encode(table)
end

JsonUtil = _M