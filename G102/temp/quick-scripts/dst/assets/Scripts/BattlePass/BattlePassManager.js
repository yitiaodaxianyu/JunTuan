
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Scripts/BattlePass/BattlePassManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44476CLwhdNUIE6F3UMoVKw', 'BattlePassManager');
// Scripts/BattlePass/BattlePassManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattlePassManager = exports.BattlePassClaimType = exports.BattlePassTask = void 0;
var PayManager_1 = require("../Payment/PayManager");
var BattlePassData_1 = require("./BattlePassData");
/**战令任务类型 */
var BattlePassTask;
(function (BattlePassTask) {
    /**完成一次无尽挑战 */
    BattlePassTask[BattlePassTask["Endless"] = 0] = "Endless";
    /**完成一次boss挑战 */
    BattlePassTask[BattlePassTask["Boss"] = 1] = "Boss";
    /**解锁一次新主线关卡 */
    BattlePassTask[BattlePassTask["UnlockMission"] = 2] = "UnlockMission";
    /**完成3次爬塔 */
    BattlePassTask[BattlePassTask["Tower3"] = 3] = "Tower3";
    BattlePassTask[BattlePassTask["Num"] = 4] = "Num";
})(BattlePassTask = exports.BattlePassTask || (exports.BattlePassTask = {}));
/**战令领取类型 */
var BattlePassClaimType;
(function (BattlePassClaimType) {
    /**免费的领取 */
    BattlePassClaimType[BattlePassClaimType["Free"] = 0] = "Free";
    /**购买后的领取 */
    BattlePassClaimType[BattlePassClaimType["Buy"] = 1] = "Buy";
})(BattlePassClaimType = exports.BattlePassClaimType || (exports.BattlePassClaimType = {}));
var google_id = 'b501';
var BattlePassManager = /** @class */ (function () {
    function BattlePassManager() {
    }
    BattlePassManager.getInstance = function () {
        if (this._instance == null) {
            this._instance = new BattlePassManager();
            console.log("BattlePassManager null");
            this._instance.init();
        }
        return this._instance;
    };
    //初始化游戏数据
    BattlePassManager.prototype.init = function () {
        BattlePassData_1.BattlePassDataManager.getInstance();
    };
    /**
     *
     * @returns 返回战令最高等级
     */
    BattlePassManager.getMaxLevel = function () {
        return 30;
    };
    /**
     *
     * @returns 返回当前赛季使用的战令系列
     */
    BattlePassManager.getUseBattlePassSeries = function () {
        return 1;
    };
    // static resetAllTodayTaskProgress(){
    //     for(let i=BattlePassTask.Endless;i<BattlePassTask.Num; i++){
    //         this.saveTodayTaskProgress(i,0);
    //     }
    //     this.saveTodayAddExp(0);
    // }
    BattlePassManager.getTodayTaskProgress = function (type) {
        var num = cc.sys.localStorage.getItem('battle_pass_task_' + type);
        if (num != "" && num != null) {
            num = parseInt(num);
        }
        else {
            num = 0;
        }
        return num;
    };
    // static addTodayTaskProgress(type:BattlePassTask){
    //     let newNum=this.getTodayTaskProgress(type)+1;
    //     this.saveTodayTaskProgress(type,newNum);
    // }
    // static saveTodayTaskProgress(type:BattlePassTask,num:number){
    //     cc.sys.localStorage.setItem('battle_pass_task_'+type,num);
    //     switch(type){
    //         case BattlePassTask.Endless:{
    //             if(num!=0)
    //             this.addTodayAddExp(1);
    //         }break;
    //         case BattlePassTask.Boss:{
    //             if(num!=0)
    //             this.addTodayAddExp(1);
    //         }break;
    //         case BattlePassTask.UnlockMission:{
    //             if(num!=0)
    //             this.addTodayAddExp(1);
    //         }break;
    //         case BattlePassTask.Tower3:{
    //             if(num!=0&&num%3==0){
    //                 this.addTodayAddExp(1);
    //             }
    //         }break;
    //     }
    // }
    /**
     * 获取当前战令的经验值
     * @returns 返回当前战令的经验值
     */
    BattlePassManager.getCurExp = function () {
        var num = cc.sys.localStorage.getItem("Task_Accumulated_Points_Battle");
        if (num != "" && num != null) {
            num = parseInt(num);
        }
        else {
            num = 0;
        }
        return num;
    };
    BattlePassManager.getCurLevel = function () {
        var exp = this.getCurExp();
        var data = BattlePassData_1.BattlePassDataManager.getInstance().getData();
        var level = 0;
        data.forEach(function (v, k) {
            if (exp >= v.RequiredExp) {
                level = v.BattlePassLevel;
            }
        });
        return level;
    };
    // static addCurExp(num:number){
    //     let newNum=this.getCurExp()+num;
    //     this.saveCurExp(newNum);
    // }
    /**
     * 设置当前战令的经验值
     * @param num 设置数量
     */
    // static saveCurExp(num:number){
    //     cc.sys.localStorage.setItem("Task_Accumulated_Points_day",Number(cc.sys.localStorage.getItem("Task_Accumulated_Points_day")) + num);
    //     let level=Math.floor(num/10);        
    //     if(FollowManager.getInstance().getFirstDo(Follow_Type.每级战令解锁人数_x级+level)<=0){
    //         FollowManager.getInstance().addFirstDo(Follow_Type.每级战令解锁人数_x级+level);
    //         FollowManager.getInstance().followEvent(Follow_Type.每级战令解锁人数_x级+level);
    //     }
    // }
    // static getTodayAddExp(){
    //     let num=cc.sys.localStorage.getItem('battle_pass_add_exp');
    //     if(num!=""&&num!=null)
    //     {
    //         num=parseInt(num);
    //     }else
    //     {
    //         num=0;
    //     }
    //     return num;
    // }
    // static addTodayAddExp(num:number):boolean{
    //     let newNum=this.getTodayAddExp()+num;
    //     if(newNum<=8){
    //         this.saveTodayAddExp(newNum);
    //         this.addCurExp(1);
    //         return true;
    //     }
    //     return false;
    // }
    // static saveTodayAddExp(num:number){
    //     cc.sys.localStorage.setItem('battle_pass_add_exp',num);
    // }
    /**
     * @param type 战令任务类型类型
     * @param id 对应的战令id，由赛季id和战令等级决定
     * @returns 返回对应的领取状态
     */
    BattlePassManager.getClaimState = function (type, id) {
        var num = cc.sys.localStorage.getItem('battle_pass_claim_state_' + type + "_" + id);
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
     * @param type 战令任务类型类型
     * @param id 对应的战令id，由赛季id和战令等级决定
     * @param num 领取状态,大于0表示已领取，其他表示未领取
     */
    BattlePassManager.saveClaimState = function (type, id, num) {
        cc.sys.localStorage.setItem('battle_pass_claim_state_' + type + "_" + id, num);
    };
    BattlePassManager.refreshBuyState = function () {
        this.is_buy = PayManager_1.PayManager.getInstance().getPayNum(google_id) > 0;
    };
    /**
     * 重置战令数据
     */
    BattlePassManager.resetBattlePass = function () {
        //购买
        PayManager_1.PayManager.getInstance().savePayNum(google_id, 0);
        //经验
        // this.saveCurExp(0);
        //领取状态
        for (var i = 1; i <= this.getMaxLevel(); i++) {
            var id = BattlePassData_1.BattlePassDataManager.getId(this.getUseBattlePassSeries(), i);
            this.saveClaimState(BattlePassClaimType.Free, id, 0);
            this.saveClaimState(BattlePassClaimType.Buy, id, 0);
        }
        cc.sys.localStorage.setItem("Task_Accumulated_Points_Battle", '');
    };
    BattlePassManager._instance = null;
    BattlePassManager.is_buy = false;
    return BattlePassManager;
}());
exports.BattlePassManager = BattlePassManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0c1xcQmF0dGxlUGFzc1xcQmF0dGxlUGFzc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esb0RBQW1EO0FBRW5ELG1EQUF5RDtBQUV6RCxZQUFZO0FBQ1osSUFBWSxjQVdYO0FBWEQsV0FBWSxjQUFjO0lBQ3RCLGNBQWM7SUFDZCx5REFBUyxDQUFBO0lBQ1QsZ0JBQWdCO0lBQ2hCLG1EQUFJLENBQUE7SUFDSixlQUFlO0lBQ2YscUVBQWEsQ0FBQTtJQUNiLFlBQVk7SUFDWix1REFBTSxDQUFBO0lBRU4saURBQUcsQ0FBQTtBQUNQLENBQUMsRUFYVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQVd6QjtBQUNELFlBQVk7QUFDWixJQUFZLG1CQUtYO0FBTEQsV0FBWSxtQkFBbUI7SUFDM0IsV0FBVztJQUNYLDZEQUFNLENBQUE7SUFDTixZQUFZO0lBQ1osMkRBQUcsQ0FBQTtBQUNQLENBQUMsRUFMVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQUs5QjtBQUVELElBQU0sU0FBUyxHQUFVLE1BQU0sQ0FBQztBQUVoQztJQUFBO0lBdU1BLENBQUM7SUFsTWlCLDZCQUFXLEdBQXpCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFFLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsU0FBUztJQUNELGdDQUFJLEdBQVo7UUFDSSxzQ0FBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksNkJBQVcsR0FBbEI7UUFDSSxP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LEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFyTWEsMkJBQVMsR0FBc0IsSUFBSSxDQUFDO0lBQ3JDLHdCQUFNLEdBQVMsS0FBSyxDQUFDO0lBcU12Qyx3QkFBQztDQXZNRCxBQXVNQyxJQUFBO0FBdk1ZLDhDQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi4vR2FtZURhdGFcIjtcclxuaW1wb3J0IHsgRm9sbG93X1R5cGUgfSBmcm9tIFwiLi4vbXVsdGlMYW5ndWFnZS9Gb2xsb3dDb25zdGFudHNcIjtcclxuaW1wb3J0IEZvbGxvd01hbmFnZXIgZnJvbSBcIi4uL211bHRpTGFuZ3VhZ2UvRm9sbG93TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXlNYW5hZ2VyIH0gZnJvbSBcIi4uL1BheW1lbnQvUGF5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBQYXlJZCB9IGZyb20gXCIuLi90aGlyZFBhcnR5L1RoaXJkUGFydHlcIjtcclxuaW1wb3J0IHsgQmF0dGxlUGFzc0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4vQmF0dGxlUGFzc0RhdGFcIjtcclxuXHJcbi8qKuaImOS7pOS7u+WKoeexu+WeiyAqL1xyXG5leHBvcnQgZW51bSBCYXR0bGVQYXNzVGFza3tcclxuICAgIC8qKuWujOaIkOS4gOasoeaXoOWwveaMkeaImCAqL1xyXG4gICAgRW5kbGVzcz0wLFxyXG4gICAgLyoq5a6M5oiQ5LiA5qyhYm9zc+aMkeaImCAqL1xyXG4gICAgQm9zcyxcclxuICAgIC8qKuino+mUgeS4gOasoeaWsOS4u+e6v+WFs+WNoSAqL1xyXG4gICAgVW5sb2NrTWlzc2lvbixcclxuICAgIC8qKuWujOaIkDPmrKHniKzloZQgKi9cclxuICAgIFRvd2VyMyxcclxuXHJcbiAgICBOdW0sXHJcbn1cclxuLyoq5oiY5Luk6aKG5Y+W57G75Z6LICovXHJcbmV4cG9ydCBlbnVtIEJhdHRsZVBhc3NDbGFpbVR5cGV7XHJcbiAgICAvKirlhY3otLnnmoTpooblj5YgKi9cclxuICAgIEZyZWU9MCxcclxuICAgIC8qKui0reS5sOWQjueahOmihuWPliAqL1xyXG4gICAgQnV5LFxyXG59XHJcblxyXG5jb25zdCBnb29nbGVfaWQ6c3RyaW5nID0gJ2I1MDEnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhdHRsZVBhc3NNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQmF0dGxlUGFzc01hbmFnZXIgPSBudWxsO1xyXG4gICAgcHVibGljIHN0YXRpYyBpc19idXk6Ym9vbGVhbj1mYWxzZTtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOkJhdHRsZVBhc3NNYW5hZ2VyIHtcclxuICAgICAgICBpZih0aGlzLl9pbnN0YW5jZT09bnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZT1uZXcgQmF0dGxlUGFzc01hbmFnZXIoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYXR0bGVQYXNzTWFuYWdlciBudWxsXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+aVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0ICgpIHsgICAgICAgIFxyXG4gICAgICAgIEJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuaImOS7pOacgOmrmOetiee6p1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0TWF4TGV2ZWwoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuW9k+WJjei1m+Wto+S9v+eUqOeahOaImOS7pOezu+WIl1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0VXNlQmF0dGxlUGFzc1NlcmllcygpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgcmVzZXRBbGxUb2RheVRhc2tQcm9ncmVzcygpe1xyXG4gICAgLy8gICAgIGZvcihsZXQgaT1CYXR0bGVQYXNzVGFzay5FbmRsZXNzO2k8QmF0dGxlUGFzc1Rhc2suTnVtOyBpKyspe1xyXG4gICAgLy8gICAgICAgICB0aGlzLnNhdmVUb2RheVRhc2tQcm9ncmVzcyhpLDApO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICB0aGlzLnNhdmVUb2RheUFkZEV4cCgwKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0VG9kYXlUYXNrUHJvZ3Jlc3ModHlwZTpCYXR0bGVQYXNzVGFzayl7XHJcbiAgICAgICAgbGV0IG51bT1jYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JhdHRsZV9wYXNzX3Rhc2tfJyt0eXBlKTtcclxuICAgICAgICBpZihudW0hPVwiXCImJm51bSE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgYWRkVG9kYXlUYXNrUHJvZ3Jlc3ModHlwZTpCYXR0bGVQYXNzVGFzayl7XHJcbiAgICAvLyAgICAgbGV0IG5ld051bT10aGlzLmdldFRvZGF5VGFza1Byb2dyZXNzKHR5cGUpKzE7XHJcbiAgICAvLyAgICAgdGhpcy5zYXZlVG9kYXlUYXNrUHJvZ3Jlc3ModHlwZSxuZXdOdW0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBzYXZlVG9kYXlUYXNrUHJvZ3Jlc3ModHlwZTpCYXR0bGVQYXNzVGFzayxudW06bnVtYmVyKXtcclxuICAgIC8vICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2JhdHRsZV9wYXNzX3Rhc2tfJyt0eXBlLG51bSk7XHJcbiAgICAvLyAgICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgLy8gICAgICAgICBjYXNlIEJhdHRsZVBhc3NUYXNrLkVuZGxlc3M6e1xyXG4gICAgLy8gICAgICAgICAgICAgaWYobnVtIT0wKVxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5hZGRUb2RheUFkZEV4cCgxKTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIEJhdHRsZVBhc3NUYXNrLkJvc3M6e1xyXG4gICAgLy8gICAgICAgICAgICAgaWYobnVtIT0wKVxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5hZGRUb2RheUFkZEV4cCgxKTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIEJhdHRsZVBhc3NUYXNrLlVubG9ja01pc3Npb246e1xyXG4gICAgLy8gICAgICAgICAgICAgaWYobnVtIT0wKVxyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5hZGRUb2RheUFkZEV4cCgxKTtcclxuICAgIC8vICAgICAgICAgfWJyZWFrO1xyXG4gICAgLy8gICAgICAgICBjYXNlIEJhdHRsZVBhc3NUYXNrLlRvd2VyMzp7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihudW0hPTAmJm51bSUzPT0wKXtcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLmFkZFRvZGF5QWRkRXhwKDEpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICB9YnJlYWs7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5oiY5Luk55qE57uP6aqM5YC8XHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lvZPliY3miJjku6TnmoTnu4/pqozlgLxcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldEN1ckV4cCgpOm51bWJlcntcclxuICAgICAgICBsZXQgbnVtPWNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRhc2tfQWNjdW11bGF0ZWRfUG9pbnRzX0JhdHRsZVwiKTtcclxuICAgICAgICBpZihudW0hPVwiXCImJm51bSE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG51bT1wYXJzZUludChudW0pO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBudW09MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0Q3VyTGV2ZWwoKTpudW1iZXJ7XHJcbiAgICAgICAgbGV0IGV4cD10aGlzLmdldEN1ckV4cCgpO1xyXG4gICAgICAgIGxldCBkYXRhPUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldERhdGEoKTtcclxuICAgICAgICBsZXQgbGV2ZWw9MDtcclxuICAgICAgICBkYXRhLmZvckVhY2goKHYsayk9PntcclxuICAgICAgICAgICAgaWYoZXhwPj12LlJlcXVpcmVkRXhwKXtcclxuICAgICAgICAgICAgICAgIGxldmVsPXYuQmF0dGxlUGFzc0xldmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbGV2ZWxcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgYWRkQ3VyRXhwKG51bTpudW1iZXIpe1xyXG4gICAgLy8gICAgIGxldCBuZXdOdW09dGhpcy5nZXRDdXJFeHAoKStudW07XHJcbiAgICAvLyAgICAgdGhpcy5zYXZlQ3VyRXhwKG5ld051bSk7XHJcbiAgICAvLyB9XHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruW9k+WJjeaImOS7pOeahOe7j+mqjOWAvFxyXG4gICAgICogQHBhcmFtIG51bSDorr7nva7mlbDph49cclxuICAgICAqL1xyXG4gICAgLy8gc3RhdGljIHNhdmVDdXJFeHAobnVtOm51bWJlcil7XHJcbiAgICAvLyAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiVGFza19BY2N1bXVsYXRlZF9Qb2ludHNfZGF5XCIsTnVtYmVyKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlRhc2tfQWNjdW11bGF0ZWRfUG9pbnRzX2RheVwiKSkgKyBudW0pO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGxldCBsZXZlbD1NYXRoLmZsb29yKG51bS8xMCk7ICAgICAgICBcclxuICAgIC8vICAgICBpZihGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Rmlyc3REbyhGb2xsb3dfVHlwZS7mr4/nuqfmiJjku6Top6PplIHkurrmlbBfeOe6pytsZXZlbCk8PTApe1xyXG4gICAgLy8gICAgICAgICBGb2xsb3dNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkRmlyc3REbyhGb2xsb3dfVHlwZS7mr4/nuqfmiJjku6Top6PplIHkurrmlbBfeOe6pytsZXZlbCk7XHJcbiAgICAvLyAgICAgICAgIEZvbGxvd01hbmFnZXIuZ2V0SW5zdGFuY2UoKS5mb2xsb3dFdmVudChGb2xsb3dfVHlwZS7mr4/nuqfmiJjku6Top6PplIHkurrmlbBfeOe6pytsZXZlbCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBnZXRUb2RheUFkZEV4cCgpe1xyXG4gICAgLy8gICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYXR0bGVfcGFzc19hZGRfZXhwJyk7XHJcbiAgICAvLyAgICAgaWYobnVtIT1cIlwiJiZudW0hPW51bGwpXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBudW09cGFyc2VJbnQobnVtKTtcclxuICAgIC8vICAgICB9ZWxzZVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgbnVtPTA7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHJldHVybiBudW07XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGFkZFRvZGF5QWRkRXhwKG51bTpudW1iZXIpOmJvb2xlYW57XHJcbiAgICAvLyAgICAgbGV0IG5ld051bT10aGlzLmdldFRvZGF5QWRkRXhwKCkrbnVtO1xyXG4gICAgLy8gICAgIGlmKG5ld051bTw9OCl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuc2F2ZVRvZGF5QWRkRXhwKG5ld051bSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuYWRkQ3VyRXhwKDEpO1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBzYXZlVG9kYXlBZGRFeHAobnVtOm51bWJlcil7XHJcbiAgICAvLyAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYXR0bGVfcGFzc19hZGRfZXhwJyxudW0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHR5cGUg5oiY5Luk5Lu75Yqh57G75Z6L57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gaWQg5a+55bqU55qE5oiY5LukaWTvvIznlLHotZvlraNpZOWSjOaImOS7pOetiee6p+WGs+WumlxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5a+55bqU55qE6aKG5Y+W54q25oCBXHJcbiAgICAgKi9cclxuICAgICBwdWJsaWMgc3RhdGljIGdldENsYWltU3RhdGUodHlwZTpCYXR0bGVQYXNzQ2xhaW1UeXBlLGlkOm51bWJlcik6bnVtYmVyXHJcbiAgICAgeyAgICAgICAgXHJcbiAgICAgICAgIGxldCBudW09Y2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdiYXR0bGVfcGFzc19jbGFpbV9zdGF0ZV8nK3R5cGUrXCJfXCIraWQpO1xyXG4gICAgICAgICBpZihudW0hPVwiXCImJm51bSE9bnVsbClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgbnVtPXBhcnNlSW50KG51bSk7XHJcbiAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIG51bT0wO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIOaImOS7pOS7u+WKoeexu+Wei+exu+Wei1xyXG4gICAgICogQHBhcmFtIGlkIOWvueW6lOeahOaImOS7pGlk77yM55Sx6LWb5a2jaWTlkozmiJjku6TnrYnnuqflhrPlrppcclxuICAgICAqIEBwYXJhbSBudW0g6aKG5Y+W54q25oCBLOWkp+S6jjDooajnpLrlt7Lpooblj5bvvIzlhbbku5booajnpLrmnKrpooblj5ZcclxuICAgICAqL1xyXG4gICAgIHB1YmxpYyBzdGF0aWMgc2F2ZUNsYWltU3RhdGUodHlwZTpCYXR0bGVQYXNzQ2xhaW1UeXBlLGlkOm51bWJlcixudW06bnVtYmVyKVxyXG4gICAgIHtcclxuICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdiYXR0bGVfcGFzc19jbGFpbV9zdGF0ZV8nK3R5cGUrXCJfXCIraWQsbnVtKTtcclxuICAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWZyZXNoQnV5U3RhdGUoKXtcclxuICAgICAgICB0aGlzLmlzX2J1eT1QYXlNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0UGF5TnVtKGdvb2dsZV9pZCk+MDtcclxuICAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgICog6YeN572u5oiY5Luk5pWw5o2uXHJcbiAgICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlc2V0QmF0dGxlUGFzcygpe1xyXG4gICAgICAgIC8v6LSt5LmwXHJcbiAgICAgICAgUGF5TWFuYWdlci5nZXRJbnN0YW5jZSgpLnNhdmVQYXlOdW0oZ29vZ2xlX2lkLDApO1xyXG4gICAgICAgIC8v57uP6aqMXHJcbiAgICAgICAgLy8gdGhpcy5zYXZlQ3VyRXhwKDApO1xyXG4gICAgICAgIC8v6aKG5Y+W54q25oCBXHJcbiAgICAgICAgZm9yKGxldCBpPTE7IGk8PXRoaXMuZ2V0TWF4TGV2ZWwoKTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGlkPUJhdHRsZVBhc3NEYXRhTWFuYWdlci5nZXRJZCh0aGlzLmdldFVzZUJhdHRsZVBhc3NTZXJpZXMoKSxpKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlQ2xhaW1TdGF0ZShCYXR0bGVQYXNzQ2xhaW1UeXBlLkZyZWUsaWQsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNsYWltU3RhdGUoQmF0dGxlUGFzc0NsYWltVHlwZS5CdXksaWQsMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlRhc2tfQWNjdW11bGF0ZWRfUG9pbnRzX0JhdHRsZVwiLCcnKTtcclxuICAgICB9XHJcbn0iXX0=