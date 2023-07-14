import { RewardData } from "../JsonData/LevelJsonData";
import { ItemManager } from "../Prop/Data/Item";
import WishingItemUi, { WishingItemState } from "./WishingItemUi";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WishingCardUi extends cc.Component {

    @property(cc.Prefab)
    item: cc.Prefab = null;
    @property(cc.SpriteAtlas)
    wishing_ui:cc.SpriteAtlas = null;

    wishingItems:WishingItemUi[] = [];
    /**
     * 初始化翻牌界面
     * @param type 1,单抽 2，十抽
     */
    initCard(type: number, reward: RewardData[],func:Function) {
        let canvas = cc.find("Canvas")
        if (canvas.height / canvas.width < 2) {
            this.node.getChildByName("itemRoot").scale = canvas.height / canvas.width - 1;
        }
        this.node.getChildByName("itemRoot").getComponent(cc.Widget).target = canvas;
        this.node.getChildByName("btn").getComponent(cc.Widget).target = canvas;
        if (type == 1) {
            // 单抽
            let item = cc.instantiate(this.item);
            item.parent = this.node.getChildByName("itemRoot")
            item.getComponent(WishingItemUi).initItem(reward[0])
            this.wishingItems.push(item.getComponent(WishingItemUi));
            item.getChildByName("backEffect").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("CommonSpirit_BackLight_" + ItemManager.getInstance().getQuality(reward[0].reward_id))
            item.setPosition(cc.v3(0, 0, 0));
        } else {
            // 十连
            for (let i = 0; i < 10; i++) {
                let item = cc.instantiate(this.item);
                let itemRoot = this.node.getChildByName("itemRoot")
                item.parent = itemRoot
                item.scale = 0.78;
                item.getComponent(WishingItemUi).initItem(reward[i])
                item.getChildByName("backEffect").getComponent(cc.Sprite).spriteFrame = this.wishing_ui.getSpriteFrame("CommonSpirit_BackLight_" + ItemManager.getInstance().getQuality(reward[i].reward_id))
                this.wishingItems.push(item.getComponent(WishingItemUi));
                item.setPosition(cc.v3(0, 0, 0));
                let pos = itemRoot.getChildByName("pos" + i).getPosition();
                cc.tween(item).to(0.5,{position:cc.v3(pos.x,pos.y,0)}).start();
            }
            this.node.getChildByName("btn").active = true;
        }

        this.node.getChildByName("bg").on(cc.Node.EventType.TOUCH_END,()=>{
            let isClose = true;
            for(let i = 0;i<this.wishingItems.length;i++){
                if(this.wishingItems[i].state != WishingItemState.Opened){
                    isClose = false;
                }
            }
            if(isClose){
                func();
                this.node.destroy();
            }
        })
    }

    onClickBtn(){
        for(let i = 0;i<this.wishingItems.length;i++){
            this.wishingItems[i].openCard();
        }
        this.node.getChildByName("btn").active = false;
    }

    // onLoad () {}

    start() {

    }

    // update (dt) {}
}
