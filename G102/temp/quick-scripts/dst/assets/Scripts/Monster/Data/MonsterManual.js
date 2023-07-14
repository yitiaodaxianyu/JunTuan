
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/Data/MonsterManual.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '68abe56ILVEDIwcOZatZacO', 'MonsterManual');
// Scripts/Monster/Data/MonsterManual.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterManualManager = exports.JsonMonsterManual = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonMonsterManual = /** @class */ (function () {
    function JsonMonsterManual() {
        /**怪物编号 */
        this.Monster = 0;
        /**消灭数量 */
        this.KillNumber = [];
        /**钻石奖励 */
        this.DiamondReward = [];
        /**怪物骨骼资源 */
        this.BoneResource = 0;
    }
    return JsonMonsterManual;
}());
exports.JsonMonsterManual = JsonMonsterManual;
var MonsterManualManager = /** @class */ (function () {
    function MonsterManualManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    MonsterManualManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MonsterManualManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    MonsterManualManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    MonsterManualManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('MonsterManual', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterManual成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonMonsterManual();
                jsonData = json[i];
                _this.data.set(jsonData.Monster, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    MonsterManualManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    MonsterManualManager.prototype.getJsonMonsterManual = function (id) {
        return this.data.get(id);
    };
    /**根据怪物编号获取消灭数量 */
    MonsterManualManager.prototype.getKillNumber = function (id) {
        return this.data.get(id).KillNumber;
    };
    /**根据怪物编号获取钻石奖励 */
    MonsterManualManager.prototype.getDiamondReward = function (id) {
        return this.data.get(id).DiamondReward;
    };
    /**根据怪物编号获取怪物骨骼资源 */
    MonsterManualManager.prototype.getBoneResource = function (id) {
        return this.data.get(id).BoneResource;
    };
    /** 静态方法，获取最大的 怪物编号*/
    MonsterManualManager.getMaxMonster = function () {
        return 50170;
    };
    MonsterManualManager._instance = null;
    return MonsterManualManager;
}());
exports.MonsterManualManager = MonsterManualManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcRGF0YVxcTW9uc3Rlck1hbnVhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxlQUFVLEdBQVksRUFBRSxDQUFFO1FBQ2pDLFVBQVU7UUFDSCxrQkFBYSxHQUFZLEVBQUUsQ0FBRTtRQUNwQyxZQUFZO1FBQ0wsaUJBQVksR0FBVSxDQUFDLENBQUU7SUFDcEMsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSw4Q0FBaUI7QUFXOUI7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBK0IsSUFBSSxDQUFDO1FBQ3hDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQTREeEMseUJBQXlCO0lBRzdCLENBQUM7SUE3RGlCLGdDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsbUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSx1Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUN6RixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFDckMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsQ0FBQzthQUM1QztZQUNELEtBQUksQ0FBQyxpQkFBaUIsR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtJQUNMLGlEQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxzQkFBc0I7SUFDZixtREFBb0IsR0FBM0IsVUFBNEIsRUFBUztRQUNqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxrQkFBa0I7SUFDWCw0Q0FBYSxHQUFwQixVQUFxQixFQUFTO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCwrQ0FBZ0IsR0FBdkIsVUFBd0IsRUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMzQyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsOENBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBRUQscUJBQXFCO0lBQ1Asa0NBQWEsR0FBM0I7UUFDSSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBN0RjLDhCQUFTLEdBQXlCLElBQUksQ0FBQztJQWtFMUQsMkJBQUM7Q0FuRUQsQUFtRUMsSUFBQTtBQW5FWSxvREFBb0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25Nb25zdGVyTWFudWFsIHtcclxuICAgIC8qKuaAqueJqee8luWPtyAqL1xyXG4gICAgcHVibGljIE1vbnN0ZXI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojnga3mlbDph48gKi9cclxuICAgIHB1YmxpYyBLaWxsTnVtYmVyOm51bWJlcltdID0gW10gO1xyXG4gICAgLyoq6ZK755+z5aWW5YqxICovXHJcbiAgICBwdWJsaWMgRGlhbW9uZFJld2FyZDpudW1iZXJbXSA9IFtdIDtcclxuICAgIC8qKuaAqueJqemqqOmqvOi1hOa6kCAqL1xyXG4gICAgcHVibGljIEJvbmVSZXNvdXJjZTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vbnN0ZXJNYW51YWxNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTW9uc3Rlck1hbnVhbE1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uTW9uc3Rlck1hbnVhbD49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TW9uc3Rlck1hbnVhbE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBNb25zdGVyTWFudWFsTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdNb25zdGVyTWFudWFsJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbk1vbnN0ZXJNYW51YWzmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uTW9uc3Rlck1hbnVhbCgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuTW9uc3Rlcixqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbk1vbnN0ZXJNYW51YWwoaWQ6bnVtYmVyKTpKc29uTW9uc3Rlck1hbnVhbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oCq54mp57yW5Y+36I635Y+W5raI54Gt5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0S2lsbE51bWJlcihpZDpudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLktpbGxOdW1iZXI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mgKrniannvJblj7fojrflj5bpkrvnn7PlpZblirEgKi9cclxuICAgIHB1YmxpYyBnZXREaWFtb25kUmV3YXJkKGlkOm51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGlhbW9uZFJld2FyZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaAqueJqee8luWPt+iOt+WPluaAqueJqemqqOmqvOi1hOa6kCAqL1xyXG4gICAgcHVibGljIGdldEJvbmVSZXNvdXJjZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Cb25lUmVzb3VyY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDmgKrniannvJblj7cqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhNb25zdGVyKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gNTAxNzA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcbiAgICBcclxuXHJcbn1cclxuIl19