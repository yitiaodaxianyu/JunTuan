"use strict";
cc._RF.push(module, '56799XpdVRDX4Wdh8KYuSqp', 'EquipmentAttribute');
// Scripts/Equipment/Data/EquipmentAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentAttributeManager = exports.JsonEquipmentAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonEquipmentAttribute = /** @class */ (function () {
    function JsonEquipmentAttribute() {
        /**装备ID */
        this.Equipment_ID = 0;
        /**装备位置 */
        this.EquipmentPosition = 0;
        /**装备阶段 */
        this.Stage = 0;
        /**装备品质 */
        this.Quality = 0;
        /**基础生命值 */
        this.BaseHealth = 0;
        /**基础攻击力 */
        this.BaseAttack = 0;
        /**基础防御力 */
        this.BaseDefense = 0;
    }
    return JsonEquipmentAttribute;
}());
exports.JsonEquipmentAttribute = JsonEquipmentAttribute;
var EquipmentAttributeManager = /** @class */ (function () {
    function EquipmentAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EquipmentAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EquipmentAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EquipmentAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EquipmentAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EquipmentAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEquipmentAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Equipment_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EquipmentAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EquipmentAttributeManager.prototype.getJsonEquipmentAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据装备ID获取装备位置 */
    EquipmentAttributeManager.prototype.getEquipmentPosition = function (id) {
        return this.data.get(id).EquipmentPosition;
    };
    /**根据装备ID获取装备阶段 */
    EquipmentAttributeManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据装备ID获取装备品质 */
    EquipmentAttributeManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据装备ID获取基础生命值 */
    EquipmentAttributeManager.prototype.getBaseHealth = function (id) {
        return this.data.get(id).BaseHealth;
    };
    /**根据装备ID获取基础攻击力 */
    EquipmentAttributeManager.prototype.getBaseAttack = function (id) {
        return this.data.get(id).BaseAttack;
    };
    /**根据装备ID获取基础防御力 */
    EquipmentAttributeManager.prototype.getBaseDefense = function (id) {
        return this.data.get(id).BaseDefense;
    };
    /** 静态方法，获取最大的 装备ID*/
    EquipmentAttributeManager.getMaxEquipment_ID = function () {
        return 30431;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    EquipmentAttributeManager.getID = function (type, level) {
        return type * 100 + level + 30000;
        //=B4*100+C4+30000   装备位置   品质
    };
    //解析id，获得LevelType
    EquipmentAttributeManager.getEquipTypeById = function (id) {
        return Math.floor(id / 1000);
    };
    EquipmentAttributeManager.getMaxQuality = function () {
        return 6;
    };
    EquipmentAttributeManager.prototype.getMaxStage = function () {
        return 31;
    };
    EquipmentAttributeManager.prototype.getIsMaxStage = function (id) {
        var stage = this.getStage(id);
        return stage >= this.getMaxStage();
    };
    EquipmentAttributeManager._instance = null;
    return EquipmentAttributeManager;
}());
exports.EquipmentAttributeManager = EquipmentAttributeManager;

cc._RF.pop();