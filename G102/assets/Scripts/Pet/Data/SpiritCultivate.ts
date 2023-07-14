import { LoadManager } from "../../Loading/LoadManager";

export class JsonSpiritCultivate {
    /**当前灵宠阶段 */
    public Stage:number = 0 ;
    /**下一级兽粮消耗 */
    public FoodCost:number = 0 ;
    /**下一级金币消耗 */
    public CoinCost:number = 0 ;
    /**下一级宠物1级本体消耗 */
    public CoinSpirit:number = 0 ;
    /**下一级钻石消耗 */
    public DiamondCost:number = 0 ;
}

export class SpiritCultivateManager {
    private static _instance: SpiritCultivateManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritCultivate>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritCultivateManager {
        if(this._instance==null) {
            this._instance=new SpiritCultivateManager();
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
        LoadManager.loadJson('SpiritCultivate',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritCultivate成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritCultivate();
                jsonData=json[i];
                this.data.set(jsonData.Stage,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritCultivate(id:number):JsonSpiritCultivate {
        return this.data.get(id);
    }
    /**根据当前灵宠阶段获取下一级兽粮消耗 */
    public getFoodCost(id:number): number {
        return this.data.get(id).FoodCost;
    }
    /**根据当前灵宠阶段获取下一级金币消耗 */
    public getCoinCost(id:number): number {
        return this.data.get(id).CoinCost;
    }
    /**根据当前灵宠阶段获取下一级宠物1级本体消耗 */
    public getCoinSpirit(id:number): number {
        return this.data.get(id).CoinSpirit;
    }
    /**根据当前灵宠阶段获取下一级钻石消耗 */
    public getDiamondCost(id:number): number {
        return this.data.get(id).DiamondCost;
    }

    /** 静态方法，获取最大的 当前灵宠阶段*/
    public static getMaxStage():number {
        return 13;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
