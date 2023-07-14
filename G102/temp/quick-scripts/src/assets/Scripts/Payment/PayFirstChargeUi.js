"use strict";
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