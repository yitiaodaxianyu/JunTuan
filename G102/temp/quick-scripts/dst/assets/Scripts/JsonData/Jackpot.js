
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
        console.log("getRewardData:" + id);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEphY2twb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0RBQXFEO0FBQ3JELGlEQUE2QztBQUU3QztJQUFBO1FBQ0ksVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILGVBQVUsR0FBWSxFQUFFLENBQUU7UUFDakMsVUFBVTtRQUNILGFBQVEsR0FBWSxFQUFFLENBQUU7UUFDL0IsVUFBVTtRQUNILFdBQU0sR0FBWSxFQUFFLENBQUU7SUFDakMsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSxrQ0FBVztBQWF4QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUF5QixJQUFJLENBQUM7UUFDbEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBcUc1QyxDQUFDO0lBbkdpQiwwQkFBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCw2QkFBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLGlDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ25GLElBQUcsS0FBSyxFQUFD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LENBQUM7UUFDaEIsWUFBWTtRQUNaLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQzFCO1lBQ0ksSUFBSSxTQUFTLEdBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMxQixTQUFTLElBQUUsU0FBUyxDQUFDO1lBQ3JCLElBQUcsVUFBVSxHQUFDLFNBQVMsRUFDdkI7Z0JBQ0ksRUFBRSxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixFQUFFLENBQUMsVUFBVSxHQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU07YUFDVDtTQUNKO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBdkdjLHdCQUFTLEdBQW1CLElBQUksQ0FBQztJQXdHcEQscUJBQUM7Q0F6R0QsQUF5R0MsSUFBQTtBQXpHWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi9MZXZlbEpzb25EYXRhXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkphY2twb3Qge1xyXG4gICAgLyoq5aWW5rGgSUQgKi9cclxuICAgIHB1YmxpYyBKYWNrcG90SUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgLvmnYPph43mlbAgKi9cclxuICAgIHB1YmxpYyBXZWlnaHRfU3VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5o6J6JC957uE5YiXICovXHJcbiAgICBwdWJsaWMgRHJvcF9BcnJheTpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuaOieiQveaVsOmHjyAqL1xyXG4gICAgcHVibGljIERyb3BfTnVtOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5ZCE5Liq5p2D6YeNICovXHJcbiAgICBwdWJsaWMgV2VpZ2h0Om51bWJlcltdID0gW10gO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSmFja3BvdE1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBKYWNrcG90TWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25KYWNrcG90Pj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpKYWNrcG90TWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEphY2twb3RNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0phY2twb3QnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uSmFja3BvdOaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25KYWNrcG90KCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5KYWNrcG90SUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25KYWNrcG90KGlkOm51bWJlcik6SnNvbkphY2twb3Qge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluaxoElE6I635Y+W5oC75p2D6YeN5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0V2VpZ2h0X1N1bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5XZWlnaHRfU3VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5rGgSUTojrflj5bmjonokL3nu4TliJcgKi9cclxuICAgIHB1YmxpYyBnZXREcm9wX0FycmF5KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRHJvcF9BcnJheTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluaxoElE6I635Y+W5o6J6JC95pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcF9OdW0oaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ecm9wX051bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluaxoElE6I635Y+W5ZCE5Liq5p2D6YeNICovXHJcbiAgICBwdWJsaWMgZ2V0V2VpZ2h0KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuV2VpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5aWW5rGgSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhKYWNrcG90SUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxNTAyMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICAvKiog5qC55o2u5aWW5rGgaWQg6ZqP5py66I635Y+W5aWW5rGg55qE5LiA5Liq54mp5ZOB5pWw5o2uKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmREYXRhQnlJZChpZDpudW1iZXIpOlJld2FyZERhdGFcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldFJld2FyZERhdGE6XCIraWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIGxldCBqaj10aGlzLmdldEpzb25KYWNrcG90KGlkKTtcclxuICAgICAgICAvL+agueaNruadg+mHjemaj+aculxyXG4gICAgICAgIGxldCB0b3RhbFdlaWdodD1qai5XZWlnaHRfU3VtO1xyXG4gICAgICAgIGxldCBhcnJMZW49amouV2VpZ2h0Lmxlbmd0aDtcclxuICAgICAgICAvL+WmguaenOaAu+adg+mHjeS4ujDvvIzlsLHoh6rlt7HnrpfnrpdcclxuICAgICAgICBpZih0b3RhbFdlaWdodDw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgdz0wOyB3PGFyckxlbjsgdysrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgd2VpZ2h0TnVtPWpqLldlaWdodFt3XTtcclxuICAgICAgICAgICAgICAgIHRvdGFsV2VpZ2h0Kz13ZWlnaHROdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJhbmRXZWlnaHQ9TWF0aC5yYW5kb20oKSp0b3RhbFdlaWdodDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgbGV0IGN1cldlaWdodD0wO1xyXG4gICAgICAgIC8v5Yik5pat5p2D6YeN5Zyo5ZOq5Liq5aWW5ZOB5LiKXHJcbiAgICAgICAgZm9yKGxldCB3PTA7IHc8YXJyTGVuOyB3KyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgd2VpZ2h0TnVtPWpqLldlaWdodFt3XVxyXG4gICAgICAgICAgICBjdXJXZWlnaHQrPXdlaWdodE51bTtcclxuICAgICAgICAgICAgaWYocmFuZFdlaWdodDxjdXJXZWlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJkLnJld2FyZF9pZD1qai5Ecm9wX0FycmF5W3ddO1xyXG4gICAgICAgICAgICAgICAgcmQucmV3YXJkX251bT1qai5Ecm9wX051bVt3XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZDtcclxuICAgIH1cclxufVxyXG4iXX0=