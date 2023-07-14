"use strict";
cc._RF.push(module, 'a5b65rOZx9PZJO4J9ZqCyY0', 'RogueHexagonTypes');
// Scripts/copy/voidcrack/RogueHexagonTypes.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueHexagonTypesManager = exports.JsonRogueHexagonTypes = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueHexagonTypes = /** @class */ (function () {
    function JsonRogueHexagonTypes() {
        /**格子ID */
        this.Hexagon_ID = 0;
        /**章数 */
        this.Layers = 0;
        /**行数 */
        this.Rows = 0;
        /**位置 */
        this.Position = 0;
        /**格子类型 */
        this.HexagonType = 0;
        /**道具1_ID */
        this.RogueProp1_ID = 0;
        /**道具1_数量 */
        this.RogueProp1_Sum = 0;
        /**专武奖池集 */
        this.RogueProp2_ID = 0;
        /**奖励数量 */
        this.RogueProp2_Sum = 0;
    }
    return JsonRogueHexagonTypes;
}());
exports.JsonRogueHexagonTypes = JsonRogueHexagonTypes;
var RogueHexagonTypesManager = /** @class */ (function () {
    function RogueHexagonTypesManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    RogueHexagonTypesManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueHexagonTypesManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueHexagonTypesManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueHexagonTypesManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueHexagonTypes', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueHexagonTypes成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueHexagonTypes();
                jsonData = json[i];
                _this.data.set(jsonData.Hexagon_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueHexagonTypesManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueHexagonTypesManager.prototype.getJsonRogueHexagonTypes = function (id) {
        return this.data.get(id);
    };
    /**根据格子ID获取章数 */
    RogueHexagonTypesManager.prototype.getLayers = function (id) {
        return this.data.get(id).Layers;
    };
    /**根据格子ID获取行数 */
    RogueHexagonTypesManager.prototype.getRows = function (id) {
        return this.data.get(id).Rows;
    };
    /**根据格子ID获取位置 */
    RogueHexagonTypesManager.prototype.getPosition = function (id) {
        return this.data.get(id).Position;
    };
    /**根据格子ID获取格子类型 */
    RogueHexagonTypesManager.prototype.getHexagonType = function (id) {
        return this.data.get(id).HexagonType;
    };
    /**根据格子ID获取道具1_ID */
    RogueHexagonTypesManager.prototype.getRogueProp1_ID = function (id) {
        return this.data.get(id).RogueProp1_ID;
    };
    /**根据格子ID获取道具1_数量 */
    RogueHexagonTypesManager.prototype.getRogueProp1_Sum = function (id) {
        return this.data.get(id).RogueProp1_Sum;
    };
    /**根据格子ID获取专武奖池集 */
    RogueHexagonTypesManager.prototype.getRogueProp2_ID = function (id) {
        return this.data.get(id).RogueProp2_ID;
    };
    /**根据格子ID获取奖励数量 */
    RogueHexagonTypesManager.prototype.getRogueProp2_Sum = function (id) {
        return this.data.get(id).RogueProp2_Sum;
    };
    /** 静态方法，获取最大的 格子ID*/
    RogueHexagonTypesManager.getMaxHexagon_ID = function () {
        return 80092;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 返回一个格子id2
     * 层数*10000+行数+位置
     * @param layer 层数
     * @param row 行数
     * @param position 位置
     * @returns
     */
    RogueHexagonTypesManager.getId = function (layer, row, position) {
        return layer * 10000 + row * 10 + position;
    };
    RogueHexagonTypesManager.prototype.getData = function () {
        return this.data;
    };
    /**返回这一层的所有格子id
     * 层数
    */
    RogueHexagonTypesManager.prototype.getAllLayerId = function (layer) {
        var Allid = [];
        this.data.forEach(function (v, k) {
            if (v.Layers == layer) {
                Allid.push(v.Hexagon_ID);
            }
        });
        return Allid;
    };
    RogueHexagonTypesManager._instance = null;
    return RogueHexagonTypesManager;
}());
exports.RogueHexagonTypesManager = RogueHexagonTypesManager;

cc._RF.pop();