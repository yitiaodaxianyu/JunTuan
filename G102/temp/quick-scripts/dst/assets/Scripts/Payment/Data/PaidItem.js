
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/Data/PaidItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d38bOhjzxImLOml1nG9Njk', 'PaidItem');
// Scripts/Payment/Data/PaidItem.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaidItemManager = exports.JsonPaidItem = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonPaidItem = /** @class */ (function () {
    function JsonPaidItem() {
        /**付费项id */
        this.PaidItemId = '';
        /**付费类型 */
        this.PurchaseType = 0;
        /**付费项名称 */
        this.PaidItemTitle = 0;
        /**价格 */
        this.Price = 0;
    }
    return JsonPaidItem;
}());
exports.JsonPaidItem = JsonPaidItem;
var PaidItemManager = /** @class */ (function () {
    function PaidItemManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    PaidItemManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PaidItemManager();
        }
        return this._instance;
    };
    //加载json
    PaidItemManager.prototype.loadJson = function (callback) {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('PaidItem', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonPaidItem成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonPaidItem();
                jsonData = json[i];
                _this.data.set(jsonData.PaidItemId, jsonData);
            }
            _this.is_load_completed = true;
            if (callback) {
                callback();
            }
        });
    };
    /**加载是否完成 */
    PaidItemManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    PaidItemManager.prototype.getJsonPaidItem = function (id) {
        return this.data.get(id);
    };
    /**根据付费项id获取付费类型 */
    PaidItemManager.prototype.getPurchaseType = function (id) {
        return this.data.get(id).PurchaseType;
    };
    /**根据付费项id获取付费项名称 */
    PaidItemManager.prototype.getPaidItemTitle = function (id) {
        return this.data.get(id).PaidItemTitle;
    };
    /**根据付费项id获取价格 */
    PaidItemManager.prototype.getPrice = function (id) {
        return this.data.get(id).Price;
    };
    /** 静态方法，获取最大的 付费项id*/
    PaidItemManager.getMaxPaidItemId = function () {
        return 'b501';
    };
    //以上格式统一，以下写每个json数据的特殊需求
    PaidItemManager.prototype.getData = function () {
        return this.data;
    };
    PaidItemManager._instance = null;
    return PaidItemManager;
}());
exports.PaidItemManager = PaidItemManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcRGF0YVxcUGFpZEl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBSXhEO0lBQUE7UUFDSSxXQUFXO1FBQ0osZUFBVSxHQUFVLEVBQUUsQ0FBRTtRQUMvQixVQUFVO1FBQ0gsaUJBQVksR0FBVSxDQUFDLENBQUU7UUFDaEMsV0FBVztRQUNKLGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFFBQVE7UUFDRCxVQUFLLEdBQVUsQ0FBQyxDQUFFO0lBQzdCLENBQUM7SUFBRCxtQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksb0NBQVk7QUFXekI7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBMEIsSUFBSSxDQUFDO1FBQ25DLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQTZENUMsQ0FBQztJQTNEaUIsMkJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQztTQUN4QztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsUUFBUTtJQUNELGtDQUFRLEdBQWYsVUFBZ0IsUUFBaUI7UUFBakMsaUJBbUJDO1FBbEJHLHlCQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNwRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDaEMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksWUFBWSxFQUFFLENBQUM7Z0JBQ2hDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDL0M7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1lBQzVCLElBQUcsUUFBUSxFQUFDO2dCQUNSLFFBQVEsRUFBRSxDQUFDO2FBQ2Q7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsNENBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHlDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsbUJBQW1CO0lBQ1oseUNBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsMENBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUNELGlCQUFpQjtJQUNWLGtDQUFRLEdBQWYsVUFBZ0IsRUFBUztRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0JBQXNCO0lBQ1IsZ0NBQWdCLEdBQTlCO1FBQ0ksT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELHlCQUF5QjtJQUVsQixpQ0FBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUEvRGMseUJBQVMsR0FBb0IsSUFBSSxDQUFDO0lBZ0VyRCxzQkFBQztDQWpFRCxBQWlFQyxJQUFBO0FBakVZLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblBhaWRJdGVtIHtcclxuICAgIC8qKuS7mOi0uemhuWlkICovXHJcbiAgICBwdWJsaWMgUGFpZEl0ZW1JZDpzdHJpbmcgPSAnJyA7XHJcbiAgICAvKirku5jotLnnsbvlnosgKi9cclxuICAgIHB1YmxpYyBQdXJjaGFzZVR5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirku5jotLnpobnlkI3np7AgKi9cclxuICAgIHB1YmxpYyBQYWlkSXRlbVRpdGxlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Lu35qC8ICovXHJcbiAgICBwdWJsaWMgUHJpY2U6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYWlkSXRlbU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBQYWlkSXRlbU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPHN0cmluZyxKc29uUGFpZEl0ZW0+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlBhaWRJdGVtTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFBhaWRJdGVtTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHB1YmxpYyBsb2FkSnNvbihjYWxsYmFjazpGdW5jdGlvbikge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdQYWlkSXRlbScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25QYWlkSXRlbeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25QYWlkSXRlbSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuUGFpZEl0ZW1JZCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUGFpZEl0ZW0oaWQ6c3RyaW5nKTpKc29uUGFpZEl0ZW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS7mOi0uemhuWlk6I635Y+W5LuY6LS557G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0UHVyY2hhc2VUeXBlKGlkOnN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlB1cmNoYXNlVHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS7mOi0uemhuWlk6I635Y+W5LuY6LS56aG55ZCN56ewICovXHJcbiAgICBwdWJsaWMgZ2V0UGFpZEl0ZW1UaXRsZShpZDpzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QYWlkSXRlbVRpdGxlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5LuY6LS56aG5aWTojrflj5bku7fmoLwgKi9cclxuICAgIHB1YmxpYyBnZXRQcmljZShpZDpzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5QcmljZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOS7mOi0uemhuWlkKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4UGFpZEl0ZW1JZCgpOnN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdiNTAxJztcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBwdWJsaWMgZ2V0RGF0YSgpOk1hcDxzdHJpbmcsSnNvblBhaWRJdGVtPntcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG59ICAgXHJcbiJdfQ==