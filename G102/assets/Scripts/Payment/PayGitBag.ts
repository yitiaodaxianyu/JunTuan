import GameManager from "../GameManager";
import { CyclePackManager, JsonCyclePack } from "./Data/CyclePack";
import { SoundIndex } from "../Sound/AudioConstants";
import PayGitBagItem from "./PayGitBagItem";
import { PayManager } from "./PayManager";
import { EventManager, RedEventString, RedEventType } from "../Tools/EventManager";
import { PayUiIndex } from "../thirdParty/ThirdParty";
import FollowManager from "../multiLanguage/FollowManager";
import { Follow_Type } from "../multiLanguage/FollowConstants";

const { ccclass, property } = cc._decorator;

enum GitState {
    Day = 1,
    Week,
    Month
}

@ccclass
export default class PayGitBag extends cc.Component {

    private git_state = GitState.Day;

    @property(cc.Prefab)
    git_bag_item:cc.Prefab = null;
    @property(cc.SpriteAtlas)
    pay_git_bag_ui:cc.SpriteAtlas = null;

    protected onEnable(): void {
        this.adaptation();
        this.refreshUI();
    }

    private adaptation()
    {        
        let bottomNode=this.node.parent.getChildByName('bottom');
        let bottomHeight=bottomNode.height;
        let bottomY=bottomNode.y;        
        let topNode=this.node.parent.getChildByName('top')
        let topHeight=topNode.height;
        let topY=topNode.y;
        let height=((topY-topHeight)-(bottomY+bottomHeight));
        let centerY=(topY-topHeight-height/2);
        let scrollView=this.node.getChildByName('itemScroll');
        scrollView.height=height;
        scrollView.y=centerY - 120;
        scrollView.getChildByName('view').height=height;
        this.node.getChildByName("top").y = topNode.y - (topNode.height/2 + this.node.getChildByName("top").height);
    }

    protected start(): void {
        PayManager.getInstance().addTodayShow(PayUiIndex.Gift);
        EventManager.postRedEvent(RedEventString.RED_CHECK,RedEventType.Btn_Main_Shop_Gift);
    }

    refreshUI() {
        for (let i = 1; i <= 3; i++) {
            let btn = this.node.getChildByName("top").getChildByName("btn" + i);
            if(i == this.git_state){
                btn.getComponents(cc.Button).forEach((v,k) =>{
                    v.interactable = false;
                })
            }
            else{
                btn.getComponents(cc.Button).forEach((v,k) => {
                    v.interactable = true;
                })
            }
        }

        let content = this.node.getChildByName("itemScroll").getComponent(cc.ScrollView).content;
        content.removeAllChildren();
        let dataList:JsonCyclePack[] = [];
        dataList = CyclePackManager.getInstance().getDataByType(this.git_state);
        dataList.forEach((v,k) => {
            let item = cc.instantiate(this.git_bag_item);
            item.getComponent(PayGitBagItem).initData(v);
            if(v.GiftText == 1){
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Day");
            }else if(v.GiftText == 2){
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Week");
            }else{
                item.getChildByName("Cycle_Bg_Day").getComponent(cc.Sprite).spriteFrame = this.pay_git_bag_ui.getSpriteFrame("Cycle_Bg_Month");
            }
            content.addChild(item);
        });
    }

    onBtnClick(e,index:number){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        index=Number(index);
        if(index == 1){
            FollowManager.getInstance().followEvent(Follow_Type.每日礼包页签展示次数);
        }else if(index == 2){
            FollowManager.getInstance().followEvent(Follow_Type.每周礼包页签展示次数);
        }else{
            FollowManager.getInstance().followEvent(Follow_Type.每月礼包页签展示次数);
        }
        if(this.git_state!=index){
            this.git_state=index;
            this.refreshUI();
        }
    }

    

}
