
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/TakeEgg/EggCumulative.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '87f16CjF0tAG4m3sX3MytRj', 'EggCumulative');
// Scripts/TakeEgg/EggCumulative.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EggCumulativeManager = exports.JsonEggCumulative = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonEggCumulative = /** @class */ (function () {
    function JsonEggCumulative() {
        /**累计次数奖励ID */
        this.CumulativeEggsRewardID = 0;
        /**开蛋池类型 */
        this.EggsType = 0;
        /**累计开蛋次数 */
        this.CumulativeEggsDrawingTimes = 0;
        /**道具ID */
        this.ItemID = 0;
        /**数量 */
        this.RewardNum = 0;
    }
    return JsonEggCumulative;
}());
exports.JsonEggCumulative = JsonEggCumulative;
var EggCumulativeManager = /** @class */ (function () {
    function EggCumulativeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EggCumulativeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EggCumulativeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EggCumulativeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EggCumulativeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EggCumulative', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEggCumulative成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEggCumulative();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeEggsRewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EggCumulativeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EggCumulativeManager.prototype.getJsonEggCumulative = function (id) {
        return this.data.get(id);
    };
    /**根据累计次数奖励ID获取开蛋池类型 */
    EggCumulativeManager.prototype.getEggsType = function (id) {
        return this.data.get(id).EggsType;
    };
    /**根据累计次数奖励ID获取累计开蛋次数 */
    EggCumulativeManager.prototype.getCumulativeEggsDrawingTimes = function (id) {
        return this.data.get(id).CumulativeEggsDrawingTimes;
    };
    /**根据累计次数奖励ID获取道具ID */
    EggCumulativeManager.prototype.getItemID = function (id) {
        return this.data.get(id).ItemID;
    };
    /**根据累计次数奖励ID获取数量 */
    EggCumulativeManager.prototype.getRewardNum = function (id) {
        return this.data.get(id).RewardNum;
    };
    /** 静态方法，获取最大的 累计次数奖励ID*/
    EggCumulativeManager.getMaxCumulativeEggsRewardID = function () {
        return 200020;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 根据许愿池类型获取累计奖励列表
     * @param type
     * @returns
     */
    EggCumulativeManager.prototype.getTakeEggRewardList = function (type) {
        var arr = new Array();
        this.data.forEach(function (v, k) {
            if (v.EggsType == type) {
                arr.push(v);
            }
        });
        return arr;
    };
    EggCumulativeManager._instance = null;
    return EggCumulativeManager;
}());
exports.EggCumulativeManager = EggCumulativeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFrZUVnZ1xcRWdnQ3VtdWxhdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFHckQ7SUFBQTtRQUNJLGNBQWM7UUFDUCwyQkFBc0IsR0FBVSxDQUFDLENBQUU7UUFDMUMsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsWUFBWTtRQUNMLCtCQUEwQixHQUFVLENBQUMsQ0FBRTtRQUM5QyxVQUFVO1FBQ0gsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixRQUFRO1FBQ0QsY0FBUyxHQUFVLENBQUMsQ0FBRTtJQUNqQyxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLDhDQUFpQjtBQWE5QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUErQixJQUFJLENBQUM7UUFDeEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBZ0Y1QyxDQUFDO0lBOUVpQixnQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELG1DQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsdUNBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDekYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3JDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUMzRDtZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLGlEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixtREFBb0IsR0FBM0IsVUFBNEIsRUFBUztRQUNqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCx1QkFBdUI7SUFDaEIsMENBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsd0JBQXdCO0lBQ2pCLDREQUE2QixHQUFwQyxVQUFxQyxFQUFTO1FBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsMEJBQTBCLENBQUM7SUFDeEQsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHdDQUFTLEdBQWhCLFVBQWlCLEVBQVM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDJDQUFZLEdBQW5CLFVBQW9CLEVBQVM7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELHlCQUF5QjtJQUNYLGlEQUE0QixHQUExQztRQUNJLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCx5QkFBeUI7SUFFekI7Ozs7T0FJRztJQUNGLG1EQUFvQixHQUFwQixVQUFxQixJQUFXO1FBQzdCLElBQUksR0FBRyxHQUFDLElBQUksS0FBSyxFQUFxQixDQUFBO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbEIsSUFBRyxDQUFDLENBQUMsUUFBUSxJQUFFLElBQUksRUFBQztnQkFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFsRmMsOEJBQVMsR0FBeUIsSUFBSSxDQUFDO0lBbUYxRCwyQkFBQztDQXBGRCxBQW9GQyxJQUFBO0FBcEZZLG9EQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkVnZ0N1bXVsYXRpdmUge1xyXG4gICAgLyoq57Sv6K6h5qyh5pWw5aWW5YqxSUQgKi9cclxuICAgIHB1YmxpYyBDdW11bGF0aXZlRWdnc1Jld2FyZElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5byA6JuL5rGg57G75Z6LICovXHJcbiAgICBwdWJsaWMgRWdnc1R5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirntK/orqHlvIDom4vmrKHmlbAgKi9cclxuICAgIHB1YmxpYyBDdW11bGF0aXZlRWdnc0RyYXdpbmdUaW1lczpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgSXRlbUlEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pWw6YePICovXHJcbiAgICBwdWJsaWMgUmV3YXJkTnVtOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRWdnQ3VtdWxhdGl2ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBFZ2dDdW11bGF0aXZlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25FZ2dDdW11bGF0aXZlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFZ2dDdW11bGF0aXZlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEVnZ0N1bXVsYXRpdmVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0VnZ0N1bXVsYXRpdmUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uRWdnQ3VtdWxhdGl2ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25FZ2dDdW11bGF0aXZlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5DdW11bGF0aXZlRWdnc1Jld2FyZElELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uRWdnQ3VtdWxhdGl2ZShpZDpudW1iZXIpOkpzb25FZ2dDdW11bGF0aXZlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHmrKHmlbDlpZblirFJROiOt+WPluW8gOibi+axoOexu+WeiyAqL1xyXG4gICAgcHVibGljIGdldEVnZ3NUeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkVnZ3NUeXBlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5qyh5pWw5aWW5YqxSUTojrflj5bntK/orqHlvIDom4vmrKHmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRDdW11bGF0aXZlRWdnc0RyYXdpbmdUaW1lcyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DdW11bGF0aXZlRWdnc0RyYXdpbmdUaW1lcztcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeasoeaVsOWlluWKsUlE6I635Y+W6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbUlEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5qyh5pWw5aWW5YqxSUTojrflj5bmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg57Sv6K6h5qyh5pWw5aWW5YqxSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDdW11bGF0aXZlRWdnc1Jld2FyZElEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMjAwMDIwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u6K645oS/5rGg57G75Z6L6I635Y+W57Sv6K6h5aWW5Yqx5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0gdHlwZSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICAgZ2V0VGFrZUVnZ1Jld2FyZExpc3QodHlwZTpudW1iZXIpOkpzb25FZ2dDdW11bGF0aXZlW117XHJcbiAgICAgICAgbGV0IGFycj1uZXcgQXJyYXk8SnNvbkVnZ0N1bXVsYXRpdmU+KClcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LkVnZ3NUeXBlPT10eXBlKXtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==