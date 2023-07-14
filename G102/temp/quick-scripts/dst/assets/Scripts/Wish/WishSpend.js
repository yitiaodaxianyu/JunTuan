
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wish/WishSpend.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10dbcriB8pJg7M8Cq35skpH', 'WishSpend');
// Scripts/Wish/WishSpend.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishSpendManager = exports.JsonWishSpend = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonWishSpend = /** @class */ (function () {
    function JsonWishSpend() {
        /**许愿池ID */
        this.WishID = 0;
        /**许愿池类型 */
        this.WishType = 0;
        /**章节进度 */
        this.Chapter = 0;
        /**获得奖池集ID */
        this.GetRewardID = 0;
        /**单抽道具ID */
        this.OneDrawPropsID = 0;
        /**单抽道具消耗 */
        this.OneDrawPropsSpend = 0;
        /**单抽钻石消耗 */
        this.OneDrawDiamondsSpend = 0;
        /**十连抽道具消耗 */
        this.TenDrawPropsSpend = 0;
        /**十连抽钻石消耗 */
        this.TenDrawDiamondSpend = 0;
    }
    return JsonWishSpend;
}());
exports.JsonWishSpend = JsonWishSpend;
var WishSpendManager = /** @class */ (function () {
    function WishSpendManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    WishSpendManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WishSpendManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    WishSpendManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    WishSpendManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('WishSpend', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonWishSpend成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonWishSpend();
                jsonData = json[i];
                _this.data.set(jsonData.WishID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    WishSpendManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    WishSpendManager.prototype.getJsonWishSpend = function (id) {
        return this.data.get(id);
    };
    /**根据许愿池ID获取许愿池类型 */
    WishSpendManager.prototype.getWishType = function (id) {
        return this.data.get(id).WishType;
    };
    /**根据许愿池ID获取章节进度 */
    WishSpendManager.prototype.getChapter = function (id) {
        return this.data.get(id).Chapter;
    };
    /**根据许愿池ID获取获得奖池集ID */
    WishSpendManager.prototype.getGetRewardID = function (id) {
        return this.data.get(id).GetRewardID;
    };
    /**根据许愿池ID获取单抽道具ID */
    WishSpendManager.prototype.getOneDrawPropsID = function (id) {
        return this.data.get(id).OneDrawPropsID;
    };
    /**根据许愿池ID获取单抽道具消耗 */
    WishSpendManager.prototype.getOneDrawPropsSpend = function (id) {
        return this.data.get(id).OneDrawPropsSpend;
    };
    /**根据许愿池ID获取单抽钻石消耗 */
    WishSpendManager.prototype.getOneDrawDiamondsSpend = function (id) {
        return this.data.get(id).OneDrawDiamondsSpend;
    };
    /**根据许愿池ID获取十连抽道具消耗 */
    WishSpendManager.prototype.getTenDrawPropsSpend = function (id) {
        return this.data.get(id).TenDrawPropsSpend;
    };
    /**根据许愿池ID获取十连抽钻石消耗 */
    WishSpendManager.prototype.getTenDrawDiamondSpend = function (id) {
        return this.data.get(id).TenDrawDiamondSpend;
    };
    /** 静态方法，获取最大的 许愿池ID*/
    WishSpendManager.getMaxWishID = function () {
        return 2010;
    };
    WishSpendManager._instance = null;
    return WishSpendManager;
}());
exports.WishSpendManager = WishSpendManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2lzaFxcV2lzaFNwZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFxRDtBQUVyRDtJQUFBO1FBQ0ksV0FBVztRQUNKLFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsYUFBYTtRQUNOLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFlBQVk7UUFDTCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxZQUFZO1FBQ0wsc0JBQWlCLEdBQVUsQ0FBQyxDQUFFO1FBQ3JDLFlBQVk7UUFDTCx5QkFBb0IsR0FBVSxDQUFDLENBQUU7UUFDeEMsYUFBYTtRQUNOLHNCQUFpQixHQUFVLENBQUMsQ0FBRTtRQUNyQyxhQUFhO1FBQ04sd0JBQW1CLEdBQVUsQ0FBQyxDQUFFO0lBQzNDLENBQUM7SUFBRCxvQkFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksc0NBQWE7QUFxQjFCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTJCLElBQUksQ0FBQztRQUNwQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUFnRnhDLHlCQUF5QjtJQUc3QixDQUFDO0lBakZpQiw0QkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELCtCQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUs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Uiw2QkFBWSxHQUExQjtRQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFqRmMsMEJBQVMsR0FBcUIsSUFBSSxDQUFDO0lBc0Z0RCx1QkFBQztDQXZGRCxBQXVGQyxJQUFBO0FBdkZZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uV2lzaFNwZW5kIHtcclxuICAgIC8qKuiuuOaEv+axoElEICovXHJcbiAgICBwdWJsaWMgV2lzaElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6K645oS/5rGg57G75Z6LICovXHJcbiAgICBwdWJsaWMgV2lzaFR5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnq6DoioLov5vluqYgKi9cclxuICAgIHB1YmxpYyBDaGFwdGVyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6I635b6X5aWW5rGg6ZuGSUQgKi9cclxuICAgIHB1YmxpYyBHZXRSZXdhcmRJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWNleaKvemBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgT25lRHJhd1Byb3BzSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirljZXmir3pgZPlhbfmtojogJcgKi9cclxuICAgIHB1YmxpYyBPbmVEcmF3UHJvcHNTcGVuZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWNleaKvemSu+efs+a2iOiAlyAqL1xyXG4gICAgcHVibGljIE9uZURyYXdEaWFtb25kc1NwZW5kOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2B6L+e5oq96YGT5YW35raI6ICXICovXHJcbiAgICBwdWJsaWMgVGVuRHJhd1Byb3BzU3BlbmQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirljYHov57mir3pkrvnn7PmtojogJcgKi9cclxuICAgIHB1YmxpYyBUZW5EcmF3RGlhbW9uZFNwZW5kOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2lzaFNwZW5kTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFdpc2hTcGVuZE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uV2lzaFNwZW5kPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpXaXNoU3BlbmRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgV2lzaFNwZW5kTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdXaXNoU3BlbmQnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uV2lzaFNwZW5k5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbldpc2hTcGVuZCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuV2lzaElELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uV2lzaFNwZW5kKGlkOm51bWJlcik6SnNvbldpc2hTcGVuZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6K645oS/5rGgSUTojrflj5borrjmhL/msaDnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRXaXNoVHlwZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5XaXNoVHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiuuOaEv+axoElE6I635Y+W56ug6IqC6L+b5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0Q2hhcHRlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DaGFwdGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6K645oS/5rGgSUTojrflj5bojrflvpflpZbmsaDpm4ZJRCAqL1xyXG4gICAgcHVibGljIGdldEdldFJld2FyZElEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldFJld2FyZElEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6K645oS/5rGgSUTojrflj5bljZXmir3pgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIGdldE9uZURyYXdQcm9wc0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk9uZURyYXdQcm9wc0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6K645oS/5rGgSUTojrflj5bljZXmir3pgZPlhbfmtojogJcgKi9cclxuICAgIHB1YmxpYyBnZXRPbmVEcmF3UHJvcHNTcGVuZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5PbmVEcmF3UHJvcHNTcGVuZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiuuOaEv+axoElE6I635Y+W5Y2V5oq96ZK755+z5raI6ICXICovXHJcbiAgICBwdWJsaWMgZ2V0T25lRHJhd0RpYW1vbmRzU3BlbmQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuT25lRHJhd0RpYW1vbmRzU3BlbmQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7orrjmhL/msaBJROiOt+WPluWNgei/nuaKvemBk+WFt+a2iOiAlyAqL1xyXG4gICAgcHVibGljIGdldFRlbkRyYXdQcm9wc1NwZW5kKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRlbkRyYXdQcm9wc1NwZW5kO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6K645oS/5rGgSUTojrflj5bljYHov57mir3pkrvnn7PmtojogJcgKi9cclxuICAgIHB1YmxpYyBnZXRUZW5EcmF3RGlhbW9uZFNwZW5kKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRlbkRyYXdEaWFtb25kU3BlbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDorrjmhL/msaBJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFdpc2hJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDIwMTA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=