
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/PetManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e3814ZCIjpHno6z/wd90uS/', 'PetManager');
// Scripts/Pet/PetManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetManager = exports.SpiritType = void 0;
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var CombatEffectiveness_1 = require("../Hero/Data/CombatEffectiveness");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var SpiritAttribute_1 = require("./Data/SpiritAttribute");
var SpiritCultivate_1 = require("./Data/SpiritCultivate");
var SpiritMessage_1 = require("./Data/SpiritMessage");
var SpiritSkill_1 = require("./Data/SpiritSkill");
var PetConfig_1 = require("./PetConfig");
var PetItem_1 = require("./Ui/PetItem");
var SpiritType;
(function (SpiritType) {
    /**力量 */
    SpiritType[SpiritType["strength"] = 1] = "strength";
    /**敏捷 */
    SpiritType[SpiritType["agility"] = 2] = "agility";
    /**智力 */
    SpiritType[SpiritType["intelligence"] = 3] = "intelligence";
})(SpiritType = exports.SpiritType || (exports.SpiritType = {}));
var PetManager = /** @class */ (function () {
    function PetManager() {
        this.item_pet = null;
    }
    PetManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PetManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    PetManager.prototype.init = function () {
        SpiritAttribute_1.SpiritAttributeManager.getInstance();
        SpiritCultivate_1.SpiritCultivateManager.getInstance();
        SpiritMessage_1.SpiritMessageManager.getInstance();
        SpiritSkill_1.SpiritSkillManager.getInstance();
        this.loadPrefab();
    };
    PetManager.prototype.loadPrefab = function () {
        var _this = this;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('pet/ui/petItem', cc.Prefab, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载prefab_equip成功');
            assets.addRef();
            _this.item_pet = assets;
            //cc.resources.release("equipment/equipItem",cc.Prefab);
        });
    };
    PetManager.prototype.getPetNodeByInfo = function (petMessage, pAc, heroType) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (heroType === void 0) { heroType = HeroConfig_1.Hero_Type.NULL; }
        var item = cc.instantiate(this.item_pet);
        item.getComponent(PetItem_1.default).init(heroType, petMessage, pAc);
        return item;
    };
    /**根据装备ID获得一个装备节点 */
    PetManager.prototype.getPetNodeById = function (petId, pAc, heroType) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (heroType === void 0) { heroType = HeroConfig_1.Hero_Type.NULL; }
        var item = cc.instantiate(this.item_pet);
        var petMessage = new PetConfig_1.PetMessage();
        petMessage.pet_id = petId;
        petMessage.pet_num = 1;
        item.getComponent(PetItem_1.default).init(heroType, petMessage, pAc);
        // console.log("+++",item)
        return item;
    };
    // 获取单个宠物战力
    PetManager.prototype.getPetZhanLi = function (petId) {
        var zhanli = 0;
        var petInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
        zhanli =
            petInfo.Health * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(1)
                + petInfo.Attack * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(2)
                + petInfo.Defense * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(3)
                + petInfo.Hit * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(4)
                + petInfo.Miss * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(5)
                + (petInfo.Critical) * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(6)
                + petInfo.AntiCritical * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(7)
                + (petInfo.ExtraCritical) * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(8)
                + petInfo.AntiExtraCritical * CombatEffectiveness_1.CombatEffectivenessManager.getInstance().getConversionFactor(9);
        zhanli = Math.round(zhanli);
        return zhanli;
    };
    PetManager.prototype.getPetQualityTextColor = function (quality) {
        var color = cc.color();
        switch (quality) {
            case 1:
                {
                    color = cc.color(113, 229, 132);
                }
                break;
            case 2:
            case 3:
                {
                    color = cc.color(105, 183, 255);
                }
                break;
            case 4:
            case 5:
                {
                    color = cc.color(226, 126, 255);
                }
                break;
            case 6:
            case 7:
                {
                    color = cc.color(255, 193, 74);
                }
                break;
            case 8:
            case 9:
                {
                    color = cc.color(255, 74, 74);
                }
                break;
            default:
                {
                    color = cc.color(255, 255, 255);
                }
                break;
        }
        return color;
    };
    /**检测是否有红点提示 */
    PetManager.prototype.checkRedTip = function (heroType) {
        var petId = HeroManager_1.HeroManager.getInstance().getHeroInfo(heroType).pet_id;
        var petList = PropManager_1.PropManager.getInstance().getPetList();
        if (petId == 0) {
            //检测是否有空余的宠物
            for (var i = 0; i < petList.length; i++) {
                var info = petList[i];
                var heroList = HeroManager_1.HeroManager.getInstance().getWearPetHeroList(info);
                var remainNum = info.pet_num - heroList.length;
                if (remainNum > 0) {
                    return true;
                }
            }
        }
        else {
            var petInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
            var petMessage = SpiritMessage_1.SpiritMessageManager.getInstance().getJsonSpiritMessage(petInfo.SpiritType);
            if (petInfo.Stage >= petMessage.StageLimit) {
                return false;
            }
            //是否可以升星
            var costInfo = SpiritCultivate_1.SpiritCultivateManager.getInstance().getJsonSpiritCultivate(petInfo.Stage);
            if (costInfo.CoinSpirit == 0) {
                return (PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.AnimalFood) >= costInfo.FoodCost &&
                    PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin) >= costInfo.CoinCost);
            }
            else {
                var firstStageInfo = SpiritAttribute_1.SpiritAttributeManager.getInstance().getTypeFirstJsonData(petInfo.SpiritType);
                return (PropManager_1.PropManager.getInstance().getPropNum(firstStageInfo.SpiritItem) >= costInfo.CoinSpirit &&
                    PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem) >= costInfo.DiamondCost);
            }
        }
        return false;
    };
    PetManager._instance = null;
    return PetManager;
}());
exports.PetManager = PetManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxQZXRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF1RDtBQUN2RCx3RUFBOEU7QUFDOUUsd0RBQXVEO0FBQ3ZELHNEQUFvRDtBQUNwRCxpREFBd0Q7QUFDeEQsbURBQWtEO0FBQ2xELDBEQUFnRTtBQUNoRSwwREFBZ0U7QUFDaEUsc0RBQTREO0FBQzVELGtEQUF3RDtBQUN4RCx5Q0FBeUM7QUFDekMsd0NBQW1DO0FBRW5DLElBQVksVUFPWDtBQVBELFdBQVksVUFBVTtJQUNsQixRQUFRO0lBQ1IsbURBQVUsQ0FBQTtJQUNWLFFBQVE7SUFDUixpREFBUyxDQUFBO0lBQ1QsUUFBUTtJQUNSLDJEQUFjLENBQUE7QUFDbEIsQ0FBQyxFQVBXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBT3JCO0FBR0Q7SUFBQTtRQVlZLGFBQVEsR0FBVyxJQUFJLENBQUM7SUErSHBDLENBQUM7SUF2SWlCLHNCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBSUQsU0FBUztJQUNELHlCQUFJLEdBQVo7UUFDSSx3Q0FBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyx3Q0FBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxnQ0FBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLCtCQUFVLEdBQWpCO1FBQUEsaUJBWUM7UUFYRyxxQkFBVyxDQUFD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QUFDLENBQUM7WUFDN0YsSUFBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUM7Z0JBQ3RDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsUUFBUTtZQUNSLElBQUksUUFBUSxHQUFHLHdDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRixJQUFHLFFBQVEsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFDO2dCQUN4QixPQUFPLENBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUTtvQkFDcEYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7YUFDMUU7aUJBQUk7Z0JBQ0QsSUFBSSxjQUFjLEdBQUcsd0NBQXNCLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRyxPQUFPLENBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVO29CQUM5Rix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTthQUM1RTtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQXhJYyxvQkFBUyxHQUFlLElBQUksQ0FBQztJQXlJaEQsaUJBQUM7Q0EzSUQsQUEySUMsSUFBQTtBQTNJWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi4vLi4vc3RhcnRzY2VuZS9XWE1hbmFnZXJFWFwiO1xyXG5pbXBvcnQgeyBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvQ29tYmF0RWZmZWN0aXZlbmVzc1wiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9TcGlyaXRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgU3Bpcml0Q3VsdGl2YXRlTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvU3Bpcml0Q3VsdGl2YXRlXCI7XHJcbmltcG9ydCB7IFNwaXJpdE1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9TcGlyaXRNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFNwaXJpdFNraWxsTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvU3Bpcml0U2tpbGxcIjtcclxuaW1wb3J0IHsgUGV0TWVzc2FnZSB9IGZyb20gXCIuL1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgUGV0SXRlbSBmcm9tIFwiLi9VaS9QZXRJdGVtXCI7XHJcblxyXG5leHBvcnQgZW51bSBTcGlyaXRUeXBle1xyXG4gICAgLyoq5Yqb6YePICovXHJcbiAgICBzdHJlbmd0aD0xLFxyXG4gICAgLyoq5pWP5o23ICovXHJcbiAgICBhZ2lsaXR5PTIsXHJcbiAgICAvKirmmbrlipsgKi9cclxuICAgIGludGVsbGlnZW5jZT0zLFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBldE1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUGV0TWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlBldE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBQZXRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXRlbV9wZXQ6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7XHJcbiAgICAgICAgU3Bpcml0QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFNwaXJpdEN1bHRpdmF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFNwaXJpdFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFByZWZhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkUHJlZmFiKCl7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgncGV0L3VpL3BldEl0ZW0nLGNjLlByZWZhYiwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuUHJlZmFiKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1wcmVmYWJfZXF1aXDmiJDlip8nKTtcclxuICAgICAgICAgICAgYXNzZXRzLmFkZFJlZigpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1fcGV0PWFzc2V0cztcclxuICAgICAgICAgICAgLy9jYy5yZXNvdXJjZXMucmVsZWFzZShcImVxdWlwbWVudC9lcXVpcEl0ZW1cIixjYy5QcmVmYWIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBldE5vZGVCeUluZm8ocGV0TWVzc2FnZTpQZXRNZXNzYWdlLHBBYzpQcm9wQWN0aW9uPVByb3BBY3Rpb24uTG9vayxoZXJvVHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEwpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IGl0ZW09Y2MuaW5zdGFudGlhdGUodGhpcy5pdGVtX3BldCk7XHJcbiAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoUGV0SXRlbSkuaW5pdChoZXJvVHlwZSxwZXRNZXNzYWdlLHBBYyk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qC55o2u6KOF5aSHSUTojrflvpfkuIDkuKroo4XlpIfoioLngrkgKi9cclxuICAgIHB1YmxpYyBnZXRQZXROb2RlQnlJZChwZXRJZDpudW1iZXIscEFjOlByb3BBY3Rpb249UHJvcEFjdGlvbi5Mb29rLGhlcm9UeXBlOkhlcm9fVHlwZT1IZXJvX1R5cGUuTlVMTCk6Y2MuTm9kZXtcclxuICAgICAgICBsZXQgaXRlbT1jYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1fcGV0KTtcclxuICAgICAgICBsZXQgcGV0TWVzc2FnZT1uZXcgUGV0TWVzc2FnZSgpO1xyXG4gICAgICAgIHBldE1lc3NhZ2UucGV0X2lkPXBldElkO1xyXG4gICAgICAgIHBldE1lc3NhZ2UucGV0X251bT0xO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQoaGVyb1R5cGUscGV0TWVzc2FnZSxwQWMpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrXCIsaXRlbSlcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bljZXkuKrlrqDnianmiJjliptcclxuICAgIGdldFBldFpoYW5MaShwZXRJZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB6aGFubGk9MDtcclxuICAgICAgICBsZXQgcGV0SW5mbyA9IFNwaXJpdEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0QXR0cmlidXRlKHBldElkKTtcclxuICAgICAgICB6aGFubGkgPSBcclxuICAgICAgICBwZXRJbmZvLkhlYWx0aCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigxKSBcclxuICAgICAgICArICBwZXRJbmZvLkF0dGFjayAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigyKVxyXG4gICAgICAgICsgIHBldEluZm8uRGVmZW5zZSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3RvcigzKVxyXG4gICAgICAgICsgIHBldEluZm8uSGl0ICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDQpXHJcbiAgICAgICAgKyAgcGV0SW5mby5NaXNzICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDUpXHJcbiAgICAgICAgKyAoIHBldEluZm8uQ3JpdGljYWwpICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDYpXHJcbiAgICAgICAgKyAgcGV0SW5mby5BbnRpQ3JpdGljYWwgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoNylcclxuICAgICAgICArICggcGV0SW5mby5FeHRyYUNyaXRpY2FsKSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig4KVxyXG4gICAgICAgICsgIHBldEluZm8uQW50aUV4dHJhQ3JpdGljYWwgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoOSlcclxuICAgICAgICB6aGFubGk9TWF0aC5yb3VuZCh6aGFubGkpO1xyXG4gICAgICAgIHJldHVybiB6aGFubGk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRQZXRRdWFsaXR5VGV4dENvbG9yKHF1YWxpdHk6bnVtYmVyKTpjYy5Db2xvcntcclxuICAgICAgICBsZXQgY29sb3I9Y2MuY29sb3IoKTtcclxuICAgICAgICBzd2l0Y2gocXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigxMTMsIDIyOSwgMTMyKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTA1LCAxODMsIDI1NSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDIyNiwgMTI2LCAyNTUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDE5MywgNzQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDc0LCA3NCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDp7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5qOA5rWL5piv5ZCm5pyJ57qi54K55o+Q56S6ICovXHJcbiAgICBjaGVja1JlZFRpcChoZXJvVHlwZTpIZXJvX1R5cGUpOmJvb2xlYW57XHJcbiAgICAgICAgbGV0IHBldElkPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0luZm8oaGVyb1R5cGUpLnBldF9pZDtcclxuICAgICAgICBsZXQgcGV0TGlzdD1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldExpc3QoKTtcclxuICAgICAgICBpZihwZXRJZD09MCl7XHJcbiAgICAgICAgICAgIC8v5qOA5rWL5piv5ZCm5pyJ56m65L2Z55qE5a6g54mpXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPHBldExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZm89cGV0TGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBoZXJvTGlzdD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXRIZXJvTGlzdChpbmZvKTtcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW5OdW09aW5mby5wZXRfbnVtLWhlcm9MaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmKHJlbWFpbk51bT4wKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHBldEluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShwZXRJZCk7XHJcbiAgICAgICAgICAgIGxldCBwZXRNZXNzYWdlID0gU3Bpcml0TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0TWVzc2FnZShwZXRJbmZvLlNwaXJpdFR5cGUpO1xyXG4gICAgICAgICAgICBpZihwZXRJbmZvLlN0YWdlID49IHBldE1lc3NhZ2UuU3RhZ2VMaW1pdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mmK/lkKblj6/ku6XljYfmmJ9cclxuICAgICAgICAgICAgbGV0IGNvc3RJbmZvID0gU3Bpcml0Q3VsdGl2YXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TcGlyaXRDdWx0aXZhdGUocGV0SW5mby5TdGFnZSk7XHJcbiAgICAgICAgICAgIGlmKGNvc3RJbmZvLkNvaW5TcGlyaXQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQW5pbWFsRm9vZCkgPj0gY29zdEluZm8uRm9vZENvc3QgJiYgXHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pID49IGNvc3RJbmZvLkNvaW5Db3N0KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RTdGFnZUluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZUZpcnN0SnNvbkRhdGEocGV0SW5mby5TcGlyaXRUeXBlKTsgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiAoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGZpcnN0U3RhZ2VJbmZvLlNwaXJpdEl0ZW0pID49IGNvc3RJbmZvLkNvaW5TcGlyaXQgJiZcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSA+PSBjb3N0SW5mby5EaWFtb25kQ29zdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19