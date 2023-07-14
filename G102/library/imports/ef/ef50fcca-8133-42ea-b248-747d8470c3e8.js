"use strict";
cc._RF.push(module, 'ef50fzKgTNC6rJIdH2EcMPo', 'LabelLanguage');
// Scripts/multiLanguage/LabelLanguage.ts

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
var LabelLanguage = /** @class */ (function (_super) {
    __extends(LabelLanguage, _super);
    function LabelLanguage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //enableBold:boolean=true;
        _this.cur_language_index = LanguageConstants_1.LanguageIndex.NULL;
        //保存原本设定的Index，方便修改后恢复
        _this.original_index = LanguageConstants_1.LanguageIndex.NULL;
        _this.cur_language_type = LanguageConstants_1.LanguageType.en;
        return _this;
    }
    Object.defineProperty(LabelLanguage.prototype, "str_translation", {
        get: function () {
            return this.string;
        },
        set: function (newValue) {
            var oldValue = this.string;
            if (newValue !== oldValue) {
                this.startTranslationByStr(newValue);
            }
        },
        enumerable: false,
        configurable: true
    });
    LabelLanguage.prototype.onLoad = function () {
        this.original_index = this.cur_language_index;
        this.startTranslation();
    };
    LabelLanguage.prototype.setLanguageIndex = function (index) {
        this.cur_language_index = index;
        this.startTranslation();
    };
    LabelLanguage.prototype.getOriginalIndex = function () {
        return this.original_index;
    };
    //开始翻译 
    LabelLanguage.prototype.startTranslation = function () {
        this.cur_language_type = LanguageManager_1.default.getInstance().getCurLanguageType();
        //2.根据当前的字符串索引设置，如果为Null即没有预设,那么则开始查找，找不到就不翻译，维持原样
        if (this.cur_language_index != LanguageConstants_1.LanguageIndex.NULL) {
            this.string = LanguageManager_1.default.getInstance().getString(this.cur_language_index);
        }
        else {
            if (this.string != '') {
                var str = LanguageManager_1.default.getInstance().getStringByStr(this.string);
                if (str != '') {
                    this.string = str;
                }
            }
        }
    };
    //开始翻译 
    LabelLanguage.prototype.startTranslationByStr = function (newStr) {
        //2.根据当前的字符串开始查找，找不到就不翻译，维持原样
        if (newStr != '') {
            var str = LanguageManager_1.default.getInstance().getStringByStr(newStr);
            if (str != '') {
                this.string = str;
            }
            else {
                this.string = newStr;
            }
        }
    };
    //如果需要动态切换语言就开启以下代码
    LabelLanguage.prototype.update = function (dt) {
        if (this.cur_language_type != LanguageManager_1.default.getInstance().getCurLanguageType()) {
            this.startTranslation();
        }
    };
    LabelLanguage.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    __decorate([
        property({ type: cc.Enum(LanguageConstants_1.LanguageIndex) })
    ], LabelLanguage.prototype, "cur_language_index", void 0);
    __decorate([
        property
    ], LabelLanguage.prototype, "str_translation", null);
    LabelLanguage = __decorate([
        ccclass
    ], LabelLanguage);
    return LabelLanguage;
}(cc.Label));
exports.default = LabelLanguage;

cc._RF.pop();