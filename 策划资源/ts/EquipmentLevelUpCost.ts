export class JsonEquipmentLevelUpCost {
    /**装备等级 */
    public EquipmentLevel:number = 0 ;
    /**金币消耗 */
    public CoinCost:number = 0 ;
    /**关卡限制 */
    public LevelLimit:number = 0 ;
}

export class EquipmentLevelUpCostManager {
    private static _instance: EquipmentLevelUpCostManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEquipmentLevelUpCost>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EquipmentLevelUpCostManager {
        if(this._instance==null) {
            this._instance=new EquipmentLevelUpCostManager();
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
        LoadManager.loadJson('EquipmentLevelUpCost',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentLevelUpCost成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEquipmentLevelUpCost();
                jsonData=json[i];
                this.data.set(jsonData.EquipmentLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEquipmentLevelUpCost(id:number):JsonEquipmentLevelUpCost {
        return this.data.get(id);
    }
    /**根据装备等级获取金币消耗 */
    public getCoinCost(id:number): number {
        return this.data.get(id).CoinCost;
    }
    /**根据装备等级获取关卡限制 */
    public getLevelLimit(id:number): number {
        return this.data.get(id).LevelLimit;
    }

    /** 静态方法，获取最大的 装备等级*/
    public static getMaxEquipmentLevel():number {
        return 100;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
