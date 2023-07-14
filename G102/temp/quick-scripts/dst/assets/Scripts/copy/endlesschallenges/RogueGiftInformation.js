
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/RogueGiftInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dbc16YMQRlNZ7Sny29YbulM', 'RogueGiftInformation');
// Scripts/copy/endlesschallenges/RogueGiftInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueGiftInformationManager = exports.JsonRogueGiftInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueGiftInformation = /** @class */ (function () {
    function JsonRogueGiftInformation() {
        /**章节ID */
        this.ChapterLevel = 0;
        /**奖励1显示ID */
        this.PropID_1 = 0;
        /**奖励2显示ID */
        this.PropID_2 = 0;
        /**奖励3显示ID */
        this.PropID_3 = 0;
    }
    return JsonRogueGiftInformation;
}());
exports.JsonRogueGiftInformation = JsonRogueGiftInformation;
var RogueGiftInformationManager = /** @class */ (function () {
    function RogueGiftInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueGiftInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueGiftInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueGiftInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueGiftInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueGiftInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueGiftInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueGiftInformation();
                jsonData = json[i];
                _this.data.set(jsonData.ChapterLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueGiftInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueGiftInformationManager.prototype.getJsonRogueGiftInformation = function (id) {
        return this.data.get(id);
    };
    /**根据章节ID获取奖励1显示ID */
    RogueGiftInformationManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据章节ID获取奖励2显示ID */
    RogueGiftInformationManager.prototype.getPropID_2 = function (id) {
        return this.data.get(id).PropID_2;
    };
    /**根据章节ID获取奖励3显示ID */
    RogueGiftInformationManager.prototype.getPropID_3 = function (id) {
        return this.data.get(id).PropID_3;
    };
    /** 静态方法，获取最大的 章节ID*/
    RogueGiftInformationManager.getMaxChapterLevel = function () {
        return 8;
    };
    RogueGiftInformationManager._instance = null;
    return RogueGiftInformationManager;
}());
exports.RogueGiftInformationManager = RogueGiftInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXFJvZ3VlR2lmdEluZm9ybWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLGFBQWE7UUFDTixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLGFBQWE7UUFDTixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLGFBQWE7UUFDTixhQUFRLEdBQVUsQ0FBQyxDQUFFO0lBQ2hDLENBQUM7SUFBRCwrQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksNERBQXdCO0FBV3JDO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQXNDLElBQUksQ0FBQztRQUMvQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7UUE0RHhDLHlCQUF5QjtJQUc3QixDQUFDO0lBN0RpQix1Q0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLDJCQUEyQixFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDBDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsOENBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNoRyxJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDNUMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksd0JBQXdCLEVBQUUsQ0FBQztnQkFDNUMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBQyxRQUFRLENBQUMsQ0FBQzthQUNqRDtZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLHdEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixpRUFBMkIsR0FBbEMsVUFBbUMsRUFBUztRQUN4QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxpREFBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxpREFBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxxQkFBcUI7SUFDZCxpREFBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCw4Q0FBa0IsR0FBaEM7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUE3RGMscUNBQVMsR0FBZ0MsSUFBSSxDQUFDO0lBa0VqRSxrQ0FBQztDQW5FRCxBQW1FQyxJQUFBO0FBbkVZLGtFQUEyQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uUm9ndWVHaWZ0SW5mb3JtYXRpb24ge1xyXG4gICAgLyoq56ug6IqCSUQgKi9cclxuICAgIHB1YmxpYyBDaGFwdGVyTGV2ZWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirEx5pi+56S6SUQgKi9cclxuICAgIHB1YmxpYyBQcm9wSURfMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsTLmmL7npLpJRCAqL1xyXG4gICAgcHVibGljIFByb3BJRF8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5YqxM+aYvuekuklEICovXHJcbiAgICBwdWJsaWMgUHJvcElEXzM6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBSb2d1ZUdpZnRJbmZvcm1hdGlvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uUm9ndWVHaWZ0SW5mb3JtYXRpb24+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlJvZ3VlR2lmdEluZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFJvZ3VlR2lmdEluZm9ybWF0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdSb2d1ZUdpZnRJbmZvcm1hdGlvbicsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25Sb2d1ZUdpZnRJbmZvcm1hdGlvbuaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Sb2d1ZUdpZnRJbmZvcm1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuQ2hhcHRlckxldmVsLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUm9ndWVHaWZ0SW5mb3JtYXRpb24oaWQ6bnVtYmVyKTpKc29uUm9ndWVHaWZ0SW5mb3JtYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueroOiKgklE6I635Y+W5aWW5YqxMeaYvuekuklEICovXHJcbiAgICBwdWJsaWMgZ2V0UHJvcElEXzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJvcElEXzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7nq6DoioJJROiOt+WPluWlluWKsTLmmL7npLpJRCAqL1xyXG4gICAgcHVibGljIGdldFByb3BJRF8yKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlByb3BJRF8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u56ug6IqCSUTojrflj5blpZblirEz5pi+56S6SUQgKi9cclxuICAgIHB1YmxpYyBnZXRQcm9wSURfMyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9wSURfMztcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOeroOiKgklEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4Q2hhcHRlckxldmVsKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gODtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==