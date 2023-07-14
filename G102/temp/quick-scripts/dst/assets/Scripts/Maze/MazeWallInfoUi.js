
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Maze/MazeWallInfoUi.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cba46jpLlNLJZfVgwUbr0OA', 'MazeWallInfoUi');
// Scripts/Maze/MazeWallInfoUi.ts

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
var FollowConstants_1 = require("../multiLanguage/FollowConstants");
var FollowManager_1 = require("../multiLanguage/FollowManager");
var UIComponent_1 = require("../UI/UIComponent");
var MazeManager_1 = require("./MazeManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MazeWallInfoUi = /** @class */ (function (_super) {
    __extends(MazeWallInfoUi, _super);
    function MazeWallInfoUi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MazeWallInfoUi.prototype.start = function () {
        this.initUi();
    };
    MazeWallInfoUi.prototype.initUi = function () {
        var numLabel = this.node.getChildByName('numLabel');
        var curHp = MazeManager_1.MazeManager.getInstance().getMazeHp();
        var maxHp = MazeManager_1.MazeManager.getInstance().getMazeMaxHp();
        numLabel.getComponent(cc.Label).string = curHp + '/' + maxHp + "(" + (curHp / maxHp * 100).toFixed(1) + "%)";
        FollowManager_1.default.getInstance().followEvent(FollowConstants_1.Follow_Type.rogue玩法查看当前生命值);
    };
    MazeWallInfoUi = __decorate([
        ccclass
    ], MazeWallInfoUi);
    return MazeWallInfoUi;
}(UIComponent_1.default));
exports.default = MazeWallInfoUi;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTWF6ZVxcTWF6ZVdhbGxJbmZvVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0VBQStEO0FBQy9ELGdFQUEyRDtBQUMzRCxpREFBNEM7QUFDNUMsNkNBQTRDO0FBR3RDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFXO0lBQXZEOztJQWlCQSxDQUFDO0lBYkcsOEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNJLElBQUksUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELElBQUksS0FBSyxHQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEQsSUFBSSxLQUFLLEdBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuRCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLENBQUMsS0FBSyxHQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQzdGLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDLDZCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQWRnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBaUJsQztJQUFELHFCQUFDO0NBakJELEFBaUJDLENBakIyQyxxQkFBVyxHQWlCdEQ7a0JBakJvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEZvbGxvd19UeXBlIH0gZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93Q29uc3RhbnRzXCI7XHJcbmltcG9ydCBGb2xsb3dNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0ZvbGxvd01hbmFnZXJcIjtcclxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gXCIuLi9VSS9VSUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYXplTWFuYWdlciB9IGZyb20gXCIuL01hemVNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXplV2FsbEluZm9VaSBleHRlbmRzIFVJQ29tcG9uZW50IHtcclxuXHJcbiAgICBcclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFVpKCl7XHJcbiAgICAgICAgbGV0IG51bUxhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnbnVtTGFiZWwnKTtcclxuICAgICAgICBsZXQgY3VySHA9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXplSHAoKTtcclxuICAgICAgICBsZXQgbWF4SHA9TWF6ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRNYXplTWF4SHAoKTtcclxuICAgICAgICBudW1MYWJlbC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZz1jdXJIcCsnLycrbWF4SHArXCIoXCIrKGN1ckhwL21heEhwKjEwMCkudG9GaXhlZCgxKStcIiUpXCI7XHJcbiAgICAgICAgRm9sbG93TWFuYWdlci5nZXRJbnN0YW5jZSgpLmZvbGxvd0V2ZW50KEZvbGxvd19UeXBlLnJvZ3Vl546p5rOV5p+l55yL5b2T5YmN55Sf5ZG95YC8KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcbiJdfQ==