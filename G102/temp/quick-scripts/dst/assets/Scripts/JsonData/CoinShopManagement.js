
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/CoinShopManagement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7c92oloZxBt6YC0NI5/tff', 'CoinShopManagement');
// Scripts/JsonData/CoinShopManagement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinShopManagementManager = exports.JsonCoinShopManagement = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCoinShopManagement = /** @class */ (function () {
    function JsonCoinShopManagement() {
        /**商店ID */
        this.Shop_ID = 0;
        /**章节 */
        this.chapter = 0;
        /**序号 */
        this.ShopNum = 0;
        /**商店列表 */
        this.Shoplist = [];
    }
    return JsonCoinShopManagement;
}());
exports.JsonCoinShopManagement = JsonCoinShopManagement;
var CoinShopManagementManager = /** @class */ (function () {
    function CoinShopManagementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CoinShopManagementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CoinShopManagementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CoinShopManagementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CoinShopManagementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CoinShopManagement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCoinShopManagement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCoinShopManagement();
                jsonData = json[i];
                _this.data.set(jsonData.Shop_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CoinShopManagementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CoinShopManagementManager.prototype.getJsonCoinShopManagement = function (id) {
        return this.data.get(id);
    };
    /**根据商店ID获取章节 */
    CoinShopManagementManager.prototype.getchapter = function (id) {
        return this.data.get(id).chapter;
    };
    /**根据商店ID获取序号 */
    CoinShopManagementManager.prototype.getShopNum = function (id) {
        return this.data.get(id).ShopNum;
    };
    /**根据商店ID获取商店列表 */
    CoinShopManagementManager.prototype.getShoplist = function (id) {
        return this.data.get(id).Shoplist;
    };
    /** 静态方法，获取最大的 商店ID*/
    CoinShopManagementManager.getMaxShop_ID = function () {
        return 10003;
    };
    CoinShopManagementManager._instance = null;
    return CoinShopManagementManager;
}());
exports.CoinShopManagementManager = CoinShopManagementManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXENvaW5TaG9wTWFuYWdlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFHckQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxhQUFRLEdBQVksRUFBRSxDQUFFO0lBQ25DLENBQUM7SUFBRCw2QkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksd0RBQXNCO0FBV25DO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQW9DLElBQUksQ0FBQztRQUM3QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUE0RHhDLHlCQUF5QjtJQUc3QixDQUFDO0lBN0RpQixxQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHlCQUF5QixFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELHdDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsNENBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUM5RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDMUMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksc0JBQXNCLEVBQUUsQ0FBQztnQkFDMUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsQ0FBQzthQUM1QztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLHNEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZiw2REFBeUIsR0FBaEMsVUFBaUMsRUFBUztRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCw4Q0FBVSxHQUFqQixVQUFrQixFQUFTO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCw4Q0FBVSxHQUFqQixVQUFrQixFQUFTO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCwrQ0FBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCx1Q0FBYSxHQUEzQjtRQUNJLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUE3RGMsbUNBQVMsR0FBOEIsSUFBSSxDQUFDO0lBa0UvRCxnQ0FBQztDQW5FRCxBQW1FQyxJQUFBO0FBbkVZLDhEQUF5QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkNvaW5TaG9wTWFuYWdlbWVudCB7XHJcbiAgICAvKirllYblupdJRCAqL1xyXG4gICAgcHVibGljIFNob3BfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnq6DoioIgKi9cclxuICAgIHB1YmxpYyBjaGFwdGVyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5bqP5Y+3ICovXHJcbiAgICBwdWJsaWMgU2hvcE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWVhuW6l+WIl+ihqCAqL1xyXG4gICAgcHVibGljIFNob3BsaXN0Om51bWJlcltdID0gW10gO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29pblNob3BNYW5hZ2VtZW50TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IENvaW5TaG9wTWFuYWdlbWVudE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uQ29pblNob3BNYW5hZ2VtZW50Pj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpDb2luU2hvcE1hbmFnZW1lbnRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgQ29pblNob3BNYW5hZ2VtZW50TWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdDb2luU2hvcE1hbmFnZW1lbnQnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQ29pblNob3BNYW5hZ2VtZW505oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkNvaW5TaG9wTWFuYWdlbWVudCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuU2hvcF9JRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkNvaW5TaG9wTWFuYWdlbWVudChpZDpudW1iZXIpOkpzb25Db2luU2hvcE1hbmFnZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWVhuW6l0lE6I635Y+W56ug6IqCICovXHJcbiAgICBwdWJsaWMgZ2V0Y2hhcHRlcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5jaGFwdGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZWG5bqXSUTojrflj5bluo/lj7cgKi9cclxuICAgIHB1YmxpYyBnZXRTaG9wTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNob3BOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7llYblupdJROiOt+WPluWVhuW6l+WIl+ihqCAqL1xyXG4gICAgcHVibGljIGdldFNob3BsaXN0KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2hvcGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDllYblupdJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFNob3BfSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMDAwMztcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==