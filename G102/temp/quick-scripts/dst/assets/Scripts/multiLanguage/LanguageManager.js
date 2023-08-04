
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/multiLanguage/LanguageManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ca4baI/WzhKAZ9OMC1i59vq', 'LanguageManager');
// Scripts/multiLanguage/LanguageManager.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WXManagerEX_1 = require("../../startscene/WXManagerEX");
var ApkManager_1 = require("../Ads/ApkManager");
var Constants_1 = require("../Constants");
var TextManagement_1 = require("../JsonData/TextManagement");
var Image_Language_1 = require("../Multilingual/Image_Language");
var LanguageConstants_1 = require("./LanguageConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LanguageManager = /** @class */ (function () {
    function LanguageManager() {
        this.cur_language_type = LanguageConstants_1.LanguageType.zh;
        this.prev_language_type = LanguageConstants_1.LanguageType.zh;
        this.sp_atlas = null;
        this.ImagerLanguage_sprite = null;
    }
    LanguageManager_1 = LanguageManager;
    LanguageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new LanguageManager_1();
            this._instance.init();
        }
        return this._instance;
    };
    LanguageManager.prototype.init = function () {
        var curLan = this.readLanguage();
        this.loadSpriteAtlas();
        this.loadSpImagerLanguage_sprite();
        if (Constants_1.CUR_Platform == Constants_1.Release_Platform.APK) {
            cc.LM = this;
            //先判断有没有保存一种语言
            if (curLan == null) {
                ApkManager_1.default.getInstance().getAndroidLanguage();
            }
        }
        if (Constants_1.IsDebug) {
            this.cur_language_type = LanguageConstants_1.LanguageType.zh;
        }
    };
    LanguageManager.prototype.loadSpImagerLanguage_sprite = function () {
        var _this = this;
        if (this.ImagerLanguage_sprite) {
            return;
        }
        this.ImagerLanguage_sprite = new Map();
        WXManagerEX_1.default.getInstance().resourcesBundle.loadDir('Multilingual', cc.SpriteFrame, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            var len = assets.length;
            for (var i = 0; i < len; i++) {
                var sp = assets[i];
                var name = sp.name;
                _this.ImagerLanguage_sprite.set(name, sp);
            }
        });
    };
    LanguageManager.prototype.getSpBySpriteId = function (id) {
        var ilm = Image_Language_1.Image_LanguageManager.getInstance();
        var name = '';
        switch (this.cur_language_type) {
            case LanguageConstants_1.LanguageType.en:
                {
                    name = ilm.getEnglish(id);
                }
                break;
            case LanguageConstants_1.LanguageType.zh:
                {
                    name = ilm.getChinese(id);
                }
                break;
            case LanguageConstants_1.LanguageType.id:
                {
                    name = ilm.getIndonesian(id);
                }
                break;
            case LanguageConstants_1.LanguageType.be:
                {
                    name = ilm.getRussian(id);
                }
                break;
            case LanguageConstants_1.LanguageType.th:
                {
                    name = ilm.getThai(id);
                }
                break;
            case LanguageConstants_1.LanguageType.kr:
                {
                    name = ilm.getKorea(id);
                }
                break;
            default:
                {
                    name = ilm.getEnglish(id);
                }
                break;
        }
        return this.ImagerLanguage_sprite.get(name);
    };
    LanguageManager.prototype.readLanguage = function () {
        var str = cc.sys.localStorage.getItem('cur_language');
        if (str === '' || str === null) {
            str = null;
        }
        else {
            str = parseInt(str);
            this.prev_language_type = this.cur_language_type = str;
        }
        return str;
    };
    LanguageManager.prototype.saveLanguage = function (type) {
        cc.sys.localStorage.setItem('cur_language', type);
    };
    //切换当前语言
    LanguageManager.prototype.switchLanguage = function (type) {
        if (this.cur_language_type != type) {
            this.setCurLanguageType(type);
            return true;
        }
        return false;
    };
    LanguageManager.prototype.setLanguage = function (type) {
        cc.log('setLanguage：' + type);
        var curType = parseInt(type);
        this.switchLanguage(curType);
        this.saveLanguage(curType);
        cc.director.emit(LanguageConstants_1.OnLanguageChange);
    };
    LanguageManager.prototype.setCurLanguageType = function (type) {
        this.setPrevLanguageType(this.cur_language_type);
        this.cur_language_type = type;
    };
    LanguageManager.prototype.getCurLanguageType = function () {
        return this.cur_language_type;
    };
    LanguageManager.prototype.setPrevLanguageType = function (type) {
        this.prev_language_type = type;
    };
    LanguageManager.prototype.getPrevLanguageType = function () {
        return this.prev_language_type;
    };
    LanguageManager.prototype.isSameLanguageType = function () {
        return this.prev_language_type == this.cur_language_type ? true : false;
    };
    LanguageManager.prototype.getString = function (index) {
        return LanguageConstants_1.AllLanguageString[index][this.cur_language_type];
    };
    /*根据一个任意语言类型的字符串，获得当前对应语言的字符串*/
    LanguageManager.prototype.getStringByStr = function (str) {
        var len = LanguageConstants_1.AllLanguageString.length;
        for (var i = 0; i < len; i++) {
            for (var lanType = 0; lanType < LanguageConstants_1.LanguageType.num; lanType++) {
                if (LanguageConstants_1.AllLanguageString[i][lanType] == str) {
                    return this.getString(i);
                }
            }
        }
        return '';
    };
    /*根据文本id获得一个字符串*/
    LanguageManager.prototype.getStrByTextId = function (textId) {
        var tm = TextManagement_1.TextManagementManager.getInstance();
        switch (this.cur_language_type) {
            case LanguageConstants_1.LanguageType.en:
                {
                    return tm.getEnglish(textId);
                }
                break;
            case LanguageConstants_1.LanguageType.zh:
                {
                    return tm.getChinese(textId);
                }
                break;
            case LanguageConstants_1.LanguageType.id:
                {
                    return tm.getIndonesian(textId);
                }
                break;
            case LanguageConstants_1.LanguageType.be:
                {
                    return tm.getRussian(textId);
                }
                break;
            case LanguageConstants_1.LanguageType.th:
                {
                    return tm.getThai(textId);
                }
                break;
            case LanguageConstants_1.LanguageType.kr:
                {
                    return tm.getKorea(textId);
                }
                break;
            default:
                {
                    return tm.getEnglish(textId);
                }
                break;
        }
    };
    //图片翻译的
    LanguageManager.prototype.loadSpriteAtlas = function () {
        var _this = this;
        WXManagerEX_1.default.getInstance().resourcesBundle.load('sp/language_sprite', cc.SpriteAtlas, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            _this.sp_atlas = assets;
        });
    };
    LanguageManager.prototype.getSpriteFrame = function (index) {
        if (this.sp_atlas) {
            var sp = this.sp_atlas.getSpriteFrame(LanguageConstants_1.AllLanSpriteFrame[index][this.cur_language_type]);
            if (sp == null) {
                sp = this.sp_atlas.getSpriteFrame(LanguageConstants_1.AllLanSpriteFrame[index][LanguageConstants_1.LanguageType.en]);
            }
            return sp;
        }
    };
    var LanguageManager_1;
    LanguageManager._instance = null;
    LanguageManager = LanguageManager_1 = __decorate([
        ccclass
    ], LanguageManager);
    return LanguageManager;
}());
exports.default = LanguageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbXVsdGlMYW5ndWFnZVxcTGFuZ3VhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELGdEQUEyQztBQUMzQywwQ0FBa0Y7QUFDbEYsNkRBQW1FO0FBRW5FLGlFQUF1RTtBQUN2RSx5REFBcUk7QUFDL0gsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtRQUVZLHNCQUFpQixHQUFnQixnQ0FBWSxDQUFDLEVBQUUsQ0FBQztRQUNqRCx1QkFBa0IsR0FBZ0IsZ0NBQVksQ0FBQyxFQUFFLENBQUM7UUFFbEQsYUFBUSxHQUFnQixJQUFJLENBQUM7UUFDN0IsMEJBQXFCLEdBQTRCLElBQUksQ0FBQztJQStObEUsQ0FBQzt3QkFyT29CLGVBQWU7SUFRbEIsMkJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUN2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxpQkFBZSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsOEJBQUksR0FBSjtRQUVJLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFFbkMsSUFBRyx3QkFBWSxJQUFFLDRCQUFnQixDQUFDLEdBQUcsRUFDckM7WUFDSSxFQUFFLENBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztZQUNYLGNBQWM7WUFDZCxJQUFHLE1BQU0sSUFBRSxJQUFJLEVBQ2Y7Z0JBQ0ksb0JBQVUsQ0FBQyxXQUFX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R0FBQyxNQUFNLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFlLEtBQWlCO1FBRTVCLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUcsRUFBRSxJQUFFLElBQUksRUFDWDtnQkFDSSxFQUFFLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMscUNBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsZ0NBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlFO1lBQ0QsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7O0lBL05jLHlCQUFTLEdBQW9CLElBQUksQ0FBQztJQUpoQyxlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBcU9uQztJQUFELHNCQUFDO0NBck9ELEFBcU9DLElBQUE7a0JBck9vQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDVVJfUGxhdGZvcm0sIElzRGVidWcsIFJlbGVhc2VfUGxhdGZvcm0sIFZhbHVlVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVGV4dE1hbmFnZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL1RleHRNYW5hZ2VtZW50XCI7XHJcblxyXG5pbXBvcnQgeyBJbWFnZV9MYW5ndWFnZU1hbmFnZXIgfSBmcm9tIFwiLi4vTXVsdGlsaW5ndWFsL0ltYWdlX0xhbmd1YWdlXCI7XHJcbmltcG9ydCB7IExhbmd1YWdlVHlwZSxMYW5ndWFnZUluZGV4LEFsbExhbmd1YWdlU3RyaW5nLCBTcHJpdGVJbmRleCwgQWxsTGFuU3ByaXRlRnJhbWUsIE9uTGFuZ3VhZ2VDaGFuZ2UgfSBmcm9tIFwiLi9MYW5ndWFnZUNvbnN0YW50c1wiO1xyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbmd1YWdlTWFuYWdlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBjdXJfbGFuZ3VhZ2VfdHlwZTogTGFuZ3VhZ2VUeXBlID1MYW5ndWFnZVR5cGUuemg7XHJcbiAgICBwcml2YXRlIHByZXZfbGFuZ3VhZ2VfdHlwZTogTGFuZ3VhZ2VUeXBlID1MYW5ndWFnZVR5cGUuemg7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IExhbmd1YWdlTWFuYWdlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIHNwX2F0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XHJcbiAgICBwcml2YXRlIEltYWdlckxhbmd1YWdlX3Nwcml0ZTpNYXA8c3RyaW5nLGNjLlNwcml0ZUZyYW1lPj1udWxsO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpMYW5ndWFnZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBMYW5ndWFnZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBpbml0KClcclxuICAgIHtcclxuICAgICAgICBsZXQgY3VyTGFuPXRoaXMucmVhZExhbmd1YWdlKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlQXRsYXMoKTtcclxuICAgICAgICB0aGlzLmxvYWRTcEltYWdlckxhbmd1YWdlX3Nwcml0ZSgpO1xyXG5cclxuICAgICAgICBpZihDVVJfUGxhdGZvcm09PVJlbGVhc2VfUGxhdGZvcm0uQVBLKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2MuTE09dGhpcztcclxuICAgICAgICAgICAgLy/lhYjliKTmlq3mnInmsqHmnInkv53lrZjkuIDnp43or63oqIBcclxuICAgICAgICAgICAgaWYoY3VyTGFuPT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBcGtNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0QW5kcm9pZExhbmd1YWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoSXNEZWJ1ZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyX2xhbmd1YWdlX3R5cGU9TGFuZ3VhZ2VUeXBlLnpoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkU3BJbWFnZXJMYW5ndWFnZV9zcHJpdGUoKXtcclxuICAgICAgICBpZih0aGlzLkltYWdlckxhbmd1YWdlX3Nwcml0ZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5JbWFnZXJMYW5ndWFnZV9zcHJpdGU9bmV3IE1hcDxzdHJpbmcsY2MuU3ByaXRlRnJhbWU+KCk7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZERpcignTXVsdGlsaW5ndWFsJyxjYy5TcHJpdGVGcmFtZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlRnJhbWVbXSk9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGVuPWFzc2V0cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3A9YXNzZXRzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWU9c3AubmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW1hZ2VyTGFuZ3VhZ2Vfc3ByaXRlLnNldChuYW1lLHNwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRTcEJ5U3ByaXRlSWQoaWQ6bnVtYmVyKTpjYy5TcHJpdGVGcmFtZXtcclxuICAgICAgICBsZXQgaWxtPUltYWdlX0xhbmd1YWdlTWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgXHJcbiAgICAgICAgbGV0IG5hbWU9Jyc7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5lbjp7XHJcbiAgICAgICAgICAgICAgICBuYW1lPWlsbS5nZXRFbmdsaXNoKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS56aDp7XHJcbiAgICAgICAgICAgICAgICBuYW1lPWlsbS5nZXRDaGluZXNlKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5pZDp7XHJcbiAgICAgICAgICAgICAgICBuYW1lPWlsbS5nZXRJbmRvbmVzaWFuKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5iZTp7XHJcbiAgICAgICAgICAgICAgICBuYW1lPWlsbS5nZXRSdXNzaWFuKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS50aDp7XHJcbiAgICAgICAgICAgICAgICBuYW1lPWlsbS5nZXRUaGFpKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5rcjp7XHJcbiAgICAgICAgICAgICAgICBuYW1lPWlsbS5nZXRLb3JlYShpZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDp7XHJcbiAgICAgICAgICAgICAgICBuYW1lPWlsbS5nZXRFbmdsaXNoKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5JbWFnZXJMYW5ndWFnZV9zcHJpdGUuZ2V0KG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZExhbmd1YWdlKCk6TGFuZ3VhZ2VUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0cj1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cl9sYW5ndWFnZScpO1xyXG4gICAgICAgIGlmKHN0cj09PScnIHx8IHN0cj09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHI9bnVsbDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3RyPXBhcnNlSW50KHN0cik7XHJcbiAgICAgICAgICAgIHRoaXMucHJldl9sYW5ndWFnZV90eXBlPXRoaXMuY3VyX2xhbmd1YWdlX3R5cGU9c3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2F2ZUxhbmd1YWdlKHR5cGU6TGFuZ3VhZ2VUeXBlKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VyX2xhbmd1YWdlJyx0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIh+aNouW9k+WJjeivreiogFxyXG4gICAgc3dpdGNoTGFuZ3VhZ2UodHlwZTpMYW5ndWFnZVR5cGUpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cl9sYW5ndWFnZV90eXBlIT10eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJMYW5ndWFnZVR5cGUodHlwZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGFuZ3VhZ2UodHlwZSlcclxuICAgIHtcclxuICAgICAgICBjYy5sb2coJ3NldExhbmd1YWdl77yaJyt0eXBlKTtcclxuICAgICAgICBsZXQgY3VyVHlwZT1wYXJzZUludCh0eXBlKTtcclxuICAgICAgICB0aGlzLnN3aXRjaExhbmd1YWdlKGN1clR5cGUpO1xyXG4gICAgICAgIHRoaXMuc2F2ZUxhbmd1YWdlKGN1clR5cGUpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmVtaXQoT25MYW5ndWFnZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDdXJMYW5ndWFnZVR5cGUodHlwZTpMYW5ndWFnZVR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXRQcmV2TGFuZ3VhZ2VUeXBlKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUpO1xyXG4gICAgICAgIHRoaXMuY3VyX2xhbmd1YWdlX3R5cGU9dHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJMYW5ndWFnZVR5cGUoKTpMYW5ndWFnZVR5cGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFByZXZMYW5ndWFnZVR5cGUodHlwZTpMYW5ndWFnZVR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wcmV2X2xhbmd1YWdlX3R5cGU9dHlwZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0UHJldkxhbmd1YWdlVHlwZSgpOkxhbmd1YWdlVHlwZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZXZfbGFuZ3VhZ2VfdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzU2FtZUxhbmd1YWdlVHlwZSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2X2xhbmd1YWdlX3R5cGU9PXRoaXMuY3VyX2xhbmd1YWdlX3R5cGU/dHJ1ZTpmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHJpbmcoaW5kZXg6TGFuZ3VhZ2VJbmRleCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEFsbExhbmd1YWdlU3RyaW5nW2luZGV4XVt0aGlzLmN1cl9sYW5ndWFnZV90eXBlXTtcclxuICAgIH1cclxuICAgIC8q5qC55o2u5LiA5Liq5Lu75oSP6K+t6KiA57G75Z6L55qE5a2X56ym5Liy77yM6I635b6X5b2T5YmN5a+55bqU6K+t6KiA55qE5a2X56ym5LiyKi9cclxuICAgIGdldFN0cmluZ0J5U3RyKHN0cjpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIGxldCBsZW49QWxsTGFuZ3VhZ2VTdHJpbmcubGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPGxlbjsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBsYW5UeXBlPTA7IGxhblR5cGU8TGFuZ3VhZ2VUeXBlLm51bTsgbGFuVHlwZSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihBbGxMYW5ndWFnZVN0cmluZ1tpXVtsYW5UeXBlXT09c3RyKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0cmluZyhpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICAvKuagueaNruaWh+acrGlk6I635b6X5LiA5Liq5a2X56ym5LiyKi9cclxuICAgIHB1YmxpYyBnZXRTdHJCeVRleHRJZCh0ZXh0SWQ6bnVtYmVyKTpzdHJpbmd7XHJcbiAgICAgICAgbGV0IHRtPVRleHRNYW5hZ2VtZW50TWFuYWdlci5nZXRJbnN0YW5jZSgpOyAgICAgICAgXHJcbiAgICAgICAgc3dpdGNoKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5lbjp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uZ2V0RW5nbGlzaCh0ZXh0SWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLnpoOntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRDaGluZXNlKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZVR5cGUuaWQ6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtLmdldEluZG9uZXNpYW4odGV4dElkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5iZTp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uZ2V0UnVzc2lhbih0ZXh0SWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLnRoOntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRUaGFpKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZVR5cGUua3I6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtLmdldEtvcmVhKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uZ2V0RW5nbGlzaCh0ZXh0SWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Zu+54mH57+76K+R55qEXHJcbiAgICBsb2FkU3ByaXRlQXRsYXMoKVxyXG4gICAge1xyXG4gICAgICAgIFdYTWFuYWdlckVYLmdldEluc3RhbmNlKCkucmVzb3VyY2VzQnVuZGxlLmxvYWQoJ3NwL2xhbmd1YWdlX3Nwcml0ZScsY2MuU3ByaXRlQXRsYXMsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUF0bGFzKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3BfYXRsYXM9YXNzZXRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNwcml0ZUZyYW1lKGluZGV4OlNwcml0ZUluZGV4KTpjYy5TcHJpdGVGcmFtZVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuc3BfYXRsYXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgc3A9dGhpcy5zcF9hdGxhcy5nZXRTcHJpdGVGcmFtZShBbGxMYW5TcHJpdGVGcmFtZVtpbmRleF1bdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZV0pO1xyXG4gICAgICAgICAgICBpZihzcD09bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3A9dGhpcy5zcF9hdGxhcy5nZXRTcHJpdGVGcmFtZShBbGxMYW5TcHJpdGVGcmFtZVtpbmRleF1bTGFuZ3VhZ2VUeXBlLmVuXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNwO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19