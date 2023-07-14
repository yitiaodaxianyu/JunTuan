
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/EndlessBuff.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74b9bKj2SRBxp6eEhLmSznD', 'EndlessBuff');
// Scripts/copy/endlesschallenges/EndlessBuff.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndlessBuffManager = exports.JsonEndlessBuff = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var MyTool_1 = require("../../Tools/MyTool");
var JsonEndlessBuff = /** @class */ (function () {
    function JsonEndlessBuff() {
        /**无尽BUff */
        this.EndlessBuff = 0;
        /**强度级别 */
        this.Rarity = 0;
        /**类型 */
        this.Type = 0;
        /**参数 */
        this.Parameter = 0;
        /**权重 */
        this.Weight = 0;
    }
    return JsonEndlessBuff;
}());
exports.JsonEndlessBuff = JsonEndlessBuff;
var EndlessBuffManager = /** @class */ (function () {
    function EndlessBuffManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EndlessBuffManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EndlessBuffManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EndlessBuffManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EndlessBuffManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EndlessBuff', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessBuff成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEndlessBuff();
                jsonData = json[i];
                _this.data.set(jsonData.EndlessBuff, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EndlessBuffManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EndlessBuffManager.prototype.getJsonEndlessBuff = function (id) {
        return this.data.get(id);
    };
    /**根据无尽BUff获取强度级别 */
    EndlessBuffManager.prototype.getRarity = function (id) {
        return this.data.get(id).Rarity;
    };
    /**根据无尽BUff获取类型 */
    EndlessBuffManager.prototype.getType = function (id) {
        return this.data.get(id).Type;
    };
    /**根据无尽BUff获取参数 */
    EndlessBuffManager.prototype.getParameter = function (id) {
        return this.data.get(id).Parameter;
    };
    /**根据无尽BUff获取权重 */
    EndlessBuffManager.prototype.getWeight = function (id) {
        return this.data.get(id).Weight;
    };
    /** 静态方法，获取最大的 无尽BUff*/
    EndlessBuffManager.getMaxEndlessBuff = function () {
        return 511;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**根据权重取得三个buff */
    EndlessBuffManager.prototype.getThreeWeight = function () {
        var Weight = [];
        var key = [];
        this.data.forEach(function (element) {
            Weight.push(element.Weight);
            key.push(element.EndlessBuff);
        });
        var myweight = MyTool_1.default.getWeightIndexs(Weight, 3);
        var mykey = [];
        for (var index = 0; index < myweight.length; index++) {
            mykey.push(key[myweight[index]]);
        }
        return mykey;
    };
    /**根据权重取得一个橙色及以上的buff */
    EndlessBuffManager.prototype.getWeightOrange = function () {
        var Weight = [];
        var key = [];
        this.data.forEach(function (element) {
            if (element.Rarity >= 4) {
                Weight.push(element.Weight);
                key.push(element.EndlessBuff);
            }
        });
        var myweight = MyTool_1.default.getWeightIndexs(Weight, 1);
        var mykey = 0;
        mykey = key[myweight[0]];
        return mykey;
    };
    EndlessBuffManager._instance = null;
    return EndlessBuffManager;
}());
exports.EndlessBuffManager = EndlessBuffManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXEVuZGxlc3NCdWZmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUN4RCw2Q0FBd0M7QUFHeEM7SUFBQTtRQUNJLFlBQVk7UUFDTCxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUMvQixVQUFVO1FBQ0gsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUMxQixRQUFRO1FBQ0QsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUN4QixRQUFRO1FBQ0QsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUM3QixRQUFRO1FBQ0QsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLDBDQUFlO0FBYTVCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQWlDLElBQUksQ0FBQztRQUMxQyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7SUFnRy9DLENBQUM7SUE5RmlCLDhCQUFXLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsaUNBQUksR0FBWjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxxQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSx5QkFBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLEtBQVksRUFBRSxNQUFv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Q0FBZSxHQUFmO1FBQ0ksSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFBO1FBQ2IsSUFBSSxHQUFHLEdBQUMsRUFBRSxDQUFBO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3JCLElBQUcsT0FBTyxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTthQUNoQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxRQUFRLEdBQUMsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdDLElBQUksS0FBSyxHQUFDLENBQUMsQ0FBQTtRQUNYLEtBQUssR0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEIsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQWxHYyw0QkFBUyxHQUF1QixJQUFJLENBQUM7SUFtR3hELHlCQUFDO0NBcEdELEFBb0dDLElBQUE7QUFwR1ksZ0RBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgRW5kbGVzc0J1ZmYgfSBmcm9tIFwiLi9FbmRsZXNzQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkVuZGxlc3NCdWZmIHtcclxuICAgIC8qKuaXoOWwvUJVZmYgKi9cclxuICAgIHB1YmxpYyBFbmRsZXNzQnVmZjogbnVtYmVyID0gMDtcclxuICAgIC8qKuW8uuW6pue6p+WIqyAqL1xyXG4gICAgcHVibGljIFJhcml0eTogbnVtYmVyID0gMDtcclxuICAgIC8qKuexu+WeiyAqL1xyXG4gICAgcHVibGljIFR5cGU6IG51bWJlciA9IDA7XHJcbiAgICAvKirlj4LmlbAgKi9cclxuICAgIHB1YmxpYyBQYXJhbWV0ZXI6IG51bWJlciA9IDA7XHJcbiAgICAvKirmnYPph40gKi9cclxuICAgIHB1YmxpYyBXZWlnaHQ6IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbmRsZXNzQnVmZk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBFbmRsZXNzQnVmZk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6IE1hcDxudW1iZXIsIEpzb25FbmRsZXNzQnVmZj4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRW5kbGVzc0J1ZmZNYW5hZ2VyIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBFbmRsZXNzQnVmZk1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0VuZGxlc3NCdWZmJywgTG9hZE1hbmFnZXIubG9hZF9tb2RlLCAoZXJyb3I6IEVycm9yLCBhc3NldHM6IGNjLkpzb25Bc3NldCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkVuZGxlc3NCdWZm5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb24gPSBhc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBqc29uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGEgPSBuZXcgSnNvbkVuZGxlc3NCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YSA9IGpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkVuZGxlc3NCdWZmLCBqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkVuZGxlc3NCdWZmKGlkOiBudW1iZXIpOiBKc29uRW5kbGVzc0J1ZmYge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaXoOWwvUJVZmbojrflj5blvLrluqbnuqfliKsgKi9cclxuICAgIHB1YmxpYyBnZXRSYXJpdHkoaWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJhcml0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaXoOWwvUJVZmbojrflj5bnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRUeXBlKGlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5UeXBlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5peg5bC9QlVmZuiOt+WPluWPguaVsCAqL1xyXG4gICAgcHVibGljIGdldFBhcmFtZXRlcihpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUGFyYW1ldGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5peg5bC9QlVmZuiOt+WPluadg+mHjSAqL1xyXG4gICAgcHVibGljIGdldFdlaWdodChpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuV2VpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5peg5bC9QlVmZiovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEVuZGxlc3NCdWZmKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDUxMTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuICAgIC8qKuagueaNruadg+mHjeWPluW+l+S4ieS4qmJ1ZmYgKi9cclxuICAgIGdldFRocmVlV2VpZ2h0KCk6bnVtYmVyW10ge1xyXG4gICAgICAgIGxldCBXZWlnaHQ9W11cclxuICAgICAgICBsZXQga2V5PVtdXHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIFdlaWdodC5wdXNoKGVsZW1lbnQuV2VpZ2h0KVxyXG4gICAgICAgICAgICBrZXkucHVzaChlbGVtZW50LkVuZGxlc3NCdWZmKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBteXdlaWdodD1NeVRvb2wuZ2V0V2VpZ2h0SW5kZXhzKFdlaWdodCwzKVxyXG4gICAgICAgIGxldCBteWtleT1bXVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBteXdlaWdodC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbXlrZXkucHVzaChrZXlbbXl3ZWlnaHRbaW5kZXhdXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG15a2V5XHJcbiAgICB9ICAgXHJcblxyXG4gICAgLyoq5qC55o2u5p2D6YeN5Y+W5b6X5LiA5Liq5qmZ6Imy5Y+K5Lul5LiK55qEYnVmZiAqL1xyXG4gICAgZ2V0V2VpZ2h0T3JhbmdlKCk6bnVtYmVyIHtcclxuICAgICAgICBsZXQgV2VpZ2h0PVtdXHJcbiAgICAgICAgbGV0IGtleT1bXVxyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZihlbGVtZW50LlJhcml0eT49NCl7XHJcbiAgICAgICAgICAgICAgICBXZWlnaHQucHVzaChlbGVtZW50LldlaWdodClcclxuICAgICAgICAgICAgICAgIGtleS5wdXNoKGVsZW1lbnQuRW5kbGVzc0J1ZmYpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbXl3ZWlnaHQ9TXlUb29sLmdldFdlaWdodEluZGV4cyhXZWlnaHQsMSlcclxuICAgICAgICBsZXQgbXlrZXk9MFxyXG4gICAgICAgIG15a2V5PWtleVtteXdlaWdodFswXV1cclxuICAgICAgICByZXR1cm4gbXlrZXlcclxuICAgIH0gICBcclxufVxyXG4iXX0=