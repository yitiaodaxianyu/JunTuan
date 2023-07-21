export class JsonDrawCardPrizePool {
    /**奖池ID */
    public JackpotID:number = 0 ;
    /**类型 */
    public Type:number = 0 ;
    /**掉落组列 */
    public Drop_Array:number[] = [] ;
    /**掉落最小数量 */
    public Drop_MinNum:number[] = [] ;
    /**掉落最大数量 */
    public Drop_MaxNum:number[] = [] ;
    /**各个权重 */
    public Weight:number[] = [] ;
}

export class DrawCardPrizePoolManager {
    private static _instance: DrawCardPrizePoolManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDrawCardPrizePool>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DrawCardPrizePoolManager {
        if(this._instance==null) {
            this._instance=new DrawCardPrizePoolManager();
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
        LoadManager.loadJson('DrawCardPrizePool',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardPrizePool成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDrawCardPrizePool();
                jsonData=json[i];
                this.data.set(jsonData.JackpotID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonDrawCardPrizePool(id:number):JsonDrawCardPrizePool {
        return this.data.get(id);
    }
    /**根据奖池ID获取类型 */
    public getType(id:number): number {
        return this.data.get(id).Type;
    }
    /**根据奖池ID获取掉落组列 */
    public getDrop_Array(id:number): number[] {
        return this.data.get(id).Drop_Array;
    }
    /**根据奖池ID获取掉落最小数量 */
    public getDrop_MinNum(id:number): number[] {
        return this.data.get(id).Drop_MinNum;
    }
    /**根据奖池ID获取掉落最大数量 */
    public getDrop_MaxNum(id:number): number[] {
        return this.data.get(id).Drop_MaxNum;
    }
    /**根据奖池ID获取各个权重 */
    public getWeight(id:number): number[] {
        return this.data.get(id).Weight;
    }

    /** 静态方法，获取最大的 奖池ID*/
    public static getMaxJackpotID():number {
        return 40006;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
