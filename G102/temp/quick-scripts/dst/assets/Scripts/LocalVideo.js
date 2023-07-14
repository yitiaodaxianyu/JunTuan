
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/LocalVideo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9jYWxWaWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMseURBQW9EO0FBRzlDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBa0ZDO1FBL0VHLGlCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGtCQUFZLEdBQVUsSUFBSSxDQUFDO1FBQzNCLGlCQUFXLEdBQVUsSUFBSSxDQUFDO1FBQzFCLGNBQVEsR0FBSyxJQUFJLENBQUM7O1FBMkVsQixpQkFBaUI7SUFDckIsQ0FBQztJQTFFRyx5QkFBSSxHQUFKLFVBQU0sV0FBb0IsRUFBQyxVQUFtQjtRQUE5QyxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLFlBQVksR0FBQyxXQUFXLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUMsV0FBVyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDUixJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLFFBQVEsR0FBQyxDQUFDLENBQUM7UUFDZixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQztZQUNoQyxRQUFRLEVBQUUsQ0FBQztZQUNYLElBQUcsUUFBUSxJQUFFLENBQUMsRUFDZDtnQkFDSSxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7UUFDTCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsK0JBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLFdBQVcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9FLFdBQVcsQ0FBQyxNQUFNLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELElBQUcsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQ3JCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7WUFDakIsb0JBQW9CO1lBQ3BCLHlCQUF5QjtZQUN6QixXQUFXO1NBQ2Q7YUFDRDtZQUNJLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO1lBQ25CLFdBQVcsQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDbkQsTUFBTSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEdBQUcsQ0FBQztZQUNoQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLCtDQUErQztZQUMvQyxxQkFBcUI7WUFDckIsa0NBQWtDO1lBQ2xDLGtDQUFrQztTQUNyQztJQUNMLENBQUM7SUFFRCwrQkFBVSxHQUFWO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBRUkscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBRyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsRUFDckI7WUFDSSxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQ25CO2dCQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QjtTQUNKO2FBQ0Q7WUFDSSxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQ3BCO2dCQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUN2QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUE5RWdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FrRjlCO0lBQUQsaUJBQUM7Q0FsRkQsQUFrRkMsQ0FsRnVDLEVBQUUsQ0FBQyxTQUFTLEdBa0ZuRDtrQkFsRm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRJbmRleCB9IGZyb20gXCIuL1NvdW5kL0F1ZGlvQ29uc3RhbnRzXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2NhbFZpZGVvIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgIFxyXG4gICAgcmVtYWluX3RpbWU6bnVtYmVyPTEwO1xyXG4gICAgeWVzX2NhbGxiYWNrOkZ1bmN0aW9uPW51bGw7XHJcbiAgICBub19jYWxsYmFjazpGdW5jdGlvbj1udWxsO1xyXG4gICAgaW50ZXJ2YWw6YW55PW51bGw7XHJcblxyXG4gICAgaW5pdCAoeWVzQ2FsbGJhY2s6RnVuY3Rpb24sbm9DYWxsYmFjazpGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMueWVzX2NhbGxiYWNrPXllc0NhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMubm9fY2FsbGJhY2s9bm9DYWxsYmFjaztcclxuICAgICAgICB0aGlzLnJlbWFpbl90aW1lPTExK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo2KTtcclxuICAgICAgICB0aGlzLnNob3dSZW1haW4oKTsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWw9c2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zaG93UmVtYWluKCk7XHJcbiAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICBsZXQgYmc9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZycpO1xyXG4gICAgICAgIGxldCB0b3VjaE51bT0wO1xyXG4gICAgICAgIGJnLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCgpPT57XHJcbiAgICAgICAgICAgIHRvdWNoTnVtKys7XHJcbiAgICAgICAgICAgIGlmKHRvdWNoTnVtPj01KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrQnRuTm8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JlbWFpbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZW1haW5fdGltZS0tO1xyXG4gICAgICAgIGxldCByZW1haW5MYWJlbD10aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3JlbWFpbkxhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICByZW1haW5MYWJlbC5zdHJpbmc9JycrdGhpcy5yZW1haW5fdGltZTtcclxuICAgICAgICBsZXQgYnRuWWVzPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuWWVzJyk7XHJcbiAgICAgICAgbGV0IHRleHQ9YnRuWWVzLmdldENoaWxkQnlOYW1lKCd0ZXh0JykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTsgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQuc3RyaW5nPSflj5bmtognO1xyXG4gICAgICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5zaG93UmVtYWluKCk7XHJcbiAgICAgICAgICAgIC8vIH0sMTAwMCk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQuc3RyaW5nPSfpooblj5blpZblirEnO1xyXG4gICAgICAgICAgICByZW1haW5MYWJlbC5zdHJpbmc9J+ingueci+WujOavlSc7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnaGludExhYmVsJykuYWN0aXZlPWZhbHNlO1xyXG4gICAgICAgICAgICBidG5ZZXMueD0tMjcwK01hdGgucmFuZG9tKCkqNTQwO1xyXG4gICAgICAgICAgICBidG5ZZXMueT0tMTE0K01hdGgucmFuZG9tKCkqMjI4O1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAvLyBsZXQgYnRuTm89dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdidG5ObycpO1xyXG4gICAgICAgICAgICAvLyBidG5Oby5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgLy8gYnRuTm8ueD0tMjcwK01hdGgucmFuZG9tKCkqNTQwO1xyXG4gICAgICAgICAgICAvLyBidG5Oby55PS0xMTQrTWF0aC5yYW5kb20oKSoyMjg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQnRuTm8oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc291bmRfbWFuYWdlci5wbGF5U291bmQoU291bmRJbmRleC5jbGljayk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja0J0blllcygpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zb3VuZF9tYW5hZ2VyLnBsYXlTb3VuZChTb3VuZEluZGV4LmNsaWNrKTsgICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMucmVtYWluX3RpbWU+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubm9fY2FsbGJhY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9fY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnllc19jYWxsYmFjaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ZXNfY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==