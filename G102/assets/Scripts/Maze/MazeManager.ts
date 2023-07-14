import { FightingInfo, GameMode, IsDebug } from "../Constants";
import { HeroManager } from "../Hero/Data/HeroManager";
import { Hero_Type } from "../Hero/Game/HeroConfig";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager, TableMonsterData } from "../Level/MissionLevel";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import LanguageManager from "../multiLanguage/LanguageManager";
import { PetInfo } from "../Pet/PetConfig";
import { PetManager } from "../Pet/PetManager";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { MazeRoadManager } from "./Data/MazeRoad";
import { RogueBuffManager } from "./Data/RogueBuff";
import { RogueConfigurationManager } from "./Data/RogueConfiguration";
import { RogueHexagonTypesManager } from "../copy/voidcrack/RogueHexagonTypes";
import { RogueRewardManager } from "./Data/RogueReward";
// import { RogueShopManager } from "./Data/RogueShop";
import { RogueTextManager } from "./Data/RogueText";
import { RogueLevelManager } from "../copy/voidcrack/RogueLevel";
import { MonsterGroupConfigureManager } from "../Monster/Data/MonsterGroupConfigure";
import Times from "../Turntable/Times";

export interface PropIndex{
    prop_index:number;
    prop_sale:number;
}

export interface ShopPropList{
    box_id:number;
    prop_list:PropIndex[];
}

export class MazeFightingData{
    /**攻击力 % */
    AttackPer:number=0;
    /**暴击值 固定*/
    CriticalValue:number=0;
    /**命中值 固定*/
    HitValue:number=0;
    /**防御力 %*/
    DefensePer:number=0;
    /**伤害减免 %*/
    InjuryReductionPer:number=0;
    /**斩杀效果 %*/
    BeheadPer:number=0;
    /**开局恢复效果 % */
    RecoveryStartPer:number=0;
}

export class MazeManager {

    private static _instance: MazeManager = null;
    
    /**正在战斗的格子id */
    private fighting_id:number=10012;
    /**正在完成了的格子id */
    private passing_id:number=10012;
    /**已经通关了的格子id */
    private passed_ids:number[]=[];

    private fighting_data:MazeFightingData=null;

    private lease_pet_list:PetInfo[]=[];

