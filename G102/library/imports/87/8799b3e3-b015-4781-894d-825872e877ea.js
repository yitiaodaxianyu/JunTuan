"use strict";
cc._RF.push(module, '8799bPjsBVHgYlNglhy6Hfq', 'DrawCardProbability');
// Scripts/Store/DrawCardProbability.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawCardProbabilityManager = exports.JsonDrawCardProbability = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonDrawCardProbability = /** @class */ (function () {
    function JsonDrawCardProbability() {
        /**概率行ID */
        this.ProbabilityID = 0;
        /**概率文本 */
        this.PropbabilityText = 0;
        /**概率参数 */
        this.PropbabilityNum = 0;
    }
    return JsonDrawCardProbability;
}());
exports.JsonDrawCardProbability = JsonDrawCardProbability;
var DrawCardProbabilityManager = /** @class */ (function () {
    function DrawCardProbabilityManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    DrawCardProbabilityManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new DrawCardProbabilityManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    DrawCardProbabilityManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    DrawCardProbabilityManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('DrawCardProbability', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardProbability成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonDrawCardProbability();
                jsonData = json[i];
                _this.data.set(jsonData.ProbabilityID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    DrawCardProbabilityManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    DrawCardProbabilityManager.prototype.getJsonDrawCardProbability = function (id) {
        return this.data.get(id);
    };
    /**根据概率行ID获取概率文本 */
    DrawCardProbabilityManager.prototype.getPropbabilityText = function (id) {
        return this.data.get(id).PropbabilityText;
    };
    /**根据概率行ID获取概率参数 */
    DrawCardProbabilityManager.prototype.getPropbabilityNum = function (id) {
        return this.data.get(id).PropbabilityNum;
    };
    /** 静态方法，获取最大的 概率行ID*/
    DrawCardProbabilityManager.getMaxProbabilityID = function () {
        return 10;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    DrawCardProbabilityManager.prototype.getData = function () {
        var info = [];
        this.data.forEach(function (v, k) {
            info.push(v);
        });
        return info;
    };
    DrawCardProbabilityManager._instance = null;
    return DrawCardProbabilityManager;
}());
exports.DrawCardProbabilityManager = DrawCardProbabilityManager;

cc._RF.pop();