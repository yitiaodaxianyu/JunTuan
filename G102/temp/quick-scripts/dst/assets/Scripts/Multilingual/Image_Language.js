
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Multilingual/Image_Language.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b05e4u49LtGlJCSQURp0EwS', 'Image_Language');
// Scripts/Multilingual/Image_Language.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image_LanguageManager = exports.JsonImage_Language = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonImage_Language = /** @class */ (function () {
    function JsonImage_Language() {
        /**图片ID */
        this.Spirit_ID = 0;
        /**图集ID */
        this.Atlas = '';
        /**英语 */
        this.English = '';
        /**汉语 */
        this.Chinese = '';
        /**印尼语 */
        this.Indonesian = '';
        /**俄语 */
        this.Russian = '';
        /**泰语 */
        this.Thai = '';
        /**韩国 */
        this.Korea = '';
    }
    return JsonImage_Language;
}());
exports.JsonImage_Language = JsonImage_Language;
var Image_LanguageManager = /** @class */ (function () {
    function Image_LanguageManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    Image_LanguageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new Image_LanguageManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    Image_LanguageManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    Image_LanguageManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('Image_Language', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonImage_Language成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonImage_Language();
                jsonData = json[i];
                _this.data.set(jsonData.Spirit_ID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    Image_LanguageManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    Image_LanguageManager.prototype.getJsonImage_Language = function (id) {
        return this.data.get(id);
    };
    /**根据图片ID获取图集ID */
    Image_LanguageManager.prototype.getAtlas = function (id) {
        return this.data.get(id).Atlas;
    };
    /**根据图片ID获取英语 */
    Image_LanguageManager.prototype.getEnglish = function (id) {
        try {
            return this.data.get(id).English;
        }
        catch (error) {
            console.error("这个多语言图片id有问题,id:" + id + " err:" + error);
        }
    };
    /**根据图片ID获取汉语 */
    Image_LanguageManager.prototype.getChinese = function (id) {
        try {
            return this.data.get(id).Chinese;
        }
        catch (error) {
            console.error("这个多语言图片id有问题,id:" + id + " err:" + error);
        }
    };
    /**根据图片ID获取印尼语 */
    Image_LanguageManager.prototype.getIndonesian = function (id) {
        return this.data.get(id).Indonesian;
    };
    /**根据图片ID获取俄语 */
    Image_LanguageManager.prototype.getRussian = function (id) {
        return this.data.get(id).Russian;
    };
    /**根据图片ID获取泰语 */
    Image_LanguageManager.prototype.getThai = function (id) {
        return this.data.get(id).Thai;
    };
    /**根据图片ID获取韩国 */
    Image_LanguageManager.prototype.getKorea = function (id) {
        return this.data.get(id).Korea;
    };
    /** 静态方法，获取最大的 图片ID*/
    Image_LanguageManager.getMaxSpirit_ID = function () {
        return 4;
    };
    Image_LanguageManager._instance = null;
    return Image_LanguageManager;
}());
exports.Image_LanguageManager = Image_LanguageManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcTXVsdGlsaW5ndWFsXFxJbWFnZV9MYW5ndWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBcUQ7QUFFckQ7SUFBQTtRQUNJLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFVBQVU7UUFDSCxVQUFLLEdBQVUsRUFBRSxDQUFFO1FBQzFCLFFBQVE7UUFDRCxZQUFPLEdBQVUsRUFBRSxDQUFFO1FBQzVCLFFBQVE7UUFDRCxZQUFPLEdBQVUsRUFBRSxDQUFFO1FBQzVCLFNBQVM7UUFDRixlQUFVLEdBQVUsRUFBRSxDQUFFO1FBQy9CLFFBQVE7UUFDRCxZQUFPLEdBQVUsRUFBRSxDQUFFO1FBQzVCLFFBQVE7UUFDRCxTQUFJLEdBQVUsRUFBRSxDQUFFO1FBQ3pCLFFBQVE7UUFDRCxVQUFLLEdBQVUsRUFBRSxDQUFFO0lBQzlCLENBQUM7SUFBRCx5QkFBQztBQUFELENBakJBLEFBaUJDLElBQUE7QUFqQlksZ0RBQWtCO0FBbUIvQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFnQyxJQUFJLENBQUM7UUFDekMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBb0Z4Qyx5QkFBeUI7SUFHN0IsQ0FBQztJQXJGaUIsaUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxvQ0FBSSxHQUFaO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJ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QUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQXFCO0lBQ1AscUNBQWUsR0FBN0I7UUFDSSxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFyRmMsK0JBQVMsR0FBMEIsSUFBSSxDQUFDO0lBMEYzRCw0QkFBQztDQTNGRCxBQTJGQyxJQUFBO0FBM0ZZLHNEQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uSW1hZ2VfTGFuZ3VhZ2Uge1xyXG4gICAgLyoq5Zu+54mHSUQgKi9cclxuICAgIHB1YmxpYyBTcGlyaXRfSUQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlm77pm4ZJRCAqL1xyXG4gICAgcHVibGljIEF0bGFzOnN0cmluZyA9ICcnIDtcclxuICAgIC8qKuiLseivrSAqL1xyXG4gICAgcHVibGljIEVuZ2xpc2g6c3RyaW5nID0gJycgO1xyXG4gICAgLyoq5rGJ6K+tICovXHJcbiAgICBwdWJsaWMgQ2hpbmVzZTpzdHJpbmcgPSAnJyA7XHJcbiAgICAvKirljbDlsLzor60gKi9cclxuICAgIHB1YmxpYyBJbmRvbmVzaWFuOnN0cmluZyA9ICcnIDtcclxuICAgIC8qKuS/hOivrSAqL1xyXG4gICAgcHVibGljIFJ1c3NpYW46c3RyaW5nID0gJycgO1xyXG4gICAgLyoq5rOw6K+tICovXHJcbiAgICBwdWJsaWMgVGhhaTpzdHJpbmcgPSAnJyA7XHJcbiAgICAvKirpn6nlm70gKi9cclxuICAgIHB1YmxpYyBLb3JlYTpzdHJpbmcgPSAnJyA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbWFnZV9MYW5ndWFnZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJbWFnZV9MYW5ndWFnZU1hbmFnZXIgPSBudWxsO1xyXG4gICAgLy/miopqc29u5pWw5o2u6L2s5YyW5oiQbWFw5pWw5o2uXHJcbiAgICBwcml2YXRlIGRhdGE6TWFwPG51bWJlcixKc29uSW1hZ2VfTGFuZ3VhZ2U+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkltYWdlX0xhbmd1YWdlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEltYWdlX0xhbmd1YWdlTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ri45oiP5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRKc29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liqDovb1qc29uXHJcbiAgICBwcml2YXRlIGxvYWRKc29uKCkge1xyXG4gICAgICAgIExvYWRNYW5hZ2VyLmxvYWRKc29uKCdJbWFnZV9MYW5ndWFnZScsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25JbWFnZV9MYW5ndWFnZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25JbWFnZV9MYW5ndWFnZSgpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9anNvbltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoanNvbkRhdGEuU3Bpcml0X0lELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uSW1hZ2VfTGFuZ3VhZ2UoaWQ6bnVtYmVyKTpKc29uSW1hZ2VfTGFuZ3VhZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWbvueJh0lE6I635Y+W5Zu+6ZuGSUQgKi9cclxuICAgIHB1YmxpYyBnZXRBdGxhcyhpZDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5BdGxhcztcclxuICAgIH1cclxuICAgIC8qKuagueaNruWbvueJh0lE6I635Y+W6Iux6K+tICovXHJcbiAgICBwdWJsaWMgZ2V0RW5nbGlzaChpZDpudW1iZXIpOiBzdHJpbmcgeyAgICAgICAgXHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRW5nbGlzaDtcclxuICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwi6L+Z5Liq5aSa6K+t6KiA5Zu+54mHaWTmnInpl67popgsaWQ6XCIgKyBpZCArIFwiIGVycjpcIiArIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lm77niYdJROiOt+WPluaxieivrSAqL1xyXG4gICAgcHVibGljIGdldENoaW5lc2UoaWQ6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DaGluZXNlO1xyXG4gICAgICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLov5nkuKrlpJror63oqIDlm77niYdpZOaciemXrumimCxpZDpcIiArIGlkICsgXCIgZXJyOlwiICsgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKuagueaNruWbvueJh0lE6I635Y+W5Y2w5bC86K+tICovXHJcbiAgICBwdWJsaWMgZ2V0SW5kb25lc2lhbihpZDpudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JbmRvbmVzaWFuO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5Zu+54mHSUTojrflj5bkv4Tor60gKi9cclxuICAgIHB1YmxpYyBnZXRSdXNzaWFuKGlkOm51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJ1c3NpYW47XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lm77niYdJROiOt+WPluazsOivrSAqL1xyXG4gICAgcHVibGljIGdldFRoYWkoaWQ6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuVGhhaTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWbvueJh0lE6I635Y+W6Z+p5Zu9ICovXHJcbiAgICBwdWJsaWMgZ2V0S29yZWEoaWQ6bnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuS29yZWE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlm77niYdJRCovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE1heFNwaXJpdF9JRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG5cclxufVxyXG4iXX0=