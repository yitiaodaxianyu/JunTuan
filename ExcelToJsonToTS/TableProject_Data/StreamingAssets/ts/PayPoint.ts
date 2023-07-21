export class JsonPayPoint {
    /**谷歌ID */
    public ProductId:string = '' ;
    /**对应美金价格 */
    public Price:number = 0 ;
}

export class PayPointManager {
    private static _instance: PayPointManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonPayPoint>=null;
    private is_load_completed:boolean=false;

    public static getInstance():PayPointManager {
        if(this._instance==null) {
            this._instance=new PayPointManager();
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
        LoadManager.loadJson('PayPoint',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonPayPoint成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonPayPoint();
                jsonData=json[i];
                this.data.set(jsonData.ProductId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonPayPoint(id:number):JsonPayPoint {
        return this.data.get(id);
    }
    /**根据谷歌ID获取对应美金价格 */
    public getPrice(id:number): number {
        return this.data.get(id).Price;
    }

    /** 静态方法，获取最大的 谷歌ID*/
    public static getMaxProductId():number {
        return c501;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
