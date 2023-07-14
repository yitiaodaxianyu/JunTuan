"use strict";
cc._RF.push(module, '2f440wHCgFC/KNDlEH+0ANo', 'BossReward');
// Scripts/Activity/BossReward.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BossRewardManager = exports.JsonBossReward = exports.BossRewardData = void 0;
var LoadManager_1 = require("../Loading/LoadManager");
var UserInfo_1 = require("../UserInfo/UserInfo");
var BossChallenge_1 = require("./BossChallenge");
var BossRewardData = /** @class */ (function () {
    function BossRewardData() {
        this.curData = null;
        this.nextData = null;
    }
    return BossRewardData;
}());
exports.BossRewardData = BossRewardData;
var JsonBossReward = /** @class */ (function () {
    function JsonBossReward() {
        /**奖励级别 */
        this.RewardLevel = 0;
        /**积分要求 */
        this.IntegralRequirement = 0;
        /**展示宝箱图标 */
        this.BoxIcon = 0;
        /**奖励道具 */
        this.RewardItem = 0;
        /**奖励数量 */
        this.RewardNum = 0;
        /**奖励道具2 */
        this.RewardItem_2 = 0;
        /**奖励数量2 */
        this.RewardNum_2 = 0;
    }
    return JsonBossReward;
}());
exports.JsonBossReward = JsonBossReward;
var BossRewardManager = /** @class */ (function () {
    function BossRewardManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    BossRewardManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new BossRewardManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    BossRewardManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    BossRewardManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('BossReward', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonBossReward成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonBossReward();
                jsonData = json[i];
                _this.data.set(jsonData.RewardLevel, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    BossRewardManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    BossRewardManager.prototype.getJsonBossReward = function (id) {
        return this.data.get(id);
    };
    /**根据奖励级别获取积分要求 */
    BossRewardManager.prototype.getIntegralRequirement = function (id) {
        return this.data.get(id).IntegralRequirement;
    };
    /**根据奖励级别获取展示宝箱图标 */
    BossRewardManager.prototype.getBoxIcon = function (id) {
        return this.data.get(id).BoxIcon;
    };
    /**根据奖励级别获取奖励道具 */
    BossRewardManager.prototype.getRewardItem = function (id) {
        return this.data.get(id).RewardItem;
    };
    /**根据奖励级别获取奖励数量 */
    BossRewardManager.prototype.getRewardNum = function (id) {
        return this.data.get(id).RewardNum;
    };
    /**根据奖励级别获取奖励道具2 */
    BossRewardManager.prototype.getRewardItem_2 = function (id) {
        return this.data.get(id).RewardItem_2;
    };
    /**根据奖励级别获取奖励数量2 */
    BossRewardManager.prototype.getRewardNum_2 = function (id) {
        return this.data.get(id).RewardNum_2;
    };
    /** 静态方法，获取最大的 奖励级别*/
    BossRewardManager.getMaxRewardLevel = function () {
        return 47;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    // public static getId(mode:ChallengeMode,rewardLevel:number):number {
    //     return 1000*mode+rewardLevel;
    // }
    /**根据伤害得到奖励级别 */
    BossRewardManager.prototype.getRewardLevel = function (hurt) {
        var rewardlevel = 0;
        for (var index = 0; index < BossRewardManager.getMaxRewardLevel(); index++) {
            var mycurId = UserInfo_1.UserInfo.getInstance().RotationOrder * 1000 + index; //BossRewardManager.getId(mode,i);
            var num = BossChallenge_1.BossChallengeManager.getInstance().getInjuryLimit(mycurId); //this.getIntegralRequirement(index)
            if (num <= hurt) {
                rewardlevel = index;
            }
        }
        // console.log("______4",rewardlevel)
        return rewardlevel;
    };
    BossRewardManager.prototype.getRewardByScore = function (mode, score) {
        //遍历
        var jsonData = new BossRewardData();
        for (var i = BossRewardManager.getMaxRewardLevel() - 1; i >= 0; i--) {
            var curId = i; //BossRewardManager.getId(mode,i);
            var curData = this.getJsonBossReward(curId);
            // let curId=UserInfo.getInstance().RotationOrder*1000+i//BossRewardManager.getId(mode,i);
            // let curData=this.getJsonBossReward(curId);
            // if(score>=curData.){
            //     let nextId=UserInfo.getInstance().RotationOrder*1000+(i+1)//BossRewardManager.getId(mode,i+1);
            //     let nextData=this.getJsonBossReward(nextId);
            //     jsonData.curData=curData;
            //     jsonData.nextData=nextData;
            //     break;
            // }
            var mycurId = UserInfo_1.UserInfo.getInstance().RotationOrder * 1000 + i; //BossRewardManager.getId(mode,i);
            curData.IntegralRequirement = BossChallenge_1.BossChallengeManager.getInstance().getInjuryLimit(mycurId);
            if (score >= curData.IntegralRequirement) {
                var nextId = i + 1; //BossRewardManager.getId(mode,i+1);
                var nextData = this.getJsonBossReward(nextId);
                var mynextId = UserInfo_1.UserInfo.getInstance().RotationOrder * 1000 + (i + 1); //BossRewardManager.getId(mode,i);
                nextData.IntegralRequirement = BossChallenge_1.BossChallengeManager.getInstance().getInjuryLimit(mynextId);
                // console.log("___________",nextData.IntegralRequirement)
                jsonData.curData = curData;
                jsonData.nextData = nextData;
                break;
            }
        }
        // console.log("______3",jsonData)
        return jsonData;
    };
    BossRewardManager.prototype.getBossReward = function (mode, score) {
        //遍历
        var rewardDatas = new Array();
        var jsonData = new JsonBossReward();
        for (var i = BossRewardManager.getMaxRewardLevel() - 1; i >= 0; i--) {
            var curId = i; //BossRewardManager.getId(mode,i);
            var curData = this.getJsonBossReward(curId);
            if (score >= curData.IntegralRequirement) {
                // let nextId=BossRewardManager.getId(mode,i+1);
                jsonData = curData;
                break;
            }
        }
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
        // console.log("______2",rewardDatas)
        return rewardDatas;
    };
    BossRewardManager.prototype.getBossChallenge = function (mode, score) {
        //遍历
        var jsonData = new JsonBossReward();
        for (var i = BossRewardManager.getMaxRewardLevel() - 1; i >= 0; i--) {
            var curId = i; //BossRewardManager.getId(mode,i);
            var curData = this.getJsonBossReward(curId);
            if (score >= curData.IntegralRequirement) {
                //let nextId=BossRewardManager.getId(mode,i+1);
                jsonData = curData;
                break;
            }
        }
        // console.log("______1",jsonData.RewardLevel)
        return jsonData.RewardLevel;
    };
    BossRewardManager._instance = null;
    return BossRewardManager;
}());
exports.BossRewardManager = BossRewardManager;

cc._RF.pop();