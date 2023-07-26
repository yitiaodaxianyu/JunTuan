
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
        var heroMaxLevel = 240;
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
        var starLv = HeroAttribute_1.HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(this.hero_type, HeroManager_1.HeroManager.getInstance().getHeroStage(this.hero_type));
        console.log("当前英雄星级" + starLv);
        if (HeroManager_1.HeroManager.getInstance().getHeroLevel(this.hero_type) >= HeroManager_1.HeroManager.getInstance().hero_stageList[starLv]) {
            GameManager_1.default.getInstance().showMessage("已达到当前星级最高等级！");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXFJvbGVVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLDhFQUFvRjtBQUNwRixzRUFBNEU7QUFDNUUsMkRBQW1FO0FBQ25FLHFFQUFvRTtBQUNwRSw4REFBeUQ7QUFDekQsMERBQXFEO0FBQ3JELHlFQUFvRTtBQUNwRSxpREFBNEM7QUFDNUMsNkRBQXFGO0FBQ3JGLDJEQUEwRDtBQUMxRCx1REFBNkQ7QUFDN0QscUVBQTJFO0FBQzNFLHlEQUF1RDtBQUN2RCxtQ0FBOEI7QUFDOUIsNERBQWtFO0FBQ2xFLDRFQUFrRjtBQUNsRix5REFBd0Q7QUFDeEQsdUVBQWtFO0FBQ2xFLG1FQUE4RDtBQUM5RCx1RUFBa0U7QUFDbEUsaUVBQTREO0FBQzVELG1EQUFrRDtBQUNsRCw0REFBdUQ7QUFDdkQsb0RBQStDO0FBQy9DLGdEQUEyQztBQUMzQyx3Q0FBbUM7QUFDbkMsb0RBQTJEO0FBQzNELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQsK0RBQTBEO0FBQzFELGdEQUErQztBQUMvQyxzREFBaUQ7QUFDakQseURBQXNGO0FBQ3RGLDZDQUF3QztBQUN4Qyx1REFBa0Q7QUFDbEQscUVBQWdFO0FBQ2hFLG9EQUFrRTtBQUNsRSx5REFBb0Q7QUFDcEQsb0RBQStDO0FBQy9DLDhDQUFxRTtBQUVyRSxnREFBK0M7QUFDL0MsdURBQTZEO0FBRTdELG1EQUF5RDtBQUN6RCwyQ0FBaUQ7QUFDakQscUZBQWdGO0FBQ2hGLDJEQUFzRDtBQUN0RCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBSyxLQUlKO0FBSkQsV0FBSyxLQUFLO0lBQ04sdUNBQVcsQ0FBQTtJQUNYLG1DQUFLLENBQUE7SUFDTCxpQ0FB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QyxJQUFJLENBQUM7cURBQ2lCO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ1E7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQztzREFDSztJQVR2QixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBc3NEMUI7SUFBRCxhQUFDO0NBdHNERCxBQXNzREMsQ0F0c0RtQyxxQkFBVyxHQXNzRDlDO2tCQXRzRG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IENvaW5Qb3AgZnJvbSBcIi4uLy4uL0NvaW5Qb3BcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRBdHRyaWJ1dGVcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWVyZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudE1lcmdlXCI7XHJcbmltcG9ydCB7IEVxdWlwSW5mbywgRXF1aXBUeXBlIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9FcXVpcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9FcXVpcG1lbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBFcXVpcEluZm9VaSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L1VpL0VxdWlwSW5mb1VpXCI7XHJcbmltcG9ydCBFcXVpcEl0ZW0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9VaS9FcXVpcEl0ZW1cIjtcclxuaW1wb3J0IEV4Y2x1c2l2ZUluZm9VaSBmcm9tIFwiLi4vLi4vRXhjbHVzaXZlSW5mb1VpL0V4Y2x1c2l2ZUluZm9VaVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9CYXNlSW5mb01hbmFnZXIsIEpzb25IZXJvQmFzZUluZm8gfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9CYXNlSW5mb1wiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb1RpdGxlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvSGVyb1RpdGxlXCI7XHJcbmltcG9ydCB7IFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9Ta2lsbExldmVsVW5sb2NrXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgSG9tZSBmcm9tIFwiLi4vLi4vSG9tZVwiO1xyXG5pbXBvcnQgeyBFV1VubG9ja0Nvc3RNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0VXVW5sb2NrQ29zdFwiO1xyXG5pbXBvcnQgeyBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSnNvbkRhdGEvRXhjbHVzaXZlRW5oYW5jZW1lbnRcIjtcclxuaW1wb3J0IHsgTGV2ZWxNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xldmVsL0xldmVsTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBUZXh0TGFuZ3VhZ2UgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvVGV4dExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUGV0L1BldE1hbmFnZXJcIjtcclxuaW1wb3J0IFBldEV4Y2hhbmdlVWkgZnJvbSBcIi4uLy4uL1BldC9VaS9QZXRFeGNoYW5nZVVpXCI7XHJcbmltcG9ydCBQZXRJbmZvVWkgZnJvbSBcIi4uLy4uL1BldC9VaS9QZXRJbmZvVWlcIjtcclxuaW1wb3J0IFBldEl0ZW0gZnJvbSBcIi4uLy4uL1BldC9VaS9QZXRJdGVtXCI7XHJcbmltcG9ydCBQcm9wIGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BcIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiwgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFN0b3JlSGVyb1Nob3dVaSBmcm9tIFwiLi4vLi4vU3RvcmUvU3RvcmVIZXJvU2hvd1VpXCI7XHJcbmltcG9ydCB7IFRhc2tJdGVtIH0gZnJvbSBcIi4uLy4uL1Rhc2svVGFza0VudW1cIjtcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBOdW1iZXJMYWJlbCBmcm9tIFwiLi4vLi4vVG9vbHMvTnVtYmVyTGFiZWxcIjtcclxuaW1wb3J0IFR1dG9yYWlsc01hbmFnZXIgZnJvbSBcIi4uLy4uL1R1dG9yaWFscy9UdXRvcmFpbHNNYW5hZ2VyXCI7XHJcbmltcG9ydCBHZXRBc3NldHNVaSwgeyBHZXRBc3NldHNUeXBlIH0gZnJvbSBcIi4uLy4uL1VJL0dldEFzc2V0c1VpXCI7XHJcbmltcG9ydCBBdHJyaWJ1dGVVaSBmcm9tIFwiLi4vLi4vVUkvaG9tZS9BdHJyaWJ1dGVVaVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEVmZmVjdFBhdGgsIFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uLy4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uLy4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi8uLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb0F0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9IZXJvQXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEhlcm9EYXRhIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0RhdGFcIjtcclxuaW1wb3J0IHsgSGVyb1F1YWxpdHlNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb1F1YWxpdHlcIjtcclxuaW1wb3J0IHsgTGV2ZWxVcE1hbmFnZXIgfSBmcm9tIFwiLi4vRGF0YS9MZXZlbFVwXCI7XHJcbmltcG9ydCBFeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpIGZyb20gXCIuL0V4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWlcIjtcclxuaW1wb3J0IEV4Y2x1c2l2ZVdlYXBvbnNVaSBmcm9tIFwiLi9FeGNsdXNpdmVXZWFwb25zVWlcIjtcclxuaW1wb3J0IEhlcm9Ta2lsbFVpIGZyb20gXCIuL0hlcm9Ta2lsbFVpXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gU3RhdGV7XHJcbiAgICBQcmV2aWV3ID0gMCxcclxuICAgIExldmVsLFxyXG4gICAgU3RhcixcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZVVpIGV4dGVuZHMgVUlDb21wb25lbnR7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgcm9sZV91aSA6IGNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaGVyb19hdmF0YXJfbGlnaHQgOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgY3VyX2hlcm8gOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbc3AuU2tlbGV0b25EYXRhXX0pXHJcbiAgICBoZXJvX3NrZWxldG9uX2RhdGE6c3AuU2tlbGV0b25EYXRhW109W107XHJcblxyXG5cclxuICAgIHByaXZhdGUgaGVyb190eXBlIDogSGVyb19UeXBlID0gLTE7XHJcbiAgICBwcml2YXRlIHN0YXRlIDogU3RhdGUgPSBTdGF0ZS5MZXZlbDtcclxuICAgIHByaXZhdGUgc3FydExpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW11cclxuXHJcblxyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnVpX2FjaXRvbj11aUFjO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpbml0RGF0YShoZXJvVHlwZTpIZXJvX1R5cGUsc3FydExpc3Q6SnNvbkhlcm9CYXNlSW5mb1tdID0gW10pe1xyXG4gICAgICAgIHRoaXMuaGVyb190eXBlID0gaGVyb1R5cGU7XHJcbiAgICAgICAgbGV0IGhlcm8gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9JbmZvKGhlcm9UeXBlKTtcclxuICAgICAgICB0aGlzLnNxcnRMaXN0ID0gc3FydExpc3Q7XHJcbiAgICAgICAgaWYodGhpcy5zcXJ0TGlzdC5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICAgIC8vIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIik7XHJcbiAgICAgICAgICAgIC8vIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImFycm93X3JpZ2h0XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJhcnJvd19sZWZ0XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNxcnRMaXN0ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFycmF5RGF0YSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJhcnJvd19yaWdodFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJhcnJvd19sZWZ0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGhlcm8gPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5QcmV2aWV3O1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdSZWZyZXNoKGZhbHNlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goZmFsc2UpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIC8v5pWZ56iLXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMDIpJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNfdHV0b3JhaWxzX3N0YXRlPT10cnVlKXtcclxuICAgICAgICAgICAgICAgIC8v5om+5Yiw5Y2H57qn5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuVXBncmFkZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpLmdldENoaWxkQnlOYW1lKCd1cGdyYWRlQnRuJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgd29yZFBvcz1idG5VcGdyYWRlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnRuVXBncmFkZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgICAgIGxldCBsb2NhbFBvcz1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMzAyLG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygzMDIpO1xyXG4gICAgICAgICAgICAgICAgfSx0cnVlLG51bGwsbG9jYWxQb3MpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMxMSk9PWZhbHNlJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDMxMikpe1xyXG4gICAgICAgICAgICAgICAgLy/liIfmjaLliLDljYfmmJ9cclxuICAgICAgICAgICAgICAgIHRoaXMub25TdGFyQnRuQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIC8v5om+5Yiw5Y2H5pif5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgICBsZXQgYnRuVXBncmFkZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpLmdldENoaWxkQnlOYW1lKCdzdGFyJykuZ2V0Q2hpbGRCeU5hbWUoJ3Vwc3RhckJ0bicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdvcmRQb3M9YnRuVXBncmFkZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJ0blVwZ3JhZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxQb3M9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkUG9zKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDMxMixudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMzEyKTtcclxuICAgICAgICAgICAgICAgIH0sdHJ1ZSxudWxsLGxvY2FsUG9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBlbHNlIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjIxKT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjIyKSl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+aJvuWIsOS4gOmUruepv+aItOaMiemSrlxyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGJ0blVwZ3JhZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwnKS5nZXRDaGlsZEJ5TmFtZSgnZXF1aXBSb290JykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bldlYXInKTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCB3b3JkUG9zPWJ0blVwZ3JhZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihidG5VcGdyYWRlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGxvY2FsUG9zPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290JykuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgICAgIC8vICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMjIsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyMik7XHJcbiAgICAgICAgICAgIC8vICAgICB9LHRydWUsbnVsbCxsb2NhbFBvcyk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNlIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjI1KT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjI2KSl7XHJcbiAgICAgICAgICAgIC8vICAgICAvL+aJvuWIsOatpuWZqOaMiemSrlxyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGJ0blVwZ3JhZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwnKS5nZXRDaGlsZEJ5TmFtZSgnZXF1aXBSb290JykuZ2V0Q2hpbGRCeU5hbWUoJ3piQmcxJyk7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgd29yZFBvcz1idG5VcGdyYWRlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnRuVXBncmFkZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBsb2NhbFBvcz1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjI2LG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgIH0sZmFsc2UsbnVsbCxsb2NhbFBvcyk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSwwLjAyKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOino+mUgeWQjumAmueUqOaYvuekuuWIt+aWsFxyXG4gICAgaW5mb1JlZnJlc2goKXtcclxuICAgICAgICBsZXQgdG9wID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpO1xyXG4gICAgICAgIGxldCBzdGFyID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiY29pbkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiZ2VtTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSkpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TmFtZVRleHRfSUQodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJuaWNrbmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEhlcm9UaXRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvVGl0bGVUZXh0SWRCeUhlcm9UeXBlQW5kSGVyb1N0YXIodGhpcy5oZXJvX3R5cGUsc3RhcikpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInF1YWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RpdGxlX1wiICsgSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpICsgXCJfMFwiKVxyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGl0bGVfXCIgKyBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSkgKyBcIl8xXCIpXHJcbiAgICAgICAgaWYoc3RhciA9PSAwKXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19TdGFyX1wiICsgc3Rhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZXJvU3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvU3BcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKVxyXG4gICAgICAgIGhlcm9TcC5za2VsZXRvbkRhdGEgPSB0aGlzLmhlcm9fc2tlbGV0b25fZGF0YVt0aGlzLmhlcm9fdHlwZS0xXTtcclxuICAgICAgICBoZXJvU3Auc2V0QW5pbWF0aW9uKDAsXCJJZGxlXCIsdHJ1ZSk7XHJcbiAgICAgICAgLy8gYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICBoZXJvU3Auc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PntcclxuICAgICAgICAgICAgLy8gYW5pbWEubGlzdGVuZXI9bnVsbDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBqdWRnZSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgIGlmKGp1ZGdlIDwgMC42KXtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnSWRsZSc7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGp1ZGdlIDwgMC44KXtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnQXR0YWNrJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0lkbGUyJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBoZXJvU3Auc2V0QW5pbWF0aW9uKDAsbmFtZSx0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBoZXJvU3Aubm9kZS5zY2FsZSA9IDAuNDtcclxuICAgIH1cclxuICAgIC8vIOWNh+e6p+WIt+aWsFxyXG4gICAgdXBncmFkZVJlZnJlc2goaXNSZWZyZXNoOmJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBsZXQgSE0gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgbGV0IGhlcm9CYXNlSW5mbyA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSGVyb0Jhc2VJbmZvKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSk7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICBsZXQgbGV2ZWwgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKTtcclxuICAgICAgICBsZXQgaGVyb0luZm8gPSBITS5nZXRIZXJvSW5mbyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IGhlcm9EYXRhID0gSE0uZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCB6aGFubGkgPSBITS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgZXF1aXBSb290ID0gbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcFJvb3RcIik7XHJcbiAgICAgICAgbGV0IHpiUm9vdCA9IGVxdWlwUm9vdC5nZXRDaGlsZEJ5TmFtZShcInpiUm9vdFwiKTtcclxuICAgICAgICAvLyB6YlJvb3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuXHJcbiAgICAgICAgaWYoaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlIDwgMSl7XHJcbiAgICAgICAgICAgIGxldCBleEl0ZW0gPSB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcDVcIik7XHJcbiAgICAgICAgICAgIGV4SXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KHRoaXMuaGVyb190eXBlLGhlcm9CYXNlSW5mby5GaXJzdEV4Y2x1c2l2ZVdlYXBvbklELFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgIGV4SXRlbS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGV4SXRlbS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgemJSb290LmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCkpO1xyXG4gICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJuZWVkTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIvXCIgKyBNeVRvb2wuZ2V0Q29pbkRhbndlaShFV1VubG9ja0Nvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEZyYWdtZW50KGhlcm9CYXNlSW5mby5RdWFsaXR5KSk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCkgPiBFV1VubG9ja0Nvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEZyYWdtZW50KGhlcm9CYXNlSW5mby5RdWFsaXR5KSl7XHJcbiAgICAgICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTUsNzQsNzQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBleEl0ZW0gPSB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcDVcIik7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGV4SXRlbS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBleEl0ZW0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgZXhJdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsaGVyb0Jhc2VJbmZvLkZpcnN0RXhjbHVzaXZlV2VhcG9uSUQgKyBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UpLlN0YXIsUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZihITS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpID4gMSl7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInJldmVydEljb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmV2ZXJ0SWNvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5QcmV2aWV3O1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLlN0YXI7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzBfMVwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8xXCIpO1xyXG4gICAgICAgIGxldmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLyoq5piv5ZCm5pyJ56m/5oi055qE55qE5o+Q56S6ICovXHJcbiAgICAgICAgbGV0IGlzSGF2ZUVxdWlwUmVkPWZhbHNlO1xyXG4gICAgICAgIC8qKuaYr+WQpuacieWQiOaIkOe6oueCueeahOaPkOekuiAqL1xyXG4gICAgICAgIGxldCBpc0hhdmVNZXJnZVJlZD1mYWxzZTtcclxuICAgICAgICBmb3IobGV0IGk9RXF1aXBUeXBlLld1UWk7IGk8RXF1aXBUeXBlLk51bTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHdlYXJJZD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJFcXVpcG1lbnQodGhpcy5oZXJvX3R5cGUsaSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPXpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImVxdWlwXCIgKyBpKTtcclxuICAgICAgICAgICAgLy/mmK/lkKblj6/ku6Xnqb/miLTmm7Tpq5jmiJbogIXlj6/ku6Xnqb/miLRcclxuICAgICAgICAgICAgbGV0IGlzQ2FuV2Vhcj1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IGlzQ2FuTWVyZ2U9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHdlYXJJZCE9MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8g5pyJ6KOF5aSHXHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXF1aXBJbmZvPW5ldyBFcXVpcEluZm8oKTtcclxuICAgICAgICAgICAgICAgIGVxdWlwSW5mby5lcXVpcF9pZD13ZWFySWQ7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsZXF1aXBJbmZvLFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgICAgICAvL+aYr+WQpuiDveiiq+a2iOiAl+aOieW5tuS4lOa7oei2s+WQiOaIkOadoeS7tlxyXG4gICAgICAgICAgICAgICAgaWYoIUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc01heFN0YWdlKHdlYXJJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuTWVyZ2U9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQUVxdWlwTWVyZ2UoRXF1aXBtZW50TWVyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFyZ2V0RXF1aXBtZW50X2lkKHdlYXJJZCksW10pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8g5peg6KOF5aSHXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBQlwiICsgemJSb290LmNoaWxkcmVuQ291bnQpO1xyXG4gICAgICAgICAgICAvL+ajgOa1i+e6oueCuVxyXG4gICAgICAgICAgICBsZXQgcmVkPWVxdWlwUm9vdC5nZXRDaGlsZEJ5TmFtZSgncmVkJytpKTtcclxuICAgICAgICAgICAgaXNDYW5XZWFyPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1dlYXIodGhpcy5oZXJvX3R5cGUsaSk7XHJcbiAgICAgICAgICAgIGlmKGlzQ2FuV2Vhcil7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmVFcXVpcFJlZD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzQ2FuTWVyZ2Upe1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlTWVyZ2VSZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWQuYWN0aXZlPWlzQ2FuTWVyZ2V8fGlzQ2FuV2VhcjtcclxuICAgICAgICB9ICBcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQodGhpcy5oZXJvX3R5cGUpID09IDApe1xyXG4gICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBwZXQgPSB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRcIik7XHJcbiAgICAgICAgICAgIHBldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwZXQuZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KHRoaXMuaGVyb190eXBlKSxQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgIH0gICBcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICdMVi4nICsgaGVyb0luZm8uaGVyb19sZXZlbDtcclxuICAgICAgICBpZihpc1JlZnJlc2gpXHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZpZ2h0TnVtXCIpLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KHpoYW5saSwwLjUsdHJ1ZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodE51bVwiKS5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoemhhbmxpLHRydWUpO1xyXG5cclxuICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImhwTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImRhbWFnZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZGVmZW5zZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImF0a1NwZWVkTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLmF0a1NwZWVkLDEpO1xyXG5cclxuICAgICAgICBsZXQgc2tpbGxSb290ID0gbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbFJvb3RcIik7XHJcbiAgICAgICAgbGV0IHNraWxsTnVtID0gaGVyb0Jhc2VJbmZvLlNraWxsTnVtO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7aSA8PSA0O2krKyl7XHJcbiAgICAgICAgICAgIGlmKGk8PXNraWxsTnVtKXtcclxuICAgICAgICAgICAgICAgIGxldCBza2lsbCA9IHNraWxsUm9vdC5nZXRDaGlsZEJ5TmFtZShcImJ0blNraWxsXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdW5sb2NrTGV2ZWwgPSAgU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwoaSlcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9JbmZvLmhlcm9fbGV2ZWwgPCB1bmxvY2tMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1wiKyB0aGlzLmhlcm9fdHlwZSArXCJfU2tpbGxfXCIgKyAoaS0xKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fXCIrIHRoaXMuaGVyb190eXBlICtcIl9Ta2lsbF9cIiArIChpLTEpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgKEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxoZXJvSW5mby5oZXJvX3N0YWdlKSArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2tpbGxSb290LmdldENoaWxkQnlOYW1lKFwiYnRuU2tpbGxcIiArIGkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1cGdyYWRlQnRuPWxldmVsLmdldENoaWxkQnlOYW1lKFwidXBncmFkZUJ0blwiKTtcclxuICAgICAgICBsZXQgaXNMZXZlbD1mYWxzZTtcclxuICAgICAgICBsZXQgaXNDb2luPWZhbHNlO1xyXG4gICAgICAgIGxldCBpc0dlbT1mYWxzZTtcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gaGVyb0Jhc2VJbmZvLk1heExldmVsKXtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZ2VtQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEyMDAxMCk7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNvaW5IYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKTtcclxuICAgICAgICAgICAgbGV0IGNvaW5OZWVkTnVtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0Q29pbihoZXJvSW5mby5oZXJvX2xldmVsKTtcclxuICAgICAgICAgICAgbGV0IGdlbUhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSk7XHJcbiAgICAgICAgICAgIGxldCBnZW1OZWVkTnVtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0R2VtKGhlcm9JbmZvLmhlcm9fbGV2ZWwpO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDE4KTtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoY29pbkhhdmVOdW0pO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKGNvaW5OZWVkTnVtKTtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShnZW1IYXZlTnVtKTtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKGdlbU5lZWROdW0pO1xyXG4gICAgICAgICAgICAvLyDljYfnuqfmjInpkq7nva7ngbDvvIzkvJjlhYjlhbPljaHnva7ngbAo5Y2z5Zyo6YeR5biB6Laz5aSf55qE5oOF5Ya15LiL77yM6YCa6L+H5YWz5Y2h5rKh6L6+5Yiw6KaB5rGC5YiZ5oyJ6ZKu572u54GwKeOAglxyXG4gICAgICAgICAgICAvLyDlpoLmnpzmmK/ku6XkuLrph5HluIHkuI3otrPnva7ngbDliJnngrnlh7vljYfnuqfmjInpkq7lvLnlh7rotYTmupDkuI3otrPlvLnnqpfvvIzlpoLmnpzmmK/lhbPljaHpmZDliLbnva7ngbDvvIzngrnlh7vljYfnuqfmjInpkq7liJnmj5DnpLrpgJrov4flhbPljaHkuI3otrPpo5jlrZfmj5DphpJcclxuICAgICAgICAgICAgaWYoY29pbkhhdmVOdW0gPCBjb2luTmVlZE51bSl7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTQsNzYsNzYpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDIyMiwxOTksMTY2KTtcclxuICAgICAgICAgICAgICAgIGlzQ29pbj10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGdlbUhhdmVOdW0gPCBnZW1OZWVkTnVtKXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZ2VtQmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU0LDc2LDc2KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDIyMiwxOTksMTY2KTtcclxuICAgICAgICAgICAgICAgIGlzR2VtPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZ2VtTmVlZE51bSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS54ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmaW5pc2hMZXZlbCA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICAgICAgbGV0IG5lZWRMZXZlbD1MZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTGltaXQoaGVyb0luZm8uaGVyb19sZXZlbCk7XHJcbiAgICAgICAgICAgIGlmKGZpbmlzaExldmVsIDwgbmVlZExldmVsKXtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICBpc0xldmVsPWZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgIGlzTGV2ZWw9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIC8v5a6g54mp55qE57qi54K5XHJcbiAgICAgICAgbGV0IGlzUGV0UmVkPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1JlZFRpcCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgZXF1aXBSb290LmdldENoaWxkQnlOYW1lKCdyZWRQZXQnKS5hY3RpdmU9aXNQZXRSZWQ7XHJcbiAgICAgICAgbGV0IGlzRXg9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0V4VXAodGhpcy5oZXJvX3R5cGUpOztcclxuICAgICAgICBlcXVpcFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3JlZEV4JykuYWN0aXZlPWlzRXg7XHJcbiAgICAgICAgLy/ljYfnuqfmjInpkq7nuqLngrlcclxuICAgICAgICBsZXQgaXNDYW5VcD0oaXNDb2luICYmIGlzTGV2ZWwgJiYgaXNHZW0pO1xyXG4gICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1pc0NhblVwO1xyXG4gICAgICAgIC8v5Y2H57qn5qih5Z2X55qE5oyJ6ZKu57qi54K5XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9aXNIYXZlRXF1aXBSZWR8fGlzQ2FuVXB8fGlzSGF2ZU1lcmdlUmVkfHxpc1BldFJlZHx8aXNFeDtcclxuICAgICAgICAvL+WNh+aYn+aooeWdl+eahOaMiemSrue6oueCuVxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1VwU3Rhcih0aGlzLmhlcm9fdHlwZSl8fEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tBbGxQdXJwb3NlRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIC8v5LiA6ZSu56m/5oi0XHJcbiAgICAgICAgZXF1aXBSb290LmdldENoaWxkQnlOYW1lKCdidG5XZWFyJykuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1pc0hhdmVFcXVpcFJlZDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWNh+aYn+WIt+aWsFxyXG4gICAgdXBzdGFyUmVmcmVzaChpc1JlZnJlc2g6Ym9vbGVhbiA9IHRydWUpe1xyXG4gICAgICAgIGxldCBITSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICBsZXQgdG9wID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpO1xyXG4gICAgICAgIGxldCBzdGFyID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKTtcclxuICAgICAgICBsZXQgc3RhZ2UgPSBITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpICUgNjtcclxuICAgICAgICBsZXQgaGVyb0RhdGEgPSBITS5nZXRIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgIGlmKEhNLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPiAxKXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmV2ZXJ0SWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJyZXZlcnRJY29uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMFwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8xXzFcIik7XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpID09IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZSh0aGlzLmhlcm9fdHlwZSkpe1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19BcnJvd1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldEhwTnVtXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0QXRrTnVtXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0RGVmYW5jZU51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfM1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1cHN0YXJCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0ljb25fMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fSWNvbl8yXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzNcIikuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8xXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF80XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8yXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMl8zXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8yXzRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfNVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGlwTGFiZWxcIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB6aGFubGkgPSBITS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5zZXRUYXJnZXQoemhhbmxpLDAuNSx0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJocE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiYXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiZGVmYW5jZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfZGVmZW5zZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldEhlcm9EYXRhID0gSE0uZ2V0VGFyZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUsSE0uZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSArIDEsSE0uZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSlcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRpcExhYmVsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19BcnJvd1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRIcE51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRBdGtOdW1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0RGVmYW5jZU51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0JnXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19CZ18yXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1cHN0YXJCdG5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzNcIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3Rhckljb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwicHJldmlld1wiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLlByZXZpZXc7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5MZXZlbDtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuU3RhcjtcclxuICAgICAgICBsZXQgbGV2ZWw9Ym90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XHJcbiAgICAgICAgbGV2ZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoKHN0YWdlKXtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgNjtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0ZW1wICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCA2O2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA8PSBzdGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8xXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfNFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8xXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8yXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8zXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfNFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8yX1wiICsgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPD0gc3RhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgemhhbmxpID0gSE0uZ2V0SGVyb1poYW5saSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgaWYoaXNSZWZyZXNoKVxyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodE51bVwiKS5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldCh6aGFubGksMC41LHRydWUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KHpoYW5saSx0cnVlKTtcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiaHBOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiYXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJkZWZhbmNlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldEhwTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gIE15VG9vbC5udW1iZXJGb3JtYXQodGFyZ2V0SGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRBdGtOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KHRhcmdldEhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldERlZmFuY2VOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KHRhcmdldEhlcm9EYXRhLnRvdGFsX2RlZmVuc2UpO1xyXG5cclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKSxITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKTtcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShoYXZlTnVtKTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkobmVlZE51bSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaGF2ZU51bSA8IG5lZWROdW0pe1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NCw3Niw3Nik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjIyLDE5OSwxNjYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFsbEZyYWdtZW50UmVkPWZhbHNlO1xyXG4gICAgICAgIGlmKG1hc3RlcktleW51bSA8IDEpe1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidW5pdmVyc2FsQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGFsbEZyYWdtZW50UmVkPWZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidW5pdmVyc2FsQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgYWxsRnJhZ21lbnRSZWQ9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0FsbFB1cnBvc2VGcmFnbWVudCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1hbGxGcmFnbWVudFJlZDtcclxuICAgICAgICAvL+WNh+e6p+aooeWdl+eahOaMiemSrue6oueCuVxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsSWNvblwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tVcGdyYWRlKHRoaXMuaGVyb190eXBlKS5pc19jYW5fdXA7XHJcbiAgICAgICAgLy/ljYfmmJ/mqKHlnZfnmoTmjInpkq7nuqLngrlcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWhhdmVOdW0+PW5lZWROdW18fGFsbEZyYWdtZW50UmVkO1xyXG4gICAgICAgIC8v5Y2H5pif5oyJ6ZKu55qE57qi54K5XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVwc3RhckJ0blwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWhhdmVOdW0+PW5lZWROdW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmlld1JlZnJlc2goaXNSZWZyZXNoOmJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBsZXQgSE0gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIik7XHJcbiAgICAgICAgbGV0IHByZXZpZXcgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3XCIpO1xyXG4gICAgICAgIC8vIGxldCBoZXJvSW5mbyA9IEhNLmdldEhlcm9JbmZvKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgaGVyb0Jhc2VJbmZvID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBoZXJvTWF4TGV2ZWwgID0gMjQwO1xyXG4gICAgICAgIGxldCBoZXJvTWF4U3RhZ2UgID0gaGVyb0Jhc2VJbmZvLk1heFN0YWdlO1xyXG4gICAgICAgIGxldCBoZXJvRGF0YSA9IEhNLmdldFRhcmdldEhlcm9EYXRhKHRoaXMuaGVyb190eXBlLGhlcm9NYXhTdGFnZSxoZXJvTWF4TGV2ZWwpO1xyXG4gICAgICAgIGxldCB6aGFubGkgPSBITS5nZXRUYXJnZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlLGhlcm9NYXhTdGFnZSxoZXJvTWF4TGV2ZWwpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInJldmVydEljb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3Rhckljb25cIikuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHByZXZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3XCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuUHJldmlldztcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5TdGFyO1xyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcDVcIikuZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSkuaW5pdCh0aGlzLmhlcm9fdHlwZSxoZXJvQmFzZUluZm8uRmlyc3RFeGNsdXNpdmVXZWFwb25JRCxQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJlSGF2ZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShoZXJvQmFzZUluZm8uRXhjbHVzaXZlV2VhcG9uRnJhZ21lbnQpKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiZU5lZWROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0Jhc2VJbmZvLlF1YWxpdHkpKTtcclxuXHJcbiAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCkgPiBFV1VubG9ja0Nvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEZyYWdtZW50KGhlcm9CYXNlSW5mby5RdWFsaXR5KSl7XHJcbiAgICAgICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJlSGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NSwyNTUsMjU1KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImVIYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LDc0LDc0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdGFyID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGhlcm9NYXhTdGFnZSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiY29pbkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiZ2VtTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSkpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChoZXJvQmFzZUluZm8uTmFtZVRleHRfSUQpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5pY2tuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSGVyb1RpdGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9UaXRsZVRleHRJZEJ5SGVyb1R5cGVBbmRIZXJvU3Rhcih0aGlzLmhlcm9fdHlwZSxzdGFyKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicXVhbGl0eVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGl0bGVfXCIgKyBoZXJvQmFzZUluZm8uUXVhbGl0eSArIFwiXzBcIilcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lQmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RpdGxlX1wiICsgaGVyb0Jhc2VJbmZvLlF1YWxpdHkgKyBcIl8xXCIpXHJcbiAgICAgICAgaWYoc3RhciA9PSAwKXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19TdGFyX1wiICsgc3Rhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBoZXJvU3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvU3BcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKVxyXG4gICAgICAgIC8vIGhlcm9TcC5za2VsZXRvbkRhdGEgPSB0aGlzLmhlcm9fc2tlbGV0b25fZGF0YVt0aGlzLmhlcm9fdHlwZS0xXTtcclxuICAgICAgICAvLyBoZXJvU3AuYW5pbWF0aW9uID0gXCJJZGxlXCI7XHJcbiAgICAgICAgbGV0IGhlcm9TcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TcFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pXHJcbiAgICAgICAgaGVyb1NwLnNrZWxldG9uRGF0YSA9IHRoaXMuaGVyb19za2VsZXRvbl9kYXRhW3RoaXMuaGVyb190eXBlLTFdO1xyXG4gICAgICAgIGhlcm9TcC5zZXRBbmltYXRpb24oMCxcIklkbGVcIix0cnVlKTtcclxuICAgICAgICAvLyBhbmltYS5saXN0ZW5lcj1udWxsO1xyXG4gICAgICAgIGhlcm9TcC5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+e1xyXG4gICAgICAgICAgICAvLyBhbmltYS5saXN0ZW5lcj1udWxsOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICAgICAgbGV0IGp1ZGdlID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgaWYoanVkZ2UgPCAwLjYpe1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdJZGxlJztcclxuICAgICAgICAgICAgfWVsc2UgaWYoanVkZ2UgPCAwLjgpe1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdBdHRhY2snO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnSWRsZTInO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlcm9TcC5zZXRBbmltYXRpb24oMCxuYW1lLHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGhlcm9TcC5ub2RlLnNjYWxlID0gMC40O1xyXG5cclxuXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnTFYuJyArIGhlcm9NYXhMZXZlbDtcclxuICAgICAgICBpZihpc1JlZnJlc2gpXHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZpZ2h0TnVtXCIpLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KHpoYW5saSwwLjUsdHJ1ZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodE51bVwiKS5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoemhhbmxpLHRydWUpO1xyXG5cclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiY29zdEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQoaGVyb0Jhc2VJbmZvLkhlcm9GcmFnbWVudCk7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImhwTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiZGFtYWdlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImRlZmVuc2VMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfZGVmZW5zZSk7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImF0a1NwZWVkTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLmF0a1NwZWVkLDEpO1xyXG5cclxuICAgICAgICBsZXQgc2tpbGxSb290ID0gcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcInNraWxsUm9vdFwiKTtcclxuICAgICAgICBsZXQgc2tpbGxOdW0gPSBoZXJvQmFzZUluZm8uU2tpbGxOdW07XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTtpIDw9IDQ7aSsrKXtcclxuICAgICAgICAgICAgaWYoaTw9c2tpbGxOdW0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNraWxsID0gc2tpbGxSb290LmdldENoaWxkQnlOYW1lKFwiYnRuU2tpbGxcIiArIGkpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCB1bmxvY2tMZXZlbCA9ICBTa2lsbExldmVsVW5sb2NrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbChpKVxyXG4gICAgICAgICAgICAgICAgc2tpbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1wiKyB0aGlzLmhlcm9fdHlwZSArXCJfU2tpbGxfXCIgKyAoaS0xKSk7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuY2hpbGRyZW5bMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNraWxsLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgKEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxoZXJvTWF4U3RhZ2UpKzEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2tpbGxSb290LmdldENoaWxkQnlOYW1lKFwiYnRuU2tpbGxcIiArIGkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5IZXJvRnJhZ21lbnQpO1xyXG4gICAgICAgIGxldCBuZWVkTnVtID0gaGVyb0Jhc2VJbmZvLlVubG9ja0ZyYWdtZW50TnVtO1xyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoaGF2ZU51bSk7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKG5lZWROdW0pO1xyXG4gICAgICAgIGxldCB1cGdyYWRlQnRuPXByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJ1cGdyYWRlQnRuXCIpO1xyXG4gICAgICAgIGxldCB1bmxvY2tSZWQ9cHJldmlldy5nZXRDaGlsZEJ5TmFtZShcInVwZ3JhZGVCdG5cIikuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpO1xyXG4gICAgICAgIGlmKGhhdmVOdW0gPCBuZWVkTnVtKXtcclxuICAgICAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTQsNzYsNzYpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHVubG9ja1JlZC5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjIyLDE5OSwxNjYpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdW5sb2NrUmVkLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBoZXJvQmFzZUluZm8uUXVhbGl0eTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdW5pdmVyc2FsQnRuPXByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIilcclxuICAgICAgICBsZXQgd2Fubm5lZ1JlZD11bml2ZXJzYWxCdG4uZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpO1xyXG4gICAgICAgIGlmKG1hc3RlcktleW51bSA8IDEpe1xyXG4gICAgICAgICAgICB1bml2ZXJzYWxCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1bml2ZXJzYWxCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB3YW5ubmVnUmVkLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdW5pdmVyc2FsQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHVuaXZlcnNhbEJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0TnVtPW5lZWROdW0taGF2ZU51bTtcclxuICAgICAgICAgICAgbGV0IGlzQ2FuPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudElkKHRoaXMuaGVyb190eXBlKSk+PW9mZnNldE51bTtcclxuICAgICAgICAgICAgd2Fubm5lZ1JlZC5hY3RpdmU9b2Zmc2V0TnVtPjAgJiYgaXNDYW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dHZXRBc3NldHNVaSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVkdWN0aW9uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkNvaW4pXHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuICAgIG9uQnRuQ29pbigpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5Db2luKVxyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcbiAgICBvbkJ0bkdlbSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbkNsb3NlR2V0QXNzZXRzQnRuQ2xpY2soKXtcclxuICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2hvd0V4Y2hhbmdlVWkoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGV4Y2hhbmdlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIGxldCBrZXlJZCA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5Q1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlBXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5U1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5U1NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHAxID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShrZXlJZCwwKTtcclxuICAgICAgICBsZXQgcDIgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLDApO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpLnByb2dyZXNzID0gMDtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMDtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpICsgJy8nICsgbWFzdGVyS2V5bnVtO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwiSXRlbV8xXCIpLmFkZENoaWxkKHAxKTtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIkl0ZW1fMlwiKS5hZGRDaGlsZChwMik7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ByZXZpZXdFeGNoYW5nZVVpKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgZXhjaGFuZ2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3RXhjaGFuZ2VcIik7XHJcbiAgICAgICAgZXhjaGFuZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgbGV0IGtleUlkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlDXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUFcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcDEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGtleUlkLDApO1xyXG4gICAgICAgIGxldCBwMiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSksMCk7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkgKyAnLycgKyBtYXN0ZXJLZXludW07XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJJdGVtXzFcIikuYWRkQ2hpbGQocDEpO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwiSXRlbV8yXCIpLmFkZENoaWxkKHAyKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlVXBTdGFyVGlwQnRuQ2xpY2soKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1cFN0YXJUaXBcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1VwU3RhclRpcCgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBITSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGhlcm9EYXRhID0gSE0uZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBvbGRIZXJvRGF0YSA9IEhNLmdldFRhcmdldEhlcm9EYXRhKHRoaXMuaGVyb190eXBlLEhNLmdldEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSkgLSAxLEhNLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkpXHJcbiAgICAgICAgbGV0IHN0YXIgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsSE0uZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgbGV0IG9sZFN0YXIgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsSE0uZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSAtIDEpO1xyXG4gICAgICAgIGxldCBuaWNrbmFtZSA9IEhlcm9UaXRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvVGl0bGVUZXh0SWRCeUhlcm9UeXBlQW5kSGVyb1N0YXIodGhpcy5oZXJvX3R5cGUsc3Rhcik7XHJcbiAgICAgICAgbGV0IG9sZE5pY2tuYW1lID0gSGVyb1RpdGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9UaXRsZVRleHRJZEJ5SGVyb1R5cGVBbmRIZXJvU3Rhcih0aGlzLmhlcm9fdHlwZSxvbGRTdGFyKTtcclxuXHJcbiAgICAgICAgbGV0IHVwU3RhclRpcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVwU3RhclRpcFwiKTtcclxuICAgICAgICB1cFN0YXJUaXAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRTdGFyXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19TdGFyX1wiICsgb2xkU3Rhcik7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwib2xkTmlja25hbWVcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKG9sZE5pY2tuYW1lKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRTa2lsbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwib2xkU2tpbGxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc3RyaW5nICs9IFwiTFZcIiArIChvbGRTdGFyICsgMSk7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwib2xkSHBOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KG9sZEhlcm9EYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRBdGtOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KG9sZEhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwib2xkRGVmYW5jZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQob2xkSGVyb0RhdGEudG90YWxfZGVmZW5zZSk7XHJcblxyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1N0YXJfXCIgKyBzdGFyKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJuaWNrbmFtZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQobmlja25hbWUpO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcInNraWxsTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJMVlwiICsgKHN0YXIgKyAxKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJocE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcImF0a051bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJkZWZhbmNlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2xpZGVyTW92ZVJlc3BvbmNlKHNsaWRlcjpjYy5TbGlkZXIpe1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gc2xpZGVyLnByb2dyZXNzO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpICsgJy8nICsgbWFzdGVyS2V5bnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHByZXZpZXdTbGlkZXJNb3ZlUmVzcG9uY2Uoc2xpZGVyOmNjLlNsaWRlcil7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJldmlld0V4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gc2xpZGVyLnByb2dyZXNzO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpICsgJy8nICsgbWFzdGVyS2V5bnVtO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2tpbGxDbGljayhlLHNraWxsU2xvdDpudW1iZXIpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5IZXJvU2tpbGwsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoSGVyb1NraWxsVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoSGVyb1NraWxsVWkpLmluaXREYXRhKHRoaXMuaGVyb190eXBlLHNraWxsU2xvdCk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uRXF1aXBtZW50Q2xpY2soZSxpbmRleFN0cjpzdHJpbmcpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuijheWkh+agj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgbGV0IHR5cGU9cGFyc2VJbnQoaW5kZXhTdHIpO1xyXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiLsembhF/mrablmajmoI/ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4Rf5oqk55Sy5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuEX+mhuemTvuagj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiLsembhF/pnovlrZDmoI/ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBlcXVpcEluZm89SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyRXF1aXBtZW50KHRoaXMuaGVyb190eXBlLHR5cGUpOy8v5piv5ZCm5bim5LiK5LqG6KOF5aSHXHJcbiAgICAgICAgaWYoZXF1aXBJbmZvKXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5FcXVpcEluZm8sVUlMYXllckxldmVsLlR3byx7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDoobm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChFcXVpcEluZm9VaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUsZXF1aXBJbmZvLFByb3BBY3Rpb24uVXNlLHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcF9pZDogZXF1aXBJbmZvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wX251bTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcF9wcmljZTowLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wX2Nvc3RfaWQ6MCxcclxuICAgICAgICAgICAgICAgICAgICB9LG51bGwsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RXF1aXBJbmZvVWkodGhpcy5oZXJvX3R5cGUsZXF1aXBJbmZvLFByb3BBY3Rpb24uVXNlLHtcclxuICAgICAgICAgICAgLy8gICAgIHByb3BfaWQ6IGVxdWlwSW5mbyxcclxuICAgICAgICAgICAgLy8gICAgIHByb3BfbnVtOiAxLFxyXG4gICAgICAgICAgICAvLyAgICAgcHJvcF9wcmljZTowLFxyXG4gICAgICAgICAgICAvLyAgICAgcHJvcF9jb3N0X2lkOjAsXHJcbiAgICAgICAgICAgIC8vIH0sbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0VxdWlwRXhjaGFuZ2VVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9fSxlcXVpcEluZm8sdGhpcy5oZXJvX3R5cGUsdHlwZSk7XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBvblRha2VPZmZDbGljaygpe1xyXG5cclxuICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6ISx6KOF54K55Ye75qyh5pWwKTtcclxuICAgICAgICBpZihFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tRdWlja1VubG9hZCh0aGlzLmhlcm9fdHlwZSx0cnVlKSl7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgaWYob2xkQ29tYmF0ICE9IG5ld0NvbWJhdClcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXQsbmV3Q29tYmF0LG9sZERhdGEsbmV3RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25XZWFyQ2xpY2soKXtcclxuICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiA6ZSu56m/5oi054K55Ye75qyh5pWwKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM6Iux6ZuE54K55Ye75LiA6ZSu56m/5oi055qE5qyh5pWwK3RoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBpZihFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tRdWlja1dlYXIodGhpcy5oZXJvX3R5cGUsdHJ1ZSkpe1xyXG4gICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaFpoYW5saVNob3coKTtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld0NvbWJhdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1poYW5saSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgaWYob2xkQ29tYmF0ICE9IG5ld0NvbWJhdClcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXQsbmV3Q29tYmF0LG9sZERhdGEsbmV3RGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25MZXZlbEJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gIFN0YXRlLkxldmVsO1xyXG4gICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzBfMVwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8xXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3RhckJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gIFN0YXRlLlN0YXI7XHJcbiAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaChmYWxzZSk7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzBcIik7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3Rhckljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMV8xXCIpO1xyXG4gICAgfVxyXG4gICAgLy8g5Y2H57qn5oyJ6ZKuXHJcbiAgICBvblVwZ3JhZGVCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8g5aaC5p6c6YCa6L+H5YWz5Y2h5pyq6L6+5Yiw6ZmQ5Yi25YiZ6aOY5a2X5o+Q56S6XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpID49IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhMZXZlbCh0aGlzLmhlcm9fdHlwZSkpe1xyXG4gICAgICAgICAgICBsZXQgc3RyID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTIwMDI0KTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFyTHY9SGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSlcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuW9k+WJjeiLsembhOaYn+e6p1wiK3N0YXJMdik7XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpID49IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuaGVyb19zdGFnZUxpc3Rbc3Rhckx2XSl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLlt7Lovr7liLDlvZPliY3mmJ/nuqfmnIDpq5jnrYnnuqfvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpbmlzaExldmVsID0gTGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZmluaXNoX2xldmVsO1xyXG4gICAgICAgIGxldCBuZWVkTGV2ZWwgPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTGltaXQoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBpZihmaW5pc2hMZXZlbCA8IG5lZWRMZXZlbCl7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg3MjAwMDIpO1xyXG4gICAgICAgICAgICBzdHI9c3RyLnJlcGxhY2UoJ34nLG5lZWRMZXZlbC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShzdHIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWmguaenOmHkeW4geS4jei2s+WImeaYvuekuuiOt+WPlui1hOa6kOeVjOmdolxyXG4gICAgICAgIGxldCBjb2luSGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQ29pbik7XHJcbiAgICAgICAgbGV0IGNvaW5OZWVkTnVtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0Q29pbihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGlmKGNvaW5IYXZlTnVtIDwgY29pbk5lZWROdW0pe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dHZXRBc3NldHNVaSgpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuE5Y2H57qn57y65bCR6YeR5biB55qE5qyh5pWwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdlbUhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSk7XHJcbiAgICAgICAgbGV0IGdlbU5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RHZW0oSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBpZihnZW1IYXZlTnVtIDwgZ2VtTmVlZE51bSl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4TljYfnuqfnvLrlsJHpkrvnn7PnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pO1xyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLC1jb2luTmVlZE51bSkgfHwgIVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC1nZW1OZWVkTnVtKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omj6LS55aSx6LSlXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVyb0xldmVsKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0NvbWJhdCA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1poYW5saSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgICAgICAgICAgVGFza01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5lbWl0VGFzayhUYXNrSXRlbS7ljYfnuqcx5qyh6Iux6ZuEKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0xldmVsKTtcclxuICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTaGVuZ0ppMCh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3QxXCIpLGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93U2hlbmdKaTEodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0MlwiKSxjYy52MigwLDApKTtcclxuICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0VmZmVjdERpYWxvZyhFZmZlY3RQYXRoLkhlcm9VcGdyYWRlMCxib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3QxXCIpLFwiTGV2ZWxVcF9CYWNrXCIpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RWZmZWN0RGlhbG9nKEVmZmVjdFBhdGguSGVyb1VwZ3JhZGUwLGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdDJcIiksXCJMZXZlbFVwX0Zyb250XCIpO1xyXG4gICAgICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJyb2xlX3VwZ3JhZGVfMFwiKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XHJcbiAgICAgICAgICAgIC8vIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInJvbGVfdXBncmFkZV8xXCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4jeWQjOiLsembhOeahOWNh+e6p+asoeaVsCt0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5Y2H6Zi25oyJ6ZKuXHJcbiAgICBvblVwU3RhZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGxldCBuZWVkTnVtID0gSGVyb1F1YWxpdHlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERlYnJpc0J5SGVyb1F1YWxpdHlBbmRTdGFnZShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSksSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBpZihoYXZlTnVtIDwgbmVlZE51bSl7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd0dldEFzc2V0c1VpKCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4TljYfmmJ/nvLrlsJHnoo7niYfnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM6Iux6ZuE5Y2H5pif5piv57y65bCR56KO54mH55qE5qyh5pWwK3RoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HZXRBc3NldHNUaXAsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2V0QXNzZXRzVWkpLmluaXREYXRhKEdldEFzc2V0c1R5cGUuSGVybyk7XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLC1uZWVkTnVtKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5omj6LS55aSx6LSlXCIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDb21iYXRDaGFuZ2VFZmZlY3Qob2xkQ29tYmF0LG5ld0NvbWJhdCxvbGREYXRhLG5ld0RhdGEpO1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuWNh+aYnzHmrKHoi7Hpm4QpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM6Iux6ZuE55qE5Y2H5pif5qyh5pWwK3RoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0FkdmFuY2VkKTtcclxuICAgICAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpICUgNiA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1VwU3RhclRpcCgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFnZSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSAlIDY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmdldENoaWxkQnlOYW1lKFwic3RhckVmZmVjdFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLmFuaW1hdGlvbiA9IFwiU2hlbmdYaW5nXCIgKyBzdGFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOS4h+iDvemSpeWMmeaMiemSrlxyXG4gICAgb25NYXN0ZXJLZXlCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIGxldCB0ZXh0SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE1O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE2O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE3O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1hc3RlcktleW51bSA8IDEpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRleHRJZCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd0V4Y2hhbmdlVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICAgLy8g6aKE6KeI5LiH6IO96ZKl5YyZ5oyJ6ZKuXHJcbiAgICAgb25QcmV2aWV3TWFzdGVyS2V5QnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBsZXQgdGV4dElkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxNztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE4O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxOTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtYXN0ZXJLZXludW0gPCAxKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCh0ZXh0SWQpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dQcmV2aWV3RXhjaGFuZ2VVaSgpO1xyXG4gICAgfVxyXG4gICAgLy8g6Kej6ZSB5oyJ6ZKuXHJcbiAgICBvblVubG9ja0J0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VW5sb2NrRnJhZ21lbnROdW0odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGlmKGhhdmVOdW0gPCBuZWVkTnVtKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5zaG93R2V0QXNzZXRzVWkoKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5HZXRBc3NldHNUaXAsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoR2V0QXNzZXRzVWkpLmluaXREYXRhKEdldEFzc2V0c1R5cGUuSGVybyk7XHJcbiAgICAgICAgICAgIH19KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLC1uZWVkTnVtKTtcclxuICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZEhlcm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5TdG9yZUhlcm9TaG93VWksVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXREYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB9fSk7IFxyXG4gICAgfVxyXG4gICAgLy8g56KO54mH6L2s5YyW5oyJ6ZKuXHJcbiAgICBvbkV4Q2hhbmdlQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBsZXQga2V5SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlCXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW0gPSBOdW1iZXIoKGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSk7XHJcbiAgICAgICAgaWYobnVtID09IDApIHJldHVybjtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oa2V5SWQsLW51bSk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLG51bSk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuS4jeWQjOiLsembhOmAmui/h+S4h+iDveeijueJh+i9rOaNouiOt+W+l+eahOeijueJh+aAu+aVsCArIHRoaXMuaGVyb190eXBlLG51bSk7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLG51bSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuIfog73noo7niYfovazljJbkuI3lkIzoi7Hpm4TmrKHmlbAgKyB0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKGZhbHNlKTtcclxuICAgIH1cclxuICAgIC8vIOmihOiniOeijueJh+i9rOaNouaMiemSrlxyXG4gICAgb25QcmV2aWV3RXhDaGFuZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJldmlld0V4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgbGV0IGtleUlkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlDXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUFcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtID0gTnVtYmVyKChleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkpO1xyXG4gICAgICAgIGlmKG51bSA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGtleUlkLC1udW0pO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSxudW0pO1xyXG4gICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSxudW0pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb3RhbChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4TpgJrov4fkuIfog73noo7niYfovazmjaLojrflvpfnmoTnoo7niYfmgLvmlbAgKyB0aGlzLmhlcm9fdHlwZSxudW0pO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiH6IO956KO54mH6L2s5YyW5LiN5ZCM6Iux6ZuE5qyh5pWwICsgdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMucHJldmlld1JlZnJlc2goKTtcclxuICAgIH1cclxuICAgIC8vIOWinuWKoOi9rOaNoueijueJh+aMiemSrlxyXG4gICAgb25DaGFuZ2VFeGNoYW5nZUJ0bkNsaWNrKGUsbnVtOm51bWJlcil7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBudW0gPSBOdW1iZXIobnVtKTtcclxuICAgICAgICBsZXQgZXhjaGFuZ2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJleGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNsaWRlciA9IGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpO1xyXG4gICAgICAgIHNsaWRlci5wcm9ncmVzcyA9ICAoKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkgKyAoMSAqIG51bSkpL21hc3RlcktleW51bTtcclxuICAgICAgICBpZihzbGlkZXIucHJvZ3Jlc3MgPiAxKSBzbGlkZXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIGlmKHNsaWRlci5wcm9ncmVzcyA8IDApIHNsaWRlci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHNsaWRlci5wcm9ncmVzcztcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChzbGlkZXIucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgIH1cclxuICAgIG9uUHJldmlld0NoYW5nZUV4Y2hhbmdlQnRuQ2xpY2soZSxudW06bnVtYmVyKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIG51bSA9IE51bWJlcihudW0pO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNsaWRlciA9IGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpO1xyXG4gICAgICAgIHNsaWRlci5wcm9ncmVzcyA9ICAoKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkgKyAoMSAqIG51bSkpL21hc3RlcktleW51bTtcclxuICAgICAgICBpZihzbGlkZXIucHJvZ3Jlc3MgPiAxKSBzbGlkZXIucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIGlmKHNsaWRlci5wcm9ncmVzcyA8IDApIHNsaWRlci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHNsaWRlci5wcm9ncmVzcztcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IChzbGlkZXIucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgIH1cclxuICAgIC8vIOWFs+mXreeijueJh+i9rOaNoueVjOmdolxyXG4gICAgb25DbG9zZUV4Y2hhbmdlQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8g5YWz6Zet56KO54mH6L2s5o2i55WM6Z2iXHJcbiAgICBvbkNsb3NlUHJldmlld0V4Y2hhbmdlQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIOWJjeW+gOWVhuW6l+aMiemSrlxyXG4gICAgLy8gb25Hb1Nob3BCdG5DbGljaygpe1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2FtZV90b19ob21lPUdvX1R5cGUuQ2l0eTtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmp1bW9BbmRTaG93VWkoKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUFsbFVpRGlhbG9nKFVJTGF5ZXJMZXZlbC5PbmUpO1xyXG4gICAgLy8gfVxyXG4gICAgb25DbG9zZVJlZHVjdGlvbkJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWR1Y3Rpb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyDmmL7npLrov5jljp/mjInpkq5cclxuICAgIG9uU2hvd1JlZHVjdGlvbkJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgcmVkdWN0aW9uID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVkdWN0aW9uXCIpXHJcbiAgICAgICAgbGV0IHN1bSA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm93TGV2ZWxBbGxDb3N0Q29pbihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGxldCBpdGVtUm9vdCA9IHJlZHVjdGlvbi5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpO1xyXG4gICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChQcm9wKS5pbml0KFByb3BJZC5Db2luLHN1bVswXSxQcm9wQWN0aW9uLkxvb2spO1xyXG4gICAgICAgIGlmKHN1bVsxXSA9PSAwKXtcclxuICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChQcm9wKS5pbml0KFByb3BJZC5HZW0sc3VtWzFdLFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlZHVjdGlvbi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHJlZHVjdGlvbi5nZXRDaGlsZEJ5TmFtZShcInJpY2hUZXh0XCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDk4KTtcclxuICAgIH1cclxuICAgIC8vIOi/mOWOn+aMiemSrlxyXG4gICAgb25SZWR1Y3Rpb25CdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTIwMCkpe1xyXG4gICAgICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9sZERhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3VtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROb3dMZXZlbEFsbENvc3RDb2luKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuQ29pbixzdW1bMF0pO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSxzdW1bMV0pO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChbUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuQ29pbixzdW1bMF0pLFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSxzdW1bMV0pXSk7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVzZXRIZXJvTHZlbCh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDb21iYXRDaGFuZ2VFZmZlY3Qob2xkQ29tYmF0LG5ld0NvbWJhdCxvbGREYXRhLG5ld0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVkdWN0aW9uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4Tov5jljp/nmoTmrKHmlbAgKyB0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlZHVjdGlvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5vbkNsb3NlUmVkdWN0aW9uQnRuQ2xpY2soKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zaG93R2V0QXNzZXRzVWkoKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICAgICAgfSx9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25BdHRyaWJ1dGVCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuafpeeci+iLsembhOWxnuaAp+ivpuaDhSk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0F0dHJpYnV0ZVVpKG51bGwsdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQXR0cmlidXRlLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAvLyB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KHVpQWN0aW9uKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdEhlcm9UeXBlKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUHJldmlld0F0dHJpYnV0ZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5p+l55yL6Iux6ZuE5bGe5oCn6K+m5oOFKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QXR0cmlidXRlVWkobnVsbCx0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5BdHRyaWJ1dGUsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0UHJldmlld0hlcm9UeXBlKHRoaXMuaGVyb190eXBlLEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZSh0aGlzLmhlcm9fdHlwZSksSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heExldmVsKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ0bkV4Y2x1c2l2ZUVxdWlwbWVudENsaWNrKCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLov5nkuKrmjInpkq7ooqvngrnlh7vkuoZcIik7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5FeGNsdXNpdmVJbmZvVWksVUlMYXllckxldmVsLlR3byx7XHJcbiAgICAgICAgICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZUluZm9VaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlSW5mb1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJ0blBldENsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuE55WM6Z2i5a6g54mp5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuEX+eBteWuoOagj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KHRoaXMuaGVyb190eXBlKSA9PSAwKXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5QZXRMaXN0LFVJTGF5ZXJMZXZlbC5Ud28se1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBldEV4Y2hhbmdlVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGV0RXhjaGFuZ2VVaSkuaW5pdERhdGEoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KHRoaXMuaGVyb190eXBlKSx0aGlzLmhlcm9fdHlwZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguUGV0SW5mbyxVSUxheWVyTGV2ZWwuVHdvLHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChQZXRJbmZvVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGV0SW5mb1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGV0RXhjaGFuZ2VVaSh7b25DbG9zZTooKT0+e1xyXG4gICAgICAgIC8vICAgICAvLyB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIC8vIH19LEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpLnBldF9pbmZvLHRoaXMuaGVyb190eXBlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuRXhjbHVzaXZlRXF1aXBBZGRDbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0V4Y2x1c2l2ZVdlYXBvbnNTdHJlbmd0aGVuaW5nVWkoe1xyXG4gICAgICAgIC8vICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSx0aGlzLmhlcm9fdHlwZSx0cnVlKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkV4Y2x1c2l2ZVN0cmVuZ3RoZW5pbmcsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUsdHJ1ZSk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuRXhjbHVzaXZlRXF1aXBTdHJlbmd0aGVuaW5nVWkoKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFhYVwiKVxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0V4Y2x1c2l2ZVdlYXBvbnNVaSh7XHJcbiAgICAgICAgLy8gICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkV4Y2x1c2l2ZSxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zVWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNVaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIH0sfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrRXhjbHVzaXZlV2VhcG9uKCl7XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpIDw9IDEwMCl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTMwMDA1KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tBcnJvd0J0bihlLGRpcjpudW1iZXIpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgZGlyID0gTnVtYmVyKGRpcik7XHJcbiAgICAgICAgaWYodGhpcy5zcXJ0TGlzdCA9PSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IGhlcm9UeXBlID0gdGhpcy5oZXJvX3R5cGUgKyBkaXI7XHJcbiAgICAgICAgICAgIGlmKGhlcm9UeXBlIDw9IEhlcm9fVHlwZS5OVUxMKSBoZXJvVHlwZSA9IEhlcm9fVHlwZS5IZXJvX051bSAtIDE7XHJcbiAgICAgICAgICAgIGlmKGhlcm9UeXBlID49IEhlcm9fVHlwZS5IZXJvX051bSkgaGVyb1R5cGUgPSBIZXJvX1R5cGUuTlVMTCArIDE7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoaGVyb1R5cGUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNxcnRMaXN0LmluZGV4T2YoSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8odGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICAgICAgaW5kZXggKz0gZGlyO1xyXG4gICAgICAgICAgICBpZihpbmRleCA+PSB0aGlzLnNxcnRMaXN0Lmxlbmd0aCkgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICBpZihpbmRleCA8IDApIGluZGV4ID0gdGhpcy5zcXJ0TGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB0aGlzLmluaXREYXRhKHRoaXMuc3FydExpc3RbaW5kZXhdLkhlcm9fSUQsdGhpcy5zcXJ0TGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Hcm93dGgsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAvLyAgICAgdWlOb2RlLmdldENvbXBvbmVudChSb2xlVWkpLmluaXQoe1xyXG4gICAgICAgIC8vICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMub25SZWZyZXNoKCk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdERhdGEoaGVyb1R5cGUpO1xyXG4gICAgICAgIC8vIH0sfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SGVyb0F0dHJpYnV0ZUlkKGhlcm9UeXBlOm51bWJlcixoZXJvTGV2ZWw6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIGhlcm9UeXBlICogMTAwMDAgKyBoZXJvTGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ2V0SGVyb1F1YWxpdHlUZXh0Q29sb3IocXVhbGl0eTpudW1iZXIpOmNjLkNvbG9ye1xyXG4gICAgLy8gICAgIGxldCBjb2xvcj1jYy5jb2xvcigpO1xyXG4gICAgLy8gICAgIHN3aXRjaChxdWFsaXR5KXtcclxuICAgIC8vICAgICAgICAgY2FzZSAyOlxyXG4gICAgLy8gICAgICAgICBjYXNlIDE6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTEzLCAyMjksIDEzMik7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSAzOlxyXG4gICAgLy8gICAgICAgICBjYXNlIDQ6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMTA1LCAxODMsIDI1NSk7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSA1OlxyXG4gICAgLy8gICAgICAgICBjYXNlIDY6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjI2LCAxMjYsIDI1NSk7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSA3OlxyXG4gICAgLy8gICAgICAgICBjYXNlIDg6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAxOTMsIDc0KTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIDk6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMTA6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCA3NCwgNzQpO1xyXG4gICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMTI6e1xyXG4gICAgLy8gICAgICAgICAgICAgY29sb3I9Y2MuY29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbG9yO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVwb3J0SGVyb0xpc3QoKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxQcm9wTnVtKHRydWUpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJDYW52YXNcIikuZ2V0Q29tcG9uZW50KEhvbWUpLnJlZnJlc2hUb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLEhlcm9NYW5hZ2VyLmdldFJlZFR5cGVCeUhlcm9UeXBlKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICB9XHJcblxyXG59Il19