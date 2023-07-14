
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/BattlePassUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcQmF0dGxlUGFzc1VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQywrREFBcUU7QUFDckUsK0RBQTBEO0FBQzFELHFFQUF5RjtBQUN6Rix3Q0FBbUM7QUFDbkMsOENBQXlDO0FBQ3pDLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsd0VBQW1FO0FBQ25FLG9FQUErRDtBQUMvRCw4REFBeUQ7QUFDekQsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQseUNBQW9DO0FBQ3BDLHVEQUFzRDtBQUN0RCxzREFBbUY7QUFDbkYsMENBQXFDO0FBQ3JDLGlEQUE0QztBQUM1QywyQ0FBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLDJDQUEwQztBQUcxQyxJQUFLLFNBTUo7QUFORCxXQUFLLFNBQVM7SUFDVix5Q0FBTSxDQUFBO0lBQ04sMkRBQWEsQ0FBQTtJQUNiLG1EQUFTLENBQUE7SUFDVCxxREFBVSxDQUFBO0FBRWQsQ0FBQyxFQU5JLFNBQVMsS0FBVCxTQUFTLFFBTWI7QUFFSyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFNLFNBQVMsR0FBVSxNQUFNLENBQUM7QUFHaEM7SUFBMEMsZ0NBQVc7SUFBckQ7UUFBQSxxRUFxYUM7UUFsYUcsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsMkJBQXFCLEdBQWMsSUFBSSxDQUFDO1FBR3hDLHdCQUFrQixHQUFjLElBQUksQ0FBQztRQUdyQyx1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMsVUFBSSxHQUFXLElBQUksQ0FBQztRQUdwQixVQUFJLEdBQWEsSUFBSSxDQUFDO1FBRXRCLDhCQUE4QjtRQUU5QixZQUFNLEdBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUs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dUJBQVksQ0FBQyxHQUFHLEVBQUMsRUFBQyxXQUFXLEVBQUMsVUFBQyxNQUFNO2dCQUNsRixNQUFNLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsQ0FBQyxHQUFFLENBQUMsQ0FBQztJQUNULENBQUM7SUFqYUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytEQUNvQjtJQUd4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzREQUNpQjtJQUdyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNBO0lBR3BCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ0U7SUFsQkwsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXFhaEM7SUFBRCxtQkFBQztDQXJhRCxBQXFhQyxDQXJheUMscUJBQVcsR0FxYXBEO2tCQXJhb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCYXR0bGVQYXNzRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vQmF0dGxlUGFzcy9CYXR0bGVQYXNzRGF0YVwiO1xyXG5pbXBvcnQgQmF0dGxlUGFzc0l0ZW0gZnJvbSBcIi4uL0JhdHRsZVBhc3MvQmF0dGxlUGFzc0l0ZW1cIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc01hbmFnZXIsIEJhdHRsZVBhc3NDbGFpbVR5cGUgfSBmcm9tIFwiLi4vQmF0dGxlUGFzcy9CYXR0bGVQYXNzTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL0dhbWVEYXRhXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZUluZGV4IH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IFRleHRMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9UZXh0TGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFRhc2tVaSBmcm9tIFwiLi4vVGFzay9UYXNrVWlcIjtcclxuaW1wb3J0IHsgUGF5VWlJbmRleCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSUxheWVyTGV2ZWwsIFVJUGF0aCB9IGZyb20gXCIuLi9VSS9VSUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBheU1hbmFnZXIgfSBmcm9tIFwiLi9QYXlNYW5hZ2VyXCI7XHJcblxyXG5cclxuZW51bSBTaG93SW5kZXh7XHJcbiAgICBpdGVtPTAsXHJcbiAgICBsZXZlbFByb2dyZXNzLFxyXG4gICAgbGV2ZWxJY29uLFxyXG4gICAgbGV2ZWxMYWJlbCxcclxuXHJcbn1cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuY29uc3QgZ29vZ2xlX2lkOnN0cmluZyA9ICdiNTAxJztcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhdHRsZVBhc3NVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2l0ZW06IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByZWZhYl9sZXZlbF9wcm9ncmVzczogY2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJlZmFiX2xldmVsX2xhYmVsOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICBwcmVmYWJfbGV2ZWxfaWNvbjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIFxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIGhlbHA6Y2MuUHJlZmFiPW51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIG1hc2s6Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICAvLyByZW1haW5fbGFiZWw6Y2MuTGFiZWw9bnVsbDtcclxuXHJcbiAgICBwb3NfeHg6bnVtYmVyW109Wy0xNjYsLTEyLDk0XTtcclxuICAgIGl0ZW1feXk6bnVtYmVyW109W107XHJcbiAgICAvL+WIhuW4p+WKoOi9vVxyXG4gICAgY3VyX2xvYWRfaW5kZXg6bnVtYmVyPTA7XHJcbiAgICBhX2xvYWRfbnVtOm51bWJlcj0xMDtcclxuICAgIGRlbGF5X3RpbWU6bnVtYmVyPTAuMTtcclxuICAgIG1heF9sb2FkX251bTpudW1iZXI9MDtcclxuICAgIGN1cl9sZXZlbF95eTpudW1iZXI9MDtcclxuICAgIC8v5rua5Yqo5bGC6K6+572uXHJcbiAgICB0b3BZOm51bWJlcj0xMDtcclxuICAgIHNwYWNpbmdZOm51bWJlcj0xMDtcclxuICAgIGJvdHRvbVk6bnVtYmVyPTEwO1xyXG4gICAgaXRlbUhlaWdodDpudW1iZXI9MDtcclxuICAgIHRvdGFsSGVpZ2h0Om51bWJlcj0wO1xyXG5cclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbkxvYWQoKTtcclxuICAgICAgICBsZXQgdG9wPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG9wJyk7XHJcbiAgICAgICAgLy8gdGhpcy5yZW1haW5fbGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCdyZW1haW5MYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgQmF0dGxlUGFzc01hbmFnZXIucmVmcmVzaEJ1eVN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5tYXhfbG9hZF9udW09QmF0dGxlUGFzc01hbmFnZXIuZ2V0TWF4TGV2ZWwoKSsxOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkSXRlbSgpO1xyXG4gICAgICAgIHRoaXMubG9hZExldmVsRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5sb2FkSXRlbSx0aGlzLmRlbGF5X3RpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAvLyB0aGlzLnNjaGVkdWxlKHRoaXMuc2hvd1JlbWFpblRpbWUsMSk7XHJcbiAgICAgICAgLy8gdGhpcy5zaG93UmVtYWluVGltZSgpO1xyXG4gICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRUb2RheVNob3coUGF5VWlJbmRleC5aaGFuTGluZyk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1Nob3BfWmhhbkxpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRhcHRhdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgLy/kuIrkuIvmqKHlnZdcclxuICAgICAgICBsZXQgdG9wPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG9wJyk7XHJcbiAgICAgICAgbGV0IGJvdHRvbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHdwPWNjLndpblNpemU7XHJcbiAgICAgICAgdG9wLnk9KHdwLmhlaWdodC8yKSAtIDE0ODtcclxuICAgICAgICBib3R0b20ueT0td3AuaGVpZ2h0LzI7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCBjZW50ZXJIZWlnaHQ9KHRvcC55LXRvcC5oZWlnaHQpLShib3R0b20ueStib3R0b20uaGVpZ2h0KTtcclxuICAgICAgICBsZXQgY2VudGVyWT1ib3R0b20ueStib3R0b20uaGVpZ2h0K2NlbnRlckhlaWdodC8yO1xyXG4gICAgICAgIGxldCBzY3JvbGw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGwnKTtcclxuICAgICAgICBzY3JvbGwueT1jZW50ZXJZO1xyXG4gICAgICAgIHNjcm9sbC5oZWlnaHQ9Y2VudGVySGVpZ2h0O1xyXG4gICAgICAgIHNjcm9sbC5nZXRDaGlsZEJ5TmFtZSgndmlldycpLmhlaWdodD1jZW50ZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBidG5DbGFpbUFsbD10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkNsYWltJyk7XHJcbiAgICAgICAgLy8gYnRuQ2xhaW1BbGwuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIC8vIGJ0bkNsYWltQWxsLmdldENoaWxkQnlOYW1lKCdjbGFtVGV4dCcpLmNvbG9yPWNjLmNvbG9yKDkxLDkxLDkxKTtcclxuICAgICAgICBsZXQgcmV3YXJkQnRuID0gdG9wLmdldENoaWxkQnlOYW1lKFwiV2FyT3JkZXJfQnRuXzBcIik7XHJcbiAgICAgICAgaWYoQmF0dGxlUGFzc01hbmFnZXIuaXNfYnV5KXtcclxuICAgICAgICAgICAgcmV3YXJkQnRuLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXdhcmRCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCxjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgIHJld2FyZEJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAxMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Lu35qC8XHJcbiAgICAgICAgLy8gbGV0IHByaWNlVGV4dD1ib3R0b20uZ2V0Q2hpbGRCeU5hbWUoJ2J0bkJ1eScpLmdldENoaWxkQnlOYW1lKCdwcmljZVRleHQnKTtcclxuICAgICAgICAvLyBsZXQgcGF5RGF0YSA9IFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlJbmZvKGdvb2dsZV9pZCk7XHJcbiAgICAgICAgLy8gcHJpY2VUZXh0LmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGF5RGF0YS5wcmljZSArIHBheURhdGEuY3VycmVuY3k7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZEl0ZW0oKXtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgXHJcbiAgICAgICAgbGV0IGlzQ2FuY2VsPWZhbHNlOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHNlcmllcz1CYXR0bGVQYXNzTWFuYWdlci5nZXRVc2VCYXR0bGVQYXNzU2VyaWVzKCk7XHJcbiAgICAgICAgbGV0IGN1ckxldmVsPUJhdHRsZVBhc3NNYW5hZ2VyLmdldEN1ckxldmVsKCk7XHJcbiAgICAgICAgLy8gbGV0IGJ0blVwPWNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2J0blVwJyk7XHJcbiAgICAgICAgLy8gYnRuVXAuekluZGV4PVNob3dJbmRleC5sZXZlbEljb247XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5hX2xvYWRfbnVtOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbG9hZEluZGV4PWkrdGhpcy5hX2xvYWRfbnVtKnRoaXMuY3VyX2xvYWRfaW5kZXg7XHJcbiAgICAgICAgICAgIGxldCBsb2FkTGV2ZWw9bG9hZEluZGV4O1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1jYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYl9pdGVtKTtcclxuICAgICAgICAgICAgaXRlbS55PS0oKHRoaXMudG9wWStpdGVtLmhlaWdodC8yKStsb2FkSW5kZXgqKGl0ZW0uaGVpZ2h0K3RoaXMuc3BhY2luZ1kpKTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lPVwiXCIrbG9hZExldmVsO1xyXG4gICAgICAgICAgICBpdGVtLnpJbmRleD1TaG93SW5kZXguaXRlbTtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtSGVpZ2h0PWl0ZW0uaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1feXkucHVzaChpdGVtLnkpO1xyXG4gICAgICAgICAgICAvL+W+gGl0ZW3ph4zmt7vliqDlpZblirHpgZPlhbdcclxuICAgICAgICAgICAgbGV0IGlkPUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJZChzZXJpZXMsKGxvYWRMZXZlbCkpO1xyXG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChCYXR0bGVQYXNzSXRlbSkuaW5pdChpZCxsb2FkTGV2ZWwsKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhaW1BZnRlclJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSwoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXlBZnRlclJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBcclxuICAgICAgICAgICAgLy/mt7vliqBpY29uXHJcbiAgICAgICAgICAgIGxldCBpY29uPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2xldmVsX2ljb24pO1xyXG4gICAgICAgICAgICBpY29uLnk9aXRlbS55ICsgMztcclxuICAgICAgICAgICAgaWNvbi54PS02NTtcclxuICAgICAgICAgICAgaWNvbi56SW5kZXg9U2hvd0luZGV4LmxldmVsSWNvbjtcclxuICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChpY29uKTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgbGV0IGxldmVsTGFiZWw9Y2MuaW5zdGFudGlhdGUodGhpcy5wcmVmYWJfbGV2ZWxfbGFiZWwpO1xyXG4gICAgICAgICAgICBsZXZlbExhYmVsLnk9aXRlbS55ICsgMztcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC54PS02NTtcclxuICAgICAgICAgICAgbGV2ZWxMYWJlbC56SW5kZXg9U2hvd0luZGV4LmxldmVsTGFiZWw7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQobGV2ZWxMYWJlbCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBicGRtPUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAvLyBsZXQgYm94TT1HYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmJveF9qc29uX2RhdGE7XHJcbiAgICAgICAgICAgIC8vIGxldCBqc29uRGF0YT1icGRtLmdldEpzb25CYXR0bGVQYXNzRGF0YShpZCk7XHJcbiAgICAgICAgICAgIGxldmVsTGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIitCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uQmF0dGxlUGFzc0RhdGEoaWQpLlJlcXVpcmVkRXhwO1xyXG5cclxuICAgICAgICAgICAgaWYoY3VyTGV2ZWw9PWxvYWRMZXZlbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9sZXZlbF95eT1pdGVtLnk7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJMZXZlbDxCYXR0bGVQYXNzTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dElkPUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJZChzZXJpZXMsKGxvYWRMZXZlbCsxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnRuVXAueD1pY29uLng7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnRuVXAueT1pdGVtLnktKGl0ZW0uaGVpZ2h0LzIrdGhpcy5zcGFjaW5nWS8yKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBidG5VcC5nZXRDaGlsZEJ5TmFtZSgnZ2VtTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nJytCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGltb25kKG5leHRJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY3VyTGV2ZWw8bG9hZExldmVsKXtcclxuICAgICAgICAgICAgICAgIGxldCBtYXNrID0gY2MuaW5zdGFudGlhdGUodGhpcy5tYXNrKTtcclxuICAgICAgICAgICAgICAgIGxldmVsTGFiZWwuYWRkQ2hpbGQobWFzayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYobG9hZEluZGV4Pj0odGhpcy5tYXhfbG9hZF9udW0tMSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlzQ2FuY2VsPXRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0NhbmNlbCl7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmxvYWRJdGVtKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGhlaWdodD0odGhpcy5zcGFjaW5nWSt0aGlzLml0ZW1IZWlnaHQpKnRoaXMubWF4X2xvYWRfbnVtLXRoaXMuc3BhY2luZ1k7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxIZWlnaHQ9dGhpcy50b3BZK3RoaXMuYm90dG9tWStoZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuaGVpZ2h0PXRoaXMudG90YWxIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRTY3JvbGwoKTtcclxuICAgICAgICAgICAgLy/mt7vliqDlhbPljaHov5vluqZcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoTGV2ZWxQcm9ncmVzcyhoZWlnaHQtKHRoaXMuaXRlbUhlaWdodCkpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYWltQWZ0ZXJSZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyX2xvYWRfaW5kZXgrKztcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFNjcm9sbChkdDpudW1iZXI9MC41KXtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGxldCBzY3JvbGxIZWlodD0tdGhpcy5jdXJfbGV2ZWxfeXk7XHJcbiAgICAgICAgaWYoc2Nyb2xsSGVpaHQ8Y29udGVudC5wYXJlbnQuaGVpZ2h0LzIpe1xyXG4gICAgICAgICAgICBzY3JvbGxIZWlodD1jb250ZW50LnBhcmVudC5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc2Nyb2xsSGVpaHQ+KHRoaXMudG90YWxIZWlnaHQtY29udGVudC5wYXJlbnQuaGVpZ2h0LzIpKXtcclxuICAgICAgICAgICAgc2Nyb2xsSGVpaHQ9KHRoaXMudG90YWxIZWlnaHQtY29udGVudC5wYXJlbnQuaGVpZ2h0LzIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbihjb250ZW50KS50byhkdCx7eTpzY3JvbGxIZWlodH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZExldmVsRGF0YSgpe1xyXG4gICAgICAgIGxldCBoZWlnaHQ9KDEwKzEzOCkqdGhpcy5tYXhfbG9hZF9udW0tMTA7XHJcbiAgICAgICAgbGV0IHRvdGFsSGVpZ2h0PTEwKzEwK2hlaWdodC0xMzg7XHJcbiAgICAgICAgbGV0IGN1ckxldmVsPUJhdHRsZVBhc3NNYW5hZ2VyLmdldEN1ckxldmVsKClcclxuICAgICAgICBsZXQgdG9wPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgndG9wJyk7XHJcbiAgICAgICAgLy/lhbPljaHnrYnnuqdcclxuICAgICAgICAvLyBsZXQgbGV2ZWxMYWJlbD10b3AuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIC8vIGxldmVsTGFiZWwuc3RyaW5nPVwiXCIrY3VyTGV2ZWw7XHJcbiAgICAgICAgLy/nu4/pqozlgLxcclxuICAgICAgICAvLyBsZXQgZXhwTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCdleHBMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgLy8gbGV0IGV4cD1CYXR0bGVQYXNzTWFuYWdlci5nZXRDdXJFeHAoKSUxMDtcclxuICAgICAgICAvLyBleHBMYWJlbC5zdHJpbmc9ZXhwK1wiL1wiKzEwO1xyXG4gICAgICAgIC8vIHRvcC5nZXRDaGlsZEJ5TmFtZSgnZXhwUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzPWV4cC8xMDtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGxldCBsZXZlbFByb2dyZXNzPWNjLmluc3RhbnRpYXRlKHRoaXMucHJlZmFiX2xldmVsX3Byb2dyZXNzKTtcclxuICAgICAgICBsZXZlbFByb2dyZXNzLmhlaWdodD10b3RhbEhlaWdodDtcclxuICAgICAgICBsZXZlbFByb2dyZXNzLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikudG90YWxMZW5ndGg9dG90YWxIZWlnaHQ7XHJcbiAgICAgICAgbGV2ZWxQcm9ncmVzcy5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzPShjdXJMZXZlbCkvKEJhdHRsZVBhc3NNYW5hZ2VyLmdldE1heExldmVsKCkpO1xyXG4gICAgICAgIGxldmVsUHJvZ3Jlc3MuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcys9IGN1ckxldmVsID09IDAgPyAwIDogMS9CYXR0bGVQYXNzTWFuYWdlci5nZXRNYXhMZXZlbCgpKihCYXR0bGVQYXNzTWFuYWdlci5nZXRDdXJFeHAoKS9CYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uRGF0YUJ5TGV2ZWwoY3VyTGV2ZWwpLlJlcXVpcmVkRXhwKTtcclxuICAgICAgICBsZXZlbFByb2dyZXNzLnk9dGhpcy5pdGVtX3l5WzBdO1xyXG4gICAgICAgIGxldmVsUHJvZ3Jlc3MuekluZGV4PVNob3dJbmRleC5sZXZlbFByb2dyZXNzO1xyXG4gICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQobGV2ZWxQcm9ncmVzcyk7XHJcbiAgICAgICAgdG9wLmdldENoaWxkQnlOYW1lKFwicmVtYWluVGltZUxhYmVsXCIpLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwNDcpO1xyXG4gICAgICAgIHRvcC5nZXRDaGlsZEJ5TmFtZShcInJlbWFpblRpbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRSZXBsYWNlVmFsdWUoJ34nLFN0cmluZyhCYXR0bGVQYXNzTWFuYWdlci5nZXRNYXhMZXZlbCgpIC0gbmV3IERhdGUoKS5nZXREYXRlKCkpKTtcclxuICAgICAgICBsZXQgaXNCdXk9QmF0dGxlUGFzc01hbmFnZXIuaXNfYnV5O1xyXG4gICAgICAgIC8vIGxldCBidG5CdXk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdib3R0b20nKS5nZXRDaGlsZEJ5TmFtZSgnYnRuQnV5Jyk7XHJcbiAgICAgICAgLy8gYnRuQnV5LmFjdGl2ZT0haXNCdXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrliLfmlrDlhbPljaHov5vluqZcclxuICAgIHJlZnJlc2hMZXZlbFByb2dyZXNzKGhlaWdodD86bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGN1ckxldmVsPUJhdHRsZVBhc3NNYW5hZ2VyLmdldEN1ckxldmVsKCk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGwnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDsgICAgICAgIFxyXG4gICAgICAgIGxldCBsZXZlbFByb2dyZXNzPWNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsUHJvZ3Jlc3NCYXInKTtcclxuICAgICAgICBpZihoZWlnaHQpe1xyXG4gICAgICAgICAgICBsZXZlbFByb2dyZXNzLmhlaWdodD1oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxldmVsUHJvZ3Jlc3MuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS50b3RhbExlbmd0aD1oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxldmVsUHJvZ3Jlc3MueT10aGlzLml0ZW1feXlbMF07XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgbGV2ZWxQcm9ncmVzcy5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzPShjdXJMZXZlbC0xKS8oQmF0dGxlUGFzc01hbmFnZXIuZ2V0TWF4TGV2ZWwoKS0xKTsgICAgICAgIFxyXG4gICAgICAgIGxldmVsUHJvZ3Jlc3MuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyArPSBjdXJMZXZlbCA9PSAwID8gMCA6IDEvQmF0dGxlUGFzc01hbmFnZXIuZ2V0TWF4TGV2ZWwoKSooQmF0dGxlUGFzc01hbmFnZXIuZ2V0Q3VyRXhwKCkvQmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SnNvbkRhdGFCeUxldmVsKGN1ckxldmVsKS5SZXF1aXJlZEV4cCk7XHJcbiAgICAgICAgbGV0IHRvcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpO1xyXG4gICAgICAgIC8v5YWz5Y2h562J57qnXHJcbiAgICAgICAgLy8gbGV0IGxldmVsTGFiZWw9dG9wLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvLyBsZXZlbExhYmVsLnN0cmluZz1cIlwiK2N1ckxldmVsO1xyXG4gICAgICAgIC8v57uP6aqM5YC8XHJcbiAgICAgICAgLy8gbGV0IGV4cExhYmVsPXRvcC5nZXRDaGlsZEJ5TmFtZSgnZXhwTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIC8vIGxldCBleHA9QmF0dGxlUGFzc01hbmFnZXIuZ2V0Q3VyRXhwKCklMTA7XHJcbiAgICAgICAgLy8gZXhwTGFiZWwuc3RyaW5nPWV4cCtcIi9cIisxMDtcclxuICAgICAgICAvLyB0b3AuZ2V0Q2hpbGRCeU5hbWUoJ2V4cFByb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcz1leHAvMTA7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzaG93UmVtYWluVGltZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgZGF0ZT1uZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCB0b3RhbERheT1NeVRvb2wuZ2V0TW9udGhEYXlzKGRhdGUuZ2V0RnVsbFllYXIoKSxkYXRlLmdldE1vbnRoKCkrMSk7XHJcbiAgICAgICAgbGV0IHJlbWFpbkRheT10b3RhbERheS1kYXRlLmdldERhdGUoKTtcclxuICAgICAgICBpZihyZW1haW5EYXk+MCl7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucmVtYWluX2xhYmVsLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5SZXNldCkrXCI6IFwiK3JlbWFpbkRheStcIiBcIitMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5EYXkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY3VySG91cnM9ZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICBsZXQgY3VyTWluPWRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICBsZXQgY3VyU2VjPWRhdGUuZ2V0U2Vjb25kcygpO1xyXG4gICAgICAgICAgICBsZXQgcmVtYWluSG91cnM9MjQtY3VySG91cnMtMTtcclxuICAgICAgICAgICAgbGV0IHJlbWFpbk1pbj02MC1jdXJNaW47XHJcbiAgICAgICAgICAgIGxldCByZW1haW5TZWM9NjAtY3VyU2VjO1xyXG4gICAgICAgICAgICBsZXQgc2hpU3RyPScwJytyZW1haW5Ib3VycztcclxuICAgICAgICAgICAgaWYocmVtYWluSG91cnM+PTEwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaGlTdHI9JycrcmVtYWluSG91cnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZlblN0cj0nMCcrcmVtYWluTWluO1xyXG4gICAgICAgICAgICBpZihyZW1haW5NaW4+PTEwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmZW5TdHI9JycrcmVtYWluTWluO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtaWFvU3RyPScwJytyZW1haW5TZWM7XHJcbiAgICAgICAgICAgIGlmKHJlbWFpblNlYz49MTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1pYW9TdHI9JycrcmVtYWluU2VjO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMucmVtYWluX2xhYmVsLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJpbmcoTGFuZ3VhZ2VJbmRleC5SZWZyZXNoVGltZSkrc2hpU3RyKyc6JytmZW5TdHIrJzonK21pYW9TdHI7XHJcbiAgICAgICAgICAgIEdhbWVEYXRhLmdldEluc3RhbmNlKCkuY2hlY2tJc05ld0RheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGFpbUFmdGVyUmVmcmVzaCgpe1xyXG4gICAgICAgIC8v5qOA5p+l5piv5ZCm5Y+v5Lul6aKG5Y+W5omA5pyJ5oyJ6ZKuXHJcbiAgICAgICAgbGV0IHRvcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpO1xyXG4gICAgICAgIGxldCBpc0J1eT1CYXR0bGVQYXNzTWFuYWdlci5pc19idXk7XHJcbiAgICAgICAgbGV0IGN1ckxldmVsPUJhdHRsZVBhc3NNYW5hZ2VyLmdldEN1ckxldmVsKClcclxuICAgICAgICBsZXQgc2VyaWVzPUJhdHRsZVBhc3NNYW5hZ2VyLmdldFVzZUJhdHRsZVBhc3NTZXJpZXMoKTtcclxuICAgICAgICBsZXQgaXNDYW5DbGFpbT1mYWxzZTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTw9QmF0dGxlUGFzc01hbmFnZXIuZ2V0TWF4TGV2ZWwoKTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGlzVW5Mb2NrPWN1ckxldmVsPj1pO1xyXG4gICAgICAgICAgICBpZihpc1VuTG9jayl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQ9QmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldElkKHNlcmllcyxpKTtcclxuICAgICAgICAgICAgICAgIGxldCBjbGFpbVN0YXRlMD1CYXR0bGVQYXNzTWFuYWdlci5nZXRDbGFpbVN0YXRlKEJhdHRsZVBhc3NDbGFpbVR5cGUuRnJlZSxpZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xhaW1TdGF0ZTE9QmF0dGxlUGFzc01hbmFnZXIuZ2V0Q2xhaW1TdGF0ZShCYXR0bGVQYXNzQ2xhaW1UeXBlLkJ1eSxpZCk7XHJcbiAgICAgICAgICAgICAgICBpZihjbGFpbVN0YXRlMDw9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNDYW5DbGFpbT10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXNCdXkmJmNsYWltU3RhdGUxPD0wKXtcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbkNsYWltPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoQmF0dGxlUGFzc01hbmFnZXIuaXNfYnV5KXtcclxuICAgICAgICAgICAgbGV0IHJld2FyZEJ0bj10b3AuZ2V0Q2hpbGRCeU5hbWUoJ1dhck9yZGVyX0J0bl8wJyk7XHJcbiAgICAgICAgICAgIHJld2FyZEJ0bi5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9aXNDYW5DbGFpbTtcclxuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gaXNDYW5DbGFpbSA/IGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSA6IGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpO1xyXG4gICAgICAgICAgICByZXdhcmRCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCxtYXRlcmlhbCk7XHJcbiAgICAgICAgICAgIHJld2FyZEJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAxMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1eUFmdGVyUmVmcmVzaCgpe1xyXG4gICAgICAgIGxldCBjb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8PUJhdHRsZVBhc3NNYW5hZ2VyLmdldE1heExldmVsKCk7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtPWNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJycraSk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoQmF0dGxlUGFzc0l0ZW0pLnJlZnJlc2hEYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzQnV5PUJhdHRsZVBhc3NNYW5hZ2VyLmlzX2J1eTtcclxuICAgICAgICAvLyBsZXQgYnRuQnV5PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bkJ1eScpO1xyXG4gICAgICAgIC8vIGJ0bkJ1eS5hY3RpdmU9IWlzQnV5O1xyXG4gICAgICAgIGlmKGlzQnV5KXtcclxuICAgICAgICAgICAgbGV0IHRvcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RvcCcpO1xyXG4gICAgICAgICAgICBsZXQgcmV3YXJkQnRuID0gdG9wLmdldENoaWxkQnlOYW1lKFwiV2FyT3JkZXJfQnRuXzBcIik7XHJcbiAgICAgICAgICAgIGlmKEJhdHRsZVBhc3NNYW5hZ2VyLmlzX2J1eSl7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCxjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgICAgICAgICByZXdhcmRCdG4uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCgxMDAwMTIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFpbUFmdGVyUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHJld2FyZEJ0bi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDEwMDAxMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hCdG5VcCgpe1xyXG4gICAgICAgIGxldCBjb250ZW50PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsJykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGN1ckxldmVsPUJhdHRsZVBhc3NNYW5hZ2VyLmdldEN1ckxldmVsKClcclxuICAgICAgICBsZXQgYnRuVXA9Y29udGVudC5nZXRDaGlsZEJ5TmFtZSgnYnRuVXAnKTtcclxuICAgICAgICBsZXQgaXRlbT1jb250ZW50LmdldENoaWxkQnlOYW1lKFwiXCIrY3VyTGV2ZWwpO1xyXG4gICAgICAgIHRoaXMuY3VyX2xldmVsX3l5PWl0ZW0ueTtcclxuICAgICAgICBpZihjdXJMZXZlbDxCYXR0bGVQYXNzTWFuYWdlci5nZXRNYXhMZXZlbCgpKXtcclxuICAgICAgICAgICAgbGV0IG5leHRJZD1CYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SWQoQmF0dGxlUGFzc01hbmFnZXIuZ2V0VXNlQmF0dGxlUGFzc1NlcmllcygpLChjdXJMZXZlbCsxKSk7XHJcbiAgICAgICAgICAgIGJ0blVwLnk9aXRlbS55LShpdGVtLmhlaWdodC8yKzEwLzIpO1xyXG4gICAgICAgICAgICBidG5VcC5nZXRDaGlsZEJ5TmFtZSgnZ2VtTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz0nJytCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0RGltb25kKG5leHRJZCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJ0blVwLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVGlwKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgaGVscD1jYy5pbnN0YW50aWF0ZSh0aGlzLmhlbHApO1xyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChoZWxwKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk5Lu75Yqh5o+Q56S6KTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0bkNsYWltQWxsKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk54K55Ye75YWo6YOo6aKG5Y+W55qE5qyh5pWwKTtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbCcpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgICAgIGxldCBub2RlQXJyPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPD1CYXR0bGVQYXNzTWFuYWdlci5nZXRNYXhMZXZlbCgpOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbT1jb250ZW50LmdldENoaWxkQnlOYW1lKCcnK2kpO1xyXG4gICAgICAgICAgICBpZihpdGVtKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2Rlcz1pdGVtLmdldENvbXBvbmVudChCYXR0bGVQYXNzSXRlbSkudG9DbGFpbUFsbChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IG49MDsgbjxub2Rlcy5sZW5ndGg7IG4rKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZUFyci5wdXNoKG5vZGVzW25dKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNdWx0aXBsZUdldFRpcChub2RlQXJyKTtcclxuICAgICAgICB0aGlzLmNsYWltQWZ0ZXJSZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5CdXkoKXtcclxuICAgICAgICAvLyBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6TotK3kubDngrnlh7vmlbApO1xyXG4gICAgICAgIC8vIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtyZXN1bHQ6KGlzUGF5OmJvb2xlYW4pPT57XHJcbiAgICAgICAgLy8gICAgIGlmKGlzUGF5KXtcclxuICAgICAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7miJjku6Top6PplIHnlKjmiLfmlbApO1xyXG4gICAgICAgIC8vICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFBheU51bShnb29nbGVfaWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgQmF0dGxlUGFzc01hbmFnZXIucmVmcmVzaEJ1eVN0YXRlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmJ1eUFmdGVyUmVmcmVzaCgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfX0sZ29vZ2xlX2lkKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dCdXlEaWFsb2coTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoOTEwMDAyKSwoKT0+e1xyXG4gICAgICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd1BheSh7cmVzdWx0Oihpc1BheTpib29sZWFuKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoaXNQYXkpe1xyXG4gICAgICAgICAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQYXlOdW0oZ29vZ2xlX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICBCYXR0bGVQYXNzTWFuYWdlci5yZWZyZXNoQnV5U3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5oiY5Luk6Kej6ZSB55So5oi35pWwKTtcclxuICAgICAgICAgICAgICAgICAgICBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkUGF5TnVtKGdvb2dsZV9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQmF0dGxlUGFzc01hbmFnZXIucmVmcmVzaEJ1eVN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlBZnRlclJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX0sZ29vZ2xlX2lkKVxyXG4gICAgICAgIH0sbnVsbCwyLFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlJbmZvKGdvb2dsZV9pZCkucHJpY2UsUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheUluZm8oZ29vZ2xlX2lkKS5jdXJyZW5jeSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tSZXdhcmRBbGxCdG4oKXtcclxuICAgICAgICBpZihCYXR0bGVQYXNzTWFuYWdlci5pc19idXkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tCdG5DbGFpbUFsbCgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQnRuQnV5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuVXAoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIGxldCBjdXJMZXZlbD1CYXR0bGVQYXNzTWFuYWdlci5nZXRDdXJMZXZlbCgpXHJcbiAgICAgICAgbGV0IG5leHRJZD1CYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0SWQoQmF0dGxlUGFzc01hbmFnZXIuZ2V0VXNlQmF0dGxlUGFzc1NlcmllcygpLChjdXJMZXZlbCsxKSk7XHJcbiAgICAgICAgbGV0IGNvc3RHZW09QmF0dGxlUGFzc0RhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdERpbW9uZChuZXh0SWQpO1xyXG4gICAgICAgIGlmKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuR2VtLC1jb3N0R2VtKSl7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIEJhdHRsZVBhc3NNYW5hZ2VyLmFkZEN1ckV4cCgxMCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEJ0blVwKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5QWZ0ZXJSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhaW1BZnRlclJlZnJlc2goKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoTGV2ZWxQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2Nyb2xsKDAuMik7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguSW5zdWZmaWNpZW50X2dlbXMpKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIG9uQ2xpY2tHb0J0bigpe1xyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dVaURpYWxvZyhVSVBhdGguVGFzayxVSUxheWVyTGV2ZWwuT25lLHtvbkNvbXBsZXRlZDoodWlOb2RlKT0+IHtcclxuICAgICAgICAgICAgdWlOb2RlLmdldENvbXBvbmVudChUYXNrVWkpLmluaXQobnVsbCk7IFxyXG4gICAgICAgIH0sfSk7XHJcbiAgICB9XHJcbn1cclxuIl19