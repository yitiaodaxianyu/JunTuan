
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/copy/endlesschallenges/Shop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '547d0X6bHhGXKy71q2GNdOz', 'Shop');
// Scripts/copy/endlesschallenges/Shop.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var LanguageManager_1 = require("../../multiLanguage/LanguageManager");
var TextLanguage_1 = require("../../multiLanguage/TextLanguage");
var Item_1 = require("../../Prop/Data/Item");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var RogueShop_1 = require("./RogueShop");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Shop = /** @class */ (function (_super) {
    __extends(Shop, _super);
    function Shop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null; //物品的父节点
        _this.num = null; //虚空金币的数量
        _this.Maze_Shop_Bg_1 = null; //虚空商品的预制体
        _this.item = []; //生成的节点
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    Shop.prototype.initUi = function () {
        var _this = this;
        var max = RogueShop_1.RogueShopManager.getMaxShowLoacl();
        this.Refresh();
        var _loop_1 = function (index) {
            var id = index + 1;
            var myitem = cc.instantiate(this_1.Maze_Shop_Bg_1);
            var name = myitem.getChildByName("name");
            var num = myitem.getChildByName("num");
            var item = myitem.getChildByName("item");
            var prop_id = RogueShop_1.RogueShopManager.getInstance().getProp_ID(id);
            num.getComponent(cc.Label).string = "" + RogueShop_1.RogueShopManager.getInstance().getCostNum(id);
            name.getComponent(TextLanguage_1.default).setTextId(Item_1.ItemManager.getInstance().getNameTextId(prop_id));
            var itemnode = PropManager_1.PropManager.getInstance().createPropItem(prop_id, RogueShop_1.RogueShopManager.getInstance().getProp_Num(id));
            itemnode.scale = 0.6;
            itemnode.parent = item;
            myitem.on(cc.Node.EventType.TOUCH_END, (function () {
                _this.clickBtnitem(id);
            }), this_1);
            myitem.active = true;
            myitem.parent = this_1.content;
            this_1.item.push(myitem);
        };
        var this_1 = this;
        for (var index = this.item.length; index < max; index++) {
            _loop_1(index);
        }
    };
    Shop.prototype.clickBtnitem = function (id) {
        var MazeCoin = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.MazeCoin);
        var CostNum = RogueShop_1.RogueShopManager.getInstance().getCostNum(id);
        if (MazeCoin >= CostNum) {
            // 可以购买
            var prop_id = RogueShop_1.RogueShopManager.getInstance().getProp_ID(id);
            var Prop_Num = RogueShop_1.RogueShopManager.getInstance().getProp_Num(id);
            var itemnode = PropManager_1.PropManager.getInstance().createPropItem(prop_id, Prop_Num);
            PropManager_1.PropManager.getInstance().changePropNum(prop_id, Prop_Num);
            GameManager_1.default.getInstance().showGetTip(itemnode);
            // MazeCoin-=CostNum
            PropManager_1.PropManager.getInstance().changePropNum(PropConfig_1.PropId.MazeCoin, -CostNum);
            this.Refresh();
        }
        else {
            // 虚空裂缝金币不足
            GameManager_1.default.getInstance().showMessage(LanguageManager_1.default.getInstance().getStrByTextId(830030), 3);
        }
    };
    Shop.prototype.Refresh = function () {
        var MazeCoin = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.MazeCoin);
        this.num.getComponent(cc.Label).string = "" + MazeCoin;
    };
    Shop.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], Shop.prototype, "content", void 0);
    __decorate([
        property(cc.Node)
    ], Shop.prototype, "num", void 0);
    __decorate([
        property(cc.Node)
    ], Shop.prototype, "Maze_Shop_Bg_1", void 0);
    Shop = __decorate([
        ccclass
    ], Shop);
    return Shop;
}(UIComponent_1.default));
exports.default = Shop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcY29weVxcZW5kbGVzc2NoYWxsZW5nZXNcXFNob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBQzVDLHVFQUFrRTtBQUNsRSxpRUFBNEQ7QUFDNUQsNkNBQW1EO0FBQ25ELG9EQUErQztBQUMvQyxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELG9EQUErQztBQUMvQyx5Q0FBK0M7QUFFekMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVc7SUFBN0M7UUFBQSxxRUFxRUM7UUFuRUcsYUFBTyxHQUFZLElBQUksQ0FBQSxDQUFBLFFBQVE7UUFFL0IsU0FBRyxHQUFZLElBQUksQ0FBQSxDQUFBLFNBQVM7UUFFNUIsb0JBQWMsR0FBWSxJQUFJLENBQUEsQ0FBQSxVQUFVO1FBRXhDLFVBQUksR0FBVyxFQUFFLENBQUEsQ0FBQSxPQUFPOztRQW9EeEIsd0JBQXdCO1FBRXhCLGVBQWU7UUFFZixhQUFhO1FBRWIsSUFBSTtRQUVKLGlCQUFpQjtJQUNyQixDQUFDO0lBNURHLHFCQUFNLEdBQU47UUFBQSxpQkF1QkM7UUF0QkcsSUFBSSxHQUFHLEdBQUMsNEJBQWdCLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dDQUNMLEtBQUs7WUFDVixJQUFJLEVBQUUsR0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO1lBQ2QsSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFLLGNBQWMsQ0FBQyxDQUFBO1lBQzlDLElBQUksSUFBSSxHQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDdEMsSUFBSSxHQUFHLEdBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNwQyxJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3RDLElBQUksT0FBTyxHQUFDLDRCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN6RCxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLDRCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNsRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsa0JBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtZQUMzRixJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsNEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUcsUUFBUSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUE7WUFDbEIsUUFBUSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7WUFDcEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN6QixDQUFDLENBQUMsU0FBTSxDQUFDO1lBQ1QsTUFBTSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUE7WUFFbEIsTUFBTSxDQUFDLE1BQU0sR0FBQyxPQUFLLE9BQU8sQ0FBQTtZQUMxQixPQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7OztRQWxCMUIsS0FBSyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRTtvQkFBOUMsS0FBSztTQW1CYjtJQUNMLENBQUM7SUFDRCwyQkFBWSxHQUFaLFVBQWEsRUFBRTtRQUNYLElBQUksUUFBUSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLG1CQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsSUFBSSxPQUFPLEdBQUMsNEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3pELElBQUcsUUFBUSxJQUFFLE9BQU8sRUFBQztZQUNqQixPQUFPO1lBQ1AsSUFBSSxPQUFPLEdBQUMsNEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3pELElBQUksUUFBUSxHQUFFLDRCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUM1RCxJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEUseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFELHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLG9CQUFvQjtZQUNwQix5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxDQUFDLFFBQVEsRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNqQjthQUFJO1lBQ0QsV0FBVztZQUNYLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pHO0lBQ0wsQ0FBQztJQUNELHNCQUFPLEdBQVA7UUFDSSxJQUFJLFFBQVEsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLFFBQVEsQ0FBQTtJQUN0RCxDQUFDO0lBQ0QsNEJBQWEsR0FBYjtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBekREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eUNBQ0s7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxQ0FDQztJQUVuQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNZO0lBTmIsSUFBSTtRQUR4QixPQUFPO09BQ2EsSUFBSSxDQXFFeEI7SUFBRCxXQUFDO0NBckVELEFBcUVDLENBckVpQyxxQkFBVyxHQXFFNUM7a0JBckVvQixJQUFJIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgVGV4dExhbmd1YWdlIGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL1RleHRMYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBJdGVtTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Qcm9wL0RhdGEvSXRlbVwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgVUlDb21wb25lbnQgZnJvbSBcIi4uLy4uL1VJL1VJQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJvZ3VlU2hvcE1hbmFnZXIgfSBmcm9tIFwiLi9Sb2d1ZVNob3BcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50OiBjYy5Ob2RlID0gbnVsbC8v54mp5ZOB55qE54i26IqC54K5XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG51bTogY2MuTm9kZSA9IG51bGwvL+iZmuepuumHkeW4geeahOaVsOmHj1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBNYXplX1Nob3BfQmdfMTogY2MuTm9kZSA9IG51bGwvL+iZmuepuuWVhuWTgeeahOmihOWItuS9k1xyXG4gICAgXHJcbiAgICBpdGVtOmNjLk5vZGVbXT1bXS8v55Sf5oiQ55qE6IqC54K5XHJcbiAgICBpbml0VWkoKSB7Ly/omZrnqbroo4LnvJ1cclxuICAgICAgICBsZXQgbWF4PVJvZ3VlU2hvcE1hbmFnZXIuZ2V0TWF4U2hvd0xvYWNsKClcclxuICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gdGhpcy5pdGVtLmxlbmd0aDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IGlkPWluZGV4KzFcclxuICAgICAgICAgICAgbGV0IG15aXRlbT1jYy5pbnN0YW50aWF0ZSh0aGlzLk1hemVfU2hvcF9CZ18xKVxyXG4gICAgICAgICAgICBsZXQgbmFtZT1teWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpXHJcbiAgICAgICAgICAgIGxldCBudW09bXlpdGVtLmdldENoaWxkQnlOYW1lKFwibnVtXCIpXHJcbiAgICAgICAgICAgIGxldCBpdGVtPW15aXRlbS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1cIilcclxuICAgICAgICAgICAgbGV0IHByb3BfaWQ9Um9ndWVTaG9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BfSUQoaWQpXHJcbiAgICAgICAgICAgIG51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK1JvZ3VlU2hvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb3N0TnVtKGlkKVxyXG4gICAgICAgICAgICBuYW1lLmdldENvbXBvbmVudChUZXh0TGFuZ3VhZ2UpLnNldFRleHRJZChJdGVtTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE5hbWVUZXh0SWQocHJvcF9pZCkpXHJcbiAgICAgICAgICAgIGxldCBpdGVtbm9kZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHByb3BfaWQsUm9ndWVTaG9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BfTnVtKGlkKSk7XHJcbiAgICAgICAgICAgIGl0ZW1ub2RlLnNjYWxlPTAuNlxyXG4gICAgICAgICAgICBpdGVtbm9kZS5wYXJlbnQ9aXRlbVxyXG4gICAgICAgICAgICBteWl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0J0bml0ZW0oaWQpICAgXHJcbiAgICAgICAgICAgIH0pLHRoaXMpO1xyXG4gICAgICAgICAgICBteWl0ZW0uYWN0aXZlPXRydWVcclxuXHJcbiAgICAgICAgICAgIG15aXRlbS5wYXJlbnQ9dGhpcy5jb250ZW50XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbS5wdXNoKG15aXRlbSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGlja0J0bml0ZW0oaWQpe1xyXG4gICAgICAgIGxldCBNYXplQ29pbj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLk1hemVDb2luKTtcclxuICAgICAgICBsZXQgQ29zdE51bT1Sb2d1ZVNob3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q29zdE51bShpZClcclxuICAgICAgICBpZihNYXplQ29pbj49Q29zdE51bSl7XHJcbiAgICAgICAgICAgIC8vIOWPr+S7pei0reS5sFxyXG4gICAgICAgICAgICBsZXQgcHJvcF9pZD1Sb2d1ZVNob3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcF9JRChpZClcclxuICAgICAgICAgICAgbGV0IFByb3BfTnVtID1Sb2d1ZVNob3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcF9OdW0oaWQpXHJcbiAgICAgICAgICAgIGxldCBpdGVtbm9kZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNyZWF0ZVByb3BJdGVtKHByb3BfaWQsUHJvcF9OdW0pO1xyXG4gICAgICAgICAgICBQcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNoYW5nZVByb3BOdW0ocHJvcF9pZCxQcm9wX051bSk7XHJcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc2hvd0dldFRpcChpdGVtbm9kZSk7XHJcbiAgICAgICAgICAgIC8vIE1hemVDb2luLT1Db3N0TnVtXHJcbiAgICAgICAgICAgIFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuY2hhbmdlUHJvcE51bShQcm9wSWQuTWF6ZUNvaW4sLUNvc3ROdW0pO1xyXG4gICAgICAgICAgICB0aGlzLlJlZnJlc2goKVxyXG4gICAgICAgIH1lbHNleyAgXHJcbiAgICAgICAgICAgIC8vIOiZmuepuuijgue8nemHkeW4geS4jei2s1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dNZXNzYWdlKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgzMDAzMCksMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUmVmcmVzaCgpe1xyXG4gICAgICAgIGxldCBNYXplQ29pbj1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFByb3BOdW0oUHJvcElkLk1hemVDb2luKTtcclxuICAgICAgICB0aGlzLm51bS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1cIlwiK01hemVDb2luXHJcbiAgICB9XHJcbiAgICBjbGlja0J0bkNsb3NlKCkvL+WFs+mXrVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICAvLyBzdGFydCAoKSB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19