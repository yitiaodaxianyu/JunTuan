import MyTool from "../Tools/MyTool";
import { PropManager } from "./PropManager";
import { PropAction, PropId } from "../Prop/PropConfig";
import { UIManager } from "../UI/UIManager";
import GameManager from "../GameManager";
import { SoundIndex } from "../Sound/AudioConstants";
import { ItemManager } from "./Data/Item";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Prop extends cc.Component {

    prop_id:PropId=PropId.Coin;
    prop_num:number=0;
    prop_action:PropAction=PropAction.Null;
    prop_price:number=0;
    prop_cost:PropId=PropId.Coin;

    buy_callback:Function=null;
    use_callback:Function=null;

    public addBuyListen(callback:Function) {
        this.buy_callback=callback;
    }

    public addUseListen(callback:Function) {
        this.use_callback=callback;
    }

    init(propType:PropId,num:number,propAction:PropAction) {
        this.prop_id=propType;
        this.prop_num=num;
        this.prop_action=propAction;               
        this.refreshData(); 
    }

    initSaleItem(currencyType:PropId,price:number,discount:number=0){
        this.prop_price=price;
        this.prop_cost=currencyType;
        if(discount == 0){
            this.node.getChildByName("discountBg").active = false;
            this.node.getChildByName("discountNum").active = false;
            this.node.getChildByName("discount").active = false;
        }else{
            this.node.getChildByName("discountNum").getComponent(cc.Label).string = "" + discount + "%";
        }
        this.node.getChildByName("priceIcon").getComponent(cc.Sprite).spriteFrame = PropManager.getInstance().getSpByPropId(currencyType);
        this.node.getChildByName("price").getComponent(cc.Label).string = MyTool.getCoinDanwei(price);
    }

    soldOut(){
        this.node.getComponent(cc.Button).interactable = false;
        this.node.getChildByName("mask").getChildByName("icon").getComponent(cc.Sprite).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("discountBg").active = false;
        this.node.getChildByName("discountNum").active = false;
        this.node.getChildByName("discount").active = false;
        this.node.getChildByName("priceIcon").active = false;
        this.node.getChildByName("priceTitleBg").active = false;
        this.node.getChildByName("price").active = false;
        this.node.getChildByName("shop_Bg_SoldOut").active = true;
        this.node.getChildByName("saleOut").active = true;
    }
    
    refreshData(){
        let num=this.node.getChildByName('num');
        num.getComponent(cc.Label).string=MyTool.getCoinDanwei(this.prop_num);
        num.active=this.prop_num!=0;
        //设置框的图片
        let sp=this.node.getComponent(cc.Sprite);
        sp.spriteFrame=PropManager.getInstance().getSpFrameByPropType(this.prop_id);
        //设置icon图片
        let iconSp=this.node.getChildByName("mask").getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame=PropManager.getInstance().getSpByPropId(ItemManager.getInstance().getQuoteIcon(this.prop_id));        
    }

    onClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);
        
        if(this.prop_action==PropAction.Null)
        {
            return;
        }
        UIManager.getInstance().showPropInfo({
            onClose:()=>{
                if(this.prop_action==PropAction.Use){
                    let newNum=PropManager.getInstance().getPropNum(this.prop_id);
                    if(newNum!=this.prop_num){
                        this.init(this.prop_id,newNum,this.prop_action);
                    }
                }
            },
        },this.prop_action,{
            prop_id: this.prop_id,
            prop_num: this.prop_num,
            prop_price:this.prop_price,
            prop_cost_id:this.prop_cost,
        },this.buy_callback,this.use_callback);
    }
}
