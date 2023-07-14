import { LoadManager } from "../../Loading/LoadManager";


export class JsonCrystalRecharge {
    /**充值ID */
    public RechargeID:number = 0 ;
    /**龙晶数量 */
    public CrystalQuantity:number = 0 ;
    /**首充赠送钻石数量 */
    public DiamondsQuality:number = 0 ;
    /**谷歌计费ID */
    public ProductId:string = '' ;
}

export class CrystalRechargeManager {
    private static _instance: CrystalRechargeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCrystalRecharge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CrystalRechargeManager {
        if(this._instance==null) {
            this._instance=new CrystalRechargeManager();
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
        LoadManager.loadJson('CrystalRecharge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCrystalRecharge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCrystalRecharge();
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
    public getJsonCrystalRecharge(id:number):JsonCrystalRecharge {
        return this.data.get(id);
    }
    /**根据充值ID获取龙晶数量 */
    public getCrystalQuantity(id:number): number {
        return this.data.get(id).CrystalQuantity;
    }
    /**根据充值ID获取首充赠送钻石数量 */
    public getDiamondsQuality(id:number): number {
        return this.data.get(id).DiamondsQuality;
    }
    /**根据充值ID获取谷歌计费ID */
    public getProductId(id:number): string {
        return this.data.get(id).ProductId;
    }

    /** 静态方法，获取最大的 充值ID*/
    public static getMaxRechargeID():number {
        return 606;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    public getData():Map<number,JsonCrystalRecharge>{
        return this.data;
    }
}
