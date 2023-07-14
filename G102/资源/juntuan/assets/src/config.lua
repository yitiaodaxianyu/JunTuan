--[[
软件版本号
主版本号.次版本号

EXE_VERSION, 主版本号: 有重大更新时修改该版本号，每次递增1，重大更新需要重新打包apk升级

APP_VERSION, 次版本号: 有界面、逻辑更新时修改该版本号，每次递增1，可热更新
]]

APP_VERSION = "2.0.1"
EXE_VERSION = 2

-- 发布android版本时要将jni目录下的Application.mk文件里的debug属性改为0

-- 使用3.6打包本工程时需要注意：
-- cocos2d-x-3.6\tools\cocos2d-console\plugins\plugin_luacompile\__init__.py中将
-- relative_path = self.get_relative_path(luafile)+"c"
-- 替换为
-- relative_path = self.get_relative_path(luafile)

-- 注释cocos2d-x-3.6\tools\cocos2d-console\plugins\project_compile\project_compile.py中
-- # self._remove_file_with_ext(dst_dir, rm_ext)

-- cocos2d-x-3.6\tools\cocos2d-console\plugins\plugin_luacompile\__init__.py需修改
-- 将if self._disable_compile:
--		shutil.copy(lua_file, dst_lua_file)
-- 修改为(判断拷贝的路径是否相等，否则报错)
-- if self._disable_compile:
--	 if lua_file != dst_lua_file:
--		shutil.copy(lua_file, dst_lua_file)

-- 使用 cocos compile -p android -m release --lua-encrypt --lua-encrypt-key GameLandlord --lua-encrypt-sign lxlandlord --compile-script 0 生成加密的apk

-- 使用 cocos luacompile -s src -d src -e True -k GameLandlord -b lxlandlord 加密lua脚本