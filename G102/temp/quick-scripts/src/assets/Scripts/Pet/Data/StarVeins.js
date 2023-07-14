"use strict";
cc._RF.push(module, '84e55bTdQVKp4yBNUKBF1N0', 'StarVeins');
// Scripts/Pet/Data/StarVeins.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarVeinsManager = exports.JsonStarVeins = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonStarVeins = /** @class */ (function () {
    function JsonStarVeins() {
        /**星脉ID */
        this.StarVeinsId = 0;
        /**星脉名称 */
        this.StarVeinsName = 0;
        /**品质 */
        this.Quality = 0;
        /**节点数量 */
        this.NodeNum = 0;
    }
    return JsonStarVeins;
}());
exports.JsonStarVeins = JsonStarVeins;
var StarVeinsManager = /** @class */ (function () {
    function StarVeinsManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    StarVeinsManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new StarVeinsManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    StarVeinsManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    StarVeinsManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('StarVeins', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonStarVeins成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonStarVeins();
                jsonData = json[i];
                _this.data.set(jsonData.StarVeinsId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    StarVeinsManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    StarVeinsManager.prototype.getJsonStarVeins = function (id) {
        return this.data.get(id);
    };
    /**根据星脉ID获取星脉名称 */
    StarVeinsManager.prototype.getStarVeinsName = function (id) {
        return this.data.get(id).StarVeinsName;
    };
    /**根据星脉ID获取品质 */
    StarVeinsManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据星脉ID获取节点数量 */
    StarVeinsManager.prototype.getNodeNum = function (id) {
        return this.data.get(id).NodeNum;
    };
    /** 静态方法，获取最大的 星脉ID*/
    StarVeinsManager.getMaxStarVeinsId = function () {
        return 0;
    };
    StarVeinsManager._instance = null;
    return StarVeinsManager;
}());
exports.StarVeinsManager = StarVeinsManager;

cc._RF.pop();