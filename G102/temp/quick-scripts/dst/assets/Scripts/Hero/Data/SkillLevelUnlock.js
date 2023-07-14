
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/SkillLevelUnlock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9c9cQ4RWFMbKL3034zXKl+', 'SkillLevelUnlock');
// Scripts/Hero/Data/SkillLevelUnlock.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillLevelUnlockManager = exports.JsonSkillLevelUnlock = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSkillLevelUnlock = /** @class */ (function () {
    function JsonSkillLevelUnlock() {
        /**技能槽位 */
        this.SkillPosition = 0;
        /**英雄等级 */
        this.HeroLevel = 0;
    }
    return JsonSkillLevelUnlock;
}());
exports.JsonSkillLevelUnlock = JsonSkillLevelUnlock;
var SkillLevelUnlockManager = /** @class */ (function () {
    function SkillLevelUnlockManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SkillLevelUnlockManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SkillLevelUnlockManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SkillLevelUnlockManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SkillLevelUnlockManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SkillLevelUnlock', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSkillLevelUnlock成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSkillLevelUnlock();
                jsonData = json[i];
                _this.data.set(jsonData.SkillPosition, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SkillLevelUnlockManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SkillLevelUnlockManager.prototype.getJsonSkillLevelUnlock = function (id) {
        return this.data.get(id);
    };
    /**根据技能槽位获取英雄等级 */
    SkillLevelUnlockManager.prototype.getHeroLevel = function (id) {
        return this.data.get(id).HeroLevel;
    };
    /** 静态方法，获取最大的 技能槽位*/
    SkillLevelUnlockManager.getMaxSkillPosition = function () {
        return 4;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SkillLevelUnlockManager.getId = function (skillSlot, heroSkillLevel) {
        return skillSlot * 100 + heroSkillLevel;
    };
    SkillLevelUnlockManager._instance = null;
    return SkillLevelUnlockManager;
}());
exports.SkillLevelUnlockManager = SkillLevelUnlockManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcU2tpbGxMZXZlbFVubG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxrQkFBYSxHQUFVLENBQUMsQ0FBRTtRQUNqQyxVQUFVO1FBQ0gsY0FBUyxHQUFVLENBQUMsQ0FBRTtJQUNqQyxDQUFDO0lBQUQsMkJBQUM7QUFBRCxDQUxBLEFBS0MsSUFBQTtBQUxZLG9EQUFvQjtBQU9qQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFrQyxJQUFJLENBQUM7UUFDM0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBMkQ1QyxDQUFDO0lBekRpQixtQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELHNDQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0EsMENBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUM1RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDeEMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQztnQkFDeEMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsQ0FBQzthQUNsRDtZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLG9EQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZix5REFBdUIsR0FBOUIsVUFBK0IsRUFBUztRQUNwQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCw4Q0FBWSxHQUFuQixVQUFvQixFQUFTO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCwyQ0FBbUIsR0FBakM7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCx5QkFBeUI7SUFJbEIsNkJBQUssR0FBWixVQUFhLFNBQWlCLEVBQUUsY0FBc0I7UUFDbEQsT0FBTyxTQUFTLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQztJQUM1QyxDQUFDO0lBN0RjLGlDQUFTLEdBQTRCLElBQUksQ0FBQztJQThEN0QsOEJBQUM7Q0EvREQsQUErREMsSUFBQTtBQS9EWSwwREFBdUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblNraWxsTGV2ZWxVbmxvY2sge1xyXG4gICAgLyoq5oqA6IO95qe95L2NICovXHJcbiAgICBwdWJsaWMgU2tpbGxQb3NpdGlvbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiLsembhOetiee6pyAqL1xyXG4gICAgcHVibGljIEhlcm9MZXZlbDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogU2tpbGxMZXZlbFVubG9ja01hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uU2tpbGxMZXZlbFVubG9jaz49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6U2tpbGxMZXZlbFVubG9ja01hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBTa2lsbExldmVsVW5sb2NrTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdTa2lsbExldmVsVW5sb2NrJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblNraWxsTGV2ZWxVbmxvY2vmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uU2tpbGxMZXZlbFVubG9jaygpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuU2tpbGxQb3NpdGlvbixqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvblNraWxsTGV2ZWxVbmxvY2soaWQ6bnVtYmVyKTpKc29uU2tpbGxMZXZlbFVubG9jayB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oqA6IO95qe95L2N6I635Y+W6Iux6ZuE562J57qnICovXHJcbiAgICBwdWJsaWMgZ2V0SGVyb0xldmVsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlcm9MZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOaKgOiDveanveS9jSovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFNraWxsUG9zaXRpb24oKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgXHJcblxyXG4gICAgc3RhdGljIGdldElkKHNraWxsU2xvdDogbnVtYmVyLCBoZXJvU2tpbGxMZXZlbDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gc2tpbGxTbG90ICogMTAwICsgaGVyb1NraWxsTGV2ZWw7XHJcbiAgICB9XHJcbn1cclxuIl19