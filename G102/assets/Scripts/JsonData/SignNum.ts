import { LoadManager } from "../Loading/LoadManager";

export class JsonSignNum {
    /**累计天数ID */
    public DayNumID:number = 0 ;
    /**累计签到天数 */
    public DayNum:number = 0 ;
    /**道具ID */
    public Item:number = 0 ;
    /**数量 */
    public Num:number = 0 ;
}

export class SignNumManager {
    private static _instance: SignNumManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSignNum>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SignNumManager {
        if(this._instance==null) {
            this._instance=new SignNumManager();
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
        LoadManager.loadJson('SignNum',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSignNum成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSignNum();
                jsonData=json[i];
                this.data.set(jsonData.DayNumID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSignNum(id:number):JsonSignNum {
        return this.data.get(id);
    }
    /**根据累计天数ID获取累计签到天数 */
    public getDayNum(id:number): number {
        return this.data.get(id).DayNum;
    }
    /**根据累计天数ID获取道具ID */
    public getItem(id:number): number {
        return this.data.get(id).Item;
    }
    /**根据累计天数ID获取数量 */
    public getNum(id:number): number {
        return this.data.get(id).Num;
    }

    /** 静态方法，获取最大的 累计天数ID*/
    public static getMaxDayNumID():number {
        return 605;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    getJsonData():JsonSignNum[]{
        let info = [];
        this.data.forEach((v,k)=>{
            info.push(v);
        })
        return info;
    }

}
