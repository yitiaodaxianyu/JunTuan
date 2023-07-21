export class JsonEquipmentInfo {
    /**装备ID */
    public Equipment_ID:number = 0 ;
    /**装备等级 */
    public Level:number = 0 ;
    /**装备位置 */
    public EquipmentPosition:number = 0 ;
    /**属性类型 */
    public AttributionType:number = 0 ;
}

export class EquipmentInfoManager {
    private static _instance: EquipmentInfoManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEquipmentInfo>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EquipmentInfoManager {
        if(this._instance==null) {
            this._instance=new EquipmentInfoManager();
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
        LoadManager.loadJson('EquipmentInfo',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentInfo成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEquipmentInfo();
                jsonData=json[i];
                this.data.set(jsonData.Equipment_ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEquipmentInfo(id:number):JsonEquipmentInfo {
        return this.data.get(id);
    }
    /**根据装备ID获取装备等级 */
    public getLevel(id:number): number {
        return this.data.get(id).Level;
    }
    /**根据装备ID获取装备位置 */
    public getEquipmentPosition(id:number): number {
        return this.data.get(id).EquipmentPosition;
    }
    /**根据装备ID获取属性类型 */
    public getAttributionType(id:number): number {
        return this.data.get(id).AttributionType;
    }

    /** 静态方法，获取最大的 装备ID*/
    public static getMaxEquipment_ID():number {
        return 33303;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
