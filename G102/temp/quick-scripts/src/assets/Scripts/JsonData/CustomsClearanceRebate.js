"use strict";
cc._RF.push(module, '21ab7XYIVRMwqc7a+8pE57S', 'CustomsClearanceRebate');
// Scripts/JsonData/CustomsClearanceRebate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomsClearanceRebateManager = exports.JsonCustomsClearanceRebate = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCustomsClearanceRebate = /** @class */ (function () {
    function JsonCustomsClearanceRebate() {
        /**奖励ID */
        this.RewardID = 0;
        /**获得钻石 */
        this.GetGem = 0;
        /**通关章节 */
        this.CompleteChapter = 0;
        /**谷歌计费ID */
        this.ProductId = '';
    }
    return JsonCustomsClearanceRebate;
}());
exports.JsonCustomsClearanceRebate = JsonCustomsClearanceRebate;
var CustomsClearanceRebateManager = /** @class */ (function () {
    function CustomsClearanceRebateManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CustomsClearanceRebateManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CustomsClearanceRebateManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CustomsClearanceRebateManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CustomsClearanceRebateManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CustomsClearanceRebate', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCustomsClearanceRebate成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCustomsClearanceRebate();
                jsonData = json[i];
                _this.data.set(jsonData.RewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CustomsClearanceRebateManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CustomsClearanceRebateManager.prototype.getJsonCustomsClearanceRebate = function (id) {
        return this.data.get(id);
    };
    /**根据奖励ID获取获得钻石 */
    CustomsClearanceRebateManager.prototype.getGetGem = function (id) {
        return this.data.get(id).GetGem;
    };
    /**根据奖励ID获取通关章节 */
    CustomsClearanceRebateManager.prototype.getCompleteChapter = function (id) {
        return this.data.get(id).CompleteChapter;
    };
    /**根据奖励ID获取谷歌计费ID */
    CustomsClearanceRebateManager.prototype.getProductId = function (id) {
        return this.data.get(id).ProductId;
    };
    /** 静态方法，获取最大的 奖励ID*/
    CustomsClearanceRebateManager.getMaxRewardID = function () {
        return 10;
    };
    CustomsClearanceRebateManager._instance = null;
    return CustomsClearanceRebateManager;
}());
exports.CustomsClearanceRebateManager = CustomsClearanceRebateManager;

cc._RF.pop();