
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcTG9hZE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQW9DO0FBR3BDLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQiwyQ0FBTyxDQUFBO0lBQ1AsNkNBQVEsQ0FBQTtBQUNaLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtBQUVEO0lBQUE7SUFvREEsQ0FBQztJQTNDVSxnQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxnQkFBSSxDQUFBLENBQUMsQ0FBQSxTQUFTLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3pELENBQUM7SUFFTSxvQkFBUSxHQUFmLFVBQWdCLFFBQWUsRUFBQyxJQUFjLEVBQUMsVUFBcUQ7UUFDaEcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLFFBQU8sSUFBSSxFQUFDO1lBQ1IsS0FBSyxTQUFTLENBQUMsS0FBSztnQkFBQztvQkFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzVEO2dCQUFBLE1BQU07WUFDWCxLQUFLLFNBQVMsQ0FBQyxNQUFNO2dCQUFDO29CQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBQyxRQUFRLEdBQUMsT0FBTyxFQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNyRTtnQkFBQSxNQUFNO1NBQ1Y7SUFDTCxDQUFDO0lBRWMscUJBQVMsR0FBeEIsVUFBeUIsR0FBVSxFQUFDLElBQXFCLEVBQUMsVUFBZ0Q7UUFBMUcsaUJBVUM7UUFURyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQWU7WUFDckQsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsVUFBVSxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFYyxzQkFBVSxHQUF6QixVQUEwQixHQUFVLEVBQUMsVUFBb0Q7UUFBekYsaUJBVUM7UUFURyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxZQUFZLEVBQUMsS0FBSyxFQUFDLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDbEYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsVUFBVSxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFYSw2QkFBaUIsR0FBL0I7UUFDSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEYsQ0FBQztJQWxERCwyQkFBMkI7SUFDcEIsMkJBQWUsR0FBUSw2QkFBNkIsQ0FBQztJQUM1RCxTQUFTO0lBQ0YscUJBQVMsR0FBVyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzNDLFNBQVM7SUFDRiw0QkFBZ0IsR0FBUSxDQUFDLENBQUM7SUFDMUIsMkJBQWUsR0FBUSxDQUFDLENBQUM7SUE2Q3BDLGtCQUFDO0NBcERELEFBb0RDLElBQUE7QUFwRFksa0NBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJc0dNIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmV4cG9ydCBlbnVtIExvYWRfTW9kZSB7XHJcbiAgICBsb2NhbD0xLC8v5pys5Zyw5LiL6L2977yM5bCGanNvbuaWh+S7tuWcqHJlc291cmNlc+ebruW9leS4i+eahGpzb27nm67lvZVcclxuICAgIHJlbW90ZT0yLC8v6L+c56iL5LiL6L2977yM5bCGanNvbuaWh+S7tuWcqHVybOeahGpzb27nm67lvZVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRNYW5hZ2VyICB7XHJcbiAgICAvL3dlYlNlcnZlcueahHVybO+8jOe7n+S4gOS7pWpzb27kvZzkuLrot6/lvoRcclxuICAgIHN0YXRpYyByZW1vdGVfdXJsX2pzb246c3RyaW5nPSdodHRwOi8vbG9jYWxob3N0OjgwODAvanNvbi8nO1xyXG4gICAgLy/kvb/nlKjnmoTkuIvovb3mqKHlvI9cclxuICAgIHN0YXRpYyBsb2FkX21vZGU6TG9hZF9Nb2RlPUxvYWRfTW9kZS5sb2NhbDtcclxuICAgIC8v5LiL6L295oiQ5Yqf55qE5paH5Lu2XHJcbiAgICBzdGF0aWMgbG9hZGVkX2NvbXBsZXRlZDpudW1iZXI9MDtcclxuICAgIHN0YXRpYyBtYXhfbnVtX2xvYWRpbmc6bnVtYmVyPTA7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB0aGlzLmxvYWRfbW9kZT1Jc0dNP0xvYWRfTW9kZS5yZW1vdGU6TG9hZF9Nb2RlLmxvY2FsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkSnNvbihmaWxlTmFtZTpzdHJpbmcsbW9kZTpMb2FkX01vZGUsb25Db21wbGV0ZTogKGVycjogRXJyb3IsIGFzc2V0OiBjYy5Kc29uQXNzZXQpID0+IHZvaWQpe1xyXG4gICAgICAgIHRoaXMubWF4X251bV9sb2FkaW5nKys7XHJcbiAgICAgICAgc3dpdGNoKG1vZGUpe1xyXG4gICAgICAgICAgICBjYXNlIExvYWRfTW9kZS5sb2NhbDp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRMb2NhbCgnanNvbi8nK2ZpbGVOYW1lLGNjLkpzb25Bc3NldCxvbkNvbXBsZXRlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIGNhc2UgTG9hZF9Nb2RlLnJlbW90ZTp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSZW1vdGUodGhpcy5yZW1vdGVfdXJsX2pzb24rZmlsZU5hbWUrJy5qc29uJyxvbkNvbXBsZXRlKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkTG9jYWwodXJsOnN0cmluZyx0eXBlOiB0eXBlb2YgY2MuQXNzZXQsb25Db21wbGV0ZTooZXJyOiBFcnJvciwgYXNzZXQ6IGNjLkFzc2V0KSA9PiB2b2lkKXtcclxuICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsdHlwZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkZWRfY29tcGxldGVkKys7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyb3IsYXNzZXRzKTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbGVhc2VBc3NldChhc3NldHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRSZW1vdGUodXJsOnN0cmluZyxvbkNvbXBsZXRlOihlcnI6IEVycm9yLCBhc3NldDogY2MuSnNvbkFzc2V0KSA9PiB2b2lkKXtcclxuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZSh1cmwse2NhY2hlRW5hYmxlZDpmYWxzZX0sKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRlZF9jb21wbGV0ZWQrKztcclxuICAgICAgICAgICAgb25Db21wbGV0ZShlcnJvcixhc3NldHMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SXNMb2FkQ29tcGxldGUoKTpib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlZF9jb21wbGV0ZWQ+MCYmdGhpcy5sb2FkZWRfY29tcGxldGVkPj10aGlzLm1heF9udW1fbG9hZGluZztcclxuICAgIH1cclxufVxyXG4iXX0=