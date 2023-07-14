"use strict";
cc._RF.push(module, '37b1dO9Wq9CTaU9cVP7hni7', 'EquipInfoUi');
// Scripts/Equipment/Ui/EquipInfoUi.ts

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
var Constants_1 = require("../../Constants");
var EquipmentAttribute_1 = require("../../Equipment/Data/EquipmentAttribute");
var EquipmentManager_1 = require("../../Equipment/EquipmentManager");
var GameManager_1 = require("../../GameManager");
var HeroManager_1 = require("../../Hero/Data/HeroManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var TutorailsManager_1 = require("../../Tutorials/TutorailsManager");
var UIComponent_1 = require("../../UI/UIComponent");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var EquipmentMerge_1 = require("../Data/EquipmentMerge");
var EquipItem_1 = require("./EquipItem");
var MergeUi_1 = require("./MergeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EquipInfoUi = /** @class */ (function (_super) {
    __extends(EquipInfoUi, _super);
    function EquipInfoUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.equip_id = null;
        _this.prop_action = PropConfig_1.PropAction.Buy;
        _this.buy_callback = null;
        _this.use_callback = null;
        _this.prop_data = null;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.useRoot = null;
        // @property(cc.Node)
        // Weapon_Text: cc.Node[] = [];//各种颜色的图片
        // @property(cc.Node)
        // txt: cc.Node[] = [];//文字
        // @property(cc.SpriteFrame)
        // Spriteliang: cc.SpriteFrame[] = [];//图片精灵图亮起
        // @property(cc.SpriteFrame)
        // Spritelhui: cc.SpriteFrame[] = [];//图片精灵图灰色
        _this.attText = null; //攻击力
        _this.defenseText = null; //防御力
        _this.hpText = null; //生命值
        // @property(cc.Node)
        // level: cc.Node = null//等级
        // @property(cc.Node)
        // coin: cc.Node = null//当前金币
        // @property(cc.Node)
        // zoncoin: cc.Node = null//总金币
        // @property(cc.Node)
        // levelBtn: cc.Node = null//升级按钮
        // @property(cc.Node)
        // Coin: cc.Node = null//金币框
        _this.btnMerge = null; //合成框
        _this.tip = null; //商店
        _this.bbg = []; //背景图
        _this.bbbg = []; //标题框图
        return _this;
    }
    EquipInfoUi.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    EquipInfoUi.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    EquipInfoUi.prototype.start = function () {
        if (TutorailsManager_1.default.getInstance().isShowTutorials(225) == false && TutorailsManager_1.default.getInstance().isShowTutorials(227)) {
            //找到武器按钮
            var btnUpgrade = this.node.getChildByName('useRoot').getChildByName('btnmoveup');
            var wordPos = btnUpgrade.parent.convertToWorldSpaceAR(btnUpgrade.getPosition());
            var localPos = cc.find('Canvas/Ui_Root').convertToNodeSpaceAR(wordPos);
            TutorailsManager_1.default.getInstance().showTutorials(227, null, function () {
                TutorailsManager_1.default.getInstance().saveTutorials(226);
                TutorailsManager_1.default.getInstance().saveTutorials(227);
            }, true, null, localPos);
        }
    };
    EquipInfoUi.prototype.initData = function (heroType, equipId, pa, pd, buyCallback, useCallback) {
        this.hero_type = heroType;
        this.prop_data = pd;
        this.buy_callback = buyCallback;
        this.use_callback = useCallback;
        this.prop_action = pa;
        this.useRoot.active = this.prop_action == PropConfig_1.PropAction.Use;
        if (this.prop_action == PropConfig_1.PropAction.Use) {
            this.node.getChildByName("bbg").y = -19;
            this.node.getChildByName("btnClose").y = 260;
            this.node.getChildByName("btnClose").x = 282;
            this.node.getChildByName("bbg").height = 570;
            this.node.getChildByName("bbg").width = 580;
            // this.node.getChildByName("btnClose").active=true
            this.node.getChildByName("bbg").getComponent(cc.Sprite).spriteFrame = this.bbg[0];
            this.node.getChildByName("bbbg").getComponent(cc.Sprite).spriteFrame = this.bbbg[0];
        }
        else {
            this.node.getChildByName("bbg").y = 58;
            this.node.getChildByName("bbg").height = 600;
            this.node.getChildByName("bbg").width = 600;
            this.node.getChildByName("btnClose").y = 320;
            this.node.getChildByName("btnClose").x = 271;
            // this.node.getChildByName("btnClose").active=false
            this.node.getChildByName("bbg").getComponent(cc.Sprite).spriteFrame = this.bbg[1];
            this.node.getChildByName("bbbg").getComponent(cc.Sprite).spriteFrame = this.bbbg[1];
        }
        // console.log("+++++++++")
        this.refreshInfo(equipId);
    };
    EquipInfoUi.prototype.refreshInfo = function (equipId) {
        // console.log("--------",equipInfo)
        this.tip.active = false;
        this.equip_id = equipId;
        //管理器
        var LM = LanguageManager_1.default.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        var EAM = EquipmentAttribute_1.EquipmentAttributeManager.getInstance();
        //信息展示
        //标题
        //装备Item
        if (this.node.getChildByName('propRoot').children.length > 0) {
            this.node.getChildByName('propRoot').children[0].destroy();
        }
        var item = EquipmentManager_1.EquipmentManager.getInstance().getEquipNodeById(this.equip_id, PropConfig_1.PropAction.Null, this.hero_type);
        this.node.getChildByName('propRoot').addChild(item);
        //名称
        var jsonItem = Item_1.ItemManager.getInstance().getJsonItem(this.equip_id);
        var propName = this.node.getChildByName('propName');
        propName.getComponent(cc.Label).string = "[" + PM.getPropQualityName(jsonItem.Quality) + "]" + LM.getStrByTextId(jsonItem.NameTextId);
        propName.color = PM.getPropQualityTextColor(jsonItem.Quality);
        var Outlinecolor = [new cc.Color(39, 35, 28), new cc.Color(29, 63, 27), new cc.Color(25, 55, 88), new cc.Color(66, 37, 96), new cc.Color(62, 32, 0), new cc.Color(79, 16, 15)];
        // console.log("______",jsonItem.Quality)
        propName.getComponent(cc.LabelOutline).color = Outlinecolor[(jsonItem.Quality)];
        //类型名称
        var zhuangbeiPos = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id); //装备位置
        this.node.getChildByName('propType').getComponent(TextLanguage_1.default).setTextId(180000 + zhuangbeiPos);
        var kuang = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getStage(this.equip_id); //品质框
        var red = this.btnMerge.getChildByName('red');
        var isRed = false;
        if (kuang >= 31) {
            this.btnMerge.active = false;
            isRed = false;
        }
        else {
            this.btnMerge.active = true;
            if (!EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getIsMaxStage(equipId)) {
                isRed = EquipmentManager_1.EquipmentManager.getInstance().checkAEquipMerge(EquipmentMerge_1.EquipmentMergeManager.getInstance().getTargetEquipment_id(equipId), []);
            }
        }
        red.active = isRed;
        // let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_info.equip_id);
        // for (let Qualityindex = 0; Qualityindex < this.Spritelhui.length; Qualityindex++) {
        //     // let id=this.equip_info.equip_id-jsonItem.Quality
        //     let id=EquipmentAttributeManager.getID(zhuangbeiPos,Qualityindex+1)
        //     this.txt[Qualityindex].getComponent(TextLanguage).setTextId(190000+EquipmentAttributeManager.getInstance().getExtraAttributeType(id))
        //     this.txt[Qualityindex].getComponent(TextLanguage).setReplaceValue("~",""+EquipmentAttributeManager.getInstance().getExtraAttributeValue(id))
        //     if(Qualityindex<=jsonItem.Quality){
        //         let txtcolor=[new cc.Color(244, 240, 230),new cc.Color(154, 255, 149),new cc.Color(176, 216, 255),new cc.Color(215, 191, 255),new cc.Color(255, 239, 151),new cc.Color(255, 117, 113)]
        //         let Outlinecolor=[new cc.Color(84, 69, 53),new cc.Color(18, 53, 25),new cc.Color(33, 46, 85),new cc.Color(58, 40, 92),new cc.Color(57, 40, 28),new cc.Color(93, 37, 34)]
        //         this.txt[Qualityindex].color=txtcolor[Qualityindex]//.toHEX(txtcolor[Qualityindex])
        //         this.txt[Qualityindex].getComponent(cc.LabelOutline).color=Outlinecolor[Qualityindex]//.toHEX(Outlinecolor[Qualityindex])
        //         // this.txt[Qualityindex].getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //         this.Weapon_Text[Qualityindex].getComponent(cc.Sprite).spriteFrame=this.Spriteliang[Qualityindex]
        //     }else{
        //         let txtcolor="#ACACAC"
        //         let Outlinecolor="#3B3B3B"
        //         this.txt[Qualityindex].color=new cc.Color(172, 172, 172)//.toHEX(txtcolor)
        //         this.txt[Qualityindex].getComponent(cc.LabelOutline).color=new cc.Color(59, 59, 59)//.toHEX(Outlinecolor)
        //         // this.txt[Qualityindex].getComponent(cc.Label).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //         this.Weapon_Text[Qualityindex].getComponent(cc.Sprite).spriteFrame=this.Spritelhui[Qualityindex]
        //     }
        // }
        this.PropertyUpdate();
    };
    EquipInfoUi.prototype.PropertyUpdate = function () {
        //战力数
        this.node.getChildByName('zhanliNum').getComponent(cc.Label).string = "" + EquipmentManager_1.EquipmentManager.getInstance().getEquipZhanLi(this.equip_id);
        var attack = EquipmentManager_1.EquipmentManager.getInstance().getAttributes(this.equip_id);
        // //攻击力
        var attTextnumber = attack[0];
        this.attText.active = true;
        this.defenseText.active = true;
        this.hpText.active = true;
        if (attTextnumber <= 0) {
            this.attText.active = false;
        }
        this.attText.getChildByName("number").getComponent(cc.Label).string = "" + attTextnumber;
        // //防御力
        var defenseTextnumber = attack[1];
        if (defenseTextnumber <= 0) {
            this.defenseText.active = false;
        }
        this.defenseText.getChildByName("number").getComponent(cc.Label).string = "" + defenseTextnumber;
        // //生命值
        var hpTextnumber = attack[2];
        if (hpTextnumber <= 0) {
            this.hpText.active = false;
        }
        this.hpText.getChildByName("number").getComponent(cc.Label).string = "" + hpTextnumber;
        // let levelnumber=this.equip_info.equip_level
        // if(this.equip_info.equip_level==0){
        //     levelnumber=1
        // }
        // this.level.getComponent(cc.Label).string="(lv."+levelnumber+")"
        // if(this.equip_info.equip_level>=100){
        //     // return
        //     this.Coin.active=false
        //     this.levelBtn.getChildByName("label").getComponent(TextLanguage).setTextId(120024)
        //     this.levelBtn.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        // }else{
        //     this.levelBtn.getChildByName("label").getComponent(TextLanguage).setTextId(100018)
        //     this.Coin.active=true
        //     // this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //     //升级装备的金币
        //     let zoncoin=EquipmentLevelUpCostManager.getInstance().getCoinCost(levelnumber)//升级所需要的金币
        //     //现在的金币
        //     let coin=PropManager.getInstance().getPropNum(PropId.Coin)
        //     let levelcoin=EquipmentLevelUpCostManager.getInstance().getLevelLimit(levelnumber)//升级所需要的关卡//100101
        //     // this.coin.getComponent(cc.Label).string=""+MyTool.getCoinDanwei(coin)
        //     if(LevelManager.getInstance().finish_level<levelcoin){
        //         //变灰
        //         this.levelBtn.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //         this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        //     }else{
        //         //变亮
        //         this.levelBtn.getChildByName("label").getComponent(TextLanguage).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //         this.levelBtn.getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        //         if(coin<zoncoin){
        //             this.coin.color=cc.color(254, 76, 76)
        //             //变红
        //         }else{
        //             this.coin.color=cc.color(222, 199, 166)
        //             //可升级
        //         }
        //     }
        //     this.zoncoin.getComponent(cc.Label).string="/"+MyTool.getCoinDanwei(zoncoin)
        // }
        this.node.getChildByName('propRoot').children[0].getComponent(EquipItem_1.default).refreshData(); //刷新武器框
        //通关数未达到升级条件
        // console.log("装备属性:",)
    };
    EquipInfoUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.prop_action == PropConfig_1.PropAction.Use && this.use_callback) {
            this.use_callback();
        }
        _super.prototype.onClose.call(this);
    };
    // clickBtnYes(){
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
    //     if(this.prop_action==PropAction.Buy){
    //         if(PropManager.getInstance().changePropNum(this.prop_data.prop_cost_id,-this.prop_data.prop_price)){
    //             let info=EquipmentManager.getInstance().addEquipment(this.equip_info.equip_id);
    //             let item=EquipmentManager.getInstance().getEquipNodeByInfo(info);
    //             GameManager.getInstance().showGetTip(item);
    //             GameManager.getInstance().refreshGemShow();
    //             if(this.buy_callback){
    //                 this.buy_callback();
    //             }
    //             super.onClose();
    //         }else{
    //             GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
    //         }
    //     }
    // }
    EquipInfoUi.prototype.clickBtnReplace = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var type = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id);
        UIManager_1.UIManager.getInstance().showEquipExchangeUi({ onRefresh: function (info) {
                _this.refreshInfo(info);
                _super.prototype.onRefresh.call(_this, info);
            } }, this.equip_id, this.hero_type, type);
    };
    EquipInfoUi.prototype.clickBtnUnload = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //EquipmentManager.getInstance().unloadWearEquipment(this.equip_id);
        var oldCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var oldData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        HeroManager_1.HeroManager.getInstance().unloadWearEquipment(this.hero_type, EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id));
        var newCombat = HeroManager_1.HeroManager.getInstance().getHeroZhanli(this.hero_type);
        var newData = HeroManager_1.HeroManager.getInstance().getDeepHeroData(this.hero_type);
        if (oldCombat != newCombat)
            UIManager_1.UIManager.getInstance().showCombatChangeEffect(oldCombat, newCombat, oldData, newData);
        if (this.use_callback) {
            this.use_callback();
        }
        _super.prototype.onClose.call(this);
    };
    EquipInfoUi.prototype.clickBtnMerge = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var type = EquipmentAttribute_1.EquipmentAttributeManager.getInstance().getEquipmentPosition(this.equip_id);
        // UIManager.getInstance().showEquipSyntheticUi({onRefresh:(info:EquipInfo)=>{
        //     this.refreshInfo(info);
        //     super.onRefresh(info);
        // }},this.equip_info,this.equip_info.hero_type,type);
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.EquipSynthetic, UIConfig_1.UILayerLevel.Three, { onCompleted: function (uiNode) {
                uiNode.getComponent(MergeUi_1.default).initData(_this.equip_id, _this.hero_type, type, _this.node);
                // uiNode.getComponent(MergeUi).init(null);
            }, });
        // super.onClose();
    };
    // clickBtnMoveup(){//升级
    //     if(this.equip_info.equip_level>=100){
    //         return
    //     }
    //     //升级装备的金币
    //     let zoncoin=EquipmentLevelUpCostManager.getInstance().getCoinCost(this.equip_info.equip_level)//升级所需要的金币
    //     //现在的金币
    //     let coin=PropManager.getInstance().getPropNum(PropId.Coin)
    //     let levelcoin=EquipmentLevelUpCostManager.getInstance().getLevelLimit(this.equip_info.equip_level)//升级所需要的关卡//100101
    //     if(LevelManager.getInstance().finish_level<levelcoin){
    //         GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100101))//通关数未达到升级条件
    //     }else{
    //         if(coin<zoncoin){
    //             // 跳商店   前往商城
    //             // console.log("前往商城")
    //             // this.tip.active=true
    //             UIManager.getInstance().showUiDialog(UIPath.CoinPop,UILayerLevel.Three,{onCompleted:(uiNode)=> {
    //                 uiNode.getComponent(CoinPop).init({
    //                     onClose:()=>{
    //                         this.PropertyUpdate()
    //                     }
    //                 })
    //                 uiNode.getComponent(CoinPop).initUi(PropId.Coin)
    //             },});
    //         }else{
    //             // 确认升级
    //             //减钱
    //             PropManager.getInstance().changePropNum(PropId.Coin,-zoncoin)
    //             let num=this.equip_info.equip_level+1
    //             this.equip_info.equip_level=num
    //             EquipmentManager.getInstance().Findonechangelevel(this.equip_info);
    //             this.use_callback();
    //             this.refreshInfo(this.equip_info)
    //             // console.log("______",this.equip_info.equip_level)
    //             //把信息同步到文件中
    //             //升等级
    //             //存本地
    //         }
    //     }
    // }
    EquipInfoUi.prototype.onBtntip = function () {
        this.tip.active = false;
        GameManager_1.default.getInstance().game_to_home = Constants_1.Go_Type.City;
        GameManager_1.default.getInstance().jumoAndShowUi();
        UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
    };
    EquipInfoUi.prototype.onBtntipClose = function () {
        this.tip.active = false;
    };
    __decorate([
        property(cc.Node)
    ], EquipInfoUi.prototype, "useRoot", void 0);
    __decorate([
        property(cc.Node)
    ], EquipInfoUi.prototype, "attText", void 0);
    __decorate([
        property(cc.Node)
    ], EquipInfoUi.prototype, "defenseText", void 0);
    __decorate([
        property(cc.Node)
    ], EquipInfoUi.prototype, "hpText", void 0);
    __decorate([
        property(cc.Node)
    ], EquipInfoUi.prototype, "btnMerge", void 0);
    __decorate([
        property(cc.Node)
    ], EquipInfoUi.prototype, "tip", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], EquipInfoUi.prototype, "bbg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], EquipInfoUi.prototype, "bbbg", void 0);
    EquipInfoUi = __decorate([
        ccclass
    ], EquipInfoUi);
    return EquipInfoUi;
}(UIComponent_1.default));
exports.default = EquipInfoUi;

cc._RF.pop();