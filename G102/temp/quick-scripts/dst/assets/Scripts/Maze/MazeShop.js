
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeShop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZVNob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQXlDO0FBQ3pDLHNEQUFxRDtBQUNyRCxzREFBNEQ7QUFDNUQsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUUzRCxvRUFBK0Q7QUFJL0QsMERBQXFEO0FBRXJELGlEQUE0QztBQUM1Qyx1REFBdUQ7QUFDdkQsOENBQW9EO0FBQ3BELDZDQUFxRTtBQUNyRSxtQ0FBOEI7QUFHeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVc7SUFBakQ7UUFBQSxxRUF3R0M7UUF2R0csVUFBVTtRQUNWLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsZUFBUyxHQUFTLEtBQUssQ0FBQzs7SUFvRzVCLENBQUM7SUFsR0csMkJBQVEsR0FBUixVQUFTLEVBQVMsRUFBQyxPQUFlO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCx5QkFBTSxHQUFOO1FBQ0ksSUFBSTtRQUNKLElBQUksUUFBUSxHQUFDLDRCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRixJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlHLElBQUksWUFBWSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFELFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0csSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzVCLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM3QixJQUFHLElBQUksQ0FBQyxTQUFTLEVBQ2pCO1lBQ0ksSUFBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFFLElBQUksQ0FBQyxNQUFNLEVBQUM7Z0JBQ3JELEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO2dCQUNsQixNQUFNLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQzthQUN2QjtpQkFBSTtnQkFDRCxLQUFLLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztnQkFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7YUFDdEI7U0FDSjtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsK0JBQVksR0FBWjtRQUNJLElBQUksS0FBSyxHQUFDLDJCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQztRQUNwRCxLQUFLLEdBQUMsS0FBSyxHQUFDLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUMsQ0FBQSxrQ0FBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFDO1FBQ3RGLElBQUksYUFBYSxHQUFDLGtDQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RSxPQUFNO1FBQ04sK0VBQStFO1FBQy9FLGVBQWU7UUFDZiw2RUFBNkU7UUFDN0UsNkJBQTZCO1FBQzdCLHFCQUFxQjtRQUNyQixTQUFTO1FBQ1QscUVBQXFFO1FBQ3JFLCtDQUErQztRQUMvQyw4Q0FBOEM7UUFDOUMsb0NBQW9DO1FBQ3BDLHlDQUF5QztRQUN6Qyw0RUFBNEU7UUFDNUUsWUFBWTtRQUNaLGdDQUFnQztRQUNoQyxRQUFRO1FBQ1IsZUFBZTtRQUNmLCtCQUErQjtRQUMvQiwyQ0FBMkM7UUFDM0MsUUFBUTtRQUNSLGlEQUFpRDtRQUNqRCxJQUFJO1FBQ0osc0RBQXNEO1FBQ3RELGlIQUFpSDtRQUNqSCxvQ0FBb0M7UUFDcEMsNkJBQTZCO1FBQzdCLHNLQUFzSztRQUN0SywrQkFBK0I7UUFDL0IsOENBQThDO1FBQzlDLGtCQUFrQjtRQUNsQixvSEFBb0g7UUFDcEgsb0NBQW9DO1FBQ3BDLGdDQUFnQztRQUNoQyxjQUFjO1FBQ2QsYUFBYTtRQUNiLDZDQUE2QztRQUM3QyxzQkFBc0I7UUFDdEIsd0hBQXdIO1FBQ3hILHdDQUF3QztRQUN4QyxvQ0FBb0M7UUFDcEMsa0JBQWtCO1FBQ2xCLFlBQVk7UUFDWixRQUFRO1FBRVIsSUFBSTtJQUNSLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxnQkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELDZCQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxzREFBc0Q7UUFDdEQseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELGdCQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDcEIsQ0FBQztJQXRHZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXdHNUI7SUFBRCxlQUFDO0NBeEdELEFBd0dDLENBeEdxQyxxQkFBVyxHQXdHaEQ7a0JBeEdvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVxdWlwSXRlbSBmcm9tIFwiLi4vRXF1aXBtZW50L1VpL0VxdWlwSXRlbVwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFByb3AgZnJvbSBcIi4uL1Byb3AvUHJvcFwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG4vLyBpbXBvcnQgeyBSb2d1ZVNob3BNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZVNob3BcIjtcclxuaW1wb3J0IHsgUm9ndWVUZXh0TWFuYWdlciB9IGZyb20gXCIuL0RhdGEvUm9ndWVUZXh0XCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyLCBQcm9wSW5kZXgsIFNob3BQcm9wTGlzdCB9IGZyb20gXCIuL01hemVNYW5hZ2VyXCI7XHJcbmltcG9ydCBNYXplVWkgZnJvbSBcIi4vTWF6ZVVpXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXplU2hvcCBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuICAgIC8qKuagvOWtkGlkICovXHJcbiAgICBib3hfaWQ6bnVtYmVyPTA7XHJcbiAgICBoZXhhZ29uX3R5cGU6bnVtYmVyPTQ7XHJcbiAgICBpc19jYW5fZ286Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBpbml0RGF0YShpZDpudW1iZXIsaXNDYW5Hbzpib29sZWFuKXtcclxuICAgICAgICB0aGlzLmJveF9pZD1pZDtcclxuICAgICAgICB0aGlzLmlzX2Nhbl9nbz1pc0NhbkdvO1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpKCl7XHJcbiAgICAgICAgLy/moIfpophcclxuICAgICAgICBsZXQganNvbkRhdGE9Um9ndWVUZXh0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Sb2d1ZVRleHQodGhpcy5oZXhhZ29uX3R5cGUpO1xyXG4gICAgICAgIGxldCB0aXRsZUxhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndGl0bGVMYWJlbCcpO1xyXG4gICAgICAgIHRpdGxlTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoanNvbkRhdGEuUm9ndWV0aXRsZV9JRCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnRMYWJlbCcpO1xyXG4gICAgICAgIGNvbnRlbnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChqc29uRGF0YS5Sb2d1ZVRleHRfSUQpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGJ0bk5vPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuTm8nKTtcclxuICAgICAgICBidG5Oby5hY3RpdmU9dGhpcy5pc19jYW5fZ287XHJcbiAgICAgICAgbGV0IGJ0blllcz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0blllcycpO1xyXG4gICAgICAgIGJ0blllcy5hY3RpdmU9dGhpcy5pc19jYW5fZ287XHJcbiAgICAgICAgaWYodGhpcy5pc19jYW5fZ28pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBhc3NpbmdJZCgpPT10aGlzLmJveF9pZCl7XHJcbiAgICAgICAgICAgICAgICBidG5Oby5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0blllcy5hY3RpdmU9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYnRuTm8uYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnRuWWVzLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1MaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEl0ZW1MaXN0KCl7XHJcbiAgICAgICAgbGV0IGxldmVsPUxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmZpbmlzaF9sZXZlbCsxO1xyXG4gICAgICAgIGxldmVsPWxldmVsPk1pc3Npb25MZXZlbE1hbmFnZXIuZ2V0TWF4TGV2ZWwoKT9NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldE1heExldmVsKCk6bGV2ZWw7XHJcbiAgICAgICAgbGV0IGZpbmlzaENoYXB0ZXI9TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIobGV2ZWwpO1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICAgIC8vIGxldCBqc29uRGF0YT1Sb2d1ZVNob3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvblJvZ3VlU2hvcChmaW5pc2hDaGFwdGVyKTtcclxuICAgICAgICAvLyAvL+WIpOaWreaYr+S4jeaYr+esrOS4gOasoeaJk+W8gFxyXG4gICAgICAgIC8vIGxldCBsaXN0OlByb3BJbmRleFtdPU1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QVByb3BJbmRleCh0aGlzLmJveF9pZCk7XHJcbiAgICAgICAgLy8gbGV0IHNhbGVBcnI9WzAuMiwwLjMsMC40XTtcclxuICAgICAgICAvLyBpZihsaXN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgbGV0IGl0ZW1JbmRleHM9TXlUb29sLmdldFdlaWdodEluZGV4cyhqc29uRGF0YS5Sb2d1ZVdlaWdodCw0KTtcclxuICAgICAgICAvLyAgICAgLy/mipjmiaMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8aXRlbUluZGV4cy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcHJvcEluZGV4OlByb3BJbmRleD17XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgcHJvcF9pbmRleDogaXRlbUluZGV4c1tpXSxcclxuICAgICAgICAvLyAgICAgICAgICAgICBwcm9wX3NhbGU6IHNhbGVBcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnNhbGVBcnIubGVuZ3RoKV0sXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBsaXN0LnB1c2gocHJvcEluZGV4KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBsZXQgYWw9e1xyXG4gICAgICAgIC8vICAgICAgICAgYm94X2lkOiB0aGlzLmJveF9pZCxcclxuICAgICAgICAvLyAgICAgICAgIHByb3BfbGlzdDogbGlzdCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRTaG9wUHJvcChhbCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBpdGVtUm9vdD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW1fcm9vdCcpO1xyXG4gICAgICAgIC8vIGxldCBwYWM9dGhpcy5pc19jYW5fZ28mJk1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmlnaHRpbmdJZCgpPT10aGlzLmJveF9pZD9Qcm9wQWN0aW9uLkJ1eTpQcm9wQWN0aW9uLkxvb2s7XHJcbiAgICAgICAgLy8gZm9yKGxldCBpPTA7IGk8bGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgIGxldCBpdGVtSW5kZXg9bGlzdFtpXTtcclxuICAgICAgICAvLyAgICAgbGV0IGl0ZW09UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVTYWxlUHJvcEl0ZW0oanNvbkRhdGEuUm9ndWVQcm9kdWN0TGlzdFtpdGVtSW5kZXgucHJvcF9pbmRleF0sanNvbkRhdGEuUm9ndWVQcm9kdWN0UXVhbnRpdHlbaXRlbUluZGV4LnByb3BfaW5kZXhdLHBhYyk7XHJcbiAgICAgICAgLy8gICAgIGl0ZW1Sb290LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbVRzPWl0ZW0uZ2V0Q29tcG9uZW50KEVxdWlwSXRlbSlcclxuICAgICAgICAvLyAgICAgaWYoaXRlbVRzKXtcclxuICAgICAgICAvLyAgICAgICAgIGl0ZW1Ucy5pbml0U2FsZUl0ZW0oUHJvcElkLkdlbSxqc29uRGF0YS5Sb2d1ZVByb2R1Y3RQcmljZVtpdGVtSW5kZXgucHJvcF9pbmRleF0saXRlbUluZGV4LnByb3Bfc2FsZSoxMDApO1xyXG4gICAgICAgIC8vICAgICAgICAgaXRlbVRzLmFkZEJ1eUxpc3RlbigoKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGl0ZW1Ucy5zb2xkT3V0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcHJvcFRzPWl0ZW0uZ2V0Q29tcG9uZW50KFByb3ApXHJcbiAgICAgICAgLy8gICAgICAgICBpZihwcm9wVHMpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHByb3BUcy5pbml0U2FsZUl0ZW0oUHJvcElkLkdlbSxqc29uRGF0YS5Sb2d1ZVByb2R1Y3RQcmljZVtpdGVtSW5kZXgucHJvcF9pbmRleF0saXRlbUluZGV4LnByb3Bfc2FsZSoxMDApO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHByb3BUcy5hZGRCdXlMaXN0ZW4oKCk9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcHJvcFRzLnNvbGRPdXQoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5ZZXMoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0UGFzc2luZ0lkKHRoaXMuYm94X2lkKTtcclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEZpZ2h0aW5nSWQodGhpcy5ib3hfaWQpO1xyXG4gICAgICAgIE1hemVVaS5nZXRJbnN0YW5jZSgpLnJlZnJlc2hGbG9vcigpO1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUucm9ndWXnjqnms5XllYblupfkuovku7YpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTm8oKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRQYXNzaW5nSWQodGhpcy5ib3hfaWQpO1xyXG4gICAgICAgIE1hemVNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkTWF6ZVBhc3NlZElkKHRoaXMuYm94X2lkKTtcclxuICAgICAgICBNYXplVWkuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoRmxvb3IoKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==