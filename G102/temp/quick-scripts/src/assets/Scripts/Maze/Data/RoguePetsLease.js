"use strict";
cc._RF.push(module, '8053d2YNzNAeIUCVbhwcByU', 'RoguePetsLease');
// Scripts/Maze/Data/RoguePetsLease.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoguePetsLeaseManager = exports.JsonRoguePetsLease = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRoguePetsLease = /** @class */ (function () {
    function JsonRoguePetsLease() {
        /**主线章节 */
        this.Chapter = 0;
        /**宠物奖池ID */
        this.PetsLeaseID = [];
        /**宠物组权重 */
        this.PetsWeight = [];
        /**宠物品质 */
        this.PetsQuality = [];
    }
    return JsonRoguePetsLease;
}());
exports.JsonRoguePetsLease = JsonRoguePetsLease;
var RoguePetsLeaseManager = /** @class */ (function () {
    function RoguePetsLeaseManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RoguePetsLeaseManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RoguePetsLeaseManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RoguePetsLeaseManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RoguePetsLeaseManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RoguePetsLease', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRoguePetsLease成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRoguePetsLease();
                jsonData = json[i];
                _this.data.set(jsonData.Chapter, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RoguePetsLeaseManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RoguePetsLeaseManager.prototype.getJsonRoguePetsLease = function (id) {
        return this.data.get(id);
    };
    /**根据主线章节获取宠物奖池ID */
    RoguePetsLeaseManager.prototype.getPetsLeaseID = function (id) {
        return this.data.get(id).PetsLeaseID;
    };
    /**根据主线章节获取宠物组权重 */
    RoguePetsLeaseManager.prototype.getPetsWeight = function (id) {
        return this.data.get(id).PetsWeight;
    };
    /**根据主线章节获取宠物品质 */
    RoguePetsLeaseManager.prototype.getPetsQuality = function (id) {
        return this.data.get(id).PetsQuality;
    };
    /** 静态方法，获取最大的 主线章节*/
    RoguePetsLeaseManager.getMaxChapter = function () {
        return 10;
    };
    RoguePetsLeaseManager._instance = null;
    return RoguePetsLeaseManager;
}());
exports.RoguePetsLeaseManager = RoguePetsLeaseManager;

cc._RF.pop();