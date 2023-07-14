"use strict";
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