
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetReductionUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5866gbp5BJqKCxE8Lc9fgc', 'PetReductionUi');
// Scripts/Pet/Ui/PetReductionUi.ts

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
var ApkManager_1 = require("../../Ads/ApkManager");
var GameManager_1 = require("../../GameManager");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetReductionUi = /** @class */ (function (_super) {
    __extends(PetReductionUi, _super);
    function PetReductionUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_info = null;
        return _this;
    }
    PetReductionUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    PetReductionUi.prototype.initData = function (petInfo) {
        this.pet_info = petInfo;
        this.refreshUi();
    };
    PetReductionUi.prototype.refreshUi = function () {
        // this.node.getChildByName("cinItem").getComponentInChildren(cc.Label).string = MyTool.getCoinDanwei(SpiritLevelUpManager.getInstance().getNowLevelAllCostCoin(this.pet_info.pet_level));
        // this.node.getChildByName("foodItem").getComponentInChildren(cc.Label).string = MyTool.getCoinDanwei(SpiritLevelUpManager.getInstance().getNowLevelAllCostFood(this.pet_info.pet_level));
    };
    PetReductionUi.prototype.onClickSureBtn = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.Gem, -50)) {
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.宠物还原总次数);
            FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.不同宠物的还原次数 + this.pet_info.pet_id);
            // let coinNum = SpiritLevelUpManager.getInstance().getNowLevelAllCostCoin(this.pet_info.pet_level);
            // let foodNum = SpiritLevelUpManager.getInstance().getNowLevelAllCostFood(this.pet_info.pet_level)
            // let coinItem = PropManager.getInstance().createPropItem(PropId.Coin,coinNum);
            // let foodItem = PropManager.getInstance().createPropItem(PropId.AnimalFood,foodNum);
            // let rewardList:cc.Node[] = [];
            // this.pet_info.resetLevel();
            // rewardList.push(coinItem);
            // rewardList.push(foodItem);
            // GameManager.getInstance().showMultipleGetTip(rewardList,(() =>{
            //     PropManager.getInstance().changePropNum(PropId.Coin,coinNum);
            //     PropManager.getInstance().changePropNum(PropId.AnimalFood,foodNum);
            //     this.destroySelf();
            // }).bind(this));
        }
    };
    PetReductionUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    PetReductionUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    PetReductionUi = __decorate([
        ccclass
    ], PetReductionUi);
    return PetReductionUi;
}(UIComponent_1.default));
exports.default = PetReductionUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0UmVkdWN0aW9uVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLGlEQUE0QztBQUM1Qyx1RUFBa0U7QUFDbEUsbUVBQThEO0FBQzlELG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBRXhELG9EQUErQztBQUl6QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBVztJQUF2RDtRQUFBLHFFQW9EQztRQWxEVyxjQUFRLEdBQVcsSUFBSSxDQUFDOztJQWtEcEMsQ0FBQztJQWhERSw2QkFBSSxHQUFKLFVBQUssSUFBYztRQUNmLGlCQUFNLElBQUksWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUNBQVEsR0FBUixVQUFTLE9BQWU7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQ0ssMExBQTBMO1FBQzFMLDJMQUEyTDtJQUNoTSxDQUFDO0lBRUQsdUNBQWMsR0FBZDtRQUNLLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUcseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQU0sQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQztZQUN2RCx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEYsb0dBQW9HO1lBQ3BHLG1HQUFtRztZQUNuRyxnRkFBZ0Y7WUFDaEYsc0ZBQXNGO1lBQ3RGLGlDQUFpQztZQUNqQyw4QkFBOEI7WUFDOUIsNkJBQTZCO1lBQzdCLDZCQUE2QjtZQUM3QixrRUFBa0U7WUFDbEUsb0VBQW9FO1lBQ3BFLDBFQUEwRTtZQUMxRSwwQkFBMEI7WUFDMUIsa0JBQWtCO1NBQ3JCO0lBQ04sQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFFSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNoQixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLG9GQUFvRjtJQUN4RixDQUFDO0lBbERpQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBb0RsQztJQUFELHFCQUFDO0NBcERELEFBb0RDLENBcEQyQyxxQkFBVyxHQW9EdEQ7a0JBcERvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uLy4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uLy4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi8uLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi8uLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBQZXRJbmZvIH0gZnJvbSBcIi4uL1BldENvbmZpZ1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXRSZWR1Y3Rpb25VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHBldF9pbmZvOlBldEluZm8gPSBudWxsO1xyXG5cclxuICAgaW5pdCh1aUFjOiBVaUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgfVxyXG5cclxuICAgaW5pdERhdGEocGV0SW5mbzpQZXRJbmZvKXtcclxuICAgICAgICB0aGlzLnBldF9pbmZvID0gcGV0SW5mbztcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICB9XHJcblxyXG4gICByZWZyZXNoVWkoKXtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjaW5JdGVtXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFNwaXJpdExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm93TGV2ZWxBbGxDb3N0Q29pbih0aGlzLnBldF9pbmZvLnBldF9sZXZlbCkpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImZvb2RJdGVtXCIpLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuTGFiZWwpLnN0cmluZyA9IE15VG9vbC5nZXRDb2luRGFud2VpKFNwaXJpdExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm93TGV2ZWxBbGxDb3N0Rm9vZCh0aGlzLnBldF9pbmZvLnBldF9sZXZlbCkpO1xyXG4gICB9XHJcblxyXG4gICBvbkNsaWNrU3VyZUJ0bigpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgaWYoUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5HZW0sLTUwKSl7XHJcbiAgICAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7lrqDnianov5jljp/mgLvmrKHmlbApO1xyXG4gICAgICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZm9sbG93RXZlbnQoRm9sbG93X1R5cGUu5LiN5ZCM5a6g54mp55qE6L+Y5Y6f5qyh5pWwICsgdGhpcy5wZXRfaW5mby5wZXRfaWQpO1xyXG4gICAgICAgICAgICAvLyBsZXQgY29pbk51bSA9IFNwaXJpdExldmVsVXBNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Tm93TGV2ZWxBbGxDb3N0Q29pbih0aGlzLnBldF9pbmZvLnBldF9sZXZlbCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBmb29kTnVtID0gU3Bpcml0TGV2ZWxVcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROb3dMZXZlbEFsbENvc3RGb29kKHRoaXMucGV0X2luZm8ucGV0X2xldmVsKVxyXG4gICAgICAgICAgICAvLyBsZXQgY29pbkl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5Db2luLGNvaW5OdW0pO1xyXG4gICAgICAgICAgICAvLyBsZXQgZm9vZEl0ZW0gPSBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKFByb3BJZC5BbmltYWxGb29kLGZvb2ROdW0pO1xyXG4gICAgICAgICAgICAvLyBsZXQgcmV3YXJkTGlzdDpjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICAgICAgLy8gdGhpcy5wZXRfaW5mby5yZXNldExldmVsKCk7XHJcbiAgICAgICAgICAgIC8vIHJld2FyZExpc3QucHVzaChjb2luSXRlbSk7XHJcbiAgICAgICAgICAgIC8vIHJld2FyZExpc3QucHVzaChmb29kSXRlbSk7XHJcbiAgICAgICAgICAgIC8vIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJld2FyZExpc3QsKCgpID0+e1xyXG4gICAgICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5Db2luLGNvaW5OdW0pO1xyXG4gICAgICAgICAgICAvLyAgICAgUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jaGFuZ2VQcm9wTnVtKFByb3BJZC5BbmltYWxGb29kLGZvb2ROdW0pO1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAvLyB9KS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICB7XHJcbiAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICB9XHJcblxyXG4gICBkZXN0cm95U2VsZigpXHJcbiAgIHtcclxuICAgICAgIHN1cGVyLm9uQ2xvc2UoKTtcclxuICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jbG9zZUJhbm5lcigpO1xyXG4gICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgIH1cclxuXHJcbn1cclxuIl19