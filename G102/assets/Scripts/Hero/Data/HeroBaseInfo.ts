import { LoadManager } from "../../Loading/LoadManager";

export class JsonHeroBaseInfo {
    /**英雄ID */
    public Hero_ID:number = 0 ;
    /**品质 */
    public Quality:number = 0 ;
    /**最大阶段 */
    public MaxStage:number = 0 ;
    /**最大等级 */
    public MaxLevel:number = 0 ;
    /**技能数量 */
    public SkillNum:number = 0 ;
    /**英雄名称文本 */
    public NameText_ID:number = 0 ;
    /**被动技能名称_1 */
    public PassiveIntro_1:number = 0 ;
    /**被动技能描述_1 */
    public PassiveDescription_1:number = 0 ;
    /**被动技能名称_2 */
    public PassiveIntro_2:number = 0 ;
    /**被动技能描述_2 */
    public PassiveDescription_2:number = 0 ;
    /**被动技能名称_3 */
    public PassiveIntro_3:number = 0 ;
    /**被动技能描述_3 */
    public PassiveDescription_3:number = 0 ;
    /**主动技能名称 */
    public SkillText_ID:number = 0 ;
    /**主动技能描述 */
    public SkillDescription:number = 0 ;
    /**基础攻速 */
    public BaseSpeed:number = 0 ;
    /**基础弹体速度 */
    public BaseBulletSpeed:number = 0 ;
    /**普攻射程 */
    public AttackRange:number = 0 ;
    /**英雄碎片 */
    public HeroFragment:number = 0 ;
    /**解锁碎片数量 */
    public UnlockFragmentNum:number = 0 ;
    /**英雄定位 */
    public HeroPositioning:number = 0 ;
    /**是否可用 */
    public Available:number = 0 ;
    /**初始专武道具ID */
    public FirstExclusiveWeaponID:number = 0 ;
    /**专武碎片道具 */
    public ExclusiveWeaponFragment:number = 0 ;
}

export class HeroBaseInfoManager {
    private static _instance: HeroBaseInfoManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonHeroBaseInfo>=null;
    private is_load_completed:boolean=false;

    public static getInstance():HeroBaseInfoManager {
        if(this._instance==null) {
            this._instance=new HeroBaseInfoManager();
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
        LoadManager.loadJson('HeroBaseInfo',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonHeroBaseInfo成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonHeroBaseInfo();
                jsonData=json[i];
                this.data.set(jsonData.Hero_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonHeroBaseInfo(id:number):JsonHeroBaseInfo {
        return this.data.get(id);
    }
    /**根据英雄ID获取品质 */
    public getQuality(id:number): number {
        return this.data.get(id).Quality;
    }
    /**根据英雄ID获取最大阶段 */
    public getMaxStage(id:number): number {
        return this.data.get(id).MaxStage;
    }
    /**根据英雄ID获取最大等级 */
    public getMaxLevel(id:number): number {
        return this.data.get(id).MaxLevel;
    }
    /**根据英雄ID获取技能数量 */
    public getSkillNum(id:number): number {
        return this.data.get(id).SkillNum;
    }
    /**根据英雄ID获取英雄名称文本 */
    public getNameText_ID(id:number): number {
        return this.data.get(id).NameText_ID;
    }
    /**根据英雄ID获取被动技能名称_1 */
    public getPassiveIntro_1(id:number): number {
        return this.data.get(id).PassiveIntro_1;
    }
    /**根据英雄ID获取被动技能描述_1 */
    public getPassiveDescription_1(id:number): number {
        return this.data.get(id).PassiveDescription_1;
    }
    /**根据英雄ID获取被动技能名称_2 */
    public getPassiveIntro_2(id:number): number {
        return this.data.get(id).PassiveIntro_2;
    }
    /**根据英雄ID获取被动技能描述_2 */
    public getPassiveDescription_2(id:number): number {
        return this.data.get(id).PassiveDescription_2;
    }
    /**根据英雄ID获取被动技能名称_3 */
    public getPassiveIntro_3(id:number): number {
        return this.data.get(id).PassiveIntro_3;
    }
    /**根据英雄ID获取被动技能描述_3 */
    public getPassiveDescription_3(id:number): number {
        return this.data.get(id).PassiveDescription_3;
    }
    /**根据英雄ID获取主动技能名称 */
    public getSkillText_ID(id:number): number {
        return this.data.get(id).SkillText_ID;
    }
    /**根据英雄ID获取主动技能描述 */
    public getSkillDescription(id:number): number {
        return this.data.get(id).SkillDescription;
    }
    /**根据英雄ID获取基础攻速 */
    public getBaseSpeed(id:number): number {
        return this.data.get(id).BaseSpeed;
    }
    /**根据英雄ID获取基础弹体速度 */
    public getBaseBulletSpeed(id:number): number {
        return this.data.get(id).BaseBulletSpeed;
    }
    /**根据英雄ID获取普攻射程 */
    public getAttackRange(id:number): number {
        return this.data.get(id).AttackRange;
    }
    /**根据英雄ID获取英雄碎片 */
    public getHeroFragment(id:number): number {
        return this.data.get(id).HeroFragment;
    }
    /**根据英雄ID获取解锁碎片数量 */
    public getUnlockFragmentNum(id:number): number {
        return this.data.get(id).UnlockFragmentNum;
    }
    /**根据英雄ID获取英雄定位 */
    public getHeroPositioning(id:number): number {
        return this.data.get(id).HeroPositioning;
    }
    /**根据英雄ID获取是否可用 */
    public getAvailable(id:number): number {
        return this.data.get(id).Available;
    }
    /**根据英雄ID获取初始专武道具ID */
    public getFirstExclusiveWeaponID(id:number): number {
        return this.data.get(id).FirstExclusiveWeaponID;
    }
    /**根据英雄ID获取专武碎片道具 */
    public getExclusiveWeaponFragment(id:number): number {
        return this.data.get(id).ExclusiveWeaponFragment;
    }

    /** 静态方法，获取最大的 英雄ID*/
    public static getMaxHero_ID():number {
        return 12;
    }

    //以上格式统一，以下写每个json数据的特殊需求


    getData(){
        return this.data;
    }

    getArrayData():JsonHeroBaseInfo[]{
        let info = [];
        this.data.forEach((v,k)=>{
            info.push(v);
        });
        return info;
    }
}
