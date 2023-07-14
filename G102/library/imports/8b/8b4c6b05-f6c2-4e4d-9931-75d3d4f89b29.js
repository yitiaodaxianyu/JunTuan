"use strict";
cc._RF.push(module, '8b4c6sF9sJOTZkxddPU+Jsp', 'SpiritCultivate');
// Scripts/Pet/Data/SpiritCultivate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritCultivateManager = exports.JsonSpiritCultivate = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritCultivate = /** @class */ (function () {
    function JsonSpiritCultivate() {
        /**当前灵宠阶段 */
        this.Stage = 0;
        /**下一级兽粮消耗 */
        this.FoodCost = 0;
        /**下一级金币消耗 */
        this.CoinCost = 0;
        /**下一级宠物1级本体消耗 */
        this.CoinSpirit = 0;
        /**下一级钻石消耗 */
        this.DiamondCost = 0;
    }
    return JsonSpiritCultivate;
}());
exports.JsonSpiritCultivate = JsonSpiritCultivate;
var SpiritCultivateManager = /** @class */ (function () {
    function SpiritCultivateManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritCultivateManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritCultivateManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritCultivateManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritCultivateManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritCultivate', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritCultivate成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritCultivate();
                jsonData = json[i];
                _this.data.set(jsonData.Stage, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritCultivateManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritCultivateManager.prototype.getJsonSpiritCultivate = function (id) {
        return this.data.get(id);
    };
    /**根据当前灵宠阶段获取下一级兽粮消耗 */
    SpiritCultivateManager.prototype.getFoodCost = function (id) {
        return this.data.get(id).FoodCost;
    };
    /**根据当前灵宠阶段获取下一级金币消耗 */
    SpiritCultivateManager.prototype.getCoinCost = function (id) {
        return this.data.get(id).CoinCost;
    };
    /**根据当前灵宠阶段获取下一级宠物1级本体消耗 */
    SpiritCultivateManager.prototype.getCoinSpirit = function (id) {
        return this.data.get(id).CoinSpirit;
    };
    /**根据当前灵宠阶段获取下一级钻石消耗 */
    SpiritCultivateManager.prototype.getDiamondCost = function (id) {
        return this.data.get(id).DiamondCost;
    };
    /** 静态方法，获取最大的 当前灵宠阶段*/
    SpiritCultivateManager.getMaxStage = function () {
        return 13;
    };
    SpiritCultivateManager._instance = null;
    return SpiritCultivateManager;
}());
exports.SpiritCultivateManager = SpiritCultivateManager;

cc._RF.pop();