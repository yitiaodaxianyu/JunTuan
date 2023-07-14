
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/HeroQuality.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4eff3yAdfdBXavuuXD3KAMt', 'HeroQuality');
// Scripts/Hero/Data/HeroQuality.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroQualityManager = exports.JsonHeroQuality = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonHeroQuality = /** @class */ (function () {
    function JsonHeroQuality() {
        /**星级养成ID */
        this.StarCultivateID = 0;
        /**英雄品质 */
        this.Quality = 0;
        /**阶段 */
        this.Stage = 0;
        /**星级 */
        this.Star = 0;
        /**当前阶段 */
        this.CurrentStage = 0;
        /**消耗碎片数量 */
        this.CostFragment = 0;
    }
    return JsonHeroQuality;
}());
exports.JsonHeroQuality = JsonHeroQuality;
var HeroQualityManager = /** @class */ (function () {
    function HeroQualityManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    HeroQualityManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new HeroQualityManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    HeroQualityManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    HeroQualityManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('HeroQuality', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonHeroQuality成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonHeroQuality();
                jsonData = json[i];
                _this.data.set(jsonData.StarCultivateID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    HeroQualityManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    HeroQualityManager.prototype.getJsonHeroQuality = function (id) {
        return this.data.get(id);
    };
    /**根据星级养成ID获取英雄品质 */
    HeroQualityManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据星级养成ID获取阶段 */
    HeroQualityManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据星级养成ID获取星级 */
    HeroQualityManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据星级养成ID获取当前阶段 */
    HeroQualityManager.prototype.getCurrentStage = function (id) {
        return this.data.get(id).CurrentStage;
    };
    /**根据星级养成ID获取消耗碎片数量 */
    HeroQualityManager.prototype.getCostFragment = function (id) {
        return this.data.get(id).CostFragment;
    };
    /** 静态方法，获取最大的 星级养成ID*/
    HeroQualityManager.getMaxStarCultivateID = function () {
        return 6029;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**通过英雄类型和英雄阶段获取英雄升星的消耗道具数量 */
    HeroQualityManager.prototype.getCostDebrisByHeroQualityAndStage = function (heroQuality, heroStage) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (v.Quality == heroQuality && v.Stage == heroStage) {
                info = v;
            }
        });
        if (info == null)
            return 0;
        return info.CostFragment;
    };
    HeroQualityManager._instance = null;
    return HeroQualityManager;
}());
exports.HeroQualityManager = HeroQualityManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcSGVyb1F1YWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBRXhEO0lBQUE7UUFDSSxZQUFZO1FBQ0wsb0JBQWUsR0FBVSxDQUFDLENBQUU7UUFDbkMsVUFBVTtRQUNILFlBQU8sR0FBVSxDQUFDLENBQUU7UUFDM0IsUUFBUTtRQUNELFVBQUssR0FBVSxDQUFDLENBQUU7UUFDekIsUUFBUTtRQUNELFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtJQUNwQyxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQWJZLDBDQUFlO0FBZTVCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTZCLElBQUksQ0FBQztRQUN0QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUFrRjVDLENBQUM7SUFoRmlCLDhCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsaUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxxQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtB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Iiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkhlcm9RdWFsaXR5IHtcclxuICAgIC8qKuaYn+e6p+WFu+aIkElEICovXHJcbiAgICBwdWJsaWMgU3RhckN1bHRpdmF0ZUlEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Iux6ZuE5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgUXVhbGl0eTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumYtuautSAqL1xyXG4gICAgcHVibGljIFN0YWdlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pif57qnICovXHJcbiAgICBwdWJsaWMgU3RhcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuW9k+WJjemYtuautSAqL1xyXG4gICAgcHVibGljIEN1cnJlbnRTdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKua2iOiAl+eijueJh+aVsOmHjyAqL1xyXG4gICAgcHVibGljIENvc3RGcmFnbWVudDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhlcm9RdWFsaXR5TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEhlcm9RdWFsaXR5TWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25IZXJvUXVhbGl0eT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6SGVyb1F1YWxpdHlNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgSGVyb1F1YWxpdHlNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0hlcm9RdWFsaXR5JyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkhlcm9RdWFsaXR55oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkhlcm9RdWFsaXR5KCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5TdGFyQ3VsdGl2YXRlSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25IZXJvUXVhbGl0eShpZDpudW1iZXIpOkpzb25IZXJvUXVhbGl0eSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5pif57qn5YW75oiQSUTojrflj5boi7Hpm4Tlk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRRdWFsaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlF1YWxpdHk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mmJ/nuqflhbvmiJBJROiOt+WPlumYtuautSAqL1xyXG4gICAgcHVibGljIGdldFN0YWdlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlN0YWdlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5pif57qn5YW75oiQSUTojrflj5bmmJ/nuqcgKi9cclxuICAgIHB1YmxpYyBnZXRTdGFyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlN0YXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mmJ/nuqflhbvmiJBJROiOt+WPluW9k+WJjemYtuautSAqL1xyXG4gICAgcHVibGljIGdldEN1cnJlbnRTdGFnZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DdXJyZW50U3RhZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mmJ/nuqflhbvmiJBJROiOt+WPlua2iOiAl+eijueJh+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldENvc3RGcmFnbWVudChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db3N0RnJhZ21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDmmJ/nuqflhbvmiJBJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFN0YXJDdWx0aXZhdGVJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDYwMjk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgICAgIC8qKumAmui/h+iLsembhOexu+Wei+WSjOiLsembhOmYtuauteiOt+WPluiLsembhOWNh+aYn+eahOa2iOiAl+mBk+WFt+aVsOmHjyAqL1xyXG4gICAgICAgIGdldENvc3REZWJyaXNCeUhlcm9RdWFsaXR5QW5kU3RhZ2UoaGVyb1F1YWxpdHk6bnVtYmVyLGhlcm9TdGFnZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAgICAgbGV0IGluZm86SnNvbkhlcm9RdWFsaXR5ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgICAgICBpZih2LlF1YWxpdHkgPT0gaGVyb1F1YWxpdHkgJiYgdi5TdGFnZSA9PSBoZXJvU3RhZ2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoaW5mbyA9PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uQ29zdEZyYWdtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbn1cclxuIl19