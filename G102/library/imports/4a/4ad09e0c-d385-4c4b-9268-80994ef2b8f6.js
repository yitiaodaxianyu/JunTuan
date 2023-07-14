"use strict";
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