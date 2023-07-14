
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeToolUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0449eCGut5Il4C4Q12CjmCV', 'MazeToolUi');
// Scripts/Maze/MazeToolUi.ts

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
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var PropConfig_1 = require("../Prop/PropConfig");
var PropManager_1 = require("../Prop/PropManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var WallManager_1 = require("../Wall/WallManager");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeToolUi = /** @class */ (function (_super) {
    __extends(MazeToolUi, _super);
    function MazeToolUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.box_id = 5;
        _this.is_can_go = true;
        return _this;
    }
    MazeToolUi.prototype.start = function () {
        this.initUi();
    };
    MazeToolUi.prototype.initUi = function () {
        //标题
        var titleLabel = this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830009);
        var contentLabel = this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830015);
        //this.node.getChildByName('btnNo').active=this.is_can_go;
        var num = PropManager_1.PropManager.getInstance().getPropNum(PropConfig_1.PropId.MazeToolkit);
        this.node.getChildByName('btnYes').getComponent(cc.Button).interactable = num > 0 && WallManager_1.default.getInstance().getMainWall().getCurHp() <= 0;
        this.node.getChildByName('num').getComponent(cc.Label).string = num + '';
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rouge玩法查看工具包);
    };
    MazeToolUi.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //城墙满血
        MazeManager_1.MazeManager.getInstance().setMazeSubHp(0);
        MazeUi_1.default.getInstance().showWallInfo();
        _super.prototype.onClose.call(this);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法使用工具包);
    };
    MazeToolUi.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    MazeToolUi = __decorate([
        ccclass
    ], MazeToolUi);
    return MazeToolUi;
}(UIComponent_1.default));
exports.default = MazeToolUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZVRvb2xVaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBeUM7QUFDekMsb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsaURBQTRDO0FBQzVDLG1EQUFrRDtBQUNsRCwwREFBcUQ7QUFDckQsaURBQTRDO0FBQzVDLG1EQUE4QztBQUc5Qyw2Q0FBNEM7QUFDNUMsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFXO0lBQW5EO1FBQUEscUVBbUNDO1FBakNHLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsZUFBUyxHQUFTLElBQUksQ0FBQzs7SUFnQzNCLENBQUM7SUE5QkcsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMkJBQU0sR0FBTjtRQUNJLElBQUk7UUFDSixJQUFJLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUYsSUFBSSxZQUFZLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUQsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hHLDBEQUEwRDtRQUMxRCxJQUFJLEdBQUcsR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFDLEdBQUcsR0FBQyxDQUFDLElBQUUscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBRSxDQUFDLENBQUM7UUFDckksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQztRQUNyRSx1QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2QkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsTUFBTTtRQUNOLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLGdCQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsaUJBQU0sT0FBTyxXQUFFLENBQUM7UUFDaEIsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkJBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ3BCLENBQUM7SUFsQ2dCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FtQzlCO0lBQUQsaUJBQUM7Q0FuQ0QsQUFtQ0MsQ0FuQ3VDLHFCQUFXLEdBbUNsRDtrQkFuQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgV2FsbE1hbmFnZXIgZnJvbSBcIi4uL1dhbGwvV2FsbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBSb2d1ZVRleHRNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZVRleHRcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgTWF6ZVVpIGZyb20gXCIuL01hemVVaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWF6ZVRvb2xVaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBib3hfaWQ6bnVtYmVyPTU7XHJcbiAgICBpc19jYW5fZ286Ym9vbGVhbj10cnVlOyAgICBcclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpKCl7XHJcbiAgICAgICAgLy/moIfpophcclxuICAgICAgICBsZXQgdGl0bGVMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTGFiZWwnKTtcclxuICAgICAgICB0aXRsZUxhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKDgzMDAwOSk7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRMYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvbnRlbnRMYWJlbCcpO1xyXG4gICAgICAgIGNvbnRlbnRMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MzAwMTUpO1xyXG4gICAgICAgIC8vdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5ObycpLmFjdGl2ZT10aGlzLmlzX2Nhbl9nbztcclxuICAgICAgICBsZXQgbnVtPVByb3BNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UHJvcE51bShQcm9wSWQuTWF6ZVRvb2xraXQpXHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5ZZXMnKS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9bnVtPjAmJldhbGxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0TWFpbldhbGwoKS5nZXRDdXJIcCgpPD0wO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbnVtJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bnVtKycnO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5yb3VnZeeOqeazleafpeeci+W3peWFt+WMhSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5ZZXMoKXtcclxuICAgICAgICBHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNvdW5kX21hbmFnZXIucGxheVNvdW5kKFNvdW5kSW5kZXguY2xpY2spO1xyXG4gICAgICAgIC8v5Z+O5aKZ5ruh6KGAXHJcbiAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRNYXplU3ViSHAoMCk7XHJcbiAgICAgICAgTWF6ZVVpLmdldEluc3RhbmNlKCkuc2hvd1dhbGxJbmZvKCk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5yb2d1ZeeOqeazleS9v+eUqOW3peWFt+WMhSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Obygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==