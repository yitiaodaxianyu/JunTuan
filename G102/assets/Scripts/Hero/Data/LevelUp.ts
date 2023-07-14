import { LoadManager } from "../../Loading/LoadManager";

export class JsonLevelUp {
    /**等级 */
    public Level:number = 0 ;
    /**金币消耗 */
    public CostCoin:number = 0 ;
    /**钻石消耗 */
    public CostGem:number = 0 ;
    /**关卡限制 */
    public LevelLimit:number = 0 ;
}

export class LevelUpManager {
    private static _instance: LevelUpManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonLevelUp>=null;
    private is_load_completed:boolean=false;

    public static getInstance():LevelUpManager {
        if(this._instance==null) {
            this._instance=new LevelUpManager();
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
        LoadManager.loadJson('LevelUp',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonLevelUp成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonLevelUp();
                jsonData=json[i];
                this.data.set(jsonData.Level,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonLevelUp(id:number):JsonLevelUp {
        return this.data.get(id);
    }
    /**根据等级获取金币消耗 */
    public getCostCoin(id:number): number {
        return this.data.get(id).CostCoin;
    }
    /**根据等级获取钻石消耗 */
    public getCostGem(id:number): number {
        return this.data.get(id).CostGem;
    }
    /**根据等级获取关卡限制 */
    public getLevelLimit(id:number): number {
        return this.data.get(id).LevelLimit;
    }

    /** 静态方法，获取最大的 等级*/
    public static getMaxLevel():number {
        return 100;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    /**根据当前的等级获取所消耗的总金币 */
    getNowLevelAllCostCoin(level:number):number[]{
        level -= 1;
        let sum1 = 0;
        let sum2 = 0;
        for(;level>0;level--){
            sum1 += this.data.get(level).CostCoin;
            sum2 += this.data.get(level).CostGem;
        }
        return [sum1,sum2];
    }
}
