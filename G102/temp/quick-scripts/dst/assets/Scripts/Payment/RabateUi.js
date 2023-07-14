
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/RabateUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUmFiYXRlVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDhDQUF5QztBQUN6Qyw2RUFBbUY7QUFJbkYsb0VBQStEO0FBQy9ELDhEQUF5RDtBQUN6RCxpREFBNEM7QUFDNUMsbURBQWtEO0FBQ2xELDBEQUFxRDtBQUNyRCx1REFBNkQ7QUFDN0Qsc0RBQW1GO0FBQ25GLGlEQUE0QztBQUc1QywyQ0FBMEM7QUFDMUMsaURBQTREO0FBSXRELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFXO0lBQWpEO1FBRUksdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUgzQixxRUE2WUM7UUF4WUcsb0JBQWMsR0FBWSwwQkFBVSxDQUFDLFFBQVEsQ0FBQzs7UUFpWTlDLGlCQUFpQjtRQUNqQiwyRUFBMkU7UUFDM0UsMENBQTBDO1FBQzFDLGdDQUFnQztRQUNoQyxJQUFJO0lBR1IsQ0FBQztJQXRZRyx5QkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFUyx3QkFBSyxHQUFmO1FBQ0ksdUJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCwyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLFNBQVMsRUFBQywyQkFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckYsSUFB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QyxDQTdZcUMscUJBQVcsR0E2WWhEO2tCQTdZb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEN1c3RvbXNDbGVhcmFuY2VSZWJhdGVNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0N1c3RvbXNDbGVhcmFuY2VSZWJhdGVcIjtcclxuaW1wb3J0IHsgTGV2ZWxVcFJlYmF0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvTGV2ZWxVcFJlYmF0ZVwiO1xyXG5pbXBvcnQgTGFiZWxMYW5ndWFnZSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYWJlbExhbmd1YWdlXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlSW5kZXggfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBQYXlVaUluZGV4LCBQYXlJZCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IHsgRXZlbnRNYW5hZ2VyLCBSZWRFdmVudFN0cmluZywgUmVkRXZlbnRUeXBlIH0gZnJvbSBcIi4uL1Rvb2xzL0V2ZW50TWFuYWdlclwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCBVc2VyRGF0YSBmcm9tIFwiLi4vVXNlckRhdGFcIjtcclxuaW1wb3J0IHsgUGFpZEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9QYWlkSXRlbVwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4vUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSYWJhdGVUeXBlLCBSYWJhdGVNYW5hZ2VyIH0gZnJvbSBcIi4vUmFiYXRlTWFuYWdlclwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhYmF0ZVVpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIC8vIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgICAvLyBoZWxwOmNjLlByZWZhYj1udWxsO1xyXG5cclxuICAgIGN1cl9zaG93X2luZGV4OlJhYmF0ZVR5cGU9UmFiYXRlVHlwZS5DYW1wYWlnbjtcclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkTGV2ZWxJdGVtKCk7XHJcbiAgICAgICAgLy8gdGhpcy5sb2FkVXNlckl0ZW0oKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW0nKS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFRvZGF5U2hvdyhQYXlVaUluZGV4LkZhbkxpKTtcclxuICAgICAgICBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2hvcF9GYW5MaSk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwcml2YXRlIGFkYXB0YXRpb24oKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgbGV0IGJvdHRvbU5vZGU9dGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJyk7XHJcbiAgICAgICAgbGV0IGJvdHRvbUhlaWdodD1ib3R0b21Ob2RlLmhlaWdodDtcclxuICAgICAgICBsZXQgYm90dG9tWT1ib3R0b21Ob2RlLnk7ICAgICAgICBcclxuICAgICAgICBsZXQgdG9wTm9kZT10aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKCd0b3AnKTtcclxuICAgICAgICBsZXQgdG9wSGVpZ2h0PXRvcE5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIGxldCB0b3BZPXRvcE5vZGUueTtcclxuICAgICAgICBsZXQgaGVpZ2h0PSgodG9wWS10b3BIZWlnaHQpLShib3R0b21ZK2JvdHRvbUhlaWdodCkpO1xyXG4gICAgICAgIGxldCBjZW50ZXJZPSh0b3BZLXRvcE5vZGUuaGVpZ2h0IC0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5oZWlnaHQpO1xyXG4gICAgICAgIGxldCBzY3JvbGxWaWV3PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsVmlldycpO1xyXG4gICAgICAgIHNjcm9sbFZpZXcuaGVpZ2h0PWhlaWdodCAtIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuaGVpZ2h0O1xyXG4gICAgICAgIHNjcm9sbFZpZXcueT1jZW50ZXJZXHJcbiAgICAgICAgc2Nyb2xsVmlldy5nZXRDaGlsZEJ5TmFtZSgndmlldycpLmhlaWdodD1oZWlnaHQgLSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmhlaWdodDtcclxuICAgICAgICAvLyBzY3JvbGxWaWV3LmdldENoaWxkQnlOYW1lKCd2aWV3JykueSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS55ID0gdG9wTm9kZS55IC0gKHRvcE5vZGUuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkTGV2ZWxJdGVtKCl7XHJcbiAgICAgICAgbGV0IGNvcHlJdGVtPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaXRlbScpO1xyXG4gICAgICAgIGxldCBudW09Q3VzdG9tc0NsZWFyYW5jZVJlYmF0ZU1hbmFnZXIuZ2V0TWF4UmV3YXJkSUQoKTtcclxuICAgICAgICAvLyBsZXQgbGV2ZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvbnRlbnQ9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDaGlsZEJ5TmFtZShcInJpY2hMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDkyMDAwNyk7XHJcbiAgICAgICAgLy/mlofmnKxcclxuICAgICAgICAvLyBsZXQgY29udGVudFN0cj1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MDAwMSk7ICAgICAgICBcclxuICAgICAgICBsZXQgY2NybT1DdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIC8v5oC75aWW5YqxXHJcbiAgICAgICAgbGV0IHRvdGFsPTA7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PW51bTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW09Y2MuaW5zdGFudGlhdGUoY29weUl0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLng9MDtcclxuICAgICAgICAgICAgaXRlbS5uYW1lPVwiaXRlbVwiK2k7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIC8v6I635b6X5pWw5o2uXHJcbiAgICAgICAgICAgIGxldCByZD1SYWJhdGVNYW5hZ2VyLmdldFJhYmF0ZURhdGEoUmFiYXRlVHlwZS5DYW1wYWlnbixpKTtcclxuICAgICAgICAgICAgLy/lpZblirHmlbDph49cclxuICAgICAgICAgICAgbGV0IHJld2FyZE51bT1jY3JtLmdldEdldEdlbShpKTtcclxuICAgICAgICAgICAgLy8gbGV0IG51bUxhYmVsPWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ251bUxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgLy8gbnVtTGFiZWwuc3RyaW5nPXJld2FyZE51bStcIlwiO1xyXG4gICAgICAgICAgICBsZXQgdCA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0oUHJvcElkLkdlbSxyZXdhcmROdW0pO1xyXG4gICAgICAgICAgICB0LnNldFBhcmVudChpdGVtLmdldENoaWxkQnlOYW1lKFwia3VhbmdcIikpO1xyXG4gICAgICAgICAgICB0b3RhbCs9cmV3YXJkTnVtO1xyXG4gICAgICAgICAgICAvL+WGheWuueS/oeaBryvmnaHku7ZcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRMYWJlbD1pdGVtLmdldENoaWxkQnlOYW1lKCdjb250ZW50TGFiZWwnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKTtcclxuICAgICAgICAgICAgY29udGVudExhYmVsLnNldFJlcGxhY2VWYWx1ZSgnficscmQubmVlZF9udW0gKyAnJyk7XHJcbiAgICAgICAgICAgIC8v6L+b5bqm5oOF5Ya1XHJcbiAgICAgICAgICAgIGxldCBjb21wbGV0ZUxhYmVsPWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2NvbXBsZXRlTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb21wbGV0ZUxhYmVsLnN0cmluZz1yZC5jdXJfbnVtK1wiL1wiK3JkLm5lZWRfbnVtO1xyXG4gICAgICAgICAgICBjb21wbGV0ZUxhYmVsLm5vZGUuY29sb3I9cmQuaXNfY29tcGxldGU/Y2MuY29sb3IoMTMxLDExMCw3Nyk6Y2MuY29sb3IoMjEzLDUzLDE2KTtcclxuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnZmluaXNoJykuYWN0aXZlPXJkLmlzX2NsYWltZWQ7XHJcbiAgICAgICAgICAgIC8v5oyJ6ZKuXHJcbiAgICAgICAgICAgIC8vIGxldCBidG5DbGFtPWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2J0bkNsYW0nKTtcclxuICAgICAgICAgICAgLy8gYnRuQ2xhbS5hY3RpdmU9IXJkLmlzX2NsYWltZWQ7XHJcbiAgICAgICAgICAgIC8vIGlmKGJ0bkNsYW0uYWN0aXZlKXtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBidG49YnRuQ2xhbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgLy8gICAgIGJ0bi5pbnRlcmFjdGFibGU9cmQuaXNfY29tcGxldGU7XHJcbiAgICAgICAgICAgICAgICAvLyBidG4uY2xpY2tFdmVudHNbMF0uY3VzdG9tRXZlbnREYXRhPVwiXCIraTtcclxuICAgICAgICAgICAgICAgIC8vIGJ0bkNsYW0uZ2V0Q2hpbGRCeU5hbWUoJ2NsYW1UZXh0JykuY29sb3I9cmQuaXNfY29tcGxldGU/Y2MuY29sb3IoMTI0LDgyLDEzKTpjYy5jb2xvcig5MSw5MSw5MSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYocmQuaXNfY29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgaWYocmQuaXNfY2xhaW1lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0blllc1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bkNsYW1cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnRuPWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5DbGFtXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGE9XCJcIitpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5Ob1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJkLmlzX2NsYWltZWQpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS56SW5kZXg9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsZXZlbC5nZXRDaGlsZEJ5TmFtZSgnbnVtTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10b3RhbC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIGxldmVsLmdldENoaWxkQnlOYW1lKCd2YWx1ZVRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz10b3RhbC8xMCtcIiUgXCIrTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguVmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxvYWRVc2VySXRlbSgpe1xyXG4gICAgLy8gICAgIGxldCBjb3B5SXRlbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW0nKTtcclxuICAgIC8vICAgICBsZXQgbnVtPUxldmVsVXBSZWJhdGVNYW5hZ2VyLmdldE1heFJld2FyZElEKCk7XHJcbiAgICAvLyAgICAgbGV0IHVzZXI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd1c2VyJyk7XHJcbiAgICAvLyAgICAgbGV0IGNvbnRlbnQ9dXNlci5nZXRDaGlsZEJ5TmFtZSgnc2Nyb2xsVmlldycpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG4gICAgLy8gICAgIC8v5paH5pysXHJcbiAgICAvLyAgICAgbGV0IGNvbnRlbnRTdHI9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODAwMDIpO1xyXG4gICAgLy8gICAgIC8v5b2T5YmN55qE562J57qnXHJcbiAgICAvLyAgICAgbGV0IHVzZXJMZXZlbD1Vc2VyRGF0YS5nZXRJbnN0YW5jZSgpLmdldFVzZXJMZXZlbCgpOyAgICAgICAgXHJcbiAgICAvLyAgICAgbGV0IGx1cm09TGV2ZWxVcFJlYmF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBcclxuICAgIC8vICAgICAvL+aAu+WlluWKsVxyXG4gICAgLy8gICAgIGxldCB0b3RhbD0wO1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT0xOyBpPD1udW07IGkrKyl7XHJcbiAgICAvLyAgICAgICAgIGxldCBpdGVtPWNjLmluc3RhbnRpYXRlKGNvcHlJdGVtKTtcclxuICAgIC8vICAgICAgICAgaXRlbS54PTA7XHJcbiAgICAvLyAgICAgICAgIGl0ZW0ubmFtZT1cIml0ZW1cIitpO1xyXG4gICAgLy8gICAgICAgICBjb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgLy8gICAgICAgICAvL+iOt+W+l+aVsOaNrlxyXG4gICAgLy8gICAgICAgICBsZXQgcmQ9UmFiYXRlTWFuYWdlci5nZXRSYWJhdGVEYXRhKFJhYmF0ZVR5cGUuR3Jvd3RoLGkpO1xyXG4gICAgLy8gICAgICAgICAvL+WlluWKseaVsOmHj1xyXG4gICAgLy8gICAgICAgICBsZXQgcmV3YXJkTnVtPWx1cm0uZ2V0R2V0R2VtKGkpO1xyXG4gICAgLy8gICAgICAgICAvLyBsZXQgbnVtTGFiZWw9aXRlbS5nZXRDaGlsZEJ5TmFtZSgnbnVtTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgLy8gICAgICAgICAvLyBudW1MYWJlbC5zdHJpbmc9cmV3YXJkTnVtK1wiXCI7XHJcbiAgICAvLyAgICAgICAgIGxldCB0ID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShQcm9wSWQuR2VtLHJld2FyZE51bSk7XHJcbiAgICAvLyAgICAgICAgIHQuc2V0UGFyZW50KGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJrdWFuZ1wiKSk7XHJcbiAgICAvLyAgICAgICAgIHRvdGFsKz1yZXdhcmROdW07XHJcbiAgICAvLyAgICAgICAgIC8v5YaF5a655L+h5oGvK+adoeS7tlxyXG4gICAgLy8gICAgICAgICBsZXQgY29udGVudExhYmVsPWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAvLyAgICAgICAgIGNvbnRlbnRMYWJlbC5zdHJpbmc9Y29udGVudFN0citcIiBcIityZC5uZWVkX251bTtcclxuICAgIC8vICAgICAgICAgLy/ov5vluqbmg4XlhrVcclxuICAgIC8vICAgICAgICAgbGV0IGNvbXBsZXRlTGFiZWw9aXRlbS5nZXRDaGlsZEJ5TmFtZSgnY29tcGxldGVMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7ICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIGNvbXBsZXRlTGFiZWwuc3RyaW5nPXJkLmN1cl9udW0rXCIvXCIrcmQubmVlZF9udW07ICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIGNvbXBsZXRlTGFiZWwubm9kZS5jb2xvcj1yZC5pc19jb21wbGV0ZT9jYy5jb2xvcigxMzEsMTEwLDc3KTpjYy5jb2xvcigyMTMsNTMsMTYpO1xyXG4gICAgLy8gICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdmaW5pc2gnKS5hY3RpdmU9cmQuaXNfY2xhaW1lZDtcclxuICAgIC8vICAgICAgICAgLy/mjInpkq5cclxuICAgIC8vICAgICAgICAgbGV0IGJ0bkNsYW09aXRlbS5nZXRDaGlsZEJ5TmFtZSgnYnRuQ2xhbScpO1xyXG4gICAgLy8gICAgICAgICBidG5DbGFtLmFjdGl2ZT0hcmQuaXNfY2xhaW1lZDtcclxuICAgIC8vICAgICAgICAgaWYoYnRuQ2xhbS5hY3RpdmUpe1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGJ0bj1idG5DbGFtLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgLy8gICAgICAgICAgICAgYnRuLmludGVyYWN0YWJsZT1yZC5pc19jb21wbGV0ZTtcclxuICAgIC8vICAgICAgICAgICAgIGJ0bi5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGE9XCJcIitpO1xyXG4gICAgLy8gICAgICAgICAgICAgYnRuQ2xhbS5nZXRDaGlsZEJ5TmFtZSgnY2xhbVRleHQnKS5jb2xvcj1yZC5pc19jb21wbGV0ZT9jYy5jb2xvcigxMjQsODIsMTMpOmNjLmNvbG9yKDkxLDkxLDkxKTtcclxuICAgIC8vICAgICAgICAgfSAgICBcclxuICAgIC8vICAgICAgICAgaWYocmQuaXNfY2xhaW1lZCl7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLnpJbmRleD0xO1xyXG4gICAgLy8gICAgICAgICB9ICAgICAgICBcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgLy/nrYnnuqfvvIzmgLvlpZblirHvvIzku7flgLxcclxuICAgIC8vICAgICAvLyB1c2VyLmdldENoaWxkQnlOYW1lKCdudW1MYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPXRvdGFsLnRvU3RyaW5nKCk7XHJcbiAgICAvLyAgICAgLy8gdXNlci5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWxMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlBsYXllckx2KSt1c2VyTGV2ZWw7XHJcbiAgICAvLyAgICAgLy8gdXNlci5nZXRDaGlsZEJ5TmFtZSgndmFsdWVUZXh0JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dG90YWwvMTArXCIlIFwiK0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyhMYW5ndWFnZUluZGV4LlZhbHVlKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfc2hvd19pbmRleCl7XHJcbiAgICAgICAgICAgIGNhc2UgUmFiYXRlVHlwZS5DYW1wYWlnbjp7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMZXZlbFVpKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgLy8gY2FzZSBSYWJhdGVUeXBlLkdyb3d0aDp7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dVc2VyVWkoKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvd0xldmVsVWkoKXtcclxuICAgICAgICB0aGlzLmN1cl9zaG93X2luZGV4PVJhYmF0ZVR5cGUuQ2FtcGFpZ247XHJcbiAgICAgICAgbGV0IGJvdHRvbT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2JvdHRvbScpO1xyXG4gICAgICAgIGJvdHRvbS55PS1jYy53aW5TaXplLmhlaWdodC8yO1xyXG4gICAgICAgIC8vIGxldCBidG5MZXZlbD1ib3R0b20uZ2V0Q2hpbGRCeU5hbWUoJ2J0bkxldmVsJyk7XHJcbiAgICAgICAgLy8gYnRuTGV2ZWwuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlPWZhbHNlO1xyXG4gICAgICAgIC8vIGJ0bkxldmVsLmhlaWdodD03MTtcclxuICAgICAgICAvLyBsZXQgYnRuVXNlcj1ib3R0b20uZ2V0Q2hpbGRCeU5hbWUoJ2J0blVzZXInKTtcclxuICAgICAgICAvLyBidG5Vc2VyLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIC8vIGJ0bkxldmVsLmhlaWdodD04NTtcclxuICAgICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoJ2xldmVsVGV4dCcpLmNvbG9yPWNjLmNvbG9yKDI0MCwyMzAsMTY2KTsvL+S6rueCuVxyXG4gICAgICAgIC8vIGJvdHRvbS5nZXRDaGlsZEJ5TmFtZSgndXNlclRleHQnKS5jb2xvcj1jYy5jb2xvcigyNDIsMjI1LDE3Mik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZVRleHQnKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoOTAwMDAxKTtcclxuXHJcbiAgICAgICAgbGV0IGxldmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbGV2ZWwnKTtcclxuICAgICAgICBsZXZlbC5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBsZXQgdXNlcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VzZXInKTtcclxuICAgICAgICB1c2VyLmFjdGl2ZT1mYWxzZTtcclxuICAgICAgICAvL+WIt+aWsOeKtuaAgVxyXG4gICAgICAgIGxldCBudW09Q3VzdG9tc0NsZWFyYW5jZVJlYmF0ZU1hbmFnZXIuZ2V0TWF4UmV3YXJkSUQoKTtcclxuICAgICAgICBsZXQgY29udGVudD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njcm9sbFZpZXcnKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBsZXQgaXNDYW49ZmFsc2U7XHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PW51bTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW09Y29udGVudC5nZXRDaGlsZEJ5TmFtZSgnaXRlbScraSk7XHJcbiAgICAgICAgICAgIC8v6I635b6X5pWw5o2uXHJcbiAgICAgICAgICAgIGxldCByZD1SYWJhdGVNYW5hZ2VyLmdldFJhYmF0ZURhdGEoUmFiYXRlVHlwZS5DYW1wYWlnbixpKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/mjInpkq5cclxuICAgICAgICAgICAgbGV0IGJ0bkNsYW09aXRlbS5nZXRDaGlsZEJ5TmFtZSgnYnRuQ2xhbScpO1xyXG4gICAgICAgICAgICBidG5DbGFtLmFjdGl2ZT0hcmQuaXNfY2xhaW1lZDtcclxuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZSgnZmluaXNoJykuYWN0aXZlPXJkLmlzX2NsYWltZWQ7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5LmI5pyJ6aKG5Y+WXHJcbiAgICAgICAgICAgIGlmKHJkLmlzX2NvbXBsZXRlKXtcclxuICAgICAgICAgICAgICAgIGlmKHJkLmlzX2NsYWltZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5ZZXNcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJidG5DbGFtXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0bj1pdGVtLmdldENoaWxkQnlOYW1lKFwiYnRuQ2xhbVwiKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmNsaWNrRXZlbnRzWzBdLmN1c3RvbUV2ZW50RGF0YT1cIlwiK2k7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcImJ0bk5vXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmQuaXNfY2xhaW1lZCl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnpJbmRleD0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W6LSt5Lmw54q25oCBXHJcbiAgICAgICAgbGV0IGJ0bkJ1eT10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpY29uXCIpLmdldENoaWxkQnlOYW1lKCdidG5CdXknKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICBsZXQgcHJpY2VUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q2hpbGRCeU5hbWUoJ3ByaWNlVGV4dCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgLy/ojrflvpfmlbDmja5cclxuICAgICAgICBsZXQgcGF5TnVtPVBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlOdW0oJ2I0MDEnKTtcclxuICAgICAgICBpZihwYXlOdW0+MCl7XHJcbiAgICAgICAgICAgIHByaWNlVGV4dC5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDEyKTtcclxuICAgICAgICAgICAgLy/moLnmja7pooblj5bnirbmgIHliKTmlq3og73lkKbngrnlh7tcclxuICAgICAgICAgICAgYnRuQnV5LmludGVyYWN0YWJsZT1pc0NhbjsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IHBheUluZm8gPSBQYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5SW5mbygnYjQwMScpO1xyXG4gICAgICAgICAgICAvLyBwcmljZVRleHQuc3RyaW5nPSBwYXlJbmZvLnByaWNlICsgcGF5SW5mby5jdXJyZW5jeTtcclxuICAgICAgICAgICAgcHJpY2VUZXh0LnN0cmluZz0gcGF5SW5mby5wcmljZTtcclxuICAgICAgICAgICAgYnRuQnV5LmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwcmljZVRleHQubm9kZS5jb2xvcj1idG5CdXkuaW50ZXJhY3RhYmxlP2NjLmNvbG9yKDEyNCw4MiwxMyk6Y2MuY29sb3IoOTEsOTEsOTEpO1xyXG4gICAgICAgIGlmKGJ0bkJ1eS5pbnRlcmFjdGFibGUpe1xyXG4gICAgICAgICAgICBwcmljZVRleHQubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHByaWNlVGV4dC5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG93VXNlclVpKCl7XHJcbiAgICAvLyAgICAgdGhpcy5jdXJfc2hvd19pbmRleD1SYWJhdGVUeXBlLkdyb3d0aDtcclxuICAgIC8vICAgICBsZXQgYm90dG9tPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYm90dG9tJyk7XHJcbiAgICAvLyAgICAgYm90dG9tLnk9LWNjLndpblNpemUuaGVpZ2h0LzI7XHJcbiAgICAvLyAgICAgLy8gbGV0IGJ0bkxldmVsPWJvdHRvbS5nZXRDaGlsZEJ5TmFtZSgnYnRuTGV2ZWwnKTtcclxuICAgIC8vICAgICAvLyBidG5MZXZlbC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9dHJ1ZTtcclxuICAgIC8vICAgICAvLyBidG5MZXZlbC5oZWlnaHQ9ODU7XHJcbiAgICAvLyAgICAgLy8gbGV0IGJ0blVzZXI9Ym90dG9tLmdldENoaWxkQnlOYW1lKCdidG5Vc2VyJyk7XHJcbiAgICAvLyAgICAgLy8gYnRuVXNlci5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9ZmFsc2U7XHJcbiAgICAvLyAgICAgLy8gYnRuTGV2ZWwuaGVpZ2h0PTcxO1xyXG5cclxuICAgIC8vICAgICAvLyBib3R0b20uZ2V0Q2hpbGRCeU5hbWUoJ3VzZXJUZXh0JykuY29sb3I9Y2MuY29sb3IoMjQwLDIzMCwxNjYpOy8v5Lqu54K5XHJcbiAgICAvLyAgICAgLy8gYm90dG9tLmdldENoaWxkQnlOYW1lKCdsZXZlbFRleHQnKS5jb2xvcj1jYy5jb2xvcigyNDIsMjI1LDE3Mik7XHJcbiAgICAvLyAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZVRleHQnKS5nZXRDb21wb25lbnQoTGFiZWxMYW5ndWFnZSkuc2V0TGFuZ3VhZ2VJbmRleChMYW5ndWFnZUluZGV4Lkdyb3d0aEludmVzdG1lbnQpO1xyXG5cclxuICAgIC8vICAgICBsZXQgbGV2ZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZXZlbCcpO1xyXG4gICAgLy8gICAgIGxldmVsLmFjdGl2ZT1mYWxzZTtcclxuICAgIC8vICAgICBsZXQgdXNlcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3VzZXInKTtcclxuICAgIC8vICAgICB1c2VyLmFjdGl2ZT10cnVlO1xyXG5cclxuICAgIC8vICAgICAvL+WIt+aWsOeKtuaAgVxyXG4gICAgLy8gICAgIGxldCBudW09TGV2ZWxVcFJlYmF0ZU1hbmFnZXIuZ2V0TWF4UmV3YXJkSUQoKTtcclxuICAgIC8vICAgICBsZXQgY29udGVudD11c2VyLmdldENoaWxkQnlOYW1lKCdzY3JvbGxWaWV3JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAvLyAgICAgbGV0IGlzQ2FuPWZhbHNlO1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT0xOyBpPD1udW07IGkrKyl7XHJcbiAgICAvLyAgICAgICAgIGxldCBpdGVtPWNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW0nK2kpO1xyXG4gICAgLy8gICAgICAgICAvL+iOt+W+l+aVsOaNrlxyXG4gICAgLy8gICAgICAgICBsZXQgcmQ9UmFiYXRlTWFuYWdlci5nZXRSYWJhdGVEYXRhKFJhYmF0ZVR5cGUuR3Jvd3RoLGkpOyAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAvL+aMiemSrlxyXG4gICAgLy8gICAgICAgICBsZXQgYnRuQ2xhbT1pdGVtLmdldENoaWxkQnlOYW1lKCdidG5DbGFtJyk7XHJcbiAgICAvLyAgICAgICAgIGJ0bkNsYW0uYWN0aXZlPSFyZC5pc19jbGFpbWVkO1xyXG4gICAgLy8gICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdmaW5pc2gnKS5hY3RpdmU9cmQuaXNfY2xhaW1lZDtcclxuICAgIC8vICAgICAgICAgLy/lpoLmnpzkuYjmnInpooblj5ZcclxuICAgIC8vICAgICAgICAgaWYoYnRuQ2xhbS5hY3RpdmUpe1xyXG4gICAgLy8gICAgICAgICAgICAgYnRuQ2xhbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9cmQuaXNfY29tcGxldGU7XHJcbiAgICAvLyAgICAgICAgICAgICBidG5DbGFtLmdldENoaWxkQnlOYW1lKCdjbGFtVGV4dCcpLmNvbG9yPXJkLmlzX2NvbXBsZXRlP2NjLmNvbG9yKDEyNCw4MiwxMyk6Y2MuY29sb3IoOTEsOTEsOTEpO1xyXG4gICAgLy8gICAgICAgICAgICAgLy/lpoLmnpzkuYjmnInpooblj5blubbkuJTlrozmiJDkuoZcclxuICAgIC8vICAgICAgICAgICAgIGlmKHJkLmlzX2NvbXBsZXRlKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBpc0Nhbj10cnVlO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGlmKHJkLmlzX2NsYWltZWQpe1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS56SW5kZXg9MTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvL+iOt+WPlui0reS5sOeKtuaAgVxyXG4gICAgLy8gICAgIGxldCBidG5CdXk9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5CdXknKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgIC8vICAgICBsZXQgcHJpY2VUZXh0PXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENoaWxkQnlOYW1lKCdwcmljZVRleHQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgLy8gICAgIC8v6I635b6X5pWw5o2uXHJcbiAgICAvLyAgICAgbGV0IHBheU51bT1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdQYXlJZC5Hcm93dGgnKTtcclxuICAgIC8vICAgICBpZihwYXlOdW0+MCl7XHJcbiAgICAvLyAgICAgICAgIHByaWNlVGV4dC5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyaW5nKExhbmd1YWdlSW5kZXguQ0xBSU1fQUxMKTtcclxuICAgIC8vICAgICAgICAgLy/moLnmja7pooblj5bnirbmgIHliKTmlq3og73lkKbngrnlh7tcclxuICAgIC8vICAgICAgICAgYnRuQnV5LmludGVyYWN0YWJsZT1pc0NhbjtcclxuICAgIC8vICAgICB9ZWxzZXtcclxuICAgIC8vICAgICAgICAgcHJpY2VUZXh0LnN0cmluZz1QYWlkSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcmljZSgnYicrUGF5SWQuR3Jvd3RoKStcIiRcIjtcclxuICAgIC8vICAgICAgICAgYnRuQnV5LmludGVyYWN0YWJsZT10cnVlO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICAvLyBwcmljZVRleHQubm9kZS5jb2xvcj1idG5CdXkuaW50ZXJhY3RhYmxlP2NjLmNvbG9yKDEyNCw4MiwxMyk6Y2MuY29sb3IoOTEsOTEsOTEpO1xyXG4gICAgLy8gICAgIGlmKGJ0bkJ1eS5pbnRlcmFjdGFibGUpe1xyXG4gICAgLy8gICAgICAgICBwcmljZVRleHQubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLXNwcml0ZVwiKSk7XHJcbiAgICAvLyAgICAgfWVsc2V7XHJcbiAgICAvLyAgICAgICAgIHByaWNlVGV4dC5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKFwiMmQtZ3JheS1zcHJpdGVcIikpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBjbGlja0J0bkxldmVsKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmN1cl9zaG93X2luZGV4PVJhYmF0ZVR5cGUuQ2FtcGFpZ247XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blVzZXIoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHRoaXMuY3VyX3Nob3dfaW5kZXg9UmFiYXRlVHlwZS5Hcm93dGg7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuIFxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xhaW0oYnRuLGlkU3RyOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGlkPXBhcnNlSW50KGlkU3RyKTtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIHN3aXRjaCh0aGlzLmN1cl9zaG93X2luZGV4KXtcclxuICAgICAgICAgICAgY2FzZSBSYWJhdGVUeXBlLkNhbXBhaWduOntcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcGF5TnVtPVBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQYXlOdW0oJ2I0MDEnKTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXlJbmZvID0gUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBheUluZm8oJ2I0MDEnKTtcclxuICAgICAgICAgICAgICAgIGlmKHBheU51bT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAvL+mihuWPluaJgOaciVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXdhcmREYXRhPVJhYmF0ZU1hbmFnZXIuY2xhaW1PbmNlKFJhYmF0ZVR5cGUuQ2FtcGFpZ24saWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJld2FyZERhdGEucmV3YXJkX251bT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VHZW0ocmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGdlbUl0ZW09R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3hfanNvbl9kYXRhLmNyZWF0ZUJveEl0ZW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0scmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdlbUl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0scmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGdlbUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0J1eURpYWxvZyhMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg5MjAwMDQpLCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtyZXN1bHQ6KGlzUGF5OmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihpc1BheSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZFBheU51bSgnYjQwMScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19LCdiNDAxJylcclxuICAgICAgICAgICAgICAgICAgICB9LG51bGwsMixwYXlJbmZvLnByaWNlLHBheUluZm8uY3VycmVuY3kpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmFiYXRlVHlwZS5Hcm93dGg6e1xyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQnV5KCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfc2hvd19pbmRleCl7XHJcbiAgICAgICAgICAgIGNhc2UgUmFiYXRlVHlwZS5DYW1wYWlnbjp7XHJcbiAgICAgICAgICAgICAgICAvL+iOt+W+l+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgbGV0IHBheU51bT1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKCdiNDAxJyk7XHJcbiAgICAgICAgICAgICAgICBpZihwYXlOdW0+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pooblj5bmiYDmnIlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV3YXJkRGF0YT1SYWJhdGVNYW5hZ2VyLmNsYWltQWxsKFJhYmF0ZVR5cGUuQ2FtcGFpZ24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJld2FyZERhdGEucmV3YXJkX251bT4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2FtZURhdGEuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VHZW0ocmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGdlbUl0ZW09R2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5ib3hfanNvbl9kYXRhLmNyZWF0ZUJveEl0ZW0ocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0scmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdlbUl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5HZW0scmV3YXJkRGF0YS5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93R2V0VGlwKGdlbUl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93UGF5KHtyZXN1bHQ6KGlzUGF5OmJvb2xlYW4pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzUGF5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBheU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5hZGRQYXlOdW0oJ2I0MDEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFVpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9fSwnYjQwMScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSYWJhdGVUeXBlLkdyb3d0aDp7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNsaWNrQnRuVGlwKCl7XHJcbiAgICAvLyAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgIC8vICAgICBsZXQgaGVscD1jYy5pbnN0YW50aWF0ZSh0aGlzLmhlbHApO1xyXG4gICAgLy8gICAgIHRoaXMubm9kZS5hZGRDaGlsZChoZWxwKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBcclxufVxyXG4iXX0=