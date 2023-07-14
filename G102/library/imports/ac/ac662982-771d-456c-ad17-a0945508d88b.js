"use strict";
cc._RF.push(module, 'ac662mCdx1FbK0XoJRVCNiL', 'LocalVideo');
// Scripts/LocalVideo.ts

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
var GameManager_1 = require("./GameManager");
var AudioConstants_1 = require("./Sound/AudioConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LocalVideo = /** @class */ (function (_super) {
    __extends(LocalVideo, _super);
    function LocalVideo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.remain_time = 10;
        _this.yes_callback = null;
        _this.no_callback = null;
        _this.interval = null;
        return _this;
        // update (dt) {}
    }
    LocalVideo.prototype.init = function (yesCallback, noCallback) {
        var _this = this;
        this.yes_callback = yesCallback;
        this.no_callback = noCallback;
        this.remain_time = 11 + Math.floor(Math.random() * 6);
        this.showRemain();
        this.interval = setInterval(function () {
            _this.showRemain();
        }, 1000);
        var bg = this.node.getChildByName('bg');
        var touchNum = 0;
        bg.on(cc.Node.EventType.TOUCH_START, function () {
            touchNum++;
            if (touchNum >= 5) {
                _this.clickBtnNo();
            }
        }, this);
    };
    LocalVideo.prototype.showRemain = function () {
        this.remain_time--;
        var remainLabel = this.node.getChildByName('remainLabel').getComponent(cc.Label);
        remainLabel.string = '' + this.remain_time;
        var btnYes = this.node.getChildByName('btnYes');
        var text = btnYes.getChildByName('text').getComponent(cc.Label);
        if (this.remain_time > 0) {
            text.string = '取消';
            // setInterval(()=>{
            //     this.showRemain();
            // },1000);
        }
        else {
            text.string = '领取奖励';
            remainLabel.string = '观看完毕';
            this.node.getChildByName('hintLabel').active = false;
            btnYes.x = -270 + Math.random() * 540;
            btnYes.y = -114 + Math.random() * 228;
            clearInterval(this.interval);
            // let btnNo=this.node.getChildByName('btnNo');
            // btnNo.active=true;
            // btnNo.x=-270+Math.random()*540;
            // btnNo.y=-114+Math.random()*228;
        }
    };
    LocalVideo.prototype.clickBtnNo = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        this.node.removeFromParent();
    };
    LocalVideo.prototype.clickBtnYes = function () {
        GameManager_1.default.getInstance().sound_manager.playSound(AudioConstants_1.SoundIndex.click);
        if (this.remain_time > 0) {
            if (this.no_callback) {
                this.no_callback();
            }
        }
        else {
            if (this.yes_callback) {
                this.yes_callback();
            }
        }
        this.node.removeFromParent();
    };
    LocalVideo = __decorate([
        ccclass
    ], LocalVideo);
    return LocalVideo;
}(cc.Component));
exports.default = LocalVideo;

cc._RF.pop();