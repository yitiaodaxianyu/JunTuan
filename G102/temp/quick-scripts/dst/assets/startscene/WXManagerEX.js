
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/startscene/WXManagerEX.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd92b2QAzyVKCpEtlk6LfpjX', 'WXManagerEX');
// startscene/WXManagerEX.ts

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
exports.WXADEnvnt = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WXManagerEX = /** @class */ (function (_super) {
    __extends(WXManagerEX, _super);
    function WXManagerEX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusBarHeight = 0;
        _this.resourcesBundle = cc.resources;
        _this.sharFlag = false;
        return _this;
        // update (dt) {}
    }
    WXManagerEX_1 = WXManagerEX;
    WXManagerEX.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WXManagerEX_1();
        }
        return this._instance;
    };
    WXManagerEX.prototype.initData = function () {
        this.getSystemInfo();
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
        }
    };
    WXManagerEX.prototype.vibrateShort = function () {
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            tt.vibrateShort();
        }
    };
    WXManagerEX.prototype.shareAppMessage = function () {
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
        }
    };
    WXManagerEX.prototype.getSystemInfo = function () {
        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            try {
                var res = tt.getSystemInfoSync();
                console.log("wx:" + res.model);
                console.log("statusBarHeight:" + res.statusBarHeight);
                if (res.statusBarHeight > 20) {
                    WXManagerEX_1.getInstance().statusBarHeight = res.statusBarHeight;
                }
            }
            catch (e) {
                // Do something when catch error
            }
        }
    };
    WXManagerEX.prototype.start = function () {
    };
    var WXManagerEX_1;
    WXManagerEX._instance = null;
    WXManagerEX = WXManagerEX_1 = __decorate([
        ccclass
    ], WXManagerEX);
    return WXManagerEX;
}(cc.Component));
exports.default = WXManagerEX;
var WXADEnvnt;
(function (WXADEnvnt) {
    //转盘奖励
    WXADEnvnt["ZHUANPANJIANGLISHIPIN"] = "ZHUANPANJIANGLISHIPIN";
    //签到双倍领取
    WXADEnvnt["QIRIQIANDAOSHIPIN"] = "QIRIQIANDAOSHIPIN";
    //快速挂机
    WXADEnvnt["KUAISUGUAJISHIPIN"] = "KUAISUGUAJISHIPIN";
    //战令解锁
    WXADEnvnt["ZHANLINGJIESUOSHIPIN"] = "ZHANLINGJIESUOSHIPIN";
    //免费钻石
    WXADEnvnt["ZUANSHILINGQUSHIPIN"] = "ZUANSHILINGQU";
    //免费金币
    WXADEnvnt["JINBISHIPIN"] = "JINBISHIPIN";
    //装备库抽奖
    WXADEnvnt["ZHUANGBEICHOUJIANG"] = "ZHUANGBEICHOUJIANG";
    //局内复活
    WXADEnvnt["JUNEIFUHUOSHIPIN"] = "JUNEIFUHUOSHIPIN";
})(WXADEnvnt = exports.WXADEnvnt || (exports.WXADEnvnt = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnRzY2VuZVxcV1hNYW5hZ2VyRVgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBcUZDO1FBakZVLHFCQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRTVCLHFCQUFlLEdBQTJCLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFnRHZELGNBQVEsR0FBUyxLQUFLLENBQUM7O1FBOEI5QixpQkFBaUI7SUFDckIsQ0FBQztvQkFyRm9CLFdBQVc7SUE2QmQsdUJBQVcsR0FBekI7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFXLEVBQUUsQ0FBQztTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBR00sOEJBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO1NBSzlDO0lBQ0wsQ0FBQztJQUVNLGtDQUFZLEdBQW5CO1FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtZQUMzQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFFTCxDQUFDO0lBRU0scUNBQWUsR0FBdEI7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO1NBRTlDO0lBRUwsQ0FBQztJQUdNLG1DQUFhLEdBQXBCO1FBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRTtZQUMzQyxJQUFJO2dCQUNBLElBQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLEdBQUcsQ0FBQyxlQUFlLEdBQUcsRUFBRSxFQUFFO29CQUMxQixhQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUM7aUJBQ25FO2FBSUo7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixnQ0FBZ0M7YUFDbkM7U0FDSjtJQUVMLENBQUM7SUFDRCwyQkFBSyxHQUFMO0lBQ0EsQ0FBQzs7SUFoRmMscUJBQVMsR0FBZ0IsSUFBSSxDQUFDO0lBRjVCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FxRi9CO0lBQUQsa0JBQUM7Q0FyRkQsQUFxRkMsQ0FyRndDLEVBQUUsQ0FBQyxTQUFTLEdBcUZwRDtrQkFyRm9CLFdBQVc7QUFzRmhDLElBQVksU0FtQlg7QUFuQkQsV0FBWSxTQUFTO0lBQ2pCLE1BQU07SUFDTiw0REFBNkMsQ0FBQTtJQUM3QyxRQUFRO0lBQ1Isb0RBQXFDLENBQUE7SUFDckMsTUFBTTtJQUNOLG9EQUFxQyxDQUFBO0lBQ3JDLE1BQU07SUFDTiwwREFBMkMsQ0FBQTtJQUMzQyxNQUFNO0lBQ04sa0RBQW1DLENBQUE7SUFDbkMsTUFBTTtJQUNOLHdDQUF5QixDQUFBO0lBQ3pCLE9BQU87SUFDUCxzREFBdUMsQ0FBQTtJQUN2QyxNQUFNO0lBQ04sa0RBQW1DLENBQUE7QUFHdkMsQ0FBQyxFQW5CVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQW1CcEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV1hNYW5hZ2VyRVggZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogV1hNYW5hZ2VyRVggPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0dXNCYXJIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHJlc291cmNlc0J1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSA9IGNjLnJlc291cmNlcztcclxuXHJcbiAgICAvL+i9rOebmOWlluWKsVxyXG4gICAgcHVibGljIHpodWFucGFuU2hpcGluO1xyXG4gICAgLy/lpI3mtLvlpZblirFcclxuICAgIHB1YmxpYyBmdWh1b1NoaXBpbjtcclxuICAgIC8v5LiD5pel562+5Yiw6KeG6aKRXHJcbiAgICBwdWJsaWMgcWlyaVFpYW5kYW9TaGlwaW47XHJcbiAgICAvL+W/q+mAn+aMguacuuinhumikVxyXG4gICAgcHVibGljIGt1YWlzdUd1YWppU2hpcGluO1xyXG5cclxuICAgIC8v5oiY5Luk6Kej6ZSB6KeG6aKRXHJcbiAgICBwdWJsaWMgemhhbmxpbmdqaWVzdW9TaGlwaW47XHJcbiAgICAvL+WFjei0uemSu+efs1xyXG4gICAgcHVibGljIHp1YW5zaGlpU2hpcGluO1xyXG4gICAgLy/lhY3otLnph5HluIFcclxuICAgIHB1YmxpYyBqaW5iaVNoaXBpbjtcclxuICAgIC8v6KOF5aSH5bqT5oq95aWWXHJcbiAgICBwdWJsaWMgemh1YW5nYmVpa3VTaGlwaW47XHJcbiAgICAvL+mXqOelqOi0reS5sFxyXG4gICAgcHVibGljIGNhcmRCeUFkO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IFdYTWFuYWdlckVYIHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBXWE1hbmFnZXJFWCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICBcclxuICAgIHB1YmxpYyBpbml0RGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdldFN5c3RlbUluZm8oKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpIHtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZpYnJhdGVTaG9ydCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuQllURURBTkNFX0dBTUUpIHtcclxuICAgICAgICAgICAgdHQudmlicmF0ZVNob3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBzaGFyRmxhZzpib29sZWFuPWZhbHNlO1xyXG4gICAgcHVibGljIHNoYXJlQXBwTWVzc2FnZSgpOnZvaWR7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKSB7XHJcbiAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgcHVibGljIGdldFN5c3RlbUluZm8oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLkJZVEVEQU5DRV9HQU1FKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB0dC5nZXRTeXN0ZW1JbmZvU3luYygpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInd4OlwiICsgcmVzLm1vZGVsKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3RhdHVzQmFySGVpZ2h0OlwiICsgcmVzLnN0YXR1c0JhckhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1c0JhckhlaWdodCA+IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5zdGF0dXNCYXJIZWlnaHQgPSByZXMuc3RhdHVzQmFySGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdoZW4gY2F0Y2ggZXJyb3JcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBzdGFydCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbmV4cG9ydCBlbnVtIFdYQURFbnZudCB7XHJcbiAgICAvL+i9rOebmOWlluWKsVxyXG4gICAgWkhVQU5QQU5KSUFOR0xJU0hJUElOPVwiWkhVQU5QQU5KSUFOR0xJU0hJUElOXCIsXHJcbiAgICAvL+etvuWIsOWPjOWAjemihuWPllxyXG4gICAgUUlSSVFJQU5EQU9TSElQSU49XCJRSVJJUUlBTkRBT1NISVBJTlwiLFxyXG4gICAgLy/lv6vpgJ/mjILmnLpcclxuICAgIEtVQUlTVUdVQUpJU0hJUElOPVwiS1VBSVNVR1VBSklTSElQSU5cIixcclxuICAgIC8v5oiY5Luk6Kej6ZSBXHJcbiAgICBaSEFOTElOR0pJRVNVT1NISVBJTj1cIlpIQU5MSU5HSklFU1VPU0hJUElOXCIsXHJcbiAgICAvL+WFjei0uemSu+efs1xyXG4gICAgWlVBTlNISUxJTkdRVVNISVBJTj1cIlpVQU5TSElMSU5HUVVcIixcclxuICAgIC8v5YWN6LS56YeR5biBXHJcbiAgICBKSU5CSVNISVBJTj1cIkpJTkJJU0hJUElOXCIsXHJcbiAgICAvL+ijheWkh+W6k+aKveWlllxyXG4gICAgWkhVQU5HQkVJQ0hPVUpJQU5HPVwiWkhVQU5HQkVJQ0hPVUpJQU5HXCIsXHJcbiAgICAvL+WxgOWGheWkjea0u1xyXG4gICAgSlVORUlGVUhVT1NISVBJTj1cIkpVTkVJRlVIVU9TSElQSU5cIlxyXG5cclxuXHJcbn0iXX0=