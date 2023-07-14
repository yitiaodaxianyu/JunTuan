
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/SkillTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfe8c8jEfFCt7VVbKrlPqG1', 'SkillTip');
// Scripts/Hero/Game/SkillTip.ts

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
var SkillManager_1 = require("../../Game/SkillManager");
var HeroConfig_1 = require("./HeroConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkillTip = /** @class */ (function (_super) {
    __extends(SkillTip, _super);
    function SkillTip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_tip = [];
        _this.skill_tip_type = HeroConfig_1.SkillTipType.Full;
        _this.self_sp = null;
        return _this;
    }
    SkillTip.prototype.onLoad = function () {
        this.self_sp = this.node.getComponent(cc.Sprite);
    };
    SkillTip.prototype.setIsCanRelease = function (isCan) {
        if (this.self_sp) {
            this.self_sp.spriteFrame = this.sp_tip[isCan ? 1 : 0];
        }
        SkillManager_1.default.getInstance().setSkillRange(isCan);
    };
    SkillTip.prototype.getSkillTipType = function () {
        return this.skill_tip_type;
    };
    __decorate([
        property([cc.SpriteFrame])
    ], SkillTip.prototype, "sp_tip", void 0);
    __decorate([
        property({ type: cc.Enum(HeroConfig_1.SkillTipType) })
    ], SkillTip.prototype, "skill_tip_type", void 0);
    SkillTip = __decorate([
        ccclass
    ], SkillTip);
    return SkillTip;
}(cc.Component));
exports.default = SkillTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcU2tpbGxUaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELDJDQUE0QztBQUd0QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXlCQztRQXRCRyxZQUFNLEdBQWtCLEVBQUUsQ0FBQztRQUczQixvQkFBYyxHQUFjLHlCQUFZLENBQUMsSUFBSSxDQUFDO1FBRTlDLGFBQU8sR0FBVyxJQUFJLENBQUM7O0lBaUIzQixDQUFDO0lBZkcseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLEtBQWE7UUFDekIsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxzQkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsa0NBQWUsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBcEJEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRDQUNBO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQVksQ0FBQyxFQUFDLENBQUM7b0RBQ087SUFON0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQXlCNUI7SUFBRCxlQUFDO0NBekJELEFBeUJDLENBekJxQyxFQUFFLENBQUMsU0FBUyxHQXlCakQ7a0JBekJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNraWxsTWFuYWdlciBmcm9tIFwiLi4vLi4vR2FtZS9Ta2lsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU2tpbGxUaXBUeXBlIH0gZnJvbSBcIi4vSGVyb0NvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2tpbGxUaXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3BfdGlwOmNjLlNwcml0ZUZyYW1lW109W107XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLkVudW0oU2tpbGxUaXBUeXBlKX0pXHJcbiAgICBza2lsbF90aXBfdHlwZTpTa2lsbFRpcFR5cGU9U2tpbGxUaXBUeXBlLkZ1bGw7XHJcblxyXG4gICAgc2VsZl9zcDpjYy5TcHJpdGU9bnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLnNlbGZfc3A9dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldElzQ2FuUmVsZWFzZShpc0Nhbjpib29sZWFuKXtcclxuICAgICAgICBpZih0aGlzLnNlbGZfc3Ape1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZfc3Auc3ByaXRlRnJhbWU9dGhpcy5zcF90aXBbaXNDYW4/MTowXTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBTa2lsbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRTa2lsbFJhbmdlKGlzQ2FuKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTa2lsbFRpcFR5cGUoKTpTa2lsbFRpcFR5cGV7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tpbGxfdGlwX3R5cGU7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==