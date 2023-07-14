import { RewardData } from "../../JsonData/LevelJsonData";
import { JsonFirstCompleteReward } from "../../Level/FirstCompleteReward";
import { LoadManager } from "../../Loading/LoadManager";

export class JsonBossWeeklyReward {
    /**奖励档次 */
    public RewardGrade:number = 0 ;
    /**奖励道具_1 */
    public RewarItem_1:number = 0 ;
    /**奖励数量_1 */
    public RewardNum_1:number = 0 ;
    /**奖励道具_2 */
    public RewarItem_2:number = 0 ;
    /**奖励数量_2 */
    public RewardNum_2:number = 0 ;
    /**奖励道具_3 */
    public RewarItem_3:number = 0 ;
    /**奖励数量_3 */
    public RewardNum_3:number = 0 ;
}

export class BossWeeklyRewardManager {
    private static _instance: BossWeeklyRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonBossWeeklyReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():BossWeeklyRewardManager {
        if(this._instance==null) {
            this._instance=new BossWeeklyRewardManager();
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
        LoadManager.loadJson('BossWeeklyReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonBossWeeklyReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonBossWeeklyReward();
                jsonData=json[i];
                this.data.set(jsonData.RewardGrade,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonBossWeeklyReward(id:number):JsonBossWeeklyReward {
        return this.data.get(id);
    }
    /**根据奖励档次获取奖励道具_1 */
    public getRewarItem_1(id:number): number {
        return this.data.get(id).RewarItem_1;
    }
    /**根据奖励档次获取奖励数量_1 */
    public getRewardNum_1(id:number): number {
        return this.data.get(id).RewardNum_1;
    }
    /**根据奖励档次获取奖励道具_2 */
    public getRewarItem_2(id:number): number {
        return this.data.get(id).RewarItem_2;
    }
    /**根据奖励档次获取奖励数量_2 */
    public getRewardNum_2(id:number): number {
        return this.data.get(id).RewardNum_2;
    }
    /**根据奖励档次获取奖励道具_3 */
    public getRewarItem_3(id:number): number {
        return this.data.get(id).RewarItem_3;
    }
    /**根据奖励档次获取奖励数量_3 */
    public getRewardNum_3(id:number): number {
        return this.data.get(id).RewardNum_3;
    }

    /** 静态方法，获取最大的 奖励档次*/
    public static getMaxRewardGrade():number {
        return 7;
    }

    //以上格式统一，以下写每个json数据的特殊需求
    /**获得奖励 */
    public getFirstRewardArr(levelId:number):RewardData[]
    {

        let jsonData:JsonBossWeeklyReward=this.getJsonBossWeeklyReward(levelId);
        let rdArr=new Array<RewardData>();
        // console.log("+++++++++",jsonData)
        for(let i=1; i<=3; i++){
            if(jsonData['RewarItem_'+i]>0 && jsonData['RewardNum_'+i]>0){
                let rd=new RewardData();
                rd.reward_id=jsonData['RewarItem_'+i];
                rd.reward_num=jsonData['RewardNum_'+i];
                rdArr.push(rd);
            }
        }
        
        return rdArr;
    }

}
