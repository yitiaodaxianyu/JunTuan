
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Store/ProbabilityTipUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU3RvcmVcXFByb2JhYmlsaXR5VGlwVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQTJDO0FBQzNDLDhDQUF5QztBQUN6QyxvRUFBK0Q7QUFDL0QsZ0VBQTJEO0FBQzNELDhEQUF5RDtBQUN6RCwwREFBcUQ7QUFDckQsMENBQXFDO0FBQ3JDLGlEQUE0QztBQUU1Qyw2REFBbUU7QUFHN0QsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVc7SUFBekQ7O0lBOEhBLENBQUM7SUF6SEcsK0JBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxHQUFHLGdEQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO1lBQzVCLElBQUksQ0FBQyxHQUFVLEVBQUUsQ0FBQztZQUNsQixDQUFDLEdBQUcsZ0JBQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsR0FBRyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEdB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Q0FBQyxDQUFDLElBQUksR0FBRyxFQUFDOzRCQUNkLE1BQU0sR0FBRyxJQUFJLENBQUE7eUJBQ2hCO3FCQUNKO2lCQUNKO2dCQUNELElBQUcsTUFBTSxFQUFDO29CQUNOLE9BQU8sSUFBSSxDQUFBO2lCQUNkO3FCQUFJO29CQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUN0QjthQUNKO2lCQUFJO2dCQUNELE9BQU8sSUFBSSxDQUFBO2FBQ2Q7U0FDSjtJQUNMLENBQUM7SUE1SGdCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBOEhwQztJQUFELHVCQUFDO0NBOUhELEFBOEhDLENBOUg2QyxxQkFBVyxHQThIeEQ7a0JBOUhvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBNeVRvb2wgZnJvbSBcIi4uL1Rvb2xzL015VG9vbFwiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFVpQWN0aW9uIH0gZnJvbSBcIi4uL1VJL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IERyYXdDYXJkUHJvYmFiaWxpdHlNYW5hZ2VyIH0gZnJvbSBcIi4vRHJhd0NhcmRQcm9iYWJpbGl0eVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvYmFiaWxpdHlUaXBVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcblxyXG5cclxuICAgIGphY2twb3RfY29sbGVjdF9pZDpudW1iZXI7XHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VWkoKXtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7orrDlvZXngrnlh7vmi5vli5/mpoLnjoflvLnnqpfnmoTmrKHmlbApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hVaSgpe1xyXG4gICAgICAgIGxldCBkYXRhID0gRHJhd0NhcmRQcm9iYWJpbGl0eU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKCk7XHJcbiAgICAgICAgbGV0IGJhY2tncm91bmQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aTxkYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBsZXQgczpzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBzID0gTXlUb29sLm51bWJlckZvcm1hdChkYXRhW2ldLlByb3BiYWJpbGl0eU51bSAqIDEwMCwyKSArIFwiJVwiO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYmdcIiArIChpKzEpKS5nZXRDaGlsZEJ5TmFtZShcInJhdGVcIisoaSsxKSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYmdcIiArIChpKzEpKS5nZXRDaGlsZEJ5TmFtZShcInJhdGVMYWJlbFwiKyhpKzEpKS5nZXRDb21wb25lbnQoVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoZGF0YVtpXS5Qcm9wYmFiaWxpdHlUZXh0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmQuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiICsgKGkrMSkpLmdldENoaWxkQnlOYW1lKFwicmF0ZVwiKygyKihpICsgMSkgLSAxKSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzO1xyXG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYmdcIiArIChpKzEpKS5nZXRDaGlsZEJ5TmFtZShcInJhdGVMYWJlbFwiKygyKihpICsgMSkgLSAxKSkuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKGRhdGFbaV0uUHJvcGJhYmlsaXR5VGV4dCk7XHJcbiAgICAgICAgICAgIC8vIHMgPSBNeVRvb2wubnVtYmVyRm9ybWF0KGRhdGFbKGkqMikrMV0uUHJvcGJhYmlsaXR5TnVtLDIpICsgXCIlXCI7XHJcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmQuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiICsgKChpKjIpKzEpKS5nZXRDaGlsZEJ5TmFtZShcInJhdGVcIisoMiooaSArIDEpKSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpKzEsXCJyYXRlXCIrKDIqKChpKjIpICsgMSkpKVxyXG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYmdcIiArICgoaSoyKSsxKSkuZ2V0Q2hpbGRCeU5hbWUoXCJyYXRlTGFiZWxcIisoMiooaSArIDEpKSkuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKGRhdGFbaSoyKzFdLlByb3BiYWJpbGl0eVRleHQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpKzEsXCJyYXRlTGFiZWxcIisoMiooKGkqMikgKyAxKSkpXHJcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmQuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiICsgKGkrMikpLmdldENoaWxkQnlOYW1lKFwicmF0ZUxhYmVsXCIrKChpICsgMikgKiAyKSkuZ2V0Q29tcG9uZW50KFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKGRhdGFbaSsxXS5Qcm9wYmFiaWxpdHlUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFdpc2hpbmdVaSgpe1xyXG4gICAgICAgIC8vIGxldCBqYWNrcG90Q29sbGVjdElkOm51bWJlciA9IFdpc2hTcGVuZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRHZXRSZXdhcmRJRCh0aGlzLmphY2twb3RfY29sbGVjdF9pZCk7XHJcbiAgICAgICAgLy8gbGV0IGRyb3BBcnJheSA9IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERyb3BfQXJyYXkoamFja3BvdENvbGxlY3RJZCk7XHJcbiAgICAgICAgLy8gbGV0IGJhY2tncm91bmQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYWNrZ3JvdW5kXCIpO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuc3RhdGUgPT0gMSl7Ly/mma7pgJpcclxuICAgICAgICAvLyAgICAgYmFja2dyb3VuZC5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9XaW5kb3dfVGl0bGVcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4NDAwMTIpO1xyXG4gICAgICAgIC8vIH1lbHNley8v6auY57qnXHJcbiAgICAgICAgLy8gICAgIGJhY2tncm91bmQuZ2V0Q2hpbGRCeU5hbWUoXCJDb21tb25fV2luZG93X1RpdGxlXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oVGV4dExhbmd1YWdlKS5zZXRUZXh0SWQoODQwMDEzKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpPE1hdGguY2VpbCgoZHJvcEFycmF5Lmxlbmd0aC8yKSk7aSsrKXtcclxuICAgICAgICAvLyAgICAgbGV0IHM6c3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG51bSA9IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJhdGVCeUphY2twb3RJZChqYWNrcG90Q29sbGVjdElkLGRyb3BBcnJheVsyKihpKzEpIC0gMl0pO1xyXG4gICAgICAgIC8vICAgICBudW0gKj0gMTAwO1xyXG4gICAgICAgIC8vICAgICBzID0gdGhpcy5wcmljZUZvcm1hdChudW0sMikgKyBcIiVcIjtcclxuICAgICAgICAvLyAgICAgYmFja2dyb3VuZC5nZXRDaGlsZEJ5TmFtZShcImJnXCIgKyAoaSsxKSkuZ2V0Q2hpbGRCeU5hbWUoXCJyYXRlXCIrKDIqKGkgKyAxKSAtIDEpKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHM7XHJcbiAgICAgICAgLy8gICAgIGlmKGkgPT0gNCkgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICBudW0gPSBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSYXRlQnlKYWNrcG90SWQoamFja3BvdENvbGxlY3RJZCxkcm9wQXJyYXlbMiooaSsxKSAtIDFdKTtcclxuICAgICAgICAvLyAgICAgbnVtICo9IDEwMDtcclxuICAgICAgICAvLyAgICAgcyA9IHRoaXMucHJpY2VGb3JtYXQobnVtLDIpICsgXCIlXCI7XHJcbiAgICAgICAgLy8gICAgIGJhY2tncm91bmQuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiICsgKGkrMSkpLmdldENoaWxkQnlOYW1lKFwicmF0ZVwiKygoaSArIDEpICogMikpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcztcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gTWF0aC5jZWlsKChkcm9wQXJyYXkubGVuZ3RoLzIpKTtpIDwgNTtpKyspe1xyXG4gICAgICAgIC8vICAgICBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYmdcIiArIChpKzEpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFRha2VFZ2dVaSgpe1xyXG4gICAgICAgIC8vIGxldCBqYWNrcG90Q29sbGVjdElkOm51bWJlciA9IEVnZ0luZm9ybWF0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEVnZ3NSZXdhcmQodGhpcy5qYWNrcG90X2NvbGxlY3RfaWQpO1xyXG4gICAgICAgIC8vIGxldCBkcm9wQXJyYXkgPSBKYWNrcG90Q29sbGVjdGlvbk1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXREcm9wX0FycmF5KGphY2twb3RDb2xsZWN0SWQpO1xyXG4gICAgICAgIC8vIGxldCBiYWNrZ3JvdW5kID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYmFja2dyb3VuZFwiKTtcclxuXHJcbiAgICAgICAgLy8gaWYodGhpcy5zdGF0ZSA9PSAxKXtcclxuICAgICAgICAvLyAgICAgYmFja2dyb3VuZC5nZXRDaGlsZEJ5TmFtZShcIkNvbW1vbl9XaW5kb3dfVGl0bGVcIikuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZCg4NDAwMzIpO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiQ29tbW9uX1dpbmRvd19UaXRsZVwiKS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKFRleHRMYW5ndWFnZSkuc2V0VGV4dElkKDg0MDAzMyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpPGRyb3BBcnJheS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAvLyAgICAgbGV0IHM6c3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyAgICAgbGV0IG51bSA9IEphY2twb3RDb2xsZWN0aW9uTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJhdGVCeUphY2twb3RJZChqYWNrcG90Q29sbGVjdElkLGRyb3BBcnJheVtpXSk7XHJcbiAgICAgICAgLy8gICAgIG51bSAqPSAxMDA7XHJcbiAgICAgICAgLy8gICAgIHMgPSB0aGlzLnByaWNlRm9ybWF0KG51bSwyKSArIFwiJVwiO1xyXG4gICAgICAgIC8vICAgICBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYmdcIiArIChpKzEpKS5nZXRDaGlsZEJ5TmFtZShcInJhdGVcIisoMiooaSArIDEpIC0gMSkpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcztcclxuICAgICAgICAvLyAgICAgYmFja2dyb3VuZC5nZXRDaGlsZEJ5TmFtZShcImJnXCIgKyAoaSsxKSkuZ2V0Q2hpbGRCeU5hbWUoXCJyYXRlXCIrKChpICsgMSkgKiAyKSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIGJhY2tncm91bmQuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiICsgKGkrMSkpLmdldENoaWxkQnlOYW1lKFwicmF0ZUxhYmVsXCIrKChpICsgMSkgKiAyKSkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBiYWNrZ3JvdW5kLmdldENvbXBvbmVudChjYy5MYXlvdXQpLnNwYWNpbmdZID0gMjU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gZHJvcEFycmF5Lmxlbmd0aDtpIDwgNTtpKyspe1xyXG4gICAgICAgIC8vICAgICBiYWNrZ3JvdW5kLmdldENoaWxkQnlOYW1lKFwiYmdcIiArIChpKzEpKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveVNlbGYoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2xvc2VCYW5uZXIoKTtcclxuICAgICAgICAvLyBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmljZUZvcm1hdChudW06bnVtYmVyLG46bnVtYmVyKXtcclxuICAgICAgICBpZighaXNOYU4obnVtKSl7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0gbnVtLnRvRml4ZWQobik7XHJcbiAgICAgICAgICAgIGlmKHRlbXAuaW5kZXhPZignLicpICE9IC0xKXtcclxuICAgICAgICAgICAgICAgIGxldCBpc1plcm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IHRlbXAuaW5kZXhPZignLicpICsgMTtpIDw9IHRlbXAuaW5kZXhPZignLicpK247aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihpPHRlbXAubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGVtcFtpXSAhPSAnMCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNaZXJvID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoaXNaZXJvKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVtcFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih0ZW1wKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==