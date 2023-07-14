
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/PayFirstChargeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f1d12/B6JNPx5WX/M2nSYJL', 'PayFirstChargeUi');
// Scripts/Payment/PayFirstChargeUi.ts

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
var ApkManager_1 = require("../Ads/ApkManager");
var GameManager_1 = require("../GameManager");
var HeroManager_1 = require("../Hero/Data/HeroManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropManager_1 = require("../Prop/PropManager");
var StorageConfig_1 = require("../Storage/StorageConfig");
var StorageManager_1 = require("../Storage/StorageManager");
var StoreHeroShowUi_1 = require("../Store/StoreHeroShowUi");
var EventManager_1 = require("../Tools/EventManager");
var MainUi_1 = require("../UI/home/MainUi");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var PayManager_1 = require("./PayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PayFirstChargeUi = /** @class */ (function (_super) {
    __extends(PayFirstChargeUi, _super);
    function PayFirstChargeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reward_list = [
            { reward_id: 110008, reward_num: 0 },
            { reward_id: 30113, reward_num: 1 },
            { reward_id: 30213, reward_num: 1 },
            { reward_id: 30313, reward_num: 1 },
            { reward_id: 30413, reward_num: 1 },
            { reward_id: 10002, reward_num: 600 },
            { reward_id: 40004, reward_num: 10 }
        ];
        // protected start(): void{
        //     this.init(null);
        // }
        _this.itmeparent = null;
        _this.id = "c301";
        _this.itemarr = [];
        return _this;
    }
    PayFirstChargeUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        this.refreshData();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_TIP, EventManager_1.RedEventType.Btn_Main_ShouChong, false, EventManager_1.RedEventType.Btn_Main_ShouChong);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.首充点击次数);
    };
    PayFirstChargeUi.prototype.refreshData = function () {
        for (var itemarrindex = 0; itemarrindex < this.itemarr.length; itemarrindex++) {
            this.itemarr[itemarrindex].removeFromParent();
        }
        for (var index = 0; index < this.reward_list.length; index++) {
            // let item=PropManager.getInstance().createPropItem(rewardData.reward_id,rewardData.reward_num);
            // item.scale=0.82;
            // item.parent=this.prop;
            // item.x=-67+level3*90;
            // item.y=-40+Starindex*115-115;
            var item = PropManager_1.PropManager.getInstance().createPropItem(this.reward_list[index].reward_id, this.reward_list[index].reward_num);
            item.scale = 0.9;
            item.parent = this.itmeparent.children[index];
            this.itemarr.push(item);
            // .addChild(item);
        }
        this.node.getChildByName("richText").getComponent(cc.RichText).string = LanguageManager_1.default.getInstance().getStrByTextId(1440002);
        this.node.getChildByName("goBtn").getChildByName("txt").getComponent(cc.Label).string = "" + PayManager_1.PayManager.getInstance().getPayInfo(this.id).price;
        this.node.getChildByName("goBtn").active = PayManager_1.PayManager.getInstance().getPayNum('c301') <= 0;
        // if(PayManager.getInstance().getIsFirstPay()){
        //     this.node.getChildByName("goBtn").active = false;
        //     this.node.getChildByName("getBtn").active = true;
        // }else{
        //     this.node.getChildByName("goBtn").active = true;
        //     this.node.getChildByName("getBtn").active = false;
        // }
    };
    PayFirstChargeUi.prototype.onClickGoBtn = function () {
        var _this = this;
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.首充点击购买按钮);
        if (PayManager_1.PayManager.getInstance().getPayNum('c301') <= 0) {
            ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                    if (isPay) {
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.首充购买成功按钮);
                        _this.onClickReceiveBtn();
                    }
                } }, this.id);
        }
    };
    PayFirstChargeUi.prototype.onClickReceiveBtn = function () {
        var _this = this;
        if (StorageManager_1.TheStorageManager.getInstance().getNumber(StorageConfig_1.StorageKey.StoreHeroID + this.reward_list[0].reward_id % 110000, 0) == 0) {
            UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.StoreHeroShowUi, UIConfig_1.UILayerLevel.Two, { onCompleted: function (uiNode) {
                    uiNode.getComponent(StoreHeroShowUi_1.default).init({
                        onClose: function () {
                            var rewardList = [];
                            _this.reward_list.forEach(function (v, k) {
                                var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
                                PropManager_1.PropManager.getInstance().changePropNum(v.reward_id, v.reward_num);
                                rewardList.push(item);
                            });
                            PayManager_1.PayManager.getInstance().addPayNum(_this.id);
                            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.FirstPayGetState, 1);
                            GameManager_1.default.getInstance().showMultipleGetTip(rewardList, (function () {
                                _this.destroySelf();
                                var mainNode = cc.find('Canvas/main_ui');
                                if (mainNode) {
                                    var main = mainNode.getComponent(MainUi_1.default);
                                    if (main) {
                                        main.refreshRight();
                                    }
                                }
                            }).bind(_this));
                        }
                    });
                    uiNode.getComponent(StoreHeroShowUi_1.default).initData(_this.reward_list[0].reward_id % 110000);
                } });
        }
        else {
            var rewardList_1 = [];
            this.reward_list.forEach(function (v, k) {
                var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
                PropManager_1.PropManager.getInstance().changePropNum(v.reward_id, v.reward_num);
                rewardList_1.push(item);
            });
            PayManager_1.PayManager.getInstance().addPayNum(this.id);
            StorageManager_1.TheStorageManager.getInstance().setItem(StorageConfig_1.StorageKey.FirstPayGetState, 1);
            GameManager_1.default.getInstance().showMultipleGetTip(rewardList_1, (function () {
                _this.destroySelf();
                var mainNode = cc.find('Canvas/main_ui');
                if (mainNode) {
                    var main = mainNode.getComponent(MainUi_1.default);
                    if (main) {
                        main.refreshRight();
                    }
                }
            }).bind(this));
        }
        HeroManager_1.HeroManager.getInstance().reportHeroList();
    };
    // clickBtnClose()
    // {
    //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
    //     this.destroySelf();
    // }
    PayFirstChargeUi.prototype.destroySelf = function () {
        for (var itemarrindex = 0; itemarrindex < this.itemarr.length; itemarrindex++) {
            this.itemarr[itemarrindex].removeFromParent();
        }
        this.itemarr = new Array();
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
    };
    __decorate([
        property(cc.Node)
    ], PayFirstChargeUi.prototype, "itmeparent", void 0);
    PayFirstChargeUi = __decorate([
        ccclass
    ], PayFirstChargeUi);
    return PayFirstChargeUi;
}(UIComponent_1.default));
exports.default = PayFirstChargeUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUGF5Rmlyc3RDaGFyZ2VVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsOENBQXlDO0FBQ3pDLHdEQUF1RDtBQUV2RCxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELG9FQUErRDtBQUMvRCxtREFBa0Q7QUFFbEQsMERBQXNEO0FBQ3RELDREQUE4RDtBQUM5RCw0REFBdUQ7QUFFdkQsc0RBQW1GO0FBQ25GLDRDQUF1QztBQUN2QyxpREFBNEM7QUFDNUMsMkNBQXNEO0FBRXRELDZDQUE0QztBQUM1QywyQ0FBMEM7QUFFcEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVc7SUFBekQ7UUFBQSxxRUF5SUM7UUF2SUcsaUJBQVcsR0FBZTtZQUN0QixFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQztZQUMvQixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQztZQUM5QixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQztZQUM5QixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQztZQUM5QixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQztZQUM5QixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEdBQUcsRUFBQztZQUNoQyxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQztTQUFDLENBQUM7UUFFckMsMkJBQTJCO1FBQzNCLHVCQUF1QjtRQUN2QixJQUFJO1FBRUosZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsUUFB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R0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3pCLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQXhIRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNTO0lBZlYsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0F5SXBDO0lBQUQsdUJBQUM7Q0F6SUQsQUF5SUMsQ0F6STZDLHFCQUFXLEdBeUl4RDtrQkF6SW9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgU3RvcmFnZUtleSB9IGZyb20gXCIuLi9TdG9yYWdlL1N0b3JhZ2VDb25maWdcIjtcclxuaW1wb3J0IHsgVGhlU3RvcmFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vU3RvcmFnZS9TdG9yYWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgU3RvcmVIZXJvU2hvd1VpIGZyb20gXCIuLi9TdG9yZS9TdG9yZUhlcm9TaG93VWlcIjtcclxuaW1wb3J0IHsgUGF5VWlJbmRleCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgTWFpblVpIGZyb20gXCIuLi9VSS9ob21lL01haW5VaVwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVJUGF0aCwgVUlMYXllckxldmVsIH0gZnJvbSBcIi4uL1VJL1VJQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUGF5TWFuYWdlciB9IGZyb20gXCIuL1BheU1hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5Rmlyc3RDaGFyZ2VVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICByZXdhcmRfbGlzdDpSZXdhcmREYXRhW10gPVtcclxuICAgICAgICB7cmV3YXJkX2lkOjExMDAwOCxyZXdhcmRfbnVtOjB9LFxyXG4gICAgICAgIHtyZXdhcmRfaWQ6MzAxMTMscmV3YXJkX251bToxfSxcclxuICAgICAgICB7cmV3YXJkX2lkOjMwMjEzLHJld2FyZF9udW06MX0sXHJcbiAgICAgICAge3Jld2FyZF9pZDozMDMxMyxyZXdhcmRfbnVtOjF9LFxyXG4gICAgICAgIHtyZXdhcmRfaWQ6MzA0MTMscmV3YXJkX251bToxfSxcclxuICAgICAgICB7cmV3YXJkX2lkOjEwMDAyLHJld2FyZF9udW06NjAwfSxcclxuICAgICAgICB7cmV3YXJkX2lkOjQwMDA0LHJld2FyZF9udW06MTB9XTtcclxuICAgIFxyXG4gICAgLy8gcHJvdGVjdGVkIHN0YXJ0KCk6IHZvaWR7XHJcbiAgICAvLyAgICAgdGhpcy5pbml0KG51bGwpO1xyXG4gICAgLy8gfVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpdG1lcGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIFxyXG4gICAgaWQ9XCJjMzAxXCJcclxuICAgIGl0ZW1hcnI6Y2MuTm9kZVtdPVtdXHJcblxyXG4gICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmluaXQodWlBYyk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgICAgIEV2ZW50TWFuYWdlci5wb3N0UmVkRXZlbnQoUmVkRXZlbnRTdHJpbmcuUkVEX1RJUCxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvdUNob25nLGZhbHNlLFJlZEV2ZW50VHlwZS5CdG5fTWFpbl9TaG91Q2hvbmcpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7pppblhYXngrnlh7vmrKHmlbApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hEYXRhKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaXRlbWFycmluZGV4ID0gMDsgaXRlbWFycmluZGV4IDwgdGhpcy5pdGVtYXJyLmxlbmd0aDsgaXRlbWFycmluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtYXJyW2l0ZW1hcnJpbmRleF0ucmVtb3ZlRnJvbVBhcmVudCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnJld2FyZF9saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAvLyBsZXQgaXRlbT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHJld2FyZERhdGEucmV3YXJkX2lkLHJld2FyZERhdGEucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgIC8vIGl0ZW0uc2NhbGU9MC44MjtcclxuICAgICAgICAgICAgLy8gaXRlbS5wYXJlbnQ9dGhpcy5wcm9wO1xyXG4gICAgICAgICAgICAvLyBpdGVtLng9LTY3K2xldmVsMyo5MDtcclxuICAgICAgICAgICAgLy8gaXRlbS55PS00MCtTdGFyaW5kZXgqMTE1LTExNTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHRoaXMucmV3YXJkX2xpc3RbaW5kZXhdLnJld2FyZF9pZCx0aGlzLnJld2FyZF9saXN0W2luZGV4XS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgaXRlbS5zY2FsZSA9IDAuOTtcclxuICAgICAgICAgICAgaXRlbS5wYXJlbnQ9dGhpcy5pdG1lcGFyZW50LmNoaWxkcmVuW2luZGV4XVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1hcnIucHVzaChpdGVtKVxyXG4gICAgICAgICAgICAvLyAuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyaWNoVGV4dFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDE0NDAwMDIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdvQnRuXCIpLmdldENoaWxkQnlOYW1lKFwidHh0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPVwiXCIrUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheUluZm8odGhpcy5pZCkucHJpY2VcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnb0J0blwiKS5hY3RpdmUgPSBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdjMzAxJyk8PTA7XHJcbiAgICAgICAgLy8gaWYoUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzRmlyc3RQYXkoKSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdvQnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnZXRCdG5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ29CdG5cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ2V0QnRuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrR29CdG4oKXtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu6aaW5YWF54K55Ye76LSt5Lmw5oyJ6ZKuKTtcclxuICAgICAgICBpZihQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdjMzAxJyk8PTApe1xyXG4gICAgICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BheSh7cmVzdWx0Oihpc1BheTpib29sZWFuKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoaXNQYXkpe1xyXG4gICAgICAgICAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7pppblhYXotK3kubDmiJDlip/mjInpkq4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DbGlja1JlY2VpdmVCdG4oKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9fSx0aGlzLmlkKVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tSZWNlaXZlQnRuKCl7XHJcbiAgICAgICAgaWYoVGhlU3RvcmFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROdW1iZXIoU3RvcmFnZUtleS5TdG9yZUhlcm9JRCArIHRoaXMucmV3YXJkX2xpc3RbMF0ucmV3YXJkX2lkICUgMTEwMDAwLDApID09IDApe1xyXG4gICAgICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLlN0b3JlSGVyb1Nob3dVaSxVSUxheWVyTGV2ZWwuVHdvLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+e1xyXG4gICAgICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChTdG9yZUhlcm9TaG93VWkpLmluaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJld2FyZExpc3Q6Y2MuTm9kZVtdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmV3YXJkX2xpc3QuZm9yRWFjaCgodixrKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh2LnJld2FyZF9pZCx2LnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKHYucmV3YXJkX2lkLHYucmV3YXJkX251bSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXdhcmRMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkUGF5TnVtKHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaGVTdG9yYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEl0ZW0oU3RvcmFnZUtleS5GaXJzdFBheUdldFN0YXRlLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChyZXdhcmRMaXN0LCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1haW5Ob2RlPWNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtYWluTm9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1haW49bWFpbk5vZGUuZ2V0Q29tcG9uZW50KE1haW5VaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobWFpbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW4ucmVmcmVzaFJpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KFN0b3JlSGVyb1Nob3dVaSkuaW5pdERhdGEodGhpcy5yZXdhcmRfbGlzdFswXS5yZXdhcmRfaWQgJSAxMTAwMDApO1xyXG4gICAgICAgICAgICB9fSk7IFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgcmV3YXJkTGlzdDpjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRfbGlzdC5mb3JFYWNoKCh2LGspID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHYucmV3YXJkX2lkLHYucmV3YXJkX251bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odi5yZXdhcmRfaWQsdi5yZXdhcmRfbnVtKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQYXlOdW0odGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRoZVN0b3JhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2V0SXRlbShTdG9yYWdlS2V5LkZpcnN0UGF5R2V0U3RhdGUsMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJld2FyZExpc3QsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFpbk5vZGU9Y2MuZmluZCgnQ2FudmFzL21haW5fdWknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1haW5Ob2RlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFpbj1tYWluTm9kZS5nZXRDb21wb25lbnQoTWFpblVpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtYWluKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbi5yZWZyZXNoUmlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEhlcm9NYW5hZ2VyLmdldEluc3RhbmNlKCkucmVwb3J0SGVyb0xpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjbGlja0J0bkNsb3NlKClcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgLy8gICAgIHRoaXMuZGVzdHJveVNlbGYoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBkZXN0cm95U2VsZigpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaXRlbWFycmluZGV4ID0gMDsgaXRlbWFycmluZGV4IDwgdGhpcy5pdGVtYXJyLmxlbmd0aDsgaXRlbWFycmluZGV4KyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtYXJyW2l0ZW1hcnJpbmRleF0ucmVtb3ZlRnJvbVBhcmVudCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbWFycj1uZXcgQXJyYXkoKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=