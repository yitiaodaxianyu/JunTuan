export class Json配置用 {
}

export class 配置用Manager {
    private static _instance: 配置用Manager = null;
    //把json数据转化成map数据
    private data:Map<number,Json配置用>=null;
    private is_load_completed:boolean=false;

    public static getInstance():配置用Manager {
        if(this._instance==null) {
            this._instance=new 配置用Manager();
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
        LoadManager.loadJson('配置用',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载Json配置用成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new Json配置用();
                jsonData=json[i];
                this.data.set(jsonData.,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJson配置用(id:number):Json配置用 {
        return this.data.get(id);
    }

    /** 静态方法，获取最大的 关卡ID*/
    public static getMax():number {
        return 300;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
