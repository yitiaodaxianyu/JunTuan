"use strict";
cc._RF.push(module, '8db92DLE4tOaZ5WwTNrxe5j', 'MonsterConfigure');
// Scripts/Monster/Data/MonsterConfigure.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterConfigureManager = exports.JsonMonsterConfigure = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterConfigure = /** @class */ (function () {
    function JsonMonsterConfigure() {
        /**怪物ID */
        this.MonsterId = 0;
        /**怪物种类 */
        this.MonsterClass = 0;
        /**皮肤 */
        this.Skin = 0;
        /**强度类型 */
        this.StrengthType = 0;
        /**怪物名文本 */
        this.NameTextId = 0;
        /**介绍文本 */
        this.IntroTextId = 0;
        /**移速 */
        this.Speed = 0;
        /**攻击方式 */
        this.AttackMode = 0;
        /**攻击距离 */
        this.AttackDistance = 0;
        /**基础攻速 */
        this.AttackSpeed = 0;
        /**缩放倍率 */
        this.Scale = 0;
        /**怪物间隔 */
        this.MonsterSpacing = 0;
        /**技能数量 */
        this.SkillNum = 0;
    }
    return JsonMonsterConfigure;
}());
exports.JsonMonsterConfigure = JsonMonsterConfigure;
var MonsterConfigureManager = /** @class */ (function () {
    function MonsterConfigureManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterConfigureManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterConfigureManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterConfigureManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterConfigureManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterConfigure', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterConfigure成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterConfigure();
                jsonData = json[i];
                _this.data.set(jsonData.MonsterId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterConfigureManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterConfigureManager.prototype.getJsonMonsterConfigure = function (id) {
        return this.data.get(id);
    };
    /**根据怪物ID获取怪物种类 */
    MonsterConfigureManager.prototype.getMonsterClass = function (id) {
        return this.data.get(id).MonsterClass;
    };
    /**根据怪物ID获取皮肤 */
    MonsterConfigureManager.prototype.getSkin = function (id) {
        return this.data.get(id).Skin;
    };
    /**根据怪物ID获取强度类型 */
    MonsterConfigureManager.prototype.getStrengthType = function (id) {
        return this.data.get(id).StrengthType;
    };
    /**根据怪物ID获取怪物名文本 */
    MonsterConfigureManager.prototype.getNameTextId = function (id) {
        return this.data.get(id).NameTextId;
    };
    /**根据怪物ID获取介绍文本 */
    MonsterConfigureManager.prototype.getIntroTextId = function (id) {
        return this.data.get(id).IntroTextId;
    };
    /**根据怪物ID获取移速 */
    MonsterConfigureManager.prototype.getSpeed = function (id) {
        return this.data.get(id).Speed;
    };
    /**根据怪物ID获取攻击方式 */
    MonsterConfigureManager.prototype.getAttackMode = function (id) {
        return this.data.get(id).AttackMode;
    };
    /**根据怪物ID获取攻击距离 */
    MonsterConfigureManager.prototype.getAttackDistance = function (id) {
        return this.data.get(id).AttackDistance;
    };
    /**根据怪物ID获取基础攻速 */
    MonsterConfigureManager.prototype.getAttackSpeed = function (id) {
        return this.data.get(id).AttackSpeed;
    };
    /**根据怪物ID获取缩放倍率 */
    MonsterConfigureManager.prototype.getScale = function (id) {
        return this.data.get(id).Scale;
    };
    /**根据怪物ID获取怪物间隔 */
    MonsterConfigureManager.prototype.getMonsterSpacing = function (id) {
        return this.data.get(id).MonsterSpacing;
    };
    /**根据怪物ID获取技能数量 */
    MonsterConfigureManager.prototype.getSkillNum = function (id) {
        return this.data.get(id).SkillNum;
    };
    /** 静态方法，获取最大的 怪物ID*/
    MonsterConfigureManager.getMaxMonsterId = function () {
        return 30871;
    };
    MonsterConfigureManager._instance = null;
    return MonsterConfigureManager;
}());
exports.MonsterConfigureManager = MonsterConfigureManager;

cc._RF.pop();