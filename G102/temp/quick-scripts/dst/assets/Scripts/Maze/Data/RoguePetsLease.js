
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/Data/RoguePetsLease.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8053d2YNzNAeIUCVbhwcByU', 'RoguePetsLease');
// Scripts/Maze/Data/RoguePetsLease.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoguePetsLeaseManager = exports.JsonRoguePetsLease = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRoguePetsLease = /** @class */ (function () {
    function JsonRoguePetsLease() {
        /**主线章节 */
        this.Chapter = 0;
        /**宠物奖池ID */
        this.PetsLeaseID = [];
        /**宠物组权重 */
        this.PetsWeight = [];
        /**宠物品质 */
        this.PetsQuality = [];
    }
    return JsonRoguePetsLease;
}());
exports.JsonRoguePetsLease = JsonRoguePetsLease;
var RoguePetsLeaseManager = /** @class */ (function () {
    function RoguePetsLeaseManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RoguePetsLeaseManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RoguePetsLeaseManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RoguePetsLeaseManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RoguePetsLeaseManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RoguePetsLease', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRoguePetsLease成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRoguePetsLease();
                jsonData = json[i];
                _this.data.set(jsonData.Chapter, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RoguePetsLeaseManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RoguePetsLeaseManager.prototype.getJsonRoguePetsLease = function (id) {
        return this.data.get(id);
    };
    /**根据主线章节获取宠物奖池ID */
    RoguePetsLeaseManager.prototype.getPetsLeaseID = function (id) {
        return this.data.get(id).PetsLeaseID;
    };
    /**根据主线章节获取宠物组权重 */
    RoguePetsLeaseManager.prototype.getPetsWeight = function (id) {
        return this.data.get(id).PetsWeight;
    };
    /**根据主线章节获取宠物品质 */
    RoguePetsLeaseManager.prototype.getPetsQuality = function (id) {
        return this.data.get(id).PetsQuality;
    };
    /** 静态方法，获取最大的 主线章节*/
    RoguePetsLeaseManager.getMaxChapter = function () {
        return 10;
    };
    RoguePetsLeaseManager._instance = null;
    return RoguePetsLeaseManager;
}());
exports.RoguePetsLeaseManager = RoguePetsLeaseManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcRGF0YVxcUm9ndWVQZXRzTGVhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBR3hEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixZQUFZO1FBQ0wsZ0JBQVcsR0FBWSxFQUFFLENBQUU7UUFDbEMsV0FBVztRQUNKLGVBQVUsR0FBWSxFQUFFLENBQUU7UUFDakMsVUFBVTtRQUNILGdCQUFXLEdBQVksRUFBRSxDQUFFO0lBQ3RDLENBQUM7SUFBRCx5QkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksZ0RBQWtCO0FBVy9CO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQWdDLElBQUksQ0FBQztRQUN6QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUE0RHhDLHlCQUF5QjtJQUc3QixDQUFDO0lBN0RpQixpQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELG9DQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0Esd0NBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUMxRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQztnQkFDdEMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsQ0FBQzthQUM1QztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLGtEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixxREFBcUIsR0FBNUIsVUFBNkIsRUFBUztRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxvQkFBb0I7SUFDYiw4Q0FBYyxHQUFyQixVQUFzQixFQUFTO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxtQkFBbUI7SUFDWiw2Q0FBYSxHQUFwQixVQUFxQixFQUFTO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCw4Q0FBYyxHQUFyQixVQUFzQixFQUFTO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCxtQ0FBYSxHQUEzQjtRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQTdEYywrQkFBUyxHQUEwQixJQUFJLENBQUM7SUFrRTNELDRCQUFDO0NBbkVELEFBbUVDLElBQUE7QUFuRVksc0RBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uUm9ndWVQZXRzTGVhc2Uge1xyXG4gICAgLyoq5Li757q/56ug6IqCICovXHJcbiAgICBwdWJsaWMgQ2hhcHRlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWuoOeJqeWlluaxoElEICovXHJcbiAgICBwdWJsaWMgUGV0c0xlYXNlSUQ6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirlrqDniannu4TmnYPph40gKi9cclxuICAgIHB1YmxpYyBQZXRzV2VpZ2h0Om51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5a6g54mp5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgUGV0c1F1YWxpdHk6bnVtYmVyW10gPSBbXSA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2d1ZVBldHNMZWFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSb2d1ZVBldHNMZWFzZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uUm9ndWVQZXRzTGVhc2U+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlJvZ3VlUGV0c0xlYXNlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFJvZ3VlUGV0c0xlYXNlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdSb2d1ZVBldHNMZWFzZScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25Sb2d1ZVBldHNMZWFzZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Sb2d1ZVBldHNMZWFzZSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuQ2hhcHRlcixqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvblJvZ3VlUGV0c0xlYXNlKGlkOm51bWJlcik6SnNvblJvZ3VlUGV0c0xlYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuLvnur/nq6DoioLojrflj5blrqDnianlpZbmsaBJRCAqL1xyXG4gICAgcHVibGljIGdldFBldHNMZWFzZUlEKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUGV0c0xlYXNlSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuLvnur/nq6DoioLojrflj5blrqDniannu4TmnYPph40gKi9cclxuICAgIHB1YmxpYyBnZXRQZXRzV2VpZ2h0KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUGV0c1dlaWdodDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4u+e6v+eroOiKguiOt+WPluWuoOeJqeWTgei0qCAqL1xyXG4gICAgcHVibGljIGdldFBldHNRdWFsaXR5KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUGV0c1F1YWxpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDkuLvnur/nq6DoioIqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDaGFwdGVyKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=