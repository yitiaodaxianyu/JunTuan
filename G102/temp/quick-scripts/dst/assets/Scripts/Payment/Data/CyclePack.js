
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/Data/CyclePack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c5507wF6UpJTLkSX0t3XWoz', 'CyclePack');
// Scripts/Payment/Data/CyclePack.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyclePackManager = exports.JsonCyclePack = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonCyclePack = /** @class */ (function () {
    function JsonCyclePack() {
        /**礼包ID */
        this.GiftID = 0;
        /**礼包类型 */
        this.GiftText = 0;
        /**金币数量 */
        this.GetCoinNum = 0;
        /**钻石数量 */
        this.GetGemNum = 0;
        /**龙晶数量 */
        this.GetCrystal = 0;
        /**道具1ID */
        this.ItemId_1 = 0;
        /**道具1数量 */
        this.ItemNum_1 = 0;
        /**道具2ID */
        this.ItemId_2 = 0;
        /**道具2数量 */
        this.ItemNum_2 = 0;
        /**道具3ID */
        this.ItemId_3 = 0;
        /**道具3数量 */
        this.ItemNum_3 = 0;
        /**是否为广告奖励 */
        this.AdReward = 0;
        /**广告可观看次数 */
        this.AdPlayableTimes = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonCyclePack;
}());
exports.JsonCyclePack = JsonCyclePack;
var CyclePackManager = /** @class */ (function () {
    function CyclePackManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CyclePackManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CyclePackManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CyclePackManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CyclePackManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CyclePack', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCyclePack成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCyclePack();
                jsonData = json[i];
                _this.data.set(jsonData.GiftID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CyclePackManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CyclePackManager.prototype.getJsonCyclePack = function (id) {
        return this.data.get(id);
    };
    /**根据礼包ID获取礼包类型 */
    CyclePackManager.prototype.getGiftText = function (id) {
        return this.data.get(id).GiftText;
    };
    /**根据礼包ID获取金币数量 */
    CyclePackManager.prototype.getGetCoinNum = function (id) {
        return this.data.get(id).GetCoinNum;
    };
    /**根据礼包ID获取钻石数量 */
    CyclePackManager.prototype.getGetGemNum = function (id) {
        return this.data.get(id).GetGemNum;
    };
    /**根据礼包ID获取龙晶数量 */
    CyclePackManager.prototype.getGetCrystal = function (id) {
        return this.data.get(id).GetCrystal;
    };
    /**根据礼包ID获取道具1ID */
    CyclePackManager.prototype.getItemId_1 = function (id) {
        return this.data.get(id).ItemId_1;
    };
    /**根据礼包ID获取道具1数量 */
    CyclePackManager.prototype.getItemNum_1 = function (id) {
        return this.data.get(id).ItemNum_1;
    };
    /**根据礼包ID获取道具2ID */
    CyclePackManager.prototype.getItemId_2 = function (id) {
        return this.data.get(id).ItemId_2;
    };
    /**根据礼包ID获取道具2数量 */
    CyclePackManager.prototype.getItemNum_2 = function (id) {
        return this.data.get(id).ItemNum_2;
    };
    /**根据礼包ID获取道具3ID */
    CyclePackManager.prototype.getItemId_3 = function (id) {
        return this.data.get(id).ItemId_3;
    };
    /**根据礼包ID获取道具3数量 */
    CyclePackManager.prototype.getItemNum_3 = function (id) {
        return this.data.get(id).ItemNum_3;
    };
    /**根据礼包ID获取是否为广告奖励 */
    CyclePackManager.prototype.getAdReward = function (id) {
        return this.data.get(id).AdReward;
    };
    /**根据礼包ID获取广告可观看次数 */
    CyclePackManager.prototype.getAdPlayableTimes = function (id) {
        return this.data.get(id).AdPlayableTimes;
    };
    /**根据礼包ID获取谷歌计费ID */
    CyclePackManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 礼包ID*/
    CyclePackManager.getMaxGiftID = function () {
        return 3006;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    CyclePackManager.prototype.getDataByType = function (type) {
        var dataList = [];
        this.data.forEach(function (v, k) {
            if (v.GiftText == type) {
                dataList.push(v);
            }
        });
        return dataList;
    };
    CyclePackManager.prototype.resetDayData = function () {
        this.data.forEach(function (v, k) {
            if (v.GiftText == 1) {
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID, "");
            }
        });
    };
    CyclePackManager.prototype.resetWeekData = function () {
        this.data.forEach(function (v, k) {
            if (v.GiftText == 2) {
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID, "");
            }
        });
    };
    CyclePackManager.prototype.resetMonthData = function () {
        this.data.forEach(function (v, k) {
            if (v.GiftText == 3) {
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID, "");
            }
        });
    };
    CyclePackManager.prototype.getData = function () {
        return this.data;
    };
    CyclePackManager._instance = null;
    return CyclePackManager;
}());
exports.CyclePackManager = CyclePackManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcRGF0YVxcQ3ljbGVQYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsVUFBVTtRQUNILGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsYUFBYTtRQUNOLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsYUFBYTtRQUNOLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFlBQVk7UUFDTCxjQUFTLEdBQVUsRUFBRSxDQUFFO0lBQ2xDLENBQUM7SUFBRCxvQkFBQztBQUFELENBN0JBLEFBNkJDLElBQUE7QUE3Qlksc0NBQWE7QUErQjFCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTJCLElBQUksQ0FBQztRQUNwQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUE2STVDLENBQUM7SUEzSWlCLDRCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxJ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LElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQS9JYywwQkFBUyxHQUFxQixJQUFJLENBQUM7SUFnSnRELHVCQUFDO0NBakpELEFBaUpDLElBQUE7QUFqSlksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uQ3ljbGVQYWNrIHtcclxuICAgIC8qKuekvOWMhUlEICovXHJcbiAgICBwdWJsaWMgR2lmdElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq56S85YyF57G75Z6LICovXHJcbiAgICBwdWJsaWMgR2lmdFRleHQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirph5HluIHmlbDph48gKi9cclxuICAgIHB1YmxpYyBHZXRDb2luTnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6ZK755+z5pWw6YePICovXHJcbiAgICBwdWJsaWMgR2V0R2VtTnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6b6Z5pm25pWw6YePICovXHJcbiAgICBwdWJsaWMgR2V0Q3J5c3RhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzFJRCAqL1xyXG4gICAgcHVibGljIEl0ZW1JZF8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MeaVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW1OdW1fMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzJJRCAqL1xyXG4gICAgcHVibGljIEl0ZW1JZF8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MuaVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW1OdW1fMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzNJRCAqL1xyXG4gICAgcHVibGljIEl0ZW1JZF8zOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3M+aVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW1OdW1fMzpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaYr+WQpuS4uuW5v+WRiuWlluWKsSAqL1xyXG4gICAgcHVibGljIEFkUmV3YXJkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5bm/5ZGK5Y+v6KeC55yL5qyh5pWwICovXHJcbiAgICBwdWJsaWMgQWRQbGF5YWJsZVRpbWVzOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6LC35q2M6K6h6LS5SUQgKi9cclxuICAgIHB1YmxpYyBQcm9kdWN0SWQ6c3RyaW5nID0gJycgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3ljbGVQYWNrTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEN5Y2xlUGFja01hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uQ3ljbGVQYWNrPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpDeWNsZVBhY2tNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgQ3ljbGVQYWNrTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdDeWNsZVBhY2snLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQ3ljbGVQYWNr5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkN5Y2xlUGFjaygpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuR2lmdElELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uQ3ljbGVQYWNrKGlkOm51bWJlcik6SnNvbkN5Y2xlUGFjayB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bnpLzljIXnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRHaWZ0VGV4dChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HaWZ0VGV4dDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W6YeR5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0Q29pbk51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXRDb2luTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRHZXRHZW1OdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0R2VtTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bpvpnmmbbmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRHZXRDcnlzdGFsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldENyeXN0YWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7npLzljIVJROiOt+WPlumBk+WFtzFJRCAqL1xyXG4gICAgcHVibGljIGdldEl0ZW1JZF8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW1JZF8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bpgZPlhbcx5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbU51bV8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW1OdW1fMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W6YGT5YW3MklEICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbUlkXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbUlkXzI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7npLzljIVJROiOt+WPlumBk+WFtzLmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtTnVtXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbU51bV8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bpgZPlhbczSUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtSWRfMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtSWRfMztcclxuICAgIH1cclxuICAgIC8qKuagueaNruekvOWMhUlE6I635Y+W6YGT5YW3M+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldEl0ZW1OdW1fMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtTnVtXzM7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7npLzljIVJROiOt+WPluaYr+WQpuS4uuW5v+WRiuWlluWKsSAqL1xyXG4gICAgcHVibGljIGdldEFkUmV3YXJkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFkUmV3YXJkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5blub/lkYrlj6/op4LnnIvmrKHmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRBZFBsYXlhYmxlVGltZXMoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQWRQbGF5YWJsZVRpbWVzO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56S85YyFSUTojrflj5bosLfmrYzorqHotLlJRCAqL1xyXG4gICAgcHVibGljIGdldFByb2R1Y3RJZChpZDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9kdWN0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDnpLzljIVJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEdpZnRJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDMwMDY7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0RGF0YUJ5VHlwZSh0eXBlOm51bWJlcik6SnNvbkN5Y2xlUGFja1tde1xyXG4gICAgICAgIGxldCBkYXRhTGlzdDpKc29uQ3ljbGVQYWNrW10gPVtdO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHYuR2lmdFRleHQgPT0gdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBkYXRhTGlzdC5wdXNoKHYpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXREYXlEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgIGlmKHYuR2lmdFRleHQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYXlfZ2l0X2JhZ19pdGVtX1wiICsgdi5HaWZ0SUQsXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldFdlZWtEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgIGlmKHYuR2lmdFRleHQgPT0gMil7XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYXlfZ2l0X2JhZ19pdGVtX1wiICsgdi5HaWZ0SUQsXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldE1vbnRoRGF0YSgpe1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspID0+e1xyXG4gICAgICAgICAgICBpZih2LkdpZnRUZXh0ID09IDMpe1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicGF5X2dpdF9iYWdfaXRlbV9cIiArIHYuR2lmdElELFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhKCk6TWFwPG51bWJlcixKc29uQ3ljbGVQYWNrPntcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==