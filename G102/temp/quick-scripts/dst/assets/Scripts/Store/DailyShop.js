
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/DailyShop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8617fgT1fpCoLRo3W7hqv3L', 'DailyShop');
// Scripts/Store/DailyShop.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyShopManager = exports.JsonDailyShop = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var CommodityInformation_1 = require("./CommodityInformation");
var JsonDailyShop = /** @class */ (function () {
    function JsonDailyShop() {
        /**商店ID */
        this.Shop_ID = 0;
        /**章节 */
        this.chapter = 0;
        /**序号 */
        this.ShopNum = 0;
        /**商店列表 */
        this.Shoplist = [];
    }
    return JsonDailyShop;
}());
exports.JsonDailyShop = JsonDailyShop;
var DailyShopManager = /** @class */ (function () {
    function DailyShopManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    DailyShopManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DailyShopManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DailyShopManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DailyShopManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DailyShop', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDailyShop成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDailyShop();
                jsonData = json[i];
                _this.data.set(jsonData.Shop_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DailyShopManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DailyShopManager.prototype.getJsonDailyShop = function (id) {
        return this.data.get(id);
    };
    /**根据商店ID获取章节 */
    DailyShopManager.prototype.getchapter = function (id) {
        return this.data.get(id).chapter;
    };
    /**根据商店ID获取序号 */
    DailyShopManager.prototype.getShopNum = function (id) {
        return this.data.get(id).ShopNum;
    };
    /**根据商店ID获取商店列表 */
    DailyShopManager.prototype.getShoplist = function (id) {
        return this.data.get(id).Shoplist;
    };
    /** 静态方法，获取最大的 商店ID*/
    DailyShopManager.getMaxShop_ID = function () {
        return 10003;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    DailyShopManager.prototype.getJsonDataByChapterAndInde = function (chapter, index) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.chapter == chapter && v.ShopNum == index) {
                info = v;
            }
        });
        return info;
    };
    DailyShopManager.prototype.check = function () {
        this.data.forEach(function (v, k) {
            for (var i = 0; i < v.Shoplist.length; i++) {
                var shopId = v.Shoplist[i];
                if (!CommodityInformation_1.CommodityInformationManager.getInstance().getJsonCommodityInformation(shopId)) {
                    cc.error("不存在商店id：" + shopId);
                }
            }
        });
    };
    DailyShopManager._instance = null;
    return DailyShopManager;
}());
exports.DailyShopManager = DailyShopManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXERhaWx5U2hvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFDckQsK0RBQXFFO0FBRXJFO0lBQUE7UUFDSSxVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixRQUFRO1FBQ0QsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixRQUFRO1FBQ0QsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixVQUFVO1FBQ0gsYUFBUSxHQUFZLEVBQUUsQ0FBRTtJQUNuQyxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHNDQUFhO0FBVzFCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTJCLElBQUksQ0FBQztRQUNwQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUFrRjVDLENBQUM7SUFoRmlCLDRCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsK0JBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxtQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNyRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FB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Z0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENvbW1vZGl0eUluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0NvbW1vZGl0eUluZm9ybWF0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkRhaWx5U2hvcCB7XHJcbiAgICAvKirllYblupdJRCAqL1xyXG4gICAgcHVibGljIFNob3BfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnq6DoioIgKi9cclxuICAgIHB1YmxpYyBjaGFwdGVyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5bqP5Y+3ICovXHJcbiAgICBwdWJsaWMgU2hvcE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWVhuW6l+WIl+ihqCAqL1xyXG4gICAgcHVibGljIFNob3BsaXN0Om51bWJlcltdID0gW10gO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGFpbHlTaG9wTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERhaWx5U2hvcE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uRGFpbHlTaG9wPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpEYWlseVNob3BNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRGFpbHlTaG9wTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdEYWlseVNob3AnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uRGFpbHlTaG9w5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkRhaWx5U2hvcCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuU2hvcF9JRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkRhaWx5U2hvcChpZDpudW1iZXIpOkpzb25EYWlseVNob3Age1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWVhuW6l0lE6I635Y+W56ug6IqCICovXHJcbiAgICBwdWJsaWMgZ2V0Y2hhcHRlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5jaGFwdGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZWG5bqXSUTojrflj5bluo/lj7cgKi9cclxuICAgIHB1YmxpYyBnZXRTaG9wTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNob3BOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7llYblupdJROiOt+WPluWVhuW6l+WIl+ihqCAqL1xyXG4gICAgcHVibGljIGdldFNob3BsaXN0KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2hvcGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDllYblupdJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFNob3BfSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMDAwMztcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBnZXRKc29uRGF0YUJ5Q2hhcHRlckFuZEluZGUoY2hhcHRlcjpudW1iZXIsaW5kZXg6bnVtYmVyKTpKc29uRGFpbHlTaG9we1xyXG4gICAgICAgIGxldCBpbmZvOkpzb25EYWlseVNob3AgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuY2hhcHRlciA9PSBjaGFwdGVyICYmIHYuU2hvcE51bSA9PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrKCl7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8di5TaG9wbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNob3BJZD12LlNob3BsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYoIUNvbW1vZGl0eUluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Db21tb2RpdHlJbmZvcm1hdGlvbihzaG9wSWQpKXtcclxuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIuS4jeWtmOWcqOWVhuW6l2lk77yaXCIrc2hvcElkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==