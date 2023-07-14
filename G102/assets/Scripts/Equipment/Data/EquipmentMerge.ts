import { LoadManager } from "../../Loading/LoadManager";


export class JsonEquipmentMerge {
    /**消耗装备id */
    public CostEquipment_id:number = 0 ;
    /**消耗装备数量 */
    public CostNumber:number = 0 ;
    /**目标装备id */
    public TargetEquipment_id:number = 0 ;
    /**消耗金币数量 */
    public CostCoin:number = 0 ;
}

export class EquipmentMergeManager {
    private static _instance: EquipmentMergeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEquipmentMerge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EquipmentMergeManager {
        if(this._instance==null) {
            this._instance=new EquipmentMergeManager();
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
        LoadManager.loadJson('EquipmentMerge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentMerge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEquipmentMerge();
                jsonData=json[i];
                this.data.set(jsonData.CostEquipment_id,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEquipmentMerge(id:number):JsonEquipmentMerge {
        return this.data.get(id);
    }
    /**根据消耗装备id获取消耗装备数量 */
    public getCostNumber(id:number): number {
        return this.data.get(id).CostNumber;
    }
    /**根据消耗装备id获取目标装备id */
    public getTargetEquipment_id(id:number): number {
        return this.data.get(id).TargetEquipment_id;
    }
    /**根据消耗装备id获取消耗金币数量 */
    public getCostCoin(id:number): number {
        return this.data.get(id).CostCoin;
    }

    /** 静态方法，获取最大的 消耗装备id*/
    public static getMaxCostEquipment_id():number {
        return 3035;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    getData():Map<number,JsonEquipmentMerge>{
        return this.data;
    }

    getCostId(equipId:number):number{
        let costId=0;
        this.data.forEach((v,k)=>{
            if(v.TargetEquipment_id==equipId){
                costId=k;
            }
        });
        return costId;
    }
}