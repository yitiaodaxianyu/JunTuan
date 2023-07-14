
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/AwakenCultivation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e27d3eDGdNJ+5h/OV8BmFgM', 'AwakenCultivation');
// Scripts/Pet/Data/AwakenCultivation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwakenCultivationManager = exports.JsonAwakenCultivation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonAwakenCultivation = /** @class */ (function () {
    function JsonAwakenCultivation() {
        /**觉醒ID */
        this.AwenkenId = 0;
        /**灵宠稀有度 */
        this.SpiritRarity = 0;
        /**觉醒阶段 */
        this.AwakenStage = 0;
        /**本阶段星脉数量 */
        this.CurrentStarVeinsNum = 0;
        /**本阶段星脉 */
        this.CurrentStarVeins = [];
        /**连携技能等级 */
        this.FetterSkillLevel = 0;
    }
    return JsonAwakenCultivation;
}());
exports.JsonAwakenCultivation = JsonAwakenCultivation;
var AwakenCultivationManager = /** @class */ (function () {
    function AwakenCultivationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    AwakenCultivationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AwakenCultivationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    AwakenCultivationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    AwakenCultivationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('AwakenCultivation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonAwakenCultivation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonAwakenCultivation();
                jsonData = json[i];
                _this.data.set(jsonData.AwenkenId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    AwakenCultivationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    AwakenCultivationManager.prototype.getJsonAwakenCultivation = function (id) {
        return this.data.get(id);
    };
    /**根据觉醒ID获取灵宠稀有度 */
    AwakenCultivationManager.prototype.getSpiritRarity = function (id) {
        return this.data.get(id).SpiritRarity;
    };
    /**根据觉醒ID获取觉醒阶段 */
    AwakenCultivationManager.prototype.getAwakenStage = function (id) {
        return this.data.get(id).AwakenStage;
    };
    /**根据觉醒ID获取本阶段星脉数量 */
    AwakenCultivationManager.prototype.getCurrentStarVeinsNum = function (id) {
        return this.data.get(id).CurrentStarVeinsNum;
    };
    /**根据觉醒ID获取本阶段星脉 */
    AwakenCultivationManager.prototype.getCurrentStarVeins = function (id) {
        return this.data.get(id).CurrentStarVeins;
    };
    /**根据觉醒ID获取连携技能等级 */
    AwakenCultivationManager.prototype.getFetterSkillLevel = function (id) {
        return this.data.get(id).FetterSkillLevel;
    };
    /** 静态方法，获取最大的 觉醒ID*/
    AwakenCultivationManager.getMaxAwenkenId = function () {
        return 404;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得觉醒id
     * @param spiritRarity 灵宠稀有度
     * @param awakenStage 觉醒阶段
     * @returns id
     */
    AwakenCultivationManager.getId = function (spiritRarity, awakenStage) {
        return spiritRarity * 100 + awakenStage;
    };
    AwakenCultivationManager._instance = null;
    return AwakenCultivationManager;
}());
exports.AwakenCultivationManager = AwakenCultivationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxBd2FrZW5DdWx0aXZhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsYUFBYTtRQUNOLHdCQUFtQixHQUFVLENBQUMsQ0FBRTtRQUN2QyxXQUFXO1FBQ0oscUJBQWdCLEdBQVksRUFBRSxDQUFFO1FBQ3ZDLFlBQVk7UUFDTCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7SUFDeEMsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FiQSxBQWFDLElBQUE7QUFiWSxzREFBcUI7QUFlbEM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBbUMsSUFBSSxDQUFDO1FBQzVDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQThFNUMsQ0FBQztJQTVFaUIsb0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCx1Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDJDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDN0YsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3pDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxxREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsMkRBQXdCLEdBQS9CLFVBQWdDLEVBQVM7UUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osa0RBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsaURBQWMsR0FBckIsVUFBc0IsRUFBUztRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBQ0QscUJBQXFCO0lBQ2QseURBQXNCLEdBQTdCLFVBQThCLEVBQVM7UUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osc0RBQW1CLEdBQTFCLFVBQTJCLEVBQVM7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM5QyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2Isc0RBQW1CLEdBQTFCLFVBQTJCLEVBQVM7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM5QyxDQUFDO0lBRUQscUJBQXFCO0lBQ1Asd0NBQWUsR0FBN0I7UUFDSSxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCx5QkFBeUI7SUFDekI7Ozs7O09BS0c7SUFDVyw4QkFBSyxHQUFuQixVQUFvQixZQUFtQixFQUFDLFdBQWtCO1FBQ3RELE9BQU8sWUFBWSxHQUFDLEdBQUcsR0FBQyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQWhGYyxrQ0FBUyxHQUE2QixJQUFJLENBQUM7SUFpRjlELCtCQUFDO0NBbEZELEFBa0ZDLElBQUE7QUFsRlksNERBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uQXdha2VuQ3VsdGl2YXRpb24ge1xyXG4gICAgLyoq6KeJ6YaSSUQgKi9cclxuICAgIHB1YmxpYyBBd2Vua2VuSWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirngbXlrqDnqIDmnInluqYgKi9cclxuICAgIHB1YmxpYyBTcGlyaXRSYXJpdHk6bnVtYmVyID0gMCA7XHJcbiAgICAvKirop4nphpLpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBBd2FrZW5TdGFnZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuacrOmYtuauteaYn+iEieaVsOmHjyAqL1xyXG4gICAgcHVibGljIEN1cnJlbnRTdGFyVmVpbnNOdW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirmnKzpmLbmrrXmmJ/ohIkgKi9cclxuICAgIHB1YmxpYyBDdXJyZW50U3RhclZlaW5zOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6L+e5pC65oqA6IO9562J57qnICovXHJcbiAgICBwdWJsaWMgRmV0dGVyU2tpbGxMZXZlbDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEF3YWtlbkN1bHRpdmF0aW9uTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEF3YWtlbkN1bHRpdmF0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Bd2FrZW5DdWx0aXZhdGlvbj49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6QXdha2VuQ3VsdGl2YXRpb25NYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgQXdha2VuQ3VsdGl2YXRpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0F3YWtlbkN1bHRpdmF0aW9uJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkF3YWtlbkN1bHRpdmF0aW9u5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkF3YWtlbkN1bHRpdmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5Bd2Vua2VuSWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Bd2FrZW5DdWx0aXZhdGlvbihpZDpudW1iZXIpOkpzb25Bd2FrZW5DdWx0aXZhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KeJ6YaSSUTojrflj5bngbXlrqDnqIDmnInluqYgKi9cclxuICAgIHB1YmxpYyBnZXRTcGlyaXRSYXJpdHkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3Bpcml0UmFyaXR5O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KeJ6YaSSUTojrflj5bop4nphpLpmLbmrrUgKi9cclxuICAgIHB1YmxpYyBnZXRBd2FrZW5TdGFnZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Bd2FrZW5TdGFnZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiniemGkklE6I635Y+W5pys6Zi25q615pif6ISJ5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudFN0YXJWZWluc051bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DdXJyZW50U3RhclZlaW5zTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6KeJ6YaSSUTojrflj5bmnKzpmLbmrrXmmJ/ohIkgKi9cclxuICAgIHB1YmxpYyBnZXRDdXJyZW50U3RhclZlaW5zKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ3VycmVudFN0YXJWZWlucztcclxuICAgIH1cclxuICAgIC8qKuagueaNruiniemGkklE6I635Y+W6L+e5pC65oqA6IO9562J57qnICovXHJcbiAgICBwdWJsaWMgZ2V0RmV0dGVyU2tpbGxMZXZlbChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5GZXR0ZXJTa2lsbExldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg6KeJ6YaSSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhBd2Vua2VuSWQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA0MDQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcbiAgICAvKipcclxuICAgICAqIOiOt+W+l+iniemGkmlkXHJcbiAgICAgKiBAcGFyYW0gc3Bpcml0UmFyaXR5IOeBteWuoOeogOacieW6plxyXG4gICAgICogQHBhcmFtIGF3YWtlblN0YWdlIOiniemGkumYtuautVxyXG4gICAgICogQHJldHVybnMgaWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJZChzcGlyaXRSYXJpdHk6bnVtYmVyLGF3YWtlblN0YWdlOm51bWJlcik6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiBzcGlyaXRSYXJpdHkqMTAwK2F3YWtlblN0YWdlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==