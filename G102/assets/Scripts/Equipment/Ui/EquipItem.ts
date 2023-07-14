import GameManager from "../../GameManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { ItemManager } from "../../Prop/Data/Item";
import { PropAction, PropData, PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import MyTool from "../../Tools/MyTool";
import { UIManager } from "../../UI/UIManager";
import { EquipmentAttributeManager } from "../Data/EquipmentAttribute";
import { EquipInfo } from "../EquipConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EquipItem extends cc.Component {

    hero_type:Hero_Type=Hero_Type.NULL;
    equip_info:EquipInfo=null;
    prop_action:PropAction=PropAction.Look;
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

    init(heroType:Hero_Type,info:EquipInfo|number,pAc:PropAction=PropAction.Look){
        if (typeof info == "number"){
            let equipInfo=new EquipInfo();
            equipInfo.equip_id=info;
            equipInfo.equip_num=1;
            this.equip_info=equipInfo;
        }else{
            this.equip_info=info as EquipInfo;
        }
        this.hero_type=heroType;        
        this.prop_action=pAc;
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
        this.node.getChildByName("icon").getComponent(cc.Sprite).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"));
        this.node.getChildByName("bg").getComponent(cc.Sprite).setMaterial(0,cc.Material.getBuiltinMaterial("2d-gray-sprite"));
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
        let EAM=EquipmentAttributeManager.getInstance();
        let PM=PropManager.getInstance();
        let bg=this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame=PM.getSpFrameByPropType(this.equip_info.equip_id);
        let iconSp=this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame=PM.getSpByPropId(this.equip_info.equip_id);
        this.node.getComponent(cc.Button).enabled=this.prop_action!=PropAction.Null;
        let star=this.node.getChildByName("star").getChildByName('star').getComponent(cc.Sprite);
        let starNum=ItemManager.getInstance().getStar(this.equip_info.equip_id);
        if(starNum>0){
            star.node.active=true;
            star.spriteFrame=PropManager.getInstance().getSpByName('Common_Star_'+starNum);
        }else{
            star.node.active=false;
        }
        let num=this.node.getChildByName("num")
        if(this.equip_info.equip_num<=1){
            num.active=false
        }else{
            num.active=true
        }
        num.getComponent(cc.Label).string=""+this.equip_info.equip_num
    }
    onClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        UIManager.getInstance().showEquipInfoUi(this.hero_type,this.equip_info.equip_id,this.prop_action,{
            prop_id: this.equip_info.equip_id,
            prop_num: this.equip_info.equip_num,
            prop_price:this.prop_price,
            prop_cost_id:this.prop_cost,
        },this.buy_callback,this.use_callback);
    }
}
