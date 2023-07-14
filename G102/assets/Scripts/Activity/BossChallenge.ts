import { HttpManager, AccessName } from ".././NetWork/HttpManager";
import { FightingInfo } from "../Constants";
import { TableMonsterData } from "../Level/MissionLevel";
import { LoadManager } from "../Loading/LoadManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import UserData from "../UserData";
import { UserInfo } from "../UserInfo/UserInfo";
import BossGameUi from "./BossGameUi";

export enum ChallengeMode{
    Noamal=1,
    Hard=2,
    World=3,
}
export class JsonBossChallenge {
    /**挑战ID */
    public ChallengeID:number = 0 ;
    /**轮换顺序 */
    public RotationOrder:number = 0 ;
    /**阶段 */
    public Stage:number = 0 ;
    /**怪物ID */
    public MonsterId:number = 0 ;
    /**承伤上限 */
    public InjuryLimit:number = 0 ;
    /**怪物等级 */
    public MonsterLevel:number = 0 ;
    /**章节场景 */
    public ChapterScene:number = 0 ;
}

export class BossChallengeManager {
    private static _instance: BossChallengeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonBossChallenge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():BossChallengeManager {
        if(this._instance==null) {
            this._instance=new BossChallengeManager();
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
        LoadManager.loadJson('BossChallenge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonBossChallenge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonBossChallenge();
                jsonData=json[i];
                this.data.set(jsonData.ChallengeID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonBossChallenge(id:number):JsonBossChallenge {
        return this.data.get(id);
    }
    /**根据挑战ID获取轮换顺序 */
    public getRotationOrder(id:number): number {
        return this.data.get(id).RotationOrder;
    }
    /**根据挑战ID获取阶段 */
    public getStage(id:number): number {
        return this.data.get(id).Stage;
    }
    /**根据挑战ID获取怪物ID */
    public getMonsterId(id:number): number {
        return this.data.get(id).MonsterId;
    }
    /**根据挑战ID获取承伤上限 */
    public getInjuryLimit(id:number): number {
        return this.data.get(id).InjuryLimit;
    }
    /**根据挑战ID获取怪物等级 */
    public getMonsterLevel(id:number): number {
        return this.data.get(id).MonsterLevel;
    }
    /**根据挑战ID获取章节场景 */
    public getChapterScene(id:number): number {
        return this.data.get(id).ChapterScene;
    }

    /** 静态方法，获取最大的 挑战ID*/
    public static getMaxChallengeID():number {
        return 10047;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    cur_challenge_mode:ChallengeMode=ChallengeMode.Noamal;
    cur_score:number=0;
    boss_challenge_ts:BossGameUi=null;

    public static getId(mode:ChallengeMode,rewardLevel:number):number {
        return 1000*mode+rewardLevel;
    }

    /**获得level的关卡数据 */
    public getFightingInfo(mode:ChallengeMode):FightingInfo
    {
        // console.log("++++++获取关卡数据",)
        let fightingInfo=new FightingInfo();
        //LanguageManager.getInstance().getStrByTextId(0)+
        fightingInfo.title_name=LanguageManager.getInstance().getStrByTextId(820001);


        let md=new TableMonsterData();
        let dataArr=new Array();
        let RotationOrder = UserInfo.getInstance().RotationOrder//1//轮换顺序
        let Stage = 1//阶段
        let ChallengeID = RotationOrder * 1000 + Stage//挑战ID



        //背景图片名称    
        let bgIndex= BossChallengeManager.getInstance().getChapterScene(ChallengeID)+1;
        let bgName='bg/bg'+bgIndex;
        fightingInfo.wall_name=bgName+'_wall';
        fightingInfo.bg_name=bgName;
        fightingInfo.total_monster_num=1;
        fightingInfo.wave_types=[0];
        fightingInfo.wave_refresh_time=[0];
        //怪物信息列表
        let monsterDatas=new Array();
        // this.data.forEach((v,k)=>{
        //     if(mode==1){
        //         let dataArr=new Array();
        //         for(let i=1; i<=1; i++){
        //             let md=new TableMonsterData();
        //             md.id=v.MonsterId;
        //             md.num=1;
        //             md.level=v.MonsterLevel;
        //             dataArr.push(md);
        //             fightingInfo.total_monster_num+=1;
        //         }
        //         monsterDatas.push(dataArr);
        //     }            
        // })

        md.id=BossChallengeManager.getInstance().getMonsterId(ChallengeID)//怪物id//v.MonsterId;
        md.num=1;
        md.level=BossChallengeManager.getInstance().getMonsterLevel(ChallengeID)//v.MonsterLevel;
        dataArr.push(md);
        fightingInfo.total_monster_num+=1;
        monsterDatas.push(dataArr);
        fightingInfo.monster_datas=monsterDatas;
        return fightingInfo;
    }

    addScore(score:number):number{
        this.cur_score+=score;
        return this.boss_challenge_ts.refreshData();
    }

    showProgress():number{
        return this.boss_challenge_ts.refreshData();
    }
    
    getBossChallengeStage(mode:ChallengeMode):number{
        return TheStorageManager.getInstance().getInt(StorageKey.BossChallengeStage+mode,-1);
    }

    saveBossChallengeStage(mode:ChallengeMode,num:number){
        if(num>this.getBossChallengeStage(mode)){
            TheStorageManager.getInstance().setItem(StorageKey.BossChallengeStage+mode,num);
        }        
    }

    setDamageNumber(damageNumber:number){//如果伤害数比之前的伤害数多   s 放进伤害数
        if(damageNumber>this.getMaxDamageNumber()){
            this.saveDamageNumber(damageNumber)
        }
    }
    private saveDamageNumber(damageNumber){//放进伤害数
        UserInfo.getInstance().damageNumber=damageNumber
        HttpManager.post(AccessName.updateUserInfo,this.setCopyDamageNumberJsonString(damageNumber));
        // TheStorageManager.getInstance().setItem(StorageKey.UnlimitedChallengeDamageMax,damageNumber);
    }
    getMaxDamageNumber():number{//现在的伤害数
        let damage=UserInfo.getInstance().damageNumber;
        return damage
    }
    private setCopyDamageNumberJsonString(damageNumber:number):string{
        let uid=UserData.getInstance().getUserID();
        let num=damageNumber;
        return JSON.stringify({
            type:10,
            uid:uid,
            value:num,
        });
    }
}
