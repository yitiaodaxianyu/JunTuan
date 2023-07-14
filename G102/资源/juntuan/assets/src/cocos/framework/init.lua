--[[

Copyright (c) 2014-2017 Chukong Technologies Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

]]

if type(DEBUG) ~= "number" then DEBUG = 0 end

-- load framework
printInfo("")
printInfo("# DEBUG                        = " .. DEBUG)
printInfo("#")

device     = require("src.cocos.framework.device")
display    = require("src.cocos.framework.display")
audio      = require("src.cocos.framework.audio")
transition = require("src.cocos.framework.transition")

require("src.cocos.framework.extends.NodeEx")
require("src.cocos.framework.extends.SpriteEx")
require("src.cocos.framework.extends.LayerEx")
require("src.cocos.framework.extends.MenuEx")

if ccui then
require("src.cocos.framework.extends.UIWidget")
require("src.cocos.framework.extends.UICheckBox")
require("src.cocos.framework.extends.UIEditBox")
require("src.cocos.framework.extends.UIListView")
require("src.cocos.framework.extends.UIPageView")
require("src.cocos.framework.extends.UIScrollView")
require("src.cocos.framework.extends.UISlider")
require("src.cocos.framework.extends.UITextField")
end

require("src.cocos.framework.package_support")

-- register the build-in packages
cc.register("event", require("src.cocos.framework.components.event"))

-- export global variable
local __g = _G
cc.exports = {}
setmetatable(cc.exports, {
    __newindex = function(_, name, value)
        rawset(__g, name, value)
    end,

    __index = function(_, name)
        return rawget(__g, name)
    end
})

-- disable create unexpected global variable
function cc.disable_global()
    setmetatable(__g, {
        __newindex = function(_, name, value)
            error(string.format("USE \" cc.exports.%s = value \" INSTEAD OF SET GLOBAL VARIABLE", name), 0)
        end
    })
end

if CC_DISABLE_GLOBAL then
    cc.disable_global()
end
