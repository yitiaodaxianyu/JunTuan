"use strict";
cc._RF.push(module, '0683fIVNg1FP5zJkD3Q8IP3', 'SpiritAttribute');
// Scripts/Pet/Data/SpiritAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritAttributeManager = exports.JsonSpiritAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritAttribute = /** @class */ (function () {
    function JsonSpiritAttribute() {
        /**灵宠道具 */
        this.SpiritItem = 0;
        /**灵宠种类 */
        this.SpiritType = 0;
        /**阶段 */
        this.Stage = 0;
        /**品质 */
        this.Quality = 0;
        /**星级 */
        this.Star = 0;
        /**生命值 */
        this.Health = 0;
        /**攻击力 */
        this.Attack = 0;
        /**防御力 */
        this.Defense = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
    }
    return JsonSpiritAttribute;
}());
exports.JsonSpiritAttribute = JsonSpiritAttribute;
var SpiritAttributeManager = /** @class */ (function () {
    function SpiritAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SpiritAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritItem, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritAttributeManager.prototype.getJsonSpiritAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠道具获取灵宠种类 */
    SpiritAttributeManager.prototype.getSpiritType = function (id) {
        return this.data.get(id).SpiritType;
    };
    /**根据灵宠道具获取阶段 */
    SpiritAttributeManager.prototype.getStage = function (id) {
        return this.data.get(id).Stage;
    };
    /**根据灵宠道具获取品质 */
    SpiritAttributeManager.prototype.getQuality = function (id) {
        return this.data.get(id).Quality;
    };
    /**根据灵宠道具获取星级 */
    SpiritAttributeManager.prototype.getStar = function (id) {
        return this.data.get(id).Star;
    };
    /**根据灵宠道具获取生命值 */
    SpiritAttributeManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据灵宠道具获取攻击力 */
    SpiritAttributeManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据灵宠道具获取防御力 */
    SpiritAttributeManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据灵宠道具获取命中值 */
    SpiritAttributeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据灵宠道具获取闪避值 */
    SpiritAttributeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据灵宠道具获取暴击值 */
    SpiritAttributeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据灵宠道具获取暴击增幅 */
    SpiritAttributeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据灵宠道具获取防暴值 */
    SpiritAttributeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据灵宠道具获取暴击抗性 */
    SpiritAttributeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /** 静态方法，获取最大的 灵宠道具*/
    SpiritAttributeManager.getMaxSpiritItem = function () {
        return 70413;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SpiritAttributeManager.prototype.getTypeFirstJsonData = function (type) {
        var info = null;
        this.data.forEach(function (v, k) {
            if (type == v.SpiritType && v.Stage == 1) {
                info = v;
            }
        });
        return info;
    };
    SpiritAttributeManager._instance = null;
    return SpiritAttributeManager;
}());
exports.SpiritAttributeManager = SpiritAttributeManager;

cc._RF.pop();