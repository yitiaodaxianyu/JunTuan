"use strict";
cc._RF.push(module, '3522enOTQVDQp6X75Qk6URa', 'MazeRoad');
// Scripts/Maze/Data/MazeRoad.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MazeRoadManager = exports.JsonMazeRoad = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMazeRoad = /** @class */ (function () {
    function JsonMazeRoad() {
        /**ID */
        this.rId = 0;
        /**第2列 */
        this.c1 = 0;
        /**第3列 */
        this.c2 = 0;
        /**第4列 */
        this.c3 = 0;
    }
    return JsonMazeRoad;
}());
exports.JsonMazeRoad = JsonMazeRoad;
var MazeRoadManager = /** @class */ (function () {
    function MazeRoadManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    MazeRoadManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MazeRoadManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MazeRoadManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MazeRoadManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MazeRoad', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMazeRoad成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMazeRoad();
                jsonData = json[i];
                _this.data.set(jsonData.rId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MazeRoadManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MazeRoadManager.prototype.getJsonMazeRoad = function (id) {
        return this.data.get(id);
    };
    /**根据ID获取第2列 */
    MazeRoadManager.prototype.getc1 = function (id) {
        return this.data.get(id).c1;
    };
    /**根据ID获取第3列 */
    MazeRoadManager.prototype.getc2 = function (id) {
        return this.data.get(id).c2;
    };
    /**根据ID获取第4列 */
    MazeRoadManager.prototype.getc3 = function (id) {
        return this.data.get(id).c3;
    };
    /** 静态方法，获取最大的 ID*/
    MazeRoadManager.getMaxrId = function () {
        return 1;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    MazeRoadManager.prototype.getMazeRoad = function () {
        var arr = new Array();
        var len = this.data.size;
        for (var r = 1; r <= len; r++) {
            var jsonData = this.data.get(r);
            var nums = new Array();
            for (var i = 1; i <= 3; i++) {
                nums.push(jsonData["c" + i]);
            }
            arr.push(nums);
        }
        cc.log(arr);
        return arr;
    };
    MazeRoadManager._instance = null;
    return MazeRoadManager;
}());
exports.MazeRoadManager = MazeRoadManager;

cc._RF.pop();