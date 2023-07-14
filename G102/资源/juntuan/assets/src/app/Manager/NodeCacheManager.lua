local NodeCacheManager = class("NodeCacheManager")

function NodeCacheManager:ctor(para)
	self.cacheAry = {} --缓存数组
	self.nodeAry = {}
	self.otherCacheAry = {}
	self.otherNodeAry = {}
	self.nodeFunc = para.nodeFunc
end
-- 释放
function NodeCacheManager:dealloc()
	self:freeCache()
end
-- 获取缓存对象
function NodeCacheManager:getNode(isSelf)
	local node = nil
	if isSelf then
		if #self.cacheAry > 0 then
			node = self.cacheAry[1]
			table.remove(self.cacheAry, 1)
		else
			node = self.nodeFunc(isSelf)
			if node then node:retain() end
		end
		if node then table.insert(self.nodeAry, node) end
	else
		if #self.otherCacheAry > 0 then
			node = self.otherCacheAry[1]
			table.remove(self.otherCacheAry, 1)
		else
			node = self.nodeFunc(isSelf)
			if node then node:retain() end
		end
		if node then table.insert(self.otherNodeAry, node) end
	end
	print("NodeCacheManager:getNode",node)
	return node
end
-- 释放对象
function NodeCacheManager:freeNode(node)
	for i=1,#self.nodeAry do
		if node == self.nodeAry[i] then
			node:removeFromParent()
			table.remove(self.nodeAry, i)
			table.insert(self.cacheAry, node)
			break
		end
	end
	for i=1,#self.otherNodeAry do
		if node == self.otherNodeAry[i] then
			node:removeFromParent()
			table.remove(self.otherNodeAry, i)
			table.insert(self.otherCacheAry, node)
			break
		end
	end
end
function NodeCacheManager:freeCache()
	for _,v in pairs(self.cacheAry) do
		v:release()
	end
	for _,v in pairs(self.nodeAry) do
		v:removeFromParent()
		v:release()
	end
	for _,v in pairs(self.otherCacheAry) do
		v:release()
	end
	for _,v in pairs(self.otherNodeAry) do
		v:removeFromParent()
		v:release()
	end
	self.cacheAry = {}
	self.nodeAry = {}
	self.otherCacheAry = {}
	self.otherNodeAry = {}
end

return NodeCacheManager