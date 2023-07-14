
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Wish/WishingItemUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5f2a3ZXcqFL6JOb+OwGDFLi', 'WishingItemUi');
// Scripts/Wish/WishingItemUi.ts

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
exports.WishingItemState = void 0;
var GameManager_1 = require("../GameManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var Item_1 = require("../Prop/Data/Item");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WishingItemState;
(function (WishingItemState) {
    WishingItemState[WishingItemState["Close"] = 1] = "Close";
    WishingItemState[WishingItemState["Opened"] = 2] = "Opened";
    WishingItemState[WishingItemState["Openning"] = 3] = "Openning";
})(WishingItemState = exports.WishingItemState || (exports.WishingItemState = {}));
var WishingItemUi = /** @class */ (function (_super) {
    __extends(WishingItemUi, _super);
    function WishingItemUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = WishingItemState.Close;
        _this.rewardData = null;
        return _this;
    }
    WishingItemUi.prototype.initItem = function (rewardData) {
        this.rewardData = rewardData;
        this.state = WishingItemState.Close;
        if (Item_1.ItemManager.getInstance().getJsonItem(rewardData.reward_id).Type == 7) {
            // 宠物显示
            // this.node.getChildByName("Card_Font").getComponent(cc.Sprite).spriteFrame = 
            // PetManager.getInstance().getSpriteFrameByName("Sprite_Avatar_" + PetManager.getInstance().getPetId(rewardData.reward_id));
            // this.node.getChildByName("Sprite_Up_Quality_1").getComponent(cc.Sprite).spriteFrame = 
            // PetManager.getInstance().getSpriteFrameByName("Sprite_Up_Quality_" + 
            // SpiritMessageManager.getInstance().getInitialQuality(PetManager.getInstance().getPetId(rewardData.reward_id)));
            var label = this.node.getChildByName("name");
            label.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().
                getStrByTextId(Item_1.ItemManager.getInstance().getNameTextId(rewardData.reward_id));
            label.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(Item_1.ItemManager.getInstance().getQuality(rewardData.reward_id));
            // console.log("宠物前图："+"Sprite_Avatar_" + this.getPetId(rewardData.reward_id));
            // console.log("宠物质量："+"Sprite_Up_Quality_" + 
            // SpiritMessageManager.getInstance().getInitialQuality
            // (this.getPetId(rewardData.reward_id)),rewardData.reward_id);
            // console.log(this.node.getComponentInChildren(cc.Label).string,"宠物名字："+ LanguageManager.getInstance().getStrByTextId(ItemManager.getInstance().getNameTextId(rewardData.reward_id)),ItemManager.getInstance().getNameTextId(rewardData.reward_id));
        }
        else {
            // 道具显示
            this.node.getChildByName("Sprite_Up_Quality_1").active = false;
            var label = this.node.getChildByName("name");
            label.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(Item_1.ItemManager.getInstance().getNameTextId(rewardData.reward_id));
            if (Item_1.ItemManager.getInstance().getJsonItem(rewardData.reward_id).Type == 5) {
                var valueStr = 24;
                var yushu = Item_1.ItemManager.getInstance().getJsonItem(rewardData.reward_id).ItemID % 10 - 1;
                if (yushu <= 4) {
                    valueStr = Math.pow(2, yushu);
                }
                if (valueStr == 16)
                    valueStr = 24;
                label.getComponent(cc.Label).string = label.getComponent(cc.Label).string.replace('~', valueStr.toString());
                // detailStr=detailStr.replace('~',valueStr.toString());
            }
            label.color = PropManager_1.PropManager.getInstance().getPropQualityTextColor(Item_1.ItemManager.getInstance().getQuality(rewardData.reward_id));
            label.getComponent(cc.LabelOutline).color = PropManager_1.PropManager.getInstance().
                getPropQualityTextOutlineColor();
            var item = PropManager_1.PropManager.getInstance().createPropItem(rewardData.reward_id, rewardData.reward_num, PropConfig_1.PropAction.Null);
            var type = Item_1.ItemManager.getInstance().getType(rewardData.reward_id);
            if (type != 3) {
                item.getComponent(cc.Sprite).enabled = false;
            }
            else {
                item.getChildByName('bg').getComponent(cc.Sprite).enabled = false;
            }
            item.parent = this.node.getChildByName("Card_Font");
            item.scale = 1.5;
            item.setPosition(cc.v3(0, 0, 0));
        }
        this.node.getChildByName("Card_Back").on(cc.Node.EventType.TOUCH_END, this.openCard, this);
        // if(TutorailsManager.getInstance().isShowTutorials(212)){
        //     this.openCard();
        // }
    };
    WishingItemUi.prototype.openCard = function () {
        if (this.state == WishingItemState.Close) {
            this.state = WishingItemState.Openning;
            var anim = this.getComponent(cc.Animation);
            anim.enabled = true;
            GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.YX_Fanka);
            switch (Item_1.ItemManager.getInstance().getQuality(this.rewardData.reward_id)) {
                case 0:
                    anim.play("card_common");
                    break;
                case 1:
                    anim.play("card_green");
                    break;
                case 2:
                    anim.play("card_blue");
                    break;
                case 3:
                    anim.play("card_purple");
                    break;
                case 4:
                    anim.play("card_sp");
                    var backAnim = this.node.getChildByName("backEffect").getComponent(cc.Animation);
                    backAnim.enabled = true;
                    backAnim.play("card_sp_back");
                    break;
                case 5:
                    anim.play("card_red");
                    var bbackAnim = this.node.getChildByName("backEffect").getComponent(cc.Animation);
                    bbackAnim.enabled = true;
                    bbackAnim.play("card_red_back");
                    break;
            }
        }
    };
    WishingItemUi.prototype.overOpen = function () {
        this.state = WishingItemState.Opened;
    };
    WishingItemUi.prototype.showBackEffect = function () {
        var backAnim = this.node.getComponentInChildren(cc.Animation);
        backAnim.enabled = true;
        backAnim.play("car_common_back");
    };
    WishingItemUi = __decorate([
        ccclass
    ], WishingItemUi);
    return WishingItemUi;
}(cc.Component));
exports.default = WishingItemUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcV2lzaFxcV2lzaGluZ0l0ZW1VaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQXlDO0FBRXpDLG9FQUErRDtBQUcvRCwwQ0FBZ0Q7QUFDaEQsaURBQWdEO0FBQ2hELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFHL0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBWSxnQkFJWDtBQUpELFdBQVksZ0JBQWdCO0lBQ3hCLHlEQUFTLENBQUE7SUFDVCwyREFBVSxDQUFBO0lBQ1YsK0RBQVksQ0FBQTtBQUNoQixDQUFDLEVBSlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFJM0I7QUFHRDtJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQStHQztRQTdHRyxXQUFLLEdBQW9CLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUNoRCxnQkFBVSxHQUFjLElBQUksQ0FBQzs7SUE0R2pDLENBQUM7SUEzR0csZ0NBQVEsR0FBUixVQUFTLFVBQXFCO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUcsa0JBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUM7WUFDckUsT0FBTztZQUNQLCtFQUErRTtZQUMvRSw2SEFBNkg7WUFDN0gseUZBQXlGO1lBQ3pGLHdFQUF3RTtZQUN4RSxrSEFBa0g7WUFDbEgsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDNUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFF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Q0FBQyxDQUFDO1FBQzlELFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBM0dnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBK0dqQztJQUFELG9CQUFDO0NBL0dELEFBK0dDLENBL0cwQyxFQUFFLENBQUMsU0FBUyxHQStHdEQ7a0JBL0dvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR29fVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBSZXdhcmREYXRhIH0gZnJvbSBcIi4uL0pzb25EYXRhL0xldmVsSnNvbkRhdGFcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuLy8gaW1wb3J0IHsgU3Bpcml0TWVzc2FnZU1hbmFnZXIgfSBmcm9tIFwiLi4vUGV0L0RhdGEvU3Bpcml0TWVzc2FnZVwiO1xyXG5pbXBvcnQgeyBQZXRNYW5hZ2VyIH0gZnJvbSBcIi4uL1BldC9QZXRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24gfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVHV0b3JhaWxzTWFuYWdlciBmcm9tIFwiLi4vVHV0b3JpYWxzL1R1dG9yYWlsc01hbmFnZXJcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGVudW0gV2lzaGluZ0l0ZW1TdGF0ZXtcclxuICAgIENsb3NlID0gMSxcclxuICAgIE9wZW5lZCA9IDIsXHJcbiAgICBPcGVubmluZyA9IDMsXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpc2hpbmdJdGVtVWkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXRlOldpc2hpbmdJdGVtU3RhdGUgPSBXaXNoaW5nSXRlbVN0YXRlLkNsb3NlO1xyXG4gICAgcmV3YXJkRGF0YTpSZXdhcmREYXRhID0gbnVsbDtcclxuICAgIGluaXRJdGVtKHJld2FyZERhdGE6UmV3YXJkRGF0YSl7XHJcbiAgICAgICAgdGhpcy5yZXdhcmREYXRhID0gcmV3YXJkRGF0YTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gV2lzaGluZ0l0ZW1TdGF0ZS5DbG9zZTtcclxuICAgICAgICBpZihJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25JdGVtKHJld2FyZERhdGEucmV3YXJkX2lkKS5UeXBlID09IDcpe1xyXG4gICAgICAgICAgICAvLyDlrqDnianmmL7npLpcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ2FyZF9Gb250XCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gXHJcbiAgICAgICAgICAgIC8vIFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcHJpdGVGcmFtZUJ5TmFtZShcIlNwcml0ZV9BdmF0YXJfXCIgKyBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGV0SWQocmV3YXJkRGF0YS5yZXdhcmRfaWQpKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiU3ByaXRlX1VwX1F1YWxpdHlfMVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFxyXG4gICAgICAgICAgICAvLyBQZXRNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3ByaXRlRnJhbWVCeU5hbWUoXCJTcHJpdGVfVXBfUXVhbGl0eV9cIiArIFxyXG4gICAgICAgICAgICAvLyBTcGlyaXRNZXNzYWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEluaXRpYWxRdWFsaXR5KFBldE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQZXRJZChyZXdhcmREYXRhLnJld2FyZF9pZCkpKTtcclxuICAgICAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKVxyXG4gICAgICAgICAgICBsYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLlxyXG4gICAgICAgICAgICBnZXRTdHJCeVRleHRJZChJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5hbWVUZXh0SWQocmV3YXJkRGF0YS5yZXdhcmRfaWQpKVxyXG4gICAgICAgICAgICBsYWJlbC5jb2xvciA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcFF1YWxpdHlUZXh0Q29sb3JcclxuICAgICAgICAgICAgKEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eShyZXdhcmREYXRhLnJld2FyZF9pZCkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWuoOeJqeWJjeWbvu+8mlwiK1wiU3ByaXRlX0F2YXRhcl9cIiArIHRoaXMuZ2V0UGV0SWQocmV3YXJkRGF0YS5yZXdhcmRfaWQpKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLlrqDnianotKjph4/vvJpcIitcIlNwcml0ZV9VcF9RdWFsaXR5X1wiICsgXHJcbiAgICAgICAgICAgIC8vIFNwaXJpdE1lc3NhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW5pdGlhbFF1YWxpdHlcclxuICAgICAgICAgICAgLy8gKHRoaXMuZ2V0UGV0SWQocmV3YXJkRGF0YS5yZXdhcmRfaWQpKSxyZXdhcmREYXRhLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmcsXCLlrqDnianlkI3lrZfvvJpcIisgTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROYW1lVGV4dElkKHJld2FyZERhdGEucmV3YXJkX2lkKSksSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXROYW1lVGV4dElkKHJld2FyZERhdGEucmV3YXJkX2lkKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIOmBk+WFt+aYvuekulxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJTcHJpdGVfVXBfUXVhbGl0eV8xXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgbGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpXHJcbiAgICAgICAgICAgIGxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWRcclxuICAgICAgICAgICAgKEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TmFtZVRleHRJZChyZXdhcmREYXRhLnJld2FyZF9pZCkpO1xyXG4gICAgICAgICAgICBpZihJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25JdGVtKHJld2FyZERhdGEucmV3YXJkX2lkKS5UeXBlPT01KXtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZVN0cj0yNDtcclxuICAgICAgICAgICAgICAgIGxldCB5dXNodT1JdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25JdGVtKHJld2FyZERhdGEucmV3YXJkX2lkKS5JdGVtSUQlMTAtMTtcclxuICAgICAgICAgICAgICAgIGlmKHl1c2h1PD00KXtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVN0cj1NYXRoLnBvdygyLHl1c2h1KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlU3RyID09IDE2KSB2YWx1ZVN0ciA9IDI0O1xyXG4gICAgICAgICAgICAgICAgbGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcucmVwbGFjZSgnficsdmFsdWVTdHIudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBkZXRhaWxTdHI9ZGV0YWlsU3RyLnJlcGxhY2UoJ34nLHZhbHVlU3RyLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhYmVsLmNvbG9yID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRQcm9wUXVhbGl0eVRleHRDb2xvclxyXG4gICAgICAgICAgICAoSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdWFsaXR5KHJld2FyZERhdGEucmV3YXJkX2lkKSk7XHJcbiAgICAgICAgICAgIGxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5cclxuICAgICAgICAgICAgZ2V0UHJvcFF1YWxpdHlUZXh0T3V0bGluZUNvbG9yKCk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbVxyXG4gICAgICAgICAgICAocmV3YXJkRGF0YS5yZXdhcmRfaWQscmV3YXJkRGF0YS5yZXdhcmRfbnVtLFByb3BBY3Rpb24uTnVsbCk7XHJcbiAgICAgICAgICAgIGxldCB0eXBlPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0VHlwZShyZXdhcmREYXRhLnJld2FyZF9pZCk7XHJcbiAgICAgICAgICAgIGlmKHR5cGUgIT0gMyl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKCdiZycpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLnBhcmVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIkNhcmRfRm9udFwiKTtcclxuICAgICAgICAgICAgaXRlbS5zY2FsZSA9IDEuNTtcclxuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MygwLDAsMCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiQ2FyZF9CYWNrXCIpLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9wZW5DYXJkLHRoaXMpXHJcbiAgICAgICAgLy8gaWYoVHV0b3JhaWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmlzU2hvd1R1dG9yaWFscygyMTIpKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5vcGVuQ2FyZCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBvcGVuQ2FyZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdGUgPT0gV2lzaGluZ0l0ZW1TdGF0ZS5DbG9zZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBXaXNoaW5nSXRlbVN0YXRlLk9wZW5uaW5nO1xyXG4gICAgICAgICAgICBsZXQgYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbilcclxuICAgICAgICAgICAgYW5pbS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LllYX0ZhbmthKTtcclxuICAgICAgICAgICAgc3dpdGNoKEl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UXVhbGl0eSh0aGlzLnJld2FyZERhdGEucmV3YXJkX2lkKSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwiY2FyZF9jb21tb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwiY2FyZF9ncmVlblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICBhbmltLnBsYXkoXCJjYXJkX2JsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwiY2FyZF9wdXJwbGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwiY2FyZF9zcFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFja0FuaW0gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYWNrRWZmZWN0XCIpLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tBbmltLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tBbmltLnBsYXkoXCJjYXJkX3NwX2JhY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwiY2FyZF9yZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJiYWNrQW5pbSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJhY2tFZmZlY3RcIikuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYmJhY2tBbmltLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJiYWNrQW5pbS5wbGF5KFwiY2FyZF9yZWRfYmFja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvdmVyT3Blbigpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBXaXNoaW5nSXRlbVN0YXRlLk9wZW5lZDtcclxuICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNob3dCYWNrRWZmZWN0KCl7XHJcbiAgICAgICAgbGV0IGJhY2tBbmltID0gdGhpcy5ub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuQW5pbWF0aW9uKTtcclxuICAgICAgICBiYWNrQW5pbS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBiYWNrQW5pbS5wbGF5KFwiY2FyX2NvbW1vbl9iYWNrXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==