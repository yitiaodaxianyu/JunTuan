import { LoadManager } from "../Loading/LoadManager";

export class JsonDrawCardInformation {
    /**卡池ID */
    public CardPoolID:number = 0 ;
    /**卡池类型 */
    public CardPoolType:number = 0 ;
    /**单抽道具ID_1 */
    public OneDrawPropsID_1:number = 0 ;
    /**单抽道具消耗_1 */
    public OneDrawPropsSpend_1:number = 0 ;
    /**十连抽道具1消耗 */
    public TenDrawPropsSpend_1:number = 0 ;
    /**单抽道具ID_2 */
    public OneDrawPropsID_2:number = 0 ;
    /**单抽道具消耗_2 */
    public OneDrawPropsSpend_2:number = 0 ;
    /**十连抽道具2消耗 */
    public TenDrawPropsSpend_2:number = 0 ;
}

export class DrawCardInformationManager {
    private static _instance: DrawCardInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonDrawCardInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():DrawCardInformationManager {
        if(this._instance==null) {
            this._instance=new DrawCardInformationManager();
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
        LoadManager.loadJson('DrawCardInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonDrawCardInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonDrawCardInformation();
                jsonData=json[i];
                this.data.set(jsonData.CardPoolID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonDrawCardInformation(id:number):JsonDrawCardInformation {
        return this.data.get(id);
    }
    /**根据卡池ID获取卡池类型 */
    public getCardPoolType(id:number): number {
        return this.data.get(id).CardPoolType;
    }
    /**根据卡池ID获取单抽道具ID_1 */
    public getOneDrawPropsID_1(id:number): number {
        return this.data.get(id).OneDrawPropsID_1;
    }
    /**根据卡池ID获取单抽道具消耗_1 */
    public getOneDrawPropsSpend_1(id:number): number {
        return this.data.get(id).OneDrawPropsSpend_1;
    }
    /**根据卡池ID获取十连抽道具1消耗 */
    public getTenDrawPropsSpend_1(id:number): number {
        return this.data.get(id).TenDrawPropsSpend_1;
    }
    /**根据卡池ID获取单抽道具ID_2 */
    public getOneDrawPropsID_2(id:number): number {
        return this.data.get(id).OneDrawPropsID_2;
    }
    /**根据卡池ID获取单抽道具消耗_2 */
    public getOneDrawPropsSpend_2(id:number): number {
        return this.data.get(id).OneDrawPropsSpend_2;
    }
    /**根据卡池ID获取十连抽道具2消耗 */
    public getTenDrawPropsSpend_2(id:number): number {
        return this.data.get(id).TenDrawPropsSpend_2;
    }

    /** 静态方法，获取最大的 卡池ID*/
    public static getMaxCardPoolID():number {
        return 3001;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
