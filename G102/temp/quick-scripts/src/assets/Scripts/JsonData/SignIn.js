"use strict";
cc._RF.push(module, 'a2dcc9UBpJAubiz9vZ72sFm', 'SignIn');
// Scripts/JsonData/SignIn.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInManager = exports.SignInType = exports.JsonSignIn = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonSignIn = /** @class */ (function () {
    function JsonSignIn() {
        /**天数ID */
        this.DayID = 0;
        /**天数 */
        this.Day = 0;
        /**类型 */
        this.Daytype = 0;
        /**道具ID */
        this.Item = 0;
        /**数量 */
        this.Num = 0;
    }
    return JsonSignIn;
}());
exports.JsonSignIn = JsonSignIn;
var SignInType;
(function (SignInType) {
    SignInType[SignInType["SavenDay"] = 1] = "SavenDay";
    SignInType[SignInType["Daily29"] = 29] = "Daily29";
    SignInType[SignInType["Daily30"] = 30] = "Daily30";
    SignInType[SignInType["Daily31"] = 31] = "Daily31";
    SignInType[SignInType["Daily28"] = 28] = "Daily28";
})(SignInType = exports.SignInType || (exports.SignInType = {}));
var SignInManager = /** @class */ (function () {
    function SignInManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    SignInManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SignInManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SignInManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SignInManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SignIn', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSignIn成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSignIn();
                jsonData = json[i];
                _this.data.set(jsonData.DayID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SignInManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SignInManager.prototype.getJsonSignIn = function (id) {
        return this.data.get(id);
    };
    /**根据天数ID获取天数 */
    SignInManager.prototype.getDay = function (id) {
        return this.data.get(id).Day;
    };
    /**根据天数ID获取类型 */
    SignInManager.prototype.getDaytype = function (id) {
        return this.data.get(id).Daytype;
    };
    /**根据天数ID获取道具ID */
    SignInManager.prototype.getItem = function (id) {
        return this.data.get(id).Item;
    };
    /**根据天数ID获取数量 */
    SignInManager.prototype.getNum = function (id) {
        return this.data.get(id).Num;
    };
    /** 静态方法，获取最大的 天数ID*/
    SignInManager.getMaxDayID = function () {
        return 528;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    SignInManager.prototype.getDataBySignInType = function (type) {
        var dataList = [];
        this.data.forEach(function (v, k) {
            if (v.Daytype == type) {
                dataList.push(v);
            }
        });
        return dataList;
    };
    SignInManager._instance = null;
    return SignInManager;
}());
exports.SignInManager = SignInManager;

cc._RF.pop();