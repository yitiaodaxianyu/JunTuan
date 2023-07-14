import { LoadManager } from "../Loading/LoadManager";

export class JsonPlayerLevelUp {
    /**等级 */
    public PlayerLevel:number = 0 ;
    /**经验消耗 */
    public PlayerExpCost:number = 0 ;
}

export class PlayerLevelUpManager {
    private static _instance: PlayerLevelUpManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonPlayerLevelUp>=null;
    private is_load_completed:boolean=false;

    public static getInstance():PlayerLevelUpManager {
        if(this._instance==null) {
            this._instance=new PlayerLevelUpManager();
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
        LoadManager.loadJson('PlayerLevelUp',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonPlayerLevelUp成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonPlayerLevelUp();
                jsonData=json[i];
                this.data.set(jsonData.PlayerLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonPlayerLevelUp(id:number):JsonPlayerLevelUp {
        return this.data.get(id);
    }
    /**根据等级获取经验消耗 */
    public getPlayerExpCost(id:number): number {
        return this.data.get(id).PlayerExpCost;
    }

    /** 静态方法，获取最大的 等级*/
    public static getMaxPlayerLevel():number {
        return 100;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
