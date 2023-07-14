import { HttpManager, AccessName } from ".././NetWork/HttpManager";
import { CumulativeRechargesManager } from "../AccumulatedRecharge/CumulativeRecharges";
import { FightingInfo } from "../Constants";
import { TableMonsterData } from "../Level/MissionLevel";
import { LoadManager } from "../Loading/LoadManager";
import { MonsterAttributeManager } from "../Monster/Data/MonsterAttribute";
import { MonsterConfigureManager } from "../Monster/Data/MonsterConfigure";
import { MonsterGrowthAttributesManager } from "../Monster/Data/MonsterGrowthAttributes";
import LanguageManager from "../multiLanguage/LanguageManager";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import MyTool, { Digits } from "../Tools/MyTool";
import UserData from "../UserData";
import { UserInfo } from "../UserInfo/UserInfo";
import WaveData from "../WaveData";

export class JsonEndlessLevels {
    /**回合 */
    public Round:number = 0 ;
    /**等级上限 */
    public LevelLimit_Upper:number = 0 ;
    /**等级下限 */
    public LevelLimit_Lower:number = 0 ;
    /**怪物数量 */
    public MonsterNum:number[] = [] ;
    /**血量系数 */
    public HpCoefficient:number[] = [] ;
    /**怪潮波次 */
    public MonsterTideWave:number[] = [] ;
    /**每波时间间隔 */
    public TimeInterval:number[] = [] ;
    /**普通怪id */
    public NormalMonster:number[] = [] ;
    /**精英怪id */
    public EliteMonster:number[] = [] ;
    /**精英怪概率 */
    public ProbabilityOfElite:number[] = [] ;
}

