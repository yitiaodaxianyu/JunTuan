
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/HeroTitle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '63c56t90mxElL6v+2t5o5JU', 'HeroTitle');
// Scripts/Hero/Data/HeroTitle.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroTitleManager = exports.JsonHeroTitle = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonHeroTitle = /** @class */ (function () {
    function JsonHeroTitle() {
        /**英雄称号id */
        this.HeroTitleID = 0;
        /**英雄id */
        this.HeroID = 0;
        /**英雄星级 */
        this.HeroStar = 0;
        /**英雄称号文本 */
        this.HeroTitleText = 0;
    }
    return JsonHeroTitle;
}());
exports.JsonHeroTitle = JsonHeroTitle;
var HeroTitleManager = /** @class */ (function () {
    function HeroTitleManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    HeroTitleManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroTitleManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroTitleManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    HeroTitleManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('HeroTitle', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonHeroTitle成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonHeroTitle();
                jsonData = json[i];
                _this.data.set(jsonData.HeroTitleID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    HeroTitleManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    HeroTitleManager.prototype.getJsonHeroTitle = function (id) {
        return this.data.get(id);
    };
    /**根据英雄称号id获取英雄id */
    HeroTitleManager.prototype.getHeroID = function (id) {
        return this.data.get(id).HeroID;
    };
    /**根据英雄称号id获取英雄星级 */
    HeroTitleManager.prototype.getHeroStar = function (id) {
        return this.data.get(id).HeroStar;
    };
    /**根据英雄称号id获取英雄称号文本 */
    HeroTitleManager.prototype.getHeroTitleText = function (id) {
        return this.data.get(id).HeroTitleText;
    };
    /** 静态方法，获取最大的 英雄称号id*/
    HeroTitleManager.getMaxHeroTitleID = function () {
        return 12005;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    HeroTitleManager.prototype.getHeroTitleTextIdByHeroTypeAndHeroStar = function (heroType, star) {
        var data;
        this.data.forEach(function (v, k) {
            if (v.HeroID == heroType && v.HeroStar == star)
                data = v;
        });
        return data.HeroTitleText;
    };
    HeroTitleManager._instance = null;
    return HeroTitleManager;
}());
exports.HeroTitleManager = HeroTitleManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb1RpdGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksWUFBWTtRQUNMLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFVBQVU7UUFDSCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFVBQVU7UUFDSCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFlBQVk7UUFDTCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtJQUNyQyxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLHNDQUFhO0FBVzFCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTJCLElBQUksQ0FBQztRQUNwQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUFzRTVDLENBQUM7SUFwRWlCLDRCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsK0JBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxtQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNyRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEQ7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCw2Q0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsMkNBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2Isb0NBQVMsR0FBaEIsVUFBaUIsRUFBUztRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2Isc0NBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsMkNBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUVELHVCQUF1QjtJQUNULGtDQUFpQixHQUEvQjtRQUNJLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCx5QkFBeUI7SUFFekIsa0VBQXVDLEdBQXZDLFVBQXdDLFFBQWUsRUFBQyxJQUFXO1FBQy9ELElBQUksSUFBa0IsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJO2dCQUMxQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUF4RWMsMEJBQVMsR0FBcUIsSUFBSSxDQUFDO0lBeUV0RCx1QkFBQztDQTFFRCxBQTBFQyxJQUFBO0FBMUVZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uSGVyb1RpdGxlIHtcclxuICAgIC8qKuiLsembhOensOWPt2lkICovXHJcbiAgICBwdWJsaWMgSGVyb1RpdGxlSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKiroi7Hpm4RpZCAqL1xyXG4gICAgcHVibGljIEhlcm9JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiLsembhOaYn+e6pyAqL1xyXG4gICAgcHVibGljIEhlcm9TdGFyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Iux6ZuE56ew5Y+35paH5pysICovXHJcbiAgICBwdWJsaWMgSGVyb1RpdGxlVGV4dDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlcm9UaXRsZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBIZXJvVGl0bGVNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkhlcm9UaXRsZT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6SGVyb1RpdGxlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEhlcm9UaXRsZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignSGVyb1RpdGxlJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkhlcm9UaXRsZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25IZXJvVGl0bGUoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkhlcm9UaXRsZUlELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uSGVyb1RpdGxlKGlkOm51bWJlcik6SnNvbkhlcm9UaXRsZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuE56ew5Y+3aWTojrflj5boi7Hpm4RpZCAqL1xyXG4gICAgcHVibGljIGdldEhlcm9JRChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5IZXJvSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4Tnp7Dlj7dpZOiOt+WPluiLsembhOaYn+e6pyAqL1xyXG4gICAgcHVibGljIGdldEhlcm9TdGFyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9TdGFyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuE56ew5Y+3aWTojrflj5boi7Hpm4Tnp7Dlj7fmlofmnKwgKi9cclxuICAgIHB1YmxpYyBnZXRIZXJvVGl0bGVUZXh0KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9UaXRsZVRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDoi7Hpm4Tnp7Dlj7dpZCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEhlcm9UaXRsZUlEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTIwMDU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0SGVyb1RpdGxlVGV4dElkQnlIZXJvVHlwZUFuZEhlcm9TdGFyKGhlcm9UeXBlOm51bWJlcixzdGFyOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIGxldCBkYXRhOkpzb25IZXJvVGl0bGU7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsIGspID0+IHtcclxuICAgICAgICAgICAgaWYgKHYuSGVyb0lEID09IGhlcm9UeXBlICYmIHYuSGVyb1N0YXIgPT0gc3RhcilcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB2XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEuSGVyb1RpdGxlVGV4dDtcclxuICAgIH1cclxufVxyXG4iXX0=