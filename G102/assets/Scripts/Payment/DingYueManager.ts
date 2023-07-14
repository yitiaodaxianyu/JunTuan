import ApkManager from "../Ads/ApkManager";
import { IsDebug } from "../Constants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { PayInfo } from "../thirdParty/ThirdParty";
import { PayManager } from "./PayManager";

export class DingYueManager{

    private static _instance:DingYueManager=null;
    
    private week_info:PayInfo=null;
    private month_info:PayInfo=null;
    private quarter_info:PayInfo=null;

    public static getInstance():DingYueManager
    {
        if(this._instance==null)
        {
            this._instance=new DingYueManager();
            this._instance.init();
        }
        return this._instance;
    }

    private init(){
        this.initCardInfo();
    }

    initCardInfo(){
        //ApkManager.getInstance().getDingYueInfo()
    }

    setCardInfo(payInfos:PayInfo[]){
        for(let i=0; i<payInfos.length; i++){
            let payInfo=payInfos[i];
            switch(payInfo.pay_id){
                case 'b101':{
                    this.month_info=payInfo;
                }break;
                case 'b102':{
                    this.quarter_info=payInfo;
                }break;
                // 周卡支付ID
                case 'c502':{
                    this.week_info=payInfo;
                }break;
            }
        }
    }

    getWeekInfo():PayInfo{
        if(IsDebug&&this.week_info){
            this.week_info.is_buy=PayManager.getInstance().getPayNum(this.week_info.pay_id)>0;
        }
        return this.week_info;
    }

    getMonthCardInfo():PayInfo{
        if(IsDebug&&this.month_info){
            this.month_info.is_buy=PayManager.getInstance().getPayNum(this.month_info.pay_id)>0;
        }
        return this.month_info;
    }

    getQuarterCardInfo():PayInfo{
        if(IsDebug){
            this.quarter_info.is_buy=PayManager.getInstance().getPayNum(this.quarter_info.pay_id)>0;
        }
        return this.quarter_info;
    }
    /**获取今天是否领取了 */
    getTodayIsGet(id:number):boolean{
        return TheStorageManager.getInstance().getInt(StorageKey.DingYueGetState+id,0)>0;
    }
    
    saveTodayGet(id:number,isGet:boolean){
        let num=isGet?1:0;
        return TheStorageManager.getInstance().setItem(StorageKey.DingYueGetState+id,num);
    }

    resetTodayGetState(){
        TheStorageManager.getInstance().setItem(StorageKey.DingYueGetState+1001,0);
        TheStorageManager.getInstance().setItem(StorageKey.DingYueGetState+2001,0);
    }
}
