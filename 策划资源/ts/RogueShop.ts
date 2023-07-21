export class JsonRogueShop {
    /**展示位 */
    public ShowLoacl:number = 0 ;
    /**道具ID */
    public Prop_ID:number = 0 ;
    /**道具数量 */
    public Prop_Num:number = 0 ;
    /**花费代币数量 */
    public CostNum:number = 0 ;
}

export class RogueShopManager {
    private static _instance: RogueShopManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueShop>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueShopManager {
        if(this._instance==null) {
            this._instance=new RogueShopManager();
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
        LoadManager.loadJson('RogueShop',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueShop成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueShop();
                jsonData=json[i];
                this.data.set(jsonData.ShowLoacl,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueShop(id:number):JsonRogueShop {
        return this.data.get(id);
    }
    /**根据展示位获取道具ID */
    public getProp_ID(id:number): number {
        return this.data.get(id).Prop_ID;
    }
    /**根据展示位获取道具数量 */
    public getProp_Num(id:number): number {
        return this.data.get(id).Prop_Num;
    }
    /**根据展示位获取花费代币数量 */
    public getCostNum(id:number): number {
        return this.data.get(id).CostNum;
    }

    /** 静态方法，获取最大的 展示位*/
    public static getMaxShowLoacl():number {
        return 13;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
