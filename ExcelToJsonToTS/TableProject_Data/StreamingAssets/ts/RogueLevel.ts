export class JsonRogueLevel {
    /**关卡ID */
    public Level:number = 0 ;
    /**怪物组配置 */
    public MonsterGroupConfigure:number[] = [] ;
    /**最大波次 */
    public MaxWave:number = 0 ;
    /**怪潮波次 */
    public MonsterTideWave:number[] = [] ;
    /**每波时间间隔 */
    public TimeInterval:number[] = [] ;
    /**怪物等级 */
    public MonsterLevel:number[] = [] ;
    /**血量系数 */
    public HpCoefficient:number[] = [] ;
}

export class RogueLevelManager {
    private static _instance: RogueLevelManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRogueLevel>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RogueLevelManager {
        if(this._instance==null) {
            this._instance=new RogueLevelManager();
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
        LoadManager.loadJson('RogueLevel',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRogueLevel成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRogueLevel();
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
    public getJsonRogueLevel(id:number):JsonRogueLevel {
        return this.data.get(id);
    }
    /**根据关卡ID获取怪物组配置 */
    public getMonsterGroupConfigure(id:number): number[] {
        return this.data.get(id).MonsterGroupConfigure;
    }
    /**根据关卡ID获取最大波次 */
    public getMaxWave(id:number): number {
        return this.data.get(id).MaxWave;
    }
    /**根据关卡ID获取怪潮波次 */
    public getMonsterTideWave(id:number): number[] {
        return this.data.get(id).MonsterTideWave;
    }
    /**根据关卡ID获取每波时间间隔 */
    public getTimeInterval(id:number): number[] {
        return this.data.get(id).TimeInterval;
    }
    /**根据关卡ID获取怪物等级 */
    public getMonsterLevel(id:number): number[] {
        return this.data.get(id).MonsterLevel;
    }
    /**根据关卡ID获取血量系数 */
    public getHpCoefficient(id:number): number[] {
        return this.data.get(id).HpCoefficient;
    }

    /** 静态方法，获取最大的 关卡ID*/
    public static getMaxLevel():number {
        return 80092;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
