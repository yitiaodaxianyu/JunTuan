export class Json备注说明 {
    /**表格说明 */
}

export class 备注说明Manager {
    private static _instance: 备注说明Manager = null;
    //把json数据转化成map数据
    private data:Map<number,Json备注说明>=null;
    private is_load_completed:boolean=false;

    public static getInstance():备注说明Manager {
        if(this._instance==null) {
            this._instance=new 备注说明Manager();
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
        LoadManager.loadJson('备注说明',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载Json备注说明成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new Json备注说明();
                jsonData=json[i];
                this.data.set(jsonData.2.2开头的为一些功能文本，比如签到，
转盘等等。2101开头为任务名文本，2102开头为任务详细描述文本,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJson备注说明(id:number):Json备注说明 {
        return this.data.get(id);
    }

    /** 静态方法，获取最大的 表格说明*/
    public static getMax2.2开头的为一些功能文本，比如签到，
转盘等等。2101开头为任务名文本，2102开头为任务详细描述文本():number {
        return 10.10之后为其他后续功能;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
