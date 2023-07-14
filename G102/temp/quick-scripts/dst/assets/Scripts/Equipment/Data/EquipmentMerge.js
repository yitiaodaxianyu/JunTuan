
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Data/EquipmentMerge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'da4358WOUxEJ5S6ZLXT88Os', 'EquipmentMerge');
// Scripts/Equipment/Data/EquipmentMerge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentMergeManager = exports.JsonEquipmentMerge = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonEquipmentMerge = /** @class */ (function () {
    function JsonEquipmentMerge() {
        /**消耗装备id */
        this.CostEquipment_id = 0;
        /**消耗装备数量 */
        this.CostNumber = 0;
        /**目标装备id */
        this.TargetEquipment_id = 0;
        /**消耗金币数量 */
        this.CostCoin = 0;
    }
    return JsonEquipmentMerge;
}());
exports.JsonEquipmentMerge = JsonEquipmentMerge;
var EquipmentMergeManager = /** @class */ (function () {
    function EquipmentMergeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EquipmentMergeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EquipmentMergeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EquipmentMergeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EquipmentMergeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EquipmentMerge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentMerge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEquipmentMerge();
                jsonData = json[i];
                _this.data.set(jsonData.CostEquipment_id, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EquipmentMergeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EquipmentMergeManager.prototype.getJsonEquipmentMerge = function (id) {
        return this.data.get(id);
    };
    /**根据消耗装备id获取消耗装备数量 */
    EquipmentMergeManager.prototype.getCostNumber = function (id) {
        return this.data.get(id).CostNumber;
    };
    /**根据消耗装备id获取目标装备id */
    EquipmentMergeManager.prototype.getTargetEquipment_id = function (id) {
        return this.data.get(id).TargetEquipment_id;
    };
    /**根据消耗装备id获取消耗金币数量 */
    EquipmentMergeManager.prototype.getCostCoin = function (id) {
        return this.data.get(id).CostCoin;
    };
    /** 静态方法，获取最大的 消耗装备id*/
    EquipmentMergeManager.getMaxCostEquipment_id = function () {
        return 3035;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    EquipmentMergeManager.prototype.getData = function () {
        return this.data;
    };
    EquipmentMergeManager.prototype.getCostId = function (equipId) {
        var costId = 0;
        this.data.forEach(function (v, k) {
            if (v.TargetEquipment_id == equipId) {
                costId = k;
            }
        });
        return costId;
    };
    EquipmentMergeManager._instance = null;
    return EquipmentMergeManager;
}());
exports.EquipmentMergeManager = EquipmentMergeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxEYXRhXFxFcXVpcG1lbnRNZXJnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBd0Q7QUFHeEQ7SUFBQTtRQUNJLFlBQVk7UUFDTCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsWUFBWTtRQUNMLGVBQVUsR0FBVSxDQUFDLENBQUU7UUFDOUIsWUFBWTtRQUNMLHVCQUFrQixHQUFVLENBQUMsQ0FBRTtRQUN0QyxZQUFZO1FBQ0wsYUFBUSxHQUFVLENBQUMsQ0FBRTtJQUNoQyxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQVRBLEFBU0MsSUFBQTtBQVRZLGdEQUFrQjtBQVcvQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFnQyxJQUFJLENBQUM7UUFDekMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBMEU1QyxDQUFDO0lBeEVpQixpQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsU0FBUztJQUNELG9DQUFJLEdBQVo7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDRCxRQUFRO0lBQ0Esd0NBQVEsR0FBaEI7UUFBQSxpQkFnQkM7UUFmRyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUMxRixJQUFHLEtBQUssRUFBQztnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLElBQUksR0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQzVCLElBQUksUUFBUSxHQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQztnQkFDdEMsUUFBUSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsa0RBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHFEQUFxQixHQUE1QixVQUE2QixFQUFTO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELHNCQUFzQjtJQUNmLDZDQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLHFEQUFxQixHQUE1QixVQUE2QixFQUFTO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsa0JBQWtCLENBQUM7SUFDaEQsQ0FBQztJQUNELHNCQUFzQjtJQUNmLDJDQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUVELHVCQUF1QjtJQUNULDRDQUFzQixHQUFwQztRQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx5QkFBeUI7SUFDekIsdUNBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQseUNBQVMsR0FBVCxVQUFVLE9BQWM7UUFDcEIsSUFBSSxNQUFNLEdBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNsQixJQUFHLENBQUMsQ0FBQyxrQkFBa0IsSUFBRSxPQUFPLEVBQUM7Z0JBQzdCLE1BQU0sR0FBQyxDQUFDLENBQUM7YUFDWjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQTVFYywrQkFBUyxHQUEwQixJQUFJLENBQUM7SUE2RTNELDRCQUFDO0NBOUVELEFBOEVDLElBQUE7QUE5RVksc0RBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uRXF1aXBtZW50TWVyZ2Uge1xyXG4gICAgLyoq5raI6ICX6KOF5aSHaWQgKi9cclxuICAgIHB1YmxpYyBDb3N0RXF1aXBtZW50X2lkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5raI6ICX6KOF5aSH5pWw6YePICovXHJcbiAgICBwdWJsaWMgQ29zdE51bWJlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKuebruagh+ijheWkh2lkICovXHJcbiAgICBwdWJsaWMgVGFyZ2V0RXF1aXBtZW50X2lkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5raI6ICX6YeR5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgQ29zdENvaW46bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFcXVpcG1lbnRNZXJnZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBFcXVpcG1lbnRNZXJnZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uRXF1aXBtZW50TWVyZ2U+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkVxdWlwbWVudE1lcmdlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEVxdWlwbWVudE1lcmdlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdFcXVpcG1lbnRNZXJnZScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25FcXVpcG1lbnRNZXJnZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25FcXVpcG1lbnRNZXJnZSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuQ29zdEVxdWlwbWVudF9pZCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkVxdWlwbWVudE1lcmdlKGlkOm51bWJlcik6SnNvbkVxdWlwbWVudE1lcmdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7mtojogJfoo4XlpIdpZOiOt+WPlua2iOiAl+ijheWkh+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldENvc3ROdW1iZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29zdE51bWJlcjtcclxuICAgIH1cclxuICAgIC8qKuagueaNrua2iOiAl+ijheWkh2lk6I635Y+W55uu5qCH6KOF5aSHaWQgKi9cclxuICAgIHB1YmxpYyBnZXRUYXJnZXRFcXVpcG1lbnRfaWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGFyZ2V0RXF1aXBtZW50X2lkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5raI6ICX6KOF5aSHaWTojrflj5bmtojogJfph5HluIHmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRDb3N0Q29pbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5Db3N0Q29pbjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Z2Z5oCB5pa55rOV77yM6I635Y+W5pyA5aSn55qEIOa2iOiAl+ijheWkh2lkKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4Q29zdEVxdWlwbWVudF9pZCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDMwMzU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcbiAgICBnZXREYXRhKCk6TWFwPG51bWJlcixKc29uRXF1aXBtZW50TWVyZ2U+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29zdElkKGVxdWlwSWQ6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGNvc3RJZD0wO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKHYuVGFyZ2V0RXF1aXBtZW50X2lkPT1lcXVpcElkKXtcclxuICAgICAgICAgICAgICAgIGNvc3RJZD1rO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvc3RJZDtcclxuICAgIH1cclxufSJdfQ==