"use strict";
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