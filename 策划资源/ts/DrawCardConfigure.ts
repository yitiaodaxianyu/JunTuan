export class JsonDrawCardConfigure {
    /**奖池集ID */
    public JakcpotsID:number = 0 ;
    /**包含奖池ID */
    public JackpotID:number[] = [] ;
    /**奖池类型 */
    public JackpotType:number = 0 ;
    /**配置权重 */
    public ConfigureWeights:number = 0 ;
    /**权重类型 */
    public WeightType:number = 0 ;
    /**参数1 */
    public Parameter_1:number = 0 ;
    /**参数2 */
    public Parameter_2:number = 0 ;
    /**参数3 */
    public Parameter_3:number = 0 ;
}

export class DrawCardConfigureManager {
    private static _instance: DrawCardConfigureManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDrawCardConfigure>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DrawCardConfigureManager {
        if(this._instance==null) {
            this._instance=new DrawCardConfigureManager();
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
        LoadManager.loadJson('DrawCardConfigure',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardConfigure成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDrawCardConfigure();
                jsonData=json[i];
                this.data.set(jsonData.JakcpotsID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonDrawCardConfigure(id:number):JsonDrawCardConfigure {
        return this.data.get(id);
    }
    /**根据奖池集ID获取包含奖池ID */
    public getJackpotID(id:number): number[] {
        return this.data.get(id).JackpotID;
    }
    /**根据奖池集ID获取奖池类型 */
    public getJackpotType(id:number): number {
        return this.data.get(id).JackpotType;
    }
    /**根据奖池集ID获取配置权重 */
    public getConfigureWeights(id:number): number {
        return this.data.get(id).ConfigureWeights;
    }
    /**根据奖池集ID获取权重类型 */
    public getWeightType(id:number): number {
        return this.data.get(id).WeightType;
    }
    /**根据奖池集ID获取参数1 */
    public getParameter_1(id:number): number {
        return this.data.get(id).Parameter_1;
    }
    /**根据奖池集ID获取参数2 */
    public getParameter_2(id:number): number {
        return this.data.get(id).Parameter_2;
    }
    /**根据奖池集ID获取参数3 */
    public getParameter_3(id:number): number {
        return this.data.get(id).Parameter_3;
    }

    /** 静态方法，获取最大的 奖池集ID*/
    public static getMaxJakcpotsID():number {
        return 313;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
