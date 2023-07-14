"use strict";
cc._RF.push(module, '27d10ksqP1Ah7faNVP5/yPa', 'ImagerLanguage');
// Scripts/Multilingual/ImagerLanguage.ts

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
var LanguageConstants_1 = require("../multiLanguage/LanguageConstants");
var LanguageManager_1 = require("../multiLanguage/LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ImagerLanguage = /** @class */ (function (_super) {
    __extends(ImagerLanguage, _super);
    function ImagerLanguage() {
        // @property(cc.Label)
        // label: cc.Label = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // @property
        // text: string = 'hello';
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.cur_text_id = 0; //图片的id
        //保存原本设定的Index，方便修改后恢复
        _this.original_text_id = 0;
        _this.is_translation = false;
        _this.cur_language_type = LanguageConstants_1.LanguageType.en;
        return _this;
    }
    ImagerLanguage.prototype.onLoad = function () {
        this.original_text_id = this.cur_text_id;
        if (!this.is_translation) {
            this.startTranslation();
        }
        this.addListen();
    };
    ImagerLanguage.prototype.setTextId = function (id) {
        this.cur_text_id = id;
        this.startTranslation();
    };
    /**如果需要动态切换语言-事件监听 */
    ImagerLanguage.prototype.startTranslation = function () {
        this.is_translation = true;
        this.spriteFrame = LanguageManager_1.default.getInstance().getSpBySpriteId(this.cur_text_id);
    };
    ImagerLanguage.prototype.addListen = function () {
        cc.director.on(LanguageConstants_1.OnLanguageChange, this.onLanguageChange, this);
    };
    /**事件移除 */
    ImagerLanguage.prototype.removeListen = function () {
        cc.director.off(LanguageConstants_1.OnLanguageChange, this.onLanguageChange, this);
    };
    ImagerLanguage.prototype.onDestroy = function () {
        this.removeListen();
    };
    ImagerLanguage.prototype.onLanguageChange = function () {
        // console.log("+++++++++++",LanguageManager.getInstance().getCurLanguageType(),this.cur_language_type)
        // if(this.cur_language_type!=LanguageManager.getInstance().getCurLanguageType())
        // {
        this.startTranslation();
        // }
    };
    __decorate([
        property()
    ], ImagerLanguage.prototype, "cur_text_id", void 0);
    ImagerLanguage = __decorate([
        ccclass
    ], ImagerLanguage);
    return ImagerLanguage;
}(cc.Sprite));
exports.default = ImagerLanguage;

cc._RF.pop();