export class Json表格说明 {
}

export class 表格说明Manager {
    private static _instance: 表格说明Manager = null;
    //把json数据转化成map数据
    private data:Map<number,Json表格说明>=null;
    private is_load_completed:boolean=false;

    public static getInstance():表格说明Manager {
        if(this._instance==null) {
            this._instance=new 表格说明Manager();
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
        LoadManager.loadJson('表格说明',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载Json表格说明成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new Json表格说明();
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
    public getJson表格说明(id:number):Json表格说明 {
        return this.data.get(id);
    }

    /** 静态方法，获取最大的 一、属性计算*/
    public static getMax():number {
        return ;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
