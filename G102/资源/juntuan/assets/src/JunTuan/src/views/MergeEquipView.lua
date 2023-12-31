---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2021/6/1 11:50
---

-- 合成装备展示界面
local MergeEquipView = class("MergeEquipView", ViewBase)

function MergeEquipView:ctor(para)
    self:enableNodeEvents()
    self:initData(para)
end

function MergeEquipView:onEnter()
    self:initView()
    self:addNotify()
end

function MergeEquipView:initData(para)
    self.curData = para.curData
    self.nextData = para.nextData or para.curData
end

function MergeEquipView:initView()
    local para = {
        csb = JunTuanCfg.csbCfg.heroView.hero_merge,
        setSize = true
    }
    local ui = ViewBase:createCSB(para)
    self:addChild(ui)

    local panel_black = ui:getChildByName("Panel_black")
    local panel_main = panel_black:getChildByName("Panel_main"):hide()
    local panel_equip_1 = panel_black:getChildByName("Panel_equip_1")
    local panel_equip_2 = panel_black:getChildByName("Panel_equip_2")
    local panel_list = panel_main:getChildByName("Panel_list")
    local panel_tip_1 = panel_main:getChildByName("Panel_tip_1")
    local panel_tip_2 = panel_main:getChildByName("Panel_tip_2")
    self.panel_main = panel_main
    self:initMergeEquip(panel_equip_1)
    self:initMergeEquip(panel_equip_2)
    self:initPanelEquip(panel_list)
    self:initPanelTip1(panel_tip_1)
    self:initPanelTip2(panel_tip_2)
    self:showMergeAni(panel_equip_1, panel_equip_2)
    local btn_ok = panel_main:getChildByName("btn_ok")
    local btn_close = panel_main:getChildByName("btn_close")
    local function btnCall()
        self:removeFromParent(true)
    end
    ExternalTools:addBtnTouchEventListener(btn_ok, btnCall)
    ExternalTools:addBtnTouchEventListener(btn_close, btnCall)
end

function MergeEquipView:initMergeEquip(panel)
    local equipId = self.curData.equipId
    GameTool:setEquipImgById(equipId, panel)
end

function MergeEquipView:setEquipDes(item, equipLevel)
    local txt_tip = item:getChildByName("Text_tip")
    if txt_tip then
        local des = GameTool:getEquipColorStr(equipLevel)
        des = des .. GameTool:getEquipLevelStr(equipLevel)
        txt_tip:setString(des)
    end
end

function MergeEquipView:initPanelEquip(panel)
    local panel_item = panel:getChildByName("Panel_item")
    local panel_item_l = panel:getChildByName("Panel_item_l")
    local panel_item_r = panel:getChildByName("Panel_item_r")
    local panel_equip = panel_item:getChildByName("Panel_equip")
    local panel_equip_l = panel_item_l:getChildByName("Panel_equip")
    local panel_equip_r = panel_item_r:getChildByName("Panel_equip")

    local roleId = self.curData.roleId
    local equipType = self.curData.equipType
    local txt_equip = panel_item:getChildByName("Text_equip")
    local data = GameTool:getEquipTxtInfo(roleId, equipType)
    local name = data.equipStr
    local job = data.roleStr
    txt_equip:setString(string.format("%s(%s)", name, job))

    GameTool:setEquipImgById(self.nextData.equipId, panel_equip)
    GameTool:setEquipImgById(self.curData.equipId, panel_equip_l)
    GameTool:setEquipImgById(self.curData.equipId, panel_equip_r)

    self:setEquipDes(panel_item, self.nextData.equipRank)
    self:setEquipDes(panel_item_l, self.curData.equipRank)
    self:setEquipDes(panel_item_r, self.curData.equipRank)
end

-- 主属性
function MergeEquipView:initPanelTip1(panel)
    local panel_detail = panel:getChildByName("Panel_detail")
    local txt_cur = panel_detail:getChildByName("Text_detail_1")
    local txt_next = panel_detail:getChildByName("Text_detail_2")
    local curAtk = self.curData.mainValue
    local nextAtk = self.nextData.mainValue
    txt_cur:setString("+" .. curAtk)
    txt_next:setString("+" .. nextAtk)
end

function MergeEquipView:setTxtSubValue(txt, roleId, subValue, subType)
    local subNum = subValue * 100
    local equipIdx = self.nextData.equipType
    local str = GameTool:getSpecialDesStr(subType)
    if (roleId == 2 and equipIdx == 3) or (roleId == 4 and equipIdx == 1)
            or (roleId == 6 and equipIdx == 1) then
        subNum = subValue
    end
    txt:setString("+" .. GameTool:setAutoDotNum(subNum) .. str)
end

-- 副属性
function MergeEquipView:initPanelTip2(panel)
    local panel_detail = panel:getChildByName("Panel_detail")
    local txt_cur = panel_detail:getChildByName("Text_detail_1")
    local txt_next = panel_detail:getChildByName("Text_detail_2")
    local txt_title = panel_detail:getChildByName("Text_title")
    local txt_tip = panel_detail:getChildByName("Text_tip")

    local curAtk = self.curData.subValue
    local nextAtk = self.nextData.subValue
    txt_cur:setString("+" .. curAtk)
    local roleId = self.curData.roleId
    local subType = self.curData.subType
    self:setTxtSubValue(txt_cur, roleId, curAtk, subType)
    self:setTxtSubValue(txt_next, roleId, nextAtk, subType)
    local des = GameTool:getAttribute(subType)
    txt_title:setString(des .. ":")
    local valueDes = GameTool:getValueDes(self.curData.subType)
    txt_tip:setString(string.format("(%s)", valueDes))
    ExternalTools:txtAutoWidth(txt_tip, 500)
end

-- 合成动画
function MergeEquipView:showMergeAni(item1, item2)
    local w = display.width
    local h = display.height / 2
    local moveTo1 = cc.MoveTo:create(0.3, cc.p(w * 0.15, h))
    local moveTo2 = cc.MoveTo:create(0.3, cc.p(w * 0.85, h))
    local moveTo = cc.MoveTo:create(0.3, cc.p(w * 0.5, h))
    item1:runAction(cc.Sequence:create(
            cc.EaseBackOut:create(moveTo1),
            moveTo:clone(),
            cc.RemoveSelf:create()
    ))
    item2:runAction(cc.Sequence:create(
            cc.EaseBackOut:create(moveTo2),
            moveTo:clone(),
            cc.CallFunc:create(function ()
                self.panel_main:show()
                self:createAni(self.panel_main)
            end),
            cc.RemoveSelf:create()
    ))
end

function MergeEquipView:addNotify()

end

function MergeEquipView:removeNotify()

end

function MergeEquipView:onExit()
    self:removeNotify()
end

return MergeEquipView