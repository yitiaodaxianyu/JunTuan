
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetAdvanceUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b850dohzYdKyJuW4X0C+ajj', 'PetAdvanceUi');
// Scripts/Pet/Ui/PetAdvanceUi.ts

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
var GameManager_1 = require("../../GameManager");
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetAdvanceUi = /** @class */ (function (_super) {
    __extends(PetAdvanceUi, _super);
    function PetAdvanceUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_advance_ui = null;
        _this.item = null;
        _this.all_list = null;
        _this.pet_id_num = null;
        _this.pet_quality_num = null;
        //  private targetInfo:JsonSpiritQualityAdvanced = null;
        _this.chooseItem1 = null;
        _this.chooseItem2 = null;
        _this.chooseItem3 = null;
        return _this;
    }
    // start(){
    //     this.sortList();
    //     this.refreshUi();
    // }
    PetAdvanceUi.prototype.init = function (uiAc) {
        //    super.init(uiAc);
        // //    this.sortList();
        //    this.refreshUi();
        //    let canvas = cc.find("Canvas");
        //    this.node.getChildByName("top").getComponent(cc.Widget).target = canvas;
        //    this.node.getChildByName("bottom").getComponent(cc.Widget).target = canvas; 
        //    FollowManager.getInstance().followEvent(Follow_Type.圣堂打开次数);
    };
    PetAdvanceUi.prototype.refreshUi = function () {
        // this.refreshScroll();
        // let top = this.node.getChildByName("top")
        // top.getChildByName("topCoinNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Coin),1);
        // top.getChildByName("topGemNum").getComponent(cc.Label).string = MyTool.getCoinDanwei(PropManager.getInstance().getPropNum(PropId.Gem),1);
        // if(this.chooseItem1 != null){
        //     let spRoot = this.node.getChildByName("spRoot");
        //     if(spRoot.children[0] == null){
        //         this.loadPrefab("" + this.chooseItem1.pet_id,spRoot);
        //         // this.node.getChildByName("Sprite_Up_Shadow").active = true;
        //         this.node.getChildByName("spRoot").active = true;
        //     }
        //     let info = top.getChildByName("info");
        //     // let formData = SpiritMessageManager.getInstance().getJsonSpiritMessage(this.chooseItem1.pet_id);
        //     info.active = true;
        //     info.getChildByName("qualityIcon").getComponent(cc.Sprite).spriteFrame = 
        //     PetManager.getInstance().getSpriteFrameByName("Sprite_Up_Quality_"+
        //     SpiritQualityMessageManager.getInstance().getSpiritQualityframe(this.chooseItem1.pet_quality));
        //     info.getChildByName("quality").getComponent(cc.Label).string = 
        //     LanguageManager.getInstance().getStrByTextId(
        //         SpiritQualityMessageManager.getInstance().getSpiritQualityName(this.chooseItem1.pet_quality));
        //     // info.getChildByName("name1").getComponent(cc.Label).string = 
        //     // LanguageManager.getInstance().getStrByTextId(formData.SpiritName);
        // }else{
        //     // this.node.getChildByName("Sprite_Up_Shadow").active = false;
        //     let spRoot = this.node.getChildByName("spRoot");
        //     spRoot.active = false;
        //     spRoot.removeAllChildren();
        //     top.getChildByName("info").active = false;
        // }
        // let bottom = this.node.getChildByName("bottom");
        // let iconRoot1 = bottom.getChildByName("3")
        // let iconRoot2 = bottom.getChildByName("2")
        // if(iconRoot1.active == true){
        //     iconRoot1.children[0].getComponent(BtnPet).init(this.chooseItem1);
        //     if(this.chooseItem2 != null){
        //         iconRoot1.children[1].getComponent(BtnPet).init(this.chooseItem2);
        //     }
        //     else{
        //         if(this.targetInfo.CostItselfNum != 0){
        //             iconRoot1.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostItselfQuality);
        //         }else{
        //             iconRoot1.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostSameTypeQuality);
        //         }
        //     }
        //     if(this.chooseItem3 != null){
        //         iconRoot1.children[2].getComponent(BtnPet).init(this.chooseItem3);
        //     }
        //     else{
        //         if(this.targetInfo.CostItselfNum != 0){
        //             iconRoot1.children[2].getComponent(BtnPet).showLock(this.targetInfo.CostItselfQuality);
        //         }else{
        //             iconRoot1.children[2].getComponent(BtnPet).showLock(this.targetInfo.CostSameTypeQuality);
        //         }
        //     }
        // }else{
        //     if(iconRoot2.active == true){
        //         iconRoot2.children[0].getComponent(BtnPet).init(this.chooseItem1);
        //         if(this.chooseItem2 != null){
        //             iconRoot2.children[1].getComponent(BtnPet).init(this.chooseItem2);
        //         }
        //         else{
        //             if(this.targetInfo.CostItselfNum != 0){
        //                 iconRoot2.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostItselfQuality);
        //             }else{
        //                 iconRoot2.children[1].getComponent(BtnPet).showLock(this.targetInfo.CostSameTypeQuality);
        //             }
        //         }
        //     }
        // }
    };
    PetAdvanceUi.prototype.refreshScroll = function () {
        // let bottom = this.node.getChildByName("bottom");
        // let content = bottom.getChildByName("scroll").getComponent(cc.ScrollView).content;
        // content.removeAllChildren();
        // this.all_list = new Array<PetInfo>();
        // this.all_list = PetManager.getInstance().getDeepPetList();
        // this.pet_id_num = new Map<string,number>();
        // this.pet_quality_num = new Map<number,number>();
        // this.getPetAdvanceData();
        // let tempList1: PetInfo[] = [];
        // let tempList2: PetInfo[] = [];
        // let tempList3: PetInfo[] = [];
        // tempList1 = this.selectPetList(this.all_list,true);
        // tempList2 = this.selectPetList(this.all_list,false);
        // if(tempList1.length != 0){
        //     PetManager.getInstance().sortPetList(tempList1);
        // }
        // if(tempList2.length != 0){
        //     PetManager.getInstance().sortPetList(tempList2);
        // }
        // tempList3 = tempList3.concat(tempList1,tempList2);
        // for (let i = 0; i < tempList3.length; i++) {
        //     if(tempList3[i].pet_quality <= 1) continue;
        //     let item = cc.instantiate(this.item);
        //     item.getComponent(PetItem).init(tempList3[i]);
        //     // item.getComponent(PetItem).initToPlay();
        //     // item.scale = 0.75;
        //     if(this.targetInfo == null){
        //         // if(tempList3[i].pet_quality < SpiritMessageManager.getInstance().getQualityLimit(tempList3[i].pet_id)){
        //         //     item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //         // }else{
        //         //     item.on(cc.Node.EventType.TOUCH_START, this.onTouchMaxQualityPetItem, this);
        //         // }
        //     }else{
        //         if(tempList3[i].sequence_id == this.chooseItem1.sequence_id){
        //             let gou = new cc.Node();
        //             gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark");
        //             // gou.scale = 1.2;
        //             item.addChild(gou);
        //         }else{
        //             if (this.chooseItem2 != null) {
        //                 if (tempList3[i].sequence_id == this.chooseItem2.sequence_id) {
        //                     let gou = new cc.Node();
        //                     gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark_1");
        //                     // gou.scale = 1.2;
        //                     item.addChild(gou);
        //                 }
        //                 else {
        //                     if(this.targetInfo.CostItselfNum == 2 || this.targetInfo.CostSameTypeNum == 2){
        //                         if (this.chooseItem3 != null) {
        //                             if (tempList3[i].sequence_id == this.chooseItem3.sequence_id) {
        //                                 let gou = new cc.Node();
        //                                 gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark_1");
        //                                 // gou.scale = 1.2;
        //                                 item.addChild(gou);
        //                                 if(this.checkCanAdvance(tempList3[i])){
        //                                     let red = new cc.Node();
        //                                     red.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Common_Icon_RedDot");
        //                                     item.addChild(red);
        //                                     red.setPosition(cc.v2(item.width/2,item.height/2));
        //                                 }
        //                                 item.setParent(content);
        //                                 continue;
        //                             }else{
        //                                 let bg = new cc.Node();
        //                                 bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                 let lock = new cc.Node();
        //                                 lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                 bg.addChild(lock);
        //                                 bg.scale = 1.2;
        //                                 item.addChild(bg);
        //                                 item.setParent(content);
        //                                 continue;
        //                             }
        //                         }
        //                         else{
        //                             if(this.targetInfo.CostItselfNum != 0){
        //                                 // 消耗本体
        //                                 if(tempList3[i].pet_id == this.chooseItem1.pet_id){
        //                                    if(tempList3[i].pet_quality == this.targetInfo.CostItselfQuality){
        //                                         let bg = new cc.Node();
        //                                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                                         let arrow = new cc.Node();
        //                                         arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                                         bg.addChild(arrow);
        //                                         // bg.scale = 1.3;
        //                                         item.addChild(bg);
        //                                        item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                                    }
        //                                    else{
        //                                         let bg = new cc.Node();
        //                                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                         let lock = new cc.Node();
        //                                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                         bg.addChild(lock);
        //                                         bg.scale = 1.2;
        //                                         item.addChild(bg);
        //                                    }
        //                                 }
        //                                 else{
        //                                     let bg = new cc.Node();
        //                                     bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                     let lock = new cc.Node();
        //                                     lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                     bg.addChild(lock);
        //                                     bg.scale = 1.2;
        //                                     item.addChild(bg);
        //                                 }
        //                             }else{
        //                                 // 消耗同质量
        //                                 if(tempList3[i].pet_quality == this.targetInfo.CostSameTypeQuality){
        //                                     let bg = new cc.Node();
        //                                     bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                                     let arrow = new cc.Node();
        //                                     arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                                     bg.addChild(arrow);
        //                                     // bg.scale = 1.3;
        //                                     item.addChild(bg);
        //                                     item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                                 } 
        //                                 // else if (this.chooseItem3 != null) {
        //                                 //     if (this.all_list[i].sequence_id == this.chooseItem3.sequence_id) {
        //                                 //         let gou = new cc.Node();
        //                                 //         gou.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Checkmark_1");
        //                                 //         gou.scale = 1.2;
        //                                 //         item.addChild(gou);
        //                                 //     }
        //                                 // }
        //                                 else{
        //                                     let bg = new cc.Node();
        //                                     bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                                     let lock = new cc.Node();
        //                                     lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                                     bg.addChild(lock);
        //                                     bg.scale = 1.2;
        //                                     item.addChild(bg);
        //                                 }
        //                             }
        //                         }
        //                     }
        //                     else{
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                         let lock = new cc.Node();
        //                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                         bg.addChild(lock);
        //                         bg.scale = 1.2;
        //                         item.addChild(bg);
        //                         item.setParent(content);
        //                         continue;
        //                     }
        //                 }
        //             }
        //             else{
        //                 // 当第二个宠物未选择时
        //                 if(this.targetInfo.CostItselfNum != 0){
        //                     // 消耗本体
        //                     if(tempList3[i].pet_id == this.chooseItem1.pet_id){
        //                        if(tempList3[i].pet_quality == this.targetInfo.CostItselfQuality){
        //                             let bg = new cc.Node();
        //                             bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                             let arrow = new cc.Node();
        //                             arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                             bg.addChild(arrow);
        //                             // bg.scale = 1.3;
        //                             item.addChild(bg);
        //                             item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                        }
        //                        else{
        //                             let bg = new cc.Node();
        //                             bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                             let lock = new cc.Node();
        //                             lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                             bg.addChild(lock);
        //                             bg.scale = 1.2;
        //                             item.addChild(bg);
        //                        }
        //                     }
        //                     else{
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                         let lock = new cc.Node();
        //                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                         bg.addChild(lock);
        //                         bg.scale = 1.2;
        //                         item.addChild(bg);
        //                     }
        //                 }else{
        //                     // 消耗同质量
        //                     if(tempList3[i].pet_quality == this.targetInfo.CostSameTypeQuality){
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_1");
        //                         let arrow = new cc.Node();
        //                         arrow.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Arrow");
        //                         bg.addChild(arrow);
        //                         // bg.scale = 1.3;
        //                         item.addChild(bg);
        //                         item.on(cc.Node.EventType.TOUCH_START, this.onTouchPetItem, this);
        //                     }
        //                     else{
        //                         let bg = new cc.Node();
        //                         bg.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Mask_0");
        //                         let lock = new cc.Node();
        //                         lock.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Evo_Lock");
        //                         bg.addChild(lock);
        //                         bg.scale = 1.2;
        //                         item.addChild(bg);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     if(this.checkCanAdvance(tempList3[i])){
        //         let red = new cc.Node();
        //         red.addComponent(cc.Sprite).spriteFrame = this.pet_advance_ui.getSpriteFrame("Common_Icon_RedDot");
        //         item.addChild(red);
        //         red.setPosition(cc.v2(item.width/2,item.height/2));
        //     }
        //     item.setParent(content);
        // }
    };
    PetAdvanceUi.prototype.sortList = function () {
        // this.all_list = new Array<PetInfo>();
        // this.all_list = PetManager.getInstance().getDeepPetList();
        // this.pet_id_num = new Map<string,number>();
        // this.pet_quality_num = new Map<number,number>();
        // this.getPetAdvanceData();
        // this.all_list.sort(this.petInfoSort.bind(this));
    };
    PetAdvanceUi.prototype.onClickPetBtn = function (e, num) {
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // num = Number(num);
        // let bottom = this.node.getChildByName("bottom");
        // switch (num) {
        //     case 1:
        //         bottom.getChildByName("3").active = false;
        //         bottom.getChildByName("2").active = false;
        //         this.targetInfo = null;
        //         this.chooseItem1 = null;
        //         this.chooseItem2 = null;
        //         this.chooseItem3 = null;
        //         break;
        //     case 2:
        //         this.chooseItem2 = null;
        //         this.chooseItem3 = null;
        //         break;
        //     case 3:
        //         this.chooseItem3 = null;
        //         break;
        // }
        // this.refreshUi();
    };
    PetAdvanceUi.prototype.onTouchPetItem = function (e) {
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // let bottom = this.node.getChildByName("bottom");
        // if(this.targetInfo == null){
        //     // 选中晋级目标
        //     this.chooseItem1 = e.target.getComponent(PetItem).pet_info;
        //     this.targetInfo = SpiritQualityAdvancedManager.getInstance().getJsonSpiritQualityAdvanced(this.chooseItem1.pet_quality);
        //     if(this.targetInfo.CostItselfNum == 2 || this.targetInfo.CostSameTypeNum == 2){
        //         bottom.getChildByName("3").active = true;
        //         bottom.getChildByName("2").active = false;
        //     }
        //     if(this.targetInfo.CostItselfNum == 1 || this.targetInfo.CostSameTypeNum == 1){
        //         bottom.getChildByName("3").active = false;
        //         bottom.getChildByName("2").active = true;
        //     }
        // }else{
        //     // 选中晋级耗材
        //     if(this.chooseItem2 == null){
        //         this.chooseItem2 = e.target.getComponent(PetItem).pet_info;
        //     }else{
        //         if(this.chooseItem3 == null){
        //         this.chooseItem3 = e.target.getComponent(PetItem).pet_info;
        //         }
        //     }
        // }
        // this.refreshUi();
    };
    PetAdvanceUi.prototype.onTouchMaxQualityPetItem = function () {
        GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100049));
    };
    PetAdvanceUi.prototype.loadPrefab = function (petId, parent) {
        WXManagerEX_1.default.getInstance().resourcesBundle.load("pet/ui/pet_" + petId, cc.Prefab, function (error, assets) {
            if (error) {
                cc.log(error);
                return;
            }
            var node = cc.instantiate(assets);
            node.parent = parent;
            var shadow = node.getChildByName("Sprite_Up_Shadow");
            shadow.parent = parent;
            shadow.scale = node.scale;
            node.zIndex = 1;
            node.setPosition(cc.v2(0, 0));
            var s = node.getComponent(sp.Skeleton);
            s.setAnimation(0, "Side_Idle", true);
        });
    };
    PetAdvanceUi.prototype.getPetAdvanceData = function () {
        // this.all_list.forEach((v,index) =>{
        //     // let num1 = this.pet_id_num.get(v.pet_id+"_"+v.pet_quality) || 0;
        //     // num1 = num1 + 1;
        //     // console.log(v.pet_id+"_"+v.pet_quality,num1);
        //     // this.pet_id_num[v.pet_id+"_"+v.pet_quality] = num1;
        //     // console.log(v.pet_id+"_"+v.pet_quality,this.pet_id_num[v.pet_id+"_"+v.pet_quality]);
        //     // let num2 = this.pet_quality_num[v.pet_quality] || 0;
        //     // num2 = num2 + 1;
        //     // this.pet_quality_num[v.pet_quality] = num2;
        //     if(this.pet_id_num.has(v.pet_id+"_"+v.pet_quality)){
        //         this.pet_id_num.set(v.pet_id+"_"+v.pet_quality,this.pet_id_num.get(v.pet_id+"_"+v.pet_quality) + 1);
        //     }
        //     else{
        //         this.pet_id_num.set(v.pet_id+"_"+v.pet_quality,1);
        //     }
        //     if(this.pet_quality_num.has(v.pet_quality)){
        //         this.pet_quality_num.set(v.pet_quality,this.pet_quality_num.get(v.pet_quality) + 1)                
        //     }
        //     else{
        //         this.pet_quality_num.set(v.pet_quality,1)    
        //     }
        // })
    };
    PetAdvanceUi.prototype.checkCanAdvance = function (info) {
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // if(info.pet_quality<=1) return false;
        // // if(info.pet_quality == SpiritMessageManager.getInstance().getQualityLimit(info.pet_id)) return false;
        // let data = SpiritQualityAdvancedManager.getInstance().getJsonSpiritQualityAdvanced(info.pet_quality);
        // if(data.CostItselfNum != 0){
        //     // if((this.pet_id_num[info.pet_id + "_" + data.CostItselfQuality] || 0) >= (data.CostItselfNum + 1)){
        //     //     return true;
        //     // }
        //     if(this.pet_id_num.has(info.pet_id + "_" + data.CostItselfQuality)){
        //         if(this.pet_id_num.get(info.pet_id + "_" + data.CostItselfQuality) >= (info.pet_quality == data.CostItselfQuality ? data.CostItselfNum+1 : data.CostItselfNum)){
        //             return true;
        //         }
        //     }
        //     return false;
        // }
        // else{
        //     // if(this.pet_quality_num[data.CostSameTypeQuality] >= (data.CostSameTypeNum + 1)){
        //     //     return true;
        //     // }
        //     if(this.pet_quality_num.has(data.CostSameTypeQuality)){
        //         if(this.pet_quality_num.get(data.CostSameTypeQuality) >= (info.pet_quality == data.CostSameTypeQuality ? data.CostSameTypeNum + 1:data.CostSameTypeNum)){
        //             return true;
        //         }
        //     }
        // }
        return false;
    };
    // 自定义排序
    PetAdvanceUi.prototype.petInfoSort = function (a, b) {
        var cb = this.checkCanAdvance(b);
        if (cb) {
            var ca = this.checkCanAdvance(a);
            if (ca) {
                return b.pet_level - a.pet_level;
            }
            return 1;
        }
        else {
            return b.pet_level - a.pet_level;
        }
    };
    PetAdvanceUi.prototype.selectPetList = function (list, target) {
        var tempList = [];
        for (var i = 0; i < list.length; i++) {
            if (this.checkCanAdvance(list[i]) == target) {
                tempList.push(list[i]);
            }
        }
        return tempList;
    };
    PetAdvanceUi.prototype.onClickAdvanceBtn = function () {
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // if(this.targetInfo != null){
        //     if(this.targetInfo.CostItselfNum == 2 || this.targetInfo.CostSameTypeNum == 2){
        //         if(this.chooseItem2 != null && this.chooseItem3 != null){
        //             let bottom = this.node.getChildByName("bottom");
        //             let oldPetInfo = cc.instantiate(this.chooseItem1);
        //             PetManager.getInstance().removePet(this.chooseItem2);
        //             PetManager.getInstance().removePet(this.chooseItem3);
        //             PetManager.getInstance().setPetQuality(this.chooseItem1,this.targetInfo.TargetQuality);
        //             PetManager.getInstance().saveAllPetList();
        //             PetManager.getInstance().loadAllPetData();
        //             bottom.getChildByName("3").active = false;
        //             bottom.getChildByName("2").active = false;
        //             UIManager.getInstance().showPetAdvanceShowUi(null,this.chooseItem1,oldPetInfo);
        //             // switch(SpiritMessageManager.getInstance().getSpiritRarity(this.chooseItem2.pet_id)){
        //             //     case 2:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的史诗稀有度宠物);
        //             //         break;
        //             //     case 3:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的神话稀有度宠物);
        //             //         break;
        //             //     case 4:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的SP稀有度宠物);
        //             //         break;
        //             // }
        //             // switch(SpiritMessageManager.getInstance().getSpiritRarity(this.chooseItem3.pet_id)){
        //             //     case 2:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的史诗稀有度宠物);
        //             //         break;
        //             //     case 3:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的神话稀有度宠物);
        //             //         break;
        //             //     case 4:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的SP稀有度宠物);
        //             //         break;
        //             // }
        //             FollowManager.getInstance().followEvent(Follow_Type.记录不同品质的成功进阶次数完成时品质 + this.chooseItem1.pet_quality);
        //             this.targetInfo = null;
        //             this.chooseItem1 = null;
        //             this.chooseItem2 = null;
        //             this.chooseItem3 = null;
        //             // this.sortList();
        //             this.refreshUi();
        //             // GameManager.getInstance().showMessage("进阶成功！");
        //             GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Hecheng);
        //             FollowManager.getInstance().followEvent(Follow_Type.记录宠物进阶成功);
        //             return;
        //         }
        //     }
        //     if(this.targetInfo.CostItselfNum == 1 || this.targetInfo.CostSameTypeNum == 1){
        //         if(this.chooseItem2 != null){
        //             let bottom = this.node.getChildByName("bottom");
        //             let oldPetInfo = cc.instantiate(this.chooseItem1);
        //             PetManager.getInstance().removePet(this.chooseItem2);
        //             PetManager.getInstance().setPetQuality(this.chooseItem1,this.targetInfo.TargetQuality);
        //             PetManager.getInstance().saveAllPetList();
        //             PetManager.getInstance().loadAllPetData();
        //             bottom.getChildByName("3").active = false;
        //             bottom.getChildByName("2").active = false;
        //             UIManager.getInstance().showPetAdvanceShowUi(null,this.chooseItem1,oldPetInfo);
        //             // switch(SpiritMessageManager.getInstance().getSpiritRarity(this.chooseItem2.pet_id)){
        //             //     case 2:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的史诗稀有度宠物);
        //             //         break;
        //             //     case 3:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的神话稀有度宠物);
        //             //         break;
        //             //     case 4:
        //             //         FollowManager.getInstance().followEvent(Follow_Type.记录进阶消耗的SP稀有度宠物);
        //             //         break;
        //             // }
        //             FollowManager.getInstance().followEvent(Follow_Type.记录不同品质的成功进阶次数完成时品质 + this.chooseItem1.pet_quality);
        //             this.targetInfo = null;
        //             this.chooseItem1 = null;
        //             this.chooseItem2 = null;
        //             this.chooseItem3 = null;
        //             // this.sortList();
        //             this.refreshUi();
        //             // GameManager.getInstance().showMessage("进阶成功！");
        //             GameManager.getInstance().sound_manager.playSound(SoundIndex.YX_Hecheng);
        //             FollowManager.getInstance().followEvent(Follow_Type.记录宠物进阶成功);
        //         }
        //     }
        //     // if(this.targetInfo.CostItselfNum != 0){
        //     //     if(this.targetInfo.CostSameTypeNum == 2){
        //     //         if(this.chooseItem2!= null && this.chooseItem3 != null){
        //     //         }
        //     //     }else{
        //     //         if(this.chooseItem2 != null){
        //     //         }
        //     //     }
        //     // }
        //     // else{
        //     //     if(this.targetInfo.CostSameTypeNum == 2){
        //     //         if(this.chooseItem2!= null && this.chooseItem3 != null){
        //     //         }
        //     //     }
        //     // }
        // }
    };
    PetAdvanceUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    PetAdvanceUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], PetAdvanceUi.prototype, "pet_advance_ui", void 0);
    __decorate([
        property(cc.Prefab)
    ], PetAdvanceUi.prototype, "item", void 0);
    PetAdvanceUi = __decorate([
        ccclass
    ], PetAdvanceUi);
    return PetAdvanceUi;
}(UIComponent_1.default));
exports.default = PetAdvanceUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0QWR2YW5jZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUEwRDtBQUMxRCxtREFBOEM7QUFDOUMsaURBQTRDO0FBRzVDLHVFQUFrRTtBQUdsRSw2REFBd0Q7QUFFeEQsb0RBQStDO0FBVXpDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFXO0lBQXJEO1FBQUEscUVBMm1CQztRQXhtQkksb0JBQWMsR0FBa0IsSUFBSSxDQUFDO1FBRXJDLFVBQUksR0FBYSxJQUFJLENBQUM7UUFFZCxjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQXNCLElBQUksQ0FBQztRQUNyQyxxQkFBZSxHQUFzQixJQUFJLENBQUM7UUFHbkQsd0RBQXdEO1FBRS9DLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVcsSUFBSSxDQUFDOztJQTBsQnhDLENBQUM7SUF4bEJHLFdBQVc7SUFDWCx1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLElBQUk7SUFFTCwyQkFBSSxHQUFKLFVBQUssSUFBYztRQUNsQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2QixxQ0FBcUM7UUFDckMsOEVBQThFO1FBQzlFLGtGQUFrRjtRQUNsRixrRUFBa0U7SUFDbkUsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSyx3QkFBd0I7UUFDeEIsNENBQTRDO1FBQzVDLDhJQUE4STtRQUM5SSw0SUFBNEk7UUFDNUksZ0NBQWdDO1FBQ2hDLHVEQUF1RDtRQUN2RCxzQ0FBc0M7UUFDdEMsZ0VBQWdFO1FBQ2hFLHlFQUF5RTtRQUN6RSw0REFBNEQ7UUFDNUQsUUFBUTtRQUVSLDZDQUE2QztR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Q0FBQzs4Q0FDRTtJQUxOLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0EybUJoQztJQUFELG1CQUFDO0NBM21CRCxBQTJtQkMsQ0EzbUJ5QyxxQkFBVyxHQTJtQnBEO2tCQTNtQm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4uLy4uLy4uL3N0YXJ0c2NlbmUvV1hNYW5hZ2VyRVhcIjtcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB7IFNwaXJpdE1lc3NhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvU3Bpcml0TWVzc2FnZVwiO1xyXG4vLyBpbXBvcnQgeyBKc29uU3Bpcml0UXVhbGl0eUFkdmFuY2VkLCBTcGlyaXRRdWFsaXR5QWR2YW5jZWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvU3Bpcml0UXVhbGl0eUFkdmFuY2VkXCI7XHJcbmltcG9ydCB7IFBldEluZm8gfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcbmltcG9ydCB7IFBldE1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0TWFuYWdlclwiO1xyXG5pbXBvcnQgQnRuUGV0IGZyb20gXCIuL0J0blBldFwiO1xyXG5pbXBvcnQgUGV0SXRlbSBmcm9tIFwiLi9QZXRJdGVtXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBldEFkdmFuY2VVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICAgQHByb3BlcnR5KGNjLlNwcml0ZUF0bGFzKVxyXG4gICAgIHBldF9hZHZhbmNlX3VpOmNjLlNwcml0ZUF0bGFzID0gbnVsbDtcclxuICAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgIGl0ZW06Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAgcHJpdmF0ZSBhbGxfbGlzdDogUGV0SW5mb1tdID0gbnVsbDtcclxuXHJcbiAgICAgcHJpdmF0ZSBwZXRfaWRfbnVtOk1hcDxzdHJpbmcsbnVtYmVyPiA9IG51bGw7XHJcbiAgICAgcHJpdmF0ZSBwZXRfcXVhbGl0eV9udW06TWFwPG51bWJlcixudW1iZXI+ID0gbnVsbDtcclxuXHJcblxyXG4gICAgLy8gIHByaXZhdGUgdGFyZ2V0SW5mbzpKc29uU3Bpcml0UXVhbGl0eUFkdmFuY2VkID0gbnVsbDtcclxuXHJcbiAgICAgcHJpdmF0ZSBjaG9vc2VJdGVtMTpQZXRJbmZvID0gbnVsbDtcclxuICAgICBwcml2YXRlIGNob29zZUl0ZW0yOlBldEluZm8gPSBudWxsO1xyXG4gICAgIHByaXZhdGUgY2hvb3NlSXRlbTM6UGV0SW5mbyA9IG51bGw7XHJcblxyXG4gICAgLy8gc3RhcnQoKXtcclxuICAgIC8vICAgICB0aGlzLnNvcnRMaXN0KCk7XHJcbiAgICAvLyAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgIC8vICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAvLyAvLyAgICB0aGlzLnNvcnRMaXN0KCk7XHJcbiAgICAvLyAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgLy8gICAgbGV0IGNhbnZhcyA9IGNjLmZpbmQoXCJDYW52YXNcIik7XHJcbiAgICAvLyAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0b3BcIikuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudGFyZ2V0ID0gY2FudmFzO1xyXG4gICAgLy8gICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnRhcmdldCA9IGNhbnZhczsgXHJcbiAgICAvLyAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5Zyj5aCC5omT5byA5qyh5pWwKTtcclxuICAgfVxyXG5cclxuICAgcmVmcmVzaFVpKCl7XHJcbiAgICAgICAgLy8gdGhpcy5yZWZyZXNoU2Nyb2xsKCk7XHJcbiAgICAgICAgLy8gbGV0IHRvcCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKVxyXG4gICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcInRvcENvaW5OdW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBNeVRvb2wuZ2V0Q29pbkRhbndlaShQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLkNvaW4pLDEpO1xyXG4gICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZShcInRvcEdlbU51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuR2VtKSwxKTtcclxuICAgICAgICAvLyBpZih0aGlzLmNob29zZUl0ZW0xICE9IG51bGwpe1xyXG4gICAgICAgIC8vICAgICBsZXQgc3BSb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3BSb290XCIpO1xyXG4gICAgICAgIC8vICAgICBpZihzcFJvb3QuY2hpbGRyZW5bMF0gPT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmxvYWRQcmVmYWIoXCJcIiArIHRoaXMuY2hvb3NlSXRlbTEucGV0X2lkLHNwUm9vdCk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJTcHJpdGVfVXBfU2hhZG93XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzcFJvb3RcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgbGV0IGluZm8gPSB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJpbmZvXCIpO1xyXG4gICAgICAgIC8vICAgICAvLyBsZXQgZm9ybURhdGEgPSBTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TcGlyaXRNZXNzYWdlKHRoaXMuY2hvb3NlSXRlbTEucGV0X2lkKTtcclxuICAgICAgICAvLyAgICAgaW5mby5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICBpbmZvLmdldENoaWxkQnlOYW1lKFwicXVhbGl0eUljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBcclxuICAgICAgICAvLyAgICAgUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lQnlOYW1lKFwiU3ByaXRlX1VwX1F1YWxpdHlfXCIrXHJcbiAgICAgICAgLy8gICAgIFNwaXJpdFF1YWxpdHlNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaXJpdFF1YWxpdHlmcmFtZSh0aGlzLmNob29zZUl0ZW0xLnBldF9xdWFsaXR5KSk7XHJcbiAgICAgICAgLy8gICAgIGluZm8uZ2V0Q2hpbGRCeU5hbWUoXCJxdWFsaXR5XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXHJcbiAgICAgICAgLy8gICAgIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKFxyXG4gICAgICAgIC8vICAgICAgICAgU3Bpcml0UXVhbGl0eU1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0UXVhbGl0eU5hbWUodGhpcy5jaG9vc2VJdGVtMS5wZXRfcXVhbGl0eSkpO1xyXG4gICAgICAgIC8vICAgICAvLyBpbmZvLmdldENoaWxkQnlOYW1lKFwibmFtZTFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcclxuICAgICAgICAvLyAgICAgLy8gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoZm9ybURhdGEuU3Bpcml0TmFtZSk7XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlNwcml0ZV9VcF9TaGFkb3dcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIGxldCBzcFJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzcFJvb3RcIik7XHJcbiAgICAgICAgLy8gICAgIHNwUm9vdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgc3BSb290LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcblxyXG4gICAgICAgIC8vICAgICB0b3AuZ2V0Q2hpbGRCeU5hbWUoXCJpbmZvXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIC8vIGxldCBpY29uUm9vdDEgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCIzXCIpXHJcbiAgICAgICAgLy8gbGV0IGljb25Sb290MiA9IGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIjJcIilcclxuICAgICAgICAvLyBpZihpY29uUm9vdDEuYWN0aXZlID09IHRydWUpe1xyXG4gICAgICAgIC8vICAgICBpY29uUm9vdDEuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KEJ0blBldCkuaW5pdCh0aGlzLmNob29zZUl0ZW0xKTtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy5jaG9vc2VJdGVtMiAhPSBudWxsKXtcclxuICAgICAgICAvLyAgICAgICAgIGljb25Sb290MS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoQnRuUGV0KS5pbml0KHRoaXMuY2hvb3NlSXRlbTIpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnRhcmdldEluZm8uQ29zdEl0c2VsZk51bSAhPSAwKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpY29uUm9vdDEuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KEJ0blBldCkuc2hvd0xvY2sodGhpcy50YXJnZXRJbmZvLkNvc3RJdHNlbGZRdWFsaXR5KTtcclxuICAgICAgICAvLyAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGljb25Sb290MS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoQnRuUGV0KS5zaG93TG9jayh0aGlzLnRhcmdldEluZm8uQ29zdFNhbWVUeXBlUXVhbGl0eSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuY2hvb3NlSXRlbTMgIT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICBpY29uUm9vdDEuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KEJ0blBldCkuaW5pdCh0aGlzLmNob29zZUl0ZW0zKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBlbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy50YXJnZXRJbmZvLkNvc3RJdHNlbGZOdW0gIT0gMCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWNvblJvb3QxLmNoaWxkcmVuWzJdLmdldENvbXBvbmVudChCdG5QZXQpLnNob3dMb2NrKHRoaXMudGFyZ2V0SW5mby5Db3N0SXRzZWxmUXVhbGl0eSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpY29uUm9vdDEuY2hpbGRyZW5bMl0uZ2V0Q29tcG9uZW50KEJ0blBldCkuc2hvd0xvY2sodGhpcy50YXJnZXRJbmZvLkNvc3RTYW1lVHlwZVF1YWxpdHkpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIGlmKGljb25Sb290Mi5hY3RpdmUgPT0gdHJ1ZSl7XHJcbiAgICAgICAgLy8gICAgICAgICBpY29uUm9vdDIuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KEJ0blBldCkuaW5pdCh0aGlzLmNob29zZUl0ZW0xKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLmNob29zZUl0ZW0yICE9IG51bGwpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGljb25Sb290Mi5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoQnRuUGV0KS5pbml0KHRoaXMuY2hvb3NlSXRlbTIpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZih0aGlzLnRhcmdldEluZm8uQ29zdEl0c2VsZk51bSAhPSAwKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWNvblJvb3QyLmNoaWxkcmVuWzFdLmdldENvbXBvbmVudChCdG5QZXQpLnNob3dMb2NrKHRoaXMudGFyZ2V0SW5mby5Db3N0SXRzZWxmUXVhbGl0eSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGljb25Sb290Mi5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoQnRuUGV0KS5zaG93TG9jayh0aGlzLnRhcmdldEluZm8uQ29zdFNhbWVUeXBlUXVhbGl0eSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICB9XHJcbiAgICBcclxuICAgcmVmcmVzaFNjcm9sbCgpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIik7XHJcbiAgICAgICAgLy8gbGV0IGNvbnRlbnQgPSBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgLy8gY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmFsbF9saXN0ID0gbmV3IEFycmF5PFBldEluZm8+KCk7XHJcbiAgICAgICAgLy8gdGhpcy5hbGxfbGlzdCA9IFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREZWVwUGV0TGlzdCgpO1xyXG4gICAgICAgIC8vIHRoaXMucGV0X2lkX251bSA9IG5ldyBNYXA8c3RyaW5nLG51bWJlcj4oKTtcclxuICAgICAgICAvLyB0aGlzLnBldF9xdWFsaXR5X251bSA9IG5ldyBNYXA8bnVtYmVyLG51bWJlcj4oKTtcclxuICAgICAgICAvLyB0aGlzLmdldFBldEFkdmFuY2VEYXRhKCk7XHJcbiAgICAgICAgLy8gbGV0IHRlbXBMaXN0MTogUGV0SW5mb1tdID0gW107XHJcbiAgICAgICAgLy8gbGV0IHRlbXBMaXN0MjogUGV0SW5mb1tdID0gW107XHJcbiAgICAgICAgLy8gbGV0IHRlbXBMaXN0MzogUGV0SW5mb1tdID0gW107XHJcbiAgICAgICAgLy8gdGVtcExpc3QxID0gdGhpcy5zZWxlY3RQZXRMaXN0KHRoaXMuYWxsX2xpc3QsdHJ1ZSk7XHJcbiAgICAgICAgLy8gdGVtcExpc3QyID0gdGhpcy5zZWxlY3RQZXRMaXN0KHRoaXMuYWxsX2xpc3QsZmFsc2UpO1xyXG4gICAgICAgIC8vIGlmKHRlbXBMaXN0MS5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgLy8gICAgIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3J0UGV0TGlzdCh0ZW1wTGlzdDEpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZih0ZW1wTGlzdDIubGVuZ3RoICE9IDApe1xyXG4gICAgICAgIC8vICAgICBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc29ydFBldExpc3QodGVtcExpc3QyKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGVtcExpc3QzID0gdGVtcExpc3QzLmNvbmNhdCh0ZW1wTGlzdDEsdGVtcExpc3QyKTtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHRlbXBMaXN0My5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBpZih0ZW1wTGlzdDNbaV0ucGV0X3F1YWxpdHkgPD0gMSkgY29udGludWU7XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAvLyAgICAgaXRlbS5nZXRDb21wb25lbnQoUGV0SXRlbSkuaW5pdCh0ZW1wTGlzdDNbaV0pO1xyXG4gICAgICAgIC8vICAgICAvLyBpdGVtLmdldENvbXBvbmVudChQZXRJdGVtKS5pbml0VG9QbGF5KCk7XHJcbiAgICAgICAgLy8gICAgIC8vIGl0ZW0uc2NhbGUgPSAwLjc1O1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLnRhcmdldEluZm8gPT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyBpZih0ZW1wTGlzdDNbaV0ucGV0X3F1YWxpdHkgPCBTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFF1YWxpdHlMaW1pdCh0ZW1wTGlzdDNbaV0ucGV0X2lkKSl7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoUGV0SXRlbSwgdGhpcyk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIC8vICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hNYXhRdWFsaXR5UGV0SXRlbSwgdGhpcyk7XHJcbiAgICAgICAgLy8gICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodGVtcExpc3QzW2ldLnNlcXVlbmNlX2lkID09IHRoaXMuY2hvb3NlSXRlbTEuc2VxdWVuY2VfaWQpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fQ2hlY2ttYXJrXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIGdvdS5zY2FsZSA9IDEuMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgLy8gICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZiAodGhpcy5jaG9vc2VJdGVtMiAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmICh0ZW1wTGlzdDNbaV0uc2VxdWVuY2VfaWQgPT0gdGhpcy5jaG9vc2VJdGVtMi5zZXF1ZW5jZV9pZCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9hZHZhbmNlX3VpLmdldFNwcml0ZUZyYW1lKFwiRXZvX0NoZWNrbWFya18xXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy8gZ291LnNjYWxlID0gMS4yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy50YXJnZXRJbmZvLkNvc3RJdHNlbGZOdW0gPT0gMiB8fCB0aGlzLnRhcmdldEluZm8uQ29zdFNhbWVUeXBlTnVtID09IDIpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNob29zZUl0ZW0zICE9IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlbXBMaXN0M1tpXS5zZXF1ZW5jZV9pZCA9PSB0aGlzLmNob29zZUl0ZW0zLnNlcXVlbmNlX2lkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ291ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fQ2hlY2ttYXJrXzFcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBnb3Uuc2NhbGUgPSAxLjI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKGdvdSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoZWNrQ2FuQWR2YW5jZSh0ZW1wTGlzdDNbaV0pKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVkID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWQuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9hZHZhbmNlX3VpLmdldFNwcml0ZUZyYW1lKFwiQ29tbW9uX0ljb25fUmVkRG90XCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQocmVkKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWQuc2V0UG9zaXRpb24oY2MudjIoaXRlbS53aWR0aC8yLGl0ZW0uaGVpZ2h0LzIpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0UGFyZW50KGNvbnRlbnQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19NYXNrXzBcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jayA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19Mb2NrXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQobG9jayk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZy5zY2FsZSA9IDEuMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQoY29udGVudCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnRhcmdldEluZm8uQ29zdEl0c2VsZk51bSAhPSAwKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa2iOiAl+acrOS9k1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcExpc3QzW2ldLnBldF9pZCA9PSB0aGlzLmNob29zZUl0ZW0xLnBldF9pZCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0ZW1wTGlzdDNbaV0ucGV0X3F1YWxpdHkgPT0gdGhpcy50YXJnZXRJbmZvLkNvc3RJdHNlbGZRdWFsaXR5KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9hZHZhbmNlX3VpLmdldFNwcml0ZUZyYW1lKFwiRXZvX01hc2tfMVwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycm93ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3cuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9hZHZhbmNlX3VpLmdldFNwcml0ZUZyYW1lKFwiRXZvX0Fycm93XCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZy5hZGRDaGlsZChhcnJvdyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJnLnNjYWxlID0gMS4zO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKGJnKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hQZXRJdGVtLCB0aGlzKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19NYXNrXzBcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jay5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fTG9ja1wiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQobG9jayk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLnNjYWxlID0gMS4yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKGJnKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fTWFza18wXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19Mb2NrXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENoaWxkKGxvY2spO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLnNjYWxlID0gMS4yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOa2iOiAl+WQjOi0qOmHj1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcExpc3QzW2ldLnBldF9xdWFsaXR5ID09IHRoaXMudGFyZ2V0SW5mby5Db3N0U2FtZVR5cGVRdWFsaXR5KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19NYXNrXzFcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycm93ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvdy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fQXJyb3dcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQoYXJyb3cpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJnLnNjYWxlID0gMS4zO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFBldEl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsc2UgaWYgKHRoaXMuY2hvb3NlSXRlbTMgIT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmFsbF9saXN0W2ldLnNlcXVlbmNlX2lkID09IHRoaXMuY2hvb3NlSXRlbTMuc2VxdWVuY2VfaWQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGdvdS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fQ2hlY2ttYXJrXzFcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGdvdS5zY2FsZSA9IDEuMjtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgaXRlbS5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fTWFza18wXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19Mb2NrXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENoaWxkKGxvY2spO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLnNjYWxlID0gMS4yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19NYXNrXzBcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2sgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9hZHZhbmNlX3VpLmdldFNwcml0ZUZyYW1lKFwiRXZvX0xvY2tcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQobG9jayk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYmcuc2NhbGUgPSAxLjI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChiZyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQoY29udGVudCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8g5b2T56ys5LqM5Liq5a6g54mp5pyq6YCJ5oup5pe2XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmKHRoaXMudGFyZ2V0SW5mby5Db3N0SXRzZWxmTnVtICE9IDApe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgLy8g5raI6ICX5pys5L2TXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBpZih0ZW1wTGlzdDNbaV0ucGV0X2lkID09IHRoaXMuY2hvb3NlSXRlbTEucGV0X2lkKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRlbXBMaXN0M1tpXS5wZXRfcXVhbGl0eSA9PSB0aGlzLnRhcmdldEluZm8uQ29zdEl0c2VsZlF1YWxpdHkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fTWFza18xXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyb3cgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvdy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fQXJyb3dcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENoaWxkKGFycm93KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmcuc2NhbGUgPSAxLjM7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hQZXRJdGVtLCB0aGlzKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19NYXNrXzBcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jay5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fTG9ja1wiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQobG9jayk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJnLnNjYWxlID0gMS4yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZENoaWxkKGJnKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fTWFza18wXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NrID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19Mb2NrXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENoaWxkKGxvY2spO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJnLnNjYWxlID0gMS4yO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vIOa2iOiAl+WQjOi0qOmHj1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWYodGVtcExpc3QzW2ldLnBldF9xdWFsaXR5ID09IHRoaXMudGFyZ2V0SW5mby5Db3N0U2FtZVR5cGVRdWFsaXR5KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19NYXNrXzFcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFycm93ID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBhcnJvdy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJFdm9fQXJyb3dcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQoYXJyb3cpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJnLnNjYWxlID0gMS4zO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFBldEl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5wZXRfYWR2YW5jZV91aS5nZXRTcHJpdGVGcmFtZShcIkV2b19NYXNrXzBcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2sgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2suYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLnBldF9hZHZhbmNlX3VpLmdldFNwcml0ZUZyYW1lKFwiRXZvX0xvY2tcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWRkQ2hpbGQobG9jayk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYmcuc2NhbGUgPSAxLjI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRDaGlsZChiZyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgaWYodGhpcy5jaGVja0NhbkFkdmFuY2UodGVtcExpc3QzW2ldKSl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmVkID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAvLyAgICAgICAgIHJlZC5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMucGV0X2FkdmFuY2VfdWkuZ2V0U3ByaXRlRnJhbWUoXCJDb21tb25fSWNvbl9SZWREb3RcIik7XHJcbiAgICAgICAgLy8gICAgICAgICBpdGVtLmFkZENoaWxkKHJlZCk7XHJcbiAgICAgICAgLy8gICAgICAgICByZWQuc2V0UG9zaXRpb24oY2MudjIoaXRlbS53aWR0aC8yLGl0ZW0uaGVpZ2h0LzIpKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpdGVtLnNldFBhcmVudChjb250ZW50KTtcclxuICAgICAgICAvLyB9XHJcbiAgIH1cclxuXHJcbiAgIHNvcnRMaXN0KCl7XHJcbiAgICAgICAgLy8gdGhpcy5hbGxfbGlzdCA9IG5ldyBBcnJheTxQZXRJbmZvPigpO1xyXG4gICAgICAgIC8vIHRoaXMuYWxsX2xpc3QgPSBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RGVlcFBldExpc3QoKTtcclxuICAgICAgICAvLyB0aGlzLnBldF9pZF9udW0gPSBuZXcgTWFwPHN0cmluZyxudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gdGhpcy5wZXRfcXVhbGl0eV9udW0gPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgLy8gdGhpcy5nZXRQZXRBZHZhbmNlRGF0YSgpO1xyXG4gICAgICAgIC8vIHRoaXMuYWxsX2xpc3Quc29ydCh0aGlzLnBldEluZm9Tb3J0LmJpbmQodGhpcykpO1xyXG4gICB9XHJcblxyXG4gICAgb25DbGlja1BldEJ0bihlLCBudW06IG51bWJlcikge1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gbnVtID0gTnVtYmVyKG51bSk7XHJcbiAgICAgICAgLy8gbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAvLyBzd2l0Y2ggKG51bSkge1xyXG4gICAgICAgIC8vICAgICBjYXNlIDE6XHJcbiAgICAgICAgLy8gICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCIzXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMudGFyZ2V0SW5mbyA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNob29zZUl0ZW0xID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2hvb3NlSXRlbTIgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jaG9vc2VJdGVtMyA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgY2FzZSAyOlxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5jaG9vc2VJdGVtMiA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNob29zZUl0ZW0zID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBjYXNlIDM6XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNob29zZUl0ZW0zID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgfVxyXG5cclxuXHJcbiAgIG9uVG91Y2hQZXRJdGVtKGU6Y2MuRXZlbnQuRXZlbnRUb3VjaCl7XHJcbiAgICAgICAgLy8gR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAvLyBsZXQgYm90dG9tID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm90dG9tXCIpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMudGFyZ2V0SW5mbyA9PSBudWxsKXtcclxuICAgICAgICAvLyAgICAgLy8g6YCJ5Lit5pmL57qn55uu5qCHXHJcbiAgICAgICAgLy8gICAgIHRoaXMuY2hvb3NlSXRlbTEgPSBlLnRhcmdldC5nZXRDb21wb25lbnQoUGV0SXRlbSkucGV0X2luZm87XHJcbiAgICAgICAgLy8gICAgIHRoaXMudGFyZ2V0SW5mbyA9IFNwaXJpdFF1YWxpdHlBZHZhbmNlZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0UXVhbGl0eUFkdmFuY2VkKHRoaXMuY2hvb3NlSXRlbTEucGV0X3F1YWxpdHkpO1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLnRhcmdldEluZm8uQ29zdEl0c2VsZk51bSA9PSAyIHx8IHRoaXMudGFyZ2V0SW5mby5Db3N0U2FtZVR5cGVOdW0gPT0gMil7XHJcbiAgICAgICAgLy8gICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCIzXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCIyXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMudGFyZ2V0SW5mby5Db3N0SXRzZWxmTnVtID09IDEgfHwgdGhpcy50YXJnZXRJbmZvLkNvc3RTYW1lVHlwZU51bSA9PSAxKXtcclxuICAgICAgICAvLyAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIjNcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCIyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgLy8g6YCJ5Lit5pmL57qn6ICX5p2QXHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuY2hvb3NlSXRlbTIgPT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNob29zZUl0ZW0yID0gZS50YXJnZXQuZ2V0Q29tcG9uZW50KFBldEl0ZW0pLnBldF9pbmZvO1xyXG4gICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMuY2hvb3NlSXRlbTMgPT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmNob29zZUl0ZW0zID0gZS50YXJnZXQuZ2V0Q29tcG9uZW50KFBldEl0ZW0pLnBldF9pbmZvO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgIH1cclxuXHJcbiAgIG9uVG91Y2hNYXhRdWFsaXR5UGV0SXRlbSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDQ5KSk7XHJcbiAgIH1cclxuXHJcbiAgIGxvYWRQcmVmYWIocGV0SWQ6IHN0cmluZyxwYXJlbnQ6Y2MuTm9kZSkge1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoXCJwZXQvdWkvcGV0X1wiK3BldElkLCBjYy5QcmVmYWIsIChlcnJvcjogRXJyb3IsIGFzc2V0czogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cylcclxuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIGxldCBzaGFkb3cgPSBub2RlLmdldENoaWxkQnlOYW1lKFwiU3ByaXRlX1VwX1NoYWRvd1wiKTtcclxuICAgICAgICAgICAgc2hhZG93LnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICAgICAgc2hhZG93LnNjYWxlID0gbm9kZS5zY2FsZTtcclxuICAgICAgICAgICAgbm9kZS56SW5kZXggPSAxO1xyXG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgICAgICBsZXQgcyA9IG5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcclxuICAgICAgICAgICAgcy5zZXRBbmltYXRpb24oMCxcIlNpZGVfSWRsZVwiLHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBldEFkdmFuY2VEYXRhKCl7XHJcbiAgICAgICAgLy8gdGhpcy5hbGxfbGlzdC5mb3JFYWNoKCh2LGluZGV4KSA9PntcclxuICAgICAgICAvLyAgICAgLy8gbGV0IG51bTEgPSB0aGlzLnBldF9pZF9udW0uZ2V0KHYucGV0X2lkK1wiX1wiK3YucGV0X3F1YWxpdHkpIHx8IDA7XHJcbiAgICAgICAgLy8gICAgIC8vIG51bTEgPSBudW0xICsgMTtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2codi5wZXRfaWQrXCJfXCIrdi5wZXRfcXVhbGl0eSxudW0xKTtcclxuICAgICAgICAvLyAgICAgLy8gdGhpcy5wZXRfaWRfbnVtW3YucGV0X2lkK1wiX1wiK3YucGV0X3F1YWxpdHldID0gbnVtMTtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2codi5wZXRfaWQrXCJfXCIrdi5wZXRfcXVhbGl0eSx0aGlzLnBldF9pZF9udW1bdi5wZXRfaWQrXCJfXCIrdi5wZXRfcXVhbGl0eV0pO1xyXG4gICAgICAgIC8vICAgICAvLyBsZXQgbnVtMiA9IHRoaXMucGV0X3F1YWxpdHlfbnVtW3YucGV0X3F1YWxpdHldIHx8IDA7XHJcbiAgICAgICAgLy8gICAgIC8vIG51bTIgPSBudW0yICsgMTtcclxuICAgICAgICAvLyAgICAgLy8gdGhpcy5wZXRfcXVhbGl0eV9udW1bdi5wZXRfcXVhbGl0eV0gPSBudW0yO1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLnBldF9pZF9udW0uaGFzKHYucGV0X2lkK1wiX1wiK3YucGV0X3F1YWxpdHkpKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGV0X2lkX251bS5zZXQodi5wZXRfaWQrXCJfXCIrdi5wZXRfcXVhbGl0eSx0aGlzLnBldF9pZF9udW0uZ2V0KHYucGV0X2lkK1wiX1wiK3YucGV0X3F1YWxpdHkpICsgMSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGV0X2lkX251bS5zZXQodi5wZXRfaWQrXCJfXCIrdi5wZXRfcXVhbGl0eSwxKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZih0aGlzLnBldF9xdWFsaXR5X251bS5oYXModi5wZXRfcXVhbGl0eSkpe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5wZXRfcXVhbGl0eV9udW0uc2V0KHYucGV0X3F1YWxpdHksdGhpcy5wZXRfcXVhbGl0eV9udW0uZ2V0KHYucGV0X3F1YWxpdHkpICsgMSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGV0X3F1YWxpdHlfbnVtLnNldCh2LnBldF9xdWFsaXR5LDEpICAgIFxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0NhbkFkdmFuY2UoaW5mbzpQZXRJbmZvKTpib29sZWFue1xyXG4gICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy8gaWYoaW5mby5wZXRfcXVhbGl0eTw9MSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIC8vIGlmKGluZm8ucGV0X3F1YWxpdHkgPT0gU3Bpcml0TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5TGltaXQoaW5mby5wZXRfaWQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IGRhdGEgPSBTcGlyaXRRdWFsaXR5QWR2YW5jZWRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblNwaXJpdFF1YWxpdHlBZHZhbmNlZChpbmZvLnBldF9xdWFsaXR5KTtcclxuICAgICAgICAvLyBpZihkYXRhLkNvc3RJdHNlbGZOdW0gIT0gMCl7XHJcbiAgICAgICAgLy8gICAgIC8vIGlmKCh0aGlzLnBldF9pZF9udW1baW5mby5wZXRfaWQgKyBcIl9cIiArIGRhdGEuQ29zdEl0c2VsZlF1YWxpdHldIHx8IDApID49IChkYXRhLkNvc3RJdHNlbGZOdW0gKyAxKSl7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgLy8gfVxyXG4gICAgICAgIC8vICAgICBpZih0aGlzLnBldF9pZF9udW0uaGFzKGluZm8ucGV0X2lkICsgXCJfXCIgKyBkYXRhLkNvc3RJdHNlbGZRdWFsaXR5KSl7XHJcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLnBldF9pZF9udW0uZ2V0KGluZm8ucGV0X2lkICsgXCJfXCIgKyBkYXRhLkNvc3RJdHNlbGZRdWFsaXR5KSA+PSAoaW5mby5wZXRfcXVhbGl0eSA9PSBkYXRhLkNvc3RJdHNlbGZRdWFsaXR5ID8gZGF0YS5Db3N0SXRzZWxmTnVtKzEgOiBkYXRhLkNvc3RJdHNlbGZOdW0pKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgLy8gICAgIC8vIGlmKHRoaXMucGV0X3F1YWxpdHlfbnVtW2RhdGEuQ29zdFNhbWVUeXBlUXVhbGl0eV0gPj0gKGRhdGEuQ29zdFNhbWVUeXBlTnVtICsgMSkpe1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gICAgIC8vIH1cclxuICAgICAgICAvLyAgICAgaWYodGhpcy5wZXRfcXVhbGl0eV9udW0uaGFzKGRhdGEuQ29zdFNhbWVUeXBlUXVhbGl0eSkpe1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5wZXRfcXVhbGl0eV9udW0uZ2V0KGRhdGEuQ29zdFNhbWVUeXBlUXVhbGl0eSkgPj0gKGluZm8ucGV0X3F1YWxpdHkgPT0gZGF0YS5Db3N0U2FtZVR5cGVRdWFsaXR5ID8gZGF0YS5Db3N0U2FtZVR5cGVOdW0gKyAxOmRhdGEuQ29zdFNhbWVUeXBlTnVtKSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIOiHquWumuS5ieaOkuW6j1xyXG4gICAgcGV0SW5mb1NvcnQoYTpQZXRJbmZvLGI6UGV0SW5mbyk6bnVtYmVye1xyXG4gICAgICAgIGxldCBjYiA9IHRoaXMuY2hlY2tDYW5BZHZhbmNlKGIpO1xyXG4gICAgICAgIGlmKGNiKXtcclxuICAgICAgICAgICAgbGV0IGNhID0gdGhpcy5jaGVja0NhbkFkdmFuY2UoYSlcclxuICAgICAgICAgICAgaWYoY2Epe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIucGV0X2xldmVsIC0gYS5wZXRfbGV2ZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBiLnBldF9sZXZlbCAtIGEucGV0X2xldmVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RQZXRMaXN0KGxpc3Q6UGV0SW5mb1tdLHRhcmdldDpib29sZWFuKTpQZXRJbmZvW117XHJcbiAgICAgICAgbGV0IHRlbXBMaXN0OiBQZXRJbmZvW10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBsaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrQ2FuQWR2YW5jZShsaXN0W2ldKSA9PSB0YXJnZXQpe1xyXG4gICAgICAgICAgICAgICAgdGVtcExpc3QucHVzaChsaXN0W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVtcExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja0FkdmFuY2VCdG4oKXtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vIGlmKHRoaXMudGFyZ2V0SW5mbyAhPSBudWxsKXtcclxuICAgICAgICAvLyAgICAgaWYodGhpcy50YXJnZXRJbmZvLkNvc3RJdHNlbGZOdW0gPT0gMiB8fCB0aGlzLnRhcmdldEluZm8uQ29zdFNhbWVUeXBlTnVtID09IDIpe1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy5jaG9vc2VJdGVtMiAhPSBudWxsICYmIHRoaXMuY2hvb3NlSXRlbTMgIT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGJvdHRvbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJvdHRvbVwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgb2xkUGV0SW5mbyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2hvb3NlSXRlbTEpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVQZXQodGhpcy5jaG9vc2VJdGVtMik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZVBldCh0aGlzLmNob29zZUl0ZW0zKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0UGV0UXVhbGl0eSh0aGlzLmNob29zZUl0ZW0xLHRoaXMudGFyZ2V0SW5mby5UYXJnZXRRdWFsaXR5KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFBldExpc3QoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkubG9hZEFsbFBldERhdGEoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoXCIzXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIjJcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BldEFkdmFuY2VTaG93VWkobnVsbCx0aGlzLmNob29zZUl0ZW0xLG9sZFBldEluZm8pO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyBzd2l0Y2goU3Bpcml0TWVzc2FnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcGlyaXRSYXJpdHkodGhpcy5jaG9vc2VJdGVtMi5wZXRfaWQpKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgY2FzZSAyOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiusOW9lei/m+mYtua2iOiAl+eahOWPsuivl+eogOacieW6puWuoOeJqSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgY2FzZSAzOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiusOW9lei/m+mYtua2iOiAl+eahOelnuivneeogOacieW6puWuoOeJqSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgY2FzZSA0OlxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLuiusOW9lei/m+mYtua2iOiAl+eahFNQ56iA5pyJ5bqm5a6g54mpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gc3dpdGNoKFNwaXJpdE1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Bpcml0UmFyaXR5KHRoaXMuY2hvb3NlSXRlbTMucGV0X2lkKSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgIGNhc2UgMjpcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXov5vpmLbmtojogJfnmoTlj7Lor5fnqIDmnInluqblrqDniakpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgIGNhc2UgMzpcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXov5vpmLbmtojogJfnmoTnpZ7or53nqIDmnInluqblrqDniakpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgIGNhc2UgNDpcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXov5vpmLbmtojogJfnmoRTUOeogOacieW6puWuoOeJqSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXkuI3lkIzlk4HotKjnmoTmiJDlip/ov5vpmLbmrKHmlbDlrozmiJDml7blk4HotKggKyB0aGlzLmNob29zZUl0ZW0xLnBldF9xdWFsaXR5KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnRhcmdldEluZm8gPSBudWxsO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY2hvb3NlSXRlbTEgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY2hvb3NlSXRlbTIgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuY2hvb3NlSXRlbTMgPSBudWxsO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIHRoaXMuc29ydExpc3QoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoXCLov5vpmLbmiJDlip/vvIFcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0hlY2hlbmcpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXlrqDnianov5vpmLbmiJDlip8pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBpZih0aGlzLnRhcmdldEluZm8uQ29zdEl0c2VsZk51bSA9PSAxIHx8IHRoaXMudGFyZ2V0SW5mby5Db3N0U2FtZVR5cGVOdW0gPT0gMSl7XHJcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLmNob29zZUl0ZW0yICE9IG51bGwpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBib3R0b20gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJib3R0b21cIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IG9sZFBldEluZm8gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNob29zZUl0ZW0xKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVtb3ZlUGV0KHRoaXMuY2hvb3NlSXRlbTIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQZXRRdWFsaXR5KHRoaXMuY2hvb3NlSXRlbTEsdGhpcy50YXJnZXRJbmZvLlRhcmdldFF1YWxpdHkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsUGV0TGlzdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5sb2FkQWxsUGV0RGF0YSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZShcIjNcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgYm90dG9tLmdldENoaWxkQnlOYW1lKFwiMlwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGV0QWR2YW5jZVNob3dVaShudWxsLHRoaXMuY2hvb3NlSXRlbTEsb2xkUGV0SW5mbyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vIHN3aXRjaChTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaXJpdFJhcml0eSh0aGlzLmNob29zZUl0ZW0yLnBldF9pZCkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6K6w5b2V6L+b6Zi25raI6ICX55qE5Y+y6K+X56iA5pyJ5bqm5a6g54mpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICBjYXNlIDM6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6K6w5b2V6L+b6Zi25raI6ICX55qE56We6K+d56iA5pyJ5bqm5a6g54mpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICBjYXNlIDQ6XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6K6w5b2V6L+b6Zi25raI6ICX55qEU1DnqIDmnInluqblrqDniakpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6K6w5b2V5LiN5ZCM5ZOB6LSo55qE5oiQ5Yqf6L+b6Zi25qyh5pWw5a6M5oiQ5pe25ZOB6LSoICsgdGhpcy5jaG9vc2VJdGVtMS5wZXRfcXVhbGl0eSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy50YXJnZXRJbmZvID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNob29zZUl0ZW0xID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNob29zZUl0ZW0yID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNob29zZUl0ZW0zID0gbnVsbDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyB0aGlzLnNvcnRMaXN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKFwi6L+b6Zi25oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9IZWNoZW5nKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6K6w5b2V5a6g54mp6L+b6Zi25oiQ5YqfKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICAvLyBpZih0aGlzLnRhcmdldEluZm8uQ29zdEl0c2VsZk51bSAhPSAwKXtcclxuICAgICAgICAvLyAgICAgLy8gICAgIGlmKHRoaXMudGFyZ2V0SW5mby5Db3N0U2FtZVR5cGVOdW0gPT0gMil7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgaWYodGhpcy5jaG9vc2VJdGVtMiE9IG51bGwgJiYgdGhpcy5jaG9vc2VJdGVtMyAhPSBudWxsKXtcclxuXHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgaWYodGhpcy5jaG9vc2VJdGVtMiAhPSBudWxsKXtcclxuXHJcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICAvLyB9XHJcbiAgICAgICAgLy8gICAgIC8vIGVsc2V7XHJcbiAgICAgICAgLy8gICAgIC8vICAgICBpZih0aGlzLnRhcmdldEluZm8uQ29zdFNhbWVUeXBlTnVtID09IDIpe1xyXG4gICAgICAgIC8vICAgICAvLyAgICAgICAgIGlmKHRoaXMuY2hvb3NlSXRlbTIhPSBudWxsICYmIHRoaXMuY2hvb3NlSXRlbTMgIT0gbnVsbCl7XHJcblxyXG4gICAgICAgIC8vICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgLy8gfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgIC8vIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX0NIRUNLLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaWduSW4pO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=