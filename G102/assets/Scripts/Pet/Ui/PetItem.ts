import GameManager from "../../GameManager";
import { Hero_Type } from "../../Hero/Game/HeroConfig";
import { ItemManager } from "../../Prop/Data/Item";
import { PropAction, PropId } from "../../Prop/PropConfig";
import { PropManager } from "../../Prop/PropManager";
import { SoundIndex } from "../../Sound/AudioConstants";
import { UIManager } from "../../UI/UIManager";
import { PetMessage } from "../PetConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PetItem extends cc.Component {

    hero_type:Hero_Type=Hero_Type.NULL;
    pet_info:PetMessage=null;
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

    init(heroType:Hero_Type,info:PetMessage|number,pAc:PropAction=PropAction.Look){
        if (typeof info == "number"){
            let petInfo=new PetMessage();
            petInfo.pet_id=info;
            petInfo.pet_num=1;
            this.pet_info=petInfo;
        }else{
            this.pet_info=info as PetMessage;
        }
        this.hero_type=heroType;        
        this.prop_action=pAc;
        this.refreshData();
    }

    refreshData(){
        let PM=PropManager.getInstance();
        let bg=this.node.getChildByName('bg');
        bg.getComponent(cc.Sprite).spriteFrame=PM.getSpFrameByPropType(this.pet_info.pet_id);
        let iconSp=this.node.getChildByName('icon').getComponent(cc.Sprite);
        iconSp.spriteFrame=PM.getSpByPropId(this.pet_info.pet_id);
        this.node.getComponent(cc.Button).enabled=this.prop_action!=PropAction.Null;
        let star=this.node.getChildByName("star").getChildByName('star').getComponent(cc.Sprite);
        let starNum=ItemManager.getInstance().getStar(this.pet_info.pet_id);
        if(starNum>0){
            star.node.active=true;
            star.spriteFrame=PropManager.getInstance().getSpByName('Common_Star_'+starNum);
        }else{
            star.node.active=false;
        }
        let num=this.node.getChildByName("num")
        if(this.pet_info.pet_num<=1){
            num.active=false
        }else{
            num.active=true
        }
        num.getComponent(cc.Label).string=""+this.pet_info.pet_num
    }
    onClick(){
        GameManager.getInstance().sound_manager.playSound(SoundIndex.click);        
        UIManager.getInstance().showEquipInfoUi(this.hero_type,this.pet_info.pet_id,this.prop_action,{
            prop_id: this.pet_info.pet_id,
            prop_num: this.pet_info.pet_num,
            prop_price:this.prop_price,
            prop_cost_id:this.prop_cost,
        },this.buy_callback,this.use_callback);
    }
}
