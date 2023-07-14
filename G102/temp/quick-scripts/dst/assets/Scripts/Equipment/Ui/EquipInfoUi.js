
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/EquipInfoUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcRXF1aXBJbmZvVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQTBDO0FBQzFDLDhFQUFvRjtBQUNwRixxRUFBcUU7QUFDckUsaURBQTRDO0FBQzVDLDJEQUEwRDtBQUMxRCx5REFBdUQ7QUFDdkQsdUVBQWtFO0FBQ2xFLGlFQUE0RDtBQUM1RCw2Q0FBbUQ7QUFDbkQsb0RBQTZEO0FBQzdELHNEQUFxRDtBQUNyRCw2REFBd0Q7QUFDeEQscUVBQWdFO0FBQ2hFLG9EQUErQztBQUMvQyw4Q0FBeUQ7QUFDekQsZ0RBQStDO0FBQy9DLHlEQUErRDtBQUMvRCx5Q0FBb0M7QUFDcEMscUNBQWdDO0FBRzFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFXO0lBQXBEO1FBQUEscUVBc1hDO1FBcFhHLGNBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsaUJBQVcsR0FBWSx1QkFBVSxDQUFDLEdBQUcsQ0FBQztRQUN0QyxrQkFBWSxHQUFVLElBQUksQ0FBQztRQUMzQixrQkFBWSxHQUFVLElBQUksQ0FBQztRQUMzQixlQUFTLEdBQVUsSUFBSSxDQUFDO1FBQ3hCLGVBQVMsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQztRQUduQyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBRXhCLHFCQUFxQjtRQUNyQix3Q0FBd0M7UUFDeEMscUJBQXFCO1FBQ3JCLDJCQUEyQjtRQUMzQiw0QkFBNEI7UUFDNUIsK0NBQStDO1FBQy9DLDRCQUE0QjtRQUM1Qiw4Q0FBOEM7UUFJOUMsYUFBTyxHQUFZLElBQUksQ0FBQSxDQUFBLEtBQUs7UUFFNUIsaUJBQVcsR0FBWSxJQUFJLENBQUEsQ0FBQSxLQUFLO1FBRWhDLFlBQU0sR0FBWSxJQUFJLENBQUEsQ0FBQSxL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QUQvQixPQUFPO09BQ2EsV0FBVyxDQXNYL0I7SUFBRCxrQkFBQztDQXRYRCxBQXNYQyxDQXRYd0MscUJBQVcsR0FzWG5EO2tCQXRYb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBHb19UeXBlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0VxdWlwbWVudC9EYXRhL0VxdWlwbWVudEF0dHJpYnV0ZVwiO1xyXG5pbXBvcnQgeyAgRXF1aXBtZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9FcXVpcG1lbnQvRXF1aXBtZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvX1R5cGUgfSBmcm9tIFwiLi4vLi4vSGVyby9HYW1lL0hlcm9Db25maWdcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IHsgUHJvcEFjdGlvbiwgUHJvcERhdGEgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi8uLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEVxdWlwbWVudE1lcmdlTWFuYWdlciB9IGZyb20gXCIuLi9EYXRhL0VxdWlwbWVudE1lcmdlXCI7XHJcbmltcG9ydCBFcXVpcEl0ZW0gZnJvbSBcIi4vRXF1aXBJdGVtXCI7XHJcbmltcG9ydCBNZXJnZVVpIGZyb20gXCIuL01lcmdlVWlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVxdWlwSW5mb1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIGVxdWlwX2lkOm51bWJlcj1udWxsO1xyXG4gICAgcHJvcF9hY3Rpb246UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkJ1eTtcclxuICAgIGJ1eV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgdXNlX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBwcm9wX2RhdGE6UHJvcERhdGE9bnVsbDtcclxuICAgIGhlcm9fdHlwZTpIZXJvX1R5cGU9SGVyb19UeXBlLk5VTEw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB1c2VSb290OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIC8vIFdlYXBvbl9UZXh0OiBjYy5Ob2RlW10gPSBbXTsvL+WQhOenjeminOiJsueahOWbvueJh1xyXG4gICAgLy8gQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICAvLyB0eHQ6IGNjLk5vZGVbXSA9IFtdOy8v5paH5a2XXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICAvLyBTcHJpdGVsaWFuZzogY2MuU3ByaXRlRnJhbWVbXSA9IFtdOy8v5Zu+54mH57K+54G15Zu+5Lqu6LW3XHJcbiAgICAvLyBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICAvLyBTcHJpdGVsaHVpOiBjYy5TcHJpdGVGcmFtZVtdID0gW107Ly/lm77niYfnsr7ngbXlm77ngbDoibJcclxuXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYXR0VGV4dDogY2MuTm9kZSA9IG51bGwvL+aUu+WHu+WKm1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBkZWZlbnNlVGV4dDogY2MuTm9kZSA9IG51bGwvL+mYsuW+oeWKm1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBocFRleHQ6IGNjLk5vZGUgPSBudWxsLy/nlJ/lkb3lgLxcclxuXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIC8vIGxldmVsOiBjYy5Ob2RlID0gbnVsbC8v562J57qnXHJcblxyXG4gICAgXHJcbiAgICAvLyBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIC8vIGNvaW46IGNjLk5vZGUgPSBudWxsLy/lvZPliY3ph5HluIFcclxuICAgIFxyXG4gICAgLy8gQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICAvLyB6b25jb2luOiBjYy5Ob2RlID0gbnVsbC8v5oC76YeR5biBXHJcblxyXG4gICAgICAgIFxyXG4gICAgLy8gQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICAvLyBsZXZlbEJ0bjogY2MuTm9kZSA9IG51bGwvL+WNh+e6p+aMiemSrlxyXG4gICAgLy8gQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICAvLyBDb2luOiBjYy5Ob2RlID0gbnVsbC8v6YeR5biB5qGGXHJcbiAgICBcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYnRuTWVyZ2U6IGNjLk5vZGUgPSBudWxsLy/lkIjmiJDmoYZcclxuXHJcbiAgICAgICAgXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRpcDogY2MuTm9kZSA9IG51bGwvL+WVhuW6l1xyXG5cclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBiYmc6IGNjLlNwcml0ZUZyYW1lW10gPSBbXS8v6IOM5pmv5Zu+XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxyXG4gICAgYmJiZzogY2MuU3ByaXRlRnJhbWVbXSA9IFtdLy/moIfpopjmoYblm75cclxuICAgIFxyXG4gICAgcHVibGljIGFkZEJ1eUxpc3RlbihjYWxsYmFjazpGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuYnV5X2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRVc2VMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnVzZV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmKFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjI1KT09ZmFsc2UmJlR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5pc1Nob3dUdXRvcmlhbHMoMjI3KSl7XHJcbiAgICAgICAgICAgIC8v5om+5Yiw5q2m5Zmo5oyJ6ZKuXHJcbiAgICAgICAgICAgIGxldCBidG5VcGdyYWRlPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndXNlUm9vdCcpLmdldENoaWxkQnlOYW1lKCdidG5tb3ZldXAnKTtcclxuICAgICAgICAgICAgbGV0IHdvcmRQb3M9YnRuVXBncmFkZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGJ0blVwZ3JhZGUuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbFBvcz1jYy5maW5kKCdDYW52YXMvVWlfUm9vdCcpLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmRQb3MpO1xyXG4gICAgICAgICAgICBUdXRvcmFpbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1R1dG9yaWFscygyMjcsbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVUdXRvcmlhbHMoMjI2KTtcclxuICAgICAgICAgICAgICAgIFR1dG9yYWlsc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlVHV0b3JpYWxzKDIyNyk7XHJcbiAgICAgICAgICAgIH0sdHJ1ZSxudWxsLGxvY2FsUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERhdGEoaGVyb1R5cGU6SGVyb19UeXBlLGVxdWlwSWQ6bnVtYmVyLHBhOlByb3BBY3Rpb24scGQ6UHJvcERhdGEsYnV5Q2FsbGJhY2s6RnVuY3Rpb24sdXNlQ2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuaGVyb190eXBlPWhlcm9UeXBlO1xyXG4gICAgICAgIHRoaXMucHJvcF9kYXRhPXBkO1xyXG4gICAgICAgIHRoaXMuYnV5X2NhbGxiYWNrPWJ1eUNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMudXNlX2NhbGxiYWNrPXVzZUNhbGxiYWNrOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wcm9wX2FjdGlvbj1wYTtcclxuICAgICAgICB0aGlzLnVzZVJvb3QuYWN0aXZlPXRoaXMucHJvcF9hY3Rpb249PVByb3BBY3Rpb24uVXNlO1xyXG4gICAgICAgIGlmKHRoaXMucHJvcF9hY3Rpb249PVByb3BBY3Rpb24uVXNlKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmJnXCIpLnk9LTE5XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkNsb3NlXCIpLnk9MjYwXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bkNsb3NlXCIpLng9MjgyXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS5oZWlnaHQ9NTcwXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS53aWR0aD01ODBcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuQ2xvc2VcIikuYWN0aXZlPXRydWVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmJnWzBdXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiYmdcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5iYmJnWzBdXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS55PTU4XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS5oZWlnaHQ9NjAwXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS53aWR0aD02MDBcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuQ2xvc2VcIikueT0zMjBcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuQ2xvc2VcIikueD0yNzFcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuQ2xvc2VcIikuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJiZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLmJiZ1sxXVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYmJnXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMuYmJiZ1sxXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIisrKysrKysrK1wiKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaEluZm8oZXF1aXBJZClcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoSW5mbyhlcXVpcElkOm51bWJlcil7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLVwiLGVxdWlwSW5mbylcclxuICAgICAgICB0aGlzLnRpcC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB0aGlzLmVxdWlwX2lkPWVxdWlwSWQ7XHJcbiAgICAgICAgLy/nrqHnkIblmahcclxuICAgICAgICBsZXQgTE09TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IFBNPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IEVBTT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy/kv6Hmga/lsZXnpLpcclxuICAgICAgICAvL+agh+mimFxyXG4gICAgICAgIC8v6KOF5aSHSXRlbVxyXG4gICAgICAgIGlmKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcFJvb3QnKS5jaGlsZHJlbi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcFJvb3QnKS5jaGlsZHJlblswXS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW09RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwTm9kZUJ5SWQodGhpcy5lcXVpcF9pZCxQcm9wQWN0aW9uLk51bGwsdGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcFJvb3QnKS5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAvL+WQjeensFxyXG4gICAgICAgIGxldCBqc29uSXRlbT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25JdGVtKHRoaXMuZXF1aXBfaWQpO1xyXG4gICAgICAgIGxldCBwcm9wTmFtZT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Byb3BOYW1lJyk7XHJcbiAgICAgICAgcHJvcE5hbWUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJbXCIrUE0uZ2V0UHJvcFF1YWxpdHlOYW1lKGpzb25JdGVtLlF1YWxpdHkpK1wiXVwiK0xNLmdldFN0ckJ5VGV4dElkKGpzb25JdGVtLk5hbWVUZXh0SWQpO1xyXG4gICAgICAgIHByb3BOYW1lLmNvbG9yPVBNLmdldFByb3BRdWFsaXR5VGV4dENvbG9yKGpzb25JdGVtLlF1YWxpdHkpO1xyXG4gICAgICAgIGxldCBPdXRsaW5lY29sb3I9W25ldyBjYy5Db2xvcigzOSwgMzUsIDI4KSxuZXcgY2MuQ29sb3IoMjksIDYzLCAyNyksbmV3IGNjLkNvbG9yKDI1LCA1NSwgODgpLG5ldyBjYy5Db2xvcig2NiwgMzcsIDk2KSxuZXcgY2MuQ29sb3IoNjIsIDMyLCAwKSxuZXcgY2MuQ29sb3IoNzksIDE2LCAxNSldXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX19cIixqc29uSXRlbS5RdWFsaXR5KVxyXG4gICAgICAgIHByb3BOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yPU91dGxpbmVjb2xvclsoanNvbkl0ZW0uUXVhbGl0eSldXHJcblxyXG4gICAgICAgIC8v57G75Z6L5ZCN56ewXHJcbiAgICAgICAgbGV0IHpodWFuZ2JlaVBvcz1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBtZW50UG9zaXRpb24odGhpcy5lcXVpcF9pZCkvL+ijheWkh+S9jee9rlxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcFR5cGUnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTgwMDAwK3podWFuZ2JlaVBvcylcclxuICAgICAgICBsZXQga3Vhbmc9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YWdlKHRoaXMuZXF1aXBfaWQpLy/lk4HotKjmoYZcclxuICAgICAgICBsZXQgcmVkPXRoaXMuYnRuTWVyZ2UuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpO1xyXG4gICAgICAgIGxldCBpc1JlZD1mYWxzZTtcclxuICAgICAgICBpZihrdWFuZz49MzEpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk1lcmdlLmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgICAgICBpc1JlZD1mYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5idG5NZXJnZS5hY3RpdmU9dHJ1ZSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZighRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzTWF4U3RhZ2UoZXF1aXBJZCkpe1xyXG4gICAgICAgICAgICAgICAgaXNSZWQ9RXF1aXBtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoZWNrQUVxdWlwTWVyZ2UoRXF1aXBtZW50TWVyZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VGFyZ2V0RXF1aXBtZW50X2lkKGVxdWlwSWQpLFtdKTtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZWQuYWN0aXZlPWlzUmVkO1xyXG4gICAgICAgIC8vIGxldCB0eXBlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRQb3NpdGlvbih0aGlzLmVxdWlwX2luZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIC8vIGZvciAobGV0IFF1YWxpdHlpbmRleCA9IDA7IFF1YWxpdHlpbmRleCA8IHRoaXMuU3ByaXRlbGh1aS5sZW5ndGg7IFF1YWxpdHlpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICAgIC8vIGxldCBpZD10aGlzLmVxdWlwX2luZm8uZXF1aXBfaWQtanNvbkl0ZW0uUXVhbGl0eVxyXG4gICAgICAgIC8vICAgICBsZXQgaWQ9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJRCh6aHVhbmdiZWlQb3MsUXVhbGl0eWluZGV4KzEpXHJcbiAgICAgICAgLy8gICAgIHRoaXMudHh0W1F1YWxpdHlpbmRleF0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDE5MDAwMCtFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXh0cmFBdHRyaWJ1dGVUeXBlKGlkKSlcclxuXHJcbiAgICAgICAgLy8gICAgIHRoaXMudHh0W1F1YWxpdHlpbmRleF0uZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKFwiflwiLFwiXCIrRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEV4dHJhQXR0cmlidXRlVmFsdWUoaWQpKVxyXG5cclxuICAgICAgICAvLyAgICAgaWYoUXVhbGl0eWluZGV4PD1qc29uSXRlbS5RdWFsaXR5KXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCB0eHRjb2xvcj1bbmV3IGNjLkNvbG9yKDI0NCwgMjQwLCAyMzApLG5ldyBjYy5Db2xvcigxNTQsIDI1NSwgMTQ5KSxuZXcgY2MuQ29sb3IoMTc2LCAyMTYsIDI1NSksbmV3IGNjLkNvbG9yKDIxNSwgMTkxLCAyNTUpLG5ldyBjYy5Db2xvcigyNTUsIDIzOSwgMTUxKSxuZXcgY2MuQ29sb3IoMjU1LCAxMTcsIDExMyldXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgT3V0bGluZWNvbG9yPVtuZXcgY2MuQ29sb3IoODQsIDY5LCA1MyksbmV3IGNjLkNvbG9yKDE4LCA1MywgMjUpLG5ldyBjYy5Db2xvcigzMywgNDYsIDg1KSxuZXcgY2MuQ29sb3IoNTgsIDQwLCA5MiksbmV3IGNjLkNvbG9yKDU3LCA0MCwgMjgpLG5ldyBjYy5Db2xvcig5MywgMzcsIDM0KV1cclxuICAgICAgICAvLyAgICAgICAgIHRoaXMudHh0W1F1YWxpdHlpbmRleF0uY29sb3I9dHh0Y29sb3JbUXVhbGl0eWluZGV4XS8vLnRvSEVYKHR4dGNvbG9yW1F1YWxpdHlpbmRleF0pXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnR4dFtRdWFsaXR5aW5kZXhdLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yPU91dGxpbmVjb2xvcltRdWFsaXR5aW5kZXhdLy8udG9IRVgoT3V0bGluZWNvbG9yW1F1YWxpdHlpbmRleF0pXHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLnR4dFtRdWFsaXR5aW5kZXhdLmdldENvbXBvbmVudChjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuV2VhcG9uX1RleHRbUXVhbGl0eWluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLlNwcml0ZWxpYW5nW1F1YWxpdHlpbmRleF1cclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgdHh0Y29sb3I9XCIjQUNBQ0FDXCJcclxuICAgICAgICAvLyAgICAgICAgIGxldCBPdXRsaW5lY29sb3I9XCIjM0IzQjNCXCJcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMudHh0W1F1YWxpdHlpbmRleF0uY29sb3I9bmV3IGNjLkNvbG9yKDE3MiwgMTcyLCAxNzIpLy8udG9IRVgodHh0Y29sb3IpXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnR4dFtRdWFsaXR5aW5kZXhdLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yPW5ldyBjYy5Db2xvcig1OSwgNTksIDU5KS8vLnRvSEVYKE91dGxpbmVjb2xvcilcclxuICAgICAgICAvLyAgICAgICAgIC8vIHRoaXMudHh0W1F1YWxpdHlpbmRleF0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zZXRNYXRlcmlhbCgwLGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuV2VhcG9uX1RleHRbUXVhbGl0eWluZGV4XS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLlNwcml0ZWxodWlbUXVhbGl0eWluZGV4XVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICB0aGlzLlByb3BlcnR5VXBkYXRlKClcclxuXHJcbiAgICB9XHJcbiAgICBQcm9wZXJ0eVVwZGF0ZSgpe1xyXG5cclxuICAgICAgICAvL+aImOWKm+aVsFxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnemhhbmxpTnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RXF1aXBaaGFuTGkodGhpcy5lcXVpcF9pZCk7XHJcbiAgICAgICAgbGV0IGF0dGFjaz1FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QXR0cmlidXRlcyh0aGlzLmVxdWlwX2lkKVxyXG4gICAgICAgIC8vIC8v5pS75Ye75YqbXHJcbiAgICAgICAgbGV0IGF0dFRleHRudW1iZXI9YXR0YWNrWzBdXHJcbiAgICAgICAgdGhpcy5hdHRUZXh0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgdGhpcy5kZWZlbnNlVGV4dC5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIHRoaXMuaHBUZXh0LmFjdGl2ZT10cnVlXHJcbiAgICAgICAgaWYoYXR0VGV4dG51bWJlcjw9MCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXR0VGV4dC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hdHRUZXh0LmdldENoaWxkQnlOYW1lKFwibnVtYmVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrYXR0VGV4dG51bWJlclxyXG4gICAgICAgIC8vIC8v6Ziy5b6h5YqbXHJcbiAgICAgICAgbGV0IGRlZmVuc2VUZXh0bnVtYmVyPWF0dGFja1sxXVxyXG4gICAgICAgIGlmKGRlZmVuc2VUZXh0bnVtYmVyPD0wKXtcclxuICAgICAgICAgICAgdGhpcy5kZWZlbnNlVGV4dC5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZWZlbnNlVGV4dC5nZXRDaGlsZEJ5TmFtZShcIm51bWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK2RlZmVuc2VUZXh0bnVtYmVyXHJcbiAgICAgICAgLy8gLy/nlJ/lkb3lgLxcclxuICAgICAgICBsZXQgaHBUZXh0bnVtYmVyPWF0dGFja1syXVxyXG4gICAgICAgIGlmKGhwVGV4dG51bWJlcjw9MCl7XHJcbiAgICAgICAgICAgIHRoaXMuaHBUZXh0LmFjdGl2ZT1mYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhwVGV4dC5nZXRDaGlsZEJ5TmFtZShcIm51bWJlclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK2hwVGV4dG51bWJlclxyXG5cclxuICAgICAgICAvLyBsZXQgbGV2ZWxudW1iZXI9dGhpcy5lcXVpcF9pbmZvLmVxdWlwX2xldmVsXHJcbiAgICAgICAgLy8gaWYodGhpcy5lcXVpcF9pbmZvLmVxdWlwX2xldmVsPT0wKXtcclxuICAgICAgICAvLyAgICAgbGV2ZWxudW1iZXI9MVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLmxldmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiKGx2LlwiK2xldmVsbnVtYmVyK1wiKVwiXHJcblxyXG5cclxuICAgICAgICAvLyBpZih0aGlzLmVxdWlwX2luZm8uZXF1aXBfbGV2ZWw+PTEwMCl7XHJcbiAgICAgICAgLy8gICAgIC8vIHJldHVyblxyXG4gICAgICAgIC8vICAgICB0aGlzLkNvaW4uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgLy8gICAgIHRoaXMubGV2ZWxCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoMTIwMDI0KVxyXG4gICAgICAgIC8vICAgICB0aGlzLmxldmVsQnRuLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxldmVsQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5sZXZlbEJ0bi5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMTgpXHJcbiAgICAgICAgLy8gICAgIHRoaXMuQ29pbi5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIC8vICAgICAvLyB0aGlzLmxldmVsQnRuLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIC8v5Y2H57qn6KOF5aSH55qE6YeR5biBXHJcbiAgICAgICAgLy8gICAgIGxldCB6b25jb2luPUVxdWlwbWVudExldmVsVXBDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvaW5Db3N0KGxldmVsbnVtYmVyKS8v5Y2H57qn5omA6ZyA6KaB55qE6YeR5biBXHJcbiAgICAgICAgLy8gICAgIC8v546w5Zyo55qE6YeR5biBXHJcbiAgICAgICAgLy8gICAgIGxldCBjb2luPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuQ29pbilcclxuICAgICAgICAvLyAgICAgbGV0IGxldmVsY29pbj1FcXVpcG1lbnRMZXZlbFVwQ29zdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRMZXZlbExpbWl0KGxldmVsbnVtYmVyKS8v5Y2H57qn5omA6ZyA6KaB55qE5YWz5Y2hLy8xMDAxMDFcclxuXHJcbiAgICAgICAgLy8gICAgIC8vIHRoaXMuY29pbi5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK015VG9vbC5nZXRDb2luRGFud2VpKGNvaW4pXHJcblxyXG4gICAgICAgIC8vICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8bGV2ZWxjb2luKXtcclxuICAgICAgICAvLyAgICAgICAgIC8v5Y+Y54GwXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmxldmVsQnRuLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5sZXZlbEJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgLy/lj5jkuq5cclxuICAgICAgICAvLyAgICAgICAgIHRoaXMubGV2ZWxCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5sZXZlbEJ0bi5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYoY29pbjx6b25jb2luKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNvaW4uY29sb3I9Y2MuY29sb3IoMjU0LCA3NiwgNzYpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy/lj5jnuqJcclxuICAgICAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY29pbi5jb2xvcj1jYy5jb2xvcigyMjIsIDE5OSwgMTY2KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8v5Y+v5Y2H57qnXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgdGhpcy56b25jb2luLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiL1wiK015VG9vbC5nZXRDb2luRGFud2VpKHpvbmNvaW4pXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgncHJvcFJvb3QnKS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoRXF1aXBJdGVtKS5yZWZyZXNoRGF0YSgpLy/liLfmlrDmrablmajmoYZcclxuLy/pgJrlhbPmlbDmnKrovr7liLDljYfnuqfmnaHku7ZcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuijheWkh+WxnuaApzpcIiwpXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wX2FjdGlvbj09UHJvcEFjdGlvbi5Vc2UmJnRoaXMudXNlX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy51c2VfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsaWNrQnRuWWVzKCl7XHJcbiAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgIC8vICAgICBpZih0aGlzLnByb3BfYWN0aW9uPT1Qcm9wQWN0aW9uLkJ1eSl7XHJcbiAgICAvLyAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLnByb3BfZGF0YS5wcm9wX2Nvc3RfaWQsLXRoaXMucHJvcF9kYXRhLnByb3BfcHJpY2UpKXtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBpbmZvPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRFcXVpcG1lbnQodGhpcy5lcXVpcF9pbmZvLmVxdWlwX2lkKTtcclxuICAgIC8vICAgICAgICAgICAgIGxldCBpdGVtPUVxdWlwbWVudE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcE5vZGVCeUluZm8oaW5mbyk7XHJcbiAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dHZXRUaXAoaXRlbSk7XHJcbiAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZih0aGlzLmJ1eV9jYWxsYmFjayl7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5idXlfY2FsbGJhY2soKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA0MSkpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBjbGlja0J0blJlcGxhY2UoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCB0eXBlPUVxdWlwbWVudEF0dHJpYnV0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRFcXVpcG1lbnRQb3NpdGlvbih0aGlzLmVxdWlwX2lkKTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RXF1aXBFeGNoYW5nZVVpKHtvblJlZnJlc2g6KGluZm86bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hJbmZvKGluZm8pO1xyXG4gICAgICAgICAgICBzdXBlci5vblJlZnJlc2goaW5mbyk7XHJcbiAgICAgICAgfX0sdGhpcy5lcXVpcF9pZCx0aGlzLmhlcm9fdHlwZSx0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blVubG9hZCgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy9FcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkudW5sb2FkV2VhckVxdWlwbWVudCh0aGlzLmVxdWlwX2lkKTtcclxuICAgICAgICBsZXQgb2xkQ29tYmF0ID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvWmhhbmxpKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBsZXQgb2xkRGF0YSA9IEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcEhlcm9EYXRhKHRoaXMuaGVyb190eXBlKTtcclxuICAgICAgICBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLnVubG9hZFdlYXJFcXVpcG1lbnQodGhpcy5oZXJvX3R5cGUsRXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHRoaXMuZXF1aXBfaWQpKVxyXG4gICAgICAgIGxldCBuZXdDb21iYXQgPSBIZXJvTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhlcm9aaGFubGkodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gSGVyb01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwSGVyb0RhdGEodGhpcy5oZXJvX3R5cGUpO1xyXG4gICAgICAgIGlmKG9sZENvbWJhdCAhPSBuZXdDb21iYXQpXHJcbiAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dDb21iYXRDaGFuZ2VFZmZlY3Qob2xkQ29tYmF0LG5ld0NvbWJhdCxvbGREYXRhLG5ld0RhdGEpO1xyXG4gICAgICAgIGlmKHRoaXMudXNlX2NhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy51c2VfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTWVyZ2UoKXsvL+WQiOaIkFxyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgbGV0IHR5cGU9RXF1aXBtZW50QXR0cmlidXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVxdWlwbWVudFBvc2l0aW9uKHRoaXMuZXF1aXBfaWQpO1xyXG4gICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dFcXVpcFN5bnRoZXRpY1VpKHtvblJlZnJlc2g6KGluZm86RXF1aXBJbmZvKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJlZnJlc2hJbmZvKGluZm8pO1xyXG4gICAgICAgIC8vICAgICBzdXBlci5vblJlZnJlc2goaW5mbyk7XHJcbiAgICAgICAgLy8gfX0sdGhpcy5lcXVpcF9pbmZvLHRoaXMuZXF1aXBfaW5mby5oZXJvX3R5cGUsdHlwZSk7XHJcblxyXG5cclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkVxdWlwU3ludGhldGljLFVJTGF5ZXJMZXZlbC5UaHJlZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoTWVyZ2VVaSkuaW5pdERhdGEodGhpcy5lcXVpcF9pZCx0aGlzLmhlcm9fdHlwZSx0eXBlLHRoaXMubm9kZSlcclxuICAgICAgICAgICAgLy8gdWlOb2RlLmdldENvbXBvbmVudChNZXJnZVVpKS5pbml0KG51bGwpO1xyXG4gICAgICAgIH0sfSk7XHJcbiAgICAgICAgLy8gc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsaWNrQnRuTW92ZXVwKCl7Ly/ljYfnuqdcclxuICAgIC8vICAgICBpZih0aGlzLmVxdWlwX2luZm8uZXF1aXBfbGV2ZWw+PTEwMCl7XHJcbiAgICAvLyAgICAgICAgIHJldHVyblxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvL+WNh+e6p+ijheWkh+eahOmHkeW4gVxyXG4gICAgLy8gICAgIGxldCB6b25jb2luPUVxdWlwbWVudExldmVsVXBDb3N0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENvaW5Db3N0KHRoaXMuZXF1aXBfaW5mby5lcXVpcF9sZXZlbCkvL+WNh+e6p+aJgOmcgOimgeeahOmHkeW4gVxyXG4gICAgLy8gICAgIC8v546w5Zyo55qE6YeR5biBXHJcbiAgICAvLyAgICAgbGV0IGNvaW49UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKFByb3BJZC5Db2luKVxyXG4gICAgLy8gICAgIGxldCBsZXZlbGNvaW49RXF1aXBtZW50TGV2ZWxVcENvc3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TGV2ZWxMaW1pdCh0aGlzLmVxdWlwX2luZm8uZXF1aXBfbGV2ZWwpLy/ljYfnuqfmiYDpnIDopoHnmoTlhbPljaEvLzEwMDEwMVxyXG5cclxuICAgIC8vICAgICBpZihMZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw8bGV2ZWxjb2luKXtcclxuICAgIC8vICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAxMDEpKS8v6YCa5YWz5pWw5pyq6L6+5Yiw5Y2H57qn5p2h5Lu2XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIGlmKGNvaW48em9uY29pbil7XHJcbiAgICAvLyAgICAgICAgICAgICAvLyDot7PllYblupcgICDliY3lvoDllYbln45cclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5YmN5b6A5ZWG5Z+OXCIpXHJcbiAgICAvLyAgICAgICAgICAgICAvLyB0aGlzLnRpcC5hY3RpdmU9dHJ1ZVxyXG4gICAgLy8gICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5UaHJlZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0KHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Qcm9wZXJ0eVVwZGF0ZSgpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICB9KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5Db2luKVxyXG4gICAgLy8gICAgICAgICAgICAgfSx9KTtcclxuICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgICAgICAvLyDnoa7orqTljYfnuqdcclxuICAgIC8vICAgICAgICAgICAgIC8v5YeP6ZKxXHJcbiAgICAvLyAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oUHJvcElkLkNvaW4sLXpvbmNvaW4pXHJcbiAgICAvLyAgICAgICAgICAgICBsZXQgbnVtPXRoaXMuZXF1aXBfaW5mby5lcXVpcF9sZXZlbCsxXHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmVxdWlwX2luZm8uZXF1aXBfbGV2ZWw9bnVtXHJcbiAgICAvLyAgICAgICAgICAgICBFcXVpcG1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCkuRmluZG9uZWNoYW5nZWxldmVsKHRoaXMuZXF1aXBfaW5mbyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMudXNlX2NhbGxiYWNrKCk7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlZnJlc2hJbmZvKHRoaXMuZXF1aXBfaW5mbylcclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fXCIsdGhpcy5lcXVpcF9pbmZvLmVxdWlwX2xldmVsKVxyXG4gICAgLy8gICAgICAgICAgICAgLy/miorkv6Hmga/lkIzmraXliLDmlofku7bkuK1cclxuXHJcbiAgICAvLyAgICAgICAgICAgICAvL+WNh+etiee6p1xyXG4gICAgLy8gICAgICAgICAgICAgLy/lrZjmnKzlnLBcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIG9uQnRudGlwKCl7XHJcbiAgICAgICAgdGhpcy50aXAuYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nYW1lX3RvX2hvbWU9R29fVHlwZS5DaXR5XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5qdW1vQW5kU2hvd1VpKClcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUFsbFVpRGlhbG9nKFVJTGF5ZXJMZXZlbC5PbmUpO1xyXG4gICAgfVxyXG4gICAgb25CdG50aXBDbG9zZSgpe1xyXG4gICAgICAgIHRoaXMudGlwLmFjdGl2ZT1mYWxzZVxyXG4gICAgfVxyXG59XHJcbiJdfQ==