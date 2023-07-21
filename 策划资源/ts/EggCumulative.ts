export class JsonEggCumulative {
    /**累计次数奖励ID */
    public CumulativeEggsRewardID:number = 0 ;
    /**开蛋池类型 */
    public EggsType:number = 0 ;
    /**累计开蛋次数 */
    public CumulativeEggsDrawingTimes:number = 0 ;
    /**道具ID */
    public ItemID:number = 0 ;
    /**数量 */
    public RewardNum:number = 0 ;
}

export class EggCumulativeManager {
    private static _instance: EggCumulativeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEggCumulative>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EggCumulativeManager {
        if(this._instance==null) {
            this._instance=new EggCumulativeManager();
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
        LoadManager.loadJson('EggCumulative',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEggCumulative成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEggCumulative();
                jsonData=json[i];
                this.data.set(jsonData.CumulativeEggsRewardID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEggCumulative(id:number):JsonEggCumulative {
        return this.data.get(id);
    }
    /**根据累计次数奖励ID获取开蛋池类型 */
    public getEggsType(id:number): number {
        return this.data.get(id).EggsType;
    }
    /**根据累计次数奖励ID获取累计开蛋次数 */
    public getCumulativeEggsDrawingTimes(id:number): number {
        return this.data.get(id).CumulativeEggsDrawingTimes;
    }
    /**根据累计次数奖励ID获取道具ID */
    public getItemID(id:number): number {
        return this.data.get(id).ItemID;
    }
    /**根据累计次数奖励ID获取数量 */
    public getRewardNum(id:number): number {
        return this.data.get(id).RewardNum;
    }

    /** 静态方法，获取最大的 累计次数奖励ID*/
    public static getMaxCumulativeEggsRewardID():number {
        return 200050;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
