import { LoadManager } from "../../Loading/LoadManager";

export class JsonSpiritQualityMessage {
    /**品质 */
    public SpiritQuality:number = 0 ;
    /**品质名 */
    public SpiritQualityName:number = 0 ;
    /**品质框 */
    public SpiritQualityframe:number = 0 ;
    /**星级 */
    public SpiritQualityStar:number = 0 ;
}

export class SpiritQualityMessageManager {
    private static _instance: SpiritQualityMessageManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritQualityMessage>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritQualityMessageManager {
        if(this._instance==null) {
            this._instance=new SpiritQualityMessageManager();
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
        LoadManager.loadJson('SpiritQualityMessage',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritQualityMessage成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritQualityMessage();
                jsonData=json[i];
                this.data.set(jsonData.SpiritQuality,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritQualityMessage(id:number):JsonSpiritQualityMessage {
        return this.data.get(id);
    }
    /**根据品质获取品质名 */
    public getSpiritQualityName(id:number): number {
        return this.data.get(id).SpiritQualityName;
    }
    /**根据品质获取品质框 */
    public getSpiritQualityframe(id:number): number {
        return this.data.get(id).SpiritQualityframe;
    }
    /**根据品质获取星级 */
    public getSpiritQualityStar(id:number): number {
        return this.data.get(id).SpiritQualityStar;
    }

    /** 静态方法，获取最大的 品质*/
    public static getMaxSpiritQuality():number {
        return 15;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
