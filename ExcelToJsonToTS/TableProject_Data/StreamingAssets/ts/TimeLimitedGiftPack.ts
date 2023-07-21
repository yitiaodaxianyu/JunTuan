export class JsonTimeLimitedGiftPack {
    /**礼包ID */
    public GiftsBundle:number = 0 ;
    /**解锁逻辑 */
    public UnlockLogic:number = 0 ;
    /**解锁参数 */
    public Parameter:number = 0 ;
    /**奖励道具 */
    public RewardItem:number[] = [] ;
    /**奖励数量 */
    public RewardNum:number[] = [] ;
}

export class TimeLimitedGiftPackManager {
    private static _instance: TimeLimitedGiftPackManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTimeLimitedGiftPack>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TimeLimitedGiftPackManager {
        if(this._instance==null) {
            this._instance=new TimeLimitedGiftPackManager();
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
        LoadManager.loadJson('TimeLimitedGiftPack',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTimeLimitedGiftPack成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTimeLimitedGiftPack();
                jsonData=json[i];
                this.data.set(jsonData.GiftsBundle,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTimeLimitedGiftPack(id:number):JsonTimeLimitedGiftPack {
        return this.data.get(id);
    }
    /**根据礼包ID获取解锁逻辑 */
    public getUnlockLogic(id:number): number {
        return this.data.get(id).UnlockLogic;
    }
    /**根据礼包ID获取解锁参数 */
    public getParameter(id:number): number {
        return this.data.get(id).Parameter;
    }
    /**根据礼包ID获取奖励道具 */
    public getRewardItem(id:number): number[] {
        return this.data.get(id).RewardItem;
    }
    /**根据礼包ID获取奖励数量 */
    public getRewardNum(id:number): number[] {
        return this.data.get(id).RewardNum;
    }

    /** 静态方法，获取最大的 礼包ID*/
    public static getMaxGiftsBundle():number {
        return 3003;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
