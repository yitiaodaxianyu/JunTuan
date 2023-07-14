"use strict";
cc._RF.push(module, '8d4c2DwPopAibcb9KmXbo1x', 'StarVeinsAttribute');
// Scripts/Pet/Data/StarVeinsAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarVeinsAttributeManager = exports.JsonStarVeinsAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonStarVeinsAttribute = /** @class */ (function () {
    function JsonStarVeinsAttribute() {
        /**节点ID */
        this.Node = 0;
        /**星脉ID */
        this.StarVeinsId = 0;
        /**节点序号 */
        this.NodeOrdinal = 0;
        /**消耗道具ID */
        this.CostItem = 0;
        /**消耗道具数量 */
        this.CostNum = 0;
        /**攻击力 */
        this.Attack = 0;
        /**防御力 */
        this.Defense = 0;
        /**生命值 */
        this.Health = 0;
        /**额外攻速 */
        this.ExtraAttackSpeed = 0;
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
        /**灵兽百分比攻击力 */
        this.SpiritPercentageAttack = 0;
        /**灵兽防御力加成 */
        this.SpiritPercentageDefense = 0;
        /**灵兽生命值加成 */
        this.SpiritPercentageHealth = 0;
    }
    return JsonStarVeinsAttribute;
}());
exports.JsonStarVeinsAttribute = JsonStarVeinsAttribute;
var StarVeinsAttributeManager = /** @class */ (function () {
    function StarVeinsAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    StarVeinsAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new StarVeinsAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    StarVeinsAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    StarVeinsAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('StarVeinsAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonStarVeinsAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonStarVeinsAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Node, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    StarVeinsAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    StarVeinsAttributeManager.prototype.getJsonStarVeinsAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据节点ID获取星脉ID */
    StarVeinsAttributeManager.prototype.getStarVeinsId = function (id) {
        return this.data.get(id).StarVeinsId;
    };
    /**根据节点ID获取节点序号 */
    StarVeinsAttributeManager.prototype.getNodeOrdinal = function (id) {
        return this.data.get(id).NodeOrdinal;
    };
    /**根据节点ID获取消耗道具ID */
    StarVeinsAttributeManager.prototype.getCostItem = function (id) {
        return this.data.get(id).CostItem;
    };
    /**根据节点ID获取消耗道具数量 */
    StarVeinsAttributeManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /**根据节点ID获取攻击力 */
    StarVeinsAttributeManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据节点ID获取防御力 */
    StarVeinsAttributeManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据节点ID获取生命值 */
    StarVeinsAttributeManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据节点ID获取额外攻速 */
    StarVeinsAttributeManager.prototype.getExtraAttackSpeed = function (id) {
        return this.data.get(id).ExtraAttackSpeed;
    };
    /**根据节点ID获取命中值 */
    StarVeinsAttributeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据节点ID获取闪避值 */
    StarVeinsAttributeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据节点ID获取暴击值 */
    StarVeinsAttributeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据节点ID获取暴击增幅 */
    StarVeinsAttributeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据节点ID获取防暴值 */
    StarVeinsAttributeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据节点ID获取暴击抗性 */
    StarVeinsAttributeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /**根据节点ID获取灵兽百分比攻击力 */
    StarVeinsAttributeManager.prototype.getSpiritPercentageAttack = function (id) {
        return this.data.get(id).SpiritPercentageAttack;
    };
    /**根据节点ID获取灵兽防御力加成 */
    StarVeinsAttributeManager.prototype.getSpiritPercentageDefense = function (id) {
        return this.data.get(id).SpiritPercentageDefense;
    };
    /**根据节点ID获取灵兽生命值加成 */
    StarVeinsAttributeManager.prototype.getSpiritPercentageHealth = function (id) {
        return this.data.get(id).SpiritPercentageHealth;
    };
    /** 静态方法，获取最大的 节点ID*/
    StarVeinsAttributeManager.getMaxNode = function () {
        return 0;
    };
    StarVeinsAttributeManager._instance = null;
    return StarVeinsAttributeManager;
}());
exports.StarVeinsAttributeManager = StarVeinsAttributeManager;

cc._RF.pop();