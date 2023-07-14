import { LoadManager } from "../Loading/LoadManager";

export class JsonDiamondsRecharge {
    /**充值ID */
    public RechargeID:number = 0 ;
    /**钻石数量 */
    public DiamondsNum:number = 0 ;
    /**首充赠送钻石数量 */
    public GetDiamondsNum:number = 0 ;
    /**谷歌计费ID */
    public ProductId:string = '' ;
}

export class DiamondsRechargeManager {
    private static _instance: DiamondsRechargeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDiamondsRecharge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DiamondsRechargeManager {
        if(this._instance==null) {
            this._instance=new DiamondsRechargeManager();
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
        LoadManager.loadJson('DiamondsRecharge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDiamondsRecharge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDiamondsRecharge();
                jsonData=json[i];
                this.data.set(jsonData.RechargeID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonDiamondsRecharge(id:number):JsonDiamondsRecharge {
        return this.data.get(id);
    }
    /**根据充值ID获取钻石数量 */
    public getDiamondsNum(id:number): number {
        return this.data.get(id).DiamondsNum;
    }
    /**根据充值ID获取首充赠送钻石数量 */
    public getGetDiamondsNum(id:number): number {
        return this.data.get(id).GetDiamondsNum;
    }
    /**根据充值ID获取谷歌计费ID */
    public getProductId(id:number): string {
        return this.data.get(id).ProductId;
    }

    /** 静态方法，获取最大的 充值ID*/
    public static getMaxRechargeID():number {
        return 6;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getJsonData(){
        return this.data;
    }
}
