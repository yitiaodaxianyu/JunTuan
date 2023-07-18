"use strict";
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