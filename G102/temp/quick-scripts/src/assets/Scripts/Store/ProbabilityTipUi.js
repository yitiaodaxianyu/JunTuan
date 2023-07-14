"use strict";
cc._RF.push(module, '3ad22mNA6pKhqAkXhXVKdPO', 'ProbabilityTipUi');
// Scripts/Store/ProbabilityTipUi.ts

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
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var TextLanguage_1 = require("../multiLanguage/TextLanguage");
var AudioConstants_1 = require("../Sound/AudioConstants");
var MyTool_1 = require("../Tools/MyTool");
var UIComponent_1 = require("../UI/UIComponent");
var DrawCardProbability_1 = require("./DrawCardProbability");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ProbabilityTipUi = /** @class */ (function (_super) {
    __extends(ProbabilityTipUi, _super);
    function ProbabilityTipUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProbabilityTipUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    ProbabilityTipUi.prototype.initUi = function () {
        this.refreshUi();
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.记录点击招募概率弹窗的次数);
    };
    ProbabilityTipUi.prototype.refreshUi = function () {
        var data = DrawCardProbability_1.DrawCardProbabilityManager.getInstance().getData();
        var background = this.node.getChildByName("background");
        for (var i = 0; i < data.length; i++) {
            var s = "";
            s = MyTool_1.default.numberFormat(data[i].PropbabilityNum * 100, 2) + "%";
            background.getChildByName("bg" + (i + 1)).getChildByName("rate" + (i + 1)).getComponent(cc.Label).string = s;
            background.getChildByName("bg" + (i + 1)).getChildByName("rateLabel" + (i + 1)).getComponent(TextLanguage_1.default).setTextId(data[i].PropbabilityText);
            // background.getChildByName("bg" + (i+1)).getChildByName("rate"+(2*(i + 1) - 1)).getComponent(cc.Label).string = s;
            // background.getChildByName("bg" + (i+1)).getChildByName("rateLabel"+(2*(i + 1) - 1)).getComponent(TextLanguage).setTextId(data[i].PropbabilityText);
            // s = MyTool.numberFormat(data[(i*2)+1].PropbabilityNum,2) + "%";
            // background.getChildByName("bg" + ((i*2)+1)).getChildByName("rate"+(2*(i + 1))).getComponent(cc.Label).string = s;
            // console.log(i+1,"rate"+(2*((i*2) + 1)))
            // background.getChildByName("bg" + ((i*2)+1)).getChildByName("rateLabel"+(2*(i + 1))).getComponent(TextLanguage).setTextId(data[i*2+1].PropbabilityText);
            // console.log(i+1,"rateLabel"+(2*((i*2) + 1)))
            // background.getChildByName("bg" + (i+2)).getChildByName("rateLabel"+((i + 2) * 2)).getComponent(TextLanguage).setTextId(data[i+1].PropbabilityText);
        }
    };
    ProbabilityTipUi.prototype.refreshWishingUi = function () {
        // let jackpotCollectId:number = WishSpendManager.getInstance().getGetRewardID(this.jackpot_collect_id);
        // let dropArray = JackpotCollectionManager.getInstance().getDrop_Array(jackpotCollectId);
        // let background = this.node.getChildByName("background");
        // if(this.state == 1){//普通
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840012);
        // }else{//高级
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840013);
        // }
        // for(let i = 0;i<Math.ceil((dropArray.length/2));i++){
        //     let s:string = "";
        //     let num = JackpotCollectionManager.getInstance().getRateByJackpotId(jackpotCollectId,dropArray[2*(i+1) - 2]);
        //     num *= 100;
        //     s = this.priceFormat(num,2) + "%";
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+(2*(i + 1) - 1)).getComponent(cc.Label).string = s;
        //     if(i == 4)  break;
        //     num = JackpotCollectionManager.getInstance().getRateByJackpotId(jackpotCollectId,dropArray[2*(i+1) - 1]);
        //     num *= 100;
        //     s = this.priceFormat(num,2) + "%";
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+((i + 1) * 2)).getComponent(cc.Label).string = s;
        // }
        // for(let i = Math.ceil((dropArray.length/2));i < 5;i++){
        //     background.getChildByName("bg" + (i+1)).active = false;
        // }
    };
    ProbabilityTipUi.prototype.refreshTakeEggUi = function () {
        // let jackpotCollectId:number = EggInformationManager.getInstance().getEggsReward(this.jackpot_collect_id);
        // let dropArray = JackpotCollectionManager.getInstance().getDrop_Array(jackpotCollectId);
        // let background = this.node.getChildByName("background");
        // if(this.state == 1){
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840032);
        // }else{
        //     background.getChildByName("Common_Window_Title").getComponentInChildren(TextLanguage).setTextId(840033);
        // }
        // for(let i = 0;i<dropArray.length;i++){
        //     let s:string = "";
        //     let num = JackpotCollectionManager.getInstance().getRateByJackpotId(jackpotCollectId,dropArray[i]);
        //     num *= 100;
        //     s = this.priceFormat(num,2) + "%";
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+(2*(i + 1) - 1)).getComponent(cc.Label).string = s;
        //     background.getChildByName("bg" + (i+1)).getChildByName("rate"+((i + 1) * 2)).active = false;
        //     background.getChildByName("bg" + (i+1)).getChildByName("rateLabel"+((i + 1) * 2)).active = false;
        // }
        // background.getComponent(cc.Layout).spacingY = 25;
        // for(let i = dropArray.length;i < 5;i++){
        //     background.getChildByName("bg" + (i+1)).active = false;
        // }
    };
    ProbabilityTipUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    ProbabilityTipUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    ProbabilityTipUi.prototype.priceFormat = function (num, n) {
        if (!isNaN(num)) {
            var temp = num.toFixed(n);
            if (temp.indexOf('.') != -1) {
                var isZero = false;
                for (var i = temp.indexOf('.') + 1; i <= temp.indexOf('.') + n; i++) {
                    if (i < temp.length) {
                        if (temp[i] != '0') {
                            isZero = true;
                        }
                    }
                }
                if (isZero) {
                    return temp;
                }
                else {
                    return Number(temp);
                }
            }
            else {
                return temp;
            }
        }
    };
    ProbabilityTipUi = __decorate([
        ccclass
    ], ProbabilityTipUi);
    return ProbabilityTipUi;
}(UIComponent_1.default));
exports.default = ProbabilityTipUi;

cc._RF.pop();