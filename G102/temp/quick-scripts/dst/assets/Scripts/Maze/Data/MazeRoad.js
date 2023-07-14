
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/Data/MazeRoad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcRGF0YVxcTWF6ZVJvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBR3hEO0lBQUE7UUFDSSxRQUFRO1FBQ0QsUUFBRyxHQUFVLENBQUMsQ0FBRTtRQUN2QixTQUFTO1FBQ0YsT0FBRSxHQUFVLENBQUMsQ0FBRTtRQUN0QixTQUFTO1FBQ0YsT0FBRSxHQUFVLENBQUMsQ0FBRTtRQUN0QixTQUFTO1FBQ0YsT0FBRSxHQUFVLENBQUMsQ0FBRTtJQUMxQixDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLG9DQUFZO0FBV3pCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQTBCLElBQUksQ0FBQztRQUNuQyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUE0RTVDLENBQUM7SUExRWlCLDJCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksZUFBZSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELDhCQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0Esa0NBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDcEYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDO2dCQUNoQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hDO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsNENBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHlDQUFlLEdBQXRCLFVBQXVCLEVBQVM7UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsZUFBZTtJQUNSLCtCQUFLLEdBQVosVUFBYSxFQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDRCxlQUFlO0lBQ1IsK0JBQUssR0FBWixVQUFhLEVBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUNELGVBQWU7SUFDUiwrQkFBSyxHQUFaLFVBQWEsRUFBUztRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUJBQW1CO0lBQ0wseUJBQVMsR0FBdkI7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCx5QkFBeUI7SUFDbEIscUNBQVcsR0FBbEI7UUFDSSxJQUFJLEdBQUcsR0FBRSxJQUFJLEtBQUssRUFBaUIsQ0FBQztRQUNwQyxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3JCLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdCLElBQUksSUFBSSxHQUFDLElBQUksS0FBSyxFQUFFLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUI7WUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQTdFYyx5QkFBUyxHQUFvQixJQUFJLENBQUM7SUErRXJELHNCQUFDO0NBaEZELEFBZ0ZDLElBQUE7QUFoRlksMENBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25NYXplUm9hZCB7XHJcbiAgICAvKipJRCAqL1xyXG4gICAgcHVibGljIHJJZDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuesrDLliJcgKi9cclxuICAgIHB1YmxpYyBjMTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuesrDPliJcgKi9cclxuICAgIHB1YmxpYyBjMjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuesrDTliJcgKi9cclxuICAgIHB1YmxpYyBjMzpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hemVSb2FkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IE1hemVSb2FkTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25NYXplUm9hZD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TWF6ZVJvYWRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTWF6ZVJvYWRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ01hemVSb2FkJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbk1hemVSb2Fk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbk1hemVSb2FkKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5ySWQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25NYXplUm9hZChpZDpudW1iZXIpOkpzb25NYXplUm9hZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uSUTojrflj5bnrKwy5YiXICovXHJcbiAgICBwdWJsaWMgZ2V0YzEoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuYzE7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5JROiOt+WPluesrDPliJcgKi9cclxuICAgIHB1YmxpYyBnZXRjMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5jMjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrklE6I635Y+W56ysNOWIlyAqL1xyXG4gICAgcHVibGljIGdldGMzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLmMzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQgSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhySWQoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG4gICAgcHVibGljIGdldE1hemVSb2FkKCkgOkFycmF5PEFycmF5PG51bWJlcj4+e1xyXG4gICAgICAgIGxldCBhcnIgPW5ldyBBcnJheTxBcnJheTxudW1iZXI+PigpO1xyXG4gICAgICAgIGxldCBsZW49dGhpcy5kYXRhLnNpemU7XHJcbiAgICAgICAgZm9yKGxldCByPTE7IHI8PWxlbjsgcisrKXtcclxuICAgICAgICAgICAgbGV0IGpzb25EYXRhPXRoaXMuZGF0YS5nZXQocilcclxuICAgICAgICAgICAgbGV0IG51bXM9bmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0xOyBpPD0zOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbnVtcy5wdXNoKGpzb25EYXRhW1wiY1wiK2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhcnIucHVzaChudW1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9nKGFycik7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbn1cclxuIl19