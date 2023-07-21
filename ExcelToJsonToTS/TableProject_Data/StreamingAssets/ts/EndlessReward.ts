export class JsonEndlessReward {
    /**奖励波次 */
    public RewardLevel:number = 0 ;
    /**奖励ID */
    public RewardItem:number = 0 ;
    /**奖励数量 */
    public RewardNum:number = 0 ;
}

export class EndlessRewardManager {
    private static _instance: EndlessRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEndlessReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EndlessRewardManager {
        if(this._instance==null) {
            this._instance=new EndlessRewardManager();
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
        LoadManager.loadJson('EndlessReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEndlessReward();
                jsonData=json[i];
                this.data.set(jsonData.RewardLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEndlessReward(id:number):JsonEndlessReward {
        return this.data.get(id);
    }
    /**根据奖励波次获取奖励ID */
    public getRewardItem(id:number): number {
        return this.data.get(id).RewardItem;
    }
    /**根据奖励波次获取奖励数量 */
    public getRewardNum(id:number): number {
        return this.data.get(id).RewardNum;
    }

    /** 静态方法，获取最大的 奖励波次*/
    public static getMaxRewardLevel():number {
        return 680;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
