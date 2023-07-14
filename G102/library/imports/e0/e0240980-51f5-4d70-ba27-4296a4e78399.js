"use strict";
cc._RF.push(module, 'e0240mAUfVNcLonQpak54OZ', 'CombatEffectiveness');
// Scripts/Hero/Data/CombatEffectiveness.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CombatEffectivenessManager = exports.JsonCombatEffectiveness = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonCombatEffectiveness = /** @class */ (function () {
    function JsonCombatEffectiveness() {
        /**属性ID */
        this.Attribute = 0;
        /**转换系数 */
        this.ConversionFactor = 0;
    }
    return JsonCombatEffectiveness;
}());
exports.JsonCombatEffectiveness = JsonCombatEffectiveness;
var CombatEffectivenessManager = /** @class */ (function () {
    function CombatEffectivenessManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CombatEffectivenessManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CombatEffectivenessManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CombatEffectivenessManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CombatEffectivenessManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CombatEffectiveness', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCombatEffectiveness成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCombatEffectiveness();
                jsonData = json[i];
                _this.data.set(jsonData.Attribute, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CombatEffectivenessManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CombatEffectivenessManager.prototype.getJsonCombatEffectiveness = function (id) {
        return this.data.get(id);
    };
    /**根据属性ID获取转换系数 */
    CombatEffectivenessManager.prototype.getConversionFactor = function (id) {
        return this.data.get(id).ConversionFactor;
    };
    /** 静态方法，获取最大的 属性ID*/
    CombatEffectivenessManager.getMaxAttribute = function () {
        return 9;
    };
    CombatEffectivenessManager._instance = null;
    return CombatEffectivenessManager;
}());
exports.CombatEffectivenessManager = CombatEffectivenessManager;

cc._RF.pop();