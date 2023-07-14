"use strict";
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