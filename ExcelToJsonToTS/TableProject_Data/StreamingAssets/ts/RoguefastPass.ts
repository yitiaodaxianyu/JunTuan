export class JsonRoguefastPass {
    /**章节 */
    public ChapterLevel:number = 0 ;
    /**奖励1ID */
    public PropID_1:number = 0 ;
    /**奖励1数量 */
    public PropNum_1:number = 0 ;
    /**奖励2ID */
    public PropID_2:number = 0 ;
    /**奖励2数量 */
    public PropNum_2:number = 0 ;
}

export class RoguefastPassManager {
    private static _instance: RoguefastPassManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonRoguefastPass>=null;
    private is_load_completed:boolean=false;

    public static getInstance():RoguefastPassManager {
        if(this._instance==null) {
            this._instance=new RoguefastPassManager();
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
        LoadManager.loadJson('RoguefastPass',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonRoguefastPass成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonRoguefastPass();
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
    public getJsonRoguefastPass(id:number):JsonRoguefastPass {
        return this.data.get(id);
    }
    /**根据章节获取奖励1ID */
    public getPropID_1(id:number): number {
        return this.data.get(id).PropID_1;
    }
    /**根据章节获取奖励1数量 */
    public getPropNum_1(id:number): number {
        return this.data.get(id).PropNum_1;
    }
    /**根据章节获取奖励2ID */
    public getPropID_2(id:number): number {
        return this.data.get(id).PropID_2;
    }
    /**根据章节获取奖励2数量 */
    public getPropNum_2(id:number): number {
        return this.data.get(id).PropNum_2;
    }

    /** 静态方法，获取最大的 章节*/
    public static getMaxChapterLevel():number {
        return 8;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
