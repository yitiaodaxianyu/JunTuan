"use strict";
cc._RF.push(module, 'dbc16YMQRlNZ7Sny29YbulM', 'RogueGiftInformation');
// Scripts/copy/endlesschallenges/RogueGiftInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueGiftInformationManager = exports.JsonRogueGiftInformation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueGiftInformation = /** @class */ (function () {
    function JsonRogueGiftInformation() {
        /**章节ID */
        this.ChapterLevel = 0;
        /**奖励1显示ID */
        this.PropID_1 = 0;
        /**奖励2显示ID */
        this.PropID_2 = 0;
        /**奖励3显示ID */
        this.PropID_3 = 0;
    }
    return JsonRogueGiftInformation;
}());
exports.JsonRogueGiftInformation = JsonRogueGiftInformation;
var RogueGiftInformationManager = /** @class */ (function () {
    function RogueGiftInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueGiftInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueGiftInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueGiftInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueGiftInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueGiftInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueGiftInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueGiftInformation();
                jsonData = json[i];
                _this.data.set(jsonData.ChapterLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueGiftInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueGiftInformationManager.prototype.getJsonRogueGiftInformation = function (id) {
        return this.data.get(id);
    };
    /**根据章节ID获取奖励1显示ID */
    RogueGiftInformationManager.prototype.getPropID_1 = function (id) {
        return this.data.get(id).PropID_1;
    };
    /**根据章节ID获取奖励2显示ID */
    RogueGiftInformationManager.prototype.getPropID_2 = function (id) {
        return this.data.get(id).PropID_2;
    };
    /**根据章节ID获取奖励3显示ID */
    RogueGiftInformationManager.prototype.getPropID_3 = function (id) {
        return this.data.get(id).PropID_3;
    };
    /** 静态方法，获取最大的 章节ID*/
    RogueGiftInformationManager.getMaxChapterLevel = function () {
        return 8;
    };
    RogueGiftInformationManager._instance = null;
    return RogueGiftInformationManager;
}());
exports.RogueGiftInformationManager = RogueGiftInformationManager;

cc._RF.pop();