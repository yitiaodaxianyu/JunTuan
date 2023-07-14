
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/Jackpot.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd32a6OP/SVAIqRZBnksZieb', 'Jackpot');
// Scripts/JsonData/Jackpot.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JackpotManager = exports.JsonJackpot = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var LevelJsonData_1 = require("./LevelJsonData");
var JsonJackpot = /** @class */ (function () {
    function JsonJackpot() {
        /**奖池ID */
        this.JackpotID = 0;
        /**总权重数 */
        this.Weight_Sum = 0;
        /**掉落组列 */
        this.Drop_Array = [];
        /**掉落数量 */
        this.Drop_Num = [];
        /**各个权重 */
        this.Weight = [];
    }
    return JsonJackpot;
}());
exports.JsonJackpot = JsonJackpot;
var JackpotManager = /** @class */ (function () {
    function JackpotManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    JackpotManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new JackpotManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    JackpotManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    JackpotManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('Jackpot', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonJackpot成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonJackpot();
                jsonData = json[i];
                _this.data.set(jsonData.JackpotID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    JackpotManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    JackpotManager.prototype.getJsonJackpot = function (id) {
        return this.data.get(id);
    };
    /**根据奖池ID获取总权重数 */
    JackpotManager.prototype.getWeight_Sum = function (id) {
        return this.data.get(id).Weight_Sum;
    };
    /**根据奖池ID获取掉落组列 */
    JackpotManager.prototype.getDrop_Array = function (id) {
        return this.data.get(id).Drop_Array;
    };
    /**根据奖池ID获取掉落数量 */
    JackpotManager.prototype.getDrop_Num = function (id) {
        return this.data.get(id).Drop_Num;
    };
    /**根据奖池ID获取各个权重 */
    JackpotManager.prototype.getWeight = function (id) {
        return this.data.get(id).Weight;
    };
    /** 静态方法，获取最大的 奖池ID*/
    JackpotManager.getMaxJackpotID = function () {
        return 15020;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /** 根据奖池id 随机获取奖池的一个物品数据*/
    JackpotManager.prototype.getRewardDataById = function (id) {
        var rd = new LevelJsonData_1.RewardData();
        var jj = this.getJsonJackpot(id);
        //根据权重随机
        var totalWeight = jj.Weight_Sum;
        var arrLen = jj.Weight.length;
        //如果总权重为0，就自己算算
        if (totalWeight <= 0) {
            for (var w = 0; w < arrLen; w++) {
                var weightNum = jj.Weight[w];
                totalWeight += weightNum;
            }
        }
        var randWeight = Math.random() * totalWeight;
        var curWeight = 0;
        //判断权重在哪个奖品上
        for (var w = 0; w < arrLen; w++) {
            var weightNum = jj.Weight[w];
            curWeight += weightNum;
            if (randWeight < curWeight) {
                rd.reward_id = jj.Drop_Array[w];
                rd.reward_num = jj.Drop_Num[w];
                break;
            }
        }
        return rd;
    };
    JackpotManager._instance = null;
    return JackpotManager;
}());
exports.JackpotManager = JackpotManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEphY2twb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQXFEO0FBQ3JELGlEQUE2QztBQUU3QztJQUFBO1FBQ0ksVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILGVBQVUsR0FBWSxFQUFFLENBQUU7UUFDakMsVUFBVTtRQUNILGFBQVEsR0FBWSxFQUFFLENBQUU7UUFDL0IsVUFBVTtRQUNILFdBQU0sR0FBWSxFQUFFLENBQUU7SUFDakMsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSxrQ0FBVztBQWF4QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUF5QixJQUFJLENBQUM7UUFDbEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBbUc1QyxDQUFDO0lBakdpQiwwQkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCw2QkFBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLGlDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ25GLElBQUcsS0FBSyxFQUFD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QUFDLEdBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUMxQjtZQUNJLElBQUksU0FBUyxHQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUIsU0FBUyxJQUFFLFNBQVMsQ0FBQztZQUNyQixJQUFHLFVBQVUsR0FBQyxTQUFTLEVBQ3ZCO2dCQUNJLEVBQUUsQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLFVBQVUsR0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQXJHYyx3QkFBUyxHQUFtQixJQUFJLENBQUM7SUFzR3BELHFCQUFDO0NBdkdELEFBdUdDLElBQUE7QUF2R1ksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4vTGV2ZWxKc29uRGF0YVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25KYWNrcG90IHtcclxuICAgIC8qKuWlluaxoElEICovXHJcbiAgICBwdWJsaWMgSmFja3BvdElEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oC75p2D6YeN5pWwICovXHJcbiAgICBwdWJsaWMgV2VpZ2h0X1N1bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaOieiQvee7hOWIlyAqL1xyXG4gICAgcHVibGljIERyb3BfQXJyYXk6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirmjonokL3mlbDph48gKi9cclxuICAgIHB1YmxpYyBEcm9wX051bTpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuWQhOS4quadg+mHjSAqL1xyXG4gICAgcHVibGljIFdlaWdodDpudW1iZXJbXSA9IFtdIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEphY2twb3RNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogSmFja3BvdE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uSmFja3BvdD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6SmFja3BvdE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBKYWNrcG90TWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdKYWNrcG90JyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkphY2twb3TmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uSmFja3BvdCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuSmFja3BvdElELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uSmFja3BvdChpZDpudW1iZXIpOkpzb25KYWNrcG90IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZbmsaBJROiOt+WPluaAu+adg+mHjeaVsCAqL1xyXG4gICAgcHVibGljIGdldFdlaWdodF9TdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuV2VpZ2h0X1N1bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluaxoElE6I635Y+W5o6J6JC957uE5YiXICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcF9BcnJheShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkRyb3BfQXJyYXk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZbmsaBJROiOt+WPluaOieiQveaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldERyb3BfTnVtKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRHJvcF9OdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZbmsaBJROiOt+WPluWQhOS4quadg+mHjSAqL1xyXG4gICAgcHVibGljIGdldFdlaWdodChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLldlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWlluaxoElEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4SmFja3BvdElEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTUwMjA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgLyoqIOagueaNruWlluaxoGlkIOmaj+acuuiOt+WPluWlluaxoOeahOS4gOS4queJqeWTgeaVsOaNriovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkRGF0YUJ5SWQoaWQ6bnVtYmVyKTpSZXdhcmREYXRhXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgbGV0IGpqPXRoaXMuZ2V0SnNvbkphY2twb3QoaWQpO1xyXG4gICAgICAgIC8v5qC55o2u5p2D6YeN6ZqP5py6XHJcbiAgICAgICAgbGV0IHRvdGFsV2VpZ2h0PWpqLldlaWdodF9TdW07XHJcbiAgICAgICAgbGV0IGFyckxlbj1qai5XZWlnaHQubGVuZ3RoO1xyXG4gICAgICAgIC8v5aaC5p6c5oC75p2D6YeN5Li6MO+8jOWwseiHquW3seeul+eul1xyXG4gICAgICAgIGlmKHRvdGFsV2VpZ2h0PD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCB3PTA7IHc8YXJyTGVuOyB3KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCB3ZWlnaHROdW09amouV2VpZ2h0W3ddO1xyXG4gICAgICAgICAgICAgICAgdG90YWxXZWlnaHQrPXdlaWdodE51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmFuZFdlaWdodD1NYXRoLnJhbmRvbSgpKnRvdGFsV2VpZ2h0OyAgICAgICAgICAgICAgICBcclxuICAgICAgICBsZXQgY3VyV2VpZ2h0PTA7XHJcbiAgICAgICAgLy/liKTmlq3mnYPph43lnKjlk6rkuKrlpZblk4HkuIpcclxuICAgICAgICBmb3IobGV0IHc9MDsgdzxhcnJMZW47IHcrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB3ZWlnaHROdW09amouV2VpZ2h0W3ddXHJcbiAgICAgICAgICAgIGN1cldlaWdodCs9d2VpZ2h0TnVtO1xyXG4gICAgICAgICAgICBpZihyYW5kV2VpZ2h0PGN1cldlaWdodClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmQucmV3YXJkX2lkPWpqLkRyb3BfQXJyYXlbd107XHJcbiAgICAgICAgICAgICAgICByZC5yZXdhcmRfbnVtPWpqLkRyb3BfTnVtW3ddO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJkO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==