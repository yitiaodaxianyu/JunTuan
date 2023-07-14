
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/RabateManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f58baBz6elAT7Ymm8xF6YX5', 'RabateManager');
// Scripts/Payment/RabateManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabateManager = exports.RabateData = exports.RabateType = void 0;
var CustomsClearanceRebate_1 = require("../JsonData/CustomsClearanceRebate");
var LevelJsonData_1 = require("../JsonData/LevelJsonData");
var LevelUpRebate_1 = require("../JsonData/LevelUpRebate");
var LevelManager_1 = require("../Level/LevelManager");
var MissionLevel_1 = require("../Level/MissionLevel");
var PayManager_1 = require("../Payment/PayManager");
var PropConfig_1 = require("../Prop/PropConfig");
var ThirdParty_1 = require("../thirdParty/ThirdParty");
var UserData_1 = require("../UserData");
var RabateType;
(function (RabateType) {
    RabateType[RabateType["Campaign"] = 0] = "Campaign";
    RabateType[RabateType["Growth"] = 1] = "Growth";
})(RabateType = exports.RabateType || (exports.RabateType = {}));
var RabateData = /** @class */ (function () {
    function RabateData() {
        /**是否完成 */
        this.is_complete = false;
        /**是否已经领取 */
        this.is_claimed = false;
        /**是否购买 */
        this.is_buy = false;
        /**是否可点击 */
        this.is_can_click = false;
        /**需要的条件 */
        this.need_num = 0;
        /**当前的条件 */
        this.cur_num = 0;
    }
    return RabateData;
}());
exports.RabateData = RabateData;
var RabateManager = /** @class */ (function () {
    function RabateManager() {
    }
    RabateManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new RabateManager();
            ThirdParty_1.PayId.Campaign;
            console.log("RabateManager null");
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    RabateManager.prototype.init = function () {
    };
    /**
     * @param type 返利类型
     * @param id 通关返利:章节数,升级返利:等级数
     * @returns 返回对应的领取状态
     */
    RabateManager.getClaimState = function (type, id) {
        var num = cc.sys.localStorage.getItem('rabate_claim_state_' + type + "_" + id);
        if (num != "" && num != null) {
            num = parseInt(num);
        }
        else {
            num = 0;
        }
        return num;
    };
    /**
     *
     * @param type 返利类型
     * @param id 通关返利:章节数,升级返利:等级数
     * @param num 领取状态,大于0表示已领取，其他表示未领取
     */
    RabateManager.saveClaimState = function (type, id, num) {
        cc.sys.localStorage.setItem('rabate_claim_state_' + type + "_" + id, num);
    };
    RabateManager.getRabateData = function (type, id) {
        var rd = new RabateData();
        /**是否购买 */
        rd.is_buy = PayManager_1.PayManager.getInstance().getPayNum("b401") > 0;
        /**是否领取 */
        rd.is_claimed = this.getClaimState(type, id) > 0;
        /**是否完成 */
        switch (type) {
            case RabateType.Campaign:
                {
                    var finish = LevelManager_1.LevelManager.getInstance().finish_level;
                    var levelId = MissionLevel_1.MissionLevelManager.getId(finish, 1);
                    // rd.cur_num=MissionLevelManager.getInstance().getChapter(levelId)-1;
                    rd.cur_num = LevelManager_1.LevelManager.getInstance().getFinishChapter();
                    rd.need_num = CustomsClearanceRebate_1.CustomsClearanceRebateManager.getInstance().getCompleteChapter(id);
                    rd.is_complete = rd.cur_num >= rd.need_num;
                }
                break;
            case RabateType.Growth:
                {
                    rd.cur_num = UserData_1.default.getInstance().getUserLevel();
                    rd.need_num = LevelUpRebate_1.LevelUpRebateManager.getInstance().getUnlockUserLevel(id);
                    rd.is_complete = rd.cur_num >= rd.need_num;
                }
                break;
        }
        return rd;
    };
    RabateManager.getIsCanClaim = function (type) {
        var num = 0;
        switch (type) {
            case RabateType.Campaign:
                {
                    num = CustomsClearanceRebate_1.CustomsClearanceRebateManager.getMaxRewardID();
                }
                break;
            case RabateType.Growth:
                {
                    num = LevelUpRebate_1.LevelUpRebateManager.getMaxRewardID();
                }
                break;
        }
        for (var i = 1; i <= num; i++) {
            var rd = this.getRabateData(type, i);
            if (rd.is_buy && rd.is_complete && !rd.is_claimed) {
                return true;
            }
        }
        return false;
    };
    /**
     *
     * @param type 返利类型
     * @returns 奖励数据
     */
    RabateManager.claimAll = function (type) {
        var num = 0;
        var rewardData = new LevelJsonData_1.RewardData();
        //钻石
        rewardData.reward_id = 2;
        switch (type) {
            case RabateType.Campaign:
                {
                    num = CustomsClearanceRebate_1.CustomsClearanceRebateManager.getMaxRewardID();
                }
                break;
            case RabateType.Growth:
                {
                    num = LevelUpRebate_1.LevelUpRebateManager.getMaxRewardID();
                }
                break;
        }
        for (var i = 1; i <= num; i++) {
            var rd = this.claimOnce(type, i);
            ;
            rewardData.reward_num += rd.reward_num;
        }
        return rewardData;
    };
    RabateManager.claimOnce = function (type, id) {
        var rewardData = new LevelJsonData_1.RewardData();
        //钻石
        rewardData.reward_id = PropConfig_1.PropId.Gem;
        var rd = this.getRabateData(type, id);
        var rewardNum = 0;
        if (rd.is_buy && rd.is_complete && !rd.is_claimed) {
            this.saveClaimState(type, id, 1);
            rewardNum = CustomsClearanceRebate_1.CustomsClearanceRebateManager.getInstance().getGetGem(id);
            rewardData.reward_num = rewardNum;
        }
        return rewardData;
    };
    RabateManager._instance = null;
    return RabateManager;
}());
exports.RabateManager = RabateManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcUmFiYXRlTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2RUFBbUY7QUFDbkYsMkRBQXVEO0FBQ3ZELDJEQUFpRTtBQUNqRSxzREFBcUQ7QUFDckQsc0RBQTREO0FBRzVELG9EQUFtRDtBQUNuRCxpREFBNEM7QUFDNUMsdURBQWtEO0FBQ2xELHdDQUFtQztBQUVuQyxJQUFZLFVBR1g7QUFIRCxXQUFZLFVBQVU7SUFDbEIsbURBQVUsQ0FBQTtJQUNWLCtDQUFNLENBQUE7QUFDVixDQUFDLEVBSFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFHckI7QUFFRDtJQUFBO1FBQ0ksVUFBVTtRQUNWLGdCQUFXLEdBQVMsS0FBSyxDQUFDO1FBQzFCLFlBQVk7UUFDWixlQUFVLEdBQVMsS0FBSyxDQUFDO1FBQ3pCLFVBQVU7UUFDVixXQUFNLEdBQVMsS0FBSyxDQUFDO1FBQ3JCLFdBQVc7UUFDWCxpQkFBWSxHQUFTLEtBQUssQ0FBQztRQUMzQixXQUFXO1FBQ1gsYUFBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixXQUFXO1FBQ1gsWUFBTyxHQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQWJZLGdDQUFVO0FBZXZCO0lBQUE7SUE2SEEsQ0FBQztJQTFIaUIseUJBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUFBLGtCQUFLLENBQUMsUUFBUSxDQUFBO1lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENB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QUF2QixVQUF3QixJQUFlLEVBQUMsRUFBUztRQUM3QyxJQUFJLFVBQVUsR0FBQyxJQUFJLDBCQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJO1FBQ0osVUFBVSxDQUFDLFNBQVMsR0FBQyxtQkFBTSxDQUFDLEdBQUcsQ0FBQztRQUNoQyxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUM7UUFDaEIsSUFBRyxFQUFFLENBQUMsTUFBTSxJQUFFLEVBQUUsQ0FBQyxXQUFXLElBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFDO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixTQUFTLEdBQUcsc0RBQTZCLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLFVBQVUsQ0FBQyxVQUFVLEdBQUMsU0FBUyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQTFIYyx1QkFBUyxHQUFrQixJQUFJLENBQUM7SUE0SG5ELG9CQUFDO0NBN0hELEFBNkhDLElBQUE7QUE3SFksc0NBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9DdXN0b21zQ2xlYXJhbmNlUmViYXRlXCI7XHJcbmltcG9ydCB7IFJld2FyZERhdGEgfSBmcm9tIFwiLi4vSnNvbkRhdGEvTGV2ZWxKc29uRGF0YVwiO1xyXG5pbXBvcnQgeyBMZXZlbFVwUmViYXRlTWFuYWdlciB9IGZyb20gXCIuLi9Kc29uRGF0YS9MZXZlbFVwUmViYXRlXCI7XHJcbmltcG9ydCB7IExldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9MZXZlbE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgTWlzc2lvbkxldmVsTWFuYWdlciB9IGZyb20gXCIuLi9MZXZlbC9NaXNzaW9uTGV2ZWxcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQcm9wSWQgfSBmcm9tIFwiLi4vUHJvcC9Qcm9wQ29uZmlnXCI7XHJcbmltcG9ydCB7ICBQYXlJZCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IFVzZXJEYXRhIGZyb20gXCIuLi9Vc2VyRGF0YVwiO1xyXG5cclxuZXhwb3J0IGVudW0gUmFiYXRlVHlwZXtcclxuICAgIENhbXBhaWduPTAsLy/lvoHmiJgv6YCa5YWz6L+U5YipXHJcbiAgICBHcm93dGgsLy/miJDplb8v5Y2H57qn6L+U5YipXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSYWJhdGVEYXRheyAgIFxyXG4gICAgLyoq5piv5ZCm5a6M5oiQICovXHJcbiAgICBpc19jb21wbGV0ZTpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5piv5ZCm5bey57uP6aKG5Y+WICovXHJcbiAgICBpc19jbGFpbWVkOmJvb2xlYW49ZmFsc2U7XHJcbiAgICAvKirmmK/lkKbotK3kubAgKi9cclxuICAgIGlzX2J1eTpib29sZWFuPWZhbHNlO1xyXG4gICAgLyoq5piv5ZCm5Y+v54K55Ye7ICovXHJcbiAgICBpc19jYW5fY2xpY2s6Ym9vbGVhbj1mYWxzZTtcclxuICAgIC8qKumcgOimgeeahOadoeS7tiAqL1xyXG4gICAgbmVlZF9udW06bnVtYmVyPTA7XHJcbiAgICAvKirlvZPliY3nmoTmnaHku7YgKi9cclxuICAgIGN1cl9udW06bnVtYmVyPTA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSYWJhdGVNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUmFiYXRlTWFuYWdlciA9IG51bGw7XHJcbiAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOlJhYmF0ZU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBSYWJhdGVNYW5hZ2VyKCk7UGF5SWQuQ2FtcGFpZ25cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSYWJhdGVNYW5hZ2VyIG51bGxcIik7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbmuLjmiI/mlbDmja5cclxuICAgIHByaXZhdGUgaW5pdCAoKSB7ICAgICAgICBcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDov5TliKnnsbvlnotcclxuICAgICAqIEBwYXJhbSBpZCDpgJrlhbPov5TliKk656ug6IqC5pWwLOWNh+e6p+i/lOWIqTrnrYnnuqfmlbBcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuWvueW6lOeahOmihuWPlueKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENsYWltU3RhdGUodHlwZTpSYWJhdGVUeXBlLGlkOm51bWJlcik6bnVtYmVyXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmFiYXRlX2NsYWltX3N0YXRlXycrdHlwZStcIl9cIitpZCk7XHJcbiAgICAgICAgaWYobnVtIT1cIlwiJiZudW0hPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09cGFyc2VJbnQobnVtKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbnVtPTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHR5cGUg6L+U5Yip57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaWQg6YCa5YWz6L+U5YipOueroOiKguaVsCzljYfnuqfov5TliKk6562J57qn5pWwXHJcbiAgICAgKiBAcGFyYW0gbnVtIOmihuWPlueKtuaAgSzlpKfkuo4w6KGo56S65bey6aKG5Y+W77yM5YW25LuW6KGo56S65pyq6aKG5Y+WXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2F2ZUNsYWltU3RhdGUodHlwZTpSYWJhdGVUeXBlLGlkOm51bWJlcixudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmFiYXRlX2NsYWltX3N0YXRlXycrdHlwZStcIl9cIitpZCxudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmFiYXRlRGF0YSh0eXBlOlJhYmF0ZVR5cGUsaWQ6bnVtYmVyKTpSYWJhdGVEYXRhe1xyXG4gICAgICAgIGxldCByZD1uZXcgUmFiYXRlRGF0YSgpO1xyXG4gICAgICAgIC8qKuaYr+WQpui0reS5sCAqL1xyXG4gICAgICAgIHJkLmlzX2J1eT1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKFwiYjQwMVwiKT4wO1xyXG4gICAgICAgIC8qKuaYr+WQpumihuWPliAqL1xyXG4gICAgICAgIHJkLmlzX2NsYWltZWQ9dGhpcy5nZXRDbGFpbVN0YXRlKHR5cGUsaWQpPjA7XHJcbiAgICAgICAgLyoq5piv5ZCm5a6M5oiQICovXHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFJhYmF0ZVR5cGUuQ2FtcGFpZ246e1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbmlzaD1MZXZlbE1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5maW5pc2hfbGV2ZWw7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWxJZD1NaXNzaW9uTGV2ZWxNYW5hZ2VyLmdldElkKGZpbmlzaCwxKTtcclxuICAgICAgICAgICAgICAgIC8vIHJkLmN1cl9udW09TWlzc2lvbkxldmVsTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldENoYXB0ZXIobGV2ZWxJZCktMTtcclxuICAgICAgICAgICAgICAgIHJkLmN1cl9udW09TGV2ZWxNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0RmluaXNoQ2hhcHRlcigpO1xyXG4gICAgICAgICAgICAgICAgcmQubmVlZF9udW09Q3VzdG9tc0NsZWFyYW5jZVJlYmF0ZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5nZXRDb21wbGV0ZUNoYXB0ZXIoaWQpO1xyXG4gICAgICAgICAgICAgICAgcmQuaXNfY29tcGxldGU9cmQuY3VyX251bT49cmQubmVlZF9udW07XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSYWJhdGVUeXBlLkdyb3d0aDp7XHJcbiAgICAgICAgICAgICAgICByZC5jdXJfbnVtPVVzZXJEYXRhLmdldEluc3RhbmNlKCkuZ2V0VXNlckxldmVsKCk7XHJcbiAgICAgICAgICAgICAgICByZC5uZWVkX251bT1MZXZlbFVwUmViYXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldFVubG9ja1VzZXJMZXZlbChpZCk7XHJcbiAgICAgICAgICAgICAgICByZC5pc19jb21wbGV0ZT1yZC5jdXJfbnVtPj1yZC5uZWVkX251bTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJc0NhbkNsYWltKHR5cGU6UmFiYXRlVHlwZSk6Ym9vbGVhbntcclxuICAgICAgICBsZXQgbnVtPTA7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFJhYmF0ZVR5cGUuQ2FtcGFpZ246e1xyXG4gICAgICAgICAgICAgICAgbnVtPUN1c3RvbXNDbGVhcmFuY2VSZWJhdGVNYW5hZ2VyLmdldE1heFJld2FyZElEKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSYWJhdGVUeXBlLkdyb3d0aDp7XHJcbiAgICAgICAgICAgICAgICBudW09TGV2ZWxVcFJlYmF0ZU1hbmFnZXIuZ2V0TWF4UmV3YXJkSUQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MTsgaTw9bnVtOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcmQ9dGhpcy5nZXRSYWJhdGVEYXRhKHR5cGUsaSk7XHJcbiAgICAgICAgICAgIGlmKHJkLmlzX2J1eSYmcmQuaXNfY29tcGxldGUmJiFyZC5pc19jbGFpbWVkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdHlwZSDov5TliKnnsbvlnotcclxuICAgICAqIEByZXR1cm5zIOWlluWKseaVsOaNrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYWltQWxsKHR5cGU6UmFiYXRlVHlwZSk6UmV3YXJkRGF0YXtcclxuICAgICAgICBsZXQgbnVtPTA7XHJcbiAgICAgICAgbGV0IHJld2FyZERhdGE9bmV3IFJld2FyZERhdGEoKTtcclxuICAgICAgICAvL+mSu+efs1xyXG4gICAgICAgIHJld2FyZERhdGEucmV3YXJkX2lkPTI7XHJcbiAgICAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgICAgICAgICBjYXNlIFJhYmF0ZVR5cGUuQ2FtcGFpZ246e1xyXG4gICAgICAgICAgICAgICAgbnVtPUN1c3RvbXNDbGVhcmFuY2VSZWJhdGVNYW5hZ2VyLmdldE1heFJld2FyZElEKCk7XHJcbiAgICAgICAgICAgIH1icmVhaztcclxuICAgICAgICAgICAgY2FzZSBSYWJhdGVUeXBlLkdyb3d0aDp7XHJcbiAgICAgICAgICAgICAgICBudW09TGV2ZWxVcFJlYmF0ZU1hbmFnZXIuZ2V0TWF4UmV3YXJkSUQoKTtcclxuICAgICAgICAgICAgfWJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk9MTsgaTw9bnVtOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgcmQ9dGhpcy5jbGFpbU9uY2UodHlwZSxpKTs7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJld2FyZERhdGEucmV3YXJkX251bSs9cmQucmV3YXJkX251bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJld2FyZERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFpbU9uY2UodHlwZTpSYWJhdGVUeXBlLGlkOm51bWJlcik6UmV3YXJkRGF0YXtcclxuICAgICAgICBsZXQgcmV3YXJkRGF0YT1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgIC8v6ZK755+zXHJcbiAgICAgICAgcmV3YXJkRGF0YS5yZXdhcmRfaWQ9UHJvcElkLkdlbTtcclxuICAgICAgICBsZXQgcmQ9dGhpcy5nZXRSYWJhdGVEYXRhKHR5cGUsaWQpO1xyXG4gICAgICAgIGxldCByZXdhcmROdW09MDsgICAgICAgIFxyXG4gICAgICAgIGlmKHJkLmlzX2J1eSYmcmQuaXNfY29tcGxldGUmJiFyZC5pc19jbGFpbWVkKXtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQ2xhaW1TdGF0ZSh0eXBlLGlkLDEpO1xyXG4gICAgICAgICAgICByZXdhcmROdW0gPSBDdXN0b21zQ2xlYXJhbmNlUmViYXRlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEdldEdlbShpZCk7XHJcbiAgICAgICAgICAgIHJld2FyZERhdGEucmV3YXJkX251bT1yZXdhcmROdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXdhcmREYXRhO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=