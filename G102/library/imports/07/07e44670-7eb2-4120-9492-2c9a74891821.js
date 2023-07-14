"use strict";
cc._RF.push(module, '07e44ZwfrJBIJSSLJp0iRgh', 'JackpotCollection');
// Scripts/JsonData/JackpotCollection.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JackpotCollectionManager = exports.JsonJackpotCollection = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonJackpotCollection = /** @class */ (function () {
    function JsonJackpotCollection() {
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
    return JsonJackpotCollection;
}());
exports.JsonJackpotCollection = JsonJackpotCollection;
var JackpotCollectionManager = /** @class */ (function () {
    function JackpotCollectionManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    JackpotCollectionManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new JackpotCollectionManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    JackpotCollectionManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    JackpotCollectionManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('JackpotCollection', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonJackpotCollection成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonJackpotCollection();
                jsonData = json[i];
                _this.data.set(jsonData.JackpotID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    JackpotCollectionManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    JackpotCollectionManager.prototype.getJsonJackpotCollection = function (id) {
        return this.data.get(id);
    };
    /**根据奖池ID获取总权重数 */
    JackpotCollectionManager.prototype.getWeight_Sum = function (id) {
        return this.data.get(id).Weight_Sum;
    };
    /**根据奖池ID获取掉落组列 */
    JackpotCollectionManager.prototype.getDrop_Array = function (id) {
        return this.data.get(id).Drop_Array;
    };
    /**根据奖池ID获取掉落数量 */
    JackpotCollectionManager.prototype.getDrop_Num = function (id) {
        return this.data.get(id).Drop_Num;
    };
    /**根据奖池ID获取各个权重 */
    JackpotCollectionManager.prototype.getWeight = function (id) {
        return this.data.get(id).Weight;
    };
    /** 静态方法，获取最大的 奖池ID*/
    JackpotCollectionManager.getMaxJackpotID = function () {
        return 1010002;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param jackpotCollectID 奖池集id
     * @param jackpotID 奖池id
     */
    JackpotCollectionManager.prototype.getRateByJackpotId = function (jackpotCollectID, jackpotID) {
        var rate = 0;
        var jj = this.getJsonJackpotCollection(jackpotCollectID);
        var totalWeight = jj.Weight_Sum;
        var arrLen = jj.Weight.length;
        //如果总权重为0，就自己算算
        if (totalWeight <= 0) {
            for (var w = 0; w < arrLen; w++) {
                var weightNum = jj.Weight[w];
                totalWeight += weightNum;
            }
        }
        var index = jj.Drop_Array.indexOf(jackpotID);
        if (index != -1) {
            rate = jj.Weight[index] / totalWeight;
        }
        return rate;
    };
    /** 根据奖池集id 随机获取奖池id*/
    JackpotCollectionManager.prototype.getJackpotIdByJCId = function (id) {
        var jId = 0;
        var jj = this.getJsonJackpotCollection(id);
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
                jId = jj.Drop_Array[w];
                break;
            }
        }
        return jId;
    };
    JackpotCollectionManager._instance = null;
    return JackpotCollectionManager;
}());
exports.JackpotCollectionManager = JackpotCollectionManager;

cc._RF.pop();