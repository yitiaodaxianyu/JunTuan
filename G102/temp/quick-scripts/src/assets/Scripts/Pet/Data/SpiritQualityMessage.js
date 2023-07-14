"use strict";
cc._RF.push(module, '7b31b76PJVGd4iKrY5mBW2z', 'SpiritQualityMessage');
// Scripts/Pet/Data/SpiritQualityMessage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritQualityMessageManager = exports.JsonSpiritQualityMessage = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritQualityMessage = /** @class */ (function () {
    function JsonSpiritQualityMessage() {
        /**品质 */
        this.SpiritQuality = 0;
        /**品质名 */
        this.SpiritQualityName = 0;
        /**品质框 */
        this.SpiritQualityframe = 0;
        /**星级 */
        this.SpiritQualityStar = 0;
    }
    return JsonSpiritQualityMessage;
}());
exports.JsonSpiritQualityMessage = JsonSpiritQualityMessage;
var SpiritQualityMessageManager = /** @class */ (function () {
    function SpiritQualityMessageManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritQualityMessageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritQualityMessageManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritQualityMessageManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritQualityMessageManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritQualityMessage', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritQualityMessage成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritQualityMessage();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritQuality, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritQualityMessageManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritQualityMessageManager.prototype.getJsonSpiritQualityMessage = function (id) {
        return this.data.get(id);
    };
    /**根据品质获取品质名 */
    SpiritQualityMessageManager.prototype.getSpiritQualityName = function (id) {
        return this.data.get(id).SpiritQualityName;
    };
    /**根据品质获取品质框 */
    SpiritQualityMessageManager.prototype.getSpiritQualityframe = function (id) {
        return this.data.get(id).SpiritQualityframe;
    };
    /**根据品质获取星级 */
    SpiritQualityMessageManager.prototype.getSpiritQualityStar = function (id) {
        return this.data.get(id).SpiritQualityStar;
    };
    /** 静态方法，获取最大的 品质*/
    SpiritQualityMessageManager.getMaxSpiritQuality = function () {
        return 15;
    };
    SpiritQualityMessageManager._instance = null;
    return SpiritQualityMessageManager;
}());
exports.SpiritQualityMessageManager = SpiritQualityMessageManager;

cc._RF.pop();