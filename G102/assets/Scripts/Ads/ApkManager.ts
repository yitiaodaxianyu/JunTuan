import FollowManager from "../multiLanguage/FollowManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import {CUR_Platform, GameScene, INTER_VIDEO_TYPE, IsDebug, Release_Platform, VIDEO_TYPE } from "../Constants";
import { DingYue_Type, DYInfo, VipManager } from "./VipManager";
import GameData from "../GameData";
import GameManager from "../GameManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { LanguageIndex } from "../multiLanguage/LanguageConstants";
import { SoundIndex } from "../Sound/AudioConstants";
import ABTestManager from "../ABTest/ABTestManager";
import { LevelManager } from "../Level/LevelManager";
import UserData from "../UserData";
import { DingYue, Pay, PayInfo, PayId } from "../thirdParty/ThirdParty";
import { PayManager } from "../Payment/PayManager";
import { DingYueManager } from "../Payment/DingYueManager";
import TaskManager from "../Task/TaskManager";
import { TaskItem } from "../Task/TaskEnum";
import { PropManager } from "../Prop/PropManager";
import { TheStorageManager } from "../Storage/StorageManager";
import { StorageKey } from "../Storage/StorageConfig";
import { UIManager } from "../UI/UIManager";
import TaskUi from "../Task/TaskUi";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ApkManager {

    private static _instance: ApkManager = null;
    private adCallback:Function=null;
    private interVideoCallback:Function=null;
    private perv_inst_time=0;
    private dy:DingYue=null;
    private pay:Pay=null;
    private uploadCallback:Function=null;
    private dy_info_callback:DingYue=null;
    private pay_info_callback:Pay=null;
    //包体信息
    public package_name:string='com.IdleHeroCastleDefense';
    public app_ver:string='1.0.12';
    public app_code:number=12;
    public sys_ver:number=31;
    public android_id:string='';
    public aid:string="xxxxx";
    public plmn:number=41401;
    public did:string="";
    public package_callback:Function=null;
    //广告加载完成的类型数量
    public ad_loaded_num:number=0;
    public max_load_num:number=2;

    public static getInstance():ApkManager
    {
        if(this._instance==null)
        {
            this._instance=new ApkManager();
            this._instance.init();
        }
        return this._instance;
    }

    //初始化游戏数据
    init () {
        cc.APK=this;
        cc.game.on(cc.game.EVENT_HIDE, ()=>{
            console.log("游戏进入后台,上传总时长");            
            GameData.getInstance().saveExitTime();            
        },this);
        cc.game.on(cc.game.EVENT_SHOW, ()=>{
            console.log("游戏进入前台,保存一个时间");
            GameData.getInstance().saveLoginTime();            
            // GameData.getInstance().checkIsNewDay();
            // 拉取服务器时间
            GameData.getInstance().refreshServerTime();
            if(GameManager.getInstance().cur_game_scene==GameScene.home){
                setTimeout(()=>{
                    cc.find("Canvas/task_ui").getComponent(TaskUi).refreshDailyTask();
                },500);
            }
        },this);
        //this.initAds();
        this.onJSInitFinish();
        // setInterval(()=>{
        //     PropManager.getInstance().saveAllPropNum(true);

        // },60*1000);
    }
    
    initAds()
    {        
        //开启一个计时器，如果  激励视频2分钟内都是未加载，则主动发起一次加载
        let adNoNum=0;
        // let setInter = setInterval(()=>{
        //     if(this.ad_video_load_state==AD_LOAD_STATE.NO)
        //     {
        //         adNoNum++;
        //     }else
        //     {
        //         adNoNum=0;
        //     }
        //     if(adNoNum>=120)
        //     {
        //         adNoNum=0;
                
        //     }
        // }, 1000); //1000毫秒为1秒
    };

    
    //-----------------------------------------------调用JAVA--------------------------------------------------------------
    onJSInitFinish(){
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "onJSInitFinish";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    }
    //展示插屏广告
    showBanner()
    {        
        return;
        if(cc.sys.isNative) {
            let className = "org/cocos2dx/javascript/ApkManager";
            let methodName = "showBanner";
            let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        }
    }

    //展示插屏广告
    closeBanner()
    {
        return;
        if(cc.sys.isNative) {
            let className = "org/cocos2dx/javascript/ApkManager";
            let methodName = "closeBanner";
            let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        }
    }

    //展示插屏广告
    showInterstitial(message:string)
    {
        if(VipManager.getIsVip()==true)
        {
            return;
        }
        let curTime=new Date().getTime(); 
        let isCanAd=false;
        if(curTime-this.perv_inst_time>1000*10)
        {
            isCanAd=true;
            this.perv_inst_time=curTime;
        }
        if(isCanAd==false)
        {
            return;
        }
        
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showInterstitial";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    }
    //展示视频广告
    showVideo(callback:(isSuc:boolean)=>void,type:VIDEO_TYPE)
    {
        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113))
        return;
        // 周卡免视频特权
        if(DingYueManager.getInstance().getWeekInfo().is_buy == true && TheStorageManager.getInstance().getNumber(StorageKey.WeekCardFreeAdNum) > 0){
            TheStorageManager.getInstance().setItem(StorageKey.WeekCardFreeAdNum,TheStorageManager.getInstance().getNumber(StorageKey.WeekCardFreeAdNum) - 1);
            this.adCallback=callback;
            this.adResult(1);
            return;
        }

        if(IsDebug==true)
        {
            this.adCallback=callback;
            this.adResult(1);
            return;
        }
        if(VipManager.subVipFreeNum()==true)
        {
            //是否要VIP提示  
            callback(true);
            return ;
        }
        FollowManager.getInstance().followEvent(Follow_Type.点击视频播放奖励玩家数);
        this.adCallback=callback;
        if(cc.sys.isNative) {
            let className = "org/cocos2dx/javascript/ApkManager";
            let methodName = "showVideo";
            let methodSignature = "(I)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature,type);
        }else
        {
            if(IsDebug)
            this.adResult(1);
            else
            this.adResult(0);
        }
    }

    //展示视频广告
    showInterVideo(callback:(isSuc:boolean)=>void,type:INTER_VIDEO_TYPE)
    {
        // if(IsDebug==true)
        // {
        //     this.adCallback=callback;
        //     this.adResult(1);
        //     return;
        // }        
        //FollowManager.getInstance().followEvent(Follow_Type.点击视频播放奖励玩家数);
        GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(100113))
        return;
        this.interVideoResult=callback;
        if(cc.sys.isNative) {
            let className = "org/cocos2dx/javascript/ApkManager";
            let methodName = "showInterVideo";
            let methodSignature = "(I)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature,type);
        }else
        {
            if(IsDebug)
            this.interVideoResult(1);
            else
            this.interVideoResult(0);
        }
    }

    //显示联系我们链接
    showCallMe()
    {
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showCallMe";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    }
    //埋点
    followEvent(eventName:string)
    {
        if(CUR_Platform==Release_Platform.APK)
        {
            // if(cc.sys.isNative) {
            //     let className = "org/cocos2dx/javascript/ApkManager";
            //     let methodName = "followEvent";
            //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
            //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,eventName);                
            // }
        }        
    }
    //检测订阅信息
    cheakDYInfo()
    {
        //if(CUR_Platform==Release_Platform.APK)
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "cheakDYInfo";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }else{
        //     if(IsDebug){
                
        //     }
        // }
    }

    showTiaoKuan()
    {
        if(CUR_Platform==Release_Platform.APK)
        if(cc.sys.isNative) {
            let className = "org/cocos2dx/javascript/ApkManager";
            let methodName = "showTiaoKuan";
            let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
            jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        }
    }
    
    showDingYue(dy:DingYue,id:string)
    {        
        this.dy=dy;
        if(IsDebug){
            this.dyResult(1);
            PayManager.getInstance().savePayNum(id,1);
            return;
        }
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showDingYue";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,id);            
        // }else{
            this.dyResult(1);
        //}
    }

    getVipInfo(callback:Function)
    {
        this.uploadCallback=callback;
        let uid=UserData.getInstance().getUserID();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getVipInfo";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,uid);            
        // }
    }

    showPay(pay:Pay,type:string){
        this.pay=pay;
        if(IsDebug){
            this.payResult(1);
            return;
        }
        UIManager.getInstance().showPayWaitingUi();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "showPay";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,type);            
        // }else{
            this.payResult(1);
        //}
    }

    //----------------------------------------------------登录交互-----------------------------------------------------------

    uploadAndGetUid(callback:Function)
    {
        this.uploadCallback=callback;
        let maxLevel=LevelManager.getInstance().finish_level;
        let onlineTime=GameData.getTotalTime();
        let name=UserData.getInstance().getUserName();
        // if(cc.sys.isNative)
        // {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "uploadAndGetUid";
        //     let methodSignature = "(IILjava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime,name);
        // }else
        // {
            this.uploadResult(JSON.stringify({uid:UserData.getInstance().getUserID(),vip:'0'}));
       // }
    }

    uploadOnlineTime()
    {
        let maxLevel=LevelManager.getInstance().finish_level;
        let onlineTime=GameData.getTotalTime();
        let uid=UserData.getInstance().getUserID();
        if(uid=='')
        return;
        // if(cc.sys.isNative)
        // {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "uploadOnlineTime";
        //     let methodSignature = "(IILjava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime,uid);
        // }
    }

    loginForFB(callback:Function)
    {
        this.uploadCallback=callback;
        let maxLevel=LevelManager.getInstance().finish_level;
        let onlineTime=GameData.getTotalTime();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "loginForFB";
        //     let methodSignature = "(II)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime);            
        // }
    }

    loginForGoogle(callback:Function)
    {
        this.uploadCallback=callback;
        let maxLevel=LevelManager.getInstance().finish_level;
        let onlineTime=GameData.getTotalTime();
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "loginForGoogle";
        //     let methodSignature = "(II)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,maxLevel,onlineTime);            
        // }
    }

    setUid()
    {
        // if(CUR_Platform==Release_Platform.APK && cc.sys.isNative)
        // {
        //     let uid=UserData.getInstance().getUserID();
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "setUid";
        //     let methodSignature = "(Ljava/lang/String;)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,uid);
        // }
    }

    getAndroidLanguage()
    {
        // if (cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getAndroidLanguage";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);                
        // }
    }

    getABTestPar()
    {
        // if (cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getABTestPar";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);                
        // }
    }
    /**
     * 让手机震动一下
     * @param dt 震动时间，毫秒（整数）
     */
    beVibrate(dt:number)
    {
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "beVibrate";
        //     let methodSignature = "(I)V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature,dt);
        // }
    }

    
    getDingYueInfo(dyInfo:DingYue){
        this.dy_info_callback=dyInfo;        
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getDingYueInfo";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    }
    /**调用android获得支付信息 */
    getPayInfos(payInfo:Pay){
        this.pay_info_callback=payInfo;
        if(IsDebug){
            this.setTestPayInfo();
            return;
        }
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getPayInfos";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }else{
            this.setTestPayInfo();
        //}
    }

    /**调用android*/
    jumpToGP(){
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "jumpToGP";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    }

    getPackageInfo(callback:Function){
        this.package_callback=callback;
        // if(cc.sys.isNative) {
        //     let className = "org/cocos2dx/javascript/ApkManager";
        //     let methodName = "getPackageInfo";
        //     let methodSignature = "()V";//如果是string：Ljava/lang/String;, bool:Z,int:I
        //     jsb.reflection.callStaticMethod(className, methodName, methodSignature);            
        // }
    }

    private setTestPayInfo(){
        this.setPayInfos([{ "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "b201", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦84400", "currency": "KRW", "pay_id": "b401", "is_buy": false }, 
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "b501", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦92,724", "currency": "KRW", "pay_id": "c101", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c102", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c103", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c104", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c105", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c106", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c107", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c108", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c109", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c110", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c201", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c202", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c203", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c204", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c205", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦844", "currency": "KRW", "pay_id": "c206", "is_buy": false },
        { "des": "get 60 crystals", "price": "￦666", "currency": "KRW", "pay_id": "c301", "is_buy": false },
        { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c501", "is_buy": false },
        { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c502", "is_buy": false },
        { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c503", "is_buy": false },
        { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c504", "is_buy": false },
        { "des": "get 60 crystals", "price": "$0.1", "currency": "KRW", "pay_id": "c505", "is_buy": false },
        { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c601", "is_buy": false },
        { "des": "get 60 crystals", "price": "$3", "currency": "KRW", "pay_id": "c401", "is_buy": false },
    ]
        )
    }

    //-----------------------------------------------JAVA调用区--------------------------------------------------------------    
    //广告结果返回
    //0=false,1=true
    adResult(result)
    {
        var adResult=parseInt(result);
        if(this.adCallback!=null)
        {
            if(adResult==0){
                this.adCallback(false);
                // if(GameData.getInstance().getTotalVideoNum()<=0){
                //     GameData.getInstance().addTotalVideoNum(1);
                //     this.adCallback(true);
                // }else{
                //     this.adCallback(false);
                // }                
            }                
            else
            {
                this.adCallback(true);
                TaskManager.getInstance().emitTask(TaskItem.观看任意1次广告);
                TaskManager.getInstance().emitTask(TaskItem.观看任意3次广告);
                FollowManager.getInstance().followEvent(Follow_Type.获得视频播放奖励玩家数);
                GameData.getInstance().addTotalVideoNum(1);
            }                
            this.adCallback=null;
        }
    }

    interVideoResult(result)
    {
        var adResult=parseInt(result);
        if(this.interVideoCallback!=null)
        {
            if(adResult==0)
                this.interVideoCallback(false);
            else
            {
                this.interVideoCallback(true);
                //FollowManager.getInstance().followEvent(Follow_Type.获得视频播放奖励玩家数);
            }                
            this.interVideoCallback=null;
        }
    }

    addAdLoadedNum(num){
        if(typeof num == "string"){
            num=parseInt(num);
        }
        this.ad_loaded_num+=num;
    }
    //-------------------------------------订阅交互--------------------------------------
    setDingYueInfo(infoStr){
        let dyInfos=new Array();
        for(let i=0; i<infoStr.length; i++)
        {
            let info=infoStr[i];
            let dyInfo=new PayInfo();
            dyInfo.price=info.price;
            dyInfo.des=info.des;
            dyInfo.currency=info.currency;
            dyInfo.is_buy=info.is_buy;
            dyInfo.pay_id=info.pay_id;
            dyInfos.push(dyInfo);
        }
        DingYueManager.getInstance().setCardInfo(dyInfos);
        // [SkuDetails: {"productId":"c502","type":"subs","title":"Weekly gift (Idle Hero: Castle Defense)","name":"Weekly gift","description":"Get weekly gift","price":"￦1,400","price_amount_micros":1400000000,"price_currency_code":"KRW","skuDetailsToken":"AEuhp4JH4kUuQfAVd__pCnMLEzPSG5fy1mBnh1JkLfdSup6gMAZuFH_fotknpuxNWWucDhirxDeBqTaBYR3hoEEssBQANOfNRfSo9co9Mg8=","subscriptionPeriod":"P1W","introductoryPriceAmountMicros":100000000,"introductoryPricePeriod":"P1W","introductoryPrice":"￦100","introductoryPriceCycles":1}]
    }
    setPayInfos(infoStr){
        let dyInfos=new Array();
        for(let i=0; i<infoStr.length; i++)
        {
            let info=infoStr[i];
            let dyInfo=new PayInfo();
            dyInfo.price=info.price;
            dyInfo.des=info.des;
            dyInfo.currency=info.currency;
            dyInfo.is_buy=info.is_buy;
            dyInfo.pay_id=info.pay_id;
            dyInfos.push(dyInfo);
        }
        //this.pay_info_callback.info(dyInfos);
        PayManager.getInstance().setPayInfos(dyInfos);
    }
    //订阅结果返回
    dyResult(result)
    {
        var adResult=parseInt(result);
        if(this.dy!=null)
        {
            if(adResult==0)
                this.dy.result(false);
            else
            {
                this.dy.result(true);
                FollowManager.getInstance().followEvent(Follow_Type.订阅成功玩家数);
            }                
            this.dy=null;
        }
    }
    payResult(result)
    {
        UIManager.getInstance().closePayWaitingUi();
        var payResult=parseInt(result);
        if(this.pay!=null)
        {
            if(payResult==0)
                this.pay.result(false)
            else
            {
                this.pay.result(true)
                //FollowManager.getInstance().followEvent(Follow_Type.订阅成功玩家数);
            }                
            this.pay=null;
        }
    }

    notifyPayState(payId){
        let id=parseInt(payId);
        PayManager.getInstance().getRewardById(id);
    }

    //订阅信息设置
    dyInfo(infoStr)
    {
        //发过来直接就是JSON格式了
        //console.log('dyInfo:');
        // let infos=JSON.stringify(infoStr);
        // console.log(infos);
        // VipManager.dy_info=new Array();
        // for(let i=0; i<3; i++)
        // {
        //     let info=infoStr[i];
        //     let dyInfo=new DYInfo();
        //     dyInfo.price=info.price;
        //     dyInfo.des=info.des;
        //     dyInfo.currency=info.currency;
        //     VipManager.dy_info.push(dyInfo);
        //     console.log(info.price+'-'+info.currency);
        // }
    }
    //vip设置
    setVip(level)
    {
        //VipManager.saveVip(level);
    }
    //游戏版本号设置
    setVersion(ver)
    {
        console.log("setVersion"+ver);
        UserData.getInstance().saveVersion(ver);
    }

    //-------------------------------------登录--------------------------------------
    //登录结果返回
    uploadResult(userInfo)
    {
        //console.log(loginInfo);
        this.uploadCallback(userInfo);
        this.uploadCallback=null;
    }

    setLanguage(type)
    {
        cc.log('setLanguage：'+type);
        LanguageManager.getInstance().setLanguage(type);
    }

    showGameExit()
    {
        if(GameManager.getInstance().cur_game_scene!=GameScene.load)
        GameManager.getInstance().showDialog(LanguageManager.getInstance().getString(LanguageIndex.Do_you_really_want_to_quit_game),()=>{
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
            if(GameManager.getInstance().cur_game_scene==GameScene.game)
            {
                this.followEvent(Follow_Type.退出挑战关卡+LevelManager.getInstance().start_level);
            }
            //结束游戏
            GameData.getInstance().saveExitTime();
            setTimeout(()=>{
                cc.game.end();
            },100);
        },()=>{
            GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        },0);
    }
    
    //是一个json格式的字符串
    setABTestPar(par)
    {        
        ABTestManager.getInstance().setABTestPar(par);
    }

    setPackageInfo(info){
        let json=JSON.parse(info);
        this.package_name=json.package_name;
        this.app_ver=json.app_ver;
        this.app_code=json.app_code;
        this.plmn=json.plmn;
        this.aid=json.aid;
        this.did=json.did;
        console.log(this.package_name,this.app_ver,this.app_code,this.plmn,this.aid,this.did,json.network);
        UserData.getInstance().HttpPostGetUserId(this.did,json.network);
    }
}

