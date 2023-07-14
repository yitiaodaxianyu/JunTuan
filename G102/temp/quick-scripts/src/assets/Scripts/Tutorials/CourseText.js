"use strict";
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