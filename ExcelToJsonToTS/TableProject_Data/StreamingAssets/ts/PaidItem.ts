export class JsonPaidItem {
    /**付费项id */
    public PaidItemId:string = '' ;
    /**付费类型 */
    public PurchaseType:number = 0 ;
    /**付费项名称 */
    public PaidItemTitle:number = 0 ;
    /**价格 */
    public Price:number = 0 ;
}

export class PaidItemManager {
    private static _instance: PaidItemManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonPaidItem>=null;
    private is_load_completed:boolean=false;

    public static getInstance():PaidItemManager {
        if(this._instance==null) {
            this._instance=new PaidItemManager();
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
        LoadManager.loadJson('PaidItem',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonPaidItem成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonPaidItem();
                jsonData=json[i];
                this.data.set(jsonData.PaidItemId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonPaidItem(id:number):JsonPaidItem {
        return this.data.get(id);
    }
    /**根据付费项id获取付费类型 */
    public getPurchaseType(id:number): number {
        return this.data.get(id).PurchaseType;
    }
    /**根据付费项id获取付费项名称 */
    public getPaidItemTitle(id:number): number {
        return this.data.get(id).PaidItemTitle;
    }
    /**根据付费项id获取价格 */
    public getPrice(id:number): number {
        return this.data.get(id).Price;
    }

    /** 静态方法，获取最大的 付费项id*/
    public static getMaxPaidItemId():number {
        return b501;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
