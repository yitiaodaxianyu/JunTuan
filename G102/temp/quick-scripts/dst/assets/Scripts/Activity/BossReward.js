
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Activity/BossReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWN0aXZpdHlcXEJvc3NSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esc0RBQXFEO0FBRXJELGlEQUFnRDtBQUNoRCxpREFBc0U7QUFFdEU7SUFBQTtRQUNJLFlBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBQzVCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFBRCxxQkFBQztBQUFELENBSEEsQUFHQyxJQUFBO0FBSFksd0NBQWM7QUFLM0I7SUFBQTtRQUNJLFVBQVU7UUFDSCxnQkFBVyxHQUFVLENBQUMsQ0FBRTtRQUMvQixVQUFVO1FBQ0gsd0JBQW1CLEdBQVUsQ0FBQyxDQUFFO1FBQ3ZDLFlBQVk7UUFDTCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFdBQVc7UUFDSixpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxXQUFXO1FBQ0osZ0JBQVcsR0FBVSxDQUFDLENBQUU7SUFDbkMsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUE7QUFmWSx3Q0FBYztBQWlCM0I7SUFBQTtRQUVJLGlCQUFpQjtRQUNULFNBQUksR0FBNEIsSUFBSSxDQUFDO1FBQ3JDLHNCQUFpQixHQUFTLEtBQUssQ0FBQztJQW9NNUMsQ0FBQztJQWxNaUIsNkJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUNELFNBQVM7SUFDRCxnQ0FBSSxHQUFaO1FBQ0ks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K0NBQStDO2dCQUMvQyxRQUFRLEdBQUMsT0FBTyxDQUFDO2dCQUNqQixNQUFNO2FBQ1Q7U0FDSjtRQUNELDhDQUE4QztRQUM5QyxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDaEMsQ0FBQztJQXRNYywyQkFBUyxHQUFzQixJQUFJLENBQUM7SUF1TXZELHdCQUFDO0NBeE1ELEFBd01DLElBQUE7QUF4TVksOENBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IEphY2twb3RNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0phY2twb3RcIjtcclxuaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gXCIuLi9Vc2VySW5mby9Vc2VySW5mb1wiO1xyXG5pbXBvcnQgeyBCb3NzQ2hhbGxlbmdlTWFuYWdlciwgQ2hhbGxlbmdlTW9kZSB9IGZyb20gXCIuL0Jvc3NDaGFsbGVuZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3NzUmV3YXJkRGF0YXtcclxuICAgIGN1ckRhdGE6SnNvbkJvc3NSZXdhcmQ9bnVsbDtcclxuICAgIG5leHREYXRhOkpzb25Cb3NzUmV3YXJkPW51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBKc29uQm9zc1Jld2FyZCB7XHJcbiAgICAvKirlpZblirHnuqfliKsgKi9cclxuICAgIHB1YmxpYyBSZXdhcmRMZXZlbDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuenr+WIhuimgeaxgiAqL1xyXG4gICAgcHVibGljIEludGVncmFsUmVxdWlyZW1lbnQ6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlsZXnpLrlrp3nrrHlm77moIcgKi9cclxuICAgIHB1YmxpYyBCb3hJY29uOm51bWJlciA9IDAgO1xyXG4gICAgLyoq5aWW5Yqx6YGT5YW3ICovXHJcbiAgICBwdWJsaWMgUmV3YXJkSXRlbTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKseaVsOmHjyAqL1xyXG4gICAgcHVibGljIFJld2FyZE51bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWlluWKsemBk+WFtzIgKi9cclxuICAgIHB1YmxpYyBSZXdhcmRJdGVtXzI6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHmlbDph48yICovXHJcbiAgICBwdWJsaWMgUmV3YXJkTnVtXzI6bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb3NzUmV3YXJkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEJvc3NSZXdhcmRNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkJvc3NSZXdhcmQ+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkJvc3NSZXdhcmRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgQm9zc1Jld2FyZE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignQm9zc1Jld2FyZCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25Cb3NzUmV3YXJk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkJvc3NSZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlJld2FyZExldmVsLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uQm9zc1Jld2FyZChpZDpudW1iZXIpOkpzb25Cb3NzUmV3YXJkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHnuqfliKvojrflj5bnp6/liIbopoHmsYIgKi9cclxuICAgIHB1YmxpYyBnZXRJbnRlZ3JhbFJlcXVpcmVtZW50KGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkludGVncmFsUmVxdWlyZW1lbnQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHnuqfliKvojrflj5blsZXnpLrlrp3nrrHlm77moIcgKi9cclxuICAgIHB1YmxpYyBnZXRCb3hJY29uKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkJveEljb247XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHnuqfliKvojrflj5blpZblirHpgZPlhbcgKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmRJdGVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlJld2FyZEl0ZW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHnuqfliKvojrflj5blpZblirHmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRSZXdhcmROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5aWW5Yqx57qn5Yir6I635Y+W5aWW5Yqx6YGT5YW3MiAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZEl0ZW1fMihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXdhcmRJdGVtXzI7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHnuqfliKvojrflj5blpZblirHmlbDph48yICovXHJcbiAgICBwdWJsaWMgZ2V0UmV3YXJkTnVtXzIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkTnVtXzI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlpZblirHnuqfliKsqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhSZXdhcmRMZXZlbCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDQ3O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG5cclxuICAgIC8vIHB1YmxpYyBzdGF0aWMgZ2V0SWQobW9kZTpDaGFsbGVuZ2VNb2RlLHJld2FyZExldmVsOm51bWJlcik6bnVtYmVyIHtcclxuICAgIC8vICAgICByZXR1cm4gMTAwMCptb2RlK3Jld2FyZExldmVsO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKuagueaNruS8pOWus+W+l+WIsOWlluWKsee6p+WIqyAqL1xyXG4gICAgZ2V0UmV3YXJkTGV2ZWwoaHVydDpudW1iZXIpe1xyXG4gICAgICAgIGxldCByZXdhcmRsZXZlbD0wXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IEJvc3NSZXdhcmRNYW5hZ2VyLmdldE1heFJld2FyZExldmVsKCk7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IG15Y3VySWQ9VXNlckluZm8uZ2V0SW5zdGFuY2UoKS5Sb3RhdGlvbk9yZGVyKjEwMDAraW5kZXgvL0Jvc3NSZXdhcmRNYW5hZ2VyLmdldElkKG1vZGUsaSk7XHJcbiAgICAgICAgICAgIGxldCBudW09Qm9zc0NoYWxsZW5nZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRJbmp1cnlMaW1pdChteWN1cklkKSAvL3RoaXMuZ2V0SW50ZWdyYWxSZXF1aXJlbWVudChpbmRleClcclxuICAgICAgICAgICAgaWYobnVtPD1odXJ0KXtcclxuICAgICAgICAgICAgICAgIHJld2FyZGxldmVsPWluZGV4XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJfX19fX180XCIscmV3YXJkbGV2ZWwpXHJcbiAgICAgICAgcmV0dXJuIHJld2FyZGxldmVsXHJcbiAgICB9XHJcbiAgICBnZXRSZXdhcmRCeVNjb3JlKG1vZGU6Q2hhbGxlbmdlTW9kZSxzY29yZTpudW1iZXIpOkJvc3NSZXdhcmREYXRhe1xyXG4gICAgICAgIC8v6YGN5Y6GXHJcbiAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBCb3NzUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIGZvcihsZXQgaT1Cb3NzUmV3YXJkTWFuYWdlci5nZXRNYXhSZXdhcmRMZXZlbCgpLTE7IGk+PTA7IGktLSl7XHJcbiAgICAgICAgICAgIGxldCBjdXJJZD1pLy9Cb3NzUmV3YXJkTWFuYWdlci5nZXRJZChtb2RlLGkpO1xyXG4gICAgICAgICAgICBsZXQgY3VyRGF0YT10aGlzLmdldEpzb25Cb3NzUmV3YXJkKGN1cklkKTtcclxuICAgICAgICAgICAgLy8gbGV0IGN1cklkPVVzZXJJbmZvLmdldEluc3RhbmNlKCkuUm90YXRpb25PcmRlcioxMDAwK2kvL0Jvc3NSZXdhcmRNYW5hZ2VyLmdldElkKG1vZGUsaSk7XHJcbiAgICAgICAgICAgIC8vIGxldCBjdXJEYXRhPXRoaXMuZ2V0SnNvbkJvc3NSZXdhcmQoY3VySWQpO1xyXG4gICAgICAgICAgICAvLyBpZihzY29yZT49Y3VyRGF0YS4pe1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IG5leHRJZD1Vc2VySW5mby5nZXRJbnN0YW5jZSgpLlJvdGF0aW9uT3JkZXIqMTAwMCsoaSsxKS8vQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SWQobW9kZSxpKzEpO1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IG5leHREYXRhPXRoaXMuZ2V0SnNvbkJvc3NSZXdhcmQobmV4dElkKTtcclxuICAgICAgICAgICAgLy8gICAgIGpzb25EYXRhLmN1ckRhdGE9Y3VyRGF0YTtcclxuICAgICAgICAgICAgLy8gICAgIGpzb25EYXRhLm5leHREYXRhPW5leHREYXRhO1xyXG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgbGV0IG15Y3VySWQ9VXNlckluZm8uZ2V0SW5zdGFuY2UoKS5Sb3RhdGlvbk9yZGVyKjEwMDAraS8vQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SWQobW9kZSxpKTtcclxuICAgICAgICAgICAgY3VyRGF0YS5JbnRlZ3JhbFJlcXVpcmVtZW50PUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW5qdXJ5TGltaXQobXljdXJJZClcclxuICAgICAgICAgICAgaWYoc2NvcmU+PWN1ckRhdGEuSW50ZWdyYWxSZXF1aXJlbWVudCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dElkPWkrMS8vQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SWQobW9kZSxpKzEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHREYXRhPXRoaXMuZ2V0SnNvbkJvc3NSZXdhcmQobmV4dElkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbXluZXh0SWQ9VXNlckluZm8uZ2V0SW5zdGFuY2UoKS5Sb3RhdGlvbk9yZGVyKjEwMDArKGkrMSkvL0Jvc3NSZXdhcmRNYW5hZ2VyLmdldElkKG1vZGUsaSk7XHJcbiAgICAgICAgICAgICAgICBuZXh0RGF0YS5JbnRlZ3JhbFJlcXVpcmVtZW50PUJvc3NDaGFsbGVuZ2VNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0SW5qdXJ5TGltaXQobXluZXh0SWQpXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fX19fX19fXCIsbmV4dERhdGEuSW50ZWdyYWxSZXF1aXJlbWVudClcclxuXHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YS5jdXJEYXRhPWN1ckRhdGE7XHJcbiAgICAgICAgICAgICAgICBqc29uRGF0YS5uZXh0RGF0YT1uZXh0RGF0YTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fM1wiLGpzb25EYXRhKVxyXG4gICAgICAgIHJldHVybiBqc29uRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCb3NzUmV3YXJkKG1vZGU6Q2hhbGxlbmdlTW9kZSxzY29yZTpudW1iZXIpOlJld2FyZERhdGFbXXtcclxuICAgICAgICAvL+mBjeWOhlxyXG4gICAgICAgIGxldCByZXdhcmREYXRhcz1uZXcgQXJyYXk8UmV3YXJkRGF0YT4oKTtcclxuICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25Cb3NzUmV3YXJkKCk7XHJcbiAgICAgICAgZm9yKGxldCBpPUJvc3NSZXdhcmRNYW5hZ2VyLmdldE1heFJld2FyZExldmVsKCktMTsgaT49MDsgaS0tKXtcclxuICAgICAgICAgICAgbGV0IGN1cklkPWkvL0Jvc3NSZXdhcmRNYW5hZ2VyLmdldElkKG1vZGUsaSk7XHJcbiAgICAgICAgICAgIGxldCBjdXJEYXRhPXRoaXMuZ2V0SnNvbkJvc3NSZXdhcmQoY3VySWQpO1xyXG4gICAgICAgICAgICBpZihzY29yZT49Y3VyRGF0YS5JbnRlZ3JhbFJlcXVpcmVtZW50KXtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBuZXh0SWQ9Qm9zc1Jld2FyZE1hbmFnZXIuZ2V0SWQobW9kZSxpKzEpO1xyXG4gICAgICAgICAgICAgICAganNvbkRhdGE9Y3VyRGF0YTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZihqc29uRGF0YS5Db2luPjApe1xyXG4gICAgICAgIC8vICAgICBsZXQgY29pblJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgLy8gICAgIGNvaW5SZC5yZXdhcmRfaWQ9UHJvcElkLkNvaW47XHJcbiAgICAgICAgLy8gICAgIGNvaW5SZC5yZXdhcmRfbnVtPWpzb25EYXRhLkNvaW47XHJcbiAgICAgICAgLy8gICAgIHJld2FyZERhdGFzLnB1c2goY29pblJkKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYoanNvbkRhdGEuR2VtPjApe1xyXG4gICAgICAgIC8vICAgICBsZXQgZ2VtUmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAvLyAgICAgZ2VtUmQucmV3YXJkX2lkPVByb3BJZC5HZW07XHJcbiAgICAgICAgLy8gICAgIGdlbVJkLnJld2FyZF9udW09anNvbkRhdGEuR2VtO1xyXG4gICAgICAgIC8vICAgICByZXdhcmREYXRhcy5wdXNoKGdlbVJkKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYoanNvbkRhdGEuSGVyb0V4cD4wKXtcclxuICAgICAgICAvLyAgICAgbGV0IGhlcm9FeHBSZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICBoZXJvRXhwUmQucmV3YXJkX2lkPVByb3BJZC5IZXJvRXhwO1xyXG4gICAgICAgIC8vICAgICBoZXJvRXhwUmQucmV3YXJkX251bT1qc29uRGF0YS5IZXJvRXhwO1xyXG4gICAgICAgIC8vICAgICByZXdhcmREYXRhcy5wdXNoKGhlcm9FeHBSZCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGpzb25EYXRhLlBsYXllckV4cD4wKXtcclxuICAgICAgICAvLyAgICAgbGV0IHVzZXJFeHBSZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICB1c2VyRXhwUmQucmV3YXJkX2lkPVByb3BJZC5Vc2VyRXhwO1xyXG4gICAgICAgIC8vICAgICB1c2VyRXhwUmQucmV3YXJkX251bT1qc29uRGF0YS5QbGF5ZXJFeHA7XHJcbiAgICAgICAgLy8gICAgIHJld2FyZERhdGFzLnB1c2godXNlckV4cFJkKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIC8v5aWW5rGgXHJcbiAgICAgICAgLy8gaWYoanNvbkRhdGEuSmFja3BvdElEXzE+MCl7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPGpzb25EYXRhLkphY2twb3ROdW1fMTsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCByZDE9SmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhQnlJZChqc29uRGF0YS5KYWNrcG90SURfMSk7XHJcbiAgICAgICAgLy8gICAgICAgICByZXdhcmREYXRhcy5wdXNoKHJkMSlcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZihqc29uRGF0YS5KYWNrcG90SURfMj4wKXtcclxuICAgICAgICAvLyAgICAgZm9yKGxldCBpPTA7IGk8anNvbkRhdGEuSmFja3BvdE51bV8yOyBpKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHJkMj1KYWNrcG90TWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFJld2FyZERhdGFCeUlkKGpzb25EYXRhLkphY2twb3RJRF8yKTtcclxuICAgICAgICAvLyAgICAgICAgIHJld2FyZERhdGFzLnB1c2gocmQyKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiX19fX19fMlwiLHJld2FyZERhdGFzKVxyXG4gICAgICAgIHJldHVybiByZXdhcmREYXRhcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRCb3NzQ2hhbGxlbmdlKG1vZGU6Q2hhbGxlbmdlTW9kZSxzY29yZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICAvL+mBjeWOhlxyXG4gICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkJvc3NSZXdhcmQoKTtcclxuICAgICAgICBmb3IobGV0IGk9Qm9zc1Jld2FyZE1hbmFnZXIuZ2V0TWF4UmV3YXJkTGV2ZWwoKS0xOyBpPj0wOyBpLS0pe1xyXG4gICAgICAgICAgICBsZXQgY3VySWQ9aS8vQm9zc1Jld2FyZE1hbmFnZXIuZ2V0SWQobW9kZSxpKTtcclxuICAgICAgICAgICAgbGV0IGN1ckRhdGE9dGhpcy5nZXRKc29uQm9zc1Jld2FyZChjdXJJZCk7XHJcbiAgICAgICAgICAgIGlmKHNjb3JlPj1jdXJEYXRhLkludGVncmFsUmVxdWlyZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgbmV4dElkPUJvc3NSZXdhcmRNYW5hZ2VyLmdldElkKG1vZGUsaSsxKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWN1ckRhdGE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9fX19fXzFcIixqc29uRGF0YS5SZXdhcmRMZXZlbClcclxuICAgICAgICByZXR1cm4ganNvbkRhdGEuUmV3YXJkTGV2ZWw7XHJcbiAgICB9XHJcbn1cclxuIl19