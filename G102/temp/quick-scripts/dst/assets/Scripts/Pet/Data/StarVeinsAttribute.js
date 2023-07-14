
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Data/StarVeinsAttribute.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d4c2DwPopAibcb9KmXbo1x', 'StarVeinsAttribute');
// Scripts/Pet/Data/StarVeinsAttribute.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarVeinsAttributeManager = exports.JsonStarVeinsAttribute = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonStarVeinsAttribute = /** @class */ (function () {
    function JsonStarVeinsAttribute() {
        /**节点ID */
        this.Node = 0;
        /**星脉ID */
        this.StarVeinsId = 0;
        /**节点序号 */
        this.NodeOrdinal = 0;
        /**消耗道具ID */
        this.CostItem = 0;
        /**消耗道具数量 */
        this.CostNum = 0;
        /**攻击力 */
        this.Attack = 0;
        /**防御力 */
        this.Defense = 0;
        /**生命值 */
        this.Health = 0;
        /**额外攻速 */
        this.ExtraAttackSpeed = 0;
        /**命中值 */
        this.Hit = 0;
        /**闪避值 */
        this.Miss = 0;
        /**暴击值 */
        this.Critical = 0;
        /**暴击增幅 */
        this.ExtraCritical = 0;
        /**防暴值 */
        this.AntiCritical = 0;
        /**暴击抗性 */
        this.AntiExtraCritical = 0;
        /**灵兽百分比攻击力 */
        this.SpiritPercentageAttack = 0;
        /**灵兽防御力加成 */
        this.SpiritPercentageDefense = 0;
        /**灵兽生命值加成 */
        this.SpiritPercentageHealth = 0;
    }
    return JsonStarVeinsAttribute;
}());
exports.JsonStarVeinsAttribute = JsonStarVeinsAttribute;
var StarVeinsAttributeManager = /** @class */ (function () {
    function StarVeinsAttributeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    StarVeinsAttributeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new StarVeinsAttributeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    StarVeinsAttributeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    StarVeinsAttributeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('StarVeinsAttribute', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonStarVeinsAttribute成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonStarVeinsAttribute();
                jsonData = json[i];
                _this.data.set(jsonData.Node, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    StarVeinsAttributeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    StarVeinsAttributeManager.prototype.getJsonStarVeinsAttribute = function (id) {
        return this.data.get(id);
    };
    /**根据节点ID获取星脉ID */
    StarVeinsAttributeManager.prototype.getStarVeinsId = function (id) {
        return this.data.get(id).StarVeinsId;
    };
    /**根据节点ID获取节点序号 */
    StarVeinsAttributeManager.prototype.getNodeOrdinal = function (id) {
        return this.data.get(id).NodeOrdinal;
    };
    /**根据节点ID获取消耗道具ID */
    StarVeinsAttributeManager.prototype.getCostItem = function (id) {
        return this.data.get(id).CostItem;
    };
    /**根据节点ID获取消耗道具数量 */
    StarVeinsAttributeManager.prototype.getCostNum = function (id) {
        return this.data.get(id).CostNum;
    };
    /**根据节点ID获取攻击力 */
    StarVeinsAttributeManager.prototype.getAttack = function (id) {
        return this.data.get(id).Attack;
    };
    /**根据节点ID获取防御力 */
    StarVeinsAttributeManager.prototype.getDefense = function (id) {
        return this.data.get(id).Defense;
    };
    /**根据节点ID获取生命值 */
    StarVeinsAttributeManager.prototype.getHealth = function (id) {
        return this.data.get(id).Health;
    };
    /**根据节点ID获取额外攻速 */
    StarVeinsAttributeManager.prototype.getExtraAttackSpeed = function (id) {
        return this.data.get(id).ExtraAttackSpeed;
    };
    /**根据节点ID获取命中值 */
    StarVeinsAttributeManager.prototype.getHit = function (id) {
        return this.data.get(id).Hit;
    };
    /**根据节点ID获取闪避值 */
    StarVeinsAttributeManager.prototype.getMiss = function (id) {
        return this.data.get(id).Miss;
    };
    /**根据节点ID获取暴击值 */
    StarVeinsAttributeManager.prototype.getCritical = function (id) {
        return this.data.get(id).Critical;
    };
    /**根据节点ID获取暴击增幅 */
    StarVeinsAttributeManager.prototype.getExtraCritical = function (id) {
        return this.data.get(id).ExtraCritical;
    };
    /**根据节点ID获取防暴值 */
    StarVeinsAttributeManager.prototype.getAntiCritical = function (id) {
        return this.data.get(id).AntiCritical;
    };
    /**根据节点ID获取暴击抗性 */
    StarVeinsAttributeManager.prototype.getAntiExtraCritical = function (id) {
        return this.data.get(id).AntiExtraCritical;
    };
    /**根据节点ID获取灵兽百分比攻击力 */
    StarVeinsAttributeManager.prototype.getSpiritPercentageAttack = function (id) {
        return this.data.get(id).SpiritPercentageAttack;
    };
    /**根据节点ID获取灵兽防御力加成 */
    StarVeinsAttributeManager.prototype.getSpiritPercentageDefense = function (id) {
        return this.data.get(id).SpiritPercentageDefense;
    };
    /**根据节点ID获取灵兽生命值加成 */
    StarVeinsAttributeManager.prototype.getSpiritPercentageHealth = function (id) {
        return this.data.get(id).SpiritPercentageHealth;
    };
    /** 静态方法，获取最大的 节点ID*/
    StarVeinsAttributeManager.getMaxNode = function () {
        return 0;
    };
    StarVeinsAttributeManager._instance = null;
    return StarVeinsAttributeManager;
}());
exports.StarVeinsAttributeManager = StarVeinsAttributeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxEYXRhXFxTdGFyVmVpbnNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBR3hEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsU0FBSSxHQUFVLENBQUMsQ0FBRTtRQUN4QixVQUFVO1FBQ0gsZ0JBQVcsR0FBVSxDQUFDLENBQUU7UUFDL0IsVUFBVTtRQUNILGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFlBQVk7UUFDTCxhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFlBQVk7UUFDTCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFNBQVM7UUFDRixXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFNBQVM7UUFDRixZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFNBQVM7UUFDRixXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFVBQVU7UUFDSCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsU0FBUztRQUNGLFFBQUcsR0FBVSxDQUFDLENBQUU7UUFDdkIsU0FBUztRQUNGLFNBQUksR0FBVSxDQUFDLENBQUU7UUFDeEIsU0FBUztRQUNGLGFBQVEsR0FBVSxDQUFDLENBQUU7UUFDNUIsVUFBVTtRQUNILGtCQUFhLEdBQVUsQ0FBQyxDQUFFO1FBQ2pDLFNBQVM7UUFDRixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxVQUFVO1FBQ0gsc0JBQWlCLEdBQVUsQ0FBQyxDQUFFO1FBQ3JDLGNBQWM7UUFDUCwyQkFBc0IsR0FBVSxDQUFDLENBQUU7UUFDMUMsYUFBYTtRQUNOLDRCQUF1QixHQUFVLENBQUMsQ0FBRTtRQUMzQyxhQUFhO1FBQ04sMkJBQXNCLEdBQVUsQ0FBQyxDQUFFO0lBQzlDLENBQUM7SUFBRCw2QkFBQztBQUFELENBckNBLEFBcUNDLElBQUE7QUFyQ1ksd0RBQXNCO0FBdUNuQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFvQyxJQUFJLENBQUM7UUFDN0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBb0h4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQXJIaUIscUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCx3Q0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNBLDRDQUFRLEdBQWhCO1FBQUEsaUJBZ0JDO1FBZkcseUJBQVcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUMseUJBQVcsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBbUI7WUFDOUYsSUFBRyxLQUFLLEVBQUM7Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQzFDLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3JCLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUM1QixJQUFJLFFBQVEsR0FBQyxJQUFJLHNCQUFzQixFQUFFLENBQUM7Z0JBQzFDLFFBQVEsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFDRCxLQUFJLENBQUMsaUJBQWlCLEdBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7SUFDTCxzREFBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsNkRBQXlCLEdBQWhDLFVBQWlDLEVBQVM7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsa0RBQWMsR0FBckIsVUFBc0IsRUFBUztRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsa0RBQWMsR0FBckIsVUFBc0IsRUFBUztRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsK0NBQVcsR0FBbEIsVUFBbUIsRUFBUztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBQ0Qsb0JBQW9CO0lBQ2IsOENBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsNkNBQVMsR0FBaEIsVUFBaUIsRUFBUztRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsOENBQVUsR0FBakIsVUFBa0IsRUFBUztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsNkNBQVMsR0FBaEIsVUFBaUIsRUFBUztRQUN0QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsdURBQW1CLEdBQTFCLFVBQTJCLEVBQVM7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsMENBQU0sR0FBYixVQUFjLEVBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDakMsQ0FBQztJQUNELGlCQUFpQjtJQUNWLDJDQUFPLEdBQWQsVUFBZSxFQUFTO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFDRCxpQkFBaUI7SUFDViwrQ0FBVyxHQUFsQixVQUFtQixFQUFTO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFDRCxrQkFBa0I7SUFDWCxvREFBZ0IsR0FBdkIsVUFBd0IsRUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsaUJBQWlCO0lBQ1YsbURBQWUsR0FBdEIsVUFBdUIsRUFBUztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUMxQyxDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsd0RBQW9CLEdBQTNCLFVBQTRCLEVBQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQUMvQyxDQUFDO0lBQ0Qsc0JBQXNCO0lBQ2YsNkRBQXlCLEdBQWhDLFVBQWlDLEVBQVM7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztJQUNwRCxDQUFDO0lBQ0QscUJBQXFCO0lBQ2QsOERBQTBCLEdBQWpDLFVBQWtDLEVBQVM7UUFDdkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztJQUNyRCxDQUFDO0lBQ0QscUJBQXFCO0lBQ2QsNkRBQXlCLEdBQWhDLFVBQWlDLEVBQVM7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztJQUNwRCxDQUFDO0lBRUQscUJBQXFCO0lBQ1Asb0NBQVUsR0FBeEI7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFySGMsbUNBQVMsR0FBOEIsSUFBSSxDQUFDO0lBMEgvRCxnQ0FBQztDQTNIRCxBQTJIQyxJQUFBO0FBM0hZLDhEQUF5QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnNvblN0YXJWZWluc0F0dHJpYnV0ZSB7XHJcbiAgICAvKiroioLngrlJRCAqL1xyXG4gICAgcHVibGljIE5vZGU6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmmJ/ohIlJRCAqL1xyXG4gICAgcHVibGljIFN0YXJWZWluc0lkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6IqC54K55bqP5Y+3ICovXHJcbiAgICBwdWJsaWMgTm9kZU9yZGluYWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirmtojogJfpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIENvc3RJdGVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5raI6ICX6YGT5YW35pWw6YePICovXHJcbiAgICBwdWJsaWMgQ29zdE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaUu+WHu+WKmyAqL1xyXG4gICAgcHVibGljIEF0dGFjazpudW1iZXIgPSAwIDtcclxuICAgIC8qKumYsuW+oeWKmyAqL1xyXG4gICAgcHVibGljIERlZmVuc2U6bnVtYmVyID0gMCA7XHJcbiAgICAvKirnlJ/lkb3lgLwgKi9cclxuICAgIHB1YmxpYyBIZWFsdGg6bnVtYmVyID0gMCA7XHJcbiAgICAvKirpop3lpJbmlLvpgJ8gKi9cclxuICAgIHB1YmxpYyBFeHRyYUF0dGFja1NwZWVkOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5ZG95Lit5YC8ICovXHJcbiAgICBwdWJsaWMgSGl0Om51bWJlciA9IDAgO1xyXG4gICAgLyoq6Zeq6YG/5YC8ICovXHJcbiAgICBwdWJsaWMgTWlzczpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+WAvCAqL1xyXG4gICAgcHVibGljIENyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5pq05Ye75aKe5bmFICovXHJcbiAgICBwdWJsaWMgRXh0cmFDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKumYsuaatOWAvCAqL1xyXG4gICAgcHVibGljIEFudGlDcml0aWNhbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaatOWHu+aKl+aApyAqL1xyXG4gICAgcHVibGljIEFudGlFeHRyYUNyaXRpY2FsOm51bWJlciA9IDAgO1xyXG4gICAgLyoq54G15YW955m+5YiG5q+U5pS75Ye75YqbICovXHJcbiAgICBwdWJsaWMgU3Bpcml0UGVyY2VudGFnZUF0dGFjazpudW1iZXIgPSAwIDtcclxuICAgIC8qKueBteWFvemYsuW+oeWKm+WKoOaIkCAqL1xyXG4gICAgcHVibGljIFNwaXJpdFBlcmNlbnRhZ2VEZWZlbnNlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq54G15YW955Sf5ZG95YC85Yqg5oiQICovXHJcbiAgICBwdWJsaWMgU3Bpcml0UGVyY2VudGFnZUhlYWx0aDpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXJWZWluc0F0dHJpYnV0ZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBTdGFyVmVpbnNBdHRyaWJ1dGVNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvblN0YXJWZWluc0F0dHJpYnV0ZT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6U3RhclZlaW5zQXR0cmlidXRlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IFN0YXJWZWluc0F0dHJpYnV0ZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignU3RhclZlaW5zQXR0cmlidXRlJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvblN0YXJWZWluc0F0dHJpYnV0ZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25TdGFyVmVpbnNBdHRyaWJ1dGUoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLk5vZGUsanNvbkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ9dHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKirliqDovb3mmK/lkKblrozmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRJc0xvYWRDb21wbGV0ZWQoKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19sb2FkX2NvbXBsZXRlZDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrmlk5Y+36I635Y+WSnNvbueahOWQhOenjeaVsOaNriAqL1xyXG4gICAgcHVibGljIGdldEpzb25TdGFyVmVpbnNBdHRyaWJ1dGUoaWQ6bnVtYmVyKTpKc29uU3RhclZlaW5zQXR0cmlidXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPluaYn+iEiUlEICovXHJcbiAgICBwdWJsaWMgZ2V0U3RhclZlaW5zSWQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU3RhclZlaW5zSWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPluiKgueCueW6j+WPtyAqL1xyXG4gICAgcHVibGljIGdldE5vZGVPcmRpbmFsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk5vZGVPcmRpbmFsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6IqC54K5SUTojrflj5bmtojogJfpgZPlhbdJRCAqL1xyXG4gICAgcHVibGljIGdldENvc3RJdGVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3RJdGVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6IqC54K5SUTojrflj5bmtojogJfpgZPlhbfmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRDb3N0TnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNvc3ROdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPluaUu+WHu+WKmyAqL1xyXG4gICAgcHVibGljIGdldEF0dGFjayhpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BdHRhY2s7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPlumYsuW+oeWKmyAqL1xyXG4gICAgcHVibGljIGdldERlZmVuc2UoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGVmZW5zZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiKgueCuUlE6I635Y+W55Sf5ZG95YC8ICovXHJcbiAgICBwdWJsaWMgZ2V0SGVhbHRoKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkhlYWx0aDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruiKgueCuUlE6I635Y+W6aKd5aSW5pS76YCfICovXHJcbiAgICBwdWJsaWMgZ2V0RXh0cmFBdHRhY2tTcGVlZChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5FeHRyYUF0dGFja1NwZWVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6IqC54K5SUTojrflj5blkb3kuK3lgLwgKi9cclxuICAgIHB1YmxpYyBnZXRIaXQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSGl0O1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6IqC54K5SUTojrflj5bpl6rpgb/lgLwgKi9cclxuICAgIHB1YmxpYyBnZXRNaXNzKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLk1pc3M7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPluaatOWHu+WAvCAqL1xyXG4gICAgcHVibGljIGdldENyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6IqC54K5SUTojrflj5bmmrTlh7vlop7luYUgKi9cclxuICAgIHB1YmxpYyBnZXRFeHRyYUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkV4dHJhQ3JpdGljYWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPlumYsuaatOWAvCAqL1xyXG4gICAgcHVibGljIGdldEFudGlDcml0aWNhbChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BbnRpQ3JpdGljYWw7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPluaatOWHu+aKl+aApyAqL1xyXG4gICAgcHVibGljIGdldEFudGlFeHRyYUNyaXRpY2FsKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkFudGlFeHRyYUNyaXRpY2FsO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6IqC54K5SUTojrflj5bngbXlhb3nmb7liIbmr5TmlLvlh7vlipsgKi9cclxuICAgIHB1YmxpYyBnZXRTcGlyaXRQZXJjZW50YWdlQXR0YWNrKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdFBlcmNlbnRhZ2VBdHRhY2s7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7oioLngrlJROiOt+WPlueBteWFvemYsuW+oeWKm+WKoOaIkCAqL1xyXG4gICAgcHVibGljIGdldFNwaXJpdFBlcmNlbnRhZ2VEZWZlbnNlKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdFBlcmNlbnRhZ2VEZWZlbnNlO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u6IqC54K5SUTojrflj5bngbXlhb3nlJ/lkb3lgLzliqDmiJAgKi9cclxuICAgIHB1YmxpYyBnZXRTcGlyaXRQZXJjZW50YWdlSGVhbHRoKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNwaXJpdFBlcmNlbnRhZ2VIZWFsdGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDoioLngrlJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heE5vZGUoKTpudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuXHJcbn1cclxuIl19