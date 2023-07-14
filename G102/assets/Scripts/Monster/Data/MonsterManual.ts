import { LoadManager } from "../../Loading/LoadManager";


export class JsonMonsterManual {
    /**怪物编号 */
    public Monster:number = 0 ;
    /**消灭数量 */
    public KillNumber:number[] = [] ;
    /**钻石奖励 */
    public DiamondReward:number[] = [] ;
    /**怪物骨骼资源 */
    public BoneResource:number = 0 ;
}

export class MonsterManualManager {
    private static _instance: MonsterManualManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMonsterManual>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MonsterManualManager {
        if(this._instance==null) {
            this._instance=new MonsterManualManager();
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
        LoadManager.loadJson('MonsterManual',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterManual成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMonsterManual();
                jsonData=json[i];
                this.data.set(jsonData.Monster,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMonsterManual(id:number):JsonMonsterManual {
        return this.data.get(id);
    }
    /**根据怪物编号获取消灭数量 */
    public getKillNumber(id:number): number[] {
        return this.data.get(id).KillNumber;
    }
    /**根据怪物编号获取钻石奖励 */
    public getDiamondReward(id:number): number[] {
        return this.data.get(id).DiamondReward;
    }
    /**根据怪物编号获取怪物骨骼资源 */
    public getBoneResource(id:number): number {
        return this.data.get(id).BoneResource;
    }

    /** 静态方法，获取最大的 怪物编号*/
    public static getMaxMonster():number {
        return 50170;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    

}
