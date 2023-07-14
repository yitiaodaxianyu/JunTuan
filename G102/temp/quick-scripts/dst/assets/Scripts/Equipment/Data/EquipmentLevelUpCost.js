
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Data/EquipmentLevelUpCost.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44122a6HsFOL6FdvEr7y/eu', 'EquipmentLevelUpCost');
// Scripts/Equipment/Data/EquipmentLevelUpCost.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentLevelUpCostManager = exports.JsonEquipmentLevelUpCost = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonEquipmentLevelUpCost = /** @class */ (function () {
    function JsonEquipmentLevelUpCost() {
        /**装备等级 */
        this.EquipmentLevel = 0;
        /**金币消耗 */
        this.CoinCost = 0;
        /**关卡限制 */
        this.LevelLimit = 0;
    }
    return JsonEquipmentLevelUpCost;
}());
exports.JsonEquipmentLevelUpCost = JsonEquipmentLevelUpCost;
var EquipmentLevelUpCostManager = /** @class */ (function () {
    function EquipmentLevelUpCostManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EquipmentLevelUpCostManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EquipmentLevelUpCostManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EquipmentLevelUpCostManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EquipmentLevelUpCostManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EquipmentLevelUpCost', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentLevelUpCost成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEquipmentLevelUpCost();
                jsonData = json[i];
                _this.data.set(jsonData.EquipmentLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EquipmentLevelUpCostManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EquipmentLevelUpCostManager.prototype.getJsonEquipmentLevelUpCost = function (id) {
        return this.data.get(id);
    };
    /**根据装备等级获取金币消耗 */
    EquipmentLevelUpCostManager.prototype.getCoinCost = function (id) {
        return this.data.get(id).CoinCost;
    };
    /**根据装备等级获取关卡限制 */
    EquipmentLevelUpCostManager.prototype.getLevelLimit = function (id) {
        return this.data.get(id).LevelLimit;
    };
    /** 静态方法，获取最大的 装备等级*/
    EquipmentLevelUpCostManager.getMaxEquipmentLevel = function () {
        return 100;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**根据装备等级获取一共消耗了多少金币 */
    EquipmentLevelUpCostManager.prototype.getCoinCostAll = function (id) {
        var coin = 0;
        for (var index = 1; index < id; index++) {
            coin += this.getCoinCost(index);
        }
        return coin;
    };
    EquipmentLevelUpCostManager._instance = null;
    return EquipmentLevelUpCostManager;
}());
exports.EquipmentLevelUpCostManager = EquipmentLevelUpCostManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxEYXRhXFxFcXVpcG1lbnRMZXZlbFVwQ29zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxVQUFVO1FBQ0gsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtJQUNsQyxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLDREQUF3QjtBQVNyQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFzQyxJQUFJLENBQUM7UUFDL0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBbUU1QyxDQUFDO0lBakVpQix1Q0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDJCQUEyQixFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDBDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsOENBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNoRyxJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDNUMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksd0JBQXdCLEVBQUUsQ0FBQztnQkFDNUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUNuRDtZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLHdEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixpRUFBMkIsR0FBbEMsVUFBbUMsRUFBUztRQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCxpREFBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCxtREFBYSxHQUFwQixVQUFxQixFQUFTO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCxnREFBb0IsR0FBbEM7UUFDSSxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCx5QkFBeUI7SUFFekIsdUJBQXVCO0lBQ2hCLG9EQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsSUFBSSxJQUFJLEdBQUMsQ0FBQyxDQUFBO1FBQ1YsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNyQyxJQUFJLElBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNoQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFwRWMscUNBQVMsR0FBZ0MsSUFBSSxDQUFDO0lBc0VqRSxrQ0FBQztDQXZFRCxBQXVFQyxJQUFBO0FBdkVZLGtFQUEyQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uRXF1aXBtZW50TGV2ZWxVcENvc3Qge1xyXG4gICAgLyoq6KOF5aSH562J57qnICovXHJcbiAgICBwdWJsaWMgRXF1aXBtZW50TGV2ZWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirph5HluIHmtojogJcgKi9cclxuICAgIHB1YmxpYyBDb2luQ29zdDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWFs+WNoemZkOWItiAqL1xyXG4gICAgcHVibGljIExldmVsTGltaXQ6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcXVpcG1lbnRMZXZlbFVwQ29zdE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBFcXVpcG1lbnRMZXZlbFVwQ29zdE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uRXF1aXBtZW50TGV2ZWxVcENvc3Q+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkVxdWlwbWVudExldmVsVXBDb3N0TWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEVxdWlwbWVudExldmVsVXBDb3N0TWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdFcXVpcG1lbnRMZXZlbFVwQ29zdCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25FcXVpcG1lbnRMZXZlbFVwQ29zdOaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25FcXVpcG1lbnRMZXZlbFVwQ29zdCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuRXF1aXBtZW50TGV2ZWwsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25FcXVpcG1lbnRMZXZlbFVwQ29zdChpZDpudW1iZXIpOkpzb25FcXVpcG1lbnRMZXZlbFVwQ29zdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KOF5aSH562J57qn6I635Y+W6YeR5biB5raI6ICXICovXHJcbiAgICBwdWJsaWMgZ2V0Q29pbkNvc3QoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29pbkNvc3Q7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oo4XlpIfnrYnnuqfojrflj5blhbPljaHpmZDliLYgKi9cclxuICAgIHB1YmxpYyBnZXRMZXZlbExpbWl0KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxldmVsTGltaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDoo4XlpIfnrYnnuqcqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhFcXVpcG1lbnRMZXZlbCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEwMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICAvKirmoLnmja7oo4XlpIfnrYnnuqfojrflj5bkuIDlhbHmtojogJfkuoblpJrlsJHph5HluIEgKi9cclxuICAgIHB1YmxpYyBnZXRDb2luQ29zdEFsbChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjb2luPTBcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgaWQ7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29pbis9dGhpcy5nZXRDb2luQ29zdChpbmRleClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvaW47XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==