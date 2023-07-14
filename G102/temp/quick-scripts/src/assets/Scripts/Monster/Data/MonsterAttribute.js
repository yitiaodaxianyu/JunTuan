"use strict";
cc._RF.push(module, '4364bjVlv1JEa8/fkMPz7/o', 'MonsterAttribute');
// Scripts/Monster/Data/MonsterAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterAttributeManager = exports.JsonMonsterAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterAttribute = /** @class */ (function () {
    function JsonMonsterAttribute() {
        /**怪物ID */
        this.Monster = 0;
        /**怪物名称文本 */
        this.MosterName_TextID = 0;
        /**初始血量 */
        this.BaseHP = 0;
        /**初始攻击力 */
        this.BaseAttack = 0;
        /**初始攻速 */
        this.BaseAttackSpeed = 0;
        /**位置 */
        this.Area = [];
        /**特性编号 */
        this.Feature = 0;
        /**移动速度 */
        this.Speed = 0;
        /**BOSS属性系数 */
        this.BossMultiple = 0;
        /**召唤系数 */
        this.SummonMultiple = 0;
    }
    return JsonMonsterAttribute;
}());
exports.JsonMonsterAttribute = JsonMonsterAttribute;
var MonsterAttributeManager = /** @class */ (function () {
    function MonsterAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Monster, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterAttributeManager.prototype.getJsonMonsterAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据怪物ID获取怪物名称文本 */
    MonsterAttributeManager.prototype.getMosterName_TextID = function (id) {
        return this.data.get(id).MosterName_TextID;
    };
    /**根据怪物ID获取初始血量 */
    MonsterAttributeManager.prototype.getBaseHP = function (id) {
        return this.data.get(id).BaseHP;
    };
    /**根据怪物ID获取初始攻击力 */
    MonsterAttributeManager.prototype.getBaseAttack = function (id) {
        return this.data.get(id).BaseAttack;
    };
    /**根据怪物ID获取初始攻速 */
    MonsterAttributeManager.prototype.getBaseAttackSpeed = function (id) {
        return this.data.get(id).BaseAttackSpeed;
    };
    /**根据怪物ID获取位置 */
    MonsterAttributeManager.prototype.getArea = function (id) {
        return this.data.get(id).Area;
    };
    /**根据怪物ID获取特性编号 */
    MonsterAttributeManager.prototype.getFeature = function (id) {
        return this.data.get(id).Feature;
    };
    /**根据怪物ID获取移动速度 */
    MonsterAttributeManager.prototype.getSpeed = function (id) {
        return this.data.get(id).Speed;
    };
    /**根据怪物ID获取BOSS属性系数 */
    MonsterAttributeManager.prototype.getBossMultiple = function (id) {
        return this.data.get(id).BossMultiple;
    };
    /**根据怪物ID获取召唤系数 */
    MonsterAttributeManager.prototype.getSummonMultiple = function (id) {
        return this.data.get(id).SummonMultiple;
    };
    /** 静态方法，获取最大的 怪物ID*/
    MonsterAttributeManager.getMaxMonster = function () {
        return 50180;
    };
    MonsterAttributeManager._instance = null;
    return MonsterAttributeManager;
}());
exports.MonsterAttributeManager = MonsterAttributeManager;

cc._RF.pop();