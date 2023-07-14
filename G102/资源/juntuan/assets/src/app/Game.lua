local Game = class("Game")

function Game:run()
    math.randomseed(os.time())

    self:InitFunc()
end
function Game:InitFunc()
    cc.FileUtils:getInstance():addSearchPath("res/")
    cc.FileUtils:getInstance():addSearchPath("src/")

    DeviceUtil.KeepScreenOn(1)

    SceneManager.Shared():EnterJunLoading()
end

return Game