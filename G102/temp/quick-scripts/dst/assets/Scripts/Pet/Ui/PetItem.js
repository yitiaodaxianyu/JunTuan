
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Pet/Ui/PetItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '59b3b4ihglGt6gVGM9Tqu+x', 'PetItem');
// Scripts/Pet/Ui/PetItem.ts

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
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("../../Hero/Game/HeroConfig");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIManager_1 = require("../../UI/UIManager");
var PetConfig_1 = require("../PetConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PetItem = /** @class */ (function (_super) {
    __extends(PetItem, _super);
    function PetItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.pet_info = null;
        _this.prop_action = PropConfig_1.PropAction.Look;
        _this.prop_price = 0;
        _this.prop_cost = PropConfig_1.PropId.Coin;
        _this.buy_callback = null;
        _this.use_callback = null;
        return _this;
    }
    PetItem.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    PetItem.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    PetItem.prototype.init = function (heroType, info, pAc) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (typeof info == "number") {
            var petInfo = new PetConfig_1.PetMessage();
            petInfo.pet_id = info;
            petInfo.pet_num = 1;
            this.pet_info = petInfo;
        }
        else {
            this.pet_info = info;
        }
        this.hero_type = heroType;
        this.prop_action = pAc;
        this.refreshData();
    };
    PetItem.prototype.refreshData = function () {
        var PM = PropManager_1.PropManager.getInstance();
        var bg = this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame = PM.getSpFrameByPropType(this.pet_info.pet_id);
        var iconSp = this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = PM.getSpByPropId(this.pet_info.pet_id);
        this.node.getComponent(cc.Button).enabled = this.prop_action != PropConfig_1.PropAction.Null;
        var star = this.node.getChildByName("star").getChildByName('star').getComponent(cc.Sprite);
        var starNum = Item_1.ItemManager.getInstance().getStar(this.pet_info.pet_id);
        if (starNum > 0) {
            star.node.active = true;
            star.spriteFrame = PropManager_1.PropManager.getInstance().getSpByName('Common_Star_' + starNum);
        }
        else {
            star.node.active = false;
        }
        var num = this.node.getChildByName("num");
        if (this.pet_info.pet_num <= 1) {
            num.active = false;
        }
        else {
            num.active = true;
        }
        num.getComponent(cc.Label).string = "" + this.pet_info.pet_num;
    };
    PetItem.prototype.onClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showEquipInfoUi(this.hero_type, this.pet_info.pet_id, this.prop_action, {
            prop_id: this.pet_info.pet_id,
            prop_num: this.pet_info.pet_num,
            prop_price: this.prop_price,
            prop_cost_id: this.prop_cost,
        }, this.buy_callback, this.use_callback);
    };
    PetItem = __decorate([
        ccclass
    ], PetItem);
    return PetItem;
}(cc.Component));
exports.default = PetItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGV0XFxVaVxcUGV0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBNEM7QUFDNUMseURBQXVEO0FBQ3ZELDZDQUFtRDtBQUNuRCxvREFBMkQ7QUFDM0Qsc0RBQXFEO0FBQ3JELDZEQUF3RDtBQUN4RCxnREFBK0M7QUFDL0MsMENBQTBDO0FBR3BDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBaUVDO1FBL0RHLGVBQVMsR0FBVyxzQkFBUyxDQUFDLElBQUksQ0FBQztRQUNuQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGlCQUFXLEdBQVksdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDdkMsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsZUFBUyxHQUFRLG1CQUFNLENBQUMsSUFBSSxDQUFDO1FBRTdCLGtCQUFZLEdBQVUsSUFBSSxDQUFDO1FBQzNCLGtCQUFZLEdBQVUsSUFBSSxDQUFDOztJQXdEL0IsQ0FBQztJQXREVSw4QkFBWSxHQUFuQixVQUFvQixRQUFpQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRU0sOEJBQVksR0FBbkIsVUFBb0IsUUFBaUI7UUFDakMsSUFBSSxDQUFDLFlBQVksR0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztJQUVELHNCQUFJLEdBQUosVUFBSyxRQUFrQixFQUFDLElBQXNCLEVBQUMsR0FBOEI7UUFBOUIsb0JBQUEsRUFBQSxNQUFlLHVCQUFVLENBQUMsSUFBSTtRQUN6RSxJQUFJLE9BQU8sSUFBSSxJQUFJLFFBQVEsRUFBQztZQUN4QixJQUFJLE9BQU8sR0FBQyxJQUFJLHNCQUFVLEVBQUUsQ0FBQztZQUM3QixPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztZQUNwQixPQUFPLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFDLE9BQU8sQ0FBQztTQUN6QjthQUFJO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFrQixDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBQyxRQUFRLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBQyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksSUFBSSxFQUFFLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckYsSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsV0FBVyxHQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxXQUFXLElBQUUsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDNUUsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekYsSUFBSSxPQUFPLEdBQUMsa0JBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxJQUFHLE9BQU8sR0FBQyxDQUFDLEVBQUM7WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEdBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEY7YUFBSTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUMxQjtRQUNELElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZDLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUUsQ0FBQyxFQUFDO1lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFBO1NBQ25CO2FBQUk7WUFDRCxHQUFHLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQTtTQUNsQjtRQUNELEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUE7SUFDOUQsQ0FBQztJQUNELHlCQUFPLEdBQVA7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDekYsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQy9CLFVBQVUsRUFBQyxJQUFJLENBQUMsVUFBVTtZQUMxQixZQUFZLEVBQUMsSUFBSSxDQUFDLFNBQVM7U0FDOUIsRUFBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBaEVnQixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBaUUzQjtJQUFELGNBQUM7Q0FqRUQsQUFpRUMsQ0FqRW9DLEVBQUUsQ0FBQyxTQUFTLEdBaUVoRDtrQkFqRW9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEhlcm9fVHlwZSB9IGZyb20gXCIuLi8uLi9IZXJvL0dhbWUvSGVyb0NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJdGVtTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL0RhdGEvSXRlbVwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFBldE1lc3NhZ2UgfSBmcm9tIFwiLi4vUGV0Q29uZmlnXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXRJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBoZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgcGV0X2luZm86UGV0TWVzc2FnZT1udWxsO1xyXG4gICAgcHJvcF9hY3Rpb246UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkxvb2s7XHJcbiAgICBwcm9wX3ByaWNlOm51bWJlcj0wO1xyXG4gICAgcHJvcF9jb3N0OlByb3BJZD1Qcm9wSWQuQ29pbjtcclxuXHJcbiAgICBidXlfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIHVzZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBhZGRCdXlMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmJ1eV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVXNlTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy51c2VfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChoZXJvVHlwZTpIZXJvX1R5cGUsaW5mbzpQZXRNZXNzYWdlfG51bWJlcixwQWM6UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkxvb2spe1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5mbyA9PSBcIm51bWJlclwiKXtcclxuICAgICAgICAgICAgbGV0IHBldEluZm89bmV3IFBldE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgcGV0SW5mby5wZXRfaWQ9aW5mbztcclxuICAgICAgICAgICAgcGV0SW5mby5wZXRfbnVtPTE7XHJcbiAgICAgICAgICAgIHRoaXMucGV0X2luZm89cGV0SW5mbztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wZXRfaW5mbz1pbmZvIGFzIFBldE1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGVyb190eXBlPWhlcm9UeXBlOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wcm9wX2FjdGlvbj1wQWM7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hEYXRhKCl7XHJcbiAgICAgICAgbGV0IFBNPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICBiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1QTS5nZXRTcEZyYW1lQnlQcm9wVHlwZSh0aGlzLnBldF9pbmZvLnBldF9pZCk7XHJcbiAgICAgICAgbGV0IGljb25TcD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpY29uU3Auc3ByaXRlRnJhbWU9UE0uZ2V0U3BCeVByb3BJZCh0aGlzLnBldF9pbmZvLnBldF9pZCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pLmVuYWJsZWQ9dGhpcy5wcm9wX2FjdGlvbiE9UHJvcEFjdGlvbi5OdWxsO1xyXG4gICAgICAgIGxldCBzdGFyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInN0YXJcIikuZ2V0Q2hpbGRCeU5hbWUoJ3N0YXInKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgc3Rhck51bT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0YXIodGhpcy5wZXRfaW5mby5wZXRfaWQpO1xyXG4gICAgICAgIGlmKHN0YXJOdW0+MCl7XHJcbiAgICAgICAgICAgIHN0YXIubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKCdDb21tb25fU3Rhcl8nK3N0YXJOdW0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFyLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKVxyXG4gICAgICAgIGlmKHRoaXMucGV0X2luZm8ucGV0X251bTw9MSl7XHJcbiAgICAgICAgICAgIG51bS5hY3RpdmU9ZmFsc2VcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbnVtLmFjdGl2ZT10cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK3RoaXMucGV0X2luZm8ucGV0X251bVxyXG4gICAgfVxyXG4gICAgb25DbGljaygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7ICAgICAgICBcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93RXF1aXBJbmZvVWkodGhpcy5oZXJvX3R5cGUsdGhpcy5wZXRfaW5mby5wZXRfaWQsdGhpcy5wcm9wX2FjdGlvbix7XHJcbiAgICAgICAgICAgIHByb3BfaWQ6IHRoaXMucGV0X2luZm8ucGV0X2lkLFxyXG4gICAgICAgICAgICBwcm9wX251bTogdGhpcy5wZXRfaW5mby5wZXRfbnVtLFxyXG4gICAgICAgICAgICBwcm9wX3ByaWNlOnRoaXMucHJvcF9wcmljZSxcclxuICAgICAgICAgICAgcHJvcF9jb3N0X2lkOnRoaXMucHJvcF9jb3N0LFxyXG4gICAgICAgIH0sdGhpcy5idXlfY2FsbGJhY2ssdGhpcy51c2VfY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==