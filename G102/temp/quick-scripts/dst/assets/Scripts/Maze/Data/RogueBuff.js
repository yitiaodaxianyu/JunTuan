
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/Data/RogueBuff.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bf497XVUbRLfI+3HvYqelbV', 'RogueBuff');
// Scripts/Maze/Data/RogueBuff.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueBuffManager = exports.JsonRogueBuff = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueBuff = /** @class */ (function () {
    function JsonRogueBuff() {
        /**战利品ID */
        this.RogueBuff_ID = 0;
        /**战利品品质 */
        this.RogueBuff_Quality = 0;
        /**战利品名称 */
        this.RogueBuff_Name = 0;
        /**战利品文本1_ID */
        this.RogueBuffText_ID = 0;
        /**战利品类型 */
        this.RogueBuff_Type = 0;
        /**战利品加成1 */
        this.RogueBuff1_Value = 0;
        /**战利品加成2 */
        this.RogueBuff2_Value = 0;
        /**战利品加成3 */
        this.RogueBuff3_Value = 0;
    }
    return JsonRogueBuff;
}());
exports.JsonRogueBuff = JsonRogueBuff;
var RogueBuffManager = /** @class */ (function () {
    function RogueBuffManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    RogueBuffManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueBuffManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueBuffManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueBuffManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueBuff', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueBuff成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueBuff();
                jsonData = json[i];
                _this.data.set(jsonData.RogueBuff_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueBuffManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueBuffManager.prototype.getJsonRogueBuff = function (id) {
        return this.data.get(id);
    };
    /**根据战利品ID获取战利品品质 */
    RogueBuffManager.prototype.getRogueBuff_Quality = function (id) {
        return this.data.get(id).RogueBuff_Quality;
    };
    /**根据战利品ID获取战利品名称 */
    RogueBuffManager.prototype.getRogueBuff_Name = function (id) {
        return this.data.get(id).RogueBuff_Name;
    };
    /**根据战利品ID获取战利品文本1_ID */
    RogueBuffManager.prototype.getRogueBuffText_ID = function (id) {
        return this.data.get(id).RogueBuffText_ID;
    };
    /**根据战利品ID获取战利品类型 */
    RogueBuffManager.prototype.getRogueBuff_Type = function (id) {
        return this.data.get(id).RogueBuff_Type;
    };
    /**根据战利品ID获取战利品加成1 */
    RogueBuffManager.prototype.getRogueBuff1_Value = function (id) {
        return this.data.get(id).RogueBuff1_Value;
    };
    /**根据战利品ID获取战利品加成2 */
    RogueBuffManager.prototype.getRogueBuff2_Value = function (id) {
        return this.data.get(id).RogueBuff2_Value;
    };
    /**根据战利品ID获取战利品加成3 */
    RogueBuffManager.prototype.getRogueBuff3_Value = function (id) {
        return this.data.get(id).RogueBuff3_Value;
    };
    /** 静态方法，获取最大的 战利品ID*/
    RogueBuffManager.getMaxRogueBuff_ID = function () {
        return 9003;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param excludeList 排除列表，当id存在时，不加入列表中
     * @returns 返回可以参与随机的列表
     */
    RogueBuffManager.prototype.getBuffArr = function (excludeList) {
        var buffArr = [[], [], []];
        //把相同品质的放一起
        this.data.forEach(function (jsonData) {
            if (excludeList.indexOf(jsonData.RogueBuff_ID) == -1) {
                buffArr[jsonData.RogueBuff_Quality - 1].push(jsonData.RogueBuff_ID);
            }
        });
        return buffArr;
    };
    RogueBuffManager.prototype.getBuffIdList = function () {
        var buffList = [];
        //把相同品质的放一起
        this.data.forEach(function (jsonData) {
            buffList.push(jsonData.RogueBuff_ID);
        });
        return buffList;
    };
    RogueBuffManager.prototype.getData = function () {
        return this.data;
    };
    RogueBuffManager._instance = null;
    return RogueBuffManager;
}());
exports.RogueBuffManager = RogueBuffManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcRGF0YVxcUm9ndWVCdWZmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFdBQVc7UUFDSixzQkFBaUIsR0FBVSxDQUFDLENBQUU7UUFDckMsV0FBVztRQUNKLG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLGVBQWU7UUFDUixxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsV0FBVztRQUNKLG1CQUFjLEdBQVUsQ0FBQyxDQUFFO1FBQ2xDLFlBQVk7UUFDTCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsWUFBWTtRQUNMLHFCQUFnQixHQUFVLENBQUMsQ0FBRTtRQUNwQyxZQUFZO1FBQ0wscUJBQWdCLEdBQVUsQ0FBQyxDQUFFO0lBQ3hDLENBQUM7SUFBRCxvQkFBQztBQUFELENBakJBLEFBaUJDLElBQUE7QUFqQlksc0NBQWE7QUFtQjFCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTJCLElBQUksQ0FBQztRQUNwQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUF5RzVDLENBQUM7SUF2R2lCLDRCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsK0JBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxtQ0FB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Q0FBQyxDQUFDO1FBQ3ZCLFdBQVc7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQXNCO1lBQ3JDLElBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUUsQ0FBQyxDQUFDLEVBQUM7Z0JBQzlDLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNyRTtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVNLHdDQUFhLEdBQXBCO1FBQ0ksSUFBSSxRQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ2hCLFdBQVc7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQXNCO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELGtDQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQTNHYywwQkFBUyxHQUFxQixJQUFJLENBQUM7SUE0R3RELHVCQUFDO0NBN0dELEFBNkdDLElBQUE7QUE3R1ksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uUm9ndWVCdWZmIHtcclxuICAgIC8qKuaImOWIqeWTgUlEICovXHJcbiAgICBwdWJsaWMgUm9ndWVCdWZmX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oiY5Yip5ZOB5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgUm9ndWVCdWZmX1F1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmiJjliKnlk4HlkI3np7AgKi9cclxuICAgIHB1YmxpYyBSb2d1ZUJ1ZmZfTmFtZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaImOWIqeWTgeaWh+acrDFfSUQgKi9cclxuICAgIHB1YmxpYyBSb2d1ZUJ1ZmZUZXh0X0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oiY5Yip5ZOB57G75Z6LICovXHJcbiAgICBwdWJsaWMgUm9ndWVCdWZmX1R5cGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmiJjliKnlk4HliqDmiJAxICovXHJcbiAgICBwdWJsaWMgUm9ndWVCdWZmMV9WYWx1ZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaImOWIqeWTgeWKoOaIkDIgKi9cclxuICAgIHB1YmxpYyBSb2d1ZUJ1ZmYyX1ZhbHVlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oiY5Yip5ZOB5Yqg5oiQMyAqL1xyXG4gICAgcHVibGljIFJvZ3VlQnVmZjNfVmFsdWU6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2d1ZUJ1ZmZNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUm9ndWVCdWZmTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Sb2d1ZUJ1ZmY+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlJvZ3VlQnVmZk1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBSb2d1ZUJ1ZmZNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1JvZ3VlQnVmZicsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25Sb2d1ZUJ1ZmbmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uUm9ndWVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5Sb2d1ZUJ1ZmZfSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Sb2d1ZUJ1ZmYoaWQ6bnVtYmVyKTpKc29uUm9ndWVCdWZmIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjliKnlk4FJROiOt+WPluaImOWIqeWTgeWTgei0qCAqL1xyXG4gICAgcHVibGljIGdldFJvZ3VlQnVmZl9RdWFsaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJvZ3VlQnVmZl9RdWFsaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oiY5Yip5ZOBSUTojrflj5bmiJjliKnlk4HlkI3np7AgKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZUJ1ZmZfTmFtZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Sb2d1ZUJ1ZmZfTmFtZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaImOWIqeWTgUlE6I635Y+W5oiY5Yip5ZOB5paH5pysMV9JRCAqL1xyXG4gICAgcHVibGljIGdldFJvZ3VlQnVmZlRleHRfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVCdWZmVGV4dF9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaImOWIqeWTgUlE6I635Y+W5oiY5Yip5ZOB57G75Z6LICovXHJcbiAgICBwdWJsaWMgZ2V0Um9ndWVCdWZmX1R5cGUoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUm9ndWVCdWZmX1R5cGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjliKnlk4FJROiOt+WPluaImOWIqeWTgeWKoOaIkDEgKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZUJ1ZmYxX1ZhbHVlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJvZ3VlQnVmZjFfVmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjliKnlk4FJROiOt+WPluaImOWIqeWTgeWKoOaIkDIgKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZUJ1ZmYyX1ZhbHVlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJvZ3VlQnVmZjJfVmFsdWU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjliKnlk4FJROiOt+WPluaImOWIqeWTgeWKoOaIkDMgKi9cclxuICAgIHB1YmxpYyBnZXRSb2d1ZUJ1ZmYzX1ZhbHVlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJvZ3VlQnVmZjNfVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDmiJjliKnlk4FJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFJvZ3VlQnVmZl9JRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDkwMDM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGV4Y2x1ZGVMaXN0IOaOkumZpOWIl+ihqO+8jOW9k2lk5a2Y5Zyo5pe277yM5LiN5Yqg5YWl5YiX6KGo5LitXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lj6/ku6Xlj4LkuI7pmo/mnLrnmoTliJfooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEJ1ZmZBcnIoZXhjbHVkZUxpc3Q6bnVtYmVyW10pOm51bWJlcltdW117XHJcbiAgICAgICAgbGV0IGJ1ZmZBcnI9W1tdLFtdLFtdXTtcclxuICAgICAgICAvL+aKiuebuOWQjOWTgei0qOeahOaUvuS4gOi1t1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChqc29uRGF0YTpKc29uUm9ndWVCdWZmKT0+e1xyXG4gICAgICAgICAgICBpZihleGNsdWRlTGlzdC5pbmRleE9mKGpzb25EYXRhLlJvZ3VlQnVmZl9JRCk9PS0xKXtcclxuICAgICAgICAgICAgICAgIGJ1ZmZBcnJbanNvbkRhdGEuUm9ndWVCdWZmX1F1YWxpdHktMV0ucHVzaChqc29uRGF0YS5Sb2d1ZUJ1ZmZfSUQpO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gYnVmZkFycjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QnVmZklkTGlzdCgpOm51bWJlcltde1xyXG4gICAgICAgIGxldCBidWZmTGlzdD1bXTtcclxuICAgICAgICAvL+aKiuebuOWQjOWTgei0qOeahOaUvuS4gOi1t1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChqc29uRGF0YTpKc29uUm9ndWVCdWZmKT0+e1xyXG4gICAgICAgICAgICBidWZmTGlzdC5wdXNoKGpzb25EYXRhLlJvZ3VlQnVmZl9JRCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gYnVmZkxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGF0YSgpOk1hcDxudW1iZXIsSnNvblJvZ3VlQnVmZj57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxufVxyXG4iXX0=