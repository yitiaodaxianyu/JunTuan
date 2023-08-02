
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbXVsdGlMYW5ndWFnZVxcTGFuZ3VhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBQ3ZELGdEQUEyQztBQUMzQywwQ0FBa0Y7QUFDbEYsNkRBQW1FO0FBQ25FLGlFQUF1RTtBQUN2RSx5REFBcUk7QUFDL0gsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBQTtRQUVZLHNCQUFpQixHQUFnQixnQ0FBWSxDQUFDLEVBQUUsQ0FBQztRQUNqRCx1QkFBa0IsR0FBZ0IsZ0NBQVksQ0FBQyxFQUFFLENBQUM7UUFFbEQsYUFBUSxHQUFnQixJQUFJLENBQUM7UUFDN0IsMEJBQXFCLEdBQTRCLElBQUksQ0FBQztJQStObEUsQ0FBQzt3QkFyT29CLGVBQWU7SUFRbEIsMkJBQVcsR0FBekI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUN2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxpQkFBZSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBQ0QsOEJBQUksR0FBSjtRQUVJLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFFbkMsSUFBRyx3QkFBWSxJQUFFLDRCQUFnQixDQUFDLEdBQUcsRUFDckM7WUFDSSxFQUFFLENBQUMsRUFBRSxHQUFDLElBQUksQ0FBQztZQUNYLGNBQWM7WUFDZCxJQUFHLE1BQU0sSUFBRSxJQUFJLEVBQ2Y7Z0JBQ0ksb0JBQVUsQ0FBQyxXQUFX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R0FBQyxNQUFNLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0NBQWMsR0FBZCxVQUFlLEtBQWlCO1FBRTVCLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUcsRUFBRSxJQUFFLElBQUksRUFDWDtnQkFDSSxFQUFFLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMscUNBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsZ0NBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlFO1lBQ0QsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7O0lBL05jLHlCQUFTLEdBQW9CLElBQUksQ0FBQztJQUpoQyxlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBcU9uQztJQUFELHNCQUFDO0NBck9ELEFBcU9DLElBQUE7a0JBck9vQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdYTWFuYWdlckVYIGZyb20gXCIuLi8uLi9zdGFydHNjZW5lL1dYTWFuYWdlckVYXCI7XHJcbmltcG9ydCBBcGtNYW5hZ2VyIGZyb20gXCIuLi9BZHMvQXBrTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBDVVJfUGxhdGZvcm0sIElzRGVidWcsIFJlbGVhc2VfUGxhdGZvcm0sIFZhbHVlVHlwZSB9IGZyb20gXCIuLi9Db25zdGFudHNcIjtcclxuaW1wb3J0IHsgVGV4dE1hbmFnZW1lbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL1RleHRNYW5hZ2VtZW50XCI7XHJcbmltcG9ydCB7IEltYWdlX0xhbmd1YWdlTWFuYWdlciB9IGZyb20gXCIuLi9NdWx0aWxpbmd1YWwvSW1hZ2VfTGFuZ3VhZ2VcIjtcclxuaW1wb3J0IHsgTGFuZ3VhZ2VUeXBlLExhbmd1YWdlSW5kZXgsQWxsTGFuZ3VhZ2VTdHJpbmcsIFNwcml0ZUluZGV4LCBBbGxMYW5TcHJpdGVGcmFtZSwgT25MYW5ndWFnZUNoYW5nZSB9IGZyb20gXCIuL0xhbmd1YWdlQ29uc3RhbnRzXCI7XHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFuZ3VhZ2VNYW5hZ2VyIHtcclxuXHJcbiAgICBwcml2YXRlIGN1cl9sYW5ndWFnZV90eXBlOiBMYW5ndWFnZVR5cGUgPUxhbmd1YWdlVHlwZS56aDtcclxuICAgIHByaXZhdGUgcHJldl9sYW5ndWFnZV90eXBlOiBMYW5ndWFnZVR5cGUgPUxhbmd1YWdlVHlwZS56aDtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogTGFuZ3VhZ2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIHByaXZhdGUgc3BfYXRsYXM6Y2MuU3ByaXRlQXRsYXM9bnVsbDtcclxuICAgIHByaXZhdGUgSW1hZ2VyTGFuZ3VhZ2Vfc3ByaXRlOk1hcDxzdHJpbmcsY2MuU3ByaXRlRnJhbWU+PW51bGw7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkxhbmd1YWdlTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IExhbmd1YWdlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjdXJMYW49dGhpcy5yZWFkTGFuZ3VhZ2UoKTtcclxuICAgICAgICB0aGlzLmxvYWRTcHJpdGVBdGxhcygpO1xyXG4gICAgICAgIHRoaXMubG9hZFNwSW1hZ2VyTGFuZ3VhZ2Vfc3ByaXRlKCk7XHJcblxyXG4gICAgICAgIGlmKENVUl9QbGF0Zm9ybT09UmVsZWFzZV9QbGF0Zm9ybS5BUEspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5MTT10aGlzO1xyXG4gICAgICAgICAgICAvL+WFiOWIpOaWreacieayoeacieS/neWtmOS4gOenjeivreiogFxyXG4gICAgICAgICAgICBpZihjdXJMYW49PW51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFwa01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRBbmRyb2lkTGFuZ3VhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJc0RlYnVnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT1MYW5ndWFnZVR5cGUuemg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTcEltYWdlckxhbmd1YWdlX3Nwcml0ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuSW1hZ2VyTGFuZ3VhZ2Vfc3ByaXRlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkltYWdlckxhbmd1YWdlX3Nwcml0ZT1uZXcgTWFwPHN0cmluZyxjYy5TcHJpdGVGcmFtZT4oKTtcclxuICAgICAgICBXWE1hbmFnZXJFWC5nZXRJbnN0YW5jZSgpLnJlc291cmNlc0J1bmRsZS5sb2FkRGlyKCdNdWx0aWxpbmd1YWwnLGNjLlNwcml0ZUZyYW1lLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVGcmFtZVtdKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBsZW49YXNzZXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcD1hc3NldHNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZT1zcC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbWFnZXJMYW5ndWFnZV9zcHJpdGUuc2V0KG5hbWUsc3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFNwQnlTcHJpdGVJZChpZDpudW1iZXIpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpbG09SW1hZ2VfTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICBcclxuICAgICAgICBsZXQgbmFtZT0nJztcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmVuOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEVuZ2xpc2goaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLnpoOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldENoaW5lc2UoaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmlkOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEluZG9uZXNpYW4oaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmJlOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldFJ1c3NpYW4oaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLnRoOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldFRoYWkoaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmtyOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEtvcmVhKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEVuZ2xpc2goaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLkltYWdlckxhbmd1YWdlX3Nwcml0ZS5nZXQobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkTGFuZ3VhZ2UoKTpMYW5ndWFnZVR5cGVcclxuICAgIHtcclxuICAgICAgICBsZXQgc3RyPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VyX2xhbmd1YWdlJyk7XHJcbiAgICAgICAgaWYoc3RyPT09JycgfHwgc3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cj1udWxsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdHI9cGFyc2VJbnQoc3RyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2X2xhbmd1YWdlX3R5cGU9dGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT1zdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlTGFuZ3VhZ2UodHlwZTpMYW5ndWFnZVR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJfbGFuZ3VhZ2UnLHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YiH5o2i5b2T5YmN6K+t6KiAXHJcbiAgICBzd2l0Y2hMYW5ndWFnZSh0eXBlOkxhbmd1YWdlVHlwZSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUhPXR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1ckxhbmd1YWdlVHlwZSh0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW5ndWFnZSh0eXBlKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvZygnc2V0TGFuZ3VhZ2XvvJonK3R5cGUpO1xyXG4gICAgICAgIGxldCBjdXJUeXBlPXBhcnNlSW50KHR5cGUpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoTGFuZ3VhZ2UoY3VyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5zYXZlTGFuZ3VhZ2UoY3VyVHlwZSk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChPbkxhbmd1YWdlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEN1ckxhbmd1YWdlVHlwZSh0eXBlOkxhbmd1YWdlVHlwZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldFByZXZMYW5ndWFnZVR5cGUodGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSk7XHJcbiAgICAgICAgdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT10eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1ckxhbmd1YWdlVHlwZSgpOkxhbmd1YWdlVHlwZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9sYW5ndWFnZV90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UHJldkxhbmd1YWdlVHlwZSh0eXBlOkxhbmd1YWdlVHlwZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnByZXZfbGFuZ3VhZ2VfdHlwZT10eXBlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQcmV2TGFuZ3VhZ2VUeXBlKCk6TGFuZ3VhZ2VUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldl9sYW5ndWFnZV90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTYW1lTGFuZ3VhZ2VUeXBlKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZXZfbGFuZ3VhZ2VfdHlwZT09dGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT90cnVlOmZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0cmluZyhpbmRleDpMYW5ndWFnZUluZGV4KTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQWxsTGFuZ3VhZ2VTdHJpbmdbaW5kZXhdW3RoaXMuY3VyX2xhbmd1YWdlX3R5cGVdO1xyXG4gICAgfVxyXG4gICAgLyrmoLnmja7kuIDkuKrku7vmhI/or63oqIDnsbvlnovnmoTlrZfnrKbkuLLvvIzojrflvpflvZPliY3lr7nlupTor63oqIDnmoTlrZfnrKbkuLIqL1xyXG4gICAgZ2V0U3RyaW5nQnlTdHIoc3RyOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxlbj1BbGxMYW5ndWFnZVN0cmluZy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxhblR5cGU9MDsgbGFuVHlwZTxMYW5ndWFnZVR5cGUubnVtOyBsYW5UeXBlKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEFsbExhbmd1YWdlU3RyaW5nW2ldW2xhblR5cGVdPT1zdHIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIC8q5qC55o2u5paH5pysaWTojrflvpfkuIDkuKrlrZfnrKbkuLIqL1xyXG4gICAgcHVibGljIGdldFN0ckJ5VGV4dElkKHRleHRJZDpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdG09VGV4dE1hbmFnZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmVuOntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRFbmdsaXNoKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZVR5cGUuemg6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtLmdldENoaW5lc2UodGV4dElkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5pZDp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uZ2V0SW5kb25lc2lhbih0ZXh0SWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmJlOntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRSdXNzaWFuKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZVR5cGUudGg6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtLmdldFRoYWkodGV4dElkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5rcjp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uZ2V0S29yZWEodGV4dElkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRFbmdsaXNoKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lm77niYfnv7vor5HnmoRcclxuICAgIGxvYWRTcHJpdGVBdGxhcygpXHJcbiAgICB7XHJcbiAgICAgICAgV1hNYW5hZ2VyRVguZ2V0SW5zdGFuY2UoKS5yZXNvdXJjZXNCdW5kbGUubG9hZCgnc3AvbGFuZ3VhZ2Vfc3ByaXRlJyxjYy5TcHJpdGVBdGxhcywoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuU3ByaXRlQXRsYXMpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zcF9hdGxhcz1hc3NldHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3ByaXRlRnJhbWUoaW5kZXg6U3ByaXRlSW5kZXgpOmNjLlNwcml0ZUZyYW1lXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5zcF9hdGxhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBzcD10aGlzLnNwX2F0bGFzLmdldFNwcml0ZUZyYW1lKEFsbExhblNwcml0ZUZyYW1lW2luZGV4XVt0aGlzLmN1cl9sYW5ndWFnZV90eXBlXSk7XHJcbiAgICAgICAgICAgIGlmKHNwPT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcD10aGlzLnNwX2F0bGFzLmdldFNwcml0ZUZyYW1lKEFsbExhblNwcml0ZUZyYW1lW2luZGV4XVtMYW5ndWFnZVR5cGUuZW5dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc3A7XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=