
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/startscene/StartScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9bfbcHEQFtMpLMG6NO6V28U', 'StartScene');
// startscene/StartScene.ts

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
var WXManagerEX_1 = require("./WXManagerEX");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBar = null;
        _this.loadLabel = null;
        _this.tipLabel = null;
        _this.loadProGress = 0;
        return _this;
        // update (dt) {}
    }
    StartScene.prototype.onLoad = function () {
        console.log("开始加载分包");
        // cc.director.loadScene("load");
        this.loadingBar = this.node.getChildByName('bg_loading').getChildByName('ProgressBar').getComponent(cc.ProgressBar);
        console.log("1");
        this.loadLabel = this.node.getChildByName('bg_loading').getChildByName('ProgressBar').getChildByName('loadLabel').getComponent(cc.Label);
        console.log("2");
        this.tipLabel = this.node.getChildByName('bg_loading').getChildByName('load').getComponent(cc.Label);
        console.log("3");
        this.loadingBar.progress = 0;
        this.loadLabel.string = (0 * 100).toFixed(0) + '%';
        WXManagerEX_1.default.getInstance().initData();
        cc.loader.downloader.loadSubpackage('MainScript', function (err) {
            if (err) {
                console.error("加载分包失败");
                return console.error(err);
            }
            console.log('load subpackage successfully.');
            cc.assetManager.loadBundle('ImageBundle', function (err, bundle) {
                if (err) {
                    console.error("加载ImagesBundle失败");
                    return;
                }
                cc.assetManager.loadBundle('resourcesBundle', function (err, bundle) {
                    if (err) {
                        console.error("加载resourcesBundle失败");
                        return;
                    }
                    //因为加载代码引入的原因只能先放到这里
                    WXManagerEX_1.default.getInstance().resourcesBundle = cc.assetManager.getBundle('resourcesBundle');
                    cc.director.loadScene("load");
                });
            });
        });
    };
    StartScene.prototype.update = function (dt) {
        if (this.loadProGress < 100) {
            this.loadProGress += 0.2;
        }
        if (this.loadProGress > 80) {
            this.tipLabel.string = "首次进入游戏可能耗时较长...";
        }
        this.loadingBar.progress = this.loadProGress / 100;
        this.loadLabel.string = (this.loadProGress).toFixed(0) + '%';
    };
    StartScene = __decorate([
        ccclass
    ], StartScene);
    return StartScene;
}(cc.Component));
exports.default = StartScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnRzY2VuZVxcU3RhcnRTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUFvRUM7UUFoRUcsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRWxDLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFhLElBQUksQ0FBQztRQUVsQixrQkFBWSxHQUFRLENBQUMsQ0FBQzs7UUF3RDlCLGlCQUFpQjtJQUNyQixDQUFDO0lBeERHLDJCQUFNLEdBQU47UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xILE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25HLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbkQscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLFVBQVUsR0FBRztZQUMzRCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0I7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFFN0MsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFVBQUMsR0FBRyxFQUFFLE1BQU07Z0JBQ2xELElBQUksR0FBRyxFQUFFO29CQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDbEMsT0FBTztpQkFDVjtnQkFDRCxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFNO29CQUN0RCxJQUFJLEdBQUcsRUFBRTt3QkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7d0JBQ3JDLE9BQU87cUJBQ1Y7b0JBQ0Qsb0JBQW9CO29CQUNwQixxQkFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUN6RixFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUtQLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUNTLDJCQUFNLEdBQWhCLFVBQWlCLEVBQVU7UUFDdkIsSUFBRyxJQUFJLENBQUMsWUFBWSxHQUFDLEdBQUcsRUFBQztZQUNyQixJQUFJLENBQUMsWUFBWSxJQUFFLEdBQUcsQ0FBQztTQUMxQjtRQUNELElBQUcsSUFBSSxDQUFDLFlBQVksR0FBQyxFQUFFLEVBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUMsaUJBQWlCLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFDLEdBQUcsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2pFLENBQUM7SUFqRWdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FvRTlCO0lBQUQsaUJBQUM7Q0FwRUQsQUFvRUMsQ0FwRXVDLEVBQUUsQ0FBQyxTQUFTLEdBb0VuRDtrQkFwRW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5pbXBvcnQgV1hNYW5hZ2VyRVggZnJvbSBcIi4vV1hNYW5hZ2VyRVhcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydFNjZW5lIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICBcclxuICAgIGxvYWRpbmdCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIFxyXG4gICAgbG9hZExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICBcclxuICAgIHRpcExhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkUHJvR3Jlc3M6bnVtYmVyPTA7XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vliqDovb3liIbljIVcIik7XHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibG9hZFwiKTtcclxuICAgICAgICB0aGlzLmxvYWRpbmdCYXI9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZ19sb2FkaW5nJykuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIjFcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sb2FkTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZ19sb2FkaW5nJykuZ2V0Q2hpbGRCeU5hbWUoJ1Byb2dyZXNzQmFyJykuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWRMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIyXCIpO1xyXG4gICAgICAgIHRoaXMudGlwTGFiZWw9dGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdiZ19sb2FkaW5nJykuZ2V0Q2hpbGRCeU5hbWUoJ2xvYWQnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiM1wiKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLmxvYWRMYWJlbC5zdHJpbmcgPSAoMCAqIDEwMCkudG9GaXhlZCgwKSArICclJztcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmluaXREYXRhKCk7XHJcbiAgICAgICAgY2MubG9hZGVyLmRvd25sb2FkZXIubG9hZFN1YnBhY2thZ2UoJ01haW5TY3JpcHQnLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLliqDovb3liIbljIXlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkIHN1YnBhY2thZ2Ugc3VjY2Vzc2Z1bGx5LicpO1xyXG5cclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUoJ0ltYWdlQnVuZGxlJywgKGVyciwgYnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIuWKoOi9vUltYWdlc0J1bmRsZeWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZSgncmVzb3VyY2VzQnVuZGxlJywgKGVyciwgYnVuZGxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5Yqg6L29cmVzb3VyY2VzQnVuZGxl5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5Zug5Li65Yqg6L295Luj56CB5byV5YWl55qE5Y6f5Zug5Y+q6IO95YWI5pS+5Yiw6L+Z6YeMXHJcbiAgICAgICAgICAgICAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKCdyZXNvdXJjZXNCdW5kbGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJsb2FkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmxvYWRQcm9HcmVzczwxMDApe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcm9HcmVzcys9MC4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvYWRQcm9HcmVzcz44MCl7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuc3RyaW5nPVwi6aaW5qyh6L+b5YWl5ri45oiP5Y+v6IO96ICX5pe26L6D6ZW/Li4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhci5wcm9ncmVzcyA9IHRoaXMubG9hZFByb0dyZXNzLzEwMDtcclxuICAgICAgICB0aGlzLmxvYWRMYWJlbC5zdHJpbmcgPSAodGhpcy5sb2FkUHJvR3Jlc3MpLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=