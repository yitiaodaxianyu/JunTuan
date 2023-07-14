
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/DiamondsRecharge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '79ffaJkq6pDpJJjWJ9dZh72', 'DiamondsRecharge');
// Scripts/Store/DiamondsRecharge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiamondsRechargeManager = exports.JsonDiamondsRecharge = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonDiamondsRecharge = /** @class */ (function () {
    function JsonDiamondsRecharge() {
        /**充值ID */
        this.RechargeID = 0;
        /**钻石数量 */
        this.DiamondsNum = 0;
        /**首充赠送钻石数量 */
        this.GetDiamondsNum = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonDiamondsRecharge;
}());
exports.JsonDiamondsRecharge = JsonDiamondsRecharge;
var DiamondsRechargeManager = /** @class */ (function () {
    function DiamondsRechargeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    DiamondsRechargeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DiamondsRechargeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DiamondsRechargeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DiamondsRechargeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DiamondsRecharge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDiamondsRecharge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDiamondsRecharge();
                jsonData = json[i];
                _this.data.set(jsonData.RechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DiamondsRechargeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DiamondsRechargeManager.prototype.getJsonDiamondsRecharge = function (id) {
        return this.data.get(id);
    };
    /**根据充值ID获取钻石数量 */
    DiamondsRechargeManager.prototype.getDiamondsNum = function (id) {
        return this.data.get(id).DiamondsNum;
    };
    /**根据充值ID获取首充赠送钻石数量 */
    DiamondsRechargeManager.prototype.getGetDiamondsNum = function (id) {
        return this.data.get(id).GetDiamondsNum;
    };
    /**根据充值ID获取谷歌计费ID */
    DiamondsRechargeManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 充值ID*/
    DiamondsRechargeManager.getMaxRechargeID = function () {
        return 6;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    DiamondsRechargeManager.prototype.getJsonData = function () {
        return this.data;
    };
    DiamondsRechargeManager._instance = null;
    return DiamondsRechargeManager;
}());
exports.DiamondsRechargeManager = DiamondsRechargeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXERpYW1vbmRzUmVjaGFyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsY0FBYztRQUNQLG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFlBQVk7UUFDTCxjQUFTLEdBQVUsRUFBRSxDQUFFO0lBQ2xDLENBQUM7SUFBRCwyQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksb0RBQW9CO0FBV2pDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQWtDLElBQUksQ0FBQztRQUMzQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUFpRTVDLENBQUM7SUEvRGlCLG1DQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksdUJBQXVCLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0Qsc0NBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSwwQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQzVGLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUN4QyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO2dCQUN4QyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsb0RBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHlEQUF1QixHQUE5QixVQUErQixFQUFTO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELGtCQUFrQjtJQUNYLGdEQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLG1EQUFpQixHQUF4QixVQUF5QixFQUFTO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDO0lBQzVDLENBQUM7SUFDRCxvQkFBb0I7SUFDYiw4Q0FBWSxHQUFuQixVQUFvQixFQUFTO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCx3Q0FBZ0IsR0FBOUI7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCx5QkFBeUI7SUFFekIsNkNBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBbkVjLGlDQUFTLEdBQTRCLElBQUksQ0FBQztJQW9FN0QsOEJBQUM7Q0FyRUQsQUFxRUMsSUFBQTtBQXJFWSwwREFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkRpYW1vbmRzUmVjaGFyZ2Uge1xyXG4gICAgLyoq5YWF5YC8SUQgKi9cclxuICAgIHB1YmxpYyBSZWNoYXJnZUlEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6ZK755+z5pWw6YePICovXHJcbiAgICBwdWJsaWMgRGlhbW9uZHNOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirpppblhYXotaDpgIHpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBHZXREaWFtb25kc051bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiwt+atjOiuoei0uUlEICovXHJcbiAgICBwdWJsaWMgUHJvZHVjdElkOnN0cmluZyA9ICcnIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERpYW1vbmRzUmVjaGFyZ2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRGlhbW9uZHNSZWNoYXJnZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uRGlhbW9uZHNSZWNoYXJnZT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6RGlhbW9uZHNSZWNoYXJnZU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBEaWFtb25kc1JlY2hhcmdlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdEaWFtb25kc1JlY2hhcmdlJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkRpYW1vbmRzUmVjaGFyZ2XmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uRGlhbW9uZHNSZWNoYXJnZSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuUmVjaGFyZ2VJRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkRpYW1vbmRzUmVjaGFyZ2UoaWQ6bnVtYmVyKTpKc29uRGlhbW9uZHNSZWNoYXJnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWF5YC8SUTojrflj5bpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXREaWFtb25kc051bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5EaWFtb25kc051bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFheWAvElE6I635Y+W6aaW5YWF6LWg6YCB6ZK755+z5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0RGlhbW9uZHNOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0RGlhbW9uZHNOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhYXlgLxJROiOt+WPluiwt+atjOiuoei0uUlEICovXHJcbiAgICBwdWJsaWMgZ2V0UHJvZHVjdElkKGlkOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByb2R1Y3RJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWFheWAvElEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4UmVjaGFyZ2VJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDY7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0SnNvbkRhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==