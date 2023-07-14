import { LoadManager } from "../../Loading/LoadManager";


export class JsonCyclePack {
    /**礼包ID */
    public GiftID:number = 0 ;
    /**礼包类型 */
    public GiftText:number = 0 ;
    /**金币数量 */
    public GetCoinNum:number = 0 ;
    /**钻石数量 */
    public GetGemNum:number = 0 ;
    /**龙晶数量 */
    public GetCrystal:number = 0 ;
    /**道具1ID */
    public ItemId_1:number = 0 ;
    /**道具1数量 */
    public ItemNum_1:number = 0 ;
    /**道具2ID */
    public ItemId_2:number = 0 ;
    /**道具2数量 */
    public ItemNum_2:number = 0 ;
    /**道具3ID */
    public ItemId_3:number = 0 ;
    /**道具3数量 */
    public ItemNum_3:number = 0 ;
    /**是否为广告奖励 */
    public AdReward:number = 0 ;
    /**广告可观看次数 */
    public AdPlayableTimes:number = 0 ;
    /**谷歌计费ID */
    public ProductId:string = '' ;
}

export class CyclePackManager {
    private static _instance: CyclePackManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCyclePack>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CyclePackManager {
        if(this._instance==null) {
            this._instance=new CyclePackManager();
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
        LoadManager.loadJson('CyclePack',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCyclePack成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCyclePack();
                jsonData=json[i];
                this.data.set(jsonData.GiftID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCyclePack(id:number):JsonCyclePack {
        return this.data.get(id);
    }
    /**根据礼包ID获取礼包类型 */
    public getGiftText(id:number): number {
        return this.data.get(id).GiftText;
    }
    /**根据礼包ID获取金币数量 */
    public getGetCoinNum(id:number): number {
        return this.data.get(id).GetCoinNum;
    }
    /**根据礼包ID获取钻石数量 */
    public getGetGemNum(id:number): number {
        return this.data.get(id).GetGemNum;
    }
    /**根据礼包ID获取龙晶数量 */
    public getGetCrystal(id:number): number {
        return this.data.get(id).GetCrystal;
    }
    /**根据礼包ID获取道具1ID */
    public getItemId_1(id:number): number {
        return this.data.get(id).ItemId_1;
    }
    /**根据礼包ID获取道具1数量 */
    public getItemNum_1(id:number): number {
        return this.data.get(id).ItemNum_1;
    }
    /**根据礼包ID获取道具2ID */
    public getItemId_2(id:number): number {
        return this.data.get(id).ItemId_2;
    }
    /**根据礼包ID获取道具2数量 */
    public getItemNum_2(id:number): number {
        return this.data.get(id).ItemNum_2;
    }
    /**根据礼包ID获取道具3ID */
    public getItemId_3(id:number): number {
        return this.data.get(id).ItemId_3;
    }
    /**根据礼包ID获取道具3数量 */
    public getItemNum_3(id:number): number {
        return this.data.get(id).ItemNum_3;
    }
    /**根据礼包ID获取是否为广告奖励 */
    public getAdReward(id:number): number {
        return this.data.get(id).AdReward;
    }
    /**根据礼包ID获取广告可观看次数 */
    public getAdPlayableTimes(id:number): number {
        return this.data.get(id).AdPlayableTimes;
    }
    /**根据礼包ID获取谷歌计费ID */
    public getProductId(id:number): string {
        return this.data.get(id).ProductId;
    }

    /** 静态方法，获取最大的 礼包ID*/
    public static getMaxGiftID():number {
        return 3006;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    getDataByType(type:number):JsonCyclePack[]{
        let dataList:JsonCyclePack[] =[];

        this.data.forEach((v,k) => {
            if(v.GiftText == type){
                dataList.push(v)
            }
        })

        return dataList;
    }

    resetDayData(){
        this.data.forEach((v,k) =>{
            if(v.GiftText == 1){
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID,"");
            }
        });
    }

    resetWeekData(){
        this.data.forEach((v,k) =>{
            if(v.GiftText == 2){
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID,"");
            }
        });
    }

    resetMonthData(){
        this.data.forEach((v,k) =>{
            if(v.GiftText == 3){
                cc.sys.localStorage.setItem("pay_git_bag_item_" + v.GiftID,"");
            }
        })
    }

    getData():Map<number,JsonCyclePack>{
        return this.data;
    }
}
