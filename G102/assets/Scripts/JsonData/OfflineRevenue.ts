
import { EquipmentAttributeManager } from "../Equipment/Data/EquipmentAttribute";
import { LevelManager } from "../Level/LevelManager";
import { LoadManager } from "../Loading/LoadManager";
import { DingYueManager } from "../Payment/DingYueManager";
import { PropId } from "../Prop/PropConfig";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { JackpotManager } from "./Jackpot";
import { RewardData } from "./LevelJsonData";

export class JsonOfflineRevenue {
    /**通关关卡 */
    public PassLevel:number = 0 ;
    /**每分钟金币 */
    public GetGold:number = 0 ;
    /**满溢时间(分钟) */
    public Time:number = 0 ;
    /**掉落装备奖池 */
    public DropJackPot:number = 0 ;
    /**每分钟掉落概率（千分比） */
    public Probability:number = 0 ;
    /**每分钟英雄经验 */
    public GetHeroExp:number = 0 ;
    /**每分钟玩家经验 */
    public GetPlayerExp:number = 0 ;
    /**每分钟晋升石 */
    public GetPromotion:number = 0 ;
    /**每分钟兽粮 */
    public GetAnimalFood:number = 0 ;
    /**每分钟普通精炼石 */
    public GetOrdinaryEnhancementStone:number = 0 ;
    /**每分钟中级精炼石 */
    public GetIntermediateEnhancementStone:number = 0 ;
    /**每分钟高级精炼石 */
    public GetSeniorEnhancementStone:number = 0 ;
}

export class OfflineRevenueManager {
    private static _instance: OfflineRevenueManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonOfflineRevenue>=null;
    private is_load_completed:boolean=false;

