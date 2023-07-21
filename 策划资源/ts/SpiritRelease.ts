export class JsonSpiritRelease {
    /**放生ID */
    public ReleaseId:number = 0 ;
    /**稀有度 */
    public SpiritRarity:number = 0 ;
    /**品质 */
    public SpiritQuality:number = 0 ;
    /**获得道具 */
    public GetItem:number = 0 ;
    /**获得数量 */
    public GetNum:number = 0 ;
}

export class SpiritReleaseManager {
    private static _instance: SpiritReleaseManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritRelease>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritReleaseManager {
        if(this._instance==null) {
            this._instance=new SpiritReleaseManager();
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
        LoadManager.loadJson('SpiritRelease',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritRelease成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritRelease();
                jsonData=json[i];
                this.data.set(jsonData.ReleaseId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritRelease(id:number):JsonSpiritRelease {
        return this.data.get(id);
    }
    /**根据放生ID获取稀有度 */
    public getSpiritRarity(id:number): number {
        return this.data.get(id).SpiritRarity;
    }
    /**根据放生ID获取品质 */
    public getSpiritQuality(id:number): number {
        return this.data.get(id).SpiritQuality;
    }
    /**根据放生ID获取获得道具 */
    public getGetItem(id:number): number {
        return this.data.get(id).GetItem;
    }
    /**根据放生ID获取获得数量 */
    public getGetNum(id:number): number {
        return this.data.get(id).GetNum;
    }

    /** 静态方法，获取最大的 放生ID*/
    public static getMaxReleaseId():number {
        return 415;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
