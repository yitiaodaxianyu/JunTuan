
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Loading/LoadProgress.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTG9hZGluZ1xcTG9hZFByb2dyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBQzFDLFNBQVM7QUFFVDtJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQTZDQztRQTFDRyxpQkFBVyxHQUFtQixJQUFJLENBQUM7UUFHbkMsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsZ0JBQVUsR0FBVyxFQUFFLENBQUM7UUFHeEIscUJBQWUsR0FBK0IsRUFBRSxDQUFDOztJQWlDckQsQ0FBQztJQWhDRyx3QkFBd0I7SUFFeEIsZUFBZTtJQUVmLDRCQUFLLEdBQUw7SUFFQSxDQUFDO0lBQ0QsZ0NBQVMsR0FBVCxVQUFVLElBQVc7UUFBckIsaUJBa0JDO1FBaEJHLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztRQUN0QixFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2xFLHFDQUFxQztZQUNyQyxJQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDaEM7Z0JBQ0ksS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUMvQztvQkFDSSxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdEM7YUFDSjtpQkFDRDtnQkFDSSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUM7UUFFTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxpQ0FBVSxHQUFWLFVBQVcsY0FBYyxFQUFDLFVBQVUsRUFBQyxJQUFJO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxjQUFjLEdBQUMsVUFBVSxDQUFDO1FBQ3RELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBekNEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDO3FEQUNiO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDO3VEQUNYO0lBRzlCO1FBREMsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxDQUFDO29EQUNUO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLENBQUM7eURBQ2xCO0lBWmhDLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0E2Q2hDO0lBQUQsbUJBQUM7Q0E3Q0QsQUE2Q0MsQ0E3Q3lDLEVBQUUsQ0FBQyxTQUFTLEdBNkNyRDtrQkE3Q29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG4vL+eUqOS6juWcuuaZr+mihOWKoOi9vVxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkUHJvZ3Jlc3MgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5Qcm9ncmVzc0Jhcix0b29sdGlwOifov5vluqbmnaHnu4Tku7YnfSlcclxuICAgIGxvYWRpbmdfYmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0eXBlOmNjLk5vZGUsdG9vbHRpcDon6L+b5bqm5p2h5YWJICd9KVxyXG4gICAgbG9hZGluZ19saWdodDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0b29sdGlwOifpnIDopoHpooTliqDovb3nmoTlnLrmma/lkI3lrZcnfSlcclxuICAgIHNjZW5lX25hbWU6IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpbY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcl0sdG9vbHRpcDon6L+b5bqm5p2h5Yqg6L295a6M5q+V5ZCO55qE5Zue6LCDJ30pXHJcbiAgICBsb2FkZWRfY2FsbGJhY2s6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9W107XHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICAvLyBvbkxvYWQgKCkge31cclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgc3RhcnRMb2FkKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2NlbmVfbmFtZT1uYW1lO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5wcmVsb2FkU2NlbmUodGhpcy5zY2VuZV9uYW1lLCB0aGlzLm9uUHJvZ3Jlc3MuYmluZCh0aGlzKSwgKCk9PntcclxuICAgICAgICAgICAgLy9jYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJHYW1lU2NlbmVcIik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubG9hZGVkX2NhbGxiYWNrLmxlbmd0aD4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmxvYWRlZF9jYWxsYmFjay5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZF9jYWxsYmFja1tpXS5lbWl0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUodGhpcy5zY2VuZV9uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KSAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblByb2dyZXNzKGNvbXBsZXRlZENvdW50LHRvdGFsQ291bnQsaXRlbSl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZT10cnVlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ19iYXIucHJvZ3Jlc3MgPSBjb21wbGV0ZWRDb3VudC90b3RhbENvdW50O1xyXG4gICAgICAgIHRoaXMubG9hZGluZ19saWdodC54ID0gdGhpcy5sb2FkaW5nX2Jhci5wcm9ncmVzcyp0aGlzLmxvYWRpbmdfYmFyLnRvdGFsTGVuZ3RoLXRoaXMubG9hZGluZ19iYXIudG90YWxMZW5ndGgvMjtcclxuICAgIH1cclxufVxyXG4iXX0=