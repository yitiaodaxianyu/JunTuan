
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Loading/LoadManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3e2977OMFNsYGG5fe7bRnZ', 'LoadManager');
// Scripts/Loading/LoadManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadManager = exports.Load_Mode = void 0;
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load(url, type, function (error, assets) {
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcTG9hZE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELDBDQUFvQztBQUdwQyxJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDakIsMkNBQU8sQ0FBQTtJQUNQLDZDQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFFRDtJQUFBO0lBb0RBLENBQUM7SUEzQ1UsZ0JBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsZ0JBQUksQ0FBQSxDQUFDLENBQUEsU0FBUyxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUN6RCxDQUFDO0lBRU0sb0JBQVEsR0FBZixVQUFnQixRQUFlLEVBQUMsSUFBYyxFQUFDLFVBQXFEO1FBQ2hHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixRQUFPLElBQUksRUFBQztZQUNSLEtBQUssU0FBUyxDQUFDLEtBQUs7Z0JBQUM7b0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFDLFFBQVEsRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM1RDtnQkFBQSxNQUFNO1lBQ1gsS0FBSyxTQUFTLENBQUMsTUFBTTtnQkFBQztvQkFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUMsUUFBUSxHQUFDLE9BQU8sRUFBQyxVQUFVLENBQUMsQ0FBQztpQkFDckU7Z0JBQUEsTUFBTTtTQUNWO0lBQ0wsQ0FBQztJQUVjLHFCQUFTLEdBQXhCLFVBQXlCLEdBQVUsRUFBQyxJQUFxQixFQUFDLFVBQWdEO1FBQTFHLGlCQVVDO1FBVEcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBZTtZQUNsRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixVQUFVLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVjLHNCQUFVLEdBQXpCLFVBQTBCLEdBQVUsRUFBQyxVQUFvRDtRQUF6RixpQkFVQztRQVRHLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNsRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixVQUFVLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVhLDZCQUFpQixHQUEvQjtRQUNJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixHQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsZ0JBQWdCLElBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoRixDQUFDO0lBbERELDJCQUEyQjtJQUNwQiwyQkFBZSxHQUFRLDZCQUE2QixDQUFDO0lBQzVELFNBQVM7SUFDRixxQkFBUyxHQUFXLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDM0MsU0FBUztJQUNGLDRCQUFnQixHQUFRLENBQUMsQ0FBQztJQUMxQiwyQkFBZSxHQUFRLENBQUMsQ0FBQztJQTZDcEMsa0JBQUM7Q0FwREQsQUFvREMsSUFBQTtBQXBEWSxrQ0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBJc0dNIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmV4cG9ydCBlbnVtIExvYWRfTW9kZSB7XHJcbiAgICBsb2NhbD0xLC8v5pys5Zyw5LiL6L2977yM5bCGanNvbuaWh+S7tuWcqHJlc291cmNlc+ebruW9leS4i+eahGpzb27nm67lvZVcclxuICAgIHJlbW90ZT0yLC8v6L+c56iL5LiL6L2977yM5bCGanNvbuaWh+S7tuWcqHVybOeahGpzb27nm67lvZVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRNYW5hZ2VyICB7XHJcbiAgICAvL3dlYlNlcnZlcueahHVybO+8jOe7n+S4gOS7pWpzb27kvZzkuLrot6/lvoRcclxuICAgIHN0YXRpYyByZW1vdGVfdXJsX2pzb246c3RyaW5nPSdodHRwOi8vbG9jYWxob3N0OjgwODAvanNvbi8nO1xyXG4gICAgLy/kvb/nlKjnmoTkuIvovb3mqKHlvI9cclxuICAgIHN0YXRpYyBsb2FkX21vZGU6TG9hZF9Nb2RlPUxvYWRfTW9kZS5sb2NhbDtcclxuICAgIC8v5LiL6L295oiQ5Yqf55qE5paH5Lu2XHJcbiAgICBzdGF0aWMgbG9hZGVkX2NvbXBsZXRlZDpudW1iZXI9MDtcclxuICAgIHN0YXRpYyBtYXhfbnVtX2xvYWRpbmc6bnVtYmVyPTA7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB0aGlzLmxvYWRfbW9kZT1Jc0dNP0xvYWRfTW9kZS5yZW1vdGU6TG9hZF9Nb2RlLmxvY2FsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkSnNvbihmaWxlTmFtZTpzdHJpbmcsbW9kZTpMb2FkX01vZGUsb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGFzc2V0OiBjYy5Kc29uQXNzZXQpID0+IHZvaWQpe1xyXG4gICAgICAgIHRoaXMubWF4X251bV9sb2FkaW5nKys7XHJcbiAgICAgICAgc3dpdGNoKG1vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIExvYWRfTW9kZS5sb2NhbDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMb2NhbCgnanNvbi8nK2ZpbGVOYW1lLGNjLkpzb25Bc3NldCxvbkNvbXBsZXRlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIGNhc2UgTG9hZF9Nb2RlLnJlbW90ZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSZW1vdGUodGhpcy5yZW1vdGVfdXJsX2pzb24rZmlsZU5hbWUrJy5qc29uJyxvbkNvbXBsZXRlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkTG9jYWwodXJsOnN0cmluZyx0eXBlOiB0eXBlb2YgY2MuQXNzZXQsb25Db21wbGV0ZTooZXJyOiBFcnJvciwgYXNzZXQ6IGNjLkFzc2V0KSA9PiB2b2lkKXtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKHVybCx0eXBlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZF9jb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgb25Db21wbGV0ZShlcnJvcixhc3NldHMpO1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIucmVsZWFzZUFzc2V0KGFzc2V0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbG9hZFJlbW90ZSh1cmw6c3RyaW5nLG9uQ29tcGxldGU6KGVycjogRXJyb3IsIGFzc2V0OiBjYy5Kc29uQXNzZXQpID0+IHZvaWQpe1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHVybCx7Y2FjaGVFbmFibGVkOmZhbHNlfSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGVkX2NvbXBsZXRlZCsrO1xyXG4gICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yLGFzc2V0cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJc0xvYWRDb21wbGV0ZSgpOmJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVkX2NvbXBsZXRlZD4wJiZ0aGlzLmxvYWRlZF9jb21wbGV0ZWQ+PXRoaXMubWF4X251bV9sb2FkaW5nO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==