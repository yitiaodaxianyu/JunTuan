
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Task/Data/ThreadTaskInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '409beCh1VZGL6N1LTdeiZ3m', 'ThreadTaskInformation');
// Scripts/Task/Data/ThreadTaskInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadTaskInformationManager = exports.JsonThreadTaskInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var StorageConfig_1 = require("../../Storage/StorageConfig");
var StorageManager_1 = require("../../Storage/StorageManager");
var JsonThreadTaskInformation = /** @class */ (function () {
    function JsonThreadTaskInformation() {
        /**主线任务ID */
        this.ThreadTaskID = 0;
        /**显示顺序 */
        this.DisplayOrder = 0;
        /**主线任务文本 */
        this.ThreadTaskDescription = 0;
        /**道具1ID */
        this.PropID_1 = 0;
        /**道具1数量 */
        this.PropNum_1 = 0;
        /**道具2ID */
        this.PropID_2 = 0;
        /**道具2数量 */
        this.PropNum_2 = 0;
        /**任务类型 */
        this.TaskType = 0;
        /**任务阶段 */
        this.TaskPhase = 0;
        /**任务参数 */
        this.TaskParameters = 0;
    }
    return JsonThreadTaskInformation;
}());
exports.JsonThreadTaskInformation = JsonThreadTaskInformation;
var ThreadTaskInformationManager = /** @class */ (function () {
    function ThreadTaskInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ThreadTaskInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ThreadTaskInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ThreadTaskInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ThreadTaskInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ThreadTaskInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonThreadTaskInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonThreadTaskInformation();
                jsonData = json[i];
                _this.data.set(jsonData.ThreadTaskID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ThreadTaskInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ThreadTaskInformationManager.prototype.getJsonThreadTaskInformation = function (id) {
        return this.data.get(id);
    };
    /**根据主线任务ID获取显示顺序 */
    ThreadTaskInformationManager.prototype.getDisplayOrder = function (id) {
        return this.data.get(id).DisplayOrder;
    };
    /**根据主线任务ID获取主线任务文本 */
    ThreadTaskInformationManager.prototype.getThreadTaskDescription = function (id) {
        return this.data.get(id).ThreadTaskDescription;
    };
    /**根据主线任务ID获取道具1ID */
    ThreadTaskInformationManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据主线任务ID获取道具1数量 */
    ThreadTaskInformationManager.prototype.getPropNum_1 = function (id) {
        return this.data.get(id).PropNum_1;
    };
    /**根据主线任务ID获取道具2ID */
    ThreadTaskInformationManager.prototype.getPropID_2 = function (id) {
        return this.data.get(id).PropID_2;
    };
    /**根据主线任务ID获取道具2数量 */
    ThreadTaskInformationManager.prototype.getPropNum_2 = function (id) {
        return this.data.get(id).PropNum_2;
    };
    /**根据主线任务ID获取任务类型 */
    ThreadTaskInformationManager.prototype.getTaskType = function (id) {
        return this.data.get(id).TaskType;
    };
    /**根据主线任务ID获取任务阶段 */
    ThreadTaskInformationManager.prototype.getTaskPhase = function (id) {
        return this.data.get(id).TaskPhase;
    };
    /**根据主线任务ID获取任务参数 */
    ThreadTaskInformationManager.prototype.getTaskParameters = function (id) {
        return this.data.get(id).TaskParameters;
    };
    /** 静态方法，获取最大的 主线任务ID*/
    ThreadTaskInformationManager.getMaxThreadTaskID = function () {
        return 12001020;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ThreadTaskInformationManager.prototype.getMainTaskData = function () {
        var info = null;
        var index = StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.TaskMainShowIndex, 0) + 1;
        this.data.forEach(function (v, k) {
            if (v.DisplayOrder == index) {
                info = v;
            }
        });
        return info;
    };
    ThreadTaskInformationManager.prototype.getMainTaskDataByTypeAndIndex = function (type, index) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.TaskPhase == index && v.TaskType == type) {
                info = v;
            }
        });
        return info;
    };
    ThreadTaskInformationManager._instance = null;
    return ThreadTaskInformationManager;
}());
exports.ThreadTaskInformationManager = ThreadTaskInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFza1xcRGF0YVxcVGhyZWFkVGFza0luZm9ybWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUN4RCw2REFBeUQ7QUFDekQsK0RBQWlFO0FBRWpFO0lBQUE7UUFDSSxZQUFZO1FBQ0wsaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCwwQkFBcUIsR0FBVSxDQUFDLENBQUU7UUFDekMsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsVUFBVTtRQUNILG1CQUFjLEdBQVUsQ0FBQyxDQUFFO0lBQ3RDLENBQUM7SUFBRCxnQ0FBQztBQUFELENBckJBLEFBcUJDLElBQUE7QUFyQlksOERBQXlCO0FBdUJ0QztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUF1QyxJQUFJLENBQUM7UUFDaEQsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBMEc1QyxDQUFDO0lBeEdpQix3Q0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDRCQUE0QixFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDJDQUFJLEdB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QUFBO0FBOUdZLG9FQUE0QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi8uLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25UaHJlYWRUYXNrSW5mb3JtYXRpb24ge1xyXG4gICAgLyoq5Li757q/5Lu75YqhSUQgKi9cclxuICAgIHB1YmxpYyBUaHJlYWRUYXNrSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmL7npLrpobrluo8gKi9cclxuICAgIHB1YmxpYyBEaXNwbGF5T3JkZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuLvnur/ku7vliqHmlofmnKwgKi9cclxuICAgIHB1YmxpYyBUaHJlYWRUYXNrRGVzY3JpcHRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbcxSUQgKi9cclxuICAgIHB1YmxpYyBQcm9wSURfMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzHmlbDph48gKi9cclxuICAgIHB1YmxpYyBQcm9wTnVtXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbcySUQgKi9cclxuICAgIHB1YmxpYyBQcm9wSURfMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzLmlbDph48gKi9cclxuICAgIHB1YmxpYyBQcm9wTnVtXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirku7vliqHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBUYXNrVHlwZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS7u+WKoemYtuautSAqL1xyXG4gICAgcHVibGljIFRhc2tQaGFzZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS7u+WKoeWPguaVsCAqL1xyXG4gICAgcHVibGljIFRhc2tQYXJhbWV0ZXJzOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFRocmVhZFRhc2tJbmZvcm1hdGlvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uVGhyZWFkVGFza0luZm9ybWF0aW9uPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpUaHJlYWRUYXNrSW5mb3JtYXRpb25NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgVGhyZWFkVGFza0luZm9ybWF0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdUaHJlYWRUYXNrSW5mb3JtYXRpb24nLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uVGhyZWFkVGFza0luZm9ybWF0aW9u5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblRocmVhZFRhc2tJbmZvcm1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuVGhyZWFkVGFza0lELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uVGhyZWFkVGFza0luZm9ybWF0aW9uKGlkOm51bWJlcik6SnNvblRocmVhZFRhc2tJbmZvcm1hdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Li757q/5Lu75YqhSUTojrflj5bmmL7npLrpobrluo8gKi9cclxuICAgIHB1YmxpYyBnZXREaXNwbGF5T3JkZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGlzcGxheU9yZGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Li757q/5Lu75YqhSUTojrflj5bkuLvnur/ku7vliqHmlofmnKwgKi9cclxuICAgIHB1YmxpYyBnZXRUaHJlYWRUYXNrRGVzY3JpcHRpb24oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGhyZWFkVGFza0Rlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Li757q/5Lu75YqhSUTojrflj5bpgZPlhbcxSUQgKi9cclxuICAgIHB1YmxpYyBnZXRQcm9wSURfMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9wSURfMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4u+e6v+S7u+WKoUlE6I635Y+W6YGT5YW3MeaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldFByb3BOdW1fMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9wTnVtXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuLvnur/ku7vliqFJROiOt+WPlumBk+WFtzJJRCAqL1xyXG4gICAgcHVibGljIGdldFByb3BJRF8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByb3BJRF8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Li757q/5Lu75YqhSUTojrflj5bpgZPlhbcy5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0UHJvcE51bV8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByb3BOdW1fMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4u+e6v+S7u+WKoUlE6I635Y+W5Lu75Yqh57G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0VGFza1R5cGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGFza1R5cGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuLvnur/ku7vliqFJROiOt+WPluS7u+WKoemYtuautSAqL1xyXG4gICAgcHVibGljIGdldFRhc2tQaGFzZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5UYXNrUGhhc2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuLvnur/ku7vliqFJROiOt+WPluS7u+WKoeWPguaVsCAqL1xyXG4gICAgcHVibGljIGdldFRhc2tQYXJhbWV0ZXJzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRhc2tQYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5Li757q/5Lu75YqhSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhUaHJlYWRUYXNrSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMjAwMTAyMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBnZXRNYWluVGFza0RhdGEoKTpKc29uVGhyZWFkVGFza0luZm9ybWF0aW9ue1xyXG4gICAgICAgIGxldCBpbmZvID0gbnVsbDtcclxuICAgICAgICBsZXQgaW5kZXggPSBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlRhc2tNYWluU2hvd0luZGV4LDApICsgMTtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LkRpc3BsYXlPcmRlciA9PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1haW5UYXNrRGF0YUJ5VHlwZUFuZEluZGV4KHR5cGU6bnVtYmVyLGluZGV4Om51bWJlcik6SnNvblRocmVhZFRhc2tJbmZvcm1hdGlvbntcclxuICAgICAgICBsZXQgaW5mbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5UYXNrUGhhc2UgPT0gaW5kZXggICYmIHYuVGFza1R5cGUgPT0gdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==