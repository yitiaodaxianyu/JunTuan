import { CustomsClearanceRebateManager } from "../JsonData/CustomsClearanceRebate";
import { RewardData } from "../JsonData/LevelJsonData";
import { LevelUpRebateManager } from "../JsonData/LevelUpRebate";
import { LevelManager } from "../Level/LevelManager";
import { MissionLevelManager } from "../Level/MissionLevel";
import { Follow_Type } from "../multiLanguage/FollowConstants";
import FollowManager from "../multiLanguage/FollowManager";
import { PayManager } from "../Payment/PayManager";
import { PropId } from "../Prop/PropConfig";
import {  PayId } from "../thirdParty/ThirdParty";
import UserData from "../UserData";

export enum RabateType{
    Campaign=0,//征战/通关返利
    Growth,//成长/升级返利
}

export class RabateData{   
    /**是否完成 */
    is_complete:boolean=false;
    /**是否已经领取 */
    is_claimed:boolean=false;
    /**是否购买 */
    is_buy:boolean=false;
    /**是否可点击 */
    is_can_click:boolean=false;
    /**需要的条件 */
    need_num:number=0;
    /**当前的条件 */
    cur_num:number=0;
}

export class RabateManager {
    private static _instance: RabateManager = null;
   
    public static getInstance():RabateManager {
        if(this._instance==null) {
            this._instance=new RabateManager();PayId.Campaign
            console.log("RabateManager null");
            this._instance.init();
        }
        return this._instance;
    }
    //初始化游戏数据
    private init () {        
       
    }
    /**
     * @param type 返利类型
     * @param id 通关返利:章节数,升级返利:等级数
     * @returns 返回对应的领取状态
     */
    public static getClaimState(type:RabateType,id:number):number
    {        
        let num=cc.sys.localStorage.getItem('rabate_claim_state_'+type+"_"+id);
        if(num!=""&&num!=null)
        {
            num=parseInt(num);
        }else
        {
            num=0;
        }
        return num;
    }
    /**
     * 
     * @param type 返利类型
     * @param id 通关返利:章节数,升级返利:等级数
     * @param num 领取状态,大于0表示已领取，其他表示未领取
     */
    public static saveClaimState(type:RabateType,id:number,num:number)
    {
        cc.sys.localStorage.setItem('rabate_claim_state_'+type+"_"+id,num);
    }

    public static getRabateData(type:RabateType,id:number):RabateData{
        let rd=new RabateData();
        /**是否购买 */
        rd.is_buy=PayManager.getInstance().getPayNum("b401")>0;
        /**是否领取 */
        rd.is_claimed=this.getClaimState(type,id)>0;
        /**是否完成 */
        switch(type){
            case RabateType.Campaign:{
                let finish=LevelManager.getInstance().finish_level;
                let levelId=MissionLevelManager.getId(finish,1);
                // rd.cur_num=MissionLevelManager.getInstance().getChapter(levelId)-1;
                rd.cur_num=LevelManager.getInstance().getFinishChapter();
                rd.need_num=CustomsClearanceRebateManager.getInstance().getCompleteChapter(id);
                rd.is_complete=rd.cur_num>=rd.need_num;
            }break;
            case RabateType.Growth:{
                rd.cur_num=UserData.getInstance().getUserLevel();
                rd.need_num=LevelUpRebateManager.getInstance().getUnlockUserLevel(id);
                rd.is_complete=rd.cur_num>=rd.need_num;
            }break;
        }
        return rd;
    }

    public static getIsCanClaim(type:RabateType):boolean{
        let num=0;
        switch(type){
            case RabateType.Campaign:{
                num=CustomsClearanceRebateManager.getMaxRewardID();
            }break;
            case RabateType.Growth:{
                num=LevelUpRebateManager.getMaxRewardID();
            }break;
        }
        for(let i=1; i<=num; i++){
            let rd=this.getRabateData(type,i);
            if(rd.is_buy&&rd.is_complete&&!rd.is_claimed){
                return true;
            }
        }
        return false;
    }
    /**
     * 
     * @param type 返利类型
     * @returns 奖励数据
     */
    public static claimAll(type:RabateType):RewardData{
        let num=0;
        let rewardData=new RewardData();
        //钻石
        rewardData.reward_id=2;
        switch(type){
            case RabateType.Campaign:{
                num=CustomsClearanceRebateManager.getMaxRewardID();
            }break;
            case RabateType.Growth:{
                num=LevelUpRebateManager.getMaxRewardID();
            }break;
        }
        for(let i=1; i<=num; i++){
            let rd=this.claimOnce(type,i);;            
            rewardData.reward_num+=rd.reward_num;
        }
        return rewardData;
    }

    public static claimOnce(type:RabateType,id:number):RewardData{
        let rewardData=new RewardData();
        //钻石
        rewardData.reward_id=PropId.Gem;
        let rd=this.getRabateData(type,id);
        let rewardNum=0;        
        if(rd.is_buy&&rd.is_complete&&!rd.is_claimed){
            this.saveClaimState(type,id,1);
            rewardNum = CustomsClearanceRebateManager.getInstance().getGetGem(id);
            rewardData.reward_num=rewardNum;
        }
        return rewardData;
    }
    
}