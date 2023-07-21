export class JsonSpiritAttribute {
    /**灵宠道具 */
    public SpiritItem:number = 0 ;
    /**灵宠种类 */
    public SpiritType:number = 0 ;
    /**阶段 */
    public Stage:number = 0 ;
    /**品质 */
    public Quality:number = 0 ;
    /**星级 */
    public Star:number = 0 ;
    /**生命值 */
    public Health:number = 0 ;
    /**攻击力 */
    public Attack:number = 0 ;
    /**防御力 */
    public Defense:number = 0 ;
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

export class SpiritAttributeManager {
    private static _instance: SpiritAttributeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritAttribute>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritAttributeManager {
        if(this._instance==null) {
            this._instance=new SpiritAttributeManager();
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
        LoadManager.loadJson('SpiritAttribute',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritAttribute成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritAttribute();
                jsonData=json[i];
                this.data.set(jsonData.SpiritItem,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritAttribute(id:number):JsonSpiritAttribute {
        return this.data.get(id);
    }
    /**根据灵宠道具获取灵宠种类 */
    public getSpiritType(id:number): number {
        return this.data.get(id).SpiritType;
    }
    /**根据灵宠道具获取阶段 */
    public getStage(id:number): number {
        return this.data.get(id).Stage;
    }
    /**根据灵宠道具获取品质 */
    public getQuality(id:number): number {
        return this.data.get(id).Quality;
    }
    /**根据灵宠道具获取星级 */
    public getStar(id:number): number {
        return this.data.get(id).Star;
    }
    /**根据灵宠道具获取生命值 */
    public getHealth(id:number): number {
        return this.data.get(id).Health;
    }
    /**根据灵宠道具获取攻击力 */
    public getAttack(id:number): number {
        return this.data.get(id).Attack;
    }
    /**根据灵宠道具获取防御力 */
    public getDefense(id:number): number {
        return this.data.get(id).Defense;
    }
    /**根据灵宠道具获取命中值 */
    public getHit(id:number): number {
        return this.data.get(id).Hit;
    }
    /**根据灵宠道具获取闪避值 */
    public getMiss(id:number): number {
        return this.data.get(id).Miss;
    }
    /**根据灵宠道具获取暴击值 */
    public getCritical(id:number): number {
        return this.data.get(id).Critical;
    }
    /**根据灵宠道具获取防暴值 */
    public getAntiCritical(id:number): number {
        return this.data.get(id).AntiCritical;
    }
    /**根据灵宠道具获取暴击增幅 */
    public getExtraCritical(id:number): number {
        return this.data.get(id).ExtraCritical;
    }
    /**根据灵宠道具获取暴击抗性 */
    public getAntiExtraCritical(id:number): number {
        return this.data.get(id).AntiExtraCritical;
    }

    /** 静态方法，获取最大的 灵宠道具*/
    public static getMaxSpiritItem():number {
        return 70413;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
