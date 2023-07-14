
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/AccumulatedRecharge/AccumulatedRechargeUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d22av3ac1BWLqh/voWp9OK', 'AccumulatedRechargeUi');
// Scripts/AccumulatedRecharge/AccumulatedRechargeUi.ts

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
var Item_1 = require("../Prop/Data/Item");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var EventManager_1 = require("../Tools/EventManager");
var UIComponent_1 = require("../UI/UIComponent");
var AccumulatedRechargeItem_1 = require("./AccumulatedRechargeItem");
var CumulativeRecharges_1 = require("./CumulativeRecharges");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AccumulatedRechargeUi = /** @class */ (function (_super) {
    __extends(AccumulatedRechargeUi, _super);
    function AccumulatedRechargeUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.accumulated_recharge_ui = null;
        return _this;
    }
    AccumulatedRechargeUi.prototype.init = function (uiAc) {
        _super.prototype.init.call(this, uiAc);
        this.refreshUi();
    };
    AccumulatedRechargeUi.prototype.refreshUi = function () {
        var _this = this;
        var content = this.node.getChildByName("scroll").getComponent(cc.ScrollView).content;
        var data = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().rewardMap;
        if (content.childrenCount == 0) {
            var rewardList_1 = new Map();
            data.forEach(function (v, k) {
                var message = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().getJsonCumulativeRecharges(k);
                if (rewardList_1.has(message.Item1_ID) == false && Item_1.ItemManager.getInstance().getType(message.Item1_ID) != 3) {
                    rewardList_1.set(message.Item1_ID, message.Item1_Num);
                }
                else if (rewardList_1.has(message.Item1_ID) == true) {
                    var num = rewardList_1.get(message.Item1_ID) + message.Item1_Num;
                    rewardList_1.set(message.Item1_ID, num);
                }
                if (rewardList_1.has(message.Item2_ID) == false && Item_1.ItemManager.getInstance().getType(message.Item2_ID) != 3) {
                    rewardList_1.set(message.Item2_ID, message.Item2_Num);
                }
                else if (rewardList_1.has(message.Item2_ID) == true) {
                    var num = rewardList_1.get(message.Item2_ID) + message.Item2_Num;
                    rewardList_1.set(message.Item2_ID, num);
                }
                if (rewardList_1.has(message.Item3_ID) == false && Item_1.ItemManager.getInstance().getType(message.Item3_ID) != 3) {
                    rewardList_1.set(message.Item3_ID, message.Item3_Num);
                }
                else if (rewardList_1.has(message.Item3_ID) == true) {
                    var num = rewardList_1.get(message.Item3_ID) + message.Item3_Num;
                    rewardList_1.set(message.Item3_ID, num);
                }
                var item = cc.instantiate(_this.accumulated_recharge_ui);
                item.name = "item" + message.CumulativeRechargeID;
                if (v == 0) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initGoingItem(message);
                }
                else if (v == 1) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initFinishItem(message);
                }
                else {
                    item.getComponent(AccumulatedRechargeItem_1.default).initReceivedItem(message);
                }
                content.addChild(item);
            });
            var itemRoot_1 = this.node.getChildByName("itemRoot");
            rewardList_1.forEach(function (v, k) {
                var item = PropManager_1.PropManager.getInstance().createPropItem(k, v);
                item.scale = 0.75;
                itemRoot_1.addChild(item);
            });
        }
        else {
            data.forEach(function (v, k) {
                var message = CumulativeRecharges_1.CumulativeRechargesManager.getInstance().getJsonCumulativeRecharges(k);
                var item = content.getChildByName("item" + message.CumulativeRechargeID);
                if (v == 0) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initGoingItem(message);
                }
                else if (v == 1) {
                    item.getComponent(AccumulatedRechargeItem_1.default).initFinishItem(message);
                }
                else {
                    item.getComponent(AccumulatedRechargeItem_1.default).initReceivedItem(message);
                }
            });
        }
    };
    AccumulatedRechargeUi.prototype.clickBtnClose = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.destroySelf();
    };
    AccumulatedRechargeUi.prototype.destroySelf = function () {
        _super.prototype.onClose.call(this);
        ApkManager_1.default.getInstance().closeBanner();
        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_LeiChong);
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    };
    __decorate([
        property(cc.Prefab)
    ], AccumulatedRechargeUi.prototype, "accumulated_recharge_ui", void 0);
    AccumulatedRechargeUi = __decorate([
        ccclass
    ], AccumulatedRechargeUi);
    return AccumulatedRechargeUi;
}(UIComponent_1.default));
exports.default = AccumulatedRechargeUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWNjdW11bGF0ZWRSZWNoYXJnZVxcQWNjdW11bGF0ZWRSZWNoYXJnZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQyw4Q0FBeUM7QUFDekMsMENBQWdEO0FBQ2hELG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsc0RBQW1GO0FBQ25GLGlEQUE0QztBQUU1QyxxRUFBZ0U7QUFDaEUsNkRBQW1FO0FBRTdELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQW1ELHlDQUFXO0lBQTlEO1FBQUEscUVBZ0ZDO1FBN0VHLDZCQUF1QixHQUFhLElBQUksQ0FBQzs7SUE2RTdDLENBQUM7SUEzRUcsb0NBQUksR0FBSixVQUFLLElBQWM7UUFDZixpQkFBTSxJQUFJLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCx5Q0FBUyxHQUFUO1FBQUEsaUJBdURDO1FBdERHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3JGLElBQUksSUFBSSxHQUFHLGdEQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUM5RCxJQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFDO1lBQzFCLElBQUksWUFBVSxHQUFHLElBQUksR0FBRyxFQUFpQixDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLEVBQUMsQ0FBQztnQkFDYixJQUFJLE9BQU8sR0FBRyxnREFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckYsSUFBRyxZQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksa0JBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztvQkFDckcsWUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDdEQ7cUJBQUssSUFBRyxZQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUM7b0JBQzlDLElBQUksR0FBRyxHQUFHLFlBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7b0JBQy9ELFlBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBRyxZQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksa0JBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztvQkFDckcsWUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDdEQ7cUJBQUssSUFBRyxZQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUM7b0JBQzlDLElBQUksR0FBRyxHQUFHLFlBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7b0JBQy9ELFlBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0Qs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QWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDJDQUFXLEdBQVg7UUFFSSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztRQUNoQixvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZDLDJCQUFZLENBQUMsWUFBWSxDQUFDLDZCQUFjLENBQUMsU0FBUyxFQUFDLDJCQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNuRixvRkFBb0Y7SUFDeEYsQ0FBQztJQTVFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBFQUNxQjtJQUh4QixxQkFBcUI7UUFEekMsT0FBTztPQUNhLHFCQUFxQixDQWdGekM7SUFBRCw0QkFBQztDQWhGRCxBQWdGQyxDQWhGa0QscUJBQVcsR0FnRjdEO2tCQWhGb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgSXRlbU1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9EYXRhL0l0ZW1cIjtcclxuaW1wb3J0IHsgUHJvcE1hbmFnZXIgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVaUFjdGlvbiB9IGZyb20gXCIuLi9VSS9VaUludGVyZmFjZVwiO1xyXG5pbXBvcnQgQWNjdW11bGF0ZWRSZWNoYXJnZUl0ZW0gZnJvbSBcIi4vQWNjdW11bGF0ZWRSZWNoYXJnZUl0ZW1cIjtcclxuaW1wb3J0IHsgQ3VtdWxhdGl2ZVJlY2hhcmdlc01hbmFnZXIgfSBmcm9tIFwiLi9DdW11bGF0aXZlUmVjaGFyZ2VzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY3VtdWxhdGVkUmVjaGFyZ2VVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgYWNjdW11bGF0ZWRfcmVjaGFyZ2VfdWk6Y2MuUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgICBpbml0KHVpQWM6IFVpQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuaW5pdCh1aUFjKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hVaSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWZyZXNoVWkoKXtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNjcm9sbFwiKS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldykuY29udGVudDtcclxuICAgICAgICBsZXQgZGF0YSA9IEN1bXVsYXRpdmVSZWNoYXJnZXNNYW5hZ2VyLmdldEluc3RhbmNlKCkucmV3YXJkTWFwO1xyXG4gICAgICAgIGlmKGNvbnRlbnQuY2hpbGRyZW5Db3VudCA9PSAwKXtcclxuICAgICAgICAgICAgbGV0IHJld2FyZExpc3QgPSBuZXcgTWFwPG51bWJlcixudW1iZXI+KCk7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25DdW11bGF0aXZlUmVjaGFyZ2VzKGspO1xyXG4gICAgICAgICAgICAgICAgaWYocmV3YXJkTGlzdC5oYXMobWVzc2FnZS5JdGVtMV9JRCkgPT0gZmFsc2UgJiYgSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKG1lc3NhZ2UuSXRlbTFfSUQpICE9IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3Quc2V0KG1lc3NhZ2UuSXRlbTFfSUQsbWVzc2FnZS5JdGVtMV9OdW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocmV3YXJkTGlzdC5oYXMobWVzc2FnZS5JdGVtMV9JRCkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IHJld2FyZExpc3QuZ2V0KG1lc3NhZ2UuSXRlbTFfSUQpICsgbWVzc2FnZS5JdGVtMV9OdW07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQobWVzc2FnZS5JdGVtMV9JRCxudW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYocmV3YXJkTGlzdC5oYXMobWVzc2FnZS5JdGVtMl9JRCkgPT0gZmFsc2UgJiYgSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKG1lc3NhZ2UuSXRlbTJfSUQpICE9IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3Quc2V0KG1lc3NhZ2UuSXRlbTJfSUQsbWVzc2FnZS5JdGVtMl9OdW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocmV3YXJkTGlzdC5oYXMobWVzc2FnZS5JdGVtMl9JRCkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IHJld2FyZExpc3QuZ2V0KG1lc3NhZ2UuSXRlbTJfSUQpICsgbWVzc2FnZS5JdGVtMl9OdW07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQobWVzc2FnZS5JdGVtMl9JRCxudW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYocmV3YXJkTGlzdC5oYXMobWVzc2FnZS5JdGVtM19JRCkgPT0gZmFsc2UgJiYgSXRlbU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRUeXBlKG1lc3NhZ2UuSXRlbTNfSUQpICE9IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJld2FyZExpc3Quc2V0KG1lc3NhZ2UuSXRlbTNfSUQsbWVzc2FnZS5JdGVtM19OdW0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocmV3YXJkTGlzdC5oYXMobWVzc2FnZS5JdGVtM19JRCkgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG51bSA9IHJld2FyZExpc3QuZ2V0KG1lc3NhZ2UuSXRlbTNfSUQpICsgbWVzc2FnZS5JdGVtM19OdW07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV3YXJkTGlzdC5zZXQobWVzc2FnZS5JdGVtM19JRCxudW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmFjY3VtdWxhdGVkX3JlY2hhcmdlX3VpKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IFwiaXRlbVwiICsgbWVzc2FnZS5DdW11bGF0aXZlUmVjaGFyZ2VJRDtcclxuICAgICAgICAgICAgICAgIGlmKHYgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoQWNjdW11bGF0ZWRSZWNoYXJnZUl0ZW0pLmluaXRHb2luZ0l0ZW0obWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih2ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEFjY3VtdWxhdGVkUmVjaGFyZ2VJdGVtKS5pbml0RmluaXNoSXRlbShtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEFjY3VtdWxhdGVkUmVjaGFyZ2VJdGVtKS5pbml0UmVjZWl2ZWRJdGVtKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtUm9vdCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIml0ZW1Sb290XCIpO1xyXG4gICAgICAgICAgICByZXdhcmRMaXN0LmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gUHJvcE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jcmVhdGVQcm9wSXRlbShrLHYpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zY2FsZSA9IDAuNzU7XHJcbiAgICAgICAgICAgICAgICBpdGVtUm9vdC5hZGRDaGlsZChpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgodixrKT0+e1xyXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBDdW11bGF0aXZlUmVjaGFyZ2VzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25DdW11bGF0aXZlUmVjaGFyZ2VzKGspO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiaXRlbVwiICsgbWVzc2FnZS5DdW11bGF0aXZlUmVjaGFyZ2VJRCk7XHJcbiAgICAgICAgICAgICAgICBpZih2ID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KEFjY3VtdWxhdGVkUmVjaGFyZ2VJdGVtKS5pbml0R29pbmdJdGVtKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodiA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChBY2N1bXVsYXRlZFJlY2hhcmdlSXRlbSkuaW5pdEZpbmlzaEl0ZW0obWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChBY2N1bXVsYXRlZFJlY2hhcmdlSXRlbSkuaW5pdFJlY2VpdmVkSXRlbShtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3lTZWxmKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmNsb3NlQmFubmVyKCk7XHJcbiAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0xlaUNob25nKTtcclxuICAgICAgICAvLyBFdmVudE1hbmFnZXIucG9zdFJlZEV2ZW50KFJlZEV2ZW50U3RyaW5nLlJFRF9DSEVDSyxSZWRFdmVudFR5cGUuQnRuX01haW5fU2lnbkluKTtcclxuICAgIH1cclxufVxyXG4iXX0=