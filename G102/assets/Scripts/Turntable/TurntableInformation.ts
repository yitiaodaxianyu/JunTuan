import { LoadManager } from "../Loading/LoadManager";

export class JsonTurntableInformation {
    /**展示位 */
    public DisplayPosition:number = 0 ;
    /**道具ID */
    public ItemID:number = 0 ;
    /**道具数量 */
    public ItemNum:number = 0 ;
}

export class TurntableInformationManager {
    private static _instance: TurntableInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTurntableInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TurntableInformationManager {
        if(this._instance==null) {
            this._instance=new TurntableInformationManager();
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
        LoadManager.loadJson('TurntableInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTurntableInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTurntableInformation();
                jsonData=json[i];
                this.data.set(jsonData.DisplayPosition,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTurntableInformation(id:number):JsonTurntableInformation {
        return this.data.get(id);
    }
    /**根据展示位获取道具ID */
    public getItemID(id:number): number {
        return this.data.get(id).ItemID;
    }
    /**根据展示位获取道具数量 */
    public getItemNum(id:number): number {
        return this.data.get(id).ItemNum;
    }

    /** 静态方法，获取最大的 展示位*/
    public static getMaxDisplayPosition():number {
        return 6;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
