
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritRelease.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '13c49Sb/ctNua/rP21zSB5x', 'SpiritRelease');
// Scripts/Pet/Data/SpiritRelease.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritReleaseManager = exports.JsonSpiritRelease = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritRelease = /** @class */ (function () {
    function JsonSpiritRelease() {
        /**放生ID */
        this.ReleaseId = 0;
        /**稀有度 */
        this.SpiritRarity = 0;
        /**品质 */
        this.SpiritQuality = 0;
        /**获得道具 */
        this.GetItem = 0;
        /**获得数量 */
        this.GetNum = 0;
    }
    return JsonSpiritRelease;
}());
exports.JsonSpiritRelease = JsonSpiritRelease;
var SpiritReleaseManager = /** @class */ (function () {
    function SpiritReleaseManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritReleaseManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritReleaseManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritReleaseManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritReleaseManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritRelease', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritRelease成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritRelease();
                jsonData = json[i];
                _this.data.set(jsonData.ReleaseId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritReleaseManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritReleaseManager.prototype.getJsonSpiritRelease = function (id) {
        return this.data.get(id);
    };
    /**根据放生ID获取稀有度 */
    SpiritReleaseManager.prototype.getSpiritRarity = function (id) {
        return this.data.get(id).SpiritRarity;
    };
    /**根据放生ID获取品质 */
    SpiritReleaseManager.prototype.getSpiritQuality = function (id) {
        return this.data.get(id).SpiritQuality;
    };
    /**根据放生ID获取获得道具 */
    SpiritReleaseManager.prototype.getGetItem = function (id) {
        return this.data.get(id).GetItem;
    };
    /**根据放生ID获取获得数量 */
    SpiritReleaseManager.prototype.getGetNum = function (id) {
        return this.data.get(id).GetNum;
    };
    /** 静态方法，获取最大的 放生ID*/
    SpiritReleaseManager.getMaxReleaseId = function () {
        return 415;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritReleaseManager.prototype.getDataByQualityAndRarity = function (quality, rarity) {
        var jsonData;
        this.data.forEach(function (v, k) {
            if (v.SpiritQuality == quality && v.SpiritRarity == rarity) {
                jsonData = v;
            }
        });
        return jsonData;
    };
    SpiritReleaseManager._instance = null;
    return SpiritReleaseManager;
}());
exports.SpiritReleaseManager = SpiritReleaseManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRSZWxlYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsU0FBUztRQUNGLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFFBQVE7UUFDRCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixVQUFVO1FBQ0gsV0FBTSxHQUFVLENBQUMsQ0FBRTtJQUM5QixDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLDhDQUFpQjtBQWE5QjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUErQixJQUFJLENBQUM7UUFDeEMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBMkU1QyxDQUFDO0lBekVpQixnQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELG1DQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsdUNBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDekYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3JDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxpREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsbURBQW9CLEdBQTNCLFVBQTRCLEVBQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsOENBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0QsZ0JBQWdCO0lBQ1QsK0NBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUNELGtCQUFrQjtJQUNYLHlDQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLHdDQUFTLEdBQWhCLFVBQWlCLEVBQVM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLG9DQUFlLEdBQTdCO1FBQ0ksT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQseUJBQXlCO0lBRWxCLHdEQUF5QixHQUFoQyxVQUFpQyxPQUFjLEVBQUMsTUFBYTtRQUN6RCxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDbEIsSUFBRyxDQUFDLENBQUMsYUFBYSxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsWUFBWSxJQUFJLE1BQU0sRUFBQztnQkFDdEQsUUFBUSxHQUFHLENBQUMsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQTdFYyw4QkFBUyxHQUF5QixJQUFJLENBQUM7SUE4RTFELDJCQUFDO0NBL0VELEFBK0VDLElBQUE7QUEvRVksb0RBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uU3Bpcml0UmVsZWFzZSB7XHJcbiAgICAvKirmlL7nlJ9JRCAqL1xyXG4gICAgcHVibGljIFJlbGVhc2VJZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKueogOacieW6piAqL1xyXG4gICAgcHVibGljIFNwaXJpdFJhcml0eTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWTgei0qCAqL1xyXG4gICAgcHVibGljIFNwaXJpdFF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirojrflvpfpgZPlhbcgKi9cclxuICAgIHB1YmxpYyBHZXRJdGVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6I635b6X5pWw6YePICovXHJcbiAgICBwdWJsaWMgR2V0TnVtOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3Bpcml0UmVsZWFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTcGlyaXRSZWxlYXNlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25TcGlyaXRSZWxlYXNlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTcGlyaXRSZWxlYXNlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFNwaXJpdFJlbGVhc2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ1NwaXJpdFJlbGVhc2UnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU3Bpcml0UmVsZWFzZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25TcGlyaXRSZWxlYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5SZWxlYXNlSWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TcGlyaXRSZWxlYXNlKGlkOm51bWJlcik6SnNvblNwaXJpdFJlbGVhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaUvueUn0lE6I635Y+W56iA5pyJ5bqmICovXHJcbiAgICBwdWJsaWMgZ2V0U3Bpcml0UmFyaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdFJhcml0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaUvueUn0lE6I635Y+W5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgZ2V0U3Bpcml0UXVhbGl0eShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5TcGlyaXRRdWFsaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5pS+55SfSUTojrflj5bojrflvpfpgZPlhbcgKi9cclxuICAgIHB1YmxpYyBnZXRHZXRJdGVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldEl0ZW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mlL7nlJ9JROiOt+WPluiOt+W+l+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldEdldE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXROdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDmlL7nlJ9JRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFJlbGVhc2VJZCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDQxNTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBwdWJsaWMgZ2V0RGF0YUJ5UXVhbGl0eUFuZFJhcml0eShxdWFsaXR5Om51bWJlcixyYXJpdHk6bnVtYmVyKXtcclxuICAgICAgICBsZXQganNvbkRhdGE7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsaykgPT4ge1xyXG4gICAgICAgICAgICBpZih2LlNwaXJpdFF1YWxpdHkgPT0gcXVhbGl0eSAmJiB2LlNwaXJpdFJhcml0eSA9PSByYXJpdHkpe1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGEgPSB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbkRhdGE7XHJcbiAgICB9XHJcbn1cclxuIl19