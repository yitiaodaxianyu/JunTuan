export class JsonEWUnlockCost {
    /**专武品质 */
    public ExclusiveWeaponQuality:number = 0 ;
    /**消耗碎片数量 */
    public CostFragment:number = 0 ;
}

export class EWUnlockCostManager {
    private static _instance: EWUnlockCostManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEWUnlockCost>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EWUnlockCostManager {
        if(this._instance==null) {
            this._instance=new EWUnlockCostManager();
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
        LoadManager.loadJson('EWUnlockCost',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEWUnlockCost成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEWUnlockCost();
                jsonData=json[i];
                this.data.set(jsonData.ExclusiveWeaponQuality,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEWUnlockCost(id:number):JsonEWUnlockCost {
        return this.data.get(id);
    }
    /**根据专武品质获取消耗碎片数量 */
    public getCostFragment(id:number): number {
        return this.data.get(id).CostFragment;
    }

    /** 静态方法，获取最大的 专武品质*/
    public static getMaxExclusiveWeaponQuality():number {
        return 6;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
