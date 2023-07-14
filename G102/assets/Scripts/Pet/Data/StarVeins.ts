import { LoadManager } from "../../Loading/LoadManager";


export class JsonStarVeins {
    /**星脉ID */
    public StarVeinsId:number = 0 ;
    /**星脉名称 */
    public StarVeinsName:number = 0 ;
    /**品质 */
    public Quality:number = 0 ;
    /**节点数量 */
    public NodeNum:number = 0 ;
}

export class StarVeinsManager {
    private static _instance: StarVeinsManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonStarVeins>=null;
    private is_load_completed:boolean=false;

    public static getInstance():StarVeinsManager {
        if(this._instance==null) {
            this._instance=new StarVeinsManager();
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
        LoadManager.loadJson('StarVeins',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonStarVeins成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonStarVeins();
                jsonData=json[i];
                this.data.set(jsonData.StarVeinsId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonStarVeins(id:number):JsonStarVeins {
        return this.data.get(id);
    }
    /**根据星脉ID获取星脉名称 */
    public getStarVeinsName(id:number): number {
        return this.data.get(id).StarVeinsName;
    }
    /**根据星脉ID获取品质 */
    public getQuality(id:number): number {
        return this.data.get(id).Quality;
    }
    /**根据星脉ID获取节点数量 */
    public getNodeNum(id:number): number {
        return this.data.get(id).NodeNum;
    }

    /** 静态方法，获取最大的 星脉ID*/
    public static getMaxStarVeinsId():number {
        return 0;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
