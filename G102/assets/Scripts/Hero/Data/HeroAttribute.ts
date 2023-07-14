import { LoadManager } from "../../Loading/LoadManager";
import { Hero_Type } from "../Game/HeroConfig";

export class JsonHeroAttribute {
    /**属性ID */
    public Attribute_ID:number = 0 ;
    /**绑定英雄ID */
    public Hero_ID:number = 0 ;
    /**星级 */
    public Star:number = 0 ;
    /**阶段 */
    public Stage:number = 0 ;
    /**基础生命值 */
    public BaseHealth:number = 0 ;
    /**基础攻击力 */
    public BaseAttack:number = 0 ;
    /**基础防御力 */
    public BaseDefense:number = 0 ;
    /**成长生命值 */
    public GrowthHealth:number = 0 ;
    /**成长攻击力 */
    public GrowthAttack:number = 0 ;
    /**成长防御力 */
    public GrowthDefense:number = 0 ;
    /**命中值 */
    public Hit:number = 0 ;
    /**闪避值 */
    public Miss:number = 0 ;
    /**暴击值 */
    public Critical:number = 0 ;
    /**防暴值 */
    public AntiCritical:number = 0 ;
    /**暴击增幅 */
    public ExtraCritical:number = 0 ;
    /**暴击抗性 */
    public AntiExtraCritical:number = 0 ;
}

export class HeroAttributeManager {
    private static _instance: HeroAttributeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonHeroAttribute>=null;
    private is_load_completed:boolean=false;

    public static getInstance():HeroAttributeManager {
        if(this._instance==null) {
            this._instance=new HeroAttributeManager();
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
        LoadManager.loadJson('HeroAttribute',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonHeroAttribute成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonHeroAttribute();
                jsonData=json[i];
                this.data.set(jsonData.Attribute_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonHeroAttribute(id:number):JsonHeroAttribute {
        return this.data.get(id);
    }
    /**根据属性ID获取绑定英雄ID */
    public getHero_ID(id:number): number {
        return this.data.get(id).Hero_ID;
    }
    /**根据属性ID获取星级 */
    public getStar(id:number): number {
        return this.data.get(id).Star;
    }
    /**根据属性ID获取阶段 */
    public getStage(id:number): number {
        return this.data.get(id).Stage;
    }
    /**根据属性ID获取基础生命值 */
    public getBaseHealth(id:number): number {
        return this.data.get(id).BaseHealth;
    }
    /**根据属性ID获取基础攻击力 */
    public getBaseAttack(id:number): number {
        return this.data.get(id).BaseAttack;
    }
    /**根据属性ID获取基础防御力 */
    public getBaseDefense(id:number): number {
        return this.data.get(id).BaseDefense;
    }
    /**根据属性ID获取成长生命值 */
    public getGrowthHealth(id:number): number {
        return this.data.get(id).GrowthHealth;
    }
    /**根据属性ID获取成长攻击力 */
    public getGrowthAttack(id:number): number {
        return this.data.get(id).GrowthAttack;
    }
    /**根据属性ID获取成长防御力 */
    public getGrowthDefense(id:number): number {
        return this.data.get(id).GrowthDefense;
    }
    /**根据属性ID获取命中值 */
    public getHit(id:number): number {
        return this.data.get(id).Hit;
    }
    /**根据属性ID获取闪避值 */
    public getMiss(id:number): number {
        return this.data.get(id).Miss;
    }
    /**根据属性ID获取暴击值 */
    public getCritical(id:number): number {
        return this.data.get(id).Critical;
    }
    /**根据属性ID获取防暴值 */
    public getAntiCritical(id:number): number {
        return this.data.get(id).AntiCritical;
    }
    /**根据属性ID获取暴击增幅 */
    public getExtraCritical(id:number): number {
        return this.data.get(id).ExtraCritical;
    }
    /**根据属性ID获取暴击抗性 */
    public getAntiExtraCritical(id:number): number {
        return this.data.get(id).AntiExtraCritical;
    }

    /** 静态方法，获取最大的 属性ID*/
    public static getMaxAttribute_ID():number {
        return 12026;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    public static getId(heroType:Hero_Type,heroStage:number){
        return heroType * 1000 + heroStage;
    }
    /**根据英雄类型和阶段获取星级 */
    getStarByHeroTypeAndStage(heroType:Hero_Type,heroStage:number):number{
        let info:JsonHeroAttribute = null;
        this.data.forEach((v,k) =>{
            if(heroType == v.Hero_ID && heroStage == v.Stage){
                info = v;
            }
        });
        if(info == null) return 0;
        return info.Star;
    }

    getJsonDataByHeroTypeAndStage(heroType:Hero_Type,heroStage:number):JsonHeroAttribute{
        let info:JsonHeroAttribute = null;
        this.data.forEach((v,k) =>{
            if(heroType == v.Hero_ID && heroStage == v.Stage){
                info = v;
            }
        });
        return info;
    }

}
