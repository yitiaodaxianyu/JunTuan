"use strict";
cc._RF.push(module, 'fd03834GBJHsLTINBhwCG34', 'RogueText');
// Scripts/Maze/Data/RogueText.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueTextManager = exports.JsonRogueText = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonRogueText = /** @class */ (function () {
    function JsonRogueText() {
        /**格子类型 */
        this.HexagonType = 0;
        /**标题文本ID */
        this.Roguetitle_ID = 0;
        /**文本内容ID */
        this.RogueText_ID = 0;
    }
    return JsonRogueText;
}());
exports.JsonRogueText = JsonRogueText;
var RogueTextManager = /** @class */ (function () {
    function RogueTextManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    RogueTextManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RogueTextManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RogueTextManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    RogueTextManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('RogueText', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonRogueText成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonRogueText();
                jsonData = json[i];
                _this.data.set(jsonData.HexagonType, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    RogueTextManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    RogueTextManager.prototype.getJsonRogueText = function (id) {
        return this.data.get(id);
    };
    /**根据格子类型获取标题文本ID */
    RogueTextManager.prototype.getRoguetitle_ID = function (id) {
        return this.data.get(id).Roguetitle_ID;
    };
    /**根据格子类型获取文本内容ID */
    RogueTextManager.prototype.getRogueText_ID = function (id) {
        return this.data.get(id).RogueText_ID;
    };
    /** 静态方法，获取最大的 格子类型*/
    RogueTextManager.getMaxHexagonType = function () {
        return 5;
    };
    RogueTextManager._instance = null;
    return RogueTextManager;
}());
exports.RogueTextManager = RogueTextManager;

cc._RF.pop();