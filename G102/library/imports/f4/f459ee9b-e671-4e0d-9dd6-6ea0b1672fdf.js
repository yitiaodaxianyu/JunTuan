"use strict";
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