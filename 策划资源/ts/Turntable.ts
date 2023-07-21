export class JsonTurntable {
    /**转盘位置 */
    public ID:number = 0 ;
    /**道具id */
    public ItemID:number[] = [] ;
    /**数量 */
    public Num:number[] = [] ;
    /**权重 */
    public Weight:number[] = [] ;
}

export class TurntableManager {
    private static _instance: TurntableManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonTurntable>=null;
    private is_load_completed:boolean=false;

    public static getInstance():TurntableManager {
        if(this._instance==null) {
            this._instance=new TurntableManager();
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
        LoadManager.loadJson('Turntable',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonTurntable成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonTurntable();
                jsonData=json[i];
                this.data.set(jsonData.ID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonTurntable(id:number):JsonTurntable {
        return this.data.get(id);
    }
    /**根据转盘位置获取道具id */
    public getItemID(id:number): number[] {
        return this.data.get(id).ItemID;
    }
    /**根据转盘位置获取数量 */
    public getNum(id:number): number[] {
        return this.data.get(id).Num;
    }
    /**根据转盘位置获取权重 */
    public getWeight(id:number): number[] {
        return this.data.get(id).Weight;
    }

    /** 静态方法，获取最大的 转盘位置*/
    public static getMaxID():number {
        return 8;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
