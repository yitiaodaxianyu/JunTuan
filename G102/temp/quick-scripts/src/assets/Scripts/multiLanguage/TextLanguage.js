"use strict";
cc._RF.push(module, 'c16e5sVZrZAYKAJue79QfaF', 'TextLanguage');
// Scripts/multiLanguage/TextLanguage.ts

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
var TextManagement_1 = require("../JsonData/TextManagement");
var LanguageConstants_1 = require("./LanguageConstants");
var LanguageManager_1 = require("./LanguageManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TextLanguage = /** @class */ (function (_super) {
    __extends(TextLanguage, _super);
    function TextLanguage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cur_text_id = 0;
        //保存原本设定的Index，方便修改后恢复
        _this.original_text_id = 0;
        _this.cur_language_type = LanguageConstants_1.LanguageType.en;
        /**替换的符号字符串，如 ~  */
        _this.replace_str = [];
        /**替换的值字符串，如10% */
        _this.replace_value = [];
        /**链接几个id之间的字符串，如：，、 */
        _this.link_str = [];
        /**前缀字符串 */
        _this.prefix_str = '';
        _this.is_translation = false;
        return _this;
    }
    TextLanguage.prototype.onLoad = function () {
        this.original_text_id = this.cur_text_id;
        if (!this.is_translation) {
            this.startTranslation();
        }
        this.addListen();
    };
    /**
     *
     * @param id 文本id或文本id数组
     * @param linkStr 链接文本id数组的字符串
     */
    TextLanguage.prototype.setTextId = function (id, linkStr) {
        if (linkStr === void 0) { linkStr = []; }
        this.cur_text_id = id;
        if (typeof linkStr == "string") {
            this.link_str[0] = linkStr;
        }
        else {
            this.link_str = linkStr;
        }
        this.startTranslation();
    };
    TextLanguage.prototype.getTextId = function () {
        return this.cur_text_id;
    };
    TextLanguage.prototype.setReplaceValue = function (replaceStr, replaceValue) {
        if (typeof replaceStr == "string") {
            this.replace_str[0] = replaceStr;
        }
        else {
            this.replace_str = replaceStr;
        }
        if (typeof replaceValue == "string") {
            this.replace_value[0] = replaceValue;
        }
        else {
            this.replace_value = replaceValue;
        }
        this.startTranslation();
        this.startReplace();
    };
    TextLanguage.prototype.getOriginalTextId = function () {
        return this.original_text_id;
    };
    //开始翻译 
    TextLanguage.prototype.startTranslation = function () {
        this.cur_language_type = LanguageManager_1.default.getInstance().getCurLanguageType();
        if (this.cur_text_id != 0 && TextManagement_1.TextManagementManager.getInstance().getIsLoadCompleted()) {
            this.is_translation = true;
            if (typeof this.cur_text_id == "number") {
                this.setString(LanguageManager_1.default.getInstance().getStrByTextId(this.cur_text_id));
            }
            else {
                var str = '';
                for (var i = 0; i < this.cur_text_id.length; i++) {
                    var id = this.cur_text_id[i];
                    if (id != 0) {
                        str += LanguageManager_1.default.getInstance().getStrByTextId(id);
                        if (i < this.link_str.length)
                            str += this.link_str[i];
                    }
                }
                this.setString(str);
            }
        }
    };
    /**设置前缀 */
    TextLanguage.prototype.setPrefix = function (str) {
        this.prefix_str = str;
    };
    /**开始替换 */
    TextLanguage.prototype.startReplace = function () {
        for (var i = 0; i < this.replace_str.length; i++) {
            var str = this.replace_str[i];
            if (str != '') {
                var nowStr = this.string;
                this.setString(nowStr.replace(str, this.replace_value[i]));
            }
        }
    };
    TextLanguage.prototype.setString = function (str) {
        if (this.prefix_str != '') {
            if (this.string.substring(0, this.prefix_str.length) == this.prefix_str) {
                this.string = str;
            }
            else {
                this.string = this.prefix_str + str;
            }
        }
        else {
            this.string = str;
        }
    };
    /**如果需要动态切换语言-事件监听 */
    TextLanguage.prototype.addListen = function () {
        cc.director.on(LanguageConstants_1.OnLanguageChange, this.onLanguageChange, this);
    };
    /**事件移除 */
    TextLanguage.prototype.removeListen = function () {
        cc.director.off(LanguageConstants_1.OnLanguageChange, this.onLanguageChange, this);
    };
    TextLanguage.prototype.onLanguageChange = function () {
        if (this.cur_language_type != LanguageManager_1.default.getInstance().getCurLanguageType()) {
            this.startTranslation();
            this.startReplace();
        }
    };
    // //如果需要动态切换语言就开启以下代码
    // update(dt)
    // {
    //     if(this.cur_language_type!=LanguageManager.getInstance().getCurLanguageType())
    //     {
    //         this.startTranslation();
    //         this.startReplace();
    //     }
    // }    
    TextLanguage.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.removeListen();
    };
    __decorate([
        property({ tooltip: "当前的文本id,使用文本表内预设的id" })
    ], TextLanguage.prototype, "cur_text_id", void 0);
    TextLanguage = __decorate([
        ccclass
    ], TextLanguage);
    return TextLanguage;
}(cc.Label));
exports.default = TextLanguage;

cc._RF.pop();