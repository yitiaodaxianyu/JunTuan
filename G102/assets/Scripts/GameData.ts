
import { AccessName, HttpManager } from "./NetWork/HttpManager";
import {FuncType, GameScene, IsDebug,IsTestServer,Item_Type, MAX_ENERGY} from "./Constants";
import { EquipmentManager } from "./Equipment/EquipmentManager";
import GameManager from "./GameManager";
import { LogManager } from "./Tools/LogInfo";
import { LevelManager } from "./Level/LevelManager";
import { ActivityManager } from "./Activity/ActivityManager";
import UserData from "./UserData";
import { EventManager, RedEventString, RedEventType } from "./Tools/EventManager";
import { StorageKey } from "./Storage/StorageConfig";
import { PetManager } from "./Pet/PetManager";
import { DingYueManager } from "./Payment/DingYueManager";
import TowerManager from "./Tower/TowerManager";
import { CyclePackManager } from "./Payment/Data/CyclePack";
import { PayManager } from "./Payment/PayManager";
import { TheStorageManager } from "./Storage/StorageManager";
import { PropManager } from "./Prop/PropManager";
import TaskManager from "./Task/TaskManager";
import { TaskItem } from "./Task/TaskEnum";
import { PropId } from "./Prop/PropConfig";
import { DailyShopManager } from "./Store/DailyShop";
import { FunctionDefinitionManager } from "./JsonData/FunctionDefinition";
import { PurchaseCoinsManager } from "./Store/PurchaseCoins";
import { CommodityInformationManager } from "./Store/CommodityInformation";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameData {

    private static _instance: GameData = null;

    init () {
        // this.checkIsNewDay();        
    }

    
    public static getInstance():GameData
    {
        if(this._instance==null)
        {
            this._instance=new GameData();
            this._instance.init();
        }
        return this._instance;
    }

    getMaxEnergy():number
    {
        let max=LevelManager.getInstance().finish_level+MAX_ENERGY;
        if(max>30)
        {
            max=30;
        }
        return max;
    }
    
    onExit()
    {
        //记录退出时间
        let curDate = new Date();
        cc.sys.localStorage.setItem('exit_time',curDate.getTime());
    }    
    
    randomLetter(len:number):string 
    {
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let res = ''
        for (let i = 0; i < len; i++) {
            let n = Math.floor(Math.random() * letters.length)
            res += letters[n]
        }
        return res
    }

    saveExitTime()
    {
        if(GameManager.getInstance().cur_game_scene==GameScene.load){
            return;
        }
        //记录退出时间
        let curDate = new Date();
        cc.sys.localStorage.setItem('exit_time',curDate.getTime());
        let loginTime=this.getLoginTime();
        let onlineTime=Math.floor((curDate.getTime()-loginTime)/1000);
        let totalTime=GameData.getTotalTime();
        this.saveTotalTime(totalTime+onlineTime);
        LogManager.saveLogList();
        //上传信息
        if(IsTestServer)
        {
            PropManager.getInstance().saveAllPropNum();
        }
        //把信息同步到文件中
        //EquipmentManager.getInstance().saveAllEquipmentList();
        //PetManager.getInstance().saveAllPetList();
    }

    saveLoginTime()
    {
        let curDate = new Date();
        cc.sys.localStorage.setItem('login_time',curDate.getTime()); 
    }

    getLoginTime():number
    {
        let num=cc.sys.localStorage.getItem('login_time');
        if(num===''||num===null)
        {
            num=new Date().getTime();
        }
        num=parseInt(num);
        return num;
    }

    saveTotalTime(num:number)
    {
        cc.sys.localStorage.setItem('total_online_time',num);
        this.saveLoginTime();
        //FollowManager.getInstance().followNeiBu(this.finish_level,num,this.getUserName());
    }

    static getTotalTime():number
    {
        let num=cc.sys.localStorage.getItem('total_online_time');
        if(num===''||num===null)
        {
            num=0;            
        }
        num=parseInt(num);
        return num;
    }

    //今天是否可以签到
    getIsSignToday():boolean
    {
        return TheStorageManager.getInstance().getNumber(StorageKey.CanSignIn,0) == 0
        
    }

    saveIsSignToday(isSign:boolean)
    {
        if(isSign==true)
        {
            cc.sys.localStorage.setItem("TodaySignNum",1);
        }else
        {
            cc.sys.localStorage.setItem("TodaySignNum",0);
        }
    }

    //获取签到天数
    getSignDays()
    {
        let signDays = cc.sys.localStorage.getItem("SignDays");
        if(signDays!="" && signDays!=null)
        {
            signDays=parseInt(signDays);
        }else
        {
            signDays=0;
        }
        return signDays;
    }

    checkIsNewMonth():boolean{
        let isNewMonth:boolean = false;
        let curMonth=new Date().getMonth();
        let month=cc.sys.localStorage.getItem("LoginMonth");
        if(month!=""&&month!=null){
            month=parseInt(month);
        }else{
            month=-1;
        }

        if(month > 0)
        {
            if(month!=curMonth)
            {
                isNewMonth = true;
            }
        }else
        {
            isNewMonth = true;
        }
        if(isNewMonth){
            this.saveNewMonth(true);
        }
        return isNewMonth;
    }

    saveNewMonth(isNewMonth:boolean)
    {
        // let curMonth=new Date().getMonth();
        // cc.sys.localStorage.setItem("LoginMonth", curMonth);        
        // if(isNewMonth==true)
        // {
        //     //重置战令
        //     BattlePassManager.resetBattlePass();
        //     CyclePackManager.getInstance().resetMonthData();
        // }
    }

    getYearWeek(year, month, day) {//a为年 b为月 c为日
        var date1 = new Date(year, parseInt(month) - 1, day),
            date2 = new Date(year, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    };

    checkIsNewWeek():boolean{
        let isNewWeek:boolean = false;
        let date = new Date();
        let curWeek=this.getYearWeek(date.getFullYear(),date.getMonth(),date.getDate());
        let week=cc.sys.localStorage.getItem("LoginWeek");
        if(week!=""&&week!=null){
            week=parseInt(week);
        }else{
            week=-1;
        }

        if(week > 0)
        {
            if(week!=curWeek)
            {
                isNewWeek = true;
            }
        }else
        {
            isNewWeek = true;
        }
        if(isNewWeek){
            this.saveNewWeek(true);
        }
        return isNewWeek;
    }

    saveNewWeek(isNewWeek:boolean)
    {
        let date = new Date();
        let curWeek=this.getYearWeek(date.getFullYear(),date.getMonth(),date.getDate());
        cc.sys.localStorage.setItem("LoginWeek", curWeek);        
        if(isNewWeek==true)
        {
            //重置战令
            // BattlePassManager.resetBattlePass();
            CyclePackManager.getInstance().resetWeekData();
        }
    }

    checkIsNewDay():boolean
    {
        let isNewDay:boolean = false;
        let curDay = new Date().getDate();
        let loginDay = cc.sys.localStorage.getItem("LoginDay");
        if(loginDay!="" && loginDay!=null)
        {
            loginDay=parseInt(loginDay);
        }
        else
            loginDay=0;
        if(loginDay > 0)
        {
            if(loginDay!= curDay)
            {
                isNewDay = true;
            }
        }else
        {
            isNewDay = true;
        }
        this.saveNewDay(isNewDay);
        return isNewDay;
    }

    
    
    saveNewDay(isNewDay:boolean)
    {
        let curDay = new Date().getDate();
        cc.sys.localStorage.setItem("LoginDay", curDay);        
        if(isNewDay==true)
        {
            this.checkIsNewMonth();
            // HeroManager.getInstance().saveNewDayZhanli();
            this.saveIsSignToday(false);          
            PayManager.getInstance().resetAllTodayShow();
            DingYueManager.getInstance().resetTodayGetState();
            TowerManager.resetTodayPassNum();
            CyclePackManager.getInstance().resetDayData();
            EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
            ActivityManager.getInstance().resetTicket();
        }
    }
            
    getTotalVideoNum():number
    {
        let num=cc.sys.localStorage.getItem('total_video_num');
        if(num!=""&&num!=null)
        {
            num=parseInt(num);
        }else
        {
            num=0;
        }
        return num;
    }

    addTotalVideoNum(num:number)
    {
        let newNum=this.getTotalVideoNum()+num;
        cc.sys.localStorage.setItem('total_video_num',newNum);
        this.HttpAddPayPrice();
    }

    HttpAddPayPrice(){
        HttpManager.post(AccessName.updateUserInfo,this.getPayJsonString(),false)
    }

    private getPayJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            type:7,
            uid:uid,
            value:1,
        });
    }

    /**从服务器更新时间戳到本地 */
    refreshServerTime(){
        HttpManager.gameTimePost(AccessName.getServerTime,this.getUidJsonString()).then((data:any)=>{
            if(data.serverTime){
                if(TheStorageManager.getInstance().getNumber(StorageKey.TomorowZeroTimeStamp,0) <= data.serverTime){
                    let oneDay = 60*60*24;
                    let timezone = 60 * (-new Date().getTimezoneOffset());
                    let todaySpeendTime = data.serverTime % oneDay;
                    let todayZero = data.serverTime - todaySpeendTime  - timezone;
                    let tomorowZero = todayZero + oneDay;
                    this.refreshDailyData();
                    TheStorageManager.getInstance().setItem(StorageKey.TomorowZeroTimeStamp,tomorowZero);
                }
                if(TheStorageManager.getInstance().getNumber(StorageKey.NextWeekZeroTimeStamp,0) <= data.serverTime){
                    let oneDay = 60*60*24;
                    let timezone = 60 * (-new Date().getTimezoneOffset());
                    let todaySpeendTime = data.serverTime % oneDay;
                    let todayZero = data.serverTime - todaySpeendTime  - timezone;
                    let t = new Date(todayZero * 1000);
                    let week = t.getDay();
                    if(week == 0) week = 7;
                    let weekSpeedTime = (week - 1) * oneDay;
                    let mondayZero = (todayZero - weekSpeedTime) + oneDay * 7;
                    this.refreshWeekData();
                    TheStorageManager.getInstance().setItem(StorageKey.NextWeekZeroTimeStamp,mondayZero);
                }
                if(TheStorageManager.getInstance().getNumber(StorageKey.NextMonthZeroTimeStamp,0) <= data.serverTime){
                    let oneDay = 60*60*24;
                    let timezone = 60 * (-new Date().getTimezoneOffset());
                    let todaySpeendTime = data.serverTime % oneDay;
                    let todayZero = data.serverTime - todaySpeendTime  - timezone;
                    // 转换到当天零点的时间
                    let date = new Date(todayZero * 1000);
                    // new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， 
                    // new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
                    let tempDate = new Date(date.getFullYear(),date.getMonth() + 1,0);
                    // 获取到当月的天数
                    let days = tempDate.getDate();
                    // 获取到剩余的天数
                    let remainingDay = days - date.getDate() + 1;
                    
                    // 下个月一号零点的时间戳(单位秒)
                    let nextMonthZero = todayZero + (remainingDay * oneDay);
                    this.refreshMonthData();
                    TheStorageManager.getInstance().setItem(StorageKey.NextMonthZeroTimeStamp,nextMonthZero);
                }
            }else{
                cc.error("数据获取失败");
            }
        }).catch((err)=>{
            cc.error(err);
        });
    }

    /**  刷新日常数据，即需要每日更新的数据在这更新*/
    refreshDailyData(){
        // 每日商店数据更新
        TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopId,'');
        for(let i = 0;i<6;i++){
            TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopNum + i,'');
            TheStorageManager.getInstance().setItem(StorageKey.StoreDailyShopDiscount + i,'');
        }
        for(let i = 0;i<3;i++){
            TheStorageManager.getInstance().setItem(StorageKey.StoreCoinItem + i,0)
        }
        // TheStorageManager.getInstance().setItem(StorageKey.CanSignIn,'0');
        TheStorageManager.getInstance().setItem(StorageKey.CanFastOffline,'');
        TheStorageManager.getInstance().setItem(StorageKey.CanAdFastOffline,'');
        TheStorageManager.getInstance().setItem(StorageKey.CoinPopAd,'');
        TheStorageManager.getInstance().setItem(StorageKey.TurmtableAd,'');
        TheStorageManager.getInstance().setItem(StorageKey.TurmtableFree,'');
        TheStorageManager.getInstance().setItem(StorageKey.TurmtableFreeYes, 1);
        TheStorageManager.getInstance().setItem(StorageKey.TurmtableFreeTime, 900);
        TheStorageManager.getInstance().setItem(StorageKey.TaskDailyActivityNum,'');

        TheStorageManager.getInstance().setItem(StorageKey.VipDailyCollectionStatus,0);

        TheStorageManager.getInstance().setItem(StorageKey.BossChallengeTimes, 3);
        TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeTimes,3);
        TheStorageManager.getInstance().setItem(StorageKey.VoidCrackChallengeTimes, 3);

        TheStorageManager.getInstance().setItem(StorageKey.BuyBossChallengeTimes, 3);
        TheStorageManager.getInstance().setItem(StorageKey.BuyUnlimitedChallengeTimes,3);
        TheStorageManager.getInstance().setItem(StorageKey.BuyVoidCrackChallengeTimes, 3);
        
        for(let i = 20;i<101;i+=20){
            TheStorageManager.getInstance().setItem(StorageKey.TaskDailyActivityState + i,'');
        }
        TheStorageManager.getInstance().setItem(StorageKey.TaskId + 0,0);
        // 周卡每日领取刷新
        TheStorageManager.getInstance().setItem(StorageKey.WeekCardIsReceiveToday,0);
        TheStorageManager.getInstance().setItem(StorageKey.WeekCardFreeAdNum,10);
        TheStorageManager.getInstance().setItem(StorageKey.TodayIsFirstLogIn,0);

        // TaskManager.getInstance().emitTask(TaskItem.累计登录X天);
    }

    /**刷新周更数据，即每周刷新的数据在此更新 */
    refreshWeekData(){
        TheStorageManager.getInstance().setItem(StorageKey.TaskWeekActivityNum,'');
        for(let i = 100;i<501;i+=100){
            TheStorageManager.getInstance().setItem(StorageKey.TaskWeeklyActivityState + i,'');
        }
    }

    /**刷新月更数据，即每月刷新的数据在此更新 */
    refreshMonthData(){
        TheStorageManager.getInstance().setItem(StorageKey.DailySignInNum,'');
        for(let i = 1;i<32;i++){
            TheStorageManager.getInstance().setItem(StorageKey.DailySignInDay + i,'');
            TheStorageManager.getInstance().setItem(StorageKey.DailySignInCumulativeDay + i,'');
        }
    }

    saveSignUnlockHint()
    {
        cc.sys.localStorage.setItem('SignUnlockHint',1);
    }

    /**商店钻石红点信息 */
    getGemFreeRedTip():boolean{
        let storeItemInfo=CommodityInformationManager.getInstance().getJsonCommodityInformation(100101);
        let num=TheStorageManager.getInstance().getNumber(StorageKey.StoreDailyShopNum + 0,0);        
        return num < storeItemInfo.AdPlayableTimes
    }
    getCoinFreeRedTip():boolean{
        let coinData = PurchaseCoinsManager.getInstance().getJsonDataByChapter(LevelManager.getInstance().getFinishChapter());
        let isTip=false;
        coinData.forEach((v,k) =>{            
            if(v.AdReward == 1){
                if(isTip==false && (Number(TheStorageManager.getInstance().getInt(StorageKey.StoreCoinItem + k,0)) < v.AdPlayableTimes)){
                    isTip=true;
                }
            }
        })
        return isTip
    }
    /**招募十连抽 */
    getHeroRecruitingRedTip():boolean{        
        return PropManager.getInstance().getPropNum(PropId.OrdinaryWishingCoin)>=10;
    }
    getPetRecruitingRedTip():boolean{
        let oneDayTime = 60*60*24*1000;
        let currentTime = Date.now();
        if(FunctionDefinitionManager.getInstance().getIsUnlock(FuncType.PetParadise) == true && TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryPetFreeTime,0) + oneDayTime - currentTime <= 0){
            return true
        }
        return false;
    }
    getEquipFreeRedTip():boolean{
        let oneDayTime = 60*60*24*1000;
        let currentTime = Date.now();
        if(TheStorageManager.getInstance().getNumber(StorageKey.StoreMysteryEquipFreeTime,0) + oneDayTime - currentTime <= 0){
            return true
        }
        return false;
    }


    //********************************************账户信息*************************************************   
  

    private getUidJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
        });
    }



}

