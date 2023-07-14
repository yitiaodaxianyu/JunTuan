
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetDataItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e53f6J0TVJFq68ZhLgh/8Ki', 'PetDataItem');
// Scripts/Pet/Ui/PetDataItem.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIManager_1 = require("../../UI/UIManager");
var PetManager_1 = require("../PetManager");
var PetItem_1 = require("./PetItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetDataItem = /** @class */ (function (_super) {
    __extends(PetDataItem, _super);
    function PetDataItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ui_pet_info = null;
        _this.self_pet_info = null;
        _this.ui_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.self_hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.click_callback = null;
        _this.Common_Btn = [];
        return _this;
    }
    PetDataItem.prototype.initData = function (petMessage, uiPetId, heroType, clickCallback, selfHero) {
        if (selfHero === void 0) { selfHero = HeroConfig_1.Hero_Type.NULL; }
        this.self_pet_info = petMessage;
        this.ui_pet_info = uiPetId;
        this.ui_hero_type = heroType;
        this.self_hero_type = selfHero;
        this.click_callback = clickCallback;
        this.refreshUi();
    };
    PetDataItem.prototype.refreshUi = function () {
        var LM = LanguageManager_1.default.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        var equipRoot = this.node.getChildByName("equipRoot");
        if (equipRoot.childrenCount == 0) {
            var item = PetManager_1.PetManager.getInstance().getPetNodeByInfo(this.self_pet_info, PropConfig_1.PropAction.Null, this.self_hero_type);
            item.scale = 0.8;
            item.name = "item_equip";
            equipRoot.addChild(item);
        }
        else {
            var item = equipRoot.getChildByName("item_equip");
            item.getComponent(PetItem_1.default).init(this.self_hero_type, this.self_pet_info, PropConfig_1.PropAction.Null);
        }
        var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.self_pet_info.pet_id);
        var propName = this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string = "[" + PM.getPropQualityName(jsonItem.Quality) + "]" + LM.getStrByTextId(jsonItem.NameTextId);
        propName.color = PM.getPropQualityTextColor(jsonItem.Quality);
        var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
        propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string = PetManager_1.PetManager.getInstance().getPetZhanLi(this.self_pet_info.pet_id) + "";
        var heroType = this.self_hero_type;
        var isWear = heroType != HeroConfig_1.Hero_Type.NULL;
        if (heroType != HeroConfig_1.Hero_Type.NULL) {
            var heroIcon = this.node.getChildByName('heroIcon').getComponent(cc.Sprite);
            heroIcon.spriteFrame = PropManager_1.PropManager.getInstance().getHeroIconb(heroType);
        }
        this.node.getChildByName('exBg').active = isWear;
        this.node.getChildByName('heroIcon').active = isWear;
        this.node.getChildByName('Equipped_Icon').active = isWear;
        this.node.getChildByName('btnExchange').active = isWear;
        var btnEquip = this.node.getChildByName('btnEquip');
        btnEquip.active = !isWear;
        // if(this.ui_pet_info.pet_id!=0){
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(105,56,20)//.toHEX("#693814")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[1]
        // }else{
        //     btnEquip.getChildByName("titleLabel").getComponent(cc.LabelOutline).color=new cc.Color(12,56,86)//.toHEX("#0C3856")
        //     btnEquip.getComponent(cc.Sprite).spriteFrame=this.Common_Btn[0]
        // }
    };
    PetDataItem.prototype.onClickBtnExchange = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearPet(this.ui_hero_type, this.self_pet_info.pet_id);
        HeroManager_1.HeroManager.getInstance().addWearPet(this.self_hero_type, this.ui_pet_info.pet_id);
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
        if (this.click_callback) {
            this.click_callback(this.self_pet_info.pet_id);
        }
    };
    PetDataItem.prototype.onClickBtnEquip = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        HeroManager_1.HeroManager.getInstance().addWearPet(this.ui_hero_type, this.self_pet_info.pet_id);
        if (this.click_callback) {
            this.click_callback(this.self_pet_info.pet_id);
        }
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.ui_hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.ui_hero_type);
        if (oldCombat != newCombat) {
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], PetDataItem.prototype, "Common_Btn", void 0);
    PetDataItem = __decorate([
        ccclass
    ], PetDataItem);
    return PetDataItem;
}(cc.Component));
exports.default = PetDataItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0RGF0YUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsdUVBQWtFO0FBQ2xFLDZDQUFtRDtBQUNuRCxvREFBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCxnREFBK0M7QUFFL0MsNENBQTJDO0FBQzNDLHFDQUFnQztBQUUxQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQThGQztRQTVGRyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1QixtQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixrQkFBWSxHQUFXLHNCQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3RDLG9CQUFjLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDeEMsb0JBQWMsR0FBVSxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBa0IsRUFBRSxDQUFBOztJQXFGbEMsQ0FBQztJQW5GRyw4QkFBUSxHQUFSLFVBQVMsVUFBcUIsRUFBQyxPQUFrQixFQUFDLFFBQWtCLEVBQUMsYUFBc0IsRUFBQyxRQUFtQztRQUFuQyx5QkFBQSxFQUFBLFdBQXFCLHNCQUFTLENBQUMsSUFBSTtRQUMzSCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxJQUFJLEVBQUUsR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksRUFBRSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEQsSUFBRyxTQUFTLENBQUMsYUFBYSxJQUFJLENBQUMsRUFBQztZQUM1QixJQUFJLElBQUksR0FBQyx1QkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsdUJBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzNHLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1lBQ3pCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7YUFBSTtZQUNELElBQUksSUFBSSxHQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNGO1FBQ0QsSUFBSSxRQUFRLEdBQUMsa0JBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RSxJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlILFFBQVEsQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RCxJQUFJLFlBQVksR0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdkssUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxHQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLHVCQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUMsRUFBRSxDQUFDO1FBQ3hJLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQUMsUUFBUSxJQUFFLHNC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QUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzRSx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEYsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsRDtRQUNELElBQUksU0FBUyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzRSxJQUFJLE9BQU8sR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0UsSUFBRyxTQUFTLElBQUksU0FBUyxFQUFDO1lBQ3RCLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsc0JBQXNCLENBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkY7SUFDTCxDQUFDO0lBbkZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7bURBQ0s7SUFUYixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBOEYvQjtJQUFELGtCQUFDO0NBOUZELEFBOEZDLENBOUZ3QyxFQUFFLENBQUMsU0FBUyxHQThGcEQ7a0JBOUZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24gfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldE1lc3NhZ2UgfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgUGV0SXRlbSBmcm9tIFwiLi9QZXRJdGVtXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBldERhdGFJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICB1aV9wZXRfaW5mbzpQZXRNZXNzYWdlPW51bGw7XHJcbiAgICBzZWxmX3BldF9pbmZvOlBldE1lc3NhZ2U9bnVsbDtcclxuICAgIHVpX2hlcm9fdHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEw7XHJcbiAgICBzZWxmX2hlcm9fdHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEw7XHJcbiAgICBjbGlja19jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBDb21tb25fQnRuOmNjLlNwcml0ZUZyYW1lW109W11cclxuXHJcbiAgICBpbml0RGF0YShwZXRNZXNzYWdlOlBldE1lc3NhZ2UsdWlQZXRJZDpQZXRNZXNzYWdlLGhlcm9UeXBlOkhlcm9fVHlwZSxjbGlja0NhbGxiYWNrOkZ1bmN0aW9uLHNlbGZIZXJvOkhlcm9fVHlwZSA9IEhlcm9fVHlwZS5OVUxMKXtcclxuICAgICAgICB0aGlzLnNlbGZfcGV0X2luZm8gPSBwZXRNZXNzYWdlO1xyXG4gICAgICAgIHRoaXMudWlfcGV0X2luZm8gPSB1aVBldElkO1xyXG4gICAgICAgIHRoaXMudWlfaGVyb190eXBlID0gaGVyb1R5cGU7XHJcbiAgICAgICAgdGhpcy5zZWxmX2hlcm9fdHlwZSA9IHNlbGZIZXJvO1xyXG4gICAgICAgIHRoaXMuY2xpY2tfY2FsbGJhY2sgPSBjbGlja0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgbGV0IExNPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBQTT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBlcXVpcFJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcFJvb3RcIik7XHJcbiAgICAgICAgaWYoZXF1aXBSb290LmNoaWxkcmVuQ291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXROb2RlQnlJbmZvKHRoaXMuc2VsZl9wZXRfaW5mbyxQcm9wQWN0aW9uLk51bGwsdGhpcy5zZWxmX2hlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2NhbGUgPSAwLjg7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IFwiaXRlbV9lcXVpcFwiO1xyXG4gICAgICAgICAgICBlcXVpcFJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPWVxdWlwUm9vdC5nZXRDaGlsZEJ5TmFtZShcIml0ZW1fZXF1aXBcIik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQodGhpcy5zZWxmX2hlcm9fdHlwZSx0aGlzLnNlbGZfcGV0X2luZm8sUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGpzb25JdGVtPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkl0ZW0odGhpcy5zZWxmX3BldF9pbmZvLnBldF9pZCk7XHJcbiAgICAgICAgbGV0IHByb3BOYW1lPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcE5hbWUnKTtcclxuICAgICAgICBwcm9wTmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIltcIitQTS5nZXRQcm9wUXVhbGl0eU5hbWUoanNvbkl0ZW0uUXVhbGl0eSkrXCJdXCIrTE0uZ2V0U3RyQnlUZXh0SWQoanNvbkl0ZW0uTmFtZVRleHRJZCk7XHJcbiAgICAgICAgcHJvcE5hbWUuY29sb3I9UE0uZ2V0UHJvcFF1YWxpdHlUZXh0Q29sb3IoanNvbkl0ZW0uUXVhbGl0eSk7XHJcbiAgICAgICAgbGV0IE91dGxpbmVjb2xvcj1bbmV3IGNjLkNvbG9yKDM5LCAzNSwgMjgpLG5ldyBjYy5Db2xvcigyOSwgNjMsIDI3KSxuZXcgY2MuQ29sb3IoMjUsIDU1LCA4OCksbmV3IGNjLkNvbG9yKDY2LCAzNywgOTYpLG5ldyBjYy5Db2xvcig2MiwgMzIsIDApLG5ldyBjYy5Db2xvcig3OSwgMTYsIDE1KV1cclxuICAgICAgICBwcm9wTmFtZS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvcj1PdXRsaW5lY29sb3JbKGpzb25JdGVtLlF1YWxpdHkpXVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnemhhbmxpTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9UGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldFpoYW5MaSh0aGlzLnNlbGZfcGV0X2luZm8ucGV0X2lkKStcIlwiO1xyXG4gICAgICAgIGxldCBoZXJvVHlwZT10aGlzLnNlbGZfaGVyb190eXBlO1xyXG4gICAgICAgIGxldCBpc1dlYXI9aGVyb1R5cGUhPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgICAgIGlmKGhlcm9UeXBlIT1IZXJvX1R5cGUuTlVMTCl7XHJcbiAgICAgICAgICAgIGxldCBoZXJvSWNvbj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlcm9JY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGhlcm9JY29uLnNwcml0ZUZyYW1lPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ljb25iKGhlcm9UeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdleEJnJykuYWN0aXZlPWlzV2VhcjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2hlcm9JY29uJykuYWN0aXZlPWlzV2VhcjtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ0VxdWlwcGVkX0ljb24nKS5hY3RpdmU9aXNXZWFyO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuRXhjaGFuZ2UnKS5hY3RpdmU9aXNXZWFyO1xyXG4gICAgICAgIGxldCBidG5FcXVpcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkVxdWlwJylcclxuICAgICAgICBidG5FcXVpcC5hY3RpdmU9IWlzV2VhcjtcclxuICAgICAgICAvLyBpZih0aGlzLnVpX3BldF9pbmZvLnBldF9pZCE9MCl7XHJcbiAgICAgICAgLy8gICAgIGJ0bkVxdWlwLmdldENoaWxkQnlOYW1lKFwidGl0bGVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5jb2xvcj1uZXcgY2MuQ29sb3IoMTA1LDU2LDIwKS8vLnRvSEVYKFwiIzY5MzgxNFwiKVxyXG4gICAgICAgIC8vICAgICBidG5FcXVpcC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLkNvbW1vbl9CdG5bMV1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgYnRuRXF1aXAuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yPW5ldyBjYy5Db2xvcigxMiw1Niw4NikvLy50b0hFWChcIiMwQzM4NTZcIilcclxuICAgICAgICAvLyAgICAgYnRuRXF1aXAuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5Db21tb25fQnRuWzBdXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tCdG5FeGNoYW5nZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IG9sZENvbWJhdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1poYW5saSh0aGlzLnVpX2hlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLnVpX2hlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkV2VhclBldCh0aGlzLnVpX2hlcm9fdHlwZSx0aGlzLnNlbGZfcGV0X2luZm8ucGV0X2lkKTtcclxuICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFdlYXJQZXQodGhpcy5zZWxmX2hlcm9fdHlwZSx0aGlzLnVpX3BldF9pbmZvLnBldF9pZCk7XHJcblxyXG4gICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy51aV9oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy51aV9oZXJvX3R5cGUpO1xyXG4gICAgICAgIGlmKG9sZENvbWJhdCAhPSBuZXdDb21iYXQpe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jbGlja19jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfY2FsbGJhY2sodGhpcy5zZWxmX3BldF9pbmZvLnBldF9pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tCdG5FcXVpcCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IG9sZENvbWJhdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1poYW5saSh0aGlzLnVpX2hlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLnVpX2hlcm9fdHlwZSk7XHJcbiAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRXZWFyUGV0KHRoaXMudWlfaGVyb190eXBlLHRoaXMuc2VsZl9wZXRfaW5mby5wZXRfaWQpO1xyXG4gICAgICAgIGlmKHRoaXMuY2xpY2tfY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrX2NhbGxiYWNrKHRoaXMuc2VsZl9wZXRfaW5mby5wZXRfaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMudWlfaGVyb190eXBlKTtcclxuICAgICAgICBpZihvbGRDb21iYXQgIT0gbmV3Q29tYmF0KXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXQsbmV3Q29tYmF0LG9sZERhdGEsbmV3RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=