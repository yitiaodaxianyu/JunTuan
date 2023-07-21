export class JsonRogueReward {
    /**关卡ID */
    public LevelID:number = 0 ;
    /**章节 */
    public Chapter:number = 0 ;
    /**格子ID */
    public Hexagon_ID:number = 0 ;
    /**道具1_ID */
    public RogueProp1_ID:number = 0 ;
    /**道具1_数量 */
    public RogueProp1_Sum:number = 0 ;
    /**专武奖池集 */
    public RogueProp2_ID:number = 0 ;
    /**奖励数量 */
    public RogueProp2_Sum:number = 0 ;
}

export class RogueRewardManager {
    private static _instance: RogueRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueRewardManager {
        if(this._instance==null) {
            this._instance=new RogueRewardManager();
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
        LoadManager.loadJson('RogueReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueReward();
                jsonData=json[i];
                this.data.set(jsonData.LevelID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueReward(id:number):JsonRogueReward {
        return this.data.get(id);
    }
    /**根据关卡ID获取章节 */
    public getChapter(id:number): number {
        return this.data.get(id).Chapter;
    }
    /**根据关卡ID获取格子ID */
    public getHexagon_ID(id:number): number {
        return this.data.get(id).Hexagon_ID;
    }
    /**根据关卡ID获取道具1_ID */
    public getRogueProp1_ID(id:number): number {
        return this.data.get(id).RogueProp1_ID;
    }
    /**根据关卡ID获取道具1_数量 */
    public getRogueProp1_Sum(id:number): number {
        return this.data.get(id).RogueProp1_Sum;
    }
    /**根据关卡ID获取专武奖池集 */
    public getRogueProp2_ID(id:number): number {
        return this.data.get(id).RogueProp2_ID;
    }
    /**根据关卡ID获取奖励数量 */
    public getRogueProp2_Sum(id:number): number {
        return this.data.get(id).RogueProp2_Sum;
    }

    /** 静态方法，获取最大的 关卡ID*/
    public static getMaxLevelID():number {
        return 818;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
