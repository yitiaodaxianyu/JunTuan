"use strict";
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
        console.log("显示装备");
        if (equipInfo) {
            console.log("显示装备2");
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
            console.log("显示装备3");
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