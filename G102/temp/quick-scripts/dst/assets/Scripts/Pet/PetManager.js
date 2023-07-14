
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
        cc.resources.load('pet/ui/petItem', cc.Prefab, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxQZXRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUE4RTtBQUM5RSx3REFBdUQ7QUFDdkQsc0RBQW9EO0FBQ3BELGlEQUF3RDtBQUN4RCxtREFBa0Q7QUFDbEQsMERBQWdFO0FBQ2hFLDBEQUFnRTtBQUNoRSxzREFBNEQ7QUFDNUQsa0RBQXdEO0FBQ3hELHlDQUF5QztBQUN6Qyx3Q0FBbUM7QUFFbkMsSUFBWSxVQU9YO0FBUEQsV0FBWSxVQUFVO0lBQ2xCLFFBQVE7SUFDUixtREFBVSxDQUFBO0lBQ1YsUUFBUTtJQUNSLGlEQUFTLENBQUE7SUFDVCxRQUFRO0lBQ1IsMkRBQWMsQ0FBQTtBQUNsQixDQUFDLEVBUFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFPckI7QUFHRDtJQUFBO1FBWVksYUFBUSxHQUFXLElBQUksQ0FBQztJQStIcEMsQ0FBQztJQXZJaUIsc0JBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFJRCxTQUFTO0lBQ0QseUJBQUksR0FBWjtRQUNJLHdDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLHdDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLG9DQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25DLGdDQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sK0JBQVUsR0FBakI7UUFBQSxpQkFZQztRQVhHLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFB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LEtBQUssSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFDO2dCQUN0QyxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELFFBQVE7WUFDUixJQUFJLFFBQVEsR0FBRyx3Q0FBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUYsSUFBRyxRQUFRLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBQztnQkFDeEIsT0FBTyxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFNLENBQUMsVUFBVSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVE7b0JBQ3BGLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzFFO2lCQUFJO2dCQUNELElBQUksY0FBYyxHQUFHLHdDQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkcsT0FBTyxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxRQUFRLENBQUMsVUFBVTtvQkFDOUYseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsbUJBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7YUFDNUU7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUF4SWMsb0JBQVMsR0FBZSxJQUFJLENBQUM7SUF5SWhELGlCQUFDO0NBM0lELEFBMklDLElBQUE7QUEzSVksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvQ29tYmF0RWZmZWN0aXZlbmVzc1wiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9TcGlyaXRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgU3Bpcml0Q3VsdGl2YXRlTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvU3Bpcml0Q3VsdGl2YXRlXCI7XHJcbmltcG9ydCB7IFNwaXJpdE1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9TcGlyaXRNZXNzYWdlXCI7XHJcbmltcG9ydCB7IFNwaXJpdFNraWxsTWFuYWdlciB9IGZyb20gXCIuL0RhdGEvU3Bpcml0U2tpbGxcIjtcclxuaW1wb3J0IHsgUGV0TWVzc2FnZSB9IGZyb20gXCIuL1BldENvbmZpZ1wiO1xyXG5pbXBvcnQgUGV0SXRlbSBmcm9tIFwiLi9VaS9QZXRJdGVtXCI7XHJcblxyXG5leHBvcnQgZW51bSBTcGlyaXRUeXBle1xyXG4gICAgLyoq5Yqb6YePICovXHJcbiAgICBzdHJlbmd0aD0xLFxyXG4gICAgLyoq5pWP5o23ICovXHJcbiAgICBhZ2lsaXR5PTIsXHJcbiAgICAvKirmmbrlipsgKi9cclxuICAgIGludGVsbGlnZW5jZT0zLFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBldE1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUGV0TWFuYWdlciA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlBldE1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBQZXRNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXRlbV9wZXQ6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7XHJcbiAgICAgICAgU3Bpcml0QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFNwaXJpdEN1bHRpdmF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIFNwaXJpdFNraWxsTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFByZWZhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkUHJlZmFiKCl7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3BldC91aS9wZXRJdGVtJyxjYy5QcmVmYWIsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29cHJlZmFiX2VxdWlw5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIGFzc2V0cy5hZGRSZWYoKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtX3BldD1hc3NldHM7XHJcbiAgICAgICAgICAgIC8vY2MucmVzb3VyY2VzLnJlbGVhc2UoXCJlcXVpcG1lbnQvZXF1aXBJdGVtXCIsY2MuUHJlZmFiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQZXROb2RlQnlJbmZvKHBldE1lc3NhZ2U6UGV0TWVzc2FnZSxwQWM6UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkxvb2ssaGVyb1R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMKTpjYy5Ob2Rle1xyXG4gICAgICAgIGxldCBpdGVtPWNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbV9wZXQpO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQoaGVyb1R5cGUscGV0TWVzc2FnZSxwQWMpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuagueaNruijheWkh0lE6I635b6X5LiA5Liq6KOF5aSH6IqC54K5ICovXHJcbiAgICBwdWJsaWMgZ2V0UGV0Tm9kZUJ5SWQocGV0SWQ6bnVtYmVyLHBBYzpQcm9wQWN0aW9uPVByb3BBY3Rpb24uTG9vayxoZXJvVHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEwpOmNjLk5vZGV7XHJcbiAgICAgICAgbGV0IGl0ZW09Y2MuaW5zdGFudGlhdGUodGhpcy5pdGVtX3BldCk7XHJcbiAgICAgICAgbGV0IHBldE1lc3NhZ2U9bmV3IFBldE1lc3NhZ2UoKTtcclxuICAgICAgICBwZXRNZXNzYWdlLnBldF9pZD1wZXRJZDtcclxuICAgICAgICBwZXRNZXNzYWdlLnBldF9udW09MTtcclxuICAgICAgICBpdGVtLmdldENvbXBvbmVudChQZXRJdGVtKS5pbml0KGhlcm9UeXBlLHBldE1lc3NhZ2UscEFjKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrK1wiLGl0ZW0pXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5Y2V5Liq5a6g54mp5oiY5YqbXHJcbiAgICBnZXRQZXRaaGFuTGkocGV0SWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgemhhbmxpPTA7XHJcbiAgICAgICAgbGV0IHBldEluZm8gPSBTcGlyaXRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdEF0dHJpYnV0ZShwZXRJZCk7XHJcbiAgICAgICAgemhhbmxpID0gXHJcbiAgICAgICAgcGV0SW5mby5IZWFsdGggKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMSkgXHJcbiAgICAgICAgKyAgcGV0SW5mby5BdHRhY2sgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMilcclxuICAgICAgICArICBwZXRJbmZvLkRlZmVuc2UgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoMylcclxuICAgICAgICArICBwZXRJbmZvLkhpdCAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig0KVxyXG4gICAgICAgICsgIHBldEluZm8uTWlzcyAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig1KVxyXG4gICAgICAgICsgKCBwZXRJbmZvLkNyaXRpY2FsKSAqIENvbWJhdEVmZmVjdGl2ZW5lc3NNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29udmVyc2lvbkZhY3Rvcig2KVxyXG4gICAgICAgICsgIHBldEluZm8uQW50aUNyaXRpY2FsICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDcpXHJcbiAgICAgICAgKyAoIHBldEluZm8uRXh0cmFDcml0aWNhbCkgKiBDb21iYXRFZmZlY3RpdmVuZXNzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvbnZlcnNpb25GYWN0b3IoOClcclxuICAgICAgICArICBwZXRJbmZvLkFudGlFeHRyYUNyaXRpY2FsICogQ29tYmF0RWZmZWN0aXZlbmVzc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb252ZXJzaW9uRmFjdG9yKDkpXHJcbiAgICAgICAgemhhbmxpPU1hdGgucm91bmQoemhhbmxpKTtcclxuICAgICAgICByZXR1cm4gemhhbmxpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGV0UXVhbGl0eVRleHRDb2xvcihxdWFsaXR5Om51bWJlcik6Y2MuQ29sb3J7XHJcbiAgICAgICAgbGV0IGNvbG9yPWNjLmNvbG9yKCk7XHJcbiAgICAgICAgc3dpdGNoKHF1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTEzLCAyMjksIDEzMik7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yPWNjLmNvbG9yKDEwNSwgMTgzLCAyNTUpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyMjYsIDEyNiwgMjU1KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAxOTMsIDc0KTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCA3NCwgNzQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6e1xyXG4gICAgICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuajgOa1i+aYr+WQpuaciee6oueCueaPkOekuiAqL1xyXG4gICAgY2hlY2tSZWRUaXAoaGVyb1R5cGU6SGVyb19UeXBlKTpib29sZWFue1xyXG4gICAgICAgIGxldCBwZXRJZD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGhlcm9UeXBlKS5wZXRfaWQ7XHJcbiAgICAgICAgbGV0IHBldExpc3Q9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRMaXN0KCk7XHJcbiAgICAgICAgaWYocGV0SWQ9PTApe1xyXG4gICAgICAgICAgICAvL+ajgOa1i+aYr+WQpuacieepuuS9meeahOWuoOeJqVxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxwZXRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZvPXBldExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVyb0xpc3Q9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0SGVyb0xpc3QoaW5mbyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVtYWluTnVtPWluZm8ucGV0X251bS1oZXJvTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZihyZW1haW5OdW0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBwZXRJbmZvID0gU3Bpcml0QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TcGlyaXRBdHRyaWJ1dGUocGV0SWQpO1xyXG4gICAgICAgICAgICBsZXQgcGV0TWVzc2FnZSA9IFNwaXJpdE1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdE1lc3NhZ2UocGV0SW5mby5TcGlyaXRUeXBlKTtcclxuICAgICAgICAgICAgaWYocGV0SW5mby5TdGFnZSA+PSBwZXRNZXNzYWdlLlN0YWdlTGltaXQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5piv5ZCm5Y+v5Lul5Y2H5pifXHJcbiAgICAgICAgICAgIGxldCBjb3N0SW5mbyA9IFNwaXJpdEN1bHRpdmF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0Q3VsdGl2YXRlKHBldEluZm8uU3RhZ2UpO1xyXG4gICAgICAgICAgICBpZihjb3N0SW5mby5Db2luU3Bpcml0ID09IDApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkFuaW1hbEZvb2QpID49IGNvc3RJbmZvLkZvb2RDb3N0ICYmIFxyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKSA+PSBjb3N0SW5mby5Db2luQ29zdCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0U3RhZ2VJbmZvID0gU3Bpcml0QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFR5cGVGaXJzdEpzb25EYXRhKHBldEluZm8uU3Bpcml0VHlwZSk7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShmaXJzdFN0YWdlSW5mby5TcGlyaXRJdGVtKSA+PSBjb3N0SW5mby5Db2luU3Bpcml0ICYmXHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSkgPj0gY29zdEluZm8uRGlhbW9uZENvc3QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==