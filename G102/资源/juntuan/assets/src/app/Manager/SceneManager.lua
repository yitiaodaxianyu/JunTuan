local _M = {}
local obj = nil

-- 单例
function _M.Shared()
    if not obj then
        obj = setmetatable({}, { __index = _M })
        obj:Init()
    end
    return obj
end

function _M:Init()
    self.curScene = nil
end

-- 进入军团大作战
function _M:EnterJunGameScene()
    local scene = require("JunTuan.src.scene.GameScene").new()
    self:ReplaceScene(scene)
end

-- 军团大作战加载页
function _M:EnterJunLoading()
    local scene = require("JunTuan.src.scene.LoadingScene").new()
    self:ReplaceScene(scene)
end

-- 自动判断是否是首场景调用相应切换接口
function _M:ReplaceScene(scene)
    if (not self.curScene) or (self.curScene.__cname ~= scene.__cname) then
        if cc.Director:getInstance():getRunningScene() then
            cc.Director:getInstance():replaceScene(scene)
        else
            cc.Director:getInstance():runWithScene(scene)
        end
        self.curScene = scene
    end
end

--返回当前场景
function _M:GetRunningScene()
    if tolua.isnull(self.curScene) then
        self.curScene = cc.Director:getInstance():getRunningScene()
    end
    return self.curScene
end

SceneManager = _M
