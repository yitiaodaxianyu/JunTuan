export class JsonFirstgift {
    /**展示位ID */
    public DisplayPosition:number = 0 ;
    /**道具id */
    public ItemsID:number = 0 ;
    /**道具数量 */
    public ItemsNum:number = 0 ;
}

export class FirstgiftManager {
    private static _instance: FirstgiftManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonFirstgift>=null;
    private is_load_completed:boolean=false;

    public static getInstance():FirstgiftManager {
        if(this._instance==null) {
            this._instance=new FirstgiftManager();
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
        LoadManager.loadJson('Firstgift',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonFirstgift成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonFirstgift();
                jsonData=json[i];
                this.data.set(jsonData.DisplayPosition,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonFirstgift(id:number):JsonFirstgift {
        return this.data.get(id);
    }
    /**根据展示位ID获取道具id */
    public getItemsID(id:number): number {
        return this.data.get(id).ItemsID;
    }
    /**根据展示位ID获取道具数量 */
    public getItemsNum(id:number): number {
        return this.data.get(id).ItemsNum;
    }

    /** 静态方法，获取最大的 展示位ID*/
    public static getMaxDisplayPosition():number {
        return 7;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
