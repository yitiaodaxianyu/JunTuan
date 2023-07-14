
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wish/CumulativeCard.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a9ccdSlB4BMOL/F/sWe4eQS', 'CumulativeCard');
// Scripts/Wish/CumulativeCard.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CumulativeCardManager = exports.JsonCumulativeCard = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCumulativeCard = /** @class */ (function () {
    function JsonCumulativeCard() {
        /**累计次数奖励ID */
        this.CumulativeRewardID = 0;
        /**许愿池类型 */
        this.WishType = 0;
        /**累计抽卡次数 */
        this.CumulativeCardDrawingTimes = 0;
        /**道具ID */
        this.ItemID = 0;
        /**数量 */
        this.RewardNum = 0;
    }
    return JsonCumulativeCard;
}());
exports.JsonCumulativeCard = JsonCumulativeCard;
var CumulativeCardManager = /** @class */ (function () {
    function CumulativeCardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CumulativeCardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CumulativeCardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CumulativeCardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CumulativeCardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CumulativeCard', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeCard成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCumulativeCard();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeRewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CumulativeCardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CumulativeCardManager.prototype.getJsonCumulativeCard = function (id) {
        return this.data.get(id);
    };
    /**根据累计次数奖励ID获取许愿池类型 */
    CumulativeCardManager.prototype.getWishType = function (id) {
        return this.data.get(id).WishType;
    };
    /**根据累计次数奖励ID获取累计抽卡次数 */
    CumulativeCardManager.prototype.getCumulativeCardDrawingTimes = function (id) {
        return this.data.get(id).CumulativeCardDrawingTimes;
    };
    /**根据累计次数奖励ID获取道具ID */
    CumulativeCardManager.prototype.getItemID = function (id) {
        return this.data.get(id).ItemID;
    };
    /**根据累计次数奖励ID获取数量 */
    CumulativeCardManager.prototype.getRewardNum = function (id) {
        return this.data.get(id).RewardNum;
    };
    /** 静态方法，获取最大的 累计次数奖励ID*/
    CumulativeCardManager.getMaxCumulativeRewardID = function () {
        return 2050;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 根据许愿池类型获取累计奖励列表
     * @param type
     * @returns
     */
    CumulativeCardManager.prototype.getWishingRewardList = function (type) {
        var arr = new Array();
        this.data.forEach(function (v, k) {
            if (v.WishType == type) {
                arr.push(v);
            }
        });
        return arr;
    };
    CumulativeCardManager._instance = null;
    return CumulativeCardManager;
}());
exports.CumulativeCardManager = CumulativeCardManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2lzaFxcQ3VtdWxhdGl2ZUNhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBR3JEO0lBQUE7UUFDSSxjQUFjO1FBQ1AsdUJBQWtCLEdBQVUsQ0FBQyxDQUFFO1FBQ3RDLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFlBQVk7UUFDTCwrQkFBMEIsR0FBVSxDQUFDLENBQUU7UUFDOUMsVUFBVTtRQUNILFdBQU0sR0FBVSxDQUFDLENBQUU7UUFDMUIsUUFBUTtRQUNELGNBQVMsR0FBVSxDQUFDLENBQUU7SUFDakMsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSxnREFBa0I7QUFhL0I7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBZ0MsSUFBSSxDQUFDO1FBQ3pDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQWdGNUMsQ0FBQztJQTlFaUIsaUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxvQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLHdDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDMUYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3RDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUN2RDtZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLGtEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixxREFBcUIsR0FBNUIsVUFBNkIsRUFBUztRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCx1QkFBdUI7SUFDaEIsMkNBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsd0JBQXdCO0lBQ2pCLDZEQUE2QixHQUFwQyxVQUFxQyxFQUFTO1FBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsMEJBQTBCLENBQUM7SUFDeEQsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHlDQUFTLEdBQWhCLFVBQWlCLEVBQVM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDRDQUFZLEdBQW5CLFVBQW9CLEVBQVM7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELHlCQUF5QjtJQUNYLDhDQUF3QixHQUF0QztRQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx5QkFBeUI7SUFFekI7Ozs7T0FJRztJQUNILG9EQUFvQixHQUFwQixVQUFxQixJQUFXO1FBQzVCLElBQUksR0FBRyxHQUFDLElBQUksS0FBSyxFQUFzQixDQUFBO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbEIsSUFBRyxDQUFDLENBQUMsUUFBUSxJQUFFLElBQUksRUFBQztnQkFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFsRmMsK0JBQVMsR0FBMEIsSUFBSSxDQUFDO0lBbUYzRCw0QkFBQztDQXBGRCxBQW9GQyxJQUFBO0FBcEZZLHNEQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkN1bXVsYXRpdmVDYXJkIHtcclxuICAgIC8qKue0r+iuoeasoeaVsOWlluWKsUlEICovXHJcbiAgICBwdWJsaWMgQ3VtdWxhdGl2ZVJld2FyZElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6K645oS/5rGg57G75Z6LICovXHJcbiAgICBwdWJsaWMgV2lzaFR5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirntK/orqHmir3ljaHmrKHmlbAgKi9cclxuICAgIHB1YmxpYyBDdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lczpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgSXRlbUlEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pWw6YePICovXHJcbiAgICBwdWJsaWMgUmV3YXJkTnVtOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQ3VtdWxhdGl2ZUNhcmRNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkN1bXVsYXRpdmVDYXJkPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpDdW11bGF0aXZlQ2FyZE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBDdW11bGF0aXZlQ2FyZE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignQ3VtdWxhdGl2ZUNhcmQnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQ3VtdWxhdGl2ZUNhcmTmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uQ3VtdWxhdGl2ZUNhcmQoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkN1bXVsYXRpdmVSZXdhcmRJRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkN1bXVsYXRpdmVDYXJkKGlkOm51bWJlcik6SnNvbkN1bXVsYXRpdmVDYXJkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHmrKHmlbDlpZblirFJROiOt+WPluiuuOaEv+axoOexu+WeiyAqL1xyXG4gICAgcHVibGljIGdldFdpc2hUeXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLldpc2hUeXBlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5qyh5pWw5aWW5YqxSUTojrflj5bntK/orqHmir3ljaHmrKHmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRDdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DdW11bGF0aXZlQ2FyZERyYXdpbmdUaW1lcztcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeasoeaVsOWlluWKsUlE6I635Y+W6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbUlEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5qyh5pWw5aWW5YqxSUTojrflj5bmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg57Sv6K6h5qyh5pWw5aWW5YqxSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDdW11bGF0aXZlUmV3YXJkSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAyMDUwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u6K645oS/5rGg57G75Z6L6I635Y+W57Sv6K6h5aWW5Yqx5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0gdHlwZSBcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBnZXRXaXNoaW5nUmV3YXJkTGlzdCh0eXBlOm51bWJlcik6SnNvbkN1bXVsYXRpdmVDYXJkW117XHJcbiAgICAgICAgbGV0IGFycj1uZXcgQXJyYXk8SnNvbkN1bXVsYXRpdmVDYXJkPigpXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5XaXNoVHlwZT09dHlwZSl7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxufVxyXG4iXX0=