"use strict";
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