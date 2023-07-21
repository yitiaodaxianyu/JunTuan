export class JsonBossChallenge {
    /**挑战ID */
    public ChallengeID:number = 0 ;
    /**轮换顺序 */
    public RotationOrder:number = 0 ;
    /**阶段 */
    public Stage:number = 0 ;
    /**怪物ID */
    public MonsterId:number = 0 ;
    /**承伤上限 */
    public InjuryLimit:number = 0 ;
    /**怪物等级 */
    public MonsterLevel:number = 0 ;
    /**章节场景 */
    public ChapterScene:number = 0 ;
}

export class BossChallengeManager {
    private static _instance: BossChallengeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonBossChallenge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():BossChallengeManager {
        if(this._instance==null) {
            this._instance=new BossChallengeManager();
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
        LoadManager.loadJson('BossChallenge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonBossChallenge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonBossChallenge();
                jsonData=json[i];
                this.data.set(jsonData.ChallengeID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonBossChallenge(id:number):JsonBossChallenge {
        return this.data.get(id);
    }
    /**根据挑战ID获取轮换顺序 */
    public getRotationOrder(id:number): number {
        return this.data.get(id).RotationOrder;
    }
    /**根据挑战ID获取阶段 */
    public getStage(id:number): number {
        return this.data.get(id).Stage;
    }
    /**根据挑战ID获取怪物ID */
    public getMonsterId(id:number): number {
        return this.data.get(id).MonsterId;
    }
    /**根据挑战ID获取承伤上限 */
    public getInjuryLimit(id:number): number {
        return this.data.get(id).InjuryLimit;
    }
    /**根据挑战ID获取怪物等级 */
    public getMonsterLevel(id:number): number {
        return this.data.get(id).MonsterLevel;
    }
    /**根据挑战ID获取章节场景 */
    public getChapterScene(id:number): number {
        return this.data.get(id).ChapterScene;
    }

    /** 静态方法，获取最大的 挑战ID*/
    public static getMaxChallengeID():number {
        return 10047;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
