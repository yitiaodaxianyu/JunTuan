
import { FuncType, GameMode } from "../Constants";
import { FunctionDefinitionManager } from "../JsonData/FunctionDefinition";
import { DingYueManager } from "../Payment/DingYueManager";
import { PropId } from "../Prop/PropConfig";
import { PropManager } from "../Prop/PropManager";
import { AssetsEventType, EventManager } from "../Tools/EventManager";

export enum ActivityType{
    Endless = 1,
    Boss = 2,
    Tower = 3,
    Maze = 4,
    num,
}

export class ActivityManager {

    private static _instance: ActivityManager = null;

    
    
    public static getInstance():ActivityManager {
        if(this._instance==null) {
            this._instance=new ActivityManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init () {

    }
    
    changeTicket(type:ActivityType,num:number):boolean
    {
        let newNum=this.getTicket(type)+num;
        if(newNum>=0){
            this.saveTicket(type,newNum);
            return true;
        }
        return false;
    }

    saveTicket(type:ActivityType,num:number)
    {
        // cc.sys.localStorage.setItem('activity_ticket'+type,num); 
        if(type == ActivityType.Boss){
            PropManager.getInstance().setPropNum(PropId.BossTicket,num);
        }else if(type == ActivityType.Endless){
            PropManager.getInstance().setPropNum(PropId.EndlessChallenge,num);
        }
        EventManager.postAssetsEvent(AssetsEventType.TICKET);
    }

    getTicket(type:ActivityType):number
    {
        // let num=cc.sys.localStorage.getItem('activity_ticket'+type);
        let num;
        if(type == ActivityType.Boss){
            num = PropManager.getInstance().getPropNum(PropId.BossTicket);
        }else if(type == ActivityType.Endless){
            num = PropManager.getInstance().getPropNum(PropId.EndlessChallenge);
        }
        // if(num===''||num===null)
        // {
        //     num=2;
        // }
        // num=parseInt(num);
        return num;
        // for(let i=ActivityType.Endless; i<ActivityType.num; i++){
            
        // }    
    }

    changeTodayRemain(type:ActivityType,num:number):boolean
    {
        let newNum=this.getTodayRemain(type)+num;
        if(newNum>=0){
            this.saveTodayRemain(type,newNum);
            return true;
        }
        return false;
    }

    saveTodayRemain(type:ActivityType,num:number)
    {
        cc.sys.localStorage.setItem('today_remain'+type,num); 
    }

    getTodayRemain(type:ActivityType):number
    {
        let num=cc.sys.localStorage.getItem('today_remain'+type);
        if(num===''||num===null)
        {
            num=2;
        }
        num=parseInt(num);
        return num;  
    }
    
    getIsUnlock(type:ActivityType):boolean{
        let isUnlock=false;
        isUnlock=FunctionDefinitionManager.getInstance().getIsUnlock(this.getFuncType(type));
        return isUnlock;
    }

    getFuncType(type:ActivityType):FuncType{
        let funcType=FuncType.WuJinTiaoZhan;
        switch(type){
            case ActivityType.Endless:{
                funcType=FuncType.WuJinTiaoZhan;
            } break;
            case ActivityType.Boss:{
                funcType=FuncType.GeRenBoss;
            } break;
            case ActivityType.Tower:{
                funcType=FuncType.PaTa;
            } break;
            case ActivityType.Maze:{
                funcType = FuncType.MiGong;
            }
        }
        return funcType;
    }

    getActivityType(mode:GameMode):ActivityType{
        let at=ActivityType.Endless;
        switch(mode){
            case GameMode.Endless:{
                at=ActivityType.Endless;
            } break;
            case GameMode.Boss_Challenge:{
                at=ActivityType.Boss;
            } break;
            case GameMode.Tower:{
                at=ActivityType.Tower;
            } break;
        }
        return at;
    }

    resetTicket(){
        let maxNum=2;
        // if(DingYueManager.getInstance().getMonthCardInfo().is_buy){
        //     maxNum++;
        // }
        // if(DingYueManager.getInstance().getQuarterCardInfo().is_buy){
        //     maxNum+=2;
        // }
        for(let i=ActivityType.Endless; i<=ActivityType.Boss; i++){
            let num=this.getTicket(i);
            if(num<maxNum){
                this.saveTicket(i,maxNum);
            }
        }
    }
}
