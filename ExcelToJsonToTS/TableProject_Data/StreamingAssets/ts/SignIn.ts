export class JsonSignIn {
    /**天数ID */
    public DayID:number = 0 ;
    /**天数 */
    public Day:number = 0 ;
    /**类型 */
    public Daytype:number = 0 ;
    /**道具ID */
    public Item:number = 0 ;
    /**数量 */
    public Num:number = 0 ;
}

export class SignInManager {
    private static _instance: SignInManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSignIn>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SignInManager {
        if(this._instance==null) {
            this._instance=new SignInManager();
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
        LoadManager.loadJson('SignIn',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSignIn成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSignIn();
                jsonData=json[i];
                this.data.set(jsonData.DayID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSignIn(id:number):JsonSignIn {
        return this.data.get(id);
    }
    /**根据天数ID获取天数 */
    public getDay(id:number): number {
        return this.data.get(id).Day;
    }
    /**根据天数ID获取类型 */
    public getDaytype(id:number): number {
        return this.data.get(id).Daytype;
    }
    /**根据天数ID获取道具ID */
    public getItem(id:number): number {
        return this.data.get(id).Item;
    }
    /**根据天数ID获取数量 */
    public getNum(id:number): number {
        return this.data.get(id).Num;
    }

    /** 静态方法，获取最大的 天数ID*/
    public static getMaxDayID():number {
        return 2828;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
