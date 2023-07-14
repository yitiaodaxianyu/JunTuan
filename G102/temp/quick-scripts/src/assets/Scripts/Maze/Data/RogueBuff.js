"use strict";
cc._RF.push(module, 'bf497XVUbRLfI+3HvYqelbV', 'RogueBuff');
// Scripts/Maze/Data/RogueBuff.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueBuffManager = exports.JsonRogueBuff = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueBuff = /** @class */ (function () {
    function JsonRogueBuff() {
        /**战利品ID */
        this.RogueBuff_ID = 0;
        /**战利品品质 */
        this.RogueBuff_Quality = 0;
        /**战利品名称 */
        this.RogueBuff_Name = 0;
        /**战利品文本1_ID */
        this.RogueBuffText_ID = 0;
        /**战利品类型 */
        this.RogueBuff_Type = 0;
        /**战利品加成1 */
        this.RogueBuff1_Value = 0;
        /**战利品加成2 */
        this.RogueBuff2_Value = 0;
        /**战利品加成3 */
        this.RogueBuff3_Value = 0;
    }
    return JsonRogueBuff;
}());
exports.JsonRogueBuff = JsonRogueBuff;
var RogueBuffManager = /** @class */ (function () {
    function RogueBuffManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    RogueBuffManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueBuffManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueBuffManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueBuffManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueBuff', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueBuff成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueBuff();
                jsonData = json[i];
                _this.data.set(jsonData.RogueBuff_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueBuffManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueBuffManager.prototype.getJsonRogueBuff = function (id) {
        return this.data.get(id);
    };
    /**根据战利品ID获取战利品品质 */
    RogueBuffManager.prototype.getRogueBuff_Quality = function (id) {
        return this.data.get(id).RogueBuff_Quality;
    };
    /**根据战利品ID获取战利品名称 */
    RogueBuffManager.prototype.getRogueBuff_Name = function (id) {
        return this.data.get(id).RogueBuff_Name;
    };
    /**根据战利品ID获取战利品文本1_ID */
    RogueBuffManager.prototype.getRogueBuffText_ID = function (id) {
        return this.data.get(id).RogueBuffText_ID;
    };
    /**根据战利品ID获取战利品类型 */
    RogueBuffManager.prototype.getRogueBuff_Type = function (id) {
        return this.data.get(id).RogueBuff_Type;
    };
    /**根据战利品ID获取战利品加成1 */
    RogueBuffManager.prototype.getRogueBuff1_Value = function (id) {
        return this.data.get(id).RogueBuff1_Value;
    };
    /**根据战利品ID获取战利品加成2 */
    RogueBuffManager.prototype.getRogueBuff2_Value = function (id) {
        return this.data.get(id).RogueBuff2_Value;
    };
    /**根据战利品ID获取战利品加成3 */
    RogueBuffManager.prototype.getRogueBuff3_Value = function (id) {
        return this.data.get(id).RogueBuff3_Value;
    };
    /** 静态方法，获取最大的 战利品ID*/
    RogueBuffManager.getMaxRogueBuff_ID = function () {
        return 9003;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     *
     * @param excludeList 排除列表，当id存在时，不加入列表中
     * @returns 返回可以参与随机的列表
     */
    RogueBuffManager.prototype.getBuffArr = function (excludeList) {
        var buffArr = [[], [], []];
        //把相同品质的放一起
        this.data.forEach(function (jsonData) {
            if (excludeList.indexOf(jsonData.RogueBuff_ID) == -1) {
                buffArr[jsonData.RogueBuff_Quality - 1].push(jsonData.RogueBuff_ID);
            }
        });
        return buffArr;
    };
    RogueBuffManager.prototype.getBuffIdList = function () {
        var buffList = [];
        //把相同品质的放一起
        this.data.forEach(function (jsonData) {
            buffList.push(jsonData.RogueBuff_ID);
        });
        return buffList;
    };
    RogueBuffManager.prototype.getData = function () {
        return this.data;
    };
    RogueBuffManager._instance = null;
    return RogueBuffManager;
}());
exports.RogueBuffManager = RogueBuffManager;

cc._RF.pop();