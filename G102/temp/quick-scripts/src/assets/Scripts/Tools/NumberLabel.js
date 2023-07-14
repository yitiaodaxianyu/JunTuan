"use strict";
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