export class JsonOfflineRevenue {
    /**通关关卡 */
    public PassLevel:number = 0 ;
    /**每分钟金币 */
    public GetGold:number = 0 ;
    /**满溢时间(分钟) */
    public Time:number = 0 ;
    /**掉落装备奖池 */
    public DropJackPot:number = 0 ;
    /**每分钟掉落概率（千分比） */
    public Probability:number = 0 ;
    /**每分钟英雄经验 */
    public GetHeroExp:number = 0 ;
    /**每分钟玩家经验 */
    public GetPlayerExp:number = 0 ;
    /**每分钟晋升石 */
    public GetPromotion:number = 0 ;
    /**每分钟兽粮 */
    public GetAnimalFood:number = 0 ;
    /**每分钟普通精炼石 */
    public GetOrdinaryEnhancementStone:number = 0 ;
    /**每分钟中级精炼石 */
    public GetIntermediateEnhancementStone:number = 0 ;
    /**每分钟高级精炼石 */
    public GetSeniorEnhancementStone:number = 0 ;
}

export class OfflineRevenueManager {
    private static _instance: OfflineRevenueManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonOfflineRevenue>=null;
    private is_load_completed:boolean=false;

    public static getInstance():OfflineRevenueManager {
        if(this._instance==null) {
            this._instance=new OfflineRevenueManager();
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
        LoadManager.loadJson('OfflineRevenue',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonOfflineRevenue成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonOfflineRevenue();
                jsonData=json[i];
                this.data.set(jsonData.PassLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonOfflineRevenue(id:number):JsonOfflineRevenue {
        return this.data.get(id);
    }
    /**根据通关关卡获取每分钟金币 */
    public getGetGold(id:number): number {
        return this.data.get(id).GetGold;
    }
    /**根据通关关卡获取满溢时间(分钟) */
    public getTime(id:number): number {
        return this.data.get(id).Time;
    }
    /**根据通关关卡获取掉落装备奖池 */
    public getDropJackPot(id:number): number {
        return this.data.get(id).DropJackPot;
    }
    /**根据通关关卡获取每分钟掉落概率（千分比） */
    public getProbability(id:number): number {
        return this.data.get(id).Probability;
    }
    /**根据通关关卡获取每分钟英雄经验 */
    public getGetHeroExp(id:number): number {
        return this.data.get(id).GetHeroExp;
    }
    /**根据通关关卡获取每分钟玩家经验 */
    public getGetPlayerExp(id:number): number {
        return this.data.get(id).GetPlayerExp;
    }
    /**根据通关关卡获取每分钟晋升石 */
    public getGetPromotion(id:number): number {
        return this.data.get(id).GetPromotion;
    }
    /**根据通关关卡获取每分钟兽粮 */
    public getGetAnimalFood(id:number): number {
        return this.data.get(id).GetAnimalFood;
    }
    /**根据通关关卡获取每分钟普通精炼石 */
    public getGetOrdinaryEnhancementStone(id:number): number {
        return this.data.get(id).GetOrdinaryEnhancementStone;
    }
    /**根据通关关卡获取每分钟中级精炼石 */
    public getGetIntermediateEnhancementStone(id:number): number {
        return this.data.get(id).GetIntermediateEnhancementStone;
    }
    /**根据通关关卡获取每分钟高级精炼石 */
    public getGetSeniorEnhancementStone(id:number): number {
        return this.data.get(id).GetSeniorEnhancementStone;
    }

    /** 静态方法，获取最大的 通关关卡*/
    public static getMaxPassLevel():number {
        return 255;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
