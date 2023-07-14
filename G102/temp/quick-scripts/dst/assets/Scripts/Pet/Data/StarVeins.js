
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/StarVeins.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84e55bTdQVKp4yBNUKBF1N0', 'StarVeins');
// Scripts/Pet/Data/StarVeins.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarVeinsManager = exports.JsonStarVeins = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonStarVeins = /** @class */ (function () {
    function JsonStarVeins() {
        /**星脉ID */
        this.StarVeinsId = 0;
        /**星脉名称 */
        this.StarVeinsName = 0;
        /**品质 */
        this.Quality = 0;
        /**节点数量 */
        this.NodeNum = 0;
    }
    return JsonStarVeins;
}());
exports.JsonStarVeins = JsonStarVeins;
var StarVeinsManager = /** @class */ (function () {
    function StarVeinsManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    StarVeinsManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new StarVeinsManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    StarVeinsManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    StarVeinsManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('StarVeins', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonStarVeins成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonStarVeins();
                jsonData = json[i];
                _this.data.set(jsonData.StarVeinsId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    StarVeinsManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    StarVeinsManager.prototype.getJsonStarVeins = function (id) {
        return this.data.get(id);
    };
    /**根据星脉ID获取星脉名称 */
    StarVeinsManager.prototype.getStarVeinsName = function (id) {
        return this.data.get(id).StarVeinsName;
    };
    /**根据星脉ID获取品质 */
    StarVeinsManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据星脉ID获取节点数量 */
    StarVeinsManager.prototype.getNodeNum = function (id) {
        return this.data.get(id).NodeNum;
    };
    /** 静态方法，获取最大的 星脉ID*/
    StarVeinsManager.getMaxStarVeinsId = function () {
        return 0;
    };
    StarVeinsManager._instance = null;
    return StarVeinsManager;
}());
exports.StarVeinsManager = StarVeinsManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTdGFyVmVpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBR3hEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO0lBQy9CLENBQUM7SUFBRCxvQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksc0NBQWE7QUFXMUI7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBMkIsSUFBSSxDQUFDO1FBQ3BDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQTREeEMseUJBQXlCO0lBRzdCLENBQUM7SUE3RGlCLDRCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsK0JBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxtQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNyRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEQ7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCw2Q0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsMkNBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsMkNBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUNELGdCQUFnQjtJQUNULHFDQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLHFDQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLGtDQUFpQixHQUEvQjtRQUNJLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQTdEYywwQkFBUyxHQUFxQixJQUFJLENBQUM7SUFrRXRELHVCQUFDO0NBbkVELEFBbUVDLElBQUE7QUFuRVksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uU3RhclZlaW5zIHtcclxuICAgIC8qKuaYn+iEiUlEICovXHJcbiAgICBwdWJsaWMgU3RhclZlaW5zSWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmJ/ohInlkI3np7AgKi9cclxuICAgIHB1YmxpYyBTdGFyVmVpbnNOYW1lOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgUXVhbGl0eTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiKgueCueaVsOmHjyAqL1xyXG4gICAgcHVibGljIE5vZGVOdW06bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFyVmVpbnNNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU3RhclZlaW5zTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25TdGFyVmVpbnM+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlN0YXJWZWluc01hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBTdGFyVmVpbnNNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1N0YXJWZWlucycsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25TdGFyVmVpbnPmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uU3RhclZlaW5zKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5TdGFyVmVpbnNJZCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvblN0YXJWZWlucyhpZDpudW1iZXIpOkpzb25TdGFyVmVpbnMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaYn+iEiUlE6I635Y+W5pif6ISJ5ZCN56ewICovXHJcbiAgICBwdWJsaWMgZ2V0U3RhclZlaW5zTmFtZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5TdGFyVmVpbnNOYW1lO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5pif6ISJSUTojrflj5blk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRRdWFsaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlF1YWxpdHk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mmJ/ohIlJROiOt+WPluiKgueCueaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldE5vZGVOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTm9kZU51bTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOaYn+iEiUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4U3RhclZlaW5zSWQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19