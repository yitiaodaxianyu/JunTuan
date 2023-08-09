
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
            var indexTemp_1 = this.index;
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroShowUi, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(StoreHeroShowUi_1.default).init({
                        onClose: function () {
                            item_1.getComponent(cc.Animation).resume();
                        }
                    });
                    uiNode.getComponent(StoreHeroShowUi_1.default).initData(_this.rewardList[indexTemp_1 - 1].dropId % 110000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXFN0b3JlSGVyb1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHdDQUFtQztBQUNuQyw4Q0FBeUM7QUFHekMsb0VBQStEO0FBQy9ELHNEQUFpRTtBQUNqRSwwQ0FBZ0Q7QUFDaEQsaURBQWdEO0FBQ2hELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCxzREFBbUY7QUFDbkYsMENBQXFDO0FBQ3JDLGlEQUE0QztBQUM1QywyQ0FBc0Q7QUFFdEQsNkNBQTRDO0FBQzVDLHdDQUFtQztBQUNuQyw2REFBbUU7QUFDbkUseURBQW9EO0FBQ3BELHFEQUFnRDtBQUUxQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBVztJQUFwRDtRQUFBLHFFQXlSQztRQXRSRyxvQkFBYyxHQUFhLElBQUksQ0FBQztRQUVoQyxnQkFBVSxHQUFvQixFQUFFLENBQUM7UUFDakMsV0FBSyxHQUFVLENBQUMsQ0FBQztRQUNqQixhQUFPLEdBQVcsSUFBSSxDQUFDOztJQWtSM0IsQ0FBQztJQWhSRywyQkFBMkI7SUFFM0IsMEJBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUNELCtCQUErQjtJQUMvQiw4QkFBUSxHQUFSLFVBQVMsVUFBMkI7UUFBcEMsaUJBMElDO1FBeklHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxT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V0FBVyxDQXlSL0I7SUFBRCxrQkFBQztDQXpSRCxBQXlSQyxDQXpSd0MscUJBQVcsR0F5Um5EO2tCQXpSb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBJc0RlYnVnIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb01hbmFnZXIgfSBmcm9tIFwiLi4vSGVyby9EYXRhL0hlcm9NYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFJld2FyZEhlcm9EYXRhIH0gZnJvbSBcIi4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSHR0cE1hbmFnZXIsIEFjY2Vzc05hbWUgfSBmcm9tIFwiLi4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJdGVtTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL0RhdGEvSXRlbVwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFdmVudE1hbmFnZXIsIFJlZEV2ZW50U3RyaW5nLCBSZWRFdmVudFR5cGUgfSBmcm9tIFwiLi4vVG9vbHMvRXZlbnRNYW5hZ2VyXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJTGF5ZXJMZXZlbCwgVUlQYXRoIH0gZnJvbSBcIi4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5pbXBvcnQgeyBEcmF3Q2FyZEluZm9ybWF0aW9uTWFuYWdlciB9IGZyb20gXCIuL0RyYXdDYXJkSW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IFN0b3JlSGVyb0ljb25JdGVtIGZyb20gXCIuL1N0b3JlSGVyb0ljb25JdGVtXCI7XHJcbmltcG9ydCBTdG9yZUhlcm9TaG93VWkgZnJvbSBcIi4vU3RvcmVIZXJvU2hvd1VpXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlSGVyb1VpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBoZXJvX2ljb25faXRlbTpjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIHJld2FyZExpc3Q6UmV3YXJkSGVyb0RhdGFbXSA9IFtdO1xyXG4gICAgaW5kZXg6bnVtYmVyID0gMDtcclxuICAgIGNvbnRlbnQ6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy8gaXNfb3Zlcjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICB9XHJcbiAgICAvLyB0b2RvIOS8oOmAkuS4gOS4quexu+Wei+WIpOaWrSAgICAx6Iux6ZuE77yMMuijheWkh++8jDPlrqDnialcclxuICAgIGluaXREYXRhKHJld2FyZExpc3Q6UmV3YXJkSGVyb0RhdGFbXSl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdnXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRMaXN0ID0gcmV3YXJkTGlzdDtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgc2hvd0xhdHRlciA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNob3dMYXR0ZXJcIik7XHJcbiAgICAgICAgaWYocmV3YXJkTGlzdC5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgICAgICAgbGV0IHByaXplSGVyb0RhdGEgPSBEcmF3Q2FyZEluZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25EcmF3Q2FyZEluZm9ybWF0aW9uKDEwMDEpO1xyXG4gICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEpID49IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzU3BlbmRfMSl7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvbjFcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xKTtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcIm51bTFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcInhcIiArIHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzU3BlbmRfMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzIpO1xyXG4gICAgICAgICAgICBzaG93TGF0dGVyLmdldENoaWxkQnlOYW1lKFwibnVtMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNTcGVuZF8yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMSkgPj0gcHJpemVIZXJvRGF0YS5UZW5EcmF3UHJvcHNTcGVuZF8xKXtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcImNvc3RJY29uMTBcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xKTtcclxuICAgICAgICAgICAgc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcIm51bTEwXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJ4XCIgKyBwcml6ZUhlcm9EYXRhLlRlbkRyYXdQcm9wc1NwZW5kXzE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJjb3N0SWNvbjEwXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMik7XHJcbiAgICAgICAgICAgIHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJudW0xMFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgcHJpemVIZXJvRGF0YS5UZW5EcmF3UHJvcHNTcGVuZF8yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhlcm9CdG4xID0gc2hvd0xhdHRlci5nZXRDaGlsZEJ5TmFtZShcImJ0bjFcIik7XHJcbiAgICAgICAgbGV0IGhlcm9CdG4xMCA9IHNob3dMYXR0ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJidG4xMFwiKTtcclxuICAgICAgICBoZXJvQnRuMTAuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldEhlcm9SZWNydWl0aW5nUmVkVGlwKCk7XHJcbiAgICAgICAgaGVyb0J0bjEub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCk7XHJcbiAgICAgICAgaGVyb0J0bjEwLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQpO1xyXG4gICAgICAgIGhlcm9CdG4xLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCk7XHJcbiAgICAgICAgaGVyb0J0bjEwLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCk7XHJcblxyXG4gICAgICAgIGhlcm9CdG4xLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGhlcm9CdG4xKS50bygwLjIse3NjYWxlOjAuOX0pLnRvKDAuMix7c2NhbGU6MX0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaGVyb0J0bjEwLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKGhlcm9CdG4xMCkudG8oMC4yLHtzY2FsZTowLjl9KS50bygwLjIse3NjYWxlOjF9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGhlcm9CdG4xLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+e1xyXG4gICAgICAgICAgICBsZXQgY29zdElkID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICBpZihQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0ocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xKSA+PSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc1NwZW5kXzEpe1xyXG4gICAgICAgICAgICAgICAgY29zdElkID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xO1xyXG4gICAgICAgICAgICAgICAgY29zdE51bSA9IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzU3BlbmRfMTtcclxuICAgICAgICAgICAgICAgIC8vIOS7peS4i+S4uuWQjuerr+acquWtmOa2iOi0ueWIuOeahOWkhOeQhu+8jOW9k+WQjuerr+WtmOWCqOa2iOi0ueWIuOaXtu+8jOS9v+eUqOS4iumdouS4pOihjOS7o+eggVxyXG4gICAgICAgICAgICAgICAgLy8gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMSwtcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNTcGVuZF8xKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvc3RJZCA9IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMjtcclxuICAgICAgICAgICAgICAgIC8vIGNvc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvc3RJZCA9IHByaXplSGVyb0RhdGEuT25lRHJhd1Byb3BzSURfMjtcclxuICAgICAgICAgICAgICAgIGNvc3ROdW0gPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc1NwZW5kXzI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShjb3N0SWQpIDwgY29zdE51bSl7XHJcbiAgICAgICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUFsbFVpRGlhbG9nKFVJTGF5ZXJMZXZlbC5PbmUpO1xyXG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TWVzc2FnZShMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCgxMDAwNDEpKTtcclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zdG9yZV91aS9zY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuc2Nyb2xsVG9Cb3R0b20oMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmKElzRGVidWcpIGNvc3ROdW0gPSAwO1xyXG4gICAgICAgICAgICBIdHRwTWFuYWdlci5wb3N0KEFjY2Vzc05hbWUudHJ5UHJpemUsdGhpcy5nZXRQcml6ZUpzb25TdHJpbmcoMSwxLGNvc3RJZCxjb3N0TnVtKSx0cnVlKS50aGVuKChkYXRhOmFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKGNvc3RJZCwtY29zdE51bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZWZyZXNoR2VtU2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShkYXRhWzBdLmRyb3BJZCxkYXRhWzBdLmRyb3BOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2F2ZUFsbFByb3BOdW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREYXRhKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlN0b3JlSGVyb1VpLFVJTGF5ZXJMZXZlbC5PbmUse1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9VaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU3RvcmVIZXJvVWkpLmluaXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBoZXJvQnRuMTAub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgpPT57XHJcbiAgICAgICAgICAgIGxldCBjb3N0SWQgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzEpID49IHByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMSl7XHJcbiAgICAgICAgICAgICAgICBjb3N0SWQgPSBwcml6ZUhlcm9EYXRhLk9uZURyYXdQcm9wc0lEXzE7XHJcbiAgICAgICAgICAgICAgICBjb3N0TnVtID0gcHJpemVIZXJvRGF0YS5UZW5EcmF3UHJvcHNTcGVuZF8xO1xyXG4gICAgICAgICAgICAgICAgLy8g5Lul5LiL5Li65ZCO56uv5pyq5a2Y5raI6LS55Yi455qE5aSE55CG77yM5b2T5ZCO56uv5a2Y5YKo5raI6LS55Yi45pe277yM5L2/55So5LiK6Z2i5Lik6KGM5Luj56CBXHJcbiAgICAgICAgICAgICAgICAvLyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8xLC1wcml6ZUhlcm9EYXRhLlRlbkRyYXdQcm9wc1NwZW5kXzEpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29zdElkID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yO1xyXG4gICAgICAgICAgICAgICAgLy8gY29zdE51bSA9IDA7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29zdElkID0gcHJpemVIZXJvRGF0YS5PbmVEcmF3UHJvcHNJRF8yO1xyXG4gICAgICAgICAgICAgICAgY29zdE51bSA9IHByaXplSGVyb0RhdGEuVGVuRHJhd1Byb3BzU3BlbmRfMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKGNvc3RJZCkgPCBjb3N0TnVtKXtcclxuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDQxKSk7XHJcbiAgICAgICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvc3RvcmVfdWkvc2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvQm90dG9tKDIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZihJc0RlYnVnKSBjb3N0TnVtID0gMDsgICBcclxuICAgICAgICAgICAgSHR0cE1hbmFnZXIucG9zdChBY2Nlc3NOYW1lLnRyeVByaXplLHRoaXMuZ2V0UHJpemVKc29uU3RyaW5nKDIsMSxjb3N0SWQsY29zdE51bSksdHJ1ZSkudGhlbigoZGF0YTphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShjb3N0SWQsLWNvc3ROdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkucmVmcmVzaEdlbVNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBJbmRleCA9IE15VG9vbC5yYW5kb21SYW5nZUludCgwLDkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0oZGF0YVtpXS5kcm9wSWQsZGF0YVtpXS5kcm9wTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhWzldO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbOV0gPSBkYXRhW3RlbXBJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVt0ZW1wSW5kZXhdID0gdGVtcDtcclxuICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVBbGxQcm9wTnVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0RGF0YShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvQnRuMTAuZ2V0Q2hpbGRCeU5hbWUoJ3JlZCcpLmFjdGl2ZT1HYW1lRGF0YS5nZXRJbnN0YW5jZSgpLmdldEhlcm9SZWNydWl0aW5nUmVkVGlwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9TaG9wKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlN0b3JlSGVyb1VpLFVJTGF5ZXJMZXZlbC5PbmUse1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9VaSkuaW5pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU3RvcmVIZXJvVWkpLmluaXREYXRhKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzaG93TGF0dGVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIGxldCBiZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyk7XHJcbiAgICAgICAgLy8gYmcub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJUKTtcclxuICAgICAgICB0aGlzLnNob3dDYXJkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0NhcmQoKXtcclxuICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19pY29uX2l0ZW0pO1xyXG4gICAgICAgIGl0ZW0ubmFtZSA9IFwiaXRlbVwiICsgdGhpcy5pbmRleDtcclxuICAgICAgICBsZXQgaW5mbyA9IEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkl0ZW0odGhpcy5yZXdhcmRMaXN0W3RoaXMuaW5kZXhdLmRyb3BJZCk7XHJcbiAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY2FyZCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjYXJkQmdcIik7XHJcbiAgICAgICAgY2FyZC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BGcmFtZUJ5UHJvcFR5cGUoaW5mby5JdGVtSUQpO1xyXG4gICAgICAgIGNhcmQuZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChpbmZvLkl0ZW1JRCk7XHJcbiAgICAgICAgY2FyZC5nZXRDaGlsZEJ5TmFtZShcInF1YWxpdHlcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiVGV4dF9RdWFsaXR5X1wiICsgaW5mby5RdWFsaXR5KTtcclxuICAgICAgICBjYXJkLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gdGhpcy5yZXdhcmRMaXN0W3RoaXMuaW5kZXhdLmRyb3BOdW0gKyAnJztcclxuICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiZnJvbnRMaWdodFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJEaUd1YW5nX1wiICsgaW5mby5RdWFsaXR5KTtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uPSBpdGVtLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG5cclxuICAgICAgICBpZihpbmZvLlF1YWxpdHkgPCAzKXtcclxuICAgICAgICAgICAgLy8g5pmu6YCaXHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IGFuaW1hdGlvbi5wbGF5KFwic3RvcmVfaGVyb19DXCIpO1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguWVhfQ2hvdUthMSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmV3YXJkTGlzdC5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zcGVlZCA9IDE7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc3BlZWQgPSAxLjg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihpbmZvLlF1YWxpdHkgPT0gMyl7XHJcbiAgICAgICAgICAgIC8vIFNcclxuICAgICAgICAgICAgbGV0IHN0YXRlID0gYW5pbWF0aW9uLnBsYXkoXCJzdG9yZV9oZXJvX1NcIik7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9DaG91a2EyKTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJhY2tMaWdodFwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJCZWlHdWFuZ19TXCIpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiZmxvd3dpbmdMaWdodFwiKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwic3RvcmVfaGVyb19mbG93d2luZ19saWdodF9TXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLnJld2FyZExpc3QubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgc3RhdGUuc3BlZWQgPSAxO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNwZWVkID0gMS44O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIFNTXHJcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IGFuaW1hdGlvbi5wbGF5KFwic3RvcmVfaGVyb19TU1wiKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0Nob3VrYTIpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiYmFja0xpZ2h0XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkJlaUd1YW5nX1NTXCIpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiZmxvd3dpbmdMaWdodFwiKS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwic3RvcmVfaGVyb19mbG93d2luZ19saWdodF9TU1wiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5yZXdhcmRMaXN0Lmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHN0YXRlLnNwZWVkID0gMTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5zcGVlZCA9IDEuODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoU3RvcmVIZXJvSWNvbkl0ZW0pLmluaXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zaG93SGVybygpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5pbmRleCArKztcclxuICAgICAgICBhbmltYXRpb24ub24oXCJzaG93SGVyb1wiLHRoaXMuc2hvd0hlcm8sdGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5pbmRleCA8IHRoaXMucmV3YXJkTGlzdC5sZW5ndGgpXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi5vbihcImZpbmlzaGVkXCIsdGhpcy5zaG93Q2FyZCx0aGlzKTtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2hvd0xhdHRlclwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmdnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gdi5hZGRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24udHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5kdXJhdGlvbiA9IDAuMTtcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uem9vbVNjYWxlID0gMC45O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xpY2tFdmVudD1uZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQudGFyZ2V0PXRoaXMubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBjbGlja0V2ZW50LmNvbXBvbmVudD0nU3RvcmVIZXJvVWknO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQuaGFuZGxlcj0nb25JdGVtQnRuQ2xpY2snO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQuY3VzdG9tRXZlbnREYXRhID0gayArICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sMC41KTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgLy8gICAgIGxldCBiZz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JnJyk7XHJcbiAgICAgICAgICAgIC8vICAgICBiZy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMub25DbG9zZSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgfSx0aGlzKTtcclxuICAgICAgICAgICAgLy8gfSwxLjUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvd0hlcm8oKXtcclxuICAgICAgICBpZih0aGlzLnJld2FyZExpc3RbdGhpcy5pbmRleCAtIDFdLmRyb3BJZCA+IDExMDAwMCAmJiBcclxuICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE51bWJlcihTdG9yYWdlS2V5LlN0b3JlSGVyb0lEICsgdGhpcy5yZXdhcmRMaXN0W3RoaXMuaW5kZXggLSAxXS5kcm9wSWQgJSAxMTAwMDAsMCkgPT0gMCl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5jb250ZW50LmdldENoaWxkQnlOYW1lKFwiaXRlbVwiICsgKHRoaXMuaW5kZXggLSAxKSk7XHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGF1c2UoKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4VGVtcD10aGlzLmluZGV4O1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlN0b3JlSGVyb1Nob3dVaSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoU3RvcmVIZXJvU2hvd1VpKS5pbml0RGF0YSh0aGlzLnJld2FyZExpc3RbaW5kZXhUZW1wIC0gMV0uZHJvcElkICUgMTEwMDAwKTtcclxuICAgICAgICAgICAgfX0pOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDmir3lpZbnsbvlnosgMS3ljZXmir0gMi3ljYHov57mir1cclxuICAgICAqIEBwYXJhbSBkcmF3VHllcCDmir3lpZbnsbvlnosgMS3oi7Hpm4Qs6Iux6ZuE56KO54mHIDIt6KOF5aSHIDMt54G15a6gXHJcbiAgICAgKiBAcGFyYW0gY29zdElkIOa2iOiAl+mBk+WFt2lkXHJcbiAgICAgKiBAcGFyYW0gY29zdE51bSDmtojogJfpgZPlhbfmlbDph49cclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFByaXplSnNvblN0cmluZyh0eXBlOm51bWJlcixkcmF3VHllcDpudW1iZXIsY29zdElkOm51bWJlcixjb3N0TnVtOm51bWJlcik6c3RyaW5ne1xyXG4gICAgICAgIGxldCB1aWQ9VXNlckRhdGEuZ2V0SW5zdGFuY2UoKS5nZXRVc2VySUQoKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICB1aWQ6dWlkLFxyXG4gICAgICAgICAgICB0eXBlOnR5cGUsXHJcbiAgICAgICAgICAgIGRyYXdUeXBlOmRyYXdUeWVwLFxyXG4gICAgICAgICAgICBpdGVtc0lkOmNvc3RJZCxcclxuICAgICAgICAgICAgbWludXNOdW06Y29zdE51bSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkl0ZW1CdG5DbGljayhlLGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgbGV0IGkgPSBOdW1iZXIoaW5kZXgpO1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQcm9wSW5mbyh7fSxQcm9wQWN0aW9uLkxvb2sse1xyXG4gICAgICAgICAgICBwcm9wX2lkOiB0aGlzLnJld2FyZExpc3RbaV0uZHJvcElkLFxyXG4gICAgICAgICAgICBwcm9wX251bTogdGhpcy5yZXdhcmRMaXN0W2ldLmRyb3BOdW0sXHJcbiAgICAgICAgfSxudWxsLG51bGwpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=