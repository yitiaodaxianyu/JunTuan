export class JsonLevelUpRebate {
    /**奖励ID */
    public RewardID:number = 0 ;
    /**获得钻石 */
    public GetGem:number = 0 ;
    /**解锁等级 */
    public UnlockUserLevel:number = 0 ;
}

export class LevelUpRebateManager {
    private static _instance: LevelUpRebateManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonLevelUpRebate>=null;
    private is_load_completed:boolean=false;

    public static getInstance():LevelUpRebateManager {
        if(this._instance==null) {
            this._instance=new LevelUpRebateManager();
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
        LoadManager.loadJson('LevelUpRebate',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonLevelUpRebate成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonLevelUpRebate();
                jsonData=json[i];
                this.data.set(jsonData.RewardID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonLevelUpRebate(id:number):JsonLevelUpRebate {
        return this.data.get(id);
    }
    /**根据奖励ID获取获得钻石 */
    public getGetGem(id:number): number {
        return this.data.get(id).GetGem;
    }
    /**根据奖励ID获取解锁等级 */
    public getUnlockUserLevel(id:number): number {
        return this.data.get(id).UnlockUserLevel;
    }

    /** 静态方法，获取最大的 奖励ID*/
    public static getMaxRewardID():number {
        return 20;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
