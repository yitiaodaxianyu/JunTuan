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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StartScene.prototype.start = function () {
        console.log("开始加载分包");
        // cc.director.loadScene("load");
        WXManagerEX_1.default.getInstance().initData();
        cc.loader.downloader.loadSubpackage('MainScript', function (err) {
            if (err) {
                console.error("加载分包失败");
                return console.error(err);
            }
            console.log('load subpackage successfully.');
            cc.director.loadScene("load");
        });
    };
    StartScene = __decorate([
        ccclass
    ], StartScene);
    return StartScene;
}(cc.Component));
exports.default = StartScene;

cc._RF.pop();