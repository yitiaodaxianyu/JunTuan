export class JsonCombatEffectiveness {
    /**属性ID */
    public Attribute:number = 0 ;
    /**转换系数 */
    public ConversionFactor:number = 0 ;
}

export class CombatEffectivenessManager {
    private static _instance: CombatEffectivenessManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCombatEffectiveness>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CombatEffectivenessManager {
        if(this._instance==null) {
            this._instance=new CombatEffectivenessManager();
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
        LoadManager.loadJson('CombatEffectiveness',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCombatEffectiveness成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCombatEffectiveness();
                jsonData=json[i];
                this.data.set(jsonData.Attribute,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCombatEffectiveness(id:number):JsonCombatEffectiveness {
        return this.data.get(id);
    }
    /**根据属性ID获取转换系数 */
    public getConversionFactor(id:number): number {
        return this.data.get(id).ConversionFactor;
    }

    /** 静态方法，获取最大的 属性ID*/
    public static getMaxAttribute():number {
        return 9;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
