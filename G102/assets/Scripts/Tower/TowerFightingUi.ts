import ApkManager from "../Ads/ApkManager";
import GameManager from "../GameManager";
import { MonsterIconManager } from "../Monster/MonsterIconManager";
import { PropManager } from "../Prop/PropManager";
import { SoundIndex } from "../Sound/AudioConstants";
import UIComponent from "../UI/UIComponent";
import { UiAction } from "../UI/UiInterface";
import { TowerLevelManager } from "./TowerLevel";
import { TowerRewardManager } from "./TowerReward";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TowerFightingUi extends UIComponent {

    init(uiAc: UiAction): void {
        super.init(uiAc)
    }

    initData(level:number){
        let data = TowerLevelManager.getInstance().getFightingInfo(level)
        let content = this.node.getChildByName("monsterScrollView").getComponent(cc.ScrollView).content;
        data.getOnlyMonsterDataList().forEach((v,k) => {
            // 怪物id列表
            let icon=MonsterIconManager.getInstance().createMonsterIcon(v.id,v.level);
            content.addChild(icon);
        });
        let rewardData=TowerRewardManager.getInstance().getRewardDatas(level);
        content = this.node.getChildByName("rewardsScrollView").getComponent(cc.ScrollView).content;
        rewardData.forEach((v,k) => {
            let item = PropManager.getInstance().createPropItem(v.reward_id,v.reward_num);
            content.addChild(item);
        });
    }

    clickBtnClose()
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.destroySelf();
    }

    destroySelf()
    {
        super.onClose();
        ApkManager.getInstance().closeBanner();
        // EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_SignIn);
    }

}
