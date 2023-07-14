"use strict";
cc._RF.push(module, '36b85RKntpD+6t0gs9pDAQy', 'LoadProgress');
// Scripts/Loading/LoadProgress.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//用于场景预加载
var LoadProgress = /** @class */ (function (_super) {
    __extends(LoadProgress, _super);
    function LoadProgress() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loading_bar = null;
        _this.loading_light = null;
        _this.scene_name = '';
        _this.loaded_callback = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    LoadProgress.prototype.start = function () {
    };
    LoadProgress.prototype.startLoad = function (name) {
        var _this = this;
        this.scene_name = name;
        this.node.active = true;
        cc.director.preloadScene(this.scene_name, this.onProgress.bind(this), function () {
            //cc.director.loadScene("GameScene");
            if (_this.loaded_callback.length > 0) {
                for (var i = 0; i < _this.loaded_callback.length; i++) {
                    _this.loaded_callback[i].emit(null);
                }
            }
            else {
                cc.director.loadScene(_this.scene_name);
            }
        });
    };
    LoadProgress.prototype.onProgress = function (completedCount, totalCount, item) {
        this.node.active = true;
        this.loading_bar.progress = completedCount / totalCount;
        this.loading_light.x = this.loading_bar.progress * this.loading_bar.totalLength - this.loading_bar.totalLength / 2;
    };
    __decorate([
        property({ type: cc.ProgressBar, tooltip: '进度条组件' })
    ], LoadProgress.prototype, "loading_bar", void 0);
    __decorate([
        property({ type: cc.Node, tooltip: '进度条光 ' })
    ], LoadProgress.prototype, "loading_light", void 0);
    __decorate([
        property({ tooltip: '需要预加载的场景名字' })
    ], LoadProgress.prototype, "scene_name", void 0);
    __decorate([
        property({ type: [cc.Component.EventHandler], tooltip: '进度条加载完毕后的回调' })
    ], LoadProgress.prototype, "loaded_callback", void 0);
    LoadProgress = __decorate([
        ccclass
    ], LoadProgress);
    return LoadProgress;
}(cc.Component));
exports.default = LoadProgress;

cc._RF.pop();