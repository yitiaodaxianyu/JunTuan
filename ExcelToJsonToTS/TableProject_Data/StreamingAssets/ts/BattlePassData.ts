export class JsonBattlePassData {
    /**战令等级 */
    public BattlePassLevel:number = 0 ;
    /**下一级所需经验值 */
    public RequiredExp:number = 0 ;
    /**免费奖励道具ID */
    public FreeRewardItem:number = 0 ;
    /**免费奖励数量 */
    public FreeRewardNum:number = 0 ;
    /**高级钻石奖励 */
    public SeniorRewardGem:number = 0 ;
    /**高级奖励道具ID */
    public SeniorRewardItem:number = 0 ;
    /**高级奖励数量 */
    public SeniorRewardNum:number = 0 ;
}

export class BattlePassDataManager {
    private static _instance: BattlePassDataManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonBattlePassData>=null;
    private is_load_completed:boolean=false;

    public static getInstance():BattlePassDataManager {
        if(this._instance==null) {
            this._instance=new BattlePassDataManager();
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
        LoadManager.loadJson('BattlePassData',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonBattlePassData成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonBattlePassData();
                jsonData=json[i];
                this.data.set(jsonData.BattlePassLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonBattlePassData(id:number):JsonBattlePassData {
        return this.data.get(id);
    }
    /**根据战令等级获取下一级所需经验值 */
    public getRequiredExp(id:number): number {
        return this.data.get(id).RequiredExp;
    }
    /**根据战令等级获取免费奖励道具ID */
    public getFreeRewardItem(id:number): number {
        return this.data.get(id).FreeRewardItem;
    }
    /**根据战令等级获取免费奖励数量 */
    public getFreeRewardNum(id:number): number {
        return this.data.get(id).FreeRewardNum;
    }
    /**根据战令等级获取高级钻石奖励 */
    public getSeniorRewardGem(id:number): number {
        return this.data.get(id).SeniorRewardGem;
    }
    /**根据战令等级获取高级奖励道具ID */
    public getSeniorRewardItem(id:number): number {
        return this.data.get(id).SeniorRewardItem;
    }
    /**根据战令等级获取高级奖励数量 */
    public getSeniorRewardNum(id:number): number {
        return this.data.get(id).SeniorRewardNum;
    }

    /** 静态方法，获取最大的 战令等级*/
    public static getMaxBattlePassLevel():number {
        return 15;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
