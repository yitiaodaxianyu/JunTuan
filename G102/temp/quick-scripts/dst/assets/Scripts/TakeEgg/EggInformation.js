
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/TakeEgg/EggInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '66e90Doc5ROXbkscccBbe/5', 'EggInformation');
// Scripts/TakeEgg/EggInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EggInformationManager = exports.JsonEggInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonEggInformation = /** @class */ (function () {
    function JsonEggInformation() {
        /**开蛋池ID */
        this.EggsID = 0;
        /**开蛋池类型 */
        this.EggsType = 0;
        /**获得奖池集ID */
        this.EggsReward = 0;
        /**单抽道具1ID */
        this.EggPropID_1 = 0;
        /**单抽道具1消耗 */
        this.EggPropNum_1 = 0;
        /**十连抽道具消耗 */
        this.TenEggProp_1 = 0;
        /**单抽道具2id */
        this.EggPropID_2 = 0;
        /**单抽道具2数量 */
        this.EggPropNum_2 = 0;
        /**十连抽道具消耗 */
        this.TenEggProp_2 = 0;
    }
    return JsonEggInformation;
}());
exports.JsonEggInformation = JsonEggInformation;
var EggInformationManager = /** @class */ (function () {
    function EggInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    EggInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EggInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EggInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EggInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EggInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEggInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEggInformation();
                jsonData = json[i];
                _this.data.set(jsonData.EggsID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EggInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EggInformationManager.prototype.getJsonEggInformation = function (id) {
        return this.data.get(id);
    };
    /**根据开蛋池ID获取开蛋池类型 */
    EggInformationManager.prototype.getEggsType = function (id) {
        return this.data.get(id).EggsType;
    };
    /**根据开蛋池ID获取获得奖池集ID */
    EggInformationManager.prototype.getEggsReward = function (id) {
        return this.data.get(id).EggsReward;
    };
    /**根据开蛋池ID获取单抽道具1ID */
    EggInformationManager.prototype.getEggPropID_1 = function (id) {
        return this.data.get(id).EggPropID_1;
    };
    /**根据开蛋池ID获取单抽道具1消耗 */
    EggInformationManager.prototype.getEggPropNum_1 = function (id) {
        return this.data.get(id).EggPropNum_1;
    };
    /**根据开蛋池ID获取十连抽道具消耗 */
    EggInformationManager.prototype.getTenEggProp_1 = function (id) {
        return this.data.get(id).TenEggProp_1;
    };
    /**根据开蛋池ID获取单抽道具2id */
    EggInformationManager.prototype.getEggPropID_2 = function (id) {
        return this.data.get(id).EggPropID_2;
    };
    /**根据开蛋池ID获取单抽道具2数量 */
    EggInformationManager.prototype.getEggPropNum_2 = function (id) {
        return this.data.get(id).EggPropNum_2;
    };
    /**根据开蛋池ID获取十连抽道具消耗 */
    EggInformationManager.prototype.getTenEggProp_2 = function (id) {
        return this.data.get(id).TenEggProp_2;
    };
    /** 静态方法，获取最大的 开蛋池ID*/
    EggInformationManager.getMaxEggsID = function () {
        return 20001;
    };
    EggInformationManager._instance = null;
    return EggInformationManager;
}());
exports.EggInformationManager = EggInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVGFrZUVnZ1xcRWdnSW5mb3JtYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBR3JEO0lBQUE7UUFDSSxXQUFXO1FBQ0osV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixXQUFXO1FBQ0osYUFBUSxHQUFVLENBQUMsQ0FBRTtRQUM1QixhQUFhO1FBQ04sZUFBVSxHQUFVLENBQUMsQ0FBRTtRQUM5QixhQUFhO1FBQ04sZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsYUFBYTtRQUNOLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLGFBQWE7UUFDTixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxhQUFhO1FBQ04sZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsYUFBYTtRQUNOLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLGFBQWE7UUFDTixpQkFBWSxHQUFVLENBQUMsQ0FBRTtJQUNwQyxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLGdEQUFrQjtBQXFCL0I7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBZ0MsSUFBSSxDQUFDO1FBQ3pDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQWdGeEMseUJBQXlCO0lBRzdCLENBQUM7SUFqRmlCLGlDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUkscUJBQXFCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0Qsb0NBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSx3Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQzFGLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN0QyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO2dCQUN0QyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNDO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsa0RBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHFEQUFxQixHQUE1QixVQUE2QixFQUFTO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDJDQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLDZDQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLDhDQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLDhDQUFjLEdBQXJCLFVBQXNCLEVBQVM7UUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUVELHNCQUFzQjtJQUNSLGtDQUFZLEdBQTFCO1FBQ0ksT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQWpGYywrQkFBUyxHQUEwQixJQUFJLENBQUM7SUFzRjNELDRCQUFDO0NBdkZELEFBdUZDLElBQUE7QUF2Rlksc0RBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uRWdnSW5mb3JtYXRpb24ge1xyXG4gICAgLyoq5byA6JuL5rGgSUQgKi9cclxuICAgIHB1YmxpYyBFZ2dzSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlvIDom4vmsaDnsbvlnosgKi9cclxuICAgIHB1YmxpYyBFZ2dzVHlwZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiOt+W+l+WlluaxoOmbhklEICovXHJcbiAgICBwdWJsaWMgRWdnc1Jld2FyZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWNleaKvemBk+WFtzFJRCAqL1xyXG4gICAgcHVibGljIEVnZ1Byb3BJRF8xOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2V5oq96YGT5YW3Mea2iOiAlyAqL1xyXG4gICAgcHVibGljIEVnZ1Byb3BOdW1fMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWNgei/nuaKvemBk+WFt+a2iOiAlyAqL1xyXG4gICAgcHVibGljIFRlbkVnZ1Byb3BfMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWNleaKvemBk+WFtzJpZCAqL1xyXG4gICAgcHVibGljIEVnZ1Byb3BJRF8yOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Y2V5oq96YGT5YW3MuaVsOmHjyAqL1xyXG4gICAgcHVibGljIEVnZ1Byb3BOdW1fMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWNgei/nuaKvemBk+WFt+a2iOiAlyAqL1xyXG4gICAgcHVibGljIFRlbkVnZ1Byb3BfMjpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVnZ0luZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEVnZ0luZm9ybWF0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25FZ2dJbmZvcm1hdGlvbj49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6RWdnSW5mb3JtYXRpb25NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRWdnSW5mb3JtYXRpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0VnZ0luZm9ybWF0aW9uJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkVnZ0luZm9ybWF0aW9u5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkVnZ0luZm9ybWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5FZ2dzSUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25FZ2dJbmZvcm1hdGlvbihpZDpudW1iZXIpOkpzb25FZ2dJbmZvcm1hdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5byA6JuL5rGgSUTojrflj5blvIDom4vmsaDnsbvlnosgKi9cclxuICAgIHB1YmxpYyBnZXRFZ2dzVHlwZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FZ2dzVHlwZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruW8gOibi+axoElE6I635Y+W6I635b6X5aWW5rGg6ZuGSUQgKi9cclxuICAgIHB1YmxpYyBnZXRFZ2dzUmV3YXJkKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkVnZ3NSZXdhcmQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lvIDom4vmsaBJROiOt+WPluWNleaKvemBk+WFtzFJRCAqL1xyXG4gICAgcHVibGljIGdldEVnZ1Byb3BJRF8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkVnZ1Byb3BJRF8xO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5byA6JuL5rGgSUTojrflj5bljZXmir3pgZPlhbcx5raI6ICXICovXHJcbiAgICBwdWJsaWMgZ2V0RWdnUHJvcE51bV8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkVnZ1Byb3BOdW1fMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruW8gOibi+axoElE6I635Y+W5Y2B6L+e5oq96YGT5YW35raI6ICXICovXHJcbiAgICBwdWJsaWMgZ2V0VGVuRWdnUHJvcF8xKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRlbkVnZ1Byb3BfMTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruW8gOibi+axoElE6I635Y+W5Y2V5oq96YGT5YW3MmlkICovXHJcbiAgICBwdWJsaWMgZ2V0RWdnUHJvcElEXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRWdnUHJvcElEXzI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lvIDom4vmsaBJROiOt+WPluWNleaKvemBk+WFtzLmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRFZ2dQcm9wTnVtXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRWdnUHJvcE51bV8yO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5byA6JuL5rGgSUTojrflj5bljYHov57mir3pgZPlhbfmtojogJcgKi9cclxuICAgIHB1YmxpYyBnZXRUZW5FZ2dQcm9wXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGVuRWdnUHJvcF8yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5byA6JuL5rGgSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhFZ2dzSUQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAyMDAwMTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==