"use strict";
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