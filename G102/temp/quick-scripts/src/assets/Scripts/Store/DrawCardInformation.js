"use strict";
cc._RF.push(module, 'f7149ONlu1HUoLbLKMNIkos', 'DrawCardInformation');
// Scripts/Store/DrawCardInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawCardInformationManager = exports.JsonDrawCardInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonDrawCardInformation = /** @class */ (function () {
    function JsonDrawCardInformation() {
        /**卡池ID */
        this.CardPoolID = 0;
        /**卡池类型 */
        this.CardPoolType = 0;
        /**单抽道具ID_1 */
        this.OneDrawPropsID_1 = 0;
        /**单抽道具消耗_1 */
        this.OneDrawPropsSpend_1 = 0;
        /**十连抽道具1消耗 */
        this.TenDrawPropsSpend_1 = 0;
        /**单抽道具ID_2 */
        this.OneDrawPropsID_2 = 0;
        /**单抽道具消耗_2 */
        this.OneDrawPropsSpend_2 = 0;
        /**十连抽道具2消耗 */
        this.TenDrawPropsSpend_2 = 0;
    }
    return JsonDrawCardInformation;
}());
exports.JsonDrawCardInformation = JsonDrawCardInformation;
var DrawCardInformationManager = /** @class */ (function () {
    function DrawCardInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    DrawCardInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DrawCardInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DrawCardInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DrawCardInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DrawCardInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDrawCardInformation();
                jsonData = json[i];
                _this.data.set(jsonData.CardPoolID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DrawCardInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DrawCardInformationManager.prototype.getJsonDrawCardInformation = function (id) {
        return this.data.get(id);
    };
    /**根据卡池ID获取卡池类型 */
    DrawCardInformationManager.prototype.getCardPoolType = function (id) {
        return this.data.get(id).CardPoolType;
    };
    /**根据卡池ID获取单抽道具ID_1 */
    DrawCardInformationManager.prototype.getOneDrawPropsID_1 = function (id) {
        return this.data.get(id).OneDrawPropsID_1;
    };
    /**根据卡池ID获取单抽道具消耗_1 */
    DrawCardInformationManager.prototype.getOneDrawPropsSpend_1 = function (id) {
        return this.data.get(id).OneDrawPropsSpend_1;
    };
    /**根据卡池ID获取十连抽道具1消耗 */
    DrawCardInformationManager.prototype.getTenDrawPropsSpend_1 = function (id) {
        return this.data.get(id).TenDrawPropsSpend_1;
    };
    /**根据卡池ID获取单抽道具ID_2 */
    DrawCardInformationManager.prototype.getOneDrawPropsID_2 = function (id) {
        return this.data.get(id).OneDrawPropsID_2;
    };
    /**根据卡池ID获取单抽道具消耗_2 */
    DrawCardInformationManager.prototype.getOneDrawPropsSpend_2 = function (id) {
        return this.data.get(id).OneDrawPropsSpend_2;
    };
    /**根据卡池ID获取十连抽道具2消耗 */
    DrawCardInformationManager.prototype.getTenDrawPropsSpend_2 = function (id) {
        return this.data.get(id).TenDrawPropsSpend_2;
    };
    /** 静态方法，获取最大的 卡池ID*/
    DrawCardInformationManager.getMaxCardPoolID = function () {
        return 3001;
    };
    DrawCardInformationManager._instance = null;
    return DrawCardInformationManager;
}());
exports.DrawCardInformationManager = DrawCardInformationManager;

cc._RF.pop();