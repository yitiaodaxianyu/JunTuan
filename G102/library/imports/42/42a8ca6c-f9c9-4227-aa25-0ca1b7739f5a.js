"use strict";
cc._RF.push(module, '42a8cps+clCJ6olDKG3c59a', 'EndlessReward');
// Scripts/Activity/EndlessReward.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndlessRewardManager = exports.JsonEndlessReward = exports.EndlessRewardData = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var EndlessRewardData = /** @class */ (function () {
    function EndlessRewardData() {
        this.curData = null;
        this.nextData = null;
    }
    return EndlessRewardData;
}());
exports.EndlessRewardData = EndlessRewardData;
var JsonEndlessReward = /** @class */ (function () {
    function JsonEndlessReward() {
        /**奖励波次 */
        this.RewardLevel = 0;
        /**奖励ID */
        this.RewardItem = 0;
        /**奖励数量 */
        this.RewardNum = 0;
    }
    return JsonEndlessReward;
}());
exports.JsonEndlessReward = JsonEndlessReward;
var EndlessRewardManager = /** @class */ (function () {
    function EndlessRewardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    EndlessRewardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EndlessRewardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    EndlessRewardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    EndlessRewardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('EndlessReward', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessReward成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonEndlessReward();
                jsonData = json[i];
                _this.data.set(jsonData.RewardLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    EndlessRewardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    EndlessRewardManager.prototype.getJsonEndlessReward = function (id) {
        return this.data.get(id);
    };
    /**根据奖励波次获取奖励ID */
    EndlessRewardManager.prototype.getRewardItem = function (id) {
        return this.data.get(id).RewardItem;
    };
    /**根据奖励波次获取奖励数量 */
    EndlessRewardManager.prototype.getRewardNum = function (id) {
        return this.data.get(id).RewardNum;
    };
    /** 静态方法，获取最大的 奖励波次*/
    EndlessRewardManager.getMaxRewardLevel = function () {
        return 680;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    EndlessRewardManager.prototype.getRewardByScore = function (score) {
        //遍历
        var jsonData = new EndlessRewardData();
        // this.data.forEach((value)=>{
        //     if(score>=value.IntegralRequirement){
        //         jsonData.curData=value;
        //         jsonData.nextData=value;
        //         if(value.RewardLevel>=EndlessRewardManager.getMaxRewardLevel()){
        //             jsonData.nextData=value;
        //         }else{
        //             jsonData.nextData=this.getJsonEndlessReward(value.RewardLevel+1);
        //         }
        //     }
        // });
        return jsonData;
    };
    EndlessRewardManager.prototype.getEndlessReward = function (score) {
        //遍历
        var rewardDatas = new Array();
        // let jsonData=new JsonEndlessReward();
        // this.data.forEach((value)=>{
        //     if(score>=value.IntegralRequirement){
        //         jsonData=value;
        //     }
        // });
        // if(jsonData.Coin>0){
        //     let coinRd=new RewardData();
        //     coinRd.reward_id=PropId.Coin;
        //     coinRd.reward_num=jsonData.Coin;
        //     rewardDatas.push(coinRd);
        // }
        // if(jsonData.Gem>0){
        //     let gemRd=new RewardData();
        //     gemRd.reward_id=PropId.Gem;
        //     gemRd.reward_num=jsonData.Gem;
        //     rewardDatas.push(gemRd);
        // }
        // if(jsonData.HeroExp>0){
        //     let heroExpRd=new RewardData();
        //     heroExpRd.reward_id=PropId.HeroExp;
        //     heroExpRd.reward_num=jsonData.HeroExp;
        //     rewardDatas.push(heroExpRd);
        // }
        // if(jsonData.PlayerExp>0){
        //     let userExpRd=new RewardData();
        //     userExpRd.reward_id=PropId.UserExp;
        //     userExpRd.reward_num=jsonData.PlayerExp;
        //     rewardDatas.push(userExpRd);
        // }
        // //奖池
        // if(jsonData.JackpotID_1>0){
        //     for(let i=0; i<jsonData.JackpotNum_1; i++){
        //         let rd1=JackpotManager.getInstance().getRewardDataById(jsonData.JackpotID_1);
        //         rewardDatas.push(rd1)
        //     }
        // }
        // if(jsonData.JackpotID_2>0){
        //     for(let i=0; i<jsonData.JackpotNum_2; i++){
        //         let rd2=JackpotManager.getInstance().getRewardDataById(jsonData.JackpotID_2);
        //         rewardDatas.push(rd2)
        //     }
        // }
        return rewardDatas;
    };
    EndlessRewardManager._instance = null;
    return EndlessRewardManager;
}());
exports.EndlessRewardManager = EndlessRewardManager;

cc._RF.pop();