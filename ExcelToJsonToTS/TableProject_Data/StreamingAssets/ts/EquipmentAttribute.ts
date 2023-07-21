export class JsonEquipmentAttribute {
    /**装备ID */
    public Equipment_ID:number = 0 ;
    /**装备位置 */
    public EquipmentPosition:number = 0 ;
    /**装备阶段 */
    public Stage:number = 0 ;
    /**装备品质 */
    public Quality:number = 0 ;
    /**基础生命值 */
    public BaseHealth:number = 0 ;
    /**基础攻击力 */
    public BaseAttack:number = 0 ;
    /**基础防御力 */
    public BaseDefense:number = 0 ;
}

export class EquipmentAttributeManager {
    private static _instance: EquipmentAttributeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEquipmentAttribute>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EquipmentAttributeManager {
        if(this._instance==null) {
            this._instance=new EquipmentAttributeManager();
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
        LoadManager.loadJson('EquipmentAttribute',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEquipmentAttribute成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEquipmentAttribute();
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
    public getJsonEquipmentAttribute(id:number):JsonEquipmentAttribute {
        return this.data.get(id);
    }
    /**根据装备ID获取装备位置 */
    public getEquipmentPosition(id:number): number {
        return this.data.get(id).EquipmentPosition;
    }
    /**根据装备ID获取装备阶段 */
    public getStage(id:number): number {
        return this.data.get(id).Stage;
    }
    /**根据装备ID获取装备品质 */
    public getQuality(id:number): number {
        return this.data.get(id).Quality;
    }
    /**根据装备ID获取基础生命值 */
    public getBaseHealth(id:number): number {
        return this.data.get(id).BaseHealth;
    }
    /**根据装备ID获取基础攻击力 */
    public getBaseAttack(id:number): number {
        return this.data.get(id).BaseAttack;
    }
    /**根据装备ID获取基础防御力 */
    public getBaseDefense(id:number): number {
        return this.data.get(id).BaseDefense;
    }

    /** 静态方法，获取最大的 装备ID*/
    public static getMaxEquipment_ID():number {
        return 30431;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
