
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
        cc.resources.loadDir('Multilingual', cc.SpriteFrame, function (error, assets) {
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
        cc.resources.load('sp/language_sprite', cc.SpriteAtlas, function (error, assets) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcbXVsdGlMYW5ndWFnZVxcTGFuZ3VhZ2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDBDQUFrRjtBQUNsRiw2REFBbUU7QUFDbkUsaUVBQXVFO0FBQ3ZFLHlEQUFxSTtBQUMvSCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFBO1FBRVksc0JBQWlCLEdBQWdCLGdDQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2pELHVCQUFrQixHQUFnQixnQ0FBWSxDQUFDLEVBQUUsQ0FBQztRQUVsRCxhQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QiwwQkFBcUIsR0FBNEIsSUFBSSxDQUFDO0lBK05sRSxDQUFDO3dCQXJPb0IsZUFBZTtJQVFsQiwyQkFBVyxHQUF6QjtRQUVJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQ3ZCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLGlCQUFlLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCw4QkFBSSxHQUFKO1FBRUksSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUVuQyxJQUFHLHdCQUFZLElBQUUsNEJBQWdCLENBQUMsR0FBRyxFQUNyQztZQUNJLEVBQUUsQ0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDO1lBQ1gsY0FBYztZQUNkLElBQUcsTUFBTSxJQUFFLElBQUksRUFDZjtnQkFDSSxvQkFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLGtC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O0lBRUQsd0NBQWMsR0FBZCxVQUFlLEtBQWlCO1FBRTVCLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUcsRUFBRSxJQUFFLElBQUksRUFDWDtnQkFDSSxFQUFFLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMscUNBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsZ0NBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzlFO1lBQ0QsT0FBTyxFQUFFLENBQUM7U0FDYjtJQUNMLENBQUM7O0lBL05jLHlCQUFTLEdBQW9CLElBQUksQ0FBQztJQUpoQyxlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBcU9uQztJQUFELHNCQUFDO0NBck9ELEFBcU9DLElBQUE7a0JBck9vQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFwa01hbmFnZXIgZnJvbSBcIi4uL0Fkcy9BcGtNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IENVUl9QbGF0Zm9ybSwgSXNEZWJ1ZywgUmVsZWFzZV9QbGF0Zm9ybSwgVmFsdWVUeXBlIH0gZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBUZXh0TWFuYWdlbWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vSnNvbkRhdGEvVGV4dE1hbmFnZW1lbnRcIjtcclxuaW1wb3J0IHsgSW1hZ2VfTGFuZ3VhZ2VNYW5hZ2VyIH0gZnJvbSBcIi4uL011bHRpbGluZ3VhbC9JbWFnZV9MYW5ndWFnZVwiO1xyXG5pbXBvcnQgeyBMYW5ndWFnZVR5cGUsTGFuZ3VhZ2VJbmRleCxBbGxMYW5ndWFnZVN0cmluZywgU3ByaXRlSW5kZXgsIEFsbExhblNwcml0ZUZyYW1lLCBPbkxhbmd1YWdlQ2hhbmdlIH0gZnJvbSBcIi4vTGFuZ3VhZ2VDb25zdGFudHNcIjtcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYW5ndWFnZU1hbmFnZXIge1xyXG5cclxuICAgIHByaXZhdGUgY3VyX2xhbmd1YWdlX3R5cGU6IExhbmd1YWdlVHlwZSA9TGFuZ3VhZ2VUeXBlLnpoO1xyXG4gICAgcHJpdmF0ZSBwcmV2X2xhbmd1YWdlX3R5cGU6IExhbmd1YWdlVHlwZSA9TGFuZ3VhZ2VUeXBlLnpoO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBMYW5ndWFnZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBzcF9hdGxhczpjYy5TcHJpdGVBdGxhcz1udWxsO1xyXG4gICAgcHJpdmF0ZSBJbWFnZXJMYW5ndWFnZV9zcHJpdGU6TWFwPHN0cmluZyxjYy5TcHJpdGVGcmFtZT49bnVsbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6TGFuZ3VhZ2VNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgTGFuZ3VhZ2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGN1ckxhbj10aGlzLnJlYWRMYW5ndWFnZSgpO1xyXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZUF0bGFzKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkU3BJbWFnZXJMYW5ndWFnZV9zcHJpdGUoKTtcclxuXHJcbiAgICAgICAgaWYoQ1VSX1BsYXRmb3JtPT1SZWxlYXNlX1BsYXRmb3JtLkFQSylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNjLkxNPXRoaXM7XHJcbiAgICAgICAgICAgIC8v5YWI5Yik5pat5pyJ5rKh5pyJ5L+d5a2Y5LiA56eN6K+t6KiAXHJcbiAgICAgICAgICAgIGlmKGN1ckxhbj09bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQXBrTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEFuZHJvaWRMYW5ndWFnZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKElzRGVidWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9sYW5ndWFnZV90eXBlPUxhbmd1YWdlVHlwZS56aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZFNwSW1hZ2VyTGFuZ3VhZ2Vfc3ByaXRlKCl7XHJcbiAgICAgICAgaWYodGhpcy5JbWFnZXJMYW5ndWFnZV9zcHJpdGUpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW1hZ2VyTGFuZ3VhZ2Vfc3ByaXRlPW5ldyBNYXA8c3RyaW5nLGNjLlNwcml0ZUZyYW1lPigpO1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5sb2FkRGlyKCdNdWx0aWxpbmd1YWwnLGNjLlNwcml0ZUZyYW1lLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5TcHJpdGVGcmFtZVtdKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBsZW49YXNzZXRzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcD1hc3NldHNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZT1zcC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbWFnZXJMYW5ndWFnZV9zcHJpdGUuc2V0KG5hbWUsc3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFNwQnlTcHJpdGVJZChpZDpudW1iZXIpOmNjLlNwcml0ZUZyYW1le1xyXG4gICAgICAgIGxldCBpbG09SW1hZ2VfTGFuZ3VhZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICBcclxuICAgICAgICBsZXQgbmFtZT0nJztcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmVuOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEVuZ2xpc2goaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLnpoOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldENoaW5lc2UoaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmlkOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEluZG9uZXNpYW4oaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmJlOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldFJ1c3NpYW4oaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLnRoOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldFRoYWkoaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmtyOntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEtvcmVhKGlkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIG5hbWU9aWxtLmdldEVuZ2xpc2goaWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLkltYWdlckxhbmd1YWdlX3Nwcml0ZS5nZXQobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkTGFuZ3VhZ2UoKTpMYW5ndWFnZVR5cGVcclxuICAgIHtcclxuICAgICAgICBsZXQgc3RyPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VyX2xhbmd1YWdlJyk7XHJcbiAgICAgICAgaWYoc3RyPT09JycgfHwgc3RyPT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cj1udWxsO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzdHI9cGFyc2VJbnQoc3RyKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2X2xhbmd1YWdlX3R5cGU9dGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT1zdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlTGFuZ3VhZ2UodHlwZTpMYW5ndWFnZVR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJfbGFuZ3VhZ2UnLHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YiH5o2i5b2T5YmN6K+t6KiAXHJcbiAgICBzd2l0Y2hMYW5ndWFnZSh0eXBlOkxhbmd1YWdlVHlwZSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VyX2xhbmd1YWdlX3R5cGUhPXR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1ckxhbmd1YWdlVHlwZSh0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRMYW5ndWFnZSh0eXBlKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvZygnc2V0TGFuZ3VhZ2XvvJonK3R5cGUpO1xyXG4gICAgICAgIGxldCBjdXJUeXBlPXBhcnNlSW50KHR5cGUpO1xyXG4gICAgICAgIHRoaXMuc3dpdGNoTGFuZ3VhZ2UoY3VyVHlwZSk7XHJcbiAgICAgICAgdGhpcy5zYXZlTGFuZ3VhZ2UoY3VyVHlwZSk7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZW1pdChPbkxhbmd1YWdlQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldEN1ckxhbmd1YWdlVHlwZSh0eXBlOkxhbmd1YWdlVHlwZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldFByZXZMYW5ndWFnZVR5cGUodGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSk7XHJcbiAgICAgICAgdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT10eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1ckxhbmd1YWdlVHlwZSgpOkxhbmd1YWdlVHlwZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cl9sYW5ndWFnZV90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UHJldkxhbmd1YWdlVHlwZSh0eXBlOkxhbmd1YWdlVHlwZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnByZXZfbGFuZ3VhZ2VfdHlwZT10eXBlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQcmV2TGFuZ3VhZ2VUeXBlKCk6TGFuZ3VhZ2VUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldl9sYW5ndWFnZV90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTYW1lTGFuZ3VhZ2VUeXBlKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZXZfbGFuZ3VhZ2VfdHlwZT09dGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZT90cnVlOmZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0cmluZyhpbmRleDpMYW5ndWFnZUluZGV4KTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQWxsTGFuZ3VhZ2VTdHJpbmdbaW5kZXhdW3RoaXMuY3VyX2xhbmd1YWdlX3R5cGVdO1xyXG4gICAgfVxyXG4gICAgLyrmoLnmja7kuIDkuKrku7vmhI/or63oqIDnsbvlnovnmoTlrZfnrKbkuLLvvIzojrflvpflvZPliY3lr7nlupTor63oqIDnmoTlrZfnrKbkuLIqL1xyXG4gICAgZ2V0U3RyaW5nQnlTdHIoc3RyOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGxlbj1BbGxMYW5ndWFnZVN0cmluZy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8bGVuOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGxhblR5cGU9MDsgbGFuVHlwZTxMYW5ndWFnZVR5cGUubnVtOyBsYW5UeXBlKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEFsbExhbmd1YWdlU3RyaW5nW2ldW2xhblR5cGVdPT1zdHIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RyaW5nKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIC8q5qC55o2u5paH5pysaWTojrflvpfkuIDkuKrlrZfnrKbkuLIqL1xyXG4gICAgcHVibGljIGdldFN0ckJ5VGV4dElkKHRleHRJZDpudW1iZXIpOnN0cmluZ3tcclxuICAgICAgICBsZXQgdG09VGV4dE1hbmFnZW1lbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7ICAgICAgICBcclxuICAgICAgICBzd2l0Y2godGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmVuOntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRFbmdsaXNoKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZVR5cGUuemg6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtLmdldENoaW5lc2UodGV4dElkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5pZDp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uZ2V0SW5kb25lc2lhbih0ZXh0SWQpO1xyXG4gICAgICAgICAgICB9YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGFuZ3VhZ2VUeXBlLmJlOntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRSdXNzaWFuKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYW5ndWFnZVR5cGUudGg6e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRtLmdldFRoYWkodGV4dElkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIExhbmd1YWdlVHlwZS5rcjp7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG0uZ2V0S29yZWEodGV4dElkKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OntcclxuICAgICAgICAgICAgICAgIHJldHVybiB0bS5nZXRFbmdsaXNoKHRleHRJZCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lm77niYfnv7vor5HnmoRcclxuICAgIGxvYWRTcHJpdGVBdGxhcygpXHJcbiAgICB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ3NwL2xhbmd1YWdlX3Nwcml0ZScsY2MuU3ByaXRlQXRsYXMsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLlNwcml0ZUF0bGFzKT0+e1xyXG4gICAgICAgICAgICBpZihlcnJvcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3BfYXRsYXM9YXNzZXRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNwcml0ZUZyYW1lKGluZGV4OlNwcml0ZUluZGV4KTpjYy5TcHJpdGVGcmFtZVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuc3BfYXRsYXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgc3A9dGhpcy5zcF9hdGxhcy5nZXRTcHJpdGVGcmFtZShBbGxMYW5TcHJpdGVGcmFtZVtpbmRleF1bdGhpcy5jdXJfbGFuZ3VhZ2VfdHlwZV0pO1xyXG4gICAgICAgICAgICBpZihzcD09bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3A9dGhpcy5zcF9hdGxhcy5nZXRTcHJpdGVGcmFtZShBbGxMYW5TcHJpdGVGcmFtZVtpbmRleF1bTGFuZ3VhZ2VUeXBlLmVuXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNwO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19