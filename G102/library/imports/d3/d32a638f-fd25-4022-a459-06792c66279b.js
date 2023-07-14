"use strict";
cc._RF.push(module, 'd32a6OP/SVAIqRZBnksZieb', 'Jackpot');
// Scripts/JsonData/Jackpot.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JackpotManager = exports.JsonJackpot = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var LevelJsonData_1 = require("./LevelJsonData");
var JsonJackpot = /** @class */ (function () {
    function JsonJackpot() {
        /**奖池ID */
        this.JackpotID = 0;
        /**总权重数 */
        this.Weight_Sum = 0;
        /**掉落组列 */
        this.Drop_Array = [];
        /**掉落数量 */
        this.Drop_Num = [];
        /**各个权重 */
        this.Weight = [];
    }
    return JsonJackpot;
}());
exports.JsonJackpot = JsonJackpot;
var JackpotManager = /** @class */ (function () {
    function JackpotManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    JackpotManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new JackpotManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    JackpotManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    JackpotManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('Jackpot', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonJackpot成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonJackpot();
                jsonData = json[i];
                _this.data.set(jsonData.JackpotID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    JackpotManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    JackpotManager.prototype.getJsonJackpot = function (id) {
        return this.data.get(id);
    };
    /**根据奖池ID获取总权重数 */
    JackpotManager.prototype.getWeight_Sum = function (id) {
        return this.data.get(id).Weight_Sum;
    };
    /**根据奖池ID获取掉落组列 */
    JackpotManager.prototype.getDrop_Array = function (id) {
        return this.data.get(id).Drop_Array;
    };
    /**根据奖池ID获取掉落数量 */
    JackpotManager.prototype.getDrop_Num = function (id) {
        return this.data.get(id).Drop_Num;
    };
    /**根据奖池ID获取各个权重 */
    JackpotManager.prototype.getWeight = function (id) {
        return this.data.get(id).Weight;
    };
    /** 静态方法，获取最大的 奖池ID*/
    JackpotManager.getMaxJackpotID = function () {
        return 15020;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /** 根据奖池id 随机获取奖池的一个物品数据*/
    JackpotManager.prototype.getRewardDataById = function (id) {
        var rd = new LevelJsonData_1.RewardData();
        var jj = this.getJsonJackpot(id);
        //根据权重随机
        var totalWeight = jj.Weight_Sum;
        var arrLen = jj.Weight.length;
        //如果总权重为0，就自己算算
        if (totalWeight <= 0) {
            for (var w = 0; w < arrLen; w++) {
                var weightNum = jj.Weight[w];
                totalWeight += weightNum;
            }
        }
        var randWeight = Math.random() * totalWeight;
        var curWeight = 0;
        //判断权重在哪个奖品上
        for (var w = 0; w < arrLen; w++) {
            var weightNum = jj.Weight[w];
            curWeight += weightNum;
            if (randWeight < curWeight) {
                rd.reward_id = jj.Drop_Array[w];
                rd.reward_num = jj.Drop_Num[w];
                break;
            }
        }
        return rd;
    };
    JackpotManager._instance = null;
    return JackpotManager;
}());
exports.JackpotManager = JackpotManager;

cc._RF.pop();