
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Game/mapmove.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcR2FtZVxcbWFwbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXlIQztRQXRIRyxZQUFNLEdBQVcsSUFBSSxDQUFDO1FBRXRCLFVBQUksR0FBVSxJQUFJLENBQUMsQ0FBQSxXQUFXO1FBQzlCLFlBQU0sR0FBUyxJQUFJLENBQUE7UUFFbkIsY0FBUSxHQUFDLElBQUksQ0FBQTs7SUFpSGpCLENBQUM7SUFoSEcsMEJBQU0sR0FBTjtRQUNJLE9BQU07UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9CLCtCQUErQjtRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0ssSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELDhCQUFVLEdBQVYsVUFBVyxLQUFLO1FBRVosSUFBSSxPQUFPLEdBQUcs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QUFNLENBQUMsQ0FBQyxHQUFHLGFBQWEsR0FBRyxPQUFPLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxhQUFhLENBQUM7YUFDM0M7WUFDRCxJQUFJO1lBQ0osSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxhQUFhLEdBQUcsVUFBVSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsYUFBYSxDQUFDO2FBQzlDO1NBRUo7SUFDTCxDQUFDO0lBckhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ0k7SUFFdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDQztJQUxGLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0F5SDdCO0lBQUQsZ0JBQUM7Q0F6SEQsQUF5SEMsQ0F6SHNDLEVBQUUsQ0FBQyxTQUFTLEdBeUhsRDtrQkF6SG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1dG9yaWFscyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0YXJnZXQ6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHpvbmU6Y2MuTm9kZT0gbnVsbDsvLyDlrr3pq5jlsLHmmK/mi5bmi73ljLrln59cclxuICAgIHBhcmVudDpjYy5Ob2RlPW51bGxcclxuXHJcbiAgICBiZ09yaWdpbj1udWxsXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSB0aGlzLm5vZGUucGFyZW50O1xyXG4gICAgICAgIC8vIHRoaXMuYmdPcmlnaW4gPSBjYy52MigwLCAwKTtcclxuICAgICAgICB0aGlzLmJnT3JpZ2luID0gdGhpcy50YXJnZXQucG9zaXRpb24uc3ViKGNjLnYzKHRoaXMudGFyZ2V0LndpZHRoICogdGhpcy50YXJnZXQuYW5jaG9yWCAqIHRoaXMudGFyZ2V0LnNjYWxlWCwgdGhpcy50YXJnZXQuaGVpZ2h0ICogdGhpcy50YXJnZXQuYW5jaG9yWSAqIHRoaXMudGFyZ2V0LnNjYWxlWSwwKSk7XHJcbiAgICAgICAgdGhpcy50YXJnZXQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5fdG91Y2hNb3ZlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBfdG91Y2hNb3ZlKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCB0b3VjaGVzID0gZXZlbnQuZ2V0VG91Y2hlcygpO1xyXG4gICAgICAgIGlmICh0b3VjaGVzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAgXHJcbiAgICAgICAgICAgIGxldCB0b3VjaDEgPSB0b3VjaGVzWzBdLFxyXG4gICAgICAgICAgICAgICAgdG91Y2gyID0gdG91Y2hlc1sxXSxcclxuICAgICAgICAgICAgICAgIGRlbHRhMSA9IHRvdWNoMS5nZXREZWx0YSgpLFxyXG4gICAgICAgICAgICAgICAgZGVsdGEyID0gdG91Y2gyLmdldERlbHRhKCk7XHJcblxyXG4gICAgICAgICAgICAvLyDlvpfliLDlvZPliY3kuKTop6bmkbjngrkg6L2s5YiwcGFyZW505LiL5Z2Q5qCHXHJcbiAgICAgICAgICAgIGxldCB0b3VjaFBvaW50MSA9IHRoaXMucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoMS5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICAgICAgbGV0IHRvdWNoUG9pbnQyID0gdGhpcy5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodG91Y2gyLmdldExvY2F0aW9uKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8g6L2s5o2i5Li65Z2Q5qCHIOi/m+ihjOWQkemHj+iuoeeul1xyXG4gICAgICAgICAgICB0b3VjaFBvaW50MSA9IGNjLnYyKHRvdWNoUG9pbnQxLngsIHRvdWNoUG9pbnQxLnkpO1xyXG4gICAgICAgICAgICB0b3VjaFBvaW50MiA9IGNjLnYyKHRvdWNoUG9pbnQyLngsIHRvdWNoUG9pbnQyLnkpO1xyXG5cclxuICAgICAgICAgICAgLy8g5Lik6Kem5pG454K55LiO5Y6f54K555qE5beu5ZCR6YeP77yMcG9pbnRWZWMx5ZKMcG9pbnRWZWMy5piv55u45a+55LqOYmdTcHJpdGXnmoTkvY3nva5cclxuICAgICAgICAgICAgbGV0IHBvaW50VmVjMSA9IHRvdWNoUG9pbnQxLnN1Yih0aGlzLmJnT3JpZ2luKTtcclxuICAgICAgICAgICAgbGV0IHBvaW50VmVjMiA9IHRvdWNoUG9pbnQyLnN1Yih0aGlzLmJnT3JpZ2luKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOS4pOinpuaRuOeCueeahOebuOWvueS4reeCuVxyXG4gICAgICAgICAgICBsZXQgcmVsTWlkeCA9IChwb2ludFZlYzEueCArIHBvaW50VmVjMi54KSAvIDI7XHJcbiAgICAgICAgICAgIGxldCByZWxNaWR5ID0gKHBvaW50VmVjMS55ICsgcG9pbnRWZWMyLnkpIC8gMjtcclxuXHJcbiAgICAgICAgICAgIC8vIOiuoeeul2JnU3ByaXRl55qE6ZSa54K5XHJcbiAgICAgICAgICAgIGxldCBhbmNob3JYID0gcmVsTWlkeCAvICh0aGlzLnRhcmdldC53aWR0aCAqIHRoaXMudGFyZ2V0LnNjYWxlKTtcclxuICAgICAgICAgICAgbGV0IGFuY2hvclkgPSByZWxNaWR5IC8gKHRoaXMudGFyZ2V0LmhlaWdodCAqIHRoaXMudGFyZ2V0LnNjYWxlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIOebuOWvueWxj+W5leeahOS4reeCuVxyXG4gICAgICAgICAgICBsZXQgYWJzTWlkeCA9ICh0b3VjaFBvaW50Mi54ICsgdG91Y2hQb2ludDEueCkgLyAyO1xyXG4gICAgICAgICAgICBsZXQgYWJzTWlkeSA9ICh0b3VjaFBvaW50Mi55ICsgdG91Y2hQb2ludDEueSkgLyAyO1xyXG5cclxuICAgICAgICAgICAgLy8g6YeN6K6+YmdTcHJpdGXplJrngrnlkozkvY3nva5cclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuYW5jaG9yWCA9IGFuY2hvclg7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFuY2hvclkgPSBhbmNob3JZO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50YXJnZXQueCA9IGFic01pZHg7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnkgPSBhYnNNaWR5O1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5zdGFydFBvaW50ID0gY2MudjIoZXZlbnQuZ2V0TG9jYXRpb24oKS54LGV2ZW50LmdldExvY2F0aW9uKCkueSk7IC8v5Y+W6LW35aeL54K55ZCR6YePXHJcbiAgICAgICAgICAgIC8vIHRoaXMuZW5kUG9pbnQgPSBjYy52MihldmVudC5nZXRMb2NhdGlvbigpLngsZXZlbnQuZ2V0TG9jYXRpb24oKS55KTsgLy/lj5bnu4jngrnlkJHph49cclxuICAgICAgICAgICAgLy8gbGV0IHZlYyA9IHRoaXMuZW5kUG9pbnQuc3ViKHRoaXMuc3RhcnRQb2ludCk7IC8v5ZCR6YeP55u45YeP77yM5b6X5Yiw55uu5qCH5ZCR6YePXHJcbiAgICAgICAgICAgIC8vIGxldCBkaXN0YW5jZSA9IHZlYy5tYWcoKTsgLy/lj5blkJHph4/nmoTmqKHplb9cclxuXHJcbiAgICAgICAgICAgIC8v57yp5pS+XHJcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZXZlYyA9IHRvdWNoUG9pbnQyLnN1Yih0b3VjaFBvaW50MSlcclxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gZGlzdGFuY2V2ZWMvLy5tYWcoKS8vY2MucFN1Yih0b3VjaFBvaW50MSwgdG91Y2hQb2ludDIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRlbHRhdmVjID0gZGVsdGEyLnN1YihkZWx0YTEpXHJcbiAgICAgICAgICAgIGxldCBkZWx0YSA9ZGVsdGF2ZWMvLy5tYWcoKSAvL2NjLnBTdWIoZGVsdGExLCBkZWx0YTIpO1xyXG4gICAgICAgICAgICBsZXQgc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UueCkgPiBNYXRoLmFicyhkaXN0YW5jZS55KSkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAoZGlzdGFuY2UueCArIGRlbHRhLngpIC8gZGlzdGFuY2UueCAqIHRoaXMudGFyZ2V0LnNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2NhbGUgPSAoZGlzdGFuY2UueSArIGRlbHRhLnkpIC8gZGlzdGFuY2UueSAqIHRoaXMudGFyZ2V0LnNjYWxlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihzY2FsZTwxKXtcclxuICAgICAgICAgICAgICAgIHNjYWxlPTFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihzY2FsZT4yKXtcclxuICAgICAgICAgICAgICAgIHNjYWxlPTJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zY2FsZSA9IHNjYWxlIDwgMC4xID8gMC4xIDogc2NhbGU7XHJcbiAgICAgICAgICAgIC8vIOabtOaWsOWOn+eCueS9jee9rlxyXG4gICAgICAgICAgICB0aGlzLmJnT3JpZ2luID0gY2MudjIoYWJzTWlkeCwgYWJzTWlkeSkuc3ViKGNjLnYyKHRoaXMudGFyZ2V0LndpZHRoICogYW5jaG9yWCAqIHRoaXMudGFyZ2V0LnNjYWxlWCwgdGhpcy50YXJnZXQuaGVpZ2h0ICogYW5jaG9yWSAqIHRoaXMudGFyZ2V0LnNjYWxlWSkpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRvdWNoZXMubGVuZ3RoID09IDEpIHtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGVsdGEgPSBldmVudC5nZXREZWx0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC54ICs9IGRlbHRhLng7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnkgKz0gZGVsdGEueTtcclxuICAgICAgICAgICAgLy/liKTmlq3lt6bovrnot53nprtcclxuICAgICAgICAgICAgbGV0IHpvbmVMZWZ0ID0gdGhpcy56b25lLnggLSB0aGlzLnpvbmUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgem9uZVJpZ2h0ID0gdGhpcy56b25lLnggKyB0aGlzLnpvbmUud2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgem9uZVRvcCA9IHRoaXMuem9uZS55ICsgdGhpcy56b25lLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGxldCB6b25lQm90dG9tID0gdGhpcy56b25lLnkgLSB0aGlzLnpvbmUuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICAgICAgICAgIGxldCBoYWxmTWFwV2lkdGggPSB0aGlzLnRhcmdldC53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBoYWxmTWFwSGVpZ2h0ID0gdGhpcy50YXJnZXQuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICAgICAgICAgIC8v5bem6L65XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC54IC0gaGFsZk1hcFdpZHRoID4gem9uZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnggPSB6b25lTGVmdCArIGhhbGZNYXBXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WPs+i+uVxyXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQueCArIGhhbGZNYXBXaWR0aCA8IHpvbmVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQueCA9IHpvbmVSaWdodCAtIGhhbGZNYXBXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+S4iui+uVxyXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXQueSArIGhhbGZNYXBIZWlnaHQgPCB6b25lVG9wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC55ID0gem9uZVRvcCAtIGhhbGZNYXBIZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/kuIvovrlcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0LnkgLSBoYWxmTWFwSGVpZ2h0ID4gem9uZUJvdHRvbSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQueSA9IHpvbmVCb3R0b20gKyBoYWxmTWFwSGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==