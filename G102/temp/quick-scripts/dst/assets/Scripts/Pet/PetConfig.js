
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/PetConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxQZXRDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXVEO0FBQ3ZELHNEQUFvRDtBQUNwRCxzREFBc0U7QUFFdEU7SUFBQTtRQUNJLFVBQVU7UUFDVixXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLFdBQVc7UUFDWCxjQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLFlBQVk7UUFDWixxQkFBZ0IsR0FBUSxDQUFDLENBQUM7UUFDMUIsYUFBYTtRQUNiLGdCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQ3JCLFVBQVU7UUFDVixnQkFBVyxHQUFRLENBQUMsQ0FBQztRQUNyQixxQkFBcUI7UUFDckIsY0FBUyxHQUFXLHNCQUFTLENBQUMsSUFBSSxDQUFDO1FBQ25DLFVBQVU7UUFDVixlQUFVLEdBQVcsU0FBUyxDQUFDLElBQUksQ0FBQztJQTZDeEMsQ0FBQztJQTVDRzs7OztPQUlHO0lBQ0gsZ0NBQWMsR0FBZCxVQUFlLE9BQWUsRUFBQyxRQUFrQjtRQUM3QyxJQUFHLE9BQU8sRUFBQztZQUNQLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBQztnQkFDckIsSUFBRyxRQUFRLElBQUUsc0JBQVMsQ0FBQyxJQUFJLEVBQUM7b0JBQ3hCLE9BQU8sR0FBQyxJQUFJLENBQUM7aUJBQ2hCO2dCQUNELElBQUksQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFDO2dCQUN4Qix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25FO2lCQUFJO2dCQUNELElBQUksV0FBVyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxTQUFTLEdBQUMsV0FBVyxDQUFDO2dCQUM5QixJQUFJLENBQUMsU0FBUyxHQUFDLFFBQVEsQ0FBQztnQkFDeEIsSUFBRyxRQUFRLElBQUUsc0JBQVMsQ0FBQyxJQUFJLEVBQUM7b0JBQ3hCLE9BQU8sR0FBQyxJQUFJLENBQUM7aUJBQ2hCO2dCQUNELHFCQUFxQjtnQkFDckIseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3RCx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hFO1NBQ0o7YUFBSTtZQUNELElBQUksV0FBVyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBQyxRQUFRLENBQUM7WUFDeEIseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQztTQUNoRTtRQUNELDJCQUFZLENBQUMsZUFBZSxDQUFDLDhCQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNELGVBQWU7SUFDZiw0QkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELGdCQUFnQjtJQUNoQix5QkFBTyxHQUFQLFVBQVEsT0FBZTtRQUNuQixJQUFHLE9BQU8sRUFBQztZQUNQLE9BQU8sT0FBTyxDQUFDLFdBQVcsSUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQTNEQSxBQTJEQyxJQUFBO0FBM0RZLDBCQUFPO0FBNkRwQixJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDcEIsVUFBVTtJQUNWLG1EQUFRLENBQUE7QUFFWixDQUFDLEVBSlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFJdkI7QUFFRCxJQUFZLE9BS1g7QUFMRCxXQUFZLE9BQU87SUFDZixtQ0FBTyxDQUFBO0lBQ1AsdUNBQVMsQ0FBQTtJQUNULHVDQUFTLENBQUE7SUFDVCxxREFBZ0IsQ0FBQTtBQUNwQixDQUFDLEVBTFcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBS2xCO0FBRUQsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ2pCLFdBQVc7SUFDWCx5Q0FBTSxDQUFBO0lBQ04sV0FBVztJQUNYLHlDQUFJLENBQUE7QUFDUixDQUFDLEVBTFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFLcEI7QUFFRDtJQUFBO1FBQ0ksV0FBTSxHQUFVLENBQUMsQ0FBQztRQUNsQixZQUFPLEdBQVUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFBRCxpQkFBQztBQUFELENBSEEsQUFHQyxJQUFBO0FBSFksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEFzc2V0c0V2ZW50VHlwZSwgRXZlbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBldEluZm97XHJcbiAgICAvKirlrqDnialpZCAqL1xyXG4gICAgcGV0X2lkOm51bWJlcj0yMDtcclxuICAgIC8qKuWuoOeJqeeahOetiee6pyAqL1xyXG4gICAgcGV0X2xldmVsOm51bWJlcj0xMDtcclxuICAgIC8qKuWuoOeJqeiniemGkumYtuautSAqL1xyXG4gICAgcGV0X2F3YWtlbl9zdGFnZTpudW1iZXI9MTtcclxuICAgIC8qKuWUr+S4gOeahOW6j+WIl2lkICovXHJcbiAgICBzZXF1ZW5jZV9pZDpudW1iZXI9MTtcclxuICAgIC8qKuWuoOeJqeWTgei0qCAqL1xyXG4gICAgcGV0X3F1YWxpdHk6bnVtYmVyPTY7XHJcbiAgICAvKirnu5HlrprnmoToi7Hpm4QsTlVMTOihqOekuuaXoOe7keWumiAqL1xyXG4gICAgaGVyb190eXBlOkhlcm9fVHlwZT1IZXJvX1R5cGUuTlVMTDtcclxuICAgIC8qKuenn+WAn+adpea6kCAqL1xyXG4gICAgbGVhc2VfdHlwZTpMZWFzZVR5cGU9TGVhc2VUeXBlLk51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOabtOaUueWuoOeJqee7keWumueahOiLsembhOaIluWSjOWuoOeJqeS6pOaNoue7keWumueahOiLsembhFxyXG4gICAgICogQHBhcmFtIHBldEluZm8g5Lqk5o2i55qE5a6g54mp77yMbnVsbOaXtuihqOekuuiHqui6q+S4i+mYtVxyXG4gICAgICogQHBhcmFtIGhlcm9UeXBlIOaMh+Wumue7keWumueahOiLsembhFxyXG4gICAgICovXHJcbiAgICBjaGFuZ2VCaW5kSGVybyhwZXRJbmZvOlBldEluZm8saGVyb1R5cGU6SGVyb19UeXBlKXtcclxuICAgICAgICBpZihwZXRJbmZvKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc0VxdWFsKHBldEluZm8pKXtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9UeXBlPT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGV0SW5mbz1udWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvX3R5cGU9aGVyb1R5cGU7XHJcbiAgICAgICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZUJpbmRQZXQodGhpcy5oZXJvX3R5cGUscGV0SW5mbyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1ckhlcm9UeXBlPXRoaXMuaGVyb190eXBlO1xyXG4gICAgICAgICAgICAgICAgcGV0SW5mby5oZXJvX3R5cGU9Y3VySGVyb1R5cGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9fdHlwZT1oZXJvVHlwZTtcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9UeXBlPT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGV0SW5mbz1udWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/mm7TmlLnoi7Hpm4TnmoTnu5HlrpogICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlQmluZFBldChjdXJIZXJvVHlwZSxwZXRJbmZvKTtcclxuICAgICAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlQmluZFBldCh0aGlzLmhlcm9fdHlwZSx0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNleyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgY3VySGVyb1R5cGU9dGhpcy5oZXJvX3R5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb190eXBlPWhlcm9UeXBlO1xyXG4gICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZUJpbmRQZXQoaGVyb1R5cGUsdGhpcyk7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlQmluZFBldChjdXJIZXJvVHlwZSxwZXRJbmZvKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RBc3NldHNFdmVudChBc3NldHNFdmVudFR5cGUuVEVBTV9QRVQpOyAgIFxyXG4gICAgfVxyXG4gICAgLyoq5bCG5a6g54mp562J57qn6YeN572u5Li65LiAICovXHJcbiAgICByZXNldExldmVsKCl7XHJcbiAgICAgICAgdGhpcy5wZXRfbGV2ZWwgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWIpOaWreaYr+WQpuaYr+WQjOS4gOS4quWuoOeJqSAqL1xyXG4gICAgaXNFcXVhbChwZXRJbmZvOlBldEluZm8pOmJvb2xlYW57XHJcbiAgICAgICAgaWYocGV0SW5mbyl7XHJcbiAgICAgICAgICAgIHJldHVybiBwZXRJbmZvLnNlcXVlbmNlX2lkPT10aGlzLnNlcXVlbmNlX2lkO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFBldFNraWxsVHlwZXsgICAgXHJcbiAgICAvKirkuLvliqjmioDog70gKi9cclxuICAgIEFjdGl2ZT0xLFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gUGV0VHlwZSB7XHJcbiAgICBBbGwgPSAwLFxyXG4gICAgUG93ZXIgPSAxLC8v5Yqb6YePXHJcbiAgICBBZ2lsZSA9IDIsLy/mlY/mjbdcclxuICAgIEludGVsbGlnZW5jZSA9IDNcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTGVhc2VUeXBle1xyXG4gICAgLyoq5LiN5piv56ef5YCf55qEICovXHJcbiAgICBOdWxsPTAsXHJcbiAgICAvKirov7flrqvnp5/lgJ/nmoQgKi9cclxuICAgIE1hemUsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXRNZXNzYWdle1xyXG4gICAgcGV0X2lkOm51bWJlciA9IDA7XHJcbiAgICBwZXRfbnVtOm51bWJlciA9IDA7XHJcbn0iXX0=