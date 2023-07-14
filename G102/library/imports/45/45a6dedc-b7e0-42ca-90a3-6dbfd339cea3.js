"use strict";
cc._RF.push(module, '45a6d7ct+BCypCjbb/TOc6j', 'MonsterSkill');
// Scripts/Monster/Data/MonsterSkill.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterSkillManager = exports.JsonMonsterSkill = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterSkill = /** @class */ (function () {
    function JsonMonsterSkill() {
        /**怪物技能ID */
        this.MonsterSkill = 0;
        /**怪物ID */
        this.MonsterId = 0;
        /**技能说明 */
        this.SkillIntro = 0;
        /**技能序号 */
        this.SkillNum = 0;
        /**技能等级 */
        this.SkillLevel = 0;
        /**初始冷却时间 */
        this.InitialColdDown = 0;
        /**冷却时间 */
        this.ColdDown = 0;
        /**施法距离 */
        this.CastingRange = 0;
        /**技能参数1 */
        this.SkillValue_1 = 0;
        /**技能参数2 */
        this.SkillValue_2 = 0;
        /**技能参数3 */
        this.SkillValue_3 = 0;
        /**技能参数4 */
        this.SkillValue_4 = 0;
    }
    return JsonMonsterSkill;
}());
exports.JsonMonsterSkill = JsonMonsterSkill;
var MonsterSkillManager = /** @class */ (function () {
    function MonsterSkillManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    MonsterSkillManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterSkillManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterSkillManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterSkillManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterSkill', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterSkill成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterSkill();
                jsonData = json[i];
                _this.data.set(jsonData.MonsterSkill, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterSkillManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterSkillManager.prototype.getJsonMonsterSkill = function (id) {
        return this.data.get(id);
    };
    /**根据怪物技能ID获取怪物ID */
    MonsterSkillManager.prototype.getMonsterId = function (id) {
        return this.data.get(id).MonsterId;
    };
    /**根据怪物技能ID获取技能说明 */
    MonsterSkillManager.prototype.getSkillIntro = function (id) {
        return this.data.get(id).SkillIntro;
    };
    /**根据怪物技能ID获取技能序号 */
    MonsterSkillManager.prototype.getSkillNum = function (id) {
        return this.data.get(id).SkillNum;
    };
    /**根据怪物技能ID获取技能等级 */
    MonsterSkillManager.prototype.getSkillLevel = function (id) {
        return this.data.get(id).SkillLevel;
    };
    /**根据怪物技能ID获取初始冷却时间 */
    MonsterSkillManager.prototype.getInitialColdDown = function (id) {
        return this.data.get(id).InitialColdDown;
    };
    /**根据怪物技能ID获取冷却时间 */
    MonsterSkillManager.prototype.getColdDown = function (id) {
        return this.data.get(id).ColdDown;
    };
    /**根据怪物技能ID获取施法距离 */
    MonsterSkillManager.prototype.getCastingRange = function (id) {
        return this.data.get(id).CastingRange;
    };
    /**根据怪物技能ID获取技能参数1 */
    MonsterSkillManager.prototype.getSkillValue_1 = function (id) {
        return this.data.get(id).SkillValue_1;
    };
    /**根据怪物技能ID获取技能参数2 */
    MonsterSkillManager.prototype.getSkillValue_2 = function (id) {
        return this.data.get(id).SkillValue_2;
    };
    /**根据怪物技能ID获取技能参数3 */
    MonsterSkillManager.prototype.getSkillValue_3 = function (id) {
        return this.data.get(id).SkillValue_3;
    };
    /**根据怪物技能ID获取技能参数4 */
    MonsterSkillManager.prototype.getSkillValue_4 = function (id) {
        return this.data.get(id).SkillValue_4;
    };
    /** 静态方法，获取最大的 怪物技能ID*/
    MonsterSkillManager.getMaxMonsterSkill = function () {
        return 30811201;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param monsterId 怪物ID
     * @param skillNum 技能编号，技能槽位
     * @param skillLevel 技能等级
     */
    MonsterSkillManager.prototype.getId = function (monsterId, skillNum, skillLevel) {
        return monsterId * 1000 + skillNum * 100 + skillLevel;
    };
    MonsterSkillManager._instance = null;
    return MonsterSkillManager;
}());
exports.MonsterSkillManager = MonsterSkillManager;

cc._RF.pop();