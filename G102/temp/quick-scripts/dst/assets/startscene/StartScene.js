
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnRzY2VuZVxcU3RhcnRTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUEyREM7UUF2REcsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRWxDLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsY0FBUSxHQUFhLElBQUksQ0FBQztRQUVsQixrQkFBWSxHQUFRLENBQUMsQ0FBQzs7UUErQzlCLGlCQUFpQjtJQUNyQixDQUFDO0lBL0NHLDJCQUFNLEdBQU47UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xILE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkksT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25HLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbkQscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLFVBQVUsR0FBRztZQUMzRCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0I7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtnQkFDdEQsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNyQyxPQUFPO2lCQUNWO2dCQUNELG9CQUFvQjtnQkFDcEIscUJBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDekYsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFHUCxDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFDUywyQkFBTSxHQUFoQixVQUFpQixFQUFVO1FBQ3ZCLElBQUcsSUFBSSxDQUFDLFlBQVksR0FBQyxHQUFHLEVBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksSUFBRSxHQUFHLENBQUM7U0FDMUI7UUFDRCxJQUFHLElBQUksQ0FBQyxZQUFZLEdBQUMsRUFBRSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFDLGlCQUFpQixDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBQyxHQUFHLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUNqRSxDQUFDO0lBeERnQixVQUFVO1FBRDlCLE9BQU87T0FDYSxVQUFVLENBMkQ5QjtJQUFELGlCQUFDO0NBM0RELEFBMkRDLENBM0R1QyxFQUFFLENBQUMsU0FBUyxHQTJEbkQ7a0JBM0RvQixVQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuL1dYTWFuYWdlckVYXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG5cclxuICAgXHJcbiAgICBsb2FkaW5nQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcbiAgICBcclxuICAgIGxvYWRMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgXHJcbiAgICB0aXBMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgbG9hZFByb0dyZXNzOm51bWJlcj0wO1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5byA5aeL5Yqg6L295YiG5YyFXCIpO1xyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImxvYWRcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmdfbG9hZGluZycpLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCIxXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubG9hZExhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmdfbG9hZGluZycpLmdldENoaWxkQnlOYW1lKCdQcm9ncmVzc0JhcicpLmdldENoaWxkQnlOYW1lKCdsb2FkTGFiZWwnKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiMlwiKTtcclxuICAgICAgICB0aGlzLnRpcExhYmVsPXRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZSgnYmdfbG9hZGluZycpLmdldENoaWxkQnlOYW1lKCdsb2FkJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIjNcIik7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhci5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgdGhpcy5sb2FkTGFiZWwuc3RyaW5nID0gKDAgKiAxMDApLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5pbml0RGF0YSgpO1xyXG4gICAgICAgIGNjLmxvYWRlci5kb3dubG9hZGVyLmxvYWRTdWJwYWNrYWdlKCdNYWluU2NyaXB0JywgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5Yqg6L295YiG5YyF5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9hZCBzdWJwYWNrYWdlIHN1Y2Nlc3NmdWxseS4nKTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUoJ3Jlc291cmNlc0J1bmRsZScsIChlcnIsIGJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLliqDovb1yZXNvdXJjZXNCdW5kbGXlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lm6DkuLrliqDovb3ku6PnoIHlvJXlhaXnmoTljp/lm6Dlj6rog73lhYjmlL7liLDov5nph4xcclxuICAgICAgICAgICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlID0gY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZSgncmVzb3VyY2VzQnVuZGxlJyk7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJsb2FkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlKGR0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmxvYWRQcm9HcmVzczwxMDApe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRQcm9HcmVzcys9MC4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmxvYWRQcm9HcmVzcz44MCl7XHJcbiAgICAgICAgICAgIHRoaXMudGlwTGFiZWwuc3RyaW5nPVwi6aaW5qyh6L+b5YWl5ri45oiP5Y+v6IO96ICX5pe26L6D6ZW/Li4uXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZGluZ0Jhci5wcm9ncmVzcyA9IHRoaXMubG9hZFByb0dyZXNzLzEwMDtcclxuICAgICAgICB0aGlzLmxvYWRMYWJlbC5zdHJpbmcgPSAodGhpcy5sb2FkUHJvR3Jlc3MpLnRvRml4ZWQoMCkgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=