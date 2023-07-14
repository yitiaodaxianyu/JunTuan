
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Multilingual/ImagerLanguage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTXVsdGlsaW5ndWFsXFxJbWFnZXJMYW5ndWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdsRix3RUFBb0Y7QUFDcEYsb0VBQStEO0FBR3pELElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFTO0lBQXJEO1FBRUksc0JBQXNCO1FBQ3RCLDBCQUEwQjtRQUg5QixxRUE0REM7UUF2REcsWUFBWTtRQUNaLDBCQUEwQjtRQUUxQix3QkFBd0I7UUFFeEIsZUFBZTtRQUVQLGlCQUFXLEdBQVcsQ0FBQyxDQUFDLENBQUEsT0FBTztRQUV2QyxzQkFBc0I7UUFDZCxzQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDN0Isb0JBQWMsR0FBUyxLQUFLLENBQUM7UUFDN0IsdUJBQWlCLEdBQWlCLGdDQUFZLENBQUMsRUFBRSxDQUFDOztJQTJDOUQsQ0FBQztJQXpDYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLElBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBUyxHQUFULFVBQVUsRUFBVTtRQUNoQixJQUFJLENBQUMsV0FBVyxHQUFDLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQscUJBQXFCO0lBQ3JCLHlDQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUMseUJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3BGLENBQUM7SUFDTSxrQ0FBUyxHQUFoQjtRQUVJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLG9DQUFnQixFQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsVUFBVTtJQUNILHFDQUFZLEdBQW5CO1FBRUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0NBQWdCLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFUyxrQ0FBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUQseUNBQWdCLEdBQWhCO1FBQ0ksdUdBQXVHO1FBQ3ZHLGlGQUFpRjtRQUNqRixJQUFJO1FBQ0EsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDNUIsSUFBSTtJQUNSLENBQUM7SUE5Q0Q7UUFEQyxRQUFRLEVBQUU7dURBQ3FCO0lBWmYsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQTREbEM7SUFBRCxxQkFBQztDQTVERCxBQTREQyxDQTVEMkMsRUFBRSxDQUFDLE1BQU0sR0E0RHBEO2tCQTVEb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCB7IEhlcm9NYW5hZ2VyIH0gZnJvbSBcIi4uL0hlcm8vRGF0YS9IZXJvTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZVR5cGUsIE9uTGFuZ3VhZ2VDaGFuZ2UgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTGFuZ3VhZ2VNYW5hZ2VyIGZyb20gXCIuLi9tdWx0aUxhbmd1YWdlL0xhbmd1YWdlTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBJbWFnZV9MYW5ndWFnZU1hbmFnZXIgfSBmcm9tIFwiLi9JbWFnZV9MYW5ndWFnZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZXJMYW5ndWFnZSBleHRlbmRzIGNjLlNwcml0ZSB7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgLy8gbGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvLyBAcHJvcGVydHlcclxuICAgIC8vIHRleHQ6IHN0cmluZyA9ICdoZWxsbyc7XHJcblxyXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XHJcblxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcHJpdmF0ZSBjdXJfdGV4dF9pZDogbnVtYmVyID0gMDsvL+WbvueJh+eahGlkXHJcblxyXG4gICAgLy/kv53lrZjljp/mnKzorr7lrprnmoRJbmRleO+8jOaWueS+v+S/ruaUueWQjuaBouWkjVxyXG4gICAgcHJpdmF0ZSBvcmlnaW5hbF90ZXh0X2lkOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBpc190cmFuc2xhdGlvbjpib29sZWFuPWZhbHNlO1xyXG4gICAgcHJpdmF0ZSBjdXJfbGFuZ3VhZ2VfdHlwZTogTGFuZ3VhZ2VUeXBlID0gTGFuZ3VhZ2VUeXBlLmVuO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMub3JpZ2luYWxfdGV4dF9pZD10aGlzLmN1cl90ZXh0X2lkO1xyXG4gICAgICAgIGlmKCF0aGlzLmlzX3RyYW5zbGF0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGV4dElkKGlkIDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuY3VyX3RleHRfaWQ9aWQ7ICAgICAgICBcclxuICAgICAgICB0aGlzLnN0YXJ0VHJhbnNsYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlpoLmnpzpnIDopoHliqjmgIHliIfmjaLor63oqIAt5LqL5Lu255uR5ZCsICovXHJcbiAgICBzdGFydFRyYW5zbGF0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5pc190cmFuc2xhdGlvbj10cnVlO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlRnJhbWU9TGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0U3BCeVNwcml0ZUlkKHRoaXMuY3VyX3RleHRfaWQpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkTGlzdGVuKClcclxuICAgIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5vbihPbkxhbmd1YWdlQ2hhbmdlLHRoaXMub25MYW5ndWFnZUNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirkuovku7bnp7vpmaQgKi9cclxuICAgIHB1YmxpYyByZW1vdmVMaXN0ZW4oKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLm9mZihPbkxhbmd1YWdlQ2hhbmdlLHRoaXMub25MYW5ndWFnZUNoYW5nZSx0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbigpXHJcbiAgICB9XHJcblxyXG4gICAgb25MYW5ndWFnZUNoYW5nZSgpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiKysrKysrKysrKytcIixMYW5ndWFnZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDdXJMYW5ndWFnZVR5cGUoKSx0aGlzLmN1cl9sYW5ndWFnZV90eXBlKVxyXG4gICAgICAgIC8vIGlmKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUhPUxhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1ckxhbmd1YWdlVHlwZSgpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRyYW5zbGF0aW9uKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=