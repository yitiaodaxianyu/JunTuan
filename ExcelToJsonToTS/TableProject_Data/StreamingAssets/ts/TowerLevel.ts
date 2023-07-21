export class JsonTowerLevel {
    /**层数 */
    public Floor:number = 0 ;
    /**怪物组 */
    public MonsterGroup:number = 0 ;
    /**怪物等级 */
    public MonsterLevel:number = 0 ;
}

export class TowerLevelManager {
    private static _instance: TowerLevelManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTowerLevel>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TowerLevelManager {
        if(this._instance==null) {
            this._instance=new TowerLevelManager();
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
        LoadManager.loadJson('TowerLevel',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTowerLevel成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTowerLevel();
                jsonData=json[i];
                this.data.set(jsonData.Floor,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTowerLevel(id:number):JsonTowerLevel {
        return this.data.get(id);
    }
    /**根据层数获取怪物组 */
    public getMonsterGroup(id:number): number {
        return this.data.get(id).MonsterGroup;
    }
    /**根据层数获取怪物等级 */
    public getMonsterLevel(id:number): number {
        return this.data.get(id).MonsterLevel;
    }

    /** 静态方法，获取最大的 层数*/
    public static getMaxFloor():number {
        return 480;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
