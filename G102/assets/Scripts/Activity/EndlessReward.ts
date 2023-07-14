import { RewardData } from "../JsonData/LevelJsonData";
import { JackpotManager } from "../JsonData/Jackpot";
import { PropId } from "../Prop/PropConfig";
import { LoadManager } from "../Loading/LoadManager";

export class EndlessRewardData{
    curData:JsonEndlessReward=null;
    nextData:JsonEndlessReward=null;
}

export class JsonEndlessReward {
    /**奖励波次 */
    public RewardLevel:number = 0 ;
    /**奖励ID */
    public RewardItem:number = 0 ;
    /**奖励数量 */
    public RewardNum:number = 0 ;
}

export class EndlessRewardManager {
    private static _instance: EndlessRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonEndlessReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():EndlessRewardManager {
        if(this._instance==null) {
            this._instance=new EndlessRewardManager();
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
        LoadManager.loadJson('EndlessReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonEndlessReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonEndlessReward();
                jsonData=json[i];
                this.data.set(jsonData.RewardLevel,jsonData);
            }
            this.is_load_completed=true;
        });
    }

    /**加载是否完成 */
    public getIsLoadCompleted(): boolean{
        return this.is_load_completed;
    }
    /**根据id号获取Json的各种数据 */
    public getJsonEndlessReward(id:number):JsonEndlessReward {
        return this.data.get(id);
    }
    /**根据奖励波次获取奖励ID */
    public getRewardItem(id:number): number {
        return this.data.get(id).RewardItem;
    }
    /**根据奖励波次获取奖励数量 */
    public getRewardNum(id:number): number {
        return this.data.get(id).RewardNum;
    }

    /** 静态方法，获取最大的 奖励波次*/
    public static getMaxRewardLevel():number {
        return 680;
    }


    //以上格式统一，以下写每个json数据的特殊需求

    getRewardByScore(score:number):EndlessRewardData{
        //遍历
        let jsonData=new EndlessRewardData();
        // this.data.forEach((value)=>{
        //     if(score>=value.IntegralRequirement){
        //         jsonData.curData=value;
        //         jsonData.nextData=value;
        //         if(value.RewardLevel>=EndlessRewardManager.getMaxRewardLevel()){
        //             jsonData.nextData=value;
        //         }else{
        //             jsonData.nextData=this.getJsonEndlessReward(value.RewardLevel+1);
        //         }
        //     }
        // });
        return jsonData;
    }

    getEndlessReward(score:number):RewardData[]{
        //遍历
        let rewardDatas=new Array<RewardData>();
        // let jsonData=new JsonEndlessReward();
        // this.data.forEach((value)=>{
        //     if(score>=value.IntegralRequirement){
        //         jsonData=value;
        //     }
        // });
        // if(jsonData.Coin>0){
        //     let coinRd=new RewardData();
        //     coinRd.reward_id=PropId.Coin;
        //     coinRd.reward_num=jsonData.Coin;
        //     rewardDatas.push(coinRd);
        // }
        // if(jsonData.Gem>0){
        //     let gemRd=new RewardData();
        //     gemRd.reward_id=PropId.Gem;
        //     gemRd.reward_num=jsonData.Gem;
        //     rewardDatas.push(gemRd);
        // }
        // if(jsonData.HeroExp>0){
        //     let heroExpRd=new RewardData();
        //     heroExpRd.reward_id=PropId.HeroExp;
        //     heroExpRd.reward_num=jsonData.HeroExp;
        //     rewardDatas.push(heroExpRd);
        // }
        // if(jsonData.PlayerExp>0){
        //     let userExpRd=new RewardData();
        //     userExpRd.reward_id=PropId.UserExp;
        //     userExpRd.reward_num=jsonData.PlayerExp;
        //     rewardDatas.push(userExpRd);
        // }

        // //奖池
        // if(jsonData.JackpotID_1>0){
        //     for(let i=0; i<jsonData.JackpotNum_1; i++){
        //         let rd1=JackpotManager.getInstance().getRewardDataById(jsonData.JackpotID_1);
        //         rewardDatas.push(rd1)
        //     }
        // }
        // if(jsonData.JackpotID_2>0){
        //     for(let i=0; i<jsonData.JackpotNum_2; i++){
        //         let rd2=JackpotManager.getInstance().getRewardDataById(jsonData.JackpotID_2);
        //         rewardDatas.push(rd2)
        //     }
        // }
        
        return rewardDatas;
    }
}
