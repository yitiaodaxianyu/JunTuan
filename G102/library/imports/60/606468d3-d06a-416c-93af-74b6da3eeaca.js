"use strict";
cc._RF.push(module, '60646jT0GpBbJOvdLbaPurK', 'RoguelikeTip');
// Scripts/Game/Ui/RoguelikeTip.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoguelikeTip = /** @class */ (function (_super) {
    __extends(RoguelikeTip, _super);
    function RoguelikeTip() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this.tag = 0; //选择toggle的选择数
        _this.ToggleContainer = null;
        _this.tipLabel = null;
        return _this;
        // update (dt) {}
    }
    RoguelikeTip.prototype.start = function () {
        this.tag = 1;
        this.ToggleContainer.children[0].getComponent(cc.Toggle).isChecked = true;
        this.onToggleChange();
    };
    RoguelikeTip.prototype.clickBtnToggle = function (even, i) {
        // console.log("+++++++",even,i)
        this.tag = i;
        this.onToggleChange();
    };
    RoguelikeTip.prototype.onToggleChange = function () {
        if (this.tag == 0) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个英雄加入你的队伍。";
        }
        else if (this.tag == 1) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能加强你的英雄。";
        }
        else if (this.tag == 2) {
            this.tipLabel.getComponent(cc.Label).string = "选择一个技能用于加强你的战车。";
        }
    };
    RoguelikeTip.prototype.clickBtnClose = function () {
        console.log("离开roguelike");
        cc.director.resume();
        GameManager_1.default.getInstance().cur_game_state = Constants_1.GameState.Game_Playing;
        GameManager_1.default.getInstance().loadLevel();
        _super.prototype.onClose.call(this);
    };
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "ToggleContainer", void 0);
    __decorate([
        property(cc.Node)
    ], RoguelikeTip.prototype, "tipLabel", void 0);
    RoguelikeTip = __decorate([
        ccclass
    ], RoguelikeTip);
    return RoguelikeTip;
}(UIComponent_1.default));
exports.default = RoguelikeTip;

cc._RF.pop();