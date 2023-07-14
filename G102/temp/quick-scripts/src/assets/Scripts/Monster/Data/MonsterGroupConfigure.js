"use strict";
cc._RF.push(module, '233f1dHOxpBRpx3SUgMFz+u', 'MonsterGroupConfigure');
// Scripts/Monster/Data/MonsterGroupConfigure.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterGroupConfigureManager = exports.JsonMonsterGroupConfigure = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterGroupConfigure = /** @class */ (function () {
    function JsonMonsterGroupConfigure() {
        /**怪物组ID */
        this.MonsterGroup = 0;
        /**怪物ID */
        this.MonsterId = [];
        /**怪物数量 */
        this.MonsterNum = [];
        /**刷新间隔 */
        this.RefreshInterval = [];
    }
    return JsonMonsterGroupConfigure;
}());
exports.JsonMonsterGroupConfigure = JsonMonsterGroupConfigure;
var MonsterGroupConfigureManager = /** @class */ (function () {
    function MonsterGroupConfigureManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterGroupConfigureManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterGroupConfigureManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterGroupConfigureManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterGroupConfigureManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterGroupConfigure', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterGroupConfigure成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterGroupConfigure();
                jsonData = json[i];
                _this.data.set(jsonData.MonsterGroup, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterGroupConfigureManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterGroupConfigureManager.prototype.getJsonMonsterGroupConfigure = function (id) {
        return this.data.get(id);
    };
    /**根据怪物组ID获取怪物ID */
    MonsterGroupConfigureManager.prototype.getMonsterId = function (id) {
        return this.data.get(id).MonsterId;
    };
    /**根据怪物组ID获取怪物数量 */
    MonsterGroupConfigureManager.prototype.getMonsterNum = function (id) {
        return this.data.get(id).MonsterNum;
    };
    /**根据怪物组ID获取刷新间隔 */
    MonsterGroupConfigureManager.prototype.getRefreshInterval = function (id) {
        return this.data.get(id).RefreshInterval;
    };
    /** 静态方法，获取最大的 怪物组ID*/
    MonsterGroupConfigureManager.getMaxMonsterGroup = function () {
        return 20;
    };
    MonsterGroupConfigureManager._instance = null;
    return MonsterGroupConfigureManager;
}());
exports.MonsterGroupConfigureManager = MonsterGroupConfigureManager;

cc._RF.pop();