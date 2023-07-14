
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/multiLanguage/LanguageSprite.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4ad094M04VMS5JogJlO8rj2', 'LanguageSprite');
// Scripts/multiLanguage/LanguageSprite.ts

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
var LanguageConstants_1 = require("./LanguageConstants");
var LanguageManager_1 = require("./LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SpriteLanguage = /** @class */ (function (_super) {
    __extends(SpriteLanguage, _super);
    function SpriteLanguage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_sprite_index = LanguageConstants_1.SpriteIndex.NULL;
        _this.cur_language_type = LanguageConstants_1.LanguageType.en;
        return _this;
    }
    SpriteLanguage.prototype.onLoad = function () {
        this.startTranslation();
        this.addListen();
    };
    /**如果需要动态切换语言-事件监听 */
    SpriteLanguage.prototype.addListen = function () {
        cc.director.on(LanguageConstants_1.OnLanguageChange, this.onLanguageChange, this);
    };
    /**事件移除 */
    SpriteLanguage.prototype.removeListen = function () {
        cc.director.off(LanguageConstants_1.OnLanguageChange, this.onLanguageChange, this);
    };
    SpriteLanguage.prototype.onLanguageChange = function () {
        if (this.cur_language_type != LanguageManager_1.default.getInstance().getCurLanguageType()) {
            this.startTranslation();
        }
    };
    //开始翻译 
    SpriteLanguage.prototype.startTranslation = function () {
        this.cur_language_type = LanguageManager_1.default.getInstance().getCurLanguageType();
        //2.根据当前的字符串索引设置，如果为Null即没有预设,那么则开始查找，找不到就不翻译，维持原样
        if (this.cur_sprite_index != LanguageConstants_1.SpriteIndex.NULL) {
            this.spriteFrame = LanguageManager_1.default.getInstance().getSpriteFrame(this.cur_sprite_index);
        }
    };
    SpriteLanguage.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    __decorate([
        property({ type: cc.Enum(LanguageConstants_1.SpriteIndex) })
    ], SpriteLanguage.prototype, "cur_sprite_index", void 0);
    SpriteLanguage = __decorate([
        ccclass
    ], SpriteLanguage);
    return SpriteLanguage;
}(cc.Sprite));
exports.default = SpriteLanguage;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbXVsdGlMYW5ndWFnZVxcTGFuZ3VhZ2VTcHJpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQWtGO0FBQ2xGLHFEQUFnRDtBQUcxQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBUztJQUFyRDtRQUFBLHFFQWdEQztRQTdDVyxzQkFBZ0IsR0FBZ0IsK0JBQVcsQ0FBQyxJQUFJLENBQUM7UUFFakQsdUJBQWlCLEdBQWlCLGdDQUFZLENBQUMsRUFBRSxDQUFDOztJQTJDOUQsQ0FBQztJQXhDRywrQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxxQkFBcUI7SUFDZCxrQ0FBUyxHQUFoQjtRQUVJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLG9DQUFnQixFQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsVUFBVTtJQUNILHFDQUFZLEdBQW5CO1FBRUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0NBQWdCLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFDSSxJQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBRSx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEVBQzdFO1lBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FFM0I7SUFDTCxDQUFDO0lBRUQsT0FBTztJQUNQLHlDQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDekUsa0RBQWtEO1FBQ2xELElBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFFLCtCQUFXLENBQUMsSUFBSSxFQUMxQztZQUNJLElBQUksQ0FBQyxXQUFXLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDeEY7SUFDTixDQUFDO0lBR0Qsa0NBQVMsR0FBVDtRQUVJLGlCQUFNLFNBQVMsV0FBRSxDQUFDO0lBQ3RCLENBQUM7SUE1Q0Q7UUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywrQkFBVyxDQUFDLEVBQUMsQ0FBQzs0REFDbUI7SUFIeEMsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQWdEbEM7SUFBRCxxQkFBQztDQWhERCxBQWdEQyxDQWhEMkMsRUFBRSxDQUFDLE1BQU0sR0FnRHBEO2tCQWhEb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExhbmd1YWdlVHlwZSwgT25MYW5ndWFnZUNoYW5nZSwgU3ByaXRlSW5kZXggfSBmcm9tIFwiLi9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5cclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlTGFuZ3VhZ2UgZXh0ZW5kcyBjYy5TcHJpdGUge1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKFNwcml0ZUluZGV4KX0pXHJcbiAgICBwcml2YXRlIGN1cl9zcHJpdGVfaW5kZXg6IFNwcml0ZUluZGV4ID0gU3ByaXRlSW5kZXguTlVMTDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjdXJfbGFuZ3VhZ2VfdHlwZTogTGFuZ3VhZ2VUeXBlID0gTGFuZ3VhZ2VUeXBlLmVuO1xyXG5cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRUcmFuc2xhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5aaC5p6c6ZyA6KaB5Yqo5oCB5YiH5o2i6K+t6KiALeS6i+S7tuebkeWQrCAqL1xyXG4gICAgcHVibGljIGFkZExpc3RlbigpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oT25MYW5ndWFnZUNoYW5nZSx0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5LqL5Lu256e76ZmkICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlTGlzdGVuKClcclxuICAgIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5vZmYoT25MYW5ndWFnZUNoYW5nZSx0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2UsdGhpcyk7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUhPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lvIDlp4vnv7vor5EgXHJcbiAgICBzdGFydFRyYW5zbGF0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmN1cl9sYW5ndWFnZV90eXBlPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpO1xyXG4gICAgICAgICAvLzIu5qC55o2u5b2T5YmN55qE5a2X56ym5Liy57Si5byV6K6+572u77yM5aaC5p6c5Li6TnVsbOWNs+ayoeaciemihOiuvizpgqPkuYjliJnlvIDlp4vmn6Xmib7vvIzmib7kuI3liLDlsLHkuI3nv7vor5HvvIznu7TmjIHljp/moLdcclxuICAgICAgICAgaWYodGhpcy5jdXJfc3ByaXRlX2luZGV4IT1TcHJpdGVJbmRleC5OVUxMKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLnNwcml0ZUZyYW1lPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFNwcml0ZUZyYW1lKHRoaXMuY3VyX3Nwcml0ZV9pbmRleCk7XHJcbiAgICAgICAgIH1cclxuICAgIH0gICAgXHJcblxyXG5cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuIl19