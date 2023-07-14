import { LoadManager } from "../Loading/LoadManager";

export class JsonConstantConfiguration {
    /**编号 */
    public ID:number = 0 ;
    /**值 */
    public Value:string = '' ;
}

export class ConstantConfigurationManager {
    private static _instance: ConstantConfigurationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonConstantConfiguration>=null;
    private is_load_completed:boolean=false;

    public static getInstance():ConstantConfigurationManager {
        if(this._instance==null) {
            this._instance=new ConstantConfigurationManager();
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
        LoadManager.loadJson('ConstantConfiguration',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonConstantConfiguration成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonConstantConfiguration();
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
    public getJsonConstantConfiguration(id:number):JsonConstantConfiguration {
        return this.data.get(id);
    }
    /**根据编号获取值 */
    public getValue(id:number): string {
        return this.data.get(id).Value;
    }

    /** 静态方法，获取最大的 编号*/
    public static getMaxID():number {
        return 5;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
