"use strict";
cc._RF.push(module, '66e90Doc5ROXbkscccBbe/5', 'EggInformation');
// Scripts/TakeEgg/EggInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EggInformationManager = exports.JsonEggInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonEggInformation = /** @class */ (function () {
    function JsonEggInformation() {
        /**开蛋池ID */
        this.EggsID = 0;
        /**开蛋池类型 */
        this.EggsType = 0;
        /**获得奖池集ID */
        this.EggsReward = 0;
        /**单抽道具1ID */
        this.EggPropID_1 = 0;
        /**单抽道具1消耗 */
        this.EggPropNum_1 = 0;
        /**十连抽道具消耗 */
        this.TenEggProp_1 = 0;
        /**单抽道具2id */
        this.EggPropID_2 = 0;
        /**单抽道具2数量 */
        this.EggPropNum_2 = 0;
        /**十连抽道具消耗 */
        this.TenEggProp_2 = 0;
    }
    return JsonEggInformation;
}());
exports.JsonEggInformation = JsonEggInformation;
var EggInformationManager = /** @class */ (function () {
    function EggInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    EggInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EggInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EggInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EggInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EggInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEggInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEggInformation();
                jsonData = json[i];
                _this.data.set(jsonData.EggsID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EggInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EggInformationManager.prototype.getJsonEggInformation = function (id) {
        return this.data.get(id);
    };
    /**根据开蛋池ID获取开蛋池类型 */
    EggInformationManager.prototype.getEggsType = function (id) {
        return this.data.get(id).EggsType;
    };
    /**根据开蛋池ID获取获得奖池集ID */
    EggInformationManager.prototype.getEggsReward = function (id) {
        return this.data.get(id).EggsReward;
    };
    /**根据开蛋池ID获取单抽道具1ID */
    EggInformationManager.prototype.getEggPropID_1 = function (id) {
        return this.data.get(id).EggPropID_1;
    };
    /**根据开蛋池ID获取单抽道具1消耗 */
    EggInformationManager.prototype.getEggPropNum_1 = function (id) {
        return this.data.get(id).EggPropNum_1;
    };
    /**根据开蛋池ID获取十连抽道具消耗 */
    EggInformationManager.prototype.getTenEggProp_1 = function (id) {
        return this.data.get(id).TenEggProp_1;
    };
    /**根据开蛋池ID获取单抽道具2id */
    EggInformationManager.prototype.getEggPropID_2 = function (id) {
        return this.data.get(id).EggPropID_2;
    };
    /**根据开蛋池ID获取单抽道具2数量 */
    EggInformationManager.prototype.getEggPropNum_2 = function (id) {
        return this.data.get(id).EggPropNum_2;
    };
    /**根据开蛋池ID获取十连抽道具消耗 */
    EggInformationManager.prototype.getTenEggProp_2 = function (id) {
        return this.data.get(id).TenEggProp_2;
    };
    /** 静态方法，获取最大的 开蛋池ID*/
    EggInformationManager.getMaxEggsID = function () {
        return 20001;
    };
    EggInformationManager._instance = null;
    return EggInformationManager;
}());
exports.EggInformationManager = EggInformationManager;

cc._RF.pop();