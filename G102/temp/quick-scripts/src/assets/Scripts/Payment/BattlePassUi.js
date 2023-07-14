"use strict";
cc._RF.push(module, '7bcfcdH7jRNkJEl9ZR1IhmR', 'BattlePassUi');
// Scripts/Payment/BattlePassUi.ts

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
var BattlePassData_1 = require("../BattlePass/BattlePassData");
var BattlePassItem_1 = require("../BattlePass/BattlePassItem");
var BattlePassManager_1 = require("../BattlePass/BattlePassManager");
var GameData_1 = require("../GameData");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageConstants_1 = require("../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var TaskUi_1 = require("../Task/TaskUi");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var EventManager_1 = require("../Tools/EventManager");
var MyTool_1 = require("../Tools/MyTool");
var UIComponent_1 = require("../UI/UIComponent");
var UIConfig_1 = require("../UI/UIConfig");
var UIManager_1 = require("../UI/UIManager");
var PayManager_1 = require("./PayManager");
var ShowIndex;
(function (ShowIndex) {
    ShowIndex[ShowIndex["item"] = 0] = "item";
    ShowIndex[ShowIndex["levelProgress"] = 1] = "levelProgress";
    ShowIndex[ShowIndex["levelIcon"] = 2] = "levelIcon";
    ShowIndex[ShowIndex["levelLabel"] = 3] = "levelLabel";
})(ShowIndex || (ShowIndex = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var google_id = 'b501';
var BattlePassUi = /** @class */ (function (_super) {
    __extends(BattlePassUi, _super);
    function BattlePassUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab_item = null;
        _this.prefab_level_progress = null;
        _this.prefab_level_label = null;
        _this.prefab_level_icon = null;
        _this.help = null;
        _this.mask = null;
        // remain_label:cc.Label=null;
        _this.pos_xx = [-166, -12, 94];
        _this.item_yy = [];
        //分帧加载
        _this.cur_load_index = 0;
        _this.a_load_num = 10;
        _this.delay_time = 0.1;
        _this.max_load_num = 0;
        _this.cur_level_yy = 0;
        //滚动层设置
        _this.topY = 10;
        _this.spacingY = 10;
        _this.bottomY = 10;
        _this.itemHeight = 0;
        _this.totalHeight = 0;
        return _this;
    }
    BattlePassUi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var top = this.node.getChildByName('top');
        // this.remain_label=top.getChildByName('remainLabel').getComponent(cc.Label);
        BattlePassManager_1.BattlePassManager.refreshBuyState();
        this.adaptation();
        this.max_load_num = BattlePassManager_1.BattlePassManager.getMaxLevel() + 1;
        this.loadItem();
        this.loadLevelData();
        this.schedule(this.loadItem, this.delay_time);
    };
    BattlePassUi.prototype.start = function () {
        // this.schedule(this.showRemainTime,1);
        // this.showRemainTime();
        PayManager_1.PayManager.getInstance().addTodayShow(ThirdParty_1.PayUiIndex.ZhanLing);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_ZhanLing);
    };
    BattlePassUi.prototype.adaptation = function () {
        //上下模块
        var top = this.node.getChildByName('top');
        var bottom = this.node.getChildByName('bottom');
        var wp = cc.winSize;
        top.y = (wp.height / 2) - 148;
        bottom.y = -wp.height / 2;
        var centerHeight = (top.y - top.height) - (bottom.y + bottom.height);
        var centerY = bottom.y + bottom.height + centerHeight / 2;
        var scroll = this.node.getChildByName('scroll');
        scroll.y = centerY;
        scroll.height = centerHeight;
        scroll.getChildByName('view').height = centerHeight;
        // let btnClaimAll=top.getChildByName('btnClaim');
        // btnClaimAll.getComponent(cc.Button).interactable=false;
        // btnClaimAll.getChildByName('clamText').color=cc.color(91,91,91);
        var rewardBtn = top.getChildByName("WarOrder_Btn_0");
        if (BattlePassManager_1.BattlePassManager.is_buy) {
            rewardBtn.getComponent(cc.Button).interactable = false;
            rewardBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
            rewardBtn.getComponentInChildren(TextLanguage_1.default).setTextId(100012);
        }
        //价格
        // let priceText=bottom.getChildByName('btnBuy').getChildByName('priceText');
        // let payData = PayManager.getInstance().getPayInfo(google_id);
        // priceText.getComponent(cc.Label).string = payData.price + payData.currency;
    };
    BattlePassUi.prototype.loadItem = function () {
        var _this = this;
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        var isCancel = false;
        var series = BattlePassManager_1.BattlePassManager.getUseBattlePassSeries();
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        // let btnUp=content.getChildByName('btnUp');
        // btnUp.zIndex=ShowIndex.levelIcon;
        for (var i = 0; i < this.a_load_num; i++) {
            var loadIndex = i + this.a_load_num * this.cur_load_index;
            var loadLevel = loadIndex;
            var item = cc.instantiate(this.prefab_item);
            item.y = -((this.topY + item.height / 2) + loadIndex * (item.height + this.spacingY));
            item.name = "" + loadLevel;
            item.zIndex = ShowIndex.item;
            content.addChild(item);
            this.itemHeight = item.height;
            this.item_yy.push(item.y);
            //往item里添加奖励道具
            var id = BattlePassData_1.BattlePassDataManager.getId(series, (loadLevel));
            item.getComponent(BattlePassItem_1.default).init(id, loadLevel, function () {
                _this.claimAfterRefresh();
            }, function () {
                _this.buyAfterRefresh();
            });
            //        
            //添加icon
            var icon = cc.instantiate(this.prefab_level_icon);
            icon.y = item.y + 3;
            icon.x = -65;
            icon.zIndex = ShowIndex.levelIcon;
            content.addChild(icon);
            //
            var levelLabel = cc.instantiate(this.prefab_level_label);
            levelLabel.y = item.y + 3;
            levelLabel.x = -65;
            levelLabel.zIndex = ShowIndex.levelLabel;
            content.addChild(levelLabel);
            // let bpdm=BattlePassDataManager.getInstance();
            // let boxM=GameManager.getInstance().box_json_data;
            // let jsonData=bpdm.getJsonBattlePassData(id);
            levelLabel.getComponent(cc.Label).string = "" + BattlePassData_1.BattlePassDataManager.getInstance().getJsonBattlePassData(id).RequiredExp;
            if (curLevel == loadLevel) {
                this.cur_level_yy = item.y;
                if (curLevel < BattlePassManager_1.BattlePassManager.getMaxLevel()) {
                    var nextId = BattlePassData_1.BattlePassDataManager.getId(series, (loadLevel + 1));
                    // btnUp.x=icon.x;
                    // btnUp.y=item.y-(item.height/2+this.spacingY/2);
                    // btnUp.getChildByName('gemLabel').getComponent(cc.Label).string=''+BattlePassDataManager.getInstance().getCostDimond(nextId);
                }
            }
            if (curLevel < loadLevel) {
                var mask = cc.instantiate(this.mask);
                levelLabel.addChild(mask);
            }
            if (loadIndex >= (this.max_load_num - 1)) {
                isCancel = true;
                break;
            }
        }
        if (isCancel) {
            this.unschedule(this.loadItem);
            var height = (this.spacingY + this.itemHeight) * this.max_load_num - this.spacingY;
            this.totalHeight = this.topY + this.bottomY + height;
            content.height = this.totalHeight;
            this.startScroll();
            //添加关卡进度
            this.refreshLevelProgress(height - (this.itemHeight));
            this.claimAfterRefresh();
        }
        this.cur_load_index++;
    };
    BattlePassUi.prototype.startScroll = function (dt) {
        if (dt === void 0) { dt = 0.5; }
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        var scrollHeiht = -this.cur_level_yy;
        if (scrollHeiht < content.parent.height / 2) {
            scrollHeiht = content.parent.height / 2;
        }
        if (scrollHeiht > (this.totalHeight - content.parent.height / 2)) {
            scrollHeiht = (this.totalHeight - content.parent.height / 2);
        }
        cc.tween(content).to(dt, { y: scrollHeiht }).start();
    };
    BattlePassUi.prototype.loadLevelData = function () {
        var height = (10 + 138) * this.max_load_num - 10;
        var totalHeight = 10 + 10 + height - 138;
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var top = this.node.getChildByName('top');
        //关卡等级
        // let levelLabel=top.getChildByName('levelLabel').getComponent(cc.Label);
        // levelLabel.string=""+curLevel;
        //经验值
        // let expLabel=top.getChildByName('expLabel').getComponent(cc.Label);
        // let exp=BattlePassManager.getCurExp()%10;
        // expLabel.string=exp+"/"+10;
        // top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress=exp/10;
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        var levelProgress = cc.instantiate(this.prefab_level_progress);
        levelProgress.height = totalHeight;
        levelProgress.getComponent(cc.ProgressBar).totalLength = totalHeight;
        levelProgress.getComponent(cc.ProgressBar).progress = (curLevel) / (BattlePassManager_1.BattlePassManager.getMaxLevel());
        levelProgress.getComponent(cc.ProgressBar).progress += curLevel == 0 ? 0 : 1 / BattlePassManager_1.BattlePassManager.getMaxLevel() * (BattlePassManager_1.BattlePassManager.getCurExp() / BattlePassData_1.BattlePassDataManager.getInstance().getJsonDataByLevel(curLevel).RequiredExp);
        levelProgress.y = this.item_yy[0];
        levelProgress.zIndex = ShowIndex.levelProgress;
        content.addChild(levelProgress);
        top.getChildByName("remainTimeLabel").getComponent(TextLanguage_1.default).setTextId(100047);
        top.getChildByName("remainTimeLabel").getComponent(TextLanguage_1.default).setReplaceValue('~', String(BattlePassManager_1.BattlePassManager.getMaxLevel() - new Date().getDate()));
        var isBuy = BattlePassManager_1.BattlePassManager.is_buy;
        // let btnBuy=this.node.getChildByName('bottom').getChildByName('btnBuy');
        // btnBuy.active=!isBuy;
    };
    //显示刷新关卡进度
    BattlePassUi.prototype.refreshLevelProgress = function (height) {
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        var levelProgress = content.getChildByName('levelProgressBar');
        if (height) {
            levelProgress.height = height;
            levelProgress.getComponent(cc.ProgressBar).totalLength = height;
            levelProgress.y = this.item_yy[0];
        }
        levelProgress.getComponent(cc.ProgressBar).progress = (curLevel - 1) / (BattlePassManager_1.BattlePassManager.getMaxLevel() - 1);
        levelProgress.getComponent(cc.ProgressBar).progress += curLevel == 0 ? 0 : 1 / BattlePassManager_1.BattlePassManager.getMaxLevel() * (BattlePassManager_1.BattlePassManager.getCurExp() / BattlePassData_1.BattlePassDataManager.getInstance().getJsonDataByLevel(curLevel).RequiredExp);
        var top = this.node.getChildByName('top');
        //关卡等级
        // let levelLabel=top.getChildByName('levelLabel').getComponent(cc.Label);
        // levelLabel.string=""+curLevel;
        //经验值
        // let expLabel=top.getChildByName('expLabel').getComponent(cc.Label);
        // let exp=BattlePassManager.getCurExp()%10;
        // expLabel.string=exp+"/"+10;
        // top.getChildByName('expProgressBar').getComponent(cc.ProgressBar).progress=exp/10;        
    };
    BattlePassUi.prototype.showRemainTime = function () {
        //获取当前时间
        var date = new Date();
        var totalDay = MyTool_1.default.getMonthDays(date.getFullYear(), date.getMonth() + 1);
        var remainDay = totalDay - date.getDate();
        if (remainDay > 0) {
            // this.remain_label.string=LanguageManager.getInstance().getString(LanguageIndex.Reset)+": "+remainDay+" "+LanguageManager.getInstance().getString(LanguageIndex.Day);
        }
        else {
            var curHours = date.getHours();
            var curMin = date.getMinutes();
            var curSec = date.getSeconds();
            var remainHours = 24 - curHours - 1;
            var remainMin = 60 - curMin;
            var remainSec = 60 - curSec;
            var shiStr = '0' + remainHours;
            if (remainHours >= 10) {
                shiStr = '' + remainHours;
            }
            var fenStr = '0' + remainMin;
            if (remainMin >= 10) {
                fenStr = '' + remainMin;
            }
            var miaoStr = '0' + remainSec;
            if (remainSec >= 10) {
                miaoStr = '' + remainSec;
            }
            // this.remain_label.string=LanguageManager.getInstance().getString(LanguageIndex.RefreshTime)+shiStr+':'+fenStr+':'+miaoStr;
            GameData_1.default.getInstance().checkIsNewDay();
        }
    };
    BattlePassUi.prototype.claimAfterRefresh = function () {
        //检查是否可以领取所有按钮
        var top = this.node.getChildByName('top');
        var isBuy = BattlePassManager_1.BattlePassManager.is_buy;
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var series = BattlePassManager_1.BattlePassManager.getUseBattlePassSeries();
        var isCanClaim = false;
        for (var i = 0; i <= BattlePassManager_1.BattlePassManager.getMaxLevel(); i++) {
            var isUnLock = curLevel >= i;
            if (isUnLock) {
                var id = BattlePassData_1.BattlePassDataManager.getId(series, i);
                var claimState0 = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Free, id);
                var claimState1 = BattlePassManager_1.BattlePassManager.getClaimState(BattlePassManager_1.BattlePassClaimType.Buy, id);
                if (claimState0 <= 0) {
                    isCanClaim = true;
                    break;
                }
                if (isBuy && claimState1 <= 0) {
                    isCanClaim = true;
                    break;
                }
            }
            else {
                break;
            }
        }
        if (BattlePassManager_1.BattlePassManager.is_buy) {
            var rewardBtn = top.getChildByName('WarOrder_Btn_0');
            rewardBtn.getComponent(cc.Button).interactable = isCanClaim;
            var material = isCanClaim ? cc.Material.getBuiltinMaterial("2d-sprite") : cc.Material.getBuiltinMaterial("2d-gray-sprite");
            rewardBtn.getComponentInChildren(cc.Label).setMaterial(0, material);
            rewardBtn.getComponentInChildren(TextLanguage_1.default).setTextId(100012);
        }
    };
    BattlePassUi.prototype.buyAfterRefresh = function () {
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        for (var i = 0; i <= BattlePassManager_1.BattlePassManager.getMaxLevel(); i++) {
            var item = content.getChildByName('' + i);
            if (item) {
                item.getComponent(BattlePassItem_1.default).refreshData();
            }
        }
        var isBuy = BattlePassManager_1.BattlePassManager.is_buy;
        // let btnBuy=this.node.getChildByName('bottom').getChildByName('btnBuy');
        // btnBuy.active=!isBuy;
        if (isBuy) {
            var top = this.node.getChildByName('top');
            var rewardBtn = top.getChildByName("WarOrder_Btn_0");
            if (BattlePassManager_1.BattlePassManager.is_buy) {
                rewardBtn.getComponent(cc.Button).interactable = false;
                rewardBtn.getComponentInChildren(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                rewardBtn.getComponentInChildren(TextLanguage_1.default).setTextId(100012);
                this.claimAfterRefresh();
            }
            // rewardBtn.getComponentInChildren(TextLanguage).setTextId(100012);
        }
    };
    BattlePassUi.prototype.refreshBtnUp = function () {
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var btnUp = content.getChildByName('btnUp');
        var item = content.getChildByName("" + curLevel);
        this.cur_level_yy = item.y;
        if (curLevel < BattlePassManager_1.BattlePassManager.getMaxLevel()) {
            var nextId = BattlePassData_1.BattlePassDataManager.getId(BattlePassManager_1.BattlePassManager.getUseBattlePassSeries(), (curLevel + 1));
            btnUp.y = item.y - (item.height / 2 + 10 / 2);
            btnUp.getChildByName('gemLabel').getComponent(cc.Label).string = '' + BattlePassData_1.BattlePassDataManager.getInstance().getCostDimond(nextId);
        }
        else {
            btnUp.active = false;
        }
    };
    BattlePassUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    BattlePassUi.prototype.clickBtnTip = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var help = cc.instantiate(this.help);
        this.node.addChild(help);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令任务提示);
    };
    BattlePassUi.prototype.clickBtnClaimAll = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令点击全部领取的次数);
        var content = this.node.getChildByName('scroll').getComponent(cc.ScrollView).content;
        var nodeArr = new Array();
        for (var i = 0; i <= BattlePassManager_1.BattlePassManager.getMaxLevel(); i++) {
            var item = content.getChildByName('' + i);
            if (item) {
                var nodes = item.getComponent(BattlePassItem_1.default).toClaimAll(false);
                for (var n = 0; n < nodes.length; n++) {
                    nodeArr.push(nodes[n]);
                }
            }
        }
        GameManager_1.default.getInstance().showMultipleGetTip(nodeArr);
        this.claimAfterRefresh();
    };
    BattlePassUi.prototype.clickBtnBuy = function () {
        var _this = this;
        // GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        // FollowManager.getInstance().followEvent(Follow_Type.战令购买点击数);
        // ApkManager.getInstance().showPay({result:(isPay:boolean)=>{
        //     if(isPay){
        //         FollowManager.getInstance().followEvent(Follow_Type.战令解锁用户数);
        //         PayManager.getInstance().addPayNum(google_id);
        //         BattlePassManager.refreshBuyState();
        //         this.buyAfterRefresh();
        //     }
        // }},google_id);
        GameManager_1.default.getInstance().showBuyDialog(LanguageManager_1.default.getInstance().getStrByTextId(910002), function () {
            ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                    if (isPay) {
                        PayManager_1.PayManager.getInstance().addPayNum(google_id);
                        BattlePassManager_1.BattlePassManager.refreshBuyState();
                        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.战令解锁用户数);
                        PayManager_1.PayManager.getInstance().addPayNum(google_id);
                        // BattlePassManager.refreshBuyState();
                        _this.buyAfterRefresh();
                    }
                } }, google_id);
        }, null, 2, PayManager_1.PayManager.getInstance().getPayInfo(google_id).price, PayManager_1.PayManager.getInstance().getPayInfo(google_id).currency);
    };
    BattlePassUi.prototype.clickRewardAllBtn = function () {
        if (BattlePassManager_1.BattlePassManager.is_buy == true) {
            this.clickBtnClaimAll();
        }
        else {
            this.clickBtnBuy();
        }
    };
    BattlePassUi.prototype.clickBtnUp = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var curLevel = BattlePassManager_1.BattlePassManager.getCurLevel();
        var nextId = BattlePassData_1.BattlePassDataManager.getId(BattlePassManager_1.BattlePassManager.getUseBattlePassSeries(), (curLevel + 1));
        var costGem = BattlePassData_1.BattlePassDataManager.getInstance().getCostDimond(nextId);
        if (PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -costGem)) {
            // BattlePassManager.addCurExp(10);
            this.refreshBtnUp();
            this.buyAfterRefresh();
            this.claimAfterRefresh();
            this.refreshLevelProgress();
            this.startScroll(0.2);
        }
        else {
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getString(LanguageConstants_1.LanguageIndex.Insufficient_gems));
        }
    };
    BattlePassUi.prototype.onClickGoBtn = function () {
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Task, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(TaskUi_1.default).init(null);
            }, });
    };
    __decorate([
        property(cc.Prefab)
    ], BattlePassUi.prototype, "prefab_item", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattlePassUi.prototype, "prefab_level_progress", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattlePassUi.prototype, "prefab_level_label", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattlePassUi.prototype, "prefab_level_icon", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattlePassUi.prototype, "help", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattlePassUi.prototype, "mask", void 0);
    BattlePassUi = __decorate([
        ccclass
    ], BattlePassUi);
    return BattlePassUi;
}(UIComponent_1.default));
exports.default = BattlePassUi;

cc._RF.pop();