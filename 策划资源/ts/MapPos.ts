export class JsonMapPos {
    /**关卡数id */
    public LevelId:number = 0 ;
    /**关卡名 */
    public LevelName:string = '' ;
    /**x轴 */
    public PosX:number = 0 ;
    /**y轴 */
    public PosY:number = 0 ;
    /**图标类型 */
    public IconType:number = 0 ;
    /**章节 */
    public Chapter:number = 0 ;
    /**金币总数量 */
    public PassReward_Coin:number = 0 ;
    /**推荐战力 */
    public RecommendedCombatPower:number = 0 ;
    /**关卡类型 */
    public LevelTypes:number = 0 ;
}

export class MapPosManager {
    private static _instance: MapPosManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonMapPos>=null;
    private is_load_completed:boolean=false;

    public static getInstance():MapPosManager {
        if(this._instance==null) {
            this._instance=new MapPosManager();
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
        LoadManager.loadJson('MapPos',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonMapPos成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonMapPos();
                jsonData=json[i];
                this.data.set(jsonData.LevelId,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonMapPos(id:number):JsonMapPos {
        return this.data.get(id);
    }
    /**根据关卡数id获取关卡名 */
    public getLevelName(id:number): string {
        return this.data.get(id).LevelName;
    }
    /**根据关卡数id获取x轴 */
    public getPosX(id:number): number {
        return this.data.get(id).PosX;
    }
    /**根据关卡数id获取y轴 */
    public getPosY(id:number): number {
        return this.data.get(id).PosY;
    }
    /**根据关卡数id获取图标类型 */
    public getIconType(id:number): number {
        return this.data.get(id).IconType;
    }
    /**根据关卡数id获取章节 */
    public getChapter(id:number): number {
        return this.data.get(id).Chapter;
    }
    /**根据关卡数id获取金币总数量 */
    public getPassReward_Coin(id:number): number {
        return this.data.get(id).PassReward_Coin;
    }
    /**根据关卡数id获取推荐战力 */
    public getRecommendedCombatPower(id:number): number {
        return this.data.get(id).RecommendedCombatPower;
    }
    /**根据关卡数id获取关卡类型 */
    public getLevelTypes(id:number): number {
        return this.data.get(id).LevelTypes;
    }

    /** 静态方法，获取最大的 关卡数id*/
    public static getMaxLevelId():number {
        return 300;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
