"use strict";
cc._RF.push(module, '63fcdOX2WBJyYanA6ckGBN5', 'MonsterGrowthAttributes');
// Scripts/Monster/Data/MonsterGrowthAttributes.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterGrowthAttributesManager = exports.JsonMonsterGrowthAttributes = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterGrowthAttributes = /** @class */ (function () {
    function JsonMonsterGrowthAttributes() {
        /**属性ID */
        this.AttributeId = 0;
        /**怪物种类 */
        this.MonsterId = 0;
        /**等级 */
        this.Level = 0;
        /**攻击力 */
        this.Attack = 0;
        /**生命值 */
        this.Health = 0;
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
        /**技能等级 */
        this.SkillLevel = 0;
    }
    return JsonMonsterGrowthAttributes;
}());
exports.JsonMonsterGrowthAttributes = JsonMonsterGrowthAttributes;
var MonsterGrowthAttributesManager = /** @class */ (function () {
    function MonsterGrowthAttributesManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    MonsterGrowthAttributesManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterGrowthAttributesManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterGrowthAttributesManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterGrowthAttributesManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterGrowthAttributes', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterGrowthAttributes成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterGrowthAttributes();
                jsonData = json[i];
                _this.data.set(jsonData.AttributeId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterGrowthAttributesManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterGrowthAttributesManager.prototype.getJsonMonsterGrowthAttributes = function (id) {
        return this.data.get(id);
    };
    /**根据属性ID获取怪物种类 */
    MonsterGrowthAttributesManager.prototype.getMonsterId = function (id) {
        return this.data.get(id).MonsterId;
    };
    /**根据属性ID获取等级 */
    MonsterGrowthAttributesManager.prototype.getLevel = function (id) {
        // try {
        //     return this.data.get(id).Level;
        // } catch (error) {
        //     throw console.error("getLevel:"+id);
        // }
        return this.data.get(id).Level;
    };
    /**根据属性ID获取攻击力 */
    MonsterGrowthAttributesManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据属性ID获取生命值 */
    MonsterGrowthAttributesManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据属性ID获取防御力 */
    MonsterGrowthAttributesManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据属性ID获取命中值 */
    MonsterGrowthAttributesManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据属性ID获取闪避值 */
    MonsterGrowthAttributesManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据属性ID获取暴击值 */
    MonsterGrowthAttributesManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据属性ID获取暴击增幅 */
    MonsterGrowthAttributesManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据属性ID获取防暴值 */
    MonsterGrowthAttributesManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据属性ID获取暴击抗性 */
    MonsterGrowthAttributesManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /**根据属性ID获取技能等级 */
    MonsterGrowthAttributesManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /** 静态方法，获取最大的 属性ID*/
    MonsterGrowthAttributesManager.getMaxAttributeId = function () {
        return 800016;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得属性id
     * @param monsterId 怪物id
     * @param monsterLevel 怪物等级
     * @returns 属性id
     */
    MonsterGrowthAttributesManager.getId = function (monsterId, monsterLevel) {
        return monsterId * 10000 + monsterLevel;
    };
    MonsterGrowthAttributesManager._instance = null;
    return MonsterGrowthAttributesManager;
}());
exports.MonsterGrowthAttributesManager = MonsterGrowthAttributesManager;

cc._RF.pop();