"use strict";
cc._RF.push(module, '9a8dbX10URMS46yECvHTzNX', 'SpiritMessage');
// Scripts/Pet/Data/SpiritMessage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritMessageManager = exports.JsonSpiritMessage = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonSpiritMessage = /** @class */ (function () {
    function JsonSpiritMessage() {
        /**灵宠种类 */
        this.SpiritType = 0;
        /**灵宠名字 */
        this.SpiritName = 0;
        /**初始品质 */
        this.InitialQuality = 0;
        /**阶段上限 */
        this.StageLimit = 0;
        /**宠物技能介绍 */
        this.ActiveSkillsIntro = 0;
        /**宠物技能名字 */
        this.SpiritSkillName = 0;
    }
    return JsonSpiritMessage;
}());
exports.JsonSpiritMessage = JsonSpiritMessage;
var SpiritMessageManager = /** @class */ (function () {
    function SpiritMessageManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
    }
    SpiritMessageManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SpiritMessageManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    SpiritMessageManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    SpiritMessageManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('SpiritMessage', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritMessage成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonSpiritMessage();
                jsonData = json[i];
                _this.data.set(jsonData.SpiritType, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    SpiritMessageManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    SpiritMessageManager.prototype.getJsonSpiritMessage = function (id) {
        return this.data.get(id);
    };
    /**根据灵宠种类获取灵宠名字 */
    SpiritMessageManager.prototype.getSpiritName = function (id) {
        return this.data.get(id).SpiritName;
    };
    /**根据灵宠种类获取初始品质 */
    SpiritMessageManager.prototype.getInitialQuality = function (id) {
        return this.data.get(id).InitialQuality;
    };
    /**根据灵宠种类获取阶段上限 */
    SpiritMessageManager.prototype.getStageLimit = function (id) {
        return this.data.get(id).StageLimit;
    };
    /**根据灵宠种类获取宠物技能介绍 */
    SpiritMessageManager.prototype.getActiveSkillsIntro = function (id) {
        return this.data.get(id).ActiveSkillsIntro;
    };
    /**根据灵宠种类获取宠物技能名字 */
    SpiritMessageManager.prototype.getSpiritSkillName = function (id) {
        return this.data.get(id).SpiritSkillName;
    };
    /** 静态方法，获取最大的 灵宠种类*/
    SpiritMessageManager.getMaxSpiritType = function () {
        return 7;
    };
    SpiritMessageManager._instance = null;
    return SpiritMessageManager;
}());
exports.SpiritMessageManager = SpiritMessageManager;

cc._RF.pop();