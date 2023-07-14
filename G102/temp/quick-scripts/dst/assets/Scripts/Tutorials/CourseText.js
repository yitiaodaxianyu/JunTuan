
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tutorials/CourseText.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f4753UXstlAaK75Fp5m2q0L', 'CourseText');
// Scripts/Tutorials/CourseText.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseTextManager = exports.JsonCourseText = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCourseText = /** @class */ (function () {
    function JsonCourseText() {
        /**引导ID */
        this.xs_id = 0;
        /**英雄名文本ID */
        this.hero_text_id = 0;
        /**引导文本ID */
        this.guidance_text_id = 0;
    }
    return JsonCourseText;
}());
exports.JsonCourseText = JsonCourseText;
var CourseTextManager = /** @class */ (function () {
    function CourseTextManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CourseTextManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CourseTextManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CourseTextManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CourseTextManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CourseText', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCourseText成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCourseText();
                jsonData = json[i];
                _this.data.set(jsonData.xs_id, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CourseTextManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CourseTextManager.prototype.getJsonCourseText = function (id) {
        return this.data.get(id);
    };
    /**根据引导ID获取英雄名文本ID */
    CourseTextManager.prototype.gethero_text_id = function (id) {
        return this.data.get(id).hero_text_id;
    };
    /**根据引导ID获取引导文本ID */
    CourseTextManager.prototype.getguidance_text_id = function (id) {
        return this.data.get(id).guidance_text_id;
    };
    /** 静态方法，获取最大的 引导ID*/
    CourseTextManager.getMaxxs_id = function () {
        return 226;
    };
    CourseTextManager._instance = null;
    return CourseTextManager;
}());
exports.CourseTextManager = CourseTextManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVHV0b3JpYWxzXFxDb3Vyc2VUZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFxRDtBQUVyRDtJQUFBO1FBQ0ksVUFBVTtRQUNILFVBQUssR0FBVSxDQUFDLENBQUU7UUFDekIsYUFBYTtRQUNOLGlCQUFZLEdBQVUsQ0FBQyxDQUFFO1FBQ2hDLFlBQVk7UUFDTCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7SUFDeEMsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFQWSx3Q0FBYztBQVMzQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUE0QixJQUFJLENBQUM7UUFDckMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBd0R4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQXpEaUIsNkJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxnQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLG9DQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ3RGLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDbEMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsQ0FBQzthQUMxQztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLDhDQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZiw2Q0FBaUIsR0FBeEIsVUFBeUIsRUFBUztRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxxQkFBcUI7SUFDZCwyQ0FBZSxHQUF0QixVQUF1QixFQUFTO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDO0lBQzFDLENBQUM7SUFDRCxvQkFBb0I7SUFDYiwrQ0FBbUIsR0FBMUIsVUFBMkIsRUFBUztRQUNoQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0lBQzlDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCw2QkFBVyxHQUF6QjtRQUNJLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQXpEYywyQkFBUyxHQUFzQixJQUFJLENBQUM7SUE4RHZELHdCQUFDO0NBL0RELEFBK0RDLElBQUE7QUEvRFksOENBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Db3Vyc2VUZXh0IHtcclxuICAgIC8qKuW8leWvvElEICovXHJcbiAgICBwdWJsaWMgeHNfaWQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKiroi7Hpm4TlkI3mlofmnKxJRCAqL1xyXG4gICAgcHVibGljIGhlcm9fdGV4dF9pZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuW8leWvvOaWh+acrElEICovXHJcbiAgICBwdWJsaWMgZ3VpZGFuY2VfdGV4dF9pZDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvdXJzZVRleHRNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQ291cnNlVGV4dE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uQ291cnNlVGV4dD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Q291cnNlVGV4dE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBDb3Vyc2VUZXh0TWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdDb3Vyc2VUZXh0JyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkNvdXJzZVRleHTmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uQ291cnNlVGV4dCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEueHNfaWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Db3Vyc2VUZXh0KGlkOm51bWJlcik6SnNvbkNvdXJzZVRleHQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruW8leWvvElE6I635Y+W6Iux6ZuE5ZCN5paH5pysSUQgKi9cclxuICAgIHB1YmxpYyBnZXRoZXJvX3RleHRfaWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuaGVyb190ZXh0X2lkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5byV5a+8SUTojrflj5blvJXlr7zmlofmnKxJRCAqL1xyXG4gICAgcHVibGljIGdldGd1aWRhbmNlX3RleHRfaWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuZ3VpZGFuY2VfdGV4dF9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOW8leWvvElEKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4eHNfaWQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAyMjY7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=