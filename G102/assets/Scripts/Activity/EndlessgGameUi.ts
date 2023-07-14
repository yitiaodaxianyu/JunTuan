import GameManager from "../GameManager";
import { EndlessLevelsManager } from "./EndlessLevels";
import { EndlessRewardManager } from "./EndlessReward";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EndlessgGameUi extends cc.Component {

    @property([cc.SpriteFrame])
    sp_icon: cc.SpriteFrame[] = [];

    scoreProgressBar:cc.ProgressBar=null;
    icon:cc.Sprite=null;
    levelLabel:cc.Label=null;
    scoreLabel:cc.Label=null;

    protected onLoad(): void {
        this.scoreProgressBar=this.node.getChildByName('scoreProgressBar').getComponent(cc.ProgressBar);
        this.icon=this.node.getChildByName('icon').getComponent(cc.Sprite);
        this.levelLabel=this.node.getChildByName('levelLabel').getComponent(cc.Label);
        this.scoreLabel=this.node.getChildByName('scoreLabel').getComponent(cc.Label);
        EndlessLevelsManager.getInstance().endless_score=0;
    }

    refreshData(){
        //先根据当前分数数据获取数据
        let score=EndlessLevelsManager.getInstance().endless_score;
        let endlessData=EndlessRewardManager.getInstance().getRewardByScore(score);
        let proScore=score-endlessData.curData.IntegralRequirement;
        let maxSocre=endlessData.nextData.IntegralRequirement-endlessData.curData.IntegralRequirement;
        this.scoreProgressBar.progress=proScore/maxSocre+0.001;

        this.scoreLabel.string=score+"/"+endlessData.nextData.IntegralRequirement;
        this.levelLabel.string=""+endlessData.curData.RewardLevel;

        this.icon.spriteFrame=this.sp_icon[endlessData.curData.BoxIcon-1]
    }
}
