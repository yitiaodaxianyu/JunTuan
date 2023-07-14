"use strict";
cc._RF.push(module, '3e306aF0pJHvKz3kS+PaXHk', 'GuaJiGift');
// Scripts/GuaJi/Ui/GuaJiGift.ts

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
var OfflineRevenue_1 = require("../../JsonData/OfflineRevenue");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var EventManager_1 = require("../../Tools/EventManager");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var OfflineUi_1 = require("./OfflineUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiGift = /** @class */ (function (_super) {
    __extends(GuaJiGift, _super);
    function GuaJiGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reward_num = 0;
        _this.skeleton = null;
        _this.icon_index = 0;
        _this.is_press = false;
        return _this;
    }
    GuaJiGift.prototype.onLoad = function () {
        this.skeleton = this.node.getComponent(sp.Skeleton);
        // this.node.on(cc.Node.EventType.TOUCH_START,()=>{
        //     this.skeleton.setAnimation(0,"chest_start"+this.icon_index,true);
        //     this.is_press=true;
        // },this);
        // this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,()=>{
        //     this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);
        //     this.is_press=false;
        // },this);
    };
    GuaJiGift.prototype.onEnable = function () {
        this.cheak();
        this.unschedule(this.cheak);
        this.schedule(this.cheak, 10);
    };
    GuaJiGift.prototype.cheak = function () {
        var offsetMin = OfflineRevenue_1.OfflineRevenueManager.getGuaJiMin();
        if (offsetMin > 480) {
            offsetMin = 480;
        }
        if (offsetMin < 0) {
            offsetMin = 0;
        }
        var iconIndex = 0;
        if (offsetMin < 30) {
            iconIndex = 0;
        }
        else if (offsetMin < 60) {
            iconIndex = 1;
        }
        else if (offsetMin < 90) {
            iconIndex = 2;
        }
        else if (offsetMin < 120) {
            iconIndex = 3;
        }
        else if (offsetMin < 150) {
            iconIndex = 4;
        }
        else {
            iconIndex = 5;
        }
        this.icon_index = iconIndex;
        if (this.is_press == false) {
            //this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);
        }
    };
    GuaJiGift.prototype.onClick = function () {
        var _this = this;
        // FollowManager.getInstance().followEvent(Follow_Type.挂机奖励点击用户数);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.离线奖励点击次数);
        //this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);        
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Guaji, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(OfflineUi_1.default).init({
                    onRefresh: function () {
                        _this.cheak();
                        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Guaji);
                    }
                });
            }, });
        this.is_press = false;
        this.cheak();
    };
    GuaJiGift = __decorate([
        ccclass
    ], GuaJiGift);
    return GuaJiGift;
}(cc.Component));
exports.default = GuaJiGift;

cc._RF.pop();