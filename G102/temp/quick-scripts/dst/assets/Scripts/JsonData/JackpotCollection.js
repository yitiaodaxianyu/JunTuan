
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/JackpotCollection.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '07e44ZwfrJBIJSSLJp0iRgh', 'JackpotCollection');
// Scripts/JsonData/JackpotCollection.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JackpotCollectionManager = exports.JsonJackpotCollection = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonJackpotCollection = /** @class */ (function () {
    function JsonJackpotCollection() {
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
    return JsonJackpotCollection;
}());
exports.JsonJackpotCollection = JsonJackpotCollection;
var JackpotCollectionManager = /** @class */ (function () {
    function JackpotCollectionManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    JackpotCollectionManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new JackpotCollectionManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    JackpotCollectionManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    JackpotCollectionManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('JackpotCollection', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonJackpotCollection成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonJackpotCollection();
                jsonData = json[i];
                _this.data.set(jsonData.JackpotID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    JackpotCollectionManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    JackpotCollectionManager.prototype.getJsonJackpotCollection = function (id) {
        return this.data.get(id);
    };
    /**根据奖池ID获取总权重数 */
    JackpotCollectionManager.prototype.getWeight_Sum = function (id) {
        return this.data.get(id).Weight_Sum;
    };
    /**根据奖池ID获取掉落组列 */
    JackpotCollectionManager.prototype.getDrop_Array = function (id) {
        return this.data.get(id).Drop_Array;
    };
    /**根据奖池ID获取掉落数量 */
    JackpotCollectionManager.prototype.getDrop_Num = function (id) {
        return this.data.get(id).Drop_Num;
    };
    /**根据奖池ID获取各个权重 */
    JackpotCollectionManager.prototype.getWeight = function (id) {
        return this.data.get(id).Weight;
    };
    /** 静态方法，获取最大的 奖池ID*/
    JackpotCollectionManager.getMaxJackpotID = function () {
        return 1010002;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param jackpotCollectID 奖池集id
     * @param jackpotID 奖池id
     */
    JackpotCollectionManager.prototype.getRateByJackpotId = function (jackpotCollectID, jackpotID) {
        var rate = 0;
        var jj = this.getJsonJackpotCollection(jackpotCollectID);
        var totalWeight = jj.Weight_Sum;
        var arrLen = jj.Weight.length;
        //如果总权重为0，就自己算算
        if (totalWeight <= 0) {
            for (var w = 0; w < arrLen; w++) {
                var weightNum = jj.Weight[w];
                totalWeight += weightNum;
            }
        }
        var index = jj.Drop_Array.indexOf(jackpotID);
        if (index != -1) {
            rate = jj.Weight[index] / totalWeight;
        }
        return rate;
    };
    /** 根据奖池集id 随机获取奖池id*/
    JackpotCollectionManager.prototype.getJackpotIdByJCId = function (id) {
        var jId = 0;
        var jj = this.getJsonJackpotCollection(id);
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
                jId = jj.Drop_Array[w];
                break;
            }
        }
        return jId;
    };
    JackpotCollectionManager._instance = null;
    return JackpotCollectionManager;
}());
exports.JackpotCollectionManager = JackpotCollectionManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEphY2twb3RDb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFxRDtBQUVyRDtJQUFBO1FBQ0ksVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsVUFBVTtRQUNILGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsVUFBVTtRQUNILGVBQVUsR0FBWSxFQUFFLENBQUU7UUFDakMsVUFBVTtRQUNILGFBQVEsR0FBWSxFQUFFLENBQUU7UUFDL0IsVUFBVTtRQUNILFdBQU0sR0FBWSxFQUFFLENBQUU7SUFDakMsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFYWSxzREFBcUI7QUFhbEM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBbUMsSUFBSSxDQUFDO1FBQzVDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQTRINUMsQ0FBQztJQTFIaUIsb0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCx1Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDJDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDN0YsSUFBRyxLQUFLLEVB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QUE2QixJQUFJLENBQUM7SUErSDlELCtCQUFDO0NBaElELEFBZ0lDLElBQUE7QUFoSVksNERBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25KYWNrcG90Q29sbGVjdGlvbiB7XHJcbiAgICAvKirlpZbmsaBJRCAqL1xyXG4gICAgcHVibGljIEphY2twb3RJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAu+adg+mHjeaVsCAqL1xyXG4gICAgcHVibGljIFdlaWdodF9TdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirmjonokL3nu4TliJcgKi9cclxuICAgIHB1YmxpYyBEcm9wX0FycmF5Om51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5o6J6JC95pWw6YePICovXHJcbiAgICBwdWJsaWMgRHJvcF9OdW06bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirlkITkuKrmnYPph40gKi9cclxuICAgIHB1YmxpYyBXZWlnaHQ6bnVtYmVyW10gPSBbXSA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uSmFja3BvdENvbGxlY3Rpb24+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkphY2twb3RDb2xsZWN0aW9uTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdKYWNrcG90Q29sbGVjdGlvbicsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25KYWNrcG90Q29sbGVjdGlvbuaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25KYWNrcG90Q29sbGVjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuSmFja3BvdElELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uSmFja3BvdENvbGxlY3Rpb24oaWQ6bnVtYmVyKTpKc29uSmFja3BvdENvbGxlY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluaxoElE6I635Y+W5oC75p2D6YeN5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0V2VpZ2h0X1N1bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5XZWlnaHRfU3VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5rGgSUTojrflj5bmjonokL3nu4TliJcgKi9cclxuICAgIHB1YmxpYyBnZXREcm9wX0FycmF5KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRHJvcF9BcnJheTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluaxoElE6I635Y+W5o6J6JC95pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0RHJvcF9OdW0oaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Ecm9wX051bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluaxoElE6I635Y+W5ZCE5Liq5p2D6YeNICovXHJcbiAgICBwdWJsaWMgZ2V0V2VpZ2h0KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuV2VpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5aWW5rGgSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhKYWNrcG90SUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxMDEwMDAyO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBqYWNrcG90Q29sbGVjdElEIOWlluaxoOmbhmlkXHJcbiAgICAgKiBAcGFyYW0gamFja3BvdElEIOWlluaxoGlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSYXRlQnlKYWNrcG90SWQoamFja3BvdENvbGxlY3RJRDpudW1iZXIsamFja3BvdElEOm51bWJlcik6bnVtYmVye1xyXG5cclxuICAgICAgICBsZXQgcmF0ZT0wO1xyXG4gICAgICAgIGxldCBqaj10aGlzLmdldEpzb25KYWNrcG90Q29sbGVjdGlvbihqYWNrcG90Q29sbGVjdElEKTtcclxuICAgICAgICBsZXQgdG90YWxXZWlnaHQ9amouV2VpZ2h0X1N1bTtcclxuICAgICAgICBsZXQgYXJyTGVuPWpqLldlaWdodC5sZW5ndGg7XHJcbiAgICAgICAgLy/lpoLmnpzmgLvmnYPph43kuLow77yM5bCx6Ieq5bex566X566XXHJcbiAgICAgICAgaWYodG90YWxXZWlnaHQ8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IHc9MDsgdzxhcnJMZW47IHcrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdlaWdodE51bT1qai5XZWlnaHRbd107XHJcbiAgICAgICAgICAgICAgICB0b3RhbFdlaWdodCs9d2VpZ2h0TnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleD1qai5Ecm9wX0FycmF5LmluZGV4T2YoamFja3BvdElEKTtcclxuICAgICAgICBpZihpbmRleCE9LTEpe1xyXG4gICAgICAgICAgICByYXRlPWpqLldlaWdodFtpbmRleF0vdG90YWxXZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmoLnmja7lpZbmsaDpm4ZpZCDpmo/mnLrojrflj5blpZbmsaBpZCovXHJcbiAgICBwdWJsaWMgZ2V0SmFja3BvdElkQnlKQ0lkKGlkOm51bWJlcik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGpJZD0wO1xyXG4gICAgICAgIGxldCBqaj10aGlzLmdldEpzb25KYWNrcG90Q29sbGVjdGlvbihpZCk7XHJcbiAgICAgICAgLy/moLnmja7mnYPph43pmo/mnLpcclxuICAgICAgICBsZXQgdG90YWxXZWlnaHQ9amouV2VpZ2h0X1N1bTtcclxuICAgICAgICBsZXQgYXJyTGVuPWpqLldlaWdodC5sZW5ndGg7XHJcbiAgICAgICAgLy/lpoLmnpzmgLvmnYPph43kuLow77yM5bCx6Ieq5bex566X566XXHJcbiAgICAgICAgaWYodG90YWxXZWlnaHQ8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IHc9MDsgdzxhcnJMZW47IHcrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdlaWdodE51bT1qai5XZWlnaHRbd107XHJcbiAgICAgICAgICAgICAgICB0b3RhbFdlaWdodCs9d2VpZ2h0TnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByYW5kV2VpZ2h0PU1hdGgucmFuZG9tKCkqdG90YWxXZWlnaHQ7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGxldCBjdXJXZWlnaHQ9MDtcclxuICAgICAgICAvL+WIpOaWreadg+mHjeWcqOWTquS4quWlluWTgeS4ilxyXG4gICAgICAgIGZvcihsZXQgdz0wOyB3PGFyckxlbjsgdysrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHdlaWdodE51bT1qai5XZWlnaHRbd11cclxuICAgICAgICAgICAgY3VyV2VpZ2h0Kz13ZWlnaHROdW07XHJcbiAgICAgICAgICAgIGlmKHJhbmRXZWlnaHQ8Y3VyV2VpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBqSWQ9amouRHJvcF9BcnJheVt3XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBqSWQ7XHJcbiAgICB9XHJcbn1cclxuIl19