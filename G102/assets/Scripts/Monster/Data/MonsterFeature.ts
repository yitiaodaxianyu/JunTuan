import { LoadManager } from "../../Loading/LoadManager";


export class JsonMonsterFeature {
    /**特性编号 */
    public FeatureNumber:number = 0 ;
    /**作用对象 */
    public Objective:number = 0 ;
    /**怪物特性描述文本ID */
    public FeatureDiscribe_TextID:number = 0 ;
    /**数目(只) */
    public Number:number = 0 ;
    /**血量 */
    public HP:number = 0 ;
    /**持续时间(秒) */
    public Time:number = 0 ;
    /**增加速度 */
    public SpeedUp:number = 0 ;
    /**范围 */
    public Range:number = 0 ;
    /**加血(秒) */
    public Recovery:number = 0 ;
}

export class MonsterFeatureManager {
    private static _instance: MonsterFeatureManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMonsterFeature>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MonsterFeatureManager {
        if(this._instance==null) {
            this._instance=new MonsterFeatureManager();
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
        LoadManager.loadJson('MonsterFeature',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMonsterFeature成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMonsterFeature();
                jsonData=json[i];
                this.data.set(jsonData.FeatureNumber,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMonsterFeature(id:number):JsonMonsterFeature {
        return this.data.get(id);
    }
    /**根据特性编号获取作用对象 */
    public getObjective(id:number): number {
        return this.data.get(id).Objective;
    }
    /**根据特性编号获取怪物特性描述文本ID */
    public getFeatureDiscribe_TextID(id:number): number {
        return this.data.get(id).FeatureDiscribe_TextID;
    }
    /**根据特性编号获取数目(只) */
    public getNumber(id:number): number {
        return this.data.get(id).Number;
    }
    /**根据特性编号获取血量 */
    public getHP(id:number): number {
        return this.data.get(id).HP;
    }
    /**根据特性编号获取持续时间(秒) */
    public getTime(id:number): number {
        return this.data.get(id).Time;
    }
    /**根据特性编号获取增加速度 */
    public getSpeedUp(id:number): number {
        return this.data.get(id).SpeedUp;
    }
    /**根据特性编号获取范围 */
    public getRange(id:number): number {
        return this.data.get(id).Range;
    }
    /**根据特性编号获取加血(秒) */
    public getRecovery(id:number): number {
        return this.data.get(id).Recovery;
    }

    /** 静态方法，获取最大的 特性编号*/
    public static getMaxFeatureNumber():number {
        return 17;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
