"use strict";
cc._RF.push(module, 'c48ba8LtMpMZIfbcwuHEv3I', 'RoguefastPass');
// Scripts/copy/voidcrack/RoguefastPass.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoguefastPassManager = exports.JsonRoguefastPass = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRoguefastPass = /** @class */ (function () {
    function JsonRoguefastPass() {
        /**章节 */
        this.ChapterLevel = 0;
        /**奖励1ID */
        this.PropID_1 = 0;
        /**奖励1数量 */
        this.PropNum_1 = 0;
        /**奖励2ID */
        this.PropID_2 = 0;
        /**奖励2数量 */
        this.PropNum_2 = 0;
    }
    return JsonRoguefastPass;
}());
exports.JsonRoguefastPass = JsonRoguefastPass;
var RoguefastPassManager = /** @class */ (function () {
    function RoguefastPassManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RoguefastPassManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RoguefastPassManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RoguefastPassManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RoguefastPassManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RoguefastPass', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRoguefastPass成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRoguefastPass();
                jsonData = json[i];
                _this.data.set(jsonData.ChapterLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RoguefastPassManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RoguefastPassManager.prototype.getJsonRoguefastPass = function (id) {
        return this.data.get(id);
    };
    /**根据章节获取奖励1ID */
    RoguefastPassManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据章节获取奖励1数量 */
    RoguefastPassManager.prototype.getPropNum_1 = function (id) {
        return this.data.get(id).PropNum_1;
    };
    /**根据章节获取奖励2ID */
    RoguefastPassManager.prototype.getPropID_2 = function (id) {
        return this.data.get(id).PropID_2;
    };
    /**根据章节获取奖励2数量 */
    RoguefastPassManager.prototype.getPropNum_2 = function (id) {
        return this.data.get(id).PropNum_2;
    };
    /** 静态方法，获取最大的 章节*/
    RoguefastPassManager.getMaxChapterLevel = function () {
        return 8;
    };
    RoguefastPassManager._instance = null;
    return RoguefastPassManager;
}());
exports.RoguefastPassManager = RoguefastPassManager;

cc._RF.pop();