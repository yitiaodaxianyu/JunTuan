"use strict";
cc._RF.push(module, '88874PCV/FBQ4aBbRVLJ9up', 'PayGitBag');
// Scripts/Payment/PayGitBag.ts

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
var CyclePack_1 = require("./Data/CyclePack");
var AudioConstants_1 = require("../Sound/AudioConstants");
var PayGitBagItem_1 = require("./PayGitBagItem");
var PayManager_1 = require("./PayManager");
var EventManager_1 = require("../Tools/EventManager");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GitState;
(function (GitState) {
    GitState[GitState["Day"] = 1] = "Day";
    GitState[GitState["Week"] = 2] = "Week";
    GitState[GitState["Month"] = 3] = "Month";
})(GitState || (GitState = {}));
var PayGitBag = /** @class */ (function (_super) {
    __extends(PayGitBag, _super);
    function PayGitBag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.git_state = GitState.Day;
        _this.git_bag_item = null;
        _this.pay_git_bag_ui = null;
        return _this;
    }
    PayGitBag.prototype.onEnable = function () {
        this.adaptation();
        this.refreshUI();
    };
    PayGitBag.prototype.adaptation = function () {
        var bottomNode = this.node.parent.getChildByName('bottom');
        var bottomHeight = bottomNode.height;
        var bottomY = bottomNode.y;
        var topNode = this.node.parent.getChildByName('top');
        var topHeight = topNode.height;
        var topY = topNode.y;
        var height = ((topY - topHeight) - (bottomY + bottomHeight));
        var centerY = (topY - topHeight - height / 2);
        var scrollView = this.node.getChildByName('itemScroll');
        scrollView.height = height;
        scrollView.y = centerY - 120;
        scrollView.getChildByName('view').height = height;
        this.node.getChildByName("top").y = topNode.y - (topNode.height / 2 + this.node.getChildByName("top").height);
    };
    PayGitBag.prototype.start = function () {
        PayManager_1.PayManager.getInstance().addTodayShow(ThirdParty_1.PayUiIndex.Gift);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_Gift);
    };
    PayGitBag.prototype.refreshUI = function () {
        var _this = this;
        for (var i = 1; i <= 3; i++) {
            var btn = this.node.getChildByName("top").getChildByName("btn" + i);
            if (i == this.git_state) {
                btn.getComponents(cc.Button).forEach(function (v, k) {
                    v.interactable = false;
                });
            }
            else {
                btn.getComponents(cc.Button).forEach(function (v, k) {
                    v.interactable = true;
                });
            }
        }
        var content = this.node.getChildByName("itemScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        var dataList = [];
        dataList = CyclePack_1.CyclePackManager.getInstance().getDataByType(this.git_state);
        dataList.forEach(function (v, k) {
            var item = cc.instantiate(_this.git_bag_item);
            item.getComponent(PayGitBagItem_1.default).initData(v);
            if (v.GiftText == 1) {
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = _this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Day");
            }
            else if (v.GiftText == 2) {
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = _this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Week");
            }
            else {
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = _this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Month");
            }
            content.addChild(item);
        });
    };
    PayGitBag.prototype.onBtnClick = function (e, index) {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        index = Number(index);
        if (index == 1) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每日礼包页签展示次数);
        }
        else if (index == 2) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每周礼包页签展示次数);
        }
        else {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.每月礼包页签展示次数);
        }
        if (this.git_state != index) {
            this.git_state = index;
            this.refreshUI();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], PayGitBag.prototype, "git_bag_item", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], PayGitBag.prototype, "pay_git_bag_ui", void 0);
    PayGitBag = __decorate([
        ccclass
    ], PayGitBag);
    return PayGitBag;
}(cc.Component));
exports.default = PayGitBag;

cc._RF.pop();