import { BossRewardManager } from "./BossReward";
import GameManager from "../GameManager";
import { EndlessRewardManager } from "./EndlessReward";
import { BossChallengeManager } from "./BossChallenge";
import { StorageKey } from "../Storage/StorageConfig";
import { TheStorageManager } from "../Storage/StorageManager";
import { UserInfo } from "../UserInfo/UserInfo";


const {ccclass, property} = cc._decorator;

@ccclass
export default class BossGameUi extends cc.Component {

    @property([cc.SpriteFrame])
    sp_icon: cc.SpriteFrame[] = [];
    BossRush_Bar_1:cc.Node=null;
    bar:cc.Node=null;
    icon:cc.Sprite=null;
    levelLabel:cc.Label=null;
    scoreLabel:cc.Label=null;
    prev_stage:number=1;
    protected onLoad(): void {
        // return
        this.BossRush_Bar_1=this.node.getChildByName('scoreProgressBar').getChildByName("BossRush_Bar_1");
        this.bar=this.node.getChildByName('scoreProgressBar').getChildByName("bar");
        this.icon=this.node.getChildByName('icon').getComponent(cc.Sprite);
        this.levelLabel=this.node.getChildByName('levelLabel').getComponent(cc.Label);
        this.scoreLabel=this.node.getChildByName('scoreLabel').getComponent(cc.Label);
        BossChallengeManager.getInstance().cur_score=0;
    }
    refreshData():number{
        //先根据当前分数数据获取数据
        // return 1
        let score=BossChallengeManager.getInstance().cur_score;
        let data=BossRewardManager.getInstance().getRewardByScore(BossChallengeManager.getInstance().cur_challenge_mode,score);
        let proScore=score-data.curData.IntegralRequirement;
        let maxSocre=data.nextData.IntegralRequirement-data.curData.IntegralRequirement;
        let progress=proScore/maxSocre+0.001;
        this.BossRush_Bar_1.getComponent(cc.Sprite).fillRange=progress
        this.bar.getComponent(cc.Sprite).fillRange=progress
        this.scoreLabel.string=score+"/"+data.nextData.IntegralRequirement;
        this.levelLabel.string=""+data.curData.RewardLevel;
  
        // TheStorageManager.getInstance().setItem(StorageKey.BossChallengeDamage,score);
        this.icon.spriteFrame=this.sp_icon[data.curData.BoxIcon-1];
        if(data.curData.RewardLevel>0){           
            let RotationOrder = UserInfo.getInstance().RotationOrder//轮换顺序
            let ChallengeID = RotationOrder * 1000 + (data.curData.RewardLevel+1)//挑战ID
            let level= BossChallengeManager.getInstance().getMonsterLevel(ChallengeID)
            // console.log("+++++++",level,data.curData.RewardLevel)
            return level;

            // return fightingInfo.monster_datas[data.curData.RewardLevel-1][0].level;
        }else{
            return 2;
        }



        // if(data.curData.RewardLevel>this.prev_stage){
        //     this.prev_stage=data.curData.RewardLevel;
        //     //返回最新的系数
        //     return GameManager.getInstance().level_datas[this.prev_stage-1].attribute_multiple[0];
        // }
    }
}
