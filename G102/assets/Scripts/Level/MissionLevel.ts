import { LoadManager } from "../Loading/LoadManager";
import { FightingInfo, IsDebug } from "../Constants";
import LanguageManager from "../multiLanguage/LanguageManager";
import { MonsterGroupConfigureManager } from "../Monster/Data/MonsterGroupConfigure";
import { MonsterConfigureManager } from "../Monster/Data/MonsterConfigure";
import { MonsterAttributeManager } from "../Monster/Data/MonsterAttribute";
import { MonsterGrowthAttributesManager } from "../Monster/Data/MonsterGrowthAttributes";
import { MonsterSkillManager } from "../Monster/Data/MonsterSkill";

export class TableMonsterData{
    /**怪物id */
    id:number=50010;
    /**怪物数量 */
    num:number=1;
    /**怪物等级 */
    level:number=1;
    /**怪物hp系数 */
    hp_rate:number=1;
    /**怪物刷新间隔 */
    refresh_time:number=0;
    /**怪物分数（活动模式专用） */
    score:number=10;
}

export class JsonMissionLevel {
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

export class MissionLevelManager {
    private static _instance: MissionLevelManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMissionLevel>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MissionLevelManager {
        if(this._instance==null) {
            this._instance=new MissionLevelManager();
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
        LoadManager.loadJson('MissionLevel',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMissionLevel成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMissionLevel();
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
    public getJsonMissionLevel(id:number):JsonMissionLevel {
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
        return 6;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    /**根据关卡数和波数获得一个id */
    public static getId(level:number,wave:number):number{
        return 10000*level+wave;
    }
    
    /** 静态方法，获取最大的关卡数*/
    public static getMaxLevel():number {
        return 255;
    }
    /**根据关卡数获得该关卡的总波数 */
    public getWaveNumByLevel(level:number):number
    {        
        let num=this.getMonsterGroupConfigure(level).length;
        return num;
    }

    /**获取关卡名字 */
    public getLevelName(level:number):string{
        return this.getChapter(level)+"";
    }

    /**根据id号获取Json的坐标 */
    public getJsonLevelPosXY(id:number):cc.Vec2 {
        let pos=new cc.Vec2(this.getPosX(id),this.getPosY(id))
        return pos;
    }
    /**获得level的关卡数据 */
    public getFightingInfo(level:number):FightingInfo
    {
        let jsonData=this.getJsonMissionLevel(level);
        let fightingInfo=new FightingInfo();
        
        fightingInfo.title_name=LanguageManager.getInstance().getStrByTextId(130007)+' '+this.getLevelName(level);
        //背景图片名称    
        let bgIndex=(this.getChapter(level)%11);
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
        console.log("主线关卡-"+level);
        return fightingInfo;
    }


    public getLevelPos(level:number):cc.Vec2
    {
        let jsonData=this.getJsonMissionLevel(level);
        let pos=cc.v2(jsonData.PosX,jsonData.PosY);
        return pos;
    }

    /**根据一个战力，获得关卡数 */
    public getLevelByZhanli(zhanli:number,type:number):number{
        let level=1;
        //搜索关卡
        let minOffsetZhanli=zhanli;        
        this.data.forEach((jsonData,key)=>{
            if(type==jsonData.LevelTypes){
                let curZhanli=jsonData.RecommendedCombatPower;
                let offsetZL=Math.abs(curZhanli-zhanli);
                if(offsetZL<minOffsetZhanli){
                    minOffsetZhanli=offsetZL;
                    level=key;
                }
            }            
        })
        return level;
    }
    /**根据关卡获取当前关卡对应的章节的最后一关关卡数 */
    public getLastLevel(level:number):number{
        let lastLevel=1;
        //获取当前章节
        let chapter=this.getChapter(level);
        this.data.forEach((v,k)=>{
            if(v.Chapter==chapter){
                lastLevel=v.LevelNum;
            }
        });        
        return lastLevel;
    }
    /**根据章节获取当前章节对应的关卡的最后一关 */
    public getChapterLevel(chapter:number):number{
        let LevelId=1;
        //获取与传过来章节一样的关卡
        this.data.forEach((v,k)=>{
            if(v.Chapter==chapter){
                LevelId=v.LevelId;
            }
        });       
        return LevelId;
    }
    /**获取Json的长度 */
    public getJsonLevelLength():number {
        let pos=this.data.size
        return pos;
    }
    /**获取这个章节的长度 */
    public getJsonLevelchapterLength(number):number {
        let length=0
        this.data.forEach((v,k)=>{
            if(v.Chapter==number){
                length+=1
            }
        });
        return length;
    }
    /**获取这个章节之前章节的全部长度 */
    public getJsonLevelchapterwholeLength(number):number {
        let length=0
        for (let index = 0; index < 1;) {
            number--
            if(number==0){
                number--
                index=2
            }
            if(number>=1){
                this.data.forEach((v,k)=>{
                    if(v.Chapter==number){
                        length+=1
                    }
                });
            }
        }

        return length;
    }

    check(){
        let isHave=false;
        this.data.forEach((v,k)=>{
            if(v.MaxWave!=v.MonsterGroupConfigure.length){
                console.error("关卡"+k+'怪物组配置长度是：'+v.MonsterGroupConfigure.length+",最大长度："+v.MaxWave);
            }
            if(v.MaxWave!=v.TimeInterval.length){
                console.error("关卡"+k+'时间间隔长度是：'+v.TimeInterval.length+",最大长度："+v.MaxWave);
            }
            if(v.MaxWave!=v.HpCoefficient.length){
                console.error("关卡"+k+'血量系数是：'+v.HpCoefficient.length+",最大长度："+v.MaxWave);
            }
            if(v.MaxWave!=v.MonsterLevel.length){
                console.error("关卡"+k+'等级长度是：'+v.MonsterLevel.length+",最大长度："+v.MaxWave);
            }
            let monsterGroupConfigure=v.MonsterGroupConfigure;
            for(let i=0; i<monsterGroupConfigure.length; i++){
                let groupId=monsterGroupConfigure[i];
                let jsonMGC=MonsterGroupConfigureManager.getInstance().getJsonMonsterGroupConfigure(groupId);
                if(!jsonMGC){
                    console.error("怪物组配置id不存在："+groupId);
                    isHave=true;
                }else{
                    //如果存在，查找这个怪物组配置是否有问题
                    if(jsonMGC.MonsterId.length!=jsonMGC.MonsterNum.length){
                        console.error("怪物组配置id和怪物数量存在长度不一致："+groupId);
                    }
                    if(jsonMGC.MonsterId.length!=jsonMGC.RefreshInterval.length){
                        console.error("怪物组配置id和刷新时间存在长度不一致："+groupId);
                    }
                    //如果存在，查找怪物是否存在
                    let monsterArr=jsonMGC.MonsterId;
                    for(let m=0; m<monsterArr.length; m++){
                        let monsterId=monsterArr[m];
                        let jsonMonster=MonsterConfigureManager.getInstance().getJsonMonsterConfigure(monsterId);
                        if(!jsonMonster){
                            console.error("怪物id不存在："+monsterId);
                            isHave=true;
                        }else{
                            //查找等级是否存在
                            let level=v.MonsterLevel[i];
                            let attbId=MonsterGrowthAttributesManager.getId(monsterId,level)
                            let jsonAttb=MonsterGrowthAttributesManager.getInstance().getJsonMonsterGrowthAttributes(attbId);
                            if(!jsonAttb){
                                console.error("怪物属性id不存在："+attbId);
                                isHave=true;
                            }else{
                                //检查技能
                                for(let s=1; s<=jsonMonster.SkillNum; s++){
                                    let skillId=MonsterSkillManager.getInstance().getId(jsonMonster.MonsterId,s,jsonAttb.SkillLevel);
                                    let skillJson=MonsterSkillManager.getInstance().getJsonMonsterSkill(skillId);
                                    if(!skillJson){
                                        console.error("怪物id："+monsterId+"技能id不存在："+skillId);
                                        isHave=true;
                                    }
                                }
                                
                            }
                        }
                    }
                }
            }
        })
        // if(isHave==false){
        //     console.log("关卡检测通过,没问题!");
        // }
        //怪物组配置检测

    }
}
