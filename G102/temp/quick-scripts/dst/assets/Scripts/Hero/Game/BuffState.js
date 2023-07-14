
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/BuffState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '843127SnhhEuqDoa3UDafaU', 'BuffState');
// Scripts/Hero/Game/BuffState.ts

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
var Constants_1 = require("../../Constants");
var GameManager_1 = require("../../GameManager");
var HeroConfig_1 = require("./HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BuffState = /** @class */ (function (_super) {
    __extends(BuffState, _super);
    function BuffState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**剩余的时间 */
        _this.remain_time = 0;
        /**护盾类型，可以抵消的伤害类型 */
        _this.buff_type = HeroConfig_1.BuffStateType.Attack;
        /**时间结束的回调 */
        _this.destroy_callback = null;
        _this.opacity_num = 5;
        return _this;
    }
    BuffState.prototype.init = function (type, remainTime, callback) {
        this.remain_time = remainTime;
        this.buff_type = type;
        this.node.opacity = 255;
        this.destroy_callback = callback;
    };
    BuffState.prototype.getRemainTime = function () {
        return this.remain_time;
    };
    BuffState.prototype.getBuffType = function () {
        return this.buff_type;
    };
    BuffState.prototype.refreshTime = function (remainTime) {
        if (remainTime > this.remain_time) {
            this.remain_time = remainTime;
            if (this.remain_time >= 3) {
                this.node.opacity = 255;
            }
        }
    };
    BuffState.prototype.destroySelf = function () {
        if (this.destroy_callback) {
            this.destroy_callback(this.buff_type);
        }
        this.node.removeFromParent();
    };
    BuffState.prototype.update = function (dt) {
        if (GameManager_1.default.getInstance().cur_game_state == Constants_1.GameState.Game_Playing) {
            if (this.remain_time > 0) {
                this.remain_time -= dt;
                if (this.remain_time < 0) {
                    this.remain_time = 0;
                    this.destroySelf();
                }
                if (this.remain_time <= 3) {
                    this.node.opacity += this.opacity_num;
                    if (this.node.opacity <= 128) {
                        this.opacity_num = 5;
                    }
                    else if (this.node.opacity >= 255) {
                        this.opacity_num = -5;
                    }
                }
                else {
                    this.node.opacity = 255;
                }
            }
        }
    };
    BuffState = __decorate([
        ccclass
    ], BuffState);
    return BuffState;
}(cc.Component));
exports.default = BuffState;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcQnVmZlN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1QyxpREFBNEM7QUFDNUMsMkNBQTZDO0FBR3ZDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBK0RDO1FBOURHLFdBQVc7UUFDSCxpQkFBVyxHQUFRLENBQUMsQ0FBQztRQUM3QixvQkFBb0I7UUFDWixlQUFTLEdBQWUsMEJBQWEsQ0FBQyxNQUFNLENBQUM7UUFDckQsYUFBYTtRQUNMLHNCQUFnQixHQUFVLElBQUksQ0FBQztRQUV2QyxpQkFBVyxHQUFRLENBQUMsQ0FBQzs7SUF1RHpCLENBQUM7SUFyREcsd0JBQUksR0FBSixVQUFLLElBQWtCLEVBQUMsVUFBaUIsRUFBQyxRQUFpQjtRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixHQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsaUNBQWEsR0FBYjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBRUQsK0JBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLFVBQWlCO1FBQ3pCLElBQUcsVUFBVSxHQUFDLElBQUksQ0FBQyxXQUFXLEVBQzlCO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7WUFDNUIsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFFLENBQUMsRUFBQztnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO2FBQ3pCO1NBQ0o7SUFDTCxDQUFDO0lBRU0sK0JBQVcsR0FBbEI7UUFDSSxJQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztZQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFUywwQkFBTSxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLElBQUcscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLElBQUUscUJBQVMsQ0FBQyxZQUFZLEVBQUM7WUFDaEUsSUFBRyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsRUFBQztnQkFDbEIsSUFBSSxDQUFDLFdBQVcsSUFBRSxFQUFFLENBQUM7Z0JBQ3JCLElBQUcsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQUM7b0JBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3RCO2dCQUNELElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBRSxDQUFDLEVBQUM7b0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQ3BDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUUsR0FBRyxFQUFDO3dCQUN0QixJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztxQkFDdEI7eUJBQUssSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBRSxHQUFHLEVBQUM7d0JBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZCO2lCQUNKO3FCQUFJO29CQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztpQkFDekI7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQTlEZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQStEN0I7SUFBRCxnQkFBQztDQS9ERCxBQStEQyxDQS9Ec0MsRUFBRSxDQUFDLFNBQVMsR0ErRGxEO2tCQS9Eb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWVTdGF0ZSB9IGZyb20gXCIuLi8uLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi8uLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBCdWZmU3RhdGVUeXBlIH0gZnJvbSBcIi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVmZlN0YXRlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8qKuWJqeS9meeahOaXtumXtCAqL1xyXG4gICAgcHJpdmF0ZSByZW1haW5fdGltZTpudW1iZXI9MDtcclxuICAgIC8qKuaKpOebvuexu+Wei++8jOWPr+S7peaKtea2iOeahOS8pOWus+exu+WeiyAqL1xyXG4gICAgcHJpdmF0ZSBidWZmX3R5cGU6QnVmZlN0YXRlVHlwZT1CdWZmU3RhdGVUeXBlLkF0dGFjaztcclxuICAgIC8qKuaXtumXtOe7k+adn+eahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBkZXN0cm95X2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcblxyXG4gICAgb3BhY2l0eV9udW06bnVtYmVyPTU7XHJcblxyXG4gICAgaW5pdCh0eXBlOkJ1ZmZTdGF0ZVR5cGUscmVtYWluVGltZTpudW1iZXIsY2FsbGJhY2s6RnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMucmVtYWluX3RpbWU9cmVtYWluVGltZTtcclxuICAgICAgICB0aGlzLmJ1ZmZfdHlwZT10eXBlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lfY2FsbGJhY2s9Y2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVtYWluVGltZSgpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW1haW5fdGltZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdWZmVHlwZSgpOkJ1ZmZTdGF0ZVR5cGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVmZl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hUaW1lKHJlbWFpblRpbWU6bnVtYmVyKXtcclxuICAgICAgICBpZihyZW1haW5UaW1lPnRoaXMucmVtYWluX3RpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlbWFpbl90aW1lPXJlbWFpblRpbWU7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU+PTMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xyXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95U2VsZigpe1xyXG4gICAgICAgIGlmKHRoaXMuZGVzdHJveV9jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveV9jYWxsYmFjayh0aGlzLmJ1ZmZfdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3N0YXRlPT1HYW1lU3RhdGUuR2FtZV9QbGF5aW5nKXtcclxuICAgICAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZT4wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtYWluX3RpbWUtPWR0O1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZTwwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbWFpbl90aW1lPTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95U2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZW1haW5fdGltZTw9Myl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSs9dGhpcy5vcGFjaXR5X251bTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGUub3BhY2l0eTw9MTI4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGFjaXR5X251bT01O1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMubm9kZS5vcGFjaXR5Pj0yNTUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wYWNpdHlfbnVtPS01O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==