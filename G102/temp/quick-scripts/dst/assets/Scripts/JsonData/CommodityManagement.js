
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/CommodityManagement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6acfa10juJEwKI+ECEfQIAj', 'CommodityManagement');
// Scripts/JsonData/CommodityManagement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityManagementManager = exports.JsonCommodityManagement = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCommodityManagement = /** @class */ (function () {
    function JsonCommodityManagement() {
        /**商品ID */
        this.CommodityID = 0;
        /**购买消耗道具ID */
        this.CostItem = 0;
        /**消耗数量 */
        this.CostNum = 0;
        /**获得道具ID */
        this.GetItem = 0;
        /**获得道具数量 */
        this.GetNum = 0;
    }
    return JsonCommodityManagement;
}());
exports.JsonCommodityManagement = JsonCommodityManagement;
var CommodityManagementManager = /** @class */ (function () {
    function CommodityManagementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CommodityManagementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CommodityManagementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CommodityManagementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CommodityManagementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CommodityManagement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCommodityManagement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCommodityManagement();
                jsonData = json[i];
                _this.data.set(jsonData.CommodityID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CommodityManagementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CommodityManagementManager.prototype.getJsonCommodityManagement = function (id) {
        return this.data.get(id);
    };
    /**根据商品ID获取购买消耗道具ID */
    CommodityManagementManager.prototype.getCostItem = function (id) {
        return this.data.get(id).CostItem;
    };
    /**根据商品ID获取消耗数量 */
    CommodityManagementManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /**根据商品ID获取获得道具ID */
    CommodityManagementManager.prototype.getGetItem = function (id) {
        return this.data.get(id).GetItem;
    };
    /**根据商品ID获取获得道具数量 */
    CommodityManagementManager.prototype.getGetNum = function (id) {
        return this.data.get(id).GetNum;
    };
    /** 静态方法，获取最大的 商品ID*/
    CommodityManagementManager.getMaxCommodityID = function () {
        return 10210001;
    };
    CommodityManagementManager._instance = null;
    return CommodityManagementManager;
}());
exports.CommodityManagementManager = CommodityManagementManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXENvbW1vZGl0eU1hbmFnZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBR3JEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsY0FBYztRQUNQLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsWUFBWTtRQUNMLFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsWUFBWTtRQUNMLFdBQU0sR0FBVSxDQUFDLENBQUU7SUFDOUIsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSwwREFBdUI7QUFhcEM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBcUMsSUFBSSxDQUFDO1FBQzlDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQWdFeEMseUJBQXlCO0lBRzdCLENBQUM7SUFqRWlCLHNDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksMEJBQTBCLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QseUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSw2Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQy9GLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO2dCQUMzQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsdURBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtEQUEwQixHQUFqQyxVQUFrQyxFQUFTO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELHNCQUFzQjtJQUNmLGdEQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLCtDQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLCtDQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDhDQUFTLEdBQWhCLFVBQWlCLEVBQVM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLDRDQUFpQixHQUEvQjtRQUNJLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFqRWMsb0NBQVMsR0FBK0IsSUFBSSxDQUFDO0lBc0VoRSxpQ0FBQztDQXZFRCxBQXVFQyxJQUFBO0FBdkVZLGdFQUEwQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkNvbW1vZGl0eU1hbmFnZW1lbnQge1xyXG4gICAgLyoq5ZWG5ZOBSUQgKi9cclxuICAgIHB1YmxpYyBDb21tb2RpdHlJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKui0reS5sOa2iOiAl+mBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgQ29zdEl0ZW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJfmlbDph48gKi9cclxuICAgIHB1YmxpYyBDb3N0TnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6I635b6X6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBHZXRJdGVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6I635b6X6YGT5YW35pWw6YePICovXHJcbiAgICBwdWJsaWMgR2V0TnVtOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbW9kaXR5TWFuYWdlbWVudE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDb21tb2RpdHlNYW5hZ2VtZW50TWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Db21tb2RpdHlNYW5hZ2VtZW50Pj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpDb21tb2RpdHlNYW5hZ2VtZW50TWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IENvbW1vZGl0eU1hbmFnZW1lbnRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0NvbW1vZGl0eU1hbmFnZW1lbnQnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQ29tbW9kaXR5TWFuYWdlbWVudOaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Db21tb2RpdHlNYW5hZ2VtZW50KCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5Db21tb2RpdHlJRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkNvbW1vZGl0eU1hbmFnZW1lbnQoaWQ6bnVtYmVyKTpKc29uQ29tbW9kaXR5TWFuYWdlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZWG5ZOBSUTojrflj5botK3kubDmtojogJfpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIGdldENvc3RJdGVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3RJdGVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZWG5ZOBSUTojrflj5bmtojogJfmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRDb3N0TnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3ROdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7llYblk4FJROiOt+WPluiOt+W+l+mBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0SXRlbShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXRJdGVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZWG5ZOBSUTojrflj5bojrflvpfpgZPlhbfmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRHZXROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0TnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5ZWG5ZOBSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDb21tb2RpdHlJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEwMjEwMDAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19