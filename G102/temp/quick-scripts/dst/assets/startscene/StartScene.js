
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnRzY2VuZVxcU3RhcnRTY2VuZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0MsOEJBQVk7SUFBcEQ7O0lBcUJBLENBQUM7SUFqQkcsMEJBQUssR0FBTDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsaUNBQWlDO1FBQ2pDLHFCQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxVQUFVLEdBQUc7WUFDM0QsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEIsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQWxCZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQXFCOUI7SUFBRCxpQkFBQztDQXJCRCxBQXFCQyxDQXJCdUMsRUFBRSxDQUFDLFNBQVMsR0FxQm5EO2tCQXJCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBXWE1hbmFnZXJFWCBmcm9tIFwiLi9XWE1hbmFnZXJFWFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXJ0U2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vliqDovb3liIbljIVcIik7XHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibG9hZFwiKTtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLmluaXREYXRhKCk7XHJcbiAgICAgICAgY2MubG9hZGVyLmRvd25sb2FkZXIubG9hZFN1YnBhY2thZ2UoJ01haW5TY3JpcHQnLCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHsgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi5Yqg6L295YiG5YyF5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoZXJyKTsgXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2FkIHN1YnBhY2thZ2Ugc3VjY2Vzc2Z1bGx5LicpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJsb2FkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxufVxyXG4iXX0=