"use strict";
cc._RF.push(module, '09135Ac4a9LsL+x1qHyk71Y', 'SignNum');
// Scripts/JsonData/SignNum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignNumManager = exports.JsonSignNum = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonSignNum = /** @class */ (function () {
    function JsonSignNum() {
        /**累计天数ID */
        this.DayNumID = 0;
        /**累计签到天数 */
        this.DayNum = 0;
        /**道具ID */
        this.Item = 0;
        /**数量 */
        this.Num = 0;
    }
    return JsonSignNum;
}());
exports.JsonSignNum = JsonSignNum;
var SignNumManager = /** @class */ (function () {
    function SignNumManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SignNumManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SignNumManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SignNumManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SignNumManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SignNum', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSignNum成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSignNum();
                jsonData = json[i];
                _this.data.set(jsonData.DayNumID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SignNumManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SignNumManager.prototype.getJsonSignNum = function (id) {
        return this.data.get(id);
    };
    /**根据累计天数ID获取累计签到天数 */
    SignNumManager.prototype.getDayNum = function (id) {
        return this.data.get(id).DayNum;
    };
    /**根据累计天数ID获取道具ID */
    SignNumManager.prototype.getItem = function (id) {
        return this.data.get(id).Item;
    };
    /**根据累计天数ID获取数量 */
    SignNumManager.prototype.getNum = function (id) {
        return this.data.get(id).Num;
    };
    /** 静态方法，获取最大的 累计天数ID*/
    SignNumManager.getMaxDayNumID = function () {
        return 605;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SignNumManager.prototype.getJsonData = function () {
        var info = [];
        this.data.forEach(function (v, k) {
            info.push(v);
        });
        return info;
    };
    SignNumManager._instance = null;
    return SignNumManager;
}());
exports.SignNumManager = SignNumManager;

cc._RF.pop();