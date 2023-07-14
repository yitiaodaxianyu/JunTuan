
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Level/OfflineRevenueShow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '930c7RU+JZIJ5oA+tdOXqub', 'OfflineRevenueShow');
// Scripts/Level/OfflineRevenueShow.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflineRevenueShowManager = exports.JsonOfflineRevenueShow = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonOfflineRevenueShow = /** @class */ (function () {
    function JsonOfflineRevenueShow() {
        /**通关章节 */
        this.Chapter = 0;
        /**解锁道具 */
        this.UnlockProps = [];
        /**每分钟金币 */
        this.GetCoins = 0;
        /**本章文本 */
        this.ChapterIntroduction = 0;
        /**标题文本ID */
        this.Titletext = 0;
    }
    return JsonOfflineRevenueShow;
}());
exports.JsonOfflineRevenueShow = JsonOfflineRevenueShow;
var OfflineRevenueShowManager = /** @class */ (function () {
    function OfflineRevenueShowManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    OfflineRevenueShowManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new OfflineRevenueShowManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    OfflineRevenueShowManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    OfflineRevenueShowManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('OfflineRevenueShow', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonOfflineRevenueShow成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonOfflineRevenueShow();
                jsonData = json[i];
                _this.data.set(jsonData.Chapter, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    OfflineRevenueShowManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    OfflineRevenueShowManager.prototype.getJsonOfflineRevenueShow = function (id) {
        return this.data.get(id);
    };
    /**根据通关章节获取解锁道具 */
    OfflineRevenueShowManager.prototype.getUnlockProps = function (id) {
        return this.data.get(id).UnlockProps;
    };
    /**根据通关章节获取每分钟金币 */
    OfflineRevenueShowManager.prototype.getGetCoins = function (id) {
        return this.data.get(id).GetCoins;
    };
    /**根据通关章节获取本章文本 */
    OfflineRevenueShowManager.prototype.getChapterIntroduction = function (id) {
        return this.data.get(id).ChapterIntroduction;
    };
    /**根据通关章节获取标题文本ID */
    OfflineRevenueShowManager.prototype.getTitletext = function (id) {
        return this.data.get(id).Titletext;
    };
    /** 静态方法，获取最大的 通关章节*/
    OfflineRevenueShowManager.getMaxChapter = function () {
        return 10;
    };
    OfflineRevenueShowManager._instance = null;
    return OfflineRevenueShowManager;
}());
exports.OfflineRevenueShowManager = OfflineRevenueShowManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTGV2ZWxcXE9mZmxpbmVSZXZlbnVlU2hvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFFckQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxnQkFBVyxHQUFZLEVBQUUsQ0FBRTtRQUNsQyxXQUFXO1FBQ0osYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixVQUFVO1FBQ0gsd0JBQW1CLEdBQVUsQ0FBQyxDQUFFO1FBQ3ZDLFlBQVk7UUFDTCxjQUFTLEdBQVUsQ0FBQyxDQUFFO0lBQ2pDLENBQUM7SUFBRCw2QkFBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksd0RBQXNCO0FBYW5DO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQW9DLElBQUksQ0FBQztRQUM3QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUFnRXhDLHlCQUF5QjtJQUc3QixDQUFDO0lBakVpQixxQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHlCQUF5QixFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELHdDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsNENBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUM5RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDMUMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksc0JBQXNCLEVBQUUsQ0FBQztnQkFDMUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsQ0FBQzthQUM1QztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLHNEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZiw2REFBeUIsR0FBaEMsVUFBaUMsRUFBUztRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCxrREFBYyxHQUFyQixVQUFzQixFQUFTO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxtQkFBbUI7SUFDWiwrQ0FBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCwwREFBc0IsR0FBN0IsVUFBOEIsRUFBUztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0lBQ2pELENBQUM7SUFDRCxvQkFBb0I7SUFDYixnREFBWSxHQUFuQixVQUFvQixFQUFTO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCx1Q0FBYSxHQUEzQjtRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQWpFYyxtQ0FBUyxHQUE4QixJQUFJLENBQUM7SUFzRS9ELGdDQUFDO0NBdkVELEFBdUVDLElBQUE7QUF2RVksOERBQXlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25PZmZsaW5lUmV2ZW51ZVNob3cge1xyXG4gICAgLyoq6YCa5YWz56ug6IqCICovXHJcbiAgICBwdWJsaWMgQ2hhcHRlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuino+mUgemBk+WFtyAqL1xyXG4gICAgcHVibGljIFVubG9ja1Byb3BzOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5q+P5YiG6ZKf6YeR5biBICovXHJcbiAgICBwdWJsaWMgR2V0Q29pbnM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmnKznq6DmlofmnKwgKi9cclxuICAgIHB1YmxpYyBDaGFwdGVySW50cm9kdWN0aW9uOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5qCH6aKY5paH5pysSUQgKi9cclxuICAgIHB1YmxpYyBUaXRsZXRleHQ6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZsaW5lUmV2ZW51ZVNob3dNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogT2ZmbGluZVJldmVudWVTaG93TWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25PZmZsaW5lUmV2ZW51ZVNob3c+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOk9mZmxpbmVSZXZlbnVlU2hvd01hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBPZmZsaW5lUmV2ZW51ZVNob3dNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ09mZmxpbmVSZXZlbnVlU2hvdycsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25PZmZsaW5lUmV2ZW51ZVNob3fmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uT2ZmbGluZVJldmVudWVTaG93KCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5DaGFwdGVyLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uT2ZmbGluZVJldmVudWVTaG93KGlkOm51bWJlcik6SnNvbk9mZmxpbmVSZXZlbnVlU2hvdyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz56ug6IqC6I635Y+W6Kej6ZSB6YGT5YW3ICovXHJcbiAgICBwdWJsaWMgZ2V0VW5sb2NrUHJvcHMoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5VbmxvY2tQcm9wcztcclxuICAgIH1cclxuICAgIC8qKuagueaNrumAmuWFs+eroOiKguiOt+WPluavj+WIhumSn+mHkeW4gSAqL1xyXG4gICAgcHVibGljIGdldEdldENvaW5zKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldENvaW5zO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz56ug6IqC6I635Y+W5pys56ug5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcHRlckludHJvZHVjdGlvbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DaGFwdGVySW50cm9kdWN0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YCa5YWz56ug6IqC6I635Y+W5qCH6aKY5paH5pysSUQgKi9cclxuICAgIHB1YmxpYyBnZXRUaXRsZXRleHQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGl0bGV0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg6YCa5YWz56ug6IqCKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4Q2hhcHRlcigpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19