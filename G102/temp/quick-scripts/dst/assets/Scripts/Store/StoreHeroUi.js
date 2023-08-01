
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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var HttpManager_1 = require("../NetWork/HttpManager");
var Item_1 = require("../Prop/Data/Item");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var EventManager_1 = require("../Tools/EventManager");
var MyTool_1 = require("../Tools/MyTool");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var UserData_1 = require("../UserData");
var DrawCardInformation_1 = require("./DrawCardInformation");
var StoreHeroIconItem_1 = require("./StoreHeroIconItem");
var StoreHeroShowUi_1 = require("./StoreHeroShowUi");
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
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
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
                GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(100041));
                cc.find('Canvas/store_ui/scroll').getComponent(cc.ScrollView).scrollToBottom(2);
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
        console.log("kkkkd:" + this.rewardList[this.index].dropId);
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
        var _this = this;
        if (this.rewardList[this.index - 1].dropId > 110000 &&
            StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreHeroID + this.rewardList[this.index - 1].dropId % 110000, 0) == 0) {
            var item_1 = this.content.getChildByName("item" + (this.index - 1));
            item_1.getComponent(cc.Animation).pause();
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroShowUi, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(StoreHeroShowUi_1.default).init({
                        onClose: function () {
                            item_1.getComponent(cc.Animation).resume();
                        }
                    });
                    uiNode.getComponent(StoreHeroShowUi_1.default).initData(_this.rewardList[_this.index - 1].dropId % 110000);
                } });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXFN0b3JlSGVyb1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFHekMsb0VBQStEO0FBQy9ELHNEQUFpRTtBQUNqRSwwQ0FBZ0Q7QUFDaEQsaURBQWdEO0FBQ2hELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCxzREFBbUY7QUFDbkYsMENBQXFDO0FBQ3JDLGlEQUE0QztBQUM1QywyQ0FBc0Q7QUFFdEQsNkNBQTRDO0FBQzVDLHdDQUFtQztBQUNuQyw2REFBbUU7QUFDbkUseURBQW9EO0FBQ3BELHFEQUFnRDtBQUUxQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBVztJQUFwRDtRQUFBLHFFQXdSQztRQXJSRyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUVoQyxnQkFBVSxHQUFvQixFQUFFLENBQUM7UUFDakMsV0FBSyxHQUFVLENBQUMsQ0FBQztRQUNqQixhQUFPLEdBQVcsSUFBSSxDQUFDOztJQWlSM0IsQ0FBQztJQS9RRywyQkFBMkI7SUFFM0IsMEJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELCtCQUErQjtJQUMvQiw4QkFBUSxHQUFSLFVBQVMsVUFBMkI7UUFBcEMsaUJBMElDO1FBeklHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxT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REMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1k7SUFIZixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBd1IvQjtJQUFELGtCQUFDO0NBeFJELEFBd1JDLENBeFJ3QyxxQkFBVyxHQXdSbkQ7a0JBeFJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IElzRGVidWcgfSBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIZXJvTWFuYWdlciB9IGZyb20gXCIuLi9IZXJvL0RhdGEvSGVyb01hbmFnZXJcIjtcclxuaW1wb3J0IHsgUmV3YXJkSGVyb0RhdGEgfSBmcm9tIFwiLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBIdHRwTWFuYWdlciwgQWNjZXNzTmFtZSB9IGZyb20gXCIuLi9OZXRXb3JrL0h0dHBNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24gfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBTdG9yYWdlS2V5IH0gZnJvbSBcIi4uL1N0b3JhZ2UvU3RvcmFnZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBUaGVTdG9yYWdlTWFuYWdlciB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IE15VG9vbCBmcm9tIFwiLi4vVG9vbHMvTXlUb29sXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IERyYXdDYXJkSW5mb3JtYXRpb25NYW5hZ2VyIH0gZnJvbSBcIi4vRHJhd0NhcmRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgU3RvcmVIZXJvSWNvbkl0ZW0gZnJvbSBcIi4vU3RvcmVIZXJvSWNvbkl0ZW1cIjtcclxuaW1wb3J0IFN0b3JlSGVyb1Nob3dVaSBmcm9tIFwiLi9TdG9yZUhlcm9TaG93VWlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmVIZXJvVWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGhlcm9faWNvbl9pdGVtOmNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgcmV3YXJkTGlzdDpSZXdhcmRIZXJvRGF0YVtdID0gW107XHJcbiAgICBpbmRleDpudW1iZXIgPSAwO1xyXG4gICAgY29udGVudDpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvLyBpc19vdmVyOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgIH1cclxuICAgIC8vIHRvZG8g5Lyg6YCS5LiA5Liq57G75Z6L5Yik5patICAgIDHoi7Hpm4TvvIwy6KOF5aSH77yMM+WuoOeJqVxyXG4gICAgaW5pdERhdGEocmV3YXJkTGlzdDpSZXdhcmRIZXJvRGF0YVtdKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ2dcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJld2FyZExpc3QgPSByZXdhcmRMaXN0O1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGxldCBzaG93TGF0dGVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2hvd0xhdHRlclwiKTtcclxuICAgICAgICBpZihyZXdhcmRMaXN0Lmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICBsZXQgcHJpemVIZXJvRGF0YSA9IERyYXdDYXJkSW5mb3JtYXRpb25NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRyYXdDYXJkSW5mb3JtYXRpb24oMTAwMSk7XHJcbiAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMSkgPj0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNTcGVuZF8xKXtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEpO1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwibnVtMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNTcGVuZF8xO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwiY29zdEljb24xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMik7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJudW0xXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc1NwZW5kXzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0ocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xKSA+PSBwcml6ZUhlcm9EYXRhLlRlbkRyYXdQcm9wc1NwZW5kXzEpe1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwiY29zdEljb24xMFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEpO1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwibnVtMTBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIHByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uMTBcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yKTtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcIm51bTEwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBwcml6ZUhlcm9EYXRhLlRlbkRyYXdQcm9wc1NwZW5kXzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaGVyb0J0bjEgPSBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwiYnRuMVwiKTtcclxuICAgICAgICBsZXQgaGVyb0J0bjEwID0gc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcImJ0bjEwXCIpO1xyXG4gICAgICAgIGhlcm9CdG4xMC5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0SGVyb1JlY3J1aXRpbmdSZWRUaXAoKTtcclxuICAgICAgICBoZXJvQnRuMS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5EKTtcclxuICAgICAgICBoZXJvQnRuMTAub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XHJcbiAgICAgICAgaGVyb0J0bjEub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUKTtcclxuICAgICAgICBoZXJvQnRuMTAub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUKTtcclxuXHJcbiAgICAgICAgaGVyb0J0bjEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgY2MudHdlZW4oaGVyb0J0bjEpLnRvKDAuMix7c2NhbGU6MC45fSkudG8oMC4yLHtzY2FsZToxfSkuc3RhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBoZXJvQnRuMTAub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsKCk9PntcclxuICAgICAgICAgICAgY2MudHdlZW4oaGVyb0J0bjEwKS50bygwLjIse3NjYWxlOjAuOX0pLnRvKDAuMix7c2NhbGU6MX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaGVyb0J0bjEub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgIGxldCBjb3N0SWQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEpID49IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzU3BlbmRfMSl7XHJcbiAgICAgICAgICAgICAgICBjb3N0SWQgPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzE7XHJcbiAgICAgICAgICAgICAgICBjb3N0TnVtID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNTcGVuZF8xO1xyXG4gICAgICAgICAgICAgICAgLy8g5Lul5LiL5Li65ZCO56uv5pyq5a2Y5raI6LS55Yi455qE5aSE55CG77yM5b2T5ZCO56uv5a2Y5YKo5raI6LS55Yi45pe277yM5L2/55So5LiK6Z2i5Lik6KGM5Luj56CBXHJcbiAgICAgICAgICAgICAgICAvLyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xLC1wcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc1NwZW5kXzEpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29zdElkID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yO1xyXG4gICAgICAgICAgICAgICAgLy8gY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29zdElkID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yO1xyXG4gICAgICAgICAgICAgICAgY29zdE51bSA9IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzU3BlbmRfMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGNvc3RJZCkgPCBjb3N0TnVtKXtcclxuICAgICAgICAgICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsVWlEaWFsb2coVUlMYXllckxldmVsLk9uZSk7XHJcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDA0MSkpO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3N0b3JlX3VpL3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYoSXNEZWJ1ZykgY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS50cnlQcml6ZSx0aGlzLmdldFByaXplSnNvblN0cmluZygxLDEsY29zdElkLGNvc3ROdW0pLHRydWUpLnRoZW4oKGRhdGE6YW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oY29zdElkLC1jb3N0TnVtKTtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hHZW1TaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGRhdGFbMF0uZHJvcElkLGRhdGFbMF0uZHJvcE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zYXZlQWxsUHJvcE51bSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdERhdGEoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU3RvcmVIZXJvVWksVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFN0b3JlSGVyb1VpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9VaSkuaW5pdERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGhlcm9CdG4xMC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PntcclxuICAgICAgICAgICAgbGV0IGNvc3RJZCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3N0TnVtID0gMDtcclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMSkgPj0gcHJpemVIZXJvRGF0YS5UZW5EcmF3UHJvcHNTcGVuZF8xKXtcclxuICAgICAgICAgICAgICAgIGNvc3RJZCA9IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMTtcclxuICAgICAgICAgICAgICAgIGNvc3ROdW0gPSBwcml6ZUhlcm9EYXRhLlRlbkRyYXdQcm9wc1NwZW5kXzE7XHJcbiAgICAgICAgICAgICAgICAvLyDku6XkuIvkuLrlkI7nq6/mnKrlrZjmtojotLnliLjnmoTlpITnkIbvvIzlvZPlkI7nq6/lrZjlgqjmtojotLnliLjml7bvvIzkvb/nlKjkuIrpnaLkuKTooYzku6PnoIFcclxuICAgICAgICAgICAgICAgIC8vIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEsLXByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3N0SWQgPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzI7XHJcbiAgICAgICAgICAgICAgICAvLyBjb3N0TnVtID0gMDtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb3N0SWQgPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzI7XHJcbiAgICAgICAgICAgICAgICBjb3N0TnVtID0gcHJpemVIZXJvRGF0YS5UZW5EcmF3UHJvcHNTcGVuZF8yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oY29zdElkKSA8IGNvc3ROdW0pe1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNDEpKTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zdG9yZV91aS9zY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmKElzRGVidWcpIGNvc3ROdW0gPSAwOyAgIFxyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudHJ5UHJpemUsdGhpcy5nZXRQcml6ZUpzb25TdHJpbmcoMiwxLGNvc3RJZCxjb3N0TnVtKSx0cnVlKS50aGVuKChkYXRhOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGNvc3RJZCwtY29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBkYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEluZGV4ID0gTXlUb29sLnJhbmRvbVJhbmdlSW50KDAsOSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShkYXRhW2ldLmRyb3BJZCxkYXRhW2ldLmRyb3BOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGFbOV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVs5XSA9IGRhdGFbdGVtcEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhW3RlbXBJbmRleF0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm9CdG4xMC5nZXRDaGlsZEJ5TmFtZSgncmVkJykuYWN0aXZlPUdhbWVEYXRhLmdldEluc3RhbmNlKCkuZ2V0SGVyb1JlY3J1aXRpbmdSZWRUaXAoKTtcclxuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX1Nob3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguU3RvcmVIZXJvVWksVUlMYXllckxldmVsLk9uZSx7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIG9uQ29tcGxldGVkOih1aU5vZGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFN0b3JlSGVyb1VpKS5pbml0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9VaSkuaW5pdERhdGEoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNob3dMYXR0ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICAvLyBiZy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQpO1xyXG4gICAgICAgIHRoaXMuc2hvd0NhcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q2FyZCgpe1xyXG4gICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5oZXJvX2ljb25faXRlbSk7XHJcbiAgICAgICAgaXRlbS5uYW1lID0gXCJpdGVtXCIgKyB0aGlzLmluZGV4O1xyXG4gICAgICAgIGxldCBpbmZvID0gSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uSXRlbSh0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleF0uZHJvcElkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImtra2tkOlwiK3RoaXMucmV3YXJkTGlzdFt0aGlzLmluZGV4XS5kcm9wSWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBjYXJkID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImNhcmRCZ1wiKTtcclxuICAgICAgICBjYXJkLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEZyYW1lQnlQcm9wVHlwZShpbmZvLkl0ZW1JRCk7XHJcbiAgICAgICAgY2FyZC5nZXRDaGlsZEJ5TmFtZShcIm1hc2tcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKGluZm8uSXRlbUlEKTtcclxuICAgICAgICBjYXJkLmdldENoaWxkQnlOYW1lKFwicXVhbGl0eVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJUZXh0X1F1YWxpdHlfXCIgKyBpbmZvLlF1YWxpdHkpO1xyXG4gICAgICAgIGNhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSB0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleF0uZHJvcE51bSArICcnO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJmcm9udExpZ2h0XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkRpR3VhbmdfXCIgKyBpbmZvLlF1YWxpdHkpO1xyXG4gICAgICAgIGxldCBhbmltYXRpb249IGl0ZW0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcblxyXG4gICAgICAgIGlmKGluZm8uUXVhbGl0eSA8IDMpe1xyXG4gICAgICAgICAgICAvLyDmma7pgJpcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gYW5pbWF0aW9uLnBsYXkoXCJzdG9yZV9oZXJvX0NcIik7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9DaG91S2ExKTtcclxuICAgICAgICAgICAgaWYodGhpcy5yZXdhcmRMaXN0Lmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNwZWVkID0gMTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zcGVlZCA9IDEuODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGluZm8uUXVhbGl0eSA9PSAzKXtcclxuICAgICAgICAgICAgLy8gU1xyXG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBhbmltYXRpb24ucGxheShcInN0b3JlX2hlcm9fU1wiKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Nob3VrYTIpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiYmFja0xpZ2h0XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkJlaUd1YW5nX1NcIik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJmbG93d2luZ0xpZ2h0XCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJzdG9yZV9oZXJvX2Zsb3d3aW5nX2xpZ2h0X1NcIik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmV3YXJkTGlzdC5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zcGVlZCA9IDE7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc3BlZWQgPSAxLjg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gU1NcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gYW5pbWF0aW9uLnBsYXkoXCJzdG9yZV9oZXJvX1NTXCIpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQ2hvdWthMik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiYWNrTGlnaHRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiQmVpR3VhbmdfU1NcIik7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJmbG93d2luZ0xpZ2h0XCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJzdG9yZV9oZXJvX2Zsb3d3aW5nX2xpZ2h0X1NTXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnJld2FyZExpc3QubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc3BlZWQgPSAxO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNwZWVkID0gMS44O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICBpdGVtLmdldENvbXBvbmVudChTdG9yZUhlcm9JY29uSXRlbSkuaW5pdCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNob3dIZXJvKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmluZGV4ICsrO1xyXG4gICAgICAgIGFuaW1hdGlvbi5vbihcInNob3dIZXJvXCIsdGhpcy5zaG93SGVybyx0aGlzKTtcclxuICAgICAgICBpZih0aGlzLmluZGV4IDwgdGhpcy5yZXdhcmRMaXN0Lmxlbmd0aClcclxuICAgICAgICAgICAgYW5pbWF0aW9uLm9uKFwiZmluaXNoZWRcIix0aGlzLnNob3dDYXJkLHRoaXMpO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzaG93TGF0dGVyXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ2dcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuY2hpbGRyZW4uZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBidXR0b24gPSB2LmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi50cmFuc2l0aW9uID0gY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmR1cmF0aW9uID0gMC4xO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi56b29tU2NhbGUgPSAwLjk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGlja0V2ZW50PW5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC50YXJnZXQ9dGhpcy5ub2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQuY29tcG9uZW50PSdTdG9yZUhlcm9VaSc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5oYW5kbGVyPSdvbkl0ZW1CdG5DbGljayc7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5jdXN0b21FdmVudERhdGEgPSBrICsgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmNsaWNrRXZlbnRzLnB1c2goY2xpY2tFdmVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwwLjUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICAgICAgLy8gICAgIGJnLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LHRoaXMpO1xyXG4gICAgICAgICAgICAvLyB9LDEuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93SGVybygpe1xyXG4gICAgICAgIGlmKHRoaXMucmV3YXJkTGlzdFt0aGlzLmluZGV4IC0gMV0uZHJvcElkID4gMTEwMDAwICYmIFxyXG4gICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TnVtYmVyKFN0b3JhZ2VLZXkuU3RvcmVIZXJvSUQgKyB0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleCAtIDFdLmRyb3BJZCAlIDExMDAwMCwwKSA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtXCIgKyAodGhpcy5pbmRleCAtIDEpKTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wYXVzZSgpO1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlN0b3JlSGVyb1Nob3dVaSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU3RvcmVIZXJvU2hvd1VpKS5pbml0RGF0YSh0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleCAtIDFdLmRyb3BJZCAlIDExMDAwMCk7XHJcbiAgICAgICAgICAgIH19KTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHR5cGUg5oq95aWW57G75Z6LIDEt5Y2V5oq9IDIt5Y2B6L+e5oq9XHJcbiAgICAgKiBAcGFyYW0gZHJhd1R5ZXAg5oq95aWW57G75Z6LIDEt6Iux6ZuELOiLsembhOeijueJhyAyLeijheWkhyAzLeeBteWuoFxyXG4gICAgICogQHBhcmFtIGNvc3RJZCDmtojogJfpgZPlhbdpZFxyXG4gICAgICogQHBhcmFtIGNvc3ROdW0g5raI6ICX6YGT5YW35pWw6YePXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQcml6ZUpzb25TdHJpbmcodHlwZTpudW1iZXIsZHJhd1R5ZXA6bnVtYmVyLGNvc3RJZDpudW1iZXIsY29zdE51bTpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdWlkOnVpZCxcclxuICAgICAgICAgICAgdHlwZTp0eXBlLFxyXG4gICAgICAgICAgICBkcmF3VHlwZTpkcmF3VHllcCxcclxuICAgICAgICAgICAgaXRlbXNJZDpjb3N0SWQsXHJcbiAgICAgICAgICAgIG1pbnVzTnVtOmNvc3ROdW0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtQnRuQ2xpY2soZSxpbmRleDpudW1iZXIpe1xyXG4gICAgICAgIGxldCBpID0gTnVtYmVyKGluZGV4KTtcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UHJvcEluZm8oe30sUHJvcEFjdGlvbi5Mb29rLHtcclxuICAgICAgICAgICAgcHJvcF9pZDogdGhpcy5yZXdhcmRMaXN0W2ldLmRyb3BJZCxcclxuICAgICAgICAgICAgcHJvcF9udW06IHRoaXMucmV3YXJkTGlzdFtpXS5kcm9wTnVtLFxyXG4gICAgICAgIH0sbnVsbCxudWxsKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19