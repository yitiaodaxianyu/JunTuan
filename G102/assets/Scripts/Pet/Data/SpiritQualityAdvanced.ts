import { LoadManager } from "../../Loading/LoadManager";


export class JsonSpiritQualityAdvanced {
    /**当前品质 */
    public CurrentQuality:number = 0 ;
    /**目标品质 */
    public TargetQuality:number = 0 ;
    /**消耗本体数量 */
    public CostItselfNum:number = 0 ;
    /**消耗本体品质 */
    public CostItselfQuality:number = 0 ;
    /**消耗同类型数量 */
    public CostSameTypeNum:number = 0 ;
    /**消耗同类型品质 */
    public CostSameTypeQuality:number = 0 ;
}

export class SpiritQualityAdvancedManager {
    private static _instance: SpiritQualityAdvancedManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritQualityAdvanced>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritQualityAdvancedManager {
        if(this._instance==null) {
            this._instance=new SpiritQualityAdvancedManager();
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
        LoadManager.loadJson('SpiritQualityAdvanced',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritQualityAdvanced成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritQualityAdvanced();
                jsonData=json[i];
                this.data.set(jsonData.CurrentQuality,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritQualityAdvanced(id:number):JsonSpiritQualityAdvanced {
        return this.data.get(id);
    }
    /**根据当前品质获取目标品质 */
    public getTargetQuality(id:number): number {
        return this.data.get(id).TargetQuality;
    }
    /**根据当前品质获取消耗本体数量 */
    public getCostItselfNum(id:number): number {
        return this.data.get(id).CostItselfNum;
    }
    /**根据当前品质获取消耗本体品质 */
    public getCostItselfQuality(id:number): number {
        return this.data.get(id).CostItselfQuality;
    }
    /**根据当前品质获取消耗同类型数量 */
    public getCostSameTypeNum(id:number): number {
        return this.data.get(id).CostSameTypeNum;
    }
    /**根据当前品质获取消耗同类型品质 */
    public getCostSameTypeQuality(id:number): number {
        return this.data.get(id).CostSameTypeQuality;
    }

    /** 静态方法，获取最大的 当前品质*/
    public static getMaxCurrentQuality():number {
        return 9;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
