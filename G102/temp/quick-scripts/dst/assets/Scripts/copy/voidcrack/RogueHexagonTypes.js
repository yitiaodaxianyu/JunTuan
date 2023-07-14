
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/voidcrack/RogueHexagonTypes.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5b65rOZx9PZJO4J9ZqCyY0', 'RogueHexagonTypes');
// Scripts/copy/voidcrack/RogueHexagonTypes.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueHexagonTypesManager = exports.JsonRogueHexagonTypes = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueHexagonTypes = /** @class */ (function () {
    function JsonRogueHexagonTypes() {
        /**格子ID */
        this.Hexagon_ID = 0;
        /**章数 */
        this.Layers = 0;
        /**行数 */
        this.Rows = 0;
        /**位置 */
        this.Position = 0;
        /**格子类型 */
        this.HexagonType = 0;
        /**道具1_ID */
        this.RogueProp1_ID = 0;
        /**道具1_数量 */
        this.RogueProp1_Sum = 0;
        /**专武奖池集 */
        this.RogueProp2_ID = 0;
        /**奖励数量 */
        this.RogueProp2_Sum = 0;
    }
    return JsonRogueHexagonTypes;
}());
exports.JsonRogueHexagonTypes = JsonRogueHexagonTypes;
var RogueHexagonTypesManager = /** @class */ (function () {
    function RogueHexagonTypesManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    RogueHexagonTypesManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueHexagonTypesManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueHexagonTypesManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueHexagonTypesManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueHexagonTypes', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueHexagonTypes成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueHexagonTypes();
                jsonData = json[i];
                _this.data.set(jsonData.Hexagon_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueHexagonTypesManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueHexagonTypesManager.prototype.getJsonRogueHexagonTypes = function (id) {
        return this.data.get(id);
    };
    /**根据格子ID获取章数 */
    RogueHexagonTypesManager.prototype.getLayers = function (id) {
        return this.data.get(id).Layers;
    };
    /**根据格子ID获取行数 */
    RogueHexagonTypesManager.prototype.getRows = function (id) {
        return this.data.get(id).Rows;
    };
    /**根据格子ID获取位置 */
    RogueHexagonTypesManager.prototype.getPosition = function (id) {
        return this.data.get(id).Position;
    };
    /**根据格子ID获取格子类型 */
    RogueHexagonTypesManager.prototype.getHexagonType = function (id) {
        return this.data.get(id).HexagonType;
    };
    /**根据格子ID获取道具1_ID */
    RogueHexagonTypesManager.prototype.getRogueProp1_ID = function (id) {
        return this.data.get(id).RogueProp1_ID;
    };
    /**根据格子ID获取道具1_数量 */
    RogueHexagonTypesManager.prototype.getRogueProp1_Sum = function (id) {
        return this.data.get(id).RogueProp1_Sum;
    };
    /**根据格子ID获取专武奖池集 */
    RogueHexagonTypesManager.prototype.getRogueProp2_ID = function (id) {
        return this.data.get(id).RogueProp2_ID;
    };
    /**根据格子ID获取奖励数量 */
    RogueHexagonTypesManager.prototype.getRogueProp2_Sum = function (id) {
        return this.data.get(id).RogueProp2_Sum;
    };
    /** 静态方法，获取最大的 格子ID*/
    RogueHexagonTypesManager.getMaxHexagon_ID = function () {
        return 80092;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 返回一个格子id2
     * 层数*10000+行数+位置
     * @param layer 层数
     * @param row 行数
     * @param position 位置
     * @returns
     */
    RogueHexagonTypesManager.getId = function (layer, row, position) {
        return layer * 10000 + row * 10 + position;
    };
    RogueHexagonTypesManager.prototype.getData = function () {
        return this.data;
    };
    /**返回这一层的所有格子id
     * 层数
    */
    RogueHexagonTypesManager.prototype.getAllLayerId = function (layer) {
        var Allid = [];
        this.data.forEach(function (v, k) {
            if (v.Layers == layer) {
                Allid.push(v.Hexagon_ID);
            }
        });
        return Allid;
    };
    RogueHexagonTypesManager._instance = null;
    return RogueHexagonTypesManager;
}());
exports.RogueHexagonTypesManager = RogueHexagonTypesManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcdm9pZGNyYWNrXFxSb2d1ZUhleGFnb25UeXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFFBQVE7UUFDRCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFFBQVE7UUFDRCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFVBQVU7UUFDSCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixZQUFZO1FBQ0wsa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsWUFBWTtRQUNMLG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFdBQVc7UUFDSixrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxVQUFVO1FBQ0gsbUJBQWMsR0FBVSxDQUFDLENBQUU7SUFDdEMsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxzREFBcUI7QUFxQmxDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQW1DLElBQUksQ0FBQztRQUM1QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUFpSDVDLENBQUM7SUEvR2lCLG9DQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksd0JBQXdCLEVBQUUsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsdUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFB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QWdCLEdBQTlCO1FBQ0ksT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELHlCQUF5QjtJQUd6Qix5QkFBeUI7SUFDekI7Ozs7Ozs7T0FPRztJQUNLLDhCQUFLLEdBQVosVUFBYSxLQUFZLEVBQUMsR0FBVSxFQUFDLFFBQWU7UUFDakQsT0FBTyxLQUFLLEdBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxFQUFFLEdBQUMsUUFBUSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwwQ0FBTyxHQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7TUFFRTtJQUNGLGdEQUFhLEdBQWIsVUFBYyxLQUFZO1FBQ3RCLElBQUksS0FBSyxHQUFDLEVBQUUsQ0FBQTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbEIsSUFBRyxDQUFDLENBQUMsTUFBTSxJQUFFLEtBQUssRUFBQztnQkFDZixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQTthQUMzQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQWxIYyxrQ0FBUyxHQUE2QixJQUFJLENBQUM7SUFvSDlELCtCQUFDO0NBckhELEFBcUhDLElBQUE7QUFySFksNERBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Sb2d1ZUhleGFnb25UeXBlcyB7XHJcbiAgICAvKirmoLzlrZBJRCAqL1xyXG4gICAgcHVibGljIEhleGFnb25fSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnq6DmlbAgKi9cclxuICAgIHB1YmxpYyBMYXllcnM6bnVtYmVyID0gMCA7XHJcbiAgICAvKirooYzmlbAgKi9cclxuICAgIHB1YmxpYyBSb3dzOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5L2N572uICovXHJcbiAgICBwdWJsaWMgUG9zaXRpb246bnVtYmVyID0gMCA7XHJcbiAgICAvKirmoLzlrZDnsbvlnosgKi9cclxuICAgIHB1YmxpYyBIZXhhZ29uVHlwZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzFfSUQgKi9cclxuICAgIHB1YmxpYyBSb2d1ZVByb3AxX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MV/mlbDph48gKi9cclxuICAgIHB1YmxpYyBSb2d1ZVByb3AxX1N1bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4k+atpuWlluaxoOmbhiAqL1xyXG4gICAgcHVibGljIFJvZ3VlUHJvcDJfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHmlbDph48gKi9cclxuICAgIHB1YmxpYyBSb2d1ZVByb3AyX1N1bTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Sb2d1ZUhleGFnb25UeXBlcz49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Um9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1JvZ3VlSGV4YWdvblR5cGVzJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblJvZ3VlSGV4YWdvblR5cGVz5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblJvZ3VlSGV4YWdvblR5cGVzKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5IZXhhZ29uX0lELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUm9ndWVIZXhhZ29uVHlwZXMoaWQ6bnVtYmVyKTpKc29uUm9ndWVIZXhhZ29uVHlwZXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W56ug5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0TGF5ZXJzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkxheWVycztcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W6KGM5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0Um93cyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Sb3dzO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5qC85a2QSUTojrflj5bkvY3nva4gKi9cclxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qb3NpdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W5qC85a2Q57G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0SGV4YWdvblR5cGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSGV4YWdvblR5cGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7moLzlrZBJROiOt+WPlumBk+WFtzFfSUQgKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZVByb3AxX0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJvZ3VlUHJvcDFfSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7moLzlrZBJROiOt+WPlumBk+WFtzFf5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0Um9ndWVQcm9wMV9TdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVQcm9wMV9TdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7moLzlrZBJROiOt+WPluS4k+atpuWlluaxoOmbhiAqL1xyXG4gICAgcHVibGljIGdldFJvZ3VlUHJvcDJfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVQcm9wMl9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruagvOWtkElE6I635Y+W5aWW5Yqx5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0Um9ndWVQcm9wMl9TdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVQcm9wMl9TdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDmoLzlrZBJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEhleGFnb25fSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA4MDA5MjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuS4gOS4quagvOWtkGlkMlxyXG4gICAgICog5bGC5pWwKjEwMDAwK+ihjOaVsCvkvY3nva5cclxuICAgICAqIEBwYXJhbSBsYXllciDlsYLmlbBcclxuICAgICAqIEBwYXJhbSByb3cg6KGM5pWwXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24g5L2N572uXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgIHN0YXRpYyBnZXRJZChsYXllcjpudW1iZXIscm93Om51bWJlcixwb3NpdGlvbjpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gbGF5ZXIqMTAwMDArcm93KjEwK3Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGEoKTpNYXA8bnVtYmVyLEpzb25Sb2d1ZUhleGFnb25UeXBlcz57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKirov5Tlm57ov5nkuIDlsYLnmoTmiYDmnInmoLzlrZBpZCBcclxuICAgICAqIOWxguaVsFxyXG4gICAgKi9cclxuICAgIGdldEFsbExheWVySWQobGF5ZXI6bnVtYmVyKXtcclxuICAgICAgICBsZXQgQWxsaWQ9W11cclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpZih2LkxheWVycz09bGF5ZXIpe1xyXG4gICAgICAgICAgICAgICAgQWxsaWQucHVzaCh2LkhleGFnb25fSUQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gQWxsaWRcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==