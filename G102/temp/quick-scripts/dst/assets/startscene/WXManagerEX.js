
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WXManagerEX = /** @class */ (function (_super) {
    __extends(WXManagerEX, _super);
    function WXManagerEX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusBarHeight = 0;
        _this.resourcesBundle = cc.resources;
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
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //wx.cloud.init();
        }
    };
    WXManagerEX.prototype.vibrateShort = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.vibrateShort({ type: "medium" });
        }
    };
    WXManagerEX.prototype.getSystemInfo = function () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            try {
                var res = wx.getSystemInfoSync();
                console.log("wx:" + res.model);
                console.log("statusBarHeight:" + res.statusBarHeight);
                if (res.statusBarHeight > 20) {
                    WXManagerEX_1.getInstance().statusBarHeight = res.statusBarHeight;
                }
                wx.showShareMenu({});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnRzY2VuZVxcV1hNYW5hZ2VyRVgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFrREM7UUE5Q1UscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFFNUIscUJBQWUsR0FBMkIsRUFBRSxDQUFDLFNBQVMsQ0FBQzs7UUEyQzlELGlCQUFpQjtJQUNyQixDQUFDO29CQWxEb0IsV0FBVztJQVFkLHVCQUFXLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksYUFBVyxFQUFFLENBQUM7U0FDdEM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNNLDhCQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUN4QyxrQkFBa0I7U0FDckI7SUFDTCxDQUFDO0lBQ00sa0NBQVksR0FBbkI7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQ3hDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUN2QztJQUVMLENBQUM7SUFFTSxtQ0FBYSxHQUFwQjtRQUNJLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsSUFBSTtnQkFDQSxJQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtnQkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxHQUFHLENBQUMsZUFBZSxHQUFHLEVBQUUsRUFBRTtvQkFDMUIsYUFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO2lCQUNuRTtnQkFDRCxFQUFFLENBQUMsYUFBYSxDQUFDLEVBRWhCLENBQUMsQ0FBQTthQUVMO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsZ0NBQWdDO2FBQ25DO1NBQ0o7SUFFTCxDQUFDO0lBQ0QsMkJBQUssR0FBTDtJQUNBLENBQUM7O0lBN0NjLHFCQUFTLEdBQWdCLElBQUksQ0FBQztJQUY1QixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBa0QvQjtJQUFELGtCQUFDO0NBbERELEFBa0RDLENBbER3QyxFQUFFLENBQUMsU0FBUyxHQWtEcEQ7a0JBbERvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdYTWFuYWdlckVYIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFdYTWFuYWdlckVYID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdHVzQmFySGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyByZXNvdXJjZXNCdW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBjYy5yZXNvdXJjZXM7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBXWE1hbmFnZXJFWCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgV1hNYW5hZ2VyRVgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGluaXREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0U3lzdGVtSW5mbygpO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICAvL3d4LmNsb3VkLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdmlicmF0ZVNob3J0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB3eC52aWJyYXRlU2hvcnQoeyB0eXBlOiBcIm1lZGl1bVwiIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRTeXN0ZW1JbmZvKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT09IGNjLnN5cy5XRUNIQVRfR0FNRSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3eDpcIiArIHJlcy5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1c0JhckhlaWdodDpcIiArIHJlcy5zdGF0dXNCYXJIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXNCYXJIZWlnaHQgPiAyMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkuc3RhdHVzQmFySGVpZ2h0ID0gcmVzLnN0YXR1c0JhckhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiBjYXRjaCBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19