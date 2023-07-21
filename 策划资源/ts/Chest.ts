export class JsonChest {
    /**宝箱id */
    public ChestID:number = 0 ;
    /**展示页 */
    public DisplayPage:number = 0 ;
    /**宝箱标题 */
    public ChestTitleText:number = 0 ;
    /**宝箱类型 */
    public ChestType:number = 0 ;
    /**展示位 */
    public DisplayPosition:number = 0 ;
    /**获得奖池 */
    public GetJackPot:number = 0 ;
    /**消费类型 */
    public CostType:number = 0 ;
    /**消耗道具id */
    public CostItemId:number = 0 ;
    /**单抽道具消耗 */
    public OnceItemCost:number = 0 ;
    /**单抽钻石消耗 */
    public OnceGemCost:number = 0 ;
    /**十连抽道具消耗 */
    public TenthItemCost:number = 0 ;
    /**十连抽钻石消耗 */
    public TenthGemCost:number = 0 ;
    /**单抽金额消耗 */
    public OnceMoneyCost:number = 0 ;
    /**十连抽金额消耗 */
    public TenthMoneyCost:number = 0 ;
}

export class ChestManager {
    private static _instance: ChestManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonChest>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ChestManager {
        if(this._instance==null) {
            this._instance=new ChestManager();
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
        LoadManager.loadJson('Chest',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonChest成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonChest();
                jsonData=json[i];
                this.data.set(jsonData.ChestID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonChest(id:number):JsonChest {
        return this.data.get(id);
    }
    /**根据宝箱id获取展示页 */
    public getDisplayPage(id:number): number {
        return this.data.get(id).DisplayPage;
    }
    /**根据宝箱id获取宝箱标题 */
    public getChestTitleText(id:number): number {
        return this.data.get(id).ChestTitleText;
    }
    /**根据宝箱id获取宝箱类型 */
    public getChestType(id:number): number {
        return this.data.get(id).ChestType;
    }
    /**根据宝箱id获取展示位 */
    public getDisplayPosition(id:number): number {
        return this.data.get(id).DisplayPosition;
    }
    /**根据宝箱id获取获得奖池 */
    public getGetJackPot(id:number): number {
        return this.data.get(id).GetJackPot;
    }
    /**根据宝箱id获取消费类型 */
    public getCostType(id:number): number {
        return this.data.get(id).CostType;
    }
    /**根据宝箱id获取消耗道具id */
    public getCostItemId(id:number): number {
        return this.data.get(id).CostItemId;
    }
    /**根据宝箱id获取单抽道具消耗 */
    public getOnceItemCost(id:number): number {
        return this.data.get(id).OnceItemCost;
    }
    /**根据宝箱id获取单抽钻石消耗 */
    public getOnceGemCost(id:number): number {
        return this.data.get(id).OnceGemCost;
    }
    /**根据宝箱id获取十连抽道具消耗 */
    public getTenthItemCost(id:number): number {
        return this.data.get(id).TenthItemCost;
    }
    /**根据宝箱id获取十连抽钻石消耗 */
    public getTenthGemCost(id:number): number {
        return this.data.get(id).TenthGemCost;
    }
    /**根据宝箱id获取单抽金额消耗 */
    public getOnceMoneyCost(id:number): number {
        return this.data.get(id).OnceMoneyCost;
    }
    /**根据宝箱id获取十连抽金额消耗 */
    public getTenthMoneyCost(id:number): number {
        return this.data.get(id).TenthMoneyCost;
    }

    /** 静态方法，获取最大的 宝箱id*/
    public static getMaxChestID():number {
        return 2102;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
