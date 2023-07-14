import { LoadManager } from "../../Loading/LoadManager";


export class JsonMonsterGroupConfigure {
    /**怪物组ID */
    public MonsterGroup:number = 0 ;
    /**怪物ID */
    public MonsterId:number[] = [] ;
    /**怪物数量 */
    public MonsterNum:number[] = [] ;
    /**刷新间隔 */
    public RefreshInterval:number[] = [] ;
}

export class MonsterGroupConfigureManager {
    private static _instance: MonsterGroupConfigureManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMonsterGroupConfigure>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MonsterGroupConfigureManager {
        if(this._instance==null) {
            this._instance=new MonsterGroupConfigureManager();
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
        LoadManager.loadJson('MonsterGroupConfigure',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterGroupConfigure成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMonsterGroupConfigure();
                jsonData=json[i];
                this.data.set(jsonData.MonsterGroup,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMonsterGroupConfigure(id:number):JsonMonsterGroupConfigure {
        return this.data.get(id);
    }
    /**根据怪物组ID获取怪物ID */
    public getMonsterId(id:number): number[] {
        return this.data.get(id).MonsterId;
    }
    /**根据怪物组ID获取怪物数量 */
    public getMonsterNum(id:number): number[] {
        return this.data.get(id).MonsterNum;
    }
    /**根据怪物组ID获取刷新间隔 */
    public getRefreshInterval(id:number): number[] {
        return this.data.get(id).RefreshInterval;
    }

    /** 静态方法，获取最大的 怪物组ID*/
    public static getMaxMonsterGroup():number {
        return 20;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
