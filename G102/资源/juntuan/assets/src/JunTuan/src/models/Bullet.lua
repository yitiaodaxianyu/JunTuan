---
--- Generated by EmmyLua(https://github.com/EmmyLua)
--- Created by hkc.
--- DateTime: 2021/4/25 15:55
---

local Bullet = class("Bullet", cc.Node)

function Bullet:ctor(BulletInfo)
    self:enableNodeEvents()
    self:initData(BulletInfo)
    self:initBoundingData(GameDataCfg.bulletRadiusInfo[self.bulletType])
end

function Bullet:drawNode()
    if not self.isNeedCollision then
        return
    end
    if not self.drawNodeTest then
        self.drawNodeTest = cc.DrawNode:create()
        self:addChild(self.drawNodeTest, 9999)
    end
    self.drawNodeTest:clear()
    local num = self.bounding_count
    for i = 1, num do
        local p = cc.p(self.collisionInfo[i])
        p = self:convertToNodeSpace(p)
        self.drawNodeTest:drawDot(p, self.bounding_radius, cc.c4b(255, 100, 100, 0.7))
    end
end

function Bullet:initData(bulletInfo)
    self.heroType = bulletInfo.heroType
    self.bulletType = bulletInfo.bulletType         -- 子弹类型
    self.atkType = bulletInfo.atkType               -- 子弹能攻击的类型列表
    self.toPos = bulletInfo.toPos                   -- 目标位置
    self.fixNode = bulletInfo.fixNode               -- 附加节点
    self.atkEnemy = bulletInfo.atkEnemy             -- 目标怪物
    self.speed = bulletInfo.speed                   -- 子弹速度
    self.baotou = bulletInfo.baotou                 -- 爆头
    self.isSecondAtk = bulletInfo.isSecondAtk       -- 二次溅射
    self.bounce = bulletInfo.bounce                 -- 碰壁反弹次数
    self.bounceDamagePer = 0                        -- 当前弹射增伤百分比

    -- 解密角色数据
    --bulletInfo = GameTool:dataDecrypt(bulletInfo)

    self.damage = bulletInfo.damage                 -- 子弹伤害
    self.damageTmp = bulletInfo.damage              -- 子弹伤害(副本)
    self.damageOff = bulletInfo.damageOff           -- 子弹基础伤害(不包括装备等加成的基础伤害)
    self.critRate = bulletInfo.critRate             -- 暴击率
    self.crit2Rate = bulletInfo.crit2Rate           -- 会心率
    self.critDps = bulletInfo.critDps               -- 暴击伤害
    self.crit2Dps = bulletInfo.crit2Dps             -- 会心伤害
    self.beHead = bulletInfo.beHead                 -- 斩杀率
    self.bounceUp = bulletInfo.bounceUp             -- 弹射增伤配置
    self.beheadHp = bulletInfo.beheadHp             -- 斩杀比例
    self.isContinue = bulletInfo.isContinue         -- 穿透率
    self.vertigoTime = bulletInfo.vertigoTime       -- 眩晕时间
    self.poison = bulletInfo.poison                 -- 中毒
    self.burn = bulletInfo.burn                     -- 灼烧
    self.bleed = bulletInfo.bleed                   -- 流血
    self.atkRange = bulletInfo.atkRange             -- 喷火兵攻击范围加成
    self.bulletRange = bulletInfo.bulletRange       -- 二次溅射范围
    self.personalPara = bulletInfo.personalPara     -- 角色特有参数
    self.skillPara = bulletInfo.skillPara           -- 技能参数

    self.state = Define.state.move
    self.skillTime = 0                              -- 技能累计时间（喷火兵技能）
    self.ejection_num = self.bounceUp[1]            -- 弹射次数

    self.canHitNum = GameDataCfg.canHitNum[self.heroType]       -- 能对区域内多少个敌人造成伤害
    self.hitEnemyTable = {}                                     -- 已经被这个子弹攻击过的敌人集合

    self.isNeedCollision = self:isNeedCollisionInfo()

    --self.atkRange = 0
    self.atkRangeScale = 1
    self.hitEnemyNum = 0

    self.isBounce = false
    self.isToFlag = false
    local b = self.bulletType
    if GameTool:isRoleBullet_1(b) or GameTool:isRoleBullet_5(b) then
        self.isBounce = true
    end
    if GameTool:isRoleBullet_2(b) or GameTool:isRoleBullet_3(b) then
        self.isToFlag = true
    end
end

function Bullet:onEnter()
    self:createBullet()
end

function Bullet:createBullet()
    local name = JunTuanCfg.bulletCfg[self.bulletType]
    local sp_bullet = cc.Sprite:createWithSpriteFrameName(name)
    self:addChild(sp_bullet, 1)
    self.img_bullet = sp_bullet

    if self.bulletType == Define.bulletType.ult_4 then
        -- 喷火兵技能
        local animation = cc.AnimationCache:getInstance():getAnimation("hero4Skill")
        local animate = cc.RepeatForever:create(cc.Animate:create(animation))
        sp_bullet:setAnchorPoint(0.5, 0)
        sp_bullet:runAction(animate)
        sp_bullet:setScaleY(1.25)
    elseif self.bulletType == Define.bulletType.ult_5 or self.bulletType == Define.bulletType.atk_5 then
        -- 忍者技能
        sp_bullet:runAction(cc.RepeatForever:create(cc.RotateBy:create(0.1, -90)))
        if self.bulletType == Define.bulletType.ult_5 then
            self:setScale(0.6)
        end
    elseif self.bulletType == Define.bulletType.ult_6 or self.bulletType == Define.bulletType.atk_6 then
        -- 女巫技能或普攻
        self.img_bullet:hide()
        name = "res/JunTuan/spine/dici"
        local spAni = AnimationMgr:createSpine(name)
        local ani = math.random(1, 5)
        spAni:setAnimation(0, tostring(ani), false)
        self:addChild(spAni, 2)
        performWithDelay(self, function ()
            self:hitArea()
        end, 0.3)
        performWithDelay(self, function ()
            self.state = Define.state.die
        end, 0.7)
    elseif self.bulletType == Define.bulletType.ult_3 or self.bulletType == Define.bulletType.atk_3 then
        self.img_bullet:hide()
    end

    if self.bulletType == Define.bulletType.atk_4 then
        -- 喷火兵普攻
        local animation = cc.AnimationCache:getInstance():getAnimation("hero4Atk")
        local animate = cc.Animate:create(animation)
        self.state = Define.state.stop
        sp_bullet:setAnchorPoint(1, 0.5)
        sp_bullet:setPosition(cc.p(0, 0))
        sp_bullet:runAction(cc.Sequence:create(
                animate,
                cc.CallFunc:create(function ()
                    self.isFiring = false
                    self.state = Define.state.die
                end)
        ))
        sp_bullet:setScale(self.atkRangeScale)
        performWithDelay(self, function ()
            self.state = Define.state.move
        end, 0.1)
    elseif self.bulletType == Define.bulletType.atk_2 then
        -- 炮兵普攻
        for i = 1, 2 do
            local sp = cc.Sprite:createWithSpriteFrameName(name)
            sp:setOpacity(255 * (0.8 - (i * 0.25)))
            sp:setPositionY(i * -20)
            sp:setScale(1 - (i * 0.1))
            self:addChild(sp, -i)
        end
    end
end

function Bullet:setPositionInfo(pos)
    self.pos = pos
    if not self.offPos then
        self.offPos = cc.p(pos)
    end
    self:setPosition(pos)
    self:getCollisionInfo()
    --self:drawNode()
end

function Bullet:setRotateInfo(rotation)
    self.rotation = rotation
    local radian = math.rad(90 - rotation)
    self.dx = math.cos(radian)
    self.dy = math.sin(radian)
    self:setRotation(rotation)
end

function Bullet:bomb()
    self.img_bullet:hide()
    local b = self.bulletType
    if GameTool:isRoleBullet_2(b) then
        -- 炮兵技能或者普攻
        local animation = cc.AnimationCache:getInstance():getAnimation("bombAni")
        local animate = cc.Animate:create(animation)
        local spr_ani = cc.Sprite:createWithSpriteFrameName("boomEffect0.png")
        spr_ani:runAction(cc.Sequence:create(
                animate,
                cc.CallFunc:create(function ()
                    self.state = Define.state.die
                    if not tolua.isnull(self.fixNode) then
                        self.fixNode:removeFromParent()
                    end
                end),
                cc.RemoveSelf:create()
        ))
        self:addChild(spr_ani)
        self.bounding_radius = self.isSecondAtk and self.bulletRange or self.bounding_radius
        if GameTool:isRoleSkill_2(self.bulletType) then
            self.bounding_radius = self.skillPara[2]
        else
            self:secondAtk()
        end
        self:hitArea()
    elseif GameTool:isRoleBullet_3(b) then
        -- 狙击手技能或者普攻
        local animation = cc.AnimationCache:getInstance():getAnimation("hero3Skill")
        local animate = cc.Animate:create(animation)
        local spr_ani = cc.Sprite:createWithSpriteFrameName("snipingHit1.png")
        spr_ani:runAction(cc.Sequence:create(
                animate,
                cc.CallFunc:create(function ()
                    self.state = Define.state.die
                    if not tolua.isnull(self.fixNode) then
                        self.fixNode:removeFromParent()
                    end
                end),
                cc.RemoveSelf:create()
        ))
        self:addChild(spr_ani)
        if not tolua.isnull(self.atkEnemy) then
            self.atkEnemy:beHit(self)
        end
    end
end

function Bullet:checkSecondBoom()
    local function call(dis)
        if self.rotation == 90 or self.rotation == 0 then
            if dis >= 0 or (dis >= -5 and dis <= 0) then
                self.state = Define.state.waiting
                self:bomb()
            end
        else
            if dis <= 0 or (dis <= 5 and dis >= 0) then
                self.state = Define.state.waiting
                self:bomb()
            end
        end
    end
    local dis = 0
    if self.pos.x == self.toPos.x then
        dis = self.pos.y - self.toPos.y
    elseif self.pos.y == self.toPos.y then
        dis = self.pos.x - self.toPos.x
    end
    call(dis)
end

function Bullet:isCanAtk(enemy)
    if enemy.isBox then
        return true
    end
    local flag = (enemy.state ~= Define.state.move and enemy.state ~= Define.state.frozen)
    if self.state ~= Define.state.move or flag then
        return false
    end
    if self.atkType[enemy.atkType] == 1 then
        return true
    end
    return false
end

-- 检测弹射目标
function Bullet:checkEjectEnemy()
    for _, enemy in pairs(self.enemyTable) do
        if not tolua.isnull(enemy) then
            local curEnemy = self.ejectionEnemy
            if not enemy.isPassenger then
                if self:isCanAtk(enemy) then
                    if enemy ~= curEnemy then
                        local p1 = enemy.pos
                        local p2 = self.pos
                        local dis = cc.pGetDistance(p1, p2)
                        if dis <= 200 and dis >= 50 then
                            self:ejection(enemy)
                            return
                        end
                    end
                end
            end
        end
    end
    self:ejectionOver()
end

function Bullet:checkEjectState()
    if self.heroType == 5 then
        if self.isStartEject then
            if tolua.isnull(self.ejectionEnemy) or self.ejectionEnemy.state ~= Define.state.move then
                if self.ejection_num > 0 then
                    self:checkEjectEnemy()
                else
                    self:ejectionOver()
                end
            end
        end
    end
end

function Bullet:move(dt)
    self.pos.x = self.pos.x + self.speed * dt * self.dx
    self.pos.y = self.pos.y + self.speed * dt * self.dy

    self:checkEjectState()
    if self.isBounce then
        if self.pos.x < 0 then
            if self.bounce > 0 then
                self.pos.x = -self.pos.x
                self.dx = -self.dx
                self.rotation = -self.rotation
                self.bounce = self.bounce - 1
                self:setRotateInfo(self.rotation)
            else
                self.state = Define.state.die
            end
        end

        if self.pos.x > display.width then
            if self.bounce > 0 then
                self.pos.x = display.width - (self.pos.x - display.width)
                self.dx = -self.dx
                self.rotation = -self.rotation
                self.bounce = self.bounce - 1
                self:setRotateInfo(self.rotation)
            else
                self.state = Define.state.die
            end
        end

        if self.pos.y < 300 then
            self.state = Define.state.die
            if self.isStartEject then
                self:ejectionOver()
            end
        end

        if self.pos.y > display.height then
            if self.bounce > 0 then
                self.pos.y = display.height - (self.pos.y - display.height)
                self.dy = -self.dy
                self.rotation = 180 - self.rotation
                self.bounce = self.bounce - 1
                self:setRotateInfo(self.rotation)
            else
                self.state = Define.state.die
            end
        end
    elseif self.isToFlag then
        if self.isSecondAtk then
            self:checkSecondBoom()
        else
            local dis = self.pos.y - self.toPos.y
            if dis >= 0 or (dis >= -5 and dis <= 0) then
                self.state = Define.state.stop
                self:bomb()
            end
        end
    end
    --self:setPositionInfo(self.pos)
    self:setPosition(self.pos)
    --self:getCollisionInfo()
end

function Bullet:isNeedCollisionInfo()
    local b = self.bulletType
    if GameTool:isRoleBullet_1(b) or GameTool:isRoleBullet_4(b) or
            --GameTool:isRoleBullet_5(b) or GameTool:isRoleBullet_6(b) then
            GameTool:isRoleBullet_5(b) then
        return true
    end
    return false
end

-- 初始化碰撞数据
function Bullet:initBoundingData(boundingInfo)
    self.bounding_radius = boundingInfo.bounding_radius
    if self.isNeedCollision then
        self.bounding_count = boundingInfo.bounding_count
        if self.heroType == 4 and self.atkRange ~= 0 then
            local up = self.atkRange / (self.bounding_count * 2) * 0.5
            local last = self.bounding_radius
            local cur  = last + up
            self.atkRangeScale = cur / last
            self.bounding_radius = cur
        end
    end
end

function Bullet:isInArea(r1, r2, pos)
    local radius = r1 + r2
    local dis = cc.pGetDistance(self.pos, pos)
    return dis < radius
end

-- 范围检测
function Bullet:hitArea()
    local curNum = 0
    for _, enemy in pairs(self.enemyTable) do
        if curNum >= self.canHitNum then return end
        if self.hero:isCanAtkEnemy(enemy) then
            if self:isInArea(self.bounding_radius, enemy.bounding_radius, enemy.pos) then
                curNum = curNum + 1
                enemy:beHit(self)
            end
        end
    end
end

-- 二次溅射
function Bullet:secondAtk()
    if not self.isSecondAtk then
        if self.bulletRange and self.bulletRange > 0 then
            local p = self.pos
            local dis = 80
            local posList = {
                cc.p(p.x - dis, p.y), cc.p(p.x + dis, p.y),
                cc.p(p.x, p.y - dis), cc.p(p.x, p.y + dis),
            }
            local rList = { -90, 90, 180, 0 }
            for i = 1, 4 do
                self.hero:heroSecondAtk(cc.p(p), posList[i], rList[i])
            end
        end
    end
end

-- 一个碰撞圆检测
function Bullet:collisionCheck1(enemyPos, center_distance)
    local dis_y = enemyPos.y - self.pos.y
    if dis_y > center_distance then
        return false
    end
    local dis_x = math.abs(enemyPos.x - self.pos.x)
    if dis_x > center_distance then
        return false
    end
    return true
end

-- 子弹碰撞检测
function Bullet:bulletHitCheck(enemy)
    if self.isStartEject then
        if enemy ~= self.ejectionEnemy then
            return false
        end
    end

    if not self.isNeedCollision or enemy.isPassenger then
        return false
    end

    local center_distance = self.bounding_radius + enemy.bounding_radius
    if self.bounding_count == 1 then
        if not self:collisionCheck1(enemy.pos, center_distance) then
            return false
        end
    end

    if self:isHitEnemy(enemy) or not self:isCanAtk(enemy) then
        return false
    end

    if self.bounding_count == 1 then
        return true
    end

    local distance = 0
    local flag_dis = center_distance * center_distance
    local math_floor = math.floor
    for i = 1, self.bounding_count do
        local c = self.collisionInfo[i]
        local x = math_floor(enemy.pos.x - c.x)
        local y = math_floor(enemy.pos.y - c.y)
        distance = x * x + y * y
        if (distance <= flag_dis) then
            return true
        end
    end
    return false
end

function Bullet:getCollisionInfo()
    if not self.isNeedCollision then
        return
    end
    self.collisionInfo = {}
    local myPos = self.pos
    local offset = 0
    local myAngle = 0
    local rotation = 90 - self.rotation
    if self.rotation then
        if GameTool:isRoleAtk_4(self.bulletType) then
            -- 喷火兵普攻(初始)
            rotation = 180 - self.rotation
        end
    end
    myAngle = math.rad(rotation)
    if self.bounding_count > 1 then
        -- 绑定圆大于一个
        offset = (self.bounding_count - 1) * self.bounding_radius
        if GameTool:isRoleBullet_4(self.bulletType) then
            -- 喷火兵(锚点为[0.5, 0])
            offset = (2 * self.bounding_count - 1) * self.bounding_radius
        end
    end
    local math_cos = math.cos
    local math_sin = math.sin
    for i = 1, self.bounding_count do
        local center = {}
        center.x = myPos.x + offset * math_cos(myAngle)
        center.y = myPos.y + offset * math_sin(myAngle)
        self.collisionInfo[i] = cc.p(center)
        offset = offset - self.bounding_radius * 2
        --printf("deg is %.2f, rad is %.2f, center.x is %.2f, center.y is %.2f", rotation, myAngle, center.x, center.y)
    end
end

-- 是否已经对此怪物造成了伤害(用于持续性技能判断)
function Bullet:isHitEnemy(enemy)
    if enemy.hitIdx then
        if self.hitEnemyTable[enemy.hitIdx] then
            return true
        end
    end
    return false
end

-- 弹射
function Bullet:ejection(enemy)
    -- 下一个弹射目标
    if self.ejection_num < 0 then
        self:ejectionOver()
    else
        self.ejectionEnemy = enemy
        self.ejection_num = self.ejection_num - 1
        self.bounceDamagePer = self.bounceDamagePer + self.bounceUp[2]
        self.damage = (1 + self.bounceDamagePer) * self.damageTmp
        local rotation = GameTool:getRotateInfo(enemy.pos, self.pos)
        self:setRotateInfo(rotation)
    end
end

-- 弹射结束
function Bullet:ejectionOver()
    self.state = Define.state.stop
    self:runAction(cc.Sequence:create(
            cc.MoveTo:create(0.5, self.offPos),
            cc.CallFunc:create(function ()
                self.state = Define.state.die
            end)
    ))
end

function Bullet:addToHitList(enemy)
    self.hitEnemyNum = self.hitEnemyNum + 1
    enemy.hitIdx = self.hitEnemyNum
    self.hitEnemyTable[self.hitEnemyNum] = self.hitEnemyNum
end

function Bullet:setEnemyTable(enemyTable)
    self.enemyTable = enemyTable
end

function Bullet:setHero(hero)
    self.hero = hero
end

function Bullet:hitEnemy(enemy)
    local b = self.bulletType
    if GameTool:isRoleAtk_1(b) then
        if ExternalTools:isSuccessful(self.isContinue) then
            -- 穿透生效，子弹继续运行
            self:addToHitList(enemy)
            return
        end
        self.state = Define.state.die
    elseif GameTool:isRoleBullet_4(b) then
        self:addToHitList(enemy)
    elseif GameTool:isRoleBullet_5(b) then
        -- 当前触发弹射的enemy
        self.ejectionEnemy = enemy
        self.isStartEject = true
        self.speed = 1000
        self:checkEjectEnemy()
    elseif GameTool:isRoleBullet_6(b) then
        self.canHitNum = self.canHitNum - 1
        if self.canHitNum <= 0 then
            self.state = Define.state.stop
        end
        self:addToHitList(enemy)
    else
        self.state = Define.state.die
    end
end

function Bullet:onExit()

end

return Bullet