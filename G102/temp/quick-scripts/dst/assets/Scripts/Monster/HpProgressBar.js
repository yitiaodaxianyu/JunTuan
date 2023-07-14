
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Monster/HpProgressBar.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '40fd4JjmHBO/p0Y5ISMPuVd', 'HpProgressBar');
// Scripts/Monster/HpProgressBar.ts

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
var HpProgressBar = /** @class */ (function (_super) {
    __extends(HpProgressBar, _super);
    function HpProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.yellow = null;
        _this.min_width = 17;
        _this.min_pro = 0.2;
        _this.speed = 56;
        _this.is_need_hide = true;
        return _this;
    }
    HpProgressBar.prototype.onLoad = function () {
        this.yellow = this.node.getChildByName('yellow');
        this.min_pro = this.min_width / this.totalLength;
    };
    HpProgressBar.prototype.changeProgress = function (num) {
        if (this.is_need_hide) {
            if (num >= 1 || num <= 0) {
                this.node.opacity = 0;
            }
            else {
                this.node.opacity = 255;
            }
        }
        if (num < this.min_pro) {
            num = this.min_pro;
        }
        this.progress = num;
    };
    HpProgressBar.prototype.setPos = function (x, y) {
        this.node.x = x;
        this.node.y = y;
        var z = Math.round(8000 - this.node.y * 10);
        if (z < 0) {
            z = 0;
        }
        if (z > 8000) {
            z = 8000;
        }
        this.node.zIndex = z;
    };
    //显示黄色
    HpProgressBar.prototype.update = function (dt) {
        var curWidth = this.progress * this.totalLength;
        if (this.yellow.width > curWidth) {
            this.yellow.width -= this.speed * dt;
            if (this.yellow.width < curWidth) {
                this.yellow.width = curWidth;
            }
        }
        else if (this.yellow.width < curWidth) {
            this.yellow.width = curWidth;
        }
    };
    __decorate([
        property()
    ], HpProgressBar.prototype, "min_width", void 0);
    __decorate([
        property()
    ], HpProgressBar.prototype, "min_pro", void 0);
    __decorate([
        property()
    ], HpProgressBar.prototype, "speed", void 0);
    __decorate([
        property()
    ], HpProgressBar.prototype, "is_need_hide", void 0);
    HpProgressBar = __decorate([
        ccclass
    ], HpProgressBar);
    return HpProgressBar;
}(cc.ProgressBar));
exports.default = HpProgressBar;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTW9uc3RlclxcSHBQcm9ncmVzc0Jhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBYztJQUF6RDtRQUFBLHFFQW1FQztRQWpFRyxZQUFNLEdBQVMsSUFBSSxDQUFDO1FBRXBCLGVBQVMsR0FBUSxFQUFFLENBQUM7UUFFcEIsYUFBTyxHQUFRLEdBQUcsQ0FBQztRQUVuQixXQUFLLEdBQVEsRUFBRSxDQUFDO1FBRWhCLGtCQUFZLEdBQVMsSUFBSSxDQUFDOztJQXlEOUIsQ0FBQztJQXZERyw4QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNqRCxDQUFDO0lBRUQsc0NBQWMsR0FBZCxVQUFlLEdBQVU7UUFFckIsSUFBRyxJQUFJLENBQUMsWUFBWSxFQUNwQjtZQUNJLElBQUcsR0FBRyxJQUFFLENBQUMsSUFBSSxHQUFHLElBQUUsQ0FBQyxFQUNuQjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7YUFDdkI7aUJBQ0Q7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxJQUFHLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxFQUNuQjtZQUNJLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUM7SUFDdEIsQ0FBQztJQUVELDhCQUFNLEdBQU4sVUFBTyxDQUFRLEVBQUMsQ0FBUTtRQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNyQyxJQUFHLENBQUMsR0FBQyxDQUFDLEVBQUM7WUFDSCxDQUFDLEdBQUMsQ0FBQyxDQUFDO1NBQ1A7UUFDRCxJQUFHLENBQUMsR0FBQyxJQUFJLEVBQUM7WUFDTixDQUFDLEdBQUMsSUFBSSxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELE1BQU07SUFDTiw4QkFBTSxHQUFOLFVBQU8sRUFBRTtRQUVMLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLFFBQVEsRUFDN0I7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBRSxJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQztZQUNqQyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLFFBQVEsRUFDN0I7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUMsUUFBUSxDQUFDO2FBQzlCO1NBQ0o7YUFBSyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFDLFFBQVEsRUFDbkM7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBQyxRQUFRLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBOUREO1FBREMsUUFBUSxFQUFFO29EQUNTO0lBRXBCO1FBREMsUUFBUSxFQUFFO2tEQUNRO0lBRW5CO1FBREMsUUFBUSxFQUFFO2dEQUNLO0lBRWhCO1FBREMsUUFBUSxFQUFFO3VEQUNlO0lBVlQsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQW1FakM7SUFBRCxvQkFBQztDQW5FRCxBQW1FQyxDQW5FMEMsRUFBRSxDQUFDLFdBQVcsR0FtRXhEO2tCQW5Fb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhwUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBjYy5Qcm9ncmVzc0JhciB7XHJcblxyXG4gICAgeWVsbG93OmNjLk5vZGU9bnVsbDtcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBtaW5fd2lkdGg6bnVtYmVyPTE3OyAgXHJcbiAgICBAcHJvcGVydHkoKSAgXHJcbiAgICBtaW5fcHJvOm51bWJlcj0wLjI7XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgc3BlZWQ6bnVtYmVyPTU2O1xyXG4gICAgQHByb3BlcnR5KClcclxuICAgIGlzX25lZWRfaGlkZTpib29sZWFuPXRydWU7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnllbGxvdz10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3llbGxvdycpO1xyXG4gICAgICAgIHRoaXMubWluX3Bybz10aGlzLm1pbl93aWR0aC90aGlzLnRvdGFsTGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVByb2dyZXNzKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc19uZWVkX2hpZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihudW0+PTEgfHwgbnVtPD0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0wO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICBpZihudW08dGhpcy5taW5fcHJvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPXRoaXMubWluX3BybztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcz1udW07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UG9zKHg6bnVtYmVyLHk6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS54PXg7XHJcbiAgICAgICAgdGhpcy5ub2RlLnk9eTtcclxuICAgICAgICBsZXQgej1NYXRoLnJvdW5kKDgwMDAtdGhpcy5ub2RlLnkqMTApXHJcbiAgICAgICAgaWYoejwwKXtcclxuICAgICAgICAgICAgej0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih6PjgwMDApe1xyXG4gICAgICAgICAgICB6PTgwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS56SW5kZXg9ejtcclxuICAgIH1cclxuXHJcbiAgICAvL+aYvuekuum7hOiJslxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjdXJXaWR0aD10aGlzLnByb2dyZXNzKnRoaXMudG90YWxMZW5ndGg7XHJcbiAgICAgICAgaWYodGhpcy55ZWxsb3cud2lkdGg+Y3VyV2lkdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnllbGxvdy53aWR0aC09dGhpcy5zcGVlZCpkdDtcclxuICAgICAgICAgICAgaWYodGhpcy55ZWxsb3cud2lkdGg8Y3VyV2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueWVsbG93LndpZHRoPWN1cldpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYodGhpcy55ZWxsb3cud2lkdGg8Y3VyV2lkdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnllbGxvdy53aWR0aD1jdXJXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19