
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/multiLanguage/TextLanguage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbXVsdGlMYW5ndWFnZVxcVGV4dExhbmd1YWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUFtRTtBQUNuRSx5REFBcUU7QUFDckUscURBQWdEO0FBRzFDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTBDLGdDQUFRO0lBQWxEO1FBQUEscUVBcUpDO1FBbEpXLGlCQUFXLEdBQW9CLENBQUMsQ0FBQztRQUN6QyxzQkFBc0I7UUFDZCxzQkFBZ0IsR0FBb0IsQ0FBQyxDQUFDO1FBQ3RDLHVCQUFpQixHQUFpQixnQ0FBWSxDQUFDLEVBQUUsQ0FBQztRQUMxRCxtQkFBbUI7UUFDWCxpQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUNoQyxrQkFBa0I7UUFDVixtQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUNsQyx1QkFBdUI7UUFDZixjQUFRLEdBQVUsRUFBRSxDQUFDO1FBQzdCLFdBQVc7UUFDSCxnQkFBVSxHQUFRLEVBQUUsQ0FBQztRQUNyQixvQkFBYyxHQUFTLEtBQUssQ0FBQzs7SUFzSXpDLENBQUM7SUFwSWEsNkJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxJQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGdDQUFTLEdBQVQsVUFBVSxFQUFtQixFQUFDLE9BQTBCO1FBQTFCLHdCQUFBLEVBQUEsWUFBMEI7UUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxFQUFFLENBQUM7UUFDcEIsSUFBRyxPQUFPLE9BQU8sSUFBSSxRQUFR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QUVELHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsSUFBSTtJQUNKLHFGQUFxRjtJQUNyRixRQUFRO0lBQ1IsbUNBQW1DO0lBQ25DLCtCQUErQjtJQUMvQixRQUFRO0lBQ1IsUUFBUTtJQUVFLGdDQUFTLEdBQW5CO1FBRUksaUJBQU0sU0FBUyxXQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFqSkQ7UUFEQyxRQUFRLENBQUMsRUFBQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsQ0FBQztxREFDRDtJQUh4QixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBcUpoQztJQUFELG1CQUFDO0NBckpELEFBcUpDLENBckp5QyxFQUFFLENBQUMsS0FBSyxHQXFKakQ7a0JBckpvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGV4dE1hbmFnZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL1RleHRNYW5hZ2VtZW50XCI7XHJcbmltcG9ydCB7IExhbmd1YWdlVHlwZSwgT25MYW5ndWFnZUNoYW5nZSB9IGZyb20gXCIuL0xhbmd1YWdlQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBMYW5ndWFnZU1hbmFnZXIgZnJvbSBcIi4vTGFuZ3VhZ2VNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0TGFuZ3VhZ2UgZXh0ZW5kcyBjYy5MYWJlbCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHt0b29sdGlwOlwi5b2T5YmN55qE5paH5pysaWQs5L2/55So5paH5pys6KGo5YaF6aKE6K6+55qEaWRcIn0pXHJcbiAgICBwcml2YXRlIGN1cl90ZXh0X2lkOiBudW1iZXJ8bnVtYmVyW10gPSAwO1xyXG4gICAgLy/kv53lrZjljp/mnKzorr7lrprnmoRJbmRleO+8jOaWueS+v+S/ruaUueWQjuaBouWkjVxyXG4gICAgcHJpdmF0ZSBvcmlnaW5hbF90ZXh0X2lkOiBudW1iZXJ8bnVtYmVyW10gPSAwO1xyXG4gICAgcHJpdmF0ZSBjdXJfbGFuZ3VhZ2VfdHlwZTogTGFuZ3VhZ2VUeXBlID0gTGFuZ3VhZ2VUeXBlLmVuO1xyXG4gICAgLyoq5pu/5o2i55qE56ym5Y+35a2X56ym5Liy77yM5aaCIH4gICovXHJcbiAgICBwcml2YXRlIHJlcGxhY2Vfc3RyOnN0cmluZ1tdPVtdO1xyXG4gICAgLyoq5pu/5o2i55qE5YC85a2X56ym5Liy77yM5aaCMTAlICovXHJcbiAgICBwcml2YXRlIHJlcGxhY2VfdmFsdWU6c3RyaW5nW109W107XHJcbiAgICAvKirpk77mjqXlh6DkuKppZOS5i+mXtOeahOWtl+espuS4su+8jOWmgu+8mu+8jOOAgSAqL1xyXG4gICAgcHJpdmF0ZSBsaW5rX3N0cjpzdHJpbmdbXT1bXTtcclxuICAgIC8qKuWJjee8gOWtl+espuS4siAqL1xyXG4gICAgcHJpdmF0ZSBwcmVmaXhfc3RyOnN0cmluZz0nJztcclxuICAgIHByaXZhdGUgaXNfdHJhbnNsYXRpb246Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsX3RleHRfaWQ9dGhpcy5jdXJfdGV4dF9pZDtcclxuICAgICAgICBpZighdGhpcy5pc190cmFuc2xhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2xhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZExpc3RlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gaWQg5paH5pysaWTmiJbmlofmnKxpZOaVsOe7hFxyXG4gICAgICogQHBhcmFtIGxpbmtTdHIg6ZO+5o6l5paH5pysaWTmlbDnu4TnmoTlrZfnrKbkuLJcclxuICAgICAqL1xyXG4gICAgc2V0VGV4dElkKGlkIDpudW1iZXJ8bnVtYmVyW10sbGlua1N0cjpzdHJpbmd8c3RyaW5nW109W10pe1xyXG4gICAgICAgIHRoaXMuY3VyX3RleHRfaWQ9aWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGxpbmtTdHIgPT0gXCJzdHJpbmdcIil7XHJcbiAgICAgICAgICAgIHRoaXMubGlua19zdHJbMF09bGlua1N0cjsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5saW5rX3N0cj1saW5rU3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUZXh0SWQoKTpudW1iZXJ8bnVtYmVyW117XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VyX3RleHRfaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UmVwbGFjZVZhbHVlKHJlcGxhY2VTdHI6c3RyaW5nfHN0cmluZ1tdLHJlcGxhY2VWYWx1ZTpzdHJpbmd8c3RyaW5nW10pe1xyXG4gICAgICAgIGlmKHR5cGVvZiByZXBsYWNlU3RyID09IFwic3RyaW5nXCIpe1xyXG4gICAgICAgICAgICB0aGlzLnJlcGxhY2Vfc3RyWzBdPXJlcGxhY2VTdHI7ICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZV9zdHI9cmVwbGFjZVN0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodHlwZW9mIHJlcGxhY2VWYWx1ZSA9PSBcInN0cmluZ1wiKXtcclxuICAgICAgICAgICAgdGhpcy5yZXBsYWNlX3ZhbHVlWzBdPXJlcGxhY2VWYWx1ZTsgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZXBsYWNlX3ZhbHVlPXJlcGxhY2VWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydFJlcGxhY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRPcmlnaW5hbFRleHRJZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsX3RleHRfaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vnv7vor5EgXHJcbiAgICBzdGFydFRyYW5zbGF0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmN1cl9sYW5ndWFnZV90eXBlPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpO1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX3RleHRfaWQhPTAmJlRleHRNYW5hZ2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldElzTG9hZENvbXBsZXRlZCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pc190cmFuc2xhdGlvbj10cnVlO1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5jdXJfdGV4dF9pZCA9PSBcIm51bWJlclwiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nKExhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKHRoaXMuY3VyX3RleHRfaWQpKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyPScnO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5jdXJfdGV4dF9pZC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkPXRoaXMuY3VyX3RleHRfaWRbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaWQhPTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIrPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0ckJ5VGV4dElkKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaTx0aGlzLmxpbmtfc3RyLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cis9dGhpcy5saW5rX3N0cltpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0cmluZyhzdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuiuvue9ruWJjee8gCAqL1xyXG4gICAgc2V0UHJlZml4KHN0cjpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMucHJlZml4X3N0cj1zdHI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5byA5aeL5pu/5o2iICovXHJcbiAgICBwcml2YXRlIHN0YXJ0UmVwbGFjZSgpe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMucmVwbGFjZV9zdHIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgc3RyPXRoaXMucmVwbGFjZV9zdHJbaV07XHJcbiAgICAgICAgICAgIGlmKHN0ciE9Jycpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vd1N0cj10aGlzLnN0cmluZztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RyaW5nKG5vd1N0ci5yZXBsYWNlKHN0cix0aGlzLnJlcGxhY2VfdmFsdWVbaV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFN0cmluZyhzdHI6c3RyaW5nKXtcclxuICAgICAgICBpZih0aGlzLnByZWZpeF9zdHIhPScnKXtcclxuICAgICAgICAgICAgaWYodGhpcy5zdHJpbmcuc3Vic3RyaW5nKDAsdGhpcy5wcmVmaXhfc3RyLmxlbmd0aCk9PXRoaXMucHJlZml4X3N0cil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmluZz1zdHI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmc9dGhpcy5wcmVmaXhfc3RyK3N0cjtcclxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHJpbmc9c3RyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirlpoLmnpzpnIDopoHliqjmgIHliIfmjaLor63oqIAt5LqL5Lu255uR5ZCsICovXHJcbiAgICBwdWJsaWMgYWRkTGlzdGVuKClcclxuICAgIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5vbihPbkxhbmd1YWdlQ2hhbmdlLHRoaXMub25MYW5ndWFnZUNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirkuovku7bnp7vpmaQgKi9cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW4oKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9mZihPbkxhbmd1YWdlQ2hhbmdlLHRoaXMub25MYW5ndWFnZUNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuICAgXHJcbiAgICBvbkxhbmd1YWdlQ2hhbmdlKCl7XHJcbiAgICAgICAgaWYodGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSE9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q3VyTGFuZ3VhZ2VUeXBlKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFJlcGxhY2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIC8v5aaC5p6c6ZyA6KaB5Yqo5oCB5YiH5o2i6K+t6KiA5bCx5byA5ZCv5Lul5LiL5Luj56CBXHJcbiAgICAvLyB1cGRhdGUoZHQpXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgaWYodGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSE9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q3VyTGFuZ3VhZ2VUeXBlKCkpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5zdGFydFJlcGxhY2UoKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9ICAgIFxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uRGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuKCk7XHJcbiAgICB9XHJcbn1cclxuIl19