"use strict";
cc._RF.push(module, 'c3e2977OMFNsYGG5fe7bRnZ', 'LoadManager');
// Scripts/Loading/LoadManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadManager = exports.Load_Mode = void 0;
var Constants_1 = require("../Constants");
var Load_Mode;
(function (Load_Mode) {
    Load_Mode[Load_Mode["local"] = 1] = "local";
    Load_Mode[Load_Mode["remote"] = 2] = "remote";
})(Load_Mode = exports.Load_Mode || (exports.Load_Mode = {}));
var LoadManager = /** @class */ (function () {
    function LoadManager() {
    }
    LoadManager.init = function () {
        this.load_mode = Constants_1.IsGM ? Load_Mode.remote : Load_Mode.local;
    };
    LoadManager.loadJson = function (fileName, mode, onComplete) {
        this.max_num_loading++;
        switch (mode) {
            case Load_Mode.local:
                {
                    this.loadLocal('json/' + fileName, cc.JsonAsset, onComplete);
                }
                break;
            case Load_Mode.remote:
                {
                    this.loadRemote(this.remote_url_json + fileName + '.json', onComplete);
                }
                break;
        }
    };
    LoadManager.loadLocal = function (url, type, onComplete) {
        var _this = this;
        cc.resources.load(url, type, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.loaded_completed++;
            onComplete(error, assets);
            cc.assetManager.releaseAsset(assets);
        });
    };
    LoadManager.loadRemote = function (url, onComplete) {
        var _this = this;
        cc.assetManager.loadRemote(url, { cacheEnabled: false }, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.loaded_completed++;
            onComplete(error, assets);
        });
    };
    LoadManager.getIsLoadComplete = function () {
        return this.loaded_completed > 0 && this.loaded_completed >= this.max_num_loading;
    };
    //webServer的url，统一以json作为路径
    LoadManager.remote_url_json = 'http://localhost:8080/json/';
    //使用的下载模式
    LoadManager.load_mode = Load_Mode.local;
    //下载成功的文件
    LoadManager.loaded_completed = 0;
    LoadManager.max_num_loading = 0;
    return LoadManager;
}());
exports.LoadManager = LoadManager;

cc._RF.pop();