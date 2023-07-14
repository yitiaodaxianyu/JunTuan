"use strict";
cc._RF.push(module, '431bcmUdRBAUascMtnsEzyA', 'BattlePassData');
// Scripts/BattlePass/BattlePassData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattlePassDataManager = exports.JsonBattlePassData = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var JsonBattlePassData = /** @class */ (function () {
    function JsonBattlePassData() {
        /**战令等级 */
        this.BattlePassLevel = 0;
        /**下一级所需经验值 */
        this.RequiredExp = 0;
        /**免费奖励道具ID */
        this.FreeRewardItem = 0;
        /**免费奖励数量 */
        this.FreeRewardNum = 0;
        /**高级钻石奖励 */
        this.SeniorRewardGem = 0;
        /**高级奖励道具ID */
        this.SeniorRewardItem = 0;
        /**高级奖励数量 */
        this.SeniorRewardNum = 0;
    }
    return JsonBattlePassData;
}());
exports.JsonBattlePassData = JsonBattlePassData;
var BattlePassDataManager = /** @class */ (function () {
    function BattlePassDataManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
        //以上格式统一，以下写每个json数据的特殊需求
        // public static getId(series:number,level:number):number{
        //     return series*100+level;
        // }
        // public getJsonDataByLevel(level:number):JsonBattlePassData{
        //     let d :JsonBattlePassData = this.data.get(BattlePassDataManager.getMaxBattlePassReward());
        //     this.data.forEach((v,k) =>{
        //         if(v.BattlePassLevel == level){
        //             d = v;
        //         }
        //     })
        //     return d;
        // }
        // public getData():Map<number,JsonBattlePassData>{
        //     return this.data;
        // }
    }
    BattlePassDataManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new BattlePassDataManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    BattlePassDataManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    BattlePassDataManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('BattlePassData', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonBattlePassData成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonBattlePassData();
                jsonData = json[i];
                _this.data.set(jsonData.BattlePassLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    BattlePassDataManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    BattlePassDataManager.prototype.getJsonBattlePassData = function (id) {
        return this.data.get(id);
    };
    /**根据战令等级获取下一级所需经验值 */
    BattlePassDataManager.prototype.getRequiredExp = function (id) {
        return this.data.get(id).RequiredExp;
    };
    /**根据战令等级获取免费奖励道具ID */
    BattlePassDataManager.prototype.getFreeRewardItem = function (id) {
        return this.data.get(id).FreeRewardItem;
    };
    /**根据战令等级获取免费奖励数量 */
    BattlePassDataManager.prototype.getFreeRewardNum = function (id) {
        return this.data.get(id).FreeRewardNum;
    };
    /**根据战令等级获取高级钻石奖励 */
    BattlePassDataManager.prototype.getSeniorRewardGem = function (id) {
        return this.data.get(id).SeniorRewardGem;
    };
    /**根据战令等级获取高级奖励道具ID */
    BattlePassDataManager.prototype.getSeniorRewardItem = function (id) {
        return this.data.get(id).SeniorRewardItem;
    };
    /**根据战令等级获取高级奖励数量 */
    BattlePassDataManager.prototype.getSeniorRewardNum = function (id) {
        return this.data.get(id).SeniorRewardNum;
    };
    /** 静态方法，获取最大的 战令等级*/
    BattlePassDataManager.getMaxBattlePassLevel = function () {
        return 15;
    };
    BattlePassDataManager._instance = null;
    return BattlePassDataManager;
}());
exports.BattlePassDataManager = BattlePassDataManager;

cc._RF.pop();