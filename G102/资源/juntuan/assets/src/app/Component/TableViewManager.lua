---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2020/10/19 15:49
---

-- 根据listView生成tableView
local TableViewManager = class("TableViewManager")

function TableViewManager:ctor(listView, itemNum)
    self.listView = listView
    self.itemNum = itemNum

    self.listViewSize = self.listView:getContentSize()
    self.itemSizeTable = {}
end

-- 设置相关数据
-- listDataTable : 数据表
-- maxDataNum : 最大数据条数
-- isUseItemList : 是否使用模板列表
-- isUseOldItem : 是否复用老的item
function TableViewManager:setData(listDataTable, maxDataNum, isUseItemList, isUseOldItem)
    self.listDataTable = listDataTable
    self.maxDataNum = maxDataNum or #listDataTable
    self.isUseItemList = isUseItemList or false
    self.isUseOldItem = isUseOldItem or false
end

-- 更新数据
function TableViewManager:refreshData(data)
    table.insert(self.listDataTable, data)
    if #self.listDataTable > self.maxDataNum then
        -- 超过最大数据限制
        table.remove(self.listDataTable, 1)
    end
    self.itemNum = self.itemNum + 1
    local oldOff = self.tableView:getContentOffset()
    local oldSize = self.tableView:getContentSize()
    self.tableView:reloadData()
    local newSize = self.tableView:getContentSize()
    oldOff.y = oldOff.y - (newSize.height - oldSize.height)
    self.tableView:setContentOffset(oldOff)
end

-- 设置item模板
function TableViewManager:setItem(item)
    self.item = item
    self.item.size = item:getContentSize()
end

-- 有多个模板时, 设置模板列表
function TableViewManager:setItemTable(itemList)
    self.itemList = itemList
    if not self.item then
        self:setItem(self.itemList[1])
    end
end

-- 设置item初始化函数
function TableViewManager:setInitItemFunc(initItemFunc)
    if type(initItemFunc) ~= "function" then return end
    self.initItem = initItemFunc
end

-- 创建TableView
function TableViewManager:createTableView()
    local size = self.listViewSize
    local tableView = cc.TableView:create(size)
    --设置滚动方向
    tableView:setDirection(self.listView:getDirection())
    --竖直从上往下排列
    tableView:setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN)
    tableView:setDelegate()
    tableView:registerScriptHandler(handler(self, self.numberOfCell), cc.NUMBER_OF_CELLS_IN_TABLEVIEW)
    tableView:registerScriptHandler(handler(self, self.sizeForIndex), cc.TABLECELL_SIZE_FOR_INDEX)
    tableView:registerScriptHandler(handler(self, self.cellAtIndex), cc.TABLECELL_SIZE_AT_INDEX)
    tableView:registerScriptHandler(handler(self, self.cellTouchEnd), cc.TABLECELL_TOUCHED)
    tableView:registerScriptHandler(handler(self, self.scrollViewDidScroll), cc.SCROLLVIEW_SCRIPT_SCROLL)
    tableView:reloadData()
    self.tableView = tableView
    return tableView
end

-- 创建cell的数量
function TableViewManager:numberOfCell(tableView)
    --printf("ListViewManager:创建cell的数量, num is %d", self.itemNum)
    return self.itemNum
end

-- cell大小
function TableViewManager:sizeForIndex(tableView, index)
    local idx = index + 1
    local data = self.listDataTable[idx]
    local s = cc.size(0, 0)
    if data then
        s = data.itemSize or self.item.size
    end
    self.itemSizeTable[idx] = s
    --printf("ListViewManager:cell大小, index is %d, w is %.2f, h is %.2f", index, s.width, s.height)
    return s.width, s.height
end

-- cell初始化
function TableViewManager:cellAtIndex(tableView, index)
    local cell = tableView:dequeueCell()
    local idx = index + 1
    local data = self.listDataTable[idx]
    if not cell or not self.isUseOldItem then
        cell = cc.TableViewCell:new()
        if not data then return cell end
        local item
        if self.isUseItemList then
            local itemIdx = data.itemIdx or 1
            item = self.itemList[itemIdx]:clone()
        else
            item = self.item:clone()
        end
        item:show()
        item:setTag(999)
        item:setPosition(cc.p(0, 0))
        item:setAnchorPoint(0, 0)
        item:setSwallowTouches(false)
        cell:addChild(item)
        if self.initItem then
            self.initItem(item, data, idx)
        end
        --printf("ListViewManager:创建新的cell, idx is %d", index)
    else
        if not data then return cell end
        local item = cell:getChildByTag(999)
        if item then
            if self.initItem then
                self.initItem(item, data, idx)
            end
        end
        --printf("ListViewManager:复用老的cell, idx is %d", index)
    end
    return cell
end

-- cellTouchEnd事件
function TableViewManager:cellTouchEnd(tableView, cell)
    --local index = cell:getIdx()
    --printf("ListViewManager:itemTouchEnd, index is %d", index)
end

function TableViewManager:setScrollToTopCall(call)
    self.scrollToTopCall = call
end

-- scrollView滑动事件
function TableViewManager:scrollViewDidScroll(tableView)
    --[[local oldOff = tableView:getContentOffset()
    local size = tableView:getContentSize()
    local listViewSize = self.listViewSize
    local h = size.height
    local dis = h + oldOff.y
    if dis <= listViewSize.height then
        -- 滑动到了最顶部
        if self.scrollToTopCall then
            self.scrollToTopCall()
        end
    end]]
end

-- 跳转到指定index的cell
function TableViewManager:gotoCell(index, isAni)
    --self.tableView:setEnabled(false)
    local size = self.tableView:getContentSize()
    local listViewSize = self.listViewSize
    local off_y = -(size.height - listViewSize.height)
    if index > self.itemNum then
        index = self.itemNum
    end
    for i = 1, index - 1 do
        local h = self.itemSizeTable[i].height
        off_y = off_y + h
    end
    off_y = off_y > 0 and 0 or off_y
    local offset = self.tableView:getContentOffset()
    offset.y = off_y
    self.tableView:setContentOffset(offset, isAni)
    --self.tableView:setEnabled(true)
end

return TableViewManager