
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/multiLanguage/LabelLanguage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbXVsdGlMYW5ndWFnZVxcTGFiZWxMYW5ndWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBa0U7QUFDbEUscURBQWdEO0FBRzFDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFRO0lBQW5EO1FBQUEscUVBbUZDO1FBakZHLDBCQUEwQjtRQUVsQix3QkFBa0IsR0FBa0IsaUNBQWEsQ0FBQyxJQUFJLENBQUM7UUFDL0Qsc0JBQXNCO1FBQ2Qsb0JBQWMsR0FBaUIsaUNBQWEsQ0FBQyxJQUFJLENBQUM7UUFDbEQsdUJBQWlCLEdBQWlCLGdDQUFZLENBQUMsRUFBRSxDQUFDOztJQTRFOUQsQ0FBQztJQXpFRyxzQkFBSSwwQ0FBZTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBcUIsUUFBUTtZQUN6QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hDO1FBQ1QsQ0FBQzs7O09BUEE7SUFTRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixLQUFvQjtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx3Q0FBZ0IsR0FBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU87SUFDUCx3Q0FBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ3pFLGtEQUFrRDtRQUNsRCxJQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBRSxpQ0FBYSxDQUFDLElBQUksRUFDOUM7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFDLHlCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2hGO2FBQ0Q7WUFDSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUUsRUFBRSxFQUNsQjtnQkFDSSxJQUFJLEdBQUcsR0FBQyx5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xFLElBQUcsR0FBRyxJQUFFLEVBQUUsRUFDVjtvQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQztpQkFDbkI7YUFDSjtTQUNKO0lBQ04sQ0FBQztJQUNELE9BQU87SUFDUCw2Q0FBcUIsR0FBckIsVUFBc0IsTUFBYTtRQUUvQiw2QkFBNkI7UUFDN0IsSUFBRyxNQUFNLElBQUUsRUFBRSxFQUNiO1lBQ0ksSUFBSSxHQUFHLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0QsSUFBRyxHQUFHLElBQUUsRUFBRSxFQUNWO2dCQUNJLElBQUksQ0FBQyxNQUFNLEdBQUMsR0FBRyxDQUFDO2FBQ25CO2lCQUNEO2dCQUNJLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO2FBQ3RCO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsbUJBQW1CO0lBQ25CLDhCQUFNLEdBQU4sVUFBTyxFQUFFO1FBRUwsSUFBRyxJQUFJLENBQUMsaUJBQWlCLElBQUUseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxFQUM3RTtZQUNJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFFSSxpQkFBTSxTQUFTLFdBQUUsQ0FBQztJQUN0QixDQUFDO0lBOUVEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUNBQWEsQ0FBQyxFQUFDLENBQUM7NkRBQ3VCO0lBTS9EO1FBREMsUUFBUTt3REFHUjtJQVpnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBbUZqQztJQUFELG9CQUFDO0NBbkZELEFBbUZDLENBbkYwQyxFQUFFLENBQUMsS0FBSyxHQW1GbEQ7a0JBbkZvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGFuZ3VhZ2VJbmRleCwgTGFuZ3VhZ2VUeXBlIH0gZnJvbSBcIi4vTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuaW1wb3J0IExhbmd1YWdlTWFuYWdlciBmcm9tIFwiLi9MYW5ndWFnZU1hbmFnZXJcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhYmVsTGFuZ3VhZ2UgZXh0ZW5kcyBjYy5MYWJlbCB7XHJcblxyXG4gICAgLy9lbmFibGVCb2xkOmJvb2xlYW49dHJ1ZTtcclxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5FbnVtKExhbmd1YWdlSW5kZXgpfSlcclxuICAgIHByaXZhdGUgY3VyX2xhbmd1YWdlX2luZGV4OiBMYW5ndWFnZUluZGV4ID0gTGFuZ3VhZ2VJbmRleC5OVUxMO1xyXG4gICAgLy/kv53lrZjljp/mnKzorr7lrprnmoRJbmRleO+8jOaWueS+v+S/ruaUueWQjuaBouWkjVxyXG4gICAgcHJpdmF0ZSBvcmlnaW5hbF9pbmRleDpMYW5ndWFnZUluZGV4ID0gTGFuZ3VhZ2VJbmRleC5OVUxMO1xyXG4gICAgcHJpdmF0ZSBjdXJfbGFuZ3VhZ2VfdHlwZTogTGFuZ3VhZ2VUeXBlID0gTGFuZ3VhZ2VUeXBlLmVuO1xyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2V0IHN0cl90cmFuc2xhdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzdHJfdHJhbnNsYXRpb24gKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5zdHJpbmc7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUcmFuc2xhdGlvbkJ5U3RyKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxfaW5kZXg9dGhpcy5jdXJfbGFuZ3VhZ2VfaW5kZXg7XHJcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGFuZ3VhZ2VJbmRleChpbmRleCA6TGFuZ3VhZ2VJbmRleCl7XHJcbiAgICAgICAgdGhpcy5jdXJfbGFuZ3VhZ2VfaW5kZXg9aW5kZXg7XHJcbiAgICAgICAgdGhpcy5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T3JpZ2luYWxJbmRleCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpbmFsX2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL57+76K+RIFxyXG4gICAgc3RhcnRUcmFuc2xhdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT1MYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJMYW5ndWFnZVR5cGUoKTtcclxuICAgICAgICAgLy8yLuagueaNruW9k+WJjeeahOWtl+espuS4sue0ouW8leiuvue9ru+8jOWmguaenOS4uk51bGzljbPmsqHmnInpooTorr4s6YKj5LmI5YiZ5byA5aeL5p+l5om+77yM5om+5LiN5Yiw5bCx5LiN57+76K+R77yM57u05oyB5Y6f5qC3XHJcbiAgICAgICAgIGlmKHRoaXMuY3VyX2xhbmd1YWdlX2luZGV4IT1MYW5ndWFnZUluZGV4Lk5VTEwpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMuc3RyaW5nPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZyh0aGlzLmN1cl9sYW5ndWFnZV9pbmRleCk7XHJcbiAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIGlmKHRoaXMuc3RyaW5nIT0nJylcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICBsZXQgc3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZ0J5U3RyKHRoaXMuc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICBpZihzdHIhPScnKVxyXG4gICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJpbmc9c3RyO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5byA5aeL57+76K+RIFxyXG4gICAgc3RhcnRUcmFuc2xhdGlvbkJ5U3RyKG5ld1N0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgLy8yLuagueaNruW9k+WJjeeahOWtl+espuS4suW8gOWni+afpeaJvu+8jOaJvuS4jeWIsOWwseS4jee/u+ivke+8jOe7tOaMgeWOn+agt1xyXG4gICAgICAgIGlmKG5ld1N0ciE9JycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgc3RyPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFN0cmluZ0J5U3RyKG5ld1N0cik7XHJcbiAgICAgICAgICAgIGlmKHN0ciE9JycpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RyaW5nPXN0cjtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJpbmc9bmV3U3RyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvL+WmguaenOmcgOimgeWKqOaAgeWIh+aNouivreiogOWwseW8gOWQr+S7peS4i+S7o+eggVxyXG4gICAgdXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUhPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25EZXN0cm95KCk7XHJcbiAgICB9XHJcbn1cclxuIl19