"use strict";
cc._RF.push(module, '13c49Sb/ctNua/rP21zSB5x', 'SpiritRelease');
// Scripts/Pet/Data/SpiritRelease.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritReleaseManager = exports.JsonSpiritRelease = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritRelease = /** @class */ (function () {
    function JsonSpiritRelease() {
        /**放生ID */
        this.ReleaseId = 0;
        /**稀有度 */
        this.SpiritRarity = 0;
        /**品质 */
        this.SpiritQuality = 0;
        /**获得道具 */
        this.GetItem = 0;
        /**获得数量 */
        this.GetNum = 0;
    }
    return JsonSpiritRelease;
}());
exports.JsonSpiritRelease = JsonSpiritRelease;
var SpiritReleaseManager = /** @class */ (function () {
    function SpiritReleaseManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritReleaseManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritReleaseManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritReleaseManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritReleaseManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritRelease', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritRelease成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritRelease();
                jsonData = json[i];
                _this.data.set(jsonData.ReleaseId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritReleaseManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritReleaseManager.prototype.getJsonSpiritRelease = function (id) {
        return this.data.get(id);
    };
    /**根据放生ID获取稀有度 */
    SpiritReleaseManager.prototype.getSpiritRarity = function (id) {
        return this.data.get(id).SpiritRarity;
    };
    /**根据放生ID获取品质 */
    SpiritReleaseManager.prototype.getSpiritQuality = function (id) {
        return this.data.get(id).SpiritQuality;
    };
    /**根据放生ID获取获得道具 */
    SpiritReleaseManager.prototype.getGetItem = function (id) {
        return this.data.get(id).GetItem;
    };
    /**根据放生ID获取获得数量 */
    SpiritReleaseManager.prototype.getGetNum = function (id) {
        return this.data.get(id).GetNum;
    };
    /** 静态方法，获取最大的 放生ID*/
    SpiritReleaseManager.getMaxReleaseId = function () {
        return 415;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritReleaseManager.prototype.getDataByQualityAndRarity = function (quality, rarity) {
        var jsonData;
        this.data.forEach(function (v, k) {
            if (v.SpiritQuality == quality && v.SpiritRarity == rarity) {
                jsonData = v;
            }
        });
        return jsonData;
    };
    SpiritReleaseManager._instance = null;
    return SpiritReleaseManager;
}());
exports.SpiritReleaseManager = SpiritReleaseManager;

cc._RF.pop();