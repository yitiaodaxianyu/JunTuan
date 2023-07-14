
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/SpiritQualityAdvanced.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '30b65L9aNhF4LMwBvfPZuTG', 'SpiritQualityAdvanced');
// Scripts/Pet/Data/SpiritQualityAdvanced.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritQualityAdvancedManager = exports.JsonSpiritQualityAdvanced = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritQualityAdvanced = /** @class */ (function () {
    function JsonSpiritQualityAdvanced() {
        /**当前品质 */
        this.CurrentQuality = 0;
        /**目标品质 */
        this.TargetQuality = 0;
        /**消耗本体数量 */
        this.CostItselfNum = 0;
        /**消耗本体品质 */
        this.CostItselfQuality = 0;
        /**消耗同类型数量 */
        this.CostSameTypeNum = 0;
        /**消耗同类型品质 */
        this.CostSameTypeQuality = 0;
    }
    return JsonSpiritQualityAdvanced;
}());
exports.JsonSpiritQualityAdvanced = JsonSpiritQualityAdvanced;
var SpiritQualityAdvancedManager = /** @class */ (function () {
    function SpiritQualityAdvancedManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritQualityAdvancedManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritQualityAdvancedManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritQualityAdvancedManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritQualityAdvancedManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritQualityAdvanced', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritQualityAdvanced成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritQualityAdvanced();
                jsonData = json[i];
                _this.data.set(jsonData.CurrentQuality, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritQualityAdvancedManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritQualityAdvancedManager.prototype.getJsonSpiritQualityAdvanced = function (id) {
        return this.data.get(id);
    };
    /**根据当前品质获取目标品质 */
    SpiritQualityAdvancedManager.prototype.getTargetQuality = function (id) {
        return this.data.get(id).TargetQuality;
    };
    /**根据当前品质获取消耗本体数量 */
    SpiritQualityAdvancedManager.prototype.getCostItselfNum = function (id) {
        return this.data.get(id).CostItselfNum;
    };
    /**根据当前品质获取消耗本体品质 */
    SpiritQualityAdvancedManager.prototype.getCostItselfQuality = function (id) {
        return this.data.get(id).CostItselfQuality;
    };
    /**根据当前品质获取消耗同类型数量 */
    SpiritQualityAdvancedManager.prototype.getCostSameTypeNum = function (id) {
        return this.data.get(id).CostSameTypeNum;
    };
    /**根据当前品质获取消耗同类型品质 */
    SpiritQualityAdvancedManager.prototype.getCostSameTypeQuality = function (id) {
        return this.data.get(id).CostSameTypeQuality;
    };
    /** 静态方法，获取最大的 当前品质*/
    SpiritQualityAdvancedManager.getMaxCurrentQuality = function () {
        return 9;
    };
    SpiritQualityAdvancedManager._instance = null;
    return SpiritQualityAdvancedManager;
}());
exports.SpiritQualityAdvancedManager = SpiritQualityAdvancedManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTcGlyaXRRdWFsaXR5QWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBR3hEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsbUJBQWMsR0FBVSxDQUFDLENBQUU7UUFDbEMsVUFBVTtRQUNILGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFlBQVk7UUFDTCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxZQUFZO1FBQ0wsc0JBQWlCLEdBQVUsQ0FBQyxDQUFFO1FBQ3JDLGFBQWE7UUFDTixvQkFBZSxHQUFVLENBQUMsQ0FBRTtRQUNuQyxhQUFhO1FBQ04sd0JBQW1CLEdBQVUsQ0FBQyxDQUFFO0lBQzNDLENBQUM7SUFBRCxnQ0FBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksOERBQXlCO0FBZXRDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQXVDLElBQUksQ0FBQztRQUNoRCxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUFvRXhDLHlCQUF5QjtJQUc3QixDQUFDO0lBckVpQix3Q0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDRCQUE0QixFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDJDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsK0NBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNqRyxJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDN0MsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUkseUJBQXlCLEVBQUUsQ0FBQztnQkFDN0MsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUNuRDtZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLHlEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixtRUFBNEIsR0FBbkMsVUFBb0MsRUFBUztRQUN6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCx1REFBZ0IsR0FBdkIsVUFBd0IsRUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMzQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsdURBQWdCLEdBQXZCLFVBQXdCLEVBQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDJEQUFvQixHQUEzQixVQUE0QixFQUFTO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDL0MsQ0FBQztJQUNELHFCQUFxQjtJQUNkLHlEQUFrQixHQUF6QixVQUEwQixFQUFTO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO0lBQzdDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCw2REFBc0IsR0FBN0IsVUFBOEIsRUFBUztRQUNuQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0lBQ2pELENBQUM7SUFFRCxxQkFBcUI7SUFDUCxpREFBb0IsR0FBbEM7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFyRWMsc0NBQVMsR0FBaUMsSUFBSSxDQUFDO0lBMEVsRSxtQ0FBQztDQTNFRCxBQTJFQyxJQUFBO0FBM0VZLG9FQUE0QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblNwaXJpdFF1YWxpdHlBZHZhbmNlZCB7XHJcbiAgICAvKirlvZPliY3lk4HotKggKi9cclxuICAgIHB1YmxpYyBDdXJyZW50UXVhbGl0eTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuebruagh+WTgei0qCAqL1xyXG4gICAgcHVibGljIFRhcmdldFF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJfmnKzkvZPmlbDph48gKi9cclxuICAgIHB1YmxpYyBDb3N0SXRzZWxmTnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5raI6ICX5pys5L2T5ZOB6LSoICovXHJcbiAgICBwdWJsaWMgQ29zdEl0c2VsZlF1YWxpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJflkIznsbvlnovmlbDph48gKi9cclxuICAgIHB1YmxpYyBDb3N0U2FtZVR5cGVOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJflkIznsbvlnovlk4HotKggKi9cclxuICAgIHB1YmxpYyBDb3N0U2FtZVR5cGVRdWFsaXR5Om51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3Bpcml0UXVhbGl0eUFkdmFuY2VkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFNwaXJpdFF1YWxpdHlBZHZhbmNlZE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uU3Bpcml0UXVhbGl0eUFkdmFuY2VkPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpTcGlyaXRRdWFsaXR5QWR2YW5jZWRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgU3Bpcml0UXVhbGl0eUFkdmFuY2VkTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdTcGlyaXRRdWFsaXR5QWR2YW5jZWQnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uU3Bpcml0UXVhbGl0eUFkdmFuY2Vk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblNwaXJpdFF1YWxpdHlBZHZhbmNlZCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuQ3VycmVudFF1YWxpdHksanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TcGlyaXRRdWFsaXR5QWR2YW5jZWQoaWQ6bnVtYmVyKTpKc29uU3Bpcml0UXVhbGl0eUFkdmFuY2VkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lvZPliY3lk4HotKjojrflj5bnm67moIflk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRUYXJnZXRRdWFsaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRhcmdldFF1YWxpdHk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lvZPliY3lk4HotKjojrflj5bmtojogJfmnKzkvZPmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRDb3N0SXRzZWxmTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3RJdHNlbGZOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lvZPliY3lk4HotKjojrflj5bmtojogJfmnKzkvZPlk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRDb3N0SXRzZWxmUXVhbGl0eShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db3N0SXRzZWxmUXVhbGl0eTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruW9k+WJjeWTgei0qOiOt+WPlua2iOiAl+WQjOexu+Wei+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldENvc3RTYW1lVHlwZU51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db3N0U2FtZVR5cGVOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lvZPliY3lk4HotKjojrflj5bmtojogJflkIznsbvlnovlk4HotKggKi9cclxuICAgIHB1YmxpYyBnZXRDb3N0U2FtZVR5cGVRdWFsaXR5KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3RTYW1lVHlwZVF1YWxpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlvZPliY3lk4HotKgqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDdXJyZW50UXVhbGl0eSgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=