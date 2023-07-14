"use strict";
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