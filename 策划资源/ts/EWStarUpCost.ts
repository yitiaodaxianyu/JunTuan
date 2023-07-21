export class JsonEWStarUpCost {
    /**升星ID */
    public StarUp:number = 0 ;
    /**专武品质 */
    public ExclusiveWeaponQuality:number = 0 ;
    /**阶段 */
    public Stage:number = 0 ;
    /**消耗数量 */
    public CostNum:number = 0 ;
}

export class EWStarUpCostManager {
    private static _instance: EWStarUpCostManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEWStarUpCost>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EWStarUpCostManager {
        if(this._instance==null) {
            this._instance=new EWStarUpCostManager();
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
        LoadManager.loadJson('EWStarUpCost',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEWStarUpCost成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEWStarUpCost();
                jsonData=json[i];
                this.data.set(jsonData.StarUp,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEWStarUpCost(id:number):JsonEWStarUpCost {
        return this.data.get(id);
    }
    /**根据升星ID获取专武品质 */
    public getExclusiveWeaponQuality(id:number): number {
        return this.data.get(id).ExclusiveWeaponQuality;
    }
    /**根据升星ID获取阶段 */
    public getStage(id:number): number {
        return this.data.get(id).Stage;
    }
    /**根据升星ID获取消耗数量 */
    public getCostNum(id:number): number {
        return this.data.get(id).CostNum;
    }

    /** 静态方法，获取最大的 升星ID*/
    public static getMaxStarUp():number {
        return 6030;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
