
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/DrawCardProbability.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8799bPjsBVHgYlNglhy6Hfq', 'DrawCardProbability');
// Scripts/Store/DrawCardProbability.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawCardProbabilityManager = exports.JsonDrawCardProbability = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonDrawCardProbability = /** @class */ (function () {
    function JsonDrawCardProbability() {
        /**概率行ID */
        this.ProbabilityID = 0;
        /**概率文本 */
        this.PropbabilityText = 0;
        /**概率参数 */
        this.PropbabilityNum = 0;
    }
    return JsonDrawCardProbability;
}());
exports.JsonDrawCardProbability = JsonDrawCardProbability;
var DrawCardProbabilityManager = /** @class */ (function () {
    function DrawCardProbabilityManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    DrawCardProbabilityManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DrawCardProbabilityManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DrawCardProbabilityManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DrawCardProbabilityManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DrawCardProbability', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardProbability成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDrawCardProbability();
                jsonData = json[i];
                _this.data.set(jsonData.ProbabilityID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DrawCardProbabilityManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DrawCardProbabilityManager.prototype.getJsonDrawCardProbability = function (id) {
        return this.data.get(id);
    };
    /**根据概率行ID获取概率文本 */
    DrawCardProbabilityManager.prototype.getPropbabilityText = function (id) {
        return this.data.get(id).PropbabilityText;
    };
    /**根据概率行ID获取概率参数 */
    DrawCardProbabilityManager.prototype.getPropbabilityNum = function (id) {
        return this.data.get(id).PropbabilityNum;
    };
    /** 静态方法，获取最大的 概率行ID*/
    DrawCardProbabilityManager.getMaxProbabilityID = function () {
        return 10;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    DrawCardProbabilityManager.prototype.getData = function () {
        var info = [];
        this.data.forEach(function (v, k) {
            info.push(v);
        });
        return info;
    };
    DrawCardProbabilityManager._instance = null;
    return DrawCardProbabilityManager;
}());
exports.DrawCardProbabilityManager = DrawCardProbabilityManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXERyYXdDYXJkUHJvYmFiaWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxXQUFXO1FBQ0osa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsVUFBVTtRQUNILHFCQUFnQixHQUFVLENBQUMsQ0FBRTtRQUNwQyxVQUFVO1FBQ0gsb0JBQWUsR0FBVSxDQUFDLENBQUU7SUFDdkMsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSwwREFBdUI7QUFTcEM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBcUMsSUFBSSxDQUFDO1FBQzlDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQWlFNUMsQ0FBQztJQS9EaUIsc0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCx5Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDZDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDL0YsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLHVCQUF1QixFQUFFLENBQUM7Z0JBQzNDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCx1REFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsK0RBQTBCLEdBQWpDLFVBQWtDLEVBQVM7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osd0RBQW1CLEdBQTFCLFVBQTJCLEVBQVM7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osdURBQWtCLEdBQXpCLFVBQTBCLEVBQVM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7SUFDN0MsQ0FBQztJQUVELHNCQUFzQjtJQUNSLDhDQUFtQixHQUFqQztRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELHlCQUF5QjtJQUV6Qiw0Q0FBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQW5FYyxvQ0FBUyxHQUErQixJQUFJLENBQUM7SUFvRWhFLGlDQUFDO0NBckVELEFBcUVDLElBQUE7QUFyRVksZ0VBQTBCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25EcmF3Q2FyZFByb2JhYmlsaXR5IHtcclxuICAgIC8qKuamgueOh+ihjElEICovXHJcbiAgICBwdWJsaWMgUHJvYmFiaWxpdHlJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuamgueOh+aWh+acrCAqL1xyXG4gICAgcHVibGljIFByb3BiYWJpbGl0eVRleHQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmpoLnjoflj4LmlbAgKi9cclxuICAgIHB1YmxpYyBQcm9wYmFiaWxpdHlOdW06bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEcmF3Q2FyZFByb2JhYmlsaXR5TWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERyYXdDYXJkUHJvYmFiaWxpdHlNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkRyYXdDYXJkUHJvYmFiaWxpdHk+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkRyYXdDYXJkUHJvYmFiaWxpdHlNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRHJhd0NhcmRQcm9iYWJpbGl0eU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignRHJhd0NhcmRQcm9iYWJpbGl0eScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25EcmF3Q2FyZFByb2JhYmlsaXR55oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkRyYXdDYXJkUHJvYmFiaWxpdHkoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlByb2JhYmlsaXR5SUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25EcmF3Q2FyZFByb2JhYmlsaXR5KGlkOm51bWJlcik6SnNvbkRyYXdDYXJkUHJvYmFiaWxpdHkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruamgueOh+ihjElE6I635Y+W5qaC546H5paH5pysICovXHJcbiAgICBwdWJsaWMgZ2V0UHJvcGJhYmlsaXR5VGV4dChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Qcm9wYmFiaWxpdHlUZXh0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5qaC546H6KGMSUTojrflj5bmpoLnjoflj4LmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRQcm9wYmFiaWxpdHlOdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUHJvcGJhYmlsaXR5TnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5qaC546H6KGMSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhQcm9iYWJpbGl0eUlEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0RGF0YSgpOkpzb25EcmF3Q2FyZFByb2JhYmlsaXR5W117XHJcbiAgICAgICAgbGV0IGluZm8gPSBbXTtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICBpbmZvLnB1c2godik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcbn1cclxuIl19