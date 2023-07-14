
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/JsonData/ExclusiveWeaponMessage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a3f06E44xtE953cGxsRjlFJ', 'ExclusiveWeaponMessage');
// Scripts/JsonData/ExclusiveWeaponMessage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExclusiveWeaponMessageManager = exports.JsonExclusiveWeaponMessage = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonExclusiveWeaponMessage = /** @class */ (function () {
    function JsonExclusiveWeaponMessage() {
        /**英雄ID */
        this.HeroID = 0;
        /**专属武器名字文本 */
        this.ExclusiveWeaponNameID = 0;
        /**专武技能名称文本 */
        this.ExclusiveWeaponSkillID = 0;
        /**专属武器技能描述 */
        this.ExclusiveWeaponSkillDescription = 0;
        /**最大阶段 */
        this.MaxStage = 0;
    }
    return JsonExclusiveWeaponMessage;
}());
exports.JsonExclusiveWeaponMessage = JsonExclusiveWeaponMessage;
var ExclusiveWeaponMessageManager = /** @class */ (function () {
    function ExclusiveWeaponMessageManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    ExclusiveWeaponMessageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ExclusiveWeaponMessageManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ExclusiveWeaponMessageManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ExclusiveWeaponMessageManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ExclusiveWeaponMessage', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveWeaponMessage成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonExclusiveWeaponMessage();
                jsonData = json[i];
                _this.data.set(jsonData.HeroID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ExclusiveWeaponMessageManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ExclusiveWeaponMessageManager.prototype.getJsonExclusiveWeaponMessage = function (id) {
        return this.data.get(id);
    };
    /**根据英雄ID获取专属武器名字文本 */
    ExclusiveWeaponMessageManager.prototype.getExclusiveWeaponNameID = function (id) {
        return this.data.get(id).ExclusiveWeaponNameID;
    };
    /**根据英雄ID获取专武技能名称文本 */
    ExclusiveWeaponMessageManager.prototype.getExclusiveWeaponSkillID = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillID;
    };
    /**根据英雄ID获取专属武器技能描述 */
    ExclusiveWeaponMessageManager.prototype.getExclusiveWeaponSkillDescription = function (id) {
        return this.data.get(id).ExclusiveWeaponSkillDescription;
    };
    /**根据英雄ID获取最大阶段 */
    ExclusiveWeaponMessageManager.prototype.getMaxStage = function (id) {
        return this.data.get(id).MaxStage;
    };
    /** 静态方法，获取最大的 英雄ID*/
    ExclusiveWeaponMessageManager.getMaxHeroID = function () {
        return 12;
    };
    ExclusiveWeaponMessageManager._instance = null;
    return ExclusiveWeaponMessageManager;
}());
exports.ExclusiveWeaponMessageManager = ExclusiveWeaponMessageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSnNvbkRhdGFcXEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsV0FBTSxHQUFVLENBQUMsQ0FBRTtRQUMxQixjQUFjO1FBQ1AsMEJBQXFCLEdBQVUsQ0FBQyxDQUFFO1FBQ3pDLGNBQWM7UUFDUCwyQkFBc0IsR0FBVSxDQUFDLENBQUU7UUFDMUMsY0FBYztRQUNQLG9DQUErQixHQUFVLENBQUMsQ0FBRTtRQUNuRCxVQUFVO1FBQ0gsYUFBUSxHQUFVLENBQUMsQ0FBRTtJQUNoQyxDQUFDO0lBQUQsaUNBQUM7QUFBRCxDQVhBLEFBV0MsSUFBQTtBQVhZLGdFQUEwQjtBQWF2QztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUF3QyxJQUFJLENBQUM7UUFDakQsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBZ0V4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQWpFaUIseUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSw2QkFBNkIsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCw0Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLGdEQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDbEcsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQzlDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLDBCQUEwQixFQUFFLENBQUM7Z0JBQzlDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0M7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCwwREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YscUVBQTZCLEdBQXBDLFVBQXFDLEVBQVM7UUFDMUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsZ0VBQXdCLEdBQS9CLFVBQWdDLEVBQVM7UUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUNuRCxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsaUVBQXlCLEdBQWhDLFVBQWlDLEVBQVM7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztJQUNwRCxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsMEVBQWtDLEdBQXpDLFVBQTBDLEVBQVM7UUFDL0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQywrQkFBK0IsQ0FBQztJQUM3RCxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsbURBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBRUQscUJBQXFCO0lBQ1AsMENBQVksR0FBMUI7UUFDSSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFqRWMsdUNBQVMsR0FBa0MsSUFBSSxDQUFDO0lBc0VuRSxvQ0FBQztDQXZFRCxBQXVFQyxJQUFBO0FBdkVZLHNFQUE2QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uRXhjbHVzaXZlV2VhcG9uTWVzc2FnZSB7XHJcbiAgICAvKiroi7Hpm4RJRCAqL1xyXG4gICAgcHVibGljIEhlcm9JRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4k+WxnuatpuWZqOWQjeWtl+aWh+acrCAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvbk5hbWVJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuS4k+atpuaKgOiDveWQjeensOaWh+acrCAqL1xyXG4gICAgcHVibGljIEV4Y2x1c2l2ZVdlYXBvblNraWxsSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuJPlsZ7mrablmajmioDog73mj4/ov7AgKi9cclxuICAgIHB1YmxpYyBFeGNsdXNpdmVXZWFwb25Ta2lsbERlc2NyaXB0aW9uOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pyA5aSn6Zi25q61ICovXHJcbiAgICBwdWJsaWMgTWF4U3RhZ2U6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeGNsdXNpdmVXZWFwb25NZXNzYWdlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2U+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2VNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRXhjbHVzaXZlV2VhcG9uTWVzc2FnZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignRXhjbHVzaXZlV2VhcG9uTWVzc2FnZScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25FeGNsdXNpdmVXZWFwb25NZXNzYWdl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkhlcm9JRCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkV4Y2x1c2l2ZVdlYXBvbk1lc3NhZ2UoaWQ6bnVtYmVyKTpKc29uRXhjbHVzaXZlV2VhcG9uTWVzc2FnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bkuJPlsZ7mrablmajlkI3lrZfmlofmnKwgKi9cclxuICAgIHB1YmxpYyBnZXRFeGNsdXNpdmVXZWFwb25OYW1lSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRXhjbHVzaXZlV2VhcG9uTmFtZUlEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6Iux6ZuESUTojrflj5bkuJPmrabmioDog73lkI3np7DmlofmnKwgKi9cclxuICAgIHB1YmxpYyBnZXRFeGNsdXNpdmVXZWFwb25Ta2lsbElEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkV4Y2x1c2l2ZVdlYXBvblNraWxsSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oi7Hpm4RJROiOt+WPluS4k+WxnuatpuWZqOaKgOiDveaPj+i/sCAqL1xyXG4gICAgcHVibGljIGdldEV4Y2x1c2l2ZVdlYXBvblNraWxsRGVzY3JpcHRpb24oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRXhjbHVzaXZlV2VhcG9uU2tpbGxEZXNjcmlwdGlvbjtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiLsembhElE6I635Y+W5pyA5aSn6Zi25q61ICovXHJcbiAgICBwdWJsaWMgZ2V0TWF4U3RhZ2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuTWF4U3RhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDoi7Hpm4RJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heEhlcm9JRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDEyO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19