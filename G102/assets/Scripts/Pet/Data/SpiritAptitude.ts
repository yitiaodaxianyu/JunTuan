import { LoadManager } from "../../Loading/LoadManager";


export class JsonSpiritAptitude {
    /**资质ID */
    public Aptitude:number = 0 ;
    /**灵宠ID */
    public SpiritId:number = 0 ;
    /**当前品质 */
    public CurrentQuality:number = 0 ;
    /**协力 */
    public Cooperation:number = 0 ;
    /**守护 */
    public defend:number = 0 ;
    /**同心 */
    public OneHeart:number = 0 ;
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
}

export class SpiritAptitudeManager {
    private static _instance: SpiritAptitudeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritAptitude>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritAptitudeManager {
        if(this._instance==null) {
            this._instance=new SpiritAptitudeManager();
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
        LoadManager.loadJson('SpiritAptitude',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritAptitude成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritAptitude();
                jsonData=json[i];
                this.data.set(jsonData.Aptitude,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritAptitude(id:number):JsonSpiritAptitude {
        return this.data.get(id);
    }
    /**根据资质ID获取灵宠ID */
    public getSpiritId(id:number): number {
        return this.data.get(id).SpiritId;
    }
    /**根据资质ID获取当前品质 */
    public getCurrentQuality(id:number): number {
        return this.data.get(id).CurrentQuality;
    }
    /**根据资质ID获取协力 */
    public getCooperation(id:number): number {
        return this.data.get(id).Cooperation;
    }
    /**根据资质ID获取守护 */
    public getdefend(id:number): number {
        return this.data.get(id).defend;
    }
    /**根据资质ID获取同心 */
    public getOneHeart(id:number): number {
        return this.data.get(id).OneHeart;
    }
    /**根据资质ID获取命中值 */
    public getHit(id:number): number {
        return this.data.get(id).Hit;
    }
    /**根据资质ID获取闪避值 */
    public getMiss(id:number): number {
        return this.data.get(id).Miss;
    }
    /**根据资质ID获取暴击值 */
    public getCritical(id:number): number {
        return this.data.get(id).Critical;
    }
    /**根据资质ID获取暴击增幅 */
    public getExtraCritical(id:number): number {
        return this.data.get(id).ExtraCritical;
    }
    /**根据资质ID获取防暴值 */
    public getAntiCritical(id:number): number {
        return this.data.get(id).AntiCritical;
    }
    /**根据资质ID获取暴击抗性 */
    public getAntiExtraCritical(id:number): number {
        return this.data.get(id).AntiExtraCritical;
    }

    /** 静态方法，获取最大的 资质ID*/
    public static getMaxAptitude():number {
        return 2110;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    /**
     * 
     * @param petId 宠物id
     * @param petQuality 宠物品质
     */
    public static getId(petId:number,petQuality:number):number{
        return petId*100+petQuality
    }
}
