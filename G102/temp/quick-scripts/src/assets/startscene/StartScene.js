"use strict";
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