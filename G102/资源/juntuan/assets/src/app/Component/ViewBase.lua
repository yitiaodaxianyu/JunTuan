local GameDB = require("src.app.DB.GameDB")
local AudioUtil = require("src.Util.AudioUtil")
ViewBase = class("ViewBase", function()
    local ui = ccui.Layout:create()
    ui:setContentSize(display.size)
    ui:setTouchEnabled(true)
    return ui
end)

function ViewBase:createCSB(para)
    para = para or {}
    local ui = cc.CSLoader:createNode(para.csb)
    if para.setSize then
        ui:setContentSize(para.size or display.size)
        ccui.Helper:doLayout(ui)
    end
    ui:setAnchorPoint(para.anchorPoint or cc.p(0.5, 0.5))
    ui:setPosition(para.pos or display.center)
    return ui
end

function ViewBase:btnTouchAni(sender, eventType)
    if sender.scale then
        if eventType == ccui.TouchEventType.began then
            sender:runAction(cc.ScaleTo:create(0.1, sender.scale * 1.1))
        elseif eventType == ccui.TouchEventType.ended or eventType == ccui.TouchEventType.canceled then
            sender:runAction(cc.ScaleTo:create(0.1, sender.scale))
        end
    else
        if eventType == ccui.TouchEventType.began then
            sender:runAction(cc.ScaleTo:create(0.1, 1.1))
        elseif eventType == ccui.TouchEventType.ended or eventType == ccui.TouchEventType.canceled then
            sender:runAction(cc.ScaleTo:create(0.1, 1))
        end
    end

end

function ViewBase:createAni(node, call)
    node:setScale(0)
    local scaleTo1 = cc.ScaleTo:create(0.1, 1.1)
    local scaleTo2 = cc.ScaleTo:create(0.05, 1.0)
    node:runAction(cc.Sequence:create(
            scaleTo1,
            scaleTo2,
            cc.CallFunc:create(function ()
                if call then
                    call()
                end
            end)
    ))
end

function ViewBase:destroyAni(node, call)
    local scaleTo1 = cc.ScaleTo:create(0.05, 1.1)
    local scaleTo2 = cc.ScaleTo:create(0.1, 0)
    node:runAction(cc.Sequence:create(scaleTo1, scaleTo2, cc.CallFunc:create(call)))
end

function ViewBase:createSpine(name, scale)
    if name then
        scale = scale or 1
        return sp.SkeletonAnimation:create(name .. ".json", name .. ".atlas", scale)
    end
    return nil
end

function ViewBase:createAnimate(nameAry, dt)
    local frameCache = cc.SpriteFrameCache:getInstance()
    local animation = cc.Animation:create()
    for i = 1, #nameAry do
        local spriteFrame = frameCache:getSpriteFrame(nameAry[i])
        if spriteFrame then
            animation:addSpriteFrame(spriteFrame)
        else
            print("createAnimate error not find", v)
        end
    end
    animation:setDelayPerUnit(dt)
    animation:setRestoreOriginalFrame(true)
    return cc.Animate:create(animation)
end

function ViewBase:stopMusic()
    AudioUtil.stopMusic()
end

function ViewBase:playMusic(name)
    return AudioUtil.playMusic(name)
end

function ViewBase:playEffect(name, loop, call)
    return AudioUtil.playSound(name, loop, call)
end

function ViewBase:getMusicVolume(volume)
    return GameDB.GetNumForKey("MusicVolume", 100)
end

function ViewBase:getSoundVolume(volume)
    return GameDB.GetNumForKey("SoundVolume", 100)
end

function ViewBase:setMusicVolume(volume)
    AudioUtil.setMusicVolume(volume / 100)
    GameDB.SetValueForKey("MusicVolume", volume)
end

function ViewBase:setSoundVolume(volume)
    AudioUtil.setSoundsVolume(volume / 100)
    GameDB.SetValueForKey("SoundVolume", volume)
end

return ViewBase