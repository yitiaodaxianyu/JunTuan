
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Sound/Muisc.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU291bmRcXE11aXNjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUluQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBYztJQUFqRDs7SUE0RUEsQ0FBQztJQTFFRyxzQkFBTSxHQUFOO1FBQ0kscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELHlCQUFTLEdBQVQ7UUFFSSxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsR0FBQyxJQUFJLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxnR0FBZ0c7SUFFaEcsMEJBQVUsR0FBVjtRQUVJLElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxJQUFHLEdBQUcsS0FBRyxJQUFJLElBQUUsR0FBRyxLQUFHLEVBQUUsRUFDdkI7WUFDSSxHQUFHLEdBQUMsQ0FBQyxDQUFDO1NBQ1Q7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCwrQkFBZSxHQUFmLFVBQWdCLEdBQVc7UUFFdkIsSUFBRyxHQUFHLElBQUUsU0FBUyxFQUNqQjtZQUNJLElBQUksQ0FBQyxNQUFNLEdBQUMsR0FBRyxDQUFDO1NBQ25CO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHdCQUFRLEdBQVI7UUFFSSxJQUFJLElBQUksR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsSUFBRyxJQUFJLEtBQUcsSUFBSSxJQUFFLElBQUksS0FBRyxFQUFFLEVBQ3pCO1lBQ0ksSUFBSSxHQUFDLEtBQUssQ0FBQztTQUNkO2FBQ0Q7WUFDSSxJQUFHLElBQUksS0FBRyxPQUFPLEVBQ2pCO2dCQUNJLElBQUksR0FBQyxLQUFLLENBQUM7YUFDZDtpQkFBSyxJQUFHLElBQUksS0FBRyxNQUFNLEVBQ3RCO2dCQUNJLElBQUksR0FBQyxJQUFJLENBQUM7YUFDYjtTQUNKO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsNkJBQWEsR0FBYixVQUFjLElBQWE7UUFFdkIsSUFBRyxJQUFJLElBQUUsU0FBUyxFQUNsQjtZQUNJLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELHlCQUFTLEdBQVQsVUFBVSxVQUFxQjtRQUEvQixpQkFZQztRQVZHLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBQyxVQUFVLEVBQUMsRUFBRSxDQUFDLFNBQVMsRUFBQyxVQUFDLEtBQVksRUFBRSxNQUFtQjtZQUNsRixJQUFHLEtBQUssRUFDUjtnQkFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxLQUFJLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQztZQUNqQixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixLQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF6RWdCLEtBQUs7UUFEekIsT0FBTztPQUNhLEtBQUssQ0E0RXpCO0lBQUQsWUFBQztDQTVFRCxBQTRFQyxDQTVFa0MsRUFBRSxDQUFDLFdBQVcsR0E0RWhEO2tCQTVFb0IsS0FBSyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCB9IGZyb20gXCIuL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdXNpYyBleHRlbmRzIGNjLkF1ZGlvU291cmNlIHtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlcj10aGlzO1xyXG4gICAgICAgIHRoaXMubG9hZFZvbHVtZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZE11dGUoKTtcclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyPW51bGw7ICAgICAgICBcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH1cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3lo7Dpn7PnmoTpgLvovpHlpITnkIYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4gICAgbG9hZFZvbHVtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHZvbD1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ211c2ljX3ZvbHVtZScpO1xyXG4gICAgICAgIGlmKHZvbD09PW51bGx8fHZvbD09PScnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdm9sPTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZU11c2ljVm9sdW1lKHBhcnNlRmxvYXQodm9sKSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzYXZlTXVzaWNWb2x1bWUodm9sPzpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodm9sIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZvbHVtZT12b2w7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtdXNpY192b2x1bWUnLHRoaXMudm9sdW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkTXV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG11dGU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXNpY19tdXRlJyk7XHJcbiAgICAgICAgaWYobXV0ZT09PW51bGx8fG11dGU9PT0nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG11dGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKG11dGU9PT0nZmFsc2UnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtdXRlPWZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihtdXRlPT09J3RydWUnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtdXRlPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYXZlTXVzaWNNdXRlKG11dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVNdXNpY011dGUobXV0ZT86Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZihtdXRlIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm11dGU9bXV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtdXNpY19tdXRlJyx0aGlzLm11dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlNdXNpYyhtdXNpY0luZGV4Ok11c2ljSW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ211c2ljcy8nK211c2ljSW5kZXgsY2MuQXVkaW9DbGlwLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5BdWRpb0NsaXApPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jbGlwPWFzc2V0cztcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9vcD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcbiJdfQ==