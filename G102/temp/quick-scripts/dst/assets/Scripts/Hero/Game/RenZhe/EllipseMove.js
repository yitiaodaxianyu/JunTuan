
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Hero/Game/RenZhe/EllipseMove.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f459e6b5nFODZ3WbqCxZy/f', 'EllipseMove');
// Scripts/Hero/Game/RenZhe/EllipseMove.ts

"use strict";
//椭圆公式
// 当焦点在x轴时，椭圆的标准方程是：x^2/a^2+y^2/b^2=1，(a>b>0)；
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
// 当焦点在y轴时，椭圆的标准方程是：y^2/a^2+x^2/b^2=1，(a>b>0)；
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EllipseMove = /** @class */ (function (_super) {
    __extends(EllipseMove, _super);
    function EllipseMove() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //围绕的几点数量
        _this.revolve_num = 1;
        _this.weapons = [];
        //椭圆的参数
        //长轴
        _this.ellipse_A = 64;
        //短轴
        _this.ellipse_B = 32;
        //椭圆的中心
        _this.ellipse_Oxy = cc.v2(0, 0);
        //环绕的角速度
        _this.revolve_speed = 360;
        //当前与正半轴的夹角
        _this.cur_angle = 0;
        /*倾斜的角度*/
        _this.tilt_angle = 0;
        _this.weapon_streak = null;
        return _this;
    }
    /**
     *
     * @param initAngle 初始的角度
     * @param tiltAngle 整个椭圆倾斜的角度
     * @param centerPos 中心位置,圆心
     */
    EllipseMove.prototype.init = function (initAngle, tiltAngle, centerPos) {
        this.cur_angle = initAngle;
        this.tilt_angle = tiltAngle;
        this.ellipse_Oxy = centerPos;
        this.update(0.0);
        // if(this.tilt_angle==0)
        // {
        //     this.ellipse_A=100;
        //     this.ellipse_B=400;
        // }else
        // {
        //     this.ellipse_A=400;
        //     this.ellipse_B=80;
        // }
    };
    EllipseMove.prototype.refreshAngle = function (angle) {
        this.cur_angle = angle;
    };
    EllipseMove.prototype.update = function (dt) {
        //if(this.target_node){            
        var endX = 0;
        var endY = 0;
        //this.tilt_angle=Math.atan2(this.ellipse_Oxy.y,this.ellipse_Oxy.x)+Math.PI/2;
        if (this.tilt_angle == 0) {
            //正椭圆
            this.cur_angle = (this.cur_angle + this.revolve_speed * dt) % 360;
            //转换弧度
            var hudu = Math.PI * (this.cur_angle) / 180;
            endX = this.ellipse_Oxy.x + this.ellipse_A * Math.cos(hudu);
            endY = this.ellipse_Oxy.y + this.ellipse_B * Math.sin(hudu);
        }
        else {
            //斜椭圆,倾斜60°
            if (this.tilt_angle > 0) {
                this.cur_angle = (this.cur_angle + this.revolve_speed * dt) % 360;
            }
            else {
                this.cur_angle = (this.cur_angle - this.revolve_speed * dt) % 360;
            }
            //转换弧度
            var hudu = Math.PI * (this.cur_angle) / 180;
            var normalCos = Math.cos(hudu);
            var normalSin = Math.sin(hudu);
            //转换弧度
            var qingxieAngle = this.tilt_angle;
            var qingxieCos = Math.cos(qingxieAngle);
            var qingxieSin = Math.sin(qingxieAngle);
            endX = this.ellipse_Oxy.x + this.ellipse_A * normalCos * qingxieCos - this.ellipse_B * normalSin * qingxieSin;
            endY = this.ellipse_Oxy.y + this.ellipse_B * normalCos * qingxieSin + this.ellipse_B * normalSin * qingxieCos;
        }
        this.node.x = endX;
        this.node.y = endY;
        this.node.zIndex = this.node.y > this.ellipse_Oxy.y ? 0 : 3;
        //}
    };
    __decorate([
        property()
    ], EllipseMove.prototype, "ellipse_A", void 0);
    __decorate([
        property()
    ], EllipseMove.prototype, "ellipse_B", void 0);
    __decorate([
        property()
    ], EllipseMove.prototype, "ellipse_Oxy", void 0);
    __decorate([
        property()
    ], EllipseMove.prototype, "cur_angle", void 0);
    EllipseMove = __decorate([
        ccclass
    ], EllipseMove);
    return EllipseMove;
}(cc.Component));
exports.default = EllipseMove;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcSGVyb1xcR2FtZVxcUmVuWmhlXFxFbGxpcHNlTW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDhDQUE4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTlDLDhDQUE4QztBQUN4QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQWtHQztRQWhHRyxTQUFTO1FBQ1QsaUJBQVcsR0FBUSxDQUFDLENBQUM7UUFDckIsYUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixPQUFPO1FBQ1AsSUFBSTtRQUVKLGVBQVMsR0FBUSxFQUFFLENBQUM7UUFFcEIsSUFBSTtRQUVKLGVBQVMsR0FBUSxFQUFFLENBQUM7UUFFcEIsT0FBTztRQUVQLGlCQUFXLEdBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsUUFBUTtRQUNSLG1CQUFhLEdBQVEsR0FBRyxDQUFDO1FBQ3pCLFdBQVc7UUFFWCxlQUFTLEdBQVEsQ0FBQyxDQUFDO1FBRW5CLFNBQVM7UUFDVCxnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUVwQixtQkFBYSxHQUFTLElBQUksQ0FBQzs7SUF1RS9CLENBQUM7SUFwRUc7Ozs7O09BS0c7SUFDSCwwQkFBSSxHQUFKLFVBQUssU0FBZ0IsRUFBQyxTQUFnQixFQUFDLFNBQWlCO1FBRXBELElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUMsU0FBUyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUMsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIseUJBQXlCO1FBQ3pCLElBQUk7UUFDSiwwQkFBMEI7UUFDMUIs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Q0FBQyxDQUFBLENBQUMsQ0FBQztRQUN4RCxHQUFHO0lBRVAsQ0FBQztJQXpGRDtRQURDLFFBQVEsRUFBRTtrREFDUztJQUlwQjtRQURDLFFBQVEsRUFBRTtrREFDUztJQUlwQjtRQURDLFFBQVEsRUFBRTtvREFDb0I7SUFNL0I7UUFEQyxRQUFRLEVBQUU7a0RBQ1E7SUF0QkYsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQWtHL0I7SUFBRCxrQkFBQztDQWxHRCxBQWtHQyxDQWxHd0MsRUFBRSxDQUFDLFNBQVMsR0FrR3BEO2tCQWxHb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5qSt5ZyG5YWs5byPXHJcbi8vIOW9k+eEpueCueWcqHjovbTml7bvvIzmpK3lnIbnmoTmoIflh4bmlrnnqIvmmK/vvJp4XjIvYV4yK3leMi9iXjI9Me+8jChhPmI+MCnvvJtcclxuXHJcbi8vIOW9k+eEpueCueWcqHnovbTml7bvvIzmpK3lnIbnmoTmoIflh4bmlrnnqIvmmK/vvJp5XjIvYV4yK3heMi9iXjI9Me+8jChhPmI+MCnvvJtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGxpcHNlTW92ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy/lm7Tnu5XnmoTlh6DngrnmlbDph49cclxuICAgIHJldm9sdmVfbnVtOm51bWJlcj0xO1xyXG4gICAgd2VhcG9uczpjYy5Ob2RlW109W107XHJcbiAgICAvL+akreWchueahOWPguaVsFxyXG4gICAgLy/plb/ovbRcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBlbGxpcHNlX0E6bnVtYmVyPTY0O1xyXG5cclxuICAgIC8v55+t6L20XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgZWxsaXBzZV9COm51bWJlcj0zMjtcclxuXHJcbiAgICAvL+akreWchueahOS4reW/g1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGVsbGlwc2VfT3h5OmNjLlZlYzI9Y2MudjIoMCwwKTtcclxuXHJcbiAgICAvL+eOr+e7leeahOinkumAn+W6plxyXG4gICAgcmV2b2x2ZV9zcGVlZDpudW1iZXI9MzYwO1xyXG4gICAgLy/lvZPliY3kuI7mraPljYrovbTnmoTlpLnop5JcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBjdXJfYW5nbGU6bnVtYmVyPTA7XHJcblxyXG4gICAgLyrlgL7mlpznmoTop5LluqYqL1xyXG4gICAgdGlsdF9hbmdsZTpudW1iZXI9MDtcclxuXHJcbiAgICB3ZWFwb25fc3RyZWFrOmNjLk5vZGU9bnVsbDtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpbml0QW5nbGUg5Yid5aeL55qE6KeS5bqmXHJcbiAgICAgKiBAcGFyYW0gdGlsdEFuZ2xlIOaVtOS4quakreWchuWAvuaWnOeahOinkuW6plxyXG4gICAgICogQHBhcmFtIGNlbnRlclBvcyDkuK3lv4PkvY3nva4s5ZyG5b+DXHJcbiAgICAgKi9cclxuICAgIGluaXQoaW5pdEFuZ2xlOm51bWJlcix0aWx0QW5nbGU6bnVtYmVyLGNlbnRlclBvczpjYy5WZWMyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3VyX2FuZ2xlPWluaXRBbmdsZTtcclxuICAgICAgICB0aGlzLnRpbHRfYW5nbGU9dGlsdEFuZ2xlO1xyXG4gICAgICAgIHRoaXMuZWxsaXBzZV9PeHk9Y2VudGVyUG9zO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKDAuMCk7XHJcbiAgICAgICAgLy8gaWYodGhpcy50aWx0X2FuZ2xlPT0wKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5lbGxpcHNlX0E9MTAwO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmVsbGlwc2VfQj00MDA7XHJcbiAgICAgICAgLy8gfWVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZWxsaXBzZV9BPTQwMDtcclxuICAgICAgICAvLyAgICAgdGhpcy5lbGxpcHNlX0I9ODA7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2hBbmdsZShhbmdsZTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VyX2FuZ2xlPWFuZ2xlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICAvL2lmKHRoaXMudGFyZ2V0X25vZGUpeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZW5kWD0wO1xyXG4gICAgICAgICAgICBsZXQgZW5kWT0wO1xyXG4gICAgICAgICAgICAvL3RoaXMudGlsdF9hbmdsZT1NYXRoLmF0YW4yKHRoaXMuZWxsaXBzZV9PeHkueSx0aGlzLmVsbGlwc2VfT3h5LngpK01hdGguUEkvMjtcclxuICAgICAgICAgICAgaWYodGhpcy50aWx0X2FuZ2xlPT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+ato+akreWchlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfYW5nbGU9KHRoaXMuY3VyX2FuZ2xlK3RoaXMucmV2b2x2ZV9zcGVlZCpkdCklMzYwO1xyXG4gICAgICAgICAgICAgICAgLy/ovazmjaLlvKfluqZcclxuICAgICAgICAgICAgICAgIGxldCBodWR1PU1hdGguUEkqKHRoaXMuY3VyX2FuZ2xlKS8xODA7XHJcbiAgICAgICAgICAgICAgICBlbmRYPXRoaXMuZWxsaXBzZV9PeHkueCt0aGlzLmVsbGlwc2VfQSpNYXRoLmNvcyhodWR1KTtcclxuICAgICAgICAgICAgICAgIGVuZFk9dGhpcy5lbGxpcHNlX094eS55K3RoaXMuZWxsaXBzZV9CKk1hdGguc2luKGh1ZHUpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/mlpzmpK3lnIYs5YC+5pacNjDCsFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50aWx0X2FuZ2xlPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfYW5nbGU9KHRoaXMuY3VyX2FuZ2xlK3RoaXMucmV2b2x2ZV9zcGVlZCpkdCklMzYwO1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl9hbmdsZT0odGhpcy5jdXJfYW5nbGUtdGhpcy5yZXZvbHZlX3NwZWVkKmR0KSUzNjA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+i9rOaNouW8p+W6plxyXG4gICAgICAgICAgICAgICAgbGV0IGh1ZHU9TWF0aC5QSSoodGhpcy5jdXJfYW5nbGUpLzE4MDtcclxuICAgICAgICAgICAgICAgIGxldCBub3JtYWxDb3M9TWF0aC5jb3MoaHVkdSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbm9ybWFsU2luPU1hdGguc2luKGh1ZHUpO1xyXG4gICAgICAgICAgICAgICAgLy/ovazmjaLlvKfluqZcclxuICAgICAgICAgICAgICAgIGxldCBxaW5neGllQW5nbGU9dGhpcy50aWx0X2FuZ2xlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHFpbmd4aWVDb3M9TWF0aC5jb3MocWluZ3hpZUFuZ2xlKTtcclxuICAgICAgICAgICAgICAgIGxldCBxaW5neGllU2luPU1hdGguc2luKHFpbmd4aWVBbmdsZSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZW5kWD10aGlzLmVsbGlwc2VfT3h5LngrdGhpcy5lbGxpcHNlX0Eqbm9ybWFsQ29zKnFpbmd4aWVDb3MtdGhpcy5lbGxpcHNlX0Iqbm9ybWFsU2luKnFpbmd4aWVTaW47XHJcbiAgICAgICAgICAgICAgICBlbmRZPXRoaXMuZWxsaXBzZV9PeHkueSt0aGlzLmVsbGlwc2VfQipub3JtYWxDb3MqcWluZ3hpZVNpbit0aGlzLmVsbGlwc2VfQipub3JtYWxTaW4qcWluZ3hpZUNvcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUueD1lbmRYO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueT1lbmRZO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4PXRoaXMubm9kZS55PnRoaXMuZWxsaXBzZV9PeHkueT8wOjM7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuIl19