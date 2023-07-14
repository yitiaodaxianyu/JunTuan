
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AccumulatedRecharge/CumulativeRecharges.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0af994C6VdP0bEWHrQB56Mi', 'CumulativeRecharges');
// Scripts/AccumulatedRecharge/CumulativeRecharges.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CumulativeRechargesManager = exports.JsonCumulativeRecharges = void 0;
var HttpManager_1 = require(".././NetWork/HttpManager");
var LoadManager_1 = require("../Loading/LoadManager");
var EventManager_1 = require("../Tools/EventManager");
var UserData_1 = require("../UserData");
var UserInfo_1 = require("../UserInfo/UserInfo");
var JsonCumulativeRecharges = /** @class */ (function () {
    function JsonCumulativeRecharges() {
        /**累计充值ID */
        this.CumulativeRechargeID = 0;
        /**累计充值钻石 */
        this.DiamondRechargePrice = 0;
        /**道具1ID */
        this.Item1_ID = 0;
        /**道具1数量 */
        this.Item1_Num = 0;
        /**道具2ID */
        this.Item2_ID = 0;
        /**道具2数量 */
        this.Item2_Num = 0;
        /**道具3ID */
        this.Item3_ID = 0;
        /**道具3数量 */
        this.Item3_Num = 0;
    }
    return JsonCumulativeRecharges;
}());
exports.JsonCumulativeRecharges = JsonCumulativeRecharges;
var CumulativeRechargesManager = /** @class */ (function () {
    function CumulativeRechargesManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
        // 数据
        this.rewardMap = new Map(); // k id标识，v 对应状态标记 0,1,2
    }
    CumulativeRechargesManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CumulativeRechargesManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CumulativeRechargesManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CumulativeRechargesManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CumulativeRecharges', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeRecharges成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCumulativeRecharges();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeRechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CumulativeRechargesManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CumulativeRechargesManager.prototype.getJsonCumulativeRecharges = function (id) {
        return this.data.get(id);
    };
    /**根据累计充值ID获取累计充值钻石 */
    CumulativeRechargesManager.prototype.getDiamondRechargePrice = function (id) {
        return this.data.get(id).DiamondRechargePrice;
    };
    /**根据累计充值ID获取道具1ID */
    CumulativeRechargesManager.prototype.getItem1_ID = function (id) {
        return this.data.get(id).Item1_ID;
    };
    /**根据累计充值ID获取道具1数量 */
    CumulativeRechargesManager.prototype.getItem1_Num = function (id) {
        return this.data.get(id).Item1_Num;
    };
    /**根据累计充值ID获取道具2ID */
    CumulativeRechargesManager.prototype.getItem2_ID = function (id) {
        return this.data.get(id).Item2_ID;
    };
    /**根据累计充值ID获取道具2数量 */
    CumulativeRechargesManager.prototype.getItem2_Num = function (id) {
        return this.data.get(id).Item2_Num;
    };
    /**根据累计充值ID获取道具3ID */
    CumulativeRechargesManager.prototype.getItem3_ID = function (id) {
        return this.data.get(id).Item3_ID;
    };
    /**根据累计充值ID获取道具3数量 */
    CumulativeRechargesManager.prototype.getItem3_Num = function (id) {
        return this.data.get(id).Item3_Num;
    };
    /** 静态方法，获取最大的 累计充值ID*/
    CumulativeRechargesManager.getMaxCumulativeRechargeID = function () {
        return 80001;
    };
    CumulativeRechargesManager.prototype.refreshData = function () {
        var _this = this;
        HttpManager_1.HttpManager.post(HttpManager_1.AccessName.queryGameTask, this.getCumulativeRechargeJsonString()).then(function (data) {
            if (data) {
                _this.rewardMap = new Map();
                if (data.length == 0) {
                    _this.data.forEach(function (v, k) {
                        if (UserInfo_1.UserInfo.getInstance().payGem >= v.DiamondRechargePrice) {
                            _this.rewardMap.set(v.CumulativeRechargeID, 1);
                        }
                        else {
                            _this.rewardMap.set(v.CumulativeRechargeID, 0);
                        }
                    });
                }
                else {
                    _this.data.forEach(function (v, k) {
                        if (UserInfo_1.UserInfo.getInstance().payGem >= v.DiamondRechargePrice) {
                            _this.rewardMap.set(v.CumulativeRechargeID, 1);
                        }
                        else {
                            _this.rewardMap.set(v.CumulativeRechargeID, 0);
                        }
                        // if(this.rewardMap.has(v.CumulativeRechargeID) == false){
                        // }
                    });
                    for (var i = 0; i < data.length; i++) {
                        _this.rewardMap.set(Number(data[i].playLevel), 2);
                    }
                }
                EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_LeiChong);
            }
        });
    };
    CumulativeRechargesManager.prototype.modifyData = function (message) {
        this.rewardMap.set(message.CumulativeRechargeID, 2);
    };
    CumulativeRechargesManager.prototype.getCumulativeRechargeJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            createTime: '',
            id: '',
            playLevel: '',
            rewardType: 6,
            uid: uid,
        });
    };
    CumulativeRechargesManager._instance = null;
    return CumulativeRechargesManager;
}());
exports.CumulativeRechargesManager = CumulativeRechargesManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWNjdW11bGF0ZWRSZWNoYXJnZVxcQ3VtdWxhdGl2ZVJlY2hhcmdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUU7QUFDbkUsc0RBQXFEO0FBQ3JELHNEQUFtRjtBQUNuRix3Q0FBbUM7QUFDbkMsaURBQWdEO0FBRWhEO0lBQUE7UUFDSSxZQUFZO1FBQ0wseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLFlBQVk7UUFDTCx5QkFBb0IsR0FBVSxDQUFDLENBQUU7UUFDeEMsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsV0FBVztRQUNKLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsV0FBVztRQUNKLGNBQVMsR0FBVSxDQUFDLENBQUU7SUFDakMsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsSUFBQTtBQWpCWSwwREFBdUI7QUFtQnBDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQXFDLElBQUksQ0FBQztRQUM5QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUE0RXhDLHlCQUF5QjtRQUN6QixLQUFLO1FBQ0wsY0FBUyxHQUFzQixJQUFJLEdBQUcsRUFBaUIsQ0FBQyxDQUFBLHdCQUF3QjtJQWdEcEYsQ0FBQztJQTVIaUIsc0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7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SUFBSTtvQkFDUixDQUFDLENBQUMsQ0FBQztvQkFDSCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQzt3QkFDNUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztxQkFDbkQ7aUJBQ0o7Z0JBQ0QsMkJBQVksQ0FBQyxZQUFZLENBQUMsNkJBQWMsQ0FBQyxTQUFTLEVBQUMsMkJBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQ3RGO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsK0NBQVUsR0FBVixVQUFXLE9BQStCO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU8sb0VBQStCLEdBQXZDO1FBQ0ksSUFBSSxHQUFHLEdBQUMsa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsVUFBVSxFQUFDLEVBQUU7WUFDYixFQUFFLEVBQUMsRUFBRTtZQUNMLFNBQVMsRUFBQyxFQUFFO1lBQ1osVUFBVSxFQUFDLENBQUM7WUFDWixHQUFHLEVBQUMsR0FBRztTQUNWLENBQUMsQ0FBQztJQUNQLENBQUM7SUEvSGMsb0NBQVMsR0FBK0IsSUFBSSxDQUFDO0lBaUloRSxpQ0FBQztDQWxJRCxBQWtJQyxJQUFBO0FBbElZLGdFQUEwQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25DdW11bGF0aXZlUmVjaGFyZ2VzIHtcclxuICAgIC8qKue0r+iuoeWFheWAvElEICovXHJcbiAgICBwdWJsaWMgQ3VtdWxhdGl2ZVJlY2hhcmdlSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirntK/orqHlhYXlgLzpkrvnn7MgKi9cclxuICAgIHB1YmxpYyBEaWFtb25kUmVjaGFyZ2VQcmljZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzFJRCAqL1xyXG4gICAgcHVibGljIEl0ZW0xX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MeaVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW0xX051bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzJJRCAqL1xyXG4gICAgcHVibGljIEl0ZW0yX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MuaVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW0yX051bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzNJRCAqL1xyXG4gICAgcHVibGljIEl0ZW0zX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3M+aVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW0zX051bTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uQ3VtdWxhdGl2ZVJlY2hhcmdlcz49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Q3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdDdW11bGF0aXZlUmVjaGFyZ2VzJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkN1bXVsYXRpdmVSZWNoYXJnZXPmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uQ3VtdWxhdGl2ZVJlY2hhcmdlcygpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuQ3VtdWxhdGl2ZVJlY2hhcmdlSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25DdW11bGF0aXZlUmVjaGFyZ2VzKGlkOm51bWJlcik6SnNvbkN1bXVsYXRpdmVSZWNoYXJnZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWFheWAvElE6I635Y+W57Sv6K6h5YWF5YC86ZK755+zICovXHJcbiAgICBwdWJsaWMgZ2V0RGlhbW9uZFJlY2hhcmdlUHJpY2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGlhbW9uZFJlY2hhcmdlUHJpY2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHlhYXlgLxJROiOt+WPlumBk+WFtzFJRCAqL1xyXG4gICAgcHVibGljIGdldEl0ZW0xX0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW0xX0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5YWF5YC8SUTojrflj5bpgZPlhbcx5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbTFfTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW0xX051bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWFheWAvElE6I635Y+W6YGT5YW3MklEICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbTJfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbTJfSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHlhYXlgLxJROiOt+WPlumBk+WFtzLmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtMl9OdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbTJfTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5YWF5YC8SUTojrflj5bpgZPlhbczSUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtM19JRChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtM19JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWFheWAvElE6I635Y+W6YGT5YW3M+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldEl0ZW0zX051bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtM19OdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDntK/orqHlhYXlgLxJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEN1bXVsYXRpdmVSZWNoYXJnZUlEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gODAwMDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcbiAgICAvLyDmlbDmja5cclxuICAgIHJld2FyZE1hcDpNYXA8bnVtYmVyLG51bWJlcj4gPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7Ly8gayBpZOagh+ivhu+8jHYg5a+55bqU54q25oCB5qCH6K6wIDAsMSwyXHJcbiAgICBcclxuICAgIHJlZnJlc2hEYXRhKCl7XHJcbiAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnF1ZXJ5R2FtZVRhc2ssdGhpcy5nZXRDdW11bGF0aXZlUmVjaGFyZ2VKc29uU3RyaW5nKCkpLnRoZW4oKGRhdGE6YW55KT0+e1xyXG4gICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkTWFwID0gbmV3IE1hcDxudW1iZXIsbnVtYmVyPigpO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5wYXlHZW0gPj0gdi5EaWFtb25kUmVjaGFyZ2VQcmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZE1hcC5zZXQodi5DdW11bGF0aXZlUmVjaGFyZ2VJRCwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZE1hcC5zZXQodi5DdW11bGF0aXZlUmVjaGFyZ2VJRCwwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoVXNlckluZm8uZ2V0SW5zdGFuY2UoKS5wYXlHZW0gPj0gdi5EaWFtb25kUmVjaGFyZ2VQcmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZE1hcC5zZXQodi5DdW11bGF0aXZlUmVjaGFyZ2VJRCwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJld2FyZE1hcC5zZXQodi5DdW11bGF0aXZlUmVjaGFyZ2VJRCwwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZih0aGlzLnJld2FyZE1hcC5oYXModi5DdW11bGF0aXZlUmVjaGFyZ2VJRCkgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkTWFwLnNldChOdW1iZXIoZGF0YVtpXS5wbGF5TGV2ZWwpLDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9MZWlDaG9uZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RpZnlEYXRhKG1lc3NhZ2U6SnNvbkN1bXVsYXRpdmVSZWNoYXJnZXMpe1xyXG4gICAgICAgIHRoaXMucmV3YXJkTWFwLnNldChtZXNzYWdlLkN1bXVsYXRpdmVSZWNoYXJnZUlELDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q3VtdWxhdGl2ZVJlY2hhcmdlSnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgY3JlYXRlVGltZTonJyxcclxuICAgICAgICAgICAgaWQ6JycsXHJcbiAgICAgICAgICAgIHBsYXlMZXZlbDonJyxcclxuICAgICAgICAgICAgcmV3YXJkVHlwZTo2LFxyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=