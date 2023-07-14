import { LoadManager } from "../../Loading/LoadManager";


export class JsonSpiritLevelUp {
    /**灵宠等级 */
    public Spirit:number = 0 ;
    /**兽粮消耗 */
    public FoodCost:number = 0 ;
    /**金币消耗 */
    public CoinCost:number = 0 ;
    /**被动技能1等级 */
    public PassiveSkillLevel_1:number = 0 ;
    /**主动技能等级 */
    public ActiveSkillLevel:number = 0 ;
    /**被动技能2等级 */
    public PassiveSkillLevel_2:number = 0 ;
}

export class SpiritLevelUpManager {
    private static _instance: SpiritLevelUpManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonSpiritLevelUp>=null;
    private is_load_completed:boolean=false;

    public static getInstance():SpiritLevelUpManager {
        if(this._instance==null) {
            this._instance=new SpiritLevelUpManager();
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
        LoadManager.loadJson('SpiritLevelUp',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonSpiritLevelUp成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonSpiritLevelUp();
                jsonData=json[i];
                this.data.set(jsonData.Spirit,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonSpiritLevelUp(id:number):JsonSpiritLevelUp {
        return this.data.get(id);
    }
    /**根据灵宠等级获取兽粮消耗 */
    public getFoodCost(id:number): number {
        return this.data.get(id).FoodCost;
    }
    /**根据灵宠等级获取金币消耗 */
    public getCoinCost(id:number): number {
        return this.data.get(id).CoinCost;
    }
    /**根据灵宠等级获取被动技能1等级 */
    public getPassiveSkillLevel_1(id:number): number {
        return this.data.get(id).PassiveSkillLevel_1;
    }
    /**根据灵宠等级获取主动技能等级 */
    public getActiveSkillLevel(id:number): number {
        return this.data.get(id).ActiveSkillLevel;
    }
    /**根据灵宠等级获取被动技能2等级 */
    public getPassiveSkillLevel_2(id:number): number {
        return this.data.get(id).PassiveSkillLevel_2;
    }

    /** 静态方法，获取最大的 灵宠等级*/
    public static getMaxSpirit():number {
        return 200;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getNowLevelAllCostCoin(level:number):number{
        level -= 1;
        let sum = 0;
        for(;level>0;level--){
            sum += this.data.get(level).CoinCost;
        }
        return sum;
    }

    getNowLevelAllCostFood(level:number):number{
        level -= 1;
        let sum = 0;
        for(;level>0;level--){
            sum += this.data.get(level).FoodCost;
        }
        return sum;
    }

}
