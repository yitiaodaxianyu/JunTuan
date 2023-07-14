"use strict";
cc._RF.push(module, '299a75/TOFASZCk/cnXK6SG', 'RabateUi');
// Scripts/Payment/RabateUi.ts

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
var CustomsClearanceRebate_1 = require("../JsonData/CustomsClearanceRebate");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var EventManager_1 = require("../Tools/EventManager");
var UIComponent_1 = require("../UI/UIComponent");
var PayManager_1 = require("./PayManager");
var RabateManager_1 = require("./RabateManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RabateUi = /** @class */ (function (_super) {
    __extends(RabateUi, _super);
    function RabateUi() {
        // @property(cc.Prefab)
        // help:cc.Prefab=null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_show_index = RabateManager_1.RabateType.Campaign;
        return _this;
        // clickBtnTip(){
        //     GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        //     let help=cc.instantiate(this.help);
        //     this.node.addChild(help);
        // }
    }
    RabateUi.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.loadLevelItem();
        // this.loadUserItem();
        this.node.getChildByName('item').removeFromParent();
        this.refreshUi();
    };
    RabateUi.prototype.start = function () {
        PayManager_1.PayManager.getInstance().addTodayShow(ThirdParty_1.PayUiIndex.FanLi);
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Shop_FanLi);
        this.adaptation();
    };
    RabateUi.prototype.adaptation = function () {
        var bottomNode = this.node.parent.getChildByName('bottom');
        var bottomHeight = bottomNode.height;
        var bottomY = bottomNode.y;
        var topNode = this.node.parent.getChildByName('top');
        var topHeight = topNode.height;
        var topY = topNode.y;
        var height = ((topY - topHeight) - (bottomY + bottomHeight));
        var centerY = (topY - topNode.height - this.node.getChildByName("icon").height);
        var scrollView = this.node.getChildByName('scrollView');
        scrollView.height = height - this.node.getChildByName("icon").height;
        scrollView.y = centerY;
        scrollView.getChildByName('view').height = height - this.node.getChildByName("icon").height;
        // scrollView.getChildByName('view').y = 0;
        this.node.getChildByName("icon").y = topNode.y - (topNode.height);
    };
    RabateUi.prototype.loadLevelItem = function () {
        var copyItem = this.node.getChildByName('item');
        var num = CustomsClearanceRebate_1.CustomsClearanceRebateManager.getMaxRewardID();
        // let level=this.node.getChildByName('level');        
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        this.node.getChildByName("icon").getChildByName("richLabel").getComponent(cc.RichText).string = LanguageManager_1.default.getInstance().getStrByTextId(920007);
        //文本
        // let contentStr=LanguageManager.getInstance().getStrByTextId(80001);        
        var ccrm = CustomsClearanceRebate_1.CustomsClearanceRebateManager.getInstance();
        //总奖励
        var total = 0;
        for (var i = 1; i <= num; i++) {
            var item = cc.instantiate(copyItem);
            item.x = 0;
            item.name = "item" + i;
            content.addChild(item);
            //获得数据
            var rd = RabateManager_1.RabateManager.getRabateData(RabateManager_1.RabateType.Campaign, i);
            //奖励数量
            var rewardNum = ccrm.getGetGem(i);
            // let numLabel=item.getChildByName('numLabel').getComponent(cc.Label);
            // numLabel.string=rewardNum+"";
            var t = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, rewardNum);
            t.setParent(item.getChildByName("kuang"));
            total += rewardNum;
            //内容信息+条件
            var contentLabel = item.getChildByName('contentLabel').getComponent(TextLanguage_1.default);
            contentLabel.setReplaceValue('~', rd.need_num + '');
            //进度情况
            var completeLabel = item.getChildByName('completeLabel').getComponent(cc.Label);
            completeLabel.string = rd.cur_num + "/" + rd.need_num;
            completeLabel.node.color = rd.is_complete ? cc.color(131, 110, 77) : cc.color(213, 53, 16);
            item.getChildByName('finish').active = rd.is_claimed;
            //按钮
            // let btnClam=item.getChildByName('btnClam');
            // btnClam.active=!rd.is_claimed;
            // if(btnClam.active){
            //     let btn=btnClam.getComponent(cc.Button);
            //     btn.interactable=rd.is_complete;
            // btn.clickEvents[0].customEventData=""+i;
            // btnClam.getChildByName('clamText').color=rd.is_complete?cc.color(124,82,13):cc.color(91,91,91);
            // }
            if (rd.is_complete) {
                if (rd.is_claimed) {
                    item.getChildByName("btnYes").active = true;
                }
                else {
                    item.getChildByName("btnClam").active = true;
                    var btn = item.getChildByName("btnClam").getComponent(cc.Button);
                    btn.clickEvents[0].customEventData = "" + i;
                }
            }
            else {
                item.getChildByName("btnNo").active = true;
            }
            if (rd.is_claimed) {
                item.zIndex = 1;
            }
        }
        // level.getChildByName('numLabel').getComponent(cc.Label).string=total.toString();
        // level.getChildByName('valueText').getComponent(cc.Label).string=total/10+"% "+LanguageManager.getInstance().getString(LanguageIndex.Value);
    };
    // loadUserItem(){
    //     let copyItem=this.node.getChildByName('item');
    //     let num=LevelUpRebateManager.getMaxRewardID();
    //     let user=this.node.getChildByName('user');
    //     let content=user.getChildByName('scrollView').getComponent(cc.ScrollView).content;
    //     //文本
    //     let contentStr=LanguageManager.getInstance().getStrByTextId(80002);
    //     //当前的等级
    //     let userLevel=UserData.getInstance().getUserLevel();        
    //     let lurm=LevelUpRebateManager.getInstance();
    //     //总奖励
    //     let total=0;
    //     for(let i=1; i<=num; i++){
    //         let item=cc.instantiate(copyItem);
    //         item.x=0;
    //         item.name="item"+i;
    //         content.addChild(item);
    //         //获得数据
    //         let rd=RabateManager.getRabateData(RabateType.Growth,i);
    //         //奖励数量
    //         let rewardNum=lurm.getGetGem(i);
    //         // let numLabel=item.getChildByName('numLabel').getComponent(cc.Label);
    //         // numLabel.string=rewardNum+"";
    //         let t = PropManager.getInstance().createPropItem(PropId.Gem,rewardNum);
    //         t.setParent(item.getChildByName("kuang"));
    //         total+=rewardNum;
    //         //内容信息+条件
    //         let contentLabel=item.getChildByName('contentLabel').getComponent(cc.Label);
    //         contentLabel.string=contentStr+" "+rd.need_num;
    //         //进度情况
    //         let completeLabel=item.getChildByName('completeLabel').getComponent(cc.Label);            
    //         completeLabel.string=rd.cur_num+"/"+rd.need_num;            
    //         completeLabel.node.color=rd.is_complete?cc.color(131,110,77):cc.color(213,53,16);
    //         item.getChildByName('finish').active=rd.is_claimed;
    //         //按钮
    //         let btnClam=item.getChildByName('btnClam');
    //         btnClam.active=!rd.is_claimed;
    //         if(btnClam.active){
    //             let btn=btnClam.getComponent(cc.Button);
    //             btn.interactable=rd.is_complete;
    //             btn.clickEvents[0].customEventData=""+i;
    //             btnClam.getChildByName('clamText').color=rd.is_complete?cc.color(124,82,13):cc.color(91,91,91);
    //         }    
    //         if(rd.is_claimed){
    //             item.zIndex=1;
    //         }        
    //     }
    //     //等级，总奖励，价值
    //     // user.getChildByName('numLabel').getComponent(cc.Label).string=total.toString();
    //     // user.getChildByName('levelLabel').getComponent(cc.Label).string=LanguageManager.getInstance().getString(LanguageIndex.PlayerLv)+userLevel;
    //     // user.getChildByName('valueText').getComponent(cc.Label).string=total/10+"% "+LanguageManager.getInstance().getString(LanguageIndex.Value);
    // }
    RabateUi.prototype.refreshUi = function () {
        switch (this.cur_show_index) {
            case RabateManager_1.RabateType.Campaign:
                {
                    this.showLevelUi();
                }
                break;
            // case RabateType.Growth:{
            //     this.showUserUi();
            // }
        }
    };
    RabateUi.prototype.showLevelUi = function () {
        this.cur_show_index = RabateManager_1.RabateType.Campaign;
        var bottom = this.node.getChildByName('bottom');
        bottom.y = -cc.winSize.height / 2;
        // let btnLevel=bottom.getChildByName('btnLevel');
        // btnLevel.getComponent(cc.Button).interactable=false;
        // btnLevel.height=71;
        // let btnUser=bottom.getChildByName('btnUser');
        // btnUser.getComponent(cc.Button).interactable=true;
        // btnLevel.height=85;
        // bottom.getChildByName('levelText').color=cc.color(240,230,166);//亮点
        // bottom.getChildByName('userText').color=cc.color(242,225,172);
        this.node.getChildByName('titleText').getComponent(TextLanguage_1.default).setTextId(900001);
        var level = this.node.getChildByName('level');
        level.active = true;
        var user = this.node.getChildByName('user');
        user.active = false;
        //刷新状态
        var num = CustomsClearanceRebate_1.CustomsClearanceRebateManager.getMaxRewardID();
        var content = this.node.getChildByName('scrollView').getComponent(cc.ScrollView).content;
        var isCan = false;
        for (var i = 1; i <= num; i++) {
            var item = content.getChildByName('item' + i);
            //获得数据
            var rd = RabateManager_1.RabateManager.getRabateData(RabateManager_1.RabateType.Campaign, i);
            //按钮
            var btnClam = item.getChildByName('btnClam');
            btnClam.active = !rd.is_claimed;
            item.getChildByName('finish').active = rd.is_claimed;
            //如果么有领取
            if (rd.is_complete) {
                if (rd.is_claimed) {
                    item.getChildByName("btnYes").active = true;
                }
                else {
                    item.getChildByName("btnClam").active = true;
                    var btn = item.getChildByName("btnClam").getComponent(cc.Button);
                    isCan = true;
                    btn.clickEvents[0].customEventData = "" + i;
                }
            }
            else {
                item.getChildByName("btnNo").active = true;
            }
            if (rd.is_claimed) {
                item.zIndex = 1;
            }
        }
        //获取购买状态
        var btnBuy = this.node.getChildByName("icon").getChildByName('btnBuy').getComponent(cc.Button);
        var priceText = this.node.getChildByName("icon").getChildByName('priceText').getComponent(cc.Label);
        //获得数据
        var payNum = PayManager_1.PayManager.getInstance().getPayNum('b401');
        if (payNum > 0) {
            priceText.string = LanguageManager_1.default.getInstance().getStrByTextId(100012);
            //根据领取状态判断能否点击
            btnBuy.interactable = isCan;
        }
        else {
            var payInfo = PayManager_1.PayManager.getInstance().getPayInfo('b401');
            // priceText.string= payInfo.price + payInfo.currency;
            priceText.string = payInfo.price;
            btnBuy.interactable = true;
        }
        // priceText.node.color=btnBuy.interactable?cc.color(124,82,13):cc.color(91,91,91);
        if (btnBuy.interactable) {
            priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
        }
        else {
            priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        }
    };
    // showUserUi(){
    //     this.cur_show_index=RabateType.Growth;
    //     let bottom=this.node.getChildByName('bottom');
    //     bottom.y=-cc.winSize.height/2;
    //     // let btnLevel=bottom.getChildByName('btnLevel');
    //     // btnLevel.getComponent(cc.Button).interactable=true;
    //     // btnLevel.height=85;
    //     // let btnUser=bottom.getChildByName('btnUser');
    //     // btnUser.getComponent(cc.Button).interactable=false;
    //     // btnLevel.height=71;
    //     // bottom.getChildByName('userText').color=cc.color(240,230,166);//亮点
    //     // bottom.getChildByName('levelText').color=cc.color(242,225,172);
    //     this.node.getChildByName('titleText').getComponent(LabelLanguage).setLanguageIndex(LanguageIndex.GrowthInvestment);
    //     let level=this.node.getChildByName('level');
    //     level.active=false;
    //     let user=this.node.getChildByName('user');
    //     user.active=true;
    //     //刷新状态
    //     let num=LevelUpRebateManager.getMaxRewardID();
    //     let content=user.getChildByName('scrollView').getComponent(cc.ScrollView).content;
    //     let isCan=false;
    //     for(let i=1; i<=num; i++){
    //         let item=content.getChildByName('item'+i);
    //         //获得数据
    //         let rd=RabateManager.getRabateData(RabateType.Growth,i);            
    //         //按钮
    //         let btnClam=item.getChildByName('btnClam');
    //         btnClam.active=!rd.is_claimed;
    //         item.getChildByName('finish').active=rd.is_claimed;
    //         //如果么有领取
    //         if(btnClam.active){
    //             btnClam.getComponent(cc.Button).interactable=rd.is_complete;
    //             btnClam.getChildByName('clamText').color=rd.is_complete?cc.color(124,82,13):cc.color(91,91,91);
    //             //如果么有领取并且完成了
    //             if(rd.is_complete){
    //                 isCan=true;
    //             }
    //         }
    //         if(rd.is_claimed){
    //             item.zIndex=1;
    //         }
    //     }
    //     //获取购买状态
    //     let btnBuy=this.node.getChildByName('btnBuy').getComponent(cc.Button);
    //     let priceText=this.node.getChildByName('icon').getChildByName('priceText').getComponent(cc.Label);
    //     //获得数据
    //     let payNum=PayManager.getInstance().getPayNum('PayId.Growth');
    //     if(payNum>0){
    //         priceText.string=LanguageManager.getInstance().getString(LanguageIndex.CLAIM_ALL);
    //         //根据领取状态判断能否点击
    //         btnBuy.interactable=isCan;
    //     }else{
    //         priceText.string=PaidItemManager.getInstance().getPrice('b'+PayId.Growth)+"$";
    //         btnBuy.interactable=true;
    //     }
    //     // priceText.node.color=btnBuy.interactable?cc.color(124,82,13):cc.color(91,91,91);
    //     if(btnBuy.interactable){
    //         priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
    //     }else{
    //         priceText.node.getComponent(cc.Label).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
    //     }
    // }
    RabateUi.prototype.clickBtnLevel = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.cur_show_index = RabateManager_1.RabateType.Campaign;
        this.refreshUi();
    };
    RabateUi.prototype.clickBtnUser = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.cur_show_index = RabateManager_1.RabateType.Growth;
        this.refreshUi();
    };
    RabateUi.prototype.clickBtnClaim = function (btn, idStr) {
        var _this = this;
        var id = parseInt(idStr);
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (this.cur_show_index) {
            case RabateManager_1.RabateType.Campaign:
                {
                    var payNum = PayManager_1.PayManager.getInstance().getPayNum('b401');
                    var payInfo = PayManager_1.PayManager.getInstance().getPayInfo('b401');
                    if (payNum > 0) {
                        //领取所有
                        var rewardData = RabateManager_1.RabateManager.claimOnce(RabateManager_1.RabateType.Campaign, id);
                        if (rewardData.reward_num > 0) {
                            // GameData.getInstance().changeGem(rewardData.reward_num);
                            // let gemItem=GameManager.getInstance().box_json_data.createBoxItem(rewardData.reward_id,rewardData.reward_num);
                            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, rewardData.reward_num);
                            var gemItem = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, rewardData.reward_num);
                            GameManager_1.default.getInstance().showGetTip(gemItem);
                            this.refreshUi();
                        }
                    }
                    else {
                        GameManager_1.default.getInstance().showBuyDialog(LanguageManager_1.default.getInstance().getStrByTextId(920004), function () {
                            ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                                    if (isPay) {
                                        PayManager_1.PayManager.getInstance().addPayNum('b401');
                                        _this.refreshUi();
                                    }
                                } }, 'b401');
                        }, null, 2, payInfo.price, payInfo.currency);
                    }
                }
                break;
            case RabateManager_1.RabateType.Growth:
                {
                }
                break;
        }
    };
    RabateUi.prototype.clickBtnBuy = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        switch (this.cur_show_index) {
            case RabateManager_1.RabateType.Campaign:
                {
                    //获得数据
                    var payNum = PayManager_1.PayManager.getInstance().getPayNum('b401');
                    if (payNum > 0) {
                        //领取所有
                        var rewardData = RabateManager_1.RabateManager.claimAll(RabateManager_1.RabateType.Campaign);
                        if (rewardData.reward_num > 0) {
                            // GameData.getInstance().changeGem(rewardData.reward_num);
                            // let gemItem=GameManager.getInstance().box_json_data.createBoxItem(rewardData.reward_id,rewardData.reward_num);
                            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, rewardData.reward_num);
                            var gemItem = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Gem, rewardData.reward_num);
                            GameManager_1.default.getInstance().showGetTip(gemItem);
                            this.refreshUi();
                        }
                    }
                    else {
                        ApkManager_1.default.getInstance().showPay({ result: function (isPay) {
                                if (isPay) {
                                    PayManager_1.PayManager.getInstance().addPayNum('b401');
                                    _this.refreshUi();
                                }
                            } }, 'b401');
                    }
                }
                break;
            case RabateManager_1.RabateType.Growth:
                {
                }
                break;
        }
    };
    RabateUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    RabateUi = __decorate([
        ccclass
    ], RabateUi);
    return RabateUi;
}(UIComponent_1.default));
exports.default = RabateUi;

cc._RF.pop();