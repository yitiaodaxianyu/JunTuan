
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
var WXManagerEX_1 = require("../../../startscene/WXManagerEX");
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
        if (WXManagerEX_1.default.getInstance().statusBarHeight > 20) {
            top.getComponent(cc.Widget).top = 90;
        }
        else {
            top.getComponent(cc.Widget).top = 0;
        }
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
        if (WXManagerEX_1.default.getInstance().statusBarHeight > 20) {
            top.getComponent(cc.Widget).top = 90;
        }
        else {
            top.getComponent(cc.Widget).top = 0;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcVWlcXFJvbGVVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBMEQ7QUFDMUQsbURBQThDO0FBQzlDLHlDQUFvQztBQUNwQyw4RUFBb0Y7QUFDcEYsc0VBQTRFO0FBQzVFLDJEQUFtRTtBQUNuRSxxRUFBb0U7QUFDcEUsOERBQXlEO0FBQ3pELDBEQUFxRDtBQUNyRCx5RUFBb0U7QUFDcEUsaURBQTRDO0FBQzVDLDZEQUFxRjtBQUNyRiwyREFBMEQ7QUFDMUQsdURBQTZEO0FBQzdELHFFQUEyRTtBQUMzRSx5REFBdUQ7QUFDdkQsbUNBQThCO0FBQzlCLDREQUFrRTtBQUNsRSw0RUFBa0Y7QUFDbEYseURBQXdEO0FBQ3hELHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQsdUVBQWtFO0FBQ2xFLGlFQUE0RDtBQUM1RCxtREFBa0Q7QUFDbEQsNERBQXVEO0FBQ3ZELG9EQUErQztBQUMvQyxnREFBMkM7QUFDM0Msd0NBQW1DO0FBQ25DLG9EQUEyRDtBQUMzRCxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELCtEQUEwRDtBQUMxRCxnREFBK0M7QUFDL0Msc0RBQWlEO0FBQ2pELHlEQUFzRjtBQUN0Riw2Q0FBd0M7QUFDeEMsdURBQWtEO0FBQ2xELHFFQUFnRTtBQUNoRSxvREFBa0U7QUFDbEUseURBQW9EO0FBQ3BELG9EQUErQztBQUMvQyw4Q0FBcUU7QUFFckUsZ0RBQStDO0FBQy9DLHVEQUE2RDtBQUU3RCxtREFBeUQ7QUFDekQsMkNBQWlEO0FBQ2pELHFGQUFnRjtBQUNoRiwyREFBc0Q7QUFDdEQsNkNBQXdDO0FBRWxDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDLElBQUssS0FJSjtBQUpELFdBQUssS0FBSztJQUNOLHVDQUFXLENBQUE7SUFDWCxtQ0FBSyxD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QUFjLEVBQUUsQ0FBQztRQUMzQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsNEJBQVcsR0FBWDtRQUVJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsMkJBQVksQ0FBQyxZQUFZLENBQUMsNkJBQWMsQ0FBQyxTQUFTLEVBQUMseUJBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBM3NERDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzJDQUNPO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ2lCO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ1E7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUMsQ0FBQztzREFDSztJQVR2QixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBZ3REMUI7SUFBRCxhQUFDO0NBaHRERCxBQWd0REMsQ0FodERtQyxxQkFBVyxHQWd0RDlDO2tCQWh0RG9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb2luUG9wIGZyb20gXCIuLi8uLi9Db2luUG9wXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vRXF1aXBtZW50L0RhdGEvRXF1aXBtZW50QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1lcmdlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRGF0YS9FcXVpcG1lbnRNZXJnZVwiO1xyXG5pbXBvcnQgeyBFcXVpcEluZm8sIEVxdWlwVHlwZSB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRXF1aXBDb25maWdcIjtcclxuaW1wb3J0IHsgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgRXF1aXBJbmZvVWkgZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9VaS9FcXVpcEluZm9VaVwiO1xyXG5pbXBvcnQgRXF1aXBJdGVtIGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvVWkvRXF1aXBJdGVtXCI7XHJcbmltcG9ydCBFeGNsdXNpdmVJbmZvVWkgZnJvbSBcIi4uLy4uL0V4Y2x1c2l2ZUluZm9VaS9FeGNsdXNpdmVJbmZvVWlcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvQmFzZUluZm9NYW5hZ2VyLCBKc29uSGVyb0Jhc2VJbmZvIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvQmFzZUluZm9cIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9UaXRsZU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vSGVyby9EYXRhL0hlcm9UaXRsZVwiO1xyXG5pbXBvcnQgeyBTa2lsbExldmVsVW5sb2NrTWFuYWdlciB9IGZyb20gXCIuLi8uLi9IZXJvL0RhdGEvU2tpbGxMZXZlbFVubG9ja1wiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4uLy4uL0hvbWVcIjtcclxuaW1wb3J0IHsgRVdVbmxvY2tDb3N0TWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9FV1VubG9ja0Nvc3RcIjtcclxuaW1wb3J0IHsgRXhjbHVzaXZlRW5oYW5jZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0V4Y2x1c2l2ZUVuaGFuY2VtZW50XCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi8uLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCBQZXRFeGNoYW5nZVVpIGZyb20gXCIuLi8uLi9QZXQvVWkvUGV0RXhjaGFuZ2VVaVwiO1xyXG5pbXBvcnQgUGV0SW5mb1VpIGZyb20gXCIuLi8uLi9QZXQvVWkvUGV0SW5mb1VpXCI7XHJcbmltcG9ydCBQZXRJdGVtIGZyb20gXCIuLi8uLi9QZXQvVWkvUGV0SXRlbVwiO1xyXG5pbXBvcnQgUHJvcCBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BJZCB9IGZyb20gXCIuLi8uLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBTdG9yZUhlcm9TaG93VWkgZnJvbSBcIi4uLy4uL1N0b3JlL1N0b3JlSGVyb1Nob3dVaVwiO1xyXG5pbXBvcnQgeyBUYXNrSXRlbSB9IGZyb20gXCIuLi8uLi9UYXNrL1Rhc2tFbnVtXCI7XHJcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tIFwiLi4vLi4vVGFzay9UYXNrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uLy4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgTnVtYmVyTGFiZWwgZnJvbSBcIi4uLy4uL1Rvb2xzL051bWJlckxhYmVsXCI7XHJcbmltcG9ydCBUdXRvcmFpbHNNYW5hZ2VyIGZyb20gXCIuLi8uLi9UdXRvcmlhbHMvVHV0b3JhaWxzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2V0QXNzZXRzVWksIHsgR2V0QXNzZXRzVHlwZSB9IGZyb20gXCIuLi8uLi9VSS9HZXRBc3NldHNVaVwiO1xyXG5pbXBvcnQgQXRycmlidXRlVWkgZnJvbSBcIi4uLy4uL1VJL2hvbWUvQXRycmlidXRlVWlcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBFZmZlY3RQYXRoLCBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvSGVyb0F0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyBIZXJvRGF0YSB9IGZyb20gXCIuLi9EYXRhL0hlcm9EYXRhXCI7XHJcbmltcG9ydCB7IEhlcm9RdWFsaXR5TWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0hlcm9RdWFsaXR5XCI7XHJcbmltcG9ydCB7IExldmVsVXBNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvTGV2ZWxVcFwiO1xyXG5pbXBvcnQgRXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSBmcm9tIFwiLi9FeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpXCI7XHJcbmltcG9ydCBFeGNsdXNpdmVXZWFwb25zVWkgZnJvbSBcIi4vRXhjbHVzaXZlV2VhcG9uc1VpXCI7XHJcbmltcG9ydCBIZXJvU2tpbGxVaSBmcm9tIFwiLi9IZXJvU2tpbGxVaVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIFN0YXRle1xyXG4gICAgUHJldmlldyA9IDAsXHJcbiAgICBMZXZlbCxcclxuICAgIFN0YXIsXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVVaSBleHRlbmRzIFVJQ29tcG9uZW50e1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVBdGxhcylcclxuICAgIHJvbGVfdWkgOiBjYy5TcHJpdGVBdGxhcyA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGhlcm9fYXZhdGFyX2xpZ2h0IDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGN1cl9oZXJvIDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoe3R5cGU6W3NwLlNrZWxldG9uRGF0YV19KVxyXG4gICAgaGVyb19za2VsZXRvbl9kYXRhOnNwLlNrZWxldG9uRGF0YVtdPVtdO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIGhlcm9fdHlwZSA6IEhlcm9fVHlwZSA9IC0xO1xyXG4gICAgcHJpdmF0ZSBzdGF0ZSA6IFN0YXRlID0gU3RhdGUuTGV2ZWw7XHJcbiAgICBwcml2YXRlIHNxcnRMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdXHJcblxyXG5cclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy51aV9hY2l0b249dWlBYztcclxuICAgIH1cclxuICAgIFxyXG4gICAgaW5pdERhdGEoaGVyb1R5cGU6SGVyb19UeXBlLHNxcnRMaXN0Okpzb25IZXJvQmFzZUluZm9bXSA9IFtdKXtcclxuICAgICAgICB0aGlzLmhlcm9fdHlwZSA9IGhlcm9UeXBlO1xyXG4gICAgICAgIGxldCBoZXJvID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvSW5mbyhoZXJvVHlwZSk7XHJcbiAgICAgICAgdGhpcy5zcXJ0TGlzdCA9IHNxcnRMaXN0O1xyXG4gICAgICAgIGlmKHRoaXMuc3FydExpc3QubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgICAvLyBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJhcnJvd19yaWdodFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gYm90dG9tLmdldENoaWxkQnlOYW1lKFwiYXJyb3dfbGVmdFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zcXJ0TGlzdCA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBcnJheURhdGEoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiYXJyb3dfcmlnaHRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiYXJyb3dfbGVmdFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihoZXJvID09IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuUHJldmlldztcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3UmVmcmVzaChmYWxzZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkxldmVsO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKGZhbHNlKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvL+aVmeeoi1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzAxKT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMzAyKSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzX3R1dG9yYWlsc19zdGF0ZT09dHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAvL+aJvuWIsOWNh+e6p+aMiemSrlxyXG4gICAgICAgICAgICAgICAgbGV0IGJ0blVwZ3JhZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwnKS5nZXRDaGlsZEJ5TmFtZSgndXBncmFkZUJ0bicpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdvcmRQb3M9YnRuVXBncmFkZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJ0blVwZ3JhZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxQb3M9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkUG9zKTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDMwMixudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMzAyKTtcclxuICAgICAgICAgICAgICAgIH0sdHJ1ZSxudWxsLGxvY2FsUG9zKTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTEpPT1mYWxzZSYmVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygzMTIpKXtcclxuICAgICAgICAgICAgICAgIC8v5YiH5o2i5Yiw5Y2H5pifXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3RhckJ0bkNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAvL+aJvuWIsOWNh+aYn+aMiemSrlxyXG4gICAgICAgICAgICAgICAgbGV0IGJ0blVwZ3JhZGU9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS5nZXRDaGlsZEJ5TmFtZSgnc3RhcicpLmdldENoaWxkQnlOYW1lKCd1cHN0YXJCdG4nKTtcclxuICAgICAgICAgICAgICAgIGxldCB3b3JkUG9zPWJ0blVwZ3JhZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihidG5VcGdyYWRlLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsUG9zPWNjLmZpbmQoJ0NhbnZhcy9VaV9Sb290JykuY29udmVydFRvTm9kZVNwYWNlQVIod29yZFBvcyk7XHJcbiAgICAgICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygzMTIsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDMxMik7XHJcbiAgICAgICAgICAgICAgICB9LHRydWUsbnVsbCxsb2NhbFBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZWxzZSBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyMSk9PWZhbHNlJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyMikpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy/mib7liLDkuIDplK7nqb/miLTmjInpkq5cclxuICAgICAgICAgICAgLy8gICAgIGxldCBidG5VcGdyYWRlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJykuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2VxdWlwUm9vdCcpLmdldENoaWxkQnlOYW1lKCdidG5XZWFyJyk7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgd29yZFBvcz1idG5VcGdyYWRlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoYnRuVXBncmFkZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBsb2NhbFBvcz1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICAvLyAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dUdXRvcmlhbHMoMjIyLG51bGwsKCk9PntcclxuICAgICAgICAgICAgLy8gICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZVR1dG9yaWFscygyMjIpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSx0cnVlLG51bGwsbG9jYWxQb3MpO1xyXG4gICAgICAgICAgICAvLyB9ZWxzZSBpZihUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyNSk9PWZhbHNlJiZUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuaXNTaG93VHV0b3JpYWxzKDIyNikpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy/mib7liLDmrablmajmjInpkq5cclxuICAgICAgICAgICAgLy8gICAgIGxldCBidG5VcGdyYWRlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJykuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2VxdWlwUm9vdCcpLmdldENoaWxkQnlOYW1lKCd6YkJnMScpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHdvcmRQb3M9YnRuVXBncmFkZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJ0blVwZ3JhZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgbG9jYWxQb3M9Y2MuZmluZCgnQ2FudmFzL1VpX1Jvb3QnKS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkUG9zKTtcclxuICAgICAgICAgICAgLy8gICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VHV0b3JpYWxzKDIyNixudWxsLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgICB9LGZhbHNlLG51bGwsbG9jYWxQb3MpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sMC4wMilcclxuICAgIH1cclxuXHJcbiAgICAvLyDop6PplIHlkI7pgJrnlKjmmL7npLrliLfmlrBcclxuICAgIGluZm9SZWZyZXNoKCl7XHJcbiAgICAgICAgbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKTtcclxuICAgICAgICBpZihXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnN0YXR1c0JhckhlaWdodD4yMCl7ICAgXHJcbiAgICAgICAgICAgIHRvcC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50b3AgPSA5MDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9wLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRvcCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdGFyID0gSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiY29pbkxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwiZ2VtTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSkpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TmFtZVRleHRfSUQodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJuaWNrbmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFxyXG4gICAgICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEhlcm9UaXRsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvVGl0bGVUZXh0SWRCeUhlcm9UeXBlQW5kSGVyb1N0YXIodGhpcy5oZXJvX3R5cGUsc3RhcikpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInF1YWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RpdGxlX1wiICsgSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpICsgXCJfMFwiKVxyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGl0bGVfXCIgKyBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSkgKyBcIl8xXCIpXHJcbiAgICAgICAgaWYoc3RhciA9PSAwKXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19TdGFyX1wiICsgc3Rhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZXJvU3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvU3BcIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKVxyXG4gICAgICAgIGhlcm9TcC5za2VsZXRvbkRhdGEgPSB0aGlzLmhlcm9fc2tlbGV0b25fZGF0YVt0aGlzLmhlcm9fdHlwZS0xXTtcclxuICAgICAgICBoZXJvU3Auc2V0QW5pbWF0aW9uKDAsXCJJZGxlXCIsdHJ1ZSk7XHJcbiAgICAgICAgLy8gYW5pbWEubGlzdGVuZXI9bnVsbDtcclxuICAgICAgICBoZXJvU3Auc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PntcclxuICAgICAgICAgICAgLy8gYW5pbWEubGlzdGVuZXI9bnVsbDsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBqdWRnZSA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgIGlmKGp1ZGdlIDwgMC42KXtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnSWRsZSc7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGp1ZGdlIDwgMC44KXtcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAnQXR0YWNrJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0lkbGUyJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBoZXJvU3Auc2V0QW5pbWF0aW9uKDAsbmFtZSx0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBoZXJvU3Aubm9kZS5zY2FsZSA9IDAuNDtcclxuICAgIH1cclxuICAgIC8vIOWNh+e6p+WIt+aWsFxyXG4gICAgdXBncmFkZVJlZnJlc2goaXNSZWZyZXNoOmJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBsZXQgSE0gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgbGV0IGhlcm9CYXNlSW5mbyA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSGVyb0Jhc2VJbmZvKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSk7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICBsZXQgbGV2ZWwgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbFwiKTtcclxuICAgICAgICBsZXQgaGVyb0luZm8gPSBITS5nZXRIZXJvSW5mbyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IGhlcm9EYXRhID0gSE0uZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCB6aGFubGkgPSBITS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgZXF1aXBSb290ID0gbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcFJvb3RcIik7XHJcbiAgICAgICAgbGV0IHpiUm9vdCA9IGVxdWlwUm9vdC5nZXRDaGlsZEJ5TmFtZShcInpiUm9vdFwiKTtcclxuICAgICAgICAvLyB6YlJvb3QucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuXHJcbiAgICAgICAgaWYoaGVyb0luZm8uZXhjbHVzaXZlX2VxdWlwX3N0YWdlIDwgMSl7XHJcbiAgICAgICAgICAgIGxldCBleEl0ZW0gPSB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcDVcIik7XHJcbiAgICAgICAgICAgIGV4SXRlbS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KHRoaXMuaGVyb190eXBlLGhlcm9CYXNlSW5mby5GaXJzdEV4Y2x1c2l2ZVdlYXBvbklELFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgIGV4SXRlbS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGV4SXRlbS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgemJSb290LmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCkpO1xyXG4gICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJuZWVkTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCIvXCIgKyBNeVRvb2wuZ2V0Q29pbkRhbndlaShFV1VubG9ja0Nvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEZyYWdtZW50KGhlcm9CYXNlSW5mby5RdWFsaXR5KSk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCkgPiBFV1VubG9ja0Nvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEZyYWdtZW50KGhlcm9CYXNlSW5mby5RdWFsaXR5KSl7XHJcbiAgICAgICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTUsNzQsNzQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBleEl0ZW0gPSB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJlcXVpcDVcIik7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGV4SXRlbS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICBleEl0ZW0uY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgZXhJdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsaGVyb0Jhc2VJbmZvLkZpcnN0RXhjbHVzaXZlV2VhcG9uSUQgKyBFeGNsdXNpdmVFbmhhbmNlbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxoZXJvSW5mby5leGNsdXNpdmVfZXF1aXBfc3RhZ2UpLlN0YXIsUHJvcEFjdGlvbi5OdWxsKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZihITS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpID4gMSl7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInJldmVydEljb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmV2ZXJ0SWNvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5QcmV2aWV3O1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLlN0YXI7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzBfMVwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8xXCIpO1xyXG4gICAgICAgIGxldmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLyoq5piv5ZCm5pyJ56m/5oi055qE55qE5o+Q56S6ICovXHJcbiAgICAgICAgbGV0IGlzSGF2ZUVxdWlwUmVkPWZhbHNlO1xyXG4gICAgICAgIC8qKuaYr+WQpuacieWQiOaIkOe6oueCueeahOaPkOekuiAqL1xyXG4gICAgICAgIGxldCBpc0hhdmVNZXJnZVJlZD1mYWxzZTtcclxuICAgICAgICBmb3IobGV0IGk9RXF1aXBUeXBlLld1UWk7IGk8RXF1aXBUeXBlLk51bTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHdlYXJJZD1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJFcXVpcG1lbnQodGhpcy5oZXJvX3R5cGUsaSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPXpiUm9vdC5nZXRDaGlsZEJ5TmFtZShcImVxdWlwXCIgKyBpKTtcclxuICAgICAgICAgICAgLy/mmK/lkKblj6/ku6Xnqb/miLTmm7Tpq5jmiJbogIXlj6/ku6Xnqb/miLRcclxuICAgICAgICAgICAgbGV0IGlzQ2FuV2Vhcj1mYWxzZTtcclxuICAgICAgICAgICAgbGV0IGlzQ2FuTWVyZ2U9ZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHdlYXJJZCE9MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8g5pyJ6KOF5aSHXHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXF1aXBJbmZvPW5ldyBFcXVpcEluZm8oKTtcclxuICAgICAgICAgICAgICAgIGVxdWlwSW5mby5lcXVpcF9pZD13ZWFySWQ7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChFcXVpcEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsZXF1aXBJbmZvLFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgICAgICAvL+aYr+WQpuiDveiiq+a2iOiAl+aOieW5tuS4lOa7oei2s+WQiOaIkOadoeS7tlxyXG4gICAgICAgICAgICAgICAgaWYoIUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJc01heFN0YWdlKHdlYXJJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQ2FuTWVyZ2U9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQUVxdWlwTWVyZ2UoRXF1aXBtZW50TWVyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFyZ2V0RXF1aXBtZW50X2lkKHdlYXJJZCksW10pO1xyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8g5peg6KOF5aSHXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJBQlwiICsgemJSb290LmNoaWxkcmVuQ291bnQpO1xyXG4gICAgICAgICAgICAvL+ajgOa1i+e6oueCuVxyXG4gICAgICAgICAgICBsZXQgcmVkPWVxdWlwUm9vdC5nZXRDaGlsZEJ5TmFtZSgncmVkJytpKTtcclxuICAgICAgICAgICAgaXNDYW5XZWFyPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1dlYXIodGhpcy5oZXJvX3R5cGUsaSk7XHJcbiAgICAgICAgICAgIGlmKGlzQ2FuV2Vhcil7XHJcbiAgICAgICAgICAgICAgICBpc0hhdmVFcXVpcFJlZD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGlzQ2FuTWVyZ2Upe1xyXG4gICAgICAgICAgICAgICAgaXNIYXZlTWVyZ2VSZWQ9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWQuYWN0aXZlPWlzQ2FuTWVyZ2V8fGlzQ2FuV2VhcjtcclxuICAgICAgICB9ICBcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQodGhpcy5oZXJvX3R5cGUpID09IDApe1xyXG4gICAgICAgICAgICB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBwZXQgPSB6YlJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRcIik7XHJcbiAgICAgICAgICAgIHBldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwZXQuZ2V0Q29tcG9uZW50KFBldEl0ZW0pLmluaXQodGhpcy5oZXJvX3R5cGUsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRXZWFyUGV0KHRoaXMuaGVyb190eXBlKSxQcm9wQWN0aW9uLk51bGwpO1xyXG4gICAgICAgIH0gICBcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICdMVi4nICsgaGVyb0luZm8uaGVyb19sZXZlbDtcclxuICAgICAgICBpZihpc1JlZnJlc2gpXHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZpZ2h0TnVtXCIpLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuc2V0VGFyZ2V0KHpoYW5saSwwLjUsdHJ1ZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodE51bVwiKS5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLmluaXQoemhhbmxpLHRydWUpO1xyXG5cclxuICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImhwTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImRhbWFnZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZGVmZW5zZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImF0a1NwZWVkTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLmF0a1NwZWVkLDEpO1xyXG5cclxuICAgICAgICBsZXQgc2tpbGxSb290ID0gbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJza2lsbFJvb3RcIik7XHJcbiAgICAgICAgbGV0IHNraWxsTnVtID0gaGVyb0Jhc2VJbmZvLlNraWxsTnVtO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7aSA8PSA0O2krKyl7XHJcbiAgICAgICAgICAgIGlmKGk8PXNraWxsTnVtKXtcclxuICAgICAgICAgICAgICAgIGxldCBza2lsbCA9IHNraWxsUm9vdC5nZXRDaGlsZEJ5TmFtZShcImJ0blNraWxsXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdW5sb2NrTGV2ZWwgPSAgU2tpbGxMZXZlbFVubG9ja01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwoaSlcclxuICAgICAgICAgICAgICAgIGlmKGhlcm9JbmZvLmhlcm9fbGV2ZWwgPCB1bmxvY2tMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1wiKyB0aGlzLmhlcm9fdHlwZSArXCJfU2tpbGxfXCIgKyAoaS0xKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmNoaWxkcmVuWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbGwuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fXCIrIHRoaXMuaGVyb190eXBlICtcIl9Ta2lsbF9cIiArIChpLTEpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lsbC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHNraWxsLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9ICcnICsgKEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxoZXJvSW5mby5oZXJvX3N0YWdlKSArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2tpbGxSb290LmdldENoaWxkQnlOYW1lKFwiYnRuU2tpbGxcIiArIGkpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1cGdyYWRlQnRuPWxldmVsLmdldENoaWxkQnlOYW1lKFwidXBncmFkZUJ0blwiKTtcclxuICAgICAgICBsZXQgaXNMZXZlbD1mYWxzZTtcclxuICAgICAgICBsZXQgaXNDb2luPWZhbHNlO1xyXG4gICAgICAgIGxldCBpc0dlbT1mYWxzZTtcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gaGVyb0Jhc2VJbmZvLk1heExldmVsKXtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZ2VtQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEyMDAxMCk7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNvaW5IYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKTtcclxuICAgICAgICAgICAgbGV0IGNvaW5OZWVkTnVtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0Q29pbihoZXJvSW5mby5oZXJvX2xldmVsKTtcclxuICAgICAgICAgICAgbGV0IGdlbUhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkdlbSk7XHJcbiAgICAgICAgICAgIGxldCBnZW1OZWVkTnVtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0R2VtKGhlcm9JbmZvLmhlcm9fbGV2ZWwpO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTAwMDE4KTtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoY29pbkhhdmVOdW0pO1xyXG4gICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKGNvaW5OZWVkTnVtKTtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShnZW1IYXZlTnVtKTtcclxuICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcIm5lZWROdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIi9cIiArIE15VG9vbC5nZXRDb2luRGFud2VpKGdlbU5lZWROdW0pO1xyXG4gICAgICAgICAgICAvLyDljYfnuqfmjInpkq7nva7ngbDvvIzkvJjlhYjlhbPljaHnva7ngbAo5Y2z5Zyo6YeR5biB6Laz5aSf55qE5oOF5Ya15LiL77yM6YCa6L+H5YWz5Y2h5rKh6L6+5Yiw6KaB5rGC5YiZ5oyJ6ZKu572u54GwKeOAglxyXG4gICAgICAgICAgICAvLyDlpoLmnpzmmK/ku6XkuLrph5HluIHkuI3otrPnva7ngbDliJnngrnlh7vljYfnuqfmjInpkq7lvLnlh7rotYTmupDkuI3otrPlvLnnqpfvvIzlpoLmnpzmmK/lhbPljaHpmZDliLbnva7ngbDvvIzngrnlh7vljYfnuqfmjInpkq7liJnmj5DnpLrpgJrov4flhbPljaHkuI3otrPpo5jlrZfmj5DphpJcclxuICAgICAgICAgICAgaWYoY29pbkhhdmVOdW0gPCBjb2luTmVlZE51bSl7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTQsNzYsNzYpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDIyMiwxOTksMTY2KTtcclxuICAgICAgICAgICAgICAgIGlzQ29pbj10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGdlbUhhdmVOdW0gPCBnZW1OZWVkTnVtKXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiZ2VtQmdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU0LDc2LDc2KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImdlbUJnXCIpLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDIyMiwxOTksMTY2KTtcclxuICAgICAgICAgICAgICAgIGlzR2VtPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZ2VtTmVlZE51bSA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGxldmVsLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXZlbC5nZXRDaGlsZEJ5TmFtZShcImNvaW5CZ1wiKS54ID0gMTUwO1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1CZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBmaW5pc2hMZXZlbCA9IExldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbDtcclxuICAgICAgICAgICAgbGV0IG5lZWRMZXZlbD1MZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldExldmVsTGltaXQoaGVyb0luZm8uaGVyb19sZXZlbCk7XHJcbiAgICAgICAgICAgIGlmKGZpbmlzaExldmVsIDwgbmVlZExldmVsKXtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICBpc0xldmVsPWZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgICAgIGlzTGV2ZWw9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIC8v5a6g54mp55qE57qi54K5XHJcbiAgICAgICAgbGV0IGlzUGV0UmVkPVBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1JlZFRpcCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgZXF1aXBSb290LmdldENoaWxkQnlOYW1lKCdyZWRQZXQnKS5hY3RpdmU9aXNQZXRSZWQ7XHJcbiAgICAgICAgbGV0IGlzRXg9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0V4VXAodGhpcy5oZXJvX3R5cGUpOztcclxuICAgICAgICBlcXVpcFJvb3QuZ2V0Q2hpbGRCeU5hbWUoJ3JlZEV4JykuYWN0aXZlPWlzRXg7XHJcbiAgICAgICAgLy/ljYfnuqfmjInpkq7nuqLngrlcclxuICAgICAgICBsZXQgaXNDYW5VcD0oaXNDb2luICYmIGlzTGV2ZWwgJiYgaXNHZW0pO1xyXG4gICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1pc0NhblVwO1xyXG4gICAgICAgIC8v5Y2H57qn5qih5Z2X55qE5oyJ6ZKu57qi54K5XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9aXNIYXZlRXF1aXBSZWR8fGlzQ2FuVXB8fGlzSGF2ZU1lcmdlUmVkfHxpc1BldFJlZHx8aXNFeDtcclxuICAgICAgICAvL+WNh+aYn+aooeWdl+eahOaMiemSrue6oueCuVxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1VwU3Rhcih0aGlzLmhlcm9fdHlwZSl8fEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tBbGxQdXJwb3NlRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIC8v5LiA6ZSu56m/5oi0XHJcbiAgICAgICAgZXF1aXBSb290LmdldENoaWxkQnlOYW1lKCdidG5XZWFyJykuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1pc0hhdmVFcXVpcFJlZDsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWNh+aYn+WIt+aWsFxyXG4gICAgdXBzdGFyUmVmcmVzaChpc1JlZnJlc2g6Ym9vbGVhbiA9IHRydWUpe1xyXG4gICAgICAgIGxldCBITSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICBsZXQgdG9wID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidG9wXCIpO1xyXG4gICAgICAgIGxldCBzdGFyID0gYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKTtcclxuICAgICAgICBsZXQgc3RhZ2UgPSBITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpICUgNjtcclxuICAgICAgICBsZXQgaGVyb0RhdGEgPSBITS5nZXRIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcblxyXG4gICAgICAgIGlmKEhNLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPiAxKXtcclxuICAgICAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmV2ZXJ0SWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJyZXZlcnRJY29uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMFwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8xXzFcIik7XHJcbiAgICAgICAgaWYoSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpID09IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXhTdGFnZSh0aGlzLmhlcm9fdHlwZSkpe1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19BcnJvd1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldEhwTnVtXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0QXRrTnVtXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0RGVmYW5jZU51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfM1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiY29pbkJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1cHN0YXJCdG5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0ljb25fMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fSWNvbl8yXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzNcIikuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8xXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF80XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8yXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfMlwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMl8zXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8yXzRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfNVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGlwTGFiZWxcIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGxldCB6aGFubGkgPSBITS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5zZXRUYXJnZXQoemhhbmxpLDAuNSx0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJocE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiYXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiZGVmYW5jZU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfZGVmZW5zZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRhcmdldEhlcm9EYXRhID0gSE0uZ2V0VGFyZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUsSE0uZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSArIDEsSE0uZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSlcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRpcExhYmVsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19BcnJvd1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRIcE51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRBdGtOdW1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidGFyZ2V0RGVmYW5jZU51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0JnXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19CZ18yXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fQmdfM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luQmdcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1cHN0YXJCdG5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzFcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19JY29uXzNcIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxJY29uXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3Rhckljb25cIikuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwicHJldmlld1wiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLlByZXZpZXc7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5MZXZlbDtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuU3RhcjtcclxuICAgICAgICBsZXQgbGV2ZWw9Ym90dG9tLmdldENoaWxkQnlOYW1lKFwibGV2ZWxcIik7XHJcbiAgICAgICAgbGV2ZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoKHN0YWdlKXtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgNjtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0ZW1wICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzJfXCIgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCA2O2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA8PSBzdGFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8xXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8wXzJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09IDUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfM1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfNFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8xXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8yXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGkgPT0gNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiSGVyb19Fdm9sdmVfMF8zXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcIkhlcm9fRXZvbHZlXzBfNFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJIZXJvX0V2b2x2ZV8yX1wiICsgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPD0gc3RhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgemhhbmxpID0gSE0uZ2V0SGVyb1poYW5saSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgaWYoaXNSZWZyZXNoKVxyXG4gICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJmaWdodE51bVwiKS5nZXRDb21wb25lbnQoTnVtYmVyTGFiZWwpLnNldFRhcmdldCh6aGFubGksMC41LHRydWUpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5pbml0KHpoYW5saSx0cnVlKTtcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiaHBOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2hwKTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiYXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJkZWZhbmNlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldEhwTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gIE15VG9vbC5udW1iZXJGb3JtYXQodGFyZ2V0SGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ0YXJnZXRBdGtOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KHRhcmdldEhlcm9EYXRhLnRvdGFsX2F0dGFjayk7XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInRhcmdldERlZmFuY2VOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KHRhcmdldEhlcm9EYXRhLnRvdGFsX2RlZmVuc2UpO1xyXG5cclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKSxITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKTtcclxuXHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShoYXZlTnVtKTtcclxuICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkobmVlZE51bSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaGF2ZU51bSA8IG5lZWROdW0pe1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NCw3Niw3Nik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJoYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjIyLDE5OSwxNjYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFsbEZyYWdtZW50UmVkPWZhbHNlO1xyXG4gICAgICAgIGlmKG1hc3RlcktleW51bSA8IDEpe1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidW5pdmVyc2FsQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGFsbEZyYWdtZW50UmVkPWZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFyLmdldENoaWxkQnlOYW1lKFwidW5pdmVyc2FsQnRuXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgYWxsRnJhZ21lbnRSZWQ9SGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja0FsbFB1cnBvc2VGcmFnbWVudCh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXIuZ2V0Q2hpbGRCeU5hbWUoXCJ1bml2ZXJzYWxCdG5cIikuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1hbGxGcmFnbWVudFJlZDtcclxuICAgICAgICAvL+WNh+e6p+aooeWdl+eahOaMiemSrue6oueCuVxyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsSWNvblwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPUhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hlY2tVcGdyYWRlKHRoaXMuaGVyb190eXBlKS5pc19jYW5fdXA7XHJcbiAgICAgICAgLy/ljYfmmJ/mqKHlnZfnmoTmjInpkq7nuqLngrlcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWhhdmVOdW0+PW5lZWROdW18fGFsbEZyYWdtZW50UmVkO1xyXG4gICAgICAgIC8v5Y2H5pif5oyJ6ZKu55qE57qi54K5XHJcbiAgICAgICAgc3Rhci5nZXRDaGlsZEJ5TmFtZShcInVwc3RhckJ0blwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPWhhdmVOdW0+PW5lZWROdW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmlld1JlZnJlc2goaXNSZWZyZXNoOmJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBsZXQgSE0gPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIik7XHJcbiAgICAgICAgbGV0IHByZXZpZXcgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3XCIpO1xyXG4gICAgICAgIC8vIGxldCBoZXJvSW5mbyA9IEhNLmdldEhlcm9JbmZvKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgaGVyb0Jhc2VJbmZvID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25IZXJvQmFzZUluZm8odGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBoZXJvTWF4TGV2ZWwgID0gMjQwO1xyXG4gICAgICAgIGxldCBoZXJvTWF4U3RhZ2UgID0gaGVyb0Jhc2VJbmZvLk1heFN0YWdlO1xyXG4gICAgICAgIGxldCBoZXJvRGF0YSA9IEhNLmdldFRhcmdldEhlcm9EYXRhKHRoaXMuaGVyb190eXBlLGhlcm9NYXhTdGFnZSxoZXJvTWF4TGV2ZWwpO1xyXG4gICAgICAgIGxldCB6aGFubGkgPSBITS5nZXRUYXJnZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlLGhlcm9NYXhTdGFnZSxoZXJvTWF4TGV2ZWwpO1xyXG4gICAgICAgIGxldCB0b3AgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIik7XHJcbiAgICAgICAgaWYoV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5zdGF0dXNCYXJIZWlnaHQ+MjApeyAgIFxyXG4gICAgICAgICAgICB0b3AuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudG9wID0gOTA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS50b3AgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmV2ZXJ0SWNvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gcHJldmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdcIikuYWN0aXZlID0gdGhpcy5zdGF0ZSA9PSBTdGF0ZS5QcmV2aWV3O1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSB0aGlzLnN0YXRlID09IFN0YXRlLlN0YXI7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImVxdWlwNVwiKS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5pbml0KHRoaXMuaGVyb190eXBlLGhlcm9CYXNlSW5mby5GaXJzdEV4Y2x1c2l2ZVdlYXBvbklELFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImVIYXZlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGhlcm9CYXNlSW5mby5FeGNsdXNpdmVXZWFwb25GcmFnbWVudCkpO1xyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJlTmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkoRVdVbmxvY2tDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RGcmFnbWVudChoZXJvQmFzZUluZm8uUXVhbGl0eSkpO1xyXG5cclxuICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkV4Y2x1c2l2ZVdlYXBvbkZyYWdtZW50KSA+IEVXVW5sb2NrQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RnJhZ21lbnQoaGVyb0Jhc2VJbmZvLlF1YWxpdHkpKXtcclxuICAgICAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImVIYXZlTnVtXCIpLmNvbG9yID0gY2MuY29sb3IoMjU1LDI1NSwyNTUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiZUhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyNTUsNzQsNzQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHN0YXIgPSBIZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsaGVyb01heFN0YWdlKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJjb2luTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJnZW1MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGhlcm9CYXNlSW5mby5OYW1lVGV4dF9JRCk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwibmlja25hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChIZXJvVGl0bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1RpdGxlVGV4dElkQnlIZXJvVHlwZUFuZEhlcm9TdGFyKHRoaXMuaGVyb190eXBlLHN0YXIpKTtcclxuICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJxdWFsaXR5XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UaXRsZV9cIiArIGhlcm9CYXNlSW5mby5RdWFsaXR5ICsgXCJfMFwiKVxyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcIm5hbWVCZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGl0bGVfXCIgKyBoZXJvQmFzZUluZm8uUXVhbGl0eSArIFwiXzFcIilcclxuICAgICAgICBpZihzdGFyID09IDApe1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1N0YXJfXCIgKyBzdGFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGhlcm9TcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcImhlcm9TcFwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pXHJcbiAgICAgICAgLy8gaGVyb1NwLnNrZWxldG9uRGF0YSA9IHRoaXMuaGVyb19za2VsZXRvbl9kYXRhW3RoaXMuaGVyb190eXBlLTFdO1xyXG4gICAgICAgIC8vIGhlcm9TcC5hbmltYXRpb24gPSBcIklkbGVcIjtcclxuICAgICAgICBsZXQgaGVyb1NwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENoaWxkQnlOYW1lKFwiaGVyb1NwXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbilcclxuICAgICAgICBoZXJvU3Auc2tlbGV0b25EYXRhID0gdGhpcy5oZXJvX3NrZWxldG9uX2RhdGFbdGhpcy5oZXJvX3R5cGUtMV07XHJcbiAgICAgICAgaGVyb1NwLnNldEFuaW1hdGlvbigwLFwiSWRsZVwiLHRydWUpO1xyXG4gICAgICAgIC8vIGFuaW1hLmxpc3RlbmVyPW51bGw7XHJcbiAgICAgICAgaGVyb1NwLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT57XHJcbiAgICAgICAgICAgIC8vIGFuaW1hLmxpc3RlbmVyPW51bGw7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgICAgICBsZXQganVkZ2UgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICBpZihqdWRnZSA8IDAuNil7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0lkbGUnO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihqdWRnZSA8IDAuOCl7XHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJ0F0dGFjayc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICdJZGxlMic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGVyb1NwLnNldEFuaW1hdGlvbigwLG5hbWUsdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gaGVyb1NwLm5vZGUuc2NhbGUgPSAwLjQ7XHJcblxyXG5cclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9ICdMVi4nICsgaGVyb01heExldmVsO1xyXG4gICAgICAgIGlmKGlzUmVmcmVzaClcclxuICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZmlnaHROdW1cIikuZ2V0Q29tcG9uZW50KE51bWJlckxhYmVsKS5zZXRUYXJnZXQoemhhbmxpLDAuNSx0cnVlKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImZpZ2h0TnVtXCIpLmdldENvbXBvbmVudChOdW1iZXJMYWJlbCkuaW5pdCh6aGFubGksdHJ1ZSk7XHJcblxyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChoZXJvQmFzZUluZm8uSGVyb0ZyYWdtZW50KTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiaHBMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHByZXZpZXcuZ2V0Q2hpbGRCeU5hbWUoXCJkYW1hZ2VMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiZGVmZW5zZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiYXRrU3BlZWRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQoaGVyb0RhdGEuYXRrU3BlZWQsMSk7XHJcblxyXG4gICAgICAgIGxldCBza2lsbFJvb3QgPSBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwic2tpbGxSb290XCIpO1xyXG4gICAgICAgIGxldCBza2lsbE51bSA9IGhlcm9CYXNlSW5mby5Ta2lsbE51bTtcclxuICAgICAgICBmb3IobGV0IGkgPSAxO2kgPD0gNDtpKyspe1xyXG4gICAgICAgICAgICBpZihpPD1za2lsbE51bSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2tpbGwgPSBza2lsbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ta2lsbFwiICsgaSk7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHVubG9ja0xldmVsID0gIFNraWxsTGV2ZWxVbmxvY2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKGkpXHJcbiAgICAgICAgICAgICAgICBza2lsbC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fXCIrIHRoaXMuaGVyb190eXBlICtcIl9Ta2lsbF9cIiArIChpLTEpKTtcclxuICAgICAgICAgICAgICAgIHNraWxsLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICBza2lsbC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2tpbGwuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nID0gJycgKyAoSGVyb0F0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdGFyQnlIZXJvVHlwZUFuZFN0YWdlKHRoaXMuaGVyb190eXBlLGhlcm9NYXhTdGFnZSkrMSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBza2lsbFJvb3QuZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ta2lsbFwiICsgaSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhhdmVOdW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oaGVyb0Jhc2VJbmZvLkhlcm9GcmFnbWVudCk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBoZXJvQmFzZUluZm8uVW5sb2NrRnJhZ21lbnROdW07XHJcbiAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShoYXZlTnVtKTtcclxuICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwibmVlZE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwiL1wiICsgTXlUb29sLmdldENvaW5EYW53ZWkobmVlZE51bSk7XHJcbiAgICAgICAgbGV0IHVwZ3JhZGVCdG49cHJldmlldy5nZXRDaGlsZEJ5TmFtZShcInVwZ3JhZGVCdG5cIik7XHJcbiAgICAgICAgbGV0IHVubG9ja1JlZD1wcmV2aWV3LmdldENoaWxkQnlOYW1lKFwidXBncmFkZUJ0blwiKS5nZXRDaGlsZEJ5TmFtZSgncmVkJyk7XHJcbiAgICAgICAgaWYoaGF2ZU51bSA8IG5lZWROdW0pe1xyXG4gICAgICAgICAgICBwcmV2aWV3LmdldENoaWxkQnlOYW1lKFwiaGF2ZU51bVwiKS5jb2xvciA9IGNjLmNvbG9yKDI1NCw3Niw3Nik7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1cGdyYWRlQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdW5sb2NrUmVkLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcHJldmlldy5nZXRDaGlsZEJ5TmFtZShcImhhdmVOdW1cIikuY29sb3IgPSBjYy5jb2xvcigyMjIsMTk5LDE2Nik7XHJcbiAgICAgICAgICAgIHVwZ3JhZGVCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdXBncmFkZUJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgICAgICB1bmxvY2tSZWQuYWN0aXZlPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IGhlcm9CYXNlSW5mby5RdWFsaXR5O1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1bml2ZXJzYWxCdG49cHJldmlldy5nZXRDaGlsZEJ5TmFtZShcInVuaXZlcnNhbEJ0blwiKVxyXG4gICAgICAgIGxldCB3YW5ubmVnUmVkPXVuaXZlcnNhbEJ0bi5nZXRDaGlsZEJ5TmFtZSgncmVkJyk7XHJcbiAgICAgICAgaWYobWFzdGVyS2V5bnVtIDwgMSl7XHJcbiAgICAgICAgICAgIHVuaXZlcnNhbEJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHVuaXZlcnNhbEJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHdhbm5uZWdSZWQuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB1bml2ZXJzYWxCdG4uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAgICAgdW5pdmVyc2FsQnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXROdW09bmVlZE51bS1oYXZlTnVtO1xyXG4gICAgICAgICAgICBsZXQgaXNDYW49UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50SWQodGhpcy5oZXJvX3R5cGUpKT49b2Zmc2V0TnVtO1xyXG4gICAgICAgICAgICB3YW5ubmVnUmVkLmFjdGl2ZT1vZmZzZXROdW0+MCAmJiBpc0NhbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0dldEFzc2V0c1VpKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWR1Y3Rpb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuQ29pbilcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG4gICAgb25CdG5Db2luKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkNvaW4pXHJcbiAgICAgICAgfSx9KTtcclxuICAgIH1cclxuICAgIG9uQnRuR2VtKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSlcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG9uQ2xvc2VHZXRBc3NldHNCdG5DbGljaygpe1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRpcFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzaG93RXhjaGFuZ2VVaSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIik7XHJcbiAgICAgICAgZXhjaGFuZ2UuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgbGV0IGtleUlkID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlDXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUFcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcDEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKGtleUlkLDApO1xyXG4gICAgICAgIGxldCBwMiA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSksMCk7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5TbGlkZXIpLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkgKyAnLycgKyBtYXN0ZXJLZXludW07XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJJdGVtXzFcIikuYWRkQ2hpbGQocDEpO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwiSXRlbV8yXCIpLmFkZENoaWxkKHAyKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UHJldmlld0V4Y2hhbmdlVWkoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByZXZpZXdFeGNoYW5nZVwiKTtcclxuICAgICAgICBleGNoYW5nZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBsZXQga2V5SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlCXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwMSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oa2V5SWQsMCk7XHJcbiAgICAgICAgbGV0IHAyID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSwwKTtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuU2xpZGVyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcikucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSArICcvJyArIG1hc3RlcktleW51bTtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcIkl0ZW1fMVwiKS5hZGRDaGlsZChwMSk7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJJdGVtXzJcIikuYWRkQ2hpbGQocDIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2VVcFN0YXJUaXBCdG5DbGljaygpe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVwU3RhclRpcFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VXBTdGFyVGlwKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IEhNID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgaGVyb0RhdGEgPSBITS5nZXRIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG9sZEhlcm9EYXRhID0gSE0uZ2V0VGFyZ2V0SGVyb0RhdGEodGhpcy5oZXJvX3R5cGUsSE0uZ2V0SGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKSAtIDEsSE0uZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSlcclxuICAgICAgICBsZXQgc3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBsZXQgb2xkU3RhciA9IEhlcm9BdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RhckJ5SGVyb1R5cGVBbmRTdGFnZSh0aGlzLmhlcm9fdHlwZSxITS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpIC0gMSk7XHJcbiAgICAgICAgbGV0IG5pY2tuYW1lID0gSGVyb1RpdGxlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9UaXRsZVRleHRJZEJ5SGVyb1R5cGVBbmRIZXJvU3Rhcih0aGlzLmhlcm9fdHlwZSxzdGFyKTtcclxuICAgICAgICBsZXQgb2xkTmlja25hbWUgPSBIZXJvVGl0bGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb1RpdGxlVGV4dElkQnlIZXJvVHlwZUFuZEhlcm9TdGFyKHRoaXMuaGVyb190eXBlLG9sZFN0YXIpO1xyXG5cclxuICAgICAgICBsZXQgdXBTdGFyVGlwID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXBTdGFyVGlwXCIpO1xyXG4gICAgICAgIHVwU3RhclRpcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZFN0YXJcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1N0YXJfXCIgKyBvbGRTdGFyKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGROaWNrbmFtZVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQob2xkTmlja25hbWUpO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZFNraWxsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRTa2lsbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zdHJpbmcgKz0gXCJMVlwiICsgKG9sZFN0YXIgKyAxKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRIcE51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQob2xkSGVyb0RhdGEudG90YWxfaHApO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm9sZEF0a051bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5udW1iZXJGb3JtYXQob2xkSGVyb0RhdGEudG90YWxfYXR0YWNrKTtcclxuICAgICAgICB1cFN0YXJUaXAuZ2V0Q2hpbGRCeU5hbWUoXCJvbGREZWZhbmNlTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChvbGRIZXJvRGF0YS50b3RhbF9kZWZlbnNlKTtcclxuXHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fU3Rhcl9cIiArIHN0YXIpO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcIm5pY2tuYW1lXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChuaWNrbmFtZSk7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwic2tpbGxOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIkxWXCIgKyAoc3RhciArIDEpO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcImhwTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9ocCk7XHJcbiAgICAgICAgdXBTdGFyVGlwLmdldENoaWxkQnlOYW1lKFwiYXRrTnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLm51bWJlckZvcm1hdChoZXJvRGF0YS50b3RhbF9hdHRhY2spO1xyXG4gICAgICAgIHVwU3RhclRpcC5nZXRDaGlsZEJ5TmFtZShcImRlZmFuY2VOdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGhlcm9EYXRhLnRvdGFsX2RlZmVuc2UpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzbGlkZXJNb3ZlUmVzcG9uY2Uoc2xpZGVyOmNjLlNsaWRlcil7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIik7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBzbGlkZXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoc2xpZGVyLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkgKyAnLycgKyBtYXN0ZXJLZXludW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJldmlld1NsaWRlck1vdmVSZXNwb25jZShzbGlkZXI6Y2MuU2xpZGVyKXtcclxuICAgICAgICBsZXQgZXhjaGFuZ2UgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3RXhjaGFuZ2VcIik7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBzbGlkZXIucHJvZ3Jlc3M7XHJcbiAgICAgICAgZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAoc2xpZGVyLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKS50b0ZpeGVkKCkgKyAnLycgKyBtYXN0ZXJLZXludW07XHJcbiAgICB9XHJcblxyXG4gICAgb25Ta2lsbENsaWNrKGUsc2tpbGxTbG90Om51bWJlcil7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkhlcm9Ta2lsbCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChIZXJvU2tpbGxVaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChIZXJvU2tpbGxVaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUsc2tpbGxTbG90KTtcclxuICAgICAgICB9LH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25FcXVpcG1lbnRDbGljayhlLGluZGV4U3RyOnN0cmluZyl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6KOF5aSH5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICBsZXQgdHlwZT1wYXJzZUludChpbmRleFN0cik7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuEX+atpuWZqOagj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiLsembhF/miqTnlLLmoI/ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4Rf6aG56ZO+5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6Iux6ZuEX+mei+WtkOagj+eCueWHu+asoeaVsCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVxdWlwSW5mbz1IZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJFcXVpcG1lbnQodGhpcy5oZXJvX3R5cGUsdHlwZSk7Ly/mmK/lkKbluKbkuIrkuoboo4XlpIdcclxuICAgICAgICBpZihlcXVpcEluZm8pe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkVxdWlwSW5mbyxVSUxheWVyTGV2ZWwuVHdvLHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGVkOihub2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KEVxdWlwSW5mb1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSxlcXVpcEluZm8sUHJvcEFjdGlvbi5Vc2Use1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wX2lkOiBlcXVpcEluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BfbnVtOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wX3ByaWNlOjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BfY29zdF9pZDowLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dFcXVpcEluZm9VaSh0aGlzLmhlcm9fdHlwZSxlcXVpcEluZm8sUHJvcEFjdGlvbi5Vc2Use1xyXG4gICAgICAgICAgICAvLyAgICAgcHJvcF9pZDogZXF1aXBJbmZvLFxyXG4gICAgICAgICAgICAvLyAgICAgcHJvcF9udW06IDEsXHJcbiAgICAgICAgICAgIC8vICAgICBwcm9wX3ByaWNlOjAsXHJcbiAgICAgICAgICAgIC8vICAgICBwcm9wX2Nvc3RfaWQ6MCxcclxuICAgICAgICAgICAgLy8gfSxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RXF1aXBFeGNoYW5nZVVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH19LGVxdWlwSW5mbyx0aGlzLmhlcm9fdHlwZSx0eXBlKTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIG9uVGFrZU9mZkNsaWNrKCl7XHJcblxyXG4gICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ohLHoo4Xngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIGlmKEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1F1aWNrVW5sb2FkKHRoaXMuaGVyb190eXBlLHRydWUpKXtcclxuICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2haaGFubGlTaG93KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICBpZihvbGRDb21iYXQgIT0gbmV3Q29tYmF0KVxyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbldlYXJDbGljaygpe1xyXG4gICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBvbGREYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG5cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuIDplK7nqb/miLTngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4Tngrnlh7vkuIDplK7nqb/miLTnmoTmrKHmlbArdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGlmKEVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGVja1F1aWNrV2Vhcih0aGlzLmhlcm9fdHlwZSx0cnVlKSl7XHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoWmhhbmxpU2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBpZihvbGRDb21iYXQgIT0gbmV3Q29tYmF0KVxyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93Q29tYmF0Q2hhbmdlRWZmZWN0KG9sZENvbWJhdCxuZXdDb21iYXQsb2xkRGF0YSxuZXdEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxldmVsQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAgU3RhdGUuTGV2ZWw7XHJcbiAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMF8xXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5yb2xlX3VpLmdldFNwcml0ZUZyYW1lKFwiSGVyb19UYWJfQnRuXzFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFyQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAgU3RhdGUuU3RhcjtcclxuICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKGZhbHNlKTtcclxuICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImxldmVsXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJsZXZlbEljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnJvbGVfdWkuZ2V0U3ByaXRlRnJhbWUoXCJIZXJvX1RhYl9CdG5fMFwiKTtcclxuICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzdGFySWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZV91aS5nZXRTcHJpdGVGcmFtZShcIkhlcm9fVGFiX0J0bl8xXzFcIik7XHJcbiAgICB9XHJcbiAgICAvLyDljYfnuqfmjInpkq5cclxuICAgIG9uVXBncmFkZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyDlpoLmnpzpgJrov4flhbPljaHmnKrovr7liLDpmZDliLbliJnpo5jlrZfmj5DnpLpcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heExldmVsKHRoaXMuaGVyb190eXBlKSl7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMjAwMjQpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YXJMdj1IZXJvQXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXJCeUhlcm9UeXBlQW5kU3RhZ2UodGhpcy5oZXJvX3R5cGUsSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN6Iux6ZuE5pif57qnXCIrc3Rhckx2KTtcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPj0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5oZXJvX3N0YWdlTGlzdFtzdGFyTHZdKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShcIuW3sui+vuWIsOW9k+WJjeaYn+e6p+acgOmrmOetiee6p++8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZmluaXNoTGV2ZWwgPSBMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgbGV0IG5lZWRMZXZlbCA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxMaW1pdChIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGlmKGZpbmlzaExldmVsIDwgbmVlZExldmVsKXtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDcyMDAwMik7XHJcbiAgICAgICAgICAgIHN0cj1zdHIucmVwbGFjZSgnficsbmVlZExldmVsLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKHN0cik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5aaC5p6c6YeR5biB5LiN6Laz5YiZ5pi+56S66I635Y+W6LWE5rqQ55WM6Z2iXHJcbiAgICAgICAgbGV0IGNvaW5IYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKTtcclxuICAgICAgICBsZXQgY29pbk5lZWROdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvc3RDb2luKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgaWYoY29pbkhhdmVOdW0gPCBjb2luTmVlZE51bSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0dldEFzc2V0c1VpKCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4TljYfnuqfnvLrlsJHph5HluIHnmoTmrKHmlbApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZ2VtSGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKTtcclxuICAgICAgICBsZXQgZ2VtTmVlZE51bSA9IExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdEdlbShIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGlmKGdlbUhhdmVOdW0gPCBnZW1OZWVkTnVtKXtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiLsembhOWNh+e6p+e8uuWwkemSu+efs+eahOasoeaVsCk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguQ29pblBvcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gU3RhdGUuTGV2ZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBzdGFyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0VWkoUHJvcElkLkdlbSk7XHJcbiAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCFQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sLWNvaW5OZWVkTnVtKSB8fCAhUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLWdlbU5lZWROdW0pKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiaPotLnlpLHotKVcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgbmV3Q29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERlZXBIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDb21iYXRDaGFuZ2VFZmZlY3Qob2xkQ29tYmF0LG5ld0NvbWJhdCxvbGREYXRhLG5ld0RhdGEpO1xyXG4gICAgICAgICAgICBUYXNrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVtaXRUYXNrKFRhc2tJdGVtLuWNh+e6pzHmrKHoi7Hpm4QpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfTGV2ZWwpO1xyXG4gICAgICAgICAgICB0aGlzLmluZm9SZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgLy8gVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1NoZW5nSmkwKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdDFcIiksY2MudjIoMCwwKSk7XHJcbiAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dTaGVuZ0ppMSh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIikuZ2V0Q2hpbGRCeU5hbWUoXCJlZmZlY3QyXCIpLGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RWZmZWN0RGlhbG9nKEVmZmVjdFBhdGguSGVyb1VwZ3JhZGUwLGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdDFcIiksXCJMZXZlbFVwX0JhY2tcIik7XHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dFZmZlY3REaWFsb2coRWZmZWN0UGF0aC5IZXJvVXBncmFkZTAsYm90dG9tLmdldENoaWxkQnlOYW1lKFwiZWZmZWN0MlwiKSxcIkxldmVsVXBfRnJvbnRcIik7XHJcbiAgICAgICAgICAgIC8vIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcInJvbGVfdXBncmFkZV8wXCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoKTtcclxuICAgICAgICAgICAgLy8gYm90dG9tLmdldENoaWxkQnlOYW1lKFwicm9sZV91cGdyYWRlXzFcIikuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM6Iux6ZuE55qE5Y2H57qn5qyh5pWwK3RoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDljYfpmLbmjInpkq5cclxuICAgIG9uVXBTdGFnZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaGF2ZU51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0ZyYWdtZW50KHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgbGV0IG5lZWROdW0gPSBIZXJvUXVhbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGVicmlzQnlIZXJvUXVhbGl0eUFuZFN0YWdlKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKSxIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgIGlmKGhhdmVOdW0gPCBuZWVkTnVtKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5zaG93R2V0QXNzZXRzVWkoKTtcclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiLsembhOWNh+aYn+e8uuWwkeeijueJh+eahOasoeaVsCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4TljYfmmJ/mmK/nvLrlsJHnoo7niYfnmoTmrKHmlbArdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdldEFzc2V0c1RpcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHZXRBc3NldHNVaSkuaW5pdERhdGEoR2V0QXNzZXRzVHlwZS5IZXJvKTtcclxuICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSksLW5lZWROdW0pKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiaPotLnlpLHotKVcIik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVyb1N0YWdlKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgbmV3RGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXQsbmV3Q29tYmF0LG9sZERhdGEsbmV3RGF0YSk7XHJcbiAgICAgICAgICAgIFRhc2tNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW1pdFRhc2soVGFza0l0ZW0u5Y2H5pifMeasoeiLsembhCk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuI3lkIzoi7Hpm4TnmoTljYfmmJ/mrKHmlbArdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQWR2YW5jZWQpO1xyXG4gICAgICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9TdGFnZSh0aGlzLmhlcm9fdHlwZSkgJSA2ID09IDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VXBTdGFyVGlwKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YWdlID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvU3RhZ2UodGhpcy5oZXJvX3R5cGUpICUgNjtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKS5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJzdGFyRWZmZWN0XCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbikuYW5pbWF0aW9uID0gXCJTaGVuZ1hpbmdcIiArIHN0YWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5LiH6IO96ZKl5YyZ5oyJ6ZKuXHJcbiAgICBvbk1hc3RlcktleUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaGVyb1F1YWxpdHkgPSBIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgbGV0IG1hc3RlcktleW51bSA9IDA7XHJcbiAgICAgICAgbGV0IHRleHRJZCA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgLy8gQlxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qik7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTY7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTKTtcclxuICAgICAgICAgICAgICAgIHRleHRJZCA9IDEyMDAxODtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobWFzdGVyS2V5bnVtIDwgMSl7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQodGV4dElkKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93RXhjaGFuZ2VVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgICAvLyDpooTop4jkuIfog73pkqXljJnmjInpkq5cclxuICAgICBvblByZXZpZXdNYXN0ZXJLZXlCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIGxldCB0ZXh0SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE1O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIC8vIEFcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUEpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE2O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE3O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0SWQgPSAxMjAwMTg7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAgdGV4dElkID0gMTIwMDE5O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1hc3RlcktleW51bSA8IDEpe1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRleHRJZCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvd1ByZXZpZXdFeGNoYW5nZVVpKCk7XHJcbiAgICB9XHJcbiAgICAvLyDop6PplIHmjInpkq5cclxuICAgIG9uVW5sb2NrQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBoYXZlTnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICBsZXQgbmVlZE51bSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRVbmxvY2tGcmFnbWVudE51bSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgaWYoaGF2ZU51bSA8IG5lZWROdW0pe1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dHZXRBc3NldHNVaSgpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkdldEFzc2V0c1RpcCxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChHZXRBc3NldHNVaSkuaW5pdERhdGEoR2V0QXNzZXRzVHlwZS5IZXJvKTtcclxuICAgICAgICAgICAgfX0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5MZXZlbDtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSksLW5lZWROdW0pO1xyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkSGVybyh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlN0b3JlSGVyb1Nob3dVaSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFN0b3JlSGVyb1Nob3dVaSkuaW5pdERhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIH19KTsgXHJcbiAgICB9XHJcbiAgICAvLyDnoo7niYfovazljJbmjInpkq5cclxuICAgIG9uRXhDaGFuZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIik7XHJcbiAgICAgICAgbGV0IGhlcm9RdWFsaXR5ID0gSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBtYXN0ZXJLZXludW0gPSAwO1xyXG4gICAgICAgIGxldCBrZXlJZCA9IDA7XHJcbiAgICAgICAgc3dpdGNoKGhlcm9RdWFsaXR5KXtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgLy8gQ1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Qyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5Q1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIC8vIEJcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUIpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlBXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5Uyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5U1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTUyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5U1NcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1NcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVNTUyk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG51bSA9IE51bWJlcigoZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpKTtcclxuICAgICAgICBpZihudW0gPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShrZXlJZCwtbnVtKTtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSksbnVtKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkVG90YWwoRm9sbG93X1R5cGUu5LiN5ZCM6Iux6ZuE6YCa6L+H5LiH6IO956KO54mH6L2s5o2i6I635b6X55qE56KO54mH5oC75pWwICsgdGhpcy5oZXJvX3R5cGUsbnVtKTtcclxuICAgICAgICBsZXQgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9GcmFnbWVudCh0aGlzLmhlcm9fdHlwZSksbnVtKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4h+iDveeijueJh+i9rOWMluS4jeWQjOiLsembhOasoeaVsCArIHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgLy8g6aKE6KeI56KO54mH6L2s5o2i5oyJ6ZKuXHJcbiAgICBvblByZXZpZXdFeENoYW5nZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwcmV2aWV3RXhjaGFuZ2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJldmlld0V4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBsZXQga2V5SWQgPSAwO1xyXG4gICAgICAgIHN3aXRjaChoZXJvUXVhbGl0eSl7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIC8vIENcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleUMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleUNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGtleUlkID0gUHJvcElkLkhlcm9NYXN0ZXJLZXlCXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgLy8gQVxyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5QSk7XHJcbiAgICAgICAgICAgICAgICBrZXlJZCA9IFByb3BJZC5IZXJvTWFzdGVyS2V5QVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgICAgIG1hc3RlcktleW51bSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuSGVyb01hc3RlcktleVMpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgLy8gU1NTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTU1MpO1xyXG4gICAgICAgICAgICAgICAga2V5SWQgPSBQcm9wSWQuSGVyb01hc3RlcktleVNTU1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBudW0gPSBOdW1iZXIoKGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwic2xpZGVyXCIpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgKiBtYXN0ZXJLZXludW0pLnRvRml4ZWQoKSk7XHJcbiAgICAgICAgaWYobnVtID09IDApIHJldHVybjtcclxuICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oa2V5SWQsLW51bSk7XHJcbiAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLG51bSk7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRnJhZ21lbnQodGhpcy5oZXJvX3R5cGUpLG51bSk7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvdGFsKEZvbGxvd19UeXBlLuS4jeWQjOiLsembhOmAmui/h+S4h+iDveeijueJh+i9rOaNouiOt+W+l+eahOeijueJh+aAu+aVsCArIHRoaXMuaGVyb190eXBlLG51bSk7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGl0ZW0pO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7kuIfog73noo7niYfovazljJbkuI3lkIzoi7Hpm4TmrKHmlbAgKyB0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3UmVmcmVzaCgpO1xyXG4gICAgfVxyXG4gICAgLy8g5aKe5Yqg6L2s5o2i56KO54mH5oyJ6ZKuXHJcbiAgICBvbkNoYW5nZUV4Y2hhbmdlQnRuQ2xpY2soZSxudW06bnVtYmVyKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIG51bSA9IE51bWJlcihudW0pO1xyXG4gICAgICAgIGxldCBleGNoYW5nZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImV4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2xpZGVyID0gZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcik7XHJcbiAgICAgICAgc2xpZGVyLnByb2dyZXNzID0gICgoc2xpZGVyLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKSArICgxICogbnVtKSkvbWFzdGVyS2V5bnVtO1xyXG4gICAgICAgIGlmKHNsaWRlci5wcm9ncmVzcyA+IDEpIHNsaWRlci5wcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgaWYoc2xpZGVyLnByb2dyZXNzIDwgMCkgc2xpZGVyLnByb2dyZXNzID0gMDtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gc2xpZGVyLnByb2dyZXNzO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpICsgJy8nICsgbWFzdGVyS2V5bnVtO1xyXG4gICAgfVxyXG4gICAgb25QcmV2aWV3Q2hhbmdlRXhjaGFuZ2VCdG5DbGljayhlLG51bTpudW1iZXIpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbnVtID0gTnVtYmVyKG51bSk7XHJcbiAgICAgICAgbGV0IGV4Y2hhbmdlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJldmlld0V4Y2hhbmdlXCIpO1xyXG4gICAgICAgIGxldCBoZXJvUXVhbGl0eSA9IEhlcm9CYXNlSW5mb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgbWFzdGVyS2V5bnVtID0gMDtcclxuICAgICAgICBzd2l0Y2goaGVyb1F1YWxpdHkpe1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAvLyBDXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlDKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAvLyBCXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlCKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAvLyBBXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlBKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAvLyBTXHJcbiAgICAgICAgICAgICAgICBtYXN0ZXJLZXludW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkhlcm9NYXN0ZXJLZXlTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAvLyBTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1MpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIC8vIFNTU1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyS2V5bnVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5IZXJvTWFzdGVyS2V5U1NTKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2xpZGVyID0gZXhjaGFuZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJzbGlkZXJcIikuZ2V0Q29tcG9uZW50KGNjLlNsaWRlcik7XHJcbiAgICAgICAgc2xpZGVyLnByb2dyZXNzID0gICgoc2xpZGVyLnByb2dyZXNzICogbWFzdGVyS2V5bnVtKSArICgxICogbnVtKSkvbWFzdGVyS2V5bnVtO1xyXG4gICAgICAgIGlmKHNsaWRlci5wcm9ncmVzcyA+IDEpIHNsaWRlci5wcm9ncmVzcyA9IDE7XHJcbiAgICAgICAgaWYoc2xpZGVyLnByb2dyZXNzIDwgMCkgc2xpZGVyLnByb2dyZXNzID0gMDtcclxuICAgICAgICBleGNoYW5nZS5nZXRDaGlsZEJ5TmFtZShcInNsaWRlclwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gc2xpZGVyLnByb2dyZXNzO1xyXG4gICAgICAgIGV4Y2hhbmdlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gKHNsaWRlci5wcm9ncmVzcyAqIG1hc3RlcktleW51bSkudG9GaXhlZCgpICsgJy8nICsgbWFzdGVyS2V5bnVtO1xyXG4gICAgfVxyXG4gICAgLy8g5YWz6Zet56KO54mH6L2s5o2i55WM6Z2iXHJcbiAgICBvbkNsb3NlRXhjaGFuZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZXhjaGFuZ2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyDlhbPpl63noo7niYfovazmjaLnlYzpnaJcclxuICAgIG9uQ2xvc2VQcmV2aWV3RXhjaGFuZ2VCdG5DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJldmlld0V4Y2hhbmdlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8g5YmN5b6A5ZWG5bqX5oyJ6ZKuXHJcbiAgICAvLyBvbkdvU2hvcEJ0bkNsaWNrKCl7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5DaXR5O1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuanVtb0FuZFNob3dVaSgpO1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsVWlEaWFsb2coVUlMYXllckxldmVsLk9uZSk7XHJcbiAgICAvLyB9XHJcbiAgICBvbkNsb3NlUmVkdWN0aW9uQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlZHVjdGlvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIOaYvuekuui/mOWOn+aMiemSrlxyXG4gICAgb25TaG93UmVkdWN0aW9uQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCByZWR1Y3Rpb24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWR1Y3Rpb25cIilcclxuICAgICAgICBsZXQgc3VtID0gTGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROb3dMZXZlbEFsbENvc3RDb2luKEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SGVyb0xldmVsKHRoaXMuaGVyb190eXBlKSk7XHJcbiAgICAgICAgbGV0IGl0ZW1Sb290ID0gcmVkdWN0aW9uLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIik7XHJcbiAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXQoUHJvcElkLkNvaW4sc3VtWzBdLFByb3BBY3Rpb24uTG9vayk7XHJcbiAgICAgICAgaWYoc3VtWzFdID09IDApe1xyXG4gICAgICAgICAgICBpdGVtUm9vdC5jaGlsZHJlblsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbVJvb3QuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KFByb3ApLmluaXQoUHJvcElkLkdlbSxzdW1bMV0sUHJvcEFjdGlvbi5Mb29rKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVkdWN0aW9uLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgcmVkdWN0aW9uLmdldENoaWxkQnlOYW1lKFwicmljaFRleHRcIikuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KS5zdHJpbmcgPSBMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwOTgpO1xyXG4gICAgfVxyXG4gICAgLy8g6L+Y5Y6f5oyJ6ZKuXHJcbiAgICBvblJlZHVjdGlvbkJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkdlbSwtMjAwKSl7XHJcbiAgICAgICAgICAgIGxldCBvbGRDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdW0gPSBMZXZlbFVwTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5vd0xldmVsQWxsQ29zdENvaW4oSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvTGV2ZWwodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLHN1bVswXSk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLHN1bVsxXSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKFtQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLHN1bVswXSksUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHN1bVsxXSldKTtcclxuICAgICAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXNldEhlcm9MdmVsKHRoaXMuaGVyb190eXBlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgICAgICBsZXQgbmV3RGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0NvbWJhdENoYW5nZUVmZmVjdChvbGRDb21iYXQsbmV3Q29tYmF0LG9sZERhdGEsbmV3RGF0YSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWR1Y3Rpb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5mb1JlZnJlc2goKTtcclxuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MZXZlbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cHN0YXJSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuS4jeWQjOiLsembhOi/mOWOn+eahOasoeaVsCArIHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVkdWN0aW9uXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm9uQ2xvc2VSZWR1Y3Rpb25CdG5DbGljaygpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dHZXRBc3NldHNVaSgpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkNvaW5Qb3AsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmZvUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnN0YXRlID09IFN0YXRlLkxldmVsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwc3RhclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KENvaW5Qb3ApLmluaXRVaShQcm9wSWQuR2VtKVxyXG4gICAgICAgICAgICB9LH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkF0dHJpYnV0ZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5p+l55yL6Iux6ZuE5bGe5oCn6K+m5oOFKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93QXR0cmlidXRlVWkobnVsbCx0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5BdHRyaWJ1dGUsVUlMYXllckxldmVsLlR3byx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIC8vIHVpTm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXQodWlBY3Rpb24pO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEF0cnJpYnV0ZVVpKS5pbml0SGVyb1R5cGUodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25QcmV2aWV3QXR0cmlidXRlQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mn6XnnIvoi7Hpm4TlsZ7mgKfor6bmg4UpO1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dBdHRyaWJ1dGVVaShudWxsLHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkF0dHJpYnV0ZSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgLy8gdWlOb2RlLmdldENvbXBvbmVudChBdHJyaWJ1dGVVaSkuaW5pdCh1aUFjdGlvbik7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXQobnVsbCk7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQXRycmlidXRlVWkpLmluaXRQcmV2aWV3SGVyb1R5cGUodGhpcy5oZXJvX3R5cGUsSGVyb0Jhc2VJbmZvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1heFN0YWdlKHRoaXMuaGVyb190eXBlKSxIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWF4TGV2ZWwodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgICAgICB9LH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuRXhjbHVzaXZlRXF1aXBtZW50Q2xpY2soKXtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIui/meS4quaMiemSruiiq+eCueWHu+S6hlwiKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkV4Y2x1c2l2ZUluZm9VaSxVSUxheWVyTGV2ZWwuVHdvLHtcclxuICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlSW5mb1VpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVJbmZvVWkpLmluaXREYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQnRuUGV0Q2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4TnlYzpnaLlrqDnianmoI/ngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7oi7Hpm4Rf54G15a6g5qCP54K55Ye75qyh5pWwKTtcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQodGhpcy5oZXJvX3R5cGUpID09IDApe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlBldExpc3QsVUlMYXllckxldmVsLlR3byx7XHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUGV0RXhjaGFuZ2VVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChQZXRFeGNoYW5nZVVpKS5pbml0RGF0YShIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFdlYXJQZXQodGhpcy5oZXJvX3R5cGUpLHRoaXMuaGVyb190eXBlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5QZXRJbmZvLFVJTGF5ZXJMZXZlbC5Ud28se1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZWQ6KHVpTm9kZSk9PntcclxuICAgICAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFBldEluZm9VaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChQZXRJbmZvVWkpLmluaXREYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQZXRFeGNoYW5nZVVpKHtvbkNsb3NlOigpPT57XHJcbiAgICAgICAgLy8gICAgIC8vIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgLy8gfX0sSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvRGF0YSh0aGlzLmhlcm9fdHlwZSkucGV0X2luZm8sdGhpcy5oZXJvX3R5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgb25CdG5FeGNsdXNpdmVFcXVpcEFkZENsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RXhjbHVzaXZlV2VhcG9uc1N0cmVuZ3RoZW5pbmdVaSh7XHJcbiAgICAgICAgLy8gICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LHRoaXMuaGVyb190eXBlLHRydWUpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRXhjbHVzaXZlU3RyZW5ndGhlbmluZyxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpKS5pbml0KHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmluaXRVaSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChFeGNsdXNpdmVXZWFwb25zU3RyZW5ndGhlbmluZ1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSx0cnVlKTtcclxuICAgICAgICB9LH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25CdG5FeGNsdXNpdmVFcXVpcFN0cmVuZ3RoZW5pbmdVaSgpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYWFhXCIpXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RXhjbHVzaXZlV2VhcG9uc1VpKHtcclxuICAgICAgICAvLyAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguRXhjbHVzaXZlLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KEV4Y2x1c2l2ZVdlYXBvbnNVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5pbml0VWkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoRXhjbHVzaXZlV2VhcG9uc1VpKS5pbml0RGF0YSh0aGlzLmhlcm9fdHlwZSk7XHJcbiAgICAgICAgfSx9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tFeGNsdXNpdmVXZWFwb24oKXtcclxuICAgICAgICBpZihIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9MZXZlbCh0aGlzLmhlcm9fdHlwZSkgPD0gMTAwKXtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMzAwMDUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0Fycm93QnRuKGUsZGlyOm51bWJlcil7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBkaXIgPSBOdW1iZXIoZGlyKTtcclxuICAgICAgICBpZih0aGlzLnNxcnRMaXN0ID09IG51bGwpe1xyXG4gICAgICAgICAgICBsZXQgaGVyb1R5cGUgPSB0aGlzLmhlcm9fdHlwZSArIGRpcjtcclxuICAgICAgICAgICAgaWYoaGVyb1R5cGUgPD0gSGVyb19UeXBlLk5VTEwpIGhlcm9UeXBlID0gSGVyb19UeXBlLkhlcm9fTnVtIC0gMTtcclxuICAgICAgICAgICAgaWYoaGVyb1R5cGUgPj0gSGVyb19UeXBlLkhlcm9fTnVtKSBoZXJvVHlwZSA9IEhlcm9fVHlwZS5OVUxMICsgMTtcclxuICAgICAgICAgICAgdGhpcy5pbml0RGF0YShoZXJvVHlwZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuc3FydExpc3QuaW5kZXhPZihIZXJvQmFzZUluZm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkhlcm9CYXNlSW5mbyh0aGlzLmhlcm9fdHlwZSkpO1xyXG4gICAgICAgICAgICBpbmRleCArPSBkaXI7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ID49IHRoaXMuc3FydExpc3QubGVuZ3RoKSBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGlmKGluZGV4IDwgMCkgaW5kZXggPSB0aGlzLnNxcnRMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERhdGEodGhpcy5zcXJ0TGlzdFtpbmRleF0uSGVyb19JRCx0aGlzLnNxcnRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguSGVyb0dyb3d0aCxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgIC8vICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFJvbGVVaSkuaW5pdCh7XHJcbiAgICAgICAgLy8gICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5vblJlZnJlc2goKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgIHVpTm9kZS5nZXRDb21wb25lbnQoUm9sZVVpKS5pbml0RGF0YShoZXJvVHlwZSk7XHJcbiAgICAgICAgLy8gfSx9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRIZXJvQXR0cmlidXRlSWQoaGVyb1R5cGU6bnVtYmVyLGhlcm9MZXZlbDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gaGVyb1R5cGUgKiAxMDAwMCArIGhlcm9MZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXRIZXJvUXVhbGl0eVRleHRDb2xvcihxdWFsaXR5Om51bWJlcik6Y2MuQ29sb3J7XHJcbiAgICAvLyAgICAgbGV0IGNvbG9yPWNjLmNvbG9yKCk7XHJcbiAgICAvLyAgICAgc3dpdGNoKHF1YWxpdHkpe1xyXG4gICAgLy8gICAgICAgICBjYXNlIDI6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgMTp7XHJcbiAgICAvLyAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigxMTMsIDIyOSwgMTMyKTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIDM6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgNDp7XHJcbiAgICAvLyAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigxMDUsIDE4MywgMjU1KTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIDU6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgNjp7XHJcbiAgICAvLyAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyMjYsIDEyNiwgMjU1KTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIDc6XHJcbiAgICAvLyAgICAgICAgIGNhc2UgODp7XHJcbiAgICAvLyAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDE5MywgNzQpO1xyXG4gICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgOTpcclxuICAgIC8vICAgICAgICAgY2FzZSAxMDp7XHJcbiAgICAvLyAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDc0LCA3NCk7XHJcbiAgICAvLyAgICAgICAgIH1icmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSAxMTpcclxuICAgIC8vICAgICAgICAgY2FzZSAxMjp7XHJcbiAgICAvLyAgICAgICAgICAgICBjb2xvcj1jYy5jb2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICByZXR1cm4gY29sb3I7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXBvcnRIZXJvTGlzdCgpO1xyXG4gICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0odHJ1ZSk7XHJcbiAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5nZXRDb21wb25lbnQoSG9tZSkucmVmcmVzaFRvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssSGVyb01hbmFnZXIuZ2V0UmVkVHlwZUJ5SGVyb1R5cGUodGhpcy5oZXJvX3R5cGUpKTtcclxuICAgIH1cclxuXHJcbn0iXX0=