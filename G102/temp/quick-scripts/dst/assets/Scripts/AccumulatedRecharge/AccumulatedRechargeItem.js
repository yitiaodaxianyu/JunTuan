
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AccumulatedRecharge/AccumulatedRechargeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWNjdW11bGF0ZWRSZWNoYXJnZVxcQWNjdW11bGF0ZWRSZWNoYXJnZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1FO0FBQ25FLHNDQUFpQztBQUNqQyw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCw4REFBeUQ7QUFDekQsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsMkNBQXNEO0FBQ3RELDZDQUE0QztBQUM1Qyx3Q0FBbUM7QUFDbkMsaURBQWdEO0FBQ2hELGlFQUE0RDtBQUM1RCw2REFBNEY7QUFFdEYsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBcUQsMkNBQVk7SUFBakU7UUFBQSxxRUFzTEM7UUFwTEcsYUFBTyxHQUF5QixJQUFJLENBQUM7O0lBb0x6QyxDQUFDO0lBbExHLCtDQUFhLEdBQWIsVUFBYyxPQUErQjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLE1BQU0sR0FBRyxtQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsc0JBQVksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUMsT0FBTyxDQUFDLG9CQUFvQixHQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25ILElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDO1FBQy9HLElBQUksQ0FBQyxJ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VSxFQUFDLEVBQUU7WUFDYixFQUFFLEVBQUMsRUFBRTtZQUNMLFNBQVMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQjtZQUMzQyxVQUFVLEVBQUMsQ0FBQztZQUNaLEdBQUcsRUFBQyxHQUFHO1NBQ1YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJMZ0IsdUJBQXVCO1FBRDNDLE9BQU87T0FDYSx1QkFBdUIsQ0FzTDNDO0lBQUQsOEJBQUM7Q0F0TEQsQUFzTEMsQ0F0TG9ELEVBQUUsQ0FBQyxTQUFTLEdBc0xoRTtrQkF0TG9CLHVCQUF1QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY2Vzc05hbWUsIEh0dHBNYW5hZ2VyIH0gZnJvbSBcIi4uLy4vTmV0V29yay9IdHRwTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29pblBvcCBmcm9tIFwiLi4vQ29pblBvcFwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVUlQYXRoLCBVSUxheWVyTGV2ZWwgfSBmcm9tIFwiLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgVXNlckRhdGEgZnJvbSBcIi4uL1VzZXJEYXRhXCI7XHJcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSBcIi4uL1VzZXJJbmZvL1VzZXJJbmZvXCI7XHJcbmltcG9ydCBBY2N1bXVsYXRlZFJlY2hhcmdlVWkgZnJvbSBcIi4vQWNjdW11bGF0ZWRSZWNoYXJnZVVpXCI7XHJcbmltcG9ydCB7IEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLCBKc29uQ3VtdWxhdGl2ZVJlY2hhcmdlcyB9IGZyb20gXCIuL0N1bXVsYXRpdmVSZWNoYXJnZXNcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjdW11bGF0ZWRSZWNoYXJnZUl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIG1lc3NhZ2U6SnNvbkN1bXVsYXRpdmVSZWNoYXJnZXM9bnVsbDtcclxuICAgIFxyXG4gICAgaW5pdEdvaW5nSXRlbShtZXNzYWdlOkpzb25DdW11bGF0aXZlUmVjaGFyZ2VzKXtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIGxldCBub3dOdW0gPSBVc2VySW5mby5nZXRJbnN0YW5jZSgpLnBheUdlbTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbDFcIikuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0UmVwbGFjZVZhbHVlKFwiflwiLG1lc3NhZ2UuRGlhbW9uZFJlY2hhcmdlUHJpY2UrJycpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsMlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5vd051bSArICcvJyArIG1lc3NhZ2UuRGlhbW9uZFJlY2hhcmdlUHJpY2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ3VtdWxhdGl2ZV9CYXJfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2UgPSBub3dOdW0vbWVzc2FnZS5EaWFtb25kUmVjaGFyZ2VQcmljZTtcclxuICAgICAgICBsZXQgaXRlbVJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdFwiKTtcclxuICAgICAgICBpZihpdGVtUm9vdC5jaGlsZHJlbkNvdW50ID09IDApe1xyXG4gICAgICAgICAgICBsZXQgcHJvcDEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuSXRlbTFfSUQsbWVzc2FnZS5JdGVtMV9OdW0pO1xyXG4gICAgICAgICAgICBsZXQgcHJvcDIgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuSXRlbTJfSUQsbWVzc2FnZS5JdGVtMl9OdW0pO1xyXG4gICAgICAgICAgICBsZXQgcHJvcDMgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuSXRlbTNfSUQsbWVzc2FnZS5JdGVtM19OdW0pO1xyXG4gICAgICAgICAgICBwcm9wMS5zY2FsZSA9IDAuNzU7XHJcbiAgICAgICAgICAgIHByb3AyLnNjYWxlID0gMC43NTtcclxuICAgICAgICAgICAgcHJvcDMuc2NhbGUgPSAwLjc1O1xyXG4gICAgICAgICAgICBpdGVtUm9vdC5hZGRDaGlsZChwcm9wMSk7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKHByb3AyKTtcclxuICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQocHJvcDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ0biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIik7XHJcbiAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHRleHQgPSBidG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpO1xyXG4gICAgICAgIHRleHQuc2V0VGV4dElkKDEwMDAzNCk7XHJcbiAgICAgICAgdGV4dC5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1zcHJpdGVcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRGaW5pc2hJdGVtKG1lc3NhZ2U6SnNvbkN1bXVsYXRpdmVSZWNoYXJnZXMpe1xyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgLy8gbGV0IG5vd051bSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWwxXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFJlcGxhY2VWYWx1ZShcIn5cIixtZXNzYWdlLkRpYW1vbmRSZWNoYXJnZVByaWNlKycnKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbDJcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBtZXNzYWdlLkRpYW1vbmRSZWNoYXJnZVByaWNlICsgJy8nICsgbWVzc2FnZS5EaWFtb25kUmVjaGFyZ2VQcmljZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJDdW11bGF0aXZlX0Jhcl8xXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmZpbGxSYW5nZSA9IG1lc3NhZ2UuRGlhbW9uZFJlY2hhcmdlUHJpY2UvbWVzc2FnZS5EaWFtb25kUmVjaGFyZ2VQcmljZTtcclxuICAgICAgICBsZXQgaXRlbVJvb3QgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUm9vdFwiKTtcclxuICAgICAgICBpZihpdGVtUm9vdC5jaGlsZHJlbkNvdW50ID09IDApe1xyXG4gICAgICAgICAgICBsZXQgcHJvcDEgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuSXRlbTFfSUQsbWVzc2FnZS5JdGVtMV9OdW0pO1xyXG4gICAgICAgICAgICBsZXQgcHJvcDIgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuSXRlbTJfSUQsbWVzc2FnZS5JdGVtMl9OdW0pO1xyXG4gICAgICAgICAgICBsZXQgcHJvcDMgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKG1lc3NhZ2UuSXRlbTNfSUQsbWVzc2FnZS5JdGVtM19OdW0pO1xyXG4gICAgICAgICAgICBwcm9wMS5zY2FsZSA9IDAuNzU7XHJcbiAgICAgICAgICAgIHByb3AyLnNjYWxlID0gMC43NTtcclxuICAgICAgICAgICAgcHJvcDMuc2NhbGUgPSAwLjc1O1xyXG4gICAgICAgICAgICBpdGVtUm9vdC5hZGRDaGlsZChwcm9wMSk7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKHByb3AyKTtcclxuICAgICAgICAgICAgaXRlbVJvb3QuYWRkQ2hpbGQocHJvcDMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYnRuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVjZWl2ZUJ0blwiKTtcclxuICAgICAgICBidG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGV4dCA9IGJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSk7XHJcbiAgICAgICAgdGV4dC5zZXRUZXh0SWQoMTAwMDExKTtcclxuICAgICAgICB0ZXh0LnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFJlY2VpdmVkSXRlbShtZXNzYWdlOkpzb25DdW11bGF0aXZlUmVjaGFyZ2VzKXtcclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsMVwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoXCJ+XCIsbWVzc2FnZS5EaWFtb25kUmVjaGFyZ2VQcmljZSsnJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWwyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbWVzc2FnZS5EaWFtb25kUmVjaGFyZ2VQcmljZSArICcvJyArIG1lc3NhZ2UuRGlhbW9uZFJlY2hhcmdlUHJpY2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ3VtdWxhdGl2ZV9CYXJfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2UgPSBtZXNzYWdlLkRpYW1vbmRSZWNoYXJnZVByaWNlL21lc3NhZ2UuRGlhbW9uZFJlY2hhcmdlUHJpY2U7XHJcbiAgICAgICAgbGV0IGl0ZW1Sb290ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaXRlbVJvb3RcIik7XHJcbiAgICAgICAgaWYoaXRlbVJvb3QuY2hpbGRyZW5Db3VudCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IHByb3AxID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShtZXNzYWdlLkl0ZW0xX0lELG1lc3NhZ2UuSXRlbTFfTnVtKTtcclxuICAgICAgICAgICAgbGV0IGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgYmcubmFtZSA9IFwiYmJiZ1wiO1xyXG4gICAgICAgICAgICBiZy5hZGRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeU5hbWUoXCJJdGVtX2ZyYW1lX0RhcmtcIik7XHJcbiAgICAgICAgICAgIGxldCBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgYmcub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgLy8gYmcuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICBwcm9wMS5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICBwcm9wMS5zY2FsZSA9IDAuNzU7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKHByb3AxKTtcclxuICAgIFxyXG4gICAgICAgICAgICBwcm9wMSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0obWVzc2FnZS5JdGVtMl9JRCxtZXNzYWdlLkl0ZW0yX051bSk7XHJcbiAgICAgICAgICAgIGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgYmcub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgLy8gYmcuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICBwcm9wMS5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICBwcm9wMS5zY2FsZSA9IDAuNzU7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKHByb3AxKTtcclxuICAgIFxyXG4gICAgICAgICAgICBwcm9wMSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0obWVzc2FnZS5JdGVtM19JRCxtZXNzYWdlLkl0ZW0zX051bSk7XHJcbiAgICAgICAgICAgIGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICBnb3UgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgYmcub3BhY2l0eSA9IDE1MDtcclxuICAgICAgICAgICAgLy8gYmcuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICBwcm9wMS5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICBwcm9wMS5zY2FsZSA9IDAuNzU7XHJcbiAgICAgICAgICAgIGl0ZW1Sb290LmFkZENoaWxkKHByb3AxKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoaXRlbVJvb3QuY2hpbGRyZW5bMF0uZ2V0Q2hpbGRCeU5hbWUoXCJiYmJnXCIpID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHByb3AxID0gaXRlbVJvb3QuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgYmcubmFtZSA9IFwiYmJiZ1wiO1xyXG4gICAgICAgICAgICAgICAgYmcuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiSXRlbV9mcmFtZV9EYXJrXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgIGJnLm9wYWNpdHkgPSAxNTA7XHJcbiAgICAgICAgICAgICAgICAvLyBiZy5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoZ291KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcHJvcDEgPSBpdGVtUm9vdC5jaGlsZHJlblsxXTtcclxuICAgICAgICAgICAgICAgIGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fZnJhbWVfRGFya1wiKTtcclxuICAgICAgICAgICAgICAgIGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgIGJnLm9wYWNpdHkgPSAxNTA7XHJcbiAgICAgICAgICAgICAgICAvLyBiZy5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoZ291KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcHJvcDEgPSBpdGVtUm9vdC5jaGlsZHJlblsyXTtcclxuICAgICAgICAgICAgICAgIGJnID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIGJnLmFkZENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5TmFtZShcIkl0ZW1fZnJhbWVfRGFya1wiKTtcclxuICAgICAgICAgICAgICAgIGdvdSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBnb3UuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKFwiU2lnbkluX0dvdFwiKTtcclxuICAgICAgICAgICAgICAgIGJnLm9wYWNpdHkgPSAxNTA7XHJcbiAgICAgICAgICAgICAgICAvLyBiZy5hZGRDaGlsZChnb3UpO1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgICAgICAgICAgcHJvcDEuYWRkQ2hpbGQoZ291KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ0biA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlY2VpdmVCdG5cIik7XHJcbiAgICAgICAgYnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gYnRuLmdldENvbXBvbmVudEluQ2hpbGRyZW4oVGV4dExhbmd1YWdlKTtcclxuICAgICAgICB0ZXh0LnNldFRleHRJZCgxMDAwMTMpO1xyXG4gICAgICAgIHRleHQuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIG9uQnRuQ2xpY2soKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBkYXRhID0gQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5yZXdhcmRNYXA7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gZGF0YS5nZXQodGhpcy5tZXNzYWdlLkN1bXVsYXRpdmVSZWNoYXJnZUlEKTtcclxuICAgICAgICBpZihzdGF0ZSA9PSAwKXtcclxuICAgICAgICAgICAgVUlNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1VpRGlhbG9nKFVJUGF0aC5Db2luUG9wLFVJTGF5ZXJMZXZlbC5Ud28se29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChDb2luUG9wKS5pbml0KHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlOigpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQucGFyZW50LnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KEFjY3VtdWxhdGVkUmVjaGFyZ2VVaSkucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHVpTm9kZS5nZXRDb21wb25lbnQoQ29pblBvcCkuaW5pdFVpKFByb3BJZC5HZW0pXHJcbiAgICAgICAgICAgIH0sfSk7XHJcbiAgICAgICAgfWVsc2UgaWYoc3RhdGUgPT0gMSl7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLm1lc3NhZ2UuSXRlbTFfSUQsdGhpcy5tZXNzYWdlLkl0ZW0xX051bSk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLm1lc3NhZ2UuSXRlbTJfSUQsdGhpcy5tZXNzYWdlLkl0ZW0yX051bSk7XHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLm1lc3NhZ2UuSXRlbTNfSUQsdGhpcy5tZXNzYWdlLkl0ZW0zX051bSk7XHJcbiAgICAgICAgICAgIEh0dHBNYW5hZ2VyLnBvc3QoQWNjZXNzTmFtZS5zYXZlR2FtZVRhc2ssdGhpcy5zZXRVc2VyVGFza0pzb25TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7ntK/orqHlhYXlgLzmr4/kuIDmoaPnmoTpooblj5bmrKHmlbB4K3RoaXMubWVzc2FnZS5DdW11bGF0aXZlUmVjaGFyZ2VJRCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgIEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkubW9kaWZ5RGF0YSh0aGlzLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLm5vZGUucGFyZW50LnBhcmVudC5wYXJlbnQucGFyZW50LmdldENvbXBvbmVudChBY2N1bXVsYXRlZFJlY2hhcmdlVWkpLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRSZWNlaXZlZEl0ZW0odGhpcy5tZXNzYWdlKTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93TXVsdGlwbGVHZXRUaXAoW1xyXG4gICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh0aGlzLm1lc3NhZ2UuSXRlbTFfSUQsdGhpcy5tZXNzYWdlLkl0ZW0xX051bSksXHJcbiAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMubWVzc2FnZS5JdGVtMl9JRCx0aGlzLm1lc3NhZ2UuSXRlbTJfTnVtKSxcclxuICAgICAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odGhpcy5tZXNzYWdlLkl0ZW0zX0lELHRoaXMubWVzc2FnZS5JdGVtM19OdW0pXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFVzZXJUYXNrSnNvblN0cmluZygpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdWlkPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlcklEKCk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgY3JlYXRlVGltZTpcIlwiLFxyXG4gICAgICAgICAgICBpZDpcIlwiLFxyXG4gICAgICAgICAgICBwbGF5TGV2ZWw6dGhpcy5tZXNzYWdlLkN1bXVsYXRpdmVSZWNoYXJnZUlELFxyXG4gICAgICAgICAgICByZXdhcmRUeXBlOjYsXHJcbiAgICAgICAgICAgIHVpZDp1aWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19