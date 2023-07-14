
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/HealingPotion.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd0c69hRQCNAFLI194Xm9QF1', 'HealingPotion');
// Scripts/Maze/HealingPotion.ts

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
var RogueHexagonTypes_1 = require("../copy/voidcrack/RogueHexagonTypes");
var GameManager_1 = require("../GameManager");
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
// import { RogueHexagonTypesManager } from "./Data/RogueHexagonTypes";
var RogueText_1 = require("./Data/RogueText");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HealingPotion = /** @class */ (function (_super) {
    __extends(HealingPotion, _super);
    function HealingPotion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.box_id = 5;
        _this.is_can_go = false;
        return _this;
    }
    HealingPotion.prototype.initData = function (id, isCanGo) {
        this.box_id = id;
        this.is_can_go = isCanGo;
        this.initUi();
    };
    HealingPotion.prototype.initUi = function () {
        //标题
        var type = RogueHexagonTypes_1.RogueHexagonTypesManager.getInstance().getHexagonType(this.box_id);
        var jsonData = RogueText_1.RogueTextManager.getInstance().getJsonRogueText(type);
        var titleLabel = this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.Roguetitle_ID);
        var contentLabel = this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(jsonData.RogueText_ID);
        this.node.getChildByName('btnNo').active = this.is_can_go;
        this.node.getChildByName('btnYes').active = this.is_can_go;
    };
    HealingPotion.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        //增加城墙的生命值
        MazeManager_1.MazeManager.getInstance().setPassingId(this.box_id);
        MazeManager_1.MazeManager.getInstance().setFightingId(this.box_id);
        MazeManager_1.MazeManager.getInstance().addMazePassedId(this.box_id);
        //
        var curHp = MazeManager_1.MazeManager.getInstance().getMazeHp();
        var maxHp = MazeManager_1.MazeManager.getInstance().getMazeMaxHp();
        curHp += maxHp * 0.5;
        var hp = maxHp - curHp;
        if (hp < 0) {
            hp = 0;
        }
        MazeManager_1.MazeManager.getInstance().setMazeSubHp(hp);
        MazeUi_1.default.getInstance().refreshFloor();
        _super.prototype.onClose.call(this);
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法治疗药水事件);
    };
    HealingPotion.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    HealingPotion = __decorate([
        ccclass
    ], HealingPotion);
    return HealingPotion;
}(UIComponent_1.default));
exports.default = HealingPotion;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcSGVhbGluZ1BvdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBK0U7QUFDL0UsOENBQXlDO0FBQ3pDLG9FQUErRDtBQUMvRCxnRUFBMkQ7QUFDM0Qsb0VBQStEO0FBQy9ELDBEQUFxRDtBQUNyRCxpREFBNEM7QUFDNUMsdUVBQXVFO0FBQ3ZFLDhDQUFvRDtBQUNwRCw2Q0FBNEM7QUFDNUMsbUNBQThCO0FBR3hCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFXO0lBQXREO1FBQUEscUVBK0NDO1FBN0NHLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsZUFBUyxHQUFTLEtBQUssQ0FBQzs7SUE0QzVCLENBQUM7SUExQ0csZ0NBQVEsR0FBUixVQUFTLEVBQVMsRUFBQyxPQUFlO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSTtRQUNKLElBQUksSUFBSSxHQUFDLDRDQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUUsSUFBSSxRQUFRLEdBQUMsNEJBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RyxJQUFJLFlBQVksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzdELENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsVUFBVTtRQUNWLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELEVBQUU7UUFDRixJQUFJLEtBQUssR0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hELElBQUksS0FBSyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkQsS0FBSyxJQUFFLEtBQUssR0FBQyxHQUFHLENBQUM7UUFDakIsSUFBSSxFQUFFLEdBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQztRQUNuQixJQUFHLEVBQUUsR0FBQyxDQUFDLEVBQUM7WUFDSixFQUFFLEdBQUMsQ0FBQyxDQUFDO1NBQ1I7UUFDRCx5QkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxnQkFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BDLGlCQUFNLE9BQU8sV0FBRSxDQUFDO1FBQ2hCLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsMkJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxpQkFBTSxPQUFPLFdBQUUsQ0FBQztJQUNwQixDQUFDO0lBOUNnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBK0NqQztJQUFELG9CQUFDO0NBL0NELEFBK0NDLENBL0MwQyxxQkFBVyxHQStDckQ7a0JBL0NvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcHkvdm9pZGNyYWNrL1JvZ3VlSGV4YWdvblR5cGVzXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4uL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tIFwiLi4vVUkvVUlDb21wb25lbnRcIjtcclxuLy8gaW1wb3J0IHsgUm9ndWVIZXhhZ29uVHlwZXNNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZUhleGFnb25UeXBlc1wiO1xyXG5pbXBvcnQgeyBSb2d1ZVRleHRNYW5hZ2VyIH0gZnJvbSBcIi4vRGF0YS9Sb2d1ZVRleHRcIjtcclxuaW1wb3J0IHsgTWF6ZU1hbmFnZXIgfSBmcm9tIFwiLi9NYXplTWFuYWdlclwiO1xyXG5pbXBvcnQgTWF6ZVVpIGZyb20gXCIuL01hemVVaVwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhbGluZ1BvdGlvbiBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBib3hfaWQ6bnVtYmVyPTU7XHJcbiAgICBpc19jYW5fZ286Ym9vbGVhbj1mYWxzZTsgICAgXHJcblxyXG4gICAgaW5pdERhdGEoaWQ6bnVtYmVyLGlzQ2FuR286Ym9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5ib3hfaWQ9aWQ7XHJcbiAgICAgICAgdGhpcy5pc19jYW5fZ289aXNDYW5HbzsgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VWkoKXtcclxuICAgICAgICAvL+agh+mimFxyXG4gICAgICAgIGxldCB0eXBlPVJvZ3VlSGV4YWdvblR5cGVzTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEhleGFnb25UeXBlKHRoaXMuYm94X2lkKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9Um9ndWVUZXh0TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEpzb25Sb2d1ZVRleHQodHlwZSk7XHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZUxhYmVsJyk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZChqc29uRGF0YS5Sb2d1ZXRpdGxlX0lEKTtcclxuICAgICAgICBsZXQgY29udGVudExhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnY29udGVudExhYmVsJyk7XHJcbiAgICAgICAgY29udGVudExhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGpzb25EYXRhLlJvZ3VlVGV4dF9JRCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5ObycpLmFjdGl2ZT10aGlzLmlzX2Nhbl9nbztcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0blllcycpLmFjdGl2ZT10aGlzLmlzX2Nhbl9nbztcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blllcygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgLy/lop7liqDln47lopnnmoTnlJ/lkb3lgLxcclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldFBhc3NpbmdJZCh0aGlzLmJveF9pZCk7XHJcbiAgICAgICAgTWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zZXRGaWdodGluZ0lkKHRoaXMuYm94X2lkKTtcclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmFkZE1hemVQYXNzZWRJZCh0aGlzLmJveF9pZCk7ICAgICAgICBcclxuICAgICAgICAvL1xyXG4gICAgICAgIGxldCBjdXJIcD1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1hemVIcCgpO1xyXG4gICAgICAgIGxldCBtYXhIcD1NYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldE1hemVNYXhIcCgpO1xyXG4gICAgICAgIGN1ckhwKz1tYXhIcCowLjU7XHJcbiAgICAgICAgbGV0IGhwPW1heEhwLWN1ckhwO1xyXG4gICAgICAgIGlmKGhwPDApe1xyXG4gICAgICAgICAgICBocD0wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldE1hemVTdWJIcChocCk7XHJcbiAgICAgICAgTWF6ZVVpLmdldEluc3RhbmNlKCkucmVmcmVzaEZsb29yKCk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS5yb2d1ZeeOqeazleayu+eWl+iNr+awtOS6i+S7tik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Obygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==