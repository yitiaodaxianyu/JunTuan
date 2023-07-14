"use strict";
cc._RF.push(module, 'e32d11+9YtOtotlGh9P0XGw', 'TextManagement');
// Scripts/JsonData/TextManagement.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextManagementManager = exports.JsonTextManagement = void 0;
var Constants_1 = require("../Constants");
var LoadManager_1 = require("../Loading/LoadManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var UserData_1 = require("../UserData");
var JsonTextManagement = /** @class */ (function () {
    function JsonTextManagement() {
        /**文本ID */
        this.Text_ID = 0;
        /**英语 */
        this.English = '';
        /**汉语 */
        this.Chinese = '';
        /**印尼语 */
        this.Indonesian = '';
        /**俄语 */
        this.Russian = '';
        /**泰语 */
        this.Thai = '';
        /**韩国 */
        this.Korea = '';
    }
    return JsonTextManagement;
}());
exports.JsonTextManagement = JsonTextManagement;
var TextManagementManager = /** @class */ (function () {
    function TextManagementManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    TextManagementManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TextManagementManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    TextManagementManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    TextManagementManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('TextManagement', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonTextManagement成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonTextManagement();
                jsonData = json[i];
                _this.data.set(jsonData.Text_ID, jsonData);
            }
            _this.is_load_completed = true;
            UserData_1.default.getInstance().HttpPostCheckVersion();
        });
    };
    /**加载是否完成 */
    TextManagementManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    TextManagementManager.prototype.getJsonTextManagement = function (id) {
        return this.data.get(id);
    };
    /**根据文本ID获取英语 */
    TextManagementManager.prototype.getEnglish = function (id) {
        return this.data.get(id).English;
    };
    /**根据文本ID获取汉语 */
    TextManagementManager.prototype.getChinese = function (id) {
        return this.data.get(id).Chinese;
    };
    /**根据文本ID获取印尼语 */
    TextManagementManager.prototype.getIndonesian = function (id) {
        return this.data.get(id).Indonesian;
    };
    /**根据文本ID获取俄语 */
    TextManagementManager.prototype.getRussian = function (id) {
        return this.data.get(id).Russian;
    };
    /**根据文本ID获取泰语 */
    TextManagementManager.prototype.getThai = function (id) {
        return this.data.get(id).Thai;
    };
    /**根据文本ID获取韩国 */
    TextManagementManager.prototype.getKorea = function (id) {
        return this.data.get(id).Korea;
    };
    /** 静态方法，获取最大的 文本ID*/
    TextManagementManager.getMaxText_ID = function () {
        return 1600010;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /*获得富文本字符串
    * textId 文本id
    * value 数值
    * valueType 数值类型
    */
    TextManagementManager.getRichString = function (textId, value, valueType) {
        //获取文本内容，查找特殊符号~替换数值
        var textStr = LanguageManager_1.default.getInstance().getStrByTextId(textId);
        var valueStr = this.getValueUnit(value, valueType);
        //加上色值
        valueStr = this.getColorStr(valueStr);
        var newStr = textStr.replace("~", valueStr);
        return newStr;
    };
    /**根据数值和数值类型获得数值+单位字符串 */
    TextManagementManager.getValueUnit = function (value, type) {
        switch (type) {
            case Constants_1.ValueType.None: return value.toFixed(1) + Constants_1.ValueUnit.None;
            case Constants_1.ValueType.Percent: return (value * 100).toFixed(1) + Constants_1.ValueUnit.Percent;
            case Constants_1.ValueType.Thousandths: return (value * 100).toFixed(1) + Constants_1.ValueUnit.Thousandths;
            case Constants_1.ValueType.Second: return value.toFixed(1) + Constants_1.ValueUnit.Second;
        }
    };
    /**返回适合富文本的字符串，默认绿色 */
    TextManagementManager.getColorStr = function (str) {
        return '<color=green>' + str + '</color>';
    };
    TextManagementManager._instance = null;
    return TextManagementManager;
}());
exports.TextManagementManager = TextManagementManager;

cc._RF.pop();