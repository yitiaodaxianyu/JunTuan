import { LoadManager } from "../../Loading/LoadManager";

export class JsonItem {
    /**ID */
    public ItemID:number = 0 ;
    /**名称文本 */
    public NameTextId:number = 0 ;
    /**道具描述 */
    public DiscripitionTextId:number = 0 ;
    /**类型 */
    public Type:number = 0 ;
    /**品质框 */
    public Quality:number = 0 ;
    /**星级 */
    public Star:number = 0 ;
    /**引用图标 */
    public QuoteIcon:number = 0 ;
}

export class ItemManager {
    private static _instance: ItemManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonItem>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ItemManager {
        if(this._instance==null) {
            this._instance=new ItemManager();
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
        LoadManager.loadJson('Item',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonItem成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonItem();
                jsonData=json[i];
                this.data.set(jsonData.ItemID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonItem(id:number):JsonItem {
        return this.data.get(id);
    }
    /**根据ID获取名称文本 */
    public getNameTextId(id:number): number {
        return this.data.get(id).NameTextId;
    }
    /**根据ID获取道具描述 */
    public getDiscripitionTextId(id:number): number {
        return this.data.get(id).DiscripitionTextId;
    }
    /**根据ID获取类型 */
    public getType(id:number): number {
        console.log("getType:"+id);
        
        return this.data.get(id).Type;
    }
    /**根据ID获取品质框 */
    public getQuality(id:number): number {
        return this.data.get(id).Quality;
    }
    /**根据ID获取星级 */
    public getStar(id:number): number {
        return this.data.get(id).Star;
    }
    /**根据ID获取引用图标 */
    public getQuoteIcon(id:number): number {
        return this.data.get(id).QuoteIcon;
    }

    /** 静态方法，获取最大的 ID*/
    public static getMaxItemID():number {
        return 110012;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    public getPropIdList():number[]{
        let idList=new Array();
        this.data.forEach((jsonData,key)=>{
            if(jsonData.Type!=9){
                idList.push(jsonData.ItemID);
            }
        });
        return idList;
    }

}