export class EndlessLevelsManager {
    private static _instance: EndlessLevelsManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEndlessLevels>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EndlessLevelsManager {
        if(this._instance==null) {
            this._instance=new EndlessLevelsManager();
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
        LoadManager.loadJson('EndlessLevels',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessLevels成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEndlessLevels();
                jsonData=json[i];
                this.data.set(jsonData.Round,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEndlessLevels(id:number):JsonEndlessLevels {
        return this.data.get(id);
    }
    /**根据回合获取等级上限 */
    public getLevelLimit_Upper(id:number): number {
        return this.data.get(id).LevelLimit_Upper;
    }
    /**根据回合获取等级下限 */
    public getLevelLimit_Lower(id:number): number {
        return this.data.get(id).LevelLimit_Lower;
    }
    /**根据回合获取怪物数量 */
    public getMonsterNum(id:number): number[] {
        return this.data.get(id).MonsterNum;
    }
    /**根据回合获取血量系数 */
    public getHpCoefficient(id:number): number[] {
        return this.data.get(id).HpCoefficient;
    }
    /**根据回合获取怪潮波次 */
    public getMonsterTideWave(id:number): number[] {
        return this.data.get(id).MonsterTideWave;
    }
    /**根据回合获取每波时间间隔 */
    public getTimeInterval(id:number): number[] {
        return this.data.get(id).TimeInterval;
    }
    /**根据回合获取普通怪id */
    public getNormalMonster(id:number): number[] {
        return this.data.get(id).NormalMonster;
    }
    /**根据回合获取精英怪id */
    public getEliteMonster(id:number): number[] {
        return this.data.get(id).EliteMonster;
    }
    /**根据回合获取精英怪概率 */
    public getProbabilityOfElite(id:number): number[] {
        return this.data.get(id).ProbabilityOfElite;
    }

    /** 静态方法，获取最大的 回合*/
    public static getMaxRound():number {
        return 85;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    endless_score:number=0;

    /**获得回合数的关卡数据 */
    public getFightingInfo(round:number):FightingInfo
    {
        let fightingInfo=new FightingInfo();
        //LanguageManager.getInstance().getStrByTextId(0)+
        fightingInfo.title_name=LanguageManager.getInstance().getStrByTextId(800001);
        //背景图片名称    
        // let bgIndex=2;
        let bgName="bg/bg_Endless"//'bg/bg'+bgIndex;
        fightingInfo.bg_name=bgName;
        fightingInfo.wall_name="bg/bg5_wall";
        //怪物信息列表
        let monsterDatas=new Array();
        let jsonData=this.getJsonEndlessLevels(round);
        //怪物潮
        fightingInfo.wave_types=jsonData.MonsterTideWave;
        fightingInfo.wave_refresh_time=jsonData.TimeInterval;
        //当前回合的怪物组
        for(let i=0; i<jsonData.MonsterNum.length; i++){
            let dataArr=new Array(); 
            //每波怪的数量
            let monsterNum=jsonData.MonsterNum[i];
            let delayTime=(jsonData.TimeInterval[i]-2)/monsterNum;
            if(delayTime<0){
                delayTime=0;
            }
            for(let n=0; n<monsterNum; n++){
                //每只怪物都要单独随机
                //1.随机怪物等级
                let useLevel=MyTool.randomRangeInt(jsonData.LevelLimit_Lower,jsonData.LevelLimit_Upper,true);
                //2.找出存在该等级的怪物池A
                let monsterArrA=new Array();
                for(let x=0; x<jsonData.NormalMonster.length; x++){
                    let monsterIdA=jsonData.NormalMonster[x];
                    let attriId=MonsterGrowthAttributesManager.getId(monsterIdA,useLevel);
                    //属性表是否包含该id
                    if(MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)){
                        monsterArrA.push(monsterIdA);
                    }
                }
                //存在该等级的精英池A
                let eliteArrA=new Array();
                for(let x=0; x<jsonData.EliteMonster.length; x++){
                    let eliteIdA=jsonData.EliteMonster[x];
                    let attriId=MonsterGrowthAttributesManager.getId(eliteIdA,useLevel);
                    //属性表是否包含该id
                    if(MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)){
                        eliteArrA.push(eliteIdA);
                    }
                }
                if(monsterArrA.length<=0 && eliteArrA.length<=0){
                    cc.error("不存在等级："+useLevel);;
                }
                //3.如果存在精英怪，则优先随机是否有精英怪
                let isHaveElite=false;
                if(eliteArrA.length>0){
                    isHaveElite=Math.random()<jsonData.ProbabilityOfElite[i];
                }
                let useMonsterId=0;
                if(isHaveElite){
                    //随机精英怪
                    useMonsterId=eliteArrA[MyTool.randomRangeInt(0,eliteArrA.length)];
                }else{
                    //随机普通怪
                    useMonsterId=monsterArrA[MyTool.randomRangeInt(0,monsterArrA.length)];
                }
                let md=new TableMonsterData();
                md.id=useMonsterId;
                md.num=1;
                md.level=useLevel;
                md.refresh_time=Math.random()*delayTime;
                dataArr.push(md);
                fightingInfo.total_monster_num+=md.num;
            }
            monsterDatas.push(dataArr);        
        }        
        fightingInfo.monster_datas=monsterDatas;
        
        return fightingInfo;
    }
    /**
     * 获得回合数
     * @param waveNum 波数
     * @returns 回合数
     */
    getRound(waveNum:number):number{//9
        let round=1;
        let totalWave=0;
        this.data.forEach((v,k)=>{
            totalWave+=v.MonsterNum.length;
            if(totalWave<=waveNum){//16<9
                round=v.Round;
                round+=1
            }
        })
        if(round>EndlessLevelsManager.getMaxRound()){
            round=EndlessLevelsManager.getMaxRound()
        }
        // console.log("回合数：",round)
        return round;
    }
    /**
     * 获得这个回合的第一波的波数
     * @param round 回合数
     * @returns 波数
     */
    getWave(round:number):number{//第10波   返回第第二回合第一波=9-1
        let mywave=0;
        let totalWave=0;
        this.data.forEach((v,k)=>{
            if(round>k){
                totalWave+=v.MonsterNum.length;
                mywave=totalWave
            }
        })
        return mywave;
    }
    

    setWave(wave:number){//如果回合数比之前的回合数多   s 放进回合数
        if(wave>this.getMaxWave()){
            this.saveWave(wave)
        }
    }
    private saveWave(wave){//放进回合数
        UserInfo.getInstance().waveNumber=wave
        HttpManager.post(AccessName.updateUserInfo,this.setCopyWaveJsonString(wave));
        // TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamageMax,wave);
    }
    getMaxWave():number{//现在的回合数
        let damage=UserInfo.getInstance().waveNumber;
        return damage
    }

    /**检测表格数据 */
    check(){
        //怪物潮
        //MonsterGrowthAttributesManager.getInstance().getLevel(123);
        this.data.forEach((jsonData,k)=>{
            //当前回合的怪物组
            for(let i=0; i<jsonData.MonsterNum.length; i++){
                //每波怪的数量
                for(let level=jsonData.LevelLimit_Lower; level<=jsonData.LevelLimit_Upper; level++){
                    let monsterArrA=new Array();
                    for(let x=0; x<jsonData.NormalMonster.length; x++){
                        let monsterIdA=jsonData.NormalMonster[x];
                        if(!MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterIdA)){
                            console.error("不存在怪物id:"+monsterIdA);
                        }
                        let attriId=MonsterGrowthAttributesManager.getId(monsterIdA,level);
                        //属性表是否包含该id
                        if(MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)){
                            monsterArrA.push(monsterIdA);
                        }
                    }
                    //存在该等级的精英池A
                    let eliteArrA=new Array();
                    for(let x=0; x<jsonData.EliteMonster.length; x++){
                        let eliteIdA=jsonData.EliteMonster[x];
                        if(!MonsterConfigureManager.getInstance().getJsonMonsterConfigure(eliteIdA)){
                            console.error("不存在精英怪物id:"+eliteIdA);
                        }
                        let attriId=MonsterGrowthAttributesManager.getId(eliteIdA,level);
                        //属性表是否包含该id
                        if(MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attriId)){
                            eliteArrA.push(eliteIdA);
                        }
                    }
                    if(monsterArrA.length<=0 && eliteArrA.length<=0){                        
                        console.error("不存在等级："+level);
                        
                    }
                }
                
            }
        })
        
    }
    private setCopyWaveJsonString(Wave:number):string{
        let uid=UserData.getInstance().getUserID();
        let num=Wave;
        return JSON.stringify({
            type:9,
            uid:uid,
            value:num,
        });
    }
}
