"use strict";
cc._RF.push(module, '74b9bKj2SRBxp6eEhLmSznD', 'EndlessBuff');
// Scripts/copy/endlesschallenges/EndlessBuff.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndlessBuffManager = exports.JsonEndlessBuff = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var MyTool_1 = require("../../Tools/MyTool");
var JsonEndlessBuff = /** @class */ (function () {
    function JsonEndlessBuff() {
        /**无尽BUff */
        this.EndlessBuff = 0;
        /**强度级别 */
        this.Rarity = 0;
        /**类型 */
        this.Type = 0;
        /**参数 */
        this.Parameter = 0;
        /**权重 */
        this.Weight = 0;
    }
    return JsonEndlessBuff;
}());
exports.JsonEndlessBuff = JsonEndlessBuff;
var EndlessBuffManager = /** @class */ (function () {
    function EndlessBuffManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EndlessBuffManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EndlessBuffManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EndlessBuffManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EndlessBuffManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EndlessBuff', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessBuff成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEndlessBuff();
                jsonData = json[i];
                _this.data.set(jsonData.EndlessBuff, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EndlessBuffManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EndlessBuffManager.prototype.getJsonEndlessBuff = function (id) {
        return this.data.get(id);
    };
    /**根据无尽BUff获取强度级别 */
    EndlessBuffManager.prototype.getRarity = function (id) {
        return this.data.get(id).Rarity;
    };
    /**根据无尽BUff获取类型 */
    EndlessBuffManager.prototype.getType = function (id) {
        return this.data.get(id).Type;
    };
    /**根据无尽BUff获取参数 */
    EndlessBuffManager.prototype.getParameter = function (id) {
        return this.data.get(id).Parameter;
    };
    /**根据无尽BUff获取权重 */
    EndlessBuffManager.prototype.getWeight = function (id) {
        return this.data.get(id).Weight;
    };
    /** 静态方法，获取最大的 无尽BUff*/
    EndlessBuffManager.getMaxEndlessBuff = function () {
        return 511;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**根据权重取得三个buff */
    EndlessBuffManager.prototype.getThreeWeight = function () {
        var Weight = [];
        var key = [];
        this.data.forEach(function (element) {
            Weight.push(element.Weight);
            key.push(element.EndlessBuff);
        });
        var myweight = MyTool_1.default.getWeightIndexs(Weight, 3);
        var mykey = [];
        for (var index = 0; index < myweight.length; index++) {
            mykey.push(key[myweight[index]]);
        }
        return mykey;
    };
    /**根据权重取得一个橙色及以上的buff */
    EndlessBuffManager.prototype.getWeightOrange = function () {
        var Weight = [];
        var key = [];
        this.data.forEach(function (element) {
            if (element.Rarity >= 4) {
                Weight.push(element.Weight);
                key.push(element.EndlessBuff);
            }
        });
        var myweight = MyTool_1.default.getWeightIndexs(Weight, 1);
        var mykey = 0;
        mykey = key[myweight[0]];
        return mykey;
    };
    EndlessBuffManager._instance = null;
    return EndlessBuffManager;
}());
exports.EndlessBuffManager = EndlessBuffManager;

cc._RF.pop();