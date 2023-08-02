"use strict";
cc._RF.push(module, 'c36ed4sGjtBZ7Q910n5tc8D', 'Sound');
// Scripts/Sound/Sound.ts

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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var GameManager_1 = require("../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Sound = /** @class */ (function (_super) {
    __extends(Sound, _super);
    function Sound() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_play_audio = null;
        //private all_audio:cc.AudioClip[]=[];
        _this.map_audio = new Map();
        _this.volume = 0;
        _this.mute = false;
        return _this;
    }
    Sound.prototype.onLoad = function () {
        GameManager_1.default.getInstance().sound_manager = this;
        this.loadVolume();
        this.loadMute();
        this.loadAllAudioAsset();
    };
    Sound.prototype.onDestroy = function () {
        GameManager_1.default.getInstance().sound_manager = null;
    };
    Sound.prototype.loadAllAudioAsset = function () {
        var _this = this;
        //根据游戏场景加载对应的音效资源        
        WXManagerEX_1.default.getInstance().resourcesBundle.loadDir('sounds/' + GameManager_1.default.getInstance().cur_game_scene, cc.AudioClip, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            //this.all_audio=assets;
            //将数组内容存在map
            var len = assets.length;
            for (var i = 0; i < len; i++) {
                var audio = assets[i];
                _this.map_audio.set(audio.name, audio);
            }
        });
    };
    /*-----------------------------------声音的逻辑处理--------------------------------------------------*/
    Sound.prototype.loadVolume = function () {
        var vol = cc.sys.localStorage.getItem('sound_volume');
        if (vol === null || vol === '') {
            vol = 1;
        }
        this.saveSoundVolume(parseFloat(vol));
    };
    Sound.prototype.saveSoundVolume = function (vol) {
        if (vol != undefined) {
            this.volume = vol;
        }
        cc.sys.localStorage.setItem('sound_volume', this.volume);
    };
    Sound.prototype.loadMute = function () {
        var mute = cc.sys.localStorage.getItem('sound_mute');
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
        this.saveSoundMute(mute);
    };
    Sound.prototype.saveSoundMute = function (mute) {
        if (mute != undefined) {
            this.mute = mute;
        }
        cc.sys.localStorage.setItem('sound_mute', this.mute);
    };
    Sound.prototype.playSound = function (soundIndex) {
        var _this = this;
        var audioIndex = 0;
        if (this.mute == false && this.volume > 0) {
            //查找音效
            //let len=this.all_audio.length;
            var playAudio = this.map_audio.get(soundIndex);
            // for(let i=0; i<len; i++)
            // {
            //     let audio=this.all_audio[i];
            //     if(soundIndex==audio.name)
            //     {
            //         playAudio=audio;
            //         break;
            //     }
            // }
            if (playAudio) {
                if (this.cur_play_audio != playAudio) {
                    this.cur_play_audio = playAudio;
                    audioIndex = cc.audioEngine.play(this.cur_play_audio, false, this.volume);
                }
            }
            else {
                WXManagerEX_1.default.getInstance().resourcesBundle.load('sounds/' + GameManager_1.default.getInstance().cur_game_scene + '/' + soundIndex, cc.AudioClip, function (error, assets) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    _this.cur_play_audio = assets;
                    audioIndex = cc.audioEngine.play(_this.cur_play_audio, false, _this.volume);
                });
            }
        }
        return audioIndex;
    };
    // playSoundByAudioClip(clip: cc.AudioClip, loop: boolean=false):number
    // {
    //     return cc.audioEngine.playEffect(clip,loop);
    // }
    Sound.prototype.lateUpdate = function () {
        //防止每一帧同时播放多个相同的音效
        this.cur_play_audio = null;
    };
    Sound = __decorate([
        ccclass
    ], Sound);
    return Sound;
}(cc.Component));
exports.default = Sound;

cc._RF.pop();