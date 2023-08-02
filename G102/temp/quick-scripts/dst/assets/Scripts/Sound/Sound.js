
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Sound/Sound.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU291bmRcXFNvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF1RDtBQUN2RCw4Q0FBeUM7QUFHbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQVk7SUFBL0M7UUFBQSxxRUEySUM7UUF6SVcsb0JBQWMsR0FBYyxJQUFJLENBQUM7UUFDekMsc0NBQXNDO1FBQzlCLGVBQVMsR0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM5QyxZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFVBQUksR0FBUyxLQUFLLENBQUM7O0lBcUk5QixDQUFDO0lBbklHLHNCQUFNLEdBQU47UUFDSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsR0FBQyxJQUFJLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QseUJBQVMsR0FBVDtRQUVJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBQ0QsaUNBQWlCLEdBQWpCO1FBQUEsaUJBa0JDO1FBaEJHLHlCQUF5QjtRQUN6QixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsVUFBQyxLQUFZLEVBQUUsTUFBcUI7WUFDbEosSUFBRyxLQUFLLEVBQ1I7Z0JBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsT0FBTzth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SSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN6RTthQUNKO2lCQUNEO2dCQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEdBQUMsR0FBRyxHQUFDLFVBQVUsRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO29CQUM1SixJQUFHLEtBQUssRUFDUjt3QkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNuQixPQUFPO3FCQUNWO29CQUNELEtBQUksQ0FBQyxjQUFjLEdBQUMsTUFBTSxDQUFDO29CQUMzQixVQUFVLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRSxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLElBQUk7SUFDSixtREFBbUQ7SUFDbkQsSUFBSTtJQUlKLDBCQUFVLEdBQVY7UUFFSSxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQTFJZ0IsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQTJJekI7SUFBRCxZQUFDO0NBM0lELEFBMklDLENBM0lrQyxFQUFFLENBQUMsU0FBUyxHQTJJOUM7a0JBM0lvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdW5kIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIGN1cl9wbGF5X2F1ZGlvOmNjLkF1ZGlvQ2xpcD1udWxsO1xyXG4gICAgLy9wcml2YXRlIGFsbF9hdWRpbzpjYy5BdWRpb0NsaXBbXT1bXTtcclxuICAgIHByaXZhdGUgbWFwX2F1ZGlvOk1hcDxzdHJpbmcsY2MuQXVkaW9DbGlwPj1uZXcgTWFwKCk7XHJcbiAgICBwdWJsaWMgdm9sdW1lOm51bWJlcj0wO1xyXG4gICAgcHVibGljIG11dGU6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlcj10aGlzO1xyXG4gICAgICAgIHRoaXMubG9hZFZvbHVtZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZE11dGUoKTtcclxuICAgICAgICB0aGlzLmxvYWRBbGxBdWRpb0Fzc2V0KCk7XHJcbiAgICB9XHJcbiAgICBvbkRlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlcj1udWxsO1xyXG4gICAgfVxyXG4gICAgbG9hZEFsbEF1ZGlvQXNzZXQoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5qC55o2u5ri45oiP5Zy65pmv5Yqg6L295a+55bqU55qE6Z+z5pWI6LWE5rqQICAgICAgICBcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkRGlyKCdzb3VuZHMvJytHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lLGNjLkF1ZGlvQ2xpcCwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuQXVkaW9DbGlwW10pPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90aGlzLmFsbF9hdWRpbz1hc3NldHM7XHJcbiAgICAgICAgICAgIC8v5bCG5pWw57uE5YaF5a655a2Y5ZyobWFwXHJcbiAgICAgICAgICAgIGxldCBsZW49YXNzZXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdWRpbz1hc3NldHNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9hdWRpby5zZXQoYXVkaW8ubmFtZSxhdWRpbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5aOw6Z+z55qE6YC76L6R5aSE55CGLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuICAgIGxvYWRWb2x1bWUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB2b2w9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb3VuZF92b2x1bWUnKTtcclxuICAgICAgICBpZih2b2w9PT1udWxsfHx2b2w9PT0nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZvbD0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVTb3VuZFZvbHVtZShwYXJzZUZsb2F0KHZvbCkpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVNvdW5kVm9sdW1lKHZvbD86bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHZvbCE9dW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWU9dm9sO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc291bmRfdm9sdW1lJyx0aGlzLnZvbHVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE11dGUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtdXRlPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc291bmRfbXV0ZScpO1xyXG4gICAgICAgIGlmKG11dGU9PT1udWxsfHxtdXRlPT09JycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtdXRlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihtdXRlPT09J2ZhbHNlJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXV0ZT1mYWxzZTtcclxuICAgICAgICAgICAgfWVsc2UgaWYobXV0ZT09PSd0cnVlJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXV0ZT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZVNvdW5kTXV0ZShtdXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlU291bmRNdXRlKG11dGU/OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgaWYobXV0ZSE9dW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRlPW11dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc291bmRfbXV0ZScsdGhpcy5tdXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5U291bmQoc291bmRJbmRleDpTb3VuZEluZGV4KTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgYXVkaW9JbmRleD0wO1xyXG4gICAgICAgIGlmKHRoaXMubXV0ZT09ZmFsc2UgJiYgdGhpcy52b2x1bWU+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5p+l5om+6Z+z5pWIXHJcbiAgICAgICAgICAgIC8vbGV0IGxlbj10aGlzLmFsbF9hdWRpby5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBwbGF5QXVkaW89dGhpcy5tYXBfYXVkaW8uZ2V0KHNvdW5kSW5kZXgpO1xyXG4gICAgICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGF1ZGlvPXRoaXMuYWxsX2F1ZGlvW2ldO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoc291bmRJbmRleD09YXVkaW8ubmFtZSlcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBwbGF5QXVkaW89YXVkaW87XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYocGxheUF1ZGlvKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl9wbGF5X2F1ZGlvIT1wbGF5QXVkaW8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfcGxheV9hdWRpbz1wbGF5QXVkaW87XHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9JbmRleD1jYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY3VyX3BsYXlfYXVkaW8sZmFsc2UsdGhpcy52b2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkKCdzb3VuZHMvJytHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lKycvJytzb3VuZEluZGV4LGNjLkF1ZGlvQ2xpcCwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuQXVkaW9DbGlwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyX3BsYXlfYXVkaW89YXNzZXRzO1xyXG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvSW5kZXg9Y2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmN1cl9wbGF5X2F1ZGlvLGZhbHNlLHRoaXMudm9sdW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhdWRpb0luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBsYXlTb3VuZEJ5QXVkaW9DbGlwKGNsaXA6IGNjLkF1ZGlvQ2xpcCwgbG9vcDogYm9vbGVhbj1mYWxzZSk6bnVtYmVyXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCxsb29wKTtcclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgbGF0ZVVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/pmLLmraLmr4/kuIDluKflkIzml7bmkq3mlL7lpJrkuKrnm7jlkIznmoTpn7PmlYhcclxuICAgICAgICB0aGlzLmN1cl9wbGF5X2F1ZGlvPW51bGw7XHJcbiAgICB9ICAgICAgICAgICBcclxufVxyXG4iXX0=