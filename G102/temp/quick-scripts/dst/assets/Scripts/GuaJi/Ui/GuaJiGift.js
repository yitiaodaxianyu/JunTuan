
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/GuaJi/Ui/GuaJiGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3e306aF0pJHvKz3kS+PaXHk', 'GuaJiGift');
// Scripts/GuaJi/Ui/GuaJiGift.ts

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
var OfflineRevenue_1 = require("../../JsonData/OfflineRevenue");
var FollowConstants_1 = require("../../multiLanguage/FollowConstants");
var FollowManager_1 = require("../../multiLanguage/FollowManager");
var EventManager_1 = require("../../Tools/EventManager");
var UIConfig_1 = require("../../UI/UIConfig");
var UIManager_1 = require("../../UI/UIManager");
var OfflineUi_1 = require("./OfflineUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuaJiGift = /** @class */ (function (_super) {
    __extends(GuaJiGift, _super);
    function GuaJiGift() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reward_num = 0;
        _this.skeleton = null;
        _this.icon_index = 0;
        _this.is_press = false;
        return _this;
    }
    GuaJiGift.prototype.onLoad = function () {
        this.skeleton = this.node.getComponent(sp.Skeleton);
        // this.node.on(cc.Node.EventType.TOUCH_START,()=>{
        //     this.skeleton.setAnimation(0,"chest_start"+this.icon_index,true);
        //     this.is_press=true;
        // },this);
        // this.node.on(cc.Node.EventType.TOUCH_END,this.onClick,this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL,()=>{
        //     this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);
        //     this.is_press=false;
        // },this);
    };
    GuaJiGift.prototype.onEnable = function () {
        this.cheak();
        this.unschedule(this.cheak);
        this.schedule(this.cheak, 10);
    };
    GuaJiGift.prototype.cheak = function () {
        var offsetMin = OfflineRevenue_1.OfflineRevenueManager.getGuaJiMin();
        if (offsetMin > 480) {
            offsetMin = 480;
        }
        if (offsetMin < 0) {
            offsetMin = 0;
        }
        var iconIndex = 0;
        if (offsetMin < 30) {
            iconIndex = 0;
        }
        else if (offsetMin < 60) {
            iconIndex = 1;
        }
        else if (offsetMin < 90) {
            iconIndex = 2;
        }
        else if (offsetMin < 120) {
            iconIndex = 3;
        }
        else if (offsetMin < 150) {
            iconIndex = 4;
        }
        else {
            iconIndex = 5;
        }
        this.icon_index = iconIndex;
        if (this.is_press == false) {
            //this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);
        }
    };
    GuaJiGift.prototype.onClick = function () {
        var _this = this;
        // FollowManager.getInstance().followEvent(Follow_Type.挂机奖励点击用户数);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.离线奖励点击次数);
        //this.skeleton.setAnimation(0,"chest_idle"+this.icon_index,true);        
        UIManager_1.UIManager.getInstance().showUiDialog(UIConfig_1.UIPath.Guaji, UIConfig_1.UILayerLevel.One, { onCompleted: function (uiNode) {
                uiNode.getComponent(OfflineUi_1.default).init({
                    onRefresh: function () {
                        _this.cheak();
                        EventManager_1.EventManager.postRedEvent(EventManager_1.RedEventString.RED_CHECK, EventManager_1.RedEventType.Btn_Main_Guaji);
                    }
                });
            }, });
        this.is_press = false;
        this.cheak();
    };
    GuaJiGift = __decorate([
        ccclass
    ], GuaJiGift);
    return GuaJiGift;
}(cc.Component));
exports.default = GuaJiGift;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR3VhSmlcXFVpXFxHdWFKaUdpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXNFO0FBQ3RFLHVFQUFrRTtBQUNsRSxtRUFBOEQ7QUFDOUQseURBQXNGO0FBQ3RGLDhDQUF5RDtBQUN6RCxnREFBK0M7QUFDL0MseUNBQW9DO0FBSTlCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBNkVDO1FBM0VHLGdCQUFVLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDMUIsZ0JBQVUsR0FBUSxDQUFDLENBQUM7UUFDcEIsY0FBUSxHQUFTLEtBQUssQ0FBQzs7SUF3RTNCLENBQUM7SUF0RWEsMEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxtREFBbUQ7UUFDbkQsd0VBQXdFO1FBQ3hFLDBCQUEwQjtRQUMxQixXQUFXO1FBQ1gsK0RBQStEO1FBQy9ELG9EQUFvRDtRQUNwRCx1RUFBdUU7UUFDdkUsMkJBQTJCO1FBQzNCLFdBQVc7SUFDZixDQUFDO0lBRUQsNEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQseUJBQUssR0FBTDtRQUVJLElBQUksU0FBUyxHQUFDLHNDQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xELElBQUcsU0FBUyxHQUFDLEdBQUcsRUFDaEI7WUFDSSxTQUFTLEdBQUMsR0FBRyxDQUFDO1NBQ2pCO1FBQ0QsSUFBRyxTQUFTLEdBQUMsQ0FBQyxFQUNkO1lBQ0ksU0FBUyxHQUFDLENBQUMsQ0FBQztTQUNmO1FBQ0QsSUFBSSxTQUFTLEdBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUcsU0FBUyxHQUFDLEVBQUUsRUFBQztZQUNaLFNBQVMsR0FBQyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsU0FBUyxHQUFDLEVBQUUsRUFBQztZQUNsQixTQUFTLEdBQUMsQ0FBQyxDQUFDO1NBQ2Y7YUFBSyxJQUFHLFNBQVMsR0FBQyxFQUFFLEVBQUM7WUFDbEIsU0FBUyxHQUFDLENBQUMsQ0FBQztTQUNmO2FBQUssSUFBRyxTQUFTLEdBQUMsR0FBRyxFQUFDO1lBQ25CLFNBQVMsR0FBQyxDQUFDLENBQUM7U0FDZjthQUFLLElBQUcsU0FBUyxHQUFDLEdBQUcsRUFBQztZQUNuQixTQUFTLEdBQUMsQ0FBQyxDQUFDO1NBQ2Y7YUFBSTtZQUNELFNBQVMsR0FBQyxDQUFDLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUMsU0FBUyxDQUFDO1FBQzFCLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBRSxLQUFLLEVBQUM7WUFDcEIsa0VBQWtFO1NBQ3JFO0lBQ0wsQ0FBQztJQUVELDJCQUFPLEdBQVA7UUFBQSxpQkFlQztRQWJHLGtFQUFrRTtRQUNsRSx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlELDBFQUEwRTtRQUMxRSxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxpQkFBTSxDQUFDLEtBQUssRUFBQyx1QkFBWSxDQUFDLEdBQUcsRUFBQyxFQUFDLFdBQVcsRUFBQyxVQUFDLE1BQU07Z0JBQ25GLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDaEMsU0FBUyxFQUFDO3dCQUNOLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDYiwyQkFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBYyxDQUFDLFNBQVMsRUFBQywyQkFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNwRixDQUFDO2lCQUNKLENBQUMsQ0FBQTtZQUNOLENBQUMsR0FBRSxDQUFDLENBQUE7UUFDSixJQUFJLENBQUMsUUFBUSxHQUFDLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQXhFZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTZFN0I7SUFBRCxnQkFBQztDQTdFRCxBQTZFQyxDQTdFc0MsRUFBRSxDQUFDLFNBQVMsR0E2RWxEO2tCQTdFb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9mZmxpbmVSZXZlbnVlTWFuYWdlciB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9PZmZsaW5lUmV2ZW51ZVwiO1xyXG5pbXBvcnQgeyBGb2xsb3dfVHlwZSB9IGZyb20gXCIuLi8uLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgRm9sbG93TWFuYWdlciBmcm9tIFwiLi4vLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciwgUmVkRXZlbnRTdHJpbmcsIFJlZEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9Ub29scy9FdmVudE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVUlMYXllckxldmVsLCBVSVBhdGggfSBmcm9tIFwiLi4vLi4vVUkvVUlDb25maWdcIjtcclxuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL1VJL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgT2ZmbGluZVVpIGZyb20gXCIuL09mZmxpbmVVaVwiO1xyXG5cclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1YUppR2lmdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgcmV3YXJkX251bTpudW1iZXI9MDtcclxuICAgIHNrZWxldG9uOnNwLlNrZWxldG9uPW51bGw7XHJcbiAgICBpY29uX2luZGV4Om51bWJlcj0wO1xyXG4gICAgaXNfcHJlc3M6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2tlbGV0b249dGhpcy5ub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsXCJjaGVzdF9zdGFydFwiK3RoaXMuaWNvbl9pbmRleCx0cnVlKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5pc19wcmVzcz10cnVlO1xyXG4gICAgICAgIC8vIH0sdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLm9uQ2xpY2ssdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwoKT0+e1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNrZWxldG9uLnNldEFuaW1hdGlvbigwLFwiY2hlc3RfaWRsZVwiK3RoaXMuaWNvbl9pbmRleCx0cnVlKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5pc19wcmVzcz1mYWxzZTtcclxuICAgICAgICAvLyB9LHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlICgpIHtcclxuICAgICAgICB0aGlzLmNoZWFrKCk7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY2hlYWspO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5jaGVhaywxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlYWsoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBvZmZzZXRNaW49T2ZmbGluZVJldmVudWVNYW5hZ2VyLmdldEd1YUppTWluKCk7XHJcbiAgICAgICAgaWYob2Zmc2V0TWluPjQ4MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9mZnNldE1pbj00ODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9mZnNldE1pbjwwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2Zmc2V0TWluPTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpY29uSW5kZXg9MDtcclxuICAgICAgICBpZihvZmZzZXRNaW48MzApe1xyXG4gICAgICAgICAgICBpY29uSW5kZXg9MDtcclxuICAgICAgICB9ZWxzZSBpZihvZmZzZXRNaW48NjApe1xyXG4gICAgICAgICAgICBpY29uSW5kZXg9MTtcclxuICAgICAgICB9ZWxzZSBpZihvZmZzZXRNaW48OTApe1xyXG4gICAgICAgICAgICBpY29uSW5kZXg9MjtcclxuICAgICAgICB9ZWxzZSBpZihvZmZzZXRNaW48MTIwKXtcclxuICAgICAgICAgICAgaWNvbkluZGV4PTM7XHJcbiAgICAgICAgfWVsc2UgaWYob2Zmc2V0TWluPDE1MCl7XHJcbiAgICAgICAgICAgIGljb25JbmRleD00OyAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpY29uSW5kZXg9NTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pY29uX2luZGV4PWljb25JbmRleDsgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNfcHJlc3M9PWZhbHNlKXtcclxuICAgICAgICAgICAgLy90aGlzLnNrZWxldG9uLnNldEFuaW1hdGlvbigwLFwiY2hlc3RfaWRsZVwiK3RoaXMuaWNvbl9pbmRleCx0cnVlKTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIC8vIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mjILmnLrlpZblirHngrnlh7vnlKjmiLfmlbApO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7nprvnur/lpZblirHngrnlh7vmrKHmlbApO1xyXG4gICAgICAgIC8vdGhpcy5za2VsZXRvbi5zZXRBbmltYXRpb24oMCxcImNoZXN0X2lkbGVcIit0aGlzLmljb25faW5kZXgsdHJ1ZSk7ICAgICAgICBcclxuICAgICAgICBVSU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zaG93VWlEaWFsb2coVUlQYXRoLkd1YWppLFVJTGF5ZXJMZXZlbC5PbmUse29uQ29tcGxldGVkOih1aU5vZGUpPT4ge1xyXG4gICAgICAgICAgICB1aU5vZGUuZ2V0Q29tcG9uZW50KE9mZmxpbmVVaSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBvblJlZnJlc2g6KCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWFrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLnBvc3RSZWRFdmVudChSZWRFdmVudFN0cmluZy5SRURfQ0hFQ0ssUmVkRXZlbnRUeXBlLkJ0bl9NYWluX0d1YWppKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LH0pXHJcbiAgICAgICAgdGhpcy5pc19wcmVzcz1mYWxzZTtcclxuICAgICAgICB0aGlzLmNoZWFrKCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIFxyXG59XHJcbiJdfQ==