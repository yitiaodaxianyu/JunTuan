
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/UI/home/JianTou.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90fc5isqodKz4y0kphbSIwv', 'JianTou');
// Scripts/UI/home/JianTou.ts

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
var AudioConstants_1 = require("../../Sound/AudioConstants");
var MainUi_1 = require("./MainUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JianTou_Dir;
(function (JianTou_Dir) {
    JianTou_Dir[JianTou_Dir["UP"] = 0] = "UP";
    JianTou_Dir[JianTou_Dir["DOWN"] = 1] = "DOWN";
})(JianTou_Dir || (JianTou_Dir = {}));
var JianTou = /** @class */ (function (_super) {
    __extends(JianTou, _super);
    function JianTou() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_jiantou_type = Constants_1.JianTou_Type.LEFT;
        _this.cur_jiantou_dir = JianTou_Dir.DOWN;
        _this.follow_target = null;
        //遮罩
        _this.mask_btns = null;
        return _this;
    }
    JianTou.prototype.onLoad = function () {
        this.follow_target = this.node.parent;
        this.mask_btns = this.follow_target.getChildByName('btns');
        // this.clickBtnJiantou();
    };
    JianTou.prototype.onEnable = function () {
        //this.setDir(JianTou_Dir.DOWN);
    };
    JianTou.prototype.setDir = function (dir) {
        switch (dir) {
            case JianTou_Dir.UP:
                {
                    this.node.angle = 0;
                    this.cur_jiantou_dir = JianTou_Dir.UP;
                }
                break;
            case JianTou_Dir.DOWN:
                {
                    this.node.angle = 180;
                    this.cur_jiantou_dir = JianTou_Dir.DOWN;
                }
                break;
        }
    };
    JianTou.prototype.clickBtnJiantou = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var mainUi = cc.find('Canvas/main_ui').getComponent(MainUi_1.default);
        switch (this.cur_jiantou_type) {
            case Constants_1.JianTou_Type.LEFT:
                {
                    switch (this.cur_jiantou_dir) {
                        case JianTou_Dir.UP:
                            {
                                this.setDir(JianTou_Dir.DOWN);
                                mainUi.doFolded(this.cur_jiantou_type);
                            }
                            break;
                        case JianTou_Dir.DOWN:
                            {
                                this.setDir(JianTou_Dir.UP);
                                mainUi.doUnfold(this.cur_jiantou_type);
                            }
                            break;
                    }
                }
                break;
            case Constants_1.JianTou_Type.RIGHT:
                {
                    switch (this.cur_jiantou_dir) {
                        case JianTou_Dir.UP:
                            {
                                this.setDir(JianTou_Dir.DOWN);
                                mainUi.doFolded(this.cur_jiantou_type);
                            }
                            break;
                        case JianTou_Dir.DOWN:
                            {
                                this.setDir(JianTou_Dir.UP);
                                mainUi.doUnfold(this.cur_jiantou_type);
                            }
                            break;
                    }
                }
                break;
        }
    };
    JianTou.prototype.update = function () {
        if (this.follow_target) {
            this.node.y = -this.follow_target.height + 48;
            if (this.mask_btns) {
                this.mask_btns.height = this.follow_target.height; //有箭头需要减去箭头的高度
            }
        }
    };
    __decorate([
        property({ type: cc.Enum(Constants_1.JianTou_Type) })
    ], JianTou.prototype, "cur_jiantou_type", void 0);
    JianTou = __decorate([
        ccclass
    ], JianTou);
    return JianTou;
}(cc.Component));
exports.default = JianTou;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcVUlcXGhvbWVcXEppYW5Ub3UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQy9DLGlEQUE0QztBQUM1Qyw2REFBd0Q7QUFDeEQsbUNBQThCO0FBRXhCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRTFDLElBQUssV0FHSjtBQUhELFdBQUssV0FBVztJQUNaLHlDQUFNLENBQUE7SUFDTiw2Q0FBUSxDQUFBO0FBQ1osQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFFRDtJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQWlGQztRQTlFRyxzQkFBZ0IsR0FBYyx3QkFBWSxDQUFDLElBQUksQ0FBQztRQUVoRCxxQkFBZSxHQUFhLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDN0MsbUJBQWEsR0FBUyxJQUFJLENBQUM7UUFDM0IsSUFBSTtRQUNKLGVBQVMsR0FBUyxJQUFJLENBQUM7O0lBeUUzQixDQUFDO0lBdkVHLHdCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsMEJBQTBCO0lBQzlCLENBQUM7SUFFRCwwQkFBUSxHQUFSO1FBRUksZ0NBQWdDO0lBQ3BDLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sR0FBZTtRQUVsQixRQUFPLEdBQUcsRUFDVjtZQUNJLEtBQUssV0FBVyxDQUFDLEVBQUU7Z0JBQUM7b0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO2lCQUN2QztnQkFBQSxNQUFNO1lBQ1AsS0FBSyxXQUFXLENBQUMsSUFBSTtnQkFBQztvQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDO29CQUNwQixJQUFJLENBQUMsZUFBZSxHQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7aUJBQ3pDO2dCQUFBLE1BQU07U0FDVjtJQUNMLENBQUM7SUFFRCxpQ0FBZSxHQUFmO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxnQkFBTSxDQUFDLENBQUM7UUFDMUQsUUFBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQzVCO1lBQ0ksS0FBSyx3QkFBWSxDQUFDLElBQUk7Z0JBQUM7b0JBQ25CLFFBQU8sSUFBSSxDQUFDLGVBQWUsRUFDM0I7d0JBQ0ksS0FBSyxXQUFXLENBQUMsRUFBRTs0QkFBQztnQ0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7NkJBQzFDOzRCQUFBLE1BQU07d0JBQ1AsS0FBSyxXQUFXLENBQUMsSUFBSTs0QkFBQztnQ0FDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7NkJBQzFDOzRCQUFBLE1BQU07cUJBQ1Y7aUJBQ0o7Z0JBQUEsTUFBTTtZQUNQLEtBQUssd0JBQVksQ0FBQyxLQUFLO2dCQUFDO29CQUNwQixRQUFPLElBQUksQ0FBQyxlQUFlLEVBQzNCO3dCQUNJLEtBQUssV0FBVyxDQUFDLEVBQUU7NEJBQUM7Z0NBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzZCQUMxQzs0QkFBQSxNQUFNO3dCQUNQLEtBQUssV0FBVyxDQUFDLElBQUk7NEJBQUM7Z0NBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dDQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzZCQUMxQzs0QkFBQSxNQUFNO3FCQUNWO2lCQUNKO2dCQUFBLE1BQU07U0FDVjtJQUNMLENBQUM7SUFFRCx3QkFBTSxHQUFOO1FBQ0ksSUFBRyxJQUFJLENBQUMsYUFBYSxFQUNyQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDO1lBQzFDLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFDakI7Z0JBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxjQUFjO2FBQ2pFO1NBQ0o7SUFDTCxDQUFDO0lBN0VEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQVksQ0FBQyxFQUFDLENBQUM7cURBQ1M7SUFIL0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQWlGM0I7SUFBRCxjQUFDO0NBakZELEFBaUZDLENBakZvQyxFQUFFLENBQUMsU0FBUyxHQWlGaEQ7a0JBakZvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSmlhblRvdV9UeXBlIH0gZnJvbSBcIi4uLy4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uLy4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IE1haW5VaSBmcm9tIFwiLi9NYWluVWlcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZW51bSBKaWFuVG91X0RpcntcclxuICAgIFVQID0gMCxcclxuICAgIERPV04gPSAxLFxyXG59XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEppYW5Ub3UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKEppYW5Ub3VfVHlwZSl9KVxyXG4gICAgY3VyX2ppYW50b3VfdHlwZTpKaWFuVG91X1R5cGU9SmlhblRvdV9UeXBlLkxFRlQ7XHJcblxyXG4gICAgY3VyX2ppYW50b3VfZGlyOkppYW5Ub3VfRGlyPUppYW5Ub3VfRGlyLkRPV047XHJcbiAgICBmb2xsb3dfdGFyZ2V0OmNjLk5vZGU9bnVsbDtcclxuICAgIC8v6YGu572pXHJcbiAgICBtYXNrX2J0bnM6Y2MuTm9kZT1udWxsO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5mb2xsb3dfdGFyZ2V0PXRoaXMubm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgdGhpcy5tYXNrX2J0bnM9dGhpcy5mb2xsb3dfdGFyZ2V0LmdldENoaWxkQnlOYW1lKCdidG5zJyk7XHJcbiAgICAgICAgLy8gdGhpcy5jbGlja0J0bkppYW50b3UoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy90aGlzLnNldERpcihKaWFuVG91X0Rpci5ET1dOKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXIoZGlyOkppYW5Ub3VfRGlyKVxyXG4gICAge1xyXG4gICAgICAgIHN3aXRjaChkaXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEppYW5Ub3VfRGlyLlVQOntcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZT0wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJfamlhbnRvdV9kaXI9SmlhblRvdV9EaXIuVVA7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBKaWFuVG91X0Rpci5ET1dOOntcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmdsZT0xODA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9qaWFudG91X2Rpcj1KaWFuVG91X0Rpci5ET1dOO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuSmlhbnRvdSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTtcclxuICAgICAgICBsZXQgbWFpblVpPWNjLmZpbmQoJ0NhbnZhcy9tYWluX3VpJykuZ2V0Q29tcG9uZW50KE1haW5VaSk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2ppYW50b3VfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgSmlhblRvdV9UeXBlLkxFRlQ6e1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2ppYW50b3VfZGlyKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSmlhblRvdV9EaXIuVVA6e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcihKaWFuVG91X0Rpci5ET1dOKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblVpLmRvRm9sZGVkKHRoaXMuY3VyX2ppYW50b3VfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSmlhblRvdV9EaXIuRE9XTjp7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGlyKEppYW5Ub3VfRGlyLlVQKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblVpLmRvVW5mb2xkKHRoaXMuY3VyX2ppYW50b3VfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSmlhblRvdV9UeXBlLlJJR0hUOntcclxuICAgICAgICAgICAgICAgIHN3aXRjaCh0aGlzLmN1cl9qaWFudG91X2RpcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEppYW5Ub3VfRGlyLlVQOntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREaXIoSmlhblRvdV9EaXIuRE9XTik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5VaS5kb0ZvbGRlZCh0aGlzLmN1cl9qaWFudG91X3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEppYW5Ub3VfRGlyLkRPV046e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERpcihKaWFuVG91X0Rpci5VUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5VaS5kb1VuZm9sZCh0aGlzLmN1cl9qaWFudG91X3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUgKCkge1xyXG4gICAgICAgIGlmKHRoaXMuZm9sbG93X3RhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS55PS10aGlzLmZvbGxvd190YXJnZXQuaGVpZ2h0KzQ4O1xyXG4gICAgICAgICAgICBpZih0aGlzLm1hc2tfYnRucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrX2J0bnMuaGVpZ2h0PXRoaXMuZm9sbG93X3RhcmdldC5oZWlnaHQ7Ly/mnInnrq3lpLTpnIDopoHlh4/ljrvnrq3lpLTnmoTpq5jluqZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbn1cclxuIl19