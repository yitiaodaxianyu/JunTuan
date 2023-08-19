
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/StoreHeroUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6c52wfvWtGfKYgLkSqFMx8', 'StoreHeroUi');
// Scripts/Store/StoreHeroUi.ts

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
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var HttpManager_1 = require("../NetWork/HttpManager");
var Item_1 = require("../Prop/Data/Item");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var MyTool_1 = require("../Tools/MyTool");
var Turmtable_1 = require("../Turntable/Turmtable");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var UserData_1 = require("../UserData");
var DrawCardInformation_1 = require("./DrawCardInformation");
var StoreHeroIconItem_1 = require("./StoreHeroIconItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreHeroUi = /** @class */ (function (_super) {
    __extends(StoreHeroUi, _super);
    function StoreHeroUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_icon_item = null;
        _this.rewardList = [];
        _this.index = 0;
        _this.content = null;
        return _this;
    }
    // is_over:boolean = false;
    StoreHeroUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    // todo 传递一个类型判断    1英雄，2装备，3宠物
    StoreHeroUi.prototype.initData = function (rewardList) {
        var _this = this;
        this.node.getChildByName("bgg").active = true;
        this.rewardList = rewardList;
        this.content = this.node.getChildByName("content");
        this.content.getComponent(cc.Layout).enabled = true;
        this.content.removeAllChildren();
        var showLatter = this.node.getChildByName("showLatter");
        if (rewardList.length == 1) {
            this.content.getComponent(cc.Layout).enabled = false;
        }
        else {
            this.content.getComponent(cc.Layout).enabled = true;
        }
        this.index = 0;
        var prizeHeroData = DrawCardInformation_1.DrawCardInformationManager.getInstance().getJsonDrawCardInformation(1001);
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
            showLatter.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            showLatter.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_1;
        }
        else {
            showLatter.getChildByName("costIcon1").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            showLatter.getChildByName("num1").getComponent(cc.Label).string = "x" + prizeHeroData.OneDrawPropsSpend_2;
        }
        if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
            showLatter.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_1);
            showLatter.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_1;
        }
        else {
            showLatter.getChildByName("costIcon10").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(prizeHeroData.OneDrawPropsID_2);
            showLatter.getChildByName("num10").getComponent(cc.Label).string = "x" + prizeHeroData.TenDrawPropsSpend_2;
        }
        var heroBtn1 = showLatter.getChildByName("btn1");
        var heroBtn10 = showLatter.getChildByName("btn10");
        heroBtn10.getChildByName('red').active = GameData_1.default.getInstance().getHeroRecruitingRedTip();
        heroBtn1.off(cc.Node.EventType.TOUCH_END);
        heroBtn10.off(cc.Node.EventType.TOUCH_END);
        heroBtn1.off(cc.Node.EventType.TOUCH_START);
        heroBtn10.off(cc.Node.EventType.TOUCH_START);
        heroBtn1.on(cc.Node.EventType.TOUCH_START, function () {
            cc.tween(heroBtn1).to(0.2, { scale: 0.9 }).to(0.2, { scale: 1 }).start();
        });
        heroBtn10.on(cc.Node.EventType.TOUCH_START, function () {
            cc.tween(heroBtn10).to(0.2, { scale: 0.9 }).to(0.2, { scale: 1 }).start();
        });
        heroBtn1.on(cc.Node.EventType.TOUCH_END, function () {
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.OneDrawPropsSpend_1) {
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.OneDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.OneDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
            }
            else {
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.OneDrawPropsSpend_2;
            }
            if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                UIManager_1.UIManager.getInstance().closeAllUiDialog(UIConfig_1.UILayerLevel.One);
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Turntable, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(Turmtable_1.default).initUi();
                    }, }); //转盘
                return;
            }
            // if(IsDebug) costNum = 0;
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(1, 1, costId, costNum), true).then(function (data) {
                if (data) {
                    PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager_1.default.getInstance().refreshGemShow();
                    PropManager_1.PropManager.getInstance().changePropNum(data[0].dropId, data[0].dropNum);
                    PropManager_1.PropManager.getInstance().saveAllPropNum();
                    _this.initData(data);
                    // this.onClose();
                    // UIManager.getInstance().showUiDialog(UIPath.StoreHeroUi,UILayerLevel.One,{
                    //     onCompleted:(uiNode)=>{
                    //         uiNode.getComponent(StoreHeroUi).init(null);
                    //         uiNode.getComponent(StoreHeroUi).initData(data);
                    //     },
                    // });
                }
            });
        });
        heroBtn10.on(cc.Node.EventType.TOUCH_END, function () {
            var costId = 0;
            var costNum = 0;
            if (PropManager_1.PropManager.getInstance().getPropNum(prizeHeroData.OneDrawPropsID_1) >= prizeHeroData.TenDrawPropsSpend_1) {
                costId = prizeHeroData.OneDrawPropsID_1;
                costNum = prizeHeroData.TenDrawPropsSpend_1;
                // 以下为后端未存消费券的处理，当后端存储消费券时，使用上面两行代码
                // PropManager.getInstance().changePropNum(prizeHeroData.OneDrawPropsID_1,-prizeHeroData.TenDrawPropsSpend_1);
                // costId = prizeHeroData.OneDrawPropsID_2;
                // costNum = 0;
            }
            else {
                costId = prizeHeroData.OneDrawPropsID_2;
                costNum = prizeHeroData.TenDrawPropsSpend_2;
            }
            if (PropManager_1.PropManager.getInstance().getPropNum(costId) < costNum) {
                // GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100041));
                // cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
                UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Turntable, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                        uiNode.getComponent(Turmtable_1.default).initUi();
                    }, }); //转盘
                return;
            }
            // if(IsDebug) costNum = 0;   
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.tryPrize, _this.getPrizeJsonString(2, 1, costId, costNum), true).then(function (data) {
                if (data) {
                    PropManager_1.PropManager.getInstance().changePropNum(costId, -costNum);
                    GameManager_1.default.getInstance().refreshGemShow();
                    var length = data.length;
                    var tempIndex = MyTool_1.default.randomRangeInt(0, 9);
                    for (var i = 0; i < length; i++) {
                        PropManager_1.PropManager.getInstance().changePropNum(data[i].dropId, data[i].dropNum);
                    }
                    var temp = data[9];
                    data[9] = data[tempIndex];
                    data[tempIndex] = temp;
                    PropManager_1.PropManager.getInstance().saveAllPropNum();
                    _this.initData(data);
                    heroBtn10.getChildByName('red').active = GameData_1.default.getInstance().getHeroRecruitingRedTip();
                    EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Shop);
                    // this.onClose();
                    // UIManager.getInstance().showUiDialog(UIPath.StoreHeroUi,UILayerLevel.One,{
                    //     onCompleted:(uiNode)=>{
                    //         uiNode.getComponent(StoreHeroUi).init(null);
                    //         uiNode.getComponent(StoreHeroUi).initData(data);
                    //     },
                    // });
                }
            });
        });
        showLatter.active = false;
        // let bg=this.node.getChildByName('bg');
        // bg.off(cc.Node.EventType.TOUCH_START);
        this.showCard();
    };
    StoreHeroUi.prototype.showCard = function () {
        var _this = this;
        var item = cc.instantiate(this.hero_icon_item);
        item.name = "item" + this.index;
        var info = Item_1.ItemManager.getInstance().getJsonItem(this.rewardList[this.index].dropId);
        var card = item.getChildByName("cardBg");
        card.getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpFrameByPropType(info.ItemID);
        card.getChildByName("mask").getComponentInChildren(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(info.ItemID);
        card.getChildByName("quality").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Text_Quality_" + info.Quality);
        card.getChildByName("num").getComponent(cc.Label).string = this.rewardList[this.index].dropNum + '';
        item.getChildByName("frontLight").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("DiGuang_" + info.Quality);
        var animation = item.getComponent(cc.Animation);
        if (info.Quality < 3) {
            // 普通
            var state = animation.play("store_hero_C");
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_ChouKa1);
            if (this.rewardList.length == 1) {
                state.speed = 1;
            }
            else {
                state.speed = 1.8;
            }
        }
        else if (info.Quality == 3) {
            // S
            var state = animation.play("store_hero_S");
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Chouka2);
            item.getChildByName("backLight").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("BeiGuang_S");
            item.getChildByName("flowwingLight").getComponent(cc.Animation).play("store_hero_flowwing_light_S");
            if (this.rewardList.length == 1) {
                state.speed = 1;
            }
            else {
                state.speed = 1.8;
            }
        }
        else {
            // SS
            var state = animation.play("store_hero_SS");
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Chouka2);
            item.getChildByName("backLight").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("BeiGuang_SS");
            item.getChildByName("flowwingLight").getComponent(cc.Animation).play("store_hero_flowwing_light_SS");
            if (this.rewardList.length == 1) {
                state.speed = 1;
            }
            else {
                state.speed = 1.8;
            }
        }
        this.content.addChild(item);
        item.getComponent(StoreHeroIconItem_1.default).init(function () {
            _this.showHero();
        });
        this.index++;
        animation.on("showHero", this.showHero, this);
        if (this.index < this.rewardList.length)
            animation.on("finished", this.showCard, this);
        else {
            this.scheduleOnce(function () {
                _this.node.getChildByName("showLatter").active = true;
                _this.node.getChildByName("bgg").active = false;
                _this.content.children.forEach(function (v, k) {
                    var button = v.addComponent(cc.Button);
                    button.transition = cc.Button.Transition.SCALE;
                    button.duration = 0.1;
                    button.zoomScale = 0.9;
                    var clickEvent = new cc.Component.EventHandler();
                    clickEvent.target = _this.node;
                    clickEvent.component = 'StoreHeroUi';
                    clickEvent.handler = 'onItemBtnClick';
                    clickEvent.customEventData = k + '';
                    button.clickEvents.push(clickEvent);
                });
            }, 0.5);
            // this.scheduleOnce(()=>{
            //     let bg=this.node.getChildByName('bg');
            //     bg.on(cc.Node.EventType.TOUCH_START,()=>{
            //         this.onClose();
            //     },this);
            // },1.5);
        }
    };
    StoreHeroUi.prototype.showHero = function () {
        // if(this.rewardList[this.index - 1].dropId > 110000 && 
        // TheStorageManager.getInstance().getNumber(StorageKey.StoreHeroID + this.rewardList[this.index - 1].dropId % 110000,0) == 0){
        //     let item = this.content.getChildByName("item" + (this.index - 1));
        //     item.getComponent(cc.Animation).pause();
        //     let indexTemp=this.index;
        //     UIManager.getInstance().showUiDialog(UIPath.StoreHeroShowUi,UILayerLevel.Two,{onCompleted:(uiNode)=>{
        //         uiNode.getComponent(StoreHeroShowUi).init({
        //             onClose:()=>{
        //                 item.getComponent(cc.Animation).resume();
        //             }
        //         });
        //         uiNode.getComponent(StoreHeroShowUi).initData(this.rewardList[indexTemp - 1].dropId % 110000);
        //     }}); 
        // }
    };
    /**
 *
 * @param type 抽奖类型 1-单抽 2-十连抽
 * @param drawTyep 抽奖类型 1-英雄,英雄碎片 2-装备 3-灵宠
 * @param costId 消耗道具id
 * @param costNum 消耗道具数量
 * @returns
 */
    StoreHeroUi.prototype.getPrizeJsonString = function (type, drawTyep, costId, costNum) {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            uid: uid,
            type: type,
            drawType: drawTyep,
            itemsId: costId,
            minusNum: costNum,
        });
    };
    StoreHeroUi.prototype.onItemBtnClick = function (e, index) {
        var i = Number(index);
        UIManager_1.UIManager.getInstance().showPropInfo({}, PropConfig_1.PropAction.Look, {
            prop_id: this.rewardList[i].dropId,
            prop_num: this.rewardList[i].dropNum,
        }, null, null);
    };
    __decorate([
        property(cc.Prefab)
    ], StoreHeroUi.prototype, "hero_icon_item", void 0);
    StoreHeroUi = __decorate([
        ccclass
    ], StoreHeroUi);
    return StoreHeroUi;
}(UIComponent_1.default));
exports.default = StoreHeroUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXFN0b3JlSGVyb1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFJekMsc0RBQWlFO0FBQ2pFLDBDQUFnRDtBQUNoRCxpREFBZ0Q7QUFDaEQsbURBQWtEO0FBQ2xELDBEQUFxRDtBQUdyRCxzREFBbUY7QUFDbkYsMENBQXFDO0FBQ3JDLG9EQUErQztBQUMvQyxpREFBNEM7QUFDNUMsMkNBQXNEO0FBRXRELDZDQUE0QztBQUM1Qyx3Q0FBbUM7QUFDbkMsNkRBQW1FO0FBQ25FLHlEQUFvRDtBQUc5QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBVztJQUFwRDtRQUFBLHFFQStSQztRQTVSRyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUVoQyxnQkFBVSxHQUFvQixFQUFFLENBQUM7UUFDakMsV0FBSyxHQUFVLENBQUMsQ0FBQztRQUNqQixhQUFPLEdBQVcsSUFBSSxDQUFDOztJQXdSM0IsQ0FBQztJQXRSRywyQkFBMkI7SUFFM0IsMEJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELCtCQUErQjtJQUMvQiw4QkFBUSxHQUFSLFVBQVMsVUFBMkI7UUFBcEMsaUJBZ0pDO1FBL0lHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFD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LENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDbEMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztTQUN2QyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBMVJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1k7SUFIZixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBK1IvQjtJQUFELGtCQUFDO0NBL1JELEFBK1JDLENBL1J3QyxxQkFBVyxHQStSbkQ7a0JBL1JvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IElzRGVidWcgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmV3YXJkSGVyb0RhdGEgfSBmcm9tIFwiLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24gfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBUdXJtdGFibGUgZnJvbSBcIi4uL1R1cm50YWJsZS9UdXJtdGFibGVcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgRHJhd0NhcmRJbmZvcm1hdGlvbk1hbmFnZXIgfSBmcm9tIFwiLi9EcmF3Q2FyZEluZm9ybWF0aW9uXCI7XHJcbmltcG9ydCBTdG9yZUhlcm9JY29uSXRlbSBmcm9tIFwiLi9TdG9yZUhlcm9JY29uSXRlbVwiO1xyXG5pbXBvcnQgU3RvcmVIZXJvU2hvd1VpIGZyb20gXCIuL1N0b3JlSGVyb1Nob3dVaVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZUhlcm9VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaGVyb19pY29uX2l0ZW06Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICByZXdhcmRMaXN0OlJld2FyZEhlcm9EYXRhW10gPSBbXTtcclxuICAgIGluZGV4Om51bWJlciA9IDA7XHJcbiAgICBjb250ZW50OmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8vIGlzX292ZXI6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgfVxyXG4gICAgLy8gdG9kbyDkvKDpgJLkuIDkuKrnsbvlnovliKTmlq0gICAgMeiLsembhO+8jDLoo4XlpIfvvIwz5a6g54mpXHJcbiAgICBpbml0RGF0YShyZXdhcmRMaXN0OlJld2FyZEhlcm9EYXRhW10pe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnZ1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmV3YXJkTGlzdCA9IHJld2FyZExpc3Q7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgbGV0IHNob3dMYXR0ZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzaG93TGF0dGVyXCIpO1xyXG4gICAgICAgIGlmKHJld2FyZExpc3QubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgIGxldCBwcml6ZUhlcm9EYXRhID0gRHJhd0NhcmRJbmZvcm1hdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRHJhd0NhcmRJbmZvcm1hdGlvbigxMDAxKTtcclxuICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0ocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xKSA+PSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc1NwZW5kXzEpe1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwiY29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMSk7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJudW0xXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc1NwZW5kXzE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvbjFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yKTtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcIm51bTFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzU3BlbmRfMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEpID49IHByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMSl7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvbjEwXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMSk7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJudW0xMFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgcHJpemVIZXJvRGF0YS5UZW5EcmF3UHJvcHNTcGVuZF8xO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwiY29zdEljb24xMFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzIpO1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwibnVtMTBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIHByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBoZXJvQnRuMSA9IHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG4xXCIpO1xyXG4gICAgICAgIGxldCBoZXJvQnRuMTAgPSBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwiYnRuMTBcIik7XHJcbiAgICAgICAgaGVyb0J0bjEwLmdldENoaWxkQnlOYW1lKCdyZWQnKS5hY3RpdmU9R2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5nZXRIZXJvUmVjcnVpdGluZ1JlZFRpcCgpO1xyXG4gICAgICAgIGhlcm9CdG4xLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xyXG4gICAgICAgIGhlcm9CdG4xMC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcclxuICAgICAgICBoZXJvQnRuMS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpO1xyXG4gICAgICAgIGhlcm9CdG4xMC5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpO1xyXG5cclxuICAgICAgICBoZXJvQnRuMS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwoKT0+e1xyXG4gICAgICAgICAgICBjYy50d2VlbihoZXJvQnRuMSkudG8oMC4yLHtzY2FsZTowLjl9KS50bygwLjIse3NjYWxlOjF9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGhlcm9CdG4xMC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwoKT0+e1xyXG4gICAgICAgICAgICBjYy50d2VlbihoZXJvQnRuMTApLnRvKDAuMix7c2NhbGU6MC45fSkudG8oMC4yLHtzY2FsZToxfSkuc3RhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBoZXJvQnRuMS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgbGV0IGNvc3RJZCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3N0TnVtID0gMDtcclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMSkgPj0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNTcGVuZF8xKXtcclxuICAgICAgICAgICAgICAgIGNvc3RJZCA9IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMTtcclxuICAgICAgICAgICAgICAgIGNvc3ROdW0gPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc1NwZW5kXzE7XHJcbiAgICAgICAgICAgICAgICAvLyDku6XkuIvkuLrlkI7nq6/mnKrlrZjmtojotLnliLjnmoTlpITnkIbvvIzlvZPlkI7nq6/lrZjlgqjmtojotLnliLjml7bvvIzkvb/nlKjkuIrpnaLkuKTooYzku6PnoIFcclxuICAgICAgICAgICAgICAgIC8vIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEsLXByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzU3BlbmRfMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3N0SWQgPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3N0TnVtID0gMDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb3N0SWQgPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzI7XHJcbiAgICAgICAgICAgICAgICBjb3N0TnVtID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNTcGVuZF8yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oY29zdElkKSA8IGNvc3ROdW0pe1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VBbGxVaURpYWxvZyhVSUxheWVyTGV2ZWwuT25lKTtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDQxKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5maW5kKCdDYW52YXMvc3RvcmVfdWkvc2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDIpO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUdXJtdGFibGUpLmluaXRVaSgpXHJcbiAgICAgICAgICAgICAgICB9LH0pOy8v6L2s55uYXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmKElzRGVidWcpIGNvc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudHJ5UHJpemUsdGhpcy5nZXRQcml6ZUpzb25TdHJpbmcoMSwxLGNvc3RJZCxjb3N0TnVtKSx0cnVlKS50aGVuKChkYXRhOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGNvc3RJZCwtY29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShkYXRhWzBdLmRyb3BJZCxkYXRhWzBdLmRyb3BOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlN0b3JlSGVyb1VpLFVJTGF5ZXJMZXZlbC5PbmUse1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9VaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU3RvcmVIZXJvVWkpLmluaXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBoZXJvQnRuMTAub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgIGxldCBjb3N0SWQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEpID49IHByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMSl7XHJcbiAgICAgICAgICAgICAgICBjb3N0SWQgPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzE7XHJcbiAgICAgICAgICAgICAgICBjb3N0TnVtID0gcHJpemVIZXJvRGF0YS5UZW5EcmF3UHJvcHNTcGVuZF8xO1xyXG4gICAgICAgICAgICAgICAgLy8g5Lul5LiL5Li65ZCO56uv5pyq5a2Y5raI6LS55Yi455qE5aSE55CG77yM5b2T5ZCO56uv5a2Y5YKo5raI6LS55Yi45pe277yM5L2/55So5LiK6Z2i5Lik6KGM5Luj56CBXHJcbiAgICAgICAgICAgICAgICAvLyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xLC1wcml6ZUhlcm9EYXRhLlRlbkRyYXdQcm9wc1NwZW5kXzEpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29zdElkID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yO1xyXG4gICAgICAgICAgICAgICAgLy8gY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29zdElkID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yO1xyXG4gICAgICAgICAgICAgICAgY29zdE51bSA9IHByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGNvc3RJZCkgPCBjb3N0TnVtKXtcclxuICAgICAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDQxKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5maW5kKCdDYW52YXMvc3RvcmVfdWkvc2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDIpO1xyXG4gICAgICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5UdXJudGFibGUsVUlMYXllckxldmVsLk9uZSx7b25Db21wbGV0ZWQ6KHVpTm9kZSk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUdXJtdGFibGUpLmluaXRVaSgpXHJcbiAgICAgICAgICAgICAgICB9LH0pOy8v6L2s55uYXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmKElzRGVidWcpIGNvc3ROdW0gPSAwOyAgIFxyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudHJ5UHJpemUsdGhpcy5nZXRQcml6ZUpzb25TdHJpbmcoMiwxLGNvc3RJZCxjb3N0TnVtKSx0cnVlKS50aGVuKChkYXRhOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGNvc3RJZCwtY29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEluZGV4ID0gTXlUb29sLnJhbmRvbVJhbmdlSW50KDAsOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShkYXRhW2ldLmRyb3BJZCxkYXRhW2ldLmRyb3BOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGFbOV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVs5XSA9IGRhdGFbdGVtcEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhW3RlbXBJbmRleF0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9CdG4xMC5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0SGVyb1JlY3J1aXRpbmdSZWRUaXAoKTtcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Nob3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU3RvcmVIZXJvVWksVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFN0b3JlSGVyb1VpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9VaSkuaW5pdERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNob3dMYXR0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICAvLyBiZy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpO1xyXG4gICAgICAgIHRoaXMuc2hvd0NhcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2FyZCgpe1xyXG4gICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5oZXJvX2ljb25faXRlbSk7XHJcbiAgICAgICAgaXRlbS5uYW1lID0gXCJpdGVtXCIgKyB0aGlzLmluZGV4O1xyXG4gICAgICAgIGxldCBpbmZvID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSXRlbSh0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleF0uZHJvcElkKTtcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjYXJkID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImNhcmRCZ1wiKTtcclxuICAgICAgICBjYXJkLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEZyYW1lQnlQcm9wVHlwZShpbmZvLkl0ZW1JRCk7XHJcbiAgICAgICAgY2FyZC5nZXRDaGlsZEJ5TmFtZShcIm1hc2tcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKGluZm8uSXRlbUlEKTtcclxuICAgICAgICBjYXJkLmdldENoaWxkQnlOYW1lKFwicXVhbGl0eVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJUZXh0X1F1YWxpdHlfXCIgKyBpbmZvLlF1YWxpdHkpO1xyXG4gICAgICAgIGNhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleF0uZHJvcE51bSArICcnO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJmcm9udExpZ2h0XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkRpR3VhbmdfXCIgKyBpbmZvLlF1YWxpdHkpO1xyXG4gICAgICAgIGxldCBhbmltYXRpb249IGl0ZW0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgIGlmKGluZm8uUXVhbGl0eSA8IDMpe1xyXG4gICAgICAgICAgICAvLyDmma7pgJpcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gYW5pbWF0aW9uLnBsYXkoXCJzdG9yZV9oZXJvX0NcIik7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9DaG91S2ExKTtcclxuICAgICAgICAgICAgaWYodGhpcy5yZXdhcmRMaXN0Lmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNwZWVkID0gMTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zcGVlZCA9IDEuODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGluZm8uUXVhbGl0eSA9PSAzKXtcclxuICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBhbmltYXRpb24ucGxheShcInN0b3JlX2hlcm9fU1wiKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Nob3VrYTIpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiYmFja0xpZ2h0XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkJlaUd1YW5nX1NcIik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJmbG93d2luZ0xpZ2h0XCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJzdG9yZV9oZXJvX2Zsb3d3aW5nX2xpZ2h0X1NcIik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmV3YXJkTGlzdC5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zcGVlZCA9IDE7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc3BlZWQgPSAxLjg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gYW5pbWF0aW9uLnBsYXkoXCJzdG9yZV9oZXJvX1NTXCIpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQ2hvdWthMik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiYWNrTGlnaHRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiQmVpR3VhbmdfU1NcIik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJmbG93d2luZ0xpZ2h0XCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJzdG9yZV9oZXJvX2Zsb3d3aW5nX2xpZ2h0X1NTXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnJld2FyZExpc3QubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc3BlZWQgPSAxO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNwZWVkID0gMS44O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICBpdGVtLmdldENvbXBvbmVudChTdG9yZUhlcm9JY29uSXRlbSkuaW5pdCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNob3dIZXJvKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmluZGV4ICsrO1xyXG4gICAgICAgIGFuaW1hdGlvbi5vbihcInNob3dIZXJvXCIsdGhpcy5zaG93SGVybyx0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmluZGV4IDwgdGhpcy5yZXdhcmRMaXN0Lmxlbmd0aClcclxuICAgICAgICAgICAgYW5pbWF0aW9uLm9uKFwiZmluaXNoZWRcIix0aGlzLnNob3dDYXJkLHRoaXMpO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzaG93TGF0dGVyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ2dcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW4uZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSB2LmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi50cmFuc2l0aW9uID0gY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmR1cmF0aW9uID0gMC4xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi56b29tU2NhbGUgPSAwLjk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGlja0V2ZW50PW5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC50YXJnZXQ9dGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQuY29tcG9uZW50PSdTdG9yZUhlcm9VaSc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5oYW5kbGVyPSdvbkl0ZW1CdG5DbGljayc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5jdXN0b21FdmVudERhdGEgPSBrICsgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNsaWNrRXZlbnRzLnB1c2goY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwwLjUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICAgICAgLy8gICAgIGJnLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB9LDEuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93SGVybygpe1xyXG4gICAgICAgIC8vIGlmKHRoaXMucmV3YXJkTGlzdFt0aGlzLmluZGV4IC0gMV0uZHJvcElkID4gMTEwMDAwICYmIFxyXG4gICAgICAgIC8vIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuU3RvcmVIZXJvSUQgKyB0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleCAtIDFdLmRyb3BJZCAlIDExMDAwMCwwKSA9PSAwKXtcclxuICAgICAgICAvLyAgICAgbGV0IGl0ZW0gPSB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIgKyAodGhpcy5pbmRleCAtIDEpKTtcclxuICAgICAgICAvLyAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wYXVzZSgpO1xyXG4gICAgICAgIC8vICAgICBsZXQgaW5kZXhUZW1wPXRoaXMuaW5kZXg7XHJcbiAgICAgICAgLy8gICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU3RvcmVIZXJvU2hvd1VpLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFN0b3JlSGVyb1Nob3dVaSkuaW5pdCh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgb25DbG9zZTooKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnJlc3VtZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXREYXRhKHRoaXMucmV3YXJkTGlzdFtpbmRleFRlbXAgLSAxXS5kcm9wSWQgJSAxMTAwMDApO1xyXG4gICAgICAgIC8vICAgICB9fSk7IFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIOaKveWlluexu+WeiyAxLeWNleaKvSAyLeWNgei/nuaKvVxyXG4gICAgICogQHBhcmFtIGRyYXdUeWVwIOaKveWlluexu+WeiyAxLeiLsembhCzoi7Hpm4Tnoo7niYcgMi3oo4XlpIcgMy3ngbXlrqBcclxuICAgICAqIEBwYXJhbSBjb3N0SWQg5raI6ICX6YGT5YW3aWRcclxuICAgICAqIEBwYXJhbSBjb3N0TnVtIOa2iOiAl+mBk+WFt+aVsOmHj1xyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0UHJpemVKc29uU3RyaW5nKHR5cGU6bnVtYmVyLGRyYXdUeWVwOm51bWJlcixjb3N0SWQ6bnVtYmVyLGNvc3ROdW06bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHVpZD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJJRCgpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgICAgIHR5cGU6dHlwZSxcclxuICAgICAgICAgICAgZHJhd1R5cGU6ZHJhd1R5ZXAsXHJcbiAgICAgICAgICAgIGl0ZW1zSWQ6Y29zdElkLFxyXG4gICAgICAgICAgICBtaW51c051bTpjb3N0TnVtLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbUJ0bkNsaWNrKGUsaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBsZXQgaSA9IE51bWJlcihpbmRleCk7XHJcbiAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1Byb3BJbmZvKHt9LFByb3BBY3Rpb24uTG9vayx7XHJcbiAgICAgICAgICAgIHByb3BfaWQ6IHRoaXMucmV3YXJkTGlzdFtpXS5kcm9wSWQsXHJcbiAgICAgICAgICAgIHByb3BfbnVtOiB0aGlzLnJld2FyZExpc3RbaV0uZHJvcE51bSxcclxuICAgICAgICB9LG51bGwsbnVsbCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==