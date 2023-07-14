
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/ConsumptionTipUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6e502Nu3KpH66sQOZiGttrH', 'ConsumptionTipUi');
// Scripts/UI/ConsumptionTipUi.ts

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
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("./UIComponent");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var MyTool_1 = require("../Tools/MyTool");
var Item_1 = require("../Prop/Data/Item");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ConsumptionTipUi = /** @class */ (function (_super) {
    __extends(ConsumptionTipUi, _super);
    function ConsumptionTipUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sure_call_back = null;
        _this.currency_type = PropConfig_1.PropId.Coin;
        _this.currency_num = 0;
        return _this;
    }
    ConsumptionTipUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    ConsumptionTipUi.prototype.initCallBack = function (currencyType, currencyNum, sureCallBack) {
        this.sure_call_back = sureCallBack;
        this.currency_type = currencyType;
        this.currency_num = currencyNum;
        this.initUi();
    };
    ConsumptionTipUi.prototype.initUi = function () {
        this.node.getChildByName("titleLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100003);
        this.node.getChildByName("contentLabel1").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100022);
        this.node.getChildByName("contentLabel2").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100004);
        this.node.getChildByName("cancelLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100002);
        this.node.getChildByName("sureLabel").getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(100001);
        this.node.getChildByName("useIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(this.currency_type);
        this.node.getChildByName("tipIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(this.currency_type);
        this.node.getChildByName("useLabel").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(this.currency_num);
        var tipLabel = this.node.getChildByName("tipLabel");
        tipLabel.getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(PropManager_1.PropManager.getInstance().getPropNum(this.currency_type));
        // console.log("初始化Ui",this.currency_num,PropManager.getInstance().getPropNum(this.currency_type));
        if (this.currency_num > PropManager_1.PropManager.getInstance().getPropNum(this.currency_type)) {
            // console.log("钱不够了");
            tipLabel.color = cc.color(209, 44, 45);
        }
    };
    ConsumptionTipUi.prototype.clickBtnSure = function () {
        if (this.currency_num > PropManager_1.PropManager.getInstance().getPropNum(this.currency_type)) {
            // console.log("钱不够的提示")
            var str = "";
            str = LanguageManager_1.default.getInstance().getStrByTextId(Item_1.ItemManager.getInstance().getNameTextId(this.currency_type)) + LanguageManager_1.default.getInstance().getStrByTextId(100021);
            GameManager_1.default.getInstance().showMessage(str);
        }
        else {
            // console.log("扣钱之前的数量：" + PropManager.getInstance().getPropNum(this.currency_type),this.currency_num * -1)
            PropManager_1.PropManager.getInstance().changePropNum(this.currency_type, this.currency_num * -1);
            // console.log("扣钱之后的数量：" + PropManager.getInstance().getPropNum(this.currency_type))
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
            this.sure_call_back();
            this.destroySelf();
        }
    };
    ConsumptionTipUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    ConsumptionTipUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    ConsumptionTipUi = __decorate([
        ccclass
    ], ConsumptionTipUi);
    return ConsumptionTipUi;
}(UIComponent_1.default));
exports.default = ConsumptionTipUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXENvbnN1bXB0aW9uVGlwVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDhDQUF5QztBQUN6QywwREFBcUQ7QUFDckQsNkNBQXdDO0FBRXhDLG9FQUE4RDtBQUM5RCxpREFBNEM7QUFDNUMsbURBQWtEO0FBQ2xELDBDQUFxQztBQUNyQywwQ0FBZ0Q7QUFFMUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVc7SUFBekQ7UUFBQSxxRUFnRUM7UUE5RFcsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFDakMsbUJBQWEsR0FBVSxtQkFBTSxDQUFDLElBQUksQ0FBQztRQUNuQyxrQkFBWSxHQUFVLENBQUMsQ0FBQzs7SUE0RHBDLENBQUM7SUEzREcsK0JBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELHVDQUFZLEdBQVosVUFBYSxZQUFtQixFQUFDLFdBQWtCLEVBQUMsWUFBcUI7UUFDckUsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxpQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUgsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV0SSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0csSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUMsYUFBYSxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3hILG1HQUFtRztRQUNuRyxJQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFDO1lBQzVFLHVCQUF1QjtZQUN2QixRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCx1Q0FBWSxHQUFaO1FBQ0ksSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFHLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBQztZQUM1RSx3QkFBd0I7WUFDeEIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2IsR0FBRyxHQUFHLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLGtCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZLLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlDO2FBQUk7WUFDRCw0R0FBNEc7WUFDNUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkYscUZBQXFGO1lBQ3JGLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsd0NBQWEsR0FBYjtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUVJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsb0ZBQW9GO0lBQ3hGLENBQUM7SUEvRGdCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBZ0VwQztJQUFELHVCQUFDO0NBaEVELEFBZ0VDLENBaEU2QyxxQkFBVyxHQWdFeEQ7a0JBaEVvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuL1VpSW50ZXJmYWNlXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSAnLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXInXHJcbmltcG9ydCB7IFByb3BJZCB9IGZyb20gXCIuLi9Qcm9wL1Byb3BDb25maWdcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc3VtcHRpb25UaXBVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN1cmVfY2FsbF9iYWNrIDogRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW5jeV90eXBlOlByb3BJZCA9IFByb3BJZC5Db2luO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW5jeV9udW06bnVtYmVyID0gMDtcclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYWxsQmFjayhjdXJyZW5jeVR5cGU6UHJvcElkLGN1cnJlbmN5TnVtOm51bWJlcixzdXJlQ2FsbEJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMuc3VyZV9jYWxsX2JhY2sgPSBzdXJlQ2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5jdXJyZW5jeV90eXBlID0gY3VycmVuY3lUeXBlO1xyXG4gICAgICAgIHRoaXMuY3VycmVuY3lfbnVtID0gY3VycmVuY3lOdW07XHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VWkoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDAzKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50TGFiZWwxXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDIyKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50TGFiZWwyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDA0KTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjYW5jZWxMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDAwMik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3VyZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoMTAwMDAxKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VJY29uXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEJ5UHJvcElkKHRoaXMuY3VycmVuY3lfdHlwZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidGlwSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZCh0aGlzLmN1cnJlbmN5X3R5cGUpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKHRoaXMuY3VycmVuY3lfbnVtKTtcclxuICAgICAgICBsZXQgdGlwTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aXBMYWJlbFwiKTtcclxuICAgICAgICB0aXBMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmN1cnJlbmN5X3R5cGUpKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWIneWni+WMllVpXCIsdGhpcy5jdXJyZW5jeV9udW0sUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHRoaXMuY3VycmVuY3lfdHlwZSkpO1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVuY3lfbnVtID4gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wTnVtKHRoaXMuY3VycmVuY3lfdHlwZSkpe1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIumSseS4jeWkn+S6hlwiKTtcclxuICAgICAgICAgICAgdGlwTGFiZWwuY29sb3IgPSBjYy5jb2xvcigyMDksNDQsNDUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blN1cmUoKXtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbmN5X251bSA+IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmN1cnJlbmN5X3R5cGUpKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLpkrHkuI3lpJ/nmoTmj5DnpLpcIilcclxuICAgICAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN0ciA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TmFtZVRleHRJZCh0aGlzLmN1cnJlbmN5X3R5cGUpKSArIExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDEwMDAyMSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd01lc3NhZ2Uoc3RyKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmiaPpkrHkuYvliY3nmoTmlbDph4/vvJpcIiArIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLmN1cnJlbmN5X3R5cGUpLHRoaXMuY3VycmVuY3lfbnVtICogLTEpXHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bSh0aGlzLmN1cnJlbmN5X3R5cGUsdGhpcy5jdXJyZW5jeV9udW0gKiAtMSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5omj6ZKx5LmL5ZCO55qE5pWw6YeP77yaXCIgKyBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0odGhpcy5jdXJyZW5jeV90eXBlKSlcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICAgICAgdGhpcy5zdXJlX2NhbGxfYmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgICB9XHJcbn1cclxuIl19