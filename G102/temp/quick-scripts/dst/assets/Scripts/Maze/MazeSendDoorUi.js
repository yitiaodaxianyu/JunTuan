
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeSendDoorUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac40dofvVFA0r8M80thORCq', 'MazeSendDoorUi');
// Scripts/Maze/MazeSendDoorUi.ts

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
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var AudioConstants_1 = require("../Sound/AudioConstants");
var UIComponent_1 = require("../UI/UIComponent");
var MazeManager_1 = require("./MazeManager");
var MazeUi_1 = require("./MazeUi");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeSendDoorUi = /** @class */ (function (_super) {
    __extends(MazeSendDoorUi, _super);
    function MazeSendDoorUi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.box_id = 5;
        _this.is_can_go = true;
        return _this;
    }
    MazeSendDoorUi.prototype.start = function () {
        this.initUi();
    };
    MazeSendDoorUi.prototype.initUi = function () {
        //标题
        var titleLabel = this.node.getChildByName('titleLabel');
        titleLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830008);
        var contentLabel = this.node.getChildByName('contentLabel');
        contentLabel.getComponent(cc.Label).string = LanguageManager_1.default.getInstance().getStrByTextId(830014);
    };
    MazeSendDoorUi.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        var curFloor = MazeManager_1.MazeManager.getInstance().getFloor();
        if (curFloor < 2) {
            MazeManager_1.MazeManager.getInstance().setFloor(curFloor + 1);
            MazeManager_1.MazeManager.getInstance().resetFloorData();
            MazeUi_1.default.getInstance().jumpToNextFloor();
            _super.prototype.onClose.call(this);
        }
    };
    MazeSendDoorUi.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        _super.prototype.onClose.call(this);
    };
    MazeSendDoorUi = __decorate([
        ccclass
    ], MazeSendDoorUi);
    return MazeSendDoorUi;
}(UIComponent_1.default));
exports.default = MazeSendDoorUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZVNlbmREb29yVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlDO0FBQ3pDLG9FQUErRDtBQUcvRCwwREFBcUQ7QUFDckQsaURBQTRDO0FBRTVDLDZDQUE0QztBQUM1QyxtQ0FBOEI7QUFHeEIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNEMsa0NBQVc7SUFBdkQ7UUFBQSxxRUFrQ0M7UUFoQ0csWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixlQUFTLEdBQVMsSUFBSSxDQUFDOztJQStCM0IsQ0FBQztJQTdCRyw4QkFBSyxHQUFMO1FBQ0EsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDSSxJQUFJO1FBQ0osSUFBSSxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlGLElBQUksWUFBWSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFELFlBQVksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwRyxDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksUUFBUSxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEQsSUFBRyxRQUFRLEdBQUMsQ0FBQyxFQUFDO1lBQ1YseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDM0MsZ0JBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QyxpQkFBTSxPQUFPLFdBQUUsQ0FBQztTQUNuQjtJQUVMLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDcEIsQ0FBQztJQWpDZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWtDbEM7SUFBRCxxQkFBQztDQWxDRCxBQWtDQyxDQWxDMkMscUJBQVcsR0FrQ3REO2tCQWxDb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBQcm9wTWFuYWdlciB9IGZyb20gXCIuLi9Qcm9wL1Byb3BNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kSW5kZXggfSBmcm9tIFwiLi4vU291bmQvQXVkaW9Db25zdGFudHNcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tIFwiLi4vVUkvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IE1hemVNYW5hZ2VyIH0gZnJvbSBcIi4vTWF6ZU1hbmFnZXJcIjtcclxuaW1wb3J0IE1hemVVaSBmcm9tIFwiLi9NYXplVWlcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hemVTZW5kRG9vclVpIGV4dGVuZHMgVUlDb21wb25lbnQge1xyXG5cclxuICAgIGJveF9pZDpudW1iZXI9NTtcclxuICAgIGlzX2Nhbl9nbzpib29sZWFuPXRydWU7ICAgIFxyXG5cclxuICAgIHN0YXJ0KCl7XHJcbiAgICB0aGlzLmluaXRVaSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRVaSgpe1xyXG4gICAgICAgIC8v5qCH6aKYXHJcbiAgICAgICAgbGV0IHRpdGxlTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZUxhYmVsJyk7XHJcbiAgICAgICAgdGl0bGVMYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRTdHJCeVRleHRJZCg4MzAwMDgpO1xyXG4gICAgICAgIGxldCBjb250ZW50TGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50TGFiZWwnKTtcclxuICAgICAgICBjb250ZW50TGFiZWwuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3RyQnlUZXh0SWQoODMwMDE0KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blllcygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7ICAgICAgICBcclxuICAgICAgICBsZXQgY3VyRmxvb3I9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRGbG9vcigpO1xyXG4gICAgICAgIGlmKGN1ckZsb29yPDIpe1xyXG4gICAgICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnNldEZsb29yKGN1ckZsb29yKzEpO1xyXG4gICAgICAgICAgICBNYXplTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlc2V0Rmxvb3JEYXRhKCk7XHJcbiAgICAgICAgICAgIE1hemVVaS5nZXRJbnN0YW5jZSgpLmp1bXBUb05leHRGbG9vcigpO1xyXG4gICAgICAgICAgICBzdXBlci5vbkNsb3NlKCk7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tCdG5Obygpe1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgc3VwZXIub25DbG9zZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==