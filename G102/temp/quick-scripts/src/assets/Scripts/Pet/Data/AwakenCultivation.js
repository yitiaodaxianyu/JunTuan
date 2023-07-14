"use strict";
cc._RF.push(module, 'e27d3eDGdNJ+5h/OV8BmFgM', 'AwakenCultivation');
// Scripts/Pet/Data/AwakenCultivation.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwakenCultivationManager = exports.JsonAwakenCultivation = void 0;
var LoadManager_1 = require("../../Loading/LoadManager");
var JsonAwakenCultivation = /** @class */ (function () {
    function JsonAwakenCultivation() {
        /**觉醒ID */
        this.AwenkenId = 0;
        /**灵宠稀有度 */
        this.SpiritRarity = 0;
        /**觉醒阶段 */
        this.AwakenStage = 0;
        /**本阶段星脉数量 */
        this.CurrentStarVeinsNum = 0;
        /**本阶段星脉 */
        this.CurrentStarVeins = [];
        /**连携技能等级 */
        this.FetterSkillLevel = 0;
    }
    return JsonAwakenCultivation;
}());
exports.JsonAwakenCultivation = JsonAwakenCultivation;
var AwakenCultivationManager = /** @class */ (function () {
    function AwakenCultivationManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    AwakenCultivationManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AwakenCultivationManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    AwakenCultivationManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    AwakenCultivationManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('AwakenCultivation', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonAwakenCultivation成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonAwakenCultivation();
                jsonData = json[i];
                _this.data.set(jsonData.AwenkenId, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    AwakenCultivationManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    AwakenCultivationManager.prototype.getJsonAwakenCultivation = function (id) {
        return this.data.get(id);
    };
    /**根据觉醒ID获取灵宠稀有度 */
    AwakenCultivationManager.prototype.getSpiritRarity = function (id) {
        return this.data.get(id).SpiritRarity;
    };
    /**根据觉醒ID获取觉醒阶段 */
    AwakenCultivationManager.prototype.getAwakenStage = function (id) {
        return this.data.get(id).AwakenStage;
    };
    /**根据觉醒ID获取本阶段星脉数量 */
    AwakenCultivationManager.prototype.getCurrentStarVeinsNum = function (id) {
        return this.data.get(id).CurrentStarVeinsNum;
    };
    /**根据觉醒ID获取本阶段星脉 */
    AwakenCultivationManager.prototype.getCurrentStarVeins = function (id) {
        return this.data.get(id).CurrentStarVeins;
    };
    /**根据觉醒ID获取连携技能等级 */
    AwakenCultivationManager.prototype.getFetterSkillLevel = function (id) {
        return this.data.get(id).FetterSkillLevel;
    };
    /** 静态方法，获取最大的 觉醒ID*/
    AwakenCultivationManager.getMaxAwenkenId = function () {
        return 404;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得觉醒id
     * @param spiritRarity 灵宠稀有度
     * @param awakenStage 觉醒阶段
     * @returns id
     */
    AwakenCultivationManager.getId = function (spiritRarity, awakenStage) {
        return spiritRarity * 100 + awakenStage;
    };
    AwakenCultivationManager._instance = null;
    return AwakenCultivationManager;
}());
exports.AwakenCultivationManager = AwakenCultivationManager;

cc._RF.pop();