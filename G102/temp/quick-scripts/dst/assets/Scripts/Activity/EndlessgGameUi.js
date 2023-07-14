
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Activity/EndlessgGameUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '24fcfU86BpA64enFuGRxoF1', 'EndlessgGameUi');
// Scripts/Activity/EndlessgGameUi.ts

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
var EndlessLevels_1 = require("./EndlessLevels");
var EndlessReward_1 = require("./EndlessReward");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EndlessgGameUi = /** @class */ (function (_super) {
    __extends(EndlessgGameUi, _super);
    function EndlessgGameUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sp_icon = [];
        _this.scoreProgressBar = null;
        _this.icon = null;
        _this.levelLabel = null;
        _this.scoreLabel = null;
        return _this;
    }
    EndlessgGameUi.prototype.onLoad = function () {
        this.scoreProgressBar = this.node.getChildByName('scoreProgressBar').getComponent(cc.ProgressBar);
        this.icon = this.node.getChildByName('icon').getComponent(cc.Sprite);
        this.levelLabel = this.node.getChildByName('levelLabel').getComponent(cc.Label);
        this.scoreLabel = this.node.getChildByName('scoreLabel').getComponent(cc.Label);
        EndlessLevels_1.EndlessLevelsManager.getInstance().endless_score = 0;
    };
    EndlessgGameUi.prototype.refreshData = function () {
        //先根据当前分数数据获取数据
        var score = EndlessLevels_1.EndlessLevelsManager.getInstance().endless_score;
        var endlessData = EndlessReward_1.EndlessRewardManager.getInstance().getRewardByScore(score);
        var proScore = score - endlessData.curData.IntegralRequirement;
        var maxSocre = endlessData.nextData.IntegralRequirement - endlessData.curData.IntegralRequirement;
        this.scoreProgressBar.progress = proScore / maxSocre + 0.001;
        this.scoreLabel.string = score + "/" + endlessData.nextData.IntegralRequirement;
        this.levelLabel.string = "" + endlessData.curData.RewardLevel;
        this.icon.spriteFrame = this.sp_icon[endlessData.curData.BoxIcon - 1];
    };
    __decorate([
        property([cc.SpriteFrame])
    ], EndlessgGameUi.prototype, "sp_icon", void 0);
    EndlessgGameUi = __decorate([
        ccclass
    ], EndlessgGameUi);
    return EndlessgGameUi;
}(cc.Component));
exports.default = EndlessgGameUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWN0aXZpdHlcXEVuZGxlc3NnR2FtZVVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUF1RDtBQUN2RCxpREFBdUQ7QUFHakQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUErQkM7UUE1QkcsYUFBTyxHQUFxQixFQUFFLENBQUM7UUFFL0Isc0JBQWdCLEdBQWdCLElBQUksQ0FBQztRQUNyQyxVQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLGdCQUFVLEdBQVUsSUFBSSxDQUFDO1FBQ3pCLGdCQUFVLEdBQVUsSUFBSSxDQUFDOztJQXVCN0IsQ0FBQztJQXJCYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUUsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxHQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLGVBQWU7UUFDZixJQUFJLEtBQUssR0FBQyxvQ0FBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDM0QsSUFBSSxXQUFXLEdBQUMsb0NBQW9CLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0UsSUFBSSxRQUFRLEdBQUMsS0FBSyxHQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUM7UUFDM0QsSUFBSSxRQUFRLEdBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsR0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDO1FBQzlGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUMsUUFBUSxHQUFDLFFBQVEsR0FBQyxLQUFLLENBQUM7UUFFdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1FBQzFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLEVBQUUsR0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUUxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JFLENBQUM7SUEzQkQ7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7bURBQ0k7SUFIZCxjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBK0JsQztJQUFELHFCQUFDO0NBL0JELEFBK0JDLENBL0IyQyxFQUFFLENBQUMsU0FBUyxHQStCdkQ7a0JBL0JvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBFbmRsZXNzTGV2ZWxzTWFuYWdlciB9IGZyb20gXCIuL0VuZGxlc3NMZXZlbHNcIjtcclxuaW1wb3J0IHsgRW5kbGVzc1Jld2FyZE1hbmFnZXIgfSBmcm9tIFwiLi9FbmRsZXNzUmV3YXJkXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRsZXNzZ0dhbWVVaSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBzcF9pY29uOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XHJcblxyXG4gICAgc2NvcmVQcm9ncmVzc0JhcjpjYy5Qcm9ncmVzc0Jhcj1udWxsO1xyXG4gICAgaWNvbjpjYy5TcHJpdGU9bnVsbDtcclxuICAgIGxldmVsTGFiZWw6Y2MuTGFiZWw9bnVsbDtcclxuICAgIHNjb3JlTGFiZWw6Y2MuTGFiZWw9bnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NvcmVQcm9ncmVzc0Jhcj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njb3JlUHJvZ3Jlc3NCYXInKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG4gICAgICAgIHRoaXMuaWNvbj10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2ljb24nKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmxldmVsTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdsZXZlbExhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnNjb3JlTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdzY29yZUxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBFbmRsZXNzTGV2ZWxzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmVuZGxlc3Nfc2NvcmU9MDtcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoRGF0YSgpe1xyXG4gICAgICAgIC8v5YWI5qC55o2u5b2T5YmN5YiG5pWw5pWw5o2u6I635Y+W5pWw5o2uXHJcbiAgICAgICAgbGV0IHNjb3JlPUVuZGxlc3NMZXZlbHNNYW5hZ2VyLmdldEluc3RhbmNlKCkuZW5kbGVzc19zY29yZTtcclxuICAgICAgICBsZXQgZW5kbGVzc0RhdGE9RW5kbGVzc1Jld2FyZE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmRCeVNjb3JlKHNjb3JlKTtcclxuICAgICAgICBsZXQgcHJvU2NvcmU9c2NvcmUtZW5kbGVzc0RhdGEuY3VyRGF0YS5JbnRlZ3JhbFJlcXVpcmVtZW50O1xyXG4gICAgICAgIGxldCBtYXhTb2NyZT1lbmRsZXNzRGF0YS5uZXh0RGF0YS5JbnRlZ3JhbFJlcXVpcmVtZW50LWVuZGxlc3NEYXRhLmN1ckRhdGEuSW50ZWdyYWxSZXF1aXJlbWVudDtcclxuICAgICAgICB0aGlzLnNjb3JlUHJvZ3Jlc3NCYXIucHJvZ3Jlc3M9cHJvU2NvcmUvbWF4U29jcmUrMC4wMDE7XHJcblxyXG4gICAgICAgIHRoaXMuc2NvcmVMYWJlbC5zdHJpbmc9c2NvcmUrXCIvXCIrZW5kbGVzc0RhdGEubmV4dERhdGEuSW50ZWdyYWxSZXF1aXJlbWVudDtcclxuICAgICAgICB0aGlzLmxldmVsTGFiZWwuc3RyaW5nPVwiXCIrZW5kbGVzc0RhdGEuY3VyRGF0YS5SZXdhcmRMZXZlbDtcclxuXHJcbiAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lPXRoaXMuc3BfaWNvbltlbmRsZXNzRGF0YS5jdXJEYXRhLkJveEljb24tMV1cclxuICAgIH1cclxufVxyXG4iXX0=