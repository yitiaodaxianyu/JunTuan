export class JsonMilePost {
    /**里程碑ID */
    public MilePost_ID:number = 0 ;
    /**所需战力 */
    public RequiredFightCapacity:number = 0 ;
    /**获得奖励ID */
    public Reward_ID:number = 0 ;
    /**获得数量 */
    public Reward_Num:number = 0 ;
    /**看广告获得奖励ID */
    public ADReward_ID:number = 0 ;
    /**获得数量 */
    public ADReward_Num:number = 0 ;
}

export class MilePostManager {
    private static _instance: MilePostManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMilePost>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MilePostManager {
        if(this._instance==null) {
            this._instance=new MilePostManager();
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
        LoadManager.loadJson('MilePost',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMilePost成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMilePost();
                jsonData=json[i];
                this.data.set(jsonData.MilePost_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMilePost(id:number):JsonMilePost {
        return this.data.get(id);
    }
    /**根据里程碑ID获取所需战力 */
    public getRequiredFightCapacity(id:number): number {
        return this.data.get(id).RequiredFightCapacity;
    }
    /**根据里程碑ID获取获得奖励ID */
    public getReward_ID(id:number): number {
        return this.data.get(id).Reward_ID;
    }
    /**根据里程碑ID获取获得数量 */
    public getReward_Num(id:number): number {
        return this.data.get(id).Reward_Num;
    }
    /**根据里程碑ID获取看广告获得奖励ID */
    public getADReward_ID(id:number): number {
        return this.data.get(id).ADReward_ID;
    }
    /**根据里程碑ID获取获得数量 */
    public getADReward_Num(id:number): number {
        return this.data.get(id).ADReward_Num;
    }

    /** 静态方法，获取最大的 里程碑ID*/
    public static getMaxMilePost_ID():number {
        return 180;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
