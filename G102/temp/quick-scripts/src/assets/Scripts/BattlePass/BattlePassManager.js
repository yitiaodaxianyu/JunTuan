"use strict";
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