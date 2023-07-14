import { AccessName, HttpManager } from ".././NetWork/HttpManager";
import ApkManager from "../Ads/ApkManager";
import { IsDebug } from "../Constants";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { PayInfo, PayId, PayUiIndex } from "../thirdParty/ThirdParty";
import UserData from "../UserData";
import { CrystalRechargeManager } from "./Data/CrystalRecharge";
import { CumulativeRechargeManager } from "./Data/CumulativeRecharge";
import { CyclePackManager } from "./Data/CyclePack";
import { PaidItemManager } from "./Data/PaidItem";
import { PrivilegedCardInformationManager } from "./Data/PrivilegedCardInformation";
import { DingYueManager } from "./DingYueManager";

export class PayManager{

    private static _instance:PayManager=null;
    private pay_info:Map<string,PayInfo>=null;

    public static getInstance():PayManager
    {
        if(this._instance==null)
        {
            this._instance=new PayManager();
            this._instance.init();
        }
        return this._instance;
    }

    private init(){
        DingYueManager.getInstance();
        CrystalRechargeManager.getInstance();
        CumulativeRechargeManager.getInstance();
        PrivilegedCardInformationManager.getInstance();
        PaidItemManager.getInstance();
        this.pay_info=new Map<string,PayInfo>();
        this.setLocalInfo();
        ApkManager.getInstance().getPayInfos({info:(payInfos:PayInfo[])=>{
            let len=payInfos.length;
            for(let i=0; i<len; i++){
                let payInfo=payInfos[i];
                this.setPayInfo(payInfo.pay_id,payInfo);
            }
        },});
    }
    /**游戏启动先设置本地表的价格数据 */
    setLocalInfo(){
        PaidItemManager.getInstance().loadJson(()=>{
            //如果android返回了就不要管了
            if(this.pay_info.size<=0){
                let dyInfos=new Array<PayInfo>();
                let data=PaidItemManager.getInstance().getData();                            
                data.forEach((v,k)=>{
                    let payInfo=new PayInfo();
                    payInfo.price=v.Price+'';
                    payInfo.des='Prop';
                    payInfo.currency="$";
                    payInfo.is_buy=IsDebug;
                    payInfo.pay_id=v.PaidItemId;
                    if(v.PurchaseType==1){
                        //订阅类型
                        payInfo.is_buy=this.getPayNum(v.PaidItemId)>0;
                        dyInfos.push(payInfo);                        
                    }
                    this.setPayInfo(v.PaidItemId,payInfo);
                });
                DingYueManager.getInstance().setCardInfo(dyInfos);
            }else{
                let dyInfos=new Array<PayInfo>();
                let data=PaidItemManager.getInstance().getData();                            
                data.forEach((v,k)=>{                    
                    if(v.PurchaseType==1){
                        //订阅类型
                        let payInfo=new PayInfo();
                        payInfo.price=v.Price+'';
                        payInfo.des='Prop';
                        payInfo.currency="$";
                        payInfo.is_buy=IsDebug;
                        payInfo.pay_id=v.PaidItemId;
                        payInfo.is_buy=this.getPayNum(v.PaidItemId)>0;
                        dyInfos.push(payInfo);
                    }
                });
                // if(!DingYueManager.getInstance().getMonthCardInfo()){
                //     DingYueManager.getInstance().setCardInfo(dyInfos);
                // }
                
            }
        });        
        if(IsDebug){
            let dyInfos=new Array<PayInfo>();
            let payInfo=new PayInfo();
            payInfo.price='123456';
            payInfo.des='Prop';
            payInfo.currency="$";
            payInfo.pay_id="c502";
            payInfo.is_buy=this.getPayNum(payInfo.pay_id)>0;
            dyInfos.push(payInfo);
            payInfo=new PayInfo();
            payInfo.price='654321';
            payInfo.des='Prop';
            payInfo.currency="$";
            payInfo.pay_id="c504";
            payInfo.is_buy=this.getPayNum(payInfo.pay_id)>0;
            dyInfos.push(payInfo);
            if(!DingYueManager.getInstance().getWeekInfo()){
                DingYueManager.getInstance().setCardInfo(dyInfos);
            }
        }
    }

    setPayInfos(payInfos:PayInfo[]){
        let len=payInfos.length;
        for(let i=0; i<len; i++){
            let payInfo=payInfos[i];
            this.setPayInfo(payInfo.pay_id,payInfo);
        } 
    }

    public setPayInfo(type:string,payInfo:PayInfo){
        this.pay_info.set(type,payInfo);
    }

    public getPayInfo(type:string):PayInfo{
        return this.pay_info.get(type);
    }
    /**
     * 
     * @param type 计费点类型
     * @returns 该计费的的购买次数
     */
     public getPayNum(type:string):number{
        let num=TheStorageManager.getInstance().getInt(StorageKey.PayNum+type,0);        
        return num;
    }

    
    /**是否首次充值 */
    public getIsFirstPay():boolean{        
        let isPay=false;
        let cDate=CrystalRechargeManager.getInstance().getData();
        cDate.forEach((v,k)=>{
            if(!isPay&&this.getPayNum(v.ProductId)>0){
                isPay=true;
            }
        });
        let pDate=PrivilegedCardInformationManager.getInstance().getData();
        pDate.forEach((v,k)=>{
            if(!isPay&&this.getPayNum(v.ProductId)>0){
                isPay=true;
            }
        });
        let lData=CyclePackManager.getInstance().getData();
        lData.forEach((v,k)=>{
            if(!isPay&&v.AdReward==0&&this.getPayNum(v.ProductId)>0){
                isPay=true;
            }
        });
        return isPay&&!this.getIsGetFirstReward();
    }

