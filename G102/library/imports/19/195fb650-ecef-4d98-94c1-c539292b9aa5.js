"use strict";
cc._RF.push(module, '195fbZQ7O9NmJTBxTkpK5ql', 'ConstantConfiguration');
// Scripts/JsonData/ConstantConfiguration.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstantConfigurationManager = exports.JsonConstantConfiguration = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonConstantConfiguration = /** @class */ (function () {
    function JsonConstantConfiguration() {
        /**编号 */
        this.ID = 0;
        /**值 */
        this.Value = '';
    }
    return JsonConstantConfiguration;
}());
exports.JsonConstantConfiguration = JsonConstantConfiguration;
var ConstantConfigurationManager = /** @class */ (function () {
    function ConstantConfigurationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    ConstantConfigurationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new ConstantConfigurationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    ConstantConfigurationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    ConstantConfigurationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('ConstantConfiguration', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonConstantConfiguration成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonConstantConfiguration();
                jsonData = json[i];
                _this.data.set(jsonData.ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    ConstantConfigurationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    ConstantConfigurationManager.prototype.getJsonConstantConfiguration = function (id) {
        return this.data.get(id);
    };
    /**根据编号获取值 */
    ConstantConfigurationManager.prototype.getValue = function (id) {
        return this.data.get(id).Value;
    };
    /** 静态方法，获取最大的 编号*/
    ConstantConfigurationManager.getMaxID = function () {
        return 5;
    };
    ConstantConfigurationManager._instance = null;
    return ConstantConfigurationManager;
}());
exports.ConstantConfigurationManager = ConstantConfigurationManager;

cc._RF.pop();