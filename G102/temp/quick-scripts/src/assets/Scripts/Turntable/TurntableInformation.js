"use strict";
cc._RF.push(module, '55a8ffQEslKrqDrTSRuxViM', 'TurntableInformation');
// Scripts/Turntable/TurntableInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurntableInformationManager = exports.JsonTurntableInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonTurntableInformation = /** @class */ (function () {
    function JsonTurntableInformation() {
        /**展示位 */
        this.DisplayPosition = 0;
        /**道具ID */
        this.ItemID = 0;
        /**道具数量 */
        this.ItemNum = 0;
    }
    return JsonTurntableInformation;
}());
exports.JsonTurntableInformation = JsonTurntableInformation;
var TurntableInformationManager = /** @class */ (function () {
    function TurntableInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    TurntableInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TurntableInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TurntableInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TurntableInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TurntableInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTurntableInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTurntableInformation();
                jsonData = json[i];
                _this.data.set(jsonData.DisplayPosition, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    TurntableInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TurntableInformationManager.prototype.getJsonTurntableInformation = function (id) {
        return this.data.get(id);
    };
    /**根据展示位获取道具ID */
    TurntableInformationManager.prototype.getItemID = function (id) {
        return this.data.get(id).ItemID;
    };
    /**根据展示位获取道具数量 */
    TurntableInformationManager.prototype.getItemNum = function (id) {
        return this.data.get(id).ItemNum;
    };
    /** 静态方法，获取最大的 展示位*/
    TurntableInformationManager.getMaxDisplayPosition = function () {
        return 6;
    };
    TurntableInformationManager._instance = null;
    return TurntableInformationManager;
}());
exports.TurntableInformationManager = TurntableInformationManager;

cc._RF.pop();