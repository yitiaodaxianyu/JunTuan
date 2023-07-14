
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Data/CombatEffectiveness.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcRGF0YVxcQ29tYmF0RWZmZWN0aXZlbmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFFeEQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFVBQVU7UUFDSCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7SUFDeEMsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFMWSwwREFBdUI7QUFPcEM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBcUMsSUFBSSxDQUFDO1FBQzlDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQW9EeEMseUJBQXlCO0lBRzdCLENBQUM7SUFyRGlCLHNDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksMEJBQTBCLEVBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QseUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSw2Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQy9GLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO2dCQUMzQyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsdURBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLCtEQUEwQixHQUFqQyxVQUFrQyxFQUFTO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELGtCQUFrQjtJQUNYLHdEQUFtQixHQUExQixVQUEyQixFQUFTO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUM7SUFDOUMsQ0FBQztJQUVELHFCQUFxQjtJQUNQLDBDQUFlLEdBQTdCO1FBQ0ksT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBckRjLG9DQUFTLEdBQStCLElBQUksQ0FBQztJQTBEaEUsaUNBQUM7Q0EzREQsQUEyREMsSUFBQTtBQTNEWSxnRUFBMEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkNvbWJhdEVmZmVjdGl2ZW5lc3Mge1xyXG4gICAgLyoq5bGe5oCnSUQgKi9cclxuICAgIHB1YmxpYyBBdHRyaWJ1dGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirovazmjaLns7vmlbAgKi9cclxuICAgIHB1YmxpYyBDb252ZXJzaW9uRmFjdG9yOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlciA9IG51bGw7XHJcbiAgICAvL+aKimpzb27mlbDmja7ovazljJbmiJBtYXDmlbDmja5cclxuICAgIHByaXZhdGUgZGF0YTpNYXA8bnVtYmVyLEpzb25Db21iYXRFZmZlY3RpdmVuZXNzPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEpzb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WKoOi9vWpzb25cclxuICAgIHByaXZhdGUgbG9hZEpzb24oKSB7XHJcbiAgICAgICAgTG9hZE1hbmFnZXIubG9hZEpzb24oJ0NvbWJhdEVmZmVjdGl2ZW5lc3MnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQ29tYmF0RWZmZWN0aXZlbmVzc+aIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Db21iYXRFZmZlY3RpdmVuZXNzKCk7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YT1qc29uW2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChqc29uRGF0YS5BdHRyaWJ1dGUsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Db21iYXRFZmZlY3RpdmVuZXNzKGlkOm51bWJlcik6SnNvbkNvbWJhdEVmZmVjdGl2ZW5lc3Mge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWxnuaAp0lE6I635Y+W6L2s5o2i57O75pWwICovXHJcbiAgICBwdWJsaWMgZ2V0Q29udmVyc2lvbkZhY3RvcihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db252ZXJzaW9uRmFjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5bGe5oCnSUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhBdHRyaWJ1dGUoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA5O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19