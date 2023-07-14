
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/CommodityInformation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e8b2JXWAFNb5D9iMPfdpCu', 'CommodityInformation');
// Scripts/Store/CommodityInformation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommodityInformationManager = exports.JsonCommodityInformation = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonCommodityInformation = /** @class */ (function () {
    function JsonCommodityInformation() {
        /**商品ID */
        this.CommodityID = 0;
        /**获得道具ID */
        this.GetItem = 0;
        /**消耗道具ID */
        this.CostItemID = 0;
        /**消耗数量 */
        this.CostNum = 0;
        /**获得道具数量 */
        this.GetNum = 0;
        /**是否为广告奖励 */
        this.AdReward = 0;
        /**广告可观看次数 */
        this.AdPlayableTimes = 0;
    }
    return JsonCommodityInformation;
}());
exports.JsonCommodityInformation = JsonCommodityInformation;
var CommodityInformationManager = /** @class */ (function () {
    function CommodityInformationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    CommodityInformationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CommodityInformationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CommodityInformationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CommodityInformationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CommodityInformation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCommodityInformation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCommodityInformation();
                jsonData = json[i];
                _this.data.set(jsonData.CommodityID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CommodityInformationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CommodityInformationManager.prototype.getJsonCommodityInformation = function (id) {
        return this.data.get(id);
    };
    /**根据商品ID获取获得道具ID */
    CommodityInformationManager.prototype.getGetItem = function (id) {
        return this.data.get(id).GetItem;
    };
    /**根据商品ID获取消耗道具ID */
    CommodityInformationManager.prototype.getCostItemID = function (id) {
        return this.data.get(id).CostItemID;
    };
    /**根据商品ID获取消耗数量 */
    CommodityInformationManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /**根据商品ID获取获得道具数量 */
    CommodityInformationManager.prototype.getGetNum = function (id) {
        return this.data.get(id).GetNum;
    };
    /**根据商品ID获取是否为广告奖励 */
    CommodityInformationManager.prototype.getAdReward = function (id) {
        return this.data.get(id).AdReward;
    };
    /**根据商品ID获取广告可观看次数 */
    CommodityInformationManager.prototype.getAdPlayableTimes = function (id) {
        return this.data.get(id).AdPlayableTimes;
    };
    /** 静态方法，获取最大的 商品ID*/
    CommodityInformationManager.getMaxCommodityID = function () {
        return 301201;
    };
    CommodityInformationManager._instance = null;
    return CommodityInformationManager;
}());
exports.CommodityInformationManager = CommodityInformationManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXENvbW1vZGl0eUluZm9ybWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFxRDtBQUVyRDtJQUFBO1FBQ0ksVUFBVTtRQUNILGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFlBQVk7UUFDTCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFlBQVk7UUFDTCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFlBQVk7UUFDTCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLGFBQWE7UUFDTixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLGFBQWE7UUFDTixvQkFBZSxHQUFVLENBQUMsQ0FBRTtJQUN2QyxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLDREQUF3QjtBQWlCckM7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBc0MsSUFBSSxDQUFDO1FBQy9DLHNCQUFpQixHQUFTLEtBQUssQ0FBQztRQXdFeEMseUJBQXlCO0lBRzdCLENBQUM7SUF6RWlCLHVDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksMkJBQTJCLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsMENBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSw4Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFDLHlCQUFXLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQ2hHLElBQUcsS0FBSyxFQUFDO2dCQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUM1QyxLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDNUIsSUFBSSxRQUFRLEdBQUMsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO2dCQUM1QyxRQUFRLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsS0FBSSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO0lBQ0wsd0RBQWtCLEdBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELHNCQUFzQjtJQUNmLGlFQUEyQixHQUFsQyxVQUFtQyxFQUFTO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELG9CQUFvQjtJQUNiLGdEQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLG1EQUFhLEdBQXBCLFVBQXFCLEVBQVM7UUFDMUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7SUFDeEMsQ0FBQztJQUNELGtCQUFrQjtJQUNYLGdEQUFVLEdBQWpCLFVBQWtCLEVBQVM7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELG9CQUFvQjtJQUNiLCtDQUFTLEdBQWhCLFVBQWlCLEVBQVM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUNELHFCQUFxQjtJQUNkLGlEQUFXLEdBQWxCLFVBQW1CLEVBQVM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUNELHFCQUFxQjtJQUNkLHdEQUFrQixHQUF6QixVQUEwQixFQUFTO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDO0lBQzdDLENBQUM7SUFFRCxxQkFBcUI7SUFDUCw2Q0FBaUIsR0FBL0I7UUFDSSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBekVjLHFDQUFTLEdBQWdDLElBQUksQ0FBQztJQThFakUsa0NBQUM7Q0EvRUQsQUErRUMsSUFBQTtBQS9FWSxrRUFBMkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkNvbW1vZGl0eUluZm9ybWF0aW9uIHtcclxuICAgIC8qKuWVhuWTgUlEICovXHJcbiAgICBwdWJsaWMgQ29tbW9kaXR5SUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirojrflvpfpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIEdldEl0ZW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJfpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIENvc3RJdGVtSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJfmlbDph48gKi9cclxuICAgIHB1YmxpYyBDb3N0TnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6I635b6X6YGT5YW35pWw6YePICovXHJcbiAgICBwdWJsaWMgR2V0TnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5piv5ZCm5Li65bm/5ZGK5aWW5YqxICovXHJcbiAgICBwdWJsaWMgQWRSZXdhcmQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlub/lkYrlj6/op4LnnIvmrKHmlbAgKi9cclxuICAgIHB1YmxpYyBBZFBsYXlhYmxlVGltZXM6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tb2RpdHlJbmZvcm1hdGlvbk1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDb21tb2RpdHlJbmZvcm1hdGlvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uQ29tbW9kaXR5SW5mb3JtYXRpb24+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkNvbW1vZGl0eUluZm9ybWF0aW9uTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IENvbW1vZGl0eUluZm9ybWF0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdDb21tb2RpdHlJbmZvcm1hdGlvbicsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25Db21tb2RpdHlJbmZvcm1hdGlvbuaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Db21tb2RpdHlJbmZvcm1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuQ29tbW9kaXR5SUQsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25Db21tb2RpdHlJbmZvcm1hdGlvbihpZDpudW1iZXIpOkpzb25Db21tb2RpdHlJbmZvcm1hdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5ZWG5ZOBSUTojrflj5bojrflvpfpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIGdldEdldEl0ZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0SXRlbTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWVhuWTgUlE6I635Y+W5raI6ICX6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRDb3N0SXRlbUlEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3RJdGVtSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7llYblk4FJROiOt+WPlua2iOiAl+aVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldENvc3ROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQ29zdE51bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWVhuWTgUlE6I635Y+W6I635b6X6YGT5YW35pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0TnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkdldE51bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWVhuWTgUlE6I635Y+W5piv5ZCm5Li65bm/5ZGK5aWW5YqxICovXHJcbiAgICBwdWJsaWMgZ2V0QWRSZXdhcmQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuQWRSZXdhcmQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7llYblk4FJROiOt+WPluW5v+WRiuWPr+ingueci+asoeaVsCAqL1xyXG4gICAgcHVibGljIGdldEFkUGxheWFibGVUaW1lcyhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BZFBsYXlhYmxlVGltZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDllYblk4FJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heENvbW1vZGl0eUlEKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMzAxMjAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19