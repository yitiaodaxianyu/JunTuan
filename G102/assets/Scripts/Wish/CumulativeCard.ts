import { LoadManager } from "../Loading/LoadManager";


export class JsonCumulativeCard {
    /**累计次数奖励ID */
    public CumulativeRewardID:number = 0 ;
    /**许愿池类型 */
    public WishType:number = 0 ;
    /**累计抽卡次数 */
    public CumulativeCardDrawingTimes:number = 0 ;
    /**道具ID */
    public ItemID:number = 0 ;
    /**数量 */
    public RewardNum:number = 0 ;
}

export class CumulativeCardManager {
    private static _instance: CumulativeCardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCumulativeCard>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CumulativeCardManager {
        if(this._instance==null) {
            this._instance=new CumulativeCardManager();
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
        LoadManager.loadJson('CumulativeCard',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeCard成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCumulativeCard();
                jsonData=json[i];
                this.data.set(jsonData.CumulativeRewardID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCumulativeCard(id:number):JsonCumulativeCard {
        return this.data.get(id);
    }
    /**根据累计次数奖励ID获取许愿池类型 */
    public getWishType(id:number): number {
        return this.data.get(id).WishType;
    }
    /**根据累计次数奖励ID获取累计抽卡次数 */
    public getCumulativeCardDrawingTimes(id:number): number {
        return this.data.get(id).CumulativeCardDrawingTimes;
    }
    /**根据累计次数奖励ID获取道具ID */
    public getItemID(id:number): number {
        return this.data.get(id).ItemID;
    }
    /**根据累计次数奖励ID获取数量 */
    public getRewardNum(id:number): number {
        return this.data.get(id).RewardNum;
    }

    /** 静态方法，获取最大的 累计次数奖励ID*/
    public static getMaxCumulativeRewardID():number {
        return 2050;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    /**
     * 根据许愿池类型获取累计奖励列表
     * @param type 
     * @returns 
     */
    getWishingRewardList(type:number):JsonCumulativeCard[]{
        let arr=new Array<JsonCumulativeCard>()
        this.data.forEach((v,k)=>{
            if(v.WishType==type){
                arr.push(v);
            }
        })
        return arr;
    }
}
