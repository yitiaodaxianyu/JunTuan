import { LoadManager } from "../../Loading/LoadManager";


export class JsonRoguePetsLease {
    /**主线章节 */
    public Chapter:number = 0 ;
    /**宠物奖池ID */
    public PetsLeaseID:number[] = [] ;
    /**宠物组权重 */
    public PetsWeight:number[] = [] ;
    /**宠物品质 */
    public PetsQuality:number[] = [] ;
}

export class RoguePetsLeaseManager {
    private static _instance: RoguePetsLeaseManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRoguePetsLease>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RoguePetsLeaseManager {
        if(this._instance==null) {
            this._instance=new RoguePetsLeaseManager();
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
        LoadManager.loadJson('RoguePetsLease',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRoguePetsLease成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRoguePetsLease();
                jsonData=json[i];
                this.data.set(jsonData.Chapter,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRoguePetsLease(id:number):JsonRoguePetsLease {
        return this.data.get(id);
    }
    /**根据主线章节获取宠物奖池ID */
    public getPetsLeaseID(id:number): number[] {
        return this.data.get(id).PetsLeaseID;
    }
    /**根据主线章节获取宠物组权重 */
    public getPetsWeight(id:number): number[] {
        return this.data.get(id).PetsWeight;
    }
    /**根据主线章节获取宠物品质 */
    public getPetsQuality(id:number): number[] {
        return this.data.get(id).PetsQuality;
    }

    /** 静态方法，获取最大的 主线章节*/
    public static getMaxChapter():number {
        return 10;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
