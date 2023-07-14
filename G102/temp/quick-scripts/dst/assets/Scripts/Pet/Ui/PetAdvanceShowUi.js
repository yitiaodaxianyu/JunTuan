
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetAdvanceShowUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5580dOyB8VP2quXrWMRTnKj', 'PetAdvanceShowUi');
// Scripts/Pet/Ui/PetAdvanceShowUi.ts

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
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var BtnPet_1 = require("./BtnPet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetAdvanceShowUi = /** @class */ (function (_super) {
    __extends(PetAdvanceShowUi, _super);
    function PetAdvanceShowUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PetAdvanceShowUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    PetAdvanceShowUi.prototype.initData = function (nowPetInfo, oldPetInfo) {
        this.now_pet_info = nowPetInfo;
        this.old_pet_info = oldPetInfo;
        this.refreshUi();
    };
    PetAdvanceShowUi.prototype.refreshUi = function () {
        this.node.getChildByName("old_btn_pet").getComponent(BtnPet_1.default).init(this.old_pet_info);
        this.node.getChildByName("now_btn_pet").getComponent(BtnPet_1.default).init(this.now_pet_info);
        // this.node.getChildByName("oldQualityLabel").getComponent(cc.Label).string = PetManager.getInstance().getPetQualityName(this.old_pet_info.pet_quality);
        // this.node.getChildByName("nowQualityLabel").getComponent(cc.Label).string = PetManager.getInstance().getPetQualityName(this.now_pet_info.pet_quality);
        // let oldData = SpiritAptitudeManager.getInstance().getJsonSpiritAptitude(this.getPetAptitudeId(this.old_pet_info.pet_id,this.old_pet_info.pet_quality));
        // let nowData = SpiritAptitudeManager.getInstance().getJsonSpiritAptitude(this.getPetAptitudeId(this.now_pet_info.pet_id,this.now_pet_info.pet_quality));
        // this.node.getChildByName("oldNumLabel1").getComponent(cc.Label).string = PetManager.getInstance().getPetZhanli(this.old_pet_info).toString();
        // this.node.getChildByName("oldNumLabel2").getComponent(cc.Label).string = oldData.Cooperation.toString();
        // this.node.getChildByName("oldNumLabel3").getComponent(cc.Label).string = oldData.defend.toString();
        // this.node.getChildByName("oldNumLabel4").getComponent(cc.Label).string = oldData.OneHeart.toString();
        // this.node.getChildByName("oldNumLabel5").getComponent(cc.Label).string = oldData.Hit.toString();
        // this.node.getChildByName("oldNumLabel6").getComponent(cc.Label).string = oldData.Miss.toString();
        // this.node.getChildByName("oldNumLabel7").getComponent(cc.Label).string = oldData.Critical.toString();
        // this.node.getChildByName("oldNumLabel8").getComponent(cc.Label).string = oldData.ExtraCritical.toString();
        // this.node.getChildByName("oldNumLabel9").getComponent(cc.Label).string = oldData.AntiCritical.toString();
        // this.node.getChildByName("oldNumLabel10").getComponent(cc.Label).string = oldData.AntiExtraCritical.toString();
        // this.node.getChildByName("nowNumLabel1").getComponent(cc.Label).string = PetManager.getInstance().getPetZhanli(this.now_pet_info).toString();
        // this.node.getChildByName("nowNumLabel2").getComponent(cc.Label).string = nowData.Cooperation.toString();
        // this.node.getChildByName("nowNumLabel3").getComponent(cc.Label).string = nowData.defend.toString();
        // this.node.getChildByName("nowNumLabel4").getComponent(cc.Label).string = nowData.OneHeart.toString();
        // this.node.getChildByName("nowNumLabel5").getComponent(cc.Label).string = nowData.Hit.toString();
        // this.node.getChildByName("nowNumLabel6").getComponent(cc.Label).string = nowData.Miss.toString();
        // this.node.getChildByName("nowNumLabel7").getComponent(cc.Label).string = nowData.Critical.toString();
        // this.node.getChildByName("nowNumLabel8").getComponent(cc.Label).string = nowData.ExtraCritical.toString();
        // this.node.getChildByName("nowNumLabel9").getComponent(cc.Label).string = nowData.AntiCritical.toString();
        // this.node.getChildByName("nowNumLabel10").getComponent(cc.Label).string = nowData.AntiExtraCritical.toString();
    };
    PetAdvanceShowUi.prototype.getPetAptitudeId = function (id, quality) {
        return id * 100 + quality;
    };
    PetAdvanceShowUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    PetAdvanceShowUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    PetAdvanceShowUi = __decorate([
        ccclass
    ], PetAdvanceShowUi);
    return PetAdvanceShowUi;
}(UIComponent_1.default));
exports.default = PetAdvanceShowUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0QWR2YW5jZVNob3dVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsaURBQTRDO0FBQzVDLDZEQUF3RDtBQUN4RCxvREFBK0M7QUFJL0MsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQThDLG9DQUFXO0lBQXpEOztJQW1FQSxDQUFDO0lBOURHLCtCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxtQ0FBUSxHQUFSLFVBQVMsVUFBa0IsRUFBQyxVQUFrQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXJGLHlKQUF5SjtRQUN6Six5SkFBeUo7UUFFekosMEpBQTBKO1FBQzFKLDBKQUEwSjtRQUUxSixnSkFBZ0o7UUFDaEosMkdBQTJHO1FBQzNHLHNHQUFzRztRQUN0Ryx3R0FBd0c7UUFDeEcsbUdBQW1HO1FBQ25HLG9HQUFvRztRQUNwRyx3R0FBd0c7UUFDeEcsNkdBQTZHO1FBQzdHLDRHQUE0RztRQUM1RyxrSEFBa0g7UUFFbEgsZ0pBQWdKO1FBQ2hKLDJHQUEyRztRQUMzRyxzR0FBc0c7UUFDdEcsd0dBQXdHO1FBQ3hHLG1HQUFtRztRQUNuRyxvR0FBb0c7UUFDcEcsd0dBQXdHO1FBQ3hHLDZHQUE2RztRQUM3Ryw0R0FBNEc7UUFDNUcsa0hBQWtIO0lBR3RILENBQUM7SUFFRCwyQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBUyxFQUFDLE9BQWM7UUFDckMsT0FBTyxFQUFFLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRUQsd0NBQWEsR0FBYjtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsc0NBQVcsR0FBWDtRQUVJLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLG9CQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsb0ZBQW9GO0lBQ3hGLENBQUM7SUFqRWdCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBbUVwQztJQUFELHVCQUFDO0NBbkVELEFBbUVDLENBbkU2QyxxQkFBVyxHQW1FeEQ7a0JBbkVvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGV0SW5mbyB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdG5QZXQgZnJvbSBcIi4vQnRuUGV0XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBldEFkdmFuY2VTaG93VWkgZXh0ZW5kcyBVSUNvbXBvbmVudCB7XHJcblxyXG4gICAgbm93X3BldF9pbmZvOlBldEluZm87XHJcbiAgICBvbGRfcGV0X2luZm86UGV0SW5mbztcclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXREYXRhKG5vd1BldEluZm86UGV0SW5mbyxvbGRQZXRJbmZvOlBldEluZm8pe1xyXG4gICAgICAgIHRoaXMubm93X3BldF9pbmZvID0gbm93UGV0SW5mbztcclxuICAgICAgICB0aGlzLm9sZF9wZXRfaW5mbyA9IG9sZFBldEluZm87XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvbGRfYnRuX3BldFwiKS5nZXRDb21wb25lbnQoQnRuUGV0KS5pbml0KHRoaXMub2xkX3BldF9pbmZvKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJub3dfYnRuX3BldFwiKS5nZXRDb21wb25lbnQoQnRuUGV0KS5pbml0KHRoaXMubm93X3BldF9pbmZvKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwib2xkUXVhbGl0eUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFBldFF1YWxpdHlOYW1lKHRoaXMub2xkX3BldF9pbmZvLnBldF9xdWFsaXR5KTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJub3dRdWFsaXR5TGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0UXVhbGl0eU5hbWUodGhpcy5ub3dfcGV0X2luZm8ucGV0X3F1YWxpdHkpO1xyXG5cclxuICAgICAgICAvLyBsZXQgb2xkRGF0YSA9IFNwaXJpdEFwdGl0dWRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25TcGlyaXRBcHRpdHVkZSh0aGlzLmdldFBldEFwdGl0dWRlSWQodGhpcy5vbGRfcGV0X2luZm8ucGV0X2lkLHRoaXMub2xkX3BldF9pbmZvLnBldF9xdWFsaXR5KSk7XHJcbiAgICAgICAgLy8gbGV0IG5vd0RhdGEgPSBTcGlyaXRBcHRpdHVkZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRKc29uU3Bpcml0QXB0aXR1ZGUodGhpcy5nZXRQZXRBcHRpdHVkZUlkKHRoaXMubm93X3BldF9pbmZvLnBldF9pZCx0aGlzLm5vd19wZXRfaW5mby5wZXRfcXVhbGl0eSkpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvbGROdW1MYWJlbDFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0WmhhbmxpKHRoaXMub2xkX3BldF9pbmZvKS50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9sZE51bUxhYmVsMlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG9sZERhdGEuQ29vcGVyYXRpb24udG9TdHJpbmcoKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvbGROdW1MYWJlbDNcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBvbGREYXRhLmRlZmVuZC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9sZE51bUxhYmVsNFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG9sZERhdGEuT25lSGVhcnQudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvbGROdW1MYWJlbDVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBvbGREYXRhLkhpdC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9sZE51bUxhYmVsNlwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG9sZERhdGEuTWlzcy50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9sZE51bUxhYmVsN1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG9sZERhdGEuQ3JpdGljYWwudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvbGROdW1MYWJlbDhcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBvbGREYXRhLkV4dHJhQ3JpdGljYWwudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJvbGROdW1MYWJlbDlcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBvbGREYXRhLkFudGlDcml0aWNhbC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm9sZE51bUxhYmVsMTBcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBvbGREYXRhLkFudGlFeHRyYUNyaXRpY2FsLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vd051bUxhYmVsMVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRaaGFubGkodGhpcy5ub3dfcGV0X2luZm8pLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibm93TnVtTGFiZWwyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbm93RGF0YS5Db29wZXJhdGlvbi50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vd051bUxhYmVsM1wiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5vd0RhdGEuZGVmZW5kLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibm93TnVtTGFiZWw0XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbm93RGF0YS5PbmVIZWFydC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vd051bUxhYmVsNVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5vd0RhdGEuSGl0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibm93TnVtTGFiZWw2XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbm93RGF0YS5NaXNzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibm93TnVtTGFiZWw3XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gbm93RGF0YS5Dcml0aWNhbC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vd051bUxhYmVsOFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5vd0RhdGEuRXh0cmFDcml0aWNhbC50b1N0cmluZygpO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5vd051bUxhYmVsOVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5vd0RhdGEuQW50aUNyaXRpY2FsLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibm93TnVtTGFiZWwxMFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IG5vd0RhdGEuQW50aUV4dHJhQ3JpdGljYWwudG9TdHJpbmcoKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFBldEFwdGl0dWRlSWQoaWQ6bnVtYmVyLHF1YWxpdHk6bnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gaWQgKiAxMDAgKyBxdWFsaXR5O1xyXG4gICAgfVxyXG4gICBcclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==