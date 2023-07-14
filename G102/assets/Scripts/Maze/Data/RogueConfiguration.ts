import { LoadManager } from "../../Loading/LoadManager";


export class JsonRogueConfiguration {
    /**主线关卡 */
    public MainlineLevel:number = 0 ;
    /**第一个战斗格子战力 */
    public FirstfightHexagon:number = 0 ;
}

export class RogueConfigurationManager {
    private static _instance: RogueConfigurationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueConfiguration>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueConfigurationManager {
        if(this._instance==null) {
            this._instance=new RogueConfigurationManager();
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
        LoadManager.loadJson('RogueConfiguration',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueConfiguration成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueConfiguration();
                jsonData=json[i];
                this.data.set(jsonData.MainlineLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueConfiguration(id:number):JsonRogueConfiguration {
        return this.data.get(id);
    }
    /**根据主线关卡获取第一个战斗格子战力 */
    public getFirstfightHexagon(id:number): number {
        return this.data.get(id).FirstfightHexagon;
    }

    /** 静态方法，获取最大的 主线关卡*/
    public static getMaxMainlineLevel():number {
        return 100;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
