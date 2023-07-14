import { FightingInfo } from "../Constants";
import { LoadManager } from "../Loading/LoadManager";
import { MonsterGroupConfigureManager } from "../Monster/Data/MonsterGroupConfigure";
import LanguageManager from "../multiLanguage/LanguageManager";
import { MissionLevelManager, TableMonsterData } from "./MissionLevel";

export class JsonTutorialLevel {
    /**关卡数id */
    public LevelId:number = 0 ;
    /**关卡类型 */
    public LevelTypes:number = 0 ;
    /**章节 */
    public Chapter:number = 0 ;
    /**小关编号 */
    public LevelNum:number = 0 ;
    /**x轴 */
    public PosX:number = 0 ;
    /**y轴 */
    public PosY:number = 0 ;
    /**怪物组配置 */
    public MonsterGroupConfigure:number[] = [] ;
    /**最大波次 */
    public MaxWave:number = 0 ;
    /**怪潮波次 */
    public MonsterTideWave:number[] = [] ;
    /**每波时间间隔 */
    public TimeInterval:number[] = [] ;
    /**怪物等级 */
    public MonsterLevel:number[] = [] ;
    /**血量系数 */
    public HpCoefficient:number[] = [] ;
    /**金币总数量 */
    public PassReward_Coin:number = 0 ;
    /**推荐战力 */
    public RecommendedCombatPower:number = 0 ;
}

export class TutorialLevelManager {
    private static _instance: TutorialLevelManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTutorialLevel>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TutorialLevelManager {
        if(this._instance==null) {
            this._instance=new TutorialLevelManager();
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
        LoadManager.loadJson('TutorialLevel',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTutorialLevel成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTutorialLevel();
                jsonData=json[i];
                this.data.set(jsonData.LevelId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTutorialLevel(id:number):JsonTutorialLevel {
        return this.data.get(id);
    }
    /**根据关卡数id获取关卡类型 */
    public getLevelTypes(id:number): number {
        return this.data.get(id).LevelTypes;
    }
    /**根据关卡数id获取章节 */
    public getChapter(id:number): number {
        return this.data.get(id).Chapter;
    }
    /**根据关卡数id获取小关编号 */
    public getLevelNum(id:number): number {
        return this.data.get(id).LevelNum;
    }
    /**根据关卡数id获取x轴 */
    public getPosX(id:number): number {
        return this.data.get(id).PosX;
    }
    /**根据关卡数id获取y轴 */
    public getPosY(id:number): number {
        return this.data.get(id).PosY;
    }
    /**根据关卡数id获取怪物组配置 */
    public getMonsterGroupConfigure(id:number): number[] {
        return this.data.get(id).MonsterGroupConfigure;
    }
    /**根据关卡数id获取最大波次 */
    public getMaxWave(id:number): number {
        return this.data.get(id).MaxWave;
    }
    /**根据关卡数id获取怪潮波次 */
    public getMonsterTideWave(id:number): number[] {
        return this.data.get(id).MonsterTideWave;
    }
    /**根据关卡数id获取每波时间间隔 */
    public getTimeInterval(id:number): number[] {
        return this.data.get(id).TimeInterval;
    }
    /**根据关卡数id获取怪物等级 */
    public getMonsterLevel(id:number): number[] {
        return this.data.get(id).MonsterLevel;
    }
    /**根据关卡数id获取血量系数 */
    public getHpCoefficient(id:number): number[] {
        return this.data.get(id).HpCoefficient;
    }
    /**根据关卡数id获取金币总数量 */
    public getPassReward_Coin(id:number): number {
        return this.data.get(id).PassReward_Coin;
    }
    /**根据关卡数id获取推荐战力 */
    public getRecommendedCombatPower(id:number): number {
        return this.data.get(id).RecommendedCombatPower;
    }

    /** 静态方法，获取最大的 关卡数id*/
    public static getMaxLevelId():number {
        return ;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    /**获得level的关卡数据 */
    public getFightingInfo(level:number):FightingInfo
    {
        let jsonData=this.getJsonTutorialLevel(level);
        let fightingInfo=new FightingInfo();
        
        fightingInfo.title_name=LanguageManager.getInstance().getStrByTextId(130007)+' '+MissionLevelManager.getInstance().getLevelName(level);
        //背景图片名称    
        let bgIndex=10//(this.getChapter(level)%11);
        let bgName='bg/bg'+bgIndex;
        fightingInfo.bg_name=bgName;
        fightingInfo.wall_name=bgName+'_wall';
        fightingInfo.wave_types=jsonData.MonsterTideWave;
        fightingInfo.wave_refresh_time=jsonData.TimeInterval;
        //怪物信息列表
        let monsterDatas=new Array();
        let monsterGroups=jsonData.MonsterGroupConfigure;
        let MGC=MonsterGroupConfigureManager.getInstance();
        for(let i=0; i<monsterGroups.length; i++){
            let dataArr=new Array();
            let groupId=monsterGroups[i];
            let monsterJsonData=MGC.getJsonMonsterGroupConfigure(groupId)
            for(let n=0; n<monsterJsonData.MonsterId.length; n++){
                let tableMonsterData=new TableMonsterData();
                tableMonsterData.id=monsterJsonData.MonsterId[n];
                tableMonsterData.num=monsterJsonData.MonsterNum[n];
                tableMonsterData.refresh_time=monsterJsonData.RefreshInterval[n];
                tableMonsterData.level=jsonData.MonsterLevel[i];
                tableMonsterData.hp_rate=jsonData.HpCoefficient[i];
                dataArr.push(tableMonsterData);
                fightingInfo.total_monster_num+=tableMonsterData.num;
            }
            monsterDatas.push(dataArr);
        }
        fightingInfo.monster_datas=monsterDatas;
        console.log("新手教程关卡-"+level+"波数:"+monsterGroups.length);
        return fightingInfo;
    }
}
