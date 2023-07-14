
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Turntable/TurntableInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '55a8ffQEslKrqDrTSRuxViM', 'TurntableInformation');
// Scripts/Turntable/TurntableInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurntableInformationManager = exports.JsonTurntableInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonTurntableInformation = /** @class */ (function () {
    function JsonTurntableInformation() {
        /**展示位 */
        this.DisplayPosition = 0;
        /**道具ID */
        this.ItemID = 0;
        /**道具数量 */
        this.ItemNum = 0;
    }
    return JsonTurntableInformation;
}());
exports.JsonTurntableInformation = JsonTurntableInformation;
var TurntableInformationManager = /** @class */ (function () {
    function TurntableInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    TurntableInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TurntableInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TurntableInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TurntableInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TurntableInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTurntableInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTurntableInformation();
                jsonData = json[i];
                _this.data.set(jsonData.DisplayPosition, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    TurntableInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TurntableInformationManager.prototype.getJsonTurntableInformation = function (id) {
        return this.data.get(id);
    };
    /**根据展示位获取道具ID */
    TurntableInformationManager.prototype.getItemID = function (id) {
        return this.data.get(id).ItemID;
    };
    /**根据展示位获取道具数量 */
    TurntableInformationManager.prototype.getItemNum = function (id) {
        return this.data.get(id).ItemNum;
    };
    /** 静态方法，获取最大的 展示位*/
    TurntableInformationManager.getMaxDisplayPosition = function () {
        return 6;
    };
    TurntableInformationManager._instance = null;
    return TurntableInformationManager;
}());
exports.TurntableInformationManager = TurntableInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHVybnRhYmxlXFxUdXJudGFibGVJbmZvcm1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFFckQ7SUFBQTtRQUNJLFNBQVM7UUFDRixvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtJQUMvQixDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLDREQUF3QjtBQVNyQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFzQyxJQUFJLENBQUM7UUFDL0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBd0R4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQXpEaUIsdUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSwyQkFBMkIsRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCwwQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDhDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDaEcsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLHdCQUF3QixFQUFFLENBQUM7Z0JBQzVDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEQ7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCx3REFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsaUVBQTJCLEdBQWxDLFVBQW1DLEVBQVM7UUFDeEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsK0NBQVMsR0FBaEIsVUFBaUIsRUFBUztRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsZ0RBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQsb0JBQW9CO0lBQ04saURBQXFCLEdBQW5DO1FBQ0ksT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBekRjLHFDQUFTLEdBQWdDLElBQUksQ0FBQztJQThEakUsa0NBQUM7Q0EvREQsQUErREMsSUFBQTtBQS9EWSxrRUFBMkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblR1cm50YWJsZUluZm9ybWF0aW9uIHtcclxuICAgIC8qKuWxleekuuS9jSAqL1xyXG4gICAgcHVibGljIERpc3BsYXlQb3NpdGlvbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgSXRlbUlEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW35pWw6YePICovXHJcbiAgICBwdWJsaWMgSXRlbU51bTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFR1cm50YWJsZUluZm9ybWF0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25UdXJudGFibGVJbmZvcm1hdGlvbj49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6VHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgVHVybnRhYmxlSW5mb3JtYXRpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1R1cm50YWJsZUluZm9ybWF0aW9uJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblR1cm50YWJsZUluZm9ybWF0aW9u5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblR1cm50YWJsZUluZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5EaXNwbGF5UG9zaXRpb24sanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25UdXJudGFibGVJbmZvcm1hdGlvbihpZDpudW1iZXIpOkpzb25UdXJudGFibGVJbmZvcm1hdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGV56S65L2N6I635Y+W6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbUlEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5bGV56S65L2N6I635Y+W6YGT5YW35pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbU51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5bGV56S65L2NKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4RGlzcGxheVBvc2l0aW9uKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==