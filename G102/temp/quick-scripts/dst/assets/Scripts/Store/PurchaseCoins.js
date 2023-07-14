
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/PurchaseCoins.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6f2881UqRJLI6l32ZjtcACS', 'PurchaseCoins');
// Scripts/Store/PurchaseCoins.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseCoinsManager = exports.JsonPurchaseCoins = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonPurchaseCoins = /** @class */ (function () {
    function JsonPurchaseCoins() {
        /**金币ID */
        this.CoinPurchaseID = 0;
        /**章节进度 */
        this.Chapter = 0;
        /**展示位 */
        this.DisplayPosition = 0;
        /**展示位文本 */
        this.DisplayPositionTextID = 0;
        /**消耗钻石数量 */
        this.ConsumeDiamondsNum = 0;
        /**获得金币数量 */
        this.GetCoinNum = 0;
        /**是否为广告奖励 */
        this.AdReward = 0;
        /**广告可观看次数 */
        this.AdPlayableTimes = 0;
    }
    return JsonPurchaseCoins;
}());
exports.JsonPurchaseCoins = JsonPurchaseCoins;
var PurchaseCoinsManager = /** @class */ (function () {
    function PurchaseCoinsManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    PurchaseCoinsManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PurchaseCoinsManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    PurchaseCoinsManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    PurchaseCoinsManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('PurchaseCoins', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonPurchaseCoins成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonPurchaseCoins();
                jsonData = json[i];
                _this.data.set(jsonData.CoinPurchaseID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    PurchaseCoinsManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    PurchaseCoinsManager.prototype.getJsonPurchaseCoins = function (id) {
        return this.data.get(id);
    };
    /**根据金币ID获取章节进度 */
    PurchaseCoinsManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据金币ID获取展示位 */
    PurchaseCoinsManager.prototype.getDisplayPosition = function (id) {
        return this.data.get(id).DisplayPosition;
    };
    /**根据金币ID获取展示位文本 */
    PurchaseCoinsManager.prototype.getDisplayPositionTextID = function (id) {
        return this.data.get(id).DisplayPositionTextID;
    };
    /**根据金币ID获取消耗钻石数量 */
    PurchaseCoinsManager.prototype.getConsumeDiamondsNum = function (id) {
        return this.data.get(id).ConsumeDiamondsNum;
    };
    /**根据金币ID获取获得金币数量 */
    PurchaseCoinsManager.prototype.getGetCoinNum = function (id) {
        return this.data.get(id).GetCoinNum;
    };
    /**根据金币ID获取是否为广告奖励 */
    PurchaseCoinsManager.prototype.getAdReward = function (id) {
        return this.data.get(id).AdReward;
    };
    /**根据金币ID获取广告可观看次数 */
    PurchaseCoinsManager.prototype.getAdPlayableTimes = function (id) {
        return this.data.get(id).AdPlayableTimes;
    };
    /** 静态方法，获取最大的 金币ID*/
    PurchaseCoinsManager.getMaxCoinPurchaseID = function () {
        return 1003;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    PurchaseCoinsManager.prototype.getJsonDataByChapter = function (chapter) {
        var list = [];
        this.data.forEach(function (v, k) {
            if (v.Chapter == chapter) {
                list.push(v);
            }
        });
        return list;
    };
    PurchaseCoinsManager._instance = null;
    return PurchaseCoinsManager;
}());
exports.PurchaseCoinsManager = PurchaseCoinsManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXFB1cmNoYXNlQ29pbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsbUJBQWMsR0FBVSxDQUFDLENBQUU7UUFDbEMsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsU0FBUztRQUNGLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFdBQVc7UUFDSiwwQkFBcUIsR0FBVSxDQUFDLENBQUU7UUFDekMsWUFBWTtRQUNMLHVCQUFrQixHQUFVLENBQUMsQ0FBRTtRQUN0QyxZQUFZO1FBQ0wsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixhQUFhO1FBQ04sYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixhQUFhO1FBQ04sb0JBQWUsR0FBVSxDQUFDLENBQUU7SUFDdkMsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSw4Q0FBaUI7QUFtQjlCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQStCLElBQUksQ0FBQztRQUN4QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUF1RjVDLENBQUM7SUFyRmlCLGdDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsbUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSx1Q0FBUSxHQUFo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QUMsQ0FBQztZQUNsQixJQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFDO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBekZjLDhCQUFTLEdBQXlCLElBQUksQ0FBQztJQTBGMUQsMkJBQUM7Q0EzRkQsQUEyRkMsSUFBQTtBQTNGWSxvREFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblB1cmNoYXNlQ29pbnMge1xyXG4gICAgLyoq6YeR5biBSUQgKi9cclxuICAgIHB1YmxpYyBDb2luUHVyY2hhc2VJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKueroOiKgui/m+W6piAqL1xyXG4gICAgcHVibGljIENoYXB0ZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlsZXnpLrkvY0gKi9cclxuICAgIHB1YmxpYyBEaXNwbGF5UG9zaXRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirlsZXnpLrkvY3mlofmnKwgKi9cclxuICAgIHB1YmxpYyBEaXNwbGF5UG9zaXRpb25UZXh0SUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJfpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBDb25zdW1lRGlhbW9uZHNOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirojrflvpfph5HluIHmlbDph48gKi9cclxuICAgIHB1YmxpYyBHZXRDb2luTnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5piv5ZCm5Li65bm/5ZGK5aWW5YqxICovXHJcbiAgICBwdWJsaWMgQWRSZXdhcmQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlub/lkYrlj6/op4LnnIvmrKHmlbAgKi9cclxuICAgIHB1YmxpYyBBZFBsYXlhYmxlVGltZXM6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQdXJjaGFzZUNvaW5zTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFB1cmNoYXNlQ29pbnNNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblB1cmNoYXNlQ29pbnM+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlB1cmNoYXNlQ29pbnNNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgUHVyY2hhc2VDb2luc01hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignUHVyY2hhc2VDb2lucycsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25QdXJjaGFzZUNvaW5z5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblB1cmNoYXNlQ29pbnMoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkNvaW5QdXJjaGFzZUlELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUHVyY2hhc2VDb2lucyhpZDpudW1iZXIpOkpzb25QdXJjaGFzZUNvaW5zIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ph5HluIFJROiOt+WPlueroOiKgui/m+W6piAqL1xyXG4gICAgcHVibGljIGdldENoYXB0ZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ2hhcHRlcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumHkeW4gUlE6I635Y+W5bGV56S65L2NICovXHJcbiAgICBwdWJsaWMgZ2V0RGlzcGxheVBvc2l0aW9uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkRpc3BsYXlQb3NpdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumHkeW4gUlE6I635Y+W5bGV56S65L2N5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0RGlzcGxheVBvc2l0aW9uVGV4dElEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkRpc3BsYXlQb3NpdGlvblRleHRJRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumHkeW4gUlE6I635Y+W5raI6ICX6ZK755+z5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0Q29uc3VtZURpYW1vbmRzTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvbnN1bWVEaWFtb25kc051bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumHkeW4gUlE6I635Y+W6I635b6X6YeR5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0Q29pbk51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXRDb2luTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6YeR5biBSUTojrflj5bmmK/lkKbkuLrlub/lkYrlpZblirEgKi9cclxuICAgIHB1YmxpYyBnZXRBZFJld2FyZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BZFJld2FyZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrumHkeW4gUlE6I635Y+W5bm/5ZGK5Y+v6KeC55yL5qyh5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0QWRQbGF5YWJsZVRpbWVzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFkUGxheWFibGVUaW1lcztcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOmHkeW4gUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4Q29pblB1cmNoYXNlSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMDAzO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIGdldEpzb25EYXRhQnlDaGFwdGVyKGNoYXB0ZXI6bnVtYmVyKTpKc29uUHVyY2hhc2VDb2luc1tde1xyXG4gICAgICAgIGxldCBsaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgIGlmKHYuQ2hhcHRlciA9PSBjaGFwdGVyKXtcclxuICAgICAgICAgICAgICAgIGxpc3QucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==