"use strict";
cc._RF.push(module, '87f16CjF0tAG4m3sX3MytRj', 'EggCumulative');
// Scripts/TakeEgg/EggCumulative.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EggCumulativeManager = exports.JsonEggCumulative = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonEggCumulative = /** @class */ (function () {
    function JsonEggCumulative() {
        /**累计次数奖励ID */
        this.CumulativeEggsRewardID = 0;
        /**开蛋池类型 */
        this.EggsType = 0;
        /**累计开蛋次数 */
        this.CumulativeEggsDrawingTimes = 0;
        /**道具ID */
        this.ItemID = 0;
        /**数量 */
        this.RewardNum = 0;
    }
    return JsonEggCumulative;
}());
exports.JsonEggCumulative = JsonEggCumulative;
var EggCumulativeManager = /** @class */ (function () {
    function EggCumulativeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EggCumulativeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EggCumulativeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EggCumulativeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EggCumulativeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EggCumulative', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEggCumulative成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEggCumulative();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeEggsRewardID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EggCumulativeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EggCumulativeManager.prototype.getJsonEggCumulative = function (id) {
        return this.data.get(id);
    };
    /**根据累计次数奖励ID获取开蛋池类型 */
    EggCumulativeManager.prototype.getEggsType = function (id) {
        return this.data.get(id).EggsType;
    };
    /**根据累计次数奖励ID获取累计开蛋次数 */
    EggCumulativeManager.prototype.getCumulativeEggsDrawingTimes = function (id) {
        return this.data.get(id).CumulativeEggsDrawingTimes;
    };
    /**根据累计次数奖励ID获取道具ID */
    EggCumulativeManager.prototype.getItemID = function (id) {
        return this.data.get(id).ItemID;
    };
    /**根据累计次数奖励ID获取数量 */
    EggCumulativeManager.prototype.getRewardNum = function (id) {
        return this.data.get(id).RewardNum;
    };
    /** 静态方法，获取最大的 累计次数奖励ID*/
    EggCumulativeManager.getMaxCumulativeEggsRewardID = function () {
        return 200020;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 根据许愿池类型获取累计奖励列表
     * @param type
     * @returns
     */
    EggCumulativeManager.prototype.getTakeEggRewardList = function (type) {
        var arr = new Array();
        this.data.forEach(function (v, k) {
            if (v.EggsType == type) {
                arr.push(v);
            }
        });
        return arr;
    };
    EggCumulativeManager._instance = null;
    return EggCumulativeManager;
}());
exports.EggCumulativeManager = EggCumulativeManager;

cc._RF.pop();