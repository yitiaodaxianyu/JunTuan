
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Equipment/Ui/EquipItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '14b9bsKPLtGi7ZNHSSVk0/c', 'EquipItem');
// Scripts/Equipment/Ui/EquipItem.ts

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
var MyTool_1 = require("../../Tools/MyTool");
var UIManager_1 = require("../../UI/UIManager");
var EquipmentAttribute_1 = require("../Data/EquipmentAttribute");
var EquipConfig_1 = require("../EquipConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EquipItem = /** @class */ (function (_super) {
    __extends(EquipItem, _super);
    function EquipItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hero_type = HeroConfig_1.Hero_Type.NULL;
        _this.equip_info = null;
        _this.prop_action = PropConfig_1.PropAction.Look;
        _this.prop_price = 0;
        _this.prop_cost = PropConfig_1.PropId.Coin;
        _this.buy_callback = null;
        _this.use_callback = null;
        return _this;
    }
    EquipItem.prototype.addBuyListen = function (callback) {
        this.buy_callback = callback;
    };
    EquipItem.prototype.addUseListen = function (callback) {
        this.use_callback = callback;
    };
    EquipItem.prototype.init = function (heroType, info, pAc) {
        if (pAc === void 0) { pAc = PropConfig_1.PropAction.Look; }
        if (typeof info == "number") {
            var equipInfo = new EquipConfig_1.EquipInfo();
            equipInfo.equip_id = info;
            equipInfo.equip_num = 1;
            this.equip_info = equipInfo;
        }
        else {
            this.equip_info = info;
        }
        this.hero_type = heroType;
        this.prop_action = pAc;
        this.refreshData();
    };
    EquipItem.prototype.initSaleItem = function (currencyType, price, discount) {
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
    EquipItem.prototype.soldOut = function () {
        this.node.getComponent(cc.Button).interactable = false;
        this.node.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("bg").getComponent(cc.Sprite).setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("discountBg").active = false;
        this.node.getChildByName("discountNum").active = false;
        this.node.getChildByName("discount").active = false;
        this.node.getChildByName("priceIcon").active = false;
        this.node.getChildByName("priceTitleBg").active = false;
        this.node.getChildByName("price").active = false;
        this.node.getChildByName("shop_Bg_SoldOut").active = true;
        this.node.getChildByName("saleOut").active = true;
    };
    EquipItem.prototype.refreshData = function () {
        var EAM = EquipmentAttribute_1.EquipmentAttributeManager.getInstance();
        var PM = PropManager_1.PropManager.getInstance();
        var bg = this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame = PM.getSpFrameByPropType(this.equip_info.equip_id);
        var iconSp = this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame = PM.getSpByPropId(this.equip_info.equip_id);
        this.node.getComponent(cc.Button).enabled = this.prop_action != PropConfig_1.PropAction.Null;
        var star = this.node.getChildByName("star").getChildByName('star').getComponent(cc.Sprite);
        var starNum = Item_1.ItemManager.getInstance().getStar(this.equip_info.equip_id);
        if (starNum > 0) {
            star.node.active = true;
            star.spriteFrame = PropManager_1.PropManager.getInstance().getSpByName('Common_Star_' + starNum);
        }
        else {
            star.node.active = false;
        }
        var num = this.node.getChildByName("num");
        if (this.equip_info.equip_num <= 1) {
            num.active = false;
        }
        else {
            num.active = true;
        }
        num.getComponent(cc.Label).string = "" + this.equip_info.equip_num;
    };
    EquipItem.prototype.onClick = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        UIManager_1.UIManager.getInstance().showEquipInfoUi(this.hero_type, this.equip_info.equip_id, this.prop_action, {
            prop_id: this.equip_info.equip_id,
            prop_num: this.equip_info.equip_num,
            prop_price: this.prop_price,
            prop_cost_id: this.prop_cost,
        }, this.buy_callback, this.use_callback);
    };
    EquipItem = __decorate([
        ccclass
    ], EquipItem);
    return EquipItem;
}(cc.Component));
exports.default = EquipItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcRXF1aXBtZW50XFxVaVxcRXF1aXBJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUE0QztBQUM1Qyx5REFBdUQ7QUFDdkQsNkNBQW1EO0FBQ25ELG9EQUFxRTtBQUNyRSxzREFBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELDZDQUF3QztBQUN4QyxnREFBK0M7QUFDL0MsaUVBQXVFO0FBQ3ZFLDhDQUEyQztBQUdyQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQStGQztRQTdGRyxlQUFTLEdBQVcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7UUFDbkMsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsaUJBQVcsR0FBWSx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUN2QyxnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQixlQUFTLEdBQVEsbUJBQU0sQ0FBQyxJQUFJLENBQUM7UUFFN0Isa0JBQVksR0FBVSxJQUFJLENBQUM7UUFDM0Isa0JBQVksR0FBVSxJQUFJLENBQUM7O0lBc0YvQixDQUFDO0lBcEZVLGdDQUFZLEdBQW5CLFVBQW9CLFFBQWlCO1FBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFTSxnQ0FBWSxHQUFuQixVQUFvQixRQUFpQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRUQsd0JBQUksR0FBSixVQUFLLFFBQWtCLEVBQUMsSUFBcUIsRUFBQyxHQUE4QjtRQUE5QixvQkFBQSxFQUFBLE1BQWUsdUJBQVUsQ0FBQyxJQUFJO1FBQ3hFLElBQUksT0FBTyxJQUFJLElBQUksUUFBUSxFQUFDO1lBQ3hCLElBQUksU0FBUyxHQUFDLElBQUks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RUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDO1lBQzdGLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7WUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUztZQUNuQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFVBQVU7WUFDMUIsWUFBWSxFQUFDLElBQUksQ0FBQyxTQUFTO1NBQzlCLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQTlGZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQStGN0I7SUFBRCxnQkFBQztDQS9GRCxBQStGQyxDQS9Gc0MsRUFBRSxDQUFDLFNBQVMsR0ErRmxEO2tCQS9Gb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSGVyb19UeXBlIH0gZnJvbSBcIi4uLy4uL0hlcm8vR2FtZS9IZXJvQ29uZmlnXCI7XHJcbmltcG9ydCB7IEl0ZW1NYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvRGF0YS9JdGVtXCI7XHJcbmltcG9ydCB7IFByb3BBY3Rpb24sIFByb3BEYXRhLCBQcm9wSWQgfSBmcm9tIFwiLi4vLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7IFByb3BNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuLi8uLi9Tb3VuZC9BdWRpb0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXlUb29sIGZyb20gXCIuLi8uLi9Ub29scy9NeVRvb2xcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyIH0gZnJvbSBcIi4uL0RhdGEvRXF1aXBtZW50QXR0cmlidXRlXCI7XHJcbmltcG9ydCB7IEVxdWlwSW5mbyB9IGZyb20gXCIuLi9FcXVpcENvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXF1aXBJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBoZXJvX3R5cGU6SGVyb19UeXBlPUhlcm9fVHlwZS5OVUxMO1xyXG4gICAgZXF1aXBfaW5mbzpFcXVpcEluZm89bnVsbDtcclxuICAgIHByb3BfYWN0aW9uOlByb3BBY3Rpb249UHJvcEFjdGlvbi5Mb29rO1xyXG4gICAgcHJvcF9wcmljZTpudW1iZXI9MDtcclxuICAgIHByb3BfY29zdDpQcm9wSWQ9UHJvcElkLkNvaW47XHJcblxyXG4gICAgYnV5X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICB1c2VfY2FsbGJhY2s6RnVuY3Rpb249bnVsbDtcclxuXHJcbiAgICBwdWJsaWMgYWRkQnV5TGlzdGVuKGNhbGxiYWNrOkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5idXlfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFVzZUxpc3RlbihjYWxsYmFjazpGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMudXNlX2NhbGxiYWNrPWNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoaGVyb1R5cGU6SGVyb19UeXBlLGluZm86RXF1aXBJbmZvfG51bWJlcixwQWM6UHJvcEFjdGlvbj1Qcm9wQWN0aW9uLkxvb2spe1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5mbyA9PSBcIm51bWJlclwiKXtcclxuICAgICAgICAgICAgbGV0IGVxdWlwSW5mbz1uZXcgRXF1aXBJbmZvKCk7XHJcbiAgICAgICAgICAgIGVxdWlwSW5mby5lcXVpcF9pZD1pbmZvO1xyXG4gICAgICAgICAgICBlcXVpcEluZm8uZXF1aXBfbnVtPTE7XHJcbiAgICAgICAgICAgIHRoaXMuZXF1aXBfaW5mbz1lcXVpcEluZm87XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZXF1aXBfaW5mbz1pbmZvIGFzIEVxdWlwSW5mbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZXJvX3R5cGU9aGVyb1R5cGU7ICAgICAgICBcclxuICAgICAgICB0aGlzLnByb3BfYWN0aW9uPXBBYztcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFNhbGVJdGVtKGN1cnJlbmN5VHlwZTpQcm9wSWQscHJpY2U6bnVtYmVyLGRpc2NvdW50Om51bWJlcj0wKXtcclxuICAgICAgICB0aGlzLnByb3BfcHJpY2U9cHJpY2U7XHJcbiAgICAgICAgdGhpcy5wcm9wX2Nvc3Q9Y3VycmVuY3lUeXBlO1xyXG4gICAgICAgIGlmKGRpc2NvdW50ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNjb3VudEJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNjb3VudE51bVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZGlzY291bnRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpc2NvdW50TnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJcIiArIGRpc2NvdW50ICsgXCIlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByaWNlSWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IFByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVByb3BJZChjdXJyZW5jeVR5cGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByaWNlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gTXlUb29sLmdldENvaW5EYW53ZWkocHJpY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHNvbGRPdXQoKXtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaWNvblwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zZXRNYXRlcmlhbCgwLGNjLk1hdGVyaWFsLmdldEJ1aWx0aW5NYXRlcmlhbChcIjJkLWdyYXktc3ByaXRlXCIpKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkaXNjb3VudEJnXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpc2NvdW50TnVtXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImRpc2NvdW50XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInByaWNlSWNvblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwcmljZVRpdGxlQmdcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicHJpY2VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2hvcF9CZ19Tb2xkT3V0XCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2FsZU91dFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hEYXRhKCl7XHJcbiAgICAgICAgbGV0IEVBTT1FcXVpcG1lbnRBdHRyaWJ1dGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IFBNPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGJnPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmcnKTtcclxuICAgICAgICBiZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1QTS5nZXRTcEZyYW1lQnlQcm9wVHlwZSh0aGlzLmVxdWlwX2luZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIGxldCBpY29uU3A9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdpY29uJykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgaWNvblNwLnNwcml0ZUZyYW1lPVBNLmdldFNwQnlQcm9wSWQodGhpcy5lcXVpcF9pbmZvLmVxdWlwX2lkKTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuZW5hYmxlZD10aGlzLnByb3BfYWN0aW9uIT1Qcm9wQWN0aW9uLk51bGw7XHJcbiAgICAgICAgbGV0IHN0YXI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic3RhclwiKS5nZXRDaGlsZEJ5TmFtZSgnc3RhcicpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGxldCBzdGFyTnVtPUl0ZW1NYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3Rhcih0aGlzLmVxdWlwX2luZm8uZXF1aXBfaWQpO1xyXG4gICAgICAgIGlmKHN0YXJOdW0+MCl7XHJcbiAgICAgICAgICAgIHN0YXIubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgc3Rhci5zcHJpdGVGcmFtZT1Qcm9wTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwQnlOYW1lKCdDb21tb25fU3Rhcl8nK3N0YXJOdW0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdGFyLm5vZGUuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbnVtPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKVxyXG4gICAgICAgIGlmKHRoaXMuZXF1aXBfaW5mby5lcXVpcF9udW08PTEpe1xyXG4gICAgICAgICAgICBudW0uYWN0aXZlPWZhbHNlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG51bS5hY3RpdmU9dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBudW0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCJcIit0aGlzLmVxdWlwX2luZm8uZXF1aXBfbnVtXHJcbiAgICB9XHJcbiAgICBvbkNsaWNrKCl7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICAgICAgIFxyXG4gICAgICAgIFVJTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNob3dFcXVpcEluZm9VaSh0aGlzLmhlcm9fdHlwZSx0aGlzLmVxdWlwX2luZm8uZXF1aXBfaWQsdGhpcy5wcm9wX2FjdGlvbix7XHJcbiAgICAgICAgICAgIHByb3BfaWQ6IHRoaXMuZXF1aXBfaW5mby5lcXVpcF9pZCxcclxuICAgICAgICAgICAgcHJvcF9udW06IHRoaXMuZXF1aXBfaW5mby5lcXVpcF9udW0sXHJcbiAgICAgICAgICAgIHByb3BfcHJpY2U6dGhpcy5wcm9wX3ByaWNlLFxyXG4gICAgICAgICAgICBwcm9wX2Nvc3RfaWQ6dGhpcy5wcm9wX2Nvc3QsXHJcbiAgICAgICAgfSx0aGlzLmJ1eV9jYWxsYmFjayx0aGlzLnVzZV9jYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuIl19