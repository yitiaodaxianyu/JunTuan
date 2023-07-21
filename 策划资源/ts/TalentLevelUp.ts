export class JsonTalentLevelUp {
    /**等级 */
    public Level:number = 0 ;
    /**天赋点消耗 */
    public PointCost:number = 0 ;
    /**金币消耗 */
    public CoinCost:number = 0 ;
    /**玩家等级限制 */
    public PlayerLevelLimit:number = 0 ;
}

export class TalentLevelUpManager {
    private static _instance: TalentLevelUpManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTalentLevelUp>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TalentLevelUpManager {
        if(this._instance==null) {
            this._instance=new TalentLevelUpManager();
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
        LoadManager.loadJson('TalentLevelUp',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTalentLevelUp成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTalentLevelUp();
                jsonData=json[i];
                this.data.set(jsonData.Level,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTalentLevelUp(id:number):JsonTalentLevelUp {
        return this.data.get(id);
    }
    /**根据等级获取天赋点消耗 */
    public getPointCost(id:number): number {
        return this.data.get(id).PointCost;
    }
    /**根据等级获取金币消耗 */
    public getCoinCost(id:number): number {
        return this.data.get(id).CoinCost;
    }
    /**根据等级获取玩家等级限制 */
    public getPlayerLevelLimit(id:number): number {
        return this.data.get(id).PlayerLevelLimit;
    }

    /** 静态方法，获取最大的 等级*/
    public static getMaxLevel():number {
        return 36;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
