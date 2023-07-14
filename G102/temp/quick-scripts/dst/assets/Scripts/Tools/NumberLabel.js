
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Tools/NumberLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1f7doqXqhJmLtuxqxNrD53', 'NumberLabel');
// Scripts/Tools/NumberLabel.ts

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
var MyTool_1 = require("./MyTool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NumberLabel = /** @class */ (function (_super) {
    __extends(NumberLabel, _super);
    function NumberLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**当前数字 */
        _this.cur_num = 2000;
        /**目标数字 */
        _this.target_num = 2000;
        /**完成当前数字变化至目标数字所需的时间 秒 */
        _this.compelete_num = 0.5;
        /**每帧的变化值 */
        _this.changing = 0;
        _this.refresh_time = 0.05;
        _this.jishi = 0;
        _this.is_show_k = true;
        return _this;
    }
    // 初始化文本
    NumberLabel.prototype.init = function (num, isShowK) {
        this.cur_num = this.target_num = num;
        this.is_show_k = isShowK;
        this.showCurNum();
    };
    // 设置文本特效
    NumberLabel.prototype.setTarget = function (num, compeleteTime, isScale) {
        if (isScale === void 0) { isScale = false; }
        this.target_num = num;
        var totalFrame = Math.ceil(compeleteTime / cc.director.getDeltaTime());
        var offsetNum = this.target_num - this.cur_num;
        this.changing = offsetNum / totalFrame;
        if (isScale && this.target_num != this.cur_num) {
            var scaleTo = 1.2;
            var averageTime = compeleteTime / 6;
            cc.tween(this.node).to(averageTime, { scale: scaleTo }).to(averageTime, { scale: 1.0 }).to(averageTime, { scale: scaleTo }).to(averageTime, { scale: 1.0 }).to(averageTime, { scale: scaleTo }).to(averageTime, { scale: 1.0 }).start();
        }
    };
    NumberLabel.prototype.showCurNum = function () {
        if (this.is_show_k)
            this.string = MyTool_1.default.getCoinDanwei(this.cur_num, 1);
        else {
            this.string = this.cur_num + "";
        }
    };
    NumberLabel.prototype.update = function (dt) {
        if (this.cur_num != this.target_num) {
            this.jishi += dt;
            this.cur_num = Math.ceil(this.cur_num + this.changing);
            if (this.jishi >= this.refresh_time) {
                this.jishi = 0;
                this.showCurNum();
            }
            var offsetNum = this.target_num - this.cur_num;
            if (Math.abs(offsetNum) < Math.abs(this.changing)) {
                this.cur_num = this.target_num;
                this.showCurNum();
            }
        }
    };
    NumberLabel = __decorate([
        ccclass
    ], NumberLabel);
    return NumberLabel;
}(cc.Label));
exports.default = NumberLabel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVG9vbHNcXE51bWJlckxhYmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUE4QjtBQUd4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUF5QywrQkFBUTtJQUFqRDtRQUFBLHFFQXVEQztRQXJERyxVQUFVO1FBQ1YsYUFBTyxHQUFRLElBQUksQ0FBQztRQUNwQixVQUFVO1FBQ1YsZ0JBQVUsR0FBUSxJQUFJLENBQUM7UUFDdkIsMEJBQTBCO1FBQzFCLG1CQUFhLEdBQVEsR0FBRyxDQUFDO1FBQ3pCLFlBQVk7UUFDSixjQUFRLEdBQVEsQ0FBQyxDQUFDO1FBQzFCLGtCQUFZLEdBQVEsSUFBSSxDQUFDO1FBQ3pCLFdBQUssR0FBUSxDQUFDLENBQUM7UUFDZixlQUFTLEdBQVMsSUFBSSxDQUFDOztJQTJDM0IsQ0FBQztJQTFDRyxRQUFRO0lBQ1IsMEJBQUksR0FBSixVQUFNLEdBQVUsRUFBQyxPQUFlO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxTQUFTO0lBQ1QsK0JBQVMsR0FBVCxVQUFVLEdBQVUsRUFBQyxhQUFvQixFQUFDLE9BQXFCO1FBQXJCLHdCQUFBLEVBQUEsZUFBcUI7UUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksU0FBUyxHQUFDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFDLFNBQVMsR0FBQyxVQUFVLENBQUM7UUFDbkMsSUFBRyxPQUFPLElBQUUsSUFBSSxDQUFDLFVBQVUsSUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ3RDLElBQUksT0FBTyxHQUFDLEdBQUcsQ0FBQztZQUNoQixJQUFJLFdBQVcsR0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDO1lBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBQyxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFDLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ25OO0lBQ0wsQ0FBQztJQUVELGdDQUFVLEdBQVY7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBQyxnQkFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO1lBQ0EsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUcsSUFBSSxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQzdCLElBQUksQ0FBQyxLQUFLLElBQUUsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUcsSUFBSSxDQUFDLEtBQUssSUFBRSxJQUFJLENBQUMsWUFBWSxFQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7WUFDRCxJQUFJLFNBQVMsR0FBQyxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDM0MsSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDO2dCQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtTQUNKO0lBQ0wsQ0FBQztJQXREZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXVEL0I7SUFBRCxrQkFBQztDQXZERCxBQXVEQyxDQXZEd0MsRUFBRSxDQUFDLEtBQUssR0F1RGhEO2tCQXZEb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNeVRvb2wgZnJvbSBcIi4vTXlUb29sXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlckxhYmVsIGV4dGVuZHMgY2MuTGFiZWwge1xyXG5cclxuICAgIC8qKuW9k+WJjeaVsOWtlyAqL1xyXG4gICAgY3VyX251bTpudW1iZXI9MjAwMDtcclxuICAgIC8qKuebruagh+aVsOWtlyAqL1xyXG4gICAgdGFyZ2V0X251bTpudW1iZXI9MjAwMDtcclxuICAgIC8qKuWujOaIkOW9k+WJjeaVsOWtl+WPmOWMluiHs+ebruagh+aVsOWtl+aJgOmcgOeahOaXtumXtCDnp5IgKi9cclxuICAgIGNvbXBlbGV0ZV9udW06bnVtYmVyPTAuNTtcclxuICAgIC8qKuavj+W4p+eahOWPmOWMluWAvCAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2luZzpudW1iZXI9MDtcclxuICAgIHJlZnJlc2hfdGltZTpudW1iZXI9MC4wNTtcclxuICAgIGppc2hpOm51bWJlcj0wO1xyXG4gICAgaXNfc2hvd19rOmJvb2xlYW49dHJ1ZTtcclxuICAgIC8vIOWIneWni+WMluaWh+acrFxyXG4gICAgaW5pdCAobnVtOm51bWJlcixpc1Nob3dLOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmN1cl9udW09dGhpcy50YXJnZXRfbnVtPW51bTtcclxuICAgICAgICB0aGlzLmlzX3Nob3dfaz1pc1Nob3dLO1xyXG4gICAgICAgIHRoaXMuc2hvd0N1ck51bSgpO1xyXG4gICAgfVxyXG4gICAgLy8g6K6+572u5paH5pys54m55pWIXHJcbiAgICBzZXRUYXJnZXQobnVtOm51bWJlcixjb21wZWxldGVUaW1lOm51bWJlcixpc1NjYWxlOmJvb2xlYW49ZmFsc2Upe1xyXG4gICAgICAgIHRoaXMudGFyZ2V0X251bT1udW07XHJcbiAgICAgICAgbGV0IHRvdGFsRnJhbWU9TWF0aC5jZWlsKGNvbXBlbGV0ZVRpbWUvY2MuZGlyZWN0b3IuZ2V0RGVsdGFUaW1lKCkpO1xyXG4gICAgICAgIGxldCBvZmZzZXROdW09dGhpcy50YXJnZXRfbnVtLXRoaXMuY3VyX251bTtcclxuICAgICAgICB0aGlzLmNoYW5naW5nPW9mZnNldE51bS90b3RhbEZyYW1lO1xyXG4gICAgICAgIGlmKGlzU2NhbGUmJnRoaXMudGFyZ2V0X251bSE9dGhpcy5jdXJfbnVtKXtcclxuICAgICAgICAgICAgbGV0IHNjYWxlVG89MS4yO1xyXG4gICAgICAgICAgICBsZXQgYXZlcmFnZVRpbWU9Y29tcGVsZXRlVGltZS82O1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKGF2ZXJhZ2VUaW1lLHtzY2FsZTpzY2FsZVRvfSkudG8oYXZlcmFnZVRpbWUse3NjYWxlOjEuMH0pLnRvKGF2ZXJhZ2VUaW1lLHtzY2FsZTpzY2FsZVRvfSkudG8oYXZlcmFnZVRpbWUse3NjYWxlOjEuMH0pLnRvKGF2ZXJhZ2VUaW1lLHtzY2FsZTpzY2FsZVRvfSkudG8oYXZlcmFnZVRpbWUse3NjYWxlOjEuMH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dDdXJOdW0oKXtcclxuICAgICAgICBpZih0aGlzLmlzX3Nob3dfaylcclxuICAgICAgICAgICAgdGhpcy5zdHJpbmc9TXlUb29sLmdldENvaW5EYW53ZWkodGhpcy5jdXJfbnVtLDEpO1xyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3RyaW5nPXRoaXMuY3VyX251bStcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfbnVtIT10aGlzLnRhcmdldF9udW0pe1xyXG4gICAgICAgICAgICB0aGlzLmppc2hpKz1kdDtcclxuICAgICAgICAgICAgdGhpcy5jdXJfbnVtPU1hdGguY2VpbCh0aGlzLmN1cl9udW0rdGhpcy5jaGFuZ2luZyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuamlzaGk+PXRoaXMucmVmcmVzaF90aW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuamlzaGk9MDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0N1ck51bSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXROdW09dGhpcy50YXJnZXRfbnVtLXRoaXMuY3VyX251bTsgIFxyXG4gICAgICAgICAgICBpZihNYXRoLmFicyhvZmZzZXROdW0pPE1hdGguYWJzKHRoaXMuY2hhbmdpbmcpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyX251bT10aGlzLnRhcmdldF9udW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDdXJOdW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=