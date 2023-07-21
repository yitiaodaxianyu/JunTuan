export class JsonBossReward {
    /**奖励级别 */
    public RewardLevel:number = 0 ;
    /**积分要求 */
    public IntegralRequirement:number = 0 ;
    /**展示宝箱图标 */
    public BoxIcon:number = 0 ;
    /**奖励道具 */
    public RewardItem:number = 0 ;
    /**奖励数量 */
    public RewardNum:number = 0 ;
    /**奖励道具2 */
    public RewardItem_2:number = 0 ;
    /**奖励数量2 */
    public RewardNum_2:number = 0 ;
}

export class BossRewardManager {
    private static _instance: BossRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonBossReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():BossRewardManager {
        if(this._instance==null) {
            this._instance=new BossRewardManager();
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
        LoadManager.loadJson('BossReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonBossReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonBossReward();
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
    public getJsonBossReward(id:number):JsonBossReward {
        return this.data.get(id);
    }
    /**根据奖励级别获取积分要求 */
    public getIntegralRequirement(id:number): number {
        return this.data.get(id).IntegralRequirement;
    }
    /**根据奖励级别获取展示宝箱图标 */
    public getBoxIcon(id:number): number {
        return this.data.get(id).BoxIcon;
    }
    /**根据奖励级别获取奖励道具 */
    public getRewardItem(id:number): number {
        return this.data.get(id).RewardItem;
    }
    /**根据奖励级别获取奖励数量 */
    public getRewardNum(id:number): number {
        return this.data.get(id).RewardNum;
    }
    /**根据奖励级别获取奖励道具2 */
    public getRewardItem_2(id:number): number {
        return this.data.get(id).RewardItem_2;
    }
    /**根据奖励级别获取奖励数量2 */
    public getRewardNum_2(id:number): number {
        return this.data.get(id).RewardNum_2;
    }

    /** 静态方法，获取最大的 奖励级别*/
    public static getMaxRewardLevel():number {
        return 47;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
