import { LoadManager } from "../Loading/LoadManager";


export class JsonEggInformation {
    /**开蛋池ID */
    public EggsID:number = 0 ;
    /**开蛋池类型 */
    public EggsType:number = 0 ;
    /**获得奖池集ID */
    public EggsReward:number = 0 ;
    /**单抽道具1ID */
    public EggPropID_1:number = 0 ;
    /**单抽道具1消耗 */
    public EggPropNum_1:number = 0 ;
    /**十连抽道具消耗 */
    public TenEggProp_1:number = 0 ;
    /**单抽道具2id */
    public EggPropID_2:number = 0 ;
    /**单抽道具2数量 */
    public EggPropNum_2:number = 0 ;
    /**十连抽道具消耗 */
    public TenEggProp_2:number = 0 ;
}

export class EggInformationManager {
    private static _instance: EggInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEggInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EggInformationManager {
        if(this._instance==null) {
            this._instance=new EggInformationManager();
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
        LoadManager.loadJson('EggInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEggInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEggInformation();
                jsonData=json[i];
                this.data.set(jsonData.EggsID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEggInformation(id:number):JsonEggInformation {
        return this.data.get(id);
    }
    /**根据开蛋池ID获取开蛋池类型 */
    public getEggsType(id:number): number {
        return this.data.get(id).EggsType;
    }
    /**根据开蛋池ID获取获得奖池集ID */
    public getEggsReward(id:number): number {
        return this.data.get(id).EggsReward;
    }
    /**根据开蛋池ID获取单抽道具1ID */
    public getEggPropID_1(id:number): number {
        return this.data.get(id).EggPropID_1;
    }
    /**根据开蛋池ID获取单抽道具1消耗 */
    public getEggPropNum_1(id:number): number {
        return this.data.get(id).EggPropNum_1;
    }
    /**根据开蛋池ID获取十连抽道具消耗 */
    public getTenEggProp_1(id:number): number {
        return this.data.get(id).TenEggProp_1;
    }
    /**根据开蛋池ID获取单抽道具2id */
    public getEggPropID_2(id:number): number {
        return this.data.get(id).EggPropID_2;
    }
    /**根据开蛋池ID获取单抽道具2数量 */
    public getEggPropNum_2(id:number): number {
        return this.data.get(id).EggPropNum_2;
    }
    /**根据开蛋池ID获取十连抽道具消耗 */
    public getTenEggProp_2(id:number): number {
        return this.data.get(id).TenEggProp_2;
    }

    /** 静态方法，获取最大的 开蛋池ID*/
    public static getMaxEggsID():number {
        return 20001;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
