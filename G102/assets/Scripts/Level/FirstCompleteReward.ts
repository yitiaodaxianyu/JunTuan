import { RewardData } from "../JsonData/LevelJsonData";
import { LoadManager } from "../Loading/LoadManager";
import { ItemManager } from "../Prop/Data/Item";
import { PropManager } from "../Prop/PropManager";

export class JsonFirstCompleteReward {
    /**通关奖励ID */
    public PassReward:number = 0 ;
    /**关卡ID */
    public Level_ID:number = 0 ;
    /**星级 */
    public Star_ID:number = 0 ;
    /**奖励道具1 */
    public RewardItem_1:number = 0 ;
    /**奖励数量1 */
    public RewardNum_1:number = 0 ;
    /**奖励道具2 */
    public RewardItem_2:number = 0 ;
    /**奖励数量2 */
    public RewardNum_2:number = 0 ;
    /**奖励道具3 */
    public RewardItem_3:number = 0 ;
    /**奖励数量3 */
    public RewardNum_3:number = 0 ;
    /**奖励道具4 */
    public RewardItem_4:number = 0 ;
    /**奖励数量4 */
    public RewardNum_4:number = 0 ;
}

export class FirstCompleteRewardManager {
    private static _instance: FirstCompleteRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonFirstCompleteReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():FirstCompleteRewardManager {
        if(this._instance==null) {
            this._instance=new FirstCompleteRewardManager();
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
        LoadManager.loadJson('FirstCompleteReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonFirstCompleteReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonFirstCompleteReward();
                jsonData=json[i];
                this.data.set(jsonData.PassReward,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonFirstCompleteReward(id:number):JsonFirstCompleteReward {
        // console.log(")_",this.data)
        return this.data.get(id);
    }
    /**根据通关奖励ID获取关卡ID */
    public getLevel_ID(id:number): number {
        return this.data.get(id).Level_ID;
    }
    /**根据通关奖励ID获取星级 */
    public getStar_ID(id:number): number {
        return this.data.get(id).Star_ID;
    }
    /**根据通关奖励ID获取奖励道具1 */
    public getRewardItem_1(id:number): number {
        return this.data.get(id).RewardItem_1;
    }
    /**根据通关奖励ID获取奖励数量1 */
    public getRewardNum_1(id:number): number {
        return this.data.get(id).RewardNum_1;
    }
    /**根据通关奖励ID获取奖励道具2 */
    public getRewardItem_2(id:number): number {
        return this.data.get(id).RewardItem_2;
    }
    /**根据通关奖励ID获取奖励数量2 */
    public getRewardNum_2(id:number): number {
        return this.data.get(id).RewardNum_2;
    }
    /**根据通关奖励ID获取奖励道具3 */
    public getRewardItem_3(id:number): number {
        return this.data.get(id).RewardItem_3;
    }
    /**根据通关奖励ID获取奖励数量3 */
    public getRewardNum_3(id:number): number {
        return this.data.get(id).RewardNum_3;
    }
    /**根据通关奖励ID获取奖励道具4 */
    public getRewardItem_4(id:number): number {
        return this.data.get(id).RewardItem_4;
    }
    /**根据通关奖励ID获取奖励数量4 */
    public getRewardNum_4(id:number): number {
        return this.data.get(id).RewardNum_4;
    }

    /** 静态方法，获取最大的 通关奖励ID*/
    public static getMaxPassReward():number {
        return 153;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    static getId(level:number,star:number):number{
        return level*10+star;
    }

    /**获得奖励 */
    public getFirstRewardArr(levelId:number):RewardData[]
    {

        let jsonData:JsonFirstCompleteReward=this.getJsonFirstCompleteReward(levelId);
        let rdArr=new Array<RewardData>();
        // console.log("+++++++++",jsonData)
        for(let i=1; i<=4; i++){
            if(jsonData['RewardItem_'+i]>0 && jsonData['RewardNum_'+i]>0){
                let rd=new RewardData();
                rd.reward_id=jsonData['RewardItem_'+i];
                rd.reward_num=jsonData['RewardNum_'+i];
                rdArr.push(rd);
            }
        }
        
        return rdArr;
    }

    check(){
        this.data.forEach((v,k)=>{
            for(let i=1; i<=4; i++){
                let id=v["RewardItem_"+i];
                if(id!=0){
                    if(!ItemManager.getInstance().getJsonItem(id)){
                        console.error("首通奖励ID"+k+",不存在奖励id:RewardItem_"+i+"="+id);
                    }
                }                
            }
            
        })
    }
}
