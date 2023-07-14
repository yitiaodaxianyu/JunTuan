-- 0 - disable debug info, 1 - less debug info, 2 - verbose debug info
DEBUG = 0
-- use framework, will disable all deprecated API, false - use legacy API
CC_USE_FRAMEWORK = true
-- show FPS on screen
CC_SHOW_FPS = false
WRITE_LOG   = false -- 是否记录lua打印
ERROR_LOG   = true -- 是否记录lua报错
UPLOAD_LOG = true -- 是否上传luaerr.log 本地为false
-- disable create unexpected global variable
CC_DISABLE_GLOBAL = false
-- for module display

CC_DESIGN_RESOLUTION = {
    width = 640,
    height = 1400,
    autoscale = "FIXED_HEIGHT",
    callback = function(framesize)
        local ratio = framesize.width / framesize.height
        if ratio <= 1.34 then
             --iPad 768*1024(1536*2048) is 4:3 screen
            return {autoscale = "FIXED_HEIGHT"}
        end
    end
}

CC_DESIGN_RESOLUTION_PORTRAIT = {
    width = 720,
    height = 1280,
    autoscale = "FIXED_WIDTH",
}

if not DEBUG or DEBUG == 0 then -- 重定义print，屏蔽打印
    print = function()
    end
    printf = function ()
    end
end