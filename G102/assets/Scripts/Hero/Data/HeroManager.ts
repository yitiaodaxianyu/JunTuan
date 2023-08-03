import { GameMode, IsDebug} from "../../Constants";
import { EquipmentAttributeManager } from "../../Equipment/Data/EquipmentAttribute";
import { EquipmentManager } from "../../Equipment/EquipmentManager";
import { HeroBaseInfoManager } from "./HeroBaseInfo";
import { HeroQualityManager } from "./HeroQuality";
import { LevelUpManager } from "./LevelUp";
import { AssetsEventType, EventManager, RedEventType } from "../../Tools/EventManager";
import { HeroData } from "./HeroData";
import { SkillLevelUnlockManager } from "./SkillLevelUnlock";
import { HeroAttributeManager, JsonHeroAttribute } from "./HeroAttribute";
import { PropManager } from "../../Prop/PropManager";
import { PropId } from "../../Prop/PropConfig";
import { SkillConfigurationManager } from "./SkillConfiguration";
import { PetInfo, PetMessage } from "../../Pet/PetConfig";
import { LevelManager } from "../../Level/LevelManager";
import { EquipInfo, EquipType } from "../../Equipment/EquipConfig";
import { ExclusiveEnhancementManager } from "../../JsonData/ExclusiveEnhancement";
import { TheStorageManager } from "../../Storage/StorageManager";
import { StorageKey } from "../../Storage/StorageConfig";
import { HeroTitleManager } from "./HeroTitle";
import { Hero_Type, HeroInfo } from "../Game/HeroConfig";
import { CombatEffectivenessManager } from "./CombatEffectiveness";
import TaskManager from "../../Task/TaskManager";
import { TaskItem } from "../../Task/TaskEnum";
import GameManager from "../../GameManager";
import { SpiritAttributeManager } from "../../Pet/Data/SpiritAttribute";
import { EWUnlockCostManager } from "../../JsonData/EWUnlockCost";
import { ExclusiveWeaponSkillManager } from "../../JsonData/ExclusiveWeaponSkill";
import UserData from "../../UserData";
import { AccessName, HeroObject, HttpManager } from "../.././NetWork/HttpManager";
import { UserInfo } from "../../UserInfo/UserInfo";
import { ExclusiveWeaponMessageManager } from "../../JsonData/ExclusiveWeaponMessage";
import WXManagerEX from "../../../startscene/WXManagerEX";

/**英雄升级数据 */
export class HeroUpgradeData{
    /**当前的等级 */
    cur_level:number=0;
    /**当前能够升级的最大级 */
    max_level:number=0;
    /**当前等级是否可以升级 */
    is_level:boolean=false;
    /**当前拥有的金币 */
    cur_coin:number=0;
    /**升级需要花费的金币 */
    cost_coin:number=0;
    /**升级金币是否足够 */
    is_coin:boolean=false;
    // /**当前拥有的经验 */
    // cur_exp:number=0;
    // /**升级需要花费的经验 */
    // cost_exp:number=0;
    // /**升级经验是否足够 */
    // is_exp:boolean=false;
    // /**当前拥有的进阶石 */
    // cur_jinjie: number = 0;
    // /**升级需要花费的进阶石 */
    // cost_jinjie: number = 0;
    // /**升级进阶石是否足够 */
    // is_jinjie: boolean = false;
    /**是否能够升级 */
    is_can_up:boolean=false;
}
/**英雄专武数据 */
export class HeroExclusiveData{
    /**当前拥有的道具数量 */
    cur_prop_num:number=0;
    /**升级需要的道具数量 */
    cost_prop_num:number=0;
    /**升级需要的道具id */
    cost_prop_id:number=0;
    /**是否能够升级 */
    is_can_up:boolean=false;
}

export class HeroManager {

    private static _instance: HeroManager = null;
    //资源
    private btn_hero_team:cc.Prefab=null;
    private btn_hero_role:cc.Prefab=null;
    private sprite_atlas:cc.SpriteAtlas=null;
    private sprite_atlass:cc.SpriteAtlas=null;
    // private role_atlas:cc.SpriteAtlas = null;
    private sp_body:Map<number,cc.SpriteFrame>=null;
    private hero_fragment:cc.Prefab=null;
    //英雄数据
    private hero_data:Map<number,HeroData>=null;
    // private hero_level:number[]=[];
    // private hero_quality:number[]=[];
    private hero_list:HeroInfo[] = [];

    //0星可升级40级；1星可到80级；2星到120级；3星到160级；4星到200级；5星到240级.
    public hero_stageList:Array<number>=[40,80,120,160,200,240];

    public static getInstance():HeroManager {
        if(this._instance==null) {
            this._instance=new HeroManager();
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init () {
        HeroBaseInfoManager.getInstance();        
        HeroQualityManager.getInstance();
        LevelUpManager.getInstance();
        SkillLevelUnlockManager.getInstance();
        HeroAttributeManager.getInstance();
        SkillConfigurationManager.getInstance();    
        HeroTitleManager.getInstance();    
        CombatEffectivenessManager.getInstance();
        EWUnlockCostManager.getInstance()
        this.loadTeamPrefab();
        this.loadRolePrefab();
        this.loadFragmentPrefab();
        this.loadSp();     
        // this.loadRoleSp();     
        this.loadSps();
        this.loadBody();
    }
    //-----------------------资源的读取-----------------------------
    private loadTeamPrefab(){
        if(this.btn_hero_team)
        return;
        WXManagerEX.getInstance().resourcesBundle.load('heros/btn_hero_team',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.btn_hero_team=assets;
        });
    }

    private loadRolePrefab(){
        if(this.btn_hero_role)
        return;
        WXManagerEX.getInstance().resourcesBundle.load('heros/btn_hero_role',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.btn_hero_role=assets;            
        });
    }

