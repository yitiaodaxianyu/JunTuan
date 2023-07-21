export class JsonSCradPool {
    /**奖池ID */
    public JackpotID:number = 0 ;
    /**配置权重 */
}

export class SCradPoolManager {
    private static _instance: SCradPoolManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSCradPool>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SCradPoolManager {
        if(this._instance==null) {
            this._instance=new SCradPoolManager();
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
        LoadManager.loadJson('SCradPool',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSCradPool成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSCradPool();
                jsonData=json[i];
                this.data.set(jsonData.JackpotID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSCradPool(id:number):JsonSCradPool {
        return this.data.get(id);
    }
    /**根据奖池ID获取配置权重 */
    public getConfigureWeights(id:number):  {
        return this.data.get(id).ConfigureWeights;
    }

    /** 静态方法，获取最大的 奖池ID*/
    public static getMaxJackpotID():number {
        return 20005;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
