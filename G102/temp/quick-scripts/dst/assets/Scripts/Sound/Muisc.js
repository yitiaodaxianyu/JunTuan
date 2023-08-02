
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
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
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
        WXManagerEX_1.default.getInstance().resourcesBundle.load('musics/' + musicIndex, cc.AudioClip, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcU291bmRcXE11aXNjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF1RDtBQUN2RCw4Q0FBeUM7QUFJbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBbUMseUJBQWM7SUFBakQ7O0lBNEVBLENBQUM7SUExRUcsc0JBQU0sR0FBTjtRQUNJLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCx5QkFBUyxHQUFUO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEdBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ0QsZ0dBQWdHO0lBRWhHLDBCQUFVLEdBQVY7UUFFSSxJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEQsSUFBRyxHQUFHLEtBQUcsSUFBSSxJQUFFLEdBQUcsS0FBRyxFQUFFLEVBQ3ZCO1lBQ0ksR0FBRyxHQUFDLENBQUMsQ0FBQztTQUNUO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsK0JBQWUsR0FBZixVQUFnQixHQUFXO1FBRXZCLElBQUcsR0FBRyxJQUFFLFNBQVMsRUFDakI7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQztTQUNuQjtRQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCx3QkFBUSxHQUFSO1FBRUksSUFBSSxJQUFJLEdBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELElBQUcsSUFBSSxLQUFHLElBQUksSUFBRSxJQUFJLEtBQUcsRUFBRSxFQUN6QjtZQUNJLElBQUksR0FBQyxLQUFLLENBQUM7U0FDZDthQUNEO1lBQ0ksSUFBRyxJQUFJLEtBQUcsT0FBTyxFQUNqQjtnQkFDSSxJQUFJLEdBQUMsS0FBSyxDQUFDO2FBQ2Q7aUJBQUssSUFBRyxJQUFJLEtBQUcsTUFBTSxFQUN0QjtnQkFDSSxJQUFJLEdBQUMsSUFBSSxDQUFDO2FBQ2I7U0FDSjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFhLEdBQWIsVUFBYyxJQUFhO1FBRXZCLElBQUcsSUFBSSxJQUFFLFNBQVMsRUFDbEI7WUFDSSxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztTQUNsQjtRQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCx5QkFBUyxHQUFULFVBQVUsVUFBcUI7UUFBL0IsaUJBWUM7UUFWRyxxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLFVBQVUsRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLFVBQUMsS0FBWSxFQUFFLE1BQW1CO1lBQy9HLElBQUcsS0FBSyxFQUNSO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELEtBQUksQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLEtBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXpFZ0IsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQTRFekI7SUFBRCxZQUFDO0NBNUVELEFBNEVDLENBNUVrQyxFQUFFLENBQUMsV0FBVyxHQTRFaEQ7a0JBNUVvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTXVzaWNJbmRleCB9IGZyb20gXCIuL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdXNpYyBleHRlbmRzIGNjLkF1ZGlvU291cmNlIHtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkubXVzaWNfbWFuYWdlcj10aGlzO1xyXG4gICAgICAgIHRoaXMubG9hZFZvbHVtZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZE11dGUoKTtcclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5tdXNpY19tYW5hZ2VyPW51bGw7ICAgICAgICBcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH1cclxuICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3lo7Dpn7PnmoTpgLvovpHlpITnkIYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4gICAgbG9hZFZvbHVtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHZvbD1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ211c2ljX3ZvbHVtZScpO1xyXG4gICAgICAgIGlmKHZvbD09PW51bGx8fHZvbD09PScnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdm9sPTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2F2ZU11c2ljVm9sdW1lKHBhcnNlRmxvYXQodm9sKSk7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBzYXZlTXVzaWNWb2x1bWUodm9sPzpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodm9sIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZvbHVtZT12b2w7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtdXNpY192b2x1bWUnLHRoaXMudm9sdW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkTXV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG11dGU9Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtdXNpY19tdXRlJyk7XHJcbiAgICAgICAgaWYobXV0ZT09PW51bGx8fG11dGU9PT0nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG11dGU9ZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKG11dGU9PT0nZmFsc2UnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtdXRlPWZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihtdXRlPT09J3RydWUnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtdXRlPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYXZlTXVzaWNNdXRlKG11dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVNdXNpY011dGUobXV0ZT86Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZihtdXRlIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm11dGU9bXV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtdXNpY19tdXRlJyx0aGlzLm11dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlNdXNpYyhtdXNpY0luZGV4Ok11c2ljSW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnbXVzaWNzLycrbXVzaWNJbmRleCxjYy5BdWRpb0NsaXAsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkF1ZGlvQ2xpcCk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsaXA9YXNzZXRzO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy5sb29wPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuIl19