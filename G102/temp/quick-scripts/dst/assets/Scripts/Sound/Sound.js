
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
        cc.resources.loadDir('sounds/' + GameManager_1.default.getInstance().cur_game_scene, cc.AudioClip, function (error, assets) {
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
                cc.resources.load('sounds/' + GameManager_1.default.getInstance().cur_game_scene + '/' + soundIndex, cc.AudioClip, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU291bmRcXFNvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUduQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQTJJQztRQXpJVyxvQkFBYyxHQUFjLElBQUksQ0FBQztRQUN6QyxzQ0FBc0M7UUFDOUIsZUFBUyxHQUEwQixJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzlDLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsVUFBSSxHQUFTLEtBQUssQ0FBQzs7SUFxSTlCLENBQUM7SUFuSUcsc0JBQU0sR0FBTjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCx5QkFBUyxHQUFUO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDO0lBQ2pELENBQUM7SUFDRCxpQ0FBaUIsR0FBakI7UUFBQSxpQkFrQkM7UUFoQkcseUJBQXlCO1FBQ3pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBQyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQXFCO1lBQ3JILElBQUcsS0FBSyxFQUNSO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELHdCQUF3QjtZQUN4QixZQUFZO1lB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YUFDSjtpQkFDRDtnQkFDSSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLEdBQUMsR0FBRyxHQUFDLFVBQVUsRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO29CQUMvSCxJQUFHLEtBQUssRUFDUjt3QkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNuQixPQUFPO3FCQUNWO29CQUNELEtBQUksQ0FBQyxjQUFjLEdBQUMsTUFBTSxDQUFDO29CQUMzQixVQUFVLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxRSxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLElBQUk7SUFDSixtREFBbUQ7SUFDbkQsSUFBSTtJQUlKLDBCQUFVLEdBQVY7UUFFSSxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQTFJZ0IsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQTJJekI7SUFBRCxZQUFDO0NBM0lELEFBMklDLENBM0lrQyxFQUFFLENBQUMsU0FBUyxHQTJJOUM7a0JBM0lvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZEluZGV4IH0gZnJvbSBcIi4vQXVkaW9Db25zdGFudHNcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291bmQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgY3VyX3BsYXlfYXVkaW86Y2MuQXVkaW9DbGlwPW51bGw7XHJcbiAgICAvL3ByaXZhdGUgYWxsX2F1ZGlvOmNjLkF1ZGlvQ2xpcFtdPVtdO1xyXG4gICAgcHJpdmF0ZSBtYXBfYXVkaW86TWFwPHN0cmluZyxjYy5BdWRpb0NsaXA+PW5ldyBNYXAoKTtcclxuICAgIHB1YmxpYyB2b2x1bWU6bnVtYmVyPTA7XHJcbiAgICBwdWJsaWMgbXV0ZTpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyPXRoaXM7XHJcbiAgICAgICAgdGhpcy5sb2FkVm9sdW1lKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkTXV0ZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZEFsbEF1ZGlvQXNzZXQoKTtcclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyPW51bGw7XHJcbiAgICB9XHJcbiAgICBsb2FkQWxsQXVkaW9Bc3NldCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/moLnmja7muLjmiI/lnLrmma/liqDovb3lr7nlupTnmoTpn7PmlYjotYTmupAgICAgICAgIFxyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkRGlyKCdzb3VuZHMvJytHYW1lTWFuYWdlci5nZXRJbnN0YW5jZSgpLmN1cl9nYW1lX3NjZW5lLGNjLkF1ZGlvQ2xpcCwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuQXVkaW9DbGlwW10pPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90aGlzLmFsbF9hdWRpbz1hc3NldHM7XHJcbiAgICAgICAgICAgIC8v5bCG5pWw57uE5YaF5a655a2Y5ZyobWFwXHJcbiAgICAgICAgICAgIGxldCBsZW49YXNzZXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdWRpbz1hc3NldHNbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcF9hdWRpby5zZXQoYXVkaW8ubmFtZSxhdWRpbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5aOw6Z+z55qE6YC76L6R5aSE55CGLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuICAgIGxvYWRWb2x1bWUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB2b2w9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb3VuZF92b2x1bWUnKTtcclxuICAgICAgICBpZih2b2w9PT1udWxsfHx2b2w9PT0nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZvbD0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNhdmVTb3VuZFZvbHVtZShwYXJzZUZsb2F0KHZvbCkpOyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVNvdW5kVm9sdW1lKHZvbD86bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHZvbCE9dW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWU9dm9sO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc291bmRfdm9sdW1lJyx0aGlzLnZvbHVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZE11dGUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtdXRlPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc291bmRfbXV0ZScpO1xyXG4gICAgICAgIGlmKG11dGU9PT1udWxsfHxtdXRlPT09JycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtdXRlPWZhbHNlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihtdXRlPT09J2ZhbHNlJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXV0ZT1mYWxzZTtcclxuICAgICAgICAgICAgfWVsc2UgaWYobXV0ZT09PSd0cnVlJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbXV0ZT10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZVNvdW5kTXV0ZShtdXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlU291bmRNdXRlKG11dGU/OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgaWYobXV0ZSE9dW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRlPW11dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc291bmRfbXV0ZScsdGhpcy5tdXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5U291bmQoc291bmRJbmRleDpTb3VuZEluZGV4KTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBsZXQgYXVkaW9JbmRleD0wO1xyXG4gICAgICAgIGlmKHRoaXMubXV0ZT09ZmFsc2UgJiYgdGhpcy52b2x1bWU+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5p+l5om+6Z+z5pWIXHJcbiAgICAgICAgICAgIC8vbGV0IGxlbj10aGlzLmFsbF9hdWRpby5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBwbGF5QXVkaW89dGhpcy5tYXBfYXVkaW8uZ2V0KHNvdW5kSW5kZXgpO1xyXG4gICAgICAgICAgICAvLyBmb3IobGV0IGk9MDsgaTxsZW47IGkrKylcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IGF1ZGlvPXRoaXMuYWxsX2F1ZGlvW2ldO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoc291bmRJbmRleD09YXVkaW8ubmFtZSlcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBwbGF5QXVkaW89YXVkaW87XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgaWYocGxheUF1ZGlvKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cl9wbGF5X2F1ZGlvIT1wbGF5QXVkaW8pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJfcGxheV9hdWRpbz1wbGF5QXVkaW87XHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9JbmRleD1jYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuY3VyX3BsYXlfYXVkaW8sZmFsc2UsdGhpcy52b2x1bWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCgnc291bmRzLycrR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5jdXJfZ2FtZV9zY2VuZSsnLycrc291bmRJbmRleCxjYy5BdWRpb0NsaXAsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkF1ZGlvQ2xpcCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cl9wbGF5X2F1ZGlvPWFzc2V0cztcclxuICAgICAgICAgICAgICAgICAgICBhdWRpb0luZGV4PWNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5jdXJfcGxheV9hdWRpbyxmYWxzZSx0aGlzLnZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXVkaW9JbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwbGF5U291bmRCeUF1ZGlvQ2xpcChjbGlwOiBjYy5BdWRpb0NsaXAsIGxvb3A6IGJvb2xlYW49ZmFsc2UpOm51bWJlclxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIHJldHVybiBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGNsaXAsbG9vcCk7XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIFxyXG5cclxuICAgIGxhdGVVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIC8v6Ziy5q2i5q+P5LiA5bin5ZCM5pe25pKt5pS+5aSa5Liq55u45ZCM55qE6Z+z5pWIXHJcbiAgICAgICAgdGhpcy5jdXJfcGxheV9hdWRpbz1udWxsO1xyXG4gICAgfSAgICAgICAgICAgXHJcbn1cclxuIl19