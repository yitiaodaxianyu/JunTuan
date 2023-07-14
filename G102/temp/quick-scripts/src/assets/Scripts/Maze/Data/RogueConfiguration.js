"use strict";
cc._RF.push(module, '10689yRIAZKgKeg2q9W+bWc', 'RogueConfiguration');
// Scripts/Maze/Data/RogueConfiguration.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueConfigurationManager = exports.JsonRogueConfiguration = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueConfiguration = /** @class */ (function () {
    function JsonRogueConfiguration() {
        /**主线关卡 */
        this.MainlineLevel = 0;
        /**第一个战斗格子战力 */
        this.FirstfightHexagon = 0;
    }
    return JsonRogueConfiguration;
}());
exports.JsonRogueConfiguration = JsonRogueConfiguration;
var RogueConfigurationManager = /** @class */ (function () {
    function RogueConfigurationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueConfigurationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueConfigurationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueConfigurationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueConfigurationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueConfiguration', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueConfiguration成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueConfiguration();
                jsonData = json[i];
                _this.data.set(jsonData.MainlineLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueConfigurationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueConfigurationManager.prototype.getJsonRogueConfiguration = function (id) {
        return this.data.get(id);
    };
    /**根据主线关卡获取第一个战斗格子战力 */
    RogueConfigurationManager.prototype.getFirstfightHexagon = function (id) {
        return this.data.get(id).FirstfightHexagon;
    };
    /** 静态方法，获取最大的 主线关卡*/
    RogueConfigurationManager.getMaxMainlineLevel = function () {
        return 100;
    };
    RogueConfigurationManager._instance = null;
    return RogueConfigurationManager;
}());
exports.RogueConfigurationManager = RogueConfigurationManager;

cc._RF.pop();