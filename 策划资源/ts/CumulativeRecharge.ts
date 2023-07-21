export class JsonCumulativeRecharge {
    /**累计充值ID */
    public CumulativeRechargeID:number = 0 ;
    /**累计充值钻石 */
    public DiamondRechargePrice:number = 0 ;
    /**道具1ID */
    public Item1_ID:number = 0 ;
    /**道具1数量 */
    public Item1_Num:number = 0 ;
    /**道具2ID */
    public Item2_ID:number = 0 ;
    /**道具2数量 */
    public Item2_Num:number = 0 ;
    /**道具3ID */
    public Item3_ID:number = 0 ;
    /**道具3数量 */
    public Item3_Num:number = 0 ;
}

export class CumulativeRechargeManager {
    private static _instance: CumulativeRechargeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCumulativeRecharge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CumulativeRechargeManager {
        if(this._instance==null) {
            this._instance=new CumulativeRechargeManager();
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
        LoadManager.loadJson('CumulativeRecharge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeRecharge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCumulativeRecharge();
                jsonData=json[i];
                this.data.set(jsonData.CumulativeRechargeID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCumulativeRecharge(id:number):JsonCumulativeRecharge {
        return this.data.get(id);
    }
    /**根据累计充值ID获取累计充值钻石 */
    public getDiamondRechargePrice(id:number): number {
        return this.data.get(id).DiamondRechargePrice;
    }
    /**根据累计充值ID获取道具1ID */
    public getItem1_ID(id:number): number {
        return this.data.get(id).Item1_ID;
    }
    /**根据累计充值ID获取道具1数量 */
    public getItem1_Num(id:number): number {
        return this.data.get(id).Item1_Num;
    }
    /**根据累计充值ID获取道具2ID */
    public getItem2_ID(id:number): number {
        return this.data.get(id).Item2_ID;
    }
    /**根据累计充值ID获取道具2数量 */
    public getItem2_Num(id:number): number {
        return this.data.get(id).Item2_Num;
    }
    /**根据累计充值ID获取道具3ID */
    public getItem3_ID(id:number): number {
        return this.data.get(id).Item3_ID;
    }
    /**根据累计充值ID获取道具3数量 */
    public getItem3_Num(id:number): number {
        return this.data.get(id).Item3_Num;
    }

    /** 静态方法，获取最大的 累计充值ID*/
    public static getMaxCumulativeRechargeID():number {
        return 80001;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
