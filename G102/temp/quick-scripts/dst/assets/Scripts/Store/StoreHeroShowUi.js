
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/StoreHeroShowUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ae513CVmhFy6y1FNDb8Wr0', 'StoreHeroShowUi');
// Scripts/Store/StoreHeroShowUi.ts

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
var GameManager_1 = require("../GameManager");
var HeroBaseInfo_1 = require("../Hero/Data/HeroBaseInfo");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var SkillLevelUnlock_1 = require("../Hero/Data/SkillLevelUnlock");
var HeroConfig_1 = require("../Hero/Game/HeroConfig");
var HeroSkillUi_1 = require("../Hero/Ui/HeroSkillUi");
var LevelManager_1 = require("../Level/LevelManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var TutorailsManager_1 = require("../Tutorials/TutorailsManager");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreHeroShowUi = /** @class */ (function (_super) {
    __extends(StoreHeroShowUi, _super);
    function StoreHeroShowUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = null;
        _this.hero_skeleton_data = [];
        _this.role_ui = null;
        return _this;
    }
    StoreHeroShowUi.prototype.init = function (uiAc) {
        var _this = this;
        _super.prototype.init.call(this, uiAc);
        var bbg = this.node.getChildByName('bbg');
        bbg.on(cc.Node.EventType.TOUCH_START, function () {
            if (TutorailsManager_1.default.getInstance().is_tutorails_state == true && LevelManager_1.LevelManager.getInstance().finish_level <= 3 && _this.hero_type == HeroConfig_1.Hero_Type.DeLuYi) {
                UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
            }
            else {
                _super.prototype.onClose.call(_this);
            }
        }, this);
    };
    StoreHeroShowUi.prototype.initData = function (heroType, isRecord) {
        if (isRecord === void 0) { isRecord = true; }
        this.hero_type = heroType;
        if (isRecord)
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.StoreHeroID + heroType % 110000, "1");
        this.refreshUi();
    };
    StoreHeroShowUi.prototype.refreshUi = function () {
        this.node.getChildByName("name").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getNameText_ID(this.hero_type));
        this.node.getChildByName("position").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroPositioning(this.hero_type));
        this.node.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Hero_Title_" + HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_0");
        this.node.getChildByName("nameBg").getComponent(cc.Sprite).spriteFrame = HeroManager_1.HeroManager.getInstance().getSpriteFrameByNames("Hero_Title_" + HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_1");
        var heroSp = this.node.getChildByName("heroSp").getComponent(sp.Skeleton);
        var skillRoot = this.node.getChildByName("skillRoot");
        var skillNum = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getSkillNum(this.hero_type);
        for (var i = 1; i <= 4; i++) {
            if (i > skillNum) {
                skillRoot.getChildByName("btnSkill" + i).active = false;
            }
            else {
                // let skill = skillRoot.getChildByName("btnSkill" + i);
                // skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_"+ this.hero_type +"_Skill_" + (i-1));
                // skill.active = true;
                // skill.children[0].getComponentInChildren(cc.Label).string = "1";
                var skill = skillRoot.getChildByName("btnSkill" + i);
                skill.active = true;
                var unlockLevel = SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance().getHeroLevel(i);
                if (HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type) < unlockLevel) {
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_" + this.hero_type + "_Skill_" + (i - 1));
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                    skill.children[0].active = false;
                }
                else {
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_" + this.hero_type + "_Skill_" + (i - 1));
                    skill.children[0].active = true;
                    skill.children[0].getComponentInChildren(cc.Label).string = '1';
                }
            }
        }
        heroSp.skeletonData = this.hero_skeleton_data[this.hero_type - 1];
        heroSp.setAnimation(0, "Attack", true);
        // anima.listener=null;
        heroSp.setCompleteListener(function () {
            // anima.listener=null;
            var name = '';
            var judge = Math.random();
            if (judge < 0.6) {
                name = 'Idle';
            }
            else if (judge < 0.8) {
                name = 'Attack';
            }
            else {
                name = 'Idle2';
            }
            heroSp.setAnimation(0, name, true);
        });
        // heroSp.node.scale = 0.4;
    };
    StoreHeroShowUi.prototype.onSkillClick = function (e, skillSlot) {
        var _this = this;
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.HeroSkill, UIConfig_1.UILayerLevel.Four, { onCompleted: function (uiNode) {
                uiNode.getComponent(HeroSkillUi_1.default).init(null);
                uiNode.getComponent(HeroSkillUi_1.default).initData(_this.hero_type, skillSlot);
            }, });
    };
    __decorate([
        property({ type: [sp.SkeletonData] })
    ], StoreHeroShowUi.prototype, "hero_skeleton_data", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], StoreHeroShowUi.prototype, "role_ui", void 0);
    StoreHeroShowUi = __decorate([
        ccclass
    ], StoreHeroShowUi);
    return StoreHeroShowUi;
}(UIComponent_1.default));
exports.default = StoreHeroShowUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXFN0b3JlSGVyb1Nob3dVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFDekMsMERBQWdFO0FBQ2hFLHdEQUF1RDtBQUN2RCxrRUFBd0U7QUFDeEUsc0RBQW9EO0FBQ3BELHNEQUFpRDtBQUNqRCxzREFBcUQ7QUFDckQsb0VBQStEO0FBQy9ELDBEQUFxRDtBQUNyRCwwREFBc0Q7QUFDdEQsNERBQThEO0FBQzlELGtFQUE2RDtBQUM3RCxpREFBNEM7QUFDNUMsMkNBQXNEO0FBRXRELDZDQUE0QztBQUV0QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBVztJQUF4RDtRQUFBLHFFQTJGQztRQXpGRyxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLHdCQUFrQixHQUFtQixFQUFFLENBQUM7UUFHeEMsYUFBTyxHQUFvQixJQUFJLENBQUM7O0lBbUZwQyxDQUFDO0lBakZHLDhCQUFJLEdBQUosVUFBSyxJQUFjO1FBQW5CLGlCQVdDO1FBVkcsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDO1lBQ2pDLElBQUcsMEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLElBQUUsSUFBSSxJQUFFLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxJQUFFLENBQUMsSUFBRSxLQUFJLENBQUMsU0FBUyxJQUFFLHNCQUFTLENBQUMsTUFBTSxFQUFDO2dCQUNySSxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLHVCQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUQ7aUJBQUk7Z0JBQ0QsaUJBQU0sT0FBTyxZQUFFLENBQUM7YUFDbkI7UUFFTCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsa0NBQVEsR0FBUixVQUFTLFFBQWtCLEVBQUMsUUFBcUI7UUFBckIseUJBQUEsRUFBQSxlQUFxQjtRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFHLFFBQVE7WUFDWCxrQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsMEJBQVUsQ0FBQyxXQUFXLEdBQUcsUUFBUSxHQUFHLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxrQ0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDaEwsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsa0NBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDeEwsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLEdBQUcsa0NBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtRQUM5TSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsR0FBRyxrQ0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQzdNLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFekUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEQsSUFBSSxRQUFRLEdBQUcsa0NBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3RSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQ3JCLElBQUcsQ0FBQyxHQUFDLFFBQVEsRUFBQztnQkFDVixTQUFTLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQzNEO2lCQUFJO2dCQUNELHdEQUF3RDtnQkFDeEQsdUhBQXVIO2dCQUN2SCx1QkFBdUI7Z0JBQ3ZCLG1FQUFtRTtnQkFDbkUsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLFdBQVcsR0FBSSwwQ0FBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3hFLElBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsRUFBQztvQkFDcEUsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRSxJQUFJLENBQUMsU0FBUyxHQUFFLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwSCxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUMvRixLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7aUJBQ3BDO3FCQUFJO29CQUNELEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUMxRixLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFFLElBQUksQ0FBQyxTQUFTLEdBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BILEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztpQkFDbkU7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsdUJBQXVCO1FBQ3ZCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUN2Qix1QkFBdUI7WUFDdkIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUcsS0FBSyxHQUFHLEdBQUcsRUFBQztnQkFDWCxJQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ2pCO2lCQUFLLElBQUcsS0FBSyxHQUFHLEdBQUcsRUFBQztnQkFDakIsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUNuQjtpQkFBSTtnQkFDRCxJQUFJLEdBQUcsT0FBTyxDQUFDO2FBQ2xCO1lBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsMkJBQTJCO0lBQy9CLENBQUM7SUFFRCxzQ0FBWSxHQUFaLFVBQWEsQ0FBQyxFQUFDLFNBQWdCO1FBQS9CLGlCQU9DO1FBTkcsdUVBQXVFO1FBQ3ZFLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFNLENBQUMsU0FBUyxFQUFDLHVCQUFZLENBQUMsSUFBSSxFQUFDLEVBQUMsV0FBVyxFQUFDLFVBQUMsTUFBTTtnQkFDeEYsTUFBTSxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsWUFBWSxDQUFDLHFCQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsQ0FBQztZQUN4RSxDQUFDLEdBQUUsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQXBGRDtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDOytEQUNLO0lBR3hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0RBQ087SUFSZixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBMkZuQztJQUFELHNCQUFDO0NBM0ZELEFBMkZDLENBM0Y0QyxxQkFBVyxHQTJGdkQ7a0JBM0ZvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9Ta2lsbExldmVsVW5sb2NrXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSGVyb1NraWxsVWkgZnJvbSBcIi4uL0hlcm8vVWkvSGVyb1NraWxsVWlcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRoZVN0b3JhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZUhlcm9TaG93VWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgaGVyb190eXBlOkhlcm9fVHlwZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOltzcC5Ta2VsZXRvbkRhdGFdfSlcclxuICAgIGhlcm9fc2tlbGV0b25fZGF0YTpzcC5Ta2VsZXRvbkRhdGFbXT1bXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICByb2xlX3VpIDogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgICAgIGxldCBiYmc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiYmcnKTtcclxuICAgICAgICBiYmcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT09dHJ1ZSYmTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsPD0zJiZ0aGlzLmhlcm9fdHlwZT09SGVyb19UeXBlLkRlTHVZaSl7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUFsbFVpRGlhbG9nKFVJTGF5ZXJMZXZlbC5PbmUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXREYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSxpc1JlY29yZDpib29sZWFuPXRydWUpe1xyXG4gICAgICAgIHRoaXMuaGVyb190eXBlID0gaGVyb1R5cGU7XHJcbiAgICAgICAgaWYoaXNSZWNvcmQpXHJcbiAgICAgICAgVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRJdGVtKFN0b3JhZ2VLZXkuU3RvcmVIZXJvSUQgKyBoZXJvVHlwZSAlIDExMDAwMCxcIjFcIik7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5hbWVUZXh0X0lEKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicG9zaXRpb25cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1Bvc2l0aW9uaW5nKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicXVhbGl0eVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWVzKFwiSGVyb19UaXRsZV9cIiArIEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKSArIFwiXzBcIilcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lQmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lcyhcIkhlcm9fVGl0bGVfXCIgKyBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSkgKyBcIl8xXCIpXHJcbiAgICAgICAgbGV0IGhlcm9TcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TcFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pXHJcblxyXG4gICAgICAgIGxldCBza2lsbFJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbFJvb3RcIik7XHJcbiAgICAgICAgbGV0IHNraWxsTnVtID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNraWxsTnVtKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAxO2kgPD0gNDtpKyspe1xyXG4gICAgICAgICAgICBpZihpPnNraWxsTnVtKXtcclxuICAgICAgICAgICAgICAgIHNraWxsUm9vdC5nZXRDaGlsZEJ5TmFtZShcImJ0blNraWxsXCIgKyBpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgc2tpbGwgPSBza2lsbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ta2lsbFwiICsgaSk7XHJcbiAgICAgICAgICAgICAgICAvLyBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fXCIrIHRoaXMuaGVyb190eXBlICtcIl9Ta2lsbF9cIiArIChpLTEpKTtcclxuICAgICAgICAgICAgICAgIC8vIHNraWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBza2lsbC5jaGlsZHJlblswXS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgIGxldCBza2lsbCA9IHNraWxsUm9vdC5nZXRDaGlsZEJ5TmFtZShcImJ0blNraWxsXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdW5sb2NrTGV2ZWwgPSAgU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwoaSlcclxuICAgICAgICAgICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSA8IHVubG9ja0xldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fXCIrIHRoaXMuaGVyb190eXBlICtcIl9Ta2lsbF9cIiArIChpLTEpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19cIisgdGhpcy5oZXJvX3R5cGUgK1wiX1NraWxsX1wiICsgKGktMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoZXJvU3Auc2tlbGV0b25EYXRhID0gdGhpcy5oZXJvX3NrZWxldG9uX2RhdGFbdGhpcy5oZXJvX3R5cGUtMV07XHJcbiAgICAgICAgaGVyb1NwLnNldEFuaW1hdGlvbigwLFwiQXR0YWNrXCIsdHJ1ZSk7XHJcbiAgICAgICAgLy8gYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICBoZXJvU3Auc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PntcclxuICAgICAgICAgICAgLy8gYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICAgICAgbGV0IGp1ZGdlID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgaWYoanVkZ2UgPCAwLjYpe1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdJZGxlJztcclxuICAgICAgICAgICAgfWVsc2UgaWYoanVkZ2UgPCAwLjgpe1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdBdHRhY2snO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnSWRsZTInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlcm9TcC5zZXRBbmltYXRpb24oMCxuYW1lLHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGhlcm9TcC5ub2RlLnNjYWxlID0gMC40O1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2tpbGxDbGljayhlLHNraWxsU2xvdDpudW1iZXIpe1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Ta2lsbCxVSUxheWVyTGV2ZWwuRm91cix7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoSGVyb1NraWxsVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoSGVyb1NraWxsVWkpLmluaXREYXRhKHRoaXMuaGVyb190eXBlLHNraWxsU2xvdCk7XHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==