"use strict";
cc._RF.push(module, 'b207fqjGVRAcqTV5nnTLSdh', 'Muisc');
// Scripts/Sound/Muisc.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Music = /** @class */ (function (_super) {
    __extends(Music, _super);
    function Music() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Music.prototype.onLoad = function () {
        GameManager_1.default.getInstance().music_manager = this;
        this.loadVolume();
        this.loadMute();
    };
    Music.prototype.onDestroy = function () {
        GameManager_1.default.getInstance().music_manager = null;
        this.stop();
    };
    /*-----------------------------------声音的逻辑处理--------------------------------------------------*/
    Music.prototype.loadVolume = function () {
        var vol = cc.sys.localStorage.getItem('music_volume');
        if (vol === null || vol === '') {
            vol = 1;
        }
        this.saveMusicVolume(parseFloat(vol));
    };
    Music.prototype.saveMusicVolume = function (vol) {
        if (vol != undefined) {
            this.volume = vol;
        }
        cc.sys.localStorage.setItem('music_volume', this.volume);
    };
    Music.prototype.loadMute = function () {
        var mute = cc.sys.localStorage.getItem('music_mute');
        if (mute === null || mute === '') {
            mute = false;
        }
        else {
            if (mute === 'false') {
                mute = false;
            }
            else if (mute === 'true') {
                mute = true;
            }
        }
        this.saveMusicMute(mute);
    };
    Music.prototype.saveMusicMute = function (mute) {
        if (mute != undefined) {
            this.mute = mute;
        }
        cc.sys.localStorage.setItem('music_mute', this.mute);
    };
    Music.prototype.playMusic = function (musicIndex) {
        var _this = this;
        cc.resources.load('musics/' + musicIndex, cc.AudioClip, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.clip = assets;
            _this.play();
            _this.loop = true;
        });
    };
    Music = __decorate([
        ccclass
    ], Music);
    return Music;
}(cc.AudioSource));
exports.default = Music;

cc._RF.pop();