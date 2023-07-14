
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/ExclusiveEnhancement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a54c6RDoQJPzIdotKiOWNkL', 'ExclusiveEnhancement');
// Scripts/JsonData/ExclusiveEnhancement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveEnhancementManager = exports.JsonExclusiveEnhancement = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonExclusiveEnhancement = /** @class */ (function () {
    function JsonExclusiveEnhancement() {
        /**专武属性ID */
        this.ExclusiveWeapon = 0;
        /**英雄ID */
        this.HeroID = 0;
        /**总阶段 */
        this.SumStage = 0;
        /**星级 */
        this.Star = 0;
        /**当前阶段 */
        this.CurrentStage = 0;
        /**攻击力 */
        this.Attack = 0;
        /**生命值 */
        this.Health = 0;
        /**防御力 */
        this.Defense = 0;
        /**技能等级 */
        this.Stage = 0;
    }
    return JsonExclusiveEnhancement;
}());
exports.JsonExclusiveEnhancement = JsonExclusiveEnhancement;
var ExclusiveEnhancementManager = /** @class */ (function () {
    function ExclusiveEnhancementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    ExclusiveEnhancementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ExclusiveEnhancementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ExclusiveEnhancementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ExclusiveEnhancementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ExclusiveEnhancement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveEnhancement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonExclusiveEnhancement();
                jsonData = json[i];
                _this.data.set(jsonData.ExclusiveWeapon, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ExclusiveEnhancementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ExclusiveEnhancementManager.prototype.getJsonExclusiveEnhancement = function (id) {
        return this.data.get(id);
    };
    /**根据专武属性ID获取英雄ID */
    ExclusiveEnhancementManager.prototype.getHeroID = function (id) {
        return this.data.get(id).HeroID;
    };
    /**根据专武属性ID获取总阶段 */
    ExclusiveEnhancementManager.prototype.getSumStage = function (id) {
        return this.data.get(id).SumStage;
    };
    /**根据专武属性ID获取星级 */
    ExclusiveEnhancementManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据专武属性ID获取当前阶段 */
    ExclusiveEnhancementManager.prototype.getCurrentStage = function (id) {
        return this.data.get(id).CurrentStage;
    };
    /**根据专武属性ID获取攻击力 */
    ExclusiveEnhancementManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据专武属性ID获取生命值 */
    ExclusiveEnhancementManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据专武属性ID获取防御力 */
    ExclusiveEnhancementManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据专武属性ID获取技能等级 */
    ExclusiveEnhancementManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /** 静态方法，获取最大的 专武属性ID*/
    ExclusiveEnhancementManager.getMaxExclusiveWeapon = function () {
        return 4016;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    ExclusiveEnhancementManager.prototype.getJsonDataByHeroTypeAndStage = function (heroType, stage) {
        var info;
        this.data.forEach(function (v, k) {
            if (v.HeroID == heroType && v.SumStage == stage) {
                info = v;
            }
        });
        return info;
    };
    ExclusiveEnhancementManager.prototype.getId = function (heroId, stage) {
        return heroId * 1000 + stage;
    };
    ExclusiveEnhancementManager._instance = null;
    return ExclusiveEnhancementManager;
}());
exports.ExclusiveEnhancementManager = ExclusiveEnhancementManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEV4Y2x1c2l2ZUVuaGFuY2VtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHNEQUFxRDtBQUVyRDtJQUFBO1FBQ0ksWUFBWTtRQUNMLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLFVBQVU7UUFDSCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFNBQVM7UUFDRixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFFBQVE7UUFDRCxTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFVBQVU7UUFDSCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxTQUFTO1FBQ0YsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixTQUFTO1FBQ0YsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixTQUFTO1FBQ0YsWUFBTyxHQUFVLENBQUMsQ0FBRTtRQUMzQixVQUFVO1FBQ0gsVUFBSyxHQUFVLENBQUMsQ0FBRTtJQUM3QixDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBbkJZLDREQUF3QjtBQXFCckM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBc0MsSUFBSSxDQUFDO1FBQy9DLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQWdHNUMsQ0FBQztJQTlGaUIsdUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSwyQkFBMkIsRUFBRSxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCwwQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7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Q0ksT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHlCQUF5QjtJQUV6QixtRUFBNkIsR0FBN0IsVUFBOEIsUUFBa0IsRUFBQyxLQUFZO1FBQ3pELElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNsQixJQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksS0FBSyxFQUFDO2dCQUMzQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2FBQ1o7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwyQ0FBSyxHQUFMLFVBQU0sTUFBYSxFQUFDLEtBQVk7UUFDNUIsT0FBTyxNQUFNLEdBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBakdjLHFDQUFTLEdBQWdDLElBQUksQ0FBQztJQW1HakUsa0NBQUM7Q0FwR0QsQUFvR0MsSUFBQTtBQXBHWSxrRUFBMkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25FeGNsdXNpdmVFbmhhbmNlbWVudCB7XHJcbiAgICAvKirkuJPmrablsZ7mgKdJRCAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiLsembhElEICovXHJcbiAgICBwdWJsaWMgSGVyb0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oC76Zi25q61ICovXHJcbiAgICBwdWJsaWMgU3VtU3RhZ2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmJ/nuqcgKi9cclxuICAgIHB1YmxpYyBTdGFyOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5b2T5YmN6Zi25q61ICovXHJcbiAgICBwdWJsaWMgQ3VycmVudFN0YWdlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgQXR0YWNrOm51bWJlciA9IDAgO1xyXG4gICAgLyoq55Sf5ZG95YC8ICovXHJcbiAgICBwdWJsaWMgSGVhbHRoOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgRGVmZW5zZTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaKgOiDveetiee6pyAqL1xyXG4gICAgcHVibGljIFN0YWdlOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkV4Y2x1c2l2ZUVuaGFuY2VtZW50Pj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignRXhjbHVzaXZlRW5oYW5jZW1lbnQnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uRXhjbHVzaXZlRW5oYW5jZW1lbnTmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uRXhjbHVzaXZlRW5oYW5jZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkV4Y2x1c2l2ZVdlYXBvbixqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkV4Y2x1c2l2ZUVuaGFuY2VtZW50KGlkOm51bWJlcik6SnNvbkV4Y2x1c2l2ZUVuaGFuY2VtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuJPmrablsZ7mgKdJROiOt+WPluiLsembhElEICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4k+atpuWxnuaAp0lE6I635Y+W5oC76Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0U3VtU3RhZ2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3VtU3RhZ2U7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7kuJPmrablsZ7mgKdJROiOt+WPluaYn+e6pyAqL1xyXG4gICAgcHVibGljIGdldFN0YXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4k+atpuWxnuaAp0lE6I635Y+W5b2T5YmN6Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudFN0YWdlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkN1cnJlbnRTdGFnZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4k+atpuWxnuaAp0lE6I635Y+W5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgZ2V0QXR0YWNrKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkF0dGFjaztcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4k+atpuWxnuaAp0lE6I635Y+W55Sf5ZG95YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0SGVhbHRoKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlYWx0aDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruS4k+atpuWxnuaAp0lE6I635Y+W6Ziy5b6h5YqbICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmZW5zZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5EZWZlbnNlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5LiT5q2m5bGe5oCnSUTojrflj5bmioDog73nrYnnuqcgKi9cclxuICAgIHB1YmxpYyBnZXRTdGFnZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5TdGFnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOS4k+atpuWxnuaAp0lEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4RXhjbHVzaXZlV2VhcG9uKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNDAxNjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S7peS4iuagvOW8j+e7n+S4gO+8jOS7peS4i+WGmeavj+S4qmpzb27mlbDmja7nmoTnibnmrorpnIDmsYJcclxuXHJcbiAgICBnZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZShoZXJvVHlwZTpIZXJvX1R5cGUsc3RhZ2U6bnVtYmVyKTpKc29uRXhjbHVzaXZlRW5oYW5jZW1lbnR7XHJcbiAgICAgICAgbGV0IGluZm87XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYodi5IZXJvSUQgPT0gaGVyb1R5cGUgJiYgdi5TdW1TdGFnZSA9PSBzdGFnZSl7XHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGdldElkKGhlcm9JZDpudW1iZXIsc3RhZ2U6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIGhlcm9JZCoxMDAwK3N0YWdlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=