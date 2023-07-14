
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/SignIn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a2dcc9UBpJAubiz9vZ72sFm', 'SignIn');
// Scripts/JsonData/SignIn.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInManager = exports.SignInType = exports.JsonSignIn = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonSignIn = /** @class */ (function () {
    function JsonSignIn() {
        /**天数ID */
        this.DayID = 0;
        /**天数 */
        this.Day = 0;
        /**类型 */
        this.Daytype = 0;
        /**道具ID */
        this.Item = 0;
        /**数量 */
        this.Num = 0;
    }
    return JsonSignIn;
}());
exports.JsonSignIn = JsonSignIn;
var SignInType;
(function (SignInType) {
    SignInType[SignInType["SavenDay"] = 1] = "SavenDay";
    SignInType[SignInType["Daily29"] = 29] = "Daily29";
    SignInType[SignInType["Daily30"] = 30] = "Daily30";
    SignInType[SignInType["Daily31"] = 31] = "Daily31";
    SignInType[SignInType["Daily28"] = 28] = "Daily28";
})(SignInType = exports.SignInType || (exports.SignInType = {}));
var SignInManager = /** @class */ (function () {
    function SignInManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SignInManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SignInManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SignInManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SignInManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SignIn', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSignIn成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSignIn();
                jsonData = json[i];
                _this.data.set(jsonData.DayID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SignInManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SignInManager.prototype.getJsonSignIn = function (id) {
        return this.data.get(id);
    };
    /**根据天数ID获取天数 */
    SignInManager.prototype.getDay = function (id) {
        return this.data.get(id).Day;
    };
    /**根据天数ID获取类型 */
    SignInManager.prototype.getDaytype = function (id) {
        return this.data.get(id).Daytype;
    };
    /**根据天数ID获取道具ID */
    SignInManager.prototype.getItem = function (id) {
        return this.data.get(id).Item;
    };
    /**根据天数ID获取数量 */
    SignInManager.prototype.getNum = function (id) {
        return this.data.get(id).Num;
    };
    /** 静态方法，获取最大的 天数ID*/
    SignInManager.getMaxDayID = function () {
        return 528;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SignInManager.prototype.getDataBySignInType = function (type) {
        var dataList = [];
        this.data.forEach(function (v, k) {
            if (v.Daytype == type) {
                dataList.push(v);
            }
        });
        return dataList;
    };
    SignInManager._instance = null;
    return SignInManager;
}());
exports.SignInManager = SignInManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXFNpZ25Jbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFFckQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxVQUFLLEdBQVUsQ0FBQyxDQUFFO1FBQ3pCLFFBQVE7UUFDRCxRQUFHLEdBQVUsQ0FBQyxDQUFFO1FBQ3ZCLFFBQVE7UUFDRCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFFBQVE7UUFDRCxRQUFHLEdBQVUsQ0FBQyxDQUFFO0lBQzNCLENBQUM7SUFBRCxpQkFBQztBQUFELENBWEEsQUFXQyxJQUFBO0FBWFksZ0NBQVU7QUFhdkIsSUFBWSxVQU1YO0FBTkQsV0FBWSxVQUFVO0lBQ2xCLG1EQUFZLENBQUE7SUFDWixrREFBWSxDQUFBO0lBQ1osa0RBQVksQ0FBQTtJQUNaLGtEQUFZLENBQUE7SUFDWixrREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFOVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQU1yQjtBQUVEO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQXdCLElBQUksQ0FBQztRQUNqQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUE0RTVDLENBQUM7SUExRWlCLHlCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksYUFBYSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDRCQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsZ0NBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDbEYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO2dCQUM5QixRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFDO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsMENBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHFDQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QsOEJBQU0sR0FBYixVQUFjLEVBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakMsQ0FBQztJQUNELGdCQUFnQjtJQUNULGtDQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLCtCQUFPLEdBQWQsVUFBZSxFQUFTO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFDRCxnQkFBZ0I7SUFDVCw4QkFBTSxHQUFiLFVBQWMsRUFBUztRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNqQyxDQUFDO0lBRUQscUJBQXFCO0lBQ1AseUJBQVcsR0FBekI7UUFDSSxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCx5QkFBeUI7SUFFekIsMkNBQW1CLEdBQW5CLFVBQW9CLElBQWU7UUFDL0IsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbEIsSUFBRyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksRUFBQztnQkFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQTdFYyx1QkFBUyxHQUFrQixJQUFJLENBQUM7SUErRW5ELG9CQUFDO0NBaEZELEFBZ0ZDLElBQUE7QUFoRlksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblNpZ25JbiB7XHJcbiAgICAvKirlpKnmlbBJRCAqL1xyXG4gICAgcHVibGljIERheUlEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aSp5pWwICovXHJcbiAgICBwdWJsaWMgRGF5Om51bWJlciA9IDAgO1xyXG4gICAgLyoq57G75Z6LICovXHJcbiAgICBwdWJsaWMgRGF5dHlwZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgSXRlbTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaVsOmHjyAqL1xyXG4gICAgcHVibGljIE51bTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU2lnbkluVHlwZXtcclxuICAgIFNhdmVuRGF5ID0gMSxcclxuICAgIERhaWx5MjkgPSAyOSxcclxuICAgIERhaWx5MzAgPSAzMCxcclxuICAgIERhaWx5MzEgPSAzMSxcclxuICAgIERhaWx5MjggPSAyOCxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25Jbk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTaWduSW5NYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblNpZ25Jbj49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6U2lnbkluTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFNpZ25Jbk1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignU2lnbkluJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblNpZ25JbuaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25TaWduSW4oKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkRheUlELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uU2lnbkluKGlkOm51bWJlcik6SnNvblNpZ25JbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aSp5pWwSUTojrflj5blpKnmlbAgKi9cclxuICAgIHB1YmxpYyBnZXREYXkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGF5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aSp5pWwSUTojrflj5bnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXREYXl0eXBlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkRheXR5cGU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpKnmlbBJROiOt+WPlumBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aSp5pWwSUTojrflj5bmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5aSp5pWwSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhEYXlJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDUyODtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBnZXREYXRhQnlTaWduSW5UeXBlKHR5cGU6U2lnbkluVHlwZSk6SnNvblNpZ25Jbltde1xyXG4gICAgICAgIGxldCBkYXRhTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspID0+e1xyXG4gICAgICAgICAgICBpZih2LkRheXR5cGUgPT0gdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBkYXRhTGlzdC5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFMaXN0O1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=