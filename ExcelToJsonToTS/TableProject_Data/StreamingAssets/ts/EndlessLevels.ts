export class JsonEndlessLevels {
    /**回合 */
    public Round:number = 0 ;
    /**等级上限 */
    public LevelLimit_Upper:number = 0 ;
    /**等级下限 */
    public LevelLimit_Lower:number = 0 ;
    /**怪物数量 */
    public MonsterNum:number[] = [] ;
    /**血量系数 */
    public HpCoefficient:number[] = [] ;
    /**怪潮波次 */
    public MonsterTideWave:number[] = [] ;
    /**每波时间间隔 */
    public TimeInterval:number[] = [] ;
    /**普通怪id */
    public NormalMonster:number[] = [] ;
    /**精英怪id */
    public EliteMonster:number[] = [] ;
    /**精英怪概率 */
    public ProbabilityOfElite:number[] = [] ;
}

export class EndlessLevelsManager {
    private static _instance: EndlessLevelsManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEndlessLevels>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EndlessLevelsManager {
        if(this._instance==null) {
            this._instance=new EndlessLevelsManager();
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
        LoadManager.loadJson('EndlessLevels',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessLevels成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEndlessLevels();
                jsonData=json[i];
                this.data.set(jsonData.Round,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEndlessLevels(id:number):JsonEndlessLevels {
        return this.data.get(id);
    }
    /**根据回合获取等级上限 */
    public getLevelLimit_Upper(id:number): number {
        return this.data.get(id).LevelLimit_Upper;
    }
    /**根据回合获取等级下限 */
    public getLevelLimit_Lower(id:number): number {
        return this.data.get(id).LevelLimit_Lower;
    }
    /**根据回合获取怪物数量 */
    public getMonsterNum(id:number): number[] {
        return this.data.get(id).MonsterNum;
    }
    /**根据回合获取血量系数 */
    public getHpCoefficient(id:number): number[] {
        return this.data.get(id).HpCoefficient;
    }
    /**根据回合获取怪潮波次 */
    public getMonsterTideWave(id:number): number[] {
        return this.data.get(id).MonsterTideWave;
    }
    /**根据回合获取每波时间间隔 */
    public getTimeInterval(id:number): number[] {
        return this.data.get(id).TimeInterval;
    }
    /**根据回合获取普通怪id */
    public getNormalMonster(id:number): number[] {
        return this.data.get(id).NormalMonster;
    }
    /**根据回合获取精英怪id */
    public getEliteMonster(id:number): number[] {
        return this.data.get(id).EliteMonster;
    }
    /**根据回合获取精英怪概率 */
    public getProbabilityOfElite(id:number): number[] {
        return this.data.get(id).ProbabilityOfElite;
    }

    /** 静态方法，获取最大的 回合*/
    public static getMaxRound():number {
        return 85;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
