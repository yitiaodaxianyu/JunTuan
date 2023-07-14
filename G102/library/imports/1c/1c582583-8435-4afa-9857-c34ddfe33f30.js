"use strict";
cc._RF.push(module, '1c582WDhDVK+phXw03f4z8w', 'MazeShop');
// Scripts/Maze/MazeShop.ts

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
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
// import { RogueShopManager } from "./Data/RogueShop";
var RogueText_1 = require("./Data/RogueText");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeShop = /** @class */ (function (_super) {
    __extends(MazeShop, _super);
    function MazeShop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**格子id */
        _this.box_id = 0;
        _this.hexagon_type = 4;
        _this.is_can_go = false;
        return _this;
    }
    MazeShop.prototype.initData = function (id, isCanGo) {
        this.box_id = id;
        this.is_can_go = isCanGo;
        this.initUi();
    };
    MazeShop.prototype.initUi = function () {
        //标题
        var jsonData = RogueText_1.RogueTextManager.getInstance().getJsonRogueText(this.hexagon_type);
        var titleLabel = this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.Roguetitle_ID);
        var contentLabel = this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.RogueText_ID);
        var btnNo = this.node.getChildByName('btnNo');
        btnNo.active = this.is_can_go;
        var btnYes = this.node.getChildByName('btnYes');
        btnYes.active = this.is_can_go;
        if (this.is_can_go) {
            if (MazeManager_1.MazeManager.getInstance().getPassingId() == this.box_id) {
                btnNo.active = true;
                btnYes.active = false;
            }
            else {
                btnNo.active = false;
                btnYes.active = true;
            }
        }
        this.initItemList();
    };
    MazeShop.prototype.initItemList = function () {
        var level = LevelManager_1.LevelManager.getInstance().finish_level + 1;
        level = level > MissionLevel_1.MissionLevelManager.getMaxLevel() ? MissionLevel_1.MissionLevelManager.getMaxLevel() : level;
        var finishChapter = MissionLevel_1.MissionLevelManager.getInstance().getChapter(level);
        return;
        // let jsonData=RogueShopManager.getInstance().getJsonRogueShop(finishChapter);
        // //判断是不是第一次打开
        // let list:PropIndex[]=MazeManager.getInstance().getAPropIndex(this.box_id);
        // let saleArr=[0.2,0.3,0.4];
        // if(list.length>0){
        // }else{
        //     let itemIndexs=MyTool.getWeightIndexs(jsonData.RogueWeight,4);
        //     //折扣                                    
        //     for(let i=0; i<itemIndexs.length; i++){
        //         let propIndex:PropIndex={
        //             prop_index: itemIndexs[i],
        //             prop_sale: saleArr[Math.floor(Math.random()*saleArr.length)],
        //         }
        //         list.push(propIndex);
        //     }
        //     let al={
        //         box_id: this.box_id,
        //         prop_list: list,                
        //     }
        //     MazeManager.getInstance().setShopProp(al);
        // }
        // let itemRoot=this.node.getChildByName('item_root');
        // let pac=this.is_can_go&&MazeManager.getInstance().getFightingId()==this.box_id?PropAction.Buy:PropAction.Look;
        // for(let i=0; i<list.length; i++){
        //     let itemIndex=list[i];
        //     let item=PropManager.getInstance().createSalePropItem(jsonData.RogueProductList[itemIndex.prop_index],jsonData.RogueProductQuantity[itemIndex.prop_index],pac);
        //     itemRoot.addChild(item);
        //     let itemTs=item.getComponent(EquipItem)
        //     if(itemTs){
        //         itemTs.initSaleItem(PropId.Gem,jsonData.RogueProductPrice[itemIndex.prop_index],itemIndex.prop_sale*100);
        //         itemTs.addBuyListen(()=>{
        //             itemTs.soldOut();
        //         });
        //     }else{
        //         let propTs=item.getComponent(Prop)
        //         if(propTs){
        //             propTs.initSaleItem(PropId.Gem,jsonData.RogueProductPrice[itemIndex.prop_index],itemIndex.prop_sale*100);
        //             propTs.addBuyListen(()=>{
        //                 propTs.soldOut();
        //             });
        //         }
        //     }
        // }
    };
    MazeShop.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        MazeManager_1.MazeManager.getInstance().setPassingId(this.box_id);
        MazeManager_1.MazeManager.getInstance().setFightingId(this.box_id);
        MazeUi_1.default.getInstance().refreshFloor();
        _super.prototype.onClose.call(this);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法商店事件);
    };
    MazeShop.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //MazeManager.getInstance().setPassingId(this.box_id);
        MazeManager_1.MazeManager.getInstance().addMazePassedId(this.box_id);
        MazeUi_1.default.getInstance().refreshFloor();
        _super.prototype.onClose.call(this);
    };
    MazeShop = __decorate([
        ccclass
    ], MazeShop);
    return MazeShop;
}(UIComponent_1.default));
exports.default = MazeShop;

cc._RF.pop();