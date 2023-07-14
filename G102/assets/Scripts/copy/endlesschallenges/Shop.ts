// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../../GameManager";
import LanguageManager from "../../multiLanguage/LanguageManager";
import TextLanguage from "../../multiLanguage/TextLanguage";
import { ItemManager } from "../../Prop/Data/Item";
import { PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import UIComponent from "../../UI/UIComponent";
import { RogueShopManager } from "./RogueShop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Shop extends UIComponent {
    @property(cc.Node)
    content: cc.Node = null//物品的父节点
    @property(cc.Node)
    num: cc.Node = null//虚空金币的数量
    @property(cc.Node)
    Maze_Shop_Bg_1: cc.Node = null//虚空商品的预制体
    
    item:cc.Node[]=[]//生成的节点
    initUi() {//虚空裂缝
        let max=RogueShopManager.getMaxShowLoacl()
        this.Refresh()
        for (let index = this.item.length; index < max; index++) {
            let id=index+1
            let myitem=cc.instantiate(this.Maze_Shop_Bg_1)
            let name=myitem.getChildByName("name")
            let num=myitem.getChildByName("num")
            let item=myitem.getChildByName("item")
            let prop_id=RogueShopManager.getInstance().getProp_ID(id)
            num.getComponent(cc.Label).string=""+RogueShopManager.getInstance().getCostNum(id)
            name.getComponent(TextLanguage).setTextId(ItemManager.getInstance().getNameTextId(prop_id))
            let itemnode=PropManager.getInstance().createPropItem(prop_id,RogueShopManager.getInstance().getProp_Num(id));
            itemnode.scale=0.6
            itemnode.parent=item
            myitem.on(cc.Node.EventType.TOUCH_END,(()=>{
                this.clickBtnitem(id)   
            }),this);
            myitem.active=true

            myitem.parent=this.content
            this.item.push(myitem)
        }
    }
    clickBtnitem(id){
        let MazeCoin=PropManager.getInstance().getPropNum(PropId.MazeCoin);
        let CostNum=RogueShopManager.getInstance().getCostNum(id)
        if(MazeCoin>=CostNum){
            // 可以购买
            let prop_id=RogueShopManager.getInstance().getProp_ID(id)
            let Prop_Num =RogueShopManager.getInstance().getProp_Num(id)
            let itemnode=PropManager.getInstance().createPropItem(prop_id,Prop_Num);
            PropManager.getInstance().changePropNum(prop_id,Prop_Num);
            GameManager.getInstance().showGetTip(itemnode);
            // MazeCoin-=CostNum
            PropManager.getInstance().changePropNum(PropId.MazeCoin,-CostNum);
            this.Refresh()
        }else{  
            // 虚空裂缝金币不足
            GameManager.getInstance().showMessage(LanguageManager.getInstance().getStrByTextId(830030),3);
        }
    }
    Refresh(){
        let MazeCoin=PropManager.getInstance().getPropNum(PropId.MazeCoin);
        this.num.getComponent(cc.Label).string=""+MazeCoin
    }
    clickBtnClose()//关闭
    {
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        this.onClose();
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
}
