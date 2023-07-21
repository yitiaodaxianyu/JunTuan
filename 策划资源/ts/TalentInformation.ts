export class JsonTalentInformation {
    /**天赋类型 */
    public TalentType:number = 0 ;
    /**名称文本 */
    public TalentName:number = 0 ;
    /**描述文本 */
    public TalentDiscribe:number = 0 ;
    /**随机权重 */
    public RandomWeight:number = 0 ;
    /**参数除数 */
    public ParameterDivisor:number = 0 ;
    /**最大等级 */
    public MaxLevel:number = 0 ;
    /**数值文本类型 */
    public ValueTextType:number = 0 ;
}

export class TalentInformationManager {
    private static _instance: TalentInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTalentInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TalentInformationManager {
        if(this._instance==null) {
            this._instance=new TalentInformationManager();
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
        LoadManager.loadJson('TalentInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTalentInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTalentInformation();
                jsonData=json[i];
                this.data.set(jsonData.TalentType,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTalentInformation(id:number):JsonTalentInformation {
        return this.data.get(id);
    }
    /**根据天赋类型获取名称文本 */
    public getTalentName(id:number): number {
        return this.data.get(id).TalentName;
    }
    /**根据天赋类型获取描述文本 */
    public getTalentDiscribe(id:number): number {
        return this.data.get(id).TalentDiscribe;
    }
    /**根据天赋类型获取随机权重 */
    public getRandomWeight(id:number): number {
        return this.data.get(id).RandomWeight;
    }
    /**根据天赋类型获取参数除数 */
    public getParameterDivisor(id:number): number {
        return this.data.get(id).ParameterDivisor;
    }
    /**根据天赋类型获取最大等级 */
    public getMaxLevel(id:number): number {
        return this.data.get(id).MaxLevel;
    }
    /**根据天赋类型获取数值文本类型 */
    public getValueTextType(id:number): number {
        return this.data.get(id).ValueTextType;
    }

    /** 静态方法，获取最大的 天赋类型*/
    public static getMaxTalentType():number {
        return 8;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
