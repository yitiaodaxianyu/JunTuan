"use strict";
cc._RF.push(module, 'ad3bemeyKNOtrHwRjWbZ4dm', 'PetConfig');
// Scripts/Pet/PetConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetMessage = exports.LeaseType = exports.PetType = exports.PetSkillType = exports.PetInfo = void 0;
var HeroManager_1 = require("../Hero/Data/HeroManager");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var EventManager_1 = require("../Tools/EventManager");
var PetInfo = /** @class */ (function () {
    function PetInfo() {
        /**宠物id */
        this.pet_id = 20;
        /**宠物的等级 */
        this.pet_level = 10;
        /**宠物觉醒阶段 */
        this.pet_awaken_stage = 1;
        /**唯一的序列id */
        this.sequence_id = 1;
        /**宠物品质 */
        this.pet_quality = 6;
        /**绑定的英雄,NULL表示无绑定 */
        this.hero_type = HeroConfig_1.Hero_Type.NULL;
        /**租借来源 */
        this.lease_type = LeaseType.Null;
    }
    /**
     * 更改宠物绑定的英雄或和宠物交换绑定的英雄
     * @param petInfo 交换的宠物，null时表示自身下阵
     * @param heroType 指定绑定的英雄
     */
    PetInfo.prototype.changeBindHero = function (petInfo, heroType) {
        if (petInfo) {
            if (this.isEqual(petInfo)) {
                if (heroType == HeroConfig_1.Hero_Type.NULL) {
                    petInfo = null;
                }
                this.hero_type = heroType;
                HeroManager_1.HeroManager.getInstance().changeBindPet(this.hero_type, petInfo);
            }
            else {
                var curHeroType = this.hero_type;
                petInfo.hero_type = curHeroType;
                this.hero_type = heroType;
                if (heroType == HeroConfig_1.Hero_Type.NULL) {
                    petInfo = null;
                }
                //更改英雄的绑定            
                HeroManager_1.HeroManager.getInstance().changeBindPet(curHeroType, petInfo);
                HeroManager_1.HeroManager.getInstance().changeBindPet(this.hero_type, this);
            }
        }
        else {
            var curHeroType = this.hero_type;
            this.hero_type = heroType;
            HeroManager_1.HeroManager.getInstance().changeBindPet(heroType, this);
            HeroManager_1.HeroManager.getInstance().changeBindPet(curHeroType, petInfo);
        }
        EventManager_1.EventManager.postAssetsEvent(EventManager_1.AssetsEventType.TEAM_PET);
    };
    /**将宠物等级重置为一 */
    PetInfo.prototype.resetLevel = function () {
        this.pet_level = 1;
    };
    /**判断是否是同一个宠物 */
    PetInfo.prototype.isEqual = function (petInfo) {
        if (petInfo) {
            return petInfo.sequence_id == this.sequence_id;
        }
        return false;
    };
    return PetInfo;
}());
exports.PetInfo = PetInfo;
var PetSkillType;
(function (PetSkillType) {
    /**主动技能 */
    PetSkillType[PetSkillType["Active"] = 1] = "Active";
})(PetSkillType = exports.PetSkillType || (exports.PetSkillType = {}));
var PetType;
(function (PetType) {
    PetType[PetType["All"] = 0] = "All";
    PetType[PetType["Power"] = 1] = "Power";
    PetType[PetType["Agile"] = 2] = "Agile";
    PetType[PetType["Intelligence"] = 3] = "Intelligence";
})(PetType = exports.PetType || (exports.PetType = {}));
var LeaseType;
(function (LeaseType) {
    /**不是租借的 */
    LeaseType[LeaseType["Null"] = 0] = "Null";
    /**迷宫租借的 */
    LeaseType[LeaseType["Maze"] = 1] = "Maze";
})(LeaseType = exports.LeaseType || (exports.LeaseType = {}));
var PetMessage = /** @class */ (function () {
    function PetMessage() {
        this.pet_id = 0;
        this.pet_num = 0;
    }
    return PetMessage;
}());
exports.PetMessage = PetMessage;

cc._RF.pop();