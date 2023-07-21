export class JsonPrivilegedCardInformation {
    /**尊享卡ID */
    public PrivilegedCardID:number = 0 ;
    /**尊享卡类型 */
    public PrivilegedCard:number = 0 ;
    /**文本 */
    public PrivilegedCardText:number = 0 ;
    /**立即获得钻石数量 */
    public GetDiamondsNowNum:number = 0 ;
    /**每天可领取钻石数量 */
    public ReceiveDiamondsEveryDayNum:number = 0 ;
    /**累计获得钻石数量 */
    public CumulativeGetDiamonds:number = 0 ;
    /**获得特权组ID */
    public GainPrivileges:number[] = [] ;
    /**特权参数 */
    public PrivilegeParameters:number[] = [] ;
    /**特权组文本ID */
    public PrivilegeText:number[] = [] ;
    /**谷歌计费ID */
    public ProductId:string = '' ;
}

export class PrivilegedCardInformationManager {
    private static _instance: PrivilegedCardInformationManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonPrivilegedCardInformation>=null;
    private is_load_completed:boolean=false;

    public static getInstance():PrivilegedCardInformationManager {
        if(this._instance==null) {
            this._instance=new PrivilegedCardInformationManager();
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
        LoadManager.loadJson('PrivilegedCardInformation',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonPrivilegedCardInformation成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonPrivilegedCardInformation();
                jsonData=json[i];
                this.data.set(jsonData.PrivilegedCardID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonPrivilegedCardInformation(id:number):JsonPrivilegedCardInformation {
        return this.data.get(id);
    }
    /**根据尊享卡ID获取尊享卡类型 */
    public getPrivilegedCard(id:number): number {
        return this.data.get(id).PrivilegedCard;
    }
    /**根据尊享卡ID获取文本 */
    public getPrivilegedCardText(id:number): number {
        return this.data.get(id).PrivilegedCardText;
    }
    /**根据尊享卡ID获取立即获得钻石数量 */
    public getGetDiamondsNowNum(id:number): number {
        return this.data.get(id).GetDiamondsNowNum;
    }
    /**根据尊享卡ID获取每天可领取钻石数量 */
    public getReceiveDiamondsEveryDayNum(id:number): number {
        return this.data.get(id).ReceiveDiamondsEveryDayNum;
    }
    /**根据尊享卡ID获取累计获得钻石数量 */
    public getCumulativeGetDiamonds(id:number): number {
        return this.data.get(id).CumulativeGetDiamonds;
    }
    /**根据尊享卡ID获取获得特权组ID */
    public getGainPrivileges(id:number): number[] {
        return this.data.get(id).GainPrivileges;
    }
    /**根据尊享卡ID获取特权参数 */
    public getPrivilegeParameters(id:number): number[] {
        return this.data.get(id).PrivilegeParameters;
    }
    /**根据尊享卡ID获取特权组文本ID */
    public getPrivilegeText(id:number): number[] {
        return this.data.get(id).PrivilegeText;
    }
    /**根据尊享卡ID获取谷歌计费ID */
    public getProductId(id:number): string {
        return this.data.get(id).ProductId;
    }

    /** 静态方法，获取最大的 尊享卡ID*/
    public static getMaxPrivilegedCardID():number {
        return 2001;
    }

    //以上格式统一，以下写每个json数据的特殊需求


}
