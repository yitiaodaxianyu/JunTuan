import { RewardData } from "../../JsonData/LevelJsonData";
import { LoadManager } from "../../Loading/LoadManager";
import { PropId } from "../../Prop/PropConfig";

export class JsonCumulativeRecharge {
    /**累计充值ID */
    public CumulativeRechargeID:number = 0 ;
    /**显示顺序 */
    public DisplayOrder:number = 0 ;
    /**累计充值价格 */
    public CumulativeRechargePrice:number = 0 ;
    /**金币数量 */
    public GetCoin:number = 0 ;
    /**钻石数量 */
    public GetGem:number = 0 ;
    /**道具1ID */
    public Item1_ID:number = 0 ;
    /**道具1数量 */
    public Item1_Num:number = 0 ;
    /**道具2ID */
    public Item2_ID:number = 0 ;
    /**道具2数量 */
    public Item2_Num:number = 0 ;
    /**道具3ID */
    public Item3_ID:number = 0 ;
    /**道具3数量 */
    public Item3_Num:number = 0 ;
}

export class CumulativeRechargeManager {
    private static _instance: CumulativeRechargeManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonCumulativeRecharge>=null;
    private is_load_completed:boolean=false;

    public static getInstance():CumulativeRechargeManager {
        if(this._instance==null) {
            this._instance=new CumulativeRechargeManager();
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
        LoadManager.loadJson('CumulativeRecharge',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonCumulativeRecharge成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonCumulativeRecharge();
                jsonData=json[i];
                this.data.set(jsonData.CumulativeRechargeID,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonCumulativeRecharge(id:number):JsonCumulativeRecharge {
        return this.data.get(id);
    }
    /**根据累计充值ID获取显示顺序 */
    public getDisplayOrder(id:number): number {
        return this.data.get(id).DisplayOrder;
    }
    /**根据累计充值ID获取累计充值价格 */
    public getCumulativeRechargePrice(id:number): number {
        return this.data.get(id).CumulativeRechargePrice;
    }
    /**根据累计充值ID获取金币数量 */
    public getGetCoin(id:number): number {
        return this.data.get(id).GetCoin;
    }
    /**根据累计充值ID获取钻石数量 */
    public getGetGem(id:number): number {
        return this.data.get(id).GetGem;
    }
    /**根据累计充值ID获取道具1ID */
    public getItem1_ID(id:number): number {
        return this.data.get(id).Item1_ID;
    }
    /**根据累计充值ID获取道具1数量 */
    public getItem1_Num(id:number): number {
        return this.data.get(id).Item1_Num;
    }
    /**根据累计充值ID获取道具2ID */
    public getItem2_ID(id:number): number {
        return this.data.get(id).Item2_ID;
    }
    /**根据累计充值ID获取道具2数量 */
    public getItem2_Num(id:number): number {
        return this.data.get(id).Item2_Num;
    }
    /**根据累计充值ID获取道具3ID */
    public getItem3_ID(id:number): number {
        return this.data.get(id).Item3_ID;
    }
    /**根据累计充值ID获取道具3数量 */
    public getItem3_Num(id:number): number {
        return this.data.get(id).Item3_Num;
    }

    /** 静态方法，获取最大的 累计充值ID*/
    public static getMaxCumulativeRechargeID():number {
        return 80001;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    /**
     * 获得奖励列表数据
     * @param total 总共充值龙晶的数量
     * @returns 奖励列表数据
     */
    getRewardData(id:number):RewardData[]{        
        let rewardDatas=new Array();
        let jsonData=this.getJsonCumulativeRecharge(id);
        if(jsonData.GetCoin>0){
            let rd=new RewardData();
            rd.reward_id=PropId.Coin;
            rd.reward_num=jsonData.GetCoin;
            rewardDatas.push(rd);
        }
        if(jsonData.GetGem>0){
            let rd=new RewardData();
            rd.reward_id=PropId.Gem;
            rd.reward_num=jsonData.GetGem;
            rewardDatas.push(rd);
        }
        for(let i=1; i<=3; i++){
            let id='Item'+i+'_ID';
            if(jsonData[id]>0){
                let rd=new RewardData();
                rd.reward_id=jsonData[id];
                rd.reward_num=jsonData['Item'+i+'_Num'];
                rewardDatas.push(rd);
            }
        }
        return rewardDatas;
    }

    getId(total:number):number{
        let id=0;
        let isFind=false;
        this.data.forEach((v,k)=>{
            if(!isFind && total<v.CumulativeRechargePrice){
                id=v.CumulativeRechargeID;
                isFind=true;
            }
        });
        return id;
    }
    
    getData():Map<number,JsonCumulativeRecharge>{
        return this.data;
    }
}
