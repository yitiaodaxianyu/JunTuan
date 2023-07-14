
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Ui/RoleUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85c32l9KMRCQpIi0dKoNYjX', 'RoleUi');
// Scripts/Hero/Ui/RoleUi.ts

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
var ApkManager_1 = require("../../Ads/ApkManager");
var CoinPop_1 = require("../../CoinPop");
var EquipmentAttribute_1 = require("../../Equipment/Data/EquipmentAttribute");
var EquipmentMerge_1 = require("../../Equipment/Data/EquipmentMerge");
var EquipConfig_1 = require("../../Equipment/EquipConfig");
var EquipmentManager_1 = require("../../Equipment/EquipmentManager");
var EquipInfoUi_1 = require("../../Equipment/Ui/EquipInfoUi");
var EquipItem_1 = require("../../Equipment/Ui/EquipItem");
var ExclusiveInfoUi_1 = require("../../ExclusiveInfoUi/ExclusiveInfoUi");
var GameManager_1 = require("../../GameManager");
var HeroBaseInfo_1 = require("../../Hero/Data/HeroBaseInfo");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroTitle_1 = require("../../Hero/Data/HeroTitle");
var SkillLevelUnlock_1 = require("../../Hero/Data/SkillLevelUnlock");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Home_1 = require("../../Home");
var EWUnlockCost_1 = require("../../JsonData/EWUnlockCost");
var ExclusiveEnhancement_1 = require("../../JsonData/ExclusiveEnhancement");
var LevelManager_1 = require("../../Level/LevelManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var PetManager_1 = require("../../Pet/PetManager");
var PetExchangeUi_1 = require("../../Pet/Ui/PetExchangeUi");
var PetInfoUi_1 = require("../../Pet/Ui/PetInfoUi");
var PetItem_1 = require("../../Pet/Ui/PetItem");
var Prop_1 = require("../../Prop/Prop");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var StoreHeroShowUi_1 = require("../../Store/StoreHeroShowUi");
var TaskEnum_1 = require("../../Task/TaskEnum");
var TaskManager_1 = require("../../Task/TaskManager");
var EventManager_1 = require("../../Tools/EventManager");
var MyTool_1 = require("../../Tools/MyTool");
var NumberLabel_1 = require("../../Tools/NumberLabel");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var GetAssetsUi_1 = require("../../UI/GetAssetsUi");
var AtrributeUi_1 = require("../../UI/home/AtrributeUi");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var HeroAttribute_1 = require("../Data/HeroAttribute");
var HeroQuality_1 = require("../Data/HeroQuality");
var LevelUp_1 = require("../Data/LevelUp");
var ExclusiveWeaponsStrengtheningUi_1 = require("./ExclusiveWeaponsStrengtheningUi");
var ExclusiveWeaponsUi_1 = require("./ExclusiveWeaponsUi");
var HeroSkillUi_1 = require("./HeroSkillUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var State;
(function (State) {
    State[State["Preview"] = 0] = "Preview";
    State[State["Level"] = 1] = "Level";
    State[State["Star"] = 2] = "Star";
})(State || (State = {}));
var RoleUi = /** @class */ (function (_super) {
    __extends(RoleUi, _super);
    function RoleUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.role_ui = null;
        _this.hero_avatar_light = null;
        _this.cur_hero = null;
        _this.hero_skeleton_data = [];
        _this.hero_type = -1;
        _this.state = State.Level;
        _this.sqrtList = [];
        return _this;
    }
    RoleUi.prototype.init = function (uiAc) {
        this.ui_aciton = uiAc;
    };
    RoleUi.prototype.initData = function (heroType, sqrtList) {
        if (sqrtList === void 0) { sqrtList = []; }
        this.hero_type = heroType;
        var hero = HeroManager_1.HeroManager.getInstance().getHeroInfo(heroType);
        this.sqrtList = sqrtList;
        if (this.sqrtList.length == 0) {
            // let bottom = this.node.getChildByName("bottom");
            // bottom.getChildByName("arrow_right").active = false;
            // bottom.getChildByName("arrow_left").active = false;
            this.sqrtList = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getArrayData();
        }
        else {
            var bottom = this.node.getChildByName("bottom");
            bottom.getChildByName("arrow_right").active = true;
            bottom.getChildByName("arrow_left").active = true;
        }
        if (hero == null) {
            this.state = State.Preview;
            this.previewRefresh(false);
        }
        else {
            this.infoRefresh();
            this.state = State.Level;
            this.upgradeRefresh(false);
        }
    };
    RoleUi.prototype.start = function () {
        var _this = this;
        //教程
        this.scheduleOnce(function () {
            if (TutorailsManager_1.default.getInstance().isShowTutorials(301) == false && TutorailsManager_1.default.getInstance().isShowTutorials(302) && TutorailsManager_1.default.getInstance().is_tutorails_state == true) {
                //找到升级按钮
                var btnUpgrade = _this.node.getChildByName('bottom').getChildByName('level').getChildByName('upgradeBtn');
                var wordPos = btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
                var localPos = cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
                TutorailsManager_1.default.getInstance().showTutorials(302, null, function () {
                    TutorailsManager_1.default.getInstance().saveTutorials(302);
                }, true, null, localPos);
            }
            else if (TutorailsManager_1.default.getInstance().isShowTutorials(311) == false && TutorailsManager_1.default.getInstance().isShowTutorials(312)) {
                //切换到升星
                _this.onStarBtnClick();
                //找到升星按钮
                var btnUpgrade = _this.node.getChildByName('bottom').getChildByName('star').getChildByName('upstarBtn');
                var wordPos = btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
                var localPos = cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
                TutorailsManager_1.default.getInstance().showTutorials(312, null, function () {
                    TutorailsManager_1.default.getInstance().saveTutorials(312);
                }, true, null, localPos);
            }
            // else if(TutorailsManager.getInstance().isShowTutorials(221)==false&&TutorailsManager.getInstance().isShowTutorials(222)){
            //     //找到一键穿戴按钮
            //     let btnUpgrade=this.node.getChildByName('bottom').getChildByName('level').getChildByName('equipRoot').getChildByName('btnWear');
            //     let wordPos=btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
            //     let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
            //     TutorailsManager.getInstance().showTutorials(222,null,()=>{
            //         TutorailsManager.getInstance().saveTutorials(222);
            //     },true,null,localPos);
            // }else if(TutorailsManager.getInstance().isShowTutorials(225)==false&&TutorailsManager.getInstance().isShowTutorials(226)){
            //     //找到武器按钮
            //     let btnUpgrade=this.node.getChildByName('bottom').getChildByName('level').getChildByName('equipRoot').getChildByName('zbBg1');
            //     let wordPos=btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
            //     let localPos=cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
            //     TutorailsManager.getInstance().showTutorials(226,null,()=>{
            //     },false,null,localPos);
            // }
        }, 0.02);
    };
    // 解锁后通用显示刷新
    RoleUi.prototype.infoRefresh = function () {
        var top = this.node.getChildByName("top");
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type));
        top.getChildByName("coinLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin));
        top.getChildByName("gemLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem));
        top.getChildByName("name").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getNameText_ID(this.hero_type));
        top.getChildByName("nickname").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(HeroTitle_1.HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type, star));
        top.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_0");
        top.getChildByName("nameBg").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type) + "_1");
        if (star == 0) {
            top.getChildByName("star").active = false;
        }
        else {
            top.getChildByName("star").active = true;
            top.getChildByName("star").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + star);
        }
        var heroSp = this.node.getChildByName("bottom").getChildByName("heroSp").getComponent(sp.Skeleton);
        heroSp.skeletonData = this.hero_skeleton_data[this.hero_type - 1];
        heroSp.setAnimation(0, "Idle", true);
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
    // 升级刷新
    RoleUi.prototype.upgradeRefresh = function (isRefresh) {
        if (isRefresh === void 0) { isRefresh = true; }
        var HM = HeroManager_1.HeroManager.getInstance();
        var top = this.node.getChildByName("top");
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        top.getChildByName("coinLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin));
        top.getChildByName("gemLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem));
        var bottom = this.node.getChildByName("bottom");
        var level = bottom.getChildByName("level");
        var heroInfo = HM.getHeroInfo(this.hero_type);
        var heroData = HM.getHeroData(this.hero_type);
        var zhanli = HM.getHeroZhanli(this.hero_type);
        var equipRoot = level.getChildByName("equipRoot");
        var zbRoot = equipRoot.getChildByName("zbRoot");
        // zbRoot.removeAllChildren();
        if (heroInfo.exclusive_equip_stage < 1) {
            var exItem = zbRoot.getChildByName("equip5");
            exItem.getComponent(EquipItem_1.default).init(this.hero_type, heroBaseInfo.FirstExclusiveWeaponID, PropConfig_1.PropAction.Null);
            exItem.children[0].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            exItem.children[1].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            zbRoot.getChildByName("haveNum").active = true;
            zbRoot.getChildByName("needNum").active = true;
            zbRoot.getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment));
            zbRoot.getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality));
            if (PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment) > EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality)) {
                zbRoot.getChildByName("haveNum").color = cc.color(255, 255, 255);
            }
            else {
                zbRoot.getChildByName("haveNum").color = cc.color(255, 74, 74);
            }
        }
        else {
            var exItem = zbRoot.getChildByName("equip5");
            zbRoot.getChildByName("haveNum").active = false;
            zbRoot.getChildByName("needNum").active = false;
            exItem.children[0].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            exItem.children[1].getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            exItem.getComponent(EquipItem_1.default).init(this.hero_type, heroBaseInfo.FirstExclusiveWeaponID + ExclusiveEnhancement_1.ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(this.hero_type, heroInfo.exclusive_equip_stage).Star, PropConfig_1.PropAction.Null);
        }
        bottom.getChildByName("levelIcon").active = true;
        bottom.getChildByName("starIcon").active = true;
        if (HM.getHeroLevel(this.hero_type) > 1) {
            top.getChildByName("revertIcon").active = true;
        }
        else {
            top.getChildByName("revertIcon").active = false;
        }
        bottom.getChildByName("preview").active = this.state == State.Preview;
        bottom.getChildByName("level").active = this.state == State.Level;
        bottom.getChildByName("star").active = this.state == State.Star;
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0_1");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1");
        level.active = true;
        /**是否有穿戴的的提示 */
        var isHaveEquipRed = false;
        /**是否有合成红点的提示 */
        var isHaveMergeRed = false;
        for (var i = EquipConfig_1.EquipType.WuQi; i < EquipConfig_1.EquipType.Num; i++) {
            var wearId = HeroManager_1.HeroManager.getInstance().getWearEquipment(this.hero_type, i);
            var item = zbRoot.getChildByName("equip" + i);
            //是否可以穿戴更高或者可以穿戴
            var isCanWear = false;
            var isCanMerge = false;
            if (wearId != 0) {
                // 有装备
                item.active = true;
                var equipInfo = new EquipConfig_1.EquipInfo();
                equipInfo.equip_id = wearId;
                item.getComponent(EquipItem_1.default).init(this.hero_type, equipInfo, PropConfig_1.PropAction.Null);
                //是否能被消耗掉并且满足合成条件
                if (!EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getIsMaxStage(wearId)) {
                    isCanMerge = EquipmentManager_1.EquipmentManager.getInstance().checkAEquipMerge(EquipmentMerge_1.EquipmentMergeManager.getInstance().getTargetEquipment_id(wearId), []);
                }
            }
            else {
                item.active = false;
                // 无装备
            }
            // console.log("AB" + zbRoot.childrenCount);
            //检测红点
            var red = equipRoot.getChildByName('red' + i);
            isCanWear = EquipmentManager_1.EquipmentManager.getInstance().checkWear(this.hero_type, i);
            if (isCanWear) {
                isHaveEquipRed = true;
            }
            if (isCanMerge) {
                isHaveMergeRed = true;
            }
            red.active = isCanMerge || isCanWear;
        }
        if (HeroManager_1.HeroManager.getInstance().getWearPet(this.hero_type) == 0) {
            zbRoot.getChildByName("pet").active = false;
        }
        else {
            var pet = zbRoot.getChildByName("pet");
            pet.active = true;
            pet.getComponent(PetItem_1.default).init(this.hero_type, HeroManager_1.HeroManager.getInstance().getWearPet(this.hero_type), PropConfig_1.PropAction.Null);
        }
        bottom.getChildByName("levelNum").getComponent(cc.Label).string = 'LV.' + heroInfo.hero_level;
        if (isRefresh)
            bottom.getChildByName("fightNum").getComponent(NumberLabel_1.default).setTarget(zhanli, 0.5, true);
        else
            bottom.getChildByName("fightNum").getComponent(NumberLabel_1.default).init(zhanli, true);
        level.getChildByName("hpLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_hp);
        level.getChildByName("damageLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_attack);
        level.getChildByName("defenseLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_defense);
        level.getChildByName("atkSpeedLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.atkSpeed, 1);
        var skillRoot = level.getChildByName("skillRoot");
        var skillNum = heroBaseInfo.SkillNum;
        for (var i = 1; i <= 4; i++) {
            if (i <= skillNum) {
                var skill = skillRoot.getChildByName("btnSkill" + i);
                skill.active = true;
                var unlockLevel = SkillLevelUnlock_1.SkillLevelUnlockManager.getInstance().getHeroLevel(i);
                if (heroInfo.hero_level < unlockLevel) {
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_" + this.hero_type + "_Skill_" + (i - 1));
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                    skill.children[0].active = false;
                }
                else {
                    skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                    skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_" + this.hero_type + "_Skill_" + (i - 1));
                    skill.children[0].active = true;
                    skill.children[0].getComponentInChildren(cc.Label).string = '' + (HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, heroInfo.hero_stage) + 1).toString();
                }
            }
            else {
                skillRoot.getChildByName("btnSkill" + i).active = false;
            }
        }
        var upgradeBtn = level.getChildByName("upgradeBtn");
        var isLevel = false;
        var isCoin = false;
        var isGem = false;
        if (HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type) >= heroBaseInfo.MaxLevel) {
            level.getChildByName("coinBg").active = false;
            level.getChildByName("gemBg").active = false;
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            upgradeBtn.getComponentInChildren(TextLanguage_1.default).setTextId(120010);
            upgradeBtn.getChildByName('red').active = false;
        }
        else {
            var coinHaveNum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin);
            var coinNeedNum = LevelUp_1.LevelUpManager.getInstance().getCostCoin(heroInfo.hero_level);
            var gemHaveNum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem);
            var gemNeedNum = LevelUp_1.LevelUpManager.getInstance().getCostGem(heroInfo.hero_level);
            level.getChildByName("coinBg").active = true;
            level.getChildByName("gemBg").active = true;
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            upgradeBtn.getComponentInChildren(TextLanguage_1.default).setTextId(100018);
            level.getChildByName("coinBg").getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(coinHaveNum);
            level.getChildByName("coinBg").getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(coinNeedNum);
            level.getChildByName("gemBg").getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(gemHaveNum);
            level.getChildByName("gemBg").getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(gemNeedNum);
            // 升级按钮置灰，优先关卡置灰(即在金币足够的情况下，通过关卡没达到要求则按钮置灰)。
            // 如果是以为金币不足置灰则点击升级按钮弹出资源不足弹窗，如果是关卡限制置灰，点击升级按钮则提示通过关卡不足飘字提醒
            if (coinHaveNum < coinNeedNum) {
                level.getChildByName("coinBg").getChildByName("haveNum").color = cc.color(254, 76, 76);
            }
            else {
                level.getChildByName("coinBg").getChildByName("haveNum").color = cc.color(222, 199, 166);
                isCoin = true;
            }
            if (gemHaveNum < gemNeedNum) {
                level.getChildByName("gemBg").getChildByName("haveNum").color = cc.color(254, 76, 76);
            }
            else {
                level.getChildByName("gemBg").getChildByName("haveNum").color = cc.color(222, 199, 166);
                isGem = true;
            }
            if (gemNeedNum == 0) {
                level.getChildByName("coinBg").x = 0;
                level.getChildByName("gemBg").active = false;
            }
            else {
                level.getChildByName("coinBg").x = 150;
                level.getChildByName("gemBg").active = true;
            }
            var finishLevel = LevelManager_1.LevelManager.getInstance().finish_level;
            var needLevel = LevelUp_1.LevelUpManager.getInstance().getLevelLimit(heroInfo.hero_level);
            if (finishLevel < needLevel) {
                upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                isLevel = false;
            }
            else {
                upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                isLevel = true;
            }
        }
        //宠物的红点
        var isPetRed = PetManager_1.PetManager.getInstance().checkRedTip(this.hero_type);
        equipRoot.getChildByName('redPet').active = isPetRed;
        var isEx = HeroManager_1.HeroManager.getInstance().checkExUp(this.hero_type);
        ;
        equipRoot.getChildByName('redEx').active = isEx;
        //升级按钮红点
        var isCanUp = (isCoin && isLevel && isGem);
        upgradeBtn.getChildByName('red').active = isCanUp;
        //升级模块的按钮红点
        bottom.getChildByName("levelIcon").getChildByName('red').active = isHaveEquipRed || isCanUp || isHaveMergeRed || isPetRed || isEx;
        //升星模块的按钮红点
        bottom.getChildByName("starIcon").getChildByName('red').active = HeroManager_1.HeroManager.getInstance().checkUpStar(this.hero_type) || HeroManager_1.HeroManager.getInstance().checkAllPurposeFragment(this.hero_type);
        //一键穿戴
        equipRoot.getChildByName('btnWear').getChildByName('red').active = isHaveEquipRed;
    };
    // 升星刷新
    RoleUi.prototype.upstarRefresh = function (isRefresh) {
        if (isRefresh === void 0) { isRefresh = true; }
        var HM = HeroManager_1.HeroManager.getInstance();
        var bottom = this.node.getChildByName("bottom");
        var top = this.node.getChildByName("top");
        var star = bottom.getChildByName("star");
        var stage = HM.getHeroStage(this.hero_type) % 6;
        var heroData = HM.getHeroData(this.hero_type);
        if (HM.getHeroLevel(this.hero_type) > 1) {
            top.getChildByName("revertIcon").active = true;
        }
        else {
            top.getChildByName("revertIcon").active = false;
        }
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1_1");
        if (HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type) == HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxStage(this.hero_type)) {
            star.getChildByName("Hero_Arrow").active = false;
            star.getChildByName("targetHpNum").active = false;
            star.getChildByName("targetAtkNum").active = false;
            star.getChildByName("targetDefanceNum").active = false;
            star.getChildByName("Hero_Bg_1").active = false;
            star.getChildByName("Hero_Bg_2").active = false;
            star.getChildByName("Hero_Bg_3").active = false;
            star.getChildByName("costIcon").active = false;
            star.getChildByName("coinBg").active = false;
            star.getChildByName("needNum").active = false;
            star.getChildByName("haveNum").active = false;
            star.getChildByName("universalBtn").active = false;
            star.getChildByName("upstarBtn").active = false;
            star.getChildByName("Hero_Icon_1").active = false;
            star.getChildByName("Hero_Icon_2").active = false;
            star.getChildByName("Hero_Icon_3").active = false;
            star.getChildByName("Hero_Evolve_0_1").active = true;
            star.getChildByName("Hero_Evolve_0_2").active = true;
            star.getChildByName("Hero_Evolve_0_3").active = true;
            star.getChildByName("Hero_Evolve_0_4").active = true;
            star.getChildByName("Hero_Evolve_2_1").active = true;
            star.getChildByName("Hero_Evolve_2_2").active = true;
            star.getChildByName("Hero_Evolve_2_3").active = true;
            star.getChildByName("Hero_Evolve_2_4").active = true;
            star.getChildByName("Hero_Evolve_2_5").active = true;
            star.getChildByName("tipLabel").active = true;
            var zhanli_1 = HM.getHeroZhanli(this.hero_type);
            bottom.getChildByName("fightNum").getComponent(NumberLabel_1.default).setTarget(zhanli_1, 0.5, true);
            star.getChildByName("hpNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_hp);
            star.getChildByName("atkNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_attack);
            star.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_defense);
            return;
        }
        var targetHeroData = HM.getTargetHeroData(this.hero_type, HM.getHeroStage(this.hero_type) + 1, HM.getHeroLevel(this.hero_type));
        star.getChildByName("tipLabel").active = false;
        star.getChildByName("Hero_Arrow").active = true;
        star.getChildByName("targetHpNum").active = true;
        star.getChildByName("targetAtkNum").active = true;
        star.getChildByName("targetDefanceNum").active = true;
        star.getChildByName("Hero_Bg_1").active = true;
        star.getChildByName("Hero_Bg_2").active = true;
        star.getChildByName("Hero_Bg_3").active = true;
        star.getChildByName("costIcon").active = true;
        star.getChildByName("coinBg").active = true;
        star.getChildByName("needNum").active = true;
        star.getChildByName("haveNum").active = true;
        star.getChildByName("universalBtn").active = true;
        star.getChildByName("upstarBtn").active = true;
        star.getChildByName("Hero_Icon_1").active = true;
        star.getChildByName("Hero_Icon_2").active = true;
        star.getChildByName("Hero_Icon_3").active = true;
        bottom.getChildByName("levelIcon").active = true;
        bottom.getChildByName("starIcon").active = true;
        bottom.getChildByName("preview").active = this.state == State.Preview;
        bottom.getChildByName("level").active = this.state == State.Level;
        bottom.getChildByName("star").active = this.state == State.Star;
        var level = bottom.getChildByName("level");
        level.active = false;
        switch (stage) {
            case 0:
                for (var i = 1; i < 6; i++) {
                    var temp = star.getChildByName("Hero_Evolve_0_" + i);
                    if (temp != null) {
                        temp.active = false;
                    }
                    temp = star.getChildByName("Hero_Evolve_2_" + i);
                    temp.active = false;
                }
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                for (var i = 1; i < 6; i++) {
                    if (i <= stage) {
                        if (i == 3) {
                            star.getChildByName("Hero_Evolve_0_1").active = true;
                        }
                        if (i == 4) {
                            star.getChildByName("Hero_Evolve_0_2").active = true;
                        }
                        if (i == 5) {
                            star.getChildByName("Hero_Evolve_0_3").active = true;
                            star.getChildByName("Hero_Evolve_0_4").active = true;
                        }
                    }
                    else {
                        if (i == 3) {
                            star.getChildByName("Hero_Evolve_0_1").active = false;
                        }
                        if (i == 4) {
                            star.getChildByName("Hero_Evolve_0_2").active = false;
                        }
                        if (i == 5) {
                            star.getChildByName("Hero_Evolve_0_3").active = false;
                            star.getChildByName("Hero_Evolve_0_4").active = false;
                        }
                    }
                    var temp = star.getChildByName("Hero_Evolve_2_" + i);
                    if (i <= stage)
                        temp.active = true;
                    else
                        temp.active = false;
                }
                break;
        }
        var zhanli = HM.getHeroZhanli(this.hero_type);
        if (isRefresh)
            bottom.getChildByName("fightNum").getComponent(NumberLabel_1.default).setTarget(zhanli, 0.5, true);
        else
            bottom.getChildByName("fightNum").getComponent(NumberLabel_1.default).init(zhanli, true);
        star.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        star.getChildByName("hpNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_hp);
        star.getChildByName("atkNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_attack);
        star.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_defense);
        star.getChildByName("targetHpNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(targetHeroData.total_hp);
        star.getChildByName("targetAtkNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(targetHeroData.total_attack);
        star.getChildByName("targetDefanceNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(targetHeroData.total_defense);
        var haveNum = PropManager_1.PropManager.getInstance().getPropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        var needNum = HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type), HM.getHeroStage(this.hero_type));
        star.getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(haveNum);
        star.getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(needNum);
        if (haveNum < needNum) {
            star.getChildByName("haveNum").color = cc.color(254, 76, 76);
        }
        else {
            star.getChildByName("haveNum").color = cc.color(222, 199, 166);
        }
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                break;
        }
        var allFragmentRed = false;
        if (masterKeynum < 1) {
            star.getChildByName("universalBtn").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            star.getChildByName("universalBtn").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            allFragmentRed = false;
        }
        else {
            star.getChildByName("universalBtn").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            star.getChildByName("universalBtn").getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            allFragmentRed = HeroManager_1.HeroManager.getInstance().checkAllPurposeFragment(this.hero_type);
        }
        star.getChildByName("universalBtn").getChildByName('red').active = allFragmentRed;
        //升级模块的按钮红点
        bottom.getChildByName("levelIcon").getChildByName('red').active = HeroManager_1.HeroManager.getInstance().checkUpgrade(this.hero_type).is_can_up;
        //升星模块的按钮红点
        bottom.getChildByName("starIcon").getChildByName('red').active = haveNum >= needNum || allFragmentRed;
        //升星按钮的红点
        star.getChildByName("upstarBtn").getChildByName('red').active = haveNum >= needNum;
    };
    RoleUi.prototype.previewRefresh = function (isRefresh) {
        if (isRefresh === void 0) { isRefresh = true; }
        var HM = HeroManager_1.HeroManager.getInstance();
        var bottom = this.node.getChildByName("bottom");
        var preview = bottom.getChildByName("preview");
        // let heroInfo = HM.getHeroInfo(this.hero_type);
        var heroBaseInfo = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type);
        var heroMaxLevel = heroBaseInfo.MaxLevel;
        var heroMaxStage = heroBaseInfo.MaxStage;
        var heroData = HM.getTargetHeroData(this.hero_type, heroMaxStage, heroMaxLevel);
        var zhanli = HM.getTargetHeroZhanli(this.hero_type, heroMaxStage, heroMaxLevel);
        var top = this.node.getChildByName("top");
        bottom.getChildByName("levelIcon").active = false;
        top.getChildByName("revertIcon").active = false;
        bottom.getChildByName("starIcon").active = false;
        // preview.active = true;
        bottom.getChildByName("preview").active = this.state == State.Preview;
        bottom.getChildByName("level").active = this.state == State.Level;
        bottom.getChildByName("star").active = this.state == State.Star;
        preview.getChildByName("equip5").getComponent(EquipItem_1.default).init(this.hero_type, heroBaseInfo.FirstExclusiveWeaponID, PropConfig_1.PropAction.Null);
        preview.getChildByName("eHaveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment));
        preview.getChildByName("eNeedNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality));
        if (PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment) > EWUnlockCost_1.EWUnlockCostManager.getInstance().getCostFragment(heroBaseInfo.Quality)) {
            preview.getChildByName("eHaveNum").color = cc.color(255, 255, 255);
        }
        else {
            preview.getChildByName("eHaveNum").color = cc.color(255, 74, 74);
        }
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, heroMaxStage);
        top.getChildByName("coinLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin));
        top.getChildByName("gemLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem));
        top.getChildByName("name").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(heroBaseInfo.NameText_ID);
        top.getChildByName("nickname").getComponent(cc.Label).string =
            LanguageManager_1.default.getInstance().getStrByTextId(HeroTitle_1.HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type, star));
        top.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + heroBaseInfo.Quality + "_0");
        top.getChildByName("nameBg").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Title_" + heroBaseInfo.Quality + "_1");
        if (star == 0) {
            top.getChildByName("star").active = false;
        }
        else {
            top.getChildByName("star").active = true;
            top.getChildByName("star").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + star);
        }
        // let heroSp = this.node.getChildByName("bottom").getChildByName("heroSp").getComponent(sp.Skeleton)
        // heroSp.skeletonData = this.hero_skeleton_data[this.hero_type-1];
        // heroSp.animation = "Idle";
        var heroSp = this.node.getChildByName("bottom").getChildByName("heroSp").getComponent(sp.Skeleton);
        heroSp.skeletonData = this.hero_skeleton_data[this.hero_type - 1];
        heroSp.setAnimation(0, "Idle", true);
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
        bottom.getChildByName("levelNum").getComponent(cc.Label).string = 'LV.' + heroMaxLevel;
        if (isRefresh)
            bottom.getChildByName("fightNum").getComponent(NumberLabel_1.default).setTarget(zhanli, 0.5, true);
        else
            bottom.getChildByName("fightNum").getComponent(NumberLabel_1.default).init(zhanli, true);
        preview.getChildByName("costIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(heroBaseInfo.HeroFragment);
        preview.getChildByName("hpLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_hp);
        preview.getChildByName("damageLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_attack);
        preview.getChildByName("defenseLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_defense);
        preview.getChildByName("atkSpeedLabel").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.atkSpeed, 1);
        var skillRoot = preview.getChildByName("skillRoot");
        var skillNum = heroBaseInfo.SkillNum;
        for (var i = 1; i <= 4; i++) {
            if (i <= skillNum) {
                var skill = skillRoot.getChildByName("btnSkill" + i);
                skill.active = true;
                // let unlockLevel =  SkillLevelUnlockManager.getInstance().getHeroLevel(i)
                skill.getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_" + this.hero_type + "_Skill_" + (i - 1));
                skill.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                skill.children[0].active = true;
                skill.children[0].getComponentInChildren(cc.Label).string = '' + (HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, heroMaxStage) + 1).toString();
            }
            else {
                skillRoot.getChildByName("btnSkill" + i).active = false;
            }
        }
        var haveNum = PropManager_1.PropManager.getInstance().getPropNum(heroBaseInfo.HeroFragment);
        var needNum = heroBaseInfo.UnlockFragmentNum;
        preview.getChildByName("haveNum").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(haveNum);
        preview.getChildByName("needNum").getComponent(cc.Label).string = "/" + MyTool_1.default.getCoinDanwei(needNum);
        var upgradeBtn = preview.getChildByName("upgradeBtn");
        var unlockRed = preview.getChildByName("upgradeBtn").getChildByName('red');
        if (haveNum < needNum) {
            preview.getChildByName("haveNum").color = cc.color(254, 76, 76);
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            unlockRed.active = false;
        }
        else {
            preview.getChildByName("haveNum").color = cc.color(222, 199, 166);
            upgradeBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            upgradeBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            unlockRed.active = true;
        }
        var heroQuality = heroBaseInfo.Quality;
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                break;
        }
        var universalBtn = preview.getChildByName("universalBtn");
        var wannnegRed = universalBtn.getChildByName('red');
        if (masterKeynum < 1) {
            universalBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            universalBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            wannnegRed.active = false;
        }
        else {
            universalBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            universalBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
            var offsetNum = needNum - haveNum;
            var isCan = PropManager_1.PropManager.getInstance().getPropNum(HeroManager_1.HeroManager.getInstance().getHeroFragmentId(this.hero_type)) >= offsetNum;
            wannnegRed.active = offsetNum > 0 && isCan;
        }
    };
    RoleUi.prototype.showGetAssetsUi = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("reduction").active = false;
        this.node.getChildByName("exchange").active = false;
        // this.node.getChildByName("tip").active = true;
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(CoinPop_1.default).init({
                    onClose: function () {
                        _this.infoRefresh();
                        if (_this.state == State.Level) {
                            _this.upgradeRefresh();
                        }
                        else {
                            _this.upstarRefresh();
                        }
                        // this.upgradeRefresh();
                    }
                });
                uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Coin);
            }, });
    };
    RoleUi.prototype.onBtnCoin = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(CoinPop_1.default).init({
                    onClose: function () {
                        _this.infoRefresh();
                        if (_this.state == State.Level) {
                            _this.upgradeRefresh();
                        }
                        else {
                            _this.upstarRefresh();
                        }
                    }
                });
                uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Coin);
            }, });
    };
    RoleUi.prototype.onBtnGem = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(CoinPop_1.default).init({
                    onClose: function () {
                        _this.infoRefresh();
                        if (_this.state == State.Level) {
                            _this.upgradeRefresh();
                        }
                        else {
                            _this.upstarRefresh();
                        }
                    }
                });
                uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
            }, });
    };
    // onCloseGetAssetsBtnClick(){
    //     this.node.getChildByName("tip").active = false;
    // }
    RoleUi.prototype.showExchangeUi = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var exchange = this.node.getChildByName("exchange");
        exchange.active = true;
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var keyId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                keyId = PropConfig_1.PropId.HeroMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                keyId = PropConfig_1.PropId.HeroMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                keyId = PropConfig_1.PropId.HeroMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                keyId = PropConfig_1.PropId.HeroMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                keyId = PropConfig_1.PropId.HeroMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                keyId = PropConfig_1.PropId.HeroMasterKeySSS;
                break;
        }
        var p1 = PropManager_1.PropManager.getInstance().createPropItem(keyId, 0);
        var p2 = PropManager_1.PropManager.getInstance().createPropItem(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), 0);
        exchange.getChildByName("slider").getComponent(cc.Slider).progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = 0;
        exchange.getChildByName("num").getComponent(cc.Label).string = (exchange.getChildByName("slider").getComponent(cc.Slider).progress * masterKeynum).toFixed() + '/' + masterKeynum;
        exchange.getChildByName("Item_1").addChild(p1);
        exchange.getChildByName("Item_2").addChild(p2);
    };
    RoleUi.prototype.showPreviewExchangeUi = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var exchange = this.node.getChildByName("previewExchange");
        exchange.active = true;
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var keyId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                keyId = PropConfig_1.PropId.HeroMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                keyId = PropConfig_1.PropId.HeroMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                keyId = PropConfig_1.PropId.HeroMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                keyId = PropConfig_1.PropId.HeroMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                keyId = PropConfig_1.PropId.HeroMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                keyId = PropConfig_1.PropId.HeroMasterKeySSS;
                break;
        }
        var p1 = PropManager_1.PropManager.getInstance().createPropItem(keyId, 0);
        var p2 = PropManager_1.PropManager.getInstance().createPropItem(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), 0);
        exchange.getChildByName("slider").getComponent(cc.Slider).progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = 0;
        exchange.getChildByName("num").getComponent(cc.Label).string = (exchange.getChildByName("slider").getComponent(cc.Slider).progress * masterKeynum).toFixed() + '/' + masterKeynum;
        exchange.getChildByName("Item_1").addChild(p1);
        exchange.getChildByName("Item_2").addChild(p2);
    };
    RoleUi.prototype.onCloseUpStarTipBtnClick = function () {
        this.node.getChildByName("upStarTip").active = false;
    };
    RoleUi.prototype.showUpStarTip = function () {
        var HM = HeroManager_1.HeroManager.getInstance();
        var heroData = HM.getHeroData(this.hero_type);
        var oldHeroData = HM.getTargetHeroData(this.hero_type, HM.getHeroStage(this.hero_type) - 1, HM.getHeroLevel(this.hero_type));
        var star = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, HM.getHeroStage(this.hero_type));
        var oldStar = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, HM.getHeroStage(this.hero_type) - 1);
        var nickname = HeroTitle_1.HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type, star);
        var oldNickname = HeroTitle_1.HeroTitleManager.getInstance().getHeroTitleTextIdByHeroTypeAndHeroStar(this.hero_type, oldStar);
        var upStarTip = this.node.getChildByName("upStarTip");
        upStarTip.active = true;
        upStarTip.getChildByName("oldStar").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + oldStar);
        upStarTip.getChildByName("oldNickname").getComponent(TextLanguage_1.default).setTextId(oldNickname);
        upStarTip.getChildByName("oldSkill").getComponent(TextLanguage_1.default).startTranslation();
        upStarTip.getChildByName("oldSkill").getComponent(TextLanguage_1.default).string += "LV" + (oldStar + 1);
        upStarTip.getChildByName("oldHpNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(oldHeroData.total_hp);
        upStarTip.getChildByName("oldAtkNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(oldHeroData.total_attack);
        upStarTip.getChildByName("oldDefanceNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(oldHeroData.total_defense);
        upStarTip.getChildByName("star").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Star_" + star);
        upStarTip.getChildByName("nickname").getComponent(TextLanguage_1.default).setTextId(nickname);
        upStarTip.getChildByName("skillNum").getComponent(cc.Label).string = "LV" + (star + 1);
        upStarTip.getChildByName("hpNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_hp);
        upStarTip.getChildByName("atkNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_attack);
        upStarTip.getChildByName("defanceNum").getComponent(cc.Label).string = MyTool_1.default.numberFormat(heroData.total_defense);
    };
    RoleUi.prototype.sliderMoveResponce = function (slider) {
        var exchange = this.node.getChildByName("exchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                break;
        }
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    };
    RoleUi.prototype.previewSliderMoveResponce = function (slider) {
        var exchange = this.node.getChildByName("previewExchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                break;
        }
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    };
    RoleUi.prototype.onSkillClick = function (e, skillSlot) {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.HeroSkill, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(HeroSkillUi_1.default).init(null);
                uiNode.getComponent(HeroSkillUi_1.default).initData(_this.hero_type, skillSlot);
            }, });
    };
    RoleUi.prototype.onEquipmentClick = function (e, indexStr) {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.装备栏点击次数);
        var type = parseInt(indexStr);
        switch (type) {
            case 1:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄_武器栏点击次数);
                break;
            case 2:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄_护甲栏点击次数);
                break;
            case 3:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄_项链栏点击次数);
                break;
            case 4:
                FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄_鞋子栏点击次数);
                break;
        }
        var equipInfo = HeroManager_1.HeroManager.getInstance().getWearEquipment(this.hero_type, type); //是否带上了装备
        if (equipInfo) {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.EquipInfo, UIConfig_1.UILayerLevel.Two, {
                onCompleted: function (node) {
                    node.getComponent(EquipInfoUi_1.default).initData(_this.hero_type, equipInfo, PropConfig_1.PropAction.Use, {
                        prop_id: equipInfo,
                        prop_num: 1,
                        prop_price: 0,
                        prop_cost_id: 0,
                    }, null, function () {
                        _this.upgradeRefresh();
                    });
                }
            });
            // UIManager.getInstance().showEquipInfoUi(this.hero_type,equipInfo,PropAction.Use,{
            //     prop_id: equipInfo,
            //     prop_num: 1,
            //     prop_price:0,
            //     prop_cost_id:0,
            // },null,()=>{
            //     this.upgradeRefresh();
            // });
        }
        else {
            UIManager_1.UIManager.getInstance().showEquipExchangeUi({ onClose: function () {
                    _this.upgradeRefresh();
                } }, equipInfo, this.hero_type, type);
        }
    };
    RoleUi.prototype.onTakeOffClick = function () {
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.脱装点击次数);
        if (EquipmentManager_1.EquipmentManager.getInstance().checkQuickUnload(this.hero_type, true)) {
            HeroManager_1.HeroManager.getInstance().refreshHeroData(this.hero_type);
            // GameManager.getInstance().refreshZhanliShow();
            this.upgradeRefresh();
        }
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        if (oldCombat != newCombat)
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
    };
    RoleUi.prototype.onWearClick = function () {
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.一键穿戴点击次数);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同英雄点击一键穿戴的次数 + this.hero_type);
        if (EquipmentManager_1.EquipmentManager.getInstance().checkQuickWear(this.hero_type, true)) {
            HeroManager_1.HeroManager.getInstance().refreshHeroData(this.hero_type);
            // GameManager.getInstance().refreshZhanliShow();
            this.upgradeRefresh();
        }
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        if (oldCombat != newCombat)
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
    };
    RoleUi.prototype.onLevelBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.state = State.Level;
        this.infoRefresh();
        this.upgradeRefresh();
        var bottom = this.node.getChildByName("bottom");
        bottom.getChildByName("level").active = true;
        bottom.getChildByName("star").active = false;
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0_1");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1");
    };
    RoleUi.prototype.onStarBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.state = State.Star;
        this.infoRefresh();
        this.upstarRefresh(false);
        var bottom = this.node.getChildByName("bottom");
        bottom.getChildByName("level").active = false;
        bottom.getChildByName("star").active = true;
        bottom.getChildByName("levelIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_0");
        bottom.getChildByName("starIcon").getComponent(cc.Sprite).spriteFrame = this.role_ui.getSpriteFrame("Hero_Tab_Btn_1_1");
    };
    // 升级按钮
    RoleUi.prototype.onUpgradeBtnClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // 如果通过关卡未达到限制则飘字提示
        if (HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type) >= HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxLevel(this.hero_type)) {
            var str = LanguageManager_1.default.getInstance().getStrByTextId(120024);
            GameManager_1.default.getInstance().showMessage(str);
            return;
        }
        var finishLevel = LevelManager_1.LevelManager.getInstance().finish_level;
        var needLevel = LevelUp_1.LevelUpManager.getInstance().getLevelLimit(HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type));
        if (finishLevel < needLevel) {
            var str = LanguageManager_1.default.getInstance().getStrByTextId(720002);
            str = str.replace('~', needLevel.toString());
            GameManager_1.default.getInstance().showMessage(str);
            return;
        }
        // 如果金币不足则显示获取资源界面
        var coinHaveNum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Coin);
        var coinNeedNum = LevelUp_1.LevelUpManager.getInstance().getCostCoin(HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type));
        if (coinHaveNum < coinNeedNum) {
            this.showGetAssetsUi();
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄升级缺少金币的次数);
            return;
        }
        var gemHaveNum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.Gem);
        var gemNeedNum = LevelUp_1.LevelUpManager.getInstance().getCostGem(HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type));
        if (gemHaveNum < gemNeedNum) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄升级缺少钻石的次数);
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).init({
                        onClose: function () {
                            _this.infoRefresh();
                            if (_this.state == State.Level) {
                                _this.upgradeRefresh();
                            }
                            else {
                                _this.upstarRefresh();
                            }
                            // this.upgradeRefresh();
                        }
                    });
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                }, });
            return;
        }
        if (!PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, -coinNeedNum) || !PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -gemNeedNum)) {
            console.log("扣费失败");
        }
        else {
            var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            HeroManager_1.HeroManager.getInstance().addHeroLevel(this.hero_type);
            var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升级1次英雄);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Level);
            this.infoRefresh();
            this.upgradeRefresh();
            // UIManager.getInstance().showShengJi0(this.node.getChildByName("bottom").getChildByName("effect1"),cc.v2(0,0));
            // UIManager.getInstance().showShengJi1(this.node.getChildByName("bottom").getChildByName("effect2"),cc.v2(0,0));
            var bottom = this.node.getChildByName("bottom");
            UIManager_1.UIManager.getInstance().showEffectDialog(UIConfig_1.EffectPath.HeroUpgrade0, bottom.getChildByName("effect1"), "LevelUp_Back");
            UIManager_1.UIManager.getInstance().showEffectDialog(UIConfig_1.EffectPath.HeroUpgrade0, bottom.getChildByName("effect2"), "LevelUp_Front");
            // bottom.getChildByName("role_upgrade_0").getComponent(cc.Animation).play();
            // bottom.getChildByName("role_upgrade_1").getComponent(cc.Animation).play();
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同英雄的升级次数 + this.hero_type);
        }
    };
    // 升阶按钮
    RoleUi.prototype.onUpStageBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var haveNum = PropManager_1.PropManager.getInstance().getPropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        var needNum = HeroQuality_1.HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type), HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type));
        if (haveNum < needNum) {
            // this.showGetAssetsUi();
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄升星缺少碎片的次数);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同英雄升星是缺少碎片的次数 + this.hero_type);
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GetAssetsTip, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(GetAssetsUi_1.default).initData(GetAssetsUi_1.GetAssetsType.Hero);
                } });
            return;
        }
        if (!PropManager_1.PropManager.getInstance().changePropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), -needNum)) {
            console.log("扣费失败");
        }
        else {
            var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            HeroManager_1.HeroManager.getInstance().addHeroStage(this.hero_type);
            var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
            TaskManager_1.default.getInstance().emitTask(TaskEnum_1.TaskItem.升星1次英雄);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同英雄的升星次数 + this.hero_type);
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Advanced);
            if (HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type) % 6 == 0) {
                this.showUpStarTip();
            }
            else {
                var stage = HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type) % 6;
                this.node.getChildByName("bottom").getChildByName("star").getChildByName("starEffect").getComponent(sp.Skeleton).animation = "ShengXing" + stage;
            }
            this.infoRefresh();
            this.upstarRefresh();
        }
    };
    // 万能钥匙按钮
    RoleUi.prototype.onMasterKeyBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var textId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                textId = 120014;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                textId = 120015;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                textId = 120016;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                textId = 120017;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                textId = 120018;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                textId = 120019;
                break;
        }
        if (masterKeynum < 1) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(textId));
            return;
        }
        this.showExchangeUi();
    };
    // 预览万能钥匙按钮
    RoleUi.prototype.onPreviewMasterKeyBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var textId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                textId = 120014;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                textId = 120015;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                textId = 120016;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                textId = 120017;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                textId = 120018;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                textId = 120019;
                break;
        }
        if (masterKeynum < 1) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(textId));
            return;
        }
        this.showPreviewExchangeUi();
    };
    // 解锁按钮
    RoleUi.prototype.onUnlockBtnClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var haveNum = PropManager_1.PropManager.getInstance().getPropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type));
        var needNum = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getUnlockFragmentNum(this.hero_type);
        if (haveNum < needNum) {
            // this.showGetAssetsUi();
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.GetAssetsTip, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(GetAssetsUi_1.default).initData(GetAssetsUi_1.GetAssetsType.Hero);
                } });
            return;
        }
        this.state = State.Level;
        PropManager_1.PropManager.getInstance().changePropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), -needNum);
        HeroManager_1.HeroManager.getInstance().addHero(this.hero_type);
        this.infoRefresh();
        this.upgradeRefresh();
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroShowUi, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                uiNode.getComponent(StoreHeroShowUi_1.default).initData(_this.hero_type);
            } });
    };
    // 碎片转化按钮
    RoleUi.prototype.onExChangeBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
        var exchange = this.node.getChildByName("exchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var keyId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                keyId = PropConfig_1.PropId.HeroMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                keyId = PropConfig_1.PropId.HeroMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                keyId = PropConfig_1.PropId.HeroMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                keyId = PropConfig_1.PropId.HeroMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                keyId = PropConfig_1.PropId.HeroMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                keyId = PropConfig_1.PropId.HeroMasterKeySSS;
                break;
        }
        var num = Number((exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress * masterKeynum).toFixed());
        if (num == 0)
            return;
        PropManager_1.PropManager.getInstance().changePropNum(keyId, -num);
        PropManager_1.PropManager.getInstance().changePropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), num);
        FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.不同英雄通过万能碎片转换获得的碎片总数 + this.hero_type, num);
        var item = PropManager_1.PropManager.getInstance().createPropItem(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), num);
        GameManager_1.default.getInstance().showGetTip(item);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.万能碎片转化不同英雄次数 + this.hero_type);
        this.upstarRefresh(false);
    };
    // 预览碎片转换按钮
    RoleUi.prototype.onPreviewExChangeBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("previewExchange").active = false;
        var exchange = this.node.getChildByName("previewExchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        var keyId = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                keyId = PropConfig_1.PropId.HeroMasterKeyC;
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                keyId = PropConfig_1.PropId.HeroMasterKeyB;
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                keyId = PropConfig_1.PropId.HeroMasterKeyA;
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                keyId = PropConfig_1.PropId.HeroMasterKeyS;
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                keyId = PropConfig_1.PropId.HeroMasterKeySS;
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                keyId = PropConfig_1.PropId.HeroMasterKeySSS;
                break;
        }
        var num = Number((exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress * masterKeynum).toFixed());
        if (num == 0)
            return;
        PropManager_1.PropManager.getInstance().changePropNum(keyId, -num);
        PropManager_1.PropManager.getInstance().changePropNum(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), num);
        var item = PropManager_1.PropManager.getInstance().createPropItem(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getHeroFragment(this.hero_type), num);
        FollowManager_1.default.getInstance().addTotal(FollowConstants_1.Follow_Type.不同英雄通过万能碎片转换获得的碎片总数 + this.hero_type, num);
        GameManager_1.default.getInstance().showGetTip(item);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.万能碎片转化不同英雄次数 + this.hero_type);
        this.previewRefresh();
    };
    // 增加转换碎片按钮
    RoleUi.prototype.onChangeExchangeBtnClick = function (e, num) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        num = Number(num);
        var exchange = this.node.getChildByName("exchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                break;
        }
        var slider = exchange.getChildByName("slider").getComponent(cc.Slider);
        slider.progress = ((slider.progress * masterKeynum) + (1 * num)) / masterKeynum;
        if (slider.progress > 1)
            slider.progress = 1;
        if (slider.progress < 0)
            slider.progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    };
    RoleUi.prototype.onPreviewChangeExchangeBtnClick = function (e, num) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        num = Number(num);
        var exchange = this.node.getChildByName("previewExchange");
        var heroQuality = HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getQuality(this.hero_type);
        var masterKeynum = 0;
        switch (heroQuality) {
            case 1:
                // C
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyC);
                break;
            case 2:
                // B
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyB);
                break;
            case 3:
                // A
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyA);
                break;
            case 4:
                // S
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeyS);
                break;
            case 5:
                // SS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySS);
                break;
            case 6:
                // SSS
                masterKeynum = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.HeroMasterKeySSS);
                break;
        }
        var slider = exchange.getChildByName("slider").getComponent(cc.Slider);
        slider.progress = ((slider.progress * masterKeynum) + (1 * num)) / masterKeynum;
        if (slider.progress > 1)
            slider.progress = 1;
        if (slider.progress < 0)
            slider.progress = 0;
        exchange.getChildByName("slider").getComponent(cc.ProgressBar).progress = slider.progress;
        exchange.getChildByName("num").getComponent(cc.Label).string = (slider.progress * masterKeynum).toFixed() + '/' + masterKeynum;
    };
    // 关闭碎片转换界面
    RoleUi.prototype.onCloseExchangeBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("exchange").active = false;
    };
    // 关闭碎片转换界面
    RoleUi.prototype.onClosePreviewExchangeBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("previewExchange").active = false;
    };
    // 前往商店按钮
    // onGoShopBtnClick(){
    // this.node.getChildByName("tip").active = false;
    // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
    // GameManager.getInstance().game_to_home=Go_Type.City;
    // GameManager.getInstance().jumoAndShowUi();
    // UIManager.getInstance().closeAllUiDialog(UILayerLevel.One);
    // }
    RoleUi.prototype.onCloseReductionBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.getChildByName("reduction").active = false;
    };
    // 显示还原按钮
    RoleUi.prototype.onShowReductionBtnClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var reduction = this.node.getChildByName("reduction");
        var sum = LevelUp_1.LevelUpManager.getInstance().getNowLevelAllCostCoin(HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type));
        var itemRoot = reduction.getChildByName("itemRoot");
        itemRoot.children[0].getComponent(Prop_1.default).init(PropConfig_1.PropId.Coin, sum[0], PropConfig_1.PropAction.Look);
        if (sum[1] == 0) {
            itemRoot.children[1].active = false;
        }
        else {
            itemRoot.children[1].active = true;
            itemRoot.children[1].getComponent(Prop_1.default).init(PropConfig_1.PropId.Gem, sum[1], PropConfig_1.PropAction.Look);
        }
        reduction.active = true;
        reduction.getChildByName("richText").getComponent(cc.RichText).string = LanguageManager_1.default.getInstance().getStrByTextId(100098);
    };
    // 还原按钮
    RoleUi.prototype.onReductionBtnClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -200)) {
            var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            var sum = LevelUp_1.LevelUpManager.getInstance().getNowLevelAllCostCoin(HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type));
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Coin, sum[0]);
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, sum[1]);
            GameManager_1.default.getInstance().showMultipleGetTip([PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, sum[0]), PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, sum[1])]);
            HeroManager_1.HeroManager.getInstance().resetHeroLvel(this.hero_type);
            var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
            var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
            this.node.getChildByName("reduction").active = false;
            this.infoRefresh();
            if (this.state == State.Level) {
                this.upgradeRefresh();
            }
            else {
                this.upstarRefresh();
            }
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同英雄还原的次数 + this.hero_type);
        }
        else {
            this.node.getChildByName("reduction").active = false;
            // this.onCloseReductionBtnClick();
            // this.showGetAssetsUi();
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).init({
                        onClose: function () {
                            _this.infoRefresh();
                            if (_this.state == State.Level) {
                                _this.upgradeRefresh();
                            }
                            else {
                                _this.upstarRefresh();
                            }
                        }
                    });
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                }, });
        }
    };
    RoleUi.prototype.onAttributeBtnClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.查看英雄属性详情);
        // UIManager.getInstance().showAttributeUi(null,this.hero_type);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Attribute, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                // uiNode.getComponent(AtrributeUi).init(uiAction);
                uiNode.getComponent(AtrributeUi_1.default).init(null);
                uiNode.getComponent(AtrributeUi_1.default).initHeroType(_this.hero_type);
            }, });
    };
    RoleUi.prototype.onPreviewAttributeBtnClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.查看英雄属性详情);
        // UIManager.getInstance().showAttributeUi(null,this.hero_type);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Attribute, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                // uiNode.getComponent(AtrributeUi).init(uiAction);
                uiNode.getComponent(AtrributeUi_1.default).init(null);
                uiNode.getComponent(AtrributeUi_1.default).initPreviewHeroType(_this.hero_type, HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxStage(_this.hero_type), HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getMaxLevel(_this.hero_type));
            }, });
    };
    RoleUi.prototype.onBtnExclusiveEquipmentClick = function () {
        var _this = this;
        // console.log("这个按钮被点击了");
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ExclusiveInfoUi, UIConfig_1.UILayerLevel.Two, {
            onCompleted: function (uiNode) {
                uiNode.getComponent(ExclusiveInfoUi_1.default).init({
                    onClose: function () {
                        _this.upgradeRefresh();
                    }
                });
                uiNode.getComponent(ExclusiveInfoUi_1.default).initData(_this.hero_type);
            }
        });
    };
    RoleUi.prototype.onBtnPetClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄界面宠物栏点击次数);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.英雄_灵宠栏点击次数);
        if (HeroManager_1.HeroManager.getInstance().getWearPet(this.hero_type) == 0) {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.PetList, UIConfig_1.UILayerLevel.Two, {
                onCompleted: function (uiNode) {
                    uiNode.getComponent(PetExchangeUi_1.default).init({
                        onClose: function () {
                            _this.upgradeRefresh();
                        }
                    });
                    uiNode.getComponent(PetExchangeUi_1.default).initData(HeroManager_1.HeroManager.getInstance().getWearPet(_this.hero_type), _this.hero_type);
                }
            });
        }
        else {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.PetInfo, UIConfig_1.UILayerLevel.Two, {
                onCompleted: function (uiNode) {
                    uiNode.getComponent(PetInfoUi_1.default).init({
                        onClose: function () {
                            _this.upgradeRefresh();
                        }
                    });
                    uiNode.getComponent(PetInfoUi_1.default).initData(_this.hero_type);
                }
            });
        }
        // UIManager.getInstance().showPetExchangeUi({onClose:()=>{
        //     // this.initUi();
        // }},HeroManager.getInstance().getHeroData(this.hero_type).pet_info,this.hero_type)
    };
    RoleUi.prototype.onBtnExclusiveEquipAddClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // UIManager.getInstance().showExclusiveWeaponsStrengtheningUi({
        //     onClose:()=>{
        //         this.initUi();
        //     }
        // },this.hero_type,true);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.ExclusiveStrengthening, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(ExclusiveWeaponsStrengtheningUi_1.default).init({
                    onClose: function () {
                        // this.initUi();
                    }
                });
                uiNode.getComponent(ExclusiveWeaponsStrengtheningUi_1.default).initData(_this.hero_type, true);
            }, });
    };
    RoleUi.prototype.onBtnExclusiveEquipStrengtheningUi = function () {
        var _this = this;
        // console.log("aaa")
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        // UIManager.getInstance().showExclusiveWeaponsUi({
        //     onClose:()=>{
        //         this.initUi();
        //     }
        // },this.hero_type);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Exclusive, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(ExclusiveWeaponsUi_1.default).init({
                    onClose: function () {
                        // this.initUi();
                    }
                });
                uiNode.getComponent(ExclusiveWeaponsUi_1.default).initData(_this.hero_type);
            }, });
    };
    RoleUi.prototype.onClickExclusiveWeapon = function () {
        if (HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type) <= 100) {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(130005));
        }
    };
    RoleUi.prototype.onClickArrowBtn = function (e, dir) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        dir = Number(dir);
        if (this.sqrtList == null) {
            var heroType = this.hero_type + dir;
            if (heroType <= HeroConfig_1.Hero_Type.NULL)
                heroType = HeroConfig_1.Hero_Type.Hero_Num - 1;
            if (heroType >= HeroConfig_1.Hero_Type.Hero_Num)
                heroType = HeroConfig_1.Hero_Type.NULL + 1;
            this.initData(heroType);
        }
        else {
            var index = this.sqrtList.indexOf(HeroBaseInfo_1.HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(this.hero_type));
            index += dir;
            if (index >= this.sqrtList.length)
                index = 0;
            if (index < 0)
                index = this.sqrtList.length - 1;
            this.initData(this.sqrtList[index].Hero_ID, this.sqrtList);
        }
        // this.destroySelf();
        // UIManager.getInstance().showUiDialog(UIPath.HeroGrowth,UILayerLevel.One,{onCompleted:(uiNode)=>{
        //     uiNode.getComponent(RoleUi).init({
        //         onClose:()=>{
        //             this.onRefresh();
        //         }
        //     });
        //     uiNode.getComponent(RoleUi).initData(heroType);
        // },});
    };
    RoleUi.prototype.getHeroAttributeId = function (heroType, heroLevel) {
        return heroType * 10000 + heroLevel;
    };
    // getHeroQualityTextColor(quality:number):cc.Color{
    //     let color=cc.color();
    //     switch(quality){
    //         case 2:
    //         case 1:{
    //             color=cc.color(113, 229, 132);
    //         }break;
    //         case 3:
    //         case 4:{
    //             color=cc.color(105, 183, 255);
    //         }break;
    //         case 5:
    //         case 6:{
    //             color=cc.color(226, 126, 255);
    //         }break;
    //         case 7:
    //         case 8:{
    //             color=cc.color(255, 193, 74);
    //         }break;
    //         case 9:
    //         case 10:{
    //             color=cc.color(255, 74, 74);
    //         }break;
    //         case 11:
    //         case 12:{
    //             color=cc.color(255, 255, 255);
    //         }break;
    //     }
    //     return color;
    // }
    RoleUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
        HeroManager_1.HeroManager.getInstance().reportHeroList();
        PropManager_1.PropManager.getInstance().saveAllPropNum(true);
        cc.find("Canvas").getComponent(Home_1.default).refreshTop();
    };
    RoleUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, HeroManager_1.HeroManager.getRedTypeByHeroType(this.hero_type));
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], RoleUi.prototype, "role_ui", void 0);
    __decorate([
        property(cc.Node)
    ], RoleUi.prototype, "hero_avatar_light", void 0);
    __decorate([
        property(cc.Node)
    ], RoleUi.prototype, "cur_hero", void 0);
    __decorate([
        property({ type: [sp.SkeletonData] })
    ], RoleUi.prototype, "hero_skeleton_data", void 0);
    RoleUi = __decorate([
        ccclass
    ], RoleUi);
    return RoleUi;
}(UIComponent_1.default));
exports.default = RoleUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXFJvbGVVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLDhFQUFvRjtBQUNwRixzRUFBNEU7QUFDNUUsMkRBQW1FO0FBQ25FLHFFQUFvRTtBQUNwRSw4REFBeUQ7QUFDekQsMERBQXFEO0FBQ3JELHlFQUFvRTtBQUNwRSxpREFBNEM7QUFDNUMsNkRBQXFGO0FBQ3JGLDJEQUEwRDtBQUMxRCx1REFBNkQ7QUFDN0QscUVBQTJFO0FBQzNFLHlEQUF1RDtBQUN2RCxtQ0FBOEI7QUFDOUIsNERBQWtFO0FBQ2xFLDRFQUFrRjtBQUNsRix5REFBd0Q7QUFDeEQsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBQzVELG1EQUFrRDtBQUNsRCw0REFBdUQ7QUFDdkQsb0RBQStDO0FBQy9DLGdEQUEyQztBQUMzQyx3Q0FBbUM7QUFDbkMsb0RBQTJEO0FBQzNELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsK0RBQTBEO0FBQzFELGdEQUErQztBQUMvQyxzREFBaUQ7QUFDakQseURBQXNGO0FBQ3RGLDZDQUF3QztBQUN4Qyx1REFBa0Q7QUFDbEQscUVBQWdFO0FBQ2hFLG9EQUFrRTtBQUNsRSx5REFBb0Q7QUFDcEQsb0RBQStDO0FBQy9DLDhDQUFxRTtBQUVyRSxnREFBK0M7QUFDL0MsdURBQTZEO0FBRTdELG1EQUF5RDtBQUN6RCwyQ0FBaUQ7QUFDakQscUZBQWdGO0FBQ2hGLDJEQUFzRDtBQUN0RCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBSyxLQUlKO0FBSkQsV0FBSyxLQUFLO0lBQ04sdUNBQVcsQ0FBQTtJQUNYLG1DQUFLLENBQUE7SUFDTCxpQ0FB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QUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBRUksaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsb0JBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QywyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLFNBQVMsRUFBQyx5QkFBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUEzckREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkNBQ087SUFFaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDaUI7SUFFbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDUTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBQyxDQUFDO3NEQUNLO0lBVHZCLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0Fnc0QxQjtJQUFELGFBQUM7Q0Foc0RELEFBZ3NEQyxDQWhzRG1DLHFCQUFXLEdBZ3NEOUM7a0JBaHNEb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi8uLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29pblBvcCBmcm9tIFwiLi4vLi4vQ29pblBvcFwiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNZXJnZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L0RhdGEvRXF1aXBtZW50TWVyZ2VcIjtcclxuaW1wb3J0IHsgRXF1aXBJbmZvLCBFcXVpcFR5cGUgfSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L0VxdWlwQ29uZmlnXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L0VxdWlwbWVudE1hbmFnZXJcIjtcclxuaW1wb3J0IEVxdWlwSW5mb1VpIGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvVWkvRXF1aXBJbmZvVWlcIjtcclxuaW1wb3J0IEVxdWlwSXRlbSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L1VpL0VxdWlwSXRlbVwiO1xyXG5pbXBvcnQgRXhjbHVzaXZlSW5mb1VpIGZyb20gXCIuLi8uLi9FeGNsdXNpdmVJbmZvVWkvRXhjbHVzaXZlSW5mb1VpXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb0Jhc2VJbmZvTWFuYWdlciwgSnNvbkhlcm9CYXNlSW5mbyB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb0Jhc2VJbmZvXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvVGl0bGVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvVGl0bGVcIjtcclxuaW1wb3J0IHsgU2tpbGxMZXZlbFVubG9ja01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL1NraWxsTGV2ZWxVbmxvY2tcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCBIb21lIGZyb20gXCIuLi8uLi9Ib21lXCI7XHJcbmltcG9ydCB7IEVXVW5sb2NrQ29zdE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRVdVbmxvY2tDb3N0XCI7XHJcbmltcG9ydCB7IEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FeGNsdXNpdmVFbmhhbmNlbWVudFwiO1xyXG5pbXBvcnQgeyBMZXZlbE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vTGV2ZWwvTGV2ZWxNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi8uLi9QZXQvUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgUGV0RXhjaGFuZ2VVaSBmcm9tIFwiLi4vLi4vUGV0L1VpL1BldEV4Y2hhbmdlVWlcIjtcclxuaW1wb3J0IFBldEluZm9VaSBmcm9tIFwiLi4vLi4vUGV0L1VpL1BldEluZm9VaVwiO1xyXG5pbXBvcnQgUGV0SXRlbSBmcm9tIFwiLi4vLi4vUGV0L1VpL1BldEl0ZW1cIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4uLy4uL1Byb3AvUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgU3RvcmVIZXJvU2hvd1VpIGZyb20gXCIuLi8uLi9TdG9yZS9TdG9yZUhlcm9TaG93VWlcIjtcclxuaW1wb3J0IHsgVGFza0l0ZW0gfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrRW51bVwiO1xyXG5pbXBvcnQgVGFza01hbmFnZXIgZnJvbSBcIi4uLy4uL1Rhc2svVGFza01hbmFnZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IE51bWJlckxhYmVsIGZyb20gXCIuLi8uLi9Ub29scy9OdW1iZXJMYWJlbFwiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IEdldEFzc2V0c1VpLCB7IEdldEFzc2V0c1R5cGUgfSBmcm9tIFwiLi4vLi4vVUkvR2V0QXNzZXRzVWlcIjtcclxuaW1wb3J0IEF0cnJpYnV0ZVVpIGZyb20gXCIuLi8uLi9VSS9ob21lL0F0cnJpYnV0ZVVpXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRWZmZWN0UGF0aCwgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvQXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9BdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgSGVyb0RhdGEgfSBmcm9tIFwiLi4vRGF0YS9IZXJvRGF0YVwiO1xyXG5pbXBvcnQgeyBIZXJvUXVhbGl0eU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvUXVhbGl0eVwiO1xyXG5pbXBvcnQgeyBMZXZlbFVwTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0xldmVsVXBcIjtcclxuaW1wb3J0IEV4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkgZnJvbSBcIi4vRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaVwiO1xyXG5pbXBvcnQgRXhjbHVzaXZlV2VhcG9uc1VpIGZyb20gXCIuL0V4Y2x1c2l2ZVdlYXBvbnNVaVwiO1xyXG5pbXBvcnQgSGVyb1NraWxsVWkgZnJvbSBcIi4vSGVyb1NraWxsVWlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBTdGF0ZXtcclxuICAgIFByZXZpZXcgPSAwLFxyXG4gICAgTGV2ZWwsXHJcbiAgICBTdGFyLFxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlVWkgZXh0ZW5kcyBVSUNvbXBvbmVudHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXHJcbiAgICByb2xlX3VpIDogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZXJvX2F2YXRhcl9saWdodCA6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjdXJfaGVybyA6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KHt0eXBlOltzcC5Ta2VsZXRvbkRhdGFdfSlcclxuICAgIGhlcm9fc2tlbGV0b25fZGF0YTpzcC5Ta2VsZXRvbkRhdGFbXT1bXTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBoZXJvX3R5cGUgOiBIZXJvX1R5cGUgPSAtMTtcclxuICAgIHByaXZhdGUgc3RhdGUgOiBTdGF0ZSA9IFN0YXRlLkxldmVsO1xyXG4gICAgcHJpdmF0ZSBzcXJ0TGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXVxyXG5cclxuXHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbikge1xyXG4gICAgICAgIHRoaXMudWlfYWNpdG9uPXVpQWM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGluaXREYXRhKGhlcm9UeXBlOkhlcm9fVHlwZSxzcXJ0TGlzdDpKc29uSGVyb0Jhc2VJbmZvW10gPSBbXSl7XHJcbiAgICAgICAgdGhpcy5oZXJvX3R5cGUgPSBoZXJvVHlwZTtcclxuICAgICAgICBsZXQgaGVybyA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0luZm8oaGVyb1R5cGUpO1xyXG4gICAgICAgIHRoaXMuc3FydExpc3QgPSBzcXJ0TGlzdDtcclxuICAgICAgICBpZih0aGlzLnNxcnRMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgLy8gbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAgICAgLy8gYm90dG9tLmdldENoaWxkQnlOYW1lKFwiYXJyb3dfcmlnaHRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImFycm93X2xlZnRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3FydExpc3QgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QXJyYXlEYXRhKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIik7XHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImFycm93X3JpZ2h0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImFycm93X2xlZnRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaGVybyA9PSBudWxsKXtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLlByZXZpZXc7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld1JlZnJlc2goZmFsc2UpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5MZXZlbDtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaChmYWxzZSk7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgLy/mlZnnqItcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMSk9PWZhbHNlJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMwMikmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc190dXRvcmFpbHNfc3RhdGU9PXRydWUpe1xyXG4gICAgICAgICAgICAgICAgLy/mib7liLDljYfnuqfmjInpkq5cclxuICAgICAgICAgICAgICAgIGxldCBidG5VcGdyYWRlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJykuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3VwZ3JhZGVCdG4nKTtcclxuICAgICAgICAgICAgICAgIGxldCB3b3JkUG9zPWJ0blVwZ3JhZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihidG5VcGdyYWRlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsUG9zPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290JykuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygzMDIsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDMwMik7XHJcbiAgICAgICAgICAgICAgICB9LHRydWUsbnVsbCxsb2NhbFBvcyk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzExKT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzEyKSl7XHJcbiAgICAgICAgICAgICAgICAvL+WIh+aNouWIsOWNh+aYn1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YXJCdG5DbGljaygpO1xyXG4gICAgICAgICAgICAgICAgLy/mib7liLDljYfmmJ/mjInpkq5cclxuICAgICAgICAgICAgICAgIGxldCBidG5VcGdyYWRlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJykuZ2V0Q2hpbGRCeU5hbWUoJ3N0YXInKS5nZXRDaGlsZEJ5TmFtZSgndXBzdGFyQnRuJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd29yZFBvcz1idG5VcGdyYWRlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnRuVXBncmFkZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFBvcz1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMzEyLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygzMTIpO1xyXG4gICAgICAgICAgICAgICAgfSx0cnVlLG51bGwsbG9jYWxQb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMjEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMjIpKXtcclxuICAgICAgICAgICAgLy8gICAgIC8v5om+5Yiw5LiA6ZSu56m/5oi05oyJ6ZKuXHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgYnRuVXBncmFkZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpLmdldENoaWxkQnlOYW1lKCdlcXVpcFJvb3QnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuV2VhcicpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHdvcmRQb3M9YnRuVXBncmFkZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJ0blVwZ3JhZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgbG9jYWxQb3M9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkUG9zKTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIyMixudWxsLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjIyKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sdHJ1ZSxudWxsLGxvY2FsUG9zKTtcclxuICAgICAgICAgICAgLy8gfWVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMjUpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMjYpKXtcclxuICAgICAgICAgICAgLy8gICAgIC8v5om+5Yiw5q2m5Zmo5oyJ6ZKuXHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgYnRuVXBncmFkZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpLmdldENoaWxkQnlOYW1lKCdlcXVpcFJvb3QnKS5nZXRDaGlsZEJ5TmFtZSgnemJCZzEnKTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCB3b3JkUG9zPWJ0blVwZ3JhZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihidG5VcGdyYWRlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGxvY2FsUG9zPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290JykuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMjYsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAgfSxmYWxzZSxudWxsLGxvY2FsUG9zKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LDAuMDIpXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6Kej6ZSB5ZCO6YCa55So5pi+56S65Yi35pawXHJcbiAgICBpbmZvUmVmcmVzaCgpe1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgbGV0IHN0YXIgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROYW1lVGV4dF9JRCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5pY2tuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb1RpdGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9UaXRsZVRleHRJZEJ5SGVyb1R5cGVBbmRIZXJvU3Rhcih0aGlzLmhlcm9fdHlwZSxzdGFyKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicXVhbGl0eVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGl0bGVfXCIgKyBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSkgKyBcIl8wXCIpXHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmFtZUJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UaXRsZV9cIiArIEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKSArIFwiXzFcIilcclxuICAgICAgICBpZihzdGFyID09IDApe1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1N0YXJfXCIgKyBzdGFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhlcm9TcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TcFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pXHJcbiAgICAgICAgaGVyb1NwLnNrZWxldG9uRGF0YSA9IHRoaXMuaGVyb19za2VsZXRvbl9kYXRhW3RoaXMuaGVyb190eXBlLTFdO1xyXG4gICAgICAgIGhlcm9TcC5zZXRBbmltYXRpb24oMCxcIklkbGVcIix0cnVlKTtcclxuICAgICAgICAvLyBhbmltYS5saXN0ZW5lcj1udWxsO1xyXG4gICAgICAgIGhlcm9TcC5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+e1xyXG4gICAgICAgICAgICAvLyBhbmltYS5saXN0ZW5lcj1udWxsOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICAgICAgbGV0IGp1ZGdlID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgaWYoanVkZ2UgPCAwLjYpe1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdJZGxlJztcclxuICAgICAgICAgICAgfWVsc2UgaWYoanVkZ2UgPCAwLjgpe1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdBdHRhY2snO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnSWRsZTInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlcm9TcC5zZXRBbmltYXRpb24oMCxuYW1lLHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGhlcm9TcC5ub2RlLnNjYWxlID0gMC40O1xyXG4gICAgfVxyXG4gICAgLy8g5Y2H57qn5Yi35pawXHJcbiAgICB1cGdyYWRlUmVmcmVzaChpc1JlZnJlc2g6Ym9vbGVhbiA9IHRydWUpe1xyXG4gICAgICAgIGxldCBITSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKTtcclxuICAgICAgICBsZXQgaGVyb0Jhc2VJbmZvID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImNvaW5MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQ29pbikpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcImdlbUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5HZW0pKTtcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIGxldCBsZXZlbCA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpO1xyXG4gICAgICAgIGxldCBoZXJvSW5mbyA9IEhNLmdldEhlcm9JbmZvKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgaGVyb0RhdGEgPSBITS5nZXRIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IHpoYW5saSA9IEhNLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBlcXVpcFJvb3QgPSBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImVxdWlwUm9vdFwiKTtcclxuICAgICAgICBsZXQgemJSb290ID0gZXF1aXBSb290LmdldENoaWxkQnlOYW1lKFwiemJSb290XCIpO1xyXG4gICAgICAgIC8vIHpiUm9vdC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG5cclxuICAgICAgICBpZihoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UgPCAxKXtcclxuICAgICAgICAgICAgbGV0IGV4SXRlbSA9IHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImVxdWlwNVwiKTtcclxuICAgICAgICAgICAgZXhJdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsaGVyb0Jhc2VJbmZvLkZpcnN0RXhjbHVzaXZlV2VhcG9uSUQsUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICAgICAgZXhJdGVtLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgZXhJdGVtLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgemJSb290LmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJuZWVkTnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KSk7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0Jhc2VJbmZvLlF1YWxpdHkpKTtcclxuICAgIFxyXG4gICAgICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KSA+IEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0Jhc2VJbmZvLlF1YWxpdHkpKXtcclxuICAgICAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTUsMjU1LDI1NSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgemJSb290LmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NSw3NCw3NCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGV4SXRlbSA9IHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImVxdWlwNVwiKTtcclxuICAgICAgICAgICAgemJSb290LmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgemJSb290LmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXhJdGVtLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGV4SXRlbS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBleEl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdCh0aGlzLmhlcm9fdHlwZSxoZXJvQmFzZUluZm8uRmlyc3RFeGNsdXNpdmVXZWFwb25JRCArIEV4Y2x1c2l2ZUVuaGFuY2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EYXRhQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGhlcm9JbmZvLmV4Y2x1c2l2ZV9lcXVpcF9zdGFnZSkuU3RhcixQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsSWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKEhNLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPiAxKXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmV2ZXJ0SWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJyZXZlcnRJY29uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwicHJldmlld1wiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLlByZXZpZXc7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5MZXZlbDtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuU3RhcjtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMF8xXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzFcIik7XHJcbiAgICAgICAgbGV2ZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvKirmmK/lkKbmnInnqb/miLTnmoTnmoTmj5DnpLogKi9cclxuICAgICAgICBsZXQgaXNIYXZlRXF1aXBSZWQ9ZmFsc2U7XHJcbiAgICAgICAgLyoq5piv5ZCm5pyJ5ZCI5oiQ57qi54K555qE5o+Q56S6ICovXHJcbiAgICAgICAgbGV0IGlzSGF2ZU1lcmdlUmVkPWZhbHNlO1xyXG4gICAgICAgIGZvcihsZXQgaT1FcXVpcFR5cGUuV3VRaTsgaTxFcXVpcFR5cGUuTnVtOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgd2VhcklkPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2VhckVxdWlwbWVudCh0aGlzLmhlcm9fdHlwZSxpKTtcclxuICAgICAgICAgICAgbGV0IGl0ZW09emJSb290LmdldENoaWxkQnlOYW1lKFwiZXF1aXBcIiArIGkpO1xyXG4gICAgICAgICAgICAvL+aYr+WQpuWPr+S7peepv+aItOabtOmrmOaIluiAheWPr+S7peepv+aItFxyXG4gICAgICAgICAgICBsZXQgaXNDYW5XZWFyPWZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgaXNDYW5NZXJnZT1mYWxzZTtcclxuICAgICAgICAgICAgaWYod2VhcklkIT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyDmnInoo4XlpIdcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCBlcXVpcEluZm89bmV3IEVxdWlwSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgZXF1aXBJbmZvLmVxdWlwX2lkPXdlYXJJZDtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdCh0aGlzLmhlcm9fdHlwZSxlcXVpcEluZm8sUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICAgICAgICAgIC8v5piv5ZCm6IO96KKr5raI6ICX5o6J5bm25LiU5ruh6Laz5ZCI5oiQ5p2h5Lu2XHJcbiAgICAgICAgICAgICAgICBpZighRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzTWF4U3RhZ2Uod2VhcklkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDYW5NZXJnZT1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tBRXF1aXBNZXJnZShFcXVpcG1lbnRNZXJnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUYXJnZXRFcXVpcG1lbnRfaWQod2VhcklkKSxbXSk7XHJcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyDml6Doo4XlpIdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFCXCIgKyB6YlJvb3QuY2hpbGRyZW5Db3VudCk7XHJcbiAgICAgICAgICAgIC8v5qOA5rWL57qi54K5XHJcbiAgICAgICAgICAgIGxldCByZWQ9ZXF1aXBSb290LmdldENoaWxkQnlOYW1lKCdyZWQnK2kpO1xyXG4gICAgICAgICAgICBpc0NhbldlYXI9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrV2Vhcih0aGlzLmhlcm9fdHlwZSxpKTtcclxuICAgICAgICAgICAgaWYoaXNDYW5XZWFyKXtcclxuICAgICAgICAgICAgICAgIGlzSGF2ZUVxdWlwUmVkPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNDYW5NZXJnZSl7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmVNZXJnZVJlZD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlZC5hY3RpdmU9aXNDYW5NZXJnZXx8aXNDYW5XZWFyO1xyXG4gICAgICAgIH0gIFxyXG4gICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0V2VhclBldCh0aGlzLmhlcm9fdHlwZSkgPT0gMCl7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcInBldFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHBldCA9IHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcInBldFwiKTtcclxuICAgICAgICAgICAgcGV0LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHBldC5nZXRDb21wb25lbnQoUGV0SXRlbSkuaW5pdCh0aGlzLmhlcm9fdHlwZSxIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQodGhpcy5oZXJvX3R5cGUpLFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ0xWLicgKyBoZXJvSW5mby5oZXJvX2xldmVsO1xyXG4gICAgICAgIGlmKGlzUmVmcmVzaClcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5zZXRUYXJnZXQoemhhbmxpLDAuNSx0cnVlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZpZ2h0TnVtXCIpLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdCh6aGFubGksdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiaHBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZGFtYWdlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJkZWZlbnNlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UpO1xyXG4gICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiYXRrU3BlZWRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEuYXRrU3BlZWQsMSk7XHJcblxyXG4gICAgICAgIGxldCBza2lsbFJvb3QgPSBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcInNraWxsUm9vdFwiKTtcclxuICAgICAgICBsZXQgc2tpbGxOdW0gPSBoZXJvQmFzZUluZm8uU2tpbGxOdW07XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTtpIDw9IDQ7aSsrKXtcclxuICAgICAgICAgICAgaWYoaTw9c2tpbGxOdW0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraWxsID0gc2tpbGxSb290LmdldENoaWxkQnlOYW1lKFwiYnRuU2tpbGxcIiArIGkpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB1bmxvY2tMZXZlbCA9ICBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChpKVxyXG4gICAgICAgICAgICAgICAgaWYoaGVyb0luZm8uaGVyb19sZXZlbCA8IHVubG9ja0xldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fXCIrIHRoaXMuaGVyb190eXBlICtcIl9Ta2lsbF9cIiArIChpLTEpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuY2hpbGRyZW5bMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19cIisgdGhpcy5oZXJvX3R5cGUgK1wiX1NraWxsX1wiICsgKGktMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gJycgKyAoSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGhlcm9JbmZvLmhlcm9fc3RhZ2UpICsgMSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBza2lsbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ta2lsbFwiICsgaSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVwZ3JhZGVCdG49bGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJ1cGdyYWRlQnRuXCIpO1xyXG4gICAgICAgIGxldCBpc0xldmVsPWZhbHNlO1xyXG4gICAgICAgIGxldCBpc0NvaW49ZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzR2VtPWZhbHNlO1xyXG4gICAgICAgIGlmKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSA+PSBoZXJvQmFzZUluZm8uTWF4TGV2ZWwpe1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTIwMDEwKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY29pbkhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pO1xyXG4gICAgICAgICAgICBsZXQgY29pbk5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RDb2luKGhlcm9JbmZvLmhlcm9fbGV2ZWwpO1xyXG4gICAgICAgICAgICBsZXQgZ2VtSGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuICAgICAgICAgICAgbGV0IGdlbU5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RHZW0oaGVyb0luZm8uaGVyb19sZXZlbCk7XHJcbiAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZ2VtQmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMTgpO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShjb2luSGF2ZU51bSk7XHJcbiAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkoY29pbk5lZWROdW0pO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKGdlbUhhdmVOdW0pO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkoZ2VtTmVlZE51bSk7XHJcbiAgICAgICAgICAgIC8vIOWNh+e6p+aMiemSrue9rueBsO+8jOS8mOWFiOWFs+WNoee9rueBsCjljbPlnKjph5HluIHotrPlpJ/nmoTmg4XlhrXkuIvvvIzpgJrov4flhbPljaHmsqHovr7liLDopoHmsYLliJnmjInpkq7nva7ngbAp44CCXHJcbiAgICAgICAgICAgIC8vIOWmguaenOaYr+S7peS4uumHkeW4geS4jei2s+e9rueBsOWImeeCueWHu+WNh+e6p+aMiemSruW8ueWHuui1hOa6kOS4jei2s+W8ueeql++8jOWmguaenOaYr+WFs+WNoemZkOWItue9rueBsO+8jOeCueWHu+WNh+e6p+aMiemSruWImeaPkOekuumAmui/h+WFs+WNoeS4jei2s+mjmOWtl+aPkOmGklxyXG4gICAgICAgICAgICBpZihjb2luSGF2ZU51bSA8IGNvaW5OZWVkTnVtKXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NCw3Niw3Nik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjIyLDE5OSwxNjYpO1xyXG4gICAgICAgICAgICAgICAgaXNDb2luPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZ2VtSGF2ZU51bSA8IGdlbU5lZWROdW0pe1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTQsNzYsNzYpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZ2VtQmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjIyLDE5OSwxNjYpO1xyXG4gICAgICAgICAgICAgICAgaXNHZW09dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihnZW1OZWVkTnVtID09IDApe1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLnggPSAxNTA7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZpbmlzaExldmVsID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgICAgICBsZXQgbmVlZExldmVsPUxldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxMaW1pdChoZXJvSW5mby5oZXJvX2xldmVsKTtcclxuICAgICAgICAgICAgaWYoZmluaXNoTGV2ZWwgPCBuZWVkTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgIGlzTGV2ZWw9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgaXNMZXZlbD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgLy/lrqDniannmoTnuqLngrlcclxuICAgICAgICBsZXQgaXNQZXRSZWQ9UGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrUmVkVGlwKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBlcXVpcFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3JlZFBldCcpLmFjdGl2ZT1pc1BldFJlZDtcclxuICAgICAgICBsZXQgaXNFeD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrRXhVcCh0aGlzLmhlcm9fdHlwZSk7O1xyXG4gICAgICAgIGVxdWlwUm9vdC5nZXRDaGlsZEJ5TmFtZSgncmVkRXgnKS5hY3RpdmU9aXNFeDtcclxuICAgICAgICAvL+WNh+e6p+aMiemSrue6oueCuVxyXG4gICAgICAgIGxldCBpc0NhblVwPShpc0NvaW4gJiYgaXNMZXZlbCAmJiBpc0dlbSk7XHJcbiAgICAgICAgdXBncmFkZUJ0bi5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWlzQ2FuVXA7XHJcbiAgICAgICAgLy/ljYfnuqfmqKHlnZfnmoTmjInpkq7nuqLngrlcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1pc0hhdmVFcXVpcFJlZHx8aXNDYW5VcHx8aXNIYXZlTWVyZ2VSZWR8fGlzUGV0UmVkfHxpc0V4O1xyXG4gICAgICAgIC8v5Y2H5pif5qih5Z2X55qE5oyJ6ZKu57qi54K5XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3Rhckljb25cIikuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrVXBTdGFyKHRoaXMuaGVyb190eXBlKXx8SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0FsbFB1cnBvc2VGcmFnbWVudCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgLy/kuIDplK7nqb/miLRcclxuICAgICAgICBlcXVpcFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ2J0bldlYXInKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWlzSGF2ZUVxdWlwUmVkOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Y2H5pif5Yi35pawXHJcbiAgICB1cHN0YXJSZWZyZXNoKGlzUmVmcmVzaDpib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgbGV0IEhNID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgbGV0IHN0YXIgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpO1xyXG4gICAgICAgIGxldCBzdGFnZSA9IEhNLmdldEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSkgJSA2O1xyXG4gICAgICAgIGxldCBoZXJvRGF0YSA9IEhNLmdldEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgaWYoSE0uZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSA+IDEpe1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJyZXZlcnRJY29uXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInJldmVydEljb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8wXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzFfMVwiKTtcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSkgPT0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKHRoaXMuaGVyb190eXBlKSl7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0Fycm93XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0SHBOdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRBdGtOdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXREZWZhbmNlTnVtXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19CZ18xXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19CZ18yXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19CZ18zXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiY29zdEljb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJuZWVkTnVtXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVwc3RhckJ0blwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fSWNvbl8xXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0ljb25fM1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8zXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfMVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMl8yXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8yXzNcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfNFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMl81XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBMYWJlbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgbGV0IHpoYW5saSA9IEhNLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodE51bVwiKS5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldCh6aGFubGksMC41LHRydWUpO1xyXG5cclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImhwTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9ocCk7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJhdGtOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJkZWZhbmNlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGFyZ2V0SGVyb0RhdGEgPSBITS5nZXRUYXJnZXRIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSxITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpICsgMSxITS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpKVxyXG5cclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGlwTGFiZWxcIikuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0Fycm93XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldEhwTnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldEF0a051bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXREZWZhbmNlTnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfMVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0JnXzJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19CZ18zXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJuZWVkTnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidW5pdmVyc2FsQnRuXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVwc3RhckJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0ljb25fMVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0ljb25fMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0ljb25fM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3XCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuUHJldmlldztcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5TdGFyO1xyXG4gICAgICAgIGxldCBsZXZlbD1ib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKTtcclxuICAgICAgICBsZXZlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzd2l0Y2goc3RhZ2Upe1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCA2O2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF9cIiArIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRlbXAgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMl9cIiArIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IDY7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpIDw9IHN0YWdlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8zXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF80XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzFcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSA1KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzNcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF80XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8PSBzdGFnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB6aGFubGkgPSBITS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBpZihpc1JlZnJlc2gpXHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZpZ2h0TnVtXCIpLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KHpoYW5saSwwLjUsdHJ1ZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodE51bVwiKS5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoemhhbmxpLHRydWUpO1xyXG5cclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiY29zdEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJocE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJhdGtOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImRlZmFuY2VOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UpO1xyXG5cclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0SHBOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAgTXlUb29sLm51bWJlckZvcm1hdCh0YXJnZXRIZXJvRGF0YS50b3RhbF9ocCk7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldEF0a051bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQodGFyZ2V0SGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0RGVmYW5jZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQodGFyZ2V0SGVyb0RhdGEudG90YWxfZGVmZW5zZSk7XHJcblxyXG4gICAgICAgIGxldCBoYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBsZXQgbmVlZE51bSA9IEhlcm9RdWFsaXR5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3REZWJyaXNCeUhlcm9RdWFsaXR5QW5kU3RhZ2UoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpLEhNLmdldEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSkpO1xyXG5cclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKGhhdmVOdW0pO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJuZWVkTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIvXCIgKyBNeVRvb2wuZ2V0Q29pbkRhbndlaShuZWVkTnVtKTtcclxuICAgICAgICBcclxuICAgICAgICBpZihoYXZlTnVtIDwgbmVlZE51bSl7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU0LDc2LDc2KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyMjIsMTk5LDE2Nik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWxsRnJhZ21lbnRSZWQ9ZmFsc2U7XHJcbiAgICAgICAgaWYobWFzdGVyS2V5bnVtIDwgMSl7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidW5pdmVyc2FsQnRuXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgYWxsRnJhZ21lbnRSZWQ9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBhbGxGcmFnbWVudFJlZD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQWxsUHVycG9zZUZyYWdtZW50KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWFsbEZyYWdtZW50UmVkO1xyXG4gICAgICAgIC8v5Y2H57qn5qih5Z2X55qE5oyJ6ZKu57qi54K5XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1VwZ3JhZGUodGhpcy5oZXJvX3R5cGUpLmlzX2Nhbl91cDtcclxuICAgICAgICAvL+WNh+aYn+aooeWdl+eahOaMiemSrue6oueCuVxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9aGF2ZU51bT49bmVlZE51bXx8YWxsRnJhZ21lbnRSZWQ7XHJcbiAgICAgICAgLy/ljYfmmJ/mjInpkq7nmoTnuqLngrlcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidXBzdGFyQnRuXCIpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9aGF2ZU51bT49bmVlZE51bTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aWV3UmVmcmVzaChpc1JlZnJlc2g6Ym9vbGVhbiA9IHRydWUpe1xyXG4gICAgICAgIGxldCBITSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICBsZXQgcHJldmlldyA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdcIik7XHJcbiAgICAgICAgLy8gbGV0IGhlcm9JbmZvID0gSE0uZ2V0SGVyb0luZm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBoZXJvQmFzZUluZm8gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9CYXNlSW5mbyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IGhlcm9NYXhMZXZlbCAgPSBoZXJvQmFzZUluZm8uTWF4TGV2ZWw7XHJcbiAgICAgICAgbGV0IGhlcm9NYXhTdGFnZSAgPSBoZXJvQmFzZUluZm8uTWF4U3RhZ2U7XHJcbiAgICAgICAgbGV0IGhlcm9EYXRhID0gSE0uZ2V0VGFyZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUsaGVyb01heFN0YWdlLGhlcm9NYXhMZXZlbCk7XHJcbiAgICAgICAgbGV0IHpoYW5saSA9IEhNLmdldFRhcmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUsaGVyb01heFN0YWdlLGhlcm9NYXhMZXZlbCk7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmV2ZXJ0SWNvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gcHJldmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5QcmV2aWV3O1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLlN0YXI7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImVxdWlwNVwiKS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KHRoaXMuaGVyb190eXBlLGhlcm9CYXNlSW5mby5GaXJzdEV4Y2x1c2l2ZVdlYXBvbklELFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImVIYXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCkpO1xyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJlTmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkoRVdVbmxvY2tDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RGcmFnbWVudChoZXJvQmFzZUluZm8uUXVhbGl0eSkpO1xyXG5cclxuICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KSA+IEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0Jhc2VJbmZvLlF1YWxpdHkpKXtcclxuICAgICAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImVIYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiZUhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTUsNzQsNzQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXIgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsaGVyb01heFN0YWdlKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGhlcm9CYXNlSW5mby5OYW1lVGV4dF9JRCk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmlja25hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvVGl0bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1RpdGxlVGV4dElkQnlIZXJvVHlwZUFuZEhlcm9TdGFyKHRoaXMuaGVyb190eXBlLHN0YXIpKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJxdWFsaXR5XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UaXRsZV9cIiArIGhlcm9CYXNlSW5mby5RdWFsaXR5ICsgXCJfMFwiKVxyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGl0bGVfXCIgKyBoZXJvQmFzZUluZm8uUXVhbGl0eSArIFwiXzFcIilcclxuICAgICAgICBpZihzdGFyID09IDApe1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1N0YXJfXCIgKyBzdGFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGhlcm9TcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TcFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pXHJcbiAgICAgICAgLy8gaGVyb1NwLnNrZWxldG9uRGF0YSA9IHRoaXMuaGVyb19za2VsZXRvbl9kYXRhW3RoaXMuaGVyb190eXBlLTFdO1xyXG4gICAgICAgIC8vIGhlcm9TcC5hbmltYXRpb24gPSBcIklkbGVcIjtcclxuICAgICAgICBsZXQgaGVyb1NwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwiaGVyb1NwXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbilcclxuICAgICAgICBoZXJvU3Auc2tlbGV0b25EYXRhID0gdGhpcy5oZXJvX3NrZWxldG9uX2RhdGFbdGhpcy5oZXJvX3R5cGUtMV07XHJcbiAgICAgICAgaGVyb1NwLnNldEFuaW1hdGlvbigwLFwiSWRsZVwiLHRydWUpO1xyXG4gICAgICAgIC8vIGFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgaGVyb1NwLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT57XHJcbiAgICAgICAgICAgIC8vIGFuaW1hLmxpc3RlbmVyPW51bGw7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgICAgICBsZXQganVkZ2UgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICBpZihqdWRnZSA8IDAuNil7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0lkbGUnO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihqdWRnZSA8IDAuOCl7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0F0dGFjayc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdJZGxlMic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGVyb1NwLnNldEFuaW1hdGlvbigwLG5hbWUsdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaGVyb1NwLm5vZGUuc2NhbGUgPSAwLjQ7XHJcblxyXG5cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICdMVi4nICsgaGVyb01heExldmVsO1xyXG4gICAgICAgIGlmKGlzUmVmcmVzaClcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5zZXRUYXJnZXQoemhhbmxpLDAuNSx0cnVlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZpZ2h0TnVtXCIpLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdCh6aGFubGksdHJ1ZSk7XHJcblxyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChoZXJvQmFzZUluZm8uSGVyb0ZyYWdtZW50KTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiaHBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJkYW1hZ2VMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiZGVmZW5zZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiYXRrU3BlZWRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEuYXRrU3BlZWQsMSk7XHJcblxyXG4gICAgICAgIGxldCBza2lsbFJvb3QgPSBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwic2tpbGxSb290XCIpO1xyXG4gICAgICAgIGxldCBza2lsbE51bSA9IGhlcm9CYXNlSW5mby5Ta2lsbE51bTtcclxuICAgICAgICBmb3IobGV0IGkgPSAxO2kgPD0gNDtpKyspe1xyXG4gICAgICAgICAgICBpZihpPD1za2lsbE51bSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2tpbGwgPSBza2lsbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ta2lsbFwiICsgaSk7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHVubG9ja0xldmVsID0gIFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKGkpXHJcbiAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fXCIrIHRoaXMuaGVyb190eXBlICtcIl9Ta2lsbF9cIiArIChpLTEpKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gJycgKyAoSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGhlcm9NYXhTdGFnZSkrMSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBza2lsbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ta2lsbFwiICsgaSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkhlcm9GcmFnbWVudCk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBoZXJvQmFzZUluZm8uVW5sb2NrRnJhZ21lbnROdW07XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShoYXZlTnVtKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkobmVlZE51bSk7XHJcbiAgICAgICAgbGV0IHVwZ3JhZGVCdG49cHJldmlldy5nZXRDaGlsZEJ5TmFtZShcInVwZ3JhZGVCdG5cIik7XHJcbiAgICAgICAgbGV0IHVubG9ja1JlZD1wcmV2aWV3LmdldENoaWxkQnlOYW1lKFwidXBncmFkZUJ0blwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJyk7XHJcbiAgICAgICAgaWYoaGF2ZU51bSA8IG5lZWROdW0pe1xyXG4gICAgICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NCw3Niw3Nik7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdW5sb2NrUmVkLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyMjIsMTk5LDE2Nik7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1bmxvY2tSZWQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IGhlcm9CYXNlSW5mby5RdWFsaXR5O1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1bml2ZXJzYWxCdG49cHJldmlldy5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKVxyXG4gICAgICAgIGxldCB3YW5ubmVnUmVkPXVuaXZlcnNhbEJ0bi5nZXRDaGlsZEJ5TmFtZSgncmVkJyk7XHJcbiAgICAgICAgaWYobWFzdGVyS2V5bnVtIDwgMSl7XHJcbiAgICAgICAgICAgIHVuaXZlcnNhbEJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHVuaXZlcnNhbEJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHdhbm5uZWdSZWQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB1bml2ZXJzYWxCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdW5pdmVyc2FsQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXROdW09bmVlZE51bS1oYXZlTnVtO1xyXG4gICAgICAgICAgICBsZXQgaXNDYW49UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50SWQodGhpcy5oZXJvX3R5cGUpKT49b2Zmc2V0TnVtO1xyXG4gICAgICAgICAgICB3YW5ubmVnUmVkLmFjdGl2ZT1vZmZzZXROdW0+MCAmJiBpc0NhbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dldEFzc2V0c1VpKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWR1Y3Rpb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuQ29pbilcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgb25CdG5Db2luKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkNvaW4pXHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuICAgIG9uQnRuR2VtKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG9uQ2xvc2VHZXRBc3NldHNCdG5DbGljaygpe1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzaG93RXhjaGFuZ2VVaSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIik7XHJcbiAgICAgICAgZXhjaGFuZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgbGV0IGtleUlkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlDXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUFcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcDEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGtleUlkLDApO1xyXG4gICAgICAgIGxldCBwMiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSksMCk7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkgKyAnLycgKyBtYXN0ZXJLZXludW07XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJJdGVtXzFcIikuYWRkQ2hpbGQocDEpO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwiSXRlbV8yXCIpLmFkZENoaWxkKHAyKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UHJldmlld0V4Y2hhbmdlVWkoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKTtcclxuICAgICAgICBleGNoYW5nZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBsZXQga2V5SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlCXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwMSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oa2V5SWQsMCk7XHJcbiAgICAgICAgbGV0IHAyID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSwwKTtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIkl0ZW1fMVwiKS5hZGRDaGlsZChwMSk7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJJdGVtXzJcIikuYWRkQ2hpbGQocDIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2VVcFN0YXJUaXBCdG5DbGljaygpe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVwU3RhclRpcFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VXBTdGFyVGlwKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IEhNID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgaGVyb0RhdGEgPSBITS5nZXRIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG9sZEhlcm9EYXRhID0gSE0uZ2V0VGFyZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUsSE0uZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSAtIDEsSE0uZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSlcclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBsZXQgb2xkU3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpIC0gMSk7XHJcbiAgICAgICAgbGV0IG5pY2tuYW1lID0gSGVyb1RpdGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9UaXRsZVRleHRJZEJ5SGVyb1R5cGVBbmRIZXJvU3Rhcih0aGlzLmhlcm9fdHlwZSxzdGFyKTtcclxuICAgICAgICBsZXQgb2xkTmlja25hbWUgPSBIZXJvVGl0bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1RpdGxlVGV4dElkQnlIZXJvVHlwZUFuZEhlcm9TdGFyKHRoaXMuaGVyb190eXBlLG9sZFN0YXIpO1xyXG5cclxuICAgICAgICBsZXQgdXBTdGFyVGlwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXBTdGFyVGlwXCIpO1xyXG4gICAgICAgIHVwU3RhclRpcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZFN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1N0YXJfXCIgKyBvbGRTdGFyKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGROaWNrbmFtZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQob2xkTmlja25hbWUpO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZFNraWxsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRTa2lsbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zdHJpbmcgKz0gXCJMVlwiICsgKG9sZFN0YXIgKyAxKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRIcE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQob2xkSGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZEF0a051bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQob2xkSGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGREZWZhbmNlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChvbGRIZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuXHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fU3Rhcl9cIiArIHN0YXIpO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm5pY2tuYW1lXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChuaWNrbmFtZSk7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwic2tpbGxOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkxWXCIgKyAoc3RhciArIDEpO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcImhwTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9ocCk7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwiYXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcImRlZmFuY2VOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzbGlkZXJNb3ZlUmVzcG9uY2Uoc2xpZGVyOmNjLlNsaWRlcil7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIik7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBzbGlkZXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoc2xpZGVyLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkgKyAnLycgKyBtYXN0ZXJLZXludW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmlld1NsaWRlck1vdmVSZXNwb25jZShzbGlkZXI6Y2MuU2xpZGVyKXtcclxuICAgICAgICBsZXQgZXhjaGFuZ2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3RXhjaGFuZ2VcIik7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBzbGlkZXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoc2xpZGVyLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkgKyAnLycgKyBtYXN0ZXJLZXludW07XHJcbiAgICB9XHJcblxyXG4gICAgb25Ta2lsbENsaWNrKGUsc2tpbGxTbG90Om51bWJlcil7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Ta2lsbCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChIZXJvU2tpbGxVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChIZXJvU2tpbGxVaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUsc2tpbGxTbG90KTtcclxuICAgICAgICB9LH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25FcXVpcG1lbnRDbGljayhlLGluZGV4U3RyOnN0cmluZyl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6KOF5aSH5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICBsZXQgdHlwZT1wYXJzZUludChpbmRleFN0cik7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuEX+atpuWZqOagj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiLsembhF/miqTnlLLmoI/ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4Rf6aG56ZO+5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuEX+mei+WtkOagj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVxdWlwSW5mbz1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJFcXVpcG1lbnQodGhpcy5oZXJvX3R5cGUsdHlwZSk7Ly/mmK/lkKbluKbkuIrkuoboo4XlpIdcclxuICAgICAgICBpZihlcXVpcEluZm8pe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkVxdWlwSW5mbyxVSUxheWVyTGV2ZWwuVHdvLHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOihub2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEVxdWlwSW5mb1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSxlcXVpcEluZm8sUHJvcEFjdGlvbi5Vc2Use1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wX2lkOiBlcXVpcEluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BfbnVtOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wX3ByaWNlOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BfY29zdF9pZDowLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dFcXVpcEluZm9VaSh0aGlzLmhlcm9fdHlwZSxlcXVpcEluZm8sUHJvcEFjdGlvbi5Vc2Use1xyXG4gICAgICAgICAgICAvLyAgICAgcHJvcF9pZDogZXF1aXBJbmZvLFxyXG4gICAgICAgICAgICAvLyAgICAgcHJvcF9udW06IDEsXHJcbiAgICAgICAgICAgIC8vICAgICBwcm9wX3ByaWNlOjAsXHJcbiAgICAgICAgICAgIC8vICAgICBwcm9wX2Nvc3RfaWQ6MCxcclxuICAgICAgICAgICAgLy8gfSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RXF1aXBFeGNoYW5nZVVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH19LGVxdWlwSW5mbyx0aGlzLmhlcm9fdHlwZSx0eXBlKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIG9uVGFrZU9mZkNsaWNrKCl7XHJcblxyXG4gICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ohLHoo4Xngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIGlmKEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1F1aWNrVW5sb2FkKHRoaXMuaGVyb190eXBlLHRydWUpKXtcclxuICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICBpZihvbGRDb21iYXQgIT0gbmV3Q29tYmF0KVxyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbldlYXJDbGljaygpe1xyXG4gICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuIDplK7nqb/miLTngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4Tngrnlh7vkuIDplK7nqb/miLTnmoTmrKHmlbArdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGlmKEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1F1aWNrV2Vhcih0aGlzLmhlcm9fdHlwZSx0cnVlKSl7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBpZihvbGRDb21iYXQgIT0gbmV3Q29tYmF0KVxyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxldmVsQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAgU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMF8xXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFyQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAgU3RhdGUuU3RhcjtcclxuICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKGZhbHNlKTtcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMFwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8xXzFcIik7XHJcbiAgICB9XHJcbiAgICAvLyDljYfnuqfmjInpkq5cclxuICAgIG9uVXBncmFkZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyDlpoLmnpzpgJrov4flhbPljaHmnKrovr7liLDpmZDliLbliJnpo5jlrZfmj5DnpLpcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heExldmVsKHRoaXMuaGVyb190eXBlKSl7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMjAwMjQpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpbmlzaExldmVsID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIGxldCBuZWVkTGV2ZWwgPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTGltaXQoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBpZihmaW5pc2hMZXZlbCA8IG5lZWRMZXZlbCl7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg3MjAwMDIpO1xyXG4gICAgICAgICAgICBzdHI9c3RyLnJlcGxhY2UoJ34nLG5lZWRMZXZlbC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOmHkeW4geS4jei2s+WImeaYvuekuuiOt+WPlui1hOa6kOeVjOmdolxyXG4gICAgICAgIGxldCBjb2luSGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQ29pbik7XHJcbiAgICAgICAgbGV0IGNvaW5OZWVkTnVtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0Q29pbihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGlmKGNvaW5IYXZlTnVtIDwgY29pbk5lZWROdW0pe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZXRBc3NldHNVaSgpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuE5Y2H57qn57y65bCR6YeR5biB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdlbUhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSk7XHJcbiAgICAgICAgbGV0IGdlbU5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RHZW0oSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBpZihnZW1IYXZlTnVtIDwgZ2VtTmVlZE51bSl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4TljYfnuqfnvLrlsJHpkrvnn7PnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pO1xyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLC1jb2luTmVlZE51bSkgfHwgIVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC1nZW1OZWVkTnVtKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omj6LS55aSx6LSlXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVyb0xldmVsKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0NvbWJhdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1poYW5saSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ljYfnuqcx5qyh6Iux6ZuEKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xldmVsKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTaGVuZ0ppMCh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3QxXCIpLGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93U2hlbmdKaTEodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0MlwiKSxjYy52MigwLDApKTtcclxuICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0VmZmVjdERpYWxvZyhFZmZlY3RQYXRoLkhlcm9VcGdyYWRlMCxib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3QxXCIpLFwiTGV2ZWxVcF9CYWNrXCIpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RWZmZWN0RGlhbG9nKEVmZmVjdFBhdGguSGVyb1VwZ3JhZGUwLGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdDJcIiksXCJMZXZlbFVwX0Zyb250XCIpO1xyXG4gICAgICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJyb2xlX3VwZ3JhZGVfMFwiKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgIC8vIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInJvbGVfdXBncmFkZV8xXCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4jeWQjOiLsembhOeahOWNh+e6p+asoeaVsCt0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5Y2H6Zi25oyJ6ZKuXHJcbiAgICBvblVwU3RhZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGxldCBuZWVkTnVtID0gSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERlYnJpc0J5SGVyb1F1YWxpdHlBbmRTdGFnZShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSksSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBpZihoYXZlTnVtIDwgbmVlZE51bSl7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd0dldEFzc2V0c1VpKCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4TljYfmmJ/nvLrlsJHnoo7niYfnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM6Iux6ZuE5Y2H5pif5piv57y65bCR56KO54mH55qE5qyh5pWwK3RoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HZXRBc3NldHNUaXAsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2V0QXNzZXRzVWkpLmluaXREYXRhKEdldEFzc2V0c1R5cGUuSGVybyk7XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLC1uZWVkTnVtKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omj6LS55aSx6LSlXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDb21iYXRDaGFuZ2VFZmZlY3Qob2xkQ29tYmF0LG5ld0NvbWJhdCxvbGREYXRhLG5ld0RhdGEpO1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuWNh+aYnzHmrKHoi7Hpm4QpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM6Iux6ZuE55qE5Y2H5pif5qyh5pWwK3RoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0FkdmFuY2VkKTtcclxuICAgICAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpICUgNiA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1VwU3RhclRpcCgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFnZSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSAlIDY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmdldENoaWxkQnlOYW1lKFwic3RhckVmZmVjdFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IFwiU2hlbmdYaW5nXCIgKyBzdGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOS4h+iDvemSpeWMmeaMiemSrlxyXG4gICAgb25NYXN0ZXJLZXlCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIGxldCB0ZXh0SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE1O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE2O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE3O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1hc3RlcktleW51bSA8IDEpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRleHRJZCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0V4Y2hhbmdlVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICAgLy8g6aKE6KeI5LiH6IO96ZKl5YyZ5oyJ6ZKuXHJcbiAgICAgb25QcmV2aWV3TWFzdGVyS2V5QnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBsZXQgdGV4dElkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxOTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtYXN0ZXJLZXludW0gPCAxKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh0ZXh0SWQpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dQcmV2aWV3RXhjaGFuZ2VVaSgpO1xyXG4gICAgfVxyXG4gICAgLy8g6Kej6ZSB5oyJ6ZKuXHJcbiAgICBvblVubG9ja0J0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrRnJhZ21lbnROdW0odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGlmKGhhdmVOdW0gPCBuZWVkTnVtKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5zaG93R2V0QXNzZXRzVWkoKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HZXRBc3NldHNUaXAsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2V0QXNzZXRzVWkpLmluaXREYXRhKEdldEFzc2V0c1R5cGUuSGVybyk7XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLC1uZWVkTnVtKTtcclxuICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TdG9yZUhlcm9TaG93VWksVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXREYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB9fSk7IFxyXG4gICAgfVxyXG4gICAgLy8g56KO54mH6L2s5YyW5oyJ6ZKuXHJcbiAgICBvbkV4Q2hhbmdlQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBsZXQga2V5SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlCXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW0gPSBOdW1iZXIoKGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSk7XHJcbiAgICAgICAgaWYobnVtID09IDApIHJldHVybjtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oa2V5SWQsLW51bSk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLG51bSk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuS4jeWQjOiLsembhOmAmui/h+S4h+iDveeijueJh+i9rOaNouiOt+W+l+eahOeijueJh+aAu+aVsCArIHRoaXMuaGVyb190eXBlLG51bSk7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLG51bSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuIfog73noo7niYfovazljJbkuI3lkIzoi7Hpm4TmrKHmlbAgKyB0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKGZhbHNlKTtcclxuICAgIH1cclxuICAgIC8vIOmihOiniOeijueJh+i9rOaNouaMiemSrlxyXG4gICAgb25QcmV2aWV3RXhDaGFuZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJldmlld0V4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgbGV0IGtleUlkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlDXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUFcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtID0gTnVtYmVyKChleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkpO1xyXG4gICAgICAgIGlmKG51bSA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGtleUlkLC1udW0pO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSxudW0pO1xyXG4gICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSxudW0pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4TpgJrov4fkuIfog73noo7niYfovazmjaLojrflvpfnmoTnoo7niYfmgLvmlbAgKyB0aGlzLmhlcm9fdHlwZSxudW0pO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiH6IO956KO54mH6L2s5YyW5LiN5ZCM6Iux6ZuE5qyh5pWwICsgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMucHJldmlld1JlZnJlc2goKTtcclxuICAgIH1cclxuICAgIC8vIOWinuWKoOi9rOaNoueijueJh+aMiemSrlxyXG4gICAgb25DaGFuZ2VFeGNoYW5nZUJ0bkNsaWNrKGUsbnVtOm51bWJlcil7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBudW0gPSBOdW1iZXIobnVtKTtcclxuICAgICAgICBsZXQgZXhjaGFuZ2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJleGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNsaWRlciA9IGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpO1xyXG4gICAgICAgIHNsaWRlci5wcm9ncmVzcyA9ICAoKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkgKyAoMSAqIG51bSkpL21hc3RlcktleW51bTtcclxuICAgICAgICBpZihzbGlkZXIucHJvZ3Jlc3MgPiAxKSBzbGlkZXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIGlmKHNsaWRlci5wcm9ncmVzcyA8IDApIHNsaWRlci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHNsaWRlci5wcm9ncmVzcztcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChzbGlkZXIucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgIH1cclxuICAgIG9uUHJldmlld0NoYW5nZUV4Y2hhbmdlQnRuQ2xpY2soZSxudW06bnVtYmVyKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIG51bSA9IE51bWJlcihudW0pO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNsaWRlciA9IGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpO1xyXG4gICAgICAgIHNsaWRlci5wcm9ncmVzcyA9ICAoKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkgKyAoMSAqIG51bSkpL21hc3RlcktleW51bTtcclxuICAgICAgICBpZihzbGlkZXIucHJvZ3Jlc3MgPiAxKSBzbGlkZXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIGlmKHNsaWRlci5wcm9ncmVzcyA8IDApIHNsaWRlci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHNsaWRlci5wcm9ncmVzcztcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChzbGlkZXIucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgIH1cclxuICAgIC8vIOWFs+mXreeijueJh+i9rOaNoueVjOmdolxyXG4gICAgb25DbG9zZUV4Y2hhbmdlQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8g5YWz6Zet56KO54mH6L2s5o2i55WM6Z2iXHJcbiAgICBvbkNsb3NlUHJldmlld0V4Y2hhbmdlQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIOWJjeW+gOWVhuW6l+aMiemSrlxyXG4gICAgLy8gb25Hb1Nob3BCdG5DbGljaygpe1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQ2l0eTtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUFsbFVpRGlhbG9nKFVJTGF5ZXJMZXZlbC5PbmUpO1xyXG4gICAgLy8gfVxyXG4gICAgb25DbG9zZVJlZHVjdGlvbkJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWR1Y3Rpb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyDmmL7npLrov5jljp/mjInpkq5cclxuICAgIG9uU2hvd1JlZHVjdGlvbkJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgcmVkdWN0aW9uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVkdWN0aW9uXCIpXHJcbiAgICAgICAgbGV0IHN1bSA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm93TGV2ZWxBbGxDb3N0Q29pbihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGxldCBpdGVtUm9vdCA9IHJlZHVjdGlvbi5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpO1xyXG4gICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChQcm9wKS5pbml0KFByb3BJZC5Db2luLHN1bVswXSxQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgIGlmKHN1bVsxXSA9PSAwKXtcclxuICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChQcm9wKS5pbml0KFByb3BJZC5HZW0sc3VtWzFdLFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlZHVjdGlvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHJlZHVjdGlvbi5nZXRDaGlsZEJ5TmFtZShcInJpY2hUZXh0XCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDk4KTtcclxuICAgIH1cclxuICAgIC8vIOi/mOWOn+aMiemSrlxyXG4gICAgb25SZWR1Y3Rpb25CdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTIwMCkpe1xyXG4gICAgICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROb3dMZXZlbEFsbENvc3RDb2luKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbixzdW1bMF0pO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxzdW1bMV0pO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChbUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbixzdW1bMF0pLFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSxzdW1bMV0pXSk7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRIZXJvTHZlbCh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDb21iYXRDaGFuZ2VFZmZlY3Qob2xkQ29tYmF0LG5ld0NvbWJhdCxvbGREYXRhLG5ld0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVkdWN0aW9uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4Tov5jljp/nmoTmrKHmlbAgKyB0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlZHVjdGlvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5vbkNsb3NlUmVkdWN0aW9uQnRuQ2xpY2soKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zaG93R2V0QXNzZXRzVWkoKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25BdHRyaWJ1dGVCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuafpeeci+iLsembhOWxnuaAp+ivpuaDhSk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0F0dHJpYnV0ZVVpKG51bGwsdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQXR0cmlidXRlLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAvLyB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdEhlcm9UeXBlKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldmlld0F0dHJpYnV0ZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5p+l55yL6Iux6ZuE5bGe5oCn6K+m5oOFKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QXR0cmlidXRlVWkobnVsbCx0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5BdHRyaWJ1dGUsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0UHJldmlld0hlcm9UeXBlKHRoaXMuaGVyb190eXBlLEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZSh0aGlzLmhlcm9fdHlwZSksSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heExldmVsKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ0bkV4Y2x1c2l2ZUVxdWlwbWVudENsaWNrKCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5nkuKrmjInpkq7ooqvngrnlh7vkuoZcIik7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5FeGNsdXNpdmVJbmZvVWksVUlMYXllckxldmVsLlR3byx7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZUluZm9VaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlSW5mb1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ0blBldENsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuE55WM6Z2i5a6g54mp5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuEX+eBteWuoOagj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KHRoaXMuaGVyb190eXBlKSA9PSAwKXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5QZXRMaXN0LFVJTGF5ZXJMZXZlbC5Ud28se1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBldEV4Y2hhbmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGV0RXhjaGFuZ2VVaSkuaW5pdERhdGEoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KHRoaXMuaGVyb190eXBlKSx0aGlzLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUGV0SW5mbyxVSUxheWVyTGV2ZWwuVHdvLHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChQZXRJbmZvVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGV0SW5mb1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGV0RXhjaGFuZ2VVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgIC8vICAgICAvLyB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIC8vIH19LEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpLnBldF9pbmZvLHRoaXMuaGVyb190eXBlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuRXhjbHVzaXZlRXF1aXBBZGRDbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0V4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkoe1xyXG4gICAgICAgIC8vICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSx0aGlzLmhlcm9fdHlwZSx0cnVlKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkV4Y2x1c2l2ZVN0cmVuZ3RoZW5pbmcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUsdHJ1ZSk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuRXhjbHVzaXZlRXF1aXBTdHJlbmd0aGVuaW5nVWkoKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFhYVwiKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0V4Y2x1c2l2ZVdlYXBvbnNVaSh7XHJcbiAgICAgICAgLy8gICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkV4Y2x1c2l2ZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNVaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIH0sfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrRXhjbHVzaXZlV2VhcG9uKCl7XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpIDw9IDEwMCl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTMwMDA1KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tBcnJvd0J0bihlLGRpcjpudW1iZXIpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgZGlyID0gTnVtYmVyKGRpcik7XHJcbiAgICAgICAgaWYodGhpcy5zcXJ0TGlzdCA9PSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IGhlcm9UeXBlID0gdGhpcy5oZXJvX3R5cGUgKyBkaXI7XHJcbiAgICAgICAgICAgIGlmKGhlcm9UeXBlIDw9IEhlcm9fVHlwZS5OVUxMKSBoZXJvVHlwZSA9IEhlcm9fVHlwZS5IZXJvX051bSAtIDE7XHJcbiAgICAgICAgICAgIGlmKGhlcm9UeXBlID49IEhlcm9fVHlwZS5IZXJvX051bSkgaGVyb1R5cGUgPSBIZXJvX1R5cGUuTlVMTCArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoaGVyb1R5cGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNxcnRMaXN0LmluZGV4T2YoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8odGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICAgICAgaW5kZXggKz0gZGlyO1xyXG4gICAgICAgICAgICBpZihpbmRleCA+PSB0aGlzLnNxcnRMaXN0Lmxlbmd0aCkgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpZihpbmRleCA8IDApIGluZGV4ID0gdGhpcy5zcXJ0TGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB0aGlzLmluaXREYXRhKHRoaXMuc3FydExpc3RbaW5kZXhdLkhlcm9fSUQsdGhpcy5zcXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Hcm93dGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChSb2xlVWkpLmluaXQoe1xyXG4gICAgICAgIC8vICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMub25SZWZyZXNoKCk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdERhdGEoaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vIH0sfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVyb0F0dHJpYnV0ZUlkKGhlcm9UeXBlOm51bWJlcixoZXJvTGV2ZWw6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIGhlcm9UeXBlICogMTAwMDAgKyBoZXJvTGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0SGVyb1F1YWxpdHlUZXh0Q29sb3IocXVhbGl0eTpudW1iZXIpOmNjLkNvbG9ye1xyXG4gICAgLy8gICAgIGxldCBjb2xvcj1jYy5jb2xvcigpO1xyXG4gICAgLy8gICAgIHN3aXRjaChxdWFsaXR5KXtcclxuICAgIC8vICAgICAgICAgY2FzZSAyOlxyXG4gICAgLy8gICAgICAgICBjYXNlIDE6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTEzLCAyMjksIDEzMik7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSAzOlxyXG4gICAgLy8gICAgICAgICBjYXNlIDQ6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTA1LCAxODMsIDI1NSk7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSA1OlxyXG4gICAgLy8gICAgICAgICBjYXNlIDY6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjI2LCAxMjYsIDI1NSk7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSA3OlxyXG4gICAgLy8gICAgICAgICBjYXNlIDg6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAxOTMsIDc0KTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIDk6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMTA6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCA3NCwgNzQpO1xyXG4gICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVwb3J0SGVyb0xpc3QoKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxQcm9wTnVtKHRydWUpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KEhvbWUpLnJlZnJlc2hUb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLEhlcm9NYW5hZ2VyLmdldFJlZFR5cGVCeUhlcm9UeXBlKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICB9XHJcblxyXG59Il19