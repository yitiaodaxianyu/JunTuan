"use strict";
cc._RF.push(module, '0acc04Yc/JA87ZRr5O1HCOU', 'mapmove');
// Scripts/Game/mapmove.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tutorials = /** @class */ (function (_super) {
    __extends(Tutorials, _super);
    function Tutorials() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.zone = null; // 宽高就是拖拽区域
        _this.parent = null;
        _this.bgOrigin = null;
        return _this;
    }
    Tutorials.prototype.onLoad = function () {
        return;
        this.parent = this.node.parent;
        // this.bgOrigin = cc.v2(0, 0);
        this.bgOrigin = this.target.position.sub(cc.v3(this.target.width * this.target.anchorX * this.target.scaleX, this.target.height * this.target.anchorY * this.target.scaleY, 0));
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this._touchMove, this);
    };
    Tutorials.prototype._touchMove = function (event) {
        var touches = event.getTouches();
        if (touches.length >= 2) {
            return;
            var touch1 = touches[0], touch2 = touches[1], delta1 = touch1.getDelta(), delta2 = touch2.getDelta();
            // 得到当前两触摸点 转到parent下坐标
            var touchPoint1 = this.parent.convertToNodeSpaceAR(touch1.getLocation());
            var touchPoint2 = this.parent.convertToNodeSpaceAR(touch2.getLocation());
            // 转换为坐标 进行向量计算
            touchPoint1 = cc.v2(touchPoint1.x, touchPoint1.y);
            touchPoint2 = cc.v2(touchPoint2.x, touchPoint2.y);
            // 两触摸点与原点的差向量，pointVec1和pointVec2是相对于bgSprite的位置
            var pointVec1 = touchPoint1.sub(this.bgOrigin);
            var pointVec2 = touchPoint2.sub(this.bgOrigin);
            // 两触摸点的相对中点
            var relMidx = (pointVec1.x + pointVec2.x) / 2;
            var relMidy = (pointVec1.y + pointVec2.y) / 2;
            // 计算bgSprite的锚点
            var anchorX = relMidx / (this.target.width * this.target.scale);
            var anchorY = relMidy / (this.target.height * this.target.scale);
            // 相对屏幕的中点
            var absMidx = (touchPoint2.x + touchPoint1.x) / 2;
            var absMidy = (touchPoint2.y + touchPoint1.y) / 2;
            // 重设bgSprite锚点和位置
            this.target.anchorX = anchorX;
            this.target.anchorY = anchorY;
            this.target.x = absMidx;
            this.target.y = absMidy;
            // this.startPoint = cc.v2(event.getLocation().x,event.getLocation().y); //取起始点向量
            // this.endPoint = cc.v2(event.getLocation().x,event.getLocation().y); //取终点向量
            // let vec = this.endPoint.sub(this.startPoint); //向量相减，得到目标向量
            // let distance = vec.mag(); //取向量的模长
            //缩放
            var distancevec = touchPoint2.sub(touchPoint1);
            var distance = distancevec; //.mag()//cc.pSub(touchPoint1, touchPoint2);
            var deltavec = delta2.sub(delta1);
            var delta = deltavec; //.mag() //cc.pSub(delta1, delta2);
            var scale = 1;
            if (Math.abs(distance.x) > Math.abs(distance.y)) {
                scale = (distance.x + delta.x) / distance.x * this.target.scale;
            }
            else {
                scale = (distance.y + delta.y) / distance.y * this.target.scale;
            }
            if (scale < 1) {
                scale = 1;
            }
            if (scale > 2) {
                scale = 2;
            }
            this.target.scale = scale < 0.1 ? 0.1 : scale;
            // 更新原点位置
            this.bgOrigin = cc.v2(absMidx, absMidy).sub(cc.v2(this.target.width * anchorX * this.target.scaleX, this.target.height * anchorY * this.target.scaleY));
        }
        else if (touches.length == 1) {
            var delta = event.getDelta();
            this.target.x += delta.x;
            this.target.y += delta.y;
            //判断左边距离
            var zoneLeft = this.zone.x - this.zone.width / 2;
            var zoneRight = this.zone.x + this.zone.width / 2;
            var zoneTop = this.zone.y + this.zone.height / 2;
            var zoneBottom = this.zone.y - this.zone.height / 2;
            var halfMapWidth = this.target.width / 2;
            var halfMapHeight = this.target.height / 2;
            //左边
            if (this.target.x - halfMapWidth > zoneLeft) {
                this.target.x = zoneLeft + halfMapWidth;
            }
            //右边
            if (this.target.x + halfMapWidth < zoneRight) {
                this.target.x = zoneRight - halfMapWidth;
            }
            //上边
            if (this.target.y + halfMapHeight < zoneTop) {
                this.target.y = zoneTop - halfMapHeight;
            }
            //下边
            if (this.target.y - halfMapHeight > zoneBottom) {
                this.target.y = zoneBottom + halfMapHeight;
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], Tutorials.prototype, "target", void 0);
    __decorate([
        property(cc.Node)
    ], Tutorials.prototype, "zone", void 0);
    Tutorials = __decorate([
        ccclass
    ], Tutorials);
    return Tutorials;
}(cc.Component));
exports.default = Tutorials;

cc._RF.pop();