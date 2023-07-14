
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Prop/Prop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82f5dUoabtCfJx0sxQntCYK', 'Prop');
// Scripts/Prop/Prop.ts

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
var MyTool_1 = require("../Tools/MyTool");
var PropManager_1 = require("./PropManager");
var PropConfig_1 = require("../Prop/PropConfig");
var UIManager_1 = require("../UI/UIManager");
var GameManager_1 = require("../GameManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var Item_1 = require("./Data/Item");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Prop = /** @class */ (function (_super) {
    __extends(Prop, _super);
    function Prop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop_id = PropConfig_1.PropId.Coin;
        _this.prop_num = 0;
        _this.prop_action = PropConfig_1.PropAction.Null;
        _this.prop_price = 0;
        _this.prop_cost = PropConfig_1.PropId.Coin;
        _this.buy_callback = null;
        _this.use_callback = null;
        return _this;
    }
    Prop.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    Prop.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    Prop.prototype.init = function (propType, num, propAction) {
        this.prop_id = propType;
        this.prop_num = num;
        this.prop_action = propAction;
        this.refreshData();
    };
    Prop.prototype.initSaleItem = function (currencyType, price, discount) {
        if (discount === void 0) { discount = 0; }
        this.prop_price = price;
        this.prop_cost = currencyType;
        if (discount == 0) {
            this.node.getChildByName("discountBg").active = false;
            this.node.getChildByName("discountNum").active = false;
            this.node.getChildByName("discount").active = false;
        }
        else {
            this.node.getChildByName("discountNum").getComponent(cc.Label).string = "" + discount + "%";
        }
        this.node.getChildByName("priceIcon").getComponent(cc.Sprite).spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(currencyType);
        this.node.getChildByName("price").getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(price);
    };
    Prop.prototype.soldOut = function () {
        this.node.getComponent(cc.Button).interactable = false;
        this.node.getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("discountBg").active = false;
        this.node.getChildByName("discountNum").active = false;
        this.node.getChildByName("discount").active = false;
        this.node.getChildByName("priceIcon").active = false;
        this.node.getChildByName("priceTitleBg").active = false;
        this.node.getChildByName("price").active = false;
        this.node.getChildByName("shop_Bg_SoldOut").active = true;
        this.node.getChildByName("saleOut").active = true;
    };
    Prop.prototype.refreshData = function () {
        var num = this.node.getChildByName('num');
        num.getComponent(cc.Label).string = MyTool_1.default.getCoinDanwei(this.prop_num);
        num.active = this.prop_num != 0;
        //设置框的图片
        var sp = this.node.getComponent(cc.Sprite);
        sp.spriteFrame = PropManager_1.PropManager.getInstance().getSpFrameByPropType(this.prop_id);
        //设置icon图片
        var iconSp = this.node.getChildByName("mask").getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = PropManager_1.PropManager.getInstance().getSpByPropId(Item_1.ItemManager.getInstance().getQuoteIcon(this.prop_id));
    };
    Prop.prototype.onClick = function () {
        var _this = this;
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.prop_action == PropConfig_1.PropAction.Null) {
            return;
        }
        UIManager_1.UIManager.getInstance().showPropInfo({
            onClose: function () {
                if (_this.prop_action == PropConfig_1.PropAction.Use) {
                    var newNum = PropManager_1.PropManager.getInstance().getPropNum(_this.prop_id);
                    if (newNum != _this.prop_num) {
                        _this.init(_this.prop_id, newNum, _this.prop_action);
                    }
                }
            },
        }, this.prop_action, {
            prop_id: this.prop_id,
            prop_num: this.prop_num,
            prop_price: this.prop_price,
            prop_cost_id: this.prop_cost,
        }, this.buy_callback, this.use_callback);
    };
    Prop = __decorate([
        ccclass
    ], Prop);
    return Prop;
}(cc.Component));
exports.default = Prop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUHJvcFxcUHJvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBcUM7QUFDckMsNkNBQTRDO0FBQzVDLGlEQUF3RDtBQUN4RCw2Q0FBNEM7QUFDNUMsOENBQXlDO0FBQ3pDLDBEQUFxRDtBQUNyRCxvQ0FBMEM7QUFHcEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUF3RkM7UUF0RkcsYUFBTyxHQUFRLG1CQUFNLENBQUMsSUFBSSxDQUFDO1FBQzNCLGNBQVEsR0FBUSxDQUFDLENBQUM7UUFDbEIsaUJBQVcsR0FBWSx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUN2QyxnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQixlQUFTLEdBQVEsbUJBQU0sQ0FBQyxJQUFJLENBQUM7UUFFN0Isa0JBQVksR0FBVSxJQUFJLENBQUM7UUFDM0Isa0JBQVksR0FBVSxJQUFJLENBQUM7O0lBK0UvQixDQUFDO0lBN0VVLDJCQUFZLEdBQW5CLFVBQW9CLFFBQWlCO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFTSwyQkFBWSxHQUFuQixVQUFvQixRQUFpQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRUQsbUJBQUksR0FBSixVQUFLLFFBQWUsRUFBQyxHQUFVLEVBQUMsVUFBcUI7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwyQkFBWSxHQUFaLFVBQWEsWUFBbUIsRUFBQyxLQUFZLEVBQUMsUUFBaUI7UUFBakIseUJBQUEsRUFBQSxZQUFpQjtRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFDLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFDLFlBQVksQ0FBQztRQUM1QixJQUFHLFFBQVEsSUFBSSxDQUFDLEVBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN2RDthQUFJO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUM7U0FDL0Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsR0FBRyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRUQsc0JBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDaEosSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEQsQ0FBQztJQUVELDBCQUFXLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsZ0JBQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxDQUFDLENBQUM7UUFDNUIsUUFBUTtRQUNSLElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsV0FBVyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLFVBQVU7UUFDVixJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRixNQUFNLENBQUMsV0FBVyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLGtCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3JILENBQUM7SUFFRCxzQkFBTyxHQUFQO1FBQUEsaUJBc0JDO1FBckJHLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBFLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBRSx1QkFBVSxDQUFDLElBQUksRUFDcEM7WUFDSSxPQUFPO1NBQ1Y7UUFDRCxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNqQyxPQUFPLEVBQUM7Z0JBQ0osSUFBRyxLQUFJLENBQUMsV0FBVyxJQUFFLHVCQUFVLENBQUMsR0FBRyxFQUFDO29CQUNoQyxJQUFJLE1BQU0sR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzlELElBQUcsTUFBTSxJQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUM7d0JBQ3JCLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRDtpQkFDSjtZQUNMLENBQUM7U0FDSixFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDZixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBQyxJQUFJLENBQUMsVUFBVTtZQUMxQixZQUFZLEVBQUMsSUFBSSxDQUFDLFNBQVM7U0FDOUIsRUFBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBdkZnQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBd0Z4QjtJQUFELFdBQUM7Q0F4RkQsQUF3RkMsQ0F4RmlDLEVBQUUsQ0FBQyxTQUFTLEdBd0Y3QztrQkF4Rm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTXlUb29sIGZyb20gXCIuLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wQWN0aW9uLCBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gXCIuLi9VSS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9JdGVtXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcm9wX2lkOlByb3BJZD1Qcm9wSWQuQ29pbjtcclxuICAgIHByb3BfbnVtOm51bWJlcj0wO1xyXG4gICAgcHJvcF9hY3Rpb246UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLk51bGw7XHJcbiAgICBwcm9wX3ByaWNlOm51bWJlcj0wO1xyXG4gICAgcHJvcF9jb3N0OlByb3BJZD1Qcm9wSWQuQ29pbjtcclxuXHJcbiAgICBidXlfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuICAgIHVzZV9jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBhZGRCdXlMaXN0ZW4oY2FsbGJhY2s6RnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLmJ1eV9jYWxsYmFjaz1jYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVXNlTGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy51c2VfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChwcm9wVHlwZTpQcm9wSWQsbnVtOm51bWJlcixwcm9wQWN0aW9uOlByb3BBY3Rpb24pIHtcclxuICAgICAgICB0aGlzLnByb3BfaWQ9cHJvcFR5cGU7XHJcbiAgICAgICAgdGhpcy5wcm9wX251bT1udW07XHJcbiAgICAgICAgdGhpcy5wcm9wX2FjdGlvbj1wcm9wQWN0aW9uOyAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVmcmVzaERhdGEoKTsgXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFNhbGVJdGVtKGN1cnJlbmN5VHlwZTpQcm9wSWQscHJpY2U6bnVtYmVyLGRpc2NvdW50Om51bWJlcj0wKXtcclxuICAgICAgICB0aGlzLnByb3BfcHJpY2U9cHJpY2U7XHJcbiAgICAgICAgdGhpcy5wcm9wX2Nvc3Q9Y3VycmVuY3lUeXBlO1xyXG4gICAgICAgIGlmKGRpc2NvdW50ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNjb3VudEJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNjb3VudE51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZGlzY291bnRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpc2NvdW50TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIGRpc2NvdW50ICsgXCIlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByaWNlSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChjdXJyZW5jeVR5cGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByaWNlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkocHJpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHNvbGRPdXQoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS5nZXRDaGlsZEJ5TmFtZShcImljb25cIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc2V0TWF0ZXJpYWwoMCxjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoXCIyZC1ncmF5LXNwcml0ZVwiKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZGlzY291bnRCZ1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNjb3VudE51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNjb3VudFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZUljb25cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJpY2VUaXRsZUJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByaWNlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNob3BfQmdfU29sZE91dFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNhbGVPdXRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVmcmVzaERhdGEoKXtcclxuICAgICAgICBsZXQgbnVtPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbnVtJyk7XHJcbiAgICAgICAgbnVtLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPU15VG9vbC5nZXRDb2luRGFud2VpKHRoaXMucHJvcF9udW0pO1xyXG4gICAgICAgIG51bS5hY3RpdmU9dGhpcy5wcm9wX251bSE9MDtcclxuICAgICAgICAvL+iuvue9ruahhueahOWbvueJh1xyXG4gICAgICAgIGxldCBzcD10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgc3Auc3ByaXRlRnJhbWU9UHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTcEZyYW1lQnlQcm9wVHlwZSh0aGlzLnByb3BfaWQpO1xyXG4gICAgICAgIC8v6K6+572uaWNvbuWbvueJh1xyXG4gICAgICAgIGxldCBpY29uU3A9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFza1wiKS5nZXRDaGlsZEJ5TmFtZSgnaWNvbicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGljb25TcC5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlQcm9wSWQoSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRRdW90ZUljb24odGhpcy5wcm9wX2lkKSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLnByb3BfYWN0aW9uPT1Qcm9wQWN0aW9uLk51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dQcm9wSW5mbyh7XHJcbiAgICAgICAgICAgIG9uQ2xvc2U6KCk9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucHJvcF9hY3Rpb249PVByb3BBY3Rpb24uVXNlKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3TnVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bSh0aGlzLnByb3BfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld051bSE9dGhpcy5wcm9wX251bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCh0aGlzLnByb3BfaWQsbmV3TnVtLHRoaXMucHJvcF9hY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LHRoaXMucHJvcF9hY3Rpb24se1xyXG4gICAgICAgICAgICBwcm9wX2lkOiB0aGlzLnByb3BfaWQsXHJcbiAgICAgICAgICAgIHByb3BfbnVtOiB0aGlzLnByb3BfbnVtLFxyXG4gICAgICAgICAgICBwcm9wX3ByaWNlOnRoaXMucHJvcF9wcmljZSxcclxuICAgICAgICAgICAgcHJvcF9jb3N0X2lkOnRoaXMucHJvcF9jb3N0LFxyXG4gICAgICAgIH0sdGhpcy5idXlfY2FsbGJhY2ssdGhpcy51c2VfY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==