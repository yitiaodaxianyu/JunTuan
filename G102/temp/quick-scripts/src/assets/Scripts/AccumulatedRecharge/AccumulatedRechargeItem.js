"use strict";
cc._RF.push(module, '72ae8/hW1VNx6NayQEkeRRp', 'AccumulatedRechargeItem');
// Scripts/AccumulatedRecharge/AccumulatedRechargeItem.ts

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
var HttpManager_1 = require(".././NetWork/HttpManager");
var CoinPop_1 = require("../CoinPop");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var UserData_1 = require("../UserData");
var UserInfo_1 = require("../UserInfo/UserInfo");
var AccumulatedRechargeUi_1 = require("./AccumulatedRechargeUi");
var CumulativeRecharges_1 = require("./CumulativeRecharges");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AccumulatedRechargeItem = /** @class */ (function (_super) {
    __extends(AccumulatedRechargeItem, _super);
    function AccumulatedRechargeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.message = null;
        return _this;
    }
    AccumulatedRechargeItem.prototype.initGoingItem = function (message) {
        this.message = message;
        var nowNum = UserInfo_1.UserInfo.getInstance().payGem;
        this.node.getChildByName("label1").getComponent(TextLanguage_1.default).setReplaceValue("~", message.DiamondRechargePrice + '');
        this.node.getChildByName("label2").getComponent(cc.Label).string = nowNum + '/' + message.DiamondRechargePrice;
        this.node.getChildByName("Cumulative_Bar_1").getComponent(cc.Sprite).fillRange = nowNum / message.DiamondRechargePrice;
        var itemRoot = this.node.getChildByName("itemRoot");
        if (itemRoot.childrenCount == 0) {
            var prop1 = PropManager_1.PropManager.getInstance().createPropItem(message.Item1_ID, message.Item1_Num);
            var prop2 = PropManager_1.PropManager.getInstance().createPropItem(message.Item2_ID, message.Item2_Num);
            var prop3 = PropManager_1.PropManager.getInstance().createPropItem(message.Item3_ID, message.Item3_Num);
            prop1.scale = 0.75;
            prop2.scale = 0.75;
            prop3.scale = 0.75;
            itemRoot.addChild(prop1);
            itemRoot.addChild(prop2);
            itemRoot.addChild(prop3);
        }
        var btn = this.node.getChildByName("receiveBtn");
        btn.getComponent(cc.Button).interactable = true;
        var text = btn.getComponentInChildren(TextLanguage_1.default);
        text.setTextId(100034);
        text.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
    };
    AccumulatedRechargeItem.prototype.initFinishItem = function (message) {
        this.message = message;
        // let nowNum = 0;
        this.node.getChildByName("label1").getComponent(TextLanguage_1.default).setReplaceValue("~", message.DiamondRechargePrice + '');
        this.node.getChildByName("label2").getComponent(cc.Label).string = message.DiamondRechargePrice + '/' + message.DiamondRechargePrice;
        this.node.getChildByName("Cumulative_Bar_1").getComponent(cc.Sprite).fillRange = message.DiamondRechargePrice / message.DiamondRechargePrice;
        var itemRoot = this.node.getChildByName("itemRoot");
        if (itemRoot.childrenCount == 0) {
            var prop1 = PropManager_1.PropManager.getInstance().createPropItem(message.Item1_ID, message.Item1_Num);
            var prop2 = PropManager_1.PropManager.getInstance().createPropItem(message.Item2_ID, message.Item2_Num);
            var prop3 = PropManager_1.PropManager.getInstance().createPropItem(message.Item3_ID, message.Item3_Num);
            prop1.scale = 0.75;
            prop2.scale = 0.75;
            prop3.scale = 0.75;
            itemRoot.addChild(prop1);
            itemRoot.addChild(prop2);
            itemRoot.addChild(prop3);
        }
        var btn = this.node.getChildByName("receiveBtn");
        btn.getComponent(cc.Button).interactable = true;
        var text = btn.getComponentInChildren(TextLanguage_1.default);
        text.setTextId(100011);
        text.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
    };
    AccumulatedRechargeItem.prototype.initReceivedItem = function (message) {
        this.message = message;
        this.node.getChildByName("label1").getComponent(TextLanguage_1.default).setReplaceValue("~", message.DiamondRechargePrice + '');
        this.node.getChildByName("label2").getComponent(cc.Label).string = message.DiamondRechargePrice + '/' + message.DiamondRechargePrice;
        this.node.getChildByName("Cumulative_Bar_1").getComponent(cc.Sprite).fillRange = message.DiamondRechargePrice / message.DiamondRechargePrice;
        var itemRoot = this.node.getChildByName("itemRoot");
        if (itemRoot.childrenCount == 0) {
            var prop1 = PropManager_1.PropManager.getInstance().createPropItem(message.Item1_ID, message.Item1_Num);
            var bg = new cc.Node();
            bg.name = "bbbg";
            bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
            var gou = new cc.Node();
            gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
            bg.opacity = 150;
            // bg.addChild(gou);
            prop1.addChild(bg);
            prop1.addChild(gou);
            prop1.scale = 0.75;
            itemRoot.addChild(prop1);
            prop1 = PropManager_1.PropManager.getInstance().createPropItem(message.Item2_ID, message.Item2_Num);
            bg = new cc.Node();
            bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
            gou = new cc.Node();
            gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
            bg.opacity = 150;
            // bg.addChild(gou);
            prop1.addChild(bg);
            prop1.addChild(gou);
            prop1.scale = 0.75;
            itemRoot.addChild(prop1);
            prop1 = PropManager_1.PropManager.getInstance().createPropItem(message.Item3_ID, message.Item3_Num);
            bg = new cc.Node();
            bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
            gou = new cc.Node();
            gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
            bg.opacity = 150;
            // bg.addChild(gou);
            prop1.addChild(bg);
            prop1.addChild(gou);
            prop1.scale = 0.75;
            itemRoot.addChild(prop1);
        }
        else {
            if (itemRoot.children[0].getChildByName("bbbg") == null) {
                var prop1 = itemRoot.children[0];
                var bg = new cc.Node();
                bg.name = "bbbg";
                bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                var gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
                prop1 = itemRoot.children[1];
                bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
                prop1 = itemRoot.children[2];
                bg = new cc.Node();
                bg.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("Item_frame_Dark");
                gou = new cc.Node();
                gou.addComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByName("SignIn_Got");
                bg.opacity = 150;
                // bg.addChild(gou);
                prop1.addChild(bg);
                prop1.addChild(gou);
            }
        }
        var btn = this.node.getChildByName("receiveBtn");
        btn.getComponent(cc.Button).interactable = false;
        var text = btn.getComponentInChildren(TextLanguage_1.default);
        text.setTextId(100013);
        text.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
    };
    AccumulatedRechargeItem.prototype.onBtnClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var data = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().rewardMap;
        var state = data.get(this.message.CumulativeRechargeID);
        if (state == 0) {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.CoinPop, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(CoinPop_1.default).init({
                        onClose: function () {
                            _this.node.parent.parent.parent.parent.getComponent(AccumulatedRechargeUi_1.default).refreshUi();
                        }
                    });
                    uiNode.getComponent(CoinPop_1.default).initUi(PropConfig_1.PropId.Gem);
                }, });
        }
        else if (state == 1) {
            PropManager_1.PropManager.getInstance().changePropNum(this.message.Item1_ID, this.message.Item1_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.message.Item2_ID, this.message.Item2_Num);
            PropManager_1.PropManager.getInstance().changePropNum(this.message.Item3_ID, this.message.Item3_Num);
            HttpManager_1.HttpManager.post(HttpManager_1.AccessName.saveGameTask, this.setUserTaskJsonString());
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.累计充值每一档的领取次数x + this.message.CumulativeRechargeID);
            // CumulativeRechargesManager.getInstance().refreshData();
            CumulativeRecharges_1.CumulativeRechargesManager.getInstance().modifyData(this.message);
            // this.node.parent.parent.parent.parent.getComponent(AccumulatedRechargeUi).refreshUi();
            this.initReceivedItem(this.message);
            GameManager_1.default.getInstance().showMultipleGetTip([
                PropManager_1.PropManager.getInstance().createPropItem(this.message.Item1_ID, this.message.Item1_Num),
                PropManager_1.PropManager.getInstance().createPropItem(this.message.Item2_ID, this.message.Item2_Num),
                PropManager_1.PropManager.getInstance().createPropItem(this.message.Item3_ID, this.message.Item3_Num)
            ]);
        }
    };
    AccumulatedRechargeItem.prototype.setUserTaskJsonString = function () {
        var uid = UserData_1.default.getInstance().getUserID();
        return JSON.stringify({
            createTime: "",
            id: "",
            playLevel: this.message.CumulativeRechargeID,
            rewardType: 6,
            uid: uid,
        });
    };
    AccumulatedRechargeItem = __decorate([
        ccclass
    ], AccumulatedRechargeItem);
    return AccumulatedRechargeItem;
}(cc.Component));
exports.default = AccumulatedRechargeItem;

cc._RF.pop();