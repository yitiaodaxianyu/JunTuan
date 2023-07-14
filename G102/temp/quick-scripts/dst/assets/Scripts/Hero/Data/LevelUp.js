
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/LevelUp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a0d5ejm6NFCWq4x4ExB18V3', 'LevelUp');
// Scripts/Hero/Data/LevelUp.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelUpManager = exports.JsonLevelUp = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonLevelUp = /** @class */ (function () {
    function JsonLevelUp() {
        /**等级 */
        this.Level = 0;
        /**金币消耗 */
        this.CostCoin = 0;
        /**钻石消耗 */
        this.CostGem = 0;
        /**关卡限制 */
        this.LevelLimit = 0;
    }
    return JsonLevelUp;
}());
exports.JsonLevelUp = JsonLevelUp;
var LevelUpManager = /** @class */ (function () {
    function LevelUpManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    LevelUpManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LevelUpManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    LevelUpManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    LevelUpManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('LevelUp', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonLevelUp成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonLevelUp();
                jsonData = json[i];
                _this.data.set(jsonData.Level, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    LevelUpManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    LevelUpManager.prototype.getJsonLevelUp = function (id) {
        return this.data.get(id);
    };
    /**根据等级获取金币消耗 */
    LevelUpManager.prototype.getCostCoin = function (id) {
        return this.data.get(id).CostCoin;
    };
    /**根据等级获取钻石消耗 */
    LevelUpManager.prototype.getCostGem = function (id) {
        return this.data.get(id).CostGem;
    };
    /**根据等级获取关卡限制 */
    LevelUpManager.prototype.getLevelLimit = function (id) {
        return this.data.get(id).LevelLimit;
    };
    /** 静态方法，获取最大的 等级*/
    LevelUpManager.getMaxLevel = function () {
        return 100;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**根据当前的等级获取所消耗的总金币 */
    LevelUpManager.prototype.getNowLevelAllCostCoin = function (level) {
        level -= 1;
        var sum1 = 0;
        var sum2 = 0;
        for (; level > 0; level--) {
            sum1 += this.data.get(level).CostCoin;
            sum2 += this.data.get(level).CostGem;
        }
        return [sum1, sum2];
    };
    LevelUpManager._instance = null;
    return LevelUpManager;
}());
exports.LevelUpManager = LevelUpManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcTGV2ZWxVcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFFBQVE7UUFDRCxVQUFLLEdBQVUsQ0FBQyxDQUFFO1FBQ3pCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO0lBQ2xDLENBQUM7SUFBRCxrQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksa0NBQVc7QUFXeEI7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBeUIsSUFBSSxDQUFDO1FBQ2xDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQXlFNUMsQ0FBQztJQXZFaUIsMEJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsNkJBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxpQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNuRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDL0IsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQy9CLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDMUM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCwyQ0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsdUNBQWMsR0FBckIsVUFBc0IsRUFBUztRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCxvQ0FBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCxtQ0FBVSxHQUFqQixVQUFrQixFQUFTO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCxzQ0FBYSxHQUFwQixVQUFxQixFQUFTO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxtQkFBbUI7SUFDTCwwQkFBVyxHQUF6QjtRQUNJLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUF5QjtJQUV6QixzQkFBc0I7SUFDdEIsK0NBQXNCLEdBQXRCLFVBQXVCLEtBQVk7UUFDL0IsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNYLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLE9BQUssS0FBSyxHQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsRUFBQztZQUNqQixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3RDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDeEM7UUFDRCxPQUFPLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUEzRWMsd0JBQVMsR0FBbUIsSUFBSSxDQUFDO0lBNEVwRCxxQkFBQztDQTdFRCxBQTZFQyxJQUFBO0FBN0VZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25MZXZlbFVwIHtcclxuICAgIC8qKuetiee6pyAqL1xyXG4gICAgcHVibGljIExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YeR5biB5raI6ICXICovXHJcbiAgICBwdWJsaWMgQ29zdENvaW46bnVtYmVyID0gMCA7XHJcbiAgICAvKirpkrvnn7PmtojogJcgKi9cclxuICAgIHB1YmxpYyBDb3N0R2VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5YWz5Y2h6ZmQ5Yi2ICovXHJcbiAgICBwdWJsaWMgTGV2ZWxMaW1pdDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIExldmVsVXBNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTGV2ZWxVcE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uTGV2ZWxVcD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TGV2ZWxVcE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBMZXZlbFVwTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdMZXZlbFVwJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkxldmVsVXDmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uTGV2ZWxVcCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuTGV2ZWwsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25MZXZlbFVwKGlkOm51bWJlcik6SnNvbkxldmVsVXAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruetiee6p+iOt+WPlumHkeW4gea2iOiAlyAqL1xyXG4gICAgcHVibGljIGdldENvc3RDb2luKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3RDb2luO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u562J57qn6I635Y+W6ZK755+z5raI6ICXICovXHJcbiAgICBwdWJsaWMgZ2V0Q29zdEdlbShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db3N0R2VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u562J57qn6I635Y+W5YWz5Y2h6ZmQ5Yi2ICovXHJcbiAgICBwdWJsaWMgZ2V0TGV2ZWxMaW1pdChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5MZXZlbExpbWl0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg562J57qnKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TGV2ZWwoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgLyoq5qC55o2u5b2T5YmN55qE562J57qn6I635Y+W5omA5raI6ICX55qE5oC76YeR5biBICovXHJcbiAgICBnZXROb3dMZXZlbEFsbENvc3RDb2luKGxldmVsOm51bWJlcik6bnVtYmVyW117XHJcbiAgICAgICAgbGV2ZWwgLT0gMTtcclxuICAgICAgICBsZXQgc3VtMSA9IDA7XHJcbiAgICAgICAgbGV0IHN1bTIgPSAwO1xyXG4gICAgICAgIGZvcig7bGV2ZWw+MDtsZXZlbC0tKXtcclxuICAgICAgICAgICAgc3VtMSArPSB0aGlzLmRhdGEuZ2V0KGxldmVsKS5Db3N0Q29pbjtcclxuICAgICAgICAgICAgc3VtMiArPSB0aGlzLmRhdGEuZ2V0KGxldmVsKS5Db3N0R2VtO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3N1bTEsc3VtMl07XHJcbiAgICB9XHJcbn1cclxuIl19