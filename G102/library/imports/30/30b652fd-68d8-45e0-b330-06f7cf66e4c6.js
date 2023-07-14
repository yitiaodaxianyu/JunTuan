"use strict";
cc._RF.push(module, '30b65L9aNhF4LMwBvfPZuTG', 'SpiritQualityAdvanced');
// Scripts/Pet/Data/SpiritQualityAdvanced.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritQualityAdvancedManager = exports.JsonSpiritQualityAdvanced = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritQualityAdvanced = /** @class */ (function () {
    function JsonSpiritQualityAdvanced() {
        /**当前品质 */
        this.CurrentQuality = 0;
        /**目标品质 */
        this.TargetQuality = 0;
        /**消耗本体数量 */
        this.CostItselfNum = 0;
        /**消耗本体品质 */
        this.CostItselfQuality = 0;
        /**消耗同类型数量 */
        this.CostSameTypeNum = 0;
        /**消耗同类型品质 */
        this.CostSameTypeQuality = 0;
    }
    return JsonSpiritQualityAdvanced;
}());
exports.JsonSpiritQualityAdvanced = JsonSpiritQualityAdvanced;
var SpiritQualityAdvancedManager = /** @class */ (function () {
    function SpiritQualityAdvancedManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritQualityAdvancedManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritQualityAdvancedManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritQualityAdvancedManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritQualityAdvancedManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritQualityAdvanced', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritQualityAdvanced成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritQualityAdvanced();
                jsonData = json[i];
                _this.data.set(jsonData.CurrentQuality, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritQualityAdvancedManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritQualityAdvancedManager.prototype.getJsonSpiritQualityAdvanced = function (id) {
        return this.data.get(id);
    };
    /**根据当前品质获取目标品质 */
    SpiritQualityAdvancedManager.prototype.getTargetQuality = function (id) {
        return this.data.get(id).TargetQuality;
    };
    /**根据当前品质获取消耗本体数量 */
    SpiritQualityAdvancedManager.prototype.getCostItselfNum = function (id) {
        return this.data.get(id).CostItselfNum;
    };
    /**根据当前品质获取消耗本体品质 */
    SpiritQualityAdvancedManager.prototype.getCostItselfQuality = function (id) {
        return this.data.get(id).CostItselfQuality;
    };
    /**根据当前品质获取消耗同类型数量 */
    SpiritQualityAdvancedManager.prototype.getCostSameTypeNum = function (id) {
        return this.data.get(id).CostSameTypeNum;
    };
    /**根据当前品质获取消耗同类型品质 */
    SpiritQualityAdvancedManager.prototype.getCostSameTypeQuality = function (id) {
        return this.data.get(id).CostSameTypeQuality;
    };
    /** 静态方法，获取最大的 当前品质*/
    SpiritQualityAdvancedManager.getMaxCurrentQuality = function () {
        return 9;
    };
    SpiritQualityAdvancedManager._instance = null;
    return SpiritQualityAdvancedManager;
}());
exports.SpiritQualityAdvancedManager = SpiritQualityAdvancedManager;

cc._RF.pop();