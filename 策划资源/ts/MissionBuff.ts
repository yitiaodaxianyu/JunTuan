export class JsonMissionBuff {
    /**关卡buff ID */
    public BuffID:number = 0 ;
    /**文本ID */
    public Text_ID:number = 0 ;
    /**buff类型 */
    public Type:number = 0 ;
    /**品质级别 */
    public Quaility:number = 0 ;
    /**权重 */
    public Weight:number = 0 ;
    /**其他模式权重 */
    public OtherMode_Weight:number = 0 ;
    /**数值 */
    public Value:number = 0 ;
}

export class MissionBuffManager {
    private static _instance: MissionBuffManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMissionBuff>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MissionBuffManager {
        if(this._instance==null) {
            this._instance=new MissionBuffManager();
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
        LoadManager.loadJson('MissionBuff',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMissionBuff成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMissionBuff();
                jsonData=json[i];
                this.data.set(jsonData.BuffID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMissionBuff(id:number):JsonMissionBuff {
        return this.data.get(id);
    }
    /**根据关卡buff ID获取文本ID */
    public getText_ID(id:number): number {
        return this.data.get(id).Text_ID;
    }
    /**根据关卡buff ID获取buff类型 */
    public getType(id:number): number {
        return this.data.get(id).Type;
    }
    /**根据关卡buff ID获取品质级别 */
    public getQuaility(id:number): number {
        return this.data.get(id).Quaility;
    }
    /**根据关卡buff ID获取权重 */
    public getWeight(id:number): number {
        return this.data.get(id).Weight;
    }
    /**根据关卡buff ID获取其他模式权重 */
    public getOtherMode_Weight(id:number): number {
        return this.data.get(id).OtherMode_Weight;
    }
    /**根据关卡buff ID获取数值 */
    public getValue(id:number): number {
        return this.data.get(id).Value;
    }

    /** 静态方法，获取最大的 关卡buff ID*/
    public static getMaxBuffID():number {
        return 10703;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
