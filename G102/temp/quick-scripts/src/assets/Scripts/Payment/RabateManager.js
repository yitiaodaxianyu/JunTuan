"use strict";
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