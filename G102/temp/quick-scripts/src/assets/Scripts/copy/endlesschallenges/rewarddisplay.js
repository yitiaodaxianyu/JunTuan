"use strict";
cc._RF.push(module, '97b26anHlZE65xNp1hYtWJR', 'rewarddisplay');
// Scripts/copy/endlesschallenges/rewarddisplay.ts

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
var GameManager_1 = require("../../GameManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var PropManager_1 = require("../../Prop/PropManager");
var AudioConstants_1 = require("../../Sound/AudioConstants");
var UIComponent_1 = require("../../UI/UIComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rewarddisplay = /** @class */ (function (_super) {
    __extends(rewarddisplay, _super);
    function rewarddisplay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.item = [];
        _this.BossRush_Line = null;
        _this.BossRush_Line1 = null;
        _this.text = null;
        _this.mytxt = null;
        _this.boss = [20003, 40006, 20003, 10002, 10002];
        _this.Common_Window3_1 = null;
        return _this;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        // start () {
        // }
        // update (dt) {}
    }
    rewarddisplay.prototype.initUi = function (type) {
        // GameManager.getInstance().music_manager.playMusic(MusicIndex.BGM_TJP);
        // FollowManager.getInstance().followEvent(Follow_Type.铁匠铺打开次数);
        if (type == 2) {
            this.Common_Window3_1.y = 31;
            this.Common_Window3_1.height = 480;
            this.item[0].y = 85;
            this.item[0].x = 0;
            var items = PropManager_1.PropManager.getInstance().createPropItem(PropConfig_1.PropId.Coin, 0);
            items.parent = this.item[0];
            this.BossRush_Line.active = false;
            this.BossRush_Line1.active = false;
            this.text.active = false;
            this.mytxt.active = true;
            this.item[1].active = false;
            this.item[2].active = false;
            this.item[3].active = false;
            this.item[4].active = false;
        }
        else if (type == 3) {
            this.item[0].y = 100;
            this.item[0].x = -80;
            this.item[4].x = 80;
            this.item[4].y = 100;
            this.Common_Window3_1.y = 0;
            this.Common_Window3_1.height = 550;
            for (var index = 0; index < this.boss.length; index++) {
                var items = PropManager_1.PropManager.getInstance().createPropItem(this.boss[index], 0);
                items.parent = this.item[index];
            }
            this.BossRush_Line.active = true;
            this.BossRush_Line1.active = true;
            this.text.active = true;
            this.mytxt.active = false;
            this.item[1].active = true;
            this.item[2].active = true;
            this.item[3].active = true;
            this.item[4].active = true;
        }
    };
    rewarddisplay.prototype.shanchu = function () {
        for (var index = 0; index < this.item.length; index++) {
            if (this.item[index].childrenCount > 0) {
                this.item[index].children[0].destroy();
            }
        }
    };
    rewarddisplay.prototype.clickBtnClose = function () {
        this.shanchu();
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.onClose();
    };
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "item", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "BossRush_Line", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "BossRush_Line1", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "text", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "mytxt", void 0);
    __decorate([
        property(cc.Node)
    ], rewarddisplay.prototype, "Common_Window3_1", void 0);
    rewarddisplay = __decorate([
        ccclass
    ], rewarddisplay);
    return rewarddisplay;
}(UIComponent_1.default));
exports.default = rewarddisplay;

cc._RF.pop();