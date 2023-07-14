
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/voidcrack/RogueLevel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '818adHLZe9AWIbcD/1WUABK', 'RogueLevel');
// Scripts/copy/voidcrack/RogueLevel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueLevelManager = exports.JsonRogueLevel = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueLevel = /** @class */ (function () {
    function JsonRogueLevel() {
        /**关卡ID */
        this.Level = 0;
        /**怪物组配置 */
        this.MonsterGroupConfigure = [];
        /**最大波次 */
        this.MaxWave = 0;
        /**怪潮波次 */
        this.MonsterTideWave = [];
        /**每波时间间隔 */
        this.TimeInterval = [];
        /**怪物等级 */
        this.MonsterLevel = [];
        /**血量系数 */
        this.HpCoefficient = [];
    }
    return JsonRogueLevel;
}());
exports.JsonRogueLevel = JsonRogueLevel;
var RogueLevelManager = /** @class */ (function () {
    function RogueLevelManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueLevelManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueLevelManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueLevelManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueLevelManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueLevel', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueLevel成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueLevel();
                jsonData = json[i];
                _this.data.set(jsonData.Level, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueLevelManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueLevelManager.prototype.getJsonRogueLevel = function (id) {
        return this.data.get(id);
    };
    /**根据关卡ID获取怪物组配置 */
    RogueLevelManager.prototype.getMonsterGroupConfigure = function (id) {
        return this.data.get(id).MonsterGroupConfigure;
    };
    /**根据关卡ID获取最大波次 */
    RogueLevelManager.prototype.getMaxWave = function (id) {
        return this.data.get(id).MaxWave;
    };
    /**根据关卡ID获取怪潮波次 */
    RogueLevelManager.prototype.getMonsterTideWave = function (id) {
        return this.data.get(id).MonsterTideWave;
    };
    /**根据关卡ID获取每波时间间隔 */
    RogueLevelManager.prototype.getTimeInterval = function (id) {
        return this.data.get(id).TimeInterval;
    };
    /**根据关卡ID获取怪物等级 */
    RogueLevelManager.prototype.getMonsterLevel = function (id) {
        return this.data.get(id).MonsterLevel;
    };
    /**根据关卡ID获取血量系数 */
    RogueLevelManager.prototype.getHpCoefficient = function (id) {
        return this.data.get(id).HpCoefficient;
    };
    /** 静态方法，获取最大的 关卡ID*/
    RogueLevelManager.getMaxLevel = function () {
        return 80092;
    };
    RogueLevelManager._instance = null;
    return RogueLevelManager;
}());
exports.RogueLevelManager = RogueLevelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcdm9pZGNyYWNrXFxSb2d1ZUxldmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUV4RDtJQUFBO1FBQ0ksVUFBVTtRQUNILFVBQUssR0FBVSxDQUFDLENBQUU7UUFDekIsV0FBVztRQUNKLDBCQUFxQixHQUFZLEVBQUUsQ0FBRTtRQUM1QyxVQUFVO1FBQ0gsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixVQUFVO1FBQ0gsb0JBQWUsR0FBWSxFQUFFLENBQUU7UUFDdEMsWUFBWTtRQUNMLGlCQUFZLEdBQVksRUFBRSxDQUFFO1FBQ25DLFVBQVU7UUFDSCxpQkFBWSxHQUFZLEVBQUUsQ0FBRTtRQUNuQyxVQUFVO1FBQ0gsa0JBQWEsR0FBWSxFQUFFLENBQUU7SUFDeEMsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSx3Q0FBYztBQWlCM0I7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBNEIsSUFBSSxDQUFDO1FBQ3JDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQXdFeEMseUJBQXlCO0lBRzdCLENBQUM7SUF6RWlCLDZCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsZ0NBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSxvQ0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUN0RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ2xDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDMUM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCw4Q0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsNkNBQWlCLEdBQXhCLFVBQXlCLEVBQVM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osb0RBQXdCLEdBQS9CLFVBQWdDLEVBQVM7UUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUNuRCxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsc0NBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsOENBQWtCLEdBQXpCLFVBQTBCLEVBQVM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7SUFDN0MsQ0FBQztJQUNELG9CQUFvQjtJQUNiLDJDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDJDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDMUMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLDRDQUFnQixHQUF2QixVQUF3QixFQUFTO1FBQzdCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCw2QkFBVyxHQUF6QjtRQUNJLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUF6RWMsMkJBQVMsR0FBc0IsSUFBSSxDQUFDO0lBOEV2RCx3QkFBQztDQS9FRCxBQStFQyxJQUFBO0FBL0VZLDhDQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uUm9ndWVMZXZlbCB7XHJcbiAgICAvKirlhbPljaFJRCAqL1xyXG4gICAgcHVibGljIExldmVsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq54mp57uE6YWN572uICovXHJcbiAgICBwdWJsaWMgTW9uc3Rlckdyb3VwQ29uZmlndXJlOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5pyA5aSn5rOi5qyhICovXHJcbiAgICBwdWJsaWMgTWF4V2F2ZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaAqua9ruazouasoSAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJUaWRlV2F2ZTpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuavj+azouaXtumXtOmXtOmalCAqL1xyXG4gICAgcHVibGljIFRpbWVJbnRlcnZhbDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuaAqueJqeetiee6pyAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXJMZXZlbDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuihgOmHj+ezu+aVsCAqL1xyXG4gICAgcHVibGljIEhwQ29lZmZpY2llbnQ6bnVtYmVyW10gPSBbXSA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSb2d1ZUxldmVsTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFJvZ3VlTGV2ZWxNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblJvZ3VlTGV2ZWw+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlJvZ3VlTGV2ZWxNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgUm9ndWVMZXZlbE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignUm9ndWVMZXZlbCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25Sb2d1ZUxldmVs5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvblJvZ3VlTGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkxldmVsLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uUm9ndWVMZXZlbChpZDpudW1iZXIpOkpzb25Sb2d1ZUxldmVsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaFJROiOt+WPluaAqueJqee7hOmFjee9riAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJHcm91cENvbmZpZ3VyZShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJHcm91cENvbmZpZ3VyZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoUlE6I635Y+W5pyA5aSn5rOi5qyhICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4V2F2ZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5NYXhXYXZlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2hSUTojrflj5bmgKrmva7ms6LmrKEgKi9cclxuICAgIHB1YmxpYyBnZXRNb25zdGVyVGlkZVdhdmUoaWQ6bnVtYmVyKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Nb25zdGVyVGlkZVdhdmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lhbPljaFJROiOt+WPluavj+azouaXtumXtOmXtOmalCAqL1xyXG4gICAgcHVibGljIGdldFRpbWVJbnRlcnZhbChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRpbWVJbnRlcnZhbDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWFs+WNoUlE6I635Y+W5oCq54mp562J57qnICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3RlckxldmVsKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTW9uc3RlckxldmVsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5YWz5Y2hSUTojrflj5booYDph4/ns7vmlbAgKi9cclxuICAgIHB1YmxpYyBnZXRIcENvZWZmaWNpZW50KGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSHBDb2VmZmljaWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOWFs+WNoUlEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TGV2ZWwoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA4MDA5MjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcblxyXG59XHJcbiJdfQ==