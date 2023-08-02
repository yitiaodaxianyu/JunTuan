import WXManagerEX from "../../startscene/WXManagerEX";
import { IsDebug } from "../Constants";
import { HeroBaseInfoManager } from "../Hero/Data/HeroBaseInfo";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import TutorailsManager from "../Tutorials/TutorailsManager";
import { FirstCompleteRewardManager } from "./FirstCompleteReward";
import { MissionLevelManager } from "./MissionLevel";
import { OfflineRevenueShowManager } from "./OfflineRevenueShow";
import { TutorialLevelManager } from "./TutorialLevel";

export class LevelManager {

    private static _instance: LevelManager = null;

    private best_level:number=0;

    item_nums:number[]=[];
    is_need_strengthen:boolean=false;
    public maininterfacemap:Map<string,cc.SpriteFrame>=null;

    get finish_level():number
    {        
        return this.best_level;
    }

    set finish_level(level)
    {
        this.saveFinishLevel(level);
    }

    private game_start_level:number=0;

    get start_level():number
    {
        let level=0;
        level=this.game_start_level;
        return level;
    }

    set start_level(level)
    {
        this.saveStartLevel(level);
    }
    
    public static getInstance():LevelManager {
        if(this._instance==null) {
            this._instance=new LevelManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init () {
        // console.log("______________________")
        FirstCompleteRewardManager.getInstance();
        MissionLevelManager.getInstance();
        OfflineRevenueShowManager.getInstance();
        this.loadSpmaininterfacemap()
        this.loadFinishLevel();
        this.loadStartLevel();
        if(!TutorailsManager.getInstance().is_finish_game){            
            TutorialLevelManager.getInstance();
        }
    }
    //-----------------------资源的读取-----------------------------
    

    //-----------------------数据保存与读取-----------------------------
    
    private loadFinishLevel()
    {
        let level=cc.sys.localStorage.getItem('finish_level');
        if(level==="" || level===null)
        {
            level=0;
            this.saveFinishLevel(level);
        }else
        {
            if(level>=1){
                if(TutorailsManager.getInstance().is_finish_game==false){
                    TutorailsManager.getInstance().saveFinishFromGame();
                }
            }
        }
        this.best_level=parseInt(level);     
    }

    private saveFinishLevel(level)
    {
        if(level>this.best_level && level<=MissionLevelManager.getMaxLevel())
        {
            this.best_level=level;
            cc.sys.localStorage.setItem('finish_level',this.best_level);            
        }
    }
    //
    loadStartLevel()
    {
        let level=cc.sys.localStorage.getItem('start_level');
        if(level==="" || level===null)
        {
            level=1;
            this.saveStartLevel(level);
        }else
        {

        }
        this.game_start_level=parseInt(level);     
    }

    saveStartLevel(level)
    {
        if(level<=1)
        {
            level=1;
        }else
        if(level>MissionLevelManager.getMaxLevel())
        {
            level=MissionLevelManager.getMaxLevel();
        }
        this.game_start_level=level;
        cc.sys.localStorage.setItem('start_level',this.game_start_level);              
    }

    saveLevelWave(level:number,wave:number)
    {
        let waveNum=this.getLevelWave(level);
        if(wave>waveNum)
        {
            cc.sys.localStorage.setItem('level_wave_'+level,wave); 
        }        
    }

    getLevelWave(level:number):number
    {
        let wave=cc.sys.localStorage.getItem('level_wave_'+level);
        if(wave==="" || wave===null)
        {
            wave=0;
        }else
        {
            wave=parseInt(wave);
        }
        return wave;
    }

    getPassNum(level:number):number
    {
        let num=cc.sys.localStorage.getItem('pass_level_'+level);
        if(num!=""&&num!=null)
        {
            num=parseInt(num);
        }else
        {
            num=0;
        }
        return num;
    }

    setNotFirstPassLevel(level:number,wave:number)
    {
        cc.sys.localStorage.setItem('pass_level_'+level+'wave_'+wave,1);
    }

    /** 根据关卡获得一个关卡名称*/
    static getLevelName(level:number):string
    {                
        return MissionLevelManager.getInstance().getLevelName(level);
    }
    
    public getFinishChapter():number{
        let level=this.finish_level+1;
        level=level>MissionLevelManager.getMaxLevel()?MissionLevelManager.getMaxLevel():level;
        return MissionLevelManager.getInstance().getChapter(level);
    }

    /**获得level关卡的所有星级，返回数组，1：第一个任务，2：第二个任务，3：第三个任务 */
    getAllLevelStars(level:number):boolean[]{
        let stars=[false,false,false];
        let levelStars=TheStorageManager.getInstance().getJson(StorageKey.LevelStar+level,stars);
        for(let i=0; i<stars.length; i++){
            stars[i]=levelStars[i]>0;
        }
        return stars;
    }
    /**获得level关卡的starIndex的星级，返回是否有星星，1：第一个任务，2：第二个任务，3：第三个任务 */
    getALevelStar(level:number,starIndex:number):boolean{        
        let stars=[false,false,false];
        // console.log("_____",level,starIndex)
        let levelStars=TheStorageManager.getInstance().getJson(StorageKey.LevelStar+level,stars);
        return levelStars[starIndex-1]>0;
    }
    /**保存level的星级数组 */
    saveAllLevelStars(level:number,newStars:boolean[]){
        let stars=[false,false,false];
        let levelStars=TheStorageManager.getInstance().getJson(StorageKey.LevelStar+level,stars);
        for(let i=0; i<stars.length; i++){
            if(levelStars[i]<=0){
                levelStars[i]=newStars[i]?1:0;
            }            
        }
        TheStorageManager.getInstance().setItem(StorageKey.LevelStar+level,JSON.stringify(levelStars));
    }
    /**保存level的starIndex是否有星级 */
    saveALevelStar(level:number,starIndex:number,isHave:boolean=true){
        let stars=[false,false,false];
        let levelStars=TheStorageManager.getInstance().getJson(StorageKey.LevelStar+level,stars);
        if(levelStars[starIndex-1]<=0){
            levelStars[starIndex-1]=isHave?1:0;
            TheStorageManager.getInstance().setItem(StorageKey.LevelStar+level,JSON.stringify(levelStars));
        }
    }

            
    private loadSpmaininterfacemap(){
        if(this.maininterfacemap){
            return;
        }
        this.maininterfacemap=new Map<string,cc.SpriteFrame>();
        WXManagerEX.getInstance().resourcesBundle.loadDir('map/maininterfacemap',cc.SpriteFrame,(error: Error, assets:cc.SpriteFrame[])=>{
            if(error)
            {
                console.log(error);
                return;
            }
            let len=assets.length;
            for(let i=0; i<len; i++)
            {

                let sp=assets[i];
                let name=sp.name;
                this.maininterfacemap.set(name,sp);
            }
        })   
    }

}
