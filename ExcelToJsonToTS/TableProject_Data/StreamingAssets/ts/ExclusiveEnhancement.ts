export class JsonExclusiveEnhancement {
    /**专武属性ID */
    public ExclusiveWeapon:number = 0 ;
    /**英雄ID */
    public HeroID:number = 0 ;
    /**总阶段 */
    public SumStage:number = 0 ;
    /**星级 */
    public Star:number = 0 ;
    /**当前阶段 */
    public CurrentStage:number = 0 ;
    /**攻击力 */
    public Attack:number = 0 ;
    /**生命值 */
    public Health:number = 0 ;
    /**防御力 */
    public Defense:number = 0 ;
}

export class ExclusiveEnhancementManager {
    private static _instance: ExclusiveEnhancementManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonExclusiveEnhancement>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ExclusiveEnhancementManager {
        if(this._instance==null) {
            this._instance=new ExclusiveEnhancementManager();
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
        LoadManager.loadJson('ExclusiveEnhancement',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonExclusiveEnhancement成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonExclusiveEnhancement();
                jsonData=json[i];
                this.data.set(jsonData.ExclusiveWeapon,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonExclusiveEnhancement(id:number):JsonExclusiveEnhancement {
        return this.data.get(id);
    }
    /**根据专武属性ID获取英雄ID */
    public getHeroID(id:number): number {
        return this.data.get(id).HeroID;
    }
    /**根据专武属性ID获取总阶段 */
    public getSumStage(id:number): number {
        return this.data.get(id).SumStage;
    }
    /**根据专武属性ID获取星级 */
    public getStar(id:number): number {
        return this.data.get(id).Star;
    }
    /**根据专武属性ID获取当前阶段 */
    public getCurrentStage(id:number): number {
        return this.data.get(id).CurrentStage;
    }
    /**根据专武属性ID获取攻击力 */
    public getAttack(id:number): number {
        return this.data.get(id).Attack;
    }
    /**根据专武属性ID获取生命值 */
    public getHealth(id:number): number {
        return this.data.get(id).Health;
    }
    /**根据专武属性ID获取防御力 */
    public getDefense(id:number): number {
        return this.data.get(id).Defense;
    }

    /** 静态方法，获取最大的 专武属性ID*/
    public static getMaxExclusiveWeapon():number {
        return 12031;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
