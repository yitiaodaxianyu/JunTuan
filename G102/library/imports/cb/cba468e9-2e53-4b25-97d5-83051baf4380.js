"use strict";
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