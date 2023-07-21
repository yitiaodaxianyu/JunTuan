export class JsonRogueHeroLease {
    /**关卡章节 */
    public ChapterLevel:number = 0 ;
    /**英雄奖池ID */
    public HeroLeaseID:number[] = [] ;
    /**宠物组权重 */
    public HeroWeight:number[] = [] ;
    /**英雄等级 */
    public HeroLevel:number[] = [] ;
    /**英雄星级 */
    public HeroStar:number[] = [] ;
    /**装备品质 */
    public EquipmentQuality:number[] = [] ;
    /**装备星级 */
    public EquipmentStar:number[] = [] ;
}

export class RogueHeroLeaseManager {
    private static _instance: RogueHeroLeaseManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueHeroLease>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueHeroLeaseManager {
        if(this._instance==null) {
            this._instance=new RogueHeroLeaseManager();
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
        LoadManager.loadJson('RogueHeroLease',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueHeroLease成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueHeroLease();
                jsonData=json[i];
                this.data.set(jsonData.ChapterLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonRogueHeroLease(id:number):JsonRogueHeroLease {
        return this.data.get(id);
    }
    /**根据关卡章节获取英雄奖池ID */
    public getHeroLeaseID(id:number): number[] {
        return this.data.get(id).HeroLeaseID;
    }
    /**根据关卡章节获取宠物组权重 */
    public getHeroWeight(id:number): number[] {
        return this.data.get(id).HeroWeight;
    }
    /**根据关卡章节获取英雄等级 */
    public getHeroLevel(id:number): number[] {
        return this.data.get(id).HeroLevel;
    }
    /**根据关卡章节获取英雄星级 */
    public getHeroStar(id:number): number[] {
        return this.data.get(id).HeroStar;
    }
    /**根据关卡章节获取装备品质 */
    public getEquipmentQuality(id:number): number[] {
        return this.data.get(id).EquipmentQuality;
    }
    /**根据关卡章节获取装备星级 */
    public getEquipmentStar(id:number): number[] {
        return this.data.get(id).EquipmentStar;
    }

    /** 静态方法，获取最大的 关卡章节*/
    public static getMaxChapterLevel():number {
        return 8;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
