export class JsonHeroQuality {
    /**星级养成ID */
    public StarCultivateID:number = 0 ;
    /**英雄品质 */
    public Quality:number = 0 ;
    /**阶段 */
    public Stage:number = 0 ;
    /**星级 */
    public Star:number = 0 ;
    /**当前阶段 */
    public CurrentStage:number = 0 ;
    /**消耗碎片数量 */
    public CostFragment:number = 0 ;
}

export class HeroQualityManager {
    private static _instance: HeroQualityManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonHeroQuality>=null;
    private is_load_completed:boolean=false;

    public static getInstance():HeroQualityManager {
        if(this._instance==null) {
            this._instance=new HeroQualityManager();
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
        LoadManager.loadJson('HeroQuality',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonHeroQuality成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonHeroQuality();
                jsonData=json[i];
                this.data.set(jsonData.StarCultivateID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonHeroQuality(id:number):JsonHeroQuality {
        return this.data.get(id);
    }
    /**根据星级养成ID获取英雄品质 */
    public getQuality(id:number): number {
        return this.data.get(id).Quality;
    }
    /**根据星级养成ID获取阶段 */
    public getStage(id:number): number {
        return this.data.get(id).Stage;
    }
    /**根据星级养成ID获取星级 */
    public getStar(id:number): number {
        return this.data.get(id).Star;
    }
    /**根据星级养成ID获取当前阶段 */
    public getCurrentStage(id:number): number {
        return this.data.get(id).CurrentStage;
    }
    /**根据星级养成ID获取消耗碎片数量 */
    public getCostFragment(id:number): number {
        return this.data.get(id).CostFragment;
    }

    /** 静态方法，获取最大的 星级养成ID*/
    public static getMaxStarCultivateID():number {
        return 6029;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
