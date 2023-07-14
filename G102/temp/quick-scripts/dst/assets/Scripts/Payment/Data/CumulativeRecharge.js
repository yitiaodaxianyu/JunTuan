
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/Payment/Data/CumulativeRecharge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4fa24UGiqtFv6KwZJEiFAI+', 'CumulativeRecharge');
// Scripts/Payment/Data/CumulativeRecharge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CumulativeRechargeManager = exports.JsonCumulativeRecharge = void 0;
var LevelJsonData_1 = require("../../JsonData/LevelJsonData");
var LoadManager_1 = require("../../Loading/LoadManager");
var PropConfig_1 = require("../../Prop/PropConfig");
var JsonCumulativeRecharge = /** @class */ (function () {
    function JsonCumulativeRecharge() {
        /**累计充值ID */
        this.CumulativeRechargeID = 0;
        /**显示顺序 */
        this.DisplayOrder = 0;
        /**累计充值价格 */
        this.CumulativeRechargePrice = 0;
        /**金币数量 */
        this.GetCoin = 0;
        /**钻石数量 */
        this.GetGem = 0;
        /**道具1ID */
        this.Item1_ID = 0;
        /**道具1数量 */
        this.Item1_Num = 0;
        /**道具2ID */
        this.Item2_ID = 0;
        /**道具2数量 */
        this.Item2_Num = 0;
        /**道具3ID */
        this.Item3_ID = 0;
        /**道具3数量 */
        this.Item3_Num = 0;
    }
    return JsonCumulativeRecharge;
}());
exports.JsonCumulativeRecharge = JsonCumulativeRecharge;
var CumulativeRechargeManager = /** @class */ (function () {
    function CumulativeRechargeManager() {
        //把json数据转化成map数据
        this.data = null;
        this.is_load_completed = false;
    }
    CumulativeRechargeManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new CumulativeRechargeManager();
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    CumulativeRechargeManager.prototype.init = function () {
        if (!this.data) {
            this.loadJson();
        }
    };
    //加载json
    CumulativeRechargeManager.prototype.loadJson = function () {
        var _this = this;
        LoadManager_1.LoadManager.loadJson('CumulativeRecharge', LoadManager_1.LoadManager.load_mode, function (error, assets) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeRecharge成功');
            _this.data = new Map();
            var json = assets.json;
            for (var i = 0; i < json.length; i++) {
                var jsonData = new JsonCumulativeRecharge();
                jsonData = json[i];
                _this.data.set(jsonData.CumulativeRechargeID, jsonData);
            }
            _this.is_load_completed = true;
        });
    };
    /**加载是否完成 */
    CumulativeRechargeManager.prototype.getIsLoadCompleted = function () {
        return this.is_load_completed;
    };
    /**根据id号获取Json的各种数据 */
    CumulativeRechargeManager.prototype.getJsonCumulativeRecharge = function (id) {
        return this.data.get(id);
    };
    /**根据累计充值ID获取显示顺序 */
    CumulativeRechargeManager.prototype.getDisplayOrder = function (id) {
        return this.data.get(id).DisplayOrder;
    };
    /**根据累计充值ID获取累计充值价格 */
    CumulativeRechargeManager.prototype.getCumulativeRechargePrice = function (id) {
        return this.data.get(id).CumulativeRechargePrice;
    };
    /**根据累计充值ID获取金币数量 */
    CumulativeRechargeManager.prototype.getGetCoin = function (id) {
        return this.data.get(id).GetCoin;
    };
    /**根据累计充值ID获取钻石数量 */
    CumulativeRechargeManager.prototype.getGetGem = function (id) {
        return this.data.get(id).GetGem;
    };
    /**根据累计充值ID获取道具1ID */
    CumulativeRechargeManager.prototype.getItem1_ID = function (id) {
        return this.data.get(id).Item1_ID;
    };
    /**根据累计充值ID获取道具1数量 */
    CumulativeRechargeManager.prototype.getItem1_Num = function (id) {
        return this.data.get(id).Item1_Num;
    };
    /**根据累计充值ID获取道具2ID */
    CumulativeRechargeManager.prototype.getItem2_ID = function (id) {
        return this.data.get(id).Item2_ID;
    };
    /**根据累计充值ID获取道具2数量 */
    CumulativeRechargeManager.prototype.getItem2_Num = function (id) {
        return this.data.get(id).Item2_Num;
    };
    /**根据累计充值ID获取道具3ID */
    CumulativeRechargeManager.prototype.getItem3_ID = function (id) {
        return this.data.get(id).Item3_ID;
    };
    /**根据累计充值ID获取道具3数量 */
    CumulativeRechargeManager.prototype.getItem3_Num = function (id) {
        return this.data.get(id).Item3_Num;
    };
    /** 静态方法，获取最大的 累计充值ID*/
    CumulativeRechargeManager.getMaxCumulativeRechargeID = function () {
        return 80001;
    };
    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得奖励列表数据
     * @param total 总共充值龙晶的数量
     * @returns 奖励列表数据
     */
    CumulativeRechargeManager.prototype.getRewardData = function (id) {
        var rewardDatas = new Array();
        var jsonData = this.getJsonCumulativeRecharge(id);
        if (jsonData.GetCoin > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.Coin;
            rd.reward_num = jsonData.GetCoin;
            rewardDatas.push(rd);
        }
        if (jsonData.GetGem > 0) {
            var rd = new LevelJsonData_1.RewardData();
            rd.reward_id = PropConfig_1.PropId.Gem;
            rd.reward_num = jsonData.GetGem;
            rewardDatas.push(rd);
        }
        for (var i = 1; i <= 3; i++) {
            var id_1 = 'Item' + i + '_ID';
            if (jsonData[id_1] > 0) {
                var rd = new LevelJsonData_1.RewardData();
                rd.reward_id = jsonData[id_1];
                rd.reward_num = jsonData['Item' + i + '_Num'];
                rewardDatas.push(rd);
            }
        }
        return rewardDatas;
    };
    CumulativeRechargeManager.prototype.getId = function (total) {
        var id = 0;
        var isFind = false;
        this.data.forEach(function (v, k) {
            if (!isFind && total < v.CumulativeRechargePrice) {
                id = v.CumulativeRechargeID;
                isFind = true;
            }
        });
        return id;
    };
    CumulativeRechargeManager.prototype.getData = function () {
        return this.data;
    };
    CumulativeRechargeManager._instance = null;
    return CumulativeRechargeManager;
}());
exports.CumulativeRechargeManager = CumulativeRechargeManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcUGF5bWVudFxcRGF0YVxcQ3VtdWxhdGl2ZVJlY2hhcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUEwRDtBQUMxRCx5REFBd0Q7QUFDeEQsb0RBQStDO0FBRS9DO0lBQUE7UUFDSSxZQUFZO1FBQ0wseUJBQW9CLEdBQVUsQ0FBQyxDQUFFO1FBQ3hDLFVBQVU7UUFDSCxpQkFBWSxHQUFVLENBQUMsQ0FBRTtRQUNoQyxZQUFZO1FBQ0wsNEJBQXVCLEdBQVUsQ0FBQyxDQUFFO1FBQzNDLFVBQVU7UUFDSCxZQUFPLEdBQVUsQ0FBQyxDQUFFO1FBQzNCLFVBQVU7UUFDSCxXQUFNLEdBQVUsQ0FBQyxDQUFFO1FBQzFCLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixjQUFTLEdBQVUsQ0FBQyxDQUFFO1FBQzdCLFdBQVc7UUFDSixhQUFRLEdBQVUsQ0FBQyxDQUFFO1FBQzVCLFdBQVc7UUFDSixjQUFTLEdBQVUsQ0FBQyxDQUFFO0lBQ2pDLENBQUM7SUFBRCw2QkFBQztBQUFELENBdkJBLEFBdUJDLElBQUE7QUF2Qlksd0RBQXNCO0FBeUJuQztJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFvQyxJQUFJLENBQUM7UUFDN0Msc0JBQWlCLEdBQVMsS0FBSyxDQUFDO0lBd0k1QyxDQUFDO0lBdElpQixxQ0FBVyxHQUF6QjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLHlCQUF5QixFQUFFLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FB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LGdDQUFDO0NBNUlELEFBNElDLElBQUE7QUE1SVksOERBQXlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmV3YXJkRGF0YSB9IGZyb20gXCIuLi8uLi9Kc29uRGF0YS9MZXZlbEpzb25EYXRhXCI7XHJcbmltcG9ydCB7IExvYWRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL0xvYWRpbmcvTG9hZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgUHJvcElkIH0gZnJvbSBcIi4uLy4uL1Byb3AvUHJvcENvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25DdW11bGF0aXZlUmVjaGFyZ2Uge1xyXG4gICAgLyoq57Sv6K6h5YWF5YC8SUQgKi9cclxuICAgIHB1YmxpYyBDdW11bGF0aXZlUmVjaGFyZ2VJRDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuaYvuekuumhuuW6jyAqL1xyXG4gICAgcHVibGljIERpc3BsYXlPcmRlcjpudW1iZXIgPSAwIDtcclxuICAgIC8qKue0r+iuoeWFheWAvOS7t+agvCAqL1xyXG4gICAgcHVibGljIEN1bXVsYXRpdmVSZWNoYXJnZVByaWNlOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YeR5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgR2V0Q29pbjpudW1iZXIgPSAwIDtcclxuICAgIC8qKumSu+efs+aVsOmHjyAqL1xyXG4gICAgcHVibGljIEdldEdlbTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzFJRCAqL1xyXG4gICAgcHVibGljIEl0ZW0xX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MeaVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW0xX051bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzJJRCAqL1xyXG4gICAgcHVibGljIEl0ZW0yX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3MuaVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW0yX051bTpudW1iZXIgPSAwIDtcclxuICAgIC8qKumBk+WFtzNJRCAqL1xyXG4gICAgcHVibGljIEl0ZW0zX0lEOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6YGT5YW3M+aVsOmHjyAqL1xyXG4gICAgcHVibGljIEl0ZW0zX051bTpudW1iZXIgPSAwIDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDdW11bGF0aXZlUmVjaGFyZ2VNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkN1bXVsYXRpdmVSZWNoYXJnZT49bnVsbDtcclxuICAgIHByaXZhdGUgaXNfbG9hZF9jb21wbGV0ZWQ6Ym9vbGVhbj1mYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6Q3VtdWxhdGl2ZVJlY2hhcmdlTWFuYWdlciB7XHJcbiAgICAgICAgaWYodGhpcy5faW5zdGFuY2U9PW51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2U9bmV3IEN1bXVsYXRpdmVSZWNoYXJnZU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignQ3VtdWxhdGl2ZVJlY2hhcmdlJyxMb2FkTWFuYWdlci5sb2FkX21vZGUsKGVycm9yOiBFcnJvciwgYXNzZXRzOmNjLkpzb25Bc3NldCk9PiB7XHJcbiAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yqg6L29SnNvbkN1bXVsYXRpdmVSZWNoYXJnZeaIkOWKnycpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGE9bmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBsZXQganNvbj1hc3NldHMuanNvbjtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8anNvbi5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQganNvbkRhdGE9bmV3IEpzb25DdW11bGF0aXZlUmVjaGFyZ2UoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkN1bXVsYXRpdmVSZWNoYXJnZUlELGpzb25EYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzX2xvYWRfY29tcGxldGVkPXRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Yqg6L295piv5ZCm5a6M5oiQICovXHJcbiAgICBwdWJsaWMgZ2V0SXNMb2FkQ29tcGxldGVkKCk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNfbG9hZF9jb21wbGV0ZWQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja5pZOWPt+iOt+WPlkpzb27nmoTlkITnp43mlbDmja4gKi9cclxuICAgIHB1YmxpYyBnZXRKc29uQ3VtdWxhdGl2ZVJlY2hhcmdlKGlkOm51bWJlcik6SnNvbkN1bXVsYXRpdmVSZWNoYXJnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5YWF5YC8SUTojrflj5bmmL7npLrpobrluo8gKi9cclxuICAgIHB1YmxpYyBnZXREaXNwbGF5T3JkZXIoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRGlzcGxheU9yZGVyO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5YWF5YC8SUTojrflj5bntK/orqHlhYXlgLzku7fmoLwgKi9cclxuICAgIHB1YmxpYyBnZXRDdW11bGF0aXZlUmVjaGFyZ2VQcmljZShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5DdW11bGF0aXZlUmVjaGFyZ2VQcmljZTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWFheWAvElE6I635Y+W6YeR5biB5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0R2V0Q29pbihpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5HZXRDb2luO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5YWF5YC8SUTojrflj5bpkrvnn7PmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRHZXRHZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuR2V0R2VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5YWF5YC8SUTojrflj5bpgZPlhbcxSUQgKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtMV9JRChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtMV9JRDtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWFheWAvElE6I635Y+W6YGT5YW3MeaVsOmHjyAqL1xyXG4gICAgcHVibGljIGdldEl0ZW0xX051bShpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5JdGVtMV9OdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHlhYXlgLxJROiOt+WPlumBk+WFtzJJRCAqL1xyXG4gICAgcHVibGljIGdldEl0ZW0yX0lEKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW0yX0lEO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u57Sv6K6h5YWF5YC8SUTojrflj5bpgZPlhbcy5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbTJfTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkl0ZW0yX051bTtcclxuICAgIH1cclxuICAgIC8qKuagueaNrue0r+iuoeWFheWAvElE6I635Y+W6YGT5YW3M0lEICovXHJcbiAgICBwdWJsaWMgZ2V0SXRlbTNfSUQoaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbTNfSUQ7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7ntK/orqHlhYXlgLxJROiOt+WPlumBk+WFtzPmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRJdGVtM19OdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuSXRlbTNfTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg57Sv6K6h5YWF5YC8SUQqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNYXhDdW11bGF0aXZlUmVjaGFyZ2VJRCgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDgwMDAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lul5LiK5qC85byP57uf5LiA77yM5Lul5LiL5YaZ5q+P5LiqanNvbuaVsOaNrueahOeJueauiumcgOaxglxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflvpflpZblirHliJfooajmlbDmja5cclxuICAgICAqIEBwYXJhbSB0b3RhbCDmgLvlhbHlhYXlgLzpvpnmmbbnmoTmlbDph49cclxuICAgICAqIEByZXR1cm5zIOWlluWKseWIl+ihqOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBnZXRSZXdhcmREYXRhKGlkOm51bWJlcik6UmV3YXJkRGF0YVtdeyAgICAgICAgXHJcbiAgICAgICAgbGV0IHJld2FyZERhdGFzPW5ldyBBcnJheSgpO1xyXG4gICAgICAgIGxldCBqc29uRGF0YT10aGlzLmdldEpzb25DdW11bGF0aXZlUmVjaGFyZ2UoaWQpO1xyXG4gICAgICAgIGlmKGpzb25EYXRhLkdldENvaW4+MCl7XHJcbiAgICAgICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgICAgICByZC5yZXdhcmRfaWQ9UHJvcElkLkNvaW47XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9udW09anNvbkRhdGEuR2V0Q29pbjtcclxuICAgICAgICAgICAgcmV3YXJkRGF0YXMucHVzaChyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGpzb25EYXRhLkdldEdlbT4wKXtcclxuICAgICAgICAgICAgbGV0IHJkPW5ldyBSZXdhcmREYXRhKCk7XHJcbiAgICAgICAgICAgIHJkLnJld2FyZF9pZD1Qcm9wSWQuR2VtO1xyXG4gICAgICAgICAgICByZC5yZXdhcmRfbnVtPWpzb25EYXRhLkdldEdlbTtcclxuICAgICAgICAgICAgcmV3YXJkRGF0YXMucHVzaChyZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaT0xOyBpPD0zOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaWQ9J0l0ZW0nK2krJ19JRCc7XHJcbiAgICAgICAgICAgIGlmKGpzb25EYXRhW2lkXT4wKXtcclxuICAgICAgICAgICAgICAgIGxldCByZD1uZXcgUmV3YXJkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgcmQucmV3YXJkX2lkPWpzb25EYXRhW2lkXTtcclxuICAgICAgICAgICAgICAgIHJkLnJld2FyZF9udW09anNvbkRhdGFbJ0l0ZW0nK2krJ19OdW0nXTtcclxuICAgICAgICAgICAgICAgIHJld2FyZERhdGFzLnB1c2gocmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXdhcmREYXRhcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRJZCh0b3RhbDpudW1iZXIpOm51bWJlcntcclxuICAgICAgICBsZXQgaWQ9MDtcclxuICAgICAgICBsZXQgaXNGaW5kPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2LGspPT57XHJcbiAgICAgICAgICAgIGlmKCFpc0ZpbmQgJiYgdG90YWw8di5DdW11bGF0aXZlUmVjaGFyZ2VQcmljZSl7XHJcbiAgICAgICAgICAgICAgICBpZD12LkN1bXVsYXRpdmVSZWNoYXJnZUlEO1xyXG4gICAgICAgICAgICAgICAgaXNGaW5kPXRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldERhdGEoKTpNYXA8bnVtYmVyLEpzb25DdW11bGF0aXZlUmVjaGFyZ2U+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICB9XHJcbn1cclxuIl19