import GameData from "../GameData";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { PayManager } from "../Payment/PayManager";
import { PayId } from "../thirdParty/ThirdParty";
import { BattlePassDataManager } from "./BattlePassData";

/**战令任务类型 */
export enum BattlePassTask{
    /**完成一次无尽挑战 */
    Endless=0,
    /**完成一次boss挑战 */
    Boss,
    /**解锁一次新主线关卡 */
    UnlockMission,
    /**完成3次爬塔 */
    Tower3,

    Num,
}
/**战令领取类型 */
export enum BattlePassClaimType{
    /**免费的领取 */
    Free=0,
    /**购买后的领取 */
    Buy,
}

const google_id:string = 'b501';

export class BattlePassManager {
    private static _instance: BattlePassManager = null;
    public static is_buy:boolean=false;


    public static getInstance():BattlePassManager {
        if(this._instance==null) {
            this._instance=new BattlePassManager();
            console.log("BattlePassManager null");
            this._instance.init();
        }
        return this._instance;
    }

    //初始化游戏数据
    private init () {        
        BattlePassDataManager.getInstance();
    }
    /**
     * 
     * @returns 返回战令最高等级
     */
    static getMaxLevel():number{
        return 30;
    }
    /**
     * 
     * @returns 返回当前赛季使用的战令系列
     */
    static getUseBattlePassSeries():number{
        return 1;
    }

    // static resetAllTodayTaskProgress(){
    //     for(let i=BattlePassTask.Endless;i<BattlePassTask.Num; i++){
    //         this.saveTodayTaskProgress(i,0);
    //     }
    //     this.saveTodayAddExp(0);
    // }

    static getTodayTaskProgress(type:BattlePassTask){
        let num=cc.sys.localStorage.getItem('battle_pass_task_'+type);
        if(num!=""&&num!=null)
        {
            num=parseInt(num);
        }else
        {
            num=0;
        }
        return num;
    }

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
    static getCurExp():number{
        let num=cc.sys.localStorage.getItem("Task_Accumulated_Points_Battle");
        if(num!=""&&num!=null)
        {
            num=parseInt(num);
        }else
        {
            num=0;
        }
        return num;
    }

    static getCurLevel():number{
        let exp=this.getCurExp();
        let data=BattlePassDataManager.getInstance().getData();
        let level=0;
        data.forEach((v,k)=>{
            if(exp>=v.RequiredExp){
                level=v.BattlePassLevel;
            }
        })
        return level
    }

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
     public static getClaimState(type:BattlePassClaimType,id:number):number
     {        
         let num=cc.sys.localStorage.getItem('battle_pass_claim_state_'+type+"_"+id);
         if(num!=""&&num!=null)
         {
             num=parseInt(num);
         }else
         {
             num=0;
         }
         return num;
     }
    /**
     * 
     * @param type 战令任务类型类型
     * @param id 对应的战令id，由赛季id和战令等级决定
     * @param num 领取状态,大于0表示已领取，其他表示未领取
     */
     public static saveClaimState(type:BattlePassClaimType,id:number,num:number)
     {
         cc.sys.localStorage.setItem('battle_pass_claim_state_'+type+"_"+id,num);
     }

    public static refreshBuyState(){
        this.is_buy=PayManager.getInstance().getPayNum(google_id)>0;
     }
     /**
      * 重置战令数据
      */
    public static resetBattlePass(){
        //购买
        PayManager.getInstance().savePayNum(google_id,0);
        //经验
        // this.saveCurExp(0);
        //领取状态
        for(let i=1; i<=this.getMaxLevel(); i++){
            let id=BattlePassDataManager.getId(this.getUseBattlePassSeries(),i);
            this.saveClaimState(BattlePassClaimType.Free,id,0);
            this.saveClaimState(BattlePassClaimType.Buy,id,0);
        }
        cc.sys.localStorage.setItem("Task_Accumulated_Points_Battle",'');
     }
}