    public static getInstance():MazeManager {
        if(this._instance==null) {
            this._instance=new MazeManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init () {
        MazeRoadManager.getInstance();
        RogueBuffManager.getInstance();
        RogueConfigurationManager.getInstance();
        RogueHexagonTypesManager.getInstance();
        RogueRewardManager.getInstance();
        // RogueShopManager.getInstance();
        RogueTextManager.getInstance();        
        this.loadData();
    }
    
    //-----------------------数据保存与读取-----------------------------
    private loadData(){
        this.loadFightingId();
        this.loadMazePassedId();
        this.loadPassingId();
        this.loadLeasePetList();
        this.fighting_data=new MazeFightingData();
    }
   
    private loadMazePassedId(){
        this.passed_ids=new Array();
        let ids=TheStorageManager.getInstance().getItem(StorageKey.MazePassId); 
        if(ids==="" || ids===null)
        {
            this.passed_ids.push(RogueHexagonTypesManager.getId(this.getFloor(),1,2));
        }else
        {
            let list=ids.split(',');
            for(let i=0; i<list.length; i++)
            {
                let id=parseInt(list[i]);
                this.passed_ids.push(id);
            }
        }
    }

    resetMazeData(){
        TheStorageManager.getInstance().removeItem(StorageKey.MazeBuffList);        
        TheStorageManager.getInstance().removeItem(StorageKey.MazeFightingId);
        TheStorageManager.getInstance().removeItem(StorageKey.MazePassId);
        TheStorageManager.getInstance().removeItem(StorageKey.MazePassingId);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeShopList);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeUnSelectSpoils);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeBoxIdList);        
        TheStorageManager.getInstance().removeItem(StorageKey.MazeSubHp);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeFloor);

        TheStorageManager.getInstance().removeItem(StorageKey.MazeLeasePetList);
        let buffDate=RogueBuffManager.getInstance().getData();
        buffDate.forEach((v)=>{
            TheStorageManager.getInstance().removeItem(StorageKey.MazeBuffStage+v.RogueBuff_ID);
        });
        let data=RogueHexagonTypesManager.getInstance().getData();
        data.forEach((v)=>{
            TheStorageManager.getInstance().removeItem(StorageKey.MazeRandPetList+v.Hexagon_ID);
        })
        //内存数据也要清空
        this.loadData();
    }

    /**重置楼层数据 */
    resetFloorData(){
        TheStorageManager.getInstance().removeItem(StorageKey.MazeFightingId);
        TheStorageManager.getInstance().removeItem(StorageKey.MazePassId);
        TheStorageManager.getInstance().removeItem(StorageKey.MazePassingId);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeShopList);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeUnSelectSpoils);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeBoxIdList);
        TheStorageManager.getInstance().removeItem(StorageKey.MazeRandPetList);
        this.loadData();
    }

    /**迷宫刚通关的id */
    public getMazePassedIds():number[]{        
        return this.passed_ids;
    }

    public addMazePassedId(id:number):boolean{        
        if(RogueHexagonTypesManager.getInstance().getHexagonType(id)){
            if(!this.passed_ids.includes(id)){
                this.passed_ids.push(id);                
                TheStorageManager.getInstance().setItem(StorageKey.MazePassId,this.passed_ids); 
                return true;
            }            
            return false;
        }
        return false;
        
    }
    
    private loadFightingId(){
        this.fighting_id=TheStorageManager.getInstance().getInt(StorageKey.MazeFightingId,RogueHexagonTypesManager.getId(this.getFloor(),1,2));
    }

    public getFightingId():number{
        return this.fighting_id;
    }

    public setFightingId(id:number):boolean{
        if(RogueHexagonTypesManager.getInstance().getHexagonType(id)){
            this.fighting_id=id;            
            TheStorageManager.getInstance().setItem(StorageKey.MazeFightingId,id);            
            return true;
        }
        return false;
    }

    private loadPassingId(){
        this.passing_id=TheStorageManager.getInstance().getInt(StorageKey.MazePassingId,RogueHexagonTypesManager.getId(this.getFloor(),1,2));
    }

    public getPassingId():number{
        return this.passing_id;
    }

    public setPassingId(id:number):boolean{
        if(RogueHexagonTypesManager.getInstance().getHexagonType(id)){
            this.passing_id=id;
            TheStorageManager.getInstance().setItem(StorageKey.MazePassingId,id);
            if(id==10092){
            }else
            if(id==20092){
            }
            return true;
        }
        return false;
    }

    getFloor():number{
        return TheStorageManager.getInstance().getInt(StorageKey.MazeFloor,1);
    }

    public setFloor(num:number){
        TheStorageManager.getInstance().setItem(StorageKey.MazeFloor,num);
    }

    /**获取当前未选择的战利品 */
    public getUnSelectSpoils():number[]{
        let idList=new Array();
        let ids=TheStorageManager.getInstance().getItem(StorageKey.MazeUnSelectSpoils);
        if(ids==='' || ids===null){

        }else{
            let list=ids.split(',');
            for(let i=0; i<list.length; i++)
            {
                let id=parseInt(list[i]);
                idList.push(id);
            }
        }
        return idList;
    }

    public setUnSelectSpoils(idList:number[]){
        TheStorageManager.getInstance().setItem(StorageKey.MazeUnSelectSpoils,idList);        
    }

    /**获取商店列表 */
    public getAllShopPropList():ShopPropList[]{
        let arrList=new Array();
        let ids=TheStorageManager.getInstance().getItem(StorageKey.MazeShopList);
        if(ids==='' || ids===null){

        }else{
            arrList=JSON.parse(ids);            
        }
        return arrList;
    }
    /**根据id获得一个商店道具的列表 */
    public getAPropIndex(boxId:number):PropIndex[]{
        let listArr=this.getAllShopPropList();
        let list=[];
        for(let i=0; i<listArr.length; i++){
            let obj=listArr[i];
            if(boxId==obj.box_id){
                list=obj.prop_list;
                break;
            }
        }
        return list;
    }

    public setShopProp(list:ShopPropList){
        let listArr=this.getAllShopPropList();
        listArr.push(list);
        TheStorageManager.getInstance().setItem(StorageKey.MazeShopList,JSON.stringify(listArr));    
    }
    /**
     * 
     * @param r1 格子1的行
     * @param r2 格子2的行
     * @param c1 格子1的列
     * @param c2 格子2的列
     * @param even 偶数行
     */
    checkAdjacent(r1:number,c1:number,r2:number,c2:number,r1IsEven:boolean):boolean{
        if(r1IsEven){
            //偶数行是R1，判断大于等于
            let offsetC=c2-c1;
            if(Math.abs(r1-r2)<=1 && offsetC>=0 && Math.abs(offsetC)<=1){
                return true;
            }else{
                return false;
            }
        }else{
           //奇数行是R1，判断大于等于
           let offsetC=c2-c1;
           if(Math.abs(r1-r2)<=1 && offsetC<=0 && Math.abs(offsetC)<=1){
               return true;
           }else{
               return false;
           } 
        }
    }

    /**获得Buff的列表 */
    public getBuffList():number[]{        
        let list=TheStorageManager.getInstance().getIntList(StorageKey.MazeBuffList,[]);
        return list;
    }
    /**是否存在一些buff */
    public isHaveABuff(checkList:number[]):boolean{        
        let isHave=false;
        let list=this.getBuffList();
        for(let n=0; n<checkList.length; n++){
            if(list.indexOf(checkList[n])!=-1){
                return true;
            }
        }        
        return isHave;
    }
    /**检查buff阶段是否可以升级 */
    public checkBuffStage(checkList:number[]){        
        let haveList=[];
        let list=this.getBuffList();
        for(let n=0; n<checkList.length; n++){
            let buffId=checkList[n]
            if(list.indexOf(buffId)!=-1){
                this.addBuffStage(buffId);
            }
        }
        return haveList;
    }

    public addBuff(id:number){
        let list=this.getBuffList();
        list.push(id);
        TheStorageManager.getInstance().setItem(StorageKey.MazeBuffList,list);
    }

    public resetBuffList(){
        TheStorageManager.getInstance().removeItem(StorageKey.MazeBuffList);
    }

    /**获得Buff的列表 */
    public getBuffStage(buffId:number):number{
        let stage=TheStorageManager.getInstance().getInt(StorageKey.MazeBuffStage+buffId,0);
        return stage;
    }

    public addBuffStage(buffId:number){
        let stage=this.getBuffStage(buffId);
        stage+=1;
        TheStorageManager.getInstance().setItem(StorageKey.MazeBuffStage+buffId,stage);
    }

    public resetBuffStage(){
        let idList=RogueBuffManager.getInstance().getBuffIdList();
        for(let i=0; i<idList.length; i++){
            TheStorageManager.getInstance().removeItem(StorageKey.MazeBuffStage+idList[i]);
        }        
    }

    public refreshFightingData():MazeFightingData{
        this.fighting_data=new MazeFightingData();
        let buffList=this.getBuffList();
        let RBM=RogueBuffManager.getInstance();
        for(let i=0; i<buffList.length; i++){
            let buffId=buffList[i];            
            let jsonData=RBM.getJsonRogueBuff(buffId);
            switch(jsonData.RogueBuff_Type){
                case 1:{
                    this.fighting_data.AttackPer+=jsonData.RogueBuff1_Value;
                }break;
                case 2:{
                    let stage=this.getBuffStage(buffId);
                    let value=jsonData.RogueBuff1_Value*stage;
                    if(value>jsonData.RogueBuff2_Value){
                        value=jsonData.RogueBuff2_Value;
                    }
                    this.fighting_data.AttackPer+=value;
                }break;
                case 3:{
                    this.fighting_data.CriticalValue+=jsonData.RogueBuff1_Value;
                }break;
                case 4:{
                    this.fighting_data.HitValue+=jsonData.RogueBuff1_Value;
                }break;
                case 5:{
                    this.fighting_data.DefensePer+=jsonData.RogueBuff1_Value;
                }break;
                case 6:{
                    let stage=this.getBuffStage(buffId);
                    let value=jsonData.RogueBuff1_Value*stage;
                    if(value>jsonData.RogueBuff2_Value){
                        value=jsonData.RogueBuff2_Value;
                    }
                    this.fighting_data.DefensePer+=value;
                }break;
                case 7:{
                    this.fighting_data.InjuryReductionPer+=jsonData.RogueBuff1_Value;
                }break;
                case 8:{
                    this.fighting_data.BeheadPer+=jsonData.RogueBuff1_Value;
                }break;
                case 9:{
                    this.fighting_data.RecoveryStartPer+=jsonData.RogueBuff1_Value;
                }break;
            }
        }
        return this.fighting_data;
    }

    /**获取迷宫地基对应的格子排布二维列表 */
    getGroundBoxIdList():number[][]{
        let idList=[];
        let data=TheStorageManager.getInstance().getItem(StorageKey.MazeBoxIdList);
        if(data==="" || data===null)
        {
            idList=[];
        }else
        {
            idList=JSON.parse(data);
        }
        return idList;
    }

    saveGroundBoxIdList(list:number[][]){
        TheStorageManager.getInstance().setItem(StorageKey.MazeBoxIdList,JSON.stringify(list));
    }

    /**获取当前挑战的信息----迷宫怪物信息/标题信息/背景图片名称 */
    getFightingInfo(fightingId?:number):FightingInfo{
        let jsonData=RogueLevelManager.getInstance().getJsonRogueLevel(fightingId);
        let fightingInfo=new FightingInfo();
        let xagonType= RogueHexagonTypesManager.getInstance().getHexagonType(Times.voidsensid)
        if(xagonType==1){
            fightingInfo.title_name=LanguageManager.getInstance().getStrByTextId(830002);//普通战役
        }
        if(xagonType==3){
            fightingInfo.title_name=LanguageManager.getInstance().getStrByTextId(830003);//普通战役
        }
        if(xagonType==5){
            fightingInfo.title_name=LanguageManager.getInstance().getStrByTextId(830004);//普通战役
        }

        //背景图片名称    
        // let bgIndex=0;
        let bgName='bg/Maze_Bg_Battle';
        fightingInfo.bg_name=bgName;
        fightingInfo.wall_name='bg/Maze_Bg_Wall';
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
        return fightingInfo;
    }
    /**获取剩余的血量 */
    public getMazeHp():number{
        let fullHp=this.getMazeMaxHp();
        let subHp=TheStorageManager.getInstance().getInt(StorageKey.MazeSubHp,0);
        return fullHp-subHp*fullHp;
    }

    public getMazeMaxHp():number{
        let teamList=HeroManager.getInstance().getTeamList(GameMode.Maze);
        let fullHp=0;
        let heroList = HeroManager.getInstance().getHeroList();
        for(let i=0; i<heroList.length; i++){
            if(teamList.includes(heroList[i].hero_type)){                
                fullHp+=HeroManager.getInstance().getHeroData(heroList[i].hero_type).total_hp*0.25;
            }
        }
        if(fullHp<3000)
        {
            fullHp=3000;
        }
        fullHp=Math.round(fullHp);
        return fullHp;
    }

    /**设置迷宫扣掉的血量% */
    public setMazeSubHp(hp:number):boolean{
        TheStorageManager.getInstance().setItem(StorageKey.MazeSubHp,hp);
        return false;
    }
    /**获得租借列表 */
    public getLeasePetList():PetInfo[]{
        return this.lease_pet_list;
    }

    public loadLeasePetList(){        
        let list=TheStorageManager.getInstance().getJson(StorageKey.MazeLeasePetList);
        this.lease_pet_list=new Array();
        if(list){
            for(let i=0; i<list.length; i++){
                let petInfo=new PetInfo();
                let info=list[i];
                petInfo.hero_type=info.hero_type;
                petInfo.pet_awaken_stage=info.pet_awaken_stage;
                petInfo.pet_id=info.pet_id;
                petInfo.pet_level=info.pet_level;
                petInfo.pet_quality=info.pet_quality;
                petInfo.sequence_id=info.sequence_id;
                petInfo.lease_type=info.lease_type;
                this.lease_pet_list.push(petInfo);
            }
        }
    }

    public saveLeasePetList(){
        TheStorageManager.getInstance().setJson(StorageKey.MazeLeasePetList,this.lease_pet_list);
    }

    /**添加一个宠物至租借列表 */
    public addLeasePetList(petInfo:PetInfo){
        let list=this.getLeasePetList();
        list.push(petInfo);
        TheStorageManager.getInstance().setJson(StorageKey.MazeLeasePetList,list);
    }

    resetLeasePetList(){
        TheStorageManager.getInstance().setJson(StorageKey.MazeLeasePetList,[]);
    }

    /**获得租借的已经随机出的列表 */
    public getRandPetList(boxId:number):PetInfo[]{
        let list=TheStorageManager.getInstance().getJson(StorageKey.MazeRandPetList+boxId);
        let petList=new Array();
        if(list){
            //this.pet_list=list;
            for(let i=0; i<list.length; i++){
                let petInfo=new PetInfo();
                let info=list[i];
                petInfo.hero_type=info.hero_type;
                petInfo.pet_awaken_stage=info.pet_awaken_stage;
                petInfo.pet_id=info.pet_id;
                petInfo.pet_level=info.pet_level;
                petInfo.pet_quality=info.pet_quality;
                petInfo.sequence_id=info.sequence_id;
                petInfo.lease_type=info.lease_type;
                petList.push(petInfo);
            }
        }
        return petList;
    }
    /**设置租借的已经随机出的列表 */
    public setRandPetList(boxId:number,petList:PetInfo[]){
        TheStorageManager.getInstance().setJson(StorageKey.MazeRandPetList+boxId,petList);
    }
    /**单方面重置英雄的绑定信息 */
    resetHeroBind(){
        let list=this.getLeasePetList();
        for(let i=0; i<list.length; i++){
            let petInfo=list[i];
            if(petInfo.hero_type!=Hero_Type.NULL){
                // let mainList=PetManager.getInstance().getPetList();
                let isHave=false;
                // for(let m=0; m<mainList.length; m++){
                //     let mainInfo=mainList[m]
                //     if(mainInfo.hero_type==petInfo.hero_type){
                //         HeroManager.getInstance().getHeroData(petInfo.hero_type).pet_info=mainInfo;
                //         isHave=true;
                //         break;
                //     }
                // }
                if(!isHave){
                    HeroManager.getInstance().getHeroData(petInfo.hero_type).pet_info=null;
                }
            }
        }
    }
    /**恢复英雄的绑定，在进入迷宫时调用,如果主列表与迷宫列表的宠物不绑定同一个英雄时或者主列表宠物绑定的英雄为NULL时 */
    recoverHeroBind(){
        // let list=PetManager.getInstance().getPetList();
        let leaseList=this.getLeasePetList();
        for(let m=0; m<leaseList.length; m++){
            let leaseInfo=leaseList[m]
            if(leaseInfo.hero_type!=Hero_Type.NULL){
                let isHave=false;
                // for(let i=0; i<list.length; i++){
                //     let petInfo=list[i];
                //     if(petInfo.hero_type!=Hero_Type.NULL){
                //         if(petInfo.hero_type==leaseInfo.hero_type){
                //             //HeroManager.getInstance().getHeroData(leaseInfo.hero_type).pet_info=leaseInfo;
                //             //如果主线宠物绑定的英雄跟租借宠物绑定的英雄一致，则使用主线的
                //             isHave=true;
                //             leaseInfo.hero_type=Hero_Type.NULL;
                //         }
                //     }
                // }
                if(isHave==false){
                    //如果主线宠物绑定的英雄和租借宠物绑定的英雄没有冲突，则需要租借的绑定英雄
                    HeroManager.getInstance().getHeroData(leaseInfo.hero_type).pet_info=leaseInfo;
                }
            }
        }        
    }
    /**是否重置 */
    checkDate():boolean{
        let startTime=this.getStartDate();
        let endTime=this.getEndTime();
        let offsetTime=Math.floor((endTime-startTime)/1000);
        let day2=2*24*60*60;
        // if(IsDebug){
        //     day2=2*60;
        // }
        if(offsetTime>=day2){
            if(this.getPassingId()!=RogueHexagonTypesManager.getId(this.getFloor(),1,2)){
                FollowManager.getInstance().followEvent(Follow_Type.rogue玩法最终完成的格子数);
            }
            this.setStartDate();
            this.resetMazeData();
            FollowManager.getInstance().followEvent(Follow_Type.rogue玩法开始次数);
            return true;
        }
        return false;
    }

    getEndTime():number{
        let startTime=new Date(2022,8,1,0,0,0,0).getTime();
        //cc.log("日期："+new Date(timeNum).toLocaleString());
        let nowTime=new Date().getTime();
        let offsetTime=nowTime-startTime;
        let offsetDay=Math.floor(offsetTime/(24*60*60*1000));
        let endDay=offsetDay+2-(offsetDay)%2;
        let endTime=startTime+(endDay)*(24*60*60*1000);
        return endTime;
    }

    getRemainTime():number{
        let nowTime=new Date().getTime();
        let remainTimeSec=(this.getEndTime()-nowTime)/1000;
        return remainTimeSec;
    }

    getStartDate():number{
        return TheStorageManager.getInstance().getInt(StorageKey.MazeStartDate,0);
    }

    setStartDate(){
        TheStorageManager.getInstance().setItem(StorageKey.MazeStartDate,new Date().getTime());
    }

}