    private loadFragmentPrefab(){
        if(this.hero_fragment)
        return;
        WXManagerEX.getInstance().resourcesBundle.load('heros/hero_fragment',cc.Prefab,(error: Error, assets:cc.Prefab)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            this.hero_fragment=assets;
        });
    }

    private loadSp(){
        if(this.sprite_atlas)
        return;
        WXManagerEX.getInstance().resourcesBundle.load('heros/hero_list_ui',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            //console.log('加载EquipmentAttribute成功');
            this.sprite_atlas=assets;            
        });
    }

    // private loadRoleSp(){
    //     if(this.role_atlas)
    //     return;
    //     WXManagerEX.getInstance().resourcesBundle.load('heros/role_ui',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
    //         if(error)
    //         {
    //             console.log(error);
    //             return;
    //         }
    //         //console.log('加载EquipmentAttribute成功');
    //         this.role_atlas=assets;            
    //     });
    // }

    private loadSps(){
        if(this.sprite_atlass)
        return;
        WXManagerEX.getInstance().resourcesBundle.load('heros/hero',cc.SpriteAtlas,(error: Error, assets:cc.SpriteAtlas)=>{
            if(error)
            {
                console.log(error);
                return;
            }
            //console.log('加载EquipmentAttribute成功');
            this.sprite_atlass=assets;            
        });
    }
    /**加载立绘主体 */
    private loadBody(){
        if(this.sp_body){
            return;
        }
        this.sp_body=new Map<number,cc.SpriteFrame>();
        WXManagerEX.getInstance().resourcesBundle.loadDir('heros/body',cc.SpriteFrame,(error: Error, assets:cc.SpriteFrame[])=>{
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
                let index=name.lastIndexOf('_');
                if(index!=-1){
                    let heroId=parseInt(name.substring(index+1));
                    this.sp_body.set(heroId,sp);
                }
            }
        })
    }
    

    public getSpriteFrameByName(key:string):cc.SpriteFrame{
        return this.sprite_atlas.getSpriteFrame(key);
    }
    // public getRoleSpriteFrameByName(key:string):cc.SpriteFrame{
    //     return this.role_atlas.getSpriteFrame(key);
    // }
    public getSpriteFrameByNames(key:string):cc.SpriteFrame{
        return this.sprite_atlass.getSpriteFrame(key);
    }


    public getHeroSpriteFrame(heroType:Hero_Type):cc.SpriteFrame{
        return this.getSpriteFrameByName('hero'+heroType);
    }
    public getHeroSpriteFrames(heroType:Hero_Type):cc.SpriteFrame{
        return this.getSpriteFrameByNames('Head_Hero_S_'+heroType);
    }
    /**获得一张英雄的立绘主体 */
    public getHeroBody(heroId:Hero_Type):cc.SpriteFrame{
        return this.sp_body.get(heroId);
    }
    //-----------------------数据保存与读取-----------------------------
    
    onLoadHeroData(){
        this.loadHeroList();
        this.loadAllHeroData();        
    }
    /**
     * 保存当前的拥有的英雄信息
     */
    saveHeroList(){
        TheStorageManager.getInstance().setJson(StorageKey.HeroList,this.hero_list);
        // this.loadHeroList();
        this.loadAllHeroData(); 
    }

    reportHeroList(){
        let list = [];
        this.hero_list.forEach((v,k)=>{
            let heroObject:HeroObject = new HeroObject();
            heroObject.heroId = v.hero_type;
            heroObject.heroLevel = v.hero_level;
            heroObject.heroStage = v.hero_stage;
            heroObject.heroWeaponStage = v.exclusive_equip_stage;
            heroObject.weapons = v.wear1;
            heroObject.armor = v.wear2;
            heroObject.accessories = v.wear3;
            heroObject.shoes = v.wear4;
            heroObject.pet = v.pet_id;
            list.push(heroObject);
        });
        HttpManager.post(AccessName.reportHeroList,this.setHeroListJsonString(list),false);
        TheStorageManager.getInstance().setJson(StorageKey.HeroList,this.hero_list);
    }

    /**
     * 加载英雄信息
     */
    loadHeroList(){
        this.hero_list = new Array();
        let list = UserInfo.getInstance().heroList;
        list.forEach((v,k)=>{
            let heroInfo = new HeroInfo();
            heroInfo.hero_type=v.heroId;
            heroInfo.hero_level=v.heroLevel;
            heroInfo.hero_stage=v.heroStage;
            heroInfo.exclusive_equip_stage=v.heroWeaponStage;
            heroInfo.wear1=v.weapons;
            heroInfo.wear2=v.armor;
            heroInfo.wear3=v.accessories;
            heroInfo.wear4=v.shoes;
            heroInfo.pet_id=v.pet;
            heroInfo.hero_quality=HeroBaseInfoManager.getInstance().getQuality(heroInfo.hero_type);
            this.hero_list.push(heroInfo);
        });
        TheStorageManager.getInstance().setJson(StorageKey.HeroList,this.hero_list);
        // let list = TheStorageManager.getInstance().getJson(StorageKey.HeroList)
        // if(list){
        //     for(let i = 0;i<list.length;i++){
        //         let heroInfo = new HeroInfo();
        //         let info = list[i];
        //         heroInfo.exclusive_equip_stage = info.exclusive_equip_stage;
        //         heroInfo.hero_level = info.hero_level;
        //         heroInfo.hero_quality = info.hero_quality;
        //         heroInfo.hero_type = info.hero_type;
        //         heroInfo.pet_id = info.pet_id;
        //         heroInfo.hero_stage =info.hero_stage;
        //         for(let e=EquipType.WuQi; e<EquipType.Num; e++){
        //             heroInfo["wear"+e]=info["wear"+e];
        //         }
                
        //         this.hero_list.push(heroInfo);
        //     }
        // }
        // HttpManager.post(AccessName.getHeroList,this.getHeroListJsonString(),false).then((data:any)=>{
        //     if(data){
        //         this.hero_list = new Array();
        //         let list = [];
        //         data.forEach((v,k)=>{
                    // let heroInfo = new HeroInfo();
                    // heroInfo.hero_type=v.heroId;
                    // heroInfo.hero_level=v.heroLevel;
                    // heroInfo.hero_stage=v.heroStage;
                    // heroInfo.exclusive_equip_stage=v.heroWeaponStage;
                    // heroInfo.wear1=v.weapons;
                    // heroInfo.wear2=v.armor;
                    // heroInfo.wear3=v.accessories;
                    // heroInfo.wear4=v.shoes;
                    // heroInfo.pet_id=v.pet;
                    // list.push(heroInfo)
        //         });
        //         this.hero_list = list;
        //         if(this.hero_list.length == 0){
        //             let heroInfo = new HeroInfo();
        //             heroInfo.exclusive_equip_stage = 0;
        //             heroInfo.hero_level = 1;
        //             heroInfo.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.ShouWang);
        //             heroInfo.hero_stage = 0;
        //             heroInfo.hero_type = Hero_Type.ShouWang;
        //             heroInfo.pet_id = 0;
        //             this.hero_list.push(heroInfo);
        //             let paoshou = new HeroInfo();
        //             paoshou.exclusive_equip_stage = 0;
        //             paoshou.hero_level = 1;
        //             paoshou.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.PaoShou);
        //             paoshou.hero_stage = 0;
        //             paoshou.hero_type = Hero_Type.PaoShou;
        //             paoshou.pet_id = 0;
        //             this.hero_list.push(paoshou);
        //         }
        //         // this.saveHeroList();
        //         TheStorageManager.getInstance().setJson(StorageKey.HeroList,this.hero_list);
        //         // this.loadAllHeroData();  
        //         // this.reportHeroList();
        //     }
        // });
        // else{
        //     let heroInfo = new HeroInfo();
        //     heroInfo.exclusive_equip_stage = 0;
        //     heroInfo.hero_level = 1;
        //     heroInfo.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.ShouWang);
        //     heroInfo.hero_stage = 0;
        //     heroInfo.hero_type = Hero_Type.ShouWang;
        //     heroInfo.pet_id = 0;
        //     this.hero_list.push(heroInfo);
        //     let paoshou = new HeroInfo();
        //     paoshou.exclusive_equip_stage = 0;
        //     paoshou.hero_level = 1;
        //     paoshou.hero_quality = HeroBaseInfoManager.getInstance().getQuality(Hero_Type.PaoShou);
        //     paoshou.hero_stage = 0;
        //     paoshou.hero_type = Hero_Type.PaoShou;
        //     paoshou.pet_id = 0;
        //     this.hero_list.push(paoshou);
        //     this.saveHeroList();
        // }
    }
    /**
     * 获取已拥有英雄列表
     * @returns 
     */
    getHeroList(){
        return this.hero_list;
    }

    // 增加一个英雄信息
    addHero(heroType:Hero_Type){
        let heroInfo = new HeroInfo();
        heroInfo.hero_type = heroType;
        heroInfo.hero_level = 1;
        heroInfo.hero_quality = HeroBaseInfoManager.getInstance().getQuality(heroType);
        heroInfo.pet_id = 0;
        heroInfo.hero_stage = 0;
        heroInfo.exclusive_equip_stage = 0;
        heroInfo.hero_quality=HeroBaseInfoManager.getInstance().getQuality(heroInfo.hero_type);
        this.hero_list.push(heroInfo);
        this.saveHeroList();
        TaskManager.getInstance().emitTask(TaskItem.累计收集X个英雄);
    }
    /**
     * 查询英雄数据
     * @param heroType 英雄类型
     * @returns 
     */
    public getHeroInfo(heroType:Hero_Type):HeroInfo
    {
        // return this.hero_level[heroType-1];
        let index = -1;
        this.hero_list.forEach((v,k) => {
            if(v.hero_type == heroType){
                index = k;
            }
        })
        if(index < 0){
            return null;
        }
        return this.hero_list[index];
    }

    /**英雄等级 */
    public getHeroLevel(heroType:Hero_Type):number
    {
        let info = this.getHeroInfo(heroType)
        if(info == null) return null;
        return info.hero_level;
    }
    /**增加英雄等级 */
    public addHeroLevel(heroType:Hero_Type):number
    {
        let info = this.getHeroInfo(heroType)
        if(info == null) return null;
        info.hero_level++;
        if(info.hero_level == 10){
            TaskManager.getInstance().emitTask(TaskItem.将任意X名英雄升到10级);
        }
        if(info.hero_level > TaskManager.getInstance().getTaskNowProgress(TaskItem.累计1个英雄升到X级)){
            TaskManager.getInstance().emitTask(TaskItem.累计1个英雄升到X级);
        }
        if(info.hero_level >= HeroBaseInfoManager.getInstance().getMaxLevel(heroType)){
            info.hero_level = HeroBaseInfoManager.getInstance().getMaxLevel(heroType);
        }
        this.saveHeroList();
    }
    /**重置英雄等级 */
    public resetHeroLvel(heroType:Hero_Type){
        let info = this.getHeroInfo(heroType);
        info.hero_level = 1;
        this.saveHeroList();
    }
    /**英雄品质 */
    public getHeroQuality(heroType:Hero_Type):number
    {
        let info = this.getHeroInfo(heroType)
        if(info == null) return null;
        return info.hero_quality;
    } 
    /**
     * 获取英雄的专武等级
     * @param heroType 英雄类型
     * @returns 
     */
    getExclusiveEquipLevel(heroType:Hero_Type):number{
        let info = this.getHeroInfo(heroType)
        if(info == null) return null;
        return info.exclusive_equip_stage;
    }
    /**
     * 增加英雄的专武等级
     * @param heroType 英雄类型
     */
    addExclusiveEquipLevel(heroType:Hero_Type){
        let info = this.getHeroInfo(heroType)
        info.exclusive_equip_stage ++;
        this.saveHeroList();
    }
    /**
     * 设置英雄的专武等级
     * @param heroType 英雄类型
     * @param num 设置的等级
     */
    setExclusiveEquipLevel(heroType:Hero_Type,num:number){
        let info = this.getHeroInfo(heroType)
        if(info == null) return null;
        info.exclusive_equip_stage = num;
        this.saveHeroList();
    }
    /**
     * 获取英雄的阶段
     * @param heroType 
     * @returns 
     */
    getHeroStage(heroType:Hero_Type){
        let info = this.getHeroInfo(heroType);
        if(info == null) return null;
        return info.hero_stage;
    }

    addHeroStage(heroType:Hero_Type){
        let info = this.getHeroInfo(heroType);
        info.hero_stage ++;
        if(heroType == Hero_Type.PaoShou && info.hero_stage == 6){
            TaskManager.getInstance().emitTask(TaskItem.将炮手升至1大星);
        }
        if(info.hero_stage % 6 == 0
            && Math.floor(info.hero_stage / 6) > TaskManager.getInstance().getTaskNowProgress(TaskItem.累计1个英雄升到X星) ){
                TaskManager.getInstance().emitTask(TaskItem.累计1个英雄升到X星);
        }
        if(info.hero_stage >= HeroBaseInfoManager.getInstance().getMaxStage(heroType)){
            info.hero_stage = HeroBaseInfoManager.getInstance().getMaxStage(heroType);
        }
        this.saveHeroList();
    }

    checkCanAddHeroStage(heroType:Hero_Type):boolean{
        
        return true;
    }

    //只有更改的时候再保存到文件，减少文件读取次数
    // public addHeroLevel(heroType:Hero_Type,level:number)
    // {
    //     let info = this.getHeroInfo(heroType);
    //     let nowLevel=info.hero_level+level;
    //     if(nowLevel<=LevelUpManager.getMaxLevel())
    //         this.saveHeroLevel(heroType,nowLevel);
    // }

    // public saveHeroLevel(heroType:Hero_Type,level:number)
    // {        
    //     if(level>LevelUpManager.getMaxLevel())
    //     {
    //         level=LevelUpManager.getMaxLevel();
    //     }
    //     let info = this.getHeroInfo(heroType);
    //     info.hero_level=level;
    //     this.saveHeroList();            
    // }

    getTeamList(type:GameMode):Hero_Type[]
    {
        let team=new Array();
        for(let i=0;i<5;i++)
        {
            team.push(-1);
        }
        let teamStr:string=cc.sys.localStorage.getItem('team_list_'+type);
        if(teamStr==="" || teamStr===null)
        {
            if(type==GameMode.Main){
                // team[1]=(Hero_Type.DeLuYi);
                // team[2]=(Hero_Type.ShouWang);
                // team[3]=(Hero_Type.PaoShou);
                team[2]=(Hero_Type.ShouWang);
                this.saveTeamList(type,team);                
            }else{
                team=this.getTeamList(GameMode.Main);
            }
            
        }else{
            let list=teamStr.split(',');
            for(let i=0; i<list.length; i++)
            {
                let heroType=parseInt(list[i]);
                let isJoin=heroType>0&&this.getHeroLevel(heroType)>0;
                team[i]=isJoin?heroType:-1;                
            }
        }
        return team;
    }

    saveTeamList(type:GameMode,temp:Hero_Type[])
    {
        cc.sys.localStorage.setItem('team_list_'+type,temp.toString());
    }

    //加载所有的英雄数据
    loadAllHeroData()
    {
        //需要根据军衔等级，装备等级，英雄等级
        this.hero_data=new Map<number,HeroData>();
        let heroList = HeroManager.getInstance().getHeroList();
        for(let i=0; i<heroList.length; i++)
        {
            this.loadHeroData(heroList[i].hero_type);
        }
    }

    loadHeroData(heroType:Hero_Type):HeroData
    {
        // if(this.getHeroLevel(heroType)<=0){
        //     return null;
        // }
        let localHD=this.hero_data.get(heroType);
        if(!localHD){
            localHD=new HeroData();
        }
        // 宠物属性定义
        let petAtk = 0,petDefence = 0,petHealth = 0,petHit = 0,petMiss = 0,petCritical = 0,petAntiCritical = 0,petExtraCritical = 0,petAntiExtraCritical = 0;
        // 专属武器的加成
        let exHp = 0,exAttack = 0,exDefense = 0;
        //--固定属性
        let attributeData:JsonHeroAttribute = HeroAttributeManager.getInstance().getJsonDataByHeroTypeAndStage(heroType,this.getHeroStage(heroType));
        let heroInfo:HeroInfo = this.getHeroInfo(heroType);
        
        localHD.fixed_hp = (heroInfo.hero_level * attributeData.GrowthHealth) + attributeData.BaseHealth;
        localHD.fixed_attck = (heroInfo.hero_level * attributeData.GrowthAttack) + attributeData.BaseAttack;
        localHD.fix_defense = (heroInfo.hero_level * attributeData.GrowthDefense) + attributeData.BaseDefense;
        // 专属武器数据获取
        let exStage = this.getExclusiveEquipLevel(heroType)
        if(exStage > 0){
            let exJsonData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(heroType,exStage);
            exHp = (exJsonData.Health) * localHD.fixed_hp;
            exAttack = (exJsonData.Attack) * localHD.fixed_attck;
            exDefense = (exJsonData.Defense) * localHD.fix_defense;
        }

        // 宠物数据获取
        let petId = HeroManager.getInstance().getWearPet(heroType);
        if(petId!=0){
            let petInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
            petAtk = petInfo.Attack;
            petDefence = petInfo.Defense;
            petHealth = petInfo.Health;
            petHit = petInfo.Hit;
            petMiss = petInfo.Miss;
            petCritical = petInfo.Critical;
            petAntiCritical = petInfo.AntiCritical;
            petExtraCritical = petInfo.ExtraCritical;
            petAntiExtraCritical = petInfo.AntiExtraCritical;
        }
        localHD.pet_id=petId;
        // 命中值
        localHD.Hit = attributeData.Hit + petHit;
        // 闪避值
        localHD.Miss = attributeData.Miss + petMiss;
        // 暴击值
        localHD.Critical = attributeData.Critical + petCritical;
        // 防爆值
        localHD.AntiCritical = attributeData.AntiCritical + petAntiCritical;
        // 暴击增幅
        localHD.ExtraCritical = attributeData.ExtraCritical + petExtraCritical;
        // 暴击抗性
        localHD.AntiExtraCritical = attributeData.AntiExtraCritical + petAntiExtraCritical;

        // 攻速
        let HBIM = HeroBaseInfoManager.getInstance();
        localHD.base_jiange = 1/HBIM.getBaseSpeed(heroType);
        localHD.gongji_jiange = 1/HBIM.getBaseSpeed(heroType);
        localHD.atkSpeed = HBIM.getBaseSpeed(heroType);
        localHD.bullet_speed = HBIM.getBaseBulletSpeed(heroType);
        localHD.gongji_fanwei = HBIM.getAttackRange(heroType);

        // 武器加成
        let allWeaponHp = 0,allWeaponAtk = 0,allWeaponDefence = 0;
        for(let i = EquipType.WuQi;i<EquipType.Num;i++){
            let weaponInfo = heroInfo["wear"+i];
            if(weaponInfo != 0){
                let weaponData = EquipmentManager.getInstance().getAttributesadditional(weaponInfo);
                allWeaponAtk += weaponData[0];
                allWeaponDefence += weaponData[1];
                allWeaponHp += weaponData[2];
            }
        }

        // --总值
        localHD.Attack = localHD.total_attack = localHD.fixed_attck + allWeaponAtk + petAtk + exAttack;
        localHD.Health = localHD.total_hp = localHD.fixed_hp + allWeaponHp + petHealth + exHp;
        localHD.Defense = localHD.total_defense = localHD.fix_defense + allWeaponDefence + petDefence + exDefense;

        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType,heroInfo.hero_stage) + 1;

        localHD.ColdDown=new Map<number,number>();
        localHD.SkillValue_x=new Map<number,number>();
        localHD.SkillValue_y=new Map<number,number>();
        localHD.SkillValue_z=new Map<number,number>();
        localHD.SkillValue_4=new Map<number,number>();  
        localHD.unlock_state=new Map<number,boolean>();
        for(let s=1; s<=4; s++){
            let jsonData=SkillConfigurationManager.getInstance().getJsonDataByHeroTypeAndSkillPosAndSkillLevel(heroType,s,star);
            if(jsonData == null) continue;
            localHD.SkillValue_x.set(s,jsonData.SkillValue_1);
            localHD.SkillValue_y.set(s,jsonData.SkillValue_2);
            localHD.SkillValue_z.set(s,jsonData.SkillValue_3);
            localHD.SkillValue_4.set(s,jsonData.SkillValue_4);
            localHD.ColdDown.set(s,jsonData.ColdDown);
            localHD.unlock_state.set(s,heroInfo.hero_level>=SkillLevelUnlockManager.getInstance().getHeroLevel(s));
        }
        for(let s=1; s<=4; s++){
            if(exStage>0){
                let exId=ExclusiveEnhancementManager.getInstance().getId(heroType,exStage);
                let exStar=ExclusiveEnhancementManager.getInstance().getStar(exId);
                let exSkillId=ExclusiveWeaponSkillManager.getInstance().getId(heroType,exStar+1);
                let jsonData=ExclusiveWeaponSkillManager.getInstance().getJsonExclusiveWeaponSkill(exSkillId);
                if(jsonData == null) continue;
                localHD["ExclusiveWeaponSkillValue_"+s]=jsonData["ExclusiveWeaponSkillValue_"+s];
            }            
        }
        this.hero_data.set(heroType,localHD);
        return localHD;

        //localHD=this.getBaseHeroData(i);
        // //攻击范围
        // let heroStage=this.getHeroStage(heroType);
        // //let heroQuality=this.getHeroQuality(heroType);
        // //let heroTier=HeroQualityManager.getInstance().getTier(heroQuality);
        // let hamId=HeroAttributeManager.getId(heroType,heroStage);
        // let jsonHAM=HeroAttributeManager.getInstance().getJsonHeroAttribute(hamId);
        // //-------------------------------攻击攻速暴击爆率等--------------------------
        // //攻击力,基本攻击
        // let baseGJ=jsonHAM.Attack;
        // let equipAttack=0;
        // /**额外百分比攻速 */
        // let equipAttackSpeed= 0 ;
        // /**防御力 */
        // let equipDefense = 0 ;
        // /**生命值 */
        // let equipHealth = 0 ;
        // let eim=EquipmentManager.getInstance();
        // let eam=EquipmentAttributeManager.getInstance();
        // for(let i=EquipType.WuQi; i<EquipType.Num; i++)
        // {
        //     let wearEquipInfo=eim.getNewWearEquipment(heroType,i);
        //     if(wearEquipInfo)
        //     {
        //         let jsonData=eam.getJsonEquipmentAttribute(wearEquipInfo.equip_id);
        //         //这里是相加
        //         equipAttack+=jsonData.Attack;
        //         equipAttackSpeed+=jsonData.AttackSpeed;
        //         equipDefense+=jsonData.Defense;
        //         equipHealth+=jsonData.Health;
        //     }
        // }
        // //宠物加成
        // let petGJ=0;
        // let peDefense=0;
        // let petHealth=0;
        // let petMiss=0;
        // let petCritical=0;
        // let petExtraCritical=0;
        // let petAntiCritical=0;
        // let petAntiExtraCritical=0;
        // let petHit=0;
        // //
        // if(localHD.pet_info){
        //     let petData=PetManager.getInstance().getPetData(localHD.pet_info);
        //     petGJ=petData.Attack;
        //     peDefense=petData.Defense;
        //     petHealth=petData.Health;
        //     petMiss=petData.Miss;
        //     petCritical=petData.Critical;
        //     petExtraCritical=petData.ExtraCritical;
        //     petAntiCritical=petData.AntiCritical;
        //     petAntiExtraCritical=petData.AntiExtraCritical;
        //     petHit=petData.Hit;
        // }
        // //专属武器加成(%,除了暴击值和命中值是具体数值，其他的都是百分比数值)
        // let exGJ=0;
        // let exDefense=0;
        // let exHealth=0;
        // let exMiss=0;
        // let exCritical=0;
        // let exExtraCritical=0;
        // let exAntiCritical=0;
        // let exAntiExtraCritical=0;
        // let exHit=0;
        // //专武等级
        // localHD.hero_info = this.getHeroInfo(heroType);
        // if(localHD.hero_info.exclusive_equip_level>=0){
        //     let exId=ExclusiveEnhancementManager.getId(heroType,localHD.hero_info.exclusive_equip_level);
        //     let exJsonData=ExclusiveEnhancementManager.getInstance().getJsonExclusiveEnhancement(exId);
        //     exGJ=exJsonData.Attack;
        //     exDefense=exJsonData.Defense;
        //     exHealth=exJsonData.Health;
        //     exMiss=exJsonData.Miss;
        //     exCritical=exJsonData.Critical;
        //     exExtraCritical=exJsonData.ExtraCritical;
        //     exAntiCritical=exJsonData.AntiCritical;
        //     exAntiExtraCritical=exJsonData.AntiExtraCritical;
        //     exHit=exJsonData.Hit;
        //     //专武技能参数            
        //     let skillId=ExclusiveWeaponSkillManager.getId(ExclusiveWeaponSkillManager.getInstance().getExStage(localHD.hero_info.exclusive_equip_level),heroType);
        //     let exSkillJsonData=ExclusiveWeaponSkillManager.getInstance().getJsonExclusiveWeaponSkill(skillId);
        //     localHD.ExclusiveWeaponSkillValue_1=exSkillJsonData.ExclusiveWeaponSkillValue_1;
        //     localHD.ExclusiveWeaponSkillValue_2=exSkillJsonData.ExclusiveWeaponSkillValue_2;
        //     localHD.ExclusiveWeaponSkillValue_3=exSkillJsonData.ExclusiveWeaponSkillValue_3;
        //     localHD.ExclusiveWeaponSkillValue_4=exSkillJsonData.ExclusiveWeaponSkillValue_4;
        // }
        
        // //攻击力=基础攻击力*（%+%）
        // //固定攻击力        
        // let totalGJ=(baseGJ+equipAttack+petGJ);
        // let fixAttack=totalGJ;
        // localHD.fixed_attck=fixAttack;
        // totalGJ+=totalGJ*(exGJ);
        // localHD.total_attack=Math.round(totalGJ);
        // localHD.Attack=localHD.total_attack;        
        // //基础攻击速度*（装备%+装备附加%）,这里得到的值是每秒攻击次数
        // //let talentGS=TalentManager.getInstance().getTalentData(TalentType.AttSpeed);
        // let attSpeed=HeroBaseInfoManager.getInstance().getBaseSpeed(heroType);
        // localHD.base_jiange=1/attSpeed;
        // //直接加天赋的
        // attSpeed+=attSpeed*((equipAttackSpeed)/100);
        // //转换成多少秒攻击一次,即攻击间隔
        // localHD.gongji_jiange=1/attSpeed;        
        // //防御力
        // let baseDefense=jsonHAM.Defense;
        // localHD.Defense=baseDefense+peDefense+equipDefense;
        // localHD.Defense+=localHD.Defense*(exDefense);
        // //生命值
        // let baseHp=jsonHAM.Health;
        // localHD.fixed_hp=baseHp+petHealth+equipHealth;
        // localHD.total_hp=localHD.fixed_hp+localHD.fixed_hp*(exHealth);
        // localHD.Health=localHD.total_hp;
        // //命中值
        // let baseHit=jsonHAM.Hit;
        // localHD.Hit=baseHit+petHit+exHit;
        // //闪避值
        // let baseMiss=jsonHAM.Miss;
        // localHD.Miss=baseMiss+petMiss;
        // localHD.Miss+=localHD.Miss*(exMiss);
        // //暴击值
        // let baseCritical=jsonHAM.Critical;
        // localHD.Critical=baseCritical+petCritical+exCritical;
        // //暴击增幅
        // let baseExtraCritical=jsonHAM.ExtraCritical;
        // localHD.ExtraCritical=baseExtraCritical+petExtraCritical;
        // localHD.ExtraCritical+=localHD.ExtraCritical*(exExtraCritical);
        // //防暴值
        // let baseAntiCritical=jsonHAM.AntiCritical;
        // localHD.AntiCritical=baseAntiCritical+petAntiCritical;
        // localHD.AntiCritical+=localHD.AntiCritical*(exAntiCritical);
        // //暴击抗性
        // let baseAntiExtraCritical=jsonHAM.AntiExtraCritical;
        // localHD.AntiExtraCritical=baseAntiExtraCritical+petAntiExtraCritical;
        // localHD.AntiExtraCritical+=localHD.AntiExtraCritical*(exAntiExtraCritical);
        // //
        // localHD.ColdDown=new Map<number,number>();
        // localHD.SkillValue_x=new Map<number,number>();
        // localHD.SkillValue_y=new Map<number,number>();
        // localHD.SkillValue_z=new Map<number,number>();
        // localHD.SkillValue_4=new Map<number,number>();        
        // //3个技能槽的
        // for(let s=1; s<=3; s++){
        //     let skillLevel=SkillLevelUnlockManager.getInstance().getSkillLevel(s,heroStage);
        //     if(skillLevel>0){
        //         let skillId=SkillLevelUnlockManager.getId(s,skillLevel);
        //         let skillLevelId=SkillConfigurationManager.getId(heroType,skillId);
        //         let jsonData=SkillConfigurationManager.getInstance().getJsonSkillConfiguration(skillLevelId);
        //         localHD.SkillValue_x.set(s,jsonData.SkillValue_1);
        //         localHD.SkillValue_y.set(s,jsonData.SkillValue_2);
        //         localHD.SkillValue_z.set(s,jsonData.SkillValue_3);
        //         localHD.SkillValue_4.set(s,jsonData.SkillValue_4);
        //         localHD.ColdDown.set(s,jsonData.ColdDown);
        //     }else{
                
        //     }
        // }
        // this.hero_data.set(heroType,localHD);
        // return localHD;
    }

    getTryPlayHeroData(heroInfo:HeroInfo):HeroData{
        let localHD=new HeroData();
        // 宠物属性定义
        let petAtk = 0,petDefence = 0,petHealth = 0,petHit = 0,petMiss = 0,petCritical = 0,petAntiCritical = 0,petExtraCritical = 0,petAntiExtraCritical = 0;
        // 专属武器的加成
        let exHp = 0,exAttack = 0,exDefense = 0;
        //--固定属性
        let attributeData:JsonHeroAttribute = HeroAttributeManager.getInstance().getJsonDataByHeroTypeAndStage(heroInfo.hero_type,heroInfo.hero_stage);
        
        localHD.fixed_hp = (heroInfo.hero_level * attributeData.GrowthHealth) + attributeData.BaseHealth;
        localHD.fixed_attck = (heroInfo.hero_level * attributeData.GrowthAttack) + attributeData.BaseAttack;
        localHD.fix_defense = (heroInfo.hero_level * attributeData.GrowthDefense) + attributeData.BaseDefense;
        // 专属武器数据获取
        let exStage = heroInfo.exclusive_equip_stage;
        if(exStage > 0){
            let exJsonData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(heroInfo.hero_type,exStage);
            exHp = (exJsonData.Health) * localHD.fixed_hp;
            exAttack = (exJsonData.Attack) * localHD.fixed_attck;
            exDefense = (exJsonData.Defense) * localHD.fix_defense;
        }

        // 宠物数据获取
        let petId = heroInfo.pet_id;
        if(petId!=0){
            let petInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
            petAtk = petInfo.Attack;
            petDefence = petInfo.Defense;
            petHealth = petInfo.Health;
            petHit = petInfo.Hit;
            petMiss = petInfo.Miss;
            petCritical = petInfo.Critical;
            petAntiCritical = petInfo.AntiCritical;
            petExtraCritical = petInfo.ExtraCritical;
            petAntiExtraCritical = petInfo.AntiExtraCritical;
        }
        localHD.pet_id=petId;
        // 命中值
        localHD.Hit = attributeData.Hit + petHit;
        // 闪避值
        localHD.Miss = attributeData.Miss + petMiss;
        // 暴击值
        localHD.Critical = attributeData.Critical + petCritical;
        // 防爆值
        localHD.AntiCritical = attributeData.AntiCritical + petAntiCritical;
        // 暴击增幅
        localHD.ExtraCritical = attributeData.ExtraCritical + petExtraCritical;
        // 暴击抗性
        localHD.AntiExtraCritical = attributeData.AntiExtraCritical + petAntiExtraCritical;

        // 攻速
        let HBIM = HeroBaseInfoManager.getInstance();
        localHD.base_jiange = 1/HBIM.getBaseSpeed(heroInfo.hero_type);
        localHD.gongji_jiange = 1/HBIM.getBaseSpeed(heroInfo.hero_type);
        localHD.atkSpeed = HBIM.getBaseSpeed(heroInfo.hero_type);
        localHD.bullet_speed = HBIM.getBaseBulletSpeed(heroInfo.hero_type);
        localHD.gongji_fanwei = HBIM.getAttackRange(heroInfo.hero_type);

        // 武器加成
        let allWeaponHp = 0,allWeaponAtk = 0,allWeaponDefence = 0;
        for(let i = EquipType.WuQi;i<EquipType.Num;i++){
            let weaponInfo = heroInfo["wear"+i];
            if(weaponInfo != 0){
                let weaponData = EquipmentManager.getInstance().getAttributesadditional(weaponInfo);
                allWeaponAtk += weaponData[0];
                allWeaponDefence += weaponData[1];
                allWeaponHp += weaponData[2];
            }
        }

        // --总值
        localHD.Attack = localHD.total_attack = localHD.fixed_attck + allWeaponAtk + petAtk + exAttack;
        localHD.Health = localHD.total_hp = localHD.fixed_hp + allWeaponHp + petHealth + exHp;
        localHD.Defense = localHD.total_defense = localHD.fix_defense + allWeaponDefence + petDefence + exDefense;

        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroInfo.hero_type,heroInfo.hero_stage) + 1;

        localHD.ColdDown=new Map<number,number>();
        localHD.SkillValue_x=new Map<number,number>();
        localHD.SkillValue_y=new Map<number,number>();
        localHD.SkillValue_z=new Map<number,number>();
        localHD.SkillValue_4=new Map<number,number>();  
        localHD.unlock_state=new Map<number,boolean>();
        for(let s=1; s<=4; s++){
            let jsonData=SkillConfigurationManager.getInstance().getJsonDataByHeroTypeAndSkillPosAndSkillLevel(heroInfo.hero_type,s,star);
            if(jsonData == null) continue;
            localHD.SkillValue_x.set(s,jsonData.SkillValue_1);
            localHD.SkillValue_y.set(s,jsonData.SkillValue_2);
            localHD.SkillValue_z.set(s,jsonData.SkillValue_3);
            localHD.SkillValue_4.set(s,jsonData.SkillValue_4);
            localHD.ColdDown.set(s,jsonData.ColdDown);
            localHD.unlock_state.set(s,heroInfo.hero_level>=SkillLevelUnlockManager.getInstance().getHeroLevel(s));
        }
        for(let s=1; s<=4; s++){
            if(exStage>0){
                let exId=ExclusiveEnhancementManager.getInstance().getId(heroInfo.hero_type,exStage);
                let exStar=ExclusiveEnhancementManager.getInstance().getStar(exId);
                let exSkillId=ExclusiveWeaponSkillManager.getInstance().getId(heroInfo.hero_type,exStar+1);
                let jsonData=ExclusiveWeaponSkillManager.getInstance().getJsonExclusiveWeaponSkill(exSkillId);
                if(jsonData == null) continue;
                localHD["ExclusiveWeaponSkillValue_"+s]=jsonData["ExclusiveWeaponSkillValue_"+s];
            }            
        }
        return localHD;
    }

    
    getTargetHeroData(heroType:Hero_Type,stage:number,level:number):HeroData{
        
        let localHD=new HeroData();
        let heroLevel = level;

        // 宠物属性定义
        let petAtk = 0,petDefence = 0,petHealth = 0,petHit = 0,petMiss = 0,petCritical = 0,petAntiCritical = 0,petExtraCritical = 0,petAntiExtraCritical = 0;

        //--固定属性
        let attributeData:JsonHeroAttribute = HeroAttributeManager.getInstance().getJsonDataByHeroTypeAndStage(heroType,stage);
        localHD.fixed_hp = (heroLevel * attributeData.GrowthHealth) + attributeData.BaseHealth;
        localHD.fixed_attck = (heroLevel * attributeData.GrowthAttack) + attributeData.BaseAttack;
        localHD.fix_defense = (heroLevel * attributeData.GrowthDefense) + attributeData.BaseDefense;
        
        // 武器&宠物加成
        let heroInfo = HeroManager.getInstance().getHeroInfo(heroType);
        let allWeaponHp = 0,allWeaponAtk = 0,allWeaponDefence = 0;
        if(heroInfo!=null){

            let petId = HeroManager.getInstance().getWearPet(heroType);
            if(petId!=0){
                let petInfo = SpiritAttributeManager.getInstance().getJsonSpiritAttribute(petId);
                petAtk = petInfo.Attack;
                petDefence = petInfo.Defense;
                petHealth = petInfo.Health;
                petHit = petInfo.Hit;
                petMiss = petInfo.Miss;
                petCritical = petInfo.Critical;
                petAntiCritical = petInfo.AntiCritical;
                petExtraCritical = petInfo.ExtraCritical;
                petAntiExtraCritical = petAntiExtraCritical;
            }
            localHD.pet_id=petId;
            for(let i = EquipType.WuQi;i<EquipType.Num;i++){
                let weaponInfo = heroInfo["wear"+i];
                if(weaponInfo != 0){
                    let weaponData = EquipmentManager.getInstance().getAttributesadditional(weaponInfo);
                    allWeaponAtk += weaponData[0];
                    allWeaponDefence += weaponData[1];
                    allWeaponHp += weaponData[2];
                }
            }
        }

        // 命中值
        localHD.Hit = attributeData.Hit + petHit;
        // 闪避值
        localHD.Miss = attributeData.Miss + petMiss;
        // 暴击值
        localHD.Critical = attributeData.Critical + petCritical;
        // 防爆值
        localHD.AntiCritical = attributeData.AntiCritical + petAntiCritical;
        // 暴击增幅
        localHD.ExtraCritical = attributeData.ExtraCritical + petExtraCritical;
        // 暴击抗性
        localHD.AntiExtraCritical = attributeData.AntiExtraCritical + petAntiExtraCritical;

        // 攻速
        let HBIM = HeroBaseInfoManager.getInstance();
        localHD.base_jiange = 1/HBIM.getBaseSpeed(heroType);
        localHD.gongji_jiange = 1/HBIM.getBaseSpeed(heroType);
        localHD.bullet_speed = HBIM.getBaseBulletSpeed(heroType);
        localHD.gongji_fanwei = HBIM.getAttackRange(heroType);
       
        
        // --总值
        localHD.Attack = localHD.total_attack = localHD.fixed_attck + allWeaponAtk + petAtk;
        localHD.Health = localHD.total_hp = localHD.fixed_hp + allWeaponHp + petHealth;
        localHD.Defense = localHD.total_defense = localHD.fix_defense + allWeaponDefence + petDefence;

        // --总值
        // localHD.Attack=localHD.total_attack = localHD.fixed_attck ;
        // localHD.Health=localHD.total_hp = localHD.fixed_hp ;
        // localHD.Defense=localHD.total_defense = localHD.fix_defense ;

        let star = HeroAttributeManager.getInstance().getStarByHeroTypeAndStage(heroType,stage) + 1;

        localHD.ColdDown=new Map<number,number>();
        localHD.SkillValue_x=new Map<number,number>();
        localHD.SkillValue_y=new Map<number,number>();
        localHD.SkillValue_z=new Map<number,number>();
        localHD.SkillValue_4=new Map<number,number>();  

        for(let s=1; s<=4; s++){
            let jsonData=SkillConfigurationManager.getInstance().getJsonDataByHeroTypeAndSkillPosAndSkillLevel(heroType,s,star);
            if(jsonData == null) continue;
            localHD.SkillValue_x.set(s,jsonData.SkillValue_1);
            localHD.SkillValue_y.set(s,jsonData.SkillValue_2);
            localHD.SkillValue_z.set(s,jsonData.SkillValue_3);
            localHD.SkillValue_4.set(s,jsonData.SkillValue_4);
            localHD.ColdDown.set(s,jsonData.ColdDown);
        }

        // this.hero_data.set(heroType,localHD);
        return localHD;
    }

    getHeroData(heroType:Hero_Type):HeroData{
        return this.hero_data.get(heroType);
    }

    getDeepHeroData(heroType:Hero_Type):HeroData{
        let data = new HeroData();
        let temp = this.hero_data.get(heroType);
        data.total_attack = temp.total_attack;
        data.total_defense = temp.total_defense;
        data.total_hp = temp.total_hp;
        data.Hit = temp.Hit;
        data.Miss = temp.Miss;
        data.Critical = temp.Critical;
        data.AntiCritical = temp.AntiCritical;
        data.ExtraCritical = temp.ExtraCritical;
        data.AntiExtraCritical = temp.AntiExtraCritical;
        return data;
    }

    changeBindPet(heroType:Hero_Type,petInfo:PetInfo){
        if(this.hero_data.get(heroType)){
            this.hero_data.get(heroType).pet_info=petInfo;
            //this.hero_data.get(heroType).pet_info.sequence_id=123;
        }        
    }

    refreshHeroData(heroType:Hero_Type)
    {
        this.loadHeroData(heroType)
    }

    //获取战力
    getAllHeroZhanli():number
    {
        let num=0;
        let list=this.getHeroList();
        for(let i=0; i<list.length; i++)
        {
            num+=Math.floor(this.getHeroZhanli(list[i].hero_type));
        }
        return num;
    }

    getHeroZhanli(heroType:Hero_Type):number
    {
        this.refreshHeroData(heroType);
        let heroData=this.hero_data.get(heroType);
        let zhanli = heroData.total_hp * CombatEffectivenessManager.getInstance().getConversionFactor(1) 
        + heroData.total_attack * CombatEffectivenessManager.getInstance().getConversionFactor(2)
        + heroData.total_defense * CombatEffectivenessManager.getInstance().getConversionFactor(3)
        + heroData.Hit * CombatEffectivenessManager.getInstance().getConversionFactor(4)
        + heroData.Miss * CombatEffectivenessManager.getInstance().getConversionFactor(5)
        + (heroData.Critical - 100) * CombatEffectivenessManager.getInstance().getConversionFactor(6)
        + heroData.AntiCritical * CombatEffectivenessManager.getInstance().getConversionFactor(7)
        + (heroData.ExtraCritical - 2) * CombatEffectivenessManager.getInstance().getConversionFactor(8)
        + heroData.AntiExtraCritical * CombatEffectivenessManager.getInstance().getConversionFactor(9)
        return zhanli;
    }

    getTargetHeroZhanli(heroType:Hero_Type,stage:number,level:number):number
    {
        let heroData=this.getTargetHeroData(heroType,stage,level);
        let zhanli = heroData.total_hp * CombatEffectivenessManager.getInstance().getConversionFactor(1) 
        + heroData.total_attack * CombatEffectivenessManager.getInstance().getConversionFactor(2)
        + heroData.total_defense * CombatEffectivenessManager.getInstance().getConversionFactor(3)
        + heroData.Hit * CombatEffectivenessManager.getInstance().getConversionFactor(4)
        + heroData.Miss * CombatEffectivenessManager.getInstance().getConversionFactor(5)
        + (heroData.Critical - 100) * CombatEffectivenessManager.getInstance().getConversionFactor(6)
        + heroData.AntiCritical * CombatEffectivenessManager.getInstance().getConversionFactor(7)
        + (heroData.ExtraCritical - 2) * CombatEffectivenessManager.getInstance().getConversionFactor(8)
        + heroData.AntiExtraCritical * CombatEffectivenessManager.getInstance().getConversionFactor(9)
        return zhanli;
    }

    getNewDayZhanli():number
    {
        let num=cc.sys.localStorage.getItem('today_zhanli_');
        if(num==="" || num===null)
        {
            num=this.getAllHeroZhanli();
        }else
        {
            num=parseInt(num);            
        }
        return num;
    }

    static getHeroIsNeedTip(heroType:Hero_Type):boolean
    {
        let isTip=false;
        let num=cc.sys.localStorage.getItem('hero_get_tip_'+heroType);
        if(num==="" || num===null)
        {
            isTip=true;            
        }else
        {
            isTip=false;
        }
        return isTip;
    }

    static setHeroIsNeedTip(heroType:Hero_Type)
    {
        cc.sys.localStorage.setItem('hero_get_tip_'+heroType,1);
    }

    static getSkinIndex(tier:number):number{
        switch(tier){
            case 1:{
                return 1;
            }
            case 2:{
                return 2;
            }
            case 3:{
                return 4;
            }
            case 4:{
                return 7;
            }
            case 5:{
                return 10;
            }
            case 6:{
                return 11;
            }
        }
    }
    /**
    * 获得一个上阵的随机英雄
    * @param mode 游戏模式
    * @param exId 排除的id
    * @returns 除exId之外的id
    */
    getRandHeroId(mode:GameMode,exId:Hero_Type=Hero_Type.NULL,teamList?:number[]):Hero_Type{
        //随机英雄
        if(!teamList)
        teamList=this.getTeamList(mode);
        let randList=[];
        for(let i=0; i<teamList.length; i++){
            let id=teamList[i];
            if(id>Hero_Type.NULL){
                if(id!=exId){
                    randList.push(teamList[i]);
                }                
            }
        }
        let heroId=0;
        if(randList.length>0){
            heroId=randList[Math.floor(Math.random()*randList.length)];
        }    
        return heroId;
    }

    //*******************************----------------装备-------------------************************************************ */
    /**
     * 穿戴一个装备,equipId为0时，请务必把equipType写上
     * @param heroType 英雄id     
     * @param equipId 装备id
     * @param equipType 装备位
     */
    addWearEquipment(heroType:Hero_Type,equipId:number,equipType?:EquipType){
        if(!equipType){
            equipType=EquipmentAttributeManager.getInstance().getEquipmentPosition(equipId);
        }
        //需要遍历装备列表，获取hero_type变量
        TaskManager.getInstance().emitTask(TaskItem.为任意X名英雄穿戴1件装备);
        this.getHeroInfo(heroType)["wear"+equipType]=equipId;
        GameManager.getInstance().refreshZhanliShow();
        EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
        this.saveHeroList();
    }

    /**
     * 卸下一个装备
     * @param heroType 英雄id
     * @param equipPos 装备位
     */
     unloadWearEquipment(heroType:Hero_Type,equipType:EquipType){
        //需要遍历装备列表，获取hero_type变量
        this.getHeroInfo(heroType)["wear"+equipType]=0;
        GameManager.getInstance().refreshZhanliShow();
        EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
    }
    /**获得正在装备的装备id */
    getWearEquipment(heroType:Hero_Type,equipType:EquipType):number{
        return this.getHeroInfo(heroType)["wear"+equipType];
    }
    /**获取剩余的装备数量 */
    getEquipmentRemainNum(equipInfo:EquipInfo):number{
        let num=equipInfo.equip_num;
        let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(equipInfo.equip_id);
        let heroList=this.getHeroList();
        for(let i=0; i<heroList.length; i++){
            if(heroList[i]["wear"+type]==equipInfo.equip_id){
                num--;
            }
        }
        return num;
    }
    /**获取一个装备id被装备的英雄列表 */
    getWearEquipmentHeroList(equipInfo:EquipInfo):Hero_Type[]{
        let list=[];
        let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(equipInfo.equip_id);
        let heroList=this.getHeroList();
        for(let i=0; i<heroList.length; i++){
            let heroInfo=heroList[i];
            if(heroInfo["wear"+type]==equipInfo.equip_id){
                list.push(heroInfo.hero_type);
            }
        }
        return list;
    }

    // --------------------------------------宠物---------------------------------------------
    /**
     * 穿戴一个宠物,equipId为0时，请务必把equipType写上
     * @param heroType 英雄id     
     * @param petId 装备id
     * @param equipType 装备位
     */
     addWearPet(heroType:Hero_Type,petId:number){
        //需要遍历装备列表，获取hero_type变量
        TaskManager.getInstance().emitTask(TaskItem.为任意X名英雄穿戴1件装备);
        this.getHeroInfo(heroType).pet_id=petId;
        GameManager.getInstance().refreshZhanliShow();
        // EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
        this.saveHeroList();
    }

    /**
     * 卸下一个装备
     * @param heroType 英雄id
     * @param equipPos 装备位
     */
     unloadWearPet(heroType:Hero_Type){
        //需要遍历装备列表，获取hero_type变量
        this.getHeroInfo(heroType).pet_id=0;
        GameManager.getInstance().refreshZhanliShow();
        // EventManager.postAssetsEvent(AssetsEventType.EQUIP_WEAR_UNLOAD);
    }
    /**获得正在装备的装备id */
    getWearPet(heroType:Hero_Type):number{
        return this.getHeroInfo(heroType).pet_id;
    }

    /**获取剩余的装备数量 */
    getPetRemainNum(petInfo:PetMessage):number{
        let num=petInfo.pet_num;
        let type=EquipmentAttributeManager.getInstance().getEquipmentPosition(petInfo.pet_id);
        let heroList=this.getHeroList();
        for(let i=0; i<heroList.length; i++){
            if(heroList[i]["wear"+type]==petInfo.pet_id){
                num--;
            }
        }
        return num;
    }
    /**获取一个装备id被装备的英雄列表 */
    getWearPetHeroList(petInfo:PetMessage):Hero_Type[]{
        let list=[];
        let heroList=this.getHeroList();
        for(let i=0; i<heroList.length; i++){
            let heroInfo=heroList[i];
            if(heroInfo.pet_id==petInfo.pet_id){
                list.push(heroInfo.hero_type);
            }
        }
        return list;
    }

    /**检查是否可以升级 */
    checkUpgrade(heroType:Hero_Type):HeroUpgradeData{
        // let heroQuality = this.getHeroQuality(heroType);
        let upData = new HeroUpgradeData();
        if(this.getHeroLevel(heroType) == HeroBaseInfoManager.getInstance().getMaxLevel(heroType)) return upData
        let coinHaveNum = PropManager.getInstance().getPropNum(PropId.Coin);
        let coinNeedNum = LevelUpManager.getInstance().getCostCoin(this.getHeroLevel(heroType));
        let gemHaveNum = PropManager.getInstance().getPropNum(PropId.Gem);
        let gemNeedNum = LevelUpManager.getInstance().getCostGem(this.getHeroLevel(heroType));
        let finishLevel = LevelManager.getInstance().finish_level;
        let needFinishLevel = LevelUpManager.getInstance().getLevelLimit(this.getHeroLevel(heroType));
        // 升级按钮置灰，优先关卡置灰(即在金币足够的情况下，通过关卡没达到要求则按钮置灰)。
        // 如果是以为金币不足置灰则点击升级按钮弹出资源不足弹窗，如果是关卡限制置灰，点击升级按钮则提示通过关卡不足飘字提醒
        upData.is_can_up=coinHaveNum>=coinNeedNum && finishLevel>=needFinishLevel && gemHaveNum >= gemNeedNum;
        return upData;
    }
    /**检查是否可以升星 */
    checkUpStar(heroType:Hero_Type):boolean{
        let heroInfo=this.getHeroInfo(heroType);
        if(!heroInfo){
            return false;
        }
        let curStage=this.getHeroStage(heroType);
        let haveNum = PropManager.getInstance().getPropNum(HeroBaseInfoManager.getInstance().getHeroFragment(heroType));
        let needNum = HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(this.getHeroQuality(heroType),curStage);
        return haveNum >= needNum && curStage<HeroBaseInfoManager.getInstance().getMaxStage(heroType);
    }
    /**检查是否可以使用万能碎片 */
    checkAllPurposeFragment(heroType:Hero_Type):boolean{
        let heroInfo=this.getHeroInfo(heroType);
        if(!heroInfo){
            return false;
        }
        let curStage=this.getHeroStage(heroType);
        let haveNum = PropManager.getInstance().getPropNum(HeroBaseInfoManager.getInstance().getHeroFragment(heroType));
        let needNum = HeroQualityManager.getInstance().getCostDebrisByHeroQualityAndStage(this.getHeroQuality(heroType),curStage);
        let offsetNum=needNum-haveNum;
        return haveNum < needNum && curStage<HeroBaseInfoManager.getInstance().getMaxStage(heroType) && PropManager.getInstance().getPropNum(this.getHeroFragmentId(heroType))>=offsetNum;
    }

    getHeroFragmentId(heroId:Hero_Type):number{
        //品质
        let quality=HeroBaseInfoManager.getInstance().getQuality(heroId);
        return 101000+quality;
    }
    /**检测英雄是否可以解锁 */
    checkUnlock(heroType:Hero_Type):boolean{
        let heroInfo=this.getHeroInfo(heroType);
        if(heroInfo){
            return false;
        }
        let haveNum = PropManager.getInstance().getPropNum(HeroBaseInfoManager.getInstance().getHeroFragment(heroType));
        let needNum = HeroBaseInfoManager.getInstance().getUnlockFragmentNum(heroType);
        if(haveNum>=needNum){
            return true;
        }else{
            let offsetNum=needNum-haveNum;
            return PropManager.getInstance().getPropNum(this.getHeroFragmentId(heroType))>=offsetNum;
        }
    }
    checkExUp(heroType:Hero_Type):boolean{
        let heroInfo=this.getHeroInfo(heroType);
        if(heroInfo){
            let ewShowData = ExclusiveWeaponMessageManager.getInstance().getJsonExclusiveWeaponMessage(heroType);
            if(heroInfo.exclusive_equip_stage >= ewShowData.MaxStage){
                return false;
            }
            let heroBaseInfo = HeroBaseInfoManager.getInstance().getJsonHeroBaseInfo(heroType);
            let needNum = EWUnlockCostManager.getInstance().getCostFragment(heroInfo.hero_quality);
            let haveNum = PropManager.getInstance().getPropNum(heroBaseInfo.ExclusiveWeaponFragment);
            return haveNum>=needNum;
        }
        return false;
        
    }
    getExclusiveWeaponData(heroType:Hero_Type,stage:number):HeroData{
        let info = new HeroData();
        let heroData = this.getHeroData(heroType);
        let exData = ExclusiveEnhancementManager.getInstance().getJsonDataByHeroTypeAndStage(heroType,stage);

        if(exData == null) return null;

        info.total_hp = heroData.fixed_hp * exData.Health;
        info.total_attack = heroData.fixed_attck * exData.Attack;
        info.total_defense = heroData.fix_defense * exData.Defense;

        return info;
    }

    getExclusiveWeaponCombbat(heroType:Hero_Type,stage:number):number{
        let num = 0;
        let exData = this.getExclusiveWeaponData(heroType,stage);

        if(exData!= null){
            num = exData.total_hp * CombatEffectivenessManager.getInstance().getConversionFactor(1) 
            + exData.total_attack * CombatEffectivenessManager.getInstance().getConversionFactor(2)
            + exData.total_defense * CombatEffectivenessManager.getInstance().getConversionFactor(3);
        }

        return num
    }

    /**检测专武能否升级 */
    checkExclusive(heroType:Hero_Type):HeroExclusiveData{
        let data=new HeroExclusiveData();
        // let weaponData = ExclusiveEnhancementManager.getInstance().getJsonByHeroTypeAndWeaponLevel(heroType,this.getHeroInfo(heroType).exclusive_equip_level);
        // data.cost_prop_id=weaponData.SpendPropID
        // data.cur_prop_num=PropManager.getInstance().getPropNum(data.cost_prop_id);
        // data.cost_prop_num=weaponData.SpendPropNum;
        // data.is_can_up=data.cur_prop_num>=data.cost_prop_num;
        return data;
    }    
    
    /**通过红点类型获取英雄类型 */
    static getHeroTypeByRedType(redType:RedEventType):Hero_Type{
        let heroType=Hero_Type.ChangMaoShou;
        switch(redType){
            case RedEventType.Btn_Role_List_1:heroType=Hero_Type.ChangMaoShou; break;
            case RedEventType.Btn_Role_List_2:heroType=Hero_Type.ShouWang; break;
            case RedEventType.Btn_Role_List_3:heroType=Hero_Type.PaoShou; break;
            case RedEventType.Btn_Role_List_4:heroType=Hero_Type.DeLuYi; break;
            case RedEventType.Btn_Role_List_5:heroType=Hero_Type.KuangZhanShi; break;
            case RedEventType.Btn_Role_List_6:heroType=Hero_Type.ZhenDe; break;
            case RedEventType.Btn_Role_List_7:heroType=Hero_Type.NvWu; break;
            case RedEventType.Btn_Role_List_8:heroType=Hero_Type.GongJianShou; break;
            case RedEventType.Btn_Role_List_9:heroType=Hero_Type.BingNv; break;
            case RedEventType.Btn_Role_List_10:heroType=Hero_Type.ANuBiSi; break;
            case RedEventType.Btn_Role_List_11:heroType=Hero_Type.MeiMo; break;
            case RedEventType.Btn_Role_List_12:heroType=Hero_Type.LeiShen; break;
        }
        return heroType;
    }

    /**通过红点类型获取英雄类型 */
    static getRedTypeByHeroType(heroType:Hero_Type):RedEventType{
        let redType=RedEventType.Btn_Role_List_1;
        switch(heroType){
            case Hero_Type.ChangMaoShou:redType=RedEventType.Btn_Role_List_1; break;
            case Hero_Type.ShouWang:redType=RedEventType.Btn_Role_List_2; break;
            case Hero_Type.PaoShou:redType=RedEventType.Btn_Role_List_3; break;
            case Hero_Type.DeLuYi:redType=RedEventType.Btn_Role_List_4; break;
            case Hero_Type.KuangZhanShi:redType=RedEventType.Btn_Role_List_5; break;
            case Hero_Type.ZhenDe:redType=RedEventType.Btn_Role_List_6; break;
            case Hero_Type.NvWu:redType=RedEventType.Btn_Role_List_7; break;
            case Hero_Type.GongJianShou:redType=RedEventType.Btn_Role_List_8; break;
            case Hero_Type.BingNv:redType=RedEventType.Btn_Role_List_9; break;
            case Hero_Type.ANuBiSi:redType=RedEventType.Btn_Role_List_10; break;
            case Hero_Type.MeiMo:redType=RedEventType.Btn_Role_List_11; break;
            case Hero_Type.LeiShen:redType=RedEventType.Btn_Role_List_12; break;
        }
        return redType;
    }

    private getHeroListJsonString():string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
        });
    }

    private setHeroListJsonString(heroDatas:HeroObject[]):string{
        let uid=UserData.getInstance().getUserID();
        return JSON.stringify({
            uid:uid,
            heroList:heroDatas,
        });
    }
}
