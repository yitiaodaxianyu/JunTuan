
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Activity/EndlessReward.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQWN0aXZpdHlcXEVuZGxlc3NSZXdhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxZQUFPLEdBQW1CLElBQUksQ0FBQztRQUMvQixhQUFRLEdBQW1CLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUhBLEFBR0MsSUFBQTtBQUhZLDhDQUFpQjtBQUs5QjtJQUFBO1FBQ0ksVUFBVTtRQUNILGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLFVBQVU7UUFDSCxlQUFVLEdBQVUsQ0FBQyxDQUFFO1FBQzlCLFVBQVU7UUFDSCxjQUFTLEdBQVUsQ0FBQyxDQUFFO0lBQ2pDLENBQUM7SUFBRCx3QkFBQztBQUFELENBUEEsQUFPQyxJQUFBO0FBUFksOENBQWlCO0FBUzlCO0lBQUE7UUFFSSxpQkFBaUI7UUFDVCxTQUFJLEdBQStCLElBQUksQ0FBQztRQUN4QyxzQkFBaUIsR0FBUyxLQUFLLENBQUM7SUE4SDVDLENBQUM7SUE1SGlCLGdDQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFDRCxTQUFTO0lBQ0QsbUNBQUksR0FBWjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUNELFFBQVE7SUFDQSx1Q0FBUSxHQUFoQjtRQUFBLGlCQWdCQztRQWZHLHlCQUFXLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBQyx5QkFBVyxDQUFDLFNBQVMsRUFB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QVE7UUFDUixJQUFJO1FBQ0osOEJBQThCO1FBQzlCLGtEQUFrRDtRQUNsRCx3RkFBd0Y7UUFDeEYsZ0NBQWdDO1FBQ2hDLFFBQVE7UUFDUixJQUFJO1FBRUosT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQWhJYyw4QkFBUyxHQUF5QixJQUFJLENBQUM7SUFpSTFELDJCQUFDO0NBbElELEFBa0lDLElBQUE7QUFsSVksb0RBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IEphY2twb3RNYW5hZ2VyIH0gZnJvbSBcIi4uL0pzb25EYXRhL0phY2twb3RcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBMb2FkTWFuYWdlciB9IGZyb20gXCIuLi9Mb2FkaW5nL0xvYWRNYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW5kbGVzc1Jld2FyZERhdGF7XHJcbiAgICBjdXJEYXRhOkpzb25FbmRsZXNzUmV3YXJkPW51bGw7XHJcbiAgICBuZXh0RGF0YTpKc29uRW5kbGVzc1Jld2FyZD1udWxsO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkVuZGxlc3NSZXdhcmQge1xyXG4gICAgLyoq5aWW5Yqx5rOi5qyhICovXHJcbiAgICBwdWJsaWMgUmV3YXJkTGV2ZWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirFJRCAqL1xyXG4gICAgcHVibGljIFJld2FyZEl0ZW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirlpZblirHmlbDph48gKi9cclxuICAgIHB1YmxpYyBSZXdhcmROdW06bnVtYmVyID0gMCA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbmRsZXNzUmV3YXJkTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEVuZGxlc3NSZXdhcmRNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkVuZGxlc3NSZXdhcmQ+PW51bGw7XHJcbiAgICBwcml2YXRlIGlzX2xvYWRfY29tcGxldGVkOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkVuZGxlc3NSZXdhcmRNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgRW5kbGVzc1Jld2FyZE1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignRW5kbGVzc1Jld2FyZCcsTG9hZE1hbmFnZXIubG9hZF9tb2RlLChlcnJvcjogRXJyb3IsIGFzc2V0czpjYy5Kc29uQXNzZXQpPT4ge1xyXG4gICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9vUpzb25FbmRsZXNzUmV3YXJk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT1uZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGxldCBqc29uPWFzc2V0cy5qc29uO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxqc29uLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBqc29uRGF0YT1uZXcgSnNvbkVuZGxlc3NSZXdhcmQoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLlJld2FyZExldmVsLGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uRW5kbGVzc1Jld2FyZChpZDpudW1iZXIpOkpzb25FbmRsZXNzUmV3YXJkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7lpZblirHms6LmrKHojrflj5blpZblirFJRCAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZEl0ZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuUmV3YXJkSXRlbTtcclxuICAgIH1cclxuICAgIC8qKuagueaNruWlluWKseazouasoeiOt+WPluWlluWKseaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldFJld2FyZE51bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXdhcmROdW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmdmeaAgeaWueazle+8jOiOt+WPluacgOWkp+eahCDlpZblirHms6LmrKEqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhSZXdhcmRMZXZlbCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDY4MDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgZ2V0UmV3YXJkQnlTY29yZShzY29yZTpudW1iZXIpOkVuZGxlc3NSZXdhcmREYXRhe1xyXG4gICAgICAgIC8v6YGN5Y6GXHJcbiAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBFbmRsZXNzUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8vIHRoaXMuZGF0YS5mb3JFYWNoKCh2YWx1ZSk9PntcclxuICAgICAgICAvLyAgICAgaWYoc2NvcmU+PXZhbHVlLkludGVncmFsUmVxdWlyZW1lbnQpe1xyXG4gICAgICAgIC8vICAgICAgICAganNvbkRhdGEuY3VyRGF0YT12YWx1ZTtcclxuICAgICAgICAvLyAgICAgICAgIGpzb25EYXRhLm5leHREYXRhPXZhbHVlO1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodmFsdWUuUmV3YXJkTGV2ZWw+PUVuZGxlc3NSZXdhcmRNYW5hZ2VyLmdldE1heFJld2FyZExldmVsKCkpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGpzb25EYXRhLm5leHREYXRhPXZhbHVlO1xyXG4gICAgICAgIC8vICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAganNvbkRhdGEubmV4dERhdGE9dGhpcy5nZXRKc29uRW5kbGVzc1Jld2FyZCh2YWx1ZS5SZXdhcmRMZXZlbCsxKTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHJldHVybiBqc29uRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFbmRsZXNzUmV3YXJkKHNjb3JlOm51bWJlcik6UmV3YXJkRGF0YVtde1xyXG4gICAgICAgIC8v6YGN5Y6GXHJcbiAgICAgICAgbGV0IHJld2FyZERhdGFzPW5ldyBBcnJheTxSZXdhcmREYXRhPigpO1xyXG4gICAgICAgIC8vIGxldCBqc29uRGF0YT1uZXcgSnNvbkVuZGxlc3NSZXdhcmQoKTtcclxuICAgICAgICAvLyB0aGlzLmRhdGEuZm9yRWFjaCgodmFsdWUpPT57XHJcbiAgICAgICAgLy8gICAgIGlmKHNjb3JlPj12YWx1ZS5JbnRlZ3JhbFJlcXVpcmVtZW50KXtcclxuICAgICAgICAvLyAgICAgICAgIGpzb25EYXRhPXZhbHVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gaWYoanNvbkRhdGEuQ29pbj4wKXtcclxuICAgICAgICAvLyAgICAgbGV0IGNvaW5SZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICBjb2luUmQucmV3YXJkX2lkPVByb3BJZC5Db2luO1xyXG4gICAgICAgIC8vICAgICBjb2luUmQucmV3YXJkX251bT1qc29uRGF0YS5Db2luO1xyXG4gICAgICAgIC8vICAgICByZXdhcmREYXRhcy5wdXNoKGNvaW5SZCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGpzb25EYXRhLkdlbT4wKXtcclxuICAgICAgICAvLyAgICAgbGV0IGdlbVJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgLy8gICAgIGdlbVJkLnJld2FyZF9pZD1Qcm9wSWQuR2VtO1xyXG4gICAgICAgIC8vICAgICBnZW1SZC5yZXdhcmRfbnVtPWpzb25EYXRhLkdlbTtcclxuICAgICAgICAvLyAgICAgcmV3YXJkRGF0YXMucHVzaChnZW1SZCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGpzb25EYXRhLkhlcm9FeHA+MCl7XHJcbiAgICAgICAgLy8gICAgIGxldCBoZXJvRXhwUmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAvLyAgICAgaGVyb0V4cFJkLnJld2FyZF9pZD1Qcm9wSWQuSGVyb0V4cDtcclxuICAgICAgICAvLyAgICAgaGVyb0V4cFJkLnJld2FyZF9udW09anNvbkRhdGEuSGVyb0V4cDtcclxuICAgICAgICAvLyAgICAgcmV3YXJkRGF0YXMucHVzaChoZXJvRXhwUmQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZihqc29uRGF0YS5QbGF5ZXJFeHA+MCl7XHJcbiAgICAgICAgLy8gICAgIGxldCB1c2VyRXhwUmQ9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAvLyAgICAgdXNlckV4cFJkLnJld2FyZF9pZD1Qcm9wSWQuVXNlckV4cDtcclxuICAgICAgICAvLyAgICAgdXNlckV4cFJkLnJld2FyZF9udW09anNvbkRhdGEuUGxheWVyRXhwO1xyXG4gICAgICAgIC8vICAgICByZXdhcmREYXRhcy5wdXNoKHVzZXJFeHBSZCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyAvL+WlluaxoFxyXG4gICAgICAgIC8vIGlmKGpzb25EYXRhLkphY2twb3RJRF8xPjApe1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGk9MDsgaTxqc29uRGF0YS5KYWNrcG90TnVtXzE7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmQxPUphY2twb3RNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UmV3YXJkRGF0YUJ5SWQoanNvbkRhdGEuSmFja3BvdElEXzEpO1xyXG4gICAgICAgIC8vICAgICAgICAgcmV3YXJkRGF0YXMucHVzaChyZDEpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYoanNvbkRhdGEuSmFja3BvdElEXzI+MCl7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaT0wOyBpPGpzb25EYXRhLkphY2twb3ROdW1fMjsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgIGxldCByZDI9SmFja3BvdE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRSZXdhcmREYXRhQnlJZChqc29uRGF0YS5KYWNrcG90SURfMik7XHJcbiAgICAgICAgLy8gICAgICAgICByZXdhcmREYXRhcy5wdXNoKHJkMilcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcmV3YXJkRGF0YXM7XHJcbiAgICB9XHJcbn1cclxuIl19