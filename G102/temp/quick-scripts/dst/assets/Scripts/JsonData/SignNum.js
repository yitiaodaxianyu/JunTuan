
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/SignNum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09135Ac4a9LsL+x1qHyk71Y', 'SignNum');
// Scripts/JsonData/SignNum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignNumManager = exports.JsonSignNum = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonSignNum = /** @class */ (function () {
    function JsonSignNum() {
        /**累计天数ID */
        this.DayNumID = 0;
        /**累计签到天数 */
        this.DayNum = 0;
        /**道具ID */
        this.Item = 0;
        /**数量 */
        this.Num = 0;
    }
    return JsonSignNum;
}());
exports.JsonSignNum = JsonSignNum;
var SignNumManager = /** @class */ (function () {
    function SignNumManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SignNumManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SignNumManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SignNumManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SignNumManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SignNum', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSignNum成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSignNum();
                jsonData = json[i];
                _this.data.set(jsonData.DayNumID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SignNumManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SignNumManager.prototype.getJsonSignNum = function (id) {
        return this.data.get(id);
    };
    /**根据累计天数ID获取累计签到天数 */
    SignNumManager.prototype.getDayNum = function (id) {
        return this.data.get(id).DayNum;
    };
    /**根据累计天数ID获取道具ID */
    SignNumManager.prototype.getItem = function (id) {
        return this.data.get(id).Item;
    };
    /**根据累计天数ID获取数量 */
    SignNumManager.prototype.getNum = function (id) {
        return this.data.get(id).Num;
    };
    /** 静态方法，获取最大的 累计天数ID*/
    SignNumManager.getMaxDayNumID = function () {
        return 605;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SignNumManager.prototype.getJsonData = function () {
        var info = [];
        this.data.forEach(function (v, k) {
            info.push(v);
        });
        return info;
    };
    SignNumManager._instance = null;
    return SignNumManager;
}());
exports.SignNumManager = SignNumManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXFNpZ25OdW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxZQUFZO1FBQ0wsYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixZQUFZO1FBQ0wsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixVQUFVO1FBQ0gsU0FBSSxHQUFVLENBQUMsQ0FBRTtRQUN4QixRQUFRO1FBQ0QsUUFBRyxHQUFVLENBQUMsQ0FBRTtJQUMzQixDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLGtDQUFXO0FBV3hCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQXlCLElBQUksQ0FBQztRQUNsQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUFxRTVDLENBQUM7SUFuRWlCLDBCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksY0FBYyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDZCQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsaUNBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDbkYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUMvQixRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsMkNBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHVDQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2Ysa0NBQVMsR0FBaEIsVUFBaUIsRUFBUztRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsZ0NBQU8sR0FBZCxVQUFlLEVBQVM7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLCtCQUFNLEdBQWIsVUFBYyxFQUFTO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx1QkFBdUI7SUFDVCw2QkFBYyxHQUE1QjtRQUNJLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELHlCQUF5QjtJQUN6QixvQ0FBVyxHQUFYO1FBQ0ksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXRFYyx3QkFBUyxHQUFtQixJQUFJLENBQUM7SUF3RXBELHFCQUFDO0NBekVELEFBeUVDLElBQUE7QUF6RVksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblNpZ25OdW0ge1xyXG4gICAgLyoq57Sv6K6h5aSp5pWwSUQgKi9cclxuICAgIHB1YmxpYyBEYXlOdW1JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKue0r+iuoeetvuWIsOWkqeaVsCAqL1xyXG4gICAgcHVibGljIERheU51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgSXRlbTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaVsOmHjyAqL1xyXG4gICAgcHVibGljIE51bTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25OdW1NYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU2lnbk51bU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uU2lnbk51bT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6U2lnbk51bU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBTaWduTnVtTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdTaWduTnVtJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblNpZ25OdW3miJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uU2lnbk51bSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuRGF5TnVtSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TaWduTnVtKGlkOm51bWJlcik6SnNvblNpZ25OdW0ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWkqeaVsElE6I635Y+W57Sv6K6h562+5Yiw5aSp5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0RGF5TnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkRheU51bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWkqeaVsElE6I635Y+W6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHlpKnmlbBJROiOt+WPluaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5OdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDntK/orqHlpKnmlbBJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heERheU51bUlEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNjA1O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG4gICAgZ2V0SnNvbkRhdGEoKTpKc29uU2lnbk51bVtde1xyXG4gICAgICAgIGxldCBpbmZvID0gW107XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaW5mby5wdXNoKHYpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==