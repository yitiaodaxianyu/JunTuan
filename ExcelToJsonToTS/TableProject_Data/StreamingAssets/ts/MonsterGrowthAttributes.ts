export class JsonMonsterGrowthAttributes {
    /**属性ID */
    public AttributeId:number = 0 ;
    /**怪物ID */
    public MonsterId:number = 0 ;
    /**等级 */
    public Level:number = 0 ;
    /**攻击力 */
    public Attack:number = 0 ;
    /**生命值 */
    public Health:number = 0 ;
    /**防御力 */
    public Defense:number = 0 ;
    /**命中值 */
    public Hit:number = 0 ;
    /**闪避值 */
    public Miss:number = 0 ;
    /**暴击值 */
    public Critical:number = 0 ;
    /**暴击增幅 */
    public ExtraCritical:number = 0 ;
    /**防暴值 */
    public AntiCritical:number = 0 ;
    /**暴击抗性 */
    public AntiExtraCritical:number = 0 ;
    /**技能等级 */
    public SkillLevel:number = 0 ;
}

export class MonsterGrowthAttributesManager {
    private static _instance: MonsterGrowthAttributesManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMonsterGrowthAttributes>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MonsterGrowthAttributesManager {
        if(this._instance==null) {
            this._instance=new MonsterGrowthAttributesManager();
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
        LoadManager.loadJson('MonsterGrowthAttributes',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterGrowthAttributes成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMonsterGrowthAttributes();
                jsonData=json[i];
                this.data.set(jsonData.AttributeId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMonsterGrowthAttributes(id:number):JsonMonsterGrowthAttributes {
        return this.data.get(id);
    }
    /**根据属性ID获取怪物ID */
    public getMonsterId(id:number): number {
        return this.data.get(id).MonsterId;
    }
    /**根据属性ID获取等级 */
    public getLevel(id:number): number {
        return this.data.get(id).Level;
    }
    /**根据属性ID获取攻击力 */
    public getAttack(id:number): number {
        return this.data.get(id).Attack;
    }
    /**根据属性ID获取生命值 */
    public getHealth(id:number): number {
        return this.data.get(id).Health;
    }
    /**根据属性ID获取防御力 */
    public getDefense(id:number): number {
        return this.data.get(id).Defense;
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
    /**根据属性ID获取暴击增幅 */
    public getExtraCritical(id:number): number {
        return this.data.get(id).ExtraCritical;
    }
    /**根据属性ID获取防暴值 */
    public getAntiCritical(id:number): number {
        return this.data.get(id).AntiCritical;
    }
    /**根据属性ID获取暴击抗性 */
    public getAntiExtraCritical(id:number): number {
        return this.data.get(id).AntiExtraCritical;
    }
    /**根据属性ID获取技能等级 */
    public getSkillLevel(id:number): number {
        return this.data.get(id).SkillLevel;
    }

    /** 静态方法，获取最大的 属性ID*/
    public static getMaxAttributeId():number {
        return 308710255;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
