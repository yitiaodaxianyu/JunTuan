
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterFeature.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d9e7QbyRhI547IUme7H0bn', 'MonsterFeature');
// Scripts/Monster/Data/MonsterFeature.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterFeatureManager = exports.JsonMonsterFeature = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterFeature = /** @class */ (function () {
    function JsonMonsterFeature() {
        /**特性编号 */
        this.FeatureNumber = 0;
        /**作用对象 */
        this.Objective = 0;
        /**怪物特性描述文本ID */
        this.FeatureDiscribe_TextID = 0;
        /**数目(只) */
        this.Number = 0;
        /**血量 */
        this.HP = 0;
        /**持续时间(秒) */
        this.Time = 0;
        /**增加速度 */
        this.SpeedUp = 0;
        /**范围 */
        this.Range = 0;
        /**加血(秒) */
        this.Recovery = 0;
    }
    return JsonMonsterFeature;
}());
exports.JsonMonsterFeature = JsonMonsterFeature;
var MonsterFeatureManager = /** @class */ (function () {
    function MonsterFeatureManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterFeatureManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterFeatureManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterFeatureManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterFeatureManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterFeature', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterFeature成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterFeature();
                jsonData = json[i];
                _this.data.set(jsonData.FeatureNumber, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterFeatureManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterFeatureManager.prototype.getJsonMonsterFeature = function (id) {
        return this.data.get(id);
    };
    /**根据特性编号获取作用对象 */
    MonsterFeatureManager.prototype.getObjective = function (id) {
        return this.data.get(id).Objective;
    };
    /**根据特性编号获取怪物特性描述文本ID */
    MonsterFeatureManager.prototype.getFeatureDiscribe_TextID = function (id) {
        return this.data.get(id).FeatureDiscribe_TextID;
    };
    /**根据特性编号获取数目(只) */
    MonsterFeatureManager.prototype.getNumber = function (id) {
        return this.data.get(id).Number;
    };
    /**根据特性编号获取血量 */
    MonsterFeatureManager.prototype.getHP = function (id) {
        return this.data.get(id).HP;
    };
    /**根据特性编号获取持续时间(秒) */
    MonsterFeatureManager.prototype.getTime = function (id) {
        return this.data.get(id).Time;
    };
    /**根据特性编号获取增加速度 */
    MonsterFeatureManager.prototype.getSpeedUp = function (id) {
        return this.data.get(id).SpeedUp;
    };
    /**根据特性编号获取范围 */
    MonsterFeatureManager.prototype.getRange = function (id) {
        return this.data.get(id).Range;
    };
    /**根据特性编号获取加血(秒) */
    MonsterFeatureManager.prototype.getRecovery = function (id) {
        return this.data.get(id).Recovery;
    };
    /** 静态方法，获取最大的 特性编号*/
    MonsterFeatureManager.getMaxFeatureNumber = function () {
        return 17;
    };
    MonsterFeatureManager._instance = null;
    return MonsterFeatureManager;
}());
exports.MonsterFeatureManager = MonsterFeatureManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3RlckZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBR3hEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsVUFBVTtRQUNILGNBQVMsR0FBVSxDQUFDLENBQUU7UUFDN0IsZ0JBQWdCO1FBQ1QsMkJBQXNCLEdBQVUsQ0FBQyxDQUFFO1FBQzFDLFdBQVc7UUFDSixXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFFBQVE7UUFDRCxPQUFFLEdBQVUsQ0FBQyxDQUFFO1FBQ3RCLGFBQWE7UUFDTixTQUFJLEdBQVUsQ0FBQyxDQUFFO1FBQ3hCLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFFBQVE7UUFDRCxVQUFLLEdBQVUsQ0FBQyxDQUFFO1FBQ3pCLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO0lBQ2hDLENBQUM7SUFBRCx5QkFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFuQlksZ0RBQWtCO0FBcUIvQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFnQyxJQUFJLENBQUM7UUFDekMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBZ0Z4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQWpGaUIsaUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxvQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMs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UCx5Q0FBbUIsR0FBakM7UUFDSSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFqRmMsK0JBQVMsR0FBMEIsSUFBSSxDQUFDO0lBc0YzRCw0QkFBQztDQXZGRCxBQXVGQyxJQUFBO0FBdkZZLHNEQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbk1vbnN0ZXJGZWF0dXJlIHtcclxuICAgIC8qKueJueaAp+e8luWPtyAqL1xyXG4gICAgcHVibGljIEZlYXR1cmVOdW1iZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkvZznlKjlr7nosaEgKi9cclxuICAgIHB1YmxpYyBPYmplY3RpdmU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmgKrniannibnmgKfmj4/ov7DmlofmnKxJRCAqL1xyXG4gICAgcHVibGljIEZlYXR1cmVEaXNjcmliZV9UZXh0SUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmlbDnm64o5Y+qKSAqL1xyXG4gICAgcHVibGljIE51bWJlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuihgOmHjyAqL1xyXG4gICAgcHVibGljIEhQOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5oyB57ut5pe26Ze0KOenkikgKi9cclxuICAgIHB1YmxpYyBUaW1lOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aKe5Yqg6YCf5bqmICovXHJcbiAgICBwdWJsaWMgU3BlZWRVcDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuiMg+WbtCAqL1xyXG4gICAgcHVibGljIFJhbmdlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5Yqg6KGAKOenkikgKi9cclxuICAgIHB1YmxpYyBSZWNvdmVyeTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vbnN0ZXJGZWF0dXJlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1vbnN0ZXJGZWF0dXJlTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Nb25zdGVyRmVhdHVyZT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TW9uc3RlckZlYXR1cmVNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTW9uc3RlckZlYXR1cmVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ01vbnN0ZXJGZWF0dXJlJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbk1vbnN0ZXJGZWF0dXJl5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbk1vbnN0ZXJGZWF0dXJlKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5GZWF0dXJlTnVtYmVyLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uTW9uc3RlckZlYXR1cmUoaWQ6bnVtYmVyKTpKc29uTW9uc3RlckZlYXR1cmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueJueaAp+e8luWPt+iOt+WPluS9nOeUqOWvueixoSAqL1xyXG4gICAgcHVibGljIGdldE9iamVjdGl2ZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5PYmplY3RpdmU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7nibnmgKfnvJblj7fojrflj5bmgKrniannibnmgKfmj4/ov7DmlofmnKxJRCAqL1xyXG4gICAgcHVibGljIGdldEZlYXR1cmVEaXNjcmliZV9UZXh0SUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRmVhdHVyZURpc2NyaWJlX1RleHRJRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueJueaAp+e8luWPt+iOt+WPluaVsOebrijlj6opICovXHJcbiAgICBwdWJsaWMgZ2V0TnVtYmVyKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk51bWJlcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueJueaAp+e8luWPt+iOt+WPluihgOmHjyAqL1xyXG4gICAgcHVibGljIGdldEhQKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhQO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u54m55oCn57yW5Y+36I635Y+W5oyB57ut5pe26Ze0KOenkikgKi9cclxuICAgIHB1YmxpYyBnZXRUaW1lKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlRpbWU7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7nibnmgKfnvJblj7fojrflj5blop7liqDpgJ/luqYgKi9cclxuICAgIHB1YmxpYyBnZXRTcGVlZFVwKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwZWVkVXA7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7nibnmgKfnvJblj7fojrflj5bojIPlm7QgKi9cclxuICAgIHB1YmxpYyBnZXRSYW5nZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SYW5nZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrueJueaAp+e8luWPt+iOt+WPluWKoOihgCjnp5IpICovXHJcbiAgICBwdWJsaWMgZ2V0UmVjb3ZlcnkoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmVjb3Zlcnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDnibnmgKfnvJblj7cqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhGZWF0dXJlTnVtYmVyKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTc7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=