    public static getInstance():OfflineRevenueManager {
        if(this._instance==null) {
            this._instance=new OfflineRevenueManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init() {
        if(!this.data) {
            this.loadJson();
        }
    }
    //加载json
    private loadJson() {
        LoadManager.loadJson('OfflineRevenue',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonOfflineRevenue成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonOfflineRevenue();
                jsonData=json[i];
                this.data.set(jsonData.PassLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonOfflineRevenue(id:number):JsonOfflineRevenue {
        return this.data.get(id);
    }
    /**根据通关关卡获取每分钟金币 */
    public getGetGold(id:number): number {
        return this.data.get(id).GetGold;
    }
    /**根据通关关卡获取满溢时间(分钟) */
    public getTime(id:number): number {
        return this.data.get(id).Time;
    }
    /**根据通关关卡获取掉落装备奖池 */
    public getDropJackPot(id:number): number {
        return this.data.get(id).DropJackPot;
    }
    /**根据通关关卡获取每分钟掉落概率（千分比） */
    public getProbability(id:number): number {
        return this.data.get(id).Probability;
    }
    /**根据通关关卡获取每分钟英雄经验 */
    public getGetHeroExp(id:number): number {
        return this.data.get(id).GetHeroExp;
    }
    /**根据通关关卡获取每分钟玩家经验 */
    public getGetPlayerExp(id:number): number {
        return this.data.get(id).GetPlayerExp;
    }
    /**根据通关关卡获取每分钟晋升石 */
    public getGetPromotion(id:number): number {
        return this.data.get(id).GetPromotion;
    }
    /**根据通关关卡获取每分钟兽粮 */
    public getGetAnimalFood(id:number): number {
        return this.data.get(id).GetAnimalFood;
    }
    /**根据通关关卡获取每分钟普通精炼石 */
    public getGetOrdinaryEnhancementStone(id:number): number {
        return this.data.get(id).GetOrdinaryEnhancementStone;
    }
    /**根据通关关卡获取每分钟中级精炼石 */
    public getGetIntermediateEnhancementStone(id:number): number {
        return this.data.get(id).GetIntermediateEnhancementStone;
    }
    /**根据通关关卡获取每分钟高级精炼石 */
    public getGetSeniorEnhancementStone(id:number): number {
        return this.data.get(id).GetSeniorEnhancementStone;
    }

    /** 静态方法，获取最大的 通关关卡*/
    public static getMaxPassLevel():number {
        return 240;
    }

    //以上格式统一，以下写每个json数据的特殊需求


    //已经刷新的分钟数
    private refreshed_min:number=0;
    //已经刷新出来的装备id列表
    private refreshed_equip:number[]=[];

    /**获取已经刷新的分钟数*/
    public getRefreshTime():number{
        return this.refreshed_min;
    }
    /**保存已经刷新的分钟数*/
    public saveRefreshTime(min:number){
        this.refreshed_min=min;
    }

    /**获取已经刷新的装备id列表*/
    public getRefreshEquipId():number[]{
        return this.refreshed_equip;
    }
    /**添加一个装备id到列表*/
    public addRefreshEquipId(id:number){
        this.refreshed_equip.push(id);
    }
    /**获取最新的装备id列表*/
    public getNowEquipIdList():number[]{
        //
        let totalTime=OfflineRevenueManager.getGuaJiMin();
        let remainTime=totalTime-this.getRefreshTime();
        //获取当前的概率（千分比）
        let finishLevel=LevelManager.getInstance().finish_level;
        let rate=this.getProbability(finishLevel);
        // if(IsDebug)
        // rate=rate*10;
        //获取当前使用的奖池id
        let jId=this.getDropJackPot(finishLevel);        
        for(let i=0; i<remainTime; i++){
            let randomIndex=Math.random()*1000;
            if(randomIndex<rate){
                //从奖池里随机一个装备列表
                let rd=JackpotManager.getInstance().getRewardDataById(jId);
                this.addRefreshEquipId(rd.reward_id);
            }
        }
        this.saveRefreshTime(totalTime);
        this.refreshed_equip.sort((a:number,b:number)=>{
            let levelA=EquipmentAttributeManager.getInstance().getStage(a);
            let levelB=EquipmentAttributeManager.getInstance().getStage(b);
            return levelB-levelA;
        });
        return this.refreshed_equip;
    }

    /**获取领取挂机奖励的时间-分,有最大值限制*/
    static getGuaJiMin():number
    {
        let offsetSec=this.getGuaJiSec();
        let offsetMin=Math.floor(offsetSec/60);
        return offsetMin;
    }

    /**获取领取挂机奖励的时间-秒*/
    static getGuaJiSec():number
    {
        let num=cc.sys.localStorage.getItem('guaji_time');
        let curDate = new Date();
        let offsetSec=0;
        //let offsetMin=0;
        if(num!=""&&num!=null)
        {
            num=parseInt(num);
            offsetSec=Math.floor((curDate.getTime()-num)/1000);
        }else
        {
            this.saveGuaJiTime();
        }
        let level=LevelManager.getInstance().finish_level;
        let max=OfflineRevenueManager.getInstance().getTime(level);
        if(offsetSec>max*60)
        offsetSec=max*60;

        // if(IsDebug)
        // offsetSec=60*60;        
        return offsetSec;
    }
    //保存领取时间
    static saveGuaJiTime()
    {
        let curDate = new Date();
        cc.sys.localStorage.setItem('guaji_time',curDate.getTime());
        this._instance.refreshed_min=0;
        this._instance.refreshed_equip=[];
    }

    /**每60分钟的金币奖励-*/
    getOfflineReward60():number
    {
        let level=LevelManager.getInstance().finish_level;
        return this.getGetGold(level)*60;
    }

    /**每分钟的金币奖励-*/
    getOfflineReward():number
    {
        let level=LevelManager.getInstance().finish_level;
        return this.getGetGold(level);
    }

    /**每60分钟的经验奖励-*/
    getOfflineHeroExp60():number
    {
        let level=LevelManager.getInstance().finish_level;
        return this.getGetHeroExp(level)*60;
    }

    /**每分钟的英雄经验奖励-秒*/
    getOfflineHeroExp():number
    {
        let level=LevelManager.getInstance().finish_level;
        return this.getGetHeroExp(level);
    }
    /**每60分钟离线奖励-进阶石 */
    getOfflineHeroStone60():number{
        let level=LevelManager.getInstance().finish_level;
        return this.getGetPromotion(level)*60;
    }
    /**每60分钟离线奖励-兽粮 */
    getOfflineAnimalFood60():number{
        let level=LevelManager.getInstance().finish_level;
        return this.getGetAnimalFood(level)*60;
    }

    /**获得以num分钟离线时间作为奖励 */
    public getRewards(num:number):RewardData[]{
        let finishLevel=LevelManager.getInstance().finish_level;
        let totalTime=num;
        let rewardDatas=new Array();
        let jsonData=this.getJsonOfflineRevenue(finishLevel);
        let coinNum=jsonData.GetGold*totalTime;
        let heroExpNum=jsonData.GetHeroExp*totalTime;
        let userExpNum=jsonData.GetPlayerExp*totalTime;
        //晋升石头
        let stonePromotion=Math.floor(jsonData.GetPromotion*totalTime);
        //普通精炼石
        let jinglian1=Math.floor(jsonData.GetOrdinaryEnhancementStone*totalTime);
        //中级精炼石
        let jinglian2=Math.floor(jsonData.GetIntermediateEnhancementStone*totalTime);
        //高级精炼石
        let jinglian3=Math.floor(jsonData.GetSeniorEnhancementStone*totalTime);

        // let mInfo=DingYueManager.getInstance().getMonthCardInfo();
        // let qInfo=DingYueManager.getInstance().getQuarterCardInfo();
        if(coinNum>0){
            
            coinNum=Math.floor(coinNum);
            let coinRd=new RewardData();
            coinRd.reward_id=PropId.Coin;
            coinRd.reward_num=coinNum;
            rewardDatas.push(coinRd);
        }
        
        if(heroExpNum>0){
            
            heroExpNum=Math.floor(heroExpNum);
            let heroExpRd=new RewardData();
            heroExpRd.reward_id=PropId.HeroExp;
            heroExpRd.reward_num=heroExpNum;
            rewardDatas.push(heroExpRd);
        }
        if(userExpNum){            
            let userExpRd=new RewardData();
            userExpRd.reward_id=PropId.UserExp;
            userExpRd.reward_num=userExpNum;
            rewardDatas.push(userExpRd);
        }
        if(stonePromotion>0){
            
            stonePromotion=Math.floor(stonePromotion);
            let rd=new RewardData();
            rd.reward_id=PropId.HeroStone;
            rd.reward_num=stonePromotion;
            rewardDatas.push(rd);
        }
        if(jinglian1>0){
            let rd=new RewardData();
            rd.reward_id=PropId.ExclusiveWeaponStone1;
            rd.reward_num=jinglian1;
            rewardDatas.push(rd);
        }
        if(jinglian2>0){
            let rd=new RewardData();
            rd.reward_id=PropId.ExclusiveWeaponStone2;
            rd.reward_num=jinglian2;
            rewardDatas.push(rd);
        }
        if(jinglian3>0){
            let rd=new RewardData();
            rd.reward_id=PropId.ExclusiveWeaponStone3;
            rd.reward_num=jinglian3;
            rewardDatas.push(rd);
        }
        //获取当前的概率（千分比）
        let rate=this.getProbability(finishLevel);
        //获取当前使用的奖池id
        let jId=this.getDropJackPot(finishLevel);
        let sdEquip=new Array();
        for(let i=0; i<totalTime; i++){
            let randomIndex=Math.random()*1000;
            if(randomIndex<rate){
                //从奖池里随机一个装备列表
                let rd=JackpotManager.getInstance().getRewardDataById(jId);
                sdEquip.push(rd.reward_id);
            }
        }
        sdEquip.sort((a:number,b:number)=>{
            let levelA=EquipmentAttributeManager.getInstance().getStage(a);
            let levelB=EquipmentAttributeManager.getInstance().getStage(b);
            return levelB-levelA;
        });
        for(let i=0; i<sdEquip.length; i++){
            let id=sdEquip[i];
            let rd=new RewardData();            
            rd.reward_id=id;
            rd.reward_num=1;
            rewardDatas.push(rd);
            //EquipmentManager.getInstance().addEquipment(id);
        }
        return rewardDatas;
    }

    /**是否可以通过广告领取快速挂机 */
    isCanAdFastGuaJi():boolean{
        return TheStorageManager.getInstance().getNumber(StorageKey.CanAdFastOffline,0) == 0
    }

    /**是否可以红点提示挂机按钮 */
    isCanGuaJiRedTip():boolean{
        return OfflineRevenueManager.getGuaJiMin()>=60
    }
}
