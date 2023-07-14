"use strict";
cc._RF.push(module, '68abe56ILVEDIwcOZatZacO', 'MonsterManual');
// Scripts/Monster/Data/MonsterManual.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterManualManager = exports.JsonMonsterManual = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterManual = /** @class */ (function () {
    function JsonMonsterManual() {
        /**怪物编号 */
        this.Monster = 0;
        /**消灭数量 */
        this.KillNumber = [];
        /**钻石奖励 */
        this.DiamondReward = [];
        /**怪物骨骼资源 */
        this.BoneResource = 0;
    }
    return JsonMonsterManual;
}());
exports.JsonMonsterManual = JsonMonsterManual;
var MonsterManualManager = /** @class */ (function () {
    function MonsterManualManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterManualManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterManualManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterManualManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterManualManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterManual', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterManual成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterManual();
                jsonData = json[i];
                _this.data.set(jsonData.Monster, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterManualManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterManualManager.prototype.getJsonMonsterManual = function (id) {
        return this.data.get(id);
    };
    /**根据怪物编号获取消灭数量 */
    MonsterManualManager.prototype.getKillNumber = function (id) {
        return this.data.get(id).KillNumber;
    };
    /**根据怪物编号获取钻石奖励 */
    MonsterManualManager.prototype.getDiamondReward = function (id) {
        return this.data.get(id).DiamondReward;
    };
    /**根据怪物编号获取怪物骨骼资源 */
    MonsterManualManager.prototype.getBoneResource = function (id) {
        return this.data.get(id).BoneResource;
    };
    /** 静态方法，获取最大的 怪物编号*/
    MonsterManualManager.getMaxMonster = function () {
        return 50170;
    };
    MonsterManualManager._instance = null;
    return MonsterManualManager;
}());
exports.MonsterManualManager = MonsterManualManager;

cc._RF.pop();