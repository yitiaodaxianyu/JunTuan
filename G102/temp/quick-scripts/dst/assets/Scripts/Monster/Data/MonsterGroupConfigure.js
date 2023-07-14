
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterGroupConfigure.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '233f1dHOxpBRpx3SUgMFz+u', 'MonsterGroupConfigure');
// Scripts/Monster/Data/MonsterGroupConfigure.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterGroupConfigureManager = exports.JsonMonsterGroupConfigure = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterGroupConfigure = /** @class */ (function () {
    function JsonMonsterGroupConfigure() {
        /**怪物组ID */
        this.MonsterGroup = 0;
        /**怪物ID */
        this.MonsterId = [];
        /**怪物数量 */
        this.MonsterNum = [];
        /**刷新间隔 */
        this.RefreshInterval = [];
    }
    return JsonMonsterGroupConfigure;
}());
exports.JsonMonsterGroupConfigure = JsonMonsterGroupConfigure;
var MonsterGroupConfigureManager = /** @class */ (function () {
    function MonsterGroupConfigureManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterGroupConfigureManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterGroupConfigureManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterGroupConfigureManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterGroupConfigureManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterGroupConfigure', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterGroupConfigure成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterGroupConfigure();
                jsonData = json[i];
                _this.data.set(jsonData.MonsterGroup, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterGroupConfigureManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterGroupConfigureManager.prototype.getJsonMonsterGroupConfigure = function (id) {
        return this.data.get(id);
    };
    /**根据怪物组ID获取怪物ID */
    MonsterGroupConfigureManager.prototype.getMonsterId = function (id) {
        return this.data.get(id).MonsterId;
    };
    /**根据怪物组ID获取怪物数量 */
    MonsterGroupConfigureManager.prototype.getMonsterNum = function (id) {
        return this.data.get(id).MonsterNum;
    };
    /**根据怪物组ID获取刷新间隔 */
    MonsterGroupConfigureManager.prototype.getRefreshInterval = function (id) {
        return this.data.get(id).RefreshInterval;
    };
    /** 静态方法，获取最大的 怪物组ID*/
    MonsterGroupConfigureManager.getMaxMonsterGroup = function () {
        return 20;
    };
    MonsterGroupConfigureManager._instance = null;
    return MonsterGroupConfigureManager;
}());
exports.MonsterGroupConfigureManager = MonsterGroupConfigureManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3Rlckdyb3VwQ29uZmlndXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUF3RDtBQUd4RDtJQUFBO1FBQ0ksV0FBVztRQUNKLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFVBQVU7UUFDSCxjQUFTLEdBQVksRUFBRSxDQUFFO1FBQ2hDLFVBQVU7UUFDSCxlQUFVLEdBQVksRUFBRSxDQUFFO1FBQ2pDLFVBQVU7UUFDSCxvQkFBZSxHQUFZLEVBQUUsQ0FBRTtJQUMxQyxDQUFDO0lBQUQsZ0NBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLDhEQUF5QjtBQVd0QztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUF1QyxJQUFJLENBQUM7UUFDaEQsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBNER4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQTdEaUIsd0NBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCwyQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLCtDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDakcsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzdDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLHlCQUF5QixFQUFFLENBQUM7Z0JBQzdDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQ7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCx5REFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsbUVBQTRCLEdBQW5DLFVBQW9DLEVBQVM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osbURBQVksR0FBbkIsVUFBb0IsRUFBUztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1osb0RBQWEsR0FBcEIsVUFBcUIsRUFBUztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsbUJBQW1CO0lBQ1oseURBQWtCLEdBQXpCLFVBQTBCLEVBQVM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUM7SUFDN0MsQ0FBQztJQUVELHNCQUFzQjtJQUNSLCtDQUFrQixHQUFoQztRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQTdEYyxzQ0FBUyxHQUFpQyxJQUFJLENBQUM7SUFrRWxFLG1DQUFDO0NBbkVELEFBbUVDLElBQUE7QUFuRVksb0VBQTRCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uTW9uc3Rlckdyb3VwQ29uZmlndXJlIHtcclxuICAgIC8qKuaAqueJqee7hElEICovXHJcbiAgICBwdWJsaWMgTW9uc3Rlckdyb3VwOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oCq54mpSUQgKi9cclxuICAgIHB1YmxpYyBNb25zdGVySWQ6bnVtYmVyW10gPSBbXSA7XHJcbiAgICAvKirmgKrnianmlbDph48gKi9cclxuICAgIHB1YmxpYyBNb25zdGVyTnVtOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq5Yi35paw6Ze06ZqUICovXHJcbiAgICBwdWJsaWMgUmVmcmVzaEludGVydmFsOm51bWJlcltdID0gW10gO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9uc3Rlckdyb3VwQ29uZmlndXJlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1vbnN0ZXJHcm91cENvbmZpZ3VyZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uTW9uc3Rlckdyb3VwQ29uZmlndXJlPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpNb25zdGVyR3JvdXBDb25maWd1cmVNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTW9uc3Rlckdyb3VwQ29uZmlndXJlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdNb25zdGVyR3JvdXBDb25maWd1cmUnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uTW9uc3Rlckdyb3VwQ29uZmlndXJl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbk1vbnN0ZXJHcm91cENvbmZpZ3VyZSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuTW9uc3Rlckdyb3VwLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTW9uc3Rlckdyb3VwQ29uZmlndXJlKGlkOm51bWJlcik6SnNvbk1vbnN0ZXJHcm91cENvbmZpZ3VyZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mp57uESUTojrflj5bmgKrnialJRCAqL1xyXG4gICAgcHVibGljIGdldE1vbnN0ZXJJZChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJJZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqee7hElE6I635Y+W5oCq54mp5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0TW9uc3Rlck51bShpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1vbnN0ZXJOdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrniannu4RJROiOt+WPluWIt+aWsOmXtOmalCAqL1xyXG4gICAgcHVibGljIGdldFJlZnJlc2hJbnRlcnZhbChpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJlZnJlc2hJbnRlcnZhbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOaAqueJqee7hElEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4TW9uc3Rlckdyb3VwKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMjA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=