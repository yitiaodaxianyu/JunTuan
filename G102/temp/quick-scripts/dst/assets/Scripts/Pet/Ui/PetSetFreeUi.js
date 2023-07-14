
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetSetFreeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f22bJPCmtDVLFJv5XyUHzT', 'PetSetFreeUi');
// Scripts/Pet/Ui/PetSetFreeUi.ts

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
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var BtnPet_1 = require("./BtnPet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetSetFreeUi = /** @class */ (function (_super) {
    __extends(PetSetFreeUi, _super);
    function PetSetFreeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pet_info_list = [];
        _this.reward_list = [];
        _this.pet_item = null;
        return _this;
    }
    PetSetFreeUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
    };
    PetSetFreeUi.prototype.initData = function (petInfoList) {
        this.pet_info_list = petInfoList;
        this.refreshUi();
    };
    PetSetFreeUi.prototype.refreshUi = function () {
        var _this = this;
        var content1 = this.node.getChildByName("petScroll").getComponent(cc.ScrollView).content;
        var content2 = this.node.getChildByName("rewardScroll").getComponent(cc.ScrollView).content;
        this.pet_info_list.forEach(function (v, k) {
            // let data:JsonSpiritRelease = SpiritReleaseManager.getInstance().getDataByQualityAndRarity(v.pet_quality,SpiritMessageManager.getInstance().getSpiritRarity(v.pet_id));
            // let rewardData:RewardData = new RewardData();
            // rewardData.reward_id = data.GetItem;
            // rewardData.reward_num = data.GetNum;
            // let isAdd = false;
            // this.reward_list.find((v,i,a) => {
            //     if(v.reward_id == data.GetItem){
            //         v.reward_num += data.GetNum;
            //         isAdd = true
            //     }
            // });
            // if(isAdd == false){
            //     this.reward_list.push(rewardData);
            // }
        });
        this.pet_info_list.forEach(function (v, k) {
            var petItem = cc.instantiate(_this.pet_item);
            petItem.getComponent(BtnPet_1.default).init(v);
            content1.addChild(petItem);
        });
        this.reward_list.forEach(function (v, k) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
            content2.addChild(item);
        });
    };
    PetSetFreeUi.prototype.onClickSureBtn = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.pet_info_list.forEach(function (v, k) {
            //    PetManager.getInstance().removePet(v);
        });
        this.reward_list.forEach(function (v, k) {
            PropManager_1.PropManager.getInstance().changePropNum(v.reward_id, v.reward_num);
        });
        var rewardList = [];
        this.reward_list.forEach(function (v, k) {
            var item = PropManager_1.PropManager.getInstance().createPropItem(v.reward_id, v.reward_num);
            rewardList.push(item);
        });
        GameManager_1.default.getInstance().showMultipleGetTip(rewardList, (function () {
            _this.destroySelf();
        }).bind(this));
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Fangsheng);
    };
    PetSetFreeUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    PetSetFreeUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.Prefab)
    ], PetSetFreeUi.prototype, "pet_item", void 0);
    PetSetFreeUi = __decorate([
        ccclass
    ], PetSetFreeUi);
    return PetSetFreeUi;
}(UIComponent_1.default));
exports.default = PetSetFreeUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0U2V0RnJlZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5QyxpREFBNEM7QUFFNUMsc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCxvREFBK0M7QUFJL0MsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFXO0lBQXJEO1FBQUEscUVBbUZDO1FBakZXLG1CQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLGlCQUFXLEdBQWUsRUFBRSxDQUFDO1FBR3JDLGNBQVEsR0FBYSxJQUFJLENBQUM7O0lBNkU5QixDQUFDO0lBM0VHLDJCQUFJLEdBQUosVUFBSyxJQUFjO1FBQ2YsaUJBQU0sSUFBSSxZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVMsV0FBcUI7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQUEsaUJBK0JDO1FBOUJHLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3pGLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRTVGLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUM7WUFDM0IseUtBQXlL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QVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FtRmhDO0lBQUQsbUJBQUM7Q0FuRkQsQUFtRkMsQ0FuRnlDLHFCQUFXLEdBbUZwRDtrQkFuRm9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBrTWFuYWdlciBmcm9tIFwiLi4vLi4vQWRzL0Fwa01hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uLy4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uLy4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vVUkvVUlDb21wb25lbnRcIjtcclxuaW1wb3J0IHsgVWlBY3Rpb24gfSBmcm9tIFwiLi4vLi4vVUkvVWlJbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUGV0SW5mbyB9IGZyb20gXCIuLi9QZXRDb25maWdcIjtcclxuaW1wb3J0IHsgUGV0TWFuYWdlciB9IGZyb20gXCIuLi9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCBCdG5QZXQgZnJvbSBcIi4vQnRuUGV0XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBldFNldEZyZWVVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHBldF9pbmZvX2xpc3Q6UGV0SW5mb1tdID0gW107XHJcbiAgICBwcml2YXRlIHJld2FyZF9saXN0OlJld2FyZERhdGFbXSA9W107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHBldF9pdGVtOmNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBcclxuICAgIGluaXQodWlBYzogVWlBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5pbml0KHVpQWMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXREYXRhKHBldEluZm9MaXN0OlBldEluZm9bXSl7XHJcbiAgICAgICAgdGhpcy5wZXRfaW5mb19saXN0ID0gcGV0SW5mb0xpc3Q7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoVWkoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICBsZXQgY29udGVudDEgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwZXRTY3JvbGxcIikuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLmNvbnRlbnQ7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmV3YXJkU2Nyb2xsXCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5jb250ZW50O1xyXG5cclxuICAgICAgICB0aGlzLnBldF9pbmZvX2xpc3QuZm9yRWFjaCgodixrKSA9PntcclxuICAgICAgICAgICAgLy8gbGV0IGRhdGE6SnNvblNwaXJpdFJlbGVhc2UgPSBTcGlyaXRSZWxlYXNlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGFCeVF1YWxpdHlBbmRSYXJpdHkodi5wZXRfcXVhbGl0eSxTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwaXJpdFJhcml0eSh2LnBldF9pZCkpO1xyXG4gICAgICAgICAgICAvLyBsZXQgcmV3YXJkRGF0YTpSZXdhcmREYXRhID0gbmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAgICAgLy8gcmV3YXJkRGF0YS5yZXdhcmRfaWQgPSBkYXRhLkdldEl0ZW07XHJcbiAgICAgICAgICAgIC8vIHJld2FyZERhdGEucmV3YXJkX251bSA9IGRhdGEuR2V0TnVtO1xyXG4gICAgICAgICAgICAvLyBsZXQgaXNBZGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5yZXdhcmRfbGlzdC5maW5kKCh2LGksYSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYodi5yZXdhcmRfaWQgPT0gZGF0YS5HZXRJdGVtKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICB2LnJld2FyZF9udW0gKz0gZGF0YS5HZXROdW07XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaXNBZGQgPSB0cnVlXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAvLyBpZihpc0FkZCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJld2FyZF9saXN0LnB1c2gocmV3YXJkRGF0YSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wZXRfaW5mb19saXN0LmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgICAgIGxldCBwZXRJdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5wZXRfaXRlbSk7XHJcbiAgICAgICAgICAgIHBldEl0ZW0uZ2V0Q29tcG9uZW50KEJ0blBldCkuaW5pdCh2KTtcclxuICAgICAgICAgICAgY29udGVudDEuYWRkQ2hpbGQocGV0SXRlbSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucmV3YXJkX2xpc3QuZm9yRWFjaCgodixrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbSh2LnJld2FyZF9pZCx2LnJld2FyZF9udW0pO1xyXG4gICAgICAgICAgICBjb250ZW50Mi5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrU3VyZUJ0bigpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5wZXRfaW5mb19saXN0LmZvckVhY2goKHYsaykgPT57XHJcbiAgICAgICAgLy8gICAgUGV0TWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlbW92ZVBldCh2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXdhcmRfbGlzdC5mb3JFYWNoKCh2LGspID0+e1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0odi5yZXdhcmRfaWQsdi5yZXdhcmRfbnVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgcmV3YXJkTGlzdDpjYy5Ob2RlW10gPSBbXTtcclxuICAgICAgICB0aGlzLnJld2FyZF9saXN0LmZvckVhY2goKHYsaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY3JlYXRlUHJvcEl0ZW0odi5yZXdhcmRfaWQsdi5yZXdhcmRfbnVtKTtcclxuICAgICAgICAgICAgcmV3YXJkTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd011bHRpcGxlR2V0VGlwKHJld2FyZExpc3QsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5ZWF9GYW5nc2hlbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgLy8gRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX1NpZ25Jbik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==