    public getIsGetFirstReward():boolean{
        return TheStorageManager.getInstance().getInt(StorageKey.FirstPayGetState,0)>0; 
    }

    public setIsGetFirstReward(isGet:boolean){
        TheStorageManager.getInstance().setItem(StorageKey.FirstPayGetState,isGet?1:0);
    }

    /**
     * 
     * @param type 添加一次购买次数
     */
     public addPayNum(type:string){
        this.savePayNum(type,this.getPayNum(type)+1);
        let price=1.99;
        this.HttpAddPayPrice(price);
    }
    /**
     * 
     * @param type 计费点类型
     * @param num 次数
     */
     public savePayNum(type:string,num:number){
        TheStorageManager.getInstance().setItem(StorageKey.PayNum+type,num);
    }

    public getSelectIds(type:string):number[]{
        let idsList=TheStorageManager.getInstance().getJson(StorageKey.PaySelectIds+type);        
        return idsList;
    }

    public saveSelectIds(type:string,ids:number[])
    {
        TheStorageManager.getInstance().setJson(StorageKey.PaySelectIds+type,ids);
    }

    public getRewardById(payId:number){
        //this.addPayNum(payId);
        
    }
    /**获得累计充值的龙晶数量 */
    public getTotalLongJingNum():number{
        let num=TheStorageManager.getInstance().getInt(StorageKey.TotalLongJingNum,0);        
        return num;
    }
    /**添加累计充值的龙晶数量 */
    public addTotalLongJingNum(num:number){
        let total=num+this.getTotalLongJingNum()
        TheStorageManager.getInstance().setItem(StorageKey.TotalLongJingNum,total);
        //根据累计充值总额设置领取状态
        let data=CumulativeRechargeManager.getInstance().getData();
        data.forEach((v,k)=>{
            let state=PayManager.getInstance().getTotalLongJingGetState(v.CumulativeRechargeID);
            if(state!=2 && total>=v.CumulativeRechargePrice){
                PayManager.getInstance().setTotalLongJingGetState(v.CumulativeRechargeID,1);
            }
        });
    }

    /**
     * 累计充值龙晶的领取状态，0：未完成，1：可以领取，2：已经领取
     * @param totalId 累计充值id
     */
    public getTotalLongJingGetState(totalId:number):number{
        let num=TheStorageManager.getInstance().getInt(StorageKey.TotalLongJingGetState+totalId,0);
        return num;
    }

    /**设置累计充值龙晶id的领取状态 0：未完成，1：可以领取，2：已经领取*/
    public setTotalLongJingGetState(totalId:number,state:number){
        TheStorageManager.getInstance().setItem(StorageKey.TotalLongJingGetState+totalId,state);
    }

    /**
     * 是否有可以领取的，红点专用
     * @param index 商城页的标签索引
     * @returns 返回是否可以领取
     */
    public getIsCanGet(index:number):boolean{
        let isHaveGet=false;
        switch(index){
            case PayUiIndex.ZuXiang:{
                //月卡
                // if(DingYueManager.getInstance().getMonthCardInfo().is_buy){
                //     isHaveGet=!DingYueManager.getInstance().getTodayIsGet(1001)
                // }
                // if(!isHaveGet){
                //     //季卡
                //     if(DingYueManager.getInstance().getQuarterCardInfo().is_buy){
                //         isHaveGet=!DingYueManager.getInstance().getTodayIsGet(2001)
                //     }                    
                // }
            }break;
            case PayUiIndex.LongJing:
            case PayUiIndex.Total:{
                //累计充值的
                let CRM=CumulativeRechargeManager.getInstance();
                let data=CRM.getData();
                let isHaveNoGet=false;
                data.forEach((v,k)=>{
                    let state=this.getTotalLongJingGetState(v.CumulativeRechargeID);
                    if(!isHaveNoGet&&state==1){
                        isHaveNoGet=true;
                        isHaveGet=true;
                    }
                });                
            }break;
            case PayUiIndex.Gift:{
                //礼包的                
                for(let i=1; i<=3; i++){
                    let dataList = CyclePackManager.getInstance().getDataByType(i);
                    dataList.forEach((v,k) => {
                        if(v.AdReward == 1){
                            let isSoldOut = cc.sys.localStorage.getItem("pay_git_bag_item_" + v.GiftID) || 0;
                            isSoldOut = Number(isSoldOut)                        
                            if (isSoldOut < v.AdPlayableTimes && isHaveGet==false){
                                isHaveGet=true;
                            }
                        }
                    });
                }
            }break;

        }
        
        return isHaveGet;
    }

    public getTodayShow(index:number):number{
        return TheStorageManager.getInstance().getInt(StorageKey.PayUiShowNum+index,0);
    }

    public addTodayShow(index:number){
        TheStorageManager.getInstance().setItem(StorageKey.PayUiShowNum+index,1+this.getTodayShow(index));
    }

    public getFuncTodayShow(funcType:number):number{
        return TheStorageManager.getInstance().getInt(StorageKey.FuncUiShowNum+funcType,0);
    }

    public addFuncTodayShow(funcType:number){
        TheStorageManager.getInstance().setItem(StorageKey.FuncUiShowNum+funcType,1+this.getFuncTodayShow(funcType));
    }

    public resetAllTodayShow(){
        for(let i=1; i<=6; i++){
            TheStorageManager.getInstance().setItem(StorageKey.PayUiShowNum+i,0);
        }
        
    }

    HttpAddPayPrice(price:number){
        HttpManager.post(AccessName.updateUserInfo,this.getPayJsonString(price),false)
    }

    private getPayJsonString(price:number):string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            type:6,
            uid:uid,
            value:price,
        });
    }
}
