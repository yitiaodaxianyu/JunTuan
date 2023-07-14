
import { JackpotManager } from "../JsonData/Jackpot";
import { RewardData } from "../JsonData/LevelJsonData";
import { LoadManager } from "../Loading/LoadManager";
import { PropId } from "../Prop/PropConfig";
import { UserInfo } from "../UserInfo/UserInfo";
import { BossChallengeManager, ChallengeMode } from "./BossChallenge";

export class BossRewardData{
    curData:JsonBossReward=null;
    nextData:JsonBossReward=null;
}

export class JsonBossReward {
    /**奖励级别 */
    public RewardLevel:number = 0 ;
    /**积分要求 */
    public IntegralRequirement:number = 0 ;
    /**展示宝箱图标 */
    public BoxIcon:number = 0 ;
    /**奖励道具 */
    public RewardItem:number = 0 ;
    /**奖励数量 */
    public RewardNum:number = 0 ;
    /**奖励道具2 */
    public RewardItem_2:number = 0 ;
    /**奖励数量2 */
    public RewardNum_2:number = 0 ;
}

export class BossRewardManager {
    private static _instance: BossRewardManager = null;
    //把json数据转化成map数据
    private data:Map<number,JsonBossReward>=null;
    private is_load_completed:boolean=false;

    public static getInstance():BossRewardManager {
        if(this._instance==null) {
            this._instance=new BossRewardManager();
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
        LoadManager.loadJson('BossReward',LoadManager.load_mode,(error: Error, assets:cc.JsonAsset)=> {
            if(error){
                console.log(error);
                return;
            }
            console.log('加载JsonBossReward成功');
            this.data=new Map();
            let json=assets.json;
            for(let i=0; i<json.length; i++){
                let jsonData=new JsonBossReward();
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
    public getJsonBossReward(id:number):JsonBossReward {
        return this.data.get(id);
    }
    /**根据奖励级别获取积分要求 */
    public getIntegralRequirement(id:number): number {
        return this.data.get(id).IntegralRequirement;
    }
    /**根据奖励级别获取展示宝箱图标 */
    public getBoxIcon(id:number): number {
        return this.data.get(id).BoxIcon;
    }
    /**根据奖励级别获取奖励道具 */
    public getRewardItem(id:number): number {
        return this.data.get(id).RewardItem;
    }
    /**根据奖励级别获取奖励数量 */
    public getRewardNum(id:number): number {
        return this.data.get(id).RewardNum;
    }
    /**根据奖励级别获取奖励道具2 */
    public getRewardItem_2(id:number): number {
        return this.data.get(id).RewardItem_2;
    }
    /**根据奖励级别获取奖励数量2 */
    public getRewardNum_2(id:number): number {
        return this.data.get(id).RewardNum_2;
    }

    /** 静态方法，获取最大的 奖励级别*/
    public static getMaxRewardLevel():number {
        return 47;
    }

    //以上格式统一，以下写每个json数据的特殊需求

    // public static getId(mode:ChallengeMode,rewardLevel:number):number {
    //     return 1000*mode+rewardLevel;
    // }

    /**根据伤害得到奖励级别 */
    getRewardLevel(hurt:number){
        let rewardlevel=0
        for (let index = 0; index < BossRewardManager.getMaxRewardLevel(); index++) {
            let mycurId=UserInfo.getInstance().RotationOrder*1000+index//BossRewardManager.getId(mode,i);
            let num=BossChallengeManager.getInstance().getInjuryLimit(mycurId) //this.getIntegralRequirement(index)
            if(num<=hurt){
                rewardlevel=index
            }
        }
        // console.log("______4",rewardlevel)
        return rewardlevel
    }
    getRewardByScore(mode:ChallengeMode,score:number):BossRewardData{
        //遍历
        let jsonData=new BossRewardData();
        for(let i=BossRewardManager.getMaxRewardLevel()-1; i>=0; i--){
            let curId=i//BossRewardManager.getId(mode,i);
            let curData=this.getJsonBossReward(curId);
            // let curId=UserInfo.getInstance().RotationOrder*1000+i//BossRewardManager.getId(mode,i);
            // let curData=this.getJsonBossReward(curId);
            // if(score>=curData.){
            //     let nextId=UserInfo.getInstance().RotationOrder*1000+(i+1)//BossRewardManager.getId(mode,i+1);
            //     let nextData=this.getJsonBossReward(nextId);
            //     jsonData.curData=curData;
            //     jsonData.nextData=nextData;
            //     break;
            // }
            let mycurId=UserInfo.getInstance().RotationOrder*1000+i//BossRewardManager.getId(mode,i);
            curData.IntegralRequirement=BossChallengeManager.getInstance().getInjuryLimit(mycurId)
            if(score>=curData.IntegralRequirement){
                let nextId=i+1//BossRewardManager.getId(mode,i+1);
                let nextData=this.getJsonBossReward(nextId);

                let mynextId=UserInfo.getInstance().RotationOrder*1000+(i+1)//BossRewardManager.getId(mode,i);
                nextData.IntegralRequirement=BossChallengeManager.getInstance().getInjuryLimit(mynextId)
                // console.log("___________",nextData.IntegralRequirement)

                jsonData.curData=curData;
                jsonData.nextData=nextData;
                break;
            }
        }
        // console.log("______3",jsonData)
        return jsonData;
    }

    getBossReward(mode:ChallengeMode,score:number):RewardData[]{
        //遍历
        let rewardDatas=new Array<RewardData>();
        let jsonData=new JsonBossReward();
        for(let i=BossRewardManager.getMaxRewardLevel()-1; i>=0; i--){
            let curId=i//BossRewardManager.getId(mode,i);
            let curData=this.getJsonBossReward(curId);
            if(score>=curData.IntegralRequirement){
                // let nextId=BossRewardManager.getId(mode,i+1);
                jsonData=curData;
                break;
            }
        }

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
        // console.log("______2",rewardDatas)
        return rewardDatas;
    }

    getBossChallenge(mode:ChallengeMode,score:number):number{
        //遍历
        let jsonData=new JsonBossReward();
        for(let i=BossRewardManager.getMaxRewardLevel()-1; i>=0; i--){
            let curId=i//BossRewardManager.getId(mode,i);
            let curData=this.getJsonBossReward(curId);
            if(score>=curData.IntegralRequirement){
                //let nextId=BossRewardManager.getId(mode,i+1);
                jsonData=curData;
                break;
            }
        }
        // console.log("______1",jsonData.RewardLevel)
        return jsonData.RewardLevel;
    }
}
