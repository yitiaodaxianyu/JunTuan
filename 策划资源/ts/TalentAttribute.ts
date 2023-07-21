export class JsonTalentAttribute {
    /**天赋id */
    public TalentID:number = 0 ;
    /**天赋类型 */
    public TalentType:number = 0 ;
    /**天赋等级 */
    public TalentLevel:number = 0 ;
    /**属性参数 */
    public AttributeParameter:number = 0 ;
}

export class TalentAttributeManager {
    private static _instance: TalentAttributeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTalentAttribute>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TalentAttributeManager {
        if(this._instance==null) {
            this._instance=new TalentAttributeManager();
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
        LoadManager.loadJson('TalentAttribute',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTalentAttribute成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTalentAttribute();
                jsonData=json[i];
                this.data.set(jsonData.TalentID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTalentAttribute(id:number):JsonTalentAttribute {
        return this.data.get(id);
    }
    /**根据天赋id获取天赋类型 */
    public getTalentType(id:number): number {
        return this.data.get(id).TalentType;
    }
    /**根据天赋id获取天赋等级 */
    public getTalentLevel(id:number): number {
        return this.data.get(id).TalentLevel;
    }
    /**根据天赋id获取属性参数 */
    public getAttributeParameter(id:number): number {
        return this.data.get(id).AttributeParameter;
    }

    /** 静态方法，获取最大的 天赋id*/
    public static getMaxTalentID():number {
        return 8002;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
