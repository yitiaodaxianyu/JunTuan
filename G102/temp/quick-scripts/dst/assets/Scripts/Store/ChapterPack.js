
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/ChapterPack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '13e16ihZzhKvJTJc8v5hVZf', 'ChapterPack');
// Scripts/Store/ChapterPack.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapterPackManager = exports.JsonChapterPack = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonChapterPack = /** @class */ (function () {
    function JsonChapterPack() {
        /**礼包ID */
        this.GiftID = 0;
        /**章节 */
        this.Chapter = 0;
        /**礼包名称 */
        this.Giftname = 0;
        /**金币数量 */
        this.GetCoinNum = 0;
        /**钻石数量 */
        this.GetGemNum = 0;
        /**道具1ID */
        this.ItemId_1 = 0;
        /**道具1数量 */
        this.ItemNum_1 = 0;
        /**道具2ID */
        this.ItemId_2 = 0;
        /**道具2数量 */
        this.ItemNum_2 = 0;
        /**初始价格 */
        this.InitialPrice = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonChapterPack;
}());
exports.JsonChapterPack = JsonChapterPack;
var ChapterPackManager = /** @class */ (function () {
    function ChapterPackManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ChapterPackManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ChapterPackManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ChapterPackManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ChapterPackManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ChapterPack', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonChapterPack成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonChapterPack();
                jsonData = json[i];
                _this.data.set(jsonData.GiftID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ChapterPackManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ChapterPackManager.prototype.getJsonChapterPack = function (id) {
        return this.data.get(id);
    };
    /**根据礼包ID获取章节 */
    ChapterPackManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据礼包ID获取礼包名称 */
    ChapterPackManager.prototype.getGiftname = function (id) {
        return this.data.get(id).Giftname;
    };
    /**根据礼包ID获取金币数量 */
    ChapterPackManager.prototype.getGetCoinNum = function (id) {
        return this.data.get(id).GetCoinNum;
    };
    /**根据礼包ID获取钻石数量 */
    ChapterPackManager.prototype.getGetGemNum = function (id) {
        return this.data.get(id).GetGemNum;
    };
    /**根据礼包ID获取道具1ID */
    ChapterPackManager.prototype.getItemId_1 = function (id) {
        return this.data.get(id).ItemId_1;
    };
    /**根据礼包ID获取道具1数量 */
    ChapterPackManager.prototype.getItemNum_1 = function (id) {
        return this.data.get(id).ItemNum_1;
    };
    /**根据礼包ID获取道具2ID */
    ChapterPackManager.prototype.getItemId_2 = function (id) {
        return this.data.get(id).ItemId_2;
    };
    /**根据礼包ID获取道具2数量 */
    ChapterPackManager.prototype.getItemNum_2 = function (id) {
        return this.data.get(id).ItemNum_2;
    };
    /**根据礼包ID获取初始价格 */
    ChapterPackManager.prototype.getInitialPrice = function (id) {
        return this.data.get(id).InitialPrice;
    };
    /**根据礼包ID获取谷歌计费ID */
    ChapterPackManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 礼包ID*/
    ChapterPackManager.getMaxGiftID = function () {
        return 1001;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ChapterPackManager.prototype.getJsonData = function () {
        return this.data;
    };
    ChapterPackManager._instance = null;
    return ChapterPackManager;
}());
exports.ChapterPackManager = ChapterPackManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXENoYXB0ZXJQYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFxRDtBQUVyRDtJQUFBO1FBQ0ksVUFBVTtRQUNILFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsUUFBUTtRQUNELFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCxjQUFTLEdBQVUsRUFBRSxDQUFFO0lBQ2xDLENBQUM7SUFBRCxzQkFBQztBQUFELENBdkJBLEFBdUJDLElBQUE7QUF2QlksMENBQWU7QUF5QjVCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTZCLElBQUksQ0FBQztRQUN0QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUE4RjVDLENBQUM7SUE1RmlCLDhCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsaUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxxQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUN2RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksZUFBZSxFQUFFLENBQUM7Z0JBQ25DLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0M7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCwrQ0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsK0NBQWtCLEdBQXpCLFVBQTBCLEVBQVM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QsdUNBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsd0NBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsMENBQWEsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gseUNBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osd0NBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1oseUNBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osd0NBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1oseUNBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsNENBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IseUNBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQscUJBQXFCO0lBQ1AsK0JBQVksR0FBMUI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQseUJBQXlCO0lBRXpCLHdDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQS9GYyw0QkFBUyxHQUF1QixJQUFJLENBQUM7SUFpR3hELHlCQUFDO0NBbEdELEFBa0dDLElBQUE7QUFsR1ksZ0RBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25DaGFwdGVyUGFjayB7XHJcbiAgICAvKirnpLzljIVJRCAqL1xyXG4gICAgcHVibGljIEdpZnRJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKueroOiKgiAqL1xyXG4gICAgcHVibGljIENoYXB0ZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnpLzljIXlkI3np7AgKi9cclxuICAgIHB1YmxpYyBHaWZ0bmFtZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumHkeW4geaVsOmHjyAqL1xyXG4gICAgcHVibGljIEdldENvaW5OdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBHZXRHZW1OdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbcxSUQgKi9cclxuICAgIHB1YmxpYyBJdGVtSWRfMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzHmlbDph48gKi9cclxuICAgIHB1YmxpYyBJdGVtTnVtXzE6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpgZPlhbcySUQgKi9cclxuICAgIHB1YmxpYyBJdGVtSWRfMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzLmlbDph48gKi9cclxuICAgIHB1YmxpYyBJdGVtTnVtXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirliJ3lp4vku7fmoLwgKi9cclxuICAgIHB1YmxpYyBJbml0aWFsUHJpY2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirosLfmrYzorqHotLlJRCAqL1xyXG4gICAgcHVibGljIFByb2R1Y3RJZDpzdHJpbmcgPSAnJyA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDaGFwdGVyUGFja01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDaGFwdGVyUGFja01hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uQ2hhcHRlclBhY2s+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkNoYXB0ZXJQYWNrTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IENoYXB0ZXJQYWNrTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdDaGFwdGVyUGFjaycsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25DaGFwdGVyUGFja+aIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25DaGFwdGVyUGFjaygpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuR2lmdElELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uQ2hhcHRlclBhY2soaWQ6bnVtYmVyKTpKc29uQ2hhcHRlclBhY2sge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W56ug6IqCICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcHRlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DaGFwdGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bnpLzljIXlkI3np7AgKi9cclxuICAgIHB1YmxpYyBnZXRHaWZ0bmFtZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HaWZ0bmFtZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W6YeR5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0Q29pbk51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXRDb2luTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRHZXRHZW1OdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0R2VtTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bpgZPlhbcxSUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtSWRfMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtSWRfMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W6YGT5YW3MeaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldEl0ZW1OdW1fMShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtTnVtXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7npLzljIVJROiOt+WPlumBk+WFtzJJRCAqL1xyXG4gICAgcHVibGljIGdldEl0ZW1JZF8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW1JZF8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bpgZPlhbcy5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbU51bV8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW1OdW1fMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W5Yid5aeL5Lu35qC8ICovXHJcbiAgICBwdWJsaWMgZ2V0SW5pdGlhbFByaWNlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkluaXRpYWxQcmljZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W6LC35q2M6K6h6LS5SUQgKi9cclxuICAgIHB1YmxpYyBnZXRQcm9kdWN0SWQoaWQ6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJvZHVjdElkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg56S85YyFSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhHaWZ0SUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMDAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIGdldEpzb25EYXRhKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19