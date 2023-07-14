---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2021/4/25 15:53
---

local Bullet = require("JunTuan.src.models.Bullet")
local BulletManager = class("BulletManager")

function BulletManager:getInstance()
    if self._instance == nil then
        self._instance = BulletManager.new()
        self:initData()
    end
    return self._instance
end

function BulletManager:initData()
    self.bulletTable = {}
    self.cacheBullet = {}
end

function BulletManager:createBullet(bulletInfo)
    local bullet = Bullet.new(bulletInfo)
    table.insert(self.bulletTable, bullet)
    return bullet
end

function BulletManager:removeBullet(bullet)
    bullet:removeFromParent(true)
    table.removebyvalue(self.bulletTable, bullet)
end

function BulletManager:removeAllBullet()
    for _, v in pairs(self.bulletTable) do
        v:removeFromParent(true)
    end
    self.bulletTable = {}
end

-- 技能持续时间更新
function BulletManager:handleSkillTime(v, dt)
    if v.bulletType == Define.bulletType.ult_4 then
        if v.state ~= Define.state.die then
            local time = v.skillPara[2]
            if time > 0 then
                time = time - dt
            else
                v.state = Define.state.die
                local heroType = v.heroType
                MessageManager.Shared():postMsg(MsgKeyData.onRoleSkillOver, { heroType = heroType })
            end
            v.skillPara[2] = time
            v.skillTime = v.skillTime + dt
            if v.skillTime >= 0.1 then
                -- 清空已攻击列表
                v.hitEnemyTable = {}
                v.skillTime = 0
            end
        end
    end
end

function BulletManager:onFrame(dt)
    local removeT = {}
    for _, v in pairs(self.bulletTable) do
        if v.state == Define.state.move then
            local bulletType = v.bulletType
            if bulletType ~= Define.bulletType.atk_4 and bulletType ~= Define.bulletType.atk_6 then
                if bulletType ~= Define.bulletType.ult_4 and bulletType ~= Define.bulletType.ult_6 then
                    v:move(dt)
                end
            end
        elseif v.state == Define.state.die then
            table.insert(removeT, v)
        end
        self:handleSkillTime(v, dt)
    end
    for _, v in pairs(removeT) do
        self:removeBullet(v)
    end
end

function BulletManager:onExit()
    self:removeAllBullet()
    self:initData()
    self._instance = nil
end

return BulletManager