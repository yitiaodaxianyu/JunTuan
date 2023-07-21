export class Json每周奖励 {
    /**奖励档次 */
    public RewardGrade:number = 0 ;
    /**奖励道具 */
    public RewarItem:number[] = [] ;
    /**奖励数量 */
    public RewardNum:number[] = [] ;
}

export class 每周奖励Manager {
    private static _instance: 每周奖励Manager = null;
    //把json数据转化成map数据
    private data:Map<number,Json每周奖励>=null;
    private is_load_completed:boolean=false;

    public static getInstance():每周奖励Manager {
        if(this._instance==null) {
            this._instance=new 每周奖励Manager();
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
        LoadManager.loadJson('每周奖励',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载Json每周奖励成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new Json每周奖励();
                jsonData=json[i];
                this.data.set(jsonData.RewardGrade,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJson每周奖励(id:number):Json每周奖励 {
        return this.data.get(id);
    }
    /**根据奖励档次获取奖励道具 */
    public getRewarItem(id:number): number[] {
        return this.data.get(id).RewarItem;
    }
    /**根据奖励档次获取奖励数量 */
    public getRewardNum(id:number): number[] {
        return this.data.get(id).RewardNum;
    }

    /** 静态方法，获取最大的 奖励档次*/
    public static getMaxRewardGrade():number {
        return 7;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
