
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/BattlePass/BattlePassData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQmF0dGxlUGFzc1xcQmF0dGxlUGFzc0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBRXJEO0lBQUE7UUFDSSxVQUFVO1FBQ0gsb0JBQWUsR0FBVSxDQUFDLENBQUU7UUFDbkMsY0FBYztRQUNQLGdCQUFXLEdBQVUsQ0FBQyxDQUFFO1FBQy9CLGNBQWM7UUFDUCxtQkFBYyxHQUFVLENBQUMsQ0FBRTtRQUNsQyxZQUFZO1FBQ0wsa0JBQWEsR0FBVSxDQUFDLENBQUU7UUFDakMsWUFBWTtRQUNMLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO1FBQ25DLGNBQWM7UUFDUCxxQkFBZ0IsR0FBVSxDQUFDLENBQUU7UUFDcEMsWUFBWTtRQUNMLG9CQUFlLEdBQVUsQ0FBQyxDQUFFO0lBQ3ZDLENBQUM7SUFBRCx5QkFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksZ0RBQWtCO0FBaUIvQjtJQUFBO1FBRUksaUJBQWlCO1FBQ1QsU0FBSSxHQUFnQyxJQUFJLENBQUM7UUFDekMsc0JBQWlCLEdBQVMsS0FBSyxDQUFDO1FBd0V4Qyx5QkFBeUI7UUFFekIsMERBQTBEO1FBQzFELCtCQUErQjtRQUMvQixJQUFJO1FBQ0osOERBQThEO1FBQzlELGlHQUFpRztRQUNqRyxrQ0FBa0M7UUFDbEMsMENBQTBDO1FBQzFDLHFCQUFxQjtRQUNyQixZQUFZO1FBQ1osU0FBUztRQUNULGdCQUFnQjtRQUNoQixJQUFJO1FBQ0osbURBQW1EO1FBQ25ELHdCQUF3QjtRQUN4QixJQUFJO0lBQ1IsQ0FBQztJQXZGaUIsaUNBQVcsR0FBekI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsSUFBSSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7UUFDRCxPQUFPLElB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ZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9hZE1hbmFnZXIgfSBmcm9tIFwiLi4vTG9hZGluZy9Mb2FkTWFuYWdlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25CYXR0bGVQYXNzRGF0YSB7XHJcbiAgICAvKirmiJjku6TnrYnnuqcgKi9cclxuICAgIHB1YmxpYyBCYXR0bGVQYXNzTGV2ZWw6bnVtYmVyID0gMCA7XHJcbiAgICAvKirkuIvkuIDnuqfmiYDpnIDnu4/pqozlgLwgKi9cclxuICAgIHB1YmxpYyBSZXF1aXJlZEV4cDpudW1iZXIgPSAwIDtcclxuICAgIC8qKuWFjei0ueWlluWKsemBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgRnJlZVJld2FyZEl0ZW06bnVtYmVyID0gMCA7XHJcbiAgICAvKirlhY3otLnlpZblirHmlbDph48gKi9cclxuICAgIHB1YmxpYyBGcmVlUmV3YXJkTnVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6auY57qn6ZK755+z5aWW5YqxICovXHJcbiAgICBwdWJsaWMgU2VuaW9yUmV3YXJkR2VtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6auY57qn5aWW5Yqx6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBTZW5pb3JSZXdhcmRJdGVtOm51bWJlciA9IDAgO1xyXG4gICAgLyoq6auY57qn5aWW5Yqx5pWw6YePICovXHJcbiAgICBwdWJsaWMgU2VuaW9yUmV3YXJkTnVtOm51bWJlciA9IDAgO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmF0dGxlUGFzc0RhdGFNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQmF0dGxlUGFzc0RhdGFNYW5hZ2VyID0gbnVsbDtcclxuICAgIC8v5oqKanNvbuaVsOaNrui9rOWMluaIkG1hcOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkYXRhOk1hcDxudW1iZXIsSnNvbkJhdHRsZVBhc3NEYXRhPj1udWxsO1xyXG4gICAgcHJpdmF0ZSBpc19sb2FkX2NvbXBsZXRlZDpib29sZWFuPWZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTpCYXR0bGVQYXNzRGF0YU1hbmFnZXIge1xyXG4gICAgICAgIGlmKHRoaXMuX2luc3RhbmNlPT1udWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlPW5ldyBCYXR0bGVQYXNzRGF0YU1hbmFnZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkSnNvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5Yqg6L29anNvblxyXG4gICAgcHJpdmF0ZSBsb2FkSnNvbigpIHtcclxuICAgICAgICBMb2FkTWFuYWdlci5sb2FkSnNvbignQmF0dGxlUGFzc0RhdGEnLExvYWRNYW5hZ2VyLmxvYWRfbW9kZSwoZXJyb3I6IEVycm9yLCBhc3NldHM6Y2MuSnNvbkFzc2V0KT0+IHtcclxuICAgICAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb1Kc29uQmF0dGxlUGFzc0RhdGHmiJDlip8nKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhPW5ldyBNYXAoKTtcclxuICAgICAgICAgICAgbGV0IGpzb249YXNzZXRzLmpzb247XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGpzb24ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGpzb25EYXRhPW5ldyBKc29uQmF0dGxlUGFzc0RhdGEoKTtcclxuICAgICAgICAgICAgICAgIGpzb25EYXRhPWpzb25baV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KGpzb25EYXRhLkJhdHRsZVBhc3NMZXZlbCxqc29uRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc19sb2FkX2NvbXBsZXRlZD10cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWKoOi9veaYr+WQpuWujOaIkCAqL1xyXG4gICAgcHVibGljIGdldElzTG9hZENvbXBsZXRlZCgpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX2xvYWRfY29tcGxldGVkO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2uaWTlj7fojrflj5ZKc29u55qE5ZCE56eN5pWw5o2uICovXHJcbiAgICBwdWJsaWMgZ2V0SnNvbkJhdHRsZVBhc3NEYXRhKGlkOm51bWJlcik6SnNvbkJhdHRsZVBhc3NEYXRhIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCk7XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjku6TnrYnnuqfojrflj5bkuIvkuIDnuqfmiYDpnIDnu4/pqozlgLwgKi9cclxuICAgIHB1YmxpYyBnZXRSZXF1aXJlZEV4cChpZDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGlkKS5SZXF1aXJlZEV4cDtcclxuICAgIH1cclxuICAgIC8qKuagueaNruaImOS7pOetiee6p+iOt+WPluWFjei0ueWlluWKsemBk+WFt0lEICovXHJcbiAgICBwdWJsaWMgZ2V0RnJlZVJld2FyZEl0ZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuRnJlZVJld2FyZEl0ZW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjku6TnrYnnuqfojrflj5blhY3otLnlpZblirHmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRGcmVlUmV3YXJkTnVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLkZyZWVSZXdhcmROdW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjku6TnrYnnuqfojrflj5bpq5jnuqfpkrvnn7PlpZblirEgKi9cclxuICAgIHB1YmxpYyBnZXRTZW5pb3JSZXdhcmRHZW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2VuaW9yUmV3YXJkR2VtO1xyXG4gICAgfVxyXG4gICAgLyoq5qC55o2u5oiY5Luk562J57qn6I635Y+W6auY57qn5aWW5Yqx6YGT5YW3SUQgKi9cclxuICAgIHB1YmxpYyBnZXRTZW5pb3JSZXdhcmRJdGVtKGlkOm51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXQoaWQpLlNlbmlvclJld2FyZEl0ZW07XHJcbiAgICB9XHJcbiAgICAvKirmoLnmja7miJjku6TnrYnnuqfojrflj5bpq5jnuqflpZblirHmlbDph48gKi9cclxuICAgIHB1YmxpYyBnZXRTZW5pb3JSZXdhcmROdW0oaWQ6bnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChpZCkuU2VuaW9yUmV3YXJkTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDpnZnmgIHmlrnms5XvvIzojrflj5bmnIDlpKfnmoQg5oiY5Luk562J57qnKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWF4QmF0dGxlUGFzc0xldmVsKCk6bnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMTU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ku6XkuIrmoLzlvI/nu5/kuIDvvIzku6XkuIvlhpnmr4/kuKpqc29u5pWw5o2u55qE54m55q6K6ZyA5rGCXHJcblxyXG4gICAgLy8gcHVibGljIHN0YXRpYyBnZXRJZChzZXJpZXM6bnVtYmVyLGxldmVsOm51bWJlcik6bnVtYmVye1xyXG4gICAgLy8gICAgIHJldHVybiBzZXJpZXMqMTAwK2xldmVsO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gcHVibGljIGdldEpzb25EYXRhQnlMZXZlbChsZXZlbDpudW1iZXIpOkpzb25CYXR0bGVQYXNzRGF0YXtcclxuICAgIC8vICAgICBsZXQgZCA6SnNvbkJhdHRsZVBhc3NEYXRhID0gdGhpcy5kYXRhLmdldChCYXR0bGVQYXNzRGF0YU1hbmFnZXIuZ2V0TWF4QmF0dGxlUGFzc1Jld2FyZCgpKTtcclxuICAgIC8vICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodixrKSA9PntcclxuICAgIC8vICAgICAgICAgaWYodi5CYXR0bGVQYXNzTGV2ZWwgPT0gbGV2ZWwpe1xyXG4gICAgLy8gICAgICAgICAgICAgZCA9IHY7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gICAgIHJldHVybiBkO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gcHVibGljIGdldERhdGEoKTpNYXA8bnVtYmVyLEpzb25CYXR0bGVQYXNzRGF0YT57XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIC8vIH1cclxufVxyXG4iXX0=