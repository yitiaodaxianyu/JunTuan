export class JsonEndlessBuff {
    /**无尽BUff */
    public EndlessBuff:number = 0 ;
    /**强度级别 */
    public Rarity:number = 0 ;
    /**类型 */
    public Type:number = 0 ;
    /**参数 */
    public Parameter:number = 0 ;
    /**权重 */
    public Weight:number = 0 ;
}

export class EndlessBuffManager {
    private static _instance: EndlessBuffManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEndlessBuff>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EndlessBuffManager {
        if(this._instance==null) {
            this._instance=new EndlessBuffManager();
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
        LoadManager.loadJson('EndlessBuff',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessBuff成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEndlessBuff();
                jsonData=json[i];
                this.data.set(jsonData.EndlessBuff,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEndlessBuff(id:number):JsonEndlessBuff {
        return this.data.get(id);
    }
    /**根据无尽BUff获取强度级别 */
    public getRarity(id:number): number {
        return this.data.get(id).Rarity;
    }
    /**根据无尽BUff获取类型 */
    public getType(id:number): number {
        return this.data.get(id).Type;
    }
    /**根据无尽BUff获取参数 */
    public getParameter(id:number): number {
        return this.data.get(id).Parameter;
    }
    /**根据无尽BUff获取权重 */
    public getWeight(id:number): number {
        return this.data.get(id).Weight;
    }

    /** 静态方法，获取最大的 无尽BUff*/
    public static getMaxEndlessBuff():number {
        return 511;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
